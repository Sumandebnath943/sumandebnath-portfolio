// The canonical registry of every public page on the site.
//
// This exists because the same list was previously being maintained in four
// places that could not see each other — Navigation.tsx, CommandPalette.tsx,
// app/sitemap.ts and public/llms.txt — and it had already drifted. /journey was
// in the sitemap and in neither menu. /learnings was described as an
// "engineering notebook" in two of them and is nothing of the sort.
//
// One list, consumed by:
//   • components/layout/SiteFooter.tsx   — the site-wide link map
//   • components/ui/RelatedPages.tsx     — the per-page related rail
//   • app/llms.txt/route.ts              — the generated AI context file
//
// Navigation.tsx and CommandPalette.tsx deliberately still hold their own
// structures: the nav is a *designed* hierarchy with nesting and ordering that
// is a product decision, not a data one, and flattening it into this list would
// lose that. If you add a page, it goes here AND there — see PROJECT_BIBLE §8.

export type PageGroup =
  | "start"
  | "agents"
  | "models"
  | "apps"
  | "writing"
  | "person"
  | "legal";

export interface PageEntry {
  href: string;
  /** Short label, as it appears in the footer and on a related card. */
  label: string;
  /** One line, no trailing period. Read by humans on the card and by models in
   *  llms.txt, so it has to be literally accurate — not marketing copy. */
  blurb: string;
  group: PageGroup;
  /** The page's accent, matching Navigation.tsx. Drives the card's hairline. */
  accent: string;
}

export const GROUP_LABELS: Record<PageGroup, string> = {
  start: "Start here",
  agents: "Agents",
  models: "Models",
  apps: "Apps & Systems",
  writing: "Writing",
  person: "The Person",
  legal: "Legal",
};

export const PAGES: PageEntry[] = [
  // ── Start ────────────────────────────────────────────────────────────────
  {
    href: "/",
    label: "Home",
    blurb: "The cinematic overview — the transition, the systems, the philosophy",
    group: "start",
    accent: "#38BDF8",
  },
  {
    href: "/projects",
    label: "All Projects",
    blurb: "The full archive of AI-native tools, systems and experiments",
    group: "start",
    accent: "#FF3B6B",
  },
  {
    href: "/resume",
    label: "Résumé",
    blurb: "Nine years of experience, every product, education and certifications",
    group: "start",
    accent: "#FBBF24",
  },
  {
    href: "/contact",
    label: "Contact",
    blurb: "Email, phone, socials and current availability",
    group: "start",
    accent: "#34D399",
  },

  // ── Agents ───────────────────────────────────────────────────────────────
  {
    href: "/agents/pact-agent",
    label: "PACT Agent",
    blurb: "Trust-first local CLI coding agent — a permission contract before any action",
    group: "agents",
    accent: "#FF5500",
  },
  {
    href: "/agents/pentashell",
    label: "Pentashell",
    blurb: "Natural-language-to-terminal CLI running on the custom PentaCMD-47M model",
    group: "agents",
    accent: "#2FE2F0",
  },
  {
    href: "/agents/migi",
    label: "MIGI Agent Fleet",
    blurb: "A 46-agent autonomous fleet with 500+ automated eval checks",
    group: "agents",
    accent: "#C6F24E",
  },

  // ── Models ───────────────────────────────────────────────────────────────
  {
    href: "/slms/pentacmd",
    label: "PentaCMD-47M",
    blurb: "A 47M-parameter language model trained from scratch on 299K command pairs",
    group: "models",
    accent: "#38BDF8",
  },
  {
    href: "/llms/qdex-1.5b",
    label: "Qdex-1.5B",
    blurb: "QLoRA fine-tuning pipeline for Qwen2.5-Coder-1.5B, benchmarked with HumanEval",
    group: "models",
    accent: "#2DD4BF",
  },

  // ── Apps & systems ───────────────────────────────────────────────────────
  {
    href: "/banking/rm-copilot",
    label: "Banking Co-pilot",
    blurb: "AI relationship-manager copilot — 12 modules, deterministic scoring, 5 security phases",
    group: "apps",
    accent: "#D9A961",
  },
  {
    href: "/projects/aegis-vault",
    label: "AEGIS VAULT",
    blurb: "Zero-knowledge encrypted notepad — AES-256-GCM with Argon2id envelope encryption",
    group: "apps",
    accent: "#7DD3FC",
  },
  {
    href: "/apps/migi-app",
    label: "MIGI Android App",
    blurb: "Native Android client for the MIGI agent fleet",
    group: "apps",
    accent: "#C6F24E",
  },
  {
    href: "/apps/forget-anything",
    label: "Forget Anything?",
    blurb: "Android app using geofencing and WiFi-departure triggers as reminders",
    group: "apps",
    accent: "#DAA520",
  },
  {
    href: "/games/pixelville",
    label: "PixelVille",
    blurb: "Procedural city builder with a real economy, seasons, crime and democracy",
    group: "apps",
    accent: "#F5B94A",
  },
  {
    href: "/fun-apps",
    label: "Fun Apps",
    blurb: "Experiments and toys, including the Soul Canvas 3D portrait",
    group: "apps",
    accent: "#FF8C00",
  },

  // ── Writing ──────────────────────────────────────────────────────────────
  {
    href: "/notebook",
    label: "Notebook",
    blurb: "The engineering notebook — what broke, the actual fix, and what generalises",
    group: "writing",
    accent: "#7B61FF",
  },
  {
    href: "/learnings",
    label: "Learnings",
    blurb: "The skill map — knowledge domains, competencies and credentials",
    group: "writing",
    accent: "#22D3EE",
  },
  {
    href: "/faq",
    label: "FAQ",
    blurb: "Direct answers about AI-native building and the move from branding to AI",
    group: "writing",
    accent: "#94A3B8",
  },

  // ── The person ───────────────────────────────────────────────────────────
  {
    href: "/profile",
    label: "Profile",
    blurb: "The decade in short — where the work has been, and the daily toolkit",
    group: "person",
    accent: "#F3B44A",
  },
  {
    href: "/about",
    label: "The Story",
    blurb: "Operational experience, academic foundations and the full biography",
    group: "person",
    accent: "#FB7185",
  },
  {
    href: "/journey",
    label: "The Journey",
    blurb: "The interactive life story — the turns, the artifacts, the years",
    group: "person",
    accent: "#8B5CF6",
  },
  {
    href: "/philosophy",
    label: "Philosophy",
    blurb: "Six operating principles guiding every system and decision",
    group: "person",
    accent: "#F472B6",
  },

  // ── Legal ────────────────────────────────────────────────────────────────
  {
    href: "/privacy",
    label: "Privacy",
    blurb: "What is collected, by whom, and how to opt out",
    group: "legal",
    accent: "#64748B",
  },
  {
    href: "/terms",
    label: "Terms",
    blurb: "Terms of use for this site and its published material",
    group: "legal",
    accent: "#64748B",
  },
];

