"use client";

import { ArrowUpRight, Radio } from "lucide-react";

type Announcement = {
  title: string;
  /**
   * One phrase, not a sentence. **Keep it under about 55 characters.**
   *
   * These ran 80–170 characters until 7 Sep 2026 and the strip was unreadable:
   * a line long enough to be a sentence is a line that leaves the viewport
   * before it can be finished, and thirteen of them in sequence is a wall
   * nobody reads twice. Optional, because the featured article's title is
   * already a complete claim and a supporting line only makes it slower.
   */
  desc?: string;
  href: string;
  color: string;
  /**
   * Set only on the notebook's featured article, which runs first and gets the
   * highlighted treatment. The value is the chip's text.
   *
   * Everything else here is a product; an article among them reads as one
   * unless it is marked, and "Migi" and "MIGI Android App" already sit close
   * enough to blur at ticker speed.
   */
  badge?: string;
};

/**
 * The strip is a headline reel, not a site index.
 *
 * Cut from thirteen to seven on 7 Sep 2026. The footer sitemap and /projects
 * already list everything, and a ticker's whole value is that a reader can
 * finish it — at thirteen entries the loop ran nearly four minutes of content
 * past someone who was going to give it five seconds.
 *
 * Removed, and easy to restore from git if any should come back: MIGI Android
 * App and Pentashell (each covered by the entry above it — the fleet and
 * PentaCMD-47M), PACT Agent, Forget Anything?, Soul Canvas and The Design
 * Museum. The seven kept are the ones carrying a number or a claim that stands
 * on its own in one line.
 */
const announcements: Announcement[] = [
  {
    title: "Migi",
    desc: "46 autonomous agents, 500+ eval checks.",
    href: "/agents/migi",
    color: "#C6F24E",
  },
  {
    title: "PentaCMD-47M",
    desc: "47M params, trained from scratch. ~87% exact match.",
    href: "/slms/pentacmd",
    color: "#A78BFA",
  },
  {
    title: "Banking Co-pilot",
    desc: "12 modules, cited policy answers, 38 security tests.",
    href: "/banking/rm-copilot",
    color: "#D9A961",
  },
  {
    title: "AEGIS VAULT",
    desc: "Zero-knowledge notes. The server never sees the key.",
    href: "/projects/aegis-vault",
    color: "#8FE04E",
  },
  {
    title: "Qdex-1.5B",
    desc: "A 1.5B coding LLM that runs on a 16GB laptop.",
    href: "/llms/qdex-1.5b",
    color: "#34D399",
  },
  {
    title: "PixelVille",
    desc: "A pixel village that elects its own mayors.",
    href: "/games/pixelville",
    color: "#F5B94A",
  },
  {
    title: "The Journey",
    desc: "2013 to now, told with the real artefacts.",
    href: "/journey",
    color: "#E4B363",
  },
];

/* ── Speed ────────────────────────────────────────────────────────────────
 *
 * The duration used to be a hardcoded 48s, which is not a speed — it is a
 * speed divided by however much content happens to be in the list. Thirteen
 * long entries made the track about 12,600px, so -50% in 48s worked out at
 * roughly **262 px/sec**, four times faster than anything readable, and adding
 * an entry made it worse without anyone touching the number.
 *
 * So the duration is derived from the content and the speed is the constant.
 * Add an entry and the loop gets longer, never faster.
 */

/** Comfortable reading pace for a single line of 13px text. */
const SPEED_PX_PER_SEC = 65;

/**
 * Roughly how wide one item renders.
 *
 * Estimated from character counts rather than measured in an effect. The
 * estimate is deterministic, works during server rendering, and costs no
 * client JavaScript or layout reflow — and for pacing a decorative strip,
 * being within a few per cent is the whole requirement.
 */
function itemWidth(a: Announcement): number {
  const CHAR = 6.7; // 13px Manrope, mixed case
  const CHROME = 62; // pulse dot, gaps, arrow, trailing space
  const BADGE = 78; // chip plus its gap
  return (
    CHROME +
    (a.badge ? BADGE : 0) +
    a.title.length * CHAR * 1.05 + // semibold runs a little wider
    (a.desc ? a.desc.length * CHAR : 0)
  );
}

