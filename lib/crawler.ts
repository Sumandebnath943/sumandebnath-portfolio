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
