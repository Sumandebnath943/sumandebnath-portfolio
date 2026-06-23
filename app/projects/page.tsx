import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import ArchiveCard from "@/components/sections/ArchiveCard";
import { archiveProjects } from "@/lib/archive-projects";
import { SITE_URL } from "@/lib/projects";

export const metadata: Metadata = {
  title: { absolute: "AI Products & Tools by Suman Debnath" },
  description:
    "AI-native tools and systems built by a brand marketer turned AI product builder — identity, inheritance, career intelligence, burnout recovery, and more.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/projects`,
    title: "AI Products & Tools by Suman Debnath",
    description:
      "AI-native tools, systems, and operational products built by a brand marketer turned AI product builder.",
    images: ["/og-image.png"],
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

const breadcrumbsJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Project Archive",
      item: `${SITE_URL}/projects`,
    },
  ],
};

export default function ProjectsArchivePage() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <Navigation />

      <main className="bg-[#050505] text-white">
        {/* ── HERO ── */}
        <section
          aria-labelledby="archive-heading"
          className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 md:px-10 overflow-hidden"
        >
          {/* Restrained atmospheric gradient */}
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_70%)] blur-2xl" />
            <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(123,97,255,0.06)_0%,transparent_70%)] blur-3xl" />
            <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.05)_0%,transparent_70%)] blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/35 mb-6">
              Archive
            </p>
            <h1
              id="archive-heading"
              className="font-manrope font-semibold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8 max-w-4xl"
            >
              Project{" "}
              <span className="font-serif italic font-normal text-white/70">
                archive
              </span>
              .
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/55 leading-relaxed max-w-2xl">
              A growing ecosystem of AI-native tools, systems, experiments, and
              operational products built through AI-assisted execution.
            </p>

            {/* Subtle stats row */}
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 text-[11px] font-mono uppercase tracking-[0.3em] text-white/35">
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
            <p className="font-manrope text-sm md:text-base text-white/45 leading-relaxed mt-8 max-w-xl mx-auto">
              This is an operator continuously building AI-native systems, tools,
              workflows, and operational infrastructure at scale.
            </p>
          </div>
        </section>
      </main>

      <Contact />
      <Footer />
    </MotionProvider>
  );
}
