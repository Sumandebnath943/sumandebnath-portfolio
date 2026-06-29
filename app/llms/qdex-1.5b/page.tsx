import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Reveal, StatCounter, CopyCommand } from "@/components/penta/PentaWidgets";
import { QDEX, SPECTRUM, HUMANEVAL } from "@/components/qdex/qdex-data";
import { HumanEvalBars, ParamRing, LossSpark } from "@/components/qdex/QdexVisuals";

const GITHUB = "https://github.com/Sumandebnath943/Qdex-1.5B";
const HF = "https://huggingface.co/SumanDebnath943/Qdex-1.5B-GGUF";
const SITE_URL = "https://sumandebnath.houseofnamus.com";

export const metadata: Metadata = {
  title: "Qdex-1.5B — a 1.5B coding LLM, QLoRA-tuned to follow instructions and run locally (GGUF · CPU)",
  description:
    "Qdex-1.5B is an instruction-tuned coding model built on Qwen2.5-Coder-1.5B with QLoRA. Fine-tuning lifted instruction-mode HumanEval pass@1 from 1.2% to 39.0% (~32×), recovering ~97% of the base model's raw coding ability — and it runs locally on a 16GB no-GPU laptop via Ollama / llama.cpp (GGUF). Open weights on Hugging Face, code on GitHub.",
  keywords: [
    "Qdex-1.5B",
    "Qdex",
    "coding LLM",
    "instruction-tuned coding model",
    "QLoRA fine-tune",
    "Qwen2.5-Coder-1.5B",
    "HumanEval pass@1",
    "GGUF",
    "run LLM locally",
    "local coding assistant",
    "Ollama coding model",
    "llama.cpp",
    "Unsloth",
    "Hugging Face TRL",
    "LoRA adapters",
    "4-bit quantization",
    "CPU inference",
    "16GB laptop LLM",
    "Magicoder OSS-Instruct",
    "open weights model",
    "Suman Debnath",
  ],
  alternates: { canonical: "/llms/qdex-1.5b" },
  openGraph: {
    type: "website",
    title: "Qdex-1.5B · taught to answer when asked",
    description:
      "A 1.5B coding LLM, QLoRA-tuned on Qwen2.5-Coder-1.5B. Instruction-mode HumanEval pass@1: 1.2% → 39.0% (~32×), ~97% of the base model's raw ability — runs locally on CPU via GGUF.",
    url: "/llms/qdex-1.5b",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Qdex-1.5B — a small coding LLM that runs on your laptop." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qdex-1.5B · a 1.5B coding LLM that runs on your laptop",
    description:
      "QLoRA fine-tune of Qwen2.5-Coder-1.5B. Instruction-mode HumanEval: 1.2% → 39.0%. GGUF, runs on a 16GB no-GPU laptop. Open weights.",
    images: ["/og-image.png"],
  },
};

/* Structured data — SoftwareApplication + TechArticle for richer LLM SEO. */
const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Qdex-1.5B",
  alternateName: "Qdex-1.5B-GGUF",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Large Language Model (LLM) · coding assistant",
  operatingSystem: "Windows, macOS, Linux (CPU, 16GB RAM)",
  description:
    "An instruction-tuned 1.5B-parameter coding model built on Qwen2.5-Coder-1.5B with QLoRA, exported to GGUF to run locally on CPU via Ollama / llama.cpp.",
  url: `${SITE_URL}/llms/qdex-1.5b`,
  softwareVersion: "1.0",
  programmingLanguage: "Python",
  license: "https://opensource.org/license/apache-2-0",
  codeRepository: GITHUB,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE_URL },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  keywords:
    "coding LLM, QLoRA, instruction tuning, Qwen2.5-Coder, HumanEval, GGUF, Ollama, llama.cpp, local LLM",
};
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Qdex-1.5B — teaching a small coding model to answer when asked",
  description:
    "How a 1.5B coding model was instruction-tuned with QLoRA — lifting instruction-mode HumanEval pass@1 from 1.2% to 39.0%, recovering ~97% of the base model's raw coding ability, and exporting it to GGUF for local CPU use.",
  author: { "@type": "Person", name: "Suman Debnath", url: SITE_URL },
  mainEntityOfPage: `${SITE_URL}/llms/qdex-1.5b`,
  image: `${SITE_URL}/og-image.png`,
  keywords:
    "coding LLM, QLoRA, instruction tuning, Qwen2.5-Coder-1.5B, HumanEval pass@1, GGUF, Ollama, local inference, LoRA adapters",
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
  return <span aria-hidden style={{ fontSize: size }} className="leading-none">🤗</span>;
}

