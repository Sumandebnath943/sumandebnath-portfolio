import type { Post } from "../types";

const post: Post = {
  slug: "ai-catalog-1-0-schema-changes",
  title:
    "6 schema changes between AI Catalog 0.2 and 1.0 that break static audits",
  answer:
    "Upgrading /.well-known/ai-catalog.json from draft 0.2 to specification 1.0 requires six changes: bumping specVersion to 1.0, renaming entries[].id to identifier, renaming host.name to displayName, stripping url/description/contact from HostInfo, omitting root-level extensions so Lighthouse's strict schema passes, and keeping bare domains and honest MIME types over copy-pasted DID or MCP strings.",
  description:
    "PageSpeed Insights' Agentic Browsing audit fails 0.2 manifests as invalid. Here are the 6 schema changes between AI Catalog 0.2 and 1.0, and two warnings to leave alone.",
  metaTitle: "How to upgrade /.well-known/ai-catalog.json to 1.0",
  // SERP-checked 26 Oct 2026. Several Oct 2026 explainers (PageSpeed Matters,
  // Forge Vertical, Turva, Synscribe) introduce Lighthouse v13.3+'s Agentic
  // Browsing audit and paste the spec's Weather MCP example. None document the
  // 0.2 → 1.0 breaking renames, Lighthouse rejecting root-level `extensions`,
  // or why `text/html` and `text/plain` entries trigger Low media-type warnings.
  keywords: [
    "ai-catalog.json schema is invalid PageSpeed",
    "upgrade ai-catalog.json 0.2 to 1.0",
    "Agentic Browsing Lighthouse ai-catalog.json",
    "HostInfo additionalProperties ai-catalog 1.0",
  ],
  published: "2026-10-26",
  category: "Marketing & AI",
  // High gap score because PageSpeed Insights only recently rolled out the
  // Agentic Browsing category (Lighthouse 13.3+), and existing write-ups paste
  // the greenfield MCP example rather than debugging why an existing 0.2
  // manifest fails validation. Evergreen is moderate because the spec itself
  // is already renaming the path toward /.well-known/ard.json.
  popularity: {
    searchDemand: 14,
    evergreen: 11,
    painIntensity: 14,
    gapInCoverage: 17,
    shareability: 14,
  },
  popularityScore: 70,
  tags: ["AEO", "Structured Data", "Documentation"],
  readingMinutes: 6,
  cover: "/notebook/ai-catalog-1-0-schema-changes.webp",
  coverAlt:
    "A small white robot with glowing blue eyes holding a magnifying glass with a red warning triangle between two floating code windows comparing AI Catalog 0.2 and AI Catalog 1.0, with a printed Static Audit checklist marked with red crosses on the desk in front of it.",
  facts: [
    { label: "File path", value: "/.well-known/ai-catalog.json" },
    { label: "Header discovery", value: "Link: </.well-known/ai-catalog.json>; rel=\"service-desc\"; type=\"application/json\"" },
    { label: "Audit", value: "PageSpeed Insights · Agentic Browsing (Lighthouse 13.3+)" },
    { label: "Before", value: "3/4 passed (\"ai-catalog.json schema is invalid\")" },
    { label: "After", value: "4/4 passed (commits dc02dbe and 2689b83, 7 Oct 2026)" },
    { label: "Entries declared", value: "8 (llms.txt, llms-full.txt, sitemap.xml, rss.xml, 4 entity pages)" },
    { label: "Low warnings kept", value: "8 (honest MIME types over fake MCP/agent-card types)" },
    { label: "Successor path", value: "/.well-known/ard.json (ARD spec; Lighthouse still checks ai-catalog.json)" },
  ],

  blocks: [
    {
      kind: "p",
      text: "On 26 August 2026 I added `public/.well-known/ai-catalog.json` to this site, wired it into the HTTP `Link` header as `rel=\"service-desc\"`, verified it returned `200 application/json` with `Access-Control-Allow-Origin: *`, and left it alone. Six weeks later, on 7 October, PageSpeed Insights rolled out its new **Agentic Browsing** category and failed the file on sight.",
    },
    {
      kind: "p",
      text: "The error message was four words: `ai-catalog.json schema is invalid`. Clearing it took two commits (`dc02dbe` and `2689b83`), because fixing what the written specification asked for still failed the validator Google actually ships.",
    },

    {
      kind: "h2",
      id: "pagespeed-agentic-browsing-rejects-0-2",
      text: "PageSpeed Insights added an Agentic Browsing audit that rejects 0.2 manifests",
    },
    {
      kind: "p",
      text: "Unlike Performance or Accessibility, which score a page from 0 to 100, Lighthouse's Agentic Browsing panel grades a pass/fail ratio across four checks. One of those checks fetches `/.well-known/ai-catalog.json` and validates it against the **Agentic Resource Discovery (ARD) / AI Catalog 1.0** schema.",
    },
    {
      kind: "p",
      text: "Every early adopter who wrote a manifest in late summer 2026 wrote it against draft `0.2`. The first breaking change is the version string itself: `" +
        "\"specVersion\": \"0.2\"` is no longer recognised. Bumping it to `\"1.0\"` is step one, and doing only step one simply reveals the five structural errors underneath it.",
    },

    {
      kind: "h2",
      id: "id-to-identifier-and-name-to-displayname",
      text: "Entries rename id to identifier and host renames name to displayName",
    },
    {
      kind: "p",
      text: "Draft `0.2` used short, familiar JSON keys: `host.name` for the publisher's name, and `id` on each object inside `entries[]`. Specification `1.0` (defined in the CDDL at `github.com/Agent-Card/ai-catalog/specification/ai-catalog.md`) renames both.",
    },
    {
      kind: "ul",
      items: [
        "**Change 2 (`entries[].id` → `entries[].identifier`).** Every `AssetEntry` in `entries[]` must carry `identifier`. All eight entries on this domain — two plain-text context files, the XML sitemap, the RSS feed and the four [identity pages](/notebook/when-ai-engines-name-the-wrong-person) — keep their `urn:air:sumandebnath.houseofnamus.com:...` URNs, under the new key.",
        "**Change 3 (`host.name` → `host.displayName`).** The top-level `host` object is now typed as `HostInfo`, where the human-readable publisher label is `displayName` and is the only required property on the object.",
      ],
    },
    {
      kind: "p",
      text: "Neither rename changes the meaning of the field. Both fail a `0.2` file immediately because the 1.0 validator rejects unknown properties alongside missing required ones.",
    },

    {
      kind: "h2",
      id: "hostinfo-drops-url-description-contact",
      text: "HostInfo drops url, description and contact down to four allowed keys",
    },
    {
      kind: "p",
      text: "In `0.2`, `host` was where you described the site owner in prose: `name`, `url`, `description` and `contact`. In `1.0`, `HostInfo` is locked down with `additionalProperties: false` and permits four keys in total:",
    },
    {
      kind: "table",
      head: ["0.2 host key", "1.0 HostInfo key", "Status in 1.0"],
      rows: [
        ["name", "displayName", "Required string"],
        ["(none)", "identifier", "Optional string (domain or URI/DID)"],
        ["url", "documentationUrl", "Optional URI pointing at human/LLM docs"],
        ["(none)", "logoUrl", "Optional URI"],
        ["description", "(removed from HostInfo)", "Rejected by additionalProperties: false"],
        ["contact", "(removed from HostInfo)", "Rejected by additionalProperties: false"],
      ],
      caption: "How the top-level host object changed between AI Catalog 0.2 and 1.0.",
    },
    {
      kind: "p",
      text: "That is **Change 4**. Leaving `url`, `description` or `contact` inside `host` fails the schema check even after `displayName` and `identifier` are added. On this site, `documentationUrl` points at `https://sumandebnath.houseofnamus.com/llms.txt`.",
    },

    {
      kind: "h2",
      id: "lighthouse-rejects-root-extensions",
      text: "Lighthouse rejects the root extensions block that the specification itself defines",
    },
    {
      kind: "p",
      text: "When I stripped `description` and `contact` out of `host` in commit `dc02dbe`, I did not delete them. I followed the specification and moved them into the official metadata extension at the root of the document: `extensions[\"https://ai-catalog.org/extensions/metadata\"]`.",
    },
    {
      kind: "p",
      text: "I pushed `dc02dbe`, ran PageSpeed Insights against the live URL, and watched it fail with the exact same error: `ai-catalog.json schema is invalid` (3/4 passed).",
    },
    {
      kind: "p",
      text: "That is **Change 5**, and it is the trap you only find by testing against the live validator. Lighthouse's JSON schema enforces `additionalProperties: false` at the document root and allows only three top-level properties: `specVersion`, `host` and `entries`. A root-level `extensions` object — even one using the specification's own namespace — fails validation.",
    },
    {
      kind: "code",
      lang: "json",
      caption: "public/.well-known/ai-catalog.json (root structure that passes 4/4)",
      code: `{
  "specVersion": "1.0",
  "host": {
    "displayName": "Suman Debnath",
    "identifier": "sumandebnath.houseofnamus.com",
    "documentationUrl": "https://sumandebnath.houseofnamus.com/llms.txt"
  },
  "entries": [
    {
      "identifier": "urn:air:sumandebnath.houseofnamus.com:context:llms-txt",
      "displayName": "Site summary for language models",
      "description": "A generated, always-current summary of every page on the site...",
      "type": "text/plain",
      "url": "https://sumandebnath.houseofnamus.com/llms.txt",
      "representativeQueries": [
        "Who is Suman Debnath?",
        "What is on sumandebnath.houseofnamus.com?"
      ]
    }
  ]
}`,
    },
    {
      kind: "p",
      text: "Removing the seven lines of root `extensions` in commit `2689b83` moved PageSpeed Insights from **3/4 to 4/4 passed**. Nothing was lost by deleting them: the biography and contact email were already declared in [`/llms.txt`](/notebook/do-you-need-an-llms-txt), in the root `Person` JSON-LD, and on `/about`.",
    },
    {
      kind: "pullquote",
      text: "Clearing it took two commits, because fixing what the written specification asked for still failed the validator Google actually ships.",
    },

    {
      kind: "h2",
      id: "did-web-and-honest-mime-types",
      text: "Copying did:web from the spec example points resolvers at a 404 unless you host did.json",
    },
    {
      kind: "p",
      text: "The sixth change is what goes inside `host.identifier` and `entries[].type`, where copying the specification's examples verbatim turns a syntax fix into a false claim.",
    },
    {
      kind: "p",
      text: "Every example in the specification sets `\"identifier\": \"did:web:example.com\"` on `host`. Under the W3C `did:web` method, claiming `did:web:sumandebnath.houseofnamus.com` is a promise that a resolver can fetch `https://sumandebnath.houseofnamus.com/.well-known/did.json` and receive a valid DID Document with verification keys. This site does not host a DID document and has no use for one. Setting `host.identifier` to the bare domain (`\"sumandebnath.houseofnamus.com\"`) satisfies the schema without advertising infrastructure that 404s.",
    },

    {
      kind: "h2",
      id: "eight-low-warnings-kept-on-purpose",
      text: "Eight Low warnings on media types stay because HTML pages are not MCP cards",
    },
    {
      kind: "p",
      text: "Even with **4/4 passed**, expanding the Agentic Browsing details panel in PageSpeed Insights shows eight **Low** severity warnings on this file — one for every entry in `entries[]`. Lighthouse flags `text/plain`, `application/xml`, `application/rss+xml` and `text/html` as *\"not standard discovery types\"*.",
    },
    {
      kind: "p",
      text: "The validator's internal allowlist expects agent-protocol MIME types: `application/agent-card+json`, `application/mcp-server-card+json`, skill bundles or sub-catalogs. Yet the specification's own text states that an AI Catalog is artifact-agnostic, and its normative CDDL example includes an entry with `\"type\": \"application/parquet\"`.",
    },
    {
      kind: "p",
      text: "I left all eight warnings in place. `/llms.txt` is `text/plain`. `/sitemap.xml` is `application/xml`. `/about` is `text/html`. Relabelling a web page as `application/mcp-server-card+json` to make eight Low badges disappear would tell every agent reading the catalog to parse an HTML document as a Model Context Protocol server descriptor.",
    },
    {
      kind: "p",
      text: "One more moving target is worth watching if you maintain this file. The upstream working group has already renamed the canonical specification path from `/.well-known/ai-catalog.json` to **`/.well-known/ard.json`** (with `rel=\"ard\"` in the `Link` header), treating `ai-catalog.json` as the legacy path that clients *may* still check. As of October 2026, Lighthouse still fetches `ai-catalog.json`. Until the audit catches up with the rename, `ai-catalog.json` is the file that has to stay valid.",
    },
  ],

  faqs: [
    {
      q: "Why does PageSpeed Insights say ai-catalog.json schema is invalid?",
      a: "Lighthouse 13.3+'s Agentic Browsing audit validates /.well-known/ai-catalog.json against version 1.0 of the AI Catalog schema with additionalProperties: false at both the root and HostInfo levels. Manifests written for draft 0.2 fail because specVersion is 0.2, entries use id instead of identifier, host uses name instead of displayName, or the root object includes extensions.",
    },
    {
      q: "What properties are allowed inside host in ai-catalog.json 1.0?",
      a: "The HostInfo object in AI Catalog 1.0 allows only four properties: displayName (required), identifier (optional), documentationUrl (optional), and logoUrl (optional). Including 0.2 fields such as name, url, description or contact inside host fails schema validation.",
    },
    {
      q: "Why does Lighthouse show Low warnings for text/plain and text/html in ai-catalog.json?",
      a: "Lighthouse checks entries[].type against a short list of agent-specific MIME types such as application/agent-card+json and application/mcp-server-card+json. When a catalog lists documentation or web pages using their true MIME types (text/plain, text/html, application/xml, application/rss+xml), the audit still passes 4/4 but logs a Low informational warning per entry.",
    },
  ],

  seeAlso: [
    "/notebook/nextjs-markdown-content-negotiation",
    "/notebook/agentic-ready-website",
    "/notebook/do-you-need-an-llms-txt",
  ],
};

export default post;
