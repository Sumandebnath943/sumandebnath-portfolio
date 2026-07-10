import type { Metadata } from "next";
import Image from "next/image";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import { Reveal, StatCounter } from "@/components/penta/PentaWidgets";
import { ScreenshotFrame, EnvelopeDiagram } from "@/components/aegis/AegisVisuals";
import {
  AEGIS,
  LIVE_URL,
  BADGES,
  FEATURES,
  CHALLENGES,
  LEARNINGS,
  STATS,
  STACK,
  SHOTS,
} from "@/components/aegis/aegis-data";
import { SITE_URL } from "@/lib/projects";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const URL = `${SITE_URL}/projects/aegis-vault`;

export const metadata: Metadata = {
  title: "AEGIS VAULT — Zero-Knowledge Encrypted Notes App (Next.js + Supabase)",
  description:
    "A full-stack, end-to-end encrypted notepad. Notes are encrypted in the browser with Argon2id + AES-256-GCM; the server stores only ciphertext. Built with Next.js 16, Supabase, and Row-Level Security.",
  keywords: [
    "AEGIS VAULT", "zero-knowledge notes", "encrypted notepad", "end-to-end encryption",
    "Argon2id", "AES-256-GCM", "envelope encryption", "Web Crypto API", "Supabase",
    "Row-Level Security", "applied cryptography", "Next.js", "Suman Debnath",
  ],
  alternates: { canonical: "/projects/aegis-vault" },
  openGraph: {
    type: "article",
    url: URL,
    title: "AEGIS VAULT — Zero-Knowledge Encrypted Notepad",
    description:
      "Encrypted in your browser, unreadable to the server. Argon2id + AES-256-GCM envelope encryption, httpOnly sessions, and Postgres Row-Level Security.",
    images: [{ url: "/aegis-vault/cover.png", width: 1365, height: 767, alt: "AEGIS VAULT — zero-knowledge encrypted notepad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AEGIS VAULT — Zero-Knowledge Encrypted Notepad",
    description:
      "A password manager's security model, applied to note-taking. Argon2id + AES-256-GCM, envelope encryption, RLS.",
    images: ["/aegis-vault/cover.png"],
  },
};

/* ── Schema ─────────────────────────────────────────────────────────────── */
const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AEGIS VAULT",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  description:
    "A zero-knowledge encrypted notes app. Every note is encrypted in the browser with Argon2id + AES-256-GCM before it leaves the device; the server stores only ciphertext. Built with Next.js 16, Supabase, and Row-Level Security.",
  url: URL,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE_URL },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};
const articleLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "AEGIS VAULT — a zero-knowledge encrypted notepad",
  author: { "@type": "Person", name: "Suman Debnath" },
  publisher: { "@type": "Person", name: "Suman Debnath" },
  description:
    "How a full-stack notes app applies a password manager's zero-knowledge security model to note-taking, using envelope encryption, httpOnly sessions and Postgres Row-Level Security.",
  mainEntityOfPage: URL,
};
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Project Archive", item: `${SITE_URL}/projects` },
    { "@type": "ListItem", position: 3, name: "AEGIS VAULT", item: URL },
  ],
};

/* ── small building blocks ──────────────────────────────────────────────── */
function SectionLabel({ index, kicker }: { index: string; kicker: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="font-mono text-[11px] rounded px-1.5 py-0.5 leading-none"
        style={{ color: "#050505", background: AEGIS.lime }}
      >
        {index}
      </span>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: AEGIS.emerald }} />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: AEGIS.faint }}>
        {kicker}
      </span>
    </div>
  );
}

