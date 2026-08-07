"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ── Reveal Wrapper ──────────────────────────────────────────────────────── */
export function Reveal({ children, delay = 0, y = 20 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <m.div ref={ref} initial={{ opacity: 0, y }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </m.div>
  );
}

export function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <m.div ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8, delay, ease: "easeOut" }}>
      {children}
    </m.div>
  );
}

/* ── Custom Buttons ──────────────────────────────────────────────────────── */
export function LimeShimmerButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-[14px] font-bold tracking-wide text-[#12131A] transition-all hover:scale-[1.02] active:scale-[0.98]">
      <span className="absolute inset-0 bg-[#C6F24E]" />
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] skew-x-[-15deg] group-hover:animate-[fa-shimmer_1.5s_ease-in-out_infinite]" />
      <span className="relative flex items-center gap-2">{children}</span>
    </a>
  );
}

/* ── Flow Field Background ───────────────────────────────────────────────── */
export function MigiFlowField({ tone = "lime" }: { tone?: "lime" | "ink" | "mixed" }) {
  const colorMap = {
    lime: "rgba(198, 242, 78, 0.03)",
    ink: "rgba(18, 19, 26, 0.08)",
    mixed: "rgba(198, 242, 78, 0.02)",
  };
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden fa-grain">
      <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${tone}`} width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={colorMap[tone]} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${tone})`} />
      </svg>
    </div>
  );
}

/* ── Phone Mockup ────────────────────────────────────────────────────────── */
export function PhoneMockup({ 
  src, 
  alt, 
  delay = 0, 
  float = false,
  className = "w-[280px] sm:w-[320px] md:w-[340px]",
  disableReveal = false
}: { 
  src: string; 
  alt: string; 
  delay?: number; 
  float?: boolean;
  className?: string;
  disableReveal?: boolean;
}) {
  const content = (
    <div className={`relative mx-auto rounded-[28px] md:rounded-[36px] p-1.5 md:p-2 bg-[#151515] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${className} ${float ? "animate-[fa-bob_6s_ease-in-out_infinite]" : ""}`}>
      
      {/* Screen */}
      <div className="relative rounded-[24px] md:rounded-[30px] overflow-hidden w-full aspect-[1080/2400] bg-black border border-white/5">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 380px" quality={90} />
      </div>
    </div>
  );

  if (disableReveal) return content;

  return (
    <Reveal delay={delay} y={30}>
      {content}
    </Reveal>
  );
}

/* ── Dual Mockup Display ─────────────────────────────────────────────────── */
export function DualMockupDisplay({ 
  src1, alt1, label1,
  src2, alt2, label2 
}: {
  src1: string; alt1: string; label1: string;
  src2: string; alt2: string; label2: string;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full">
       <div className="flex flex-col items-center">
         <PhoneMockup src={src1} alt={alt1} className="w-[260px] md:w-[300px]" delay={0.1} />
         <Reveal delay={0.2}><p className="mt-5 font-dmmono text-xs text-[#C6F24E]/70 uppercase tracking-widest">{label1}</p></Reveal>
       </div>
       <div className="flex flex-col items-center md:translate-y-12">
         <PhoneMockup src={src2} alt={alt2} className="w-[260px] md:w-[300px]" delay={0.2} />
         <Reveal delay={0.3}><p className="mt-5 font-dmmono text-xs text-[#C6F24E]/70 uppercase tracking-widest">{label2}</p></Reveal>
       </div>
    </div>
  );
}

/* ── Triple Mockup Grid ──────────────────────────────────────────────────── */
export function TripleMockupGrid({
  items
}: {
  items: { src: string; alt: string; label: string }[]
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 w-full max-w-6xl mx-auto items-start">
      {items.map((item, idx) => (
        <div key={item.src} className={`flex flex-col items-center ${idx === 1 ? 'md:translate-y-10' : ''} ${idx === 2 ? 'md:translate-y-20' : ''}`}>
           <PhoneMockup src={item.src} alt={item.alt} className="w-[240px] md:w-[280px]" delay={idx * 0.1} />
           <Reveal delay={idx * 0.1 + 0.1}><p className="mt-5 font-dmmono text-[11px] text-white/50 uppercase tracking-widest">{item.label}</p></Reveal>
        </div>
      ))}
    </div>
  )
}

