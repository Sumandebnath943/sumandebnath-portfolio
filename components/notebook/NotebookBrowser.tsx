"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PostCover from "./PostCover";
import { CATEGORY_ACCENT, type Category } from "@/lib/notebook/types";
import type { CardPost } from "@/lib/notebook/card";


/**
 * The blog index: category filter, tag filter, sort, reset, and the grid.
 *
 * ## Why filtering is client-side over a complete list
 *
 * Every post is passed in and rendered from the same array. On first render the
 * filters are empty, so the server-rendered HTML contains **every card, with its
 * title, category, date and standfirst** — which is exactly what a crawler that
 * never runs JavaScript needs to see. Filtering then only hides things.
 *
 * The alternative — routes like `/notebook?category=react`, or a server
 * component re-fetching per filter — would be worse on both counts: it splits
 * the index's link equity across query-string variants that all show subsets of
 * the same content, and it puts a network round trip in front of a click that
 * should be instant on a list this size.
 *
 * When the archive outgrows client-side filtering, the answer is real
 * `/notebook/category/<slug>` routes with their own metadata, not query strings.
 *
 * ## The state is deliberately shallow
 *
 * One category, a set of tags, one sort key. No URL sync, no history entries.
 * A filter that pushes history means Back walks the reader through their own
 * filter changes instead of returning them to where they came from, which is
 * the more common intent by a wide margin.
 */

type Sort = "newest" | "oldest" | "quickest";

const SORTS: { id: Sort; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
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

function PostCard({ post, featured = false }: { post: CardPost; featured?: boolean }) {
  return (
    <article className={featured ? "nb-card nb-card--lead" : "nb-card"}>
      <Link href={`/notebook/${post.slug}`} className="nb-card-link">
        <PostCover
          slug={post.slug}
          category={post.category}
          cover={post.cover}
          coverAlt={post.coverAlt}
          priority={featured}
          className={featured ? "nb-card-cover nb-card-cover--lead" : "nb-card-cover"}
        />

        <div className="nb-card-body">
          <p className="nb-card-meta">
            <span className="nb-card-cat" style={{ color: CATEGORY_ACCENT[post.category] }}>
              {post.category}
            </span>
            <span className="nb-card-sep">·</span>
            <time dateTime={post.published}>{formatDate(post.published)}</time>
            <span className="nb-card-sep">·</span>
            <span>{post.readingMinutes} min</span>
          </p>

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
  const lead = sort === "newest" && !dirty ? filtered.find((p) => p.featured) : undefined;
  const rest = lead ? filtered.filter((p) => p.slug !== lead.slug) : filtered;

  const toggleTag = (t: string) =>
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const reset = () => {
    setCategory(null);
    setActiveTags([]);
    setSort("newest");
  };

  return (
    <>
      {/* ── Start here ─────────────────────────────────────────────────────
          Hidden once the reader starts filtering: a curated rail sitting above
          their own filtered results competes with them for attention and makes
          the filter feel ignored. */}
      {!dirty && picks.length > 0 && (
        <section className="nb-picks" aria-labelledby="nb-picks-heading">
          <h2 id="nb-picks-heading" className="nb-section-label">
            Start here
          </h2>
          <ol className="nb-picks-list">
            {picks.map((p, i) => (
              <li key={p.slug}>
                <Link href={`/notebook/${p.slug}`}>
                  <span className="nb-picks-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="nb-picks-title">{p.title}</span>
                  <span className="nb-picks-cat" style={{ color: CATEGORY_ACCENT[p.category] }}>
                    {p.category}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ── Filters ─────────────────────────────────────────────────────── */}
      <section className="nb-filters" aria-label="Filter entries">
        <div className="nb-filter-row">
          <h2 className="nb-section-label" id="nb-cat-label">
            Category
          </h2>
          <div className="nb-chips" role="group" aria-labelledby="nb-cat-label">
            <button
              type="button"
              onClick={() => setCategory(null)}
              aria-pressed={category === null}
              className={`nb-chip ${category === null ? "is-on" : ""}`}
            >
              All <span className="nb-chip-n">{posts.length}</span>
            </button>
            {categories.map(({ category: c, count }) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(category === c ? null : c)}
                aria-pressed={category === c}
                className={`nb-chip ${category === c ? "is-on" : ""}`}
                style={category === c ? { borderColor: CATEGORY_ACCENT[c] } : undefined}
              >
                <span className="nb-chip-dot" style={{ background: CATEGORY_ACCENT[c] }} />
                {c} <span className="nb-chip-n">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="nb-filter-row">
          <h2 className="nb-section-label" id="nb-tag-label">
            Tags
          </h2>
          <div className="nb-chips" role="group" aria-labelledby="nb-tag-label">
            {tags.map(({ tag, count }) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={activeTags.includes(tag)}
                className={`nb-chip nb-chip--tag ${activeTags.includes(tag) ? "is-on" : ""}`}
              >
                {tag} <span className="nb-chip-n">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="nb-filter-row nb-filter-row--end">
          <div className="nb-sort">
            <label htmlFor="nb-sort" className="nb-section-label">
              Sort
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
          </div>

          {/* Present but disabled rather than hidden — a Reset that appears only
              once something is filtered moves the row's other controls sideways
              at the exact moment the reader is aiming at one. */}
          <button type="button" onClick={reset} disabled={!dirty} className="nb-reset">
            Reset
          </button>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      <section aria-label="Entries" aria-live="polite">
        <p className="nb-count">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
          {category ? ` in ${category}` : ""}
          {activeTags.length ? ` tagged ${activeTags.join(" + ")}` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="nb-empty">
            <p>Nothing matches that combination yet.</p>
            <button type="button" onClick={reset} className="nb-reset is-inline">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {lead && <PostCard post={lead} featured />}
            <div className="nb-grid">
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
