"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  cubicBezier,
  m,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Shape of a card in the stack. This used to live in ProjectCard, whose
// component was never rendered — only this type was ever imported from it.
export interface ProjectData {
  id: string;
  number: string;
  title: string;
  positioning: string;
  emotion: string;
  atmosphere: string;
  capabilities: string[];
  tools: string[];
  status: "Live" | "Archived" | "Coming Soon" | "Classified";
  links: {
    label: string;
    href: string;
    variant?: "primary" | "ghost" | "subtle";
  }[];
  screenshots: string[];
  /** Optional dedicated page for the "Full Dossier" link (defaults to /projects/{id}). */
  dossierHref?: string;
  /** Optional representative image shown object-cover in the card's right panel. */
  coverImage?: string;
  theme: {
    primaryAccent: string;
    glow: string;
  };
}

// Tall landing-page screenshots shown (scrollable) in each card's right
// window. ROASmind has no screenshot yet (Coming Soon) → styled placeholder.
const SCREENSHOTS: Record<string, string> = {
  imprint: "/screenshots/imprint.png",
  legatus: "/screenshots/legatus.png",
  cite: "/screenshots/cite.png",
  "geek-collectibles": "/screenshots/geekcollectibles.png",
  ember: "/screenshots/ember.png",
  "d-pe": "/screenshots/d-pe.png",
};

