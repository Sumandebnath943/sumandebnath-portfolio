"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { RobotModel, type ClipName } from "./RobotModel";

/**
 * Drives the canvas at a fixed frame rate.
 *
 * react-three-fiber's default `frameloop="always"` redraws on every rAF tick,
 * forever, on every page — and the mascot is in the root layout, so that is the
 * whole site. Measured before this: 119 draw calls a second, indefinitely,
 * which is the single largest thing this page asks of a visitor's battery.
 *
 * With `frameloop="demand"` nothing renders until something asks, so this asks
 * — 30fps while the robot is idling, 60 while it is actually running or
 * jumping and the difference can be seen. The ambient idle clips are slow
 * enough that 30 is indistinguishable.
 *
 * rAF rather than setInterval on purpose: rAF stops in a background tab, and a
 * timer would keep redrawing a robot nobody is looking at.
 */
export function FrameLimiter({ fps }: { fps: number }) {
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const interval = 1000 / fps;
    let raf = 0;
    let last = -Infinity;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      // 1ms of slack, or a 30fps target quietly lands on every third frame.
      if (t - last >= interval - 1) {
        last = t;
        invalidate();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fps, invalidate]);

  return null;
}

export default function RobotCanvas({
  animation,
  timeScale,
  onFinished,
  rotationY = 0,
  cameraPosition = [0, 1.25, 4.4],
  cameraFov = 30,
  groupY = -1.3,
  rimLight = false,
  fps = 30,
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
  /** Frames per second to render at. See FrameLimiter. */
  fps?: number;
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
      // dpr ceiling 2 → 1.5: on a 2x display that is 56% of the pixels, on a
      // 3x phone 25%, for a 200x290 box where the difference is not visible.
      // Antialiasing deliberately stays ON — the obvious next saving, and the
      // wrong one here: the robot is a dark silhouette against a transparent
      // background, which is exactly where jagged edges show. Pixel count is
      // the better lever.
      gl={{
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: false,
        powerPreference: "low-power",
      }}
      dpr={[1, 1.5]}
      frameloop="demand"
      camera={{ position: cameraPosition, fov: cameraFov }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <FrameLimiter fps={fps} />
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
        <Environment files="/hdri/city-256.hdr" />
      </Suspense>
    </Canvas>
  );
}
