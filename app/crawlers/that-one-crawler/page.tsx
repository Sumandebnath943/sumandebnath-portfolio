import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import PageAnswer from "@/components/ui/PageAnswer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import Contact from "@/components/sections/Contact";
import PageFaq from "@/components/ui/PageFaq";
import HeroLock from "@/components/ui/HeroLock";
import { Reveal } from "@/components/penta/PentaWidgets";
import { HeroSpider, Spider, DaddyBadge } from "@/components/that-one-crawler/TocVisuals";
import {
  TC,
  LINKS,
  IMG,
  HERO,
  FINDINGS,
  STATS,
  VERSIONS,
  ROUTES,
  SCAN_STEPS,
  SEO_SCORE,
  AI_SCORE,
  CHECK_CATEGORIES,
  AI_TASKS,
  GUARDS,
  TOOLS,
  CANNIBAL_DEMO,
  KEYWORD_RULES,
  NOTES,
  OWN_AUDIT,
  SELF_PROOF,
  QUIRKS,
  LIMITS,
  POSTSCRIPTS,
  STACK,
  type Shot,
} from "@/components/that-one-crawler/toc-data";

/*
 * That One Crawler — the second version of Crawl Daddy.
 *
 * The page wears the app's own design rather than the dark site's: cream paper,
 * 2px ink borders, hard offset shadows, lime for SEO and violet for AI
 * readiness, and its display face, Bricolage Grotesque. The ink bands use the
 * app's own dark-mode tokens. The face is loaded here, not in app/layout.tsx,
 * so it costs nothing on any other route.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
const PATH = "/crawlers/that-one-crawler";

export const metadata: Metadata = {
  title: "That One Crawler · Crawl Daddy, reprised",
  description:
    "That One Crawler is a free SEO and AI-search audit tool for blogs, rebuilt from Crawl Daddy so the visitor’s browser runs the crawl. It checks up to 1,000 pages against 47 checks, scores every page for SEO and for AI readiness, and costs $0 to host.",
  keywords: [
    "That One Crawler", "Crawl Daddy", "SEO audit tool", "free SEO audit for blogs", "GEO checker", "AEO checker",
    "AI search readiness", "broken link checker", "keyword cannibalization", "meta tag checker", "serverless crawler", "Suman Debnath",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: "That One Crawler · Crawl Daddy, reprised",
    description:
      "The crawl moved into the browser: 47 checks, two scores per page, guarded AI fixes on free tiers — and a site that passes its own audit.",
    url: `${SITE}${PATH}`,
    images: [{ url: IMG.og.src, width: IMG.og.w, height: IMG.og.h, alt: IMG.og.alt }],
  },
};

/* ── Schema ─────────────────────────────────────────────────────────────── */
const appLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "That One Crawler",
  alternateName: "Crawl Daddy V2",
  description:
    "A free SEO and AI-search audit tool for blogs. It crawls up to 1,000 pages, runs 47 checks on each, and scores every page for classic SEO and for AI-answer readiness, with AI writing help on free tiers.",
  url: LINKS.live,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any modern web browser",
  softwareVersion: "2",
  image: `${SITE}${IMG.og.src}`,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};
const articleLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "That One Crawler — rebuilding an SEO crawler so the visitor’s browser runs the crawl",
  author: { "@type": "Person", name: "Suman Debnath" },
  publisher: { "@type": "Person", name: "Suman Debnath" },
  description:
    "How Crawl Daddy, a Flask crawler that had to be republished every 30 days, became That One Crawler: a browser-driven crawl over stateless serverless routes, a second score for AI readiness, AI help with a fabrication guard, and a site that passes its own audit.",
  mainEntityOfPage: `${SITE}${PATH}`,
};

/* ── Page-scoped styles. Lime is a variable so Daddy mode can turn it gold.
      Entrances use `backwards`, never `both` (PROJECT_BIBLE §5 trap 4), and
      everything stops under reduced motion. ─────────────────────────────── */
const CSS = `
[data-toc-root]{--toc-lime:${TC.limeHex}}
[data-toc-root].toc-daddy{--toc-lime:${TC.gold}}
.toc-display{font-family:var(--font-bricolage),ui-sans-serif,system-ui,sans-serif}
.toc-dots{background-image:radial-gradient(${TC.line} 1.2px,transparent 1.2px);background-size:22px 22px}
.toc-hl{background:linear-gradient(transparent 58%,var(--toc-lime) 58%,var(--toc-lime) 92%,transparent 92%);padding:0 .12em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.toc-sticker{background:var(--toc-lime);color:${TC.ink};padding:0 .2em;border-radius:.18em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
@keyframes toc-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.toc-marquee-track{animation:toc-marquee 45s linear infinite}
.toc-marquee:hover .toc-marquee-track{animation-play-state:paused}
@keyframes toc-wobble{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
.toc-wobble{animation:toc-wobble 3.2s ease-in-out infinite;transform-origin:50% 20%}
.toc-eye{transform-box:fill-box;transform-origin:center}
@keyframes toc-blink{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.08)}}
.toc-blink .toc-eye{animation:toc-blink .18s ease-in-out}
@keyframes toc-squish{0%{transform:scale(1,1)}30%{transform:scale(1.18,.82)}60%{transform:scale(.92,1.1)}100%{transform:scale(1,1)}}
.toc-squish{animation:toc-squish .45s ease-out;transform-origin:50% 80%}
@keyframes toc-rise{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
.toc-rise{animation:toc-rise .35s ease-out backwards}
@keyframes toc-walk{from{left:0}to{left:calc(100% - 1.6rem)}}
.toc-walk{animation:toc-walk 2.6s ease-in-out infinite alternate}
@keyframes toc-fill{from{width:4%}to{width:96%}}
.toc-fill{animation:toc-fill 2.6s ease-in-out infinite alternate}
.toc-btn{transition:transform .15s ease,box-shadow .15s ease}
.toc-btn:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 0 ${TC.ink}!important}
.toc-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 0 ${TC.ink}!important}
.toc-card{transition:transform .25s cubic-bezier(.22,1,.36,1)}
.toc-card:hover{transform:translate(-2px,-2px)}
@media (prefers-reduced-motion:reduce){.toc-marquee-track,.toc-wobble,.toc-walk,.toc-fill,.toc-squish,.toc-rise,.toc-blink .toc-eye{animation:none!important}.toc-btn,.toc-card{transition:none}}
`;

