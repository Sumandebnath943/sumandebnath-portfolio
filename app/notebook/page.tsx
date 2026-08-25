import type { Metadata } from "next";
import BannerArt from "@/components/ui/BannerArt";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import RelatedPages from "@/components/ui/RelatedPages";
import PageFaq from "@/components/ui/PageFaq";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import NotebookBrowser from "@/components/notebook/NotebookBrowser";
import { toCardPost } from "@/lib/notebook/card";
import { SITE_URL } from "@/lib/projects";
import {
  activeCategories,
  allPosts,
  allTags,
  formatPostDate,
  notebookModified,
  mostPopularPost,
  pickedPosts,
  postUrl,
} from "@/lib/notebook";
import "./notebook.css";
import "./blog.css";

const TITLE = "Notebook — engineering articles by Suman Debnath";
const DESCRIPTION =
  "Engineering write-ups from building AI-native products: what broke, the actual fix, and what generalises. Articles on Next.js, React, CSS, three.js and debugging practice.";

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

export default function NotebookIndexPage() {
  const posts = allPosts();
  const categories = activeCategories();
  const tags = allTags();
  const picks = pickedPosts();
  const popular = mostPopularPost();

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
    blogPost: posts.map((p) => ({
      "@type": "TechArticle",
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

            <p className="nb-eyebrow">Engineering notebook</p>
            <h1 className="nb-title">What broke, the actual fix, and what generalises</h1>
            <p className="nb-standfirst">
              Articles written while building AI-native products — mostly the bugs that produced no
              error message, which are the only ones worth writing down. Every one cost me real time
              in a real codebase.
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

        <div className="nb-wide" style={{ paddingBlock: "3.5rem 5rem" }}>
          {/* toCardPost, not the raw posts: passing whole Post objects across the
              server/client boundary serialises every article in full into this
              page. See the note on CardPost in NotebookBrowser.tsx. */}
          <NotebookBrowser
            posts={posts.map(toCardPost)}
            categories={categories}
            tags={tags}
            picks={picks.map(toCardPost)}
            popularSlug={popular?.slug}
          />
        </div>
      </main>

      <PageFaq href="/notebook" variant="paper" surface="#ece5d8" />
      <RelatedPages href="/notebook" variant="paper" surface="#ece5d8" />
      <Contact variant="light" />
    </MotionProvider>
  );
}
