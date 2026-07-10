// Project Archive data — the extended systems list shown on /projects.
// This is intentionally separate from lib/projects.ts (which holds flagship
// metadata used by dossier components + /projects/[slug] pages) so that the
// archive list can carry its own positioning, status, stack, and atmosphere
// without polluting the flagship data shape.

export type ArchiveStatus =
  | "Live"
  | "In Development"
  | "Concept"
  | "Active"
  | "Stealth";

export type ArchiveKind = "flagship" | "secondary" | "lab";

export interface ArchiveProject {
  slug: string;
  name: string;
  positioning: string;
  description: string;
  type: string;
  status: ArchiveStatus;
  stack: string[];
  /** Tailwind-safe hex used to tint borders / glow. */
  accent: string;
  /** A second accent for gradient personality. */
  accentB?: string;
  /** Primary external link (e.g. live subdomain). */
  liveUrl?: string;
  /** Secondary in-portfolio detail page (flagship cards). */
  detailUrl?: string;
  /** Path under /public to a poster cover image, if one exists. */
  poster?: string;
  /** Path under /public to a project logo / mark. */
  logo?: string;
  /** Optional inline chips (used for Personal AI Solutions mini-tools list). */
  miniItems?: string[];
  /** Card classification — drives layout treatment. */
  kind: ArchiveKind;
  /** Annotation rendered under the status pill (e.g. flagship archive note). */
  flagshipNote?: string;
}

