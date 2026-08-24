import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import PostBody from "@/components/notebook/PostBody";
import { SITE_URL } from "@/lib/projects";
import { getPage } from "@/lib/pages";
import {
  allPosts,
  formatPostDate,
  getPost,
  headingsOf,
  postModified,
  postUrl,
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
    title: { absolute: `${post.title} · Suman Debnath` },
    description: post.description,
    alternates: { canonical: postUrl(post.slug) },
    keywords: post.tags,
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
  // TechArticle rather than Article: these are technical how-to and diagnostic
  // pieces, and the more specific type is the more useful claim.
  //
  // `about` and `author` both point at the site-wide Person @id rather than
  // restating it, so a consumer merges these into the one entity instead of
  // creating a second, thinner Suman Debnath.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
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

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Notebook", item: `${SITE_URL}/notebook` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const seeAlso = (post.seeAlso ?? [])
    .map(getPage)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <MotionProvider>
      {[articleJsonLd, faqJsonLd, breadcrumbsJsonLd]
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
        <article>
          <header className="nb-mast">
            <div className="nb-shell">
              <nav aria-label="Breadcrumb">
                <ol className="nb-crumbs">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/notebook">Notebook</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">{post.tags[0]}</li>
                </ol>
              </nav>

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
          </header>

          <div className="nb-shell nb-body">
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

            {headings.length > 2 ? (
              <nav className="nb-toc" aria-label="On this page">
                <p className="nb-toc-label">On this page</p>
                <ol>
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
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

            <nav className="nb-postnav" aria-label="More entries">
              <Link href="/notebook">← All entries</Link>
              {newer ? <Link href={postUrl(newer.slug)}>Newer: {newer.title}</Link> : null}
              {older ? <Link href={postUrl(older.slug)}>Older: {older.title}</Link> : null}
            </nav>
          </div>
        </article>
      </main>

      <RelatedPages href="/notebook" heading="Elsewhere on the site" />
    </MotionProvider>
  );
}
