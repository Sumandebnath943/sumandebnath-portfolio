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
import { PosterReveal } from "@/components/ar-video-resume/ArVisuals";
import { AR, LINKS, IMG, HERO, STEPS, CONTROLS, FIXES, FACTS } from "@/components/ar-video-resume/ar-data";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
const PATH = "/ar/video-resume";

export const metadata: Metadata = {
  title: "AR Video Resume · A poster that plays the film",
  description:
    "Scan a QR code, point your phone at the poster and Suman Debnath’s 5:58 film “Who am I?” plays on it in augmented reality. WebAR in the phone’s browser with MindAR and A-Frame — no app, no account, no server.",
  keywords: [
    "AR video resume", "augmented reality resume", "WebAR poster", "MindAR", "A-Frame",
    "image tracking", "AR business card", "video resume", "Suman Debnath",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: "AR Video Resume · A poster that plays the film",
    description:
      "Point a phone at the poster and the film plays on it. Runs in the browser — nothing to install.",
    url: `${SITE}${PATH}`,
    images: [{ url: IMG.og.src, width: IMG.og.w, height: IMG.og.h, alt: IMG.og.alt }],
  },
};

/* ── Schema ─────────────────────────────────────────────────────────────── */
const appLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AR Video Resume",
  description:
    "A WebAR experience that plays the 5:58 film “Who am I?” on top of a poster when a phone camera points at it, using MindAR image tracking and A-Frame in the phone’s browser.",
  url: LINKS.live,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any modern phone browser with a camera",
  image: `${SITE}${IMG.og.src}`,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

/* ── Page-scoped CSS ────────────────────────────────────────────────────── */
const CSS = `
.ar-btn { transition: transform .2s cubic-bezier(.22,1,.36,1), filter .2s; }
.ar-btn:hover { transform: translateY(-2px); filter: brightness(1.06); }
.ar-btn:active { transform: translateY(0) scale(.98); }
.ar-btn:focus-visible, .ar-thumb:focus-visible, .ar-link:focus-visible { outline: 2px solid ${AR.cyan}; outline-offset: 3px; }
.ar-link { text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(237,235,250,.35); }
.ar-link:hover { text-decoration-color: currentColor; }
@keyframes ar-sweep { 0%,100% { transform: translateY(0); opacity: .0 } 10% { opacity: .9 } 50% { transform: translateY(var(--ar-h, 180px)); opacity: .9 } 60% { opacity: 0 } }
.ar-sweep { animation: ar-sweep 3.2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .ar-sweep { animation: none; opacity: 0; } }
`;

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-dmmono text-[11px] md:text-[11.5px] rounded-full px-3 py-1.5 whitespace-nowrap"
      style={{ background: AR.panel, color: AR.text, border: `1px solid ${AR.line}` }}
    >
      {children}
    </span>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-dmmono text-[10.5px] md:text-[11px] uppercase tracking-[0.22em] mb-4" style={{ color: AR.orange }}>
      <span aria-hidden className="h-px w-8" style={{ background: AR.orange }} />
      {children}
    </p>
  );
}

