import type { Metadata } from "next";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import HeroLock from "@/components/ui/HeroLock";
import { Reveal, StatCounter } from "@/components/penta/PentaWidgets";
import { Shot, IdorDiagram, DefenceStack } from "@/components/banking/BankingVisuals";
import {
  BANK,
  LIVE_URL,
  BADGES,
  STATS,
  HERO_SHOT,
  FLAGSHIP,
  GALLERY,
  STORIES,
  CONTROLS,
  AUDIT,
  PROOF,
  COMPLIANCE,
  STACK,
  SCOPE,
} from "@/components/banking/banking-data";
import { SITE_URL } from "@/lib/projects";

/* ── SEO ───────────────────────────────────────────────────────────────────
   Two audiences. Google wants the title/description/canonical and the
   structured data below; an answer engine wants the page to state, in prose,
   what the thing is and what is provably true about it — which is why the
   security section reads as claims with evidence attached rather than as a
   badge wall.                                                                */
const URL = `${SITE_URL}/banking/rm-copilot`;
const OG = `${SITE_URL}/banking-copilot/og.png`;

const TITLE =
  "Banking Co-pilot — AI Relationship Manager Copilot for Retail Banking";
const DESC =
  "A production-grade AI copilot for bank Relationship Managers. Twelve modules across customer analytics, decisioning, grounded policy answers and document verification — behind authentication, per-RM data isolation, PII masking and 38 automated security tests.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Banking Co-pilot",
    "AI relationship manager copilot",
    "banking AI copilot",
    "RM copilot",
    "explainable AI banking",
    "RAG knowledge base banking policy",
    "document intelligence KYC",
    "Aadhaar Verhoeff validation",
    "PII masking",
    "IDOR 404 not 403",
    "per-RM data isolation",
    "row-level security",
    "prompt injection defence",
    "DPDP Act 2023",
    "RBI cyber security framework",
    "OWASP Top 10",
    "Next.js 16",
    "Auth.js v5",
    "Supabase pgvector",
    "Suman Debnath",
  ],
  alternates: { canonical: "/banking/rm-copilot" },
  openGraph: {
    type: "article",
    url: URL,
    title: "Banking Co-pilot — an AI copilot for bank Relationship Managers",
    description:
      "Twelve modules turning scattered customer data and bank policy into decisions you can defend. Deterministic scoring, cited policy answers, vision-based document verification — behind per-RM isolation and 38 security tests.",
    images: [
      {
        url: OG,
        width: 1200,
        height: 630,
        alt: "Banking Co-pilot — the Customer 360 dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Banking Co-pilot — AI Relationship Manager Copilot",
    description:
      "Deterministic scoring engines, RAG over bank policy with validated citations, and vision-based KYC — behind authentication, per-RM data isolation and PII masking.",
    images: [OG],
  },
};

/* ── Structured data ────────────────────────────────────────────────────── */
const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Banking Co-pilot",
  alternateName: "AI Relationship Manager Copilot",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: DESC,
  url: URL,
  sameAs: [LIVE_URL],
  image: OG,
  author: { "@type": "Person", name: "Suman Debnath", url: SITE_URL },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Customer 360",
    "Financial Health Score",
    "Lead Qualification",
    "Loan Recommendation",
    "Risk Prediction",
    "Explainable AI",
    "RAG Knowledge Base",
    "RM Chat",
    "Next Best Action",
    "Government Scheme Matcher",
    "Document Intelligence",
    "Analytics",
  ],
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Banking Co-pilot — building an AI copilot a bank could actually audit",
  description:
    "How a twelve-module AI copilot for bank Relationship Managers keeps its scoring deterministic, its citations validated, and its customer records un-enumerable — with per-RM isolation, PII masking, an append-only audit trail and 38 automated security tests.",
  author: { "@type": "Person", name: "Suman Debnath" },
  publisher: { "@type": "Person", name: "Suman Debnath" },
  mainEntityOfPage: URL,
  image: OG,
};

