import type { CSSProperties } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import MotionProvider from "@/components/providers/MotionProvider";
import BannerArt from "@/components/ui/BannerArt";
import HeroLock from "@/components/ui/HeroLock";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageFaq from "@/components/ui/PageFaq";
import RelatedPages from "@/components/ui/RelatedPages";
import {
  EXPERIENCE_ANSWER,
  EXPERIENCE_QUESTION,
  TIMELINE_END,
  TIMELINE_START,
  experienceHero,
  experienceMetadata,
  experiencePostscript,
  experienceSchemas,
  experienceTimeline,
  scaleRows,
} from "@/lib/experience";
import "./experience.css";

export const metadata = experienceMetadata;

// The page is prerendered, so "present" is the build date — close enough for a
// bar that runs to the right edge, and it moves forward on every deploy.
const now = new Date();
const NOW = now.getFullYear() + now.getMonth() / 12;
const SPAN = TIMELINE_END - TIMELINE_START;
const pct = (year: number) => `${(((year - TIMELINE_START) / SPAN) * 100).toFixed(2)}%`;
const YEARS = Array.from({ length: SPAN }, (_, i) => TIMELINE_START + i);

export default function ExperiencePage() {
  return (
    <MotionProvider>
      {experienceSchemas.map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navigation />

      <main className="ex-root">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="ex-hero sd-banner-host" aria-labelledby="ex-question">
          <BannerArt seed="/experience" accent="#F59E0B" />
          <HeroLock />

          <div className="ex-wrap">
            <Breadcrumbs trail={[{ label: "Experience", href: "/experience" }]} />

            <p className="ex-kicker">{experienceHero.kicker}</p>

            <p className="ex-display">
              <span className="ex-display-sans">{experienceHero.display.sans}</span>{" "}
              <span className="ex-display-serif">{experienceHero.display.serif}</span>
            </p>

            <h1 id="ex-question" className="ex-question">
              {EXPERIENCE_QUESTION}
            </h1>
            <p className="ex-answer">{EXPERIENCE_ANSWER}</p>

            <dl className="ex-stats">
              {experienceHero.stats.map((s) => (
                <div key={s.label} className="ex-stat">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="ex-hero-foot">
              <p className="ex-standfirst">{experienceHero.standfirst}</p>
              <div className="ex-actions">
                <a href="#scale" className="ex-btn ex-btn-primary">
                  The seven numbers <span aria-hidden="true">↓</span>
                </a>
                <Link href="/resume" className="ex-btn ex-btn-ghost">
                  Chronological résumé <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Timeline (paper) ─────────────────────────────────────────── */}
        <section id="timeline" className="ex-timeline" aria-labelledby="ex-timeline-h">
          <div className="ex-wrap">
            <p className="ex-kicker ex-kicker-ink">Where it happened</p>
            <h2 id="ex-timeline-h" className="ex-h2 ex-h2-ink">
              Most of it happened at one employer,{" "}
              <em>from March 2019 to today.</em>
            </h2>

            <div className="ex-gantt">
              <div className="ex-gantt-axis" aria-hidden="true">
                {YEARS.map((y) => (
                  <span key={y} style={{ left: pct(y) }}>
                    {`’${String(y).slice(2)}`}
                  </span>
                ))}
              </div>

              <ol className="ex-gantt-rows">
                {experienceTimeline.map((row) => (
                  <li
                    key={row.org}
                    className={`ex-gantt-row is-${row.kind}`}
                    style={{ "--bar": row.accent } as CSSProperties}
                  >
                    <div className="ex-gantt-text">
                      <span className="ex-gantt-period">{row.period}</span>
                      <span className="ex-gantt-role">{row.role}</span>
                      <span className="ex-gantt-org">{row.org}</span>
                    </div>
                    <div className="ex-gantt-track" aria-hidden="true">
                      <span
                        className={`ex-gantt-bar${row.end === null ? " is-open" : ""}`}
                        style={{
                          left: pct(row.start),
                          width: `calc(${pct(row.end ?? NOW)} - ${pct(row.start)})`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="ex-timeline-note">
              Education, certifications and every role in order are on the{" "}
              <Link href="/resume">résumé</Link>. The story behind WOLAMBO is on{" "}
              <Link href="/journey">the journey page</Link>.
            </p>
          </div>
        </section>

        {/* ── The scale wall ───────────────────────────────────────────── */}
        <section id="scale" className="ex-wall" aria-labelledby="ex-wall-h">
          <div className="ex-wrap">
            <p className="ex-kicker">Seven numbers</p>
            <h2 id="ex-wall-h" className="ex-h2">
              Each number, once, <em>with the work behind it.</em>
            </h2>

            <nav className="ex-index" aria-label="Jump to a number">
              {scaleRows.map((row) => (
                <a
                  key={row.id}
                  href={`#${row.id}`}
                  style={{ "--row": row.accent } as CSSProperties}
                >
                  <span className="ex-index-fig">{row.figure}</span>
                  <span className="ex-index-unit">{row.unit}</span>
                </a>
              ))}
            </nav>

            <div className="ex-rows">
              {scaleRows.map((row) => (
                <article
                  key={row.id}
                  id={row.id}
                  className="ex-row"
                  style={{ "--row": row.accent } as CSSProperties}
                  aria-labelledby={`${row.id}-h`}
                >
                  <div className="ex-row-figure">
                    <span className="ex-row-num">{row.figure}</span>
                    <span className="ex-row-unit">{row.unit}</span>
                  </div>
                  <div className="ex-row-body">
                    <h3 id={`${row.id}-h`} className="ex-row-h">
                      {row.heading}
                    </h3>
                    {row.body.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
                    ))}
                    <dl className="ex-facts">
                      {row.facts.map((f) => (
                        <div key={f.label}>
                          <dt>{f.label}</dt>
                          <dd>{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Postscript (solid amber) ─────────────────────────────────── */}
        <section
          id={experiencePostscript.id}
          className="ex-post"
          aria-labelledby="ex-post-h"
        >
          <div className="ex-wrap ex-post-grid">
            <div>
              <p className="ex-kicker ex-kicker-ink">What job descriptions leave out</p>
              <h2 id="ex-post-h" className="ex-h2 ex-h2-ink">
                {experiencePostscript.sans} <em>{experiencePostscript.serif}</em>
              </h2>
              <p className="ex-post-lead">{experiencePostscript.lead}</p>
            </div>
            <div>
              <ul className="ex-post-list">
                {experiencePostscript.items.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label}.</strong> {item.text}
                  </li>
                ))}
              </ul>
              <blockquote className="ex-post-quote">
                <p>{experiencePostscript.closer}</p>
              </blockquote>
            </div>
          </div>
        </section>

        <PageFaq href="/experience" variant="dark" surface="#0B0907" />
        <RelatedPages href="/experience" variant="dark" surface="#0B0907" />
      </main>

      <Contact
        closingBg="linear-gradient(180deg, #0B0907 0%, #1A1208 18%, #0E0905 60%, #050505 100%)"
        glowColor="rgba(245,158,11,0.20)"
        hazeColor="rgba(217,119,6,0.10)"
      />
    </MotionProvider>
  );
}
