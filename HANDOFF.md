# Handoff — Suman Debnath Portfolio

Where the project stands, what changed most recently, and what is worth doing
next. For how the system is built read **PROJECT_BIBLE.md**; for how the site
writes and what each page argues read **PORTFOLIO_HANDOFF.md**.

**Last updated:** 23 August 2026
**Branch:** `main`.
**Last session:** `/profile` — a new light, paper-stock profile page built to match a supplied reference — §1.5.
**Session before:** a new Banking Co-pilot product page, the hero lock extended to every product page, and the PACT panels' clipped legends — §1.4.

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
| **Profile** (`/profile`) | Built 23 Aug. The only light page on the site — ruled cream paper, a 280vh pinned hero that zooms into a drawn monitor, a scroll-driven word reveal and a shopfront marquee. Modelled on a reference the user supplied. Done — §1.5. |
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
| **Homepage density** | Reworked 19 Aug. Three sections roughly halved in height, two closers restyled, three copy blocks refreshed — §2. |
| **Homepage structure** | **Still weak.** Thirteen sections, no spine. The 19 Aug pass fixed density and copy, not order — §3. |
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
new `/profile` route rather than replacing `/about`; the reference's cream
paper system verbatim but with this site's own fonts; the drawings redrawn
rather than lifted; and the reference's e-book block repurposed to point at
`/learnings` and `/philosophy`.

**What it is.** Nine blocks, four of them scroll-scrubbed:

| Block | Behaviour |
|---|---|
| Curtain | eight columns of paper drop over the viewport, the name wipes in, they lift right-to-left |
| Hero | 280vh with a 100svh sticky child; the paragraph rises 320px and fades on a cubed curve while a drawn room zooms into the monitor's screen |
| Statement | 1.3fr / 0.7fr, headline against a small aside |
| Filmstrip | the `/journey` chapter artwork, drifting sideways in proportion to its trip through the viewport |
| Credo | sticky left column, right column resolving one word at a time |
| Board | ten hairline cells: two employers, eight builds |
| Notebook | the reference's e-book plate, pointing at `/learnings` |
| Kit strip | a shopfront per tool, sliding on scroll, the centre one lit and named |
| Footer | its own ruled footer with closing amber brackets |

**Three things worth knowing.**

> **No scroll listeners anywhere on this page.** `body` carries
> `overflow-x: hidden`, so scroll events fired on it never reach `window` —
> AGENTS.md trap 4, and it fails silently. Every scrub runs through one
> `useScrub` hook: an IntersectionObserver decides whether an element is worth
> watching, and while it is, a rAF loop reads `getBoundingClientRect()`. Rect
> reads are true whichever element scrolls, and the loop stops when the section
> leaves the screen.

> **The nav was invisible for the first pass, with no error.** `Navigation` is a
> framer-motion `m` component that animates itself in from `opacity: 0`. Without
> `MotionProvider`'s `LazyMotion` above it there is no animation to run, so the
> inline `opacity:0` simply stays. Every page that mounts `Navigation` needs
> `MotionProvider`.

> **`HeroLock` observes its own `parentElement`.** Mounted as a sibling of the
> hero it observed `<main>` and kept the mascot and chat launcher hidden for the
> entire page. It is now passed into `ProfileHero` as `children` so it sits
> inside the `<section>`.

**Verified.** Production build clean, `/profile` prerendered static. The hero's
final viewBox measures `571.0 173.5 250.0 59.1` — the zoom lands on the drawn
screen to the tenth of a unit. Checked at 1440×900 and 375×812; the pin is
dropped below 960px and the drawing zooms off its own position instead.

**Deliberate departures from the reference**, all four worth knowing before
someone reports them as bugs: it is **light only** (the reference has a dark
theme and a toggle); it uses the **site's own dark nav** rather than the
reference's paper nav bar; the drawings are simpler than the reference's (which
carries two figures, a dog, a cat and a click-to-wave interaction); and there is
**no once-per-session guard on the curtain** — see §4.1 of the Bible for why it
cannot live in the component.

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

4. **The visitor table has no pagination** — capped at 200 rows. Fine now, will
   matter within months.

5. **Clear the pre-existing lint errors in `Navigation.tsx`** — an
   `immutability` error on `window.location.href`, a raw `<a>` to `/` that
   should be `<Link>`, and an `<img>` that should be `next/image`. They predate
   recent work and fail `npm run lint` today.
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

```bash
npx eslint app/apps/migi-app/page.tsx components/migi-app/MigiAppVisuals.tsx
```

Ignore the known `Navigation.tsx` lint failures listed in §3 unless you are
deliberately fixing them.

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
