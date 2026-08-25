# Writing for the notebook

Everything needed to add a post to `/notebook` without breaking the things that
already work. Read this before writing one.

Companion documents: `AEO_PLAYBOOK.md` (why any of this is shaped the way it is),
`PORTFOLIO_HANDOFF.md` (how the rest of the site writes), `PROJECT_BIBLE.md`
(how the system is built).

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

Both registers are in use and both are fine:

- **Question** — "Why is my JSON-LD missing from the HTML in Next.js?"
- **Claim** — "I spend a fifth of every project before I write the first prompt"

Prefer the question form when the post answers a thing people literally search
for. Prefer the claim form when the post's value is the argument rather than the
lookup. Put the searchable keyword in the **slug** either way, so the title is
free to be a hook.

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

`AEO` · `AI-Native` · `Career` · `Colour` · `CSS` · `Debugging` · `Design` ·
`Documentation` · `Engineering` · `Layout` · `Marketing` · `Migration` ·
`Next.js` · `Process` · `Prompting` · `React` · `Routing` · `Security` · `SEO` ·
`StrictMode` · `Structured Data` · `three.js` · `WebGL`

> Keep this list current. A tag added to a post and not added here is how the
> vocabulary quietly doubles — the next writer greps the posts, sees a near-miss
> synonym, and invents a second one for the same idea.

Two to four per post. A tag used once is not a tag, it is a note.

---

## 6. Voice — how not to read as machine-written

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
