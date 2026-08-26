import type { Post } from "./types";

/**
 * The subset of a post that a card actually renders.
 *
 * ## Why this exists
 *
 * It began as a payload fix. The index used to be one client component
 * (`NotebookBrowser`, removed 26 Aug 2026 when the front page became
 * server-rendered sections), and everything passed to a client component crosses
 * the boundary as serialised data — so passing whole `Post` objects embedded
 * **every article in full**, blocks, code samples, tables and FAQs, into the
 * index payload. It measured 160 KB for five posts, to render a page showing
 * none of that text.
 *
 * That boundary is gone and the type is kept anyway, for a plainer reason: a
 * card needs eleven fields and should not be handed an object carrying an entire
 * article. It documents what a card is allowed to depend on.
 *
 * ## Why it lives here rather than beside the component
 *
 * Anything exported from a `"use client"` module becomes a **client reference** —
 * a stub the bundler swaps in — so calling `toCardPost` from a server component
 * throws rather than running. That cost a build failure once. Helpers used on
 * both sides belong in a module that declares neither, and this one still is.
 */
export type CardPost = Pick<
  Post,
  | "slug"
  | "title"
  | "answer"
  | "published"
  | "category"
  | "tags"
  | "readingMinutes"
  | "cover"
  | "coverAlt"
  | "featured"
  | "popularityScore"
>;

export function toCardPost(p: Post): CardPost {
  return {
    slug: p.slug,
    title: p.title,
    answer: p.answer,
    published: p.published,
    category: p.category,
    tags: p.tags,
    readingMinutes: p.readingMinutes,
    cover: p.cover,
    coverAlt: p.coverAlt,
    featured: p.featured,
    popularityScore: p.popularityScore,
  };
}
