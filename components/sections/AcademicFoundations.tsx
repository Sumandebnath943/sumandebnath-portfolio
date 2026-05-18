"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ── DATA ──────────────────────────────────────────────────────────────────────

const entries = [
  {
    id: "english-hons",
    years: "2013 — 2016",
    number: "01",
    degree: "BA — English (Hons.)",
    institution: "West Bengal State University",
    description:
      "Built the foundation for language, communication, storytelling, human psychology, and structured expression.",
    disciplines: ["Language", "Communication", "Storytelling", "Human Psychology", "Structured Expression"],
    status: "completed",
    // Lightest — most human
    yearColor: "text-[#AAA]",
    numberColor: "text-[#CCC]",
    degreeColor: "text-[#0A0A0A]",
    institutionColor: "text-[#555] font-semibold",
    descColor: "text-[#1A1A1A]/80 font-medium",
    chipBg: "bg-[#1A1A1A]/[0.04]",
    chipBorder: "border-[#1A1A1A]/[0.08]",
    chipText: "text-[#1A1A1A]/90 font-medium",
    lineColor: "bg-[#E8E8E8]",
    dotColor: "bg-[#D0D0D0]",
  },
  {
    id: "mba-marketing",
    years: "2016 — 2018",
    number: "02",
    degree: "MBA — Marketing",
    institution: "Pune Institute of Business Management",
    description:
      "Expanded into strategy, brand systems, growth, campaign architecture, market behavior, and organizational execution.",
    disciplines: ["Brand Strategy", "Growth", "Campaign Architecture", "Market Behavior", "Organizational Systems"],
    status: "completed",
    yearColor: "text-[#999]",
    numberColor: "text-[#BBB]",
    degreeColor: "text-[#0A0A0A]",
    institutionColor: "text-[#555] font-semibold",
    descColor: "text-[#1A1A1A]/80 font-medium",
    chipBg: "bg-[#1A1A1A]/[0.05]",
    chipBorder: "border-[#1A1A1A]/[0.1]",
    chipText: "text-[#1A1A1A]/90 font-medium",
    lineColor: "bg-[#E0E0E0]",
    dotColor: "bg-[#C0C0C0]",
  },
  {
    id: "pgp-digital",
    years: "2023",
    number: "03",
    degree: "PGP — Strategic Digital Marketing",
    institution: "Great Lakes (GL)",
    description:
      "Focused on digital ecosystems, performance infrastructure, online growth systems, analytics, and scalable digital execution.",
    disciplines: ["Digital Ecosystems", "Performance Infrastructure", "Analytics", "Growth Systems", "Digital Execution"],
    status: "completed",
    yearColor: "text-[#888]",
    numberColor: "text-[#AAA]",
    degreeColor: "text-[#0A0A0A]",
    institutionColor: "text-[#555] font-semibold",
    descColor: "text-[#1A1A1A]/80 font-medium",
    chipBg: "bg-[#1A1A1A]/[0.05]",
    chipBorder: "border-[#1A1A1A]/[0.1]",
    chipText: "text-[#1A1A1A]/90 font-medium",
    lineColor: "bg-[#D8D8D8]",
    dotColor: "bg-[#AAAAAA]",
  },
  {
    id: "prompt-engineering",
    years: "2025",
    number: "04",
    degree: "Certified in Prompt & Context Engineering",
    institution: null,
    description:
      "The transition layer into AI-native systems thinking. Focused on structured prompting, context architecture, AI reasoning workflows, instruction design, human-AI interaction models, and operational AI communication systems.",
    disciplines: ["Structured Prompting", "Context Architecture", "AI Reasoning Workflows", "Instruction Design", "Human-AI Interaction", "AI Communication Systems"],
    status: "completed",
    yearColor: "text-[#777]",
    numberColor: "text-[#999]",
    degreeColor: "text-[#0A0A0A]",
    institutionColor: "text-[#555] font-semibold",
    descColor: "text-[#1A1A1A]/80 font-medium",
    chipBg: "bg-[#1A1A1A]/[0.055]",
    chipBorder: "border-[#1A1A1A]/[0.11]",
    chipText: "text-[#1A1A1A]/90 font-medium",
    lineColor: "bg-[#D0D0D0]",
    dotColor: "bg-[#888888]",
  },
  {
    id: "agentic-ai",
    years: "Currently Pursuing",
    number: "05",
    degree: "Advanced Certification in Agentic & Generative AI",
    institution: null,
    description:
      "Exploring AI orchestration, agentic systems, workflow autonomy, AI-native infrastructure, and the next generation of intelligent execution models. The frontier, still being mapped.",
    disciplines: ["AI Orchestration", "Agentic Systems", "Workflow Autonomy", "AI-Native Infrastructure", "Generative Systems", "Intelligent Execution"],
    status: "active",
    yearColor: "text-[#555]",
    numberColor: "text-[#777]",
    degreeColor: "text-[#0A0A0A]",
    institutionColor: "text-[#555] font-semibold",
    descColor: "text-[#1A1A1A]/80 font-medium",
    chipBg: "bg-[#1A1A1A]/[0.07]",
    chipBorder: "border-[#1A1A1A]/[0.14]",
    chipText: "text-[#1A1A1A]/90 font-medium",
    lineColor: "bg-transparent",
    dotColor: "bg-[#0A0A0A]",
  },
];

