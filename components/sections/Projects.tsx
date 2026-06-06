"use client";

import { useRef } from "react";
import {
  m,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ProjectData } from "./ProjectCard";

// Tall landing-page screenshots shown (scrollable) in each card's right
// window. ROASmind has no screenshot yet (Coming Soon) → styled placeholder.
const SCREENSHOTS: Record<string, string> = {
  imprint: "/screenshots/imprint.png",
  legatus: "/screenshots/legatus.png",
  cite: "/screenshots/cite.png",
  "geek-collectibles": "/screenshots/geekcollectibles.png",
  ember: "/screenshots/ember.png",
};

const projects: ProjectData[] = [
  {
    id: "imprint",
    number: "01",
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
    number: "02",
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
    number: "03",
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
    number: "04",
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
    number: "05",
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
    number: "06",
    title: "EMBER",
    positioning: "Audio journaling & cognitive relief.",
    emotion: "Emotional safety and burnout recovery.",
    atmosphere: "Quiet warmth in darkness.",
    capabilities: ["Mood Tracking", "Audio Journaling", "Cognitive Relief"],
    tools: ["React Native", "Whisper", "Node.js"],
    status: "Live",
    links: [{ label: "Explore Project", href: "https://ember.houseofnamus.com", variant: "ghost" }],
    screenshots: [],
    theme: {
      primaryAccent: "#FF8C00", // Warm ember orange
      glow: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 140, 0, 0.12), transparent 70%)",
    },
  },
];

// ── STACK CARD ────────────────────────────────────────────────────────────────

function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: ProjectData;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const accent = project.theme.primaryAccent;
  const isLast = index === total - 1;
  const screenshot = SCREENSHOTS[project.id];

  // As later cards rise to cover this one, recede it: scale + dim. The last
  // card never gets covered, so it stays at full size.
  const start = index / total;
  const end = (index + 1) / total;
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.9], {
    clamp: true,
  });
  const brightnessVal = useTransform(progress, [start, end], [1, isLast ? 1 : 0.5], {
    clamp: true,
  });
  const filter = useMotionTemplate`brightness(${brightnessVal})`;

  return (
    <m.div
      style={{
        top: `${96 + index * 8}px`,
        scale,
        filter,
        zIndex: index + 1,
      }}
      className="sticky h-[78vh] lg:h-[84vh] min-h-[480px] origin-top px-2 md:px-0"
    >
      <div
        className="h-full w-full overflow-hidden rounded-[1.75rem] border bg-[#0A0A0C] flex lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] shadow-[0_30px_120px_-30px_rgba(0,0,0,0.8)]"
        style={{ borderColor: `${accent}40` }}
      >
        {/* ── LEFT: system info (full card on mobile) ── */}
        <div className="relative flex flex-1 flex-col justify-center lg:justify-between gap-8 lg:gap-6 p-7 md:p-10 lg:p-12 lg:h-full overflow-hidden">
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
                {project.number}
              </span>
              <span className="h-px w-8" style={{ background: `${accent}80` }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#86868B]">
                {project.status}
              </span>
            </div>

            <h3 className="font-manrope font-semibold text-3xl md:text-4xl lg:text-[44px] leading-[1.05] tracking-tight text-white mb-4">
              {project.title}
            </h3>

            <p className="font-serif italic text-base md:text-lg text-white/70 leading-snug mb-3">
              {project.positioning}
            </p>
            <p className="font-manrope text-sm text-[#86868B] leading-relaxed max-w-md">
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
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#5A5A5E]">
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
                href={`/projects/${project.id}`}
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
          {screenshot ? (
            <>
              {/* top/bottom fade masks */}
              <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
              {/* scroll hint */}
              <div className="absolute top-3 right-3 z-20 pointer-events-none">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/45 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
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
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
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

export default function Projects() {
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  return (
    <SectionWrapper id="projects" className="py-16 px-6 bg-[#050505] relative text-white" showLine={false}>
      <div className="absolute inset-0 bg-[#050505] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
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
        <div ref={deckRef} className="relative flex flex-col">
          {projects.map((project, i) => (
            <StackCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
