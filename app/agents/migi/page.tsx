import type { Metadata } from "next";
import Image from "next/image";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Reveal, StatCounter } from "@/components/penta/PentaWidgets";
import { DashboardShowcase, ArchitectureFlow } from "@/components/migi/MigiVisuals";
import MigiVideo from "@/components/migi/MigiVideo";
import {
  MIGI,
  STATS,
  PILLARS,
  AREAS,
  BOT_ACTIONS,
  BOT_FEED,
  MAS_STEPS,
  MAS_MISSIONS,
  MAS_CHIPS,
  MAS_SHOT,
  MAS_EXECUTE_STEPS,
  MAS_EXECUTE_SHOT,
  ECHO_STEPS,
  ECHO_CHIPS,
  ECHO_SHOT,
  LINKEDIN_STEPS,
  LINKEDIN_CHIPS,
  LINKEDIN_SHOT,
  CROSSPOST,
  FINANCE_STEPS,
  FINANCE_LAYERS,
  FINANCE_CHIPS,
  FINANCE_SHOT,
  FINANCE_TRUST,
  JOBS_STEPS,
  JOBS_LAYERS,
  JOBS_STAGES,
  JOBS_CHIPS,
  JOBS_SHOT,
  RESUME_STEPS,
  RESUME_LENSES,
  RESUME_CHIPS,
  RESUME_SHOT,
  TOGGLE_SHOT,
  ROUTING_LAYERS,
  ROUTING_CHAINS,
  ROUTING_RELIABILITY,
  ROUTING_CHIPS,
  MATURITY,
  BUDGET_ADDONS,
  MATURITY_CHIPS,
  SECURITY_MATURITY,
  SECURITY_MATURITY_CHIPS,
  UNDERHOOD,
  DEVICES_SHOT,
  SECURITY_FEATURES,
  STACK,
  BUILD,
  DELIVERABLES,
  ORCHESTRATION_SHOT,
} from "@/components/migi/migi-data";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
export const metadata: Metadata = {
  title: "Migi · A Three-Pillar Operator OS — 30+ AI Agents, a Multi-Agent System & a Knowledge Brain",
  description:
    "Migi grew from a fleet of 30+ self-running AI agents into a three-pillar operator OS: MIGI (the fleet), MIGI MAS (a multi-agent system you hand a goal), and MIGI ECHO (a knowledge brain you talk to) — one secure control panel, three identities. Now with intelligent model routing (the right AI per job, a fallback for every agent), self-testing and self-healing, and independently security-audited + hardened. Built solo with Claude Code, on entirely free infrastructure.",
  keywords: [
    "Migi", "AI agent fleet", "multi-agent system", "MAS", "RAG knowledge brain", "autonomous agents",
    "agent orchestration", "GitHub Actions agents", "Claude Code", "AI generalist", "personal AI automation",
    "Telegram bot agents", "Suman Debnath",
  ],
  alternates: { canonical: "/agents/migi" },
  openGraph: {
    type: "website",
    title: "Migi · A Three-Pillar Operator OS — fleet + multi-agent system + knowledge brain",
    description:
      "30+ self-running AI agents, a multi-agent system you hand a goal, and a second brain you talk to — one secure control panel. Built solo with Claude Code, on free infrastructure.",
    url: `${SITE}/agents/migi`,
    images: [{ url: "/migi-agent/overview.png", width: 1350, height: 767, alt: "The Migi mission-control dashboard" }],
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
    "A personal three-pillar operator OS: MIGI, a fleet of 30+ autonomous AI agents; MIGI MAS, a multi-agent system that plans and executes goals; and MIGI ECHO, a personal knowledge brain (RAG) you talk to. Orchestrated on GitHub Actions and commanded through one secure Next.js control panel.",
  url: `${SITE}/agents/migi`,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};
const articleLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Migi — a personal suite of 30+ autonomous AI agents",
  author: { "@type": "Person", name: "Suman Debnath" },
  publisher: { "@type": "Person", name: "Suman Debnath" },
  description:
    "How one operator designed, built and now runs a 30+ agent fleet and a secure control dashboard end to end with Claude Code, on free infrastructure.",
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

/* ── spotlight building blocks (shared by Finance & Job Search) ───────────── */
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-dmmono text-[11px] uppercase tracking-[0.24em] mb-5" style={{ color: MIGI.muted }}>
      {children}
    </p>
  );
}

