import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ImprintDossier from "@/components/sections/ImprintDossier";
import LegatusDossier from "@/components/sections/LegatusDossier";
import CiteDossier from "@/components/sections/CiteDossier";
import RoasmindDossier from "@/components/sections/RoasmindDossier";
import GeekCollectiblesDossier from "@/components/sections/GeekCollectiblesDossier";
import EmberDossier from "@/components/sections/EmberDossier";
import Contact from "@/components/sections/Contact";
import {
  projects,
  getProject,
  softwareApplicationJsonLd,
  SITE_URL,
} from "@/lib/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} — ${project.positioning}`;
  const url = `${SITE_URL}/projects/${project.slug}`;

  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${title} · Suman Debnath`,
      description: project.description,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Suman Debnath`,
      description: project.description,
      images: ["/og-image.png"],
    },
  };
}

function renderDossier(slug: string) {
  switch (slug) {
    case "imprint":
      return <ImprintDossier />;
    case "legatus":
      return <LegatusDossier />;
    case "cite":
      return <CiteDossier />;
    case "roasmind":
      return <RoasmindDossier />;
    case "geek-collectibles":
      return <GeekCollectiblesDossier />;
    case "ember":
      return <EmberDossier />;
    default:
      return null;
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const jsonLd = softwareApplicationJsonLd(project);

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
        name: "Projects",
        item: `${SITE_URL}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${SITE_URL}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <Navigation />

      <main className="bg-black pt-32 pb-12 px-4 md:px-8">
        <header className="max-w-5xl mx-auto mb-10 text-white">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-4">
            {project.number} / Selected System
          </p>
          <h1 className="font-manrope font-semibold text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-4">
            {project.name}
          </h1>
          <p className="font-serif italic text-lg md:text-2xl text-white/70 max-w-3xl">
            {project.positioning}
          </p>
          <p className="font-manrope text-[15px] md:text-base text-white/60 max-w-3xl mt-6 leading-[1.8]">
            {project.description}
          </p>
        </header>

        <div className="max-w-7xl mx-auto">{renderDossier(project.slug)}</div>
      </main>

      <Contact />
      <Footer />
    </MotionProvider>
  );
}
