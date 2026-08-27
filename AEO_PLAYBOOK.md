# AEO / GEO — the standing reference

Everything this site does to be found, quoted and cited by answer engines
(ChatGPT, Claude, Perplexity, Gemini, Copilot, AI Overviews) as well as by
classic search: what is in place, what the rules are, what is left to do, and
what was deliberately **not** done.

Read **§1 before proposing any "SEO work".** The single most common way to waste
effort here is to optimise the wrong half of the problem.

**Arrived with an audit report in hand? Read §9 and §10 first.** Four have
already been run against this site — Vercel's Is Agentic (§9), then Bing
Webmaster, isitagentready.com and geometrics.app (§10). Most of their findings
are already answered here, and the ones left open were left open on purpose.
**§10 in particular records nine "fixes" that were refused because they describe
a public API this site does not have.**

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

### 2.1 Content Signals — and why this site says `ai-train=yes`

`robots.ts` emits `Content-Signal: ai-train=yes, search=yes, ai-input=yes` in
the `*` group. Added 27 Aug 2026, decided by Suman with the argument below on
the table.

**Every scanner that asks for this directive suggests `ai-train=no` as the
default.** That is the wrong call here, and the reasoning is worth keeping
because the question will be asked again:

- **Training is the durable half.** A model that has been trained on this site
  can name Suman *without running a search*. Retrieval only fires when a
  question happens to trigger one. §6 is a fight to be the Suman Debnath a model
  produces from memory, against four better-indexed namesakes — and that is a
  training outcome, not a retrieval one.
- **The content is the advertisement, not the product.** `ai-train=no` protects
  a publisher whose content *is* revenue. Nothing here is sold. Being absorbed
  is the goal.
- **It would not retract anything.** GPTBot has been crawling this domain for
  months and ChatGPT is the one assistant that currently cites it (§5.6).
  Declining training now forfeits future models and recovers nothing from
  existing ones.
- **The separation is not as clean as the directive implies.** Blocking
  `Google-Extended` leaves Google Search and AI Overviews untouched but removes
  the site from grounding in the Gemini app — one of the engines §5.6 records as
  not citing him yet. That is a door being shut, not held open.

> **This is a declaration, not an access control.** `Allow: /` is what grants
> access; `Content-Signal` states the intent behind it. Unlike `Disallow:`,
> which crawlers obey, this is a stated preference with no enforcement — anyone
> ignoring robots.txt ignores this too. It costs one line and it is worth
> exactly that much.

**Revisit if, and only if, Suman starts selling content** — a paid course, a
newsletter, licensed writing. Then the calculus inverts and the directive
becomes worth its enforcement gap.

The `other` field on a robots rule is this Next version's escape hatch for
non-standard per-agent directives, passed through verbatim. It is **not** in
most training data — the assumption that `MetadataRoute.Robots` could only
express the standard fields is wrong here, and cost a wasted plan to rewrite
`robots.ts` as a route handler before `AGENTS.md`'s opening instruction was
followed and the type checked.

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

### 3.1c The title budget — count the suffix

`app/layout.tsx` sets `title.template` to `"%s · Suman Debnath"`. **That appends
sixteen characters to every page title that does not use `title.absolute`.**

Nobody counted it. `SEO_AUDIT.md` §5 trimmed twenty-six notebook titles to "no
meta title over 60 characters" and measured the *page's own* string, so the
articles shipped at 74. Bing's crawl on 27 Aug 2026 flagged **fifteen URLs**,
and the suffix was the entire cause on nine of them.

> **The budget is 44 characters of your own text.** 44 + 16 = 60, which is
> roughly where Google truncates. Bing warns past 65.

Six pages were rewritten on 27 Aug — the three past 100 and the three in the
eighties:

| Page | Was | Now |
|---|---|---|
| `/slms/pentacmd` | 114 | 65 |
| `/llms/qdex-1.5b` | 110 | 63 |
| `/agents/migi` | 106 | 54 |
| `/banking/rm-copilot` | 85 | 63 |
| `/projects/aegis-vault` | 85 | 60 |
| `/projects/geek-collectibles` | 82 | 63 |

**What came out was always the parenthetical.** `(bash · git · npm · python ·
PowerShell)`, `(GGUF · CPU)`, `(Next.js + Supabase)` — none of it survived
truncation anyway, and every one of those keywords is still in the page's
description and its visible copy. A title cannot carry a specification list.

> **`/about`, `/profile` and `/contact` were left long on purpose.** They run
> 76–82 and they use `title.absolute`, so the suffix is not on them — their
> length is the entity query itself (§3.1b), which is the one thing worth
> spending the characters on. Do not trim these to clear a warning.

> **`/projects/cite` and `/projects/roasmind` were left at 75 and 71.** They are
> outside the agreed scope, not overlooked. Both are fixed the same way if they
> ever matter: set `metaTitle` in `lib/projects.ts`.

For dossier pages the title is `${name} — ${positioning}`, and **`positioning`
is visible copy** — a full sentence with a full stop, rendered on the page and
in the projects index. Never shorten it to fix a title; set the optional
`metaTitle` beside it instead. Same split as `metaTitle` on notebook posts, and
for the same reason: the H1 and the search result want different words.

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

**Rewritten 26 Aug 2026.** The index was one client component holding every card
so it could filter them. At twenty-six articles that stopped being the right
shape, and the paragraph this replaces predicted exactly how it would be fixed:
real routes, never query strings. It was.

