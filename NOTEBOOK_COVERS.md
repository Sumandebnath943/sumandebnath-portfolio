# Notebook cover art — the house style and every prompt

Twenty-six covers, one visual system. This file holds the reusable style block,
a prompt for each existing article, and the rules for adding one.

Companion: `BLOG_GUIDELINES.md` (writing the posts themselves).

---

## 1. How to use this

**Paste `§2` once at the top of a fresh image conversation, then send the
per-post lines from `§4` one at a time.** Keeping them in a single conversation
is what holds the style together — starting a new chat per image is the fastest
way to end up with twenty-six unrelated pictures.

| Setting | Value |
|---|---|
| Aspect | **3:2** (1536 × 1024). `PostCover` draws at 400 × 260, so a 16:9 image loses its sides |
| Safe area | Keep all text and the main object **inside the middle 80%** — a sliver crops top and bottom |
| Text length | **Four words maximum.** Image models still fumble long strings; short lines survive |
| Retries | Expect two or three attempts per image, almost always for the text |
| File | Save as `_masters/notebook-covers/<slug>.png`, then run the converter — **never commit the PNG**, see §5 |

> **If the text renders wrong twice, generate it clean and add the words
> yourself.** A cover with mangled lettering is worse than a cover with none, and
> `PostCover` falls back to generated art if you leave `cover` unset.

### 1.1 Where the safe area actually gets spent

Added 26 Aug 2026, when the notebook redesign put the same 3:2 master into four
differently-shaped boxes. `PostCover` renders `fill` + `object-cover`, so **the
box does the cropping** and the middle-80% rule above is what makes that safe.
The arithmetic, so nobody has to redo it:

| Slot | Box | Cut from a 3:2 master | Verdict |
|---|---|---|---|
| Article lede — `.nb-cover` | **16:9** | 7.8% off each edge | Inside the safe area |
| Front-page grid card — `.nb-card-cover` | **5:3** | ~5% off each edge | Comfortable |
| Lead story, rail, headline and foot thumbnails | **3:2** | nothing | Native ratio, no crop |
| *(rejected)* a wider cinematic lede | 2:1 | **12.5% off each edge** | **Outside it — do not** |

> **Square is the one that broke it.** A 1:1 thumbnail cuts **a third off each
> side**, not a sliver off the top — the safe area does not protect horizontal
> cropping at all, because these are drawn to be trimmed vertically. The rail
> thumbnails shipped square for one commit and visibly clipped the artwork; they
> are 3:2 now. If a slot needs a square mark, it needs a different asset.

**1280 wide is still the ceiling** (§5) and a full-bleed desktop lede would want
about 2400. That is why the lede is *wide-contained* at 936px rather than edge
to edge: at 936 the 1080 variant is served with no upscale on a 1× display.
Going full-bleed means cutting new `<slug>-wide.webp` derivatives from the
masters — a second derivative, not a regeneration, and §5's permanence warning
applies.

---

## 2. The style block — paste this first

> Flat editorial illustration in the manner of a broadsheet newspaper's
> technology section. Screen-print feel: solid shapes, no gradients, no glow, no
> 3D, no photorealism, no lens effects.
>
> Background is warm cream paper, hex #F4F1EA, with a faint visible paper grain.
> All linework and type is ink black, hex #12161A — confident, moderately thick,
> very slightly imperfect as if hand-pulled. Exactly **one** accent colour per
> image, which I will name each time; use it sparingly, on one or two shapes
> only, never as a background wash.
>
> One clear central idea per image, generous negative space around it, composed
> for a 3:2 frame. No borders or frames. No people's faces. No brand logos, no
> real product names, no fake UI screenshots.
>
> Where text appears, set it in a bold condensed grotesque, all capitals, ink
> black, occupying no more than one fifth of the frame, positioned with clear
> margin from every edge. Render the words exactly as given and spell them
> correctly.
>
> The whole set should look like it was drawn by one hand for one publication.

---

## 3. Accent by category

Taken from `CATEGORY_ACCENT` in `lib/notebook/types.ts`, so the covers sit inside
the same palette as the filter chips and the generated art.

