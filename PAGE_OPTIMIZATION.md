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

**It also suspends IntersectionObserver and CSS transitions**, which is worse
than it sounds: a hidden pane makes an on-screen-gated animation look like it
never starts, and makes a `grid-template-rows` accordion look permanently stuck
half-open. Both were mistaken for bugs on 28 Aug and hunted for a while. The
pane can also go hidden *between* two tool calls, so a reading taken either side
of a wait is not necessarily from the same state.

### 1.6 `toDataURL` on a WebGL canvas will tell you a scene is static

Hashing a third-party canvas twice to decide whether it animates is a test that
**cannot fail**, and on 28 Aug it produced a wrong conclusion that shipped: a
reference site's field was declared still and copied as a still image.

Without `preserveDrawingBuffer: true` — which almost nothing sets, because it
costs performance — the drawing buffer is cleared or recycled after each
composite, so `toDataURL` and `getImageData` read whatever is left rather than
the frame you saw. Identical bytes mean nothing.

**To decide whether something is animating, use one of these instead:**

```js
// 1. Count the render loop. A live scene drives rAF continuously.
let n=0; const o=window.requestAnimationFrame;
window.requestAnimationFrame=function(cb){n++;return o.call(window,cb)};
setTimeout(()=>{console.log('rAF/sec', n/2); window.requestAnimationFrame=o}, 2000);
```

2. **Two screenshots a few seconds apart**, compared by eye. Slow, unambiguous,
   and it is what settled the question in the end.

For **our own** 2D canvases `getImageData` is reliable — they are not WebGL and
they are not cleared behind our backs. Sampling the field in `AsciiField.tsx`
across paints is a valid check; sampling someone else's shader is not.

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

> **Amended 27 Aug 2026 — the second sentence is no longer true.** The notebook
> serif pass put `Instrument Serif` on `.nb-title`, so it is now in the first
> screenful of every article and of `/notebook`.
>
> **`preload: false` stays anyway**, and deliberately. Re-enabling it would add
> a fifth high-priority preload to *every* route on the site to serve two, which
> is the exact regression `1f7ee61` fixed. What the notebook gets instead:
>
> - The headline paints immediately in the Georgia fallback and swaps —
>   `display: "swap"`, which is what it is for.
> - `next/font` generates a metrics-matched fallback automatically, so the swap
>   costs little or no layout shift.
> - **LCP is unaffected.** On an article the largest element in the viewport is
>   the lede image at 936×527 — roughly 493,000px² against the H1's 68,000 — so
>   the image is the LCP candidate and no font is on that path. Same on
>   `/notebook`, where the lead cover is 499×333.
>
> If the lede image is ever removed from articles, re-check this: the H1 would
> become the LCP element and the trade changes.

**Anton and DM Mono keep their preloads deliberately** — both are on screen
within the first second (hero headline, loader counter and boot log), and a swap
there lands in the one moment the brand is doing the talking.

> `font-mono` (133 uses, incl. the hero meta line and nav) is **not mapped** in
> `tailwind.config.ts`, so it resolves to the system monospace stack and costs
> nothing. Do not "fix" this by mapping it to DM Mono.

---

### 3.5 Scroll jank on the home page — 21 Aug 2026

Two separate complaints, two unrelated causes, both measured on a production
build before anything was changed.

#### The hero → film stutter (desktop)

Scrolling off the hero stalled for most of a second, once per page load.

```
long task  870 ms  at scrollY = 100
frame gap  871 ms  at scrollY = 100
second pass over the same range:  0 long tasks, 0 gaps
```

**Vanta's animation loop is wrapped in an `isOnScreen()` guard**
(`vanta/src/_base.js`), so creating the effect draws *nothing*. The first
`renderer.render()` — and with it the CLOUDS fragment-shader compile and program
link — happens the instant the section crosses into view, synchronously. Because
`Film` sits directly under the hero, that lands on the first scroll gesture every
visitor makes. It never recurs, because the program is cached from then on.

