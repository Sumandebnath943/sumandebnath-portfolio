#!/usr/bin/env node
// Exercises crawler identity verification and path classification.
//
//   node scripts/crawler-check.mjs        (run from the project root)
//
// Reaches the network: the verification block fetches the vendors' own
// published IP lists, which is the point — a snapshot committed here would rot
// and start calling real crawlers forgeries. If you are offline, that block
// reports "unverified" for everything and says so rather than failing.
//
// ── Why this file exists ─────────────────────────────────────────────────────
//
// Two hazards, both of which have already bitten once:
//
//   1. lib/crawler.ts holds STATIC_ROUTES, a hand-written list of every public
//      page. If it drifts from app/, a real page starts getting alerted as a
//      404 — the notifier lying in the opposite direction from the bug it was
//      written to fix. The last block walks app/ and refuses to let it drift.
//
//   2. The probe patterns run against paths his own writing occupies. A first
//      draft matched "secrets" as a bare substring and flagged
//      /notebook/keeping-secrets-out-of-ai-built-apps — a published article —
//      as an attack. Real slugs are checked here so that cannot come back.

import { readdirSync, statSync } from "node:fs";
import path from "node:path";

const { verifyCrawler } = await import("../lib/crawler-verify.ts");
const { classifyPath, identifyCrawler } = await import("../lib/crawler.ts");

let pass = 0,
  fail = 0;
