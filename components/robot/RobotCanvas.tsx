"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { RobotModel, type ClipName } from "./RobotModel";

export default function RobotCanvas({
  animation,
  timeScale,
  onFinished,
  rotationY = 0,
  cameraPosition = [0, 1.25, 4.4],
  cameraFov = 30,
  groupY = -1.3,
  rimLight = false,
}: {
  animation: ClipName;
  timeScale?: number;
  onFinished?: (clip: ClipName) => void;
  /** Y rotation (radians) so the robot can face its running direction. */
  rotationY?: number;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  groupY?: number;
  /** Extra back light so the dark robot reads against dark backgrounds. */
  rimLight?: boolean;
}) {
  // Browsers discard the WebGL context of a backgrounded tab. three re-uploads
  // image-backed textures on restore, but the environment map ends up as a
  // GPU-side PMREM cubemap that nothing regenerates — and with both robot
  // materials at metalness 1.0, losing it drops nearly all of their light. The
  // robot comes back near-black with no reflections on its skin, which is
  // exactly what an alt-tab-and-return used to produce.
  //
  // drei only guards this for gainmap formats (webp/jpg) and returns early for
  // .hdr, so nothing upstream handles it. Remounting the whole canvas is the
  // blunt fix, and the right one: it is a full, certain rebuild of a state that
  // is already broken, and it costs nothing until a context is actually lost.
  // three itself calls preventDefault on `webglcontextlost`, which is what
  // makes the restore fire at all.
  const [glGeneration, setGlGeneration] = useState(0);

  return (
    <Canvas
      key={glGeneration}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextrestored",
          () => setGlGeneration((g) => g + 1),
          { once: true },
        );
      }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
      dpr={[1, 2]}
      camera={{ position: cameraPosition, fov: cameraFov }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} />
      {rimLight && <directionalLight position={[0, 4, -6]} intensity={1.8} color="#ffd9b0" />}
      <Suspense fallback={null}>
        {/* Feet sit near y=0; lift camera target to mid-body via group offset. */}
        <group position={[0, groupY, 0]} rotation={[0, rotationY, 0]}>
          <RobotModel animation={animation} timeScale={timeScale} onFinished={onFinished} />
        </group>
      </Suspense>
      {/* Separate boundary so the HDR never suspends/hides the robot.
          `preset="city"` resolved to a 1.5 MB HDRI on raw.githack.com, which
          redirects to raw.githubusercontent.com — two round trips to a third
          party on every page load, for a file this site's lighting depends on.
          Same asset, self-hosted (CC0, Poly Haven via pmndrs/drei-assets).
          Not optional: both robot materials are metallicFactor 1.0, so the
          environment supplies nearly all of their diffuse light. */}
      <Suspense fallback={null}>
        <Environment files="/hdri/city.hdr" />
      </Suspense>
    </Canvas>
  );
}
