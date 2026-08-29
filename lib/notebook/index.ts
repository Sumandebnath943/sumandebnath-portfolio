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
import aeoVsSeoWhatChanges from "./posts/aeo-vs-seo-what-changes";
import agenticReadyWebsite from "./posts/agentic-ready-website";
import doYouNeedAnLlmsTxt from "./posts/do-you-need-an-llms-txt";
import aiProductRoleWithoutCsDegree from "./posts/ai-product-role-without-cs-degree";
import aiSkillsForAMarketingCv from "./posts/ai-skills-for-a-marketing-cv";
import whatAiNativeActuallyMeans from "./posts/what-ai-native-actually-means";
import shippingAProductInAWeekend from "./posts/shipping-a-product-in-a-weekend";
import isAiGeneratedCodeSafeForProduction from "./posts/is-ai-generated-code-safe-for-production";
import emptyBetweenProjects from "./posts/empty-between-projects";

export type { Post, Block, PostFact, Category } from "./types";
export {
  CATEGORIES,
  CATEGORY_ACCENT,
  CATEGORY_BANNER,
  categorySlug,
  categoryFromSlug,
} from "./types";

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
  aeoVsSeoWhatChanges,
  agenticReadyWebsite,
  doYouNeedAnLlmsTxt,
  aiProductRoleWithoutCsDegree,
  aiSkillsForAMarketingCv,
  whatAiNativeActuallyMeans,
  shippingAProductInAWeekend,
  isAiGeneratedCodeSafeForProduction,
  emptyBetweenProjects,
];

export const NOTEBOOK_PATH = "/notebook";

/**
 * All posts, newest first, with `popularityScore` breaking ties.
 *
 * The tiebreak is not decoration. Twenty-four of the twenty-six articles share a
 * publication date, because they were written in one programme — so sorting by
 * date alone left the order of almost the whole archive falling through to
 * whatever sequence `POSTS` happened to be typed in. That is an arbitrary order
 * presented to the reader as "newest first", and it made paginating the archive
 * meaningless.
 *
 * `popularityScore` is the honest thing to break the tie with: it is already the
 * site's own editorial ranking, it is already labelled as a forecast rather than
 * measured traffic (see types.ts), and it is stable across builds. Posts sharing
 * a date therefore appear strongest first, which is what a reader would want
 * anyway.
 */
export function allPosts(): Post[] {
  return [...POSTS].sort((a, b) => {
    if (a.published !== b.published) return a.published < b.published ? 1 : -1;
    return (b.popularityScore ?? 0) - (a.popularityScore ?? 0);
  });
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

/**
 * The rest of a post's category, newest first, with the post itself removed.
 *
 * Feeds the article rail and, later, the end-of-article grid. It is allowed to
 * come back empty and callers must render nothing when it does: four of the
 * eight categories hold fewer than three posts, which is the same reason the
 * index gives them chips instead of rails.
 */
export function relatedInCategory(post: Post, limit = 3): Post[] {
  return postsInCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, limit);
}

/**
 * The highest-scoring articles by `popularityScore`, strongest first.
 *
 * The plural of `mostPopularPost`, and it inherits the same obligation: this is
 * an editorial forecast, not measured traffic (see the note on the field in
 * types.ts). **Anything rendering it must say "Editor's pick", never "Most
 * read".** Nothing on this site counts readers yet.
 *
 * Unscored posts are excluded rather than counted as zero, so an article
 * published without a popularity block never displaces one that has been
 * assessed.
 *
 * `exclude` takes a set rather than a slug because the one caller needs to
 * suppress several at once: in a small category the highest-scoring post is
 * very often also one of the three most recent, and the rail would otherwise
 * print it twice.
 */
export function popularPosts(limit = 2, exclude: ReadonlySet<string> = new Set()): Post[] {
  return allPosts()
    .filter((p) => typeof p.popularityScore === "number" && !exclude.has(p.slug))
    .sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
    .slice(0, limit);
}

