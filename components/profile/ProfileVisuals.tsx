"use client";

/* ─────────────────────────────────────────────────────────────────────────
   /profile — the moving parts.

   Four pieces, all scroll- or time-driven:

     ProfileHero  280vh pin: the paragraph leaves as the drawing zooms in
     Filmstrip    scroll-linked horizontal drift of the photographs
     Credo        word-by-word reveal of one paragraph
     KitStrip     a street on a conveyor, with a robot walking it

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
   State at 60fps would re-render the whole tree, and the drawing is ~500
   nodes. The one exception is the kit strip's readout, which sets state only
   on the frames where the building under the robot actually changes — once
   every few seconds.

   ── No page transition ──────────────────────────────────────────────────
   The reference opens with a curtain wipe. It was built and then removed on
   purpose: no other route on this site has an entry transition, and one page
   that does reads as a glitch rather than as a flourish. If a transition is
   ever wanted it has to go in `app/layout.tsx` and apply everywhere.
   ───────────────────────────────────────────────────────────────────────── */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

/* ═══ Shared ═════════════════════════════════════════════════════════════ */

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
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
 * `onFrame` receives the frame timestamp so time-driven pieces (the conveyor)
 * can integrate their own clock rather than reading the document's.
 *
 * `onFrame` must be a stable reference — wrap it in `useCallback`.
 */
export function useScrub(
  ref: RefObject<HTMLElement | null>,
  onFrame: (now: number) => void,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    let live = false;

    const tick = (now: number) => {
      onFrame(now);
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
          onFrame(performance.now());
        }
      },
      { rootMargin: "300px 0px" },
    );

    io.observe(el);
    onFrame(performance.now());

    return () => {
      live = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [ref, onFrame]);
}

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

/* ═══ 1. The drawing ═════════════════════════════════════════════════════
   The scene is authored once in a 1820×430 coordinate space and the *viewBox*
   is animated — not a transform — so strokes stay hairline all the way in
   (`vector-effect: non-scaling-stroke` in the CSS) and nothing has to be
   re-rasterised at a new scale.

   SCENE  the whole room. Content fills it edge to edge on purpose: an earlier
          pass left ~290 units of blank floor on the left and the drawing read
          as small inside its own frame.
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
        aria-label="A line drawing of a room: a wide monitor on a desk under a shelf, an empty chair pulled up to it, a window and bookcase on the left, a sofa and a sleeping cat on the right. Scrolling takes you into the screen."
      >
        <svg
          ref={svgRef}
          viewBox={`${base.x} ${base.y} ${base.w} ${base.h}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <SceneBack />
          <SceneLeft />
          <SceneRight />
          <SceneDesk />
          <SceneFore />
        </svg>
      </div>
    </div>
  );
}

/* ── Back wall: floor, window, shelf, pictures, clock ─────────────────── */
function SceneBack() {
  const books = [34, 42, 28, 37, 31, 24, 39];
  return (
    <g className="back">
      <path className="ln floor" d={`M-260 ${F} H1600`} />
      <path className="ln skirt" d={`M-260 ${F - 13} H1600`} />

      {/* Window. The pool of light on the floor is what makes the wall read
          as a wall rather than as empty paper. */}
      <g className="window">
        <path className="light" d={`M-34 256 L-86 ${F} L268 ${F} L206 256 Z`} />
        <rect className="glass" x="-34" y="80" width="240" height="176" rx="4" />
        <g clipPath="url(#pf-win)">
          <defs>
            <clipPath id="pf-win">
              <rect x="-34" y="80" width="240" height="176" rx="4" />
            </clipPath>
          </defs>
          <circle className="sun" cx="146" cy="118" r="19" />
          <path
            className="hill far"
            d="M-34 194 q54 -40 108 -8 q48 30 132 -6 v78 H-34 z"
          />
          <path
            className="hill"
            d="M-34 216 q62 -32 122 -4 q52 26 118 -8 v54 H-34 z"
          />
          <path className="ln out-trunk" d="M24 254 V208" />
          <circle className="crown" cx="24" cy="192" r="24" />
          <circle className="crown c2" cx="2" cy="206" r="15" />
          <circle className="crown c3" cx="45" cy="207" r="14" />
        </g>
        <path className="ln mullion" d="M86 80 V256 M-34 168 H206" />
        <path className="ln sill" d="M-48 256 H220" />
      </g>

      {/* Shelf above the desk */}
      <path className="ln shelf" d="M424 152 H716" />
      {books.map((h, i) => (
        <rect
          key={i}
          className={`book bk${i % 3}`}
          x={438 + i * 16}
          y={152 - h}
          width="12"
          height={h}
          rx="1.5"
        />
      ))}
      <path className="lean" d="M562 152 l4 -44 l37 6 l-4 38 z" />
      <g className="hi-pot">
        <path className="pot" d="M654 152 q0 -4 3 -4 h26 q3 0 3 4 l-4 -18 h-24 z" />
        <path
          className="ln vine"
          d="M670 130 q-20 15 -25 38 M670 130 q19 14 22 32 M670 130 v-14"
        />
      </g>

      {/* Wall clock */}
      <g className="clock">
        <circle className="dial" cx="884" cy="104" r="28" />
        <path className="ln hands" d="M884 104 V86 M884 104 l15 9" />
        <circle className="pin" cx="884" cy="104" r="2.4" />
      </g>

      {/* Framed pictures */}
      <g className="frames">
        <rect className="frame f1" x="966" y="90" width="108" height="86" rx="3" />
        <rect className="frame f2" x="1092" y="98" width="66" height="56" rx="3" />
        <rect className="frame" x="1092" y="166" width="66" height="50" rx="3" />
        <rect className="frame f3" x="1246" y="94" width="152" height="98" rx="3" />
        <path className="ln art" d="M1266 168 q28 -56 52 -22 q22 30 60 -32" />
      </g>
    </g>
  );
}

