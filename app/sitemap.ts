import type { MetadataRoute } from "next";

const SITE = "https://sumandebnath.houseofnamus.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Core pages ──────────────────────────────────────────────────────────
    {
      url: `${SITE}`,
      lastModified: new Date("2026-06-20"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/about`,
      lastModified: new Date("2026-06-20"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/philosophy`,
      lastModified: new Date("2026-06-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/faq`,
      lastModified: new Date("2026-06-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/projects`,
      lastModified: new Date("2026-06-20"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE}/learnings`,
      lastModified: new Date("2026-06-20"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/fun-apps`,
      lastModified: new Date("2026-06-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/agents/pact-agent`,
      lastModified: new Date("2026-06-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ── Flagship project dossiers ────────────────────────────────────────────
    {
      url: `${SITE}/projects/imprint`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/projects/legatus`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/projects/cite`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/projects/roasmind`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/projects/geek-collectibles`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/projects/ember`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/projects/d-pe`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

