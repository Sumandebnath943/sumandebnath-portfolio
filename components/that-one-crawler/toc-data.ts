/**
 * That One Crawler — every word and number on /crawlers/that-one-crawler.
 *
 * Source of truth is the product's own repo (read-only, D:\project\ThatOneCrawler):
 * docs/PORTFOLIO_HANDOFF.md for the story and the figures, docs/PROJECT_BIBLE.md
 * for the scoring tables, the routes and the guardrails. Re-read those before
 * changing a number here; nothing on this page is allowed to be rounded up.
 *
 * Screenshots were captured from the live app on 22 Oct 2026 (light mode,
 * 1440×900), not copied from the repo, which holds none.
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
  /** The AI-readiness score. */
  ai: "#7148e8",
  crit: "#cf3a1d",
  warn: "#9a5b00",
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
  hero: desk("hero", "That One Crawler’s landing page: the headline “Your blog has issues. This free SEO audit finds every single one.”, the URL form and the spider mascot"),
  progress: desk("scan-progress", "A scan of wordpress.org/news in progress: 15 of 25 pages read, a lime progress bar with a small spider walking it, and the verdict filling in below"),
  verdict: desk("report-verdict", "The finished report for wordpress.org/news: an SEO ring at 62, an AI-readiness ring at 54, the verdict “B-minus energy. Very fixable, though.” and the issue overview"),
  pages: desk("report-pages", "The report’s Pages tab: 25 pages, each with a score, its issues as coloured chips, a status code and its title"),
  links: desk("report-links", "The report’s Links tab: one broken external link with the page it was found on, no orphan or buried pages, and the most-linked pages"),
  meta: desk("meta-tag-checker", "The meta tag checker on a WordPress release post: the tag inspector beside a Google preview measured at 641px of 600px, and the social share card"),
  geo: desk("geo-checker", "The GEO and AEO checker on a WordPress news post: a violet AI-readiness ring at 53, the verdict “Hard to quote”, and the readiness checklist"),
  geoSelf: desk("geo-self", "The GEO and AEO checker run on That One Crawler’s own keyword cannibalization guide: 90 out of 100, “Ready to be quoted”, passing six of seven checks"),
  guide: desk("guide", "One of the 30 guides, on keyword cannibalization: a direct answer under the headline, a byline, and an “On this page” sidebar"),
  broken: desk("broken-links", "The broken link checker after 25 pages: 373 links and images tested, 1 broken, 116 sites that refused bots counted separately, and 0 heavy images"),
  ai: {
    src: "/that-one-crawler/ai-rewrite.webp",
    alt: "The AI tools tab in a page’s drawer: a title rewrite shown as a word diff, a new meta description, the Google preview, three fixes, and “Fact check passed: no invented numbers or links”, via Groq",
    w: 670,
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
  chips: ["47 checks per page", "2 scores per page", "up to 1,000 pages", "no signup", "$0 to host"],
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
  { value: "47", label: "checks per page", sub: "across 9 categories, each with a guide" },
  { value: "1,000", label: "pages per scan", sub: "300 by default, newest posts first" },
  { value: "400", label: "links & images", sub: "tested per scan, beyond the pages" },
  { value: "6", label: "AI writing tasks", sub: "20 free a day, fact-checked" },
  { value: "143", label: "unit tests", sub: "including the site’s own copy" },
  { value: "$0", label: "to host", sub: "Vercel Hobby and free API tiers" },
];

/** V1 against V2, row by row. Every V1 line is from legacy/crawl-daddy/README.md. */
export const VERSIONS = [
  { k: "Where it ran", v1: "Replit — republished by hand every 30 days to stay online", v2: "Vercel’s free Hobby plan — every push deploys, nothing to babysit" },
  { k: "The server", v1: "A long-lived Flask server, crawling in background threads", v2: "Small stateless API routes that each finish in seconds" },
  { k: "Who drives the crawl", v1: "The server", v2: "The visitor’s browser — about six pages in flight" },
  { k: "Rendering", v1: "Headless Chromium through Playwright", v2: "No headless browser. JavaScript-only pages are flagged, not rendered" },
  { k: "Scan state", v1: "In memory, one scan at a time behind a lock", v2: "In the visitor’s browser — the last 25 scans in IndexedDB" },
  { k: "Scoring", v1: "An SEO score out of 100", v2: "The same SEO formula, so old and new scores compare — plus an AI-readiness score" },
  { k: "AI", v1: "Groq and Gemini routes", v2: "Six guarded tasks, every answer checked against the page" },
];

