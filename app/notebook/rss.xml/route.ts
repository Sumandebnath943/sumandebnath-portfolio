import { SITE_URL } from "@/lib/projects";
import { allPosts, notebookModified, postUrl } from "@/lib/notebook";

/**
 * RSS 2.0 feed for /notebook.
 *
 * Worth the ~60 lines. A feed is a machine-readable, dated, complete index of
 * the writing, and several answer engines and aggregators ingest feeds directly
 * rather than re-crawling an HTML index and inferring which entries are new.
 * It is also the only artefact on this site that says "this changed on this
 * date" in a format designed for exactly that question.
 *
 * `force-static` because everything it renders is known at build time. The feed
 * changes when a post is added, which means a deploy, which regenerates it.
 * Rendering per-request would be strictly worse.
 */
export const dynamic = "force-static";

// Attribute and text escaping. Hand-rolled rather than pulled from a package:
// the input is our own typed content, the rule set is five characters, and a
// dependency for this would be a dependency to keep updated forever.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString();
}

export function GET() {
  const posts = allPosts();
  const feedUrl = `${SITE_URL}/notebook/rss.xml`;

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${postUrl(post.slug)}`;
      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <pubDate>${rfc822(post.published)}</pubDate>
      <description>${esc(post.answer)}</description>
      <dc:creator>Suman Debnath</dc:creator>
${post.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Notebook — Suman Debnath</title>
    <link>${esc(`${SITE_URL}/notebook`)}</link>
    <atom:link href="${esc(feedUrl)}" rel="self" type="application/rss+xml" />
    <description>First-hand engineering notes from building AI-native products: what broke, the actual fix, and what generalises.</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} Suman Debnath</copyright>
    <managingEditor>sumandebnath944@gmail.com (Suman Debnath)</managingEditor>
    <webMaster>sumandebnath944@gmail.com (Suman Debnath)</webMaster>
    <lastBuildDate>${rfc822(notebookModified())}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      // Long enough to be cheap, short enough that a new post surfaces the same
      // day for anything polling rather than re-crawling.
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