const projects: ProjectData[] = [
  {
    id: "migi",
    number: "01",
    title: "Migi",
    positioning: "A personal suite of 30+ autonomous AI agents.",
    emotion: "A fleet that runs itself — and one dashboard to command it.",
    atmosphere: "Cloud-native. Free infra. Built with Claude Code.",
    capabilities: ["30+ Autonomous Agents", "GitHub Actions Orchestration", "Secure 2FA Dashboard"],
    tools: ["GitHub Actions", "Groq + Gemini", "Supabase / Next.js"],
    status: "Live",
    links: [{ label: "Explore Migi", href: "/agents/migi", variant: "primary" }],
    screenshots: [],
    dossierHref: "/agents/migi",
    coverImage: "/migi-agent/overview.png",
    theme: {
      primaryAccent: "#C6F24E",
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(198,242,78,0.16), transparent 70%)",
    },
  },
  {
    id: "aegis-vault",
    number: "02",
    title: "AEGIS VAULT",
    positioning: "A zero-knowledge encrypted notepad.",
    emotion: "Encrypted in your browser — unreadable to the server.",
    atmosphere: "A password manager's security model, applied to notes.",
    capabilities: ["Argon2id + AES-256-GCM", "Envelope Encryption", "Zero-Knowledge"],
    tools: ["Next.js 16", "Supabase", "Web Crypto"],
    status: "Live",
    links: [{ label: "Open Live App", href: "https://aegisnote.houseofnamus.com/", variant: "primary" }],
    screenshots: [],
    dossierHref: "/projects/aegis-vault",
    coverImage: "/aegis-vault/cover.png",
    theme: {
      primaryAccent: "#8FE04E",
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(143,224,78,0.16), transparent 70%)",
    },
  },
  {
    id: "pixelville",
    number: "03",
    title: "PixelVille",
    positioning: "A self-governing pixel-art village that remembers.",
    emotion: "Its citizens have minds — they remember, decide, vote and rebuild.",
    atmosphere: "~11,700 lines of vanilla JS. Zero dependencies. Zero image assets.",
    capabilities: ["Knowledge · Memory · Minds", "Self-Governing Democracy", "Everything Procedural"],
    tools: ["Vanilla JS", "HTML5 Canvas", "WebAudio"],
    status: "Live",
    links: [{ label: "Explore PixelVille", href: "/games/pixelville", variant: "primary" }],
    screenshots: [],
    dossierHref: "/games/pixelville",
    coverImage: "/pixelville/Hero.png",
    theme: {
      primaryAccent: "#F5B94A",
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(245,185,74,0.16), transparent 70%)",
    },
  },
  {
    id: "pentacmd",
    number: "01",
    title: "PentaCMD-47M",
    positioning: "A 47M-parameter language model that speaks your terminal.",
    emotion: "English in. Commands out.",
    atmosphere: "From scratch. Built for developers.",
    capabilities: ["From-Scratch Transformer", "5 CLI Families", "~86.7% Exact-Match"],
    tools: ["PyTorch", "nanoGPT", "Kaggle T4"],
    status: "Live",
    links: [{ label: "View on GitHub", href: "https://github.com/Sumandebnath943/pentacmd", variant: "primary" }],
    screenshots: [],
    dossierHref: "/slms/pentacmd",
    coverImage: "/pentacmd-images/product1.png",
    theme: {
      primaryAccent: "#A78BFA",
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(167,139,250,0.15), transparent 70%)",
    },
  },
  {
    id: "qdex",
    number: "02",
    title: "Qdex-1.5B",
    positioning: "A 1.5B coding LLM that runs on your laptop.",
    emotion: "Taught to answer when asked — 1.2% → 39.0% on HumanEval.",
    atmosphere: "QLoRA fine-tune. CPU-only, no GPU.",
    capabilities: ["QLoRA Instruction-Tune", "Runs on 16GB CPU", "1.2% → 39.0% HumanEval"],
    tools: ["Qwen2.5-Coder", "Unsloth", "GGUF / Ollama"],
    status: "Live",
    links: [{ label: "View on GitHub", href: "https://github.com/Sumandebnath943/Qdex-1.5B", variant: "primary" }],
    screenshots: [],
    dossierHref: "/llms/qdex-1.5b",
    coverImage: "/qdex-images/cover.png",
    theme: {
      primaryAccent: "#34D399",
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(52,211,153,0.16), transparent 70%)",
    },
  },
  {
    id: "pentashell",
    number: "03",
    title: "Pentashell",
    positioning: "Plain English in. One safe terminal command out.",
    emotion: "One instruction. One command. Your approval.",
    atmosphere: "Local, no GPU. The CLI that wraps PentaCMD-47M.",
    capabilities: ["Approval-Gated Execution", "5 Command Families", "Names the Risk"],
    tools: ["Python", "PyTorch (CPU)", "rich"],
    status: "Live",
    links: [{ label: "View on GitHub", href: "https://github.com/Sumandebnath943/pentashell-cli", variant: "primary" }],
    screenshots: [],
    dossierHref: "/agents/pentashell",
    coverImage: "/pentashell/pentashell (2).png",
    theme: {
      primaryAccent: "#2FE2F0",
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(47,226,240,0.16), transparent 70%)",
    },
  },
  {
    id: "pact-agent",
    number: "04",
    title: "PACT Agent",
    positioning: "Trust-first local CLI coding agent.",
    emotion: "Permission. Action. Cost. Trust.",
    atmosphere: "Earned trust, not assumed trust.",
    capabilities: ["Permission Contracts", "Sandboxed Execution", "Independent Verifier"],
    tools: ["Python", "OpenRouter", "Ollama"],
    status: "Live",
    links: [{ label: "View on GitHub", href: "https://github.com/Sumandebnath943/pact-agent", variant: "primary" }],
    screenshots: [],
    dossierHref: "/agents/pact-agent",
    coverImage: "/pact-images/pact-terminal.png",
    theme: {
      primaryAccent: "#FF5500",
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,85,0,0.15), transparent 70%)",
    },
  },
  {
    id: "soul-canvas",
    number: "05",
    title: "Soul Canvas",
    positioning: "Your psyche, rendered as living particle art.",
    emotion: "A cinematic exploration of your psychological architecture.",
    atmosphere: "Generative, meditative, alive.",
    capabilities: ["Psychometric Mapping", "Generative 3D Art", "100k-Particle GPU Render"],
    tools: ["Three.js", "GLSL", "GSAP"],
    status: "Live",
    links: [{ label: "Launch Experience", href: "https://soulcanvas.houseofnamus.com/", variant: "primary" }],
    screenshots: [],
    dossierHref: "/fun-apps",
    coverImage: "/soul-canvas.png",
    theme: {
      primaryAccent: "#FF3D81",
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,61,129,0.15), transparent 70%)",
    },
  },
  {
    id: "design-museum",
    number: "06",
    title: "The Design Museum",
    positioning: "A walkable 3D portfolio museum, hosted by an AI guide.",
    emotion: "Step inside a gallery that greets you and talks back.",
    atmosphere: "Marble, light, presence.",
    capabilities: ["Walkable 3D Gallery", "AI Docent (Voice)", "150k-Particle Constellation"],
    tools: ["React Three Fiber", "Three.js", "Groq"],
    status: "Live",
    links: [{ label: "Enter Museum", href: "https://shraddhasonel.houseofnamus.com/", variant: "primary" }],
    screenshots: [],
    dossierHref: "/fun-apps",
    coverImage: "/shraddha-portfolio/museum-hero.png",
    theme: {
      primaryAccent: "#7AA2F7",
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(122,162,247,0.14), transparent 70%)",
    },
  },
  {
    id: "imprint",
    number: "07",
    title: "IMPRINT",
    positioning: "Behavioral cloning & identity preservation.",
    emotion: "A reckoning. A mirror held against AI dependency.",
    atmosphere: "Heavy, philosophical, cinematic.",
    capabilities: ["Identity Analysis", "Behavioral Cloning", "Sentience Testing"],
    tools: ["Next.js", "OpenAI", "Framer Motion"],
    status: "Live",
    links: [{ label: "Enter System", href: "https://imprint.houseofnamus.com", variant: "primary" }],
    screenshots: [],
    theme: {
      primaryAccent: "#FF4500", // Molten ember orange
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 69, 0, 0.15), transparent 70%)",
    },
  },
  {
    id: "legatus",
    number: "08",
    title: "LEGATUS",
    positioning: "Immutable digital inheritance.",
    emotion: "Security, permanence, legacy.",
    atmosphere: "Oppressive luxury.",
    capabilities: ["Inheritance Protocols", "Vault Storage", "Immutable Logs"],
    tools: ["Next.js", "Smart Contracts", "Postmark"],
    status: "Live",
    links: [{ label: "View Architecture", href: "https://legatus.houseofnamus.com", variant: "ghost" }],
    screenshots: [],
    theme: {
      primaryAccent: "#C5A059", // Muted gold
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(197, 160, 89, 0.12), transparent 70%)",
    },
  },
  {
    id: "cite",
    number: "09",
    title: "CITE",
    positioning: "Corporate tactical intelligence & entity extraction.",
    emotion: "Corporate tactical intelligence.",
    atmosphere: "Classified strategic command center.",
    capabilities: ["Market Surveillance", "Entity Extraction", "Knowledge Graphs"],
    tools: ["Python", "Neo4j", "GPT-4o"],
    status: "Live",
    links: [{ label: "Request Access", href: "https://cite.houseofnamus.com", variant: "primary" }],
    screenshots: [],
    theme: {
      primaryAccent: "#7B61FF", // Electric violet
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(123, 97, 255, 0.15), transparent 70%)",
    },
  },
  {
    id: "roasmind",
    number: "10",
    title: "ROASmind",
    positioning: "Next-generation autonomous operating system.",
    emotion: "The future.",
    atmosphere: "Mysterious next-generation operating system.",
    capabilities: ["Autonomous Orchestration", "Predictive Analytics", "Self-Healing Workflows"],
    tools: ["Next.js", "PostgreSQL", "Temporal"],
    status: "Coming Soon",
    links: [{ label: "Join Waitlist", href: "#roasmind", variant: "ghost" }],
    screenshots: [],
    theme: {
      primaryAccent: "#F5F5F7", // White/Silver
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 255, 255, 0.08), transparent 70%)",
    },
  },
  {
    id: "geek-collectibles",
    number: "11",
    title: "Geek Collectibles",
    positioning: "High-ticket collector commerce infrastructure.",
    emotion: "Akihabara at 2AM.",
    atmosphere: "Premium underground collector culture.",
    capabilities: ["High-Ticket Checkout", "Inventory Sync", "Vault Display"],
    tools: ["Shopify", "Liquid", "Next.js"],
    status: "Live",
    links: [{ label: "View Platform", href: "#geek", variant: "primary" }],
    screenshots: [],
    theme: {
      primaryAccent: "#FF003C", // Neon crimson
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 0, 60, 0.15), transparent 70%)",
    },
  },
  {
    id: "ember",
    number: "12",
    title: "EMBER",
    positioning: "Audio journaling & cognitive relief.",
    emotion: "Emotional safety and burnout recovery.",
    atmosphere: "Quiet warmth in darkness.",
    capabilities: ["Mood Tracking", "Audio Journaling", "Cognitive Relief"],
    tools: ["React Native", "Whisper", "Node.js"],
    status: "Live",
    links: [{ label: "Explore Project", href: "https://v0-meet-ember-ai.vercel.app", variant: "ghost" }],
    screenshots: [],
    theme: {
      primaryAccent: "#FF8C00", // Warm ember orange
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 140, 0, 0.12), transparent 70%)",
    },
  },
  {
    id: "d-pe",
    number: "13",
    title: "D-PE.ai",
    positioning: "God-Tier Prompt Engineering workspace.",
    emotion: "Precision, structure, hacker ethos.",
    atmosphere: "Premium hacker environment.",
    capabilities: ["Sarcastic Terminal", "Socratic Interview", "Reverse Engineer Mode"],
    tools: ["Next.js", "OpenAI", "Groq"],
    status: "Live",
    links: [{ label: "Access Workspace", href: "https://d-pe.houseofnamus.com/", variant: "primary" }],
    screenshots: [],
    theme: {
      primaryAccent: "#3fb950", // GitHub green
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(63, 185, 80, 0.15), transparent 70%)",
    },
  },
  {
    id: "forget-anything",
    number: "14",
    title: "Forget Anything?",
    positioning: "Never leave home without your essentials.",
    emotion: "The app that remembers, so you don't have to.",
    atmosphere: "Royal emerald & gold. Privacy-first.",
    capabilities: ["Wi-Fi + Geofence Triggers", "100% Offline", "Kotlin Foreground Service"],
    tools: ["React", "Capacitor", "Kotlin"],
    status: "Live",
    links: [{ label: "Open Landing Page", href: "/apps/forget-anything", variant: "primary" }],
    screenshots: [],
    dossierHref: "/apps/forget-anything",
    coverImage: "/forget-anything-app/Images/hero-wide.png",
    theme: {
      primaryAccent: "#50C878", // Royal emerald
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(80, 200, 120, 0.16), transparent 70%)",
    },
  },
];

