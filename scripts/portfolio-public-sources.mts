import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { parse } from "node-html-parser";
import type { HTMLElement } from "node-html-parser";
import { archiveProjects } from "../lib/archive-projects";
import { experiences } from "../lib/learnings-data";
import { hasControlDirective, hasRetiredContact, redactContact } from "../lib/portfolio-chat/guardrails";
import type { IndexedPage, Passage, SourceCoverage } from "../lib/portfolio-chat/types";
import { RESUME_PDF } from "../lib/resume";
import { reviewedText } from "./portfolio-reviewed-text.mjs";

// Explicit public entry points. Do not follow discovered URLs, redirects, or
// authenticated product links. Local portfolio routes are discovered separately.
const SHOWCASES = [
  ["/projects/imprint", "IMPRINT", "https://imprint.houseofnamus.com/methodology"],
  ["/projects/imprint", "IMPRINT", "https://imprint.houseofnamus.com/research"],
  ["/projects/imprint", "IMPRINT", "https://imprint.houseofnamus.com/glossary"],
  ["/projects/imprint", "IMPRINT", "https://imprint.houseofnamus.com/faq"],
  ["/agents/milo", "Milo", "https://milo.houseofnamus.com/about.html"],
  ["/resume", "Career Mode", "https://hire.sumandebnath.houseofnamus.com/"],
  ["/ar/video-resume", "AR Video Resume", "https://sumandebnath943.github.io/poster-ar/"],
  ["/crawlers/that-one-crawler", "That One Crawler", "https://thatonecrawler.houseofnamus.com/"],
  ["/games/pixelville", "PixelVille", "https://pixelville.houseofnamus.com/"],
  ["/games/pixelville-next-dimension", "PixelVille: Next Dimension", "https://pixelvillenextdimension.houseofnamus.com/"],
  ["/games/nuno", "NUNO", "https://nuno.houseofnamus.com/"],
  ["/banking/rm-copilot", "Banking Co-pilot", "https://bankingcopilot.houseofnamus.com/"],
  ["/fun-apps", "Soul Canvas", "https://soulcanvas.houseofnamus.com/"],
] as const;

function externalSources() {
  return new Map([
    ...archiveProjects.flatMap((project) => project.liveUrl
      ? [[project.detailUrl ?? "/projects", project.name, new URL(project.liveUrl).href] as const]
      : []),
    ...SHOWCASES,
  ].map(([parentHref, title, href]) => [href, { parentHref, title, href }]));
}

function publicFiles(dir = "public"): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? publicFiles(path) : [path.replaceAll("\\", "/")];
  }).sort();
}

function pdfTarget(path: string) {
  if (path === "public" + RESUME_PDF) return { title: "Suman Debnath résumé PDF", parentHref: "/resume" };
  const portfolioPath = path.slice("public".length);
  for (const item of experiences) {
    const credential = item.credentials.find((candidate) => candidate.pdf === portfolioPath);
    if (credential) return { title: item.title + " · " + credential.title, parentHref: "/learnings" };
  }
  return { title: path.split("/").at(-1)!.replace(/\.pdf$/i, ""), parentHref: "/learnings" };
}

const FONT_PATH = resolve("node_modules/pdfjs-dist/standard_fonts").replaceAll("\\", "/") + "/";

async function readPdf(path: string) {
  const task = getDocument({
    data: new Uint8Array(readFileSync(path)),
    standardFontDataUrl: FONT_PATH, enableXfa: false,
  });
  try {
    const pdf = await task.promise;
    const pages: string[] = [];
    let retiredContact = false;
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const text = await page.getTextContent();
      const links = await page.getAnnotations();
      const value = text.items.flatMap((item) => "str" in item ? [item.str + (item.hasEOL ? "\n" : " ")] : []).join("");
      retiredContact ||= hasRetiredContact(value) || links.some((link) => hasRetiredContact(String(link.url ?? link.unsafeUrl ?? "")));
      pages.push(value);
    }
    return { pages, retiredContact };
  } finally {
    await task.destroy();
  }
}

