"use client";

/* ─────────────────────────────────────────────────────────────────────────
   /profile — the moving parts.

   Five pieces, four of which are scroll-scrubbed:

     Curtain     one-shot page-load wipe, eight columns
     ProfileHero 280vh pin: the paragraph leaves as the drawing zooms in
     Filmstrip   scroll-linked horizontal drift of the journey artwork
     Credo       word-by-word reveal of one paragraph
     KitStrip    scroll-linked shopfront row with a centre readout

   ── Why none of these use a scroll listener ─────────────────────────────
   `body` carries `overflow-x: hidden` in globals.css, which makes the body a
   scroll container — and scroll events fired on the body do not reach
   `window`. A `window.addEventListener("scroll", …)` here would never fire
   once. This is AGENTS.md trap 4, and it is silent: you get a static page and
   no error.

   So every scrub goes through `useScrub`: an IntersectionObserver decides
   *whether* the element is worth watching, and while it is, a rAF loop reads
   `getBoundingClientRect()` each frame. Rect reads are true regardless of
   which element is doing the scrolling, and the loop costs nothing when the
   section is off screen.

   ── The other rule ──────────────────────────────────────────────────────
   Every scrub writes to `element.style` directly and never to React state.
   State at 60fps would re-render the whole tree, and the drawing is ~400
   nodes. The one exception is the kit strip's readout, which sets state only
   on the frames where the centred shop actually changes.
   ───────────────────────────────────────────────────────────────────────── */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

/* ═══ Shared ═════════════════════════════════════════════════════════════ */

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const easeInOutCubic = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Run `onFrame` every animation frame while `ref` is anywhere near the
 * viewport. Bails out entirely under reduced motion, leaving whatever the CSS
 * authored as the resting state.
 *
 * `onFrame` must be a stable reference — wrap it in `useCallback`.
 */
function useScrub(
  ref: RefObject<HTMLElement | null>,
  onFrame: () => void,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    let live = false;

    const tick = () => {
      onFrame();
      if (live) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!live) {
            live = true;
            raf = requestAnimationFrame(tick);
          }
        } else if (live) {
          live = false;
          cancelAnimationFrame(raf);
          // One last frame so the section is left in its end state rather
          // than frozen wherever it happened to be when it left the screen.
          onFrame();
        }
      },
      { rootMargin: "300px 0px" },
    );

    io.observe(el);
    onFrame();

    return () => {
      live = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [ref, onFrame]);
}

/* ═══ 1. Curtain ═════════════════════════════════════════════════════════ */

/**
 * Eight columns of paper drop, the name wipes in behind them, and they lift
 * again right-to-left.
 *
 * ── Why it starts covered ───────────────────────────────────────────────
 * The initial state is `covered`, not `idle`, so the server-rendered HTML
 * already has the curtain down. Deciding to cover *after* mount would mean the
 * page paints first and the curtain drops on top of it a few hundred
 * milliseconds later — a flicker rather than an entrance. Everything after the
 * first frame is scheduled from timers and rAF, which also keeps this clear of
 * `react-hooks/set-state-in-effect`.
 *
 * It plays on every mount, including client-side navigation, which is what the
 * reference does — the whole thing is under 1.7s. If it ever needs to be
 * once-per-session, the guard cannot live here: it would have to be an inline
 * `<script>` stamping a class on `<html>` before paint, the way `sd-intro`
 * does in app/layout.tsx, or a returning visitor would still see it flash.
 *
 * Under `prefers-reduced-motion` the CSS removes the element outright, so the
 * only thing to skip here is the wipe animation.
 */
export function Curtain({ name }: { name: string }) {
  const [phase, setPhase] = useState<"covered" | "reveal" | "done">("covered");
  const [wipe, setWipe] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const skip = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(skip);
    }

    let raf = 0;
    const t0 = performance.now();
    const WIPE_MS = 620;
    const step = (now: number) => {
      const p = clamp((now - t0) / WIPE_MS);
      setWipe(p * 100);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const toReveal = window.setTimeout(() => setPhase("reveal"), 780);
    // 780 + the last column's 7×38ms stagger + its 520ms transition, plus slack.
    const toDone = window.setTimeout(() => setPhase("done"), 1700);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(toReveal);
      window.clearTimeout(toDone);
    };
  }, []);

  if (phase === "done") return null;

  // "Suman Debnath" → the surname's initial carries the amber.
  const [first, ...rest] = name.split(" ");
  const last = rest.join(" ");

  return (
    <div
      className={[
        "pf-curtain is-on",
        phase === "covered" && "is-covered show-label",
        phase === "reveal" && "is-reveal",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="pf-curtain-col"
          style={{ ["--i" as string]: i }}
        />
      ))}
      <div
        className="pf-curtain-label"
        style={{ ["--p" as string]: wipe.toFixed(1) }}
      >
        <span className="name">
          {first} <span className="d">{last}</span>
        </span>
        <span className="sub">Profile</span>
      </div>
    </div>
  );
}

