"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { RobotModel, type ClipName } from "./RobotModel";

export type TakeoverPhase = "intro" | "idle" | "outro";
// sx = horizontal SCREEN fraction (0 = left edge, 1 = right edge). The rig
// converts it to world-x at runtime using the live camera/viewport, so the robot
// lands exactly where intended regardless of aspect ratio.
export type RobotTarget = { sx: number; y: number; scale: number };
export type RobotTargets = { corner: RobotTarget; panel: RobotTarget };

const DEFAULT_TARGETS: RobotTargets = {
  corner: { sx: 0.92, y: -1.7, scale: 0.52 },
  panel: { sx: 0.17, y: -1.6, scale: 1.25 },
};
const ARC_HEIGHT = 1.25; // world units the jump rises
const TWEEN_MS = 850;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Rig({
  phase,
  animation,
  rotationY,
  targets,
  onFinished,
}: {
  phase: TakeoverPhase;
  animation: ClipName;
  rotationY: number;
  targets: RobotTargets;
  onFinished?: (clip: ClipName) => void;
}) {
  const rig = useRef<THREE.Group>(null);
  const from = useRef({ ...targets.corner });
  const to = useRef({ ...targets.panel });
  const t0 = useRef(0);
  const transitioning = useRef(false);
  const { camera, size } = useThree();
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    if (phase === "intro") { from.current = { ...targets.corner }; to.current = { ...targets.panel }; transitioning.current = true; t0.current = performance.now(); }
    else if (phase === "outro") { from.current = { ...targets.panel }; to.current = { ...targets.corner }; transitioning.current = true; t0.current = performance.now(); }
  }, [phase, targets]);

  useFrame((state) => {
    const g = rig.current;
    if (!g) return;
    const p = transitioning.current ? Math.min(1, (performance.now() - t0.current) / TWEEN_MS) : 1;
    const e = easeInOut(p);
    const a = from.current, b = to.current;
    const arc = transitioning.current ? Math.sin(p * Math.PI) * ARC_HEIGHT : 0;
    const sx = lerp(a.sx, b.sx, e);
    const y = lerp(a.y, b.y, e) + arc;
    // Convert the desired screen fraction to world-x at the robot's depth.
    const vp = state.viewport.getCurrentViewport(camera, tmp.set(0, y, 0), size);
    g.position.set((sx - 0.5) * vp.width, y, 0);
    g.scale.setScalar(lerp(a.scale, b.scale, e));
    g.rotation.y += (rotationY - g.rotation.y) * 0.18;
    if (p >= 1) transitioning.current = false;
  });

  return (
    <group ref={rig}>
      <RobotModel animation={animation} onFinished={onFinished} />
    </group>
  );
}

export default function TakeoverRobotCanvas({
  phase,
  animation,
  rotationY = 0,
  targets = DEFAULT_TARGETS,
  onFinished,
}: {
  phase: TakeoverPhase;
  animation: ClipName;
  rotationY?: number;
  targets?: RobotTargets;
  onFinished?: (clip: ClipName) => void;
}) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 7], fov: 30 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[3, 5, 4]} intensity={1.7} />
      <directionalLight position={[-4, 2, -2]} intensity={0.45} />
      <directionalLight position={[0, 4, -6]} intensity={1.6} color="#ffd9b0" />
      <Suspense fallback={null}>
        <Rig phase={phase} animation={animation} rotationY={rotationY} targets={targets} onFinished={onFinished} />
      </Suspense>
      {/* Separate boundary so the HDR (CDN) never suspends/hides the robot. */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
