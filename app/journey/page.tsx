import type { Metadata } from "next";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import RelatedPages from "@/components/ui/RelatedPages";
import JourneyStage from "@/components/journey/JourneyStage";
import { SITE_URL } from "@/lib/projects";
import { identity } from "@/lib/resume";
import {
  chapters,
  CLOSING_LINE,
  JOURNEY_DECK,
  JOURNEY_TITLE,
} from "@/lib/journey";
import "./journey.css";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: { absolute: `${JOURNEY_TITLE} — ${identity.name}` },
  description:
    "The part underneath the résumé: a mediocre student with no plan, an English tutor who arrived by accident, a Lamborghini fan page that reached 677,503 people, four months nobody asks about, and twenty AI products built by someone who cannot code.",
  alternates: { canonical: "/journey" },
  keywords: [
    "Suman Debnath story",
    "Suman Debnath career journey",
    "self-taught marketer",
    "self-taught digital marketing",
    "career change marketing to AI",
    "AI product builder without coding",
  ],
  openGraph: {
    type: "article",
    url: `${SITE_URL}/journey`,
    title: `${JOURNEY_TITLE} — ${identity.name}`,
    description:
      "Seventeen years, told properly. An interactive walk from a boy who could not speak one correct English sentence to someone who ships AI products alone.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${JOURNEY_TITLE} — ${identity.name}`,
    description: "Seventeen years, told properly. You have to walk it with him.",
  },
};

/* ── Structured data ──────────────────────────────────────────────────────
   The root layout owns the Person node at ${SITE_URL}/#person. This page adds
   only the article, pointed back at that same entity rather than describing a
   second Suman Debnath. */
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${SITE_URL}/journey#article`,
  headline: JOURNEY_TITLE,
  description: JOURNEY_DECK,
  about: { "@id": `${SITE_URL}/#person` },
  author: { "@id": `${SITE_URL}/#person` },
  publisher: { "@id": `${SITE_URL}/#person` },
  mainEntityOfPage: `${SITE_URL}/journey`,
  inLanguage: "en-US",
  articleSection: chapters.map((c) => c.title),
};

export default function JourneyPage() {
  return (
    /*
      MotionProvider is NOT optional, and its absence was the bug that made this
      page look like it had no navbar and no footer.

      This was the only page on the site rendering <Navigation /> outside a
      MotionProvider. Both `Navigation` and `Contact` animate with `m.*`, and `m`
      takes its animation features from `LazyMotion` **through context**. With no
      provider the features never load, `animate` never runs, and the element
      sits on its `initial` value forever — for the nav that is
      `{ y: -20, opacity: 0 }`, i.e. invisible.

      Nothing errors. The markup is all there and a crawler reads it fine, which
      is why the page tested clean on every structural check while being visibly
      broken. Exactly the failure already recorded in app/layout.tsx for
      CommandPalette and SiteTour — same cause, different victim.
    */
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navigation />
      <main className="jr">
        <header className="jr-mast">
          <p className="jr-eyebrow">Suman Debnath · the long version</p>
          <h1>{JOURNEY_TITLE}</h1>
          <p className="jr-deck">{JOURNEY_DECK}</p>
        </header>

        <JourneyStage />

        {/*
          The whole story again, as plain prose, rendered on the server.

          This is not a fallback bolted on afterwards — it is the reason the
          interactive version is allowed to exist. Search engines, AI crawlers
          and screen readers all get every word without operating a single
          control, and a recruiter who does not want to play a story can read
          it in two minutes instead.
        */}
        <details className="jr-transcript">
          <summary>
            Prefer to just read it? The whole story as plain text — no
            interaction, nothing held back.
          </summary>

          {chapters.map((c) => (
            <section key={c.id}>
              <h3>{c.when}</h3>
              <h2>{c.title}</h2>
              {c.lines.map((l) => (
                <p key={l.slice(0, 32)}>{l}</p>
              ))}
              {c.depth && (
                <ul>
                  {c.depth.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p className="jr-t-close">{CLOSING_LINE}</p>
          <p>
            <Link href="/contact">Get in touch</Link> ·{" "}
            <Link href="/resume">the résumé this sits underneath</Link>
          </p>
        </details>
      </main>

      {/* Both in the paper register — this page is cream and ink throughout, and
          the dark closing would read as the page having been cut off. */}
      <Breadcrumbs
        trail={[
          { label: "The Journey", href: "/journey" },
        ]}
        variant="paper"
        className="mx-auto max-w-5xl px-6 pt-12 sm:px-10 lg:px-16"
      />
      <RelatedPages href="/journey" variant="paper" />
      <Contact variant="light" />
    </MotionProvider>
  );
}
