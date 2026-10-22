"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/*
 * The spider from That One Crawler, ported from its src/components/Mascot.tsx
 * and lib/client/quirks.ts. Same drawing, same moods, same poke lines.
 *
 * Two deliberate differences from the app:
 *
 *  • Daddy mode is scoped to this page. The app toggles `.daddy` on <html>; here
 *    the class goes on the page's own root (`[data-toc-root]`), so it leaves with
 *    the page on a client-side navigation instead of tinting the next route.
 *  • No Konami trigger. components/ui/EasterEggs.tsx already owns that sequence
 *    site-wide, so here it is ten pokes only.
 */

const INK = "#1a1712";
const PAPER = "#f6f1e6";
const EYES = [
  { cx: 82, cy: 86 },
  { cx: 118, cy: 86 },
];
const PUPIL_TRAVEL = 7;

export type Mood = "smirk" | "happy" | "meh" | "shocked" | "cool";

const BROWS: Record<Mood, [string, string]> = {
  smirk: ["M64 60 Q80 48 96 59", "M104 63 L134 57"],
  happy: ["M64 58 Q80 47 96 57", "M104 57 Q120 47 136 58"],
  meh: ["M66 61 L96 61", "M104 61 L134 61"],
  shocked: ["M64 51 Q80 38 96 50", "M104 50 Q120 38 136 51"],
  cool: ["M64 60 Q80 48 96 59", "M104 63 L134 57"],
};

const MOUTHS: Record<Exclude<Mood, "shocked">, string> = {
  smirk: "M89 125 Q101 132 113 122",
  happy: "M86 121 Q100 139 114 121",
  meh: "M89 127 L111 127",
  cool: "M89 125 Q101 132 113 122",
};

/* ── Daddy mode: a class on the page root, broadcast with a DOM event ──── */
const DADDY_EVENT = "toc:daddy";
const ROOT = "[data-toc-root]";

function isDaddy(): boolean {
  return typeof document !== "undefined" && !!document.querySelector(`${ROOT}.toc-daddy`);
}
function subscribeDaddy(cb: () => void) {
  window.addEventListener(DADDY_EVENT, cb);
  return () => window.removeEventListener(DADDY_EVENT, cb);
}
const serverDaddy = () => false;
function setDaddy(on: boolean) {
  document.querySelector(ROOT)?.classList.toggle("toc-daddy", on);
  window.dispatchEvent(new Event(DADDY_EVENT));
}

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ── Pokes ──────────────────────────────────────────────────────────────── */
const POKE_LINES = [
  "Hey!",
  "Rude.",
  "I'm working here.",
  "That tickles.",
  "Poke the blog, not me.",
  "Ow. My H1.",
  "Do that again and I'm checking your alt text.",
  "I bite. SEO-wise.",
  "You found my ticklish leg.",
  "Stop poking, start scanning.",
];
const DADDY_POKES = 10;
let pokes = 0;

function nextPokeLine(): string {
  pokes += 1;
  if (pokes === 7) return "Three more and something happens…";
  if (pokes % DADDY_POKES === 0) {
    const on = !isDaddy();
    setDaddy(on);
    return on ? "You asked for it. 😎" : "Back to normal. Phew.";
  }
  if (pokes === 25) return "We've been at this a while. Should I start charging?";
  return POKE_LINES[(pokes - 1) % POKE_LINES.length];
}