/* ── Left of frame: bookcase, record cabinet, plant ───────────────────── */
function SceneLeft() {
  return (
    <g className="side">
      {/* Bookcase */}
      <g className="case">
        <path className="case-body" d={`M-232 ${F} V112 h150 V${F} z`} />
        <path
          className="ln"
          d={`M-232 172 h150 M-232 232 h150 M-232 292 h150`}
        />
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4].map((i) => (
            <rect
              key={`${row}-${i}`}
              className={`book bk${(row + i) % 3}`}
              x={-224 + i * 26}
              y={172 + row * 60 - (34 + ((row + i) % 3) * 6)}
              width={18}
              height={34 + ((row + i) % 3) * 6}
              rx="1.5"
            />
          )),
        )}
      </g>

      {/* Record cabinet with a turntable and a leaning sleeve */}
      <g className="cabinet">
        <path className="unit" d={`M236 ${F} V262 h116 V${F} z`} />
        <path className="ln" d="M236 302 h116 M294 302 V350" />
        <path className="deck" d="M248 262 h92 v-26 h-92 z" />
        <circle className="disc" cx="288" cy="248" r="11" />
        <circle className="spindle" cx="288" cy="248" r="1.6" />
        <path className="ln tone" d="M318 240 l-16 10" />
        <path className="sleeve" d="M320 262 l2 -30 l24 3 l-2 27 z" />
      </g>

      {/* Floor plant */}
      <g className="plant">
        {[-1, -0.42, 0.3, 1].map((a, i) => (
          <g key={i}>
            <path
              className={`ln frond f${i}`}
              d={`M392 ${F - 50} q${a * 26} -30 ${a * 37} -${60 + i * 10}`}
            />
            <ellipse
              className="leaf"
              cx={392 + a * 37}
              cy={F - 50 - (60 + i * 10)}
              rx="16"
              ry="9"
              transform={`rotate(${a * 32} ${392 + a * 37} ${
                F - 50 - (60 + i * 10)
              })`}
            />
          </g>
        ))}
        <path className="pot" d={`M368 ${F} q-3 0 -3 -4 l6 -44 h48 l6 44 q0 4 -3 4 z`} />
        <path className="ln" d={`M370 ${F - 30} h44`} />
      </g>
    </g>
  );
}

