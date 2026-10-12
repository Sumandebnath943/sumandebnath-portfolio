import { llmsTxt } from "@/lib/llms-txt";

/**
 * The homepage, as Markdown.
 *
 * Reached two ways: directly at `/index.md`, and at `/` itself when a request's
 * `Accept` header names `text/markdown` — the `beforeFiles` rewrite in
 * `next.config.ts` sends it here. Browsers never send that media type, so a
 * person always gets the HTML page and nothing about their request changes.
 *
 * The body is `/llms.txt`, verbatim. That file already *is* this site's
 * Markdown summary, generated from the same registries as the pages, so a
 * second hand-written version would only be a second thing to drift. It is also
 * the one Markdown rendering here that is not thinner than the HTML it stands
 * in for — AEO_PLAYBOOK.md §8 refused per-page twins for exactly that reason,
 * and that refusal still stands for every other route.
 *
 * Headers:
 *   • `Vary: Accept` — on this response only. The HTML response keeps the
 *     `Vary` Next sets for its router (rsc, next-router-*), untouched. The
 *     rewrite is decided before Vercel's cache lookup, so the HTML page's cache
 *     entry is never split by browsers' differing Accept strings.
 *   • `Link: rel="canonical"` → the HTML homepage, so `/index.md` is never
 *     indexed as a duplicate of it. Set in `next.config.ts`, not here: the
 *     site-wide discovery Link rule already covers this path and a config
 *     header beats the handler's, so one set here is silently dropped.
 *     Deliberately not `X-Robots-Tag: noindex`: this same response is what `/`
 *     returns to a Markdown-asking crawler, and noindex there would tell it to
 *     drop the homepage.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
