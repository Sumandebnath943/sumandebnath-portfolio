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

### 3.1b Entity queries — one question, one URL

There are several Suman Debnaths and one of them, a Principal Developer Advocate
at AWS, is far better indexed. An engine answering a "who is / what is he known
for" question picks the entity it can resolve most confidently, so the site has
to give it something that lexically matches the query. Until 25 Aug 2026 no page
was titled or headed for any of these, which is why ChatGPT — crawling and
indexing this domain in-house — resolved him and the assistants working from
third-party indexes did not.

Each entity query is now owned by exactly one page, which carries it in the
title, in an `h1`, in a 40–60 word answer as the first block after the heading,
and in a `QAPage` node:

| Query | Page | h1 carries it |
|---|---|---|
| Who is Suman Debnath? | `/about` | yes |
| What is Suman Debnath known for? | `/profile` | yes, `sr-only` |
| What is Suman Debnath's experience? | `/resume` | **no — see below** |
| What has Suman Debnath built? | `/projects` | yes |
| What does Suman Debnath do? | `/faq` | no |

> **`/resume` keeps its name as the h1 on purpose.** "Suman Debnath" is the
> correct heading for a résumé document and already a strong entity signal;
> replacing it with a question to match the other pages would be consistency for
> its own sake. The title carries the query, the answer block carries the
> quotable summary, and the `QAPage` node carries the markup. Consistency of
> *system* is the goal — identical treatment is not.

> **`/resume` also keeps the word "Résumé" in its title.** That page was already
> the site's strongest match for "Suman Debnath resume", a real query with real
> intent. The question is front-loaded because Google truncates near sixty
> characters; the résumé keyword follows rather than being traded away.

> **Never let two pages claim one question.** `/faq` used to answer "Who is
> Suman Debnath?" and gave it up when `/about` took the title — two URLs
> answering identical words is the collision documented at the bottom of
> `lib/faqs.ts`, and Google resolves it by discounting one of them. Before
> retitling any page for a query, grep both FAQ files and the `QAPage` nodes.

> **The answer block is not the same as the standfirst.** A standfirst is
> written to open a page; an answer is written to survive being quoted with no
> page around it. `/profile` keeps both, deliberately — the h2 underneath is a
> good line that would read as nonsense on its own.

Disambiguation is **visible prose on `/about`**, not only the
`disambiguatingDescription` attribute. An engine choosing between two people
with one name has to read the distinction somewhere a human could read it too,
and the attribute alone has never been enough against a better-indexed namesake.

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

### 3.4 The blog index

`/notebook` is a blog front page: a curated "Start here" rail, a category
filter, a tag filter, sort, reset, a lead card and a grid — all in
`components/notebook/NotebookBrowser.tsx`.

**Filtering is client-side over a complete list, and that is an SEO decision.**
Every post is passed in and rendered from one array, so the server HTML contains
every card with its title, category, date and standfirst before any filter runs.
Query-string routes (`?category=react`) would split the index's link equity
across variants showing subsets of the same content. When the archive outgrows
this, the answer is real `/notebook/category/<slug>` routes with their own
metadata — not query strings.

**Categories are a closed list; tags are open.** `CATEGORIES` in
`lib/notebook/types.ts` is the filter bar. A blog that lets categories grow
freely ends up with twenty of them, one post each.

> **Nothing is labelled "popular".** The curated rail is `pick`, shown as "Start
> here". Nothing on this site measures readership, and calling an editorial
> choice popularity is a lie to the reader. Real popularity is available in
> principle — page views already go to Neon for `/desk-4f7a` — but it would make
> the index dynamic and is only worth it once the ranking would mean something.

**Covers** are real images when a post sets `cover`, and deterministic generated
SVG art otherwise (`components/notebook/PostCover.tsx`), tinted per category and
seeded from the slug. Deterministic matters: a random pattern would change on
every deploy and make a familiar card unfamiliar.

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

### 5.4 Breadcrumbs

`components/ui/Breadcrumbs.tsx` emits the visible trail **and** the
`BreadcrumbList` JSON-LD from one array. Mounted on every route except `/`,
where a trail reading only "Home" would be noise.

They are not a ranking factor in themselves. What they do is replace the URL in
a Google result with a readable hierarchy, give every page a second
differently-worded link to its parent, and tell an answer engine where a page
sits in the site rather than treating every URL as free-floating.

