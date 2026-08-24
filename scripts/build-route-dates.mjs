#!/usr/bin/env node
//
// Generates `lib/route-dates.ts` — the real last-modified date of every public
// route, read out of git.
//
// Why: app/sitemap.ts used to stamp one hardcoded `LAST_CONTENT_UPDATE` onto
// all 27 URLs. A sitemap where every page changed on the same day is a sitemap
// crawlers learn to ignore — the whole value of `lastModified` is that it
// differentiates. Worse, it was a constant someone had to remember to bump, and
// nobody ever does.
//
// A route is "modified" when any file it renders from is modified, so each
// route lists its own sources: its page directory, plus the shared data modules
// and component folders it actually pulls in. Committing the output keeps the
// build itself free of git calls — Vercel builds from a shallow clone and
// shelling out to git during `next build` is not something to rely on.
//
// Run: node scripts/build-route-dates.mjs
// Re-run: after any content pass, before committing.

import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";

// route → the source paths whose mtime defines that route's freshness.
// Order does not matter; the newest commit date across all of them wins.
const ROUTES = {
  "/": ["app/page.tsx", "components/sections", "lib/projects.ts"],
  "/resume": ["app/resume", "lib/resume.ts"],
  "/journey": ["app/journey", "components/journey", "lib/journey.ts"],
  "/about": ["app/about"],
  "/profile": ["app/profile", "components/profile"],
  "/contact": ["app/contact", "lib/contact.ts", "lib/contact-intents.ts"],
  "/projects": ["app/projects/page.tsx", "lib/projects.ts", "lib/archive-projects.ts"],
  "/learnings": ["app/learnings", "lib/learnings-data.ts"],
  "/philosophy": ["app/philosophy", "components/sections/AIPhilosophy.tsx"],
  "/faq": ["app/faq", "lib/faqs.ts"],
  "/fun-apps": ["app/fun-apps"],
  "/privacy": ["app/privacy"],
  "/terms": ["app/terms"],

  "/projects/aegis-vault": ["app/projects/aegis-vault", "components/aegis"],
  "/agents/pact-agent": ["app/agents/pact-agent", "components/pact"],
  "/agents/pentashell": ["app/agents/pentashell", "components/pentashell"],
  "/agents/migi": ["app/agents/migi", "components/migi"],
  "/slms/pentacmd": ["app/slms/pentacmd", "components/penta"],
  "/llms/qdex-1.5b": ["app/llms/qdex-1.5b", "components/qdex"],
  "/apps/forget-anything": ["app/apps/forget-anything", "components/forget-anything"],
  "/apps/migi-app": ["app/apps/migi-app", "components/migi-app"],
  "/games/pixelville": ["app/games/pixelville", "components/pixelville"],
  "/banking/rm-copilot": ["app/banking/rm-copilot", "components/banking"],

  "/notebook": ["app/notebook/page.tsx", "lib/notebook"],
};

// Dossier routes under /projects/[slug] all render from the same two files, so
// they share a date rather than each claiming its own.
const PROJECT_DOSSIER_SOURCES = [
  "app/projects/[slug]",
  "lib/projects.ts",
  "components/sections",
];

function lastCommitISO(paths) {
  let newest = null;

  for (const p of paths) {
    let out = "";
    try {
      out = execFileSync("git", ["log", "-1", "--format=%cI", "--", p], {
        encoding: "utf8",
      }).trim();
    } catch {
      // A path that git does not know about (new, untracked, or renamed) simply
      // does not contribute a date. It must not abort the whole build.
      continue;
    }
    if (!out) continue;
    const d = new Date(out);
    if (Number.isNaN(d.getTime())) continue;
    if (!newest || d > newest) newest = d;
  }

  return newest;
}

function isoDay(d) {
  return d.toISOString().slice(0, 10);
}

async function main() {
  const fallback = lastCommitISO(["."]) ?? new Date();
  const entries = [];

  for (const [route, sources] of Object.entries(ROUTES)) {
    const d = lastCommitISO(sources);
    entries.push([route, isoDay(d ?? fallback), d ? "" : " // no git history yet"]);
  }

  const dossier = lastCommitISO(PROJECT_DOSSIER_SOURCES) ?? fallback;

  const body = entries
    .map(([route, date, note]) => `  "${route}": "${date}",${note}`)
    .join("\n");

  const file = `// GENERATED FILE — do not edit by hand.
// Written by scripts/build-route-dates.mjs from git history.
// Regenerate with:  node scripts/build-route-dates.mjs
//
// These feed \`lastModified\` in app/sitemap.ts and the dateline on every page's
// structured data. They are real commit dates, which is the entire point: a
// sitemap that claims every page changed on the same day tells a crawler
// nothing, and a hand-maintained constant is one nobody remembers to bump.

export const ROUTE_DATES: Record<string, string> = {
${body}
};

/** Shared date for the /projects/[slug] dossiers — they all render from the
 *  same source files, so an individual date per slug would be fiction. */
export const PROJECT_DOSSIER_DATE = "${isoDay(dossier)}";

/** Used when a route has no entry above — a page added without regenerating. */
export const FALLBACK_DATE = "${isoDay(fallback)}";

export function routeDate(route: string): Date {
  return new Date(ROUTE_DATES[route] ?? FALLBACK_DATE);
}
`;

  const out = path.resolve("lib/route-dates.ts");
  await writeFile(out, file, "utf8");
  console.log(`route dates written — ${entries.length} routes\n  ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
