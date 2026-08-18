"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionKicker from "@/components/ui/SectionKicker";
import { experience, earlierExperience } from "@/lib/resume";

/**
 * Operational history.
 *
 * Three deliberate things about this section:
 *
 * 1. **The KRAs come from `lib/resume.ts`, not from prose written here.** They
 *    are the labelled bullets transcribed verbatim from the résumé PDF, and
 *    that file is the single source of truth for every career fact on the site
 *    (Bible §7). This section used to paraphrase them, which is exactly how the
 *    four surfaces drifted apart last time. When the PDF changes, change
 *    `lib/resume.ts`; this section follows automatically.
 *
 * 2. **Reverse chronological.** It used to run 2016 → present, so the first
 *    thing a recruiter met was a list of internships and the current role was
 *    three scroll-screens down. A CV reads newest first for exactly this reason.
 *    The `index` numbers therefore count the panels top-down; they are not years.
 *
 * 3. **Tight.** py-40, mb-24 and pb-14 per panel put this section past 2,000px
 *    for three jobs. Paddings are roughly halved so the added KRA detail costs
 *    the page far less than it otherwise would.
 */

// ── DATA — newest first ───────────────────────────────────────────────────────
//
// Titles, employers, periods and bullets are read from the résumé. Only the
// display concerns that a PDF has no concept of — ordering weight and the
// discipline tags — are declared here.

const [pibm, cbs] = experience;

const roles = [
  {
    id: "pibm",
    index: "01",
    company: pibm.org,
    role: pibm.title,
    subtitle: null,
    timeline: pibm.period,
    current: pibm.current,
    weight: "dominant",
    bullets: pibm.bullets,
    tags: [
      "Brand Marketing",
      "Digital Infrastructure",
      "Campaign Systems",
      "Creative Direction",
      "Team Leadership",
      "Growth Strategy",
    ],
  },
  {
    id: "cbs",
    index: "02",
    company: cbs.org,
    role: cbs.title,
    subtitle: null,
    timeline: cbs.period,
    current: cbs.current,
    weight: "structured",
    bullets: cbs.bullets,
    tags: ["SEO / SEM", "Paid Advertising", "Social Ecosystems", "Lead Generation"],
  },
  {
    id: "early",
    index: "03",
    company: "Early Experience",
    role: null,
    subtitle: earlierExperience,
    timeline: "2016 — 2018",
    current: false,
    weight: "foundational",
    bullets: [
      {
        label: "",
        text:
          "Consumer brands, marketing operations and foundational campaign systems — the phase that built the operational understanding everything since has been layered on.",
      },
    ],
    tags: ["Consumer Brands", "Marketing Operations", "Campaign Systems"],
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
  // The résumé labels its KRAs; the "Earlier experience" block has none, so the
  // bullet renders as plain prose rather than growing an empty bold run.
  const labelled = role.bullets.some((b) => b.label);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative border-t border-[#A8CCE8]/50 pt-7 pb-9 md:pt-8 md:pb-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-12 gap-y-4">

        {/* ── LEFT: meta ── */}
        <div className="flex flex-row md:flex-col md:gap-2.5 items-baseline md:items-start gap-4 md:pt-1">
          <span className="font-manrope text-[10px] tracking-[0.35em] text-[#3E6E93]">
            {role.index}
          </span>
          <p className="font-manrope text-sm text-[#3E6E93] leading-relaxed">
            {role.timeline}
          </p>
          {role.current && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F7A4D]" />
              <span className="font-manrope text-[9px] uppercase tracking-[0.3em] text-[#1F6B45]">
                Current
              </span>
            </span>
          )}
        </div>

        {/* ── RIGHT: content ── */}
        <div>
          <p
            className={`font-manrope font-semibold leading-tight tracking-tight mb-1 ${
              isDominant
                ? "text-2xl md:text-[1.75rem] text-[#0D1E2E]"
                : isFoundational
                ? "text-lg md:text-xl text-[#0D1E2E]/75"
                : "text-xl md:text-2xl text-[#0D1E2E]/90"
            }`}
          >
            {role.company}
          </p>

          {role.role && (
            <p className="font-manrope text-sm text-[#2F5F84] mb-4 tracking-wide">
              {role.role}
            </p>
          )}
          {role.subtitle && !role.role && (
            <p className="font-manrope text-sm text-[#2F5F84] mb-4 italic">
              {role.subtitle}
            </p>
          )}

          {/* ── KRAs, straight off the résumé ── */}
          {labelled && (
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#3E6E93] mb-3">
              Key result areas
            </p>
          )}
          <ul className="space-y-2.5 mb-5 max-w-2xl">
            {role.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-[0.55em] w-1 h-1 rounded-full bg-[#3E6E93] shrink-0"
                />
                <p
                  className={`font-manrope leading-[1.7] ${
                    isDominant
                      ? "text-sm md:text-[15px] text-[#1A3550]"
                      : "text-sm text-[#1A3550]/90"
                  }`}
                >
                  {b.label && (
                    <span className="font-semibold text-[#0D1E2E]">
                      {b.label}:{" "}
                    </span>
                  )}
                  {b.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {role.tags.map((tag) => (
              <span
                key={tag}
                className="font-manrope text-[11px] px-3 py-1 rounded-full border border-[#7AADD0]/40 bg-[#7AADD0]/[0.1] text-[#22557A] font-medium"
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
      className="py-16 md:py-24 px-6 bg-gradient-to-br from-[#EBF6FF] via-[#F0F8FF] to-[#E3F2FD] relative"
      showLine={false}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── HEADER ── */}
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-2xl">
            {/* Blue ground: the chip takes the section's own accent so it does
                not read as a grey sticker dropped onto a coloured band. */}
            <SectionKicker
              className="mb-6"
              chipClassName="border-[#7AADD0]/45 bg-[#7AADD0]/[0.12]"
              dotClassName="bg-[#3E6E93]"
              textClassName="text-[#255677]"
            >
              06 / Experience
            </SectionKicker>
            <h2 className="font-manrope font-semibold text-3xl md:text-4xl lg:text-5xl text-[#0D1E2E] leading-[1.1] tracking-tight mb-4">
              Real-world execution{" "}
              <span className="text-[#0D1E2E]/60">before the systems evolved.</span>
            </h2>
            <p className="font-manrope text-[15px] md:text-base text-[#1A3550] leading-relaxed max-w-xl">
              The AI-native work stands on years of operational execution — brand
              strategy, marketing infrastructure, campaign direction and creative
              leadership.
            </p>
          </div>
          <p
            aria-hidden
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#3E6E93] shrink-0 md:pb-2"
          >
            Newest first
          </p>
        </m.div>

        {/* ── ROLE PANELS — newest → earliest ── */}
        <div>
          {roles.map((role, i) => (
            <RolePanel key={role.id} role={role} index={i} />
          ))}
        </div>

        {/* ── CLOSING STATEMENT ── */}
        <m.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="pt-9 mt-2 border-t border-[#A8CCE8]/50"
        >
          <blockquote className="font-serif italic font-normal text-2xl md:text-3xl lg:text-[2.25rem] text-[#0D1E2E] leading-[1.35] max-w-3xl">
            Before the systems came{" "}
            <span className="text-[#0D1E2E]/60">the execution.</span>
          </blockquote>
        </m.figure>

      </div>
    </SectionWrapper>
  );
}
