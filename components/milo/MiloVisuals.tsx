"use client";

/**
 * The interactive pieces of /agents/milo.
 *
 * MiloLive is built the way the app builds him (src/components/MiloFace.tsx in
 * the Milo repo): the furry body and the moon are <img> layers, so the
 * feTurbulence fur is rasterised once and only ever moved by the compositor,
 * and the face is a small filter-free SVG on top that can blink, glance and
 * talk cheaply. Redrawing him as one inline SVG would re-run the fur filter on
 * every animation frame.
 *
 * All the keyframes and `ml-*` classes live in the page's CSS string, so this
 * file carries behaviour only.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  MILO,
  IMG,
  LINKS,
  CAST,
  STARTERS,
  STARTER_GROUPS,
  WISHES,
  HERO,
  STATES,
  avatarSrc,
  castById,
  starterFor,
  type CastMember,
  type Starter,
} from "./milo-data";

/* ─────────────────────────────────────────────────────────────────────────
 *  Helpers
 * ───────────────────────────────────────────────────────────────────────── */

const INK = MILO.ink;

/** WCAG relative luminance of a #rrggbb colour. */
function luminance(hex: string) {
  const v = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
}

/** Ink or white, whichever reads better on a character's own colour. */
export function textOn(hex: string) {
  const l = luminance(hex);
  const onInk = (l + 0.05) / (luminance(INK) + 0.05);
  const onWhite = 1.05 / (l + 0.05);
  return onInk >= onWhite ? INK : "#ffffff";
}

