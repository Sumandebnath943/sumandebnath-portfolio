"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { clone as skeletonClone } from "three/examples/jsm/utils/SkeletonUtils.js";
import * as THREE from "three";

export type ClipName =
  | "Idle"
  | "HappyIdle"
  | "SadIdle"
  | "Jumping"
  | "Looking"
  | "Running"
  | "Talking"
  | "Talking2"
  | "Waving";

// Clips that should play once and hold their final pose, instead of looping.
const ONCE_CLIPS: ReadonlySet<ClipName> = new Set(["Jumping", "Waving"]);

const FADE = 0.25;

export function RobotModel({
  animation,
  timeScale = 1,
  onFinished,
}: {
  animation: ClipName;
  timeScale?: number;
  /** Fires when a non-looping clip (Jumping / Waving) reaches its end. */
  onFinished?: (clip: ClipName) => void;
}) {
  const group = useRef<THREE.Group>(null);
  // `robot-v2.glb`, not `robot.glb`: same rig, same nine clips, textures at 512
  // instead of 1024 (414 KB -> 145 KB) because the model never draws larger
  // than a few hundred pixels. `robot.glb` stays on disk as the full-resolution
  // output of scripts/build-robot-glb.mjs and the input to
  // scripts/shrink-robot-textures.mjs — it is no longer served.
  // Renamed rather than replaced in place because /robot*.glb is cached
  // immutable for a year; see PROJECT_BIBLE.md §10.1.
  const { scene, animations } = useGLTF("/robot-v2.glb");
  // Clone (skeleton-aware) so the same model can render in the corner AND the
  // chat takeover without two canvases fighting over one scene object.
  const cloned = useMemo(() => skeletonClone(scene), [scene]);
  const { actions, mixer } = useAnimations(animations, group);
  // Latest-callback ref. Kept in step in an effect rather than assigned during
  // render — the initial useRef value is already correct for the first pass,
  // and the only reader is a three.js "finished" event, which can never fire
  // before paint.
  const onFinishedRef = useRef(onFinished);
  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);
  const firstClip = useRef(true);

  // Relay three.js "finished" events for one-shot clips back to the controller.
  useEffect(() => {
    const handler = (e: { action: THREE.AnimationAction }) => {
      const name = e.action.getClip().name as ClipName;
      onFinishedRef.current?.(name);
    };
    mixer.addEventListener("finished", handler);
    return () => mixer.removeEventListener("finished", handler);
  }, [mixer]);

  // Crossfade to the requested clip whenever it changes. Runs in a layout effect
  // so the very first clip is posed before paint — avoids a bind-pose (T) flash.
  useLayoutEffect(() => {
    const next = actions[animation];
    if (!next) return;

    const once = ONCE_CLIPS.has(animation);
    next.reset();
    next.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, once ? 1 : Infinity);
    next.clampWhenFinished = once;
    next.timeScale = timeScale;

    if (firstClip.current) {
      // No fade-in for the first clip, and pose it immediately at full weight.
      firstClip.current = false;
      next.setEffectiveWeight(1).play();
      mixer.update(0);
    } else {
      next.fadeIn(FADE).play();
    }

    return () => {
      next.fadeOut(FADE);
    };
  }, [animation, actions, timeScale, mixer]);

  return <primitive ref={group} object={cloned} />;
}

useGLTF.preload("/robot-v2.glb");
