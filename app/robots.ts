import type { MetadataRoute } from "next";

const SITE = "https://sumandebnath.houseofnamus.com";

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
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
