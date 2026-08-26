import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PostCover from "@/components/notebook/PostCover";
import ArticleRail from "@/components/notebook/ArticleRail";
import ReadingProgress from "@/components/notebook/ReadingProgress";
import Contact from "@/components/sections/Contact";
import PostBody from "@/components/notebook/PostBody";
import { SITE_URL } from "@/lib/projects";
import { getPage } from "@/lib/pages";
import { CATEGORY_ACCENT } from "@/lib/notebook/types";
import {
  allPosts,
  formatPostDate,
  getPost,
  headingsOf,
  postModified,
  postUrl,
  type Category,
} from "@/lib/notebook";
import "../notebook.css";

// Every post is known at build time, so every post is a static page. Nothing
// here is dynamic and nothing should become dynamic — a notebook entry that
// renders per-request would be slower for readers and no fresher for anyone.
export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}${postUrl(post.slug)}`;

  return {
    // `metaTitle` where the headline and the search result want different words
    // — see the note on it in lib/notebook/types.ts. Falls back to the H1.
    title: { absolute: `${post.metaTitle ?? post.title} · Suman Debnath` },
    description: post.description,
    alternates: { canonical: postUrl(post.slug) },
    keywords: post.keywords ?? post.tags,
    authors: [{ name: "Suman Debnath", url: SITE_URL }],
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      modifiedTime: postModified(post),
      authors: [SITE_URL],
      tags: post.tags,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function NotebookPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}${postUrl(post.slug)}`;
  const headings = headingsOf(post);
  const posts = allPosts();
  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index < posts.length - 1 ? posts[index + 1] : undefined;

  // ── Structured data ───────────────────────────────────────────────────────
  //
  // The type follows the category, and it stopped being a constant on 26 Aug
  // 2026 when the notebook gained Career, Marketing & AI and Method.
  //
  // `TechArticle` is specifically technical how-to and diagnostic writing —
  // the right and more useful claim for "Why does position: sticky stop
  // working?". It is the wrong claim for a first-person career account, which
  // is a `BlogPosting`. Asserting TechArticle over an essay is not a small
  // inaccuracy: the type is what tells a consumer how to treat the content.
  //
  // `about` and `author` both point at the site-wide Person @id rather than
  // restating it, so a consumer merges these into the one entity instead of
  // creating a second, thinner Suman Debnath.
  const TECHNICAL: Category[] = ["CSS & Layout", "React", "Next.js", "Graphics"];
  const articleType = TECHNICAL.includes(post.category) ? "TechArticle" : "BlogPosting";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": articleType,
    "@id": `${url}#article`,
    headline: post.title,
    name: post.title,
    description: post.description,
    abstract: post.answer,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.published,
    dateModified: postModified(post),
    inLanguage: "en-US",
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.blocks.reduce((n, b) => {
      if (b.kind === "p") return n + b.text.split(/\s+/).length;
      if (b.kind === "ul" || b.kind === "ol")
        return n + b.items.join(" ").split(/\s+/).length;
      return n;
    }, 0),
    timeRequired: `PT${post.readingMinutes}M`,
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/notebook#blog` },
    // The named sections give an answer engine a fragment to cite into, rather
    // than forcing a citation at the top of the page.
    hasPart: headings.map((h) => ({
      "@type": "WebPageElement",
      name: h.text,
      url: `${url}#${h.id}`,
    })),
    // `speakable` marks the block written to be read aloud or quoted verbatim.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".nb-answer"],
    },
  };

  const faqJsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  // No BreadcrumbList here — <Breadcrumbs> emits it alongside the visible trail.
  // Two BreadcrumbList nodes on one URL is a conflict, and the version that
  // matches what the reader can see is the one that should win.

  const seeAlso = (post.seeAlso ?? [])
    .map(getPage)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <MotionProvider>
      {[articleJsonLd, faqJsonLd]
        .filter(Boolean)
        .map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

      <Navigation />

      <main className="nb">
        <ReadingProgress targetId="nb-article" />
        {/* The category's accent, handed to the stylesheet as a variable so the
            furniture on this page can be coloured by section rather than being
            eight shades of paper. A Marketing & AI article reads teal, a Career
            one amber — the same device the index already uses for its tinted
            rails, applied to the page a reader actually sits in front of.

            The prose itself stays on paper. Colour is for the boxes around the
            reading, never the reading: the note at the top of this stylesheet
            argues that at length and it is still right. */}
        <article
          id="nb-article"
          className="nb-art"
          style={{ ["--nb-accent" as string]: CATEGORY_ACCENT[post.category] }}
        >
          <header className="nb-mast nb-mast--post">
            {/* `.nb-shell` is the article band; `.nb-post-head` holds the copy
                to the reading measure inside it. Two elements rather than one
                because the lede image below fills the band and the words must
                not — and because both need to start on the same left edge,
                which is what the old single centred box could not do. */}
            <div className="nb-shell">
              <div className="nb-post-head">
              <Breadcrumbs
                trail={[
                  { label: "Notebook", href: "/notebook" },
                  { label: post.category, href: null },
                  { label: post.title, href: postUrl(post.slug) },
                ]}
                variant="paper"
                className="mb-6"
              />

              <h1 className="nb-title">{post.title}</h1>

              {/*
                The extractable answer, immediately under the H1 and before any
                prose. This placement is the whole design: a model reading the
                page for an answer takes the first self-contained block after
                the heading, and a post that opens with three paragraphs of
                narrative gives it nothing to take. `.nb-answer` is also the
                selector named in the speakable spec above.
              */}
              <div className="nb-answer">
                <p className="nb-answer-label">In short</p>
                <p>{post.answer}</p>
              </div>

              <div className="nb-dateline">
                <time dateTime={post.published}>{formatPostDate(post.published)}</time>
                {post.updated ? (
                  <>
                    <span className="sep">·</span>
                    <span>Updated {formatPostDate(post.updated)}</span>
                  </>
                ) : null}
                <span className="sep">·</span>
                <span>{post.category}</span>
                <span className="sep">·</span>
                <span>{post.readingMinutes} min read</span>
                <span className="sep">·</span>
                <span>Suman Debnath</span>
              </div>

              <ul className="nb-tags" style={{ marginTop: "1.25rem" }}>
                {post.tags.map((tag) => (
                  <li key={tag} className="nb-tag">
                    {tag}
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </header>

          {/* The lede, between the masthead and the body.

              It now fills the article band instead of the reading measure, so
              it shares the prose's left edge and runs out under the rail. See
              `.nb-cover` for why the ratio is 16:9 and not something wider.

              `sizes` describes the band, not the viewport: above 64rem the box
              is always 936px, because the band caps at 58.5rem well before
              `100vw - 3rem` does. Getting this wrong is the failure
              PAGE_OPTIMIZATION §4.2b records twice — a hint written for one
              slot, reused in a wider one, and next/image quietly serving a
              variant the browser then upscales. */}
          {post.cover ? (
            <div className="nb-shell">
              <PostCover
                slug={post.slug}
                category={post.category}
                cover={post.cover}
                coverAlt={post.coverAlt}
                priority
                sizes="(max-width: 64rem) calc(100vw - 3rem), 936px"
                className="nb-cover"
              />
            </div>
          ) : null}

          {/* Two columns above 76rem: the prose keeps its 44rem measure and the
              contents list moves into a rail that sticks. Below that it
              collapses to one column and the list returns to the flow. */}
          <div className="nb-read">
            <div className="nb-read-main nb-body">
            {post.facts?.length ? (
              <div className="nb-facts">
                <dl>
                  {post.facts.map((f) => (
                    <div key={f.label} style={{ display: "contents" }}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            <PostBody blocks={post.blocks} />

            {post.faqs?.length ? (
              <section className="nb-faq" aria-labelledby="post-faq-heading">
                <h2 id="post-faq-heading">Questions this answers</h2>
                {post.faqs.map((f) => (
                  <div key={f.q} className="nb-faq-item">
                    <h3 className="nb-faq-q">{f.q}</h3>
                    <p className="nb-faq-a">{f.a}</p>
                  </div>
                ))}
              </section>
            ) : null}

            {seeAlso.length ? (
              <section className="nb-faq" aria-labelledby="see-also-heading">
                <h2 id="see-also-heading">See also</h2>
                <ul className="nb-ul">
                  {seeAlso.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className="nb-link">
                        {p.label}
                      </Link>{" "}
                      — {p.blurb}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* The end of the article, which used to be three bare links.
                Who wrote it, where to go next as real cards, and the feed. */}
            <footer className="nb-end">
              <div className="nb-end-author">
                <p className="nb-end-kicker">Written by</p>
                <p className="nb-end-name">Suman Debnath</p>
                <p className="nb-end-bio">
                  Senior brand marketing manager who builds AI-native products. Everything here is
                  first-hand — written while building, not researched afterwards.
                </p>
                <p className="nb-end-links">
                  <Link href="/about" className="nb-link">
                    About
                  </Link>
                  <span className="sep">·</span>
                  <Link href="/projects" className="nb-link">
                    What I have built
                  </Link>
                  <span className="sep">·</span>
                  <a href="/notebook/rss.xml" className="nb-link">
                    RSS
                  </a>
                </p>
              </div>

              <nav className="nb-end-nav" aria-label="More articles">
                {newer ? (
                  <Link href={postUrl(newer.slug)} className="nb-end-card">
                    <span className="nb-end-dir">← Newer</span>
                    <span className="nb-end-title">{newer.title}</span>
                  </Link>
                ) : null}
                {older ? (
                  <Link href={postUrl(older.slug)} className="nb-end-card">
                    <span className="nb-end-dir">Older →</span>
                    <span className="nb-end-title">{older.title}</span>
                  </Link>
                ) : null}
              </nav>

              <p className="nb-end-all">
                <Link href="/notebook/all" className="nb-link">
                  Browse all articles
                </Link>
              </p>
            </footer>
            </div>

            {/* Five modules now, not one, so the rail is no longer conditional
                on the article having headings — `ArticleRail` decides which of
                its own sections have anything to show. */}
            <ArticleRail post={post} headings={headings} url={url} />
          </div>
        </article>
      </main>

      <RelatedPages href="/notebook" heading="Elsewhere on the site" variant="paper" />
      <Contact variant="light" />
    </MotionProvider>
  );
}
