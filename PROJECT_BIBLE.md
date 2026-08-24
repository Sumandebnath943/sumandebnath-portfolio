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
- `/profile` — **the only light page on the site.** Ruled cream paper, amber
  corner brackets, a 280vh pinned hero you fall into. It is a second answer to
  "who is this": `/about` argues the *transition* in gold on near-black,
  `/profile` states the profile itself. Its layout is modelled on
  pleurat.com/about at the user's request — see §4.1.
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
| `/banking/rm-copilot` | **Banking Co-pilot** (AI RM copilot) | Petrol `#4FA3D8` + brass `#D9A961` on `#070E14` |
| `/fun-apps` | The lighter shelf | Near-black `#1a1a1a` |

> **Naming trap:** **PentaCMD is the model; Pentashell is the CLI.** They are
> different products with different pages and different palettes. Do not merge
> or cross-reference them casually.

> **Naming trap:** the Banking Co-pilot's source folder is called
> `IDBI Sarthi`. **That name appears nowhere on the site and must not.** Naming
> a real bank implies a client engagement; the product's own docs and its UI
> both call it Banking Co-pilot. Its palette inverts the product's own petrol
> blue and brass for a black ground, and it carries the product's rule with it —
> brand hues stay clear of the red/amber/green band, because there those three
> mean risk band, health score and KYC state.

**Private**
- `/desk-4f7a` — the visitor analytics dashboard, plus `/login`, `/insights`, `/v/[id]`

**API**
- `app/api/track` — visitor notifier relay (dynamic)
- `app/api/contact` — contact form
- `app/api/crawl` — crawler probe
- `app/api/cron/purge` — retention purge, daily at 03:20 UTC (`vercel.json`)
- `pages/api/chat.js` — the AI assistant (Pages Router, deliberately)

Adding a page means touching **five** wire-in points, not one — see §8.

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

`/` is a composition of thirteen section components, in this order:

`Hero` → `Announcement` → **`Film`** → `ExperienceNarrative` → `NowBuilding` →
`Experience` → `SystemsStack` → `Projects` → `AIPhilosophy` → `PhilosophyFAQ` →
`OperationalHistory` → `AcademicFoundations` → `Contact`

All thirteen live in `components/sections/`. Reordering the homepage means
reordering this list in `app/page.tsx` — the sections do not know about each
other.

`Film` (added 18 Aug 2026) is the one **light** section on an otherwise black
page — a daylight band carrying the six-minute film. It is deliberately the
exception, and §6.7 covers what that costs.

> The page is known to read as **structurally ambiguous** — thirteen separate
> claims with no spine. That is an open piece of work, not an oversight; see
> HANDOFF §3.

`Experience` is the one **scroll-pinned** section: above 1024×640 and without
`prefers-reduced-motion`, it holds still for one viewport while the page scroll
drives four era cards sideways. Everything about that is documented in the file's
own header comment, including why the pin is gated on viewport *height* and why
the row is clipped by its flex cell rather than by the sticky pane.

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

### 4.1 `/profile` — the paper system

`/profile` does not use any of the above. It is the one route that opts out of
the dark site entirely, and it carries a self-contained token set scoped under
`.pf-root` in `app/profile/profile.css`. Its layout was built to match the
profile page at **pleurat.com/about**, which the user supplied as the reference:
the spacing scale, the corner brackets, the 280vh pinned hero, the word-by-word
reveal and the marquee along the bottom all come from there.

| Token | Value | What it is |
|---|---|---|
| `--pf-page` / `--pf-sheet` | `#FFFCF0` / `#FFFDF3` | the viewport, then the panel on it |
| `--pf-ink` / `-2` / `-3` | `#16140E` / `#57534A` / `#7D776A` | body, secondary, 10px labels |
| `--pf-amber` / `--pf-amber-2` | `#F3B44A` / `#A86A08` | marker fill; amber **text** |
| `--pf-serif` | Instrument Serif | the italic half of a headline |
| `--pf-rule-x` | `max(gutter, 50% - max/2 + gutter)` | the sheet's hairline, and the one number everything aligns to |

#### What makes it a sibling rather than a guest

The page is bright and the rest of the site is not, so the continuity has to be
carried by everything *except* the background. Five things do it, and none of
them are decoration — removing any one of them measurably loosens the page from
the site:

1. **Type is the site's.** Manrope, DM Mono and Instrument Serif, straight from
   `app/layout.tsx`; nothing is loaded specially for this route. Headlines use
   the house pattern from §4 — a bold sans phrase, then a serif italic one —
   through `.pf-em`.
2. **Section labels are `components/ui/SectionKicker`**, the same pill the
   homepage sections use, with a paper palette passed in. The reference's filled
   amber corner tabs are gone; both corner brackets stay open.
3. **The work board carries per-card accents** taken from each product's real
   palette in §3 and darkened to clear 4.5:1 on cream. A lime that reads
   beautifully on near-black is invisible here.
4. **Buttons and chips are rounded**, like every other button on the site,
   rather than the reference's square ones.
5. **It closes on `<Contact variant="light" />`** — the site's own ending, in
   its existing light variant.

What deliberately stays foreign is the **sheet**: the ruled paper, and the
hairline border down each side. That is the page's spine, and it is the reason
the route exists as something other than a light-mode `/about`.

#### Five things that will break if you touch them without reading the file

