import type { Metadata } from "next";
import PageAnswer from "@/components/ui/PageAnswer";
import BannerArt from "@/components/ui/BannerArt";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import PageFaq from "@/components/ui/PageFaq";
import HeroLock from "@/components/ui/HeroLock";
import Contact from "@/components/sections/Contact";
import {
  Reveal,
  FadeIn,
  GridField,
  Aurora,
  Phone,
  HeroStack,
  StickyShowcase,
  ScreenRail,
  ArchiveRail,
  CapabilityLedger,
  PaletteStrip,
  NativeSurfaces,
  NoteCard,
  Stat,
} from "@/components/migi-app/MigiAppVisuals";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
export const metadata: Metadata = {
  title: "MIGI Android App — A Native Control Room for 46 AI Agents",
  description:
    "A standalone native Android client for the MIGI agent fleet, built in Kotlin and Jetpack Compose. 22 screens, instant push without Firebase, on-device voice, a home-screen widget — and zero API keys on the phone.",
  keywords: [
    "MIGI Android app",
    "native Android AI agent app",
    "Kotlin Jetpack Compose app",
    "AI agent control app",
    "Suman Debnath",
    "agent dashboard mobile client",
    "ntfy push notifications Android",
  ],
  alternates: { canonical: "/apps/migi-app" },
  openGraph: {
    type: "website",
    title: "MIGI Android App — A Native Control Room for 46 AI Agents",
    description:
      "Version 2 of the MIGI app: a real native Android client in Kotlin and Compose. 22 screens, instant push, on-device voice, zero API keys.",
    url: `${SITE}/apps/migi-app`,
    images: [{ url: "/migi-app/v2/overview.jpg", width: 1440, height: 3200 }],
  },
};

/* ── Tokens ─────────────────────────────────────────────────────────────── */
const GRAPHITE = "#0A0E0C";
const CREAM = "#F4F3ED";
const LIME = "#C6F24E";
const AQUA = "#35E0FF";

const gWhite = {
  background: "linear-gradient(180deg,#ffffff 0%,rgba(255,255,255,0.55) 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
};
const gLime = {
  background: "linear-gradient(135deg,#E2F97D 0%,#C6F24E 45%,#7FE9C4 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
};

/* `mirror` is the hero's alone. The nine section kickers below it are meant to
   read as a single rule leading into the label; only the hero eyebrow, which is
   centred, needs a rule on both sides to look deliberate. */
function Kicker({ children, tone = "dark", mirror = false }: { children: React.ReactNode; tone?: "dark" | "light" | "ink"; mirror?: boolean }) {
  // Alphas set to clear WCAG AA at 10–11px on each tone's ground; the previous
  // 0.55 / 0.45 left these eyebrows at 3.91:1 and 2.9:1.
  const color = tone === "dark" ? "rgba(198,242,78,0.6)" : tone === "ink" ? "rgba(18,22,26,0.65)" : "rgba(18,22,26,0.6)";
  const rule =
    tone === "dark" ? "linear-gradient(90deg,rgba(198,242,78,0.7),transparent)" : "linear-gradient(90deg,rgba(18,22,26,0.35),transparent)";
  const ruleMirrored =
    tone === "dark" ? "linear-gradient(90deg,transparent,rgba(198,242,78,0.7))" : "linear-gradient(90deg,transparent,rgba(18,22,26,0.35))";
  return (
    <span className="font-dmmono inline-flex items-center gap-2.5 text-[10px] uppercase tracking-[0.32em] md:text-[11px]" style={{ color }}>
      <span className="h-px w-7" style={{ background: rule }} />
      {children}
      {mirror && <span className="h-px w-7" style={{ background: ruleMirrored }} />}
    </span>
  );
}

/* ── Content ────────────────────────────────────────────────────────────── */
const V1_SHOTS = [
  { src: "/migi-app/images/loading.jpg", alt: "Version 1 launch screen", label: "Launch" },
  { src: "/migi-app/images/dashboard.jpg", alt: "Version 1 dashboard", label: "Dashboard" },
  { src: "/migi-app/images/agents.jpg", alt: "Version 1 agent list", label: "Agents" },
  { src: "/migi-app/images/Active-session-control-section.jpg", alt: "Version 1 active session control", label: "Session" },
  { src: "/migi-app/images/MIGI-MAS-loading.jpg", alt: "Version 1 MAS loading", label: "MAS boot" },
  { src: "/migi-app/images/MIGI-MAS.jpg", alt: "Version 1 MAS", label: "MAS" },
  { src: "/migi-app/images/MIGI-ECHO-loading.jpg", alt: "Version 1 ECHO loading", label: "ECHO boot" },
  { src: "/migi-app/images/MIGI-ECHO.jpg", alt: "Version 1 ECHO", label: "ECHO" },
  { src: "/migi-app/images/Finance-agent.jpg", alt: "Version 1 finance agent", label: "Finance" },
  { src: "/migi-app/images/Health-analysis-agent.jpg", alt: "Version 1 health agent", label: "Health" },
  { src: "/migi-app/images/Jobs-agent.jpg", alt: "Version 1 jobs agent", label: "Jobs" },
  { src: "/migi-app/images/Jobs-agent-job-lists.jpg", alt: "Version 1 job list", label: "Job list" },
  { src: "/migi-app/images/Data-tracking-agent.jpg", alt: "Version 1 data tracking agent", label: "Data" },
  { src: "/migi-app/images/Outreach-agent.jpg", alt: "Version 1 outreach agent", label: "Outreach" },
  { src: "/migi-app/images/Build-suggestion-agent.jpg", alt: "Version 1 build suggestion agent", label: "Build" },
  { src: "/migi-app/images/Skills-suggestions-agent.jpg", alt: "Version 1 skills agent", label: "Skills" },
  { src: "/migi-app/images/Web-watch-alert-agent.jpg", alt: "Version 1 web watch agent", label: "Watch" },
  { src: "/migi-app/images/team-manager-agent.jpg", alt: "Version 1 team manager agent", label: "Team" },
  { src: "/migi-app/images/Launch-agent.jpg", alt: "Version 1 launch agent", label: "Launch ops" },
  { src: "/migi-app/images/LLMs.jpg", alt: "Version 1 model routing", label: "Routing" },
];