/* ── Right of frame: lamp, sofa, cat, plant ───────────────────────────── */
function SceneRight() {
  return (
    <g className="side">
      {/* Floor lamp */}
      <g className="lamp">
        <path className="glow" d={`M1064 188 l-40 ${F - 188} h152 l-40 ${-(F - 188)} z`} />
        <path className="ln pole" d={`M1100 ${F} V186`} />
        <path className="ln base" d={`M1074 ${F} h52`} />
        <path className="shade" d="M1066 186 q-2 0 -1 -3 l14 -36 q1 -3 4 -3 h34 q3 0 4 3 l14 36 q1 3 -1 3 z" />
      </g>

      {/* Sofa. Curved arms and a slumped seat line — the earlier version was
          four rectangles and read as furniture from a floor plan. */}
      <g className="sofa">
        <path
          className="couch-back"
          d={`M1166 ${F - 56} v-78 q0 -20 20 -20 h236 q20 0 20 20 v78 z`}
        />
        <path
          className="couch-seat"
          d={`M1148 ${F - 56} q0 -6 8 -6 h296 q8 0 8 6 v30 q0 6 -8 6 h-296 q-8 0 -8 -6 z`}
        />
        <path className="arm" d={`M1148 ${F - 20} v-56 q0 -16 16 -16 h12 v72 z`} />
        <path className="arm" d={`M1460 ${F - 20} v-56 q0 -16 -16 -16 h-12 v72 z`} />
        <path className="ln" d={`M1160 ${F - 20} V${F} M1448 ${F - 20} V${F}`} />
        <path className="cush p1" d="M1204 234 q0 -6 6 -6 h52 q6 0 6 6 v46 q0 6 -6 6 h-52 q-6 0 -6 -6 z" />
        <path className="cush p2" d="M1338 234 q0 -6 6 -6 h52 q6 0 6 6 v46 q0 6 -6 6 h-52 q-6 0 -6 -6 z" />
        <path className="throw" d={`M1392 ${F - 62} q26 6 30 26 q4 20 -6 40 h-32 q14 -34 8 -66 z`} />
        <path className="ln" d={`M1304 ${F - 56} v-78`} />
      </g>

      {/* Cat, asleep on the near arm */}
      <g className="cat">
        <path className="c-body" d="M1176 274 q10 -16 34 -16 q26 0 34 14 q4 8 -6 10 h-56 q-9 -2 -6 -8 z" />
        <circle className="c-head" cx="1180" cy="258" r="13" />
        <path className="c-ear" d="M1171 249 l-3 -10 l9 5 z" />
        <path className="c-ear" d="M1188 249 l4 -10 l-9 5 z" />
        <path className="ln c-eye" d="M1174 258 q3 3 6 0 M1184 258 q3 3 6 0" />
        <path className="ln c-tail" d="M1244 274 q24 -6 19 -23" />
      </g>

      {/* Tall plant, far right */}
      <g className="plant">
        {[-1, -0.4, 0.35, 1].map((a, i) => (
          <g key={i}>
            <path
              className={`ln frond f${i}`}
              d={`M1522 ${F - 56} q${a * 28} -32 ${a * 40} -${66 + i * 11}`}
            />
            <ellipse
              className="leaf"
              cx={1522 + a * 40}
              cy={F - 56 - (66 + i * 11)}
              rx="17"
              ry="10"
              transform={`rotate(${a * 32} ${1522 + a * 40} ${
                F - 56 - (66 + i * 11)
              })`}
            />
          </g>
        ))}
        <path className="pot" d={`M1494 ${F} q-3 0 -3 -4 l6 -50 h52 l6 50 q0 4 -3 4 z`} />
        <path className="ln" d={`M1496 ${F - 32} h48`} />
      </g>
    </g>
  );
}

