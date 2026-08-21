"use client";

import { useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import DossierMeta from "./DossierMeta";

export default function RoasmindDossier() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logoError, setLogoError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for the main viewport
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-[#120D00] via-[#0A0701] to-[#050300] text-[#F5F5F7] overflow-hidden rounded-[2.5rem] border border-[#F4A300]/30 shadow-[0_30px_100px_-20px_rgba(244,163,0,0.3)]"
    >
      {/* ── AMBIENT ATMOSPHERE & LIGHTING ── */}
      
      {/* Architectural Edge Lighting */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F4A300]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Saffron Volumetric Glows */}
      <m.div 
        style={{ opacity }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(244,163,0,0.2)_0%,transparent_60%)] blur-[100px] pointer-events-none" 
      />
      <div className="absolute top-0 right-0 w-[60vw] h-[1000px] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[70vw] h-[800px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(244,163,0,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28">
        {/* ── TOP LABEL ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-12"
        >
          <div className="px-5 py-2 border border-white/[0.05] rounded-full bg-white/[0.01] backdrop-blur-md flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F4A300] animate-pulse" />
            <p className="font-mono text-[9px] text-white/50 uppercase tracking-[0.5em] ml-[0.5em]">
              Currently Under Development
            </p>
          </div>
        </m.div>

        {/* ── MAIN TITLE ── */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="relative flex flex-col items-center group">
            {/* Logo Atmospheric Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(244,163,0,0.15)_0%,transparent_70%)] blur-[60px] opacity-60 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            {!logoError ? (
              <div className="relative w-full max-w-[320px] md:max-w-[480px] h-32 md:h-48 mb-8 z-10">
                <Image 
                  src="/tools/roasmind.png" 
                  alt="ROASmind — next-generation AI-native operating system by Suman Debnath, 200,000+ lines of orchestrated architecture currently in stealth"
                  fill 
                  className="object-contain drop-shadow-[0_0_40px_rgba(244,163,0,0.2)]"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <h2 className="font-serif italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter mb-10 drop-shadow-[0_0_40px_rgba(244,163,0,0.15)] z-10 relative">
                ROAS<span className="font-sans font-light tracking-tight text-white/90">mind</span>
              </h2>
            )}
          </div>
          <p className="font-manrope text-lg md:text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed">
            A next-generation AI-native operating system currently being built in stealth.
          </p>
        </m.div>

        {/* ── CONCEALED VIEWPORT ── */}
        <m.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl mx-auto mb-20 group"
        >
          {/* Heavy Saffron Backlight Bloom */}
          <div className="absolute -inset-10 bg-gradient-to-b from-[#F4A300]/10 via-transparent to-transparent rounded-[3rem] blur-3xl opacity-50 transition-opacity duration-1000 group-hover:opacity-100 pointer-events-none" />
          
          <m.div 
            style={{ y }} 
            className="relative rounded-2xl overflow-hidden bg-[#0A0A0C] border border-white/[0.03] shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Minimalist Stealth Chrome */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.02] bg-[#050505]">
              <div className="flex gap-2 opacity-10">
                <div className="w-3 h-3 rounded-full bg-white" />
                <div className="w-3 h-3 rounded-full bg-white" />
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded bg-black border border-white/[0.05]">
                <span className="text-[10px] font-mono text-white/30 tracking-widest">
                  ROASmind - Coming Soon
                </span>
              </div>
              <div className="w-16" /> {/* Spacer for balance */}
            </div>

            {/* Redacted interior.
                This used to be a fake UI at opacity-20 sitting under a
                `backdrop-blur-2xl` scrim, with a padlock and the words COMING
                SOON — a stock "locked content" treatment that said nothing about
                the product. It now shows the *shape* of the system with its
                contents struck out, which is the honest picture: the thing
                exists, it is large, and none of it is being shown yet. Matches
                the redacted panel on the homepage card. */}
            <div className="relative h-[400px] md:h-[600px] overflow-hidden bg-[#020202]">
              {/* blueprint grid */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />

              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
                <div className="w-full max-w-md rounded-xl border border-[#F4A300]/15 bg-black/50 p-5 md:p-6 space-y-4">
                  <div className="flex items-center gap-1.5 pb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  </div>
                  <div className="h-2.5 w-2/5 rounded-full bg-white/[0.14]" />
                  <div className="h-20 md:h-24 w-full rounded-md bg-white/[0.05]" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-12 rounded-md bg-white/[0.05]" />
                    <div className="h-12 rounded-md bg-white/[0.05]" />
                    <div className="h-12 rounded-md bg-white/[0.05]" />
                  </div>
                  <div className="h-2.5 w-3/5 rounded-full bg-white/[0.09]" />
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F4A300] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/70">
                    In stealth
                  </span>
                </div>
                <p className="mt-4 font-mono text-[11px] text-center text-white/45 max-w-sm leading-relaxed">
                  200,000+ lines of orchestrated architecture — not ready to be seen.
                </p>
              </div>

              {/* Top and Bottom Fade Masks */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-20" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
            </div>
          </m.div>
        </m.div>

        {/* ── NARRATIVE BLOCK ── */}
        <div className="max-w-2xl mx-auto mb-20 flex flex-col items-center text-center gap-16 relative">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif italic text-2xl md:text-3xl text-white leading-relaxed">
              “Some systems are built to solve problems.
            </p>
          </m.div>
          
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif italic text-2xl md:text-3xl text-white leading-relaxed">
              Others are built to redefine the environments<br />
              those problems exist within.”
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pt-16"
          >
            <p className="font-manrope text-sm md:text-base text-[#86868B] leading-loose">
              ROASmind is currently under active development.<br />
              Built independently through AI-assisted engineering ecosystems.
            </p>
            <p className="font-mono text-xs text-[#F4A300]/70 tracking-widest mt-8 uppercase">
              200,000+ lines of orchestrated architecture.
              <br />
              Still evolving.
            </p>
          </m.div>
        </div>

        {/* ── EMOTIONAL STATEMENT ── */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="py-16 flex justify-center text-center"
        >
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-7xl text-white leading-tight">
            “The future
            <br />
            <span className="text-[#86868B]">is being</span> architected.”
          </h2>
        </m.div>

        <DossierMeta slug="roasmind" />
      </div>
    </div>
  );
}
