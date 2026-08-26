/**
 * The résumé, as data.
 *
 * Transcribed from `public/Suman_Debnath_Resume.pdf` (the PDF the robot mascot
 * hands out). Four separate surfaces used to restate these facts in their own
 * words and drifted apart — the chat assistant still called him a "Senior
 * Product Marketing Manager" and had never heard of MIGI, PentaCMD or Qdex.
 * Everything now reads from here:
 *
 *   /resume ................ the HTML copy of the PDF
 *   lib/systemPrompt.ts .... what the chat assistant + robot know
 *   app/resume/page.tsx .... Person / ProfilePage JSON-LD
 *
 * When the PDF changes, change this file and bump RESUME_UPDATED. Nothing else
 * needs touching.
 *
 * ── One deliberate divergence from the PDF, as of 22 Aug 2026 ──────────────
 * The MIGI fleet size here reads **46**, which the PDF does not say. The PDF
 * disagrees with *itself*: its project heading says "Fleet of 40+ AI Agents"
 * while the line under it says "44-agent autonomous AI fleet". Neither is
 * current — the fleet repo has 46 workflow files today (4 of them plumbing:
 * hello, register-commands, telegram-webhook, evals). The whole site was
 * squared to 46; the PDF is a Word export and can only be fixed at the source.
 * **Fix the .docx and re-export, then delete this note.** Until then the page
 * and the file a recruiter downloads will differ on this one number.
 *
 * Deliberately NOT here: expected CTC. Compensation stays a conversation, so
 * it must not leak into the page, the structured data, or the assistant.
 */

export const RESUME_UPDATED = "2026-08-13";

/** Human-readable form of RESUME_UPDATED, for the page footer. */
export const RESUME_UPDATED_LABEL = "August 2026";

/** Path to the downloadable PDF this file mirrors. */
export const RESUME_PDF = "/Suman_Debnath_Resume.pdf";

// ── Identity ──────────────────────────────────────────────────────────────

export const identity = {
  name: "Suman Debnath",
  headline: "Senior Brand Marketing & AI Product Marketing Leader",
  targeting: "Targeting PMM and AI PM roles",
  phone: "+91 7980296957",
  phoneHref: "tel:+917980296957",
  // Same number, same link the hero has carried all along.
  whatsappHref: "https://wa.me/917980296957",
  email: "sumandebnath944@gmail.com",
  location: "Pune, Maharashtra, India",
  portfolio: "https://sumandebnath.houseofnamus.com",
  availability: "Open to remote / relocation",
  noticePeriod: "90 days",
} as const;

export const summary =
  "Senior marketing & product leader with 9+ years scaling brands and 2+ years " +
  "independently shipping AI-native products. I have grown website traffic by " +
  "40–50%, managed ₹40–60L in annual budgets, and compressed production cycles " +
  "from weeks to hours using custom GenAI workflows. The rarest combination in " +
  "today's AI market is not someone who understands AI, nor someone who " +
  "understands business — it is someone who understands both from the inside. I " +
  "know what brand and performance marketing teams actually need because I have " +
  "run one. I know what AI can realistically deliver because I build with it " +
  "every day. I bring both.";

// ── Core skills ───────────────────────────────────────────────────────────

export type SkillGroup = { group: string; items: string[] };

export const coreSkills: SkillGroup[] = [
  {
    group: "Marketing & Brand",
    items: [
      "Product Marketing Strategy",
      "Go-to-Market Planning",
      "Brand Strategy & Positioning",
      "Campaign Architecture",
      "Performance Marketing",
      "SEO / SEM / Content Strategy",
      // Added 27 Aug 2026. This array is the source of truth for /resume and
      // for the skills block in lib/systemPrompt.ts, so without it the site's
      // own assistant could not say Suman does this work.
      "AEO / GEO / Answer-Engine Optimisation",
      "Agentic Readiness",
      "Google Ads & Meta Ads",
      "Social Media",
      "Marketing Automation",
    ],
  },
  {
    group: "AI & Product",
    items: [
      "AI Product Development",
      "Prompt Engineering",
      "Agentic AI",
      "RAG Systems",
      "AI Workflow Design",
      "Multi-Team Leadership",
      "Data Analysis & Reporting",
      "LLMs, SLMs, training & fine-tuning",
    ],
  },
  {
    group: "Tools & Stack",
    items: [
      "Next.js",
      "React",
      "Supabase",
      "Vercel",
      "n8n",
      "Claude Code",
      "Codex",
      "Cursor",
      "Replit",
      "Lovable",
      "and 30+ more",
    ],
  },
];

