"use client";

import { useEffect, useRef, useState } from "react";
import { FAMILIES, FamilyKey, SPECTRUM } from "./penta-data";

/* ════════════════════════════════════════════════════════════════════════
   SignalField — premium ambient backdrop: a soft spectrum halo behind the
   wordmark, a faint pentagon watermark, slow flowing probability-wave
   contours, and a fine dot-matrix. Deterministic (no random) for SSR parity.
   ════════════════════════════════════════════════════════════════════════ */
const PENTAGON = "0,-1 0.951,-0.309 0.588,0.809 -0.588,0.809 -0.951,-0.309";

// One smooth sine wave, sampled across a 2400-wide canvas (2× the 1200 viewBox)
// so a -50% translate loops seamlessly. wl divides 1200 evenly for periodicity.
function wave(baseY: number, amp: number, wl: number, phase: number) {
  let d = "";
  for (let x = 0; x <= 2400; x += 12) {
    const y = baseY + amp * Math.sin((2 * Math.PI * x) / wl + phase);
    d += `${x === 0 ? "M" : "L"} ${x} ${y.toFixed(1)} `;
  }
  return d;
}

export function NeuralField() {
  const waves = [
    { y: 200, amp: 42, wl: 600, ph: 0, c: "#7B61FF", w: 1.4, dur: 26 },
    { y: 300, amp: 56, wl: 400, ph: 1.1, c: "#38BDF8", w: 1.1, dur: 34 },
    { y: 400, amp: 34, wl: 600, ph: 2.2, c: "#34D399", w: 1.1, dur: 30 },
    { y: 250, amp: 64, wl: 1200, ph: 0.6, c: "#F43F5E", w: 0.9, dur: 44 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft spectrum halo behind the wordmark */}
      <div
        className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[52vh] rounded-full blur-[90px] opacity-[0.16]"
        style={{ background: "conic-gradient(from 200deg at 50% 50%, #7B61FF, #38BDF8, #34D399, #FACC15, #F43F5E, #7B61FF)", animation: "penta-spin 60s linear infinite" }}
      />
      <div
        className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full blur-[70px] opacity-[0.12]"
        style={{ background: "radial-gradient(circle, #0a0c1a, transparent 70%)" }}
      />

      {/* faint pentagon watermark */}
      <svg className="absolute left-1/2 top-[33%] -translate-x-1/2 -translate-y-1/2 w-[44vh] h-[44vh] opacity-[0.07]" viewBox="-1.15 -1.15 2.3 2.3">
        <polygon points={PENTAGON} fill="none" stroke="url(#penta-line)" strokeWidth="0.01" />
        <polygon points={PENTAGON} fill="none" stroke="url(#penta-line)" strokeWidth="0.006" transform="scale(0.6)" />
        <defs>
          <linearGradient id="penta-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#A78BFA" />
            <stop offset="0.5" stopColor="#38BDF8" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>

      {/* flowing probability-wave contours */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.4]" viewBox="0 0 1200 600" preserveAspectRatio="none">
        {waves.map((wv, i) => (
          <g key={i} style={{ animation: `penta-wave ${wv.dur}s linear infinite` }}>
            <path d={wave(wv.y, wv.amp, wv.wl, wv.ph)} fill="none" stroke={wv.c} strokeWidth={wv.w} strokeLinecap="round" opacity={0.55} />
          </g>
        ))}
      </svg>

      {/* fine dot-matrix — premium blueprint texture */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(167,139,250,0.5) 0.6px, transparent 0.7px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 35%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 35%, black, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SpectrumMarquee — looping ticker band, each item tinted across the spectrum.
   ════════════════════════════════════════════════════════════════════════ */
export function SpectrumMarquee({ items, duration = 34 }: { items: string[]; duration?: number }) {
  const seq = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-4 border-y border-white/[0.08] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max items-center gap-8 whitespace-nowrap" style={{ animation: `penta-marquee ${duration}s linear infinite` }}>
        {seq.map((it, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-dmmono text-sm uppercase tracking-[0.3em]" style={{ color: SPECTRUM[i % SPECTRUM.length] }}>
              {it}
            </span>
            <span className="text-white/20 text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   TranslationConsole — hero centrepiece. Types an English instruction, shows
   the model "thinking", then streams the predicted command. Cycles families,
   each tinted its own hue. These are REAL verified model outputs.
   ════════════════════════════════════════════════════════════════════════ */
const EXAMPLES: { family: FamilyKey; instruction: string; command: string }[] = [
  { family: "git", instruction: "undo my last commit but keep my changes", command: "git reset --soft HEAD~1" },
  { family: "git", instruction: "create a branch called payments and switch to it", command: "git switch -c payments" },
  { family: "npm", instruction: "install the express package", command: "npm install express" },
  { family: "python", instruction: "create a virtual environment", command: "python -m venv venv" },
  { family: "powershell", instruction: "list the files in the Downloads folder", command: "Get-ChildItem Downloads" },
  { family: "bash", instruction: "find all text files in the current folder", command: 'find . -type f -name "*.txt"' },
];

type Phase = "instr" | "think" | "cmd" | "hold";

export function TranslationConsole() {
  const [idx, setIdx] = useState(0);
  const [instr, setInstr] = useState("");
  const [cmd, setCmd] = useState("");
  const [phase, setPhase] = useState<Phase>("instr");

  const ex = EXAMPLES[idx];
  const fam = FAMILIES[ex.family];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "instr") {
      if (instr.length < ex.instruction.length)
        t = setTimeout(() => setInstr(ex.instruction.slice(0, instr.length + 1)), 26);
      else t = setTimeout(() => setPhase("think"), 480);
    } else if (phase === "think") {
      t = setTimeout(() => setPhase("cmd"), 950);
    } else if (phase === "cmd") {
      if (cmd.length < ex.command.length)
        t = setTimeout(() => setCmd(ex.command.slice(0, cmd.length + 1)), 42);
      else t = setTimeout(() => setPhase("hold"), 2000);
    } else {
      t = setTimeout(() => {
        setInstr("");
        setCmd("");
        setPhase("instr");
        setIdx((i) => (i + 1) % EXAMPLES.length);
      }, 500);
    }
    return () => clearTimeout(t);
  }, [phase, instr, cmd, idx, ex.instruction, ex.command]);

  return (
    <div
      className="relative rounded-2xl border bg-[#080a14]/90 backdrop-blur-sm shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] overflow-hidden transition-colors duration-700"
      style={{ borderColor: `${fam.color}55` }}
    >
      {/* scanning beam */}
      <span
        aria-hidden
        className="absolute left-0 right-0 h-20 pointer-events-none z-0"
        style={{ background: `linear-gradient(to bottom, transparent, ${fam.color}1f, transparent)`, animation: "penta-sweep 5s linear infinite" }}
      />
      {/* title bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]/70" />
          <span className="ml-2 font-dmmono text-[10.5px] text-[#8b93b5]">pentacmd · inference.py</span>
        </div>
        <div className="flex items-center gap-2 font-dmmono text-[10px] uppercase tracking-[0.18em]">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: fam.color, animation: "penta-blink 1.2s steps(1) infinite" }} />
          <span style={{ color: fam.color }}>{fam.label}</span>
        </div>
      </div>

      {/* body */}
      <div className="relative z-10 p-5 sm:p-7 font-dmmono text-left min-h-[210px]">
        {/* family selector row */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(Object.keys(FAMILIES) as FamilyKey[]).map((k) => {
            const on = k === ex.family;
            return (
              <span
                key={k}
                className="px-2.5 py-1 rounded-md text-[11px] border transition-all duration-500"
                style={{
                  color: on ? "#05060b" : FAMILIES[k].color,
                  background: on ? FAMILIES[k].color : "transparent",
                  borderColor: `${FAMILIES[k].color}55`,
                }}
              >
                {FAMILIES[k].label}
              </span>
            );
          })}
        </div>

        {/* prompt */}
        <p className="text-[12.5px] sm:text-[13.5px] leading-relaxed">
          <span className="text-[#5a6286]">### Task ({ex.family}): </span>
          <span className="text-[#e6e9f5]" suppressHydrationWarning>
            {instr}
            {phase === "instr" && (
              <span className="inline-block w-[7px] h-[1.05em] translate-y-[2px] ml-px" style={{ background: fam.color, animation: "penta-blink 0.9s steps(1) infinite" }} />
            )}
          </span>
        </p>

        {/* thinking / command */}
        <p className="text-[12.5px] sm:text-[13.5px] leading-relaxed mt-3 min-h-[1.6em] flex items-center flex-wrap">
          <span className="text-[#5a6286]">### Command:&nbsp;</span>
          {phase === "think" ? (
            <span className="inline-flex items-center gap-1.5 text-[#8b93b5]">
              {[0, 1, 2].map((d) => (
                <span key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: fam.color, animation: `penta-glow 1s ease-in-out ${d * 0.2}s infinite` }} />
              ))}
              <span className="text-[11px] text-[#5a6286] ml-1">generating · 47.2M params</span>
            </span>
          ) : (
            <span style={{ color: fam.color }} className="font-medium" suppressHydrationWarning>
              {cmd}
              {phase === "cmd" && (
                <span className="inline-block w-[7px] h-[1.05em] translate-y-[2px] ml-px" style={{ background: fam.color, animation: "penta-blink 0.9s steps(1) infinite" }} />
              )}
              {phase === "hold" && cmd && <span className="ml-3 text-[#34D399] text-[11px]">✓ exact-match</span>}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   DataPipeline — the build pipeline, nodes lighting up in sequence on a loop.
   ════════════════════════════════════════════════════════════════════════ */
const STAGES = [
  { step: "SOURCES", sub: "NL2Bash + synthetic" },
  { step: "DEDUP", sub: "(family, instruction)" },
  { step: "LEAK-FREE SPLIT", sub: "90 / 5 / 5 · 0 overlap" },
  { step: "BPE TOKENIZER", sub: "byte-level · vocab 12k" },
  { step: "TOKEN .bin", sub: "~6.54M train tokens" },
  { step: "TRANSFORMER", sub: "nanoGPT · 47.2M" },
  { step: "TRAIN", sub: "T4 · exact-match ckpt" },
];

export function DataPipeline() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-7 md:gap-2.5">
        {STAGES.map((s, i) => {
          const on = i === active;
          const done = i < active;
          const color = SPECTRUM[i % SPECTRUM.length];
          return (
            <div key={s.step} className="relative shrink-0 w-[150px] md:w-auto">
              <div
                className="relative h-full rounded-lg border bg-[#0a0c16]/70 p-3.5 transition-all duration-500 overflow-hidden"
                style={{
                  borderColor: on ? `${color}aa` : "rgba(255,255,255,0.09)",
                  boxShadow: on ? `0 0 18px -10px ${color}` : "none",
                  background: on ? `linear-gradient(160deg, ${color}1c, #0a0c16 70%)` : undefined,
                }}
              >
                <span className="font-dmmono text-[10px] text-[#5a6286]">{`0${i + 1}`}</span>
                <p className="font-dmmono text-[12.5px] font-medium mt-1.5 tracking-wide transition-colors duration-500" style={{ color: on || done ? color : "#8b93b5" }}>
                  {s.step}
                </p>
                <p className="font-dmmono text-[10px] mt-0.5" style={{ color: "#8b93b5" }}>{s.sub}</p>
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full" style={{ background: on ? color : "rgba(255,255,255,0.12)" }}>
                  {on && <span className="absolute inset-0 rounded-full" style={{ background: color, animation: "penta-pulse-ring 1.1s ease-out infinite" }} />}
                </span>
              </div>
              {i < STAGES.length - 1 && (
                <span className="hidden md:flex absolute top-1/2 -right-[9px] -translate-y-1/2 z-10 text-xs transition-colors duration-500" style={{ color: done || on ? color : "rgba(255,255,255,0.18)" }}>
                  ▸
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 h-px w-full bg-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 transition-all duration-500" style={{ width: `${((active + 1) / STAGES.length) * 100}%`, background: `linear-gradient(90deg, ${SPECTRUM.join(",")})` }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   TrainingCurve — SVG line chart of exact-match takeoff across training steps.
   Main line draws on first view; a flowing dash overlay loops forever, and
   the step-11k peak pulses.
   ════════════════════════════════════════════════════════════════════════ */
const CURVE: [number, number][] = [
  [1000, 0], [2000, 0], [3000, 10.8], [4000, 64.2], [5000, 75.8], [8000, 82.5], [11000, 86.7], [14000, 85.8],
];
const FW: [number, number][] = [
  [1000, 91.7], [2000, 96.7], [3000, 98.3], [4000, 97.5], [5000, 99.2], [8000, 99.2], [11000, 100], [14000, 99.2],
];

const PX = (step: number) => 60 + ((step - 1000) / 13000) * 520;
const PY = (pct: number) => 260 - (pct / 100) * 220;
const toPath = (pts: [number, number][]) => pts.map(([s, p], i) => `${i ? "L" : "M"} ${PX(s).toFixed(1)} ${PY(p).toFixed(1)}`).join(" ");

export function TrainingCurve() {
  const [shown, setShown] = useState(false);
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) setShown(true);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const main = toPath(CURVE);
  const fw = toPath(FW);

  return (
    <svg ref={ref} viewBox="0 0 600 300" className="w-full h-auto font-dmmono" role="img" aria-label="Exact-match accuracy climbing across training steps, peaking 86.7% at step 11,000.">
      <defs>
        <linearGradient id="penta-curve" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F43F5E" />
          <stop offset="0.4" stopColor="#FACC15" />
          <stop offset="0.7" stopColor="#34D399" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="penta-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A78BFA" stopOpacity="0.28" />
          <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* gridlines */}
      {[0, 25, 50, 75, 100].map((g) => (
        <g key={g}>
          <line x1="60" y1={PY(g)} x2="580" y2={PY(g)} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <text x="50" y={PY(g) + 3} textAnchor="end" fill="#5a6286" fontSize="9">{g}</text>
        </g>
      ))}
      {/* x labels */}
      {[1000, 4000, 8000, 11000, 14000].map((s) => (
        <text key={s} x={PX(s)} y="278" textAnchor="middle" fill="#5a6286" fontSize="9">{s >= 1000 ? `${s / 1000}k` : s}</text>
      ))}
      <text x="320" y="296" textAnchor="middle" fontSize="9" style={{ fill: "#5a6286" }}>training step</text>

      {/* area fill */}
      <path d={`${main} L ${PX(14000)} 260 L ${PX(1000)} 260 Z`} fill="url(#penta-fill)" opacity={shown ? 1 : 0} style={{ transition: "opacity 1.2s ease 0.6s" }} />

      {/* first-word (faint) */}
      <path d={fw} fill="none" stroke="#8b93b5" strokeWidth="1.4" strokeDasharray="3 4" opacity={shown ? 0.5 : 0} style={{ transition: "opacity 1s ease 0.4s" }} />

      {/* main curve — draws on view */}
      <path
        d={main} fill="none" stroke="url(#penta-curve)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 1400, strokeDashoffset: shown ? 0 : 1400, transition: "stroke-dashoffset 1.8s cubic-bezier(0.22,1,0.36,1)" }}
      />
      {/* flowing energy overlay (loops) */}
      <path d={main} fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 26" opacity={shown ? 0.7 : 0} style={{ animation: "penta-dash 8s linear infinite" }} />

      {/* points */}
      {CURVE.map(([s, p], i) => (
        <circle key={i} cx={PX(s)} cy={PY(p)} r="3" fill="#080a14" stroke="url(#penta-curve)" strokeWidth="2" opacity={shown ? 1 : 0} style={{ transition: `opacity 0.4s ease ${0.6 + i * 0.12}s` }} />
      ))}

      {/* peak marker */}
      <g opacity={shown ? 1 : 0} style={{ transition: "opacity 0.5s ease 1.6s" }}>
        <circle cx={PX(11000)} cy={PY(86.7)} r="5" fill="#34D399" />
        <circle cx={PX(11000)} cy={PY(86.7)} r="5" fill="none" stroke="#34D399" style={{ transformOrigin: `${PX(11000)}px ${PY(86.7)}px`, animation: "penta-pulse-ring 1.6s ease-out infinite" }} />
        <text x={PX(11000)} y={PY(86.7) - 12} textAnchor="middle" fill="#34D399" fontSize="11" fontWeight="600">86.7% · best</text>
      </g>
      {/* takeoff label */}
      <text x={PX(4000)} y={PY(64.2) + 22} textAnchor="middle" fill="#FACC15" fontSize="9.5">copy circuit online</text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FamilyBars — per-family exact-match, bars grow on view, numbers count up.
   ════════════════════════════════════════════════════════════════════════ */
const BARS: { fam: FamilyKey; exact: number; first: number }[] = [
  { fam: "git", exact: 100.0, first: 100 },
  { fam: "powershell", exact: 98.7, first: 100 },
  { fam: "npm", exact: 97.3, first: 100 },
  { fam: "python", exact: 69.3, first: 100 },
  { fam: "bash", exact: 68.0, first: 75 },
];

export function FamilyBars() {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e[0].isIntersecting && setShown(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-4">
      {BARS.map((b, i) => {
        const c = FAMILIES[b.fam].color;
        return (
          <div key={b.fam} className="grid grid-cols-[88px_1fr_56px] sm:grid-cols-[110px_1fr_64px] items-center gap-3">
            <span className="font-dmmono text-[12px] sm:text-[13px] text-right" style={{ color: c }}>{FAMILIES[b.fam].label}</span>
            <div className="relative h-7 rounded-md bg-black/40 overflow-hidden border border-white/[0.06]">
              <div
                className="absolute inset-y-0 left-0 rounded-md"
                style={{
                  width: shown ? `${b.exact}%` : "0%",
                  background: `linear-gradient(90deg, ${c}b3, ${c})`,
                  transition: `width 1.3s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
                }}
              >
                <span aria-hidden className="absolute top-0 bottom-0 w-1/3 bg-white/20 blur-md" style={{ animation: `penta-shimmer ${4 + i}s ease-in-out ${i * 0.4}s infinite` }} />
              </div>
              {/* first-word tick */}
              <span className="absolute top-0 bottom-0 w-px bg-white/40" style={{ left: `${b.first}%`, opacity: shown ? 1 : 0, transition: "opacity 0.6s ease 1.4s" }} />
            </div>
            <span className="font-dmmono text-[12.5px] sm:text-[13px] text-[#e6e9f5] text-right tabular-nums">
              {shown ? b.exact.toFixed(1) : "0.0"}
            </span>
          </div>
        );
      })}
      {/* blended reference */}
      <div className="grid grid-cols-[88px_1fr_56px] sm:grid-cols-[110px_1fr_64px] items-center gap-3 pt-2 border-t border-white/[0.06]">
        <span className="font-dmmono text-[12px] sm:text-[13px] text-right text-[#A78BFA]">blended</span>
        <div className="relative h-2 rounded-full bg-white/[0.04] overflow-hidden">
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: shown ? "86.7%" : "0%", background: `linear-gradient(90deg, ${SPECTRUM.join(",")})`, transition: "width 1.4s cubic-bezier(0.22,1,0.36,1) 0.7s" }} />
        </div>
        <span className="font-dmmono text-[12.5px] sm:text-[13px] text-[#A78BFA] text-right">86.7</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   LoopTerminal — auto-runs the real install → inference transcript on a loop.
   ════════════════════════════════════════════════════════════════════════ */
type TLine = { text: string; kind: "cmd" | "out" | "task" | "ok"; color?: string };

const TRANSCRIPT: TLine[] = [
  { text: "pip install torch tokenizers", kind: "cmd" },
  { text: "successfully installed torch tokenizers", kind: "out" },
  { text: 'python inference.py git "undo my last commit but keep my changes"', kind: "cmd" },
  { text: "loading best_model.pt · 47.2M params · cpu", kind: "out" },
  { text: "### Command: git reset --soft HEAD~1", kind: "ok", color: "#F97316" },
  { text: 'python inference.py npm "install the express package"', kind: "cmd" },
  { text: "### Command: npm install express", kind: "ok", color: "#F43F5E" },
  { text: 'python inference.py powershell "list the files in the Downloads folder"', kind: "cmd" },
  { text: "### Command: Get-ChildItem Downloads", kind: "ok", color: "#38BDF8" },
];

export function LoopTerminal() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= TRANSCRIPT.length) {
      const t = setTimeout(() => setCount(0), 2600);
      return () => clearTimeout(t);
    }
    const line = TRANSCRIPT[count];
    const delay = line.kind === "cmd" ? 680 : 420;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count]);

  const visible = TRANSCRIPT.slice(0, count);

  return (
    <div className="rounded-2xl border border-white/[0.09] bg-[#070912] overflow-hidden h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]/70" />
          <span className="ml-2 font-dmmono text-[10.5px] text-[#8b93b5]">pentacmd — live run</span>
        </div>
        <span className="font-dmmono text-[10px] text-[#34D399] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" style={{ animation: "penta-blink 1.2s steps(1) infinite" }} />
          REC
        </span>
      </div>
      <div className="p-4 sm:p-5 font-dmmono text-[12px] sm:text-[12.5px] leading-relaxed min-h-[300px]">
        {visible.map((l, i) => (
          <div key={i} style={{ animation: "penta-rise 0.35s ease", color: l.color }} className={l.kind === "cmd" ? "text-[#e6e9f5]" : l.kind === "out" ? "text-[#7c84a8]" : "font-medium"}>
            {l.kind === "cmd" && <span className="text-[#A78BFA] select-none">$ </span>}
            {(l.kind === "out") && <span className="text-[#3a4063] select-none">  </span>}
            {l.text}
          </div>
        ))}
        {count < TRANSCRIPT.length && (
          <span className="inline-block w-[7px] h-[14px] bg-[#A78BFA]" style={{ animation: "penta-blink 0.9s steps(1) infinite" }} />
        )}
      </div>
    </div>
  );
}
