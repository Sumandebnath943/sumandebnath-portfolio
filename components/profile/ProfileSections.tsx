"use client";

/* ─────────────────────────────────────────────────────────────────────────
   /profile — the four sections modelled on the reference's homepage.

     Tracks    a carousel: isometric drawing left, discipline right
     Counted   a pinned bar chart on a log scale, counting up as you scroll
     ToolWall  two rows of brand marks drifting in opposite directions
     Mosaic    a pinned window that starts on one screenshot and zooms out
               to reveal all twenty

   The scroll rules are the same ones ProfileVisuals.tsx is built on and the
   reasoning is written out there in full: **no scroll listeners** — `body`
   carries `overflow-x: hidden`, so scroll events never reach `window`
   (AGENTS.md trap 4) — and **no React state at 60fps**. Everything reads
   `getBoundingClientRect()` inside a rAF loop gated by an
   IntersectionObserver, and writes to `element.style` directly.

   `useScrub` lives in ProfileVisuals and is imported rather than copied.
   ───────────────────────────────────────────────────────────────────────── */

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useScrub, clamp } from "./ProfileVisuals";
import { toolLogos } from "@/lib/tool-logos";

/* ═══ 1. Tracks ══════════════════════════════════════════════════════════ */

export type Track = {
  name: string;
  years: string;
  blurb: string;
  /** Which drawing to show. */
  art: "brand" | "build" | "systems" | "product";
};

