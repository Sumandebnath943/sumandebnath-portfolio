"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   Reveal — scroll-triggered fade/rise (LazyMotion `m` API).
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
   StatCounter — counts a number up the first time it scrolls into view.
   `value` may be fractional; `decimals` controls precision.
   ──────────────────────────────────────────────────────────────────────── */
export function StatCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1500,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(value * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CopyCommand — terminal block with one-click copy. `lines` is what shows;
   `copyText` is what lands on the clipboard.
   ──────────────────────────────────────────────────────────────────────── */
type CmdLine = { text: string; kind?: "cmd" | "comment" | "out" };

export function CopyCommand({
  label,
  lines,
  copyText,
  accent = "#A78BFA",
}: {
  label?: string;
  lines: CmdLine[];
  copyText: string;
  accent?: string;
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
    <div className="rounded-2xl border border-white/[0.09] bg-[#0a0c16]/90 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]/70" />
          {label && (
            <span className="ml-2 font-dmmono text-[10.5px] uppercase tracking-[0.18em] text-[#8b93b5]">
              {label}
            </span>
          )}
        </div>
        <button
          onClick={copy}
          className="font-dmmono text-[10.5px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border border-white/10 text-[#b8bedb] hover:text-white transition-colors"
          style={{ borderColor: copied ? accent : undefined }}
          aria-label="Copy commands"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="px-4 sm:px-5 py-4 overflow-x-auto font-dmmono text-[12.5px] sm:text-[13px] leading-relaxed">
        <code>
          {lines.map((l, i) => {
            if (l.kind === "comment")
              return (
                <div key={i} className="text-[#5a6286]">
                  {l.text}
                </div>
              );
            if (l.kind === "out")
              return (
                <div key={i} className="text-[#8b93b5]">
                  {l.text}
                </div>
              );
            return (
              <div key={i} className="text-[#e6e9f5]">
                <span style={{ color: accent }} className="select-none">
                  ${" "}
                </span>
                {l.text}
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   InlineCopy — slim one-line copyable command (hero quickstart).
   ──────────────────────────────────────────────────────────────────────── */
export function InlineCopy({ command, accent = "#A78BFA" }: { command: string; accent?: string }) {
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
      className="group flex items-center gap-3 rounded-full border bg-[#0a0c16]/80 pl-4 pr-2 py-2 transition-colors max-w-full"
      style={{ borderColor: `${accent}55` }}
      aria-label="Copy command"
    >
      <span className="font-dmmono text-[12px] sm:text-[12.5px] text-[#b8bedb] truncate">
        <span style={{ color: accent }} className="select-none">
          ${" "}
        </span>
        {command}
      </span>
      <span
        className="font-dmmono text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full text-black group-hover:brightness-110 transition-all shrink-0"
        style={{ background: accent }}
      >
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </button>
  );
}