function FeatureIcon({ path }: { path: string }) {
  return (
    <span
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: "rgba(143,224,78,0.12)", border: `1px solid rgba(143,224,78,0.22)` }}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={AEGIS.lime} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </span>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ═════════════════════════════════════════════════════════════════════════ */
export default function AegisVaultPage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Navigation />

      <main
        className="relative font-manrope"
        style={{ background: AEGIS.bg, color: AEGIS.text }}
      >
        {/* ════════════════════════════ HERO ════════════════════════════ */}
        <section className="relative px-6 pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
          {/* atmospheric emerald glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[560px] rounded-full blur-3xl" style={{ background: "radial-gradient(ellipse at top, rgba(34,197,94,0.12) 0%, transparent 70%)" }} />
            <div className="absolute top-1/2 -right-24 w-[460px] h-[460px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)" }} />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <Reveal>
              <a href="/projects" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.24em] mb-8 transition-colors" style={{ color: AEGIS.faint }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                Project Archive
              </a>
            </Reveal>

            <div className="flex flex-col items-center text-center">
              <Reveal delay={0.05}>
                <span
                  className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.26em] rounded-full px-3.5 py-1.5"
                  style={{ background: "rgba(143,224,78,0.1)", border: `1px solid rgba(143,224,78,0.24)`, color: AEGIS.lime }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: AEGIS.lime, boxShadow: `0 0 8px ${AEGIS.lime}` }} />
                  End-to-end encrypted
                </span>
              </Reveal>

              {/* Wordmark lockup — seated on a light brand plate so the dark
                  "AEGIS" reads against the near-black hero. h1 kept for SEO. */}
              <h1 className="sr-only">AEGIS VAULT — zero-knowledge encrypted notepad</h1>
              <Reveal delay={0.12}>
                <div
                  aria-hidden
                  className="mt-8 inline-flex items-center justify-center rounded-[1.75rem] px-8 py-8 sm:px-14 sm:py-10"
                  style={{ background: "linear-gradient(160deg,#ffffff 0%,#e9f6df 100%)", boxShadow: "0 44px 90px -34px rgba(34,197,94,0.42), inset 0 0 0 1px rgba(255,255,255,0.7)" }}
                >
                  <Image
                    src="/aegis-vault/logo.png"
                    alt="AEGIS VAULT"
                    width={1406}
                    height={360}
                    priority
                    className="w-[min(640px,78vw)] h-auto"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="font-manrope text-lg md:text-xl mt-9 leading-relaxed max-w-2xl" style={{ color: AEGIS.text }}>
                  A zero-knowledge encrypted notepad — every note is encrypted in
                  your browser before it ever leaves your device.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="font-manrope text-[15px] mt-4 leading-relaxed max-w-2xl" style={{ color: AEGIS.muted }}>
                  The server stores nothing but ciphertext — a complete database
                  breach would reveal nothing without your master password. The same
                  security model password managers use, applied to note-taking.
                </p>
              </Reveal>

              {/* primitive badges */}
              <Reveal delay={0.3}>
                <div className="flex flex-wrap justify-center gap-2 mt-7">
                  {BADGES.map((b) => (
                    <span key={b} className="font-mono text-[11px] px-2.5 py-1 rounded-full" style={{ border: `1px solid ${AEGIS.line}`, background: "rgba(255,255,255,0.02)", color: AEGIS.muted }}>
                      {b}
                    </span>
                  ))}
                </div>
              </Reveal>

              {/* CTAs */}
              <Reveal delay={0.36}>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
                  <a
                    href={LIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-manrope font-semibold text-[14px] transition-transform hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(100deg, ${AEGIS.lime}, ${AEGIS.emerald})`, color: "#07120A" }}
                  >
                    Open live demo
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
                  </a>
                  <a
                    href="/projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-manrope font-medium text-[14px] transition-colors"
                    style={{ border: `1px solid ${AEGIS.line}`, color: AEGIS.text }}
                  >
                    All projects
                  </a>
                </div>
              </Reveal>

              {/* hero screenshot — full width beneath the lockup */}
              <Reveal delay={0.42}>
                <div className="w-full max-w-5xl mt-16">
                  <ScreenshotFrame
                    src="/aegis-vault/cover.png"
                    label="aegisnote.houseofnamus.com"
                    alt="AEGIS VAULT authentication screen — an end-to-end encrypted vault with Argon2id key derivation and AES-256-GCM"
                    w={1365}
                    h={767}
                    priority
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ THE PROBLEM ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24">
          <div className="max-w-3xl mx-auto">
            <SectionLabel index="01" kicker="Why it exists" />
            <Reveal>
              <p className="font-serif text-2xl md:text-[2rem] leading-[1.4]" style={{ color: AEGIS.text }}>
                Most “secure” notes apps still store your notes in a form the company
                can read.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="font-manrope text-[15px] md:text-base leading-relaxed mt-6" style={{ color: AEGIS.muted }}>
                You&apos;re trusting their servers, their employees, and their breach
                response. AEGIS VAULT removes that trust requirement entirely: the
                encryption keys are derived from a master password that{" "}
                <span style={{ color: AEGIS.lime }}>never leaves the browser and is never stored anywhere</span>.
                Even with full access to the database, an attacker gets only unreadable
                ciphertext.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ FEATURES ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${AEGIS.lineSoft}` }}>
          <div className="max-w-6xl mx-auto">
            <SectionLabel index="02" kicker="What it does" />
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-4xl tracking-tight mb-12 max-w-2xl">
                Security you don&apos;t have to think about.
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 0.05}>
                  <div className="rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-0.5" style={{ background: AEGIS.panel, border: `1px solid ${AEGIS.line}` }}>
                    <FeatureIcon path={f.icon} />
                    <h3 className="font-manrope font-semibold text-[15.5px] mt-4 mb-2">{f.title}</h3>
                    <p className="font-manrope text-[13px] leading-relaxed" style={{ color: AEGIS.muted }}>{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ HOW IT WORKS ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${AEGIS.lineSoft}` }}>
          <div className="max-w-6xl mx-auto">
            <SectionLabel index="03" kicker="How it works" />
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <h2 className="font-manrope font-bold text-3xl md:text-4xl tracking-tight mb-5">
                    Envelope encryption.
                  </h2>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="font-manrope text-[15px] leading-relaxed" style={{ color: AEGIS.muted }}>
                    The same pattern AWS KMS and Bitwarden use. Your master password
                    never encrypts a note directly — it derives a{" "}
                    <span style={{ color: AEGIS.text }}>master key</span> that only
                    wraps a random{" "}
                    <span style={{ color: AEGIS.text }}>data-encryption key</span>. That
                    indirection is what lets you rotate your password without
                    re-encrypting a single note, and protects your notes with
                    full-entropy randomness even if your password is weak.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <div className="mt-8 rounded-2xl p-5" style={{ background: "rgba(45,212,191,0.06)", border: `1px solid rgba(45,212,191,0.18)` }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] mb-2" style={{ color: AEGIS.teal }}>The guarantee</p>
                    <p className="font-manrope text-[13.5px] leading-relaxed" style={{ color: AEGIS.muted }}>
                      Where the keys live matters more than which cipher you pick.
                      Here, they live only in your browser&apos;s memory — never on
                      the wire, never in storage, never on the server.
                    </p>
                  </div>
                </Reveal>
              </div>
              <EnvelopeDiagram />
            </div>
          </div>
        </section>

        {/* ════════════════════════════ STACK ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${AEGIS.lineSoft}` }}>
          <div className="max-w-6xl mx-auto">
            <SectionLabel index="04" kicker="Architecture & stack" />
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-4xl tracking-tight mb-12 max-w-2xl">
                Standard primitives, layered defenses.
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STACK.map((s, i) => (
                <Reveal key={s.group} delay={(i % 3) * 0.05}>
                  <div className="rounded-2xl p-6 h-full" style={{ background: AEGIS.panel, border: `1px solid ${AEGIS.line}` }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: AEGIS.lime }}>{s.group}</p>
                    <p className="font-manrope text-[13.5px] leading-relaxed" style={{ color: AEGIS.muted }}>{s.items}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ CHALLENGES ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${AEGIS.lineSoft}` }}>
          <div className="max-w-5xl mx-auto">
            <SectionLabel index="05" kicker="Challenges & decisions" />
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-4xl tracking-tight mb-12 max-w-2xl">
                Five real decisions, each with a real trade-off.
              </h2>
            </Reveal>
            <div className="flex flex-col gap-4">
              {CHALLENGES.map((c, i) => (
                <Reveal key={c.n} delay={(i % 2) * 0.05}>
                  <div className="rounded-2xl p-6 md:p-7 flex gap-5 md:gap-7" style={{ background: AEGIS.panel, border: `1px solid ${AEGIS.line}` }}>
                    <span className="font-mono font-bold text-[15px] shrink-0 pt-0.5" style={{ color: AEGIS.lime }}>{c.n}</span>
                    <div>
                      <h3 className="font-manrope font-semibold text-[16px] md:text-[17px] mb-2">{c.title}</h3>
                      <p className="font-manrope text-[13.5px] leading-relaxed" style={{ color: AEGIS.muted }}>{c.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ STAT STRIP ════════════════════════════ */}
        <section className="relative px-6 py-16 md:py-20" style={{ borderTop: `1px solid ${AEGIS.lineSoft}`, background: AEGIS.panel }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={(i % 5) * 0.05}>
                  <div className="text-center md:text-left">
                    <p className="font-manrope font-extrabold text-3xl md:text-4xl tracking-tight" style={{ color: AEGIS.lime }}>
                      <StatCounter value={s.num} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
                    </p>
                    <p className="font-manrope text-[12px] leading-snug mt-2" style={{ color: AEGIS.muted }}>{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ SCREENSHOTS ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${AEGIS.lineSoft}` }}>
          <div className="max-w-6xl mx-auto">
            <SectionLabel index="06" kicker="Inside the app" />
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-4xl tracking-tight mb-12 max-w-2xl">
                From vault creation to auto-lock.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-5 items-start">
              {/* portrait: create vault */}
              <div className="md:row-span-2">
                <Reveal>
                  <ScreenshotFrame {...SHOTS[0]} />
                </Reveal>
              </div>
              <Reveal delay={0.05}>
                <ScreenshotFrame {...SHOTS[1]} />
              </Reveal>
              <Reveal delay={0.1}>
                <ScreenshotFrame {...SHOTS[2]} />
              </Reveal>
            </div>
            <div className="grid md:grid-cols-2 gap-5 items-stretch mt-5">
              <Reveal>
                <ScreenshotFrame {...SHOTS[3]} />
              </Reveal>
              {/* Live encryption states — the real "saving" and "encrypted" chips */}
              <Reveal delay={0.05}>
                <div className="rounded-[1.1rem] p-6 h-full flex flex-col justify-center gap-5" style={{ background: AEGIS.panel, border: `1px solid ${AEGIS.line}` }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: AEGIS.lime }}>Live states</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Image src="/aegis-vault/encrypting.png" alt="Status badge reading “Encrypting & saving”" width={191} height={30} className="h-7 w-auto" />
                    <Image src="/aegis-vault/encrypted.png" alt="A saved note showing the tamper-evident ENCRYPTED state" width={264} height={157} className="w-[180px] h-auto rounded-lg" style={{ border: `1px solid ${AEGIS.line}` }} />
                  </div>
                  <p className="font-manrope text-[13px] leading-relaxed" style={{ color: AEGIS.muted }}>
                    Auto-save re-encrypts every change in your browser before it is
                    written — and each stored note carries a tamper-evident{" "}
                    <span style={{ color: AEGIS.text }}>ENCRYPTED</span> state,
                    authenticated by AES-GCM.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ LEARNINGS ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${AEGIS.lineSoft}` }}>
          <div className="max-w-5xl mx-auto">
            <SectionLabel index="07" kicker="What it taught me" />
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 mt-4">
              {LEARNINGS.map((l, i) => (
                <Reveal key={l.title} delay={(i % 2) * 0.05}>
                  <div className="flex gap-4">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: AEGIS.lime, boxShadow: `0 0 8px ${AEGIS.lime}` }} />
                    <div>
                      <h3 className="font-manrope font-semibold text-[15px] mb-1.5">{l.title}</h3>
                      <p className="font-manrope text-[13.5px] leading-relaxed" style={{ color: AEGIS.muted }}>{l.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ CTA / HONESTY ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-28" style={{ borderTop: `1px solid ${AEGIS.lineSoft}` }}>
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-[2.6rem] tracking-tight leading-[1.1]">
                Your notes, end-to-end encrypted.
                <br />
                <span style={{ color: AEGIS.muted }}>Not even the database can read them.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-manrope font-semibold text-[14px] transition-transform hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(100deg, ${AEGIS.lime}, ${AEGIS.emerald})`, color: "#07120A" }}
                >
                  Open live demo
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-manrope font-medium text-[14px]"
                  style={{ border: `1px solid ${AEGIS.line}`, color: AEGIS.text }}
                >
                  Back to archive
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="font-manrope text-[12.5px] leading-relaxed mt-10 max-w-xl mx-auto" style={{ color: AEGIS.faint }}>
                A portfolio demonstration &amp; educational project — a strong design,
                not a professionally audited security product. Please don&apos;t store
                truly sensitive data.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Contact />
      <Footer />
    </MotionProvider>
  );
}
