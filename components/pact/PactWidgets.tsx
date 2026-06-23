"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   Reveal — scroll-triggered fade/rise. Uses the LazyMotion `m` API so it
   stays light inside the page's <MotionProvider>.
   ──────────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────
   LiveToolbar — the REPL's bottom status line. The elapsed clock genuinely
   counts up from page load; spend/tokens stay at an idle session's real
   zeros (no invented numbers).
   ──────────────────────────────────────────────────────────────────────── */
export function LiveToolbar() {
  const [elapsed, setElapsed] = useState(0);
  const start = useRef<number>(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const Sep = () => <span className="text-[#A8462A]/70 px-2 select-none">|</span>;

  return (
    <div className="flex items-center flex-wrap gap-y-1 font-dmmono text-[10.5px] sm:text-[11px] leading-none text-[#9a8e86]">
      <span className="text-[#CF5C36] font-medium tracking-wide">PACT</span>
      <span className="px-2 text-[#c9bdb4] hidden sm:inline">anthropic/claude-haiku-4-5</span>
      <Sep />
      <span>
        time <span className="text-[#e8e0da]" suppressHydrationWarning>{mm}:{ss}</span>
      </span>
      <Sep />
      <span>
        cost <span className="text-[#e8e0da]">$0.0000</span>
      </span>
      <Sep />
      <span>
        tokens <span className="text-[#e8e0da]">0</span>
      </span>
      <Sep />
      <span className="hidden sm:inline">
        budget <span className="text-[#e8e0da]">$2.0000 left</span>
      </span>
      <span className="sm:hidden">
        bgt <span className="text-[#e8e0da]">$2.00</span>
      </span>
      <Sep />
      <span>
        risk <span className="text-[#9a8e86]/60">—</span>
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CopyCommand — a terminal block with a one-click copy. `copyText` is what
   lands on the clipboard; `lines` is what's shown (so we can render comments
   and prompts separately from what gets copied).
   ──────────────────────────────────────────────────────────────────────── */
type CmdLine = { text: string; kind?: "cmd" | "comment" | "out" };

export function CopyCommand({
  label,
  lines,
  copyText,
}: {
  label?: string;
  lines: CmdLine[];
  copyText: string;
}) {
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
    <div className="rounded-2xl border border-[#CF5C36]/20 bg-[#100c0a] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CF5C36]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D6A23B]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#4F9B5C]/70" />
          {label && (
            <span className="ml-2 font-dmmono text-[10.5px] uppercase tracking-[0.18em] text-[#9a8e86]">
              {label}
            </span>
          )}
        </div>
        <button
          onClick={copy}
          className="font-dmmono text-[10.5px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border border-white/10 text-[#c9bdb4] hover:text-[#fff] hover:border-[#CF5C36]/50 hover:bg-[#CF5C36]/10 transition-colors"
          aria-label="Copy commands"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="px-4 sm:px-5 py-4 overflow-x-auto font-dmmono text-[12.5px] sm:text-[13px] leading-relaxed">
        <code>
          {lines.map((l, i) => {
            if (l.kind === "comment") {
              return (
                <div key={i} className="text-[#6f6760]">
                  {l.text}
                </div>
              );
            }
            if (l.kind === "out") {
              return (
                <div key={i} className="text-[#9a8e86]">
                  {l.text}
                </div>
              );
            }
            return (
              <div key={i} className="text-[#e8e0da]">
                <span className="text-[#CF5C36] select-none">$ </span>
                {l.text}
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
