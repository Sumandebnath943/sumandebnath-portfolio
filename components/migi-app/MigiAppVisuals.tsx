"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────────
   MIGI Android App — page visuals
   Split-world system: graphite (the app) ↔ cream (the story).
   Lime #C6F24E is the brand. Aqua #35E0FF appears only in V2 territory.
   ────────────────────────────────────────────────────────────────────────── */

const LIME = "#C6F24E";
const AQUA = "#35E0FF";

/* ── Motion primitives ───────────────────────────────────────────────────── */
export function Reveal({ children, delay = 0, y = 22 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

export function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

/* ── Backdrops ───────────────────────────────────────────────────────────── */
export function GridField({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const stroke = tone === "dark" ? "rgba(198,242,78,0.055)" : "rgba(18,22,26,0.055)";
  const id = `mg-${tone}`;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke={stroke} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

export function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-[28%] left-1/2 h-[70vh] w-[130vw] -translate-x-1/2 rounded-full blur-[110px] opacity-[0.5]"
        style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.20), transparent 72%)" }}
      />
      <div
        className="absolute top-[18%] -right-[18%] h-[52vh] w-[70vw] rounded-full blur-[130px] opacity-[0.34]"
        style={{ background: "radial-gradient(closest-side, rgba(53,224,255,0.20), transparent 72%)" }}
      />
    </div>
  );
}

