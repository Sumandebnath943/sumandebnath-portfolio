import type { Post } from "./types";

/**
 * The subset of a post that the blog index actually renders.
 *
 * ## Why this exists
 *
 * `NotebookBrowser` is a client component, and everything passed to a client
 * component crosses the server/client boundary as serialised data. Passing whole
 * `Post` objects therefore embedded **every article in full** — blocks, code
 * samples, tables, FAQs — into the index page payload. It measured 160 KB for
 * five posts, to render a page that shows none of that text, and it grows
 * linearly with the archive.
 *
 * Ten fields is what a card needs. Map through `toCardPost` before crossing.
 *
 * ## Why it lives here and not in the client module
 *
 * It was defined in `NotebookBrowser.tsx` first, and the build failed at
 * prerender. Anything exported from a `"use client"` module becomes a **client
 * reference** — a stub the bundler swaps in — so calling `toCardPost` from a
 * server component throws rather than running. Shared helpers used on both sides
 * of the boundary have to live in a module that declares neither.
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
  };
}
