# Handoff — Suman Debnath Portfolio

Where the project stands, what changed most recently, and what is worth doing
next. For how the system is built read **PROJECT_BIBLE.md**; for how the site
writes and what each page argues read **PORTFOLIO_HANDOFF.md**.

**Last updated:** 12 August 2026
**Branch:** `main`, clean and pushed
**Last feature commit:** `2645cca` — *feat(migi-app): rebuild page for the standalone native Android app (v2)*, followed by the documentation set described in §2.

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
| **MIGI Android App page** | Rebuilt this session for the V2 native app. Done. |
| **Journey** (`/journey`) | Built over ~6 commits, ending `e886cca`. Real illustrations, gated gestures. Done. |
| **Accessibility** | Two full WCAG AA passes across every page. Done. |
| **About / Philosophy / FAQ / Contact** | Given distinct identities in `b6e18ff`. Done. |
| **Résumé** (`/resume`) | Rebuilt as two converging registers, `1ca629c`. Done. |
| **AI assistant** | Role-injection closed and cost bounded, `df067e5`. Model is `openai/gpt-oss-120b`. |
| **Navigation + ⌘K** | Restructured around Home / Portfolio / About Me, mounted site-wide. |
| **Site tour** | Crosses routes and survives navigation, `8adf5ee`. |
| **Visitor notifier + `/desk-4f7a`** | Working, with country breakdown and crawler alerts. |

---

## 2. What changed in the last session (12 Aug 2026)

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

Nothing is blocking. These are opportunities, roughly in value order.

1. **Clear the pre-existing lint errors in `Navigation.tsx`** — an
   `immutability` error on `window.location.href`, a raw `<a>` to `/` that
   should be `<Link>`, and an `<img>` that should be `next/image`. They predate
   recent work and fail `npm run lint` today.
2. **Retire the two stale docs.** `project_memory.md` and `analysis_results.md`
   are early-2026 snapshots with file paths that no longer exist. They now carry
   a superseded banner; deleting them is the cleaner end state, but that is
   Suman's call.
3. **Deepen the Bible where it is thin.** `PROJECT_BIBLE.md` §11 lists exactly
   what is verified and what is only summarised — the product-page interiors and
   the dossier components are the biggest gaps. Extend it opportunistically.
4. **Consider `images.qualities` in `next.config.ts`.** Every screenshot-heavy
   page is pinned to quality 75. Adding `[75, 90]` would let device mockups and
   lightboxes render sharper.
5. **Weight of `public/migi-app/v2/`** — 24 screenshots at ~12 MB total. Fine
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
