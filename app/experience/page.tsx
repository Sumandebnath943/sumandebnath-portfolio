import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import MotionProvider from "@/components/providers/MotionProvider";
import BannerArt from "@/components/ui/BannerArt";
import HeroLock from "@/components/ui/HeroLock";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageFaq from "@/components/ui/PageFaq";
import RelatedPages from "@/components/ui/RelatedPages";
import { ExperienceInteractiveFloor } from "@/components/experience/ExperienceVisuals";
import {
  experienceHero,
  experienceLedger,
  experienceMetadata,
  experiencePillars,
  experiencePostscript,
  experienceSchemas,
} from "@/lib/experience";
import "./experience.css";

export const metadata = experienceMetadata;

const LEDGER_BAR_WIDTHS = [100, 76, 86, 98, 98, 88, 84, 82];

export default function ExperiencePage() {
  return (
    <MotionProvider>
      {experienceSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navigation />

      <main className="ex-root">
        {/* ═══════════════════════════════════════════════════════════════════
            REGISTER 1 — MASTHEAD / PRODUCTION FLOOR COMMAND HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <header className="ex-hero sd-banner-host">
          <BannerArt seed="/experience" accent="#F59E0B" />
          <HeroLock />
          <div className="ex-hero-grid-bg" aria-hidden="true" />

          <div className="ex-container">
            <div className="ex-hero-topbar">
              <Breadcrumbs
                trail={[{ label: "Experience", href: "/experience" }]}
              />
              <div className="ex-status-pill">
                <span className="ex-status-dot" aria-hidden="true" />
                <span>{experienceHero.kicker}</span>
              </div>
            </div>

            <div className="ex-hero-main">
              {/* Left Column: Monumental H1 + Extractable Summary + Standfirst */}
              <div>
                <h1 className="ex-display-headline">
                  <span className="ex-display-sans">
                    {experienceHero.displayHeadline.sans}
                  </span>
                  <span className="ex-display-serif">
                    {experienceHero.displayHeadline.serifItalic}
                  </span>
                </h1>

                <div className="ex-answer-card">
                  <div className="ex-answer-kicker">
                    <span>IN SHORT · THE NINE-YEAR SUMMARY</span>
                    <span>2016 — PRESENT</span>
                  </div>
                  <p className="ex-answer">{experienceHero.answer}</p>
                </div>

                <p className="ex-standfirst">{experienceHero.standfirst}</p>

                <div className="ex-hero-actions">
                  <a href="#functional-pillars" className="ex-btn-primary">
                    <span>Inspect the 8 Functional Pillars</span>
                    <span aria-hidden="true">↓</span>
                  </a>
                  <a href="#career-ledger" className="ex-btn-secondary">
                    <span>9-Year Scale Ledger</span>
                  </a>
                  <Link href="/resume" className="ex-btn-secondary">
                    <span>Chronological CV (/resume) →</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Floor Telemetry Console */}
              <aside
                className="ex-console"
                aria-label="Nine-year operational telemetry and pillar jump index"
              >
                <div className="ex-console-header">
                  <div className="ex-console-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span>FLOOR TELEMETRY // ALL BRANDS</span>
                  <span>VERIFIED</span>
                </div>

                <div className="ex-console-quad">
                  <div className="ex-console-stat">
                    <div className="ex-console-num">~21</div>
                    <div className="ex-console-label">People Supervised</div>
                    <div className="ex-console-sub">
                      12–15 direct · 6–9 indirect across Design, Web &amp; Digital
                    </div>
                  </div>
                  <div className="ex-console-stat">
                    <div className="ex-console-num">50+ / 1K+</div>
                    <div className="ex-console-label">Sites &amp; Webpages</div>
                    <div className="ex-console-sub">
                      Institutional, corporate, microsites &amp; +40–50% organic SEO
                    </div>
                  </div>
                  <div className="ex-console-stat">
                    <div className="ex-console-num">1,000+</div>
                    <div className="ex-console-label">Print &amp; Digital Assets</div>
                    <div className="ex-console-sub">
                      ₹30–40L print vendor budget · 200-pg brochure in 1 day
                    </div>
                  </div>
                  <div className="ex-console-stat">
                    <div className="ex-console-num">150+</div>
                    <div className="ex-console-label">Decks &amp; AI Funnels</div>
                    <div className="ex-console-sub">
                      Govt. accreditor demo · Daily CSV AI funnels · 3-day launch in 72h
                    </div>
                  </div>
                </div>

                <div className="ex-console-index">
                  <div className="ex-console-index-title">
                    <span>JUMP TO FUNCTIONAL PILLAR</span>
                    <span>01 — 08</span>
                  </div>
                  <div className="ex-console-links">
                    {experiencePillars.map((p) => (
                      <a
                        key={p.id}
                        href={`#${p.id}`}
                        className="ex-console-link"
                      >
                        <span className="ex-console-link-idx">{p.index}</span>
                        <span className="ex-console-link-text">
                          {p.titleSans} {p.titleSerif}
                        </span>
                        <span
                          className="ex-console-link-arrow"
                          aria-hidden="true"
                        >
                          ↘
                        </span>
                      </a>
                    ))}
                    <a href="#honest-postscript" className="ex-console-link">
                      <span className="ex-console-link-idx">
                        {experiencePostscript.index}
                      </span>
                      <span className="ex-console-link-text">
                        {experiencePostscript.titleSans}{" "}
                        {experiencePostscript.titleSerif}
                      </span>
                      <span
                        className="ex-console-link-arrow"
                        aria-hidden="true"
                      >
                        ↘
                      </span>
                    </a>
                  </div>
                </div>
              </aside>
            </div>

            {/* Visible Entity Disambiguation Callout */}
            <aside
              className="ex-disambiguation"
              aria-label={experienceHero.disambiguation.heading}
            >
              <div className="ex-disambig-badge">
                <span>ENTITY DISAMBIGUATION</span>
                <strong>{experienceHero.disambiguation.heading}</strong>
              </div>
              <p className="ex-disambig-copy">
                {experienceHero.disambiguation.identify}{" "}
                <span>{experienceHero.disambiguation.negate}</span>
              </p>
            </aside>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════════
            REGISTER 2 — SECTION 01: THE CAREER-WIDE LEDGER (WARM PAPER)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="career-ledger"
          className="ex-ledger-section"
          aria-labelledby="ex-ledger-heading"
        >
          <div className="ex-container">
            <div className="ex-section-header">
              <div className="ex-kicker-paper">
                <span>00 / THE NINE-YEAR LEDGER</span>
              </div>
              <h2 id="ex-ledger-heading" className="ex-h2-paper">
                Nine-plus years of brand, web, print, and team operations —{" "}
                <em>compressed into eight checkable numbers.</em>
              </h2>
              <p className="ex-lead-paper">
                Every figure below reflects hands-on production and direct
                supervision across higher-education and sister brands, CBS
                Ventures, Aamrit, Nivea, Raman Byte Pvt Ltd, WOLAMBO, and the
                standalone House of Namus AI product studio.
              </p>
            </div>

            <div className="ex-ledger-frame">
              <div className="ex-ledger-toolbar">
                <span>OPERATIONAL AUDIT TABLE // 2016 — PRESENT</span>
                <span>8 VERIFIED CAREER METRICS</span>
              </div>

              <table className="ex-ledger-table">
                <thead>
                  <tr>
                    <th scope="col">Scale Metric</th>
                    <th scope="col">Operational Domain</th>
                    <th scope="col">What Was Actually Done on the Floor</th>
                    <th scope="col">Brands &amp; Organizations</th>
                  </tr>
                </thead>
                <tbody>
                  {experienceLedger.map((row, idx) => (
                    <tr key={row.label}>
                      <td className="ex-ledger-metric-cell">
                        <span className="ex-ledger-metric">{row.metric}</span>
                        <div
                          className="ex-ledger-bar-track"
                          aria-hidden="true"
                        >
                          <div
                            className="ex-ledger-bar-fill"
                            style={{
                              width: `${LEDGER_BAR_WIDTHS[idx] ?? 85}%`,
                            }}
                          />
                        </div>
                      </td>
                      <td className="ex-ledger-label-cell">
                        <div className="ex-ledger-label">{row.label}</div>
                      </td>
                      <td>
                        <div className="ex-ledger-scope">{row.scope}</div>
                      </td>
                      <td className="ex-ledger-where-cell">
                        <span className="ex-ledger-where-pill">
                          {row.where}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            REGISTERS 3 & 4 — INTERACTIVE ATTRIBUTION MATRIX + PILLARS 01–07
            ═══════════════════════════════════════════════════════════════════ */}
        <ExperienceInteractiveFloor />

        {/* ═══════════════════════════════════════════════════════════════════
            REGISTER 5 — PILLAR 08: THE HONEST POSTSCRIPT (2:14 AM FLOOR)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="honest-postscript"
          className="ex-postscript-section"
          aria-labelledby="ex-postscript-heading"
        >
          <div className="ex-container">
            <div className="ex-postscript-frame">
              <div className="ex-postscript-stamp">
                <span>{experiencePostscript.kicker}</span>
                <span>·</span>
                <span>02:14 AM PRE-PRESS LOG</span>
              </div>

              <div className="ex-pillar-display" aria-hidden="true">
                <span className="ex-pillar-display-sans">
                  {experiencePostscript.titleSans}
                </span>
                <span className="ex-pillar-display-serif">
                  {experiencePostscript.titleSerif}
                </span>
              </div>

              <h2
                id="ex-postscript-heading"
                className="ex-pillar-h2"
                style={{ marginTop: "0.75rem", marginBottom: "1.35rem" }}
              >
                {experiencePostscript.subheading}
              </h2>

              <p className="ex-lead-dark" style={{ maxWidth: "72ch" }}>
                {experiencePostscript.lead}
              </p>

              <div className="ex-postscript-grid">
                {experiencePostscript.items.map((item, idx) => (
                  <article key={item.label} className="ex-postscript-card">
                    <div className="ex-postscript-card-idx">
                      FIELD LOG 08.{idx + 1}
                    </div>
                    <h3 className="ex-postscript-card-title">{item.label}</h3>
                    <p className="ex-postscript-card-text">{item.text}</p>
                  </article>
                ))}
              </div>

              <blockquote className="ex-postscript-quote">
                <p>“{experiencePostscript.closer}”</p>
                <footer>
                  — SUMAN DEBNATH · WHY NINE YEARS OF MARKETING OPERATIONS LED
                  TO HOUSE OF NAMUS
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            REGISTER 6 — VERIFICATION & BRIDGE STRIP
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="ex-bridge-section"
          aria-labelledby="ex-bridge-heading"
        >
          <div className="ex-container">
            <div className="ex-kicker-dark">
              <span>09 / CONTINUE THE RECORD</span>
            </div>
            <h2 id="ex-bridge-heading" className="ex-h2-dark">
              Where the nine-year floor record{" "}
              <em>connects to the rest of the work.</em>
            </h2>

            <div className="ex-bridge-grid">
              <Link href="/resume" className="ex-bridge-card">
                <div>
                  <div className="ex-bridge-kicker">CHRONOLOGICAL RECORD</div>
                  <h3 className="ex-bridge-title">Curriculum Vitae (/resume)</h3>
                  <p className="ex-bridge-desc">
                    Employer-by-employer timeline, education (MBA · BCA),
                    certifications, and downloadable print CV.
                  </p>
                </div>
                <span className="ex-bridge-cta">Open /resume →</span>
              </Link>

              <Link href="/projects" className="ex-bridge-card">
                <div>
                  <div className="ex-bridge-kicker">WHAT THE GRIND BUILT</div>
                  <h3 className="ex-bridge-title">
                    21+ AI-Native Products (/projects)
                  </h3>
                  <p className="ex-bridge-desc">
                    ROASmind, IMPRINT, LEGATUS, PentaCMD-47M, MIGI, and the
                    marketing &amp; systems tools built after hours.
                  </p>
                </div>
                <span className="ex-bridge-cta">Explore /projects →</span>
              </Link>

              <Link href="/profile" className="ex-bridge-card">
                <div>
                  <div className="ex-bridge-kicker">FLAGSHIP NUMBERS</div>
                  <h3 className="ex-bridge-title">
                    Track Record &amp; Proof (/profile)
                  </h3>
                  <p className="ex-bridge-desc">
                    Verified benchmarks across AI models, autonomous agents, and
                    brand leadership.
                  </p>
                </div>
                <span className="ex-bridge-cta">Open /profile →</span>
              </Link>

              <Link href="/contact" className="ex-bridge-card">
                <div>
                  <div className="ex-bridge-kicker">DIRECT LINE</div>
                  <h3 className="ex-bridge-title">Start a Conversation</h3>
                  <p className="ex-bridge-desc">
                    Hiring for brand/marketing leadership, AI workflow
                    consulting, or product engineering in Pune or remote.
                  </p>
                </div>
                <span className="ex-bridge-cta">Reach out →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CLOSING SEQUENCE — PageFaq + RelatedPages + Contact
            ═══════════════════════════════════════════════════════════════════ */}
        <PageFaq href="/experience" variant="dark" surface="#080706" />
        <RelatedPages href="/experience" variant="dark" surface="#080706" />
      </main>

      <Contact
        closingBg="linear-gradient(180deg, #171108 0%, #1F1408 14%, #0E0905 58%, #050505 100%)"
        glowColor="rgba(245,158,11,0.20)"
        hazeColor="rgba(217,119,6,0.10)"
      />
    </MotionProvider>
  );
}