/* ── Agent Coverflow ──────────────────────────────────────────────────────── */
export function AgentCoverflow({
  agents
}: {
  agents: { src: string; alt: string; name: string }[]
}) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(agents.length / 2));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full h-[750px] md:h-[950px] flex items-center justify-center overflow-hidden py-10 mt-8">
      {agents
        .map((agent, index) => ({ agent, index }))
        .sort((a, b) => {
          // Sort descending by distance from center, so the active item (distance 0) renders LAST (on top)
          const distA = Math.abs(a.index - activeIndex);
          const distB = Math.abs(b.index - activeIndex);
          return distB - distA;
        })
        .map(({ agent, index }) => {
        const offset = index - activeIndex;
        const absOffset = Math.abs(offset);
        const isActive = offset === 0;

        // Calculate layout
        const xOffset = isMobile ? 110 : 180;
        const x = offset * xOffset;
        const scale = isActive ? 1 : 1 - absOffset * 0.15;
        const zIndex = 30 - absOffset;
        const opacity = absOffset >= 3 ? 0 : 1;
        const pointerEvents = absOffset >= 3 ? "none" : "auto";

        return (
          <m.div
            key={agent.name}
            className="absolute origin-center flex flex-col items-center justify-center"
            initial={false}
            animate={{ x, scale, opacity }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ pointerEvents, zIndex }}
          >
             <AnimatePresence mode="popLayout">
               {isActive ? (
                 <m.div 
                   key="active-phone"
                   className="relative"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ duration: 0.2 }}
                 >
                    <PhoneMockup src={agent.src} alt={agent.alt} className="w-[260px] md:w-[340px]" disableReveal={true} />
                 </m.div>
               ) : (
                 <m.div 
                   key="inactive-screen"
                   className="relative aspect-[1080/2400] rounded-[20px] md:rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 cursor-pointer"
                   style={{ width: isMobile ? 180 : 260 }}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   onClick={() => setActiveIndex(index)}
                 >
                    {/* Subtle darkening for inactive items to make center pop */}
                    <div className="absolute inset-0 bg-black/10 z-10 hover:bg-transparent transition-colors duration-300" />
                    <Image src={agent.src} alt={agent.alt} fill className="object-cover" />
                 </m.div>
               )}
             </AnimatePresence>

             <AnimatePresence>
               {isActive && (
                 <m.p 
                    key="agent-name"
                    className="absolute -bottom-16 md:-bottom-20 font-manrope font-semibold text-[18px] md:text-[22px] text-[#C6F24E] tracking-wide whitespace-nowrap drop-shadow-md"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                 >
                   {agent.name}
                 </m.p>
               )}
             </AnimatePresence>
          </m.div>
        );
      })}

      {/* Navigation Arrows */}
      <button 
        onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
        disabled={activeIndex === 0}
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1c1c1e]/50 hover:bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all disabled:opacity-0 z-50 backdrop-blur-md"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <button 
        onClick={() => setActiveIndex(Math.min(agents.length - 1, activeIndex + 1))}
        disabled={activeIndex === agents.length - 1}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1c1c1e]/50 hover:bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all disabled:opacity-0 z-50 backdrop-blur-md"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  );
}


/* ── Migi Security Architecture ───────────────────────────────────────────── */
export function SecurityArchitecture() {
  return (
    <div className="w-full flex justify-center py-10">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
         
         <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#12131A]" />
            <div className="w-16 h-16 mb-4 rounded-2xl bg-[#12131A]/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#12131A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h4 className="text-[#12131A] font-bold text-lg mb-2">Hardware Gated</h4>
            <p className="text-sm text-[#12131A]/70 font-medium">Biometric prompt required before WebView renders. Prevents access if device is unlocked.</p>
         </div>

         <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-white/40 flex items-center justify-center border border-white/50">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#12131A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h4 className="text-[#12131A] font-bold text-lg mb-2">Zero Client Secrets</h4>
            <p className="text-sm text-[#12131A]/70 font-medium">No API keys or DB credentials on the phone. All authentication happens on the origin server.</p>
         </div>

         <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-white/40 flex items-center justify-center border border-white/50">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#12131A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h4 className="text-[#12131A] font-bold text-lg mb-2">Targeted Isolation</h4>
            <p className="text-sm text-[#12131A]/70 font-medium">WebView is strictly restricted to migi.houseofnamus.com. External links redirect to device browser.</p>
         </div>

       </div>
    </div>
  );
}
