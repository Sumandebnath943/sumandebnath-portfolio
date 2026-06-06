"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      className="relative flex flex-col h-screen min-h-[620px] overflow-hidden bg-[#0A0A0C] text-[#F5F0E6]"
    >
      {/* ── Background layers ──────────────────────────────────────────── */}
      {/* Deep warm gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_75%_45%,rgba(60,28,12,0.55)_0%,transparent_60%),radial-gradient(ellipse_70%_60%_at_20%_90%,rgba(20,16,14,0.6)_0%,transparent_70%)]" />
      {/* Crosshair technical grid */}
      <div className="absolute inset-0 hero-crosshair opacity-70" />
      {/* Electric-orange ambient glow behind the portrait */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#FF5500] opacity-[0.13] blur-[150px] pointer-events-none" />
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

      {/* ── Portrait — right side, bleeds off edge, spans full hero height.
            On mobile it's nudged down so the face sits in the clear band
            between the meta text and the headline. ──────────────────────── */}
      <div className="absolute top-0 right-0 bottom-0 w-[92%] sm:w-[58%] lg:w-[44%] translate-y-[7%] lg:translate-y-0 pointer-events-none select-none">
        <div className="relative w-full h-full">
          <Image
            src="/images/suman.png"
            alt="Portrait of Suman Debnath, AI-Native Product Builder and AI Generalist"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 44vw, 80vw"
            className="object-cover object-[center_22%] grayscale brightness-[0.82] contrast-[1.05]"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 32%, black 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 14%, black 88%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 32%, black 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 14%, black 88%, transparent 100%)",
              WebkitMaskComposite: "source-in",
            }}
          />
          {/* Warm electric-orange tint over the B&W portrait */}
          <div
            className="absolute inset-0 bg-[#FF5500] mix-blend-color opacity-[0.42]"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 32%, black 84%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 32%, black 84%, transparent 100%)",
            }}
          />
          {/* Soft orange highlight to make the tint feel "electric" */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_55%_40%,rgba(255,100,0,0.35)_0%,transparent_70%)] mix-blend-screen opacity-70" />

          {/* Radar dot-grid overlay */}
          <div
            className="absolute inset-0 hero-radar-dots opacity-[0.45]"
            style={{
              maskImage:
                "radial-gradient(ellipse 52% 50% at 55% 42%, black 0%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 52% 50% at 55% 42%, black 0%, transparent 75%)",
            }}
          />
          {/* The single pulsing radar dot with expanding ping ring */}
          <div className="absolute left-[56%] top-[40%] -translate-x-1/2 -translate-y-1/2">
            <span className="block w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_12px_4px_rgba(255,85,0,0.8)] animate-pulse-glow" />
            <span
              className="absolute inset-0 w-2 h-2 rounded-full border border-[#FF8000]"
              style={{ animation: "radar-ping 2.4s ease-out infinite" }}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom scrim — keeps the headline legible over the portrait.
            Strong on mobile (text sits in front of the face) and lighter on
            desktop (the text is over the dark left side). ──────────────── */}
      <div className="absolute inset-x-0 bottom-0 h-[58%] z-[5] pointer-events-none bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/85 to-transparent lg:h-[48%] lg:via-[#0A0A0C]/35" />

      {/* ── Top status bar ─────────────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-16 pt-20 lg:pt-24 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] text-[#9a8f86]"
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
          <span className="text-[#FF8000] group-hover:text-[#FFB347]">
            WHATSAPP
          </span>
        </a>
      </m.div>

      {/* ── Meta label grid ────────────────────────────────────────────── */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 px-6 md:px-12 lg:px-16 mt-4 lg:mt-6">
        {/* [001.1] role */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="md:col-span-5"
        >
          <span className="block font-mono text-[11px] tracking-[0.2em] text-[#FF8000] mb-2.5">
            [001.1]
          </span>
          <h2 className="font-anton text-base sm:text-lg lg:text-[24px] leading-[1.05] tracking-wide uppercase text-[#F5F0E6]">
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
          className="md:col-span-4 md:col-start-6"
        >
          <span className="block font-mono text-[11px] tracking-[0.2em] text-[#9a8f86] mb-2.5">
            [001.2]
          </span>
          <p className="font-mono text-[11px] sm:text-xs leading-[1.7] uppercase tracking-wide text-[#b8ada3]">
            I craft intelligent systems and AI-native products for businesses
            seeking to elevate their strategic and technical level.
          </p>
        </m.div>

      </div>

      {/* ── Giant headline — fills remaining space, bottom-aligned ──────── */}
      <m.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
        className="relative z-10 flex-1 flex items-end px-6 md:px-12 lg:px-16 min-h-0"
      >
        <h2 className="w-full font-anton uppercase text-[#F5F0E6] leading-[0.85] tracking-[-0.01em] text-[12vw] sm:text-[11vw] lg:text-[10vw] xl:text-[120px] [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]">
          <span className="block">I Build</span>
          <span className="block">Experiences With</span>
          <span className="block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8000] via-[#FF4500] to-[#FF8000]">
              Intelligence
            </span>
          </span>
        </h2>
      </m.div>

      {/* ── CTAs — restored original trio, fully visible above the fold ─── */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: EASE }}
        className="relative z-20 flex flex-wrap items-center gap-3 px-6 md:px-12 lg:px-16 pb-6 lg:pb-8 pt-4"
      >
        <a
          href="#experience-narrative"
          className="group flex items-center justify-center gap-2 rounded-full bg-[#F5F0E6] px-5 py-2.5 lg:px-6 lg:py-3 text-[12px] lg:text-[13px] font-medium text-black transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
        >
          Check Experience
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="#projects"
          className="flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 lg:px-6 lg:py-3 text-[12px] lg:text-[13px] font-medium text-[#F5F0E6] backdrop-blur-md transition-colors hover:border-[#FF8000]/40 hover:bg-white/[0.08]"
        >
          View Projects
        </a>
        <a
          href="#history"
          className="flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 lg:px-6 lg:py-3 text-[12px] lg:text-[13px] font-medium text-[#F5F0E6] backdrop-blur-md transition-colors hover:border-[#FF8000]/40 hover:bg-white/[0.08]"
        >
          Career Journey
        </a>
      </m.div>
    </section>
  );
}
