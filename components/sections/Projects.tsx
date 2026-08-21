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
  /** Line under the redacted panel when there is no preview to show. Keep it a
   *  checkable fact — "Preview coming soon" is not one. */
  previewNote?: string;
  theme: {
    primaryAccent: string;
    glow: string;
  };
}

// Tall landing-page screenshots shown (scrollable) in each card's right
// window. ROASmind has no screenshot yet (Coming Soon) → styled placeholder.
//
// **Only genuinely tall captures belong here.** This branch renders into an
// `overflow-y-auto` box, which top-aligns its content — correct for a 1366×12096
// page capture, wrong for anything that fits. `ember.png` (1536×864) and
// `d-pe.png` (1672×941) are ordinary 16:9 landscape shots and sat in this map by
// mistake: they pinned to the top of the panel with ~128px of void beneath, under
// a "Landing page · scroll" badge and fade masks, in a box that could not scroll.
// They are `coverImage` entries now, which centres them like every other
// landscape shot. Aspect ratios currently in this map run 0.11 to 0.53 — if a new
// one is anywhere near 1, it belongs on `coverImage` instead.
const SCREENSHOTS: Record<string, string> = {
  imprint: "/screenshots/imprint.png",
  legatus: "/screenshots/legatus.png",
  cite: "/screenshots/cite.png",
  "geek-collectibles": "/screenshots/geekcollectibles.png",
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
    // Shortened from "Knowledge · Memory · Minds" / "Self-Governing Democracy" /
    // "Everything Procedural". At 375px each of those was too wide to share a
    // row, so the chips took three rows — 111px — and made PixelVille the
    // tallest card in the deck at 567px, which is what set the floor for every
    // card's height. Two rows instead: **111px → 71px, card 567 → 527**.
    //
    // The prose lines were the obvious suspect and were measured first: the
    // `emotion` line renders at 46px whether it is 66 characters or 39, because
    // it wraps to two lines either way. Cutting it saves nothing. The chips were
    // the whole difference.
    capabilities: ["Memory · Minds", "Self-Governing", "Fully Procedural"],
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
    previewNote: "200,000+ lines of orchestrated architecture — not ready to be seen.",
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
    // 1536×864 — a landscape shot, not a page capture. See SCREENSHOTS above.
    coverImage: "/screenshots/ember.png",
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
    // 1672×941 — a landscape shot, not a page capture. See SCREENSHOTS above.
    coverImage: "/screenshots/d-pe.png",
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
// The fix is to spend a *fixed* budget instead of a per-card one: card height is
// derived from what is actually left over, so it fits by construction, and is
// capped so it does not balloon into an empty void on a tall monitor.
//
// ── There is no fan any more ──
// Every card pins at exactly the same `top`, so each one lands precisely on the
// last and nothing of the previous card shows above it.
//
// There used to be a FAN_TOTAL of 56px spread across the deck to leave a stack
// of edges visible at the top. It was right when this deck held eight cards —
// 7px each reads as a card behind a card. At seventeen it divides down to
// **3.5px each**, which is under the width where an edge reads as depth at all:
// on a phone the seventeen edges blur into a single multicoloured band that
// looks like a rendering fault rather than a stack. Removing it is what makes
// the deck read as one card at a time.
//
// Its 56px went back into CARD_HEIGHT, since the only reason that budget was
// reserved was to keep the fanned edges clear of the card.
const NAV_CLEARANCE = 88; // room under the fixed pill nav
const BOTTOM_BREATH = 44; // gap kept below the pinned card
const CARD_MIN = 440;

// Two ceilings, because the two layouts hold genuinely different amounts.
//
// Below lg the card IS the left column — stacked, `justify-center`, and at 375px
// the copy wraps hard: PixelVille's needs **567px**. The left column is
// `overflow-hidden`, so a ceiling under that silently cuts the text off.
//
// From lg the card is two columns side by side, and the same content needs only
// **455px**. At the old shared 660 that left ~170px of slack, which
// `justify-between` spent as a hole in the middle of the left column and
// `items-center` spent as ~118px of dead panel above and below a 16:9 image.
// Both are what "too tall" looks like. Measured, not guessed — see the deck
// audit in PAGE_OPTIMIZATION §3.5.
const CARD_MAX = 660; // below lg
const CARD_MAX_LG = 500; // lg+ — 455 of content plus room to breathe

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

// The recede dim used to be `filter: brightness(RECEDE_BRIGHTNESS)` on the card.
// It is now a black scrim at this opacity, which is the SAME PICTURE and a very
// different cost — see the scrim in StackCard for why.
//   brightness(k) → c·k
//   black at α over c → c·(1-α) + 0·α = c·(1-α)
// so α = 1 - k renders identically.
const RECEDE_SCRIM = 1 - RECEDE_BRIGHTNESS;

// Space a card can occupy once the nav and the bottom gap are paid for.
// Height and sticky top both depend on the ceiling, and the ceiling is now
// breakpoint-dependent — so they are CSS custom properties rather than inline
// strings. It has to be a media query and not a JS breakpoint read: measuring
// the viewport on the client would mismatch the server render, and would have to
// re-run on every resize, which is exactly the mid-scroll churn the resize
// handler below already works to avoid.
//
// Once cards hit the ceiling there is slack left over, so the top centres the
// deck in the viewport rather than letting it sit high with dead space
// underneath. On short screens the max() floors it back to plain nav clearance.
//
// `--deck-top` is one value for the whole deck — this is what makes every card
// land on the same spot. Give it a per-card offset and the fan is back.
const DECK_VARS = `
#projects{
  --deck-card-h: clamp(${CARD_MIN}px, calc(100svh - ${
    NAV_CLEARANCE + BOTTOM_BREATH
  }px), ${CARD_MAX}px);
  --deck-top: max(${NAV_CLEARANCE}px, (100svh - ${CARD_MAX}px) / 2);
}
@media (min-width: 1024px){
  #projects{
    --deck-card-h: clamp(${CARD_MIN}px, calc(100svh - ${
      NAV_CLEARANCE + BOTTOM_BREATH
    }px), ${CARD_MAX_LG}px);
    --deck-top: max(${NAV_CLEARANCE}px, (100svh - ${CARD_MAX_LG}px) / 2);
  }
}`;

const CARD_HEIGHT = "var(--deck-card-h)";
const STICKY_TOP = "var(--deck-top)";

// ── STACK CARD ────────────────────────────────────────────────────────────────

/** Measured deck geometry, used to phase the recede animation correctly. */
interface DeckGeometry {
  /** Layout distance between consecutive cards — card height plus DECK_GAP. */
  stride: number;
  /** Full scroll height of the deck. */
  deckH: number;
  /** The sticky top every card pins at. */
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
      // Every card shares this top now that there is no per-card fan offset.
      const top = geometry.baseTop;
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
  // Coverage of the black scrim that dims a covered card — the recede
  // "brightness" expressed as opacity rather than as a filter.
  //
  // Driven as `background-color` alpha, NOT as the element's `opacity`.
  // Animating `opacity` promotes every one of these overlays to its own
  // compositing layer, and seventeen of those stacked over seventeen cards
  // that a filter is no longer flattening was enough to take the renderer
  // out entirely — the page died before first paint. An alpha in the colour
  // repaints one solid rounded rect and promotes nothing.
  const scrimColor = useMotionTemplate`rgba(0, 0, 0, ${useTransform(
    progress,
    [enter, start, end],
    [0, 0, isLast ? 0 : RECEDE_SCRIM],
    { clamp: true, ease: [EASE_ENTER, EASE_RECEDE] },
  )})`;

  return (
    <m.div
      style={{
        top: STICKY_TOP,
        height: CARD_HEIGHT,
        scale,
        zIndex: index + 1,
      }}
      className="sticky origin-top px-2 md:px-0"
    >
      {/* Wrapper exists so the scrim can overlay the card *including* its 1px
          accent border, which an `inset-0` child of the clipped card cannot
          reach. It adds no box of its own — it matches the card exactly. */}
      <div className="relative h-full w-full">
      <div
        // Only the inset highlight is kept. The two outer shadows this used to
        // carry were black-on-black (#050505 section, #0A0A0C card) so they
        // cast nothing — but a 40px and a 120px blur still had to be
        // rasterised, seventeen times, every frame of the deck. Cost with no
        // picture. The lit top edge is what actually reads as a layer boundary
        // when one card overlaps another, and it is free.
        className="h-full w-full overflow-hidden rounded-[1.75rem] border bg-[#0A0A0C] flex lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]"
        style={{ borderColor: `${accent}40` }}
      >
        {/* ── LEFT: system info (full card on mobile) ── */}
        <div className="relative flex flex-1 flex-col justify-center lg:justify-between gap-8 lg:gap-6 p-7 md:p-10 lg:p-12 2xl:p-14 lg:h-full overflow-hidden">
          {/* Ambient accent glow. Drawn as a radial gradient, NOT as a solid
              disc under `blur-[100px]`. Same soft bloom; a gradient is one
              Skia draw, while the blur forced a separate render surface and a
              200px-wide kernel per card. Seventeen of those, live, was a large
              part of what made this deck tear on a phone. */}
          <div
            className="absolute -top-64 -left-64 w-[36rem] h-[36rem] pointer-events-none"
            style={{
              background: `radial-gradient(closest-side, ${accent}47 0%, ${accent}2E 28%, ${accent}14 50%, ${accent}00 72%)`,
            }}
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
            // No screenshot yet (ROASmind) → a *withheld* preview rather than a
            // missing one. The old version was a dot and the words "Preview
            // Coming Soon" floating in an empty panel, which read as a gap in the
            // page. This draws the shape of the interface with its content
            // redacted, so the panel has the same visual weight as the sixteen
            // screenshots around it and the absence looks deliberate.
            //
            // Everything here is a gradient, a border or a solid — no `blur()`.
            // This panel sits in the same deck as the rest, and a blur surface
            // per card is precisely what was taken out of it.
            <div className="relative h-full w-full overflow-hidden">
              {/* blueprint grid */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                }}
              />
              <div
                className="absolute inset-0 opacity-60 pointer-events-none"
                style={{ background: project.theme.glow }}
              />

              <div className="relative h-full w-full flex flex-col items-center justify-center gap-6 p-8 lg:p-10">
                {/* The redacted interface */}
                <div
                  className="w-full max-w-[300px] rounded-xl border bg-black/40 p-4 space-y-3"
                  style={{ borderColor: `${accent}1F` }}
                >
                  <div className="flex items-center gap-1.5 pb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  </div>
                  <div className="h-2 w-2/5 rounded-full bg-white/[0.14]" />
                  <div className="h-14 w-full rounded-md bg-white/[0.05]" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-8 rounded-md bg-white/[0.05]" />
                    <div className="h-8 rounded-md bg-white/[0.05]" />
                    <div className="h-8 rounded-md bg-white/[0.05]" />
                  </div>
                  <div className="h-2 w-3/5 rounded-full bg-white/[0.09]" />
                </div>

                <div className="flex items-center gap-2.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ background: accent }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
                    In stealth
                  </span>
                </div>

                {project.previewNote && (
                  <p className="font-mono text-[10px] leading-relaxed text-center text-white/55 max-w-[270px]">
                    {project.previewNote}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

        {/* The recede dim. This was `filter: brightness()` on the sticky
            element, which is the same picture at a wildly different price: a
            filter forces the browser to render the WHOLE card subtree into an
            offscreen surface, filter it, then composite it — every frame, for
            each of the nine cards on screen at once. On a phone the rasteriser
            could not keep up, and Chrome presented what it had: tiles from the
            previous scroll offset next to tiles from the current one, which is
            why titles appeared twice with a seam between them.

            A black scrim at (1 - brightness) is arithmetically identical
            (c·k ≡ c·(1-α) with α = 1-k) but it is one solid rounded rect on
            the compositor, and the card underneath needs no surface at all. */}
        <m.div
          aria-hidden
          style={{ backgroundColor: scrimColor }}
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
        />
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
    let raf = 0;
    const measure = () => {
      const deck = deckRef.current;
      const first = deck?.children[0] as HTMLElement | undefined;
      if (!deck || !first) return;
      // Every value read here must be scroll-independent, because a resize can
      // fire while the reader is deep inside the deck. Do NOT derive stride from
      // two cards' offsetTop: a *pinned* sticky element reports its stuck
      // position, and every card is now pinned at the SAME top, so mid-deck that
      // subtraction returns 0 rather than the real stride — it was already wrong
      // when the fan made it return ~4px. offsetHeight and the computed gap/top
      // are unaffected.
      const gap = parseFloat(getComputedStyle(deck).rowGap) || 0;
      const next: DeckGeometry = {
        stride: first.offsetHeight + gap,
        deckH: deck.offsetHeight,
        // every card shares this top, so card 0's is the deck's
        baseTop: parseFloat(getComputedStyle(first).top) || 0,
        vh: window.innerHeight,
      };
      // Bail on a no-op. Re-rendering seventeen cards rebuilds thirty-four
      // MotionValues, and on a phone this handler fires far more than it looks
      // like it should: hiding and showing the URL bar is a `resize`, so simply
      // scrolling the deck retriggers it over and over, mid-scroll.
      setGeometry((prev) =>
        prev &&
        prev.stride === next.stride &&
        prev.deckH === next.deckH &&
        prev.baseTop === next.baseTop &&
        prev.vh === next.vh
          ? prev
          : next,
      );
    };
    // Coalesce a burst of resize events (the URL-bar slide emits a stream of
    // them) into one measurement on the next frame.
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <SectionWrapper id="projects" className="py-16 px-6 bg-[#050505] relative text-white" showLine={false}>
      <style dangerouslySetInnerHTML={{ __html: DECK_VARS }} />
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
