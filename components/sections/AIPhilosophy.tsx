"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { m, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionKicker from "@/components/ui/SectionKicker";

/**
 * Operating principles.
 *
 * The shape is the "What I do" accordion at nbnzia.com, which the user supplied
 * as the reference. The first version of this copied its arrangement and none
 * of its behaviour; what follows was measured on the live page.
 *
 * ── What the reference actually does ──────────────────────────────────────
 *
 * 1. **Hover opens a row.** Not click. Moving the pointer over a row opens it
 *    and closes the one that was open, and it *stays* open when the pointer
 *    leaves — the list is never all-closed. There is no +/− affordance
 *    anywhere on it, because it never needs one.
 * 2. **The image is a curtain, not a fade.** Each row's picture is absolutely
 *    positioned inside the row, and the row clips it. Closed, the image sits at
 *    `translateY(100%)` — parked entirely below the visible strip. Opening
 *    slides it up to 0. Its opacity is 1 the whole time. That reveal is most of
 *    why the section feels expensive, and a cross-fade cannot imitate it.
 * 3. **The copy is a second, nested reveal.** The panel animates its height
 *    from 0 while the paragraph inside it moves `translateY(24px) → 0` and
 *    fades in. Two clips, slightly out of step, rather than one.
 * 4. **Timings, sampled frame by frame:** height ≈300ms and symmetric
 *    (accelerate, then decelerate); the image ≈400ms and heavily front-loaded —
 *    it covers two-thirds of its travel in the first 100ms and eases into
 *    place. The image leads, the box follows.
 * 5. Nothing dims. Inactive rows keep the same colour as the active one; the
 *    open row is distinguished by being open.
 *
 * ── Three rules this section keeps ────────────────────────────────────────
 *
 * · **Every principle stays in the HTML.** Panels are collapsed with CSS
 *   (`grid-template-rows: 0fr`), never conditionally rendered — text that only
 *   exists after an interaction is text an answer engine never sees. `inert` on
 *   the closed ones keeps that honest for keyboard and screen-reader users: in
 *   the document, out of the tab order.
 * · **Each belief points at something that proves it.** A principle with a
 *   product under it is a claim with evidence. If you add a seventh, it needs a
 *   `proof` or it does not go in.
 * · **No filters, no blurs, no opacity layers on the rows.** The mobile deck on
 *   this same page taught that lesson expensively — PAGE_OPTIMIZATION §3.5.
 *   Everything here animates `transform`, `opacity` or `grid-template-rows`.
 */

// ── PRINCIPLES DATA ───────────────────────────────────────────────────────────

type Principle = {
  id: string;
  number: string;
  title: string;
  lead: string;
  body: string;
  /** The thing that proves it. Images are 800×450 from /public/mosaic. */
  proof: { name: string; href: string; image: string };
  accent: string;
  /** Darkened accent for text on white — every one of these clears 4.5:1. */
  ink: string;
};

const principles: Principle[] = [
  {
    id: "infrastructure",
    number: "01",
    title: "Intelligence Is Infrastructure",
    lead: "AI is no longer a feature.",
    body: "It is becoming the foundational layer through which products, systems, interfaces and decisions get designed. The future will not belong to people who merely use AI — it will belong to those who can architect around it.",
    proof: { name: "ROASmind", href: "/projects/roasmind", image: "/mosaic/roasmind.webp" },
    accent: "#2E6FBF",
    ink: "#255A9C",
  },
  {
    id: "systems",
    number: "02",
    title: "Systems Compound",
    lead: "One-off execution collapses under scale. Systems do not.",
    body: "The goal is no longer to solve problems, but to build environments where solutions continuously emerge, adapt and evolve.",
    proof: { name: "MIGI", href: "/agents/migi", image: "/mosaic/migi.webp" },
    accent: "#10B981",
    ink: "#0A7A55",
  },
  {
    id: "human",
    number: "03",
    title: "Human Identity Must Survive Automation",
    lead: "As AI becomes more capable, human originality becomes more valuable.",
    body: "The challenge is no longer access to intelligence. It is preserving judgment, taste, instinct and perspective inside increasingly automated systems.",
    proof: { name: "IMPRINT", href: "/projects/imprint", image: "/mosaic/imprint.webp" },
    accent: "#FF5A1F",
    ink: "#C4400E",
  },
  {
    id: "craft",
    number: "04",
    title: "Craft Still Matters",
    lead: "AI accelerates execution — and execution without taste creates noise.",
    body: "Design, clarity, composition, language and emotional precision still separate meaningful systems from disposable ones.",
    proof: { name: "PixelVille", href: "/games/pixelville", image: "/mosaic/pixelville.webp" },
    accent: "#C5A059",
    ink: "#8A6A28",
  },
  {
    id: "speed",
    number: "05",
    title: "Speed Is A Creative Advantage",
    lead: "Thought and execution are no longer separated by weeks.",
    body: "AI-native environments changed that relationship permanently. The ability to prototype, iterate, test and evolve a system quickly is now a strategic advantage in itself.",
    proof: { name: "D-PE.ai", href: "/projects/d-pe", image: "/mosaic/d-pe.webp" },
    accent: "#7B61FF",
    ink: "#5F45E0",
  },
  {
    id: "operator",
    number: "06",
    title: "The Operator Evolves",
    lead: "The modern builder is no longer limited to a single discipline.",
    body: "Design, strategy, systems thinking, automation, engineering and AI orchestration are converging into one new operating model.",
    proof: { name: "PentaCMD-47M", href: "/slms/pentacmd", image: "/mosaic/pentacmd.webp" },
    accent: "#FF003C",
    ink: "#D10031",
  },
];