function Screenshot({ shot, label, alt }: { shot: { src: string; w: number; h: number }; label: string; alt: string }) {
  return (
    <div className="rounded-[1.25rem] overflow-hidden bg-white" style={{ border: `1px solid ${MIGI.line}`, boxShadow: "0 40px 90px -50px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#F4F3ED", borderBottom: `1px solid ${MIGI.line}` }}>
        <span className="w-3 h-3 rounded-full" style={{ background: "#F1655B" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#F5BF4F" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: MIGI.green }} />
        <span className="ml-3 font-dmmono text-[11px]" style={{ color: MIGI.muted }}>migi · {label}</span>
      </div>
      <Image src={shot.src} alt={alt} width={shot.w} height={shot.h} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

function DarkScreenshot({ shot, label, alt }: { shot: { src: string; w: number; h: number }; label: string; alt: string }) {
  return (
    <div className="rounded-[1.25rem] overflow-hidden" style={{ background: MIGI.ink, border: `1px solid ${MIGI.ink}`, boxShadow: "0 40px 90px -50px rgba(0,0,0,0.7)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: MIGI.ink, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="w-3 h-3 rounded-full" style={{ background: "#F1655B" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#F5BF4F" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: MIGI.green }} />
        <span className="ml-3 font-dmmono text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>migi · {label}</span>
      </div>
      <Image src={shot.src} alt={alt} width={shot.w} height={shot.h} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

function StepGrid({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={(i % 2) * 0.05}>
          <div className="flex gap-4 items-start rounded-2xl bg-white p-5 h-full" style={{ border: `1px solid ${MIGI.line}` }}>
            <span className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center font-manrope font-extrabold text-[14px]" style={{ background: MIGI.lime, color: MIGI.ink }}>{i + 1}</span>
            <div>
              <h4 className="font-manrope font-semibold text-[14.5px] mb-1" style={{ color: MIGI.text }}>{s.title}</h4>
              <p className="font-manrope text-[12.5px] leading-relaxed" style={{ color: MIGI.muted }}>{s.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function LayerRow({ layers }: { layers: { name: string; body: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {layers.map((l, i) => (
        <Reveal key={l.name} delay={(i % 3) * 0.05}>
          <div className="rounded-2xl p-5 h-full" style={{ background: MIGI.ink }}>
            <p className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: MIGI.lime }}>{l.name}</p>
            <p className="font-manrope text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>{l.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function ChipRow({ chips }: { chips: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <span key={c} className="font-manrope text-[12px] font-medium rounded-full px-3.5 py-1.5" style={{ background: MIGI.ink, color: MIGI.lime }}>{c}</span>
      ))}
    </div>
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
                Three-pillar operator OS · fleet · MAS · ECHO
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
                It started as{" "}
                <span className="inline-block rounded-xl px-3 py-0.5 leading-[1.12] align-baseline" style={{ background: MIGI.ink, color: MIGI.lime }}>30+ AI agents</span>.
                <br />
                Now it&rsquo;s an operator OS.
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-[0.97rem] md:text-[1.08rem] leading-relaxed max-w-2xl mb-8" style={{ color: "rgba(22,23,28,0.72)" }}>
                Migi grew from a fleet that does my work into three identities I switch between in one
                control panel: <span style={{ color: MIGI.ink, fontWeight: 700 }}>MIGI</span>, the 30+ agent
                fleet; <span style={{ color: MIGI.ink, fontWeight: 700 }}>MIGI MAS</span>, a multi-agent
                system I hand a goal to; and <span style={{ color: MIGI.ink, fontWeight: 700 }}>MIGI ECHO</span>,
                a second brain I can talk to. <span style={{ color: MIGI.ink, fontWeight: 700 }}>Built entirely with Claude Code, on free infrastructure.</span>
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-col sm:flex-row items-center gap-3.5">
                <a
                  href="#pillars"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-manrope font-semibold text-sm transition-transform hover:-translate-y-0.5"
                  style={{ background: MIGI.ink, color: MIGI.lime, boxShadow: "0 16px 34px -16px rgba(0,0,0,0.7)" }}
                >
                  The three pillars <span>↓</span>
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

        {/* ════════════════════════════ HERO VIDEO · teaser ════════════════════════════ */}
        <section className="px-6 pt-16 md:pt-20">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-dmmono text-[11px] rounded px-1.5 py-0.5 leading-none" style={{ color: MIGI.ink, background: MIGI.lime }}>▶</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: MIGI.green }} />
                <span className="font-dmmono text-[10px] uppercase tracking-[0.3em]" style={{ color: MIGI.muted }}>see it in 60 seconds</span>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <MigiVideo
                videoId="E1rvfaBMm1I"
                title="Migi — a 60-second teaser"
                label="teaser"
                ctaHref="#walkthrough"
                ctaLabel="Watch the full walk-through"
              />
            </Reveal>
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
                  something, then reaches me on Telegram or email. Lately, some don&rsquo;t do my
                  work at all — they run the fleet itself.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-[15px] leading-relaxed" style={{ color: MIGI.muted }}>
                  It stopped being only a fleet. The same control panel now holds
                  <span style={{ color: MIGI.text, fontWeight: 600 }}> three identities</span> — a fleet that
                  does my work, a multi-agent system I hand goals to, and a knowledge brain I talk to — and
                  it grew up as software: <span style={{ color: MIGI.text, fontWeight: 600 }}>routing the right
                  AI to each job</span>, testing and healing itself, and hardened after two independent
                  security audits. The whole thing is an argument for how one person operates in the AI age:{" "}
                  <span style={{ color: MIGI.text, fontWeight: 600 }}>leverage, automation and taste — not headcount.</span>
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 02 · THE THREE PILLARS ════════════════════════════ */}
        <section id="pillars" className="px-6 py-20 md:py-28 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="02" kicker="one control panel · three identities" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                One control panel.{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Three identities.</span>
                  <span aria-hidden className="absolute left-0 right-0 bottom-1 h-3 md:h-4 -z-0" style={{ background: MIGI.lime }} />
                </span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: MIGI.muted }}>
                Not just a fleet that does my work and runs itself — now a fleet I can also delegate
                open-ended goals to, and a second brain I can talk to. A single animated toggle
                transforms the whole dashboard between the three worlds, each with its own logo,
                colour and cinematic transition.
              </p>
            </Reveal>

            {/* the identity toggle */}
            <Reveal delay={0.05}>
              <div className="flex items-center gap-4 mb-10 rounded-2xl p-5 md:p-6" style={{ background: MIGI.ink }}>
                <span className="rounded-xl overflow-hidden shrink-0" style={{ border: "1px solid rgba(255,255,255,0.14)" }}>
                  <Image src={TOGGLE_SHOT.src} alt="The Migi identity toggle — one animated switch between the fleet, MAS and ECHO" width={TOGGLE_SHOT.w} height={TOGGLE_SHOT.h} className="block h-[46px] w-auto" loading="lazy" />
                </span>
                <p className="font-manrope text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                  <span className="text-white font-semibold">One switch, three worlds.</span> You don&rsquo;t change tabs — you switch identities,
                  and the entire experience re-themes around you.
                </p>
              </div>
            </Reveal>

            {/* the three pillar cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {PILLARS.map((p, i) => {
                const echo = p.id === "echo";
                const mas = p.id === "mas";
                const dark = mas || echo;
                const bg = p.id === "fleet"
                  ? "#FFFFFF"
                  : mas
                    ? MIGI.ink
                    : "radial-gradient(120% 100% at 100% 0%, #123a2e 0%, #0d1b22 55%, #0a0d12 100%)";
                const nameC = dark ? "#FFFFFF" : MIGI.ink;
                const roleC = MIGI.lime;
                const bodyC = dark ? "rgba(255,255,255,0.66)" : MIGI.muted;
                const lineC = dark ? "rgba(255,255,255,0.14)" : MIGI.line;
                const dotBg = dark ? "rgba(255,255,255,0.08)" : MIGI.limeSoft;
                return (
                  <Reveal key={p.id} delay={i * 0.06}>
                    <div className="migi-card rounded-[1.5rem] h-full p-6 md:p-7 flex flex-col" style={{ background: bg, border: p.id === "fleet" ? `1px solid ${MIGI.line}` : "1px solid rgba(255,255,255,0.10)" }}>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="font-dmmono text-[9.5px] uppercase tracking-[0.2em] rounded-full px-2.5 py-1" style={{ background: MIGI.lime, color: MIGI.ink }}>{p.badge}</span>
                        <span className="font-dmmono text-[10px]" style={{ color: dark ? "rgba(255,255,255,0.4)" : MIGI.muted }}>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="font-manrope font-extrabold text-[1.5rem] tracking-[-0.02em] leading-none" style={{ color: nameC }}>{p.name}</h3>
                      <p className="font-dmmono text-[10.5px] uppercase tracking-[0.18em] mt-2 mb-3" style={{ color: roleC }}>{p.role}</p>
                      <p className="font-manrope font-semibold text-[14px] leading-snug mb-3" style={{ color: nameC }}>{p.tagline}</p>
                      <p className="font-manrope text-[12.5px] leading-relaxed mb-4 flex-1" style={{ color: bodyC }}>{p.body}</p>
                      <ul className="space-y-2 pt-3" style={{ borderTop: `1px solid ${lineC}` }}>
                        {p.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5">
                            <span className="w-4 h-4 rounded-md shrink-0 mt-0.5 flex items-center justify-center" style={{ background: dotBg }}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ background: MIGI.lime }} />
                            </span>
                            <span className="font-manrope text-[12px] leading-snug" style={{ color: dark ? "rgba(255,255,255,0.72)" : MIGI.text }}>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 03 · ARCHITECTURE ════════════════════════════ */}
        <section className="px-6 py-16 md:py-24" style={{ background: MIGI.creamDeep, borderTop: `1px solid ${MIGI.line}`, borderBottom: `1px solid ${MIGI.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="03" kicker="how it fits together" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                Simple parts, wired for leverage.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: MIGI.muted }}>
                Agents fire on GitHub Actions, think with the right model for each job, speak through
                Telegram and email, remember in Supabase, and answer to a single secure dashboard.
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

        {/* ════════════════════════════ 04 · THE FLEET (MIGI) ════════════════════════════ */}
        <section id="fleet" className="px-6 py-20 md:py-28 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="04" kicker="pillar one · migi · the fleet" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                Pillar one: meet the fleet.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: MIGI.muted }}>
                Thirty-plus agents, grouped into seven areas — a career-and-growth layer, and a staff
                layer that runs the fleet itself. Each does one useful thing, framed the same way:
                what it does, and why it helps.
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

                  {area.intro && (
                    <Reveal>
                      <div className="rounded-2xl p-6 md:p-7 mb-6 overflow-hidden" style={{ background: MIGI.ink }}>
                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                          <p className="font-manrope text-[14px] leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.72)" }}>
                            {area.intro.text}
                          </p>
                          {area.intro.shot && (
                            <div className="rounded-xl overflow-hidden shrink-0 w-full md:w-[320px]" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                              <Image
                                src={area.intro.shot.src}
                                alt="A Migi home staff-summary card — the fleet's own LLM-ops totals for the last 7 days"
                                width={area.intro.shot.w}
                                height={area.intro.shot.h}
                                className="w-full h-auto block"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  )}

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

        {/* ════════════════════════════ 05 · MIGI MAS ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: MIGI.ink }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-dmmono text-[11px] rounded px-1.5 py-0.5 leading-none" style={{ color: MIGI.ink, background: MIGI.lime }}>05</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: MIGI.lime }} />
                <span className="font-dmmono text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.5)" }}>pillar two · migi mas · the team</span>
              </div>
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4 text-white">
                Pillar two: hand it a goal.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: "rgba(255,255,255,0.62)" }}>
                The biggest leap. Instead of triggering one agent at a time, I give Migi a
                goal — typed or spoken — and a team of specialist agents takes it from there: a
                supervisor plans it, workers research, draft and critique. And this cycle it stopped
                just planning and drafting — it learned to <span className="text-white">do the thing</span>,
                publishing live once I approve. It can compose my existing fleet agents as tools inside
                a mission, and runs fully isolated from the scheduled fleet — its own assistant, its own
                compute budget, its own space.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <DarkScreenshot shot={MAS_SHOT} label="mas · command deck" alt="The Migi MAS command deck — launch a mission by typing or voice, watch a squad of specialist agents plan and work, and approve every real action" />
            </Reveal>
            <p className="font-dmmono text-[11px] mt-4 mb-12 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
              The MAS command deck — launch a mission, watch the squad work, and approve every real action.
            </p>

            {/* the Operator — MAS now executes (Cycle A) */}
            <div className="mb-12 rounded-[1.5rem] p-7 md:p-9 overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(198,242,78,0.18)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-dmmono text-[10px] uppercase tracking-[0.28em]" style={{ color: MIGI.lime }}>the operator</span>
                <span className="font-dmmono text-[9px] uppercase tracking-[0.14em] rounded-full px-2 py-0.5" style={{ background: MIGI.lime, color: MIGI.ink }}>now it executes</span>
              </div>
              <h3 className="font-manrope font-bold text-[1.5rem] md:text-[2rem] leading-tight tracking-[-0.02em] text-white mb-3">
                From a team that drafts to a team that <span style={{ color: MIGI.lime }}>does it</span>.
              </h3>
              <p className="font-manrope text-[14px] leading-relaxed max-w-2xl mb-7" style={{ color: "rgba(255,255,255,0.62)" }}>
                I hand it a task in plain English — “draft a post on this and put it out everywhere.” It
                researches, writes in my voice, shows me the finished version, and once I approve, publishes
                it across my platforms and sends me the links. Planning and doing, with me on the approve button.
              </p>

              <div className="grid md:grid-cols-[300px_1fr] gap-6 md:gap-8 items-start">
                <div className="rounded-2xl overflow-hidden bg-[#0d1117] w-full" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="flex items-center gap-2 px-3.5 py-2.5" style={{ background: MIGI.ink, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F1655B" }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F5BF4F" }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: MIGI.green }} />
                    <span className="ml-2.5 font-dmmono text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>mas · operator</span>
                  </div>
                  <div className="p-5 flex items-center justify-center">
                    <Image src={MAS_EXECUTE_SHOT.src} alt="The MIGI MAS Operator — hand it ready-to-post text or a topic and it drafts, then publishes on approval" width={MAS_EXECUTE_SHOT.w} height={MAS_EXECUTE_SHOT.h} className="w-full h-auto block rounded-lg" loading="lazy" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {MAS_EXECUTE_STEPS.map((s, i) => (
                    <Reveal key={s.title} delay={(i % 2) * 0.05}>
                      <div className="rounded-2xl h-full p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                        <span className="inline-flex w-8 h-8 rounded-xl items-center justify-center font-manrope font-extrabold text-[13px] mb-3" style={{ background: MIGI.lime, color: MIGI.ink }}>{i + 1}</span>
                        <h4 className="font-manrope font-semibold text-[13.5px] mb-1.5 text-white leading-snug">{s.title}</h4>
                        <p className="font-manrope text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{s.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            {/* goal → mission flow */}
            <div className="mb-12">
              <Reveal>
                <p className="font-dmmono text-[11px] uppercase tracking-[0.24em] mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>Goal in → mission out</p>
              </Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {MAS_STEPS.map((s, i) => (
                  <Reveal key={s.title} delay={(i % 5) * 0.04}>
                    <div className="rounded-2xl h-full p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                      <span className="inline-flex w-8 h-8 rounded-xl items-center justify-center font-manrope font-extrabold text-[13px] mb-3" style={{ background: MIGI.lime, color: MIGI.ink }}>{i + 1}</span>
                      <h4 className="font-manrope font-semibold text-[13.5px] mb-1.5 text-white leading-snug">{s.title}</h4>
                      <p className="font-manrope text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{s.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* missions it runs */}
            <div className="mb-10">
              <Reveal>
                <p className="font-dmmono text-[11px] uppercase tracking-[0.24em] mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>Real missions it runs</p>
              </Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {MAS_MISSIONS.map((mi, i) => (
                  <Reveal key={mi.name} delay={(i % 3) * 0.05}>
                    <div className="rounded-2xl p-5 h-full" style={{ background: MIGI.lime }}>
                      <p className="font-manrope font-bold text-[13.5px] mb-1.5" style={{ color: MIGI.ink }}>{mi.name}</p>
                      <p className="font-manrope text-[12px] leading-relaxed" style={{ color: "rgba(22,23,28,0.72)" }}>{mi.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.05}>
              <div className="flex flex-wrap gap-2">
                {MAS_CHIPS.map((c) => (
                  <span key={c} className="font-manrope text-[12px] font-medium rounded-full px-3.5 py-1.5" style={{ background: "rgba(255,255,255,0.06)", color: MIGI.lime, border: "1px solid rgba(255,255,255,0.1)" }}>{c}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 06 · MIGI ECHO ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: "radial-gradient(120% 90% at 82% -10%, #133a2c 0%, #0e1c22 52%, #0a0d12 100%)" }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-dmmono text-[11px] rounded px-1.5 py-0.5 leading-none" style={{ color: MIGI.ink, background: MIGI.lime }}>06</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: MIGI.lime }} />
                <span className="font-dmmono text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.55)" }}>pillar three · migi echo · the memory</span>
              </div>
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4 text-white">
                Pillar three: talk to your knowledge.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: "rgba(255,255,255,0.66)" }}>
                A personal, private RAG system — a second brain that actually knows my work and my
                life. I teach it anything (notes, documents, web pages, even my own code repositories),
                then I talk to it by text or voice; it answers from my own knowledge plus a live read
                of my data, cites where each answer came from, and reads it back aloud. Searching your
                notes is friction; conversing with them is leverage.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <DarkScreenshot shot={ECHO_SHOT} label="echo · knowledge chat" alt="The Migi ECHO knowledge chat — an aurora-lit chat interface with a history sidebar, a centered composer, voice input and spoken replies over my own knowledge base" />
            </Reveal>
            <p className="font-dmmono text-[11px] mt-4 mb-12 text-center" style={{ color: "rgba(255,255,255,0.45)" }}>
              The ECHO knowledge chat — ask by text or voice, get grounded, cited answers read back aloud.
            </p>

            <div className="mb-10">
              <Reveal>
                <p className="font-dmmono text-[11px] uppercase tracking-[0.24em] mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>Teach it, then ask it anything</p>
              </Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {ECHO_STEPS.map((s, i) => (
                  <Reveal key={s.title} delay={(i % 5) * 0.04}>
                    <div className="rounded-2xl h-full p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(198,242,78,0.16)" }}>
                      <span className="inline-flex w-8 h-8 rounded-xl items-center justify-center font-manrope font-extrabold text-[13px] mb-3" style={{ background: MIGI.lime, color: MIGI.ink }}>{i + 1}</span>
                      <h4 className="font-manrope font-semibold text-[13.5px] mb-1.5 text-white leading-snug">{s.title}</h4>
                      <p className="font-manrope text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{s.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.05}>
              <div className="flex flex-wrap gap-2">
                {ECHO_CHIPS.map((c) => (
                  <span key={c} className="font-manrope text-[12px] font-medium rounded-full px-3.5 py-1.5" style={{ background: "rgba(198,242,78,0.1)", color: MIGI.lime, border: "1px solid rgba(198,242,78,0.22)" }}>{c}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 07 · INTELLIGENT MODEL ROUTING ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="07" kicker="intelligent model routing · a brain per job" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                One model for everything?{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Not anymore.</span>
                  <span aria-hidden className="absolute left-0 right-0 bottom-1 h-3 md:h-4 -z-0" style={{ background: MIGI.lime }} />
                </span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: MIGI.muted }}>
                Migi stopped using one AI for everything and started thinking like a team lead — assigning
                each job to the right brain, with a backup for every brain, on a budget, without ever
                risking a breakage. A premium model leads the heavy, quality-critical work; free models
                handle the routine; and every agent has an ordered fallback chain.
              </p>
            </Reveal>

            {/* the per-job fallback chains — generic, name-safe */}
            <Reveal delay={0.06}>
              <div className="rounded-[1.25rem] overflow-hidden" style={{ background: MIGI.ink, border: `1px solid ${MIGI.ink}`, boxShadow: "0 30px 70px -44px rgba(0,0,0,0.6)" }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ background: MIGI.ink, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: "#F1655B" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#F5BF4F" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: MIGI.green }} />
                  <span className="ml-3 font-dmmono text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>migi · llm routing · primary → fallbacks</span>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  {ROUTING_CHAINS.map((row) => (
                    <div key={row.job} className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <span className="font-manrope font-semibold text-[13px] text-white sm:w-[210px] shrink-0">{row.job}</span>
                      <div className="flex flex-wrap items-center gap-2">
                        {row.chain.map((c, i) => (
                          <span key={c} className="flex items-center gap-2">
                            <span
                              className="font-dmmono text-[11.5px] rounded-full px-3 py-1"
                              style={i === 0
                                ? { background: MIGI.lime, color: MIGI.ink }
                                : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.66)", border: "1px solid rgba(255,255,255,0.1)" }}
                            >
                              {c}
                            </span>
                            {i < row.chain.length - 1 && <span className="font-dmmono text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>→</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <p className="font-dmmono text-[11px] mt-4 text-center" style={{ color: MIGI.muted }}>
              Each agent&rsquo;s primary brain and its exact fallback order — a provider&rsquo;s bad day never stalls the fleet.
            </p>

            {/* how the routing thinks */}
            <div className="mb-10 mt-12">
              <Reveal><SubLabel>How the routing thinks</SubLabel></Reveal>
              <LayerRow layers={ROUTING_LAYERS} />
            </div>

            {/* a fleet that regulates itself */}
            <div className="mb-10">
              <Reveal><SubLabel>A fleet that regulates itself</SubLabel></Reveal>
              <Reveal delay={0.05}>
                <div className="rounded-[1.5rem] p-7 md:p-9" style={{ background: MIGI.ink }}>
                  <div className="grid md:grid-cols-[210px_1fr] gap-8 items-start">
                    <div>
                      <p className="font-dmmono text-[10px] uppercase tracking-[0.22em] mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>rate-limits · 7d</p>
                      <p className="font-manrope font-extrabold text-[2.6rem] leading-none tracking-[-0.02em]" style={{ color: MIGI.lime }}>110</p>
                      <p className="font-manrope text-[12.5px] leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                        call-limit events absorbed — the fleet falls over to a backup provider when one says wait.
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 font-dmmono text-[10px] uppercase tracking-[0.14em] rounded-full px-2.5 py-1" style={{ background: "rgba(198,242,78,0.12)", color: MIGI.lime }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: MIGI.lime, animation: "migi-blink 1.4s steps(1) infinite" }} />
                        early-warning before failure
                      </span>
                    </div>
                    <div className="space-y-3">
                      {ROUTING_RELIABILITY.map((r) => (
                        <div key={r.title} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                          <h4 className="font-manrope font-semibold text-[13.5px] mb-1 text-white">{r.title}</h4>
                          <p className="font-manrope text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{r.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.05}><ChipRow chips={ROUTING_CHIPS} /></Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 08 · ENGINEERING MATURITY ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: MIGI.ink }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-dmmono text-[11px] rounded px-1.5 py-0.5 leading-none" style={{ color: MIGI.ink, background: MIGI.lime }}>08</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: MIGI.lime }} />
                <span className="font-dmmono text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.5)" }}>engineering maturity · trust · extend · improve</span>
              </div>
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4 text-white">
                The fleet grew up as engineering.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: "rgba(255,255,255,0.62)" }}>
                Prompted by two independent audits, this cycle didn&rsquo;t add a fourth pillar — it added
                the engineering-maturity layer. Migi went from &ldquo;a fleet that runs&rdquo; to &ldquo;a fleet you can
                trust and build on&rdquo;: it tests itself, heals itself, plugs into any AI assistant, safely
                bolts on premium-tier free tools, and starts to learn from how I use it — all still on
                $0 infrastructure, all human-in-the-loop.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MATURITY.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 0.05}>
                  <div className="rounded-2xl h-full p-6 flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <span className="inline-flex w-9 h-9 rounded-xl items-center justify-center mb-4" style={{ background: MIGI.lime }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MIGI.ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                    </span>
                    <h4 className="font-manrope font-semibold text-[15px] mb-2 text-white leading-snug">{f.title}</h4>
                    <p className="font-manrope text-[12.5px] leading-relaxed mb-4 flex-1" style={{ color: "rgba(255,255,255,0.6)" }}>{f.body}</p>
                    <p className="font-manrope text-[12px] italic leading-snug pt-3" style={{ color: MIGI.lime, borderTop: "1px solid rgba(255,255,255,0.12)" }}>{f.why}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* free-tier budgets graphic — generic add-ons, name-safe */}
            <div className="mt-10">
              <Reveal>
                <p className="font-dmmono text-[11px] uppercase tracking-[0.24em] mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>Free power-ups, metered — they can&rsquo;t overspend</p>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="rounded-[1.5rem] p-6 md:p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <p className="font-dmmono text-[10px] uppercase tracking-[0.16em] mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    free-tier budgets · metered add-ons · agents fall back to baseline when a budget is spent
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {BUDGET_ADDONS.map((a) => (
                      <div key={a.name} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-manrope font-semibold text-[13.5px] text-white">{a.name}</span>
                          <span className="font-dmmono text-[9px] uppercase tracking-[0.12em] rounded-full px-2 py-0.5" style={{ background: "rgba(198,242,78,0.14)", color: MIGI.lime }}>active</span>
                        </div>
                        <p className="font-manrope text-[11.5px] mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{a.note}</p>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                          <span className="block h-full rounded-full" style={{ width: "8%", background: MIGI.lime }} />
                        </div>
                        <p className="font-dmmono text-[10px] mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>within free limit · resets monthly</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.05}>
              <div className="flex flex-wrap gap-2 mt-8">
                {MATURITY_CHIPS.map((c) => (
                  <span key={c} className="font-manrope text-[12px] font-medium rounded-full px-3.5 py-1.5" style={{ background: "rgba(255,255,255,0.06)", color: MIGI.lime, border: "1px solid rgba(255,255,255,0.1)" }}>{c}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 09 · LINKEDIN AUTOPILOT ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: MIGI.creamDeep, borderTop: `1px solid ${MIGI.line}`, borderBottom: `1px solid ${MIGI.line}` }}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <SectionLabel index="09" kicker="linkedin autopilot · i pick the story" />
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

            {/* the LinkedIn control & audit view */}
            <Reveal delay={0.08}>
              <div className="mt-10">
                <Screenshot shot={LINKEDIN_SHOT} label="linkedin" alt="The Migi dashboard LinkedIn view — autopilot drafts, approvals and full post history" />
              </div>
            </Reveal>
            <p className="font-dmmono text-[11px] mt-4 text-center" style={{ color: MIGI.muted }}>
              The LinkedIn control &amp; audit view — drafts, approvals, and full post history in one place.
            </p>

            {/* one post, every platform — cross-post repurpose step */}
            <Reveal delay={0.06}>
              <div className="mt-12 rounded-[1.5rem] p-7 md:p-9" style={{ background: MIGI.ink }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-dmmono text-[10px] uppercase tracking-[0.28em]" style={{ color: MIGI.lime }}>new · one post, every platform</span>
                  <span className="font-dmmono text-[9px] uppercase tracking-[0.14em] rounded-full px-2 py-0.5" style={{ background: MIGI.lime, color: MIGI.ink }}>free networks</span>
                </div>
                <h3 className="font-manrope font-bold text-[1.4rem] md:text-[1.8rem] leading-tight tracking-[-0.02em] text-white mb-3">
                  Publish once. Repurpose everywhere.
                </h3>
                <p className="font-manrope text-[14px] leading-relaxed max-w-2xl mb-5" style={{ color: "rgba(255,255,255,0.62)" }}>
                  {CROSSPOST.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {CROSSPOST.chips.map((c) => (
                    <span key={c} className="font-manrope text-[12px] font-medium rounded-full px-3.5 py-1.5" style={{ background: "rgba(255,255,255,0.06)", color: MIGI.lime, border: "1px solid rgba(255,255,255,0.1)" }}>{c}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 10 · FINANCE TRACKER ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="10" kicker="finance tracker · trained + tested like a product" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                From an SMS to a{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">categorized ledger.</span>
                  <span aria-hidden className="absolute left-0 right-0 bottom-1 h-3 md:h-4 -z-0" style={{ background: MIGI.lime }} />
                </span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: MIGI.muted }}>
                A privacy-first money agent I hardened the way you&rsquo;d harden a real product, not a
                demo — trained on my own bank messages and shipped with a test suite. It captures both
                bank SMS and app notifications, de-duplicates the same transaction across them, learns my
                category corrections, and ignores everything that looks like money but isn&rsquo;t — so only
                money that actually moved is logged, with manual cash entry, a 24-month history, budgets
                and a full audit trail. All behind my login.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <Screenshot shot={FINANCE_SHOT} label="finance" alt="The Migi dashboard Finance tracker — today / week / month spend, categories, top merchants, daily-spend chart and budget caps" />
            </Reveal>
            <p className="font-dmmono text-[11px] mt-4 mb-12 text-center" style={{ color: MIGI.muted }}>
              The Finance tracker — spend by period, intelligent categories, top merchants and budget caps.
            </p>

            <div className="mb-12">
              <Reveal><SubLabel>How it automates the money</SubLabel></Reveal>
              <StepGrid steps={FINANCE_STEPS} />
            </div>

            <div className="mb-10">
              <Reveal><SubLabel>The layers inside</SubLabel></Reveal>
              <LayerRow layers={FINANCE_LAYERS} />
            </div>

            {/* trained + tested like a product (Cycle A) */}
            <div className="mb-10">
              <Reveal><SubLabel>Trained + tested like a product</SubLabel></Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {FINANCE_TRUST.map((t, i) => (
                  <Reveal key={t.name} delay={(i % 4) * 0.05}>
                    <div className="migi-card rounded-2xl bg-white h-full p-5" style={{ border: `1px solid ${MIGI.line}` }}>
                      <p className="font-manrope font-semibold text-[13.5px] mb-1.5" style={{ color: MIGI.text }}>{t.name}</p>
                      <p className="font-manrope text-[12.5px] leading-relaxed" style={{ color: MIGI.muted }}>{t.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.05}><ChipRow chips={FINANCE_CHIPS} /></Reveal>
          </div>
        </section>

        {/* ════════════════════════════ ★ · FULL WALK-THROUGH VIDEO ════════════════════════════ */}
        <section id="walkthrough" className="px-6 py-20 md:py-28 scroll-mt-24" style={{ background: MIGI.creamDeep, borderTop: `1px solid ${MIGI.line}`, borderBottom: `1px solid ${MIGI.line}` }}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <SectionLabel index="▶" kicker="the full walk-through" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                See the whole thing{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">in motion.</span>
                  <span aria-hidden className="absolute left-0 right-0 bottom-1 h-3 md:h-4 -z-0" style={{ background: MIGI.lime }} />
                </span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: MIGI.muted }}>
                The complete tour — the three identities, the dashboard, the agents and the routing,
                all in one take. Press play and watch Migi actually run.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <MigiVideo videoId="Qa4R4TKUTfs" title="Migi — full walk-through" label="full walk-through" />
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 11 · JOB SEARCH ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: MIGI.creamDeep, borderTop: `1px solid ${MIGI.line}`, borderBottom: `1px solid ${MIGI.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="11" kicker="job search · apply-ready, human-sent" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                The tedious 95% of applying,{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">done.</span>
                  <span aria-hidden className="absolute left-0 right-0 bottom-1 h-3 md:h-4 -z-0" style={{ background: MIGI.lime }} />
                </span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: MIGI.muted }}>
                It continuously scouts target roles, scores each against my CV, writes a tailored cover
                letter, and hands me an apply-ready packet with a direct link. I make the final
                click — deliberately no auto-submit, for quality and full compliance — then track the
                whole pipeline on the dashboard.
              </p>
            </Reveal>

            {/* pipeline stepper */}
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-2.5 mb-10">
                {JOBS_STAGES.map((st, i) => (
                  <div key={st} className="flex items-center gap-2.5">
                    <span
                      className="rounded-full px-4 py-2 font-manrope font-semibold text-[13px]"
                      style={{
                        background: i === 0 ? MIGI.lime : "#FFFFFF",
                        color: MIGI.ink,
                        border: `1px solid ${i === 0 ? MIGI.lime : MIGI.line}`,
                      }}
                    >
                      {st}
                    </span>
                    {i < JOBS_STAGES.length - 1 && <span className="font-dmmono" style={{ color: MIGI.muted }}>→</span>}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Screenshot shot={JOBS_SHOT} label="jobs" alt="The Migi dashboard Jobs tracker — roles scored against my CV with match percentages, cover-letter actions, apply links and a status pipeline" />
            </Reveal>
            <p className="font-dmmono text-[11px] mt-4 mb-12 text-center" style={{ color: MIGI.muted }}>
              The Jobs tracker — match scores, cover letters, direct apply links, and a new → applied → interviewing → rejected pipeline.
            </p>

            <div className="mb-12">
              <Reveal><SubLabel>How it automates the hunt</SubLabel></Reveal>
              <StepGrid steps={JOBS_STEPS} />
            </div>

            <div className="mb-10">
              <Reveal><SubLabel>The layers inside</SubLabel></Reveal>
              <LayerRow layers={JOBS_LAYERS} />
            </div>

            <Reveal delay={0.05}><ChipRow chips={JOBS_CHIPS} /></Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 12 · RESUME / ATS REVIEWER ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="12" kicker="resume / ats reviewer · wired to my job hunt" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                Reviewed the way it&rsquo;s actually{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">screened.</span>
                  <span aria-hidden className="absolute left-0 right-0 bottom-1 h-3 md:h-4 -z-0" style={{ background: MIGI.lime }} />
                </span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: MIGI.muted }}>
                Anyone can paste a resume into a chatbot for one generic opinion. This parses the file
                like an applicant-tracking system, scores it against the actual live roles my job agent
                is tracking, and reviews it through the same three sets of eyes that screen it in real
                life — then hands back prioritized fixes and tracks the score over time.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <Screenshot shot={RESUME_SHOT} label="resume" alt="The Migi dashboard Resume / ATS reviewer — upload a resume, optionally score it against my live roles from the Job Agent, and review as a recruiter, hiring manager and ATS bot with a tracked score history" />
            </Reveal>
            <p className="font-dmmono text-[11px] mt-4 mb-12 text-center" style={{ color: MIGI.muted }}>
              The Resume / ATS reviewer — ATS-style parse, keyword match vs my live roles, and a tracked score history.
            </p>

            <div className="mb-12">
              <Reveal><SubLabel>How it reviews</SubLabel></Reveal>
              <StepGrid steps={RESUME_STEPS} />
            </div>

            <div className="mb-10">
              <Reveal><SubLabel>Three lenses</SubLabel></Reveal>
              <LayerRow layers={RESUME_LENSES} />
            </div>

            <Reveal delay={0.05}><ChipRow chips={RESUME_CHIPS} /></Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 13 · REAL OUTPUT ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="13" kicker="real output · straight to my phone" />
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

        {/* ════════════════════════════ 14 · THE DASHBOARD ════════════════════════════ */}
        <section id="dashboard" className="px-6 py-20 md:py-28 scroll-mt-24" style={{ background: MIGI.creamDeep, borderTop: `1px solid ${MIGI.line}`, borderBottom: `1px solid ${MIGI.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="14" kicker="migi · one control panel, three worlds" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                One console to command them all.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: MIGI.muted }}>
                One animated toggle switches this control panel between all three identities — the
                <span style={{ color: MIGI.text }}> fleet</span> (this light operator dashboard), the
                <span style={{ color: MIGI.text }}> MAS command deck</span> and the
                <span style={{ color: MIGI.text }}> ECHO knowledge chat</span>. On the fleet side it&rsquo;s a
                full operator OS behind a password and authenticator-app 2FA, with its own tracker for
                each workflow: <span style={{ color: MIGI.text }}>Finance, Jobs, Resume, Build, Outreach, Skills and Launch</span>.
                It meters itself too — a <span style={{ color: MIGI.text }}>Team observability page</span> (12-month
                usage, cost and tokens by provider, a per-agent breakdown, live health and a &ldquo;needs
                attention&rdquo; panel), home staff-summary cards, and a redesigned data page — plus fleet
                health, live domain status, a responses feed, and one-click Run for any agent.
              </p>
            </Reveal>
            <Reveal delay={0.08}><DashboardShowcase /></Reveal>

            {/* under the hood — quality upgrades across the whole system */}
            <div className="mt-16">
              <Reveal>
                <SubLabel>Under the hood</SubLabel>
                <h3 className="font-manrope font-bold text-[1.4rem] md:text-[1.9rem] tracking-[-0.02em] leading-tight mb-4">
                  Product-grade, all the way down.
                </h3>
                <p className="text-[14px] leading-relaxed max-w-2xl mb-8" style={{ color: MIGI.muted }}>
                  The upgrades that don&rsquo;t show up in a screenshot but make the whole system feel like a
                  product — from the emails it sends to how it survives a provider outage.
                </p>
              </Reveal>
              <div className="grid sm:grid-cols-3 gap-4">
                {UNDERHOOD.map((f, i) => (
                  <Reveal key={f.title} delay={(i % 3) * 0.05}>
                    <div className="migi-card rounded-2xl bg-white h-full p-6" style={{ border: `1px solid ${MIGI.line}` }}>
                      <span className="inline-flex w-9 h-9 rounded-xl items-center justify-center mb-4" style={{ background: MIGI.lime }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MIGI.ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                      </span>
                      <h4 className="font-manrope font-semibold text-[15px] mb-2" style={{ color: MIGI.text }}>{f.title}</h4>
                      <p className="font-manrope text-[13px] leading-relaxed" style={{ color: MIGI.muted }}>{f.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* secure & mobile — session security + device management (feature #5) */}
            <div className="mt-16">
              <Reveal>
                <SubLabel>Secure &amp; mobile</SubLabel>
                <h3 className="font-manrope font-bold text-[1.4rem] md:text-[1.9rem] tracking-[-0.02em] leading-tight mb-4">
                  Operating a system means being able to secure it.
                </h3>
                <p className="text-[14px] leading-relaxed max-w-2xl mb-8" style={{ color: MIGI.muted }}>
                  The console grew up on access, too. Sessions now persist on a 7-day rolling window
                  instead of dropping me every few hours, a Devices page shows every place I&rsquo;m
                  logged in and lets me remotely log out any one — or everywhere — in a tap, and the
                  whole panel is fully responsive, so I can run the fleet from my pocket.
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <Screenshot shot={DEVICES_SHOT} label="devices" alt="The Migi dashboard Devices & sessions page — active sessions per browser and OS with revoke, log-out-others and log-out-everywhere controls" />
              </Reveal>
              <p className="font-dmmono text-[11px] mt-4 mb-10 text-center" style={{ color: MIGI.muted }}>
                The Devices &amp; sessions page — every logged-in device, with one-tap revoke, log-out-others, or log-out-everywhere.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {SECURITY_FEATURES.map((f, i) => (
                  <Reveal key={f.title} delay={(i % 3) * 0.05}>
                    <div className="migi-card rounded-2xl bg-white h-full p-6" style={{ border: `1px solid ${MIGI.line}` }}>
                      <span className="inline-flex w-9 h-9 rounded-xl items-center justify-center mb-4" style={{ background: MIGI.lime }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MIGI.ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                      </span>
                      <h4 className="font-manrope font-semibold text-[15px] mb-2" style={{ color: MIGI.text }}>{f.title}</h4>
                      <p className="font-manrope text-[13px] leading-relaxed" style={{ color: MIGI.muted }}>{f.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 15 · SECURITY MATURITY ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: MIGI.ink }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-dmmono text-[11px] rounded px-1.5 py-0.5 leading-none" style={{ color: MIGI.ink, background: MIGI.lime }}>15</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: MIGI.lime }} />
                <span className="font-dmmono text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.5)" }}>security maturity · treated like production</span>
              </div>
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4 text-white">
                I had it independently{" "}
                <span className="relative inline-block">
                  <span className="relative z-10" style={{ color: MIGI.ink }}>security-audited.</span>
                  <span aria-hidden className="absolute -left-1 -right-1 top-0 bottom-0 -z-0 rounded-md" style={{ background: MIGI.lime }} />
                </span>{" "}
                Twice.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: "rgba(255,255,255,0.62)" }}>
                Migi runs my private life — my journal, my finances, my content, my job hunt — so I treated
                it like any real product that holds sensitive data. This wasn&rsquo;t a feature cycle; it was a
                security-maturity cycle: two independent AI-driven audits of the whole system, reconciled
                into one plan and fixed in phases, then hardened end to end against the specific ways AI
                systems get attacked. Handling private data responsibly is part of the build, not an
                afterthought — and this is proactive hardening, never a response to a breach.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECURITY_MATURITY.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 0.05}>
                  <div className="rounded-2xl h-full p-6 flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <span className="inline-flex w-9 h-9 rounded-xl items-center justify-center mb-4" style={{ background: MIGI.lime }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MIGI.ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                    </span>
                    <h4 className="font-manrope font-semibold text-[15px] mb-2 text-white leading-snug">{f.title}</h4>
                    <p className="font-manrope text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.05}>
              <div className="flex flex-wrap gap-2 mt-8">
                {SECURITY_MATURITY_CHIPS.map((c) => (
                  <span key={c} className="font-manrope text-[12px] font-medium rounded-full px-3.5 py-1.5" style={{ background: "rgba(255,255,255,0.06)", color: MIGI.lime, border: "1px solid rgba(255,255,255,0.1)" }}>{c}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 16 · HOW IT'S BUILT ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="16" kicker="the operating model" />
              <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.08] tracking-[-0.03em] mb-4">
                Built solo — the AI-native way.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: MIGI.muted }}>
                From architecture to 30+ agents to a multi-agent system, a knowledge brain and a secure
                dashboard: designed and shipped by one person orchestrating an AI coding agent, end to
                end, on entirely free infrastructure.
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
                    Migi is the proof: a fleet that does my work, a team of agents I hand goals to, and a
                    second brain I can talk to — routed to the right AI per job, independently security-audited,
                    and shipped solo with Claude Code. Leverage without headcount, built like a product.
                  </p>
                </div>
              </div>
            </Reveal>
            <p className="font-dmmono text-[11px] text-center mt-10 tracking-wide" style={{ color: MIGI.muted }}>
              Migi · a three-pillar operator OS: fleet + multi-agent system + knowledge brain · built with Claude Code by Suman Debnath
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </MotionProvider>
  );
}
