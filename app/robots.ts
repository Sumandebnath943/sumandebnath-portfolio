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
        // ── Content Signals (contentsignals.org), 27 Aug 2026 ───────────────
        //
        // A declaration of preference, not an access control. `Allow: /` above
        // is what actually grants access; this states the *intent* behind it in
        // the vocabulary three agentic-readiness scanners now look for.
        //
        // ⚠ It says `ai-train=yes`, and that is deliberate. Every scanner
        // suggests `ai-train=no` as the default and it is the wrong call for
        // this site — see AEO_PLAYBOOK.md §2.1. The short version: training is
        // how a model can name Suman *without* running a search, which is the
        // durable half of the entity fight described in §6, and this site's
        // content is an advertisement rather than a product with revenue to
        // protect. Declining training would opt out of the one thing the whole
        // playbook is built to win.
        //
        // The `other` field is this Next version's escape hatch for non-standard
        // per-agent directives — passed through verbatim. It is emitted only in
        // the `*` group, which is where the spec expects a site-wide default.
        other: {
          "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
        },
      },
      // Explicitly allow Bingbot — feeds Microsoft Copilot, LinkedIn AI,
      // and DuckDuckGo. Critical for AI-assisted hiring manager discovery.
      { userAgent: "Bingbot", allow: "/" },

      // ── OpenAI / ChatGPT ────────────────────────────────────────────────
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },

      // ── Anthropic / Claude ──────────────────────────────────────────────
      //
      // Four agents, and the two that matter most were missing. `ClaudeBot` is
      // the training crawl and says nothing about whether Claude can find you;
      // `Claude-SearchBot` is what builds the index Claude searches, and
      // `Claude-User` is the fetch that happens when somebody asks Claude about
      // a page. `Claude-Web` and `anthropic-ai` are legacy and kept for older
      // infrastructure that may still send them.
      //
      // Adding these does not *unblock* anything — the `*` group already allows
      // everything, and robots.txt permits by default. What it does is state the
      // permission explicitly for the two agents whose absence from a file this
      // detailed could read as an oversight.
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
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
