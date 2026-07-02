/* ═══════════════════════════════════════════════════════════════════════════
 *  Migi — data module for the /agents/migi portfolio page.
 *
 *  Palette mirrors the real "Migi" mission-control dashboard:
 *  warm cream canvas · one lime accent · ink dark cards · Manrope type.
 *  (See D:\project\agents-for-suman\PROJECT_BIBLE.md §7.)
 *
 *  PRIVACY (PORTFOLIO_HANDOFF.md §🚫): capabilities only — no domains, no
 *  secrets, no real personal data. Everything below is safe to publish.
 * ═════════════════════════════════════════════════════════════════════════ */

export const MIGI = {
  cream: "#ECEAE2",     // warm canvas
  creamDeep: "#E4E2D8", // slightly deeper section band
  lime: "#C6F24E",      // the single accent
  limeSoft: "#E4F3BE",  // pale lime fill (pills, tints)
  ink: "#16171C",       // dark cards
  inkSoft: "#20212A",   // dark card, lifted
  card: "#FFFFFF",      // white surface cards
  text: "#16171C",      // primary text on cream
  muted: "#6C6B63",     // warm grey secondary text
  line: "#DAD8CE",      // hairline on cream
  green: "#77B33E",     // status / heatmap green
} as const;

/* ── Headline numbers (hero band) ─────────────────────────────────────────── */
export const STATS: { value: number; suffix?: string; prefix?: string; label: string; sub: string }[] = [
  { value: 20, suffix: "+", label: "autonomous agents", sub: "one job each, all running" },
  { value: 6, label: "capability areas", sub: "ship · brand · learn · ops · meta" },
  { value: 2, label: "free LLMs", sub: "Groq + Google Gemini" },
  { value: 24, suffix: "/7", label: "in the cloud", sub: "no servers, no paid infra" },
  { value: 0, prefix: "$", label: "running cost", sub: "free tiers, end to end" },
  { value: 1, label: "operator dashboard", sub: "password + 2FA gated" },
];

/* ── The fleet — six areas, framed by value (never listing private data) ──── */
export type Agent = { name: string; what: string; why: string; tag?: string };
export type Area = {
  id: string;
  title: string;
  kicker: string;
  icon: string; // 24×24 stroke path
  agents: Agent[];
};

export const AREAS: Area[] = [
  {
    id: "ship",
    title: "Ship & Monitor",
    kicker: "keep what I built alive",
    icon: "M3 12h4l3 8 4-16 3 8h4",
    agents: [
      { name: "Uptime Sentinel", what: "Pings every deployed site and flags anything down or slow, with an AI-written likely cause.", why: "Never hear from a user that my site is down." },
      { name: "Keep-Alive", what: "Stops free databases from auto-pausing, and warns me the moment one slips.", why: "Side-projects stay live — for free." },
      { name: "Morning Standup", what: "Reads my repos each weekday — commits, issues, PRs — and writes a 'where you left off' brief.", why: "I resume the right project in seconds." },
      { name: "Dependency & Security Digest", what: "Scans projects for outdated and vulnerable packages, then ranks what actually matters.", why: "Security hygiene without the noise." },
      { name: "Domain & SSL Expiry Watcher", what: "Warns me weeks before a domain or certificate lapses.", why: "No silent outages." },
    ],
  },
  {
    id: "brand",
    title: "Personal Brand",
    kicker: "show up consistently",
    icon: "M3 11l15-7v16L3 14v-3z M8 14v4a2 2 0 004 0",
    agents: [
      { name: "LinkedIn Autopilot", what: "Curates the day's top AI stories for me to pick from, drafts the one I choose in my voice with a real takeaway, guards against repeating itself, and clears a safety review — then publishes on my yes.", why: "Editorial control at the top of the funnel; leverage everywhere else.", tag: "I pick the story · human-approved" },
      { name: "Build-in-Public", what: "Turns the day's actual commits into a short, shareable post.", why: "Momentum, shared." },
    ],
  },
  {
    id: "learn",
    title: "Learn & Curate",
    kicker: "never miss the signal",
    icon: "M4 5a2 2 0 012-2h13v15H6a2 2 0 00-2 2V5z M19 3v15",
    agents: [
      { name: "Daily Tech Briefing", what: "A designed morning email of the most relevant tech & AI news, pulled across many sources.", why: "One skim instead of ten tabs." },
      { name: "Read-It-Later", what: "Send any link to my bot; it summarizes, tags, stores it, and resurfaces the backlog weekly.", why: "A reading queue that actually gets read." },
      { name: "Video / Article → Notes", what: "Send a YouTube or article link and get structured notes plus action items back.", why: "Consume long content in minutes." },
      { name: "Evening Video Digest", what: "The latest uploads from my chosen creators and top AI channels — one line each.", why: "Stay current on my terms." },
    ],
  },
  {
    id: "ops",
    title: "Personal Ops",
    kicker: "the admin that slips",
    icon: "M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z",
    agents: [
      { name: "Journaling Companion", what: "An evening nudge — I reply once and it saves a structured entry, with a weekly reflection.", why: "Reflection with zero friction.", tag: "Private-brain LLM" },
      { name: "Receipt → Expense Tracker", what: "Snap a photo of a receipt; AI reads it, logs the expense, and sends a weekly spend summary.", why: "Bookkeeping by camera." },
      { name: "Habit & Sleep Insights", what: "A quick daily line; fortnightly it finds honest patterns — like late nights versus output.", why: "Data telling me something true." },
    ],
  },
  {
    id: "meta",
    title: "Meta / Flagship",
    kicker: "the system thinking about itself",
    icon: "M12 3a9 9 0 100 18 9 9 0 000-18z M15 9l-2 4-4 2 2-4 4-2z",
    agents: [
      { name: "Idea-to-Spec Backlog", what: "Text a one-line idea; get a mini-PRD, a free-stack recommendation, and a ready-to-build prompt — ranked in a backlog.", why: "The antidote to builder's block." },
      { name: "Weekly Founder Review", what: "Reads everything the other agents collected and writes a 'state of you' review with three focus areas.", why: "A chief-of-staff that runs on my own data." },
    ],
  },
];