const LEDGER = [
  {
    capability: "Voice input",
    why: "The dashboard sends a permissions policy that blocks microphone access in any browser context — a WebView included.",
  },
  {
    capability: "Push notifications",
    why: "No web page can hold a background connection once it is closed. Alerts had to arrive through Telegram instead.",
  },
  {
    capability: "Home-screen widget",
    why: "Widgets are drawn by a native process. A page in a box cannot put fleet health on the launcher.",
  },
  {
    capability: "Share target & quick tile",
    why: "Android intent surfaces. Unreachable from web, so nothing could be captured from another app.",
  },
  {
    capability: "Instant cold start",
    why: "A wrapper refetches and relayouts on every open. Nothing is on disk to paint from.",
  },
];

const FEATURES = [
  {
    src: "/migi-app/v2/overview.jpg",
    alt: "MIGI Android overview screen showing fleet health",
    kicker: "Overview · Agents",
    title: "The whole fleet, at a glance.",
    body: "Every screen opens with one hero figure — the number that screen exists to answer. Overview answers “is anything broken right now?” before you have finished unlocking the phone.",
    points: [
      "46 agents grouped by category, each with a run-history strip",
      "Needs-attention list capped at eight, failures sorted first",
      "One-tap dispatch on any agent, straight from the list",
      "Search across the whole roster, schedules and last-run times inline",
    ],
  },
  {
    src: "/migi-app/v2/jobs.jpg",
    alt: "MIGI Android jobs screen with fit meters",
    kicker: "Jobs",
    title: "Roles, already scored.",
    body: "The job agents run overnight and score every new role against the CV. The app is where that queue gets triaged — usually in under a minute, standing up.",
    points: [
      "Circular fit meter, match reasoning and the specific gaps",
      "Swipe to dismiss, long-press to multi-select",
      "Bulk status changes sent as a single request",
      "Application packet and drafted cover letter per role",
    ],
  },
  {
    src: "/migi-app/v2/echo.jpg",
    alt: "MIGI ECHO conversational knowledge screen",
    kicker: "ECHO · on-device voice",
    title: "Talk to your own knowledge.",
    body: "ECHO is the retrieval layer over everything the fleet has read and written. On the phone it gained the one feature the web version can never have: speech.",
    points: [
      "Recognition runs on-device — only the transcript is ever sent",
      "The backend needed no change at all to support it",
      "Teach it a note, a URL or a repo from inside the app",
      "Forget by source, so a bad import can be undone cleanly",
    ],
  },
  {
    src: "/migi-app/v2/mas.jpg",
    alt: "MIGI MAS mission launcher screen",
    kicker: "MAS",
    title: "Missions, not prompts.",
    body: "The multi-agent orchestrator, launchable from the command deck. Manual-only by design: agents plan and delegate, every action waits for approval.",
    points: [
      "Fleet triage, market scan, warroom, content, operator, memo",
      "The full plan and per-action trace, live as it runs",
      "Also bound to the quick-settings tile — read-only triage",
      "A mis-tapped tile costs nothing, which is why it is read-only",
    ],
  },
];

