import { SITE_URL } from "@/lib/projects";

/**
 * The 404, as Markdown, for a request whose `Accept` header names
 * `text/markdown`. Browsers keep getting `app/not-found.tsx`.
 *
 * Reached through the `fallback` rewrite in `next.config.ts`, which Next applies
 * only after every page, static file and dynamic route has failed to match. So
 * whether a path is real is decided by Next's own router, not by a list kept
 * here — which is what made AEO_PLAYBOOK.md §8 refuse this the first time. A
 * route-list check in `proxy.ts` would have 404'd live pages for Markdown
 * requests the moment the list drifted; this cannot drift, because there is no
 * list.
 *
 * One case still gets the HTML 404: a path inside a dynamic family that does
 * not exist (`/notebook/no-such-slug`). The `[slug]` route matches first and
 * calls `notFound()`, so the fallback never runs. That is the safe direction —
 * the status is still 404 — and fixing it would mean the list again.
 *
 * The body does not echo the requested path. A static file cannot know it, and
 * reflecting request input into a response is a habit worth not starting.
 */
export const dynamic = "force-static";

const body = `# Page not found (404)

There is no page at this address on ${SITE_URL}. The link may be mistyped, or
the page may have moved.

Where to go instead:

- [Site summary](${SITE_URL}/llms.txt): every page on the site, what each one covers, and which URL answers which question. Start here.
- [Sitemap](${SITE_URL}/sitemap.xml): every public URL with its last-modified date.
- [Full text](${SITE_URL}/llms-full.txt): the whole site as one plain-text document.
- [Home](${SITE_URL}/): who Suman Debnath is and what he has built.

This is the Markdown version of the 404, sent because the request asked for
\`text/markdown\`. A browser receives the same 404 as an HTML page.
`;

export function GET() {
  return new Response(body, {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      // A path that 404s today may be published tomorrow; never let a cache
      // hold on to the answer.
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
