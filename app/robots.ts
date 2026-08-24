import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/projects";

// Single source of truth, shared with app/sitemap.ts. This used to be a second
// hardcoded copy of the origin, which is exactly the kind of thing that drifts
// silently and points half the crawl signals at a stale host.
const SITE = SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Traditional search engines ──────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly allow Bingbot — feeds Microsoft Copilot, LinkedIn AI,
      // and DuckDuckGo. Critical for AI-assisted hiring manager discovery.
      { userAgent: "Bingbot", allow: "/" },

      // ── OpenAI / ChatGPT ────────────────────────────────────────────────
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },

      // ── Anthropic / Claude ──────────────────────────────────────────────
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },

      // ── Perplexity ──────────────────────────────────────────────────────
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },

      // ── Google AI (Gemini, AI Overviews, Vertex) ────────────────────────
      { userAgent: "Google-Extended", allow: "/" },

      // ── Apple Intelligence ───────────────────────────────────────────────
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },

      // ── Meta AI ──────────────────────────────────────────────────────────
      { userAgent: "meta-externalagent", allow: "/" },
      // The fetcher Meta uses for on-demand retrieval, as opposed to the
      // training crawler above. They are separate agents and honour separate
      // rules, so allowing one does nothing for the other.
      { userAgent: "Meta-ExternalFetcher", allow: "/" },

      // ── Amazon (Alexa / Rufus / Nova) ────────────────────────────────────
      { userAgent: "Amazonbot", allow: "/" },

      // ── Mistral ──────────────────────────────────────────────────────────
      { userAgent: "MistralAI-User", allow: "/" },

      // ── Huawei PanGu ─────────────────────────────────────────────────────
      { userAgent: "PanguBot", allow: "/" },

      // ── Timpi ────────────────────────────────────────────────────────────
      { userAgent: "Timpibot", allow: "/" },

      // ── DuckDuckGo AI (DuckAssist) ───────────────────────────────────────
      { userAgent: "DuckAssistBot", allow: "/" },

      // ── You.com AI ───────────────────────────────────────────────────────
      { userAgent: "YouBot", allow: "/" },

      // ── Allen Institute for AI ───────────────────────────────────────────
      { userAgent: "AI2Bot", allow: "/" },

      // ── Cohere ───────────────────────────────────────────────────────────
      { userAgent: "cohere-ai", allow: "/" },

      // ── Common Crawl (feeds many LLM training datasets) ─────────────────
      { userAgent: "CCBot", allow: "/" },

      // ── Bytedance / TikTok AI ────────────────────────────────────────────
      { userAgent: "Bytespider", allow: "/" },

      // ── Diffbot (AI knowledge graph) ─────────────────────────────────────
      { userAgent: "Diffbot", allow: "/" },

      // ── Link unfurlers ───────────────────────────────────────────────────
      // Not AI and not search: these are what render the preview card when the
      // site is pasted into a DM, a post or a job application. They were the
      // one category missing here, and a blocked unfurler is a shared link that
      // shows up as a bare grey URL.
      { userAgent: "LinkedInBot", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "Slackbot", allow: "/" },
      { userAgent: "Discordbot", allow: "/" },
      { userAgent: "WhatsApp", allow: "/" },
      { userAgent: "TelegramBot", allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    // NOTE: no `host:` directive.
    //
    // It was here and it did nothing. Google and Bing never implemented it;
    // Yandex, the only engine that ever read it, deprecated it in March 2021 in
    // favour of 301s and the Host header. It is dead weight in a file that
    // every crawler parses, so it is gone deliberately — please do not add it
    // back.
    //
    // /desk-4f7a is intentionally NOT listed as a Disallow. proxy.ts already
    // serves it with `X-Robots-Tag: noindex, nofollow, noarchive`, which is the
    // stronger signal, and naming the path in a world-readable file would
    // advertise the admin route to exactly the people it is hidden from.
  };
}
