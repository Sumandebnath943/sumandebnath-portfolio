import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import RelatedPages from "@/components/ui/RelatedPages";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BannerArt from "@/components/ui/BannerArt";
import PostCover from "@/components/notebook/PostCover";
import { SITE_URL } from "@/lib/projects";
import {
  activeCategories,
  categoryFromSlug,
  categorySlug,
  CATEGORY_ACCENT,
  CATEGORY_BANNER,
  formatPostDate,
  postModified,
  postsInCategory,
  postUrl,
} from "@/lib/notebook";
import "../../notebook.css";
import "../../blog.css";

/**
 * A category archive — `/notebook/category/css-layout` and friends.
 *
 * ## Why these are real routes and not `?category=css-layout`
 *
 * The index filters client-side, which is right for browsing but gives a
 * filtered view no identity: no URL to send anyone, no title, no description,
 * nothing for a search engine to index. These pages give each category all
 * three, so "his React writing" becomes a thing that can rank and be linked.
 *
 * Query strings were the alternative and are worse: `?category=react` and
 * `?category=next-js` are, to a crawler, the same page showing subsets of the
 * same content, which splits the index's ranking signal across variants instead
 * of concentrating it. A path segment is a distinct page; a query string is a
 * hint that it might not be.
 *
 * ## Static, and small
 *
 * `generateStaticParams` over the five categories, `dynamicParams = false`, so
 * these are five prerendered files and an unknown slug 404s rather than
 * rendering an empty archive. Nothing here is dynamic and nothing should become
 * dynamic.
 */

export function generateStaticParams() {
  return activeCategories().map(({ category }) => ({ slug: categorySlug(category) }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) return {};

  const posts = postsInCategory(category);
  const title = `${category} — engineering articles by Suman Debnath`;
  const description = `${posts.length} ${posts.length === 1 ? "article" : "articles"} on ${category} from building AI-native products: what broke, the actual fix, and what generalises.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/notebook/category/${slug}` },
    keywords: [category, "engineering articles", "Suman Debnath", ...posts.flatMap((p) => p.tags)],
    openGraph: {
      type: "website",
      url: `${SITE_URL}/notebook/category/${slug}`,
      title,
      description,
      images: ["/og-image.png"],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) notFound();

  const posts = postsInCategory(category);
  const others = activeCategories().filter((c) => c.category !== category);
  const accent = CATEGORY_ACCENT[category];
  const url = `${SITE_URL}/notebook/category/${slug}`;

  // CollectionPage rather than Blog: this is a subset view of the blog, and
  // claiming to *be* the blog would put two Blog nodes on the site competing for
  // the same identity. `isPartOf` points back at the real one.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: `${category} — Notebook`,
    description: `Articles on ${category} by Suman Debnath.`,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/notebook#blog` },
    about: { "@type": "Thing", name: category },
    author: { "@id": `${SITE_URL}/#person` },
    dateModified: posts.length ? postModified(posts[0]) : undefined,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${postUrl(p.slug)}`,
        name: p.title,
      })),
    },
  };

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      <main className="nb">
        <header className="nb-mast nb-mast--blog sd-banner-host">
          {/* The form is chosen, not hashed — see CATEGORY_BANNER in
              lib/notebook/types.ts. A category archive should look like what it
              is about; Marketing & AI was drawing whatever the route hashed to. */}
          <BannerArt
            seed={`/notebook/category/${slug}`}
            accent={accent}
            form={CATEGORY_BANNER[category]}
            variant="paper"
          />
          <div className="nb-wide">
            <Breadcrumbs
              trail={[
                { label: "Notebook", href: "/notebook" },
                { label: category, href: `/notebook/category/${slug}` },
              ]}
              variant="paper"
              className="mb-7"
            />

            <p className="nb-eyebrow" style={{ color: accent }}>
              Category
            </p>
            <h1 className="nb-title">{category}</h1>
            <p className="nb-standfirst">
              {posts.length} {posts.length === 1 ? "article" : "articles"} on {category} — written
              while building AI-native products, and mostly about the failures that produced no
              error message.
            </p>
          </div>
        </header>

        <div className="nb-wide" style={{ paddingBlock: "3.5rem 5rem" }}>
          <div className="nb-grid">
            {posts.map((p) => (
              <article key={p.slug} className="nb-card">
                <Link href={postUrl(p.slug)} className="nb-card-link">
                  <PostCover
                    slug={p.slug}
                    category={p.category}
                    cover={p.cover}
                    coverAlt={p.coverAlt}
                    className="nb-card-cover"
                  />
                  <div className="nb-card-body">
                    <p className="nb-card-meta">
                      <time dateTime={p.published}>{formatPostDate(p.published)}</time>
                      <span className="nb-card-sep">·</span>
                      <span>{p.readingMinutes} min read</span>
                    </p>
                    <h2 className="nb-card-title">{p.title}</h2>
                    <p className="nb-card-excerpt">{p.answer}</p>
                    <ul className="nb-card-tags" aria-label="Tags">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Every archive links to every other one. Five categories is small
              enough that a full cross-link costs nothing and means no archive is
              ever a dead end. */}
          <nav className="nb-catnav" aria-label="Other categories">
            <p className="nb-section-label">Other categories</p>
            <ul>
              <li>
                <Link href="/notebook">All articles</Link>
              </li>
              {others.map(({ category: c, count }) => (
                <li key={c}>
                  <Link href={`/notebook/category/${categorySlug(c)}`}>
                    <span className="nb-side-dot" style={{ background: CATEGORY_ACCENT[c] }} />
                    {c} <span className="nb-side-n">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>

      <RelatedPages href="/notebook" variant="paper" surface="#ece5d8" />
      <Contact variant="light" />
    </MotionProvider>
  );
}
