import type { Metadata } from "next";
import Image from "next/image";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Reveal, StatCounter } from "@/components/penta/PentaWidgets";
import { AutoRoadDemo, ElectionBanner, SeasonStrip } from "@/components/pixelville/PixelvilleVisuals";
import {
  PV,
  LINKS,
  TAGLINES,
  IMG,
  STATS,
  USPS,
  TRAITS,
  MIND_EXTRAS,
  CANDIDATES,
  GOV_POINTS,
  COMMUNITY,
  COMPARE,
  FEATURES,
  TECH,
  ROAD_COSTS,
  HUD_PANELS,
  type Shot,
} from "@/components/pixelville/pixelville-data";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
export const metadata: Metadata = {
  title: "PixelVille · A self-governing pixel-art village that remembers",
  description:
    "PixelVille is a cozy pixel-art village simulation where the town is genuinely autonomous. Its citizens aren't statistics — every villager has a personality, an episodic memory, a private map of only the places they've encountered, and a real decision engine. They form friendships, chase ambitions, open businesses, vote out mayors and rebuild the town themselves. ~11,700 lines of hand-written vanilla JS. Zero dependencies. Zero image assets.",
  keywords: [
    "PixelVille", "village simulation", "city builder", "autonomous agents game", "pixel art game",
    "society simulation", "self-governing village", "vanilla JavaScript game", "HTML5 canvas game",
    "emergent gameplay", "cozy sandbox", "Suman Debnath",
  ],
  alternates: { canonical: "/games/pixelville" },
  openGraph: {
    type: "website",
    title: "PixelVille · A village that remembers",
    description:
      "A self-governing pixel-art village where citizens have knowledge, memory, personality and real decisions — they elect their own mayors and rebuild the town themselves. Zero dependencies, zero image assets.",
    url: `${SITE}/games/pixelville`,
    images: [{ url: IMG.hero.src, width: IMG.hero.w, height: IMG.hero.h, alt: "A snowy PixelVille metropolis with the full game HUD" }],
  },
};

/* ── Schema ─────────────────────────────────────────────────────────────── */
const gameLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "PixelVille",
  description:
    "A cozy, self-governing pixel-art village simulation that runs in the browser. Every villager has a personality, an episodic memory, a private map of the places they know, and a real decision engine; the town elects its own leaders and rebuilds itself when government fails.",
  url: `${SITE}/games/pixelville`,
  genre: ["Simulation", "Sandbox", "City-building"],
  gamePlatform: "Web browser",
  applicationCategory: "Game",
  operatingSystem: "Any modern desktop browser",
  author: { "@type": "Person", name: "Suman Debnath", url: SITE },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", url: LINKS.live },
};
const articleLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "PixelVille — a village that remembers, built in ~11,700 lines of vanilla JS with zero dependencies",
  author: { "@type": "Person", name: "Suman Debnath" },
  publisher: { "@type": "Person", name: "Suman Debnath" },
  description:
    "How a browser village sim gives every citizen knowledge, episodic memory, personality and a real decision engine — and how the settlement governs and rebuilds itself — all from scratch, no engine, no libraries, no image files.",
  mainEntityOfPage: `${SITE}/games/pixelville`,
};

/* ═════════════════════════════ small building blocks ═════════════════════ */
function SectionLabel({ index, kicker }: { index: string; kicker: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-dmmono text-[11px] rounded px-1.5 py-0.5 leading-none" style={{ color: PV.night, background: PV.gold }}>
        {index}
      </span>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: PV.gold }} />
      <span className="font-dmmono text-[10px] uppercase tracking-[0.3em]" style={{ color: PV.muted }}>
        {kicker}
      </span>
    </div>
  );
}

/* A screenshot framed as a little game window.
   • aspect set  → the image fills a fixed-ratio box (object-cover) so tiles in a
     grid all line up to the same height. `focus` sets object-position.
   • aspect unset → the image keeps its natural size (for standalone UI panels). */
