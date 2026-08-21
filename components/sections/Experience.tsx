"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionKicker from "@/components/ui/SectionKicker";

/**
 * The Evolution — four eras, moved sideways by the page scroll.
 *
 * This began as four full-width stacked cards, each carrying two narrative
 * paragraphs, ten capability chips and a three-line "emotional statement" — well
 * over 2,000px of scroll to say one thing: the AI work stands on a decade of
 * marketing. It became a swipeable rail, and is now **pinned**: the section
 * holds still while the page scroll drives the cards across.
 *
 * The heading sits **above** the rail, on the same grid as every other section
 * on the site. It cannot live inside the pinned pane — see `SectionHeader` for
 * the measurements — but it does not need to, because the pane only ever holds
 * the cards.
 *
 * Four things about that which are load-bearing:
 *
 * 1. **The track is exactly as tall as the travel.** `height: 100vh + travel`,
 *    where travel is measured, not guessed. Scroll-jacking that invents extra
 *    height is how a "shorter" section ends up longer than the stack it
 *    replaced. One pixel of page scroll buys one pixel of sideways movement.
 *
 * 2. **`overflow-hidden` sits on the sticky element, never above it.** An
 *    ancestor with `overflow: hidden` becomes the sticky child's scroll
 *    container and silently kills the pin (Bible §5, trap 1). On the sticky
 *    element itself it is fine, and it is what clips the cards.
 *
 * 3. **Below 768px, and under reduced motion, there is no pin at all** — it
 *    falls back to the native swipe rail. Hijacking scroll on a touch device
 *    fights the gesture the visitor already has, and pinning is precisely the
 *    kind of motion `prefers-reduced-motion` is asking us not to do.
 *
 * 4. **No travel means no pin.** With the rail spanning the full width, a wide
 *    monitor shows all four cards at once. Pinning then would hold a motionless
 *    section for a whole viewport of scroll, so `pinned` requires `travel > 0`.
 *    That makes the pin decision depend on a measurement, which is why the
 *    travel effect must not itself be gated on `pinned`.
 */

// ── ERA DATA ──────────────────────────────────────────────────────────────────

