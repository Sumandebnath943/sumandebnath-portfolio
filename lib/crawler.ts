// Crawler detection, shared by the proxy and the endpoint that logs them.
//
// This exists because the visitor notifier can only see visitors that run
// JavaScript. A link preview — LinkedIn building a card for a résumé you just
// sent, Slack unfurling a URL, Google indexing a page — fetches the HTML and
// never executes anything, so it leaves no trace at all in that system.
//
// Deliberately separate from the notifier's own isBot(). That one decides
// whether a beacon deserves a visitor alert; this one decides whether a page
// request deserves a crawler alert. Same idea, different questions, and keeping
// them apart means changing one cannot quietly alter the other.
//
// ── Why the labels are per-agent and not per-company ──────────────────────────
//
// The first version collapsed every Anthropic agent to "Anthropic" and every
// OpenAI one to "OpenAI". That throws away the only thing the alert is for.
// These three mean completely different things:
//
//   ClaudeBot         — a training crawl. Says nothing about being findable.
//   Claude-SearchBot  — indexing for Claude's search. This is the one that
//                       decides whether Claude can cite you at all.
//   Claude-User       — somebody asked Claude about you *right now* and it went
//                       and fetched the page.
//
// Worse, `Claude-User` matched nothing at all in the first version — not the
// Anthropic pattern, and not the generic one either, since the string contains
// no "bot", "crawler" or "fetcher". It returned null, so no row and no alert.
// Every Claude-User visit this site has ever had was silently discarded.

/**
 * Recognisable agents, **most specific first** — the first match wins, so a
 * narrow pattern must sit above the broad one for the same vendor.
 */
const KNOWN: [RegExp, string][] = [
  // ── OpenAI ────────────────────────────────────────────────────────────────
  [/chatgpt-user/i, "OpenAI · ChatGPT live fetch"],
  [/oai-searchbot/i, "OpenAI · search index"],
  [/gptbot/i, "OpenAI · training crawl"],

  // ── Anthropic ─────────────────────────────────────────────────────────────
  [/claude-user/i, "Anthropic · Claude live fetch"],
  [/claude-searchbot/i, "Anthropic · search index"],
  [/claudebot/i, "Anthropic · training crawl"],
  [/claude-web|anthropic-ai/i, "Anthropic · legacy agent"],

  // ── Google ────────────────────────────────────────────────────────────────
  [/google-inspectiontool/i, "Google Search Console"],
  [/googleother/i, "Google · other"],
  [/googlebot-image/i, "Google Images"],
  [/googlebot/i, "Google · search index"],
  // Never appears as a live user agent — it is a robots.txt control token only.
  // Kept so that if one ever does show up, it is labelled rather than mystery.
  [/google-extended/i, "Google · AI grounding token"],

  // ── Microsoft / Bing ──────────────────────────────────────────────────────
  [/bingbot|bingpreview|microsoftpreview/i, "Bing · search index"],

  // ── Perplexity ────────────────────────────────────────────────────────────
  [/perplexity-user/i, "Perplexity · live fetch"],
  [/perplexitybot/i, "Perplexity · index"],

  // ── Other answer engines ──────────────────────────────────────────────────
  [/duckassistbot/i, "DuckDuckGo · DuckAssist"],
  [/duckduckbot/i, "DuckDuckGo · search"],
  [/mistralai-user/i, "Mistral · live fetch"],
  [/youbot/i, "You.com"],
  [/cohere-ai|cohere-training-data-crawler/i, "Cohere"],
  [/ai2bot/i, "Allen Institute"],
  [/pangubot/i, "Huawei PanGu"],
  [/timpibot/i, "Timpi"],
  [/diffbot/i, "Diffbot"],
  [/amazonbot/i, "Amazon"],
  [/applebot-extended/i, "Apple · AI training"],
  [/applebot/i, "Apple · Siri / Spotlight"],
  [/meta-externalfetcher/i, "Meta · live fetch"],
  [/meta-externalagent/i, "Meta · training crawl"],
  [/bytespider/i, "ByteDance"],
  [/ccbot/i, "Common Crawl"],

  // ── Unconfirmed patterns ──────────────────────────────────────────────────
  // xAI and Brave do not publish stable user-agent strings the way OpenAI and
  // Anthropic do, so these two are pattern guesses rather than documented
  // values. They are deliberately narrow: almost nothing legitimate carries
  // "grok" or "xai" as a token, and Brave's crawler identifies itself with
  // "Brave" somewhere in the string. If one of these ever fires, capture the
  // raw UA from the alert and replace the guess with the real thing.
  [/\bgrok\b|\bxai[-\s]?bot\b|\bxai\b/i, "xAI / Grok (unconfirmed pattern)"],
  [/bravebot|brave[-\s]?search/i, "Brave Search (unconfirmed pattern)"],

  // ── Social unfurlers ──────────────────────────────────────────────────────
  [/linkedinbot/i, "LinkedIn"],
  [/slackbot|slack-imgproxy/i, "Slack"],
  [/whatsapp/i, "WhatsApp"],
  [/telegrambot/i, "Telegram"],
  [/twitterbot/i, "X / Twitter"],
  [/facebookexternalhit|facebookcatalog/i, "Facebook"],
  [/discordbot/i, "Discord"],

  // ── Everything else ───────────────────────────────────────────────────────
  [/yandex/i, "Yandex"],
  [/baiduspider/i, "Baidu"],
  [/seznambot/i, "Seznam"],
  [/naver|yeti/i, "Naver"],
  [/ahrefsbot|semrushbot|mj12bot|dotbot|petalbot/i, "SEO crawler"],
  [/screaming frog|lighthouse|pagespeed|gtmetrix/i, "Site auditor"],
  [/curl|wget|python-requests|go-http|axios|httpclient|okhttp/i, "Script"],
  [/headless|puppeteer|playwright|phantom/i, "Headless browser"],
];