// ── Professional experience ───────────────────────────────────────────────

export type ExperienceBullet = { label: string; text: string };

export type Role = {
  title: string;
  org: string;
  location: string;
  period: string;
  current: boolean;
  bullets: ExperienceBullet[];
};

export const experience: Role[] = [
  {
    title: "Senior Brand Marketing Manager",
    org: "Pune Institute of Business Management (PIBM)",
    location: "Pune, India",
    period: "March 2019 – Present",
    current: true,
    bullets: [
      {
        label: "AI workflow implementation",
        text:
          "Introduced a GenAI-powered ad creative pipeline saving 2–3 hours daily; built a custom GPT trained to convert student photos into professional leadership portraits, eliminating 7–8 hours of manual image editing per week across the design team — reducing a multi-day process to near-instant output.",
      },
      {
        label: "SEO & web growth",
        text:
          "Grew institutional website traffic by 40–50% through SEO restructuring, content architecture redesign, and a full UX overhaul; using AI-assisted development workflows, compressed website redesign and launch cycles from several weeks to hours — end-to-end owning strategy, content, design coordination, and QA.",
      },
      {
        label: "Campaign & revenue impact",
        text:
          "Designed and executed full GTM for 20+ academic programme launches — brief, landing pages, SEO, and lead campaigns across Google and Meta — directly contributing to admissions revenue; delivered 99%+ of all projects on time and within budget across 6+ years.",
      },
      {
        label: "Budget & vendor management",
        text:
          "Owned a ₹30–40L annual vendor budget across print, OOH, and digital production; restructured content management from unstructured ad-hoc workflows to a platform-wise structured pipeline, significantly reducing briefing-to-delivery turnaround times.",
      },
      {
        label: "Team leadership",
        text:
          "Directed a 21-person cross-functional team spanning digital marketing, graphic design, and web development; introduced structured brief and workflow systems that reduced revision cycles and improved output consistency across all departments.",
      },
      {
        label: "Digital & print media ownership",
        text:
          "End-to-end managed the print media funnel from strategy and content development through design and final delivery; led all social media content planning, improving copy quality and platform-wise structured publishing cadence.",
      },
    ],
  },
  {
    title: "Branding & Digital Marketing Manager",
    org: "CBS Ventures",
    location: "Pune, India",
    period: "January 2018 – October 2018",
    current: false,
    bullets: [
      {
        label: "",
        text:
          "Built and executed an integrated digital marketing strategy encompassing SEO, SEM, paid social, and organic growth; owned website design, development oversight, and UX optimisation — continuously measuring and improving performance and conversion metrics.",
      },
      {
        label: "",
        text:
          "Led full brand identity development from strategy to execution; managed all external creative agency and vendor relationships.",
      },
    ],
  },
];

export const earlierExperience =
  "Marketing Executive at Aamrit · Summers at Nivea · Summers at Raman Byte Pvt Ltd · Winters at Aamrit";

// ── Projects ──────────────────────────────────────────────────────────────

/**
 * `href` points at this site wherever a deep-dive page exists — that internal
 * linking is half the reason /resume is worth having for SEO. `external` is the
 * live product itself, on its own domain.
 */
export type ResumeProject = {
  name: string;
  status?: string;
  /** Flagship entries state the problem before the build. */
  problem?: string;
  built: string;
  href?: string;
  external?: string;
};

