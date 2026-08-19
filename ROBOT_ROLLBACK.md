# Robot mascot — what changed, and how to undo any of it

**Read this when the robot looks or behaves wrong.** It is organised by
*symptom*, because that is how the problem arrives: "the robot looks off" or
"it's frozen", not "the frame loop is misconfigured".

The mascot is mounted in the **root layout**, so everything here affects every
page. Its parts:

| File | Role |
|---|---|
| `components/robot/RobotMascot.tsx` | The corner robot: position, chase, quips, entrance, reveal timing |
| `components/robot/RobotCanvas.tsx` | Its WebGL canvas, `FrameLimiter`, dpr, lights, context recovery |
| `components/robot/RobotModel.tsx` | Loads the glb, drives the animation mixer, crossfades clips |
| `components/robot/TakeoverRobotCanvas.tsx` | The big robot in the chat takeover |
| `components/robot/ChatTakeover.tsx` | The chat panel and its launcher pill |
| `lib/intro.ts` | *When* the robot appears |
| `app/globals.css` | `sd-robot-enter` — the first-visit entrance keyframe |

---

## 1. Symptom → cause → fix

### The robot is frozen — visible, but not animating

**Most likely: the frame loop.** Both canvases run `frameloop="demand"`, which
means **nothing renders unless something calls `invalidate()`**. That work is
done by `FrameLimiter` in `RobotCanvas.tsx`. If it stops, you get a single
static frame — no error, no warning.

Check, in the browser console, that draw calls are still happening:

```js
const cv = [...document.querySelectorAll('canvas')].find(c => { const r = c.getBoundingClientRect(); return r.width > 100 && r.width < 260 && r.height > 150; });
const gl = cv.getContext('webgl2') || cv.getContext('webgl');
let n = 0; const o = gl.drawElements.bind(gl); gl.drawElements = (...a) => { n++; return o(...a); };
setTimeout(() => console.log('draw calls/sec:', n / 3), 3000);
```

Expect **~59/sec at rest** (30fps × 2 draws). `0` means the limiter is dead;
`~119` means it reverted to always-on.

**Undo:** in `RobotCanvas.tsx` and `TakeoverRobotCanvas.tsx`, remove
`frameloop="demand"` and the `<FrameLimiter …/>` line. That restores the
pre-Tier-B behaviour of rendering every frame.

> Before blaming the code: rAF is suspended entirely in a non-compositing
> browser tab, which freezes the robot, CSS transitions and framer-motion all at
> once. Confirm rAF is alive first —
> `let t=0;const f=()=>{t++;requestAnimationFrame(f)};f();setTimeout(()=>console.log('rAF/sec',t/2),2000)`
> should print ~60, not 0.

### The robot looks soft, blurry, or slightly jagged

**Cause: `dpr={[1, 1.5]}`**, lowered from `[1, 2]`. On a 2× display that is 56%
of the pixels; on a 3× phone, 25%.

**Undo:** set `dpr={[1, 2]}` in both canvases.

Antialiasing is deliberately still **on**. Turning it off is the obvious next
saving and the wrong one — the robot is a dark silhouette on a transparent
background, which is exactly where jagged edges show.

### The robot is too dark, or has lost the sheen on its skin

Both materials are **`metalness: 1.0`**, which means they take nearly all their
light from the environment map. If that map is missing or wrong, the robot goes
near-black and flat. Two different causes:

**(a) It went dark after you alt-tabbed away and came back.** The browser
discarded the WebGL context. three re-uploads image textures on restore, but the
environment ends up as a GPU-side PMREM cubemap that nothing regenerates. Both
canvases listen for `webglcontextrestored` and remount to rebuild it. If this is
back, check that listener still exists in `RobotCanvas.tsx`.

**(b) It has been dark since the Tier B deploy.** Suspect the smaller
environment map, `/hdri/city-256.hdr` (down from 1.5 MB).

**Undo:** point both `<Environment files=…>` at a larger map. Regenerate one
first — only the 256 version is committed under `public/`:

```bash
node scripts/shrink-hdri.mjs _masters/hdri/city.hdr public/hdri/city-512.hdr 512
```

…or go all the way back to the full-size master by copying
`_masters/hdri/city.hdr` into `public/hdri/` and referencing it.

> Verify by **sampling the canvas, not by eye** — a wrong map does not error, it
> just looks slightly off. At rest the robot's mean RGB over opaque pixels is
> about **26.6 / 25.6 / 26.6**. Materially darker means the environment is not
> being applied. The method is in `PROJECT_BIBLE.md` §11.

### The robot's texture detail looks coarse

**Cause: `/robot-v2.glb`**, whose textures are 512² instead of 1024².