const GENERIC = /bot\b|crawler|crawl|spider|slurp|scraper|preview|fetcher|monitor|validator/i;

/** The crawler's name if this looks automated, otherwise null. */
export function identifyCrawler(ua: string): string | null {
  if (!ua) return "Unknown (no user agent)";
  for (const [re, name] of KNOWN) if (re.test(ua)) return name;
  if (GENERIC.test(ua)) return "Unidentified crawler";
  return null;
}

/**
 * Only real pages are worth an alert. A crawler fetching the OG image or a font
 * alongside the page would otherwise turn one visit into several messages.
 *
 * `/llms.txt` and `/llms-full.txt` are deliberately NOT excluded despite being
 * files: an agent fetching those is the single most interesting arrival this
 * site can log, because it means something is reading the AI context deliberately
 * rather than crawling a page by accident.
 */
export function isPageRequest(pathname: string): boolean {
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) return false;
  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") return false;
  if (pathname === "/llms.txt" || pathname === "/llms-full.txt") return true;
  // Anything else with a file extension is an asset, not a page.
  return !/\.[a-z0-9]{2,5}$/i.test(pathname);
}

// ── Did anything actually get served? ────────────────────────────────────────
//
// The alert used to say "fetched a page" for every arrival, because that is all
// the proxy could know. It runs *before* routes are resolved — that is the whole
// point of the file, and the Next docs are explicit that a proxy cannot see the
// downstream response — so a request for /.git/HEAD and a request for /resume
// were reported in identical language. Two probes that got a 404 read exactly
// like two successful fetches.
//
// So the path is classified here instead. Two independent questions, because
// they fail in opposite directions and must not be collapsed:
//
//   known  — does this match the shape of a real route? Errs toward "yes". A
//            mistyped notebook slug is reported as a page, which is a shrug.
//            A real page reported as a 404 would be a lie, so the route list
//            below is exact and the slug families are shapes, not lookups.
//   probe  — is this a recognised attack target? Errs toward "no". Nothing on
//            this site begins with a dot or mentions wp-admin, so a hit here
//            is never ambiguous.
//
// Resolving real slugs would mean importing lib/notebook and lib/projects into
// the proxy's bundle to answer a question worth one word in a Telegram message.
// Shapes are the right trade.

/** Every static public route. /desk-4f7a is absent on purpose — the proxy
 *  branches on it long before this runs. Add a page, add it here.
 *
 *  Exported only so `scripts/crawler-check.mjs` can walk app/ and refuse to let
 *  this drift; nothing at runtime reads it directly. */
