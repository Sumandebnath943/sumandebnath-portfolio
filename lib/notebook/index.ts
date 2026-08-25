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

import { CATEGORIES, categorySlug, type Category, type Post } from "./types";

import overflowHiddenKillsPositionSticky from "./posts/overflow-hidden-kills-position-sticky";
import nextjs16MiddlewareIsNowProxy from "./posts/nextjs-16-middleware-is-now-proxy";
import strictmodeDefeatsInitGuards from "./posts/strictmode-defeats-init-guards";
import threeJsR152ColourManagement from "./posts/three-js-r152-colour-management";
import theTrapIWroteDownWasWrong from "./posts/the-trap-i-wrote-down-was-wrong";
import marketerToAiProductBuilder from "./posts/marketer-to-ai-product-builder";
import jsonLdMissingNextScriptBeforeinteractive from "./posts/json-ld-missing-next-script-beforeinteractive";
import researchBeforeWritingAPrompt from "./posts/research-before-writing-a-prompt";
import citedByChatgptWhatIChanged from "./posts/cited-by-chatgpt-what-i-changed";
import realAiToolOrWrapper from "./posts/real-ai-tool-or-wrapper";
import keepingSecretsOutOfAiBuiltApps from "./posts/keeping-secrets-out-of-ai-built-apps";
import theCostOfBuildingAlone from "./posts/the-cost-of-building-alone";
import neverRunACodingAgentOnAutopilot from "./posts/never-run-a-coding-agent-on-autopilot";
import tasteIsTheLastThingToBeAutomated from "./posts/taste-is-the-last-thing-to-be-automated";
import finishingIsNotBuilding from "./posts/finishing-is-not-building";
import whatAMarketerHasToLearn from "./posts/what-a-marketer-has-to-learn";
import whatAiReplacesInMarketing from "./posts/what-ai-replaces-in-marketing";
import whatMarketingTeamsShouldAutomateFirst from "./posts/what-marketing-teams-should-automate-first";

export type { Post, Block, PostFact, Category } from "./types";
export { CATEGORIES, CATEGORY_ACCENT, categorySlug, categoryFromSlug } from "./types";

/** Newest first. `allPosts()` sorts by date, so ordering here is not load-bearing. */
const POSTS: Post[] = [
  overflowHiddenKillsPositionSticky,
  nextjs16MiddlewareIsNowProxy,
  strictmodeDefeatsInitGuards,
  threeJsR152ColourManagement,
  theTrapIWroteDownWasWrong,
  marketerToAiProductBuilder,
  jsonLdMissingNextScriptBeforeinteractive,
  researchBeforeWritingAPrompt,
  citedByChatgptWhatIChanged,
  realAiToolOrWrapper,
  keepingSecretsOutOfAiBuiltApps,
  theCostOfBuildingAlone,
  neverRunACodingAgentOnAutopilot,
  tasteIsTheLastThingToBeAutomated,
  finishingIsNotBuilding,
  whatAMarketerHasToLearn,
  whatAiReplacesInMarketing,
  whatMarketingTeamsShouldAutomateFirst,
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

/** Categories that actually have posts, with counts — the filter bar is built
 *  from this rather than from CATEGORIES, so an empty category never renders a
 *  chip that filters to nothing. */
export function activeCategories(): { category: Category; count: number }[] {
  const counts = new Map<Category, number>();
  for (const p of POSTS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return CATEGORIES.filter((c) => counts.has(c)).map((c) => ({
    category: c,
    count: counts.get(c)!,
  }));
}

/** The lead post for the index. Newest among those flagged `featured`, falling
 *  back to the newest post overall so the slot is never empty. */
export function featuredPost(): Post {
  const flagged = allPosts().filter((p) => p.featured);
  return flagged[0] ?? allPosts()[0];
}

/** The hand-picked "Start here" set. See the note on `pick` in types.ts for why
 *  this is not called `popular`. */
export function pickedPosts(): Post[] {
  return allPosts().filter((p) => p.pick);
}

/**
 * The highest-scoring article by `popularityScore`.
 *
 * A forecast, not a measurement — see the note on `popularityScore` in
 * types.ts. Callers must label it honestly; the badge reads "Editor pick"
 * rather than "Most read" for that reason.
 */
export function mostPopularPost(): Post | undefined {
  const scored = POSTS.filter((p) => typeof p.popularityScore === "number");
  if (!scored.length) return undefined;
  return scored.reduce((best, p) =>
    (p.popularityScore ?? 0) > (best.popularityScore ?? 0) ? p : best,
  );
}

/** Every article in one category, newest first. */
export function postsInCategory(c: Category): Post[] {
  return allPosts().filter((p) => p.category === c);
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
