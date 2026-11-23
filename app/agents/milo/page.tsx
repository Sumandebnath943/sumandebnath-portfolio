import type { Metadata } from "next";
import Image from "next/image";
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
import {
  HeroStage,
  MiloShort,
  MiloStateToy,
  AgentMaker,
  CastGrid,
  StarterTabs,
  MiloLive,
} from "@/components/milo/MiloVisuals";
import {
  MILO,
  LINKS,
  IMG,
  HERO,
  STATS,
  STEPS,
  CAST,
  IDEAS,
  MILO_FACTS,
  PERSONALITY,
  TODAY_CAN,
  TODAY_LIMITS,
  NEXT_UP,
  NOTES,
  LIMITS,
  STACK,
  avatarSrc,
  castById,
} from "@/components/milo/milo-data";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
const PATH = "/agents/milo";

export const metadata: Metadata = {
  title: "Milo · Talk your own AI agents into existence",
  description:
    "Milo is a voice-first agent maker by Suman Debnath. Describe a small job out loud and Milo casts one of 24 fluffy characters to do it — on its own schedule, messaging you what it finds, and asking before anything leaves the app.",
  keywords: [
    "Milo", "voice-first agent maker", "AI agent builder", "build AI agents by voice", "no-code AI agents",
    "personal AI agents", "human in the loop", "Cloudflare Durable Objects", "Suman Debnath",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: "Milo · Talk your own AI agents into existence",
    description:
      "A fluffy tangerine planet that turns what you say into small agents — 24 characters, 23 one-tap starters, and nothing leaves the app without your OK.",
    url: `${SITE}${PATH}`,
    images: [{ url: IMG.og.src, width: IMG.og.w, height: IMG.og.h, alt: IMG.og.alt }],
  },
};

/* ── Schema ─────────────────────────────────────────────────────────────── */
const appLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Milo",
  description:
    "A voice-first agent maker. The owner describes a small job out loud; Milo picks one of 24 characters to play it, and the agent runs on its own schedule, reports back by inbox, phone notification or Telegram, and asks before any outward action.",
  url: LINKS.app,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any modern browser; installable as a web app",
  image: `${SITE}${IMG.og.src}`,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

