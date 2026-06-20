/**
 * Builds public/robot.glb from the Mixamo .fbx sources in /_source-fbx.
 *
 * Each .fbx is one Mixamo clip (mesh + skeleton + a single "mixamo.com"
 * animation). They all share the same 65-joint rig, so we keep ONE mesh and
 * attach all 9 animation clips, then shrink the 4K textures to 1024 WebP and
 * meshopt-compress everything. ~887 MB of FBX -> ~1 MB robot.glb.
 *
 *   npm i -D fbx2gltf @gltf-transform/core @gltf-transform/extensions \
 *            @gltf-transform/functions meshoptimizer sharp
 *   node scripts/build-robot-glb.mjs
 */
import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import convert from 'fbx2gltf';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { dedup, prune, weld, textureCompress, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import sharp from 'sharp';

// [source .fbx basename, exported clip name]
const CLIPS = [
  ['Idle', 'Idle'],
  ['Happy Idle', 'HappyIdle'],
  ['Sad Idle', 'SadIdle'],
  ['Jumping', 'Jumping'],
  ['Looking', 'Looking'],
  ['Running', 'Running'],
  ['Talking', 'Talking'],
  ['Talking 2', 'Talking2'],
  ['Waving', 'Waving'],
];

await MeshoptEncoder.ready;
await MeshoptDecoder.ready;

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });

// fbx2gltf is unreliable writing into the OS temp dir on Windows, so use a
// local scratch folder (gitignored) and clean it up at the end.
const tmp = 'tmp_glb';
mkdirSync(tmp, { recursive: true });
const glbPath = {};
for (const [file] of CLIPS) {
  const out = join(tmp, file.replace(/\s+/g, '_') + '.glb');
  await convert(`_source-fbx/${file}.fbx`, out, ['--binary']);
  glbPath[file] = out;
  console.log('converted', file);
}

// First clip provides the mesh + skin; we strip its animation and re-add all clips.
const base = await io.read(glbPath[CLIPS[0][0]]);
base.getRoot().listAnimations().forEach((a) => a.dispose());

const buffer = base.getRoot().listBuffers()[0];
const nodeByName = new Map();
base.getRoot().listNodes().forEach((n) => nodeByName.set(n.getName(), n));

const copyAccessor = (src) => {
  const acc = base.createAccessor().setType(src.getType()).setArray(src.getArray().slice()).setBuffer(buffer);
  if (src.getNormalized()) acc.setNormalized(true);
  return acc;
};

for (const [file, name] of CLIPS) {
  const src = await io.read(glbPath[file]);
  const srcAnim = src.getRoot().listAnimations()[0];
  const anim = base.createAnimation(name);
  const samplerMap = new Map();
  for (const ch of srcAnim.listChannels()) {
    const baseNode = nodeByName.get(ch.getTargetNode()?.getName());
    if (!baseNode) continue;
    const srcSampler = ch.getSampler();
    let sampler = samplerMap.get(srcSampler);
    if (!sampler) {
      sampler = base.createAnimationSampler()
        .setInterpolation(srcSampler.getInterpolation())
        .setInput(copyAccessor(srcSampler.getInput()))
        .setOutput(copyAccessor(srcSampler.getOutput()));
      anim.addSampler(sampler);
      samplerMap.set(srcSampler, sampler);
    }
    anim.addChannel(
      base.createAnimationChannel().setTargetNode(baseNode).setTargetPath(ch.getTargetPath()).setSampler(sampler)
    );
  }
  console.log('+ clip', name);
}

// Mixamo clips (esp. Running) carry root motion: the hips drift forward over
// the loop. We anchor the hips' horizontal (X/Z) translation to frame 0 so every
// clip animates "in place" — the controller moves the whole canvas instead.
// Vertical (Y) is kept so jumps / bobs still read.
const HIPS = 'mixamorig:Hips';
for (const anim of base.getRoot().listAnimations()) {
  for (const ch of anim.listChannels()) {
    if (ch.getTargetPath() === 'translation' && ch.getTargetNode()?.getName() === HIPS) {
      const acc = ch.getSampler().getOutput();
      const arr = acc.getArray().slice();
      const x0 = arr[0], z0 = arr[2];
      for (let i = 0; i < arr.length; i += 3) { arr[i] = x0; arr[i + 2] = z0; }
      acc.setArray(arr);
    }
  }
}

await base.transform(
  dedup(),
  prune(),
  weld(),
  textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024] }),
  meshopt({ encoder: MeshoptEncoder, level: 'high' }),
);
base.createExtension(EXTMeshoptCompression).setRequired(true);

await io.write('public/robot.glb', base);
rmSync(tmp, { recursive: true, force: true });
console.log('WROTE public/robot.glb', base.getRoot().listAnimations().map((a) => a.getName()));
