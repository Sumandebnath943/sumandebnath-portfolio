# AEO / GEO — the standing reference

Everything this site does to be found, quoted and cited by answer engines
(ChatGPT, Claude, Perplexity, Gemini, Copilot, AI Overviews) as well as by
classic search: what is in place, what the rules are, what is left to do, and
what was deliberately **not** done.

Read **§1 before proposing any "SEO work".** The single most common way to waste
effort here is to optimise the wrong half of the problem.

Companion documents: `PROJECT_BIBLE.md` (how the system is built),
`PAGE_OPTIMIZATION.md` (performance, measured), `PORTFOLIO_HANDOFF.md` (voice).

---

## 1. What actually decides whether a chatbot mentions you

You cannot force it. Three things decide it, and they are not equally weighted
by the effort available to us:

| Lever | State | Where the ceiling is |
|---|---|---|
| **Be crawlable** | Solved | Nothing left to win here |
| **Be the most extractable answer** | Largely done, §3 | Real gains, all on-site |
| **Be corroborated off-site** | **Not started** | Most of the remaining ceiling |

The third is the one that matters most and the one no amount of code changes
here can deliver. A model naming a person is doing entity resolution across
independent sources; a single well-marked-up site is one source. §6 is the list,
and it is work only Suman can do.

**Do not promise ranking outcomes.** Everything below improves the odds of being
retrieved and quoted. None of it is deterministic, and anyone claiming otherwise
about answer engines is guessing.

---

## 2. Crawl access — done, do not fiddle

`app/robots.ts` explicitly allows **~30 agents** in five groups: classic search,
AI training crawlers, AI retrieval fetchers (which honour separate rules from
the trainers — allowing one does nothing for the other), and link unfurlers.

Two decisions recorded so they are not undone:

- **No `host:` directive.** Google and Bing never implemented it; Yandex
  deprecated it in March 2021 in favour of 301s and the `Host` header. It was
  present and doing nothing.
- **`/desk-4f7a` is not listed as a `Disallow`.** `proxy.ts` already serves it
  `X-Robots-Tag: noindex, nofollow, noarchive`, which is the stronger signal,
  and naming the admin path in a world-readable file advertises it to exactly
  the people it is hidden from.

Discovery links live in `app/layout.tsx` as bare `<link>` elements — React 19
hoists them into `<head>`. They are **not** in `metadata.alternates`, because
almost every page sets its own `alternates.canonical` and Next replaces that
object wholesale rather than merging, which would silently drop them on ~20
routes.

---

## 3. Being extractable — the on-site pattern

Answer engines match a **question** against headings, then lift the first
**self-contained** block that answers it. Narrative prose loses on both counts.
Three mechanisms implement this:

### 3.1 `lib/page-faqs.ts` + `components/ui/PageFaq.tsx`

Per-route questions and answers, rendered visibly **and** emitted as `FAQPage`
structured data keyed to `<url>#faq`. Mounted at the foot of each product page,
directly above the related rail.

Rules for writing one are at the top of `lib/page-faqs.ts`. The important ones:
the answer must name its subject in the first clause (never a pronoun pointing
back at the question), must be two to four sentences, and must be literally
true — this is the copy most likely to be repeated by a machine that cannot
check it.

> **The one hard constraint: no question may duplicate one in `lib/faqs.ts`.**
> The same question answered differently on two URLs is a content collision;
> Google picks one and discounts the other. `/faq` answers questions about *the
> person*; `lib/page-faqs.ts` answers questions about *a specific page*.

> **FAQ markup must have a visible counterpart.** `/banking/rm-copilot` carried
> a hand-rolled `FAQPage` block with no visible copy anywhere on the page — at
> best ignored, at worst read as cloaking. That content now lives in
> `lib/page-faqs.ts` and renders. Do not reintroduce markup-only FAQs.

Both `PageFaq` and `RelatedPages` take a `variant` — see §5.3. They stack
directly on top of each other above the footer, so they must always be passed the
same one.

### 3.2 The notebook's answer block

Every post in `lib/notebook/posts/` carries an `answer` field of 40–60 words,
rendered directly under the H1 as `.nb-answer` and named in the post's
`speakable` specification. That placement is the design: a model reading for an
answer takes the first self-contained block after the heading, and a post that
opens with narrative gives it nothing.

