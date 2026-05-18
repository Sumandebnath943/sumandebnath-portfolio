"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

const SEQUENCE = [
  { text: "INITIALIZING SYSTEMS...", duration: 1400 },
  { text: "Loading identity architecture...", duration: 1400 },
  { text: "Loading AI-native frameworks...", duration: 1400 },
  { text: "ENTERING THE SYSTEM", duration: 900 },
];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const totalDuration = SEQUENCE.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 30;
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));
    }, 30);

    let timeout = 0;
    SEQUENCE.forEach((s, i) => {
      timeout += s.duration;
      setTimeout(() => {
        if (i < SEQUENCE.length - 1) {
          setStep(i + 1);
        } else {
          // Final step: exit
          setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 700);
          }, 400);
        }
      }, timeout);
    });

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <m.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Background mesh */}
          <div className="absolute inset-0 bg-mesh-hero opacity-60" />

          {/* Orbital rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[500px] h-[500px] rounded-full border border-[rgba(77,163,255,0.12)]"
              style={{ animation: "spin-slow 25s linear infinite" }}
            />
            <div
              className="absolute w-[380px] h-[380px] rounded-full border border-[rgba(123,97,255,0.1)]"
              style={{ animation: "spin-reverse 18s linear infinite" }}
            />
            <div
              className="absolute w-[260px] h-[260px] rounded-full border border-[rgba(0,229,255,0.08)]"
              style={{ animation: "spin-slow 12s linear infinite" }}
            />
          </div>

          {/* Center logo */}
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 mb-16 flex flex-col items-center"
          >
            {/* Monogram */}
            <div className="relative mb-12 flex items-center justify-center">
              <div className="w-80 h-32 flex items-center justify-center relative overflow-hidden p-2">
                {/* Scan line */}
                <div
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/60 to-transparent"
                  style={{ animation: "scan-line 2.5s ease-in-out infinite" }}
                />
                <img 
                  src="/branding/logo_v2.png?v=3" 
                  alt="Suman Debnath Logo" 
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>
              {/* Glow behind */}
              <div className="absolute inset-0 bg-accent-blue/10 blur-3xl rounded-full -z-10 scale-150 animate-pulse" />
            </div>

            {/* Animated text */}
            <div className="h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <m.p
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`font-grotesk text-sm tracking-[0.2em] uppercase ${
                    step === SEQUENCE.length - 1
                      ? "text-accent-blue font-semibold"
                      : "text-white/70"
                  }`}
                >
                  {SEQUENCE[step].text}
                </m.p>
              </AnimatePresence>
            </div>
          </m.div>

          {/* Progress bar */}
          <div className="relative z-10 w-64">
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <m.div
                className="h-full bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                System
              </span>
              <span className="text-[10px] font-mono text-white/60">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Bottom dots */}
          <div className="absolute bottom-10 flex items-center gap-2">
            {SEQUENCE.map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-accent-blue scale-125" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
