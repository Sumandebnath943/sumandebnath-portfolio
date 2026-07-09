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
  { value: 30, suffix: "+", label: "autonomous agents", sub: "one job each, all running" },
  { value: 3, label: "identities, one panel", sub: "fleet · MAS · ECHO" },
  { value: 1, label: "right brain per job", sub: "a fallback for every agent" },
  { value: 24, suffix: "/7", label: "in the cloud", sub: "no servers, no paid infra" },
  { value: 0, prefix: "$", label: "running cost", sub: "free-tier + a few $/mo, capped" },
  { value: 2, label: "security audits", sub: "independently audited + hardened" },
];

/* ── The three pillars — one control panel, three identities ──────────────── */
export const PILLARS: {
  id: "fleet" | "mas" | "echo";
  badge: string;
  name: string;
  role: string;
  tagline: string;
  body: string;
  points: string[];
}[] = [
  {
    id: "fleet",
    badge: "the doer",
    name: "MIGI",
    role: "the fleet",
    tagline: "30+ agents that run my career & ops.",
    body: "The original fleet: 30+ cloud agents that monitor, learn, create and run my day — each doing one job and reporting back, plus a staff layer that runs the fleet itself.",
    points: ["30+ scheduled + on-demand agents", "Monitors, curates, drafts, job-hunts, tracks money", "Reaches me on Telegram + email"],
  },
  {
    id: "mas",
    badge: "the team",
    name: "MIGI MAS",
    role: "a multi-agent system",
    tagline: "Hand it a goal; a squad plans & executes it.",
    body: "A team of specialist agents I delegate an open-ended goal to — by text or voice. A supervisor plans it, workers research, draft and critique, and it returns something for me to approve.",
    points: ["Supervisor + researcher / analyst / writer / critic", "Composes the fleet agents as tools", "Human approval on every real action"],
  },
  {
    id: "echo",
    badge: "the memory",
    name: "MIGI ECHO",
    role: "a knowledge brain",
    tagline: "A second brain I can talk to.",
    body: "A private RAG system that has read my notes, files and code. I ask by text or voice and it answers from my own knowledge plus live data, cites the source, and reads it back aloud.",
    points: ["Feed it notes, docs, URLs, my repos", "Grounded, cited answers — text or voice", "Its own dedicated memory store"],
  },
];

/* ── The fleet — six areas, framed by value (never listing private data) ──── */
export type Agent = { name: string; what: string; why: string; tag?: string };
export type Area = {
  id: string;
  title: string;
  kicker: string;
  icon: string; // 24×24 stroke path
  agents: Agent[];
  // optional framing beat rendered above the area's cards (used by the staff layer)
  intro?: { text: string; shot?: { src: string; w: number; h: number } };
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
  {
    id: "career",
    title: "Career & Growth",
    kicker: "find work · build · reach out · launch · money",
    icon: "M3 17l6-6 4 4 8-8 M15 7h6v6",
    agents: [
      { name: "Finance Tracker", what: "Captures bank SMS and app notifications, de-duplicates the same transaction across both, learns my category corrections, and ignores payment reminders — a private, categorized ledger with budgets, alerts and a 24-month history.", why: "An expense tracker I can actually trust.", tag: "Privacy-first · behind my login" },
      { name: "Job Search", what: "Continuously scouts target roles, scores each against my CV, drafts a tailored cover letter, and hands me an apply-ready packet with a direct link.", why: "The tedious 95% of applying, done — I keep the final click.", tag: "No auto-submit · by design" },
      { name: "Build Compass", what: "Accumulates real demand from developer communities all week — weighing engagement and what people ask for — then ranks a Top-7 'build this next' with evidence and a kickoff prompt.", why: "I build what people actually want, not what I guess." },
      { name: "Outreach Scout", what: "Twice a week it surfaces freelance gigs, collabs and hackathons that fit me, and drafts a specific, non-cringe intro for each.", why: "Opportunities I'd never find — with the intro already written.", tag: "Draft-only · I send it myself" },
      { name: "Skill-Gap Advisor", what: "Monthly, it compares what I've been building against what's rising in AI and names at most two skills to learn next — each with a first step.", why: "One focused nudge a month, never overwhelm." },
      { name: "Micro-Launch Autopilot", what: "For any repo I've shipped, it drafts platform-tailored launch posts (Show HN, Reddit, Bluesky, X, Product Hunt) and can auto-post the Bluesky one on a tap.", why: "Ship, then actually announce it.", tag: "Draft-only except Bluesky" },
    ],
  },
  {
    id: "staff",
    title: "Staff & Self-Management",
    kicker: "the fleet that runs the fleet",
    icon: "M12 3a2 2 0 100 4 2 2 0 000-4z M5 21a2 2 0 100-4 2 2 0 000 4z M19 21a2 2 0 100-4 2 2 0 000 4z M12 7v4 M12 11H6v2 M12 11h6v2",
    intro: {
      text: "The newest layer isn't more agents doing my work — it's agents that run the fleet itself. A one-person company where even the ops, QA and analytics roles are automated: an in-house CTO reviewing my code, a brand manager auditing my sites, and a team manager metering every AI call. The fleet reports on itself.",
      shot: { src: "/migi-agent/team observability card.png", w: 654, h: 168 },
    },
    agents: [
      { name: "Automated CTO", what: "Every morning it reviews new commits across every repo I own — auto-discovering new ones — for security, performance, quality, duplication and missing docs/tests, then sends one consolidated, severity-ranked PDF review to my phone.", why: "A senior engineer looking over my shoulder, across everything I ship.", tag: "Only reviews what's new" },
      { name: "AI Brand Manager", what: "Weekly, it audits every page of my live sites (found via each sitemap) for performance, accessibility and on-page SEO — plus Google rankings and traffic — and flags week-over-week regressions.", why: "A marketing-ops team that never sleeps — catching a regression the week it happens.", tag: "Budget-aware · free tiers" },
      { name: "AI Team Manager", what: "Meters every LLM call the whole fleet makes — cost, tokens, latency, failures and rate-limits, per provider and per agent — into a live dashboard, a weekly ops report and provider health checks.", why: "You can't run a fleet you can't see. Now I can see all of it.", tag: "Self-observability" },
    ],
  },
];