Fixed by warming the program off the scroll path: `renderer.compileAsync()` right
after `CLOUDS()` returns (KHR_parallel_shader_compile, so the link runs on a
driver thread), falling back to one forced render inside `requestIdleCallback`.
**After: 0 long tasks, 0 dropped frames over the same range**, Vanta still live.

> The guard is why the effect looks "lazy" when it is not. Do not conclude the
> effect is cheap because init was cheap — init and first draw are different
> events, and the expensive one is triggered by scrolling.

#### The deck tearing itself apart (mobile only)

`04 / Selected Systems` glitched badly on a real phone while being perfectly
smooth in every desktop-sized viewport. Video of the device showed card titles
rendered **twice, at two different scroll offsets, with a horizontal seam between
them**, blocks of one card drawn over another, and bands of the screen flashing
white.

That is not an animation bug. The transform maths was swept end-to-end and is
continuous and correct. It is the compositor **presenting a frame it had not
finished rasterising** — some tiles from the previous scroll offset, some from
the current one.

Nine of the seventeen cards are on screen at once, and each was asking for:

| Per card, per frame | Cost |
|---|---|
| `filter: brightness()` | renders the **whole card subtree** to an offscreen surface, filters it, composites it |
| `blur-[100px]` on a 288px glow | a second render surface, 200px-wide kernel |
| box-shadows at 40px and 120px | two large blur rasters — **and both were black-on-black, casting nothing** |

All three are gone. The glow is a `radial-gradient` (one Skia draw, no surface),
the invisible shadows are deleted, and the recede dim is now a black scrim at
`1 - brightness` alpha, which is arithmetically the same picture
(`c·k ≡ c·(1-α)`, `α = 1-k`) with no filter anywhere. Verified by computed style:
**17 cards, `filter: none` on every one, zero blur filters left in the deck.**

> **The dim must be `background-color` alpha, not the element's `opacity`.**
> Driving `opacity` promotes each of the seventeen overlays to its own
> compositing layer, on top of seventeen card subtrees a filter is no longer
> flattening — that combination **killed the renderer outright**, "This page
> couldn't load" before first paint, reproducibly. An alpha inside the colour
> repaints one solid rounded rect and promotes nothing.

**Still unverified: whether this is enough on the actual device.** The glitch has
never been reproduced locally — a desktop GPU at a 375px viewport ran the deck at
17 ms/frame with two dropped frames in a 187-frame sweep. Viewport emulation is
not device emulation. The changes are each a strict reduction in per-frame raster
work, and the white flashing is separately fixed below, but the fix is reasoned
from the mechanism, not measured on the phone.

#### Deck geometry audit — the numbers behind the card height

Measured with every image forced to load, `scrollHeight` per block so the
receded cards' `scale(0.9)` could not distort it.

**What the content actually needs**, left column including padding and gap:

| Layout | Tallest card | Needs |
|---|---|---|
| 375px, stacked | PixelVille | **567px** |
| 1280px, two columns | Migi / PixelVille | **455px** |
| Right panel, any width | 16:9 image + padding | ~380px |

That 112px spread is why the ceiling is **per breakpoint** and not one number.
The left column is `overflow-hidden`, so a ceiling below the stacked figure cuts
the copy off *silently* — there is no scrollbar and no overflow to notice.

**What the old shared 660 ceiling cost on desktop**, at 1167px wide:

| Card height | Clipped | Dead space above/below the image |
|---|---|---|
| 660 (old) | none | **175–213px** |
| 500 (now) | none | **95–133px** |

> **Every static cover image was already perfectly centred** — `gapTop` equalled
> `gapBottom` to the pixel on all ten, and none was cropped. What reads as "some
> are centred, some sit high" is the *gap* changing size between cards, because
> the covers run 1.758 to 2.336 in aspect: a 16:9 shot leaves 118px a side while
> Pentashell and Forget Anything leave 157px. Halving the dead space halves that
> jump. Removing it entirely would mean forcing one aspect with `object-cover`,
> which crops real content off wide screenshots — not done.

