/**
 * Builds the /profile filmstrip photographs.
 *
 *   node scripts/build-profile-photos.mjs
 *
 * Reads the originals from `_source-profile-photos/` (git-ignored, see
 * PROJECT_BIBLE §9.1) and writes WebP into `public/profile/`.
 *
 * ── Two decisions worth knowing ─────────────────────────────────────────
 * **Everything is cropped to 4:5.** The originals are a mix of square phone
 * exports, one 4:3 and one 3:4. The strip lays frames side by side at a single
 * height, so mixed ratios give it a ragged rhythm — the reference's own strip
 * is uniform for the same reason. 4:5 portrait is the ratio that loses the
 * least from a square crop while still reading as a photograph rather than a
 * thumbnail.
 *
 * **720px tall, quality 78.** The strip renders them at 180–280 CSS px, so 720
 * covers 2.5× on a retina phone with room to spare. Eight frames land near
 * 45 KB each; they are all below the fold and lazy, which is the only reason a
 * photographic strip is affordable on this page at all.
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "_source-profile-photos";
const OUT = "public/profile";
const H = 720;
const W = Math.round((H * 4) / 5); // 576

/** `position` picks what survives the crop — faces and horizons, mostly. */
const shots = [
  { file: "file_000000008a688211894d9af6a48ec68e.png", out: "dog", position: "right" },
  { file: "Screenshot_20260823_013939_Chrome.jpg.jpeg", out: "forest-road", position: "centre" },
  { file: "Screenshot_20260823_013949_Chrome.jpg.jpeg", out: "portrait", position: "centre" },
  { file: "Screenshot_20260823_014129_Chrome.jpg.jpeg", out: "poster", position: "centre" },
  { file: "Screenshot_20260823_014226_Chrome.jpg.jpeg", out: "rider", position: "right" },
  { file: "Screenshot_20260823_014246_Chrome.jpg.jpeg", out: "summit", position: "centre" },
  { file: "Screenshot_20260823_014257_Chrome.jpg.jpeg", out: "occasion", position: "right" },
  { file: "Screenshot_20260823_014514_Chrome.jpg.jpeg", out: "friday", position: "centre" },
];

const gravity = { left: "west", centre: "centre", right: "east" };

await mkdir(OUT, { recursive: true });

for (const shot of shots) {
  const to = path.join(OUT, `${shot.out}.webp`);
  const info = await sharp(path.join(SRC, shot.file))
    .rotate()
    .resize(W, H, { fit: "cover", position: gravity[shot.position] })
    .webp({ quality: 78 })
    .toFile(to);
  console.log(`${to.padEnd(30)} ${W}×${H}  ${(info.size / 1024).toFixed(1)} KB`);
}
