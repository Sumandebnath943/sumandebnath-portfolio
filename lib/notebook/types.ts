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

  tags: string[];

  /** Rough reading time in minutes, shown in the dateline. */
  readingMinutes: number;

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
