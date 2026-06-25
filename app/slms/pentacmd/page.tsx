import type { Metadata } from "next";
import Image from "next/image";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  Reveal,
  StatCounter,
  CopyCommand,
} from "@/components/penta/PentaWidgets";
import { FAMILIES, FamilyKey, SPECTRUM } from "@/components/penta/penta-data";
import {
  NeuralField,
  SpectrumMarquee,
  TranslationConsole,
  DataPipeline,
  TrainingCurve,
  FamilyBars,
  LoopTerminal,
} from "@/components/penta/PentaVisuals";

const GITHUB = "https://github.com/Sumandebnath943/pentacmd";
const HF = "https://huggingface.co/SumanDebnath943/PentaCMD-47M";

export const metadata: Metadata = {
  title: "PentaCMD-47M — Small Language Model for Terminal Commands (bash · git · npm · python · PowerShell)",
  description:
    "PentaCMD-47M is a from-scratch 47-million-parameter small language model (SLM) that turns plain-English instructions into CLI terminal commands across bash, git, npm, python (pip/venv) and PowerShell — ~86.7% blended exact-match, 100% on git, trained in ~53 minutes on a single Kaggle T4. Open weights on Hugging Face, MIT code on GitHub.",
  keywords: [
    "PentaCMD",
    "PentaCMD-47M",
    "small language model",
    "SLM",
    "natural language to CLI",
    "English to terminal command",
    "natural language to shell command",
    "AI terminal command generator",
    "git command generator",
    "Git Bash commands AI",
    "bash command generator",
    "npm command generator",
    "python pip commands AI",
    "PowerShell command generator",
    "nanoGPT from scratch",
    "decoder-only transformer",
    "byte-level BPE tokenizer",
    "NL2Bash",
    "exact-match accuracy",
    "open weights model",
    "Hugging Face model",
    "Suman Debnath",
  ],
  alternates: { canonical: "/slms/pentacmd" },
  icons: {
    icon: [{ url: "/pentacmd-images/favicon.png", type: "image/png" }],
    shortcut: "/pentacmd-images/favicon.png",
    apple: "/pentacmd-images/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "PentaCMD-47M · English in. Commands out.",
    description:
      "A from-scratch 47M-parameter small language model that translates plain English into terminal commands across 5 CLIs — bash, git, npm, python, PowerShell. ~86.7% exact-match, 100% on git. Built end-to-end: dataset, tokenizer, training, evaluation, release.",
    url: "/slms/pentacmd",
    images: [{ url: "/pentacmd-images/product1.png", width: 1672, height: 941, alt: "PentaCMD — the 47M-parameter AI model that speaks your terminal." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PentaCMD-47M · A small language model that speaks your terminal",
    description:
      "From-scratch 47M-param SLM: plain English → bash / git / npm / python / PowerShell commands. ~86.7% exact-match, 100% on git. Open weights.",
    images: ["/pentacmd-images/product1.png"],
  },
};

/* Structured data — SoftwareApplication + TechArticle for richer SLM/CLI SEO. */
const SITE_URL = "https://sumandebnath.houseofnamus.com";
const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PentaCMD-47M",
  alternateName: "PentaCMD",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Small Language Model (SLM)",
  operatingSystem: "Windows, macOS, Linux (CPU or GPU)",
  description:
    "A from-scratch 47-million-parameter small language model that converts plain-English instructions into terminal commands across bash, git, npm, python and PowerShell.",
  url: `${SITE_URL}/slms/pentacmd`,
  softwareVersion: "0 (V1 in progress)",
  programmingLanguage: "Python",
  license: "https://opensource.org/license/mit",
  codeRepository: GITHUB,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE_URL },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  keywords:
    "small language model, SLM, natural language to CLI, git, bash, npm, python, PowerShell, nanoGPT, transformer",
};
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "PentaCMD-47M — building a small language model that turns English into terminal commands",
  description:
    "How a 47M-parameter SLM was built from scratch — dataset, byte-level BPE tokenizer, nanoGPT-style transformer, exact-match training — reaching ~86.7% exact-match (100% on git) across bash, git, npm, python and PowerShell.",
  author: { "@type": "Person", name: "Suman Debnath", url: SITE_URL },
  mainEntityOfPage: `${SITE_URL}/slms/pentacmd`,
  image: `${SITE_URL}/pentacmd-images/product1.png`,
  keywords:
    "small language model, SLM, CLI, terminal commands, Git Bash commands, npm commands, python commands, PowerShell commands, nanoGPT, exact-match",
};

