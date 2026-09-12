"use client";

import { useEffect, useRef } from "react";
import { CATEGORY_ACCENT, type Category } from "@/lib/notebook/types";

/**
 * The masthead's right-hand half, which was empty dot-pattern.
 *
 * One dot per article, coloured by its category, drifting slowly. It is the
 * archive itself rather than decoration that happens to sit near it — the
 * count is real, the colour distribution is real, and it changes when a post
 * ships.
 *
 * ── Why this cannot affect SEO ────────────────────────────────────────────
 *
 * It renders no text and no links. `aria-hidden` plus an empty `role` keeps it
 * out of the accessibility tree, and a crawler parsing the HTML sees one empty
 * `<canvas>`. There is nothing here to index, nothing that duplicates the h1,
 * and nothing that competes with the standfirst for the page's topic.
 *
 * It also cannot shift layout: the host is absolutely positioned inside
 * `.nb-mast`, which already establishes a containing block for `BannerArt`, so
 * the canvas never participates in flow and CLS stays zero whether it paints or
 * not. If the JS never runs, the masthead is exactly what it is today.
 *
 * ── Two traps this repo has already paid for ──────────────────────────────
 *
 * **No init guard.** `AGENTS.md` item 6: StrictMode mounts, cleans up and
 * remounts, and a `hasInitialised` flag makes the second mount a no-op — which
 * is how visitor tracking ended up dead under `next dev` for months. There is
 * no guard here; the effect starts a loop and the cleanup cancels it, so a
 * double mount is simply two clean cycles.
 *
 * **No window scroll listener.** The body is the scroll container here, so
 * `window` scroll events never fire (`AGENTS.md` item 4). This animates on its
 * own clock and never asks where the page is.
 */
export default function ArchiveConstellation({
  counts,
}: {
  counts: { category: Category; count: number }[];
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // One dot per article. Seeded from the index so the arrangement is stable
    // across reloads rather than reshuffling on every visit.
    const dots = counts.flatMap(({ category, count }) =>
      Array.from({ length: count }, (_, i) => {
        const seed = Math.sin(category.length * 97 + i * 31.7) * 43758.5453;
        const r1 = seed - Math.floor(seed);
        const r2 = (Math.sin((i + 2) * 12.9898 + category.length * 78.233) * 43758.5453) % 1;
        return {
          colour: CATEGORY_ACCENT[category],
          x: r1,
          y: Math.abs(r2),
          // Radians per ms — slow enough to read as drift rather than motion.
          speed: 0.00002 + r1 * 0.00003,
          phase: r1 * Math.PI * 2,
          amp: 6 + r1 * 10,
          size: 2 + Math.abs(r2) * 2.4,
        };
      }),
    );

    let raf = 0;
    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const drift = reduce ? 0 : Math.sin(t * d.speed + d.phase) * d.amp;
        const x = d.x * w;
        const y = d.y * h + drift;
        ctx.globalAlpha = 0.28 + (d.size / 4.4) * 0.34;
        ctx.fillStyle = d.colour;
        ctx.beginPath();
        ctx.arc(x, y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    resize();

    if (reduce) {
      draw(0);
    } else {
      const loop = (t: number) => {
        draw(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [counts]);

  return (
    <div className="nb-constellation" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
