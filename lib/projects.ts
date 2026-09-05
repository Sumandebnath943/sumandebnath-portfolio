export const SITE_URL = "https://sumandebnath.houseofnamus.com";

// The site's own name and one-line description, beside the URL because they are
// the same kind of fact and are needed in the same places.
//
// They were private consts in app/layout.tsx, which was fine while the root
// layout was the only thing that used them. It is not: the homepage's
// `ProfilePage` node needs the identical pair, and the alternative to this
// export was a second copy of both strings in app/page.tsx — two homes for one
// sentence, drifting the first time either is edited. AEO_PLAYBOOK.md §4.
export const SITE_NAME = "Suman Debnath — Brand Marketing Leader & AI Product Builder";
export const SITE_DESCRIPTION =
  "Senior Brand Marketing Manager (9+ yrs) who builds AI-native products. A rare cross-domain profile — brand strategy plus hands-on AI product engineering.";

export type ProjectStatus = "Live" | "Coming Soon" | "Stealth";

export interface ProjectMeta {
  slug: string;
  number: string;
  name: string;
  positioning: string;
  /**
   * Overrides the `<title>` for this project's dossier page. Optional.
   *
   * The default is `${name} — ${positioning}`, and `positioning` is written to
   * read as a line of visible copy — a full sentence, ending in a full stop.
   * That is right on the page and too long in a search result once the root
   * layout appends " · Suman Debnath" (16 chars), which is what put three
   * dossiers over Bing's limit on 27 Aug 2026.
   *
   * Set this when the sentence overruns; leave it unset otherwise. Do NOT
   * shorten `positioning` to fix a title — it is rendered on the page and in
   * the projects index, and trimming it there to serve a meta tag damages the
   * copy to fix the wrong thing. Same split as `metaTitle` on notebook posts.
   *
   * Budget: 44 characters keeps the finished title at 60.
   */
  metaTitle?: string;
  description: string;
  category: string;
  url: string | null;
  /**
   * A second header CTA beside "Visit the live product". Optional.
   *
   * Use it when the product publishes a specific page worth linking on its own
   * — a published method, a spec — rather than another route to the homepage.
   * A deep link to a technical page corroborates the claim; a second homepage
   * link corroborates nothing. Keep the label short: both pills share one
   * `flex-wrap` row and a long one pushes the second to its own line.
   */
  secondaryLink?: { label: string; href: string };
  status: ProjectStatus;
  applicationCategory: string;
  capabilities: string[];
  /**
   * Overrides the `@id` of this project's `SoftwareApplication` node. Optional.
   *
   * The default anchors the node on this domain, which is right for a project
   * that exists only as a dossier here. When the product runs on its own domain
   * **and publishes its own `SoftwareApplication`**, that domain owns the
   * entity — the same reasoning that anchors the Organization node on
   * `houseofnamus.com` rather than here (AEO_PLAYBOOK §3.6). Set this to the
   * *exact* `@id` the product's own graph publishes and the two graphs merge
   * into one entity instead of competing as two.
   *
   * Copy it from the live page, do not compose it: a near-miss (`/#software`
   * vs `#software`, http vs https, a trailing slash) is two nodes again, and it
   * fails silently — the markup validates either way.
   *
   * Because a merged node carries the union of both sides' statements, anything
   * set here must not *contradict* the live node. `applicationCategory` is the
   * one that bit: IMPRINT was `ProductivityApplication` here and
   * `LifestyleApplication` there.
   */
  entityId?: string;
  /**
   * `@id`s of documents *about* this product, published on its own domain.
   * Optional. Same rule as `entityId` — copy each from the live page's own
   * JSON-LD, never compose one.
   */
  subjectOf?: string[];
  primaryAccent: string;
}