Post titles are **question-shaped or claim-shaped, never noun phrases**. "Why
does position: sticky silently stop working?" is matchable; "Sticky positioning
notes" is not.

> **`/notebook` is a paper page, and that is not negotiable.** The first version
> was near-black, reasoned from "the posts are mostly code and code reads better
> dark". That optimised for the wrong thing — this is the one page on the site
> somebody sits and *reads* at length, and a long-form reading surface wants
> paper. It shares `.rz`'s palette so the blog belongs to this site rather than
> looking imported. Code blocks stay dark **inside** it, which is where the
> contrast earns its keep.

### 3.3 Facts as structure, not prose

Numbers buried in a paragraph get skipped; the same numbers in a labelled row
get quoted. Notebook posts use the `facts` field; product pages should keep
their specifics — 47M parameters, 299K pairs, ~87% exact-match, 46 agents, 38
security tests — in tables and definition lists rather than sentences.

---

## 4. Generated, not hand-maintained

`/llms.txt` is `app/llms.txt/route.ts`, derived from `lib/pages`, `lib/projects`,
`lib/archive-projects`, `lib/resume`, `lib/faqs` and the notebook registry.

It used to be a static file, and it had drifted: it described `/learnings` as
"the engineering notebook behind the builds", which describes a page that did
not then exist (`/learnings` is the credentials and skill map; the notebook is
`/notebook`). It omitted `/journey` entirely. It carried two different "current
as of" dates. Every one of those is the same failure — a summary of the site
maintained separately from the site.

The same reasoning covers `lib/route-dates.ts`, generated from git history by
`scripts/build-route-dates.mjs`. The sitemap previously stamped one hardcoded
constant onto all 27 URLs; a sitemap claiming every page changed on the same day
carries no information, and a hand-maintained date is one nobody remembers to
bump.

**`public/llms-full.txt` is still hand-written**, deliberately — it is long-form
biography that generation would flatten. It is the one file here that can still
drift. Check it when the résumé or the product list changes.

---

## 5. Internal linking

Before this work, **nine of eleven product pages had no in-content link to
anywhere else on the site**, and `/journey` was in the sitemap and in no menu at
all.

### 5.1 The footer is `components/sections/Contact.tsx`

**Read this before adding anything that closes a page.** The site's footer is
the Contact section — the themed closing panel, the four-column sitemap, and the
white strip carrying FAQ/Privacy/Terms, the copyright and the visit-data
disclosure. All of it, one component.

> **A second footer was built and removed.** `components/layout/SiteFooter.tsx`
> mounted a parallel link map from the root layout, which put a third block
> underneath the real footer on every page, with duplicate links. The footer is a
> **page-level** component precisely because it is themed per page
> (`closingBg`, `glowColor`, `hazeColor`, `variant`) and a layout cannot know
> which palette a route wants. Do not mount a footer from `app/layout.tsx`.

The footer sitemap (`FOOTER_GROUPS` in that file) is **four columns of four,
hand-picked** — not derived from `lib/pages.ts`. Deriving it produces a wall of
every page on the site, which is what the first version was. A new product page
does not automatically belong there; ask whether it earns a permanent slot on
every page ahead of something already listed.

> The utility row below it is **capped at three links** by a hard layout
> constraint recorded in its own comment — a fourth reintroduces a wrap on
> phones. New footer links go in the sitemap row, never that one.

### 5.2 The Related block

`components/ui/RelatedPages.tsx`, driven by the `RELATED` graph in
`lib/pages.ts`: **three** curated links at the foot of every page, above the
footer. Curated, not computed — a rail generated from tag overlap produces links
that are technically adjacent and editorially meaningless.

**Three, not sixteen.** This block answers "having read *this* page, what next".
The site index is the footer sitemap's job. Resist growing it.

Plus **in-prose links** via the `[label](href)` inline subset in notebook posts.

### 5.3 Palette — nothing is uniformly dark

`RelatedPages` and `PageFaq` both take `variant`: `dark` for the near-black
pages, `paper` for the light family (`/notebook`, `/profile`, `/contact`,
`/journey`, `/learnings`). `Contact` has its own `variant="light"`. **Match the
block to what precedes it, not to the page's opening** — `/resume` starts on
paper and turns dark for its second half, so its Related block is `dark`.

