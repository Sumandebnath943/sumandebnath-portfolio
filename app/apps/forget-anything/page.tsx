import type { Metadata } from "next";
import Image from "next/image";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import { Reveal, GoldShimmerButton } from "@/components/forget-anything/ForgetAnythingVisuals";
import {
  LiveMonitor,
  LeaveHomeSimulator,
  CoverflowGallery,
  SpotlightDeck,
  EssentialsMarquee,
  TriggerCard,
  WifiBars,
  FlowField,
  FadeIn,
} from "@/components/forget-anything/ForgetAnythingScene";
import { TECH_STACK, AI_ASSISTED_FILES } from "@/components/forget-anything/forget-anything-data";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
export const metadata: Metadata = {
  title: "Forget Anything? — Never Leave Your Essentials Behind",
  description:
    "A privacy-first Android app that catches the moment you leave home — by Wi-Fi or geofence — and hands you your essentials checklist before it's too late. 100% offline. Built with Kotlin & AI.",
  keywords: [
    "Forget Anything app", "departure reminder", "leave home reminder", "WiFi reminder app",
    "geofence reminder", "Android offline app", "privacy first app", "Kotlin foreground service",
    "never forget keys wallet phone", "Suman Debnath",
  ],
  alternates: { canonical: "/apps/forget-anything" },
  icons: {
    icon: [{ url: "/forget-anything-app/app-icon.png", type: "image/png" }],
    shortcut: "/forget-anything-app/app-icon.png",
    apple: "/forget-anything-app/app-icon.png",
  },
  openGraph: {
    type: "website",
    title: "Forget Anything? — Never Leave Your Essentials Behind",
    description: "Privacy-first Android app. Wi-Fi + geofencing catch the moment you leave home. 100% offline. Built with Kotlin & AI.",
    url: `${SITE}/apps/forget-anything`,
    images: [{ url: "/forget-anything-app/Images/hero-wide.png", width: 1915, height: 821 }],
  },
};

/* ── Schema ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org", "@type": "SoftwareApplication",
  name: "Forget Anything?", applicationCategory: "LifestyleApplication",
  operatingSystem: "Android 8.0+",
  description: "Privacy-first departure reminder app using Wi-Fi disconnection & geofencing. 100% offline, on-device only.",
  url: `${SITE}/apps/forget-anything`,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

/* ── icons ──────────────────────────────────────────────────────────────── */
function AndroidIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.6 11.48V19a1 1 0 0 1-1 1h-1.2a1 1 0 0 1-1-1v-1.5H9.6V19a1 1 0 0 1-1 1H7.4a1 1 0 0 1-1-1v-7.52A4.99 4.99 0 0 1 3 7h18a4.99 4.99 0 0 1-3.4 4.48zM6.4 21.5a1.5 1.5 0 0 1-1.5-1.5v-5a1.5 1.5 0 1 1 3 0v5a1.5 1.5 0 0 1-1.5 1.5zm11.2 0a1.5 1.5 0 0 1-1.5-1.5v-5a1.5 1.5 0 1 1 3 0v5a1.5 1.5 0 0 1-1.5 1.5zM8.5 5.5l1-1.7a.2.2 0 0 0-.3-.3l-1.1 1.9A5.15 5.15 0 0 0 7 7h10a5.15 5.15 0 0 0-1.1-1.6l-1.1-1.9a.2.2 0 0 0-.3.3l1 1.7A3.98 3.98 0 0 0 12 4c-1.4 0-2.6.6-3.5 1.5zM10 6a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm4 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z" />
    </svg>
  );
}

