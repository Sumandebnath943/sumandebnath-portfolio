# Writing for the notebook

Everything needed to add a post to `/notebook` without breaking the things that
already work. Read this before writing one.

Companion documents: `AEO_PLAYBOOK.md` (why any of this is shaped the way it is),
`PORTFOLIO_HANDOFF.md` (how the rest of the site writes), `PROJECT_BIBLE.md`
(how the system is built).

---

## 0. Read the two writing guides first. Every time. No exceptions.

**`WRITING_INFORMATION_GAIN.md` and `WRITING_HUMAN_VOICE.md` are mandatory
pre-flight for every article, and they outrank this file wherever they
disagree with it.** They are Suman's, added 7 Sep 2026, and they are copied into
this repo rather than referenced at their original path so they cannot go
missing and cannot drift from what was actually followed.

They exist because of a specific failure. A draft on AI agents was written
against this file alone, passed every check in it, and was rejected on sight.
The three faults are worth naming, because this file did not catch any of them:

1. **Every subheading was a withheld fragment.** "The chain that caught it."
   "The model was never the unreliable part." Each hides its subject to sound
   interesting. Six in a row is a signature, and the reader's verdict was "pure
   AI slop — very random and not self-explanatory".
2. **The topic was too narrow to matter.** It was built on one incident nobody
   else has had. A reader has to be able to see themselves in the first
   paragraph.
3. **No information gain.** It never established what everyone else says, so it
   could not establish what it knew that they did not.

### The three gates, in order

**Gate 1 — information gain.** Score the angle before outlining. Level 0
(restates the field) is killed. Level 1 (new framing, no new data) only if
nothing better exists. **Level 2 (real numbers, a real case) is the target** and
Level 3 (a new framework) is the best outcome. Getting there means research
first: find what the top pieces on the topic all say, then find the question
they all leave unanswered. **Fewer than 15 specific data points in the outline
means there is no article yet.** Go and find more; never pad.

**Gate 2 — the persona.** Decide, in writing, before drafting: what does this
person believe, what cliché do they refuse to repeat, what is the one opinion a
balanced writer would hedge on. Hold it for the whole piece. A neutral,
comprehensive, helpful voice is the failure mode, not the safe option.

**Gate 3 — subheadings are a mini-outline.** **Every `h2` is a complete thought
with a subject and a claim, readable alone by someone who skims.** "Eleven agents
had a backup provider that was never actually connected" — not "The silent
failure". This is the single rule most likely to be broken, and it is the one
that gets a piece dismissed fastest.

### Where the guides overrule this file

| Topic | This file used to say | The rule now |
|---|---|---|
| Title register | "Prefer the question form" | **Number-led claim. Never a question** — question headlines lose roughly 3-to-1 on reader preference |
| Where the question goes | The title | **`metaTitle` and `faqs`** — which is where an answer engine matches it anyway, so nothing is given up |
| Subheadings | Unspecified | Complete thoughts, always |

> **The AEO argument for question-shaped titles was never lost, it moved.**
> `metaTitle` already existed to let the H1 and the search result want different
> words (§2b). The searchable question goes there and into `faqs`, which is the
> block that actually gets lifted. The H1 is then free to be the thing that makes
> somebody read.

---

## 1. The three-step mechanic

1. `lib/notebook/posts/<slug>.ts`, default-exporting a `Post`.
2. Import it in `lib/notebook/index.ts` and add it to `POSTS`.
3. `node scripts/build-route-dates.mjs`.

Nothing else. The index page, the sitemap, the RSS feed, `/llms.txt` and the
category archives all derive from that registry. There is no globbing — the
explicit list is what keeps those five surfaces from disagreeing.

**Content is typed TypeScript, not MDX.** `lib/notebook/types.ts` explains why at
length; the short version is that a malformed post fails `tsc` instead of
rendering wrong in production. Inline markup inside a `p` block is a deliberately
tiny subset: `[label](href)`, `` `code` `` and `**bold**`.

---

## 2. The fields that carry SEO and AEO weight

