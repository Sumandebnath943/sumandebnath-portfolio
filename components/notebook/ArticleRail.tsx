import Image from "next/image";
import Link from "next/link";
import CompactCard from "./CompactCard";
import ShareRow from "./ShareRow";
import { toCardPost } from "@/lib/notebook/card";
import { categorySlug } from "@/lib/notebook/types";
import { popularPosts, relatedInCategory, type Post } from "@/lib/notebook";

/**
 * The article rail: contents, author, related reading, editor's pick, share.
 *
 * A **server** component that does its own lookups. Nothing here is
 * interactive except `ShareRow`, which is the one piece that has to reach the
 * browser.
 *
 * ## Why the wrapper is a bare `div`
 *
 * It used to be `<aside aria-label="On this page">` holding a single contents
 * list. That label stopped being true the moment the rail held five things, and
 * a wrapper that carries no semantics is what lets the mobile layout give it
 * `display: contents` and order the modules individually around the prose —
 * contents above it, everything else below. Each module now carries its own
 * heading and its own label instead.
 *
 * ## The thumbnails
 *
 * `sizes="72px"` describes the 4.5rem thumbnail `.nb-compact-cover` renders,
 * not the rail. `CompactCard` makes the prop required precisely so this is a
 * decision rather than an inherited default.
 */
export default function ArticleRail({
  post,
  headings,
  url,
}: {
  post: Post;
  headings: { id: string; text: string }[];
  /** Absolute URL of the article, for the clipboard and the share sheet. */
  url: string;
}) {
  const related = relatedInCategory(post, 3);

  // Excluded from the pick so the rail cannot print the same article twice:
  // the highest-scoring post in a small category is very often also one of its
  // three most recent.
  const seen = new Set([post.slug, ...related.map((p) => p.slug)]);
  const picks = popularPosts(2, seen);

  return (
    <div className="nb-read-rail">
      {/* Unchanged threshold: two headings is a list of two links, which is
          worth less than the space it costs. */}
      {headings.length > 2 ? (
        <nav className="nb-toc" aria-labelledby="nb-toc-label">
          <p className="nb-toc-label" id="nb-toc-label">
            On this page
          </p>
          <ol>
            {headings.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`}>{h.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <section className="nb-rail-mod nb-railauthor" aria-labelledby="nb-author-label">
        <h2 id="nb-author-label" className="nb-rail-label">
          Written by
        </h2>
        <div className="nb-railauthor-row">
          <Image
            src="/profile/portrait.webp"
            alt=""
            width={56}
            height={56}
            quality={75}
            className="nb-railauthor-photo"
          />
          <div>
            <p className="nb-railauthor-name">Suman Debnath</p>
            <p className="nb-railauthor-role">
              Senior brand marketing manager building AI-native products
            </p>
          </div>
        </div>
        <p className="nb-railauthor-links">
          <Link href="/about" className="nb-link">
            About
          </Link>
          <span className="nb-card-sep">·</span>
          <Link href="/projects" className="nb-link">
            Projects
          </Link>
        </p>
      </section>

      {related.length > 0 ? (
        <section className="nb-rail-mod" aria-labelledby="nb-related-label">
          <h2 id="nb-related-label" className="nb-rail-label">
            More in {post.category}
          </h2>
          <ul className="nb-rail-list">
            {related.map((p) => (
              <li key={p.slug}>
                <CompactCard post={toCardPost(p)} sizes="72px" />
              </li>
            ))}
          </ul>
          <Link
            href={`/notebook/category/${categorySlug(post.category)}`}
            className="nb-rail-more-link"
          >
            All {post.category} <span aria-hidden="true">→</span>
          </Link>
        </section>
      ) : null}

      {picks.length > 0 ? (
        <section className="nb-rail-mod" aria-labelledby="nb-pick-label">
          {/* "Editor's pick", never "Most read". `popularityScore` is an
              editorial forecast and nothing on this site counts readers yet —
              see the note on the field in lib/notebook/types.ts. */}
          <h2 id="nb-pick-label" className="nb-rail-label">
            Editor&rsquo;s pick
          </h2>
          <ul className="nb-rail-list">
            {picks.map((p) => (
              <li key={p.slug}>
                <CompactCard post={toCardPost(p)} sizes="72px" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ShareRow url={url} title={post.title} />
    </div>
  );
}
