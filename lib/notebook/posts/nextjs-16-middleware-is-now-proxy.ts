import type { Post } from "../types";

const post: Post = {
  slug: "nextjs-16-middleware-is-now-proxy",
  title: "Next.js 16 replaced middleware.ts with proxy.ts",
  answer:
    "In Next.js 16, middleware.ts is gone. The replacement is proxy.ts at the project root, exporting a function named proxy(request) and a config.matcher, and it runs on the Node runtime rather than Edge. The matcher is read statically at build time, so it cannot reference an imported constant.",
  description:
    "middleware.ts is gone in Next.js 16. What proxy.ts changes, why the matcher cannot reference an imported constant, and the migration in practice.",
  metaTitle: "Next.js 16: middleware.ts is now proxy.ts",
  keywords: ["Next.js 16 middleware", "proxy.ts Next.js", "middleware.ts removed", "Next.js 16 migration"],
  published: "2026-08-24",
  category: "Next.js",
  pick: true,
  // High demand during the migration window and very little written about it yet — but it decays as Next 16 stops being new, which is what caps it.
  popularity: {
    searchDemand: 17,
    evergreen: 9,
    painIntensity: 14,
    gapInCoverage: 17,
    shareability: 14,
  },
  popularityScore: 71,
  tags: ["Next.js", "Migration", "Routing"],
  readingMinutes: 5,
  cover: "/notebook/nextjs-16-middleware-is-now-proxy.webp",
  coverAlt:
    "A signpost with the old nameplate unscrewed and leaning against the post as a new one is fixed on.",
  facts: [
    { label: "Old", value: "middleware.ts, export default middleware(), Edge runtime" },
    { label: "New", value: "proxy.ts, export function proxy(request), Node runtime" },
    { label: "Export name", value: "Must be `proxy` — a default export is not picked up" },
    { label: "config.matcher", value: "Read statically at build; cannot be a computed value" },
  ],

  blocks: [
    {
      kind: "p",
      text: "If you are upgrading to Next.js 16 and your `middleware.ts` has quietly stopped running, it is not broken — it is no longer the file Next looks for. The concept survives under a new name, a new export, and a different runtime.",
    },

    { kind: "h2", id: "what-changed", text: "What actually changed" },
    {
      kind: "table",
      head: ["", "Before", "Next.js 16"],
      rows: [
        ["File", "middleware.ts", "proxy.ts"],
        ["Export", "default, or named `middleware`", "named `proxy`"],
        ["Signature", "(request: NextRequest)", "(request: NextRequest)"],
        ["Runtime", "Edge", "Node"],
        ["Config", "export const config", "export const config"],
      ],
    },
    {
      kind: "p",
      text: "The rename is the visible part. The runtime move is the part that changes what you can write: on Node you are no longer confined to the Edge subset, so Node built-ins and libraries that depend on them work in a file where they previously could not.",
    },

    { kind: "h2", id: "the-shape", text: "The shape of the new file" },
    {
      kind: "code",
      lang: "ts",
      caption: "proxy.ts, at the project root — the same level middleware.ts sat at.",
      code: `import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};`,
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The export name is not negotiable",
      text: "It must be `export function proxy`. A default export does not get picked up, and — as with the old middleware — nothing tells you. The file compiles, the build passes, and the function simply never runs.",
    },

    { kind: "h2", id: "the-matcher-trap", text: "The matcher is read statically" },
    {
      kind: "p",
      text: "This is the one that cost me real time. `config.matcher` is not evaluated at runtime — Next reads it out of the source at build time, before any module graph exists. That means it cannot reference anything imported.",
    },
    {
      kind: "code",
      lang: "ts",
      code: `// ✗ Does not work. ADMIN_PATH is an import; the build-time reader
//   cannot resolve it, and the matcher ends up wrong or empty.
import { ADMIN_PATH } from "@/lib/admin-path";
export const config = { matcher: [\`\${ADMIN_PATH}/:path*\`] };

// ✓ Works. The literal has to be present in this file.
export const config = { matcher: ["/desk-4f7a/:path*"] };`,
    },
    {
      kind: "p",
      text: "If you keep a path constant in a shared module — which you should, if several files need it — the matcher becomes a deliberate duplication of that value. Comment it as such at both ends, because it looks exactly like the kind of duplication a future reader will helpfully refactor away.",
    },

    { kind: "pullquote", text: "Comment it as such at both ends, because it looks exactly like the kind of duplication a future reader will helpfully refactor away." },

    { kind: "h2", id: "migrating", text: "Migrating in practice" },
    {
      kind: "ol",
      items: [
        "Rename `middleware.ts` to `proxy.ts`, keeping it at the project root.",
        "Rename the exported function to `proxy` and make sure it is a named export.",
        "Inline any imported constants used inside `config.matcher` as string literals.",
        "Re-check anything that assumed the Edge runtime — the file now runs on Node.",
        "Verify against a production build, not `next dev`.",
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "Verify on a production build",
      text: "This is general advice for anything request-scoped, but it matters doubly here. Development mode differs enough in how requests are handled that a proxy which looks correct under `next dev` can behave differently once built — and the failure mode of this file is silence, not an error.",
    },

    { kind: "h2", id: "why", text: "Why the rename is the right call" },
    {
      kind: "p",
      text: "\"Middleware\" was borrowed from Express, where it means a chain of handlers each calling the next. Next's version was never that. It was one function, running once, in front of routing — closer to a reverse proxy than to a middleware stack, and the name led people to expect composition that was never there.",
    },
    {
      kind: "p",
      text: "`proxy` describes what the file actually is. Renames are annoying exactly once; a misleading name is annoying every time somebody new reads the code.",
    },
  ],

  faqs: [
    {
      q: "What replaced middleware.ts in Next.js 16?",
      a: "proxy.ts, placed at the project root. It exports a named function `proxy(request)` instead of a default or `middleware` export, and it runs on the Node runtime rather than the Edge runtime. The `config.matcher` export works the same way.",
    },
    {
      q: "Why is my Next.js 16 proxy.ts not running?",
      a: "The most common causes are a default export instead of the required named `proxy` export, or a config.matcher that references an imported constant. The matcher is read statically at build time, so it can only contain string literals present in that file. Neither mistake produces an error.",
    },
    {
      q: "Can config.matcher use a variable in Next.js 16?",
      a: "No. Next reads config.matcher out of the source at build time, before the module graph is resolved, so imported constants and computed values cannot be used. The matcher patterns must be string literals written directly in proxy.ts.",
    },
  ],

  seeAlso: ["/learnings"],
};

export default post;