const SCREENS = [
  { src: "/migi-app/v2/lock.jpg", alt: "MIGI locked screen", label: "App lock", note: "Biometric gate before anything renders" },
  { src: "/migi-app/v2/overview.jpg", alt: "MIGI overview", label: "Overview", note: "Fleet health and what needs attention" },
  { src: "/migi-app/v2/agents.jpg", alt: "MIGI agents", label: "Agents", note: "46 agents, grouped, with history strips" },
  { src: "/migi-app/v2/jobs.jpg", alt: "MIGI jobs", label: "Jobs", note: "Scored roles with fit meters and triage" },
  { src: "/migi-app/v2/more.jpg", alt: "MIGI more sheet", label: "More", note: "Every other destination, one sheet" },
  { src: "/migi-app/v2/team.jpg", alt: "MIGI team observability", label: "Team", note: "LLM calls, spend and rate limits" },
  { src: "/migi-app/v2/free-tier.jpg", alt: "MIGI free tier", label: "Free tier", note: "Provider closest to its ceiling, first" },
  { src: "/migi-app/v2/supabase.jpg", alt: "MIGI database health", label: "Databases", note: "Reachability probes across projects" },
  { src: "/migi-app/v2/brand.jpg", alt: "MIGI brand health", label: "Brand", note: "Performance, SEO and the weakest property" },
  { src: "/migi-app/v2/responses.jpg", alt: "MIGI agent responses", label: "Responses", note: "What the agents actually sent" },
  { src: "/migi-app/v2/linkedin.jpg", alt: "MIGI LinkedIn drafts", label: "LinkedIn", note: "Draft-only — nothing auto-posts" },
  { src: "/migi-app/v2/finance.jpg", alt: "MIGI finance", label: "Finance", note: "Budgets, trend and quick capture" },
  { src: "/migi-app/v2/build.jpg", alt: "MIGI build compass", label: "Build", note: "Scored ideas the compass picked up" },
  { src: "/migi-app/v2/outreach.jpg", alt: "MIGI outreach", label: "Outreach", note: "Leads with intros already drafted" },
  { src: "/migi-app/v2/skills.jpg", alt: "MIGI skills gaps", label: "Skills", note: "Gaps found in the roles you matched" },
  { src: "/migi-app/v2/launch.jpg", alt: "MIGI launch", label: "Launch", note: "Repos tracked, launch post in one tap" },
  { src: "/migi-app/v2/data.jpg", alt: "MIGI data", label: "Data", note: "Ideas, reading, habits and journal" },
  { src: "/migi-app/v2/health.jpg", alt: "MIGI health", label: "Health", note: "Sleep, mood and weekday patterns" },
  { src: "/migi-app/v2/resume.jpg", alt: "MIGI resume review", label: "Resume", note: "ATS score history, upload a new CV" },
  { src: "/migi-app/v2/echo.jpg", alt: "MIGI ECHO", label: "ECHO", note: "Ask, or tap the mic" },
  { src: "/migi-app/v2/mas.jpg", alt: "MIGI MAS", label: "MAS", note: "Mission launcher and command deck" },
  { src: "/migi-app/v2/devices.jpg", alt: "MIGI devices", label: "Devices", note: "This phone badged, panic switch below" },
  { src: "/migi-app/v2/account.jpg", alt: "MIGI account", label: "Account", note: "Exactly what this app can reach" },
  { src: "/migi-app/v2/settings.jpg", alt: "MIGI settings", label: "Settings", note: "App lock, refresh interval, push" },
];

const PALETTE = [
  { hex: "#0C100E", name: "Bg", role: "Graphite with a green bias — never pure black" },
  { hex: "#111613", name: "Card", role: "Raised surface, one step up from ground" },
  { hex: LIME, name: "Lime", role: "The brand. Roughly a fifth of any screen" },
  { hex: AQUA, name: "Aqua", role: "Second accent, inherited from ECHO" },
  { hex: "#6FD37A", name: "Ok", role: "Healthy — deliberately off the brand ramp" },
  { hex: "#FF6B54", name: "Bad", role: "Failing. The only colour that interrupts" },
];

const STACK = [
  "Kotlin",
  "Jetpack Compose",
  "Material 3",
  "Navigation Compose",
  "Glance widgets",
  "OkHttp",
  "kotlinx.serialization",
  "EncryptedSharedPreferences",
  "BiometricPrompt",
  "SpeechRecognizer",
  "ntfy",
  "Coroutines + Flow",
];

