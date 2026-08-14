import type { Metadata } from "next";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import { SITE_URL } from "@/lib/projects";
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
    "The full résumé of Suman Debnath: 9+ years in brand and product marketing, 2+ years shipping AI-native products — a 44-agent autonomous fleet, a 47M-parameter language model trained from scratch, and 20+ live systems.",
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
  seeks: targetRoles.map((role) => ({
    "@type": "Demand",
    name: role,
  })),
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

/* ── Shared type styles ─────────────────────────────────────────────────── */

const SECTION = "max-w-4xl mx-auto px-6 md:px-10 py-12 border-t border-black/[0.07]";
const EYEBROW =
  "font-mono text-[10px] uppercase tracking-[0.34em] text-[#86868B] mb-5";
const H2 =
  "font-manrope font-semibold text-2xl md:text-[28px] tracking-tight text-[#1D1D1F] mb-7";
const BODY = "font-manrope text-[15px] md:text-[16px] text-[#3a3a3f] leading-[1.85]";

/** One résumé section, with the printed-document numbering the site uses. */
function Section({
  index,
  eyebrow,
  title,
  children,
  id,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={SECTION}>
      <p className={EYEBROW}>
        {index} / {eyebrow}
      </p>
      <h2 className={H2}>{title}</h2>
      {children}
    </section>
  );
}

/**
 * A project name that links to its page on this site where one exists, and to
 * the live product where it doesn't. Half the point of publishing the résumé as
 * a page rather than a PDF is that every product becomes a real internal link.
 */
