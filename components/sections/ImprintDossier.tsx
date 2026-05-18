"use client";

import { useRef, useState, useEffect } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import DossierMeta from "./DossierMeta";

// ── CAPABILITIES DATA ──
const capabilities = [
  { title: "Baseline Imprint", desc: "Core identity mapping and preservation." },
  { title: "The Forge", desc: "Interactive scenario stress-testing." },
  { title: "The Mirror", desc: "AI behavioral cloning reflection." },
  { title: "Drift Score", desc: "Quantified measurement of dependency." },
  { title: "Skill Vault", desc: "Cryptographic proof of human capability." },
  { title: "Calibration Sessions", desc: "Guided cognitive reclamation." },
  { title: "Human Circles", desc: "Verified non-synthetic interactions." },
  { title: "Identity Credential", desc: "Immutable proof of self." },
];

export default function ImprintDossier() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logoError, setLogoError] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for the main viewport
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gradient-to-b from-[#1F0A00] via-[#0A0300] to-[#050100] text-[#F5F5F7] overflow-hidden rounded-[2.5rem] border border-[#FF5A1F]/30 shadow-[0_30px_100px_-20px_rgba(255,90,31,0.3)]"
    >
      {/* ── AMBIENT ATMOSPHERE ── */}

      {/* Volumetric Forge Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,90,31,0.25)_0%,transparent_70%)] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[50vw] h-[800px] bg-[radial-gradient(ellipse_at_left,rgba(255,120,50,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[80vw] h-[1000px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,60,10,0.2)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      {/* Subtle Ember Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && Array.from({ length: 15 }).map((_, i) => (
          <m.div
            key={i}
            className="absolute rounded-full bg-[#FF5A1F]"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.4 + 0.1,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -100 - Math.random() * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, Math.random() * 0.5 + 0.2, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
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
          <div className="px-4 py-2 border border-white/10 rounded bg-white/[0.02] backdrop-blur-md">
            <p className="font-mono text-[10px] text-[#FF5A1F] uppercase tracking-[0.5em] ml-[0.5em]">
              Identity Preservation System
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.2)_0%,transparent_70%)] blur-[60px] opacity-60 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            {!logoError ? (
              <div className="relative w-full max-w-[480px] md:max-w-[700px] h-48 md:h-64 mb-8 z-10 mix-blend-screen">
                <Image 
                  src="/tools/imprint.png" 
                  alt="IMPRINT — identity preservation system by Suman Debnath, defending the human mind against AI dependency"
                  fill 
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,90,31,0.3)] scale-100 md:scale-[1.5]"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <h2 className="font-serif italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight mb-8 drop-shadow-[0_0_30px_rgba(255,90,31,0.2)] z-10 relative">
                IMPRINT
              </h2>
            )}
          </div>
          <p className="font-manrope text-lg md:text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed">
            The identity preservation engine defending the human mind against AI dependency.
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#FF5A1F]/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#FF5A1F]/40 to-transparent" />

          <p className="font-serif italic text-2xl md:text-3xl text-white leading-relaxed mb-8">
            “Most people will never notice the moment their instincts begin disappearing.
          </p>
          <p className="font-manrope text-base md:text-lg text-[#86868B] leading-relaxed mb-8">
            The writing still sounds intelligent.<br />
            The output still looks polished.
          </p>
          <p className="font-manrope text-base md:text-lg text-[#86868B] leading-relaxed">
            But underneath the surface, the machine has slowly started thinking for them.<br />
            <span className="text-white mt-4 block">IMPRINT was built to detect that moment.”</span>
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
          <div className="absolute -inset-1 bg-gradient-to-b from-[#FF5A1F]/30 to-transparent rounded-3xl blur-2xl opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
          
          <m.div 
            style={{ y }} 
            className="relative rounded-2xl overflow-hidden bg-[#0A0A0C] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Cinematic Browser Chrome */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-[#050505]">
              <div className="flex gap-2 opacity-20">
                <div className="w-3 h-3 rounded-full bg-white" />
                <div className="w-3 h-3 rounded-full bg-white" />
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 tracking-widest">
                  https://imprint.houseofnamus.com
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
                  <Image 
                    src="/screenshots/imprint.png"
                    alt="IMPRINT product interface — drift score dashboard, behavioral cloning sessions, and identity credential vault"
                    width={1920}
                    height={4000}
                    className="w-full h-auto"
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
            className="mb-12"
          >
            <p className="font-mono text-[10px] text-[#86868B] uppercase tracking-[0.3em] mb-4">
              System Architecture
            </p>
            <h3 className="font-serif italic text-3xl md:text-4xl text-white">
              Tactical Capabilities
            </h3>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#FF5A1F]/40 hover:bg-[#FF5A1F]/[0.02] transition-colors duration-500 cursor-default"
              >
                <div className="w-8 h-[1px] bg-white/20 mb-6 group-hover:bg-[#FF5A1F]/60 transition-colors duration-500" />
                <h4 className="font-manrope font-medium text-white text-sm mb-2">
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
            “You are worth more
            <br />
            <span className="text-[#86868B]">than what the machine</span>
            <br />
            is replacing.”
          </h2>
        </m.div>

        <DossierMeta slug="imprint" />
      </div>
    </div>
  );
}