> **`--pf-amber` is a fill colour and never a text colour.** At 3.1:1 on paper
> it fails AA. Amber text is `--pf-amber-2` at 5.2:1. The reference's own amber
> text colour was too light and was darkened for this reason.

> **`.pf-root` uses `overflow-x: clip`, not `hidden`.** `clip` still permits
> `position: sticky` in descendants. `hidden` kills it silently and the pinned
> hero would simply scroll past — AGENTS.md trap 3.

> **Nothing in the drawing that has to be read may sit above y=178 or below
> y=231.** The hero's final viewBox is `571 173.5 250 59.1`, which trims 7.5
> units off the top and bottom of the monitor's screen. The screen rect
> (`566,166 260×74`) and `FOCUS` (`696,203`) are a matched pair — move one and
> the zoom stops landing on the screen.

> **The hero drawing's width cap is a budget, not a taste call.** The pin is
> `overflow: hidden`, so the drawing may be at most `(100svh − 360px) × 4.233`
> wide — nav clearance, plus the lead paragraph, plus bottom padding, with
> 4.233 being the scene's aspect ratio. Raise `--sd-nav-clear` or the lead's
> size and the 360 has to move with it, or short windows cut the screen off at
> the exact moment the zoom lands on it.

> **`VIEW_W` / `VIEW_H` in `ProfileVisuals.tsx` and the `aspect-ratio` on
> `.pf-kit-view` are the same numbers twice.** They are the street's window,
> not its world. Change one without the other and the street is letterboxed
> inside its own frame.

#### The four sections borrowed from the reference's *homepage*

Added 24 Aug. The reference carries four devices on its homepage that the user
wanted on `/profile` rather than on ours, so all four live here:

| Section | Component | Mechanism |
|---|---|---|
| **Where the hours go** | `Tracks` | Four disciplines; an isometric drawing swaps with the arrows |
| **The decade, counted** | `Counted` | Nine **horizontal** bars on a log scale, filling and counting up as the section crosses the viewport |
| **The software** | `ToolWall` | Two rows of brand marks drifting in opposite directions on scroll |
| **Everything shipped** | `Mosaic` | 300vh pin; opens full-bleed on one screenshot and pulls back to all twenty |

They live in `components/profile/ProfileSections.tsx` and
`app/profile/profile-sections.css`, split out because `profile.css` already
owns the tokens and the first seven sections. **Every custom property the new
stylesheet uses is defined in `profile.css`**; it declares none of its own.

> **The bar chart is logarithmic and has to be.** The four figures run 9 → 500.
> On a linear scale the first three are slivers under one tall bar and the
> section says nothing. `barFraction()` maps `log10` onto a 0.18–1.0 band.

> **The mosaic window is 20:9, not 16:9.** The grid inside is 5 × 4 and the
> screenshots are 16:9, so the window has to be (5/4) × (16/9) for a tile to
> come out 16:9. At 16:9 the tiles were 3:1 and `object-fit: cover` cropped a
> band out of the middle of every screenshot. Its height is capped through
> `max-width`, because a `max-height` fighting an `aspect-ratio` just changes
> the ratio again.

> **`.pf-wrap` needs `width: 100%` inside a column flex pin.** It carries
> `margin: 0 auto`, and in a *column* flex container an auto margin on the
> cross axis switches off `align-items: stretch` — so the wrap sized itself to
> its content, 569px instead of the sheet's 1229, and dragged the mosaic
> window down with it through the aspect ratio. It presents as "the section
> is mysteriously narrow", not as a margin problem. Only the mosaic's pin
> is affected now that the chart has none.

> **The mosaic measures its focus tile off the DOM.** Once the grid grew gaps
> and padding, a cell's centre stopped being `(col + 0.5) / 5` of the width,
> and a computed focus drifted by tens of pixels at 5×. `offsetLeft` /
> `offsetWidth` are exact. The opening scale is measured the same way, times
> `OPEN_OVERFILL`, so the gaps either side of the opening tile stay outside
> the frame. The tile it opens on is the `focus` prop — currently 7, IMPRINT,
> which is row 1 column 2 and therefore dead centre horizontally.

> **The chart is horizontal, and that is not a style choice.** It was nine
> vertical bars first. Nine columns across the sheet is 116px each, which
> forced the numerals down to 25px and the labels to 9px wrapping over three
> lines — it read as a spreadsheet. Nine *rows* gives every label a full line
> and every numeral room to be one, and comparing lengths along a shared left
> edge beats comparing heights across narrow columns. **If someone adds a
> tenth figure, add a row; do not go back to columns.**

> **`Counted` is not pinned.** The pin existed to buy the count-up running
> time, and nine rows is a tall block on its own. It keys off the section's
> ordinary trip up the viewport instead — which also deleted the branch where
> the pinned and unpinned measures disagreed below 700px, and gave the page
> back ~1,400px of scroll.

> **The isometric scenes animate, and `transform-box: view-box` is what makes
> that work.** Without it a `translateY(-6px)` is six *device* pixels —
> invisible on a small screen, enormous on a large one. With it, six units of
> the 264 × 196 viewBox. The vocabulary is `.lift` / `.bob` / `.tok` /
> `.write` / `.flow` on a shared 4.4s bar with `.l1`–`.l4` and `.k1`/`.k2`
> doing the stagger, modelled on the reference's `sv-lift` / `sv-build` /
> `sv-tok`. **These animate the drawings; they do not change them.**

