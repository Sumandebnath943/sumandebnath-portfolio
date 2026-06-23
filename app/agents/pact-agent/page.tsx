import type { Metadata } from "next";
import Image from "next/image";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Reveal, LiveToolbar, CopyCommand } from "@/components/pact/PactWidgets";
import {
  Brackets,
  PageFrame,
  Marquee,
  Typewriter,
  Pipeline,
  VerdictCycle,
  ActionConsole,
  LoopTerminal,
  InlineCopy,
} from "@/components/pact/PactVisuals";

const GITHUB = "https://github.com/Sumandebnath943/pact-agent";

export const metadata: Metadata = {
  title: "PACT Agent · Trust-First Local CLI Coding Agent",
  description:
    "PACT is a trust-first, local CLI coding agent by House of Namus. It shows a permission contract before it touches anything, executes only what you approve in a sandbox, journals every effect, then runs an independent verifier that can say no.",
  alternates: { canonical: "/agents/pact-agent" },
  openGraph: {
    title: "PACT Agent · Trust-First Local CLI Coding Agent",
    description:
      "Permission. Action. Cost. Trust. A local coding agent built on earned trust — permission contracts, sandboxed execution, honest cost, and independent verification.",
    url: "/agents/pact-agent",
    images: [{ url: "/pact-images/pact-trust-banner.png", width: 1915, height: 821, alt: "PACT — Built on trust. Designed for control." }],
  },
};