/* ── gradient text helpers ──────────────────────────────────────────────── */
const gWhite = { background: "linear-gradient(180deg,#ffffff 0%,rgba(255,255,255,0.5) 100%)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };
const gGold = { background: "linear-gradient(135deg,#BF953F 0%,#FCF6BA 45%,#D4AF37 70%,#AA771C 100%)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };
const gEmerald = { background: "linear-gradient(135deg,#7BE0A0 0%,#2E8B57 100%)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };

// Hosted on GitHub Releases (keeps the 23 MB binary out of the repo).
// Upload the APK to a release tagged `forget-anything-v1` with the asset
// named exactly `forget-anything.apk` and this URL resolves.
const APK = "https://github.com/Sumandebnath943/sumandebnath-portfolio/releases/download/forget-anything-v1/forget-anything.apk";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-dmmono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[#D4AF37]/50">
      <span className="h-px w-6 bg-gradient-to-r from-[#D4AF37]/70 to-transparent" />
      {children}
    </span>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ═════════════════════════════════════════════════════════════════════════ */
export default function ForgetAnythingPage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />

      <style dangerouslySetInnerHTML={{ __html: `
        .fa-grain::before{content:'';position:absolute;inset:0;opacity:0.03;pointer-events:none;z-index:1;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:256px 256px;}
        .fa-hair{box-shadow:inset 0 0 0 1px rgba(212,175,55,0.14),0 50px 130px -40px rgba(80,200,120,0.18),0 0 0 1px rgba(255,255,255,0.03);}
        .fa-card{transition:transform .4s cubic-bezier(.22,1,.36,1),border-color .4s, box-shadow .4s;}
        .fa-card:hover{transform:translateY(-5px);border-color:rgba(80,200,120,0.22);box-shadow:0 30px 70px -30px rgba(80,200,120,0.25);}
      `}} />

      <main className="relative fa-grain" style={{ background: "#040a07" }}>

        {/* ════════════════════════════ HERO ════════════════════════════ */}
        <section className="relative overflow-hidden" style={{ background: "radial-gradient(125% 75% at 50% -5%, #103a28 0%, #0a2418 35%, #061009 70%, #040a07 100%)" }}>
          <FlowField tone="hero" pattern="grid" particles />
          <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 md:pt-32 text-center">
            <Reveal><Kicker>Privacy-first Android app · by Suman Debnath</Kicker></Reveal>

            <Reveal delay={0.06}>
              <h1 className="font-manrope font-extrabold text-[2.7rem] sm:text-[3.7rem] md:text-[4.7rem] leading-[1.0] tracking-[-0.045em] mt-6 mb-6">
                <span style={gWhite}>Walk out</span>{" "}
                <span className="font-serif italic font-normal" style={gGold}>worry-free.</span>
                <br />
                <span style={gWhite}>Your essentials</span>{" "}
                <span className="font-serif italic font-normal" style={gEmerald}>walk with you.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="font-manrope text-[1.02rem] md:text-[1.15rem] text-white/45 leading-relaxed max-w-2xl mx-auto mb-8">
                The app catches the exact moment you leave home — by Wi-Fi or geofence — and
                hands you your checklist before the door clicks shut.
                <span className="text-white/65"> 100% offline. Zero tracking.</span>
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex flex-col items-center gap-3.5">
                <GoldShimmerButton href={APK}><AndroidIcon />Download for Android</GoldShimmerButton>
                <span className="font-manrope text-[11px] tracking-wide text-white/30">Free · ~23 MB · Android 8+ · No ads · No internet permission</span>
              </div>
            </Reveal>

            {/* app-store-style listing badge */}
            <Reveal delay={0.24}>
              <a href={APK} download className="group mt-7 inline-flex items-center gap-3.5 rounded-2xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-xl px-3.5 py-2.5 hover:border-[#D4AF37]/35 hover:bg-white/[0.05] transition-all"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 40px -18px rgba(0,0,0,0.6)" }}>
                <Image src="/forget-anything-app/app-icon.png" alt="Forget Anything? app icon" width={46} height={46} className="rounded-[12px] shadow-[0_4px_14px_rgba(0,0,0,0.5)]" />
                <span className="text-left leading-tight">
                  <span className="block font-manrope text-[13.5px] font-bold text-white/90">Forget Anything?</span>
                  <span className="flex items-center gap-1.5 mt-0.5 font-manrope text-[10.5px] text-white/45">
                    <span className="text-[#D4AF37]">★★★★★</span> Utility · Android 8+
                  </span>
                </span>
                <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-3 py-1.5 font-manrope text-[11px] font-bold uppercase tracking-wide text-[#FCF6BA] group-hover:bg-[#D4AF37]/25 transition-colors">
                  Get
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-y-0.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                </span>
              </a>
            </Reveal>
          </div>

          {/* framed cinematic banner — widgets float in the gutters, off the artwork */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 mt-14 md:mt-16 pb-24 md:pb-28">
            <Reveal delay={0.1} y={40}>
              <div className="relative">
                <div className="hidden md:flex absolute -top-4 -right-3 z-30 items-center gap-2.5 rounded-full border border-white/10 bg-[#081a12]/90 backdrop-blur-xl px-4 py-2" style={{ animation: "fa-bob 6s ease-in-out infinite" }}>
                  <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full" style={{ background: "#50C878", animation: "fa-ping 2.4s ease-out infinite" }} /><span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#50C878" }} /></span>
                  <span className="font-dmmono text-[10px] tracking-[0.16em] uppercase text-white/60">100 m geofence locked</span>
                </div>

                <div className="rounded-[26px] overflow-hidden fa-hair">
                  <Image src="/forget-anything-app/Images/hero-wide.png" alt="Forget Anything? — never leave essentials behind" width={1915} height={821} priority className="hidden sm:block w-full h-auto" />
                  <Image src="/forget-anything-app/Images/1 (4).png" alt="Forget Anything? — never leave essentials behind" width={1413} height={1113} priority className="sm:hidden w-full h-auto" />
                </div>

                <div className="hidden md:block absolute -bottom-9 -left-6 lg:-left-10 z-30" style={{ animation: "fa-bob 7s ease-in-out 1s infinite" }}>
                  <LiveMonitor />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative z-10 border-y border-white/[0.06] bg-black/25">
            <EssentialsMarquee />
          </div>
        </section>


        {/* ════════════ THE MOMENT OF TRUTH — signature simulator ════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg,#040a07,#071711 50%,#040a07)" }}>
          <FlowField tone="emerald" pattern="rings" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
              <Reveal><Kicker>How it actually works</Kicker></Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-6 mb-5">
                  <span style={gWhite}>The instant you cross the door,</span>{" "}
                  <span className="font-serif italic font-normal" style={gGold}>it knows.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-manrope text-[15px] md:text-base text-white/45 leading-relaxed">
                  Drag the dial — your safe zone is yours to size. The app notices when your phone leaves
                  the home Wi-Fi or steps past the geofence, and sends your list right then. No 8 AM alarms. No GPS drain.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} y={30}><LeaveHomeSimulator /></Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { n: "01", t: "You're home", d: "Connected to home Wi-Fi, inside your geofence. The app watches quietly.", c: "#50C878" },
                { n: "02", t: "You step out", d: "Wi-Fi drops or you cross the boundary. A true departure — not a glitch.", c: "#D4AF37" },
                { n: "03", t: "Checklist finds you", d: "Your personalised essentials arrive as a notification. Tap, check, go.", c: "#50C878" },
              ].map((s, i) => (
                <FadeIn key={s.n} delay={i * 0.08}>
                  <div className="fa-card relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full overflow-hidden">
                    <span className="absolute -right-3 -top-4 font-manrope font-black text-[5rem] leading-none" style={{ color: s.c, opacity: 0.07 }}>{s.n}</span>
                    <span className="font-dmmono text-[11px] tracking-[0.2em]" style={{ color: `${s.c}99` }}>{s.n}</span>
                    <h3 className="font-manrope font-semibold text-white/85 mt-2 mb-1.5">{s.t}</h3>
                    <p className="font-manrope text-[13px] text-white/40 leading-relaxed">{s.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>


        {/* ════════════════════════ ORIGIN STORY ════════════════════════ */}
        <section className="relative py-20 md:py-28 overflow-hidden border-t border-white/[0.05]" style={{ background: "linear-gradient(180deg,#040a07,#05100b)" }}>
          <FlowField tone="deep" pattern="contour" />

          {/* quote */}
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center mb-12 md:mb-16">
            <Reveal><Kicker>Why I built it</Kicker></Reveal>
            <Reveal delay={0.06}>
              <blockquote className="mt-6">
                <p className="font-serif italic text-[2rem] md:text-[3rem] leading-[1.25]">
                  <span style={gWhite}>&ldquo;Did you take </span><span style={gGold}>everything</span><span style={gWhite}>?&rdquo;</span>
                </p>
                <span className="font-manrope text-[12px] text-white/30 tracking-wide">— the question no app was asking</span>
              </blockquote>
            </Reveal>
          </div>

          {/* edge-to-edge image — fully visible, never covered */}
          <Reveal delay={0.08} y={30}>
            <div className="relative z-10 w-full">
              <Image src="/forget-anything-app/Images/pain-point-stairs-wide option.png" alt="A watercolour: looking up five flights of stairs after forgetting something at home" width={1915} height={821} className="hidden sm:block w-full h-auto" />
              <Image src="/forget-anything-app/Images/pain-point-stairs.png" alt="A watercolour: looking up the stairwell after forgetting something at home" width={1024} height={1024} className="sm:hidden w-full h-auto" />
              {/* soft top/bottom blend into the page — never over the subject */}
              <div className="absolute inset-x-0 top-0 h-14 pointer-events-none" style={{ background: "linear-gradient(to bottom, #05100b, transparent)" }} />
              <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top, #040a07, transparent)" }} />
            </div>
          </Reveal>

          {/* story — set BELOW the art, in a readable editorial column */}
          <Reveal delay={0.14}>
            <div className="relative z-10 max-w-6xl mx-auto px-6 mt-12 md:mt-16">
              <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-16 items-start">
                <div className="lg:border-l-2 lg:border-[#D4AF37]/30 lg:pl-8">
                  <span className="font-dmmono text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/50">The problem</span>
                  <p className="font-manrope font-bold text-[1.6rem] md:text-[2.1rem] leading-[1.18] tracking-[-0.02em] mt-4" style={gWhite}>
                    Five flights of stairs, for a forgotten phone.
                  </p>
                </div>
                <div className="space-y-5">
                  <p className="font-manrope text-[16px] md:text-[17px] text-white/75 leading-[1.9]">
                    I live on the <strong className="text-white font-semibold">5th floor</strong>, and our lift only runs in the evening. Every forgotten
                    phone meant five flights of stairs — in the morning rush, in the summer heat. When my wife forgot her
                    <span className="text-[#FCF6BA]"> glasses</span>, that climb was mine too.
                  </p>
                  <p className="font-manrope text-[15px] md:text-[16px] text-white/55 leading-[1.9]">
                    I went looking for an app that would ask me <em className="text-white/85 not-italic font-medium">the moment I stepped out</em>. Nothing existed.
                    So I built one — with Kotlin, an Android foreground service, and an <span className="text-[#D4AF37]">AI pair-programmer</span> at every step.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>


        {/* ════════════════ FEATURE SPOTLIGHTS — poster deck ════════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden" style={{ background: "radial-gradient(120% 90% at 50% 0%, #12331f 0%, #0a2014 40%, #040a07 100%)" }}>
          <FlowField tone="mixed" pattern="grid" particles />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-6 md:mb-8 max-w-3xl mx-auto">
              <Reveal><Kicker>A closer look · feature spotlights</Kicker></Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-6">
                  <span style={gWhite}>Every way it has</span>{" "}<span className="font-serif italic font-normal" style={gGold}>your back.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}><SpotlightDeck /></Reveal>
          </div>
        </section>


        {/* ════════════════════ DUAL TRIGGERS ════════════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden border-t border-white/[0.05]">
          <FlowField tone="emerald" pattern="grid" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-14 md:mb-18">
              <Reveal><Kicker>Two ways to know you&apos;ve left</Kicker></Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-6">
                  <span style={gWhite}>Pick your</span>{" "}<span className="font-serif italic font-normal" style={gEmerald}>trigger.</span>
                </h2>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <TriggerCard kind="wifi" title="Wi-Fi Monitoring" desc="The instant your phone disconnects from home Wi-Fi, the reminder fires. No GPS, no battery drain — just a clean signal that you've left." />
              <TriggerCard kind="geofence" title="Geofence Detection" delay={0.08} desc="Cross your home radius — 100 m by default, fully adjustable — and the app knows you're on your way. Perfect when Wi-Fi reaches the street." />
              <TriggerCard kind="both" title="Combined Accuracy" delay={0.16} desc="Require both at once. Wi-Fi drop AND geofence exit before a single nudge — maximum confidence, near-zero false alarms." />
            </div>
          </div>
        </section>


        {/* ════════════════ MODES + RENDER SHOWCASE ════════════════ */}
        <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg,#040a07,#06130d 50%,#040a07)" }}>
          <FlowField tone="gold" pattern="none" />
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <Reveal y={24}>
              <div className="rounded-[24px] overflow-hidden fa-hair mb-12 md:mb-16">
                <Image src="/forget-anything-app/Images/1 (1) Wide option.png" alt="Two phones showing Home and Settings, with feature callouts: 100 m geofence, 2 s Wi-Fi debounce, Burst style" width={1915} height={821} className="w-full h-auto" />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { icon: "📅", grad: "linear-gradient(160deg, rgba(212,175,55,0.14), rgba(212,175,55,0.02))", ring: "rgba(212,175,55,0.25)", title: "Daily Mode", desc: "For the everyday routine — armed quietly in the background with zero battery drain.", chips: ["Keys", "Wallet", "Phone", "Glasses"], accent: "#D4AF37" },
                { icon: "✈️", grad: "linear-gradient(160deg, rgba(80,200,120,0.14), rgba(80,200,120,0.02))", ring: "rgba(80,200,120,0.25)", title: "Trip Mode", desc: "Vacation or business travel? Set a date range and build a custom packing list. One confident reminder.", chips: ["Charger", "Passport", "Adapter", "Meds"], accent: "#50C878" },
              ].map((m, i) => (
                <FadeIn key={m.title} delay={i * 0.08}>
                  <div className="fa-card group relative rounded-[24px] p-8 md:p-10 h-full overflow-hidden" style={{ background: m.grad, border: `1px solid ${m.ring}` }}>
                    <div className="absolute -right-8 -bottom-8 text-[9rem] opacity-[0.06] group-hover:opacity-[0.1] transition-opacity select-none">{m.icon}</div>
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6" style={{ background: "rgba(0,0,0,0.25)", border: `1px solid ${m.ring}` }}>{m.icon}</div>
                      <h3 className="font-manrope font-bold text-xl text-white/90 mb-2.5">{m.title}</h3>
                      <p className="font-manrope text-[14px] text-white/45 leading-relaxed mb-5">{m.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {m.chips.map((c) => (
                          <span key={c} className="font-manrope text-[11px] px-3 py-1.5 rounded-full border" style={{ borderColor: m.ring, color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.2)" }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>


        {/* ════════════════ REAL SCREENS — coverflow ════════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden border-y border-white/[0.05]" style={{ background: "radial-gradient(120% 80% at 50% 50%, #0c2719 0%, #061009 55%, #040a07 100%)" }}>
          <FlowField tone="emerald" pattern="rings" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <Reveal><Kicker>Inside the app · real screens</Kicker></Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-6">
                  <span style={gWhite}>Every screen,</span>{" "}<span className="font-serif italic font-normal" style={gGold}>one purpose.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}><CoverflowGallery /></Reveal>
          </div>
        </section>


        {/* ════════════════ SMARTER-YOU BAND — edge to edge ════════════════ */}
        <section className="relative overflow-hidden">
          <Reveal y={0}>
            <div className="relative">
              <Image src="/forget-anything-app/Images/1 (3) Wide option.png" alt="Smart Reminders for a Smarter You — a hand holding the app's departure reminder" width={1915} height={821} className="hidden sm:block w-full h-auto" />
              <Image src="/forget-anything-app/Images/1 (3).png" alt="Smart Reminders for a Smarter You — the app's departure reminder" width={1402} height={1122} className="sm:hidden w-full h-auto" />
            </div>
          </Reveal>
        </section>


        {/* ════════════════ ALL-SCREENS CINEMATIC ════════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg,#040a07,#06130d 50%,#040a07)" }}>
          <FlowField tone="mixed" pattern="none" particles />
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <Reveal><Kicker>Seven screens · zero clutter</Kicker></Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-manrope font-bold text-[2rem] md:text-[3.2rem] leading-[1.08] tracking-[-0.03em] mt-6 mb-14 md:mb-20">
                <span style={gWhite}>The whole app,</span>{" "}<span className="font-serif italic font-normal" style={gEmerald}>at a glance.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} y={40}>
              <div className="rounded-[24px] overflow-hidden fa-hair" style={{ transform: "perspective(1600px) rotateX(3deg)" }}>
                <Image src="/forget-anything-app/Images/1 (2).png" alt="All seven screens of Forget Anything? — Splash, Home, Mode, Items, Settings, Triggers, Timings" width={1672} height={941} className="w-full h-auto" />
              </div>
            </Reveal>
          </div>
        </section>


        {/* ════════════════ UNDER THE HOOD — maker story ════════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden border-t border-white/[0.05]" style={{ background: "linear-gradient(180deg,#040a07,#080f14 50%,#040a07)" }}>
          <FlowField tone="deep" pattern="contour" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
              <Reveal><Kicker>Under the hood</Kicker></Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-6 mb-5">
                  <span style={gWhite}>Built with Kotlin.</span>{" "}<span className="font-serif italic font-normal" style={gGold}>Forged with AI.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-manrope text-[15px] text-white/45 leading-[1.85]">
                  The UI is React + Vite wrapped in Capacitor. But Android aggressively kills background web-views —
                  so the real work happens in a hand-written <span className="text-white/75">Kotlin foreground service</span> that
                  survives when the app sleeps. Every native file was crafted through AI pair-programming, reviewed line by line.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <Reveal y={20}>
                <div className="rounded-[20px] overflow-hidden fa-hair">
                  <Image src="/forget-anything-app/Images/tech-architecture.png" alt="Architecture: Wi-Fi Monitor Service → Broadcast Receiver → Notification Manager, backed by Room DB and SharedPreferences" width={1024} height={1024} className="w-full h-auto" />
                </div>
              </Reveal>

              <div className="space-y-5">
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TECH_STACK.map((t) => (
                      <div key={t.name} className="fa-card rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                        <div className="flex items-center gap-2 mb-1.5"><span className="w-2 h-2 rounded-full" style={{ background: t.color }} /><span className="font-manrope font-semibold text-[12px] text-white/70">{t.name}</span></div>
                        <p className="font-manrope text-[10.5px] text-white/30 leading-relaxed">{t.description}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.06}>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <span className="font-dmmono text-[9px] uppercase tracking-[0.25em] block mb-3" style={{ color: "rgba(212,175,55,0.45)" }}>AI-assisted native files</span>
                    {AI_ASSISTED_FILES.map((f) => (
                      <div key={f.file} className="flex items-start gap-3 py-2 border-b border-white/[0.04] last:border-0">
                        <span className="font-dmmono text-[11px] whitespace-nowrap mt-0.5" style={{ color: "rgba(212,175,55,0.65)" }}>{f.file}</span>
                        <span className="font-manrope text-[11px] text-white/30 leading-relaxed">{f.purpose}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>


        {/* ════════════════ PERMISSIONS, HONESTLY ════════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden border-t border-white/[0.05]" style={{ background: "linear-gradient(180deg,#040a07,#0a0f08 50%,#040a07)" }}>
          <FlowField tone="gold" pattern="grid" />
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="text-center mb-14 md:mb-18 max-w-2xl mx-auto">
              <Reveal><Kicker>No app store · no dark patterns</Kicker></Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-6 mb-5">
                  <span style={gWhite}>Permissions,</span>{" "}<span className="font-serif italic font-normal" style={gGold}>honestly.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-manrope text-[15px] text-white/45 leading-relaxed">
                  It&apos;s a direct APK, so Android will ask a few things on first run. Here&apos;s exactly what,
                  and why each one is needed — nothing more.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  n: "01", title: "Install from this source", accent: "#D4AF37",
                  body: "Since it isn't on the Play Store, Android asks you to allow the install once. Standard for any sideloaded APK.",
                  icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>),
                },
                {
                  n: "02", title: "Location: “Allow all the time”", accent: "#50C878",
                  body: "Android only lets an app read your home Wi-Fi name and run a geofence with location permission — and background detection needs “always”. It's used purely on-device.",
                  icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#50C878" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>),
                },
                {
                  n: "03", title: "Skip battery optimisation", accent: "#D4AF37",
                  body: "So the Kotlin foreground service keeps watching after you lock the phone. Without it, Android may sleep the app and miss your departure.",
                  icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M6 10v4M9.5 10l-2 4h3l-2 0"/></svg>),
                },
              ].map((s, i) => (
                <FadeIn key={s.n} delay={i * 0.08}>
                  <div className="fa-card relative rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-7 h-full overflow-hidden">
                    <div className="absolute inset-x-0 -top-px h-px" style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`, opacity: 0.5 }} />
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${s.accent}14`, border: `1px solid ${s.accent}33` }}>{s.icon}</div>
                      <span className="font-manrope font-black text-[2.6rem] leading-none" style={{ color: s.accent, opacity: 0.12 }}>{s.n}</span>
                    </div>
                    <h3 className="font-manrope font-semibold text-[15.5px] text-white/90 mb-2.5">{s.title}</h3>
                    <p className="font-manrope text-[13px] text-white/45 leading-relaxed">{s.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-[#50C878]/20 bg-[#50C878]/[0.05] px-6 py-4 text-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#50C878" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                <p className="font-manrope text-[13.5px] text-white/60">
                  That&apos;s the whole list. <span className="text-white/85 font-medium">No account, no internet permission, nothing leaves your phone.</span>
                </p>
              </div>
            </Reveal>
          </div>
        </section>


        {/* ════════════════ PRIVACY + FINAL CTA ════════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden border-t border-white/[0.05]" style={{ background: "radial-gradient(120% 85% at 50% 100%, #12331f 0%, #0a2014 45%, #040a07 100%)" }}>
          <FlowField tone="mixed" pattern="rings" particles />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Reveal><Kicker>Privacy is the whole point</Kicker></Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope font-bold text-[1.9rem] md:text-[2.8rem] leading-[1.1] tracking-[-0.03em] mt-5">
                  <span style={gWhite}>It literally</span>{" "}<span className="font-serif italic font-normal" style={gEmerald}>can&apos;t phone home.</span>
                </h2>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24 md:mb-32">
              {[
                { title: "No Internet Permission", desc: "The app never asks for — and never needs — internet access. It cannot send your data anywhere.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#50C878" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/><path d="M2 12h20"/></svg>), accent: "#50C878" },
                { title: "100% On-Device", desc: "All detection runs locally on your phone. Your essentials list never leaves the device.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M12 18h.01"/></svg>), accent: "#D4AF37" },
                { title: "Zero Data Collection", desc: "No analytics, no tracking, no telemetry. Your routine is yours alone — forever.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#50C878" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>), accent: "#50C878" },
              ].map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.08}>
                  <div className="fa-card group relative rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-8 text-center h-full overflow-hidden">
                    <div className="absolute inset-x-0 -top-px h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`, opacity: 0.5 }} />
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: `${p.accent}14`, border: `1px solid ${p.accent}33`, boxShadow: `0 0 30px -8px ${p.accent}55` }}>{p.icon}</div>
                    <h3 className="font-manrope font-semibold text-[15px] text-white/90 mb-2.5">{p.title}</h3>
                    <p className="font-manrope text-[13px] text-white/40 leading-relaxed">{p.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="text-center">
              <Reveal>
                <div className="inline-flex items-center gap-2 mb-7 rounded-full border border-white/10 bg-black/30 px-4 py-2">
                  <WifiBars size={0.8} /><span className="font-dmmono text-[10px] tracking-[0.18em] uppercase text-white/50">Ready when you are</span>
                </div>
              </Reveal>
              <Reveal delay={0.04}><h2 className="font-manrope font-extrabold text-[2.7rem] md:text-[4.2rem] leading-[1.02] tracking-[-0.04em]"><span style={gWhite}>Stop forgetting.</span></h2></Reveal>
              <Reveal delay={0.08}><h2 className="font-serif italic text-[2.7rem] md:text-[4.2rem] leading-[1.05] mb-8"><span style={gGold}>Start walking out.</span></h2></Reveal>
              <Reveal delay={0.12}><p className="font-manrope text-[15px] text-white/35 leading-relaxed max-w-md mx-auto mb-10">Install the APK, register your home Wi-Fi, and never climb those five flights again.</p></Reveal>
              <Reveal delay={0.16}>
                <div className="flex flex-col items-center gap-4">
                  <GoldShimmerButton href={APK}><AndroidIcon />Download for Android</GoldShimmerButton>
                  <span className="font-manrope text-[11px] tracking-wide text-white/25">Free · ~23 MB · Android 8+ · Sideload the APK</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

      </main>

      {/* white footer with green fonts & accents (this page only) */}
      <Contact variant="light" />
      <Footer />
    </MotionProvider>
  );
}