> **`Counted` needs two progress measures.** Below 700px the CSS drops the pin,
> at which point "how far through the pin are we" is a couple of hundred
> pixels and the chart sits on zeros the whole time it is on screen. Unpinned,
> it reads the bars' own trip up the viewport instead.

> **Isometric corner labels go in screen space, not through `P()`.** An
> isometric point far enough outside a scene to clear it is also far enough
> along the other axis to land back on top of it — "16 PARTS · AA" rendered
> across the token grid. `Note` and `Caption` place in screen space; only the
> stage labels, which have to track their own boxes, use `Tick`.

#### Where the brand marks come from

`scripts/build-tool-logos.mjs` fetches them; `lib/tool-logos.ts` is generated
and records every source URL in its header. Three tiers, in order:

1. **svgl.app** — full-colour official marks, 21 of the 33.
2. **A direct URL from the product's own site** — 4 more, for brands no library
   carries. The most brittle entries here: a redesign moves the file.
3. **simple-icons** (a devDependency) — 3, monochrome. Adobe, OpenAI, Canva and
   others had their marks *removed* from that package over trademark policy,
   which is why it is the fallback and not the primary.

Anything none of the three covers renders as a monogram tile — currently Adobe
Firefly, Seedream, Nano Banana, Kling AI and Wan. To promote one, drop the file
into `public/tool-logos/` and give it a `direct` or `svgl` entry.

> **Validate the bytes, not the status.** Kling's logo path returns a 200
> carrying its SPA's HTML shell, which sailed through as a 122 KB "PNG" and
> rendered as a broken-image icon. An unchecked binary download is the one
> failure here that looks exactly like success.

> **The tool list is the user's, exactly.** An earlier pass added Figma,
> Photoshop, Illustrator, Canva, Codex, Grok and Next.js because they appear
> elsewhere on the site. They were not asked for. Do not add to that list.

#### Departures from the reference, all deliberate

- **No entry transition.** The reference opens on an eight-column curtain wipe.
  It was built here and then removed: no other route has one, and a single page
  that does reads as a glitch. If one is ever wanted it belongs in
  `app/layout.tsx`, applied everywhere, and carrying the site logo rather than
  a name.
- **The bottom marquee is a street, not a circuit board.** The reference walks
  its robot along a PCB whose chips carry tool names. This one walks a drawn
  cousin of the site's 3D mascot down a street of houses, offices, cafés,
  kiosks and parks, every one of them carrying a name board. Same mechanic —
  constant-speed conveyor, whatever the robot passes lights up and names itself
  — different world.
- **Light only.** No dark variant and no theme toggle.
- **The site's dark nav** floats over the paper, rather than the reference's
  own paper nav bar.
- **The figure and the dog are not in the drawing.** Both were drawn, judged
  not good enough, and pulled rather than shipped half-right. The two insertion
  points are commented in `SceneDesk` and `SceneFore`; the constraint to
  remember is that limbs must be *stroked* paths, because a filled limb pinches
  at the outside of every curve.

### Accessibility

The site has been through **three full WCAG AA contrast passes** (`38029b6`,
`00a90a9`, and `eafc88d` + `c328ee7` on 16 Aug). Small labels are the usual
offender, and the 9–10px mono label system is deliberate art direction — 118 of
120 on the homepage carry wide tracking and 88 are uppercase. **Fix contrast,
not size.** Colour changes cost no layout; size changes break tight badges and
rows.

> **`text-white/45` is not a safe floor — use `/50`.** Earlier guidance here
> said `/45`. Measured against the real surfaces it computes to *exactly* 4.5:1
> with nothing spare, so every `/45` label was failing. The floor on dark
> grounds is **`/50`**; on cream (`#FDF6EE`) nothing lighter than **`#6E6E6E`**
> passes, which is slightly stricter than pure white.

**Measure with alpha compositing over the full ancestor stack, including
gradient stops.** A naive `color` vs `backgroundColor` comparison reports false
1.0 ratios for text on translucent same-hue backgrounds (e.g. `text-[#8C7B60]`
on `bg-[#8C7B60]/[0.08]`) and cannot see `background-image` gradients at all —
both patterns are common here.

**Low contrast usually traces to one shared value, not scattered one-offs.**
`#5A6286` accounted for 19 of 21 failures on PentaCMD *and* 16 of 17 on Qdex;
migi's `muted` token carried 21 nodes by itself. Group failures by computed
colour before editing anything.

> **Tailwind's opacity modifier only accepts values on its scale — steps of
> five.** `border-[#1A1A1A]/12` compiles to *nothing*, and the element silently
> falls back to the preflight border grey `#E5E7EB`. It looks close enough to a
> hairline to survive a visual check; it was caught only by reading
> `getComputedStyle().borderColor`. Use a bracketed value — `/[0.12]` — for
> anything off the scale, and **verify new colour work by computed style, not by
> looking at it.** `/45`, `/15` and the rest of the multiples of five are fine.
>
> **This recurred on 19 Aug**, in a session where this very paragraph was in the
> repo. `bg-white/12` on the loader's progress track compiled to nothing and the
> track was invisible; it was found by reading `backgroundColor` and seeing
> `rgba(0, 0, 0, 0)`. Knowing the rule is not enough — **grep your diff for
> `/\d` opacity modifiers before you ship.**

