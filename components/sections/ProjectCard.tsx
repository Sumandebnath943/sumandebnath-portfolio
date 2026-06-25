"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowUpRight, Lock } from "lucide-react";

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

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

function ScreenshotPlaceholder({ index }: { index: number }) {
  return (
    <div className="w-full h-[300px] flex-shrink-0 bg-[#050505] border-b border-[rgba(255,255,255,0.03)] flex items-center justify-center">
      <div className="text-center opacity-30">
        <div className="text-3xl mb-3">◈</div>
        <p className="text-xs font-mono tracking-widest">
          UI_FRAME_{index + 1}
        </p>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col lg:flex-row gap-12 xl:gap-20 items-center justify-between"
    >
      {/* ── AMBIENT GLOW ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] opacity-[0.15] blur-[100px] pointer-events-none rounded-full"
        style={{ background: project.theme.glow }}
      />

      {/* ── LEFT: Narrative Architecture ── */}
      <div className="flex-1 min-w-0 w-full z-10 lg:py-10">
        {/* Metadata Bar */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs text-[#86868B] tracking-widest">
            {project.number}
          </span>
          <div className="h-[1px] w-12 bg-white/[0.1]" />
          <span
            className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded border"
            style={{
              color: project.theme.primaryAccent,
              borderColor: `${project.theme.primaryAccent}40`,
              backgroundColor: `${project.theme.primaryAccent}10`,
            }}
          >
            {project.status.toUpperCase()}
          </span>
        </div>

        {/* Title & Positioning */}
        <div className="mb-10">
          <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-none tracking-tight">
            {project.title}
          </h3>
          <p className="font-manrope font-medium text-lg text-[#F5F5F7]">
            {project.positioning}
          </p>
        </div>

        {/* Emotional Narrative */}
        <div className="mb-12 border-l border-white/[0.15] pl-6">
          <p className="text-sm text-[#86868B] leading-relaxed mb-3">
            <span className="text-white font-medium">Emotion:</span> {project.emotion}
          </p>
          <p className="text-sm text-[#86868B] leading-relaxed">
            <span className="text-white font-medium">Atmosphere:</span> {project.atmosphere}
          </p>
        </div>

        {/* Tactical Grid (Capabilities & Stack) */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-[10px] font-mono text-[#86868B] uppercase tracking-widest mb-4">
              Capabilities
            </p>
            <ul className="space-y-2">
              {project.capabilities.map((cap, i) => (
                <li key={i} className="text-xs text-[#F5F5F7] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#86868B] uppercase tracking-widest mb-4">
              Architecture
            </p>
            <ul className="space-y-2">
              {project.tools.map((tool, i) => (
                <li key={i} className="text-xs text-[#F5F5F7] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-medium transition-all duration-300 ${
                link.variant === "primary"
                  ? "bg-white text-black hover:bg-[#F5F5F7] hover:scale-105"
                  : "border border-white/10 text-[#86868B] hover:text-white hover:border-white/30 hover:bg-white/5"
              }`}
            >
              {link.label}
              {project.status === "Classified" || project.status === "Coming Soon" ? (
                <Lock size={12} className="opacity-50" />
              ) : (
                <ArrowUpRight size={12} className="opacity-50" />
              )}
            </a>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Cinematic Viewport ── */}
      <div className="w-full lg:w-[500px] xl:w-[600px] flex-shrink-0 z-10">
        <div className="relative group">
          {/* Outer glow ring */}
          <div
            className="absolute -inset-0.5 rounded-[1.5rem] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700"
            style={{ background: project.theme.primaryAccent }}
          />
          
          {/* Hardware Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0C] border border-white/[0.08] shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            
            {/* Dark Mode Browser Chrome */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] bg-[#050505]">
              <div className="flex gap-1.5 opacity-30">
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[10px] font-mono text-white/30 tracking-wider">
                    {project.title.toLowerCase().replace(/\s+/g, "")}.system
                  </span>
                </div>
              </div>
            </div>

            {/* Inner scrollable viewport with gradient masks */}
            <div className="relative h-[480px] overflow-hidden">
              {/* Fade masks */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
              
              <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
                {project.status === "Coming Soon" || project.status === "Classified" ? (
                  <div className="h-full w-full flex flex-col items-center justify-center bg-[#050505]">
                    <Lock size={24} className="text-[#86868B] mb-4 opacity-50" />
                    <p className="text-xs font-mono tracking-widest text-[#86868B] uppercase">
                      Access Restricted
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {project.screenshots.length > 0
                      ? project.screenshots.map((src, i) => (
                          <div key={i} className="relative w-full border-b border-white/[0.02]">
                            <Image
                              src={src}
                              alt={`${project.title} view ${i + 1}`}
                              width={600}
                              height={400}
                              className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                          </div>
                        ))
                      : [0, 1, 2].map((i) => (
                          <ScreenshotPlaceholder key={i} index={i} />
                        ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Bottom accent line */}
            <div
              className="h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.theme.primaryAccent}80, transparent)`,
              }}
            />
          </div>
        </div>
      </div>
    </m.div>
  );
}