/* ── Page-scoped CSS ────────────────────────────────────────────────────── */
const CSS = `
.ml-root { --ml-ease: cubic-bezier(.2,.8,.2,1); }
.ml-root :is(a, button, input):focus-visible { outline: 3px solid ${MILO.tangerine}; outline-offset: 3px; }
.ml-poke:focus-visible { outline-offset: 8px; }
.ml-btn { transition: transform .2s var(--ml-ease), filter .2s, background-color .2s; }
.ml-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
.ml-btn:active { transform: translateY(0) scale(.97); }
.ml-chip { transition: transform .2s var(--ml-ease), border-color .2s; }
.ml-chip:hover { transform: translateY(-2px); border-color: rgba(255,111,60,.65) !important; }
.ml-link { text-decoration: underline; text-underline-offset: 3px; text-decoration-color: color-mix(in srgb, currentColor 40%, transparent); }
.ml-link:hover { text-decoration-color: currentColor; }

/* ── Milo, layered the way the app layers him ── */
.ml-milo { position: relative; aspect-ratio: 1; width: 100%; }
.ml-glow { position: absolute; inset: -28%; border-radius: 50%; background: radial-gradient(circle, rgba(255,111,60,.32), transparent 60%); opacity: .55; pointer-events: none; transition: opacity .4s; }
.ml-milo:is([data-state="listening"], [data-state="talking"], [data-state="happy"]) .ml-glow { opacity: .95; }
.ml-layer { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.ml-float { position: absolute; inset: 0; animation: ml-float 6s ease-in-out infinite; }
.ml-body { transform-origin: 50% 83%; animation: ml-breathe 5s ease-in-out infinite; }
.ml-body > img, .ml-moon { position: absolute; inset: 0; width: 100%; height: 100%; display: block; user-select: none; pointer-events: none; }
.ml-eyes { transform-box: fill-box; transform-origin: center; animation: ml-blink 5.5s infinite; translate: var(--ex, 0px) var(--ey, 0px); transition: translate .35s var(--ml-ease); }
.ml-milo[data-state="thinking"] .ml-eyes { translate: 6px -8px; }
.ml-milo[data-state="listening"] .ml-eyes { translate: 0px -2px; }
.ml-mouth-open { opacity: 0; transform-box: fill-box; transform-origin: 50% 0; }
.ml-milo[data-state="talking"] .ml-mouth-open { animation: ml-talk 1.15s infinite; }
.ml-milo[data-state="talking"] .ml-mouth { animation: ml-talk-w 1.15s infinite; }
.ml-milo[data-state="talking"] .ml-body { animation: ml-swell 1.15s infinite; }
.ml-ring { transform-box: view-box; transform-origin: 100px 106px; opacity: 0; }
.ml-milo[data-state="listening"] .ml-ring { animation: ml-ring 1.5s ease-in-out infinite; }
.ml-orbit { transform-origin: 50% 53%; }
.ml-milo[data-state="thinking"] .ml-orbit { animation: ml-spin 1.3s linear infinite; }
.ml-milo[data-state="happy"] .ml-orbit { animation: ml-spin .9s cubic-bezier(.3,.8,.3,1) 1; }
.ml-milo[data-state="happy"] .ml-body { animation: ml-squish .7s cubic-bezier(.3,1.6,.5,1) 1; }
.ml-moon { animation: ml-float 3.6s ease-in-out infinite; }
.ml-hearts { position: absolute; inset: 0; pointer-events: none; }
.ml-hearts i { position: absolute; top: 26%; font-style: normal; font-size: 22px; color: ${MILO.blush}; animation: ml-heart .95s ease-out both; }

@keyframes ml-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -8px; } }
@keyframes ml-breathe { 0%, 100% { scale: 1; } 50% { scale: 1.02 1.035; } }
@keyframes ml-blink { 0%, 93%, 100% { transform: scaleY(1); } 96% { transform: scaleY(.08); } }
@keyframes ml-spin { to { rotate: 360deg; } }
@keyframes ml-ring { 0%, 100% { opacity: .25; transform: scale(.94); } 50% { opacity: .9; transform: scale(1.1); } }
@keyframes ml-talk { 0%, 8% { opacity: 0; transform: scale(.85, .3); } 12% { opacity: 1; transform: scale(.95, .9); } 24% { opacity: 1; transform: scale(1, 1.1); } 32% { opacity: 0; } 44% { opacity: 1; transform: scale(.9, .6); } 56% { opacity: 1; transform: scale(1, 1); } 64% { opacity: 0; } 74% { opacity: 1; transform: scale(.92, .8); } 84%, 100% { opacity: 0; } }
@keyframes ml-talk-w { 0%, 8% { opacity: 1; } 12%, 24% { opacity: 0; } 32% { opacity: 1; } 44%, 56% { opacity: 0; } 64% { opacity: 1; } 74% { opacity: 0; } 84%, 100% { opacity: 1; } }
@keyframes ml-swell { 0%, 100% { scale: 1; } 18% { scale: 1.04 1.07; } 50% { scale: 1.02 1.04; } 78% { scale: 1.035 1.06; } }
@keyframes ml-squish { 0% { scale: 1; } 30% { scale: 1.14 .86; } 60% { scale: .95 1.08; } 100% { scale: 1; } }
@keyframes ml-heart { 0% { opacity: 0; transform: translateY(0) scale(.4); } 25% { opacity: 1; } 100% { opacity: 0; transform: translateY(-72px) scale(1.15); } }

/* ── hero ── */
.ml-sat { animation: ml-float 5s ease-in-out infinite; }
.ml-sat:hover .ml-wiggle-on-hover { animation: ml-wiggle .6s var(--ml-ease); }
.ml-bubble { animation: ml-pop .45s cubic-bezier(.3,1.5,.5,1) both; transform-origin: 50% 100%; }
.ml-bubble::after { content: ""; position: absolute; left: 50%; bottom: -6px; width: 13px; height: 13px; background: inherit; transform: translateX(-50%) rotate(45deg); border-radius: 3px; }
.ml-star { position: absolute; border-radius: 50%; background: ${MILO.moon}; animation: ml-twinkle 3.6s ease-in-out infinite; }
@keyframes ml-twinkle { 0%, 100% { opacity: .12; } 50% { opacity: .75; } }

/* ── the short ── */
.ml-play { transition: transform .25s var(--ml-ease); }
.ml-play::before { content: ""; position: absolute; inset: -6px; border-radius: 50%; border: 2px solid ${MILO.tangerine}; animation: ml-ping 1.8s ease-out infinite; }
.ml-poster:hover .ml-play { transform: scale(1.07); }
@keyframes ml-ping { 0% { transform: scale(.9); opacity: .9; } 100% { transform: scale(1.4); opacity: 0; } }

/* ── toy maker ── */
.ml-card-in { animation: ml-rise .45s var(--ml-ease) both; }
.ml-pop-in { animation: ml-pop .55s cubic-bezier(.3,1.6,.5,1) both; }
.ml-hop-once { animation: ml-hop .8s var(--ml-ease) 2; }
.ml-dots { display: inline-flex; gap: 7px; }
.ml-dots i { width: 10px; height: 10px; border-radius: 50%; background: ${MILO.tangerine}; animation: ml-dot 1s ease-in-out infinite; }
.ml-dots i:nth-child(2) { animation-delay: .15s; }
.ml-dots i:nth-child(3) { animation-delay: .3s; }
@keyframes ml-dot { 0%, 100% { transform: translateY(0); opacity: .4; } 50% { transform: translateY(-7px); opacity: 1; } }
@keyframes ml-rise { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes ml-pop { 0% { opacity: 0; scale: .6; } 70% { opacity: 1; scale: 1.07; } 100% { opacity: 1; scale: 1; } }

/* ── cast cards ── */
.ml-bob { animation: ml-bob 3.2s ease-in-out infinite; }
.ml-flip { perspective: 1000px; border-radius: 22px; transition: transform .25s var(--ml-ease); }
.ml-flip:hover { transform: translateY(-4px) rotate(-1deg); }
.ml-flip:hover .ml-av { animation: ml-hop .7s var(--ml-ease); }
.ml-flip-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform .7s var(--ml-ease); }
.ml-flip[aria-pressed="true"] .ml-flip-inner { transform: rotateY(180deg); }
.ml-face { position: absolute; inset: 0; border-radius: 22px; overflow: hidden; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.ml-back { transform: rotateY(180deg); }
@keyframes ml-bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -5px; } }
@keyframes ml-hop { 0%, 100% { transform: translateY(0) scale(1, 1); } 15% { transform: translateY(0) scale(1.1, .88); } 45% { transform: translateY(-16px) scale(.95, 1.06); } 75% { transform: translateY(0) scale(1.06, .94); } }
@keyframes ml-wiggle { 0%, 100% { rotate: 0deg; } 25% { rotate: -10deg; } 50% { rotate: 8deg; } 75% { rotate: -4deg; } }

/* ── starters ── */
.ml-row { animation: ml-rise .45s var(--ml-ease) both; }
.ml-row:hover .ml-av { animation: ml-hop .7s var(--ml-ease); }

/* ── the parade ── */
.ml-parade-track { animation: ml-marquee 80s linear infinite; }
.ml-parade:hover .ml-parade-track { animation-play-state: paused; }
.ml-hopper { animation: ml-hop 1.2s var(--ml-ease) infinite; }
@keyframes ml-marquee { to { transform: translateX(-50%); } }

@media (prefers-reduced-motion: reduce) {
  .ml-root *, .ml-root *::before, .ml-root *::after { animation: none !important; transition: none !important; }
}
`;