| Category | Accent |
|---|---|
| Career | `#8a5a1f` — bronze |
| Marketing & AI | `#1f5f6b` — deep teal |
| Method | `#5a3a7a` — violet |
| Practice | `#2c6047` — forest green |
| CSS & Layout | `#b4472a` — rust |
| React | `#38408f` — indigo |
| Next.js | `#45505e` — slate |
| Graphics | `#7a3358` — plum |

---

## 4. The prompts

Each line is a follow-up message. Format: **subject — accent — on-screen text.**

### Career · accent `#8a5a1f` bronze

**`marketer-to-ai-product-builder`**
> A cardboard filing box lying open and completely empty, one small label on its
> front. Its long shadow stretches away and resolves into a dense row of sealed,
> stacked boxes. Accent `#8a5a1f` on the label and the far stack only.
> On-screen text: **EMPTY REPOSITORY**

**`ai-product-role-without-cs-degree`**
> A closed panelled door with a rolled certificate lying on the floor in front of
> it, still tied. Beside the door, a window stands wide open with tools and small
> built objects arranged on the sill. Accent `#8a5a1f` on the open window frame.
> On-screen text: **NO DEGREE**

**`ai-skills-for-a-marketing-cv`**
> A single sheet of CV paper. A long list of small identical square icons runs
> down it, struck through with one decisive diagonal line; near the bottom a
> single line is circled. Accent `#8a5a1f` on the strike-through and the circle.
> On-screen text: **CUT THE TOOL LIST**

**`what-ai-native-actually-means`**
> An enamel lapel badge pinned to fabric, and a magnifying glass held over it
> revealing the badge is hollow — the back is open and empty. Accent `#8a5a1f` on
> the badge rim. On-screen text: **PROVE IT**

**`finishing-is-not-building`**
> Eight small flags planted in a line across bare ground. Six lie collapsed and
> faded; the last two stand upright and have grown into simple built structures.
> Accent `#8a5a1f` on the two standing flags only.
> On-screen text: **EIGHT IN ELEVEN DAYS**

**`empty-between-projects`**
> A bare bulb wired to a hand crank on a workbench. While a hand turns the crank
> the bulb is lit and the bench is visible; the hand has just let go, and the
> unlit half of the same bench is drawn receding into dark. Accent `#8a5a1f` on
> the lit filament only. On-screen text: **ONLY WHILE IT TURNS**

### Marketing & AI · accent `#1f5f6b` deep teal

**`cited-by-chatgpt-what-i-changed`**
> A printed page from which one single paragraph is being lifted cleanly out and
> upward, leaving a crisp rectangular gap behind. The lifted paragraph is held
> between two large quotation marks. Accent `#1f5f6b` on the quotation marks.
> On-screen text: **QUOTED, NOT RANKED**

**`aeo-vs-seo-what-changes`**
> A split composition. On the left, ten stacked horizontal bars like a list of
> results. On the right, one single speech bubble. A narrowing arrow runs from
> the ten into the one. Accent `#1f5f6b` on the speech bubble only.
> On-screen text: **TEN RESULTS, ONE ANSWER**

**`agentic-ready-website`**
> A tall door with four bolt locks running down it. Three are drawn open, the
> fourth is still shut. A small simple robot stands patiently in front of it.
> Accent `#1f5f6b` on the one closed lock.
> On-screen text: **CAN IT READ YOU?**

**`do-you-need-an-llms-txt`**
> A plain sheet of paper pinned to a large public noticeboard. A crowd of small
> figures walks past without looking; one tiny robot has stopped and is reading
> it closely. Accent `#1f5f6b` on the single robot.
> On-screen text: **ALMOST NOBODY READS IT**

**`real-ai-tool-or-wrapper`**
> A large ribboned gift box opened to reveal a much smaller plain box inside it,
> surrounded by a great deal of empty packing space. Accent `#1f5f6b` on the
> small inner box. On-screen text: **REMOVE THE MODEL**

**`what-ai-replaces-in-marketing`**
> A desk with a vertical column of paper trays. Mechanical arms lift the top
> three away cleanly; the bottom two are held down by a heavy weight and stay.
> Accent `#1f5f6b` on the weight. On-screen text: **TASKS, NOT JOBS**