const ico = (d: string) => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function MigiAppPage() {
  return (
    <MotionProvider>
      <Navigation />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes mg-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes mg-drift{0%{background-position:0 0}100%{background-position:0 -1200px}}
        .mg-grain::before{content:'';position:absolute;inset:0;opacity:0.035;pointer-events:none;z-index:1;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:220px 220px;}
        .mg-rail{scrollbar-width:none;-ms-overflow-style:none;}
        .mg-rail::-webkit-scrollbar{display:none;}
        .mg-ink-card{border:1px solid rgba(255,255,255,0.07);transition:transform .45s cubic-bezier(.22,1,.36,1),border-color .45s,box-shadow .45s;}
        .mg-ink-card:hover{transform:translateY(-6px);border-color:rgba(198,242,78,0.28);box-shadow:0 30px 60px -30px rgba(0,0,0,0.7);}
        .mg-note{transition:transform .45s cubic-bezier(.22,1,.36,1),box-shadow .45s;}
        .mg-note:hover{transform:translateY(-4px);box-shadow:0 26px 50px -28px rgba(18,22,26,0.35);}
        .mg-chip{transition:border-color .3s,color .3s,background .3s;}
        .mg-chip:hover{border-color:rgba(198,242,78,0.4);color:#fff;background:rgba(198,242,78,0.07);}
      `,
        }}
      />

      <main className="relative" style={{ background: GRAPHITE }}>
        {/* ══════════════════════ HERO ══════════════════════ */}
        <section
          className="mg-grain relative overflow-hidden sd-banner-host"
          style={{ background: "radial-gradient(130% 80% at 50% -10%, #16210E 0%, #0D140C 38%, #090D0B 72%, #0A0E0C 100%)" }}
        >
          <BannerArt seed="/apps/migi-app" accent="#C6F24E" />
          <HeroLock />
          <Aurora />
          <GridField tone="dark" />

          <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 text-center md:pt-36">
            <Reveal>
              <Kicker mirror>Version 2 · Standalone Native Android</Kicker>
            </Reveal>

            <Reveal delay={0.06}>
              <Breadcrumbs
                trail={[
                  { label: "Apps", href: null },
                  { label: "MIGI Android App", href: "/apps/migi-app" },
                ]}
                align="center"
                className="mt-5 mb-6"
              />
              <h1 className="font-manrope mb-6 mt-6 text-[2.8rem] font-extrabold leading-[0.98] tracking-[-0.05em] sm:text-[3.9rem] md:text-[5rem]">
                <span style={gWhite}>Not a wrapper.</span>
                <br />
                <span className="font-serif font-normal italic" style={gLime}>
                  A control room.
                </span>
              </h1>

              <PageAnswer href="/apps/migi-app" />
            </Reveal>

            <Reveal delay={0.12}>
              <p className="font-manrope mx-auto mb-9 max-w-2xl text-[1.02rem] leading-relaxed text-white/45 md:text-[1.14rem]">
                MIGI is 46 autonomous agents running on schedules — triaging roles, watching sites, reconciling spend, drafting
                posts. Version 2 is a real native Android client for all of it:{" "}
                <span className="text-white/70">22 screens drawn in Compose, instant push, on-device voice</span> — and not a
                single API key on the phone.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mb-9 flex flex-wrap items-center justify-center gap-2.5">
                {["Kotlin + Compose", "22 native screens", "0 API keys in the APK", "~15 MB"].map((c) => (
                  <span
                    key={c}
                    className="font-dmmono rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[10.5px] uppercase tracking-[0.14em] text-white/50"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="flex flex-col items-center gap-3.5">
                <div className="inline-flex items-center gap-3 rounded-full border border-[#C6F24E]/20 bg-[#C6F24E]/[0.05] px-6 py-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C6F24E] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#C6F24E]" />
                  </span>
                  <span className="font-dmmono text-[11px] uppercase tracking-widest text-[#C6F24E]">Private build · in daily use</span>
                </div>
                <span className="font-manrope max-w-xs text-center text-[11px] leading-relaxed tracking-wide text-white/45">
                  Tightly coupled to a private agent server and gated behind two factors. Not distributed publicly.
                </span>
              </div>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/agents/migi"
                  className="inline-flex items-center gap-2 border-b border-white/10 pb-0.5 text-[13px] font-medium text-white/50 transition-colors hover:border-white/30 hover:text-white"
                >
                  See the MIGI agent fleet
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* `pt-4` is headroom for the bob, not spacing: this box is
              `overflow-hidden` (it crops the rotated side phones on purpose),
              and `mg-bob` lifts the centre phone translateY(-14px), which took
              its top edge past the crop. The margin is reduced by exactly the
              padding added — 12+4 = the old 16, 20+4 = the old 24 — so the
              stack does not move. */}
          <div className="relative z-10 mt-12 w-full overflow-hidden px-6 pt-4 pb-24 md:mt-20">
            <HeroStack
              left={{ src: "/migi-app/v2/agents.jpg", alt: "MIGI agents screen" }}
              center={{ src: "/migi-app/v2/overview.jpg", alt: "MIGI overview screen" }}
              right={{ src: "/migi-app/v2/echo.jpg", alt: "MIGI ECHO screen" }}
            />
          </div>
        </section>

        {/* ══════════════════════ STAT BAND ══════════════════════ */}
        <section className="relative overflow-hidden px-6 py-16 md:py-20" style={{ background: `linear-gradient(180deg,${LIME},#A9D62E)` }}>
          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
            <Stat value="46" label="Agents" sub="in the fleet" />
            <Stat value="22" label="Screens" sub="drawn natively" />
            <Stat value="20+" label="API routes" sub="consumed" />
            <Stat value="0" label="API keys" sub="inside the APK" />
            <Stat value="1" label="Backend file" sub="changed, total" />
            <Stat value="~15" label="MB" sub="release APK" />
          </div>
        </section>

        {/* ══════════════════════ VERSION ONE ══════════════════════ */}
        <section id="version-one" className="relative overflow-hidden px-6 py-24 md:py-32 scroll-mt-20" style={{ background: CREAM }}>
          <GridField tone="light" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
              <div>
                <Reveal>
                  <Kicker tone="ink">Version 1 · 2026 · The WebView wrapper</Kicker>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="font-manrope mt-6 text-[2.1rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#12161A] md:text-[3.4rem]">
                    A wrapper is a{" "}
                    <span className="font-serif font-normal italic text-[#12161A]/60">bookmark.</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="font-manrope mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#12161A]/60 md:text-base">
                    <p>
                      The first MIGI app did one honest job. It wrapped the mobile view of the agent dashboard in a WebView, put a
                      biometric prompt in front of it, persisted the session for seven days so the passphrase and 2FA code were not
                      needed on every open, and hid the browser chrome edge-to-edge.
                    </p>
                    <p>
                      It worked. It removed the real friction — opening a tab and logging in just to check whether anything had
                      failed overnight. Two of the three phases that got there were spent making the dashboard itself genuinely
                      responsive on a phone, which the app still benefits from today.
                    </p>
                    <p className="text-[#12161A]/80">
                      But it rendered the dashboard&rsquo;s own HTML. That is the ceiling. A wrapper can never do anything a browser
                      tab could not already do — and the things worth having on a phone were all on the other side of that line.
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.16}>
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    <span className="font-dmmono absolute -left-3 -top-3 z-10 rounded-full bg-[#12161A] px-3 py-1 text-[9.5px] uppercase tracking-[0.2em] text-[#F4F3ED]">
                      v1
                    </span>
                    <Phone src="/migi-app/images/dashboard.jpg" alt="Version 1 wrapper dashboard" className="w-[240px]" tone="light" />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* archive sheet */}
            <div className="mt-20 md:mt-24">
              <Reveal>
                <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-[#12161A]/10 pb-4">
                  <div>
                    <h3 className="font-manrope text-[1.15rem] font-bold tracking-[-0.02em] text-[#12161A] md:text-[1.35rem]">
                      The version 1 archive
                    </h3>
                    <p className="font-manrope mt-1 text-[13.5px] text-[#12161A]/60">
                      All twenty screens of the wrapper, kept for the record. Scroll the strip, tap any to enlarge.
                    </p>
                  </div>
                  <span className="font-dmmono text-[10px] uppercase tracking-[0.24em] text-[#12161A]/60">20 screens · superseded</span>
                </div>
              </Reveal>
              <ArchiveRail shots={V1_SHOTS} ground={CREAM} />
            </div>

            {/* ledger */}
            <div className="mt-20 md:mt-24">
              <Reveal>
                <div className="mb-7 max-w-2xl">
                  <Kicker tone="ink">Why it had to be rebuilt</Kicker>
                  <h3 className="font-manrope mt-5 text-[1.6rem] font-bold leading-tight tracking-[-0.025em] text-[#12161A] md:text-[2.2rem]">
                    Five things a wrapper structurally cannot do.
                  </h3>
                  <p className="font-manrope mt-3 text-[14.5px] leading-relaxed text-[#12161A]/60">
                    None of these are polish. Each one is blocked by the platform, not by effort — which is what made a rewrite the
                    only honest option.
                  </p>
                </div>
              </Reveal>
              <CapabilityLedger rows={LEDGER} />
            </div>
          </div>
        </section>

        {/* ══════════════════════ THE REBUILD ══════════════════════ */}
        <section
          className="mg-grain relative overflow-hidden px-6 py-24 md:py-32"
          style={{ background: "radial-gradient(120% 80% at 50% 0%, #131B10 0%, #0B100D 42%, #0A0E0C 100%)" }}
        >
          <GridField tone="dark" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
              <Reveal>
                <Kicker>Version 2 · The rebuild</Kicker>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope mt-6 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.035em] md:text-[3.4rem]">
                  <span style={gWhite}>Rebuilt from the</span>{" "}
                  <span className="font-serif font-normal italic" style={gLime}>
                    API up.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-manrope mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/45">
                  Version 2 does not render the dashboard. It calls the dashboard&rsquo;s JSON API and draws every screen itself in
                  Jetpack Compose — which is what buys voice, push, widgets and instant cold starts. The dark palette is a
                  deliberate divergence from the web dashboard&rsquo;s cream: a phone checked at 1 a.m. has different needs from a
                  monitor in daylight.
                </p>
              </Reveal>
            </div>

            <div className="mb-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  t: "Graphite, not black",
                  b: "Lime on pure black vibrates. On a ground from the same colour family it sits properly, which is why the page background carries a green bias.",
                },
                {
                  t: "Two accents, not one",
                  b: "A single accent on a dark ground reads cheap. Aqua already existed in ECHO’s identity, so the second register is grounded in the brand rather than invented.",
                },
                {
                  t: "Lime carries a fifth",
                  b: "Reserved for four jobs only: the hero statistic, the primary action, the active nav indicator, and positive quantities. Anything more and it stops being a signal.",
                },
                {
                  t: "Status hues off the ramp",
                  b: "Healthy, running and failing sit outside the brand ramp on purpose — otherwise “healthy” starts competing with “this is a button”.",
                },
                {
                  t: "Density over decoration",
                  b: "The first pass was one card per record: a column of identical slabs where a failing agent looked exactly like a healthy one. Grouped rows gave roughly four times the density.",
                },
                {
                  t: "Monospace for figures",
                  b: "Labels, numbers and timestamps are monospaced — the native vernacular of agent tooling, and it ships with the platform so no webfont can silently fail.",
                },
              ].map((p, i) => (
                <Reveal key={p.t} delay={i * 0.05}>
                  <div className="mg-ink-card h-full rounded-3xl bg-white/[0.02] p-7">
                    <h4 className="font-manrope text-[16px] font-bold text-white/90">{p.t}</h4>
                    <p className="font-manrope mt-2.5 text-[13.5px] leading-relaxed text-white/45">{p.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="font-dmmono mb-5 text-[10px] uppercase tracking-[0.3em] text-white/50">The tokens</p>
            </Reveal>
            <PaletteStrip tokens={PALETTE} />
          </div>
        </section>

        {/* ══════════════════════ STICKY SHOWCASE ══════════════════════ */}
        {/* NB: no `overflow-hidden` on this section — an ancestor with overflow:hidden
            silently disables `position: sticky` for the pinned phone column below. */}
        <section className="relative py-24 md:py-28" style={{ background: "linear-gradient(180deg,#0A0E0C,#0C1310 40%,#0A0E0C)" }}>
          <div className="relative z-10 mx-auto mb-8 max-w-3xl px-6 text-center md:mb-4">
            <Reveal>
              <Kicker>Inside the app</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-manrope mt-6 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.035em] md:text-[3.2rem]">
                <span style={gWhite}>Four screens that earn</span>
                <br />
                <span className="font-serif font-normal italic" style={gLime}>
                  the rewrite.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="relative z-10">
            <StickyShowcase features={FEATURES} />
          </div>
        </section>

        {/* ══════════════════════ EVERY SCREEN ══════════════════════ */}
        <section
          className="mg-grain relative overflow-hidden py-24 md:py-32"
          style={{ background: "radial-gradient(120% 80% at 50% 0%, #101810 0%, #0A0E0C 45%, #0A0E0C 100%)" }}
        >
          <GridField tone="dark" />
          <div className="relative z-10">
            <div className="mx-auto mb-14 max-w-3xl px-6 text-center md:mb-16">
              <Reveal>
                <Kicker>The full tour</Kicker>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope mt-6 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.035em] md:text-[3.2rem]">
                  <span style={gWhite}>Twenty-two destinations.</span>
                  <br />
                  <span className="font-serif font-normal italic" style={gLime}>
                    Four in the bottom bar.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-manrope mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/45">
                  Overview, Agents, Jobs and More carry the navigation. Everything else lives in a single sheet of lime-washed
                  tiles, one tap from anywhere — because a five-tab bar with a hamburger is how apps stop being usable one-handed.
                </p>
              </Reveal>
            </div>

            <ScreenRail screens={SCREENS} />
          </div>
        </section>

        {/* ══════════════════════ NATIVE SURFACES ══════════════════════ */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32" style={{ background: `linear-gradient(180deg,${LIME},#A9D62E)` }}>
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-14 max-w-3xl md:mb-16">
              <Reveal>
                <Kicker tone="ink">Beyond the screens</Kicker>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope mt-6 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.035em] text-[#12161A] md:text-[3.4rem]">
                  The parts that only exist{" "}
                  <span className="font-serif font-normal italic text-[#12161A]/60">because it&rsquo;s native.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-manrope mt-5 max-w-2xl text-[15px] leading-relaxed text-[#12161A]/65">
                  Six surfaces that live outside the app itself — on the lock screen, the launcher, the settings shade and the share
                  sheet. This is the actual difference between an app and a page in a box.
                </p>
              </Reveal>
            </div>

            <NativeSurfaces
              items={[
                {
                  icon: ico("M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"),
                  title: "Push, without Firebase",
                  body: "All 46 agents already funnel every message through one file to reach Telegram. One HTTP POST added there covers the entire fleet — no Firebase project, no service account, no token registry.",
                },
                {
                  icon: ico("M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"),
                  title: "Home-screen widget",
                  body: "Fleet health on the launcher, built with Glance. It reads the app’s own disk cache rather than the API, because a widget has no session and duplicating auth would put the token in a second place.",
                },
                {
                  icon: ico("M12 2v6M12 16v6M2 12h6M16 12h6M6.3 6.3l4.2 4.2M13.5 13.5l4.2 4.2"),
                  title: "Quick-settings tile",
                  body: "One swipe from anywhere starts a read-only fleet triage. Read-only deliberately: a tile that dispatched real work would be a hazard one accidental tap away.",
                },
                {
                  icon: ico("M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v14"),
                  title: "Share target",
                  body: "Share a link from any app and pick a destination: read later, watch later, save as an idea, or teach the knowledge base. It files and finishes without ever opening the app or asking for an unlock.",
                },
                {
                  icon: ico("M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3"),
                  title: "On-device voice",
                  body: "Speech recognition runs on the phone and only the transcript is sent, as an ordinary question. The backend needed no change — and the web version cannot do this at all.",
                },
                {
                  icon: ico("M21 12a9 9 0 1 1-6.2-8.6M21 3v6h-6"),
                  title: "Offline-first",
                  body: "Every response is cached to disk, so a cold start paints last-known state immediately and refreshes underneath. A failed refresh keeps the cached content instead of blanking the screen.",
                },
              ]}
            />
          </div>
        </section>

        {/* ══════════════════════ ENGINEERING NOTES ══════════════════════ */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32" style={{ background: CREAM }}>
          <GridField tone="light" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-14 max-w-3xl md:mb-16">
              <Reveal>
                <Kicker tone="ink">Engineering notes</Kicker>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope mt-6 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.035em] text-[#12161A] md:text-[3.4rem]">
                  Four problems worth{" "}
                  <span className="font-serif font-normal italic text-[#12161A]/60">writing down.</span>
                </h2>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <Reveal>
                <NoteCard
                  index="01"
                  title="Authentication without a single new endpoint"
                  pull="The interesting engineering was reading someone else’s auth carefully enough to discover the feature already existed."
                >
                  <p>
                    The obvious path was to add a device-token API to the dashboard. Reading the existing code showed it was
                    unnecessary.
                  </p>
                  <p>
                    The app signs in through the login route that was already there — passphrase plus a TOTP code — and keeps the
                    returned session token in <code className="font-dmmono text-[12.5px]">EncryptedSharedPreferences</code> behind
                    a keystore key. The passphrase and the code are never stored.
                  </p>
                  <p>
                    Because that session is a row in the database like any other, the phone appears in the dashboard&rsquo;s own
                    Devices screen and can be revoked from either side. Nothing new to protect, and no second credential path to
                    keep in sync.
                  </p>
                </NoteCard>
              </Reveal>

              <Reveal delay={0.08}>
                <NoteCard
                  index="02"
                  title="Push for 46 agents, in one file"
                  pull="The best backend change is the one you don’t make."
                >
                  <p>
                    Firebase is the default answer, and it wanted a project, a service-account key, a token-registration endpoint
                    and a sender — two repositories and a new external dependency, for one phone.
                  </p>
                  <p>
                    The fleet had a property that changed the arithmetic: every agent already routes its messages through a single
                    notification helper. One HTTP POST added there covers all 46. The transport is ntfy — publish to a topic,
                    subscribe from the phone.
                  </p>
                  <p>
                    A central classifier then tiers every message: failures arrive loudly, approvals quietly, routine digests
                    silently. Individual agents know nothing about priority, so uptime checks are silent while everything is healthy
                    and loud the moment a site goes down.
                  </p>
                </NoteCard>
              </Reveal>

              <Reveal delay={0.04}>
                <NoteCard index="03" title="Six identical bugs, and the lesson underneath" pull="One line, six symptoms. Fix the class, not the instance.">
                  <p>
                    Six screens shipped rendering zeros. Each looked correct in source. Every one was a guessed JSON key —{" "}
                    <code className="font-dmmono text-[12.5px]">skills</code> instead of{" "}
                    <code className="font-dmmono text-[12.5px]">items</code>,{" "}
                    <code className="font-dmmono text-[12.5px]">ideas</code> instead of{" "}
                    <code className="font-dmmono text-[12.5px]">projects</code>.
                  </p>
                  <p>
                    The failure was not the guessing. It was fixing instances rather than the class: each was corrected as it was
                    reported, and the next appeared a day later.
                  </p>
                  <p>
                    The actual fix was an audit — extract every field the app reads, diff it against every route&rsquo;s selected
                    columns, in one pass. It found two more bugs in code already believed correct. The same shape had appeared in
                    the design system, where one colour token meant for text on lime, used as a general text colour, made figures
                    invisible on six screens at once.
                  </p>
                </NoteCard>
              </Reveal>

              <Reveal delay={0.12}>
                <NoteCard
                  index="04"
                  title="Adding to a codebase you rely on daily"
                  pull="The goal is not “it works” — it is “I can prove nothing else changed”."
                >
                  <p>
                    The backend was treated as read-only throughout. When two capabilities genuinely needed server support —
                    capturing shared links, and deleting from the knowledge base — they were added as new files only, in new
                    directories, with the diff against the previous commit verified empty before pushing.
                  </p>
                  <p>No existing route changed by a single line.</p>
                  <p>
                    Every change to a locked repository is recorded with its commit hash, a revert command, and a note on what the
                    fleet does without it. The push integration also has a kill switch that needs no code change at all: remove one
                    environment secret and the new code returns on its first line.
                  </p>
                </NoteCard>
              </Reveal>
            </div>

            {/* honest postscript */}
            <Reveal delay={0.1}>
              <div className="mt-6 rounded-3xl border border-[#12161A]/10 bg-[#12161A] p-8 md:p-10">
                <span className="font-dmmono text-[10px] uppercase tracking-[0.3em]" style={{ color: LIME }}>
                  Postscript · what to be honest about
                </span>
                <p className="font-manrope mt-4 max-w-3xl text-[15px] leading-relaxed text-[#F4F3ED]/65 md:text-base">
                  The first two versions were poor. The wrapper was a bookmark, and the initial native build was structurally sound
                  but visually inert — a single column of identical cards with no hierarchy at all. It took a research pass and a
                  blunt round of feedback to establish that the problem was{" "}
                  <span className="text-[#F4F3ED]">information design, not colour</span>. That is a better story than a straight
                  line, and it has the advantage of being true.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════ SECURITY ══════════════════════ */}
        <section
          className="mg-grain relative overflow-hidden px-6 py-24 md:py-32"
          style={{ background: "radial-gradient(110% 80% at 50% 0%, #0F1613 0%, #0A0E0C 50%, #0A0E0C 100%)" }}
        >
          <GridField tone="dark" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <Reveal>
                  <Kicker>Security model</Kicker>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="font-manrope mb-6 mt-6 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.035em] md:text-[3.2rem]">
                    <span style={gWhite}>Losing the phone</span>
                    <br />
                    <span className="font-serif font-normal italic" style={gLime}>
                      loses nothing.
                    </span>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="font-manrope mb-9 text-[15px] leading-relaxed text-white/45">
                    The app carries no secrets of its own. Everything it can do, it does through a session that can be ended from
                    either side — and the Account screen states in plain language exactly what it can read, what it can write, and
                    what it can never touch.
                  </p>
                </Reveal>

                <div className="space-y-5">
                  {[
                    {
                      t: "No keys, no credentials",
                      b: "Zero API keys in the APK. The passphrase and TOTP code are never written to the device — only the session token, encrypted behind a keystore key.",
                    },
                    {
                      t: "Biometric app lock",
                      b: "Fingerprint or screen lock required each time the app opens, so an unlocked phone in someone else’s hand still reaches nothing.",
                    },
                    {
                      t: "Revocable from anywhere",
                      b: "The phone is one row in the sessions table. Revoke it from the app, from the web dashboard, or hit the panic switch and end every session everywhere at once.",
                    },
                    {
                      t: "A ceiling it cannot raise",
                      b: "The app cannot change the passphrase, the TOTP secret, or any dashboard setting. Its reach is bounded by the session it holds, and nothing more.",
                    },
                  ].map((s, i) => (
                    <FadeIn key={s.t} delay={i * 0.08}>
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C6F24E]/20 bg-[#C6F24E]/10">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-manrope text-[15.5px] font-bold text-white/90">{s.t}</h4>
                          <p className="font-manrope mt-1.5 text-[13.5px] leading-relaxed text-white/45">{s.b}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-center gap-3.5 sm:gap-5 lg:justify-end">
                <Reveal delay={0.1}>
                  <Phone src="/migi-app/v2/lock.jpg" alt="MIGI biometric lock screen" className="w-[142px] sm:w-[180px] md:w-[215px]" />
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="translate-y-8">
                    <Phone
                      src="/migi-app/v2/devices.jpg"
                      alt="MIGI devices and panic switch"
                      className="w-[142px] sm:w-[180px] md:w-[215px]"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ STACK ══════════════════════ */}
        <section className="relative overflow-hidden border-t border-white/[0.05] px-6 py-20 md:py-24">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Reveal>
              <Kicker>Built with</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                {STACK.map((s) => (
                  <span
                    key={s}
                    className="mg-chip font-dmmono rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11.5px] tracking-wide text-white/45"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="font-manrope mx-auto mt-8 max-w-xl text-[13.5px] leading-relaxed text-white/45">
                Talking to a Next.js dashboard on Vercel, backed by Supabase, GitHub Actions and free-tier LLM providers. The app
                holds none of that — it holds a session.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════ CTA ══════════════════════ */}
        <section
          className="mg-grain relative overflow-hidden px-6 py-24 md:py-32"
          style={{ background: "radial-gradient(110% 90% at 50% 110%, #16210E 0%, #0C120C 45%, #0A0E0C 100%)" }}
        >
          <Aurora />
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-[#C6F24E]/25 bg-[#0E1310] p-4 shadow-[0_0_60px_rgba(198,242,78,0.18)]">
                <Image src="/migi-app/images/migi-app-icon.png" alt="MIGI app icon" fill className="object-cover" />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="font-manrope mb-6 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.035em] md:text-[3.4rem]">
                <span style={gWhite}>One phone,</span>{" "}
                <span className="font-serif font-normal italic" style={gLime}>
                  forty-six agents.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-manrope mx-auto mb-10 max-w-2xl text-[15px] leading-relaxed text-white/45 md:text-base">
                The app is the access layer. The work happens in the fleet behind it — scheduled agents, an orchestrator, and a
                knowledge base that has been reading along the whole time.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/agents/migi"
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-[#12161A] transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: LIME }}
                >
                  Explore the MIGI agent fleet
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="#version-one"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white/80 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                >
                  Revisit version 1
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <PageFaq href="/apps/migi-app" surface="#0a0d12" />
      <RelatedPages href="/apps/migi-app" surface="#0a0d12" />
      <Contact variant="dark" />
    </MotionProvider>
  );
}
