import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { HTMLElement, NodeType, parse } from "node-html-parser";
import type { Node } from "node-html-parser";
import { CAREER_MODE_URL } from "../components/ui/CareerModeButton";
import { SHOTS as MIGI_SHOTS } from "../components/migi/migi-data";
import { FAMILIES as PENTASHELL_FAMILIES } from "../components/pentashell/pentashell-data";
import { archiveProjects } from "../lib/archive-projects";
import { experiences } from "../lib/learnings-data";
import { allPosts, postModified, postUrl } from "../lib/notebook";
import { PAGES } from "../lib/pages";
import { INDEX_PATH, INDEX_VERSION } from "../lib/portfolio-chat/types";
import type { CatalogEntry, IndexedPage, Passage, PortfolioIndex } from "../lib/portfolio-chat/types";
import { projects, SITE_URL } from "../lib/projects";
import { additionalProjects, flagshipProjects, identity, RESUME_PDF } from "../lib/resume";

const ARTIFACT = resolve(INDEX_PATH);
const APP_OUTPUT = ".next/server/app";
const MAX_PASSAGE_CHARS = 1_250;
const BOUNDARY_TAGS = new Set([
  "ARTICLE", "ASIDE", "BLOCKQUOTE", "BR", "DD", "DETAILS", "DIV", "DL", "DT", "FIGCAPTION",
  "FIGURE", "HEADER", "HR", "LI", "OL", "P", "PRE", "SECTION", "SUMMARY", "TABLE", "TD", "TH", "TR", "UL",
]);

function isNavigation(href: string) {
  return /^\/notebook\/(all|category\/[^/]+|page\/\d+)$/.test(href);
}

function readOutput(path: string) {
  return readFileSync(path, "utf8");
}

function pageFile(href: string) {
  return join(APP_OUTPUT, href === "/" ? "index.html" : `${href.slice(1)}.html`);
}

function clean(text: string) {
  return text.replace(/\s+/g, " ").trim()
    .replaceAll(identity.email, "[see the contact page]")
    .replace(/\+91[\s-]*79802[\s-]*96957/g, "[see the contact page]");
}

