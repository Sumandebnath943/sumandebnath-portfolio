"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ── ECOSYSTEM DATA ────────────────────────────────────────────────────────────

const ecosystems = [
  {
    id: "design-systems",
    index: "01",
    name: "Design Systems",
    description:
      "Visual systems, identity architecture, AI-assisted design workflows, and high-velocity creative production pipelines.",
    primary: ["Photoshop", "Illustrator", "Figma Make", "Claude Design", "GPT Image"],
    secondary: ["InDesign", "Canva", "DALL·E", "Adobe Firefly", "Stable Diffusion", "Nano Banana", "Seadance"],
    overflow: true,
    accent: "rgba(255,180,80,0.12)",
    borderAccent: "rgba(255,180,80,0.2)",
    labelColor: "text-[#C87820]",
    labelBg: "bg-[#C87820]/[0.08]",
    primaryChipBg: "bg-[#C87820]/[0.07]",
    primaryChipBorder: "border-[#C87820]/25",
    primaryChipText: "text-[#8C5010]",
    glow: "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(255,180,80,0.07), transparent)",
  },
  {
    id: "ai-llm",
    index: "02",
    name: "AI / LLM Ecosystem",
    description:
      "Multi-model orchestration across reasoning systems, creative generation, agentic workflows, and AI-native execution environments.",
    primary: ["ChatGPT", "Claude", "Gemini"],
    secondary: ["Wan", "DeepSeek", "LLaMA", "Grok"],
    overflow: true,
    accent: "rgba(123,97,255,0.15)",
    borderAccent: "rgba(123,97,255,0.25)",
    labelColor: "text-[#8B5CF6]",
    labelBg: "bg-[#7B61FF]/[0.08]",
    primaryChipBg: "bg-[#7B61FF]/[0.08]",
    primaryChipBorder: "border-[#7B61FF]/25",
    primaryChipText: "text-[#6D4FE0]",
    glow: "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(123,97,255,0.08), transparent)",
  },
  {
    id: "ai-product-engineering",
    index: "03",
    name: "AI Product Engineering",
    description:
      "Rapid AI-native product development through orchestrated engineering environments, vibe coding systems, and accelerated SaaS infrastructure.",
    primary: ["Claude Code", "Antigravity", "Codex", "Cursor", "Lovable"],
    secondary: ["V0 by Vercel", "Replit", "Emergent", "Bolt", "Rocket", "Anything"],
    overflow: true,
    accent: "rgba(0,229,255,0.1)",
    borderAccent: "rgba(0,229,255,0.2)",
    labelColor: "text-[#00B8CC]",
    labelBg: "bg-[#00E5FF]/[0.07]",
    primaryChipBg: "bg-[#00E5FF]/[0.07]",
    primaryChipBorder: "border-[#00E5FF]/20",
    primaryChipText: "text-[#007A8C]",
    glow: "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(0,229,255,0.06), transparent)",
  },
  {
    id: "technical-architecture",
    index: "04",
    name: "Technical Architecture",
    description:
      "Frontend systems, application architecture, state management, APIs, authentication, visualization layers, and modern web infrastructure.",
    primary: ["React", "Node.js", "TypeScript", "Next.js", "Prisma ORM"],
    secondary: ["Vite", "Tailwind CSS", "Zustand", "Framer Motion", "Express", "Recharts", "React Hook Form + Zod", "html2canvas", "NextAuth"],
    overflow: true,
    accent: "rgba(77,163,255,0.12)",
    borderAccent: "rgba(77,163,255,0.22)",
    labelColor: "text-[#4DA3FF]",
    labelBg: "bg-[#4DA3FF]/[0.08]",
    primaryChipBg: "bg-[#4DA3FF]/[0.06]",
    primaryChipBorder: "border-[#4DA3FF]/30",
    primaryChipText: "text-[#4DA3FF]",
    glow: "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(77,163,255,0.07), transparent)",
  },
  {
    id: "automation-systems",
    index: "05",
    name: "Automation Systems",
    description:
      "Cross-platform workflow orchestration, trigger automation, operational pipelines, and intelligent process infrastructure.",
    primary: ["Make.com", "n8n", "Zapier"],
    secondary: [],
    overflow: true,
    accent: "rgba(80,180,120,0.1)",
    borderAccent: "rgba(80,180,120,0.18)",
    labelColor: "text-[#50B478]",
    labelBg: "bg-[#50B478]/[0.08]",
    primaryChipBg: "bg-[#50B478]/[0.06]",
    primaryChipBorder: "border-[#50B478]/30",
    primaryChipText: "text-[#50B478]",
    glow: "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(80,180,120,0.05), transparent)",
  },
  {
    id: "growth-infrastructure",
    index: "06",
    name: "Growth Infrastructure",
    description:
      "Search, analytics, paid acquisition, visibility systems, and performance-driven growth operations.",
    primary: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
    secondary: ["Analytics", "SEO", "SEM"],
    overflow: true,
    accent: "rgba(220,100,60,0.1)",
    borderAccent: "rgba(220,100,60,0.18)",
    labelColor: "text-[#DC6440]",
    labelBg: "bg-[#DC6440]/[0.08]",
    primaryChipBg: "bg-[#DC6440]/[0.06]",
    primaryChipBorder: "border-[#DC6440]/30",
    primaryChipText: "text-[#DC6440]",
    glow: "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(220,100,60,0.06), transparent)",
  },
  {
    id: "deployment-infrastructure",
    index: "07",
    name: "Deployment & Infrastructure",
    description:
      "Hosting, backend services, deployment architecture, email systems, cloud infrastructure, and scalable operational environments.",
    primary: ["Vercel", "Supabase", "GitHub", "Railway"],
    secondary: ["Hostinger", "VPS", "Resend"],
    overflow: true,
    accent: "rgba(180,180,180,0.1)",
    borderAccent: "rgba(180,180,180,0.15)",
    labelColor: "text-[#888]",
    labelBg: "bg-white/[0.05]",
    primaryChipBg: "bg-white/[0.05]",
    primaryChipBorder: "border-white/[0.12]",
    primaryChipText: "text-white/60",
    glow: "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(180,180,180,0.05), transparent)",
  },
];