> **Both halves must come from the same component.** Before this, fourteen pages
> had `BreadcrumbList` markup and exactly two had a visible trail. Google's
> guidance requires the markup to describe a trail the reader can actually see;
> the two drifting apart is precisely what happens when they are written in
> different places.

> **A crumb must never lead to a 404.** `/agents`, `/apps`, `/slms`, `/llms`,
> `/games` and `/banking` are menu groupings with no route behind them. Pass
> `href: null` for those — the component renders them as plain text and omits
> `item` from the schema. One dossier crumb was also pointing at `/#projects`, a
> homepage anchor, which told crawlers the page sat under the homepage.

### 5.5 Measured balance

Run the link audit before and after changing the `RELATED` graph. As of
25 Aug 2026:

| | Before | After |
|---|---|---|
| Max inbound to one page | 11 (`/projects`) | 5 |
| Min inbound (content page) | 1 | 2 |
| Gini coefficient | 0.350 | 0.184 |

`/` shows 0 inbound in that graph and that is not a problem — every page links
home through the logo and the footer. `/privacy` and `/terms` sit at 1 on
purpose; pumping link equity into legal pages is wasted.

> **The real remaining bias is not in this graph.** The twelve pages listed in
> the footer sitemap receive an inbound link from all 26 routes. The eight
> product pages *not* listed there — Pentashell, PACT Agent, Qdex-1.5B, AEGIS
> VAULT, the MIGI Android app, Forget Anything?, PixelVille and Fun Apps — have
> only the nav and their Related entries. That is a deliberate editorial choice
> about what earns a permanent slot, not an oversight, but it is the thing to
> revisit if one of those pages needs to rank.

---

## 5.6 Which index each assistant actually queries

**Measured 25 Aug 2026.** ChatGPT names Suman prominently for "who is Suman
Debnath", from multiple devices in temporary-chat mode, and the beacon confirms
OpenAI agent arrivals. Claude, Gemini and Grok do not.

That gap is not a crawlability problem — nothing on this site blocks any of
them, and `proxy.ts` only logs crawlers, it never gates them. It is a question
of **whose index each assistant answers from**:

| Assistant | Answers from | What it needs |
|---|---|---|
| **ChatGPT** | OpenAI's own crawler + own index | Nothing — this loop is closed and working |
| **Claude** | Brave's index | Presence in Brave: inbound links and time |
| **Gemini** | Google's index | Search Console verification + indexing |
| **Copilot** | Bing's index | Bing Webmaster + IndexNow |
| **Grok** | X, plus a web index | Posts on X linking the site |

OpenAI is the only one of the five that both crawls and indexes in-house, which
is exactly why on-site work paid off there first and fastest. For the others the
site can be perfect and still be uncitable, because the assistant never sees it.

> **Being crawled is not being indexed.** The beacon proves a bot fetched a
> page. It says nothing about whether that page entered any index. Those are
> different questions and only the second one decides whether an assistant can
> cite you.

### What was wrong on this side

`Claude-User` — the agent that fetches when somebody asks Claude about a page —
matched **nothing** in `lib/crawler.ts`: not the Anthropic pattern, and not the
generic one either, since the string contains no "bot", "crawler" or "fetcher".
It returned `null`, so no row and no alert. Every Claude-User visit this site
ever had was silently discarded, which is why there was no evidence either way.

Detection is now per-agent rather than per-company, because
`ClaudeBot` (training), `Claude-SearchBot` (indexing) and `Claude-User` (live
fetch) mean three completely different things and collapsing them to "Anthropic"
throws away the only information the alert carries.

### The push channel

`scripts/indexnow.mjs` submits every sitemap URL to IndexNow, which Bing,
Yandex, Seznam and Naver share. Bing is the one that feeds Copilot and
DuckDuckGo. **Google, Brave and xAI do not participate** — Google deprecated its
equivalent for everything but job postings and livestreams.

Run it after a deploy that adds or changes pages, never on a schedule:
resubmitting unchanged URLs is discouraged by the protocol and can get the key
rate-limited.

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
- **The phone number in any machine-readable surface.** Removed 25 Aug 2026 from
  `public/llms-full.txt`, the root layout's `Person` node (which put it on
  *every page*) and the `ContactPoint` on `/contact`. It is still visible and
  tappable on `/contact` and `/resume`, which is the point: a human who wants to
  call can, while it is no longer handed to anything parsing schema in bulk.
  Email is the channel that scales and can be filtered. **Do not add it back for
  schema "completeness"** — `telephone` is an optional property and its absence
  costs nothing.