function StepBadge({ n }: { n: string }) {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 w-9 h-9 rounded-full font-dmmono text-[12px] font-bold"
      style={{ background: "rgba(255,126,95,0.14)", color: AR.orange, border: "1px solid rgba(255,126,95,0.45)" }}
    >
      {n}
    </span>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ═════════════════════════════════════════════════════════════════════════ */
export default function ArVideoResumePage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <Navigation />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <main className="relative min-h-screen font-manrope overflow-x-hidden" style={{ background: AR.night, color: AR.text }}>
        {/* ════════════════════════════ HERO + TRY IT ════════════════════════════ */}
        <section
          className="relative sd-banner-host"
          style={{ background: `radial-gradient(120% 70% at 50% 0%, ${AR.indigo} 0%, ${AR.night} 52%, ${AR.deep} 100%)` }}
        >
          <BannerArt seed={PATH} accent={AR.orange} />
          <HeroLock />

          <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-12 md:pt-36 md:pb-16 text-center">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 font-dmmono text-[10px] md:text-[11px] uppercase tracking-[0.22em] rounded-full px-3.5 py-1.5"
                style={{ background: AR.panel, color: AR.text, border: `1px solid ${AR.line}` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: AR.orange }} />
                {HERO.kicker}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <Breadcrumbs
                trail={[
                  { label: "AR", href: null },
                  { label: "AR Video Resume", href: PATH },
                ]}
                align="center"
                className="mt-5 mb-8"
              />
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="font-manrope font-extrabold text-[2.5rem] sm:text-[3.5rem] md:text-[4.4rem] leading-[0.98] tracking-[-0.04em] mb-6">
                <span className="sr-only">AR Video Resume: </span>
                <span>A poster</span>
                <br />
                <span className="font-serif italic font-normal tracking-[-0.015em]" style={{ color: AR.orange }}>
                  that plays the film.
                </span>
              </h1>

              <PageAnswer href={PATH} />
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-[0.98rem] md:text-[1.08rem] leading-relaxed max-w-2xl mx-auto mb-7" style={{ color: AR.muted }}>
                {HERO.pitch}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {HERO.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </Reveal>

            {/* ── The try-it panel: QR on the left, poster on the right ── */}
            <Reveal delay={0.2}>
              <div
                id="try-it"
                className="grid md:grid-cols-[1fr_1.35fr] gap-4 md:gap-5 text-left rounded-3xl p-4 md:p-5"
                style={{ background: "rgba(8,6,26,0.55)", border: `1px solid ${AR.line}`, boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}
              >
                {/* Phone visitors: the QR is pointless on the device that would scan it. */}
                <div
                  className="md:hidden rounded-2xl p-4 text-[14px] leading-relaxed"
                  style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.3)", color: AR.text }}
                >
                  <strong className="font-extrabold">On a phone already?</strong> The phone is the scanner, so the poster
                  needs another screen. Open this page on a laptop, or{" "}
                  <a href={IMG.poster.src} download="ar-video-resume-poster.webp" className="ar-link font-bold" style={{ color: AR.cyan }}>
                    download the poster
                  </a>{" "}
                  to print. Or skip ahead:{" "}
                  <a href={LINKS.live} target="_blank" rel="noopener noreferrer" className="ar-link font-bold" style={{ color: AR.cyan }}>
                    open the scanner ↗
                  </a>
                </div>

                {/* Step 1 — QR */}
                <div className="rounded-2xl p-5 md:p-6 flex flex-col" style={{ background: AR.panel, border: `1px solid ${AR.line}` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <StepBadge n="1" />
                    <h2 className="font-manrope font-extrabold text-[1.05rem] leading-tight">Scan this with your phone</h2>
                  </div>
                  <div className="relative mx-auto w-full max-w-[230px] rounded-2xl bg-white p-4 overflow-hidden" style={{ ["--ar-h" as string]: "198px" }}>
                    <Image src={IMG.qr.src} alt={IMG.qr.alt} width={198} height={198} unoptimized className="w-full h-auto" />
                    <span aria-hidden className="ar-sweep absolute left-3 right-3 top-4 h-[2px] rounded-full" style={{ background: AR.orange, boxShadow: `0 0 12px ${AR.orange}` }} />
                  </div>
                  <p className="text-center font-dmmono text-[11px] mt-3 break-all" style={{ color: AR.muted }}>
                    {LINKS.liveShort}
                  </p>
                  <p className="text-[13.5px] leading-relaxed mt-4" style={{ color: AR.muted }}>
                    It opens the scanner in the phone’s browser. Tap <strong style={{ color: AR.text }}>Enter AR Experience</strong>{" "}
                    and allow the camera.
                  </p>
                </div>

                {/* Steps 2–3 — the poster */}
                <div className="rounded-2xl p-5 md:p-6 flex flex-col" style={{ background: AR.panel, border: `1px solid ${AR.line}` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <StepBadge n="2" />
                    <h2 className="font-manrope font-extrabold text-[1.05rem] leading-tight">Reveal the poster, then point the phone at it</h2>
                  </div>
                  <PosterReveal variant="thumb" />
                  <p className="text-[13.5px] leading-relaxed mt-4" style={{ color: AR.muted }}>
                    The poster fills this screen. Keep all four edges in the phone’s frame — sideways locks fastest — and the
                    film starts on top of it.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto pt-4 text-[13px]">
                    <a href={IMG.poster.src} download="ar-video-resume-poster.webp" className="ar-link font-bold" style={{ color: AR.cyan }}>
                      Download to print
                    </a>
                    <a href={LINKS.live} target="_blank" rel="noopener noreferrer" className="ar-link font-bold" style={{ color: AR.cyan }}>
                      Open the scanner ↗
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ THE GUIDE ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-28" style={{ background: AR.deep }}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <Kicker>The guide · five steps</Kicker>
              <h2 className="font-manrope font-extrabold text-[2rem] md:text-[2.9rem] leading-[1.02] tracking-[-0.03em] mb-4">
                From QR code to film{" "}
                <span className="font-serif italic font-normal" style={{ color: AR.orange }}>in under a minute.</span>
              </h2>
              <p className="max-w-2xl text-[15px] leading-relaxed mb-12" style={{ color: AR.muted }}>
                Two screens: this one shows the poster, the phone does the looking. Everything below is what happens on
                the phone, in order.
              </p>
            </Reveal>

            <ol className="grid gap-4 md:grid-cols-2">
              {STEPS.map((s, i) => (
                <li key={s.n} className={i === STEPS.length - 1 ? "md:col-span-2" : ""}>
                  <Reveal delay={i * 0.04} className="h-full">
                    <div className="h-full rounded-2xl p-6 flex gap-4" style={{ background: AR.panel, border: `1px solid ${AR.line}` }}>
                      <StepBadge n={s.n} />
                      <div>
                        <h3 className="font-manrope font-extrabold text-[1.05rem] leading-snug mb-2">{s.title}</h3>
                        <p className="text-[14.5px] leading-relaxed" style={{ color: AR.muted }}>{s.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <PosterReveal />
                <a
                  href={LINKS.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ar-btn inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-manrope font-bold text-[14px]"
                  style={{ background: "transparent", color: AR.text, border: `1.5px solid ${AR.line}` }}
                >
                  Open the scanner ↗
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ CONTROLS ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ background: AR.night }}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <Kicker>Once the film is playing</Kicker>
              <h2 className="font-manrope font-extrabold text-[2rem] md:text-[2.6rem] leading-[1.04] tracking-[-0.03em] mb-10">
                Five buttons,{" "}
                <span className="font-serif italic font-normal" style={{ color: AR.cyan }}>and a card at the end.</span>
              </h2>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CONTROLS.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.04}>
                  <div className="h-full rounded-2xl p-5" style={{ background: AR.panel, border: `1px solid ${AR.line}` }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span aria-hidden className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[18px]" style={{ background: "rgba(255,255,255,0.08)" }}>
                        {c.icon}
                      </span>
                      <h3 className="font-manrope font-extrabold text-[1rem]">{c.name}</h3>
                    </div>
                    <p className="text-[14px] leading-relaxed" style={{ color: AR.muted }}>{c.body}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={CONTROLS.length * 0.04}>
                <div
                  className="h-full rounded-2xl p-5"
                  style={{ background: "linear-gradient(135deg, rgba(255,126,95,0.16), rgba(0,212,255,0.08))", border: "1px solid rgba(255,126,95,0.4)" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span aria-hidden className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[18px]" style={{ background: "rgba(255,255,255,0.1)" }}>
                      🪪
                    </span>
                    <h3 className="font-manrope font-extrabold text-[1rem]">The end card</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed" style={{ color: AR.text }}>
                    When the film ends it doesn’t stop dead. A card offers <strong>Save contact</strong> (a vCard straight
                    into the phone’s contacts), <strong>Watch again</strong> and <strong>Back to AR</strong>.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ TROUBLESHOOTING ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ background: AR.deep }}>
          <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Kicker>If it won’t lock on</Kicker>
              <h2 className="font-manrope font-extrabold text-[2rem] md:text-[2.4rem] leading-[1.04] tracking-[-0.03em] mb-4">
                The tracker reads detail,{" "}
                <span className="font-serif italic font-normal" style={{ color: AR.orange }}>so give it detail.</span>
              </h2>
              <p className="text-[14.5px] leading-relaxed" style={{ color: AR.muted }}>
                It recognises the poster from 5,218 points of contrast — rooftop edges, kite strings, window frames.
                Glare, dim screens and a cropped view hide them. One limit no setting fixes: a hand-held print bows,
                and the tracker assumes a flat sheet, so a curled printout wobbles more than a screen.
              </p>
            </Reveal>

            <div className="grid gap-3">
              {FIXES.map((f, i) => (
                <Reveal key={f.problem} delay={i * 0.04}>
                  <div className="rounded-2xl p-5" style={{ background: AR.panel, border: `1px solid ${AR.line}` }}>
                    <h3 className="font-manrope font-extrabold text-[15px] mb-1.5" style={{ color: AR.amber }}>{f.problem}</h3>
                    <p className="text-[14px] leading-relaxed" style={{ color: AR.muted }}>{f.fix}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ BUILD + LINKS ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ background: AR.night }}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="grid gap-px rounded-2xl overflow-hidden sm:grid-cols-3" style={{ background: AR.line }}>
                {FACTS.map((f) => (
                  <div key={f.label} className="p-6 md:p-7" style={{ background: AR.night }}>
                    <p className="font-manrope font-extrabold text-[2.4rem] leading-none tracking-[-0.03em] mb-2" style={{ color: AR.orange }}>
                      {f.value}
                    </p>
                    <p className="text-[13.5px] leading-snug" style={{ color: AR.muted }}>{f.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="text-center mt-16">
                <h2 className="font-manrope font-extrabold text-[1.9rem] md:text-[2.5rem] leading-[1.05] tracking-[-0.03em] mb-4">
                  Rather watch it flat?{" "}
                  <span className="font-serif italic font-normal" style={{ color: AR.orange }}>Same film.</span>
                </h2>
                <p className="text-[15px] max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: AR.muted }}>
                  The poster carries the same cut that opens the homepage. The source for the AR page — one HTML file,
                  the compiled poster target and the film — is public.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href={LINKS.film}
                    className="ar-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-manrope font-extrabold text-[15px]"
                    style={{ background: AR.text, color: AR.deep }}
                  >
                    ▶ Watch “Who am I?”
                  </Link>
                  <a
                    href={LINKS.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ar-btn inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-manrope font-bold text-[14px]"
                    style={{ color: AR.text, border: `1.5px solid ${AR.line}` }}
                  >
                    View source on GitHub ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <PageFaq href={PATH} surface={AR.night} />
      <RelatedPages href={PATH} surface={AR.night} />
      <Contact
        closingBg={`linear-gradient(180deg, ${AR.night} 0%, #110d30 12%, #0a0820 55%, #050505 100%)`}
        glowColor="rgba(255,126,95,0.14)"
        hazeColor="rgba(0,212,255,0.08)"
      />
    </MotionProvider>
  );
}