/** The browser calls these; each one is stateless and rate-limited per IP. */
export const ROUTES = [
  { path: "/api/discover", job: "Redirects, robots.txt, sitemap URLs newest first", limit: "20 / min" },
  { path: "/api/analyze", job: "Fetch and extract up to 10 pages per call", limit: "240 / min" },
  { path: "/api/check-links", job: "HEAD, then GET if it failed — up to 20 URLs", limit: "120 / min" },
  { path: "/api/pagespeed", job: "One PageSpeed Insights run", limit: "30 / min" },
  { path: "/api/crux", job: "Real-user speed from the Chrome UX Report", limit: "30 / min" },
  { path: "/api/ai", job: "One AI task, quota-checked", limit: "10 / min + daily quota" },
];

export const SCAN_STEPS = [
  { n: "1", title: "Discover", body: "Follow redirects, read robots.txt, gather sitemap URLs newest first. No sitemap? Follow links from the homepage instead." },
  { n: "2", title: "Crawl", body: "Two requests at a time, three URLs each — about six pages in flight, up to the chosen limit." },
  { n: "3", title: "Check links", body: "Up to 400 links and images beyond the crawled pages: 35% internal, 40% external, 25% images." },
  { n: "4", title: "Report", body: "Scores, issues and site-wide checks are computed in the browser and saved there. Nothing goes to a database, because there isn’t one." },
];

/** The SEO score — deliberately identical to Crawl Daddy’s formula. */
export const SEO_SCORE = [
  { pts: 20, rule: "Has an H1" },
  { pts: 15, rule: "Title is 30–60 characters" },
  { pts: 15, rule: "Meta description is 120–160 characters" },
  { pts: 20, rule: "900+ words (10 for 300–899)" },
  { pts: 10, rule: "Has a canonical tag" },
  { pts: 5, rule: "Has an Open Graph title" },
  { pts: 5, rule: "No images missing alt text" },
  { pts: 10, rule: "Has structured data" },
];

/** The AI-readiness score (GEO / AEO) — new in V2. */
export const AI_SCORE = [
  { pts: 20, rule: "A 20–80 word answer straight after the H1" },
  { pts: 20, rule: "Answer paragraphs under two or more headings" },
  { pts: 15, rule: "A quarter of H2/H3s phrased as questions" },
  { pts: 15, rule: "An FAQ section or FAQPage markup" },
  { pts: 10, rule: "Three or more specific facts and numbers" },
  { pts: 10, rule: "Lists or tables" },
  { pts: 10, rule: "An author and a published or modified date" },
];

