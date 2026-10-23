/**
 * That One Crawler — every word and number on /crawlers/that-one-crawler.
 *
 * Source of truth is the product's own repo (read-only, D:\project\ThatOneCrawler):
 * docs/PORTFOLIO_HANDOFF.md for the story and the figures, docs/PROJECT_BIBLE.md
 * for the scoring tables, the routes and the guardrails. Re-read those before
 * changing a number here; nothing on this page is allowed to be rounded up.
 *
 * Screenshots were captured from the live app on 23 Oct 2026 (light mode,
 * 1440×900), after the accuracy overhaul of 22 Oct. The repo holds none. The
 * files were renamed rather than overwritten, so no cached optimised image can
 * outlive the shot it was made from.
 */

/** The app's own tokens, from its src/app/globals.css. Light is the page; dark is the ink bands. */
export const TC = {
  paper: "#f6f1e6",
  card: "#fffcf5",
  sunk: "#ece5d6",
  ink: "#1a1712",
  ink2: "#4e483e",
  ink3: "#6f6758",
  line: "#ddd3bf",
  /** Brand highlight and the SEO score. Read through a variable so Daddy mode can turn it gold. */
  lime: "var(--toc-lime)",
  limeHex: "#d6ff3d",
  /** The AI-search score. */
  ai: "#7148e8",
  /** The AI-agent score. */
  agent: "#0b7f86",
  crit: "#cf3a1d",
  warn: "#9a5b00",
  /** Notices, and the Speed ring. */
  note: "#2c5bc9",
  good: "#1b7a39",
  /** Daddy mode's gold — the app swaps lime for this. */
  gold: "#ffc83d",
  // The app's dark-mode tokens, used for the ink bands.
  night: "#12110e",
  night2: "#1b1915",
  night3: "#26231d",
  nightLine: "#36322b",
  cream: "#f3eee2",
  cream2: "#c7bfae",
  cream3: "#9a917f",
  aiLight: "#b49bff",
  agentLight: "#4fd4d0",
  critLight: "#ff7c5c",
  goodLight: "#63d68e",
} as const;

export const LINKS = {
  live: "https://thatonecrawler.houseofnamus.com",
  v1: "https://crawldaddy.houseofnamus.com",
} as const;

export type Shot = { src: string; alt: string; w: number; h: number };
const desk = (name: string, alt: string): Shot => ({ src: `/that-one-crawler/${name}.webp`, alt, w: 1440, h: 900 });

export const IMG = {
  hero: desk("landing", "That One Crawler’s landing page: the headline “Your blog has issues. This free SEO audit finds every single one.”, the URL form and the spider mascot"),
  progress: desk("scanning", "A scan of wordpress.org/news in progress: 15 of 25 pages read, a lime progress bar with a small spider walking it, and the verdict filling in below with the AI-agents ring still checking"),
  verdict: desk("report-four-rings", "The finished report for wordpress.org/news: four rings — SEO 85, AI search 54, AI agents 94 and Speed 71 — the verdict “Honestly? Annoyingly good.” and a “Prompt to improve (37)” button"),
  pages: desk("report-pages-table", "The report’s Pages tab: 25 pages, each with a score, its issues as coloured chips, a status code and its title"),
  links: desk("report-links-tab", "The report’s Links tab: one broken external link with the page it was found on, 80 sites that refused bots counted apart, no orphan or buried pages, and the most-linked pages"),
  speed: desk("report-speed", "The report’s Speed tab: four Lighthouse rings averaged over 25 pages, real-user Core Web Vitals marked failed, and the audits that failed most often with their savings"),
  agents: desk("report-agents", "The report’s AI agents tab for wordpress.org/news: 94 out of 100, “Agent-ready”, essentials 6 of 7, recommended 8 of 10, bonus +3, and each check with the evidence behind it"),
  prompt: {
    src: "/that-one-crawler/prompt-dialog.webp",
    alt: "The Prompt to improve dialog: 37 findings with the 18 recommended ones selected, each with its evidence from the scan, and buttons to preview, download as .md or copy the prompt",
    w: 760,
    h: 868,
  } as Shot,
  meta: desk("meta-tags", "The meta tag checker on a WordPress release post: the tag inspector beside a Google preview, with the 65-character title measured at about 641px against Google’s 600px, and the social share card"),
  geo: desk("geo-aeo", "The GEO and AEO checker on a WordPress news post: a violet ring at 61, the verdict “Almost quotable”, the readiness checklist and what it found on the page"),
  geoSelf: desk("geo-own-guide", "The GEO and AEO checker run on That One Crawler’s own keyword cannibalization guide: 100 out of 100, “Ready to be quoted”, passing seven of seven checks"),
  agentTool: desk("agent-checker", "The AI agent readiness checker run on That One Crawler’s own site: 100 out of 100, essentials 7 of 7, recommended 10 of 10, bonus +5"),
  speedTest: desk("speed-test", "The page speed test on wordpress.org/news: mobile 72 and desktop 92, real-user Core Web Vitals passed, four Lighthouse rings, lab metrics and the final screenshot"),
  guide: desk("guide-cannibalization", "One of the 32 guides, on keyword cannibalization: a direct answer under the headline, a byline, and an “On this page” sidebar"),
  broken: desk("broken-link-checker", "The broken link checker after 25 pages: 400 links and images tested, 3 broken, 60 sites that refused bots counted separately, 0 heavy images, and each broken link with the page it was found on"),
  ai: {
    src: "/that-one-crawler/ai-tools-drawer.webp",
    alt: "The AI tools tab in a page’s drawer: a 59-character title rewrite shown as a word diff, a new meta description, the Google preview, three fixes, and the guard’s warning “Numbers not found in your page: 50, 60”, via Groq",
    w: 672,
    h: 900,
  } as Shot,
  v1: {
    src: "/product-images/crawl daddy.webp",
    alt: "Crawl Daddy, version one: a blue glass-style dashboard with a crawl progress bar, an SEO score of 82 and a list of issues found",
    w: 1536,
    h: 864,
  } as Shot,
  og: { src: "/that-one-crawler/og.jpg", alt: "That One Crawler — “Your blog has issues. This free SEO audit finds every single one.” beside its spider mascot", w: 1200, h: 630 },
};

