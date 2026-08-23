# Portfolio Handoff — the content side

How this site talks, what each page is arguing, and the repeatable pattern for
building the next product page. For architecture read **PROJECT_BIBLE.md**; for
current status read **HANDOFF.md**.

This is the document to read before writing a single word of page copy.

---

## 1. What the site is arguing

Suman Debnath is an AI-native product marketer who builds the things he markets.
The portfolio's whole job is to make that credible, and it does it by refusing to
describe the work in the abstract. Instead each build gets a real landing page
with real screenshots, real numbers and the real decisions behind it.

The implicit claim of the site is not "I know about AI products." It is **"here
is one, a page each, and here is what each one cost me to learn."**

That is why the design budget per page is high and why almost nothing is
templated. A page that looks like every other page would undercut the argument.

---

## 2. Voice

**Concrete over adjectival.** Never "a powerful, seamless experience." Always
"46 agents, 22 screens, zero API keys on the phone." Every claim on this site
should be checkable.

**Lead with the constraint, then the resolution.** The strongest copy on the
site names the problem in plain words before describing what was done about it.
"Checking the dashboard meant opening a browser and logging in every time."

**Short declaratives carry the weight.** Long sentences are fine for
explanation, but the sentence that lands is short. "A wrapper is a bookmark."
"No existing route changed by a single line."

**Honest postscripts are a house convention.** Several pages end a section by
admitting what went wrong. The MIGI Android page states outright that the first
two versions were poor and that a blunt round of feedback was needed. Keep
doing this — it is the single most credible device on the site, and a straight
line of successes reads as marketing.

**Em-dashes and typographic quotes.** Use `—`, `’`, `“ ”`. Straight apostrophes
in JSX also trip `react/no-unescaped-entities`.

**Second person is rare.** The site describes systems, not the reader.

### Headline construction

The signature move is two registers in one headline — a bold sans clause and a
serif italic clause:

> **Not a wrapper.** / *A control room.*
> **Losing the phone** / *loses nothing.*
> **Rebuilt from the** *API up.*
> **One phone,** *forty-six agents.*

Kickers above headlines are DM Mono, uppercase, wide-tracked, preceded by a
short rule: `VERSION 2 · STANDALONE NATIVE ANDROID`.

---

## 3. Page inventory — what each page claims

| Page | The argument |
|---|---|
| `/` | He builds AI-native systems, and here they are. Carries **the film** (§3b). |
| `/journey` | The story a résumé cannot tell — interactive, illustrated, gesture-gated. |
| `/resume` | Career as a page, not a PDF. Two registers that converge. |
| `/about`, `/philosophy` | How he thinks; each has its own identity, not a shared template. |
| `/profile` | The decade in short — what it adds up to, where the work has been, what he uses every day. `/about` argues the *crossing* from marketing to AI; this states the profile itself and asks nothing of the reader. **The only light page on the site**: cream paper, amber marks. Eleven sections and the longest page on the site, built to be scrolled rather than read — copy runs plainer and shorter than anywhere else, because the paper, the drawings and the charts are doing the arguing. |
| `/faq` | Answers real questions, and feeds FAQ schema for AEO. |
| `/contact` | A form that actually sends, with intent routing. |
| `/learnings` | Certificates and coursework, honestly framed. |
| `/projects`, `/projects/[slug]` | The archive — everything shipped, with a card + static landing pattern. |
| `/agents/migi` | The agent fleet itself: ~46 scheduled agents. Cream + lime + ink. |
| `/apps/migi-app` | **MIGI Android App** — V2 native client, with V1 kept on the record. |
| `/agents/pact-agent` | The PACT agent. Terracotta `#CF5C36`. |
| `/agents/pentashell` | The **CLI**. Cyan `#2FE2F0` + magenta `#F25FD0` + violet `#9B6BF2`. |
| `/slms/pentacmd` | The **model** behind the CLI. Green `#34D399` + violet `#A78BFA`. |
| `/llms/qdex-1.5b` | A language model landing page. Green `#34D399`. |
| `/games/pixelville` | A self-governing pixel-art village. Gold `#F5B94A` on night blue `#20304a`. |
| `/apps/forget-anything` | A departure companion app. Gold `#D4AF37` + emerald `#50C878`. |
| `/projects/aegis-vault` | Encrypted notepad. Deep vault green `#07120A` + teal `#2DD4BF`. |
| `/banking/rm-copilot` | **Banking Co-pilot** — an AI copilot for bank Relationship Managers. The argument is *restraint*: the scoring is deterministic and no LLM takes a credit decision, because a bank cannot defend what it cannot reconstruct. Security is the largest section, not a badge strip. Petrol `#4FA3D8` + brass `#D9A961` on `#070E14`. |
| `/fun-apps` | The lighter shelf. Near-black `#1a1a1a`. |
| `/privacy` | Must state exactly what `layout.tsx` loads. Two GA4 properties, Vercel Analytics, Speed Insights — **and the YouTube embed in the homepage `Film` section**, which loads nothing until a visitor presses play. |

