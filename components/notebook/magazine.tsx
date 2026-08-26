import Link from "next/link";
import PostCover from "./PostCover";
import CompactCard from "./CompactCard";
import { CATEGORY_ACCENT, categorySlug, type Category } from "@/lib/notebook/types";
import type { CardPost } from "@/lib/notebook/card";

/**
 * The front page's furniture.
 *
 * All server components. Nothing here is interactive — a zone is a heading and
 * some links — so none of it needs to reach the browser. Browsing happens
 * through real routes (`/notebook/category/<slug>`, `/notebook/page/<n>`) which
 * are crawlable, linkable and survive JavaScript being off.
 *
 * ## What changed, and why
 *
 * This was five identical three-up grids stacked down the page, and it read as
 * one canvas regardless of what was in them. Studying HBR's front page against
 * it, the difference turned out not to be the card design at all. Three
 * mechanisms do the work:
 *
 *   1. **No two adjacent zones share a column count.** HBR runs 605/302/302,
 *      then four across, then three, then 124/745/261, then four. The rhythm
 *      changing is what stops the page reading as a list. Measured here at
 *      1152px the zones come out 499/290/290, then 4x264, then 3x362, then
 *      4x264, then 2x566 — 3 · 4 · 3 · 4 · 2.
 *   2. **The text-only headline list.** A section name and three or four
 *      headlines, hairline-ruled, no images. It is the densest unit available
 *      and this page had none of them — twelve links in the height one card row
 *      was using for three.
 *   3. **The thumbnail-right compact card**, which is `CompactCard`, written
 *      for the article rail in step 2 and reused here.
 *
 * `Rail` and `FeaturedHero` are gone with the grids they existed to draw.
 */

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** A zone heading, optionally linking to the archive behind it. */
function ZoneHead({
  title,
  standfirst,
  href,
  accent,
  id,
}: {
  title: string;
  standfirst?: string;
  href?: string;
  accent?: string;
  id: string;
}) {
  return (
    <div className="nb-zone-head">
      <div>
        <h2 id={id} className="nb-zone-title" style={accent ? { color: accent } : undefined}>
          {title}
        </h2>
        {standfirst && <p className="nb-zone-standfirst">{standfirst}</p>}
      </div>
      {href && (
        <Link href={href} className="nb-zone-more">
          All articles <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

/**
 * The lead story. One per front page, and the only card given `priority`.
 *
 * Cover on top rather than beside the text: it sits in the widest column of the
 * opening zone, not across the full page, so a side-by-side split would leave
 * the headline about fourteen characters wide.
 */
export function LeadStory({ post }: { post: CardPost }) {
  return (
    <article className="nb-lead" style={{ ["--tint" as string]: CATEGORY_ACCENT[post.category] }}>
      <Link href={`/notebook/${post.slug}`} className="nb-lead-link">
        <PostCover
          slug={post.slug}
          category={post.category}
          cover={post.cover}
          coverAlt={post.coverAlt}
          priority
          sizes="(max-width: 60rem) calc(100vw - 3rem), 620px"
          className="nb-lead-cover"
        />
        <p className="nb-card-meta">
          <span className="nb-card-cat" style={{ color: CATEGORY_ACCENT[post.category] }}>
            {post.category}
          </span>
          <span className="nb-card-sep">·</span>
          <span>{formatDate(post.published)}</span>
          <span className="nb-card-sep">·</span>
          <span>{post.readingMinutes} min</span>
        </p>
        <h2 className="nb-lead-title">{post.title}</h2>
        <p className="nb-lead-excerpt">{post.answer}</p>
        <span className="nb-lead-cta">
          Read the article <span aria-hidden="true">→</span>
        </span>
      </Link>
    </article>
  );
}

/**
 * A section name and its headlines. No images, hairline rules between.
 *
 * The densest unit on the page and the one that was missing. Used three times
 * and in three registers: the newest-articles column beside the lead story, the
 * ranked list in the middle of the tile zone, and every column of the sections
 * directory.
 */
export function HeadlineList({
  label,
  href,
  posts,
  accent,
  showCategory = false,
  numbered = false,
  thumbs = false,
  tone = "plain",
}: {
  label: string;
  href?: string;
  posts: CardPost[];
  accent?: string;
  /** Print each headline's category above it. Off inside a category column,
   *  where every entry would carry the same word. */
  showCategory?: boolean;
  numbered?: boolean;
  /**
   * A 4rem thumbnail to the right of each headline.
   *
   * Not on every list. The two numbered lists — "Start here" and the ranking —
   * already carry a visual device in the numerals, and adding pictures to them
   * would leave the page with nothing that is purely type. Recency and the
   * sections directory take the thumbnails; the ranked lists stay text.
   */
  thumbs?: boolean;
  tone?: "plain" | "ink";
}) {
  if (posts.length === 0) return null;
  const id = `hl-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section
      className={`nb-hl nb-hl--${tone}`}
      aria-labelledby={id}
      style={accent ? ({ ["--tint" as string]: accent }) : undefined}
    >
      <div className="nb-hl-head">
        <h2 id={id} className="nb-hl-label">
          {label}
        </h2>
        {href && (
          <Link href={href} className="nb-hl-more" aria-label={`All ${label} articles`}>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      <ol
        className={`nb-hl-list${numbered ? " nb-hl-list--num" : ""}${
          thumbs ? " nb-hl-list--thumb" : ""
        }`}
      >
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/notebook/${p.slug}`} className="nb-hl-link">
              {/* The text is wrapped whether or not there is a thumbnail, so
                  the numeral and the picture each get one grid cell to sit
                  beside rather than having to place three loose children. */}
              <span className="nb-hl-text">
                {showCategory && (
                  <span className="nb-hl-cat" style={{ color: CATEGORY_ACCENT[p.category] }}>
                    {p.category}
                  </span>
                )}
                <span className="nb-hl-title">{p.title}</span>
                <span className="nb-hl-meta">{p.readingMinutes} min</span>
              </span>
              {thumbs && (
                <PostCover
                  slug={p.slug}
                  category={p.category}
                  cover={p.cover}
                  coverAlt={p.coverAlt}
                  sizes="64px"
                  className="nb-hl-cover"
                />
              )}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * A row of compact cards, four across.
 *
 * `CompactCard` is the thumbnail-right shape from the article rail. At roughly
 * 260px a column it fits four where the old card fitted three, and the image
 * turned on its side is what buys the fourth.
 */
export function CardRow({
  label,
  standfirst,
  href,
  posts,
}: {
  label: string;
  standfirst?: string;
  href?: string;
  posts: CardPost[];
}) {
  if (posts.length === 0) return null;
  const id = `row-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section className="nb-zone" aria-labelledby={id}>
      <ZoneHead id={id} title={label} standfirst={standfirst} href={href} />
      <ul className="nb-cardrow">
        {posts.map((p) => (
          <li key={p.slug}>
            {/* The thumbnail is 5.5rem here as it is in the rail — the column
                is wider, the image is not. */}
            <CompactCard post={p} sizes="88px" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * A single article given a whole tile, tinted or ink.
 *
 * The flanks of the third zone. Alternating a filled tile, a plain list and a
 * dark tile across one row is the device that keeps the middle of the page from
 * going flat — the same `tone` idea the article rail uses, at page scale.
 */
export function FeatureTile({
  post,
  kicker,
  tone = "tint",
}: {
  post: CardPost;
  kicker: string;
  tone?: "tint" | "ink";
}) {
  return (
    <article
      className={`nb-tile nb-tile--${tone}`}
      style={{ ["--tint" as string]: CATEGORY_ACCENT[post.category] }}
    >
      <Link href={`/notebook/${post.slug}`} className="nb-tile-link">
        <p className="nb-tile-kicker">{kicker}</p>
        <h2 className="nb-tile-title">{post.title}</h2>
        <p className="nb-tile-excerpt">{post.answer}</p>
        <span className="nb-tile-meta">
          {post.category} · {post.readingMinutes} min
        </span>
      </Link>
    </article>
  );
}

/**
 * Every section that has enough articles, as columns of headlines.
 *
 * This is the zone that carries the density. Four columns of three headlines is
 * twelve links in the height a single card row was spending on three, and it is
 * the only view on the page that shows the notebook's shape rather than its
 * chronology.
 */
export function SectionsZone({
  sections,
}: {
  sections: { category: Category; posts: CardPost[] }[];
}) {
  if (sections.length === 0) return null;
  return (
    <section className="nb-zone" aria-labelledby="nb-sections-title">
      <ZoneHead
        id="nb-sections-title"
        title="By section"
        standfirst="The notebook's shape, rather than its order."
        href="/notebook/all"
      />
      <div className="nb-sections">
        {sections.map(({ category, posts }) => (
          <HeadlineList
            key={category}
            label={category}
            href={`/notebook/category/${categorySlug(category)}`}
            accent={CATEGORY_ACCENT[category]}
            posts={posts}
            thumbs
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Every category, at a glance, colour-coded.
 *
 * Sits directly under the lead zone and names all eight with their counts, so
 * the shape of the notebook is visible before any scrolling — the sections zone
 * further down only holds the four that are big enough for a column.
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
 * reaches the bottom they have seen tiles, cards and headline lists, and a
 * fourth grid would read as more of the same. Rows are also considerably more
 * compact, which matters on a page this long.
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
 * Categories too small for a column in the sections zone.
 *
 * They are not hidden — every one has a real archive route and appears here as
 * a link. A column holding a single headline reads as a rendering fault; a chip
 * reads as a topic.
 */
export function BrowseChips({ chips }: { chips: { category: Category; count: number }[] }) {
  if (chips.length === 0) return null;
  return (
    <section className="nb-chips" aria-labelledby="nb-chips-title">
      <h2 id="nb-chips-title" className="nb-zone-title">
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
