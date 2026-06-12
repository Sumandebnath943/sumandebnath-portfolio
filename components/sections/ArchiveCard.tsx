"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
import { m } from "framer-motion";
import type { ArchiveProject } from "@/lib/archive-projects";

// ── STATUS PILL ────────────────────────────────────────────────────────────
function StatusPill({ status, accent }: { status: ArchiveProject["status"]; accent: string }) {
  const dotColor =
    status === "Live"
      ? "#3CCB7F"
      : status === "In Development"
      ? accent
      : status === "Active"
      ? "#3CCB7F"
      : status === "Stealth"
      ? accent
      : "#86868B";

  return (
    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-[10px] font-mono uppercase tracking-[0.25em] text-white/65">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: dotColor,
          boxShadow: status === "Live" || status === "Active" ? `0 0 8px ${dotColor}` : "none",
        }}
      />
      {status}
    </span>
  );
}

function PosterArea({ project }: { project: ArchiveProject }) {
  const [errored, setErrored] = useState(false);
  const hasPoster = !!project.poster && !errored;

  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#0A0A0C] border border-white/[0.06]">
      {hasPoster ? (
        <Image
          src={project.poster!}
          alt={`${project.name} — ${project.positioning}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        // Fallback: atmospheric gradient block tinted with the project's accent.
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${project.accent}22 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, ${
              project.accentB ?? project.accent
            }1A 0%, transparent 70%), #0A0A0C`,
          }}
        >
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Centered mark — fixed bounding box so square and wide logos scale evenly */}
          <div className="relative z-10 w-[200px] h-[100px] flex items-center justify-center opacity-85 mix-blend-screen">
            {project.logo ? (
              <Image
                src={project.logo}
                alt={`${project.name} logo`}
                fill
                sizes="200px"
                className="object-contain"
              />
            ) : (
              <p
                className="font-serif italic text-2xl md:text-3xl tracking-tight"
                style={{ color: project.accent }}
              >
                {project.name}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Soft accent edge glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          boxShadow: `inset 0 0 60px -10px ${project.accent}1F`,
        }}
      />
    </div>
  );
}