/* ── The desk, the monitor, and the person at it ──────────────────────── */
function SceneDesk() {
  return (
    <g className="desk">
      {/* Chair. Drawn before the person so he sits in it. */}
      <g className="chair">
        {/* Sits at x 458–477, which overlaps the torso's left edge at 476 —
            a chair back that clears the sitter entirely reads as a pillar
            standing next to him. */}
        <path className="chair-back" d="M458 264 v-58 q0 -11 10 -11 q9 0 9 11 v58 z" />
        <path className="seat" d="M428 264 q-5 0 -5 -5 v-3 q0 -5 6 -5 h96 q6 0 6 5 v3 q0 5 -5 5 z" />
        <path className="ln" d={`M452 264 V${F} M508 264 V${F}`} />
        <path className="ln" d={`M442 ${F} h20 M498 ${F} h20`} />
      </g>

      {/* ── The person goes here ──
          Deliberately absent for now: the figure was drawn, judged not good
          enough, and pulled rather than shipped half-right. The empty chair
          reads as somebody who has just stepped away, which is a fine thing
          for the drawing to say in the meantime.

          When it comes back it belongs *between* the chair and the desk top,
          so the lap disappears under the desk — except for the reaching arm,
          which has to paint after the keyboard (see the note down there). */}

      {/* Desk top */}
      <path className="top" d="M436 268 q-4 0 -4 4 v4 q0 4 4 4 h584 q4 0 4 -4 v-4 q0 -4 -4 -4 z" />
      <path className="ln legs" d={`M462 280 V${F} M998 280 V${F}`} />
      <path className="ln modesty" d="M462 294 H998" />

      {/* ── The monitor ──
          Screen inner rect is x 566→826, y 166→240 — centred on FOCUS
          (696, 203) and 260 × 74, which is very close to the 250 × 59 the
          viewBox lands on. Move any of these four numbers and the zoom stops
          landing on the screen. */}
      <g className="monitor">
        <path
          className="bezel"
          d="M562 156 q-6 0 -6 6 v80 q0 6 6 6 h268 q6 0 6 -6 v-80 q0 -6 -6 -6 z"
        />
        <path className="stand-neck" d="M686 248 h20 l4 14 h-28 z" />
        <path className="stand-foot" d="M648 268 q-3 0 -2 -3 l3 -4 q1 -2 4 -2 h86 q3 0 4 2 l3 4 q1 3 -2 3 z" />
        <ScreenUI />
      </g>

      {/* Keyboard, in front of the stand */}
      <path className="kbd" d="M592 262 q1 -3 4 -3 h172 q3 0 5 3 l6 6 h-182 z" />
      <path className="ln" d="M602 265 h164" />

      {/* ── Where the reaching arm goes ──
          When the figure comes back, its near arm and hand paint *here* —
          after the monitor and after the keyboard — because the hand rests on
          a keyboard that stands in front of the screen. Drawn up in the
          sitter group it was hidden behind the bezel from x=556 onwards, and
          all that showed was a sleeve disappearing into the monitor. */}

      {/* Mug, notebook, phone, a small speaker */}
      <g className="clutter">
        <path className="mug" d="M856 268 q-3 0 -3 -4 v-15 q0 -3 3 -3 h18 q3 0 3 3 v15 q0 4 -3 4 z" />
        <path className="ln" d="M877 253 q9 0 9 6 t-9 6" />
        <path className="steam ln" d="M860 240 q4 -6 0 -12 M870 240 q4 -6 0 -12" />
        <path className="pad" d="M898 268 h64 q3 0 2 -3 l-3 -6 h-63 z" />
        <path className="ln" d="M904 264 h48" />
        <path className="phone" d="M828 268 v-12 q0 -2 2 -2 h12 q2 0 2 2 v12 z" />
        <path className="speaker" d="M968 268 v-34 q0 -3 3 -3 h20 q3 0 3 3 v34 z" />
        <circle className="sp-cone" cx="981" cy="246" r="6" />
      </g>
    </g>
  );
}

/* ── What is on the screen ────────────────────────────────────────────────
   Everything here is invisible at the start of the scroll — 260 units wide
   inside an 1820-unit frame is about 3% of the width — and is the entire
   payoff at the end of it. So it is built as a real interface, not as an
   impression of one: a rail, a live fleet heat-map with a pass-rate bar, and
   the note.

   The final crop trims 7.5 units off the top and bottom of the screen, so
   **nothing that has to be read may sit above y=178 or below y=231.**
   ───────────────────────────────────────────────────────────────────────── */
