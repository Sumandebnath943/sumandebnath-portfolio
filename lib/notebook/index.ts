// The notebook registry.
//
// Every post is imported here explicitly rather than globbed off the
// filesystem. That is deliberate: an explicit list is statically analysable, so
// `generateStaticParams`, the sitemap, the RSS feed and the generated llms.txt
// all see exactly the same set — and adding a post that renders but is invisible
// to three of those four is not possible.
//
// Adding a post:
//   1. lib/notebook/posts/<slug>.ts, default-exporting a Post
//   2. import it below and add it to POSTS
//   3. node scripts/build-route-dates.mjs
//
// Nothing else. The index page, the sitemap, the feed and llms.txt all derive.

import type { Post } from "./types";

import overflowHiddenKillsPositionSticky from "./posts/overflow-hidden-kills-position-sticky";
import nextjs16MiddlewareIsNowProxy from "./posts/nextjs-16-middleware-is-now-proxy";
import strictmodeDefeatsInitGuards from "./posts/strictmode-defeats-init-guards";
import threeJsR152ColourManagement from "./posts/three-js-r152-colour-management";
import theTrapIWroteDownWasWrong from "./posts/the-trap-i-wrote-down-was-wrong";

export type { Post, Block, PostFact } from "./types";

/** Newest first. `allPosts()` sorts by date, so ordering here is not load-bearing. */
const POSTS: Post[] = [
  overflowHiddenKillsPositionSticky,
  nextjs16MiddlewareIsNowProxy,
  strictmodeDefeatsInitGuards,
  threeJsR152ColourManagement,
  theTrapIWroteDownWasWrong,
];

export const NOTEBOOK_PATH = "/notebook";

/** All posts, newest first. */
export function allPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function postUrl(slug: string): string {
  return `${NOTEBOOK_PATH}/${slug}`;
}

/** The date a post should claim as `dateModified` — its revision if it has one,
 *  otherwise its publication date. */
export function postModified(post: Post): string {
  return post.updated ?? post.published;
}

/** The newest publication or revision across the whole notebook. Drives the
 *  index page's `dateModified` and the RSS channel's `lastBuildDate`. */
export function notebookModified(): string {
  return allPosts()
    .map(postModified)
    .reduce((newest, d) => (d > newest ? d : newest), "1970-01-01");
}

/** Every distinct tag, ordered by how many posts carry it. */
export function allTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of POSTS) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Headings a post exposes as anchors — the table of contents, and the fragment
 *  list an answer engine can cite into. */
export function headingsOf(post: Post): { id: string; text: string }[] {
  return post.blocks
    .filter((b): b is Extract<Post["blocks"][number], { kind: "h2" }> => b.kind === "h2")
    .map((b) => ({ id: b.id, text: b.text }));
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