export const HERO = {
  kicker: "V2 · Crawl Daddy, reprised",
  chips: ["53 checks per page", "24 AI-agent checks", "up to 1,000 pages", "no signup", "$0 to host"],
  built: "Product, design and full-stack build · 2026 · Next.js 16 on Vercel’s free tier",
};

/** The app’s own landing marquee — illustrative findings, and labelled as such. */
export const FINDINGS: { tone: "crit" | "warn" | "note"; path: string; text: string }[] = [
  { tone: "crit", path: "/hello-world", text: "Missing H1" },
  { tone: "warn", path: "/about", text: "Title too long (94 chars)" },
  { tone: "warn", path: "/quick-update", text: "41 words. Forty-one." },
  { tone: "crit", path: "/2020-goals", text: "404, much like the goals" },
  { tone: "warn", path: "/gallery", text: "212 images, 0 alt tags" },
  { tone: "crit", path: "/best-post-ever", text: "noindex. Nobody will ever know." },
  { tone: "warn", path: "/sourdough-1 + /sourdough-2", text: "Fighting over the same keyword" },
  { tone: "note", path: "/old-url", text: "4 redirects deep" },
  { tone: "note", path: "/2019-guide", text: "Last updated when phones had buttons" },
];

export const STATS = [
  { value: "53", label: "checks per page", sub: "across 10 categories, each with a guide" },
  { value: "24", label: "AI-agent checks", sub: "per site, each with its evidence" },
  { value: "1,000", label: "pages per scan", sub: "300 by default, newest posts first" },
  { value: "400", label: "links & images", sub: "tested per scan, beyond the pages" },
  { value: "207", label: "unit tests", sub: "including the site’s own copy" },
  { value: "$0", label: "to host", sub: "Vercel Hobby and free API tiers" },
];

/** V1 against V2, row by row. Every V1 line is from legacy/crawl-daddy/README.md. */
export const VERSIONS = [
  { k: "Where it ran", v1: "Replit — republished by hand every 30 days to stay online", v2: "Vercel’s free Hobby plan — every push deploys, nothing to babysit" },
  { k: "The server", v1: "A long-lived Flask server, crawling in background threads", v2: "Small stateless API routes that each finish in seconds" },
  { k: "Who drives the crawl", v1: "The server", v2: "The visitor’s browser — about six pages in flight" },
  { k: "Rendering", v1: "Headless Chromium through Playwright", v2: "No headless browser. JavaScript-only pages are flagged, not rendered" },
  { k: "Scan state", v1: "In memory, one scan at a time behind a lock", v2: "In the visitor’s browser — the last 25 scans in IndexedDB" },
  { k: "Scoring", v1: "An SEO score from a fixed checklist", v2: "An SEO score that follows the issue list, plus AI-search and AI-agent scores" },
  { k: "AI", v1: "Groq and Gemini routes", v2: "Six guarded tasks, every answer checked against the page — and one prompt that hands every fix to a coding agent" },
];

