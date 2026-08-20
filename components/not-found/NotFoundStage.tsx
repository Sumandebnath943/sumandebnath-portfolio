"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRobotChat } from "@/components/robot/RobotChatContext";
import type { ClipName } from "@/components/robot/RobotModel";
import {
  LOOP,
  CLIP_BUBBLE_TOP,
  CLIP_CAMERA,
  CLIP_LINES,
  BUBBLE_MS,
} from "./not-found-data";

// Same treatment as the corner mascot: the WebGL canvas is client-only and
// stays out of SSR and the initial bundle.
const RobotCanvas = dynamic(() => import("@/components/robot/RobotCanvas"), { ssr: false });

/**
 * Crossfade between clips, in seconds.
 *
 * Far longer than the mascot's 0.25 because this loop spans poses that are a
 * long way apart — a standing dance into a body on the floor. A crossfade
 * interpolates joint rotations with no notion of how a body actually gets from
 * one to the other, so a short blend reads as the robot collapsing sideways.
 * Nine tenths of a second is not a real "lie down", but it is a settle rather
 * than a snap. A genuinely realistic version needs a transition clip — see
 * HANDOFF.
 */
const LOOP_FADE = 0.9;

/**
 * How long the bubble stays hidden after a clip change.
 *
 * The clip switches in one React commit, but the body needs LOOP_FADE to blend
 * into the new pose and the camera about as long again to reach its new
 * framing. Move the bubble on the commit and, for that second, it is positioned
 * for a pose the robot has not reached — which is exactly how it ended up
 * across his head mid-transition, and how a "Zzz…" appeared over a robot who
 * was still standing.
 *
 * So the bubble sits out the handover entirely: hidden on the change, back once
 * he has settled. It costs one second of the shortest clip (3.8s) and removes
 * the whole class of problem.
 */
const SETTLE_MS = LOOP_FADE * 1000 + 250;

export default function NotFoundStage() {
  // Claim the whole screen for as long as this page is mounted: no corner
  // mascot, no chat pill, no tour tab. See RobotChatContext.
  const { solo, setSolo } = useRobotChat();
  useEffect(() => {
    setSolo(true);
    return () => setSolo(false);
  }, [setSolo]);

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Sleeping → Looking → SillyDancing, each played once at its own true length
  // and advanced by the mixer's own "finished" event rather than a timer. No
  // clip is re-timed: an earlier build sped Sleeping up and it read as
  // fast-forward.
  const [step, setStep] = useState(0);
  const clip: ClipName = LOOP[step];
  // Advance only on the clip that is actually current. A 0.9s crossfade leaves
  // the outgoing action alive well past the swap, so a late "finished" from the
  // clip we just left would otherwise skip a step.
  const advance = useCallback(
    (finished: ClipName) =>
      setStep((s) => (finished === LOOP[s] ? (s + 1) % LOOP.length : s)),
    [],
  );

  // The line pool belongs to the current clip, so he can only say things that
  // make sense for what he is doing — "You woke me up for this?" is unavailable
  // until he is on his feet. Index resets whenever the clip changes.
  const lines = CLIP_LINES[clip] ?? [];
  // The line is stored WITH the clip it belongs to, so `text` can be derived.
  // That is what makes the bubble vanish the instant the clip changes without
  // a setState in an effect body, and it is load-bearing for more than tidiness
  // — see SETTLE_MS.
  const [shown, setShown] = useState<{ clip: ClipName; i: number } | null>(null);
  const text = shown?.clip === clip ? lines[shown.i] : null;

  useEffect(() => {
    if (!lines.length) return;
    let i = Math.floor(Math.random() * lines.length);
    // Both writes are in timer callbacks, never the effect body — that is the
    // cascading-render pattern react-hooks/set-state-in-effect rejects.
    const first = setTimeout(() => setShown({ clip, i }), SETTLE_MS);
    if (reduced) return () => clearTimeout(first);
    const id = setInterval(() => {
      i = (i + 1) % lines.length;
      setShown({ clip, i });
    }, SETTLE_MS + BUBBLE_MS);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
    // `clip` rather than `lines`: the array identity is stable per clip, and
    // depending on it directly would restart the rotation on every render.
  }, [clip, reduced]); // eslint-disable-line react-hooks/exhaustive-deps
  const cam = CLIP_CAMERA[clip] ?? CLIP_CAMERA.Looking;

  return (
    <div className="relative h-full w-full">
      {/* The bubble overlays the canvas rather than reserving space above it —
          that space is worth more to the robot. Its vertical position follows
          the clip (see CLIP_BUBBLE_TOP) and transitions, so it glides down to
          meet him as he lies down instead of talking to empty air. */}
      <div
        aria-live="polite"
        className="pointer-events-none absolute left-1/2 z-10 w-[min(17rem,78vw)] -translate-x-1/2 transition-[top] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ top: CLIP_BUBBLE_TOP[clip] ?? "1%" }}
      >
        {text && (
          <div
            key={text}
            className="nf-bubble relative rounded-2xl border border-[#12161A]/[0.12] bg-white px-3.5 py-2 text-center shadow-[0_10px_30px_-14px_rgba(18,22,26,0.4)] sm:px-4 sm:py-2.5"
          >
            <p className="font-manrope text-[12.5px] font-medium leading-snug text-[#12161A] sm:text-[14px]">
              {text}
            </p>
            <span className="absolute -bottom-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-[#12161A]/[0.12] bg-white" />
          </div>
        )}
      </div>

      <div
        className="h-full w-full"
        role="img"
        aria-label="Suman's robot mascot, asleep beside the missing page"
      >
        {solo && (
          <RobotCanvas
            animation={clip}
            playOnce
            fade={LOOP_FADE}
            onFinished={advance}
            fps={30}
            groupY={-1.15}
            // Per-clip framing, eased by CameraRig — see CLIP_CAMERA.
            smoothCamera
            cameraPosition={cam.pos}
            cameraLookAt={cam.look}
            cameraFov={cam.fov}
          />
        )}
      </div>
    </div>
  );
}
