import type { Metadata } from "next";
import Image from "next/image";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  Reveal,
  AmbientBackground,
  Marquee,
  CopyCommand,
  PromptToCommand,
  Pipeline,
  SafetyGates,
  FamilyExplorer,
  StatNumber,
} from "@/components/pentashell/PentashellVisuals";
import {
  GITHUB,
  MODEL_PAGE,
  MODEL_SPECS,
  BUILD_STEPS,
  LIMITATIONS,
  STACK,
  CLI_OPTIONS,
} from "@/components/pentashell/pentashell-data";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
export const metadata: Metadata = {
  title: "Pentashell · Plain English → One Terminal Command, Safely",
  description:
    "Pentashell is the local, no-GPU CLI for PentaCMD-47M — a 47M-parameter model built from scratch. Type plain English, get one terminal command, and run it only with your explicit approval. Destructive commands name the risk and demand a typed yes.",
  keywords: [
    "Pentashell", "PentaCMD", "pentacmd CLI", "English to terminal command", "local SLM CLI",
    "no GPU AI tool", "safe command runner", "natural language shell", "Suman Debnath",
  ],
  alternates: { canonical: "/agents/pentashell" },
  openGraph: {
    type: "website",
    title: "Pentashell · One instruction. One command. Your approval.",
    description:
      "The local, no-GPU CLI for the from-scratch PentaCMD-47M model. Plain English in, one safe terminal command out — nothing runs without your yes.",
    url: `${SITE}/agents/pentashell`,
    images: [{ url: "/pentashell/pentashell (2).png", width: 1915, height: 821, alt: "Pentashell — the default CLI for the PentaCMD-47M SLM model" }],
  },
};