/* ── Device frame ────────────────────────────────────────────────────────── */
export function Phone({
  src,
  alt,
  className = "w-[260px] md:w-[300px]",
  tone = "dark",
  float = false,
  priority = false,
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  tone?: "dark" | "light";
  float?: boolean;
  priority?: boolean;
  onClick?: () => void;
}) {
  const shell =
    tone === "dark"
      ? "bg-gradient-to-b from-white/[0.22] via-white/[0.06] to-white/[0.16]"
      : "bg-gradient-to-b from-black/[0.28] via-black/[0.10] to-black/[0.20]";
  const shadow =
    tone === "dark"
      ? "shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_60px_-25px_rgba(198,242,78,0.28)]"
      : "shadow-[0_40px_80px_-28px_rgba(18,22,26,0.42)]";

  return (
    <div
      onClick={onClick}
      className={`relative shrink-0 ${className} ${float ? "animate-[mg-bob_7s_ease-in-out_infinite]" : ""} ${
        onClick ? "cursor-zoom-in" : ""
      }`}
    >
      {/* side buttons */}
      <span className="absolute -right-[2px] top-[19%] h-[6%] w-[3px] rounded-r bg-white/15" />
      <span className="absolute -right-[2px] top-[28%] h-[10%] w-[3px] rounded-r bg-white/15" />
      <span className="absolute -left-[2px] top-[22%] h-[8%] w-[3px] rounded-l bg-white/10" />

      <div className={`rounded-[2.3rem] p-[2px] ${shell} ${shadow}`}>
        <div className="rounded-[2.2rem] bg-[#080A09] p-[5px]">
          <div className="relative aspect-[1080/2400] w-full overflow-hidden rounded-[1.9rem] bg-black">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className="object-cover"
              sizes="(max-width: 768px) 70vw, 340px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hero: three-up device stack ─────────────────────────────────────────── */
export function HeroStack({
  left,
  center,
  right,
}: {
  left: { src: string; alt: string };
  center: { src: string; alt: string };
  right: { src: string; alt: string };
}) {
  return (
    <div className="relative flex items-end justify-center">
      <m.div
        initial={{ opacity: 0, y: 60, rotate: -12 }}
        animate={{ opacity: 1, y: 0, rotate: -9 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block -mr-28 translate-y-14 origin-bottom"
      >
        <Phone src={left.src} alt={left.alt} className="w-[208px] lg:w-[268px]" />
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20"
      >
        <Phone src={center.src} alt={center.alt} className="w-[264px] sm:w-[290px] lg:w-[320px]" priority float />
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 60, rotate: 12 }}
        animate={{ opacity: 1, y: 0, rotate: 9 }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block -ml-28 translate-y-14 origin-bottom"
      >
        <Phone src={right.src} alt={right.alt} className="w-[208px] lg:w-[268px]" />
      </m.div>
    </div>
  );
}

/* ── Lightbox ────────────────────────────────────────────────────────────── */
function Lightbox({
  shot,
  onClose,
}: {
  shot: { src: string; alt: string; label: string; note?: string } | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!shot) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [shot, onClose]);

  return (
    <AnimatePresence>
      {shot && (
        <m.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-5 bg-[#050706]/[0.94] px-6 py-10 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[76vh]"
          >
            <div className="relative h-[76vh] w-[calc(76vh*1080/2400)] overflow-hidden rounded-[1.6rem] border border-white/[0.12] bg-black">
              <Image src={shot.src} alt={shot.alt} fill className="object-contain" sizes="(max-width: 768px) 90vw, 40vw" />
            </div>
          </m.div>
          <div className="text-center">
            <p className="font-manrope text-sm font-bold text-white">{shot.label}</p>
            {shot.note && <p className="mt-1 font-manrope text-xs text-white/45">{shot.note}</p>}
          </div>
          <button
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/* ── Sticky feature showcase ─────────────────────────────────────────────── */
type Feature = { src: string; alt: string; kicker: string; title: string; body: string; points: string[] };

function FeatureBlock({
  feature,
  active,
  dim,
  innerRef,
}: {
  feature: Feature;
  active: boolean;
  dim: boolean;
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={innerRef} className="lg:min-h-[88vh] lg:flex lg:flex-col lg:justify-center py-14 lg:py-0">
      <m.div
        animate={{ opacity: dim ? 0.3 : 1 }}
        transition={{ duration: 0.45 }}
        className="lg:pl-10 lg:border-l lg:border-white/[0.08] relative"
      >
        <span
          className="absolute -left-[6px] top-1.5 hidden h-3 w-3 rounded-full transition-all duration-500 lg:block"
          style={{ background: active ? LIME : "rgba(255,255,255,0.12)", boxShadow: active ? `0 0 22px ${LIME}` : "none" }}
        />
        <span className="font-dmmono text-[10px] uppercase tracking-[0.34em]" style={{ color: AQUA }}>
          {feature.kicker}
        </span>
        <h3 className="font-manrope mt-4 text-[1.85rem] font-bold leading-[1.1] tracking-[-0.03em] text-white md:text-[2.5rem]">
          {feature.title}
        </h3>
        <p className="font-manrope mt-4 max-w-lg text-[15px] leading-relaxed text-white/45">{feature.body}</p>
        <ul className="mt-7 space-y-3">
          {feature.points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <svg
                className="mt-[3px] shrink-0"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke={LIME}
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="font-manrope text-[14px] leading-relaxed text-white/65">{p}</span>
            </li>
          ))}
        </ul>

        {/* mobile: the screen travels with its copy */}
        <div className="mt-9 flex justify-center lg:hidden">
          <Phone src={feature.src} alt={feature.alt} className="w-[240px]" />
        </div>
      </m.div>
    </div>
  );
}

export function StickyShowcase({ features }: { features: Feature[] }) {
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  // Kept separate so it can never be skipped by the observer effect below.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Active block = the one whose centre sits closest to the viewport centre.
  // The observer is only the trigger; the winner is measured directly, so gaps
  // between blocks and mid-scroll resizes both resolve to a single sane answer.
  useEffect(() => {
    const els = blocks.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const pick = () => {
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      blocks.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive((prev) => (prev === best ? prev : best));
    };

    const io = new IntersectionObserver(pick, {
      rootMargin: "-45% 0px -45% 0px",
      threshold: [0, 0.5, 1],
    });
    els.forEach((el) => io.observe(el));
    pick();

    window.addEventListener("resize", pick);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", pick);
    };
  }, [features.length]);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-0 px-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-16">
      {/* sticky device */}
      <div className="hidden lg:block">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="relative">
            <div
              className="absolute -inset-16 rounded-full blur-[80px] opacity-45"
              style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.22), transparent 70%)" }}
            />
            {/* All four are mounted and crossfaded — swaps are instant and there is
                no exit-animation handshake to stall on. */}
            <div className="relative w-[300px]" style={{ aspectRatio: "1080 / 2400" }}>
              {features.map((f, i) => (
                <m.div
                  key={f.src}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    y: i === active ? 0 : 18,
                    scale: i === active ? 1 : 0.97,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ pointerEvents: i === active ? "auto" : "none" }}
                >
                  <Phone src={f.src} alt={f.alt} className="w-[300px]" />
                </m.div>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {features.map((f, i) => (
                <span
                  key={f.title}
                  className="h-[3px] rounded-full transition-all duration-500"
                  style={{ width: i === active ? 30 : 12, background: i === active ? LIME : "rgba(255,255,255,0.16)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trailing room so the last feature stays pinned for a full beat — without it
          the sticky column runs out while the final block is still becoming active. */}
      <div className="lg:pb-[40vh]">
        {features.map((f, i) => (
          <FeatureBlock
            key={f.title}
            feature={f}
            active={i === active}
            dim={isDesktop && i !== active}
            innerRef={(el) => {
              blocks.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Full screen gallery (snap rail) ─────────────────────────────────────── */
export function ScreenRail({ screens }: { screens: { src: string; alt: string; label: string; note: string }[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<null | (typeof screens)[number]>(null);

  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="mg-rail flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 pt-2 md:gap-8 md:px-[max(1.5rem,calc((100vw-72rem)/2))]"
      >
        {screens.map((s, i) => (
          <Reveal key={s.src} delay={Math.min(i, 4) * 0.05}>
            <figure className="snap-center">
              <Phone
                src={s.src}
                alt={s.alt}
                className="w-[186px] md:w-[212px] transition-transform duration-500 hover:-translate-y-2"
                onClick={() => setOpen(s)}
              />
              <figcaption className="mt-5 w-[186px] md:w-[212px]">
                <p className="font-manrope text-[13px] font-bold text-white/90">{s.label}</p>
                <p className="font-manrope mt-1 text-[12px] leading-snug text-white/45">{s.note}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          onClick={() => nudge(-1)}
          aria-label="Previous screens"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/55 backdrop-blur transition hover:border-[#C6F24E]/35 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18 9 12l6-6" />
          </svg>
        </button>
        <span className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-white/50">drag · or tap a screen</span>
        <button
          onClick={() => nudge(1)}
          aria-label="Next screens"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/55 backdrop-blur transition hover:border-[#C6F24E]/35 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <Lightbox shot={open} onClose={() => setOpen(null)} />
    </div>
  );
}

/* ── Version 1 archive strip ─────────────────────────────────────────────── */
export function ArchiveRail({ shots, ground = "#F4F3ED" }: { shots: { src: string; alt: string; label: string }[]; ground?: string }) {
  const [open, setOpen] = useState<null | { src: string; alt: string; label: string; note?: string }>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.75, 600), behavior: "smooth" });
  };

  return (
    <>
      <div className="relative">
        <div ref={railRef} className="mg-rail flex snap-x gap-3 overflow-x-auto pb-3 sm:gap-3.5">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={Math.min(i, 8) * 0.04}>
              <button
                onClick={() => setOpen({ ...s, note: "Version 1 · WebView wrapper" })}
                className="group block shrink-0 snap-start text-left"
              >
                <div className="relative aspect-[1080/2400] w-[104px] overflow-hidden rounded-xl border border-[#12161A]/[0.12] bg-[#0C100E] shadow-[0_10px_24px_-14px_rgba(18,22,26,0.5)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_-18px_rgba(18,22,26,0.55)] sm:w-[124px]">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover opacity-80 grayscale-[0.55] transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    sizes="130px"
                  />
                </div>
                <p className="font-dmmono mt-2.5 w-[104px] truncate text-[9.5px] uppercase tracking-[0.14em] text-[#12161A]/60 transition-colors group-hover:text-[#12161A]/75 sm:w-[124px]">
                  {s.label}
                </p>
              </button>
            </Reveal>
          ))}
        </div>

        {/* edge fades, so the strip reads as continuing past the frame */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-14"
          style={{ background: `linear-gradient(90deg, ${ground}, transparent)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-14"
          style={{ background: `linear-gradient(270deg, ${ground}, transparent)` }}
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => nudge(-1)}
          aria-label="Previous version 1 screens"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#12161A]/15 text-[#12161A]/60 transition hover:border-[#12161A]/35 hover:text-[#12161A]"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18 9 12l6-6" />
          </svg>
        </button>
        <button
          onClick={() => nudge(1)}
          aria-label="Next version 1 screens"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#12161A]/15 text-[#12161A]/60 transition hover:border-[#12161A]/35 hover:text-[#12161A]"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
        <span className="font-dmmono text-[10px] uppercase tracking-[0.24em] text-[#12161A]/60">drag the strip · tap to enlarge</span>
      </div>

      <Lightbox shot={open} onClose={() => setOpen(null)} />
    </>
  );
}

/* ── V1 → V2 capability ledger ───────────────────────────────────────────── */
export function CapabilityLedger({
  rows,
}: {
  rows: { capability: string; why: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#12161A]/10 bg-white/55 backdrop-blur-sm">
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[#12161A]/10 bg-[#12161A]/[0.03] px-5 py-3.5 md:px-8">
        <span className="font-dmmono text-[10px] uppercase tracking-[0.28em] text-[#12161A]/60">Capability</span>
        <span className="font-dmmono w-16 text-center text-[10px] uppercase tracking-[0.16em] text-[#12161A]/60">V1</span>
        <span className="font-dmmono w-16 text-center text-[10px] uppercase tracking-[0.16em] text-[#12161A]/60">V2</span>
      </div>
      {rows.map((r, i) => (
        <FadeIn key={r.capability} delay={i * 0.06}>
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[#12161A]/[0.07] px-5 py-4 last:border-0 md:px-8 md:py-5">
            <div>
              <p className="font-manrope text-[15px] font-bold text-[#12161A] md:text-base">{r.capability}</p>
              <p className="font-manrope mt-1 text-[13px] leading-snug text-[#12161A]/60">{r.why}</p>
            </div>
            <span className="flex w-16 justify-center">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12161A]/[0.06] text-[#12161A]/60">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </span>
            </span>
            <span className="flex w-16 justify-center">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#12161A]"
                style={{ background: LIME }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </span>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ── Palette strip ───────────────────────────────────────────────────────── */
export function PaletteStrip({ tokens }: { tokens: { hex: string; name: string; role: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {tokens.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.05}>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3">
            <div
              className="mb-3 h-16 w-full rounded-xl border border-white/10"
              style={{ background: t.hex, boxShadow: `inset 0 -18px 30px -20px rgba(0,0,0,0.6)` }}
            />
            <p className="font-manrope text-[13px] font-bold text-white/90">{t.name}</p>
            <p className="font-dmmono mt-0.5 text-[10px] uppercase tracking-wider text-white/45">{t.hex}</p>
            <p className="font-manrope mt-1.5 text-[11px] leading-snug text-white/45">{t.role}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Native surface cards (on lime) ──────────────────────────────────────── */
export function NativeSurfaces({
  items,
}: {
  items: { icon: ReactNode; title: string; body: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.06}>
          <div className="mg-ink-card group h-full rounded-3xl bg-[#0E1310] p-7">
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: "rgba(198,242,78,0.12)", border: "1px solid rgba(198,242,78,0.22)" }}
            >
              {it.icon}
            </div>
            <h4 className="font-manrope text-[17px] font-bold text-white">{it.title}</h4>
            <p className="font-manrope mt-2.5 text-[13.5px] leading-relaxed text-white/45">{it.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Engineering note cards ──────────────────────────────────────────────── */
export function NoteCard({
  index,
  title,
  children,
  pull,
}: {
  index: string;
  title: string;
  children: ReactNode;
  pull?: string;
}) {
  return (
    <div className="mg-note relative h-full overflow-hidden rounded-3xl border border-[#12161A]/10 bg-white/60 p-7 backdrop-blur-sm md:p-9">
      <span className="font-anton absolute -right-2 -top-6 select-none text-[6rem] leading-none text-[#12161A]/[0.05]">
        {index}
      </span>
      <h3 className="font-manrope relative text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-[#12161A] md:text-[1.4rem]">
        {title}
      </h3>
      <div className="font-manrope relative mt-4 space-y-3.5 text-[14px] leading-relaxed text-[#12161A]/60">{children}</div>
      {pull && (
        <p className="font-serif relative mt-6 border-l-2 pl-4 text-[15px] italic leading-relaxed text-[#12161A]/75" style={{ borderColor: LIME }}>
          {pull}
        </p>
      )}
    </div>
  );
}

/* ── Stat ────────────────────────────────────────────────────────────────── */
export function Stat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="text-center">
      <p className="font-manrope text-[2.1rem] font-extrabold leading-none tracking-[-0.045em] text-[#12161A] md:text-[3rem]">
        {value}
      </p>
      <p className="font-manrope mt-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#12161A]/70">{label}</p>
      {sub && <p className="font-manrope mt-0.5 text-[11.5px] text-[#12161A]/60">{sub}</p>}
    </div>
  );
}
