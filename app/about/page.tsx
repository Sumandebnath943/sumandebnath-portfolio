import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Experience from "@/components/sections/Experience";
import SystemsStack from "@/components/sections/SystemsStack";
import OperationalHistory from "@/components/sections/OperationalHistory";
import AcademicFoundations from "@/components/sections/AcademicFoundations";
import Contact from "@/components/sections/Contact";
import { SITE_URL } from "@/lib/projects";

export const metadata: Metadata = {
  title: { absolute: "From Brand Marketing to AI Products — Suman Debnath" },
  description:
    "A decade leading brand & digital marketing, then building AI-native products. The full transition story behind a rare marketing-plus-AI profile.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    title: "From Brand Marketing to AI Products — Suman Debnath",
    description:
      "A decade in brand & digital marketing, evolved into hands-on AI-native product engineering.",
    images: ["/og-image.png"],
  },
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/about`,
  mainEntity: { "@id": `${SITE_URL}/#person` },
};

const breadcrumbsJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
  ],
};

export default function AboutPage() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <Navigation />

      <main className="bg-black">
        <header className="max-w-5xl mx-auto px-6 md:px-10 pt-40 pb-16 text-white">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-6">
            About
          </p>
          <h1 className="font-manrope font-semibold text-4xl md:text-6xl leading-tight tracking-tight mb-8">
            Suman Debnath —{" "}
            <span className="font-serif italic font-normal text-white/70">
              from branding to AI-native systems.
            </span>
          </h1>
          <p className="font-manrope text-[15px] md:text-lg text-white/70 leading-[1.8] max-w-3xl">
            A decade as an operator across consumer brands, paid acquisition, and
            campaign systems — then a deliberate evolution into AI-native product
            engineering. Today: AI-native product builder, AI generalist, and
            AI-native software developer working at the intersection of design,
            strategy, automation, and full-stack AI engineering.
          </p>
        </header>

        <Experience />
        <SystemsStack />
        <OperationalHistory />
        <AcademicFoundations />
      </main>

      <Contact />
      <Footer />
    </MotionProvider>
  );
}
