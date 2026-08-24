import type { Metadata } from "next";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import PageFaq from "@/components/ui/PageFaq";
import { SITE_URL } from "@/lib/projects";
import { allPosts, allTags, formatPostDate, notebookModified, postUrl } from "@/lib/notebook";
import "./notebook.css";

const TITLE = "Notebook — engineering notes by Suman Debnath";
const DESCRIPTION =
  "First-hand engineering notes from building AI-native products: what broke, the actual fix, and what generalises. Next.js, React, three.js, CSS and debugging methodology.";

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
    "engineering notebook",
    "Next.js debugging",
    "React StrictMode",
    "position sticky overflow hidden",
    "three.js colour management",
    "AI-native product engineering",
    "Suman Debnath",
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
  const tags = allTags();

  // ── Structured data ───────────────────────────────────────────────────────
  // Blog + an ItemList of the posts. The Blog node carries `dateModified` from
  // the newest entry, which is the freshness signal the rest of the site cannot
  // produce: every other page changes only when its product does, whereas this
  // one moves whenever anything is written.
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
    blogPost: posts.map((p) => ({
      "@type": "TechArticle",
      "@id": `${SITE_URL}${postUrl(p.slug)}#article`,
      headline: p.title,
      description: p.answer,
      url: `${SITE_URL}${postUrl(p.slug)}`,
      datePublished: p.published,
      dateModified: p.updated ?? p.published,
      keywords: p.tags.join(", "),
      author: { "@id": `${SITE_URL}/#person` },
    })),
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Notebook", item: `${SITE_URL}/notebook` },
    ],
  };

  return (
    <MotionProvider>
      {[blogJsonLd, breadcrumbsJsonLd].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navigation />

      <main className="nb">
        <header className="nb-mast">
          <div className="nb-shell">
            <nav aria-label="Breadcrumb">
              <ol className="nb-crumbs">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Notebook</li>
              </ol>
            </nav>

            <p className="nb-eyebrow">Engineering notebook</p>
            <h1 className="nb-title">What broke, the actual fix, and what generalises</h1>
            <p className="nb-standfirst">
              Notes written while building AI-native products — mostly the bugs that produced no
              error message, which are the only ones worth writing down. Every entry is something
              that cost me real time in a real codebase.
            </p>

            <div className="nb-dateline">
              <span>
                {posts.length} {posts.length === 1 ? "entry" : "entries"}
              </span>
              <span className="sep">·</span>
              <span>Updated {formatPostDate(notebookModified())}</span>
              <span className="sep">·</span>
              <a href="/notebook/rss.xml" className="nb-link">
                RSS
              </a>
            </div>

            {tags.length > 0 ? (
              <ul className="nb-tags" style={{ marginTop: "1.5rem" }}>
                {tags.map((t) => (
                  <li key={t.tag} className="nb-tag">
                    {t.tag} · {t.count}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </header>

        <div className="nb-shell" style={{ paddingBlock: "2rem 5rem" }}>
          <ul className="nb-index-list">
            {posts.map((post) => (
              <li key={post.slug} className="nb-entry">
                <Link href={postUrl(post.slug)}>
                  <p className="nb-entry-meta">
                    {formatPostDate(post.published)} · {post.readingMinutes} min ·{" "}
                    {post.tags.join(" · ")}
                  </p>
                  <h2 className="nb-entry-title">{post.title}</h2>
                  {/* The extractable answer doubles as the index summary. One
                      canonical sentence-set per post, not a second version that
                      can drift from the first. */}
                  <p className="nb-entry-answer">{post.answer}</p>
                  <span className="nb-entry-more">Read →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <PageFaq href="/notebook" />
      <RelatedPages href="/notebook" />
    </MotionProvider>
  );
}
