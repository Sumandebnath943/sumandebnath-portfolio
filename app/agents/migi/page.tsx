import type { Metadata } from "next";
import Image from "next/image";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Reveal, StatCounter } from "@/components/penta/PentaWidgets";
import { DashboardShowcase, ArchitectureFlow } from "@/components/migi/MigiVisuals";
import {
  MIGI,
  STATS,
  AREAS,
  BOT_ACTIONS,
  BOT_FEED,
  LINKEDIN_STEPS,
  LINKEDIN_CHIPS,
  STACK,
  BUILD,
  DELIVERABLES,
  ORCHESTRATION_SHOT,
} from "@/components/migi/migi-data";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
export const metadata: Metadata = {
  title: "Migi · A Personal Suite of 20+ Autonomous AI Agents",
  description:
    "Migi is a fleet of 20+ AI agents that run themselves in the cloud — monitoring, curating, drafting and remembering — plus a secure mission-control dashboard to command them. Built solo with Claude Code, on entirely free infrastructure.",
  keywords: [
    "Migi", "AI agent fleet", "autonomous agents", "agent orchestration", "GitHub Actions agents",
    "Claude Code", "AI generalist", "personal AI automation", "Telegram bot agents", "Suman Debnath",
  ],
  alternates: { canonical: "/agents/migi" },
  openGraph: {
    type: "website",
    title: "Migi · A Personal Suite of 20+ Autonomous AI Agents",
    description:
      "A fleet of 20+ self-running AI agents + a secure control dashboard. Built solo with Claude Code, on free infrastructure.",
    url: `${SITE}/agents/migi`,
    images: [{ url: "/migi-agent/dashboard.png", width: 1366, height: 768, alt: "The Migi mission-control dashboard" }],
  },
};

/* ── Schema ─────────────────────────────────────────────────────────────── */
const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Migi",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud (GitHub Actions + Vercel)",
  description:
    "A personal fleet of 20+ autonomous AI agents that monitor, curate, draft and remember, orchestrated on GitHub Actions and commanded through a secure Next.js dashboard.",
  url: `${SITE}/agents/migi`,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};
const articleLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Migi — a personal suite of 20+ autonomous AI agents",
  author: { "@type": "Person", name: "Suman Debnath" },
  publisher: { "@type": "Person", name: "Suman Debnath" },
  description:
    "How one operator designed, built and now runs a 20+ agent fleet and a secure control dashboard end to end with Claude Code, on free infrastructure.",
  mainEntityOfPage: `${SITE}/agents/migi`,
};

/* ── small building blocks ──────────────────────────────────────────────── */
function SectionLabel({ index, kicker }: { index: string; kicker: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="font-dmmono text-[11px] rounded px-1.5 py-0.5 leading-none"
        style={{ color: MIGI.ink, background: MIGI.lime }}
      >
        {index}
      </span>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: MIGI.green }} />
      <span className="font-dmmono text-[10px] uppercase tracking-[0.3em]" style={{ color: MIGI.muted }}>
        {kicker}
      </span>
    </div>
  );
}

/* colour rhythm for the stat cards — ink / lime / white, never plain */
const STAT_VARIANTS = ["ink", "lime", "white", "lime", "ink", "white"] as const;

