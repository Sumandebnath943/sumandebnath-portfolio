/**
 * Renders a notebook post as a dev.to-ready Markdown file.
 *
 *   node scripts/build-crosspost.mjs what-ai-agents-cost-to-run
 *   node scripts/build-crosspost.mjs --list
 *
 * Writes `_crosspost/<slug>.md`, which is git-ignored. Paste it into dev.to's
 * Markdown editor. It arrives as a draft — see `published: false` below.
 *
 * ── Why a generator rather than converting one article by hand ────────────
 *
 * AEO_PLAYBOOK §6 item 4 is ongoing work, not a one-off: the notebook is the
 * highest-citation-probability material on the site and every post is a
 * candidate. Converting by hand is fine once and wrong by the third time, and
 * the field most likely to be got wrong is the one that matters most.
 *
 * **`canonical_url` is the entire point of the exercise.** A cross-post without
 * it is not a backlink, it is a duplicate competing with the original — the
 * same collision AEO_PLAYBOOK §3.1b spends a section on, except now hosted on a
 * domain with far more authority than this one, so the copy wins. Generated
 * from the slug here, so it cannot be forgotten or typed wrong.
 *
 * ── What it deliberately does not do ──────────────────────────────────────
 *
 * It does not post. dev.to's API needs a key, no token lives in this
 * environment, and none should be pasted into one — the rule set for
 * HuggingFace in AEO_PLAYBOOK §6 item 3, for the same reason. The last step is
 * a human pressing publish on their own account.
 */

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createJiti } from "jiti";

const SITE = "https://sumandebnath.houseofnamus.com";
const OUT_DIR = "_crosspost";

const jiti = createJiti(import.meta.url, {
  // lib/notebook/types.ts imports BannerArt through the "@/" alias. It is a
  // type-only import and vanishes at runtime, but jiti still resolves the
  // specifier, so the alias has to be declared.
  alias: { "@": process.cwd() },
});

/**
 * The site's tag vocabulary mapped onto tags that exist on dev.to.
 *
 * Forem allows a maximum of four tags and they must be lowercase alphanumeric —
 * no spaces, no hyphens, no dots. So "AI-Native" cannot be passed through, and
 * mechanically stripping it to "ainative" would produce a tag with no followers
 * and no feed, which is worse than not tagging at all. These are mapped to tags
 * dev.to actually indexes.
 *
 * Anything unmapped is stripped to lowercase alphanumerics as a fallback, which
 * is right for the ones that already match (react, css, seo).
 */
const DEVTO_TAGS = {
  Agents: "aiagents",
  "AI-Native": "ai",
  Prompting: "ai",
  Engineering: "programming",
  Migration: "programming",
  Process: "productivity",
  Method: "productivity",
  Documentation: "writing",
  Debugging: "debugging",
  "Next.js": "nextjs",
  Routing: "nextjs",
  React: "react",
  StrictMode: "react",
  CSS: "css",
  Layout: "css",
  Design: "design",
  Colour: "design",
  Graphics: "graphics",
  "three.js": "threejs",
  WebGL: "webgl",
  Security: "security",
  SEO: "seo",
  AEO: "seo",
  "Structured Data": "seo",
  Marketing: "marketing",
  Career: "career",
};

const abs = (href) => (href.startsWith("/") ? SITE + href : href);

/** Set in main() from lib/pages.ts, so `promote` blocks can read the same
 *  label and blurb the site renders. */
let lookupPage = () => undefined;

/** Rewrites the inline subset's internal links to absolute URLs.
 *  `**bold**` and `` `code` `` are already Markdown and pass through. */
const inline = (text) => text.replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, (_, label, href) => `[${label}](${abs(href)})`);

function tableOf(head, rows) {
  const line = (cells) => `| ${cells.map((c) => inline(String(c)).replace(/\|/g, "\\|")).join(" | ")} |`;
  return [line(head), `|${head.map(() => " --- ").join("|")}|`, ...rows.map(line)].join("\n");
}