export function Tracks({
  kicker,
  title,
  sub,
  tracks,
}: {
  kicker: React.ReactNode;
  title: React.ReactNode;
  sub: string;
  tracks: Track[];
}) {
  const [i, setI] = useState(0);
  const t = tracks[i];

  return (
    <section className="pf-wrap pf-pad pf-tracks" id="tracks">
      {kicker}
      <div className="pf-head pf-tracks-head">
        <h2>{title}</h2>
        <p className="sub">{sub}</p>
      </div>

      <div className="pf-inst">
        <div className="pf-dial-box">
          <TrackArt kind={t.art} />
        </div>

        <div className="pf-inst-read">
          {/* aria-live so the arrows announce the change rather than silently
              swapping the panel out under a screen reader. */}
          <div aria-live="polite">
            <h3 key={t.name}>{t.name}</h3>
            <span className="years">{t.years}</span>
            <p>{t.blurb}</p>
          </div>

          <div className="pf-inst-nav">
            <button
              type="button"
              aria-label="Previous track"
              disabled={i === 0}
              onClick={() => setI((n) => Math.max(0, n - 1))}
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              aria-label="Next track"
              disabled={i === tracks.length - 1}
              onClick={() => setI((n) => Math.min(tracks.length - 1, n + 1))}
            >
              <Chevron dir="right" />
            </button>
            <span className="count">
              {String(i + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Isometric drawings ───────────────────────────────────────────────────
   One projection, four scenes. `sx = (x−y)·0.866`, `sy = (x+y)·0.5 − z`, so
   +x runs right-and-down, +y left-and-down and +z straight up.

   A cuboid shows exactly three faces from this angle — the top, the face at
   `x+w` and the face at `y+d` — and `box()` returns those three polygons. Everything
   in these scenes is boxes and annotations; there are no curves at all, which
   is what makes them sit together as a set.
   ───────────────────────────────────────────────────────────────────────── */

const P = (x: number, y: number, z: number) =>
  `${((x - y) * 0.866).toFixed(1)},${((x + y) * 0.5 - z).toFixed(1)}`;

function Box({
  x,
  y,
  z = 0,
  w,
  d,
  h,
  cls = "",
}: {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  cls?: string;
}) {
  const top = `${P(x, y, z + h)} ${P(x + w, y, z + h)} ${P(x + w, y + d, z + h)} ${P(x, y + d, z + h)}`;
  const east = `${P(x + w, y, z + h)} ${P(x + w, y + d, z + h)} ${P(x + w, y + d, z)} ${P(x + w, y, z)}`;
  const south = `${P(x, y + d, z + h)} ${P(x + w, y + d, z + h)} ${P(x + w, y + d, z)} ${P(x, y + d, z)}`;
  return (
    <g className={`iso ${cls}`}>
      <polygon className="f-south" points={south} />
      <polygon className="f-east" points={east} />
      <polygon className="f-top" points={top} />
    </g>
  );
}

/** The ground each scene sits on: a thin slab with a hatched top. */
function Plate({ size = 108 }: { size?: number }) {
  return <Box x={-size / 2} y={-size / 2} w={size} d={size} h={5} cls="plate" />;
}

/** A caption under the whole scene. Positioned in screen space rather than
 *  through `P()` — an isometric point far enough "below" the plate to clear it
 *  also lands far to the left, which put the first pass's captions across the
 *  drawing instead of under it. */
function Caption({ text }: { text: string }) {
  return (
    <text className="iso-tick" x="0" y="84" textAnchor="middle">
      {text}
    </text>
  );
}

/** A corner label, in screen space. The viewBox is -132 -104 264 196, so
 *  ±118 sits just inside the edge. Isometric placement was tried for these and
 *  abandoned: a point far enough "outside" the scene to clear it is also far
 *  enough along the other axis to land back on top of it, and "16 PARTS · AA"
 *  ended up written across the token grid. */
function Note({
  side,
  y = -84,
  text,
}: {
  side: "left" | "right";
  y?: number;
  text: string;
}) {
  return (
    <text
      className="iso-tick"
      x={side === "left" ? -118 : 118}
      y={y}
      textAnchor={side === "left" ? "start" : "end"}
    >
      {text}
    </text>
  );
}

function Tick({
  x,
  y,
  z,
  text,
  anchor = "start",
}: {
  x: number;
  y: number;
  z: number;
  text: string;
  /** Ticks on the right of a scene need `end`, or they run out of the
   *  viewBox — "16 PARTS · AA" was rendering as "16 PA". */
  anchor?: "start" | "middle" | "end";
}) {
  const [sx, sy] = P(x, y, z).split(",");
  return (
    <text className="iso-tick" x={sx} y={sy} textAnchor={anchor}>
      {text}
    </text>
  );
}

function TrackArt({ kind }: { kind: Track["art"] }) {
  return (
    <svg
      className="pf-art"
      viewBox="-132 -104 264 196"
      role="img"
      aria-label={ART_LABEL[kind]}
    >
      {kind === "brand" && <ArtBrand />}
      {kind === "build" && <ArtBuild />}
      {kind === "systems" && <ArtSystems />}
      {kind === "product" && <ArtProduct />}
    </svg>
  );
}

const ART_LABEL: Record<Track["art"], string> = {
  brand: "An isometric drawing of a campaign stack — a billboard, a page and an ad, layered on one base.",
  build: "An isometric drawing of a product stack — a database, a server and a deployed app.",
  systems: "An isometric drawing of a component library — a grid of equal tokens on one plate.",
  product: "An isometric drawing of four linked stages — plan, build, check, ship.",
};

/** Brand marketing: one base, a tall out-of-home panel, a page and an ad. */
function ArtBrand() {
  return (
    <g className="scene">
      <Plate />
      <Box x={-42} y={-40} w={34} d={26} h={44} cls="hero lift l1" />
      <Box x={-42} y={2} w={34} d={26} h={16} cls="lift l2" />
      <Box x={4} y={-40} w={26} d={26} h={26} cls="lift l3" />
      <Box x={4} y={2} w={26} d={26} h={9} cls="hero lift l4" />
      {/* The out-of-home panel, on legs */}
      <Box x={30} y={-30} w={4} d={4} h={46} />
      <Box x={30} y={-8} w={4} d={4} h={46} />
      <Box x={22} y={-34} w={22} d={34} z={46} h={4} cls="hero bob" />
      <Note side="left" text="REACH" />
      <Note side="right" text="OOH" />
      <Caption text="1 BRAND · 20 LAUNCHES" />
    </g>
  );
}

/** AI-native product: a data slab, a service block, a deployed surface. */
function ArtBuild() {
  return (
    <g className="scene">
      <Plate />
      {/* three stacked discs read as a database */}
      <Box x={-46} y={-18} w={36} d={36} h={9} cls="write w1" />
      <Box x={-46} y={-18} z={11} w={36} d={36} h={9} cls="write w2" />
      <Box x={-46} y={-18} z={22} w={36} d={36} h={9} cls="hero write w3" />
      {/* the service */}
      <Box x={2} y={-18} w={22} d={36} h={52} />
      {/* the shipped surface, floating */}
      <Box x={30} y={-30} z={26} w={30} d={40} h={5} cls="hero bob" />
      <path className="iso-ln flow" d={`M${P(38, -10, 26)} L${P(38, -10, 5)}`} />
      <Note side="left" text="DATA" />
      <Note side="right" text="LIVE" />
      <Caption text="IDEA → SHIPPED · ~1 WEEK" />
    </g>
  );
}

/** Design systems: a grid of equal tokens, two of them lifted. */
function ArtSystems() {
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const lifted = (r === 1 && c === 2) || (r === 2 && c === 0);
      cells.push(
        <Box
          key={`${r}-${c}`}
          x={-44 + c * 23}
          y={-44 + r * 23}
          z={lifted ? 14 : 0}
          w={18}
          d={18}
          h={10}
          /* The two lifted ones cycle; the rest take a slow staggered breath
             so the grid never looks frozen behind them. */
          cls={lifted ? `hero tok ${r === 1 ? "k1" : "k2"}` : `lift l${((r + c) % 4) + 1}`}
        />,
      );
    }
  }
  return (
    <g className="scene">
      <Plate />
      {cells}
      <Note side="left" text="TOKENS" />
      <Note side="right" text="16 PARTS · AA" />
      <Caption text="ONE HAND · TWENTY-ONE PEOPLE" />
    </g>
  );
}

/** AI product management: four stages, linked, with one gate raised. */
function ArtProduct() {
  const stages = ["PLAN", "BUILD", "CHECK", "SHIP"];
  return (
    <g className="scene">
      <Plate />
      {stages.map((s, n) => (
        <g key={s}>
          <Box
            x={-52 + n * 27}
            y={-12}
            w={20}
            d={24}
            h={n === 2 ? 40 : 20}
            /* Staggered so the eye reads them in order: plan, build, check,
               ship. `l1`–`l4` are the delays. */
            cls={`${n === 2 ? "hero " : ""}lift l${n + 1}`}
          />
          <Tick
            x={-42 + n * 27}
            y={0}
            z={(n === 2 ? 40 : 20) + 15}
            text={s}
            anchor="middle"
          />
        </g>
      ))}
      {/* the thread running through them */}
      <path
        className="iso-ln flow"
        d={`M${P(-52, 0, 22)} L${P(28, 0, 22)}`}
      />
      <Caption text="500+ EVAL CHECKS" />
    </g>
  );
}

/* ═══ 2. The decade, counted ═════════════════════════════════════════════
   Nine figures as horizontal bars.

   ── Why horizontal ─────────────────────────────────────────────────────
   It was nine vertical bars first, and it looked cramped and slightly silly:
   nine columns across the sheet is 116px each, which forced the numerals down
   to 25px and the labels to 9px wrapping over three lines. Nine *rows* is
   comfortable — each label gets a full line, each numeral can be large, and
   comparing lengths along a shared left edge is easier than comparing heights
   across narrow columns anyway.

   ── Why there is no pin ────────────────────────────────────────────────
   The 240vh pin existed to buy the count-up some running time. Nine rows is a
   tall block on its own, so the fill can key off the section's ordinary trip
   up the viewport instead — which is what the mobile path already did. That
   removes a pin, drops ~1,400px of scroll from an already long page, and
   deletes the branch where those two measures disagreed.

   ── The scale is logarithmic ───────────────────────────────────────────
   The figures run 9 → 1,000. On a linear scale the first five are slivers
   against the last, and these are different units anyway — the bars are there
   to give the numbers a sense of magnitude, not to invite arithmetic.
   ───────────────────────────────────────────────────────────────────────── */

export type Stat = { value: number; suffix?: string; label: string };

const LOG_MIN = 0.82; // just under log10(9)
const LOG_MAX = 3.06; // just over log10(1000)
const FLOOR = 0.12; // shortest bar, as a fraction of the track

const barFraction = (v: number) =>
  FLOOR +
  (1 - FLOOR) * clamp((Math.log10(v) - LOG_MIN) / (LOG_MAX - LOG_MIN));

export function Counted({
  kicker,
  title,
  sub,
  cta,
  stats,
}: {
  kicker: React.ReactNode;
  title: React.ReactNode;
  sub: string;
  cta: { href: string; label: string };
  stats: Stat[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  const frame = useCallback(() => {
    const bars = barsRef.current;
    if (!bars) return;

    const vh = window.innerHeight;
    const r = bars.getBoundingClientRect();
    const p = clamp((vh * 0.92 - r.top) / (vh * 0.6));

    const rows = bars.querySelectorAll<HTMLElement>(".pf-bar");
    rows.forEach((row, n) => {
      // Each row starts a little after the one above it, so the chart draws
      // itself downward rather than arriving all at once.
      const own = clamp((p - n * 0.05) / (1 - n * 0.05));
      const eased = 1 - Math.pow(1 - own, 3);
      const target = Number(row.dataset.frac);
      const value = Number(row.dataset.value);

      const fill = row.querySelector<HTMLElement>(".fill");
      const num = row.querySelector<HTMLElement>(".num");
      if (fill) fill.style.width = `${(eased * target * 100).toFixed(2)}%`;
      // en-US rather than the default locale: "1,000" is the intended shape,
      // and an en-IN render would group larger figures as "1,00,000".
      if (num) num.textContent = Math.round(eased * value).toLocaleString("en-US");
    });
  }, []);

  useScrub(sectionRef, frame);

  return (
    <section className="pf-wrap pf-pad pf-chart-sec" ref={sectionRef} id="counted">
      {kicker}
      <div className="pf-head pf-chart-head">
        <h2>{title}</h2>
        <p className="sub">{sub}</p>
        <Link href={cta.href} className="pf-chart-cta">
          {cta.label}
          <svg viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path
              d="M3.5 8.5h10M9 4l4.5 4.5L9 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className="pf-bars" ref={barsRef}>
        {stats.map((s) => (
          <div
            className="pf-bar"
            key={s.label}
            data-frac={barFraction(s.value)}
            data-value={s.value}
          >
            <span className="lbl">{s.label}</span>
            <span className="big">
              {/* Server-rendered at the final value, so the section still reads
                  correctly with JS off and under reduced motion, where the
                  scrub never attaches. */}
              <span className="num">{s.value.toLocaleString("en-US")}</span>
              {s.suffix ?? "+"}
            </span>
            <div className="track">
              <div className="fill" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ 3. The tool wall ═══════════════════════════════════════════════════
   Two rows drifting in opposite directions as the section crosses the
   viewport — scroll-linked, not auto-playing, so it moves when you move.

   Deliberately *not* the street: that section is a walk past disciplines and
   metrics with a robot in it. This one is a flat wall of brand marks and
   nothing else.

   Three kinds of tile, decided in lib/tool-logos.ts:
     file — a real mark, fetched to public/tool-logos/
     mono — a simple-icons path, one colour
     type — a monogram, for the five brands no source carries
   ───────────────────────────────────────────────────────────────────────── */

/** Initials for a `type` tile: "Nano Banana" → "NB", "Wan" → "WA". */
const monogram = (label: string) => {
  const words = label.split(/\s+/);
  return (
    words.length > 1
      ? words.slice(0, 2).map((w) => w[0]).join("")
      : label.slice(0, 2)
  ).toUpperCase();
};

export function ToolWall({
  kicker,
  title,
  sub,
}: {
  kicker: React.ReactNode;
  title: React.ReactNode;
  sub: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);

  const frame = useCallback(() => {
    const box = boxRef.current;
    if (!box || !rowA.current || !rowB.current) return;

    const vh = window.innerHeight;
    const r = box.getBoundingClientRect();
    const p = clamp((vh - r.top) / (vh + r.height));

    // Both rows travel the same distance and stay inside [-span, 0]; the
    // second one just runs it backwards. An earlier version started row two
    // at +max and added to it, which pushed the whole row off the right edge
    // and left the section looking like it only had one row.
    for (const [row, back] of [
      [rowA.current, false],
      [rowB.current, true],
    ] as const) {
      const max = Math.max(0, row.scrollWidth - box.clientWidth);
      const span = Math.min(max, 0.55 * (vh + r.height));
      const x = back ? -(1 - p) * span : -p * span;
      row.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    }
  }, []);

  useScrub(boxRef, frame);

  const half = Math.ceil(toolLogos.length / 2);
  const rows = [toolLogos.slice(0, half), toolLogos.slice(half)];

  return (
    <section className="pf-wrap pf-pad pf-tools-sec" id="tools">
      {kicker}
      <div className="pf-head pf-tools-head">
        <h2>{title}</h2>
        <p className="sub">{sub}</p>
      </div>

      <div className="pf-tools" ref={boxRef}>
        {rows.map((row, n) => (
          <div className="pf-tools-row" key={n} ref={n === 0 ? rowA : rowB}>
            {row.map((tool) => (
              <div className="pf-tool" key={tool.slug}>
                <span className="mark">
                  {tool.kind === "file" && (
                    /* Plain <img>: these are 0.2–6 KB SVGs of wildly different
                       intrinsic sizes, and next/image's sizing machinery buys
                       nothing for an asset that is already vector. */
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={`/tool-logos/${tool.slug}.${tool.ext}`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  )}
                  {tool.kind === "mono" && (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={tool.path} fill={tool.hex} />
                    </svg>
                  )}
                  {tool.kind === "type" && (
                    <span className="mono">{monogram(tool.label)}</span>
                  )}
                </span>
                <span className="name">{tool.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ 4. The mosaic ══════════════════════════════════════════════════════
   A pinned window that opens full-bleed on one tile and pulls back to reveal
   the whole grid.

   ── The transform ──────────────────────────────────────────────────────
   To keep a chosen point under the middle of the window at any scale:

       tx = cx − fx · s      where (cx, cy) is the window centre
       ty = cy − fy · s            (fx, fy) the focus point in grid pixels

   The focus is lerped from the opening tile's centre to the grid's own
   centre, because a fixed focus at scale 1 leaves the grid off to one side.
   Both ends then fall out of the same expression: at p = 1 the focus *is* the
   centre, so tx = ty = 0.

   **`fx`, `fy` and the opening scale are measured off the DOM, not computed
   from the column count.** Once the grid grew gaps and padding, a cell's
   centre stopped being `(col + 0.5) / 5` of the width, and a computed focus
   drifted by tens of pixels at 5×. `offsetLeft`/`offsetWidth` are exact and
   cost one layout read per frame on an element that is already laid out.
   ───────────────────────────────────────────────────────────────────────── */

export type Tile = { slug: string; label: string };

/** A little over the exact fit, so the gaps either side of the opening tile
 *  stay outside the frame instead of showing as slivers down the edges. */
const OPEN_OVERFILL = 1.06;

export function Mosaic({
  kicker,
  title,
  sub,
  href,
  tiles,
  focus = 0,
}: {
  kicker: React.ReactNode;
  title: React.ReactNode;
  sub: string;
  href: string;
  tiles: Tile[];
  /** Index of the tile the zoom opens on. */
  focus?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLAnchorElement>(null);

  const frame = useCallback(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const win = windowRef.current;
    if (!section || !grid || !win) return;

    const cell = grid.children[focus] as HTMLElement | undefined;
    if (!cell) return;

    const vh = window.innerHeight;
    const travelled = -section.getBoundingClientRect().top;
    const total = Math.max(1, section.offsetHeight - vh);
    const raw = clamp(travelled / total);
    // Ease so it lingers on the opening frame and settles gently at the grid.
    const p = raw < 0.5 ? 4 * raw ** 3 : 1 - Math.pow(-2 * raw + 2, 3) / 2;

    const W = win.clientWidth;
    const H = win.clientHeight;
    if (!W || !H || !cell.offsetWidth) return;

    // Whatever it takes for the opening tile to cover the window.
    const open =
      Math.max(W / cell.offsetWidth, H / cell.offsetHeight) * OPEN_OVERFILL;
    const s = open + (1 - open) * p;

    const cx = cell.offsetLeft + cell.offsetWidth / 2;
    const cy = cell.offsetTop + cell.offsetHeight / 2;
    const fx = cx + (W / 2 - cx) * p;
    const fy = cy + (H / 2 - cy) * p;

    grid.style.transform = `translate(${(W / 2 - fx * s).toFixed(1)}px, ${(
      H / 2 -
      fy * s
    ).toFixed(1)}px) scale(${s.toFixed(4)})`;
  }, [focus]);

  useScrub(sectionRef, frame);

  return (
    <section className="pf-mos-sec" ref={sectionRef} id="mosaic">
      <div className="pf-mos-pin">
        <div className="pf-wrap pf-mos-inner">
          {kicker}
          <div className="pf-mos-head">
            <h2>{title}</h2>
            <p className="sub">{sub}</p>
          </div>
          <Link href={href} className="pf-mos-window" ref={windowRef}>
            <div className="pf-mos-grid" ref={gridRef}>
              {tiles.map((tile, n) => (
                <figure className="tile" key={tile.slug}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/mosaic/${tile.slug}.webp`}
                    alt={tile.label}
                    width={800}
                    height={450}
                    /* The focus tile is the whole section at p = 0 — lazy
                       loading it means the frame opens empty. */
                    loading={n === focus ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                  <figcaption>{tile.label}</figcaption>
                </figure>
              ))}
            </div>
            <span className="pf-mos-cue">
              See every project
              <svg viewBox="0 0 17 17" fill="none" aria-hidden="true">
                <path
                  d="M4.5 12.5 12.5 4.5M6 4.5h6.5V11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