/* ── Small server pieces ───────────────────────────────────────────────── */

function Kicker({ children, color = MILO.tangerine }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="mb-4 flex items-center gap-3 font-dmmono text-[10.5px] uppercase tracking-[0.22em] md:text-[11px]" style={{ color }}>
      <span aria-hidden className="h-px w-8" style={{ background: color }} />
      {children}
    </p>
  );
}

function Av({ id, size, className = "", alt = "" }: { id: string; size: number; className?: string; alt?: string }) {
  return <Image src={avatarSrc(id)} alt={alt} width={size} height={size} unoptimized draggable={false} className={`select-none ${className}`} />;
}

/** A phone window cropped to the part of the screenshot that matters. */
function PhoneShot({ shot, focus }: { shot: keyof typeof IMG.shots; focus: "top" | "bottom" }) {
  const s = IMG.shots[shot];
  return (
    <div className="relative mx-auto w-full max-w-[250px] rounded-[2.1rem] p-[7px]" style={{ background: "#1c1c21", boxShadow: "0 30px 60px -30px rgba(0,0,0,0.8), inset 0 0 0 1.5px rgba(255,255,255,0.07)" }}>
      <div className="relative h-[380px] overflow-hidden rounded-[1.7rem]" style={{ background: MILO.night }}>
        <Image
          src={s.src}
          alt={s.alt}
          width={s.w}
          height={s.h}
          sizes="250px"
          className="absolute left-0 h-auto w-full"
          style={focus === "top" ? { top: 0 } : { bottom: 0 }}
        />
        <div aria-hidden="true" className="absolute inset-x-0 h-14" style={focus === "top" ? { bottom: 0, background: `linear-gradient(transparent, ${MILO.night})` } : { top: 0, background: `linear-gradient(${MILO.night}, transparent)` }} />
      </div>
    </div>
  );
}

const STARS = [
  { l: "8%", t: "22%", s: 3, d: "0s" },
  { l: "18%", t: "64%", s: 2, d: "-1.2s" },
  { l: "34%", t: "14%", s: 2, d: "-2s" },
  { l: "52%", t: "80%", s: 3, d: "-.6s" },
  { l: "63%", t: "18%", s: 2, d: "-2.8s" },
  { l: "78%", t: "70%", s: 3, d: "-1.6s" },
  { l: "90%", t: "30%", s: 2, d: "-3.2s" },
  { l: "46%", t: "40%", s: 2, d: "-2.3s" },
];

