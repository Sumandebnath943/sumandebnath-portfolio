# Page optimization — the standing reference

Everything this site does about performance: what was changed, what was measured,
what the traps are, and what was deliberately **not** done and why.

Read **§1 before running a single test.** More time was lost this session to
believing bad measurements than to any actual optimisation work.

Companion documents: `PROJECT_BIBLE.md` (how the system is built),
`ROBOT_ROLLBACK.md` (symptom-indexed undo for the 3D mascot),
`_masters/README.md` (the full-resolution originals).

---

## 1. How to measure this site without fooling yourself

This page has properties that break the usual assumptions. All four of the
following have produced confidently wrong numbers.

### 1.1 A single PSI run is not a measurement

Recorded scores for substantially similar builds, all on the same day:

| Stage | LH mobile | LH desktop | PSI mobile | PSI desktop |
|---|---|---|---|---|
| Baseline | 58 | 98 ⚠ | **30** | 60 |
| After Tier A + intro work | 65 | 87 | **92** | 72 |
| After Tier B | 67 | 94 | **67** | 79 |
| After font preload fix | — | — | **94** | 88 |

PSI mobile read **30, then 92, then 67, then 94**. Take the **median of three
runs per form factor**, or do not quote the number.

### 1.2 The trace often ends before the mascot loads

The mascot reveals **~6.6 s** into a first visit (loader ~4.1 s, then +2.5 s).
Lighthouse traces on this site have ended at **2.4 s–5.3 s**. When that happens
the report contains **no `robot-v2.glb` and no `city-256.hdr`** — it is scoring a
page without its most expensive component.

**Always check this first.** In the JSON:

```bash
node -e "const l=require('./report.json').lighthouseResult??require('./report.json');
console.log(l.audits['network-requests'].details.items.filter(i=>/robot|hdri/.test(i.url)).map(i=>i.url))"
```

Empty means the robot was not measured. The score is real but incomplete — say
so rather than quoting it as the whole page.

### 1.3 Local Lighthouse must run in a clean profile

The baseline local runs scored **Best Practices 73** purely from Chrome
extensions in the profile (an Adobe extension and a search analyser), and
inflated "unused JavaScript" by ~240 KB with extension code. **Run incognito
with extensions disabled.** PSI scored the same page 100.

### 1.4 The lab score is not the goal — these are the honest metrics

| What | How | Why |
|---|---|---|
| **Draw calls/sec** | §6.1 | The mascot's real cost. Cannot be flattered by where a trace ends. |
| **Canvas mean RGB** | §6.2 | Whether the robot still looks right after an asset change. |
| **Vercel Speed Insights** | already installed | Real-visitor LCP/INP. The field truth. |

> **Smaller assets can make the score worse.** Shrinking the environment map
> 1505 KB → 128 KB meant the robot began rendering *sooner*, so more of its work
> landed inside the trace. Tier B made the page cheaper and made Lighthouse see
> more of the expensive part, simultaneously. Both are true.

### 1.5 The browser preview pane silently suspends rAF

Repeatedly this session the Browser pane stopped compositing. Symptoms:
`document.visibilityState === "hidden"`, R3F canvases frozen at their default
`300×150`, framer-motion animations never advancing, CSS transitions stuck, and
**layout reads returning `0` for elements with explicit pixel widths**.

Every animation path dies at once and it looks exactly like a real bug. **Prove
rAF is alive before diagnosing anything animated:**

```js
let t=0; const f=()=>{t++;requestAnimationFrame(f)}; f();
setTimeout(()=>console.log('rAF/sec', t/2), 2000);   // expect ~60, not 0
```

If it prints 0, every animation observation from that session is void. Verify by
DOM state (inline styles, class lists, `getAttribute`) which does not need rAF.

---

## 2. Where the site stands

Measured 19 Aug 2026, PSI, production.

