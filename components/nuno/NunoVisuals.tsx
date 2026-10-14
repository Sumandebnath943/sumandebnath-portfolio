"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { NU, THEMES, type Shot } from "@/components/nuno/nuno-data";

/* ─────────────────────────────────────────────────────────────────────────
   ThemeShowcase — the seven themes as tabs, and the section repaints itself
   in whichever theme is selected, which is the claim being made: a theme
   restyles the whole thing, not just the cards.

   All seven panels are in the server-rendered HTML. Inactive ones carry the
   `hidden` attribute rather than being conditionally rendered, so a crawler
   or a reader without JavaScript still gets every theme's copy — and their
   lazy images are not fetched until a panel is opened, because a hidden
   image is never near the viewport.
   ──────────────────────────────────────────────────────────────────────── */
export function ThemeShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = THEMES[active];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + THEMES.length) % THEMES.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div
      className="rounded-[2rem] p-4 sm:p-6 md:p-8 transition-colors duration-500"
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, ${t.glow}22, transparent 55%), ${t.ground}`,
        border: `2.5px solid ${NU.ink}`,
        boxShadow: `0 8px 0 0 ${NU.ink}, 0 50px 100px -50px rgba(0,0,0,0.9)`,
      }}
    >
      {/* tabs */}
      <div role="tablist" aria-label="NUNO themes" onKeyDown={onKey} className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {THEMES.map((th, i) => {
          const on = i === active;
          return (
            <button
              key={th.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`nu-theme-tab-${th.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`nu-theme-panel-${th.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-manrope font-bold text-[13px] transition-transform hover:-translate-y-0.5"
              style={{
                background: on ? th.glow : "rgba(255,248,234,0.08)",
                color: on ? NU.ink : NU.text,
                border: `2px solid ${on ? NU.ink : "rgba(255,248,234,0.16)"}`,
                boxShadow: on ? `0 3px 0 0 ${NU.ink}` : "none",
              }}
            >
              <span aria-hidden>{th.emoji}</span>
              {th.title}
            </button>
          );
        })}
      </div>

      {THEMES.map((th, i) => (
        // `hidden` sits on a wrapper with no display utility: Tailwind's `grid`
        // class outranks the browser's [hidden] rule, and on the same element it
        // rendered all seven panels at once.
        <div
          key={th.id}
          id={`nu-theme-panel-${th.id}`}
          role="tabpanel"
          aria-labelledby={`nu-theme-tab-${th.id}`}
          hidden={i !== active}
        >
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
          {/* pictures */}
          <div className="min-w-0">
            <ThemeFrame shot={th.table} label={`${th.title} · at the table`} glow={th.glow} />
            <div className="grid grid-cols-2 gap-3 mt-3">
              <ThemeFrame shot={th.home} label="home" glow={th.glow} small />
              {th.cutin && <ThemeFrame shot={th.cutin} label={th.id === "classic" ? "splash" : "cut-in"} glow={th.glow} small />}
            </div>
          </div>

          {/* the theme, in words */}
          <div className="min-w-0">
            <p className="font-dmmono text-[10.5px] uppercase tracking-[0.22em]" style={{ color: th.glow }}>
              {th.inspired ? `Inspired by ${th.inspired}` : "The original"}
              {th.edition ? ` · ${th.edition}` : ""}
            </p>
            <h3 className="font-manrope font-extrabold text-[2rem] md:text-[2.4rem] leading-[1.02] tracking-[-0.03em] mt-2" style={{ color: NU.text }}>
              {th.emoji} {th.title}
            </h3>
            <p className="font-serif italic text-[1.25rem] leading-snug mt-2" style={{ color: th.glow }}>
              {th.tagline}
            </p>
            <p className="font-manrope text-[14px] leading-relaxed mt-4" style={{ color: "rgba(255,248,234,0.78)" }}>
              {th.look}
            </p>

            <ul className="mt-5 space-y-2.5">
              {th.twists.map((tw) => (
                <li key={tw} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-[3px] shrink-0 mt-[7px] rotate-45" style={{ background: th.glow }} />
                  <span className="font-manrope text-[13.5px] leading-snug" style={{ color: NU.text }}>{tw}</span>
                </li>
              ))}
            </ul>

            {th.moves && (
              <div className="mt-6 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,248,234,0.14)" }}>
                <p className="font-dmmono text-[10px] uppercase tracking-[0.22em] px-4 py-2.5" style={{ color: "rgba(255,248,234,0.7)", background: "rgba(255,248,234,0.06)" }}>
                  The plays, renamed
                </p>
                {th.moves.map((mv) => (
                  <div key={mv.play} className="grid grid-cols-[88px_1fr] gap-3 px-4 py-2" style={{ borderTop: "1px solid rgba(255,248,234,0.08)" }}>
                    <span className="font-dmmono text-[11px] uppercase tracking-[0.12em] pt-0.5" style={{ color: "rgba(255,248,234,0.62)" }}>{mv.play}</span>
                    <span className="font-manrope font-bold text-[13.5px]" style={{ color: NU.text }}>{mv.name}</span>
                  </div>
                ))}
              </div>
            )}

            {th.ranks && (
              <div className="mt-5">
                <p className="font-dmmono text-[10px] uppercase tracking-[0.22em] mb-2.5" style={{ color: "rgba(255,248,234,0.7)" }}>
                  {th.rankLabel ?? "Rank"} · as the hand shrinks
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {th.ranks.map((r, k) => (
                    <span key={r} className="inline-flex items-center gap-1.5">
                      <span
                        className="font-manrope font-bold text-[12px] rounded-full px-2.5 py-1"
                        style={
                          k === th.ranks!.length - 1
                            ? { background: th.glow, color: NU.ink }
                            : { background: "rgba(255,248,234,0.1)", color: NU.text }
                        }
                      >
                        {r}
                      </span>
                      {k < th.ranks!.length - 1 && <span aria-hidden style={{ color: "rgba(255,248,234,0.45)" }}>→</span>}
                    </span>
                  ))}
                </div>
                {th.rankNote && (
                  <p className="font-manrope text-[12px] leading-snug mt-2.5" style={{ color: "rgba(255,248,234,0.66)" }}>{th.rankNote}</p>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="font-dmmono text-[10.5px] rounded-full px-3 py-1.5" style={{ background: "rgba(255,248,234,0.08)", color: NU.text }}>
                Display face · {th.font}
              </span>
              <span className="font-dmmono text-[10.5px] rounded-full px-3 py-1.5" style={{ background: "rgba(255,248,234,0.08)", color: NU.text }}>
                {th.characters ? `${th.characters} characters` : "Emoji bots"}
              </span>
            </div>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}

function ThemeFrame({ shot, label, glow, small = false }: { shot: Shot; label: string; glow: string; small?: boolean }) {
  return (
    <figure
      className="rounded-2xl overflow-hidden"
      style={{ border: `2.5px solid ${NU.ink}`, boxShadow: `0 ${small ? 4 : 6}px 0 0 ${NU.ink}`, background: NU.ink }}
    >
      <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          loading="lazy"
          sizes={small ? "(max-width: 1024px) 50vw, 300px" : "(max-width: 1024px) 100vw, 620px"}
          className="object-cover"
        />
      </div>
      <figcaption className="flex items-center gap-2 px-3 py-1.5" style={{ background: NU.ink }}>
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: glow }} />
        <span className="font-dmmono text-[9.5px] uppercase tracking-[0.18em] truncate min-w-0" style={{ color: "rgba(255,248,234,0.72)" }}>{label}</span>
      </figcaption>
    </figure>
  );
}