/** The whole cast, hopping along the bottom of the stat slab. Pure CSS. */
function Parade() {
  const row = [...CAST, ...CAST];
  return (
    <div className="ml-parade relative overflow-hidden pb-4 pt-6" aria-hidden="true">
      <div className="ml-parade-track flex w-max items-end gap-5 px-3 md:gap-7">
        {row.map((c, i) => (
          <span key={`${c.id}-${i}`} className="ml-hopper block" style={{ animationDelay: `${-(i % 7) * 0.17}s` }}>
            <Av id={c.id} size={58} className="h-[48px] w-[48px] md:h-[58px] md:w-[58px]" />
          </span>
        ))}
      </div>
      <div className="mx-3 h-[3px] rounded-full" style={{ background: MILO.ink }} />
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ═════════════════════════════════════════════════════════════════════════ */
export default function MiloPage() {
  const INK = MILO.ink;

  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <Navigation />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* overflow-x-clip, not -hidden: "Meet Milo" pins its reference sheet with
          position: sticky, and an overflow-hidden ancestor silently disables
          that (AGENTS.md trap 3). clip still stops the parade's sideways bleed. */}
      <main className="ml-root relative min-h-screen overflow-x-clip font-manrope" style={{ background: MILO.night, color: MILO.text }}>
        {/* ════════════════════════════ HERO ════════════════════════════ */}
        <section
          className="relative sd-banner-host"
          style={{ background: `radial-gradient(90% 70% at 72% 30%, rgba(255,111,60,0.20) 0%, ${MILO.night} 60%)` }}
        >
          <BannerArt seed={PATH} accent={MILO.tangerine} />
          <HeroLock />
          {STARS.map((s, i) => (
            <span key={i} aria-hidden="true" className="ml-star" style={{ left: s.l, top: s.t, width: s.s, height: s.s, animationDelay: s.d }} />
          ))}

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-28 md:pt-36 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-24">
            <div className="order-2 lg:order-1">
              <Reveal>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-dmmono text-[10px] uppercase tracking-[0.22em] md:text-[11px]"
                  style={{ background: MILO.surface, color: MILO.text, border: `1px solid ${MILO.line}` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: MILO.tangerine }} />
                  {HERO.kicker}
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <Breadcrumbs
                  trail={[
                    { label: "Agents", href: null },
                    { label: "Milo", href: PATH },
                  ]}
                  className="mb-7 mt-5"
                />
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="mb-2 font-manrope text-[2.7rem] font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-[3.6rem] md:text-[4.3rem]">
                  <span className="sr-only">Milo: </span>
                  <span>Talk your own agents</span>
                  <br />
                  <span className="font-serif font-normal italic tracking-[-0.015em]" style={{ color: MILO.tangerine }}>
                    into existence.
                  </span>
                </h1>
                <PageAnswer href={PATH} className="!mx-0" />
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mb-7 max-w-2xl text-[0.98rem] leading-relaxed md:text-[1.05rem]" style={{ color: MILO.text2 }}>
                  {HERO.pitch}
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mb-8 flex flex-wrap gap-2">
                  {HERO.chips.map((c) => (
                    <span key={c} className="whitespace-nowrap rounded-full px-3 py-1.5 font-dmmono text-[11px] md:text-[11.5px]" style={{ background: MILO.surface, color: MILO.text, border: `1px solid ${MILO.line}` }}>
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="#short" className="ml-btn inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-manrope text-[15px] font-extrabold" style={{ background: MILO.text, color: MILO.night }}>
                    ▶ Watch Milo in action
                  </a>
                  <a href="#cast" className="ml-btn inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-manrope text-[14px] font-bold" style={{ color: MILO.text, border: `1.5px solid ${MILO.line2}` }}>
                    Meet the cast ↓
                  </a>
                </div>
                <p className="mt-6 inline-flex items-center gap-2 text-[13px]" style={{ color: MILO.text2 }}>
                  <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: MILO.ok, boxShadow: `0 0 10px ${MILO.ok}` }} />
                  Live, for one owner · a starting app, version one ·{" "}
                  <a href={LINKS.publicPage} target="_blank" rel="noopener noreferrer" className="ml-link font-bold" style={{ color: MILO.moon }}>
                    Milo’s own page ↗
                  </a>
                </p>
              </Reveal>
            </div>

            <div className="order-1 mx-auto w-full max-w-[330px] sm:max-w-[400px] lg:order-2 lg:max-w-none">
              <HeroStage />
            </div>
          </div>
        </section>

        {/* ════════════════════════════ STATS + PARADE ════════════════════════════ */}
        <section className="relative" style={{ background: MILO.tangerine, color: INK }}>
          <div aria-hidden="true" className="pointer-events-none absolute -top-[46px] right-[8%] flex gap-1">
            {["kiwi", "echo", "bolt"].map((id, i) => (
              <span key={id} className="ml-peek ml-bob block" style={{ animationDelay: `${-i * 0.6}s` }}>
                <Av id={id} size={56} />
              </span>
            ))}
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-6 pb-8 pt-14 sm:grid-cols-3 lg:grid-cols-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.04}>
                <p className="font-manrope text-[3rem] font-extrabold leading-none tracking-[-0.04em] md:text-[3.4rem]">{s.value}</p>
                <p className="mt-2 text-[13.5px] font-semibold leading-snug" style={{ color: "rgba(26,20,24,0.82)" }}>
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>

          <Parade />
        </section>

        {/* ════════════════════════════ THE SHORT ════════════════════════════ */}
        <section id="short" className="relative scroll-mt-24 px-6 py-24 md:py-32" style={{ background: MILO.night }}>
          <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <Kicker>The short · on YouTube</Kicker>
              <h2 className="mb-5 font-manrope text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[3.2rem]">
                Build your own AI agents{" "}
                <span className="font-serif font-normal italic" style={{ background: MILO.sunset, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  just by talking.
                </span>
              </h2>
              <p className="mb-8 max-w-xl text-[15.5px] leading-relaxed" style={{ color: MILO.text2 }}>
                The quickest way to understand Milo is to watch him. You say what you need; Milo turns it into a small
                agent with a face, a name and a schedule. Three beats carry the whole idea:
              </p>
              <ol className="grid gap-3">
                {[
                  { id: "mochi", t: "No forms.", b: "Your profile fills in while you talk — name, work, city, interests." },
                  { id: "tide", t: "It runs on its own.", b: "A first run straight away, then on schedule, with a buzz on your phone." },
                  { id: "zip", t: "It asks before it acts.", b: "Anything outward waits on a “Needs your OK” card." },
                ].map((beat, i) => (
                  <li key={beat.t} className="flex items-center gap-4 rounded-[20px] p-3 pr-5" style={{ background: MILO.surface, border: `1px solid ${MILO.line}` }}>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px]" style={{ background: MILO.raise }}>
                      <Av id={beat.id} size={44} />
                    </span>
                    <span>
                      <span className="block font-manrope text-[16px] font-extrabold">
                        <span className="mr-2 font-dmmono text-[11px]" style={{ color: MILO.tangerine }}>0{i + 1}</span>
                        {beat.t}
                      </span>
                      <span className="block text-[13.5px] leading-snug" style={{ color: MILO.text2 }}>
                        {beat.b}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <a href={LINKS.short} target="_blank" rel="noopener noreferrer" className="ml-link mt-7 inline-block text-[14px] font-bold" style={{ color: MILO.moon }}>
                Open it on YouTube ↗
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <MiloShort />
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ MEET MILO (moon paper) ════════════════════════════ */}
        <section id="meet" className="relative px-6 py-24 md:py-32" style={{ background: MILO.cream, color: INK }}>
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28">
              <MiloStateToy />
            </Reveal>

            <div>
              <Reveal>
                <Kicker color={MILO.tangerineInk}>Meet Milo</Kicker>
                <h2 className="mb-5 font-manrope text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[3.1rem]">
                  A fluffy tangerine planet{" "}
                  <span className="font-serif font-normal italic" style={{ color: MILO.tangerineInk }}>
                    with a moon full of agents.
                  </span>
                </h2>
                <p className="mb-8 max-w-xl text-[15.5px] leading-relaxed" style={{ color: MILO.inkSoft }}>
                  Big glossy eyes, a little blush, a tiny “w” of a mouth, and fur drawn entirely by SVG filters — no image
                  files. He is the app’s logo too: the mark is Milo himself, and the dot on the i in “milo” is his moon.
                </p>
              </Reveal>

              <ul className="grid gap-3 sm:grid-cols-2">
                {MILO_FACTS.map((f, i) => (
                  <Reveal key={f.title} delay={i * 0.05}>
                    <li className="h-full rounded-[22px] bg-white p-5" style={{ border: "1px solid rgba(26,20,24,0.1)" }}>
                      <span className="mb-3 grid h-8 w-8 place-items-center rounded-full font-dmmono text-[12px] font-bold" style={{ background: MILO.tangerine, color: INK }}>
                        {i + 1}
                      </span>
                      <p className="mb-1.5 font-manrope text-[16px] font-extrabold leading-snug">{f.title}</p>
                      <p className="text-[14px] leading-relaxed" style={{ color: MILO.inkSoft }}>
                        {f.body}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <Reveal>
                <div className="mt-4 rounded-[22px] p-6" style={{ background: INK, color: MILO.cream }}>
                  <p className="mb-3 font-dmmono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: MILO.moon }}>
                    His personality, as written in his prompt
                  </p>
                  <ul className="grid gap-2">
                    {PERSONALITY.map((p) => (
                      <li key={p} className="flex gap-3 text-[14.5px] leading-snug">
                        <span aria-hidden="true" className="mt-[7px] h-2 w-2 shrink-0 rounded-full" style={{ background: MILO.tangerine }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { n: "Tangerine", h: "#FF6F3C" },
                    { n: "Moon", h: "#FFD6C2" },
                    { n: "Blush", h: "#FF8FA3" },
                    { n: "Ink", h: "#1A1418" },
                  ].map((c) => (
                    <span key={c.n} className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-[12.5px] font-semibold" style={{ border: "1px solid rgba(26,20,24,0.1)" }}>
                      <span className="h-6 w-6 rounded-full" style={{ background: c.h, boxShadow: "inset 0 0 0 1px rgba(26,20,24,0.12)" }} />
                      {c.n}
                      <span className="font-dmmono text-[11px]" style={{ color: MILO.inkSoft }}>
                        {c.h}
                      </span>
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ HOW IT WORKS ════════════════════════════ */}
        <section id="how" className="relative px-6 py-24 md:py-32" style={{ background: MILO.night }}>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Kicker>How it works</Kicker>
              <h2 className="mb-4 max-w-3xl font-manrope text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[3.1rem]">
                No forms, no flowcharts.{" "}
                <span className="font-serif font-normal italic" style={{ color: MILO.tangerine }}>
                  Just a conversation.
                </span>
              </h2>
              <p className="mb-14 max-w-2xl text-[15.5px] leading-relaxed" style={{ color: MILO.text2 }}>
                Voice first, never voice only — everything also works by typing and tapping. These are the real
                screens, from the app’s example profile with real agent runs.
              </p>
            </Reveal>

            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {STEPS.map((s, i) => (
                <li key={s.n}>
                  <Reveal delay={i * 0.06} className="flex h-full flex-col">
                    <span className="mb-3 inline-flex w-max items-center gap-2 rounded-full px-3 py-1 font-dmmono text-[11px] font-bold" style={{ background: s.color, color: INK }}>
                      {s.n}
                    </span>
                    <h3 className="mb-2 font-manrope text-[1.2rem] font-extrabold leading-tight">{s.title}</h3>
                    <p className="mb-6 text-[14px] leading-relaxed" style={{ color: MILO.text2 }}>
                      {s.body}
                    </p>
                    <div className="mt-auto">
                      <PhoneShot shot={s.shot} focus={s.shot === "new" || s.shot === "agent" ? "top" : "bottom"} />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <div className="mt-16 grid items-end gap-6 lg:grid-cols-[0.42fr_1fr]">
              <Reveal>
                <PhoneShot shot="inbox" focus="top" />
                <p className="mt-3 text-center text-[13px]" style={{ color: MILO.text2 }}>
                  The inbox — every message, filterable by agent
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="overflow-hidden rounded-[18px]" style={{ background: "#1c1c21", border: `1px solid ${MILO.line}`, boxShadow: "0 40px 80px -40px rgba(0,0,0,0.8)" }}>
                  <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${MILO.line}` }}>
                    <span className="h-3 w-3 rounded-full" style={{ background: "#F1655B" }} />
                    <span className="h-3 w-3 rounded-full" style={{ background: "#F5BF4F" }} />
                    <span className="h-3 w-3 rounded-full" style={{ background: "#5DCB62" }} />
                    <span className="ml-3 font-dmmono text-[11px]" style={{ color: MILO.muted }}>
                      milo · on a wide screen
                    </span>
                  </div>
                  <Image src={IMG.shots.desktop.src} alt={IMG.shots.desktop.alt} width={IMG.shots.desktop.w} height={IMG.shots.desktop.h} sizes="(min-width: 1024px) 760px, 100vw" className="h-auto w-full" />
                </div>
                <p className="mt-3 text-center text-[13px]" style={{ color: MILO.text2 }}>
                  On a laptop the crew moves into a sidebar. Installable on Android, iPhone and desktop.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ TRY IT (sunset) ════════════════════════════ */}
        <section id="try" className="relative px-4 py-24 sm:px-6 md:py-32" style={{ background: MILO.sunset, color: INK }}>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Kicker color={INK}>Try it · a toy version</Kicker>
              <h2 className="mb-4 font-manrope text-[2.4rem] font-extrabold leading-[1] tracking-[-0.04em] md:text-[3.6rem]">
                Go on,{" "}
                <span className="font-serif font-normal italic">make one.</span>
              </h2>
              <p className="mb-10 max-w-xl text-[15.5px] font-medium leading-relaxed">
                Tap a wish or type your own, and watch Milo decide who plays it. The wishes are real starters. For
                anything you type, this toy runs the app’s fallback rule — match your words against each character’s
                keywords, prefer someone not already on your crew — and shows you what it matched.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <AgentMaker />
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ THE CAST ════════════════════════════ */}
        <section id="cast" className="relative scroll-mt-24 px-4 py-24 sm:px-6 md:py-32" style={{ background: MILO.night }}>
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mx-auto mb-14 max-w-3xl text-center">
                <div className="flex justify-center">
                  <Kicker>The cast · 24 characters</Kicker>
                </div>
                <h2 className="mb-5 font-manrope text-[2.4rem] font-extrabold leading-[1] tracking-[-0.04em] md:text-[3.6rem]">
                  Every agent{" "}
                  <span className="font-serif font-normal italic" style={{ color: MILO.tangerine }}>
                    is someone.
                  </span>
                </h2>
                <p className="text-[15.5px] leading-relaxed" style={{ color: MILO.text2 }}>
                  Twenty-four fluffy little characters, each with a name, a colour and a way of talking. Milo picks the
                  one whose strengths fit the job, and its persona is added to the agent’s instructions every time it
                  runs — so Sol sounds bright and brief, and Rook calm and protective. Tap a card to flip it.
                </p>
              </div>
            </Reveal>

            <CastGrid />

            <Reveal>
              <p className="mx-auto mt-10 max-w-2xl text-center text-[13.5px] leading-relaxed" style={{ color: MILO.muted }}>
                Never human, never realistic, never scary, and no text on them. Rename an agent and the character stays.
                Milo isn’t in the cast — he’s the one who makes them.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ WHAT IT MAKES TODAY (moon paper) ════════════════════════════ */}
        <section id="starters" className="relative px-6 py-24 md:py-32" style={{ background: MILO.cream, color: INK }}>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Kicker color={MILO.tangerineInk}>What Milo can make today</Kicker>
              <h2 className="mb-4 font-manrope text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[3.1rem]">
                Twenty-three helpers,{" "}
                <span className="font-serif font-normal italic" style={{ color: MILO.tangerineInk }}>
                  one tap each.
                </span>
              </h2>
              <p className="mb-10 max-w-2xl text-[15.5px] leading-relaxed" style={{ color: MILO.inkSoft }}>
                Ready-made agents in Milo’s five groups, each filled in from your profile and played by its own
                character. They need no AI to draft, so they still work when the model is busy. Ask Milo “what can you
                make?” and the whole list opens on screen.
              </p>
            </Reveal>

            <StarterTabs />

            <Reveal>
              <div className="mt-14 rounded-[26px] p-6 md:p-8" style={{ background: MILO.cream2, border: "1.5px dashed rgba(181,67,27,0.4)" }}>
                <p className="mb-1 font-manrope text-[1.25rem] font-extrabold">Or just describe one.</p>
                <p className="mb-5 text-[14.5px]" style={{ color: MILO.inkSoft }}>
                  These work today with the tools Milo already has — the character is picked for you.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {IDEAS.map((idea) => (
                    <li key={idea.idea} className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-[13.5px] font-semibold" style={{ border: "1px solid rgba(26,20,24,0.1)" }}>
                      <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: MILO.night }}>
                        <Av id={idea.avatar} size={24} />
                      </span>
                      {idea.idea}
                      <span className="font-normal" style={{ color: MILO.inkSoft }}>
                        · {castById(idea.avatar).name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ A STARTING APP (tangerine) ════════════════════════════ */}
        <section id="status" className="relative px-6 py-24 md:py-32" style={{ background: MILO.tangerine, color: INK }}>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Kicker color={INK}>Honest status</Kicker>
              <h2 className="mb-5 font-manrope text-[2.4rem] font-extrabold leading-[1] tracking-[-0.04em] md:text-[3.6rem]">
                A starting app.{" "}
                <span className="font-serif font-normal italic">Small agents first.</span>
              </h2>
              <p className="mb-12 max-w-2xl text-[16px] font-medium leading-relaxed">
                Milo is version one, and it says so. Today it makes basic, single-job agents that read the public web,
                remember what they already told you, and report back. Full-scale agents that work inside your other
                accounts and services — email, calendar, code — are the plan for what comes next, not something it
                does yet.
              </p>
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-[28px] p-7 md:p-8" style={{ background: INK, color: MILO.cream }}>
                  <p className="mb-1 font-dmmono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: MILO.ok }}>
                    ● Today
                  </p>
                  <p className="mb-5 font-manrope text-[1.6rem] font-extrabold leading-tight">Basic agents, done well</p>
                  <ul className="mb-7 grid gap-2.5">
                    {TODAY_CAN.map((t) => (
                      <li key={t} className="flex gap-3 text-[14.5px] leading-snug">
                        <span aria-hidden="true" className="font-bold" style={{ color: MILO.ok }}>
                          ✓
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mb-2.5 font-dmmono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: MILO.moon }}>
                    Its honest limits
                  </p>
                  <ul className="grid gap-2">
                    {TODAY_LIMITS.map((t) => (
                      <li key={t} className="flex gap-3 text-[13.5px] leading-snug" style={{ color: "rgba(255,245,238,0.8)" }}>
                        <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: MILO.amber }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="relative h-full rounded-[28px] p-7 md:p-8" style={{ background: MILO.cream, border: `2px dashed ${INK}` }}>
                  <span
                    className="absolute -top-4 right-6 rotate-3 rounded-full px-3.5 py-1.5 font-dmmono text-[11px] font-bold uppercase tracking-[0.16em]"
                    style={{ background: INK, color: MILO.moon }}
                  >
                    On the roadmap
                  </span>
                  <p className="mb-1 font-dmmono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: MILO.tangerineInk }}>
                    ◌ Next
                  </p>
                  <p className="mb-5 font-manrope text-[1.6rem] font-extrabold leading-tight">Full-scale external agents</p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {NEXT_UP.map((n) => (
                      <li key={n.title} className="rounded-[16px] bg-white p-3.5" style={{ border: "1px solid rgba(26,20,24,0.1)" }}>
                        <span className="block text-[14px] font-bold leading-snug">{n.title}</span>
                        <span className="block text-[12.5px] leading-snug" style={{ color: MILO.inkSoft }}>
                          {n.note}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="ml-bob grid h-14 w-14 shrink-0 place-items-center rounded-[16px]" style={{ background: MILO.night }}>
                      <Av id="bram" size={46} />
                    </span>
                    <p className="text-[13.5px] leading-snug" style={{ color: MILO.inkSoft }}>
                      Same rules as today: free services only, and anything that acts outward asks first. Still never:
                      buying, booking or paying on your behalf.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ UNDER THE HOOD ════════════════════════════ */}
        <section id="hood" className="relative px-6 py-24 md:py-32" style={{ background: MILO.night }}>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Kicker>Under the hood</Kicker>
              <h2 className="mb-4 font-manrope text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[3.1rem]">
                Agents are data,{" "}
                <span className="font-serif font-normal italic" style={{ color: MILO.tangerine }}>
                  not code.
                </span>
              </h2>
              <p className="mb-12 max-w-2xl text-[15.5px] leading-relaxed" style={{ color: MILO.text2 }}>
                Behind the fur is one React web app and one Cloudflare Worker. Four decisions do most of the work.
              </p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {NOTES.map((n, i) => (
                <Reveal key={n.n} delay={(i % 2) * 0.06}>
                  <article className="h-full rounded-[26px] p-6 md:p-7" style={{ background: MILO.surface, border: `1px solid ${MILO.line}` }}>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full font-dmmono text-[12.5px] font-bold" style={{ background: n.color, color: INK }}>
                        {n.n}
                      </span>
                      <h3 className="font-manrope text-[1.15rem] font-extrabold leading-tight">{n.title}</h3>
                    </div>
                    <p className="mb-5 text-[14.5px] leading-relaxed" style={{ color: MILO.text2 }}>
                      {n.body}
                    </p>
                    <blockquote className="border-l-2 pl-4 font-serif text-[1.25rem] italic leading-snug" style={{ borderColor: n.color, color: MILO.text }}>
                      {n.quote}
                    </blockquote>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] sm:grid-cols-3 lg:grid-cols-6" style={{ background: MILO.line }}>
                {LIMITS.map((l) => (
                  <div key={l.label} className="p-5" style={{ background: MILO.night }}>
                    <p className="font-manrope text-[1.9rem] font-extrabold leading-none tracking-[-0.03em]" style={{ color: MILO.moon }}>
                      {l.value}
                    </p>
                    <p className="mt-2 text-[12.5px] leading-snug" style={{ color: MILO.muted }}>
                      {l.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8 flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <span key={s} className="rounded-full px-3 py-1.5 font-dmmono text-[11.5px]" style={{ background: MILO.surface2, color: MILO.text, border: `1px solid ${MILO.line}` }}>
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ CLOSING ════════════════════════════ */}
        <section
          className="relative overflow-hidden px-6 pb-28 pt-20 text-center md:pb-36"
          style={{ background: `radial-gradient(60% 55% at 50% 38%, rgba(255,111,60,0.22) 0%, ${MILO.night} 70%)` }}
        >
          <Reveal>
            <div className="mx-auto mb-8 w-[180px] md:w-[210px]">
              <MiloLive state="idle" follow label="Milo, waiting to hear what would help" />
            </div>
            <h2 className="mb-5 font-manrope text-[2.4rem] font-extrabold leading-[1] tracking-[-0.04em] md:text-[3.6rem]">
              What would you like{" "}
              <span className="font-serif font-normal italic" style={{ color: MILO.tangerine }}>
                help with?
              </span>
            </h2>
            <p className="mx-auto mb-9 max-w-xl text-[15px] leading-relaxed" style={{ color: MILO.text2 }}>
              The app itself is personal — one owner, behind a passcode. Milo’s public page and the short show him at
              work.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={LINKS.publicPage} target="_blank" rel="noopener noreferrer" className="ml-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-manrope text-[15px] font-extrabold" style={{ background: MILO.text, color: MILO.night }}>
                Visit Milo’s page ↗
              </a>
              <a href={LINKS.short} target="_blank" rel="noopener noreferrer" className="ml-btn inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-manrope text-[14px] font-bold" style={{ color: MILO.text, border: `1.5px solid ${MILO.line2}` }}>
                ▶ Watch on YouTube ↗
              </a>
            </div>
            <p className="mt-12 text-[13px]" style={{ color: MILO.muted }}>
              Made with love (and a lot of fur) 🧡
            </p>
          </Reveal>
        </section>
      </main>

      <PageFaq href={PATH} surface={MILO.night} />
      <RelatedPages href={PATH} surface={MILO.night} />
      <Contact
        closingBg={`linear-gradient(180deg, ${MILO.night} 0%, #1a0f0b 14%, #0d0a0b 55%, #050505 100%)`}
        glowColor="rgba(255,111,60,0.16)"
        hazeColor="rgba(155,92,255,0.10)"
      />
    </MotionProvider>
  );
}
