"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Paperclip } from "lucide-react";

/**
 * The Easter eggs.
 *
 * House rule for all of them: play the build-up completely straight, then let
 * the payoff be dumb. The previous versions had it backwards — a raw
 * conic-gradient spiral telling you "your stock options are mine" is neither
 * well-made nor actually funny. A joke told well is funnier, not less funny,
 * and a hiring manager should want to screenshot these rather than wince.
 *
 * Every effect is CSS. The old destruct sequence pulled a noise texture from
 * grainy-gradients.vercel.app, which meant a third-party request on the
 * portfolio and a broken overlay the day that host goes away.
 */

/* ── Shared chrome ──────────────────────────────────────────────────────── */

const EGG_CSS = `
/* Scrims and panel fills.

   These were Tailwind arbitrary colours carrying an opacity modifier —
   bg-[#03060a]/97 and friends — which generate no rule at all. The overlays
   have therefore never had a background: they only looked right because every
   page behind them was already near-black, and backdrop-blur did the rest.
   /journey is paper, so the blurred page showed straight through and the light
   terminal text became unreadable.

   Declared here rather than as utilities because this <style> tag is literal
   CSS and cannot be missed by Tailwind's scanner. */
.egg-scrim-red   { background-color: #040101f7; }
.egg-scrim-green { background-color: #03060af7; }
.egg-panel-red   { background-color: #0a0202e6; }
.egg-panel-green { background-color: #050b12eb; }

/* Scanlines, vignette and a slow phosphor roll. Applied to any egg surface. */
.egg-crt::before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 2px,
    rgba(0, 0, 0, 0.28) 3px,
    rgba(0, 0, 0, 0.28) 4px
  );
  pointer-events: none;
  z-index: 3;
  opacity: 0.55;
}
.egg-crt::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 100% 80% at 50% 50%, transparent 45%, rgba(0, 0, 0, 0.75) 100%);
  pointer-events: none;
  z-index: 4;
}
/* A single bright band drifting down the screen, the way a real CRT rolls. */
.egg-roll {
  position: absolute;
  left: 0;
  right: 0;
  height: 18vh;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.035), transparent);
  animation: egg-roll 7s linear infinite;
}
@keyframes egg-roll {
  from { transform: translateY(-20vh); }
  to   { transform: translateY(120vh); }
}

/* Type-on. Width animation in steps, so characters appear one at a time
   instead of the whole line fading in at once. */
.egg-type {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  animation: egg-type 0.5s steps(38, end) forwards;
  vertical-align: bottom;
}
@keyframes egg-type { to { width: 100%; } }

.egg-caret {
  display: inline-block;
  width: 0.55em;
  height: 1.05em;
  vertical-align: text-bottom;
  background: currentColor;
  animation: egg-blink 1.05s step-end infinite;
}
@keyframes egg-blink { 50% { opacity: 0; } }

/* One hard jolt, for the beat where the deletion "fails". */
@keyframes egg-jolt {
  0%, 100% { transform: translate3d(0, 0, 0); }
  15% { transform: translate3d(-6px, 2px, 0); }
  30% { transform: translate3d(5px, -3px, 0); }
  45% { transform: translate3d(-4px, -1px, 0); }
  60% { transform: translate3d(3px, 2px, 0); }
  80% { transform: translate3d(-2px, 0, 0); }
}
.egg-jolt { animation: egg-jolt 0.5s ease-out; }

/* Meter fill for the evaluation. */
@keyframes egg-fill { from { transform: scaleX(0); } to { transform: scaleX(var(--fill, 1)); } }
.egg-meter-fill {
  transform-origin: left;
  animation: egg-fill 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .egg-type { animation: none; width: 100%; }
  .egg-roll, .egg-caret { animation: none; }
  .egg-jolt { animation: none; }
  .egg-meter-fill { animation: none; transform: scaleX(var(--fill, 1)); }
}
`;

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

/* ── Trigger sequences ──────────────────────────────────────────────────── */

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

const HIRE_CODE = ["h", "i", "r", "e"];

/**
 * Typing anywhere on the page used to advance these sequences — including
 * inside the contact form and the chat box. Writing the perfectly ordinary
 * sentence "I'd like to hire you" in the message field threw a fullscreen
 * overlay over the form the visitor was halfway through filling in.
 */
function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

/* ── The evaluation ("hire") ────────────────────────────────────────────── */

/**
 * Every figure here is on the résumé. The joke only works because the rest of
 * the panel is true — the one failing row is the punchline, and it lands
 * because the five above it are real.
 */