> **PentaCMD is the model; Pentashell is the CLI.** Two products, two pages, two
> palettes. Getting this wrong in copy is the single easiest mistake to make on
> this site.

> **Never call the Banking Co-pilot "IDBI Sarthi."** That is only the name of
> its source folder. No real bank is named anywhere on the page, because doing
> so would imply a client engagement. Its own docs and its own UI say Banking
> Co-pilot.

### 3b. The film — `Who am I?`

> **Renamed 19 Aug 2026.** It was `No Obvious Gift` — his own line, and the
> better line — but it told a recruiter nothing about what they were about to
> watch. `Who am I?` was his own replacement, chosen over two suggested
> alternatives. The MP4 in `_source-film/` still carries the old name; only the
> on-page title changed.

A 5:57 animated documentary on the homepage (`components/sections/Film.tsx`,
YouTube `4AP2eui9720`). Made 17–18 Aug 2026. It is the longest single piece of
argument on the site, and its structure is the clearest statement of the voice in
§2, so it is worth understanding before writing anything else in this register.

**What it argues, in order:** here is the résumé — *"That is the résumé. It is
accurate, and it explains nothing"* — and now here is the part underneath it.
Establish standing, then undercut it. The first cut opened on *"I was never a
talented child"* and was wrong for exactly the reason §2 warns about: it led with
weakness before anything had been earned.

**Rules it follows, which are the site's rules:**

- **Numbers are shown, not claimed.** 677,503 is the real post; 82,000 is the
  real page; the KRA figures are on screen unattributed.
- **The employer is never named.** CBS Ventures appears only where it credits the
  CEO who hired him on the strength of the work.
- **The vulnerable beats stay in** — the rejection, the deleted page, the four
  months. They are what make the rest believable.
- **One human face, once**, on the closing ask. Nothing else in six minutes.

**The section copy is the register to match** — the film's own title, one flat
sentence, no trailer language:

> **Who am *I?*** — 5:57 · Animated documentary
> Nine years in brand marketing, two years building AI products, and the route
> between them. The whole answer, in under six minutes.

An earlier draft read *"Seventeen years, in six minutes"* over a breathless list
of the film's contents. It was rejected as childish, and correctly: it was a
trailer for itself. The closing clause does more work than the list did, because
it is a credential rather than a tease.

**Under the player go credits, not a cookie notice.** The caption used to read
*"Plays from YouTube · nothing loads until you press play"*, which nobody puts
under a film. It is now *"Written, animated, scored and cut by Suman Debnath"*.
The facade's privacy behaviour is unchanged and still disclosed on `/privacy`;
it is also restated on the play button's `aria-label` and `title`, so the
promise is still made at the point of use without shouting it.

> One open call still live on the page: **82,000 vs "eighty thousand"** — the
> clip and the narration disagree, and both are true.