const check = (label, got, want) => {
  const ok = got === want;
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(54)}${ok ? "" : ` got ${got} want ${want}`}`);
};

const OPENAI_UA =
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0; +https://openai.com/bot)";
const GOOGLE_UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const CLAUDE_UA = "Mozilla/5.0 (compatible; Claude-User/1.0; +Claude-User@anthropic.com)";

// ── Identity ─────────────────────────────────────────────────────────────────

console.log("--- crawler identity (fetches the published lists) ---");

// Can we reach the lists at all? Without them every verdict below is
// "unverified" by design, and reporting that is more useful than 8 failures.
const online = (await verifyCrawler(OPENAI_UA, "104.208.184.200")).verdict === "verified";

if (!online) {
  console.log("SKIP  vendor lists unreachable — identity checks need network\n");
} else {
  // The two real arrivals of 2026-09-01: Cloudflare IPs wearing OpenAI's string.
  check("forged: 104.23.175.224 as ChatGPT-User", (await verifyCrawler(OPENAI_UA, "104.23.175.224")).verdict, "forged");
  check("forged: 162.159.98.239 as ChatGPT-User", (await verifyCrawler(OPENAI_UA, "162.159.98.239")).verdict, "forged");

  // Boundaries of a real published /28, from openai.com/chatgpt-user.json.
  check("verified: inside the /28", (await verifyCrawler(OPENAI_UA, "104.208.184.200")).verdict, "verified");
  check("verified: first address of the /28", (await verifyCrawler(OPENAI_UA, "104.208.184.192")).verdict, "verified");
  check("verified: last address of the /28", (await verifyCrawler(OPENAI_UA, "104.208.184.207")).verdict, "verified");
  check("forged: one past the /28", (await verifyCrawler(OPENAI_UA, "104.208.184.208")).verdict, "forged");

  // IPv6 has to work too — Vercel hands it to us and every list publishes it.
  check("verified: v6 inside Googlebot's /64", (await verifyCrawler(GOOGLE_UA, "2001:4860:4801:10::5")).verdict, "verified");
  check("forged: v6 outside it", (await verifyCrawler(GOOGLE_UA, "2001:4860:4801:99::5")).verdict, "forged");
  check("a v4 address never matches a v6 prefix", (await verifyCrawler(GOOGLE_UA, "104.23.175.224")).verdict, "forged");
}

// The safety rule, and the reason "forged" can be trusted when it does appear:
// an accusation is only ever made from a list that loaded. These hold offline.
console.log("\n--- never accuse without evidence ---");
check("Claude-User is unverified, not forged", (await verifyCrawler(CLAUDE_UA, "104.23.175.224")).verdict, "unverified");
check("no client IP is unverified", (await verifyCrawler(OPENAI_UA, "")).verdict, "unverified");
check("unparseable IP is unverified", (await verifyCrawler(OPENAI_UA, "not-an-ip")).verdict, "unverified");
check("a vendor with no list is unverified", (await verifyCrawler("LinkedInBot/1.0", "1.2.3.4")).verdict, "unverified");

// ── Path classification ──────────────────────────────────────────────────────

console.log("\n--- real routes are never called a 404 or a probe ---");
for (const p of [
  "/",
  "/resume",
  "/notebook",
  "/notebook/all",
  "/notebook/category/engineering",
  "/notebook/page/2",
  "/projects/aegis-vault",
  "/projects/some-dossier",
  "/agents/pentashell",
  "/llms.txt",
  "/.well-known/ai-catalog.json",
]) {
  const v = classifyPath(p);
  check(p, `known=${v.known} probe=${v.probe !== null}`, "known=true probe=false");
}

console.log("\n--- probes are caught ---");
for (const [p, want] of [
  ["/.env.sample", "env file — API keys and database URLs"],
  ["/.env", "env file — API keys and database URLs"],
  ["/.git/HEAD", "git repository — source and history"],
  ["/.git/config", "git repository — source and history"],
  ["/.aws/credentials", "developer credentials"],
  ["/wp-admin/setup-config.php", "WordPress"],
  ["/phpmyadmin/index.php", "PHP tooling"],
  ["/backup.sql", "database backup"],
  ["/actuator/health", "framework debug endpoint"],
  ["/.DS_Store", "hidden dotfile"],
]) {
  check(p, classifyPath(p).probe ?? "null", want);
}

console.log("\n--- a wrong URL is a 404, but not an accusation ---");
for (const p of ["/nope", "/agents/nonexistent", "/notebook/no-such-post-here"]) {
  check(p, `probe=${classifyPath(p).probe !== null}`, "probe=false");
}

console.log("\n--- identifyCrawler is unchanged ---");
check("ChatGPT-User label", identifyCrawler(OPENAI_UA) ?? "null", "OpenAI · ChatGPT live fetch");
check("a browser is not a crawler", String(identifyCrawler("Mozilla/5.0 (Windows NT 10.0) Chrome/120")), "null");

// ── The drift guard ──────────────────────────────────────────────────────────
//
// STATIC_ROUTES is written by hand because resolving it at runtime would mean
// dragging lib/notebook and lib/projects into the proxy's bundle. Hand-written
// lists drift; this is the check that stops it silently.

console.log("\n--- STATIC_ROUTES agrees with app/ ---");

const ADMIN = "/desk-4f7a";
const routesOnDisk = [];
(function walk(dir, url) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (entry === "page.tsx") routesOnDisk.push(url || "/");
    else if (statSync(full).isDirectory()) {
      // Route groups (auth) contribute no URL segment; private folders start _.
      if (entry.startsWith("_")) continue;
      walk(full, entry.startsWith("(") ? url : `${url}/${entry}`);
    }
  }
})(path.resolve("app"), "");

const publicStatic = routesOnDisk
  .filter((r) => !r.includes("["))
  .filter((r) => r !== ADMIN && !r.startsWith(`${ADMIN}/`))
  .sort();

// The generated text routes are pages by isPageRequest's explicit allowance,
// not by having a page.tsx, so they are expected in the list but not on disk.
const GENERATED = ["/llms.txt", "/llms-full.txt"];

for (const r of publicStatic) {
  check(`app${r === "/" ? "" : r}/page.tsx is listed`, classifyPath(r).known, true);
}

// And the reverse: nothing listed that no longer exists, which would leave a
// dead path being reported as a real page for ever.
const onDisk = new Set([...publicStatic, ...GENERATED]);
const { STATIC_ROUTES } = await import("../lib/crawler.ts");
for (const r of STATIC_ROUTES) {
  check(`${r} still exists`, onDisk.has(r), true);
}

console.log(`\n${fail === 0 ? "ALL PASS" : `${fail} FAILING`}  (${pass} passed)\n`);
process.exit(fail === 0 ? 0 : 1);