/* ── Glyphs ─────────────────────────────────────────────────────────────── */
function GitHubMark({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

function HuggingFaceMark({ size = 18 }: { size?: number }) {
  return (
    <span aria-hidden style={{ fontSize: size }} className="leading-none">🤗</span>
  );
}

/* ── Section heading — spectrum HUD style ───────────────────────────────── */
function SectionLabel({ index, title, kicker, color = "#A78BFA" }: { index: string; title: string; kicker?: string; color?: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-dmmono text-[11px] border rounded px-1.5 py-0.5 leading-none" style={{ color, borderColor: `${color}66` }}>
          [ {index} ]
        </span>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, animation: "penta-blink 1.3s steps(1) infinite" }} />
        {kicker && <span className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#7c84a8]">// {kicker}</span>}
      </div>
      <div className="flex items-end gap-5">
        <h2 className="font-manrope font-semibold text-3xl md:text-[2.4rem] leading-none tracking-tight text-[#f3f4fb]">{title}</h2>
        <span className="flex-1 mb-1.5 h-px hidden sm:block" style={{ background: `repeating-linear-gradient(90deg, ${color}73 0 6px, transparent 6px 13px)` }} />
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function PentaCmdPage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Navigation />

      <main className="relative bg-[#05060b] text-[#dfe3f2] min-h-screen overflow-hidden selection:bg-[#A78BFA] selection:text-black">
        {/* ── Calm global ambient (fixed) — keeps text readable everywhere ── */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[150px] opacity-[0.10]" style={{ background: "radial-gradient(circle, #7B61FF, transparent 65%)" }} />
          <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-[0.08]" style={{ background: "radial-gradient(circle, #2563EB, transparent 65%)" }} />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(167,139,250,0.5) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="relative z-10">
          {/* ════════════════════ HERO ════════════════════ */}
          <section className="relative min-h-[100svh] flex flex-col pt-28 pb-8 px-6 md:px-14 overflow-hidden">
            {/* premium signal field — confined to the hero, fades out at the bottom */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                maskImage: "linear-gradient(to bottom, black 62%, transparent 95%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 62%, transparent 95%)",
              }}
            >
              <NeuralField />
            </div>

            <div className="flex-1 flex items-center justify-center w-full">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center w-full">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 font-dmmono text-[11px] uppercase tracking-[0.25em] text-[#9aa2c8] mb-7">
                  <span className="text-[#A78BFA]">┌─</span>
                  <span>Small Language Model · 47.2M params · from scratch</span>
                  <span className="text-[#A78BFA]">─┐</span>
                </div>
              </Reveal>

              {/* Transparent landscape logo (tightly trimmed) */}
              <Reveal delay={0.05}>
                <h1 className="mb-7 w-full">
                  <span className="sr-only">PentaCMD-47M — English in, commands out</span>
                  <Image
                    src="/pentacmd-images/logo-trim.png"
                    alt="PentaCMD"
                    width={1182}
                    height={273}
                    priority
                    className="w-full max-w-[560px] md:max-w-[680px] h-auto mx-auto drop-shadow-[0_0_70px_rgba(167,139,250,0.22)]"
                  />
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p
                  className="font-dmmono text-[12px] md:text-[13px] tracking-[0.42em] uppercase mb-6 bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(90deg, ${SPECTRUM.join(",")}, ${SPECTRUM[0]})`, backgroundSize: "200% auto", animation: "penta-spectrum 6s linear infinite" }}
                >
                  English in · Commands out
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="font-manrope text-lg md:text-xl leading-relaxed text-[#b8bedb] max-w-2xl mb-8">
                  A decoder-only transformer, trained{" "}
                  <span className="text-[#f3f4fb]">from scratch</span>, that turns a plain-English
                  instruction into a single terminal command across{" "}
                  <span className="text-[#f3f4fb]">five tools</span> — reaching{" "}
                  <span className="text-[#34D399] font-medium">~86.7% exact-match</span>, and{" "}
                  <span className="text-[#F97316] font-medium">100% on git</span>.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="flex flex-col sm:flex-row items-center gap-3.5">
                  <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 rounded-full bg-[#A78BFA] text-black font-manrope font-semibold text-sm px-6 py-3 hover:brightness-110 transition-all duration-300">
                    <GitHubMark /> Code on GitHub
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                  </a>
                  <a href={HF} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 rounded-full border border-[#FACC15]/40 text-[#f3f4fb] font-manrope font-medium text-sm px-6 py-3 hover:bg-[#FACC15]/10 hover:border-[#FACC15]/70 transition-colors duration-300">
                    <HuggingFaceMark /> Weights on Hugging Face
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                  </a>
                  <a href="#use" className="inline-flex items-center gap-2 rounded-full border border-white/12 text-[#dfe3f2] font-manrope font-medium text-sm px-6 py-3 hover:border-white/30 hover:bg-white/[0.03] transition-colors duration-300">
                    Run it <span>↓</span>
                  </a>
                </div>
              </Reveal>
            </div>
            </div>

            {/* scroll hint — in flow, with guaranteed clearance above */}
            <Reveal delay={0.4} className="shrink-0 mt-16 flex justify-center">
              <span className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#5a6286] flex flex-col items-center gap-1.5">
                scroll
                <span className="block w-px h-6 bg-gradient-to-b from-[#A78BFA] to-transparent" />
              </span>
            </Reveal>
          </section>

          {/* ════════════════════ QUICKSTART + LIVE CONSOLE + STATS ════════════════════ */}
          <section className="px-6 md:px-14 pt-6 pb-12">
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 items-start">
              {/* Run command — install & run */}
              <Reveal className="w-full">
                <p className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#5a6286] mb-3">
                  Install &amp; run on a CPU-only machine
                </p>
                <CopyCommand
                  label="Quickstart"
                  accent="#34D399"
                  lines={[
                    { kind: "comment", text: "# clone + install the two deps" },
                    { text: "git clone …/pentacmd" },
                    { text: "pip install torch tokenizers" },
                    { kind: "comment", text: "# family hint + instruction" },
                    { text: 'python inference.py git \\' },
                    { text: '  "undo my last commit"' },
                    { kind: "out", text: "→ git reset --soft HEAD~1" },
                  ]}
                  copyText={
                    'git clone https://github.com/Sumandebnath943/pentacmd\ncd pentacmd && pip install torch tokenizers\npython inference.py git "undo my last commit but keep my changes"'
                  }
                />
              </Reveal>

              {/* Live translation console */}
              <Reveal delay={0.1} className="w-full">
                <p className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#5a6286] mb-3">
                  Live — real outputs, on a loop
                </p>
                <TranslationConsole />
              </Reveal>
            </div>

            {/* Headline stat band */}
            <Reveal delay={0.1} className="max-w-5xl mx-auto mt-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.06]">
                {[
                  { v: <StatCounter value={47.2} decimals={1} suffix="M" />, l: "parameters", c: "#A78BFA" },
                  { v: <StatCounter value={86.7} decimals={1} suffix="%" />, l: "blended exact-match", c: "#34D399" },
                  { v: <StatCounter value={100} suffix="%" />, l: "exact-match on git", c: "#F97316" },
                  { v: <StatCounter value={299} suffix="K+" />, l: "instruction→command pairs", c: "#38BDF8" },
                  { v: <StatCounter value={53} suffix=" min" />, l: "to train · 1× T4", c: "#FACC15" },
                  { v: <StatCounter value={58.7} decimals={1} suffix="→87" />, l: "baseline → final", c: "#F43F5E" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#070912] p-5 flex flex-col items-center text-center">
                    <span className="font-manrope font-semibold text-2xl md:text-[1.7rem] tabular-nums" style={{ color: s.c }}>{s.v}</span>
                    <span className="font-dmmono text-[9.5px] uppercase tracking-[0.12em] text-[#7c84a8] mt-1.5 leading-tight">{s.l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ── Spectrum ticker ── */}
          <Reveal>
            <SpectrumMarquee
              items={["bash", "git", "npm", "python", "powershell", "from scratch", "nanoGPT", "byte-level BPE", "exact-match", "leak-free split", "argument copying", "open weights"]}
            />
          </Reveal>

          {/* ════════════════════ WHAT IT IS — light section ════════════════════ */}
          <section className="relative px-6 md:px-14 py-20 md:py-28 bg-[#ECEDF6] text-[#15172e] overflow-hidden">
            <div aria-hidden className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(rgba(123,97,255,0.10) 0.7px, transparent 0.8px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 85%)", WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 85%)" }} />
            <div className="relative max-w-5xl mx-auto grid md:grid-cols-12 gap-10 md:gap-14 items-center">
              <Reveal className="md:col-span-7">
                <p className="font-dmmono text-[11px] uppercase tracking-[0.3em] text-[#7B61FF] mb-6">// the idea</p>
                <h2 className="font-manrope font-semibold text-3xl md:text-[2.5rem] leading-[1.16] tracking-tight text-[#15172e]">
                  Beginners know <span className="font-serif italic font-normal text-[#7B61FF]">what</span> they want to do —
                  not the exact command.
                </h2>
                <p className="font-manrope text-lg text-[#3b3f5c] leading-relaxed mt-7 max-w-xl">
                  Big models can already do this. PentaCMD is the opposite bet: a{" "}
                  <span className="text-[#0a8f5f] font-semibold">tiny, specialised model built entirely by hand</span> —
                  data, tokenizer, architecture, training, evaluation, release — to learn the whole ML
                  lifecycle by doing every step.
                </p>
                <p className="font-manrope text-base text-[#5a5f7e] leading-relaxed mt-5 max-w-xl">
                  The same English (&ldquo;go to the src folder&rdquo;) maps to different commands in
                  different shells. So the model is handed the target{" "}
                  <span className="text-[#15172e] font-semibold">family as an input hint</span> — never asked to guess it.
                  Every example, every source, follows one locked three-field schema.
                </p>
              </Reveal>

              {/* Prompt format card — stays dark, pops on light */}
              <Reveal delay={0.1} className="md:col-span-5">
                <div className="relative rounded-2xl border border-white/[0.09] bg-[#080a14] p-6 overflow-hidden shadow-[0_30px_60px_-25px_rgba(20,15,60,0.45)]">
                  <span aria-hidden className="absolute -top-px left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SPECTRUM.join(",")}, transparent)` }} />
                  <p className="font-dmmono text-[10px] uppercase tracking-[0.25em] text-[#5a6286] mb-5">the prompt format</p>
                  <div className="font-dmmono text-[12.5px] leading-relaxed space-y-1">
                    <p><span className="text-[#5a6286]">### Task (</span><span className="text-[#F97316]">git</span><span className="text-[#5a6286]">): </span><span className="text-[#e6e9f5]">undo my last commit but keep my changes</span></p>
                    <p><span className="text-[#5a6286]">### Command:</span></p>
                    <p className="flex items-center gap-2 pt-1"><span className="text-[#34D399]">→</span><span className="text-[#34D399] font-medium">git reset --soft HEAD~1</span></p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/[0.07] grid grid-cols-3 gap-3 font-dmmono text-[10.5px]">
                    {[["instruction", "#38BDF8"], ["command", "#34D399"], ["family", "#F97316"]].map(([k, c]) => (
                      <div key={k} className="rounded-lg border px-2.5 py-2 text-center" style={{ borderColor: `${c}44`, color: c as string }}>{k}</div>
                    ))}
                  </div>
                  <p className="font-manrope text-xs text-[#7c84a8] mt-4 leading-relaxed">
                    Because family is an input, the dedup key is (family, instruction) — identical English
                    across <span className="text-[#b8bedb]">different</span> shells is kept and disambiguated by the hint.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* five families — cardless strip on a dark pill so colours pop */}
            <Reveal delay={0.1} className="relative max-w-2xl mx-auto mt-14">
              <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-3 rounded-full bg-[#0a0c16] px-7 py-4 shadow-[0_20px_50px_-25px_rgba(20,15,60,0.5)]">
                <span className="font-dmmono text-[10px] uppercase tracking-[0.25em] text-[#7c84a8]">five tools</span>
                {(Object.keys(FAMILIES) as FamilyKey[]).map((k) => (
                  <span key={k} className="inline-flex items-center gap-2 font-dmmono text-[13px]" style={{ color: FAMILIES[k].color }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: FAMILIES[k].color }} />
                    {FAMILIES[k].label}
                  </span>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ════════════════════ PIPELINE ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="01" title="From raw text to trained weights" kicker="the build pipeline" color="#38BDF8" />
              <Reveal>
                <p className="font-manrope text-base md:text-lg text-[#8b93b5] max-w-2xl mb-12 leading-relaxed">
                  Every example flows through one path: real and synthetic sources are merged, deduped,
                  split leak-free, tokenized with a byte-level BPE trained on the train split only, then
                  fed to a from-scratch transformer — checkpointed on exact-match, not loss.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <DataPipeline />
              </Reveal>

              {/* dataset composition */}
              <Reveal delay={0.08}>
                <div className="mt-12 rounded-2xl border border-white/[0.08] bg-[#080a14]/90 backdrop-blur-md p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#38BDF8]">Dataset composition · 299,329 pairs</p>
                    <p className="font-dmmono text-[10.5px] text-[#7c84a8]">grown ~8× from a 36,329-pair first cut</p>
                  </div>
                  {/* stacked proportion bar */}
                  <div className="flex h-9 w-full rounded-lg overflow-hidden border border-white/[0.06]">
                    {[
                      { fam: "git" as FamilyKey, n: 120000 },
                      { fam: "python" as FamilyKey, n: 90000 },
                      { fam: "bash" as FamilyKey, n: 41329 },
                      { fam: "powershell" as FamilyKey, n: 28000 },
                      { fam: "npm" as FamilyKey, n: 20000 },
                    ].map((d) => (
                      <div key={d.fam} className="h-full flex items-center justify-center" style={{ width: `${(d.n / 299329) * 100}%`, background: `${FAMILIES[d.fam].color}d9` }} title={`${FAMILIES[d.fam].label} · ${d.n.toLocaleString("en-US")}`}>
                        <span className="font-dmmono text-[10px] text-black/80 font-medium hidden sm:block">{((d.n / 299329) * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                  {/* legend */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-5">
                    {[
                      ["git", "120,000", "synthetic"],
                      ["python", "90,000", "synthetic"],
                      ["bash", "41,329", "NL2Bash ~11K + synth 30K"],
                      ["powershell", "28,000", "synthetic"],
                      ["npm", "20,000", "synthetic"],
                    ].map(([fam, n, src]) => (
                      <div key={fam} className="flex items-start gap-2.5">
                        <span className="mt-1 w-2 h-2 rounded-sm shrink-0" style={{ background: FAMILIES[fam as FamilyKey].color }} />
                        <div>
                          <p className="font-dmmono text-[12.5px]" style={{ color: FAMILIES[fam as FamilyKey].color }}>{fam} · {n}</p>
                          <p className="font-manrope text-[11px] text-[#7c84a8] leading-tight mt-0.5">{src}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-manrope text-xs text-[#7c84a8] mt-5 leading-relaxed">
                    Split leak-free 90/5/5 → train 269,396 / val 14,967 / test 14,966. Data went where it
                    paid off — most to git and python (the families with the most headroom), least to
                    near-ceiling npm and PowerShell. Verified: 0 commands and 0 instructions span splits.
                  </p>
                </div>
              </Reveal>

              {/* architecture spec — cardless definition rows */}
              <Reveal delay={0.1}>
                <div className="mt-14 grid sm:grid-cols-2 gap-x-12">
                  {[
                    ["Architecture", "Decoder-only transformer, nanoGPT-style — pre-norm blocks, causal self-attention, GELU MLP, weight-tied LM head.", "#A78BFA"],
                    ["Shape", "8 layers · 10 heads · 640 width · 256 context · 47.2M params (up from a 20.0M baseline).", "#38BDF8"],
                    ["Tokenizer", "Byte-level BPE, vocab 12,000 — git, npm install, --soft, Get-ChildItem become single/short tokens.", "#34D399"],
                    ["Training", "AdamW · cosine LR 6e-4→6e-5 · 300 warmup · batch 32 · fp16 · 14,000 steps · best at 11,000.", "#FACC15"],
                  ].map(([t, d, c], i) => (
                    <div key={i} className="flex gap-4 py-5 border-t border-white/[0.07]">
                      <span className="mt-1.5 w-8 h-px shrink-0" style={{ background: c as string }} />
                      <div>
                        <p className="font-dmmono text-[12px] mb-1.5" style={{ color: c as string }}>{t}</p>
                        <p className="font-manrope text-sm text-[#9aa2c8] leading-relaxed">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ RESULTS ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="02" title="The results" kicker="held-out test set · exact-match" color="#34D399" />
              <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                {/* family bars */}
                <Reveal>
                  <div className="relative h-full rounded-2xl border border-white/[0.08] bg-[#080a14]/95 backdrop-blur-md p-6 sm:p-7">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#34D399] mb-6">Per-family exact-match</p>
                    <FamilyBars />
                    <p className="font-manrope text-xs text-[#7c84a8] mt-6 leading-relaxed">
                      Thin white tick = first-word accuracy (the right command / verb): ~100% on the four
                      synthetic families. Test ≈ validation (~86.7%) → no overfitting.
                    </p>
                  </div>
                </Reveal>

                {/* training curve */}
                <Reveal delay={0.1}>
                  <div className="relative h-full rounded-2xl border border-white/[0.08] bg-[#080a14]/95 backdrop-blur-md p-6 sm:p-7 overflow-hidden">
                    <span aria-hidden className="absolute left-0 right-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(52,211,153,0.08), transparent)", animation: "penta-sweep 6s linear infinite" }} />
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#34D399] mb-4 relative">Training trajectory · exact-match on val</p>
                    <TrainingCurve />
                    <p className="font-manrope text-xs text-[#7c84a8] mt-3 leading-relaxed relative">
                      Structure is learned in the first 2k steps (first-word ~96%, dashed). The copy
                      circuit comes online around step 3k, then a steep takeoff to the 86.7% peak at 11k.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* baseline -> final */}
              <Reveal delay={0.1}>
                <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#080a14]/70 p-6 sm:p-8 grid sm:grid-cols-[1fr_auto_1fr] items-center gap-6 text-center">
                  <div>
                    <p className="font-dmmono text-[10px] uppercase tracking-[0.25em] text-[#5a6286] mb-2">first model · 20.0M · &lt;1M tokens</p>
                    <p className="font-manrope font-semibold text-4xl text-[#8b93b5]"><StatCounter value={58.7} decimals={1} suffix="%" /></p>
                  </div>
                  <div className="text-[#A78BFA] font-dmmono text-2xl hidden sm:block">→</div>
                  <div>
                    <p className="font-dmmono text-[10px] uppercase tracking-[0.25em] text-[#5a6286] mb-2">final V0 · 47.2M · ~6.54M tokens</p>
                    <p className="font-manrope font-semibold text-4xl bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, #34D399, #38BDF8)` }}><StatCounter value={86.7} decimals={1} suffix="%" /></p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ THE STORY ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-5xl mx-auto">
              <SectionLabel index="03" title="The problem-solving arc" kicker="diagnose → scale data → solve" color="#F97316" />

              {/* zig-zag journey timeline */}
              <div className="relative mt-4">
                {/* animated spine */}
                <span aria-hidden className="absolute top-2 bottom-2 left-[19px] md:left-1/2 md:-translate-x-1/2 w-[2px] overflow-hidden rounded-full" style={{ background: `linear-gradient(to bottom, ${SPECTRUM.join(",")})`, opacity: 0.55 }}>
                  <span className="absolute left-1/2 -translate-x-1/2 top-0 w-[6px] h-16 rounded-full blur-[2px] bg-white" style={{ animation: "penta-fall 7s linear infinite" }} />
                </span>

                {[
                  ["Build the dataset from scratch", "Started from the real-world NL2Bash corpus (12,607 English↔bash pairs), then generated natural, beginner-phrased synthetic data for git / npm / python / PowerShell. Locked a clean three-field JSONL schema early.", "#FF3D81", "3-field schema"],
                  ["Design for honesty", "Merged everything and split it leak-free — grouped by command so paraphrases like “install react” / “install react package” cannot leak across train and test.", "#F97316", "0 leakage"],
                  ["First model — 20M params", "A per-family breakdown was the key tool: ~90% first-word accuracy but the wrong argument (npm uninstall lodash → npm uninstall handlebars). bash, anchored by research-hard NL2Bash, sat at 6.7% and dragged the average.", "#FACC15", "58.7%"],
                  ["Diagnose the real bottleneck", "Two insights: validation loss was misleading (it rose while real accuracy climbed) — so switched to checkpointing on exact-match; and the model was data-starved — 20M params but under 1M tokens.", "#34D399", "right metric"],
                  ["Scale data ~8× — for variety, not volume", "Generated thousands of distinct package / branch / file names so the model learns to copy an arbitrary argument instead of memorising a small set. Grew to 299,329 pairs and a 47.2M model to match.", "#38BDF8", "×8 data"],
                  ["Result — 47M params", "git solved at 100%, npm and PowerShell at 97–99%, and a model that copies arguments it has never seen — trained hands-off in ~53 minutes as a committed background job.", "#A78BFA", "86.7%"],
                ].map(([t, d, c, tag], i) => {
                  const left = i % 2 === 0;
                  return (
                    <Reveal key={i} delay={0.04}>
                      <div className="relative md:grid md:grid-cols-2 md:gap-14 pb-10 last:pb-0">
                        {/* node */}
                        <span className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-1 z-10 w-9 h-9 rounded-full flex items-center justify-center font-dmmono text-[12px] font-medium border-2 bg-[#06070e]" style={{ borderColor: c as string, color: c as string }}>
                          {`0${i + 1}`}
                        </span>
                        {/* content */}
                        <div className={`pl-14 md:pl-0 ${left ? "md:col-start-1 md:text-right md:pr-14" : "md:col-start-2 md:pl-14"}`}>
                          <div className={`flex items-center gap-3 mb-2 ${left ? "md:justify-end" : ""}`}>
                            <h3 className="font-manrope font-semibold text-lg sm:text-xl" style={{ color: c as string }}>{t}</h3>
                            <span className="font-dmmono text-[10.5px] px-2 py-0.5 rounded-full border shrink-0" style={{ color: c as string, borderColor: `${c}55` }}>{tag}</span>
                          </div>
                          <p className={`font-manrope text-sm sm:text-[15px] text-[#9aa2c8] leading-relaxed ${left ? "md:ml-auto" : ""} max-w-md`}>{d}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              {/* honest engineering — cardless */}
              <Reveal delay={0.1}>
                <div className="mt-12 pt-8 border-t border-white/[0.08]">
                  <p className="font-dmmono text-[11px] uppercase tracking-[0.25em] text-[#7c84a8] mb-7">// honest engineering details</p>
                  <div className="grid sm:grid-cols-2 gap-x-12 gap-y-7">
                    {[
                      ["The trailing-space bug", "A single trailing space in the inference prompt (### Command: vs ### Command:) made the model drop the first word of every command. Removing it instantly fixed outputs.", "#F43F5E"],
                      ["Background runs", "Interactive Kaggle sessions kept dying on idle-timeout. Long jobs moved to committed “Save & Run All” runs that survive the laptop being closed.", "#38BDF8"],
                    ].map(([t, d, c], i) => (
                      <div key={i} className="flex gap-4">
                        <span className="mt-1.5 w-8 h-px shrink-0" style={{ background: c as string }} />
                        <div>
                          <p className="font-manrope font-semibold text-[15px] mb-1.5" style={{ color: c as string }}>{t}</p>
                          <p className="font-manrope text-sm text-[#9aa2c8] leading-relaxed">{d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ HOW IT WAS BUILT / AI-NATIVE WORKFLOW — vibrant ════════════════════ */}
          <section className="relative px-6 md:px-14 py-20 md:py-24 overflow-hidden bg-gradient-to-br from-[#241a57] via-[#3a1c66] to-[#102e58]">
            <div aria-hidden className="absolute inset-0 -z-0">
              <Image src="/pentacmd-images/gen-banner.png" alt="" fill className="object-cover opacity-50 mix-blend-screen" sizes="100vw" />
              <div className="absolute inset-0 bg-[#0b0820]/35" />
              <span className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SPECTRUM.join(",")}, transparent)` }} />
              <span className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SPECTRUM.join(",")}, transparent)` }} />
            </div>
            <div className="relative max-w-6xl mx-auto">
              <SectionLabel index="04" title="How it was built" kicker="an AI-native workflow" color="#C4B5FD" />
              <Reveal>
                <p className="font-manrope text-base md:text-lg text-[#d8d9f4] max-w-3xl mb-12 leading-relaxed">
                  PentaCMD wasn&rsquo;t built in a research lab — it was built solo and{" "}
                  <span className="text-white font-medium">AI-native</span>: AI copilots compress the loop
                  from idea to implementation, while every decision that actually moves the score — the
                  metric, the data strategy, the model size — stays a deliberate human call. The whole
                  project is one tight loop that ran again and again.
                </p>
              </Reveal>

              {/* the loop — cardless stages */}
              <Reveal delay={0.05}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-8 relative">
                  {[
                    ["Frame & research", "Define the task and study transformers, tokenizers and training — AI as a research copilot to move fast.", "#FF8FB0"],
                    ["Generate data", "Build programmatic synthetic-data engines — templates × large entity pools — for natural beginner phrasing.", "#FBE07A"],
                    ["Train from scratch", "A from-scratch nanoGPT on a free Kaggle T4 GPU, run hands-off as a committed background job.", "#86EFC4"],
                    ["Diagnose by metric", "Per-family exact-match breakdowns expose exactly where — and why — the model is failing.", "#8FD6FB"],
                    ["Iterate & ship", "Feed findings back into data + model size; then document and publish to GitHub and Hugging Face.", "#C4B5FD"],
                  ].map(([t, d, c], i) => (
                    <div key={i} className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-dmmono text-[11px] w-6 h-6 rounded-full border flex items-center justify-center shrink-0" style={{ color: c as string, borderColor: `${c}88` }}>{i + 1}</span>
                        <span className="flex-1 h-px" style={{ background: `${c}44` }} />
                      </div>
                      <p className="font-manrope font-semibold text-white text-[15px] mb-1.5">{t}</p>
                      <p className="font-manrope text-sm text-[#c5c7ea] leading-relaxed">{d}</p>
                      {i < 4 && <span aria-hidden className="hidden lg:block absolute -right-2.5 top-1.5 text-white/30">→</span>}
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex items-start gap-3 mt-9 font-dmmono text-[11.5px] text-[#d8d9f4] border-l-2 border-[#C4B5FD]/60 pl-4 py-1">
                  <span className="text-[#C4B5FD] text-base leading-none mt-0.5">↻</span>
                  <span>The loop ran end-to-end twice: a 20M baseline → diagnosis → ~8× more data → a 47M model — moving the blended score from 58.7% to 86.7%.</span>
                </div>
              </Reveal>

              {/* what I learned — cardless */}
              <Reveal delay={0.1}>
                <div className="mt-14 pt-8 border-t border-white/[0.16]">
                  <p className="font-dmmono text-[11px] uppercase tracking-[0.25em] text-[#b9bdee] mb-7">// what I learned</p>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-7">
                    {[
                      ["Pick the right metric", "For a leak-free split, validation loss misleads — it can rise while real accuracy climbs. Score on the task metric (exact-match), not loss.", "#FBE07A"],
                      ["Data variety beats volume", "Argument-copying only generalises when the model sees thousands of distinct arguments — not more rows of the same few.", "#86EFC4"],
                      ["Diagnose before scaling", "Per-family breakdowns showed bash was the anchor and git / python had the headroom — so data went where it actually paid off.", "#8FD6FB"],
                      ["Small details matter", "A single trailing space in the prompt silently broke every output. Tiny formatting bugs can masquerade as model failures.", "#FF8FB0"],
                      ["Respect the tooling", "Long jobs belong in committed / background runs — interactive sessions die. Reliable infrastructure is part of the model.", "#C4B5FD"],
                    ].map(([t, d, c], i) => (
                      <div key={i} className="flex gap-4">
                        <span className="mt-1.5 w-8 h-px shrink-0" style={{ background: c as string }} />
                        <div>
                          <p className="font-manrope font-semibold text-[15px] mb-1.5" style={{ color: c as string }}>{t}</p>
                          <p className="font-manrope text-sm text-[#d8d9f4] leading-relaxed">{d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ SHOWCASE BAND ════════════════════ */}
          <section className="px-6 md:px-14 py-8">
            <Reveal className="max-w-3xl mx-auto">
              <div className="relative rounded-2xl border border-white/[0.08] bg-[#080a14] p-1.5 sm:p-2 overflow-hidden shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
                <div className="rounded-xl overflow-hidden border border-white/[0.05] relative aspect-[1672/941]">
                  <Image src="/pentacmd-images/product1.png" alt="PentaCMD — the 47M-parameter AI model that speaks your terminal: bash, git, npm, python, PowerShell, with ~86.7% exact-match." fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
                </div>
              </div>
            </Reveal>
          </section>

          {/* ════════════════════ LIVE EXAMPLES ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="05" title="Live examples" kicker="real outputs · including the misses" color="#FACC15" />

              <Reveal>
                <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#34D399] mb-4">Correct — verified, run locally on CPU</p>
              </Reveal>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  ["git", "undo my last commit but keep my changes", "git reset --soft HEAD~1"],
                  ["git", "create a branch called payments and switch to it", "git switch -c payments"],
                  ["npm", "install the express package", "npm install express"],
                  ["python", "create a virtual environment", "python -m venv venv"],
                  ["powershell", "list the files in the Downloads folder", "Get-ChildItem Downloads"],
                  ["bash", "find all text files in the current folder", 'find . -type f -name "*.txt"'],
                ].map(([fam, instr, cmd], i) => {
                  const c = FAMILIES[fam as FamilyKey].color;
                  return (
                    <Reveal key={i} delay={(i % 2) * 0.05}>
                      <div className="group rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-5 hover:border-white/[0.16] transition-colors relative overflow-hidden">
                        <span aria-hidden className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: c }} />
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                          <span className="font-dmmono text-[11px]" style={{ color: c }}>{fam}</span>
                        </div>
                        <p className="font-manrope text-[15px] text-[#dfe3f2] mb-3">&ldquo;{instr}&rdquo;</p>
                        <p className="font-dmmono text-[12.5px] flex items-start gap-2">
                          <span className="text-[#34D399]">→</span>
                          <span style={{ color: c }}>{cmd}</span>
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal delay={0.05}>
                <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#F43F5E] mt-12 mb-4">Honest misses — kept for transparency</p>
              </Reveal>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  ["python", "install pandas version 2.1.0", "pip install langchain==2.1.0", "right structure, wrong package"],
                  ["bash", "find all python files here", 'find . -name "*.c"', "right command, wrong extension"],
                ].map(([fam, instr, cmd, note], i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="rounded-2xl border border-[#F43F5E]/20 bg-[#120a10]/50 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E]" />
                        <span className="font-dmmono text-[11px] text-[#F43F5E]">{fam}</span>
                      </div>
                      <p className="font-manrope text-[15px] text-[#dfe3f2] mb-3">&ldquo;{instr}&rdquo;</p>
                      <p className="font-dmmono text-[12.5px] flex items-start gap-2 mb-2">
                        <span className="text-[#F43F5E]">✗</span>
                        <span className="text-[#c98b9a]">{cmd}</span>
                      </p>
                      <p className="font-manrope text-xs text-[#7c84a8] italic">{note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════ USE IT ════════════════════ */}
          <section id="use" className="px-6 md:px-14 py-16 md:py-20 scroll-mt-24">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="06" title="Use it yourself" kicker="four portable files · CPU is enough" color="#34D399" />

              <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-8">
                <Reveal className="lg:col-span-6">
                  <LoopTerminal />
                </Reveal>

                <div className="lg:col-span-6 flex flex-col gap-4">
                  {[
                    ["01", "Clone & install", "Grab the repo and install the only two dependencies.", "git clone …/pentacmd · pip install torch tokenizers", "#A78BFA"],
                    ["02", "One-shot a command", "Pass a family hint and an English instruction; read the command back.", 'python inference.py git "…"', "#F97316"],
                    ["03", "Or go interactive", "Run inference.py with no args for an interactive prompt loop.", "python inference.py", "#38BDF8"],
                    ["04", "Bring the weights", "best_model.pt + tokenizer.json + modeling + inference — also on Hugging Face.", "huggingface.co/SumanDebnath943/PentaCMD-47M", "#FACC15"],
                  ].map(([n, t, d, code, c], i) => (
                    <Reveal key={n as string} delay={i * 0.05}>
                      <div className="group flex gap-4 rounded-2xl border border-white/[0.08] bg-[#080a14]/50 p-5 transition-colors" style={{ borderColor: undefined }}>
                        <span className="font-dmmono text-2xl font-medium leading-none transition-colors" style={{ color: `${c}66` }}>{n}</span>
                        <div className="min-w-0">
                          <p className="font-manrope font-semibold text-[#f3f4fb] text-[15px]">{t}</p>
                          <p className="font-manrope text-sm text-[#8b93b5] mt-1 leading-relaxed">{d}</p>
                          <p className="font-dmmono text-[11.5px] mt-2 break-all" style={{ color: c as string }}>{code}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* the four files */}
              <Reveal delay={0.06}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    ["best_model.pt", "~180 MB", "trained weights + config", "#A78BFA"],
                    ["tokenizer.json", "vocab 12k", "byte-level BPE tokenizer", "#38BDF8"],
                    ["modeling_pentacmd.py", "the GPT class", "model architecture", "#34D399"],
                    ["inference.py", "load + generate", "one-shot or interactive", "#FACC15"],
                  ].map(([f, meta, d, c], i) => (
                    <div key={i} className="rounded-xl border border-white/[0.07] bg-[#080a14]/50 p-4">
                      <p className="font-dmmono text-[12.5px] break-all" style={{ color: c as string }}>{f}</p>
                      <p className="font-dmmono text-[10px] text-[#5a6286] mt-1">{meta}</p>
                      <p className="font-manrope text-xs text-[#8b93b5] mt-2">{d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="grid lg:grid-cols-2 gap-6">
                <Reveal>
                  <CopyCommand
                    label="One-shot inference"
                    accent="#F97316"
                    lines={[
                      { kind: "comment", text: "# python inference.py <family> \"<instruction>\"" },
                      { text: 'python inference.py git "create a branch called payments and switch to it"' },
                      { kind: "out", text: "### Command: git switch -c payments" },
                      { text: 'python inference.py powershell "list the files in the Downloads folder"' },
                      { kind: "out", text: "### Command: Get-ChildItem Downloads" },
                    ]}
                    copyText={'python inference.py git "create a branch called payments and switch to it"'}
                  />
                </Reveal>
                <Reveal delay={0.06}>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-6 h-full">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#34D399] mb-5">Get the project</p>
                    <div className="flex flex-col gap-3">
                      <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 hover:border-[#A78BFA]/50 transition-colors">
                        <span className="flex items-center gap-3 min-w-0"><GitHubMark /><span className="font-dmmono text-[12px] text-[#dfe3f2] truncate">github.com/Sumandebnath943/pentacmd</span></span>
                        <span className="font-dmmono text-[10px] uppercase tracking-wider text-[#5a6286] shrink-0">MIT ↗</span>
                      </a>
                      <a href={HF} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 hover:border-[#FACC15]/50 transition-colors">
                        <span className="flex items-center gap-3 min-w-0"><HuggingFaceMark size={17} /><span className="font-dmmono text-[12px] text-[#dfe3f2] truncate">huggingface.co/SumanDebnath943/PentaCMD-47M</span></span>
                        <span className="font-dmmono text-[10px] uppercase tracking-wider text-[#5a6286] shrink-0">CC BY-NC ↗</span>
                      </a>
                      <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5">
                        <span className="flex items-center gap-3 min-w-0"><span aria-hidden>📊</span><span className="font-dmmono text-[12px] text-[#dfe3f2] truncate">Kaggle · cli-command-dataset · T4 notebook</span></span>
                        <span className="font-dmmono text-[10px] uppercase tracking-wider text-[#5a6286] shrink-0">DATA</span>
                      </div>
                    </div>
                    <p className="font-manrope text-xs text-[#7c84a8] mt-5 leading-relaxed">
                      Code is MIT. Weights &amp; synthetic data are CC BY-NC 4.0. The bash portion inherits
                      NL2Bash&rsquo;s own license — flagged in LICENSE, the README, and the model card.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ════════════════════ TECH SPEC — light section ════════════════════ */}
          <section className="relative px-6 md:px-14 py-20 md:py-24 bg-[#ECEDF6] text-[#15172e] overflow-hidden">
            <div aria-hidden className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(rgba(56,189,248,0.10) 0.7px, transparent 0.8px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 85%)", WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 85%)" }} />
            <div className="relative max-w-5xl mx-auto">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-dmmono text-[11px] border rounded px-1.5 py-0.5 leading-none text-[#0a7ea4] border-[#0a7ea4]/40">[ 07 ]</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a7ea4]" style={{ animation: "penta-blink 1.3s steps(1) infinite" }} />
                  <span className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#5a5f7e]">// verified · quick reference</span>
                </div>
                <h2 className="font-manrope font-semibold text-3xl md:text-[2.4rem] leading-none tracking-tight text-[#15172e]">The numbers</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-px rounded-2xl overflow-hidden border border-[#15172e]/10 bg-white/70 shadow-[0_30px_70px_-30px_rgba(20,15,60,0.25)]">
                {[
                  ["Parameters", "47.2M (baseline 20.0M)"],
                  ["Layers / heads / width", "8 / 10 / 640"],
                  ["Context length", "256 tokens"],
                  ["Tokenizer", "byte-level BPE · vocab 12,000"],
                  ["Dataset", "299,329 pairs · train 269,396 / val 14,967 / test 14,966"],
                  ["Train tokens", "~6.54M · leak-free 90/5/5"],
                  ["Optimizer", "AdamW · betas 0.9/0.95 · wd 0.1"],
                  ["LR schedule", "cosine 6e-4 → 6e-5 · 300 warmup"],
                  ["Training", "14,000 steps · ~53 min · 1× NVIDIA T4 (Kaggle)"],
                  ["Best checkpoint", "step 11,000 · selected by exact-match"],
                  ["Test exact-match", "git 100 · ps 98.7 · npm 97.3 · python 69.3 · bash 68.0"],
                  ["Blended", "~86.7% · test ≈ val (no overfitting)"],
                ].map(([k, v], i) => (
                  <div key={i} className="flex items-baseline justify-between gap-4 px-5 py-3.5 border-b border-[#15172e]/08" style={{ borderColor: "rgba(21,23,46,0.07)" }}>
                    <span className="font-dmmono text-[11px] uppercase tracking-[0.1em] text-[#6b7090] shrink-0">{k}</span>
                    <span className="font-dmmono text-[12.5px] text-[#15172e] text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════ LIMITATIONS + ROADMAP ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="08" title="Version 0, honestly" kicker="known gaps · what's next" color="#F43F5E" />
              <div className="grid lg:grid-cols-2 gap-6">
                {/* limitations */}
                <Reveal>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-6 h-full">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#F43F5E] mb-5">Where it lags &amp; why</p>
                    <ul className="space-y-4">
                      {[
                        ["python — 69.3%", "Trained on five installers (pip / uv / poetry / conda / pipx), so “install X” is genuinely ambiguous about which tool. Package names are also long and multi-token, which makes exact copying harder."],
                        ["bash — 68.0%", "The test includes research-hard NL2Bash pipelines (placeholder args, nested -exec). Synthetic beginner-bash scores high; NL2Bash drags the average. ~68% is near the realistic ceiling for that data."],
                        ["Plausible-but-wrong args", "The model can emit the right structure with a wrong argument — generated commands should be reviewed before running."],
                      ].map(([t, d], i) => (
                        <li key={i}>
                          <p className="font-manrope font-semibold text-[#f3f4fb] text-[15px]">{t}</p>
                          <p className="font-manrope text-sm text-[#8b93b5] mt-1 leading-relaxed">{d}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                {/* roadmap */}
                <Reveal delay={0.08}>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-6 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#34D399]">Version 1 — in progress</p>
                      <span className="font-dmmono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-[#34D399]/40 text-[#34D399]" style={{ animation: "penta-glow 2.4s ease-in-out infinite" }}>WIP</span>
                    </div>
                    <ul className="space-y-3.5">
                      {[
                        "Lift python 69 → 80s: regenerate data with pip as the dominant installer so “install X” is unambiguous.",
                        "Lift usable bash: more synthetic beginner-bash; down-weight or trim the hardest NL2Bash rows.",
                        "Scale further if warranted — more data and/or a larger model, same exact-match checkpointing.",
                        "Live demo: wrap inference.py’s command_for() in a small web UI.",
                        "Licensing: verify NL2Bash’s exact terms; loosen the model license if permitted.",
                      ].map((d, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="font-dmmono text-[12px] mt-0.5 shrink-0" style={{ color: SPECTRUM[i % SPECTRUM.length] }}>{`0${i + 1}`}</span>
                          <span className="font-manrope text-sm text-[#9aa2c8] leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ════════════════════ CLOSING CTA ════════════════════ */}
          <section className="px-6 md:px-14 pt-12 pb-32">
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-[2rem] border border-white/[0.14] bg-gradient-to-br from-[#3a1c66] via-[#123a63] to-[#0c5249] overflow-hidden">
                <div aria-hidden className="absolute inset-0">
                  <Image src="/pentacmd-images/gen-banner.png" alt="" fill className="object-cover opacity-40 mix-blend-screen" sizes="100vw" />
                </div>
                <div aria-hidden className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-full blur-[100px] opacity-50" style={{ background: "radial-gradient(ellipse at center, rgba(167,139,250,0.35), transparent 65%)", animation: "penta-drift 16s ease-in-out infinite" }} />
                <span aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SPECTRUM.join(",")}, transparent)` }} />
                <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center p-8 sm:p-12">
                  <div>
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.3em] text-[#C4B5FD] mb-5">open source · built from scratch</p>
                    <h2 className="font-manrope font-semibold text-3xl md:text-4xl tracking-tight text-white leading-tight mb-5">
                      Small model.{" "}
                      <span className="font-serif italic font-normal bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#86EFC4,#8FD6FB,#C4B5FD)" }}>Big utility.</span>
                    </h2>
                    <p className="font-manrope text-[#d8d9f4] max-w-md leading-relaxed mb-8">
                      Clone the repo, install two packages, and translate your first instruction in under
                      a minute. Weights, tokenizer, and model card are open on Hugging Face.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 rounded-full bg-[#A78BFA] text-black font-manrope font-semibold text-sm px-6 py-3 hover:brightness-110 transition-all duration-300">
                        <GitHubMark /> GitHub <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                      </a>
                      <a href={HF} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 rounded-full border border-[#FACC15]/40 text-[#f3f4fb] font-manrope font-medium text-sm px-6 py-3 hover:bg-[#FACC15]/10 transition-colors duration-300">
                        <HuggingFaceMark /> Hugging Face <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                      </a>
                    </div>
                  </div>

                  <div className="hidden md:block w-48 lg:w-56 shrink-0">
                    <Image src="/pentacmd-images/image 2.png" alt="PentaCMD — turn English into terminal commands, instantly." width={1254} height={1254} className="w-full h-auto rounded-2xl" />
                  </div>
                </div>
              </div>

              <p className="font-dmmono text-[11px] text-[#5a6286] text-center mt-10 tracking-wide">
                PentaCMD-47M · Version 0 released · Version 1 in progress · built by Suman Debnath
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </MotionProvider>
  );
}
