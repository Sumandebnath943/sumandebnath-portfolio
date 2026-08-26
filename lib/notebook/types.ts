import type { BannerForm } from "@/components/ui/BannerArt";

// The content model for /notebook.
//
// Typed blocks rather than MDX, deliberately. Three reasons:
//
//   1. AGENTS.md opens by warning that this Next.js differs from what is in
//      training data. `@next/mdx` is exactly the kind of build-level plugin
//      where that bites, and a blog is not worth a toolchain risk.
//   2. It matches the repo. Page content already lives in `const` arrays at the
//      top of server components (PROJECT_BIBLE §8) — MDX would introduce a
//      second, parallel way of holding content.
//   3. It is typed. A post that forgets its extractable answer, or a table with
//      a ragged row, fails `tsc` instead of rendering wrong in production.
//
// The cost is that authoring is TypeScript, not Markdown. Inline markup is
// covered by the tiny subset in `inline()` — links, code and bold — which is
// enough for prose and, crucially, makes in-paragraph internal links possible.

export type Block =
  /** Body paragraph. Supports the inline subset: [label](href), `code`, **bold**. */
  | { kind: "p"; text: string }
  /** Section heading. `id` is required — it anchors the table of contents and
   *  gives answer engines a fragment to cite. */
  | { kind: "h2"; text: string; id: string }
  | { kind: "h3"; text: string; id?: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "code"; lang?: string; code: string; caption?: string }
  /** A boxed aside. `warn` is the "this will bite you" tone; `note` is neutral. */
  | { kind: "callout"; tone: "warn" | "note"; title?: string; text: string }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "table"; head: string[]; rows: string[][]; caption?: string };

export interface PostFact {
  label: string;
  value: string;
}

/**
 * The five things that decide whether a technical article travels, each scored
 * 0–20. Written down rather than kept in the author's head so the ranking can be
 * argued with — a single opaque "popularity: 8" invites nothing but agreement.
 */
export interface PopularityFactors {
  /** How many people hit this problem. A CSS rule everyone meets beats a
   *  library quirk a hundred people meet. */
  searchDemand: number;
  /** Whether it stays true. A framework migration decays as the version ages;
   *  a CSS specification behaviour does not. */
  evergreen: number;
  /** How badly it hurts when you hit it. Silent failures score highest — they
   *  are the ones people search for at 1am having tried everything. */
  painIntensity: number;
  /** How well the answer is already covered elsewhere. Low competition scores
   *  high; a topic with fifty good StackOverflow answers scores low. */
  gapInCoverage: number;
  /** Whether someone would send it to a colleague. */
  shareability: number;
}

export const POPULARITY_FACTORS: (keyof PopularityFactors)[] = [
  "searchDemand",
  "evergreen",
  "painIntensity",
  "gapInCoverage",
  "shareability",
];

/**
 * URL slug for a category — "CSS & Layout" becomes "css-layout".
 *
 * Hand-rolled rather than a generic slugify: the category list is closed and
 * five items long, so a dependency would be doing nothing a regex cannot, and
 * this way the mapping is visible in one place. If a new category ever slugs to
 * the same string as an existing one, `categoryFromSlug` returns the first
 * match and the second becomes unreachable — check before adding.
 */
export function categorySlug(c: Category): string {
  return c
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryFromSlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => categorySlug(c) === slug);
}

export function scorePopularity(f: PopularityFactors): number {
  return POPULARITY_FACTORS.reduce((n, k) => n + f[k], 0);
}

/**
 * The primary category. **One per post, from a closed list.**
 *
 * Categories and tags do different jobs and the difference matters here.
 * A category is the *section of the blog* a post belongs to — closed, small,
 * mutually exclusive, and the thing the filter bar is built from. Tags are open
 * and plural, describing what the post touches. A blog that lets categories
 * grow freely ends up with twenty of them, one post each, and a filter bar
 * nobody uses.
 *
 * Adding a value here is a deliberate decision. Adding a tag is not.
 */
