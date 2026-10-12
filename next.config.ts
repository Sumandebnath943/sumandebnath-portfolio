import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack's project root to this directory so Next.js doesn't walk
  // up to a stray lockfile (e.g. C:\Users\Admin\package-lock.json) and pick
  // the wrong workspace root.
  turbopack: {
    root: path.resolve("."),
  },
  images: {
    // Allow local /public images and add external domains here when needed
    remotePatterns: [],
    // Optimized for Vercel deployment
    formats: ["image/avif", "image/webp"],
  },
  // ── Immutable static assets ────────────────────────────────────────────
  // /public is served `Cache-Control: public, max-age=0`, so every repeat visit
  // revalidates. Harmless for a favicon; wrong for the two megabyte-scale files
  // the robot needs, which it re-fetches on EVERY page because the mascot is
  // mounted in the root layout.
  //
  // ⚠ THESE URLS ARE PROMISED IMMUTABLE FOR A YEAR. Browsers will not even
  // revalidate them. Replacing either file in place ships nothing to anyone who
  // has already visited — you MUST give the new file a new name (robot-v2.glb,
  // city-v2.hdr) and update its reference. See PROJECT_BIBLE.md §10.1.
  //   • /hdri/*       — Poly Haven env map (CC0), used by both robot canvases
  //   • /robot-v3.glb — scripts/build-robot-glb.mjs, then shrink-robot-textures
  //
  // The glb is matched literally, not by pattern: `/robot-:version*.glb` reads
  // fine and is rejected by path-to-regexp at build time ("cannot repeat
  // without a prefix and suffix"). A rename means editing this line too, which
  // is already part of the rule.
  /**
   * Permanent redirects for renamed routes.
   *
   * A slug is a promise. Anything that has linked, bookmarked or indexed a URL
   * keeps working, and a 308 passes the ranking signal along rather than
   * stranding it — which is the entire reason a rename is affordable at all.
   *
   * ⚠ These are permanent in both senses: browsers and intermediaries cache a
   * 308 aggressively, and the entry has to stay here indefinitely. Do not remove
   * one to tidy the file; the cost of a rename is carrying its redirect for ever,
   * and that cost is the reason SEO_AUDIT.md §5 renamed one slug out of
   * twenty-six rather than "improving" all of them.
   */
  async redirects() {
    return [
      {
        // Renamed 26 Aug 2026 with the SEO audit. The article's title moved from
        // "What does it actually mean for a website to be agentic-ready?" to
        // "Agentic-ready: the four things an agent has to be able to do", and the
        // new slug is the phrase people search.
        source: "/notebook/what-agentic-ready-actually-means",
        destination: "/notebook/agentic-ready-website",
        permanent: true,
      },
    ];
  },

  /**
   * Markdown content negotiation — the homepage and the 404 only.
   *
   * Added 12 Oct 2026, reversing half of AEO_PLAYBOOK.md §8. A request whose
   * Accept header names `text/markdown` gets Markdown; everything else is
   * untouched. Browsers never send that media type, so no person's request
   * matches either rule. The pattern is the one Next's own guide uses
   * (docs/01-app/02-guides/backend-for-frontend.md, "Content negotiation").
   *
   *   beforeFiles — `/` → `/index.md`. Has to be beforeFiles: `/` is a real
   *                 page, and afterFiles rewrites only run once pages have
   *                 failed to match, so an afterFiles rule here never fires.
   *   fallback    — anything unmatched → `/missing.md`, a Markdown 404.
   *                 Fallback runs after every page, file and dynamic route has
   *                 been tried, so Next's router decides what is real — no list
   *                 of routes to keep in sync, which was the reason §8 refused
   *                 this the first time.
   *
   * Done here rather than in proxy.ts on purpose: the proxy runs on every
   * request and can only be verified against a production build (AGENTS.md §6).
   * These rules add nothing to that path.
   */
  async rewrites() {
    const wantsMarkdown = [
      { type: "header" as const, key: "accept", value: "(.*)text/markdown(.*)" },
    ];
    return {
      beforeFiles: [{ source: "/", has: wantsMarkdown, destination: "/index.md" }],
      afterFiles: [],
      fallback: [{ source: "/:path*", has: wantsMarkdown, destination: "/missing.md" }],
    };
  },

  async headers() {
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];

    /**
     * RFC 8288 Link header — machine discovery before a byte of HTML is parsed.
     *
     * Added 27 Aug 2026. Three agentic-readiness scanners flagged its absence,
     * and all three suggested advertising an API catalog. **This site has no
     * public API** — the four /api routes are the contact form, the visitor
     * beacon and a cron hook, all private plumbing. So every relation below
     * points at something that genuinely exists and is genuinely fetchable.
     *
     * ⚠ Do not add `rel="author"` here. The root layout already emits
     * `<link rel="author" href="{SITE_URL}">`, and a second, differently-valued
     * author claim in the headers is the same "claim half-made" failure
     * AEO_PLAYBOOK.md §6 records for sameAs / rel=me drifting apart. The four
     * identity pages use `describedby`, which is registered and may legitimately
     * repeat.
     *
     * Relation types are IANA-registered with one deliberate exception:
     * `sitemap` is a de-facto token rather than a registered one, kept because
     * it is what consumers actually look for and robots.txt already declares
     * the same URL.
     */
    const discovery = [
      '</llms.txt>; rel="alternate"; type="text/plain"',
      '</llms-full.txt>; rel="alternate"; type="text/plain"',
      '</sitemap.xml>; rel="sitemap"; type="application/xml"',
      '</notebook/rss.xml>; rel="alternate"; type="application/rss+xml"',
      '</.well-known/ai-catalog.json>; rel="service-desc"; type="application/json"',
      // The four pages that own an entity query — AEO_PLAYBOOK.md §3.1b.
      '</about>; rel="describedby"; type="text/html"',
      '</profile>; rel="describedby"; type="text/html"',
      '</resume>; rel="describedby"; type="text/html"',
      '</projects>; rel="describedby"; type="text/html"',
    ].join(", ");

    /**
     * Security baseline — added 12 Oct 2026 after securityheaders.com graded
     * the site D (only HSTS, which Vercel sends by default). Nothing had been
     * refused here; these had simply never been set. CSP is deliberately NOT
     * here yet — see HANDOFF §1.31 for why it is its own decision.
     *
     * nosniff + Referrer-Policy go on every response: nosniff matters most on
     * scripts and stylesheets, which is exactly what the document-only rule
     * below would skip. strict-origin-when-cross-origin is the browsers' own
     * default, stated rather than assumed; same-origin navigations keep the full
     * URL, cross-origin ones get the origin only.
     */
    const everywhere = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ];

    /**
     * Permissions-Policy lists ONLY features nothing on this site uses. Every
     * feature that is used is left unlisted on purpose, so it keeps the browser
     * default (`self`, delegable through an iframe's `allow`):
     *
     *   microphone        — the robot's voice input (components/robot/useWebSpeech.ts)
     *   clipboard-write   — every copy button, and the YouTube embeds' `allow`
     *   web-share         — the notebook's share button, and MigiVideo's `allow`
     *   fullscreen, autoplay, encrypted-media, picture-in-picture,
     *   accelerometer, gyroscope — delegated to the youtube-nocookie iframes in
     *                       Film.tsx and MigiVideo.tsx
     *
     * ⚠ Listing any of those as `()` or `(self)` blocks the delegation and the
     * embed loses it silently — the video still plays, so nobody notices. Before
     * adding a name below, grep app/ and components/ for it AND for every
     * iframe `allow=` attribute. Names must be ones Chromium recognises, or every
     * page load logs "Unrecognized feature" to the console.
     */
    const permissionsPolicy = [
      "camera=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "serial=()",
      "hid=()",
      "midi=()",
      "magnetometer=()",
      "display-capture=()",
      // Opts out of Chrome's Topics API — interest profiling for ads, which
      // this site has no part in.
      "browsing-topics=()",
    ].join(", ");

    return [
      { source: "/:path*", headers: everywhere },
      {
        // Documents only, same pattern as the Link rule below. SAMEORIGIN, not
        // DENY: nothing frames this site today, but a page of his own embedding
        // another should not need this file edited first.
        source: "/((?!_next/|api/).*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: permissionsPolicy },
        ],
      },

      { source: "/hdri/:file*", headers: immutable },
      { source: "/robot-v3.glb", headers: immutable },

      // Documents only. The negative lookahead keeps ~600 bytes of Link header
      // off every font, chunk and optimised image — /_next/static is the bulk
      // of the requests on this site and none of it is a discovery surface.
      // A malformed pattern here fails the build rather than degrading quietly
      // (path-to-regexp throws), which is why this is safe to express as regex.
      {
        source: "/((?!_next/|api/).*)",
        headers: [{ key: "Link", value: discovery }],
      },

      // /index.md is the homepage as Markdown (see rewrites() above), so it
      // points back at the HTML as canonical and is never indexed as a
      // duplicate. Set here rather than in the route handler because the rule
      // above already sets Link on this path, and a config header wins over the
      // handler's own — the handler's canonical was silently dropped. Being the
      // later rule for the same key, this one replaces the line above.
      {
        source: "/index.md",
        headers: [
          { key: "Link", value: `${discovery}, </>; rel="canonical"` },
        ],
      },

      // ARD manifest: JSON, and readable cross-origin so a registry or an agent
      // on another domain can actually fetch it. Short max-age because the
      // entries track real routes and a stale catalog is a lying one.
      {
        source: "/.well-known/ai-catalog.json",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;

