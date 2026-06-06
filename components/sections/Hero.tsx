"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

/* ── Live dual-clock hook ───────────────────────────────────────────────
   Renders nothing until mounted so the server/client markup matches and
   we avoid a hydration mismatch on the ticking time. */
function useClock(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const localHour = useClock("Asia/Kolkata");
  const usaHour = useClock("America/New_York");

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#0A0A0C] text-[#F5F0E6]"
    >
      {/* ── Background layers ──────────────────────────────────────────── */}
      {/* Deep warm gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_75%_40%,rgba(60,28,12,0.55)_0%,transparent_60%),radial-gradient(ellipse_70%_60%_at_20%_90%,rgba(20,16,14,0.6)_0%,transparent_70%)]" />
      {/* Crosshair technical grid */}
      <div className="absolute inset-0 hero-crosshair opacity-70" />
      {/* Electric-orange ambient glow behind the portrait */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#ff6a00] opacity-[0.10] blur-[150px] pointer-events-none" />
      {/* Film grain */}
      <div className="absolute inset-0 hero-grain opacity-[0.06] mix-blend-overlay pointer-events-none" />

      {/*
        Visually-hidden semantic H1 for SEO/AI search. Carries the full
        keyword payload so crawlers see the canonical entity line, without
        altering the cinematic visual headline below.
      */}
      <h1 className="sr-only">
        Suman Debnath — AI-Native Product Builder, AI Generalist, and AI-Native Software Developer.
      </h1>

      {/* ── Top status bar ─────────────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-16 pt-24 lg:pt-28 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] text-[#9a8f86]"
      >
        <div className="flex items-center gap-4 sm:gap-8">
          <span className="tabular-nums">
            LOCAL HOUR:{" "}
            <span className="text-[#F5F0E6]">{localHour ?? "--:--:--"}</span>{" "}
            <span className="hidden sm:inline">[GMT +5:30]</span>
          </span>
          <span className="hidden md:inline tabular-nums">
            USA HOUR:{" "}
            <span className="text-[#F5F0E6]">{usaHour ?? "--:--:--"}</span>{" "}
            [GMT −5]
          </span>
        </div>
        <a
          href="https://wa.me/917980296957"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 transition-colors hover:text-[#F5F0E6]"
        >
          GET IN TOUCH:
          <span className="text-[#ff8a33] group-hover:text-[#ffae6b]">
            WHATSAPP
          </span>
        </a>
      </m.div>

      {/* ── Meta label grid ────────────────────────────────────────────── */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 px-6 md:px-12 lg:px-16 mt-10 lg:mt-14">
        {/* [001.1] role */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="md:col-span-5"
        >
          <span className="block font-mono text-[11px] tracking-[0.2em] text-[#ff8a33] mb-3">
            [001.1]
          </span>
          <h2 className="font-anton text-xl sm:text-2xl lg:text-[28px] leading-[1.05] tracking-wide uppercase text-[#F5F0E6]">
            AI-Native Product Builder
            <br />
            &amp; Brand Strategy
          </h2>
        </m.div>

        {/* [001.2] tagline */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="md:col-span-4 md:col-start-7"
        >
          <span className="block font-mono text-[11px] tracking-[0.2em] text-[#9a8f86] mb-3">
            [001.2]
          </span>
          <p className="font-mono text-[11px] sm:text-xs leading-[1.7] uppercase tracking-wide text-[#b8ada3]">
            I craft intelligent systems and AI-native products for businesses
            seeking to elevate their strategic and technical level.
          </p>
        </m.div>

        {/* Copyright */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="hidden md:block md:col-span-1 md:col-start-12 text-right"
        >
          <span className="font-mono text-[11px] tracking-[0.15em] text-[#9a8f86] whitespace-nowrap">
            ©2026 SUMAN DEBNATH
          </span>
        </m.div>
      </div>

      {/* ── Portrait + giant headline stage ────────────────────────────── */}
      <div className="relative mt-8 lg:mt-4">
        {/* Portrait — right side, bleeds off the edge, sits behind headline */}
        <div className="absolute top-0 right-0 bottom-[-10%] w-[88%] sm:w-[64%] lg:w-[46%] pointer-events-none select-none">
          <div className="relative w-full h-full">
            <Image
              src="/images/suman.png"
              alt="Portrait of Suman Debnath, AI-Native Product Builder and AI Generalist"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 46vw, 80vw"
              className="object-cover object-[center_18%] grayscale brightness-[0.82] contrast-[1.05]"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 30%, black 82%, transparent 100%), linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 30%, black 82%, transparent 100%), linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                WebkitMaskComposite: "source-in",
              }}
            />
            {/* Warm electric-orange tint over the B&W portrait */}
            <div
              className="absolute inset-0 bg-[#ff6a00] mix-blend-color opacity-[0.45]"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 30%, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 30%, black 82%, transparent 100%)",
              }}
            />
            {/* Soft orange highlight to make the tint feel "electric" */}
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_40%,rgba(255,140,60,0.35)_0%,transparent_70%)] mix-blend-screen opacity-60"
            />

            {/* Radar dot-grid + pulsing dot overlay */}
            <div
              className="absolute inset-0 hero-radar-dots opacity-[0.5]"
              style={{
                maskImage:
                  "radial-gradient(ellipse 55% 55% at 50% 45%, black 0%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 55% 55% at 50% 45%, black 0%, transparent 75%)",
              }}
            />
            {/* The single pulsing radar dot with expanding ping ring */}
            <div className="absolute left-[52%] top-[42%] -translate-x-1/2 -translate-y-1/2">
              <span className="block w-2 h-2 rounded-full bg-[#ff6a00] shadow-[0_0_12px_4px_rgba(255,106,0,0.7)] animate-pulse-glow" />
              <span className="absolute inset-0 w-2 h-2 rounded-full border border-[#ff8a33]" style={{ animation: "radar-ping 2.4s ease-out infinite" }} />
            </div>
          </div>
        </div>

        {/* Giant condensed display headline (decorative — semantic H1 is sr-only) */}
        <m.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
          className="relative z-10 px-6 md:px-12 lg:px-16 pt-20 sm:pt-28 lg:pt-24"
        >
          <h2 className="font-anton uppercase text-[#F5F0E6] leading-[0.86] tracking-[-0.01em] [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]">
            <span className="block text-[16vw] sm:text-[14vw] lg:text-[12.5vw] xl:text-[180px]">
              I Build
            </span>
            <span className="block text-[16vw] sm:text-[14vw] lg:text-[12.5vw] xl:text-[180px]">
              Experiences
            </span>
            <span className="block text-[16vw] sm:text-[14vw] lg:text-[12.5vw] xl:text-[180px]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a33] via-[#ff6a00] to-[#ff8a33]">
                With
              </span>{" "}
              Intelligence
            </span>
          </h2>
        </m.div>
      </div>

      {/* ── Bottom-center pill CTA ──────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: EASE }}
        className="relative z-20 flex justify-center px-6 pb-16 lg:pb-20 mt-10 lg:mt-0"
      >
        <a
          href="#contact"
          className="group relative flex items-center gap-4 rounded-full border border-white/[0.12] bg-white/[0.03] backdrop-blur-md pl-5 pr-7 py-3.5 transition-colors hover:border-[#ff8a33]/40"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F5F0E6] text-[#0A0A0C] transition-transform group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </span>
          <span className="relative font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-[#F5F0E6]">
            Send Message For Work
            {/* Animated underline sweep */}
            <span className="absolute -bottom-1.5 left-0 h-px w-full overflow-hidden">
              <span className="block h-px w-1/3 bg-[#ff8a33] transition-transform duration-500 ease-out group-hover:translate-x-[300%]" />
            </span>
          </span>
        </a>
      </m.div>
    </section>
  );
}
