#!/usr/bin/env node
//
// Builds `app/favicon.ico` from `public/icon-512.png`.
//
// Why this exists at all: the app already ships `app/icon.png`, so Next emits a
// perfectly good `<link rel="icon">`. But a large amount of software never reads
// that tag and simply GETs `/favicon.ico` off the origin — RSS readers, link
// unfurlers, several crawlers, older browsers, and every "add to bookmarks"
// path. Without this file that request 404s.
//
// sharp cannot write ICO. It does not have to: the ICO container has allowed a
// raw PNG payload per entry since Vista, so this resizes with sharp and then
// writes the 6-byte ICONDIR + 16-byte-per-entry ICONDIRENTRY header by hand.
// That keeps the dependency list unchanged.
//
// Run: node scripts/build-favicon.mjs
// Re-run only when the brand mark changes; the output is committed.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = path.resolve("public/icon-512.png");
const OUTPUT = path.resolve("app/favicon.ico");

// 16 for the browser tab, 32 for the bookmark bar and most unfurlers, 48 for
// Windows shortcuts. Beyond 48 the ICO is only bloat — the PNG icons cover the
// large-format cases through the manifest.
const SIZES = [16, 32, 48];

function buildIco(images) {
  const HEADER = 6;
  const ENTRY = 16;

  const iconDir = Buffer.alloc(HEADER);
  iconDir.writeUInt16LE(0, 0); // reserved
  iconDir.writeUInt16LE(1, 2); // type: 1 = icon
  iconDir.writeUInt16LE(images.length, 4);

  let offset = HEADER + ENTRY * images.length;

  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(ENTRY);
    // 0 means 256 in this field; none of our sizes hit that, but encode it
    // correctly anyway so raising SIZES later cannot silently corrupt the file.
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette colours — 0 for truecolour
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([iconDir, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  const source = await readFile(SOURCE);

  const images = await Promise.all(
    SIZES.map(async (size) => ({
      size,
      // `ensureAlpha` + `palette: false` are both load-bearing. sharp will
      // happily emit a palette or RGB PNG when the source has no useful alpha,
      // and Next's ICO decoder rejects anything that is not 8-bit RGBA with
      // "The PNG is not in RGBA format!" — at build time, not here.
      data: await sharp(source)
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .ensureAlpha()
        .toColourspace("srgb")
        .png({ compressionLevel: 9, palette: false, colours: 256 })
        .toBuffer(),
    })),
  );

  const ico = buildIco(images);
  await writeFile(OUTPUT, ico);

  console.log(
    `favicon.ico written — ${SIZES.join("/")}px, ${(ico.length / 1024).toFixed(1)} KB\n  ${OUTPUT}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