const BY_HREF = new Map(PAGES.map((p) => [p.href, p]));

export function getPage(href: string): PageEntry | undefined {
  return BY_HREF.get(href);
}

export function pagesInGroup(group: PageGroup): PageEntry[] {
  return PAGES.filter((p) => p.group === group);
}

// ── The related graph ──────────────────────────────────────────────────────
//
// Curated, not computed. A "related" rail generated from tag overlap produces
// links that are technically adjacent and editorially meaningless, and a
// crawler reading three of those learns nothing about how the site is shaped.
// Each list below is a real relationship — Pentashell runs *on* PentaCMD, the
// Android app is a client *for* the agent fleet — and is ordered strongest
// first, because the rail renders in order.
//
// Every page must appear in at least one other page's list. That is the whole
// point: before this file, nine of eleven product pages had no in-content link
// to anywhere else on the site, and the nav menus were the only path between
// them.
const RELATED: Record<string, string[]> = {
  "/": ["/projects", "/resume", "/notebook"],
  "/projects": ["/agents/migi", "/slms/pentacmd", "/banking/rm-copilot"],
  "/resume": ["/projects", "/journey", "/contact"],
  "/contact": ["/resume", "/projects", "/faq"],

  "/agents/pact-agent": ["/agents/pentashell", "/agents/migi", "/projects/aegis-vault"],
  "/agents/pentashell": ["/slms/pentacmd", "/agents/pact-agent", "/llms/qdex-1.5b"],
  "/agents/migi": ["/apps/migi-app", "/agents/pact-agent", "/projects"],

  "/slms/pentacmd": ["/agents/pentashell", "/llms/qdex-1.5b", "/notebook"],
  "/llms/qdex-1.5b": ["/slms/pentacmd", "/agents/pentashell", "/projects"],

  "/banking/rm-copilot": ["/projects/aegis-vault", "/agents/migi", "/resume"],
  "/projects/aegis-vault": ["/banking/rm-copilot", "/agents/pact-agent", "/projects"],
  "/apps/migi-app": ["/agents/migi", "/apps/forget-anything", "/games/pixelville"],
  "/apps/forget-anything": ["/apps/migi-app", "/games/pixelville", "/projects"],
  "/games/pixelville": ["/fun-apps", "/apps/forget-anything", "/projects"],
  "/fun-apps": ["/games/pixelville", "/journey", "/philosophy"],

  "/notebook": ["/learnings", "/projects", "/faq"],
  "/learnings": ["/resume", "/notebook", "/projects"],
  "/faq": ["/about", "/resume", "/contact"],

  "/profile": ["/resume", "/journey", "/learnings"],
  "/about": ["/journey", "/resume", "/philosophy"],
  "/journey": ["/about", "/profile", "/philosophy"],
  "/philosophy": ["/about", "/faq", "/notebook"],
};

/**
 * The pages to surface at the foot of `href`.
 *
 * Falls back to same-group siblings so a page added to PAGES without a RELATED
 * entry still renders a sane rail instead of nothing — a silent empty rail is
 * exactly the kind of partial failure this repo keeps getting bitten by.
 */
export function relatedFor(href: string, limit = 3): PageEntry[] {
  const curated = (RELATED[href] ?? [])
    .map((h) => BY_HREF.get(h))
    .filter((p): p is PageEntry => Boolean(p));

  if (curated.length >= limit) return curated.slice(0, limit);

  const self = BY_HREF.get(href);
  const seen = new Set([href, ...curated.map((p) => p.href)]);
  const siblings = self
    ? PAGES.filter((p) => p.group === self.group && !seen.has(p.href))
    : [];

  return [...curated, ...siblings].slice(0, limit);
}
