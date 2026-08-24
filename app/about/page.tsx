import type { Metadata } from "next";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import PageFaq from "@/components/ui/PageFaq";
import Experience from "@/components/sections/Experience";
import SystemsStack from "@/components/sections/SystemsStack";
import OperationalHistory from "@/components/sections/OperationalHistory";
import AcademicFoundations from "@/components/sections/AcademicFoundations";
import Contact from "@/components/sections/Contact";
import { SITE_URL } from "@/lib/projects";
import "./about.css";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

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

/* BreadcrumbList JSON-LD is NOT declared here. <Breadcrumbs> emits it together
   with the visible trail — see components/ui/Breadcrumbs.tsx. Two BreadcrumbList
   nodes on one URL is a conflict, and the one matching what the reader can see
   is the one that should win. */

export default function AboutPage() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      <Navigation />

      <main className="ab">
        <header className="ab-hero">
          <div className="ab-shell">
            <p className="ab-eyebrow">About</p>
            <h1 className="ab-title">
              From branding to <em>AI-native</em> systems.
            </h1>
            <p className="ab-standfirst">
              Nearly a decade leading brand and digital marketing — consumer
              brands, paid acquisition, SEO, and campaign systems — then a
              deliberate move into building AI-native products with my own hands.
              Today: a Senior Brand Marketing Manager who ships AI products.
            </p>

            {/* The crossing, stated before the prose gets a chance to. */}
            <div className="ab-cross">
              <div className="ab-side ab-side--then">
                <p className="ab-when">2016 → 2023</p>
                <p className="ab-what">Brand &amp; digital marketing</p>
                <ul className="ab-facts">
                  <li>Institutional brand strategy, GTM and campaign architecture</li>
                  <li>A 21-person cross-functional team across digital, design and web</li>
                  <li>₹30–40L annual vendor budget, 99%+ on-time delivery</li>
                  <li>40–50% website traffic growth through SEO and UX</li>
                </ul>
              </div>

              <div className="ab-divider" aria-hidden />

              <div className="ab-side ab-side--now">
                <p className="ab-when">2024 → now</p>
                <p className="ab-what">Building the products</p>
                <ul className="ab-facts">
                  <li>21 AI systems designed, built and shipped independently</li>
                  <li>A 47M-parameter language model trained from scratch</li>
                  <li>A 46-agent autonomous fleet running in production</li>
                  <li>Prompt and context engineering, agentic systems, full-stack delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* ── Cross-domain narrative — unique to /about (AEO + keyword surface) ── */}
        <section aria-labelledby="about-narrative" className="ab-body">
          <div className="ab-shell">
            <p className="ab-eyebrow">The profile</p>
            <h2 id="about-narrative" className="ab-h2">
              Brand marketing leadership <em>×</em> AI product building.
            </h2>

            <div className="ab-prose">
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
              is not throwaway demos but{" "}
              <Link href="/projects">21 shipped products</Link>: IMPRINT, LEGATUS,
              CITE, EMBER and D-PE.ai, with ROASmind — an AI-native marketing
              operating system running to 200,000+ lines — in testing.
            </p>
            <p>
              The work has since gone a layer deeper than assembling other
              people&apos;s models. <Link href="/slms/pentacmd">PentaCMD</Link> is a
              47M-parameter language model trained from scratch on 299,000
              instruction-to-command pairs, reaching roughly 87% exact match;{" "}
              <Link href="/llms/qdex-1.5b">Qdex-1.5B</Link> is a QLoRA fine-tuning
              pipeline benchmarked against HumanEval; and{" "}
              <Link href="/agents/migi">MIGI</Link> is a fleet of 46 agents running a
              personal brand, job applications, expenses and uptime monitoring on
              their own, held together by 500+ automated eval checks.
            </p>
            </div>

            <h3 className="ab-h3">Why a brand marketer for an AI product role?</h3>
            <div className="ab-prose">
              <p>
                Brand and performance marketing build exactly the muscles AI
                product roles depend on — customer understanding, positioning,
                prioritisation, stakeholder management, and translating complex
                capability into clear user value. Layering hands-on AI engineering
                on top means Suman can both define the product vision and execute
                it with engineers, rather than handing off and hoping.
              </p>
              <p>
                He is now focused on <strong>AI Product Manager</strong> and{" "}
                <strong>AI Product Marketing Manager</strong> roles, where brand
                thinking, customer insight, and technical fluency converge. Based
                between Pune and Kolkata, India, and open to remote and global
                opportunities. The full record is on the{" "}
                <Link href="/resume">résumé</Link>.
              </p>
            </div>
          </div>
        </section>

        <Experience />
        <SystemsStack />
        <OperationalHistory />
        <AcademicFoundations />
      </main>

      <Breadcrumbs
        trail={[
          { label: "The Story", href: "/about" },
        ]}
        className="mx-auto max-w-5xl px-6 pt-12 sm:px-10 lg:px-16"
      />
      <PageFaq href="/about" />
      <RelatedPages href="/about" />
      <Contact />
    </MotionProvider>
  );
}
