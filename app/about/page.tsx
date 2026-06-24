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
            Nearly a decade leading brand and digital marketing — consumer brands,
            paid acquisition, SEO, and campaign systems — then a deliberate move
            into building AI-native products with my own hands. Today: a Senior
            Brand Marketing Manager who ships AI products, working at the
            intersection of brand strategy, growth, design, automation, and
            full-stack AI engineering.
          </p>
        </header>

        {/* ── Cross-domain narrative — unique to /about (AEO + keyword surface) ── */}
        <section
          aria-labelledby="about-narrative"
          className="max-w-5xl mx-auto px-6 md:px-10 pb-20 md:pb-24 text-white border-t border-white/[0.06] pt-16"
        >
          <h2
            id="about-narrative"
            className="font-manrope font-semibold text-2xl md:text-4xl leading-tight tracking-tight mb-8 max-w-3xl"
          >
            A rare profile:{" "}
            <span className="font-serif italic font-normal text-white/70">
              brand marketing leadership × AI product building.
            </span>
          </h2>

          <div className="max-w-3xl space-y-6 font-manrope text-[15px] md:text-[17px] text-white/65 leading-[1.85]">
            <p>
              Suman Debnath is a Senior Brand Marketing Manager who builds
              AI-native products. That pairing — roughly a decade of brand
              strategy, digital marketing, and growth leadership combined with
              hands-on AI product engineering — is what makes the profile
              unusual. Most marketers brief engineers and wait; Suman defines the
              brand, the positioning, and the go-to-market, then designs and ships
              the product itself.
            </p>
            <p>
              The marketing foundation is deep and operational: brand management,
              performance marketing, paid acquisition, SEO, campaign architecture,
              creative direction, and growth systems across consumer brands and
              higher education. Leading branding at Pune Institute of Business
              Management since 2019, he has run institutional brand strategy,
              digital infrastructure, and full go-to-market campaigns end to end.
            </p>
            <p>
              Over the last two years he restructured his entire workflow around
              AI as infrastructure — prompt and context engineering, agentic
              systems, multi-model LLM orchestration, and full-stack AI-assisted
              development with Claude Code, Cursor, Codex, and Lovable. The output
              is not throwaway demos but shipped products: IMPRINT, LEGATUS, CITE,
              EMBER, and D-PE.ai — with ROASmind, an AI-native operating system,
              in stealth.
            </p>
          </div>

          <h2 className="font-manrope font-semibold text-xl md:text-2xl tracking-tight mt-14 mb-5 max-w-3xl">
            Why a brand marketer for an AI product role?
          </h2>
          <div className="max-w-3xl space-y-6 font-manrope text-[15px] md:text-[17px] text-white/65 leading-[1.85]">
            <p>
              Brand and performance marketing build exactly the muscles AI product
              roles depend on — customer understanding, positioning, prioritisation,
              stakeholder management, and translating complex capability into clear
              user value. Layering hands-on AI engineering on top means Suman can
              both define the product vision and execute it with engineers, rather
              than handing off and hoping.
            </p>
            <p>
              He is now focused on{" "}
              <strong className="font-semibold text-white/85">
                AI Product Manager
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-white/85">
                AI Product Marketing Manager
              </strong>{" "}
              roles, where brand thinking, customer insight, and technical fluency
              converge. Based between Pune and Kolkata, India, and open to remote
              and global opportunities.
            </p>
          </div>
        </section>

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
