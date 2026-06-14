"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const announcements = [
  {
    title: "D-PE.ai",
    desc: "God-Tier Prompt Engineering workspace.",
    linkText: "View Dossier",
    href: "/projects/d-pe"
  },
  {
    title: "Soul Canvas",
    desc: "Cinematic psychological architecture.",
    linkText: "Explore",
    href: "/fun-apps"
  }
];

export default function Announcement() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[currentIndex];

  return (
    <div className="w-full bg-[#050505] border-b border-white/[0.08] relative overflow-hidden flex justify-center px-4 py-3 sm:py-4">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-[radial-gradient(ellipse_at_center,rgba(63,185,80,0.1)_0%,transparent_70%)] pointer-events-none blur-xl" />
      
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-left w-full max-w-3xl justify-center">
        <div className="flex items-center gap-2 mt-1 sm:mt-0 shrink-0">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3fb950]/20 text-[#3fb950] shrink-0">
            <Sparkles size={12} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#3fb950] font-semibold whitespace-nowrap">
            Recent Activity
          </span>
        </div>
        
        <div className="relative flex flex-col justify-center border-l border-white/[0.08] pl-4 sm:pl-6 min-h-[44px] sm:min-h-[24px]">
          <AnimatePresence mode="wait">
            <m.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
            >
              <p className="font-manrope text-xs sm:text-sm text-white/80">
                <span className="text-white font-medium">{current.title}</span> — {current.desc}
              </p>
              <a
                href={current.href}
                className="group inline-flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-[#3fb950] transition-colors pb-0.5"
              >
                {current.linkText}
                <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
