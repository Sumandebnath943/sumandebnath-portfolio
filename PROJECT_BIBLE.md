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

**Products** — each is a full bespoke landing page
- `/agents/migi` — the MIGI agent fleet
- `/agents/pact-agent`, `/agents/pentashell`
- `/apps/migi-app` — **MIGI Android App** (V2 native + V1 wrapper archive)
- `/apps/forget-anything`
- `/games/pixelville`
- `/llms/qdex-1.5b`, `/slms/pentacmd`
- `/fun-apps`

**Private**
- `/desk-4f7a` — the visitor analytics dashboard, plus `/login`, `/insights`, `/v/[id]`

**API**
- `app/api/track` — visitor notifier relay (dynamic)
- `app/api/contact` — contact form
- `app/api/crawl` — crawler probe
- `app/api/cron/purge` — retention purge, daily at 03:20 UTC (`vercel.json`)
- `pages/api/chat.js` — the AI assistant (Pages Router, deliberately)

Adding a page means touching **four** wire-in points, not one — see §8.

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

There is no single site accent. Each product carries its own, and the page is
built around it:

| Product | Accent |
|---|---|
| MIGI | Lime `#C6F24E`, with Aqua `#35E0FF` as the app's second accent |
| PentaCMD / Pentashell | Terminal green on near-black |
| PixelVille | Gold on night-sky blue |
| AEGIS VAULT | Vault steel |
| IMPRINT / LEGATUS / CITE / EMBER / ROASmind | Ember orange · muted gold · violet · warm orange · silver |

The shared ink used against cream is `#12161A`; the shared cream is `#F4F3ED`
with `#ECEAE2` and `#DAD8CE` as its steps.

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

### 6.2 Admin dashboard (`/desk-4f7a`)

Password + signed session cookie, gated in `proxy.ts`. Tables: `visits`,
`visit_pages`, `visit_actions`. Retention is enforced by the daily cron purge.

> **Trap:** `lib/admin-path.ts` holds `ADMIN_PATH`, and `proxy.ts` repeats the
> literal in its matcher because matchers are read statically at build time and
> cannot see a constant. **Change one, change both.**

`lib/admin-path.ts` is deliberately import-free — `lib/auth.ts` pulls in
`node:crypto`, and importing the path from there would drag crypto into the
client bundle.

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
