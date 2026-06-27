"use client";

/* ═══════════════════════════════════════════════════════════════════════════
 *  Forget Anything? — bespoke interactive landing-page scenes
 *  Royal Emerald & Gold. Self-contained client components.
 * ═══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { m, useInView, AnimatePresence } from "framer-motion";

const GOLD = "#D4AF37";
const GOLD_HI = "#FCF6BA";
const EMERALD = "#50C878";

/* ── Real in-app screenshots (actual UI captures) ─────────────────────────── */
const SCREENS = [
  { src: "/forget-anything-app/1.%20Welcome%20Screen.jpeg", title: "Welcome", caption: "A calm, two-mode start — Daily or Trip." },
  { src: "/forget-anything-app/2.%20Dashboard.jpeg", title: "Dashboard", caption: "Tap your essentials, flip tracking on. Done." },
  { src: "/forget-anything-app/3.%20Items%20Menu.jpeg", title: "Essentials", caption: "Keys, wallet, phone, glasses — your kit." },
  { src: "/forget-anything-app/4.%20New%20Items%20Add%20Menu.jpeg", title: "Add Anything", caption: "Custom items in seconds. Inhaler. Passport. Charger." },
  { src: "/forget-anything-app/5.%20Settings.jpeg", title: "Triggers", caption: "Wi-Fi, geofence, or both — your call." },
  { src: "/forget-anything-app/6.%20Settings%202.jpeg", title: "Timing", caption: "Single or burst. Tune the nudge to your liking." },
  { src: "/forget-anything-app/7.%20Notifications.jpeg", title: "The Reminder", caption: "The checklist that finds you the moment you leave." },
] as const;

/* ── Feature spotlight posters ────────────────────────────────────────────
 *  The original full-page concept (1 (5)) is kept in the MIDDLE of the set so
 *  it opens as the centre card of the showcase.
 * ────────────────────────────────────────────────────────────────────────── */
const POSTERS = [
  { src: "/forget-anything-app/spotlights/02-triggers.png", title: "Smart Triggers", sub: "Location, Wi-Fi, or both", w: 941, h: 1672 },
  { src: "/forget-anything-app/spotlights/03-radius.png", title: "Adjustable Radius", sub: "Tune your own safe zone", w: 941, h: 1672 },
  { src: "/forget-anything-app/spotlights/04-timing.png", title: "Smarter Timing", sub: "Burst reminders that land", w: 941, h: 1672 },
  { src: "/forget-anything-app/Images/1 (5).png", title: "The Original Concept", sub: "Where this page began", w: 1024, h: 1536 },
  { src: "/forget-anything-app/spotlights/05-burst.png", title: "One Alert or Many", sub: "Single or burst — you decide", w: 941, h: 1672 },
  { src: "/forget-anything-app/spotlights/06-trip.png", title: "Trip Mode", sub: "Pack with confidence", w: 941, h: 1672 },
  { src: "/forget-anything-app/spotlights/07-custom.png", title: "Custom Essentials", sub: "Add what matters to you", w: 941, h: 1672 },
  { src: "/forget-anything-app/spotlights/01-overview.png", title: "The Whole Idea", sub: "Never leave essentials behind", w: 941, h: 1672 },
] as const;
const CENTER_START = 3; // index of "The Original Concept"

/* ═══════════════════════════════════════════════════════════════════════════
 *  FadeIn — scroll entrance
 * ═══════════════════════════════════════════════════════════════════════════ */