export const projects: ProjectMeta[] = [
  {
    slug: "imprint",
    number: "01",
    name: "IMPRINT",
    // "Behavioral cloning" until 5 Sep 2026, in all three copies of this string
    // (here, lib/archive-projects.ts, components/sections/Projects.tsx). It
    // named something the product does not do — IMPRINT measures a person
    // against their own recorded baseline, it does not clone anyone's
    // behaviour — and it was the first thing a reader met, in the <title>.
    positioning: "Identity preservation, by measuring cognitive drift.",
    // The sentence above is 51 characters, which puts the composed title at 77
    // once the root layout appends " · Suman Debnath". This is the opt-out
    // documented on the field; the old positioning already overran at 69.
    metaTitle: "IMPRINT — The identity preservation engine",
    description:
      "IMPRINT is the identity preservation engine. It records a cognitive baseline — how you actually think and write — then measures cognitive drift: how far your thinking has moved from that baseline as you delegate more work to AI. The Drift Score composites four weighted signals, and the method is published in full.",
    category: "Identity Preservation System",
    url: "https://imprint.houseofnamus.com",
    secondaryLink: {
      label: "Read the Drift Score method",
      href: "https://imprint.houseofnamus.com/methodology",
    },
    status: "Live",
    // Matches the live node at imprint.houseofnamus.com/#software. See
    // `entityId` — the two must not disagree, and this one used to.
    applicationCategory: "LifestyleApplication",
    entityId: "https://imprint.houseofnamus.com/#software",
    subjectOf: ["https://imprint.houseofnamus.com/methodology#article"],
    capabilities: [
      "Baseline Imprint",
      "The Forge",
      "The Mirror",
      "Drift Score",
      "Skill Vault",
      "Calibration Sessions",
      "Human Circles",
      "Identity Credential",
    ],
    primaryAccent: "#FF5A1F",
  },
  {
    slug: "legatus",
    number: "02",
    name: "LEGATUS",
    positioning: "Immutable digital inheritance.",
    description:
      "LEGATUS is a secure inheritance infrastructure for the digital age. It builds an immutable end-of-life vault for digital assets, encrypts everything with AES-256 / RSA-2048, and orchestrates verified nominee access through multi-level permissions and a death-verification workflow.",
    category: "Digital Legacy Vault",
    url: "https://legatus.houseofnamus.com",
    status: "Live",
    applicationCategory: "SecurityApplication",
    capabilities: [
      "End-of-Life Vault",
      "Nominee Access Layers",
      "AES-256 Encryption",
      "RSA-2048 Security",
      "Death Verification Workflow",
      "Multi-Level Permissions",
      "Secure Credential Storage",
    ],
    primaryAccent: "#C5A059",
  },
  {
    slug: "cite",
    number: "03",
    name: "CITE",
    positioning: "Corporate tactical intelligence & entity extraction.",
    description:
      "CITE is a tactical operating system for professional survival in the AI era. It surveils markets, extracts entities, builds knowledge graphs, and arms operators with a unified command center for career pivots, conversation coaching, job security signals, and skill half-life tracking.",
    category: "Tactical Career Intelligence Engine",
    url: "https://cite.houseofnamus.com",
    status: "Live",
    applicationCategory: "BusinessApplication",
    capabilities: [
      "Career Pivot Translator",
      "Conversation Copilot",
      "Job Security Radar",
      "Corporate Threat Meter",
      "Skill Half-Life Timeline",
      "Tactical Roleplay Engine",
      "Unified Command Center",
    ],
    primaryAccent: "#7B61FF",
  },
  {
    slug: "roasmind",
    number: "04",
    name: "ROASmind",
    positioning: "Next-generation autonomous operating system.",
    description:
      "ROASmind is a next-generation AI-native operating system being built in stealth. Over 200,000 lines of orchestrated architecture across autonomous orchestration, predictive analytics, and self-healing workflows.",
    category: "Autonomous AI Operating System",
    url: null,
    status: "Stealth",
    applicationCategory: "BusinessApplication",
    capabilities: [
      "Autonomous Orchestration",
      "Predictive Analytics",
      "Self-Healing Workflows",
    ],
    primaryAccent: "#F5F5F7",
  },
  {
    slug: "geek-collectibles",
    number: "05",
    name: "Geek Collectibles",
    positioning: "High-ticket collector commerce infrastructure.",
    // Default title was 82 chars. This lands at 63. "Japanese" comes straight
    // from the description below and is a far better search term than
    // "high-ticket", which nobody types.
    metaTitle: "Geek Collectibles — Japanese Collector Commerce",
    description:
      "Geek Collectibles is a global collector ecosystem sourcing authentic hobby culture directly from Japan. A high-ticket commerce stack with ISO request systems, franchise worlds, grail tiers, condition grading, multi-currency support, and an admin infrastructure built for serious collectors.",
    category: "Collector Commerce Ecosystem",
    url: null,
    status: "Coming Soon",
    applicationCategory: "BusinessApplication",
    capabilities: [
      "ISO Request System",
      "Franchise Worlds",
      "Grail System",
      "Condition Grading",
      "Admin Infrastructure",
      "Multi-Currency Support",
      "Collector Marketplace",
    ],
    primaryAccent: "#FF003C",
  },
  {
    slug: "ember",
    number: "06",
    name: "EMBER",
    positioning: "Audio journaling & cognitive relief.",
    description:
      "EMBER is a burnout recovery companion that rebuilds you one small win at a time. Audio journaling, AI vent companion, immediate de-burn mode, guided grounding, EMBER score tracking, and life reassessment — built around quiet warmth and cognitive relief.",
    category: "Burnout Recovery System",
    url: "https://v0-meet-ember-ai.vercel.app",
    status: "Live",
    applicationCategory: "HealthApplication",
    capabilities: [
      "EMBER Score",
      "Immediate De-Burn Mode",
      "AI Vent Companion",
      "Recovery Tracking",
      "Guided Grounding",
      "Life Reassessment",
    ],
    primaryAccent: "#FF8C00",
  },
  {
    slug: "d-pe",
    number: "07",
    name: "D-PE.ai",
    positioning: "God-Tier Prompt Engineering workspace.",
    description:
      "D-PE.ai is a premium, developer-focused workspace that transforms raw ideas into structured, robust AI prompts through an intelligent, socratic interview process, enforcing a rigorous 9-pillar architectural framework.",
    category: "Prompt Engineering Workspace",
    url: "https://d-pe.houseofnamus.com/",
    status: "Live",
    applicationCategory: "DeveloperApplication",
    capabilities: [
      "Sarcastic Terminal Gateway",
      "Socratic Interview Engine",
      "Reverse Engineer Mode",
      "RAG Document Grounding",
      "Advanced Tournament Mode",
      "Session Memory",
    ],
    primaryAccent: "#3fb950",
  },
];

export function getProject(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}

export function softwareApplicationJsonLd(p: ProjectMeta) {
  const url = p.url ?? `${SITE_URL}/projects/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    // Anchored here by default; on the product's own domain when the product
    // publishes its own node there. See `entityId` on ProjectMeta.
    "@id": p.entityId ?? `${SITE_URL}/projects/${p.slug}#software`,
    ...(p.subjectOf?.length
      ? { subjectOf: p.subjectOf.map((id) => ({ "@id": id })) }
      : {}),
    name: p.name,
    alternateName: p.positioning,
    description: p.description,
    applicationCategory: p.applicationCategory,
    applicationSubCategory: p.category,
    operatingSystem: "Web",
    url,
    image: `${SITE_URL}/screenshots/${p.slug === "cite" ? "cite" : p.slug === "geek-collectibles" ? "geekcollectibles" : p.slug}.png`,
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    featureList: p.capabilities,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability:
        p.status === "Live"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
    },
  };
}