/** The browser calls these; each one is stateless and rate-limited per IP. */
export const ROUTES = [
  { path: "/api/discover", job: "Redirects, robots.txt, sitemap URLs newest first", limit: "20 / min" },
  { path: "/api/agents", job: "The AI-agent audit: about 25 requests to the site, about 15 seconds", limit: "10 / min" },
  { path: "/api/analyze", job: "Fetch and extract up to 10 pages per call", limit: "240 / min" },
  { path: "/api/check-links", job: "HEAD, then GET if it failed — up to 20 URLs", limit: "120 / min" },
  { path: "/api/pagespeed", job: "One PageSpeed Insights run, mobile or desktop", limit: "30 / min" },
  { path: "/api/crux", job: "Real-user speed from the Chrome UX Report", limit: "30 / min" },
  { path: "/api/ai", job: "One AI task, quota-checked", limit: "10 / min + daily quota" },
];

export const SCAN_STEPS = [
  { n: "1", title: "Discover", body: "Follow redirects, read robots.txt, gather sitemap URLs newest first. No sitemap? Follow links from the homepage instead." },
  { n: "2", title: "Check the agents", body: "One call, alongside the crawl: robots.txt, firewall probes as ChatGPT-User and Claude-User, Markdown, llms.txt, a made-up URL. About 15 seconds." },
  { n: "3", title: "Crawl", body: "Two requests at a time, three URLs each — about six pages in flight, up to the chosen limit." },
  { n: "4", title: "Check links", body: "Up to 400 links and images beyond the crawled pages: 35% internal, 40% external, 25% images, with any unused share handed on." },
  { n: "5", title: "Report", body: "Scores, issues and site-wide checks are computed in the browser and saved there. Nothing goes to a database, because there isn’t one." },
];

export type ScoreRow = { pts: string; rule: string; w: number; color?: string };

/** The SEO score since 22 Oct 2026: 100 minus weighted issues. It replaced Crawl Daddy’s checklist. */
export const SEO_SCORE: ScoreRow[] = [
  { pts: "100", rule: "Every page starts here — no issues, full marks", w: 1 },
  { pts: "−30", rule: "Each critical issue", w: 1, color: TC.crit },
  { pts: "−10", rule: "Each warning", w: 10 / 30, color: TC.warn },
  { pts: "−2", rule: "Each notice, at most −10 for all of them together", w: 2 / 30, color: TC.note },
  { pts: "0", rule: "A broken page or a soft 404 — and it still counts in the site average", w: 0 },
];

/** The AI-search score (GEO / AEO). Only the checks that apply to the page count. */
export const AI_SCORE: ScoreRow[] = [
  { pts: "20", rule: "A 20–80 word answer straight after the H1", w: 1 },
  { pts: "20", rule: "Answer paragraphs under two or more headings", w: 1 },
  { pts: "15", rule: "A quarter of H2/H3s phrased as questions", w: 0.75 },
  { pts: "15", rule: "An FAQ section or FAQPage markup", w: 0.75 },
  { pts: "10", rule: "Three or more specific facts and numbers", w: 0.5 },
  { pts: "10", rule: "Lists or tables", w: 0.5 },
  { pts: "10", rule: "An author and a published or modified date", w: 0.5 },
];

/** The AI-agent score: once per site, modelled on what is-agentic.com reports. */
export const AGENT_SCORE: ScoreRow[] = [
  { pts: "60", rule: "Seven essentials share them — can an agent get in and read the site?", w: 1 },
  { pts: "40", rule: "Ten recommended checks share them — can it find its way around?", w: 40 / 60 },
  { pts: "+5", rule: "Seven bonus signals add up to +5 on top — never a penalty, and the total stops at 100", w: 5 / 60 },
];

export const CHECK_CATEGORIES = [
  { name: "Indexing", n: 10 },
  { name: "Search appearance", n: 10 },
  { name: "Content", n: 10 },
  { name: "Links", n: 5 },
  { name: "Keywords", n: 4 },
  { name: "Structured data", n: 3 },
  { name: "AI search", n: 4 },
  { name: "Performance", n: 3 },
  { name: "Security", n: 1 },
  { name: "Brand rules", n: 3 },
];