**`what-marketing-teams-should-automate-first`**
> A long queue of identical repeating documents feeding into a simple machine.
> One document, marked with a small hand symbol, has been pulled out of the line
> and set aside. Accent `#1f5f6b` on the set-aside document.
> On-screen text: **THE BORING ONES FIRST**

### Method · accent `#5a3a7a` violet

**`research-before-writing-a-prompt`**
> An hourglass. The upper chamber is packed with tiny stacked books and folded
> documents; the lower chamber holds one short single typed line. Accent
> `#5a3a7a` on the typed line. On-screen text: **READ FIRST**

**`never-run-a-coding-agent-on-autopilot`**
> A mechanical arm reaching eagerly toward a large rubber stamp marked with a
> tick. A human hand has closed around its wrist and holds it back, just short.
> Accent `#5a3a7a` on the human hand. On-screen text: **NO AUTO-ACCEPT**

**`keeping-secrets-out-of-ai-built-apps`**
> A key being lowered into a small heavy vault. To one side, the same key drawn
> flat on a page of code and struck out. Accent `#5a3a7a` on the vault.
> On-screen text: **NEVER IN THE CODE**

**`the-cost-of-building-alone`**
> A very long meeting table with many empty chairs receding into darkness. One
> chair at the near end is lit by a single desk lamp. Accent `#5a3a7a` on the
> lamp's pool of light. On-screen text: **NOBODY SAYS YOU'RE WRONG**

**`shipping-a-product-in-a-weekend`**
> A wall calendar with two adjacent days circled firmly. From the second circle a
> long faint dotted line continues far beyond the calendar's edge, off the page.
> Accent `#5a3a7a` on the two circles.
> On-screen text: **WORKING IS NOT FINISHED**

**`what-a-marketer-has-to-learn`**
> A toolbox with its top tray lifted out and tipped, spilling a few shiny
> ornamental tools. Underneath, a deeper tray of plain, worn, heavier tools is
> revealed. Accent `#5a3a7a` on the lower tray.
> On-screen text: **NOT THE SYNTAX**

### Practice · accent `#2c6047` forest green

**`taste-is-the-last-thing-to-be-automated`**
> Four nearly identical simple objects on four low plinths. A machine at the back
> is quietly producing more of them. A single hand reaches in and points at one.
> Accent `#2c6047` on the chosen object.
> On-screen text: **CHOOSING IS THE WORK**

**`is-ai-generated-code-safe-for-production`**
> Two identical sealed envelopes side by side. One remains sealed; the other has
> been opened and its contents are being read through a magnifying glass. Accent
> `#2c6047` on the opened envelope. On-screen text: **WHO READ IT?**

**`the-trap-i-wrote-down-was-wrong`**
> An open notebook page with a confidently written note on it, struck through
> with one firm line. A precise measuring instrument lies across the page beside
> it. Accent `#2c6047` on the strike-through.
> On-screen text: **WRONG FOR A YEAR**

### CSS & Layout · accent `#b4472a` rust

**`overflow-hidden-kills-position-sticky`**
> A square sticky note trying to cling to the smooth inner wall of a sealed box,
> caught mid-slide down the surface, with a faint motion trail above it. Accent
> `#b4472a` on the sticky note. On-screen text: **NOTHING TO STICK TO**

### React · accent `#38408f` indigo

**`strictmode-defeats-init-guards`**
> A turnstile that has rotated once and locked. A small figure stands behind it,
> pushing, unable to pass. A single used ticket lies on the floor. Accent
> `#38408f` on the locked turnstile arm.
> On-screen text: **IT ONLY RUNS ONCE**

### Next.js · accent `#45505e` slate

**`nextjs-16-middleware-is-now-proxy`**
> A wooden signpost at a junction. The old nameplate has been unscrewed and
> leans against the post; a new nameplate is being fixed in its place. Accent
> `#45505e` on the new plate. On-screen text: **MIDDLEWARE IS PROXY**

**`json-ld-missing-next-script-beforeinteractive`**
> A sheet of paper held up against a bright light. Most of the page shows
> ordinary printed lines, but one central block is entirely blank — the light
> passes straight through where content should be. Accent `#45505e` on the edge
> of the blank block. On-screen text: **INVISIBLE WITHOUT JS**

