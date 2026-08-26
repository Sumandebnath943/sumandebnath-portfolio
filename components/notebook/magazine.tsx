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
  tone = "plain",
}: {
  title: string;
  standfirst?: string;
  href?: string;
  accent?: string;
  posts: CardPost[];
  /**
   * `tinted` paints the section in a wash of its own accent and gives it a
   * coloured rule; `ink` is the dark editorial block. Alternating these down the
   * page is what stops twenty-six cards on cream reading as one canvas — see the
   * note at the top of the front-page section in blog.css.
   */
  tone?: "plain" | "tinted" | "ink";
}) {
  if (posts.length === 0) return null;
  const id = `rail-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section
      className={`nb-rail nb-rail--${tone}`}
      aria-labelledby={id}
      style={accent ? ({ ["--tint" as string]: accent }) : undefined}
    >
      <div className="nb-rail-inner">
        <div className="nb-rail-head">
          <div>
            <h2 id={id} className="nb-rail-title" style={accent ? { color: accent } : undefined}>
              {title}
            </h2>
            {standfirst && <p className="nb-rail-standfirst">{standfirst}</p>}
          </div>
          {href && (
            <Link href={href} className="nb-rail-more">
              All articles <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
        <div className="nb-grid">
          {posts.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Every category, at a glance, colour-coded.
 *
 * The front page shows a rail for the four largest categories and chips for the
 * rest, which is right for the reading order and wrong as navigation — a reader
 * arriving at the top could not tell how much else was here. This strip sits
 * directly under the lead story and names all eight with their counts, so the
 * shape of the notebook is visible before any scrolling.
 */
export function CategoryStrip({
  categories,
}: {
  categories: { category: Category; count: number }[];
}) {
  return (
    <nav className="nb-strip" aria-label="Article categories">
      <ul className="nb-strip-list">
        {categories.map(({ category, count }) => (
          <li key={category}>
            <Link
              href={`/notebook/category/${categorySlug(category)}`}
              className="nb-strip-item"
              style={{ ["--tint" as string]: CATEGORY_ACCENT[category] }}
            >
              <span className="nb-strip-name">{category}</span>
              <span className="nb-strip-count">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * The archive, as rows rather than cards.
 *
 * A different shape from everything above it on purpose: by the time a reader
 * reaches the bottom of the front page they have seen five grids of three, and a
 * sixth reads as more of the same. Rows are also considerably more compact,
 * which matters on a page this long.
 */
export function ArticleRow({ post }: { post: CardPost }) {
  return (
    <li className="nb-row">
      <Link href={`/notebook/${post.slug}`} className="nb-row-link">
        <PostCover
          slug={post.slug}
          category={post.category}
          cover={post.cover}
          coverAlt={post.coverAlt}
          sizes="(max-width: 40rem) 30vw, 12rem"
          className="nb-row-cover"
        />
        <div className="nb-row-body">
          <p className="nb-card-meta">
            <span className="nb-card-cat" style={{ color: CATEGORY_ACCENT[post.category] }}>
              {post.category}
            </span>
            <span className="nb-card-sep">·</span>
            <span>{formatDate(post.published)}</span>
            <span className="nb-card-sep">·</span>
            <span>{post.readingMinutes} min</span>
          </p>
          <h3 className="nb-row-title">{post.title}</h3>
          <p className="nb-row-excerpt">{post.answer}</p>
        </div>
      </Link>
    </li>
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
