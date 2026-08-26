import Link from "next/link";
import PostCover from "./PostCover";
import ArticleCard from "./ArticleCard";
import { HERO_SIZES } from "./PostCover";
import { CATEGORY_ACCENT, categorySlug, type Category } from "@/lib/notebook/types";
import type { CardPost } from "@/lib/notebook/card";

/**
 * The front page's furniture: the lead story, a section rail, the small-category
 * chip row and the pager.
 *
 * All server components. Nothing here is interactive — a rail is a heading and
 * some links — so none of it needs to reach the browser. The previous index was
 * one client component holding every card so it could filter them; browsing now
 * happens through real routes (`/notebook/category/<slug>`, `/notebook/page/<n>`)
 * which are crawlable, linkable and survive JavaScript being off.
 */

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The lead story. One per front page, and the only card given `priority`. */
export function FeaturedHero({ post }: { post: CardPost }) {
  return (
    <section className="nb-hero" aria-labelledby="nb-hero-title">
      <Link href={`/notebook/${post.slug}`} className="nb-hero-link">
        <PostCover
          slug={post.slug}
          category={post.category}
          cover={post.cover}
          coverAlt={post.coverAlt}
          priority
          sizes={HERO_SIZES}
          className="nb-hero-cover"
        />
        <div className="nb-hero-body">
          <p className="nb-hero-badge">Featured</p>
          <p className="nb-card-meta">
            <span className="nb-card-cat" style={{ color: CATEGORY_ACCENT[post.category] }}>
              {post.category}
            </span>
            <span className="nb-card-sep">·</span>
            <span>{formatDate(post.published)}</span>
            <span className="nb-card-sep">·</span>
            <span>{post.readingMinutes} min</span>
          </p>
          <h2 id="nb-hero-title" className="nb-hero-title">
            {post.title}
          </h2>
          <p className="nb-hero-excerpt">{post.answer}</p>
          <span className="nb-hero-cta">
            Read the article <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </section>
  );
}

/**
 * A titled row of articles.
 *
 * `href` turns the heading into a link to the full archive for that section. It
 * is optional because "Start here" is an editorial selection with no archive
 * behind it, whereas a category rail always has one.
 */
export function Rail({
  title,
  standfirst,
  href,
  accent,
  posts,
}: {
  title: string;
  standfirst?: string;
  href?: string;
  accent?: string;
  posts: CardPost[];
}) {
  if (posts.length === 0) return null;
  const id = `rail-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section className="nb-rail" aria-labelledby={id}>
      <div className="nb-rail-head">
        <div>
          <h2 id={id} className="nb-rail-title" style={accent ? { color: accent } : undefined}>
            {title}
          </h2>
          {standfirst && <p className="nb-rail-standfirst">{standfirst}</p>}
        </div>
        {href && (
          <Link href={href} className="nb-rail-more">
            All {posts.length === 1 ? "articles" : "articles"} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      <div className="nb-grid">
        {posts.map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}

/**
 * Categories too small for a rail.
 *
 * They are not hidden — every one has a real archive route and appears here as a
 * link. A rail holding a single card reads as a rendering fault; a chip reads as
 * a topic.
 */
export function BrowseChips({ chips }: { chips: { category: Category; count: number }[] }) {
  if (chips.length === 0) return null;
  return (
    <section className="nb-chips" aria-labelledby="nb-chips-title">
      <h2 id="nb-chips-title" className="nb-rail-title">
        Also in the notebook
      </h2>
      <ul className="nb-chip-list">
        {chips.map(({ category, count }) => (
          <li key={category}>
            <Link
              href={`/notebook/category/${categorySlug(category)}`}
              className="nb-chip"
              style={{ ["--chip" as string]: CATEGORY_ACCENT[category] }}
            >
              {category}
              <span className="nb-chip-count">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The archive pager.
 *
 * Page one is `/notebook`, not `/notebook/page/1` — one canonical URL for the
 * front page, no duplicate of it at a numbered address. `rel="prev"`/`"next"`
 * are set so a crawler can walk the sequence.
 */
export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const href = (n: number) => (n === 1 ? "/notebook" : `/notebook/page/${n}`);

  return (
    <nav className="nb-pager" aria-label="Archive pages">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className="nb-pager-step">
          <span aria-hidden="true">←</span> Newer
        </Link>
      ) : (
        <span className="nb-pager-step is-off">
          <span aria-hidden="true">←</span> Newer
        </span>
      )}

      <ol className="nb-pager-list">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            {n === page ? (
              <span className="nb-pager-num is-current" aria-current="page">
                {n}
              </span>
            ) : (
              <Link href={href(n)} className="nb-pager-num">
                {n}
              </Link>
            )}
          </li>
        ))}
      </ol>

      {page < totalPages ? (
        <Link href={href(page + 1)} rel="next" className="nb-pager-step">
          Older <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className="nb-pager-step is-off">
          Older <span aria-hidden="true">→</span>
        </span>
      )}
    </nav>
  );
}