| | Mobile | Desktop |
|---|---|---|
| **Performance** | **94** | **88** |
| Accessibility · Best Practices · SEO · Agentic | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| FCP | 1.20 s | 0.32 s |
| LCP | 2.78 s | 0.58 s |
| **TBT** | **83 ms** | 284 ms |
| CLS | 0.003 | 0.005 |
| Speed Index | 4.07 s | 1.15 s |
| Page weight | 861 KiB / 45 req | 1,050 KiB / 47 req |
| Main-thread work | 1.99 s | 2.37 s |

### Against the baseline

| Mobile | Before | After |
|---|---|---|
| Performance | 30 | **94** |
| Total Blocking Time | 18,775 ms | **83 ms** |
| Main-thread work | 38.4 s | **1.99 s** |
| — of which "Other" (the WebGL loop) | 35,336 ms | **412 ms** |
| Page weight | 3,791 KiB | **861 KiB** |
| LCP | 7.9 s | **2.78 s** |
| Speed Index | 18.4 s | 4.07 s |

Desktop: 60 → 88, TBT 15,630 → 284 ms, weight 3,804 → 1,050 KiB.

**TBT −99.6%. Page weight −77%. No design change.**

---

## 3. What was changed

Ten commits, `71ea178` → `1f7ee61`. Fallback tag: **`checkpoint-pre-tier-b`**.

### 3.1 Tier A — assets and third parties (`71ea178`)

| Change | Effect |
|---|---|
| `<Environment preset="city">` → self-hosted HDRI, both canvases | 1.5 MB and the `raw.githack.com` → `raw.githubusercontent.com` redirect pair off the third-party graph |
| Three raw `<img>` logos → `next/image`; removed a `?v=3` that downloaded the same file twice | **315.0 → 15.2 KB** on the homepage |
| CSS-mask logo → `logo_v2_mask.png` at 880w | 107.5 → 46.8 KB on `/contact`, `/apps/forget-anything` |
| `immutable` caching for `/hdri/*` and the mascot glb | ~2.4 MB stops revalidating on every page |
| `role="img"` on the mascot + two `aria-label`s corrected | Three real a11y defects |

**Why the HDRI mattered:** both robot materials are `metalness: 1.0`, so they
take nearly all their light from the environment map. It was not decoration — a
GitHub outage or a corporate block would have flattened the robot.

### 3.2 Intro sequencing and the loader (`9373845`, `650fa22`, `582832e`, `e2a249c`)

Not performance work by intent, but it changed what the lab measures, so it
belongs here.

- **Hero flash killed.** `LoaderGate` renders nothing server-side, so the static
  HTML *is* the homepage and the loader only appeared after hydration. A
  pre-paint inline script in `app/layout.tsx` raises a black cover before first
  paint, with an 8 s failsafe if the bundle never boots.
- **One clock** for nav, mascot and chat (`lib/intro.ts`). Order is always
  nav → mascot → chat. See `PROJECT_BIBLE.md` §10.0 for the timings.
- **Loader z-index 200 → 99999.** It sat *below* the chat launcher (1000), the
  mascot (9999) and the nav (10000) — all three drew over the loading screen.
- **Loader rebuilt**: Anton counter, DM Mono boot log carrying real claims from
  `lib/resume.ts`, cropped wordmark. **6.2 s → ~4.1 s.**
- **Scrollbar themed.** The track was painted `var(--bg-deep)` = `#F5F5F7` — the
  site was drawing a near-white stripe down a black page.
- **WebGL context recovery** — see `ROBOT_ROLLBACK.md`.
- `lib/useDeferredReveal.ts` deleted once `lib/intro.ts` replaced both callers.

### 3.3 Tier B — the mascot (`8b2c168`)

