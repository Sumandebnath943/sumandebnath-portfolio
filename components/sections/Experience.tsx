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
 * Three things about that which are load-bearing:
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
 * Header copy, in both arrangements.
 *
 * Pinned, it becomes a fixed left column beside the moving cards. That is not
 * decoration: stacked above them it needs ~740px of viewport before a single
 * card is fully visible, which a 13" laptop does not have, and the sticky pane
 * would simply clip. Side by side, the section needs only the height of one
 * card.
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
      className={
        pinned
          ? "w-[340px] xl:w-[400px] shrink-0"
          : "max-w-6xl mx-auto w-full px-6 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      }
    >
      <div className={pinned ? "" : "max-w-2xl"}>
        <SectionKicker>02 / The Evolution</SectionKicker>
        {/* The pinned heading keeps full section weight. An earlier version
            dropped it to text-3xl with a 14px standfirst to save room, and
            beside four large cards it stopped reading as a section header at
            all — the section looked like it had lost its title. The column is
            wide enough that this costs no height: the header is still shorter
            than a card, which is what sets the pane height. */}
        <h2
          className={`font-manrope font-semibold text-[#0A0A0A] leading-[1.1] tracking-tight mb-5 ${
            pinned ? "text-4xl xl:text-5xl" : "text-3xl md:text-4xl lg:text-5xl"
          }`}
        >
          Before the systems came{" "}
          <span className="text-[#0A0A0A]/60">the foundation.</span>
        </h2>
        <p
          className={`font-manrope text-[#555] leading-relaxed ${
            pinned ? "text-[15px]" : "text-[15px] md:text-base max-w-xl"
          }`}
        >
          The move into AI-native systems was built on nearly a decade of
          branding, growth, execution and creative direction.
        </p>
      </div>

      {/* Affordance — a rail that does not announce itself gets missed. The
          wording differs because the gesture does: pinned it is the page scroll,
          unpinned it is a swipe. */}
      <p
        aria-hidden
        className={`font-mono text-[10px] uppercase tracking-[0.3em] text-[#6E6E6E] shrink-0 ${
          pinned ? "mt-8" : "md:pb-2"
        }`}
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
  const pinned = allowPin && fits;

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
  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const row = rowRef.current;
      const vp = viewportRef.current;
      if (!row || !vp) return;
      // The flex cell already runs from the header to the right edge of the
      // window, so its own width IS the visible strip. It is also what clips
      // the row: without that, cards translating left simply slid over the
      // pinned header and buried it.
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
  }, [pinned]);

  // Gated rather than zeroed in the effect, for the same reason: unpinning must
  // not schedule a state update.
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
          {pinned ? (
            /* The gutter matches the max-w-6xl grid the rest of the page sits
               on, so the pinned header lines up with every other section
               heading instead of drifting to the window edge on a wide screen. */
            <div className="flex w-full items-center gap-12 xl:gap-16 pl-[max(1.5rem,calc((100vw-72rem)/2))]">
              <SectionHeader pinned />
              <div ref={viewportRef} className="flex-1 min-w-0 overflow-hidden">
                <m.div ref={rowRef} style={{ x }} className="flex gap-6 w-max pr-6">
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
          ) : (
            <>
            <SectionHeader pinned={false} />
            {/* tabIndex + role make the overflow container reachable and
                scrollable by keyboard; without them the copy inside is
                focus-trapped for anyone not using a pointer. */}
            <div
              role="group"
              aria-label="Career eras, scroll horizontally"
              tabIndex={0}
              className="
                flex gap-5 overflow-x-auto snap-x snap-mandatory
                px-6 pb-4 -mb-4 scroll-px-6
                [scrollbar-width:thin]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white
              "
            >
              {eras.map((era, i) => (
                <EraCard
                  key={era.id}
                  era={era}
                  cardRef={i === 0 ? cardRef : undefined}
                />
              ))}
              {/* Trailing spacer so the final card can snap clear of the edge. */}
              <div aria-hidden className="shrink-0 w-2" />
            </div>
            </>
          )}
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
