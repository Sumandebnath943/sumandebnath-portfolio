# Handoff — Suman Debnath Portfolio

Where the project stands, what changed most recently, and what is worth doing
next. For how the system is built read **PROJECT_BIBLE.md**; for how the site
writes and what each page argues read **PORTFOLIO_HANDOFF.md**.

**Last updated:** 29 August 2026
**Branch:** `main`, pushed through `23feac8`; **`403f9a2` and `bf12586` are committed locally and not pushed.** Working tree clean.
**Last session:** a twenty-seventh notebook article — the flat stretch between builds, evidenced off this repository's own commit log — scored to the top of the editor's ranking, and the first cover deliberately outside the §2 house style (§1.20). **Read §1.20 before adding a post**: it records why the headline was rewritten, and why the front page's "Editor's selection" tile does not show the highest-scoring article.
**Session before:** three sections rebuilt from measurements taken on the two reference sites — a scroll-reactive marquee band closing the homepage, an ASCII-portrait statement wall on `/profile`, and "05 / Operating Principles" rebuilt as a hover accordion (§1.19). All three were built twice; the first pass copied the arrangement and none of the behaviour. **Read §1.19 before touching any of them** — six of the eight things that mattered were invisible in a screenshot.
**Session before that:** two Google Search Console structured-data reports cleared — a critical `ProfilePage.mainEntity` type error on `/about` and `/profile`, an invalid `dateModified` on `/resume`, and five recommended Q&A fields on all four `QAPage` URLs (§1.18). JSON-LD only; nothing visible changed. **Click "Validate fix" in both reports after the next deploy.**
**Next up:** **run `scripts/indexnow.mjs` once after the next deploy** — Bing Webmaster turns out to be verified (§1.16), which was the blocker recorded in §1.10. Indexing beats every remaining scorecard point. Then **click "Validate fix" in both Search Console reports** (§1.18). After that, the homepage structure weakness in §3 is the oldest open item — note that §1.19 added a fourteenth section to `/` without addressing it.
**Earlier:** four pieces of work, 25–26 Aug. Agentic readiness against an external audit, which found the identity JSON-LD was invisible without JavaScript — §1.8. Then **twenty-one notebook articles** in six batches, three new categories and a writing guide — §1.9. Then the target query set, the entity rework, and a measurement that reordered the priorities — §1.10. Then the notebook rebuilt as a publication — §1.11.

> Run `git log --oneline -15` before trusting this section — it is a snapshot,
> and the commit log is the authority on what has happened since.

---

## 1. Current state

The site is live, complete and deployed. Every route in §3 of the Bible is
built and shipped. There is no half-finished work in the tree and no known
broken behaviour.

Recent history, newest first, gives an accurate picture of the trajectory:

| Area | State |
|---|---|
| **Notebook** (`/notebook`) | **5 posts → 26**, 26 Aug (§1.9), **27** on 29 Aug (§1.20 — and one cover deliberately outside the house style), rebuilt as a publication (§1.11), then **redesigned end to end** (§1.12): the reading page on one band with a five-module rail, colour driven by category accent, pull-quotes in all 26 posts and in-article promo cards in nine; the front page recomposed into five zones on a 3·4·3·4·2 rhythm. Six routes — the architecture now lives in **`PROJECT_BIBLE.md` §6.8**, which it did not before. **Read `BLOG_GUIDELINES.md` before touching a post and `NOTEBOOK_COVERS.md` before making an image.** One thing outstanding: the serif — see the end of §1.12. |
| **Machine-readable identity** | Audited 25 Aug against Vercel's Is Agentic, **79 → 83** (§1.8). The `Person` and `WebSite` JSON-LD were emitted through `next/script` and existed only once JavaScript had run — now literal tags on all 26 routes. House of Namus added as a real `Organization`. Markdown content negotiation was **refused on purpose**; the reasoning and the one condition for revisiting it are in `AEO_PLAYBOOK.md` §8. |
| **Profile** (`/profile`) | Built 23 Aug over two passes, extended 24 Aug with four more sections (§1.6), and given a **statement wall** 28 Aug (§1.19) — a baked ASCII portrait, ~175vh, flowing on a capped canvas, with three lines rising off it. The only light page on the site — ruled cream paper, a 280vh pinned hero that zooms into a drawn monitor, a word reveal, and a conveyor street with a walking robot. Modelled on a reference the user supplied, then pulled back towards the site's own type, pills, accents and closing. **The figure and the dog still need redrawing** — §1.5. |
| **Reference-built sections** | Three, all 28 Aug (§1.19): `SignatureStrip` (homepage marquee, scroll-reactive), `AsciiWall` (`/profile`), `AIPhilosophy` rebuilt as a hover accordion. Two carry per-frame loops — both gated to on-screen, both off under reduced motion. **Budgets and the two measurement traps are in `PAGE_OPTIMIZATION.md` §3.6 and §1.6.** |
| **Banking Co-pilot** (`/banking/rm-copilot`) | Built 22 Aug. New **Banking** group under Portfolio. Fully prerendered; 382 KB of WebP, one eager image. Done. |
| **Hero lock** | Extended 22 Aug from the homepage to all ten product pages — `components/ui/HeroLock.tsx`. Done. |
| **Admin dashboard** (`/desk-4f7a`) | Built 13–14 Aug across five phases. Live, password-gated, recording. |
| **Visitor notifier** | Rebuilt 13–14 Aug: journey card, crawler and scanner handling, Postgres persistence. |
| **Privacy** (`/privacy`) | Rewritten twice as the truth changed. Now states real retention periods. |
| **Next.js** | Upgraded 16.2.6 → 16.3.0. Production audit clean. |
| **MIGI Android App page** | Rebuilt 12 Aug for the V2 native app. Done. |
| **Journey** (`/journey`) | Built over ~6 commits, ending `e886cca`. Real illustrations, gated gestures. Done. |
| **Accessibility** | Two full WCAG AA passes across every page. Done. |
| **About / Philosophy / FAQ / Contact** | Given distinct identities in `b6e18ff`. Done. |
| **Résumé** (`/resume`) | Rebuilt as two converging registers, `1ca629c`. Done. |
| **AI assistant** | Role-injection closed and cost bounded, `df067e5`. Model is `openai/gpt-oss-120b`. |
| **Navigation + ⌘K** | Restructured around Home / Portfolio / About Me, mounted site-wide. |
| **Site tour** | Crosses routes and survives navigation, `8adf5ee`. |
| **The film** (`Who am I?`) | Made 17–18 Aug. 5:57, on YouTube as `4AP2eui9720`, embedded on the homepage. Retitled 19 Aug. Done. |
| **Skills declaration** | AEO, GEO, SEO and agentic readiness now land in all five surfaces that declare expertise — `knowsAbout` in the Person JSON-LD, `coreSkills` (which feeds /resume *and* the AI assistant), the capabilities FAQ, the homepage stack and `llms-full.txt`. **`AEO_PLAYBOOK.md` §3.6b is the list; read it before adding a skill anywhere.** — §1.14 |
| **Homepage density** | Reworked 19 Aug. Three sections roughly halved in height, two closers restyled, three copy blocks refreshed — §2. |
| **Homepage structure** | **Still weak.** Now *fourteen* sections, no spine — `SignatureStrip` was added 28 Aug (§1.19) between the Related block and the footer. The 19 Aug pass fixed density and copy, not order — §3. |
| **Performance** | **Done — see `PAGE_OPTIMIZATION.md`**, which is now the standing reference and should be read before any further perf work or any test run. PSI **94 mobile / 88 desktop**, other four categories 100. TBT 18,775 → 83 ms, weight 3,791 → 861 KiB. Tier C and the GA work were **declined on purpose**; do not re-propose them. |

> **§1.1 and §1.2 below are the session narrative — what was decided, when, and
> why.** The durable reference is **`PAGE_OPTIMIZATION.md`**: how to measure this
> site without fooling yourself, every change with its measured effect, the
> standing rules, the verification snippets, and the list of things refused on
> purpose. Start there; come back here for the story.

### 1.1 Performance pass — Tier A (19 Aug 2026)

Driven by four runs taken on 19 Aug 2026 — Lighthouse and PageSpeed Insights,
desktop and mobile, against production. The JSON was never committed, so the
baseline is recorded here instead:

| | Local Lighthouse | **PSI** |
|---|---|---|
| Performance (desktop / mobile) | 98 / 58 | **60 / 30** |
| Best Practices | 73 | **100** |
| TBT (desktop / mobile) | 84 ms / 1,594 ms | **15,630 ms / 18,775 ms** |
| Page weight | 1,078 KiB | **3,791 KiB** |

**Two of those four runs are misleading, and the trap generalises — read this
before re-measuring anything.**

- The **local Lighthouse** runs scored 98 because the trace ended *before the
  mascot revealed*: no `robot.glb` and no HDRI appear in their network logs at
  all, which is also why they saw a third of the real page weight. They scored
  Best Practices 73 purely from Chrome extensions in the profile. **Run local
  Lighthouse from a clean/incognito profile, and let it run long enough to
  catch the mascot.**
- **PSI is the honest measurement here**, and it is the one to compare against.

More generally: this page has a permanent rAF loop, so it never reaches
main-thread quiet and Lighthouse runs to its own timeout. A short trace will
always flatter it.

**What was changed** (all verified against a production build, with the live
site used as the "before"):

| Change | Result |
|---|---|
| `<Environment preset="city">` → self-hosted `/hdri/city.hdr` in both robot canvases | 1.5 MB and the `raw.githack.com` → `raw.githubusercontent.com` redirect pair removed from the third-party graph |
| Three raw `<img>` logos → `next/image`; dropped a `?v=3` that was downloading the same file twice | 315.0 KB → 15.2 KB on the homepage |
| CSS-mask logo → `logo_v2_mask.png` at 880w | 107.5 KB → 46.8 KB on `/contact` and `/apps/forget-anything` |
| `immutable` caching for `/hdri/*` and `/robot.glb` | ~2.4 MB stops revalidating on every page — **carries a standing rule, Bible §10.1** |
| `role="img"` on the mascot; two `aria-label`s that did not contain their visible text | Three real a11y defects, not score-chasing |

Robot lighting was confirmed unchanged by **canvas pixel sampling** against
production — mean RGB within ~1/255 per channel. That check mattered: both
materials are `metallicFactor: 1.0`, so they take nearly all their diffuse light
from the environment map, and `<Environment>` sits behind
`<Suspense fallback={null}>` where a broken path fails *silently*.

**What Tier A deliberately did not touch, and why it matters most:** TBT is
15,630 ms desktop / 18,770 ms mobile, and main-thread "Other" is 25–35 s. That
is the mascot's react-three-fiber canvas running `frameloop="always"` — a
permanent rAF loop, on every page, that never lets the main thread go quiet.
It is why PSI reports TTI of 21 s / 41 s (its timeout, not a real number) and
why Speed Index never settles. **No amount of asset work will move it.** That
became Tier B — §1.2.

### 1.2 Performance pass — Tier B, and why there is no Tier C (19 Aug 2026)

Tier B made the mascot cheaper without changing how it looks or behaves. Every
item is documented with a per-item undo in **`ROBOT_ROLLBACK.md`**, which is
indexed by symptom; the fallback tag is `checkpoint-pre-tier-b`.

| Change | Result |
|---|---|
| `frameloop="demand"` + `FrameLimiter` — 30fps idle, 60 while running/jumping | **119 → 59 draw calls/sec**, on every page |
| `dpr` ceiling 2 → 1.5 (antialiasing kept on) | 56% of the pixels on a 2× display, 25% on a 3× phone |
| `robot-v2.glb` — textures 1024² → 512² | file 1071 → 802 KB; **838 → 572 KB** over the wire |
| `hdri/city-256.hdr` — env map 1024×512 → 256×128 | **1505 → 128 KB**, plus an RGBE decode and a PMREM generation off the main thread |
| Full-size originals moved to `_masters/` | ~2.5 MB out of the deployment; byte-identical to pre-Tier-B, sha256-verified |

Verified on a production build: lighting unchanged by canvas sampling (mean RGB
26.65/25.62/26.63 against 26.56/25.57/26.58 at full size — inside 0.1/255, and
both materials are `metalness: 1.0` so a wrong map would have shown at once);
structure of the shrunk glb identical (1 skin, 65 joints, 9 clips, 477 channels,
27,038 vertices); FCP and LCP both **152 ms**, and *unchanged by whether the
loader plays* — the hero paints underneath before the cover goes up, so the
loader costs Speed Index only.

Page weight overall: **3,791 KiB → ~1,785 KiB**.

#### The scores moved oddly, and the reason matters more than the scores

| | After Tier A | After Tier B |
|---|---|---|
| Lighthouse desktop | 87 | **94** |
| PSI desktop | 72 | **79** |
| Lighthouse mobile | 65 | **67** |
| PSI mobile | 92 | **67** |

Three went up; PSI mobile fell. Two things explain it, and both are worth
knowing before anyone "fixes" a number here again:

1. **PSI mobile on this page is noise.** It has read 30, then 92, then 67 across
   three runs of substantially similar builds. Its filmstrip keeps ending inside
   the loader. **Take the median of three runs per form factor, or do not quote
   it.**
2. **Smaller assets made the score worse, honestly.** The env map went 1505 KB →
   128 KB, so the robot now finishes loading and starts rendering *sooner* —
   which means more of its work falls inside the trace. Tier B made the page
   cheaper and made Lighthouse see more of the expensive part, at the same time.

The lab score largely measures *how much of the mascot the trace happened to
catch*. **`Vercel Speed Insights` is already installed and is the number to
trust** — real-visitor LCP and INP, which cannot be distorted by where a trace
ends.

#### Tier C was proposed and declined — do not re-propose it

| Option | Decision |
|---|---|
| Freeze the robot after ~10s of no activity so the page reaches main-thread quiet | **Rejected.** Would move TBT more than everything else combined, and was still rejected: a mascot that holds still is a different mascot. |
| Skip the mascot on phones | **Rejected.** It is the site's one living thing; a portfolio that is fun on desktop and inert on mobile is the worse trade. |
| Defer or split the two GA4 properties (~358 KB, ~470 ms CPU) | **Dropped until further notice**, 19 Aug. Both properties keep full coverage. If it is ever revisited, `PAGE_OPTIMIZATION.md` §5.1 has the mechanism and the reason to try the **GA4 admin** route first — it removes the payload entirely with no data loss, where deferring only moves it. |

**The remaining cost is the mascot, and that is a deliberate purchase.** The
score is near its practical ceiling for this design. Anyone picking this up
should optimise something else, or accept the trade that has already been made
twice, on purpose.

### 1.3 Fonts, and where it finished (19 Aug 2026)

One last change after Tier B. The LCP breakdown showed the hero portrait
downloading in **40 ms** but waiting **630 ms to start** and **340 ms to
paint** — bandwidth, not the image. All four typefaces were declared without a
`preload` option, so `next/font` emitted **five high-priority font preloads on
every page**, racing the LCP image, despite every one being `display: "swap"`
and therefore unnecessary for first paint.

`Instrument_Serif` got `preload: false` — used 106 times as `font-serif`, never
in the first screenful. Anton and DM Mono keep theirs: both are on screen inside
the first second. Five preloads became four.

**Final measured state (PSI, production):**

| | Mobile | Desktop |
|---|---|---|
| Performance | **94** | **88** |
| Accessibility · Best Practices · SEO · Agentic | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| TBT | 83 ms | 284 ms |
| LCP | 2.78 s | 0.58 s |
| Page weight | 861 KiB | 1,050 KiB |

From a starting point of **30 / 60**, with TBT at **18,775 ms** and 3,791 KiB.

