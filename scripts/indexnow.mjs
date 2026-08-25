#!/usr/bin/env node
//
// Push every URL in the sitemap to IndexNow.
//
// ## Why this exists
//
// ChatGPT finds this site because OpenAI runs its own crawler *and* its own
// search index — `OAI-SearchBot` visits, indexes, and ChatGPT can then cite it.
// That loop is entirely within OpenAI, which is why the on-site work paid off
// there first and fastest.
//
// The other assistants do not work that way. They answer from someone else's
// index, so being perfectly crawlable is necessary and nowhere near sufficient:
//
//   Claude   → searches via Brave's index
//   Gemini   → grounds on Google's index
//   Copilot  → Bing's index
//   Grok     → X, plus a web index
//
// IndexNow is a push protocol: one HTTP request tells Bing, Yandex, Seznam and
// Naver that a set of URLs exists or changed, instead of waiting to be
// discovered. Bing's index is the one that feeds Copilot and DuckDuckGo, and it
// is the only major index with a working push mechanism at all — Google
// deprecated its equivalent for everything except job postings and livestreams.
//
// **It does nothing for Google, Brave or xAI.** Those need Search Console,
// inbound links, and time respectively. See AEO_PLAYBOOK.md §6.
//
// ## Usage
//
//   node scripts/indexnow.mjs            # submit every sitemap URL
//   node scripts/indexnow.mjs --dry      # print what would be sent
//   node scripts/indexnow.mjs /notebook  # submit specific paths only
//
// Run it after a deploy that adds or meaningfully changes pages. Submitting an
// unchanged URL repeatedly is explicitly discouraged by the protocol and can get
// a key rate-limited, so this is not something to put in a cron.

import { readFileSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://sumandebnath.houseofnamus.com";
const HOST = new URL(SITE).host;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

function readKey() {
  try {
    return readFileSync(join("scripts", ".indexnow-key"), "utf8").trim();
  } catch {
    console.error(
      "No key found at scripts/.indexnow-key.\n" +
        "The key must also be served as https://<host>/<key>.txt containing the key\n" +
        "as its only content — that file is how IndexNow verifies you own the domain.",
    );
    process.exit(1);
  }
}

/** Pull <loc> values straight out of the built sitemap. */
async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const paths = args.filter((a) => a.startsWith("/"));

  const key = readKey();
  const urlList = paths.length ? paths.map((p) => `${SITE}${p}`) : await sitemapUrls();

  if (urlList.length === 0) {
    console.error("Nothing to submit.");
    process.exit(1);
  }

  // The protocol caps a single submission at 10,000 URLs. Nowhere near that
  // here, but the guard costs one line and the failure mode without it is a
  // silent partial submission.
  if (urlList.length > 10_000) {
    console.error(`${urlList.length} URLs exceeds the 10,000 per-request limit.`);
    process.exit(1);
  }

  const body = { host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList };

  console.log(`${urlList.length} URLs → ${ENDPOINT}`);
  console.log(`key file: ${body.keyLocation}`);
  for (const u of urlList) console.log(`  ${u}`);

  if (dry) {
    console.log("\n--dry: nothing sent.");
    return;
  }

  // Verify the key file is actually reachable before submitting. A 404 here is
  // the single most common reason a submission is accepted and then silently
  // ignored, and it is far easier to diagnose now than from Bing's dashboard
  // three days later.
  const keyCheck = await fetch(body.keyLocation);
  if (!keyCheck.ok) {
    console.error(`\nKey file is not reachable (${keyCheck.status}) at ${body.keyLocation}.`);
    console.error("Deploy first — IndexNow fetches that URL to verify ownership.");
    process.exit(1);
  }
  if ((await keyCheck.text()).trim() !== key) {
    console.error("\nKey file is reachable but its contents do not match the key.");
    process.exit(1);
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  // 200 and 202 both mean accepted; 202 means "accepted, key validation
  // pending". Anything else is worth reading in full.
  if (res.status === 200 || res.status === 202) {
    console.log(`\nAccepted (${res.status}).`);
    console.log("Bing, Yandex, Seznam and Naver share IndexNow submissions between them.");
    console.log("Google, Brave and xAI do not participate — see the note at the top.");
  } else {
    console.error(`\nRejected (${res.status}): ${await res.text()}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