/* ── Schema ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pentashell",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux (Python 3.9+)",
  description:
    "A local, no-GPU command-line tool that turns plain English into one terminal command using the from-scratch PentaCMD-47M model, and runs it only with explicit approval.",
  url: `${SITE}/agents/pentashell`,
  softwareVersion: "Phase 2",
  license: "https://opensource.org/licenses/MIT",
  author: { "@type": "Person", name: "Suman Debnath", url: SITE },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

/* ── gradient text helpers ──────────────────────────────────────────────── */
const gWhite = { background: "linear-gradient(180deg,#ffffff 0%,rgba(255,255,255,0.55) 100%)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };
const gBrand = { background: "linear-gradient(100deg,#2FE2F0 0%,#9B6BF2 50%,#F25FD0 100%)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };
const gCyan = { background: "linear-gradient(135deg,#7DEFF7 0%,#2FE2F0 100%)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };

/* ── GitHub glyph ───────────────────────────────────────────────────────── */
function GitHubMark({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

/* ── kicker ─────────────────────────────────────────────────────────────── */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-dmmono text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-[#7DEFF7]/70">
      <span className="text-[#2FE2F0]">┌─</span>
      {children}
      <span className="text-[#F25FD0]">─┐</span>
    </span>
  );
}

/* ── section heading ────────────────────────────────────────────────────── */
function SectionLabel({ index, kicker, center }: { index: string; kicker: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}>
      <span className="font-dmmono text-[11px] border rounded px-1.5 py-0.5 leading-none" style={{ color: "#2FE2F0", borderColor: "rgba(47,226,240,0.4)" }}>[ {index} ]</span>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F25FD0", animation: "pact-blink 1.3s steps(1) infinite" }} />
      <span className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-white/35">{"// "}{kicker}</span>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ═════════════════════════════════════════════════════════════════════════ */
export default function PentashellPage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ps-drift { 0%,100%{ transform:translate(-50%,0) scale(1);} 50%{ transform:translate(-50%,-3%) scale(1.06);} }
        @keyframes ps-flow { to { stroke-dashoffset: -400; } }
        @keyframes ps-sweep { 0%{ transform:translateY(-130%); opacity:0;} 12%{opacity:1;} 88%{opacity:1;} 100%{ transform:translateY(260%); opacity:0;} }
        @keyframes ps-float { 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-9px);} }
        @keyframes ps-sheen { 0%{ transform:translateX(-150%) skewX(-18deg);} 100%{ transform:translateX(260%) skewX(-18deg);} }
        .ps-card{transition:transform .4s cubic-bezier(.22,1,.36,1),border-color .4s,box-shadow .4s;}
        .ps-card:hover{transform:translateY(-5px);border-color:rgba(47,226,240,0.25);box-shadow:0 30px 70px -34px rgba(47,226,240,0.3);}
      `}} />

      <main className="relative bg-[#05060e] text-[#e8ecf7] min-h-screen overflow-hidden selection:bg-[#2FE2F0] selection:text-black">
        <AmbientBackground />

        <div className="relative z-10">

          {/* ════════════════════════════ HERO ════════════════════════════ */}
          <section className="px-6 pt-24 md:pt-28 pb-10">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              <Reveal><Kicker>The default CLI for PentaCMD-47M</Kicker></Reveal>

              {/* centered transparent logo (margins trimmed so it sits tight) */}
              <Reveal delay={0.05}>
                <div className="mt-6 mb-1 w-full" style={{ animation: "ps-float 7s ease-in-out infinite" }}>
                  <span className="sr-only">Pentashell</span>
                  <Image
                    src="/pentashell/pentashell-logo-trim.png"
                    alt="Pentashell"
                    width={1337}
                    height={201}
                    priority
                    className="w-full max-w-[420px] sm:max-w-[500px] md:max-w-[560px] h-auto mx-auto drop-shadow-[0_0_48px_rgba(47,226,240,0.35)]"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <h1 className="font-manrope font-extrabold text-[2rem] sm:text-[2.7rem] md:text-[3.4rem] leading-[1.08] tracking-[-0.04em] mt-5 mb-5">
                  <span style={gWhite}>One instruction. One command.</span>
                  <br />
                  <span className="font-serif italic font-normal inline-block px-[0.12em]" style={gBrand}>Your approval.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="font-manrope text-[0.98rem] md:text-[1.1rem] text-white/55 leading-relaxed max-w-2xl mb-7">
                  Pentashell turns plain English into a terminal command — it suggests one, shows it
                  clearly, and runs it <span className="text-white/85">only when you say so</span>.
                  Fully local, no GPU, powered by a 47M-parameter model built from scratch.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-manrope font-semibold text-sm text-black overflow-hidden"
                    style={{ background: "linear-gradient(100deg,#2FE2F0,#9B6BF2,#F25FD0)", boxShadow: "0 12px 40px -12px rgba(47,226,240,0.6)" }}
                  >
                    <span aria-hidden className="absolute top-0 bottom-0 w-1/3 bg-white/30 blur-md" style={{ animation: "ps-sheen 4.5s ease-in-out infinite" }} />
                    <GitHubMark />
                    <span className="relative">View on GitHub</span>
                    <span className="relative transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                  </a>
                  <a href="#use-it" className="inline-flex items-center gap-2 rounded-full border border-white/15 text-white/85 font-manrope font-medium text-sm px-6 py-3 hover:border-[#2FE2F0]/50 hover:bg-white/[0.03] transition-colors">
                    See how to use it <span>↓</span>
                  </a>
                </div>
              </Reveal>

              {/* quickstart, right under the hero */}
              <Reveal delay={0.3} className="w-full max-w-xl">
                <p className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">Get running in under a minute</p>
                <CopyCommand
                  label="Quickstart"
                  lines={[
                    { text: "git clone https://github.com/Sumandebnath943/pentashell-cli" },
                    { text: "cd pentashell-cli && pip install -r requirements.txt" },
                    { text: "pip install -e ." },
                    { text: 'pentacmd "undo my last commit"' },
                  ]}
                  copyText={'git clone https://github.com/Sumandebnath943/pentashell-cli\ncd pentashell-cli && pip install -r requirements.txt\npip install -e .\npentacmd "undo my last commit"'}
                />
              </Reveal>
            </div>
          </section>

          {/* ════════════ FULL-WIDTH 21:9 PRODUCT IMAGE ════════════ */}
          <section className="relative w-full mt-6 mb-2">
            <Reveal y={40}>
              <div className="relative w-full">
                <span aria-hidden className="absolute -inset-x-2 top-0 h-px z-10" style={{ background: "linear-gradient(90deg, transparent, #2FE2F0, #F25FD0, transparent)" }} />
                <Image
                  src="/pentashell/pentashell (2).png"
                  alt="The Pentashell REPL — families, modes, the safety gate, and a sample session, on the neon command-line interface"
                  width={1915}
                  height={821}
                  priority
                  className="w-full h-auto"
                />
                {/* blend the cinematic edges into the page */}
                <div aria-hidden className="absolute inset-x-0 top-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to bottom, #05060e, transparent)" }} />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to top, #05060e, transparent)" }} />
                <div aria-hidden className="absolute inset-y-0 left-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to right, #05060e, transparent)" }} />
                <div aria-hidden className="absolute inset-y-0 right-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to left, #05060e, transparent)" }} />
              </div>
            </Reveal>
            <p className="font-dmmono text-[11px] text-white/30 text-center mt-4 px-6">
              The real interface — no mockup. <span style={gCyan}>Pentashell v0.2.0</span>, powered by PentaCMD-47M.
            </p>
          </section>

          <div className="mt-8"><Reveal><Marquee /></Reveal></div>

          {/* ════════════════ 01 · WATCH IT THINK ════════════════ */}
          <section className="px-6 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <SectionLabel index="01" kicker="live · verified examples only" />
                <h2 className="font-manrope font-bold text-[2rem] md:text-[3rem] leading-[1.07] tracking-[-0.03em] mb-5">
                  <span style={gWhite}>Watch it</span>{" "}<span className="font-serif italic font-normal" style={gBrand}>think.</span>
                </h2>
                <p className="font-manrope text-[15px] text-white/45 leading-relaxed max-w-2xl mb-10">
                  Type what you want. Pentashell names the family it detected, suggests one command,
                  then stops at the approval gate. Every pair below is a real example run locally on CPU.
                </p>
              </Reveal>
              <Reveal delay={0.08} y={34}><PromptToCommand /></Reveal>
            </div>
          </section>

          {/* ════════════════ 02 · HOW IT THINKS ════════════════ */}
          <section className="px-6 py-20 md:py-28 border-t border-white/[0.05]">
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionLabel index="02" kicker="one shared path" />
                <h2 className="font-manrope font-bold text-[2rem] md:text-[3rem] leading-[1.07] tracking-[-0.03em] mb-5">
                  <span style={gWhite}>How it</span>{" "}<span className="font-serif italic font-normal" style={gCyan}>thinks.</span>
                </h2>
                <p className="font-manrope text-[15px] text-white/45 leading-relaxed max-w-2xl mb-12">
                  Every instruction travels the same six steps — and the single most important detail is
                  the prompt format with <span className="text-white/75">no trailing space</span> after
                  the command marker (a trailing space made the model drop the first word).
                </p>
              </Reveal>
              <Pipeline />
            </div>
          </section>

          {/* ════════════════ 03 · THE SAFETY MODEL ════════════════ */}
          <section className="relative px-6 py-24 md:py-32 overflow-hidden border-t border-white/[0.05]" style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(242,95,208,0.06), transparent 60%)" }}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <Reveal>
                  <span className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#F25FD0]/70">{"// the most important part"}</span>
                  <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.2rem] leading-[1.06] tracking-[-0.03em] mt-5 mb-5">
                    <span style={gWhite}>Nothing runs without</span>{" "}<span className="font-serif italic font-normal" style={gBrand}>your yes.</span>
                  </h2>
                  <p className="font-manrope text-[15px] text-white/45 leading-relaxed">
                    A model that can be wrong must never run a command you didn&rsquo;t approve — and must be
                    extra careful with anything destructive. Two gates enforce it.
                  </p>
                </Reveal>
              </div>

              <SafetyGates />

              {/* verified test badge */}
              <Reveal delay={0.1}>
                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  {[
                    { big: 10, suf: " / 10", label: "dangerous commands caught", sub: "in the detector's unit tests", c: "#FF4D6D", dec: 0, icon: "M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z M9 12l2 2 4-4" },
                    { big: 0, suf: " / 7", label: "false positives in tests", sub: "safe commands never flagged", c: "#36E0A0", dec: 0, icon: "M12 3a9 9 0 100 18 9 9 0 000-18z M12 7v5 M12 16h.01" },
                    { big: 5, suf: "", label: "command families covered", sub: "bash · git · npm · python · powershell", c: "#2FE2F0", dec: 0, icon: "M12 3l9 5-9 5-9-5 9-5z M3 12l9 5 9-5 M3 16l9 5 9-5" },
                  ].map((s) => (
                    <div key={s.label} className="ps-card group relative rounded-2xl border border-white/[0.08] bg-[#0a0c16]/60 p-7 text-center overflow-hidden">
                      <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${s.c}, transparent)` }} />
                      <span aria-hidden className="absolute left-1/2 -translate-x-1/2 top-10 w-40 h-40 rounded-full blur-[60px] opacity-25 group-hover:opacity-45 transition-opacity pointer-events-none" style={{ background: s.c }} />
                      <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke={s.c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="absolute -right-3 -bottom-3 w-24 h-24 opacity-[0.06]"><path d={s.icon} /></svg>
                      <div className="relative">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${s.c}14`, border: `1px solid ${s.c}40`, boxShadow: `0 0 26px -6px ${s.c}` }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={s.c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                        </div>
                        <p className="font-manrope font-extrabold text-[2.8rem] leading-none" style={{ color: s.c, textShadow: `0 0 30px ${s.c}55` }}>
                          <StatNumber value={s.big} decimals={s.dec} suffix={s.suf} />
                        </p>
                        <p className="font-manrope font-medium text-[13px] text-white/75 mt-3">{s.label}</p>
                        <p className="font-dmmono text-[10.5px] text-white/35 mt-1">{s.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-dmmono text-[11px] text-white/30 text-center mt-5">
                  Safe commands like <span className="text-white/55">npm install</span>, <span className="text-white/55">git add</span> and <span className="text-white/55">Format-Table</span> are correctly never flagged.
                </p>
              </Reveal>
            </div>
          </section>

          {/* ════════════════ 04 · FIVE FAMILIES ════════════════ */}
          <section className="px-6 py-24 md:py-32 border-t border-white/[0.05]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <Reveal>
                  <SectionLabel index="04" kicker="transparent auto-detection" center />
                  <h2 className="font-manrope font-bold text-[2rem] md:text-[3rem] leading-[1.07] tracking-[-0.03em] mb-5 text-center">
                    <span style={gWhite}>Five families,</span>{" "}<span className="font-serif italic font-normal" style={gCyan}>one guess you can trust.</span>
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.06}><FamilyExplorer /></Reveal>
            </div>
          </section>

          {/* ════════════════ 05 · THE MODEL UNDER THE HOOD ════════════════ */}
          <section className="relative px-6 py-24 md:py-32 overflow-hidden border-t border-white/[0.05]" style={{ background: "radial-gradient(120% 80% at 50% 100%, rgba(155,107,242,0.08), transparent 62%)" }}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <Reveal>
                    <SectionLabel index="05" kicker="the engine inside" />
                    <h2 className="font-manrope font-bold text-[2rem] md:text-[3rem] leading-[1.07] tracking-[-0.03em] mb-5">
                      <span style={gWhite}>The model under</span>{" "}<span className="font-serif italic font-normal" style={gBrand}>the hood.</span>
                    </h2>
                    <p className="font-manrope text-[15px] text-white/50 leading-relaxed mb-6">
                      Pentashell is the tool. <span className="text-white/85">PentaCMD-47M</span> is the
                      model it wraps — a decoder-only transformer trained from scratch on a 16 GB-RAM,
                      no-GPU laptop. The weights travel with the package, so the CLI stays self-contained.
                    </p>
                    <a
                      href={MODEL_PAGE}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-2.5 font-manrope font-medium text-sm text-white/90 hover:border-[#9B6BF2]/60 hover:bg-white/[0.03] transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: "#9B6BF2", boxShadow: "0 0 10px #9B6BF2" }} />
                      Meet PentaCMD-47M, the SLM
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </a>
                  </Reveal>
                </div>

                <Reveal delay={0.1}>
                  <div className="grid grid-cols-2 gap-3.5">
                    {MODEL_SPECS.map((s) => (
                      <div key={s.label} className="ps-card group relative rounded-2xl border border-white/[0.08] bg-[#0a0c16]/60 p-5 overflow-hidden">
                        <span aria-hidden className="absolute inset-x-0 top-0 h-px opacity-60" style={{ background: "linear-gradient(90deg, transparent, #2FE2F0, transparent)" }} />
                        <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="#2FE2F0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="absolute -right-2 -bottom-3 w-16 h-16 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity"><path d={s.icon} /></svg>
                        <div className="relative flex items-start justify-between gap-2">
                          <p className="font-dmmono text-[10px] uppercase tracking-[0.16em] text-white/35 pt-1">{s.label}</p>
                          <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(47,226,240,0.1)", border: "1px solid rgba(47,226,240,0.3)" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2FE2F0" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                          </span>
                        </div>
                        <p className="relative font-manrope font-bold text-[1.4rem] mt-2.5" style={gCyan}>{s.value}</p>
                        {s.note && <p className="relative font-dmmono text-[10.5px] text-white/30 mt-1">{s.note}</p>}
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ════════════════ 06 · HOW IT WAS BUILT ════════════════ */}
          <section className="px-6 py-24 md:py-32 border-t border-white/[0.05]">
            <div className="max-w-5xl mx-auto">
              <div className="mb-14 max-w-2xl">
                <Reveal>
                  <SectionLabel index="06" kicker="six tested increments" />
                  <h2 className="font-manrope font-bold text-[2rem] md:text-[3rem] leading-[1.07] tracking-[-0.03em] mb-5">
                    <span style={gWhite}>How it was built —</span>{" "}<span className="font-serif italic font-normal" style={gCyan}>and what each step taught.</span>
                  </h2>
                  <p className="font-manrope text-[15px] text-white/45 leading-relaxed">
                    Deliberately built in small, individually-tested steps. Each one earned its place — and
                    a real lesson came out of every increment.
                  </p>
                </Reveal>
              </div>

              <div className="relative">
                {/* vertical rail */}
                <span aria-hidden className="absolute left-[18px] md:left-1/2 top-2 bottom-2 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(47,226,240,0.4), rgba(242,95,208,0.4), transparent)" }} />
                <div className="space-y-5">
                  {BUILD_STEPS.map((s, i) => (
                    <Reveal key={s.n} delay={(i % 2) * 0.05}>
                      <div className={`relative pl-12 md:pl-0 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}>
                        <span aria-hidden className={`absolute top-5 w-3.5 h-3.5 rounded-full border-2 border-[#05060e] left-[11px] ${i % 2 ? "md:left-[-7px]" : "md:left-auto md:right-[-7px]"}`} style={{ background: i % 2 ? "#F25FD0" : "#2FE2F0", boxShadow: `0 0 12px ${i % 2 ? "#F25FD0" : "#2FE2F0"}` }} />
                        <div className="ps-card rounded-2xl border border-white/[0.08] bg-[#0a0c16]/60 p-6">
                          <div className={`flex items-center gap-3 mb-2 ${i % 2 ? "" : "md:justify-end"}`}>
                            <span className="font-dmmono text-[12px]" style={{ color: i % 2 ? "#F25FD0" : "#2FE2F0" }}>{s.n}</span>
                            <h3 className="font-manrope font-semibold text-white/90 text-[16px]">{s.title}</h3>
                          </div>
                          <p className="font-manrope text-[13.5px] text-white/50 leading-relaxed">{s.body}</p>
                          <p className="font-manrope text-[13px] text-white/40 leading-relaxed mt-3 pt-3 border-t border-white/[0.06]">
                            <span className="font-dmmono text-[10px] uppercase tracking-[0.16em]" style={{ color: i % 2 ? "#F25FD0" : "#2FE2F0" }}>Lesson · </span>
                            {s.lesson}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════ 07 · HONEST BY DESIGN ════════════════ */}
          <section className="px-6 py-24 md:py-32 border-t border-white/[0.05]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <Reveal>
                  <SectionLabel index="07" kicker="kept visible on purpose" center />
                  <h2 className="font-manrope font-bold text-[2rem] md:text-[3rem] leading-[1.07] tracking-[-0.03em] mb-5 text-center">
                    <span style={gWhite}>Honest by</span>{" "}<span className="font-serif italic font-normal" style={gBrand}>design.</span>
                  </h2>
                  <p className="font-manrope text-[15px] text-white/45 leading-relaxed">
                    No overselling. These limits shape correct use — and they are exactly why the approval
                    gate exists in the first place.
                  </p>
                </Reveal>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {LIMITATIONS.map((l, i) => (
                  <Reveal key={l.title} delay={(i % 2) * 0.06}>
                    <div className="ps-card rounded-2xl border border-white/[0.08] bg-[#0a0c16]/60 p-7 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center font-dmmono text-[12px]" style={{ border: "1px solid rgba(245,178,61,0.4)", color: "#F5B23D", background: "rgba(245,178,61,0.08)" }}>!</span>
                        <h3 className="font-manrope font-semibold text-white/90 text-[16px]">{l.title}</h3>
                      </div>
                      <p className="font-manrope text-[13.5px] text-white/50 leading-relaxed">{l.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════ 08 · USE IT ════════════════ */}
          <section id="use-it" className="px-6 py-24 md:py-32 border-t border-white/[0.05] scroll-mt-24">
            <div className="max-w-6xl mx-auto">
              <div className="mb-14 max-w-2xl">
                <Reveal>
                  <SectionLabel index="08" kicker="python ≥ 3.9 · local · no GPU" />
                  <h2 className="font-manrope font-bold text-[2rem] md:text-[3rem] leading-[1.07] tracking-[-0.03em] mb-5">
                    <span style={gWhite}>Use it.</span>
                  </h2>
                  <p className="font-manrope text-[15px] text-white/45 leading-relaxed">
                    Clone, install the editable package, and the <span className="text-white/80 font-dmmono text-[13px]">pentacmd</span> command
                    works from any terminal, in any folder.
                  </p>
                </Reveal>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 items-start mb-6">
                <Reveal>
                  <CopyCommand
                    label="Install"
                    lines={[
                      { kind: "comment", text: "# weights ship with the repo via Git LFS" },
                      { text: "git clone https://github.com/Sumandebnath943/pentashell-cli" },
                      { text: "cd pentashell-cli" },
                      { text: "pip install -r requirements.txt" },
                      { text: "pip install -e ." },
                    ]}
                    copyText={"git clone https://github.com/Sumandebnath943/pentashell-cli\ncd pentashell-cli\npip install -r requirements.txt\npip install -e ."}
                  />
                </Reveal>
                <Reveal delay={0.06}>
                  <CopyCommand
                    label="Run it"
                    lines={[
                      { kind: "comment", text: "# interactive — model loads once, then instant" },
                      { text: "pentacmd" },
                      { kind: "comment", text: "# one-shot — family auto-detected" },
                      { text: 'pentacmd "make a virtual environment with venv"' },
                      { kind: "out", text: "→ python -m venv venv" },
                      { kind: "comment", text: "# print only, never run" },
                      { text: 'pentacmd -n "install the requests package with pip"' },
                    ]}
                    copyText={'pentacmd\npentacmd "make a virtual environment with venv"\npentacmd -n "install the requests package with pip"'}
                  />
                </Reveal>
              </div>

              <Reveal delay={0.06}>
                <div className="rounded-2xl border border-white/[0.08] bg-[#0a0c16]/60 p-6">
                  <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#2FE2F0] mb-5">Command reference</p>
                  <ul className="font-dmmono text-[12.5px] space-y-3">
                    {CLI_OPTIONS.map(([cmd, desc]) => (
                      <li key={cmd} className="grid sm:grid-cols-[minmax(0,16rem)_1fr] gap-x-4 gap-y-0.5 items-baseline border-b border-white/[0.05] pb-3 last:border-0 last:pb-0">
                        <span style={{ color: "#7DEFF7" }} className="break-all">{cmd}</span>
                        <span className="text-white/40 font-manrope text-[12.5px]">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="font-manrope text-[12.5px] text-white/35 mt-5 leading-relaxed max-w-3xl">
                  Prefer not to clone the 180 MB weights? They&rsquo;re also published as a separate
                  release asset / Hugging Face download — point the CLI at them and skip the LFS pull.
                  Built on torch (CPU), tokenizers and rich.
                </p>
              </Reveal>

              {/* tech stack */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                {STACK.map((t, i) => (
                  <Reveal key={t.name} delay={(i % 3) * 0.05}>
                    <div className="ps-card rounded-xl border border-white/[0.07] bg-[#0a0c16]/50 p-5 h-full">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }} />
                        <span className="font-manrope font-semibold text-[13.5px] text-white/85">{t.name}</span>
                      </div>
                      <p className="font-manrope text-[12px] text-white/40 leading-relaxed pl-[18px]">{t.role}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════ CLOSING CTA ════════════════ */}
          <section className="px-6 pt-12 pb-32">
            <div className="max-w-5xl mx-auto">
              <Reveal y={30}>
                <div className="relative rounded-[2rem] border border-white/[0.1] overflow-hidden" style={{ background: "linear-gradient(180deg,#0a0c1a,#070810)" }}>
                  <div aria-hidden className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-full blur-[110px]" style={{ background: "radial-gradient(ellipse at center, rgba(47,226,240,0.16), transparent 65%)", animation: "ps-drift 17s ease-in-out infinite" }} />
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #2FE2F0, #F25FD0, transparent)" }} />
                  <div className="relative p-9 sm:p-14 text-center">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">open source · MIT · built from scratch</p>
                    <h2 className="font-manrope font-extrabold text-[2.2rem] md:text-[3.4rem] leading-[1.05] tracking-[-0.04em] mb-4">
                      <span style={gWhite}>One instruction. One command.</span><br />
                      <span className="font-serif italic font-normal" style={gBrand}>Your approval.</span>
                    </h2>
                    <p className="font-manrope text-[15px] text-white/45 max-w-lg mx-auto mb-9 leading-relaxed">
                      Clone the repo, install with pip, and ask in plain English. Read every command before
                      you approve — that&rsquo;s the whole point.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a
                        href={GITHUB}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-manrope font-semibold text-sm text-black overflow-hidden"
                        style={{ background: "linear-gradient(100deg,#2FE2F0,#9B6BF2,#F25FD0)", boxShadow: "0 14px 44px -12px rgba(242,95,208,0.6)" }}
                      >
                        <span aria-hidden className="absolute top-0 bottom-0 w-1/3 bg-white/30 blur-md" style={{ animation: "ps-sheen 4.5s ease-in-out infinite" }} />
                        <GitHubMark />
                        <span className="relative">github.com/Sumandebnath943/pentashell-cli</span>
                        <span className="relative transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                      </a>
                      <a href={MODEL_PAGE} className="inline-flex items-center gap-2 rounded-full border border-white/15 text-white/85 font-manrope font-medium text-sm px-6 py-3.5 hover:border-[#9B6BF2]/60 hover:bg-white/[0.03] transition-colors">
                        Meet the model <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
              <p className="font-dmmono text-[11px] text-white/30 text-center mt-10 tracking-wide">
                Pentashell · the default CLI for PentaCMD-47M · MIT · built from scratch by Suman Debnath
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </MotionProvider>
  );
}
