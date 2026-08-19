"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * The cinematic loader, shown once per session on a first landing on `/`.
 *
 * Rebuilt 19 Aug 2026. The previous version was a static logo behind a scan
 * line, three orbital rings, and four strings that said nothing — "INITIALIZING
 * SYSTEMS…", "Loading identity architecture…". It read as a template, and it
 * spent 6.2 seconds doing it.
 *
 * Three things changed:
 *
 *  · **The boot log tells the truth.** Every line below is a real claim drawn
 *    from lib/resume.ts, so the wait now makes the same argument the rest of
 *    the site makes rather than filling time. They are copied rather than
 *    imported on purpose — pulling ~500 lines of résumé data into the homepage's
 *    initial bundle to print four strings would cost exactly the metric this
 *    work is trying to protect. **Keep them in step with lib/resume.ts.**
 *  · **The counter is the page's own display face.** An oversized Anton numeral
 *    over a hairline rule, matching the numbered-section system, instead of a
 *    generic gradient progress bar.
 *  · **The signature is written, not revealed.** A left-to-right wipe, which is
 *    the direction a signature is actually made in.
 *
 * > The wipe is a stand-in for a true stroke animation. That needs the mark as
 * > vector art, and no vector source exists in this repo — only the raster
 * > logos in public/branding. Auto-tracing would give a *filled outline*, and
 * > stroking an outline draws the edges of the letters rather than the pen's
 * > path, which looks wrong. If the original Illustrator/Figma art ever turns
 * > up, swap the <Image> for an inline <svg> and animate `stroke-dashoffset`;
 * > nothing else here has to change.
 *
 * Timing: ~2.9s of sequence, then a short hold and a 600ms exit. Everything
 * downstream (nav, mascot, chat) is measured from `onComplete`, so changing the
 * durations here re-times the whole intro automatically — see lib/intro.ts.
 */

type Beat = { text: string; duration: number };

/** Real facts. See the note above before editing. */
const SEQUENCE: Beat[] = [
  { text: "9+ years in brand marketing", duration: 620 },
  { text: "2+ years shipping AI-native products", duration: 620 },
  { text: "A 44-agent fleet. Two language models.", duration: 620 },
  { text: "Production cycles: weeks compressed to hours", duration: 620 },
  { text: "Entering the system", duration: 420 },
];

const TOTAL_MS = SEQUENCE.reduce((sum, s) => sum + s.duration, 0);
const HOLD_MS = 260;
const EXIT_MS = 600;

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 30;
      setProgress(Math.min((elapsed / TOTAL_MS) * 100, 100));
    }, 30);

    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = 0;
    SEQUENCE.forEach((s, i) => {
      at += s.duration;
      timers.push(
        setTimeout(() => {
          if (i < SEQUENCE.length - 1) {
            setStep(i + 1);
            return;
          }
          timers.push(
            setTimeout(() => {
              setExiting(true);
              timers.push(setTimeout(onComplete, EXIT_MS));
            }, HOLD_MS),
          );
        }, at),
      );
    });

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  const shown = Math.round(progress);

  return (
    <AnimatePresence>
      {!exiting && (
        <m.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          // Was z-200, which put it *under* the chat launcher (1000), the
          // mascot (9999) and the nav (10000) — all three drew straight over
          // the loading screen. It now sits above them, and above the
          // pre-paint cover (99998) it hands over from. Still below the tour
          // overlay (999998), which can never be running during the intro.
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden px-6"
        >
          {/* A single warm wash, keyed to the hero's electric orange, instead of
              the three spinning rings — which were the most template-like thing
              on the screen and cost three infinite animations. */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 45% at 50% 46%, rgba(255,85,0,0.13) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex w-full max-w-[34rem] flex-col items-center">
            {/* ── The signature, written left to right ── */}
            <div className="sd-loader-sign relative mb-10 h-24 w-full max-w-[20rem] sm:h-28">
              <Image
                src="/branding/logo_v2.png"
                alt="Suman Debnath"
                width={1774}
                height={887}
                sizes="320px"
                loading="eager"
                className="h-full w-full object-contain"
              />
            </div>

            {/* ── Anton counter over a hairline rule ── */}
            <div className="w-full">
              <div className="flex items-end justify-between">
                <span
                  className="font-anton leading-[0.82] text-[clamp(3.5rem,14vw,6.5rem)] tabular-nums text-[#F5F0E6]"
                  aria-hidden
                >
                  {String(shown).padStart(2, "0")}
                </span>
                <span className="font-dmmono mb-2 text-[10px] uppercase tracking-[0.28em] text-white/50">
                  Loading
                </span>
              </div>

              {/* The rule *is* the progress bar — no track, no gradient.
                  Driven by scaleX rather than a percentage width: the width
                  version measured 0 at every sample against a 1px-tall parent,
                  and animating `width` 30 times a second re-runs layout each
                  tick, which is the last thing a loading screen should spend.
                  A transform is compositor-only and resolves against the
                  element's own box, so there is nothing to resolve wrongly.
                  `/[0.12]` in brackets, not `/12` — Tailwind's opacity modifier
                  only takes multiples of five and silently drops anything else. */}
              <div className="mt-3 h-px w-full overflow-hidden bg-white/[0.12]">
                <div
                  className="h-px w-full origin-left bg-[#FF5500]"
                  style={{
                    transform: `scaleX(${progress / 100})`,
                    transition: "transform 120ms linear",
                  }}
                />
              </div>
            </div>

            {/* ── The boot log ── */}
            <div
              className="mt-6 flex h-6 w-full items-center"
              role="status"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <m.p
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-dmmono text-[11px] sm:text-xs tracking-[0.14em] uppercase ${
                    step === SEQUENCE.length - 1 ? "text-[#FF8000]" : "text-white/70"
                  }`}
                >
                  {SEQUENCE[step].text}
                </m.p>
              </AnimatePresence>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
