"use client";

import { useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import DossierMeta from "./DossierMeta";

const capabilities = [
  { title: "ISO Request System", desc: "Automated 'In Search Of' tracking across global secondary markets." },
  { title: "Franchise Worlds", desc: "Immersive, IP-specific browsing environments." },
  { title: "Grail System", desc: "Algorithmic matching for ultra-rare collector items." },
  { title: "Condition Grading", desc: "Standardized visual grading matrices for authenticity." },
  { title: "Admin Infrastructure", desc: "Complex inventory routing and multi-warehouse sync." },
  { title: "Multi-Currency Support", desc: "Real-time JPY to USD dynamic pricing." },
  { title: "Collector Marketplace", desc: "High-trust peer-to-peer trading infrastructure." },
];

export default function GeekCollectiblesDossier() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logoError, setLogoError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-[#1A000A] via-[#0D000A] to-[#0A0514] text-[#F5F5F7] overflow-hidden rounded-[2.5rem] border border-[#FF0033]/30 shadow-[0_30px_100px_-20px_rgba(255,0,51,0.3)]"
    >
      {/* ── AMBIENT ATMOSPHERE & TOKYO-NIGHT REFLECTIONS ── */}

      {/* Cinematic Neon Lighting */}
      <div className="absolute top-0 right-1/4 w-[70vw] h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,0,51,0.2)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[60vw] h-[1000px] bg-[radial-gradient(ellipse_at_left,rgba(0,229,255,0.15)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[80vw] h-[1000px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,0,102,0.15)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

      {/* Slow Moving Reflections */}
      <m.div
        animate={{ opacity: [0.3, 0.6, 0.3], x: [-50, 50, -50] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[30vw] h-[40vh] bg-[#FFD700]/[0.02] blur-[150px] pointer-events-none rounded-full"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28">
        {/* ── TOP LABEL ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="px-5 py-2 border border-[#FF0033]/20 rounded bg-[#FF0033]/[0.03] backdrop-blur-md flex items-center gap-3">
            <div className="w-1 h-3 bg-[#00E5FF] animate-pulse" />
            <p className="font-mono text-[10px] text-[#FF0033] uppercase tracking-[0.4em] ml-[0.4em]">
              Collector Commerce Ecosystem
            </p>
          </div>
        </m.div>

        {/* ── MAIN TITLE ── */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="relative flex flex-col items-center group">
            {/* Logo Atmospheric Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(255,0,51,0.2)_0%,transparent_70%)] blur-[60px] opacity-60 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            {!logoError ? (
              <div className="relative w-full max-w-[350px] md:max-w-[500px] h-24 md:h-36 mb-8 z-10 mix-blend-screen">
                <Image 
                  src="/tools/geekcollectibles_v2.png" 
                  alt="Geek Collectibles — high-ticket collector commerce ecosystem by Suman Debnath, sourcing authentic hobby culture directly from Japan"
                  fill 
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,0,51,0.3)]"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <h2 className="font-serif italic text-2xl sm:text-4xl md:text-8xl lg:text-9xl text-white tracking-tight mb-8 drop-shadow-[0_0_30px_rgba(255,0,51,0.2)] z-10 relative">
                Geek Collectibles
              </h2>
            )}
          </div>
          <p className="font-manrope text-lg md:text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed">
            A global collector ecosystem sourcing authentic hobby culture directly from Japan.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto mb-16 text-center relative py-12"
        >
          {/* Engraved Plaque Styling */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent" />

          <p className="font-serif italic text-2xl md:text-3xl text-white leading-relaxed mb-8">
            “Most collectible stores feel transactional.
          </p>
          <p className="font-manrope text-base md:text-lg text-[#86868B] leading-relaxed mb-8">
            Built by people selling products.
          </p>
          <p className="font-manrope text-base md:text-lg text-white/90 leading-relaxed">
            Geek Collectibles was built by someone who actually understands collector obsession.”
          </p>
        </m.div>

        {/* ── VIEWPORT ── */}
        <m.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl mx-auto mb-16 group"
        >
          {/* Cyberpunk Edge Glow */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-[#FF0033]/20 via-transparent to-[#00E5FF]/20 rounded-3xl blur-2xl opacity-60 transition-opacity duration-1000 group-hover:opacity-100 pointer-events-none" />
          
          <m.div 
            style={{ y }} 
            className="relative rounded-2xl overflow-hidden bg-[#0A0A0C] border border-white/[0.05] shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Cinematic Browser Chrome */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-[#050505]">
              <div className="flex gap-2 opacity-40">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF0033]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-white/[0.02] border border-[#FF0033]/10">
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
                  Geek - Coming Soon
                </span>
              </div>
              <div className="w-16" /> {/* Spacer for balance */}
            </div>

            {/* Scrollable Interior */}
            <div className="relative h-[500px] md:h-[700px] overflow-hidden bg-[#020202]">
              {/* Internal Fade Masks */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
              
              <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
                {/* Viewport content */}
                <div className="relative w-full">
                  {/* Tokyo-night ambient reflection inside viewport */}
                  <div className="absolute top-0 left-0 w-[50%] h-full bg-[radial-gradient(ellipse_at_left,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none z-10" />
                  <div className="absolute bottom-0 right-0 w-[50%] h-full bg-[radial-gradient(ellipse_at_right,rgba(255,0,51,0.05)_0%,transparent_70%)] pointer-events-none z-10" />
                  
                  <Image 
                    src="/screenshots/geekcollectibles.png"
                    alt="Geek Collectibles product interface — ISO request system, franchise worlds, grail tiers, condition grading, and multi-currency marketplace"
                    width={1920}
                    height={4000}
                    className="w-full h-auto relative"
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
            className="mb-12 border-b border-white/[0.05] pb-6"
          >
            <p className="font-mono text-[10px] text-[#00E5FF] uppercase tracking-[0.3em] mb-4">
              Infrastructure
            </p>
            <h3 className="font-serif italic text-3xl md:text-4xl text-white">
              Ecosystem Architecture
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
                className="group relative p-6 bg-white/[0.01] border border-white/[0.05] hover:border-[#FF0033]/40 transition-colors duration-500 cursor-default"
              >
                {/* Neon Hover Bar */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-[#FF0033] group-hover:h-1/2 transition-all duration-500 shadow-[0_0_10px_#FF0033]" />
                
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
          className="py-16 flex justify-center text-center"
        >
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-7xl text-white leading-tight">
            “For collectors,
            <br />
            the object is never
            <br />
            <span className="text-[#FF0033] not-italic">just the object.</span>”
          </h2>
        </m.div>

        <DossierMeta slug="geek-collectibles" />
      </div>
    </div>
  );
}
