export const INDEX_PATH = "build/portfolio-chat/index.json";
export const INDEX_VERSION = 2;
export const MAX_HISTORY_MESSAGES = 10;
export const MAX_USER_CHARS = 500;
export const MAX_ASSISTANT_CHARS = 2_000;
export const VOICE_RECORDING_MS = 24_000;
export const VOICE_INPUT_RATE = 16_000;
export const MAX_VOICE_BYTES = VOICE_RECORDING_MS * VOICE_INPUT_RATE * 2 / 1_000 + 44;

export type ChatSource = { href: string; title: string };

export type ChatMessage = { role: "assistant" | "user"; content: string };

export type CatalogKind = "projects" | "games" | "articles";

export type CatalogEntry = ChatSource & {
  kind: "project" | "game" | "article";
  aliases: string[];
  status?: string;
};

export type Passage = {
  anchor?: string;
  sectionIds?: string[];
  heading: string;
  text: string;
};

export type IndexedPage = ChatSource & {
  parentHref?: string;
  citationHref?: string;
  sourceKind?: "file" | "external" | "transcript";
  description: string;
  updated?: string;
  digest: string;
  passages: Passage[];
};

export type SourceCoverage = {
  href: string;
  kind: "file" | "external" | "media";
  status: "indexed" | "needs-text" | "unavailable";
  htmlStatus?: "indexed" | "needs-text" | "unavailable";
  hasReviewedNote?: boolean;
  detail?: string;
  retiredContact?: boolean;
};

export type PortfolioIndex = {
  version: typeof INDEX_VERSION;
  buildId: string;
  pages: IndexedPage[];
  catalog: CatalogEntry[];
  navigation: string[];
  coverage: SourceCoverage[];
};