function publicLink(href?: string) {
  if (!href || href.startsWith("#")) return undefined;
  if (/^\/(?![\/\\])/.test(href)) return href;
  if (!/^https?:\/\//i.test(href)) return undefined;
  try {
    const url = new URL(href);
    return !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function passageParts(text: string) {
  const parts = [];
  let remaining = text;
  while (remaining.length > MAX_PASSAGE_CHARS) {
    const window = remaining.slice(0, MAX_PASSAGE_CHARS);
    const sentence = Math.max(window.lastIndexOf("\n"), window.lastIndexOf(". ") + 1);
    const boundary = sentence > MAX_PASSAGE_CHARS / 2 ? sentence : window.lastIndexOf(" ");
    const end = boundary > 0 ? boundary : MAX_PASSAGE_CHARS;
    parts.push(remaining.slice(0, end).trim());
    remaining = remaining.slice(end).trim();
  }
  if (remaining) parts.push(remaining);
  return parts;
}

function sectionText(root: HTMLElement, title: string) {
  // Keep collapsed, server-rendered content, such as the other Milo starter panels.
  // Process only the public main landmark. In particular, the Flight payload and
  // arbitrary data props outside rendered text are never evidence.
  root.querySelectorAll([
    "script", "style", "template", "svg", "canvas", "noscript", "nav", "footer", "[data-chat-exclude]",
    ".nb-anchor", ".nb-read-rail", ".nb-pullquote", ".ct-root", ".sr-only",
  ].join(", ")).forEach((element) => {
    if (element.tagName === "H1") return;
    element.remove();
  });

  const passages: Passage[] = [];
  const headings: { level: number; text: string; anchor?: string }[] = [];
  let buffer = "";
  let activeAnchor: string | undefined;
  let textBlocks = 0;

  function flush() {
    const text = buffer.split("\n").map(clean).filter(Boolean).join("\n");
    buffer = "";
    if (!text) return;
    const heading = headings.filter(({ level }) => level > 1).map(({ text }) => text).join(" / ") || title;
    const sectionIds = [...new Set(headings.flatMap(({ anchor }) => anchor ? [anchor] : []))];
    for (const part of passageParts(text)) {
      passages.push({ heading, anchor: activeAnchor, sectionIds: sectionIds.length ? sectionIds : undefined, text: part });
    }
  }

  function visit(node: Node, parentAnchor?: string) {
    if (node.nodeType === NodeType.TEXT_NODE) {
      buffer += node.text;
      return;
    }
    if (!(node instanceof HTMLElement)) return;
    const tag = node.tagName;
    const id = node.getAttribute("id");
    // React useId output varies between builds and is unsuitable as a citation.
    const anchor = id && /^[a-z][\w-]*$/i.test(id) ? id : parentAnchor;
    if (/^H[1-6]$/.test(tag)) {
      flush();
      const level = Number(tag[1]);
      while (headings.length && headings.at(-1)!.level >= level) headings.pop();
      headings.push({ level, text: clean(node.structuredText || node.text), anchor });
      activeAnchor = anchor;
      return;
    }

    const startsSection = Boolean(anchor && anchor !== parentAnchor);
    if (startsSection) {
      flush();
      activeAnchor = anchor;
    }
    if (BOUNDARY_TAGS.has(tag)) buffer += "\n";
    if (tag === "IMG") {
      const alt = clean(node.getAttribute("alt") || "");
      if (alt) buffer += `\nImage: ${alt}\n`;
    }
    if (tag === "P" || tag === "LI" || tag === "PRE" || tag === "FIGCAPTION" || tag === "TR") textBlocks++;
    const publishedText = node.getAttribute("data-chat-text");
    if (publishedText) buffer += publishedText;
    else for (const child of node.childNodes) visit(child, anchor);
    if (tag === "A" && clean(node.text)) {
      const link = publicLink(node.getAttribute("href"));
      if (link) buffer += ` (${link})`;
    }
    if (BOUNDARY_TAGS.has(tag)) buffer += "\n";
    if (startsSection) {
      flush();
      activeAnchor = parentAnchor ?? headings.at(-1)?.anchor;
    }
  }

  for (const child of root.childNodes) visit(child);
  flush();
  if (textBlocks === 0 || passages.length === 0) throw new Error("No substantive rendered content");
  return passages;
}

function buildIndex(): PortfolioIndex {
  const posts = allPosts();
  const postByHref = new Map(posts.map((post) => [postUrl(post.slug), post]));
  const pageByHref = new Map(PAGES.map((page) => [page.href, page]));
  const projectByHref = new Map(projects.map((project) => [`/projects/${project.slug}`, project]));
  const sitemap = parse(readOutput(join(APP_OUTPUT, "sitemap.xml.body")));
  const dates = new Map(sitemap.querySelectorAll("url").map((entry) => {
    const url = new URL(entry.querySelector("loc")!.text);
    if (url.origin !== SITE_URL) throw new Error(`Unexpected sitemap origin: ${url.origin}`);
    return [url.pathname, entry.querySelector("lastmod")?.text.slice(0, 10)] as const;
  }));
  const { routes } = JSON.parse(readOutput(".next/prerender-manifest.json")) as { routes: Record<string, unknown> };
  const renderedPages = Object.keys(routes).filter((href) => !href.startsWith("/_") && existsSync(pageFile(href)));
  // Check the deployable route inventory separately from the sitemap. Pagination
  // and category archives already resolve through their indexed original articles.
  for (const href of renderedPages) {
    if (!dates.has(href) && !isNavigation(href)) throw new Error(`Public HTML missing from sitemap: ${href}`);
  }
  for (const href of [...pageByHref.keys(), ...projectByHref.keys(), ...postByHref.keys()]) {
    if (!dates.has(href)) throw new Error(`Published registry entry missing from sitemap: ${href}`);
  }

  const funApps: ChatSourceEntry[] = [];
  const pages: IndexedPage[] = [];
  for (const [href, updated] of dates) {
    if (isNavigation(href)) continue;
    if (!Object.hasOwn(routes, href)) throw new Error(`Public route is missing prerendered content: ${href}`);
    try {
      const doc = parse(readOutput(pageFile(href)));
      const post = postByHref.get(href);
      const root = doc.querySelector(post ? "#nb-article" : "main");
      if (!root) throw new Error("Missing public content landmark");
      const title = post?.title ?? pageByHref.get(href)?.label ?? projectByHref.get(href)?.name ?? clean(root.querySelector("h1")?.text || "");
      if (!title) throw new Error("Missing page title");
      const description = clean(doc.querySelector('meta[name="description"]')?.getAttribute("content") || "");

      if (post) {
        const renderedHeadingIds = new Set(root.querySelectorAll("h2").map((heading) => heading.id));
        for (const block of post.blocks) {
          if (block.kind === "h2" && !renderedHeadingIds.has(block.id)) {
            throw new Error(`Missing rendered article section: ${block.id}`);
          }
        }
      }
      if (href === "/fun-apps") {
        for (const heading of root.querySelectorAll("h2")) funApps.push({ title: clean(heading.text), href });
      }

      const passages = sectionText(root, title);
      if (post) {
        const indexedHeadingIds = new Set(passages.flatMap((passage) => passage.sectionIds ?? []));
        for (const block of post.blocks) {
          if (block.kind === "h2" && !indexedHeadingIds.has(block.id)) {
            throw new Error(`No indexed text for article section: ${block.id}`);
          }
        }
      }
      // Only the selected tab is prerendered on these two pages.
      if (href === "/agents/migi") {
        for (const shot of MIGI_SHOTS) passages.push({ heading: `Dashboard · ${shot.label}`, text: clean(`${shot.alt}. ${shot.caption}`) });
      }
      if (href === "/agents/pentashell") {
        for (const family of PENTASHELL_FAMILIES) {
          passages.push({
            heading: `Terminal family · ${family.id}`,
            text: clean(`${family.blurb} Flag: ${family.flag}. Keywords: ${family.keywords.join(", ")}. Example: ${family.sample.instruction} → ${family.sample.command}.`),
          });
        }
      }
      if (href === "/learnings") {
        // These descriptions are visible inside visitor-opened credential modals.
        for (const item of experiences) {
          passages.push({
            heading: item.title,
            text: clean([item.description, item.whyItMatters, item.learningOutcome,
              `Skills: ${item.skills.join(", ")}.`,
              `Credentials: ${item.credentials.map((credential) => `${credential.title} (${credential.issuer})`).join(", ")}.`,
            ].join(" ")),
          });
        }
      }
      if (href === "/resume") {
        passages.push({ heading: "Career Mode and résumé download", text: `Career Mode is the playable version of Suman Debnath's résumé (${CAREER_MODE_URL}). The résumé PDF can be downloaded from ${RESUME_PDF}.` });
      }
      pages.push({
        href, title, description,
        updated: post ? postModified(post) : updated,
        digest: createHash("sha256").update(JSON.stringify(passages)).digest("hex"),
        passages,
      });
    } catch (error) {
      throw new Error(`Cannot index ${href}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return {
    version: INDEX_VERSION,
    buildId: readOutput(".next/BUILD_ID").trim(),
    pages,
    catalog: buildCatalog(funApps, postByHref),
    navigation: [...new Set([...dates.keys(), ...renderedPages])].filter(isNavigation),
  };
}

type ChatSourceEntry = Pick<CatalogEntry, "title" | "href">;

const PROJECT_ALIASES: Record<string, string[]> = {
  "/agents/migi": ["MIGI"],
  "/banking/rm-copilot": ["RM Copilot", "Banking RM Copilot"],
  "/games/pixelville-next-dimension": ["Next Dimension", "PixelVille 3D"],
  "/llms/qdex-1.5b": ["Qdex"],
  "/slms/pentacmd": ["PentaCMD"],
};

function buildCatalog(funApps: ChatSourceEntry[], postByHref: Map<string, ReturnType<typeof allPosts>[number]>) {
  const items: CatalogEntry[] = [];
  const names = new Map<string, CatalogEntry>();
  const urls = new Map<string, CatalogEntry>();
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

  function add(entry: ChatSourceEntry, status?: string, aliases: string[] = []) {
    const name = normalize(entry.title);
    const sharedPage = ["/fun-apps", "/projects", "/resume"].includes(entry.href);
    const existing = names.get(name) ?? (sharedPage ? undefined : urls.get(entry.href));
    if (existing) {
      existing.aliases.push(...[entry.title, ...aliases].filter((alias) => alias !== existing.title && !existing.aliases.includes(alias)));
      existing.status ??= status;
      return;
    }
    const item: CatalogEntry = { ...entry, kind: entry.href.startsWith("/games/") ? "game" : "project", status, aliases };
    names.set(name, item);
    if (!sharedPage) urls.set(entry.href, item);
    items.push(item);
  }

  for (const entry of PAGES) {
    if (!["agents", "models", "apps"].includes(entry.group) || entry.href === "/fun-apps") continue;
    add({ title: entry.label, href: entry.href }, undefined, PROJECT_ALIASES[entry.href]);
  }
  for (const project of projects) add({ title: project.name, href: `/projects/${project.slug}` }, project.status);
  for (const project of archiveProjects) {
    add({ title: project.name, href: project.detailUrl ?? "/projects" }, project.status);
    for (const title of project.miniItems ?? []) {
      if (!title.startsWith("+")) add({ title: title.split(" — ")[0], href: "/projects" });
    }
  }
  for (const item of funApps) add(item);
  for (const project of [...flagshipProjects, ...additionalProjects]) {
    add({ title: project.name, href: project.href ?? "/resume" }, project.status);
  }
  add({ title: "Career Mode", href: "/resume" }, undefined, ["Play my career", "game version of the résumé"]);
  for (const [href, post] of postByHref) items.push({ href, title: post.title, kind: "article", aliases: [] });
  return items;
}

if (process.argv.includes("--prepare")) {
  // Next's tracer needs an existing file. The deployed artifact is populated
  // afterwards from this very build, so the index cannot lag the HTML release.
  mkdirSync(dirname(ARTIFACT), { recursive: true });
  if (!existsSync(ARTIFACT)) writeFileSync(ARTIFACT, "{}", { flag: "wx" });
} else {
  const index = buildIndex();
  const tracePath = ".next/server/pages/api/chat.js.nft.json";
  const trace = JSON.parse(readOutput(tracePath)) as { files: string[] };
  if (!trace.files.some((file) => resolve(dirname(tracePath), file) === ARTIFACT)) {
    throw new Error(`The /api/chat deployment trace is missing ${relative(process.cwd(), ARTIFACT)}`);
  }
  const temp = `${ARTIFACT}.${process.pid}.tmp`;
  writeFileSync(temp, JSON.stringify(index));
  renameSync(temp, ARTIFACT);
  const passages = index.pages.reduce((sum, page) => sum + page.passages.length, 0);
  console.log(`Portfolio chat indexed ${index.pages.length} pages, ${passages} passages and ${index.catalog.length} catalog entries (${index.buildId}).`);
}
