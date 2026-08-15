import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import { SITE_URL } from "@/lib/projects";
import "./resume.css";
import {
  additionalProjects,
  beyondTheResume,
  certifications,
  coreSkills,
  earlierExperience,
  education,
  experience,
  flagshipProjects,
  identity,
  projectsPreamble,
  RESUME_PDF,
  RESUME_UPDATED,
  RESUME_UPDATED_LABEL,
  summary,
  targetRoles,
  type ResumeProject,
} from "@/lib/resume";

export const metadata: Metadata = {
  title: { absolute: `${identity.name} — Résumé | ${identity.headline}` },
  description:
    "The full résumé of Suman Debnath: 9+ years in brand and product marketing, 2+ years shipping AI-native products — a 44-agent autonomous fleet, a 47M-parameter language model trained from scratch, and 21 live systems.",
  alternates: { canonical: "/resume" },
  keywords: [
    "Suman Debnath resume",
    "Suman Debnath CV",
    "Senior Brand Marketing Manager resume",
    "AI Product Manager resume",
    "AI Product Marketing Manager",
    "product marketing manager Pune",
    "marketer who builds AI products",
  ],
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/resume`,
    title: `${identity.name} — Résumé`,
    description:
      "9+ years scaling brands, 2+ years shipping AI-native products. The full record, on one page.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — Résumé`,
    description:
      "9+ years scaling brands, 2+ years shipping AI-native products. The full record, on one page.",
  },
};

/* ── Structured data ──────────────────────────────────────────────────────
   The root layout already publishes a rich Person node at ${SITE_URL}/#person.
   Rather than compete with it, the Person block below reuses that same @id so
   a consumer merges the two into one entity — this page contributes only the
   employment history the global node was missing. Compensation is deliberately
   absent here as everywhere else.                                          */

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/resume#profilepage`,
  url: `${SITE_URL}/resume`,
  name: `${identity.name} — Résumé`,
  dateModified: RESUME_UPDATED,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
  about: { "@id": `${SITE_URL}/#person` },
  significantLink: [`${SITE_URL}/projects`, `${SITE_URL}/contact`],
};

const personSupplementJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  jobTitle: identity.headline,
  description: summary,
  subjectOf: { "@id": `${SITE_URL}/resume#profilepage` },
  seeks: targetRoles.map((role) => ({ "@type": "Demand", name: role })),
  hasOccupation: experience.map((role) => ({
    "@type": "Occupation",
    name: role.title,
    occupationLocation: { "@type": "City", name: role.location },
    description: role.bullets.map((b) => b.text).join(" "),
  })),
  worksFor: experience
    .filter((r) => r.current)
    .map((r) => ({ "@type": "Organization", name: r.org })),
};

const creativeWorkJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI products built by Suman Debnath",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: flagshipProjects.length + additionalProjects.length,
  itemListElement: [...flagshipProjects, ...additionalProjects].map(
    (project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.name,
        description: project.built,
        applicationCategory: "BusinessApplication",
        author: { "@id": `${SITE_URL}/#person` },
        ...(project.external ? { url: project.external } : {}),
        ...(project.href ? { sameAs: `${SITE_URL}${project.href}` } : {}),
      },
    }),
  ),
};

const breadcrumbsJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Résumé", item: `${SITE_URL}/resume` },
  ],
};

/* ── Masthead figures ─────────────────────────────────────────────────────
   Every one of these is stated in the résumé. They are set in the dark
   register's monospace while still on paper — the first hint that the
   document has a second half. Two from each side, deliberately.           */
const TICKER = [
  { n: "9+", l: "Years leading brand & product marketing" },
  { n: "40–50%", l: "Website traffic growth delivered" },
  {
    n: String(flagshipProjects.length + additionalProjects.length),
    l: "AI products built independently",
  },
  { n: "44", l: "Autonomous agents in one fleet" },
];

/* ── Bits ─────────────────────────────────────────────────────────────── */

/**
 * A project name that links to its page on this site where one exists, and to
 * the live product where it doesn't. Half the point of publishing the résumé as
 * a page rather than a PDF is that every product becomes a real internal link.
 */
