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
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Accent per category — drives the generated cover art and the filter chips. */
export const CATEGORY_ACCENT: Record<Category, string> = {
  "CSS & Layout": "#b4472a",
  React: "#38408f",
  "Next.js": "#45505e",
  Graphics: "#7a3358",
  Practice: "#2c6047",
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
   *  for a search result, that one for a quote. */
  description: string;

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