| Change | Effect |
|---|---|
| `frameloop="demand"` + `FrameLimiter` (30fps idle, 60 moving) | **119 → 59 draw calls/sec**, every page |
| `dpr` ceiling `[1,2]` → `[1,1.5]`, `powerPreference: "low-power"` | 56% of the pixels at 2×, 25% at 3× |
| `robot-v2.glb` — textures 1024² → 512² | 414 → 145 KB textures; **838 → 572 KB** over the wire |
| `hdri/city-256.hdr` — 1024×512 → 256×128 | **1505 → 128 KB** |
| Masters moved to `_masters/` | ~2.5 MB out of the deployment |

Antialiasing was kept **on** deliberately: the robot is a dark silhouette on a
transparent background, which is exactly where jagged edges show. Pixel count is
the cheaper lever.

### 3.4 Fonts (`1f7ee61`)

All four families were declared without a `preload` option, so `next/font`'s
default emitted **five high-priority font preloads on every page**, racing the
LCP image. Every one is `display: "swap"` — the page paints in a fallback
regardless, so none of them are needed for first paint.

`Instrument_Serif` now has `preload: false`. It is used 106 times as
`font-serif` but never in the first screenful.

**Anton and DM Mono keep their preloads deliberately** — both are on screen
within the first second (hero headline, loader counter and boot log), and a swap
there lands in the one moment the brand is doing the talking.

> `font-mono` (133 uses, incl. the hero meta line and nav) is **not mapped** in
> `tailwind.config.ts`, so it resolves to the system monospace stack and costs
> nothing. Do not "fix" this by mapping it to DM Mono.

---

## 4. Standing rules this session established

Break any of these and the failure is silent.

### 4.1 Immutable assets must be renamed, never replaced

`/hdri/*` and `/robot-v2.glb` are served `max-age=31536000, immutable`.
**Overwriting a served file in place ships the change to nobody who has already
visited.** No revalidation, no 304, and a hard refresh does not help real
visitors. Full rule and the four reference points: `PROJECT_BIBLE.md` §10.1.

### 4.2 Crop derivatives; never fix framing with `object-position`

`logo_v2.png` is a 1774×887 canvas holding **1482×305 of ink — 65.6% of its
height is transparent padding**. Every box it was placed in rendered a signature
a third of the height the box implied. No arrangement of the boxes could have
fixed it. `logo_v2_wordmark.png` is the cropped derivative. (`PROJECT_BIBLE.md`
§9.1 carries the general rule.)

### 4.3 Tailwind's opacity modifier only takes multiples of five

`bg-white/12` **compiles to nothing** — the loader's progress track was
invisible and nobody noticed. Use `bg-white/[0.12]`.

### 4.4 `animation-fill-mode: backwards`, never `both`

An animated value outranks a normal declaration. A forwards fill leaves the
animation's end state in force — which silently killed the chat pill's `:hover`
lift and would pin the mascot under a transform the chase is trying to drive.

### 4.5 One-shot entrances belong in CSS keyframes, not transitions

Setting a transition and its target in the same React commit means the browser
sees both in one style recalculation and has nothing to animate from. The mascot
snapped home while the Running clip played on the spot — *intermittently*,
because it depended on commit timing. A keyframe starts on mount and cannot race.

### 4.6 A CSS animation restarts every time its element mounts

`RobotMascot` returns `null` while the chat is open, so closing the chat
re-mounts the subtree. Keyed off session state alone, the entrance replayed on
every chat close. Guard the **class** with one-shot state, not just the effect.

### 4.7 Verify the robot by sampling the canvas, not by eye

A wrong environment map does not error — `<Environment>` sits behind
`<Suspense fallback={null}>`, so a bad path fails **silently** and the robot just
looks slightly flat. Reference values in §6.2.

---

## 5. Open, declined, and deliberately not done

**Do not re-propose the declined items.** They were refused with reasons.