/* ── GitHub glyph ──────────────────────────────────────────────────────── */
function GitHubMark({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

/* ── Section heading — code-editor / HUD style ─────────────────────────── */
function SectionLabel({ index, title, kicker }: { index: string; title: string; kicker?: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-dmmono text-[11px] text-[#CF5C36] border border-[#CF5C36]/40 rounded px-1.5 py-0.5 leading-none">
          [ {index} ]
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#CF5C36]" style={{ animation: "pact-blink 1.3s steps(1) infinite" }} />
        {kicker && (
          <span className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#9a8e86]">// {kicker}</span>
        )}
      </div>
      <div className="flex items-end gap-5">
        <h2 className="font-manrope font-semibold text-3xl md:text-[2.4rem] leading-none tracking-tight text-[#f0e9e3] whitespace-nowrap">
          {title}
        </h2>
        <span
          className="flex-1 mb-1.5 h-px hidden sm:block"
          style={{ background: "repeating-linear-gradient(90deg, rgba(207,92,54,0.45) 0 6px, transparent 6px 13px)" }}
        />
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function PactAgentPage() {
  return (
    <MotionProvider>
      <Navigation />
      <PageFrame />

      <main className="relative bg-[#0a0807] text-[#e8e0da] min-h-screen overflow-hidden selection:bg-[#CF5C36] selection:text-black">
        {/* ── Ambient background ── */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div
            className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] rounded-full opacity-50 blur-[120px] bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.22),transparent_60%)]"
            style={{ animation: "pact-drift 18s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[50vh] rounded-full opacity-40 blur-[120px] bg-[radial-gradient(ellipse_at_center,rgba(207,92,54,0.16),transparent_65%)]"
            style={{ animation: "pact-drift 22s ease-in-out infinite reverse" }}
          />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(207,92,54,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(207,92,54,0.6) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black, transparent 75%)",
            }}
          />
          <div className="hero-grain absolute inset-0 opacity-[0.04]" />
        </div>

        <div className="relative z-10">
          {/* ════════════════════ HERO ════════════════════ */}
          <section className="pt-36 md:pt-44 pb-12 px-6 md:px-14">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 font-dmmono text-[11px] uppercase tracking-[0.25em] text-[#d8b3a3] mb-10">
                  <span className="text-[#CF5C36]">┌─</span>
                  <span>Trust-first local CLI coding agent</span>
                  <span className="text-[#CF5C36]">─┐</span>
                </div>
              </Reveal>

              {/* Transparent landscape logo */}
              <Reveal delay={0.05}>
                <h1 className="mb-7 w-full">
                  <span className="sr-only">PACT Agent — Permission, Action, Cost, Trust</span>
                  <Image
                    src="/pact-images/pact-logo.png"
                    alt="PACT AGENT"
                    width={1352}
                    height={257}
                    priority
                    className="w-full max-w-[780px] h-auto mx-auto drop-shadow-[0_0_50px_rgba(255,85,0,0.28)]"
                  />
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="font-dmmono text-[13px] md:text-sm tracking-[0.42em] uppercase text-[#CF5C36] mb-8">
                  Permission · Action · Cost · Trust
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="font-manrope text-lg md:text-xl leading-relaxed text-[#c9bdb4] max-w-2xl mb-9">
                  A local coding agent that shows you a{" "}
                  <span className="text-[#f0e9e3]">permission contract</span> before it touches
                  anything, executes only what you approve in a sandbox, journals every effect, then
                  runs an <span className="text-[#f0e9e3]">independent verifier</span> that is allowed
                  to say no.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#CF5C36] text-black font-manrope font-semibold text-sm px-6 py-3 hover:bg-[#FF5500] transition-colors duration-300"
                  >
                    <GitHubMark />
                    View on GitHub
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                  </a>
                  <a
                    href="#get-started"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 text-[#e8e0da] font-manrope font-medium text-sm px-6 py-3 hover:border-[#CF5C36]/50 hover:bg-white/[0.03] transition-colors duration-300"
                  >
                    See how to use it <span>↓</span>
                  </a>
                </div>
              </Reveal>

              {/* Run command — install & run, right under the hero */}
              <Reveal delay={0.3} className="w-full max-w-xl">
                <p className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#6f6760] mb-3">
                  Get running in 30 seconds
                </p>
                <CopyCommand
                  label="Quickstart"
                  lines={[
                    { text: "git clone https://github.com/Sumandebnath943/pact-agent" },
                    { text: "cd pact-agent && pipx install ." },
                    { text: "pact init" },
                    { text: "pact run \"create hello.txt with a greeting\"" },
                  ]}
                  copyText={
                    'git clone https://github.com/Sumandebnath943/pact-agent\ncd pact-agent && pipx install .\npact init\npact run "create hello.txt with a greeting"'
                  }
                />
              </Reveal>
            </div>

            {/* Live REPL masthead window */}
            <Reveal delay={0.36} className="max-w-3xl mx-auto mt-16">
              <Brackets className="p-2">
                <div className="rounded-2xl border border-[#CF5C36]/25 bg-[#0d0a08]/90 backdrop-blur-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#CF5C36]/80" />
                      <span className="w-3 h-3 rounded-full bg-[#D6A23B]/70" />
                      <span className="w-3 h-3 rounded-full bg-[#4F9B5C]/70" />
                    </div>
                    <span className="font-dmmono text-[11px] text-[#9a8e86]">pact — interactive session</span>
                    <span className="w-12" />
                  </div>

                  <div className="p-5 md:p-7 text-left">
                    <div className="relative rounded-xl border border-[#CF5C36]/30 bg-[#100c0a]/70 px-5 pt-6 pb-5">
                      <span className="absolute -top-[10px] left-5 px-2 font-dmmono text-[11px] tracking-[0.25em] uppercase text-[#CF5C36] bg-[#0d0a08]">
                        PACT
                      </span>
                      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-dmmono text-[12.5px] sm:text-[13px]">
                        {[
                          ["Sandbox", "D:\\project\\agent"],
                          ["Planner", "openrouter / anthropic/claude-haiku-4-5"],
                          ["Escalates to", "openrouter / anthropic/claude-sonnet-4-6"],
                          ["Verifier", "openrouter / anthropic/claude-haiku-4-5"],
                          ["Budget", "$0.0000 today / $2.0000 daily"],
                        ].map(([k, v]) => (
                          <div key={k} className="contents">
                            <dt className="text-[#d8b3a3] font-medium">{k}</dt>
                            <dd className="text-[#c9bdb4] break-all">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <p className="font-dmmono text-[11.5px] text-[#6f6760] mt-5">
                      Interactive session. Type a task, or /help for commands. Ctrl+D to exit.
                    </p>
                    <p className="font-dmmono text-[13px] mt-3 flex items-center flex-wrap">
                      <span className="text-[#CF5C36] font-medium">pact&gt;&nbsp;</span>
                      <Typewriter
                        className="text-[#e8e0da]"
                        phrases={[
                          'run "refactor the auth module and add tests"',
                          'run "rename getUser to fetchUser across the repo"',
                          '/delegate "migrate config to TOML, then update docs"',
                          'skill save "tidy imports"',
                        ]}
                      />
                    </p>
                  </div>

                  <div className="px-4 py-2.5 border-t border-white/[0.06] bg-[#0b0807]">
                    <LiveToolbar />
                  </div>
                </div>
              </Brackets>
            </Reveal>
          </section>

          {/* ── Brand ticker ── */}
          <Reveal>
            <Marquee
              items={[
                "Permission",
                "Action",
                "Cost",
                "Trust",
                "Trust-first",
                "Independent verification",
                "Honest cost",
                "Local & private",
                "Fails closed",
                "Bring your own model",
              ]}
            />
          </Reveal>

          {/* ════════════════════ STANCE ════════════════════ */}
          <section className="px-6 md:px-14 py-20 md:py-28">
            <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 md:gap-14 items-stretch">
              <Reveal className="md:col-span-7 flex flex-col justify-center">
                <p className="font-dmmono text-[11px] uppercase tracking-[0.3em] text-[#CF5C36] mb-6">
                  // the stance
                </p>
                <h2 className="font-manrope font-semibold text-3xl md:text-[2.6rem] leading-[1.14] tracking-tight text-[#f0e9e3]">
                  Most AI agents are{" "}
                  <span className="font-serif italic font-normal text-[#9a8e86]">optimistic narrators</span>{" "}
                  — they declare success whether or not it happened.
                </h2>
                <p className="font-manrope text-lg text-[#c9bdb4] leading-relaxed mt-8 max-w-xl">
                  PACT is built on the opposite stance:{" "}
                  <span className="text-[#FF7A45] font-medium">earned trust, not assumed trust.</span>{" "}
                  Nothing runs without an explicit, itemized contract you approve. A separate model
                  re-checks the result against recorded evidence — and is designed to push back when
                  reality diverges.
                </p>
              </Reveal>

              {/* Solid PACT-orange panel */}
              <Reveal delay={0.1} className="md:col-span-5">
                <div className="relative h-full rounded-2xl bg-[#CF5C36] overflow-hidden shadow-[0_24px_60px_-24px_rgba(207,92,54,0.7)]">
                  {/* sheen sweep */}
                  <span
                    aria-hidden
                    className="absolute top-0 bottom-0 w-1/3 bg-white/15 blur-md"
                    style={{ animation: "pact-shimmer 5.5s ease-in-out infinite" }}
                  />
                  <div className="relative p-7">
                    <p className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-black/55 mb-5">
                      why it&rsquo;s different
                    </p>
                    <ul className="flex flex-col divide-y divide-black/15">
                      {[
                        ["No silent edits", "Every action is approved per-step before it runs — y / n / a."],
                        ["A verifier that can say no", "Judges the actual evidence, not the plan's optimism."],
                        ["Honest cost", "Unknown cost shows as unknown — never a misleading $0.00."],
                        ["Local & private", "Runs on your machine; keys read from your environment only."],
                      ].map(([t, d]) => (
                        <li key={t} className="py-4 first:pt-0 last:pb-0">
                          <p className="font-manrope font-bold text-black text-[15px]">{t}</p>
                          <p className="font-manrope text-sm text-black/70 mt-1 leading-relaxed">{d}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ CORE LOOP ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="01" title="The core loop" kicker="one shared pipeline" />
              <Reveal>
                <p className="font-manrope text-base md:text-lg text-[#9a8e86] max-w-2xl mb-12 leading-relaxed">
                  Every task — typed at the prompt or passed to{" "}
                  <code className="font-dmmono text-[#d8b3a3]">pact run</code> — flows through one
                  engine. There is exactly one implementation; both entry points share it.
                </p>
              </Reveal>

              <Reveal delay={0.05}>
                <Pipeline />
              </Reveal>

              <Reveal delay={0.1}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 font-manrope">
                  {[
                    ["plan", "Concrete file / shell actions to perform.", "#CF5C36"],
                    ["answer", "A pure question — no filesystem change, skips the contract entirely.", "#D6A23B"],
                    ["read", "Needs the actual file contents first, then re-plans (reads stay in the sandbox).", "#FF7A45"],
                    ["delegate", "Splits into independent subagents, each run through the full pipeline.", "#4F9B5C"],
                  ].map(([mode, d, color]) => (
                    <div
                      key={mode}
                      className="rounded-xl border-l-2 border border-white/[0.07] bg-[#0d0a08]/50 p-5 hover:bg-[#120d0b] transition-colors"
                      style={{ borderLeftColor: color as string }}
                    >
                      <p className="font-dmmono text-[13px] mb-2" style={{ color: color as string }}>{mode}</p>
                      <p className="text-sm text-[#9a8e86] leading-relaxed">{d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-manrope text-sm text-[#6f6760] mt-6 max-w-2xl leading-relaxed">
                  Mode exclusivity is enforced in PACT&rsquo;s own code — never by trusting the
                  model&rsquo;s self-declared mode. An &quot;answer&quot; carrying hidden steps is
                  rejected, so an unapproved action can never slip through.
                </p>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ CONTRACT & VERDICT ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="02" title="The contract & the verdict" kicker="the two signature panels" />
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Permission contract */}
                <Reveal>
                  <Brackets className="h-full p-1.5">
                    <div className="relative h-full rounded-xl border border-[#CF5C36]/35 bg-[#100c0a]/80 px-5 sm:px-6 pt-7 pb-6 overflow-hidden">
                      <span
                        aria-hidden
                        className="absolute left-0 right-0 h-16 pointer-events-none bg-[linear-gradient(to_bottom,transparent,rgba(207,92,54,0.12),transparent)]"
                        style={{ animation: "pact-sweep 4.2s linear infinite" }}
                      />
                      <span className="absolute -top-[10px] left-5 px-2 font-dmmono text-[10.5px] tracking-[0.18em] uppercase text-[#CF5C36] bg-[#0a0807]">
                        Permission Contract — Awaiting Approval
                      </span>
                      <div className="relative font-dmmono text-[12.5px]">
                        <div className="grid grid-cols-[auto_1fr] gap-x-4 text-[#CF5C36] font-medium pb-2 mb-3 border-b border-white/[0.08]">
                          <span>RISK&nbsp;&nbsp;ACTION</span>
                          <span>TARGET · RATIONALE</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-start">
                          <span className="flex items-center gap-2">
                            <span className="inline-flex items-center font-dmmono text-[10.5px] font-medium px-2 py-0.5 rounded border text-[#4F9B5C] border-[#4F9B5C]/35 bg-[#4F9B5C]/10">
                              LOW
                            </span>
                            <span className="text-[#e8e0da]">file_write</span>
                          </span>
                          <span className="text-[#c9bdb4]">
                            hello.txt
                            <span className="text-[#6f6760]"> · create hello.txt with greeting</span>
                          </span>
                        </div>
                        <div className="mt-3 ml-1 pl-4 border-l border-white/[0.06] leading-relaxed">
                          <div className="text-[#6f6760]">--- hello.txt</div>
                          <div className="text-[#6f6760]">+++ hello.txt</div>
                          <div className="text-[#4F9B5C]">+hello world</div>
                        </div>
                        <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-1 text-[11.5px]">
                          <p className="text-[#6f6760]">Using 3 memory entries (view with /memory)</p>
                          <p className="text-[#9a8e86]">Planned by anthropic/claude-haiku-4-5</p>
                          <p className="text-[#e8e0da] font-medium">Estimated model cost: $0.0008</p>
                        </div>
                      </div>
                      <p className="relative font-dmmono text-[12.5px] text-[#d8b3a3] mt-5">
                        Approve file_write on hello.txt? <span className="text-[#9a8e86]">[y/n/a] (n):</span>
                        <span className="inline-block align-middle ml-1 w-[7px] h-[14px] bg-[#CF5C36]" style={{ animation: "pact-blink 0.9s steps(1) infinite" }} />
                      </p>
                    </div>
                  </Brackets>
                </Reveal>

                {/* Verifier — cycling verdicts */}
                <Reveal delay={0.1}>
                  <Brackets className="h-full p-1.5" color="#4F9B5C">
                    <VerdictCycle />
                  </Brackets>
                </Reveal>
              </div>
              <Reveal delay={0.15}>
                <p className="font-manrope text-sm text-[#6f6760] mt-6 max-w-3xl leading-relaxed">
                  The verifier receives only the recorded journal evidence — file before/after
                  snapshots, command output, exit codes — and returns a verdict with a confidence
                  percentage. It is intentionally single-model and untiered: you don&rsquo;t cheapen
                  the check that catches the planner&rsquo;s mistakes.
                </p>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ REAL INTERFACE ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="03" title="The real interface" kicker="no mockups" />
              <Reveal>
                <Brackets className="p-2">
                  <div className="rounded-3xl border border-white/[0.08] bg-[#0d0a08] p-2 sm:p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
                    <div className="rounded-[1.1rem] overflow-hidden border border-white/[0.05] relative aspect-[1672/941]">
                      <Image
                        src="/pact-images/pact-terminal.png"
                        alt="The PACT REPL: the PACT AGENT wordmark, status panel, available actions, and the Permission · Action · Cost · Trust pillars."
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 1100px"
                      />
                    </div>
                  </div>
                </Brackets>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="font-manrope text-sm text-[#6f6760] mt-5 text-center max-w-2xl mx-auto">
                  The actual REPL masthead — block-glyph wordmark, wax-seal emblem, two-column info
                  block, live status, and the eight registered actions across the file, shell, and
                  browser families.
                </p>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ BUILT ON TRUST ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="04" title="Built on trust" kicker="designed for control" />

              <Reveal>
                <div className="relative aspect-[1915/821] w-full mb-14 rounded-2xl overflow-hidden">
                  <Image
                    src="/pact-images/pact-trust-banner.png"
                    alt="Built on trust. Designed for control. PACT's six pillars: permission first, sandboxed execution, complete journal, independent verification, transparent cost, local & private."
                    fill
                    className="object-contain mix-blend-screen"
                    sizes="(max-width: 768px) 100vw, 1100px"
                  />
                </div>
              </Reveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  ["Permission first", "Every action is itemized in a permission contract. You approve y / n / a — nothing runs without your consent.", "M9 12l2 2 4-4 M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z", "#CF5C36"],
                  ["Sandboxed execution", "All operations resolve inside your project sandbox. Paths stay in bounds; the shell can't reach the network.", "M3 9h18M3 9v10a2 2 0 002 2h14a2 2 0 002-2V9M3 9l2-5h14l2 5", "#D6A23B"],
                  ["Complete journal", "Every change is recorded with before / after snapshots, output, and exit codes — which also powers undo.", "M4 4h12l4 4v12H4z M16 4v4h4 M8 12h8 M8 16h8", "#4F9B5C"],
                  ["Independent verification", "A separate verifier model checks the actual evidence and can return CONFIRMED, CONTRADICTED, or INCONCLUSIVE.", "M11 4a7 7 0 100 14 7 7 0 000-14z M21 21l-5-5", "#FF7A45"],
                  ["Transparent cost", "Real-time token and cost tracking. Unpriced models surface as \"unrecorded\" — never a misleading $0.00.", "M12 2v20 M17 6.5c0-2-2.2-3-5-3s-5 .8-5 3 2.2 2.7 5 3 5 1.2 5 3-2.2 3-5 3-5-1-5-3", "#D6A23B"],
                  ["Local & private", "Runs on your machine, in your project. API keys come from your environment only — never stored, never committed.", "M6 10V8a6 6 0 1112 0v2 M5 10h14v10H5z M12 14v3", "#4F9B5C"],
                ].map(([title, body, path, accent], i) => (
                  <Reveal key={title as string} delay={(i % 3) * 0.06}>
                    <div className="group relative h-full rounded-2xl border border-white/[0.08] bg-[#0d0a08]/60 p-6 hover:bg-[#120d0b] transition-colors duration-300 overflow-hidden">
                      <div className="relative w-12 h-12 mb-5">
                        {/* slow conic accent ring */}
                        <span
                          aria-hidden
                          className="absolute -inset-1.5 rounded-2xl opacity-40 group-hover:opacity-90 transition-opacity"
                          style={{ background: `conic-gradient(from 0deg, transparent, ${accent}, transparent 75%)`, animation: "pact-spin 7s linear infinite" }}
                        />
                        <span aria-hidden className="absolute inset-0 rounded-xl bg-[#0d0a08]" />
                        <div className="relative w-12 h-12 rounded-xl flex items-center justify-center border" style={{ borderColor: `${accent}55`, background: `${accent}14` }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent as string} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                            <path d={path as string} />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-manrope font-semibold text-[#f0e9e3] text-lg mb-2">{title}</h3>
                      <p className="font-manrope text-sm text-[#9a8e86] leading-relaxed">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════ CAPABILITIES ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="05" title="What it can do" kicker="full inventory" />
              <div className="grid lg:grid-cols-12 gap-6">
                <Reveal className="lg:col-span-5">
                  <Brackets className="h-full p-1.5">
                    <div className="relative h-full rounded-xl border border-[#CF5C36]/30 bg-[#100c0a]/70 px-5 sm:px-6 pt-7 pb-6">
                      <span className="absolute -top-[10px] left-5 px-2 font-dmmono text-[10.5px] tracking-[0.18em] uppercase text-[#CF5C36] bg-[#0a0807]">
                        Available Actions (8)
                      </span>
                      <ActionConsole />
                      <p className="font-manrope text-sm text-[#9a8e86] mt-6 leading-relaxed">
                        Shell runs as an argv array only — never a raw shell string. Network-capable
                        programs and URL-bearing arguments are blocked. Browser navigation needs a host
                        you&rsquo;ve explicitly allow-listed; sensitive actions always re-prompt.
                      </p>
                      <p className="font-dmmono text-[11.5px] text-[#B33A3A] mt-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B33A3A]" style={{ animation: "pact-blink 1s steps(1) infinite" }} />
                        Dangerous patterns (rm -rf, sudo, chmod 777, curl | bash) escalate to HIGH risk.
                      </p>
                    </div>
                  </Brackets>
                </Reveal>

                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                  {[
                    ["The Governor", "A daily USD budget cap, enforced before each call, with live price refresh from OpenRouter.", "#D6A23B"],
                    ["Cost-aware routing", "Cheap planner first; escalates to a stronger model only on a real signal — and always discloses the switch.", "#FF7A45"],
                    ["Project memory", "Durable facts and conventions in local SQLite, injected into the planner — pinnable to always apply.", "#CF5C36"],
                    ["Scope-locked skills", "Save an approved task as a skill. Re-runs re-plan and must match the approved scope, or fail closed — zero actions.", "#4F9B5C"],
                    ["Delegation", "A task fans out into independent subagents (bounded concurrency); subagents can't further delegate.", "#FF7A45"],
                    ["Undo + doctor", "Reverse any journaled file action from its snapshot. A doctor command health-checks the install.", "#CF5C36"],
                  ].map(([t, d, accent], i) => (
                    <Reveal key={t as string} delay={(i % 2) * 0.05}>
                      <div className="group h-full rounded-2xl border border-white/[0.08] bg-[#0d0a08]/60 p-5 hover:border-white/[0.14] transition-colors relative overflow-hidden">
                        <span aria-hidden className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: accent as string }} />
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent as string, animation: `pact-blink ${1 + (i % 3) * 0.3}s steps(1) infinite` }} />
                          <p className="font-manrope font-semibold text-[#f0e9e3] text-[15px]">{t}</p>
                        </div>
                        <p className="font-manrope text-sm text-[#9a8e86] leading-relaxed">{d}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <Reveal delay={0.1}>
                <p className="font-manrope text-sm text-[#6f6760] mt-6 max-w-3xl leading-relaxed">
                  Optional surfaces: voice input (transcribe an audio file into a task), desktop
                  notifications on unattended skill outcomes, and a copy-pasteable scheduling command —
                  PACT runs no daemon of its own.
                </p>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ GET STARTED ════════════════════ */}
          <section id="get-started" className="px-6 md:px-14 py-16 md:py-20 scroll-mt-24">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="06" title="Use it" kicker="python ≥ 3.11 · cross-platform" />

              <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-8">
                {/* live auto-running terminal */}
                <Reveal className="lg:col-span-6">
                  <LoopTerminal />
                </Reveal>

                {/* steps */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                  {[
                    ["01", "Clone & install", "Grab the repo and install the pact command with pipx.", "git clone …/pact-agent · pipx install ."],
                    ["02", "Initialize", "Set up .pact/ inside the project you want PACT to work in.", "cd your-project · pact init"],
                    ["03", "Run a task", "Describe a task; approve the contract; read the verdict.", 'pact run "…"'],
                    ["04", "Bring your own model", "Point any role at OpenRouter or a local Ollama endpoint.", "cp .env.example .env"],
                  ].map(([n, t, d, code], i) => (
                    <Reveal key={n as string} delay={i * 0.05}>
                      <div className="group flex gap-4 rounded-2xl border border-white/[0.08] bg-[#0d0a08]/50 p-5 hover:border-[#CF5C36]/40 transition-colors">
                        <span className="font-dmmono text-2xl font-medium text-[#CF5C36]/40 group-hover:text-[#CF5C36] transition-colors leading-none">{n}</span>
                        <div>
                          <p className="font-manrope font-semibold text-[#f0e9e3] text-[15px]">{t}</p>
                          <p className="font-manrope text-sm text-[#9a8e86] mt-1 leading-relaxed">{d}</p>
                          <p className="font-dmmono text-[11.5px] text-[#d8b3a3] mt-2">{code}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal delay={0.06}>
                <div className="mb-12">
                  <CopyCommand
                    label="Bring your own model (OpenRouter or local Ollama)"
                    lines={[
                      { kind: "comment", text: "# .env is git-ignored and never committed" },
                      { text: "cp .env.example .env" },
                      { kind: "comment", text: "# then set OPENROUTER_API_KEY=…  (or point any role at a local OpenAI-compatible endpoint)" },
                    ]}
                    copyText={"cp .env.example .env"}
                  />
                </div>
              </Reveal>

              <div className="grid lg:grid-cols-2 gap-6">
                <Reveal>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#0d0a08]/60 p-6 h-full">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#CF5C36] mb-5">CLI commands</p>
                    <ul className="font-dmmono text-[12.5px] space-y-2.5">
                      {[
                        ["pact", "enter the interactive REPL"],
                        ["pact run \"<task>\"", "one-shot: plan → contract → verify"],
                        ["pact undo <id>", "reverse a journaled file action"],
                        ["pact log [--last N]", "recent journal entries"],
                        ["pact skill …", "save / run / compose / export skills"],
                        ["pact memory …", "list / forget / pin project memory"],
                        ["pact budget [set]", "view or set the daily cap"],
                        ["pact status · digest", "activity + review flags"],
                        ["pact doctor", "install / config health check"],
                      ].map(([cmd, desc]) => (
                        <li key={cmd} className="grid grid-cols-[1fr_auto] gap-3 items-baseline">
                          <span className="text-[#d8b3a3]">{cmd}</span>
                          <span className="text-[#6f6760] text-[11px] text-right">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.06}>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#0d0a08]/60 p-6 h-full">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#CF5C36] mb-5">In-session slash commands</p>
                    <ul className="font-dmmono text-[12.5px] space-y-2.5">
                      {[
                        ["/delegate <task>", "split into independent subagents"],
                        ["/voice <path>", "transcribe audio into a task"],
                        ["/remember <fact>", "record a durable fact"],
                        ["/memory", "show / pin project memory"],
                        ["/skill", "list / save / run / schedule skills"],
                        ["/status · /log", "recent activity & journal"],
                        ["/undo <id>", "reverse a file action"],
                        ["/budget · /config", "spend vs. cap · current config"],
                        ["/help · /exit", "help · leave (also Ctrl+D)"],
                      ].map(([cmd, desc]) => (
                        <li key={cmd} className="grid grid-cols-[1fr_auto] gap-3 items-baseline">
                          <span className="text-[#d8b3a3]">{cmd}</span>
                          <span className="text-[#6f6760] text-[11px] text-right">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <p className="font-manrope text-sm text-[#6f6760] mt-6 max-w-3xl leading-relaxed">
                  Optional extras: <code className="font-dmmono text-[#9a8e86]">pact-cli[voice]</code>{" "}
                  (Whisper transcription),{" "}
                  <code className="font-dmmono text-[#9a8e86]">pact-cli[notifications]</code>{" "}
                  (Windows toasts), and browser support via Playwright.
                </p>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ CLOSING CTA ════════════════════ */}
          <section className="px-6 md:px-14 pt-12 pb-32">
            <div className="max-w-5xl mx-auto">
              <Brackets className="p-2">
                <div className="relative rounded-[2rem] border border-[#CF5C36]/25 bg-gradient-to-b from-[#140e0b] to-[#0c0908] overflow-hidden">
                  {/* faint neon backdrop */}
                  <div aria-hidden className="absolute inset-0 opacity-[0.12]">
                    <Image src="/pact-images/pact-neon.png" alt="" fill className="object-cover object-center mix-blend-screen" />
                  </div>
                  <div aria-hidden className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-full blur-[100px] bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.18),transparent_65%)]" style={{ animation: "pact-drift 16s ease-in-out infinite" }} />
                  <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center p-8 sm:p-12">
                    <div>
                      <p className="font-dmmono text-[11px] uppercase tracking-[0.3em] text-[#CF5C36] mb-5">
                        open source · House of Namus
                      </p>
                      <h2 className="font-manrope font-semibold text-3xl md:text-4xl tracking-tight text-[#f0e9e3] leading-tight mb-5">
                        Plan it. Contract it. Approve it.{" "}
                        <span className="font-serif italic font-normal text-[#FF7A45]">Verify it.</span>
                      </h2>
                      <p className="font-manrope text-[#9a8e86] max-w-md leading-relaxed mb-8">
                        Clone the repository, install with pipx, and run your first contracted task in
                        under a minute. Bring your own model — OpenRouter or a fully local endpoint.
                      </p>
                      <a
                        href={GITHUB}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 rounded-full bg-[#CF5C36] text-black font-manrope font-semibold text-sm px-6 py-3 hover:bg-[#FF5500] transition-colors duration-300"
                      >
                        <GitHubMark />
                        github.com/Sumandebnath943/pact-agent
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                      </a>
                    </div>

                    <div className="hidden md:block w-44 lg:w-52 shrink-0">
                      <Image
                        src="/pact-images/pact-wordmark.png"
                        alt="PACT AGENT"
                        width={1254}
                        height={1254}
                        className="w-full h-auto rounded-2xl mix-blend-screen opacity-90"
                      />
                    </div>
                  </div>
                </div>
              </Brackets>

              <p className="font-dmmono text-[11px] text-[#6f6760] text-center mt-10 tracking-wide">
                v0.1.0 · pact-cli · MIT · Built by House of Namus
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </MotionProvider>
  );
}