/** The 24 agent checks, by tier — from the product's PROJECT_BIBLE §7. */
export const AGENT_TIERS = [
  {
    tier: "Essential",
    pts: "60 points",
    checks: [
      "AI agents allowed in robots.txt",
      "No firewall wall for AI agents",
      "Content works without JavaScript",
      "Readable without signing in",
      "Redirects resolve cleanly",
      "Missing pages return 404",
      "Homepage not hidden from search",
    ],
  },
  {
    tier: "Recommended",
    pts: "40 points",
    checks: [
      "A sitemap",
      "llms.txt",
      "Markdown for agents, with Vary: Accept",
      "Structured identity",
      "Complete metadata",
      "About, Contact and Privacy linked",
      "Fits an agent’s context",
      "Accessible page structure",
      "Buttons and links have names",
      "No hidden AI instructions",
    ],
  },
  {
    tier: "Bonus",
    pts: "up to +5",
    checks: [
      "llms-full.txt",
      ".md twins of pages",
      "Link headers",
      "Well-known discovery files",
      "Sitemap lastmod coverage",
      "sameAs links",
      "llms.txt links that work",
    ],
  },
];

export const AGENT_RULES = [
  {
    title: "It knocks like the real agents",
    body: "The homepage is loaded as ChatGPT-User, OAI-SearchBot, Claude-User and PerplexityBot to catch a firewall that walls them out — each request signed “agent-readiness check by ThatOneCrawler”, so a site owner can tell it was a test.",
  },
  {
    title: "A busy site isn’t a firewall",
    body: "A probe that times out is tried again, then left out of the score instead of counted as a block. Counting timeouts produced false fails.",
  },
  {
    title: "Evidence, not a verdict",
    body: "Every result says what was seen: the status code, the header, the file size, the page sampled. Training crawlers like GPTBot are reported, never scored.",
  },
];

export const PROMPT_POINTS = [
  "Every finding — issues, failed agent checks, failed PageSpeed audits — in priority order, each with why it matters, up to 20 lines of evidence from the scan, and the fix.",
  "“Recommended” pre-selects the critical issues, the warnings, the agent gaps that aren’t bonus and the PageSpeed audits worth 300 ms or more.",
  "It ends with fixed rules for the agent: inspect the code first, fix shared templates, 301 any changed URL, never invent facts, add tests, verify in the served HTML.",
  "It’s built from the scan by code, not written by a model — so the evidence is real and it costs no AI quota.",
];

export const AI_TASKS = [
  { task: "Title & meta", size: "short", first: "Groq" },
  { task: "Question headings", size: "short", first: "Groq" },
  { task: "Action plan", size: "short", first: "Groq" },
  { task: "Quick-answer intro", size: "long", first: "Gemini" },
  { task: "Section rewrite", size: "long", first: "Gemini" },
  { task: "FAQ + JSON-LD", size: "long", first: "Gemini" },
];

export const GUARDS = [
  {
    title: "Page text is fenced",
    body: "Everything taken from a page is wrapped in marked blocks the model is told to treat as data, with any fake fence markers inside it neutralised. A page that tries to instruct an AI gets its own issue in the report.",
  },
  {
    title: "Invented facts are flagged",
    body: "Numbers, links and email addresses in an answer that don’t appear in the source are caught and named. When nothing is, the visitor sees “✓ Fact check passed”.",
  },
  {
    title: "Markup is built by code",
    body: "The FAQ generator writes questions and answers. The FAQPage JSON-LD around them is assembled by the app, never by the model.",
  },
  {
    title: "Only successes count",
    body: "20 free actions per visitor per day, counted by a signed HttpOnly cookie and a per-IP counter. A failed action costs nothing. After the limit, visitors can paste their own free Gemini key, which stays in their browser.",
  },
];