#### The card that set the floor was set by its chips, not its prose

PixelVille was the tallest card in the deck — 567px stacked — and the floor every
other card's height was measured against. The obvious suspect was its copy, so
that was measured first, by swapping strings in the live DOM:

| `emotion` string | Rendered height |
|---|---|
| "Its citizens have minds — they remember, decide, vote and rebuild." (66 ch) | 46px |
| "Its citizens remember, decide, vote and rebuild." (47 ch) | **46px** |
| "They remember, decide, vote and rebuild." (39 ch) | **46px** |

Two lines in all three cases, so **shortening the sentence saves nothing.** The
prose was left alone.

The capability chips were the whole difference. At 375px each of
`Knowledge · Memory · Minds` / `Self-Governing Democracy` /
`Everything Procedural` was too wide to share a row, so they took three:

| Chips | Chip block | Card need |
|---|---|---|
| Original three | 111px | 567px |
| `Memory · Minds` / `Self-Governing` / `Fully Procedural` | **71px** | **527px** |

Deck floor 567 → 545 (Migi and Qdex are now the tallest); on desktop PixelVille
went 455 → 415. **Measure which element wraps before editing the sentence that
looks longest.**

> **Pre-existing, not introduced:** on a viewport under ~610px tall the card is
> viewport-limited and the tallest card's last line can clip. It clipped at the
> old numbers too, and worse — the card was 440px there. `a31b594` chose "fits by
> construction" over "never clips", and this is the edge of that trade.

#### Only genuinely tall captures belong in `SCREENSHOTS`

That map feeds an `overflow-y-auto` box, which **top-aligns** its content —
correct for a 1366×12096 page capture, wrong for anything that fits. `ember.png`
(1536×864) and `d-pe.png` (1672×941) are ordinary 16:9 landscape shots and were
in it by mistake. They rendered pinned to the top of the panel with **128px of
void beneath**, under a "Landing page · scroll" badge and fade masks, in a box
that could not scroll — measured `gapTop: 0, gapBot: 128, scrollable: false`.

Moved to `coverImage`, which centres them like every other landscape shot:
**80 / 80**. The aspect ratios left in `SCREENSHOTS` run **0.11 to 0.53**; if a
new one is anywhere near 1, it belongs on `coverImage`.

### 3.6 Two per-frame loops added on purpose — 28 Aug 2026 (`23feac8`)

Everything above this point is about *removing* per-frame work. This section
added two loops back, so the budgets are recorded here rather than left to be
rediscovered. Both were unavoidable: each animates something no declarative CSS
can express, and both are modelled on measured behaviour of a reference site
(HANDOFF §1.19).

**`components/sections/SignatureStrip.tsx`** — the marquee band above the footer
on `/`. Its speed tracks the page's own scroll speed and eases back when the
scroll stops, which is not expressible as a keyframe.

- One `transform` write per frame, no allocation, no layout read beyond
  `scrollTop`.
- Reads `document.scrollingElement.scrollTop` directly — **never a scroll
  listener**; `body` is the scroll container here (AGENTS.md trap 4).
- Runs **only** while the band intersects, `rootMargin: 150px`. It sits at the
  bottom of a 26,000px page, so without the gate it would run for the whole
  visit unseen.
- Under `prefers-reduced-motion` the loop is never created.

**`components/profile/AsciiField.tsx`** — the flowing character field on
`/profile`. ~10,500 cells.

- **Capped at 20fps**, not 60. It is a slow churn; three times the work would
  look the same.
- **One `fillText` per row per tone band — 246 calls a frame, not 10,496.** A
  horizontal squeeze on the context makes a monospace advance land exactly on
  the cell grid, so a whole row draws as one string. This is the load-bearing
  decision; a per-cell version is roughly forty times the draw calls.
- Glyph rasters are cached by the browser after the first frame, so steady-state
  cost is cached blits and no text shaping.
