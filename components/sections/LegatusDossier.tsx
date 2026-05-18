"use client";

import { useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import DossierMeta from "./DossierMeta";

// ── CAPABILITIES DATA ──
const capabilities = [
  { title: "End-of-Life Vault", desc: "Automated trigger systems for post-life data release." },
  { title: "Nominee Access Layers", desc: "Multi-party cryptographic key sharing." },
  { title: "AES-256 Encryption", desc: "Military-grade standard for data at rest." },
  { title: "RSA-2048 Security", desc: "Asymmetric cryptography for secure access delegation." },
  { title: "Death Verification Workflow", desc: "Legally compliant multi-step mortality confirmation." },
  { title: "Multi-Level Permissions", desc: "Granular control over which assets are released to whom." },
  { title: "Secure Credential Storage", desc: "Hardened storage for Master Passwords and Seed Phrases." },
];

export default function LegatusDossier() {
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
      className="relative w-full bg-gradient-to-br from-[#060A14] via-[#020305] to-[#0A0D15] text-[#F5F5F7] overflow-hidden rounded-[2.5rem] border border-[#C5A059]/30 shadow-[0_30px_100px_-20px_rgba(197,160,89,0.25)]"
    >
      {/* ── AMBIENT ATMOSPHERE & TEXTURES ── */}

      {/* Heavy Cinematic Shadows & Vault Lighting */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#060A14] to-transparent opacity-80 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-[#0A0D15] to-transparent opacity-80 pointer-events-none z-0" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[100vw] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.15)_0%,transparent_60%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[60vw] h-[1000px] bg-[radial-gradient(ellipse_at_left,rgba(197,160,89,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      {/* Slow Moving Shadow Sweep (Simulating heavy physical lighting) */}
      <m.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-black/40 to-transparent pointer-events-none z-0 skew-x-12"
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
          <div className="px-6 py-2 border-y border-[#C5A059]/30 bg-black/50 backdrop-blur-md">
            <p className="font-mono text-[10px] text-[#C5A059] uppercase tracking-[0.6em] ml-[0.6em]">
              Digital Legacy Vault
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.2)_0%,transparent_70%)] blur-[60px] opacity-60 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            {!logoError ? (
              <div className="relative w-full max-w-[480px] md:max-w-[700px] h-48 md:h-64 mb-8 z-10 mix-blend-screen">
                <Image 
                  src="/tools/legatus.png" 
                  alt="LEGATUS — immutable digital inheritance vault by Suman Debnath, securing end-of-life digital assets with AES-256 and RSA-2048 encryption"
                  fill 
                  className="object-contain drop-shadow-[0_10px_30px_rgba(197,160,89,0.3)] scale-100 md:scale-[1.5]"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <h2 className="font-serif text-3xl sm:text-5xl md:text-8xl lg:text-9xl text-white tracking-widest uppercase mb-8 drop-shadow-[0_10px_30px_rgba(197,160,89,0.1)] z-10 relative">
                LEGATUS
              </h2>
            )}
          </div>
          <p className="font-manrope text-lg md:text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed">
            A secure inheritance infrastructure for the digital age.
          </p>
        </m.div>

        {/* ── NARRATIVE BLOCK ── */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto mb-16 text-center relative py-12"
        >
          {/* Engraved Plaque Styling */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
          
          <p className="font-serif text-2xl md:text-3xl text-white leading-relaxed mb-10">
            “Most people leave behind memories.
          </p>
          <p className="font-manrope text-base md:text-lg text-[#86868B] leading-loose mb-10">
            But in the modern world, they also leave behind:<br />
            <span className="text-[#C5A059] tracking-widest text-sm uppercase">Identities / Systems / Accounts / Documents</span><br />
            and fragments of their entire digital existence.
          </p>
          <p className="font-manrope text-base md:text-lg text-white leading-relaxed">
            Most families are never prepared for what happens next.<br />
            LEGATUS was built for that moment.”
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
          {/* Heavy Edge Glow */}
          <div className="absolute -inset-2 bg-gradient-to-b from-[#C5A059]/20 to-transparent rounded-3xl blur-2xl opacity-40 transition-opacity duration-1000 group-hover:opacity-70" />
          
          <m.div 
            style={{ y }} 
            className="relative rounded-2xl overflow-hidden bg-[#020305] border-2 border-[#1A1F2E] shadow-[0_60px_120px_rgba(0,0,0,1)]"
          >
            {/* Cinematic Vault Chrome */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-[#1A1F2E] bg-gradient-to-b from-[#080B14] to-[#04060A]">
              <div className="flex gap-2 opacity-50">
                {/* Secure Bolts instead of dots */}
                <div className="w-2.5 h-2.5 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10" />
                <div className="w-2.5 h-2.5 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10" />
              </div>
              <div className="flex items-center gap-4 px-6 py-2 rounded border border-[#C5A059]/20 bg-black">
                <svg className="w-3 h-3 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-[10px] font-mono text-[#C5A059]/80 tracking-widest uppercase">
                  https://legatus.houseofnamus.com
                </span>
              </div>
              <div className="w-12" /> {/* Spacer for balance */}
            </div>

            {/* Scrollable Interior */}
            <div className="relative h-[500px] md:h-[700px] overflow-hidden bg-black">
              {/* Heavy Internal Fade Masks */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
              
              <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
                {/* Viewport content */}
                <div className="relative w-full">
                  {/* Subtle vault lighting reflection */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.05)_0%,transparent_70%)] pointer-events-none" />
                  <Image 
                    src="/screenshots/legatus.png"
                    alt="LEGATUS product interface — secure vault dashboard, nominee access layers, and death verification workflow"
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
        <div className="mb-16 max-w-4xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 text-center"
          >
            <p className="font-mono text-[10px] text-[#86868B] uppercase tracking-[0.4em] mb-4">
              Infrastructure Details
            </p>
            <h3 className="font-serif text-3xl md:text-4xl text-white tracking-wide">
              Security & Access Architecture
            </h3>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-8 bg-black/60 border border-[#1A1F2E] hover:border-[#C5A059]/40 transition-colors duration-700 cursor-default"
              >
                {/* Vault-style corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#C5A059]/0 group-hover:border-[#C5A059]/60 transition-colors duration-700" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#C5A059]/0 group-hover:border-[#C5A059]/60 transition-colors duration-700" />
                
                <h4 className="font-serif text-white text-lg mb-3 tracking-wide">
                  {cap.title}
                </h4>
                <p className="text-sm text-[#86868B] leading-relaxed">
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
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="py-16 flex justify-center text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-tight tracking-wide">
            “Your digital life
            <br />
            <span className="text-[#C5A059] opacity-80">should not disappear</span>
            <br />
            with you.”
          </h2>
        </m.div>

        <DossierMeta slug="legatus" />
      </div>
    </div>
  );
}
