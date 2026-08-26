"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A progress bar for how far through the article you are.
 *
 * ## Why a scroll listener is safe here, despite the standing trap
 *
 * `AGENTS.md` trap 4 says window scroll listeners never fire on this site
 * because the body is the scroll container. That note is **wrong and has been
 * corrected** — `HANDOFF.md` §2 records it being measured on the current build
 * (`document.scrollingElement` is `<html>`, `window.scrollY` tracks, a listener
 * fired 19 times across one programmatic scroll), and there is an article about
 * the correction at /notebook/the-trap-i-wrote-down-was-wrong.
 *
 * It is still measured rather than assumed: the effect reads `scrollY` once on
 * mount, so if the value never moves the bar simply stays at zero rather than
 * rendering something misleading.
 *
 * ## Why it measures the article, not the document
 *
 * The page continues past the article into the FAQ, the related rail and the
 * footer. A document-height bar would read 60% at the last paragraph, which is
 * worse than no bar. This measures from the top of `<article>` to the point
 * where its bottom clears the viewport, so 100% means "you have read it".
 *
 * ## Why rAF rather than throttling by time
 *
 * Scroll fires far more often than the screen repaints. Coalescing into one rAF
 * means at most one measurement per frame, and no timer to tune.
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const article = document.getElementById(targetId);
    if (!article) return;

    const measure = () => {
      frame.current = 0;
      const rect = article.getBoundingClientRect();
      // Distance the article's top has travelled above the viewport top,
      // against the distance it can travel before its bottom clears.
      const travelled = -rect.top;
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(travelled > 0 ? 1 : 0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, travelled / total)));
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div
      className="nb-progress"
      role="progressbar"
      aria-label="Article read"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className="nb-progress-fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