export const archiveProjects: ArchiveProject[] = [
  {
    slug: "d-pe",
    name: "D-PE.ai",
    positioning: "God-Tier Prompt Engineering workspace.",
    description:
      "A premium, developer-focused workspace that transforms raw ideas into structured, robust AI prompts through an intelligent, socratic interview process.",
    type: "Prompt Engineering Workspace",
    status: "Live",
    stack: ["Next.js", "OpenAI", "Groq"],
    accent: "#3fb950",
    accentB: "#238636",
    liveUrl: "https://d-pe.houseofnamus.com/",
    detailUrl: "/projects/d-pe",
    logo: "/tools/dpe_logo.png",
    poster: "/screenshots/d-pe.png",
    kind: "flagship",
    flagshipNote: "Featured in flagship systems.",
  },
  {
    slug: "roasmind",
    name: "ROASmind",
    positioning: "Next-generation autonomous operating system.",
    description:
      "A next-generation AI-native operating system being built in stealth. 200,000+ lines of orchestrated architecture.",
    type: "Autonomous AI Operating System",
    status: "Stealth",
    stack: ["Next.js", "PostgreSQL", "Temporal", "Multi-model AI"],
    accent: "#F4A300",
    accentB: "#3A2A05",
    detailUrl: "/projects/roasmind",
    logo: "/tools/roasmind.png",
    kind: "flagship",
    flagshipNote: "Featured in flagship systems.",
  },
  {
    slug: "imprint",
    name: "IMPRINT",
    positioning: "Behavioral cloning & identity preservation.",
    description:
      "The identity preservation engine defending the human mind against AI dependency.",
    type: "Identity Preservation System",
    status: "Live",
    stack: ["Next.js", "Claude", "Context Engineering", "Behavioral Models"],
    accent: "#FF5A1F",
    accentB: "#7A1C00",
    liveUrl: "https://imprint.houseofnamus.com",
    detailUrl: "/projects/imprint",
    logo: "/tools/imprint.png",
    poster: "/product-images/imprint.webp",
    kind: "flagship",
    flagshipNote: "Featured in flagship systems.",
  },
  {
    slug: "legatus",
    name: "LEGATUS",
    positioning: "Immutable digital inheritance.",
    description:
      "A secure inheritance infrastructure for the digital age, with AES-256 / RSA-2048 encryption and multi-level nominee permissions.",
    type: "Digital Legacy Vault",
    status: "Live",
    stack: ["Next.js", "AES-256", "RSA-2048", "Postmark"],
    accent: "#C5A059",
    accentB: "#3A2A12",
    liveUrl: "https://legatus.houseofnamus.com",
    detailUrl: "/projects/legatus",
    logo: "/tools/legatus.png",
    poster: "/product-images/legatus.webp",
    kind: "flagship",
    flagshipNote: "Featured in flagship systems.",
  },
  {
    slug: "cite",
    name: "CITE",
    positioning: "Decoding professional risk in the age of AI.",
    description:
      "A cognitive and interpersonal translation engine analyzing career vulnerability, AI disruption exposure, and future professional resilience.",
    type: "Tactical Career Intelligence Engine",
    status: "Live",
    stack: ["Python", "Neo4j", "GPT-4o", "Knowledge Graphs"],
    accent: "#7B61FF",
    accentB: "#1A1240",
    liveUrl: "https://cite.houseofnamus.com",
    detailUrl: "/projects/cite",
    logo: "/tools/cite_v2.png",
    poster: "/product-images/cite.webp",
    kind: "flagship",
    flagshipNote: "Featured in flagship systems.",
  },
  {
    slug: "aegis-vault",
    name: "AEGIS VAULT",
    positioning: "A password manager's security model, applied to note-taking.",
    description:
      "A zero-knowledge notes app — every note is encrypted in the browser with Argon2id + AES-256-GCM before it ever leaves your device. The server stores nothing but ciphertext; a full database breach would reveal nothing without your master password.",
    type: "Zero-Knowledge Encrypted Notes",
    status: "Live",
    stack: ["Next.js 16", "Supabase", "Web Crypto", "PostgreSQL / RLS"],
    accent: "#8FE04E",
    accentB: "#22C55E",
    liveUrl: "https://aegisnote.houseofnamus.com/",
    detailUrl: "/projects/aegis-vault",
    poster: "/aegis-vault/cover.png",
    kind: "secondary",
  },
  {
    slug: "slide-doctor",
    name: "Slide Doctor",
    positioning: "Presentation intelligence meets operational storytelling.",
    description:
      "A cinematic presentation auditing system built around real-world storytelling, executive communication, and AI-assisted slide evaluation frameworks.",
    type: "Presentation Intelligence System",
    status: "Live",
    stack: [
      "Presentation Systems",
      "AI Analysis",
      "Visual Hierarchy",
      "Communication Architecture",
    ],
    accent: "#E8E8ED",
    accentB: "#00B7C7",
    liveUrl: "https://slidedoctor.houseofnamus.com",
    logo: "/tools/slidedoctor.png",
    poster: "/product-images/slide doctor.webp",
    kind: "secondary",
  },
  {
    slug: "crawl-daddy",
    name: "Crawl Daddy",
    positioning: "AI-native technical SEO intelligence.",
    description:
      "A website crawling and SEO intelligence system capable of scanning large website ecosystems, detecting structural issues, analyzing PageSpeed data, and generating AI-assisted optimization insights.",
    type: "SEO Intelligence System",
    status: "Live",
    stack: ["SEO Systems", "PageSpeed API", "AI Analysis", "Web Crawling"],
    accent: "#3CCB7F",
    accentB: "#1F2A24",
    liveUrl: "https://crawldaddy.houseofnamus.com",
    poster: "/product-images/crawl daddy.webp",
    kind: "secondary",
  },
  {
    slug: "ember",
    name: "EMBER",
    positioning: "Audio journaling & cognitive relief.",
    description:
      "A burnout recovery companion that rebuilds you one small win at a time. Audio journaling, immediate de-burn mode, guided grounding.",
    type: "Burnout Recovery System",
    status: "Live",
    stack: ["React Native", "Whisper", "Node.js"],
    accent: "#E86A33",
    accentB: "#2A1409",
    liveUrl: "https://ember.houseofnamus.com",
    detailUrl: "/projects/ember",
    logo: "/tools/ember.png",
    poster: "/product-images/ember.webp",
    kind: "flagship",
    flagshipNote: "Featured in flagship systems.",
  },
  {
    slug: "brief-killer",
    name: "Brief Killer",
    positioning: "Turning chaotic thinking into structured execution.",
    description:
      "An AI-native briefing engine designed to transform scattered thoughts, raw conversations, and unstructured ideas into actionable project frameworks and execution-ready briefs.",
    type: "AI Workflow System",
    status: "Live",
    stack: [
      "Claude",
      "ChatGPT",
      "Prompt Systems",
      "Context Engineering",
      "Structured Workflows",
    ],
    accent: "#E0732B",
    accentB: "#A04A18",
    liveUrl: "https://briefkiller.houseofnamus.com",
    logo: "/tools/briefkiller.png",
    kind: "secondary",
  },
  {
    slug: "brief-killer-2",
    name: "Brief Killer 2.0",
    positioning: "The evolution of structured AI-assisted execution.",
    description:
      "A next-generation Brief Killer built around deeper contextual reasoning, multi-layered extraction, and scalable execution planning systems.",
    type: "AI Operating Workflow",
    status: "In Development",
    stack: [
      "Claude Code",
      "Context Engineering",
      "Reasoning Systems",
      "Workflow Architecture",
    ],
    accent: "#B06A2C",
    accentB: "#4A4540",
    liveUrl: "https://briefkiller2.houseofnamus.com",
    logo: "/tools/briefkiller.png",
    kind: "secondary",
  },
  {
    slug: "repurpose-ai",
    name: "Repurpose AI",
    positioning: "Maximizing content ROI through intelligent transformation.",
    description:
      "An AI-native content transformation engine designed to convert single-source assets into platform-optimized multi-format content ecosystems.",
    type: "AI Content System",
    status: "Live",
    stack: ["LLMs", "Content Systems", "Automation", "Social Workflows"],
    accent: "#00E5FF",
    accentB: "#5A3CFF",
    liveUrl: "https://repurposeai.houseofnamus.com",
    kind: "secondary",
  },
  {
    slug: "geek-collectibles",
    name: "Geek Collectibles",
    positioning: "High-ticket collector commerce infrastructure.",
    description:
      "A global collector ecosystem sourcing authentic hobby culture directly from Japan. Multi-currency, condition grading, grail tiers.",
    type: "Collector Commerce Ecosystem",
    status: "Live",
    stack: ["Shopify", "Liquid", "Next.js"],
    accent: "#FF003C",
    accentB: "#330014",
    detailUrl: "/projects/geek-collectibles",
    logo: "/tools/geekcollectibles_v2.png",
    kind: "flagship",
    flagshipNote: "Featured in flagship systems.",
  },
  {
    slug: "personal-ai-solutions",
    name: "Personal AI Solutions",
    positioning: "Rapid AI-native experimentation across workflows and systems.",
    description:
      "A continuously evolving collection of internal AI-native tools, micro-systems, workflow automations, and rapid operational experiments. Roughly 15–20 small builds, none of them precious, all of them shipped.",
    type: "Internal Systems Lab",
    status: "Active",
    stack: ["Multi-model AI", "Automation", "Rapid Prototyping", "AI Workflows"],
    accent: "#C5A880",
    accentB: "#3A302A",
    kind: "secondary",
    miniItems: [
      "Office Time Tracker",
      "Forget Me Not — location-aware trigger alerts (in development)",
      "Online Notepad",
      "Stopwatch",
      "Interactive Music Pad",
      "+ 15–20 micro-tools and time-killers",
    ],
  },
];

export function getArchiveBySlug(slug: string) {
  return archiveProjects.find((p) => p.slug === slug);
}