---

## 4. The product-page pattern

Every product page follows the same spine, varied by palette and content. This
is the template to copy — most recently and most completely realised in
`/apps/migi-app`.

1. **Hero** — kicker, two-register headline, one paragraph that states what the
   thing is in concrete terms, a row of mono spec chips, a status pill, and the
   product's own imagery. Device mockups for apps, screenshots for web.
2. **Stat band** — six hard numbers on the product's accent colour. Numbers only
   if they are true and checkable.
3. **The problem / the history** — what existed before and why it was not enough.
   This is where an honest account of a previous version belongs.
4. **The build** — design decisions with their reasoning. "Graphite, not black,
   because lime on pure black vibrates."
5. **Feature showcase** — the two or four things that justify the work, shown
   rather than listed.
6. **Full gallery** — every screen, labelled, with a one-line note each.
7. **Engineering notes** — two to four numbered problems worth writing down,
   each with a pull-quote. The most-read part of these pages.
8. **Security / constraints** — what it cannot do, stated plainly.
9. **Stack chips**, then **CTA** back into the wider ecosystem.

### Section rhythm

Alternate grounds so the page breathes: dark → accent slab → light → dark →
accent → light. On `/apps/migi-app` this is formalised as **split-world** —
graphite bands for the app, cream bands for the story, with the second accent
(aqua) appearing only in V2 territory so the eye learns which era it is in.

### Reusable components

`components/migi-app/MigiAppVisuals.tsx` is the richest set and the best
starting point for a new app page:

| Component | Use |
|---|---|
| `Phone` | Device frame, `tone="dark"` or `"light"` |
| `HeroStack` | Three-up hero, side phones hidden below `md` |
| `StickyShowcase` | Pinned device + scrolling feature copy |
| `ScreenRail` | Snap-scrolling gallery with labels and lightbox |
| `ArchiveRail` | Compact horizontal strip for secondary/legacy shots |
| `CapabilityLedger` | Two-column ✗/✓ comparison |
| `NoteCard` | Numbered engineering note with pull-quote |
| `PaletteStrip`, `NativeSurfaces`, `Stat`, `Aurora`, `GridField` | Supporting |

Copy the file into a new `components/<slug>/` and retheme it. Do **not** try to
generalise it into a shared library — per-page ownership is deliberate.

### Every product page must mount `<HeroLock />`

The one thing that *is* shared, because it is site furniture rather than page
identity. Drop it as a **direct child of the hero `<section>`**:

```tsx
<section className="relative px-6 pt-28 …">
  <HeroLock />          // components/ui/HeroLock.tsx
```

On phones the chat launcher and the robot mascot park in the bottom corners —
exactly where a hero puts its CTAs. Measured at 375×812, **all ten product pages
collided** before this went in, several of them on two separate buttons; the
worst blocked 141×28px of "Open live demo". `HeroLock` puts `.sd-hero-lock` on
`<html>` while the hero is on screen and globals.css clears both out of the way,
releasing them again as soon as you scroll past.

It observes **its parent element**, so it belongs directly inside the hero and
nowhere deeper. It renders a `hidden` span, so it has no box and no layout
effect — verified at zero pixels inside a flex hero — and needs no
`position: relative` on the parent. A client component that already holds a ref
on its own hero uses the `useHeroLock(ref)` export instead, as `Hero.tsx` does.

---

## 5. Screenshots and assets

- Live under `public/<slug>/`. Product screenshots get clean kebab-case names
  (`free-tier.jpg`), never `Screenshot_20260812_012210_MIGI.jpg`.
- Phone screenshots are 1440×3200; frames use `aspect-[1080/2400]`, the same
  ratio.
- **Quality is pinned to 75.** `images.qualities` is unset in `next.config.ts`,
  so any other `quality` value is rejected by Next 16.
- Give every image a real `alt` describing the screen, not the filename.
- Set `sizes` honestly — a 200px rail thumb should not request a full-width image.

