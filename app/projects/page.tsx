import type { Metadata } from "next";
import BannerArt from "@/components/ui/BannerArt";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import PageFaq from "@/components/ui/PageFaq";
import Contact from "@/components/sections/Contact";
import ArchiveCard from "@/components/sections/ArchiveCard";
import { archiveProjects } from "@/lib/archive-projects";
import { SITE_URL } from "@/lib/projects";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

/* ── The question this page owns ──────────────────────────────────────────────
   "What has Suman Debnath built?" — see AEO_PLAYBOOK §3.1b for the map of which
   page owns which entity query.

   This question was previously a page-FAQ *on this same page*, which is the one
   place it could not usefully sit: an FAQ entry at the foot answering the
   question the page exists to answer, while the page itself was titled "AI
   Products & Tools". The title now carries it and the FAQ has been swapped for
   an adjacent question, because two blocks on one URL competing for the same
   words is the same collision as two URLs.                                   */

const TITLE = "What has Suman Debnath built? — 20+ AI products and systems";

const ANSWER =
  "Suman Debnath has independently built and shipped more than twenty AI-native systems. They include ROASmind, a marketing operating system; IMPRINT, LEGATUS and CITE; a 46-agent autonomous fleet; PentaCMD-47M, a language model trained from scratch; and an audited AI copilot for retail banking. All were designed, built and shipped solo.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    "Suman Debnath has built 20+ AI-native systems alone — ROASmind, IMPRINT, LEGATUS, CITE, a 46-agent autonomous fleet, a language model trained from scratch, and a retail-banking AI copilot.",
  alternates: { canonical: "/projects" },
  keywords: [
    "what has Suman Debnath built",
    "Suman Debnath projects",
    "Suman Debnath AI products",
    "Suman Debnath portfolio",
    "AI products built solo",
    "ROASmind IMPRINT LEGATUS CITE",
  ],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/projects`,
    title: TITLE,
    description: ANSWER,
    images: ["/og-image.png"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: ANSWER },
};

/* The literal query, marked up as a question with an answer. The CollectionPage
   below lists the items; this states the summary a machine can quote without
   having to read and condense twenty cards itself. */
const builtJsonLd = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  "@id": `${SITE_URL}/projects#built`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "Question",
    name: "What has Suman Debnath built?",
    text: "What has Suman Debnath built?",
    answerCount: 1,
    acceptedAnswer: {
      "@type": "Answer",
      text: ANSWER,
      url: `${SITE_URL}/projects`,
    },
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/projects#collection`,
  url: `${SITE_URL}/projects`,
  name: "Project Archive — Suman Debnath",
  description:
    "AI-native tools, systems, experiments, and operational products built through AI-assisted execution.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
  mainEntity: {
    "@type": "ItemList",
    name: "AI-Native Project Archive",
    numberOfItems: archiveProjects.length,
    itemListElement: archiveProjects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.name,
        alternateName: p.positioning,
        description: p.description,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: p.type,
        operatingSystem: "Web",
        url: p.liveUrl ?? p.detailUrl ?? `${SITE_URL}/projects`,
        author: { "@id": `${SITE_URL}/#person` },
        creator: { "@id": `${SITE_URL}/#person` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability:
            p.status === "Live" || p.status === "Active"
              ? "https://schema.org/InStock"
              : "https://schema.org/PreOrder",
        },
      },
    })),
  },
};

/* BreadcrumbList JSON-LD is NOT declared here. <Breadcrumbs> emits it together
   with the visible trail — see components/ui/Breadcrumbs.tsx. Two BreadcrumbList
   nodes on one URL is a conflict, and the one matching what the reader can see
   is the one that should win. */

export default function ProjectsArchivePage() {
  return (
    <MotionProvider>
      {[collectionJsonLd, builtJsonLd].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navigation />

      <main className="bg-[#050505] text-white">
        {/* ── HERO ── */}
        <section
          aria-labelledby="archive-heading"
          className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 md:px-10 overflow-hidden sd-banner-host"
        >
          <BannerArt seed="/projects" accent="#FF3B6B" />
          {/* Restrained atmospheric gradient */}
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_70%)] blur-2xl" />
            <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(123,97,255,0.06)_0%,transparent_70%)] blur-3xl" />
            <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.05)_0%,transparent_70%)] blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <Breadcrumbs
              trail={[
                { label: "Projects", href: "/projects" },
              ]}
              className="mb-6"
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/55 mb-6">
              Archive
            </p>
            <h1
              id="archive-heading"
              className="font-manrope font-semibold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8 max-w-4xl"
            >
              What has Suman Debnath{" "}
              <span className="font-serif italic font-normal text-white/70">
                built
              </span>
              ?
            </h1>

            {/* The extractable answer. A card grid is close to unsummarisable
                for a machine — twenty names and statuses with no sentence tying
                them together — so this states the shape once, in prose, before
                the grid begins. */}
            <p className="font-manrope text-[17px] md:text-lg text-white/75 leading-[1.75] max-w-3xl border-l-2 border-[#FF3B6B] pl-5">
              {ANSWER}
            </p>

            <p className="font-manrope mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">
              A growing ecosystem of AI-native tools, systems, experiments, and
              operational products built through AI-assisted execution.
            </p>

            {/* Subtle stats row */}
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 text-[11px] font-mono uppercase tracking-[0.3em] text-white/55">
              <span>
                <span className="text-white/65">{archiveProjects.length}</span>{" "}
                entries
              </span>
              <span>
                <span className="text-white/65">
                  {archiveProjects.filter((p) => p.status === "Live").length}
                </span>{" "}
                live
              </span>
              <span>
                <span className="text-white/65">
                  {archiveProjects.filter((p) => p.kind === "flagship").length}
                </span>{" "}
                flagship
              </span>
              <span>
                <span className="text-white/65">
                  {archiveProjects.filter((p) => p.kind === "secondary" || p.kind === "lab").length}
                </span>{" "}
                secondary
              </span>
            </div>
          </div>
        </section>

        {/* ── GRID ── */}
        <section className="relative px-6 md:px-10 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
              {archiveProjects.map((p) => (
                <ArchiveCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING STATEMENT ── */}
        <section className="relative px-6 md:px-10 pb-32">
          <div className="max-w-3xl mx-auto text-center border-t border-white/[0.06] pt-20">
            <p className="font-serif italic text-2xl md:text-4xl text-white/85 leading-snug">
              This is not someone building one-off demos.
            </p>
            <p className="font-manrope text-sm md:text-base text-white/60 leading-relaxed mt-8 max-w-xl mx-auto">
              This is an operator continuously building AI-native systems, tools,
              workflows, and operational infrastructure at scale.
            </p>
          </div>
        </section>
      </main>

      <PageFaq href="/projects" />
      <RelatedPages href="/projects" />
      <Contact />
    </MotionProvider>
  );
}
