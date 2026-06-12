"use client";

import { m } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Announcement() {
  return (
    <div className="w-full bg-[#050505] border-b border-white/[0.08] relative overflow-hidden flex justify-center px-4 py-3 sm:py-4">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-[radial-gradient(ellipse_at_center,rgba(63,185,80,0.1)_0%,transparent_70%)] pointer-events-none blur-xl" />
      
      <m.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3fb950]/20 text-[#3fb950]">
            <Sparkles size={12} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#3fb950] font-semibold">
            Recently Launched
          </span>
        </div>
        
        <p className="font-manrope text-xs sm:text-sm text-white/80">
          <span className="text-white font-medium">D-PE.ai</span> — God-Tier Prompt Engineering workspace.
        </p>

        <a
          href="/projects/d-pe"
          className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white hover:text-[#3fb950] transition-colors border-b border-transparent hover:border-[#3fb950]/50 pb-0.5"
        >
          View Dossier
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </m.div>
    </div>
  );
}