// ── DECK GEOMETRY ─────────────────────────────────────────────────────────────
//
// Every number the sticky deck depends on lives here, because they are not
// independent — they have to sum to less than the viewport or later cards hang
// off the bottom. That is exactly what used to happen: cards were `84vh` tall
// and each one sat `8px` lower than the last, so a card only fit when
//   navClearance + index*8 + 0.84*vh <= vh
// which at 17 cards needs a 1400px-tall screen. Cards 10-17 overflowed on every
// real display.
//
// The fix is to spend a *fixed* budget instead of a per-card one:
//   • FAN_TOTAL is shared across the whole deck, so the fanned edges occupy the
//     same strip whether there are 5 projects or 50. Adding a project no longer
//     steals room from every card after it.
//   • Card height is derived from what is actually left over, so it fits by
//     construction, and is capped so it does not balloon into an empty void on
//     a tall monitor.
const NAV_CLEARANCE = 88; // room under the fixed pill nav
const FAN_TOTAL = 56; // total fanned-edge strip, divided across ALL cards
const BOTTOM_BREATH = 44; // gap kept below the pinned card
const CARD_MIN = 440;
const CARD_MAX = 660; // stops cards ballooning on a 1440p screen

// Cards used to sit flush in the flex column: stride between them was exactly
// card height, so the instant one pinned, the next card's top edge landed on its
// bottom edge with nothing between them. Two equally-bright panels touching read
// as one slab — the "stuck together" look. This gap keeps real background
// visible between a pinned card and the one climbing toward it.
const DECK_GAP = 28;