// ── ECOSYSTEM PANEL ───────────────────────────────────────────────────────────

function EcosystemPanel({
  eco,
  index,
}: {
  eco: (typeof ecosystems)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative group rounded-2xl border border-white/[0.07] overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #1A1A1A 0%, #111111 35%, #080808 100%)`,
        boxShadow: `0 4px 40px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Accent top border — the only identity signal */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, ${eco.borderAccent} 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 p-8 md:p-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className={`font-manrope text-[10px] tracking-[0.35em] ${eco.labelColor} ${eco.labelBg} px-2.5 py-1 rounded`}>
              {eco.index}
            </span>
            <h3 className="font-manrope font-semibold text-white text-base md:text-lg tracking-tight">
              {eco.name}
            </h3>
          </div>
          {eco.overflow && (
            <span className="font-manrope text-[10px] text-white/20 tracking-widest whitespace-nowrap mt-0.5">
              and more..
            </span>
          )}
        </div>

        {/* Description */}
        <p className="font-manrope text-sm text-white/45 leading-relaxed mb-8 max-w-lg">
          {eco.description}
        </p>

        {/* Primary tools — featured */}
        <div className="mb-5">
          <p className="font-manrope text-[9px] uppercase tracking-[0.4em] text-white/25 mb-3">
            Primary
          </p>
          <div className="flex flex-wrap gap-2">
            {eco.primary.map((tool) => (
              <span
                key={tool}
                className={`font-manrope text-xs font-medium px-3.5 py-1.5 rounded-lg border ${eco.primaryChipBg} ${eco.primaryChipBorder} ${eco.primaryChipText}`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Secondary tools — supporting */}
        {eco.secondary.length > 0 && (
          <div>
            <p className="font-manrope text-[9px] uppercase tracking-[0.4em] text-white/20 mb-3">
              Supporting
            </p>
            <div className="flex flex-wrap gap-1.5">
              {eco.secondary.map((tool) => (
                <span
                  key={tool}
                  className="font-manrope text-[11px] px-3 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-white/30"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </m.div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

export default function SystemsStack() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper
      id="systems"
      className="py-40 px-6 bg-[#050505] relative"
      showLine={false}
    >
      {/* Subtle top separator from white section above */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── HEADER ── */}
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 max-w-3xl"
        >
          <p className="font-manrope text-[10px] text-[#86868B] uppercase tracking-[0.4em] mb-6">
            03 / Operational Ecosystem
          </p>
          <h2 className="font-manrope font-semibold text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-8">
            Not a stack.
            <br />
            <span className="text-white/70">An orchestrated ecosystem.</span>
          </h2>
          <p className="font-manrope text-base md:text-lg text-[#86868B] leading-relaxed max-w-2xl">
            The systems, environments, models, and infrastructures powering AI-native execution — spanning design, intelligence, engineering, automation, and deployment.
          </p>
        </m.div>

        {/* ── ECOSYSTEM GRID ── */}
        {/* Large panels: 2 columns for most, full-width for the AI core */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* AI / LLM — Full width hero panel */}
          <div className="lg:col-span-2">
            <EcosystemPanel eco={ecosystems[1]} index={0} />
          </div>

          {/* Design Systems */}
          <EcosystemPanel eco={ecosystems[0]} index={1} />

          {/* AI Product Engineering */}
          <EcosystemPanel eco={ecosystems[2]} index={2} />

          {/* Technical Architecture — full width */}
          <div className="lg:col-span-2">
            <EcosystemPanel eco={ecosystems[3]} index={3} />
          </div>

          {/* Automation Systems */}
          <EcosystemPanel eco={ecosystems[4]} index={4} />

          {/* Growth Infrastructure */}
          <EcosystemPanel eco={ecosystems[5]} index={5} />

          {/* Deployment & Infrastructure — full width */}
          <div className="lg:col-span-2">
            <EcosystemPanel eco={ecosystems[6]} index={6} />
          </div>

        </div>

        {/* ── CLOSING STATEMENT ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 pt-12 border-t border-white/[0.05] flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <p className="font-manrope text-sm text-white/30 leading-relaxed max-w-lg">
            This is not someone casually using AI tools.
            <br />
            This is an operator orchestrating entire AI-native ecosystems.
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7B61FF]/60 animate-pulse" />
            <span className="font-manrope text-[10px] uppercase tracking-[0.4em] text-white/20">
              Continuously Evolving
            </span>
          </div>
        </m.div>

      </div>
    </SectionWrapper>
  );
}