export type ToolTone = "lime" | "ai" | "agent" | "note" | "ink" | "paper";
export const TOOLS: { name: string; mode: string; body: string; shot: "meta" | "geo" | "agentTool" | "speedTest" | "broken" | null; tone: ToolTone }[] = [
  {
    name: "Meta tag checker",
    mode: "One page",
    body: "Every tag search engines and social apps read, each marked good, warning or missing — conflicting canonicals included — beside a Google preview measured in pixels and the card a share would show.",
    shot: "meta",
    tone: "lime",
  },
  {
    name: "GEO & AEO checker",
    mode: "One page",
    body: "The violet ring on its own: the seven-point checklist, with items that don’t fit the page marked “doesn’t apply”, the signals it found, and any text aimed at AI assistants, hidden or visible.",
    shot: "geo",
    tone: "ai",
  },
  {
    name: "AI agent readiness checker",
    mode: "Whole site · seconds",
    body: "The 24-check agent audit on its own: robots.txt for six AI agents, firewall probes, Markdown, llms.txt, real 404s, identity and trust pages. Shown here on That One Crawler’s own site.",
    shot: "agentTool",
    tone: "agent",
  },
  {
    name: "Page speed test",
    mode: "One page",
    body: "PageSpeed Insights on mobile and desktop at once: real-user Core Web Vitals with the pass or fail verdict, the four Lighthouse scores, lab metrics, and every failed audit with its savings and files.",
    shot: "speedTest",
    tone: "note",
  },
  {
    name: "Broken link checker",
    mode: "Site crawl",
    body: "Broken, refused-bots, errors and heavy images, each with the pages it was found on and a plain-words cause where the status code isn’t enough. Sites that refuse bots never inflate the broken count.",
    shot: "broken",
    tone: "ink",
  },
  {
    name: "Keyword cannibalization checker",
    mode: "Site crawl",
    body: "Pages competing for the same main keyword, grouped, with the strongest one marked to keep — best score, then most internal links, then most words.",
    shot: null,
    tone: "paper",
  },
];

/** A cannibalization group, drawn — the shape of the real output, with illustrative pages. */
export const CANNIBAL_DEMO = {
  keyword: "sourdough starter",
  pages: [
    { path: "/sourdough-starter-guide", score: 85, links: 14, keep: true },
    { path: "/my-first-sourdough", score: 70, links: 3, keep: false },
    { path: "/sourdough-starter-2", score: 55, links: 1, keep: false },
  ],
};

export const KEYWORD_RULES = [
  "Every keyword is a phrase that really occurs on the page. No search volumes are invented.",
  "Plurals match: “broken links” counts toward “broken link” — but phrases are always shown as written, so “this site” never turns into “thi site”.",
  "Version numbers stay whole — “WordPress 7.1.2” is one phrase, and a slug’s 7-1-2 is read as 7.1.2. Dates aren’t keywords at all.",
  "Specific beats generic: “broken link checker” wins over “broken link” when the title, H1 and body all use it.",
  "Boilerplate can’t win: a phrase on more than 40% of a site’s pages — the blog’s name, “read more” — is nobody’s main keyword.",
];

export const NOTES = [
  {
    n: "01",
    title: "A score that didn’t move with the problems",
    constraint:
      "V2 first kept Crawl Daddy’s fixed checklist: 20 points for an H1, 20 for 900 words or more. It docked half the content points from any page under 900 words and a full 15 for a 61-character title. A site that Lighthouse and is-agentic.com rate near-perfect scored in the low 80s.",
    resolution:
      "Since 22 October 2026 the score starts at 100 and loses 30 per critical issue, 10 per warning and 2 per notice, at most 10 for notices. A page with no issues scores 100; a broken page scores 0 and pulls the average down. Old saved scans are re-scored when they load, so the history still compares like with like.",
    quote: "The number has to follow the issue list.",
  },
  {
    n: "02",
    title: "A checker that cried wolf",
    constraint:
      "Run against a real portfolio site, the first version raised findings a careful reviewer wouldn’t: “hidden AI instructions” that were only prose about system prompts, 76 of 76 pages flagged for unsized images that were really Next.js fill images, and “thi site” offered as a keyword.",
    resolution:
      "An instruction now needs a command addressed to a model, and code samples and quotations are skipped, while hidden text is still checked strictly. An absolutely positioned image counts as sized, as Lighthouse treats it. Stemming is used for matching only. Every one of those false positives is now a regression test.",
    quote: "A false alarm costs the reader’s trust, not just their time.",
  },
  {
    n: "03",
    title: "A HEAD request that lies",
    constraint:
      "Link checkers send HEAD to save bandwidth. Some servers answer every HEAD with a 404 while the page itself works fine — bsky.app is one. On a test blog that made 24 of 25 pages look like they carried broken links.",
    resolution:
      "Any failed HEAD is now confirmed with a tiny GET before anything is called broken, and 401, 403, 429, 999 and their kin are filed as “refused bots”, not broken. The same test blog went from 24 flagged pages to 1.",
    quote: "A broken-link report you can’t trust is worse than no report.",
  },
  {
    n: "04",
    title: "Google cuts titles in pixels, not characters",
    constraint:
      "“Keep titles under 60 characters” is a proxy. Google truncates at roughly 600 pixels, so a title of wide letters gets cut early and a title of narrow ones survives past 60.",
    resolution:
      "The preview measures each title with canvas text metrics, and the “too long” check uses Arial’s widths against that limit, so 70 narrow characters pass and 40 wide ones don’t. In the meta tag checker shot above, a 65-character WordPress title measures about 641px — over, and cut off exactly where Google would cut it.",
    quote: "The preview measures what Google measures.",
  },
  {
    n: "05",
    title: "A crawler anyone can point anywhere",
    constraint:
      "The form takes any URL from anyone. Without care, that is a way to make the server fetch its own internal network, follow a redirect somewhere it shouldn’t, or drain the free API quotas.",
    resolution:
      "The fetcher refuses private and internal addresses, follows at most five redirects by hand and re-checks every hop, never leaves the site being scanned, and stops at 15 seconds or 3 MB. Every API route that does real work is rate-limited per IP.",
    quote: "Anyone can paste any URL. That is the threat model.",
  },
];