/* The three questions an answer engine is most likely to be asked about this
   project, answered in the markup as well as in the prose. */
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Banking Co-pilot let a language model make credit decisions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Every score — financial health, risk probability, loan eligibility, lead quality and next best action — is computed by a deterministic engine with named, weighted factors. No language model touches any of them. LLMs are confined to conversation, synthesising a cited answer from retrieved bank policy, and reading a document image.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the API return 404 instead of 403 for another Relationship Manager's customer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because 403 Forbidden confirms the record exists. An attacker probing sequential customer ids could map the bank's entire customer ID space from the difference between a 403 and a 404, without reading any record. Returning 404 for both 'does not exist' and 'not yours' makes the two cases indistinguishable and the enumeration worthless.",
      },
    },
    {
      "@type": "Question",
      name: "Is Banking Co-pilot built on real customer data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The dataset is entirely synthetic — 24 generated customers across 4 Relationship Managers, 8 policy documents and 8 government schemes. No real customer data is used anywhere. The security controls are built to production quality so the platform is ready for real, governed data.",
      },
    },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Project Archive", item: `${SITE_URL}/projects` },
    { "@type": "ListItem", position: 3, name: "Banking Co-pilot", item: URL },
  ],
};

/* ── Building blocks ───────────────────────────────────────────────────── */
function SectionLabel({ index, kicker }: { index: string; kicker: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="font-mono text-[11px] rounded px-1.5 py-0.5 leading-none"
        style={{ color: "#06131C", background: BANK.brass }}
      >
        {index}
      </span>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: BANK.petrol }} />
      <span
        className="font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{ color: BANK.faint }}
      >
        {kicker}
      </span>
    </div>
  );
}

