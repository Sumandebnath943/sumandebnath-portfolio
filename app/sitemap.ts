import type { MetadataRoute } from "next";
import { projects, SITE_URL } from "@/lib/projects";

const SITE = SITE_URL;

// Centralised so a single edit moves every "freshness" signal. Bump when the
// site sees a substantive content pass.
const LAST_CONTENT_UPDATE = new Date("2026-06-24");

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Core pages ──────────────────────────────────────────────────────────
  const corePages: MetadataRoute.Sitemap = [
    { url: `${SITE}`, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${SITE}/about`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/projects`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE}/learnings`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/philosophy`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/faq`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/agents/pact-agent`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/agents/pentashell`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/agents/migi`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/slms/pentacmd`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/llms/qdex-1.5b`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/apps/forget-anything`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE}/fun-apps`, changeFrequency: "monthly" as const, priority: 0.7 },

  ].map((p) => ({ ...p, lastModified: LAST_CONTENT_UPDATE }));

  // ── Project dossiers — derived from lib/projects so this can never drift ──
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE}/projects/${p.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly" as const,
    priority: p.status === "Live" ? 0.8 : 0.7,
  }));

  return [...corePages, ...projectPages];
}
