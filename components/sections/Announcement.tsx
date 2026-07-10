"use client";

import { ArrowUpRight, Radio } from "lucide-react";

type Announcement = {
  title: string;
  desc: string;
  href: string;
  color: string;
};

const announcements: Announcement[] = [
  {
    title: "AEGIS VAULT",
    desc: "A zero-knowledge encrypted notepad — encrypted in your browser, unreadable to the server. Argon2id + AES-256-GCM.",
    href: "/projects/aegis-vault",
    color: "#8FE04E",
  },
  {
    title: "Migi",
    desc: "A personal suite of 30+ autonomous AI agents — finds work, tracks money, launches what I ship — plus a secure dashboard. Built with Claude Code.",
    href: "/agents/migi",
    color: "#C6F24E",
  },
  {
    title: "Qdex-1.5B",
    desc: "A 1.5B coding LLM, QLoRA-tuned to follow instructions — runs locally on a 16GB laptop, no GPU.",
    href: "/llms/qdex-1.5b",
    color: "#34D399",
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
    desc: "A 47M-param small language model that speaks your terminal.",
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
  return (
    <a
      href={a.href}
      className="group/item flex items-center gap-2.5 pr-8 pl-0 whitespace-nowrap"
    >
      {/* accent separator dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: a.color, animation: "pact-pulse-ring 2.4s ease-out infinite" }}
        />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: a.color }} />
      </span>

      <span
        className="font-manrope text-[13px] font-semibold text-white/90 transition-colors group-hover/item:text-white"
        style={{ textShadow: `0 0 18px ${a.color}30` }}
      >
        {a.title}
      </span>
      <span className="font-manrope text-[13px] text-white/35">{a.desc}</span>
      <ArrowUpRight
        size={13}
        className="shrink-0 text-white/30 transition-all group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
      />
    </a>
  );
}

export default function Announcement() {
  // Two back-to-back copies make the -50% translate loop seamlessly.
  const loop = [...announcements, ...announcements];

  return (
    <div className="w-full bg-[#050505] border-b border-white/[0.08] relative flex items-stretch overflow-hidden">
      {/* ── Fixed label ── */}
      <div className="relative z-20 flex items-center gap-2 pl-4 pr-3 sm:pl-6 sm:pr-5 bg-[#050505] border-r border-white/[0.08] shrink-0">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3fb950]/15 text-[#3fb950] shrink-0">
          <Radio size={12} className="animate-pulse" />
        </span>
        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-[#3fb950] font-semibold whitespace-nowrap">
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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      </div>
    </div>
  );
}
