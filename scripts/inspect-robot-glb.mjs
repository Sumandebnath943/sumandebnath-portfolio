/**
 * Reports what is actually inside a robot glb.
 *
 *   node scripts/inspect-robot-glb.mjs [path]        # default: public/robot-v2.glb
 *
 * Two questions this answers, both of which have a silent-failure mode:
 *
 * 1. **Did every clip survive the build?** scripts/build-robot-glb.mjs matches
 *    animation channels to bones BY NAME and skips anything it cannot match
 *    (`if (!baseNode) continue;`). A clip from a different Mixamo character
 *    therefore produces a named, loadable, playable animation that moves
 *    nothing at all. Nothing errors. A healthy clip here carries ~50+ channels;
 *    single digits mean the rig did not match.
 *
 * 2. **What is the file actually made of?** The mascot is mounted in the root
 *    layout and fetched on every page, so its size is a site-wide budget item
 *    (PROJECT_BIBLE.md §10.1). Knowing the split between texture bytes,
 *    geometry bytes and animation bytes is what makes "can we afford more
 *    clips" a decision rather than a guess.
 */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';
import { statSync } from 'node:fs';

const path = process.argv[2] ?? 'public/robot-v2.glb';

await MeshoptDecoder.ready;
await MeshoptEncoder.ready;

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });

const doc = await io.read(path);
const root = doc.getRoot();

const kb = (b) => (b / 1024).toFixed(1) + ' KB';
const onDisk = statSync(path).size;

// ── Clips ────────────────────────────────────────────────────────────────
const anims = root.listAnimations();
let animBytes = 0;
const rows = anims.map((a) => {
  const channels = a.listChannels().length;
  let bytes = 0;
  let maxT = 0;
  for (const s of a.listSamplers()) {
    const inp = s.getInput();
    const out = s.getOutput();
    if (inp) {
      bytes += inp.getArray().byteLength;
      const arr = inp.getArray();
      if (arr.length) maxT = Math.max(maxT, arr[arr.length - 1]);
    }
    if (out) bytes += out.getArray().byteLength;
  }
  animBytes += bytes;
  return { name: a.getName(), channels, seconds: +maxT.toFixed(2), bytes };
});

// ── Textures ─────────────────────────────────────────────────────────────
let texBytes = 0;
const textures = root.listTextures().map((t) => {
  const img = t.getImage();
  const size = img ? img.byteLength : 0;
  texBytes += size;
  return { name: t.getName() || '(unnamed)', mime: t.getMimeType(), size: t.getSize()?.join('x'), bytes: size };
});

// ── Mesh ─────────────────────────────────────────────────────────────────
let verts = 0;
const seen = new Set();
for (const mesh of root.listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute('POSITION');
    if (pos && !seen.has(pos)) { seen.add(pos); verts += pos.getCount(); }
  }
}
const joints = root.listSkins().reduce((n, s) => n + s.listJoints().length, 0);

console.log(`\n${path} — ${kb(onDisk)} on disk\n`);
console.log(`  meshes ${root.listMeshes().length} · vertices ${verts} · skins ${root.listSkins().length} · joints ${joints}`);
console.log(`  clips ${anims.length} · channels ${rows.reduce((n, r) => n + r.channels, 0)}\n`);

const w = Math.max(...rows.map((r) => r.name.length), 6);
console.log('  ' + 'clip'.padEnd(w) + '  channels   seconds     bytes');
for (const r of rows) {
  const flag = r.channels < 20 ? '   ⚠ RIG MISMATCH?' : '';
  console.log(
    '  ' + r.name.padEnd(w) +
    String(r.channels).padStart(10) +
    String(r.seconds).padStart(10) +
    kb(r.bytes).padStart(11) + flag,
  );
}

console.log('\n  textures:');
for (const t of textures) console.log(`    ${t.name} ${t.mime} ${t.size} — ${kb(t.bytes)}`);

const other = onDisk - animBytes - texBytes;
const pct = (b) => ((b / onDisk) * 100).toFixed(1) + '%';
console.log(`\n  ── what the file is made of ──`);
console.log(`    animation  ${kb(animBytes).padStart(10)}  ${pct(animBytes)}`);
console.log(`    textures   ${kb(texBytes).padStart(10)}  ${pct(texBytes)}`);
console.log(`    geometry + everything else ${kb(other).padStart(10)}  ${pct(other)}\n`);
