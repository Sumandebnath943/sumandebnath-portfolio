"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ── PRINCIPLES DATA ───────────────────────────────────────────────────────────

const principles = [
  {
    id: "infrastructure",
    number: "01",
    title: "Intelligence Is Infrastructure",
    paragraphs: [
      "AI is no longer a feature.",
      "It is becoming the foundational layer through which products, systems, interfaces, operations, and decisions are designed.",
      "The future will not belong to people who merely use AI. It will belong to those who can architect around it.",
    ],
    size: "hero", // full-width dominant
    textColor: "text-[#2E6FBF]",
    borderColor: "border-[#2E6FBF]/30",
  },
  {
    id: "systems",
    number: "02",
    title: "Systems Compound",
    paragraphs: [
      "One-off execution eventually collapses under scale.",
      "Systems do not.",
      "The goal is no longer to simply solve problems, but to build environments where solutions continuously emerge, adapt, and evolve.",
    ],
    size: "half",
    textColor: "text-[#10B981]",
    borderColor: "border-[#10B981]/30",
  },
  {
    id: "human",
    number: "03",
    title: "Human Identity Must Survive Automation",
    paragraphs: [
      "As artificial intelligence becomes more capable, human originality becomes more valuable.",
      "The challenge is no longer access to intelligence.",
      "The challenge is preserving judgment, taste, instinct, perspective, and human identity inside increasingly automated systems.",
    ],
    size: "half",
    textColor: "text-[#FF5A1F]",
    borderColor: "border-[#FF5A1F]/30",
  },
  {
    id: "craft",
    number: "04",
    title: "Craft Still Matters",
    paragraphs: [
      "AI accelerates execution.",
      "But execution without taste creates noise.",
      "Design, clarity, composition, language, and emotional precision still separate meaningful systems from disposable ones.",
    ],
    size: "half",
    textColor: "text-[#C5A059]",
    borderColor: "border-[#C5A059]/40",
  },
  {
    id: "speed",
    number: "05",
    title: "Speed Is A Creative Advantage",
    paragraphs: [
      "AI-native environments have fundamentally changed the relationship between thought and execution.",
      "The ability to rapidly prototype, iterate, test, and evolve systems is now a strategic advantage.",
    ],
    size: "half",
    textColor: "text-[#7B61FF]",
    borderColor: "border-[#7B61FF]/30",
  },
  {
    id: "operator",
    number: "06",
    title: "The Operator Evolves",
    paragraphs: [
      "The modern builder is no longer limited to a single discipline.",
      "Design, strategy, systems thinking, automation, engineering, and AI orchestration are beginning to converge into one new operating model.",
    ],
    size: "hero",
    textColor: "text-[#FF003C]",
    borderColor: "border-[#FF003C]/30",
  },
];

// ── PRINCIPLE PANEL ───────────────────────────────────────────────────────────

function PrinciplePanel({
  principle,
  delay = 0,
}: {
  principle: (typeof principles)[0];
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className={`border-t ${principle.borderColor} pt-10 pb-12 transition-colors duration-500`}>
        {/* Number */}
        <p className={`font-manrope text-[10px] tracking-[0.4em] mb-8 font-bold ${principle.textColor}`}>
          {principle.number}
        </p>

        {/* Title */}
        <h3
          className={`font-manrope font-semibold text-[#0A0A0A] leading-tight tracking-tight mb-8 ${
            principle.size === "hero"
              ? "text-3xl md:text-4xl lg:text-5xl"
              : "text-2xl md:text-3xl"
          }`}
        >
          {principle.title}
        </h3>

        {/* Body */}
        <div className="space-y-4 max-w-prose">
          {principle.paragraphs.map((para, i) => (
            <p
              key={i}
              className={`font-manrope leading-[1.85] ${
                i === 0
                  ? "text-[#111] text-base md:text-[17px] font-medium"
                  : "text-[#444] text-sm md:text-base font-medium"
              }`}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </m.div>
  );
}

// ── CINEMATIC QUOTE ───────────────────────────────────────────────────────────

function CinematicQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 md:py-28 border-t border-[#1A1A1A]/10"
    >
      <blockquote className="font-serif italic font-normal text-3xl md:text-4xl lg:text-5xl text-[#0A0A0A] leading-snug max-w-4xl">
        {quote}
      </blockquote>
      {attribution && (
        <p className="font-manrope text-[10px] uppercase tracking-[0.4em] text-[#555] font-bold mt-10">
          — {attribution}
        </p>
      )}
    </m.div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

export default function AIPhilosophy() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper
      id="philosophy"
      className="py-40 px-6 bg-white"
      showLine={false}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── SECTION HEADER ── */}
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24"
        >
          <p className="font-manrope text-[10px] text-[#999] uppercase tracking-[0.4em] mb-8">
            05 / Operating Principles
          </p>
          <h2 className="font-manrope font-semibold text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] leading-tight tracking-tight mb-8">
            The philosophy behind every system,
            <br />
            <span className="text-[#0A0A0A]/70">workflow, and decision.</span>
          </h2>
          <p className="font-manrope text-base text-[#444] leading-relaxed max-w-xl font-medium">
            These are not motivational statements. They are operational beliefs
            shaping products, systems, automation, and human-AI interaction.
          </p>
        </m.div>

        {/* ── LAYOUT: HERO PRINCIPLE 01 ── */}
        <PrinciplePanel principle={principles[0]} delay={0} />

        {/* ── CINEMATIC QUOTE 01 ── */}
        <CinematicQuote
          quote="The future belongs to operators who can think across systems."
          attribution="Suman Debnath"
        />

        {/* ── 2-COLUMN: PRINCIPLES 02 + 03 ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          <PrinciplePanel principle={principles[1]} delay={0.05} />
          <PrinciplePanel principle={principles[2]} delay={0.12} />
        </div>

        {/* ── CINEMATIC QUOTE 02 ── */}
        <CinematicQuote
          quote="Execution without taste creates noise. Craft is what makes systems worth building."
        />

        {/* ── 2-COLUMN: PRINCIPLES 04 + 05 ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          <PrinciplePanel principle={principles[3]} delay={0.05} />
          <PrinciplePanel principle={principles[4]} delay={0.12} />
        </div>

        {/* ── HERO PRINCIPLE 06 ── */}
        <PrinciplePanel principle={principles[5]} delay={0} />

        {/* ── CLOSING STATEMENT ── */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="pt-20 mt-4 border-t border-[#1A1A1A]/10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <p className="font-serif italic font-normal text-2xl md:text-3xl text-[#222] max-w-xl leading-snug">
            "This is someone thinking deeply about the future relationship between humans,
            systems, intelligence, and execution."
          </p>
          <p className="font-manrope text-[10px] uppercase tracking-[0.4em] text-[#666] font-bold flex-shrink-0">
            — Operating Philosophy
          </p>
        </m.div>

      </div>
    </SectionWrapper>
  );
}