// ── ENTRY ROW ─────────────────────────────────────────────────────────────────

function EntryRow({
  entry,
  index,
  isLast,
}: {
  entry: (typeof entries)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 gap-y-6 py-14"
    >
      {/* Separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#1A1A1A]/08" />

      {/* Left: meta */}
      <div className="flex flex-col gap-3 md:pt-1">
        <div className="flex items-center gap-3">
          <span className={`font-manrope text-[10px] tracking-[0.35em] ${entry.numberColor}`}>
            {entry.number}
          </span>

          {/* Active pulse for in-progress */}
          {entry.status === "active" && (
            <span className="relative flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] animate-pulse" />
              <span className="font-manrope text-[9px] uppercase tracking-[0.3em] text-[#0A0A0A]/50">
                Active
              </span>
            </span>
          )}
        </div>

        <p className={`font-manrope text-sm leading-relaxed ${entry.yearColor}`}>
          {entry.years}
        </p>

        {entry.institution && (
          <p className={`font-manrope text-xs leading-relaxed ${entry.institutionColor}`}>
            {entry.institution}
          </p>
        )}
      </div>

      {/* Right: content */}
      <div>
        {/* Degree title */}
        <h3
          className={`font-manrope font-semibold text-xl md:text-2xl leading-tight tracking-tight mb-5 ${entry.degreeColor}`}
        >
          {entry.degree}
        </h3>

        {/* Description */}
        <p className={`font-manrope text-sm md:text-base leading-[1.85] mb-8 max-w-xl ${entry.descColor}`}>
          {entry.description}
        </p>

        {/* Discipline chips */}
        <div className="flex flex-wrap gap-2">
          {entry.disciplines.map((d) => (
            <span
              key={d}
              className={`font-manrope text-[11px] px-3 py-1 rounded-full border ${entry.chipBg} ${entry.chipBorder} ${entry.chipText}`}
            >
              {d}
            </span>
          ))}
        </div>

        {/* "Still evolving" note for active entry */}
        {entry.status === "active" && (
          <m.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="font-serif italic font-normal text-base text-[#1A1A1A]/70 font-medium mt-8"
          >
            Still in motion. Still evolving.
          </m.p>
        )}
      </div>

      {/* Progression line (not on last) */}
      {!isLast && (
        <div className="hidden md:block absolute left-[196px] top-full w-px h-6 bg-gradient-to-b from-[#1A1A1A]/10 to-transparent" />
      )}
    </m.div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

export default function AcademicFoundations() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper
      id="academic"
      className="py-40 px-6 bg-[#FDF6EE]"
      showLine={false}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── HEADER ── */}
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24"
        >
          <p className="font-manrope text-[10px] text-[#999] uppercase tracking-[0.4em] mb-8">
            07 / Academic Foundations
          </p>
          <h2 className="font-manrope font-semibold text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] leading-tight tracking-tight mb-8">
            Structured learning before
            <br />
            <span className="text-[#0A0A0A]/60">systems thinking evolved into execution.</span>
          </h2>
          <p className="font-manrope text-base text-[#1A1A1A]/75 leading-relaxed max-w-lg font-medium">
            The transition into AI-native systems was built on years of communication, marketing, digital strategy, and continuous structured learning.
          </p>
        </m.div>

        {/* ── ENTRIES ── */}
        <div>
          {entries.map((entry, i) => (
            <EntryRow
              key={entry.id}
              entry={entry}
              index={i}
              isLast={i === entries.length - 1}
            />
          ))}
        </div>

        {/* ── CLOSING CINEMATIC STATEMENT ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pt-20 mt-8 border-t border-[#1A1A1A]/08"
        >
          <p className="font-serif italic font-normal text-2xl md:text-3xl lg:text-4xl text-[#0A0A0A]/90 leading-snug max-w-3xl">
            "This evolution into AI-native systems was built on years of structured thinking,
            communication, strategy,{" "}
            <span className="text-[#0A0A0A]/60">and continuous learning."</span>
          </p>
        </m.div>

      </div>
    </SectionWrapper>
  );
}
