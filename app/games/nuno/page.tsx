import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageAnswer from "@/components/ui/PageAnswer";
import BannerArt from "@/components/ui/BannerArt";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import Contact from "@/components/sections/Contact";
import PageFaq from "@/components/ui/PageFaq";
import HeroLock from "@/components/ui/HeroLock";
import { Reveal } from "@/components/penta/PentaWidgets";
import { ThemeShowcase } from "@/components/nuno/NunoVisuals";
import {
  NU,
  LINKS,
  IMG,
  HERO,
  STATS,
  NEEDS_NOTHING,
  MODES,
  LAUNCHER_ODDS,
  SPIN_SPACES,
  REDACTION,
  TABLE_POINTS,
  PHONE_POINTS,
  THEMES,
  SOUNDS,
  BOTS,
  DECISIONS,
  GALLERY,
  NOTES,
  CONSTRAINTS,
  POSTSCRIPTS,
  STACK,
  type Shot,
  type ModeHue,
} from "@/components/nuno/nuno-data";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
const PATH = "/games/nuno";

export const metadata: Metadata = {
  title: "NUNO · A card game night with no server",
  description:
    "NUNO is a browser card game on the official rules of UNO and five of its spin-offs, for 2–10 players. Play bots on three difficulties or send friends a link — there is no game server: the host’s browser runs the game over WebRTC and each phone only ever sees its own cards. Seven themes, synthesised sound, 100 tests.",
  keywords: [
    "NUNO", "browser card game", "UNO rules", "UNO No Mercy", "UNO Flip", "peer-to-peer game",
    "WebRTC multiplayer", "PeerJS", "party card game", "play with friends online", "Suman Debnath",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: "NUNO · A card game night with no server",
    description:
      "Six official rule sets, 2–10 players, bots for the empty seats and voice chat — and the host’s phone is the referee. Seven themes, zero audio files.",
    url: `${SITE}${PATH}`,
    images: [{ url: IMG.og.src, width: IMG.og.w, height: IMG.og.h, alt: IMG.og.alt }],
  },
};

/* ── Schema ─────────────────────────────────────────────────────────────── */
const gameLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "NUNO",
  description:
    "A browser card game that plays the official rules of UNO and five of its spin-offs — Classic, No Mercy, Flip, Attack, All Wild and Spin — for 2 to 10 players, against bots or friends. Multiplayer is peer-to-peer: the host’s browser runs the game and every player connects to it directly over WebRTC.",
  url: `${SITE}${PATH}`,
  genre: ["Card game", "Party game"],
  gamePlatform: "Web browser",
  applicationCategory: "Game",
  operatingSystem: "Any modern browser, desktop or phone",
  playMode: ["SinglePlayer", "MultiPlayer"],
  numberOfPlayers: { "@type": "QuantitativeValue", minValue: 2, maxValue: 10 },
  image: `${SITE}${IMG.og.src}`,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", url: LINKS.live },
};
const articleLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "NUNO — a card game night with no server: six official rule sets, peer-to-peer over WebRTC, built in three days",
  author: { "@type": "Person", name: "Suman Debnath" },
  publisher: { "@type": "Person", name: "Suman Debnath" },
  description:
    "How a browser card game runs six official rule sets on one pure rules engine, keeps hands secret with no server by sending each phone a view redacted for its seat, holds its bots until the table has finished animating, and survives phones switching apps.",
  mainEntityOfPage: `${SITE}${PATH}`,
};

/* ── Page-scoped motion. Every entrance uses `backwards`, never `both`
      (PROJECT_BIBLE §5 trap 4), and all of it stops under reduced motion. ── */
const CSS = `
.nu-tile{transform:rotate(var(--r));animation:nu-slam .55s cubic-bezier(.2,1.5,.4,1) var(--d) backwards,nu-wobble .5s ease-in-out 1.55s}
.nu-tile-o{transform:rotate(var(--r));animation:nu-late .75s cubic-bezier(.2,1.25,.4,1) 1.05s backwards}
@keyframes nu-slam{0%{opacity:0;transform:translateY(-70px) rotate(var(--r)) scale(1.45)}100%{opacity:1;transform:rotate(var(--r))}}
@keyframes nu-late{0%{opacity:0;transform:translateX(160px) rotate(420deg) scale(.5)}100%{opacity:1;transform:rotate(var(--r))}}
@keyframes nu-wobble{0%,100%{transform:rotate(var(--r))}30%{transform:rotate(calc(var(--r) - 9deg)) translateX(-4px)}65%{transform:rotate(calc(var(--r) + 5deg))}}
@keyframes nu-spin{to{transform:rotate(360deg)}}
@keyframes nu-sweep{from{transform:translateX(0)}to{transform:translateX(1600%)}}
@keyframes nu-blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes nu-buzz{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
.nu-card{transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s}
.nu-card:hover{transform:translateY(-4px)}
.nu-btn{transition:transform .2s ease,box-shadow .2s ease}
.nu-btn:hover{transform:translateY(-2px)}
.nu-btn:active{transform:translateY(2px);box-shadow:0 1px 0 0 ${NU.ink}!important}
@media (prefers-reduced-motion:reduce){.nu-tile,.nu-tile-o,.nu-anim{animation:none!important}.nu-card,.nu-btn{transition:none}}
`;

/* ═════════════════════════════ small building blocks ═════════════════════ */
const CARD_FILLS = [
  { bg: NU.redDeep, fg: "#ffffff" },
  { bg: NU.yellow, fg: NU.ink },
  { bg: NU.green, fg: NU.ink },
  { bg: NU.blueDeep, fg: "#ffffff" },
] as const;

const MODE_HEAD: Record<ModeHue, { bg: string; fg: string }> = {
  red: { bg: NU.redDeep, fg: "#ffffff" },
  ink: { bg: "#0b0920", fg: "#ffffff" },
  violet: { bg: "#5b35c4", fg: "#ffffff" },
  orange: { bg: "#ff8a1f", fg: NU.ink },
  rainbow: { bg: `linear-gradient(100deg, ${NU.red}, ${NU.yellow} 38%, ${NU.green} 66%, ${NU.blue})`, fg: NU.ink },
  yellow: { bg: NU.yellow, fg: NU.ink },
};

