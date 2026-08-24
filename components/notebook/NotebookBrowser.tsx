"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PostCover from "./PostCover";
import { CATEGORY_ACCENT, type Category } from "@/lib/notebook/types";
import type { CardPost } from "@/lib/notebook/card";

/**
 * The blog index — featured hero, article grid, and a sidebar carrying the
 * category and tag filters.
 *
 * ## The layout, and why it is this one
 *
 * This follows the conventional blog-index anatomy rather than inventing one:
 *
 *   1. a compact page header (owned by the page, not this component),
 *   2. a **featured post as the hero** — full width, large cover, one article
 *      given the weight of a magazine cover story,
 *   3. a two-column body: articles on the left, a sidebar on the right.
 *
 * The filters live in the sidebar because that is where readers look for them,
 * and because a horizontal wall of chips above the grid pushes the actual
 * articles below the fold — the one thing a blog index must not do. A first
 * version did exactly that and read as a filter tool with some posts attached
 * rather than as a blog.
 *
 * ## Why filtering is client-side over a complete list
 *
 * Every post is passed in and rendered from the same array. On first render the
 * filters are empty, so the server-rendered HTML contains **every card, with its
 * title, category, date and standfirst** — which is what a crawler that never
 * runs JavaScript needs to see. Filtering only hides things.
 *
 * Query-string routes (`?category=react`) would split the index's link equity
 * across variants showing subsets of the same content. When the archive outgrows
 * this, the answer is real `/notebook/category/<slug>` routes with their own
 * metadata — not query strings.
 *
 * ## The state is deliberately shallow
 *
 * One category, a set of tags, one sort key. No URL sync, no history entries.
 * A filter that pushes history means Back walks the reader through their own
 * filter changes instead of returning them to where they came from.
 */

type Sort = "newest" | "oldest" | "quickest";