/* ═════════════════════════════ small building blocks ═════════════════════ */

/** The app's signature: a 2px ink outline and a shadow that never blurs. */
const brutal = (n = 4, shadow: string = TC.ink) => ({ border: `2px solid ${TC.ink}`, boxShadow: `${n}px ${n}px 0 0 ${shadow}` });

type Tone = "paper" | "night" | "violet" | "lime";

function SectionLabel({ index, kicker, tone = "paper" }: { index: string; kicker: string; tone?: Tone }) {
  const kickerColor = { paper: TC.ink3, night: TC.cream3, violet: "#ffffff", lime: TC.ink2 }[tone];
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="font-dmmono text-[11px] font-semibold rounded-md px-1.5 py-0.5 leading-none"
        style={tone === "night" ? { background: TC.lime, color: TC.ink } : { background: TC.ink, color: tone === "lime" ? TC.limeHex : TC.lime }}
      >
        {index}
      </span>
      <span className="font-dmmono text-[10.5px] uppercase tracking-[0.26em]" style={{ color: kickerColor }}>
        {kicker}
      </span>
    </div>
  );
}

/** The app's headline: Bricolage at full weight, the second phrase marked in lime. */
function Headline({ a, b, tone = "paper" }: { a: string; b: string; tone?: Tone }) {
  const color = { paper: TC.ink, night: TC.cream, violet: "#ffffff", lime: TC.ink }[tone];
  const mark =
    tone === "paper" ? { className: "toc-hl" } :
    tone === "night" ? { style: { color: TC.lime } } :
    tone === "violet" ? { className: "toc-sticker" } :
    { style: { background: TC.ink, color: TC.limeHex, padding: "0 .2em", borderRadius: ".18em" } as React.CSSProperties };
  return (
    <h2 className="toc-display font-extrabold text-[2.15rem] md:text-[3.2rem] leading-[1] tracking-[-0.03em] mb-5 text-balance" style={{ color }}>
      {a} <span {...mark}>{b}</span>
    </h2>
  );
}

function Chip({ children, tone = "card" }: { children: React.ReactNode; tone?: "card" | "night" }) {
  return (
    <span
      className="font-dmmono text-[11px] md:text-[11.5px] rounded-full px-3 py-1.5 whitespace-nowrap"
      style={
        tone === "card"
          ? { background: TC.card, color: TC.ink, border: `2px solid ${TC.ink}`, boxShadow: `2px 2px 0 0 ${TC.ink}` }
          : { background: TC.night2, color: TC.cream, border: `1px solid ${TC.nightLine}` }
      }
    >
      {children}
    </span>
  );
}

/** A screenshot in a browser-ish card: dotted title bar, ink outline, hard shadow. */
function Frame({
  shot,
  label,
  aspect,
  focus = "top",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 560px",
  shadow = TC.ink,
  className = "",
}: {
  shot: Shot;
  label: string;
  aspect?: string;
  focus?: string;
  priority?: boolean;
  sizes?: string;
  shadow?: string;
  className?: string;
}) {
  return (
    <figure className={`rounded-[14px] overflow-hidden flex flex-col min-w-0 ${className}`} style={{ background: TC.card, ...brutal(6, shadow) }}>
      <figcaption className="flex items-center gap-2.5 px-3.5 py-2 shrink-0" style={{ background: TC.paper, borderBottom: `2px solid ${TC.ink}` }}>
        <span className="flex gap-1 shrink-0" aria-hidden>
          {[TC.crit, TC.gold, TC.limeHex].map((c) => (
            <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, border: `1.5px solid ${TC.ink}` }} />
          ))}
        </span>
        <span className="font-dmmono text-[10.5px] tracking-[0.06em] truncate min-w-0" style={{ color: TC.ink2 }}>{label}</span>
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

/** The app's ScoreRing: an ink arc under a slimmer coloured one, like a sticker. */
function ScoreRing({ value, kind, label, grade }: { value: number; kind: "seo" | "ai"; label: string; grade: string }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  const color = kind === "ai" ? TC.ai : TC.lime;
  return (
    <figure className="flex flex-col items-center gap-2 shrink-0">
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={r} fill="none" stroke={TC.line} strokeWidth="11" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={TC.ink} strokeWidth="13" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="toc-display font-extrabold text-[2rem] leading-none" style={{ color: TC.ink }}>{value}</span>
          <span className="font-manrope text-[10px] font-bold" style={{ color: TC.ink3 }}>/ 100</span>
        </div>
      </div>
      <figcaption className="flex flex-col items-center gap-1">
        <span className="flex items-center gap-1.5 font-manrope text-[11px] font-extrabold uppercase tracking-[0.12em]" style={{ color: TC.ink }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: color, border: `1.5px solid ${TC.ink}` }} />
          {label}
        </span>
        <span className="font-manrope text-[11px] font-bold rounded-md px-2 py-0.5" style={{ background: "#dcefdf", color: TC.good }}>{grade}</span>
      </figcaption>
    </figure>
  );
}

