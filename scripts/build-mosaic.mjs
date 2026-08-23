/**
 * Builds the /profile mosaic tiles.
 *
 *   node scripts/build-mosaic.mjs
 *
 * Reads from `_source-film/Google Vids/New/Screenshots for Screenshot 12`,
 * which is **read-only** — the user's own folder, not ours to edit — and
 * writes WebP into `public/mosaic/`.
 *
 * ── The sizing decision ─────────────────────────────────────────────────
 * The mosaic is seen at two extremes: one tile filling a ~1300px window at
 * the start of the zoom, and all twenty at ~250px each when it has zoomed
 * out. 800px wide is the compromise — slightly soft on the opening frame,
 * comfortably over-resolved on the grid, and ~28 KB a tile so the whole set
 * lands near 560 KB. Everything but the opening tile is lazy.
 *
 * Sources are a mix of PNG and AVIF at 1348–1920px wide, all 16:9 except
 * Aegis, which is a phone screenshot in portrait. `position: "top"` keeps the
 * top of that one rather than a band across its middle.
 */

import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const SRC = "_source-film/Google Vids/New/Screenshots for Screenshot 12";
const OUT = "public/mosaic";
const W = 800;
const H = 450;

/** Filename stem → the slug and caption the mosaic uses. Anything in the
 *  source folder not listed here is skipped, so dropping a new screenshot in
 *  does nothing until it is named. */
const TILES = {
  "ROASmind": { slug: "roasmind", label: "ROASmind" },
  "MIGI": { slug: "migi", label: "MIGI" },
  "Imprint": { slug: "imprint", label: "IMPRINT" },
  "Legatus": { slug: "legatus", label: "LEGATUS" },
  "Aegis": { slug: "aegis-vault", label: "AEGIS VAULT" },
  "Pact Agent": { slug: "pact-agent", label: "PACT Agent" },
  "PentaCMD": { slug: "pentacmd", label: "PentaCMD" },
  "Pentashell": { slug: "pentashell", label: "Pentashell" },
  "Qdex 1.5B": { slug: "qdex", label: "Qdex-1.5B" },
  "D-PE.AI ": { slug: "d-pe", label: "D-PE.ai" },
  "Cite": { slug: "cite", label: "CITE" },
  "Crawl Daddy": { slug: "crawl-daddy", label: "Crawl Daddy" },
  "Brief Killer 2": { slug: "brief-killer", label: "Brief Killer 2" },
  "Repurpose AI": { slug: "repurpose-ai", label: "Repurpose AI" },
  "Slide Doctor": { slug: "slide-doctor", label: "Slide Doctor" },
  "Geek Collectibles": { slug: "geek-collectibles", label: "Geek Collectibles" },
  "Forget Anything App": { slug: "forget-anything", label: "Forget Anything?" },
  "Pixelville - Village Game": { slug: "pixelville", label: "PixelVille" },
  "Soul Canvas": { slug: "soul-canvas", label: "Soul Canvas" },
  "3D Museum Portfolio": { slug: "museum", label: "3D Museum" },
};

await mkdir(OUT, { recursive: true });

const files = await readdir(SRC);
const manifest = [];
let missing = Object.keys(TILES);

for (const file of files) {
  const stem = path.parse(file).name;
  const tile = TILES[stem];
  if (!tile) {
    console.log(`  skipped (not in TILES): ${file}`);
    continue;
  }
  missing = missing.filter((m) => m !== stem);

  const info = await sharp(path.join(SRC, file))
    .resize(W, H, { fit: "cover", position: stem === "Aegis" ? "top" : "centre" })
    .webp({ quality: 68 })
    .toFile(path.join(OUT, `${tile.slug}.webp`));

  manifest.push(tile);
  console.log(`${tile.slug.padEnd(20)} ${W}×${H}  ${(info.size / 1024).toFixed(1)} KB`);
}

if (missing.length) console.log(`\n! listed but not found in ${SRC}: ${missing.join(", ")}`);
console.log(`\n${manifest.length} tiles in ${OUT}/`);
