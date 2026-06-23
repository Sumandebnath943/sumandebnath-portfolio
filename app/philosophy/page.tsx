import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import AIPhilosophy from "@/components/sections/AIPhilosophy";
import PhilosophyFAQ from "@/components/sections/PhilosophyFAQ";
import Contact from "@/components/sections/Contact";
import { SITE_URL } from "@/lib/projects";

export const metadata: Metadata = {
  title: "AI-Native Operating Philosophy",
  description:
    "The six operating principles shaping every system, workflow, and decision Suman Debnath builds — from 'intelligence is infrastructure' to 'the operator evolves'.",
  alternates: { canonical: "/philosophy" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/philosophy`,
    title: "AI-Native Operating Philosophy · Suman Debnath",
    description:
      "Six operating principles shaping every AI-native system Suman Debnath builds.",
    images: ["/og-image.png"],
  },
};

const breadcrumbsJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Philosophy", item: `${SITE_URL}/philosophy` },
  ],
};

export default function PhilosophyPage() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <Navigation />
      <main className="bg-white">
        <div className="pt-32" />
        <AIPhilosophy />
        <PhilosophyFAQ />
      </main>
      <Contact />
      <Footer />
    </MotionProvider>
  );
}
