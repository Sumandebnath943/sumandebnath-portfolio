import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageAnswer from "@/components/ui/PageAnswer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import Contact from "@/components/sections/Contact";
import PageFaq from "@/components/ui/PageFaq";
import HeroLock from "@/components/ui/HeroLock";
import { Reveal } from "@/components/penta/PentaWidgets";
import {
  DimensionWordmark,
  DualPerspectiveSwitcher,
  CausalityChainInteractive,
  GossipNetworkExplorer,
  WantedConsole,
  JobShiftsExplorer,
  SystemsLedgerExplorer,
  GalleryShowcase,
} from "@/components/pixelville-nd/PixelvilleNdVisuals";
import {
  ND,
  HUE_HEX,
  LINKS,
  IMG,
  HERO_STATS,
  MIND_PILLARS,
  LIFESTYLES,
  ECONOMY_RULES,
  MAYORS,
  OFFMAP_CITIES,
  PHONE_APPS,
  CHRISTMAS_TIMELINE,
  EVOLUTION_COMPARE,
  STACK_CHIPS,
  HONEST_POSTSCRIPT,
  type NdHue,
} from "@/components/pixelville-nd/pixelville-nd-data";

/* ── SEO, GEO & AEO Metadata ──────────────────────────────────────────────
   43 chars + " · Suman Debnath" (16 chars) = 59 chars total (< 60 SERP cap). */
const SITE = "https://sumandebnath.houseofnamus.com";
const PATH = "/games/pixelville-next-dimension";