function GameWindow({
  shot,
  label,
  aspect,
  focus = "center",
  priority = false,
  className = "",
}: {
  shot: Shot;
  label: string;
  aspect?: string;
  focus?: string;
  priority?: boolean;
  className?: string;
}) {
  const pixel = { imageRendering: "pixelated" as const };
  return (
    <div
      className={`rounded-2xl overflow-hidden flex flex-col ${className}`}
      style={{ background: PV.nightDeep, border: `1px solid ${PV.line}`, boxShadow: "0 40px 90px -50px rgba(0,0,0,0.8)" }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 shrink-0" style={{ background: PV.panel, borderBottom: `1px solid ${PV.line}` }}>
        <span className="text-[13px] leading-none">🏙️</span>
        <span className="font-dmmono text-[10.5px] uppercase tracking-[0.16em] truncate" style={{ color: PV.muted }}>{label}</span>
        <span className="ml-auto flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: PV.fire, animation: "pv-blink 1.6s steps(1) infinite" }} />
          <span className="font-dmmono text-[9px] uppercase tracking-[0.2em]" style={{ color: PV.fire }}>live</span>
        </span>
      </div>
      {aspect ? (
        <div className="relative w-full flex-1" style={{ aspectRatio: aspect }}>
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover"
            style={{ ...pixel, objectPosition: focus }}
          />
        </div>
      ) : (
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.w}
          height={shot.h}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="w-full h-auto block"
          style={pixel}
        />
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ═════════════════════════════════════════════════════════════════════════ */
export default function PixelVillePage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Navigation />

      <main className="relative min-h-screen font-manrope overflow-x-hidden" style={{ background: PV.night, color: PV.text }}>
        {/* ════════════════════════════ HERO ════════════════════════════
            A clean, readable night-sky hero (solid gradient + subtle pixel
            decor) with the screenshot presented as a framed product shot
            below the copy — no text over a busy image. */}
        <section className="relative" style={{ background: `radial-gradient(120% 80% at 50% 0%, #12203a 0%, ${PV.night} 45%, ${PV.nightDeep} 100%)` }}>
          {/* pixel-sky decor */}
          <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* faint tile grid */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: `linear-gradient(${PV.snow} 1px, transparent 1px), linear-gradient(90deg, ${PV.snow} 1px, transparent 1px)`, backgroundSize: "34px 34px" }}
            />
            {/* stars */}
            {[
              [12, 18], [22, 32], [34, 12], [46, 26], [58, 14], [70, 30], [82, 20], [90, 38],
              [16, 48], [64, 46], [78, 52], [8, 40], [52, 40], [40, 50], [88, 12], [28, 22],
            ].map(([x, y], i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{ left: `${x}%`, top: `${y}%`, width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2, background: PV.snow, opacity: 0.7, animation: `pv-twinkle ${2.4 + (i % 5) * 0.5}s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
            {/* pixel clouds */}
            <span className="absolute" style={{ left: "8%", top: "22%", animation: "pv-drift 9s ease-in-out infinite alternate" }}>
              <span className="block" style={{ width: 90, height: 16, background: "rgba(180,140,232,0.10)", borderRadius: 3 }} />
            </span>
            <span className="absolute" style={{ right: "10%", top: "30%", animation: "pv-drift 11s ease-in-out 1s infinite alternate-reverse" }}>
              <span className="block" style={{ width: 130, height: 18, background: "rgba(90,182,234,0.09)", borderRadius: 3 }} />
            </span>
          </div>

          <div className="relative max-w-5xl mx-auto px-6 pt-36 pb-10 md:pt-44 md:pb-14 text-center">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 font-dmmono text-[10px] md:text-[11px] uppercase tracking-[0.24em] rounded-full px-3.5 py-1.5"
                style={{ background: PV.panel, color: PV.snow, border: `1px solid ${PV.line}` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: PV.gold, animation: "pv-blink 1.6s steps(1) infinite" }} />
                Self-governing pixel-art village sim · in the browser
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="font-anton uppercase text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-[0.94] tracking-[0.01em] mt-7 mb-6" style={{ color: PV.snow, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
                A village
                <br />
                that <span style={{ color: PV.gold }}>remembers.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-[0.98rem] md:text-[1.12rem] leading-relaxed max-w-2xl mx-auto mb-9" style={{ color: "rgba(228,234,244,0.82)" }}>
                {TAGLINES.pitch}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <a href={LINKS.live} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-manrope font-bold text-sm transition-transform hover:-translate-y-0.5" style={{ background: PV.gold, color: PV.night, boxShadow: "0 18px 40px -16px rgba(245,185,74,0.6)" }}>
                  🏙️ Start your village
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="font-dmmono text-[11px] mt-7 tracking-[0.05em]" style={{ color: "rgba(228,234,244,0.5)" }}>
                ~11,700 lines of vanilla JS · zero dependencies · zero image assets
              </p>
            </Reveal>
          </div>

          {/* framed hero product shot */}
          <div className="relative max-w-6xl mx-auto px-6 pb-4">
            <Reveal delay={0.1}>
              <div className="relative">
                <div aria-hidden className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-40 pointer-events-none" style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(245,185,74,0.35), transparent 70%)" }} />
                <GameWindow shot={IMG.hero} label="pixelville · a metropolis at christmas" priority className="relative" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ STAT BAND ════════════════════════════ */}
        <section className="relative z-10 px-6 pt-10">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={(i % 4) * 0.05}>
                <div className="pv-card rounded-2xl h-full p-5" style={{ background: PV.panel, border: `1px solid ${PV.line}` }}>
                  <p className="font-anton text-[2.2rem] leading-none tracking-tight" style={{ color: PV.gold }}>
                    <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="font-manrope font-semibold text-[12.5px] mt-2.5" style={{ color: PV.snow }}>{s.label}</p>
                  <p className="font-dmmono text-[10px] mt-1 leading-snug" style={{ color: PV.muted }}>{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ════════════════════════════ 01 · THE HOOK ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="01" kicker="the hook · autonomy" />
              <h2 className="font-anton uppercase text-[2rem] md:text-[3rem] leading-[1.02] tracking-tight mb-4" style={{ color: PV.snow }}>
                You don&rsquo;t run the village.
                <br />
                You <span style={{ color: PV.gold }}>start</span> it.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: PV.muted }}>
                There&rsquo;s no command layer — you&rsquo;re a landscape gardener, not a puppeteer. Drop a
                building and the town figures out the rest. The signature moment happens on your very first
                click: an intelligent A* pathfinder connects it to the network, reusing roads, carving
                around mountains, and bridging a river only when it&rsquo;s genuinely worth it.
              </p>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-6 items-stretch">
              <Reveal><GameWindow shot={IMG.fullUi} label="pixelville · full interface" aspect="1365 / 767" focus="left center" className="h-full" /></Reveal>
              <Reveal delay={0.08}><AutoRoadDemo /></Reveal>
            </div>

            {/* the road cost table */}
            <Reveal delay={0.06}>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {ROAD_COSTS.map((r) => (
                  <div key={r.terrain} className="rounded-xl p-4" style={{ background: PV.panel, border: `1px solid ${PV.line}` }}>
                    <p className="font-dmmono text-[11px] font-semibold" style={{ color: PV[r.hue] as string }}>{r.terrain}</p>
                    <p className="font-anton text-[1.4rem] leading-none mt-1.5" style={{ color: PV.snow }}>{r.cost}</p>
                    <p className="font-manrope text-[11px] mt-1.5 leading-snug" style={{ color: PV.muted }}>{r.note}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 02 · LIVING MINDS ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: PV.nightDeep, borderTop: `1px solid ${PV.line}`, borderBottom: `1px solid ${PV.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="02" kicker="the core usp · living minds" />
              <h2 className="font-anton uppercase text-[2rem] md:text-[3rem] leading-[1.02] tracking-tight mb-4" style={{ color: PV.snow }}>
                Its citizens are <span style={{ color: PV.gold }}>people</span>,
                <br />
                not statistics.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: PV.muted }}>
                This is the differentiator. Other AI-made village sims move agents between buildings on
                schedules or dice rolls. PixelVille&rsquo;s citizens have an actual mind — and it drives
                visible behaviour. Four parts, every one backed by real logic.
              </p>
            </Reveal>

            <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
              <Reveal>
                <div className="lg:sticky lg:top-24">
                  <GameWindow shot={IMG.villagerCard} label="villager inspector" />
                  <p className="font-dmmono text-[10.5px] mt-3 text-center leading-relaxed" style={{ color: PV.muted }}>
                    Click any person in the street and read their whole life — mood, job, savings, family,
                    personality, and their latest memory.
                  </p>
                </div>
              </Reveal>

              <div className="grid sm:grid-cols-2 gap-3.5">
                {USPS.map((u, i) => {
                  const hue = PV[u.hue] as string;
                  return (
                    <Reveal key={u.title} delay={(i % 2) * 0.06}>
                      <div className="pv-card rounded-2xl h-full p-6 flex flex-col" style={{ background: PV.panel, border: `1px solid ${PV.line}` }}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-anton text-[1.5rem] leading-none" style={{ color: hue }}>{u.n}</span>
                          <h3 className="font-manrope font-bold text-[1.25rem]" style={{ color: PV.snow }}>{u.title}</h3>
                        </div>
                        <p className="font-manrope text-[13px] leading-relaxed mb-4 flex-1" style={{ color: PV.muted }}>{u.body}</p>
                        <p className="font-manrope text-[12.5px] italic leading-snug pt-3" style={{ color: PV.text, borderTop: `1px solid ${PV.line}` }}>{u.proof}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal delay={0.05}>
              <div className="mt-10 flex flex-wrap items-center gap-2.5">
                <span className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mr-1" style={{ color: PV.muted }}>five stable traits:</span>
                {TRAITS.map((t) => (
                  <span key={t} className="font-dmmono text-[12px] rounded-full px-3.5 py-1.5" style={{ background: PV.goldSoft, color: PV.gold, border: `1px solid ${PV.line}` }}>{t}</span>
                ))}
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-3.5 mt-8">
              {MIND_EXTRAS.map((e, i) => (
                <Reveal key={e.title} delay={(i % 2) * 0.06}>
                  <div className="rounded-2xl h-full p-6" style={{ background: PV.panel, border: `1px solid ${PV.line}` }}>
                    <h4 className="font-manrope font-semibold text-[15px] mb-2" style={{ color: PV.snow }}>{e.title}</h4>
                    <p className="font-manrope text-[13px] leading-relaxed" style={{ color: PV.muted }}>{e.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 03 · MEET ANYONE ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="03" kicker="meet anyone · the inspectors" />
              <h2 className="font-anton uppercase text-[2rem] md:text-[3rem] leading-[1.02] tracking-tight mb-4" style={{ color: PV.snow }}>
                The town isn&rsquo;t a spreadsheet.
                <br />
                It&rsquo;s a <span style={{ color: PV.gold }}>cast of characters.</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: PV.muted }}>
                Click a villager for their whole story, or a building to meet everyone who lives and works
                there. Even a block of flats knows its residents by name, tracks the household mood, and
                remembers how many places its people have discovered.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 items-center max-w-4xl mx-auto">
              <Reveal><GameWindow shot={IMG.villagerCard} label="villager · Kai Nakamura" /></Reveal>
              <Reveal delay={0.08}><GameWindow shot={IMG.buildingCard} label="building · the Apartments" /></Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 04 · SELF-GOVERNANCE ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: PV.nightDeep, borderTop: `1px solid ${PV.line}`, borderBottom: `1px solid ${PV.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="04" kicker="the second big usp · democracy" />
              <h2 className="font-anton uppercase text-[2rem] md:text-[3rem] leading-[1.02] tracking-tight mb-4" style={{ color: PV.snow }}>
                A village that <span style={{ color: PV.gold }}>governs itself.</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: PV.muted }}>
                The settlement is politically alive. Every in-game year it holds a real election — and it&rsquo;s
                not a menu. It&rsquo;s a full week of banners over the streets and daily rallies before the town
                votes on its own life.
              </p>
            </Reveal>

            {/* the town it governs + the campaign bunting */}
            <div className="grid lg:grid-cols-2 gap-6 items-stretch mb-10">
              <Reveal><GameWindow shot={IMG.colourful} label="the town votes on its own life" aspect="16 / 10" className="h-full" /></Reveal>
              <Reveal delay={0.06}>
                <div className="rounded-2xl px-5 py-6 h-full flex flex-col justify-center" style={{ background: PV.panel, border: `1px solid ${PV.line}` }}>
                  <ElectionBanner />
                  <p className="font-dmmono text-[10.5px] text-center mt-3 uppercase tracking-[0.18em]" style={{ color: PV.muted }}>
                    campaign week · one colour per candidate
                  </p>
                  <p className="font-manrope text-[13px] leading-relaxed text-center mt-4" style={{ color: PV.muted }}>
                    Coloured banners are strung over the streets and daily rallies gather a crowd around a
                    candidate on a soapbox — a full week before the town casts its ballots.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.05}>
              <p className="font-dmmono text-[11px] uppercase tracking-[0.24em] mb-4" style={{ color: PV.muted }}>Four candidate personalities</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-12">
              {CANDIDATES.map((c, i) => {
                const hue = PV[c.hue] as string;
                return (
                  <Reveal key={c.type} delay={(i % 4) * 0.05}>
                    <div className="pv-card rounded-2xl h-full p-6" style={{ background: PV.panel, border: `1px solid ${PV.line}`, boxShadow: `inset 0 2px 0 0 ${hue}` }}>
                      <div className="text-3xl mb-3">{c.emoji}</div>
                      <h3 className="font-manrope font-bold text-[1.15rem]" style={{ color: PV.snow }}>{c.type}</h3>
                      <p className="font-dmmono text-[10px] uppercase tracking-[0.16em] mb-3" style={{ color: hue }}>{c.tag}</p>
                      <p className="font-manrope text-[12.5px] leading-relaxed" style={{ color: PV.muted }}>{c.builds}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {GOV_POINTS.map((g, i) => (
                <Reveal key={g.title} delay={(i % 2) * 0.06}>
                  <div className="rounded-2xl h-full p-6" style={{ background: PV.panel, border: `1px solid ${PV.line}` }}>
                    <h4 className="font-manrope font-semibold text-[15px] mb-2" style={{ color: PV.snow }}>{g.title}</h4>
                    <p className="font-manrope text-[13px] leading-relaxed" style={{ color: PV.muted }}>{g.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.05}>
              <div className="mt-6 rounded-2xl p-7 md:p-9" style={{ background: "linear-gradient(120% 100% at 0% 0%, rgba(95,192,97,0.12), transparent 60%)", border: `1px solid ${PV.line}` }}>
                <h3 className="font-manrope font-bold text-[1.4rem] md:text-[1.8rem] leading-tight mb-3" style={{ color: PV.snow }}>{COMMUNITY.title}</h3>
                <p className="font-manrope text-[14px] leading-relaxed max-w-3xl" style={{ color: PV.muted }}>{COMMUNITY.body}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 05 · WHY IT'S DIFFERENT ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <SectionLabel index="05" kicker="why it's different" />
              <h2 className="font-anton uppercase text-[2rem] md:text-[3rem] leading-[1.02] tracking-tight mb-4" style={{ color: PV.snow }}>
                Anyone can generate a village.
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: PV.muted }}>
                AI has made it trivial to generate a village sim, and the market is flooded with them.
                Here&rsquo;s the honest, defensible difference — line by line.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${PV.line}` }}>
                <div className="grid grid-cols-2 font-dmmono text-[10.5px] uppercase tracking-[0.16em]">
                  <div className="px-5 py-3" style={{ background: PV.panel, color: PV.muted }}>Typical AI village sim</div>
                  <div className="px-5 py-3" style={{ background: PV.goldSoft, color: PV.gold, borderLeft: `1px solid ${PV.line}` }}>PixelVille</div>
                </div>
                {COMPARE.map((row, i) => (
                  <div key={i} className="grid grid-cols-2" style={{ borderTop: `1px solid ${PV.lineSoft}` }}>
                    <div className="px-5 py-4 font-manrope text-[12.5px] leading-snug" style={{ background: PV.nightDeep, color: PV.faint }}>{row.them}</div>
                    <div className="px-5 py-4 font-manrope text-[12.5px] leading-snug" style={{ background: PV.panel, color: PV.text, borderLeft: `1px solid ${PV.line}` }}>{row.us}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* the soundbite over a town strip */}
            <Reveal delay={0.08}>
              <div className="relative rounded-2xl overflow-hidden mt-8 px-6 py-14 text-center" style={{ border: `1px solid ${PV.line}` }}>
                <Image src={IMG.river.src} alt="" width={IMG.river.w} height={IMG.river.h} className="absolute inset-0 w-full h-full object-cover" style={{ imageRendering: "pixelated" }} aria-hidden />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,11,22,0.86), rgba(8,11,22,0.9))" }} />
                <p className="relative font-serif italic text-[1.4rem] md:text-[2rem] leading-snug" style={{ color: PV.snow }}>
                  &ldquo;Anyone can generate a village.
                  <br />
                  <span style={{ color: PV.gold }}>PixelVille generates a society.</span>&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 06 · EVERYTHING ELSE ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: PV.nightDeep, borderTop: `1px solid ${PV.line}`, borderBottom: `1px solid ${PV.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="06" kicker="everything else it does" />
              <h2 className="font-anton uppercase text-[2rem] md:text-[3rem] leading-[1.02] tracking-tight mb-4" style={{ color: PV.snow }}>
                Depth under a <span style={{ color: PV.gold }}>calm surface.</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: PV.muted }}>
                The town looks peaceful, but underneath sit interacting systems — economy, crime, transport,
                weather, disasters, festivals — that produce emergent stories. All of it is implemented and live.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {FEATURES.map((f, i) => {
                const hue = PV[f.hue] as string;
                return (
                  <Reveal key={f.title} delay={(i % 3) * 0.05}>
                    <div className="pv-card rounded-2xl h-full p-6" style={{ background: PV.panel, border: `1px solid ${PV.line}` }}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: PV.nightDeep, border: `1px solid ${PV.line}` }}>{f.icon}</span>
                        <h3 className="font-manrope font-bold text-[1.1rem]" style={{ color: PV.snow }}>{f.title}</h3>
                      </div>
                      <ul className="space-y-2.5">
                        {f.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]" style={{ background: hue }} />
                            <span className="font-manrope text-[12.5px] leading-snug" style={{ color: PV.muted }}>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* transport showcase — a purposeful aligned trio */}
            <div className="mt-8">
              <Reveal><p className="font-dmmono text-[11px] uppercase tracking-[0.24em] mb-4" style={{ color: PV.muted }}>Seven ways to get around — all with running vehicles</p></Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <Reveal><GameWindow shot={IMG.train} label="railways · running trains" aspect="4 / 3" className="h-full" /></Reveal>
                <Reveal delay={0.05}><GameWindow shot={IMG.airport} label="airport · runway & planes" aspect="4 / 3" className="h-full" /></Reveal>
                <Reveal delay={0.1}><GameWindow shot={IMG.helipad} label="helipad · heli flights" aspect="4 / 3" focus="center top" className="h-full" /></Reveal>
              </div>
            </div>

            {/* seasons strip */}
            <Reveal delay={0.06}>
              <div className="mt-8">
                <p className="font-dmmono text-[11px] uppercase tracking-[0.24em] mb-4" style={{ color: PV.muted }}>Four seasons reshape the whole world</p>
                <SeasonStrip />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 07 · GALLERY ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="07" kicker="a living world · gallery" />
              <h2 className="font-anton uppercase text-[2rem] md:text-[3rem] leading-[1.02] tracking-tight mb-4" style={{ color: PV.snow }}>
                Every event is <span style={{ color: PV.gold }}>rendered.</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: PV.muted }}>
                No off-screen bookkeeping for anything dramatic. Mountains with hiking trails, rivers and
                frozen lakes, a night lit from a thousand windows, and a Christmas tree raised in the middle
                of town.
              </p>
            </Reveal>

            {/* night — a wide hero banner */}
            <Reveal><GameWindow shot={IMG.night} label="night · the lighting engine" aspect="21 / 9" /></Reveal>

            {/* aligned 2×2 landscape mosaic */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3.5">
              <Reveal><GameWindow shot={IMG.mountains} label="mountains · hiking trails" aspect="16 / 10" className="h-full" /></Reveal>
              <Reveal delay={0.05}><GameWindow shot={IMG.river} label="by the river" aspect="16 / 10" className="h-full" /></Reveal>
              <Reveal delay={0.05}><GameWindow shot={IMG.lakes} label="frozen lake & beach" aspect="16 / 10" className="h-full" /></Reveal>
              <Reveal delay={0.1}><GameWindow shot={IMG.colourful} label="a colourful district" aspect="16 / 10" className="h-full" /></Reveal>
            </div>

            {/* Christmas — a slim feature strip */}
            <Reveal delay={0.05}>
              <div className="mt-3.5 rounded-2xl overflow-hidden flex items-center gap-6 p-5 md:p-7" style={{ background: PV.panel, border: `1px solid ${PV.line}` }}>
                <Image src={IMG.christmas.src} alt={IMG.christmas.alt} width={IMG.christmas.w} height={IMG.christmas.h} loading="lazy" className="rounded-xl shrink-0 w-[96px] md:w-[120px] h-auto" style={{ imageRendering: "pixelated", border: `1px solid ${PV.line}` }} />
                <div>
                  <h3 className="font-manrope font-bold text-[1.2rem] md:text-[1.5rem] mb-1.5" style={{ color: PV.snow }}>Christmas in PixelVille</h3>
                  <p className="font-manrope text-[13px] leading-relaxed" style={{ color: PV.muted }}>
                    A 28-day festive calendar lights every building, raises a Christmas tree in town, fills the
                    festive markets and launches fireworks nights — Easter and Diwali diyas get their turn too.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 08 · THE INTERFACE ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: PV.nightDeep, borderTop: `1px solid ${PV.line}`, borderBottom: `1px solid ${PV.line}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="08" kicker="the interface · hud & panels" />
              <h2 className="font-anton uppercase text-[2rem] md:text-[3rem] leading-[1.02] tracking-tight mb-4" style={{ color: PV.snow }}>
                A SimCity-style HUD, <span style={{ color: PV.gold }}>drawn from scratch.</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: PV.muted }}>
                Everything you need to read the town at a glance — and every panel is procedural pixel art,
                not an asset pack.
              </p>
            </Reveal>

            {/* the top bar spans full width */}
            <Reveal>
              <div className="rounded-2xl overflow-hidden mb-4" style={{ background: PV.nightDeep, border: `1px solid ${PV.line}` }}>
                <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: PV.panel, borderBottom: `1px solid ${PV.line}` }}>
                  <span className="text-[13px] leading-none">🏙️</span>
                  <span className="font-dmmono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: PV.muted }}>the top bar</span>
                </div>
                <Image src={IMG.topbar.src} alt={IMG.topbar.alt} width={IMG.topbar.w} height={IMG.topbar.h} loading="lazy" className="w-full h-auto block" style={{ imageRendering: "pixelated" }} />
              </div>
            </Reveal>
            <Reveal delay={0.04}>
              <p className="font-manrope text-[13.5px] leading-relaxed max-w-3xl mb-10" style={{ color: PV.muted }}>{HUD_PANELS[0].body}</p>
            </Reveal>

            {/* sidebar + PVTV/minimap, side by side */}
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <Reveal>
                <div className="grid grid-cols-[minmax(0,150px)_1fr] gap-5 items-center">
                  <GameWindow shot={IMG.sidebar} label="palette" />
                  <div>
                    <h3 className="font-manrope font-bold text-[1.2rem] mb-2" style={{ color: PV.snow }}>{HUD_PANELS[1].title}</h3>
                    <p className="font-manrope text-[13px] leading-relaxed" style={{ color: PV.muted }}>{HUD_PANELS[1].body}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <div>
                  <GameWindow shot={IMG.tvMinimap} label="pvtv · rci · minimap" aspect="383 / 142" />
                  <h3 className="font-manrope font-bold text-[1.2rem] mt-4 mb-2" style={{ color: PV.snow }}>{HUD_PANELS[2].title}</h3>
                  <p className="font-manrope text-[13px] leading-relaxed" style={{ color: PV.muted }}>{HUD_PANELS[2].body}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 09 · HOW IT'S BUILT ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="09" kicker="how it's built · technical marvels" />
              <h2 className="font-anton uppercase text-[2rem] md:text-[3rem] leading-[1.02] tracking-tight mb-4" style={{ color: PV.snow }}>
                No engine. No libraries.
                <br />
                <span style={{ color: PV.gold }}>No image files.</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: PV.muted }}>
                ~11,700 lines of hand-written vanilla JavaScript across 14 modules, deployed as a pure static
                site. Every sprite you&rsquo;ve seen on this page — every building, villager and vehicle — is
                drawn procedurally in code.
              </p>
            </Reveal>

            <div className="grid lg:grid-cols-[1fr_240px] gap-6 items-start">
              <div className="grid sm:grid-cols-2 gap-3.5">
                {TECH.map((t, i) => (
                  <Reveal key={t.title} delay={(i % 2) * 0.06}>
                    <div className="pv-card rounded-2xl h-full p-6" style={{ background: PV.panel, border: `1px solid ${PV.line}` }}>
                      <h3 className="font-manrope font-bold text-[15px] mb-2" style={{ color: PV.snow }}>{t.title}</h3>
                      <p className="font-manrope text-[13px] leading-relaxed" style={{ color: PV.muted }}>{t.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              {/* pixel-art proof: hand-drawn shops */}
              <Reveal delay={0.08}>
                <div>
                  <GameWindow shot={IMG.shops} label="~90 hand-drawn buildings" />
                  <p className="font-dmmono text-[10.5px] mt-3 text-center leading-relaxed" style={{ color: PV.muted }}>
                    Every one of ~90 building types is a procedural sprite — no asset pack.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ CTA FOOTER ════════════════════════════ */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto rounded-[2rem] overflow-hidden relative" style={{ border: `1px solid ${PV.line}` }}>
            <Image src={IMG.colourful.src} alt="" width={IMG.colourful.w} height={IMG.colourful.h} className="absolute inset-0 w-full h-full object-cover" style={{ imageRendering: "pixelated" }} aria-hidden />
            <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(8,11,22,0.94), rgba(8,11,22,0.78))" }} />
            <div className="relative px-8 py-16 md:py-20 text-center">
              <Reveal>
                <h2 className="font-anton uppercase text-[2.2rem] md:text-[3.4rem] leading-[0.98] tracking-tight mb-4" style={{ color: PV.snow }}>
                  Go start a <span style={{ color: PV.gold }}>society.</span>
                </h2>
                <p className="font-manrope text-[14.5px] max-w-xl mx-auto mb-9" style={{ color: "rgba(228,234,244,0.82)" }}>
                  Every claim on this page can be proven in the live build — drop a building, wait for the
                  town to fill, then click a villager and read their memories.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                  <a href={LINKS.live} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-manrope font-bold text-sm transition-transform hover:-translate-y-0.5" style={{ background: PV.gold, color: PV.night, boxShadow: "0 18px 40px -16px rgba(245,185,74,0.6)" }}>
                    🏙️ Play PixelVille now
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </MotionProvider>
  );
}