/** Hard "toy box" shadow — the game's own signature: an ink outline and an offset that never blurs. */
const toy = (y = 5) => ({ border: `2.5px solid ${NU.ink}`, boxShadow: `0 ${y}px 0 0 ${NU.ink}` });

function SectionLabel({ index, kicker, light = false }: { index: string; kicker: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="font-dmmono text-[11px] font-semibold rounded-md px-1.5 py-0.5 leading-none"
        style={{ background: light ? NU.ink : NU.yellow, color: light ? NU.cream : NU.ink }}
      >
        {index}
      </span>
      <span className="flex gap-1" aria-hidden>
        {[NU.red, NU.yellow, NU.green, NU.blue].map((c) => (
          <span key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
        ))}
      </span>
      <span className="font-dmmono text-[10.5px] uppercase tracking-[0.28em]" style={{ color: light ? NU.inkMuted : NU.muted }}>
        {kicker}
      </span>
    </div>
  );
}

/** Two registers: a bold sans phrase, then a serif italic one. */
function Headline({ a, b, light = false, accent }: { a: string; b: string; light?: boolean; accent?: string }) {
  return (
    <h2 className="font-manrope font-extrabold text-[2.1rem] md:text-[3.2rem] leading-[1.02] tracking-[-0.035em] mb-5">
      <span style={{ color: light ? NU.ink : NU.text }}>{a}</span>
      <br />
      <span className="font-serif italic font-normal tracking-[-0.01em]" style={{ color: accent ?? (light ? NU.redDeep : NU.yellow) }}>
        {b}
      </span>
    </h2>
  );
}

/** A desktop screenshot in a chunky card-table frame: cream title bar, four card-colour pips, ink outline. */
function Frame({
  shot,
  label,
  aspect,
  focus = "center",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 640px",
  className = "",
}: {
  shot: Shot;
  label: string;
  aspect?: string;
  focus?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={`rounded-[1.25rem] overflow-hidden flex flex-col min-w-0 ${className}`} style={{ ...toy(7), background: NU.ink }}>
      <figcaption className="flex items-center gap-2.5 px-3.5 py-2 shrink-0" style={{ background: NU.cream, borderBottom: `2.5px solid ${NU.ink}` }}>
        <span className="flex gap-1 shrink-0" aria-hidden>
          {[NU.red, NU.yellow, NU.green, NU.blue].map((c) => (
            <span key={c} className="w-2 h-2 rounded-full" style={{ background: c, border: `1.5px solid ${NU.ink}` }} />
          ))}
        </span>
        <span className="font-dmmono text-[10.5px] uppercase tracking-[0.14em] truncate min-w-0" style={{ color: NU.ink }}>{label}</span>
      </figcaption>
      {aspect ? (
        <div className="relative w-full flex-1" style={{ aspectRatio: aspect }}>
          <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : "lazy"} className="object-cover" style={{ objectPosition: focus }} />
        </div>
      ) : (
        <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes={sizes} priority={priority} loading={priority ? undefined : "lazy"} className="w-full h-auto block" />
      )}
    </figure>
  );
}

/** A phone screenshot in an ink device frame, 9:20 like the captures. */
function PhoneFrame({ shot, sizes = "220px", className = "" }: { shot: Shot; sizes?: string; className?: string }) {
  return (
    <div className={`rounded-[2rem] p-[6px] ${className}`} style={{ background: NU.ink, boxShadow: `0 7px 0 0 #0b0920, 0 40px 70px -35px rgba(0,0,0,0.75)` }}>
      <div className="relative w-full overflow-hidden rounded-[1.6rem]" style={{ aspectRatio: "720 / 1600" }}>
        <Image src={shot.src} alt={shot.alt} fill sizes={sizes} loading="lazy" className="object-cover" />
      </div>
    </div>
  );
}

/** The game's own logo, rebuilt in CSS: N, U, N slam down — the O arrives late and knocks them wobbling. */
function NunoTiles() {
  const tiles = [
    { l: "N", c: NU.red, r: "-7deg", d: "0.05s" },
    { l: "U", c: NU.yellow, r: "4deg", d: "0.25s" },
    { l: "N", c: NU.green, r: "-3deg", d: "0.45s" },
    { l: "O", c: NU.blue, r: "8deg", d: "0s", late: true },
  ];
  return (
    <div className="flex justify-center gap-1.5 sm:gap-2.5" aria-hidden>
      {tiles.map((t, i) => (
        <span
          key={i}
          className={`${t.late ? "nu-tile-o" : "nu-tile"} inline-flex items-center justify-center rounded-[14px] sm:rounded-[18px] w-[58px] h-[72px] sm:w-[78px] sm:h-[96px] md:w-[90px] md:h-[110px]`}
          style={{
            ["--r" as string]: t.r,
            ["--d" as string]: t.d,
            background: `linear-gradient(160deg, rgba(255,255,255,0.28), transparent 55%), ${t.c}`,
            border: "4px solid #ffffff",
            boxShadow: `0 0 0 3px ${NU.ink}, 0 9px 0 3px ${NU.ink}`,
          }}
        >
          <span
            className="font-manrope font-extrabold text-[2.6rem] sm:text-[3.4rem] md:text-[4rem] leading-none"
            style={{ color: "#ffffff", WebkitTextStroke: `5px ${NU.ink}`, paintOrder: "stroke fill" }}
          >
            {t.l}
          </span>
        </span>
      ))}
    </div>
  );
}

function Chip({ children, tone = "cream" }: { children: React.ReactNode; tone?: "cream" | "dark" }) {
  return (
    <span
      className="font-dmmono text-[11px] md:text-[11.5px] rounded-full px-3 py-1.5 whitespace-nowrap"
      style={
        tone === "cream"
          ? { background: NU.cream, color: NU.ink, border: `2px solid ${NU.ink}`, boxShadow: "0 3px 0 0 rgba(0,0,0,0.45)" }
          : { background: "rgba(255,248,234,0.08)", color: NU.text, border: `1px solid ${NU.line}` }
      }
    >
      {children}
    </span>
  );
}