Only three weighted audits remain below pass, and each traces to something
already weighed and kept: mobile LCP (render-blocking CSS, ~4 pts), mobile Speed
Index (the loader's black screen *is* the Speed Index, ~2 pts), desktop TBT
(script evaluation, ~11 pts). Everything else in the red carries **weight 0**.

**Stop point agreed with Suman: the site is done being optimised.** The
`browserslist` change was offered and declined as not worth touching the build
config for zero points.

---

### 1.4 Banking Co-pilot, the hero lock, and two clipped legends (22 Aug 2026)

Three pieces of work, in the order they were asked for.

**The Banking Co-pilot page** (`ac33e22`). A showcase page for an AI copilot for
bank Relationship Managers, at `/banking/rm-copilot`, under a new **Banking**
group in the Portfolio menu. Source material was the product's own
`docs/PORTFOLIO_HANDOFF.md`, `SECURITY_POSTURE.md` and `HANDOFF.md`.

Decisions he took explicitly:

- **Named "Banking Co-pilot", with no bank named.** The source folder is
  `IDBI Sarthi`; that name is nowhere on the site. See the naming trap in
  Bible §3.
- **Live site linked, repo not.** `bankingcopilot.houseofnamus.com`. Its
  marketing page is public but the twelve modules are behind sign-in, and the
  login page does not self-serve demo credentials — so the CTA says "Open the
  live site", not "try the demo", and no credentials are published.
- **Full page, image-light**, rather than the short version its own handoff
  offers, plus a dedicated security section — which is the largest thing on the
  page and carries the diagrams: a four-layer defence spine, and 404-vs-403 drawn
  as two request/response pairs collapsing into one indistinguishable answer.

The source folder was **read-only** and nothing was written into it. All eight
captures already existed in its `docs/assets/screenshots`, so the app never had
to be run. Four of the twenty were skipped as empty-state shots that would read
as an unfinished product; those modules are described in prose instead.

**The hero lock, everywhere** (`96e3df8`). `f87d26c` fixed the chat launcher and
mascot covering the homepage hero's CTAs on a phone, but nothing carried it to
the product pages. Measured at 375×812: **all ten collide**, five of them via
the mascot rather than the launcher. `useHeroLock` moved to
`components/ui/HeroLock.tsx` and gained a component form for the server-component
pages. Full table and reasoning in that file; the rule is now wire-in point 5 in
Bible §8 and a section in PORTFOLIO_HANDOFF §4.

**Two clipped legends** (`69b9903`). Both PACT signature panels had `overflow-hidden`
eating the legend that straddles their top border — 9px of a 17px label, so
neither had ever rendered. The clip moved onto a wrapper around the sweep beam
that actually needed it. See the note under motion trap 1 in Bible §5.

**A verification lesson worth keeping.** Twice this session the Browser pane went
undisplayed, which suspends compositing — and with it `IntersectionObserver`,
which delivers *nothing*, not even its initial observation. The hero lock looked
broken when it was fine. Two things that rescue the session rather than guessing:

1. **Run a known-good control.** The shipped homepage lock failed identically,
   which isolated the fault to the pane in one call.
2. **Split at the class boundary.** Add the class by hand and test the CSS half
   properly — `getComputedStyle` for the declarations, and
   `document.elementFromPoint` at the contested pixel for what a tap actually
   reaches. Only the observer's *delivery* is then unverified, and that is a
   browser guarantee rather than our code.

Layout still computes with the pane hidden, so clipping and wrapping bugs — the
PACT legends — are fully measurable either way, and measuring beats squinting:
"9px of 17px" is a better bug report than "looks cut off".

**Left unverified:** nothing outstanding. The lock was confirmed end to end on a
composited pane across all ten pages plus the homepage, and both legends were
checked at 375 and 1280.

---

### 1.5 `/profile` — a paper page in a dark site (23 Aug 2026)

**What was asked for.** The user pointed at the profile page on
**pleurat.com/about** and asked for the same page — design, layout, animations —
carrying Suman's content instead. Four choices were settled before any code: a
new `/profile` route rather than replacing `/about`; the reference's cream paper
system verbatim but with this site's own fonts; the drawings redrawn rather than
lifted; and the reference's e-book block repurposed.

**Then a second pass**, off sixteen points of feedback, which is what the route
actually looks like now. The theme of nearly all of it was the same: *keep the
character, stop being a guest on the site.* That produced the five continuity
devices now written up in Bible §4.1 — the site's own type and headline pattern,
`SectionKicker` pills in place of amber corner tabs, per-product accents on the
work board, rounded buttons, and `<Contact variant="light" />` as the closing.

**What it is now.** Seven blocks:

| Block | Behaviour |
|---|---|
| Hero | 280vh with a 100svh sticky child; the paragraph rises 320px and fades on a cubed curve while a drawn room zooms into the monitor's screen |
| Statement | 1.3fr / 0.7fr, headline against a small aside |
| Filmstrip | eight photographs of Suman, drifting sideways in proportion to their trip through the viewport |
| Credo | sticky left column, right column resolving one word at a time |
| Board | ten hairline cells, each carrying its product's accent, over a row of ways out to the rest of the site |
| The Experience Book | a cover with the figure on it, and both jobs' responsibilities as a ruled ledger with the number each was measured by |
| The street | a constant-speed conveyor of named buildings with a robot walking it |

**Six things that were bugs first.**

> **No scroll listeners anywhere on this page.** `body` carries
> `overflow-x: hidden`, so scroll events fired on it never reach `window` —
> AGENTS.md trap 4, and it fails silently. Every scrub runs through one
> `useScrub` hook: an IntersectionObserver decides whether an element is worth
> watching, and while it is, a rAF loop reads `getBoundingClientRect()`.

> **The nav was invisible for the first pass, with no error.** `Navigation` is a
> framer-motion `m` component that animates itself in from `opacity: 0`. Without
> `MotionProvider`'s `LazyMotion` above it there is no animation to run, so the
> inline `opacity:0` simply stays. Every page that mounts `Navigation` needs
> `MotionProvider`.

> **`HeroLock` observes its own `parentElement`.** Mounted as a sibling of the
> hero it observed `<main>` and kept the mascot and chat launcher hidden for the
> entire page. It is now passed into `ProfileHero` as `children`.

> **Removing the hero drawing's width cap cut the screen off.** The cap looked
> arbitrary and was deleted; on a 620px-tall window the full-width drawing then
> overflowed the `overflow: hidden` pin and the bottom of the monitor — the
> payoff of the whole zoom — was clipped. It is back as an explicit budget,
> `(100svh − 360px) × 4.233`, and Bible §4.1 says what the 360 is made of.

> **The reaching arm has to paint after the keyboard.** Drawn inside the sitter
> group it disappeared behind the monitor bezel from x=556 onwards, because the
> hand rests on a keyboard that stands in front of the screen. (Moot for now —
> see below — but the insertion point is commented for whoever redraws it.)

> **`vector-effect: non-scaling-stroke` is wrong for the robot.** It is right
> for the street's hairlines and wrong for limbs that *are* 6-unit strokes: it
> pins them to 6 device pixels, and the robot turns to wire as the frame scales.
> The rule now exempts `.pf-bot`.

**Verified.** Production build clean, `/profile` prerendered static, lint clean.
The hero's final viewBox measures `571.0 173.5 250.0 59.1` — the zoom lands on
the drawn screen to the tenth of a unit. Checked at 1280×620, 1440×900 and
375×812; the pin is dropped below 960px and the drawing zooms off its own
position instead. The conveyor was measured moving at its stated 34 units/sec
with the readout tracking the robot.

> **Watch the browser pane's real surface.** It reports `window.innerHeight` as
> whatever you set, but composites a shorter one, so a screenshot looks clipped
> when the layout is fine. Measure `getBoundingClientRect()` and believe that,
> not the picture. Setting the viewport to ~1280×620 makes the two agree.

**Left undone, on purpose:** the seated figure and the dog are **not** in the
drawing. Both were drawn, judged not good enough, and pulled rather than shipped
half-right — the empty chair reads as somebody who has just stepped away. The
two insertion points are commented in `SceneDesk` and `SceneFore`. **This is the
next thing to do on this route.**

---

### 1.6 Four more sections on `/profile` (24 Aug 2026)

**What was asked for.** The reference's *homepage* carries four devices the
user wanted — its Tracks carousel, its by-the-numbers bar chart, its AI-tools
logo wall, and the mosaic that zooms out over twenty screenshots. The initial
plan put three on `/profile` and the mosaic on the homepage; the user chose all
four on `/profile`, and renamed two: **Where the hours go** and **The decade,
counted**. Three rounds of revision followed in the same session, and what is
described below is where it finished, not where it started.

**Where they landed.** `/profile` now runs eleven sections: hero, statement,
filmstrip, **tracks**, credo, **counted**, board, **mosaic**, experience book,
**tool wall**, street. New code is `components/profile/ProfileSections.tsx` +
`app/profile/profile-sections.css`. Two new build scripts:
`build-tool-logos.mjs` and `build-mosaic.mjs`.

| Section | What it does |
|---|---|
| **Where the hours go** | Four disciplines, one isometric drawing each, swapped by arrows. Every scene carries a looping CSS animation — blocks lifting in sequence, a write travelling up a database stack, tokens cycling through a component grid, connectors flowing. |
| **The decade, counted** | Nine horizontal bars on a log scale, filling and counting up as the section crosses the viewport. |
| **The tool wall** | 33 brand marks in two rows drifting opposite ways. 28 are real logos. |
| **Everything shipped** | A 300vh pin opening full-bleed on IMPRINT and pulling back to all twenty screenshots, with gaps and borders between tiles. |

**The street lost its software.** It was carrying all 33 tool names on name
boards, and the wall lists the same 33. Two sections saying the same thing on
one page is worse than either. The street now carries **disciplines and metrics
only** — Branding, Performance, GTM, ROAS, CTR, Budgets.

**The logos are real.** `scripts/build-tool-logos.mjs` fetches 28 of the 33 as
actual brand marks and records every source URL in the generated manifest's
header. Five have no mark anywhere and render as monogram tiles: Adobe Firefly,
Seedream, Nano Banana, Kling AI, Wan. **To fill one, drop the SVG in
`public/tool-logos/` and give it a `direct` entry** — the script does the rest.
Bible §4.1 has the three-tier sourcing.

**Six things that were bugs first.**

> **The tool wall looked like it had one row.** Row two was translated to
> `+max` and then had `p × span` *added* to it, which pushed it off the right
> edge entirely. Both rows now travel inside `[-span, 0]`; the second just runs
> it backwards.

> **The mosaic cropped every screenshot.** The window was 16:9 and the grid
> inside is 5 × 4, which makes each tile 3:1 — so `object-fit: cover` took a
> band out of the middle of all twenty. The window is 20:9 now, and its height
> is capped through `max-width`, because a `max-height` fighting an
> `aspect-ratio` simply changes the ratio again.

> **`.pf-wrap` collapsed to content width inside the mosaic's pin.** It carries
> `margin: 0 auto`, and in a *column* flex container an auto margin on the
> cross axis switches off `align-items: stretch` — so the wrap sized itself to
> 569px instead of the sheet's 1229 and dragged the window down with it through
> the aspect ratio. It presents as "this section is mysteriously narrow",
> nowhere near a margin. It needs an explicit `width: 100%`.

> **The mosaic's focus has to be measured, not computed.** Once the grid grew
> gaps and padding, a cell's centre stopped being `(col + 0.5) / 5` of the
> width and the computed focus drifted by tens of pixels at 5×. It reads
> `offsetLeft` / `offsetWidth` now, and derives the opening scale the same way.

> **Isometric labels cannot be placed isometrically.** A point far enough
> outside a scene to clear it is also far enough along the other axis to land
> back on top of it — "16 PARTS · AA" rendered across the token grid. Corner
> labels and captions are placed in screen space; only the stage labels, which
> track their own boxes, still use `Tick`.

> **A 200 is not a file.** Kling's logo URL returns its SPA's HTML shell with a
> 200, which was written out as a 122 KB "PNG" and rendered as a broken image.
> The fetcher checks magic bytes now.

**The chart was rebuilt twice, and the second one is the lesson.** It began as
four vertical bars. The user asked for five more figures, so it became nine
vertical bars — and at nine columns across the sheet each is 116px, which
forced the numerals down to 25px and the labels to 9px wrapping over three
lines. His verdict was that it looked stupid, and he was right: it read as a
spreadsheet, and comparing "9 years" to "1,000 designs" as two heights never
meant much anyway. It is **nine horizontal rows** now — label left, figure
right-aligned into its own column, bar spanning the full width beneath — and
the 240vh pin came out with it, because nine rows is a tall block on its own.
That also deleted a branch where the pinned and unpinned progress measures
disagreed below 700px, and returned ~1,400px of scroll to a long page.

> **If someone adds a tenth figure, add a row. Do not go back to columns.**

**Also worth knowing:** an earlier pass quietly added Figma, Photoshop,
Illustrator, Canva, Codex, Grok and Next.js to the tool list because they
appear elsewhere on the site. They had not been asked for. **The list in
`build-tool-logos.mjs` is the user's, exactly — do not extend it.**

**Verified.** Lint and production build clean, `/profile` still prerendered
static. Checked at 1280×620 and 375×812: all four scenes animating, nine bars
filling on a log scale and sharing a left edge, both tool rows drifting, the
mosaic opening on IMPRINT and resolving to a 5 × 4 grid with tiles measuring
1.78:1. The chart is better on a phone than the vertical version ever was —
all nine rows sit on one screen.

**Still undone:** the seated figure and the dog in the hero drawing, unchanged
from §1.5. That remains the next job on this route.

---

### 1.7 Banner spacing, everywhere (25 Aug 2026)

Eleven separate visual complaints — "massive gap" on four product pages,
"cramped" on three, "breadcrumbs too close to the nav" on four more — turned out
to be **one CSS rule**.

#### The rule, and why it read as fine

`app/globals.css` carried a "short-viewport banner easing" block that *set*
`padding-top` rather than trimming it:

```css
@media (max-height: 760px) { main .sd-banner-host { padding-top: 6rem } }
@media (max-height: 640px) { main .sd-banner-host { padding-top: 5.25rem } }
```

`main .sd-banner-host` is (0,1,1) and out-specifies every page's own hero class,
so below 760px tall it flattened **all twenty-one banner routes** to one number.
Measured at 800px vs 700px:

| route | designed | flattened to | Δ |
|---|---|---|---|
| `/philosophy` | 208 | 96 | −112 |
| `/about` | 200 | 96 | −104 |
| `/contact`, `/faq`, `/fun-apps`, `/projects` | 192 | 96 | −96 |
| `/agents/pact-agent`, `/resume` | 176 | 96 | −80 |
| `/terms`, `/privacy` | 160 | 96 | −64 |
| `/notebook` | 152 | 96 | −56 |
| pentacmd, qdex, pentashell, rm-copilot, aegis-vault | 112 | 96 | −16 ← the only intended case |
| `/agents/migi` | 96 | 96 | 0 |
| `/apps/forget-anything`, `/apps/migi-app`, `/games/pixelville`, `/projects/[slug]` | **0** | **96** | **+96** |

Those last four hold their top padding on an **inner wrapper**, so the rule
*added* 96px to banners that had none and pushed their CTAs further down — the
exact opposite of easing, and the "massive gap" that got reported. The rule was
gentle on five of twenty-one pages and wrong on the rest.

> **The lesson generalises past this rule.** A selector broad enough to say
> "the banners" will also hit the banners you were not thinking about, and a
> declaration that *sets* a value cannot know what it is overriding. If the
> intent is "take some off", the rule has to name what it is taking it from.

It is now a cap with an explicit selector list — `.ab-hero, .ph-hero, .fq-hero,
.cx-hero, .nb-mast, .rz-mast, .jr-mast, .sd-banner-tall` — at `9rem`, which is
the floor `journey.css` already documents (below it the eyebrow slides under the
nav pill). `.sd-banner-tall` is the opt-in for banners that hold their padding
in Tailwind utilities. **A page already at or under 9rem is not on the list and
must not be added** — the rule can only take away.

#### Decisions he took explicitly

- **The fold is calibrated for 768px**, and scrolling below that is accepted.
  At 768 none of the `max-height` queries apply, so that column is the untouched
  design baseline.
- **MIGI, AEGIS VAULT and PixelVille keep their length.** They never met the
  fold at 600px even before breadcrumbs and answer blocks were added. Nothing
  was compressed to chase it. *"Prefer a banner that breathes over one that
  meets the fold"* — that trade was already made once in the wrong direction.
- **Masthead top space is 144px** on short viewports, ~78px clear of the nav.
- **Two shell widths, not five.**

#### Shell widths

`--sd-shell-read: 64rem` and `--sd-shell-wide: 75rem` now live in
`globals.css:6`, and all six per-page `--shell` declarations point at them.
Gutters at 1366px:

| | before | now |
|---|---|---|
| notebook, learnings, projects | 102 | 102 |
| journey | 110 | **102** |
| resume | 174 | **206** |
| about, philosophy, contact | 206 | 206 |
| faq | 222 | **206** |

> **These tokens are max-widths, not gutters.** Pages differ in whether padding
> sits inside or outside the max-width, so matching the token does *not* by
> itself match the gutter — `.nb-wide` (72rem, padding outside) and
> `.lp-container` (75rem, 24px inside) both land on 102px and are deliberately
> left alone. Measure the rendered gutter before changing a shell.

#### `/philosophy` — the hero was rebuilt

Stacked, it was **1296px tall**: a title capped at 15ch inside a 64rem shell, so
the right half was empty, and the six-principle ledger — the substance of the
page — sat below the standfirst where nobody saw it. It is now two columns from
1024px up, copy left and ledger right, so the height is whichever column is
taller instead of both added together: **763px**. Type steps down inside the
grid because the columns are ~430px, not ~1000px. Below 1024px the original
stacked layout is unchanged. The H1 also carried an orphan — "AI." alone on a
third line — fixed with a non-breaking space plus `text-wrap: balance`.

#### Everything else in the pass

- **`/about` H1** — `max-width: 16ch` was breaking it as "Who is Suman /
  Debnath?". Now 24ch, with `white-space: nowrap` on the `em` so the name can
  never split again when it does wrap on a phone.
- **AEGIS VAULT and Banking Co-pilot** — `pt-28` → `pt-32`, and `mt-5` on the
  breadcrumb so the nav pill, the status badge and the trail are not three lines
  clumped together. AEGIS's logo lost its extra `mt-6 md:mt-7`, which shortened
  the banner while the top gained air.
- **`ScreenshotFrame` `sizes` is now a prop.** It was hardcoded to
  `(min-width: 768px) 640px, 100vw`, correct for the two-up grid it was written
  for and wrong for the AEGIS hero, where the same frame renders ~1150px wide —
  so next/image served the 640px variant and the browser upscaled it 1.8×. That
  was the "pixelated" screenshot; `cover.png` is 1365×767 and was never the
  problem. **At 1× it is now exact (upscale 1.00); 1365px is the ceiling on a
  2× display** and only a wider re-capture improves it.
- **Kicker rules mirrored** on `/apps/forget-anything` and the `/apps/migi-app`
  hero. The migi-app `Kicker` takes a `mirror` prop precisely because that page
  has ten of them and only the centred hero eyebrow wants a rule on both sides.
- **The migi-app hero phone stack was clipping.** Its container is
  `overflow-hidden` (it crops the rotated side phones on purpose) and `mg-bob`
  lifts the centre phone `translateY(-14px)`, past the crop. Fixed with `pt-4`
  of headroom and the margin reduced by exactly the padding added, so the stack
  does not move.

#### Verified

Production build, 1366×630, measured rather than eyeballed — **the Browser pane
stopped compositing partway through and screenshots time out when it does**
(§2b's lesson, still true). Gutters land on 102/206 with no page in between;
`scrollWidth === clientWidth` on resume, faq and journey, so nothing overflows;
the AEGIS hero image reports upscale factor 1.00; both kicker rules measure 24px
with zero padding at either end. Lint and build clean.

---

### 1.8 Agentic readiness — an external audit, and the thing it caught (25 Aug 2026)

Vercel's **Is Agentic** scores a site on how well an agent can read it. Suman ran
it four times across the session and pasted each report in: **79 → 82 → 82 → 83**.

**The durable record is `AEO_PLAYBOOK.md` §9**, together with §3.5–§3.7 and the
new entries in §8. This is the session narrative; that is the reference.

**A rollback point was taken before anything was touched** — `git tag
pre-agentic-fixes` at `c99934e`. It is **local only**; it was never pushed.

#### The one finding that justified the whole exercise

The audit's first report said the homepage's `ProfilePage` node had no `name` and
no `description`. It did lack those, and they were added. But the reason it was
being read as the *identity* block at all was the real bug: `app/layout.tsx`
emitted the `Person` and `WebSite` nodes through
`<Script strategy="beforeInteractive">`, **which does not emit a script
element** — it serialises the payload into a `self.__next_s` push and lets the
client bundle build the tag.

So the site's entire identity — `jobTitle`, `sameAs`, the disambiguation, every
credential, on every one of 26 routes — existed only for a reader that executes
JavaScript. The static HTML of `/` carried exactly one literal block, whose
`mainEntity` pointed at a `#person` that was not in the document. Every other
JSON-LD on the site was already a plain tag; the root layout was the one
exception and it was the one that mattered.

That is **not** a scorecard problem. Any crawler that does not run JS — which is
most of them, most of the time — was reading this site without its identity.

#### The three commits

| Commit | What |
|---|---|
| `427f6e7` | `name` + `description` on the homepage `ProfilePage`; a **when-to-use** block in `/llms.txt` (best fit / poor fit / how to read it); the 404's recovery line |
| `a6afb57` | `Person` and `WebSite` made literal tags. **The one that mattered** |
| `d5b6eac` | House of Namus as an `Organization` — `contactPoint`, `address`, `founder` → `#person` |

`SITE_NAME` and `SITE_DESCRIPTION` moved from private consts in `layout.tsx` to
`lib/projects.ts` beside `SITE_URL`, and the contact email now comes from
`lib/resume.ts` in both nodes. Neither was tidying: the alternative was a second
copy of each string in a second file.

#### A measurement that changed the design

The 404 needed links out to `/sitemap.xml` and `/llms.txt`. Measured first, and
just as well — **at 375×667 that page had about 2px of slack**: the postscript's
bottom sat at 641.13px inside a 667px viewport whose container carries 24px of
bottom padding. `h-[100svh]` + `overflow-hidden` means anything past that is
clipped rather than scrolled to, which is the bug the 40svh → 36svh change had
already been made to fix.

So the line is gated on `min-height: 760px` rather than shaved out of measured
constants. It paints on every current phone and stands down on a 667-tall SE and
the 1280×600 desktop case. **The gate governs what is painted, not what is
served** — the markup is in the response at every size, which is what a fetcher
reads. Full reasoning in `AEO_PLAYBOOK.md` §3.7.

#### Two things were refused, and both are on the record

- **Markdown content negotiation** (`acceptmarkdown.com`) — the only remaining
  change that would move the number, declined with the score on the table. Five
  reasons in `AEO_PLAYBOOK.md` §8; the short one is that no major AI crawler is
  documented as negotiating for markdown today, and the cost is a `Vary: Accept`
  cache split, an edit to `proxy.ts`, and a markdown twin thinner than the HTML
  it would replace.
- **Contact details on the universities.** The audit asked for `contactPoint` and
  `address` on an `Organization` — and the Organizations it had found were West
  Bengal State University, PIBM and Great Lakes in `hasCredential[].recognizedBy`.
  Adding contact details there would be fabricated data about third parties under
  this domain's name. The honest answer was a real Organization, and it cleared
  the check on its own.

Suman confirmed he founded House of Namus and is authorised to publish its
contact details. Three judgment calls inside that node are flagged in
`AEO_PLAYBOOK.md` §3.6 — chiefly that `Person.worksFor` still says PIBM, because
that is his employer, and that `address` mirrors the Person's two locality-level
entries rather than inventing a registered office he has never claimed.

#### Verified

Every change against a production build, never `next dev`. Four JSON-LD blocks on
`/`, all parsing; `telephone` in no machine-readable surface; the serialised
`Person` node **byte-identical to production** after the email refactor, which is
what proved that refactor changed nothing. The 404 returns a real 404 with both
links in the body, and measures 641.13px at 375×667 — unchanged from before the
line existed. 22 public routes 200. Lint produces nothing for any edited file.

Two of the three remaining audit items are things this repo had already
concluded: brand discoverability is `AEO_PLAYBOOK.md` §6 restated, and markdown
is §8. **Treat the score as a proxy, not a goal.**

---

### 1.9 Twenty-one notebook articles (26 Aug 2026)

**What was asked for.** A list of thirteen article titles, plus a request to find
what was missing. The finished programme is **twenty-one**, written in six
batches. The extra eight were proposed and accepted: four covering AEO and
agentic readiness — the highest buyer-intent subjects and the only ones a
prospective client searches for — three on the security argument, and one
technical piece on the JSON-LD defect found the day before.

**The standing reference is `BLOG_GUIDELINES.md`**, written in the same session
and pointed at from `AGENTS.md`. Format, title and answer-block rules, category
and tag discipline, the no-duplicate-question constraint, the voice rules and the
never-publish list. Read that before writing a post; this section is the story.

#### Structural decisions, all taken by Suman

| Decision | Choice |
|---|---|
| Where career and marketing pieces live | **Broaden `/notebook`**, rather than build a second section |
| How many new categories | **Three** — Career, Marketing & AI, Method. "Opinion" was proposed and rejected as a bucket that would hold one post |
| Sequencing | **Batches of three, his input first.** Five rounds became six |
| Length | **6–12 minutes, matched to the topic**, rather than a house figure |

The notebook was five engineering categories and nothing else, so every career or
marketing piece would otherwise have landed in "Practice" — one bucket holding
two unrelated kinds of writing. It now runs eight categories: Career 5,
Marketing & AI 7, Method 6, Practice 3, Next.js 2, and one each for CSS & Layout,
React and Graphics.

`llms.txt` and `lib/pages.ts` both described `/notebook` as an engineering
notebook and were rewritten, because it is not one any more.

#### The process that made these worth publishing

Every batch began with questions and waited for answers. That was not politeness
— **the material is the entire defence against the writing reading as
generated.** Specificity comes from incidents, dates and numbers that only he
has, and a post written without them is the vague filler that gets dismissed.

**Nine claims were corrected against evidence rather than transcribed.** The
pattern is worth keeping, because in every case the corrected version is stronger:

- **LEGATUS "multiple security audits"** → written as his own review rounds. The
  three *independent* audits belong to the banking work and nothing documented any
  for LEGATUS. A sceptic checks that first.
- **The `remembermenot` repository** was described as the fossil of the first
  attempt; it is dated January 2026, a year after that attempt. The post says
  exactly that instead.
- **"Late 2024" versus a GitHub history starting December 2025.** Raised as a
  credibility risk, since the audience for these posts checks. He confirmed the
  earlier date and that the work was on platforms that never touched GitHub, so
  the post states the gap and explains it.
- **"GitHub secret scanning would stop the push"** → push protection matches known
  provider formats only. The post says what it will not catch.
- **"Every assistant knows never to hardcode a key now"** → too strong; they still
  emit inline placeholders and, more to the point, read secrets from files.
- **Supabase and Upstash** were named as the services whose keys he rotated. The
  post says "a set of database and cache keys" — same credibility, no map of which
  providers hold this site's credentials.
- **The ChatGPT citation** arrived two days after a week of AEO work. Published as
  a sequence with a callout stating what cannot be concluded, because asserting
  cause from a two-day window contradicts `AEO_PLAYBOOK` §7 in front of exactly
  the readers who would notice.
- **"What I look for when hiring"** → he is not a hiring manager. Reframed as what
  the term should mean and how anyone would check it.
- **"Getting an AI product role"** → he has not got one. Written as the argument he
  is currently making, stated as untested in the opening paragraph.

**One post was deferred and later rescued by evidence.** "What I got wrong in my
first six months" was dropped from a batch because the supplied material was a
general principle rather than incidents. The commit history supplied the
incidents: eight repositories created between 21 June and 1 July 2026, six of
which received their last push within three days, and two which did not and
became the agent fleet. Publishing the dates is what makes it land.

#### A code change the programme forced

`app/notebook/[slug]/page.tsx` hardcoded `TechArticle` for every post. That is
specifically technical how-to writing and is the wrong claim over a personal
career essay — a false statement in machine-readable data, on the site that had
just spent a day fixing exactly that class of problem. The type now follows the
category: technical categories keep `TechArticle`, everything else is
`BlogPosting`.

#### The repository boundary

Suman granted read access to 27 repositories including private ones. The agreed
limit was **commit messages and READMEs only, never diffs** — diffs are where
accidentally-committed secrets live, so not reading them is the actual protection
rather than a formality. That boundary held for the whole programme.

#### Verified

Production build each batch. Twenty-six posts on the index, every new URL 200,
all eight category archives populated, sitemap, RSS and `/llms.txt` carrying all
of them (they derive from the registry, so a missing one means the registry step
was skipped), correct article type per category, and **147 questions across
`lib/faqs.ts`, `lib/page-faqs.ts` and every post with zero exact and zero near
duplicates** — checked with a script rather than by eye.

> **The build ran out of memory twice, on type-checking, and it is not the code.**
> `npx tsc --noEmit` passes alone. It is heap pressure from concurrent dev servers
> on a machine already noted as short of disk (§3 item 0c).
> `NODE_OPTIONS=--max-old-space-size=8192` clears it.

---

### 1.10 The query set, the entity rework, and one measurement (26 Aug 2026)

**`TARGET_QUERIES.md` exists**, which `AEO_PLAYBOOK` §7 had been asking for since
it was written. Sixty-one prompts across seven buckets, each with the page that
owns it, a five-grade scale, a run protocol and an empty results log.

Two things about it that were mistakes worth recording:

- **The first draft was written without asking him anything.** He had said "help
  me with this"; twenty-nine queries were produced by reading the codebase, which
  made them circular — they could only test what the site already said, never
  surface a gap. §7 was the one section in the whole playbook that could not be
  derived from the repo, which is precisely why it had stayed unwritten. It was
  rebuilt from his input.
- **`§2` now says who runs it**, because he had to ask. A person runs it by hand,
  logged out, three runs per query, taking the modal answer. **An agent cannot** —
  web search queries an index, which is a different instrument from asking an
  assistant and reading its answer.

**The entity rework.** The disambiguation named the AWS advocate and the ORNL
power-systems researcher. A search for "Suman Debnath portfolio" returned nine
results with this domain absent and surfaced **at least four** well-indexed people
of the name — the two that were named are the easy cases, and the two that were
missing (another India-based software engineer, an AI/ML lead at a compute
company) sit far closer to this profile. Enumerating all four was asked for and
rejected; `AEO_PLAYBOOK` §6 carries the reasoning and the surface-by-surface
split.

#### The measurement that reorders everything below it

> **⚠ OVERTAKEN 27 Aug 2026 — one day later, and it reversed for Google.**
> `AEO_PLAYBOOK.md` §6.1 is the current picture and this paragraph is history.
> Google now returns an AI Overview *and* an organic result for the query below.
> The index behind Claude's search still returns nothing — not even the exact
> domain string — so the finding did not evaporate, it **split**. Do not quote
> the sentence below as the state of play.

`PentaCMD 47M parameter model terminal commands` returns **nothing**. That page
has been live roughly two months and describes an artefact with a name almost
nobody else uses.

> **The technical bucket is not losing on quality. It is not indexed.** This is
> §5.6's "being crawled is not being indexed", measured. No amount of further
> writing moves a query whose page is in no index — so submission, verification
> and inbound links come before more content, and before the off-site work in
> item 0d.

Google Search Console verification **is already live** — the meta tag is on the
deployed site. Bing is not: there is no `msvalidate.01`. Bing Webmaster Tools can
import the property from Search Console rather than verifying again, and Bing is
what feeds Copilot and what `scripts/indexnow.mjs` submits into.

> **Bing is verified as of 27 Aug** — §1.16. The `msvalidate.01` observation
> above is stale too; the property was imported and 91 pages have been crawled
> through it.

**Still outstanding, and only Suman can do it: run the baseline.** Eighteen
starred queries, one engine, three runs each, about an hour. Today is the clean
moment — twenty-one articles are live and nothing has indexed them yet, so
anything that moves over the next two months is attributable.

---

### 1.11 The notebook rebuilt as a publication (26 Aug 2026)

Five separate briefs, in the order they were given. `BLOG_GUIDELINES.md`,
`NOTEBOOK_COVERS.md` and `SEO_AUDIT.md` are the standing references; this is the
narrative and the decisions.

#### Cover art on all twenty-six

Suman generated the images from the prompts in `NOTEBOOK_COVERS.md`; the pipeline
is `scripts/build-notebook-covers.mjs`. **74.4 MB of PNG became 4.9 MB of WebP —
93% smaller, averaging 189 KB.** Masters live in the git-ignored
`_masters/notebook-covers/`; the WebP output is committed because it is what the
site serves.

1280 wide is not a round number: the largest a cover renders is `100vw` on a
phone, so 430px at 3× wants about 1290px. Quality 80 is where the paper grain
starts to band. The grain is also why these cost 189 KB rather than the 40 KB
flat art usually costs — noise is what every codec is worst at, and it stays
because it is most of what stops the set looking like clip art.

> **Never commit a generated PNG.** Twenty-six of them is 74 MB and git keeps
> every version of every blob for ever. The real constraint is history, not total
> size — ten attempts at one image cost ten times one image permanently.

> **`_masters/notebook-covers/` is git-ignored, therefore unbacked.** A generator
> will not return the same image twice from the same prompt. Same standing risk
> as `_source-film` (§3 item 0b). **Back it up off this disk.**

#### The front page, and three routes behind it

`/notebook` is composed by `magazine()` in `lib/notebook/index.ts` rather than in
the template — hero, "Start here", a rail per category with three or more
articles, chips for the rest, then the archive. Every section draws from one pool
and marks what it took, so **no article appears twice**: verified at 26 unique
links, zero duplicate card titles.

`AEO_PLAYBOOK.md` §3.4 carries the four-route architecture and why the filter is
not on the front page. Two things worth repeating here:

- **Sorting had to be fixed first.** Twenty-four of twenty-six articles share a
  publication date, so "newest first" was falling through to the order `POSTS`
  was typed in. `popularityScore` breaks the tie.
- **There is no page two yet and that is correct.** Curation consumes 16, the
  archive is the remaining 10, and `/notebook/page/2` 404s until the notebook
  reaches 29. The lever is `POSTS_PER_PAGE`.

**`NotebookBrowser` was deleted** — the client component holding every card so it
could filter them. Its replacement is `/notebook/all`, where the pool is
genuinely everything and all 26 articles are server-rendered before any filtering
runs.

#### Colour and rhythm

Reported as "one large canvas of repeating things". Three section tones now
alternate — plain paper, a wash of the section's **own** accent via `color-mix`,
and one dark ink slab for "Start here" — taking the page from one background
colour to five. A category strip under the lead names all eight with counts,
because the rails only show four.

Category archives now draw a **chosen** banner figure rather than a hashed one:
`CATEGORY_BANNER` maps Marketing & AI to a waveform, React to a constellation,
CSS & Layout to a lattice, Graphics to moiré. Typed against the union `BannerArt`
exports, so a renamed form fails the build.

#### The reading surface

The article page had no image, no sense of position, a contents list that
scrolled away, and three bare links at the end. It now carries the cover, a
progress bar measuring the `<article>` rather than the document, a contents rail
that sticks above 76rem while the prose keeps its 44rem measure, and a real end
block.

> **Two things are built and unverified.** Sticky engagement and the progress
> fill both need scrolling, and **the page will not scroll in a non-compositing
> preview pane** — `scrollHeight` 9741 against `innerHeight` 900 with `scrollY`
> stuck at 0 after both `window.scrollTo` and `documentElement.scrollTop`. Layout
> is measured and correct; the behaviour wants a look in a real browser.

#### The SEO audit, applied

`SEO_AUDIT.md` is the record. Counted before and after: **"actually" in 8 titles
→ 0**, question-shaped 13 → 7, no meta title over 60 characters, no description
over 160, no duplicates.

Two fields were added to `Post` to make it possible — `metaTitle`, because the H1
and the search result want different words, and `keywords`, because a tag is
taxonomy and a keyword is a target phrase. Both optional, both falling back to
what came before.

**One slug of twenty-six renamed**, with the full chain in one commit: a 308
redirect, the cover renamed in two places, the `NOTEBOOK_COVERS` heading keyed by
slug, and the `TARGET_QUERIES` row. The redirect carries a warning that it is
permanent and must not be tidied away — carrying it for ever is the real cost of
a rename, and the reason twenty-five slugs stayed.

> **The cause of the title problem was documented and it was ours.**
> `BLOG_GUIDELINES` §2 required question or claim shapes and `AEO_PLAYBOOK` §3.1b
> wanted the title to carry the query. Both are right for a machine. Applied to
> twenty-six articles in one sitting they produced a blog that read like an FAQ.
> §2 of the guidelines now carries the correction.

#### Where the design work stopped

> **All three findings below were carried out on 26–27 Aug — §1.12 and §1.13.**
> This block is kept as the record of what was measured and why, not as work
> outstanding. The measurements are still the reference; the to-do is closed.

Suman asked for `/notebook` to feel like **hbr.org**. That site was examined
directly and measured rather than recalled. Three findings:

1. **Two typefaces with separate jobs** — Tiempos serif for editorial headlines,
   GT America sans for furniture. **The notebook is the one part of this site
   that dropped the serif.** `Instrument Serif` is already loaded, already in
   `tailwind.config.ts` as `font-serif`, and already used on `/about`, PACT,
   Pentashell, Forget Anything, the MIGI app and the banking page — the notebook
   references it exactly once. This is the highest-value change available and it
   costs nothing to load.
2. **Every section uses a different grid.** Measured on their front page:
   `605/302/302`, then `262×4`, then `350×3`, then `124/745/261`. They never
   repeat one twice in a row. Ours uses the same `minmax(16rem, 1fr)` for every
   rail, which is the real reason it reads as repetitive.
3. **Density.** An HBR four-up row is 182px tall. Our cards are ~440px.

> **Do not clone HBR, and not mainly for legal reasons.** Their front page is
> dense because they publish dozens of articles a week with an editorial staff.
> Twenty-six articles in that layout would look like an empty magazine — their
> density is a consequence of their volume. Their cool grey and teal is also
> wrong against this site's warm cream, which is deliberate and documented.
>
> **Take the serif, the grid variety and the density. Keep the palette and the
> voice.**

---

### 1.12 The notebook redesign, carried out (26 Aug 2026)

The work §1.11 stopped short of. Suman supplied two references — **hbr.org** for
the magazine front and a **theconversation.com** article for the reading page —
and asked what was possible before anything was built. Both were examined
directly and measured through the DOM rather than recalled.

Six commits, pushed as `43308b4..9eed856`.

#### What the references actually turned out to be

| | Measured |
|---|---|
| HBR front | 1210px container, 4-col base of 262.5px. Zones run `605/302.5/302.5`, `262.5×4`, `350×3`, `124/745/261`, `262.5×4`. Compact cards are `auto 106px` — **text left, thumbnail right** |
| The Conversation article | 972px container → **724px main, 228px sidebar**, prose measure **600px**. Sidebar is **not sticky**: author, disclosure, partners, DOI, republish |

> **Half of what looks like editorial density on The Conversation is
> advertising.** Four of its five `div.slot` positions rendered at h=0–1 — they
> are ad slots. The genuinely editorial sidebar is institutional furniture this
> site has no equivalent of: no DOI, no partner university, no republishing
> licence. Copying the *positions* was never the problem; the question was what
> could honestly go in them.

#### What was built, in four passes

1. **Geometry** (`8086dfd`). Four numbers on `.nb` — measure 38rem, rail 17rem,
   gutter 3.5rem, band 58.5rem — that sum exactly. This fixed an alignment fault
   nobody had spotted: the masthead was a 44rem box centred on the page while
   `.nb-read` centred a 62.5rem grid inside a 66rem box, so **the H1 started
   roughly 9rem right of the first paragraph under it.** Both halves were
   individually centred, which is why it read as deliberate.
2. **The rail** (`cdf052e`). One module became five, and `CompactCard` was
   written — text left, thumbnail right — because `ArticleCard` needs ~20rem and
   renders a postage stamp in a 17rem rail.
3. **Fixes and colour** (`1d5dbe5`). See below.
4. **Blocks and the article foot** (`e6a133b`), then **the front page**
   (`d048036`) and a final fix pass (`9eed856`).

#### The three things Suman rejected on seeing it

- **The sticky contents list.** Pinning it meant the four modules below kept
  moving and slid underneath. The opaque background added in pass 2 made the
  overlap *legible* rather than *right*. **Nothing on the reading page pins now**
  — the rail is ~1,400px tall, so no version of pinning it was going to work.
- **Square thumbnails cropped the art.** `object-fit: cover` fitting a 3:2 cover
  into 1:1 discards a third of the width, and unlike the lede's 16:9 there is no
  safe area protecting that — `NOTEBOOK_COVERS.md` reserves a sliver top and
  bottom, not a third off each side.
- **"Not every damn box needs to be in light color."** He was right. Every
  interruption on the page — answer block, facts, callouts, contents, author,
  buttons — was the same near-white wash, so the most important block on the page
  was also the faintest thing on it. The accent system in Bible §6.8 is the
  answer: colour driven by category, varied fill weights, and one ink block.

> **Contrast was measured, not eyeballed.** Cream on the eight raw accents scores
> 4.40–7.42; CSS & Layout's clay misses AA for body text at 4.40. Darkening every
> accent 10% (`--nb-accent-deep`) lifts the worst case to 5.17:1 with no
> per-category exception.

#### Two overflow bugs, one of which mattered

Both pre-existing, both found while verifying something else.

- **`BannerArt` hung 5px off each edge** on every notebook route because it is
  `100vw` and 100vw includes the scrollbar. **It never produced a visible
  scrollbar** — `body` carries `overflow-x: hidden` — and saying otherwise was an
  overstatement corrected in the commit. `/about` clips; the notebook mastheads
  did not. Fixed on `.nb-mast`, not `.sd-banner-host`, which `globals.css`
  forbids clipping.
- **`.nb-rows` ran 33px off a phone.** `minmax(24rem, 1fr)` — a bare minimum is a
  hard floor, so the track stayed 384px inside a 327px container. This one *was*
  visible on a real device. It was briefly written off as an emulation artefact
  and that was wrong: `innerWidth` reported 409 because the document genuinely
  was that wide. Now `minmax(min(24rem, 100%), 1fr)`. Every other floor in both
  notebook stylesheets was checked and fits.

#### The editorial pass

All 26 posts carry a **pull-quote lifted verbatim** — selected, never written.
Nine carry a **promo card**; seventeen carry none, because twenty of the
twenty-six list `/projects` in `seeAlso` and putting that card in all twenty
would have reproduced exactly the interchangeable ad slot the design was copying.
Quotes and targets were chosen by hand; only the insertion point was computed.

#### Where this leaves the three §1.11 findings

| §1.11 finding | State |
|---|---|
| Grid variety | **Done.** 3 · 4 · 3 · 4 · 2, no two adjacent zones alike |
| Density | **Done.** Nine articles before a scroll, all 26 linked from the front page, seven text-only headline lists |
| **The serif** | **Done 27 Aug** — see §1.13 |

Two smaller things left open on purpose: `CompactCard` holds a **third local
copy** of a six-line `formatDate` (matching `ArticleCard` and `magazine.tsx`
rather than inventing a fourth convention — fold all three into `card.ts` when
something next touches them), and the share module carries **no X or LinkedIn
intents**, because two more outbound endpoints would have to be matched on
`/privacy`.

---

### 1.13 The serif (27 Aug 2026)

The last of the three §1.11 findings, and the one two sessions had walked past.

**One constraint shaped all of it: `Instrument Serif` is loaded at weight 400
and there is no bold.** Every headline that takes the serif therefore drops from
600 to 400 — leave it at 600 and the browser synthesises a fake bold, which
smears the stems of a high-contrast face. Sizes go up to buy back the presence
that losing 200 weight units costs, and the negative tracking comes off: it
suits a geometric sans and closes up a serif.

Seven classes, measured in the browser at 56.4 / 27.2 / 20.8px for H1/H2/H3:

| Class | Was | Now |
|---|---|---|
| `.nb-title` | 600, clamp 2–3.25rem, −0.025em | serif 400, clamp 2.15–3.6rem, −0.005em |
| `.nb-h2` | 600, 1.5rem | serif 400, 1.7rem |
| `.nb-h3` | 600, 1.125rem | serif 400, 1.3rem |
| `.nb-faq h2` | 600, 1.25rem | serif 400, 1.45rem |
| `.nb-end-name` | 600, 1.125rem | serif 400, 1.4rem |
| `.nb-lead-title` | 600, clamp 1.6–2.35rem | serif 400, clamp 1.8–2.7rem |
| `.nb-tile-title` | 600, 1.3rem | serif 400, 1.5rem |

**Everything at or below 17px stays Manrope 600** — card, row, compact and
headline-list titles, plus all furniture. At 400 this face gets thin on cream
below about 18px. Display serif, text sans: the split is the system, not an
omission, and it is forced by the single weight rather than chosen.

> **If you want the small card headlines in serif too, that needs a different
> face.** Instrument Serif has no weight to give them. It would mean loading a
> text serif with a bold — a real decision about page weight, not a CSS tweak.

Two notes in `PAGE_OPTIMIZATION.md` were wrong and are corrected:

- **§3.4** justified `preload: false` on the grounds that the serif is "never in
  the first screenful". It now is, on every article. The preload stays off
  anyway — re-enabling it puts a fifth high-priority preload on *every* route to
  serve two — and **LCP is unaffected**, because the lede image at 936×527
  (~493,000px²) beats the H1 (~68,000px²) as the LCP candidate. Re-check that if
  the lede image ever goes.
- **§6.4's snippet was broken.** `grep -c 'as="font"'` counts matching *lines*
  and the served HTML is minified onto one, so it always returned 1 — it would
  have passed just as quietly at forty preloads. Now `grep -o | wc -l`.

---

### 1.14 The readiness panel, and what it forced everywhere else (27 Aug 2026)

Suman asked for AEO, GEO, SEO and agentic readiness to appear in his skills on
the homepage, first position on the Chapter 01 "Marketer" card, standing out.
It took three passes because the first two were wrong in instructive ways.

**Pass one was misdated and over-specific.** It went in as a panel rather than a
sixth bullet — that part was right, because the card is dated 2016—2023 and this
work is 2026 — but the copy led with "a generated `llms.txt`" and "scored
79 → 83". Both were cut. 79 was never a baseline: it was already the product of
a long stretch of work, and 75 before that, so quoting the delta credited four
points for a job mostly done by the time it was measured. And `llms.txt` is one
artefact of a much larger practice; leading with it made the discipline sound
like publishing a text file.

**Pass two fixed a factual error in the title.** It read "Answer-engine
optimisation, end to end", which puts GEO underneath AEO. Checked against
current sources rather than assumed:

- **SEO** wins the ranking and the click.
- **AEO** makes the answer extractable — AI Overviews, snippets.
- **GEO** earns the citation when a generative engine writes the answer.
- **Agentic readiness** is the broadest: whether an agent can crawl, understand,
  cite *and act on* the site at all.

AEO and GEO are siblings, not parent and child. There is no academic consensus
separating them and some practitioners treat them as one thing, but the majority
position is that they are distinct jobs. Title became "**Agentic Readiness**
Strategy" — the broadest of the four.

**Pass three was colour and a layout bug.** The panel is
`#DE2A22 → #A81818`, not the `#FF2C2C` asked for: white on `#FF2C2C` measures
**3.72:1** and the panel carries about forty-five words of body copy. `#DE2A22`
is the warmest red in that family clearing AA. `#FF2C2C` still runs the top rule
and the corner glow, where nothing is read on top of it.

> **The card-height bug is the one worth remembering.** The two cards are grid
> items and stretch to match, so whichever holds less content gets dead space.
> Adding the panel moved 168px of it from the Marketer card to the AI Builder.
> The first fix used `mt-auto` on the closing quote — which *relocated* the hole
> from the bottom of the card to its middle rather than removing it. The real
> fix is to stop pooling it: both lists are `flex-1` with `justify-between` and
> a `gap-6` floor, so the surplus distributes across the gaps between items.
> Measured 24px throughout on the Marketer card and an even 60px on the Builder,
> both cards 1259px with 1px trailing slack. `space-y-*` cannot do this — it
> sets margins, which add on top of distributed free space instead of absorbing
> it.

Then the claim had to become true everywhere else. `AEO_PLAYBOOK.md` §3.6b now
lists the five surfaces that declare skills and the two rules for adding to
them — the short version being that `knowsAbout` in the `Person` JSON-LD is the
one that matters most, and that `/about` and the `/resume` summary were left
alone on purpose because backdating a 2026 discipline into a 2016—2023 role is
the same mistake as making this a sixth bullet.

#### The twelve eslint errors, and why ten of them stay

Linting the whole tree for the first time surfaced **12 errors in files this
session never touched**. They are not new bugs: `eslint-plugin-react-hooks` is
at **7.1.1**, the version that ships the React Compiler rules as errors by
default. The code got linted harder, it did not get worse.

**They affect nothing today.** React Compiler is not enabled — there is no
`reactCompiler` flag in `next.config.ts` — so the rules optimise nothing, and
`next build` does not run eslint in Next 16, which is why every build this
session passed at exit 0 with all twelve present.

Distribution is the whole story: **9 of the 12 are in `components/robot/`**.

| Rule | n | Where |
|---|---|---|
| `set-state-in-effect` | 7 | LearningsClient, ChatTakeover ×3, RobotMascot ×2, useWebSpeech |
| `immutability` | 4 | VisitorPing, PactVisuals, RobotModel ×2 |
| `purity` | 1 | RobotMascot — `useRef(Date.now())` |

**Two were fixed, 27 Aug**, both verified in the browser:

- `PactVisuals` — `let running = -1` reassigned inside a nested `.map()` during
  render, purely to produce a flat index. Replaced with a module-scope
  `FAM_START` of `[0, 4, 5]`. Verified the sweep still runs
  `7 → 0 → 1 → 2 → 3 → 4 → 5`, one lit at a time, across both family boundaries.
- `LearningsClient` — an effect hand-resetting five state values whenever `exp`
  changed. Replaced with `key={modalExp?.id}` on `<ExperienceModal>`, which is
  the fix React's own docs prescribe for this shape. Safe because the modal
  returns `null` when closed and has no exit animation. Verified by dirtying it
  — credential index 3, zoom viewer open at 1.5× — closing, and reopening both
  a different experience *and the same one*: index 0, viewer closed, scale 1 in
  both cases, with all five thumbnails and the main canvas re-rendering (876
  ink px sampled, so a real PDF draw rather than a white fill).

**The other ten stay, deliberately.**

> **The robot's nine are not safely fixable without watching the robot.**
> `ROBOT_ROLLBACK.md` exists because it fails in subtle, symptom-indexed ways,
> and those effects are a deliberate imperative animation state machine. Note
> that `RobotModel`'s two are mutations of **three.js `AnimationAction`
> objects** — which is what effects are for; the rule cannot tell a three.js
> object from React state, so it is a false positive in spirit.
>
> **`VisitorPing`'s one is the arrival-sent guard.** `AGENTS.md` §6–7 already
> flags that file: tracking does nothing under `next dev`, and `saveVisit()`
> returns `false` rather than throwing, so a break there either double-counts
> every visit or sends none, silently. Do not touch it without a production
> build and the Telegram output in front of you.
>
> **`useWebSpeech`'s one is probably load-bearing.** The obvious fix — lazy
> `useState(() => detect())` — also runs during SSR and would make `supported`
> differ between server and client. The effect is likely avoiding a hydration
> mismatch on purpose.

The honest time to clear the remaining ten is the session that decides to turn
React Compiler **on**, because that is when they start paying for themselves —
and it should be done with the robot visible on a real screen.

---

### 1.15 The off-site track opened, because Claude could not read the site (27 Aug 2026)

**This started as a bug report and turned out not to be a bug.** Suman asked
Claude about the site from his phone; it fetched the homepage and then failed on
`/about`, `/resume` and `/agents/migi`. Screenshots came in asking what was
broken.

Nothing was. Verified from outside: all three URLs return **200** to a
`Claude-User` user agent, byte-identical to what `Googlebot` and
`Claude-SearchBot` get, with a self-referencing canonical on the right host and
`<meta name="robots" content="index, follow">`. `sitemap.xml` serves all 66 URLs.
No bot wall, no cloaking, no Vercel challenge.

The failure was Claude's own URL allowlist: it may fetch a URL the user pasted or
one a search returned, **not one it merely read inside a fetched page**. The
homepage worked because it was pasted. The subpages existed only as links inside
it.

> **The second half is the part that matters.** Claude's workaround was to search
> for those URLs so a real search result would authorise the fetch — and the
> search returned nothing. Reproduced independently here: `site:` and
> quoted-domain queries surface the parent `houseofnamus.com`, four other Suman
> Debnaths, and Wikipedia. **Not one URL from this subdomain, including the
> homepage.**

That is §1.10's PentaCMD measurement again, from a new angle — previously a query
returned nothing; now an assistant actively tried to reach the pages and could
not find one. Two independent instruments, same reading. `AEO_PLAYBOOK` §6's
"get indexed before doing any of this" is now measured twice.

#### The Brave problem, which reorders the fix

`scripts/indexnow.mjs` was dry-run and then **submitted — accepted (200)**, all 66
URLs. The payload is four fields: host, key, keyLocation, urlList. No page
content, no personal data, nothing about anyone else — it is a list of addresses
already public in `sitemap.xml`. **But it does nothing for the index that caused
this.** Claude searches **Brave**, and Brave participates in no push protocol and
offers no submission console at all. IndexNow buys Bing, Yandex, Seznam, Naver —
Copilot and DuckDuckGo downstream. Google needs Search Console. Brave needs
inbound links and time, and nothing else.

> **So playbook items 2 and 3 stopped being "after indexing" and became the
> indexing.** For Brave there is no submission channel to wait on. Off-site links
> are not a follow-up to getting indexed here; they are the mechanism.

#### Done this session

**GitHub profile README — live.** `Sumandebnath943/Sumandebnath943` did not exist;
it was created public and pushed. Role line, `identity.targeting`, the
disambiguation sentence's positive half and the PentaCMD/Qdex specs are
**verbatim** from `lib/resume.ts` and `AEO_PLAYBOOK` §6 — paraphrase is what
weakens the signal. Roughly thirty links into this domain from a well-indexed
profile, which is the actual payload.

> **The negation was drafted in and then removed on his instruction: "do not host
> the competing token."** The §6 table does not cover off-site surfaces, and a
> GitHub profile is both a human destination and a bulk-parsed one, so it was put
> to him rather than decided. **He generalised the rule: no competing token
> anywhere off-site either.** Treat §6's table as settled for GitHub, HuggingFace
> and any future profile — positive half only.

**HuggingFace model cards — live.** Suman pushed both himself through the web UI
after authenticating. Verified on the raw files: three backlinks to this domain
per card, an `## Author` block, a BibTeX entry, no stale warning, no competing
token. Two corrections to what §6
assumed. Both models are **already on HuggingFace with substantial cards** —
`SumanDebnath943/PentaCMD-47M` (weights, tokenizer, inference code, full eval
table) and `SumanDebnath943/Qdex-1.5B-GGUF` (**note the `-GGUF` suffix**; there is
no bare `Qdex-1.5B` repo). So item 3 was never "write cards"; it was "add the
backlink", and neither card contained a single link to this site.

Drafts add: a byline-and-links line under the H1, a `## Author` block carrying the
same verbatim disambiguation, and a BibTeX citation block. PentaCMD's card also
loses a stale `⚠️ Working name — rename PentaCMD if you choose a different one`
warning that has been sitting on a public page since June while the name went
final across the entire site.

> **The push was blocked here and stayed blocked.** `hf` CLI is installed but
> holds no token — no `HF_TOKEN`, no cached credential; an upload attempt returned
> **401** and wrote nothing. It was not worked around: a token must not be pasted
> into an agent session. Suman authenticated and pushed. **If a future session
> needs to write to HuggingFace, that is the route — ask him to run `hf auth
> login`, or hand him the web-UI steps.**

Drafts are in the scratchpad, not the repo — they belong to HuggingFace repos, not
this one.

**HuggingFace profile — filled in.** `fullname` read `Suman debnath`, lowercase
`d`, and was the only surface anywhere spelling the name differently; exact-string
consistency is most of what cross-source entity resolution runs on. Fixed. The
bio and Homepage fields were empty and now carry the identity sentence and the
portfolio URL.

**Profile bios for Bluesky, Mastodon, LinkedIn and Facebook** were written to
character limit per platform and handed over as copy-paste text. Same identity
sentence throughout, no competing token, and **no phone number or email in any of
them** — the URL is the only contact route on a public social profile.

**Bluesky and Mastodon added to the site.** Two new pills in the footer's social
row with official simple-icons marks, plus both profiles in `sameAs` and
`rel="me"`. Verified in a dev build rather than assumed: six `link[rel="me"]` in
the head, six pills with the right labels and hrefs, icons rendering as marks and
not empty boxes.

> **Bing Webmaster was already done** — he had imported the property from Search
> Console a day or two earlier. It sat on the "outstanding" list for a session
> because nobody asked. **Ask before listing something as blocked on him.**

#### The rule that came out of this

> **No source-repo links on profile surfaces.** The first README linked three
> public repos next to the model rows; he asked for them gone: *"I do not want to
> show my repo links on the profile section."* Removed in `6623fef`. The profile
> points at the work and the portfolio, not at the code behind it. HuggingFace
> weights links stayed — those are the artefacts, not repositories. **Model cards
> are a different surface**: a card linking its own code is conventional, those
> links predate the instruction, and they remain.

> **One edit was proposed, refused, and then asked for — in that order, and the
> order is the lesson.** HuggingFace sat in `sameAs` without a matching
> `rel="me"`. Correct finding; wrong moment. **He had asked for social-profile bio
> text and got an unrequested edit to `app/layout.tsx`**, so he stopped it. Raised
> later as its own question, it took about four seconds to approve — `9232a32`.
>
> He then asked whether the finding was merely fallout from the bad edit. It was
> not, but it was not independent either: **the same grep produced both**, and the
> gap had been on screen earlier in the session, unnoticed. Worth saying plainly
> rather than dressing up as prior discovery. **The mistake was acting unasked,
> not noticing.** A real finding that arrives mid-answer to an unrelated question
> is still a real finding — hold it, finish the actual question, then raise it.

---

### 1.16 Three scanners triaged, three things built (27 Aug 2026)

Suman ran the site through **Bing Webmaster Tools** (91 pages, 0 errors, 49
warnings), **isitagentready.com** (twelve fix prompts) and **geometrics.app**
(49/100), and asked for a plain-language read on what was actually wrong.

**The durable record is `AEO_PLAYBOOK.md` §10**, with §2.1 and §3.1c for the two
decisions that needed their own sections. This is the narrative.

#### The sort: 3 built, 4 false positives, 9 refused

Nine of the twelve agentic prompts describe **a public API this site does not
have** — an API catalog, OAuth discovery, protected-resource metadata,
`auth.md`, an MCP server card, a skills index, plus DNS-AID and WebMCP. The four
`/api` routes are the contact form, the visitor beacon, the crawler log and a
cron hook. Publishing manifests for them would advertise internal endpoints and
claim capabilities that do not exist, which is the same class of defect as the
`TechArticle` type on career essays (§1.9).

> **0/100 on "Protocol Discovery" is the correct score for a portfolio.** It is
> a document, not a service. §10.1 has the three-scanner comparison; do not
> spend engineering risk moving that number.

#### The finding that justified the exercise

`/profile/portrait.webp` shipped with `alt=""` in **both** notebook author
blocks — `ArticleRail.tsx` and `app/notebook/[slug]/page.tsx` — so **52
instances across 26 pages** said nothing. That is a captioned photograph of the
person the entire domain is trying to make resolvable against four
better-indexed namesakes, on more pages than any other image on the site.

Bing's **other 32** "missing alt" pages are decorative images with deliberate
`alt=""`, most also `aria-hidden`. That is the WCAG-correct treatment and it
stays — Bing's checker cannot tell "empty" from "missing", so the warning count
will never reach zero and should not.

#### Titles: one line caused fifteen warnings

`app/layout.tsx` appends `· Suman Debnath` — **16 characters** — to every title
that does not use `title.absolute`. Nobody counted it. `SEO_AUDIT.md` §5 had
trimmed twenty-six notebook titles to 60 by measuring the page's own string, so
they shipped at 74. Six pages rewritten (114→65, 110→63, 106→54, and three in
the eighties); `/about`, `/profile` and `/contact` deliberately untouched
because their length *is* the entity query. **Budget: 44 characters of your
own.** §3.1c.

`ProjectMeta` gained an optional `metaTitle`, because `positioning` is visible
copy and must never be shortened to fix a meta tag — same split as `metaTitle`
on notebook posts.

#### Two decisions Suman took explicitly

- **`Content-Signal: ai-train=yes, search=yes, ai-input=yes`.** Every scanner
  suggests `ai-train=no`. He asked what it would cost before choosing, and the
  answer is §2.1: training is how a model names him *without* searching, the
  content is an advertisement rather than a product, and GPTBot has been
  crawling for months so declining now forfeits future models and recovers
  nothing. He chose permissive.
- **One honest manifest, not the full set.** `/.well-known/ai-catalog.json`
  lists eight things that genuinely exist and return 200. Nothing invented.

#### A trap avoided, and one that was walked into first

> **`rel="author"` was already taken.** The root layout emits `<link
> rel="author" href="{SITE_URL}">`. Adding `/about` and `/profile` as two more
> author claims in the Link header would have made three assertions, two
> disagreeing — the half-made claim §6 records for `sameAs`/`rel="me"`. The four
> identity pages use `describedby`, which is registered and may repeat.

> **The plan to rewrite `robots.ts` as a route handler was wrong, and
> `AGENTS.md` line 1 says why.** `MetadataRoute.Robots` in *this* Next version
> has an `other` field — "non-standard per-user-agent directives passed through
> verbatim" — which is exactly the escape hatch needed. Training data said it
> did not exist. Reading the type made item 1 a three-line change instead of a
> rewrite of the file that governs ~30 crawlers.

> **The first measurement of title lengths was wrong.** `${#t}` in bash counts
> **bytes**, and an em dash is three of them — so every title containing `—` or
> `·` read 3–8 characters longer than it was. Recounted properly in Node before
> anything was rewritten. Worth remembering the next time a length is measured
> on a string that is not ASCII.

#### The most valuable thing, and it is on no list

**Bing Webmaster Tools is verified.** §1.10 and `AEO_PLAYBOOK` §6 both recorded
it as not verified and named it as what keeps this site out of Copilot and
DuckDuckGo. Crawling 91 pages through it settles that, and unblocks
`scripts/indexnow.mjs`.

**Pushed and submitted the same day: 66 URLs, accepted (200).**

#### And then the premise underneath it turned out to be stale

This section first justified that with "§1.10's measurement — returns nothing".
**Suman then produced screenshots of Google returning an AI Overview, an organic
result and a sidebar card for that exact query**, from a signed-out incognito
window. `AEO_PLAYBOOK.md` §6.1 is the corrected record; §1.10 and §10.6 now
carry warnings pointing at it.

The picture is **split**, not reversed:

| Index | State, 27 Aug 2026 |
|---|---|
| **Google** | Holds the site and *synthesises* from it — the AI Overview quoted 47M params, 299K pairs, ~87% exact-match and Pentashell, all correct |
| **The index behind an agent's web search** (US-only, not Google) | Nothing on four queries, **including the exact domain string** |

> **The conclusion survived; the reasoning had to be rebuilt.** Indexing still
> outranks scorecard points — because one major non-Google index holds nothing
> from this domain, not because no index holds anything. §6's "get indexed
> before doing off-site work" gate is now half-lifted, and for Brave it never
> applied: Brave takes no submission and has one input, inbound links, which
> *is* the off-site work.

> **The process failure is worth more than the finding.** That 26 Aug number was
> quoted as live fact three times on 27 Aug — in a report, a summary and a
> commit — before anybody re-ran it. `AEO_PLAYBOOK` §7 says *do not trust a
> single run*, and the rule was broken by an agent citing the same document that
> states it. **Any indexing claim in these files now carries a date, because it
> expires.** Re-measure before quoting; a scorecard is a snapshot and so is an
> index.

#### Verified

Production build and `tsc --noEmit` clean; lint clean for every edited file
(the 17 remaining repo-wide errors are pre-existing, in `scripts/`). A 33-check
script against `next start`: Content-Signal emitted once inside the `*` group
with all 35 agent groups intact; **52 labelled portraits across all 26
articles**, none left empty; six titles at their target lengths and the three
identity pages untouched; nine Link relations on documents and **none on
`/_next` assets**; the catalog served as JSON, cross-origin, 8 entries, contact
email matching `lib/resume.ts`, no phone number; and **every one of the nine
advertised URLs returning 200**. `/desk-4f7a` still returns 307 with
`X-Robots-Tag: noindex`.

**Nothing was touched in `proxy.ts`, `app/api/track` or `VisitorPing`,** so the
§6 verification constraint in `AGENTS.md` does not apply to this session.

---

### 1.17 A second Telegram bot, carrying only the human signal (27 Aug 2026)

The complaint was volume: bots, crawlers and auditors had buried the alerts
worth reading. He asked for a second bot receiving **only genuine human
visits**, and was explicit that nothing already working could be put at risk —
he would accept an addition, never a rewrite.

**Where the noise actually came from.** Four things write into the one chat:
`/api/crawl` (one message per crawler per page), `/api/track` arrivals labelled
`🖥️ Automated scan`, ordinary visits (four messages each), and `/api/contact`.
The firehose is the first of those, not the notifier — which is why the parked
option in §3 item 9 exists and why it is the cheaper lever if volume ever
returns as a complaint.

**The constraint that shaped the design: a visitor cannot be known to be human
on arrival.** The decisive signal is `interacted`, and the arrival payload does
not carry it — at t=0 nobody has done anything. It first reaches the server on
the +3s card refresh, and reliably only at the summary. So a fast human alert
is a guess and a certain one is late. Bot 1 already covers fast-and-uncertain;
bot 2 was built as the late-and-certain one.

**What was built.** An optional mirror: **visit reports, hot actions, contact
messages**, and nothing else. No arrivals, no journey cards, no mute
confirmations, no crawler alerts. Env: `TELEGRAM_HUMAN_BOT_TOKEN` /
`TELEGRAM_HUMAN_CHAT_ID`; unset means no mirror, and deleting either is a
complete off switch with **no deploy**.

#### Decisions he took explicitly

| Question | His call |
|---|---|
| Remove human alerts from bot 1? | **No.** Bot 1 untouched, both feeds run |
| Mirror `❓ unclear`? | **Yes** — it is mostly borderline humans |
| Mirror `💨 quick bounce`? | **Yes**, all three engagement levels |
| Mirror hot actions? | **Yes**, live, not only inside the report |
| Contact form messages? | **Yes**, every one |

> **`❓ unclear` is not a robot bucket.** Score 1–2 means a real browser with a
> real screen and real cores that either did not scroll or arrived from a
> hosting network. Headless UA and webdriver score 3 on their own and land in
> `🤖 automated`, which never reaches the report path at all. Including unclear
> is what keeps the recruiter behind a corporate Azure proxy.

> **Telegram forbids bot-to-bot.** He asked whether bot 1 could simply forward
> to bot 2 — a good instinct, since it would keep new code out of the sensitive
> contact path. It is impossible: a bot never receives updates originating from
> another bot, and can only forward from a chat it belongs to. **Only bot 2's
> own token can put anything in bot 2's chat.** Do not re-propose it.

#### What was deliberately refused

**Threading and a journey card in bot 2.** Message ids are per-chat, so bot 1's
`mid`/`smid` mean nothing there. Mirroring the thread would need a second pair
round-tripping through the browser — changing the `/api/track` response shape,
the `Session` type and `summaryPayload`, which is the most fragile code in the
repo. Not worth it for a nice-to-have. Bot 2's messages are standalone.

**A card id stored in Postgres instead.** It would need new columns, and
deploying code ahead of its migration silently drops every write (§2b). The
`reportMsg` map gained an optional `hmid` instead — per-instance and
best-effort, exactly like the `mid` beside it, and enough to stop a reload
posting a second report in bot 2 while bot 1 correctly edits its first.

#### Why bot 1 is genuinely untouched

Three existing lines changed in `app/api/track/route.ts`, and all three are the
`reportMsg` map gaining `hmid`. No message text, timing, threading, card logic
or gating condition was altered — `git show 39711de -- app/api/track/route.ts |
grep "^-"` is the check. In `app/api/contact/route.ts` the message template was
extracted into `contactMessage()` so both bots send one string rather than two
drifting copies.

> **The mirror has no vote in the contact route.** It rides as a third
> `Promise.all` entry whose result is **not destructured**, so it costs no extra
> wall-clock time and `notified` still decides alone whether the sender is told
> delivery failed. A second chat being unreachable must never make a delivered
> message look undelivered. It also carries a 5s timeout the main send does not
> need, because the main send is the thing being waited for.

#### Verified

`tsc --noEmit` and the production build clean; lint clean for both edited files
(the 27 repo-wide problems are pre-existing, in `ignorelearningportfolio/` and
`scripts/`). **Confirmed live by Suman after setting the env vars and
redeploying:** one visit, `lunar-marten-62`, produced a hot action and a visit
report in both chats at the same minute — **four unread in bot 1, one in bot
2**, which is the whole point of the change visible in a notification list.
Rollback point `rollback/pre-bot2-mirror` is pushed.

### 1.18 Two Search Console structured-data reports, cleared (27 Aug 2026)

Google emailed two reports against the property. Both were real and both were in
the code; neither was a scanner guessing.

**The critical one: `Invalid object type for field "mainEntity"`**, on `/about`
and `/profile`. Every `ProfilePage` on this site pointed at the person by
reference alone — `mainEntity: { "@id": <site>/#person }` — which is valid
schema.org and is how the graph has always stayed DRY. **Google does not
dereference an `@id` across `<script>` blocks.** It saw an object with no
`@type` and rejected it.

> **This was predicted.** The comment above the JSON-LD blocks in
> `app/layout.tsx` says that if an extractor ever proves unable to follow the
> `@id`, the fallback is to inline the object. One has. The fallback is now the
> code.

The odd part, worth recording because it explains why only two URLs were named:
`/` and `/resume` carry the identical pattern and were **not** flagged, and the
`dateModified` report resolved `/resume`'s item name as "Suman Debnath". So
Google sometimes follows the reference and sometimes does not — most likely
because `/resume` emits its own `Person` node at that `@id`. Depending on it
either way is the mistake. All four now use `personRef` from **`lib/schema.ts`**:
the same `@id`, with `@type` and `name` inline, so a reader that resolves nothing
still gets a named Person.

**`Invalid datetime value for "dateModified"`**, on `/resume`. `RESUME_UPDATED`
is `"2026-08-13"`; Google's profile-page spec wants a datetime. The constant
stays a plain date — it also drives the visible footer label — and
`schemaDateTime()` widens it to `2026-08-13T00:00:00+05:30` at the point of
emission only.

**Five non-critical Q&A issues**, one shape on all four `QAPage` URLs: `author`
and `datePublished` absent on the Question, and those plus `upvoteCount` absent
on the `acceptedAnswer`. Required fields were always present; these are Google's
recommended set. Added as `qaAuthorship` / `qaAnswerAuthorship`.

> **`upvoteCount` is 0 and stays 0.** These pages have no voting. The field was
> asked for, a number was needed, and the honest number is zero.

> **`datePublished` is a fixed constant, not `routeDate()`.** Route dates are
> regenerated from git and move forward whenever a page is touched; a publication
> date that advances is a false claim. All four nodes were committed 25 Aug, so
> the constant is real.

**Converting `QAPage` → `FAQPage` was considered and refused.** It is arguably
the more correct type — Google reserves `QAPage` for pages where *users* submit
answers — but `/about`, `/profile` and `/projects` already emit an `FAQPage` at
`<url>#faq` through `<PageFaq>`, so converting would put two `FAQPage` nodes on
each. Folding the owned question into `lib/page-faqs.ts` instead would change
visible copy and collide with the one-question-one-URL rule. Filling the fields
was the safe path; the type stays.

**Expect no visible change in Google.** Q&A and FAQ rich results were restricted
to forum- and institution-shaped sites in 2023 and this portfolio was never
eligible. What this buys is authorship and freshness for the answer engines that
read the markup, a critical issue cleared, and two quiet reports — so the next
real defect is not buried under five known warnings.

#### Verified

`tsc --noEmit` clean; production build clean, all 26 routes still prerendered.
The emitted JSON-LD was read back out of `.next/server/app/{index,about,profile,projects,resume}.html`
— all eight nodes correct, every `@id` unchanged. **Nothing visible was touched:**
the change is entirely inside `<script type="application/ld+json">`, which no
runtime code reads. Search Console will stay red until Google recrawls; click
**Validate fix** in both reports after the deploy.

---

### 1.19 Three sections rebuilt from the references' mechanics (28 Aug 2026)

Three sections, each modelled on a site the user supplied: a marquee band at the
foot of the homepage and an accordion replacing the "05 / Operating Principles"
grid (`benjamincreative.me` and `nbnzia.com`), plus a statement wall on
`/profile`. Committed as `23feac8`.

**All three were built twice.** The first pass worked from screenshots, and the
verdict on it was exact: *"they look like the references, but their mechanism,
their feel, their elegance are nothing like the references."* That is worth
recording as a method note, because the second pass only worked by opening the
references in the browser pane and **measuring** them — transforms sampled frame
by frame, computed styles read off the live DOM, pseudo-elements enumerated. Six
of the eight things that made the difference were invisible in a screenshot.

#### What measurement found that a screenshot could not

| | Screenshot said | Measurement said |
|---|---|---|
| Marquee speed | constant | **~80px/s idle → ~186 while scrolling**, same direction, easing back over ~1s |
| Marquee band | flat orange | vertical gradient `#FD6A3A → #FB4617`, **and a `border-top: 1px solid rgba(255,255,255,0.25)` inset 32px** |
| Marquee type | heavy caps | **PP Neue Montreal Medium (500), title case**, -3px tracking, band 2.30× the type size |
| ASCII field | abstract texture | **a photograph**, full bleed, panel aspect = the image's aspect |
| ASCII section | a band | **1188px on a 598px viewport — 199vh** |
| Third line | grey | **white**; all three rise staggered, and grey is a *frame of the entrance* |
| Accordion | click to toggle | **hover**, and it never closes — which is why it needs no `+`/`−` |
| Accordion image | a fade | **a curtain**: parked at `translateY(100%)`, clipped by the row, sliding up |

#### Two measurement errors of my own, both recorded in the commit

**`toDataURL` on a WebGL canvas lies.** Hashing the reference's canvas twice
1.2s apart returned identical bytes, and on that basis the first build shipped a
still field. Without `preserveDrawingBuffer` the buffer is stale by the time
`toDataURL` reads it, so the test would report **any** scene as unchanging. Two
screenshots three seconds apart are completely different, and patching
`requestAnimationFrame` on the live page counts ~274 callbacks a second. The
rule is now in `PAGE_OPTIMIZATION.md` §1.6.

**A hidden preview pane freezes CSS transitions too.** §1.5 of that document
already warns that the pane suspends rAF; it also suspends transitions, which
made the accordion look stuck mid-open and sent me hunting a bug that was not
there. Check `document.visibilityState` before believing any interaction test.

#### The statement wall, and why the picture is baked

`scripts/build-ascii-portrait.mjs` converts `public/profile/portrait.webp` into
128×82 characters and commits the result to `lib/ascii-portrait.ts` — 11 KB of
text, **2.5 KB gzipped**. The server renders it into a `<pre>`; that is what a
crawler, a reader with JavaScript off and anyone on reduced motion gets. The
canvas then reads its data **back out of that `<pre>`** rather than importing
it, so the photograph is shipped exactly once.

Three things about it that are not taste and should not be adjusted by feel:

- **The crop matches the grid's *display* aspect, not `COLS:ROWS`.** Cells are
  0.6 as wide as they are tall, so a 128×82 grid displays at 0.937. Cropping to
  128:82 stretches the face.
- **The band is `aspect-ratio: 0.9366`, not a `vh` height.** At 132vh the band
  came out 979×787 against a field that wanted 979×1045 and a fifth of the
  portrait was cut off. The reference's panel is its image's aspect for exactly
  this reason. It lands near 175vh on the sheet.
- **The field draws in three tone bands**, not one colour. A ten-step ramp
  encodes tone in the *shape* of each glyph; drawing them all at one alpha
  throws that away and the photograph flattens into texture. This was the single
  change that made the portrait read.

#### Verified

`tsc --noEmit`, eslint and the production build all clean. On the prod build:
the canvas advances frames (signature changes across paints); the strip measures
2.31 against the reference's 2.30 with the hairline and gradient present; the
accordion opens on hover with exactly one row open, caught mid-curtain at
`mediaY: -16` travelling to `-67`. No horizontal overflow at 375px on either
page. All six principles are in the server-rendered HTML with all six thumbnails
referenced. Console clean apart from the pre-existing `_vercel/insights` 404s on
localhost.

#### One thing that is deliberately not a replica

**The typeface.** Both references use PP Neue Montreal Medium, which is not
licensed here. Manrope at 500 with the references' exact tracking (-0.039em on
the wall, -0.033em on the strip) and leading (1.0) is the closest thing already
loaded — every *metric* matches, the letterforms do not. Do not add a font for
this; §4 of the Bible and `PAGE_OPTIMIZATION.md` §3.4 both cost real work to
settle.

---

### 1.20 A twenty-seventh article, and one cover outside the house style (29 Aug 2026)

One post — `empty-between-projects`, in **Career** — plus the first cover that
does not belong to the `NOTEBOOK_COVERS.md` §2 style. Commits `403f9a2` and
`bf12586`.

The subject is the flat stretch between builds: the elation while something is
being made, and the emptiness when there is nothing left to add. The two
neighbouring posts already own the adjacent ground — `finishing-is-not-building`
is why the projects die, `the-cost-of-building-alone` is the absence of
disagreement — so this one had to claim different territory, and does: the low is
capability going unproved. With no degree, no engineer job title and no team to
vouch, the artefact is the only evidence the ability exists, and it has a shelf
life. That also explains what the burnout framing cannot — why the low lands
hardest **after** a good stretch rather than a bad one.

**The evidence is this repository's own log, checked rather than recalled.** Six
commits between 18 July and 11 August, spread over four days, longest gap eight
days; 183 between 12 and 28 August, over sixteen days. Nothing else changed in
between. `git log --date=short --pretty=%ad | sort | uniq -c` reproduces it.

#### The headline was changed, and the reason generalises

The first title was *"I only feel capable while something is being built"* — the
honest sentence, and still the argument the body makes. His verdict was one word:
self-destructive.

He is right, and it is worth stating as a standing rule rather than a one-off
correction. **The notebook is not a diary; it sits on a site whose other job is
convincing a client or an employer.** A headline appears on the index, in the
search result, and on whatever card gets shared — three surfaces where nobody has
read the body yet. A title that volunteers a limit on the author's own capability
works against the site everywhere it lands, however true it is inside the piece.

Now *"The empty week after a build is a cost, not a verdict"*: the same claim
stated as what the piece concludes rather than what it confesses. The body keeps
every admission, because a reader who reaches it has opted in. The reasoning is
in a comment above the `title` field so it does not get reverted later by
somebody who thinks the first version was braver.

#### Two things about the popularity score that are not obvious

`popularityScore: 87` was chosen to sit one above `overflow-hidden-kills-position-sticky`
at 86, which makes this `mostPopularPost()` and the head of the editor's ranking
on `/notebook/all?sort=ranked`. The per-factor comment argues all five numbers
rather than asserting the total, per `BLOG_GUIDELINES.md` §8.

**But the front page's "Editor's selection" tile still shows the sticky article,
and that is not a bug.** `magazine()` fills its zones in order and each marks
what it consumed — `hero`, `picks`, `brief`, `row`, then `features`. This post is
the newest, so `brief` takes it for the LATEST column before `features` ever
looks at the score. The highest-scoring *unused* post is what reaches the tile.
Anyone who wants a new post in the popularity slot has to either flag it
`featured: true` (which moves it to the lead instead) or reorder the zones — do
not "fix" it by inflating the score, which is already at the top of the ranking
everywhere the ranking is actually rendered.

#### The cover is a deliberate exception, not a new style

Supplied as a finished image: a hand turning a crank generator on a dark
workbench, a bare bulb lit only while the crank turns, **ONLY WHILE IT TURNS** set
in the right third. It is photographic, dark, and lit warm orange — none of which
is the flat cream-and-ink screen-print the other twenty-six share.

Raised as a three-way decision (ship it, restyle it, or rewrite §2 and migrate the
set) and **he chose to ship it as the exception.** That decision is recorded in
`NOTEBOOK_COVERS.md` §4 beside the post, with the guardrail attached: one
exception is survivable, a second one splits the set, and §2 is still the house
style until somebody rewrites it on purpose.

Two measurements from wiring it in, both useful later:

- **77 KB**, against the set's 189 KB average. A dark photograph carries almost
  none of the flat paper grain that `NOTEBOOK_COVERS.md` §5 identifies as the
  expensive part of this style.
- The type sits about **91% across the frame**, clearing the article lede's 16:9
  crop by roughly fifteen pixels. Inside the safe area, but only just — verified
  by looking at the rendered lede, not by trusting the arithmetic.
- Running `scripts/build-notebook-covers.mjs` re-encoded all twenty-seven and the
  other twenty-six came out **byte-identical**, so nothing extra entered history.
  Check `git status public/notebook` after running it; the §5 warning about
  permanent blobs is real.

#### One editorial boundary, decided rather than judged

The post uses the word *depression*, because he does, and it is qualified in the
body as conversational rather than clinical. A boxed warning states where the
article stops: a low that does not lift when the work restarts, or that is
present while building too, is not what the piece describes and belongs to a
doctor. `BLOG_GUIDELINES.md` §7 requires anything sensitive to be raised rather
than resolved by judgement — it was raised, with the softer wording offered, and
he kept it.

#### Verified

- `npx tsc --noEmit` and `npm run build` both clean; the route prerenders.
- The post is in `/sitemap.xml`, `/notebook/rss.xml`, `/llms.txt` and
  `/notebook/category/career` — all four checked by fetching them, not assumed
  from the registry.
- Rendered at `/notebook/empty-between-projects` with the cover loading through
  `next/image`; first in the editor's ranking on `/notebook/all`.
- `node scripts/build-route-dates.mjs` run.
- The only console errors are the two `_vercel/insights` 404s, which do not exist
  outside Vercel.

**Not pushed.** Both commits are on local `main`.

---

## 2. What changed in the session before (19 Aug 2026)

**One brief, eleven numbered complaints**, all against the homepage: sections
that were factually stale, closing statements that read as strays, and three
sections that spent enormous scroll height saying very little. Everything asked
for was done; nothing was deferred.

### Decisions he took explicitly

| Decision | Choice |
|---|---|
| Film title | **`Who am I?`** — his own replacement, chosen over two suggested alternatives |
| The `/now` section | **Lead with MIGI**, rather than syncing the existing ROASmind copy |

### What changed, by section

| Section | File | Change |
|---|---|---|
| Live feed ticker | `Announcement.tsx` | MIGI corrected 30+ → **44 agents**; MIGI Android App and `/journey` added; PentaCMD given its real numbers |
| The profile quote | `ExperienceNarrative.tsx` | Was a full-width 5xl italic sentence with a stray rule. Now a labelled, measure-constrained pull quote with a hung mark and an attribution |
| The AI Builder card | `ExperienceNarrative.tsx` | "10+ products" → **21**; the SLM, the fine-tune and the 44-agent fleet added; `Part 1 (70%) / Part 2 (30%)` → dated chapters |
| Now / Currently | `NowBuilding.tsx` | MIGI promoted to a lead panel with three figures; ROASmind demoted to "Also building"; Oxford named; date bumped |
| The film | `Film.tsx` | Retitled; standfirst rewritten; the privacy caption under the player replaced with credits |
| The Evolution | `Experience.tsx` | Three stacked full-width cards → a **horizontal snap rail**. 3,000px+ → **1,124px** |
| Operating Principles | `AIPhilosophy.tsx` | Hero/quote/pair/quote/pair/hero → **one uniform 6-card grid**, one closing quote. ~2,500px → **1,396px** |
| Experience | `OperationalHistory.tsx` | **Reversed to newest-first**; paddings halved; older roles summarised. ~2,200px → **1,350px** |
| Three closers | `Experience`, `AIPhilosophy`, `AcademicFoundations` | All three closing quotes now use one device: rule, label, single left-aligned blockquote |

### Follow-up pass, same day

Four more items, all homepage:

| Ask | What was done |
|---|---|
| Make the Evolution rail move with the page scroll | The section now **pins**: `sticky top-0 h-screen`, header as a fixed left column, cards driven across by `useScroll`. Track height is `100vh + measured travel`, so it costs no more scroll than the movement it buys |
| A fourth Evolution card? | Yes — **"Ahead / 2026 →"**, light violet. The only card in the future tense, deliberately, so it cannot read as something already shipped |
| Put the real KRAs in the Experience section | The section now **imports `experience` and `earlierExperience` from `lib/resume.ts`** and renders the labelled bullets verbatim. It used to paraphrase them |
| Clippy hides whenever the cursor moves | Fixed — see below. Copy rewritten: "a 10x Product Builder" was the site describing itself in job-ad language |

> **A regression the pin caused, and the lesson in it.** Moving the header into
> a pinned left column, I also shrank it — `text-3xl`, a 14px standfirst, 340px
> wide. Nothing was removed, but beside four large cards it stopped reading as a
> section header, and it was reported as *"the section lost its title and
> description"*. It is now `text-4xl xl:text-5xl` in a 400px column, which costs
> no height at all: the header measures 339px against a 533px card, and the card
> is what sets the pane height. **Shrinking type to fit a new layout is a
> content change, even when no content is deleted.**

The section kicker is now a **pill** on all four numbered sections, via
`components/ui/SectionKicker.tsx` (Bible §7.3). Shape is shared; colour is not —
each section passes its own palette because they sit on white, pale blue and
cream. Measured with full alpha compositing, the four run 6.6–8.4:1.

> **`min-height: 640px` was the wrong way to decide whether the pin fits.**
> CSS pixels are not screen pixels: a 1080p Windows machine at the 150% display
> scaling Windows itself recommends reports a viewport around **1280×600**, and
> browser zoom does the same. The guard silently dropped a large share of
> ordinary desktops to the swipe rail, and it was reported as *"the scroll
> pinning is gone"* — from a machine where it had never engaged.
>
> It now **measures the card** (`height + 56 ≤ innerHeight`) instead of guessing
> a breakpoint, which is correct at every scale factor. Confirmed pinning at
> 1280×600 and correctly falling back at 1280×500. **Any viewport-size
> breakpoint in this codebase should be read as a statement about CSS pixels,
> and checked against a scaled display before it is trusted.**

**The Clippy bug was in the dismissal rule, not the timing.** `handleActivity`
called `setShowClippy(false)` on *any* mousemove outside the card, so the
smallest twitch anywhere on the page killed it — and moving toward "Yes, let's
talk" killed it mid-approach, because a mousemove travelling to the card targets
everything in between first. An earlier fix exempted events targeting the card,
which does nothing for the approach. Activity now only feeds the idle counter,
and only while the card is hidden; once up it stays up for 20s or until
dismissed. Verified by dispatching mousemove/scroll/click at it and confirming
it survived.

> **Window scroll events do fire on this site.** Bible §5 trap 2 says they never
> do because the body is the scroll container. Measured on the current build,
> `document.scrollingElement` is `<html>`, `window.scrollY` tracks, and a scroll
> listener fired 19 times across one programmatic scroll — which is why
> `useScroll` works for the pin at all. The trap is still worth knowing (it was
> true when it was written, and `IntersectionObserver` remains the safer
> default) but do not assume it blocks a scroll-driven design without measuring.

### Two things worth knowing before touching this again

- **The era rail's pin is gated on width, motion preference, and a measured
  fit.** `min-width: 1024px`, no `prefers-reduced-motion`, and the first card's
  height plus 56px must fit the viewport. The fit clause is not
  belt-and-braces: a pinned pane is exactly one viewport tall, so on a short
  window the card is cut off by the very overflow that makes the pin work, and
  unlike normal overflow there is nothing the visitor can do to reach it. When
  any clause fails it falls back to the swipe rail, which keeps its
  `tabIndex={0}` and `role`/`aria-label` — an `overflow-x-auto` container is not
  reachable by keyboard without them.
- **The pinned row is clipped by its flex cell, not by the sticky pane.** Clipped
  at the pane, cards translating left slid straight over the pinned header and
  buried it.
- **The film's privacy promise moved, it did not disappear.** The visible
  caption under the player is now credits; the promise lives on `/privacy` and
  on the play button's `aria-label` and `title`. `/privacy` is still accurate —
  but if the facade is ever replaced with a plain iframe, that page becomes
  untrue, exactly as Bible §6.7 says.

### Verified

`npx next build` clean. The whole pass was checked in the browser at 1280 and
375 — the rail scrolls and the page itself never overflows horizontally at
either width, and no console errors. This is the first session in four where the
Browser pane actually composited.

---

## 2a. What changed the session before (17–18 Aug 2026)

**One goal, stated in the first message:** the site was "really ambiguous" and
did not give "a structured view and a concrete view into what I have actually
done." The fix was to be a video plus concrete achievements on the homepage.

**The video was built. The achievements block was not** — see §3. Read that
before assuming the original request is closed.

### The film — then `No Obvious Gift`, now `Who am I?`

A 5:57 animated documentary, on YouTube as `4AP2eui9720`, embedded on the
homepage. Assembled from 30 AI-generated clips, 3 stills, 13 coded sequences and
23 narration files. Pipeline and traps: Bible §9.1.

The division of labour that made it work: **Suman generated every clip, still and
voice line; the assembly, timing, grade, sequences and mix were code.** Veo
carried places, weather, rooms and the character; code carried anything with a
number, an interface or type in it, because Veo renders letterforms badly and
invents signage.

### Decisions he took explicitly

- **Animated documentary**, in the tradition of *Flee* — after rejecting both a
  line-art treatment ("complete trash") and an abstract one ("too abstract").
  Photoreal was never attempted; it is where AI video is weakest.
- **One clip of his real face**, once, on the closing ask. His own reasoning was
  right: identity drift is only visible by comparison, so a single appearance has
  no tell — and it becomes the only human face in six minutes.
- **The résumé opens the film**, then the story undercuts it. Opening on "I was
  never a talented child" led with weakness before anything had been earned.
- **Four months of unemployment became four months freelancing in Bangalore
  while interviewing** — truthful and far stronger.
- **Keep the Google AI watermark.** Offered removal by `delogo` (smears on
  detail) or reframing (costs 11% of frame); he chose to keep it.
- **Employer stays unnamed** throughout; CBS Ventures named only where it credits
  the CEO who hired him. All four KRA numbers on screen.

### Bugs found by measurement, not by watching

Each of these would have shipped unnoticed on a casual viewing:

- **132 seconds of silence.** `<Audio>` does not loop; the 114s music bed had to
  cover 248s, so nine chapters ran dry. Presented as "the music is inconsistent",
  and I initially misdiagnosed it as a level problem and spent a fix on duck
  depth before measuring and finding `-91 dB`.
- **A training-loss chart that climbed.** SVG y grows downward and the
  exponential was added rather than subtracted — a graph labelled TRAINING LOSS
  going up, in the one sequence meant to prove a technical claim.
- **The 21-person team collapsed into a vertical stack of dots** —
  `AbsoluteFill` defaults to `flex-direction: column`.
- **Two signatures crossing each other.** I assumed generated video could not
  produce his signature and composited the real logo on top; Veo produced it too.
- **Panels 2–4s behind the narration**, because their weights were set by eye.
  Fixed against `silencedetect` phrase boundaries.

### The homepage section

`components/sections/Film.tsx`, between `Announcement` and
`ExperienceNarrative`. A facade rather than an embed, and the one light section
on a dark site. Full rationale and the three consequences of that inversion:
Bible §6.7.

`/privacy` was updated in the same commit — the repo's own rule is that it must
match what the page actually loads.

**A three.js trap worth knowing beyond this section:** Vanta's stock colours
rendered purple because `ColorManagement.enabled` defaults true since r152 and
silently converts sRGB to linear. Anything written before r152 will hit this, and
nothing errors. Bible §5, trap 3.

### Left unverified

**How any of it looks.** The browser pane would not composite for the entire
session, so no screenshot was ever taken. Every check was structural (DOM),
computed (contrast ratios) or sampled (canvas pixels). The band against the black
sections above and below, the sun glare behind the card, and the mobile fallback
have never been seen.

Also unconfirmed: whether the YouTube video is Public or Unlisted (either embeds;
Private does not).

### Two open editorial calls

- The page clip shows **82,000 likes** while the narration says "eighty
  thousand". Both true, both on screen.
- ~~The title *No Obvious Gift* is his own line — arresting, and the first thing a
  recruiter reads.~~ **Closed 19 Aug:** it was arresting and it explained
  nothing. Retitled *Who am I?*.

---

## 2b. What changed two sessions before (13–14 Aug 2026)

**Two goals.** First, the visitor notifier was producing contradictory and
duplicated Telegram alerts. Second, Suman wanted a private dashboard so visits
became a searchable record rather than a chat log.

### Decisions he took explicitly

| Decision | Choice |
|---|---|
| Storage | **Neon Postgres** via the Vercel Marketplace, free plan, own project |
| Retention | **90 days full, then a year without the IP** |
| Dashboard path | Something **unguessable** — `/desk-4f7a` |
| Dashboard look | **Light and colourful** (it started black) |
| Bot/crawler alerts | Wanted them, but **one detailed message**, not three |
| GA4 | **Keep it**, plus a notice banner that does *not* ask for consent |

> **The GA4 notice is transparency, not consent.** He was told plainly that a
> notice-only banner does not make GA4 compliant under EU/UK ePrivacy, and chose
> it anyway. That is a reaffirmed decision. The consent question is still open
> and is his to make — do not quietly "fix" it either way.

### What was built

**Visitor notifier, rebuilt** — the journey card (one message per visit,
rewritten as it goes), crawler alerts from `proxy.ts`, scanner handling for
hosting networks, and Postgres persistence in `after()`. Mechanisms and their
traps are in Bible §6.1; they are not repeated here because they will outlive
this handoff.

**Admin dashboard, five phases** — storage and write path; proxy gate and login;
visitor table and per-visit detail; filters; retention job and privacy rewrite.
Then a richer record (14 extra columns), an insights page with six charts, a
light theme, and the country breakdown that replaced the map.

**Supporting pieces** — `scripts/admin-secret.mjs` (generates the password hash
locally; the password never leaves his machine), `scripts/db-migrate.mjs` with
`--check` and `--sql` modes, `vercel.json` for the daily purge cron.

**Also:** Next 16.2.6 → 16.3.0, clearing two high-severity advisories in bundled
deps. The résumé PDF was replaced with the August 2026 version, keeping the same
filename because that URL is printed in résumés already sent.

### Bugs found and fixed during verification

1. **Duplicate leave summaries.** Internal links are plain `<a>`, so every
   navigation fired `pagehide` and sent another summary. Fixed by the journey
   card, which edits one message instead of posting more.
2. **Active time above 100%** — 43s of activity in a 16s visit. Resuming a
   session kept the previous page's `lastActive`, so banked seconds were counted
   twice.
3. **A guard that made things worse.** The first fix for (1) blocked the second
   summary — the one carrying the complete journey. Removed the same day.
4. **`requestAnimationFrame` in the privacy notice** meant a background tab got
   it mounted invisible and retired unseen. rAF does not fire in a background
   tab at all.
5. **The notice covered the chat launcher on mobile.** `ChatTakeover` moves it
   to bottom-left at ≤820px; Tailwind's `sm` (640px) would have left them
   overlapping across 641–820px.
6. **Public IPs in `172.0–15` and `172.32–255` were treated as private**, so
   geo was skipped for them. Only `172.16–31` is private.
7. **A recruiter filed as a scanner.** Out-of-order `after()` writes let a stale
   "no interaction" overwrite a scroll that had happened. `interacted` is now
   sticky true.
8. **The status light lied.** "Connected" meant only that `DATABASE_URL`
   existed. Production had a connection string and no schema, so every visit was
   being dropped while the dashboard looked healthy.

### Verification lessons worth keeping

**Silent failure looks exactly like success — four times over.** The green
status light, empty filter dropdowns during a network wobble, a seed reporting
32 writes while landing 4, and code deployed ahead of its migration dropping
every write. `saveVisit()` returns `false` and never throws, which is right for
production and treacherous everywhere else. **Check return values; do not read
an absence of errors as evidence.**

**`next start` logs nothing per request.** An empty server log was twice
mistaken for "nothing was sent" and reported as fact. It is not evidence. When
Telegram traffic needs proving, count consumed message ids — they are
sequential, so a fresh arrival's id measures exactly what the previous visit
consumed.

**Test the handover, not just the code.** Migration instructions failed twice in
front of him — once because the file has a `#!` shebang and once because the
Vercel query editor rejects multiple statements. Both would have been caught by
running the steps once. Wrapping the DDL in `do $$ … $$` makes it a single
command.

### Left unverified

**Nothing on the dashboard has been seen.** The browser pane never composited
for the whole session, so no screenshot was possible. Every layout claim rests
on computed styles and measured geometry. Suman reviewed it himself and asked
for the light theme and the map replacement off the back of that.

**The authenticated cron path.** `CRON_SECRET` is set in Vercel, but the local
server has no way to inject it, so only the fail-closed path was tested. First
run is ~03:20 daily.

---

## 2c. What changed three sessions before (12 Aug 2026)

**Goal:** Suman built a second, standalone native Android app for the MIGI agent
fleet. The existing page described only V1 — a WebView wrapper of the dashboard's
mobile view. The page had to be rebuilt around V2 while keeping V1 on the record.

### Decisions taken (he chose these explicitly)

| Decision | Choice |
|---|---|
| Name | "MIGI Companion App" → **"MIGI Android App"** |
| URL | **Unchanged** at `/apps/migi-app` — no redirect, no SEO loss |
| Design | **Split-world**: graphite app-bands alternating with cream story-bands, aqua only in V2 territory |
| Technical depth | **Deep but sanitized** — see the warning below |
| Screenshots | **All 24 published as-is**, after being told what they contain |

> **Do not undo the sanitization.** The V2 source docs explain how the app
> authenticates against a live private dashboard, including a CSRF/`Origin`
> reasoning path and the backend hostname. Those were **deliberately kept out of
> the page prose** because MIGI is a live private system. Suman approved "deep
> but sanitized". Do not add them back from the source docs.

> He was told the screenshots contain real finance figures, job applications,
> LinkedIn drafts, a résumé filename and the backend domain, and chose to
> publish all 24 at full size anyway. That is a reaffirmed decision, not an
> oversight — do not "fix" it.

### What was built

- **`app/apps/migi-app/page.tsx`** — rewritten. Eleven sections: hero with a
  three-phone stack → lime stat band → Version 1 story with a horizontal archive
  strip and a V1-vs-V2 capability ledger → the rebuild and its design tokens →
  sticky four-feature showcase → rail of all 24 screens → native surfaces on
  lime → four engineering notes with an honest postscript → security → stack →
  CTA.
- **`components/migi-app/MigiAppVisuals.tsx`** — rewritten as a new component
  set: `Phone` (light/dark device frame), `HeroStack`, `StickyShowcase`,
  `ScreenRail`, `ArchiveRail`, `CapabilityLedger`, `PaletteStrip`,
  `NativeSurfaces`, `NoteCard`, `Stat`, `Lightbox`, `GridField`, `Aurora`.
- **Assets** — 24 screenshots copied to `public/migi-app/v2/` with clean names.
  V1's existing 20 shots in `public/migi-app/images/` are reused for the archive.
- **Renames** — `Navigation.tsx:62` and the `migi-app` entry in
  `CommandPalette.tsx`.

### Bugs found and fixed during verification

1. **Custom `next/image` quality is illegal here.** `quality={88}` / `70` / `95`
   all failed against `images.qualities`, which is unset. Removed; the default
   75 is the only legal value unless `next.config.ts` is changed.
2. **Mobile overflow** — the paired security phones spilled past 375px.
3. **Tablet clipping** — the hero side phones were cut at 768px; stack geometry
   retuned.
4. **`overflow-hidden` was disabling the sticky showcase.** The section carried
   it, which makes the section the sticky element's scroll container, so the
   phone column scrolled away instead of pinning. Removed — there is now a
   comment in the source saying why it must stay off.
5. **The sticky column ran out too early.** It released at grid offset 1814px
   while the fourth feature only becomes active at 1541px, giving MAS ~270px of
   pinned time. Added trailing bottom padding; MAS now holds for ~561px.

### A verification lesson worth keeping

Several hours went into chasing a sticky/scroll bug that did not exist. **When
the Browser pane is not displayed, the tab does not composite, and rAF,
IntersectionObserver and scroll events are all suspended.** Every scroll-driven
feature looks permanently frozen. `getBoundingClientRect` and layout still work,
so verify geometry numerically — and state plainly that scroll behaviour is
unverified rather than claiming it works. This is now recorded in the Bible §10.

### Left unverified

The four-phone crossfade in the sticky showcase is driven by an
IntersectionObserver, which cannot fire in a non-compositing tab. The pinning,
release points and dwell times were confirmed by measurement; **the crossfade
itself has not been watched running.** Suman reviewed the page locally and
reported it working, but a fresh scroll-through is still the cheapest sanity
check if you touch that component.

---

### Documentation pass (same session)

The repo had no usable documentation — a stale `handoff.md` about Hero/Loader
work, a `project_memory.md` with paths that no longer exist, and a stock
`create-next-app` README. Replaced with the three-document set described at the
top of this file, plus:

- `AGENTS.md` now points at all three and lists the four recurring traps inline,
  so every future session loads the map automatically.
- `project_memory.md` and `analysis_results.md` keep their content behind a
  superseded banner.
- `README.md` rewritten for this project.
- A second pass corrected product-page accents that had been **guessed rather
  than read** — Pentashell is cyan/magenta/violet, not terminal green; PentaCMD
  is the green one. `PROJECT_BIBLE.md` §11 now states plainly which parts of the
  documentation are verified and which are summarised.

---

## 3. Next steps

**The one genuinely unfinished thing is at the top.** The rest are
opportunities, roughly in value order.

~~00. The notebook redesign.~~ **Done, 26–27 Aug — §1.12 and §1.13.** All three
   findings from the end of §1.11 are closed: per-section grids (the front page
   now runs 3 · 4 · 3 · 4 · 2, no two adjacent zones alike), density (nine
   articles before a scroll, all 26 linked from the front page), and the serif.
   Kept here only so the item is visibly closed rather than silently dropped.

0. **Finish the homepage restructure — the original request is only half done.**
   The 17–18 Aug session opened with "the entire website is really ambiguous…
   it does not give a structured view and a concrete view into what I have
   actually done." The film answers that; the concrete achievements do not exist
   yet. Asked how far to go, he chose *"just the film for now, decide the rest
   after"* — so this is deferred by decision, not forgotten.

   The diagnosis is that nothing is missing; nothing is **ordered**. Thirteen
   sections make thirteen separate claims with no spine.

   He has already picked the proof to lead with — all four themes, when offered:

   | Theme | The specifics to draw from |
   |---|---|
   | The AI build record | 20+ shipped products, 46 agents, an SLM trained from scratch, an LLM fine-tuned — by someone who cannot code |
   | The scale of the job | 21 people across three functions, ₹30–40L vendor budget, 20+ programme launches, 99%+ on time over six years |
   | The growth numbers | 40–50% traffic growth, 677,503 reached on one post, 80,000 followers with no budget or team |
   | The speed feats | A 200-page brochure in a day, five SEO'd sites with payment gateways in a month, 100+ decks |

   Those need cutting to five or six specifics — *"ten things communicate
   nothing"* was the note. The film section (Bible §6.7) is the nearest example
   of the intended register.

0b. **Back up `_source-film/` off this disk.** It is git-ignored and is the only
   copy of the film's inputs and the studio that assembles them. The MP4 and the
   YouTube upload are outputs — they cannot be edited back into a new cut. Lose
   the folder and the film can be replayed but never revised.

0c. **Free disk space.** Both drives sat at 97–98% through the last session and
   it caused a real failure: a render died with a native crash that reported exit
   code 0, and the actual cause was `ENOSPC` during the bundle copy. `~2.3 GB`
   free is not enough for another film render.

0d. **Off-site corroboration — the highest-value work left on being found, and
   none of it is code.** `AEO_PLAYBOOK.md` §6 has it in expected-value order:
   a **Wikidata entry** first, then **HuggingFace model cards** for PentaCMD-47M
   and Qdex-1.5B linking back here, then a **GitHub profile README matching the
   site bio verbatim** — paraphrase weakens it, because consistency across
   independent sources *is* the signal. §5.6 is why it matters: Claude answers
   from Brave's index and Gemini from Google's, and this domain is in neither.
   The audit in §1.8 said the same thing in its own words and could not fix it
   either. **This is Suman's to do, not a coding task**, and it outranks
   everything below.

   > **Run the `TARGET_QUERIES.md` baseline before any of it.** Twenty-nine
   > prompts with the page that owns each and a grading scale, written 26 Aug and
   > **not yet run**. Wikidata takes months to show up in an index; without a
   > before, there is no way to tell whether it worked, and the whole point of
   > §6 is that it is the only lever left.

1. **Watch a week of real traffic before building more on the dashboard.** It
   has never been used against real data. Pagination and CSV export are the
   obvious next features, but which one matters will be obvious after a week and
   is guesswork now.

2. **The GA4 consent decision is still open.** Disclosed on `/privacy`, not
   consented. If it ever needs closing, that is Consent Mode v2 with GA blocked
   until opt-in — a real piece of work, and his call to ask for.

3. **Tracking is inert under `next dev`** (StrictMode vs the `initedRef` guard,
   Bible §6.1). Nobody can test the notifier locally without a production build.
   Small fix, and it is why several bugs reached production unseen.

3b. **The crawler beacon cannot see a single machine-readable file, and the
   absence reads as zero.** Found 26 Aug 2026 while fact-checking a notebook
   post. `proxy.ts`'s matcher excludes any path ending in a file extension —
   `.*\.[a-zA-Z0-9]{2,5}$` — which is correct for fonts, images and scripts and
   catches these four as collateral:

   ```
   proxy SKIPS  /llms.txt
   proxy SKIPS  /llms-full.txt
   proxy SKIPS  /sitemap.xml
   proxy SKIPS  /robots.txt
   ```

   Those are precisely the files an agent fetches, so the beacon systematically
   under-reports agent activity and there is **no data** for them rather than
   *zero visits* — which is the distinction `AGENTS.md` §7 exists to warn about,
   and it has almost certainly been read the wrong way at least once already.
   It also means `AEO_PLAYBOOK` §5.6's conclusions about which agents arrive are
   drawn from page requests only.

   The fix is a narrow allowance in the matcher for those four paths rather than
   relaxing the extension rule, which would put the beacon back in front of every
   font and script on every page load. **`proxy.ts` is the hot path and its
   tracking cannot be tested under `next dev`** (see item 3 and `AGENTS.md` §6),
   so this needs a production build to verify. Not urgent; it costs measurement,
   not correctness.

4. **The visitor table has no pagination** — capped at 200 rows. Fine now, will
   matter within months.

5. ~~Clear the pre-existing lint errors in `Navigation.tsx`.~~ **Gone —
   `npx eslint components/layout/Navigation.tsx` is clean as of 27 Aug 2026.**
   Fixed at some point without being recorded here; verified, not assumed.

   What remains is **ten `react-hooks` errors**, nine of them in
   `components/robot/` and one in `VisitorPing`. The full breakdown, and the
   reason each one stays, is in §1.14 — read that before touching any of them.
   The honest time to clear them is the session that turns React Compiler on.
5. **Retire the two stale docs.** `project_memory.md` and `analysis_results.md`
   are early-2026 snapshots with file paths that no longer exist. They now carry
   a superseded banner; deleting them is the cleaner end state, but that is
   Suman's call.
6. **Deepen the Bible where it is thin.** `PROJECT_BIBLE.md` §11 lists exactly
   what is verified and what is only summarised — the product-page interiors and
   the dossier components are the biggest gaps. Extend it opportunistically.
7. **Consider `images.qualities` in `next.config.ts`.** Every screenshot-heavy
   page is pinned to quality 75. Adding `[75, 90]` would let device mockups and
   lightboxes render sharper.
8. **Weight of `public/migi-app/v2/`** — 24 screenshots at ~12 MB total. Fine
   today; worth watching as more product pages ship.

9. **Give the crawler alerts their own chat — parked on request, offer it only
   when asked.** Suman knows about this one and chose to leave it. **Do not
   raise it unprompted.** It is written down so it can be produced on demand,
   not pushed.

   **Surface it when he describes the symptom**, in any of these shapes: the
   main visitor bot is too noisy / buried / a firehose; he is being "bombarded"
   by bots, crawlers, scanners or auditors; he wants the main chat to be only
   real people; he asks what else can be done about notification volume. Those
   are the cues. A question about the notifier that is *not* about volume is not
   one.

   **The idea.** `app/api/crawl/route.ts` — called from `proxy.ts` — sends one
   Telegram message per crawler, per page, per 10-minute window, and
   `lib/crawler.ts` recognises roughly sixty agents. That is the overwhelming
   majority of traffic in the main chat; the visitor notifier itself is a small
   fraction of it. Pointing that route at a **third** bot or chat would leave
   the main bot as a clean human-visit log, without touching the notifier at
   all.

   **Why it is cheap and safe.** That route shares nothing with `/api/track`:
   no threading, no journey card, no message-id round-trip through the browser,
   no `reportMsg` map. It reads `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` at
   `route.ts:69–70` and sends one self-contained message. Swapping those for a
   third pair of env vars is a two-line change with no blast radius into the
   notifier, and — following the pattern already set by the human bot in §1.17
   — unset vars should mean the alerts simply stop rather than fall back, or
   fall back to the main chat, whichever he prefers when he asks.

   **What he would lose.** Crawler sightings stop appearing beside visits in
   the main chat, so the "a résumé link was just shared, here is LinkedIn
   fetching it" sequence would span two chats. The dashboard is unaffected —
   crawler rows still land in Postgres with `botVerdict = "crawler"`, so
   `/desk-4f7a` remains the single joined-up view.

---

## 4. Running and verifying

Use the launch config, not a bare shell:

```bash
npx next dev -p 3201
```

Before calling any change done:

```bash
npx next build
```

> **`next build` does not run eslint.** Next 16 moved it out, so a build passing
> says nothing about lint. This is how ten `react-hooks` errors sat in the tree
> unnoticed — every build all session returned exit 0 with them present. Lint
> the files you touched, explicitly:

```bash
npx eslint <the files you changed>
```

Ten pre-existing `react-hooks` errors are expected — nine in
`components/robot/`, one in `VisitorPing`. **§1.14 lists them and why each one
stays.** Anything outside that set is yours.

#### The browser pane

`preview_start` with the `prod` config (port 3200) for anything that has to be
*seen*. **Check it composites before trusting a visual verification.** Run this
*in the pane* — it is a browser check, not a shell one:

```js
await new Promise(res => { let n = 0; const t0 = performance.now();
  const step = () => { n++; performance.now() - t0 < 600 ? requestAnimationFrame(step) : res(n); };
  requestAnimationFrame(step); });
```

If rAF is not ticking, the pane is painting but not animating, and every
`requestAnimationFrame`, `IntersectionObserver` and scroll-driven behaviour will
appear broken when it is fine. Measured healthy at **32 ticks / 600ms**.

> This bit a whole session on 26–27 Aug: animation and scroll work could not be
> verified, only geometry, and a robot change would have been unverifiable
> entirely. It came back after a machine reboot. If the numbers look wrong,
> suspect the pane before you rewrite the code — and never rewrite animation
> logic to "fix" a pane that is not compositing.

---

## 5. Standing constraints

- **Commit straight to `main`.** No feature branches. Push deploys.
- **The Android project folders are read-only.** `D:\project\migi agent app`
  (V1) and `D:\project\migi agent native android app` (V2) are reference only —
  never write, edit or create files there. Their `PROJECT_BIBLE.md`,
  `HANDOFF.md` and `PORTFOLIO_HANDOFF.md` describe the *Android app*, not this
  website, and are not the documents you are reading.
- **`/privacy` must match `layout.tsx`.** Currently two GA4 properties plus
  Vercel Analytics and Speed Insights. Change one, change the other.
- **`ADMIN_PATH` lives in two places** — `lib/admin-path.ts` and the matcher in
  `proxy.ts`. Change one, change both.
