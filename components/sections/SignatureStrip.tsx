"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   The closing band — the orange strip of display type between the Related
   block and the footer on the homepage.

   Modelled on the band at benjamincreative.me. The first version of this
   matched the picture and none of the behaviour; what follows was measured on
   the live page rather than guessed at.

   ── What the reference actually does ──────────────────────────────────────

   1. **It reacts to scrolling.** This is the whole feel of it, and a CSS
      keyframe cannot do it. Idle, the track moves at ~80px/s. Sampled while
      scrolling — either direction — it runs at ~180px/s, and eases back to ~80
      within a second of the scroll stopping. The direction never flips: scroll
      speed is *added* to the base speed, so the band surges as the page moves
      and settles when it stops.
   2. **It stops when it is not on screen.** Scrolled past, the transform stops
      advancing entirely.
   3. **The band is a vertical gradient**, `#FD6A3A → #FB4617`, not a flat
      orange. At 92px type the band is 212px tall — the type occupies less than
      half of it, and that air is most of why it reads as expensive.
   3b. **There is a hairline across it.** `border-top: 1px solid
      rgba(255,255,255,0.25)` on an inner box inset 32px from the top of the
      band — 0.35em at the reference's type size. It is a small thing and it is
      the difference between a band and a slab: the line gives the orange an
      edge to sit under, so the height reads as deliberate rather than as
      padding. This shipped without it and the section looked plain.
   4. **The type is medium-weight and title case**, not a heavy display face
      shouting in capitals: PP Neue Montreal Medium, 92px, letter-spacing -3px
      (-0.033em). Manrope 600 at the same tracking is the closest thing already
      loaded here.
   5. **The separator is a ring**, ~1.1em across, with a `C` inside it at 0.9em,
      both at 35% white so they sit behind the words rather than competing.

   ── What that costs, and why it is affordable ─────────────────────────────
   A scroll-reactive marquee needs a frame loop; there is no declarative form of
   it. So the loop is gated hard: it runs **only** while the band intersects the
   viewport, does one `transform` write per frame, allocates nothing, and reads
   `scrollTop` directly rather than listening for scroll events — `body` is the
   scroll container here, so `window` scroll listeners never fire at all
   (AGENTS.md trap 4).

   Under `prefers-reduced-motion` the loop never starts and the band is static.
   ───────────────────────────────────────────────────────────────────────── */

/** Pixels per second with the page still. */
const BASE_SPEED = 80;
/** How much of the page's own scroll speed is added on top. Tuned against the
 *  reference: ~80px/s at rest, ~180px/s under an ordinary wheel scroll. */
const SCROLL_GAIN = 0.25;
/** Ceiling on the borrowed speed, so a flick does not blur the words. The
 *  reference tops out around 180px/s under an ordinary scroll; 80 + 120 lands
 *  in the same place, and a hard flick cannot push it past that. */
const MAX_BOOST = 120;
/** Per-60Hz-frame approach rate toward the target speed. Low enough to read as
 *  momentum, high enough that a short scroll is felt at all — at 0.08 a
 *  200ms flick was over before the band had reached half the boost. */
const SMOOTHING = 0.16;

/** The band, as the user wrote it, set in title case as the reference sets it.
 *  `©` renders as the ring; `✳` as a quieter asterisk between phrases. */
const PHRASES = [
  "A Brand Marketer",
  "AI Product Designer",
  "Pune, IST",
  "Open to Work",
  "2026",
];

/** The reference's separator: a thin ring with a `C` inside, both at 35% white.
 *  Sized in `em` so it tracks the type at every breakpoint. */
function Ring() {
  return (
    <span
      aria-hidden="true"
      className="mx-[0.14em] inline-flex h-[1.12em] w-[1.12em] shrink-0 items-center justify-center rounded-full border-[0.035em] border-white/35 text-white/35"
      style={{ fontSize: "0.86em", lineHeight: 1 }}
    >
      C
    </span>
  );
}

/** One pass of the sentence. Two of these make the track. */
function Run() {
  return (
    <div className="flex shrink-0 items-center whitespace-nowrap">
      <span className="px-[0.1em]">Suman Debnath</span>
      <Ring />
      {PHRASES.map((phrase) => (
        <span key={phrase} className="flex items-center">
          <span className="px-[0.1em]">{phrase}</span>
          <span className="px-[0.08em] text-white/35">✳</span>
        </span>
      ))}
    </div>
  );
}

export default function SignatureStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scroller = document.scrollingElement ?? document.documentElement;

    let raf = 0;
    let running = false;
    /* The wrap point. The track is two identical halves, so travelling exactly
       one half and resetting is seamless — and unlike a percentage keyframe it
       stays correct while the offset is being driven by hand. */
    let half = track.scrollWidth / 2;
    let offset = 0;
    let speed = BASE_SPEED;
    let lastScroll = scroller.scrollTop;
    let lastTime = 0;

    const frame = (now: number) => {
      if (!lastTime) lastTime = now;
      // Capped so a background tab that wakes up does not jump the band.
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const scrollTop = scroller.scrollTop;
      const scrollSpeed = Math.abs(scrollTop - lastScroll) / (dt || 0.016);
      lastScroll = scrollTop;

      const target = BASE_SPEED + Math.min(MAX_BOOST, scrollSpeed * SCROLL_GAIN);
      // Frame-rate independent approach, so 120Hz eases back at the same rate
      // as 60Hz rather than twice as fast.
      speed += (target - speed) * (1 - Math.pow(1 - SMOOTHING, dt * 60));

      offset = (offset + speed * dt) % (half || 1);
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = 0;
      lastScroll = scroller.scrollTop;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      // A little early, so it is never caught standing still as it slides in.
      { rootMargin: "150px 0px" },
    );
    io.observe(track);

    // The half-width changes with the viewport, and a stale one would leave a
    // gap mid-loop.
    const ro = new ResizeObserver(() => {
      half = track.scrollWidth / 2;
    });
    ro.observe(track);

    return () => {
      io.disconnect();
      ro.disconnect();
      stop();
    };
  }, []);

  return (
    <section
      aria-label="Suman Debnath — brand marketer and AI product designer, Pune, open to work"
      /* 0.35em + 0.26em of padding around a 1.08em row = 2.3em, which is the
         reference's 212px band at 92px type, to the pixel. */
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#FD6A3A_0%,#FB4617_100%)] py-[0.35em] text-[clamp(2.35rem,7.6vw,5.75rem)]"
    >
      {/* The hairline. See note 3b — it is what gives the band an edge. */}
      <div className="border-t border-white/25 py-[0.26em]">
        <div
          ref={trackRef}
          className="flex w-max will-change-transform font-manrope font-medium leading-[1.08] tracking-[-0.033em] text-white"
        >
          <Run />
          <div aria-hidden="true" className="flex">
            <Run />
          </div>
        </div>
      </div>
    </section>
  );
}
