# Project Bible — Suman Debnath Portfolio

The complete architectural reference for this codebase. If you are an agent or
developer picking this project up cold, **read this first**.

There are three documents and they do not overlap:

| Document | Answers |
|---|---|
| **PROJECT_BIBLE.md** (this file) | How the system is built. Stack, routes, subsystems, conventions, traps. |
| **HANDOFF.md** | Where things stand right now, what changed last, what to do next. |
| **PORTFOLIO_HANDOFF.md** | How the site talks. Voice, page inventory, the pattern for building a new product page. |

Two older files — `project_memory.md` and `analysis_results.md` — are historical
snapshots from early 2026 and are **superseded by this document**. They describe
file paths and a design system that no longer match the codebase. Do not treat
them as current.

---

## 1. What this is

A personal portfolio for Suman Debnath, an AI-native product marketer and
builder. It is not a template site. Almost every page is a bespoke landing page
for something he built — an agent fleet, a language model, an Android app, a
game, an encrypted notepad — each with its own palette, its own visual language
and its own argument.

Live at **https://sumandebnath.houseofnamus.com**, deployed on Vercel from
`main` on `github.com/Sumandebnath943/sumandebnath-portfolio`.

The house rule that explains most of the code: **a page is allowed to be
expensive.** Bespoke components per page are normal here. Shared abstraction is
the exception, not the goal.

---

## 2. Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 16.3** (App Router, Turbopack) |
| React | **19.2** |
| Styling | **Tailwind CSS 3.4** via `@tailwindcss/postcss` 4 |
| Motion | **framer-motion 12** — always through `LazyMotion` |
| 3D | **three 0.184** + `@react-three/fiber` 9 + `@react-three/drei` 10 |
| Database | **Neon serverless Postgres** (`@neondatabase/serverless`) |
| LLM | **Groq** (`groq-sdk`) |
| Product tour | **driver.js** |
| Icons | **lucide-react** |
| Hosting | **Vercel** |

`npm run dev` · `npm run build` · `npm run start` · `npm run lint`

There is a `.claude/launch.json` with a `dev` entry on **port 3201** and a `prod`
entry on 3200. Prefer those over running servers by hand.

### AGENTS.md is not decoration

`AGENTS.md` (loaded via `CLAUDE.md`) says this is not the Next.js you know, and
it is right. Next 16 has real breaking changes. Read
`node_modules/next/dist/docs/` before assuming an API. One that has already
bitten this project: **`next/image` rejects any `quality` value not listed in
`images.qualities`**, which is unset here, so **only the default 75 is legal.**
Passing `quality={90}` builds a warning in dev and is not honoured.

---

## 3. Route map

Every route is statically prerendered unless noted.

**Core**
- `/` — home
- `/about`, `/philosophy`, `/faq`, `/contact`, `/privacy`
- `/resume` — the résumé as a page, not a PDF
- `/journey` — interactive life story
- `/learnings` — certificates and coursework
- `/projects`, `/projects/[slug]` (SSG), `/projects/aegis-vault`

**Products** — each is a full bespoke landing page with its own accent system

| Route | Product | Dominant accents |
|---|---|---|
| `/agents/migi` | The MIGI agent fleet | Lime `#C6F24E` on cream `#F4F3ED` + ink |
| `/apps/migi-app` | **MIGI Android App** (V2 native + V1 archive) | Lime `#C6F24E` + aqua `#35E0FF` on graphite |
| `/agents/pact-agent` | PACT agent | Terracotta `#CF5C36` |
| `/agents/pentashell` | Pentashell CLI | Cyan `#2FE2F0`, magenta `#F25FD0`, violet `#9B6BF2` |
| `/slms/pentacmd` | PentaCMD model | Green `#34D399` + violet `#A78BFA` |
| `/llms/qdex-1.5b` | Qdex-1.5B model | Green `#34D399` |
| `/apps/forget-anything` | Forget Anything? | Gold `#D4AF37` + emerald `#50C878` |
| `/games/pixelville` | PixelVille | Gold `#F5B94A` / warm `#ffe6b0` on night blue `#20304a` |
| `/projects/aegis-vault` | AEGIS VAULT | Deep vault green `#07120A`, teal `#2DD4BF` |
| `/fun-apps` | The lighter shelf | Near-black `#1a1a1a` |

> **Naming trap:** **PentaCMD is the model; Pentashell is the CLI.** They are
> different products with different pages and different palettes. Do not merge
> or cross-reference them casually.