function PrimaryButton({ href, children, tone = "lime" }: { href: string; children: React.ReactNode; tone?: "lime" | "ink" | "card" }) {
  const fill = { lime: { background: TC.lime, color: TC.ink }, ink: { background: TC.ink, color: TC.cream }, card: { background: TC.card, color: TC.ink } }[tone];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="toc-btn group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-manrope font-extrabold text-[15px]"
      style={{ ...fill, ...brutal(4) }}
    >
      {children}
    </a>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ═════════════════════════════════════════════════════════════════════════ */
export default function ThatOneCrawlerPage() {
  const toneDot = { crit: TC.critLight, warn: TC.gold, note: "#8eaeff" } as const;

  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Navigation />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <main data-toc-root className={`${bricolage.variable} relative min-h-screen font-manrope overflow-x-hidden`} style={{ background: TC.paper, color: TC.ink }}>
        <DaddyBadge />

        {/* ════════════════════════════ HERO ════════════════════════════ */}
        <section className="toc-dots relative" style={{ borderBottom: `2px solid ${TC.ink}` }}>
          <HeroLock />
          <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-16 md:pt-36 md:pb-20 grid gap-12 md:grid-cols-[1.3fr_0.7fr] items-center">
            <div className="min-w-0">
              <Reveal>
                <span
                  className="inline-block -rotate-1 rounded-full px-3.5 py-1 font-manrope text-[13px] font-extrabold"
                  style={{ background: TC.lime, color: TC.ink, ...brutal(2) }}
                >
                  {HERO.kicker} <span aria-hidden>✦</span> now with fewer excuses
                </span>
              </Reveal>

              <Reveal delay={0.04}>
                <Breadcrumbs
                  trail={[
                    { label: "Crawlers", href: null },
                    { label: "That One Crawler", href: PATH },
                  ]}
                  variant="paper"
                  className="mt-6 mb-6"
                />
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="toc-display font-extrabold text-[2.7rem] sm:text-[3.7rem] lg:text-[4.6rem] leading-[0.95] tracking-[-0.035em] text-balance">
                  <span className="sr-only">That One Crawler: </span>
                  The crawl moved <span className="toc-hl">into your browser.</span>
                </h1>
                <PageAnswer href={PATH} className="!mx-0 !max-w-2xl" />
              </Reveal>

              <Reveal delay={0.12}>
                <p className="text-[15.5px] md:text-[16.5px] leading-relaxed max-w-xl mb-7" style={{ color: TC.ink2 }}>
                  Crawl Daddy, the first version, needed a server that had to be republished every 30 days to stay
                  alive. This one turned the architecture around: the visitor’s browser drives the crawl and calls
                  small serverless routes that each finish in seconds. Nothing to host, nothing to babysit.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="flex flex-wrap gap-2 mb-8">
                  {HERO.chips.map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <PrimaryButton href={LINKS.live}>
                    🕷️ Judge a blog with V2
                    <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                  </PrimaryButton>
                  <PrimaryButton href={LINKS.v1} tone="card">
                    Meet V1, Crawl Daddy <span aria-hidden>↗</span>
                  </PrimaryButton>
                </div>
                <p className="mt-5 inline-flex items-center gap-2 font-dmmono text-[11px]" style={{ color: TC.good }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: TC.good }} />
                  Live · thatonecrawler.houseofnamus.com
                </p>
                <p className="font-dmmono text-[11px] mt-2 tracking-[0.02em]" style={{ color: TC.ink3 }}>{HERO.built}</p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <HeroSpider />
            </Reveal>
          </div>
        </section>

        {/* ════════════════ the app's own findings marquee ════════════════ */}
        <section aria-label="Example findings, for illustration" className="toc-marquee overflow-hidden py-3" style={{ background: TC.ink, color: TC.paper, borderBottom: `2px solid ${TC.ink}` }}>
          <ul className="toc-marquee-track flex w-max gap-8 font-dmmono text-[13px] whitespace-nowrap">
            {[...FINDINGS, ...FINDINGS].map((f, i) => (
              <li key={i} className="flex items-center gap-2" aria-hidden={i >= FINDINGS.length}>
                <span className="w-2 h-2 rounded-full" style={{ background: toneDot[f.tone] }} />
                <span className="font-bold" style={{ color: TC.lime }}>{f.path}</span>
                <span style={{ color: TC.cream2 }}>{f.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ════════════════════════════ STAT BAND ════════════════════════════ */}
        <section className="px-6 py-14" style={{ background: TC.lime, borderBottom: `2px solid ${TC.ink}` }}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={(i % 6) * 0.04}>
                <div className="toc-card rounded-xl h-full p-5" style={{ background: TC.card, ...brutal(4) }}>
                  <p className="toc-display font-extrabold text-[2.5rem] leading-none tracking-[-0.03em]" style={{ color: TC.ink }}>{s.value}</p>
                  <p className="font-manrope font-extrabold text-[13px] mt-2.5" style={{ color: TC.ink }}>{s.label}</p>
                  <p className="font-manrope text-[11.5px] mt-1 leading-snug" style={{ color: TC.ink2 }}>{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ════════════════════════════ 01 · V1 → V2 ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="01" kicker="two versions · one crawler" />
              <Headline a="Same instincts." b="Faster legs." />
              <p className="text-[15.5px] leading-relaxed max-w-2xl mb-12" style={{ color: TC.ink2 }}>
                Crawl Daddy came first: a Flask server on Replit that crawled with headless Chromium and had to be
                republished every 30 days to stay online. That One Crawler is the rebuild — the same job and the same
                SEO formula, with none of the babysitting, and a lot more on top. Both are live.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Reveal>
                <div className="toc-card rounded-2xl h-full overflow-hidden flex flex-col" style={{ background: TC.card, ...brutal(6) }}>
                  <div className="flex items-center justify-between gap-3 px-5 py-3.5" style={{ background: TC.gold, borderBottom: `2px solid ${TC.ink}` }}>
                    <span className="toc-display font-extrabold text-[1.25rem] tracking-[-0.02em]">V1 · Crawl Daddy</span>
                    <span className="font-dmmono text-[10.5px] rounded-full px-2 py-0.5" style={{ background: TC.card, border: `1.5px solid ${TC.ink}` }}>the original</span>
                  </div>
                  <div className="relative w-full" style={{ aspectRatio: "16 / 9", borderBottom: `2px solid ${TC.ink}` }}>
                    <Image src={IMG.v1.src} alt={IMG.v1.alt} fill sizes="(max-width: 768px) 100vw, 560px" loading="lazy" className="object-cover" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="font-manrope text-[14px] leading-relaxed mb-5" style={{ color: TC.ink2 }}>
                      Flask, Playwright and a background thread per scan. It worked — as long as somebody remembered to
                      republish it every month.
                    </p>
                    <div className="mt-auto">
                      <PrimaryButton href={LINKS.v1} tone="card">Visit Crawl Daddy <span aria-hidden>↗</span></PrimaryButton>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <div className="toc-card rounded-2xl h-full overflow-hidden flex flex-col" style={{ background: TC.card, ...brutal(6) }}>
                  <div className="flex items-center justify-between gap-3 px-5 py-3.5" style={{ background: TC.lime, borderBottom: `2px solid ${TC.ink}` }}>
                    <span className="toc-display font-extrabold text-[1.25rem] tracking-[-0.02em]">V2 · Reprised, upgraded, on steroids</span>
                  </div>
                  <div className="relative w-full" style={{ aspectRatio: "16 / 9", borderBottom: `2px solid ${TC.ink}` }}>
                    <Image src={IMG.hero.src} alt={IMG.hero.alt} fill sizes="(max-width: 768px) 100vw, 560px" loading="lazy" className="object-cover object-top" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="font-manrope text-[14px] leading-relaxed mb-5" style={{ color: TC.ink2 }}>
                      Next.js on Vercel’s free tier, a second score for AI search, guarded AI fixes, four focused tools and
                      30 guides. It costs nothing to keep running.
                    </p>
                    <div className="mt-auto">
                      <PrimaryButton href={LINKS.live}>Open That One Crawler <span aria-hidden>↗</span></PrimaryButton>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="rounded-2xl overflow-hidden" style={{ background: TC.card, ...brutal(6) }}>
                <div className="hidden md:grid grid-cols-[190px_1fr_1fr]" style={{ background: TC.ink, color: TC.cream }}>
                  <span className="px-5 py-3 font-dmmono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: TC.cream3 }}>Side by side</span>
                  <span className="px-5 py-3 font-manrope font-extrabold text-[14px]" style={{ color: TC.gold }}>V1 · Crawl Daddy</span>
                  <span className="px-5 py-3 font-manrope font-extrabold text-[14px]" style={{ color: TC.lime }}>V2 · That One Crawler</span>
                </div>
                {VERSIONS.map((r, i) => (
                  <div
                    key={r.k}
                    className="grid grid-cols-1 md:grid-cols-[190px_1fr_1fr]"
                    style={{ borderTop: i === 0 ? undefined : `1.5px solid ${TC.line}` }}
                  >
                    <span className="px-5 pt-4 md:py-4 font-dmmono text-[11px] uppercase tracking-[0.14em]" style={{ color: TC.ink2 }}>{r.k}</span>
                    <p className="px-5 py-2 md:py-4 font-manrope text-[13.5px] leading-snug" style={{ color: TC.ink2 }}>
                      <span className="md:hidden font-extrabold" style={{ color: TC.ink }}>V1 · </span>
                      {r.v1}
                    </p>
                    <p className="px-5 pb-4 pt-2 md:py-4 font-manrope text-[13.5px] font-semibold leading-snug" style={{ color: TC.ink, background: "rgba(214,255,61,0.18)" }}>
                      <span className="md:hidden font-extrabold">V2 · </span>
                      {r.v2}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 02 · THE KEY MOVE ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: TC.night, color: TC.cream, borderTop: `2px solid ${TC.ink}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="02" kicker="the key move · a browser-driven crawl" tone="night" />
              <Headline a="The browser runs the crawl." b="The server just answers." tone="night" />
              <p className="text-[15.5px] leading-relaxed max-w-2xl mb-12" style={{ color: TC.cream2 }}>
                Free serverless hosting can’t run a long background job, and a crawl of 1,000 pages is one. So the work
                was turned around. The visitor’s browser orchestrates discovery, crawling, link checks and PageSpeed,
                and calls small stateless routes that each finish in seconds. No database, no queue, no server to keep
                alive.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.1fr] gap-5 items-stretch">
              <Reveal>
                <div className="rounded-2xl h-full p-6" style={{ background: TC.night2, border: `2px solid ${TC.cream}`, boxShadow: `6px 6px 0 0 ${TC.limeHex}` }}>
                  <p className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] mb-1" style={{ color: TC.lime }}>Your browser</p>
                  <p className="font-dmmono text-[12px] mb-5" style={{ color: TC.cream3 }}>runScan() · src/lib/client/crawl.ts</p>
                  <ol className="space-y-4">
                    {SCAN_STEPS.map((s) => (
                      <li key={s.n} className="flex gap-3.5">
                        <span className="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center toc-display font-extrabold text-[14px]" style={{ background: TC.lime, color: TC.ink }}>
                          {s.n}
                        </span>
                        <div>
                          <p className="font-manrope font-extrabold text-[14.5px]" style={{ color: TC.cream }}>{s.title}</p>
                          <p className="font-manrope text-[13px] leading-relaxed" style={{ color: TC.cream2 }}>{s.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  {/* the app's progress bar, with its little spider walking it */}
                  <div className="relative mt-7 h-7" aria-hidden>
                    <div className="absolute left-0 right-0 top-[18px] h-2.5 rounded-full overflow-hidden" style={{ background: TC.night3, border: `1.5px solid ${TC.cream3}` }}>
                      <div className="toc-fill h-full rounded-full" style={{ background: TC.lime }} />
                    </div>
                    <div className="toc-walk absolute top-0 w-[1.6rem] h-[1.6rem]">
                      <Spider mood="happy" className="w-full h-full" title="" />
                    </div>
                  </div>
                </div>
              </Reveal>

              <div aria-hidden className="hidden lg:flex flex-col items-center justify-center gap-1 font-dmmono text-[10px] uppercase tracking-[0.2em]" style={{ color: TC.cream3 }}>
                <span className="text-2xl" style={{ color: TC.lime }}>⇄</span>
                POST
                <span className="normal-case tracking-normal">seconds each</span>
              </div>

              <Reveal delay={0.06}>
                <div className="rounded-2xl h-full overflow-hidden" style={{ background: TC.night2, border: `1.5px solid ${TC.nightLine}` }}>
                  <p className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] px-5 py-3" style={{ color: TC.cream3, borderBottom: `1.5px solid ${TC.nightLine}` }}>
                    Stateless API routes · rate-limited per IP
                  </p>
                  {ROUTES.map((r) => (
                    <div key={r.path} className="grid grid-cols-[1fr_auto] gap-3 items-center px-5 py-3" style={{ borderBottom: `1px solid ${TC.nightLine}` }}>
                      <div className="min-w-0">
                        <p className="font-dmmono text-[13px] font-semibold" style={{ color: TC.lime }}>{r.path}</p>
                        <p className="font-manrope text-[12.5px] leading-snug mt-0.5" style={{ color: TC.cream2 }}>{r.job}</p>
                      </div>
                      <span className="font-dmmono text-[10.5px] rounded-full px-2.5 py-1 whitespace-nowrap" style={{ background: TC.night3, color: TC.cream, border: `1px solid ${TC.nightLine}` }}>
                        {r.limit}
                      </span>
                    </div>
                  ))}
                  <p className="font-manrope text-[12.5px] px-5 py-3.5" style={{ color: TC.cream2 }}>
                    Results come back to the browser, are scored there, and are saved there: the last 25 scans in
                    IndexedDB, on the visitor’s own device.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.05}>
              <div className="mt-12">
                <Frame
                  shot={IMG.progress}
                  label="thatonecrawler · scanning wordpress.org/news · 15 / 25"
                  shadow={TC.limeHex}
                  sizes="(max-width: 1152px) 100vw, 1100px"
                />
                <p className="font-manrope text-[12.5px] mt-4" style={{ color: TC.cream3 }}>
                  A 25-page scan of wordpress.org/news, captured mid-crawl. The verdict fills in while the pages arrive;
                  this one finished in 25 seconds.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 03 · TWO SCORES ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ borderTop: `2px solid ${TC.ink}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="03" kicker="the report · seo and ai readiness" />
              <Headline a="One crawl." b="Two different questions." />
              <p className="text-[15.5px] leading-relaxed max-w-2xl mb-12" style={{ color: TC.ink2 }}>
                Classic SEO asks whether a page can rank. AI search asks whether a page can be quoted. Those are
                different questions, so every page gets two numbers — lime for SEO, violet for AI readiness — on rings
                of equal size, so neither reads as the footnote.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { kind: "seo" as const, title: "SEO score", note: "Kept identical to Crawl Daddy’s formula, so old and new scores compare.", rows: SEO_SCORE, value: OWN_AUDIT[0].value, label: "SEO score", color: TC.lime },
                { kind: "ai" as const, title: "AI-readiness score", note: "New in V2. GEO and AEO: can an answer engine lift a clean answer from this page?", rows: AI_SCORE, value: OWN_AUDIT[1].value, label: "AI readiness", color: TC.ai },
              ].map((s, i) => (
                <Reveal key={s.kind} delay={i * 0.06}>
                  <div className="rounded-2xl h-full p-6 md:p-7" style={{ background: TC.card, ...brutal(6) }}>
                    <div className="flex items-center gap-5 mb-6">
                      <ScoreRing value={s.value} kind={s.kind} label={s.label} grade="Excellent" />
                      <div>
                        <h3 className="toc-display font-extrabold text-[1.6rem] tracking-[-0.02em] leading-tight">{s.title}</h3>
                        <p className="font-manrope text-[13.5px] leading-relaxed mt-1.5" style={{ color: TC.ink2 }}>{s.note}</p>
                      </div>
                    </div>
                    <ul className="space-y-2.5">
                      {s.rows.map((r) => (
                        <li key={r.rule} className="grid grid-cols-[2.4rem_1fr] gap-3 items-center">
                          <span className="toc-display font-extrabold text-[15px] text-right" style={{ color: TC.ink }}>{r.pts}</span>
                          <div>
                            <p className="font-manrope text-[13px] leading-snug" style={{ color: TC.ink2 }}>{r.rule}</p>
                            <div className="h-2 mt-1 rounded-full overflow-hidden" style={{ background: TC.sunk }}>
                              <div className="h-full rounded-full" style={{ width: `${(r.pts / 20) * 100}%`, background: s.color, boxShadow: `inset 0 0 0 1px ${TC.ink}` }} />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="font-dmmono text-[11px] mt-4" style={{ color: TC.ink3 }}>
              The rings show the app’s own audit of its own site: SEO 91, AI readiness 93.
            </p>

            <Reveal delay={0.04}>
              <div className="mt-14">
                <h3 className="toc-display font-extrabold text-[1.6rem] md:text-[2rem] tracking-[-0.02em] mb-2">47 checks, nine categories, one guide each.</h3>
                <p className="font-manrope text-[14.5px] leading-relaxed max-w-2xl mb-5" style={{ color: TC.ink2 }}>
                  Every check carries a severity, a “why it matters” and a “how to fix it”, and links to one of 30
                  plain-English guides. The site-wide ones — duplicates, cannibalization, orphans, click depth — can
                  only run once the whole crawl is in, so they run in the browser at the end.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {CHECK_CATEGORIES.map((c) => (
                    <span key={c.name} className="inline-flex items-center gap-2 rounded-full pl-3 pr-1.5 py-1 font-manrope text-[13px] font-bold" style={{ background: TC.card, ...brutal(2) }}>
                      {c.name}
                      <span className="font-dmmono text-[11px] rounded-full px-2 py-0.5" style={{ background: TC.ink, color: TC.limeHex }}>{c.n}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
              <Reveal className="md:col-span-2">
                <Frame shot={IMG.verdict} label="the verdict · wordpress.org/news · 25 pages · 25s" sizes="(max-width: 1152px) 100vw, 1100px" />
              </Reveal>
              <Reveal>
                <Frame shot={IMG.pages} label="pages · sortable, filterable, csv" aspect="16 / 10" sizes="(max-width: 768px) 100vw, 560px" />
              </Reveal>
              <Reveal delay={0.06}>
                <Frame shot={IMG.links} label="links · broken, orphans, buried, hubs" aspect="16 / 10" sizes="(max-width: 768px) 100vw, 560px" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 04 · AI WITH GUARDRAILS ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: TC.ai, color: "#ffffff", borderTop: `2px solid ${TC.ink}`, borderBottom: `2px solid ${TC.ink}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="04" kicker="ai help · free tiers · guardrails" tone="violet" />
              <Headline a="AI fixes," b="fact-checked before you see them." tone="violet" />
              <p className="text-[15.5px] leading-relaxed max-w-2xl mb-12" style={{ color: "#ffffff" }}>
                Six writing tasks — title and description, a quick-answer intro, question headings, a section rewrite,
                an FAQ, and a site-wide action plan. A page can contain prompt injection and a model can invent a
                number, so neither is trusted. Every answer is checked against the page it came from.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
              <Reveal>
                <Frame shot={IMG.ai} label="page drawer · ✦ ai tools" sizes="(max-width: 1024px) 100vw, 460px" className="max-w-[480px] mx-auto lg:mx-0" />
              </Reveal>

              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {GUARDS.map((g, i) => (
                    <Reveal key={g.title} delay={(i % 2) * 0.05}>
                      <div className="toc-card rounded-xl h-full p-5" style={i === 1 ? { background: TC.lime, color: TC.ink, ...brutal(5) } : { background: TC.card, color: TC.ink, ...brutal(5) }}>
                        <h3 className="toc-display font-extrabold text-[1.15rem] tracking-[-0.01em] mb-1.5">{g.title}</h3>
                        <p className="font-manrope text-[13px] leading-relaxed" style={{ color: TC.ink2 }}>{g.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.06}>
                  <div className="mt-6 rounded-xl overflow-hidden" style={{ background: TC.night, color: TC.cream, ...brutal(5) }}>
                    <p className="font-dmmono text-[10.5px] uppercase tracking-[0.2em] px-5 py-3" style={{ color: TC.cream3, borderBottom: `1.5px solid ${TC.nightLine}` }}>
                      Who answers first
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {AI_TASKS.map((t) => (
                        <div key={t.task} className="flex items-center justify-between gap-3 px-5 py-2.5" style={{ borderBottom: `1px solid ${TC.nightLine}` }}>
                          <span className="font-manrope text-[13px]" style={{ color: TC.cream }}>{t.task}</span>
                          <span
                            className="font-dmmono text-[10.5px] rounded-full px-2.5 py-0.5"
                            style={t.first === "Groq" ? { background: TC.lime, color: TC.ink } : { background: TC.aiLight, color: TC.ink }}
                          >
                            {t.first} · {t.size}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="font-manrope text-[12.5px] leading-relaxed px-5 py-3.5" style={{ color: TC.cream2 }}>
                      Groq is fast, so short jobs go there first; Gemini has the bigger budget, so long ones do. Each
                      falls back to the other inside a 70-second budget, and a refused key skips straight to the next
                      provider.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 05 · FOUR TOOLS ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="05" kicker="four focused tools · one engine" />
              <Headline a="Four tools." b="Each does one job." />
              <p className="text-[15.5px] leading-relaxed max-w-2xl mb-12" style={{ color: TC.ink2 }}>
                Not four doors into the same scan. Two check a single page in seconds; two crawl the site. They share
                the engine underneath, and every site crawl is saved like any scan, so the full report is one click
                away.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TOOLS.map((t, i) => {
                const head = {
                  lime: { background: TC.lime, color: TC.ink },
                  ai: { background: TC.ai, color: "#ffffff" },
                  ink: { background: TC.ink, color: TC.cream },
                  paper: { background: TC.sunk, color: TC.ink },
                }[t.tone];
                return (
                  <Reveal key={t.name} delay={(i % 2) * 0.06}>
                    <div className="toc-card rounded-2xl h-full overflow-hidden flex flex-col" style={{ background: TC.card, ...brutal(6) }}>
                      <div className="flex items-center justify-between gap-3 px-5 py-3.5" style={{ ...head, borderBottom: `2px solid ${TC.ink}` }}>
                        <h3 className="toc-display font-extrabold text-[1.2rem] tracking-[-0.02em]">{t.name}</h3>
                        <span className="font-dmmono text-[10.5px] rounded-full px-2 py-0.5 shrink-0" style={{ background: TC.card, color: TC.ink, border: `1.5px solid ${TC.ink}` }}>
                          {t.mode}
                        </span>
                      </div>
                      <p className="px-5 pt-4 pb-5 font-manrope text-[13.5px] leading-relaxed" style={{ color: TC.ink2 }}>{t.body}</p>
                      {t.shot ? (
                        <div className="relative w-full mt-auto" style={{ aspectRatio: "16 / 10", borderTop: `2px solid ${TC.ink}` }}>
                          <Image src={IMG[t.shot].src} alt={IMG[t.shot].alt} fill sizes="(max-width: 768px) 100vw, 560px" loading="lazy" className="object-cover object-top" />
                        </div>
                      ) : (
                        <div className="mt-auto px-5 pb-6">
                          <div className="rounded-xl p-4" style={{ background: TC.paper, border: `2px solid ${TC.ink}` }}>
                            <p className="font-dmmono text-[10.5px] uppercase tracking-[0.16em] mb-3" style={{ color: TC.ink2 }}>
                              Competing for “{CANNIBAL_DEMO.keyword}”
                            </p>
                            <ul className="space-y-2">
                              {CANNIBAL_DEMO.pages.map((p) => (
                                <li
                                  key={p.path}
                                  className="grid grid-cols-[1fr_auto_auto] gap-3 items-center rounded-lg px-3 py-2"
                                  style={p.keep ? { background: TC.lime, border: `1.5px solid ${TC.ink}` } : { background: TC.card, border: `1.5px solid ${TC.line}` }}
                                >
                                  <span className="font-dmmono text-[12px] truncate min-w-0">{p.path}</span>
                                  <span className="font-dmmono text-[11px]" style={{ color: TC.ink2 }}>{p.links} links</span>
                                  <span className="font-manrope text-[12px] font-extrabold">{p.keep ? "★ Keep" : p.score}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="font-manrope text-[11.5px] mt-3" style={{ color: TC.ink2 }}>
                              Illustrative pages, real shape: the strongest page is marked to keep, the others to merge,
                              redirect or re-angle.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.04}>
              <div className="mt-10 rounded-2xl p-6 md:p-8 grid md:grid-cols-[0.8fr_1.2fr] gap-6" style={{ background: TC.sunk, border: `2px solid ${TC.ink}` }}>
                <div>
                  <h3 className="toc-display font-extrabold text-[1.6rem] tracking-[-0.02em] leading-tight">An honest keyword engine.</h3>
                  <p className="font-manrope text-[14px] leading-relaxed mt-2" style={{ color: TC.ink2 }}>
                    Deterministic, and it never makes anything up. Cannibalization only counts indexable pages that
                    point their canonical at themselves.
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {KEYWORD_RULES.map((k) => (
                    <li key={k} className="flex gap-3">
                      <span className="mt-[7px] w-2 h-2 rounded-full shrink-0" style={{ background: TC.ink }} />
                      <span className="font-manrope text-[13.5px] leading-relaxed" style={{ color: TC.ink }}>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ 06 · ENGINEERING NOTES ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: TC.night, color: TC.cream, borderTop: `2px solid ${TC.ink}` }}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <SectionLabel index="06" kicker="engineering notes" tone="night" />
              <Headline a="Four problems" b="worth writing down." tone="night" />
            </Reveal>

            <div className="space-y-5 mt-10">
              {NOTES.map((n) => (
                <Reveal key={n.n}>
                  <article className="rounded-2xl p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-5 md:gap-8" style={{ background: TC.night2, border: `1.5px solid ${TC.nightLine}` }}>
                    <span className="w-14 h-14 rounded-xl flex items-center justify-center toc-display font-extrabold text-[1.4rem] shrink-0" style={{ background: TC.lime, color: TC.ink, border: `2px solid ${TC.cream}` }}>
                      {n.n}
                    </span>
                    <div>
                      <h3 className="toc-display font-extrabold text-[1.4rem] md:text-[1.7rem] tracking-[-0.02em] mb-4" style={{ color: TC.cream }}>{n.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <p className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: TC.critLight }}>The constraint</p>
                          <p className="font-manrope text-[13.5px] leading-relaxed" style={{ color: TC.cream2 }}>{n.constraint}</p>
                        </div>
                        <div>
                          <p className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: TC.goodLight }}>The resolution</p>
                          <p className="font-manrope text-[13.5px] leading-relaxed" style={{ color: TC.cream2 }}>{n.resolution}</p>
                        </div>
                      </div>
                      <blockquote className="mt-6 pl-4 font-serif italic text-[1.2rem] md:text-[1.4rem] leading-snug" style={{ color: TC.cream, borderLeft: `3px solid ${TC.limeHex}` }}>
                        “{n.quote}”
                      </blockquote>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 07 · ITS OWN AUDIT ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: TC.lime, borderTop: `2px solid ${TC.ink}`, borderBottom: `2px solid ${TC.ink}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="07" kicker="it practises what it preaches" tone="lime" />
              <Headline a="It had to pass" b="its own audit." tone="lime" />
              <p className="text-[15.5px] leading-relaxed max-w-2xl mb-10" style={{ color: TC.ink }}>
                A tool that grades other people’s SEO doesn’t get to fail its own. The app is run against its own site
                as part of every check, and any new notice on its own pages is treated as a bug in the copy or in the
                checker.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { v: "91", l: "SEO score", s: "its own site, out of 100" },
                { v: "93", l: "AI readiness", s: "its own site, out of 100" },
                { v: "0", l: "issues", s: "no critical, warning or notice" },
                { v: "38", l: "pages", s: "every URL in its sitemap" },
              ].map((x, i) => (
                <Reveal key={x.l} delay={i * 0.04}>
                  <div className="toc-card rounded-xl h-full p-5" style={i === 2 ? { background: TC.ink, color: TC.cream, ...brutal(5) } : { background: TC.card, ...brutal(5) }}>
                    <p className="toc-display font-extrabold text-[3rem] leading-none tracking-[-0.04em]" style={{ color: i === 2 ? TC.limeHex : TC.ink }}>{x.v}</p>
                    <p className="font-manrope font-extrabold text-[14px] mt-2">{x.l}</p>
                    <p className="font-manrope text-[12px] mt-0.5" style={{ color: i === 2 ? TC.cream2 : TC.ink2 }}>{x.s}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <Reveal>
                <div className="rounded-2xl p-6" style={{ background: TC.card, ...brutal(6) }}>
                  <h3 className="toc-display font-extrabold text-[1.35rem] tracking-[-0.02em] mb-4">What that took</h3>
                  <ul className="space-y-3">
                    {SELF_PROOF.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="font-manrope font-extrabold shrink-0" style={{ color: TC.good }}>✓</span>
                        <span className="font-manrope text-[13.5px] leading-relaxed" style={{ color: TC.ink2 }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 gap-6">
                <Reveal delay={0.05}>
                  <Frame shot={IMG.geoSelf} label="its own GEO checker, on its own guide · 90 / 100" aspect="16 / 9" sizes="(max-width: 1024px) 100vw, 620px" />
                </Reveal>
                <Reveal delay={0.1}>
                  <Frame shot={IMG.guide} label="one of 30 guides · direct answer, byline, on-this-page" aspect="16 / 9" sizes="(max-width: 1024px) 100vw, 620px" />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 08 · PERSONALITY ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="08" kicker="the voice · the spider" />
              <Headline a="Brutally honest." b="Never mean." />
              <p className="text-[15.5px] leading-relaxed max-w-2xl mb-12" style={{ color: TC.ink2 }}>
                An audit is a list of things you did wrong, so the app says them like a friend would. The jokes never
                stand in front of the information — the verdict is a joke, the issue list under it is not.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {QUIRKS.map((q, i) => (
                  <Reveal key={q.title} delay={(i % 2) * 0.05}>
                    <div className="toc-card rounded-xl h-full p-5" style={i === 2 ? { background: TC.gold, ...brutal(5) } : { background: TC.card, ...brutal(5) }}>
                      <span className="text-2xl" aria-hidden>{q.icon}</span>
                      <h3 className="toc-display font-extrabold text-[1.15rem] mt-2 mb-1.5">{q.title}</h3>
                      <p className="font-manrope text-[13px] leading-relaxed" style={{ color: TC.ink2 }}>{q.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.08}>
                <div className="relative rounded-2xl p-7 toc-dots" style={{ background: TC.paper, border: `2px dashed ${TC.ink}` }}>
                  <div className="flex flex-col gap-3">
                    {[
                      "Honestly? Annoyingly good.",
                      "B-minus energy. Very fixable, though.",
                      "That’s not a URL. That’s a cry for help.",
                      "Say less. Judging now.",
                    ].map((line, i) => (
                      <span
                        key={line}
                        className={`self-start rounded-2xl px-4 py-2.5 font-manrope text-[14px] font-bold ${i % 2 ? "rotate-1 sm:ml-10" : "-rotate-1"}`}
                        style={{ background: TC.card, ...brutal(3) }}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-end justify-between gap-4 mt-6">
                    <p className="font-manrope text-[13px] leading-relaxed max-w-[15rem]" style={{ color: TC.ink2 }}>
                      Lines from the app. The spider at the top of this page takes ten pokes before something happens.
                    </p>
                    <Spider mood="cool" className="w-24 h-24 shrink-0" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 09 · LIMITS ════════════════════════════ */}
        <section className="px-6 py-20 md:py-28" style={{ background: TC.sunk, borderTop: `2px solid ${TC.ink}` }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel index="09" kicker="constraints · honest postscripts" tone="lime" />
              <Headline a="What it can’t do," b="stated plainly." />
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 mt-8 items-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LIMITS.map((c, i) => (
                  <Reveal key={c.title} delay={(i % 2) * 0.05}>
                    <div className="rounded-xl h-full p-5" style={{ background: TC.card, ...brutal(4) }}>
                      <h3 className="toc-display font-extrabold text-[1.1rem] mb-1.5">{c.title}</h3>
                      <p className="font-manrope text-[13px] leading-relaxed" style={{ color: TC.ink2 }}>{c.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.06}>
                <div className="rounded-2xl p-6 md:p-7" style={{ background: TC.night, color: TC.cream, ...brutal(6) }}>
                  <p className="font-dmmono text-[10.5px] uppercase tracking-[0.22em] mb-4" style={{ color: TC.lime }}>Worth admitting</p>
                  <ul className="space-y-3.5">
                    {POSTSCRIPTS.map((p, i) => (
                      <li key={p} className="flex gap-3">
                        <span className="w-2 h-2 rounded-full shrink-0 mt-[7px]" style={{ background: [TC.limeHex, TC.aiLight, TC.gold, TC.critLight][i] }} />
                        <span className="font-manrope text-[13.5px] leading-relaxed" style={{ color: TC.cream2 }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-manrope text-[13px] leading-relaxed mt-5 pt-4" style={{ color: TC.cream, borderTop: `1px solid ${TC.nightLine}` }}>
                    Built with Claude Code. The app’s own commits carry the co-author line, and this page says so too.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ 10 · STACK + CTA ════════════════════════════ */}
        <section className="px-6 pt-20 md:pt-28 pb-24" style={{ borderTop: `2px solid ${TC.ink}` }}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <SectionLabel index="10" kicker="the stack" />
              <div className="flex flex-wrap gap-2 mb-14">
                {STACK.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
                <Chip tone="night">Built with Claude Code</Chip>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative rounded-[1.75rem] px-7 py-12 md:px-14 md:py-14 grid md:grid-cols-[1fr_auto] gap-8 items-center" style={{ background: TC.lime, ...brutal(9) }}>
                <div>
                  <h2 className="toc-display font-extrabold text-[2.2rem] md:text-[3.1rem] leading-[0.98] tracking-[-0.035em] mb-4">
                    Paste a blog.{" "}
                    <span style={{ background: TC.ink, color: TC.limeHex, padding: "0 .2em", borderRadius: ".18em" }}>Get judged.</span>
                  </h2>
                  <p className="font-manrope text-[15px] max-w-xl mb-8 leading-relaxed" style={{ color: TC.ink }}>
                    Every number on this page can be checked in the live app. No signup, no email, no “book a demo” —
                    and the original is still up, if you want to see where it started.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <PrimaryButton href={LINKS.live} tone="ink">
                      🕷️ Open That One Crawler <span aria-hidden>→</span>
                    </PrimaryButton>
                    <PrimaryButton href={LINKS.v1} tone="card">
                      V1 · Crawl Daddy <span aria-hidden>↗</span>
                    </PrimaryButton>
                  </div>
                  <p className="font-manrope text-[13px] mt-6">
                    <Link href="/notebook" className="font-bold underline underline-offset-4">
                      Read the notebook
                    </Link>{" "}
                    — where this site writes about AEO, GEO and getting quoted by AI search.
                  </p>
                </div>
                <Spider mood="happy" className="hidden md:block w-40 h-40 toc-wobble" />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <PageFaq href={PATH} variant="paper" surface={TC.sunk} />
      <RelatedPages href={PATH} variant="paper" surface={TC.sunk} />
      <Contact variant="light" />
    </MotionProvider>
  );
}