**Four surfaces, each with one job.** The overlap between them is deliberate and
is recorded at the top of `app/notebook/all/page.tsx` so it does not later read
as accidental duplication:

| Route | Job |
|---|---|
| `/notebook` | The front page. Editorial, curated, **no controls** |
| `/notebook/all` | Everything, filterable by category and tag, sortable |
| `/notebook/category/<slug>` | One category — the canonical, linkable address for a subset |
| `/notebook/page/<n>` | The paginated archive, from page two. Crawl depth |

The front page is composed by `magazine()` in `lib/notebook/index.ts` rather than
in the template, so the arithmetic is inspectable. **Recomposed 26 Aug 2026 into
five zones** — architecture in `PROJECT_BIBLE.md` §6.8 — and the budget adds up
in public: `1 + 3 + 5 + 4 + 2 + 4 = 19` curated, 7 left for the archive.
**Every zone draws from one pool and marks what it took, so no article appears
twice**, with one deliberate exception noted in §6.8.

The AEO-relevant consequence: **all 26 articles are now linked from
`/notebook`** — 38 links, of which 12 are the sections directory re-listing
what other zones used. Before the rebuild the front page reached about sixteen.
Crawl depth to any article from the site root is now two.

#### 3.4a `?tag=` — the one query string, and why it is allowed

Article tags moved to the foot of the reading page and became links to
`/notebook/all?tag=<tag>`. That looks like it contradicts "real routes, never
query strings" above, and it does not, for three reasons:

1. **It is not a view anybody links to or indexes.** `/notebook/all` carries
   `alternates.canonical: "/notebook/all"`, so every `?tag=` variant
   self-canonicalises to one URL. No link equity splits.
2. **The durable per-subset addresses still exist** —
   `/notebook/category/<slug>` — and are what the front page and the rail link
   to. The parameter only seeds an interactive control.
3. **It costs nothing server-side.** The value is read from `window` through
   `useSyncExternalStore`, **not** `useSearchParams` — that hook forces a
   statically rendered route to client-render its Suspense subtree, which would
   have pulled all twenty-six articles out of the prerendered HTML and broken
   exactly the guarantee the box below makes.

Unknown tags are checked against the real vocabulary and ignored, so
`?tag=<anything>` cannot render a stranger's text onto the page.

> **Why the filter is not on the front page.** That page's archive section holds
> only what the rails did not use — ten articles of twenty-six. A filter there
> would search a tenth of the notebook and report "no results" for a category
> with seven, which is worse than no filter. `/notebook/all` is where the pool is
> genuinely everything, and every article is server-rendered into it before any
> filtering runs — so a crawler with no JavaScript still sees the complete
> archive rather than an empty shell with controls.

> **Page one is `/notebook`, and there is deliberately no `/notebook/page/1`.**
> Two addresses for one page is the duplicate the whole scheme exists to avoid.
> Pagination activates on its own once the archive exceeds `POSTS_PER_PAGE`; at
> twenty-six articles it has not, and `/notebook/page/2` returns 404 rather than
> rendering an empty grid.

**Sorting needed fixing before any of it worked.** Twenty-four of the twenty-six
articles share a publication date, so sorting by date alone left almost the whole
archive falling through to the order `POSTS` happened to be typed in — an
arbitrary sequence presented to the reader as "newest first". `popularityScore`
now breaks the tie: already the site's editorial ranking, already labelled a
forecast rather than traffic, and stable across builds.

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

### 3.5 Structured data — and the trap that made most of it invisible

> **Every JSON-LD block on this site must be a plain
> `<script type="application/ld+json">`. Never `next/script`.**

`<Script strategy="beforeInteractive">` **does not emit a script element.** It
serialises the payload into a `self.__next_s` push and lets the client bundle
build the real tag once React runs. The `Person` and `WebSite` nodes in
`app/layout.tsx` were written that way, so the site's entire identity —
`jobTitle`, `sameAs`, the disambiguation, every credential, on all 26 routes —
existed only for a reader that executes JavaScript. The static HTML of `/`
carried exactly one literal block: the `ProfilePage` node in `app/page.tsx`,
whose `mainEntity` pointed at a `#person` that was not in the document.

This was not theoretical. Vercel's Is Agentic audit (§9) read `/` and reported
the ProfilePage as the site's identity block with no name and no description,
because it was the only one it could see. Fixed in `a6afb57`.

> **JSON-LD is inert data.** Nothing reads it at runtime, so it never needed to
> race the bundle. `beforeInteractive` bought nothing and cost everything. Every
> other node on the site — `/about`, `/profile`, `/resume`, `Breadcrumbs`,
> `PageFaq` — was already a plain tag. The root layout was the one exception and
> it was the one that mattered most.

**The graph, and how it joins.** Three nodes come from the root layout and are
therefore on every route; the rest are per-page.

| Node | `@id` | Emitted by |
|---|---|---|
| `Person` | `<site>/#person` | `app/layout.tsx` |
| `WebSite` | `<site>/#website` | `app/layout.tsx` |
| `Organization` | `houseofnamus.com/#organization` | `app/layout.tsx` |
| `ProfilePage` | `<url>#profilepage` | the page |
| `QAPage`, `FAQPage`, `BreadcrumbList` | `<url>#…` | the page / component |