| Field | Job | Rule |
|---|---|---|
| `title` | The H1 and the search result | **Question-shaped or claim-shaped. Never a noun phrase.** |
| `answer` | The extractable block under the H1 | **40–60 words, self-contained** |
| `description` | `<meta name="description">` | Written for a search result, not for a quote — must differ from `answer` |
| `facts` | Definition table | The quotable specifics: versions, numbers, measurements |
| `faqs` | `FAQPage` structured data | Two to four. **Must not duplicate any existing question — see §4** |
| `category` | Filter bar and archive route | Exactly one, from the closed list |
| `tags` | Tag filter | Reuse the existing vocabulary; see §5 |
| `cover` / `coverAlt` | The card image | Optional — see `NOTEBOOK_COVERS.md` for the house style and a prompt per post. Unset is fine; generated art takes over |

### Titles

An answer engine matches a user's question against headings before it matches
body text. "Why does position: sticky silently stop working?" is findable;
"Sticky positioning notes" is not.

Both registers are in the archive. **Only one of them is correct for a new
post.**

- **Question** — "Why is my JSON-LD missing from the HTML in Next.js?"
- **Claim** — "I spend a fifth of every project before I write the first prompt"

> **⚠ Superseded 7 Sep 2026 by §0. Number-led claims only; do not write a new
> question-shaped title.** Question-format headlines lose to number-led ones by
> roughly 3-to-1 in reader-preference testing, and thirteen of the first
> twenty-six titles here were questions. The searchable question is not lost —
> it moves to `metaTitle` and to `faqs`, which is the block an answer engine
> lifts. The existing question titles stay; they are indexed and renaming a live
> URL's H1 buys nothing.

Target roughly **11 words and 65 characters** for the H1, sentence case, with a
number in it wherever a number is honest. Single digits or 10 beat large ones —
a "15 ways" headline now reads as a chore. Use zero or one superlative, never
two or three, which lands as neither credible nor exciting.

Put the searchable keyword in the **slug** as well, so the URL states the
promise in plain words.

> **⚠ This rule, applied to a whole archive at once, produced a blog that read
> like an FAQ — and that is not hypothetical.** Counted across the first
> twenty-six articles before `SEO_AUDIT.md` corrected them: **eight titles
> contained the word "actually"**, thirteen of twenty-six were question-shaped,
> and eleven ran past sixty characters. Nobody uses one hedge word in a third of
> their headlines. It is the clearest possible tell that they were written in one
> sitting to one instruction.
>
> Three additions, all learned the expensive way:
>
> 1. **Vary the register deliberately.** If the last two articles opened with a
>    question, the next one does not. Judge it against the index, not the post.
> 2. **"Actually" is banned from titles.** It hedges and adds nothing. The audit
>    removed all eight.
> 3. **A number beats an adjective.** "Eight repositories in eleven days. Six
>    died within three." outperforms every other phrasing of that lesson, and it
>    is checkable.
>
> Question-shaped remains correct for the technical articles, where people type
> the question almost verbatim. It is wrong as a default for everything else.

### `metaTitle` — when the headline and the search result want different words

Added 26 Aug 2026 with the audit. The H1 can be a hook of any length; the thing
that appears in a search result has roughly sixty characters before Google cuts
it.

```ts
title: "Eight repositories in eleven days. Six died within three.",
metaTitle: "Why solo builders abandon projects: 8 repos, 11 days",
```

Set it **only** when the two genuinely differ. Where the title is already short
and searchable, leave it unset and the title is used. **Under 60 characters** is
the one hard rule on this field.

Nine of the twenty-six titles still run past sixty characters and that is fine —
the meta title is what truncates, and none of those do.

### `keywords` — target phrases, not taxonomy

Also new, and distinct from `tags`, which are the blog's own taxonomy and drive
the filter UI. A tag is `Security`; a keyword is `API keys AI generated code`.
Falls back to `tags` when unset.

**One primary phrase per article.** The one-question-per-URL constraint in §4
applies to keywords too — two articles targeting one phrase compete with each
other rather than with anybody else.

#### Run the search before you set the phrase. Not after. (11 Sep 2026)

**Search every candidate phrase and read what ranks, before drafting.** This is
not optional polish; it is the second half of Gate 1, and doing it from judgement
instead of from results has already been caught once.

`fake-ai-crawlers-forged-user-agents` was drafted with four keyword phrases
chosen by inspection, and `gapInCoverage` scored at 16 on the assumption that
nobody had covered the topic. One search corrected all of it:

- **The phrase was contested.** "Verify AI crawler by IP" is held by Search
  Engine Journal, HAProxy, GeoIPHub and three free bot-verifier tools. A how-to
  on this site loses to every one of them. The keywords were retargeted onto the
  incident and the two findings, where the competing page count is near zero.
- **`gapInCoverage` was wrong by five points** — 16 to 11, and `popularityScore`
  71 to 66. The score is an editorial forecast (§8), but a forecast made without
  looking is a guess wearing a number.
- **It surfaced a counter-argument the draft had no answer to.** `ChatGPT-User`
  is a user-directed fetcher, so an address outside the published range is not on
  its own evidence of forgery. The article now puts that objection before its own
  conclusion. Without the search it would have shipped with a hole in it.
- **It caught a factual overclaim.** The draft said five vendors publish crawler
  IP lists. Apple, DuckDuckGo and Common Crawl publish them too; five was the
  number this site's verifier reads.

So the order is: pick the angle, **search it**, read the top results, then set
`keywords` and score `gapInCoverage` from what you found. Two of the four
corrections above were factual rather than strategic, which is the argument for
doing this even on an article whose keywords you are confident about.

> **A crowded phrase is not a reason to kill the article.** It is a reason to
> target a different phrase within it. The how-to half of that topic was well
> covered and the incident half was not covered at all.

### The answer block

This is the block a model lifts and quotes. It has to survive being read with no
page around it: no "as described above", no pronouns pointing back at the title.

> **Third person for identity-bearing posts, first person for everything else.**
> A first-person answer — "I documented that…" — attributes to nobody once it is
> extracted. Where a post is doing entity work (`AEO_PLAYBOOK` §3.1b: there is a
> better-indexed Suman Debnath), the answer block names its subject and the body
> stays in the author's voice. See `marketer-to-ai-product-builder.ts`, which
> carries a comment explaining the split.

---

## 2b. The two in-article blocks

Added with the reading-page rebuild. Both render as `<aside>` and both are
skipped by the `wordCount` in the article's structured data, so neither inflates
the length the page claims.

### `pullquote`

```ts
{ kind: "pullquote", text: "A scroll-driven timeline got ruled out on the strength of one sentence." },
```

**Lift a real sentence out of the article. Never write a new one.** A pull-quote
saying something the piece does not say is a caption pretending to be a quote,
and inventing them is the same move §6 bans for originating mistakes. One per
post is plenty.

Two placement rules, both learned by getting them wrong:

1. **Never let it be the last block.** Ending an essay on a line it has just
   said is the opposite of "end on the last real thing".
2. **Leave a paragraph between the quote and the paragraph it came from**, so
   the reader is not looking at the same sentence twice in succession.

### `promote`

```ts
{
  kind: "promote",
  href: "/projects/aegis-vault",
  note: "What I built after thinking about this for long enough — notes encrypted in the browser.",
},
```

`href` is a path exactly as it appears in `lib/pages.ts`; the label and blurb are
read from that registry, so a renamed page cannot strand a stale card. `note`
overrides the blurb where the article wants to say something more specific.
An href that is not in the registry **fails the build** rather than rendering a
hole.

> **Only where the article is genuinely about that page.** Twenty of the
> twenty-six posts list `/projects` in `seeAlso`; dropping that card into all
> twenty would reproduce exactly the interchangeable ad slot this is modelled
> on. Nine of the twenty-six carry one. Most posts should carry none.

Placement is the closing third — before the final `h2` — not after the last
line, which is where an advertisement goes.

---

## 3. Length, and what it should be governed by

**Match the topic, not a house rule.** Reading time reflects reality:

| Kind of post | Typical |
|---|---|
| A specific technical failure and its fix | 4–6 min |
| A method or working-practice piece | 6–8 min |
| A personal or career account | 8–12 min |

`readingMinutes` is shown in the dateline and should be honest — roughly 200
words a minute. Do not pad a short answer to hit a length, and do not compress a
real story into a listicle. A technical post that could be three paragraphs
should be three paragraphs.

---

## 4. The hard constraint: no duplicate questions

> **No question may appear on two URLs.** The same question answered differently
> in two places is a content collision; Google picks one and discounts the other.

Before writing any `faqs` entry, check all three question stores:

```bash
grep -n "q:" lib/faqs.ts lib/page-faqs.ts lib/notebook/posts/*.ts
```

`lib/faqs.ts` answers questions about **the person**. `lib/page-faqs.ts` answers
questions about **a specific page**. A post's `faqs` answer questions about
**that post's subject**. Overlapping wording between the three is the failure.

The same applies to titles: `/faq` already owns "Can a brand marketing manager
become an AI product manager?", so no post may be titled that. Pick a different
angle or a different phrasing that is genuinely a different question.

---

## 5. Categories and tags do different jobs

**Categories are closed.** Eight of them, and adding a ninth is a deliberate
decision requiring an accent colour in `CATEGORY_ACCENT` and a check that the new
slug does not collide with an existing one.

| Category | Holds |
|---|---|
| CSS & Layout, React, Next.js, Graphics | Specific technical failures, by technology |
| Practice | Craft and judgement in engineering work |
| Career | Transition, hiring, roles, getting in |
| Marketing & AI | Written for marketers — including AEO/GEO, which is a marketing discipline |
| Method | How the work actually gets done |

> A blog that lets categories grow freely ends up with twenty of them, one post
> each, and a filter bar nobody uses. "Opinion" was proposed and rejected on
> exactly that basis — it would have held one post.

**Tags are open but disciplined.** Reuse before inventing. The vocabulary in use:

`AEO` · `Agents` · `AI-Native` · `Career` · `Colour` · `CSS` · `Debugging` · `Design` ·
`Documentation` · `Engineering` · `Layout` · `Marketing` · `Migration` ·
`Next.js` · `Process` · `Prompting` · `React` · `Routing` · `Security` · `SEO` ·
`StrictMode` · `Structured Data` · `three.js` · `WebGL`

> Keep this list current. A tag added to a post and not added here is how the
> vocabulary quietly doubles — the next writer greps the posts, sees a near-miss
> synonym, and invents a second one for the same idea.

Two to four per post. A tag used once is not a tag, it is a note.

**Tags are links now.** Since 26 Aug 2026 they render in a "Filed under" row at
the *foot* of the article — not the masthead, where a reader has no use for them
yet — and each one goes to `/notebook/all?tag=<tag>`, which seeds the archive's
filter. Two consequences for an author:

- **A tag that is not in the vocabulary above still renders, but its link does
  nothing.** `BrowseAll` checks the parameter against the real tag list and
  ignores anything it does not recognise, so a one-off tag produces a link to an
  unfiltered archive. Reuse before inventing, as above.
- `/notebook/all` self-canonicalises, so `?tag=` creates no duplicate indexable
  URL — `AEO_PLAYBOOK` §3.4's rule against query-string views is not breached.

---

## 6. Voice — how not to read as machine-written

> **`WRITING_HUMAN_VOICE.md` §3 and §5 are the operative rules here and this
> section is the site-specific supplement.** That file carries the vocabulary
> blacklist (`delves`, `underscores`, `meticulously`, `showcasing`,
> `intricacies`, `pioneers`, "provide valuable insight", and the rest), the
> sentence-rhythm targets, and the density method. Three of its mechanics are
> worth restating because they are measurable and they are the ones that get
> skipped:
>
> - **One sentence of six words or fewer per ~150 words**, and never three
>   consecutive sentences within five words of each other in length. Default
>   generated prose sits flat around 0.2–0.4 variance; human writing is 0.6–1.2.
> - **Every paragraph carries a fact, number or name the reader could not have
>   guessed from the headline.** Write the section sparse, then densify at the
>   same length by cutting hedges to make room — three or four passes, stopping
>   before it reads as a spec sheet.
> - **Do not over-correct.** "however", "between", "analysis" and "using" are
>   normal words at normal frequency. Banning them makes prose worse for nothing.

This matters commercially: a post flagged as generated is a post that gets
dismissed, and the audience for several of these is already sceptical. **No
detector can be guaranteed, by anyone.** What actually separates real writing
from generated writing is specificity, and specificity comes from material.

**Do:**

- Name the thing. A date, a version number, a repository, a measured figure. "It
  had been wrong for months" is weaker than "the repository was created in
  January and has never had a commit".
- Admit the cost, the doubt and the part that did not work. A post that concedes
  nothing reads as marketing regardless of who wrote it.
