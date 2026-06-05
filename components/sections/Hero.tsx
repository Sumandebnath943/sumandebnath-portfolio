"use client";

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[80vh] lg:min-h-[95vh] xl:min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-16 xl:px-20 pt-24 pb-12 bg-black"
    >
      {/* ── Minimalist Ambient Background ─────────────────────────────────── */}
      {/* Very soft, slow-moving cinematic glow (OpenAI style fluid aura) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.15] pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white via-white/50 to-transparent blur-[120px] mix-blend-screen" />
      </div>

      {/*
        Visually-hidden semantic H1 for SEO/AI search.
        Carries the full keyword payload (name + three target identities) so
        crawlers that prioritise the first H1 see the canonical entity line,
        without altering the cinematic visual headline below.
      */}
      <h1 className="sr-only">
        Suman Debnath — AI-Native Product Builder, AI Generalist, and AI-Native Software Developer.
      </h1>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-16 lg:gap-24">

        {/* ── LEFT: Typography & Content ──────────────────────────────────────── */}
        <div className="relative z-10 flex-1 flex flex-col items-start text-left max-w-[62%] lg:max-w-[55%]">

          {/* Eyebrow */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span className="text-[13px] font-medium text-[#86868b] tracking-wide whitespace-nowrap">
              Suman Debnath
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-[#86868b]/50 shrink-0" />
            <span className="hidden sm:inline text-[13px] font-medium text-[#86868b] tracking-wide whitespace-nowrap">
              Senior Brand Marketing Manager
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-[#86868b]/50 shrink-0" />
            <span className="hidden sm:inline text-[13px] font-medium text-[#86868b] tracking-wide whitespace-nowrap">
              AI-Native Product Builder
            </span>
          </m.div>

          {/* Cinematic display headline — semantic H1 lives in sr-only block above. */}
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-manrope font-medium text-[32px] sm:text-[44px] lg:text-[72px] leading-[1.05] tracking-tight text-[#f5f5f7] mb-8 [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]"
          >
            From Branding
            <br />
            To <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-b from-[#f5f5f7] to-[#86868b] pr-2">Intelligent</span>
            <br />
            Systems.
          </m.div>

          {/* Subtext */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-inter text-sm lg:text-[15px] text-[#86868b] leading-[1.6] max-w-full mb-8 font-light tracking-tight [text-shadow:0_1px_12px_rgba(0,0,0,1)]"
          >
            Evolving from branding and growth into intelligent systems, AI-native products, automation workflows, and digital architectures built for the future.
          </m.p>

          {/* CTA Buttons */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap"
          >
            <a
              href="#experience-narrative"
              className="group flex items-center justify-center gap-2 bg-[#f5f5f7] text-black px-5 py-3 lg:px-8 lg:py-4 rounded-full text-[13px] lg:text-[15px] font-medium transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
            >
              Check Experience
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center px-5 py-3 lg:px-8 lg:py-4 rounded-full text-[13px] lg:text-[15px] font-medium text-[#f5f5f7] bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
            >
              View Projects
            </a>
            <a
              href="#history"
              className="flex items-center justify-center px-5 py-3 lg:px-8 lg:py-4 rounded-full text-[13px] lg:text-[15px] font-medium text-[#f5f5f7] bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
            >
              Career Journey
            </a>
          </m.div>
        </div>

        {/* Mobile portrait — right-side cinematic overlay */}
        {/*
          Strategy:
          - Container pushed right of screen edge so shoulder bleeds off.
          - objectPosition x=55% keeps the face/head in the right half of the
            container which maps to the empty right column (~60–100% of screen).
          - top-0 / bottom-0 spans full height; image is top-anchored (y=0%).
          - Left mask fade starts early (32%) so text is unobstructed.
          - Right mask fade (78–100%) dissolves the shoulder.
          - Bottom fade keeps it cinematic.
        */}
        <div
          className="lg:hidden absolute top-0 bottom-0 pointer-events-none"
          style={{ right: '-12%', width: '90%' }}
        >
          <Image
            src="/images/suman.png"
            alt="Portrait of Suman Debnath, AI-Native Product Builder and AI Generalist"
            fill
            priority
            fetchPriority="high"
            sizes="90vw"
            className="object-cover grayscale brightness-[0.82]"
            style={{
              objectPosition: '55% 0%',
              maskImage:
                'linear-gradient(to right, transparent 0%, black 32%, black 78%, transparent 100%), ' +
                'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 32%, black 78%, transparent 100%), ' +
                'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
            }}
          />
        </div>

        {/* Frameless portrait — full bleed, extends left. Desktop only. */}
        <div className="hidden lg:block absolute top-0 bottom-[-20%] right-0 w-[55%] pointer-events-none" style={{ transform: 'translate(-6%, -16%)' }}>
          <Image
            src="/images/suman.png"
            alt="Portrait of Suman Debnath, AI-Native Product Builder and AI Generalist"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 55vw, 0vw"
            className="object-cover object-[center_10%] grayscale brightness-[0.85]"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%), linear-gradient(to right, transparent 0%, black 18%, black 75%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%), linear-gradient(to right, transparent 0%, black 18%, black 75%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
            }}
          />
        </div>

      </div>
    </section>
  );
}