function AreaIcon({ path }: { path: string }) {
  return (
    <span
      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: MIGI.lime }}
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={MIGI.ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </span>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ═════════════════════════════════════════════════════════════════════════ */
export default function MigiPage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Navigation />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes migi-blink { 0%,100%{opacity:1;} 50%{opacity:0.25;} }
        @keyframes migi-float { 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-8px);} }
        .migi-card{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .35s;}
        .migi-card:hover{transform:translateY(-4px);box-shadow:0 26px 60px -34px rgba(0,0,0,0.35);border-color:${MIGI.lime};}
      `}} />

      <main
        className="relative min-h-screen font-manrope selection:text-black"
        style={{ background: MIGI.cream, color: MIGI.text, ["--sel" as string]: MIGI.lime }}
      >
        {/* ════════════════════════════ HERO · lime canvas ════════════════════════════ */}
        <section className="relative px-6 pt-24 pb-20 md:pb-28 overflow-hidden" style={{ background: MIGI.lime }}>
          {/* faint ink texture rings */}
          <span aria-hidden className="absolute -top-24 -left-24 w-80 h-80 rounded-full" style={{ border: "1.5px solid rgba(22,23,28,0.07)" }} />
          <span aria-hidden className="absolute -bottom-40 -right-16 w-[28rem] h-[28rem] rounded-full" style={{ border: "1.5px solid rgba(22,23,28,0.06)" }} />

          <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 font-dmmono text-[10.5px] md:text-[11px] uppercase tracking-[0.26em] rounded-full px-3.5 py-1.5"
                style={{ background: MIGI.ink, color: "#FFFFFF" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: MIGI.lime, animation: "migi-blink 1.4s steps(1) infinite" }} />
                Autonomous AI agent fleet · running 24/7
              </span>
            </Reveal>

            {/* MIGI logo on an ink chip (logo art is light-on-dark) */}
            <Reveal delay={0.05}>
              <div
                className="mt-6 rounded-[1.5rem] px-10 py-7 inline-flex items-center justify-center"
                style={{ background: MIGI.ink, boxShadow: "0 26px 55px -26px rgba(0,0,0,0.6)", animation: "migi-float 7s ease-in-out infinite" }}
              >
                <Image
                  src="/migi-agent/logo.png"
                  alt="Migi — Agent Control"
                  width={160}
                  height={160}
                  priority
                  className="w-[108px] h-auto"
                />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <h1 className="font-manrope font-extrabold text-[2.1rem] sm:text-[2.9rem] md:text-[3.3rem] leading-[1.08] tracking-[-0.04em] mt-7 mb-5" style={{ color: MIGI.ink }}>
                A personal suite of{" "}
                <span className="inline-block rounded-xl px-3 py-0.5 leading-[1.12] align-baseline" style={{ background: MIGI.ink, color: MIGI.lime }}>20+ AI agents</span>
                <br />
                that quietly run my work.
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-[0.97rem] md:text-[1.08rem] leading-relaxed max-w-2xl mb-8" style={{ color: "rgba(22,23,28,0.72)" }}>
                A fleet of autonomous agents that live in the cloud and automate my monitoring,
                my content, my learning and my personal ops — each reaching me on Telegram or
                email — plus a secure dashboard to command them all.{" "}
                <span style={{ color: MIGI.ink, fontWeight: 700 }}>Built entirely with Claude Code, on free infrastructure.</span>
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-col sm:flex-row items-center gap-3.5">
                <a
                  href="#fleet"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-manrope font-semibold text-sm transition-transform hover:-translate-y-0.5"
                  style={{ background: MIGI.ink, color: MIGI.lime, boxShadow: "0 16px 34px -16px rgba(0,0,0,0.7)" }}
                >
                  Explore the fleet <span>↓</span>
                </a>
                <a
                  href="#dashboard"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-manrope font-semibold text-sm transition-colors hover:bg-[rgba(22,23,28,0.06)]"
                  style={{ background: "transparent", border: `1.5px solid ${MIGI.ink}`, color: MIGI.ink }}
                >
                  See mission control <span>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ STAT BAND · straddles the lime edge ════════════════════════════ */}
        <section className="relative z-10 px-6 -mt-12">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {STATS.map((s, i) => {
              const v = STAT_VARIANTS[i % STAT_VARIANTS.length];
              const isInk = v === "ink";
              const isLime = v === "lime";
              const bg = isInk ? MIGI.ink : isLime ? MIGI.lime : "#FFFFFF";
              const numC = isInk ? MIGI.lime : MIGI.ink;
              const labC = isInk ? "#FFFFFF" : MIGI.ink;
              const subC = isInk ? "rgba(255,255,255,0.5)" : isLime ? "rgba(22,23,28,0.6)" : MIGI.muted;
              return (
                <Reveal key={s.label} delay={(i % 6) * 0.05}>
                  <div
                    className="migi-card rounded-2xl h-full p-5"
                    style={{ background: bg, border: v === "white" ? `1px solid ${MIGI.line}` : "none", boxShadow: "0 18px 40px -28px rgba(0,0,0,0.45)" }}
                  >
                    <p className="font-manrope font-extrabold text-[2rem] leading-none tracking-[-0.02em]" style={{ color: numC }}>
                      <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </p>
                    <p className="font-manrope font-semibold text-[12.5px] mt-2.5" style={{ color: labC }}>{s.label}</p>
                    <p className="font-dmmono text-[10px] mt-1 leading-snug" style={{ color: subC }}>{s.sub}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════ 01 · WHAT IT IS ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <SectionLabel index="01" kicker="the idea" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-7">
                One person, operating like a team.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
              <Reveal delay={0.06}>
                <p className="text-[15px] leading-relaxed" style={{ color: MIGI.muted }}>
                  Migi is a portfolio of autonomous agents that run on a schedule — or on demand —
                  in the cloud. No servers, no paid infrastructure. Each agent does one useful job:
                  it watches something, summarizes something, drafts something, or remembers
                  something, then reaches me on Telegram or email.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-[15px] leading-relaxed" style={{ color: MIGI.muted }}>
                  A shared &ldquo;brain&rdquo; — a lightweight database — lets the agents keep memory,
                  and lets a mission-control dashboard show everything at a glance and trigger any
                  agent with one click. The whole thing is an argument for how one person operates in
                  the AI age: <span style={{ color: MIGI.text, fontWeight: 600 }}>leverage, automation and taste — not headcount.</span>
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 02 · ARCHITECTURE ════════════════════════════ */}
        <section className="px-6 py-16 md:py-24" style={{ background: MIGI.creamDeep, borderTop: `1px solid ${MIGI.line}`, borderBottom: `1px solid ${MIGI.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="02" kicker="how it fits together" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                Simple parts, wired for leverage.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: MIGI.muted }}>
                Agents fire on GitHub Actions, think with two free LLMs, speak through Telegram and
                email, remember in Supabase, and answer to a single secure dashboard.
              </p>
            </Reveal>
            <Reveal delay={0.08}><ArchitectureFlow /></Reveal>

            {/* tech chips */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
              {STACK.map((t, i) => (
                <Reveal key={t.name} delay={(i % 4) * 0.05}>
                  <div className="migi-card rounded-xl bg-white h-full p-4" style={{ border: `1px solid ${MIGI.line}` }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: MIGI.lime, boxShadow: `0 0 0 3px ${MIGI.limeSoft}` }} />
                      <span className="font-manrope font-semibold text-[13.5px]" style={{ color: MIGI.text }}>{t.name}</span>
                    </div>
                    <p className="font-manrope text-[12px] leading-relaxed pl-4" style={{ color: MIGI.muted }}>{t.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* real orchestration proof — the GitHub Actions workflow list */}
            <Reveal delay={0.1}>
              <div
                className="mt-8 rounded-[1.25rem] overflow-hidden bg-[#0d1117]"
                style={{ border: `1px solid ${MIGI.ink}`, boxShadow: "0 30px 70px -44px rgba(0,0,0,0.6)" }}
              >
                <div className="flex items-center gap-2 px-4 py-3" style={{ background: MIGI.ink, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: "#F1655B" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#F5BF4F" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: MIGI.green }} />
                  <span className="ml-3 font-dmmono text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    github actions · all workflows
                  </span>
                </div>
                <Image
                  src={ORCHESTRATION_SHOT.src}
                  alt="The real GitHub Actions workflow list — every Migi agent runs as its own scheduled or event-driven workflow"
                  width={ORCHESTRATION_SHOT.w}
                  height={ORCHESTRATION_SHOT.h}
                  className="w-full h-auto block"
                />
              </div>
            </Reveal>
            <p className="font-dmmono text-[11px] mt-4 text-center" style={{ color: MIGI.muted }}>
              No mockups — every agent is its own scheduled GitHub Actions workflow.
            </p>
          </div>
        </section>

        {/* ════════════════════════════ 03 · THE FLEET ════════════════════════════ */}
        <section id="fleet" className="px-6 py-20 md:py-28 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="03" kicker="six areas · one job each" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                Meet the fleet.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: MIGI.muted }}>
                Twenty-plus agents, grouped into six areas. Each does one useful thing — and each is
                framed the same way: what it does, and why it helps.
              </p>
            </Reveal>

            <div className="space-y-14">
              {AREAS.map((area) => (
                <div key={area.id}>
                  <Reveal>
                    <div className="flex items-center gap-4 mb-6">
                      <AreaIcon path={area.icon} />
                      <div>
                        <h3 className="font-manrope font-bold text-[1.35rem] md:text-[1.6rem] tracking-[-0.02em] leading-none">{area.title}</h3>
                        <p className="font-dmmono text-[10.5px] uppercase tracking-[0.16em] mt-1.5" style={{ color: MIGI.muted }}>{area.kicker}</p>
                      </div>
                    </div>
                  </Reveal>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {area.agents.map((ag, i) => {
                      // alternate black ↔ green cards for a bold, colourful rhythm
                      const lime = i % 2 === 1;
                      const bg = lime ? MIGI.lime : MIGI.ink;
                      const nameC = lime ? MIGI.ink : "#FFFFFF";
                      const bodyC = lime ? "rgba(22,23,28,0.72)" : "rgba(255,255,255,0.62)";
                      const whyC = lime ? MIGI.ink : "#FFFFFF";
                      const lineC = lime ? "rgba(22,23,28,0.16)" : "rgba(255,255,255,0.14)";
                      const chipBg = lime ? "rgba(22,23,28,0.12)" : "rgba(255,255,255,0.09)";
                      const dotC = lime ? MIGI.ink : MIGI.lime;
                      const tagBg = lime ? MIGI.ink : MIGI.lime;
                      const tagC = lime ? MIGI.lime : MIGI.ink;
                      return (
                        <Reveal key={ag.name} delay={(i % 3) * 0.05}>
                          <div className="migi-card rounded-2xl h-full p-6 flex flex-col" style={{ background: bg }}>
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <h4 className="font-manrope font-semibold text-[15px] leading-snug" style={{ color: nameC }}>{ag.name}</h4>
                              <span className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center" style={{ background: chipBg }}>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: dotC }} />
                              </span>
                            </div>
                            <p className="font-manrope text-[13px] leading-relaxed mb-4 flex-1" style={{ color: bodyC }}>{ag.what}</p>
                            <p className="font-manrope text-[12.5px] italic leading-snug pt-3" style={{ color: whyC, borderTop: `1px solid ${lineC}` }}>
                              {ag.why}
                            </p>
                            {ag.tag && (
                              <span className="mt-3 inline-flex self-start font-dmmono text-[9.5px] uppercase tracking-[0.12em] rounded-full px-2.5 py-1" style={{ background: tagBg, color: tagC }}>
                                {ag.tag}
                              </span>
                            )}
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* the two-way bot — now real-time (event-driven webhook) */}
            <Reveal>
              <div className="mt-14 rounded-[1.75rem] p-8 md:p-10 overflow-hidden relative" style={{ background: MIGI.ink }}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-dmmono text-[10px] uppercase tracking-[0.28em]" style={{ color: MIGI.lime }}>the two-way bot</span>
                      <span className="font-dmmono text-[9px] uppercase tracking-[0.14em] rounded-full px-2 py-0.5" style={{ background: MIGI.lime, color: MIGI.ink }}>now real-time</span>
                    </div>
                    <h3 className="font-manrope font-bold text-[1.5rem] md:text-[2rem] leading-tight tracking-[-0.02em] text-white mb-3">
                      One chat to run the whole system.
                    </h3>
                    <p className="font-manrope text-[14px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Migi went from agents that message me to a system I <span className="text-white">talk to</span>.
                      Read any state I&rsquo;ve captured, trigger any agent on demand, or feed it anything —
                      all from one Telegram thread.
                    </p>
                    <p className="font-manrope text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {BOT_FEED}
                    </p>
                    <p className="font-dmmono text-[10.5px] mt-5 flex items-center gap-2" style={{ color: MIGI.lime }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: MIGI.lime, animation: "migi-blink 1.4s steps(1) infinite" }} />
                      polling → event-driven webhook · replies now instant
                    </p>
                  </div>
                  <div className="space-y-2">
                    {BOT_ACTIONS.map((a) => (
                      <div key={a.cmd} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <span className="font-dmmono text-[12.5px] shrink-0 w-[74px]" style={{ color: MIGI.lime }}>{a.cmd}</span>
                        <span className="font-manrope text-[12.5px]" style={{ color: "rgba(255,255,255,0.62)" }}>{a.does}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 04 · LINKEDIN AUTOPILOT ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: MIGI.creamDeep, borderTop: `1px solid ${MIGI.line}`, borderBottom: `1px solid ${MIGI.line}` }}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <SectionLabel index="04" kicker="linkedin autopilot · i pick the story" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                I don&rsquo;t outsource my voice.{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">I edit with it.</span>
                  <span aria-hidden className="absolute left-0 right-0 bottom-1 h-3 md:h-4 -z-0" style={{ background: MIGI.lime }} />
                </span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: MIGI.muted }}>
                A closed-loop content engine that keeps me visible on LinkedIn. It surfaces the day&rsquo;s
                best stories, drafts in a voice that&rsquo;s mine, and guards against repeating itself — I
                choose the topic, shape the angle, and give the final yes. Editorial control at the top
                of the funnel; leverage everywhere else.
              </p>
            </Reveal>

            {/* the 7-step flow */}
            <div className="space-y-3">
              {LINKEDIN_STEPS.map((s, i) => (
                <Reveal key={s.title} delay={(i % 2) * 0.05}>
                  <div className="flex gap-4 sm:gap-5 items-start rounded-2xl bg-white p-5" style={{ border: `1px solid ${MIGI.line}` }}>
                    <span className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-manrope font-extrabold text-[15px]" style={{ background: MIGI.lime, color: MIGI.ink }}>
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-manrope font-semibold text-[15px] mb-1" style={{ color: MIGI.text }}>{s.title}</h3>
                      <p className="font-manrope text-[13px] leading-relaxed" style={{ color: MIGI.muted }}>{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* talking-point chips */}
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-2 mt-8">
                {LINKEDIN_CHIPS.map((c) => (
                  <span key={c} className="font-manrope text-[12px] font-medium rounded-full px-3.5 py-1.5" style={{ background: MIGI.ink, color: MIGI.lime }}>
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 05 · REAL OUTPUT ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="05" kicker="real output · straight to my phone" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                What actually lands on my phone.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: MIGI.muted }}>
                Not concepts — real messages the agents send me every day, as instant Telegram
                pings and designed email digests. Public content only; personal data stays private.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-4 md:gap-5">
              {DELIVERABLES.map((d, i) => {
                const email = d.channel === "Email";
                return (
                  <Reveal key={d.src} delay={i * 0.07}>
                    <div className="migi-card rounded-2xl overflow-hidden bg-white h-full flex flex-col" style={{ border: `1px solid ${MIGI.line}` }}>
                      <div className="h-[440px] sm:h-[480px] flex items-center justify-center p-4" style={{ background: MIGI.creamDeep }}>
                        <Image
                          src={d.src}
                          alt={`${d.agent} — a real ${d.channel.toLowerCase()} the agent sent`}
                          width={d.w}
                          height={d.h}
                          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                          style={{ boxShadow: "0 14px 34px -16px rgba(0,0,0,0.4)" }}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 p-4">
                        <span className="font-manrope font-semibold text-[13.5px]" style={{ color: MIGI.text }}>{d.agent}</span>
                        <span className="font-dmmono text-[9.5px] uppercase tracking-[0.12em] rounded-full px-2.5 py-1" style={{ background: email ? MIGI.lime : MIGI.ink, color: email ? MIGI.ink : MIGI.lime }}>
                          {d.channel}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 06 · THE DASHBOARD ════════════════════════════ */}
        <section id="dashboard" className="px-6 py-20 md:py-28 scroll-mt-24" style={{ background: MIGI.creamDeep, borderTop: `1px solid ${MIGI.line}`, borderBottom: `1px solid ${MIGI.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="06" kicker="migi · mission control" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                One screen to command them all.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: MIGI.muted }}>
                A private, secure Next.js control panel behind a password and authenticator-app 2FA —
                now a multi-page mission control: live agent health with per-run history, real-time
                domain and uptime status, a feed of everything the agents produced, one-click Run for
                any agent, and a LinkedIn control &amp; audit view.
              </p>
            </Reveal>
            <Reveal delay={0.08}><DashboardShowcase /></Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 07 · HOW IT'S BUILT ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="07" kicker="the operating model" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                Built solo — the AI-native way.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: MIGI.muted }}>
                From architecture to 20+ agents to a secure dashboard: designed and shipped by one
                person orchestrating an AI coding agent, end to end, on entirely free infrastructure.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BUILD.map((b, i) => (
                <Reveal key={b.title} delay={(i % 4) * 0.05}>
                  <div className="migi-card rounded-2xl bg-white h-full p-6" style={{ border: `1px solid ${MIGI.line}` }}>
                    <span className="inline-flex w-8 h-8 rounded-lg items-center justify-center font-manrope font-bold text-[13px] mb-4" style={{ background: MIGI.lime, color: MIGI.ink }}>
                      {i + 1}
                    </span>
                    <h3 className="font-manrope font-semibold text-[15px] mb-2" style={{ color: MIGI.text }}>{b.title}</h3>
                    <p className="font-manrope text-[13px] leading-relaxed" style={{ color: MIGI.muted }}>{b.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ CLOSING ════════════════════════════ */}
        <section className="px-6 pb-28">
          <div className="max-w-5xl mx-auto">
            <Reveal y={30}>
              <div className="relative rounded-[2rem] overflow-hidden p-10 sm:p-16 text-center" style={{ background: MIGI.ink }}>
                <div aria-hidden className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[70%] h-[70%] rounded-full blur-[120px]" style={{ background: `${MIGI.lime}22` }} />
                <div className="relative">
                  <p className="font-dmmono text-[10.5px] uppercase tracking-[0.3em] mb-6" style={{ color: MIGI.lime }}>
                    the AI-age operating model
                  </p>
                  <h2 className="font-manrope font-extrabold text-[2rem] md:text-[3.2rem] leading-[1.06] tracking-[-0.04em] text-white mb-5">
                    Don&rsquo;t just use AI.<br />
                    <span style={{ color: MIGI.lime }}>Design, build and operate it.</span>
                  </h2>
                  <p className="font-manrope text-[15px] max-w-lg mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Migi is the proof: a real, running system of 20+ agents and a secure control plane,
                    shipped solo with Claude Code — the way one person operates in the AI age.
                  </p>
                </div>
              </div>
            </Reveal>
            <p className="font-dmmono text-[11px] text-center mt-10 tracking-wide" style={{ color: MIGI.muted }}>
              Migi · 20+ autonomous agents + a secure dashboard · built with Claude Code by Suman Debnath
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </MotionProvider>
  );
}