export const OWN_AUDIT = [
  { label: "SEO", value: 100 },
  { label: "AI search", value: 95 },
  { label: "AI agents", value: 100 },
];

export const SELF_PROOF = [
  "Every title is 30–60 characters and every description 120–160, unique across the site — enforced by tests.",
  "Every guide and tool page opens with a 35–70 word direct answer, also tested.",
  "A JSON-LD graph on every page, with nothing in the markup that isn’t also on the page.",
  "A Markdown twin of every content page, at /page.md and on Accept: text/markdown, sent with Vary: Accept.",
  "llms.txt with a key-facts block, llms-full.txt, a 45-URL sitemap, and a robots.txt that names 19 AI agents.",
  "About, Contact and Privacy pages in every footer, and a real 404 for any guide that doesn’t exist.",
  "Step numbers and FAQ badges are CSS-only, so every heading reads exactly as written — to search engines, to AI, and to its own crawler.",
];

export const QUIRKS = [
  { icon: "👀", title: "Eyes on the cursor", body: "The spider’s pupils follow the pointer, and it blinks at slightly random intervals so a page full of spiders never blinks in sync." },
  { icon: "🫳", title: "It hates being poked", body: "Poke it and it squishes and talks back. Its mood follows your score: cool, happy, smirk, meh, shocked." },
  { icon: "😎", title: "Daddy mode", body: "The Konami code — or ten pokes — swaps lime for gold and puts the shades on. A nod to Crawl Daddy." },
  { icon: "🎉", title: "Small rewards", body: "Confetti for a score of 85 or more. Leave the tab and its title reads “👀 Psst… your blog still has issues”." },
];

export const LIMITS = [
  { title: "No search volumes", body: "Keywords come from the pages themselves, and the tool says so. It never invents a volume." },
  { title: "Your data, your browser", body: "No accounts, no shared report links, no scheduled emails — all three need a database. A “Time for a rescan?” nudge after 7 days and a downloadable HTML report stand in." },
  { title: "No headless browser", body: "Pages that only render with JavaScript are flagged rather than rendered. A browser per scan doesn’t fit a free serverless plan." },
  { title: "The quota is good enough, not airtight", body: "Clearing cookies resets the cookie count, and the per-IP counter lives in one serverless instance and resets when it restarts." },
];

export const POSTSCRIPTS = [
  "Dropping Crawl Daddy’s formula means V1 and V2 scores no longer compare. That was the price of a number that follows real problems; inside V2, old scans are re-scored so its own history still does.",
  "The AI rewrite captured on this page came back with a warning: “Numbers not found in your page: 50, 60.” They came from the model’s own advice — trim the title to 50–60 characters — not from an invented fact. The guard flags them anyway; checking is cheaper than trusting.",
  "A model the router depended on was retired by its provider in 2026. The router fell back to working defaults instead of breaking.",
  "The “Reviews from the crawled” on its landing page are labelled as fiction, because they are.",
];

export const STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS 4",
  "cheerio",
  "Vercel Hobby",
  "Groq",
  "Gemini",
  "PageSpeed Insights API",
  "Chrome UX Report API",
  "IndexedDB",
  "Vitest",
];