**Private**
- `/desk-4f7a` — the visitor analytics dashboard, plus `/login`, `/insights`, `/v/[id]`

**API**
- `app/api/track` — visitor notifier relay (dynamic)
- `app/api/contact` — contact form
- `app/api/crawl` — crawler probe
- `app/api/cron/purge` — retention purge, daily at 03:20 UTC (`vercel.json`)
- `pages/api/chat.js` — the AI assistant (Pages Router, deliberately)

Adding a page means touching **four** wire-in points, not one — see §8.

### 3.1 Global chrome — what `app/layout.tsx` mounts on every page

Beyond fonts and analytics, the root layout mounts a surprising amount:

```
RobotChatProvider                 ← context for the mascot ↔ chat handoff
  └ SiteOnly                      ← renders children everywhere EXCEPT /desk-4f7a
      ├ RobotMascot               ← the 3D robot
      ├ EasterEggs
      ├ ChatTakeover              ← full-screen chat mode
      ├ CommandPalette            ← ⌘K / Ctrl+K, site-wide
      ├ SiteTour                  ← driver.js, crosses routes
      └ PrivacyNotice
  └ VisitorPing                   ← outside SiteOnly; tracks everywhere
```

Two of these carry non-obvious reasoning already written into their source, and
both are worth reading before you touch them:

- **`SiteOnly`** filters on the client on purpose. A nested layout cannot
  un-render what a parent placed, and reading the pathname on the *server* to
  hide a robot on one route would make **every page dynamic**. Client-side
  filtering keeps the whole site statically prerendered.
- **`LoaderGate`** (mounted by `/` only, not the layout) shows the cinematic
  loader once per session. "Has it been seen" lives in `sessionStorage`, read
  through `useSyncExternalStore` rather than copied into state in an effect —
  the old shape was the cascading-render pattern React now warns about. Its
  server snapshot is `false` so the loader never flashes for everyone.

### 3.2 The homepage

`/` is a composition of twelve section components, in this order:

`Hero` → `Announcement` → `ExperienceNarrative` → `NowBuilding` → `Experience`
→ `SystemsStack` → `Projects` → `AIPhilosophy` → `PhilosophyFAQ` →
`OperationalHistory` → `AcademicFoundations` → `Contact`

All twelve live in `components/sections/`. Reordering the homepage means
reordering this list in `app/page.tsx` — the sections do not know about each
other.

---

## 4. Design system

### Fonts

Loaded in `app/layout.tsx` via `next/font/google`, exposed as CSS variables and
mapped in `tailwind.config.ts`:

| Class | Family | Used for |
|---|---|---|
| `font-manrope` | Manrope | Everything structural — headings, body |
| `font-serif` | Instrument Serif | *Italic* accent words inside headlines |
| `font-dmmono` | DM Mono | Kickers, labels, figures, terminal surfaces |
| `font-anton` | Anton | Oversized display numerals |

`font-sans`, `font-inter` and `font-grotesk` are all aliased to Manrope for
backward compatibility. Prefer `font-manrope` in new code.

### The headline pattern

Nearly every section headline is two registers in one line: a bold sans phrase
plus a serif italic phrase, often gradient-filled.

```tsx
<h2 className="font-manrope font-bold tracking-[-0.035em]">
  <span style={gWhite}>Not a wrapper.</span><br/>
  <span className="font-serif italic font-normal" style={gLime}>A control room.</span>
</h2>
```

Gradient text is done with `WebkitBackgroundClip: "text"` +
`WebkitTextFillColor: "transparent"`, declared as a local `gWhite` / `gLime`
style object at the top of the page file. This repeats per page on purpose —
each page owns its own gradients.

### Per-product palettes

There is no single site accent. Each product carries its own and the page is
built around it — the full table is in §3, with exact hex values taken from the
pages themselves.

The one thing that *is* shared: against cream, the ink is `#12161A`, and the
cream ramp is `#F4F3ED` → `#ECEAE2` → `#DAD8CE`.

Homepage dossiers carry their own accents too — see §7.2.

### Accessibility

The site has been through **two full WCAG AA contrast passes** (see commits
`38029b6`, `00a90a9`). Small labels are the usual offender. If you add a label
below ~13px on a dark ground, keep it at `text-white/45` or lighter-weight
equivalent, not `/30`, and check it.

---

## 5. Motion