> **Two nodes sharing one `@id` merge — that is the point, not a duplicate.**
> `/contact` emits a second `Person` carrying only `contactPoint`, which joins
> the layout's node by `@id`. Do not "fix" it into one object; the page owns the
> contact channel and the layout owns the identity.

**`ProfilePage` repeats `name` and `description` rather than inheriting them
through `mainEntity`.** A parser that resolves `@id` references gets the Person
either way; one that reads a single node and stops — which is what most identity
extractors do — got nothing. Two properties is a cheap price for not depending on
the reader dereferencing anything. Both strings come from `lib/projects.ts`, so
the node and the page's own `<title>` cannot disagree.

### 3.6 The Organization node, and the three universities

`House of Namus` is a real company on its own live domain, founded by Suman
(confirmed by him, 25 Aug 2026) and already credited in visible copy on
`/agents/pact-agent`. Its node carries `name`, `url`, `description`,
`contactPoint`, `address` and `founder` → `#person`.

It earns its place under §3.1b rather than merely satisfying an audit: entity
resolution against a better-indexed namesake is won by corroboration, and a
second entity that independently names him is worth more than another adjective
on the Person node.

Three things about it are deliberate:

- **The `@id` is anchored at `houseofnamus.com`, not this subdomain.** The
  company's identity belongs to the company's own domain; this portfolio
  describes it, it does not host it.
- **`founder` is the only relationship asserted.** `Person.worksFor` still says
  Pune Institute of Business Management, because that is his employer. Founding
  one company and being employed at another are not in conflict and nothing
  should imply they are.
- **No `telephone`, and no street address.** The first is §8. The second because
  the site has never claimed a registered office and this node does not invent
  one — `address` mirrors the two locality-level `PostalAddress` objects the
  Person already carries. A real registered address is a fact only Suman can
  supply.

> **Never add `contactPoint` or `address` to the universities.** The audit
> reported "Organization schema found but missing: contactPoint, address", and
> the Organizations it had found were West Bengal State University, PIBM and
> Great Lakes in `hasCredential[].recognizedBy`, plus PIBM again in `worksFor` —
> every one a third party. This site does not speak for any of them, and
> publishing a machine-readable address for an institution on its behalf is
> fabricated data with this domain's name on it. Stripping the nodes to dodge
> the check is equally wrong: they are legitimate credential data. The honest
> answer was to add a real Organization, and it cleared the check on its own.

### 3.6b Skills live in five places, and they must agree

Added 27 Aug 2026, when the homepage began claiming AEO, GEO and agentic
readiness and nothing else on the site had heard of them.

A claim of expertise on one page is a claim an assistant cannot verify. These
five are where the site *declares* what Suman knows, and a new discipline has to
land in all of them or the answer depends on which surface got read:

| Surface | Why it counts |
|---|---|
| `app/layout.tsx` → `knowsAbout` | The `Person` JSON-LD, on **every route**. The machine-readable one, and the highest-value of the five |
| `lib/resume.ts` → `coreSkills` | Feeds `/resume` **and** the skills block in `lib/systemPrompt.ts`, so it decides what the site's own assistant can say |
| `lib/faqs.ts` → core capabilities | Ships as `FAQPage` structured data |
| `components/sections/SystemsStack.tsx` | The homepage capability stack |
| `public/llms-full.txt` | Hand-maintained — no generator, so it needs editing directly |

Two rules learned doing it:

1. **Acronym and expansion in one entry, not one entry each.** Write
   `"AEO (answer engine optimisation)"`. Both forms are worth carrying — people
   type the acronym, models match the phrase — but a separate row per spelling
   is the keyword stuffing that `/notebook/cited-by-chatgpt-what-i-changed`
   records as having produced nothing.
2. **Do not backdate a discipline into a historical role.** `/about`'s career
   paragraphs, the `/resume` summary sentence and `OperationalHistory`'s tags
   are all attached to the 2016–2023 position and were deliberately left alone.
   Adding a 2026 discipline to them would be a false claim about *when*, which
   is exactly the sort of thing an assistant will repeat back with a date on it.

### 3.7 The 404's recovery line — do not ungate it

`app/not-found.tsx` carries one line below the postscript pointing at
`/sitemap.xml` and `/llms.txt`, so a reader that is not a person has a route back.
Two things about it must survive contact with a future edit:

- **Plain `<a>`, not `<Link>`.** Both targets are route handlers, not pages;
  `next/link` would try to client-navigate to them and fail. Everything else on
  that page uses `Link`, so this exception looks exactly like something to tidy.
- **It is gated on `min-height: 760px` and that gate is load-bearing.** Measured
  25 Aug 2026: at 375×667 the postscript's bottom sits at **641.13px** inside a
  667px viewport whose container has 24px of bottom padding — about **2px of
  slack**. The page is `h-[100svh]` + `overflow-hidden`, so anything past that is
  clipped rather than scrolled to, which is the same bug the 40svh → 36svh change
  was made to fix. Content height is roughly `423 + 0.36h`, so the line only has
  room once `h ≳ 716`; 760 leaves a margin rather than a rounding error. It
  paints on every current phone (390×844, 412×915) and stands down on a 667-tall
  SE and the 1280×600 desktop case.

> The gate governs what is **painted**, not what is **served**. The markup is in
> the response at every viewport size, which is what a fetcher reads. Removing
> the gate to "show it everywhere" reintroduces clipping on the smallest phones
> and gains nothing for any agent.

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

