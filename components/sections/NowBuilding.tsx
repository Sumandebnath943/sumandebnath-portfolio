// Server component — content lives in initial HTML for indexing.
// The "Now" page is a freshness signal for both search engines and AI search.

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const NOW_LAST_UPDATED = "2026-08-19";

// MIGI leads this section on purpose: it is the one thing here a visitor can go
// and look at, and it is the strongest single proof of the claim the rest of the
// page makes. Numbers are read off lib/resume.ts — keep them in step with it.
const migiStats = [
  { figure: "46", label: "Autonomous agents" },
  { figure: "500+", label: "Automated eval checks" },
  { figure: "24/7", label: "Running unattended" },
];

const focus = [
  {
    label: "Also Building",
    text: "ROASmind — an AI-native marketing operating system unifying Meta, Google and LinkedIn. 200,000+ lines, now in private testing.",
  },
  {
    label: "Currently Learning",
    text: "Generative & Agentic AI at Saïd Business School, University of Oxford — agentic systems, workflow autonomy, AI-native infrastructure.",
  },
  {
    label: "Available For",
    text: "AI Product Manager and AI Product Marketing roles, AI-native product collaborations, and full-stack AI engineering engagements.",
  },
];

export default function NowBuilding() {
  return (
    <section
      id="now"
      aria-labelledby="now-heading"
      className="relative bg-black text-white border-y border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-4">
              Now / Currently
            </p>
            <h2
              id="now-heading"
              className="font-manrope font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight"
            >
              What I&rsquo;m focused on{" "}
              <span className="font-serif italic font-normal text-white/70">
                right now
              </span>
              .
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A8A]">
            Last updated{" "}
            <time dateTime={NOW_LAST_UPDATED}>{NOW_LAST_UPDATED}</time>
          </p>
        </div>

        {/* ── The lead: MIGI ── */}
        <Link
          href="/agents/migi"
          className="group block rounded-2xl border border-[#C6F24E]/25 bg-[#C6F24E]/[0.04] p-6 md:p-9 mb-6 md:mb-8 transition-colors hover:border-[#C6F24E]/45 hover:bg-[#C6F24E]/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F24E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.55fr_1fr] gap-8 md:gap-12 items-start">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C6F24E] mb-4">
                Currently Running
              </p>
              <h3 className="font-manrope font-semibold text-2xl md:text-3xl leading-tight tracking-tight mb-3">
                MIGI &mdash;{" "}
                <span className="font-serif italic font-normal text-white/70">
                  my agents run the admin
                </span>
              </h3>
              <p className="font-manrope text-[15px] leading-[1.7] text-white/80 max-w-xl">
                A fleet of 46 agents that runs my personal brand, applies for
                jobs, tracks expenses, keeps a journal and watches uptime &mdash;
                without me. Controlled from a 2FA dashboard, a Telegram bot and a
                native Android client, and kept honest by 500+ automated eval
                checks.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#C6F24E]">
                See the fleet
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>

            {/* Stats sit in their own column so the claim above is immediately
                backed by a figure rather than by another sentence. */}
            <dl className="grid grid-cols-3 md:grid-cols-1 gap-5 md:gap-4 md:border-l md:border-white/[0.08] md:pl-10">
              {migiStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-manrope font-semibold text-2xl md:text-3xl leading-none tracking-tight text-[#C6F24E]">
                      {s.figure}
                    </span>
                    <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.25em] text-white/55">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {focus.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#86868B] mb-4">
                {f.label}
              </p>
              <p className="font-manrope text-[15px] leading-[1.7] text-white/85">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