| Item | Status | Reasoning |
|---|---|---|
| Freeze the idle robot so the page reaches main-thread quiet | **Declined** | Would move TBT more than everything else combined. Refused anyway: a mascot that holds still is a different mascot. |
| Skip the mascot on phones | **Declined** | It is the site's one living thing. A portfolio that is fun on desktop and inert on mobile is the worse trade. |
| Google Analytics — two properties, ~358 KB, ~470 ms CPU | **Dropped until further notice** | See §5.1 before touching it. |
| Inline critical CSS / defer the rest | **Not done — high risk** | Biggest single opportunity (850 ms mobile) *and* the likeliest to break the design silently. Critical-CSS extraction guesses which rules matter; a wrong guess is a flash of unstyled content or one subtly wrong section. |
| `browserslist` to drop legacy polyfills | **Left open — trivial** | 13.7 KiB, Lighthouse **weight 0**. Four lines. Drops pre-2021 browsers. |
| Lazy-load below-fold client components | **Not attempted** | Would address desktop's TBT. Medium risk: hydration, scroll animations, the site tour. |
| Shorten the loader | **Design decision, settled** | The ~4.1 s black screen *is* mobile's Speed Index. |

### 5.1 If GA is ever revisited

| | Transfer | CPU (mobile) |
|---|---|---|
| `G-52W6W0B4W6` (Ads-linked) | 188.0 KiB | 309 ms |
| `G-9D3BDPZH49` (portfolio) | 161.5 KiB | 184 ms |

The site loads gtag once; the **second `gtag('config', …)` call** in
`app/layout.tsx` is what makes it fetch the second container. So deferring means
splitting that one config call into a `lazyOnload` script — not changing a
`<Script strategy>`.

**Try the GA4 admin first.** If the Ads property can be attached as a connected
site tag, the 188 KiB and 309 ms disappear entirely with **no data loss** —
strictly better than deferring, which only moves the cost and loses visitors who
bounce before idle.

---

## 6. Verification playbook

Everything below was used this session and produced the numbers quoted.

### 6.1 Draw calls per second — the mascot's real cost

Run on the settled page, after the robot has revealed:

```js
const cv = [...document.querySelectorAll('canvas')].find(c => {
  const r = c.getBoundingClientRect(); return r.width > 100 && r.width < 260 && r.height > 150; });
const gl = cv.getContext('webgl2') || cv.getContext('webgl');
let n = 0;
for (const m of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced'])
  if (typeof gl[m] === 'function') { const o = gl[m].bind(gl); gl[m] = (...a) => { n++; return o(...a); }; }
setTimeout(() => console.log('draw calls/sec:', Math.round(n / 5)), 5000);
```

| Reading | Meaning |
|---|---|
| **~59** | Correct — 30fps × 2 draws |
| ~119 | Reverted to `frameloop="always"` |
| 0 | Either the `FrameLimiter` is dead, **or rAF is suspended** — check §1.5 first |

### 6.2 Canvas mean RGB — has the robot's lighting changed?

Average several samples; the animation pose varies and would otherwise
masquerade as a lighting change. Count only pixels with alpha > 24.

| Configuration | mean R / G / B |
|---|---|
| Production, original 1.5 MB HDRI | 26.7 / 25.5 / 26.6 |
| Local, full HDRI + `robot-v2.glb` | 26.56 / 25.57 / 26.58 |
| Local, `city-256.hdr` + `robot-v2.glb` | 26.65 / 25.62 / 26.63 |

Everything inside **0.1/255**. Materially darker means the environment map is
not being applied — with `metalness: 1.0` materials there is no subtle failure
mode, only "lit" and "nearly black".

### 6.3 Structural diff before shipping a rebuilt glb

`scripts/shrink-robot-textures.mjs` compares meshes, primitives, vertices,
skins, joints, clips, channels and materials before and after, and **refuses to
write on any drift**. This exists because the first version of that script also
ran `meshopt()`, whose internal prune **stripped a Skin and 71 accessors** — it
quietly removed the rig from a rigged character.

Expected shape: `1 mesh, 2 primitives, 27,038 vertices, 1 skin, 65 joints,
9 clips, 477 channels, 2 materials`.

### 6.4 Font preloads

