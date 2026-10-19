import type { Post } from "../types";

const post: Post = {
  slug: "nextjs-markdown-content-negotiation",
  title:
    "Two Next.js rewrites that serve Markdown to agents without breaking the cache",
  answer:
    "Serve Markdown for Accept: text/markdown in Next.js by placing a beforeFiles rewrite on static pages and a fallback rewrite on unmatched paths in next.config.ts, pointing at force-static route handlers that send Vary: Accept. Unlike proxy.ts or headers() in page.tsx, the HTML cache key and Next's router Vary header stay untouched.",
  description:
    "Most Next.js tutorials for Accept: text/markdown break static caching or RSC navigation. How to wire content negotiation in next.config.ts with zero proxy overhead.",
  metaTitle: "How to serve Markdown via Accept header in Next.js",
  // SERP-checked 19 Oct 2026. "Accept: text/markdown Next.js" is covered by
  // several 2026 tutorials (99francs, Checkly, Sanity community posts), and
  // every one of them either reads headers() inside page.tsx or overwrites
  // Vary: Accept inside middleware.ts. Next's own backend-for-frontend guide
  // uses a flat rewrites() array, which lands in afterFiles and never fires on
  // a non-dynamic route like `/`. The phrases below target the rewrite phases
  // and the Vary/Link traps none of those pieces cover.
  keywords: [
    "Next.js Accept text/markdown content negotiation",
    "Next.js beforeFiles rewrite Accept header",
    "Vary Accept Next.js RSC cache",
    "Markdown 404 Next.js fallback rewrite",
  ],
  published: "2026-10-19",
  category: "Next.js",
  // High pain and gap scores because the top-ranking code snippets actively
  // break either static generation (calling headers() in page.tsx) or client
  // navigation caching (overwriting Next's router Vary in middleware), and
  // Next's own doc example silently fails on non-dynamic routes.
  popularity: {
    searchDemand: 15,
    evergreen: 14,
    painIntensity: 15,
    gapInCoverage: 16,
    shareability: 15,
  },
  popularityScore: 75,
  tags: ["Next.js", "Routing", "AEO"],
  readingMinutes: 7,
  facts: [
    { label: "Framework", value: "Next.js 16.3.0 (App Router)" },
    { label: "Homepage rule", value: "beforeFiles rewrite: / → /index.md (200)" },
    { label: "404 rule", value: "fallback rewrite: /:path* → /missing.md (404)" },
    { label: "Header condition", value: "has: accept matching (.*)text/markdown(.*)" },
    { label: "HTML Vary header", value: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" },
    { label: "Markdown Vary header", value: "Accept (on /index.md and /missing.md only)" },
    { label: "Audit result", value: "Ora Is Agentic: 82/100 → 100/100 (12 Oct 2026)" },
    { label: "Verification suite", value: "45 assertions in scripts/markdown-check.mjs" },
  ],

  blocks: [
    {
      kind: "p",
      text: "On 25 August 2026 I ran an agentic-readiness audit against this site, saw it fail Markdown content negotiation, and refused to build it. Seven weeks later, on 12 October, I reversed half of that decision and shipped it in `next.config.ts`. The audit moved from **82/100 to 100/100**.",
    },
    {
      kind: "p",
      text: "What changed in between was not the audit. It was finding a way to serve `text/markdown` on `/` and on 404s without paying any of the four costs that made me refuse it the first time.",
    },

    {
      kind: "h2",
      id: "why-middleware-breaks-caching",
      text: "The standard middleware pattern breaks either static caching or client navigation",
    },
    {
      kind: "p",
      text: "Search for how to handle `Accept: text/markdown` in Next.js today and you will find two patterns repeated across almost every tutorial. The first calls `headers()` from `next/headers` inside `page.tsx`, checks for `text/markdown`, and branches. That one fails immediately on a static site: reading request headers inside a page component opts the route out of full-route static rendering and turns every human visit into a dynamic render.",
    },
    {
      kind: "p",
      text: "The second pattern intercepts the request in `middleware.ts` — renamed to [`proxy.ts` in Next.js 16](/notebook/nextjs-16-middleware-is-now-proxy) — rewrites to a Markdown endpoint, and calls `response.headers.set(\"Vary\", \"Accept\")`. That looks cleaner and causes two worse problems.",
    },
    {
      kind: "ul",
      items: [
        "**Overwriting `Vary` breaks App Router client navigation.** Next.js already sets `Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch` on page responses so the browser and CDN do not mix full HTML documents with React Server Component flight payloads. Replacing that header with `Vary: Accept` strips all four tokens.",
        "**Appending `Accept` on the HTML response fragments the CDN cache.** Chrome sends a 133-character `Accept` string ending in `application/signed-exchange;v=b3;q=0.7`. Firefox and Safari send different strings. Putting `Vary: Accept` on the HTML page splits one cached document into several.",
        "**A Markdown 404 in `proxy.ts` needs a manual list of valid routes.** Because `not-found.tsx` renders a React component and cannot change its own `Content-Type` to `text/markdown`, a proxy can only return a Markdown 404 if it already knows which URLs exist. The moment you add a page and forget that list, live pages start returning 404 to Markdown requests while looking fine in every browser.",
      ],
    },
    {
      kind: "p",
      text: "That third failure is why I refused the feature in August. A bug that only fires when an agent sends a header no browser ever sends is invisible by construction.",
    },

    {
      kind: "h2",
      id: "why-afterfiles-fails",
      text: "Next.js's own rewrite example silently fails on static pages like the homepage",
    },
    {
      kind: "p",
      text: "Next.js documents content negotiation in its own bundled guide (`01-app/02-guides/backend-for-frontend.md`). Its example returns a flat array from `rewrites()` in `next.config.js`, matching `Accept: (.*)text/markdown(.*)` on `/docs/:slug*` and rewriting to `/docs/md/:slug*`.",
    },
    {
      kind: "p",
      text: "Copy that pattern onto `/` or `/about` and nothing happens. A `curl -H \"Accept: text/markdown\"` against the homepage comes back `200 text/html` every time.",
    },
    {
      kind: "p",
      text: "The reason is buried in the routing order documented in `rewrites.md`. When `rewrites()` returns a flat array, Next.js places every rule into the `afterFiles` phase. And Next.js evaluates routes in eight steps:",
    },
    {
      kind: "table",
      head: ["Step", "What Next.js checks", "What matches here"],
      rows: [
        ["1–3", "headers(), redirects(), proxy.ts", "Request/response headers, redirects, proxy logic"],
        ["4", "beforeFiles rewrites", "Runs before the filesystem is checked"],
        ["5", "public/, _next/static, and non-dynamic pages", "Static routes like / and /about resolve here"],
        ["6", "afterFiles rewrites (the default array)", "Too late for / — step 5 already served app/page.tsx"],
        ["7", "Dynamic routes ([slug])", "Routes like /docs/:slug* or /notebook/[slug]"],
        ["8", "fallback rewrites", "Runs only after steps 5, 6 and 7 have all failed to match"],
      ],
      caption: "Next.js App Router evaluation order from node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/rewrites.md.",
    },
    {
      kind: "p",
      text: "The documentation example works only because `/docs/:slug*` is a dynamic route resolved at step 7, after `afterFiles` has had its turn at step 6. A non-dynamic page like `app/page.tsx` resolves at step 5. By the time `afterFiles` runs, the HTML homepage has already won.",
    },

    {
      kind: "h2",
      id: "beforefiles-and-fallback",
      text: "beforeFiles and fallback let Next.js route both cases without a route list",
    },
    {
      kind: "p",
      text: "Look at steps 4 and 8 in that table and both halves of the problem solve themselves at once. Returning `{ beforeFiles, afterFiles, fallback }` from `rewrites()` puts the homepage rule before step 5 and the 404 rule after step 7:",
    },
    {
      kind: "code",
      lang: "ts",
      caption: "next.config.ts",
      code: `async rewrites() {
  const wantsMarkdown = [
    { type: "header" as const, key: "accept", value: "(.*)text/markdown(.*)" },
  ];
  return {
    beforeFiles: [{ source: "/", has: wantsMarkdown, destination: "/index.md" }],
    afterFiles: [],
    fallback: [{ source: "/:path*", has: wantsMarkdown, destination: "/missing.md" }],
  };
},`,
    },
    {
      kind: "p",
      text: "Both destinations are ordinary static Route Handlers (`export const dynamic = \"force-static\"`). `app/index.md/route.ts` calls `llmsTxt()` from `lib/llms-txt.ts` — the exact same function that generates [`/llms.txt`](/notebook/do-you-need-an-llms-txt) — and returns it with `Content-Type: text/markdown; charset=utf-8` and `Vary: Accept`. `app/missing.md/route.ts` returns a static Markdown 404 body with `status: 404`, `Vary: Accept`, and links to `/llms.txt`, `/sitemap.xml`, `/llms-full.txt` and `/`.",
    },
    {
      kind: "p",
      text: "Because `fallback` only runs after every static file, static page and dynamic route has failed to match, **Next.js's own router decides what is a 404.** There is no list of valid paths to keep in sync. And because Vercel evaluates `next.config.ts` rewrites before looking up the cache entry, `Vary: Accept` lives on `/index.md` and `/missing.md` alone. A browser asking for `/` never matches the rewrite, receives the static HTML page with Next's four router `Vary` tokens intact, and never shares a cache key with `Accept: text/markdown`.",
    },
    {
      kind: "pullquote",
      text: "A bug that only fires when an agent sends a header no browser ever sends is invisible by construction.",
    },
    {
      kind: "p",
      text: "One deliberate edge case remains. A missing slug inside a dynamic route family — such as `/notebook/no-such-slug` — matches `app/notebook/[slug]/page.tsx` at step 7 before `fallback` ever runs, calls `notFound()`, and returns the HTML 404. The HTTP status is still 404, and fixing that one case would bring back the manual route list.",
    },

    {
      kind: "h2",
      id: "config-link-header-trap",
      text: "A site-wide Link header in next.config.ts silently drops the handler's canonical tag",
    },
    {
      kind: "p",
      text: "Serving the homepage's content from `/index.md` creates a duplicate URL that a search crawler could index on its own. You cannot fix that by putting `X-Robots-Tag: noindex` on `/index.md`, because `/` itself serves that exact response whenever a crawler asks for `text/markdown` — a `noindex` header there would tell a Markdown-capable crawler to drop the homepage from its index.",
    },
    {
      kind: "p",
      text: "The clean answer is an HTTP `Link: </>; rel=\"canonical\"` header on `/index.md`, pointing back at the HTML homepage. I set that header inside `app/index.md/route.ts`, built the site, ran the check script, and watched the canonical header vanish.",
    },
    {
      kind: "p",
      text: "Nothing had errored. What happened is that `next.config.ts` already sets a site-wide RFC 8288 discovery `Link` header on all documents (`/((?!_next/|api/).*)`), advertising `/llms.txt`, `/sitemap.xml` and `/.well-known/ai-catalog.json`. When a route handler and `next.config.ts` both set the same header key, **the config rule wins and overwrites the handler's header.**",
    },
    {
      kind: "code",
      lang: "ts",
      caption: "next.config.ts",
      code: `{
  source: "/((?!_next/|api/).*)",
  headers: [{ key: "Link", value: discovery }],
},
{
  source: "/index.md",
  headers: [
    { key: "Link", value: \`\${discovery}, </>; rel="canonical"\` },
  ],
},`,
    },
    {
      kind: "p",
      text: "Adding a second rule for `/index.md` below the document rule in `next.config.ts` solved it: in `headers()`, a later rule for the same key replaces the earlier one, so `/index.md` carries both the nine discovery relations and `</>; rel=\"canonical\"`.",
    },

    {
      kind: "h2",
      id: "two-vary-lines-in-next-start",
      text: "next start emits two Vary lines where Vercel serves one",
    },
    {
      kind: "p",
      text: "When I tested `/index.md` locally against `next start`, the response headers came back with two separate `Vary` lines: Next's router `Vary` on the first line, and the handler's `Vary: Accept` on the second. Under RFC 9110 §5.3 multiple header lines with the same field name are semantically identical to one comma-separated line, and Node's `fetch` joins them automatically, so `res.headers.get(\"vary\")` passes.",
    },
    {
      kind: "p",
      text: "A naive scanner reading only the first raw header line would miss `Accept`. Before writing code to work around `setVaryHeader` in `server/base-server.js`, I deployed and checked the raw lines against Vercel's edge.",
    },
    {
      kind: "p",
      text: "On Vercel, both `/index.md` and `/missing.md` return a single `Vary: Accept` line. The two-line output is an artefact of `next start` running the App Router server locally rather than serving the prerendered static metadata at the edge. Had I tried to strip Next's `Vary` in code before measuring production, I would have added machinery to fix something that never happens live.",
    },

    {
      kind: "h2",
      id: "why-other-routes-refuse-markdown",
      text: "Every other route on this site still refuses Markdown on purpose",
    },
    {
      kind: "p",
      text: "By October 2026 Cloudflare's *Markdown for Agents* report documented that coding agents such as **Claude Code** and **OpenCode** send `Accept: text/markdown` when fetching URLs, and Next.js's own documentation site serves Markdown twins across its guide pages. Even so, only `/` and the 404 negotiate on this domain. Asking `/about`, `/resume` or `/banking/rm-copilot` for `text/markdown` still returns the HTML page.",
    },
    {
      kind: "p",
      text: "The reason is the fifth objection I wrote down in August, and it is the one that a better routing trick does not change: **on a product dossier, a generated Markdown twin is thinner than the page it replaces.** Converting a case study with interactive architecture diagrams, comparison tables and structured JSON-LD into a stripped Markdown summary hands an agent *less* evidence than the server-rendered HTML already contains.",
    },
    {
      kind: "p",
      text: "The homepage is the one exception because `/llms.txt` was already built to be the complete, structured index of the site — every project, every route, every article and what question each URL answers. Serving that file when an agent asks `/` for Markdown gives it the map it actually needs, and forty-five checks in `scripts/markdown-check.mjs` make sure no human browser ever sees it.",
    },
  ],

  faqs: [
    {
      q: "How do you serve Markdown for Accept: text/markdown in Next.js without breaking static caching?",
      a: "Use beforeFiles and fallback rewrites in next.config.ts with a has condition matching the Accept header `(.*)text/markdown(.*)`, pointing at force-static Route Handlers (/index.md and /missing.md) that return Content-Type: text/markdown and Vary: Accept. Because rewrites resolve before cache lookup, the HTML page keeps Next's router Vary header untouched and its CDN cache is never split.",
    },
    {
      q: "Why does a Next.js rewrite with has Accept: text/markdown not fire on the homepage?",
      a: "When rewrites() in next.config.ts returns a flat array, Next.js places those rules in the afterFiles phase, which runs at step 6 — after static and non-dynamic pages like app/page.tsx have already matched at step 5. To intercept a static page when Accept: text/markdown is present, return an object from rewrites() and place the rule in beforeFiles (step 4).",
    },
    {
      q: "How do you return a Markdown 404 page in Next.js App Router?",
      a: "Add a fallback rewrite in next.config.ts matching source `/:path*` with `has: [{ type: 'header', key: 'accept', value: '(.*)text/markdown(.*)' }]` pointing to a static Route Handler such as `/missing.md` that returns status 404 and Content-Type: text/markdown. Because fallback rewrites run only after static files, pages and dynamic routes have all failed to match, Next.js's router decides what is a 404 without maintaining a manual list of valid routes.",
    },
  ],

  seeAlso: [
    "/notebook/do-you-need-an-llms-txt",
    "/notebook/agentic-ready-website",
    "/notebook/nextjs-16-middleware-is-now-proxy",
  ],
};

export default post;
