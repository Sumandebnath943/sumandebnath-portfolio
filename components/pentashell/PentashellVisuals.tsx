"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { C, EXAMPLES, FAMILIES, TICKER, type Family } from "./pentashell-data";

/* ════════════════════════════════════════════════════════════════════════
   Reveal — scroll-triggered fade/rise (LazyMotion `m`, light inside the
   page's <MotionProvider>).
   ═══════════════════════════════════════════════════════════════════════ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   AmbientBackground — fixed neon glows, a masked grid, flowing light-trails
   (echoing the product artwork's road), and a grain veil.
   ═══════════════════════════════════════════════════════════════════════ */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* drifting colour fields */}
      <div
        className="absolute -top-[18%] left-1/2 -translate-x-1/2 w-[120vw] h-[58vh] rounded-full opacity-[0.5] blur-[130px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(47,226,240,0.18), transparent 62%)", animation: "ps-drift 19s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[-14%] right-[-8%] w-[62vw] h-[52vh] rounded-full opacity-[0.45] blur-[130px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(242,95,208,0.16), transparent 64%)", animation: "ps-drift 24s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute top-[30%] left-[-10%] w-[48vw] h-[44vh] rounded-full opacity-[0.4] blur-[130px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(155,107,242,0.14), transparent 65%)", animation: "ps-drift 27s ease-in-out 2s infinite" }}
      />

      {/* masked perspective grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(47,226,240,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(155,107,242,0.45) 1px, transparent 1px)",
          backgroundSize: "62px 62px",
          maskImage: "radial-gradient(ellipse 90% 65% at 50% 0%, black, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 65% at 50% 0%, black, transparent 78%)",
        }}
      />

      {/* flowing light-trails along the floor */}
      <svg className="absolute bottom-0 left-0 w-full h-[40vh]" viewBox="0 0 1440 420" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ps-trail-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.cyan} stopOpacity="0" />
            <stop offset="50%" stopColor={C.cyan} stopOpacity="0.6" />
            <stop offset="100%" stopColor={C.magenta} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ps-trail-grad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.magenta} stopOpacity="0" />
            <stop offset="55%" stopColor={C.violet} stopOpacity="0.5" />
            <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          { d: "M-50,300 C 360,260 760,200 1490,120", g: "url(#ps-trail-grad)", w: 1.5, dur: "7s" },
          { d: "M-50,360 C 380,330 820,250 1490,170", g: "url(#ps-trail-grad2)", w: 1, dur: "9s" },
          { d: "M-50,250 C 420,230 900,150 1490,70", g: "url(#ps-trail-grad)", w: 1, dur: "11s" },
        ].map((l, i) => (
          <path
            key={i}
            d={l.d}
            fill="none"
            stroke={l.g}
            strokeWidth={l.w}
            strokeDasharray="14 26"
            style={{ animation: `ps-flow ${l.dur} linear infinite` }}
          />
        ))}
      </svg>

      <div className="hero-grain absolute inset-0 opacity-[0.035]" />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   Marquee — a seamless looping ticker.
   ═══════════════════════════════════════════════════════════════════════ */
export function Marquee() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-white/[0.012] py-3.5">
      <div className="flex w-max gap-8" style={{ animation: "pact-marquee 34s linear infinite" }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-dmmono text-[11px] uppercase tracking-[0.22em] text-white/40 whitespace-nowrap">
            {t}
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: i % 2 ? C.magenta : C.cyan, boxShadow: `0 0 10px ${i % 2 ? C.magenta : C.cyan}` }} />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05060e] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05060e] to-transparent" />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   CopyCommand — neon terminal block with one-click copy.
   ═══════════════════════════════════════════════════════════════════════ */
type CmdLine = { text: string; kind?: "cmd" | "comment" | "out" };

