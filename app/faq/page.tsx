import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import Contact from "@/components/sections/Contact";
import { aboutFaqs, allFaqs, buildFaqPageJsonLd, faqs, type Faq } from "@/lib/faqs";
import { SITE_URL } from "@/lib/projects";
import "./faq.css";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

/**
 * lib/faqs.ts has always held these as two distinct sets. The page flattened
 * both into one 26-item run, so somebody scrolling for "who is this person"
 * had to read eight questions about operating principles first.
 */
const GROUPS: { id: string; label: string; title: string; items: Faq[] }[] = [
  {
    id: "background",
    label: "Set 01",
    title: "Background, capabilities & products",
    items: aboutFaqs,
  },
  {
    id: "philosophy",
    label: "Set 02",
    title: "Operating philosophy & the transition",
    items: faqs,
  },
];

export const metadata: Metadata = {
  title: "FAQ — Brand Marketer Turned AI Product Builder",
  description:
    "Direct answers on the marketing-to-AI transition, AI product building, and what makes a brand marketer plus AI builder a rare hire.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/faq`,
    title: "FAQ — Brand Marketer Turned AI Product Builder · Suman Debnath",
    description:
      "Direct answers about the marketing-to-AI transition, AI product building, and the rare cross-domain profile.",
    images: ["/og-image.png"],
  },
};

const jsonLd = buildFaqPageJsonLd(allFaqs);

export default function FAQPage() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      <main className="fq">
        <header className="fq-hero">
          <div className="fq-shell">
            <p className="fq-eyebrow">Reference · {allFaqs.length} answers</p>
            <h1 className="fq-title">
              Everything people <em>actually</em> ask.
            </h1>
            <p className="fq-standfirst">
              The canonical answer set for what recruiters, founders and operators
              ask about the AI-native operating model, the move from brand and
              digital marketing into shipping software, and how this portfolio is
              built.
            </p>
            <nav className="fq-jump" aria-label="Jump to a set">
              {GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`}>
                  {g.title} <b>{g.items.length}</b>
                </a>
              ))}
            </nav>
          </div>
        </header>

        {GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="fq-group">
            <div className="fq-shell">
              <div className="fq-group-head">
                <p className="fq-group-label">{group.label}</p>
                <h2 className="fq-group-title">{group.title}</h2>
              </div>

              {/* Still <details>: the answers stay in the HTML for crawlers and
                  the page works with JavaScript off. */}
              <div className="fq-list">
                {group.items.map((f, i) => (
                  <details key={f.q} className="fq-item">
                    <summary className="fq-q">
                      <span className="fq-n">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="fq-qt">{f.q}</h3>
                      <span className="fq-mark" aria-hidden />
                    </summary>
                    <p className="fq-a">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="fq-close">
          <div className="fq-shell">
            <p>Not in there? Ask it directly — the answer usually exists.</p>
            <div className="fq-close-actions">
              <a href="/contact" className="fq-btn fq-btn-solid">
                Ask a question
              </a>
              <a href="/resume" className="fq-btn fq-btn-ghost">
                Read the résumé
              </a>
            </div>
          </div>
        </section>
      </main>

      <Breadcrumbs
        trail={[
          { label: "FAQ", href: "/faq" },
        ]}
        className="mx-auto max-w-5xl px-6 pt-12 sm:px-10 lg:px-16"
      />
      <RelatedPages href="/faq" />
      <Contact />
    </MotionProvider>
  );
}