/** Everything an article page offers a reader once they finish. */
export interface FurtherReading {
  /** Rail: the rest of this post's category. */
  related: Post[];
  /** Rail: the editor's pick. */
  picks: Post[];
  /** The foot of the article: three more. */
  more: Post[];
}

/**
 * The three "read next" slots on an article, chosen together.
 *
 * Composed in one place for the same reason `magazine()` composes the index:
 * every slot draws from one pool and marks what it took, so no article appears
 * twice on the page. Chosen separately, the rail's "more in this category" and
 * the grid at the foot would print an identical three cards on every post that
 * has three — which is most of them.
 *
 * `more` prefers the rest of the category and falls back to the newest across
 * the notebook. That fallback is what keeps the grid full for React, Graphics
 * and CSS & Layout, which hold a single article each and would otherwise end on
 * nothing.
 */
export function furtherReading(post: Post): FurtherReading {
  const related = relatedInCategory(post, 3);

  const taken = new Set<string>([post.slug, ...related.map((p) => p.slug)]);
  const picks = popularPosts(2, taken);
  for (const p of picks) taken.add(p.slug);

  const more: Post[] = [];
  for (const p of [...postsInCategory(post.category), ...allPosts()]) {
    if (more.length === 3) break;
    if (taken.has(p.slug)) continue;
    taken.add(p.slug);
    more.push(p);
  }

  return { related, picks, more };
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

/* ── The index, composed ──────────────────────────────────────────────────
 *
 * `/notebook` is a front page, not a list. Four constants decide its shape and
 * they are here rather than in the template so the arithmetic is inspectable.
 */

/** Articles per page in the paginated archive. */
export const POSTS_PER_PAGE = 12;

/* The zone budget. Every number here is spent out of one pool of twenty-six, so
   they are declared together and add up in public: 1 + 3 + 5 + 4 + 2 + 4 = 19
   curated, leaving 7 for the archive at the foot. Raise one and something below
   it gets thinner — there is no slack. */

/** Zone A, column two — the hand-picked set. */
const PICKS_ON_INDEX = 3;
/** Zone A, column three — headlines only, no images. */
const BRIEF_SIZE = 5;
/** Zone B — four compact cards across. */
const ROW_SIZE = 4;
/** Zone C — the two tiles flanking the ranked list. */
const FEATURE_COUNT = 2;
/** Zone C, centre — the ranked headline list. */
const RANKED_SIZE = 4;
/** Zone D — headlines under each section name. */
const SECTION_SIZE = 3;
/**
 * A category needs this many articles to earn a column in the sections zone.
 *
 * Below it the category still exists, still has an archive route and still
 * appears as a chip — it simply does not get a column, because a column holding
 * one headline reads as a rendering fault rather than a section. Four of the
 * eight categories are currently below the line.
 */
const SECTION_MIN = 3;

export interface Magazine {
  /** Zone A: the lead story. */
  hero: Post;
  /** Zone A, column two. */
  picks: Post[];
  /** Zone A, column three — rendered as headlines, not cards. */
  brief: Post[];
  /** Zone B: four compact cards. */
  row: Post[];
  /** Zone C: the two tiles. */
  features: Post[];
  /** Zone C: the ranked list between them. */
  ranked: Post[];
  /**
   * Zone D: the sections directory.
   *
   * **The one zone that may repeat what the zones above used**, and the only
   * exception to the rule below. It is not a feed — it is an index of the
   * notebook's sections, and an index that hides a category's newest article
   * because a zone further up already showed it is simply wrong about what is
   * in that category. HBR's topic zone works the same way.
   */
  sections: { category: Category; posts: Post[] }[];
  /** Categories too small for a column — rendered as links, not headlines. */
  chips: { category: Category; count: number }[];
  /** The first page of the archive: everything the curated zones did not use. */
  latest: Post[];
  /** Total articles left after curation, across every archive page. */
  archiveCount: number;
  totalPages: number;
}

/**
 * The front page's composition.
 *
 * **Nothing appears twice, except in the sections directory.** Each zone takes
 * from a shared pool and marks what it took, so the lead story is not repeated
 * four rows down and a curated article is not repeated in the archive at the
 * foot.
 *
 * The consequence is worth stating plainly: curation consumes nineteen of the
 * twenty-six, the archive is the remainder, and a second page exists only once
 * that remainder passes POSTS_PER_PAGE. At twenty-six articles it does not, and
 * page two appears on its own once the notebook reaches thirty-one.
 *
 * ## Why the zones are shaped differently from one another
 *
 * Five identical three-up grids stacked down a page read as one canvas no
 * matter what is in them. The column counts here go 3 (asymmetric), 4, 3, 4, 1
 * — no two adjacent zones share a rhythm, which is the actual mechanism behind
 * a magazine front page rather than the card design.
 */
export function magazine(): Magazine {
  const all = allPosts();
  const used = new Set<string>();

  const take = (from: Post[], n: number): Post[] => {
    const out: Post[] = [];
    for (const p of from) {
      if (out.length >= n) break;
      if (used.has(p.slug)) continue;
      used.add(p.slug);
      out.push(p);
    }
    return out;
  };

  /** Highest editorial score first — a forecast, not measured traffic. */
  const byScore = [...all].sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0));

  const hero = take([featuredPost(), ...all], 1)[0];
  const picks = take([...pickedPosts(), ...all], PICKS_ON_INDEX);
  const brief = take(all, BRIEF_SIZE);
  const row = take(all, ROW_SIZE);
  const features = take(byScore, FEATURE_COUNT);
  const ranked = take(byScore, RANKED_SIZE);

  const active = activeCategories();
  // Biggest section first. `activeCategories()` returns declaration order, which
  // put the three-article category above the seven-article one — an order that
  // means nothing to a reader and changes whenever CATEGORIES is edited.
  const sections = active
    .filter((c) => c.count >= SECTION_MIN)
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category))
    .map(({ category }) => ({
      // Straight from the category, not from the pool — see the note on
      // `sections` above.
      category,
      posts: postsInCategory(category).slice(0, SECTION_SIZE),
    }));
  const chips = [...active]
    .filter((c) => c.count < SECTION_MIN)
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));

  const archive = all.filter((p) => !used.has(p.slug));

  return {
    hero,
    picks,
    brief,
    row,
    features,
    ranked,
    sections,
    chips,
    latest: archive.slice(0, POSTS_PER_PAGE),
    archiveCount: archive.length,
    totalPages: Math.max(1, Math.ceil(archive.length / POSTS_PER_PAGE)),
  };
}