// ── LOGO BADGE (top-left of card content area) ─────────────────────────────
function LogoBadge({ project }: { project: ArchiveProject }) {
  const [errored, setErrored] = useState(false);
  if (!project.logo || errored) return null;

  return (
    <div className="relative h-8 w-32 mix-blend-screen opacity-90">
      <Image
        src={project.logo}
        alt={`${project.name} project mark`}
        fill
        sizes="128px"
        className="object-contain object-left"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

// ── D-PE FLIP BACK ─────────────────────────────────────────────────────────
function DpeLearningsBack({ accent, onFlipBack }: { accent: string; onFlipBack: () => void }) {
  const learnings = [
    { title: "RAG Architecture", desc: "Hybrid BM25 + Vector search indexing using pdf-parse & mammoth." },
    { title: "Token Optimization", desc: "Context window management during multi-step Socratic interviews and best-of-N tournaments." },
    { title: "Prompt Structure", desc: "Enforcing a rigorous 9-pillar architectural framework." },
    { title: "System Prompting", desc: "Engineered dual-purpose prompts for Socratic extraction and a Sarcasm Engine." },
    { title: "Reverse-Engineering", desc: "Methodologies to deduce exact prompts from AI outputs." },
    { title: "Responsible AI (Constitutional)", desc: "System checks outputs against a constitution for legal requirements; automatically detects and corrects any illegalities or breaches." },
    { title: "Self-Critic Learning", desc: "System generates 3-4 prompt variations and engages them in an internal tournament to critique and select the ultimate output." },
  ];

  return (
    <article
      className="group relative flex flex-col rounded-2xl bg-[#0A0A0C] border border-[#3fb950]/30 h-full overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -20%, ${accent}12 0%, transparent 60%)`,
      }}
    >
      <div className="flex items-center justify-between p-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#3fb950] shadow-[0_0_8px_#3fb950] animate-pulse" />
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#3fb950] font-semibold">Technical Learnings</h4>
        </div>
        <button
          onClick={onFlipBack}
          className="text-white/50 hover:text-white transition-colors p-1"
          aria-label="Close learnings"
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-5 flex-1 overflow-y-auto no-scrollbar">
        <ul className="space-y-4">
          {learnings.map((item, i) => (
            <li key={i} className="text-[13px] leading-relaxed">
              <span className="font-semibold text-white/90 font-manrope block mb-1">{item.title}</span>
              <span className="text-white/60 font-manrope">{item.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ── CARD FRONT ─────────────────────────────────────────────────────────────
function CardFront({ project, isLab, isDpe, onFlip }: { project: ArchiveProject; isLab: boolean; isDpe: boolean; onFlip?: () => void }) {
  return (
    <article
      className={`group relative flex flex-col rounded-2xl bg-[#0A0A0C] border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-white/[0.14] hover:-translate-y-px hover:bg-[#0C0C0F] h-full ${
        isLab ? "md:col-span-2" : ""
      }`}
      style={{
        backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -20%, ${project.accent}12 0%, transparent 60%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ boxShadow: `inset 0 0 0 1px ${project.accent}28` }}
      />
      <div className="p-4 md:p-5">
        <PosterArea project={project} />
      </div>
      <div className="px-5 md:px-6 pb-6 md:pb-7 flex flex-col gap-5 flex-1">
        <div className="flex items-center justify-between gap-4 min-h-[2.5rem]">
          {project.logo ? (
            <LogoBadge project={project} />
          ) : (
            <h3 className="font-manrope font-semibold text-white text-lg tracking-tight">{project.name}</h3>
          )}
          <StatusPill status={project.status} accent={project.accent} />
        </div>
        {project.logo && (
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40 -mt-2">{project.name}</p>
        )}
        <p className="font-serif italic text-xl md:text-2xl text-white/90 leading-snug">{project.positioning}</p>
        <p className="font-manrope text-[14px] md:text-[15px] text-white/65 leading-[1.75]">{project.description}</p>
        <div className="flex flex-col gap-3 pt-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">{project.type}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span key={s} className="font-manrope text-[11px] px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.02] text-white/55">
                {s}
              </span>
            ))}
          </div>
        </div>
        {project.miniItems && project.miniItems.length > 0 && (
          <div className="flex flex-col gap-2 pt-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">Selected experiments</p>
            <ul className="flex flex-wrap gap-1.5">
              {project.miniItems.map((item) => (
                <li key={item} className="font-manrope text-[11px] px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.015] text-white/55">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {project.flagshipNote && (
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">↻ {project.flagshipNote}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 mt-auto pt-4">
          {isDpe && onFlip && (
            <button
              onClick={onFlip}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto rounded-full bg-[#3fb950]/10 border border-[#3fb950]/30 text-[#3fb950] hover:bg-[#3fb950]/20 transition-colors text-[12px] font-semibold"
            >
              <Sparkles size={14} />
              View Project Learnings
            </button>
          )}
          {project.detailUrl && !isDpe && (
            <a
              href={project.detailUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.1] text-white/85 hover:bg-white/[0.14] hover:border-white/[0.2] transition-colors text-[12px] font-medium"
              style={{ borderColor: `${project.accent}44` }}
            >
              View on portfolio
            </a>
          )}
          {project.detailUrl && isDpe && (
            <a
              href={project.detailUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] text-white/70 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.04] transition-colors text-[12px] font-medium"
            >
              Dossier
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} live system in a new tab`}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.08] transition-colors text-[12px] font-medium ${isDpe ? 'text-white/70 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.04]' : 'text-white/70 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.04]'}`}
            >
              Open live
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ── MAIN CARD WRAPPER ──────────────────────────────────────────────────────
export default function ArchiveCard({ project }: { project: ArchiveProject }) {
  const isLab = project.kind === "lab";
  const isDpe = project.slug === "d-pe";
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isDpe) {
    return <CardFront project={project} isLab={isLab} isDpe={isDpe} />;
  }

  return (
    <div className={`relative [perspective:1000px] ${isLab ? "md:col-span-2" : ""}`}>
      <m.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div className="w-full h-full [backface-visibility:hidden]">
          <CardFront project={project} isLab={isLab} isDpe={isDpe} onFlip={() => setIsFlipped(true)} />
        </div>

        {/* BACK */}
        <div className="absolute top-0 left-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <DpeLearningsBack accent={project.accent} onFlipBack={() => setIsFlipped(false)} />
        </div>
      </m.div>
    </div>
  );
}
