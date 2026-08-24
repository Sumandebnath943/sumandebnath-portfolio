import type { MetadataRoute } from "next";
import { projects, SITE_URL } from "@/lib/projects";
import { PROJECT_DOSSIER_DATE, routeDate } from "@/lib/route-dates";
import { allPosts, postModified, postUrl } from "@/lib/notebook";

const SITE = SITE_URL;

// `lastModified` comes from lib/route-dates.ts, which scripts/build-route-dates.mjs
// generates out of git history — a real per-route commit date rather than one
// hardcoded constant stamped onto every URL.
//
// The old constant was worse than useless. A sitemap asserting that all 27 pages
// changed on the same day carries no information, so crawlers discount the field
// entirely; and being a hand-maintained value, it was already stale. Regenerate
// with `node scripts/build-route-dates.mjs` after a content pass.
//
// `priority` and `changeFrequency` are kept, but do not over-invest in tuning
// them: Google has stated publicly that it ignores both. They still carry
// weight with Bing, Yandex and several of the AI crawlers, which is the only
// reason they remain.

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const ROUTES: Entry[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/resume", changeFrequency: "monthly", priority: 0.95 },
  { path: "/journey", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/profile", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  // Weekly, and second only to the homepage among the non-résumé pages: this
  // is the one route whose content genuinely changes on its own schedule.
  { path: "/notebook", changeFrequency: "weekly", priority: 0.9 },
  { path: "/learnings", changeFrequency: "monthly", priority: 0.9 },
  { path: "/philosophy", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects/aegis-vault", changeFrequency: "monthly", priority: 0.8 },
  { path: "/agents/pact-agent", changeFrequency: "monthly", priority: 0.8 },
  { path: "/agents/pentashell", changeFrequency: "monthly", priority: 0.8 },
  { path: "/agents/migi", changeFrequency: "monthly", priority: 0.8 },
  { path: "/slms/pentacmd", changeFrequency: "monthly", priority: 0.8 },
  { path: "/llms/qdex-1.5b", changeFrequency: "monthly", priority: 0.8 },
  { path: "/apps/forget-anything", changeFrequency: "monthly", priority: 0.8 },
  { path: "/apps/migi-app", changeFrequency: "monthly", priority: 0.8 },
  { path: "/games/pixelville", changeFrequency: "monthly", priority: 0.8 },
  { path: "/banking/rm-copilot", changeFrequency: "monthly", priority: 0.8 },
  { path: "/fun-apps", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = ROUTES.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: routeDate(r.path || "/"),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // ── Project dossiers — derived from lib/projects so this can never drift ──
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE}/projects/${p.slug}`,
    lastModified: new Date(PROJECT_DOSSIER_DATE),
    changeFrequency: "monthly" as const,
    priority: p.status === "Live" ? 0.8 : 0.7,
  }));

  // ── Notebook entries — derived from the post registry ────────────────────
  // Each post carries its own real date, which is the only place on this site
  // where `lastModified` is genuinely per-URL rather than per-source-file.
  const notebookPages: MetadataRoute.Sitemap = allPosts().map((post) => ({
    url: `${SITE}${postUrl(post.slug)}`,
    lastModified: new Date(postModified(post)),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...corePages, ...projectPages, ...notebookPages];
}