/* ── The two-way bot — now real-time (event-driven webhook) ───────────────── */
export const BOT_ACTIONS: { cmd: string; does: string }[] = [
  { cmd: "/review", does: "Code-review my latest commits" },
  { cmd: "/audit", does: "Audit my sites' health & SEO" },
  { cmd: "/ops", does: "This week's AI cost & failures" },
  { cmd: "/briefing", does: "Today's tech briefing, on demand" },
  { cmd: "/linkedin", does: "Draft a LinkedIn post right now" },
  { cmd: "/expenses", does: "This month's spend summary" },
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
export const LINKEDIN_SHOT = { src: "/migi-agent/linkedin.png", w: 1365, h: 767 };

/* ── Finance Tracker — spotlight (feature #2) ─────────────────────────────── */
export const FINANCE_STEPS: { title: string; body: string }[] = [
  { title: "Captures both channels", body: "It reads both bank SMS and banking-app notifications, so nothing slips through a channel gap." },
  { title: "De-duplicates", body: "When the same transaction arrives on both channels it's merged into one — matched on the bank's reference number — while two genuinely identical purchases stay two." },
  { title: "Filters the noise", body: "Ads and recharge offers, payment-due and EMI reminders, money I received, OTPs and pending authorizations are all recognized and skipped — a deterministic rule I can read and test, not a guess. Only money that actually moved is logged." },
  { title: "Categorizes & learns", body: "Sorts each spend into real-world categories (rent, EMI, OTT, groceries, misc…) — and when I re-categorize a merchant, it remembers next time." },
  { title: "Takes manual entry too", body: "A one-tap form captures cash spends the phone never sees." },
  { title: "Tracks & guards", body: "A 24-month history, daily/weekly/monthly rollups, budget caps with instant alerts, and a full audit trail — private, behind my login." },
];
export const FINANCE_LAYERS: { name: string; body: string }[] = [
  { name: "Capture", body: "Reads bank SMS and app notifications the instant they arrive." },
  { name: "Dedup", body: "Merges the same transaction across channels on its reference number." },
  { name: "Filter", body: "Recognizes and skips payment reminders — logs only real spend." },
  { name: "Learning", body: "Remembers my category corrections, per merchant." },
  { name: "Privacy", body: "Strips account numbers and drops OTPs before anything is stored." },
  { name: "Ledger", body: "24-month categorized history, budgets, alerts and audit trail." },
];
export const FINANCE_CHIPS = [
  "Trained on my real messages", "Deterministic classifier", "Regression test suite",
  "SMS + app notifications", "Smart de-duplication", "Learns my corrections", "Ignores payment reminders",
  "Manual cash entry", "24-month history", "Budget caps + alerts", "Privacy-first", "Behind my login",
];
export const FINANCE_SHOT = { src: "/migi-agent/finance.png", w: 1350, h: 767 };

/* ── Cycle A · Finance, trained + tested like a product ───────────────────── */
export const FINANCE_TRUST: { name: string; body: string }[] = [
  { name: "Trained on real messages", body: "Taught on a labeled set of my own bank-message screenshots, so it learns exactly what is — and isn't — an actual payment." },
  { name: "A deterministic decision", body: "The log-this / skip-this call is made by rules I can read and test; the AI only helps with the genuinely fuzzy parts. It can't be talked into logging an ad as a purchase." },
  { name: "One payment, counted once", body: "When the same payment arrives from two sources, the bank's record is the source of truth — so a single EMI or premium is never double-counted." },
  { name: "Ships with a test suite", body: "Dozens of labeled real-world cases run in one command and prove the classifier is right — so I can change it fearlessly and catch any regression instantly." },
];

/* ── Job Search — spotlight (feature #3) ──────────────────────────────────── */
export const JOBS_STEPS: { title: string; body: string }[] = [
  { title: "Scouts roles", body: "Continuously scans job boards for roles that fit my target." },
  { title: "Scores against my CV", body: "Ranks each opening with a match score, so the strongest fits rise to the top." },
  { title: "Writes the cover letter", body: "Drafts a tailored cover letter for each role, grounded in my real experience." },
  { title: "Packages it apply-ready", body: "Hands me a complete packet with a direct apply link — everything but the final click." },
  { title: "I click apply", body: "Deliberately no auto-submit: higher quality and fully compliant. The submit is always mine." },
  { title: "Tracks the pipeline", body: "Every role moves through new → applied → interviewing → rejected on the dashboard." },
];
export const JOBS_LAYERS: { name: string; body: string }[] = [
  { name: "Discovery", body: "Scouts target roles across job boards, continuously." },
  { name: "Matching", body: "Scores each role against my CV for genuine fit." },
  { name: "Generation", body: "Drafts a tailored cover letter per role." },
  { name: "Packaging", body: "Assembles an apply-ready packet with a direct link." },
  { name: "Human gate", body: "I make the final apply click — never auto-submitted." },
  { name: "Pipeline", body: "Tracks every application through to its outcome." },
];
export const JOBS_STAGES = ["New", "Applied", "Interviewing", "Rejected"];
export const JOBS_CHIPS = [
  "Scores against my CV", "Tailored cover letters", "Apply-ready packet", "Direct apply link",
  "No auto-submit — by design", "Fully compliant", "Pipeline tracking",
];
export const JOBS_SHOT = { src: "/migi-agent/jobs.png", w: 1348, h: 767 };

/* ── MIGI MAS — a multi-agent system (feature #1) ─────────────────────────── */
export const MAS_STEPS: { title: string; body: string }[] = [
  { title: "I hand it a goal", body: "Typed or spoken — a voice note is enough. One open-ended objective instead of a single-agent trigger." },
  { title: "A supervisor plans it", body: "It breaks the goal into a plan and delegates each step to the right specialist worker." },
  { title: "Specialists collaborate", body: "A researcher, an analyst, a writer and a critic work through a shared workspace — and can call my existing fleet agents as tools." },
  { title: "They critique each other", body: "Drafts get reviewed and sharpened before anything reaches me — not one model's first guess." },
  { title: "I approve every action", body: "It plans and proposes; every real-world action waits for my explicit yes. Human-in-the-loop by design." },
];
export const MAS_MISSIONS: { name: string; body: string }[] = [
  { name: "Draft & publish a post", body: "Give it a topic or the exact words; it researches, writes in my voice, and — on my yes — publishes to LinkedIn, Bluesky and Mastodon with the links back." },
  { name: "Job-application prep", body: "Research the company, score my fit, draft a tailored cover letter and a warm-up post." },
  { name: "Content draft", body: "Take an angle and produce a finished, on-voice piece — researched and critiqued." },
  { name: "Market / competitor scan", body: "Survey a topic or a competitor and come back with a structured read." },
  { name: "Decision memo", body: "Write a reasoned memo on an open question, with the trade-offs laid out." },
  { name: "Ask across all my data", body: "Answer a question over everything I've captured, at once." },
];
export const MAS_CHIPS = [
  "Goal-in, done-out", "Voice-startable", "Supervisor + specialist workers",
  "Composes the fleet as tools", "Critic in the loop", "Approve / Edit gate",
  "Publishes to LinkedIn + Bluesky + Mastodon", "Returns the live links",
  "Fully isolated · own compute budget", "Runs only when I ask",
];
export const MAS_SHOT = { src: "/migi-agent/MIGI MAS.png", w: 1350, h: 767 };

/* ── Cycle A · MIGI MAS now EXECUTES — the Operator ───────────────────────── */
export const MAS_EXECUTE_STEPS: { title: string; body: string }[] = [
  { title: "Hand it a task", body: "In plain language — from the dashboard, or by chat or voice. Either the exact words to post, or just a topic to run with." },
  { title: "It researches + drafts", body: "Given only a topic, the squad researches it and writes the post in my voice, tailored to each platform." },
  { title: "Approve or edit", body: "The finished post lands behind an Approve / Edit gate — I revise it in one message (“punchier, drop the emoji”) and it re-drafts. Nothing goes out until I say yes." },
  { title: "It publishes live", body: "On approval it posts to my LinkedIn, Bluesky and Mastodon at once — then hands me back the links to the live posts." },
];
export const MAS_EXECUTE_SHOT = { src: "/migi-agent/MAS can execute.png", w: 308, h: 181 };

/* ── MIGI ECHO — a knowledge brain you talk to (feature #2) ───────────────── */
export const ECHO_STEPS: { title: string; body: string }[] = [
  { title: "Teach it anything", body: "Typed notes, PDFs and Word docs, a URL, or one of my GitHub repos — it reads, chunks and remembers each one." },
  { title: "Ask it any way", body: "Type or speak, on the web app or a dedicated assistant — it transcribes my voice and understands the question." },
  { title: "Grounded + cited", body: "Answers pull from what I've taught it plus a live read of my own data, and it tells me the source — or says “I don't know that yet” instead of inventing." },
  { title: "Reads it back", body: "On the web it speaks its replies aloud with a free browser voice — a real conversation, not a search box." },
  { title: "Its own memory", body: "A dedicated store so my knowledge can grow without competing with the fleet — inside a modern chat UI with a history sidebar." },
];
export const ECHO_CHIPS = [
  "RAG over my own knowledge", "Notes · docs · URLs · my repos", "Text or voice", "Speaks replies aloud",
  "Cites every source", "Says “I don't know” — no inventing", "Dedicated memory store", "Chat UI with history",
];
export const ECHO_SHOT = { src: "/migi-agent/MIGI ECHO.png", w: 1365, h: 767 };

/* ── Resume / ATS reviewer (feature #3) ───────────────────────────────────── */
export const RESUME_STEPS: { title: string; body: string }[] = [
  { title: "Parses like an ATS", body: "It reads the file the way an applicant-tracking system does, and flags the traps that get resumes auto-rejected: multi-column layouts, tables, text trapped in images, un-parseable dates and sections." },
  { title: "Matches the real roles", body: "It scores the resume against the actual live roles I'm targeting — pulled by my job agent — for a real match-rate with the exact missing keywords." },
  { title: "Three review lenses", body: "It reads as a recruiter, a hiring manager and an ATS bot in turn, then hands back prioritized fixes." },
  { title: "Tracks the score", body: "Every review is logged, so I can watch the score climb as I fix what it found." },
];
export const RESUME_LENSES: { name: string; body: string }[] = [
  { name: "Recruiter", body: "The 6-second scan — does it land at a glance?" },
  { name: "Hiring manager", body: "The depth read — does the substance hold up?" },
  { name: "ATS bot", body: "The machine parse — does it survive the filter?" },
];
export const RESUME_CHIPS = [
  "Real ATS-style parse", "Flags column / table / image traps", "Market-calibrated keyword match",
  "Scored against my live roles", "Recruiter · hiring-manager · ATS-bot", "Prioritized fixes", "Tracked score history",
];
export const RESUME_SHOT = { src: "/migi-agent/Resume Reviewer Agent.png", w: 1365, h: 767 };

/* ── One post, every platform — LinkedIn repurpose step (feature #4) ──────── */
export const CROSSPOST = {
  body: "Right after it publishes to LinkedIn, the autopilot offers to shorten and rewrite the same story — in my voice, with real, clickable hashtags — for Bluesky and Mastodon too, or to pick a different story for those. Both are free, open networks; still draft-and-approve.",
  chips: ["Repurposes each post", "LinkedIn → Bluesky + Mastodon", "In my voice", "Clickable hashtags", "Free open networks", "Still draft-and-approve"],
};

/* ── One animated identity switch (feature #5) ────────────────────────────── */
export const TOGGLE_SHOT = { src: "/migi-agent/MIGI Toggle.png", w: 126, h: 71 };

/* ═══════════════════════════════════════════════════════════════════════════
 *  Cycle C — Intelligent model routing (the right brain per job)
 *  Public-safe: no vendor/model names, no exact $ figures. Generic labels only.
 * ═════════════════════════════════════════════════════════════════════════ */
export const ROUTING_LAYERS: { name: string; body: string }[] = [
  { name: "Premium on the hard problems", body: "The reasoning-heavy, reputation-facing agents — code review, cover letters, my public content, the multi-agent war room — run on a top-tier paid model for quality." },
  { name: "Free on the routine", body: "The light, high-volume agents stay on free models. Capability matched to cost, per task — model orchestration, not “call an API.”" },
  { name: "A fallback for every agent", body: "Each agent has an ordered fallback chain; if its first-choice model is throttled or down, it drops to the next — so a single provider's bad day can't stall the fleet." },
  { name: "Cost-controlled", body: "Runs on the order of a few dollars a month, with per-provider spend tracked live on the dashboard — which brain, how many calls, what it cost." },
  { name: "Fail-safe", body: "Strictly opt-in: pull the paid key and every agent silently falls back to free models — zero breakage. One switch dials the priciest agent between premium and free." },
  { name: "Privacy-aware routing", body: "My most personal data — journal, finances, habits — is routed only through privacy-respecting providers, never free tiers that might train on it. Vision tasks are pinned to image-capable models." },
];
/* generic per-job fallback chains — replaces the (name-revealing) routing screenshot */
export const ROUTING_CHAINS: { job: string; chain: string[] }[] = [
  { job: "Heavy · quality · private work", chain: ["Premium · 1st", "Free A", "Free B", "Free C"] },
  { job: "Routine · high-volume work", chain: ["Free A · 1st", "Free B", "Free C", "Premium"] },
];
/* Cycle A3 · a self-regulating fleet — reliability on free infrastructure */
export const ROUTING_RELIABILITY: { title: string; body: string }[] = [
  { title: "It paces itself", body: "Agents space out their AI calls to stay under each provider's per-minute ceiling, so a busy agent can't stampede the limit and knock out the others." },
  { title: "It backs off politely", body: "When a provider says “slow down,” the fleet honors its own retry timing instead of hammering — and falls back to a second provider so a critical daily job never just fails." },
  { title: "It watches its own health", body: "A live diagnostics view shows exactly which agent and minute is under pressure, with an early-warning signal that flags call-bunching before it turns into a failure." },
];
export const ROUTING_CHIPS = [
  "The right brain per job", "A fallback for every agent", "No single-vendor dependency",
  "Premium where it counts, free where it doesn't", "Cost-controlled (~a few $/mo)", "Live per-provider spend",
  "Fail-safe — pull the paid key, it runs free", "Privacy-aware routing", "Self-pacing under free-tier limits",
];

/* ═══════════════════════════════════════════════════════════════════════════
 *  Cycle B — The engineering-maturity layer (trustworthy · extensible · self-improving)
 *  Public-safe: no vendor names for the add-ons; capabilities only.
 * ═════════════════════════════════════════════════════════════════════════ */
export const MATURITY: { title: string; body: string; why: string; icon: string }[] = [
  { title: "It tests + hardens itself", body: "A growing automated test suite guards the agents' core logic and runs on every change; every job has production guardrails — time limits, no double-runs, least-privilege — and self-recovers from transient database blips.", why: "Evolve it fast, and trust it still works.", icon: "M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z M9 12l2 2 4-4" },
  { title: "It heals itself", body: "A failure-triage agent spots any agent that fails, reads the error, diagnoses the likely cause and a suggested fix, and messages me — suggestion-only, it never edits code on its own.", why: "I learn what broke and how to fix it before I go looking.", icon: "M12 3a9 9 0 100 18 9 9 0 000-18z M12 8v4l3 2" },
  { title: "A resilient backbone + a built-in editor", body: "Multiple free AI providers with automatic failover so no single outage stops the work; a self-critique pass reviews my public content for voice and quality before it ever reaches me.", why: "Resilience and a quality gate — for free.", icon: "M4 12a8 8 0 0113-6 M20 4v4h-4 M20 12a8 8 0 01-13 6 M4 20v-4h4" },
  { title: "It connects to any AI", body: "Migi exposes its capabilities as standard, reusable tools any AI assistant can plug into — query my live data, trigger an agent, remember something — via the emerging industry standard for AI tools. It runs locally and privately.", why: "A closed system became an open platform.", icon: "M9 12h6 M6 9a3 3 0 100 6 3 3 0 000-6z M18 9a3 3 0 100 6 3 3 0 000-6z" },
  { title: "Free power-ups that can't overspend", body: "A budget-guard lets me bolt on premium-tier free services — sharper recall, cleaner web reading, real-time research — each metered against its monthly free limit and auto-falling-back to baseline the moment it's spent.", why: "Scale capability on free infra, strictly upside.", icon: "M13 2L4 14h6l-1 8 9-12h-6l1-8z" },
  { title: "Agents that learn + watch the web", body: "Adaptive memory learns my preferences over time — my content voice improves from the edits I make. A browser agent watches chosen public web pages and alerts me the moment something changes. Alert-only, human-in-the-loop.", why: "The fleet improves from how I use it — and can see the live web.", icon: "M12 3a9 9 0 100 18 9 9 0 000-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18" },
];
/* the free-tier budgets graphic — generic add-ons, no vendor names */
export const BUDGET_ADDONS: { name: string; note: string }[] = [
  { name: "Sharper recall", note: "premium-tier knowledge retrieval" },
  { name: "Cleaner web reading", note: "clean page extraction" },
  { name: "Real-time research", note: "live web search" },
];
export const MATURITY_CHIPS = [
  "Self-testing (eval suite on every change)", "Self-healing (auto-diagnoses failures)",
  "Production guardrails + self-recovery", "Resilient multi-provider backbone", "A built-in AI editor",
  "A standard AI-tool layer (MCP)", "Free power-ups that can't overspend", "Agents that learn",
  "Watches the web — alert-only", "Still $0 · human-in-the-loop",
];

/* ═══════════════════════════════════════════════════════════════════════════
 *  Cycle D — Security maturity (POSTURE ONLY — never the recipe)
 *  Public-safe: no vulnerabilities, no endpoints/files/tables/env names, no
 *  audit tools/vendors, no implication of a breach. Proactive hardening only.
 * ═════════════════════════════════════════════════════════════════════════ */
export const SECURITY_MATURITY: { title: string; body: string; icon: string }[] = [
  { title: "Independently audited, hardened in phases", body: "Because Migi runs my private life, I treated it like production software: I put the whole system — the fleet and the dashboard — through two independent AI-driven security audits, reconciled the findings into one prioritized plan, and fixed them high-to-low, each phase verified before the next, ending in a clean build and a live deploy.", icon: "M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z M9 12l2 2 4-4" },
  { title: "Fail-closed authentication", body: "The password + authenticator-app 2FA now fails closed: if any security setting is ever missing or misconfigured, it denies access instead of silently opening. Every view of private or financial data re-verifies my session on the server, and repeated failed logins lock out and ping me instantly.", icon: "M6 10V8a6 6 0 0112 0v2 M5 10h14v10H5z M12 14v3" },
  { title: "Private data, sealed at every layer", body: "Database access is locked so nothing is readable without the server's own key, my single most sensitive stored credential is encrypted at rest, and secrets live only in the platform vault — never in the code, the browser, or the logs.", icon: "M12 3a9 9 0 00-9 9c0 5 4 8 9 9 5-1 9-4 9-9a9 9 0 00-9-9z M9 12l2 2 4-4" },
  { title: "Hardened against AI-specific attacks", body: "The agents treat any web page or feed they read as untrusted data, never as instructions — so a malicious page can't hijack them. The AI tool layer got allowlists and a read-only mode, with guards against server-side request forgery and injection in the automation pipeline.", icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z M12 9v4 M12 16h.01" },
  { title: "The web fundamentals, done right", body: "Clickjacking protection, cross-site-request-forgery checks and strict browser security headers across the dashboard, plus brute-force lockouts with instant alerts — belt and suspenders on top of the AI-specific work.", icon: "M4 6h16v12H4z M4 10h16 M8 15h4" },
];
export const SECURITY_MATURITY_CHIPS = [
  "Independently security-audited (twice)", "Hardened in phases", "Fail-closed auth + 2FA",
  "Defense in depth", "A sealed database", "Sensitive credentials encrypted at rest",
  "Secrets never in code / browser / logs", "Prompt-injection defense", "A locked-down AI tool layer",
  "SSRF + pipeline-injection guards", "Clickjacking / CSRF / brute-force protection", "Proactive, not reactive",
];

/* ── Under the hood — quality upgrades across the whole system ─────────────── */
export const UNDERHOOD: { title: string; body: string; icon: string }[] = [
  { title: "Designed email templates", body: "Every automated email the fleet sends is now a designed template — tiles, sections and brand accents — so reports read like a product, not a log dump.", icon: "M4 6h16v12H4z M4 8l8 5 8-5" },
  { title: "A robust hashtag engine", body: "Relevant, never-junk hashtags across all posting — real, clickable tags instead of keyword soup.", icon: "M9 3L7 21 M17 3l-2 18 M4 8h16 M3 16h16" },
  { title: "LLM resilience", body: "Calls auto-retry transient provider outages and fall back to a second AI provider if one is down — so a spike doesn't kill a run.", icon: "M4 12a8 8 0 0113-6 M20 4v4h-4 M20 12a8 8 0 01-13 6 M4 20v-4h4" },
];

/* ── Architecture flow (agents → LLMs → channels → state → dashboard) ─────── */
export const FLOW: { id: string; label: string; sub: string }[] = [
  { id: "agents", label: "30+ Agents", sub: "GitHub Actions · cron + on-demand" },
  { id: "llms", label: "Routed LLMs", sub: "right brain per job · free + premium" },
  { id: "channels", label: "Telegram + Email", sub: "instant pings · designed digests" },
  { id: "state", label: "Supabase", sub: "shared brain · memory" },
  { id: "dashboard", label: "Migi Dashboard", sub: "Next.js on Vercel · 2FA" },
];

/* ── Tech-stack chips ─────────────────────────────────────────────────────── */
export const STACK: { name: string; role: string }[] = [
  { name: "GitHub Actions", role: "Orchestration — cron + event-driven, one public monorepo of agents" },
  { name: "A premium model", role: "The lead brain — heavy, quality-critical work (code review, cover letters, public content, MAS reasoning)" },
  { name: "Privacy-first free LLMs", role: "Routine + personal work — routed only through providers that don't train on my data, vision-capable for receipts, a fallback for every agent" },
  { name: "Telegram Bot API", role: "Two-way channel — instant pings and slash-commands" },
  { name: "Resend", role: "Designed, email-safe HTML digests" },
  { name: "Supabase", role: "Shared state — Postgres key/value + per-domain tables" },
  { name: "Next.js on Vercel", role: "The Migi dashboard — App Router, signed session" },
  { name: "Claude Code", role: "How the whole system was designed and shipped" },
];

/* ── Dashboard showcase (screenshots live in /public/migi-agent) ──────────── */
export const SHOTS: { src: string; w: number; h: number; label: string; alt: string; caption: string }[] = [
  {
    src: "/migi-agent/overview.png", w: 1350, h: 767,
    label: "Overview",
    alt: "Migi dashboard Overview — fleet stats, a next-run countdown, month spend, recent-run bars, live domain health and the Agent Control panel",
    caption: "The home summary: fleet health, a live next-run countdown, month-to-date spend, real-time domain health, one-click Run, and the latest responses.",
  },
  {
    src: "/migi-agent/agents.png", w: 1348, h: 767,
    label: "Agents",
    alt: "Migi dashboard Agents page — full workflow table grouped by area with cadence, next run, last run, run-history heatmaps and status",
    caption: "Every workflow in one table — cadence, next run, last run, a run-history heatmap, and Run / Logs on each row.",
  },
  {
    src: "/migi-agent/team.png", w: 1348, h: 767,
    label: "Team",
    alt: "Migi dashboard Team Manager — LLM cost, tokens, latency, failures and rate-limits across the fleet, 12-month usage, a per-agent breakdown and a needs-attention panel",
    caption: "The self-observability page: LLM cost, tokens, latency and success — per provider and per agent — with 12-month usage, live health, and a 'needs attention' panel.",
  },
  {
    src: "/migi-agent/build.png", w: 1350, h: 767,
    label: "Build",
    alt: "Migi dashboard Build tracker — a scored Top-7 'build this next', each with the demand evidence and Start / Reject controls",
    caption: "Build Compass: a scored 'build this next' list grounded in real demand, with the evidence and a start → shipped tracker.",
  },
  {
    src: "/migi-agent/outreach.png", w: 1350, h: 767,
    label: "Outreach",
    alt: "Migi dashboard Outreach tracker — freelance, collab and hackathon opportunities with a drafted intro and a reached-out → replied pipeline",
    caption: "Outreach Scout: fitting opportunities with a drafted intro each — draft-only, tracked from reached-out to replied.",
  },
  {
    src: "/migi-agent/skills.png", w: 1365, h: 767,
    label: "Skills",
    alt: "Migi dashboard Skills tracker — at most two skills to learn next, each with why-now, how-it-builds-on-my-work and a first step",
    caption: "Skill-Gap Advisor: at most two skills to learn next — each with why now, how it builds on my work, and a first step.",
  },
  {
    src: "/migi-agent/launch.png", w: 1350, h: 767,
    label: "Launch",
    alt: "Migi dashboard Launch tracker — my repos with new-repo flags and per-platform launch drafts, Bluesky auto-post on a tap",
    caption: "Micro-Launch Autopilot: my repos with new-repo flags and platform-tailored launch drafts — Bluesky on one tap, the rest copy-only.",
  },
  {
    src: "/migi-agent/responses.png", w: 1350, h: 767,
    label: "Responses",
    alt: "Migi dashboard Responses feed — a bento wall of the actual content the agents produced, filterable by email or Telegram channel",
    caption: "A bento feed of the actual content the agents produced — filterable by channel, mirrored from every message they send.",
  },
  {
    src: "/migi-agent/data (2).png", w: 1350, h: 767,
    label: "Data",
    alt: "Migi dashboard redesigned Data page — a journaling streak, a productivity trend, a mood timeline, reading tags, scored ideas and monthly spend",
    caption: "The redesigned data page turns raw personal data into signal — a journaling streak, a productivity trend, a mood timeline, reading tags, scored ideas and monthly spend.",
  },
  {
    src: "/migi-agent/dashboard login.png", w: 1365, h: 767,
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

/* ── Session security + mobile (feature #5) — dashboard, not an agent ─────── */
export const DEVICES_SHOT = { src: "/migi-agent/devices.png", w: 1365, h: 449 };
export const SECURITY_FEATURES: { title: string; body: string; icon: string }[] = [
  { title: "Persistent, revocable sessions", body: "A 7-day rolling window that renews as I use it — no more random logouts, and still killable on demand.", icon: "M12 7v5l3 2 M12 3a9 9 0 100 18 9 9 0 000-18z" },
  { title: "Remote device logout", body: "See every device the dashboard is logged in on, and revoke any one, all others, or everywhere in a tap.", icon: "M12 4v8 M7.5 7a7 7 0 109 0" },
  { title: "Mobile-first control panel", body: "A compact menu and cards that reflow for a phone — the whole fleet, run from my pocket.", icon: "M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1z M11 18h2" },
];

/* ── How it was built ─────────────────────────────────────────────────────── */
export const BUILD: { title: string; body: string }[] = [
  { title: "Built with Claude Code", body: "From architecture to 30+ agents to a secure dashboard — designed and shipped by orchestrating an AI coding agent, solo." },
  { title: "On free infrastructure", body: "GitHub Actions, free LLM tiers, Supabase and Vercel free plans. The whole fleet runs 24/7 at zero running cost." },
  { title: "Humans in the loop", body: "Drafts and queues, never auto-send to the outside world. LinkedIn is draft-only; nothing leaves without approval." },
  { title: "One repo, many agents", body: "A single public monorepo with a shared lib/ foundation — one place to add an agent, one brain they all share." },
];
