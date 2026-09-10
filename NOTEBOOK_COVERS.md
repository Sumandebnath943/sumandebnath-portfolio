# Notebook cover art — the house style and every prompt

Thirty-three covers in two visual systems — the flat screen-print the archive
was drawn in, and the cinematic style everything since September 2026 uses. This
file holds both style blocks, a prompt for each existing article, and the rules
for adding one.

**Writing a new cover? §2, §3a and §7.** The rest is history and reference.

Companion: `BLOG_GUIDELINES.md` (writing the posts themselves).

> **Images inside an article use this same pipeline.** Since 7 Sep 2026 a post
> can carry a `figure` block as well as a `cover` — see the type in
> `lib/notebook/types.ts`. Put the master in `_masters/notebook-covers/` named
> `<slug>-<something>.png` so it sorts beside its post's cover and cannot be
> confused with another post's, run the same converter, and point the block's
> `src` at the WebP it writes. `width` and `height` on the block are the real
> pixel dimensions of that file — 1280 wide, and whatever height the ratio gives
> — because `next/image` uses them to reserve the box and prevent layout shift.
> The in-article slot does no cropping at all, so the safe-area rules below
> apply to it only insofar as the same file is also a cover.

---

## 1. How to use this

**Paste `§2` once at the top of a fresh image conversation, then send the
per-post lines from `§4` one at a time.** Keeping them in a single conversation
is what holds the style together — starting a new chat per image is the fastest
way to end up with twenty-six unrelated pictures.

| Setting | Value |
|---|---|
| Aspect | **3:2** (1536 × 1024). Every slot on the site is 3:2 as of 11 Sep 2026, so nothing crops — see §1.1 |
| Edges | **Nothing is cropped, but do not fill the last few per cent.** The signature lives in a bottom corner |
| Text | **The article's title, trimmed if long.** Set in the left third; see §2 for the layout |
| Retries | Expect two or three attempts per image, almost always for the text |
| File | Save as `_masters/notebook-covers/<slug>.png`, then run the converter — **never commit the PNG**, see §5 |

> **If the text renders wrong twice, generate it clean and add the words
> yourself.** A cover with mangled lettering is worse than a cover with none, and
> `PostCover` falls back to generated art if you leave `cover` unset.

### 1.1 Every slot is 3:2, so nothing crops anywhere

**Settled 11 Sep 2026. All six cover slots render a 3:2 master whole.**

| Slot | Box |
|---|---|
| Article lede — `.nb-cover` | 3:2 |
| Front-page grid card — `.nb-card-cover` | 3:2 |
| Lead story — `.nb-lead-cover` | 3:2 |
| Row card — `.nb-row-cover` | 3:2 |
| Rail thumbnail — `.nb-hl-cover` | 3:2 |
| Compact card — `.nb-compact-cover` | 3:2 |

`PostCover` still renders `fill` + `object-cover`. With the ratios matched that
is a no-op rather than a crop. Verified on a production build: every slot
reports a box ratio of exactly 1.500, and the lede is 936 × 624 against a
936 × 624 image.

#### Why it was not, and why that reasoning failed

Two slots used to crop on purpose — the lede at 16:9 (7.8% off top and bottom)
and the grid card at 5:3 (about a tenth). Both were justified from the same
premise: the covers keep every subject inside the middle 80%, so the edges are
free. **The arithmetic was correct every time it was checked. The premise was
the thing that was wrong.**

The covers carry a signature mark in a bottom corner, which is outside the
middle 80% by definition. So the lede's bottom crop took a bite out of it on
every article page, and the "sliver" that the safe area was supposed to absorb
was landing on the one element placed at an edge on purpose.

> **A safe area protects the subject, not the furniture.** A signature, a logo,
> a page number or a credit sits at an edge deliberately, and any rule of the
> form "the outer N% is expendable" will eventually eat one. That is the
> generalisable part and it is the reason this section is no longer a table of
> crop percentages.