- Vary sentence length. Let some be short.
- State one claim per paragraph and move on.
- Use British spellings, as the rest of the repo does: *optimise, colour,
  summarised, behaviour, realised*.

**Do not:**

- Open with a definition, a dictionary move, or "In today's fast-paced…".
- Use the "it's not just X, it's Y" construction. Once is a tic; twice is a
  signature.
- Stack tricolons — "faster, cheaper and more reliable" — as a substitute for
  one specific fact.
- Write a conclusion that restates the post. End on the last real thing.
- **Invent an originating mistake.** Process writing is usually trauma-shaped
  ("I lost a week, so now I always…"), and reaching for that arc when it did not
  happen is both a lie and the most recognisable generated-essay move there is.
  `research-before-writing-a-prompt.ts` says plainly that the habit came from
  studying, not from a disaster, and is stronger for it.

---

## 7. Evidence, and what may not be published

**Every factual claim must be checkable against something.** The repositories,
the live site, the commit history. Before publishing a number or a date, verify
it — a post arguing that this work is rigorous cannot afford a wrong figure in
it, and the audience most likely to check is the one least inclined to be kind.

Where a claim is the author's own testimony rather than a documented fact, write
it as testimony. "I went back through the access architecture repeatedly" is
honest; "LEGATUS passed three independent security audits" is a different and
much stronger claim that must not be made unless it happened.

### Never publish

- Secrets, keys, tokens, connection strings, or environment values. **Do not go
  looking for them either** — when mining repositories, read commit messages and
  READMEs, not diffs. Diffs are where accidentally-committed secrets live.
- Phone numbers, personal email addresses, home addresses — the author's or
  anyone else's. `AEO_PLAYBOOK` §8 covers the standing rule on the phone number.
- The client name behind the banking work. The repository and source folder both
  carry it; the site never does. `PROJECT_BIBLE` §3.
- Internal architecture of anything marked **Stealth** on `/projects`. ROASmind
  may be named, and the experience of building it described, but not how it
  works.
- Names of colleagues, employers or friends in personal posts, and nothing that
  identifies a workplace.

> **When in doubt, ask before publishing.** This is a standing instruction from
> Suman, not a suggestion. Anything that might be sensitive gets raised as a
> question rather than resolved by judgement.

---

## 8. The popularity block

Five factors, each 0–20, summed into `popularityScore`. It is an **editorial
forecast, not a measurement** — nothing on this site counts readers yet, which is
why the badge reads "Editor's pick · most popular" rather than "Most read".

| Factor | Scores high when |
|---|---|
| `searchDemand` | Many people hit this problem or ask this question |
| `evergreen` | It stays true — a specification, not a version |
| `painIntensity` | It hurts, and it fails silently |
| `gapInCoverage` | Nobody has written it well already |
| `shareability` | Someone would send it to a colleague |

Write a comment above the block justifying the scores. The numbers exist to be
argued with, and an opaque score invites nothing but agreement.

---

## 9. Before calling a post done

**Run the ship checklist in `WRITING_HUMAN_VOICE.md` §6 and the one in
`WRITING_INFORMATION_GAIN.md` §10 first.** Failing more than two items in
either means another pass, not a publish. The three that this repo has actually
got wrong, in order of how easy they are to miss:

- [ ] **Every `h2` is a complete thought, not a withheld fragment.** Read the
      headings alone, in sequence. If they read as a list of teasers rather than
      an outline of the argument, rewrite all of them.
- [ ] **The piece establishes what the field already says before saying what it
      knows.** A reader who has read three other articles on the topic must
      learn something in the first section.
- [ ] **Nothing here could be written about a different topic by swapping two
      nouns.** This is the one rule the other rules are versions of.

Then the mechanical checks:

```bash
npx tsc --noEmit
```

```bash
npm run build
```

- The post renders at `/notebook/<slug>` and appears on `/notebook`.
- Its category archive lists it.
- `/sitemap.xml`, `/notebook/rss.xml` and `/llms.txt` all include it — they
  derive from the registry, so if one is missing, step 2 was skipped.
- `node scripts/build-route-dates.mjs` has been run.
- No FAQ question collides with `lib/faqs.ts` or `lib/page-faqs.ts`.
- Every internal link in the body resolves. A link in a post to a page that does
  not exist is worse than no link.