export const flagshipProjects: ResumeProject[] = [
  {
    name: "MIGI — Fleet of 46 AI Agents Working Independently",
    status: "Live",
    problem:
      "No single system autonomously manages personal brand, career, finances, and infrastructure monitoring for a solo founder.",
    built:
      "46-agent autonomous AI fleet covering LinkedIn autopilot, job applications, expense tracking, journaling, uptime monitoring and more, controlled via a dashboard with 2FA and a Telegram bot. 500+ automated eval checks.",
    href: "/agents/migi",
  },
  {
    name: "ROASmind",
    status: "In Testing",
    problem:
      "Performance marketing teams are expensive, fragmented across platforms, and slow to execute.",
    built:
      "AI-native marketing operating system unifying Meta, Google and LinkedIn under one AI brain — engineered to eliminate 70–80% of performance marketing operational costs. Stack: Next.js, FastAPI, Supabase, LLM APIs. 200,000+ lines of AI-assisted code.",
    href: "/projects/roasmind",
  },
  {
    name: "IMPRINT",
    status: "Live",
    problem:
      "Identity continuity and preservation — a problem most people don't yet know they have.",
    built:
      "AI identity preservation system. Built from ideation to live product in ~1 week. Validated by multiple reviewers as a product whose full significance will be widely understood within 5–10 years.",
    href: "/projects/imprint",
    external: "https://imprint.houseofnamus.com",
  },
  {
    name: "LEGATUS",
    status: "Live",
    problem: "No structured digital legacy system exists for individuals.",
    built:
      "One-of-a-kind AI-powered end-of-life digital legacy vault — no direct market equivalent. Built from ideation to live product in ~1 week.",
    href: "/projects/legatus",
    external: "https://legatus.houseofnamus.com",
  },
];

export const additionalProjects: ResumeProject[] = [
  {
    name: "PentaCMD",
    built:
      "47M-parameter SLM built from scratch (nanoGPT-style), trained on 299K instruction→command pairs across 5 terminal families. ~87% exact-match. Live.",
    href: "/slms/pentacmd",
  },
  {
    name: "Pentashell CLI",
    built:
      "Natural language to terminal command CLI powered by the custom PentaCMD-47M SLM.",
    href: "/agents/pentashell",
  },
  {
    name: "Qdex-1.5B",
    built:
      "QLoRA fine-tuning pipeline for Qwen2.5-Coder-1.5B on instruction-style coding data with HumanEval benchmarking.",
    href: "/llms/qdex-1.5b",
  },
  {
    // Distinct from PACT Agent, which is its own trust-first CLI agent with a
    // permission-contract model. Similar territory, separate builds — don't
    // collapse them into one entry.
    name: "Q-Dexter",
    built:
      "Local CLI coding agent with a human-approval gate turning plain-English goals into multi-step file and command actions.",
  },
  {
    name: "Aegis Vault",
    built:
      "Zero-knowledge encrypted notepad with AES-256-GCM + Argon2id envelope encryption.",
    href: "/projects/aegis-vault",
  },
  {
    name: "D-PE.ai",
    built:
      "Premium prompt engineering workspace with a Socratic interview engine and a sarcastic hacker terminal gateway.",
    href: "/projects/d-pe",
    external: "https://d-pe.houseofnamus.com/",
  },
  {
    name: "Forget Anything?",
    built:
      "Android app with geofencing + WiFi-based departure triggers to remind you of essentials before you leave home.",
    href: "/apps/forget-anything",
  },
  {
    name: "Soul Canvas",
    built:
      "Cinematic 3D psychological portrait — 24 questions render your inner architecture as a living particle sculpture.",
    href: "/fun-apps",
  },
  {
    name: "PixelVille",
    built:
      "Procedurally-generated city builder game with a real economy, seasons, weather, crime, democracy and disasters.",
    href: "/games/pixelville",
  },
  {
    name: "Brief Killer",
    built: "AI project brief generator integrated with the OpenAI API.",
    external: "https://briefkiller.houseofnamus.com",
  },
  {
    name: "Brief Killer 2.0",
    built: "Next-gen AI strategy engine for real-time brief generation.",
    external: "https://briefkiller2.houseofnamus.com",
  },
  {
    name: "Repurpose AI",
    built: "AI content transformation and repurposing system.",
    external: "https://repurposeai.houseofnamus.com",
  },
  {
    name: "Crawl Daddy",
    built:
      "SEO intelligence crawler with PageSpeed integration and AI recommendations.",
    external: "https://crawldaddy.houseofnamus.com",
  },
  {
    name: "Slide Doctor",
    built: "AI-powered presentation audit and improvement system.",
    external: "https://slidedoctor.houseofnamus.com",
  },
  {
    name: "EMBER",
    built: "AI burnout recovery companion with personalised wellness prompting.",
    href: "/projects/ember",
    external: "https://v0-meet-ember-ai.vercel.app",
  },
  {
    name: "CITE",
    built: "AI career intelligence and guidance system.",
    href: "/projects/cite",
    external: "https://cite.houseofnamus.com",
  },
  {
    name: "Geek Collectibles",
    built:
      "Full e-commerce ecosystem: frontend, backend, database, admin panel, customer portal.",
    href: "/projects/geek-collectibles",
  },
];