export const CHECK_CATEGORIES = [
  { name: "Indexing", n: 7 },
  { name: "Search appearance", n: 10 },
  { name: "Content", n: 10 },
  { name: "Links", n: 4 },
  { name: "Keywords", n: 4 },
  { name: "Structured data", n: 3 },
  { name: "AI search", n: 3 },
  { name: "Performance", n: 3 },
  { name: "Brand rules", n: 3 },
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

export const TOOLS = [
  {
    name: "Meta tag checker",
    mode: "One page",
    body: "Every tag search engines and social apps read, each marked good, warning or missing — beside a Google preview measured in pixels and the card a share would show.",
    shot: "meta" as const,
    tone: "lime" as const,
  },
  {
    name: "GEO & AEO checker",
    mode: "One page",
    body: "The violet ring on its own: the seven-point readiness checklist, the signals it found, and a warning if the page carries text aimed at AI assistants.",
    shot: "geo" as const,
    tone: "ai" as const,
  },
  {
    name: "Broken link checker",
    mode: "Site crawl",
    body: "Broken, refused-bots, errors and heavy images, each with the pages it was found on. Sites that refuse bots are listed apart, so they never inflate the broken count.",
    shot: "broken" as const,
    tone: "ink" as const,
  },
  {
    name: "Keyword cannibalization checker",
    mode: "Site crawl",
    body: "Pages competing for the same main keyword, grouped, with the strongest one marked to keep — best score, then most internal links, then most words.",
    shot: null,
    tone: "paper" as const,
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
  "Plurals match: “broken links” counts toward “broken link”.",
  "Version numbers stay whole — “WordPress 7.1.2” is one phrase, and a slug’s 7-1-2 is read as 7.1.2.",
  "Specific beats generic: “broken link checker” wins over “broken link” when the title, H1 and body all use it.",
  "Boilerplate can’t win: a phrase on more than 40% of a site’s pages — the blog’s name, “read more” — is nobody’s main keyword.",
];

export const NOTES = [
  {
    n: "01",
    title: "A HEAD request that lies",
    constraint:
      "Link checkers send HEAD to save bandwidth. Some servers answer every HEAD with a 404 while the page itself works fine — bsky.app is one. On a test blog that made 24 of 25 pages look like they carried broken links.",
    resolution:
      "Any failed HEAD is now confirmed with a tiny GET before anything is called broken, and 401, 403, 429, 999 and their kin are filed as “refused bots”, not broken. The same test blog went from 24 flagged pages to 1.",
    quote: "A broken-link report you can’t trust is worse than no report.",
  },
  {
    n: "02",
    title: "Google cuts titles in pixels, not characters",
    constraint:
      "“Keep titles under 60 characters” is a proxy. Google truncates at roughly 600 pixels, so a title of wide letters gets cut early and a title of narrow ones survives past 60.",
    resolution:
      "The preview measures each title with canvas text metrics against that limit. In the meta tag checker shot above, a 65-character WordPress title measures 641px — over by 41, and shown cut off exactly where Google would cut it.",
    quote: "The preview measures what Google measures.",
  },
  {
    n: "03",
    title: "A crawler anyone can point anywhere",
    constraint:
      "The form takes any URL from anyone. Without care, that is a way to make the server fetch its own internal network, follow a redirect somewhere it shouldn’t, or drain the free API quotas.",
    resolution:
      "The fetcher refuses private and internal addresses, follows at most five redirects by hand and re-checks every hop, never leaves the site being scanned, and stops at 15 seconds or 3 MB. Every API route that does real work is rate-limited per IP.",
    quote: "Anyone can paste any URL. That is the threat model.",
  },
  {
    n: "04",
    title: "Decorations stay out of the text",
    constraint:
      "A tool that audits headings has headings of its own. A step number or an FAQ “Q” badge written as real text becomes part of the heading — and the crawler, this one included, reads “QHow do I…?”.",
    resolution:
      "Step numbers, the FAQ badge and heading anchors are all CSS pseudo-elements. Headings read exactly as written, to search engines, to AI tools and to the app’s own self-audit.",
    quote: "A crawler reads the heading you wrote, not the one you designed.",
  },
];

export const OWN_AUDIT = [
  { label: "SEO", value: 91 },
  { label: "AI readiness", value: 93 },
];

export const SELF_PROOF = [
  "Every title is 30–60 characters and every description 120–160, unique across the site — enforced by tests.",
  "Every guide and tool page opens with a 35–70 word direct answer, also tested.",
  "A JSON-LD graph on every page, with nothing in the markup that isn’t also on the page.",
  "llms.txt, llms-full.txt, a 38-URL sitemap, and a robots.txt that names the AI crawlers it welcomes.",
  "Unknown guide URLs return a real 404, not a soft one.",
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
  "The guides score 90, not 100. The SEO formula only gives full content marks at 900 words, and it was kept identical to Crawl Daddy’s on purpose so old and new scores still compare.",
  "Titles that come back over 60 characters get one follow-up call to shorten them. The rewrite captured on this page still landed at 61 — and the card says so in its own label, “61 chars, aim for 30–60”, instead of hiding it.",
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
