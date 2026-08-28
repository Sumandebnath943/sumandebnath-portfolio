"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   The living half of the statement wall.

   ── Correcting an earlier mistake ─────────────────────────────────────────
   A previous version of this section shipped a still field, on the strength of
   a test that hashed the reference's canvas twice 1.2s apart and got identical
   bytes. That test was worthless: `toDataURL` on a WebGL canvas without
   `preserveDrawingBuffer` returns a stale buffer, so it would report *any*
   scene as unchanging. Two screenshots three seconds apart are completely
   different — benjamincreative.me's field is a flowing, morphing surface, and
   patching `requestAnimationFrame` on the live page counts ~274 callbacks a
   second. It is very much alive, and that motion is the section.

   ── What this does instead of a shader ────────────────────────────────────
   The photograph is fixed — it is the subject — and a flow field moves through
   it, pushing each cell a little lighter or darker over time so the characters
   churn while the face stays legible. Colour drifts across the field on a
   slower cycle.

   ── Why it is affordable ──────────────────────────────────────────────────
   The obvious implementation draws one `fillText` per cell: 10,496 calls a
   frame, which is the kind of thing that puts a page in the "why is scrolling
   janky" bucket. Instead each **row** is drawn as one string — 82 calls a frame
   — with a horizontal scale on the context so a monospace advance lands exactly
   on the cell grid. Glyph rasters are cached by the browser after the first
   frame, so the per-frame work is ~10k cached glyph blits and no text shaping.

   On top of that it: runs at a capped 20fps rather than 60; runs **only** while
   the band is on screen (IntersectionObserver — `body` is the scroll container,
   so scroll listeners never fire here, AGENTS.md trap 4); samples every second
   row and column on narrow screens; and never starts at all under
   `prefers-reduced-motion`, where the server-rendered `<pre>` stays put.

   The field's data is read out of that `<pre>` rather than imported, so the
   picture is shipped once, in the HTML, and costs the client bundle nothing.
   ───────────────────────────────────────────────────────────────────────── */

/** Light → dark. Must match `RAMP` in scripts/build-ascii-portrait.mjs. */
const RAMP = ".,:;+=*#$@";

/** A monospace cell is 0.6 as wide as it is tall. */
const CELL_ASPECT = 0.6;

/** Frames per second. The field is a slow churn; 60 would spend three times the
 *  work to look the same. */
const FPS = 20;

/** How hard the flow pushes a cell away from the photograph's own value, and
 *  how much of the photograph survives underneath it.
 *
 *  These two are one decision. At 0.42/0.86 the face went muddy — the flow was
 *  loud enough to eat the cheekbone and the beard line, which is the one thing
 *  this field cannot afford to lose. 0.34 against 0.92 churns just as visibly
 *  and the portrait stays legible through it. */
const FLOW = 0.34;
const PHOTO = 0.92;

/** The tone bands, and the ink strength each is drawn at.
 *
 *  A ten-step ramp already encodes the photograph's tone in the *shape* of each
 *  glyph, but drawing them all at one alpha throws that away again: a `.` and
 *  an `@` land with the same weight and the picture reads as an even texture.
 *  Splitting the ramp into three and drawing each at its own strength restores
 *  the range — highlights fall back to a whisper on the paper, shadows go to
 *  full ink. It is the single biggest difference between this reading as a
 *  photograph and reading as noise. */
const TONES = [
  { from: 0, to: 2, alpha: 0.3 },
  { from: 3, to: 5, alpha: 0.62 },
  { from: 6, to: 9, alpha: 1 },
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth 2-D value noise on a wrapping lattice, so it can be scrolled forever
 *  without running out of field or showing a seam. */
function makeNoise(size: number, seed: number) {
  const rand = mulberry32(seed);
  const lat = new Float32Array(size * size);
  for (let i = 0; i < lat.length; i++) lat[i] = rand();
  const mask = size - 1;

  return (x: number, y: number) => {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const fx = x - x0;
    const fy = y - y0;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);

    const ix = x0 & mask;
    const iy = y0 & mask;
    const jx = (x0 + 1) & mask;
    const jy = (y0 + 1) & mask;

    const a = lat[iy * size + ix];
    const b = lat[iy * size + jx];
    const c = lat[jy * size + ix];
    const d = lat[jy * size + jx];

    const top = a + (b - a) * sx;
    const bot = c + (d - c) * sx;
    return top + (bot - top) * sy;
  };
}