/* ═══ 2. The drawing ═════════════════════════════════════════════════════
   The scene is authored once in a 1820×430 coordinate space and the *viewBox*
   is animated — not a transform — so strokes stay hairline all the way in
   (`vector-effect: non-scaling-stroke` in the CSS) and nothing has to be
   re-rasterised at a new scale.

   SCENE  the whole room
   FOCUS  the centre of the monitor's screen
   END_W  the viewBox width at full zoom; the height follows from the scene's
          aspect ratio, so the crop stays letterboxed exactly like the frame
          it sits in
   ───────────────────────────────────────────────────────────────────────── */

const SCENE = { x: -240, y: -10, w: 1820, h: 430 };
const SCENE_MOBILE = { x: 402, y: 66, w: 640, h: 356 };
const FOCUS = { x: 696, y: 203 };
const END_W = 250;
const END_W_MOBILE = 300;

/** Floor line. Everything standing on the ground has its base here. */
const F = 350;

function useIsNarrow(query = "(max-width: 960px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return narrow;
}

function DeskScene() {
  const narrow = useIsNarrow();
  const base = narrow ? SCENE_MOBILE : SCENE;
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const frame = useCallback(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const from = narrow ? SCENE_MOBILE : SCENE;
    const endW = narrow ? END_W_MOBILE : END_W;

    let p: number;
    if (narrow) {
      // No pin on phones, so progress is read off the drawing's own trip
      // through the viewport: starts at 86% of the way down, finishes at 34%.
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      p = clamp((vh * 0.86 - r.top) / (vh * 0.86 - vh * 0.34));
    } else {
      // Pinned: progress is how far the sticky child has travelled inside its
      // 280vh parent. This is the only measure that is immune to where the
      // scroll actually lives.
      const hero = wrap.closest(".pf-hero") as HTMLElement | null;
      const pin = hero?.querySelector(".pf-hero-pin") as HTMLElement | null;
      if (!hero || !pin) return;
      const travel = hero.offsetHeight - pin.offsetHeight;
      p =
        travel > 0
          ? clamp(
              (pin.getBoundingClientRect().top -
                hero.getBoundingClientRect().top) /
                travel,
            )
          : 0;
    }

    const e = easeInOutCubic(p);
    const w = from.w + (endW - from.w) * e;
    const h = w * (from.h / from.w);
    const cx0 = from.x + from.w / 2;
    const cy0 = from.y + from.h / 2;
    const cx = cx0 + (FOCUS.x - cx0) * e;
    const cy = cy0 + (FOCUS.y - cy0) * e;

    svg.setAttribute(
      "viewBox",
      `${(cx - w / 2).toFixed(1)} ${(cy - h / 2).toFixed(1)} ${w.toFixed(
        1,
      )} ${h.toFixed(1)}`,
    );
  }, [narrow]);

  useScrub(wrapRef, frame);

  return (
    <div className="pf-desk-wrap" ref={wrapRef}>
      <div
        className="pf-desk-view"
        style={{ aspectRatio: `${base.w} / ${base.h}` }}
        role="img"
        aria-label="A line drawing of a corner of a room — a wide monitor on a desk under a window, someone working at it, a sofa and a cat behind. Scrolling takes you into the screen."
      >
        <svg
          ref={svgRef}
          viewBox={`${base.x} ${base.y} ${base.w} ${base.h}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <SceneBack />
          <SceneRoom />
          <SceneDesk />
          <SceneFore />
        </svg>
      </div>
    </div>
  );
}

/* ── Back wall: floor, window, shelf, pictures, clock ─────────────────── */
function SceneBack() {
  const books = [30, 38, 26, 34, 29, 22];
  return (
    <g className="back">
      <path className="ln floor" d={`M-260 ${F} H1600`} />
      <path className="ln skirt" d={`M-260 ${F - 12} H1600`} />

      <g className="window">
        <path className="light" d={`M64 258 L104 ${F} L352 ${F} L292 258 Z`} />
        <rect className="glass" x="60" y="80" width="230" height="176" rx="3" />
        <g clipPath="url(#pf-win)">
          <defs>
            <clipPath id="pf-win">
              <rect x="60" y="80" width="230" height="176" rx="3" />
            </clipPath>
          </defs>
          <circle className="sun" cx="238" cy="118" r="18" />
          <path
            className="hill far"
            d="M60 196 q52 -38 104 -6 q46 28 126 -4 v70 H60 z"
          />
          <path
            className="hill"
            d="M60 214 q60 -30 118 -2 q50 24 112 -6 v50 H60 z"
          />
          <path className="ln out-trunk" d="M118 254 V210" />
          <circle className="crown" cx="118" cy="194" r="23" />
          <circle className="crown c2" cx="98" cy="207" r="14" />
          <circle className="crown c3" cx="137" cy="208" r="13" />
        </g>
        <path className="ln mullion" d="M175 80 V256 M60 168 H290" />
        <path className="ln sill" d="M46 258 H304" />
      </g>

      {/* Shelf */}
      <path className="ln shelf" d="M406 152 H706" />
      {books.map((h, i) => (
        <rect
          key={i}
          className={`book bk${i % 3}`}
          x={420 + i * 16}
          y={152 - h}
          width="12"
          height={h}
          rx="1.5"
        />
      ))}
      <path className="lean" d="M528 152 l3 -42 l36 5 l-3 37 z" />
      <g className="hi-pot">
        <path className="pot" d="M646 152 h32 l-5 -21 h-22 z" />
        <path
          className="ln vine"
          d="M662 131 q-19 15 -23 36 M662 131 q17 13 20 30"
        />
      </g>

      {/* Wall clock */}
      <g className="clock">
        <circle className="dial" cx="884" cy="104" r="27" />
        <path className="ln hands" d="M884 104 V88 M884 104 l14 8" />
        <circle className="pin" cx="884" cy="104" r="2.4" />
      </g>

      {/* Framed pictures */}
      <g className="frames">
        <rect className="frame f1" x="968" y="92" width="106" height="84" rx="2" />
        <rect className="frame f2" x="1092" y="100" width="64" height="54" rx="2" />
        <rect className="frame" x="1092" y="164" width="64" height="48" rx="2" />
      </g>
    </g>
  );
}

/* ── Right of frame: sofa, cat, lamp, side table ──────────────────────── */
function SceneRoom() {
  return (
    <g className="side">
      {/* Sofa */}
      <g className="sofa">
        <path
          className="couch-back"
          d={`M1086 ${F - 52} v-72 q0 -16 16 -16 h228 q16 0 16 16 v72 z`}
        />
        <path className="couch-seat" d={`M1064 ${F - 52} h294 v34 h-294 z`} />
        <path className="arm" d={`M1064 ${F - 18} v-52 q0 -12 12 -12 h10 v64 z`} />
        <path
          className="arm"
          d={`M1358 ${F - 18} v-52 q0 -12 -12 -12 h-10 v64 z`}
        />
        <path className="ln" d={`M1074 ${F - 18} V${F} M1348 ${F - 18} V${F}`} />
        <rect className="cush p1" x="1112" y="230" width="62" height="52" rx="5" />
        <rect className="cush p2" x="1252" y="230" width="62" height="52" rx="5" />
        <path className="ln" d={`M1211 ${F - 52} v-70`} />
      </g>

      {/* Cat, asleep on the near arm */}
      <g className="cat">
        <ellipse className="c-body" cx="1104" cy="272" rx="30" ry="14" />
        <circle className="c-head" cx="1078" cy="264" r="12" />
        <path className="c-ear" d="M1070 256 l-2 -9 l8 5 z" />
        <path className="c-ear" d="M1086 256 l3 -9 l-8 5 z" />
        <path className="ln c-eye" d="M1073 264 q3 2 6 0 M1082 264 q3 2 6 0" />
        <path className="ln c-tail" d="M1132 274 q22 -4 18 -20" />
      </g>

      {/* Floor lamp */}
      <g className="lamp">
        <path className="ln pole" d={`M1452 ${F} V184`} />
        <path className="ln base" d={`M1428 ${F} h48`} />
        <path className="shade" d="M1420 184 h64 l-16 -38 h-32 z" />
        <path className="glow" d={`M1424 186 l-30 ${F - 186} h124 l-30 ${-(F - 186)} z`} />
      </g>

      {/* Side table with a mug */}
      <g className="table">
        <path className="ln top" d="M1372 250 h74" />
        <path className="ln legs" d={`M1380 250 V${F} M1438 250 V${F}`} />
        <path className="mug" d="M1396 250 v-15 h17 v15 z" />
        <path className="ln" d="M1413 240 q7 0 7 5 t-7 5" />
      </g>

      {/* Tall plant, far right */}
      <g className="plant">
        {[-1, -0.4, 0.35, 1].map((a, i) => (
          <g key={i}>
            <path
              className={`ln frond f${i}`}
              d={`M1540 ${F - 52} q${a * 26} -28 ${a * 36} -${58 + i * 10}`}
            />
            <ellipse
              className="leaf"
              cx={1540 + a * 36}
              cy={F - 52 - (58 + i * 10)}
              rx="15"
              ry="9"
              transform={`rotate(${a * 30} ${1540 + a * 36} ${
                F - 52 - (58 + i * 10)
              })`}
            />
          </g>
        ))}
        <path className="pot" d={`M1514 ${F} h54 l-9 -46 h-36 z`} />
        <path className="ln" d={`M1518 ${F - 30} h46`} />
      </g>
    </g>
  );
}

/* ── The desk, the monitor, and the person at it ──────────────────────── */
function SceneDesk() {
  return (
    <g className="desk">
      {/* Chair */}
      <g className="chair">
        <path className="seat" d={`M436 268 h96 v11 h-96 z`} />
        <path className="chair-back" d="M436 268 v-84 h12 v84 z" />
        <path className="ln" d={`M452 279 V${F} M518 279 V${F}`} />
        <path className="ln" d={`M446 ${F} h18 M510 ${F} h18`} />
      </g>

      {/* The person, side on, reaching for the keyboard */}
      <g className="sitter">
        <path className="torso" d="M470 262 q-6 -44 14 -58 q16 -10 30 2 q10 20 4 56 z" />
        <path className="ln arm" d="M508 218 q46 14 84 40" />
        <path className="hand" d="M590 256 q10 2 12 8 q-8 6 -16 2 z" />
        <path className="ln thigh" d={`M476 264 q40 8 62 6`} />
        <path className="ln shin" d={`M538 270 q6 40 2 ${F - 272}`} />
        <path className="shoe" d={`M528 ${F - 8} h30 l4 8 h-38 z`} />
        <circle className="head" cx="498" cy="196" r="19" />
        <path className="hair" d="M479 194 q2 -22 21 -22 q19 0 19 20 q-10 -12 -22 -8 q-11 3 -18 10 z" />
        <path className="ln neck" d="M498 215 v11" />
      </g>

      {/* Desk top */}
      <path className="top" d="M452 268 h538 v11 h-538 z" />
      <path className="ln legs" d={`M472 279 V${F} M970 279 V${F}`} />
      <path className="ln modesty" d="M472 292 H970" />

      {/* ── The monitor ──
          Screen inner rect is x 566→826, y 166→240 — centred on FOCUS
          (696, 203) and 260 × 74, which is very close to the 250 × 59 the
          viewBox lands on. Move any of these four numbers and the zoom stops
          landing on the screen. */}
      <g className="monitor">
        <rect className="bezel" x="558" y="156" width="276" height="92" rx="4" />
        <path className="stand-neck" d="M688 248 h16 v14 h-16 z" />
        <path className="stand-foot" d="M652 268 h88 l-8 -6 h-72 z" />
        <ScreenUI />
      </g>

      {/* Keyboard, in front of the stand */}
      <path className="kbd" d="M598 262 h178 l10 6 h-178 z" />
      <path className="ln" d="M606 265 h164" />

      {/* Mug, notebook, phone */}
      <g className="clutter">
        <path className="mug" d="M856 268 v-19 h22 v19 z" />
        <path className="ln" d="M878 253 q9 0 9 6 t-9 6" />
        <path className="pad" d="M898 268 h62 l-5 -9 h-62 z" />
        <path className="ln" d="M904 264 h48" />
        <path className="phone" d="M826 268 v-11 h16 v11 z" />
      </g>
    </g>
  );
}

/* ── What is on the screen ────────────────────────────────────────────────
   Everything here is invisible at the start of the scroll — 260 units wide
   inside an 1820-unit frame is about 3% of the width — and is the entire
   payoff at the end of it. Text sizes are chosen for the *zoomed* state: at
   full zoom one unit is roughly 5–6 device pixels, so the 8.2-unit note lines
   land near 45px and the 4.4-unit labels near 24px.
   ───────────────────────────────────────────────────────────────────────── */
function ScreenUI() {
  const fleet: Array<[string, string]> = [
    ["migi-fleet", "46 agents · green"],
    ["roasmind", "build 214 · pass"],
    ["pentacmd-47m", "eval 87.1%"],
    ["aegis-vault", "sealed"],
  ];
  return (
    <g className="screen">
      <rect className="glassy" x="566" y="166" width="260" height="74" />

      {/* Title bar. The final crop trims 7.5 units off the top and bottom of
          the screen, so everything here is *outside* it — the bar exists for
          the mid-zoom frames and is gone by the time you arrive. Nothing that
          has to be read belongs above y=178 or below y=231. */}
      <rect className="bar" x="566" y="166" width="260" height="10" />
      <circle className="dot" cx="572" cy="171" r="1.7" />
      <circle className="dot" cx="578" cy="171" r="1.7" />
      <circle className="dot" cx="584" cy="171" r="1.7" />

      {/* Sidebar */}
      <rect className="side-bg" x="566" y="176" width="60" height="64" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          className={`nav-row${i === 1 ? " is-on" : ""}`}
          x="571"
          y={183 + i * 10}
          width={i === 1 ? 50 : 38 - (i % 3) * 6}
          height="5"
          rx="1.4"
        />
      ))}

      {/* Fleet readout */}
      <text className="col-h" x="634" y="187">
        FLEET
      </text>
      {/* Four rows at a 9-unit pitch: the last sub-label lands on 229.4, just
          inside the crop's lower edge. A 10-unit pitch pushes it out of frame. */}
      {fleet.map(([name, state], i) => (
        <g key={name}>
          <circle className="live" cx="636" cy={195.4 + i * 9} r="1.7" />
          <text className="row-n" x="642" y={197 + i * 9}>
            {name}
          </text>
          <text className="row-s" x="642" y={202.4 + i * 9}>
            {state}
          </text>
        </g>
      ))}

      {/* The note */}
      <g className="note" transform="rotate(-1.1 759 204)">
        <rect x="706" y="176" width="106" height="58" />
        <text className="note-k" x="714" y="187">
          TODO
        </text>
        <text className="note-l" x="714" y="203">
          Build it small.
        </text>
        <text className="note-l" x="714" y="215">
          Then make it
        </text>
        <text className="note-l" x="714" y="227">
          worth trusting.
        </text>
      </g>

      {/* Cursor, parked in the gap between the fleet column and the note */}
      <path className="cursor" d="M694 220 l0 10.5 l2.9 -2.9 l2.5 4.8 l2.3 -1.1 l-2.5 -4.8 l4 -0.4 z" />
    </g>
  );
}

/* ── Foreground: rug, plant, book stack ───────────────────────────────── */
function SceneFore() {
  return (
    <g className="fore">
      <path className="rug" d={`M338 ${F} h560 l36 16 H302 z`} />
      <path className="ln rug-ln" d={`M354 ${F + 8} h528`} />

      <g className="plant">
        {[-1, -0.45, 0.25, 1].map((a, i) => (
          <g key={i}>
            <path
              className={`ln frond f${i}`}
              d={`M228 ${F - 46} q${a * 28} -26 ${a * 39} -${56 + i * 9}`}
            />
            <ellipse
              className="leaf"
              cx={228 + a * 39}
              cy={F - 46 - (56 + i * 9)}
              rx="15"
              ry="9"
              transform={`rotate(${a * 30} ${228 + a * 39} ${
                F - 46 - (56 + i * 9)
              })`}
            />
          </g>
        ))}
        <path className="pot" d={`M200 ${F + 6} h56 l-9 -46 h-38 z`} />
        <path className="ln" d={`M204 ${F - 30} h48`} />
      </g>

      <g className="stack">
        <path className="bk-a" d={`M1000 ${F} h62 v-11 h-62 z`} />
        <path className="bk-b" d={`M1006 ${F - 11} h52 v-10 h-52 z`} />
        <path className="bk-c" d={`M1004 ${F - 21} h56 v-9 h-56 z`} />
      </g>
    </g>
  );
}

/* ═══ The hero ═══════════════════════════════════════════════════════════ */

/**
 * The 280vh pin. The paragraph rises 320px and fades on a cubed curve; the
 * drawing zooms on its own clock inside `DeskScene`. Both read the same
 * geometry, so the words are gone by the time the screen fills the frame.
 */
export function ProfileHero({
  lead,
  children,
}: {
  lead: React.ReactNode;
  /** `<HeroLock />` goes here. It observes its own `parentElement`, so it has
   *  to sit directly inside this `<section>` and nowhere else — from `<main>`
   *  it would observe the whole page and hide the mascot for all of it. */
  children?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const frame = useCallback(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const vh = window.innerHeight;
    const travelled = -section.getBoundingClientRect().top;
    const total = Math.max(1, section.offsetHeight - vh);
    const p = clamp(travelled / total);

    inner.style.transform = `translateY(${(-(p * p * p) * 320).toFixed(1)}px)`;
    inner.style.opacity = clamp(1 - Math.pow(p, 1.35) * 1.02).toFixed(3);
  }, []);

  useScrub(sectionRef, frame);

  return (
    <section className="pf-hero" ref={sectionRef} id="top" data-badge="Profile">
      {children}
      <div className="pf-hero-pin">
        <div className="pf-hero-inner" ref={innerRef}>
          <p className="lead">{lead}</p>
        </div>
        <DeskScene />
      </div>
    </section>
  );
}

/* ═══ 3. Filmstrip ═══════════════════════════════════════════════════════ */

export type Shot = { src: string; label: string };

/**
 * Drifts sideways in proportion to how far it has crossed the viewport, capped
 * so it can never scroll past its own last frame.
 */
export function Filmstrip({ shots }: { shots: Shot[] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const frame = useCallback(() => {
    const box = boxRef.current;
    const track = trackRef.current;
    if (!box || !track) return;

    const vh = window.innerHeight;
    const r = box.getBoundingClientRect();
    const p = clamp((vh - r.top) / (vh + r.height));
    const max = Math.max(0, track.scrollWidth - box.clientWidth + 80);
    const span = Math.min(max, 0.45 * (vh + r.height));
    track.style.transform = `translate3d(${(-p * span).toFixed(1)}px,0,0)`;
  }, []);

  useScrub(boxRef, frame);

  return (
    <div className="pf-lf" ref={boxRef}>
      <div className="pf-lf-track" ref={trackRef}>
        {shots.map((s) => (
          <figure className="pf-lf-card" key={s.src}>
            {/* Plain <img>: these are wide, they scroll horizontally, and the
                strip's own width is set by the images' intrinsic ratios —
                next/image's fill/sizes machinery fights that for no gain. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt="" loading="lazy" decoding="async" draggable={false} />
            <figcaption>{s.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ═══ 4. Credo ═══════════════════════════════════════════════════════════ */

/**
 * Splits `lead` on spaces and resolves one word at a time as the block crosses
 * the middle of the viewport. `prog` is measured in words, not in percent, so
 * the pace is identical whatever the sentence length.
 */
export function Credo({
  title,
  meta,
  lead,
  tail,
  tags,
  badge,
}: {
  title: React.ReactNode;
  meta: string;
  lead: string;
  tail: React.ReactNode;
  tags: string[];
  badge: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const words = lead.split(" ");

  const frame = useCallback(() => {
    const section = sectionRef.current;
    const p = leadRef.current;
    if (!section || !p) return;

    const spans = p.querySelectorAll<HTMLElement>(".w");
    if (!spans.length) return;

    const vh = window.innerHeight;
    const r = section.getBoundingClientRect();
    const mid = (r.top + r.bottom) / 2;
    const prog = clamp((vh * 0.9 - mid) / (vh * 0.5)) * spans.length;

    for (let i = 0; i < spans.length; i++) {
      const b = clamp(prog - i);
      const el = spans[i];
      el.style.opacity = (0.14 + 0.86 * b).toFixed(3);
      el.style.transform = `translateY(${((1 - b) * 0.2).toFixed(3)}em)`;
      el.style.filter = b > 0.99 ? "none" : `blur(${((1 - b) * 3.5).toFixed(2)}px)`;
    }
  }, []);

  useScrub(sectionRef, frame);

  return (
    <section
      className="pf-wrap pf-pad pf-credo"
      ref={sectionRef}
      id="credo"
      data-badge={badge}
    >
      <div className="pf-credo-grid">
        <div className="aside">
          <h2>{title}</h2>
          <span className="meta">{meta}</span>
        </div>
        <div className="main">
          <p className="lead" ref={leadRef}>
            {words.map((w, i) => (
              <span className="w" key={`${w}-${i}`}>
                {w}
              </span>
            ))}
          </p>
          <p className="tail">{tail}</p>
          <ul className="tags">
            {tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═══ 5. The kit strip ═══════════════════════════════════════════════════ */

export type Kit = { name: string; role: string; code: string };

const SHOP_W = 130;
const STRIP_H = 168;
const KERB = 140;

/**
 * A parade of shopfronts, one per tool, sliding on scroll. Whichever front is
 * closest to the centre of the frame lights up and names itself above.
 *
 * The list is rendered twice so that sliding a full list-width leaves an
 * identical row behind it and the strip never runs out of shops.
 */
export function KitStrip({ kit }: { kit: Kit[] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<SVGGElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const listW = kit.length * SHOP_W;

  const frame = useCallback(() => {
    const box = boxRef.current;
    const row = rowRef.current;
    if (!box || !row) return;

    const vh = window.innerHeight;
    const r = box.getBoundingClientRect();
    const p = clamp((vh - r.top) / (vh + r.height));
    const shift = p * listW;
    row.setAttribute("transform", `translate(${(-shift).toFixed(1)} 0)`);

    // Which shop sits under the centre of the frame?
    const centre = (listW / 2 + shift) % listW;
    const idx = Math.floor(centre / SHOP_W) % kit.length;
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  }, [kit.length, listW]);

  useScrub(boxRef, frame);

  const shops = [...kit, ...kit];
  const current = kit[active] ?? kit[0];

  return (
    <div>
      <div className="pf-kit-read" aria-hidden="true">
        <span className="say" key={current?.name}>
          <span className="ix">{current?.code}</span>
          <span className="name">{current?.name}</span>
          <span className="role">{current?.role}</span>
        </span>
      </div>
      <div className="pf-kit-view" ref={boxRef}>
        <svg
          viewBox={`0 0 ${listW} ${STRIP_H}`}
          preserveAspectRatio="xMidYMax meet"
          role="img"
          aria-label={`The daily kit: ${kit.map((k) => k.name).join(", ")}.`}
        >
          <g ref={rowRef}>
            {shops.map((s, i) => (
              <Shopfront
                key={`${s.name}-${i}`}
                x={i * SHOP_W}
                shop={s}
                on={i % kit.length === active}
              />
            ))}
          </g>
          <path className="kerb" d={`M0 ${KERB} H${listW}`} />
        </svg>
      </div>
    </div>
  );
}

function Shopfront({ x, shop, on }: { x: number; shop: Kit; on: boolean }) {
  // A little variety so the row does not read as a repeating stamp.
  const seed = shop.name.length % 3;
  const top = 44 + seed * 6;
  return (
    <g className={`shop${on ? " is-on" : ""}`} transform={`translate(${x} 0)`}>
      <rect className="front" x="6" y={top} width={SHOP_W - 12} height={KERB - top} />
      <path className="awn" d={`M2 ${top + 16} h${SHOP_W - 4} l-8 -16 h${-(SHOP_W - 20)} z`} />
      <rect className="pane" x="16" y={top + 26} width="52" height="42" rx="2" />
      <path className="ln" d={`M42 ${top + 26} v42 M16 ${top + 47} h52`} />
      <rect className="door" x="80" y={top + 26} width="30" height={KERB - top - 26} rx="2" />
      <circle className="ln" cx="104" cy={top + 60} r="1.6" />
      <text className="sign" x="16" y={top + 12}>
        {shop.name}
      </text>
      <text className="code" x={SHOP_W - 14} y={KERB - 6} textAnchor="end">
        {shop.code}
      </text>
    </g>
  );
}
