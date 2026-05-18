"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { ProjectData } from "./ProjectCard";
import ImprintDossier from "./ImprintDossier";
import CiteDossier from "./CiteDossier";
import LegatusDossier from "./LegatusDossier";
import RoasmindDossier from "./RoasmindDossier";
import GeekCollectiblesDossier from "./GeekCollectiblesDossier";
import EmberDossier from "./EmberDossier";

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

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-24 px-6 bg-[#050505] relative text-white" showLine={false}>
      {/* ── CLEAN CINEMATIC BACKGROUND ── */}
      <div className="absolute inset-0 bg-[#050505] -z-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-[10px] font-mono text-[#86868B] uppercase tracking-widest mb-4">
            04 / Selected Systems
          </p>
          <h2 className="font-manrope font-semibold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8 tracking-tight">
            These are not apps.
            <br />
            <span className="text-white/70">These are systems.</span>
          </h2>
          <p className="text-[#86868B] text-lg leading-relaxed max-w-lg">
            Intelligent ecosystems built around deep human problems. 
            Each one a distinct architecture within the same universe.
          </p>
        </div>

        {/* Project cards — Massive vertical spacing */}
        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, i) => {
            if (project.id === "imprint") {
              return <ImprintDossier key={project.id} />;
            }
            if (project.id === "legatus") {
              return <LegatusDossier key={project.id} />;
            }
            if (project.id === "cite") {
              return <CiteDossier key={project.id} />;
            }
            if (project.id === "roasmind") {
              return <RoasmindDossier key={project.id} />;
            }
            if (project.id === "geek-collectibles") {
              return <GeekCollectiblesDossier key={project.id} />;
            }
            if (project.id === "ember") {
              return <EmberDossier key={project.id} />;
            }
            return null;
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
