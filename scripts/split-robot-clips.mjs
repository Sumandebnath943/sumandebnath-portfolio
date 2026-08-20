/**
 * Splits _masters/robot.glb into a core model plus animation-only side files.
 *
 *   node scripts/split-robot-clips.mjs
 *
 * ⚠ MEASURED 20 AUG 2026: THIS DOES NOT PAY. DO NOT SHIP ITS OUTPUT.
 *
 *   single file, 16 clips   1021 KB raw   654 KB brotli
 *   core, 13 clips           985 KB raw   650 KB brotli
 *   robot-clips-404.glb      348 KB raw   207 KB brotli
 *   robot-clips-journey.glb  342 KB raw   207 KB brotli
 *
 * It saves **4 KB per page** and costs **207 KB** on each of the two pages that
 * load a side file. Strictly worse than shipping one file.
 *
 * The reasoning below was built on scripts/inspect-robot-glb.mjs's per-clip
 * figures, and that is the trap: those are **decoded** accessor bytes. The glb
 * stores animation meshopt-quantized and the wire adds brotli on top, so three
 * clips worth 485 KB decoded contribute almost nothing to transfer. Isolated in
 * a side file the same clips lose the shared quantization context and compress
 * far worse — which is why two files with one and two clips both land on 207 KB.
 *
 * Kept because the split is an obvious idea that will occur to somebody again,
 * and because the numbers above are the answer. If it is ever revisited, build
 * the core through build-robot-glb.mjs with a shortened CLIPS list rather than
 * re-encoding here — re-running meshopt() over an already-encoded file inflates
 * it, which muddied this comparison before the like-for-like rebuild settled it.
 *
 * WHY IT WAS WRITTEN
 *
 * The mascot is mounted in the root layout, so its glb is fetched on **every
 * page** and is cached immutable for a year (PROJECT_BIBLE.md §10.1). That
 * makes its size a site-wide budget item, and animation is ~96% of it —
 * measured with scripts/inspect-robot-glb.mjs, not guessed.
 *
 * Three of the sixteen clips are used on exactly one page each:
 *
 *   Sleeping      264 KB   404 only
 *   SittingIdle   163 KB   /journey only
 *   SillyDancing   58 KB   404 only
 *
 * That is 485 KB of animation — 42% of it — downloaded on every page of the
 * site to serve two of them. Shipping one file costs +122 KB brotli per page
 * over the previous nine-clip model; splitting brings it to +27 KB.
 *
 * WHAT COMES OUT
 *
 *   _masters/robot-core.glb        mesh + skin + the 13 site-wide clips
 *   public/robot-clips-404.glb     nodes + Sleeping, SillyDancing. No mesh.
 *   public/robot-clips-journey.glb nodes + SittingIdle. No mesh.
 *
 * The side files keep the node hierarchy because glTF animation channels
 * target nodes, and three binds tracks to a skeleton BY NAME. Same rig, same
 * names, so the clips play on the already-loaded core skeleton. They carry no
 * mesh, material or texture — those would be a duplicate of what the core file
 * already delivered.
 *
 * Then, as usual:
 *   node scripts/shrink-robot-textures.mjs public/robot-v3.glb _masters/robot-core.glb
 */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { prune, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import { statSync } from 'node:fs';

/**
 * Re-compress and write.
 *
 * Reading a glb DECODES its meshopt compression, and writing does not put it
 * back on its own. Skip this and the "smaller" core file comes out *larger*
 * than the master it was cut down from — which is exactly what happened first
 * time: 1215 KB in, 1254 KB out, with three clips removed.
 *
 * `meshopt()` is also the step the repo has been bitten by before: an earlier
 * version of shrink-robot-textures.mjs ran it and its internal prune stripped a
 * Skin and 71 accessors, quietly removing the rig from a rigged character. So
 * every write here is shape-checked against what went in.
 */
async function writeCompressed(doc, out, expect) {
  await doc.transform(prune(), meshopt({ encoder: MeshoptEncoder, level: 'high' }));
  doc.createExtension(EXTMeshoptCompression).setRequired(true);

  const root = doc.getRoot();
  const got = {
    clips: root.listAnimations().map((a) => a.getName()).sort().join(','),
    channels: root.listAnimations().reduce((n, a) => n + a.listChannels().length, 0),
    skins: root.listSkins().length,
    joints: root.listSkins().reduce((n, s) => n + s.listJoints().length, 0),
    vertices: root.listMeshes().reduce(
      (n, m) => n + m.listPrimitives().reduce((k, p) => k + p.getAttribute('POSITION').getCount(), 0), 0),
  };
  const drift = Object.keys(expect).filter((k) => String(expect[k]) !== String(got[k]));
  if (drift.length) {
    console.error(`REFUSING TO WRITE ${out} — shape changed during compression:`);
    for (const k of drift) console.error(`  ${k}: ${expect[k]}  ->  ${got[k]}`);
    process.exit(1);
  }
  await io.write(out, doc);
  return got;
}

/** clip name -> which side file it moves into. Everything else stays in core. */
const BUNDLES = {
  '404': ['Sleeping', 'SillyDancing'],
  journey: ['SittingIdle'],
};

await MeshoptEncoder.ready;
await MeshoptDecoder.ready;

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });

const SRC = '_masters/robot.glb';
const kb = (p) => Math.round(statSync(p).size / 1024) + ' KB';

const moved = new Set(Object.values(BUNDLES).flat());

// Sanity: every clip named above must actually exist, or the split silently
// ships a core file that still carries the clip AND a side file that is empty.
{
  const doc = await io.read(SRC);
  const have = new Set(doc.getRoot().listAnimations().map((a) => a.getName()));
  const missing = [...moved].filter((n) => !have.has(n));
  if (missing.length) {
    console.error('REFUSING TO SPLIT — clips not present in ' + SRC + ':', missing.join(', '));
    console.error('  present:', [...have].join(', '));
    process.exit(1);
  }
}

/* ── Side files: nodes + their own clips, nothing else ──────────────────── */

for (const [name, clips] of Object.entries(BUNDLES)) {
  const doc = await io.read(SRC);
  const root = doc.getRoot();

  for (const anim of root.listAnimations()) {
    if (!clips.includes(anim.getName())) anim.dispose();
  }
  // Drop everything that is purely about *drawing* the robot. The nodes stay:
  // the animation channels point at them, and prune() keeps anything still
  // referenced. Disposing the skin is safe for the same reason — joints are
  // ordinary nodes, and the channels are what hold them alive.
  for (const mesh of root.listMeshes()) mesh.dispose();
  for (const skin of root.listSkins()) skin.dispose();
  for (const mat of root.listMaterials()) mat.dispose();
  for (const tex of root.listTextures()) tex.dispose();

  await doc.transform(prune());

  const channelsBefore = root.listAnimations().reduce((n, a) => n + a.listChannels().length, 0);
  if (!channelsBefore) {
    console.error(`  ⚠ ${name}: NO CHANNELS — the clips lost their targets. Do not ship this.`);
    process.exit(1);
  }

  const out = `public/robot-clips-${name}.glb`;
  const got = await writeCompressed(doc, out, {
    clips: clips.slice().sort().join(','),
    channels: channelsBefore,
    skins: 0,
    joints: 0,
    vertices: 0,
  });
  console.log(
    `wrote ${out.padEnd(34)} ${kb(out).padStart(8)}  clips=${got.clips}  channels=${got.channels}  nodes=${root.listNodes().length}`,
  );
}

/* ── Core: everything except the moved clips ────────────────────────────── */

{
  const doc = await io.read(SRC);
  const root = doc.getRoot();
  for (const anim of root.listAnimations()) {
    if (moved.has(anim.getName())) anim.dispose();
  }
  await doc.transform(prune());

  const expect = {
    clips: root.listAnimations().map((a) => a.getName()).sort().join(','),
    channels: root.listAnimations().reduce((n, a) => n + a.listChannels().length, 0),
    // These three are the rig, and they are what meshopt's internal prune has
    // destroyed here before. If any of them moves, nothing is written.
    skins: root.listSkins().length,
    joints: root.listSkins().reduce((n, s) => n + s.listJoints().length, 0),
    vertices: root.listMeshes().reduce(
      (n, m) => n + m.listPrimitives().reduce((k, p) => k + p.getAttribute('POSITION').getCount(), 0), 0),
  };

  const out = '_masters/robot-core.glb';
  const got = await writeCompressed(doc, out, expect);
  console.log(
    `wrote ${out.padEnd(34)} ${kb(out).padStart(8)}  clips=${got.clips.split(',').length}  skins=${got.skins}  joints=${got.joints}  vertices=${got.vertices}`,
  );
}

console.log(`
  Next:
    node scripts/shrink-robot-textures.mjs public/robot-v3.glb _masters/robot-core.glb
    node scripts/inspect-robot-glb.mjs public/robot-v3.glb
`);
