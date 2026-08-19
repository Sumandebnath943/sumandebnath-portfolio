/**
 * Downsamples a Radiance (.hdr) environment map.
 *
 * public/hdri/city.hdr is 1.5 MB — the single largest asset the site serves —
 * and it costs an RGBE decode plus PMREM cubemap generation on the main thread
 * at exactly the wrong moment. The robot's two materials are metalness 1.0, so
 * they take nearly all their light from it and it cannot simply be dropped;
 * but it is only ever used as image-based lighting, never shown as a
 * background, so it does not need to be sharp.
 *
 * Radiance RGBE is a simple format, and no library here reads it, so this does
 * it directly: parse the header, decode the (usually RLE) scanlines to floats,
 * box-filter down, re-encode as flat RGBE.
 *
 *   node scripts/shrink-hdri.mjs <in.hdr> <out.hdr> <width>
 *
 * Verify the result by SAMPLING THE RENDERED CANVAS, not by eye — see
 * PROJECT_BIBLE.md §5 and §11. A wrong env map does not error, it just makes
 * the robot subtly darker.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [, , IN, OUT, WIDTH_ARG] = process.argv;
if (!IN || !OUT || !WIDTH_ARG) {
  console.error('usage: node scripts/shrink-hdri.mjs <in.hdr> <out.hdr> <width>');
  process.exit(1);
}
const TARGET_W = Number(WIDTH_ARG);

const buf = readFileSync(IN);

/* ── Header ─────────────────────────────────────────────────────────────── */
let p = 0;
const line = () => { let s = ''; while (buf[p] !== 0x0a) s += String.fromCharCode(buf[p++]); p++; return s; };

if (!line().startsWith('#?')) throw new Error('not a Radiance file');
let l;
while ((l = line()) !== '') { /* FORMAT/EXPOSURE/etc — all defaults are fine */ }
const dims = line().match(/-Y (\d+) \+X (\d+)/);
if (!dims) throw new Error('unsupported resolution line (need "-Y h +X w")');
const H = +dims[1], W = +dims[2];

/* ── Decode scanlines to float RGB ──────────────────────────────────────── */
const rgbe = new Uint8Array(W * 4);
const img = new Float32Array(W * H * 3);

const toFloat = (row, y) => {
  for (let x = 0; x < W; x++) {
    const e = row[x * 4 + 3];
    const f = e ? Math.pow(2, e - 136) : 0; // 2^(e-128) / 256
    const o = (y * W + x) * 3;
    img[o] = row[x * 4] * f;
    img[o + 1] = row[x * 4 + 1] * f;
    img[o + 2] = row[x * 4 + 2] * f;
  }
};

for (let y = 0; y < H; y++) {
  if (buf[p] === 2 && buf[p + 1] === 2 && ((buf[p + 2] << 8) | buf[p + 3]) === W && W >= 8 && W < 32768) {
    p += 4; // adaptive RLE
    for (let c = 0; c < 4; c++) {
      let x = 0;
      while (x < W) {
        let n = buf[p++];
        if (n > 128) { const v = buf[p++]; n -= 128; while (n--) rgbe[(x++) * 4 + c] = v; }
        else { while (n--) rgbe[(x++) * 4 + c] = buf[p++]; }
      }
    }
  } else {
    for (let x = 0; x < W; x++) for (let c = 0; c < 4; c++) rgbe[x * 4 + c] = buf[p++];
  }
  toFloat(rgbe, y);
}

/* ── Box-filter down (integer ratio keeps every source pixel weighted once) ─ */
const TARGET_H = Math.round(TARGET_W / 2); // equirectangular is always 2:1
const sx = W / TARGET_W, sy = H / TARGET_H;
const out = new Float32Array(TARGET_W * TARGET_H * 3);
for (let y = 0; y < TARGET_H; y++) {
  const y0 = Math.floor(y * sy), y1 = Math.min(H, Math.ceil((y + 1) * sy));
  for (let x = 0; x < TARGET_W; x++) {
    const x0 = Math.floor(x * sx), x1 = Math.min(W, Math.ceil((x + 1) * sx));
    let r = 0, g = 0, b = 0, n = 0;
    for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) {
      const o = (yy * W + xx) * 3; r += img[o]; g += img[o + 1]; b += img[o + 2]; n++;
    }
    const o = (y * TARGET_W + x) * 3;
    out[o] = r / n; out[o + 1] = g / n; out[o + 2] = b / n;
  }
}

/* ── Re-encode as flat RGBE ─────────────────────────────────────────────── */
const header = Buffer.from(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${TARGET_H} +X ${TARGET_W}\n`, 'ascii');
const body = Buffer.alloc(TARGET_W * TARGET_H * 4);
for (let i = 0, j = 0; i < out.length; i += 3, j += 4) {
  const max = Math.max(out[i], out[i + 1], out[i + 2]);
  if (max < 1e-32) { body[j] = body[j + 1] = body[j + 2] = body[j + 3] = 0; continue; }
  const e = Math.ceil(Math.log2(max));
  const f = Math.pow(2, -e) * 256;
  body[j] = Math.min(255, Math.floor(out[i] * f));
  body[j + 1] = Math.min(255, Math.floor(out[i + 1] * f));
  body[j + 2] = Math.min(255, Math.floor(out[i + 2] * f));
  body[j + 3] = e + 128;
}
writeFileSync(OUT, Buffer.concat([header, body]));

/* ── Report mean radiance, so a gross error is visible immediately ──────── */
const mean = (a) => { let r = 0, g = 0, b = 0; for (let i = 0; i < a.length; i += 3) { r += a[i]; g += a[i + 1]; b += a[i + 2]; } const n = a.length / 3; return [r / n, g / n, b / n].map((v) => v.toFixed(4)); };
console.log(`${IN}  ${W}x${H}  ${(buf.length / 1024).toFixed(0)}KB   mean RGB ${mean(img).join(' / ')}`);
console.log(`${OUT}  ${TARGET_W}x${TARGET_H}  ${(header.length + body.length) / 1024 | 0}KB   mean RGB ${mean(out).join(' / ')}`);