### 4.1 "When to use this site" — and the half that makes it credible

The file opens with disambiguation, then answers a question an agent asks before
any of the others: *should I be reading this at all?* Three blocks — **best fit**,
**poor fit**, **how to read it** (the fetch surfaces, and that nothing is gated or
rate-limited).

> **"Poor fit" is the load-bearing half.** A source that never says what it is
> wrong for reads as marketing, and this one declines three things explicitly:
> any other Suman Debnath, general tutorials or reference documentation, and
> anything the site does not state. The last of those repeats the constraint at
> the foot of the file, because it is the one most worth repeating.

It points at "Expertise" and "Citation map" instead of restating them. Those
sections already own the topic list and the URL map; a fourth copy of either is a
fourth thing to keep in sync. Same rule as everything else in §4.

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
especially when several people share the name — and **at least four** other Suman
Debnaths are well indexed, two of them technology people in India.

> **⚠ SUPERSEDED 27 Aug 2026 — the gate below is now half-lifted. Read §6.1
> before acting on it.** The measurement it rests on ("returns nothing") was
> true on 26 August and is false for Google as of 27 August. It remains true
> for the index behind Claude's search. Kept because the *reasoning* still
> governs the Brave half, and because the reversal is the point.
>
> ~~**Get indexed before doing any of this.**~~ Measured 26 Aug 2026: a search
> for `PentaCMD 47M parameter model terminal commands` returns nothing, for a
> page live roughly two months describing an artefact with a name almost nobody
> else uses. That is §5.6's "being crawled is not being indexed", demonstrated.
> A Wikidata entry pointing at pages no index holds is a citation nothing can
> follow. Google Search Console is verified; Bing is not, and Bing Webmaster
> Tools can import the property from Search Console rather than verifying again.
> Submission, verification and the first inbound links come first.

### 6.1 The indexing picture is split, not flat (27 Aug 2026)

**Google has the site. The index behind Claude's search does not.** Both halves
were measured on 27 Aug and they disagree completely, which is why the flat
claim above had to go.

**Google, measured from a signed-out incognito window in Maharashtra, India**,
on `PentaCMD 47M parameter model terminal commands`:

- An **AI Overview** stating 47 million parameters, 299,000 instruction-to-command
  pairs, ~87% exact-match, and correctly naming Pentashell as the CLI. Every
  figure matches the site. Google is not merely holding the page — it is
  synthesising a correct answer from it and citing the domain.
- An **organic result**, plus a sidebar card. Both point at `/`, dated 19 Aug.

> **This is §3.3 paying off — "facts as structure, not prose".** The numbers
> that came back are exactly the ones held in tables and definition lists rather
> than sentences. Nothing else on the site was written to be lifted that cleanly.

**The other index, measured the same day** by an agent's web search tool
(US-only, not Google), four queries:

| Query | Result |
|---|---|
| `PentaCMD 47M parameter model terminal commands` | nothing |
| `LEGATUS immutable digital inheritance Suman Debnath` | nothing |
| `AEGIS VAULT zero-knowledge encrypted notes Suman Debnath` | nothing |
| `"sumandebnath.houseofnamus.com"` — the exact domain | **nothing** |

An exact-string search for the domain itself returning nothing is decisive: this
is absence from the index, not poor ranking within it.

> **Do not overclaim which index that was.** The tool does not name its backend.
> §5.6 records Claude as answering from Brave, so the result is *consistent with*
> the Brave gap rather than proof of it. What it does establish beyond doubt is
> that **at least one major non-Google index holds nothing from this domain at
> all**, eight days after the notebook programme shipped.

**What this changes, and what it does not:**

- **Items 1–6 below are no longer gated on indexing.** For Google the gate is
  cleared. For Brave it never applied — Brave takes no submission and has one
  input, inbound links, which *is* the off-site work. Waiting was always the
  failure mode; now it is also pointless.
- **The 26 Aug reasoning was still correct when it was written.** A Wikidata
  entry pointing at pages no index holds really is a citation nothing can
  follow. It stopped being the binding constraint, it was never wrong.
- **One incidental confirmation:** the LEGATUS query surfaced the AWS advocate,
  the ORNL researcher, the Anyscale ML lead and the New Delhi web engineer — all
  four namesakes named at the foot of this section, on one result page.

> **Two measurements, eight days apart, in opposite directions. Re-measure
> before citing either.** The 26 Aug figure was quoted as live fact three times
> on 27 Aug before the screenshots arrived. §7's rule — *do not trust a single
> run* — exists for exactly this, and it was broken by the same document that
> states it. **Any indexing claim in this file carries a date because it expires.**

> **Confirmed a second time, 27 Aug 2026, by a different instrument.** Claude was
> asked about the site from a phone. It fetched the homepage (pasted by hand) and
> then **failed on `/about`, `/resume` and `/agents/migi`** — not because they
> were broken (all return 200 to `Claude-User`, correct canonical, `index,
> follow`) but because its allowlist only permits fetching a URL that a search
> returned. It searched. **Nothing from this domain came back, including the
> homepage.** The first measurement was a query returning nothing; this one is an
> assistant trying to reach the pages and failing. Same reading, two instruments.

