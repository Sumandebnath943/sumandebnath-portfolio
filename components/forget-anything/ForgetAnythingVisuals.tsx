"use client";

import { useRef, type ReactNode } from "react";
import { m, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
 *  Reveal — scroll-triggered fade-up entrance
 * ═══════════════════════════════════════════════════════════════════════════ */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 30,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  StatCounter — animates a number from 0 to target
 * ═══════════════════════════════════════════════════════════════════════════ */
export function StatCounter({
  value,
  label,
  suffix = "",
}: {
  value: string;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="font-manrope font-bold text-3xl md:text-4xl"
        style={{ color: "#D4AF37" }}
      >
        {value}
        {suffix}
      </span>
      <span className="font-manrope text-xs md:text-sm tracking-wide uppercase opacity-60">
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  GoldShimmerButton — CTA with gold gradient + animated shimmer sweep
 * ═══════════════════════════════════════════════════════════════════════════ */
export function GoldShimmerButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.a
      href={href}
      download
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative inline-flex items-center gap-3 px-8 py-4 rounded-full
        font-manrope font-bold text-base uppercase tracking-wider
        text-[#0A2E1C] overflow-hidden cursor-pointer
        shadow-[0_8px_32px_rgba(212,175,55,0.35),inset_0_1px_0_rgba(255,255,255,0.4)]
        hover:shadow-[0_12px_40px_rgba(212,175,55,0.5),inset_0_1px_0_rgba(255,255,255,0.5)]
        transition-shadow duration-300
        ${className}
      `}
      style={{
        background:
          "linear-gradient(135deg, #A67C00 0%, #BF953F 25%, #FCF6BA 50%, #B38728 75%, #FDED68 100%)",
      }}
    >
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "fa-shimmer 2.5s linear infinite",
        }}
      />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </m.a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  AmbientOrbs — floating decorative emerald/gold gradient blobs
 * ═══════════════════════════════════════════════════════════════════════════ */
export function AmbientOrbs({ variant = "hero" }: { variant?: "hero" | "section" }) {
  const orbs =
    variant === "hero"
      ? [
          { color: "#50C878", size: "55vw", top: "-20%", left: "-15%", delay: "0s" },
          { color: "#D4AF37", size: "40vw", bottom: "-10%", right: "-12%", delay: "2s" },
          { color: "#2E8B57", size: "30vw", top: "30%", right: "5%", delay: "4s" },
        ]
      : [
          { color: "#50C878", size: "35vw", top: "-10%", left: "-8%", delay: "0s" },
          { color: "#D4AF37", size: "25vw", bottom: "-5%", right: "-5%", delay: "1.5s" },
        ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[120px] md:blur-[150px]"
          style={{
            background: `radial-gradient(circle, ${o.color}, transparent 65%)`,
            width: o.size,
            height: o.size,
            top: o.top,
            bottom: o.bottom,
            left: o.left,
            right: o.right,
            opacity: 0.12,
            animation: `fa-float ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: o.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  StepCard — a single step in the How It Works flow
 * ═══════════════════════════════════════════════════════════════════════════ */
export function StepCard({
  step,
  title,
  description,
  icon,
  delay = 0,
}: {
  step: string;
  title: string;
  description: string;
  icon: string;
  delay?: number;
}) {
  const iconMap: Record<string, ReactNode> = {
    wifi: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h.01" /><path d="M2 8.82a15 15 0 0 1 20 0" /><path d="M5 12.86a10 10 0 0 1 14 0" /><path d="M8.5 16.43a5 5 0 0 1 7 0" />
      </svg>
    ),
    departure: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    bell: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  };

  return (
    <Reveal delay={delay} className="flex-1 min-w-[220px]">
      <div className="relative p-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm hover:border-[#D4AF37]/30 transition-all duration-300 group">
        {/* Step number */}
        <span className="font-dmmono text-[11px] text-[#D4AF37]/60 tracking-widest">
          STEP {step}
        </span>
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mt-4 mb-4 group-hover:bg-[#D4AF37]/15 transition-colors">
          {iconMap[icon]}
        </div>
        <h3 className="font-manrope font-semibold text-lg text-white mb-2">
          {title}
        </h3>
        <p className="font-manrope text-sm text-white/60 leading-relaxed">
          {description}
        </p>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  FeatureCard — clean white card for features section
 * ═══════════════════════════════════════════════════════════════════════════ */
export function FeatureCard({
  title,
  description,
  icon,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}) {
  const iconMap: Record<string, ReactNode> = {
    geofence: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C3524" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3" /><path d="M12 19v3" /><path d="M2 12h3" /><path d="M19 12h3" />
      </svg>
    ),
    wifi: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C3524" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h.01" /><path d="M2 8.82a15 15 0 0 1 20 0" /><path d="M5 12.86a10 10 0 0 1 14 0" /><path d="M8.5 16.43a5 5 0 0 1 7 0" />
      </svg>
    ),
    combined: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C3524" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  };

  return (
    <Reveal delay={delay} className="flex-1 min-w-[250px]">
      <div className="h-full p-7 rounded-2xl border border-[#e8e5df] bg-white hover:border-[#50C878]/30 hover:shadow-[0_8px_30px_rgba(80,200,120,0.08)] transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-[#50C878]/10 border border-[#50C878]/20 flex items-center justify-center mb-5 group-hover:bg-[#50C878]/15 transition-colors">
          {iconMap[icon]}
        </div>
        <h3 className="font-manrope font-semibold text-lg text-[#1a1a1a] mb-2">
          {title}
        </h3>
        <p className="font-manrope text-sm text-[#1a1a1a]/55 leading-relaxed">
          {description}
        </p>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  TechCard — small tech stack item
 * ═══════════════════════════════════════════════════════════════════════════ */
export function TechCard({
  name,
  description,
  color,
  delay = 0,
}: {
  name: string;
  description: string;
  color: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm hover:border-white/[0.15] transition-all duration-300 group">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: color }}
          />
          <span className="font-manrope font-semibold text-sm text-white">
            {name}
          </span>
        </div>
        <p className="font-manrope text-xs text-white/45 leading-relaxed">
          {description}
        </p>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  PrivacyPillar — clean card for privacy section
 * ═══════════════════════════════════════════════════════════════════════════ */
export function PrivacyPillar({
  title,
  description,
  icon,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="flex-1 min-w-[240px]">
      <div className="text-center p-8 rounded-2xl border border-[#e8e5df] bg-white/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300">
        <span className="text-3xl mb-4 block">{icon}</span>
        <h3 className="font-manrope font-semibold text-base text-[#1a1a1a] mb-2">
          {title}
        </h3>
        <p className="font-manrope text-sm text-[#1a1a1a]/50 leading-relaxed">
          {description}
        </p>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  TrustBadge — single badge in the trust bar
 * ═══════════════════════════════════════════════════════════════════════════ */
export function TrustBadge({
  icon,
  label,
  delay = 0,
}: {
  icon: string;
  label: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-center gap-2.5 px-4 py-2">
        <span className="text-lg">{icon}</span>
        <span className="font-manrope text-sm font-medium text-[#1a1a1a]/50 whitespace-nowrap">
          {label}
        </span>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  AIFileRow — row in the AI-assisted files table
 * ═══════════════════════════════════════════════════════════════════════════ */
export function AIFileRow({
  file,
  purpose,
  delay = 0,
}: {
  file: string;
  purpose: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-start gap-4 py-3 border-b border-white/[0.06] last:border-0">
        <span className="font-dmmono text-[13px] text-[#D4AF37] whitespace-nowrap mt-0.5">
          {file}
        </span>
        <span className="font-manrope text-sm text-white/50 leading-relaxed">
          {purpose}
        </span>
      </div>
    </Reveal>
  );
}