Two related findings from the period when slots did crop, kept because they are
still true of any ratio mismatch:

- **A square slot cuts a third off each side.** Rail thumbnails shipped 1:1 for
  one commit and visibly clipped the artwork. Vertical trimming and horizontal
  trimming are not the same risk, and these images are composed for neither now.
- **A 16:9 master in a 3:2 slot loses 7.8% off each side** — measured, when
  `what-ai-agents-cost-to-run` shipped at 1280×720 for one commit and lost the
  first characters of its strapline in the lead-story slot. It was reframed to
  3:2 the same day. `cited-by-chatgpt-what-i-changed` was padded to 16:9 by hand
  in September and regenerated from its 3:2 master on 11 Sep.

**Masters must be 3:2. Nothing else is safe, and now nothing else is necessary.**
Check with `node -e` on the file header or any image tool before converting; a
non-3:2 master no longer gets cropped into shape by a box, it just renders
letterboxed or clipped depending on which dimension is long.

**1280 wide is still the ceiling** (§5) and a full-bleed desktop lede would want
about 2400. That is why the lede is *wide-contained* at 936px rather than edge
to edge: at 936 the 1080 variant is served with no upscale on a 1× display.
Going full-bleed means cutting new `<slug>-wide.webp` derivatives from the
masters — a second derivative, not a regeneration, and §5's permanence warning
applies.

---

## 2. The style block — paste this first

**Current house style, settled 11 Sep 2026.** Cinematic scene photography, not
flat illustration. Paste this once at the top of a fresh image conversation and
keep all of a batch in that one conversation.

> House style for my blog hero images. Cinematic, photorealistic 3D render of a
> real physical scene — dark, warm and shallow-focus, lit by one practical
> source: a window at golden hour, a desk lamp, city lights through glass. Not
> flat illustration, not vector, not minimalist.
>
> **Layout: the left third is type, the right two-thirds is the scene.** The
> headline sits in a large high-contrast display serif, white, with the final
> clause in one accent colour I will name each time. Optionally one small grey
> sans-serif strapline beneath it. Generous dark negative space behind the type
> so every word stays legible.
>
> **Format: 3:2, 1536 × 1024.** Nothing is cropped, but keep the outer few per
> cent clear of anything that matters.
>
> Props in the scene must carry the article's argument, not decorate it: books
> whose spines you can read, a mug with a line on it, a handwritten notebook, a
> framed print on the wall. Show the failed or unfinished thing as well as the
> successful one.
>
> Render every word of text exactly as given and spell it correctly. No people's
> faces. No brand logos other than the one I attach.

Then, per image: the article's full title, the on-image text (the title, trimmed
if it is long), the accent colour, the scene, and the logo instruction —
*featured only, small, in a bottom corner, not the main highlight.*

> **The signature is why §1.1 exists.** It sits at a frame edge on purpose, so
> no slot may crop. Do not move it to the centre to make a crop safe; fix the
> slot.

### 2a. The previous house style, and the twenty-six covers that use it

Superseded 11 Sep 2026 and kept because most of the archive is still drawn in
it. **Do not mix the two in one batch, and do not use this for a new post.**

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

**The archive is mixed and that is now the accepted state.** This file used to
record `empty-between-projects` as the single licensed exception and warn that
"two reads as a set that has quietly split in half". Two became eight before
anybody rewrote the rule, which is the actual lesson: **a style decision made
one cover at a time is a style change that has not been written down yet.** New
posts get §2. The flat covers stay as they are — reissuing twenty-six images to
match is a cost with no reader on the other end of it.

---

## 3. Accent per image

### 3a. The dark style (§2) — pick per article, not per category

The category accents in §3b are chosen to sit on cream and carry black text.
**On a dark scene they read as mud.** The current style needs a bright accent
that holds against near-black, so it is picked for the individual image:

| Use | Accent |
|---|---|
| Alarm, forgery, something going wrong | `#F0A83C` amber · `#F2685E` red · `#E8674C` rust |
| Measurement, correction, a number improving | `#5FE3A1` mint · `#7FE3C4` teal-mint |
| Distance, engines, systems being observed | `#7FB6F5` cool blue · `#6FC3E8` sky |
| Method, rules, process | `#B79CF0` violet |
| Career, craft, the human side | `#E0A96D` bronze · `#F5C453` yellow |

> **Vary it across consecutive posts.** The family resemblance comes from the
> layout, the serif and the signature — not from repeating one colour. Two
> articles running the same accent back to back on the index looks like a
> mistake rather than a system.

**One accent per image, on the closing clause of the headline** and optionally
one object in the scene. Never two accents, never as a wash.

### 3b. The flat style (§2a) — accent by category

Taken from `CATEGORY_ACCENT` in `lib/notebook/types.ts`, so those covers sit
inside the same palette as the filter chips and the generated art. Still correct
for the twenty-six covers already drawn in that style.

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

> **§4 is a record, not a template.** Every prompt below was written for the
> flat style in §2a and its four-words-of-on-screen-text rule. They are kept
> because they document what each existing cover shows and would be needed to
> reissue one. **A new post's prompt is written against §2 and §3a instead** —
> see §7 for the shape.

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
> A hand turning a crank generator on a dark workbench, wired to a bare bulb that
> is lit only while the crank turns. Warm light falls on the near bench; the rest
> of the workshop recedes into black. On-screen text: **ONLY WHILE IT TURNS**

> **This was the first cover in what is now the house style, and at the time it
> was filed as a one-off.** Decided by Suman on 29 August 2026: a dark
> photographic render with a warm orange key light rather than flat cream-and-ink
> screen-print. Three options were put — ship it as an exception, restyle it
> flat, or rewrite §2 and migrate the other twenty-six. He took the first.
>
> **The note that used to sit here said it licensed this cover and nothing
> else**, and warned that "two reads as a set that has quietly split in half".
> That warning was correct and it was ignored seven more times before anybody
> came back to rewrite §2 — which happened on 11 Sep 2026, and only because a
> cropped signature forced a look at the covers. **The exception was the new
> style arriving early; nobody recognised it as that for a fortnight.**
>
> The rule worth carrying forward is in §2a: a style decision taken one cover at
> a time is a style change nobody has written down yet. When the second exception
> shows up, rewrite the style block instead of granting it.
>
> One measurement from wiring it in, still useful: it converts to **77 KB**
> against the flat set's 189 KB average, because a dark photograph carries almost
> none of the paper grain §5 identifies as the expensive part of that style. The
> other measurement recorded here — how close its type sat to the lede's 16:9
> crop — no longer applies; §1.1 removed the crop.

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

Paste `§2`, pick an accent from `§3a` that no recent post is using, then send one
message carrying five things:

1. **The article's full title**, so the model knows what it is illustrating.
2. **The on-image text** — the title, trimmed if long, split across two or three
   lines with the closing clause marked as the accent-coloured one.
3. **The accent colour**, as a hex value.
4. **The scene**, in two or three sentences. Name the props and what is written
   on them.
5. **The logo instruction** — *featured only, small, in a bottom corner, not the
   main highlight.*

Then paste a short **more context** paragraph: the article's real numbers and
its finding. It is what stops the model inventing a generic tech scene.

> **Check what the model wrote on the props before shipping it.** Two of the
> five covers made on 11 Sep 2026 carry invented specifics — one shows IP
> addresses and a date that do not match the article's, and one shows nine
> plausible generic rules where the article is about nine particular ones. The
> scene is illustration and can be loose. **Anything legible that looks like
> data is a claim**, and the article underneath it is being read by people who
> check.

The test for the scene is whether somebody who has not read the post can guess
what it is about. "A robot at a laptop" fails that test for every article here.
Five headstones named after the five bugs does not.