/* ── Section heading — HUD style (matches the SLM page) ──────────────────── */
function SectionLabel({ index, title, kicker, color = QDEX.emerald }: { index: string; title: string; kicker?: string; color?: string }) {
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
export default function QdexPage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Navigation />

      <main className="relative bg-[#05060b] text-[#dfe3f2] min-h-screen overflow-hidden selection:bg-[#34D399] selection:text-black">
        {/* ── Calm global ambient ── */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[150px] opacity-[0.10]" style={{ background: "radial-gradient(circle, #10B981, transparent 65%)" }} />
          <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-[0.08]" style={{ background: "radial-gradient(circle, #2563EB, transparent 65%)" }} />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(52,211,153,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(52,211,153,0.5) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="relative z-10">
          {/* ════════════════════ HERO ════════════════════ */}
          <section className="relative min-h-[100svh] flex flex-col pt-28 pb-8 px-6 md:px-14 overflow-hidden">
            <div className="flex-1 flex items-center justify-center w-full">
              <div className="max-w-4xl mx-auto flex flex-col items-center text-center w-full">
                <Reveal>
                  <div className="inline-flex items-center gap-2.5 font-dmmono text-[11px] uppercase tracking-[0.25em] text-[#9aa2c8] mb-7">
                    <span className="text-[#34D399]">┌─</span>
                    <span>Coding LLM · 1.5B params · QLoRA instruction-tune</span>
                    <span className="text-[#34D399]">─┐</span>
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <h1 className="mb-6">
                    <span className="block font-manrope font-semibold text-6xl sm:text-7xl md:text-[6.5rem] leading-none tracking-tight bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(100deg,#f3f4fb 10%,#34D399 55%,#38BDF8 95%)" }}>
                      Qdex-1.5B
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={0.12}>
                  <p
                    className="font-dmmono text-[12px] md:text-[13px] tracking-[0.42em] uppercase mb-6 bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(90deg, ${SPECTRUM.join(",")}, ${SPECTRUM[0]})`, backgroundSize: "200% auto", animation: "penta-spectrum 6s linear infinite" }}
                  >
                    Taught to answer when asked
                  </p>
                </Reveal>

                <Reveal delay={0.18}>
                  <p className="font-manrope text-lg md:text-xl leading-relaxed text-[#b8bedb] max-w-2xl mb-7">
                    A 1.5B-parameter coding model, instruction-tuned with{" "}
                    <span className="text-[#f3f4fb]">QLoRA</span> to follow coding requests — small enough to run{" "}
                    <span className="text-[#f3f4fb]">locally on a 16GB laptop with no GPU</span>. Fine-tuning lifted
                    instruction-mode HumanEval from{" "}
                    <span className="text-[#F43F5E] font-medium">1.2%</span> to{" "}
                    <span className="text-[#34D399] font-medium">39.0%</span> — a{" "}
                    <span className="text-[#38BDF8] font-medium">~32×</span> jump.
                  </p>
                </Reveal>

                {/* badge chips */}
                <Reveal delay={0.22}>
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                    {[
                      ["1.5B params", QDEX.emerald],
                      ["QLoRA fine-tune", QDEX.violet],
                      ["Base: Qwen2.5-Coder-1.5B", QDEX.sky],
                      ["GGUF · runs on CPU", QDEX.amber],
                      ["Apache-2.0", "#9aa2c8"],
                    ].map(([t, c]) => (
                      <span key={t} className="font-dmmono text-[10.5px] uppercase tracking-[0.12em] rounded-full border px-3 py-1.5" style={{ color: c, borderColor: `${c}44` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.28}>
                  <div className="flex flex-col sm:flex-row items-center gap-3.5">
                    <a href={HF} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 rounded-full bg-[#34D399] text-black font-manrope font-semibold text-sm px-6 py-3 hover:brightness-110 transition-all duration-300">
                      <HuggingFaceMark /> Download the model (GGUF)
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                    </a>
                    <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 text-[#f3f4fb] font-manrope font-medium text-sm px-6 py-3 hover:bg-white/[0.04] hover:border-white/30 transition-colors duration-300">
                      <GitHubMark /> View code on GitHub
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                    </a>
                    <a href="#use" className="inline-flex items-center gap-2 rounded-full border border-white/12 text-[#dfe3f2] font-manrope font-medium text-sm px-6 py-3 hover:border-white/30 hover:bg-white/[0.03] transition-colors duration-300">
                      Run it <span>↓</span>
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.4} className="shrink-0 mt-16 flex justify-center">
              <span className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#5a6286] flex flex-col items-center gap-1.5">
                scroll
                <span className="block w-px h-6 bg-gradient-to-b from-[#34D399] to-transparent" />
              </span>
            </Reveal>
          </section>

          {/* ════════════════════ TL;DR STAT BAND ════════════════════ */}
          <section className="px-6 md:px-14 pt-2 pb-12">
            <Reveal className="max-w-3xl mx-auto text-center mb-10">
              <p className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#5a6286] mb-4">// tl;dr — the headline result</p>
              <p className="font-manrope text-lg md:text-xl text-[#c4cae6] leading-relaxed">
                Fine-tuning took this model from <span className="text-[#F43F5E] font-medium">1.2%</span> to{" "}
                <span className="text-[#34D399] font-medium">39.0%</span> on HumanEval (pass@1) in
                instruction-following mode. In doing so it recovered{" "}
                <span className="text-[#f3f4fb] font-medium">~97% of the base model&rsquo;s raw coding ability</span>{" "}
                (39.0% vs 40.2%), while making that ability actually usable through natural instructions. The
                fine-tune didn&rsquo;t teach the model new programming knowledge — it taught it to{" "}
                <span className="font-serif italic text-[#34D399]">answer when asked</span>.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.06]">
                {[
                  { v: <><StatCounter value={1.2} decimals={1} suffix="→39" /></>, l: "HumanEval pass@1 (instruct)", c: "#34D399" },
                  { v: <StatCounter value={32} suffix="×" />, l: "instruction-mode jump", c: "#38BDF8" },
                  { v: <StatCounter value={97} suffix="%" />, l: "of base ability recovered", c: "#A78BFA" },
                  { v: <StatCounter value={1.18} decimals={2} suffix="%" />, l: "params trained (QLoRA)", c: "#FACC15" },
                  { v: <StatCounter value={1} suffix=" GB" />, l: "GGUF · runs on CPU", c: "#F97316" },
                  { v: <StatCounter value={0} prefix="₹" />, l: "cost · free T4 GPU", c: "#F43F5E" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#070912] p-5 flex flex-col items-center text-center">
                    <span className="font-manrope font-semibold text-2xl md:text-[1.7rem] tabular-nums" style={{ color: s.c }}>{s.v}</span>
                    <span className="font-dmmono text-[9.5px] uppercase tracking-[0.12em] text-[#7c84a8] mt-1.5 leading-tight">{s.l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ════════════════════ WHAT IT IS — light section ════════════════════ */}
          <section className="relative px-6 md:px-14 py-20 md:py-28 bg-[#ECEDF6] text-[#15172e] overflow-hidden">
            <div aria-hidden className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(rgba(16,185,129,0.12) 0.7px, transparent 0.8px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 85%)", WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 85%)" }} />
            <div className="relative max-w-5xl mx-auto grid md:grid-cols-12 gap-10 md:gap-14 items-center">
              <Reveal className="md:col-span-7">
                <p className="font-dmmono text-[11px] uppercase tracking-[0.3em] text-[#0a8f5f] mb-6">// what it is</p>
                <h2 className="font-manrope font-semibold text-3xl md:text-[2.5rem] leading-[1.16] tracking-tight text-[#15172e]">
                  The base model already knew how to code. It just couldn&rsquo;t{" "}
                  <span className="font-serif italic font-normal text-[#0a8f5f]">answer</span>.
                </h2>
                <p className="font-manrope text-lg text-[#3b3f5c] leading-relaxed mt-7 max-w-xl">
                  Qdex-1.5B is an instruction-tuned coding assistant built on Alibaba&rsquo;s{" "}
                  <span className="text-[#15172e] font-semibold">Qwen2.5-Coder-1.5B</span> — the pre-trained{" "}
                  <em>base</em> version (Apache-2.0). That base &ldquo;knew&rdquo; a lot of code, but only knew how
                  to <span className="text-[#15172e] font-semibold">continue text</span>; it couldn&rsquo;t reliably
                  respond to &ldquo;write a function that&hellip;&rdquo;.
                </p>
                <p className="font-manrope text-base text-[#5a5f7e] leading-relaxed mt-5 max-w-xl">
                  I instruction-tuned it so it behaves like a proper coding assistant, then exported it to{" "}
                  <span className="text-[#15172e] font-semibold">GGUF</span> so it runs on an ordinary laptop — no
                  GPU — via Ollama or llama.cpp.
                </p>
              </Reveal>

              {/* completion vs instruction card — stays dark */}
              <Reveal delay={0.1} className="md:col-span-5">
                <div className="relative rounded-2xl border border-white/[0.09] bg-[#080a14] p-6 overflow-hidden shadow-[0_30px_60px_-25px_rgba(20,15,60,0.45)]">
                  <span aria-hidden className="absolute -top-px left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SPECTRUM.join(",")}, transparent)` }} />
                  <p className="font-dmmono text-[10px] uppercase tracking-[0.25em] text-[#5a6286] mb-5">same model · two ways of asking</p>
                  <div className="font-dmmono text-[12px] leading-relaxed space-y-3">
                    <div>
                      <p className="text-[#5a6286]">// raw completion — &ldquo;continue this&rdquo;</p>
                      <p className="text-[#e6e9f5]">def is_palindrome(s):</p>
                      <p className="flex items-center gap-2 pt-1"><span className="text-[#38BDF8]">→</span><span className="text-[#38BDF8]">works — 40.2%</span></p>
                    </div>
                    <div className="pt-2 border-t border-white/[0.07]">
                      <p className="text-[#5a6286]">// instruction — &ldquo;write a function that&hellip;&rdquo;</p>
                      <p className="text-[#e6e9f5]">base: <span className="text-[#F43F5E]">✗ rambles · 1.2%</span></p>
                      <p className="text-[#e6e9f5]">Qdex: <span className="text-[#34D399]">✓ answers · 39.0%</span></p>
                    </div>
                  </div>
                  <p className="font-manrope text-xs text-[#7c84a8] mt-5 leading-relaxed">
                    The ability was always there. The fine-tune unlocked the door to it.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ BEFORE & AFTER (the key visual) ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="01" title="Before &amp; after — the honest numbers" kicker="HumanEval · pass@1 · greedy · n=1 · 164 problems" color={QDEX.emerald} />
              <Reveal>
                <p className="font-manrope text-base md:text-lg text-[#8b93b5] max-w-2xl mb-12 leading-relaxed">
                  The base model was measured <span className="text-[#dfe3f2]">two ways</span> on purpose — raw
                  completion <em>and</em> instruction — so the before/after is a fair, apples-to-apples comparison.
                  Greedy decoding, one sample per problem. An honest, reproducible measurement, not a
                  leaderboard-tuned number.
                </p>
              </Reveal>

              <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                {/* the bar chart */}
                <Reveal>
                  <div className="relative h-full rounded-2xl border border-white/[0.08] bg-[#080a14]/95 backdrop-blur-md p-6 sm:p-7">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#34D399] mb-2">HumanEval pass@1</p>
                    <HumanEvalBars />
                  </div>
                </Reveal>

                {/* the table */}
                <Reveal delay={0.1}>
                  <div className="relative h-full rounded-2xl border border-white/[0.08] bg-[#080a14]/95 backdrop-blur-md p-6 sm:p-7 flex flex-col">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#38BDF8] mb-5">The three measurements</p>
                    <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                      {HUMANEVAL.map((b) => (
                        <div key={b.key} className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-white/[0.05] last:border-b-0" style={{ background: b.highlight ? `${b.color}0f` : undefined }}>
                          <div className="min-w-0">
                            <p className="font-dmmono text-[12px] truncate" style={{ color: b.color }}>{b.model}</p>
                            <p className="font-dmmono text-[10px] text-[#5a6286] mt-0.5">{b.mode}</p>
                          </div>
                          <p className="font-manrope font-semibold tabular-nums text-right shrink-0" style={{ color: b.color }}>
                            {b.pct}%<span className="font-dmmono text-[10px] text-[#5a6286] ml-1.5">{b.ratio}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="font-manrope text-sm text-[#8b93b5] mt-5 leading-relaxed">
                      The base model could code (40.2% in completion mode — which also matches the published paper,
                      confirming the harness is sound), but was nearly useless when actually{" "}
                      <em className="text-[#dfe3f2]">asked</em> (1.2%). After fine-tuning, Qdex answers coding
                      requests at <span className="text-[#34D399] font-medium">39.0%</span> — almost the model&rsquo;s
                      full latent ability, now reachable through instructions.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ════════════════════ HOW IT WAS BUILT — QLoRA ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="02" title="How it was built" kicker="method · QLoRA" color={QDEX.violet} />
              <Reveal>
                <p className="font-manrope text-base md:text-lg text-[#8b93b5] max-w-2xl mb-12 leading-relaxed">
                  <span className="text-[#A78BFA] font-medium">QLoRA</span> — Quantized Low-Rank Adaptation. Load the
                  base model in 4-bit to shrink its memory ~4×, freeze all of it, and train only tiny adapter
                  matrices on top. Cheap, fast, and it fits on a single free GPU.
                </p>
              </Reveal>

              <div className="grid lg:grid-cols-2 gap-6 items-stretch mb-6">
                {/* QLoRA explainer cards */}
                <Reveal className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-6">
                    <p className="font-dmmono text-[12px] mb-2" style={{ color: QDEX.sky }}>Q — 4-bit quantization</p>
                    <p className="font-manrope text-sm text-[#8b93b5] leading-relaxed">
                      The base model is loaded in 4-bit, cutting its memory footprint ~4× so it fits on a small,
                      free GPU.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-6">
                    <p className="font-dmmono text-[12px] mb-2" style={{ color: QDEX.violet }}>LoRA — adapters</p>
                    <p className="font-manrope text-sm text-[#8b93b5] leading-relaxed">
                      The base is frozen; only low-rank adapter matrices train. That&rsquo;s what makes the
                      fine-tune cheap and fast.
                    </p>
                  </div>
                  <div className="sm:col-span-2 rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-6">
                    <ParamRing />
                  </div>
                </Reveal>

                {/* pipeline + loss */}
                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-6 sm:p-7 h-full flex flex-col">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#FACC15] mb-5">The pipeline</p>
                    <ol className="space-y-3 mb-7">
                      {[
                        "Benchmark the base model (both modes)",
                        "Instruction-tune with QLoRA",
                        "Merge the adapter into the base",
                        "Benchmark the fine-tuned model",
                        "Export to GGUF for local use",
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="font-dmmono text-[11px] w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5" style={{ color: SPECTRUM[i % SPECTRUM.length], borderColor: `${SPECTRUM[i % SPECTRUM.length]}66` }}>{i + 1}</span>
                          <span className="font-manrope text-sm text-[#c4cae6] leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-auto pt-5 border-t border-white/[0.08]">
                      <p className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] text-[#FACC15] mb-3">Training loss · trajectory</p>
                      <LossSpark />
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.05}>
                <p className="font-manrope text-sm text-[#7c84a8] leading-relaxed max-w-3xl">
                  <span className="text-[#dfe3f2]">Tooling:</span> Unsloth (fast single-GPU QLoRA) · Hugging Face TRL
                  (supervised fine-tuning) · llama.cpp (GGUF export).
                </p>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ TRAINING DETAILS — light section ════════════════════ */}
          <section className="relative px-6 md:px-14 py-20 md:py-24 bg-[#ECEDF6] text-[#15172e] overflow-hidden">
            <div aria-hidden className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(rgba(56,189,248,0.10) 0.7px, transparent 0.8px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 85%)", WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 85%)" }} />
            <div className="relative max-w-5xl mx-auto">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-dmmono text-[11px] border rounded px-1.5 py-0.5 leading-none text-[#0a7ea4] border-[#0a7ea4]/40">[ 03 ]</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a7ea4]" style={{ animation: "penta-blink 1.3s steps(1) infinite" }} />
                  <span className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#5a5f7e]">// reproducible · quick reference</span>
                </div>
                <h2 className="font-manrope font-semibold text-3xl md:text-[2.4rem] leading-none tracking-tight text-[#15172e]">Training details</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-px rounded-2xl overflow-hidden border border-[#15172e]/10 bg-white/70 shadow-[0_30px_70px_-30px_rgba(20,15,60,0.25)]">
                {[
                  ["Base model", "Qwen2.5-Coder-1.5B (Apache-2.0)"],
                  ["Dataset", "Magicoder-OSS-Instruct-75K · 20,000-example slice"],
                  ["Decontamination", "HumanEval-decontaminated split — no answer leakage"],
                  ["Prompt format", "Qwen ChatML (system / user / assistant)"],
                  ["Trainable params", "18.5M / 1.56B (1.18%)"],
                  ["LoRA rank / alpha / dropout", "16 / 32 / 0.0"],
                  ["Target modules", "all 7 linear layers (q, k, v, o, gate, up, down)"],
                  ["Epochs / steps", "2 / 5,000"],
                  ["Effective batch size", "8 (batch 2 × grad-accum 4)"],
                  ["LR / schedule", "2e-4 · cosine · 3% warmup"],
                  ["Max sequence length", "2,048 tokens"],
                  ["Optimizer / precision", "adamw_8bit / fp16"],
                  ["Hardware", "1× NVIDIA Tesla T4 (16GB) · Kaggle free tier"],
                  ["Training time", "~4 h 55 m · final loss ~0.53 (from ~1.06)"],
                ].map(([k, v], i) => (
                  <div key={i} className="flex items-baseline justify-between gap-4 px-5 py-3.5 border-b" style={{ borderColor: "rgba(21,23,46,0.07)" }}>
                    <span className="font-dmmono text-[11px] uppercase tracking-[0.1em] text-[#6b7090] shrink-0">{k}</span>
                    <span className="font-dmmono text-[12.5px] text-[#15172e] text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════ RUN IT LOCALLY ════════════════════ */}
          <section id="use" className="px-6 md:px-14 py-16 md:py-20 scroll-mt-24">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="04" title="Run it locally" kicker="Ollama · CPU is enough" color={QDEX.amber} />
              <Reveal>
                <p className="font-manrope text-base md:text-lg text-[#8b93b5] max-w-2xl mb-12 leading-relaxed">
                  Download <code className="font-dmmono text-[13px] text-[#dfe3f2]">merged.Q4_K_M.gguf</code> (~1 GB —
                  the 4-bit build recommended for a 16GB laptop; there&rsquo;s also a slightly higher-quality{" "}
                  <code className="font-dmmono text-[13px] text-[#dfe3f2]">merged.Q5_K_M.gguf</code>, ~1.2 GB). Create a{" "}
                  <code className="font-dmmono text-[13px] text-[#dfe3f2]">Modelfile</code>, then run.
                </p>
              </Reveal>

              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <Reveal>
                  <CopyCommand
                    label="Modelfile"
                    accent={QDEX.amber}
                    lines={[
                      { kind: "comment", text: "# Modelfile" },
                      { text: "FROM ./merged.Q4_K_M.gguf" },
                      { kind: "comment", text: "# Qwen ChatML template (what it was trained on)" },
                      { text: 'TEMPLATE """{{ if .System }}<|im_start|>system' },
                      { text: "{{ .System }}<|im_end|>" },
                      { text: "{{ end }}<|im_start|>user" },
                      { text: "{{ .Prompt }}<|im_end|>" },
                      { text: "<|im_start|>assistant" },
                      { text: '"""' },
                      { text: 'PARAMETER stop "<|im_end|>"' },
                      { text: 'SYSTEM "You are a helpful coding assistant."' },
                    ]}
                    copyText={
                      'FROM ./merged.Q4_K_M.gguf\nTEMPLATE """{{ if .System }}<|im_start|>system\n{{ .System }}<|im_end|>\n{{ end }}<|im_start|>user\n{{ .Prompt }}<|im_end|>\n<|im_start|>assistant\n"""\nPARAMETER stop "<|im_end|>"\nSYSTEM "You are a helpful coding assistant. Respond with clean, correct, well-structured code and brief explanations."'
                    }
                  />
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="flex flex-col gap-6">
                    <CopyCommand
                      label="Create & run"
                      accent={QDEX.emerald}
                      lines={[
                        { kind: "comment", text: "# build the model from the Modelfile" },
                        { text: "ollama create qdex-1.5b -f Modelfile" },
                        { kind: "comment", text: "# ask it something" },
                        { text: 'ollama run qdex-1.5b \\' },
                        { text: '  "Write a Python function that checks' },
                        { text: '   if a string is a palindrome."' },
                      ]}
                      copyText={
                        'ollama create qdex-1.5b -f Modelfile\nollama run qdex-1.5b "Write a Python function that checks if a string is a palindrome."'
                      }
                    />
                    <div className="rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-6">
                      <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#34D399] mb-5">Get the model</p>
                      <div className="flex flex-col gap-3">
                        <a href={HF} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 hover:border-[#34D399]/50 transition-colors">
                          <span className="flex items-center gap-3 min-w-0"><HuggingFaceMark size={17} /><span className="font-dmmono text-[12px] text-[#dfe3f2] truncate">huggingface.co/SumanDebnath943/Qdex-1.5B-GGUF</span></span>
                          <span className="font-dmmono text-[10px] uppercase tracking-wider text-[#5a6286] shrink-0">GGUF ↗</span>
                        </a>
                        <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 hover:border-[#A78BFA]/50 transition-colors">
                          <span className="flex items-center gap-3 min-w-0"><GitHubMark /><span className="font-dmmono text-[12px] text-[#dfe3f2] truncate">github.com/Sumandebnath943/Qdex-1.5B</span></span>
                          <span className="font-dmmono text-[10px] uppercase tracking-wider text-[#5a6286] shrink-0">Apache-2.0 ↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ════════════════════ ENGINEERING CHALLENGES — vibrant ════════════════════ */}
          <section className="relative px-6 md:px-14 py-20 md:py-24 overflow-hidden bg-gradient-to-br from-[#0c3b34] via-[#103a58] to-[#241a57]">
            <div aria-hidden className="absolute inset-0 -z-0">
              <span className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SPECTRUM.join(",")}, transparent)` }} />
              <span className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SPECTRUM.join(",")}, transparent)` }} />
            </div>
            <div className="relative max-w-5xl mx-auto">
              <SectionLabel index="05" title="The first two runs were lost" kicker="engineering challenges · fault tolerance" color="#86EFC4" />
              <Reveal>
                <p className="font-manrope text-base md:text-lg text-[#d8d9f4] max-w-3xl mb-12 leading-relaxed">
                  Training ran on a free, time-limited cloud GPU — and the first two runs were lost. Each time,
                  training actually <em>finished</em>, but the session ended (a power cut at home) before the model
                  was saved, and the platform&rsquo;s default &ldquo;No Persistence&rdquo; setting wiped the working
                  directory. So I rebuilt the pipeline to assume the session could die at any moment.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
                  {[
                    ["Checkpoint every 200 steps", "A dropped session loses minutes, not hours.", "#86EFC4"],
                    ["Persistence: Files only", "Saved files survive a session ending.", "#8FD6FB"],
                    ["One-command resume", "Restart from the latest checkpoint instantly.", "#C4B5FD"],
                    ["Immediate off-platform backup", "Push to Hugging Face the moment training finishes.", "#FBE07A"],
                  ].map(([t, d, c], i) => (
                    <div key={i} className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-dmmono text-[11px] w-6 h-6 rounded-full border flex items-center justify-center shrink-0" style={{ color: c as string, borderColor: `${c}88` }}>{i + 1}</span>
                        <span className="flex-1 h-px" style={{ background: `${c}44` }} />
                      </div>
                      <p className="font-manrope font-semibold text-white text-[15px] mb-1.5">{t}</p>
                      <p className="font-manrope text-sm text-[#c5c7ea] leading-relaxed">{d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex items-start gap-3 mt-10 font-dmmono text-[11.5px] text-[#d8d9f4] border-l-2 border-[#86EFC4]/60 pl-4 py-1">
                  <span className="text-[#86EFC4] text-base leading-none mt-0.5">↻</span>
                  <span>The third run completed and every artifact survived. The lesson — assume the session can die at any moment — is what separates a notebook that works once from a pipeline you can trust.</span>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ════════════════════ LIMITATIONS + WHAT'S NEXT ════════════════════ */}
          <section className="px-6 md:px-14 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <SectionLabel index="06" title="Stated honestly" kicker="limitations · what's next" color={QDEX.rose} />
              <div className="grid lg:grid-cols-2 gap-6">
                <Reveal>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-6 h-full">
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#F43F5E] mb-5">Limitations</p>
                    <ul className="space-y-4">
                      {[
                        ["It's a small model", "Genuinely useful on focused, well-specified coding tasks — but not a frontier model. It won't replace GPT/Claude on complex, multi-step problems."],
                        ["Single-benchmark measurement", "The reported score is HumanEval only, greedy decoding, one sample per problem. An honest, reproducible number — not a leaderboard-tuned one."],
                      ].map(([t, d], i) => (
                        <li key={i}>
                          <p className="font-manrope font-semibold text-[#f3f4fb] text-[15px]">{t}</p>
                          <p className="font-manrope text-sm text-[#8b93b5] mt-1 leading-relaxed">{d}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#080a14]/60 p-6 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <p className="font-dmmono text-[11px] uppercase tracking-[0.2em] text-[#34D399]">What&rsquo;s next — Phase 2</p>
                      <span className="font-dmmono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-[#34D399]/40 text-[#34D399]" style={{ animation: "penta-glow 2.4s ease-in-out infinite" }}>WIP</span>
                    </div>
                    <ul className="space-y-4">
                      {[
                        ["v2 — a data experiment", "Retrain with an added, decontaminated slice of NVIDIA's OpenCodeInstruct (solutions ship with test cases + quality scores), then re-run the same HumanEval benchmark. A controlled, data-driven comparison — not guesswork."],
                        ["Project 3 — the agent", "Qdex-1.5B is the engine for a local CLI coding agent that runs entirely on a 16GB no-GPU laptop via Ollama. This model was built specifically to make that agent possible."],
                      ].map(([t, d], i) => (
                        <li key={i} className="flex gap-3">
                          <span className="font-dmmono text-[12px] mt-0.5 shrink-0" style={{ color: SPECTRUM[i % SPECTRUM.length] }}>{`0${i + 1}`}</span>
                          <div>
                            <p className="font-manrope font-semibold text-[#f3f4fb] text-[15px]">{t}</p>
                            <p className="font-manrope text-sm text-[#8b93b5] mt-1 leading-relaxed">{d}</p>
                          </div>
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
              <div className="relative rounded-[2rem] border border-white/[0.14] bg-gradient-to-br from-[#0c5249] via-[#123a63] to-[#3a1c66] overflow-hidden">
                <div aria-hidden className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-full blur-[100px] opacity-50" style={{ background: "radial-gradient(ellipse at center, rgba(52,211,153,0.32), transparent 65%)", animation: "penta-drift 16s ease-in-out infinite" }} />
                <span aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SPECTRUM.join(",")}, transparent)` }} />
                <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center p-8 sm:p-12">
                  <div>
                    <p className="font-dmmono text-[11px] uppercase tracking-[0.3em] text-[#86EFC4] mb-5">open weights · Apache-2.0</p>
                    <h2 className="font-manrope font-semibold text-3xl md:text-4xl tracking-tight text-white leading-tight mb-5">
                      Small model.{" "}
                      <span className="font-serif italic font-normal bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#86EFC4,#8FD6FB,#C4B5FD)" }}>Runs on your laptop.</span>
                    </h2>
                    <p className="font-manrope text-[#d8d9f4] max-w-md leading-relaxed mb-8">
                      Download the ~1 GB GGUF, point Ollama at it, and ask your first coding question in under a
                      minute — no GPU required. Weights and model card are open on Hugging Face.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href={HF} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 rounded-full bg-[#34D399] text-black font-manrope font-semibold text-sm px-6 py-3 hover:brightness-110 transition-all duration-300">
                        <HuggingFaceMark /> Hugging Face <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                      </a>
                      <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 text-[#f3f4fb] font-manrope font-medium text-sm px-6 py-3 hover:bg-white/[0.06] transition-colors duration-300">
                        <GitHubMark /> GitHub <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                      </a>
                    </div>
                  </div>

                  <div className="hidden md:flex w-44 lg:w-52 shrink-0 aspect-square rounded-2xl border border-white/15 bg-[#06120f]/60 items-center justify-center">
                    <span className="font-manrope font-semibold text-2xl bg-clip-text text-transparent text-center leading-tight" style={{ backgroundImage: "linear-gradient(120deg,#34D399,#38BDF8)" }}>
                      1.2%<br /><span className="text-white/40 text-base">→</span><br />39.0%
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-dmmono text-[11px] text-[#5a6286] text-center mt-10 tracking-wide">
                Qdex-1.5B · QLoRA fine-tune of Qwen2.5-Coder-1.5B · Apache-2.0 · built by Suman Debnath
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </MotionProvider>
  );
}
