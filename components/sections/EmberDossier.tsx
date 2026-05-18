"use client";

import { useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import DossierMeta from "./DossierMeta";

const capabilities = [
  { title: "EMBER Score", desc: "Quantifies cognitive exhaustion over time." },
  { title: "Immediate De-Burn Mode", desc: "Sensory shutdown protocols." },
  { title: "AI Vent Companion", desc: "Judgment-free emotional processing." },
  { title: "Recovery Tracking", desc: "Small-win psychological reinforcement." },
  { title: "Guided Grounding", desc: "Audio-visual somatic regulation." },
  { title: "Life Reassessment", desc: "Structured architectural pivots." },
];

export default function EmberDossier() {
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
      className="relative w-full bg-gradient-to-br from-[#1F1005] via-[#0D0907] to-[#080A08] text-[#F5F5F7] overflow-hidden rounded-[2.5rem] border border-[#E86A33]/30 shadow-[0_30px_100px_-20px_rgba(232,106,51,0.3)]"
    >
      {/* ── AMBIENT ATMOSPHERE & LIGHTING ── */}

      {/* Warm Cinematic Breathing Glows */}
      <m.div 
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(232,106,51,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none" 
      />
      <div className="absolute top-1/4 right-0 w-[60vw] h-[1000px] bg-[radial-gradient(ellipse_at_right,rgba(138,154,134,0.1)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[80vw] h-[1000px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(232,106,51,0.1)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28">
        {/* ── TOP LABEL ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="px-5 py-2 border border-[#E86A33]/10 rounded-full bg-[#E86A33]/[0.02] backdrop-blur-md">
            <p className="font-mono text-[10px] text-[#E86A33]/80 uppercase tracking-widest">
              Burnout Recovery System
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(232,106,51,0.2)_0%,transparent_70%)] blur-[60px] opacity-60 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            {!logoError ? (
              <div className="relative w-full max-w-[480px] md:max-w-[700px] h-48 md:h-64 mb-8 z-10 mix-blend-screen">
                <Image 
                  src="/tools/ember.png" 
                  alt="EMBER — audio journaling and burnout recovery companion by Suman Debnath, built around cognitive relief and quiet warmth"
                  fill 
                  className="object-contain drop-shadow-[0_10px_40px_rgba(232,106,51,0.25)] scale-100 md:scale-[1.5]"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight mb-8 drop-shadow-[0_10px_40px_rgba(232,106,51,0.15)] z-10 relative">
                EMBER
              </h2>
            )}
          </div>
          <p className="font-manrope text-lg md:text-xl text-[#8A9A86] max-w-2xl mx-auto leading-relaxed">
            A burnout recovery companion that rebuilds you one small win at a time.
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#E86A33]/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#E86A33]/40 to-transparent" />

          <p className="font-serif italic text-2xl md:text-3xl text-white leading-relaxed mb-8">
            “Most recovery systems ask people to do more.
          </p>
          <p className="font-manrope text-base md:text-lg text-[#86868B] leading-relaxed mb-8">
            More habits.<br />
            More goals.<br />
            More discipline.
          </p>
          <p className="font-manrope text-base md:text-lg text-white/90 leading-relaxed">
            EMBER was built for the moments when even getting out of bed already feels impossible.”
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
          {/* Soft Warm Reflection */}
          <div className="absolute -inset-4 bg-gradient-to-b from-[#E86A33]/10 to-transparent rounded-[3rem] blur-3xl opacity-60 transition-opacity duration-1000 group-hover:opacity-100 pointer-events-none" />
          
          <m.div 
            style={{ y }} 
            className="relative rounded-3xl overflow-hidden bg-[#0A0B0D] border border-white/[0.03] shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
          >
            {/* Soft UI Chrome */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#0F1113]/80 backdrop-blur-md">
              <div className="flex gap-2 opacity-30">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E86A33]/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="px-4 py-1.5 rounded-full bg-white/[0.02]">
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
                  https://ember.houseofnamus.com
                </span>
              </div>
              <div className="w-16" />
            </div>

            {/* Unrestricted Height Interior */}
            <div className="relative w-full overflow-hidden bg-[#0F1113]">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0F1113] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F1113] to-transparent z-10 pointer-events-none" />
              
              <div className="w-full">
                <div className="relative w-full">
                  {/* Warm ambient reflection inside viewport */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,106,51,0.03)_0%,transparent_60%)] pointer-events-none z-10" />
                  
                  <Image 
                    src="/screenshots/ember.png"
                    alt="EMBER product interface — EMBER score, immediate de-burn mode, AI vent companion, guided grounding, and recovery tracking"
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
        <div className="mb-16 max-w-4xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center"
          >
            <p className="font-mono text-[10px] text-[#8A9A86] uppercase tracking-[0.3em] mb-4">
              Recovery Architecture
            </p>
            <h3 className="font-serif italic text-3xl md:text-4xl text-white">
              Compassionate Infrastructure
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
                className="group p-8 rounded-3xl bg-white/[0.01] border border-white/[0.03] hover:border-[#E86A33]/20 hover:bg-[#E86A33]/[0.02] transition-colors duration-700 cursor-default"
              >
                <h4 className="font-serif text-white text-lg mb-2">
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
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-relaxed">
            “You do not need<br />
            <span className="text-[#8A9A86] italic">to become productive again</span><br />
            before you deserve care.”
          </h2>
        </m.div>

        <DossierMeta slug="ember" />
      </div>
    </div>
  );
}