> **A `paper` variant must paint its own background.** The first attempt made it
> transparent on the theory that it would inherit the page's paper. It is a
> sibling of `<main>`, and it is `<main>` that paints the paper — so it inherited
> `body`, which is `#050505` on every page on this site, and rendered ink-dark
> text onto near-black.

> **Cream-on-dark below ~0.5 alpha fails AA.** `resume.css` records this for its
> own text and the footer sitemap headings hit it too. Do not go below `/55` for
> small uppercase labels on the dark register.

---

## 6. Off-site — the part that is not code

**This is where the remaining ceiling is.** Entity resolution across independent
sources is what makes a model confident enough to name a specific person,
especially when more than one person shares the name — and one of the other
Suman Debnaths is considerably better indexed.

Ordered by expected value:

1. **Wikidata entry.** The single highest-leverage item. Wikidata is ingested by
   effectively every knowledge graph and several retrieval pipelines. Needs
   independent sources to survive notability review — the HuggingFace model
   cards and GitHub repos are the strongest available.
2. **GitHub profile README matching the site bio verbatim.** Same wording, same
   role, same disambiguation sentence. Consistency across sources *is* the
   signal; paraphrase weakens it.
3. **HuggingFace model cards for PentaCMD-47M and Qdex-1.5B**, each linking back
   to its page here. These are genuinely uncommon artefacts — a from-scratch 47M
   model with a published eval number is the kind of thing that gets cited.
4. **Cross-post notebook entries** to dev.to / Hashnode **with `rel=canonical`
   pointing back here.** The posts in `lib/notebook/` are original, dated,
   specific technical content on problems that are poorly documented elsewhere —
   the highest-citation-probability material on the site.
5. **LinkedIn headline and About section matching the site**, including the
   disambiguation.
6. **Answer the same questions where they are asked** — Stack Overflow, Reddit,
   the Next.js discussions — linking back only where genuinely relevant.

### The disambiguation sentence, to be used verbatim everywhere

> Suman Debnath — Senior Brand Marketing Manager and AI-native product builder,
> based between Pune and Kolkata, India. Creator of ROASmind, IMPRINT, LEGATUS,
> CITE, EMBER and D-PE.ai, and of the PentaCMD-47M language model. Not the Suman
> Debnath who is a Principal Developer Advocate at AWS.

---

## 7. The target query set

**This is the missing artefact and it should be written before any further AEO
work.** Without it, "more robust" has no test and no stopping condition.

Twenty to thirty prompts that Suman wants to be the answer to, split three ways:

- **Identity** — "who is Suman Debnath the AI product builder", "brand marketer
  who became an AI engineer"
- **Capability** — "marketer who can build AI products", "AI generalist India",
  "AI product manager without a CS degree"
- **Technical** — "small language model for terminal commands", "train a 47M
  parameter model from scratch", "position sticky not working overflow hidden",
  "Next.js 16 middleware replacement"

The technical set is the winnable one: it is specific, low-competition, and
already backed by real published artefacts. The identity set is the one that
matters commercially and depends almost entirely on §6.

Re-run the set quarterly across ChatGPT, Perplexity and Gemini, and record the
answers verbatim. **Do not trust a single run** — answer engines are
non-deterministic in the same way PSI scores are (see `PAGE_OPTIMIZATION.md`
§1.1), and one favourable response is not evidence of anything.

---

## 8. Considered and refused

- **MDX for the notebook.** `AGENTS.md` opens by warning that this Next.js
  differs from training data; `@next/mdx` is exactly where that bites. Typed
  blocks in `lib/notebook/posts/` also fail `tsc` when a post is malformed,
  which MDX would not.
- **Tuning `priority` and `changeFrequency` in the sitemap.** Google has stated
  publicly that it ignores both. They are kept for Bing, Yandex and some AI
  crawlers, and are not worth further attention.
- **A `Disallow` for the admin path.** See §2.
- **Keyword-stuffing the `keywords` metadata further.** It is already long and
  no major engine has used the meta keywords tag for ranking in over a decade.
  It costs nothing and gains nothing; leave it.
- **A build-stamped "last updated" in `/llms.txt`.** It would advance on every
  deploy and claim freshness the content does not have. It reads real content
  dates instead.
