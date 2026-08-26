import type { Metadata } from "next";
import BannerArt from "@/components/ui/BannerArt";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import RelatedPages from "@/components/ui/RelatedPages";
import PageFaq from "@/components/ui/PageFaq";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ArticleCard from "@/components/notebook/ArticleCard";
import { FeaturedHero, Rail, BrowseChips, Pagination } from "@/components/notebook/magazine";
import { toCardPost } from "@/lib/notebook/card";
import { SITE_URL } from "@/lib/projects";
import {
  activeCategories,
  allPosts,
  formatPostDate,
  magazine,
  notebookModified,
  postUrl,
} from "@/lib/notebook";
import { CATEGORY_ACCENT, categorySlug, type Category } from "@/lib/notebook/types";
import "./notebook.css";
import "./blog.css";

const TITLE = "Notebook — articles by Suman Debnath";
const DESCRIPTION =
  "First-hand writing from building AI-native products as a marketer: the bugs that produced no error message, what a non-developer has to learn to ship software, and how to be found by answer engines.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/notebook",
    types: {
      "application/rss+xml": [{ url: "/notebook/rss.xml", title: "Notebook — Suman Debnath" }],
    },
  },
  keywords: [
    "engineering blog",
    "Next.js articles",
    "React debugging",
    "position sticky overflow hidden",
    "three.js colour management",
    "AI-native product engineering",
    "Suman Debnath blog",
  ],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/notebook`,
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/** Kept in step with the same list in app/notebook/[slug]/page.tsx. */
const TECHNICAL_CATEGORIES: Category[] = ["CSS & Layout", "React", "Next.js", "Graphics"];

export default function NotebookIndexPage() {
  const posts = allPosts();
  const categories = activeCategories();
  const { hero, picks, rails, chips, latest, totalPages } = magazine();

  // ── Structured data ───────────────────────────────────────────────────────
  // Blog + the full post list. `dateModified` from the newest entry is the
  // freshness signal the rest of the site cannot produce: every other page
  // changes only when its product does, whereas this one moves whenever
  // anything is written.
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/notebook#blog`,
    url: `${SITE_URL}/notebook`,
    name: "Notebook",
    description: DESCRIPTION,
    inLanguage: "en-US",
    dateModified: notebookModified(),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    // The categories, declared as the sections of the blog. This is what lets a
    // consumer say "his Next.js writing" rather than treating every post as an
    // unrelated page.
    about: categories.map((c) => ({ "@type": "Thing", name: c.category })),
    // The type follows the category, exactly as the article pages do. A
    // first-person career essay is a BlogPosting; TechArticle is specifically
    // technical how-to and diagnostic writing. Asserting one for the other in
    // the blog's own listing would contradict what each article says about
    // itself.
    blogPost: posts.map((p) => ({
      "@type": TECHNICAL_CATEGORIES.includes(p.category) ? "TechArticle" : "BlogPosting",
      "@id": `${SITE_URL}${postUrl(p.slug)}#article`,
      headline: p.title,
      description: p.answer,
      url: `${SITE_URL}${postUrl(p.slug)}`,
      datePublished: p.published,
      dateModified: p.updated ?? p.published,
      articleSection: p.category,
      keywords: p.tags.join(", "),
      timeRequired: `PT${p.readingMinutes}M`,
      author: { "@id": `${SITE_URL}/#person` },
    })),
  };

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <Navigation />

      <main className="nb">
        {/* The page banner. Compact on purpose — the featured article below is
            the real hero, and a tall masthead above it would push the cover
            story off the first screen. */}
        <header className="nb-mast nb-mast--blog sd-banner-host">
          <BannerArt seed="/notebook" accent="#7B61FF" variant="paper" />
          <div className="nb-wide">
            <Breadcrumbs
              trail={[{ label: "Notebook", href: "/notebook" }]}
              variant="paper"
              className="mb-7"
            />

            <p className="nb-eyebrow">The notebook</p>
            <h1 className="nb-title">Building AI products as a marketer, written down</h1>
            <p className="nb-standfirst">
              Two kinds of writing. Bugs that produced no error message and cost me real time in a
              real codebase — and first-person accounts of learning to ship software without ever
              having been a developer. All of it first-hand.
            </p>

            <div className="nb-dateline">
              <span>
                {posts.length} {posts.length === 1 ? "article" : "articles"}
              </span>
              <span className="sep">·</span>
              <span>{categories.length} categories</span>
              <span className="sep">·</span>
              <span>Updated {formatPostDate(notebookModified())}</span>
              <span className="sep">·</span>
              <a href="/notebook/rss.xml" className="nb-link">
                RSS
              </a>
            </div>
          </div>
        </header>

        {/* The front page is composed by `magazine()` in lib/notebook, not here.
            Every section draws from one pool and marks what it took, so no
            article appears twice — the hero is not repeated in a rail, and a
            rail's articles are not repeated in the archive below. */}
        <div className="nb-wide" style={{ paddingBlock: "3.5rem 5rem" }}>
          <FeaturedHero post={toCardPost(hero)} />

          <Rail
            title="Start here"
            standfirst="If you read three, read these."
            posts={picks.map(toCardPost)}
          />

          {rails.map(({ category, posts: railPosts }) => (
            <Rail
              key={category}
              title={category}
              href={`/notebook/category/${categorySlug(category)}`}
              accent={CATEGORY_ACCENT[category]}
              posts={railPosts.map(toCardPost)}
            />
          ))}

          <BrowseChips chips={chips} />

          {latest.length > 0 && (
            <section className="nb-rail" aria-labelledby="nb-latest-title">
              <div className="nb-rail-head">
                <div>
                  <h2 id="nb-latest-title" className="nb-rail-title">
                    Everything else
                  </h2>
                  <p className="nb-rail-standfirst">
                    The rest of the notebook, newest first.
                  </p>
                </div>
              </div>
              <div className="nb-grid">
                {latest.map((p) => (
                  <ArticleCard key={p.slug} post={toCardPost(p)} />
                ))}
              </div>
              <Pagination page={1} totalPages={totalPages} />
            </section>
          )}
        </div>
      </main>

      <PageFaq href="/notebook" variant="paper" surface="#ece5d8" />
      <RelatedPages href="/notebook" variant="paper" surface="#ece5d8" />
      <Contact variant="light" />
    </MotionProvider>
  );
}