export default function AsciiField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const host = canvas.parentElement;
    const pre = host?.querySelector<HTMLPreElement>("pre.pf-ascii-field");
    const text = pre?.textContent;
    if (!host || !pre || !text) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // ── Read the baked picture back out of the DOM ──────────────────────────
    const rows = text.split("\n");
    const ROWS = rows.length;
    const COLS = rows[0].length;
    /** Darkness per cell, 0…1. */
    const base = new Float32Array(COLS * ROWS);
    for (let y = 0; y < ROWS; y++) {
      const line = rows[y];
      for (let x = 0; x < COLS; x++) {
        const idx = RAMP.indexOf(line[x]);
        base[y * COLS + x] = idx < 0 ? 0 : idx / (RAMP.length - 1);
      }
    }

    const noiseA = makeNoise(64, 0x5eed_1a7f);
    const noiseB = makeNoise(64, 0x2b19_c0de);

    let dpr = 1;
    let W = 0;
    let H = 0;
    let cellW = 0;
    let cellH = 0;
    let originX = 0;
    let originY = 0;
    let step = 1;

    const measure = () => {
      const r = host.getBoundingClientRect();
      if (!r.width || !r.height) return false;

      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      // Coarser sampling on small screens: a quarter of the glyphs, twice the
      // size, same picture.
      step = W < 768 ? 2 : 1;

      // Cover: the field is never smaller than the band in either direction, so
      // there is no edge to see. What overflows is clipped by the section.
      cellH = Math.max(H / (ROWS / step), W / ((COLS / step) * CELL_ASPECT));
      cellW = cellH * CELL_ASPECT;
      originX = (W - (COLS / step) * cellW) / 2;
      originY = (H - (ROWS / step) * cellH) / 2;
      return true;
    };

    let raf = 0;
    let running = false;
    let started = false;
    let last = 0;
    const interval = 1000 / FPS;
    const t0 = performance.now();

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < interval) return;
      last = now;

      const t = (now - t0) / 1000;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      /* Colour drifts across the field on a slow cycle — the reference's does
         the same. Ink where the picture is, warming to amber as it goes right.
         Three of them, one per tone band: see TONES. */
      const drift = Math.sin(t * 0.06) * 0.12;
      const fills = TONES.map(({ alpha }) => {
        const g = ctx.createLinearGradient(0, 0, W, H * 0.25);
        g.addColorStop(0, `rgba(22,20,14,${0.94 * alpha})`);
        g.addColorStop(Math.max(0.01, 0.26 + drift), `rgba(22,20,14,${0.88 * alpha})`);
        g.addColorStop(Math.min(0.98, 0.56 + drift), `rgba(120,68,10,${0.9 * alpha})`);
        g.addColorStop(Math.min(0.99, 0.78 + drift), `rgba(168,106,8,${0.82 * alpha})`);
        g.addColorStop(1, `rgba(150,92,12,${0.56 * alpha})`);
        return g;
      });

      /* Draw at a font size of one cell height, then squeeze the context
         horizontally so the monospace advance lands exactly one cell apart.
         This is what allows a whole row to be one `fillText`. */
      const fontPx = cellH;
      ctx.font = `${fontPx}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textBaseline = "top";
      const advance = ctx.measureText("M").width || fontPx * 0.6;
      const squeeze = cellW / advance;

      const cols = Math.floor(COLS / step);
      const rowsOut = Math.floor(ROWS / step);
      const level: number[] = new Array(cols);
      const band: string[] = new Array(cols);

      for (let ry = 0; ry < rowsOut; ry++) {
        const y = ry * step;

        for (let rx = 0; rx < cols; rx++) {
          const x = rx * step;

          // Two layers scrolling against each other: enough to read as flow
          // without a third octave's cost.
          const n =
            noiseA(x * 0.09 + t * 0.55, y * 0.09 - t * 0.22) * 0.62 +
            noiseB(x * 0.045 - t * 0.3, y * 0.05 + t * 0.14) * 0.38;

          const v = base[y * COLS + x] * PHOTO + (n - 0.5) * FLOW + 0.03;
          level[rx] = v <= 0 ? 0 : v >= 1 ? RAMP.length - 1 : Math.round(v * (RAMP.length - 1));
        }

        ctx.setTransform(dpr * squeeze, 0, 0, dpr, dpr * originX, dpr * (originY + ry * cellH));

        /* One pass per tone band, each in its own ink strength. This is the
           difference between a picture and a texture: drawn in a single colour,
           a faint `.` and a solid `@` carry the same weight of ink and the
           photograph flattens out — which is exactly how the first version
           looked. Cells outside the band become spaces, which cost an advance
           and nothing else. Three passes is 246 `fillText` calls a frame
           against 10,496 for the per-cell version. */
        for (let b = 0; b < TONES.length; b++) {
          const { from, to } = TONES[b];
          let any = false;
          for (let rx = 0; rx < cols; rx++) {
            const l = level[rx];
            if (l >= from && l <= to) {
              band[rx] = RAMP[l];
              any = true;
            } else {
              band[rx] = " ";
            }
          }
          if (!any) continue;
          ctx.fillStyle = fills[b];
          ctx.fillText(band.join(""), 0, 0);
        }
      }

      if (!started) {
        started = true;
        // Only now hand over from the server-rendered field, so a canvas that
        // never paints leaves the static picture in place.
        pre.style.visibility = "hidden";
      }
    };

    const start = () => {
      if (running || !measure()) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px 0px" },
    );
    io.observe(host);

    const ro = new ResizeObserver(() => {
      if (running) measure();
    });
    ro.observe(host);

    return () => {
      io.disconnect();
      ro.disconnect();
      stop();
      pre.style.visibility = "";
    };
  }, []);

  return <canvas ref={canvasRef} className="pf-ascii-canvas" aria-hidden="true" />;
}
