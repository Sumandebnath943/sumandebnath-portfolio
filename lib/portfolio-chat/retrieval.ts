import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { INDEX_PATH, INDEX_VERSION } from "./types";
import type { CatalogEntry, CatalogKind, ChatMessage, ChatSource, IndexedPage, Passage, PortfolioIndex } from "./types";

const MAX_EVIDENCE_CHARS = 12_000;
const MAX_PASSAGES = 10;
const STOP_WORDS = new Set((
  "a about all am an and any are as at be been but by can could did do does for from get had has have he " +
  "her here him his how i in into is it its me my of on one or our please she should so some suman debnath " +
  "tell than that the their them then there these they this those to us use was we were what when where " +
  "which who why will with would you your"
).split(" "));

type PreparedPassage = {
  page: IndexedPage;
  passage: Passage;
  body: Set<string>;
  heading: Set<string>;
  pageWords: Set<string>;
};

export type Evidence = ChatSource & { id: string; text: string };

function normalized(text: string) {
  return text.toLowerCase().normalize("NFKD").replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function terms(text: string) {
  return new Set(normalized(text).split(" ").filter((term) => term && !STOP_WORDS.has(term)));
}

function matches(text: string, phrase: string) {
  return phrase && ` ${text} `.includes(` ${phrase} `);
}

export function catalogKind(question: string): CatalogKind | undefined {
  const query = normalized(question).split(/\b(?:and|then) (?:explain|tell|compare|describe|which|what|how)\b/)[0];
  const inventory = /\b(list|show|name|enumerate)\b|\b(all|every|complete|entire|full)\b|\bhow many\b/.test(query) ||
    /^(?:what|which) (?:games|projects|products|articles|builds) (?:has|did) suman\b/.test(query);
  if (!inventory || /\b(how (does|do|did|to)|why|compare|difference)\b/.test(query)) return;
  if (/\b(notebook|articles|blog posts|write ups|writing|every article)\b/.test(query)) return "articles";
  if (/\b(games|every game)\b/.test(query)) return "games";
  if (/\b(projects|portfolio|products|builds|every (?:project|product|build)|everything .{0,40}(built|shipped))\b/.test(query)) return "projects";
}

export function createPortfolioSearch(index: PortfolioIndex) {
  const pages = new Map(index.pages.map((page) => [page.href, page]));
  const documentFrequency = new Map<string, number>();
  const prepared: PreparedPassage[] = [];
  for (const page of index.pages) {
    const pageWords = terms(`${page.title} ${page.parentHref ?? page.href}`);
    for (const passage of page.passages) {
      const heading = terms(passage.heading);
      const body = terms(passage.text);
      for (const word of new Set([...body, ...heading, ...pageWords])) {
        documentFrequency.set(word, (documentFrequency.get(word) || 0) + 1);
      }
      prepared.push({ page, passage, body, heading, pageWords });
    }
  }
  const names = index.catalog
    .flatMap((entry) => [entry.title, ...entry.aliases].map((name) => ({ entry, name: normalized(name) })))
    .sort((a, b) => b.name.length - a.name.length);

  function namedEntries(text: string) {
    let remaining = ` ${normalized(text)} `;
    const entries = new Set<CatalogEntry>();
    for (const { entry, name } of names) {
      if (!matches(remaining.trim(), name)) continue;
      entries.add(entry);
      // Match the full product name before its shorter sibling. A separate use
      // of "PixelVille" can still refer to the original in the same question.
      remaining = remaining.replaceAll(` ${name} `, " ");
    }
    return [...entries];
  }

  function inventory(kind: CatalogKind): ChatSource[] {
    return index.catalog.filter((entry) => {
      if (kind === "articles") return entry.kind === "article";
      if (kind === "games") return entry.kind === "game";
      return entry.kind !== "article";
    }).map(({ href, title }) => ({ href, title }));
  }

  function retrieve(question: string, history: ChatMessage[], pathname?: string): Evidence[] {
    const queryWords = terms(question);
    const currentPage = pathname && pages.has(pathname) ? pathname : undefined;
    const explicit = namedEntries(question);
    const conversational = /\b(it|its|they|their|this|that|those|them|one|newer|older|earlier|former|latter|original|more)\b/i.test(question);
    const recent = explicit.length || !conversational ? [] : namedEntries(history.map((turn) => turn.content).join(" "));
    const entities = explicit.length ? explicit : recent;
    const matchedPaths = new Set(entities.map((entry) => entry.href));
    const identityQuestion = queryWords.size === 0 && /\b(suman|debnath)\b/i.test(question);
    const entityWords = new Set(entities.flatMap((entry) => [...terms(entry.title)]));
    const detailWords = new Set([...queryWords].filter((word) => !entityWords.has(word)));

    function score(row: PreparedPassage) {
      let value = 0;
      for (const word of queryWords) {
        const frequency = documentFrequency.get(word);
        if (!frequency) continue;
        const weight = Math.log1p(prepared.length / frequency);
        const entityTerm = entityWords.has(word);
        if (row.body.has(word)) value += weight * (entityTerm ? 0.35 : 1);
        if (row.heading.has(word)) value += weight * (entityTerm ? 0.55 : 1.7);
        if (row.pageWords.has(word)) value += weight * (entityTerm ? 0.75 : 1.1);
      }
      if (row.page.href === currentPage && (value > 0 || conversational)) value += conversational && !entities.length ? 4 : 1.5;
      if (matchedPaths.has(row.page.href)) value += explicit.length ? 11 : 7;
      if (row.page.parentHref && matchedPaths.has(row.page.parentHref) && value > 0) value += 4;
      if (identityQuestion && ["/about", "/profile", "/resume"].includes(row.page.href)) value += 5;
      if (detailWords.size === 0 && (row.passage.anchor === undefined || row.passage.heading === row.page.title)) value += 0.4;
      return value;
    }

    const ranked = prepared.map((row) => ({ row, score: score(row) }))
      .filter((item) => item.score >= 1.7).sort((a, b) => b.score - a.score);
    const selected: Evidence[] = [];
    const used = new Set<PreparedPassage>();
    const perPage = new Map<string, number>();
    let characters = 0;

    function addEvidence(href: string, title: string, text: string) {
      if (selected.length >= MAX_PASSAGES || characters + text.length + title.length + href.length > MAX_EVIDENCE_CHARS) return;
      selected.push({ id: `S${selected.length + 1}`, href, title, text });
      characters += text.length + title.length + href.length;
    }

    function add(row: PreparedPassage) {
      const { page, passage } = row;
      const count = perPage.get(page.href) ?? 0;
      if (used.has(row) || count >= (matchedPaths.has(page.href) ? 4 : 2)) return;
      used.add(row);
      perPage.set(page.href, count + 1);
      const href = page.citationHref || (passage.anchor && !page.href.includes("#") ? `${page.href}#${passage.anchor}` : page.href);
      const heading = passage.heading.split(" / ").at(-1);
      const title = heading === page.title ? page.title : `${page.title} · ${heading}`;
      const context = page.updated ? "Page date: " + page.updated + "\n"
        : page.sourceKind === "file" ? "Published file. Use current portfolio pages for changed facts.\n" : "";
      addEvidence(href, title, context + passage.text);
    }

    for (const entry of entities.slice(0, 4)) {
      const page = pages.get(entry.href);
      if (page && entry.status) addEvidence(entry.href, entry.title, `Authoritative catalog status for ${entry.title}: ${entry.status}.`);
      const best = ranked.find((item) => item.row.page.href === entry.href);
      if (best) add(best.row);
    }
    for (const { row } of ranked) {
      if (selected.length >= MAX_PASSAGES) break;
      add(row);
    }
    return selected;
  }

  return { inventory, retrieve };
}

let cached: ReturnType<typeof createPortfolioSearch> | undefined;

export function loadPortfolioSearch() {
  if (cached) return cached;
  const index = JSON.parse(readFileSync(resolve(INDEX_PATH), "utf8")) as PortfolioIndex;
  if (index.version !== INDEX_VERSION || !index.buildId || !index.pages?.length || !index.catalog?.length) {
    throw new Error("Portfolio knowledge index is missing or incomplete. Run npm run build.");
  }
  const search = createPortfolioSearch(index);
  if (process.env.NODE_ENV === "production") cached = search;
  return search;
}

export function resolveCitations(sourceIds: unknown, evidence: Evidence[]): ChatSource[] | undefined {
  if (!Array.isArray(sourceIds) || sourceIds.length > MAX_PASSAGES) return;
  const byId = new Map(evidence.map((item) => [item.id, item]));
  const citations = new Map<string, ChatSource>();
  for (const id of sourceIds) {
    const item = typeof id === "string" && byId.get(id);
    if (!item) return;
    const { href, title } = item;
    if (!citations.has(href)) citations.set(href, { href, title });
  }
  return [...citations.values()];
}
