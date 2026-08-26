"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArticleRow } from "./magazine";
import { CATEGORY_ACCENT, categorySlug, type Category } from "@/lib/notebook/types";
import type { CardPost } from "@/lib/notebook/card";

/**
 * The full archive, filterable.
 *
 * ## Why this is a separate route rather than part of the front page
 *
 * The front page's archive section holds only what the rails did not use — ten
 * articles of twenty-six. A filter there would silently search a tenth of the
 * notebook and report "no results" for a category that has plenty, which is
 * worse than having no filter at all. Here the pool is genuinely everything.
 *
 * ## Why client-side rather than query parameters
 *
 * `AEO_PLAYBOOK.md` §3.4: `?category=react` splits the index's link equity
 * across URLs showing subsets of the same content. Real routes already exist for
 * the durable views — `/notebook/category/<slug>` per category, and
 * `/notebook/page/<n>` for the paginated archive — so this control is the
 * *interactive* surface on top, not the canonical one. Every article is rendered
 * server-side into this page before any filtering runs, so a crawler with no
 * JavaScript still sees all of them.
 *
 * ## Why rows
 *
 * A hundred cards is a wall. Rows scan, and this is a page people arrive at
 * knowing roughly what they want.
 */

type Sort = "newest" | "oldest" | "ranked";

const SORTS: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  // Honest label. `popularityScore` is an editorial forecast, not measured
  // readership — see the note on it in lib/notebook/types.ts. Calling this
  // "Most popular" would be a claim about the world that happens to be false.
  { value: "ranked", label: "Editor's ranking" },
];

export default function BrowseAll({
  posts,
  categories,
  tags,
}: {
  posts: CardPost[];
  categories: { category: Category; count: number }[];
  tags: { tag: string; count: number }[];
}) {
  const [category, setCategory] = useState<Category | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("newest");

  const dirty = category !== null || tag !== null || sort !== "newest";

  const results = useMemo(() => {
    let out = posts;
    if (category) out = out.filter((p) => p.category === category);
    if (tag) out = out.filter((p) => p.tags.includes(tag));

    const sorted = [...out];
    if (sort === "ranked") {
      sorted.sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0));
    } else {
      sorted.sort((a, b) => {
        if (a.published !== b.published) {
          return sort === "newest"
            ? a.published < b.published
              ? 1
              : -1
            : a.published > b.published
              ? 1
              : -1;
        }
        return (b.popularityScore ?? 0) - (a.popularityScore ?? 0);
      });
    }
    return sorted;
  }, [posts, category, tag, sort]);

  const reset = () => {
    setCategory(null);
    setTag(null);
    setSort("newest");
  };

  return (
    <div className="nb-layout">
      <div className="nb-main">
        <div className="nb-toolbar">
          <p className="nb-count" aria-live="polite">
            {results.length} of {posts.length} {posts.length === 1 ? "article" : "articles"}
            {category ? ` in ${category}` : ""}
            {tag ? ` tagged ${tag}` : ""}
          </p>

          <div className="nb-toolbar-controls">
            <label htmlFor="nb-sort" className="nb-vh">
              Sort articles
            </label>
            <select
              id="nb-sort"
              className="nb-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <button type="button" onClick={reset} disabled={!dirty} className="nb-reset">
              Reset
            </button>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="nb-empty">
            <p>Nothing matches that combination.</p>
            <button type="button" onClick={reset} className="nb-reset is-inline">
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="nb-rows">
            {results.map((p) => (
              <ArticleRow key={p.slug} post={p} />
            ))}
          </ul>
        )}
      </div>

      <aside className="nb-side" aria-label="Filter articles">
        <section className="nb-side-block">
          <h2 className="nb-side-title" id="nb-cat-label">
            Category
          </h2>
          <ul className="nb-side-list" aria-labelledby="nb-cat-label">
            {categories.map(({ category: c, count }) => {
              const on = category === c;
              return (
                <li key={c} className="nb-side-row">
                  <button
                    type="button"
                    className={`nb-side-item${on ? " is-on" : ""}`}
                    aria-pressed={on}
                    onClick={() => setCategory(on ? null : c)}
                  >
                    <span className="nb-side-dot" style={{ background: CATEGORY_ACCENT[c] }} />
                    <span className="nb-side-label">{c}</span>
                    <span className="nb-side-n">{count}</span>
                  </button>
                  {/* The archive route for this category. The filter above is
                      the fast path; this is the linkable, crawlable one. */}
                  <Link
                    href={`/notebook/category/${categorySlug(c)}`}
                    className="nb-side-go"
                    aria-label={`Open the ${c} archive`}
                  >
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="nb-side-block">
          <h2 className="nb-side-title" id="nb-tag-label">
            Tag
          </h2>
          <ul className="nb-side-list" aria-labelledby="nb-tag-label">
            {tags.map(({ tag: t, count }) => {
              const on = tag === t;
              return (
                <li key={t}>
                  <button
                    type="button"
                    className={`nb-side-item${on ? " is-on" : ""}`}
                    aria-pressed={on}
                    onClick={() => setTag(on ? null : t)}
                  >
                    <span className="nb-side-label">{t}</span>
                    <span className="nb-side-n">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="nb-side-block nb-side-block--feed">
          <h2 className="nb-side-title">Follow</h2>
          <p className="nb-side-note">New articles as they are published.</p>
          <a href="/notebook/rss.xml" className="nb-side-feed">
            RSS feed
          </a>
        </section>
      </aside>
    </div>
  );
}