function ScreenUI() {
  /** 3 rows × 12. Two amber cells and one dim one, so it reads as live data
   *  rather than as a printed grid. */
  const cells = Array.from({ length: 36 }, (_, i) =>
    i === 7 || i === 26 ? "warn" : i === 19 ? "off" : "ok",
  );
  return (
    <g className="screen">
      <rect className="glassy" x="566" y="166" width="260" height="74" />

      {/* Title bar — outside the crop, there for the mid-zoom frames. */}
      <rect className="bar" x="566" y="166" width="260" height="10" />
      <circle className="dot" cx="572" cy="171" r="1.7" />
      <circle className="dot" cx="578" cy="171" r="1.7" />
      <circle className="dot" cx="584" cy="171" r="1.7" />

      {/* Rail */}
      <rect className="side-bg" x="566" y="176" width="46" height="64" />
      <rect className="mark" x="571" y="180" width="7" height="7" rx="1.6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          className={`nav-row${i === 1 ? " is-on" : ""}`}
          x="571"
          y={193 + i * 8}
          width={i === 1 ? 34 : 30 - (i % 3) * 6}
          height="4"
          rx="1.2"
        />
      ))}

      {/* Fleet heat-map */}
      <text className="col-h" x="620" y="185">
        FLEET · 46 AGENTS
      </text>
      {cells.map((state, i) => (
        <rect
          key={i}
          className={`cell ${state}`}
          x={620 + (i % 12) * 7.4}
          y={190 + Math.floor(i / 12) * 6.6}
          width="6"
          height="5.2"
          rx="1"
        />
      ))}

      {/* Pass rate */}
      <text className="col-s" x="620" y="219">
        EVAL PASS
      </text>
      <rect className="bar-track" x="620" y="222" width="88" height="4" rx="2" />
      <rect className="bar-fill" x="620" y="222" width="76.6" height="4" rx="2" />
      <text className="col-n" x="620" y="234.5">
        87.1%
      </text>

      {/* The note */}
      <g className="note" transform="rotate(-1.2 770 204)">
        <rect x="722" y="176" width="96" height="58" rx="1" />
        <text className="note-k" x="729" y="187">
          TODO
        </text>
        <text className="note-l" x="729" y="203">
          Build it small.
        </text>
        <text className="note-l" x="729" y="215">
          Then make it
        </text>
        <text className="note-l" x="729" y="227">
          worth trusting.
        </text>
      </g>

      {/* Cursor, parked in the gap between the panel and the note */}
      <path
        className="cursor"
        d="M713 214 l0 10.5 l2.9 -2.9 l2.5 4.8 l2.3 -1.1 l-2.5 -4.8 l4 -0.4 z"
      />
    </g>
  );
}

/* ── Foreground: rug, dog, book stack ─────────────────────────────────── */
function SceneFore() {
  return (
    <g className="fore">
      <path className="rug" d={`M332 ${F} h700 l40 17 H288 z`} />
      <path className="ln rug-ln" d={`M352 ${F + 8} h662`} />

      {/* The dog belongs here, asleep under the desk — she is in the
          photographs further down the page, so she should be in the drawing.
          Pulled alongside the figure, to be redrawn with it. */}

      <g className="stack">
        <path className="bk-a" d={`M1052 ${F} h66 v-12 h-66 z`} />
        <path className="bk-b" d={`M1058 ${F - 12} h56 v-10 h-56 z`} />
        <path className="bk-c" d={`M1056 ${F - 22} h60 v-10 h-60 z`} />
        <path className="ln" d={`M1060 ${F - 6} h50`} />
      </g>
    </g>
  );
}