**All animation goes through `MotionProvider`**, which wraps the tree in
`LazyMotion` with `domAnimation`. Consequences you must respect:

- Import `m`, not `motion`. `motion` drags in the full bundle and defeats it.
- `domAnimation` has **no layout animations**. `layout` / `layoutId` will not work.
- `useInView`, `useScroll`, `AnimatePresence` are all fine.

Every page wraps its own content:

```tsx
<MotionProvider>
  <Navigation />
  <main>…</main>
  <Contact variant="dark" />
  <Footer />
</MotionProvider>
```

### Two motion traps that have already cost real debugging time

**1. `overflow-hidden` silently kills `position: sticky`.**
An ancestor with `overflow: hidden` becomes the sticky element's scroll
container, and since it never scrolls, the sticky child just scrolls away with
the page. This broke the sticky showcase on `/apps/migi-app`. If a sticky
column is not pinning, check every ancestor for `overflow-hidden` before
touching the sticky code.

**2. The body is the scroll container.**
`document.body` computes to `overflow: hidden auto`, so **`window` scroll
listeners never fire.** Anything scroll-driven must use `IntersectionObserver`
(or listen on the right element), never `window.addEventListener("scroll")`.

---

## 6. Subsystems

### 6.1 Visitor notifier (`app/api/track` + `components/analytics/VisitorPing.tsx`)

Self-hosted analytics. No third-party SaaS. The browser holds a session and
sends beacons; the server enriches each with geo/IP from Vercel headers, device
from User-Agent and ISP via reverse DNS, then relays to a Telegram bot.

Rules baked into the code:
- **It must never affect the visitor.** Every failure path returns harmless and is swallowed.
- The Postgres write is strictly secondary and runs in `after()`.
- A browser can be muted with `?notrack=1`.
- Crawlers are caught in `proxy.ts`, because a link-preview fetch never runs JS.

#### The journey card — read this before touching the message flow

A visit produces **one card**: a single Telegram message, opened at arrival and
**rewritten** as the visit unfolds. Telegram does not re-notify on an edit, so
updates are silent.

This exists because **a reload and a departure are identical at unload.** There
is no signal separating them. Earlier attempts to guess produced two
contradictory "Visitor left" messages for one visitor. Editing one message means
a wrong guess costs nothing — the next update corrects it.

> **The card id (`smid`) must round-trip through the browser.** At unload a page
> can fire a beacon and nothing else — it can never *learn* an id at that moment,
> so it has to already hold one. That is why the card is created during the
> **arrival** request, whose response the browser can still read. Do not
> "simplify" this by having the server remember card ids: serverless instances
> are not shared.

> **Never add an at-most-one-summary guard.** One was tried and removed the same
> day: it blocked the *second* summary, which is precisely the one carrying the
> complete journey. With edits, a repeat send is the correction, not damage.

#### Traffic categories

| Category | How it is decided | Messages |
|---|---|---|
| `human` / returning | ordinary network, human signals | arrival + card + report |
| `unclear` | mixed signals — still treated as a person | arrival + card + report |
| `scanner` | hosting network (Azure/AWS/GCP) **and no interaction yet** | **one** |
| `crawler` | identified by user agent in `lib/crawler.ts` | **one**, silent |

> **A hosting network alone proves nothing.** Link checkers run a genuine
> headless Chrome on Azure — but so does a recruiter behind a corporate proxy,
> and that recruiter is the point of the whole system. The network only raises
> the question; **interaction answers it.** One scroll or click and the visit
> becomes ordinary, and the journey card opens *late* (its id comes back on the
> live refresh, which is a `fetch` and can read a reply).

> **`interacted` is sticky false → true, and a row that has seen interaction
> cannot hold a `scanner` verdict.** Each write runs in its own `after()`, so an
> arrival can settle *behind* the summary that followed it. Plain `coalesce` let
> a stale "no interaction" overwrite a scroll that had already happened, and
> filed a recruiter who read three pages as a scanner.

`lib/crawler.ts` is deliberately separate from the notifier's own `isBot()`.
That one decides whether a *beacon* deserves a visitor alert; this decides
whether a *page request* deserves a crawler alert. Changing one must not
quietly alter the other.

> **Tracking is inert under `next dev`.** StrictMode mounts → cleans up →
> remounts; the cleanup removes the listeners and the `initedRef` guard stops
> them re-attaching. No clicks, scrolls or leave events are recorded locally.
> **Verify any change to this subsystem against a production build**
> (`.claude/launch.json` has a `prod` entry on port 3200). This is why several
> tracking bugs reached production unseen.

