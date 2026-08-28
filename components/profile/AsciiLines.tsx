"use client";

import { useEffect, useRef } from "react";

/* The three lines, and the one piece of motion in this section.

   Measured on the reference (benjamincreative.me), the "Be Real / Be Creative
   / Be Bold" lines are **not** three static lines with the last one greyed —
   all three are pure white, and they rise together from `translateY(30px)` at
   `opacity: 0` over about 700ms, **staggered**, third last. Sampling the live
   page mid-entrance caught the third at `opacity: 0.50` while the first two
   were already at 1, which is exactly the frame in the screenshot: the last
   line looks grey because it is still arriving.

   So the grey is a moment, not a colour. Getting that wrong was the whole
   difference between the reference feeling alive and this feeling like a
   poster.

   Two rules from the repo apply here and both are load-bearing:

   · **Keyframes, not transitions** (PAGE_OPTIMIZATION §4.5). Setting a
     transition and its target in one React commit gives the browser nothing to
     animate from, and the entrance fires or does not depending on commit
     timing. A keyframe starts when the class lands and cannot race.
   · **`backwards`, never `both`** (§4.4). With a delay, `backwards` holds the
     line at `opacity: 0` during the wait instead of letting it flash in first.

   This is a client component so that the 7.5 KB character field in AsciiWall
   can stay a server component — a "use client" boundary around the whole
   section would serialise that string into the RSC payload as well as the
   HTML, and pay for it twice. */

/* The three marks, and the two numbers each needs to look like the other two.
 *
 * `*`, `#` and `™` are drawn at wildly different scales inside their em boxes,
 * so setting them all at one font-size gives three different-looking marks —
 * which is what the section shipped with. Measured in Manrope 500, ink box in
 * em relative to the baseline:
 *
 *     glyph   ink height   ink centre
 *     *         0.335        0.553
 *     #         0.715        0.363     ← more than twice the asterisk
 *     ™         0.370        0.535
 *
 * The asterisk is the one that reads correctly, so it is the target: every mark
 * should end up with its ink 0.335em tall, centred 0.553em above the baseline.
 * Solving `h × s = 0.335` and `v + c × s = 0.553` for each glyph gives:
 *
 *   `s` — font size, in the *line's* em
 *   `v` — how far to lift the baseline, in the *line's* em
 *
 * Re-measure and re-solve if the typeface or its weight ever changes; these are
 * metrics of these glyphs in this face, not taste. */
const LINES: { text: string; mark: string; s: number; v: number }[] = [
  { text: "Be Curious", mark: "*", s: 1, v: 0 },
  { text: "Be Useful", mark: "#", s: 0.469, v: 0.383 },
  { text: "Be Relentless", mark: "™", s: 0.905, v: 0.068 },
];

export default function AsciiLines() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("in");
        io.disconnect();
      },
      // Enough of the band on screen that the entrance is watched, not missed.
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <p className="pf-ascii-lines" ref={ref}>
      {LINES.map(({ text, mark, s, v }, i) => (
        <span className="ln" key={text} style={{ "--i": i } as React.CSSProperties}>
          {text}
          <span
            className="mk"
            aria-hidden="true"
            style={{ "--mk-s": s, "--mk-v": v } as React.CSSProperties}
          >
            {mark}
          </span>
        </span>
      ))}
    </p>
  );
}