- `step = 2` below 768px — a quarter of the glyphs at twice the size.
- IntersectionObserver-gated, `rootMargin: 200px`; never started under reduced
  motion, where the server-rendered `<pre>` stays visible instead.
- The canvas hands over from that `<pre>` **only after its first successful
  frame**, so a canvas that never paints leaves the static picture in place.

> If either of these ever shows up in a trace, the gate is the first thing to
> check — not the loop body. A loop running off-screen is the failure mode both
> are built to avoid.

## 4. Standing rules this session established

### 4.0 The body background is also the colour of a dropped frame

`body` was `var(--bg-deep)` — **#F5F5F7, near-white, on a site that is black
everywhere.** Every page paints over it, so it was invisible right up until it
wasn't: Chrome fills a tile with the page's base background colour when the
rasteriser has not finished it, so every dropped tile on the phone flashed
**white**. The nav's `backdrop-blur-2xl` then sampled those white tiles and went
pale in the same frames, which is why the glitch looked like it involved the
whole screen rather than one section.

It is now `#050505`, set in `globals.css` only — the `bg-bg-deep` class came off
`<body>` in `layout.tsx` because a Tailwind utility would win over the rule.
**`--bg-deep` itself is deliberately unchanged**: `Button.tsx` uses it as a
*text* colour on the blue button, where near-white is correct.

This is the third time this token has leaked through as a near-white artefact on
a black page (the scrollbar track was the first — §3.2). If you find a fourth,
suspect `--bg-deep` before anything else.


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

### 4.2b A shared image component needs `sizes` as a prop, not a constant

**This has now happened twice**, which is what makes it a rule rather than an
anecdote.

`next/image` picks which variant to serve from the `sizes` hint. Hardcode one
string inside a reusable component and it is correct for the call site it was
written for and wrong for every other — the browser then upscales, and the result
is a soft image with no error anywhere.

- **`ScreenshotFrame`** carried `(min-width: 768px) 640px, 100vw`, correct for a
  two-up grid and wrong for the AEGIS hero at ~1150px. It served the 640px
  variant and upscaled it 1.8×. That was the "pixelated screenshot" —
  `cover.png` was 1365×767 and had never been the problem (HANDOFF §1.7).
- **`PostCover`** carried `…33vw`, correct for the notebook grid and wrong for
  the featured hero. At a 1025px viewport the hero rendered 516px and was handed
  338px — a **1.53× upscale**. It is now a prop with `GRID_SIZES` and
  `HERO_SIZES` exported beside it, and the worst upscale on that page measures
  1.01.

> **Vector art hides this completely.** The notebook covers were generated SVG
> until real images landed, and SVG does not pixelate — the defect had been there
> the whole time and was invisible. Adding a real image to a component that has
> only ever drawn vectors is the moment to check its `sizes`.

The check, at any viewport:
`renderedWidth × devicePixelRatio ÷ naturalWidth`. Above ~1.1 the browser is
upscaling.

### 4.3 Tailwind's opacity modifier only takes multiples of five

`bg-white/12` **compiles to nothing** — the loader's progress track was
invisible and nobody noticed. Use `bg-white/[0.12]`.

### 4.4 `animation-fill-mode: backwards`, never `both`

An animated value outranks a normal declaration. A forwards fill leaves the
animation's end state in force — which silently killed the chat pill's `:hover`
lift and would pin the mascot under a transform the chase is trying to drive.

> **Then declare the end state on the same rule.** `backwards` covers the
> *delay* and nothing after: the instant the animation finishes, the element
> reverts to whatever the cascade says. If the base rule is the hidden state —
> which it usually is, because that is how you keep an entrance off-stage until
> it is triggered — the element plays its entrance and then vanishes. That is
> exactly what the `/profile` statement lines did on 28 Aug, with the animation
> still reporting as running:
>
> ```css
> .ln            { opacity: 0; transform: translateY(30px); }   /* off-stage */
> .in .ln        { opacity: 1; transform: none;                 /* ← required */
>                  animation: rise 700ms var(--ease) backwards; }
> ```

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