### 6.2 Admin dashboard (`/desk-4f7a`)

Password + signed session cookie, gated in `proxy.ts`. Tables: `visits`,
`visit_pages`, `visit_actions`. Retention is enforced by the daily cron purge.

> **Trap:** `lib/admin-path.ts` holds `ADMIN_PATH`, and `proxy.ts` repeats the
> literal in its matcher because matchers are read statically at build time and
> cannot see a constant. **Change one, change both.**

`lib/admin-path.ts` is deliberately import-free — `lib/auth.ts` pulls in
`node:crypto`, and importing the path from there would drag crypto into the
client bundle.

**Pages.** `/desk-4f7a` is the visitor table (filters by date, country, page,
action, source; bots hidden by default). `/desk-4f7a/v/[id]` is the per-visit
detail. `/desk-4f7a/insights` is the charts page.

**Auth.** Password stored as a scrypt hash (`scripts/admin-secret.mjs` generates
it locally and prints only the hash). Session is an HMAC-signed, httpOnly,
SameSite=Strict cookie scoped to the admin path. Vercel's own password
protection was ruled out — it is a **$150/month** Pro add-on.

> **`dbHealth()` must keep checking columns, not just connectivity.** Deploying
> code ahead of its migration makes every insert fail on the missing column; the
> error is swallowed and the dashboard goes on showing older rows as though
> nothing were wrong. `schema-behind` surfaces that as a banner. A status light
> that is green precisely when you need it not to be is worse than none — this
> shape of failure has appeared **four** times in this codebase.

> **`saveVisit()` returns `false` and never throws.** Correct for production,
> where a lost row must never break tracking — but it means **silent partial
> failure looks exactly like success.** Any script that writes visits must check
> the return value. One seed reported 32 writes while landing 4.

**Charts** (`app/desk-4f7a/Charts.tsx`, `theme.ts`) are server-rendered SVG and
CSS — no chart library, no client JS, hover text from `<title>`. Each panel gets
its own hue because each is a separate single-series answer to "how much".

> **The hue order in `theme.ts` is load-bearing.** Colour-blind separation is
> measured between *neighbours*. The first ordering failed outright — green
> beside orange at ΔE 3.2 for protanopia — and reordering is what turned it into
> a pass. Shuffling those four hues silently breaks a check.

There is **no world map**. A bubble map on a bare graticule read as broken, and
drawing coastlines from memory would be confidently wrong. `CountryList` shows
flag, country, share and cities instead — names and flags come from `Intl` and a
codepoint trick, so no data file. Coordinates are still stored, so a real
projection stays possible if proper outline data is ever added.

**Retention** lives in `lib/db.ts` (`IP_RETENTION_DAYS`, `VISIT_RETENTION_DAYS`)
and is enforced by `/api/cron/purge`, scheduled daily in `vercel.json`. The IP
goes at 90 days, the whole visit at a year. The endpoint **fails closed** if
`CRON_SECRET` is unset. `/privacy` imports those same constants, so the page
cannot advertise a period the code does not apply.

### 6.3 AI assistant (`pages/api/chat.js`)

Groq, model `openai/gpt-oss-120b`, `reasoning_effort: 'low'`. It lives in the
**Pages Router on purpose**. Role-injection was closed and cost bounded in
`df067e5` — do not loosen the message construction without reading that commit.

Its knowledge comes from `lib/systemPrompt.ts`, which is built from
`lib/resume.ts`.

### 6.4 The 3D robot mascot (`components/robot/`)

`three` + R3F, model at `public/robot.glb`, built from FBX by
`scripts/build-robot-glb.mjs` (fbx2gltf → gltf-transform → meshopt). The mascot
has a chat takeover mode and Web Speech support (`useWebSpeech.ts`).

### 6.5 Site tour (`components/ui/SiteTour.tsx` + `lib/tour-steps.ts`)

driver.js, and it **crosses routes** — it has to survive navigation (`8adf5ee`).

### 6.6 Analytics loaded in `layout.tsx`

Vercel Analytics, Vercel Speed Insights, and **two** GA4 properties
(`G-9D3BDPZH49`, `G-52W6W0B4W6`).

> **Trap:** `/privacy` and the footer disclosure must keep matching what
> `layout.tsx` actually loads. If you add or remove a tracker, update the
> privacy page in the same commit.

