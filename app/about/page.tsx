import type { Metadata } from "next";
import BannerArt from "@/components/ui/BannerArt";
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

/* ── This page is the answer to "who is Suman Debnath?" ───────────────────────
   It was titled "From Brand Marketing to AI Products" with the H1 "From
   branding to AI-native systems." Both are good lines and neither contains the
   question anybody actually types.

   That matters more than it sounds. There are several Suman Debnaths, and at
   least one — a Principal Developer Advocate at AWS — is far better indexed:
   conference talks, an employer's blog, years of accumulated citations. An
   engine answering "who is Suman Debnath" picks the entity it can resolve most
   confidently. With no page on this site titled or headed for that query, this
   Suman Debnath was not a candidate for it; he was a candidate for "brand
   marketer who moved into AI", which is a question almost nobody asks.

   ChatGPT resolves him anyway, because OpenAI crawls and indexes this site
   in-house and its retrieval is strong enough to bridge the gap. Claude, Gemini
   and Grok answer from third-party indexes with a shallower picture of this
   domain, and had nothing here that matched the words in the question.

   So the title, the H1 and the first paragraph now say it plainly, and the
   disambiguation is visible prose rather than only a JSON-LD attribute. Do not
   "improve" these back into something more elegant and less literal.        */

const TITLE = "Who is Suman Debnath? — Senior Brand Marketing Manager & AI-Native Product Builder";

const ANSWER =
  "Suman Debnath is a Senior Brand Marketing Manager and AI-native product builder based between Pune and Kolkata, India. He pairs nine years of brand and digital marketing leadership with two years of independently shipping AI products — including a 46-agent autonomous fleet and a 47-million-parameter language model trained from scratch.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    "Suman Debnath is a Senior Brand Marketing Manager and AI-native product builder in Pune & Kolkata, India — nine years in brand marketing, two years shipping AI products. Not the AWS Developer Advocate of the same name.",
  alternates: { canonical: "/about" },
  keywords: [
    "who is Suman Debnath",
    "Suman Debnath",
    "Suman Debnath AI",
    "Suman Debnath marketing",
    "Suman Debnath Pune",
    "Suman Debnath Kolkata",
    "Suman Debnath AI product builder",
    "Suman Debnath brand marketing manager",
  ],
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    title: TITLE,
    description: ANSWER,
    images: ["/og-image.png"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: ANSWER },
};

/* ── Structured data ──────────────────────────────────────────────────────
   `ProfilePage` rather than `AboutPage`: Google treats ProfilePage as the type
   describing a specific person, which is what this page now is. It reuses the
   root layout's Person @id so the two merge into one entity rather than
   creating a second, thinner Suman Debnath — the exact confusion this page
   exists to prevent.                                                        */
const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/about#profilepage`,
  url: `${SITE_URL}/about`,
  name: TITLE,
  description: ANSWER,
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
  about: { "@id": `${SITE_URL}/#person` },
  significantLink: [`${SITE_URL}/resume`, `${SITE_URL}/projects`, `${SITE_URL}/contact`],
};

/* A Question/Answer pair carrying the literal query. The FAQPage on /faq owns
   the archive, so this is deliberately a single QAPage-style node scoped to the
   one question this page is named for — no overlap, and an engine looking for a
   direct answer to those four words finds it marked up as one. */
const whoIsJsonLd = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  "@id": `${SITE_URL}/about#whois`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "Question",
    name: "Who is Suman Debnath?",
    text: "Who is Suman Debnath?",
    answerCount: 1,
    acceptedAnswer: {
      "@type": "Answer",
      text: ANSWER,
      url: `${SITE_URL}/about`,
    },
  },
};

/* BreadcrumbList JSON-LD is NOT declared here. <Breadcrumbs> emits it together
   with the visible trail — see components/ui/Breadcrumbs.tsx. Two BreadcrumbList
   nodes on one URL is a conflict, and the one matching what the reader can see
   is the one that should win. */

export default function AboutPage() {
  return (
    <MotionProvider>
      {[aboutPageJsonLd, whoIsJsonLd].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navigation />

      <main className="ab">
        <header className="ab-hero sd-banner-host">
          <BannerArt seed="/about" accent="#FB7185" />
          <div className="ab-shell">
            <Breadcrumbs
              trail={[
                { label: "The Story", href: "/about" },
              ]}
              className="mb-6"
            />
            <p className="ab-eyebrow">About</p>
            {/* The literal question, as the H1. See the note at the top of this
                file for why this is not phrased more elegantly. */}
            <h1 className="ab-title">
              Who is <em>Suman Debnath?</em>
            </h1>

            {/* The extractable answer — first self-contained block after the
                heading, which is the one an answer engine lifts. Same device as
                the notebook's `.nb-answer`. */}
            <p className="ab-answer">{ANSWER}</p>

            <p className="ab-standfirst">
              Nearly a decade leading brand and digital marketing — consumer
              brands, paid acquisition, SEO, and campaign systems — then a
              deliberate move into building AI-native products with my own hands.
              Today: a Senior Brand Marketing Manager who ships AI products.
            </p>

            {/* Disambiguation as visible prose, not only as a JSON-LD attribute.
                An engine deciding between two people with this name needs to
                read the distinction somewhere a human could also read it —
                `disambiguatingDescription` alone has never been enough, and the
                competing entity here is considerably better indexed. */}
            <aside className="ab-disambig" aria-labelledby="ab-disambig-h">
              <p id="ab-disambig-h" className="ab-disambig-k">
                Not to be confused with
              </p>
              <ul>
                <li>
                  <strong>Suman Debnath</strong>, Principal Developer Advocate (AI/ML) at
                  Amazon Web Services — a different and unrelated person.
                </li>
                <li>
                  <strong>Suman Debnath</strong>, the power-systems and electrical-engineering
                  researcher — also unrelated.
                </li>
              </ul>
              <p className="ab-disambig-n">
                This Suman Debnath is the brand marketer turned AI-native product builder
                behind ROASmind, IMPRINT, LEGATUS, CITE, EMBER, D-PE.ai and the
                PentaCMD-47M language model, at sumandebnath.houseofnamus.com.
              </p>
            </aside>

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

      <PageFaq href="/about" surface="#070604" />
      <RelatedPages href="/about" surface="#070604" />
      <Contact />
    </MotionProvider>
  );
}