/* ── The spider ─────────────────────────────────────────────────────────── */
export function Spider({
  className = "",
  mood = "smirk",
  onPoke,
  title = "That One Crawler’s spider mascot",
}: {
  className?: string;
  mood?: Mood;
  /** When set, the spider is a button: it squishes and hands back a line. */
  onPoke?: (line: string) => void;
  title?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRefs = useRef<(SVGCircleElement | null)[]>([]);
  const daddy = useSyncExternalStore(subscribeDaddy, isDaddy, serverDaddy);

  // Pupils follow the pointer.
  useEffect(() => {
    if (reducedMotion()) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const box = svg.getBoundingClientRect();
        if (!box.width) return;
        const scale = box.width / 200;
        EYES.forEach((eye, i) => {
          const pupil = pupilRefs.current[i];
          if (!pupil) return;
          const dx = event.clientX - (box.left + eye.cx * scale);
          const dy = event.clientY - (box.top + eye.cy * scale);
          const dist = Math.hypot(dx, dy) || 1;
          const travel = Math.min(PUPIL_TRAVEL, dist / 30);
          pupil.setAttribute("transform", `translate(${(dx / dist) * travel} ${(dy / dist) * travel})`);
        });
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Blink at slightly random intervals, so two spiders on one page never blink in sync.
  useEffect(() => {
    if (reducedMotion()) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        const svg = svgRef.current;
        svg?.classList.add("toc-blink");
        setTimeout(() => svg?.classList.remove("toc-blink"), 180);
        schedule();
      }, 2500 + Math.random() * 4500);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  const poke = () => {
    const svg = svgRef.current;
    if (svg) {
      svg.classList.remove("toc-squish");
      void svg.getBoundingClientRect(); // restart the animation on rapid pokes
      svg.classList.add("toc-squish");
    }
    onPoke?.(nextPokeLine());
  };

  const shades = daddy || mood === "cool";
  const [leftBrow, rightBrow] = BROWS[mood];

  const svg = (
    <svg ref={svgRef} viewBox="0 0 200 200" className="block h-full w-full overflow-visible" role="img" aria-label={title}>
      <g fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round">
        <path d="M78 98 Q50 60 26 74" />
        <path d="M74 110 Q40 94 16 114" />
        <path d="M74 122 Q42 130 22 152" />
        <path d="M80 134 Q56 158 44 182" />
        <path d="M122 98 Q150 60 174 74" />
        <path d="M126 110 Q160 94 184 114" />
        <path d="M126 122 Q158 130 178 152" />
        <path d="M120 134 Q144 158 156 182" />
      </g>
      <ellipse cx="100" cy="117" rx="38" ry="40" fill={INK} />
      <path d={leftBrow} fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d={rightBrow} fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      {EYES.map((eye, i) => (
        <g key={i} className="toc-eye">
          <circle cx={eye.cx} cy={eye.cy} r="18" fill="#ffffff" stroke={INK} strokeWidth="3" />
          <circle
            ref={(el) => {
              pupilRefs.current[i] = el;
            }}
            cx={eye.cx}
            cy={eye.cy + 2}
            r={mood === "shocked" ? 5 : 7.5}
            fill={INK}
          />
        </g>
      ))}
      {shades && (
        <g>
          <path d="M60 78 H140" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <rect x="62" y="76" width="38" height="22" rx="9" fill={INK} />
          <rect x="102" y="76" width="38" height="22" rx="9" fill={INK} />
          <path d="M70 81 L80 81" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
          <path d="M110 81 L120 81" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {mood === "shocked" ? (
        <>
          <ellipse cx="100" cy="128" rx="6" ry="8" fill={PAPER} />
          <path d="M140 70 Q146 80 140 86 Q134 80 140 70 Z" fill="#8ecbff" stroke={INK} strokeWidth="1.5" />
        </>
      ) : (
        <path d={MOUTHS[mood]} fill="none" stroke={PAPER} strokeWidth="4" strokeLinecap="round" />
      )}
      {daddy ? (
        <path d="M78 142 Q100 162 122 142" fill="none" stroke="#f5c242" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 7" />
      ) : (
        <g stroke={INK} strokeWidth="2" strokeLinejoin="round">
          <path d="M86 140 L100 147 L86 154 Z" fill="var(--toc-lime)" />
          <path d="M114 140 L100 147 L114 154 Z" fill="var(--toc-lime)" />
          <circle cx="100" cy="147" r="3.5" fill="var(--toc-lime)" />
        </g>
      )}
    </svg>
  );

  if (!onPoke) return <span className={`relative inline-block ${className}`}>{svg}</span>;
  return (
    <span className={`relative inline-block ${className}`}>
      <button type="button" onClick={poke} className="block h-full w-full cursor-pointer" aria-label="Poke the spider">
        {svg}
      </button>
    </span>
  );
}

/* ── The hero spider: a speech bubble that answers back ──────────────────── */
const IDLE = { line: "I've seen things. Mostly missing H1s.", mood: "smirk" as Mood };

export function HeroSpider() {
  const [reaction, setReaction] = useState(IDLE);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const onPoke = (line: string) => {
    setReaction({ line, mood: "shocked" });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setReaction(IDLE), 2400);
  };

  return (
    <div className="relative mx-auto w-full max-w-[17rem] md:max-w-xs">
      <div
        aria-live="polite"
        className="absolute -top-3 right-0 z-10 max-w-[14rem] rotate-3 rounded-2xl px-4 py-3 font-manrope text-[13.5px] font-bold leading-snug sm:-right-4"
        style={{ background: "#fffcf5", color: INK, border: `2px solid ${INK}`, boxShadow: `4px 4px 0 0 ${INK}` }}
      >
        {reaction.line}
        <span
          aria-hidden
          className="absolute -bottom-[9px] left-8 h-4 w-4 rotate-45"
          style={{ background: "#fffcf5", borderRight: `2px solid ${INK}`, borderBottom: `2px solid ${INK}` }}
        />
      </div>
      <Spider mood={reaction.mood} onPoke={onPoke} className="toc-wobble mt-16 w-full drop-shadow-[6px_6px_0_#ddd3bf]" />
      <p className="mt-2 text-center font-dmmono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: "#6f6758" }}>
        Go on, poke him
      </p>
    </div>
  );
}

/** Appears only in Daddy mode. */
export function DaddyBadge() {
  const daddy = useSyncExternalStore(subscribeDaddy, isDaddy, serverDaddy);
  if (!daddy) return null;
  return (
    <button
      type="button"
      onClick={() => setDaddy(false)}
      className="toc-rise fixed left-1/2 top-24 z-[60] -translate-x-1/2 rounded-full px-4 py-2 font-manrope text-[13px] font-extrabold"
      style={{ background: "#ffc83d", color: INK, border: `2px solid ${INK}`, boxShadow: `3px 3px 0 0 ${INK}` }}
    >
      😎 Crawl Daddy mode: ON · tap to leave
    </button>
  );
}