---

## 7. Data layer — `lib/`

| File | Role |
|---|---|
| `resume.ts` | **Single source of truth for career facts.** Feeds `/resume`, the AI system prompt and `/contact`. Edit this, never the consumers. |
| `projects.ts`, `archive-projects.ts` | Project cards and the archive |
| `journey.ts` | `/journey` content |
| `learnings-data.ts` | Certificates |
| `faqs.ts` | `/faq` and FAQ schema |
| `systemPrompt.ts` | Assembles the assistant's context from `resume.ts` |
| `contact.ts`, `contact-intents.ts` | Contact routing |
| `db.ts` | All Neon queries |
| `auth.ts`, `admin-path.ts` | Dashboard auth |
| `crawler.ts` | Crawler identification for `proxy.ts` |
| `tour-steps.ts` | driver.js steps |
| `useDeferredReveal.ts`, `utils.ts` | Shared helpers |

Per-product content sits beside its components as `*-data.ts` —
`components/migi/migi-data.ts`, `components/penta/penta-data.ts`, and so on.

### 7.1 The two project datasets

These are different things and are easy to confuse:

| File | Drives | Key exports |
|---|---|---|
| `lib/projects.ts` | The **flagship** set. `/projects/[slug]` is SSG'd from it via `generateStaticParams`. | `projects`, `getProject`, `ProjectMeta`, `softwareApplicationJsonLd`, `SITE_URL` |
| `lib/archive-projects.ts` | The **archive** shelf — everything else shipped. | `archiveProjects`, `getArchiveBySlug`, `ArchiveProject`, `ArchiveKind` |

`SITE_URL` lives in `lib/projects.ts` and is imported widely; that is its home.
`softwareApplicationJsonLd` generates per-project structured data.

A product big enough for its own bespoke page gets one (`/projects/aegis-vault`,
`/agents/migi`, …) **in addition to** its entry in the dataset — the dataset
entry is the card that links to it.

### 7.2 `components/sections/` — the homepage and dossier library

Twelve of these compose `/` (§3.2). The rest are **dossiers** — long-form
product panels used on the homepage and archive: `ImprintDossier`,
`LegatusDossier`, `CiteDossier`, `RoasmindDossier`, `GeekCollectiblesDossier`,
`EmberDossier`, `DPeDossier`, with `DossierMeta` and `ArchiveCard` as shared
scaffolding. `Loader`, `Hero`, `Contact` and `ContactForm` round it out.

Dossier accents, which the design system inherits from these:
IMPRINT ember orange · LEGATUS muted gold · CITE electric violet ·
ROASmind silver · Geek Collectibles neon crimson · EMBER warm orange.

### 7.3 `components/ui/` — shared primitives

`Button`, `GlassCard`, `GradientText`, `SectionWrapper`, `AnimatedBento`,
`PrivacyNotice`, `EasterEggs`, `SiteTour`. This is the only genuinely shared
component layer; everything else is per-product by design.

---

## 8. Adding a product page — the four wire-in points

Missing one of these is the most common defect in this repo. A new page needs:

1. **The route** — `app/<section>/<slug>/page.tsx`, plus a
   `components/<slug>/<Slug>Visuals.tsx` for its client pieces and optionally
   `<slug>-data.ts`.
2. **`components/layout/Navigation.tsx`** — add the entry under the right
   submenu, with the product's accent colour.
3. **`components/layout/CommandPalette.tsx`** — add id, `/command`, label,
   description, href, icon.
4. **`app/sitemap.ts`** — add the URL with `changeFrequency` and `priority`.

Also set page-level `metadata` with `alternates.canonical` and an `openGraph`
image, and put screenshots under `public/<slug>/`.

### Page skeleton conventions

- `page.tsx` is a **server component** holding metadata, content arrays and layout.
- Anything interactive or animated goes in a `"use client"` visuals file.
- Content lives in `const` arrays at the top of `page.tsx`, not inline in JSX.
- A `<style dangerouslySetInnerHTML>` block at the top of `main` carries
  page-scoped keyframes and hover classes, prefixed per page (`mg-`, `fa-`, …).

---

## 9. Environment variables

| Variable | Used by |
|---|---|
| `DATABASE_URL` | Neon Postgres |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Visitor notifier |
| `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET` | `/desk-4f7a` auth |
| `CRON_SECRET` | Guards `/api/cron/purge` |
| `GROQ_API_KEY` | AI assistant |

