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

/** Recognisable agents, most specific first — the label goes in the alert. */
const KNOWN: [RegExp, string][] = [
  [/linkedinbot/i, "LinkedIn"],
  [/slackbot|slack-imgproxy/i, "Slack"],
  [/whatsapp/i, "WhatsApp"],
  [/telegrambot/i, "Telegram"],
  [/twitterbot/i, "X / Twitter"],
  [/facebookexternalhit|facebookcatalog|meta-externalagent/i, "Facebook / Meta"],
  [/discordbot/i, "Discord"],
  [/googlebot/i, "Google"],
  [/google-inspectiontool/i, "Google Search Console"],
  [/google-extended/i, "Google AI"],
  [/bingbot|bingpreview/i, "Bing"],
  [/duckduckbot|duckassistbot/i, "DuckDuckGo"],
  [/applebot/i, "Apple"],
  [/yandex/i, "Yandex"],
  [/baiduspider/i, "Baidu"],
  [/gptbot|oai-searchbot|chatgpt-user/i, "OpenAI"],
  [/claudebot|claude-web|anthropic-ai/i, "Anthropic"],
  [/perplexitybot|perplexity-user/i, "Perplexity"],
  [/ccbot/i, "Common Crawl"],
  [/bytespider/i, "ByteDance"],
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
 */
export function isPageRequest(pathname: string): boolean {
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) return false;
  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") return false;
  // Anything with a file extension is an asset, not a page.
  return !/\.[a-z0-9]{2,5}$/i.test(pathname);
}
