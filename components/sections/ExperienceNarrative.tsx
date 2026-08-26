"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function ExperienceNarrative() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="experience-narrative" className="py-20 md:py-32 px-6 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* ── Header ──
            This used to be one 5xl italic sentence running the full width with a
            stray rule under it — it read as a stranded caption, not a quote.
            It is now set as an actual pull quote: labelled, measure-constrained,
            hung off an oversized mark, and attributed. */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#6E6E6E] mb-8">
            01 / The Profile
          </p>

          <figure className="relative max-w-3xl pl-8 md:pl-12">
            {/* The mark is decoration — it must not be read out or copied. */}
            <span
              aria-hidden
              className="absolute left-0 top-[-0.15em] font-serif italic text-[4.5rem] md:text-[6rem] leading-none text-[#C43F00]/25 select-none"
            >
              &ldquo;
            </span>

            <blockquote className="font-serif italic font-normal text-2xl md:text-[2.1rem] lg:text-[2.4rem] text-[#0A0A0A] leading-[1.35] tracking-[-0.01em]">
              I didn&apos;t learn marketing from a textbook. I learned it by
              running teams, managing budgets, and hitting targets. Then I
              learned AI to build the tools I always wished I had.
            </blockquote>

            <figcaption className="mt-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[#C43F00]/50 shrink-0" />
              <span className="font-manrope text-[11px] uppercase tracking-[0.28em] text-[#6E6E6E]">
                Suman Debnath
              </span>
            </figcaption>
          </figure>
        </m.div>

        {/* The Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Card 1: The Marketer */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] bg-white border border-[#1A1917]/10 p-8 md:p-12 shadow-[0_8px_30px_rgba(26,25,23,0.04)]"
          >
            <div className="mb-8">
              <span className="font-mono text-[10px] text-[#C43F00] uppercase tracking-[0.3em] mb-3 block">
                Chapter 01 &middot; 2016 — 2023
              </span>
              <h3 className="font-manrope font-semibold text-2xl md:text-3xl text-[#1A1917] mb-2">
                The Marketer
              </h3>
              <p className="font-serif italic text-lg text-[#7A7672]">
                Nine years in the trenches
              </p>
            </div>

            <ul className="space-y-6">
              {/* ── The current-practice panel ──
                  First position, and deliberately *not* a sixth bullet. This
                  card is dated 2016—2023 and answer-engine work is 2026, so a
                  dot in this list would misdate it. Labelled as current and
                  drawn as a panel instead, which is also what makes it read as
                  the newest thing here rather than the oldest.

                  It sits in the marketer card rather than the builder one on
                  purpose: AEO and GEO are what search-and-content became, and
                  AEO_PLAYBOOK.md calls them a marketing discipline in as many
                  words. The "Dominated Search & Paid Media" bullet below is the
                  2016—2023 half of the same thread.

                  Every claim here is checkable from this site: view source for
                  the structured data, /llms.txt for the generated file, and
                  AEO_PLAYBOOK §9 for the audit. */}
              <li className="relative overflow-hidden rounded-2xl border border-[#C43F00]/20 bg-gradient-to-br from-[#F04E00]/[0.08] via-[#F04E00]/[0.03] to-transparent p-6">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#C43F00] via-[#F04E00] to-[#F0A100]"
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#C43F00] block mb-2.5">
                  Current practice &middot; 2026
                </span>
                <p className="font-manrope font-semibold text-[#1A1917] text-base md:text-lg mb-1.5">
                  Answer-engine optimisation, end to end
                </p>
                <p className="font-manrope text-[15px] text-[#4A4743] leading-relaxed mb-4">
                  Search is turning into answers, and this site is where I
                  worked out the method — a generated{" "}
                  <span className="font-mono text-[13px] text-[#1A1917]">llms.txt</span>,
                  extractable answer blocks, entity disambiguation and
                  structured data. Scored{" "}
                  <span className="font-semibold text-[#1A1917]">79 &rarr; 83</span>{" "}
                  on Vercel&apos;s Is Agentic audit in one session.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {["AEO", "GEO", "SEO", "Agentic readiness"].map((skill) => (
                    <li
                      key={skill}
                      className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#C43F00] border border-[#C43F00]/30 bg-white/70 rounded-full px-3 py-1.5"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </li>

              {[
                {
                  bold: "Directed a 21-person cross-functional team",
                  text: "Unified digital marketing, graphic design, and web development, and pioneered the integration of AI-induced workflows into traditional design pipelines."
                },
                {
                  bold: "Architected a 400-page web ecosystem",
                  text: "Directed the creation, maintenance, and complete UX overhaul of a massive institutional digital footprint, driving 40–50% organic growth."
                },
                {
                  bold: "Dominated Search & Paid Media",
                  text: "Achieved first-page rankings for core website and blogs on ACAP/Google, while consistently delivering 350%+ ROAS and 30% reduction in CPA across all paid ad campaigns."
                },
                {
                  bold: "Executed 20+ high-stakes global GTMs",
                  text: "Led the launch of 20+ domestic and international educational programs—including substantial government and private employability projects—delivering 99%+ of projects on time and within budget over 6 years."
                },
                {
                  bold: "Managed ₹30–40L annual vendor budgets",
                  text: "Owned end-to-end production pipelines across print, OOH, and digital channels."
                }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F04E00]/60 shrink-0" />
                  <p className="font-manrope text-[15px] md:text-base text-[#4A4743] leading-relaxed">
                    <span className="font-semibold text-[#1A1917] block mb-0.5">{item.bold}</span>
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Card 2: The AI Builder */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] bg-[#0E0D0C] border border-white/10 p-8 md:p-12 shadow-[0_20px_60px_rgba(14,13,12,0.3)] relative overflow-hidden"
          >
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F04E00]/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 mb-8">
              <span className="font-mono text-[10px] text-white/60 uppercase tracking-[0.3em] mb-3 block">
                Chapter 02 &middot; 2024 — now
              </span>
              <h3 className="font-manrope font-semibold text-2xl md:text-3xl text-white mb-2">
                The AI Builder
              </h3>
              <p className="font-serif italic text-lg text-white/60">
                Two years, twenty-one products
              </p>
            </div>

            <ul className="relative z-10 space-y-6">
              {[
                {
                  bold: "Shipped 21 AI products, solo",
                  text: "Designed, built and launched end to end with Next.js, FastAPI and LLM APIs — 200,000+ lines of AI-assisted code, and not one of them a demo."
                },
                {
                  bold: "Trained a language model from scratch",
                  text: "PentaCMD-47M, built nanoGPT-style on 299K instruction→command pairs at ~87% exact match — plus Qdex-1.5B, a QLoRA fine-tune benchmarked against HumanEval."
                },
                {
                  bold: "Runs a 46-agent fleet in production",
                  text: "MIGI handles the personal brand, job applications, expenses and uptime monitoring on its own, held together by 500+ automated eval checks."
                },
                {
                  bold: "Engineered ROASmind",
                  text: "An AI-native marketing operating system unifying Meta, Google and LinkedIn under one brain — built to remove 70–80% of performance marketing overhead. In private testing."
                },
                {
                  bold: "Automated the daily grind",
                  text: "Custom GenAI creative pipelines compressed 8-hour manual design tasks into seconds, saving 2–3 hours daily per person on the team."
                }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <p className="font-manrope text-[15px] md:text-base text-white/70 leading-relaxed">
                    <span className="font-semibold text-white block mb-0.5">{item.bold}</span>
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>

            {/* Closing statement inside the dark card */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <p className="font-serif italic text-xl md:text-2xl text-white leading-snug">
                &quot;Most companies hiring for AI product roles get a builder who doesn&apos;t understand the business, or a marketer who doesn&apos;t know how to build. <span className="font-manrope font-semibold not-italic text-[#F04E00]">I bring both.</span>&quot;
              </p>
            </div>
          </m.div>

        </div>
      </div>
    </SectionWrapper>
  );
}