export function FadeIn({ children, delay = 0, y = 24, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <m.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </m.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  FlowField — reusable animated atmosphere so long scroll never goes monotone.
 *  Drop one into any <section> (it's absolutely positioned, pointer-events-none).
 * ═══════════════════════════════════════════════════════════════════════════ */
type Tone = "hero" | "emerald" | "gold" | "mixed" | "deep";
const PARTICLES = [
  { x: 12, y: 22, s: 3, d: 0 }, { x: 28, y: 64, s: 2, d: 1.4 }, { x: 44, y: 14, s: 4, d: 0.7 },
  { x: 63, y: 48, s: 2, d: 2.1 }, { x: 78, y: 28, s: 3, d: 1 }, { x: 88, y: 70, s: 2, d: 1.8 },
  { x: 36, y: 84, s: 3, d: 0.4 }, { x: 70, y: 86, s: 2, d: 2.4 }, { x: 18, y: 46, s: 2, d: 1.2 },
];

export function FlowField({ tone = "emerald", pattern = "rings", particles = false, className = "" }: { tone?: Tone; pattern?: "rings" | "grid" | "contour" | "none"; particles?: boolean; className?: string }) {
  const orbs =
    tone === "hero"
      ? [
          { c: EMERALD, size: "60vw", top: "-25%", left: "-12%", op: 0.16, dur: 22 },
          { c: GOLD, size: "42vw", top: "8%", right: "-10%", op: 0.12, dur: 26 },
          { c: "#2E8B57", size: "38vw", bottom: "-20%", left: "30%", op: 0.12, dur: 30 },
        ]
      : tone === "gold"
      ? [
          { c: GOLD, size: "44vw", top: "-15%", right: "-8%", op: 0.1, dur: 24 },
          { c: "#9a6a2f", size: "36vw", bottom: "-18%", left: "-10%", op: 0.09, dur: 28 },
        ]
      : tone === "mixed"
      ? [
          { c: EMERALD, size: "40vw", top: "-12%", left: "-10%", op: 0.12, dur: 23 },
          { c: GOLD, size: "34vw", bottom: "-16%", right: "-8%", op: 0.1, dur: 27 },
        ]
      : tone === "deep"
      ? [
          { c: "#2E8B57", size: "46vw", top: "20%", left: "-14%", op: 0.09, dur: 30 },
          { c: "#1f6b45", size: "34vw", bottom: "-20%", right: "-10%", op: 0.08, dur: 26 },
        ]
      : [
          { c: EMERALD, size: "42vw", top: "-14%", left: "-12%", op: 0.11, dur: 24 },
          { c: "#2E8B57", size: "34vw", bottom: "-18%", right: "-8%", op: 0.09, dur: 28 },
        ];

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* drifting orbs */}
      {orbs.map((o, i) => (
        <div key={i} className="absolute rounded-full blur-[110px] md:blur-[150px]"
          style={{ background: `radial-gradient(circle, ${o.c}, transparent 65%)`, width: o.size, height: o.size, top: o.top, bottom: (o as { bottom?: string }).bottom, left: (o as { left?: string }).left, right: (o as { right?: string }).right, opacity: o.op, animation: `fa-float ${o.dur}s ease-in-out ${i * 1.5}s infinite` }} />
      ))}

      {/* hero gets a slow conic aurora */}
      {tone === "hero" && (
        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-[0.13]"
          style={{ background: "conic-gradient(from 120deg at 50% 50%, #50C878, #0e3a24, #D4AF37, #1f6b45, #50C878)", animation: "fa-conic 70s linear infinite" }} />
      )}

      {/* pattern overlays */}
      {pattern === "rings" && (
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vh] h-[140vh] opacity-[0.06]" viewBox="-100 -100 200 200" style={{ animation: "fa-conic 120s linear infinite" }}>
          {[30, 50, 70, 90].map((r) => (<circle key={r} cx="0" cy="0" r={r} fill="none" stroke={EMERALD} strokeWidth="0.25" strokeDasharray="2 3" />))}
        </svg>
      )}
      {pattern === "grid" && (
        <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: `radial-gradient(rgba(80,200,120,0.10) 0.6px, transparent 0.7px)`, backgroundSize: "30px 30px", maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)" }} />
      )}
      {pattern === "contour" && (
        <svg className="absolute inset-x-0 bottom-0 w-[200%] h-[50%] opacity-[0.10]" viewBox="0 0 1200 300" preserveAspectRatio="none" style={{ animation: "fa-contour 40s linear infinite" }}>
          {[40, 110, 180, 250].map((y, i) => (
            <path key={i} d={`M0 ${y} C 200 ${y - 30}, 400 ${y + 30}, 600 ${y} S 1000 ${y - 30}, 1200 ${y} S 1600 ${y + 30}, 1800 ${y} S 2200 ${y - 30}, 2400 ${y}`} fill="none" stroke={i % 2 ? GOLD : EMERALD} strokeWidth="1.2" />
          ))}
        </svg>
      )}

      {/* twinkle particles */}
      {particles && PARTICLES.map((p, i) => (
        <span key={i} className="absolute rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: i % 2 ? GOLD : EMERALD, boxShadow: `0 0 ${p.s * 3}px ${i % 2 ? GOLD : EMERALD}`, animation: `fa-twinkle ${4 + p.d}s ease-in-out ${p.d}s infinite` }} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  WifiBars — breathing signal bars (used in monitor widgets)
 * ═══════════════════════════════════════════════════════════════════════════ */
export function WifiBars({ color = EMERALD, size = 1 }: { color?: string; size?: number }) {
  const heights = [6, 10, 14, 18].map((h) => h * size);
  return (
    <span className="inline-flex items-end gap-[2px]" aria-hidden>
      {heights.map((h, i) => (
        <span key={i} style={{ width: 3 * size, height: h, borderRadius: 2, background: color, transformOrigin: "bottom", animation: `fa-wave 1.6s ease-in-out ${i * 0.18}s infinite` }} />
      ))}
    </span>
  );
}

/* Real Wi-Fi glyph — concentric arcs + dot (what Wi-Fi actually looks like). */
function WifiArcs({ color = EMERALD, animated = true }: { color?: string; animated?: boolean }) {
  return (
    <svg width="56" height="44" viewBox="0 0 56 44" fill="none" aria-hidden>
      {[
        { d: "M6 16 A 34 34 0 0 1 50 16", w: 3.2, delay: "0s" },
        { d: "M13 24 A 23 23 0 0 1 43 24", w: 3.2, delay: "0.18s" },
        { d: "M20 32 A 12 12 0 0 1 36 32", w: 3.2, delay: "0.36s" },
      ].map((a, i) => (
        <path key={i} d={a.d} stroke={color} strokeWidth={a.w} strokeLinecap="round"
          style={animated ? { animation: `fa-pulse-soft 1.8s ease-in-out ${a.delay} infinite` } : undefined} />
      ))}
      <circle cx="28" cy="39" r="3" fill={color} style={animated ? { animation: "fa-pulse-soft 1.8s ease-in-out 0.54s infinite" } : undefined} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  LiveMonitor — glass status widget that floats over the hero
 * ═══════════════════════════════════════════════════════════════════════════ */
export function LiveMonitor({ className = "" }: { className?: string }) {
  return (
    <div className={`relative rounded-2xl border border-white/[0.1] bg-[#081a12]/85 backdrop-blur-xl p-4 w-[228px] ${className}`}
      style={{ boxShadow: "0 24px 60px -20px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full" style={{ background: EMERALD, animation: "fa-ping 2s ease-out infinite" }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: EMERALD }} />
          </span>
          <span className="font-dmmono text-[10px] tracking-[0.18em] uppercase text-white/55">Tracking active</span>
        </span>
        <WifiBars />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(80,200,120,0.12)", border: "1px solid rgba(80,200,120,0.25)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        </div>
        <div className="leading-tight">
          <p className="font-manrope text-[13px] font-semibold text-white/90">You&apos;re home</p>
          <p className="font-manrope text-[11px] text-white/40">Home Wi-Fi · 3 essentials armed</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  LeaveHomeSimulator — signature moment, now with an ADJUSTABLE radius and a
 *  live monitor panel that fills the right side.
 * ═══════════════════════════════════════════════════════════════════════════ */
export function LeaveHomeSimulator() {
  const [radius, setRadius] = useState(100); // metres, 50–400

  // map radius → geofence rx (viewBox-x units ≈ % of scene width) and crossings
  const rx = 16 + ((radius - 50) / 350) * 24; // 16 … 40
  const home = 24; // % from left
  const cross = home + rx; // boundary right-edge %
  const far = Math.min(cross + 26, 92);

  const cssVars = {
    ["--fa-start" as string]: "13%",
    ["--fa-cross" as string]: `${cross}%`,
    ["--fa-far" as string]: `${far}%`,
  } as React.CSSProperties;

  return (
    <div className="rounded-[28px] border border-white/[0.08] overflow-hidden" style={{ ...cssVars, background: "linear-gradient(135deg, #0b241a 0%, #07140e 60%, #050d09 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 40px 120px -40px rgba(80,200,120,0.18)" }}>
      <div className="grid lg:grid-cols-[1.65fr_1fr]">

        {/* ── MAP SCENE ── */}
        <div className="relative min-h-[300px] sm:min-h-[360px] overflow-hidden">
          {/* grid floor */}
          <div className="absolute inset-0 opacity-[0.5] pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(80,200,120,0.10) 0.5px, transparent 0.6px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, transparent, black 40%)" }} />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden>
            {[1, 0.72, 0.46].map((s, i) => (
              <ellipse key={i} cx={home} cy="31" rx={rx * s} ry={(rx * 0.6) * s} fill="none" stroke={EMERALD} strokeWidth="0.18" strokeDasharray="1.4 1.4" opacity={0.16 + i * 0.06} style={{ transition: "rx .35s ease, ry .35s ease" }} />
            ))}
            <ellipse cx={home} cy="31" rx={rx} ry={rx * 0.6} fill="url(#fa-geo)" opacity="0.5" style={{ transition: "rx .35s ease, ry .35s ease" }} />
            <defs><radialGradient id="fa-geo"><stop offset="0%" stopColor={EMERALD} stopOpacity="0.1" /><stop offset="100%" stopColor={EMERALD} stopOpacity="0" /></radialGradient></defs>
          </svg>

          {/* boundary marker */}
          <div className="absolute top-[26%] bottom-[16%] w-px pointer-events-none transition-all duration-300" style={{ left: `${cross}%`, background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.55), transparent)" }} />
          <div className="absolute transition-all duration-300" style={{ left: `${cross}%`, top: "20%", transform: "translateX(-50%)" }}>
            <span className="font-dmmono text-[9px] tracking-[0.15em] uppercase whitespace-nowrap" style={{ color: `${GOLD}aa` }}>edge · {radius} m</span>
          </div>

          {/* home tile */}
          <div className="absolute" style={{ left: `${home}%`, top: "44%", transform: "translate(-50%,-50%)" }}>
            <div className="relative flex flex-col items-center">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2" style={{ animation: "fa-wifi-on 9s ease-in-out infinite" }}><WifiBars color={EMERALD} size={0.85} /></div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center gap-1" style={{ animation: "fa-wifi-off 9s ease-in-out infinite" }}><WifiBars color="#9a6a2f" size={0.85} /><span style={{ color: GOLD }} className="text-[10px] font-bold leading-none">⚠</span></div>
              <div className="mt-5 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(160deg, rgba(80,200,120,0.16), rgba(80,200,120,0.04))", border: "1px solid rgba(80,200,120,0.3)", boxShadow: "0 12px 30px -10px rgba(80,200,120,0.4)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              </div>
              <span className="mt-2 font-dmmono text-[9px] tracking-[0.14em] uppercase text-white/45">Home</span>
            </div>
          </div>

          {/* alarm ping */}
          <div className="absolute pointer-events-none transition-all duration-300" style={{ left: `${cross}%`, top: "55%", transform: "translate(-50%,-50%)" }}>
            <div className="w-10 h-10 rounded-full" style={{ border: `2px solid ${GOLD}`, animation: "fa-alarm 9s ease-out infinite" }} />
          </div>

          {/* traveller */}
          <div className="absolute" style={{ top: "55%", transform: "translate(-50%,-50%)", animation: "fa-traverse 9s cubic-bezier(0.4,0,0.2,1) infinite" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(160deg, ${GOLD_HI}, ${GOLD})`, boxShadow: `0 0 24px ${GOLD}99` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A2E1C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a6.5 6.5 0 0 1 13 0" /></svg>
            </div>
          </div>

          {/* status pill */}
          <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
            <div className="relative h-7">
              <div className="absolute inset-0 flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.1] bg-black/30 backdrop-blur px-3 py-1.5" style={{ animation: "fa-status-a 9s ease-in-out infinite" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: EMERALD }} /><span className="font-dmmono text-[10px] tracking-[0.12em] uppercase text-white/65">At home · monitoring</span>
              </div>
              <div className="absolute inset-0 flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5" style={{ border: `1px solid ${GOLD}55`, background: "rgba(212,175,55,0.1)", animation: "fa-status-b 9s ease-in-out infinite" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} /><span className="font-dmmono text-[10px] tracking-[0.12em] uppercase" style={{ color: GOLD_HI }}>Left home · checklist sent</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MONITOR PANEL (fills the right) ── */}
        <div className="relative border-t lg:border-t-0 lg:border-l border-white/[0.07] bg-black/20 p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-dmmono text-[10px] tracking-[0.22em] uppercase text-white/40">Live monitor</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: EMERALD, animation: "fa-blink 1.4s steps(1) infinite" }} /><span className="font-dmmono text-[9px] uppercase tracking-widest text-white/35">on-device</span></span>
          </div>

          {/* the reminder card pops here too */}
          <div className="relative h-[88px]">
            <div className="absolute inset-0 rounded-2xl border border-white/[0.07] bg-white/[0.02] flex items-center px-4" style={{ animation: "fa-status-a 9s ease-in-out infinite" }}>
              <div className="flex items-center gap-3"><WifiArcs color={EMERALD} /><div><p className="font-manrope text-[13px] font-semibold text-white/85">All quiet</p><p className="font-manrope text-[11px] text-white/40">Inside the safe zone</p></div></div>
            </div>
            <div className="absolute inset-0 rounded-2xl border p-3.5" style={{ borderColor: `${GOLD}40`, background: "linear-gradient(160deg, rgba(212,175,55,0.12), rgba(80,200,120,0.04))", animation: "fa-popcard 9s ease-in-out infinite" }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-base" style={{ background: "rgba(0,0,0,0.25)", border: `1px solid ${GOLD}40` }}>🔔</div>
                <div className="min-w-0"><p className="font-manrope text-[12.5px] font-bold text-white/90 leading-tight">🏠 Leaving home?</p><p className="font-manrope text-[11px] mt-1" style={{ color: `${GOLD_HI}` }}>📋 keys · wallet · phone</p></div>
              </div>
            </div>
          </div>

          {/* readouts */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { k: "Trigger", v: "Combined" },
              { k: "Safe radius", v: `${radius} m` },
              { k: "GPS battery", v: "0%" },
              { k: "Data sent", v: "0 KB" },
            ].map((r) => (
              <div key={r.k} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                <p className="font-dmmono text-[8.5px] uppercase tracking-widest text-white/30">{r.k}</p>
                <p className="font-manrope text-[13px] font-semibold mt-0.5" style={{ color: r.v.includes("0") && (r.k === "GPS battery" || r.k === "Data sent") ? EMERALD : "rgba(255,255,255,0.85)" }}>{r.v}</p>
              </div>
            ))}
          </div>

          {/* radius slider */}
          <div className="mt-auto pt-1">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="fa-radius" className="font-dmmono text-[10px] uppercase tracking-[0.16em] text-white/45">Drag to resize zone</label>
              <span className="font-manrope text-[12px] font-bold" style={{ color: GOLD_HI }}>{radius} m</span>
            </div>
            <input id="fa-radius" type="range" min={50} max={400} step={10} value={radius} onChange={(e) => setRadius(+e.target.value)} className="fa-range w-full" aria-label="Geofence radius in metres" />
            <div className="flex justify-between mt-1 font-dmmono text-[8px] uppercase tracking-widest text-white/25"><span>50 m</span><span>cosy</span><span>wide</span><span>400 m</span></div>
          </div>
        </div>
      </div>

      {/* range styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .fa-range{-webkit-appearance:none;appearance:none;height:6px;border-radius:6px;background:linear-gradient(90deg,${EMERALD},${GOLD});outline:none;cursor:pointer;}
        .fa-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;border-radius:50%;background:${GOLD_HI};border:2px solid ${GOLD};box-shadow:0 2px 10px rgba(212,175,55,0.6);cursor:pointer;}
        .fa-range::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:${GOLD_HI};border:2px solid ${GOLD};box-shadow:0 2px 10px rgba(212,175,55,0.6);cursor:pointer;}
      `}} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  PhoneFrame — reusable premium device frame
 * ═══════════════════════════════════════════════════════════════════════════ */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "9 / 19.5" }}>
      <div className="absolute inset-0 rounded-[2.4rem] p-[3px]" style={{ background: "linear-gradient(160deg, rgba(212,175,55,0.5), rgba(80,200,120,0.18) 40%, rgba(0,0,0,0.6))", boxShadow: "0 40px 90px -30px rgba(0,0,0,0.8)" }}>
        <div className="relative h-full w-full rounded-[2.2rem] overflow-hidden bg-black" style={{ boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.9)" }}>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-5 w-20 rounded-full bg-black/90" />
          {children}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  CoverflowGallery — real screens rotating through a central phone.
 *  Center is fully lit inside the frame; neighbours sit dim on either side.
 * ═══════════════════════════════════════════════════════════════════════════ */
export function CoverflowGallery() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const n = SCREENS.length;

  useEffect(() => {
    if (paused || !inView) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 3200);
    return () => clearInterval(t);
  }, [paused, inView, n]);

  const rel = (i: number) => { let d = i - idx; if (d > n / 2) d -= n; if (d < -n / 2) d += n; return d; };
  const active = SCREENS[idx];

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* stage */}
      <div className="relative h-[360px] sm:h-[420px] flex items-center justify-center" style={{ perspective: "1400px" }}>
        <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-[100px] -z-10" style={{ background: "radial-gradient(circle, rgba(80,200,120,0.16), transparent 65%)" }} />

        {SCREENS.map((s, i) => {
          const d = rel(i);
          const abs = Math.abs(d);
          if (abs > 2) return null;
          const isCenter = d === 0;
          const style: React.CSSProperties = {
            transform: `translateX(${d * 150}px) scale(${isCenter ? 1 : abs === 1 ? 0.74 : 0.56}) rotateY(${d * -22}deg)`,
            opacity: isCenter ? 1 : abs === 1 ? 0.42 : 0.16,
            zIndex: 20 - abs,
            filter: isCenter ? "none" : "brightness(0.5) saturate(0.8)",
            transition: "transform .6s cubic-bezier(.22,1,.36,1), opacity .6s, filter .6s",
            cursor: isCenter ? "default" : "pointer",
          };
          return (
            <div key={s.src} className="absolute" style={style} onClick={() => !isCenter && setIdx(i)}>
              {isCenter ? (
                <PhoneFrame className="w-[190px] sm:w-[212px]">
                  {SCREENS.map((ss, k) => (
                    <Image key={ss.src} src={ss.src} alt={`${ss.title} screen`} fill sizes="212px" className="object-cover object-top transition-opacity duration-500" style={{ opacity: k === idx ? 1 : 0 }} priority={k === 0} />
                  ))}
                </PhoneFrame>
              ) : (
                <div className="w-[190px] sm:w-[212px] rounded-[2rem] overflow-hidden border border-white/10" style={{ aspectRatio: "9 / 19.5" }}>
                  <Image src={s.src} alt="" fill sizes="212px" className="object-cover object-top" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* caption + controls */}
      <div className="text-center mt-8">
        <div key={active.title} className="inline-flex flex-col items-center" style={{ animation: "fa-rise 0.5s ease-out" }}>
          <h3 className="font-manrope font-bold text-xl md:text-2xl text-white/90">{active.title}</h3>
          <p className="font-manrope text-[14px] text-white/45 mt-1.5 max-w-sm">{active.caption}</p>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          {SCREENS.map((s, i) => (
            <button key={s.src} onClick={() => setIdx(i)} aria-label={`Show ${s.title}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === idx ? 26 : 8, background: i === idx ? GOLD : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  SpotlightDeck — the 7 posters as a fanned, overlapping deck (~80% visible).
 *  Hover lifts a card to reveal it fully; click opens a readable lightbox.
 * ═══════════════════════════════════════════════════════════════════════════ */
export function SpotlightDeck() {
  const [open, setOpen] = useState<number | null>(null);
  const [idx, setIdx] = useState(CENTER_START);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px" });
  const n = POSTERS.length;

  useEffect(() => {
    if (paused || !inView || open !== null) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 4600);
    return () => clearInterval(t);
  }, [paused, inView, open, n]);

  const rel = (i: number) => { let d = i - idx; if (d > n / 2) d -= n; if (d < -n / 2) d += n; return d; };
  const active = POSTERS[idx];

  return (
    <>
      {/* desktop ss3-style perspective showcase */}
      <div ref={ref} className="hidden md:block" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="relative h-[560px] lg:h-[600px] flex items-center justify-center" style={{ perspective: "1800px" }}>
          <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[420px] rounded-full blur-[110px] -z-10" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.14), rgba(80,200,120,0.08) 50%, transparent 70%)" }} />
          {POSTERS.map((p, i) => {
            const d = rel(i);
            const abs = Math.abs(d);
            if (abs > 2) return null;
            const isCenter = d === 0;
            const style: React.CSSProperties = {
              transform: `translateX(${d * 62}%) translateZ(${isCenter ? 0 : abs === 1 ? -160 : -320}px) rotateY(${d * -34}deg) scale(${isCenter ? 1 : abs === 1 ? 0.92 : 0.8})`,
              opacity: isCenter ? 1 : abs === 1 ? 0.62 : 0.28,
              zIndex: 20 - abs,
              filter: isCenter ? "none" : "brightness(0.55) saturate(0.85)",
              transition: "transform .7s cubic-bezier(.22,1,.36,1), opacity .7s, filter .7s",
              cursor: "pointer",
            };
            return (
              <button key={p.src} aria-label={isCenter ? `Open ${p.title}` : `Show ${p.title}`} onClick={() => (isCenter ? setOpen(i) : setIdx(i))}
                className="absolute w-[300px] lg:w-[330px] rounded-[20px] overflow-hidden border focus:outline-none"
                style={{ ...style, aspectRatio: `${p.w} / ${p.h}`, borderColor: isCenter ? "rgba(212,175,55,0.45)" : "rgba(255,255,255,0.1)", boxShadow: isCenter ? "0 50px 120px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,175,55,0.2)" : "0 30px 70px -30px rgba(0,0,0,0.8)" }}>
                <Image src={p.src} alt={p.title} fill sizes="330px" className="object-cover object-top" priority={i === CENTER_START} />
                {isCenter && <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[20px] pointer-events-none" />}
              </button>
            );
          })}
        </div>

        {/* caption + nav */}
        <div className="text-center mt-2">
          <div key={active.title} className="inline-flex flex-col items-center" style={{ animation: "fa-rise 0.5s ease-out" }}>
            <h3 className="font-manrope font-bold text-xl lg:text-2xl text-white/90">{active.title}</h3>
            <p className="font-manrope text-[13px] text-white/45 mt-1">{active.sub} · <span style={{ color: `${GOLD}cc` }}>tap centre to open</span></p>
          </div>
          <div className="flex items-center justify-center gap-2 mt-5">
            {POSTERS.map((p, i) => (
              <button key={p.src} onClick={() => setIdx(i)} aria-label={`Show ${p.title}`} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === idx ? 26 : 8, background: i === idx ? GOLD : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
        </div>
      </div>

      {/* mobile horizontal scroll */}
      <div className="md:hidden flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 snap-x" style={{ scrollbarWidth: "none" }}>
        {POSTERS.map((p, i) => (
          <button key={p.src} onClick={() => setOpen(i)} className="relative shrink-0 w-[160px] snap-center rounded-2xl overflow-hidden border border-white/10" style={{ aspectRatio: `${p.w} / ${p.h}` }} aria-label={`Open ${p.title}`}>
            <Image src={p.src} alt={p.title} fill sizes="160px" className="object-cover object-top" />
            <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent text-left">
              <p className="font-manrope text-[11px] font-bold text-white leading-tight">{p.title}</p>
            </div>
          </button>
        ))}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {open !== null && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md" onClick={() => setOpen(null)}>
            <m.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }} transition={{ ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] w-auto" onClick={(e) => e.stopPropagation()}>
              <Image src={POSTERS[open].src} alt={POSTERS[open].title} width={POSTERS[open].w} height={POSTERS[open].h} className="h-[90vh] w-auto rounded-2xl border border-white/10 object-contain" />
              <button onClick={() => setOpen(null)} className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-white text-black flex items-center justify-center font-bold shadow-lg" aria-label="Close">✕</button>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {POSTERS.map((p, i) => (
                  <button key={p.src} onClick={() => setOpen(i)} className="h-1.5 rounded-full transition-all" style={{ width: i === open ? 22 : 7, background: i === open ? GOLD : "rgba(255,255,255,0.35)" }} aria-label={p.title} />
                ))}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  EssentialsMarquee — endless ribbon of the things people forget
 * ═══════════════════════════════════════════════════════════════════════════ */
const ESSENTIALS = ["Keys", "Wallet", "Phone", "Glasses", "Charger", "Umbrella", "Inhaler", "Passport", "Earbuds", "Water Bottle", "Badge", "Medication"];
export function EssentialsMarquee() {
  const row = [...ESSENTIALS, ...ESSENTIALS];
  return (
    <div className="relative overflow-hidden py-5" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
      <div className="flex w-max gap-4" style={{ animation: "fa-marquee 38s linear infinite" }}>
        {row.map((e, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap font-manrope text-lg md:text-2xl font-medium" style={{ color: i % 3 === 0 ? `${GOLD}99` : "rgba(255,255,255,0.28)" }}>
            {e}<span className="h-1 w-1 rounded-full" style={{ background: `${EMERALD}99` }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  TriggerCard — animated mini-visual per detection trigger (richer)
 * ═══════════════════════════════════════════════════════════════════════════ */
export function TriggerCard({ kind, title, desc, delay = 0 }: { kind: "geofence" | "wifi" | "both"; title: string; desc: string; delay?: number }) {
  return (
    <FadeIn delay={delay} className="h-full">
      <div className="group relative h-full rounded-[22px] p-7 overflow-hidden transition-all duration-500" style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}>
        {/* gradient border glow on hover */}
        <div className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px ${EMERALD}40, 0 30px 70px -30px ${EMERALD}55` }} />
        {/* diagonal sheen */}
        <div className="absolute inset-0 overflow-hidden rounded-[22px] pointer-events-none">
          <div className="absolute top-0 -left-1/2 w-1/2 h-full opacity-0 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", animation: "fa-sheen 1.4s ease-out" }} />
        </div>

        <div className="relative h-24 mb-6 flex items-center justify-center">
          {kind === "geofence" && (
            <div className="relative h-20 w-20">
              {[0, 0.6, 1.2].map((d) => (<span key={d} className="absolute inset-0 rounded-full" style={{ border: `1.5px solid ${EMERALD}`, animation: `fa-ping 2.6s ease-out ${d}s infinite` }} />))}
              <span className="absolute inset-0 m-auto h-3 w-3 rounded-full" style={{ background: EMERALD, boxShadow: `0 0 16px ${EMERALD}` }} />
            </div>
          )}
          {kind === "wifi" && <WifiArcs color={EMERALD} />}
          {kind === "both" && (
            <div className="relative h-20 w-32">
              <span className="absolute top-1/2 left-[34%] -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full" style={{ border: `1.5px solid ${EMERALD}`, animation: "fa-ping 2.8s ease-out infinite" }} />
              <span className="absolute top-1/2 left-[34%] -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full" style={{ border: `1.5px solid ${EMERALD}55` }} />
              <span className="absolute top-1/2 left-[66%] -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full" style={{ border: `1.5px solid ${GOLD}`, animation: "fa-ping 2.8s ease-out 0.7s infinite" }} />
              <span className="absolute top-1/2 left-[66%] -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full" style={{ border: `1.5px solid ${GOLD}55` }} />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full" style={{ background: GOLD_HI, boxShadow: `0 0 18px ${GOLD}`, animation: "fa-pulse-soft 2s ease-in-out infinite" }} />
            </div>
          )}
        </div>
        <h3 className="relative font-manrope font-semibold text-lg text-white/90 mb-2">{title}</h3>
        <p className="relative font-manrope text-[13.5px] text-white/40 leading-relaxed">{desc}</p>
      </div>
    </FadeIn>
  );
}
