import type { Metadata } from "next";
import BannerArt from "@/components/ui/BannerArt";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import RelatedPages from "@/components/ui/RelatedPages";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BrowseAll from "@/components/notebook/BrowseAll";
import { toCardPost } from "@/lib/notebook/card";
import { SITE_URL } from "@/lib/projects";
import { activeCategories, allPosts, allTags, notebookModified } from "@/lib/notebook";
import "../notebook.css";
import "../blog.css";

/**
 * `/notebook/all` — the complete archive with filters.
 *
 * Four surfaces cover the notebook and each has one job:
 *
 *   /notebook                    the front page — editorial, curated, no controls
 *   /notebook/all                this — everything, filterable, for people who
 *                                know roughly what they are looking for
 *   /notebook/category/<slug>    one category, canonical and crawlable
 *   /notebook/page/<n>           the paginated archive, for crawl depth
 *
 * The overlap between this page and the category archives is deliberate rather
 * than accidental duplication: this one is the interactive surface and
 * self-canonicalises, while a category archive is the durable, linkable address
 * for that subset. `ItemList` structured data is not emitted here — the front
 * page already declares the `Blog` and its posts, and a second full listing of
 * the same articles would compete with it.
 */

const TITLE = "All articles — Notebook · Suman Debnath";
const DESCRIPTION =
  "Every article in the notebook, filterable by category and tag. First-hand writing on building AI-native products as a marketer, debugging, and being found by answer engines.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/notebook/all",
    types: {
      "application/rss+xml": [{ url: "/notebook/rss.xml", title: "Notebook — Suman Debnath" }],
    },
  },
};

export default function NotebookAllPage() {
  const posts = allPosts();
  const categories = activeCategories();
  const tags = allTags();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/notebook/all#collection`,
    url: `${SITE_URL}/notebook/all`,
    name: "All articles",
    description: DESCRIPTION,
    inLanguage: "en-US",
    dateModified: notebookModified(),
    isPartOf: { "@id": `${SITE_URL}/notebook#blog` },
    author: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <Navigation />

      <main className="nb">
        <header className="nb-mast nb-mast--blog sd-banner-host">
          <BannerArt seed="/notebook/all" accent="#7B61FF" form="halftone" variant="paper" />
          <div className="nb-wide">
            <Breadcrumbs
              trail={[
                { label: "Notebook", href: "/notebook" },
                { label: "All articles", href: "/notebook/all" },
              ]}
              variant="paper"
              className="mb-7"
            />
            <p className="nb-eyebrow">The notebook</p>
            <h1 className="nb-title">All articles</h1>
            <p className="nb-standfirst">
              Everything in one place — {posts.length} articles across {categories.length}{" "}
              categories. Filter by category or tag, or sort by date.
            </p>
          </div>
        </header>

        <div className="nb-wide" style={{ paddingBlock: "3rem 5rem" }}>
          {/* Every article is server-rendered into this page before any
              filtering runs, so a client without JavaScript still sees the
              complete archive rather than an empty shell with controls. */}
          <BrowseAll posts={posts.map(toCardPost)} categories={categories} tags={tags} />
        </div>
      </main>

      <RelatedPages href="/notebook" variant="paper" surface="#ece5d8" />
      <Contact variant="light" />
    </MotionProvider>
  );
}
