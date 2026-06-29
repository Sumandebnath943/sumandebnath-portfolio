"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { QDEX, HUMANEVAL } from "./qdex-data";

/* ─────────────────────────────────────────────────────────────────────────
   useInView — fire once when the element scrolls into view (drives the
   bar/ring grow-in animations).
   ──────────────────────────────────────────────────────────────────────── */
function useInView<T extends Element>(amount = 0.4) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: amount }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);
  return { ref, seen };
}

/* ─────────────────────────────────────────────────────────────────────────
   HumanEvalBars — the headline before/after.
   Three horizontal bars: base-completion (reference), base-instruction (the
   broken "before"), Qdex-instruction (the "after"). Grows in on scroll; the
   40.2% base-completion line is drawn as a dashed "latent ceiling" reference.
   ──────────────────────────────────────────────────────────────────────── */
export function HumanEvalBars() {
  const { ref, seen } = useInView<HTMLDivElement>(0.35);
  const MAX = 50; // axis ceiling (%) — keeps the 40.2 reference off the edge
  const ceiling = 40.2;

  return (
    <div ref={ref} className="relative">
      {/* dashed latent-ceiling reference at 40.2% */}
      <div
        aria-hidden
        className="absolute top-1 bottom-9 hidden sm:block"
        style={{ left: `calc(${(ceiling / MAX) * 100}% )` }}
      >
        <span className="block w-px h-full bg-[#38BDF8]/40 border-l border-dashed border-[#38BDF8]/50" />
        <span className="absolute -top-0.5 left-2 whitespace-nowrap font-dmmono text-[9.5px] uppercase tracking-[0.12em] text-[#38BDF8]/80">
          latent ceiling · 40.2%
        </span>
      </div>

      <div className="flex flex-col gap-5 pt-5">
        {HUMANEVAL.map((b, i) => (
          <div key={b.key} className="relative">
            <div className="flex items-baseline justify-between gap-3 mb-1.5">
              <span className="font-dmmono text-[11.5px] sm:text-[12px]" style={{ color: b.color }}>
                {b.model}
                <span className="text-[#5a6286]"> · {b.mode}</span>
              </span>
              <span className="font-manrope font-semibold tabular-nums text-[15px] shrink-0" style={{ color: b.color }}>
                {b.pct}%
                <span className="font-dmmono text-[10px] text-[#5a6286] ml-1.5">{b.ratio}</span>
              </span>
            </div>
            <div className="h-7 w-full rounded-md bg-white/[0.04] border border-white/[0.06] overflow-hidden relative">
              <m.div
                className="h-full rounded-md relative"
                style={{
                  background: `linear-gradient(90deg, ${b.color}cc, ${b.color})`,
                  boxShadow: b.highlight ? `0 0 24px -4px ${b.color}` : undefined,
                }}
                initial={{ width: 0 }}
                animate={seen ? { width: `${(b.pct / MAX) * 100}%` } : { width: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.18 }}
              >
                {b.highlight && (
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-60"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)", animation: "penta-shimmer 3.2s linear infinite" }}
                  />
                )}
              </m.div>
            </div>
            <p className="font-manrope text-[11.5px] text-[#7c84a8] mt-1.5 leading-snug">{b.note}</p>
          </div>
        ))}
      </div>

      {/* the takeaway arrow */}
      <div className="mt-7 pt-5 border-t border-white/[0.08] flex items-center justify-center gap-4 font-manrope">
        <span className="font-semibold text-2xl text-[#F43F5E] tabular-nums">1.2%</span>
        <span className="font-dmmono text-[#A78BFA] text-xl">→</span>
        <span className="font-semibold text-2xl tabular-nums bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${QDEX.emerald}, ${QDEX.sky})` }}>
          39.0%
        </span>
        <span className="font-dmmono text-[10.5px] uppercase tracking-[0.18em] text-[#7c84a8] ml-1">~32× · instruction mode</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ParamRing — QLoRA trainable-params donut: 18.5M of 1.56B (1.18%) trained,
   the rest frozen. Animates the arc on scroll.
   ──────────────────────────────────────────────────────────────────────── */
export function ParamRing() {
  const { ref, seen } = useInView<HTMLDivElement>(0.5);
  const R = 52;
  const C = 2 * Math.PI * R;
  const trained = 1.18; // %

  return (
    <div ref={ref} className="flex items-center gap-6">
      <div className="relative shrink-0">
        <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90">
          <circle cx="66" cy="66" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="11" />
          <circle
            cx="66"
            cy="66"
            r={R}
            fill="none"
            stroke={QDEX.violet}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={seen ? C * (1 - trained / 100) : C}
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s", filter: `drop-shadow(0 0 6px ${QDEX.violet}aa)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-manrope font-semibold text-[1.45rem] leading-none text-[#f3f4fb] tabular-nums">1.18%</span>
          <span className="font-dmmono text-[9px] uppercase tracking-[0.15em] text-[#7c84a8] mt-1">trained</span>
        </div>
      </div>
      <div className="min-w-0">
        <p className="font-manrope font-semibold text-[15px] text-[#f3f4fb] mb-1.5">18.5M of 1.56B params</p>
        <p className="font-manrope text-sm text-[#8b93b5] leading-relaxed">
          The entire base model is <span className="text-[#dfe3f2]">frozen</span>. Only tiny low-rank{" "}
          <span style={{ color: QDEX.violet }}>adapter</span> matrices are trained — which is what makes the
          fine-tune cheap, fast and runnable on a single free GPU.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   LossSpark — illustrative training-loss trajectory (anchored on the two
   reported values: ~1.06 at start → ~0.53 final). The curve shape is
   indicative; only the endpoints are labelled facts.
   ──────────────────────────────────────────────────────────────────────── */
export function LossSpark() {
  const { ref, seen } = useInView<SVGSVGElement>(0.4);
  const W = 320;
  const H = 120;
  // smooth decaying curve from (0,1.06) to (1,0.53), mapped into the box
  const pts: [number, number][] = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    const loss = 0.53 + (1.06 - 0.53) * Math.pow(1 - t, 1.7);
    const x = t * W;
    const y = H - ((loss - 0.45) / (1.12 - 0.45)) * H;
    return [x, y];
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${d} L${W},${H} L0,${H} Z`;

  return (
    <div>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none">
        <defs>
          <linearGradient id="qdex-loss-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={QDEX.amber} stopOpacity="0.28" />
            <stop offset="100%" stopColor={QDEX.amber} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#qdex-loss-fill)" opacity={seen ? 1 : 0} style={{ transition: "opacity 1s ease 0.6s" }} />
        <path
          d={d}
          fill="none"
          stroke={QDEX.amber}
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={seen ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.6s ease" }}
        />
      </svg>
      <div className="flex items-center justify-between font-dmmono text-[10.5px] mt-2">
        <span style={{ color: QDEX.amber }}>~1.06 <span className="text-[#5a6286]">start</span></span>
        <span className="text-[#5a6286]">2 epochs · 5,000 steps</span>
        <span style={{ color: QDEX.amber }}>~0.53 <span className="text-[#5a6286]">final</span></span>
      </div>
    </div>
  );
}
