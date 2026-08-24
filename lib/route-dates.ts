// GENERATED FILE — do not edit by hand.
// Written by scripts/build-route-dates.mjs from git history.
// Regenerate with:  node scripts/build-route-dates.mjs
//
// These feed `lastModified` in app/sitemap.ts and the dateline on every page's
// structured data. They are real commit dates, which is the entire point: a
// sitemap that claims every page changed on the same day tells a crawler
// nothing, and a hand-maintained constant is one nobody remembers to bump.

export const ROUTE_DATES: Record<string, string> = {
  "/": "2026-08-24",
  "/resume": "2026-08-24",
  "/journey": "2026-08-24",
  "/about": "2026-08-24",
  "/profile": "2026-08-24",
  "/contact": "2026-08-24",
  "/projects": "2026-08-24",
  "/learnings": "2026-08-24",
  "/philosophy": "2026-08-24",
  "/faq": "2026-08-24",
  "/fun-apps": "2026-08-24",
  "/privacy": "2026-08-24",
  "/terms": "2026-08-24",
  "/projects/aegis-vault": "2026-08-24",
  "/agents/pact-agent": "2026-08-24",
  "/agents/pentashell": "2026-08-24",
  "/agents/migi": "2026-08-24",
  "/slms/pentacmd": "2026-08-24",
  "/llms/qdex-1.5b": "2026-08-24",
  "/apps/forget-anything": "2026-08-24",
  "/apps/migi-app": "2026-08-24",
  "/games/pixelville": "2026-08-24",
  "/banking/rm-copilot": "2026-08-24",
  "/notebook": "2026-08-24",
};

/** Shared date for the /projects/[slug] dossiers — they all render from the
 *  same source files, so an individual date per slug would be fiction. */
export const PROJECT_DOSSIER_DATE = "2026-08-24";

/** Used when a route has no entry above — a page added without regenerating. */
export const FALLBACK_DATE = "2026-08-24";

export function routeDate(route: string): Date {
  return new Date(ROUTE_DATES[route] ?? FALLBACK_DATE);
}