/* ═══ 2. The hero ════════════════════════════════════════════════════════ */

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
    <section className="pf-hero" ref={sectionRef} id="top">
      {children}
      {/*
        /profile was the only page on the site with **no `<h1>` at all** — ten
        `<h2>`s and fifteen `<h3>`s under nothing. That is a genuine defect:
        the h1 is the strongest on-page signal of what a page is about, and a
        document whose outline starts at h2 is malformed for a screen reader
        as well as for a crawler.

        It is `sr-only` rather than visible because the hero is deliberately a
        lead paragraph over the desk scene, with no headline — that is the
        design, and the lead itself is far too long to promote to an h1. A
        visually-hidden h1 fixes the outline without touching the composition.
      */}
      <h1 className="sr-only">
        Suman Debnath — Profile: Senior Brand Marketing Manager and AI-native
        product builder
      </h1>
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
    const span = Math.min(max, 0.5 * (vh + r.height));
    track.style.transform = `translate3d(${(-p * span).toFixed(1)}px,0,0)`;
  }, []);

  useScrub(boxRef, frame);

  return (
    <div className="pf-lf" ref={boxRef}>
      <div className="pf-lf-track" ref={trackRef}>
        {shots.map((s) => (
          <figure className="pf-lf-card" key={s.src}>
            {/* Plain <img>: the strip's width comes from the frames' own
                intrinsic ratios, which next/image's fill/sizes machinery
                fights for no gain. They are 576×720 WebP, all below the fold
                and all lazy — see scripts/build-profile-photos.mjs. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt=""
              width={576}
              height={720}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
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
  kicker,
}: {
  title: React.ReactNode;
  meta: string;
  lead: string;
  tail: React.ReactNode;
  tags: string[];
  kicker: React.ReactNode;
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
    <section className="pf-wrap pf-pad pf-credo" ref={sectionRef} id="credo">
      {kicker}
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

/* ═══ 5. The street ══════════════════════════════════════════════════════
   A conveyor, not a scroll effect: the street slides at a constant speed and
   a robot walks it. Whatever it is passing lights up and names itself above.

   ── How the pieces relate ───────────────────────────────────────────────
   The world is authored left-to-right into a cumulative x, and rendered
   twice so that after sliding one world-width the second copy is exactly
   where the first was — the loop has no seam. The robot never moves; the
   world moves under it, which is both cheaper and the only way to keep it
   centred in the frame.

   `VIEW_W` is the width of the *window*, not of the world. It is much
   narrower than the world on purpose: it is what makes each building render
   large enough to read its board.
   ───────────────────────────────────────────────────────────────────────── */

export type Stop = {
  /** What the board says. A `gap` has no board and no name. */
  name?: string;
  /** Which of `/profile`'s two halves this belongs to, for the readout. */
  role?: string;
  kind: "house" | "office" | "tower" | "cafe" | "kiosk" | "park" | "sign" | "gap";
  /** Slot width in world units. */
  w: number;
};

const VIEW_W = 950;
const VIEW_H = 200;
/** Pavement line. Everything in the street stands on it. */
const G = 158;
/** World units per second. One name roughly every four seconds. */
const SPEED = 34;
/** Where the robot stands, in view coordinates. */
const BOT_X = VIEW_W * 0.5;

export function KitStrip({ stops }: { stops: Stop[] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<SVGGElement>(null);
  const [active, setActive] = useState(0);

  // Frame-local state that must survive re-renders without causing them.
  const activeRef = useRef(0);
  const distRef = useRef(0);
  const lastRef = useRef(0);

  /** Cumulative left edge of every stop, plus the total width. */
  const { edges, worldW } = (() => {
    const e: number[] = [];
    let x = 0;
    for (const s of stops) {
      e.push(x);
      x += s.w;
    }
    return { edges: e, worldW: x };
  })();

  const frame = useCallback(
    (now: number) => {
      const box = boxRef.current;
      const world = worldRef.current;
      if (!box || !world) return;

      // Integrate our own clock. Using `now` directly would make the street
      // jump forward by however long the section spent off screen.
      const last = lastRef.current;
      lastRef.current = now;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      distRef.current = (distRef.current + dt * SPEED) % worldW;

      const shift = distRef.current;
      world.setAttribute("transform", `translate(${(-shift).toFixed(1)} 0)`);

      // Which stop is under the robot?
      const at = (shift + BOT_X) % worldW;
      let idx = 0;
      for (let i = edges.length - 1; i >= 0; i--) {
        if (at >= edges[i]) {
          idx = i;
          break;
        }
      }
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
    },
    [edges, worldW],
  );

  useScrub(boxRef, frame);

  const current = stops[active];
  const shown = current?.name ? current : stops.find((s) => s.name);

  return (
    <div>
      <div className="pf-kit-read" aria-live="off">
        <span className="say" key={shown?.name}>
          <span className="name">{shown?.name}</span>
          <span className="role">{shown?.role}</span>
        </span>
      </div>

      <div className="pf-kit-view" ref={boxRef}>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMax slice"
          role="img"
          aria-label={`A street of the work: ${stops
            .filter((s) => s.name)
            .map((s) => s.name)
            .join(", ")}.`}
        >
          <path className="kerb" d={`M0 ${G} H${VIEW_W}`} />
          <path className="kerb-2" d={`M0 ${G + 9} H${VIEW_W}`} />

          {/* Two copies of the world, one world-width apart. */}
          <g ref={worldRef}>
            {[0, 1].map((copy) =>
              stops.map((s, i) => (
                <Building
                  key={`${copy}-${i}`}
                  x={copy * worldW + edges[i]}
                  stop={s}
                  on={i === active}
                />
              )),
            )}
          </g>

          <Robot x={BOT_X} />
        </svg>
      </div>
    </div>
  );
}

/* ── One stop on the street ───────────────────────────────────────────── */
function Building({ x, stop, on }: { x: number; stop: Stop; on: boolean }) {
  const w = stop.w;
  const cls = `pf-bld ${stop.kind}${on ? " is-on" : ""}`;

  if (stop.kind === "gap") {
    return (
      <g className={cls} transform={`translate(${x} 0)`}>
        {/* A lamp post and a bench, so a gap still has something in it. */}
        <path className="ln" d={`M${w / 2} ${G} V${G - 62}`} />
        <path className="lamp-head" d={`M${w / 2 - 9} ${G - 62} h18 l-5 -9 h-8 z`} />
        <circle className="lamp-lit" cx={w / 2} cy={G - 66} r="4.5" />
        <path className="bench" d={`M${w / 2 - 26} ${G - 12} h30 v4 h-30 z`} />
        <path className="ln" d={`M${w / 2 - 22} ${G - 8} V${G} M${w / 2 - 2} ${G - 8} V${G}`} />
      </g>
    );
  }

  if (stop.kind === "park") {
    return (
      <g className={cls} transform={`translate(${x} 0)`}>
        <path className="ln" d={`M18 ${G} V${G - 34}`} />
        <circle className="crown" cx="18" cy={G - 46} r="20" />
        <path className="ln" d={`M${w - 26} ${G} V${G - 28}`} />
        <circle className="crown c2" cx={w - 26} cy={G - 40} r="16" />
        <path className="grass" d={`M6 ${G} q${w / 2 - 6} -12 ${w - 12} 0 z`} />
        <Board x={w / 2} y={G - 40} label={stop.name} width={Math.min(96, w - 20)} post />
      </g>
    );
  }

  if (stop.kind === "sign") {
    // A free-standing billboard: the board is the whole point.
    return (
      <g className={cls} transform={`translate(${x} 0)`}>
        <path className="ln" d={`M${w / 2 - 18} ${G} V${G - 52} M${w / 2 + 18} ${G} V${G - 52}`} />
        <Board x={w / 2} y={G - 74} label={stop.name} width={w - 16} big />
      </g>
    );
  }

  const top =
    stop.kind === "tower" ? 26 : stop.kind === "office" ? 50 : stop.kind === "cafe" ? 84 : stop.kind === "kiosk" ? 104 : 92;
  const h = G - top;
  const inner = w - 14;

  return (
    <g className={cls} transform={`translate(${x} 0)`}>
      {/* Body. Houses get a pitched roof; everything else is flat with a
          cornice, which is what separates a street from a row of boxes. */}
      {stop.kind === "house" ? (
        <>
          <path className="front" d={`M7 ${G} V${top + 18} h${inner} V${G} z`} />
          <path className="roof" d={`M1 ${top + 18} L${w / 2} ${top - 4} L${w - 1} ${top + 18} z`} />
          <path className="chimney" d={`M${w - 30} ${top + 6} v-18 h10 v12 z`} />
        </>
      ) : (
        <>
          <path className="front" d={`M7 ${G} V${top} h${inner} V${G} z`} />
          <path className="cornice" d={`M3 ${top} h${w - 6} v6 H3 z`} />
        </>
      )}

      {/* Windows: a grid for the tall ones, a single pane for the small. */}
      {stop.kind === "tower" || stop.kind === "office" ? (
        Array.from({ length: Math.floor(h / 26) }, (_, row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              className={`pane${(row + col) % 4 === 0 ? " lit" : ""}`}
              x={16 + col * ((inner - 18) / 3)}
              y={top + 18 + row * 26}
              width={(inner - 18) / 3 - 8}
              height="15"
              rx="1.5"
            />
          )),
        )
      ) : (
        <rect className="pane" x="16" y={top + 30} width={inner - 46} height="26" rx="2" />
      )}

      {/* Café awning */}
      {stop.kind === "cafe" && (
        <>
          <path className="awn" d={`M3 ${top + 22} h${w - 6} l-8 16 H11 z`} />
          <path className="ln" d={`M22 ${G - 22} h20 v14 h-20 z M${w - 40} ${G - 22} h18`} />
        </>
      )}

      {/* Door */}
      <rect className="door" x={w - 34} y={G - 34} width="22" height="34" rx="2" />
      <circle className="ln knob" cx={w - 18} cy={G - 17} r="1.6" />

      <Board
        x={w / 2}
        y={stop.kind === "house" ? top + 26 : top - 14}
        label={stop.name}
        width={Math.min(w - 12, 110)}
      />
    </g>
  );
}

/** The name board. Every structure that is not a gap carries one. */
function Board({
  x,
  y,
  label,
  width,
  post,
  big,
}: {
  x: number;
  y: number;
  label?: string;
  width: number;
  post?: boolean;
  big?: boolean;
}) {
  if (!label) return null;
  const h = big ? 30 : 17;
  return (
    <g className="board">
      {post && <path className="ln" d={`M${x} ${y + h} v14`} />}
      <rect x={x - width / 2} y={y} width={width} height={h} rx="2" />
      <text
        className={big ? "sign big" : "sign"}
        x={x}
        y={y + h / 2 + (big ? 4 : 3.2)}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

/* ── The robot ────────────────────────────────────────────────────────────
   A drawn cousin of the 3D mascot that lives on every other route. The rig is
   the standard one: each joint is a `<g>` whose *local* origin is the pivot,
   with the rotation applied by CSS keyframes at `transform-origin: 0 0`. The
   far leg and arm run the same keyframes half a cycle out of phase, which is
   the whole of the walk.
   ─────────────────────────────────────────────────────────────────────────*/
function Robot({ x }: { x: number }) {
  return (
    <g className="pf-bot" transform={`translate(${x} ${G})`}>
      <ellipse className="bot-shadow" cx="0" cy="2" rx="17" ry="3.4" />

      {/* Far leg and arm first, so the near ones overlap them. */}
      <Leg side="b" />
      <Arm side="b" />

      <g className="bot-body">
        <path className="body" d="M-11 -46 q0 -8 6 -8 h10 q6 0 6 8 v18 q0 6 -6 6 h-10 q-6 0 -6 -6 z" />
        <rect className="core" x="-4" y="-40" width="8" height="8" rx="2" />
        <path className="neck" d="M-3 -54 h6 v4 h-6 z" />
        <path className="head" d="M-12 -70 q0 -7 7 -7 h10 q7 0 7 7 v10 q0 7 -7 7 h-10 q-7 0 -7 -7 z" />
        <rect className="visor" x="-8" y="-66" width="16" height="7" rx="3" />
        <path className="ant" d="M0 -77 v-7" />
        <circle className="ant-led" cx="0" cy="-86" r="2.4" />
      </g>

      <Leg side="a" />
      <Arm side="a" />
    </g>
  );
}

function Leg({ side }: { side: "a" | "b" }) {
  return (
    <g className={`leg leg-${side}`} transform={`translate(${side === "a" ? 4 : -4} -28)`}>
      <g className="thigh">
        <path className="limb" d="M0 0 V13" />
        <g transform="translate(0 13)">
          <g className="knee">
            <path className="limb" d="M0 0 V13" />
            <path className="foot" d="M-3 12 h9 q3 0 3 3 v1 q0 2 -2 2 h-11 q-2 0 -2 -2 v-2 q0 -2 3 -2 z" />
          </g>
        </g>
      </g>
    </g>
  );
}

function Arm({ side }: { side: "a" | "b" }) {
  return (
    <g className={`arm arm-${side}`} transform={`translate(${side === "a" ? 8 : -8} -50)`}>
      <g className="shoulder">
        <path className="limb thin" d="M0 0 V12" />
        <g transform="translate(0 12)">
          <g className="elbow">
            <path className="limb thin" d="M0 0 V11" />
            <circle className="grip" cx="0" cy="12" r="2.6" />
          </g>
        </g>
      </g>
    </g>
  );
}