### Graphics · accent `#7a3358` plum

**`three-js-r152-colour-management`**
> A colour swatch card entering one side of a glass lens and emerging from the
> other side visibly shifted and darkened, the two versions overlapping slightly.
> Accent `#7a3358` on the emerging shifted swatch.
> On-screen text: **EVERY COLOUR SHIFTED**

---

## 5. The pipeline — masters in, WebP out

> **Never commit a generated PNG.** They arrive at ~2.9 MB each; twenty-six of
> them is 74 MB, and git keeps every version of every blob for ever. One careless
> commit of a set this size is permanent.

Three steps:

1. Drop the full-size PNGs into **`_masters/notebook-covers/`**, named
   `<slug>.png`. That folder is git-ignored.
2. Run the converter. It resizes to 1280 wide and encodes WebP at quality 80.
   ```bash
   node scripts/build-notebook-covers.mjs
   ```
3. Commit what it wrote to `public/notebook/`. That output *is* tracked — it is
   what the site serves.

**Measured on the first twenty-six: 74.4 MB → 4.9 MB, a 93% reduction,
averaging 189 KB a cover.** The script's header records the size-versus-quality
table it was chosen from, so the numbers can be argued with rather than trusted.

> **1280 wide is not a round number, it is the answer.** The largest a cover is
> ever rendered is `100vw` on a phone, so a 430px viewport at 3× device pixel
> ratio wants about 1290px. Anything above that is bytes nobody downloads.

> **The visitor does not download 189 KB.** `next/image` re-encodes to AVIF or
> WebP at the rendered size, so a grid card fetches far less. The 189 KB is
> repository and deployment weight only.

> **`_masters/notebook-covers/` is git-ignored, which means unbacked.** Same
> standing risk as `_source-film` (HANDOFF §3 item 0b): a generator will not
> return the same image twice from the same prompt, so losing that folder means
> the covers cannot be reproduced exactly. Back it up off this disk.

### Where this lives, and for how long

Committed to the repository and served from `/public` by Vercel. No external
service, no second place to look, and a cover is versioned with the post it
belongs to.

At 189 KB a cover, that scales further than this blog ever will:

| Posts | Covers on disk |
|---|---|
| 26 (today) | 4.9 MB |
| 100 | ~19 MB |
| 500 | ~95 MB |
| 1,000 | ~189 MB |

GitHub recommends keeping a repository under a gigabyte. Covers alone would not
reach that until roughly **4,500 posts**, so this is not a decision that needs
revisiting at any realistic volume.

**The real constraint is history, not total size.** Every regenerated cover
committed is a new blob kept for ever, so ten attempts at one image cost ten
times one image permanently. Convert and commit the *final* file only; iterate in
`_masters/`, which is ignored.

Three alternatives were considered and are not needed yet:

- **Vercel Blob** — moves images off the repository, at the cost of
  `remotePatterns` configuration, a second place to look, and covers no longer
  versioned alongside their post. Worth it if this ever holds video or thousands
  of images.
- **Cloudinary or imgix** — a transformation CDN, which duplicates what
  `next/image` already does here. It would add a dependency to solve a solved
  problem.
- **Git LFS** — keeps clones small, but GitHub's free LFS bandwidth is modest and
  every Vercel build would spend it pulling objects. Poor fit for files this size.

---

## 6. Wiring a cover in

```ts
cover: "/notebook/<slug>.webp",
coverAlt: "…",
```

`coverAlt` is **required whenever `cover` is set** and it is not decorative —
describe what the illustration shows, not the article's title. A screen reader
user should get the metaphor, not a repeat of the heading they just read.

Leave both unset and `PostCover` draws deterministic generated art from the slug
and the category accent instead, which is a real design rather than a
placeholder. **A missing cover is not a broken post**, so there is no need to
generate all twenty-six before shipping any.

---

## 7. Adding a cover for a new post

Paste `§2`, take the accent for the post's category from `§3`, and write one line
in the shape of `§4`: **a single concrete object or scene that carries the
article's argument, plus four words at most.**

The test for the metaphor is whether somebody who has not read the post can guess
what it is about. "A robot at a laptop" fails that test for every article here.
An empty box with a long shadow of full ones does not.
