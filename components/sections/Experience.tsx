"use client";

import { useRef } from "react";
import { m, useInView, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ── ERA DATA ──────────────────────────────────────────────────────────────────

const eras = [
  {
    id: "foundations",
    index: "01",
    name: "Foundations",
    years: "2016 — 2023",
    tagline: "The decade that built the operator.",
    narrative: [
      "Before building AI-native systems, the foundation was built through branding, growth strategy, digital marketing, creative direction, and execution.",
      "Nearly a decade spent understanding people, attention, communication, behavior, and the systems that move organizations forward.",
    ],
    capabilities: [
      "Brand Strategy",
      "Digital Marketing",
      "Campaign Systems",
      "Performance Marketing",
      "Creative Direction",
      "Brand Management",
      "Growth",
      "Design Systems",
      "Content Ecosystems",
      "Leadership",
    ],
    // Light cream
    bg: "bg-gradient-to-br from-[#FAF7F2] via-[#F5F0E8] to-[#EDE8DF]",
    border: "border-[#D6CCBC]/70",
    shadow: "shadow-[0_20px_80px_-16px_rgba(180,160,130,0.2)]",
    tagColor: "text-[#8C7B60]",
    tagBg: "bg-[#8C7B60]/[0.08]",
    yearColor: "text-[#1A1A1A]/30",
    titleColor: "text-[#0A0A0A]",
    narrativeColor: "text-[#3A3530]/70",
    chipBg: "bg-[#8C7B60]/[0.07]",
    chipText: "text-[#5C4E38]/80",
    chipBorder: "border-[#8C7B60]/20",
    accentLine: "bg-[#C4B49A]",
    dividerColor: "from-[#C4B49A]",
    emotionalStatement: "The foundation was not built once.\nIt was built every day\nfor seven years.",
    emotionalColor: "text-[#0A0A0A]",
    emotionalSub: "text-[#3A3530]/40",
  },
  {
    id: "discovery",
    index: "02",
    name: "Discovery",
    years: "2023 — 2025",
    tagline: "The moment everything shifted.",
    narrative: [
      "The arrival of generative AI changed everything. What began as experimentation quickly evolved into a new operational framework: rapid prototyping, AI orchestration, automation workflows, and product architecture.",
      "The transition was no longer theoretical. The systems became real.",
    ],
    capabilities: [
      "Prompt Engineering",
      "AI Workflows",
      "Rapid Prototyping",
      "Automation Systems",
      "AI Toolchains",
      "Systems Thinking",
      "Creative AI",
      "AI Operations",
    ],
    // Light blue
    bg: "bg-gradient-to-br from-[#EFF6FF] via-[#E0EEFF] to-[#D6E8FF]",
    border: "border-[#A8C8F0]/60",
    shadow: "shadow-[0_20px_80px_-16px_rgba(100,160,230,0.2)]",
    tagColor: "text-[#2E6FBF]",
    tagBg: "bg-[#2E6FBF]/[0.08]",
    yearColor: "text-[#1A2A3A]/30",
    titleColor: "text-[#0A1420]",
    narrativeColor: "text-[#1A2E45]/65",
    chipBg: "bg-[#2E6FBF]/[0.07]",
    chipText: "text-[#1A4A80]/80",
    chipBorder: "border-[#2E6FBF]/20",
    accentLine: "bg-[#7AAEE0]",
    dividerColor: "from-[#7AAEE0]",
    emotionalStatement: "Experimentation\nbecame infrastructure.\nPrototypes became products.",
    emotionalColor: "text-[#0A1420]",
    emotionalSub: "text-[#1A2E45]/40",
  },
  {
    id: "systems",
    index: "03",
    name: "Systems",
    years: "2025 — Present",
    tagline: "Infrastructure. Intelligence. Intention.",
    narrative: [
      "The focus shifted from campaigns to systems. From execution to infrastructure.",
      "Today, the work revolves around building AI-native products, automation ecosystems, intelligent workflows, and conceptual systems exploring the future relationship between humans and AI.",
    ],
    capabilities: [
      "AI-Native Products",
      "Systems Architecture",
      "SaaS Ecosystems",
      "Automation Infrastructure",
      "AI-Assisted Engineering",
      "Product Systems",
      "AI Strategy",
      "Intelligent Workflows",
    ],
    // Light yellow
    bg: "bg-gradient-to-br from-[#FEFBEC] via-[#FDF5D0] to-[#F9EDB0]",
    border: "border-[#E0CC70]/50",
    shadow: "shadow-[0_20px_80px_-16px_rgba(200,180,60,0.2)]",
    tagColor: "text-[#8C7010]",
    tagBg: "bg-[#8C7010]/[0.08]",
    yearColor: "text-[#2A2000]/30",
    titleColor: "text-[#1A1400]",
    narrativeColor: "text-[#3A3010]/65",
    chipBg: "bg-[#8C7010]/[0.07]",
    chipText: "text-[#5C4A00]/80",
    chipBorder: "border-[#C0A020]/25",
    accentLine: "bg-[#D4B830]",
    dividerColor: "from-[#D4B830]",
    emotionalStatement: "Not a pivot.\nAn evolution.\nBuilt across a decade.",
    emotionalColor: "text-[#1A1400]",
    emotionalSub: "text-[#3A3010]/40",
  },
];

// ── ERA CARD ──────────────────────────────────────────────────────────────────

function EraCard({ era, index }: { era: (typeof eras)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isAlternate = index % 2 !== 0;

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full rounded-[2.5rem] overflow-hidden border ${era.border} ${era.shadow}`}
    >
      {/* Card background */}
      <div className={`absolute inset-0 ${era.bg}`} />

      {/* Subtle inner highlight for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-[2.5rem]" />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 lg:px-20 py-14 md:py-20">

        {/* Era index + tag */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className={`font-mono text-[10px] ${era.yearColor} tracking-[0.3em]`}>
            {era.index}
          </span>
          <div className={`h-px w-8 ${era.accentLine}`} />
          <span className={`font-manrope text-[10px] uppercase tracking-[0.4em] px-3 py-1 rounded ${era.tagBg} ${era.tagColor}`}>
            {era.years}
          </span>
        </m.div>

        {/* Main grid: narrative left, capabilities right */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start ${isAlternate ? "lg:[&>*:first-child]:order-2" : ""}`}>

          {/* Narrative side */}
          <div>
            {/* Chapter name */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5"
            >
              <h3 className={`font-serif italic font-normal text-5xl md:text-6xl xl:text-7xl ${era.titleColor} leading-none tracking-tight mb-4`}>
                {era.name}
              </h3>
              <p className={`font-manrope text-sm ${era.narrativeColor} tracking-wide`}>
                {era.tagline}
              </p>
            </m.div>

            {/* Divider */}
            <m.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`origin-left h-px w-16 bg-gradient-to-r ${era.dividerColor} to-transparent mb-6`}
            />

            {/* Narrative text */}
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {era.narrative.map((para, i) => (
                <p key={i} className={`font-manrope text-base md:text-[17px] ${era.narrativeColor} leading-[1.8]`}>
                  {para}
                </p>
              ))}
            </m.div>

            {/* Emotional statement */}
            <m.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 pt-8 border-t border-current/10"
            >
              <p className={`font-serif italic font-normal text-2xl md:text-3xl ${era.emotionalColor} leading-snug whitespace-pre-line`}>
                {era.emotionalStatement.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {i < arr.length - 1 ? (
                      <span className={era.emotionalSub}>{line}<br /></span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </p>
            </m.div>
          </div>

          {/* Capabilities side */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={`font-manrope text-[10px] uppercase tracking-[0.4em] ${era.narrativeColor} mb-5`}>
              Core Disciplines
            </p>
            <div className="flex flex-wrap gap-2.5">
              {era.capabilities.map((cap, i) => (
                <m.span
                  key={cap}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-manrope text-xs font-medium px-4 py-2 rounded-full border ${era.chipBg} ${era.chipText} ${era.chipBorder}`}
                >
                  {cap}
                </m.span>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </m.div>
  );
}

// ── BRIDGE ELEMENT between eras ───────────────────────────────────────────────

function EraBridge({ fromLight }: { fromLight: boolean }) {
  return (
    <div className="relative flex flex-col items-center py-2 select-none pointer-events-none">
      <div className={`w-px h-10 bg-gradient-to-b ${fromLight ? "from-[#C4B49A] to-[#7AAEE0]/50" : "from-[#7AAEE0]/50 to-[#D4B830]/50"}`} />
      <div className={`w-1.5 h-1.5 rounded-full my-1 ${fromLight ? "bg-[#7AAEE0]/60" : "bg-[#D4B830]/60"}`} />
      <div className={`w-px h-10 bg-gradient-to-b ${fromLight ? "from-[#7AAEE0]/50 to-transparent" : "from-[#D4B830]/50 to-transparent"}`} />
    </div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="experience" className="py-24 px-6 bg-white" showLine={false}>
      <div className="max-w-6xl mx-auto">

        {/* ── SECTION HEADER ── */}
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl"
        >
          <p className="font-manrope text-[10px] text-[#888] uppercase tracking-[0.4em] mb-6">
            02 / The Evolution
          </p>
          <h2 className="font-manrope font-semibold text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] leading-tight tracking-tight mb-8">
            Before the systems came
            <br />
            <span className="text-[#0A0A0A]/70">the foundation.</span>
          </h2>
          <p className="font-manrope text-base md:text-lg text-[#555] leading-relaxed max-w-xl">
            The transition into AI-native systems was built on nearly a decade of branding, growth, execution, creative direction, and operational experience.
          </p>
        </m.div>

        {/* ── ERA CARDS ── */}
        <div className="flex flex-col">
          {eras.map((era, i) => (
            <div key={era.id}>
              <EraCard era={era} index={i} />
              {i < eras.length - 1 && <EraBridge fromLight={i === 0} />}
            </div>
          ))}
        </div>

        {/* ── CLOSING STATEMENT ── */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 text-center max-w-3xl mx-auto"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-px h-12 bg-gradient-to-b from-[#D4B830]/50 to-transparent" />
          </div>
          <p className="font-manrope text-[10px] uppercase tracking-[0.5em] text-[#888] mb-8">
            The Result
          </p>
          <h3 className="font-serif italic font-normal text-3xl md:text-4xl lg:text-5xl text-[#0A0A0A] leading-snug mb-8">
            "This transition into AI-native systems
            <br />
            <span className="text-[#0A0A0A]/70">was not random.</span>
          </h3>
          <p className="font-serif italic font-normal text-3xl md:text-4xl lg:text-5xl text-[#0A0A0A] leading-snug">
            <span className="text-[#0A0A0A]/70">It was the evolution of an</span>
            <br />
            already experienced operator."
          </p>
        </m.div>

      </div>
    </SectionWrapper>
  );
}