**Brand-coloured ordinals are deliberately left failing.** The golds, greens,
oranges and violets used as decorative section numbers score 2.1–4.2 on white.
Darkening them enough to pass would visibly shift the palette for text that
carries no information. That is a standing decision, not an oversight.

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
  <PageFaq href="/your/path" />
  <RelatedPages href="/your/path" />
  <Contact variant="dark" />
</MotionProvider>
```

`<Contact />` closes the page — it **is** the footer, sitemap and legal strip
included. There is no separate `<Footer />`; the component that used to sit
there returned `null` and has been deleted. See §8.

### Six motion traps that have already cost real debugging time

**Traps 4–6 were all found on 19 Aug 2026 while building the mascot's entrance
and the chat launcher. Each of them fails silently.**

**4. `animation-fill-mode: both` outranks your `:hover`.**
An animated value beats a normal declaration in the cascade, so a forwards fill
leaves the animation's final frame in force forever. A `to { transform: none }`
entrance on the chat pill would have permanently killed its `:hover` lift and
`:active` press — with nothing in the code to point at. **Use `backwards`**
unless you genuinely need the end state pinned.

**5. A transition and its target set in the same React commit do not animate.**
The browser sees both in one style recalculation and has nothing to animate
*from*, so the element snaps. The mascot's entrance did this **intermittently**,
because whether it worked depended on commit timing — it would run correctly for
a dozen reloads and then slide with no movement at all. **One-shot entrances
belong in CSS keyframes**, which start on mount and cannot race.

**6. A CSS animation restarts every time its element mounts.**
`RobotMascot` returns `null` while the chat is open, so *closing* the chat
re-mounts the subtree and replayed the entrance every single time. Guarding the
effect is not enough — **guard the class** with one-shot state, or the animation
comes back whenever React re-creates the node.

---

**The original three:**

**1. `overflow-hidden` silently kills `position: sticky`.**
An ancestor with `overflow: hidden` becomes the sticky element's scroll
container, and since it never scrolls, the sticky child just scrolls away with
the page. This broke the sticky showcase on `/apps/migi-app`. If a sticky
column is not pinning, check every ancestor for `overflow-hidden` before
touching the sticky code.

> **The same rule eats a straddling legend.** Both PACT signature panels label
> themselves with a `-top-[10px]` legend that crosses the card's own border, and
> both cards carried `overflow-hidden` for a decorative sweep beam — so 9px of a
> 17px label was clipped and neither legend had ever rendered (fixed 22 Aug).
> When a card must clip something decorative *and* let a child escape its
> bounds, **put `overflow-hidden` on a wrapper around the decoration**, not on
> the card. To measure rather than squint: put the rule back temporarily and
> compare `getBoundingClientRect().top` against the clipping ancestor's.

**2. The body is the scroll container — but window scroll events do still fire.**
`document.body` computes to `overflow: hidden auto`, which is why
`document.body.scrollTop` reads 0 and scrolling it does nothing.
`IntersectionObserver` remains the right default for reveal-on-scroll work.

> **Measured 19 Aug 2026, and the older wording here was too absolute.**
> `document.scrollingElement` is `<html>`, `window.scrollY` tracks correctly, and
> a `window` scroll listener fired 19 times across a single programmatic scroll.
> That is what makes framer-motion's `useScroll` work, and the pinned era rail in
> `components/sections/Experience.tsx` depends on it. **Do not rule out a
> scroll-driven design on the strength of this trap without measuring first** —
> but do keep writing to `window`/`document.scrollingElement`, never
> `document.body.scrollTop`.

**3. three.js colour management silently re-tints anything written before r152.**
`ColorManagement.enabled` defaults to `true` since three **r152**, so
`new THREE.Color(0xadc1de)` no longer hands a shader the raw sRGB triple — it
converts to linear first. `(0.678, 0.757, 0.871)` becomes `(0.418, 0.533, 0.731)`.
Red loses far more than blue, so **anything expecting the old behaviour drifts
violet.** This is what made the Vanta clouds purple on `Film` while Vanta's own
demo page, running identical hex values on r134, looked white.

Nothing errors. It just looks subtly wrong, which is why it is worth knowing
before you reach for any WebGL library that predates r152.

The obvious fix — `THREE.ColorManagement.enabled = false` — is **not available
here.** The flag is global, and `RobotMascot` in `app/layout.tsx` puts a GLTF
scene on every page sharing the same `three` instance; disabling colour
management site-wide to correct a background would change how the robot renders.

Compensate locally instead: pass each colour through linear→sRGB first, which
three's sRGB→linear then undoes, landing the shader on the intended value. See
`CLOUD_OPTIONS` in `components/sections/Film.tsx`, where the pre-compensated hex
and the original are both recorded.

> **Verify by sampling the canvas, not by eye.** `drawImage` the WebGL canvas
> into a 2D canvas and read pixels. Warm white cloud reads **R ≥ G > B**; a
> violet cast is blue over green with red suppressed. That check is the only
> reason the fix could be confirmed at all — see §11.

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

A **third party now reaches the site from outside `layout.tsx`**: the YouTube
embed in `Film`. It is disclosed on `/privacy` in the same terms it behaves —
nothing from Google loads until the visitor presses play (§6.7).

---

### 6.7 The film and the facade embed (`components/sections/Film.tsx`)

`Who am I?` — a 5:57 animated documentary — sits on the homepage between
`Announcement` and `ExperienceNarrative`. YouTube ID `4AP2eui9720`. It shipped as
*No Obvious Gift* and was renamed on 19 Aug 2026; the master MP4 in
`_source-film/` keeps the old filename.

**It is a facade, not an embed.** A YouTube iframe pulls well over a megabyte of
Google JavaScript. Paying that on every homepage visit, for the majority who
never press play, lands directly on this page's LCP. So the section renders its
own poster (`public/film-poster.jpg`, cut from the master at 7.5s) and mounts the
player only on click, against `youtube-nocookie.com`.

Three things follow, and all three are load-bearing:

- **Privacy.** Nothing from Google touches a visitor unless they choose to watch,
  which is exactly what `/privacy` claims. Replacing the facade with a plain
  iframe makes that page untrue.
- **The poster is chosen.** YouTube's auto-thumbnails tend to land on a dissolve.
- **It is the one light section on a dark site.** Vanta CLOUDS renders a daylight
  sky; the type is dark ink; the video card stays dark so it reads as a
  deliberate band rather than a section that lost its background.

**Consequences of that inversion, each of which was a bug first:**

| Concern | Resolution |
|---|---|
| Reduced-motion fallback | Must be a **light** gradient. A dark one made the section appear light or dark depending on a visitor's OS setting — a page that looks like two different designs. |
| Small-type contrast | Dark-on-light broke it: eyebrow 4.23:1, caption 3.57:1, both under the 4.5:1 floor. Now `#3A434E` at 7.49:1 against the measured sky. |
| Cloud shadow | `cloudShadowColor` is dark enough to fail contrast under **any** usable veil. Not solved by the veil — solved by geometry: CLOUDS renders clear sky at the top of the frame where all the type sits, and drops shadow lower, where the opaque card covers it. **If you move type down this section, that protection is gone.** |