export const CATEGORIES = [
  "CSS & Layout",
  "React",
  "Next.js",
  "Graphics",
  "Practice",
  // Added 26 Aug 2026. The notebook was five engineering categories and nothing
  // else, so every career, marketing or working-method piece would have landed
  // in "Practice" — one bucket holding two unrelated kinds of writing, which is
  // the filter-bar failure this list exists to prevent.
  //
  // Three, not five: "Career" carries the transition and hiring pieces,
  // "Marketing & AI" is written for marketers and covers AEO/GEO as the
  // marketing discipline it actually is, and "Method" is how the work gets done.
  // Opinion was considered and rejected — it would have held one post.
  "Career",
  "Marketing & AI",
  "Method",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Accent per category — drives the generated cover art and the filter chips. */
export const CATEGORY_ACCENT: Record<Category, string> = {
  "CSS & Layout": "#b4472a",
  React: "#38408f",
  "Next.js": "#45505e",
  Graphics: "#7a3358",
  Practice: "#2c6047",
  // Same register as the five above — desaturated, dark enough to carry cream
  // text, and distinct from each other at the small size the filter chips use.
  Career: "#8a5a1f",
  "Marketing & AI": "#1f5f6b",
  Method: "#5a3a7a",
};

/**
 * The banner figure each category's archive page draws.
 *
 * `BannerArt` normally picks one of its eight forms by hashing the route, which
 * is right for twenty-odd unrelated pages and wrong here: it handed the
 * marketing archive an arbitrary shape, and a category page should look like
 * what it is about. Eight categories and eight forms happen to map cleanly, so
 * each one is chosen rather than drawn:
 *
 *   CSS & Layout    lattice        a grid, which is the subject
 *   React           constellation  a component tree
 *   Next.js         arcs           routes, request paths
 *   Graphics        moire          an actual rendering artefact
 *   Practice        orbits         cycles, returning to the same problem
 *   Career          contours       terrain crossed over time
 *   Marketing & AI  waveform       signal and reach
 *   Method          halftone       a field built from small repeated marks
 *
 * Typed as the union `BannerArt` exports, so a renamed form fails the build here
 * rather than silently falling back to the hash.
 */
export const CATEGORY_BANNER: Record<Category, BannerForm> = {
  "CSS & Layout": "lattice",
  React: "constellation",
  "Next.js": "arcs",
  Graphics: "moire",
  Practice: "orbits",
  Career: "contours",
  "Marketing & AI": "waveform",
  Method: "halftone",
};

export interface Post {
  slug: string;

  /**
   * The H1. Question-shaped or claim-shaped, never a noun phrase.
   *
   * An answer engine matches a user's question against headings before it
   * matches body text, so "Why does position: sticky stop working?" is findable
   * in a way that "Sticky positioning notes" is not.
   */
  title: string;

  /**
   * The extractable answer, rendered directly under the H1.
   *
   * **Keep it 40–60 words and make it self-contained.** This is the block a
   * model lifts and quotes; it has to survive being read with no surrounding
   * page. No "as described above", no pronouns pointing at the title.
   */
  answer: string;

  /** `<meta name="description">`. Distinct from `answer` — this one is written
   *  for a search result, that one for a quote. Keep it 140–160 characters:
   *  Google truncates around 160 and a description that ends mid-clause reads as
   *  neglect. */
  description: string;

  /**
   * Overrides the H1 in the `<title>` tag. Optional.
   *
   * Added 26 Aug 2026 with the SEO audit, to resolve a real conflict between two
   * readers. The H1 can be a hook — "Eight repositories in eleven days. Six died
   * within three." — while the thing that appears in a search result carries the
   * phrase somebody actually typed. Google truncates near sixty characters, and
   * eleven of the twenty-six headlines were longer than that.
   *
   * Set it only when the two genuinely want to differ. Where the title is
   * already short and searchable, leave this unset and the title is used.
   *
   * **Keep it under 60 characters.** SEO_AUDIT.md §3 rule 1.
   */
  metaTitle?: string;

  /**
   * Target search phrases, most important first.
   *
   * Distinct from `tags`, which are the blog's own taxonomy and drive the filter
   * UI. A tag is "Security"; a keyword is "API keys AI generated code". Falls
   * back to `tags` when unset, which is what every post did before the audit.
   *
   * One primary phrase per article — `AEO_PLAYBOOK.md` §3.1b's
   * one-question-per-URL constraint applies to keywords too. Two articles
   * targeting one phrase compete with each other.
   */
  keywords?: string[];

  /** ISO date, YYYY-MM-DD. */
  published: string;
  /** ISO date. Set only on a substantive revision; it drives `dateModified`. */
  updated?: string;

  /** The section this belongs to. Exactly one — see the note on CATEGORIES. */
  category: Category;

  /** Open and plural. What the post touches, for the tag filter. */
  tags: string[];

  /** Rough reading time in minutes, shown in the dateline. */
  readingMinutes: number;

  /**
   * Path under /public to a cover image, e.g. "/notebook/sticky.jpg".
   *
   * Optional, and posts without one are not second-class: `PostCover` draws
   * deterministic art from the slug and the category accent instead. That is a
   * real design, not a grey placeholder box — a blog whose covers are missing
   * looks broken, whereas one with a consistent generated pattern looks
   * deliberate. Drop a real image in and it takes over.
   */
  cover?: string;

  /** Alt text. Required whenever `cover` is set. */
  coverAlt?: string;

  /**
   * Promotes the post to the lead slot on the index. At most one should carry
   * it; if several do, the newest wins.
   */
  featured?: boolean;

  /** Hand-picked for the "Start here" rail. */
  pick?: boolean;

  /**
   * Editorial estimate of how well this article should travel, 0–100.
   *
   * `popularityScore` is the sum of the five factors in `POPULARITY_FACTORS`
   * below. The highest scorer is surfaced as the blog's "Most popular"; see
   * `mostPopularPost()` in lib/notebook/index.ts.
   *
   * **This is a forecast, not a measurement — and the UI says so.** Nothing on
   * this site counts readers yet, so the badge reads "Editor's pick · most
   * popular" rather than "Most read". Labelling an estimate as observed traffic
   * would be a claim about the world that happens to be false, and the one
   * thing a blog cannot afford is a reader discovering its numbers are decorative.
   *
   * Page views already go to Neon for /desk-4f7a, so a real ranking is a
   * reporting query away whenever the traffic is worth ranking. At that point
   * this field becomes the fallback for articles too new to have data.
   */
  popularityScore?: number;

  /** The per-factor breakdown behind `popularityScore`, kept so the number is
   *  auditable rather than asserted. Each is 0–20. */
  popularity?: PopularityFactors;

  /** The quotable specifics — versions, numbers, measurements. Rendered as a
   *  definition table, which is far easier to extract than the same facts
   *  buried in prose. */
  facts?: PostFact[];

  blocks: Block[];

  /** Emitted as FAQPage structured data on the post. Two to four is plenty. */
  faqs?: { q: string; a: string }[];

  /** Extra internal links for the foot of the post, beyond the standard rail.
   *  Paths as they appear in lib/pages.ts. */
  seeAlso?: string[];
}