Helper scripts: `scripts/admin-secret.mjs`, `scripts/auth-check.mjs`,
`scripts/db-migrate.mjs`.

> **`DATABASE_URL` is not the same in both places.** Vercel injects the
> production branch, marked *Sensitive* — which also means it cannot be pulled
> down, and cannot be attached to the Development environment at all. Local dev
> uses a **separate Neon branch**, pasted into `.env.local` by hand, so testing
> can never write into real visitor data. That branch carries a 7-day expiry;
> when it lapses, make a new one in the Neon dashboard and swap the string.

> **Migrating production:** `node scripts/db-migrate.mjs --sql` prints the DDL
> without connecting to anything, for pasting into Vercel's Storage → Query
> editor. Turn **Read-only off** first, and wrap the statements in
> `do $$ … $$` — that editor sends everything as one prepared statement and
> rejects multiple commands.

---

### 9.1 Source assets — the `_source-*` folders

Three folders at the repo root hold **originals that are not shipped**, and all
three are git-ignored. They exist because the served asset is a processed
derivative and the pipeline needs its input kept:

| Folder | Holds | Becomes |
|---|---|---|
| `_source-fbx/` | Mixamo FBX animations (`Idle.fbx`, `Jumping.fbx`, `Running.fbx`, …) | `public/robot.glb`, via `scripts/build-robot-glb.mjs` |
| `_source-journey-art/` | Full-size journey illustrations (`01-prologue.png` …) | Cropped/optimised art under `public/journey/` |
| `_source-journey-assets/` | Real personal artefacts — old screenshots, logos, photos | The evidence shown on `/journey` |

> **Trap:** journey art is **cropped before serving**, not with CSS. If an
> illustration looks wrongly framed, fix the derivative in `public/`, do not add
> `object-position` hacks — the horizon alignment on that page depends on the
> crop being right.

Because these are ignored, a fresh clone cannot rebuild `robot.glb` or reframe
journey art. The source folders live on Suman's machine at
`D:\project\sumandebnath\_source-*`.

`/journey` itself is content-heavy rather than code-heavy: `lib/journey.ts` is
~525 lines of story data against a ~119-line page. Edit the data, not the page.
Its interactions are **gesture-gated** — controls are deliberately kept clear of
the mascot and the art (see commits `9c6696e`, `3182b22`).

---

## 10. Working conventions

**Git.** Commit straight to `main`; this project does not use feature branches.
Deploys follow `main` automatically. Commit subjects are lowercase
`type(scope): sentence` and the body explains *why*, in prose.

**Verification.** `npx next build` and `npx eslint <changed files>` before
calling anything done. There are pre-existing lint errors in
`components/layout/Navigation.tsx` — they are not yours, do not "fix" them
incidentally.

**Browser verification.** Use the Browser pane tools, never `npm run dev` in a
shell.

> **Trap:** if a screenshot fails with *"the Browser pane is not displayed"*,
> the tab is not compositing — and **rAF, IntersectionObserver and scroll events
> are all suspended.** Scroll-driven UI will look permanently broken when it is
> fine. Verify with `getBoundingClientRect` maths, `read_page` and the build
> instead, and say plainly that scroll behaviour is unverified.

**Read-only territory.** The Android sources at `D:\project\migi agent app`
(V1) and `D:\project\migi agent native android app` (V2) are reference material
for `/apps/migi-app`. **Never write to them.**

---

## 11. How much of this is verified

Written 12 August 2026. Being straight about confidence, because a document that
hides its own gaps is worse than one that admits them.

**Read directly from the codebase and safe to rely on:** the stack and versions,
the full route map, every accent hex in §3, the global chrome and homepage
composition, the `lib/` inventory, both project datasets, env vars, the
`_source-*` folders, `next.config.ts` / `vercel.json`, and all four traps in
§5 and §10 — each of those was hit and diagnosed in practice.

**Summarised from source comments and commit history rather than a full read:**
the internals of the visitor notifier, the admin dashboard, the AI assistant and
the site tour. Their *contracts* and constraints here are accurate; their
line-level behaviour is not exhaustively documented.

**Not documented in depth:** the interiors of the individual product pages other
than `/apps/migi-app`, and the section/dossier components beyond their names and
accents. They follow the pattern in `PORTFOLIO_HANDOFF.md` §4, but each has its
own bespoke layout that has not been catalogued here.

If you go deep in one of those areas, extend this file while you are in there.