### 4.8 A bare minimum in `minmax()` is a hard floor

Added 26 Aug 2026 after it ran a grid off the side of a phone.

```css
/* ✗ Below a 24rem container the track stays 384px and overflows. */
grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));

/* ✓ Collapses to the container; identical above 24rem. */
grid-template-columns: repeat(auto-fill, minmax(min(24rem, 100%), 1fr));
```

`auto-fill`/`auto-fit` decide *how many* tracks fit. They do not shrink a track
below the minimum you gave them — that is what the minimum means. `.nb-rows`
measured **384px wide inside a 327px container** at a 375px viewport, running
33px past the edge on `/notebook` and `/notebook/all` and nowhere else, because
article pages are the one route that does not use rows.

Two things made it survive a long time:

- **`body` carries `overflow-x: hidden`**, so it never produced a scrollbar. The
  page was simply cut off at the right edge, which reads as a margin problem
  rather than a layout bug.
- `documentElement.scrollWidth > innerWidth` **does not catch it** under viewport
  emulation, because `innerWidth` grows to the overflowing width. Compare against
  **`clientWidth`**:

```js
// The check that finds it. `innerWidth` will lie to you.
document.documentElement.scrollWidth > document.documentElement.clientWidth
```

Audit the others before assuming yours is fine: `.nb-grid` at 16rem, `.nb-side`
and `.nb-end-grid` at 15rem and `.nb-facts` at 8rem all fit inside a 375px
content box, which is why only one rule needed changing.

### 4.9 `100vw` includes the scrollbar

`BannerArt` is `width: 100vw` centred on its host, so on any page with a
vertical scrollbar it is ~10px wider than the visible area and hangs 5px off
each edge. That is by design and `globals.css` says so — **it must not be fixed
by clipping `.sd-banner-host`**, because several hosts are width-constrained
(`max-w-3xl` on /privacy, `.jr-mast` at 74rem) and clipping there stops the art
at the text column.

Clip the *page's own* full-bleed masthead instead, as `.ab-hero` does on /about
and `.nb-mast` now does on the notebook. Check for sticky descendants first —
§ the overflow/sticky rule in `AGENTS.md`.

---

### 4.10 `aspect-ratio` fixes a ratio, so `min-height` can widen the box

`aspect-ratio` does not set a height. It sets a *relationship*, and the browser
is free to satisfy it from either side. Give a block both an `aspect-ratio` and
a `min-height` that exceeds the height the ratio wanted, and the ratio answers by
**growing the width**.

On 28 Aug this put a **548px-wide band inside a 349px column** on a 375px phone
(`.pf-ascii`, `app/profile/profile-sections.css`). Nothing looked broken —
`.pf-root` carries `overflow-x: clip`, so the document never gained a scrollbar
and `scrollWidth === clientWidth` still passed. The only symptom was a picture
silently pushed off-centre and cropped.

**If a box has `aspect-ratio` and any height floor, cap its width too:**

```css
aspect-ratio: 0.9366;
max-width: calc(100% - 2 * var(--pf-rule-x));   /* leaves height as the only give */
min-height: 420px;
```

Note that the usual overflow check does not catch this. Assert the width against
the container instead:

```js
const el = document.querySelector('.pf-ascii');
console.log(el.getBoundingClientRect().width, el.parentElement.clientWidth);
```

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
curl -sS http://localhost:3200/ | grep -o 'as="font"' | wc -l   # expect 4
```

> **Corrected 27 Aug 2026.** This read `grep -c` and always returned **1**.
> `grep -c` counts matching *lines*, and the served HTML is minified onto one —
> so the check passed at four preloads and would have passed just as quietly at
> forty. `grep -o | wc -l` counts occurrences. Verified at 4 on `/`, `/notebook`
> and an article.

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