const eras = [
  {
    id: "foundations",
    index: "01",
    name: "Foundations",
    years: "2016 — 2023",
    tagline: "The decade that built the operator.",
    narrative:
      "Branding, growth strategy, digital marketing, creative direction and execution — nearly a decade spent understanding people, attention and the systems that move an organisation forward.",
    capabilities: [
      "Brand Strategy",
      "Digital Marketing",
      "Campaign Systems",
      "Performance Marketing",
      "Creative Direction",
      "Leadership",
    ],
    closer: "Built every day for seven years.",
    // Light cream
    bg: "bg-gradient-to-br from-[#FAF7F2] via-[#F5F0E8] to-[#EDE8DF]",
    border: "border-[#D6CCBC]/70",
    shadow: "shadow-[0_16px_50px_-18px_rgba(180,160,130,0.35)]",
    tagColor: "text-[#6F6248]",
    tagBg: "bg-[#8C7B60]/[0.08]",
    yearColor: "text-[#1A1A1A]/65",
    titleColor: "text-[#0A0A0A]",
    narrativeColor: "text-[#3A3530]/75",
    chipBg: "bg-[#8C7B60]/[0.07]",
    chipText: "text-[#5C4E38]/80",
    chipBorder: "border-[#8C7B60]/20",
    accentLine: "bg-[#C4B49A]",
    closerColor: "text-[#3A3530]",
    ruleColor: "border-[#8C7B60]/20",
  },
  {
    id: "discovery",
    index: "02",
    name: "Discovery",
    years: "2023 — 2025",
    tagline: "The moment everything shifted.",
    narrative:
      "Generative AI turned experimentation into an operating framework — rapid prototyping, orchestration, automation workflows and product architecture. The transition stopped being theoretical.",
    capabilities: [
      "Prompt Engineering",
      "AI Workflows",
      "Rapid Prototyping",
      "Automation Systems",
      "Systems Thinking",
      "AI Operations",
    ],
    closer: "Prototypes became products.",
    // Light blue
    bg: "bg-gradient-to-br from-[#EFF6FF] via-[#E0EEFF] to-[#D6E8FF]",
    border: "border-[#A8C8F0]/60",
    shadow: "shadow-[0_16px_50px_-18px_rgba(100,160,230,0.35)]",
    tagColor: "text-[#2E6FBF]",
    tagBg: "bg-[#2E6FBF]/[0.08]",
    yearColor: "text-[#1A2A3A]/65",
    titleColor: "text-[#0A1420]",
    narrativeColor: "text-[#1A2E45]/70",
    chipBg: "bg-[#2E6FBF]/[0.07]",
    chipText: "text-[#1A4A80]/80",
    chipBorder: "border-[#2E6FBF]/20",
    accentLine: "bg-[#7AAEE0]",
    closerColor: "text-[#1A2E45]",
    ruleColor: "border-[#2E6FBF]/20",
  },
  {
    id: "systems",
    index: "03",
    name: "Systems",
    years: "2025 — Present",
    tagline: "Infrastructure. Intelligence. Intention.",
    narrative:
      "The focus moved from campaigns to systems, and from execution to infrastructure — AI-native products, automation ecosystems and intelligent workflows, shipped end to end.",
    capabilities: [
      "AI-Native Products",
      "Systems Architecture",
      "Automation Infrastructure",
      "AI-Assisted Engineering",
      "AI Strategy",
      "Intelligent Workflows",
    ],
    closer: "Not a pivot. An evolution.",
    // Light yellow
    bg: "bg-gradient-to-br from-[#FEFBEC] via-[#FDF5D0] to-[#F9EDB0]",
    border: "border-[#E0CC70]/50",
    shadow: "shadow-[0_16px_50px_-18px_rgba(200,180,60,0.35)]",
    tagColor: "text-[#6E570C]",
    tagBg: "bg-[#8C7010]/[0.08]",
    yearColor: "text-[#2A2000]/65",
    titleColor: "text-[#1A1400]",
    narrativeColor: "text-[#3A3010]/80",
    chipBg: "bg-[#8C7010]/[0.07]",
    chipText: "text-[#5C4A00]/80",
    chipBorder: "border-[#C0A020]/25",
    accentLine: "bg-[#D4B830]",
    closerColor: "text-[#3A3010]",
    ruleColor: "border-[#C0A020]/25",
  },
  {
    // The only card that is not a record. Three eras close an arc — foundation,
    // shift, systems — and stop exactly where a reader starts asking "and then
    // what?". This answers that, and it is deliberately the one card written in
    // the future tense so it cannot be mistaken for something already shipped.
    id: "ahead",
    index: "04",
    name: "Ahead",
    years: "2026 →",
    tagline: "The next operating model.",
    narrative:
      "Agentic infrastructure, AI-native product leadership, and systems that run without a human in the loop — built by someone who has shipped both the marketing and the machine.",
    capabilities: [
      "Agentic Infrastructure",
      "AI Product Leadership",
      "Autonomous Systems",
      "Model Orchestration",
      "AI-Native GTM",
      "Evals & Guardrails",
    ],
    closer: "The operator, one layer up.",
    // Light violet
    bg: "bg-gradient-to-br from-[#F7F4FF] via-[#EFE9FF] to-[#E4DBFF]",
    border: "border-[#C3B3F0]/60",
    shadow: "shadow-[0_16px_50px_-18px_rgba(120,95,220,0.35)]",
    tagColor: "text-[#5B45B8]",
    tagBg: "bg-[#6B4FD8]/[0.08]",
    yearColor: "text-[#241A3A]/65",
    titleColor: "text-[#150F28]",
    narrativeColor: "text-[#2E2545]/80",
    chipBg: "bg-[#6B4FD8]/[0.07]",
    chipText: "text-[#4A3690]",
    chipBorder: "border-[#6B4FD8]/20",
    accentLine: "bg-[#A48FE8]",
    closerColor: "text-[#2E2545]",
    ruleColor: "border-[#6B4FD8]/20",
  },
];