const SORTS: { id: Sort; label: string }[] = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "quickest", label: "Quickest read" },
];

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Meta({ post }: { post: CardPost }) {
  return (
    <p className="nb-card-meta">
      <span className="nb-card-cat" style={{ color: CATEGORY_ACCENT[post.category] }}>
        {post.category}
      </span>
      <span className="nb-card-sep">·</span>
      <time dateTime={post.published}>{formatDate(post.published)}</time>
      <span className="nb-card-sep">·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

/** The cover story. One article at magazine scale, above everything else. */
function FeaturedHero({ post }: { post: CardPost }) {
  return (
    <section className="nb-hero" aria-labelledby="nb-hero-title">
      <Link href={`/notebook/${post.slug}`} className="nb-hero-link">
        <PostCover
          slug={post.slug}
          category={post.category}
          cover={post.cover}
          coverAlt={post.coverAlt}
          priority
          className="nb-hero-cover"
        />
        <div className="nb-hero-body">
          <p className="nb-hero-badge">Featured</p>
          <Meta post={post} />
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

function PostCard({ post }: { post: CardPost }) {
  return (
    <article className="nb-card">
      <Link href={`/notebook/${post.slug}`} className="nb-card-link">
        <PostCover
          slug={post.slug}
          category={post.category}
          cover={post.cover}
          coverAlt={post.coverAlt}
          className="nb-card-cover"
        />
        <div className="nb-card-body">
          <Meta post={post} />
          <h3 className="nb-card-title">{post.title}</h3>
          <p className="nb-card-excerpt">{post.answer}</p>
          <ul className="nb-card-tags" aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}

export default function NotebookBrowser({
  posts,
  categories,
  tags,
  picks,
}: {
  posts: CardPost[];
  categories: { category: Category; count: number }[];
  tags: { tag: string; count: number }[];
  picks: CardPost[];
}) {
  const [category, setCategory] = useState<Category | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("newest");

  const filtered = useMemo(() => {
    let out = posts;
    if (category) out = out.filter((p) => p.category === category);
    // AND, not OR. Two tags selected means "posts about both" — with an archive
    // this size, OR would widen the result on almost every second click, which
    // reads as the filter not working.
    if (activeTags.length) out = out.filter((p) => activeTags.every((t) => p.tags.includes(t)));

    return [...out].sort((a, b) => {
      if (sort === "quickest") return a.readingMinutes - b.readingMinutes;
      if (sort === "oldest") return a.published < b.published ? -1 : 1;
      return a.published < b.published ? 1 : -1;
    });
  }, [posts, category, activeTags, sort]);

  const dirty = category !== null || activeTags.length > 0 || sort !== "newest";
  // The cover story only leads when the reader has not asked for something else.
  const hero = !dirty ? filtered.find((p) => p.featured) : undefined;
  const grid = hero ? filtered.filter((p) => p.slug !== hero.slug) : filtered;

  const toggleTag = (t: string) =>
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const reset = () => {
    setCategory(null);
    setActiveTags([]);
    setSort("newest");
  };

  return (
    <>
      {hero && <FeaturedHero post={hero} />}

      <div className="nb-layout">
        {/* ── Articles ─────────────────────────────────────────────────── */}
        <div className="nb-main">
          <div className="nb-toolbar">
            <p className="nb-count" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
              {category ? ` in ${category}` : ""}
              {activeTags.length ? ` tagged ${activeTags.join(" + ")}` : ""}
            </p>

            <div className="nb-toolbar-controls">
              <label htmlFor="nb-sort" className="nb-vh">
                Sort articles
              </label>
              <select
                id="nb-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="nb-select"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>

              {/* Present but disabled rather than hidden — a Reset that appears
                  only once something is filtered shifts the control beside it
                  sideways at the moment the reader is aiming at one. */}
              <button type="button" onClick={reset} disabled={!dirty} className="nb-reset">
                Reset
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="nb-empty">
              <p>Nothing matches that combination yet.</p>
              <button type="button" onClick={reset} className="nb-reset is-inline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="nb-grid">
              {grid.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </div>

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <aside className="nb-side" aria-label="Browse articles">
          <section className="nb-side-block">
            <h2 className="nb-side-title" id="nb-cat-label">
              Categories
            </h2>
            <ul className="nb-side-list" aria-labelledby="nb-cat-label">
              <li>
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  aria-pressed={category === null}
                  className={`nb-side-item ${category === null ? "is-on" : ""}`}
                >
                  <span>All articles</span>
                  <span className="nb-side-n">{posts.length}</span>
                </button>
              </li>
              {categories.map(({ category: c, count }) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setCategory(category === c ? null : c)}
                    aria-pressed={category === c}
                    className={`nb-side-item ${category === c ? "is-on" : ""}`}
                  >
                    <span className="nb-side-label">
                      <span className="nb-side-dot" style={{ background: CATEGORY_ACCENT[c] }} />
                      {c}
                    </span>
                    <span className="nb-side-n">{count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="nb-side-block">
            <h2 className="nb-side-title" id="nb-tag-label">
              Tags
            </h2>
            <div className="nb-tagcloud" role="group" aria-labelledby="nb-tag-label">
              {tags.map(({ tag, count }) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={activeTags.includes(tag)}
                  className={`nb-tagchip ${activeTags.includes(tag) ? "is-on" : ""}`}
                >
                  {tag}
                  <span className="nb-side-n">{count}</span>
                </button>
              ))}
            </div>
          </section>

          {picks.length > 0 && (
            <section className="nb-side-block">
              <h2 className="nb-side-title">Start here</h2>
              <ol className="nb-picks-list">
                {picks.map((p, i) => (
                  <li key={p.slug}>
                    <Link href={`/notebook/${p.slug}`}>
                      <span className="nb-picks-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="nb-picks-title">{p.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="nb-side-block nb-side-block--feed">
            <h2 className="nb-side-title">Follow</h2>
            <p className="nb-side-note">
              New articles land in the feed the day they are published.
            </p>
            <a href="/notebook/rss.xml" className="nb-side-feed">
              Subscribe by RSS <span aria-hidden="true">→</span>
            </a>
          </section>
        </aside>
      </div>
    </>
  );
}