async function readApprovedHtml(href: string) {
  const res = await fetch(href, { redirect: "error", signal: AbortSignal.timeout(8_000) });
  if (!res.ok || !res.headers.get("content-type")?.includes("text/html") || !res.body) {
    throw new Error("Expected public HTML (" + res.status + ")");
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let html = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return html + decoder.decode();
      size += value.byteLength;
      if (size > 2_000_000) throw new Error("Public HTML exceeds source limit");
      html += decoder.decode(value, { stream: true });
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
}

type Extraction = {
  sectionText: (root: HTMLElement, title: string, external?: boolean) => Passage[];
  passageParts: (text: string) => string[];
};

export async function additionalSourcePages({ sectionText, passageParts }: Extraction) {
  const pages: IndexedPage[] = [];
  const coverage: SourceCoverage[] = [];

  function add(href: string, title: string, parentHref: string, sourceKind: NonNullable<IndexedPage["sourceKind"]>, passages: Passage[], citationHref?: string) {
    pages.push({
      href, title: redactContact(title), parentHref, citationHref, sourceKind, passages, description: "",
      digest: createHash("sha256").update(JSON.stringify(passages)).digest("hex"),
    });
  }

  const textPassages = (heading: string, text: string, anchor?: string) => {
    return passageParts(redactContact(text).trim()).map((part) => ({ heading, text: part, anchor }));
  };

  for (const path of publicFiles()) {
    const href = "/" + path.slice("public/".length).split("/").map(encodeURIComponent).join("/");
    if (/\.pdf$/i.test(path)) {
      const { title, parentHref } = pdfTarget(path);
      const { pages: pdfPages, retiredContact } = await readPdf(path);
      if (retiredContact) throw new Error("Retired contact details in public PDF: " + href);
      const supplemental = reviewedText.files[path];
      if (supplemental && supplemental.sha256 !== createHash("sha256").update(readFileSync(path)).digest("hex")) {
        throw new Error("Published PDF changed. Review its searchable transcript: " + href);
      }
      const passages = pdfPages.flatMap((text, i) => textPassages("Page " + (i + 1), supplemental?.pages[i] || text, "page=" + (i + 1)));
      const needsText = pdfPages.some((text, i) => !supplemental?.pages[i] && text.split(/\s+/).filter(Boolean).length < 20);
      coverage.push({ href, kind: "file", status: needsText ? "needs-text" : "indexed", detail: needsText ? "Image-only certificate. See its published credential description." : undefined });
      if (passages.length) add(href, title, parentHref, "file", passages);
    } else if (/\.(?:md|txt|vtt|srt|csv|html)$/i.test(path) && !/^public\/[a-f0-9]+\.txt$/i.test(path)) {
      const source = readFileSync(path, "utf8");
      if (hasRetiredContact(source)) throw new Error("Retired contact details in public file: " + href);
      const title = path === "public/llms-full.txt" ? "Portfolio text reference" : path.slice("public/".length);
      const isHtml = /\.html$/i.test(path);
      const doc = isHtml ? parse(source) : undefined;
      const root = doc?.querySelector("main, article, [role=main], body");
      const passages = root ? sectionText(root, title) : isHtml ? [] : textPassages(title, source);
      if (passages.length) add(href, title, "/projects", "file", passages);
      coverage.push({ href, kind: "file", status: passages.length ? "indexed" : "needs-text" });
    }
  }

  for (const record of reviewedText.media) {
    const passages = record.sections.flatMap(({ heading, text }) => textPassages(heading, text));
    if (passages.length) add(record.href, record.title, record.parentHref, "transcript", passages);
    coverage.push({ href: record.href, kind: "media", status: passages.length ? "indexed" : "needs-text", detail: record.detail });
  }

  const approved = [...externalSources().values()];
  for (let cursor = 0; cursor < approved.length; cursor += 5) {
    const batch = approved.slice(cursor, cursor + 5);
    const results = await Promise.all(batch.map(async ({ href, parentHref, title }) => {
      try {
        const html = await readApprovedHtml(href);
        const page = parse(html);
        const root = page.querySelector("main, article, [role=main]") ?? page.querySelector("body");
        const retiredContact = hasRetiredContact(html);
        if (!root) return { href, kind: "external", status: "needs-text", retiredContact } as const;
        const heading = root.querySelector("h1")?.text.trim() || title;
        // Scrape only document text. Client-only games and login shells remain
        // documented through their public portfolio write-up.
        let passages: Passage[];
        try {
          passages = sectionText(root, heading, true).filter((passage) => !hasControlDirective(passage.text));
        } catch {
          passages = [];
        }
        if (passages.reduce((sum, part) => sum + part.text.length, 0) < 200) {
          return { href, kind: "external", status: "needs-text", detail: "No substantial public HTML text. See the portfolio showcase.", retiredContact } as const;
        }
        // Keep the document's substance available while an external owner
        // replaces retired contact details. Cite the portfolio entry meanwhile.
        add(href, title + " · " + heading, parentHref, "external", passages, retiredContact ? parentHref : undefined);
        return { href, kind: "external", status: "indexed", retiredContact } as const;
      } catch {
        return { href, kind: "external", status: "unavailable", detail: "Public fetch failed. See the portfolio showcase." } as const;
      }
    }));
    coverage.push(...results);
  }
  return { pages: pages.sort((a, b) => a.href.localeCompare(b.href)), coverage };
}