/** Spin's nine-space wheel, every space equally likely. */
function SpinWheel() {
  const n = SPIN_SPACES.length;
  const fills = [NU.red, NU.yellow, NU.green, NU.blue, NU.red, NU.yellow, NU.green, NU.blue, "#0b0920"];
  const text = ["#fff", NU.ink, NU.ink, "#fff", "#fff", NU.ink, NU.ink, "#fff", "#fff"];
  const R = 100;
  const pt = (a: number, r: number) => [Math.sin(a) * r, -Math.cos(a) * r];
  return (
    <div className="grid grid-cols-[132px_1fr] gap-5 items-center">
      <div className="relative w-[132px] h-[132px]">
        <svg viewBox="-112 -112 224 224" className="nu-anim w-full h-full" style={{ animation: "nu-spin 36s linear infinite" }} role="img" aria-label="The Spin wheel: nine equal spaces">
          {SPIN_SPACES.map((_, i) => {
            const a0 = (i / n) * Math.PI * 2;
            const a1 = ((i + 1) / n) * Math.PI * 2;
            const [x0, y0] = pt(a0, R);
            const [x1, y1] = pt(a1, R);
            const [tx, ty] = pt((a0 + a1) / 2, 68);
            return (
              <g key={i}>
                <path d={`M0 0 L${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} Z`} fill={fills[i]} stroke={NU.ink} strokeWidth="3" />
                <text x={tx} y={ty + 7} textAnchor="middle" fontSize="20" fontWeight="800" fill={text[i]} fontFamily="var(--font-manrope)">
                  {i + 1}
                </text>
              </g>
            );
          })}
          <circle r="20" fill={NU.cream} stroke={NU.ink} strokeWidth="4" />
        </svg>
        <span aria-hidden className="absolute left-1/2 -top-1 -translate-x-1/2 w-0 h-0" style={{ borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: `16px solid ${NU.cream}` }} />
      </div>
      <ol className="grid grid-cols-1 gap-y-1">
        {SPIN_SPACES.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className="font-anton text-[13px] w-4 text-right" style={{ color: NU.faint }}>{i + 1}</span>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: fills[i], border: "1px solid rgba(255,248,234,0.4)" }} />
            <span className="font-manrope text-[12.5px]" style={{ color: NU.text }}>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A tiny step sequencer — the shape of the thing that writes all eight soundtracks. */
function Sequencer() {
  const rows = [
    { name: "kick", c: NU.red, on: [0, 4, 8, 11, 12] },
    { name: "snare", c: NU.yellow, on: [4, 12] },
    { name: "hat", c: NU.green, on: [0, 2, 4, 6, 8, 10, 12, 14] },
    { name: "bass", c: NU.blueLight, on: [0, 3, 6, 8, 10, 13] },
  ];
  return (
    <div className="rounded-2xl p-4 md:p-5" style={{ background: NU.nightDeep, border: `1px solid ${NU.line}` }} role="img" aria-label="A four-track, sixteen-step sequencer pattern">
      <div className="relative">
        <span
          aria-hidden
          className="nu-anim absolute top-0 bottom-0 left-[56px] rounded-md"
          style={{ width: "calc((100% - 56px) / 16)", background: "rgba(255,248,234,0.14)", animation: "nu-sweep 3.2s steps(16) infinite" }}
        />
        {rows.map((r) => (
          <div key={r.name} className="relative grid grid-cols-[56px_repeat(16,minmax(0,1fr))] gap-[3px] mb-[3px] items-center">
            <span className="font-dmmono text-[10px] uppercase tracking-[0.14em]" style={{ color: NU.faint }}>{r.name}</span>
            {Array.from({ length: 16 }, (_, i) => (
              <span
                key={i}
                className="h-4 md:h-5 rounded-[3px]"
                style={{ background: r.on.includes(i) ? r.c : i % 4 === 0 ? "rgba(255,248,234,0.1)" : "rgba(255,248,234,0.05)" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ═════════════════════════════════════════════════════════════════════════ */
export default function NunoPage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Navigation />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <main className="relative min-h-screen font-manrope overflow-x-hidden" style={{ background: NU.night, color: NU.text }}>
        {/* ════════════════════════════ HERO ════════════════════════════ */}
        <section
          className="relative sd-banner-host"
          style={{ background: `radial-gradient(120% 80% at 50% 0%, #2a2470 0%, ${NU.night} 48%, ${NU.nightDeep} 100%)` }}
        >
          <BannerArt seed={PATH} accent={NU.yellow} />
          <HeroLock />
          {/* the game's sunburst, very faint */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.16]"
            style={{
              background: `repeating-conic-gradient(from 0deg at 50% 38%, ${NU.red} 0deg 6deg, transparent 6deg 15deg, ${NU.yellow} 15deg 21deg, transparent 21deg 30deg, ${NU.green} 30deg 36deg, transparent 36deg 45deg, ${NU.blue} 45deg 51deg, transparent 51deg 60deg)`,
              WebkitMaskImage: "radial-gradient(70% 60% at 50% 38%, #000 0%, transparent 75%)",
              maskImage: "radial-gradient(70% 60% at 50% 38%, #000 0%, transparent 75%)",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-10 md:pt-36 md:pb-14 text-center">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 font-dmmono text-[10px] md:text-[11px] uppercase tracking-[0.22em] rounded-full px-3.5 py-1.5"
                style={{ background: NU.panel, color: NU.text, border: `1px solid ${NU.line}` }}
              >
                <span className="nu-anim w-1.5 h-1.5 rounded-full" style={{ background: NU.yellow, animation: "nu-blink 1.6s steps(1) infinite" }} />
                {HERO.kicker}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <Breadcrumbs
                trail={[
                  { label: "Games", href: null },
                  { label: "NUNO", href: PATH },
                ]}
                align="center"
                className="mt-5 mb-8"
              />
            </Reveal>

            <NunoTiles />

            <Reveal delay={0.08}>
              <h1 className="font-manrope font-extrabold text-[2.5rem] sm:text-[3.6rem] md:text-[4.6rem] leading-[0.98] tracking-[-0.04em] mt-10 mb-6">
                <span className="sr-only">NUNO: </span>
                <span style={{ color: NU.text }}>A card game night</span>
                <br />
                <span className="font-serif italic font-normal tracking-[-0.015em]" style={{ color: NU.yellow }}>with no server.</span>
              </h1>

              <PageAnswer href={PATH} />
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-[0.98rem] md:text-[1.1rem] leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: "rgba(255,248,234,0.8)" }}>
                {HERO.pitch}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {HERO.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={LINKS.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nu-btn group inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-manrope font-extrabold text-[15px]"
                  style={{ background: NU.yellow, color: NU.ink, ...toy(5) }}
                >
                  🃏 Play NUNO now
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <span
                  className="inline-flex items-center gap-2 font-dmmono text-[11px] rounded-full px-3.5 py-2"
                  style={{ background: "rgba(46,179,79,0.14)", color: NU.greenLight, border: "1px solid rgba(95,210,122,0.35)" }}
                >
                  <span className="nu-anim w-1.5 h-1.5 rounded-full" style={{ background: NU.greenLight, animation: "nu-blink 1.6s steps(1) infinite" }} />
                  Live · nuno-lemon.vercel.app
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="font-dmmono text-[11px] mt-7 tracking-[0.04em]" style={{ color: "rgba(255,248,234,0.6)" }}>
                {HERO.built}
              </p>
            </Reveal>
          </div>

          {/* framed product shot, with the phone version tucked against it */}
          <div className="relative max-w-6xl mx-auto px-6 pb-6">
            <Reveal delay={0.1}>
              <div className="relative lg:pr-24">
                <div aria-hidden className="absolute -inset-8 rounded-[2.5rem] blur-3xl opacity-40 pointer-events-none" style={{ background: "radial-gradient(60% 60% at 50% 45%, rgba(46,179,79,0.45), transparent 70%)" }} />
                <Frame shot={IMG.table} label="nuno · classic · your turn" priority sizes="(max-width: 1024px) 100vw, 1000px" className="relative" />
                <PhoneFrame shot={IMG.phoneTable} sizes="190px" className="hidden lg:block absolute right-0 -bottom-10 w-[190px]" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ STAT BAND ════════════════════════════ */}
        <section className="relative px-6 py-14 mt-12" style={{ background: NU.yellow, borderTop: `3px solid ${NU.ink}`, borderBottom: `3px solid ${NU.ink}` }}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={(i % 6) * 0.04}>
                <div className="nu-card relative rounded-2xl h-full p-5 pt-6" style={{ background: NU.cream, ...toy(5) }}>
                  <span aria-hidden className="absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full" style={{ background: CARD_FILLS[i % 4].bg, border: `1.5px solid ${NU.ink}` }} />
                  <p className="font-anton text-[2.6rem] leading-none tracking-tight mt-1" style={{ color: NU.ink }}>{s.value}</p>
                  <p className="font-manrope font-extrabold text-[13px] mt-2.5" style={{ color: NU.ink }}>{s.label}</p>
                  <p className="font-manrope text-[11.5px] mt-1 leading-snug" style={{ color: NU.inkMuted }}>{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ════════════════════════════ 01 · THE PROBLEM ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: NU.cream, color: NU.ink }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
            <Reveal>
              <SectionLabel index="01" kicker="the problem" light />
              <Headline a="Five friends, five phones." b="One link." light />
              <p className="text-[15.5px] leading-relaxed max-w-xl mb-4" style={{ color: NU.inkMuted }}>
                Getting a group into the same card game usually means an app store, an account each, and a
                server somebody pays for. The browser versions skip all that — and then skip the rules too,
                with house rules nobody agreed to.
              </p>
              <p className="text-[15.5px] leading-relaxed max-w-xl" style={{ color: NU.ink }}>
                NUNO was built for one group of friends on their phones. Open a link, play the real rules,
                talk while you play.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {NEEDS_NOTHING.map((n, i) => {
                const fill = [CARD_FILLS[0], { bg: NU.ink, fg: NU.cream }, CARD_FILLS[3]][i];
                return (
                  <Reveal key={n.title} delay={i * 0.06}>
                    <div className="nu-card rounded-2xl h-full p-6" style={{ background: fill.bg, color: fill.fg, ...toy(6) }}>
                      <span className="text-2xl" aria-hidden>{n.icon}</span>
                      <h3 className="font-manrope font-extrabold text-[1.3rem] mt-3 mb-1.5">{n.title}</h3>
                      <p className="font-manrope text-[13.5px] leading-relaxed" style={{ opacity: 0.92 }}>{n.body}</p>
                    </div>
                  </Reveal>
                );
              })}
              <Reveal delay={0.18}>
                <div className="nu-card rounded-2xl h-full p-6" style={{ background: NU.yellow, color: NU.ink, ...toy(6) }}>
                  <span className="text-2xl" aria-hidden>📜</span>
                  <h3 className="font-manrope font-extrabold text-[1.3rem] mt-3 mb-1.5">But the real rules</h3>
                  <p className="font-manrope text-[13.5px] leading-relaxed">Six published instruction sheets, followed card for card — decks, effects and scoring.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 02 · SIX RULE SETS ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="02" kicker="six official rule sets · one engine" />
              <Headline a="Not ‘UNO-like’." b="Six instruction sheets." />
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: NU.muted }}>
                Each mode follows the instruction sheet of the game it is based on, and its deck matches the
                official contents list — the tests count them. All six run on one pure rules engine shared by
                the bots and the interface, so the glow that says a card is playable always agrees with the
                rules.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODES.map((m, i) => {
                const head = MODE_HEAD[m.hue];
                return (
                  <Reveal key={m.name} delay={(i % 3) * 0.05}>
                    <div className="nu-card rounded-2xl h-full overflow-hidden flex flex-col" style={{ background: NU.panel, ...toy(6) }}>
                      <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: head.bg, color: head.fg, borderBottom: `2.5px solid ${NU.ink}` }}>
                        <span className="text-2xl" aria-hidden>{m.emoji}</span>
                        <h3 className="font-manrope font-extrabold text-[1.3rem] tracking-[-0.02em]">
                          {m.hue === "rainbow" ? <span className="rounded-md px-1.5" style={{ background: NU.cream }}>{m.name}</span> : m.name}
                        </h3>
                        <span className="ml-auto font-dmmono text-[10.5px] rounded-full px-2 py-0.5" style={{ background: "rgba(255,248,234,0.92)", color: NU.ink }}>{m.deck}</span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <p className="font-dmmono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: NU.faint }}>Based on {m.based}</p>
                        <p className="font-manrope text-[13.5px] leading-relaxed" style={{ color: NU.text }}>{m.twist}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* where the box is silent */}
            <Reveal delay={0.05}>
              <div className="mt-14 mb-6">
                <h3 className="font-manrope font-extrabold text-[1.5rem] md:text-[1.9rem] tracking-[-0.03em]" style={{ color: NU.text }}>
                  Where the box is silent, <span className="font-serif italic font-normal" style={{ color: NU.yellow }}>NUNO had to choose.</span>
                </h3>
                <p className="text-[14.5px] leading-relaxed max-w-2xl mt-3" style={{ color: NU.muted }}>
                  The physical launcher is mechanical and the wheel is a wheel. A browser has to put a number on
                  both — so the numbers are chosen, written into How to Play, and printed here.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
              <Reveal>
                <div className="rounded-2xl h-full p-6" style={{ background: NU.panel, border: `1px solid ${NU.line}` }}>
                  <p className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-4" style={{ color: NU.yellow }}>Attack · one press of the launcher</p>
                  <div className="space-y-3">
                    {LAUNCHER_ODDS.map((o, i) => (
                      <div key={o.label}>
                        <div className="flex justify-between font-manrope text-[13px] mb-1">
                          <span style={{ color: NU.text }}>{o.label}</span>
                          <span className="font-dmmono" style={{ color: NU.text }}>{o.pct}%</span>
                        </div>
                        <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,248,234,0.08)" }}>
                          <div className="h-full rounded-full" style={{ width: `${o.pct}%`, background: [NU.faint, NU.yellow, "#ff8a1f", NU.red][i] }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-manrope text-[12px] leading-snug mt-4" style={{ color: NU.muted }}>
                    Most presses fire nothing. One in twenty buries you.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="rounded-2xl h-full p-6" style={{ background: NU.panel, border: `1px solid ${NU.line}` }}>
                  <p className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-4" style={{ color: NU.yellow }}>Spin · nine spaces, one in nine each</p>
                  <SpinWheel />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <Frame shot={IMG.attack} label="attack · the launcher replaces the deck" aspect="16 / 11" sizes="(max-width: 1024px) 100vw, 380px" className="h-full" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 03 · NO GAME SERVER ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: NU.nightDeep, borderTop: `1px solid ${NU.line}`, borderBottom: `1px solid ${NU.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="03" kicker="no game server · peer-to-peer" />
              <Headline a="The host’s phone" b="is the referee." />
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: NU.muted }}>
                The host’s browser runs the authoritative game. Friends join with a six-letter code or a link
                and connect directly to it over WebRTC. With no server in the middle, the host’s browser holds
                everyone’s cards — so it never sends the raw game. Each phone gets a view built for its own seat.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_auto_1.15fr] gap-5 items-center">
              <Reveal>
                <div className="rounded-2xl p-6" style={{ background: NU.yellow, color: NU.ink, ...toy(6) }}>
                  <p className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-3">The host’s browser holds</p>
                  <h3 className="font-manrope font-extrabold text-[1.5rem] leading-tight mb-4">The whole game</h3>
                  <ul className="space-y-1.5 font-manrope text-[13.5px]">
                    <li>· every hand at the table</li>
                    <li>· the order of the draw pile</li>
                    <li>· whether a Wild Draw Four was a bluff</li>
                    <li>· the bots’ decisions</li>
                  </ul>
                </div>
              </Reveal>
              <div aria-hidden className="hidden lg:flex flex-col items-center gap-1 font-dmmono text-[10px] uppercase tracking-[0.2em]" style={{ color: NU.faint }}>
                <span className="text-2xl" style={{ color: NU.yellow }}>→</span>
                WebRTC
              </div>
              <Reveal delay={0.06}>
                <div className="rounded-2xl overflow-hidden" style={{ background: NU.panel, border: `1px solid ${NU.line}` }}>
                  <p className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] px-5 py-3" style={{ color: NU.muted, background: "rgba(255,248,234,0.04)", borderBottom: `1px solid ${NU.line}` }}>
                    What each phone is sent
                  </p>
                  {REDACTION.map((r) => (
                    <div key={r.item} className="grid grid-cols-[1fr_auto] gap-4 items-center px-5 py-3" style={{ borderBottom: `1px solid ${NU.lineSoft}` }}>
                      <div>
                        <p className="font-manrope font-bold text-[14px]" style={{ color: NU.text }}>{r.item}</p>
                        <p className="font-manrope text-[12px] leading-snug mt-0.5" style={{ color: NU.muted }}>{r.note}</p>
                      </div>
                      <span
                        className="font-dmmono text-[10px] uppercase tracking-[0.14em] rounded-full px-2.5 py-1 font-semibold"
                        style={r.sent ? { background: NU.green, color: NU.ink } : { background: NU.redDeep, color: "#ffffff" }}
                      >
                        {r.sent ? "sent" : "withheld"}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.05}>
              <p className="font-manrope text-[14.5px] leading-relaxed max-w-3xl mt-12 mb-6" style={{ color: NU.text }}>
                The proof is the bluff. A Wild Draw Four is only legal if you hold nothing in the current colour —
                and you can only be caught if somebody looks. After a challenge, <strong>only the challenger</strong> is
                shown the offender’s hand.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Reveal><Frame shot={IMG.challenge} label="the challenge" aspect="16 / 10" focus="center 45%" sizes="(max-width: 768px) 100vw, 560px" /></Reveal>
              <Reveal delay={0.06}><Frame shot={IMG.challengeResult} label="not a bluff — the challenger sees the hand" aspect="16 / 10" focus="center 45%" sizes="(max-width: 768px) 100vw, 560px" /></Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 04 · THE TABLE ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="04" kicker="a table that shows everything" />
              <Headline a="The game is instant." b="The table is not." />
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: NU.muted }}>
                A card game on a screen fails when you can’t follow it. So nothing just changes: every card
                travels, the table changes colour, and every big play is said out loud in plain words.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 items-start">
              <Reveal><Frame shot={IMG.splash} label="skip · said in plain words" sizes="(max-width: 1024px) 100vw, 680px" /></Reveal>
              <div className="grid grid-cols-1 gap-3.5">
                {TABLE_POINTS.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.05}>
                    <div className="rounded-2xl p-5 flex gap-4" style={{ background: NU.panel, border: `1px solid ${NU.line}` }}>
                      <span className="w-9 h-12 rounded-lg shrink-0 flex items-center justify-center font-anton text-[1.1rem]" style={{ background: CARD_FILLS[i].bg, color: CARD_FILLS[i].fg, border: "2px solid #ffffff", boxShadow: `0 0 0 2px ${NU.ink}` }}>
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-manrope font-extrabold text-[15px] mb-1" style={{ color: NU.text }}>{p.title}</h3>
                        <p className="font-manrope text-[13px] leading-relaxed" style={{ color: NU.muted }}>{p.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              <Reveal><Frame shot={IMG.feltBlue} label="the felt follows the colour in play" aspect="16 / 10" sizes="(max-width: 768px) 100vw, 560px" /></Reveal>
              <Reveal delay={0.06}><Frame shot={IMG.roundOver} label="round over · every leftover card, counted" aspect="16 / 10" focus="center 40%" sizes="(max-width: 768px) 100vw, 560px" /></Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 05 · PHONES ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: NU.cream, color: NU.ink }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="05" kicker="built for phones" light />
              <Headline a="Built for a group of friends" b="on their phones." light accent={NU.blueDeep} />
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: NU.inkMuted }}>
                Which is where most of the hard problems came from. A phone drops a page’s connections the moment
                you switch apps, sits behind a carrier that hides it, and has a notch where the buttons want to go.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
              <Reveal>
                <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-[560px] mx-auto">
                  <div className="pt-10"><PhoneFrame shot={IMG.phoneHome} sizes="(max-width: 640px) 30vw, 180px" /></div>
                  <div><PhoneFrame shot={IMG.phoneLobby} sizes="(max-width: 640px) 30vw, 180px" /></div>
                  <div className="pt-10"><PhoneFrame shot={IMG.phoneTable} sizes="(max-width: 640px) 30vw, 180px" /></div>
                  <p className="font-dmmono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.14em] text-center" style={{ color: NU.inkFaint }}>home</p>
                  <p className="font-dmmono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.14em] text-center" style={{ color: NU.inkFaint }}>a room</p>
                  <p className="font-dmmono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.14em] text-center" style={{ color: NU.inkFaint }}>the table</p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PHONE_POINTS.map((p, i) => {
                  const ink = i === 0;
                  return (
                    <Reveal key={p.title} delay={(i % 2) * 0.05}>
                      <div
                        className="nu-card rounded-2xl h-full p-5"
                        style={ink ? { background: NU.ink, color: NU.cream, ...toy(5) } : { background: "#ffffff", color: NU.ink, ...toy(5) }}
                      >
                        <span className="text-xl" aria-hidden>{p.icon}</span>
                        <h3 className="font-manrope font-extrabold text-[15px] mt-2 mb-1.5">{p.title}</h3>
                        <p className="font-manrope text-[13px] leading-relaxed" style={{ color: ink ? "rgba(255,248,234,0.82)" : NU.inkMuted }}>{p.body}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 06 · THEMES ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="06" kicker="seven themes · 62 characters" />
              <Headline a="Seven themes." b="Each one repaints everything." />
              <p className="text-[15px] leading-relaxed max-w-3xl mb-10" style={{ color: NU.muted }}>
                Classic plus six anime-inspired themes. A theme restyles the whole app — scenery, table, card
                backs and faces, fonts, particles, effects, sound effects, the soundtrack, bot names, trash talk,
                what every play is called, and a rank under every seat that changes as the hand shrinks. Pick
                one below; this panel repaints the way the game does.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <ThemeShowcase />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              {[
                {
                  t: "62 characters, in their own voices",
                  b: "Across the six anime themes, characters become the bot opponents, pickable avatars cropped to the face, and fighting-game cut-ins that whip across the table when they play an action card or shout NUNO. Each one has six trash-talk lines only they would say.",
                },
                {
                  t: "The host’s theme is the room’s",
                  b: "In an online room everyone switches to the host’s theme, follows along if the host changes it mid-game, and gets their own theme back on leaving.",
                },
                {
                  t: "Nothing saved until Select",
                  b: "A full-screen gallery repaints itself as a live preview while you swipe. Tapping Select plays the theme’s entrance — and only then is it saved.",
                },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 0.05}>
                  <div className="rounded-2xl h-full p-6" style={{ background: NU.panel, border: `1px solid ${NU.line}`, boxShadow: `inset 0 3px 0 0 ${[NU.red, NU.yellow, NU.green][i]}` }}>
                    <h3 className="font-manrope font-extrabold text-[15.5px] mb-2" style={{ color: NU.text }}>{c.t}</h3>
                    <p className="font-manrope text-[13px] leading-relaxed" style={{ color: NU.muted }}>{c.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 07 · SOUND & BOTS ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: NU.nightDeep, borderTop: `1px solid ${NU.line}`, borderBottom: `1px solid ${NU.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="07" kicker="sound · bots" />
              <Headline a="Every sound is synthesised." b="Every bot talks back." />
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
              <Reveal>
                <div>
                  <p className="text-[15px] leading-relaxed mb-6" style={{ color: NU.muted }}>
                    There are no audio files. <strong style={{ color: NU.text }}>79 sound effects</strong> and{" "}
                    <strong style={{ color: NU.text }}>8 soundtracks</strong> are generated live with WebAudio by a
                    small step sequencer — one soundtrack per theme, two for Classic — and the music picks up
                    when someone is one card from winning.
                  </p>
                  <Sequencer />
                  <div className="flex flex-wrap gap-2 mt-5">
                    {SOUNDS.map((s) => (
                      <Chip key={s} tone="dark">{s}</Chip>
                    ))}
                    <Chip tone="dark">…and 71 more</Chip>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div>
                  <p className="text-[15px] leading-relaxed mb-6" style={{ color: NU.muted }}>
                    Three difficulties that differ in how smart <em>and how forgetful</em> the bots are — and they
                    trash-talk back from <strong style={{ color: NU.text }}>438 ready-made lines</strong>: 18
                    general, 48 for the themes, 372 in the characters’ own voices.
                  </p>
                  <div className="rounded-2xl overflow-hidden" style={{ background: NU.panel, border: `1px solid ${NU.line}` }}>
                    <div className="grid grid-cols-[1.5fr_repeat(3,minmax(0,1fr))] px-4 py-3 gap-2" style={{ borderBottom: `1px solid ${NU.line}` }}>
                      <span className="font-dmmono text-[10px] uppercase tracking-[0.18em] self-end" style={{ color: NU.faint }}>chance of…</span>
                      {BOTS.cols.map((c, i) => (
                        <span key={c} className="font-manrope font-extrabold text-[13px] text-center" style={{ color: NU.text }}>
                          <span aria-hidden>{BOTS.icons[i]}</span> {c}
                        </span>
                      ))}
                    </div>
                    {BOTS.rows.map((r) => (
                      <div key={r.label} className="grid grid-cols-[1.5fr_repeat(3,minmax(0,1fr))] px-4 py-3 gap-2 items-center" style={{ borderBottom: `1px solid ${NU.lineSoft}` }}>
                        <span className="font-manrope text-[13px] leading-snug" style={{ color: NU.text }}>{r.label}</span>
                        {r.v.map((v, i) => (
                          <div key={i} className="text-center">
                            <span className="font-anton text-[1.25rem] leading-none" style={{ color: [NU.greenLight, NU.yellow, NU.redLight][i] }}>{v}%</span>
                            <div className="h-1.5 rounded-full mt-1.5 mx-auto w-full max-w-[64px] overflow-hidden" style={{ background: "rgba(255,248,234,0.08)" }}>
                              <div className="h-full rounded-full" style={{ width: `${v}%`, background: [NU.greenLight, NU.yellow, NU.redLight][i] }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <p className="font-dmmono text-[10.5px] mt-3" style={{ color: NU.faint }}>From the bots’ tuning table in the game’s source.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 08 · THE BUILD ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: NU.cream, color: NU.ink }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="08" kicker="the build · decisions with reasons" light />
              <Headline a="Seven decisions," b="and what each one bought." light />
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: NU.inkMuted }}>
                Three days, eleven commits and about 18,100 lines of TypeScript, built with Claude Code. What
                made that possible was deciding a few things early and not revisiting them.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DECISIONS.map((d, i) => {
                const ink = i === 0;
                const pip = CARD_FILLS[i % 4];
                return (
                  <Reveal key={d.title} delay={(i % 3) * 0.05} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
                    <div className="nu-card rounded-2xl h-full p-6" style={ink ? { background: NU.ink, color: NU.cream, ...toy(6) } : { background: "#ffffff", color: NU.ink, ...toy(6) }}>
                      <span className="inline-flex w-9 h-11 rounded-lg items-center justify-center font-anton text-[1.1rem] mb-4" style={{ background: pip.bg, color: pip.fg, border: "2px solid #ffffff", boxShadow: `0 0 0 2px ${NU.ink}` }}>
                        {i + 1}
                      </span>
                      <h3 className="font-manrope font-extrabold text-[1.05rem] leading-snug mb-2">{d.title}</h3>
                      <p className="font-manrope text-[13px] leading-relaxed" style={{ color: ink ? "rgba(255,248,234,0.82)" : NU.inkMuted }}>{d.body}</p>
                    </div>
                  </Reveal>
                );
              })}
              <Reveal delay={0.1} className="sm:col-span-2">
                <div className="rounded-2xl h-full p-6 flex flex-col justify-center" style={{ background: NU.yellow, color: NU.ink, ...toy(6) }}>
                  <p className="font-anton text-[3.2rem] leading-none">1,020</p>
                  <p className="font-manrope font-extrabold text-[14px] mt-2">bot games simulated on every test run</p>
                  <p className="font-manrope text-[12.5px] mt-1.5 leading-snug">Part of 100 tests, all passing. Thirteen of them run whole rooms against a fake PeerJS.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 09 · GALLERY ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="09" kicker="every screen" />
              <Headline a="The rest of the game," b="screen by screen." />
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: NU.muted }}>
                Captured from the live build in the Classic theme.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {GALLERY.map((g, i) => (
                <Reveal key={g.label} delay={(i % 4) * 0.05}>
                  <div>
                    <Frame shot={g.shot} label={g.label} aspect="16 / 10" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px" />
                    <p className="font-manrope text-[12.5px] leading-snug mt-3" style={{ color: NU.muted }}>{g.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 10 · ENGINEERING NOTES ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: NU.nightDeep, borderTop: `1px solid ${NU.line}`, borderBottom: `1px solid ${NU.line}` }}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <SectionLabel index="10" kicker="engineering notes" />
              <Headline a="Four problems" b="worth writing down." />
            </Reveal>

            <div className="space-y-5 mt-10">
              {NOTES.map((n, i) => (
                <Reveal key={n.n}>
                  <article className="rounded-2xl p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-5 md:gap-8" style={{ background: NU.panel, border: `1px solid ${NU.line}` }}>
                    <span className="w-12 h-16 rounded-xl flex items-center justify-center font-anton text-[1.5rem] shrink-0" style={{ background: CARD_FILLS[i].bg, color: CARD_FILLS[i].fg, border: "3px solid #ffffff", boxShadow: `0 0 0 2.5px ${NU.ink}, 0 5px 0 2.5px ${NU.ink}` }}>
                      {n.n}
                    </span>
                    <div>
                      <h3 className="font-manrope font-extrabold text-[1.35rem] md:text-[1.6rem] tracking-[-0.02em] mb-4" style={{ color: NU.text }}>{n.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <p className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: NU.redLight }}>The constraint</p>
                          <p className="font-manrope text-[13.5px] leading-relaxed" style={{ color: NU.muted }}>{n.constraint}</p>
                        </div>
                        <div>
                          <p className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: NU.greenLight }}>The resolution</p>
                          <p className="font-manrope text-[13.5px] leading-relaxed" style={{ color: NU.muted }}>{n.resolution}</p>
                        </div>
                      </div>
                      <blockquote className="mt-6 pl-4 font-serif italic text-[1.2rem] md:text-[1.4rem] leading-snug" style={{ color: NU.text, borderLeft: `3px solid ${NU.yellow}` }}>
                        “{n.quote}”
                      </blockquote>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 11 · CONSTRAINTS ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: NU.cream, color: NU.ink }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="11" kicker="constraints · honest postscripts" light />
              <Headline a="What it can’t do," b="stated plainly." light />
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 mt-8 items-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONSTRAINTS.map((c, i) => (
                  <Reveal key={c.title} delay={(i % 2) * 0.05}>
                    <div className="rounded-2xl h-full p-6" style={{ background: "#ffffff", ...toy(5), ...(i === 3 ? { background: NU.yellow } : {}) }}>
                      <h3 className="font-manrope font-extrabold text-[15px] mb-2" style={{ color: NU.ink }}>{c.title}</h3>
                      <p className="font-manrope text-[13px] leading-relaxed" style={{ color: i === 3 ? NU.ink : NU.inkMuted }}>{c.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.06}>
                <div className="rounded-2xl p-6 md:p-7" style={{ background: NU.ink, color: NU.cream, ...toy(6) }}>
                  <p className="font-dmmono text-[10.5px] uppercase tracking-[0.22em] mb-4" style={{ color: NU.yellow }}>What went wrong on the way</p>
                  <ul className="space-y-3.5">
                    {POSTSCRIPTS.map((p, i) => (
                      <li key={p} className="flex gap-3">
                        <span className="w-2 h-2 rounded-full shrink-0 mt-[7px]" style={{ background: [NU.redLight, NU.yellow, NU.greenLight, NU.blueLight, NU.redLight][i] }} />
                        <span className="font-manrope text-[13.5px] leading-relaxed" style={{ color: "rgba(255,248,234,0.86)" }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-manrope text-[13px] leading-relaxed mt-5 pt-4" style={{ color: NU.cream, borderTop: "1px solid rgba(255,248,234,0.14)" }}>
                    Every one of them is fixed, and each fix is in the commit history.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.05}>
              <p className="font-manrope text-[12.5px] leading-relaxed max-w-3xl mt-10" style={{ color: NU.inkMuted }}>
                NUNO is an independent, fan-made project that follows the published rules of UNO and its spin-offs.
                It is not affiliated with or endorsed by Mattel, which owns the UNO name, nor by the creators and
                publishers of the series its themes are inspired by — those characters and that artwork belong to them.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 12 · STACK + CTA ════════════════════════════ */}
        <section className="px-6 pt-20 md:pt-28 pb-24">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <SectionLabel index="12" kicker="the stack" />
              <div className="flex flex-wrap gap-2 mb-14">
                {STACK.map((s) => (
                  <Chip key={s} tone="dark">{s}</Chip>
                ))}
                <Chip>Built with Claude Code</Chip>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[2rem] px-7 py-14 md:px-14 md:py-16 text-center relative overflow-hidden" style={{ background: NU.yellow, color: NU.ink, ...toy(9) }}>
                <div className="flex justify-center gap-2 mb-6" aria-hidden>
                  {THEMES.map((t) => (
                    <span key={t.id} className="text-xl">{t.emoji}</span>
                  ))}
                </div>
                <h2 className="font-manrope font-extrabold text-[2.2rem] md:text-[3.2rem] leading-[1] tracking-[-0.04em] mb-4">
                  Open a room in two tabs.
                  <br />
                  <span className="font-serif italic font-normal">Then call the bluff.</span>
                </h2>
                <p className="font-manrope text-[15px] max-w-xl mx-auto mb-9 leading-relaxed">
                  Every claim on this page can be checked in the live game — host a room in one tab and join it from
                  another, or challenge a Savage bot’s Wild Draw Four and see what it was holding.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={LINKS.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nu-btn group inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-manrope font-extrabold text-[15px]"
                    style={{ background: NU.ink, color: NU.cream, border: `2.5px solid ${NU.ink}`, boxShadow: "0 5px 0 0 #0b0920" }}
                  >
                    🃏 Play NUNO now
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                  <Link
                    href="/games/pixelville"
                    className="nu-btn inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-manrope font-bold text-[14px]"
                    style={{ background: NU.cream, color: NU.ink, ...toy(5) }}
                  >
                    🏙️ The other game: PixelVille
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <PageFaq href={PATH} surface={NU.night} />
      <RelatedPages href={PATH} surface={NU.night} />
      <Contact
        closingBg={`linear-gradient(180deg, ${NU.night} 0%, #141136 12%, #0c0a22 55%, #050505 100%)`}
        glowColor="rgba(255,194,26,0.14)"
        hazeColor="rgba(47,114,224,0.1)"
      />
    </MotionProvider>
  );
}