// Easing for the recede/arrive transitions. Linear interpolation is what made
// the movement feel mechanical.
const EASE_ENTER = cubicBezier(0.33, 1, 0.68, 1); // out-cubic: arrives, settles
const EASE_RECEDE = cubicBezier(0.65, 0, 0.35, 1); // in-out-cubic: eases both ends

const ENTER_SCALE = 0.96; // arriving card grows into place
const RECEDE_SCALE = 0.9; // covered card sinks back
const RECEDE_BRIGHTNESS = 0.5;

// Space a card can occupy once the nav, the fan and the bottom gap are paid for.
const CARD_HEIGHT = `clamp(${CARD_MIN}px, calc(100svh - ${
  NAV_CLEARANCE + FAN_TOTAL + BOTTOM_BREATH
}px), ${CARD_MAX}px)`;

// Once cards hit CARD_MAX there is slack left over, so centre the deck in the
// viewport rather than letting it sit high with dead space underneath. On short
// screens the max() floors this back to plain nav clearance.
const stickyTop = (fan: number) =>
  `calc(max(${NAV_CLEARANCE}px, (100svh - ${CARD_MAX}px) / 2) + ${fan.toFixed(2)}px)`;

// ── STACK CARD ────────────────────────────────────────────────────────────────

/** Measured deck geometry, used to phase the recede animation correctly. */
interface DeckGeometry {
  /** Layout distance between consecutive cards — card height plus DECK_GAP. */
  stride: number;
  /** Full scroll height of the deck. */
  deckH: number;
  /** Sticky top of card 0, which carries no fan offset. */
  baseTop: number;
  vh: number;
}

