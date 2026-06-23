"use client";

import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════════════════════════════════
   Brackets — corner-tick frame around any block (engineering/HUD identity).
   ════════════════════════════════════════════════════════════════════════ */
export function Brackets({
  children,
  className,
  color = "#CF5C36",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const c = "absolute w-3.5 h-3.5 pointer-events-none";
  return (
    <div className={`relative ${className ?? ""}`}>
      <span className={`${c} top-0 left-0 border-l border-t`} style={{ borderColor: color }} />
      <span className={`${c} top-0 right-0 border-r border-t`} style={{ borderColor: color }} />
      <span className={`${c} bottom-0 left-0 border-l border-b`} style={{ borderColor: color }} />
      <span className={`${c} bottom-0 right-0 border-r border-b`} style={{ borderColor: color }} />
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PageFrame — fixed decorative instrument frame (edge rails + crosshairs).
   ════════════════════════════════════════════════════════════════════════ */
export function PageFrame() {
  return (
    <div aria-hidden className="hidden md:block pointer-events-none fixed inset-0 z-20">
      <div className="absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-[#CF5C36]/15 to-transparent" />
      <div className="absolute inset-y-0 right-6 w-px bg-gradient-to-b from-transparent via-[#CF5C36]/15 to-transparent" />
      {/* corner crosshairs */}
      {[
        "top-5 left-5", "top-5 right-5", "bottom-5 left-5", "bottom-5 right-5",
      ].map((pos) => (
        <div key={pos} className={`absolute ${pos} w-3 h-3`}>
          <span className="absolute top-1/2 left-0 w-full h-px bg-[#CF5C36]/40" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-[#CF5C36]/40" />
        </div>
      ))}
      <span className="absolute top-1/2 left-[18px] -translate-y-1/2 -rotate-90 font-dmmono text-[9px] tracking-[0.4em] text-[#CF5C36]/35 uppercase whitespace-nowrap">
        House of Namus
      </span>
      <span className="absolute top-1/2 right-[18px] -translate-y-1/2 rotate-90 font-dmmono text-[9px] tracking-[0.4em] text-[#CF5C36]/35 uppercase whitespace-nowrap">
        v0.1.0 · pact-cli
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   Marquee — infinite brand ticker band.
   ════════════════════════════════════════════════════════════════════════ */
export function Marquee({
  items,
  duration = 32,
}: {
  items: string[];
  duration?: number;
}) {
  const seq = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-4 border-y border-[#CF5C36]/15 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="pact-marquee-track flex w-max items-center gap-8 whitespace-nowrap"
        style={{ animation: `pact-marquee ${duration}s linear infinite` }}
      >
        {seq.map((it, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-dmmono text-sm uppercase tracking-[0.3em] text-[#CF5C36]/70">
              {it}
            </span>
            <span className="text-[#CF5C36]/30 text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   Typewriter — loops typing/deleting an array of phrases.
   ════════════════════════════════════════════════════════════════════════ */
export function Typewriter({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[idx % phrases.length];
    let delay = deleting ? 35 : 65;

    if (!deleting && text === full) {
      delay = 1700; // hold at full
    } else if (deleting && text === "") {
      delay = 350;
    }

    const t = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIdx((i) => i + 1);
      } else {
        setText(full.slice(0, deleting ? text.length - 1 : text.length + 1));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, idx, phrases]);

  return (
    <span className={className} suppressHydrationWarning>
      {text}
      <span className="inline-block w-[7px] h-[1.05em] translate-y-[2px] bg-[#CF5C36] ml-0.5" style={{ animation: "pact-blink 1s steps(1) infinite" }} />
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   Pipeline — the animated core loop. Nodes light up in sequence, the
   connector dashes flow, and a pulse ring tracks the active stage.
   ════════════════════════════════════════════════════════════════════════ */
const STAGES = [
  { step: "PLAN", sub: "planner model", color: "#CF5C36" },
  { step: "CONTRACT", sub: "permission table", color: "#E0863C" },
  { step: "APPROVE", sub: "y · n · a", color: "#FF7A45" },
  { step: "EXECUTE", sub: "sandboxed only", color: "#E0863C" },
  { step: "JOURNAL", sub: "before / after", color: "#D6A23B" },
  { step: "VERIFY", sub: "independent verdict", color: "#4F9B5C" },
];

export function Pipeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 1150);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-6 md:gap-3">
        {STAGES.map((s, i) => {
          const on = i === active;
          const done = i < active;
          return (
            <div key={s.step} className="relative shrink-0 w-[150px] md:w-auto">
              <div
                className="relative h-full rounded-lg border bg-[#100c0a]/70 p-4 transition-all duration-500 overflow-hidden"
                style={{
                  borderColor: on ? s.color : "rgba(207,92,54,0.18)",
                  boxShadow: on ? `0 0 28px -6px ${s.color}` : "none",
                  background: on ? `linear-gradient(160deg, ${s.color}1f, #100c0a 70%)` : undefined,
                }}
              >
                {/* corner index */}
                <span className="font-dmmono text-[10px] text-[#6f6760]">{`0${i + 1}`}</span>
                <p
                  className="font-dmmono text-[15px] font-medium mt-2 tracking-wide transition-colors duration-500"
                  style={{ color: on || done ? s.color : "#8a7e76" }}
                >
                  {s.step}
                </p>
                <p className="font-dmmono text-[11px] text-[#9a8e86] mt-1">{s.sub}</p>

                {/* active pulse dot */}
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: on ? s.color : "rgba(255,255,255,0.12)" }}>
                  {on && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ background: s.color, animation: "pact-pulse-ring 1.15s ease-out infinite" }}
                    />
                  )}
                </span>
              </div>

              {/* connector arrow (desktop) */}
              {i < STAGES.length - 1 && (
                <span
                  className="hidden md:flex absolute top-1/2 -right-[11px] -translate-y-1/2 z-10 text-sm transition-colors duration-500"
                  style={{ color: done || on ? s.color : "rgba(207,92,54,0.3)" }}
                >
                  ▸
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* flowing progress rail */}
      <div className="mt-4 h-px w-full bg-white/[0.06] relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 transition-all duration-500"
          style={{
            width: `${((active + 1) / STAGES.length) * 100}%`,
            background: "linear-gradient(90deg, #CF5C36, #FF7A45, #4F9B5C)",
          }}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   VerdictCycle — the verifier panel, cycling through its three real
   verdicts (example evidence) with a scanning beam. Shows it can say "no".
   ════════════════════════════════════════════════════════════════════════ */
const VERDICTS = [
  {
    name: "CONFIRMED",
    color: "#4F9B5C",
    conf: "95%",
    evidence: 'hello.txt after-content is exactly "hello world"; exit_code 0. Matched the requested end state.',
  },
  {
    name: "CONTRADICTED",
    color: "#B33A3A",
    conf: "88%",
    evidence: 'expected hello.txt to contain "hello world"; recorded after-content was empty. The change did not take effect.',
  },
  {
    name: "INCONCLUSIVE",
    color: "#D6A23B",
    conf: "52%",
    evidence: "no after-snapshot was recorded for config.yaml; the journal can't confirm the edit landed either way.",
  },
];

export function VerdictCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % VERDICTS.length), 3600);
    return () => clearInterval(id);
  }, []);
  const v = VERDICTS[i];

  return (
    <div
      className="relative rounded-xl border bg-[#0c0f0b]/80 px-5 sm:px-6 pt-7 pb-6 h-full flex flex-col overflow-hidden transition-colors duration-700"
      style={{ borderColor: `${v.color}80` }}
    >
      <span
        className="absolute -top-[10px] left-5 px-2 font-dmmono text-[10.5px] tracking-[0.18em] uppercase bg-[#0a0807] transition-colors duration-700"
        style={{ color: v.color }}
      >
        Independent Verification
      </span>

      {/* scanning beam */}
      <span
        aria-hidden
        className="absolute left-0 right-0 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${v.color}22, transparent)`,
          animation: "pact-sweep 3.6s linear infinite",
        }}
      />

      <div className="relative font-dmmono text-[13px] flex-1">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium tracking-wide transition-colors duration-700" style={{ color: v.color }}>
            {v.name}
          </span>
          <span className="w-2 h-2 rounded-full" style={{ background: v.color, animation: "pact-blink 1.4s steps(1) infinite" }} />
        </div>
        <p className="text-[#e8e0da] mt-3 font-medium">Confidence: {v.conf}</p>
        {/* confidence bar */}
        <div className="mt-2 h-1 w-full max-w-[220px] rounded-full bg-white/[0.08] overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: v.conf, background: v.color }} />
        </div>
        <p className="mt-4 mb-1 transition-colors duration-700" style={{ color: v.color }}>Evidence</p>
        <p key={i} className="text-[#c9bdb4] leading-relaxed min-h-[3.5em]" style={{ animation: "fade-in 0.6s ease" }}>
          {v.evidence}
        </p>
      </div>

      <div className="relative mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 font-dmmono text-[10.5px]">
        {VERDICTS.map((vv, idx) => (
          <span
            key={vv.name}
            className="flex-1 text-center py-1 rounded border transition-all duration-500"
            style={{
              color: idx === i ? "#0a0807" : `${vv.color}cc`,
              background: idx === i ? vv.color : "transparent",
              borderColor: `${vv.color}55`,
            }}
          >
            {vv.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   ActionConsole — the 8 registered actions, with a highlight sweeping
   through them on a loop. Colored by family.
   ════════════════════════════════════════════════════════════════════════ */
const ACTIONS = [
  { fam: "file", color: "#CF5C36", items: ["file_write", "file_edit", "file_delete", "file_read"] },
  { fam: "shell", color: "#D6A23B", items: ["shell_exec"] },
  { fam: "browser", color: "#4F9B5C", items: ["browser_navigate", "browser_click", "browser_fill"] },
];
const FLAT = ACTIONS.flatMap((f) => f.items.map((it) => ({ it, color: f.color })));

export function ActionConsole() {
  const [hot, setHot] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHot((h) => (h + 1) % FLAT.length), 700);
    return () => clearInterval(id);
  }, []);

  let running = -1;
  return (
    <div className="font-dmmono text-[13px] space-y-3">
      {ACTIONS.map((f) => (
        <div key={f.fam} className="grid grid-cols-[80px_1fr] gap-x-3 items-start">
          <span className="text-right" style={{ color: f.color }}>{f.fam}:</span>
          <span className="flex flex-wrap gap-x-2 gap-y-1.5">
            {f.items.map((it) => {
              running += 1;
              const on = running === hot;
              return (
                <span
                  key={it}
                  className="px-1.5 rounded transition-all duration-300"
                  style={{
                    color: on ? "#0a0807" : "#e8e0da",
                    background: on ? f.color : "transparent",
                    boxShadow: on ? `0 0 18px -4px ${f.color}` : "none",
                  }}
                >
                  {it}
                </span>
              );
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   LoopTerminal — auto-runs a real PACT transcript end-to-end, on a loop.
   ════════════════════════════════════════════════════════════════════════ */
type TLine = { text: string; kind: "cmd" | "out" | "ok" | "contract" | "prompt" | "verdict" | "blank" };

const TRANSCRIPT: TLine[] = [
  { text: "git clone github.com/Sumandebnath943/pact-agent", kind: "cmd" },
  { text: "cloning into 'pact-agent'… done", kind: "out" },
  { text: "cd pact-agent && pipx install .", kind: "cmd" },
  { text: "installed package pact-cli 0.1.0  ·  command: pact", kind: "ok" },
  { text: "pact init", kind: "cmd" },
  { text: ".pact/ initialized in this project", kind: "ok" },
  { text: 'pact run "create hello.txt with a greeting"', kind: "cmd" },
  { text: "PERMISSION CONTRACT  ·  LOW  file_write  hello.txt", kind: "contract" },
  { text: "approve file_write on hello.txt? [y/n/a]  y", kind: "prompt" },
  { text: "› PACT file_write → hello.txt   OK", kind: "ok" },
  { text: "INDEPENDENT VERIFICATION  ·  CONFIRMED  ·  95%", kind: "verdict" },
];

const KIND_STYLE: Record<TLine["kind"], string> = {
  cmd: "text-[#e8e0da]",
  out: "text-[#9a8e86]",
  ok: "text-[#4F9B5C]",
  contract: "text-[#CF5C36]",
  prompt: "text-[#d8b3a3]",
  verdict: "text-[#4F9B5C] font-medium",
  blank: "",
};

export function LoopTerminal() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (count >= TRANSCRIPT.length) {
      const t = setTimeout(() => setCount(0), 2600);
      return () => clearTimeout(t);
    }
    const line = TRANSCRIPT[count];
    const delay = line.kind === "cmd" ? 620 : 380;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count]);

  const visible = TRANSCRIPT.slice(0, count);

  return (
    <div className="rounded-2xl border border-[#CF5C36]/25 bg-[#0a0706] overflow-hidden h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CF5C36]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D6A23B]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#4F9B5C]/70" />
          <span className="ml-2 font-dmmono text-[10.5px] text-[#9a8e86]">pact — live run</span>
        </div>
        <span className="font-dmmono text-[10px] text-[#4F9B5C] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4F9B5C]" style={{ animation: "pact-blink 1.2s steps(1) infinite" }} />
          REC
        </span>
      </div>
      <div ref={ref} className="p-4 sm:p-5 font-dmmono text-[12px] sm:text-[12.5px] leading-relaxed min-h-[280px]">
        {visible.map((l, i) => (
          <div key={i} className={KIND_STYLE[l.kind]} style={{ animation: "fade-in 0.35s ease" }}>
            {l.kind === "cmd" && <span className="text-[#CF5C36] select-none">$ </span>}
            {(l.kind === "out" || l.kind === "ok") && <span className="text-[#4F4842] select-none">  </span>}
            {l.text}
          </div>
        ))}
        {count < TRANSCRIPT.length && (
          <span className="inline-block w-[7px] h-[14px] bg-[#CF5C36]" style={{ animation: "pact-blink 0.9s steps(1) infinite" }} />
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   InlineCopy — slim one-line copyable command (hero quickstart).
   ════════════════════════════════════════════════════════════════════════ */
export function InlineCopy({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <button
      onClick={copy}
      className="group flex items-center gap-3 rounded-full border border-[#CF5C36]/30 bg-[#100c0a]/80 pl-4 pr-2 py-2 hover:border-[#CF5C36]/60 transition-colors max-w-full"
      aria-label="Copy install command"
    >
      <span className="font-dmmono text-[12px] sm:text-[12.5px] text-[#c9bdb4] truncate">
        <span className="text-[#CF5C36] select-none">$ </span>
        {command}
      </span>
      <span className="font-dmmono text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-[#CF5C36]/15 text-[#d8b3a3] group-hover:bg-[#CF5C36] group-hover:text-black transition-colors shrink-0">
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </button>
  );
}