```bash
curl -sS http://localhost:3200/ | grep -c 'as="font"'    # expect 4
```

### 6.5 Paint timings

Load the page in a same-origin iframe and register a **buffered**
`PerformanceObserver` for `largest-contentful-paint` — `getEntriesByType` alone
returns nothing. Local production build, unthrottled: FCP and LCP both ~152 ms,
and **identical whether or not the loader plays** — the hero paints underneath
before the cover goes up.

---

## 7. Where the remaining points are

Only **three weighted audits** are below pass across both reports. Everything
else scoring red carries **weight 0** — it looks alarming and costs nothing.

| Report | Audit | Weight | Score | Points lost | Cause |
|---|---|---|---|---|---|
| Mobile | LCP 2.78 s | 25 | 84 | ~4 | Render-blocking CSS, 850 ms |
| Mobile | Speed Index 4.07 s | 10 | 80 | ~2 | The loader — ~4 s of near-black screen |
| Desktop | TBT 284 ms | 30 | 62 | ~11 | Script evaluation, 1,090 ms |

**Weight-0 noise, for reference:** legacy JavaScript (14 KiB), unused CSS
(20 KiB), unused JavaScript (174 KiB mobile / 297 KiB desktop — much of it
Google's), forced reflow (37 ms, unattributed), `valid-source-maps` (Next does
not ship production source maps; enabling them publishes your source).

### The LCP breakdown, read properly

| Subpart | Duration |
|---|---|
| Time to first byte | 10 ms |
| **Resource load delay** | **630 ms** |
| Resource load duration | 40 ms |
| **Element render delay** | **340 ms** |

The LCP element is the **hero portrait**. Its download is 40 ms — the image is
not the problem. It waits 630 ms to start and 340 ms to paint, because ~158 KiB
of document, render-blocking CSS and fonts sit in front of it on a ~200 KB/s
link.

> On a first visit the hero is **underneath the black intro cover**. Chrome does
> not test for occlusion, so it counts as painted. LCP is therefore measuring an
> element the visitor cannot see. Improving it helps the score and helps
> returning visitors (no loader); a first-time visitor is looking at the loader
> either way.

---

## 8. Scripts and assets

| Script | Does |
|---|---|
| `scripts/build-robot-glb.mjs` | FBX → `_masters/robot.glb`. **Step 1 of 2**; its output is not served. |
| `scripts/shrink-robot-textures.mjs` | `_masters/robot.glb` → `public/robot-v2.glb` at 512². Structural diff guard. |
| `scripts/shrink-hdri.mjs` | Downsamples Radiance `.hdr`. Own RGBE decoder — nothing in the tree reads the format. Mean radiance preserved to four decimals. |

| Served | Master (not served) |
|---|---|
| `public/robot-v2.glb` (802 KB) | `_masters/robot.glb` (1,071 KB, 1024²) |
| `public/hdri/city-256.hdr` (128 KB) | `_masters/hdri/city.hdr` (1,505 KB, 1024×512) |
| `public/branding/logo_v2_wordmark.png` | `public/branding/logo_v2.png` |
| `public/branding/logo_v2_mask.png` | ” |

Masters are **committed** and byte-identical to what was served pre-Tier-B
(sha256-verified). Unlike `_source-*`, which is git-ignored and exists on one
machine only. See `_masters/README.md`.

---

## 9. Before the next optimisation session

1. Read §1. Do not trust a single run.
2. Confirm whether the trace included the robot (§1.2) before quoting anything.
3. Check **Vercel Speed Insights** for real-visitor LCP and INP — it is
   installed, it is the field truth, and it cannot be distorted by where a lab
   trace ends.
4. Re-read §5 before proposing work. Two of those items were refused
   deliberately and the reasoning has not changed.
5. The page is at **94 / 88 with 100s across the other four categories**. What
   remains is behind the loader, the mascot, and the CSS — each already weighed.
   **Optimise something else, or accept the trade.**