function ProjectName({ project }: { project: ResumeProject }) {
  if (project.href) return <Link href={project.href}>{project.name}</Link>;
  if (project.external) {
    return (
      <a href={project.external} target="_blank" rel="noopener noreferrer">
        {project.name} <span aria-hidden>↗</span>
      </a>
    );
  }
  return <>{project.name}</>;
}

function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="rz-eyebrow">
      {index} / {children}
    </p>
  );
}

/** The three skill columns shift register left to right, warm to cool. */
const SKILL_TONE = ["rz-skill--warm", "rz-skill--mid", "rz-skill--cool"];

export default function ResumePage() {
  return (
    <MotionProvider>
      {[
        profilePageJsonLd,
        personSupplementJsonLd,
        creativeWorkJsonLd,
        breadcrumbsJsonLd,
      ].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navigation />

      <main className="rz">
        {/* ── Masthead ──────────────────────────────────────────────────── */}
        <header id="tour-resume-top" className="rz-mast">
          <div className="rz-shell">
            <p className="rz-eyebrow" style={{ color: "var(--clay)" }}>
              Résumé — {identity.targeting}
            </p>

            <h1 className="rz-name">
              Suman
              <br />
              Debnath
            </h1>

            <p className="rz-role">
              Senior Brand Marketing <em>&</em> AI Product Marketing Leader
            </p>

            <div className="rz-contact">
              <a href={identity.phoneHref}>{identity.phone}</a>
              <span className="sep">·</span>
              <a href={`mailto:${identity.email}`}>{identity.email}</a>
              <span className="sep">·</span>
              <span>{identity.location}</span>
              <span className="sep">·</span>
              <span>{identity.availability}</span>
              <span className="sep">·</span>
              <span>{identity.noticePeriod} notice</span>
            </div>

            <div className="rz-actions">
              <a href={RESUME_PDF} download className="rz-btn rz-btn-solid">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </a>
              <Link href="/contact" className="rz-btn rz-btn-ghost">
                Get in touch
              </Link>
              <Link href="/projects" className="rz-btn rz-btn-ghost">
                See the systems
              </Link>
            </div>

            <div className="rz-ticker">
              {TICKER.map((t) => (
                <div key={t.l} className="rz-tick">
                  <p className="rz-tick-n">{t.n}</p>
                  <p className="rz-tick-l">{t.l}</p>
                </div>
              ))}
            </div>

            <p className="rz-updated">Last updated: {RESUME_UPDATED_LABEL}</p>
          </div>
        </header>

        {/* ── 01 · Who I am ─────────────────────────────────────────────── */}
        <section className="rz-warm">
          <div className="rz-shell">
            <Eyebrow index="01">Positioning</Eyebrow>
            <h2 className="rz-h2">Who I am &amp; the value I bring</h2>
            <p className="rz-lede">{summary}</p>

            <p className="rz-eyebrow" style={{ color: "var(--clay)", marginTop: "3rem" }}>
              Targeting
            </p>
            <ul
              className="rz-skill rz-skill--warm"
              style={{ padding: 0, background: "transparent", marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.4rem", listStyle: "none" }}
            >
              {targetRoles.map((role) => (
                <li key={role} style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "12.5px", padding: "0.32rem 0.7rem", borderRadius: "999px", border: "1px solid var(--rule-warm)", background: "rgba(255,255,255,0.45)", color: "var(--ink-soft)" }}>
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 02 · Core skills ──────────────────────────────────────────── */}
        <section className="rz-warm">
          <div className="rz-shell">
            <Eyebrow index="02">Capability</Eyebrow>
            <h2 className="rz-h2">Core skills</h2>
          </div>
          {/* Full-bleed, because the third column is already the other register
              and a contained card would read as decoration rather than a shift. */}
          <div className="rz-shell" style={{ marginTop: 0 }}>
            <div className="rz-skills">
              {coreSkills.map((group, i) => (
                <div key={group.group} className={`rz-skill ${SKILL_TONE[i] ?? SKILL_TONE[0]}`}>
                  <h3>{group.group}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 · Experience ───────────────────────────────────────────── */}
        <section className="rz-warm">
          <div className="rz-shell">
            <Eyebrow index="03">Track record</Eyebrow>
            <h2 className="rz-h2">Professional experience</h2>

            {experience.map((role) => (
              <article key={`${role.title}-${role.org}`} className="rz-role-block">
                <div className="rz-role-head">
                  <h3 className="rz-role-title">{role.title}</h3>
                  <p className="rz-role-when">{role.period}</p>
                </div>
                <p className="rz-role-org">
                  {role.org} · {role.location}
                </p>
                <ul className="rz-bullets">
                  {role.bullets.map((b) => (
                    <li key={b.text} className="rz-bullet">
                      {b.label && <b>{b.label}</b>}
                      <p>{b.text}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="rz-earlier">
              <b>Earlier experience</b>
              {earlierExperience}
            </div>
          </div>
        </section>

        {/* ── The seam ──────────────────────────────────────────────────────
            The document pivots here: everything above is what he did inside
            companies, everything below is what he built alone. The résumé's
            own thesis sentence is set twice at identical coordinates and cut
            along complementary halves of one diagonal, so the words carry
            across the divide rather than stopping at it. */}
        <div className="rz-seam">
          {/* Establishes the section's height; the quote is layered over it. */}
          <div className="rz-shell rz-seam-inner">
            <p className="rz-seam-note">
              Below this line: built alone, start to finish
            </p>
          </div>

          {/* Two copies at identical coordinates, cut along complementary
              halves of the one diagonal. Only the second is read aloud. */}
          <div className="rz-quote-stack">
            <div className="rz-quote rz-quote--under" aria-hidden="true">
              <div className="rz-quote-wrap">
                <p>
                  &hellip;it is someone who understands <em>both</em> from the inside.
                </p>
              </div>
            </div>
            <div className="rz-quote rz-quote--over">
              <div className="rz-quote-wrap">
                <p>
                  &hellip;it is someone who understands <em>both</em> from the inside.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 04 · AI products ──────────────────────────────────────────── */}
        <section id="products" className="rz-dark">
          <div className="rz-shell">
            <Eyebrow index="04">Independent / self-initiated</Eyebrow>
            <h2 className="rz-h2">AI products built</h2>
            <p className="rz-lede">{projectsPreamble}</p>

            <p className="rz-eyebrow" style={{ color: "var(--emerald)", marginTop: "3rem" }}>
              Flagship projects
            </p>

            <div className="rz-flagships">
              {flagshipProjects.map((project) => (
                <article key={project.name} className="rz-flag">
                  <div className="rz-flag-head">
                    <h3 className="rz-flag-name">
                      <ProjectName project={project} />
                    </h3>
                    {project.status && (
                      <span
                        className={`rz-status ${
                          project.status.toLowerCase() === "live"
                            ? "rz-status--live"
                            : "rz-status--testing"
                        }`}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>
                  <div className="rz-kv">
                    {project.problem && (
                      <div className="rz-kv-row">
                        <span className="rz-kv-k">Problem</span>
                        <p className="rz-kv-v">{project.problem}</p>
                      </div>
                    )}
                    <div className="rz-kv-row rz-kv-row--built">
                      <span className="rz-kv-k">Built</span>
                      <p className="rz-kv-v">{project.built}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="rz-eyebrow" style={{ color: "var(--cyan)", marginTop: "3.5rem" }}>
              Additional projects
            </p>

            <ol className="rz-index">
              {additionalProjects.map((project, i) => (
                <li key={project.name}>
                  <div className="rz-idx">
                    <span className="rz-idx-n">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="rz-idx-name">
                      <ProjectName project={project} />
                    </h3>
                    <p className="rz-idx-d">{project.built}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 05 · Education ────────────────────────────────────────────── */}
        {/* The converged register. Both halves are already present in this
            section of the résumé itself — Oxford's Generative & Agentic AI sits
            directly above an English Honours degree — so neither typeface wins. */}
        <section className="rz-soil">
          <div className="rz-shell">
            <Eyebrow index="05">Foundations</Eyebrow>
            <h2 className="rz-h2">Education</h2>
            <ul className="rz-edu">
              {education.map((entry) => (
                <li key={entry.qualification}>
                  <div>
                    <p className="rz-edu-q">{entry.qualification}</p>
                    <p className="rz-edu-i">{entry.institution}</p>
                  </div>
                  <p className="rz-edu-y">{entry.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 06 · Continuous learning ──────────────────────────────────── */}
        <section className="rz-soil" style={{ paddingTop: 0 }}>
          <div className="rz-shell">
            <Eyebrow index="06">Continuous learning</Eyebrow>
            <h2 className="rz-h2">Certifications</h2>
            <div className="rz-certs">
              {certifications.map((group) => (
                <div key={group.issuer} className="rz-cert">
                  <h3>
                    {group.issuer}
                    {group.period && <span>{group.period}</span>}
                  </h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Beyond the résumé ─────────────────────────────────────────── */}
        {/* Marked as an addition rather than blended in — the document above is
            the document, and this is not part of it. */}
        <section className="rz-beyond">
          <div className="rz-shell">
            <p className="rz-eyebrow" style={{ color: "var(--clay)" }}>
              Not on the PDF
            </p>
            <h2 className="rz-h2">What two pages didn&apos;t have room for</h2>
            <p className="rz-beyond-note">
              ↓ Everything above is the résumé, verbatim. This part isn&apos;t.
            </p>
            <div className="rz-cards">
              {beyondTheResume.map((project) => (
                <Link key={project.name} href={project.href!} className="rz-card">
                  <span className="rz-card-t">
                    {project.name}
                    <span aria-hidden>→</span>
                  </span>
                  <span className="rz-card-d">{project.built}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── The story under the document ──────────────────────────────── */}
        {/* Placed here on purpose: by this point the reader has the whole record
            and none of the reason for it. The résumé cannot carry that, because
            a résumé is a list of outcomes with every wrong turn edited out — and
            the wrong turns are the story. So it gets its own page, and this is
            the door. */}
        <section className="rz-journey">
          <div className="rz-shell">
            <Link href="/journey" className="rz-journey-card">
              <span className="rz-journey-copy">
                <span className="rz-journey-eyebrow">The long version</span>
                <span className="rz-journey-h">
                  Something you won&apos;t find in my resume.
                </span>
                <span className="rz-journey-d">
                  Seventeen years, from a boy who could not put one correct English
                  sentence together to someone who ships AI products alone. A tutor
                  who arrived by accident. A Lamborghini fan page that reached
                  677,503 people. Four months that are a gap between two dates up
                  there, and were not a gap to live through.
                </span>
                <span className="rz-journey-go">
                  <span>Walk it with me</span>
                  <span aria-hidden>→</span>
                </span>
                <span className="rz-journey-meta">
                  16 chapters · interactive · about 8 minutes · a plain-text version
                  is on the page
                </span>
              </span>

              {/* The opening drawing, given its own column. It was a CSS
                  background before, which put the figure and the horizon straight
                  through the headline and the paragraph. */}
              <span className="rz-journey-art" aria-hidden="true">
                <Image
                  src="/journey-art/prologue.png"
                  alt=""
                  width={1536}
                  height={1024}
                  sizes="(max-width: 820px) 90vw, 24rem"
                />
              </span>
            </Link>
          </div>
        </section>

        {/* ── Closing ───────────────────────────────────────────────────── */}
        <section className="rz-cta">
          <div className="rz-shell">
            <h2>Read it, or talk to it.</h2>
            <p>
              Everything above is also loaded into the assistant on this site — ask
              it anything and it answers from this exact record. Or skip straight to
              a conversation.
            </p>
            <div className="rz-actions">
              <Link href="/contact" className="rz-btn rz-btn-solid">
                Start a conversation
              </Link>
              <a href={RESUME_PDF} download className="rz-btn rz-btn-ghost">
                Download the PDF
              </a>
              <Link href="/learnings" className="rz-btn rz-btn-ghost">
                See the certificates
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Contact />
    </MotionProvider>
  );
}