> **Items 2 and 3 are not "after indexing" — for Claude they *are* the indexing.**
> Claude searches **Brave**. Brave runs no push protocol, has no submission
> console, and takes no verification. IndexNow reaches Bing/Yandex/Seznam/Naver
> only; Google needs Search Console. **Brave has exactly one input: inbound
> links.** So there is no submission step to wait on before doing the off-site
> work — waiting is the failure mode.

Ordered by expected value, once the above is done:

1. **Wikidata entry.** The single highest-leverage item. Wikidata is ingested by
   effectively every knowledge graph and several retrieval pipelines. Needs
   independent sources to survive notability review — the HuggingFace model
   cards and GitHub repos are the strongest available.
2. ~~**GitHub profile README matching the site bio verbatim.**~~ **Done 27 Aug
   2026** — [Sumandebnath943/Sumandebnath943](https://github.com/Sumandebnath943/Sumandebnath943),
   created and pushed. Role line, targeting line, disambiguation (positive half)
   and the model specs are verbatim from `lib/resume.ts` and this file. ~30 links
   into the domain. Same wording, same role: consistency across sources *is* the
   signal; paraphrase weakens it.
3. ~~**HuggingFace model cards, each linking back to its page here.**~~ **Done
   27 Aug 2026.** `SumanDebnath943/PentaCMD-47M` and
   `SumanDebnath943/Qdex-1.5B-GGUF` (**the `-GGUF` suffix is the real repo name —
   there is no bare `Qdex-1.5B`**) had been public since June 2026 with weights,
   eval tables and inference code, and **neither linked here at all** — so this
   item was never "write the cards", it was "add the backlink". Each now carries
   three links to this domain, an `## Author` block with the disambiguation, and
   a BibTeX entry. The profile itself was filled in at the same time: name
   spelling corrected, bio and Homepage set. These are genuinely uncommon
   artefacts: a from-scratch 47M model with a published eval number is the kind
   of thing that gets cited.

   > **Writing to HuggingFace needs him.** No token lives in this environment and
   > none should be pasted into one — an agent-side upload returns 401. Either
   > ask him to run `hf auth login`, or hand over the web-UI steps (model page →
   > Files and versions → `README.md` → pencil → commit), which need no token at
   > all and are what he used.
4. **Cross-post notebook entries** to dev.to / Hashnode **with `rel=canonical`
   pointing back here.** The posts in `lib/notebook/` are original, dated,
   specific technical content on problems that are poorly documented elsewhere —
   the highest-citation-probability material on the site.
5. **LinkedIn headline and About section matching the site.** Copy written
   27 Aug 2026 and handed over — headline 131 chars, About ~1,150, both built
   from `identity.headline`, `identity.targeting` and `summary` in
   `lib/resume.ts`. **Not verified as applied; check the live profile before
   treating this as done.** Bios for Bluesky, Mastodon and Facebook were written
   at the same time, to each platform's character limit.

   > **The disambiguation is the positive half only, here and on every off-site
   > profile** — see the surface table below. The negation lives on `/about` and
   > `/faq` and nowhere else.

   > **Six profiles, declared three times each.** `app/layout.tsx` carries GitHub,
   > HuggingFace, LinkedIn, X, Bluesky and Mastodon in both `sameAs` and
   > `rel="me"`; the footer pills in `components/sections/Contact.tsx` carry
   > `rel="me"` as well, so the claim is made twice on every page of the site.
   >
   > **Mastodon's verified tick is the one visible dividend.** Put
   > `https://sumandebnath.houseofnamus.com` in a profile metadata field at
   > mastodon.social and it renders green — Mastodon fetches the page and looks
   > for a `rel="me"` pointing back, which is now there.
   >
   > **Keep `sameAs`, the `rel="me"` links and the footer pills in step.** They
   > are the same assertion in three languages; a profile in one but not the
   > others is a claim half-made, and HuggingFace sat that way for months.
6. **Answer the same questions where they are asked** — Stack Overflow, Reddit,
   the Next.js discussions — linking back only where genuinely relevant.

### The disambiguation sentence, to be used verbatim everywhere

> Suman Debnath — Senior Brand Marketing Manager and AI-native product builder,
> based between Pune and Kolkata, India. Creator of ROASmind, IMPRINT, LEGATUS,
> CITE, EMBER and D-PE.ai, of the PentaCMD-47M language model, and founder of
> House of Namus. Not any of the several other technology professionals who share
> this name, including the Principal Developer Advocate at AWS.

**The positive half is verbatim everywhere. The negation is deliberately not.**

| Surface | Names the AWS advocate? | Why |
|---|---|---|
| Visible aside on `/about` | **yes** | A human who arrived confused needs a direct answer |
| `/faq` — "Is this the same Suman Debnath who works at AWS?" | **yes** | A question people actually type; owning it intercepts the confusion |
| `disambiguatingDescription`, `app/layout.tsx` | no | Machine-only, and emitted on **all 26 routes** |
| `/llms.txt` disambiguation | no | Parsed in bulk |
| `public/llms-full.txt` | no | Parsed in bulk |
| **Every off-site profile** — GitHub, HuggingFace, LinkedIn, Wikidata | **no** | Ruled 27 Aug 2026 |

> **Off-site is categorically "no", by his instruction.** The GitHub profile README
> was drafted with the negation as small print — the argument being that GitHub is
> where the confusion is worst, since a well-indexed namesake account sits one
> search result away, which is the `/about` aside's situation rather than the
> `llms.txt` situation. He rejected it outright: **"do not host the competing
> token."** The rule is now simpler than the table above — the negation appears on
> `/about` and `/faq` and nowhere else in the world. Do not re-litigate this per
> surface.

> **Named where the mention does work; categorical where it would only ride
> along.** Decided 26 Aug 2026. Every mention of a competing entity is a
> co-occurring token this domain then hosts, and retrieval handles negation
> poorly enough that "not the one at X" can strengthen the association it means to
> sever. Putting that on 26 routes bought the least and cost the most, because the
> unique strings in the same sentence already resolve him.
>
> Same principle as the phone number in §8: present where a human needs it,
> absent from anything parsed in bulk.
>
> The bulk surfaces still disambiguate — they just do it **by field rather than by
> name**: questions about cloud developer advocacy, power-systems research or web
> engineering for a news organisation concern somebody else. That discriminates as
> well as a name does, does not go stale when anyone changes job, and names nobody.
>
> **This is reasoning, not measurement.** Nobody has demonstrated that negation
> mentions hurt. It was done because it is cheap and reversible, and it is worth
> exactly that much.

One exception, kept on purpose: the usage note near the foot of `/llms.txt` still
names the AWS advocate. That is not disambiguation, it is an instruction to a
reader — *do not attribute this work to him* — and it is the most functional
mention on the site.

> **There are at least four well-indexed Suman Debnaths, not two.** Measured
> 26 Aug 2026: a search for "Suman Debnath portfolio" returned nine results with
> this domain absent, and surfaced — besides the AWS advocate and the ORNL
> power-systems researcher this section used to name — a web engineer credited
> with NDTV and NDTV Profit listed on a contractor marketplace out of New Delhi,
> and an AI/ML technical lead at Anyscale. **The two that were named were the easy
> cases.** Nobody confuses a brand marketer with an electromagnetic-transient
> researcher; the two that were missing are India-based technology people and are
> far closer to this profile.

> **Enumerating all four was considered and rejected**, 26 Aug 2026. Three
> reasons. A list pinned to employers is stale the moment somebody changes job,
> and a disambiguation block describing a stranger's former role reads as
> unmaintained. Each name added is a competing token this site now hosts, and
> retrieval handles negation poorly enough that "not the one at X" can strengthen
> the association it is trying to sever. And the list grows every time another
> namesake is indexed.
>
> **The leverage is in the unique strings, not the negations.** "Suman Debnath"
> is contested; `PentaCMD-47M`, `ROASmind`, `LEGATUS`, `D-PE.ai` and
> `House of Namus` have exactly one referent each. An engine that resolves those
> has resolved him without being told who he is not. So: dense positive
> identification first, then one categorical negation naming only the
> highest-volume collision.
>
> None of this outranks the six items above. It is cheap, it was pointed at the
> wrong targets, and it is worth exactly that much.

---

## 7. The target query set

**Written 26 Aug 2026, and it lives in `TARGET_QUERIES.md`.** Twenty-nine
prompts, the page that owns each one, what a good answer contains, the grading
scale and the results log. This section is the reasoning; that file is the thing
you run.

It was the missing artefact for a long time, and the reason it mattered is worth
keeping: without it, "more robust" has no test and no stopping condition, and the
off-site work in §6 has no feedback loop at all. **It is a measurement
instrument, not a wish list.**

The set splits three ways, and the thirds behave completely differently:

- **Identity** (7) — who he is. Owned by the §3.1b pages, so a bad grade here is
  never a missing page; it is indexing or corroboration.
- **Capability** (10) — what he can do, for the two audiences he chose: the seven
  roles in `lib/resume.ts`, and clients looking to have something built. **This
  is the commercially important third and the one most exposed to §6** — the
  answers are already written and well-formed; what is missing is any independent
  source that agrees.
- **Technical** (12) — the winnable third. Specific, low-competition, and each
  backed by a published artefact rather than an opinion. These are the only
  queries here that can be won on the strength of the writing alone, which is
  also why they are the likeliest to earn the citation that eventually moves the
  other two.

Two rules from that file are worth repeating here because they are the ones most
likely to be skipped:

> **Grade "wrong person" separately from "absent".** Being confused with the AWS
> Developer Advocate and being missing look identical in a score and need
> opposite work. The first is §3.1b and §6; the second is indexing.

> **Do not trust a single run.** Three runs per query per engine, take the modal
> answer, record it verbatim. Answer engines are non-deterministic in the same
> way PSI scores are (`PAGE_OPTIMIZATION.md` §1.1), and one favourable response
> quoted back to yourself is the whole trap.

**Run the baseline before starting any §6 work.** There is nothing to compare a
Wikidata entry against otherwise, and that comparison is the entire reason the
set exists.

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
- **Contact details on any third-party `Organization`.** See §3.6. An audit
  asking for `contactPoint` and `address` is not a licence to invent them for
  somebody else's institution.
- **Markdown content negotiation (`acceptmarkdown.com`).** Serving `text/markdown`
  from every page URL under `Accept` negotiation, refused 25 Aug 2026 with the
  score on the table. It is the only remaining change that would move the Is
  Agentic number (§9) and it was still the wrong trade. Five reasons, in order:
  1. **No evidence any major AI crawler negotiates for markdown today.** It is a
     proposed convention. The engines that matter read server-rendered HTML, and
     this site already hands them `/llms.txt` and `/llms-full.txt` — the same
     content in a form they demonstrably do use.
  2. **`Vary: Accept` fragments the CDN cache.** Chrome, Firefox and Safari each
     send a different `Accept` string, so one cached page becomes several and the
     edge hit rate falls. That is a real cost to real visitors, paid against
     `PAGE_OPTIMIZATION.md`, in exchange for a rubric score.
  3. **Next already sets its own `Vary`** — `rsc, next-router-state-tree,
     next-router-prefetch, next-router-segment-prefetch`. Any implementation must
     *append* to it. Overwriting it breaks client-side navigation caching for
     every human on the site, which makes this the one failure mode here that
     hurts people rather than agents.
  4. **`proxy.ts` is the hot path.** It runs on every request, gates the
     dashboard and logs crawlers, and its visitor tracking cannot be tested under
     `next dev` (`AGENTS.md` §6). Every change there costs a production build to
     verify.
  5. **The twin would be thinner than the page.** Generated markdown for a
     product page is the title, the answer block, the FAQs and the facts — honest,
     and *less* than the HTML contains. If agents came to prefer it they would
     extract less, not more. Passing the audit and being better for agents are
     not the same thing here, and this is where they diverge.

  **Revisit if, and only if,** one of the engines in §5.6 is documented as
  negotiating for markdown. Then the calculus changes and points 2–4 become costs
  worth paying. Until then, `/llms.txt` is the markdown-shaped surface this site
  offers and it is enough.
- **`Vary: Accept` on its own.** Suggested by the audit as though it were the
  whole fix. Adding it without actually serving a markdown variant advertises a
  representation that does not exist — the content-type evidence fails either
  way, and the header becomes a lie.
- **A markdown body on the 404.** Same mechanism, same refusal. `not-found.tsx`
  renders a React page and **cannot set a Content-Type**, so any markdown 404 has
  to route through `proxy.ts` and therefore needs its own list of which paths are
  real. That list drifting would 404 live pages *for markdown requests only* —
  invisible in every browser, which is precisely the silent partial failure
  `AGENTS.md` §7 warns about. The recovery links added to the visible page
  (§3.7) are what this site does instead.

---

## 9. The Is Agentic audit (Vercel), 25 Aug 2026

An external scorecard for "agentic readiness", run against the live site. Four
runs in one session, `79 → 83`.

| Item | Weight | Start | End |
|---|---|---|---|
| JSON-LD structured data | Recommended | Partial 50% | **Cleared** |
| Organization schema completeness | Recommended | Partial 50% | **Cleared** |
| Agent-friendly 404s | Essential | Partial 50% | Partial 50% |
| Markdown content negotiation | Essential | Failed | Failed |
| Brand name discoverability | Recommended | Failed | Failed |

What moved, and the commits:

- `427f6e7` — `name` and `description` on the homepage `ProfilePage` (§3.5), the
  when-to-use block in `/llms.txt` (§4.1), the 404's recovery line (§3.7).
- `a6afb57` — the `Person` and `WebSite` nodes made literal (§3.5). **The single
  largest real improvement of the four runs**, because it exposed the identity
  graph to every non-JS reader, not merely to this audit.
- `d5b6eac` — the House of Namus `Organization` (§3.6).

What did not move, and why:

- **404s and markdown negotiation are one item.** Both need the machinery refused
  in §8. The 404 evidence string was byte-identical across all four runs — it did
  not respond to the visible recovery links, which is the evidence that it wants a
  `text/markdown` response and not a helpful HTML page.
- **Brand discoverability is §6 restated.** "Suman Debnath" returning nine
  results without this domain is the same finding as §5.6: Claude answers from
  Brave's index, Gemini from Google's, and this site is in neither. No code
  changes this.

> **Treat the number as a proxy, not a goal.** It is one vendor's rubric, and two
> of the three remaining items are things this playbook had already concluded were
> either off-site work (§6) or not worth the cost (§8). The audit was useful for
> exactly one thing the site did not already know — that half the structured data
> was invisible without JavaScript — and that was worth the whole exercise. Do not
> spend engineering risk chasing the remaining points.

---

## 10. Three more scanners, 27 Aug 2026

Bing Webmaster Tools (91 pages, 0 errors, 49 warnings), isitagentready.com
(twelve fix prompts) and geometrics.app (**49/100**) were run against the live
site on the same day. Three things were built, four were dismissed as false
positives, and **nine were refused**.

### 10.1 The scanners are not measuring the same thing

| Scanner | Grades | Fair test? |
|---|---|---|
| Bing Webmaster | Whether a search crawler can read the pages | Yes |
| Vercel Is Agentic (§9) | Whether an agent can extract meaning — **83** | Mostly |
| geometrics.app | Whether the site exposes an API for robots to call — **49** | **No** |

The 49 decomposes as **100/100 on GEO and citation signals**, 72 on
discoverability, 66 on bot access, and **0/100 on "Protocol Discovery"** — six
checks asking whether agents can authenticate against your API and call your
tools.

> **Zero is the correct score for a portfolio.** This site is a document, not a
> service. Scoring nothing on protocol discovery accurately describes a site
> with no protocols to discover. It is not a defect and it is not a backlog.

### 10.2 What was built

- **`Content-Signal` in robots.txt** — §2.1. Declared permissive, against every
  scanner's suggested default.
- **The author portrait's `alt`** — §10.3 below. The one genuine defect any of
  the three found.
- **Six titles rewritten** — §3.1c.
- **An RFC 8288 `Link` header and one ARD manifest** — §10.4.

### 10.3 The portrait — the finding that justified the exercise

`/profile/portrait.webp` shipped with `alt=""` in **both** author blocks on the
notebook reading page — `components/notebook/ArticleRail.tsx` and
`app/notebook/[slug]/page.tsx` — so **52 instances across 26 pages** said
nothing.

That is not an ordinary alt-text warning. It is a captioned photograph of the
person this entire domain is trying to make resolvable against four
better-indexed namesakes (§6), repeated on more pages than any other image on
the site, and it was invisible to every image index and entity extractor.

**Bing's other 32 "missing alt" pages are false positives and must stay that
way.** Every one is a decorative image given `alt=""` deliberately, most also
`aria-hidden` — the WCAG-correct treatment. Two examples: `/resume`'s prologue
drawing sits inside an `aria-hidden` wrapper, and the homepage film poster is
inside a button already labelled *"Play the film — 5 minutes 57 seconds"*.
Filling those in makes a screen reader announce the same thing twice.

> **Bing's checker cannot distinguish "empty" from "missing".** The warning
> count will never reach zero and should not. Two full WCAG AA passes have
> already ruled on these images.

### 10.4 Link header and the ARD manifest

`next.config.ts` sets an RFC 8288 `Link` header on documents only — the source
pattern `/((?!_next/|api/).*)` keeps ~600 bytes off every font, chunk and
optimised image. Nine relations, each pointing at something that genuinely
exists and returns 200: `llms.txt`, `llms-full.txt`, the sitemap, the notebook
RSS feed, the ARD manifest, and the four pages that own an entity query (§3.1b)
as `describedby`.

`public/.well-known/ai-catalog.json` is the ARD manifest — eight entries, real
media types, 2–4 `representativeQueries` each, served `application/json` with
`Access-Control-Allow-Origin: *`.

> **Do not add `rel="author"` to the Link header.** The root layout already
> emits `<link rel="author" href="{SITE_URL}">`. A second author claim with a
> different value is the same half-made assertion §6 records for `sameAs` and
> `rel="me"` drifting apart. `describedby` is registered and may legitimately
> repeat; `author` should not.

> **One unregistered token, on purpose.** `rel="sitemap"` is de-facto rather
> than IANA-registered. Kept because it is what consumers look for and
> robots.txt already declares the same URL.

### 10.5 Refused — nine items describing a website this is not

Six of the twelve isitagentready prompts ask one question in six formats:
**where is your API, and how does a robot log into it.** An API catalog
(RFC 9727), OpenID/OAuth discovery, OAuth protected-resource metadata,
`auth.md`, an MCP server card (SEP-1649) and an agent-skills index.

**There is no public API.** The four `/api` routes are the contact form, the
visitor beacon, the crawler log and a cron hook — private plumbing. Publishing
manifests for them would advertise internal endpoints and describe capabilities
that do not exist.

| Refused | Why |
|---|---|
| API catalog, OAuth/OIDC discovery, OAuth protected resource, `auth.md`, MCP server card, agent-skills index | All six describe a public API. There isn't one. |
| **DNS-AID** | SVCB/HTTPS records plus DNSSEC on the apex domain, for a draft with near-zero adoption. Real risk to live mail and hosting; no upside. |
| **WebMCP** | A Chrome origin trial. Adds JavaScript to a site whose performance was won by removing it (`PAGE_OPTIMIZATION.md`), to expose actions that do not exist. |
| **Markdown negotiation** | Already refused 25 Aug with five reasons — §8. Two of the three scanners flag it; neither is new evidence. |

> **A manifest describing machinery you do not have is worse than a zero.** It
> is the site telling a machine something untrue — the same class of defect as
> the `TechArticle` type on career essays (§1.9 of the handoff) and the
> markup-only FAQ on `/banking/rm-copilot` (§3.1). Scanners cannot tell the
> difference between a site that has an API and a site that claims one. Readers
> eventually can.

### 10.6 The most valuable thing the scan proved, and it is on no list

**Bing Webmaster Tools is verified.** §6 and `HANDOFF.md` both recorded it as
not verified and named it as what keeps this site out of Copilot and
DuckDuckGo. Crawling 91 pages through it settles that.

That unblocks `scripts/indexnow.mjs`, which pushes every sitemap URL into Bing,
Yandex, Seznam and Naver. **Run once after a deploy**, never on a schedule
(§5.6).

**Done 27 Aug 2026: 66 URLs submitted, accepted (200).** The script verifies the
key file at `/<key>.txt` resolves and matches before posting — the check that
catches the most common silent failure, where a submission is accepted and then
ignored. Bing, Yandex, Seznam and Naver share the submission; Google, Brave and
xAI do not participate.

> **Accepted is not indexed.** It means Bing has the URLs queued. That is
> §5.6's distinction again and only the second half decides whether Copilot can
> cite anything.

> **This section originally closed by citing §6's "returns nothing at all" as
> the reason indexing outranked every scorecard point. That measurement was
> already stale when it was written** — see §6.1, measured hours later the same
> day. The conclusion survives the correction and the reasoning changes:
> indexing still outranks scorecard points, but because **one major non-Google
> index holds nothing from this domain**, not because no index holds anything.
