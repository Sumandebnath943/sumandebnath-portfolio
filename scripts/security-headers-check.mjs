#!/usr/bin/env node
// Exercises the security headers set in next.config.ts against a running build.
//
//   node scripts/security-headers-check.mjs                  (http://localhost:3200, the `prod` build)
//   node scripts/security-headers-check.mjs https://sumandebnath.houseofnamus.com
//
// ── Why this file exists ─────────────────────────────────────────────────────
//
// Two failure modes, both silent:
//
//   1. A header that stops being sent. Nothing on the page changes; only a
//      scanner notices, weeks later.
//   2. A Permissions-Policy entry that blocks something the site uses. The
//      YouTube embeds delegate features through their `allow` attribute, and a
//      blocked delegation does not error — the video still plays, it just loses
//      fullscreen or picture-in-picture. So the guard below reads every iframe
//      `allow=` in the source and every browser API the site calls, and refuses
//      a policy that lists any of them.
//
// Browser user agent throughout: a curl/node UA is a "Script" crawler to
// lib/crawler.ts and would send a Telegram alert per request.

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36";

let pass = 0,
  fail = 0;
const check = (label, ok, detail = "") => {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(64)}${ok ? "" : ` ${detail}`}`);
};

async function head(p, accept = "text/html") {
  const res = await fetch(BASE + p, { headers: { "User-Agent": UA, Accept: accept } });
  const body = await res.text();
  return { status: res.status, h: res.headers, body };
}

console.log(`Target: ${BASE}\n`);

// ── 1. Documents carry all four ──────────────────────────────────────────────

const DOCS = [
  "/",
  "/resume",
  "/contact",
  "/agents/migi",
  "/notebook",
  "/notebook/agentic-ready-website",
  "/projects/aegis-vault",
  "/__security-check-404",
  "/desk-4f7a/login",
];

console.log("--- documents ---");
let policy = "";
for (const p of DOCS) {
  const r = await head(p);
  const h = r.h;
  const ok =
    h.get("x-content-type-options") === "nosniff" &&
    h.get("referrer-policy") === "strict-origin-when-cross-origin" &&
    h.get("x-frame-options") === "SAMEORIGIN" &&
    !!h.get("permissions-policy");
  check(`${p} (${r.status}) has all four`, ok,
    `nosniff=${h.get("x-content-type-options")} ref=${h.get("referrer-policy")} xfo=${h.get("x-frame-options")} pp=${!!h.get("permissions-policy")}`);
  policy ||= h.get("permissions-policy") || "";
}

// ── 2. Everything else carries the two that apply to any response ────────────

console.log("\n--- assets and generated files ---");
const home = await head("/");
const chunk = home.body.match(/\/_next\/static\/[^"']+\.js/)?.[0];
const css = home.body.match(/\/_next\/static\/[^"']+\.css/)?.[0];
check("found a JS chunk and a stylesheet in the homepage", !!chunk && !!css);
for (const p of [chunk, css, "/llms.txt", "/sitemap.xml", "/robots.txt", "/robot-v3.glb", "/.well-known/ai-catalog.json"].filter(Boolean)) {
  const r = await head(p, "*/*");
  const ok = r.status === 200 &&
    r.h.get("x-content-type-options") === "nosniff" &&
    r.h.get("referrer-policy") === "strict-origin-when-cross-origin";
  check(`${p.length > 48 ? p.slice(0, 45) + "…" : p} → nosniff + referrer`, ok, `status ${r.status}`);
}

// nosniff makes the browser refuse a script or stylesheet served with the
// wrong type, so the types themselves are part of the check.
if (chunk) check("JS chunk served as JavaScript", /javascript/.test((await head(chunk, "*/*")).h.get("content-type") || ""));
if (css) check("stylesheet served as text/css", /text\/css/.test((await head(css, "*/*")).h.get("content-type") || ""));

// ── 3. Nothing that was already there got displaced ──────────────────────────

console.log("\n--- existing headers survive ---");
check("/ still carries the discovery Link header", (home.h.get("link") || "").includes('rel="service-desc"'));
check("/robot-v3.glb still immutable", ((await head("/robot-v3.glb", "*/*")).h.get("cache-control") || "").includes("immutable"));
const md = await head("/", "text/markdown");
check("/ still negotiates Markdown", (md.h.get("content-type") || "").startsWith("text/markdown"));
const desk = await head("/desk-4f7a/login");
check("/desk-4f7a/login still noindex", (desk.h.get("x-robots-tag") || "").includes("noindex"));

// ── 4. The policy never blocks a feature the site uses ───────────────────────

console.log("\n--- Permissions-Policy vs what the site uses ---");
const listed = new Set(
  policy.split(",").map((d) => d.trim().split("=")[0]).filter(Boolean),
);
check("policy was read from a response", listed.size > 0, `got "${policy}"`);

// Every feature any iframe delegates, read from the source rather than listed
// by hand — a new embed with a new `allow` is covered without editing this.
const used = new Map();
const rel = (full) => path.relative(process.cwd(), full);
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(tsx?|jsx?)$/.test(entry)) {
      const src = readFileSync(full, "utf8");
      for (const m of src.matchAll(/allow="([^"]+)"/g))
        for (const f of m[1].split(";").map((s) => s.trim().split(/\s/)[0]).filter(Boolean))
          used.set(f, `${rel(full)} iframe allow`);
      if (/allowFullScreen/.test(src)) used.set("fullscreen", `${rel(full)} allowFullScreen`);
      if (/SpeechRecognition/.test(src)) used.set("microphone", rel(full));
      if (/navigator\.clipboard/.test(src)) used.set("clipboard-write", rel(full));
      if (/navigator\.share/.test(src)) used.set("web-share", rel(full));
      if (/getUserMedia/.test(src)) used.set("camera", rel(full));
      if (/navigator\.geolocation/.test(src)) used.set("geolocation", rel(full));
    }
  }
}
walk(path.resolve("app"));
walk(path.resolve("components"));

check("found the features the site uses (sanity: ≥ 6)", used.size >= 6, `found ${[...used.keys()].join(", ")}`);
for (const [feature, where] of [...used].sort()) {
  check(`${feature} is not restricted (${where.split(/[\\/]/).pop()})`, !listed.has(feature));
}

console.log(`\n${fail === 0 ? "ALL PASS" : `${fail} FAILING`}  (${pass} passed)\n`);
process.exit(fail === 0 ? 0 : 1);