function renderBlock(b) {
  switch (b.kind) {
    case "p":
      return inline(b.text);
    case "h2":
      return `## ${inline(b.text)}`;
    case "h3":
      return `### ${inline(b.text)}`;
    case "ul":
      return b.items.map((i) => `- ${inline(i)}`).join("\n");
    case "ol":
      return b.items.map((i, n) => `${n + 1}. ${inline(i)}`).join("\n");
    case "code":
      return ["```" + (b.lang ?? ""), b.code, "```", b.caption ? `*${inline(b.caption)}*` : ""]
        .filter(Boolean)
        .join("\n");
    case "callout":
      return [b.title ? `> **${inline(b.title)}**` : null, b.title ? ">" : null, `> ${inline(b.text)}`]
        .filter(Boolean)
        .join("\n");
    case "quote":
      return [`> ${inline(b.text)}`, b.cite ? `>\n> — ${inline(b.cite)}` : ""].filter(Boolean).join("\n");
    case "table":
      return [tableOf(b.head, b.rows), b.caption ? `\n*${inline(b.caption)}*` : ""].filter(Boolean).join("\n");
    case "figure":
      return [`![${b.alt.replace(/[[\]]/g, "")}](${abs(b.src)})`, b.caption ? `*${inline(b.caption)}*` : ""]
        .filter(Boolean)
        .join("\n\n");
    case "promote": {
      // The label and blurb come from lib/pages.ts, exactly as PostBody reads
      // them, so a renamed page cannot leave a stale card here either. Falling
      // back to the path would print "agents/migi" as a link label.
      const page = lookupPage(b.href);
      if (!page) throw new Error(`build-crosspost: "${b.href}" is not in lib/pages.ts`);
      return `**[${page.label}](${abs(b.href)})** — ${inline(b.note ?? page.blurb)}`;
    }
    case "pullquote":
      // Dropped on purpose. A pull-quote is a typographic device that repeats a
      // sentence the reader has already met; rendered as Markdown it is simply
      // that sentence twice, which reads as an editing mistake.
      return null;
    default:
      throw new Error(`build-crosspost: no Markdown rule for block kind "${b.kind}"`);
  }
}

function devtoTags(post) {
  const seen = new Set();
  for (const t of post.tags) {
    const mapped = DEVTO_TAGS[t] ?? t.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (mapped) seen.add(mapped);
  }
  return [...seen].slice(0, 4);
}

function render(post) {
  const url = `${SITE}/notebook/${post.slug}`;

  const front = [
    "---",
    `title: ${JSON.stringify(post.title)}`,
    // Arrives as a draft, always. Publishing is a human pressing the button on
    // their own account, having read what is about to go out under their name.
    "published: false",
    `description: ${JSON.stringify(post.description)}`,
    `tags: ${devtoTags(post).join(", ")}`,
    `canonical_url: ${url}`,
    post.cover ? `cover_image: ${abs(post.cover)}` : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  const parts = [front, "", `> **In short —** ${inline(post.answer)}`];

  if (post.facts?.length) {
    parts.push("", tableOf(["", ""], post.facts.map((f) => [`**${f.label}**`, f.value])));
  }

  for (const b of post.blocks) {
    const md = renderBlock(b);
    if (md !== null) parts.push("", md);
  }

  if (post.faqs?.length) {
    parts.push("", "## Questions this answers");
    for (const f of post.faqs) parts.push("", `### ${inline(f.q)}`, "", inline(f.a));
  }

  // dev.to renders its own "Originally published at" line from canonical_url,
  // so this is the human-facing invitation rather than a second attribution.
  parts.push("", "---", "", `*Written while building. More at [${SITE.replace(/^https:\/\//, "")}](${url}).*`, "");

  return parts.join("\n");
}

async function main() {
  const arg = process.argv[2];
  const { allPosts, getPost } = await jiti.import("../lib/notebook/index.ts");
  ({ getPage: lookupPage } = await jiti.import("../lib/pages.ts"));

  if (!arg || arg === "--list") {
    console.log("Usage: node scripts/build-crosspost.mjs <slug>\n\nPosts:");
    for (const p of allPosts()) console.log(`  ${p.slug}`);
    process.exitCode = arg ? 0 : 1;
    return;
  }

  const post = getPost(arg);
  if (!post) {
    console.error(`No post with slug "${arg}". Run with --list to see them.`);
    process.exitCode = 1;
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, `${post.slug}.md`);
  const md = render(post);
  await writeFile(out, md, "utf8");

  const words = md.split(/\s+/).length;
  console.log(`  ${out}`);
  console.log(`  canonical_url  ${SITE}/notebook/${post.slug}`);
  console.log(`  tags           ${devtoTags(post).join(", ")}`);
  console.log(`  cover_image    ${post.cover ? abs(post.cover) : "(none)"}`);
  console.log(`  ~${words} words, arrives as a DRAFT (published: false)`);
}

main();