/* ── The two-way bot — now real-time (event-driven webhook) ───────────────── */
export const BOT_ACTIONS: { cmd: string; does: string }[] = [
  { cmd: "/briefing", does: "Today's tech briefing, on demand" },
  { cmd: "/linkedin", does: "Draft a LinkedIn post right now" },
  { cmd: "/standup", does: "Where I left off across my repos" },
  { cmd: "/reading", does: "My unread saved links" },
  { cmd: "/expenses", does: "This month's spend summary" },
  { cmd: "/ideas", does: "The ranked idea backlog" },
];
export const BOT_FEED =
  "Send a link, a receipt photo, a habit line or a journal reply — each routes to the right agent automatically.";

/* ── LinkedIn Autopilot — the human-in-the-loop content engine (feature #1) ── */
export const LINKEDIN_STEPS: { title: string; body: string }[] = [
  { title: "Curates the day's news", body: "Every morning it gathers the top ~7 AI developments, each with a one-line “why this matters.”" },
  { title: "I pick the story", body: "I choose what to talk about with a single tap — or tell it to auto-pick, or skip the day. The highest-leverage decision — what to say — stays mine." },
  { title: "Grounds it in me", body: "It ties the chosen story to my real work and point of view — never inventing experience." },
  { title: "Writes in my voice", body: "A studied high-engagement structure: a scroll-stopping hook, short punchy lines, one concrete takeaway, a sharp close — and it has to add real value, never just rephrase the news." },
  { title: "Never repeats itself", body: "It checks the draft against what I've recently posted and avoids reusing topics or opening lines, so the feed stays varied and intentional." },
  { title: "Safety review", body: "A multi-layer guardrail keeps every draft legal, authentic, non-political and safe for a public feed." },
  { title: "Asks me", body: "The draft lands on Telegram with Approve / Edit / Regenerate. One tap for a fresh angle, or plain-language edits it applies instantly." },
  { title: "Publishes", body: "On my explicit yes it posts to LinkedIn — in full and correctly formatted — and logs the live post." },
  { title: "Reports", body: "A weekly recap of what went out, and how it performed." },
];
export const LINKEDIN_CHIPS = [
  "I pick the story", "Studied high-engagement structure", "Value in every post",
  "Anti-repetition memory", "One-tap regenerate", "Plain-language edits", "Human-approved",
  "Grounded to my real work — no fabrication", "Multi-layer safety", "Weekly recap",
];