**Loading.** `three` is already a dependency but is code-split behind the robot
mascot, so it is *not* in the homepage's initial bundle — importing it eagerly
would put it there and undo the point of the facade. Both `three` and
`vanta/dist/vanta.clouds.min` are dynamically imported, and only once the section
intersects the viewport. Reduced-motion and screens under 768px skip the effect
entirely, which is why the gradient underneath is a finished design.

Pointer, touch and gyro controls are all **off** — it is a backdrop, and
capturing those fights scrolling on touch.

> Not a bug: the canvas draws at ~1/3 resolution and upscales
> (`vanta.clouds` sets `scale: 3`, `scaleMobile: 12`). The shader is expensive
> and cloud is soft enough that the upscale is invisible. It is why the effect is
> cheap enough to justify at all.

See §5 trap 3 for why the colours are pre-compensated.

---

## 7. Data layer — `lib/`

| File | Role |
|---|---|
| `resume.ts` | **Single source of truth for career facts.** Feeds `/resume`, the AI system prompt, `/contact`, and the KRA bullets in `components/sections/OperationalHistory.tsx` (homepage + `/about`). Edit this, never the consumers. |
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

`Button`, `GlassCard`, `GradientText`, `SectionWrapper`, `SectionKicker`,
`AnimatedBento`, `PrivacyNotice`, `EasterEggs`, `SiteTour`, `HeroLock`. This is
the only genuinely shared component layer; everything else is per-product by
design.

`HeroLock` is shared because it is site furniture, not page identity: it clears
the chat launcher and the mascot out of a hero's CTAs on phones. It exports a
`useHeroLock(ref)` hook for client components that already ref their own hero
(`Hero.tsx`) and a default `<HeroLock />` component for the product pages, which
are server components and cannot hold a ref. The component **observes its parent
element**, so it belongs directly inside the hero `<section>` and nowhere
deeper; it renders a `hidden` span, so it has no box and no layout effect.

`SectionKicker` is the numbered pill above each long-form homepage heading —
`02 / The Evolution`, `05 / Operating Principles`, `06 / Experience`,
`07 / Academic Foundations`. It is shared precisely because the point is that all
four are the same shape; **colour is not shared**, and each caller passes its own
chip, dot and text classes, because the four sit on white, pale blue and cream
and one hard-coded ink fails contrast on at least one of them.

---

## 8. Adding a product page — the seven wire-in points

Missing one of these is the most common defect in this repo. A new page needs:

1. **The route** — `app/<section>/<slug>/page.tsx`, plus a
   `components/<slug>/<Slug>Visuals.tsx` for its client pieces and optionally
   `<slug>-data.ts`.
2. **`components/layout/Navigation.tsx`** — add the entry under the right
   submenu, with the product's accent colour. A new category (a new sub-menu
   such as **Banking**) is just a nested `submenus` array; the phone sheet
   renders from the same structure, so both menus pick it up at once.
3. **`components/layout/CommandPalette.tsx`** — add id, `/command`, label,
   description, href, icon.
4. **`app/sitemap.ts`** — add the URL with `changeFrequency` and `priority`.
5. **`<HeroLock />`** — mount `components/ui/HeroLock.tsx` as a **direct child
   of the hero `<section>`**. Without it the chat launcher and the mascot cover
   the hero's own CTAs on a phone. See PORTFOLIO_HANDOFF.md §4 for the measured
   overlap on every page.
