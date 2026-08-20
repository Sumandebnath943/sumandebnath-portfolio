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
  | "Waving"
  // Added 20 Aug 2026.
  | "Nodding"
  | "SittingIdle"
  | "Pointing"
  | "SillyDancing"
  | "Clapping"
  | "Sleeping"
  | "Salute";

// Clips that should play once and hold their final pose, instead of looping.
const ONCE_CLIPS: ReadonlySet<ClipName> = new Set(["Jumping", "Waving"]);

/**
 * Default crossfade between clips, in seconds.
 *
 * 0.25 is right for the mascot, where every clip is an upright idle and the two
 * poses being blended are already close together. It is badly wrong when the
 * poses are far apart: blending a standing dance into a body lying on the floor
 * over a quarter-second reads as the robot melting, because a crossfade
 * interpolates joint rotations directly and has no idea a human would have to
 * kneel first. Callers spanning that kind of distance pass a longer `fade`.
 */
const FADE = 0.25;

export function RobotModel({
  animation,
  timeScale = 1,
  onFinished,
  playOnce = false,
  fade = FADE,
}: {
  animation: ClipName;
  timeScale?: number;
  /** Crossfade seconds into this clip. Defaults to FADE — see the note there. */
  fade?: number;
  /** Fires when a non-looping clip reaches its end. */
  onFinished?: (clip: ClipName) => void;
  /**
   * Force the current clip to play exactly once and report when it finishes,
   * whatever ONCE_CLIPS says.
   *
   * This is how a caller sequences clips at their own natural length instead of
   * guessing durations: play once, wait for `onFinished`, advance. The 404's
   * Sleeping → Looking → Silly Dancing loop is built on it, and the durations
   * differ by more than 3× so a fixed timer would either cut one short or leave
   * another standing still.
   */
  playOnce?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  // `robot-v3.glb`: same rig, textures at 512 instead of 1024 (414 KB -> 145 KB)
  // because the model never draws larger than a few hundred pixels.
  // `_masters/robot.glb` stays on disk as the full-resolution output of
  // scripts/build-robot-glb.mjs and the input to shrink-robot-textures.mjs —
  // it is not served.
  //
  // v2 -> v3 on 20 Aug 2026 added seven clips (Nodding, SittingIdle, Pointing,
  // SillyDancing, Clapping, Sleeping, Salute): 802 KB -> 1021 KB. Renamed
  // rather than replaced in place because /robot*.glb is cached immutable for a
  // year — overwriting ships the change to nobody who has already visited.
  // See PROJECT_BIBLE.md §10.1.
  const { scene, animations } = useGLTF("/robot-v3.glb");
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

    const once = playOnce || ONCE_CLIPS.has(animation);
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
      next.fadeIn(fade).play();
    }

    return () => {
      next.fadeOut(fade);
    };
  }, [animation, actions, timeScale, mixer, playOnce, fade]);

  return <primitive ref={group} object={cloned} />;
}

useGLTF.preload("/robot-v3.glb");
