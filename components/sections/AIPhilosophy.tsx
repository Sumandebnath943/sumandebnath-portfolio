"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionKicker from "@/components/ui/SectionKicker";

/**
 * Operating principles.
 *
 * The previous shape was hero panel → quote → two-column pair → quote →
 * two-column pair → hero panel → closing statement. Six principles rendered at
 * three different sizes, interrupted twice by pull quotes that restated points
 * the panels were already making. Reading order was ambiguous — the eye had no
 * way to tell whether the quotes were principles too — and it cost roughly
 * 2,500px of scroll.
 *
 * They are now what they always were: a numbered list of six equal beliefs. One
 * grid, one size, one direction of travel, and a single quote at the end instead
 * of three. Each principle keeps a punchy lead line and one supporting sentence;
 * nothing was cut that carried an idea of its own.
 */

// ── PRINCIPLES DATA ───────────────────────────────────────────────────────────

const principles = [
  {
    id: "infrastructure",
    number: "01",
    title: "Intelligence Is Infrastructure",
    lead: "AI is no longer a feature.",
    body: "It is becoming the foundational layer through which products, systems, interfaces and decisions get designed. The future will not belong to people who merely use AI — it will belong to those who can architect around it.",
    numberColor: "text-[#255A9C]",
    borderColor: "border-[#2E6FBF]/30",
    hoverBorder: "group-hover:border-[#2E6FBF]/70",
  },
  {
    id: "systems",
    number: "02",
    title: "Systems Compound",
    lead: "One-off execution collapses under scale. Systems do not.",
    body: "The goal is no longer to solve problems, but to build environments where solutions continuously emerge, adapt and evolve.",
    numberColor: "text-[#0A7A55]",
    borderColor: "border-[#10B981]/30",
    hoverBorder: "group-hover:border-[#10B981]/70",
  },
  {
    id: "human",
    number: "03",
    title: "Human Identity Must Survive Automation",
    lead: "As AI becomes more capable, human originality becomes more valuable.",
    body: "The challenge is no longer access to intelligence. It is preserving judgment, taste, instinct and perspective inside increasingly automated systems.",
    numberColor: "text-[#C4400E]",
    borderColor: "border-[#FF5A1F]/30",
    hoverBorder: "group-hover:border-[#FF5A1F]/70",
  },
  {
    id: "craft",
    number: "04",
    title: "Craft Still Matters",
    lead: "AI accelerates execution — and execution without taste creates noise.",
    body: "Design, clarity, composition, language and emotional precision still separate meaningful systems from disposable ones.",
    numberColor: "text-[#8A6A28]",
    borderColor: "border-[#C5A059]/40",
    hoverBorder: "group-hover:border-[#C5A059]/80",
  },
  {
    id: "speed",
    number: "05",
    title: "Speed Is A Creative Advantage",
    lead: "Thought and execution are no longer separated by weeks.",
    body: "AI-native environments changed that relationship permanently. The ability to prototype, iterate, test and evolve a system quickly is now a strategic advantage in itself.",
    numberColor: "text-[#5F45E0]",
    borderColor: "border-[#7B61FF]/30",
    hoverBorder: "group-hover:border-[#7B61FF]/70",
  },
  {
    id: "operator",
    number: "06",
    title: "The Operator Evolves",
    lead: "The modern builder is no longer limited to a single discipline.",
    body: "Design, strategy, systems thinking, automation, engineering and AI orchestration are converging into one new operating model.",
    numberColor: "text-[#D10031]",
    borderColor: "border-[#FF003C]/30",
    hoverBorder: "group-hover:border-[#FF003C]/70",
  },
];

// ── PRINCIPLE CARD ────────────────────────────────────────────────────────────

function PrincipleCard({
  principle,
  index,
}: {
  principle: (typeof principles)[0];
  index: number;
}) {
  return (
    <m.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className={`h-full border-t-2 ${principle.borderColor} ${principle.hoverBorder} pt-6 transition-colors duration-500`}
      >
        <span
          className={`block font-manrope text-[11px] tracking-[0.35em] font-bold mb-4 ${principle.numberColor}`}
        >
          {principle.number}
        </span>

        <h3 className="font-manrope font-semibold text-[#0A0A0A] text-xl md:text-[1.4rem] leading-[1.25] tracking-tight mb-4 text-balance">
          {principle.title}
        </h3>

        <p className="font-manrope text-[#111] text-[15px] md:text-base font-semibold leading-[1.6] mb-3">
          {principle.lead}
        </p>
        <p className="font-manrope text-[#444] text-sm md:text-[15px] font-medium leading-[1.75]">
          {principle.body}
        </p>
      </div>
    </m.li>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

export default function AIPhilosophy() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper
      id="philosophy"
      className="py-16 md:py-20 px-6 bg-white"
      showLine={false}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── SECTION HEADER ── */}
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14 max-w-2xl"
        >
          {/* On white — the shared default palette. */}
          <SectionKicker className="mb-6">05 / Operating Principles</SectionKicker>
          <h2 className="font-manrope font-semibold text-3xl md:text-4xl lg:text-5xl text-[#0A0A0A] leading-[1.1] tracking-tight mb-4">
            The philosophy behind every system,{" "}
            <span className="text-[#0A0A0A]/60">workflow, and decision.</span>
          </h2>
          <p className="font-manrope text-[15px] md:text-base text-[#444] leading-relaxed max-w-xl font-medium">
            Six operational beliefs — not motivational statements. They shape the
            products, the systems, the automation, and how the human stays in the
            loop.
          </p>
        </m.div>

        {/* ── THE SIX ── */}
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 xl:gap-x-14 gap-y-10 md:gap-y-12">
          {principles.map((p, i) => (
            <PrincipleCard key={p.id} principle={p} index={i} />
          ))}
        </ol>

        {/* ── ONE CLOSING QUOTE, NOT THREE ── */}
        <m.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 md:mt-16 pt-8 border-t border-[#1A1A1A]/10"
        >
          <blockquote className="font-serif italic font-normal text-2xl md:text-3xl lg:text-[2.25rem] text-[#0A0A0A] leading-[1.35] max-w-3xl">
            The future belongs to operators who can{" "}
            <span className="text-[#0A0A0A]/60">think across systems.</span>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-4">
            <span className="h-px w-10 bg-[#1A1A1A]/25 shrink-0" />
            <span className="font-manrope text-[11px] uppercase tracking-[0.28em] text-[#4A4A4A] font-semibold">
              Suman Debnath
            </span>
          </figcaption>
        </m.figure>

      </div>
    </SectionWrapper>
  );
}