6. **The closing sequence** — every page ends with the same three blocks, in
   this order, and a page missing them is link-orphaned no matter how good its
   content is:

   ```tsx
   <PageFaq href="/your/path" variant="dark" />        // or "paper"
   <RelatedPages href="/your/path" variant="dark" />   // must match PageFaq
   <Contact closingBg="…" glowColor="…" hazeColor="…" />
   ```

   `<Contact />` **is the footer** — the closing panel, the four-column sitemap
   and the white legal strip. It is mounted per page, never from the layout,
   because it is themed per page; pass a `closingBg` built from the page's own
   accent, or `variant="light"` on the paper pages. Do not add a second footer
   below it. See `AEO_PLAYBOOK.md` §5.1.

   Add the page to **`lib/pages.ts`** (a `PageEntry` plus an entry in the
   `RELATED` graph) so the Related block has something to show. Adding it to
   `FOOTER_GROUPS` in `Contact.tsx` is a **separate, deliberate** decision —
   that list is sixteen hand-picked links, not an index.
7. **`lib/page-faqs.ts`** — two to four questions somebody would actually type,
   with self-contained answers. Read the rules at the top of that file first, and
   **do not duplicate a question that already exists in `lib/faqs.ts`**. See
   `AEO_PLAYBOOK.md` §3.

Also set page-level `metadata` with `alternates.canonical` and an `openGraph`
image, and put screenshots under `public/<slug>/`.

Then run **`node scripts/build-route-dates.mjs`** so the sitemap carries a real
`lastModified` for the new route.

`/llms.txt` needs no action — it is generated from `lib/pages`, `lib/projects`
and the notebook registry by `app/llms.txt/route.ts`, so adding the page above
adds it there too. **`public/llms-full.txt` is still hand-written** and does
need an entry.

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

Four folders at the repo root hold **originals that are not shipped**, and all
four are git-ignored. They exist because the served asset is a processed
derivative and the pipeline needs its input kept:

| Folder | Holds | Becomes |
|---|---|---|
| `_source-fbx/` | Mixamo FBX animations (`Idle.fbx`, `Jumping.fbx`, `Running.fbx`, …) | `public/robot.glb`, via `scripts/build-robot-glb.mjs` |
| `_source-journey-art/` | Full-size journey illustrations (`01-prologue.png` …) | Cropped/optimised art under `public/journey/` |
| `_source-journey-assets/` | Real personal artefacts — old screenshots, logos, photos | The evidence shown on `/journey` |
| `_source-film/` | The whole film production: 30 Veo clips, 3 stills, 23 narration files, 3 music beds, and a Remotion studio | `No-Obvious-Gift-master.mp4` → YouTube; `public/film-poster.jpg` |

**The film pipeline** (`_source-film/studio/`) is a Remotion project, 24fps to
match the source footage — rendering 24fps material into a 30fps timeline judders
on every camera move in all 30 clips. Its shape is worth knowing before touching
it:

| File | Role |
|---|---|
| `src/film/timeline.ts` | The clock. 23 chapters, each with a **measured** narration duration and a trailing gap. Everything else derives from these. |
| `src/film/edit.ts` | The cut. Shots declared per chapter as **weights**, not seconds, so re-recording a line re-flows the pictures instead of leaving the edit permanently offset. |
| `src/film/Sequences.tsx` | The 13 coded sequences — anything with a number, UI or type in it. |
| `src/film/Film.tsx` | Draws each shot; owns the grade, the scene joints and the audio mix. |
| `scripts/normalize-vo.py` | Matches every narration file to −16 dB speech RMS. |
| `scripts/build-beds.py` | Loops the music with crossfades (see trap below). |
| `scripts/render-chunks.py` | Renders in 1000-frame chunks against a pre-built bundle, then joins with `-c copy`. |

> **Render in chunks.** A single 8,576-frame 1080p pass exceeded the free space on
> this machine and died with a native crash that reported exit code 0. Chunking
> caps peak scratch usage and is resumable — finished parts are reused, so a
> failure part-way through does not discard an hour. Bundle once
> (`npx remotion bundle`) and render every chunk against it.

> **Trap: `<Audio>` does not loop — it stops.** The music tracks are 111–144s and
> the first bed has to cover 248s, so the film ran in **silence from 1:54 to
> 4:06** — nine chapters — and it presented as "the music is inconsistent"
> rather than as an outright fault. `scripts/build-beds.py` now builds
> `*-bed.mp3` long enough for their spans, joined with 6s crossfades because a
> hard loop point is audible as a click. **Check bed length against span before
> trusting a mix.**

> **Trap: pace reveals to the CHAPTER, not the shot.** Sequences receive two
> clocks, `p` (their own shot) and `cp` (the whole chapter). A reveal paced to
> `p` finishes when its shot ends — which is why the tool list raced ahead of the
> narration and then got cut away from mid-sentence. Anything timed to speech
> uses `cp`.

> **Cut to measured phrase boundaries, not by eye.** Weights set by feel put the
> budget card 2.2s late, the traffic card 4.1s and the delivery card 3.9s — the
> error accumulated because each shot pushed the next along. `ffmpeg`
> `silencedetect=noise=-34dB:d=0.22` gives real sentence boundaries.

> **Trap:** journey art is **cropped before serving**, not with CSS. If an
> illustration looks wrongly framed, fix the derivative in `public/`, do not add
> `object-position` hacks — the horizon alignment on that page depends on the
> crop being right.

Because these are ignored, a fresh clone cannot rebuild `robot.glb`, reframe
journey art, or **re-render the film**. The source folders live on Suman's
machine at `D:\project\sumandebnath\_source-*`.