**Undo:** regenerate at full size and point at it:

```bash
node scripts/shrink-robot-textures.mjs public/robot-v3.glb   # edit SIZE to 1024 first
```

…or copy `_masters/robot.glb` into `public/` and reference it directly. Then
update **both** `useGLTF("/robot-v2.glb")` and `useGLTF.preload(…)` in
`RobotModel.tsx`, and the literal in `next.config.ts` `headers()`.

### The robot slides in from the right when it shouldn't

The first-visit entrance (`sd-robot-enter` in `globals.css`) is a CSS keyframe,
and **a CSS animation restarts whenever its element mounts**. `RobotMascot`
returns `null` while the chat is open, so closing the chat re-mounts the
subtree. Guarded by the `entering` state, which is set to `false` when the
entrance finishes — if that guard is removed, the entrance replays on every chat
close, and it *slides* rather than runs because the chat-close reset has already
set the clip to `"Idle"`.

**Undo the entrance entirely:** drop the `sd-robot-enter` class from the wrapper
in `RobotMascot.tsx`.

### The robot's run stutters, or the chase feels laggy

The frame rate is meant to rise to 60 while it travels. `RobotMascot` derives it
from the clip: `anim === "Running" || anim === "Jumping" ? 60 : 30`. If a new
clip is added that involves travel, add it there.

### The robot arrives too late, too early, or in the wrong order

Nothing to do with rendering — timings live in **`lib/intro.ts`**, and the order
is nav → mascot → chat on both a first visit and a reload. See
`PROJECT_BIBLE.md` §10.0.

### The robot never appears at all

In order: is the glb 404ing (`/robot-v2.glb`)? Did the reveal fire (see
`lib/intro.ts`)? Is `chatOpen` stuck true? Does the canvas exist in the DOM but
with size `300×150` — that is R3F never having measured its container, which
happens when the page was loaded in a background tab.

---

## 2. Rollback points

### Full rollback of Tier B

Everything on this page was introduced together on 19 Aug 2026. The tag is the
state immediately before it, and is the last state that was deployed and
confirmed good (PSI 92 mobile / 72 desktop):

```bash
git reset --hard checkpoint-pre-tier-b
git push --force-with-lease origin main
```

### Rolling back one thing

Each item is independent, and none requires touching the others:

| Change | Where | Undo |
|---|---|---|
| 30fps idle render | `RobotCanvas.tsx`, `TakeoverRobotCanvas.tsx` | remove `frameloop="demand"` + `<FrameLimiter/>` |
| 60fps while moving | `RobotMascot.tsx` | set `const fps = 60` |
| dpr 1.5 | both canvases | `dpr={[1, 2]}` |
| 512² textures | `RobotModel.tsx` (×2), `next.config.ts` | point at a glb built from `_masters/robot.glb` |
| 256×128 environment | both canvases | point at a larger map from `_masters/hdri/city.hdr` |
| Entrance run-in | `RobotMascot.tsx`, `globals.css` | drop the `sd-robot-enter` class |
| WebGL context recovery | both canvases | remove the `webglcontextrestored` listener |

### The originals

`_masters/` holds the **exact assets served before Tier B**, committed and
unserved: `robot.glb` (1024² textures) and `hdri/city.hdr` (1024×512, 1.5 MB).
They are also the inputs to the two shrink scripts. See `_masters/README.md`.

They are **not** in `_source-*` — those folders are git-ignored and exist only on
one machine. These are in the repository on purpose, so the robot can always be
rebuilt.

---

## 3. Anything renamed must stay renamed

`/robot-*.glb` and `/hdri/*` are served `Cache-Control: immutable` for a year.
**Overwriting a served file in place ships the change to nobody who has already
visited** — no revalidation, no 304, and a hard refresh will not help real
visitors. Any replacement needs a new filename and four updates:

1. `components/robot/RobotModel.tsx` — `useGLTF(…)` **and** `useGLTF.preload(…)`
2. `next.config.ts` — the literal in `headers()` (glb only; `/hdri/:file*` is a
   prefix match and needs no change)
3. `PROJECT_BIBLE.md` §10.1 — the asset table
4. This file

---

## 4. What Tier B actually bought

Measured on a production build, at rest:

| | Before | After |
|---|---|---|
| Draw calls/sec | 119 | **59** |
| `robot.glb` over the wire | 838 KB | **572 KB** |
| Environment map | 1505 KB | **128 KB** |

Roughly **1.7 MB** off every page and **half** the mascot's continuous render
work. If the robot ever needs to be made cheaper still, the remaining levers are
skipping it entirely below a viewport width, or on low core counts — both change
behaviour rather than fidelity, and neither has been done.