---

## 6. Writing the numbers

Numbers are the site's main credibility device, so they carry rules:

- Only publish a number you can source from the project itself.
- Prefer the number that shows restraint over the one that shows scale:
  **0 API keys**, **1 backend file changed** are the two strongest figures on the
  MIGI Android page, and neither is a growth metric.
- Approximate honestly — `~15 MB`, `20+ routes`.
- If a number will age badly, say what it counted and when.

### The loader is copy, not decoration (19 Aug 2026)

The cinematic loader used to say `INITIALIZING SYSTEMS…` and `Loading identity
architecture…` for six seconds. It was the first thing every visitor read and it
said nothing.

It now runs a boot log of **real claims**, in DM Mono, one per beat:

> `9+ years in brand marketing` → `2+ years shipping AI-native products` →
> `44 agents. Two language models.` → `Entering the system`

Rules if you ever edit it (`components/sections/Loader.tsx`):

- **Every line must be sourceable**, same as any other number on the site. These
  come from `lib/resume.ts` and the model pages. They are **copied, not
  imported** — pulling ~500 lines of résumé data into the homepage's initial
  bundle to print four strings would cost the exact metric this work protected.
  **Keep them in step with `lib/resume.ts` by hand.**
- **A beat is a second.** Three claims that can be read beat four that cannot.
  The first version ran five lines at 620 ms through an `AnimatePresence
  mode="wait"`, which plays each exit fully before the next enter — so every
  claim was legible for **160–320 ms** and a full second of the loader had
  nothing readable in it. Anything added here has to earn its beat.

### Accessible names must contain the visible text

Two buttons carried `aria-label`s that did not include their own visible words,
which silently breaks speech input — a user says what they see and nothing
happens. The fix does not cost the joke:

> visible `Do Not Click` · label `"Do Not Click — system self-destruct"`

Keep the visible text first, then extend. Same for the chat launcher:
`"Ask about Suman — open chat with Suman's assistant"`.

---

## 7. Privacy and sanitization

Two standing rules, both learned the hard way:

**Live private systems get sanitized.** MIGI runs against a real private
dashboard. Architecture stories are welcome; the specific authentication
bypass reasoning and the backend hostname are not. When source material is more
candid than the page should be, the page is the one that gives way.

**Suman decides what is published about himself.** He was told exactly what the
MIGI V2 screenshots expose — finance figures, job applications, LinkedIn drafts,
a résumé filename — and chose to publish all 24 at full size. Flag this kind of
thing once, clearly, then respect the answer.

---

## 8. SEO / AEO

There is a body of research in `SEO AEO Research Reports/` — a master plan, an
execution split, and audits from four different models. Read `MASTER-PLAN.md`
before making structural SEO changes.

Per-page requirements: `metadata` with title, description, keywords,
`alternates.canonical`, and an `openGraph` block with a real image. Add the route
to `app/sitemap.ts`. `/faq` carries FAQ schema; `layout.tsx` carries the
person/organization structured data.

---

## 9. Talking about the portfolio itself

If the site ever needs to be described — in a case study, an interview, or its
own README — these are the angles that hold up:

- **"A bespoke landing page per product, not one template."** The cost is the point:
  a portfolio of product work should itself look like product work.
- **"Self-hosted analytics that cannot hurt the visitor."** Every failure path in
  `/api/track` returns harmless and is swallowed; the database write is
  secondary and runs after the response.
- **"The résumé has one source of truth."** `lib/resume.ts` feeds the résumé
  page, the AI assistant's context and the contact page — so the assistant can
  never contradict the CV.
- **"Two full accessibility passes."** WCAG AA contrast across every page, after
  an audit that was itself found to be lying.
- **"An AI assistant with the injection hole closed."** Bounded cost, hardened
  message construction.
- **The honest postscripts.** The site repeatedly admits what did not work. That
  is a deliberate credibility strategy, not an accident of tone.