> `_source-film/` is the only copy of the film's inputs and of the studio that
> assembles them. The published MP4 and the YouTube upload are outputs; they
> cannot be edited back into a new cut. **If that folder is lost, the film can be
> replayed but never revised.** It is worth a backup somewhere other than this
> disk.

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
`components/layout/Navigation.tsx`, `components/robot/RobotMascot.tsx`,
`components/robot/RobotModel.tsx` and `components/robot/ChatTakeover.tsx` —
`react-hooks/set-state-in-effect`, `purity` and `immutability`. **They are not
yours, do not "fix" them incidentally.** Count them before and after your change
and confirm the number is unchanged; that is the check, not zero.

**Performance.** Before running any test or proposing any performance work, read
**`PAGE_OPTIMIZATION.md`**. This page has properties that break the usual
assumptions — a single PageSpeed run is noise, and a trace frequently ends
before the mascot has even loaded.

**Browser verification.** Use the Browser pane tools, never `npm run dev` in a
shell.

> **Trap:** if a screenshot fails with *"the Browser pane is not displayed"*,
> the tab is not compositing — and **rAF, IntersectionObserver and scroll events
> are all suspended.** Scroll-driven UI will look permanently broken when it is
> fine. Verify with `getBoundingClientRect` maths, `read_page` and the build
> instead, and say plainly that scroll behaviour is unverified.
>
> **It is worse than that, learned 19 Aug.** In this state R3F canvases stay
> frozen at their default `300×150`, framer-motion never advances a single
> frame, and **layout reads return `0` for elements with explicit pixel
> widths** — an impossibility in a working engine, and the tell that the
> measurements rather than the CSS are broken. Hours went into chasing a
> "progress bar stuck at 0" that was rendering correctly the whole time.
>
> **Prove rAF is alive before diagnosing anything animated:**
> `let t=0;const f=()=>{t++;requestAnimationFrame(f)};f();setTimeout(()=>console.log('rAF/sec',t/2),2000)`
> — expect ~60. If it prints 0, every animation observation from that session is
> void; fall back to DOM state (inline styles, class lists), which needs no rAF.

**Read-only territory.** The Android sources at `D:\project\migi agent app`
(V1) and `D:\project\migi agent native android app` (V2) are reference material
for `/apps/migi-app`. **Never write to them.**

### 10.0 The first-visit intro sequence

`lib/intro.ts` owns the order things appear in on a first landing on `/`. Read it
before touching `LoaderGate`, the loader's z-index, or when the mascot reveals.

Measured against a production build:

| | First visit | Reload / other route | Driven by |
|---|---|---|---|
| Black cover | ~150 ms, before first paint | — | inline script in `app/layout.tsx` |
| Loader | on hydration, ~3.8 s | — | `LoaderGate` |
| Cover fades out | loader ends, over 600 ms | — | `.sd-intro-out` |
| Navigation | +1.0 s | immediate | `.sd-intro-nav` in `globals.css` |
| Mascot (runs in from the right) | +2.5 s | +0.8 s | `useReveal` |
| Chat launcher | +3.5 s | +1.4 s | `useReveal` |

> **All three are on one clock, and that is the point.** Chat briefly ran on a
> flat timer from page load while the other two keyed off the loader, so a first
> visit showed chat five seconds *before* the robot and a reload showed the
> robot first — same code, opposite order. If you change one delay, keep the
> ordering intact.

> The reload delays are short rather than zero on purpose: the mascot pulls
> ~2.4 MB and starts WebGL, and firing that during first paint is what costs
> LCP. Under a second is imperceptible and keeps it off the critical path.

Four things here are load-bearing, and each was a bug first:

> **The loader was `z-200` — below the chat launcher (1000), the mascot (9999)
> and the nav (10000).** All three drew straight over the loading screen. It is
> now `z-99999`. Raising anything above that puts it back on top of the intro.

> **`LoaderGate` must not key off `!visible`.** During hydration
> `useSyncExternalStore` returns the *server* snapshot first — "already seen" —
> so `visible` is false for one render. Keying off it lifted the cover the
> instant React booted and started the mascot's clock so early it revealed
> *during* the loader. Key off `dismissed` and `introRunsThisLoad()`.

> **The inline script's 8 s failsafe must stay cancellable.** It exists for
> "React never arrived", but slow hydration plus a ~6 s loader can exceed any
> fixed deadline — and a failsafe firing mid-loader frees the nav early and
> lifts the cover under a running intro. `LoaderGate` clears it once the loader
> is on screen.

> **The mascot's entrance effect returns no cleanup, deliberately.** It did
> once, and a re-run cancelled the arrival timer of an entrance already in
> flight — leaving `busyRef` true forever, so the robot reached its corner and
> then ignored every hover and tap, its whole chase dead. `enteredRef` makes it
> run once; teardown is unmount-only.

> **The entrance travel is a CSS keyframe, not a transition on `x`.** The
> transition version set the transition and the target in the same React commit,
> so the browser saw both in one style recalculation, had nothing to animate
> from, and snapped the robot home while the Running clip played on the spot.
> It was *intermittent*, because it depended on commit timing. A keyframe
> starts on mount and cannot race. It rides its own wrapper so it never contends
> with the inline `translateX` the chase writes.

> **Fill mode is `backwards`, never `both`,** on the entrance, the chat
> launcher and the loader's signature wipe. An animated value outranks a normal
> declaration, so a forwards fill would leave the animation's end state in force
> — killing the chat pill's `:hover` lift, and pinning the mascot under a
> transform the chase is trying to drive.

#### The mascot renders on demand, not on every frame