function StackCard({
  project,
  index,
  total,
  progress,
  geometry,
}: {
  project: ProjectData;
  index: number;
  total: number;
  progress: MotionValue<number>;
  geometry: DeckGeometry | null;
}) {
  const accent = project.theme.primaryAccent;
  const isLast = index === total - 1;
  const screenshot = SCREENSHOTS[project.id];

  // Share of the fixed fan strip. Divided across the deck, so the offset of the
  // last card is FAN_TOTAL no matter how many projects exist.
  const fan = total > 1 ? (index / (total - 1)) * FAN_TOTAL : 0;

  // As later cards rise to cover this one, recede it: scale + dim. The last
  // card never gets covered, so it stays at full size.
  //
  // The window has to be derived from real geometry, not from index/total.
  // `progress` runs over the deck's scrollable range, which is
  // deckHeight - viewportHeight — not the deck's full height — and each card
  // pins at `top` rather than at 0. Ignoring both put the recede a full
  // card-slice early: a card sat at brightness(0.5) and scale(0.9) while it was
  // still the card being read. Card i is covered exactly when the deck has been
  // scrolled by (i + 1) * stride - top.
  let start = index / total;
  let end = (index + 1) / total;
  let enter = start - 1 / total;
  if (geometry) {
    const range = geometry.deckH - geometry.vh;
    if (range > 0) {
      const top = geometry.baseTop + fan;
      // stride, not card height: the deck gap is part of the distance scrolled
      // between one card pinning and the next.
      start = (index * geometry.stride - top) / range;
      end = ((index + 1) * geometry.stride - top) / range;
      enter = start - geometry.stride / range;
    }
  }

  // Three stops, so each card has a full life: it grows in as it rises (ease
  // out), holds at rest while it is the card being read, then sinks back as the
  // next one climbs over it (ease in-out). Previously this was a single linear
  // ramp, which is why the movement felt mechanical.
  const scale = useTransform(
    progress,
    [enter, start, end],
    [ENTER_SCALE, 1, isLast ? 1 : RECEDE_SCALE],
    { clamp: true, ease: [EASE_ENTER, EASE_RECEDE] },
  );
  const brightnessVal = useTransform(
    progress,
    [enter, start, end],
    [1, 1, isLast ? 1 : RECEDE_BRIGHTNESS],
    { clamp: true, ease: [EASE_ENTER, EASE_RECEDE] },
  );
  const filter = useMotionTemplate`brightness(${brightnessVal})`;

  return (
    <m.div
      style={{
        top: stickyTop(fan),
        height: CARD_HEIGHT,
        scale,
        filter,
        zIndex: index + 1,
      }}
      className="sticky origin-top px-2 md:px-0"
    >
      <div
        // The outer shadow here is black-on-black (#050505 section, #0A0A0C
        // card) so it casts nothing and gave the stack no depth. The inset
        // highlight does the work instead: a lit top edge reads as a layer
        // boundary when one card overlaps another.
        className="h-full w-full overflow-hidden rounded-[1.75rem] border bg-[#0A0A0C] flex lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_-12px_40px_-12px_rgba(0,0,0,0.9),0_30px_120px_-30px_rgba(0,0,0,0.8)]"
        style={{ borderColor: `${accent}40` }}
      >
        {/* ── LEFT: system info (full card on mobile) ── */}
        <div className="relative flex flex-1 flex-col justify-center lg:justify-between gap-8 lg:gap-6 p-7 md:p-10 lg:p-12 2xl:p-14 lg:h-full overflow-hidden">
          {/* ambient accent glow */}
          <div
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-50"
            style={{ background: accent }}
          />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-mono text-xs tracking-[0.3em]"
                style={{ color: accent }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8" style={{ background: `${accent}80` }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#86868B]">
                {project.status}
              </span>
            </div>

            <h3 className="font-manrope font-semibold text-3xl md:text-4xl lg:text-[44px] 2xl:text-[52px] leading-[1.05] tracking-tight text-white mb-4">
              {project.title}
            </h3>

            <p className="font-serif italic text-base md:text-lg 2xl:text-xl text-white/70 leading-snug mb-3">
              {project.positioning}
            </p>
            <p className="font-manrope text-sm 2xl:text-base text-[#86868B] leading-relaxed max-w-md 2xl:max-w-lg">
              {project.emotion}
            </p>
          </div>

          <div className="relative space-y-5">
            {/* Capabilities */}
            <div className="flex flex-wrap gap-2">
              {project.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="font-manrope text-[11px] font-medium px-3 py-1.5 rounded-full border text-white/80"
                  style={{ borderColor: `${accent}33`, background: `${accent}12` }}
                >
                  {cap}
                </span>
              ))}
            </div>

            {/* Tools */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8A8A90]">
                Stack
              </span>
              {project.tools.map((tool) => (
                <span key={tool} className="font-mono text-[11px] text-[#86868B]">
                  {tool}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={project.links[0].href}
                target={project.links[0].href.startsWith("http") ? "_blank" : undefined}
                rel={project.links[0].href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium text-black transition-transform hover:scale-[1.02]"
                style={{ background: accent }}
              >
                {project.links[0].label}
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={project.dossierHref ?? `/projects/${project.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                Full Dossier
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT: tall landing-page screenshot, scrollable (desktop only) ── */}
        <div
          className="relative hidden lg:block lg:h-full border-l overflow-hidden bg-[#050505]"
          style={{ borderColor: `${accent}26` }}
        >
          {project.coverImage ? (
            <div className="relative h-full w-full flex items-center justify-center p-6 lg:p-7 overflow-hidden">
              {/* soft accent glow fills the slim margin around the framed image */}
              <div className="absolute inset-0 opacity-55 pointer-events-none" style={{ background: project.theme.glow }} />
              {/* max-h-full so a cover image can never push past the card's
                  fitted height on a short viewport — it crops instead. */}
              <div className="relative w-full max-h-full rounded-xl overflow-hidden border border-white/10 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.75)]">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} preview`}
                  width={1672}
                  height={941}
                  className="w-full h-auto block"
                  loading="lazy"
                  sizes="(max-width: 1024px) 0px, 50vw"
                />
              </div>
            </div>
          ) : screenshot ? (
            <>
              {/* top/bottom fade masks */}
              <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
              {/* scroll hint */}
              <div className="absolute top-3 right-3 z-20 pointer-events-none">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                  Landing page · scroll
                </span>
              </div>
              <div className="h-full overflow-y-auto overscroll-contain no-scrollbar scroll-smooth">
                <Image
                  src={screenshot}
                  alt={`${project.title} landing page`}
                  width={1920}
                  height={4000}
                  className="w-full h-auto"
                  loading="lazy"
                  unoptimized
                />
              </div>
            </>
          ) : (
            // No screenshot (e.g. ROASmind, Coming Soon) → styled placeholder
            <div className="h-full w-full flex flex-col items-center justify-center gap-4">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: accent }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
                Preview Coming Soon
              </span>
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

// useLayoutEffect warns during SSR; the deck renders fine without geometry on
// the first pass (it falls back to the index/total window), so defer on server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Projects() {
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  // Card height and sticky top are set in CSS (clamp/max against 100svh), so
  // they are measured rather than recomputed here — one source of truth. The
  // recede window is phased off these, and re-measured on resize because both
  // values are viewport-derived.
  const [geometry, setGeometry] = useState<DeckGeometry | null>(null);

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      const deck = deckRef.current;
      const first = deck?.children[0] as HTMLElement | undefined;
      if (!deck || !first) return;
      // Every value read here must be scroll-independent, because a resize can
      // fire while the reader is deep inside the deck. Do NOT derive stride from
      // two cards' offsetTop: a *pinned* sticky element reports its stuck
      // position, so mid-deck that returns the fan step (~4px) instead of the
      // real stride. offsetHeight and the computed gap/top are unaffected.
      const gap = parseFloat(getComputedStyle(deck).rowGap) || 0;
      setGeometry({
        stride: first.offsetHeight + gap,
        deckH: deck.offsetHeight,
        // card 0 carries no fan offset, so this is the deck's base top
        baseTop: parseFloat(getComputedStyle(first).top) || 0,
        vh: window.innerHeight,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <SectionWrapper id="projects" className="py-16 px-6 bg-[#050505] relative text-white" showLine={false}>
      <div className="absolute inset-0 bg-[#050505] -z-10" />

      {/* Widens past the usual 7xl cap on very large monitors so the deck fills
          the screen proportionally instead of sitting as a small island. */}
      <div className="max-w-7xl 2xl:max-w-[1520px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="text-[10px] font-mono text-[#86868B] uppercase tracking-widest mb-4">
            04 / Selected Systems
          </p>
          <h2 className="font-manrope font-semibold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 tracking-tight">
            These are not apps.
            <br />
            <span className="text-white/70">These are systems.</span>
          </h2>
          <p className="text-[#86868B] text-lg leading-relaxed max-w-lg">
            Intelligent ecosystems built around deep human problems. Scroll a
            card&apos;s landing page to explore it; scroll past for the next system.
          </p>
        </div>

        {/* Stacked card deck */}
        <div
          ref={deckRef}
          className="relative flex flex-col"
          style={{ gap: `${DECK_GAP}px` }}
        >
          {projects.map((project, i) => (
            <StackCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              geometry={geometry}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