// ── ONE ROW ───────────────────────────────────────────────────────────────────

function PrincipleRow({
  principle: p,
  index,
  open,
  onOpen,
}: {
  principle: Principle;
  index: number;
  open: boolean;
  onOpen: () => void;
}) {
  const panelId = `principle-panel-${p.id}`;
  const buttonId = `principle-button-${p.id}`;

  return (
    <m.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: Math.min(index, 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      /* `sd-prin` — the row. `overflow: hidden` is what clips the image while
         the row is closed, so it is the mechanism, not a tidy-up. Safe here:
         no sticky descendants (AGENTS.md trap 3). */
      className="sd-prin group relative overflow-hidden border-t transition-colors duration-500"
      style={{
        borderTopColor: open ? p.accent : "rgba(26,26,26,0.14)",
        ["--accent" as string]: p.accent,
      }}
      data-open={open || undefined}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          /* Hover opens, as the reference does — and so do focus and click, so
             keyboard and touch get the same behaviour without a second
             affordance. Nothing here closes a row: the list is never empty, and
             that is why the reference needs no +/−. */
          onMouseEnter={onOpen}
          onFocus={onOpen}
          onClick={onOpen}
          className="sd-prin-hit"
        >
          <span className="sd-prin-ix" style={{ color: p.ink }}>
            [&nbsp;{p.number}&nbsp;]
          </span>
          <span className="sd-prin-title">{p.title}</span>
        </button>
      </h3>

      {/* 0fr → 1fr. The panel is never unmounted: the copy has to stay in the
          server-rendered HTML. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className="sd-prin-panel"
      >
        <div className="sd-prin-clip">
          <div className="sd-prin-inner">
            <div className="sd-prin-copy">
              <p className="sd-prin-lead">{p.lead}</p>
              <p className="sd-prin-body">{p.body}</p>
              <Link href={p.proof.href} className="sd-prin-link" style={{ color: p.ink }}>
                <span aria-hidden="true" className="dot" style={{ background: p.accent }} />
                {p.proof.name}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* The curtain.
                Desktop: absolutely positioned, so its containing block is the
                row — which means the panel's `overflow: hidden` does *not*
                clip it (a static ancestor is not in an absolute element's
                containing-block chain) and the row's does. It parks a full
                height below its resting place and slides up.
                Mobile: static, so it falls back into the flow inside the panel
                and is revealed by the panel opening instead. One DOM, both
                behaviours — see globals.css. */}
            <div className="sd-prin-media" aria-hidden="true">
              {/* Raw <img>, matching the mosaic on /profile: these are already
                  800×450 WebP at 5–37 KB, so next/image would re-encode
                  finished work. Lazy on all six — the section is well below the
                  fold and only one row is ever open. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.proof.image}
                alt=""
                width={800}
                height={450}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </m.li>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

export default function AIPhilosophy() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  /* One open, always exactly one — the reference never returns to a closed
     state once you have touched it, and starting shut would make the section
     read as six links to nowhere. */
  const [openId, setOpenId] = useState(principles[0].id);

  return (
    <SectionWrapper
      id="philosophy"
      className="bg-white px-6 py-16 md:py-20"
      showLine={false}
    >
      <div className="mx-auto max-w-6xl">

        {/* ── SECTION HEADER ── */}
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-2xl md:mb-14"
        >
          {/* On white — the shared default palette. */}
          <SectionKicker className="mb-6">05 / Operating Principles</SectionKicker>
          <h2 className="font-manrope mb-4 text-3xl font-semibold leading-[1.1] tracking-tight text-[#0A0A0A] md:text-4xl lg:text-5xl">
            The philosophy behind every system,{" "}
            <span className="text-[#0A0A0A]/60">workflow, and decision.</span>
          </h2>
          <p className="font-manrope max-w-xl text-[15px] font-medium leading-relaxed text-[#444] md:text-base">
            Six operational beliefs — not motivational statements. Move across
            them to see the argument, and the thing I built that proves it.
          </p>
        </m.div>

        {/* ── THE SIX ──
            `/[0.14]`, not `/14` — Tailwind's opacity modifier only takes
            multiples of five and silently compiles nothing otherwise. That is
            how the loader shipped an invisible progress track
            (PAGE_OPTIMIZATION §4.3). */}
        <ol className="border-b border-[#1A1A1A]/[0.14]">
          {principles.map((p, i) => (
            <PrincipleRow
              key={p.id}
              principle={p}
              index={i}
              open={openId === p.id}
              onOpen={() => setOpenId(p.id)}
            />
          ))}
        </ol>

        {/* ── ONE CLOSING QUOTE, NOT THREE ── */}
        <m.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 border-t border-[#1A1A1A]/10 pt-8 md:mt-16"
        >
          <blockquote className="max-w-3xl font-serif text-2xl font-normal italic leading-[1.35] text-[#0A0A0A] md:text-3xl lg:text-[2.25rem]">
            The future belongs to operators who can{" "}
            <span className="text-[#0A0A0A]/60">think across systems.</span>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-4">
            <span className="h-px w-10 shrink-0 bg-[#1A1A1A]/25" />
            <span className="font-manrope text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4A4A4A]">
              Suman Debnath
            </span>
          </figcaption>
        </m.figure>

      </div>
    </SectionWrapper>
  );
}