function TickerItem({ a }: { a: Announcement }) {
  const featured = Boolean(a.badge);
  return (
    <a
      href={a.href}
      className={
        "group/item flex items-center gap-2.5 whitespace-nowrap " +
        // The highlighted item carries its own pill, so it takes the padding
        // inside the pill rather than as a gap after the previous entry.
        (featured ? "mr-10 rounded-full py-1 pl-2.5 pr-4" : "pr-10 pl-0")
      }
      style={
        featured
          ? {
              background: `linear-gradient(90deg, ${a.color}1f 0%, ${a.color}0a 60%, transparent 100%)`,
              boxShadow: `inset 0 0 0 1px ${a.color}38`,
            }
          : undefined
      }
    >
      {/* accent separator dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: a.color, animation: "pact-pulse-ring 2.4s ease-out infinite" }}
        />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: a.color }} />
      </span>

      {featured && (
        <span
          className="font-mono text-[9px] uppercase tracking-[0.16em] font-bold rounded-full px-2 py-[3px] shrink-0"
          style={{ background: a.color, color: "#0A0A0C" }}
        >
          {a.badge}
        </span>
      )}

      <span
        className={
          "font-manrope text-[13px] font-semibold transition-colors group-hover/item:text-white " +
          (featured ? "text-white" : "text-white/90")
        }
        style={{ textShadow: `0 0 18px ${a.color}${featured ? "55" : "30"}` }}
      >
        {a.title}
      </span>
      {a.desc && (
        <span className={"font-manrope text-[13px] " + (featured ? "text-white/70" : "text-white/55")}>
          {a.desc}
        </span>
      )}
      <ArrowUpRight
        size={13}
        className={
          "shrink-0 transition-all group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 " +
          (featured ? "text-white/60" : "text-white/30")
        }
      />
    </a>
  );
}

/**
 * @param featured the notebook's featured article, composed in app/page.tsx.
 *
 * Passed in rather than read here, because this is a client component and
 * importing the notebook registry would ship all twenty-eight posts — every
 * block of every article — into the browser bundle to render one headline.
 * The page is a server component and already has the registry.
 */
export default function Announcement({ featured }: { featured?: Announcement }) {
  // The article leads: it is the one entry that changes, and a reader who has
  // seen the product list before has no reason to read it again.
  const items = featured ? [featured, ...announcements] : announcements;
  // Two back-to-back copies make the -50% translate loop seamlessly.
  const loop = [...items, ...items];

  const seconds = Math.round(
    items.reduce((n, a) => n + itemWidth(a), 0) / SPEED_PX_PER_SEC,
  );

  return (
    <div className="w-full bg-[#0A0A0C] border-t border-[#FF5500]/20 border-b border-white/[0.08] relative flex items-stretch overflow-hidden">
      {/* Ember wash — the hero's own #FF5500 glow continued into the strip, so
          the bar reads as part of the hero instead of a black seam under it.
          Kept clear of both edge-fade zones so the fades stay colour-exact. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_200%_at_42%_50%,rgba(255,85,0,0.16)_0%,transparent_75%)]"
      />

      {/* ── Fixed label ── */}
      <div className="relative z-20 flex items-center gap-2 pl-4 pr-3 sm:pl-6 sm:pr-5 border-r border-white/[0.08] shrink-0">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF5500]/15 text-[#FF7A45] shrink-0">
          <Radio size={12} className="animate-pulse" />
        </span>
        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF7A45] font-semibold whitespace-nowrap">
          Live Feed
        </span>
      </div>

      {/* ── Scrolling ticker ── */}
      <div className="group relative flex-1 overflow-hidden py-3">
        <div
          className="flex w-max items-center will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animation: `pact-marquee ${seconds}s linear infinite` }}
        >
          {loop.map((a, i) => (
            <TickerItem key={`${a.title}-${i}`} a={a} />
          ))}
        </div>

        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0A0A0C] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0A0A0C] to-transparent z-10" />
      </div>
    </div>
  );
}
