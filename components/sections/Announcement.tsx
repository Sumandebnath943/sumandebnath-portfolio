"use client";

import { ArrowUpRight, Radio } from "lucide-react";

type Announcement = {
  title: string;
  desc: string;
  href: string;
  color: string;
  /**
   * Set only on the notebook's featured article, which runs first and gets the
   * highlighted treatment. The value is the chip's text.
   *
   * Everything else in this ticker is a product; an article among them reads as
   * one unless it is marked, and "Migi" and "MIGI Android App" already prove how
   * easily two entries blur together at ticker speed.
   */
  badge?: string;
};

const announcements: Announcement[] = [
  {
    title: "Banking Co-pilot",
    desc: "An AI copilot for bank Relationship Managers — 12 modules, deterministic scoring, cited policy answers, and 38 tests holding the security model in place.",
    href: "/banking/rm-copilot",
    color: "#D9A961",
  },
  {
    title: "AEGIS VAULT",
    desc: "A zero-knowledge encrypted notepad — encrypted in your browser, unreadable to the server. Argon2id + AES-256-GCM.",
    href: "/projects/aegis-vault",
    color: "#8FE04E",
  },
  {
    title: "Migi",
    desc: "A fleet of 46 autonomous AI agents — finds work, tracks money, launches what I ship — held together by 500+ automated eval checks.",
    href: "/agents/migi",
    color: "#C6F24E",
  },
  {
    title: "MIGI Android App",
    desc: "The agent fleet in your pocket — a native Android client (V2), rebuilt from the ground up.",
    href: "/apps/migi-app",
    color: "#35E0FF",
  },
  {
    title: "PixelVille",
    desc: "A self-governing pixel-art village where citizens have memory, knowledge and minds — they elect mayors and rebuild the town themselves. Zero dependencies, zero image assets.",
    href: "/games/pixelville",
    color: "#F5B94A",
  },
  {
    title: "Qdex-1.5B",
    desc: "A 1.5B coding LLM, QLoRA-tuned to follow instructions — runs locally on a 16GB laptop, no GPU.",
    href: "/llms/qdex-1.5b",
    color: "#34D399",
  },
  {
    title: "The Journey",
    desc: "The whole route — 2013 to now — told with the real artefacts, not a timeline graphic.",
    href: "/journey",
    color: "#E4B363",
  },
  {
    title: "Pentashell",
    desc: "Plain English in, one safe terminal command out — the local CLI for PentaCMD-47M.",
    href: "/agents/pentashell",
    color: "#2FE2F0",
  },
  {
    title: "Forget Anything?",
    desc: "An Android app that reminds you the moment you leave home without your essentials.",
    href: "/apps/forget-anything",
    color: "#DAA520",
  },
  {
    title: "PentaCMD-47M",
    desc: "A 47M-param small language model trained from scratch on 299K instruction→command pairs. ~87% exact match.",
    href: "/slms/pentacmd",
    color: "#A78BFA",
  },
  {
    title: "PACT Agent",
    desc: "Trust-first local CLI coding agent.",
    href: "/agents/pact-agent",
    color: "#FF5500",
  },
  {
    title: "Soul Canvas",
    desc: "Your psyche, rendered as living particle art.",
    href: "/fun-apps",
    color: "#FF3D81",
  },
  {
    title: "The Design Museum",
    desc: "A walkable 3D portfolio museum, hosted by an AI guide.",
    href: "/fun-apps",
    color: "#7AA2F7",
  },
];

function TickerItem({ a }: { a: Announcement }) {
  const featured = Boolean(a.badge);
  return (
    <a
      href={a.href}
      className={
        "group/item flex items-center gap-2.5 whitespace-nowrap " +
        // The highlighted item carries its own pill, so it takes the padding
        // inside the pill rather than as a gap after the previous entry.
        (featured ? "mr-8 rounded-full py-1 pl-2.5 pr-4" : "pr-8 pl-0")
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
      <span className={"font-manrope text-[13px] " + (featured ? "text-white/70" : "text-white/55")}>
        {a.desc}
      </span>
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
          style={{ animation: "pact-marquee 48s linear infinite" }}
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