export const projectsPreamble =
  "Independently designed, built, and shipped using AI-assisted development workflows — Claude Code, ChatGPT Codex, Cursor, Lovable, Replit, and 20+ more. Each product taken from ideation to live independently.";

/**
 * Work that exists on this site but postdates — or never fit inside — two pages
 * of PDF. This is the block a PDF cannot have, and the reason a visitor should
 * read the page instead of downloading the file.
 */
export const beyondTheResume: ResumeProject[] = [
  {
    name: "PACT Agent",
    built:
      "Trust-first local CLI coding agent: every file write and shell command passes through an explicit human-approval contract before it runs.",
    href: "/agents/pact-agent",
  },
  {
    name: "MIGI Android App",
    built:
      "Native Android client for the MIGI agent fleet — V2 rebuilt natively, with the V1 build kept as a readable archive.",
    href: "/apps/migi-app",
  },
  {
    name: "Learnings",
    built:
      "The engineering notebook behind the builds — what broke, what the fix actually was, and what generalises.",
    href: "/learnings",
  },
  {
    name: "Project archive",
    built:
      "Every system, with deep-dive dossiers on the flagship four and the full back catalogue of experiments.",
    href: "/projects",
  },
];

// ── Education & certifications ────────────────────────────────────────────

export type Education = {
  qualification: string;
  institution: string;
  period: string;
};

export const education: Education[] = [
  {
    qualification: "Generative & Agentic AI",
    institution: "Saïd Business School, University of Oxford",
    period: "2026",
  },
  {
    qualification: "PGP — Strategic Digital Marketing",
    institution: "Great Lakes Institute of Management",
    period: "2023",
  },
  {
    qualification: "MBA — Marketing",
    institution: "Pune Institute of Business Management",
    period: "2016–2018",
  },
  {
    qualification: "BA — English (Honours)",
    institution: "West Bengal State University",
    period: "2013–2016",
  },
];

export type CertificationGroup = {
  issuer: string;
  period: string;
  items: string[];
};

export const certifications: CertificationGroup[] = [
  {
    issuer: "Anthropic",
    period: "2026",
    items: [
      "Claude 101 & Claude Code 101",
      "Claude Code in Action",
      "Introduction to Claude Cowork",
      "AI Fluency: Framework & Foundations (with University College Cork)",
    ],
  },
  {
    issuer: "LinkedIn Learning",
    period: "2026",
    items: [
      "Generative AI for Business Leaders",
      "Integrating Generative AI into Business Strategy",
      "AI Challenges & Opportunities for Leadership",
      "Keeping Teams on the Bleeding Edge of AI Innovation",
      "Introduction to Prompt Engineering for Generative AI",
      "Introduction to Artificial Intelligence",
    ],
  },
  {
    issuer: "Microsoft",
    period: "2026",
    items: ["AI for Organizational Leaders, by Microsoft and LinkedIn"],
  },
  {
    issuer: "AI & Digital",
    period: "2023–2026",
    items: [
      "Generative AI Bootcamp — Outskill (Jan 2026)",
      "Strategic Digital Marketing — Great Learning (2024)",
      "ChatGPT & AI Hacks with MS Office — Skill Nation (2024)",
      "ChatGPT & Generative AI Workshop — GrowthSchool (2023)",
    ],
  },
  {
    issuer: "Google",
    period: "",
    items: [
      "Google Analytics Individual Qualification",
      "Advanced Google Analytics",
      "Google Digital Unlocked: Fundamentals of Digital Marketing",
    ],
  },
];

// ── Target roles ──────────────────────────────────────────────────────────
// Not printed on the PDF, but the assistant is asked this constantly.

export const targetRoles = [
  "Product Marketing Manager (PMM) at AI or tech companies",
  "Senior Brand Marketing Manager",
  "AI Product Manager (where a formal engineering degree is not mandatory)",
  "AI Product Marketing Manager",
  "Digital Marketing Lead / Head of Marketing",
  "AI Marketing Lead",
  "AI Implementation / Transformation Lead",
];