function ArrowOut() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ═════════════════════════════════════════════════════════════════════════ */
export default function BankingCopilotPage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Navigation />

      <main className="relative font-manrope" style={{ background: BANK.bg, color: BANK.text }}>
        {/* ════════════════════════════ HERO ════════════════════════════ */}
        <section className="relative px-6 pt-28 pb-16 md:pb-24 overflow-hidden">
          <HeroLock />
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[560px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(ellipse at top, rgba(79,163,216,0.14) 0%, transparent 70%)" }}
            />
            <div
              className="absolute top-1/3 -right-24 w-[460px] h-[460px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(217,169,97,0.09) 0%, transparent 70%)" }}
            />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
          </div>

          <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
            <Reveal delay={0.05}>
              <span
                className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.26em] rounded-full px-3.5 py-1.5"
                style={{
                  background: "rgba(79,163,216,0.1)",
                  border: "1px solid rgba(79,163,216,0.26)",
                  color: BANK.petrol,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: BANK.petrol, boxShadow: `0 0 8px ${BANK.petrol}` }}
                />
                Banking · 12 modules · live
              </span>
            </Reveal>

            <Reveal delay={0.12}>
              <h1 className="font-manrope font-extrabold tracking-tight text-[2.6rem] sm:text-6xl md:text-[4.2rem] leading-[1.02] mt-7">
                Banking{" "}
                <span
                  style={{
                    background: `linear-gradient(100deg, ${BANK.petrol}, ${BANK.brass})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Co-pilot
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="font-serif text-xl md:text-2xl mt-6 leading-[1.45] max-w-2xl" style={{ color: BANK.text }}>
                An AI copilot for bank Relationship Managers — twelve modules
                turning scattered customer data and bank policy into decisions
                you can defend.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="font-manrope text-[15px] mt-5 leading-relaxed max-w-2xl" style={{ color: BANK.muted }}>
                Deterministic scoring engines, retrieval-augmented answers over
                bank policy with validated citations, and vision-based document
                verification — behind authentication, per-RM data isolation and
                PII masking. Built as a production-grade reference
                implementation on entirely synthetic data.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap justify-center gap-2 mt-7">
                {BADGES.map((b) => (
                  <span
                    key={b}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-full"
                    style={{ border: `1px solid ${BANK.line}`, background: "rgba(255,255,255,0.02)", color: BANK.muted }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-manrope font-semibold text-[14px] transition-transform hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(100deg, ${BANK.petrol}, ${BANK.brass})`, color: "#06131C" }}
                >
                  Open the live site
                  <ArrowOut />
                </a>
                <a
                  href="#security"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-manrope font-medium text-[14px] transition-colors"
                  style={{ border: `1px solid ${BANK.line}`, color: BANK.text }}
                >
                  Jump to the security model
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.42} className="w-full">
              <div className="w-full max-w-6xl mt-12">
                <Shot
                  src={HERO_SHOT.src}
                  alt={HERO_SHOT.alt}
                  label="bankingcopilot.houseofnamus.com — Customer 360"
                  priority
                />
              </div>
            </Reveal>

            <Reveal delay={0.48}>
              <p className="font-manrope text-[12.5px] leading-relaxed mt-4 max-w-2xl" style={{ color: BANK.faint }}>
                <span style={{ color: BANK.muted }}>Customer 360</span> — profile,
                accounts, transactions and risk signals in one view, the lookup
                that otherwise costs an RM four systems and a phone call. The
                copilot itself sits behind sign-in; the public site is open, the
                twelve modules are not.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ STATS ════════════════════════════ */}
        <section
          className="relative px-6 py-14 md:py-16"
          style={{ borderTop: `1px solid ${BANK.lineSoft}`, background: BANK.panel }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={(i % 5) * 0.05}>
                <p
                  className="font-manrope font-extrabold text-3xl md:text-4xl tracking-tight"
                  style={{ color: BANK.brass }}
                >
                  <StatCounter
                    value={s.num}
                    decimals={s.decimals ?? 0}
                    prefix={s.approx ? "~" : ""}
                    suffix={s.suffix ?? ""}
                  />
                </p>
                <p className="font-manrope text-[12px] leading-snug mt-2" style={{ color: BANK.muted }}>
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ════════════════════════════ PROBLEM ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24">
          <div className="max-w-3xl mx-auto">
            <SectionLabel index="01" kicker="Why it exists" />
            <Reveal>
              <h2 className="font-serif text-2xl md:text-[2rem] leading-[1.4]">
                The Relationship Manager becomes the integration layer.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="font-manrope text-[15px] md:text-base leading-relaxed mt-6" style={{ color: BANK.muted }}>
                An RM covering a book of customers is asked to answer, quickly:
                what is going on with this customer across every product they
                hold; are they a risk, and can I say <em>why</em> in a sentence
                compliance accepts; what should I offer them next, and are they
                actually eligible; does this Aadhaar card match the person on
                file; and what does bank policy actually say — and{" "}
                <span style={{ color: BANK.text }}>where</span> does it say it.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="font-manrope text-[15px] md:text-base leading-relaxed mt-5" style={{ color: BANK.muted }}>
                Each answer lives in a different system. The RM stitches them
                together from memory and instinct — slow, inconsistent between
                RMs, and, when the reasoning behind a decision cannot be
                reconstructed afterwards, a regulatory problem.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div
                className="mt-8 rounded-2xl p-5"
                style={{ background: "rgba(217,169,97,0.06)", border: "1px solid rgba(217,169,97,0.2)" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] mb-2" style={{ color: BANK.brass }}>
                  The wedge
                </p>
                <p className="font-manrope text-[14px] leading-relaxed" style={{ color: BANK.text }}>
                  Not “add AI to banking”. Collapse the lookup time, and make the
                  reasoning inspectable.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ FLAGSHIP MODULES ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${BANK.lineSoft}` }}>
          <div className="max-w-6xl mx-auto">
            <SectionLabel index="02" kicker="What it does" />
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-4xl tracking-tight mb-4 max-w-2xl">
                Twelve modules. Three where the difficulty is the point.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="font-manrope text-[15px] leading-relaxed max-w-2xl mb-14" style={{ color: BANK.muted }}>
                Customer, Decisioning, Assistant and Operations — all inside one
                authenticated shell, alongside the Customer 360 view above. These
                three are where a technical reviewer will want to look, because
                each has to survive being questioned rather than just displayed.
              </p>
            </Reveal>

            <div className="flex flex-col gap-16 md:gap-20">
              {FLAGSHIP.map((f, i) => (
                <div
                  key={f.n}
                  className={`grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-center ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <Reveal>
                    <div>
                      <span className="font-mono text-[11px]" style={{ color: BANK.brass }}>
                        {f.n}
                      </span>
                      <h3 className="font-manrope font-bold text-2xl md:text-[1.75rem] tracking-tight mt-2">
                        {f.title}
                      </h3>
                      <p className="font-manrope text-[13.5px] mt-1.5" style={{ color: BANK.petrol }}>
                        {f.sub}
                      </p>
                      <p className="font-manrope text-[14.5px] leading-relaxed mt-4" style={{ color: BANK.muted }}>
                        {f.body}
                      </p>
                    </div>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <Shot
                      src={f.src}
                      alt={f.alt}
                      label={f.title}
                      sizes="(min-width: 1024px) 660px, 100vw"
                    />
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ GALLERY ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${BANK.lineSoft}` }}>
          <div className="max-w-6xl mx-auto">
            <SectionLabel index="03" kicker="The rest of the shell" />
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-4xl tracking-tight mb-12 max-w-2xl">
                Eight more, in the same shell.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              {GALLERY.map((g, i) => (
                <Reveal key={g.src} delay={(i % 2) * 0.05}>
                  <figure>
                    <Shot
                      src={g.src}
                      alt={g.alt}
                      label={g.title}
                      sizes="(min-width: 768px) 560px, 100vw"
                    />
                    <figcaption
                      className="font-manrope text-[12.5px] leading-relaxed mt-3.5"
                      style={{ color: BANK.muted }}
                    >
                      <span className="font-semibold" style={{ color: BANK.text }}>
                        {g.title}
                      </span>{" "}
                      — {g.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="font-manrope text-[13px] leading-relaxed mt-10 max-w-2xl" style={{ color: BANK.faint }}>
                Not pictured: RAG Knowledge Base — hybrid retrieval, vector plus
                keyword fused by Reciprocal Rank Fusion, answering with inline{" "}
                <span className="font-mono">[POL-001]</span> citations validated
                against the documents actually retrieved. Document Intelligence —
                upload an Aadhaar, PAN, bank statement or salary slip; it
                classifies, extracts by vision OCR, validates (including the
                Verhoeff checksum a real Aadhaar number must satisfy) and
                cross-checks against the customer on file. Loan Recommendation
                and RM Chat complete the twelve.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ ENGINEERING STORIES ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${BANK.lineSoft}` }}>
          <div className="max-w-5xl mx-auto">
            <SectionLabel index="04" kicker="Three decisions" />
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-4xl tracking-tight mb-4 max-w-2xl">
                A feature list is forgettable.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="font-manrope text-[15px] leading-relaxed max-w-2xl mb-14" style={{ color: BANK.muted }}>
                These three are specific decisions with reasoning behind them —
                and the reasoning is the part worth reading.
              </p>
            </Reveal>

            <div className="flex flex-col gap-5">
              {STORIES.map((s, i) => (
                <Reveal key={s.n} delay={(i % 2) * 0.05}>
                  <article
                    className="rounded-2xl p-6 md:p-8"
                    style={{ background: BANK.panel, border: `1px solid ${BANK.line}` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono font-bold text-[13px]" style={{ color: BANK.brass }}>
                        {s.n}
                      </span>
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.24em]"
                        style={{ color: BANK.faint }}
                      >
                        {s.kicker}
                      </span>
                    </div>
                    <h3 className="font-manrope font-bold text-xl md:text-[1.4rem] tracking-tight mb-4">
                      {s.title}
                    </h3>
                    {s.body.map((p) => (
                      <p
                        key={p.slice(0, 40)}
                        className="font-manrope text-[14.5px] leading-relaxed mb-3.5 last:mb-0"
                        style={{ color: BANK.muted }}
                      >
                        {p}
                      </p>
                    ))}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECURITY — the section this page is really for
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="security"
          className="relative px-6 py-20 md:py-28 scroll-mt-24 overflow-hidden"
          style={{ borderTop: `1px solid ${BANK.lineSoft}`, background: BANK.panel }}
        >
          <div
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(ellipse at top, rgba(217,169,97,0.1) 0%, transparent 70%)" }}
          />

          <div className="relative max-w-6xl mx-auto">
            <SectionLabel index="05" kicker="Security posture" />
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-[2.75rem] tracking-tight leading-[1.1] mb-6 max-w-3xl">
                The security model is real,
                <br />
                <span style={{ color: BANK.muted }}>not decorative.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="font-manrope text-[15px] md:text-base leading-relaxed max-w-3xl" style={{ color: BANK.muted }}>
                RM tooling touches the most sensitive data a bank holds, so it
                was built accordingly: every route session-gated, every RM scoped
                to their own book, out-of-book access returning 404 rather than
                403 so record ids cannot be enumerated, PII masked at the
                boundary, and an append-only audit trail behind it. Hardened
                through five structured phases driven by three independent
                audits — a VAPT report, a full audit and a deep audit — with
                every finding remediated and verified.
              </p>
            </Reveal>

            {/* ── Headline proof ── */}
            <Reveal delay={0.12}>
              <div
                className="mt-10 rounded-2xl p-6 md:p-7"
                style={{ background: "rgba(79,163,216,0.07)", border: "1px solid rgba(79,163,216,0.22)" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] mb-2.5" style={{ color: BANK.petrol }}>
                  The one number that matters
                </p>
                <p className="font-manrope text-[16px] md:text-[17px] leading-relaxed" style={{ color: BANK.text }}>
                  <strong className="font-bold">17 integration tests drive a live server</strong>{" "}
                  through the real authentication flow — proving per-RM
                  isolation, IDOR handling and PII masking against a running
                  application, not against mocks. 21 unit tests cover the pure
                  predicates and the masking functions alongside them.{" "}
                  <span style={{ color: BANK.muted }}>
                    The suite has already caught a real regression: raw phone and
                    email leaking through the document cross-check response.
                  </span>
                </p>
              </div>
            </Reveal>

            {/* ── Defence in depth ── */}
            <div className="mt-16 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <h3 className="font-manrope font-bold text-2xl md:text-[1.75rem] tracking-tight mb-4">
                    Never trust a single gate.
                  </h3>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="font-manrope text-[14.5px] leading-relaxed" style={{ color: BANK.muted }}>
                    Next.js has a documented history of
                    middleware-authorization-bypass advisories, so the edge proxy
                    is treated as a fast reject and never as the authority. Every
                    route handler independently re-authenticates and
                    re-authorizes. Four layers, so a weakness in any one of them
                    does not become a breach.
                  </p>
                </Reveal>
              </div>
              <DefenceStack />
            </div>

            {/* ── 404 vs 403 ── */}
            <div className="mt-20 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: BANK.brass }}>
                    Closing IDOR deliberately
                  </span>
                  <h3 className="font-manrope font-bold text-2xl md:text-[1.75rem] tracking-tight mt-2 mb-4">
                    404 is the right answer.
                  </h3>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="font-manrope text-[14.5px] leading-relaxed" style={{ color: BANK.muted }}>
                    An access-control decision is also an information-disclosure
                    decision. The status code you return to a request you are
                    refusing is itself data — and if it differs from the one you
                    return for a record that does not exist, you have built an
                    oracle.
                  </p>
                </Reveal>
              </div>
              <IdorDiagram />
            </div>

            {/* ── Control catalogue ── */}
            <div className="mt-20">
              <Reveal>
                <h3 className="font-manrope font-bold text-2xl md:text-[1.75rem] tracking-tight mb-3">
                  The control catalogue.
                </h3>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="font-manrope text-[14.5px] leading-relaxed max-w-2xl mb-10" style={{ color: BANK.muted }}>
                  Six groups, each enforced in code rather than described in a
                  policy document.
                </p>
              </Reveal>
              <div className="grid md:grid-cols-2 gap-4">
                {CONTROLS.map((c, i) => (
                  <Reveal key={c.group} delay={(i % 2) * 0.05}>
                    <div
                      className="rounded-2xl p-6 h-full"
                      style={{ background: BANK.panelLift, border: `1px solid ${BANK.line}` }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: "rgba(217,169,97,0.12)", border: "1px solid rgba(217,169,97,0.22)" }}
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={BANK.brass} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                            <path d={c.icon} />
                          </svg>
                        </span>
                        <h4 className="font-manrope font-semibold text-[15.5px]">{c.group}</h4>
                      </div>
                      <ul className="flex flex-col gap-2">
                        {c.items.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <span
                              className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                              style={{ background: BANK.petrol }}
                            />
                            <span className="font-manrope text-[13px] leading-relaxed" style={{ color: BANK.muted }}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* ── Audit findings + live proof ── */}
            <div className="mt-16 grid lg:grid-cols-2 gap-6">
              <Reveal>
                <div
                  className="rounded-2xl p-6 md:p-7 h-full"
                  style={{ background: BANK.panelLift, border: `1px solid ${BANK.line}` }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] mb-1.5" style={{ color: BANK.brass }}>
                    Audit findings closed
                  </p>
                  <p className="font-manrope text-[13px] leading-relaxed mb-6" style={{ color: BANK.muted }}>
                    All three audits described the same twenty issues under
                    different ids. Every one is remediated and verified.
                  </p>
                  <div className="flex flex-col gap-3">
                    {AUDIT.map((a) => (
                      <div key={a.sev} className="flex items-start gap-3.5">
                        <span
                          className="font-manrope font-extrabold text-[19px] leading-none w-7 shrink-0 tabular-nums"
                          style={{ color: BANK.petrol }}
                        >
                          {a.n}
                        </span>
                        <div>
                          <p className="font-manrope font-semibold text-[13.5px]">{a.sev}</p>
                          <p className="font-manrope text-[12.5px] leading-relaxed" style={{ color: BANK.faint }}>
                            {a.note}
                          </p>
                        </div>
                        <span
                          className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] shrink-0 pt-1"
                          style={{ color: BANK.ok }}
                        >
                          closed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div
                  className="rounded-2xl p-6 md:p-7 h-full"
                  style={{ background: BANK.panelLift, border: `1px solid ${BANK.line}` }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] mb-1.5" style={{ color: BANK.brass }}>
                    What the suite asserts
                  </p>
                  <p className="font-manrope text-[13px] leading-relaxed mb-6" style={{ color: BANK.muted }}>
                    Run against a live server, through the real sign-in flow.
                  </p>
                  <div className="flex flex-col">
                    {PROOF.map((p, i) => (
                      <div
                        key={p.check}
                        className="flex items-baseline justify-between gap-4 py-2.5"
                        style={{ borderTop: i === 0 ? "none" : `1px solid ${BANK.lineSoft}` }}
                      >
                        <span className="font-manrope text-[12.5px] leading-snug" style={{ color: BANK.muted }}>
                          {p.check}
                        </span>
                        <span
                          className="font-mono text-[12px] font-semibold shrink-0"
                          style={{ color: p.expect === "never" ? BANK.ok : BANK.petrol }}
                        >
                          {p.expect}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── Compliance ── */}
            <div className="mt-16">
              <Reveal>
                <h3 className="font-manrope font-bold text-2xl md:text-[1.75rem] tracking-tight mb-3">
                  Designed against the frameworks that would audit it.
                </h3>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="font-manrope text-[14.5px] leading-relaxed max-w-2xl mb-10" style={{ color: BANK.muted }}>
                  Alignment, not certification — the distinction matters, and it
                  is stated here rather than blurred.
                </p>
              </Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COMPLIANCE.map((c, i) => (
                  <Reveal key={c.name} delay={(i % 4) * 0.05}>
                    <div
                      className="rounded-2xl p-5 h-full"
                      style={{ background: BANK.panelLift, border: `1px solid ${BANK.line}` }}
                    >
                      <p className="font-manrope font-semibold text-[14px] mb-2.5" style={{ color: BANK.brass }}>
                        {c.name}
                      </p>
                      <p className="font-manrope text-[12.5px] leading-relaxed" style={{ color: BANK.muted }}>
                        {c.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ STACK ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${BANK.lineSoft}` }}>
          <div className="max-w-6xl mx-auto">
            <SectionLabel index="06" kicker="Architecture & stack" />
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-4xl tracking-tight mb-12 max-w-2xl">
                Two providers, because one of them cannot do the job.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-4">
              {STACK.map((s, i) => (
                <Reveal key={s.group} delay={(i % 3) * 0.05}>
                  <div
                    className="rounded-2xl p-6 h-full"
                    style={{ background: BANK.panel, border: `1px solid ${BANK.line}` }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: BANK.petrol }}>
                      {s.group}
                    </p>
                    <p className="font-manrope text-[13.5px] leading-relaxed" style={{ color: BANK.muted }}>
                      {s.items}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <div
                className="mt-6 rounded-2xl p-6 md:p-7"
                style={{ background: "rgba(217,169,97,0.06)", border: "1px solid rgba(217,169,97,0.2)" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] mb-2.5" style={{ color: BANK.brass }}>
                  Why the split
                </p>
                <p className="font-manrope text-[14.5px] leading-relaxed" style={{ color: BANK.muted }}>
                  Groq has the fastest free-tier text inference, but{" "}
                  <span style={{ color: BANK.text }}>no production vision model and no embeddings endpoint</span>.
                  Gemini covers both. So text generation routes to Groq, vision
                  and embeddings to Gemini, unified behind a single interface
                  with automatic fallback between them. The split is a
                  consequence of what each provider can actually do — not of
                  which one appeared first in a tutorial.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════ HONEST SCOPE ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-24" style={{ borderTop: `1px solid ${BANK.lineSoft}` }}>
          <div className="max-w-5xl mx-auto">
            <SectionLabel index="07" kicker="Honest scope" />
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-4xl tracking-tight mb-4 max-w-2xl">
                What this is, and what it is not.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="font-manrope text-[15px] leading-relaxed max-w-2xl mb-12" style={{ color: BANK.muted }}>
                Stating a scope limit precisely is itself a signal. Three things
                belong on the page rather than in a footnote.
              </p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-5">
              {SCOPE.map((s, i) => (
                <Reveal key={s.title} delay={(i % 3) * 0.05}>
                  <div
                    className="rounded-2xl p-6 h-full"
                    style={{ background: BANK.panel, border: `1px solid ${BANK.line}` }}
                  >
                    <h3 className="font-manrope font-semibold text-[15.5px] mb-3 leading-snug">
                      {s.title}
                    </h3>
                    <p className="font-manrope text-[13px] leading-relaxed" style={{ color: BANK.muted }}>
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ CLOSE ════════════════════════════ */}
        <section className="relative px-6 py-20 md:py-28" style={{ borderTop: `1px solid ${BANK.lineSoft}` }}>
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="font-manrope font-bold text-3xl md:text-[2.6rem] tracking-tight leading-[1.1]">
                Built on synthetic data, to production standards
                <br />
                <span style={{ color: BANK.muted }}>— so the controls are ready for the real thing.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-manrope font-semibold text-[14px] transition-transform hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(100deg, ${BANK.petrol}, ${BANK.brass})`, color: "#06131C" }}
                >
                  Open the live site
                  <ArrowOut />
                </a>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-manrope font-medium text-[14px]"
                  style={{ border: `1px solid ${BANK.line}`, color: BANK.text }}
                >
                  All projects
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="font-manrope text-[12.5px] leading-relaxed mt-10 max-w-xl mx-auto" style={{ color: BANK.faint }}>
                A reference implementation and portfolio demonstration. Every
                customer, transaction and document in it is synthetic — no real
                banking data is used anywhere. Not a certified or independently
                accredited banking product.
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
