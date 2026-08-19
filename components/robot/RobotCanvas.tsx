"use client";

import { Suspense } from "react";
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
  return (
    <Canvas
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
