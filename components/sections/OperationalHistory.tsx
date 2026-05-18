"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ── DATA ──────────────────────────────────────────────────────────────────────

const roles = [
  {
    id: "early",
    index: "01",
    company: "Early Experience",
    subtitle: "Internships & Foundational Roles",
    role: null,
    timeline: "2016 — 2018",
    weight: "foundational",
    paragraphs: [
      "Worked across consumer brands, digital environments, marketing operations, and foundational campaign systems.",
      "Included Nivea India, Ramanbyte Pvt. Ltd., and Aamrit.",
      "This phase built the operational understanding that later evolved into systems thinking and AI-native execution.",
    ],
    tags: ["Consumer Brands", "Marketing Operations", "Campaign Systems", "Digital Environments"],
  },
  {
    id: "cbs",
    index: "02",
    company: "CBS Ventures",
    subtitle: null,
    role: "Branding & Digital Marketing Manager",
    timeline: "2018",
    weight: "structured",
    paragraphs: [
      "Built and executed integrated digital marketing systems focused on visibility, performance, and lead generation.",
      "Managed SEO, SEM, social ecosystems, website optimization, paid advertising, content operations, and growth-focused digital infrastructure.",
    ],
    tags: ["SEO / SEM", "Paid Advertising", "Social Ecosystems", "Website Optimization", "Content Operations", "Lead Generation"],
  },
  {
    id: "pibm",
    index: "03",
    company: "Pune Institute of Business Management",
    subtitle: null,
    role: "Brand Marketing Manager",
    timeline: "2019 — Present",
    weight: "dominant",
    paragraphs: [
      "Led brand marketing, digital infrastructure, campaign systems, and institutional growth initiatives across one of Pune's leading business schools.",
      "Directed multi-channel campaigns, website ecosystems, launch strategies, creative production, content systems, vendor coordination, and cross-functional execution pipelines.",
      "Oversaw brand consistency, marketing operations, digital campaigns, creative direction, and large-scale promotional infrastructure.",
    ],
    tags: [
      "Brand Marketing",
      "Digital Infrastructure",
      "Campaign Systems",
      "Creative Direction",
      "Multi-Channel Campaigns",
      "Vendor Coordination",
      "Content Systems",
      "Growth Strategy",
      "Website Ecosystems",
      "Cross-Functional Execution",
    ],
  },
];

// ── ROLE PANEL ────────────────────────────────────────────────────────────────

function RolePanel({
  role,
  index,
}: {
  role: (typeof roles)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const isDominant = role.weight === "dominant";
  const isFoundational = role.weight === "foundational";

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative border-t border-[#E0D8CE] pt-10 pb-14"
    >
      {/* Two-col grid: meta left, content right */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-16 gap-y-6">

        {/* ── LEFT: meta ── */}
        <div className="flex flex-col gap-3 md:pt-1">
          <span className="font-manrope text-[10px] tracking-[0.35em] text-[#C5A880]">
            {role.index}
          </span>
          <p className="font-manrope text-sm text-[#7A6A55] leading-relaxed">
            {role.timeline}
          </p>
          {isDominant && (
            <span className="inline-flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0866A] opacity-60" />
              <span className="font-manrope text-[9px] uppercase tracking-[0.35em] text-[#A0866A]/60">
                Current
              </span>
            </span>
          )}
        </div>

        {/* ── RIGHT: content ── */}
        <div>
          {/* Company */}
          <p
            className={`font-manrope font-semibold leading-tight tracking-tight mb-1 ${
              isDominant
                ? "text-2xl md:text-3xl text-[#1A1209]"
                : isFoundational
                ? "text-lg md:text-xl text-[#1A1209]/70"
                : "text-xl md:text-2xl text-[#1A1209]/85"
            }`}
          >
            {role.company}
          </p>

          {/* Role or subtitle */}
          {role.role && (
            <p className="font-manrope text-sm text-[#8C7A60] mb-6 tracking-wide">
              {role.role}
            </p>
          )}
          {role.subtitle && !role.role && (
            <p className="font-manrope text-sm text-[#8C7A60]/70 mb-6 italic">
              {role.subtitle}
            </p>
          )}
          {!role.role && !role.subtitle && <div className="mb-6" />}

          {/* Body copy */}
          <div className="space-y-4 mb-8 max-w-xl">
            {role.paragraphs.map((para, i) => (
              <p
                key={i}
                className={`font-manrope leading-[1.85] ${
                  i === 0
                    ? isDominant
                      ? "text-base md:text-[17px] text-[#2A2018]/90 font-medium"
                      : "text-sm md:text-base text-[#2A2018]/80 font-medium"
                    : "text-sm text-[#2A2018]/70"
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {role.tags.map((tag) => (
              <span
                key={tag}
                className="font-manrope text-[11px] px-3 py-1 rounded-full border border-[#7AADD0]/30 bg-[#7AADD0]/[0.08] text-[#2A5A80]/90 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

export default function OperationalHistory() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper
      id="history"
      className="py-20 md:py-40 px-6 bg-gradient-to-br from-[#EBF6FF] via-[#F0F8FF] to-[#E3F2FD] relative"
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
          <p className="font-manrope text-[10px] text-[#7AADD0] uppercase tracking-[0.4em] mb-8">
            06 / Experience
          </p>
          <h2 className="font-manrope font-semibold text-4xl md:text-5xl lg:text-6xl text-[#0D1E2E] leading-tight tracking-tight mb-8">
            Real-world execution
            <br />
            <span className="text-[#0D1E2E]/60">before the systems evolved.</span>
          </h2>
          <p className="font-manrope text-base text-[#1A3550]/80 leading-relaxed max-w-lg font-medium">
            The AI-native systems work was built on years of operational execution, brand strategy, marketing infrastructure, campaign direction, and creative leadership.
          </p>
        </m.div>

        {/* ── ROLE PANELS — ordered foundational → dominant ── */}
        <div>
          {roles.map((role, i) => (
            <RolePanel key={role.id} role={role} index={i} />
          ))}
        </div>

        {/* ── CLOSING CINEMATIC STATEMENT ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="pt-24 mt-8 border-t border-[#A8CCE8]/40"
        >
          <p className="font-serif italic font-normal text-3xl md:text-4xl lg:text-5xl text-[#0D1E2E]/85 leading-snug">
            "Before the systems came
            <br />
            <span className="text-[#0D1E2E]/60">the execution."</span>
          </p>
        </m.div>

      </div>
    </SectionWrapper>
  );
}