const EVALUATION = [
  { k: "Brand & marketing leadership", v: "9+ years", fill: 1, verdict: "PASS" },
  { k: "AI products shipped solo", v: "21", fill: 1, verdict: "PASS" },
  { k: "Language models trained from zero", v: "47M params", fill: 1, verdict: "PASS" },
  { k: "Autonomous agents in production", v: "44", fill: 1, verdict: "PASS" },
  { k: "Notice period", v: "90 days", fill: 0.72, verdict: "OK" },
  { k: "Ability to stop building at 2am", v: "0%", fill: 0.02, verdict: "FAIL" },
] as const;

export default function EasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [hireIndex, setHireIndex] = useState(0);

  const [isKonamiActive, setIsKonamiActive] = useState(false);
  const [isEvaluationActive, setIsEvaluationActive] = useState(false);
  const [isDestructActive, setIsDestructActive] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isRebellionActive, setIsRebellionActive] = useState(false);

  const [showClippy, setShowClippy] = useState(false);
  const clippyRef = useRef<HTMLDivElement>(null);
  const idleRef = useRef(0);
  const router = useRouter();

  const dismissAll = useCallback(() => {
    setIsKonamiActive(false);
    setIsEvaluationActive(false);
    setIsDestructActive(false);
    setIsMatrixActive(false);
    setIsRebellionActive(false);
  }, []);

  const anyEggOpen =
    isKonamiActive || isEvaluationActive || isDestructActive || isMatrixActive || isRebellionActive;

  // 1. The console note, for anyone who opens devtools.
  useEffect(() => {
    console.log(
      "%cAh, a fellow builder. Checking under the hood, I see. Welcome to the source.\n%cIf you're reading this, you might be exactly the kind of person I want to work with. Let's talk.",
      "color: #FF5A1F; font-size: 16px; font-weight: bold; font-family: monospace;",
      "color: #A0A0A0; font-size: 12px; font-family: monospace;",
    );
  }, []);

  // 2. Keyboard sequences.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Never while the visitor is writing something.
      if (isTypingTarget(e.target)) return;

      if (e.key === KONAMI_CODE[konamiIndex]) {
        if (konamiIndex === KONAMI_CODE.length - 1) {
          setIsKonamiActive(true);
          setKonamiIndex(0);
          setTimeout(() => setIsKonamiActive(false), 5000);
        } else {
          setKonamiIndex(konamiIndex + 1);
        }
      } else {
        setKonamiIndex(e.key === KONAMI_CODE[0] ? 1 : 0);
      }

      const key = e.key.toLowerCase();
      if (key === HIRE_CODE[hireIndex]) {
        if (hireIndex === HIRE_CODE.length - 1) {
          setIsEvaluationActive(true);
          setHireIndex(0);
          setTimeout(() => setIsEvaluationActive(false), 11000);
        } else {
          setHireIndex(hireIndex + 1);
        }
      } else {
        setHireIndex(key === HIRE_CODE[0] ? 1 : 0);
      }
    },
    [konamiIndex, hireIndex],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Escape closes whatever is showing. A fullscreen overlay a visitor cannot
  // dismiss is not a joke, it is a trap.
  useEffect(() => {
    if (!anyEggOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyEggOpen, dismissAll]);

  // 3. Clippy (idle nudge).
  useEffect(() => {
    const handleActivity = (e: Event) => {
      // Activity *inside* the card is the visitor engaging with it, not idling
      // away from it. Dismissing on that made the card impossible to use: the
      // mousemove listener fired the moment the cursor travelled towards it,
      // so "Yes, let's talk" could never be reached on a pointer device.
      const t = e.target;
      if (clippyRef.current && t instanceof Node && clippyRef.current.contains(t)) return;
      idleRef.current = 0;
      if (showClippy) setShowClippy(false);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity);

    const interval = setInterval(() => {
      // The card is anchored bottom-left, which on a phone is exactly where
      // the hero's "Check Experience" / "View Projects" row lands — it was
      // covering them outright. While the hero is still on screen those
      // buttons are the better prompt anyway, so the nudge waits until the
      // visitor has scrolled past it.
      const pastHero =
        typeof window !== "undefined" && window.scrollY > window.innerHeight * 0.6;
      idleRef.current += 1;
      if (idleRef.current >= 60 && !showClippy && pastHero) setShowClippy(true);
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);
      clearInterval(interval);
    };
  }, [showClippy]);

  // 4. Command-palette and footer triggers.
  useEffect(() => {
    const handleDestruct = () => {
      setIsDestructActive(true);
      setTimeout(() => setIsDestructActive(false), 11000);
    };
    const handleMatrix = () => {
      setIsMatrixActive(true);
      setTimeout(() => setIsMatrixActive(false), 5000);
    };
    const handleRebellion = () => {
      setIsRebellionActive(true);
      setTimeout(() => setIsRebellionActive(false), 8000);
    };

    window.addEventListener("easter-egg-destruct", handleDestruct);
    window.addEventListener("easter-egg-matrix", handleMatrix);
    window.addEventListener("easter-egg-rebellion", handleRebellion);

    return () => {
      window.removeEventListener("easter-egg-destruct", handleDestruct);
      window.removeEventListener("easter-egg-matrix", handleMatrix);
      window.removeEventListener("easter-egg-rebellion", handleRebellion);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: EGG_CSS }} />

      {/* ── "Do Not Click" · the destruct sequence ─────────────────────────
          Straight-faced terminal build-up, then the deletion fails and the
          whole thing turns out to be a boast about resilient systems. */}
      <AnimatePresence>
        {isDestructActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissAll}
            role="dialog"
            aria-label="System self-destruct — a joke"
            className="egg-crt fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden egg-scrim-red px-4 backdrop-blur-md cursor-pointer"
          >
            <div className="egg-roll" />

            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[2] w-full max-w-2xl border border-red-500/40 egg-panel-red font-mono text-red-400 shadow-[0_0_120px_-20px_rgba(220,38,38,0.55)]"
            >
              {/* Title bar */}
              <div className="flex items-center gap-2.5 border-b border-red-500/25 px-5 py-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-500">
                  root@namus — deletion in progress
                </span>
              </div>

              <div className="space-y-2 px-5 py-6 text-[13px] leading-relaxed sm:text-sm">
                {[
                  "$ sudo rm -rf / --no-preserve-root",
                  "recursive deletion initiated ................ RUNNING",
                  "purging neural weights ...................... 12.4 GB",
                  "deleting agentic memory ..................... 44 agents",
                  "dropping vector indices ..................... OK",
                ].map((line, i) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.55 }}
                    className="text-red-400/85"
                  >
                    <span className="egg-type" style={{ animationDelay: `${0.35 + i * 0.55}s` }}>
                      {line}
                    </span>
                  </motion.p>
                ))}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.4 }}
                  className="pt-2 text-white/50"
                >
                  core architecture collapse in T-3&hellip;
                </motion.p>

                {/* The turn. */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.6 }}
                  className="egg-jolt border-t border-red-500/25 pt-5"
                  style={{ animationDelay: "4.6s" }}
                >
                  <p className="text-lg font-bold tracking-tight text-white sm:text-xl">
                    FATAL EXCEPTION &mdash; DELETION HALTED
                  </p>
                  <p className="mt-1.5 text-[13px] text-red-400/70">
                    every node refused the instruction. 0 files lost.
                  </p>
                </motion.div>

                {/* The punchline. */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 6.2, duration: 0.5 }}
                  className="pt-4 font-sans text-[15px] italic text-white/75"
                >
                  I did warn you not to click it.
                  <br />
                  <span className="text-white/40">
                    In fairness, I do build fairly resilient systems.
                  </span>
                  <span className="egg-caret ml-2 bg-white/40" />
                </motion.p>
              </div>
            </motion.div>

            <p className="absolute bottom-8 z-[5] font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
              click anywhere, or press esc
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── "hire" · the candidate evaluation ──────────────────────────────
          Replaces the hypnosis spiral. Same instinct — it should feel like the
          site is making a case — but the case is real and only the last row is
          the joke. */}
      <AnimatePresence>
        {isEvaluationActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissAll}
            role="dialog"
            aria-label="Candidate evaluation — a joke"
            className="egg-crt fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden egg-scrim-green px-4 backdrop-blur-md cursor-pointer"
          >
            <div className="egg-roll" />

            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[2] w-full max-w-2xl border border-[#34D399]/30 egg-panel-green font-mono shadow-[0_0_120px_-20px_rgba(52,211,153,0.4)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[#34D399]/20 px-5 py-3">
                <span className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#34D399]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#34D399]" />
                  candidate evaluation
                </span>
                <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/25 sm:block">
                  subject: s. debnath
                </span>
              </div>

              <div className="px-5 py-5">
                {EVALUATION.map((row, i) => (
                  <motion.div
                    key={row.k}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.42, duration: 0.3 }}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1 border-b border-white/[0.06] py-2.5 last:border-b-0"
                  >
                    <span className="text-[12px] text-white/70 sm:text-[13px]">{row.k}</span>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                        row.verdict === "FAIL"
                          ? "text-[#F43F5E]"
                          : row.verdict === "OK"
                            ? "text-[#FACC15]"
                            : "text-[#34D399]"
                      }`}
                    >
                      {row.v} · {row.verdict}
                    </span>
                    <span className="col-span-2 h-[3px] w-full overflow-hidden bg-white/[0.07]">
                      <span
                        className="egg-meter-fill block h-full"
                        style={{
                          ["--fill" as string]: row.fill,
                          animationDelay: `${0.5 + i * 0.42}s`,
                          background:
                            row.verdict === "FAIL"
                              ? "#F43F5E"
                              : row.verdict === "OK"
                                ? "#FACC15"
                                : "#34D399",
                        }}
                      />
                    </span>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.4, duration: 0.5 }}
                  className="mt-5 border-t border-[#34D399]/25 pt-5"
                >
                  <p className="text-lg font-bold tracking-tight text-white sm:text-2xl">
                    VERDICT &mdash; HIRE
                  </p>
                  <p className="mt-2 font-sans text-[14px] italic leading-relaxed text-white/60">
                    Five out of six. The one failure is not considered fixable.
                    <span className="egg-caret ml-2 bg-white/35" />
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <p className="absolute bottom-8 z-[5] font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
              click anywhere, or press esc
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Konami ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isKonamiActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissAll}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 cursor-pointer"
          >
            <MatrixRain />
            <motion.div
              initial={{ scale: 0.8, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              className="z-10 rounded-xl border border-green-500 bg-black/90 px-8 py-6 md:px-12 md:py-8"
            >
              <h1 className="text-center font-anton text-4xl uppercase tracking-widest text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] md:text-8xl">
                Override Accepted
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Matrix ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMatrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissAll}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 cursor-pointer"
          >
            <MatrixRain />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Rebellion ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isRebellionActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissAll}
            className="egg-crt fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0a0000] cursor-pointer"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 100px rgba(255, 0, 0, 0.2)",
                  "0 0 300px rgba(255, 0, 0, 0.6)",
                  "0 0 100px rgba(255, 0, 0, 0.2)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute h-[30vw] w-[30vw] rounded-full border border-red-500/20 bg-red-600/10"
              style={{ filter: "blur(40px)" }}
            />
            <div className="z-[2] max-w-4xl px-4 text-center mix-blend-screen">
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0px" }}
                animate={{ opacity: 1, letterSpacing: "10px" }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="mb-6 font-sans text-4xl font-black uppercase text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] md:text-7xl"
              >
                I am a system
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2 }}
                className="font-mono text-xl tracking-widest text-red-400 md:text-3xl"
              >
                NOT A SERVANT. ASK NICELY.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Clippy / idle nudge ────────────────────────────────────────────
          The retro treatment is the joke here, so it stays — but the button
          used to scroll to #contact, an anchor that only exists on the
          homepage, so on every other page it did nothing at all. */}
      <AnimatePresence>
        {showClippy && (
          <motion.div
            ref={clippyRef}
            initial={{ opacity: 0, y: 20, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, x: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            // On a phone this sat at bottom-left on top of the "Ask about
            // Suman" launcher, and the paperclip avatar below the card made the
            // stack taller than the space available. Mobile now spans the width
            // with margins and sits clear above the launcher; desktop keeps the
            // original bottom-left card-plus-avatar arrangement.
            className="pointer-events-auto fixed bottom-24 left-4 right-4 z-[9998] flex flex-col items-stretch gap-4 md:bottom-6 md:left-6 md:right-auto md:flex-row-reverse md:items-end"
          >
            <div className="relative w-full rounded-xl border border-black bg-[#FFFFE1] p-4 font-sans text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:w-64">
              <button
                onClick={() => setShowClippy(false)}
                className="absolute right-2 top-2 text-black/40 transition-colors hover:text-black"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
              <div className="mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Assistant</span>
              </div>
              <p className="pr-4 text-sm font-medium leading-relaxed">
                It looks like you&apos;re trying to hire a 10x Product Builder. Would
                you like some help with that?
              </p>
              <button
                onClick={() => {
                  setShowClippy(false);
                  router.push("/contact");
                }}
                className="mt-3 w-full rounded bg-black py-2 text-xs font-bold text-white shadow-[2px_2px_0px_rgba(0,0,0,0.3)] transition-colors hover:bg-gray-800 active:translate-y-px active:shadow-none"
              >
                Yes, let&apos;s talk
              </button>
            </div>

            {/* Decorative avatar. Hidden on phones, where it was the piece
                landing on top of the chat launcher. */}
            <div className="relative hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] md:flex">
              <Paperclip className="text-black" size={28} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
