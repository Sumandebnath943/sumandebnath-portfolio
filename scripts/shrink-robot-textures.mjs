/**
 * Halves robot.glb's texture resolution, without touching the FBX pipeline.
 *
 * The model ships 8 textures at 1024x1024 — 414 KB of a 1071 KB file — but it
 * is drawn at ~200x290 px in the corner and a few hundred px in the chat
 * takeover. 1024 is heavily oversampled at those sizes; 512 is indistinguishable
 * and costs a quarter of the texture memory, bytes and decode time.
 *
 * This reads the built glb and rewrites it rather than rebuilding from
 * _source-fbx/ — no fbx2gltf, no 847 MB of input.
 *
 *   node scripts/shrink-robot-textures.mjs [outfile]
 *
 * ⚠ Textures ONLY. The first version of this script also ran `meshopt()`,
 *   whose internal prune stripped a Skin and 71 accessors — i.e. it quietly
 *   removed the rig from a rigged character. The geometry here is already
 *   meshopt-compressed and needs nothing done to it. The structural diff at the
 *   end exists so that class of damage can never ship silently: it compares
 *   meshes, skins, joints, clips and vertices, and exits non-zero on any drift.
 *
 * ⚠ The output MUST be a new filename. /robot.glb is served immutable for a
 *   year, so overwriting it in place ships nothing to anyone who has already
 *   visited. See PROJECT_BIBLE.md §10.1.
 */
import { statSync } from 'node:fs';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { textureCompress } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import sharp from 'sharp';

const SRC = 'public/robot.glb';
const OUT = process.argv[2] ?? 'public/robot-v2.glb';
const SIZE = 512;

await MeshoptEncoder.ready;
await MeshoptDecoder.ready;

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });

/** Everything that must survive the rewrite untouched. */
const shape = (doc) => {
  const root = doc.getRoot();
  return {
    meshes: root.listMeshes().length,
    primitives: root.listMeshes().reduce((n, m) => n + m.listPrimitives().length, 0),
    vertices: root.listMeshes().reduce(
      (n, m) => n + m.listPrimitives().reduce((k, p) => k + p.getAttribute('POSITION').getCount(), 0), 0),
    skins: root.listSkins().length,
    joints: root.listSkins().reduce((n, s) => n + s.listJoints().length, 0),
    clips: root.listAnimations().map((a) => a.getName()).sort().join(','),
    channels: root.listAnimations().reduce((n, a) => n + a.listChannels().length, 0),
    materials: root.listMaterials().length,
  };
};

const doc = await io.read(SRC);
const before = shape(doc);
const texBefore = doc.getRoot().listTextures().map((t) => t.getImage().byteLength).reduce((a, b) => a + b, 0);

await doc.transform(textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [SIZE, SIZE] }));

const after = shape(doc);
const texAfter = doc.getRoot().listTextures().map((t) => t.getImage().byteLength).reduce((a, b) => a + b, 0);

const drift = Object.keys(before).filter((k) => String(before[k]) !== String(after[k]));
if (drift.length) {
  console.error('REFUSING TO WRITE — the model changed shape:');
  for (const k of drift) console.error(`  ${k}: ${before[k]}  ->  ${after[k]}`);
  process.exit(1);
}

await io.write(OUT, doc);

console.log('structure  unchanged:', JSON.stringify(before));
console.log('textures  ', Math.round(texBefore / 1024) + 'KB ->', Math.round(texAfter / 1024) + 'KB');
for (const t of doc.getRoot().listTextures()) {
  const meta = await sharp(Buffer.from(t.getImage())).metadata();
  console.log(`   ${meta.width}x${meta.height}  ${Math.round(t.getImage().byteLength / 1024)}KB  ${t.getName()}`);
}
console.log('file      ', Math.round(statSync(SRC).size / 1024) + 'KB ->', Math.round(statSync(OUT).size / 1024) + 'KB', `(${OUT})`);