export function CopyCommand({ label, lines, copyText }: { label?: string; lines: CmdLine[]; copyText: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  };
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0a0c16]/90 overflow-hidden shadow-[0_24px_70px_-30px_rgba(0,0,0,0.85)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.magenta }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.amber }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.green }} />
          {label && <span className="ml-2 font-dmmono text-[10.5px] uppercase tracking-[0.18em] text-white/45">{label}</span>}
        </div>
        <button
          onClick={copy}
          className="font-dmmono text-[10.5px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border border-white/10 text-white/60 hover:text-white hover:border-[var(--ps-cy)] hover:bg-white/[0.04] transition-colors"
          style={{ ["--ps-cy" as string]: C.cyan }}
          aria-label="Copy commands"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="px-4 sm:px-5 py-4 overflow-x-auto font-dmmono text-[12.5px] sm:text-[13px] leading-relaxed">
        <code>
          {lines.map((l, i) => {
            if (l.kind === "comment") return <div key={i} className="text-white/30">{l.text}</div>;
            if (l.kind === "out") return <div key={i} style={{ color: C.cyanSoft }}>{l.text}</div>;
            return (
              <div key={i} className="text-white/85">
                <span style={{ color: C.cyan }} className="select-none">$ </span>
                {l.text}
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PromptToCommand — the signature live REPL. Cycles the VERIFIED examples:
   types the English instruction, names the family, reveals the command,
   then shows the [y/N] approval gate. Nothing here is invented — every
   pair is a real, locally-run example.
   ═══════════════════════════════════════════════════════════════════════ */
type Phase = "typing" | "detect" | "command" | "gate";

export function PromptToCommand() {
  const [idx, setIdx] = useState(0);
  // Remounting on `idx` gives each turn a fresh start — no synchronous state
  // reset inside an effect, and no flash of the previous example.
  return <ReplTurn key={idx} ex={EXAMPLES[idx]} onDone={() => setIdx((p) => (p + 1) % EXAMPLES.length)} />;
}

function ReplTurn({ ex, onDone }: { ex: (typeof EXAMPLES)[number]; onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("typing");
  const [instr, setInstr] = useState("");
  const [cmd, setCmd] = useState("");
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  const fam = FAMILIES.find((f) => f.id === ex.family)!;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const push = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    let t = 350;
    const step = 34;

    // type instruction
    for (let i = 1; i <= ex.instruction.length; i++) {
      push(() => setInstr(ex.instruction.slice(0, i)), t);
      t += step;
    }
    // detect family
    t += 420;
    push(() => setPhase("detect"), t);
    // type command
    t += 620;
    push(() => setPhase("command"), t);
    for (let i = 1; i <= ex.command.length; i++) {
      push(() => setCmd(ex.command.slice(0, i)), t);
      t += 40;
    }
    // gate
    t += 360;
    push(() => setPhase("gate"), t);
    // advance to the next turn
    t += 2400;
    push(() => doneRef.current(), t);

    return () => timers.forEach(clearTimeout);
  }, [ex.instruction, ex.command, ex.family]);

  return (
    <div className="relative rounded-2xl border border-white/[0.09] bg-[#080a14]/95 backdrop-blur-sm overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
      {/* neon top hairline */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.cyan}, ${C.magenta}, transparent)` }} />
      {/* title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.012]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.magenta }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.amber }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.green }} />
        </div>
        <span className="font-dmmono text-[11px] text-white/45">pentacmd — interactive session</span>
        <span className="font-dmmono text-[10px] text-white/25 hidden sm:inline">CPU · local</span>
      </div>

      <div className="p-5 sm:p-7 min-h-[230px] text-left">
        {/* prompt line */}
        <p className="font-dmmono text-[13px] sm:text-[14px] flex flex-wrap items-baseline">
          <span style={{ color: C.cyan }} className="font-medium select-none">pentacmd&gt;&nbsp;</span>
          <span className="text-white/90">{instr}</span>
          {phase === "typing" && <span className="inline-block align-middle ml-0.5 w-[7px] h-[15px]" style={{ background: C.cyan, animation: "pact-blink 0.9s steps(1) infinite" }} />}
        </p>

        {/* family note */}
        <div className="h-7 mt-3">
          {phase !== "typing" && (
            <m.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="font-dmmono text-[11.5px] text-white/40 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border" style={{ color: fam.color, borderColor: `${fam.color}55`, background: `${fam.color}14` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: fam.color, boxShadow: `0 0 8px ${fam.color}` }} />
                {ex.family}
              </span>
              <span className="text-white/30">{ex.how}</span>
            </m.p>
          )}
        </div>

        {/* command output */}
        <div className="h-12 mt-2">
          {(phase === "command" || phase === "gate") && (
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border px-4 py-2.5 inline-flex items-center" style={{ borderColor: `${C.cyan}33`, background: "rgba(47,226,240,0.05)" }}>
              <span className="font-dmmono text-[14px] sm:text-[15px]" style={{ color: C.cyanSoft }}>{cmd}</span>
              {phase === "command" && <span className="inline-block align-middle ml-0.5 w-[7px] h-[15px]" style={{ background: C.cyanSoft, animation: "pact-blink 0.9s steps(1) infinite" }} />}
            </m.div>
          )}
        </div>

        {/* approval gate */}
        <div className="h-8 mt-4">
          {phase === "gate" && (
            <m.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-dmmono text-[13px]" style={{ color: C.green }}>
              Run this? <span className="text-white/45">[y/N]</span>
              <span className="inline-block align-middle ml-1 w-[7px] h-[14px]" style={{ background: C.green, animation: "pact-blink 0.8s steps(1) infinite" }} />
              <span className="text-white/25 ml-3 hidden sm:inline">default · No — nothing runs without your yes</span>
            </m.p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   Pipeline — the path a single instruction travels. A light dot streams the
   rail; each node pulses. Bible §2.
   ═══════════════════════════════════════════════════════════════════════ */
const STAGES: { k: string; t: string; d: string; c: string }[] = [
  { k: "in", t: "Plain English", d: '"undo my last commit"', c: C.cyan },
  { k: "fam", t: "Decide family", d: "flag wins · else auto-detect", c: C.magenta },
  { k: "fmt", t: "Exact prompt", d: "### Task · ### Command", c: C.violet },
  { k: "gen", t: "PentaCMD-47M", d: "greedy decode · stop token", c: C.cyanSoft },
  { k: "ext", t: "Extract command", d: "git revert HEAD", c: C.green },
  { k: "gate", t: "Approval gate", d: "[y/N] · then run", c: C.amber },
];

export function Pipeline() {
  return (
    <div className="relative">
      <div className="grid gap-4 lg:grid-cols-6 sm:grid-cols-2">
        {STAGES.map((s, i) => (
          <Reveal key={s.k} delay={i * 0.06}>
            <div className="group relative h-full rounded-2xl border border-white/[0.08] bg-[#0a0c16]/60 p-5 overflow-hidden hover:border-white/[0.16] transition-colors">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px opacity-70" style={{ background: `linear-gradient(90deg, transparent, ${s.c}, transparent)` }} />
              <div className="flex items-center justify-between mb-3">
                <span className="font-dmmono text-[10px] tracking-[0.2em]" style={{ color: `${s.c}cc` }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="w-2 h-2 rounded-full" style={{ background: s.c, boxShadow: `0 0 10px ${s.c}`, animation: `pact-blink ${1.1 + i * 0.2}s steps(1) infinite` }} />
              </div>
              <p className="font-manrope font-semibold text-[14px] text-white/90">{s.t}</p>
              <p className="font-dmmono text-[11px] mt-1.5 leading-relaxed break-words" style={{ color: `${s.c}` }}>{s.d}</p>
              {/* connector arrow (desktop) */}
              {i < STAGES.length - 1 && (
                <span aria-hidden className="hidden lg:block absolute top-1/2 -right-[14px] -translate-y-1/2 text-white/20 z-10">→</span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
      <p className="font-dmmono text-[11px] text-white/30 mt-5 text-center">
        One implementation. The interactive loop and{" "}
        <span style={{ color: C.cyanSoft }}>pentacmd &quot;…&quot;</span> share the exact same path.
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SafetyGates — the two gates side by side: the normal [y/N] and the
   stronger destructive gate that NAMES the risk and demands a typed `yes`.
   Bible §6. Risk strings are the real ones from the detector.
   ═══════════════════════════════════════════════════════════════════════ */
export function SafetyGates() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* normal gate */}
      <Reveal>
        <div className="relative h-full rounded-2xl border bg-[#0a0c16]/70 px-5 sm:px-6 pt-7 pb-6" style={{ borderColor: `${C.green}30` }}>
          <span className="absolute -top-[10px] left-5 z-10 px-2 font-dmmono text-[10.5px] tracking-[0.18em] uppercase bg-[#05060e]" style={{ color: C.green }}>
            Normal command
          </span>
          <p className="font-dmmono text-[13px] text-white/80">
            <span style={{ color: C.cyan }}>$ </span>git switch -c payments
          </p>
          <div className="mt-4 rounded-lg border px-4 py-3" style={{ borderColor: `${C.green}28`, background: `${C.green}0d` }}>
            <p className="font-dmmono text-[13px]" style={{ color: C.green }}>
              Run this? <span className="text-white/45">[y/N]</span>
              <span className="inline-block align-middle ml-1 w-[7px] h-[14px]" style={{ background: C.green, animation: "pact-blink 0.85s steps(1) infinite" }} />
            </p>
          </div>
          <ul className="mt-5 space-y-2 font-manrope text-[12.5px] text-white/45">
            <li className="flex gap-2"><span style={{ color: C.green }}>›</span> Default is <span className="text-white/75">No</span>. Empty input = No.</li>
            <li className="flex gap-2"><span style={{ color: C.green }}>›</span> Runs only on an explicit <span className="text-white/75">y</span> / <span className="text-white/75">yes</span>.</li>
          </ul>
        </div>
      </Reveal>

      {/* destructive gate */}
      <Reveal delay={0.1}>
        <div className="relative h-full rounded-2xl border bg-[#120710]/70 px-5 sm:px-6 pt-7 pb-6" style={{ borderColor: `${C.red}40` }}>
          <span aria-hidden className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <span className="absolute left-0 right-0 h-16" style={{ background: `linear-gradient(to bottom, transparent, ${C.red}1f, transparent)`, animation: "ps-sweep 4.4s linear infinite" }} />
          </span>
          <span className="absolute -top-[10px] left-5 z-10 px-2 font-dmmono text-[10.5px] tracking-[0.18em] uppercase bg-[#05060e]" style={{ color: C.red }}>
            ⚠ Destructive command
          </span>
          <p className="relative font-dmmono text-[13px] text-white/80">
            <span style={{ color: C.red }}>$ </span>git reset --hard HEAD~3
          </p>
          <div className="relative mt-4 rounded-lg border px-4 py-3" style={{ borderColor: `${C.red}45`, background: `${C.red}12` }}>
            <p className="font-dmmono text-[11px] uppercase tracking-[0.16em] mb-1.5" style={{ color: C.red }}>Warning — names the risk</p>
            <p className="font-dmmono text-[12.5px] text-white/70 leading-relaxed">
              This permanently discards commits and changes.
            </p>
            <p className="font-dmmono text-[13px] mt-3" style={{ color: C.red }}>
              Type <span className="text-white px-1 rounded" style={{ background: `${C.red}33` }}>yes</span> to proceed
              <span className="inline-block align-middle ml-1 w-[7px] h-[14px]" style={{ background: C.red, animation: "pact-blink 0.7s steps(1) infinite" }} />
            </p>
          </div>
          <p className="relative mt-5 font-manrope text-[12.5px] text-white/45">
            A bare <span className="text-white/75">y</span> is rejected — a single keystroke can never trigger it by accident.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FamilyExplorer — click a family to see how detection + a real sample read.
   ═══════════════════════════════════════════════════════════════════════ */
export function FamilyExplorer() {
  const [active, setActive] = useState<Family["id"]>("git");
  const fam = FAMILIES.find((f) => f.id === active)!;
  return (
    <div>
      <div className="flex flex-wrap gap-2.5 justify-center mb-8">
        {FAMILIES.map((f) => {
          const on = f.id === active;
          return (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className="font-dmmono text-[12.5px] px-4 py-2 rounded-full border transition-all flex items-center gap-2"
              style={{
                color: on ? "#05060e" : f.color,
                background: on ? f.color : `${f.color}12`,
                borderColor: on ? f.color : `${f.color}40`,
                boxShadow: on ? `0 0 26px -4px ${f.color}` : "none",
                fontWeight: on ? 600 : 400,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: on ? "#05060e" : f.color, boxShadow: on ? "none" : `0 0 8px ${f.color}` }} />
              {f.id}
            </button>
          );
        })}
      </div>

      <m.div
        key={active}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative max-w-4xl mx-auto rounded-2xl border bg-[#0a0c16]/70 overflow-hidden"
        style={{ borderColor: `${fam.color}33` }}
      >
        <span aria-hidden className="absolute -top-1/3 -left-10 w-2/3 h-2/3 rounded-full blur-[90px] opacity-20 pointer-events-none" style={{ background: fam.color }} />
        <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${fam.color}, transparent)` }} />

        <div className="relative grid md:grid-cols-2">
          {/* left — identity + keywords */}
          <div className="p-6 sm:p-7 border-b md:border-b-0 md:border-r" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center font-dmmono text-[14px] font-semibold uppercase" style={{ color: fam.color, background: `${fam.color}14`, border: `1px solid ${fam.color}45`, boxShadow: `0 0 22px -6px ${fam.color}` }}>{fam.id[0]}</span>
              <div className="leading-tight">
                <p className="font-manrope font-semibold text-white/90 text-[17px]">{fam.id}</p>
                <span className="font-dmmono text-[10.5px] text-white/45">{fam.flag}</span>
              </div>
            </div>
            <p className="font-manrope text-[13.5px] text-white/55 leading-relaxed mb-5">{fam.blurb}</p>
            <p className="font-dmmono text-[9.5px] uppercase tracking-[0.2em] text-white/30 mb-2.5">High-signal keywords</p>
            <div className="flex flex-wrap gap-2">
              {fam.keywords.map((k) => (
                <span key={k} className="font-dmmono text-[10.5px] px-2.5 py-1 rounded-md border text-white/65" style={{ borderColor: `${fam.color}30`, background: `${fam.color}0d` }}>{k}</span>
              ))}
            </div>
          </div>

          {/* right — mini terminal */}
          <div className="p-6 sm:p-7">
            <div className="rounded-xl border border-white/[0.08] bg-[#06080f] overflow-hidden h-full flex flex-col">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06]">
                <span className="w-2 h-2 rounded-full" style={{ background: fam.color }} />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="ml-1.5 font-dmmono text-[10px] text-white/35">pentacmd · {fam.id}</span>
              </div>
              <div className="p-4 font-dmmono text-[12.5px] flex-1 flex flex-col">
                <p className="text-white/75"><span style={{ color: fam.color }}>pentacmd&gt;</span> {fam.sample.instruction}</p>
                <p className="text-white/30 text-[10.5px] mt-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: fam.color, boxShadow: `0 0 6px ${fam.color}` }} />
                  detected · {fam.id}
                </p>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 border" style={{ color: C.cyanSoft, borderColor: `${C.cyan}33`, background: `${C.cyan}0a` }}>→ {fam.sample.command}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.div>
      <p className="font-manrope text-[12.5px] text-white/35 text-center mt-5 max-w-xl mx-auto leading-relaxed">
        The decision is always shown — and an explicit flag is a guaranteed override. No keyword match falls back to <span className="text-white/60">bash</span>, and says so.
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   StatNumber — count-up when scrolled into view.
   ═══════════════════════════════════════════════════════════════════════ */
export function StatNumber({ value, suffix = "", prefix = "", decimals = 0, className }: { value: number; suffix?: string; prefix?: string; decimals?: number; className?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done.current) {
        done.current = true;
        const dur = 1300;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(value * eased);
          if (p < 1) requestAnimationFrame(tick);
          else setN(value);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}{n.toFixed(decimals)}{suffix}
    </span>
  );
}
