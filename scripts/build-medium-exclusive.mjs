/**
 * Strips a Medium-exclusive article down to what Medium's editor can accept.
 *
 *   node scripts/build-medium-exclusive.mjs _crosspost/medium-exclusives/M1-marketers-who-build.md
 *
 * Writes `<name>.MEDIUM.md` beside the source.
 *
 * ── Why this is separate from build-crosspost.mjs ─────────────────────────
 *
 * That one renders a typed `Post` out of `lib/notebook/`. These five articles
 * are not notebook posts and never will be — they are originals written for
 * Medium, so there is no `Post` object to render and no canonical pointing
 * home. Same output format, different input, so it is a different script
 * rather than a flag.
 *
 * ⚠ **The canonical rule is inverted for these files, and it is the easiest
 * thing in this whole process to get backwards.** A syndicated article
 * canonicalises to sumandebnath.houseofnamus.com because the original lives
 * there. A Medium exclusive has no copy anywhere else, so Medium's own
 * self-canonical is correct and must be left alone. Setting "originally
 * published elsewhere" on one of these would point at a URL that 404s.
 *
 * ── What Medium's editor does with Markdown ───────────────────────────────
 *
 * Nothing. It renders none of it — learned on 9 Sep 2026 when a piece carrying
 * two tables was pasted and the pipes arrived as literal pipes. So every marker
 * comes out here, and the posting sheet lists which lines to restyle as
 * headings by hand.
 */

import { readFile, writeFile } from "node:fs/promises";

const strip = (md) =>
  md
    // Front matter, only when the file opens with it. An unanchored match eats
    // the body of any article that uses --- as a horizontal rule.
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .split("\n")
    .map((line) =>
      line
        .replace(/^#+\s*/, "")                              // headings → plain lines
        .replace(/^>\s?/, "")                               // block quotes
        .replace(/^[-*]\s+/, "")                            // list markers: Medium turns a
                                                            // pasted dash into a list only
                                                            // sometimes, and one left behind
                                                            // reads as a typo
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")     // links: keep the destination,
                                                            // since a bare label loses it
        .replace(/\*\*([^*]+)\*\*/g, "$1")                  // bold
        .replace(/(^|\s)\*([^*]+)\*($|\s)/g, "$1$2$3")      // italic
        .replace(/`([^`]+)`/g, "$1")                        // inline code
    )
    .filter((line) => !/^-{3,}\s*$/.test(line))             // horizontal rules
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim() + "\n";

const src = process.argv[2];
if (!src) {
  console.error("Usage: node scripts/build-medium-exclusive.mjs <path-to-article.md>");
  process.exit(1);
}

const md = await readFile(src, "utf8");
const out = src.replace(/\.md$/, ".MEDIUM.md");
await writeFile(out, strip(md), "utf8");

const headings = md
  .split("\n")
  .filter((l) => /^##\s/.test(l))
  .map((l) => l.replace(/^##\s*/, ""));

console.log(`  ${out}`);
console.log(`  ~${strip(md).split(/\s+/).length} words`);
console.log(`\n  Restyle these ${headings.length} lines as headings in Medium (select, press the large T):`);
for (const h of headings) console.log(`    ${h}`);
console.log(`\n  ⚠ Leave the canonical alone. This is a Medium original — there is no copy elsewhere to point at.`);
