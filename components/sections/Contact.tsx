"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";

const socials = [
  { id: "github",   label: "GitHub",      href: "https://github.com/Sumandebnath943",    abbr: "GH" },
  { id: "linkedin", label: "LinkedIn",    href: "https://linkedin.com/in/houseofnamus",  abbr: "in" },
  { id: "twitter",  label: "X / Twitter", href: "https://x.com/iamSdebnath",             abbr: "𝕏"  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        // Clean cinematic descent — no white fog, warm graphite entry, ember descent
        background:
          "linear-gradient(180deg, #1C120C 0%, #24110A 12%, #140B08 55%, #050505 100%)",
      }}
    >
      {/* ── ATMOSPHERIC DEPTH ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central ember core — restrained breathing */}
        <m.div
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(160,70,15,0.22) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Left warm haze */}
        <div
          className="absolute top-[20%] left-[-10%] w-[45%] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse at left, rgba(180,80,20,0.1) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Floor darkening */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-0">

        {/* Section label */}
        <m.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-manrope text-[10px] text-[#F5F5F3]/20 uppercase tracking-[0.4em] mb-3"
        >
          08 / Contact
        </m.p>

        {/* Headline — reduced 20–25% from original */}
        <div className="relative mb-8">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:max-w-[55%]"
          >
            <h2 className="font-manrope font-semibold text-4xl md:text-5xl text-[#F5F5F3] leading-tight tracking-tight">
              Let&apos;s Build
              <br />
              <span className="text-[#F5F5F3]/70">What Comes Next.</span>
            </h2>
          </m.div>
          
          {/* Big signature logo on the right (absolute on desktop so it doesn't push layout vertically) */}
          <div className="md:absolute right-0 bottom-[-60px] mt-6 md:mt-0 w-full md:w-[580px] h-40 md:h-[220px] flex items-center justify-start md:justify-end mix-blend-screen opacity-85 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <img 
              src="/branding/logo_v2.png" 
              alt="Suman Debnath Signature" 
              className="h-full w-full object-contain object-left md:object-right"
            />
          </div>
        </div>

        {/* Subtext */}
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="font-manrope text-sm text-[#F5F5F3]/55 leading-relaxed max-w-md mb-10"
        >
          Open to meaningful collaborations, AI-native systems,
          product strategy, and future-focused conversations.
        </m.p>

        {/* Email CTA + Socials — same row on desktop */}
        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 mb-16"
        >
          {/* Phone pill */}
          <a
            href="tel:+917980296957"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#F5F5F3]/12 bg-[#F5F5F3]/[0.04] text-[#F5F5F3]/55 hover:text-[#F5F5F3]/85 hover:border-[#F5F5F3]/22 hover:bg-[#F5F5F3]/[0.07] transition-all duration-500 font-manrope text-xs tracking-wide"
          >
            <span className="w-1 h-1 rounded-full bg-[#F5F5F3]/30 group-hover:bg-[#F5F5F3]/60 transition-colors duration-500" />
            +91 7980296957
          </a>
          
          {/* Email pill */}
          <a
            href="mailto:sumandebnath944@gmail.com"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#F5F5F3]/12 bg-[#F5F5F3]/[0.04] text-[#F5F5F3]/55 hover:text-[#F5F5F3]/85 hover:border-[#F5F5F3]/22 hover:bg-[#F5F5F3]/[0.07] transition-all duration-500 font-manrope text-xs tracking-wide"
          >
            <span className="w-1 h-1 rounded-full bg-[#F5F5F3]/30 group-hover:bg-[#F5F5F3]/60 transition-colors duration-500" />
            sumandebnath944@gmail.com
            <span className="text-[10px] opacity-35 group-hover:opacity-60 transition-opacity">↗</span>
          </a>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-[#F5F5F3]/[0.08]" />

          {/* Social pills */}
          <div className="flex items-center gap-2">
            {socials.map(({ id, label, href, abbr }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#F5F5F3]/20 bg-[#F5F5F3]/[0.06] hover:border-[#F5F5F3]/35 hover:bg-[#F5F5F3]/[0.1] transition-all duration-400 font-manrope text-[11px] text-[#F5F5F3]/55 hover:text-[#F5F5F3]/80"
              >
                <span className="text-[9px] text-[#F5F5F3]/40">{abbr}</span>
                {label}
              </a>
            ))}
          </div>
        </m.div>

        {/* Manifesto — top border separator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-[#F5F5F3]/[0.05] pt-12 pb-12"
        >
          <p className="font-serif italic font-normal text-xl md:text-2xl text-[#F5F5F3]/45 leading-relaxed">
            "Human instinct.{" "}
            <span className="text-[#F5F5F3]/28">AI amplification.</span>
            <br />
            <span className="text-[#F5F5F3]/20">Systemic execution."</span>
          </p>
        </m.div>
      </div>

      {/* ── FOOTER STRIP ── */}
      <div className="relative z-10 bg-white border-t border-[#E8E8E8]">
        <div className="max-w-5xl mx-auto px-6 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Left */}
          <div className="flex items-baseline gap-2">
            <p className="font-manrope font-semibold text-sm text-[#1A1A1A]">
              Suman Debnath
            </p>
            <span className="text-[#1A1A1A]/40 text-xs px-1">·</span>
            <p className="font-manrope text-xs text-[#1A1A1A]/70 font-medium">
              AI-Native Systems Builder
            </p>
          </div>

          {/* Center — utility links */}
          <nav
            aria-label="Footer utility"
            className="flex items-center gap-4 font-manrope text-xs text-[#1A1A1A]/60 font-medium"
          >
            <a
              href="/projects"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              Projects
            </a>
            <span className="text-[#1A1A1A]/30">·</span>
            <a
              href="/faq"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              FAQ
            </a>
            <span className="text-[#1A1A1A]/30">·</span>
            <a
              href="/about"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              About
            </a>
            <span className="text-[#1A1A1A]/30">·</span>
            <a
              href="/fun-apps"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              Fun Apps
            </a>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.dispatchEvent(new Event("easter-egg-destruct"))}
              className="px-2 py-1 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white rounded text-[9px] font-bold tracking-widest uppercase transition-colors"
              aria-label="System Self-Destruct"
            >
              Do Not Click
            </button>
            <p className="font-manrope text-xs font-semibold text-[#1A1A1A]/60">
              © {new Date().getFullYear()}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