function ProjectName({ project }: { project: ResumeProject }) {
  const className =
    "font-manrope font-semibold text-[15px] text-[#1D1D1F] underline decoration-black/20 underline-offset-[5px] hover:decoration-[#4da3ff] hover:text-[#0b63c4] transition-colors";

  if (project.href) {
    return (
      <Link href={project.href} className={className}>
        {project.name}
      </Link>
    );
  }
  if (project.external) {
    return (
      <a
        href={project.external}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {project.name} <span className="text-[10px] opacity-45">↗</span>
      </a>
    );
  }
  return (
    <span className="font-manrope font-semibold text-[15px] text-[#1D1D1F]">
      {project.name}
    </span>
  );
}

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

      <main className="bg-[#FBFBF9]">
        {/* ── Masthead ──────────────────────────────────────────────────── */}
        <header
          id="tour-resume-top"
          className="max-w-4xl mx-auto px-6 md:px-10 pt-36 md:pt-40 pb-12"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-6">
            Résumé
          </p>
          <h1 className="font-manrope font-semibold text-4xl md:text-[54px] leading-[1.05] tracking-tight text-[#1D1D1F]">
            {identity.name}
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-[#3a3a3f] mt-4 leading-snug">
            {identity.headline}
          </p>

          {/* Contact line — the same details the PDF prints in its header. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-manrope text-[13px] text-[#4a4a53]">
            <a
              href={identity.phoneHref}
              className="hover:text-[#1D1D1F] transition-colors"
            >
              {identity.phone}
            </a>
            <span className="text-black/20">·</span>
            <a
              href={`mailto:${identity.email}`}
              className="hover:text-[#1D1D1F] transition-colors"
            >
              {identity.email}
            </a>
            <span className="text-black/20">·</span>
            <span>{identity.location}</span>
            <span className="text-black/20">·</span>
            <span>{identity.availability}</span>
            <span className="text-black/20">·</span>
            <span>{identity.noticePeriod} notice</span>
          </div>

          {/* Actions — hidden in print, where they are just dead ink. */}
          <div className="mt-9 flex flex-wrap items-center gap-3 print:hidden">
            <a
              href={RESUME_PDF}
              download
              className="inline-flex items-center gap-2.5 rounded-full bg-[#1A1A1A] px-6 py-3 font-manrope text-[13px] font-semibold text-white transition-colors hover:bg-black"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 font-manrope text-[13px] font-semibold text-[#1D1D1F] transition-colors hover:border-black/30 hover:bg-black/[0.03]"
            >
              Get in touch
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 font-manrope text-[13px] font-semibold text-[#1D1D1F] transition-colors hover:border-black/30 hover:bg-black/[0.03]"
            >
              See the systems
            </Link>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#86868B] mt-9">
            Last updated: {RESUME_UPDATED_LABEL}
          </p>
        </header>

        {/* ── 01 · Positioning ──────────────────────────────────────────── */}
        <Section index="01" eyebrow="Positioning" title="Who I am & the value I bring">
          <p className={BODY}>{summary}</p>

          <p className={`${EYEBROW} mt-10`}>Targeting</p>
          <ul className="flex flex-wrap gap-2">
            {targetRoles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-black/[0.09] bg-white px-3.5 py-1.5 font-manrope text-[12.5px] text-[#3a3a3f]"
              >
                {role}
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 02 · Core skills ──────────────────────────────────────────── */}
        <Section index="02" eyebrow="Capability" title="Core skills">
          <div className="grid gap-8 md:grid-cols-3">
            {coreSkills.map((group) => (
              <div key={group.group}>
                <h3 className="font-manrope font-semibold text-[13px] uppercase tracking-[0.12em] text-[#1D1D1F] mb-3.5">
                  {group.group}
                </h3>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-manrope text-[14px] text-[#4a4a53] leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 03 · Experience ───────────────────────────────────────────── */}
        <Section index="03" eyebrow="Track record" title="Professional experience">
          <div className="space-y-12">
            {experience.map((role) => (
              <article key={`${role.title}-${role.org}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3 className="font-manrope font-semibold text-lg md:text-xl tracking-tight text-[#1D1D1F]">
                    {role.title}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#86868B]">
                    {role.period}
                  </p>
                </div>
                <p className="font-manrope text-[14px] text-[#4a4a53] mb-6">
                  {role.org} · {role.location}
                </p>
                <ul className="space-y-4">
                  {role.bullets.map((b) => (
                    <li key={b.text} className="relative pl-5">
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-black/20"
                      />
                      <p className="font-manrope text-[15px] text-[#3a3a3f] leading-[1.8]">
                        {b.label && (
                          <span className="font-semibold text-[#1D1D1F]">
                            {b.label}:{" "}
                          </span>
                        )}
                        {b.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-11 border-t border-black/[0.07] pt-7">
            <h3 className="font-manrope font-semibold text-[13px] uppercase tracking-[0.12em] text-[#1D1D1F] mb-2.5">
              Earlier experience
            </h3>
            <p className="font-manrope text-[14px] text-[#4a4a53] leading-relaxed">
              {earlierExperience}
            </p>
          </div>
        </Section>

        {/* ── 04 · Flagship products ────────────────────────────────────── */}
        <Section
          index="04"
          eyebrow="Independent / self-initiated"
          title="AI products built"
          id="products"
        >
          <p className={`${BODY} mb-10 max-w-2xl`}>{projectsPreamble}</p>

          <div className="space-y-6">
            {flagshipProjects.map((project) => (
              <article
                key={project.name}
                className="rounded-2xl border border-black/[0.08] bg-white p-6 md:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-4">
                  <h3 className="font-manrope font-semibold text-lg tracking-tight">
                    <ProjectName project={project} />
                  </h3>
                  {project.status && (
                    <span className="rounded-full bg-[#1A1A1A] px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white">
                      {project.status}
                    </span>
                  )}
                </div>
                {project.problem && (
                  <p className="font-manrope text-[14.5px] text-[#5a5a63] leading-[1.75] mb-3">
                    <span className="font-semibold text-[#1D1D1F]">Problem: </span>
                    {project.problem}
                  </p>
                )}
                <p className="font-manrope text-[14.5px] text-[#3a3a3f] leading-[1.75]">
                  <span className="font-semibold text-[#1D1D1F]">Built: </span>
                  {project.built}
                </p>
              </article>
            ))}
          </div>

          <p className={`${EYEBROW} mt-12`}>Additional projects</p>
          <ol className="grid gap-x-8 gap-y-5 md:grid-cols-2">
            {additionalProjects.map((project, i) => (
              <li key={project.name} className="flex gap-3">
                <span className="font-mono text-[11px] text-[#86868B] pt-[3px] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <ProjectName project={project} />
                  <p className="font-manrope text-[13.5px] text-[#5a5a63] leading-[1.65] mt-1">
                    {project.built}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── 05 · Beyond the résumé ────────────────────────────────────── */}
        <Section
          index="05"
          eyebrow="Only on this site"
          title="What the PDF doesn't have room for"
        >
          <p className={`${BODY} mb-9 max-w-2xl`}>
            Two pages is a hard limit, and the work keeps moving. These live here
            instead — each one a full write-up rather than a line item.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {beyondTheResume.map((project) => (
              <Link
                key={project.name}
                href={project.href!}
                className="group rounded-2xl border border-black/[0.08] bg-white p-5 transition-colors hover:border-black/20"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-manrope font-semibold text-[15px] text-[#1D1D1F]">
                    {project.name}
                  </h3>
                  <span
                    aria-hidden
                    className="font-mono text-[13px] text-[#86868B] transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </div>
                <p className="font-manrope text-[13.5px] text-[#5a5a63] leading-[1.65]">
                  {project.built}
                </p>
              </Link>
            ))}
          </div>
        </Section>

        {/* ── 06 · Education ────────────────────────────────────────────── */}
        <Section index="06" eyebrow="Foundations" title="Education">
          <ul className="space-y-5">
            {education.map((entry) => (
              <li
                key={entry.qualification}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
              >
                <div>
                  <p className="font-manrope font-semibold text-[15px] text-[#1D1D1F]">
                    {entry.qualification}
                  </p>
                  <p className="font-manrope text-[13.5px] text-[#5a5a63]">
                    {entry.institution}
                  </p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#86868B]">
                  {entry.period}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 07 · Certifications ───────────────────────────────────────── */}
        <Section index="07" eyebrow="Continuous learning" title="Certifications">
          <div className="grid gap-8 md:grid-cols-2">
            {certifications.map((group) => (
              <div key={group.issuer}>
                <h3 className="font-manrope font-semibold text-[13px] uppercase tracking-[0.12em] text-[#1D1D1F] mb-3">
                  {group.issuer}
                  {group.period && (
                    <span className="ml-2 font-mono text-[10px] font-normal tracking-[0.16em] text-[#86868B]">
                      {group.period}
                    </span>
                  )}
                </h3>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-manrope text-[13.5px] text-[#4a4a53] leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="font-manrope text-[13.5px] text-[#5a5a63] mt-9 print:hidden">
            The full certificate portfolio, with the actual credentials, lives on{" "}
            <Link
              href="/learnings"
              className="underline decoration-black/25 underline-offset-[5px] hover:text-[#1D1D1F]"
            >
              /learnings
            </Link>
            .
          </p>
        </Section>

        {/* ── Closing CTA ───────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 py-14 border-t border-black/[0.07] print:hidden">
          <div className="rounded-3xl bg-[#1A1A1A] px-7 py-10 md:px-11 md:py-12">
            <h2 className="font-manrope font-semibold text-2xl md:text-[30px] tracking-tight text-white mb-3">
              Read it, or talk to it.
            </h2>
            <p className="font-manrope text-[15px] text-white/60 leading-relaxed max-w-lg mb-8">
              Everything above is also loaded into the assistant on this site — ask
              it anything and it answers from this exact record. Or skip straight
              to a conversation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 font-manrope text-[13px] font-semibold text-[#1A1A1A] transition-colors hover:bg-white/90"
              >
                Start a conversation
              </Link>
              <a
                href={RESUME_PDF}
                download
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 font-manrope text-[13px] font-semibold text-white/85 transition-colors hover:border-white/40 hover:text-white"
              >
                Download the PDF
              </a>
            </div>
          </div>
        </section>

        {/* Ctrl+P on a résumé is a reasonable thing to do, so make the result a
            clean document: no site chrome, no dark CTA panel, no card fills,
            and sections that don't split across a page break. */}
        <style>{`
          @media print {
            @page { margin: 14mm; }
            body { background: #fff !important; }
            main { background: #fff !important; }
            header, section, article { break-inside: avoid; page-break-inside: avoid; }
            a { text-decoration: none !important; color: #1D1D1F !important; }
            .print\\:hidden { display: none !important; }
          }
        `}</style>
      </main>

      <Contact variant="light" />
    </MotionProvider>
  );
}
