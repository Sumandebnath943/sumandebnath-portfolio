/**
 * Builds the /notebook cover images.
 *
 *   node scripts/build-notebook-covers.mjs
 *
 * Reads the full-size PNG masters from `_masters/notebook-covers/` and writes
 * WebP into `public/notebook/`. The masters are git-ignored; the WebP output is
 * committed, because that is what the site serves.
 *
 * A file is named after the post slug it belongs to. That is the whole mapping —
 * `<slug>.png` becomes `/notebook/<slug>.webp`, which is what the post's `cover`
 * field points at.
 *
 * ── The sizing decision ─────────────────────────────────────────────────
 * Masters arrive at 1536×1024, which is what the image prompts in
 * NOTEBOOK_COVERS.md ask for. Output is **1280 wide**, and that is not an
 * arbitrary round number: the largest a cover is ever rendered is `100vw` on a
 * phone, so a 430px viewport at 3× device pixel ratio wants about 1290px.
 * 1280 lands on that almost exactly. Anything larger is bytes nobody downloads,
 * because next/image will not upscale past the source and no layout asks for
 * more.
 *
 * Quality 80 is the knee, measured rather than guessed, on the grainiest image
 * in the set:
 *
 *   1536px  q86 540 KB   q80 431 KB   q74 356 KB
 *   1280px  q86 385 KB   q80 309 KB   q74 261 KB
 *   1100px  q86 287 KB   q80 230 KB   q74 195 KB
 *
 * ~309 KB a cover, ~8 MB for twenty-six. Below q80 the paper grain starts to
 * band in the flat cream areas, which is exactly where this style shows it.
 *
 * ── Why these compress worse than flat art should ───────────────────────
 * The house style asks for "a faint visible paper grain". Grain is noise, and
 * noise is what every codec is worst at. It is worth keeping — it is most of
 * what stops the set looking like clip art — but it is the reason a flat
 * two-colour illustration costs 300 KB instead of 40 KB. If a future style ever
 * drops the grain, revisit these numbers, they will fall through the floor.
 *
 * ── What the visitor actually downloads ─────────────────────────────────
 * Not this file. `next/image` re-encodes to AVIF or WebP at the rendered size,
 * so a card at 33vw serves something far smaller. The 309 KB is repository and
 * deployment weight, not visitor weight.
 */

import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "_masters/notebook-covers";
const OUT = "public/notebook";
const WIDTH = 1280;
const QUALITY = 80;

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function main() {
  await mkdir(OUT, { recursive: true });

  let files;
  try {
    files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  } catch {
    console.error(`No masters at ${SRC}/ — put the full-size covers there first.`);
    process.exitCode = 1;
    return;
  }

  if (files.length === 0) {
    console.error(`${SRC}/ is empty.`);
    process.exitCode = 1;
    return;
  }

  let totalIn = 0;
  let totalOut = 0;

  for (const file of files.sort()) {
    const slug = file.replace(/\.[^.]+$/, "");
    const from = path.join(SRC, file);
    const to = path.join(OUT, `${slug}.webp`);

    const before = (await stat(from)).size;
    const info = await sharp(from)
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(to);

    totalIn += before;
    totalOut += info.size;
    console.log(
      `  ${slug.padEnd(46)} ${kb(before).padStart(8)} → ${kb(info.size).padStart(7)}` +
        `  (${(100 - (info.size / before) * 100).toFixed(0)}% smaller)`,
    );
  }

  console.log(
    `\n${files.length} covers · ${(totalIn / 1024 / 1024).toFixed(1)} MB → ` +
      `${(totalOut / 1024 / 1024).toFixed(1)} MB`,
  );
}

main();