export const STATIC_ROUTES = new Set([
  "/",
  "/about",
  "/agents/migi",
  "/agents/pact-agent",
  "/agents/pentashell",
  "/apps/forget-anything",
  "/apps/migi-app",
  "/banking/rm-copilot",
  "/contact",
  "/faq",
  "/fun-apps",
  "/games/pixelville",
  "/journey",
  "/learnings",
  "/llms/qdex-1.5b",
  "/notebook",
  "/notebook/all",
  "/philosophy",
  "/privacy",
  "/profile",
  "/projects",
  "/projects/aegis-vault",
  "/resume",
  "/slms/pentacmd",
  "/terms",
  // Reached through isPageRequest's explicit allowance above.
  "/llms.txt",
  "/llms-full.txt",
]);

const SLUG = "[a-z0-9]+(?:-[a-z0-9]+)*";

/** The dynamic families, as shapes. */
const ROUTE_SHAPES = [
  new RegExp(`^/notebook/${SLUG}$`),
  new RegExp(`^/notebook/category/${SLUG}$`),
  /^\/notebook\/page\/\d+$/,
  new RegExp(`^/projects/${SLUG}$`),
];

// Recognised probe targets, each with what the scanner was hoping to find.
//
// ⚠ Every pattern is anchored to whole path segments, never a bare substring.
// The first draft used /secrets/ unanchored and duly flagged
// /notebook/keeping-secrets-out-of-ai-built-apps — a published article — as an
// attack. An alert that cries wolf over his own writing is worse than no alert,
// so if a pattern here cannot be segment-anchored it does not belong.
const SEG = "(?:^|/)";
const PROBES: [RegExp, string][] = [
  [/^\/\.git(\/|$)/i, "git repository — source and history"],
  [/^\/\.env(\.|\/|$)/i, "env file — API keys and database URLs"],
  [/^\/\.(aws|ssh|npmrc|docker|htpasswd|svn|hg|vscode|idea)(\/|$)/i, "developer credentials"],
  [new RegExp(`${SEG}(wp-admin|wp-login\\.php|wp-content|wp-includes|xmlrpc\\.php|wordpress)(/|$)`, "i"), "WordPress"],
  [new RegExp(`${SEG}(phpmyadmin|phpinfo\\.php|eval-stdin\\.php|cgi-bin|vendor|phpunit)(/|$)`, "i"), "PHP tooling"],
  [/^\/(administrator|admin|cpanel|webmail|manager)(\/|$)/i, "admin panel"],
  [new RegExp(`${SEG}(backup|backups|dump|db|database)(/|$)|\\.(sql|bak|dump)$`, "i"), "database backup"],
  [new RegExp(`${SEG}(config\\.json|credentials|secrets?)(/|$)|\\.(pem|key|p12|pfx)$|${SEG}id_rsa`, "i"), "secrets file"],
  [new RegExp(`${SEG}(actuator|server-status|telescope|_profiler|debug)(/|$)`, "i"), "framework debug endpoint"],
];

export interface PathVerdict {
  /** Matches a real route on this site, so something was genuinely served. */
  known: boolean;
  /** What the request was fishing for, or null if it is not a known probe. */
  probe: string | null;
}

export function classifyPath(pathname: string): PathVerdict {
  // /.well-known/ is the one legitimate dotted path — ai-catalog.json lives
  // there — so it counts as a route rather than falling to the dot rule below.
  const wellKnown = pathname.startsWith("/.well-known/");

  const known =
    wellKnown ||
    STATIC_ROUTES.has(pathname) ||
    STATIC_ROUTES.has(pathname.replace(/\/$/, "")) ||
    ROUTE_SHAPES.some((re) => re.test(pathname));

  // A path that resolves to a real route cannot be a probe, whatever it is
  // called. This is the guard that makes the patterns below safe to extend: the
  // worst a careless one can now do is miss an attack, not libel an article.
  if (known) return { known, probe: null };

  for (const [re, what] of PROBES) {
    if (re.test(pathname)) return { known, probe: what };
  }
  // Any other dotted segment. Nothing this site serves looks like that and
  // scanners try hundreds of them, so a catch-all beats a longer list.
  if (/(^|\/)\.[^/]/.test(pathname)) return { known, probe: "hidden dotfile" };

  return { known, probe: null };
}