export const metadata: Metadata = {
  title: "PixelVille: Next Dimension · 3D Village Sim",
  description:
    "Build from the sky and roam in 1st person: a 3D living-village simulation & exploration game with autonomous NPCs, AI chat, 1–5★ chases and 13 playable jobs.",
  keywords: [
    "PixelVille Next Dimension",
    "1st person village simulation game",
    "first person village exploration game",
    "3D village simulation browser game",
    "city builder mixed with GTA",
    "sim game where you walk around your town",
    "open world town simulation game",
    "autonomous NPC simulation game",
    "AI villager chat game",
    "self-governing village simulation",
    "Three.js 3D city builder",
    "PixelVille 3D",
    "Suman Debnath",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: "PixelVille: Next Dimension — 1st-Person 3D Living Village Simulation & Open-World Exploration Game",
    description:
      "A self-governing village simulation mixed with a GTA-style 3D street sandbox: build 87 building types from aerial God Mode, then drop into 1st-person street level to drive, enter 81 dressed interiors, work 13 jobs, and talk to autonomous AI villagers.",
    url: `${SITE}${PATH}`,
    images: [
      {
        url: IMG.loading.src,
        width: IMG.loading.w,
        height: IMG.loading.h,
        alt: IMG.loading.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelVille: Next Dimension — 1st-Person 3D Village Sim & Street Sandbox",
    description:
      "Aerial God Mode city builder meets 1st-person GTA-style village exploration: autonomous NPC minds, Groq AI villager chat, closed-loop economy, 1–5★ police chases & 13 playable jobs in the browser.",
    images: [IMG.loading.src],
  },
};

/* ── Structured Data (VideoGame + TechArticle, server-rendered HTML) ────── */
const gameLd = {
  "@context": "https://schema.org",
  "@type": ["VideoGame", "WebApplication"],
  "@id": `${SITE}${PATH}#game`,
  name: "PixelVille: Next Dimension",
  alternateName: [
    "PixelVille ND",
    "PixelVille – Next Dimension",
    "PixelVille 3D",
  ],
  description:
    "A browser-based first-person 3D living-village simulation and open-world exploration game built solo by Suman Debnath. Combines aerial God's-Eye city building across 87 building types with street-level 1st/3rd-person exploration, autonomous self-building NPCs, guardrailed Groq AI villager chat, a zero-conjured-money closed-loop economy, GTA-style 1–5 star witness-driven police chases, 81 enterable 3D interiors, 13 playable job shifts, and 6 off-map destination cities.",
  url: LINKS.live,
  mainEntityOfPage: `${SITE}${PATH}`,
  applicationCategory: "GameApplication",
  genre: [
    "First-Person Village Simulation",
    "Open-World Exploration Game",
    "3D City Builder",
    "Autonomous Life Simulation",
    "Street Sandbox",
  ],
  playMode: "SinglePlayer",
  gamePlatform: ["Web Browser", "Desktop Web", "Mobile Web", "PWA"],
  operatingSystem: "Any modern web browser (WebGL2)",
  softwareVersion: "2.0",
  datePublished: "2026-10-31",
  dateModified: "2026-10-31",
  inLanguage: "en",
  isBasedOn: {
    "@type": "VideoGame",
    name: "PixelVille",
    url: LINKS.v1Live,
  },
  author: {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: "Suman Debnath",
    url: SITE,
  },
  creator: {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: "Suman Debnath",
    url: SITE,
  },
  image: `${SITE}${IMG.loading.src}`,
  screenshot: [
    `${SITE}${IMG.loading.src}`,
    `${SITE}${IMG.phone.src}`,
    `${SITE}${IMG.driving.src}`,
    `${SITE}${IMG.plannerHigh.src}`,
    `${SITE}${IMG.night.src}`,
  ],
  featureList: [
    "Dual-mode gameplay: 1st/3rd-person street Founder Avatar and aerial God's-Eye Planner (P)",
    "256×256-tile (2 km × 2 km) procedural 3D PBR valley with 117 m rugged mountain peak and Spring Thaw",
    "Autonomous NPC minds with 5 personality traits, earned spatial knowledge, 14-entry episodic diary, and community self-building",
    "In-character Groq AI villager chat with server persona lock, clamped simulation effects, and mind-template fallback",
    "3-hop hearsay & reputation network controlling 10–20% shop discounts, home invitations, refusals, and police snitching",
    "GTA-style line-of-sight witness crime system and 1–5 star road-dispatched police chases with roadblocks, spike strips, and helicopter",
    "Zero-conjured-money closed-loop economy with real workplace tills, civic budgets, $6/day County Grant, and tracked household/player debts",
    "87 placeable building types and 81 enterable 3D interiors across 12 dressed room templates with real sim occupants",
    "13 playable live-event job shifts including Firefighter, Police, Paramedic, Airline Pilot (372 m runway), Train Driver, and PVTV Reporter",
    "Backward-compatible save importer for original 2D PixelVille (v4) villages",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${SITE}${PATH}#article`,
  headline:
    "PixelVille: Next Dimension — Architecting a 1st-Person 3D Living-Village Simulation and GTA-Style Open-World Sandbox in the Browser",
  description:
    "A complete technical and systems breakdown of PixelVille: Next Dimension (~47,000 lines of strict TypeScript, 170 headless Vitest tests, Three.js WebGL2 PBR shaders): how autonomous NPC minds, guardrailed LLM chat, a zero-conjured-money economy, district power blackouts, and swept-path traffic run under 1 ms per tick.",
  datePublished: "2026-10-31",
  dateModified: "2026-10-31",
  author: {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: "Suman Debnath",
    url: SITE,
  },
  publisher: {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: "Suman Debnath",
    url: SITE,
  },
  about: { "@id": `${SITE}${PATH}#game` },
  mainEntityOfPage: `${SITE}${PATH}`,
  image: `${SITE}${IMG.loading.src}`,
};

/* ── Scoped CSS (animation-fill-mode: backwards per PROJECT_BIBLE §5) ──── */
const KEYFRAMES = `
@keyframes pvnd-pulse {
  0%, 100% { transform: scale(1); opacity: 0.72; }
  50% { transform: scale(1.08); opacity: 1; }
}
@keyframes pvnd-rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.pvnd-rise { animation: pvnd-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
@media (prefers-reduced-motion: reduce) {
  .pvnd-rise, .pvnd-ring { animation: none !important; }
}
`;

/* ── Reusable Section Header ────────────────────────────────────────────── */
function SectionHeader({
  num,
  kicker,
  titleA,
  titleB,
  lead,
  hue = "gold",
}: {
  num: string;
  kicker: string;
  titleA: string;
  titleB: string;
  lead: string;
  hue?: NdHue;
}) {
  const accent = HUE_HEX[hue];
  return (
    <div className="max-w-3xl mb-10">
      <div className="flex items-center gap-2.5 mb-3">
        <span
          className="font-dmmono text-[10.5px] font-bold px-2 py-0.5 rounded"
          style={{ background: accent, color: ND.nightDeep }}
        >
          {num}
        </span>
        <span
          className="font-dmmono text-[11px] uppercase tracking-[0.24em]"
          style={{ color: accent }}
        >
          {kicker}
        </span>
      </div>
      <h2
        className="font-syne font-extrabold text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] tracking-tight mb-4 text-balance"
        style={{ color: ND.snow }}
      >
        {titleA}{" "}
        <span style={{ color: accent }}>{titleB}</span>
      </h2>
      <p
        className="font-manrope text-[15.5px] sm:text-base leading-[1.78]"
        style={{ color: ND.muted }}
      >
        {lead}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════ PAGE ═══════════════════════════════════ */

export default function PixelvilleNextDimensionPage() {
  return (
    <MotionProvider>
      <div
        style={{ background: ND.night, color: ND.text }}
        className="min-h-screen selection:bg-[#F0C27A] selection:text-[#05080f]"
      >
        <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gameLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />

        <Navigation />

        {/* overflow-x-clip keeps sticky children alive (AGENTS.md Rule 3) */}
        <main className="relative overflow-x-clip">
          {/* ═══════════════════════ HERO ═══════════════════════ */}
          <section className="relative pt-28 sm:pt-32 pb-16 px-5 sm:px-8">
            <HeroLock />

            {/* Ambient horizon & Founder-violet sky glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[620px]"
              style={{
                background:
                  "radial-gradient(ellipse 68% 46% at 50% 8%, rgba(165,139,255,0.20), rgba(240,194,122,0.10) 48%, transparent 78%)",
              }}
            />

            <div className="relative max-w-6xl mx-auto text-center">
              <Breadcrumbs
                align="center"
                className="mb-5"
                trail={[
                  { label: "Portfolio", href: "/projects" },
                  { label: "Games", href: null },
                  { label: "PixelVille: Next Dimension", href: PATH },
                ]}
              />

              <div className="mb-5 pvnd-rise">
                <DimensionWordmark />
              </div>

              <h1
                className="font-syne font-extrabold text-[2.25rem] sm:text-5xl md:text-[3.85rem] leading-[1.05] tracking-[-0.025em] max-w-5xl mx-auto text-balance"
                style={{ color: ND.snow }}
              >
                PixelVille: Next Dimension —{" "}
                <span style={{ color: ND.gold }}>
                  1st-Person 3D Living Village Simulation
                </span>{" "}
                &amp;{" "}
                <span style={{ color: ND.violet }}>
                  Open-World Exploration Game
                </span>
              </h1>

              {/* Extractable 51-word AEO definition directly after H1 */}
              <PageAnswer href={PATH} />

              <p
                className="font-manrope text-[15px] sm:text-[16.5px] leading-[1.75] max-w-3xl mx-auto mb-7"
                style={{ color: ND.muted }}
              >
                Built solo from an original question —{" "}
                <em style={{ color: ND.snow }}>
                  what if a self-governing village simulator let you drop down onto the pavement and live inside it like GTA?
                </em>{" "}
                Every citizen holds a private memory, discovers shops by word of mouth, elects mayors, and pools household savings to build hospitals you ignore — while you switch at will between aerial God Mode and a physical body on the street.
              </p>

              {/* Author & Freshness Dateline (GEO / AEO authorship signal) */}
              <div
                className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-dmmono text-[11px] mb-8 px-4 py-1.5 rounded-full"
                style={{
                  background: ND.panel,
                  border: `1px solid ${ND.line}`,
                  color: ND.muted,
                }}
              >
                <span>
                  Built solo by <strong style={{ color: ND.snow }}>Suman Debnath</strong>
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime="2026-10-31">October 2026</time>
                <span aria-hidden="true">·</span>
                <span style={{ color: ND.emerald }}>Free in Browser · No Install</span>
              </div>

              {/* Primary CTAs (Live Game + Internal anchors + PixelVille V1) */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
                <a
                  href={LINKS.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-syne font-bold text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${ND.goldBright}, ${ND.gold})`,
                    color: ND.nightDeep,
                    boxShadow: "0 14px 36px -10px rgba(240,194,122,0.55)",
                  }}
                >
                  <span>Play PixelVille: Next Dimension</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href="#dual-mode"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-manrope font-semibold text-sm transition-colors hover:bg-white/10"
                  style={{
                    background: ND.panel,
                    color: ND.snow,
                    border: `1px solid ${ND.line}`,
                  }}
                >
                  Explore All Systems ↓
                </a>

                <Link
                  href={LINKS.v1Page}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-dmmono text-xs uppercase tracking-[0.14em] transition-colors hover:bg-white/10"
                  style={{
                    background: "transparent",
                    color: ND.violet,
                    border: "1px solid rgba(165,139,255,0.35)",
                  }}
                >
                  Origin: PixelVille V1 (2D) →
                </Link>
              </div>

              {/* Dual Hero Showcase Frame: Key Art + Live Flyover Menu */}
              <div className="grid lg:grid-cols-12 gap-4 text-left">
                <figure
                  className="lg:col-span-7 rounded-2xl overflow-hidden"
                  style={{
                    background: ND.panel,
                    border: `1px solid ${ND.lineHi}`,
                    boxShadow: "0 30px 90px -28px rgba(0,0,0,0.85)",
                  }}
                >
                  <Image
                    src={IMG.loading.src}
                    alt={IMG.loading.alt}
                    width={IMG.loading.w}
                    height={IMG.loading.h}
                    priority
                    sizes="(min-width: 1024px) 660px, 100vw"
                    className="w-full h-auto block"
                  />
                  <figcaption
                    className="px-4 py-3 font-manrope text-[12.5px] flex items-center justify-between gap-3"
                    style={{ color: ND.muted }}
                  >
                    <span>
                      <strong style={{ color: ND.gold }}>A Living Village, Now in 3D:</strong>{" "}
                      Valley river, curved mainline rail, and the 117 m rugged mountain peak.
                    </span>
                    <span className="font-dmmono text-[10.5px] shrink-0" style={{ color: ND.faint }}>
                      WebGL2 · PBR
                    </span>
                  </figcaption>
                </figure>

                <figure
                  className="lg:col-span-5 rounded-2xl overflow-hidden flex flex-col justify-between"
                  style={{
                    background: ND.panel,
                    border: `1px solid ${ND.line}`,
                  }}
                >
                  <Image
                    src={IMG.landing.src}
                    alt={IMG.landing.alt}
                    width={IMG.landing.w}
                    height={IMG.landing.h}
                    sizes="(min-width: 1024px) 460px, 100vw"
                    className="w-full h-auto block"
                  />
                  <figcaption
                    className="px-4 py-3 font-manrope text-[12.5px]"
                    style={{ color: ND.muted }}
                  >
                    <strong style={{ color: ND.snow }}>Live landing flyover:</strong>{" "}
                    The title screen hovers in real time over your active save (<em>Rosedale · 250 villagers</em>) or spins up an instant <strong>Auto Village</strong>.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ SSR VERIFIABLE NUMBERS ═══════════════════════ */}
          <section
            aria-label="Key specifications and verifiable game metrics"
            className="py-12 px-5 sm:px-8 border-y"
            style={{ background: ND.nightDeep, borderColor: ND.line }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {HERO_STATS.map((st) => {
                  const c = HUE_HEX[st.hue];
                  return (
                    <div
                      key={st.label}
                      className="rounded-2xl p-4"
                      style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                    >
                      <div
                        className="font-syne font-extrabold text-2xl sm:text-[1.7rem] leading-none mb-1.5"
                        style={{ color: c }}
                      >
                        {st.value}
                      </div>
                      <div
                        className="font-dmmono text-[11px] font-semibold uppercase tracking-[0.12em] mb-1"
                        style={{ color: ND.snow }}
                      >
                        {st.label}
                      </div>
                      <p className="font-manrope text-[11.5px] leading-snug" style={{ color: ND.muted }}>
                        {st.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════════ 01 · DUAL PERSPECTIVE USP ═══════════════════════ */}
          <section id="dual-mode" className="py-20 px-5 sm:px-8">
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionHeader
                  num="01"
                  kicker="THE CORE BREAKTHROUGH · GOD AVATAR ⇄ GOD PLANNER"
                  titleA="How does PixelVille: Next Dimension merge a city builder with a"
                  titleB="1st-person GTA street sandbox?"
                  lead="Most town simulators lock you in the clouds over ant-sized agents; open-world street games fill blocks with disposable ambient traffic that despawns around the next corner. PixelVille: Next Dimension runs both perspectives simultaneously on one deterministic simulation — press P to build from the sky, then drop into your Founder body on the pavement and live with what you built."
                  hue="gold"
                />
              </Reveal>

              {/* Interactive Dual-Perspective Switcher */}
              <Reveal>
                <DualPerspectiveSwitcher />
              </Reveal>

              {/* Always-rendered SSR summary of both modes + Founder's Lodge & Speed pill */}
              <div className="grid md:grid-cols-12 gap-5 mt-6">
                <figure
                  className="md:col-span-7 rounded-2xl overflow-hidden"
                  style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                >
                  <Image
                    src={IMG.lodge.src}
                    alt={IMG.lodge.alt}
                    width={IMG.lodge.w}
                    height={IMG.lodge.h}
                    sizes="(min-width: 768px) 620px, 100vw"
                    className="w-full h-auto block"
                  />
                  <figcaption className="p-4 font-manrope text-[13px] leading-relaxed" style={{ color: ND.muted }}>
                    <strong style={{ color: ND.snow }}>The Founder&apos;s Lodge &amp; live HUD alerts:</strong>{" "}
                    Your home, spawn point, and private driveway (garage keys hang inside). Notice the bottom-left pills: your <code style={{ color: ND.gold }}>$120</code> wallet, town reputation (<em>A newcomer</em>), and a live red <strong style={{ color: ND.crimson }}>⚡ Rolling blackout here</strong> alert — while PVTV logs real street gossip on the right.
                  </figcaption>
                </figure>

                <div
                  className="md:col-span-5 rounded-2xl p-6 flex flex-col justify-between"
                  style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                >
                  <div>
                    <div className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-2" style={{ color: ND.violet }}>
                      ASYMMETRIC RULES BY DESIGN
                    </div>
                    <h3 className="font-syne font-bold text-xl mb-3" style={{ color: ND.snow }}>
                      Free from the sky. Accountable on the pavement.
                    </h3>
                    <ul className="space-y-2.5 font-manrope text-[13.5px] leading-[1.65]" style={{ color: ND.muted }}>
                      <li>
                        <strong style={{ color: ND.gold }}>• 12 selectable Founder portraits:</strong>{" "}
                        Pick a man or woman across 6 faces each, wearing the exclusive Founder&apos;s violet coat, gold scarf, and ground ring no NPC wears.
                      </li>
                      <li>
                        <strong style={{ color: ND.sky }}>• No escape-hatch cheating:</strong>{" "}
                        Rising into The Planner (<kbd className="font-dmmono text-xs">P</kbd>) is locked whenever police are chasing you or while you are clocked into a job shift.
                      </li>
                      <li>
                        <strong style={{ color: ND.emerald }}>• Time-warp discipline:</strong>{" "}
                        Street mode runs at 1× real life so driving and walking feel physical; aerial Planner mode unlocks 2×, 4×, and 8× fast-forward.
                      </li>
                    </ul>
                  </div>

                  <div
                    className="mt-5 rounded-xl p-3.5 flex items-center justify-between gap-3"
                    style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}
                  >
                    <span className="font-dmmono text-[11px]" style={{ color: ND.muted }}>
                      Planner time-warp HUD:
                    </span>
                    <Image
                      src={IMG.speed.src}
                      alt={IMG.speed.alt}
                      width={IMG.speed.w}
                      height={IMG.speed.h}
                      sizes="171px"
                      className="h-9 w-auto rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ 02 · CAUSALITY & 4 INFRASTRUCTURES ═══════════════════════ */}
          <section
            id="causality"
            className="py-20 px-5 sm:px-8 border-t"
            style={{ background: ND.nightDeep, borderColor: ND.line }}
          >
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionHeader
                  num="02"
                  kicker="EMERGENT CAUSALITY · ZERO FAKE TRAFFIC OR CROWDS"
                  titleA="Nothing on screen is decorative:"
                  titleB="every vehicle, blackout, and casualty is real."
                  lead="In PixelVille: Next Dimension, the 3D renderer reads the headless simulation and never fakes an actor. A fire engine passing your car was dispatched to an actual burning shop; a queue at a bus shelter is real commuters; a darkened street lamp is a real 32 × 32-tile district fault that also killed the junction signals ahead."
                  hue="sky"
                />
              </Reveal>

              <Reveal>
                <CausalityChainInteractive />
              </Reveal>

              {/* The 4 Interlocking Infrastructure Sims */}
              <div className="grid md:grid-cols-2 gap-4 mt-7">
                {[
                  {
                    tag: "GRID · 32×32 DISTRICTS",
                    title: "District Power Grid & Rolling Blackouts",
                    hue: "amber" as NdHue,
                    points: [
                      "Every building draws real load (1/floor for homes, 4 for flats, 12 for steelworks, 14 for skyscrapers) peaking every evening.",
                      "A staffed Power Plant supplies up to 160; the highway county line supplies 60 billed directly to the village fund.",
                      "Deficits rotate 90-minute rolling blackouts district-by-district — sparing the Hospital's district until last.",
                      "Lightning, heavy rain trees-on-lines, ice, tornadoes, quakes & floods trip up to 3 concurrent faults repaired by road-driving crews.",
                    ],
                  },
                  {
                    tag: "HEALTH · 0–100 VITALITY",
                    title: "Seasonal Epidemics, Trauma & 12-Bed Wards",
                    hue: "crimson" as NdHue,
                    points: [
                      "Every villager tracks 0–100 health across winter colds, contagious flu waves (prompting Town Hall to build Pharmacies), and pneumonia.",
                      "Traffic collisions, smoke inhalation, and disasters create physical street casualties stabilized by road-dispatched Paramedics.",
                      "Staffed Hospitals run 12 inpatient beds at $14/day; full wards push a second Hospital onto the mayor's urgent build list.",
                      "Shortages of educated doctors measurably slow ward recovery rates.",
                    ],
                  },
                  {
                    tag: "EDUCATION · +45% GRADUATE PAY",
                    title: "Schools, Colleges & Skilled Air Migration",
                    hue: "violet" as NdHue,
                    points: [
                      "Children attend school for 10+ days to earn a School Certificate at 18; adults study 12 days at College for a Degree.",
                      "Graduate roles (doctors, power engineers, airline pilots, lecturers, bankers, PVTV reporters) pay 45% higher wages.",
                      "Unfilled graduate posts prompt the mayor to build a College — and fly skilled newcomer families in through the Airport.",
                    ],
                  },
                  {
                    tag: "SUPPLY · 4 PHYSICAL GOODS",
                    title: "Yards, Lorries, Shelves & Stalling Scaffolds",
                    hue: "emerald" as NdHue,
                    points: [
                      "Farms, sawmills, brickworks, textile mills & factories stock producer yards (up to 90 units) across Food, Materials, Textiles & Products.",
                      "Painted delivery lorries and overnight freight trains haul stock to Warehouses, shop shelves, and active building sites.",
                      "Low shop shelves raise prices +40% and move stock tickers; empty shelves make zero sales; material-starved building sites physically halt!",
                    ],
                  },
                ].map((inf) => {
                  const c = HUE_HEX[inf.hue];
                  return (
                    <div
                      key={inf.title}
                      className="rounded-2xl p-6"
                      style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                    >
                      <div className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: c }}>
                        {inf.tag}
                      </div>
                      <h3 className="font-syne font-bold text-xl mb-3" style={{ color: ND.snow }}>
                        {inf.title}
                      </h3>
                      <ul className="space-y-2 font-manrope text-[13.5px] leading-[1.65]" style={{ color: ND.muted }}>
                        {inf.points.map((pt) => (
                          <li key={pt} className="flex gap-2">
                            <span style={{ color: c }} aria-hidden="true">▸</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════════ 03 · LIVING MINDS, GOSSIP & AI CHAT ═══════════════════════ */}
          <section id="living-minds" className="py-20 px-5 sm:px-8 border-t" style={{ borderColor: ND.line }}>
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionHeader
                  num="03"
                  kicker="COGNITIVE NPC ARCHITECTURE · GROQ LLM + DETERMINISTIC GUARDRAILS"
                  titleA="How do villagers think, remember, gossip, and hold"
                  titleB="live AI conversations?"
                  lead="Every citizen in PixelVille: Next Dimension carries an individual cognitive state (mind.ts) that persists across saves. They discover your city block by block, form friendships that cool without contact, hold grudges or gratitude toward you across three hops of street gossip, and speak in character through a server-guarded language model."
                  hue="violet"
                />
              </Reveal>

              {/* 4 Mind Pillars */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
                {MIND_PILLARS.map((p) => {
                  const c = HUE_HEX[p.hue];
                  return (
                    <div
                      key={p.title}
                      className="rounded-2xl p-5 flex flex-col justify-between"
                      style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                    >
                      <div>
                        <span
                          className="inline-block font-dmmono text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded mb-3"
                          style={{ background: ND.nightDeep, color: c, border: `1px solid ${c}44` }}
                        >
                          {p.code}
                        </span>
                        <h3 className="font-syne font-bold text-lg mb-2" style={{ color: ND.snow }}>
                          {p.title}
                        </h3>
                        <p className="font-manrope text-[13px] leading-[1.68] mb-4" style={{ color: ND.muted }}>
                          {p.body}
                        </p>
                      </div>
                      <div
                        className="pt-3 font-dmmono text-[10.5px]"
                        style={{ borderTop: `1px solid ${ND.lineSoft}`, color: c }}
                      >
                        {p.metric}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive 3-Hop Hearsay & Reputation Explorer */}
              <Reveal>
                <GossipNetworkExplorer />
              </Reveal>

              {/* Guardrailed Groq AI Chat + 8 Lifestyles */}
              <div className="grid lg:grid-cols-12 gap-5 mt-7">
                <div
                  className="lg:col-span-6 rounded-2xl p-6 flex flex-col justify-between"
                  style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                >
                  <div>
                    <div className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-2" style={{ color: ND.emerald }}>
                      IN-CHARACTER LLM DIALOGUE · api/_chat.ts
                    </div>
                    <h3 className="font-syne font-bold text-2xl mb-3" style={{ color: ND.snow }}>
                      Free-form AI chat that can never corrupt the simulation
                    </h3>
                    <p className="font-manrope text-[13.5px] leading-[1.72] mb-4" style={{ color: ND.muted }}>
                      Walk up to any villager (<kbd className="font-dmmono text-xs">E</kbd>), knock on their front door, or ring them from PVTel&apos;s <strong>Contacts</strong> app (nobody answers between 23:00 and 06:30 while asleep!). Each turn injects ~1–2k tokens of live truth: their 5 traits, job and wage, household members, whether their lights are out, their 14 diary memories, their exact opinion of you, and the last 9 days of village news.
                    </p>
                    <ul className="space-y-2 font-manrope text-[13px] leading-[1.65]" style={{ color: ND.text }}>
                      <li>
                        <strong style={{ color: ND.gold }}>• Server-enforced fourth wall:</strong>{" "}
                        Villagers know you only as the mysterious local <em>Founder</em> around whom buildings seem to rise — never as a player at a screen.
                      </li>
                      <li>
                        <strong style={{ color: ND.violet }}>• Clamped structured effects:</strong>{" "}
                        The model can return JSON shifts to opinion, mood, memory, or a newly learned building — strictly clamped client-side (<code style={{ color: ND.gold }}>±1</code> opinion/turn, <code style={{ color: ND.gold }}>−2 to +1.5</code>/chat) so prompt injection cannot conjure cash or max reputation.
                      </li>
                      <li>
                        <strong style={{ color: ND.sky }}>• Episodic chat memory + offline fallback:</strong>{" "}
                        Closing a conversation writes a 1-line summary into their diary for tomorrow, and seamlessly falls back to mind-driven templates when offline or rate-limited.
                      </li>
                    </ul>
                  </div>

                  <figure
                    className="mt-5 rounded-xl overflow-hidden flex items-center justify-center p-3"
                    style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}
                  >
                    <Image
                      src={IMG.guide.src}
                      alt={IMG.guide.alt}
                      width={IMG.guide.w}
                      height={IMG.guide.h}
                      sizes="409px"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </figure>
                </div>

                {/* 8 Adult Lifestyles + Circle of Life */}
                <div
                  className="lg:col-span-6 rounded-2xl p-6"
                  style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                >
                  <div className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-2" style={{ color: ND.gold }}>
                    8 ADULT LIFESTYLE ARCHETYPES &amp; CIRCLE OF LIFE
                  </div>
                  <h3 className="font-syne font-bold text-2xl mb-3" style={{ color: ND.snow }}>
                    Whole biographies lived in weeks of play
                  </h3>
                  <p className="font-manrope text-[13.5px] leading-[1.68] mb-4" style={{ color: ND.muted }}>
                    Villagers age 1 year per game week — growing from schoolkids into one of 8 economic lifestyles, working 22 seasonal side gigs between careers, falling in love, marrying, welcoming babies, occasionally separating, retiring at 65, and receiving neighbour visits when hit by despair.
                  </p>

                  <div className="space-y-2">
                    {LIFESTYLES.map((lf) => (
                      <div
                        key={lf.name}
                        className="rounded-xl px-3.5 py-2.5 flex items-start justify-between gap-3"
                        style={{ background: ND.nightDeep, border: `1px solid ${ND.lineSoft}` }}
                      >
                        <div>
                          <span className="font-syne font-bold text-[13.5px]" style={{ color: ND.snow }}>
                            {lf.name}
                          </span>
                          <p className="font-manrope text-[12px] leading-snug mt-0.5" style={{ color: ND.muted }}>
                            {lf.behaviour}
                          </p>
                        </div>
                        <span
                          className="shrink-0 font-dmmono text-[11px] font-bold px-2 py-0.5 rounded"
                          style={{ background: ND.goldSoft, color: ND.gold }}
                        >
                          {lf.share}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ 04 · CRIME, WITNESSES, 1–5★ WANTED & MOTORING ═══════════════════════ */}
          <section
            id="street-sandbox"
            className="py-20 px-5 sm:px-8 border-t"
            style={{ background: ND.nightDeep, borderColor: ND.line }}
          >
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionHeader
                  num="04"
                  kicker="GTA-STYLE STREET SANDBOX · FAIR LINE-OF-SIGHT CONSEQUENCES"
                  titleA="What happens when you break the law in your own village?"
                  titleB="Witnesses, 1–5★ chases, showrooms & wardens."
                  lead="There is no omniscient crime trigger. Running a red light, speeding past 60 km/h, driving the wrong carriageway of a twin avenue, or hijacking a family's saloon from their driveway only counts if a patrol car, road camera, or villager within 32 metres actually has an unobstructed line of sight."
                  hue="crimson"
                />
              </Reveal>

              <Reveal>
                <WantedConsole />
              </Reveal>

              <div className="grid lg:grid-cols-12 gap-5 mt-6 items-stretch">
                {/* Wasted screenshot + Busted/Wasted fairness rules */}
                <figure
                  className="lg:col-span-7 rounded-2xl overflow-hidden flex flex-col justify-between"
                  style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                >
                  <Image
                    src={IMG.wasted.src}
                    alt={IMG.wasted.alt}
                    width={IMG.wasted.w}
                    height={IMG.wasted.h}
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="w-full h-auto block"
                  />
                  <figcaption className="p-5 space-y-2">
                    <div className="font-syne font-bold text-lg" style={{ color: ND.snow }}>
                      No station, no police — and every crash bill enters the real ledger
                    </div>
                    <p className="font-manrope text-[13.5px] leading-[1.68]" style={{ color: ND.muted }}>
                      Police cruisers never teleport behind you: they drive out of staffed Police Stations over real roads, making unpoliced outskirts genuine escape routes. An unwitnessed car theft stays quiet for 20–45 game minutes until the family notices and reports the plate &ldquo;hot&rdquo;. High-speed crashes (~80 km/h) trigger <strong style={{ color: ND.crimson }}>WASTED</strong> — waking you 4 hours later at the Hospital with an honest ward bill (<code style={{ color: ND.gold }}>$90 — $40 owed</code> above) and your damaged saloon towed. Villagers are injured and treated by ambulance, never killed.
                    </p>
                  </figcaption>
                </figure>

                {/* Fleet, Showrooms, Fuel, Damage & Parking Wardens */}
                <div
                  className="lg:col-span-5 rounded-2xl p-6 flex flex-col justify-between"
                  style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                >
                  <div>
                    <div className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-2" style={{ color: ND.amber }}>
                      MOTORING · SHOWROOMS, FUEL &amp; WARDENS
                    </div>
                    <h3 className="font-syne font-bold text-xl mb-3" style={{ color: ND.snow }}>
                      A persistent garage with fuel tanks, dents, and parking tickets
                    </h3>
                    <ul className="space-y-2.5 font-manrope text-[13px] leading-[1.65]" style={{ color: ND.muted }}>
                      <li>
                        <strong style={{ color: ND.snow }}>• Car &amp; Motorcycle Showrooms:</strong>{" "}
                        Buy <em>Pixel Hatch, Ville Saloon, Meadow Estate, Ridge 4×4</em> ($280–$520) or leaning <em>Sprite 125 &amp; Ridge 650</em> bikes ($160–$260) in 10 paints, with 55% part-exchange paid from the showroom&apos;s till.
                      </li>
                      <li>
                        <strong style={{ color: ND.snow }}>• Distance fuel &amp; forecourts:</strong>{" "}
                        Tanks last ~26 km (cars) or ~20 km (bikes), auto-pinning the nearest Gas Station at 15% and crawling when dry.
                      </li>
                      <li>
                        <strong style={{ color: ND.snow }}>• Crash wear &amp; Auto Garage:</strong>{" "}
                        Dents cut top speed past 50% and total the engine at 100%; repair between 08:00–18:00 or call a $35 tow from the Garage app.
                      </li>
                      <li>
                        <strong style={{ color: ND.snow }}>• Street Parking Wardens:</strong>{" "}
                        Abandon your car on a zebra, junction, bus shelter, or rail line and wardens write a <strong>$15 ticket after 45 min</strong> and <strong>impound-tow ($40) after 2 hours</strong>.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ 05 · CLOSED-LOOP ECONOMY & SELF-GOVERNING DEMOCRACY ═══════════════════════ */}
          <section id="economy-democracy" className="py-20 px-5 sm:px-8 border-t" style={{ borderColor: ND.line }}>
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionHeader
                  num="05"
                  kicker="ZERO CONJURED MONEY · ELECTIONS & COMMUNITY SELF-BUILDING"
                  titleA="A closed-loop economy and a village that"
                  titleB="governs and builds itself."
                  lead="Every dollar in PixelVille: Next Dimension comes from somewhere and goes somewhere — verified by dedicated economy audit tests. And just like the original PixelVille's signature breakthrough, citizens never sit idle waiting on an inactive god: they campaign, vote on their own quality of life, and pool household savings to construct vital infrastructure you neglect."
                  hue="emerald"
                />
              </Reveal>

              {/* 4 Economy Rules */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {ECONOMY_RULES.map((rule) => (
                  <div
                    key={rule.title}
                    className="rounded-2xl p-6"
                    style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                  >
                    <code className="font-dmmono text-[10.5px]" style={{ color: ND.emerald }}>
                      {rule.code}
                    </code>
                    <h3 className="font-syne font-bold text-xl mt-1 mb-2" style={{ color: ND.snow }}>
                      {rule.title}
                    </h3>
                    <p className="font-manrope text-[13.5px] leading-[1.7]" style={{ color: ND.muted }}>
                      {rule.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* 4 Mayors + Hustings + Community Self-Build Banner */}
              <div
                className="rounded-3xl p-6 sm:p-8"
                style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
              >
                <div className="max-w-3xl mb-6">
                  <div className="font-dmmono text-[10.5px] uppercase tracking-[0.22em] mb-1.5" style={{ color: ND.gold }}>
                    28-DAY DEMOCRATIC CYCLE · HUSTINGS ON NEIGHBOURHOOD GREENS
                  </div>
                  <h3 className="font-syne font-bold text-2xl sm:text-3xl mb-2" style={{ color: ND.snow }}>
                    7-day street campaigns, physical polling booths, and four mayor archetypes
                  </h3>
                  <p className="font-manrope text-[14px] leading-[1.72]" style={{ color: ND.muted }}>
                    A week before every election, coloured bunting goes up, loudspeaker cars tour avenues, and candidates hold pre-dusk soapbox rallies on neighbourhood greens (never blocking carriageways) promising the village&apos;s actual top need. On polling day (08:00–18:00), real adult citizens drive, park, queue at booths beside Town Hall, and cast ballots calculated from their personal health, dark-home blackouts, employment, safety, and tax rate.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
                  {MAYORS.map((m) => {
                    const c = HUE_HEX[m.hue];
                    return (
                      <div
                        key={m.archetype}
                        className="rounded-2xl p-4 flex flex-col justify-between"
                        style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-dmmono text-[10px] uppercase tracking-[0.14em]" style={{ color: c }}>
                              {m.tag}
                            </span>
                          </div>
                          <h4 className="font-syne font-bold text-lg mb-1" style={{ color: ND.snow }}>
                            {m.archetype}
                          </h4>
                          <div className="font-dmmono text-[11px] mb-2.5" style={{ color: c }}>
                            {m.skim}
                          </div>
                          <p className="font-manrope text-[12.5px] leading-[1.6] mb-3" style={{ color: ND.text }}>
                            <strong>Builds:</strong> {m.priorities}
                          </p>
                        </div>
                        <p className="font-manrope text-[12px] leading-[1.55] pt-2.5" style={{ borderTop: `1px solid ${ND.lineSoft}`, color: ND.muted }}>
                          {m.quirk}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Signature Community Self-Building Callout */}
                <div
                  className="rounded-2xl p-5 sm:p-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(240,194,122,0.12), rgba(165,139,255,0.10))",
                    border: `1px solid ${ND.lineHi}`,
                  }}
                >
                  <div className="font-dmmono text-[10.5px] uppercase tracking-[0.22em] mb-1" style={{ color: ND.gold }}>
                    THE PIXELVILLE SIGNATURE · AUTONOMOUS CITIZEN ACTION
                  </div>
                  <h4 className="font-syne font-bold text-xl mb-1.5" style={{ color: ND.snow }}>
                    And when both you and the Mayor fail — the villagers pool their savings and build it themselves.
                  </h4>
                  <p className="font-manrope text-[14px] leading-[1.72]" style={{ color: ND.text }}>
                    Leave a growing village without a Hospital, Fire Station, Police Station, or School while a corrupt mayor skims the treasury, and citizens don&apos;t simply complain: households contribute from their own bank balances to fund and erect the missing facility, form neighbour bucket brigades when fires break out, and gather to clear rubble and rebuild collapsed blocks even if the player never clicks once.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ 06 · 13 JOBS, 81 INTERIORS, TRANSIT & 6 CITIES ═══════════════════════ */}
          <section
            id="jobs-transit"
            className="py-20 px-5 sm:px-8 border-t"
            style={{ background: ND.nightDeep, borderColor: ND.line }}
          >
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionHeader
                  num="06"
                  kicker="13 LIVE-EVENT CAREERS · 81 DRESSED INTERIORS · 6 OFF-MAP CITIES"
                  titleA="Work every job in town, walk inside 81 buildings, and"
                  titleB="travel beyond the horizon."
                  lead="Every shift in PixelVille: Next Dimension runs on real simulation events — never spawned dummy objectives. Clock in from PVTel's Jobs app or a workplace counter, borrow the company rig at the kerb, intercept live emergencies via Life.claim, and collect wages straight from the workplace's till (two to five good shifts buy a showroom car)."
                  hue="gold"
                />
              </Reveal>

              {/* All 13 Playable Job Shifts */}
              <Reveal>
                <JobShiftsExplorer />
              </Reveal>

              {/* 81 Enterable Interiors + Hospital Shot + 11 PVTel Apps */}
              <div className="grid lg:grid-cols-12 gap-5 mt-12">
                <div
                  className="lg:col-span-6 rounded-2xl overflow-hidden flex flex-col justify-between"
                  style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                >
                  <Image
                    src={IMG.hospital.src}
                    alt={IMG.hospital.alt}
                    width={IMG.hospital.w}
                    height={IMG.hospital.h}
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="w-full h-auto block"
                  />
                  <div className="p-6">
                    <div className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-1.5" style={{ color: ND.violet }}>
                      81 ENTERABLE BUILDING TYPES · 12 DRESSED TEMPLATES
                    </div>
                    <h3 className="font-syne font-bold text-xl mb-2.5" style={{ color: ND.snow }}>
                      Seed-consistent rooms dressed with art, curtains, outdoor light &amp; real staff
                    </h3>
                    <p className="font-manrope text-[13.5px] leading-[1.7]" style={{ color: ND.muted }}>
                      Press <kbd className="font-dmmono text-xs">E</kbd> at 81 building types to step into a room laid out deterministically from that building&apos;s seed: bakery glass cases and ovens, bank teller counters, the PVTV studio set, cars raised on the garage lift, fire engines in bays, church pews and stained glass, cinema rows, and terminal departure boards. Rooms carry cornices, wall paintings, curtains framing sunlit street views, pendant shades, potted plants, usable counters/ATMs, and the actual simulated staff and customers currently inside.
                    </p>
                  </div>
                </div>

                {/* PVTel 11 Smartphone Apps */}
                <div
                  className="lg:col-span-6 rounded-2xl p-6"
                  style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                >
                  <div className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-1.5" style={{ color: ND.sky }}>
                    PVTEL OS · PRESS TAB ANYWHERE ON THE STREET
                  </div>
                  <h3 className="font-syne font-bold text-xl mb-3" style={{ color: ND.snow }}>
                    Eleven pocket apps tying every town system together
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {PHONE_APPS.map((app) => (
                      <div
                        key={app.name}
                        className="rounded-xl p-3"
                        style={{ background: ND.nightDeep, border: `1px solid ${ND.lineSoft}` }}
                      >
                        <div className="font-syne font-bold text-[13.5px] mb-0.5" style={{ color: ND.gold }}>
                          {app.name}
                        </div>
                        <p className="font-manrope text-[12px] leading-snug" style={{ color: ND.muted }}>
                          {app.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Swept-Path Traffic, Parking & 6 Off-Map Destination Cities */}
              <div className="grid lg:grid-cols-12 gap-5 mt-6">
                <div
                  className="lg:col-span-5 rounded-2xl p-6 flex flex-col justify-between"
                  style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                >
                  <div>
                    <div className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-2" style={{ color: ND.emerald }}>
                      TRAFFIC ENGINEERING &amp; PARKING GEOMETRY
                    </div>
                    <h3 className="font-syne font-bold text-xl mb-3" style={{ color: ND.snow }}>
                      Swept Junction Boxes, 0-wall-hit reverse parking &amp; zero permanent jams
                    </h3>
                    <ul className="space-y-2 font-manrope text-[13px] leading-[1.65]" style={{ color: ND.muted }}>
                      <li>
                        <strong style={{ color: ND.snow }}>• Junction Boxes (MASKS):</strong>{" "}
                        Drivers reserve swept intersection quarters only when exit space is clear; longest-waiting outranks, while dual straight-throughs and right turns share simultaneously.
                      </li>
                      <li>
                        <strong style={{ color: ND.snow }}>• Real driveways, bays &amp; Car Parks:</strong>{" "}
                        Families never own more cars than driveway slots; drivers pre-book shop bays (or 8-bay Car Parks) and reverse in around the rear axle (0 wall hits across 655 audited moves).
                      </li>
                      <li>
                        <strong style={{ color: ND.snow }}>• 13 s rail booms &amp; 100 s gridlock relief:</strong>{" "}
                        Level crossings flash 13 s ahead of trains; any villager car held 100 s parks and walks so no jam can ever freeze the town.
                      </li>
                    </ul>
                  </div>

                  <figure className="mt-5 rounded-xl overflow-hidden" style={{ border: `1px solid ${ND.line}` }}>
                    <Image
                      src={IMG.plannerTown.src}
                      alt={IMG.plannerTown.alt}
                      width={IMG.plannerTown.w}
                      height={IMG.plannerTown.h}
                      sizes="(min-width: 1024px) 440px, 100vw"
                      className="w-full h-auto block"
                    />
                  </figure>
                </div>

                {/* 6 Off-Map Cities Table */}
                <div
                  className="lg:col-span-7 rounded-2xl p-6"
                  style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                >
                  <div className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-1.5" style={{ color: ND.gold }}>
                    BEYOND THE 2 × 2 KM VALLEY · 6 NAMED DESTINATION CITIES
                  </div>
                  <h3 className="font-syne font-bold text-xl mb-2.5" style={{ color: ND.snow }}>
                    Board real trains, steamers, airliners, or highways — and return to a village that kept living
                  </h3>
                  <p className="font-manrope text-[13px] leading-[1.65] mb-4" style={{ color: ND.muted }}>
                    Departures happen physically in the 3D world (check in 20 min before a 3-hourly flight, wait at the gate, watch runway liftoff; or board the 3-hourly <strong>Intercity Express</strong>). While you explore a destination city, buy souvenirs, or stay overnight ($30), the headless simulation fast-forwards at home and greets your return with a complete <em>&ldquo;While you were away&rdquo;</em> digest.
                  </p>

                  <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${ND.line}` }}>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr style={{ background: ND.nightDeep, borderBottom: `1px solid ${ND.line}` }}>
                          <th className="py-2.5 px-3.5 font-dmmono text-[10px] uppercase tracking-[0.16em]" style={{ color: ND.muted }}>City</th>
                          <th className="py-2.5 px-3.5 font-dmmono text-[10px] uppercase tracking-[0.16em]" style={{ color: ND.muted }}>Gateways</th>
                          <th className="py-2.5 px-3.5 font-dmmono text-[10px] uppercase tracking-[0.16em]" style={{ color: ND.muted }}>Trip loop</th>
                        </tr>
                      </thead>
                      <tbody>
                        {OFFMAP_CITIES.map((c) => (
                          <tr key={c.city} style={{ background: ND.nightDeep, borderBottom: `1px solid ${ND.lineSoft}` }}>
                            <td className="py-2.5 px-3.5 align-top">
                              <div className="font-syne font-bold text-[13.5px]" style={{ color: ND.snow }}>{c.city}</div>
                              <div className="font-dmmono text-[10px]" style={{ color: ND.gold }}>{c.character}</div>
                            </td>
                            <td className="py-2.5 px-3.5 font-manrope text-[12px] align-top" style={{ color: ND.sky }}>
                              {c.routes}
                            </td>
                            <td className="py-2.5 px-3.5 font-manrope text-[12px] leading-snug align-top" style={{ color: ND.muted }}>
                              {c.loop}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ 07 · WORLD, SPRING THAW, ROCKEFELLER CHRISTMAS & SHADERS ═══════════════════════ */}
          <section id="living-world" className="py-20 px-5 sm:px-8 border-t" style={{ borderColor: ND.line }}>
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionHeader
                  num="07"
                  kicker="PROCEDURAL PBR WORLD · ZERO IMAGE OR AUDIO ASSET FILES"
                  titleA="Preetham skies, Spring Thaw, a 14-day Rockefeller Christmas, and"
                  titleB="synthesised 3D WebAudio."
                  lead="Every building facade, brick course, interior-mapped window, recursive tree, PBR surface texture, and positional sound effect is generated in code — paired with 93 retargeted LOD models for citizens, cabin-shaded vehicles, and 18 animal species across farms, parks, and a 5-enclosure zoo."
                  hue="sky"
                />
              </Reveal>

              {/* 3 Visual Shader Cards: Water, Golden Hour Shadows, Night Lamps */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[IMG.water, IMG.shadows, IMG.night].map((shot) => (
                  <figure
                    key={shot.id}
                    className="rounded-2xl overflow-hidden flex flex-col justify-between"
                    style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.w}
                      height={shot.h}
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="w-full h-auto block"
                    />
                    <figcaption className="p-4">
                      <div className="font-syne font-bold text-[15px] mb-1" style={{ color: ND.snow }}>
                        {shot.title}
                      </div>
                      <p className="font-manrope text-[12.5px] leading-relaxed" style={{ color: ND.muted }}>
                        {shot.caption}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              {/* 14-Day Rockefeller Christmas Timeline */}
              <div
                className="rounded-3xl p-6 sm:p-8 mb-8"
                style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
              >
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
                  <div>
                    <div className="font-dmmono text-[10.5px] uppercase tracking-[0.22em] mb-1.5" style={{ color: ND.gold }}>
                      THE 28-DAY FESTIVE CALENDAR · NEW YEAR · EASTER · DIWALI · CHRISTMAS
                    </div>
                    <h3 className="font-syne font-bold text-2xl sm:text-3xl" style={{ color: ND.snow }}>
                      A 14-day Rockefeller-style Christmas tree logistics arc
                    </h3>
                  </div>
                  <span className="font-dmmono text-[11px]" style={{ color: ND.muted }}>
                    Includes optional Christmas Eve &amp; Day fast-forward lock
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {CHRISTMAS_TIMELINE.map((c) => (
                    <div
                      key={c.days}
                      className="rounded-2xl p-4"
                      style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}
                    >
                      <div className="font-dmmono text-[10.5px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: ND.gold }}>
                        {c.days}
                      </div>
                      <h4 className="font-syne font-bold text-[15px] mb-1.5" style={{ color: ND.snow }}>
                        {c.title}
                      </h4>
                      <p className="font-manrope text-[12.5px] leading-[1.6]" style={{ color: ND.muted }}>
                        {c.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* World Details 4-Grid: Spring Thaw, 117m Peak & Fauna, 3D WebAudio, Photo Mode */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl p-6" style={{ background: ND.panel, border: `1px solid ${ND.line}` }}>
                  <div className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: ND.sky }}>
                    SHARED SURFACE SHADER · SPRING THAW &amp; 4 CALAMITIES
                  </div>
                  <h4 className="font-syne font-bold text-lg mb-2" style={{ color: ND.snow }}>
                    Snow that retreats in wet-edged drifts &amp; rivers that thaw in floes
                  </h4>
                  <p className="font-manrope text-[13.5px] leading-[1.68]" style={{ color: ND.muted }}>
                    One unified GLSL surface shader adds world-space anti-tiling, rain-rippled puddles with planar street reflections, asymmetric dipped-beam headlights, and a multi-day <strong>Spring Thaw</strong>: winter snow shrinks into soft drifts ringed by dark wet soil, roads plough to slush, flattened straw-pale grass regreens over 1.5 days, and lake ice breaks back toward the banks in floes. Rare <strong>Droughts, Monsoon Floods</strong> (villagers poling rafts!), <strong>Earthquakes</strong>, and <strong>Tornadoes</strong> test your town&apos;s resilience.
                  </p>
                </div>

                <div className="rounded-2xl p-6" style={{ background: ND.panel, border: `1px solid ${ND.line}` }}>
                  <div className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: ND.emerald }}>
                    117 M RUGGED PEAK · 18 ANIMAL SPECIES &amp; 5-PEN ZOO
                  </div>
                  <h4 className="font-syne font-bold text-lg mb-2" style={{ color: ND.snow }}>
                    Hire a $4 mountain bike, watch noon zoo feedings, or spot shy deer
                  </h4>
                  <p className="font-manrope text-[13.5px] leading-[1.68]" style={{ color: ND.muted }}>
                    A 44-tile, 117 m craggy massif rises beside the valley with a 1-in-6 gravel switchback trail to a summit cairn and bench — hike it or hire a trailhead mountain bike ($4, pedalling pose, slow uphill, rapid descent). Across town, 18 retargeted animal species graze farmyards (cows, sheep, horses, donkeys), populate a 5-enclosure Zoo (elephants, zebras, lions, penguins with noon keeper feedings), dart through dawn parks (deer, hares, cats, 4 dog breeds), and wheel overhead in shader-animated bird flocks.
                  </p>
                </div>

                <div className="rounded-2xl p-6" style={{ background: ND.panel, border: `1px solid ${ND.line}` }}>
                  <div className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: ND.violet }}>
                    ZERO AUDIO FILES · POSITIONAL WEBAUDIO SYNTHESIZER
                  </div>
                  <h4 className="font-syne font-bold text-lg mb-2" style={{ color: ND.snow }}>
                    Every siren, church bell, gear shift, and bird call is synthesised live
                  </h4>
                  <p className="font-manrope text-[13.5px] leading-[1.68]" style={{ color: ND.muted }}>
                    Separate street, indoor-room, and UI WebAudio buses synthesise wind in leaves, rain, river currents, seasonal bird species, insects, hammering scaffolds, gear-shifting engines, tyre skids, and surface-specific footsteps. Positional one-shots pan and attenuate by real world reach: crashes carry <strong>170 m</strong>, sirens <strong>340 m</strong>, 09:00/18:00 church &amp; temple bells <strong>750 m</strong>, and festival fireworks <strong>1.1 km</strong> — with optional captions logging only what actually reaches your ears.
                  </p>
                </div>

                <div className="rounded-2xl p-6" style={{ background: ND.panel, border: `1px solid ${ND.line}` }}>
                  <div className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: ND.gold }}>
                    F2 PHOTO STUDIO · HDR BOKEH &amp; TIME/WEATHER PREVIEW
                  </div>
                  <h4 className="font-syne font-bold text-lg mb-2" style={{ color: ND.snow }}>
                    Freeze falling rain, click to pull bokeh focus, and preview any hour
                  </h4>
                  <p className="font-manrope text-[13.5px] leading-[1.68]" style={{ color: ND.muted }}>
                    Press <kbd className="font-dmmono text-xs">F2</kbd> to pause the entire simulation — traffic, walkers, rivers, and mid-air raindrops — and fly a 60 m tethered camera (rendering your Founder avatar even if entered from 1st person). Dial a <strong>12–114 mm lens</strong>, ±2 EV exposure, real click-to-focus depth-of-field bokeh, 8 filmic grades (<em>Natural, Vivid, Golden, Cool, Faded, Mono, Noir, Sepia</em>), and non-destructively preview any hour or storm before saving a full-res PNG.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ 08 · 3-WAY EVOLUTION & GENRE COMPARISON ═══════════════════════ */}
          <section
            id="evolution"
            className="py-20 px-5 sm:px-8 border-t"
            style={{ background: ND.nightDeep, borderColor: ND.line }}
          >
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionHeader
                  num="08"
                  kicker="GENRE POSITIONING · V1 (2D) → NEXT DIMENSION (3D)"
                  titleA="How does PixelVille: Next Dimension compare to"
                  titleB="PixelVille V1 and traditional city builders?"
                  lead="Every single simulation behaviour from the original 2D PixelVille was ported behaviour-for-behaviour into strict TypeScript — so much so that Next Dimension imports original 2D PixelVille (v4) save files and wakes your old village up in 3D — before layering physical street embodiment, 4 infrastructure sims, guardrailed AI chat, and GTA-style vehicle & crime loops on top."
                  hue="violet"
                />
              </Reveal>

              <div
                className="rounded-3xl overflow-hidden"
                style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr style={{ background: ND.panelHi, borderBottom: `1px solid ${ND.line}` }}>
                        <th className="py-3.5 px-4 sm:px-6 font-dmmono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: ND.muted }}>
                          Capability
                        </th>
                        <th className="py-3.5 px-4 font-dmmono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: ND.faint }}>
                          Conventional City Builders
                        </th>
                        <th className="py-3.5 px-4 font-dmmono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: ND.amber }}>
                          PixelVille V1 (2D Original)
                        </th>
                        <th className="py-3.5 px-4 sm:px-6 font-dmmono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: ND.gold }}>
                          PixelVille: Next Dimension (3D)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {EVOLUTION_COMPARE.map((row) => (
                        <tr key={row.dimension} style={{ borderBottom: `1px solid ${ND.lineSoft}` }}>
                          <td className="py-4 px-4 sm:px-6 font-syne font-bold text-[14px] align-top" style={{ color: ND.snow }}>
                            {row.dimension}
                          </td>
                          <td className="py-4 px-4 font-manrope text-[13px] leading-relaxed align-top" style={{ color: ND.faint }}>
                            {row.traditional}
                          </td>
                          <td className="py-4 px-4 font-manrope text-[13px] leading-relaxed align-top" style={{ color: ND.muted }}>
                            {row.v1}
                          </td>
                          <td className="py-4 px-4 sm:px-6 font-manrope text-[13px] font-medium leading-relaxed align-top" style={{ color: ND.text }}>
                            {row.nextDimension}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ 09 · ENGINEERING, PERFORMANCE & COMPLETE A–Z LEDGER ═══════════════════════ */}
          <section id="systems-ledger" className="py-20 px-5 sm:px-8 border-t" style={{ borderColor: ND.line }}>
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionHeader
                  num="09"
                  kicker="HEADLESS ARCHITECTURE · 170 VITEST CHECKS · COMPLETE A–Z LEDGER"
                  titleA="9 ms on integrated laptop graphics — and"
                  titleB="every big, medium, and small logic indexed."
                  lead="Shipping a semi-realistic 2 × 2 km 3D open world inside a ~470 KB gzipped browser bundle meant refusing bloat: custom circle-vs-box swept physics instead of WASM engines, parallel Web-Worker texture baking cached in IndexedDB, 61–65 shaders pre-compiled before frame 1, GPU upload memory freeing (-150 MB RAM), and a fault-isolated guard() loop that never freezes."
                  hue="emerald"
                />
              </Reveal>

              {/* Settings & Resilience Visual Strip */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                {[IMG.qualityTiers, IMG.gfxSettings, IMG.villageSettings].map((s) => (
                  <figure
                    key={s.id}
                    className="rounded-2xl p-4 flex flex-col justify-between"
                    style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                  >
                    <div
                      className="rounded-xl overflow-hidden flex items-center justify-center p-2 mb-3 aspect-[4/3]"
                      style={{ background: ND.nightDeep }}
                    >
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={s.w}
                        height={s.h}
                        sizes="(min-width: 640px) 340px, 100vw"
                        className="max-h-full w-auto object-contain rounded"
                      />
                    </div>
                    <figcaption>
                      <div className="font-syne font-bold text-[14.5px] mb-1" style={{ color: ND.snow }}>
                        {s.title}
                      </div>
                      <p className="font-manrope text-[12px] leading-relaxed" style={{ color: ND.muted }}>
                        {s.caption}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              {/* Stack Chips */}
              <div className="flex flex-wrap gap-2 mb-10">
                {STACK_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="font-dmmono text-[11px] px-3 py-1.5 rounded-full"
                    style={{
                      background: ND.panel,
                      color: ND.text,
                      border: `1px solid ${ND.line}`,
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Complete Searchable & Crawlable 58-Row A–Z Systems Ledger */}
              <div className="mb-4">
                <h3 className="font-syne font-bold text-2xl mb-1.5" style={{ color: ND.snow }}>
                  The Complete Deep-Logic Systems Ledger ({58} core &amp; micro-systems)
                </h3>
                <p className="font-manrope text-[14px]" style={{ color: ND.muted }}>
                  Filter by scale (<em>Big</em> village-shaping engines, <em>Medium</em> gameplay features, or <em>Small</em> living details) or search any mechanic directly.
                </p>
              </div>

              <SystemsLedgerExplorer />

              {/* Honest Boundaries & Architecture Postscript (PORTFOLIO_HANDOFF voice) */}
              <div className="grid md:grid-cols-3 gap-4 mt-10">
                {HONEST_POSTSCRIPT.map((item) => (
                  <div
                    key={item.head}
                    className="rounded-2xl p-5"
                    style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
                  >
                    <div className="font-dmmono text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ color: ND.faint }}>
                      SCOPE &amp; ARCHITECTURE NOTE
                    </div>
                    <h4 className="font-syne font-bold text-[15px] mb-2" style={{ color: ND.snow }}>
                      {item.head}
                    </h4>
                    <p className="font-manrope text-[12.5px] leading-[1.65]" style={{ color: ND.muted }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════ 10 · ALL 20 SCREENSHOTS GALLERY ═══════════════════════ */}
          <section
            id="gallery"
            className="py-20 px-5 sm:px-8 border-t"
            style={{ background: ND.nightDeep, borderColor: ND.line }}
          >
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <SectionHeader
                  num="10"
                  kicker="VISUAL ARCHIVE · ALL 20 IN-GAME CAPTURES"
                  titleA="Every angle of the valley —"
                  titleB="from kerb level to the clouds."
                  lead="Click any capture to inspect full-resolution details: street motoring, the 11-app PVTel smartphone, the Founder's Lodge, dressed building entrances, aerial Planner railways, Fresnel water reflections, dusk shadows, and accessibility controls."
                  hue="gold"
                />
              </Reveal>

              <GalleryShowcase />
            </div>
          </section>

          {/* ═══════════════════════ CLOSING LAUNCH BANNER ═══════════════════════ */}
          <section className="py-20 px-5 sm:px-8 border-t" style={{ borderColor: ND.line }}>
            <div
              className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
              style={{
                background: `linear-gradient(145deg, ${ND.panelHi}, ${ND.panel})`,
                border: `1px solid ${ND.lineHi}`,
                boxShadow: "0 30px 90px -30px rgba(240,194,122,0.35)",
              }}
            >
              <div className="mb-4">
                <DimensionWordmark />
              </div>
              <h2
                className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 text-balance"
                style={{ color: ND.snow }}
              >
                Found a village from the sky.{" "}
                <span style={{ color: ND.gold }}>Then walk down and meet the neighbours.</span>
              </h2>
              <p
                className="font-manrope text-[15px] sm:text-base leading-[1.75] max-w-2xl mx-auto mb-8"
                style={{ color: ND.muted }}
              >
                Runs instantly in any desktop or mobile browser (~470 KB gzipped, keyboard, gamepad, or landscape touch) — or import your original 2D PixelVille save and watch your old citizens wake up in three dimensions.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href={LINKS.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-syne font-bold text-base transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${ND.goldBright}, ${ND.gold})`,
                    color: ND.nightDeep,
                    boxShadow: "0 14px 36px -10px rgba(240,194,122,0.55)",
                  }}
                >
                  <span>Launch PixelVille: Next Dimension</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <Link
                  href={LINKS.v1Page}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-manrope font-semibold text-sm transition-colors hover:bg-white/10"
                  style={{
                    background: ND.nightDeep,
                    color: ND.snow,
                    border: `1px solid ${ND.line}`,
                  }}
                >
                  Compare with PixelVille V1 (2D) →
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Visible FAQ + FAQPage JSON-LD, Related internal links & Site Footer */}
        <PageFaq href={PATH} surface={ND.night} />
        <RelatedPages href={PATH} surface={ND.night} />
        <Contact />
      </div>
    </MotionProvider>
  );
}