/* ── Architecture flow (agents → LLMs → channels → state → dashboard) ─────── */
export const FLOW: { id: string; label: string; sub: string }[] = [
  { id: "agents", label: "20+ Agents", sub: "GitHub Actions · cron + on-demand" },
  { id: "llms", label: "Two free LLMs", sub: "Groq · Google Gemini" },
  { id: "channels", label: "Telegram + Email", sub: "instant pings · designed digests" },
  { id: "state", label: "Supabase", sub: "shared brain · memory" },
  { id: "dashboard", label: "Migi Dashboard", sub: "Next.js on Vercel · 2FA" },
];

/* ── Tech-stack chips ─────────────────────────────────────────────────────── */
export const STACK: { name: string; role: string }[] = [
  { name: "GitHub Actions", role: "Orchestration — cron + event-driven, one public monorepo of agents" },
  { name: "Groq · gpt-oss", role: "Private content — journal, habits, email (no training on data)" },
  { name: "Google Gemini", role: "Public + visual — news, briefings, receipt vision" },
  { name: "Telegram Bot API", role: "Two-way channel — instant pings and slash-commands" },
  { name: "Resend", role: "Designed, email-safe HTML digests" },
  { name: "Supabase", role: "Shared state — Postgres key/value + per-domain tables" },
  { name: "Next.js on Vercel", role: "The Migi dashboard — App Router, signed session" },
  { name: "Claude Code", role: "How the whole system was designed and shipped" },
];

/* ── Dashboard showcase (screenshots live in /public/migi-agent) ──────────── */
export const SHOTS: { src: string; label: string; alt: string; caption: string }[] = [
  {
    src: "/migi-agent/dashboard.png",
    label: "Overview",
    alt: "Migi dashboard Overview — fleet stats, next-run countdown, recent-run bars, live domain health and the Agent Control panel",
    caption: "Fleet health, a live next-run countdown, recent-run bars, real-time domain health, and one-click Run for every agent.",
  },
  {
    src: "/migi-agent/dashboard 3.png",
    label: "Agents",
    alt: "Migi dashboard Agents page — full workflow table grouped by area with cadence, next run, last run, run-history heatmaps and status",
    caption: "Every workflow in one table — cadence, next run, last run, an eight-run history heatmap, and Run / Logs on each row.",
  },
  {
    src: "/migi-agent/dashboard 2.png",
    label: "Responses",
    alt: "Migi dashboard Responses feed — a bento wall of the actual content the agents produced, filterable by email or Telegram channel",
    caption: "A bento feed of the actual content the agents produced — filterable by channel, mirrored from every message they send.",
  },
  {
    src: "/migi-agent/dashboard login.png",
    label: "Locked",
    alt: "Migi dashboard sign-in — passphrase plus authenticator (TOTP) 2FA on a lime canvas; restricted, single-operator console",
    caption: "A single-operator console: passphrase + authenticator-app 2FA, a signed httpOnly session, and lockout on repeated failures.",
  },
];

/* ── Real deliverables — actual agent output (public/generic content only) ── */
export const DELIVERABLES: { src: string; w: number; h: number; agent: string; channel: "Email" | "Telegram" }[] = [
  { src: "/migi-agent/agent responses (1).jpeg", w: 1440, h: 3200, agent: "Daily Tech Briefing", channel: "Email" },
  { src: "/migi-agent/agent responses (2).jpeg", w: 1440, h: 896, agent: "Journaling Companion", channel: "Telegram" },
  { src: "/migi-agent/agent responses (3).jpeg", w: 1440, h: 3200, agent: "Evening Video Digest", channel: "Email" },
];

/* ── Orchestration proof — the real GitHub Actions workflow list ──────────── */
export const ORCHESTRATION_SHOT = { src: "/migi-agent/github agents.png", w: 1348, h: 526 };

/* ── How it was built ─────────────────────────────────────────────────────── */
export const BUILD: { title: string; body: string }[] = [
  { title: "Built with Claude Code", body: "From architecture to 20+ agents to a secure dashboard — designed and shipped by orchestrating an AI coding agent, solo." },
  { title: "On free infrastructure", body: "GitHub Actions, free LLM tiers, Supabase and Vercel free plans. The whole fleet runs 24/7 at zero running cost." },
  { title: "Humans in the loop", body: "Drafts and queues, never auto-send to the outside world. LinkedIn is draft-only; nothing leaves without approval." },
  { title: "One repo, many agents", body: "A single public monorepo with a shared lib/ foundation — one place to add an agent, one brain they all share." },
];