function hash(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Milo's own pickAvatar(): score the cast's keywords, prefer free characters.
 * In the app this is the FALLBACK — the drafting model chooses first, and this
 * rule only runs when its choice is taken or unknown. The toy has no model, so
 * it runs the fallback and says which words it matched.
 */
function pickCharacter(text: string, taken: string[]): { member: CastMember; matched: string[] } {
  const t = text.toLowerCase();
  const free = CAST.filter((c) => !taken.includes(c.id));
  const pool = free.length ? free : CAST;
  let best = pool[hash(t) % pool.length];
  let bestScore = 0;
  for (const c of pool) {
    const score = c.keywords.reduce((n, k) => n + (t.includes(k) ? k.length : 0), 0);
    if (score > bestScore) {
      best = c;
      bestScore = score;
    }
  }
  return { member: best, matched: bestScore ? best.keywords.filter((k) => t.includes(k)) : [] };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function Avatar({ id, size, className = "", alt = "" }: { id: string; size: number; className?: string; alt?: string }) {
  return (
    <Image
      src={avatarSrc(id)}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 *  MiloLive — the character himself
 * ───────────────────────────────────────────────────────────────────────── */

export type MiloState = "idle" | "listening" | "thinking" | "talking" | "happy";

const EYE = (x: number) => (
  <>
    <ellipse cx={x} cy={105} rx={11} ry={13.5} fill={INK} />
    <circle cx={x + 4} cy={99.5} r={4.6} fill="#fff" />
    <circle cx={x - 4} cy={111} r={2} fill="#fff" opacity={0.85} />
  </>
);

export function MiloLive({
  state = "idle",
  follow = false,
  className = "",
  label,
  hearts = 0,
}: {
  state?: MiloState;
  /** Eyes follow the pointer while he is idle. */
  follow?: boolean;
  className?: string;
  label?: string;
  /** Bump to release a little puff of hearts. */
  hearts?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!follow || reduced || !el) return;
    let visible = false;
    let frame = 0;
    let px = 0;
    let py = 0;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(el);
    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.53;
      const dx = px - cx;
      const dy = py - cy;
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(6, d / 45);
      el.style.setProperty("--ex", `${((dx / d) * reach).toFixed(2)}px`);
      el.style.setProperty("--ey", `${((dy / d) * reach).toFixed(2)}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [follow, reduced]);

  return (
    <div
      ref={ref}
      className={`ml-milo ${className}`}
      data-state={state}
      role="img"
      aria-label={label ?? "Milo, a fluffy tangerine planet with big shiny eyes and a little moon"}
    >
      <div className="ml-glow" />
      <div className="ml-float">
        <svg viewBox="0 0 200 200" className="ml-layer" aria-hidden="true">
          <circle className="ml-ring" cx="100" cy="106" r="74" fill="none" stroke={MILO.tangerine} strokeWidth="2.5" />
        </svg>
        <div className="ml-layer ml-body">
          {/* eslint-disable-next-line @next/next/no-img-element -- a cached raster of the fur filter, exactly as the app does it */}
          <img src={IMG.body} alt="" draggable={false} />
          <svg viewBox="0 0 200 200" className="ml-layer" aria-hidden="true">
            <g fill={MILO.blush} opacity=".5">
              <ellipse cx="64" cy="127" rx="9" ry="5" />
              <ellipse cx="136" cy="127" rx="9" ry="5" />
            </g>
            <g className="ml-eyes">
              {EYE(80)}
              {EYE(120)}
            </g>
            <path
              className="ml-mouth"
              d="M93 128 Q96.5 132.5 100 128 Q103.5 132.5 107 128"
              fill="none"
              stroke={INK}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g className="ml-mouth-open">
              <path d="M93.6 128 Q100 126.4 106.4 128 Q106.4 137.6 100 137.8 Q93.6 137.6 93.6 128Z" fill={INK} />
              <ellipse cx="100" cy="134.6" rx="3.7" ry="2.1" fill={MILO.blush} />
            </g>
          </svg>
        </div>
        <div className="ml-layer ml-orbit">
          {/* eslint-disable-next-line @next/next/no-img-element -- see the body layer */}
          <img className="ml-moon" src={IMG.moon} alt="" draggable={false} />
        </div>
      </div>
      {hearts > 0 && (
        <span key={hearts} aria-hidden="true" className="ml-hearts">
          <i style={{ left: "22%", animationDelay: "0s" }}>♥</i>
          <i style={{ left: "48%", animationDelay: ".08s" }}>♥</i>
          <i style={{ left: "72%", animationDelay: ".16s" }}>♥</i>
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 *  Hero stage — Milo, a speech bubble, and a few of the crew floating by
 * ───────────────────────────────────────────────────────────────────────── */

const SATELLITES: { id: string; style: React.CSSProperties; size: number; delay: string }[] = [
  { id: "sol", style: { left: "2%", top: "14%" }, size: 64, delay: "-1s" },
  { id: "pip", style: { right: "3%", top: "6%" }, size: 56, delay: "-2.4s" },
  { id: "mochi", style: { left: "0%", bottom: "16%" }, size: 58, delay: "-3.1s" },
  { id: "zip", style: { right: "0%", bottom: "24%" }, size: 62, delay: "-0.4s" },
  { id: "atlas", style: { left: "24%", bottom: "-2%" }, size: 50, delay: "-1.8s" },
  { id: "nova", style: { right: "24%", bottom: "-4%" }, size: 46, delay: "-4.2s" },
];

export function HeroStage() {
  const [line, setLine] = useState(0);
  const [pokes, setPokes] = useState(0);
  const [happy, setHappy] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const poke = useCallback(() => {
    setLine((l) => (l + 1) % HERO.lines.length);
    setPokes((p) => p + 1);
    setHappy(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHappy(false), 800);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[460px] aspect-square">
      {/* a faint orbit, like the moon's path drawn large */}
      <div
        aria-hidden="true"
        className="absolute inset-[9%] rounded-full"
        style={{ border: "1.5px dashed rgba(255,214,194,0.16)" }}
      />
      {SATELLITES.map((s) => (
        <span
          key={s.id}
          aria-hidden="true"
          className="ml-sat absolute"
          style={{ ...s.style, width: s.size, height: s.size, animationDelay: s.delay }}
        >
          <Avatar id={s.id} size={s.size} className="ml-wiggle-on-hover w-full h-full" />
        </span>
      ))}

      <div className="absolute left-1/2 top-1/2 w-[56%] -translate-x-1/2 -translate-y-[46%]">
        {/* the speech bubble */}
        <div className="absolute -top-[22%] left-1/2 -translate-x-1/2 w-max max-w-[260px] sm:max-w-[300px] z-10" aria-live="polite">
          <p
            key={line}
            className="ml-bubble relative rounded-[18px] px-4 py-2.5 text-center font-manrope font-bold text-[13.5px] sm:text-[14.5px] leading-snug"
            style={{ background: "#ffffff", color: INK, boxShadow: "0 14px 34px rgba(0,0,0,0.35)" }}
          >
            {HERO.lines[line]}
          </p>
        </div>

        <button
          type="button"
          onClick={poke}
          className="ml-poke block w-full rounded-full"
          aria-label="Poke Milo — he says something new"
        >
          <MiloLive state={happy ? "happy" : "idle"} follow hearts={pokes} label="Milo, a fluffy tangerine planet with big shiny eyes and a little moon. Poke him." />
        </button>
      </div>

      <p
        className="absolute -bottom-9 left-1/2 -translate-x-1/2 w-max font-dmmono text-[10.5px] uppercase tracking-[0.2em]"
        style={{ color: MILO.muted }}
      >
        psst — poke him
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 *  The state toy — Milo's four moods, as the app animates them
 * ───────────────────────────────────────────────────────────────────────── */

export function MiloStateToy() {
  const [state, setState] = useState<(typeof STATES)[number]["id"]>("talking");
  const groupId = useId();
  const current = STATES.find((s) => s.id === state)!;

  return (
    <div
      className="relative rounded-[28px] p-5 sm:p-7"
      style={{ background: MILO.night, boxShadow: "0 40px 90px -40px rgba(26,20,24,0.55)" }}
    >
      {/* sheet corner marks, like a character reference sheet */}
      <span aria-hidden="true" className="absolute left-4 top-4 font-dmmono text-[10px] uppercase tracking-[0.22em]" style={{ color: MILO.moon }}>
        Ref. sheet · Milo
      </span>
      <span aria-hidden="true" className="absolute right-4 top-4 flex gap-1.5">
        <i className="block h-3 w-3 rounded-full" style={{ background: MILO.tangerine }} />
        <i className="block h-3 w-3 rounded-full" style={{ background: MILO.moon }} />
        <i className="block h-3 w-3 rounded-full" style={{ background: MILO.blush }} />
      </span>

      <div className="mx-auto mt-8 w-[68%] max-w-[300px]">
        <MiloLive state={state} follow={state === "idle"} label={`Milo, ${current.label.toLowerCase()}`} />
      </div>

      <p className="mt-4 text-center text-[13.5px]" style={{ color: MILO.text2 }} aria-live="polite">
        <strong style={{ color: MILO.text }}>{current.label}.</strong> {current.note}
      </p>

      <div role="radiogroup" aria-labelledby={`${groupId}-l`} className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <span id={`${groupId}-l`} className="sr-only">
          Show Milo
        </span>
        {STATES.map((s) => {
          const on = s.id === state;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setState(s.id)}
              className="ml-btn rounded-full px-3 py-2.5 font-manrope font-bold text-[13px]"
              style={
                on
                  ? { background: MILO.text, color: MILO.night }
                  : { background: MILO.surface2, color: MILO.text, border: `1px solid ${MILO.line}` }
              }
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 *  The short — a facade. Nothing from YouTube loads until play is pressed,
 *  which is what /privacy promises for the homepage film; this keeps the
 *  same promise here.
 * ───────────────────────────────────────────────────────────────────────── */

export function MiloShort() {
  const [playing, setPlaying] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${LINKS.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div aria-hidden="true" className="absolute -inset-10 rounded-[4rem] blur-3xl opacity-60" style={{ background: MILO.sunset }} />
      <div
        className="relative rounded-[2.6rem] p-[10px]"
        style={{ background: "#1c1c21", boxShadow: "0 50px 100px -30px rgba(0,0,0,0.75), inset 0 0 0 1.5px rgba(255,255,255,0.08)" }}
      >
        <div className="relative overflow-hidden rounded-[2.05rem] bg-black" style={{ aspectRatio: "9 / 16" }}>
          {playing ? (
            <iframe
              src={src}
              title={`Milo — ${LINKS.videoTitle}`}
              allow="autoplay; encrypted-media; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="ml-poster group absolute inset-0 flex flex-col items-center justify-center text-center"
              style={{ background: `radial-gradient(120% 70% at 50% 34%, rgba(255,111,60,0.38) 0%, ${MILO.night} 62%)` }}
              aria-label="Play the Milo short — nothing loads from YouTube until you press play"
              title="Nothing loads from YouTube until you press play"
            >
              <span className="absolute left-0 right-0 top-0 flex justify-center pt-3" aria-hidden="true">
                <span className="h-[22px] w-[92px] rounded-full bg-black" />
              </span>
              <span
                className="ml-bubble mb-3 rounded-[16px] px-3.5 py-2 font-manrope font-bold text-[13px]"
                style={{ background: "#fff", color: INK }}
              >
                Hi, I’m Milo! 👋
              </span>
              <span className="block w-[64%]">
                <MiloLive state="idle" label="Milo" />
              </span>
              <span className="mt-6 flex items-center gap-3">
                <span
                  className="ml-play relative grid h-14 w-14 place-items-center rounded-full"
                  style={{ background: "#fff", color: INK }}
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                  </svg>
                </span>
                <span className="text-left">
                  <span className="block font-manrope font-extrabold text-[15px]" style={{ color: MILO.text }}>
                    Watch the short
                  </span>
                  <span className="block font-dmmono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: MILO.moon }}>
                    Milo in action
                  </span>
                </span>
              </span>
              <span className="absolute bottom-5 left-5 right-5 font-manrope font-semibold text-[12.5px] leading-snug" style={{ color: MILO.text2 }}>
                {LINKS.videoTitle}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 *  The toy maker — tap a wish (or type one) and watch Milo cast it
 * ───────────────────────────────────────────────────────────────────────── */

type Draft = { member: CastMember; starter?: Starter; text: string; custom: boolean; matched?: string[] };
type Phase = "idle" | "thinking" | "draft" | "created" | "declined";

export function AgentMaker() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [crew, setCrew] = useState<string[]>([]);
  const [bump, setBump] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [pokes, setPokes] = useState(0);
  const timer = useRef<number | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const reduced = usePrefersReducedMotion();

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  // On a phone the card sits below the wishes, out of view — bring it up.
  useEffect(() => {
    if (phase !== "draft") return;
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
    }
  }, [phase, reduced]);

  const later = (ms: number, fn: () => void) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, ms);
  };

  const ask = (d: Draft) => {
    setDraft(d);
    setPhase("thinking");
    later(1100, () => setPhase("draft"));
  };

  const fromWish = (w: (typeof WISHES)[number]) => {
    ask({ member: castById(w.avatar), starter: starterFor(w.avatar), text: w.text, custom: false });
  };

  const fromText = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim().slice(0, 140);
    if (!t) return;
    const { member, matched } = pickCharacter(t, crew);
    ask({ member, matched, starter: undefined, text: t.charAt(0).toUpperCase() + t.slice(1), custom: true });
    setText("");
  };

  const create = () => {
    if (!draft) return;
    const id = draft.member.id;
    setCrew((c) => (c.includes(id) ? c : [...c, id].slice(-6)));
    setBump(id);
    setPokes((p) => p + 1);
    setPhase("created");
    later(2600, () => setPhase("idle"));
  };

  const decline = () => {
    setPhase("declined");
    later(2200, () => setPhase("idle"));
  };

  const miloState: MiloState =
    phase === "thinking" ? "thinking" : phase === "draft" ? "talking" : phase === "created" ? "happy" : "idle";

  const name = draft?.member.name ?? "";
  const status =
    phase === "thinking"
      ? "Thinking…"
      : phase === "draft"
        ? `Meet ${name}. Shall I create it?`
        : phase === "created"
          ? `${name} is on your crew. First run starting now.`
          : phase === "declined"
            ? "No problem. What else would help?"
            : "Tell me what would make your week easier.";

  const m = draft?.member;

  return (
    <div
      className="relative mx-auto max-w-[980px] rounded-[30px] p-4 sm:p-6 md:p-7"
      style={{ background: MILO.night, boxShadow: "0 50px 110px -40px rgba(26,20,24,0.7)", border: `1px solid ${MILO.line}` }}
    >
      <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:gap-8">
        {/* left: Milo, his line, the wishes */}
        <div>
          <div className="flex items-center gap-4">
            <div className="w-[92px] shrink-0">
              <MiloLive state={miloState} hearts={pokes} label="Milo" />
            </div>
            <p className="font-manrope font-bold text-[17px] leading-snug" style={{ color: MILO.text }} aria-live="polite">
              {status}
            </p>
          </div>

          <p className="mt-5 mb-2.5 font-dmmono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: MILO.muted }}>
            Tap a wish
          </p>
          <div className="flex flex-wrap gap-2">
            {WISHES.map((w) => (
              <button
                key={w.text}
                type="button"
                onClick={() => fromWish(w)}
                className="ml-chip inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-left text-[13px] font-semibold"
                style={{ background: MILO.surface2, color: MILO.text, border: `1px solid ${MILO.line}` }}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: MILO.raise }}>
                  <Avatar id={w.avatar} size={24} />
                </span>
                “{w.text}”
              </button>
            ))}
          </div>

          <form onSubmit={fromText} className="mt-4 flex gap-2">
            <label htmlFor={inputId} className="sr-only">
              Describe your own helper
            </label>
            <input
              id={inputId}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={140}
              placeholder="Or describe your own…"
              className="min-w-0 flex-1 rounded-full px-4 py-2.5 text-[16px] sm:text-[14px] outline-none focus-visible:ring-2"
              style={{ background: MILO.surface, color: MILO.text, border: `1px solid ${MILO.line2}`, ["--tw-ring-color" as string]: MILO.tangerine }}
            />
            <button
              type="submit"
              className="ml-btn shrink-0 rounded-full px-4 py-2.5 font-manrope font-bold text-[13.5px]"
              style={{ background: MILO.text, color: MILO.night }}
            >
              Ask Milo
            </button>
          </form>
        </div>

        {/* right: the card, then the crew */}
        <div className="flex flex-col">
          <div ref={stage} className="relative min-h-[300px] flex-1 scroll-mt-24">
            {phase === "draft" && m ? (
              <div
                key={`${m.id}-${draft?.text}`}
                className="ml-card-in rounded-[24px] p-5"
                style={{
                  background: `color-mix(in srgb, ${m.color} 14%, ${MILO.surface})`,
                  border: `1px solid color-mix(in srgb, ${m.color} 45%, transparent)`,
                }}
              >
                <p className="font-dmmono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: MILO.text2 }}>
                  Meet your new agent
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <Avatar id={m.id} size={72} className="ml-pop-in" />
                  <div>
                    <p className="font-manrope font-extrabold text-[26px] leading-none" style={{ color: MILO.text }}>
                      {m.name}
                    </p>
                    <p className="mt-1.5 text-[14px]" style={{ color: MILO.text2 }}>
                      {draft?.starter ? draft.starter.title : m.bestFor}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-snug" style={{ color: MILO.text }}>
                  {draft?.starter ? draft.starter.pitch : `“${draft?.text}”`}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px]" style={{ background: "rgba(255,255,255,0.07)", color: MILO.text }}>
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M12 7.5V12l3 2" />
                    </svg>
                    {draft?.starter ? draft.starter.when : "Milo asks you when"}
                  </span>
                  {draft?.starter?.tools.map((t) => (
                    <span key={t} className="rounded-full px-3 py-1 text-[12.5px]" style={{ background: "rgba(255,255,255,0.07)", color: MILO.text }}>
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-3 flex gap-2 text-[13px] leading-snug" style={{ color: MILO.text2 }}>
                  <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MILO.amber }} />
                  {draft?.starter
                    ? `Needs: ${draft.starter.needs}.`
                    : draft?.matched?.length
                      ? `Matched “${draft.matched.join("”, “")}” — ${m.name} is best at ${m.bestFor.charAt(0).toLowerCase()}${m.bestFor.slice(1)}. In the app, Milo’s drafting model reads the whole request and chooses.`
                      : `No keyword matched, so this toy picked a free character. In the app, Milo’s drafting model reads the whole request and chooses.`}
                </p>
                <div className="mt-5 flex items-center justify-end gap-2">
                  <button type="button" onClick={decline} className="ml-btn rounded-full px-4 py-2.5 font-manrope font-bold text-[13.5px]" style={{ color: MILO.text2 }}>
                    Not now
                  </button>
                  <button type="button" onClick={create} className="ml-btn rounded-full px-5 py-2.5 font-manrope font-bold text-[13.5px]" style={{ background: MILO.text, color: MILO.night }}>
                    Create {m.name}
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-[24px] p-6 text-center"
                style={{ border: `1.5px dashed ${MILO.line2}` }}
              >
                {phase === "thinking" ? (
                  <p className="font-manrope font-bold text-[15px]" style={{ color: MILO.text2 }}>
                    <span className="ml-dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="sr-only">Milo is choosing a character</span>
                  </p>
                ) : phase === "created" && m ? (
                  <>
                    <Avatar id={m.id} size={84} className="ml-hop-once" />
                    <p className="mt-3 rounded-full px-3.5 py-1.5 font-manrope font-bold text-[13px]" style={{ background: "rgba(74,222,128,0.12)", color: MILO.ok }}>
                      ✓ Created {m.name}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex -space-x-3" aria-hidden="true">
                      {["sol", "pip", "scout", "opal", "zip"].map((id, i) => (
                        <span key={id} className="ml-bob grid h-12 w-12 place-items-center rounded-full" style={{ background: MILO.surface2, animationDelay: `${-i * 0.5}s` }}>
                          <Avatar id={id} size={38} />
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 max-w-[30ch] text-[14px] leading-snug" style={{ color: MILO.muted }}>
                      The new agent’s card shows up here, the way it does in the app.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mt-4">
            <p className="mb-2 font-dmmono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: MILO.muted }}>
              Your agents
            </p>
            <div className="flex flex-wrap gap-2.5">
              {crew.map((id) => {
                const c = castById(id);
                return (
                  <div key={id} className="flex w-[64px] flex-col items-center gap-1">
                    <span
                      key={bump === id ? `${id}-${pokes}` : id}
                      className={`grid h-[58px] w-[58px] place-items-center rounded-[18px] ${bump === id ? "ml-pop-in" : ""}`}
                      style={{ background: MILO.surface, border: `1px solid ${MILO.line}` }}
                    >
                      <Avatar id={id} size={44} />
                    </span>
                    <span className="text-[12px]" style={{ color: MILO.text2 }}>
                      {c.name}
                    </span>
                  </div>
                );
              })}
              <div className="flex w-[64px] flex-col items-center gap-1" aria-hidden="true">
                <span className="grid h-[58px] w-[58px] place-items-center rounded-[18px] text-[24px]" style={{ border: `1.5px dashed ${MILO.line2}`, color: MILO.muted }}>
                  +
                </span>
                <span className="text-[12px]" style={{ color: MILO.muted }}>
                  New
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 border-t pt-4 text-[12.5px] leading-relaxed" style={{ borderColor: MILO.line, color: MILO.muted }}>
        A toy built from Milo’s real cast, starters and fallback character-picking rule — nothing you type leaves this
        page. In the app this happens by voice, Milo asks a question or two and writes the full spec, and the agent then
        really runs.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 *  The cast — 24 collectible cards. Tap one to flip it.
 * ───────────────────────────────────────────────────────────────────────── */

export function CastGrid() {
  const [flipped, setFlipped] = useState<Set<string>>(() => new Set());
  const toggle = (id: string) =>
    setFlipped((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-6">
      {CAST.map((c, i) => {
        const on = flipped.has(c.id);
        const s = starterFor(c.id);
        const fg = textOn(c.color);
        const soft = fg === INK ? "rgba(26,20,24,0.78)" : "rgba(255,255,255,0.86)";
        return (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => toggle(c.id)}
              aria-pressed={on}
              className="ml-flip block h-[272px] w-full text-left sm:h-[270px]"
            >
              <span className="ml-flip-inner block">
                {/* front */}
                <span
                  className="ml-face flex flex-col items-center p-4 text-center"
                  style={{
                    background: `linear-gradient(180deg, color-mix(in srgb, ${c.color} 24%, #141417) 0%, color-mix(in srgb, ${c.color} 9%, #111114) 100%)`,
                    border: `1px solid color-mix(in srgb, ${c.color} 44%, transparent)`,
                  }}
                >
                  <span className="flex w-full items-center justify-between font-dmmono text-[10px] uppercase tracking-[0.18em]" style={{ color: MILO.text2 }}>
                    <span>No. {String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                  </span>
                  <span className="ml-bob my-3 block" style={{ animationDelay: `${-(i % 6) * 0.45}s` }}>
                    <Avatar id={c.id} size={96} className="ml-av h-[88px] w-[88px] sm:h-[96px] sm:w-[96px]" />
                  </span>
                  <span className="block font-manrope font-extrabold text-[19px] leading-none" style={{ color: MILO.text }}>
                    {c.name}
                  </span>
                  <span className="mt-2 block text-[12.5px] leading-snug" style={{ color: MILO.text2 }}>
                    {c.bestFor}
                  </span>
                  <span className="mt-auto block font-dmmono text-[9.5px] uppercase tracking-[0.2em]" style={{ color: MILO.muted }}>
                    Tap to flip ↻
                  </span>
                </span>

                {/* back */}
                <span className="ml-face ml-back flex flex-col p-4" style={{ background: c.color, color: fg }}>
                  <span className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: MILO.night }}>
                      <Avatar id={c.id} size={30} />
                    </span>
                    <span className="font-manrope font-extrabold text-[16px]">{c.name}</span>
                  </span>
                  <span className="mt-3 block font-serif italic text-[15px] leading-[1.22] sm:text-[16px]">“{c.persona}”</span>
                  <span className="mt-auto block pt-2 font-dmmono text-[10px] uppercase leading-relaxed tracking-[0.12em]" style={{ color: soft }}>
                    {c.look}
                    <br />
                    {s ? `Plays: ${s.title}` : "Plays: the plans you describe"}
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 *  The 23 starters, in Milo's own five groups
 * ───────────────────────────────────────────────────────────────────────── */

export function StarterTabs() {
  const [active, setActive] = useState(0);
  const base = useId();
  const groups = useMemo(
    () => STARTER_GROUPS.map((g) => ({ ...g, items: STARTERS.filter((s) => s.group === g.name) })),
    [],
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (active + (e.key === "ArrowRight" ? 1 : groups.length - 1)) % groups.length;
    setActive(n);
    document.getElementById(`${base}-tab-${n}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Starter groups" className="flex flex-wrap gap-2" onKeyDown={onKey}>
        {groups.map((g, i) => {
          const on = i === active;
          return (
            <button
              key={g.name}
              id={`${base}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className="ml-btn inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-manrope font-bold text-[14px]"
              style={
                on
                  ? { background: INK, color: g.tint, boxShadow: `0 10px 24px -12px ${INK}` }
                  : { background: g.tint, color: INK }
              }
            >
              {g.name}
              <span
                className="grid h-5 min-w-5 place-items-center rounded-full px-1.5 font-dmmono text-[11px]"
                style={on ? { background: g.tint, color: INK } : { background: "rgba(26,20,24,0.14)", color: INK }}
              >
                {g.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {groups.map((g, i) => (
        <div
          key={g.name}
          id={`${base}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          className="mt-6"
        >
          <ul className="grid gap-3 md:grid-cols-2">
            {g.items.map((s, k) => {
              const c = castById(s.avatar);
              return (
                <li
                  key={s.title}
                  className="ml-row flex gap-4 rounded-[22px] bg-white p-4"
                  style={{ border: "1px solid rgba(26,20,24,0.1)", animationDelay: `${k * 0.05}s` }}
                >
                  <span className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-[18px]" style={{ background: MILO.night }}>
                    <Avatar id={s.avatar} size={48} className="ml-av" alt={c.name} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-manrope font-extrabold text-[16.5px] leading-tight" style={{ color: INK }}>
                      {s.title}
                      <span className="font-semibold" style={{ color: MILO.inkSoft }}>
                        {" "}
                        · {c.name}
                      </span>
                    </span>
                    <span className="mt-1 block text-[14px] leading-snug" style={{ color: MILO.inkSoft }}>
                      {s.pitch}
                    </span>
                    <span className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold" style={{ background: `color-mix(in srgb, ${g.tint} 45%, #ffffff)`, color: INK }}>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="8.5" />
                          <path d="M12 7.5V12l3 2" />
                        </svg>
                        {s.when}
                      </span>
                      {s.tools.map((t) => (
                        <span key={t} className="rounded-full px-2.5 py-1 text-[12px]" style={{ border: "1px solid rgba(26,20,24,0.16)", color: INK }}>
                          {t}
                        </span>
                      ))}
                    </span>
                    <span className="mt-2 flex gap-2 text-[12.5px] leading-snug" style={{ color: MILO.inkSoft }}>
                      <span aria-hidden="true" className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#d98a00" }} />
                      <span>
                        <strong style={{ color: INK }}>Needs:</strong> {s.needs}
                      </span>
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
