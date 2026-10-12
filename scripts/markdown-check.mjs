#!/usr/bin/env node
// Exercises Markdown content negotiation against a running build.
//
//   npx next build && npx next start -p 3200      (or `prod` in .claude/launch.json)
//   node scripts/markdown-check.mjs                 (defaults to http://localhost:3200)
//   node scripts/markdown-check.mjs https://sumandebnath.houseofnamus.com
//
// Needs a production build: the rewrites in next.config.ts are what is under
// test, and `next dev` is not where this site's routing gets verified
// (AGENTS.md §6).
//
// ── Why this file exists ─────────────────────────────────────────────────────
//
// Two things must both stay true, and a regression in either is invisible from a
// browser:
//
//   1. An agent asking for text/markdown gets Markdown — on `/` (200) and on an
//      unknown path (404) — with Content-Type text/markdown and Vary: Accept.
//   2. Nobody else's response changes. A browser, a bare */*, Next's own RSC
//      navigation fetches, and every real page except `/` must come back exactly
//      as before, with Next's router Vary intact. Breaking that breaks client
//      navigation for people, which is the failure §8 of AEO_PLAYBOOK.md was most
//      worried about.
//
// Every request carries a browser user agent. A curl or node UA is classified as
// a "Script" crawler by lib/crawler.ts, and against a deploy with Telegram
// configured each check would send an alert.

const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36";
const CHROME_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
const MD = "text/markdown";

let pass = 0,
  fail = 0;
const check = (label, ok, detail = "") => {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(62)}${ok ? "" : ` ${detail}`}`);
};

async function get(path, accept, extra = {}) {
  const headers = { "User-Agent": UA, ...extra };
  if (accept !== null) headers.Accept = accept;
  const res = await fetch(BASE + path, { headers, redirect: "follow" });
  const body = await res.text();
  return {
    status: res.status,
    type: res.headers.get("content-type") || "",
    vary: (res.headers.get("vary") || "").toLowerCase(),
    link: res.headers.get("link") || "",
    body,
  };
}

const varies = (r, token) => r.vary.split(",").map((s) => s.trim()).includes(token);

console.log(`Target: ${BASE}\n`);

// ── 1. The homepage negotiates ───────────────────────────────────────────────

console.log("--- / with Accept: text/markdown ---");
const homeMd = await get("/", MD);
check("status 200", homeMd.status === 200, `got ${homeMd.status}`);
check("Content-Type text/markdown", homeMd.type.startsWith("text/markdown"), `got ${homeMd.type}`);
check("Vary includes Accept", varies(homeMd, "accept"), `got "${homeMd.vary}"`);
check("body is Markdown, not HTML", homeMd.body.startsWith("# Suman Debnath") && !/<html/i.test(homeMd.body));
check("body is substantial (>5 KB)", homeMd.body.length > 5000, `got ${homeMd.body.length} bytes`);

// What a coding agent actually sends — Markdown first, HTML as a fallback.
const agentAccept = await get("/", "text/markdown, text/html;q=0.9, */*;q=0.8");
check("agent-style Accept list also gets Markdown", agentAccept.type.startsWith("text/markdown"), `got ${agentAccept.type}`);

// ── 2. Nobody else's homepage changes ────────────────────────────────────────

console.log("\n--- / for everyone else ---");
for (const [label, accept] of [
  ["Accept: text/html", "text/html"],
  ["Chrome's real Accept string", CHROME_ACCEPT],
  ["Accept: */*", "*/*"],
  ["no Accept header at all", null],
]) {
  const r = await get("/", accept);
  check(`${label} → 200 HTML`, r.status === 200 && r.type.startsWith("text/html"), `got ${r.status} ${r.type}`);
  check(`${label} → Next's router Vary intact`, varies(r, "rsc") && varies(r, "next-router-state-tree"), `got "${r.vary}"`);
  check(`${label} → no Vary: Accept on HTML`, !varies(r, "accept"), `got "${r.vary}"`);
}

// Client-side navigation. If this ever came back as Markdown, every in-site link
// click would break for people.
const rsc = await get("/", "*/*", { RSC: "1" });
check("RSC navigation fetch is not Markdown", !rsc.type.startsWith("text/markdown"), `got ${rsc.type}`);

// ── 3. The 404 negotiates ────────────────────────────────────────────────────

