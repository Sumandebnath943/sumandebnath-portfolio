/**
 * Small shared pieces of structured data.
 *
 * ── Why `personRef` exists ────────────────────────────────────────────────
 *
 * Every `ProfilePage` on this site used to point at the person by reference
 * alone:
 *
 *     mainEntity: { "@id": `${SITE_URL}/#person` }
 *
 * That is valid schema.org, it is how the graph stays DRY, and the root
 * layout's `Person` node is the thing it resolves to. Google could not follow
 * it. Search Console reported **"Invalid object type for field mainEntity"**
 * against /about and /profile on 27 Aug 2026 — a critical Profile-page issue —
 * because the object it was handed carries no `@type` and it does not
 * dereference the `@id` across `<script>` blocks.
 *
 * Curiously it *did* resolve on /resume, where the report showed the item name
 * as "Suman Debnath". The difference is almost certainly that /resume emits its
 * own `Person` node at the same `@id`. Whatever the rule is, it is inconsistent,
 * and the fix is to stop depending on it: this object carries `@type` and `name`
 * inline so a reader that resolves nothing still gets a named Person.
 *
 * **The `@id` is the load-bearing part — never remove it.** It is what merges
 * this stub back into the full `Person` in app/layout.tsx. Drop it and the site
 * asserts a second, thinner Suman Debnath, which is the exact confusion /about
 * exists to prevent. Keep the fields here to the minimum Google requires; the
 * layout node owns the identity.
 *
 * This is the fallback anticipated in the comment above the JSON-LD blocks in
 * app/layout.tsx, now that an extractor has proven unable to follow the `@id`.
 *
 * See AEO_PLAYBOOK.md §4 for the node/`@id` map.
 */

import { SITE_URL } from "@/lib/projects";

export const personRef = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Suman Debnath",
  url: SITE_URL,
};

/** He is in India, and a date with no offset is a date in an unknown place. */
const IST = "+05:30";

/**
 * A bare `YYYY-MM-DD` widened to a full ISO 8601 datetime.
 *
 * Search Console reported "Invalid datetime value for dateModified" against
 * /resume for `"2026-08-13"`. Google's Profile-page spec wants a datetime
 * there, not a date. Sources of truth stay as plain dates — `RESUME_UPDATED` in
 * lib/resume.ts also drives a visible footer label — and are widened here, at
 * the point of emission, only for the structured data.
 */
export function schemaDateTime(date: string): string {
  return `${date}T00:00:00${IST}`;
}

/**
 * When the four `QAPage` nodes were published — /about, /profile, /projects and
 * /resume, all committed on this date by the entity-query work.
 *
 * A fixed constant, deliberately, and **not** `routeDate()`. Route dates are
 * regenerated from git history, so they move forward every time a page is
 * touched; a `datePublished` that advances is a false claim. The route dates
 * still feed `dateModified`, which is what they actually describe.
 */
const QA_PUBLISHED = schemaDateTime("2026-08-25");

/* ── The Q&A authorship fields ────────────────────────────────────────────────
   Search Console's Q&A report raised five non-critical issues on 27 Aug 2026,
   all of them the same thing on all four `QAPage` URLs: `author` and
   `datePublished` missing on the Question, and `author`, `datePublished` and
   `upvoteCount` missing on its `acceptedAnswer`. Required fields were all
   present; these are Google's recommended set.

   Every value here is true, which is the only reason to add them. He wrote both
   the question and the answer, so `author` is the site's own Person. The date is
   the day the nodes were committed. And **`upvoteCount` is 0 because these pages
   have no voting** — the field is recommended, a number was needed, and the
   honest number is zero. Do not put a flattering one there.

   Spread rather than repeated, so the four nodes cannot drift apart.

   > These add no rich result. Google restricted Q&A results to forum-shaped
   > sites in 2023 and this portfolio was never eligible. What they add is
   > authorship and freshness for the answer engines that read this markup, and
   > a quiet Search Console — worth having, but do not expect a visible change. */

/** For a `Question`. */
export const qaAuthorship = {
  author: personRef,
  datePublished: QA_PUBLISHED,
};

/** For that question's `acceptedAnswer`. */
export const qaAnswerAuthorship = {
  ...qaAuthorship,
  upvoteCount: 0,
};