/**
 * One page of the archive. Page 1 lives at `/notebook`; 2 and above at
 * `/notebook/page/<n>`.
 *
 * Real routes rather than query strings, which is what `AEO_PLAYBOOK.md` §3.4
 * prescribes for exactly this moment — `?page=2` splits the index's link equity
 * across variants of the same content.
 */
export function archivePage(page: number): { posts: Post[]; totalPages: number } {
  const { totalPages } = magazine();
  const all = allPosts();
  const used = new Set(magazineUsedSlugs());
  const archive = all.filter((p) => !used.has(p.slug));
  const start = (page - 1) * POSTS_PER_PAGE;
  return { posts: archive.slice(start, start + POSTS_PER_PAGE), totalPages };
}

/**
 * Slugs the front page's curated zones consume.
 *
 * `sections` is deliberately absent: it re-lists articles other zones already
 * used, so counting it here would empty the archive of things that are still
 * only shown as a headline in a directory column.
 */
function magazineUsedSlugs(): string[] {
  const m = magazine();
  return [
    m.hero.slug,
    ...m.picks.map((p) => p.slug),
    ...m.brief.map((p) => p.slug),
    ...m.row.map((p) => p.slug),
    ...m.features.map((p) => p.slug),
    ...m.ranked.map((p) => p.slug),
  ];
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
