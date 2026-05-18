"use client";

import { useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import DossierMeta from "./DossierMeta";

// ── CAPABILITIES DATA ──
const capabilities = [
  { title: "Career Pivot Translator", desc: "Maps existing competencies to high-survivability AI roles." },
  { title: "Conversation Copilot", desc: "Real-time tactical scripts for high-stakes corporate interactions." },
  { title: "Job Security Radar", desc: "Predictive modeling of automation risk by sector and title." },
  { title: "Corporate Threat Meter", desc: "Sentiment analysis on internal restructuring communications." },
  { title: "Skill Half-Life Timeline", desc: "Calculates the exact obsolescence date of technical stacks." },
  { title: "Tactical Roleplay Engine", desc: "Voice-native negotiation and conflict simulation." },
  { title: "Unified Command Center", desc: "Centralized intelligence dashboard for career defense." },
];

export default function CiteDossier() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logoError, setLogoError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for the main viewport
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-[#050B14] via-[#0A051A] to-[#02050A] text-[#F5F5F7] overflow-hidden rounded-[2.5rem] border border-[#7C3AED]/30 shadow-[0_30px_100px_-20px_rgba(124,58,237,0.3)]"
    >
      {/* ── AMBIENT ATMOSPHERE & TELEMETRY ── */}

      {/* Volumetric Telemetry Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[80vw] h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(123,97,255,0.25)_0%,transparent_70%)] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[60vw] h-[1000px] bg-[radial-gradient(ellipse_at_right,rgba(0,229,255,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[80vw] h-[1000px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(123,97,255,0.2)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      {/* Subtle Radar Sweep */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none mix-blend-screen overflow-hidden">
        <m.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-[150vw] h-[150vw] rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #00E5FF 360deg)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28">
        {/* ── TOP LABEL ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="px-4 py-2 border border-[#00E5FF]/20 rounded bg-[#00E5FF]/[0.02] backdrop-blur-md flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <p className="font-mono text-[10px] text-[#00E5FF] uppercase tracking-[0.5em] ml-[0.5em]">
              Tactical Career Intelligence Engine
            </p>
          </div>
        </m.div>

        {/* ── MAIN TITLE ── */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="relative flex flex-col items-center group">
            {/* Logo Atmospheric Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(123,97,255,0.2)_0%,transparent_70%)] blur-[60px] opacity-60 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            {!logoError ? (
              <div className="relative w-full max-w-[480px] md:max-w-[700px] h-48 md:h-64 mb-8 z-10 mix-blend-screen">
                <Image 
                  src="/tools/cite_v2.png" 
                  alt="CITE — tactical career intelligence engine by Suman Debnath, with market surveillance, entity extraction, and knowledge graphs"
                  fill 
                  className="object-contain drop-shadow-[0_0_30px_rgba(123,97,255,0.3)] scale-100 md:scale-[1.5]"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <h2 className="font-serif italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight mb-8 drop-shadow-[0_0_30px_rgba(123,97,255,0.2)] z-10 relative">
                CITE
              </h2>
            )}
          </div>
          <p className="font-manrope text-lg md:text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed">
            A tactical operating system for professional survival in the AI era.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto mb-16 text-center relative py-12"
        >
          {/* Engraved Plaque Styling */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#FFB340]/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#FFB340]/40 to-transparent" />

          <p className="font-serif italic text-2xl md:text-3xl text-white leading-relaxed mb-8">
            “The corporate restructuring email never arrives with warning.
          </p>
          <p className="font-manrope text-base md:text-lg text-[#86868B] leading-relaxed mb-8">
            The role disappears quietly.<br />
            The industry shifts slowly.<br />
            The skill becomes irrelevant invisibly.
          </p>
          <p className="font-manrope text-base md:text-lg text-[#86868B] leading-relaxed">
            Most professionals realize it too late.<br />
            <span className="text-white mt-4 block">CITE was built for the moments before that happens.”</span>
          </p>
        </m.div>

        {/* ── VIEWPORT ── */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl mx-auto mb-16 group"
        >
          {/* Edge Glow */}
          <div className="absolute -inset-1 bg-gradient-to-b from-[#00E5FF]/20 via-[#7B61FF]/10 to-transparent rounded-3xl blur-2xl opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
          
          <m.div 
            style={{ y }} 
            className="relative rounded-2xl overflow-hidden bg-[#0A0D18] border border-[#00E5FF]/15 shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
          >
            {/* Cinematic Tactical Chrome */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#00E5FF]/10 bg-[#080B14]">
              <div className="flex gap-4 opacity-40">
                {/* Tactical scanner bars instead of macOS dots */}
                <div className="w-4 h-1 bg-[#00E5FF]" />
                <div className="w-4 h-1 bg-[#00E5FF]" />
                <div className="w-4 h-1 bg-[#7B61FF]" />
              </div>
              <div className="flex items-center gap-3 px-6 py-1.5 rounded-sm bg-[#00E5FF]/[0.02] border border-[#00E5FF]/10">
                <span className="text-[10px] font-mono text-[#00E5FF]/60 tracking-widest">
                  https://cite.houseofnamus.com
                </span>
              </div>
              <div className="w-16 flex justify-end opacity-30">
                {/* Deco elements */}
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-1 h-1 bg-white" />
                  <div className="w-1 h-1 bg-white" />
                  <div className="w-1 h-1 bg-white" />
                  <div className="w-1 h-1 bg-[#FFB340]" />
                </div>
              </div>
            </div>

            {/* Scrollable Interior */}
            <div className="relative h-[500px] md:h-[700px] overflow-hidden bg-[#05070D]">
              {/* Internal Fade Masks */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0A0D18] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0D18] to-transparent z-10 pointer-events-none" />
              
              <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
                {/* Viewport content */}
                <div className="relative w-full">
                  {/* Radar sweep inside the monitor for atmosphere */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none mix-blend-screen overflow-hidden rounded-xl">
                    <m.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-[100vw] h-[100vw] rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #00E5FF 360deg)'
                      }}
                    />
                  </div>

                  <Image 
                    src="/screenshots/cite.png"
                    alt="CITE product interface — career pivot translator, job security radar, and unified tactical command center"
                    width={1920}
                    height={4000}
                    className="w-full h-auto relative z-10"
                    unoptimized={true}
                  />
                </div>
              </div>
            </div>
          </m.div>
        </m.div>

        {/* ── CAPABILITIES SECTION ── */}
        <div className="mb-16">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 border-b border-[#00E5FF]/10 pb-6"
          >
            <p className="font-mono text-[10px] text-[#00E5FF] uppercase tracking-[0.3em] mb-4">
              Intelligence Modules
            </p>
            <h3 className="font-serif italic text-3xl md:text-4xl text-white">
              Tactical Architecture
            </h3>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-6 bg-[#00E5FF]/[0.02] border border-[#00E5FF]/10 hover:border-[#7B61FF]/40 hover:bg-[#7B61FF]/[0.03] transition-colors duration-500 cursor-default"
              >
                {/* Tactical corner accents */}
                <div className="absolute top-0 left-0 w-2 h-[1px] bg-[#00E5FF]/50 group-hover:bg-[#7B61FF] transition-colors duration-500" />
                <div className="absolute top-0 left-0 w-[1px] h-2 bg-[#00E5FF]/50 group-hover:bg-[#7B61FF] transition-colors duration-500" />
                
                <h4 className="font-manrope font-medium text-white text-sm mb-3">
                  {cap.title}
                </h4>
                <p className="text-xs text-[#86868B] leading-relaxed">
                  {cap.desc}
                </p>
              </m.div>
            ))}
          </div>
        </div>

        {/* ── EMOTIONAL STATEMENT ── */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="py-32 flex justify-center text-center relative"
        >
          {/* Subtle crosshair behind the text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-[#00E5FF]/10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#00E5FF]/10 pointer-events-none" />

          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-7xl text-white leading-tight relative z-10">
            “Professional survival
            <br />
            <span className="text-[#FFB340]">is no longer passive.</span>”
          </h2>
        </m.div>

        <DossierMeta slug="cite" />
      </div>
    </div>
  );
}