console.log("\n--- unknown path ---");
const probe = "/__markdown-check-404-probe-7f3k";
const nfMd = await get(probe, MD);
check("Markdown request → status 404", nfMd.status === 404, `got ${nfMd.status}`);
check("Markdown request → Content-Type text/markdown", nfMd.type.startsWith("text/markdown"), `got ${nfMd.type}`);
check("Markdown request → Vary includes Accept", varies(nfMd, "accept"), `got "${nfMd.vary}"`);
check("body explains the error (≥ 20 chars)", nfMd.body.trim().length >= 20);
check("body links to /llms.txt and /sitemap.xml", /\/llms\.txt\)/.test(nfMd.body) && /\/sitemap\.xml\)/.test(nfMd.body));
check("body does not echo the requested path", !nfMd.body.includes(probe.slice(1)));

const nfHtml = await get(probe, "text/html");
check("HTML request → still 404", nfHtml.status === 404, `got ${nfHtml.status}`);
check("HTML request → still the HTML 404 page", nfHtml.type.startsWith("text/html"), `got ${nfHtml.type}`);

const nested = await get("/agents/nonexistent", MD);
check("nested unknown path → 404 Markdown", nested.status === 404 && nested.type.startsWith("text/markdown"), `got ${nested.status} ${nested.type}`);

// A missing slug inside a dynamic family is matched by [slug] first, so it gets
// the HTML 404. Documented in app/missing.md/route.ts; the status is what matters.
const slug = await get("/notebook/no-such-post-here", MD);
check("unknown notebook slug → still status 404", slug.status === 404, `got ${slug.status}`);

// ── 4. Real routes are never swallowed by the fallback ───────────────────────

console.log("\n--- real routes asked for Markdown are unchanged ---");
for (const [path, wantType] of [
  ["/resume", "text/html"],
  ["/about", "text/html"],
  ["/notebook", "text/html"],
  ["/notebook/agentic-ready-website", "text/html"],
  ["/projects/aegis-vault", "text/html"],
  ["/llms.txt", "text/plain"],
  ["/llms-full.txt", "text/plain"],
  ["/sitemap.xml", "application/xml"],
  ["/robots.txt", "text/plain"],
  ["/.well-known/ai-catalog.json", "application/json"],
]) {
  const r = await get(path, MD);
  check(`${path} → 200 ${wantType}`, r.status === 200 && r.type.startsWith(wantType), `got ${r.status} ${r.type}`);
}

// ── 5. One text, two media types ─────────────────────────────────────────────

console.log("\n--- /index.md and /llms.txt agree ---");
const direct = await get("/index.md", null);
const llms = await get("/llms.txt", null);
check("/index.md → 200 text/markdown", direct.status === 200 && direct.type.startsWith("text/markdown"), `got ${direct.status} ${direct.type}`);
check("/index.md body === /llms.txt body", direct.body === llms.body);
check("negotiated / body === /llms.txt body", homeMd.body === llms.body);
check("/index.md declares the HTML homepage canonical", /<\/>; rel="canonical"/.test(direct.link), `got "${direct.link}"`);
check("/index.md keeps the discovery Link relations", direct.link.includes('rel="service-desc"'));
const homeHtml = await get("/", "text/html");
check("HTML homepage carries no canonical Link header", !homeHtml.link.includes("canonical") && homeHtml.link.includes('rel="service-desc"'));

// ── 6. How Vary actually arrives on the wire ─────────────────────────────────
//
// fetch() folds repeated header lines into one, so every check above sees
// "rsc, …, accept" whether the server sent one Vary line or two. RFC 9110 §5.3
// says those are equivalent — but a scanner that reads only the first line would
// see no Accept. `next start` sends two by design (Next appends its router Vary
// to every App Router response), so this reports rather than fails: run it
// against the deployed URL to see what Vercel sends.

console.log("\n--- raw Vary field lines (informational) ---");
const { request } = await import(BASE.startsWith("https") ? "node:https" : "node:http");
for (const path of ["/", "/__markdown-check-404-probe-7f3k"]) {
  const lines = await new Promise((resolve, reject) => {
    request(BASE + path, { headers: { "User-Agent": UA, Accept: MD } }, (res) => {
      const out = [];
      for (let i = 0; i < res.rawHeaders.length; i += 2)
        if (res.rawHeaders[i].toLowerCase() === "vary") out.push(res.rawHeaders[i + 1]);
      res.resume();
      resolve(out);
    })
      .on("error", reject)
      .end();
  });
  const first = (lines[0] || "").toLowerCase();
  // Token match, not a regex — "accept-encoding" must not count as "accept".
  const tag = first.split(",").map((s) => s.trim()).includes("accept") ? "OK  " : "INFO";
  console.log(`${tag}  ${path.padEnd(36)} ${lines.length} line(s): ${lines.map((l) => `"${l}"`).join(" + ")}`);
}

console.log(`\n${fail === 0 ? "ALL PASS" : `${fail} FAILING`}  (${pass} passed)\n`);
process.exit(fail === 0 ? 0 : 1);