// ── ERA CARD ──────────────────────────────────────────────────────────────────

function EraCard({
  era,
  cardRef,
}: {
  era: (typeof eras)[0];
  /** Set on the first card only — it is the height the pin decision measures. */
  cardRef?: React.Ref<HTMLElement>;
}) {
  return (
    <article
      ref={cardRef}
      className={`
        relative snap-start shrink-0
        w-[82vw] sm:w-[380px] lg:w-[400px]
        flex flex-col rounded-[1.75rem] border overflow-hidden
        ${era.border} ${era.shadow}
      `}
    >
      <div className={`absolute inset-0 ${era.bg}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 p-7 md:p-8">
        {/* Index + years */}
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-mono text-[10px] ${era.yearColor} tracking-[0.3em]`}>
            {era.index}
          </span>
          <div className={`h-px w-6 ${era.accentLine}`} />
          <span
            className={`font-manrope text-[9px] uppercase tracking-[0.3em] px-2.5 py-1 rounded ${era.tagBg} ${era.tagColor}`}
          >
            {era.years}
          </span>
        </div>

        {/* Name + tagline */}
        <h3
          className={`font-serif italic font-normal text-4xl md:text-[2.75rem] ${era.titleColor} leading-none tracking-tight mb-3`}
        >
          {era.name}
        </h3>
        <p className={`font-manrope text-[13px] ${era.narrativeColor} tracking-wide mb-5`}>
          {era.tagline}
        </p>

        {/* One paragraph, not three */}
        <p
          className={`font-manrope text-[15px] ${era.narrativeColor} leading-[1.7] mb-7`}
        >
          {era.narrative}
        </p>

        {/* Chips — pushed to the bottom so cards of different copy lengths still
            line up along their footer rule. */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {era.capabilities.map((cap) => (
              <span
                key={cap}
                className={`font-manrope text-[11px] font-medium px-3 py-1 rounded-full border ${era.chipBg} ${era.chipText} ${era.chipBorder}`}
              >
                {cap}
              </span>
            ))}
          </div>

          <p
            className={`font-serif italic font-normal text-lg ${era.closerColor} leading-snug border-t ${era.ruleColor} pt-5`}
          >
            {era.closer}
          </p>
        </div>
      </div>
    </article>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

/**
 * Header copy — always stacked above the rail, on the same grid as every other
 * section heading on the site.
 *
 * **It must stay outside the pinned track, and that is the whole trick.** This
 * used to be a fixed left column beside the moving cards, because inside a
 * pinned pane the header genuinely does not fit: measured at 1366×728 the
 * header is 339px and a card is 533px, so stacking them needs 872px of a 728px
 * viewport and the sticky pane simply clips — with no way for the visitor to
 * reach what was cut. That constraint has not gone away.
 *
 * What resolves it is that the pane only ever has to hold the *cards*. The
 * header scrolls past normally before the rail pins, exactly like every other
 * section on the site, and the pane then needs card height alone. As a bonus
 * the rail gets the ~450px the left column used to occupy, which is what made
 * the section look lopsided on a wide monitor.
 */
function SectionHeader({ pinned }: { pinned: boolean }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={headerRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto w-full px-6 mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
    >
      <div className="max-w-2xl">
        <SectionKicker>02 / The Evolution</SectionKicker>
        <h2 className="font-manrope font-semibold text-[#0A0A0A] leading-[1.1] tracking-tight mb-5 text-3xl md:text-4xl lg:text-5xl">
          Before the systems came{" "}
          <span className="text-[#0A0A0A]/60">the foundation.</span>
        </h2>
        <p className="font-manrope text-[#555] leading-relaxed text-[15px] md:text-base max-w-xl">
          The move into AI-native systems was built on nearly a decade of
          branding, growth, execution and creative direction.
        </p>
      </div>

      {/* Affordance — a rail that does not announce itself gets missed. The
          wording differs because the gesture does: pinned it is the page scroll,
          unpinned it is a swipe. */}
      <p
        aria-hidden
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#6E6E6E] shrink-0 md:pb-2"
      >
        {pinned ? "Keep scrolling →" : "Swipe the eras →"}
      </p>
    </m.div>
  );
}

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  // Server render — and every phone — gets the plain swipe rail. The pin is
  // opted into after mount, once we know the viewport is wide enough, the
  // visitor has not asked for less motion, and a card actually fits.
  const [allowPin, setAllowPin] = useState(false);
  const [fits, setFits] = useState(false);
  const [travel, setTravel] = useState(0);
  // `travel > 0` matters now that the rail spans the full width instead of
  // sharing it with a 400px header column. On a wide monitor all four cards are
  // already visible, so there is nothing to move sideways — pinning there would
  // spend a whole viewport of scroll holding a still image.
  const pinned = allowPin && fits && travel > 0;

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowPin(wide.matches && !reduced.matches);
    update();
    wide.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  // Does a card actually fit in this viewport?
  //
  // A pinned pane is exactly one viewport tall, so on a short window the card is
  // cut off by the very overflow that makes the pin work — and unlike normal
  // overflow there is nothing the visitor can do to reach what was cut.
  //
  // This started as `matchMedia("(min-height: 640px)")` and that was wrong in a
  // way worth recording: **CSS pixels are not screen pixels.** A 1080p Windows
  // machine at the 150% display scaling Windows itself recommends reports a
  // viewport around 1280×600, and browser zoom does the same thing. The guard
  // silently dropped a large share of ordinary desktops to the swipe rail, and
  // it presented as "the scroll pinning is gone".
  //
  // Measuring the card instead is correct at every scale factor, because it
  // compares the two things that actually have to fit. The card is 400px wide in
  // both layouts at this breakpoint, so its height does not change when the pin
  // engages and this cannot oscillate.
  useEffect(() => {
    const measure = () => {
      const card = cardRef.current;
      if (!card) return;
      // 56px covers the breathing room a centred card needs top and bottom.
      setFits(card.getBoundingClientRect().height + 56 <= window.innerHeight);
    };
    const ro = new ResizeObserver(measure);
    if (cardRef.current) ro.observe(cardRef.current);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [allowPin]);

  // How far the row has to move for its last card to reach the right edge. This
  // is measured rather than derived from card widths, because the widths are
  // viewport-relative and the gaps change at the sm breakpoint.
  // Deliberately NOT gated on `pinned` any more. `pinned` now depends on
  // `travel`, so measuring only while pinned would be circular — the section
  // could never pin, because travel would never be measured. This is safe only
  // because the rail's container and row are now the same box in both modes:
  // same width, same padding, so the measurement does not change when the pin
  // engages and it cannot oscillate.
  useEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      const vp = viewportRef.current;
      if (!row || !vp) return;
      setTravel(Math.max(0, row.scrollWidth - vp.clientWidth));
    };
    // ResizeObserver fires once for each element the moment it is observed, so
    // this covers the initial measurement too — calling measure() in the effect
    // body instead would be a setState-in-effect cascade.
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  // The pinned rail positions cards purely by transform, which assumes the
  // container itself is at scrollLeft 0. It is the same element as the swipe
  // rail now, so it can arrive carrying a scroll offset — from scroll-snap, or
  // from a visitor who swiped mid-rail before widening the window. That offset
  // survives the switch to `overflow: hidden` and shifts every card by it.
  useEffect(() => {
    if (pinned && viewportRef.current) viewportRef.current.scrollLeft = 0;
  }, [pinned]);

  // Gated rather than zeroed in the effect, so unpinning does not schedule a
  // state update.
  const travelPx = pinned ? travel : 0;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travelPx]);

  return (
    <SectionWrapper id="experience" className="py-16 md:py-20 bg-white" showLine={false}>
      {/* ── THE TRACK ──
          Exactly one viewport tall plus the horizontal travel, so the section
          never costs more scroll than the movement it buys. Unpinned it has no
          height of its own and simply wraps the swipe rail. */}
      <SectionHeader pinned={pinned} />

      <div
        ref={trackRef}
        className="relative"
        style={pinned ? { height: `calc(100vh + ${travelPx}px)` } : undefined}
      >
        <div
          className={
            pinned ? "sticky top-0 h-screen flex items-center overflow-hidden" : ""
          }
        >
          {/* One rail, two behaviours. Pinned it is clipped and driven by the
              page scroll; unpinned it is a native swipe rail. Keeping it a
              single box — same width, same padding — is what lets `travel` be
              measured in either mode.

              tabIndex + role only when it actually scrolls: announcing a
              scrollable group that cannot scroll is worse than not announcing
              it, and a tabbable div that does nothing is a dead stop for
              keyboard users. */}
          <div
            ref={viewportRef}
            {...(pinned
              ? {}
              : {
                  role: "group" as const,
                  "aria-label": "Career eras, scroll horizontally",
                  tabIndex: 0,
                })}
            /* scroll-padding must equal the row's own left gutter, or
               scroll-snap parks the first card at a non-zero scrollLeft — which
               `overflow:hidden` then silently inherits when the pin engages,
               offsetting every card by that amount. */
            className={`w-full ${
              pinned
                ? "overflow-hidden"
                : "overflow-x-auto snap-x snap-mandatory pb-4 -mb-4 scroll-pl-[max(1.5rem,calc((100%-72rem)/2+1.5rem))] [scrollbar-width:thin] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
            }`}
          >
            {/* The left gutter matches the max-w-6xl grid the rest of the page
                sits on, so the first card lines up with the section heading
                above it instead of drifting to the window edge. The row runs to
                the right window edge on purpose — cards bleeding off that side
                is the cue that there are more of them.

                `100%` not `100vw`, and `+1.5rem` for the grid's own px-6:
                percentages resolve against this row's container, whereas 100vw
                includes the scrollbar. Using 100vw put the cards 19px left of
                the heading on any window with a classic scrollbar. */}
            <m.div
              ref={rowRef}
              style={{ x }}
              className="flex gap-6 w-max pl-[max(1.5rem,calc((100%-72rem)/2+1.5rem))] pr-6"
            >
              {eras.map((era, i) => (
                <EraCard
                  key={era.id}
                  era={era}
                  cardRef={i === 0 ? cardRef : undefined}
                />
              ))}
            </m.div>
          </div>
        </div>
      </div>

      {/* ── CLOSING STATEMENT ──
          Was two centred serif blocks split across four ragged lines, which
          read as a stray fragment rather than a conclusion. Now one pull quote,
          left-aligned to the same grid as everything above it. */}
      <m.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto px-6 mt-14 md:mt-16"
      >
        <div className="max-w-3xl border-t border-[#1A1A1A]/10 pt-8">
          <p className="font-manrope text-[10px] uppercase tracking-[0.4em] text-[#6E6E6E] mb-5">
            The Result
          </p>
          <blockquote className="font-serif italic font-normal text-2xl md:text-3xl lg:text-[2.25rem] text-[#0A0A0A] leading-[1.35]">
            This transition into AI-native systems was not random. It was the
            evolution of an{" "}
            <span className="text-[#0A0A0A]/60">already experienced operator.</span>
          </blockquote>
        </div>
      </m.figure>
    </SectionWrapper>
  );
}