> If the robot looks or behaves wrong, go to **`ROBOT_ROLLBACK.md`** — it is
> indexed by symptom and carries the per-item undo for everything below.

Both canvases run `frameloop="demand"` with a `FrameLimiter` (in
`RobotCanvas.tsx`) calling `invalidate()` on a rAF clock — **30fps while the
robot is idling, 60 while it is running or jumping**, and 60 in the chat
takeover while the rig is flying between corner and panel. Measured: **119 →
59 draw calls per second at rest**, which is the largest single saving
available on this page.

- rAF, never `setInterval` — rAF stops in a background tab; a timer would go on
  redrawing a robot nobody is looking at.
- `RobotMascot` derives the rate from `anim`, so it is state-driven and the
  escalation happens on the same render that starts the run.
- **If the robot ever appears frozen, look here first.** Under `demand`,
  nothing renders unless something asks; a broken limiter shows a single
  static frame rather than an error.
- `dpr` is capped at **1.5**, not 2 — 56% of the pixels on a 2× display, 25% on
  a 3× phone. Antialiasing stays **on** deliberately: the robot is a dark
  silhouette on a transparent background, which is exactly where jagged edges
  show, and pixel count is the cheaper lever.

#### WebGL context loss — why the robot came back black

Browsers discard the WebGL context of a backgrounded tab. three re-uploads
image-backed textures on restore, but the environment map ends up as a GPU-side
PMREM cubemap that nothing regenerates — and with both robot materials at
`metalness: 1.0`, losing it removes nearly all of their light. Alt-tab away,
come back, and the robot is near-black with no reflections on its skin.

drei guards this **only for gainmap formats** (`webp`/`jpg`) and returns early
for `.hdr`, which is what this project uses, so nothing upstream handles it.
Both canvases now listen for `webglcontextrestored` and remount themselves via a
`key`. Blunt, and correct: it is a certain rebuild of a state that is already
broken, and it costs nothing until a context is actually lost.

The nav is held by **CSS, not React state**, because it is server-rendered:
gating it on a client value would hide it in the HTML from crawlers and from
anyone without JavaScript. No script means no class means no change.

Repeat visits and every other route are untouched — no cover, no nav hold, and
the mascot keeps its old `useDeferredReveal` timing with no entrance.

### 10.1 Immutable static assets — a standing rule

`next.config.ts` serves two paths with
`Cache-Control: public, max-age=31536000, immutable`:

| URL | What it is | Rebuilt by |
|---|---|---|
| `/hdri/city-256.hdr` | The environment map both robot canvases light from (Poly Haven, CC0) | `scripts/shrink-hdri.mjs` from `city.hdr` |
| `/robot-v2.glb` | The mascot model | `scripts/build-robot-glb.mjs` → `scripts/shrink-robot-textures.mjs` |

Two full-size masters sit beside them and are **not served**: `hdri/city.hdr`
(1.5 MB) and `robot.glb` (1.07 MB). They are the inputs to the two shrink
scripts, so keep them.

Everything else under `public/` keeps Next's default
`public, max-age=0`, which revalidates on every visit. These two are exempt
because the mascot is mounted in the **root layout**, so both files are fetched
on *every page*, and together they are ~2.4 MB.

> **The rule: `immutable` means a browser will not revalidate for a year.
> Replacing either file in place ships the change to nobody who has already
> visited the site.** There is no cache-bust, no 304, no "hard refresh will fix
> it" for real visitors. If either asset is ever regenerated it **must get a new
> filename** — `robot-v2.glb`, `city-v2.hdr` — and every reference updated with
> it. For `robot.glb` those references are `components/robot/RobotModel.tsx`
> (both `useGLTF("/robot.glb")` and its `useGLTF.preload`); for the HDR they are
> `components/robot/RobotCanvas.tsx` and `TakeoverRobotCanvas.tsx`, which must
> always stay in step with each other.

`scripts/build-robot-glb.mjs` prints this reminder when it finishes, because
that is the moment it becomes relevant.

Adding a new long-cached asset means adding it to the table above as well as to
`next.config.ts`. If an asset's content changes on a schedule you do not
control, it does not belong here — give it `max-age` in days instead.

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

### Added 18 August 2026 — and how it was checked

§6.7, §9.1's film pipeline and §5 trap 3 were all written from work done that
day. Everything in them was verified by **measurement rather than by eye**, which
matters because it had to be: the browser pane would not composite for that whole
session, so no screenshot was ever possible.

What that meant in practice, and what to reuse:

- **DOM assertions instead of screenshots.** Section order was confirmed with
  `compareDocumentPosition`, not by looking. The facade was proven by checking
  that no `iframe` exists before the click and that its `src` is
  `youtube-nocookie.com` after.
- **Canvas pixel sampling** for the colour fix — `drawImage` into a 2D canvas,
  then read points. This is the only reason "the clouds are white now" is a fact
  rather than a hope.
- **Computed contrast ratios**, blending each foreground against the background
  *after* the veil's alpha. The accessibility notes in §4 warn that naive
  `color` vs `backgroundColor` checks report false ratios and cannot see
  gradients at all; that warning is what caught the 4.23:1 and 3.57:1 failures.

**Still unverified: how any of it actually looks.** The band against the black
sections above and below, the sun glare's position behind the card, and the
mobile fallback have been reasoned about and never seen. If something looks
wrong there, the documentation is not lying to you — it simply never covered
appearance.
