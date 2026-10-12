import { llmsTxt } from "@/lib/llms-txt";

/**
 * `/llms.txt` — generated, not hand-written. What goes into it, and why each
 * section is shaped the way it is, lives with the generator in
 * `lib/llms-txt.ts`. It moved there so `/index.md` (the homepage under
 * `Accept: text/markdown`) serves the identical text rather than a copy.
 *
 * `force-static` — every input is known at build time.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
