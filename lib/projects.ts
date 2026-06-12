export const SITE_URL = "https://sumandebnath.houseofnamus.com";

export type ProjectStatus = "Live" | "Coming Soon" | "Stealth";

export interface ProjectMeta {
  slug: string;
  number: string;
  name: string;
  positioning: string;
  description: string;
  category: string;
  url: string | null;
  status: ProjectStatus;
  applicationCategory: string;
  capabilities: string[];
  primaryAccent: string;
}

export const projects: ProjectMeta[] = [
  {
    slug: "imprint",
    number: "01",
    name: "IMPRINT",
    positioning: "Behavioral cloning & identity preservation.",
    description:
      "IMPRINT is the identity preservation engine defending the human mind against AI dependency. It maps a baseline of human cognition, stress-tests it inside AI-mediated scenarios, and quantifies how much of an individual's judgment, taste, and instinct is still authentically theirs.",
    category: "Identity Preservation System",
    url: "https://imprint.houseofnamus.com",
    status: "Live",
    applicationCategory: "ProductivityApplication",
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
    url: "https://ember.houseofnamus.com",
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
    "@id": `${SITE_URL}/projects/${p.slug}#software`,
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
