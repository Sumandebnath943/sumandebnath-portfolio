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

> **But do not make Google *follow* an `@id` to something it requires.** Every
> `ProfilePage` used to say `mainEntity: { "@id": <site>/#person }`. Search
> Console reported **"Invalid object type for field mainEntity"** — a critical
> Profile-page issue — against `/about` and `/profile` on 27 Aug 2026, because it
> does not dereference across `<script>` blocks. It *did* resolve on `/` and
> `/resume`, which is worse than a clean failure: the behaviour is inconsistent,
> so it cannot be relied on either way. All four now use **`personRef` from
> `lib/schema.ts`** — the same `@id`, with `@type` and `name` inline. **Never
> remove that `@id`**; it is what merges the stub back into the layout's Person,
> and without it the site asserts a second, thinner Suman Debnath. `about` and
> `isPartOf` keep pure references; nothing has reported trouble reading those.
> Full account in `HANDOFF.md` §1.18.

> **The four `QAPage` nodes carry `author`, `datePublished` and `upvoteCount: 0`.**
> Google's recommended set, added 27 Aug 2026 after five non-critical Search
> Console issues. `upvoteCount` is zero because these pages have no voting — do
> not put a flattering number there. `datePublished` is a fixed constant, not
> `routeDate()`, because a publication date that moves forward is a lie.
> **Converting these to `FAQPage` was refused**: `/about`, `/profile` and
> `/projects` already emit an `FAQPage` at `<url>#faq` via `<PageFaq>`, and a
> second one per URL is a worse problem than the warnings were.

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

### 3.6a A product on its own domain owns its own `@id`

The same rule as the Organization node above, applied to products (5 Sep 2026,
IMPRINT — `HANDOFF.md` §1.22). `softwareApplicationJsonLd` anchors a project's
`SoftwareApplication` at `${SITE_URL}/projects/<slug>#software`, which is right
for a project that exists only as a dossier here. When the product runs on its
own domain **and publishes its own `SoftwareApplication` node**, that domain
owns the entity, and two `@id`s for one product is two competing entities.
`entityId` on `ProjectMeta` overrides the default; `subjectOf` links the
documents the product publishes about itself.

Three things this pattern requires, and nothing enforces any of them:

- **Copy the `@id` from the live page; never compose it.** `/#software` vs
  `#software`, http vs https, a trailing slash — a near-miss is two nodes again,
  and the markup validates either way, so it fails silently.
- **Diff the properties first, and separate a *contradiction* from a mere
  *difference*.** A merged node carries the union of both sides' statements.
  IMPRINT was `ProductivityApplication` here and `LifestyleApplication` there —
  one slot, two answers, a real contradiction, and it was aligned to the live
  value. Its `featureList` differs too — eight here, six there — but a feature
  list is additive, so the union is simply the longer list. **Ask before
  editing either way**: Suman confirmed on 5 Sep that both extra features are
  real, so nothing was trimmed (`HANDOFF.md` §1.22).
- **Only set it when the product's own site actually publishes the node.**
  Pointing an `@id` at a domain that declares nothing is worse than the default:
  it hands the entity to a page that never claims it.

**Deep-link the product's technical pages, not its homepage.** A second link to
a homepage the site already links twice corroborates nothing. A link to a
specific, defensible page — a published method, a spec — is the on-site half of
the off-site work in §2, and it is the anchor text that carries the claim.

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
> `href: null` for those — the component renders them as plain text and leaves
> them out of the schema. One dossier crumb was also pointing at `/#projects`, a
> homepage anchor, which told crawlers the page sat under the homepage.

> **An unlinked section cannot sit *inside* the JSON-LD list.** It first shipped
> as a `ListItem` carrying `name` and `position` but no `item`, which reads as
> reasonable and is invalid: Google requires `item` on every step except the
> last. Search Console flagged "Missing field 'item'" on all eleven pages with a
> section crumb, and an invalid `BreadcrumbList` is discarded whole — those pages
> showed a bare URL in results, not a shortened trail. The component now drops
> unlinked mid-trail crumbs from the schema and renumbers `position` from 1, so
> `/agents/pentashell` publishes Home → Pentashell while the reader still sees
> Home / Agents / Pentashell. Fixing it properly instead means giving the
> sections real index pages; until then the schema claims only what it can link.

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

### 5.5a The archive described fourteen of twenty-three (8 Sep 2026)

`/projects` renders `lib/archive-projects.ts`, fourteen products that mostly live
on their own domains. It named **none** of the nine with a full write-up on this
site — while its own `QAPage` answer, four lines above the grid, named the MIGI
fleet, PentaCMD-47M and the Banking Co-pilot. The page titled *"What has Suman
Debnath built?"* was the one page on the site that did not list what he had
built.

Measured on the live HTML before the fix, links to those nine:

| Page | Server-rendered links to the nine |
|---|---|
| `/` | 8 of 9 — `/apps/migi-app` had none |
| `/projects` | 3 of 9, and only via the Related rail |
| any leaf page | **0** |

> **The nav is not a crawl path.** Its product links render only once a submenu
> is opened, so a crawler that does not execute JavaScript sees none of them from
> any page. The homepage was carrying nearly the whole internal link graph for
> the product pages on its own. This is worth remembering before treating "it's
> in the menu" as "it's linked".

A **Documented in depth** block now closes the page, rendered from
`dossierPages()` in `lib/pages.ts` — nine cards, nine server-rendered `<a href>`,
and the `ItemList` extended from 14 to 23 items so the count and the page agree.

> **Rendered from the page registry, not copied into the archive.** An
> `ArchiveProject` wants `positioning`, `status`, `stack` and `kind`; those facts
> already exist on each product page. Writing them a second time is the drift
> `lib/pages.ts` exists to prevent. A card needs a label, a blurb and an accent,
> and those stay true by construction. AEGIS VAULT is deliberately unflagged —
> the archive already carries it, and flagging it would render it twice.

**Do not oversell what this buys.** `/llms.txt` is generated from `lib/pages.ts`
and already listed all nine with blurbs, as does `llms-full.txt`, so an engine
reading the AI surfaces could always see them. The gains are narrower and real:
a second differently-worded internal link from a priority-0.9 page, the
`/apps/migi-app` gap closed, one URL that enumerates the whole set for something
assembling a citation, and a page that finally delivers the claim in its own
title.

## 5.6 Which index each assistant actually queries

**Measured 25 Aug 2026.** ChatGPT names Suman prominently for "who is Suman
Debnath", from multiple devices in temporary-chat mode, and the beacon confirms
OpenAI agent arrivals. Claude, Gemini and Grok do not.

> **Re-measured 10 Sep 2026, and the last sentence is now too coarse — see §6.4.**
> ChatGPT still leads with him. **Gemini Flash-Lite names him** third of three,
> uncited; **Gemini Pro does not name him at all**, so "Gemini" is not one
> answer and grading per vendor averages the two together. Perplexity carries the
> domain in its source panel and demotes him. Claude is unchanged and is the only
> flat absence left.

> **The arrival half of that was unverified when it was written** — identity was
> taken from the user agent, which anyone can set, and forged `ChatGPT-User`
> requests have since been caught. The naming result is independent and stands;
> the arrival counts should not be quoted as a figure. See "A crawler alert is
> only evidence if the crawler was who it said" at the end of this section.

That gap is not a crawlability problem — nothing on this site blocks any of
them, and `proxy.ts` only logs crawlers, it never gates them. It is a question
of **whose index each assistant answers from**:

| Assistant | Answers from | What it needs |
|---|---|---|
| **ChatGPT** | OpenAI's own crawler + own index | Nothing — this loop is closed and working |
| **Claude** | Brave's index | Presence in Brave: inbound links and time |
| **Gemini** | Google's index | Search Console verification + indexing |
| **Copilot** | Bing's index | Bing Webmaster + IndexNow |
| **Perplexity** | Its own crawler plus a web index | **Has the domain already** (§6.4) — what it needs is corroboration, not access |
| **Grok** | X, plus a web index | Posts on X linking the site |

> **Perplexity was missing from this table until 10 Sep 2026** and is in
> `TARGET_QUERIES.md` §2's engine list, so the two files disagreed. It is also
> the one row where "what it needs" is no longer an access problem — which is the
> distinction §6.4 exists to draw.

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

### A crawler alert is only evidence if the crawler was who it said (1 Sep 2026)

**Read this before citing arrival counts as evidence of anything.**

Detection above is by user agent, and a user agent is a string the client picks.
"ChatGPT-User" costs nothing to type and is worth typing, because a UA that
reads like a well-behaved answer engine is waved past filters that stop `curl`.
On 1 Sep 2026 two requests carrying OpenAI's exact `ChatGPT-User` string probed
`/.env.sample` and `/.git/HEAD` from Cloudflare IPs, while every prefix OpenAI
publishes for that agent is Azure. Both were logged as OpenAI arrivals.

`lib/crawler-verify.ts` now checks the client IP against the vendor's own
published prefix list before the alert is written, and forged or probing rows
file as `bot_verdict = 'scanner'` rather than `'crawler'`.

> **This matters here more than it does in the notifier.** §5.6 reasons from
> "the beacon confirms OpenAI agent arrivals". If some fraction of those
> arrivals were forgeries, that sentence was measuring scanners. The conclusion
> still holds — ChatGPT names Suman, which is independent evidence the loop is
> closed — but **arrival counts logged before 1 Sep 2026 are unverified and
> should not be quoted as a figure.** From that date, `verified` in the alert
> means the IP was checked; `unverified` means it could not be.

| Vendor | Publishes a checkable IP list |
|---|---|
| OpenAI | Yes — `gptbot`, `searchbot`, `chatgpt-user` |
| Google | Yes — Googlebot, special crawlers, user-triggered fetchers |
| Microsoft / Bing | Yes |
| Perplexity | Yes — bot and user |
| **Anthropic** | **No** — every Claude agent reports `unverified` |

Anthropic publishing nothing is worth knowing for a second reason: Claude's
visibility is already the weakest of the five (§5.6, and §6.1), and it is also
the one arrival this site can never confirm. Do not read `unverified` on a
Claude row as suspicion — it is the only answer available.

> **The rule that makes the verdict trustworthy: `forged` is only ever asserted
> from a list that loaded and parsed.** Every failure returns `unverified`. A
> wrong `verified` costs one missed scanner; a wrong `forged` would poison the
> evidence this playbook reasons from. `PROJECT_BIBLE.md` has the mechanism and
> the traps; `HANDOFF.md` §1.21 has the session.

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

> **⚠ OVERTAKEN 10 Sep 2026 — read §6.4 before acting on this section.** Its
> split was two-way: Google has the site, nothing else does. It is now three of
> five engines, and **the binding constraint has moved from being indexed to
> being preferred** — which needs different work. Only the Claude/Brave half of
> what follows is still current. Kept in full because the reasoning about *why*
> Brave has one input still governs that half, and because the shape of the
> reversal is the point.

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

   > **⚠ OPEN, 10 Sep 2026 — the Qdex card still quotes a superseded benchmark.**
   > `SumanDebnath943/Qdex-1.5B-GGUF` reports instruction-mode HumanEval as
   > **39.0% (64/164)**. The site says **42.1% (69/164)** and is right: the
   > harness had a scoring bug failing correct solutions on output-formatting
   > artifacts, the extractor was hardened, a regression test added, and the full
   > 164-problem run repeated. `/llms/qdex-1.5b` carries the account.
   >
   > The site side was fixed in `c14c94e` — `components/sections/Projects.tsx`
   > was the last place in the repo still on 39.0%, and it was the homepage.
   > **The model card is the remaining divergence and it is the one that matters
   > more:** it is the artefact's own page, it is what an engine reads to check
   > the claim, and it currently contradicts this domain.
   >
   > A full replacement card is drafted. Two things it does beyond the number:
   > the "recovering ~97% of the base model's raw ability" line had to be
   > rewritten, because at 42.1% against the base's 40.2% that is an overtake,
   > not a recovery — and it **states the correction openly** rather than
   > silently raising the figure. A card documenting a bug that was undercounting
   > its own model reads as careful; a number that quietly moves up does not.

   > **The GitHub repo behind it is worse and is not yet fixed.**
   > `Sumandebnath943/Qdex-1.5B` is linked from the model card as *Source* and
   > from the homepage as *View on GitHub*, and its benchmark table still reads
   > `_TBD_` under "These will be filled in after the GPU runs." The runs
   > happened months ago. **For anyone verifying the 42.1%, a repo presenting the
   > project as unfinished is a worse outcome than the stale number was.** It
   > also disagrees with the model card on training length — "~3 epochs" there
   > against 2 epochs / 5,000 steps on the card.
4. **Cross-post notebook entries** to dev.to / Hashnode **with `rel=canonical`
   pointing back here.** The posts in `lib/notebook/` are original, dated,
   specific technical content on problems that are poorly documented elsewhere —
   the highest-citation-probability material on the site.

   > **Generated, not hand-converted: `node scripts/build-crosspost.mjs <slug>`.**
   > It renders a post's typed blocks to dev.to-flavoured Markdown, rewrites
   > every internal link and image absolute, maps the tag vocabulary onto tags
   > Forem actually indexes, and derives `canonical_url` from the slug so it
   > cannot be forgotten. **That field is the whole exercise** — without it a
   > cross-post is not a backlink, it is a duplicate competing with the original
   > on a domain with more authority, so the copy wins. Output carries
   > `published: false`; the last step is a human pressing publish.
   >
   > **The account, set up 7 Sep 2026: [dev.to/suman_debnath_1](https://dev.to/suman_debnath_1).**
   > Its Personal website field emits `rel="noopener me ugc"`, so the identity
   > claim is genuinely reciprocal — which is the precondition HuggingFace waited
   > on, and the reason the site's three declarations were added only after the
   > field was filled in rather than when the account was created.
   >
   > **`ugc` means no ranking equity passes.** Do not present dev.to cross-posts
   > as link building. What they buy is a second independent source resolving to
   > the same person, plus reach into an index that is not Google's — which is
   > the actual shortage, since Brave (§6.1) takes no submissions and has inbound
   > links as its only input.
   >
   > **dev.to's bio field caps around 200 characters.** The 247-character
   > verbatim positive disambiguation is rejected; the compressed form — role,
   > PentaCMD-47M, the MIGI fleet, House of Namus — fits at 138. Measured by
   > trying it, not read from documentation.
   >
   > ### ⚠ Medium self-canonicalises unless you tell it not to (7 Sep 2026)
   >
   > **A story written or pasted into Medium's editor emits
   > `<link rel="canonical">` pointing at itself.** Verified on the first
   > cross-post: dev.to carried the correct canonical back here and Medium
   > carried its own URL. That is the worst possible outcome of this whole item —
   > Medium's domain authority vastly exceeds this one's, so an uncanonicalised
   > copy does not merely fail to help, it competes and wins, and the original
   > gets discounted.
   >
   > **It fails silently and it looks identical to success.** The post publishes,
   > renders correctly and reads fine. Nothing surfaces the problem. The only way
   > to know is to fetch the published URL and grep for the canonical tag, which
   > takes one command and should be done on every platform, every time:
   >
   > ```bash
   > curl -s -L <published-url> | grep -o '<link[^>]*rel="canonical"[^>]*>'
   > ```
   >
   > **Two ways to get it right on Medium**, both confirmed against Medium's own
   > help centre rather than assumed:
   >
   > - **Import rather than paste.** The import tool takes the source URL, pulls
   >   the content and sets the canonical automatically. This is the correct
   >   route for a cross-post and should be the default.
   > - **Fix it after publishing**, which does not require deleting the story:
   >   story page → three-dot menu → *Edit story* → three-dot menu → *More
   >   settings* → *Advanced Settings* → **"This story was originally published
   >   elsewhere"** → paste the link → *Save canonical link* → **Publish** to
   >   apply. Only the story's author can do this.
   >
   > **Do not assume any platform behaves like dev.to.** dev.to honours the
   > `canonical_url` front-matter field, which is why the generator emits it.
   > Medium ignores the concept entirely unless asked. Hashnode has the field but
   > calls it **"Original article URL"**, not canonical.
   >
   > ### The first syndication, verified 8 Sep 2026
   >
   > `what-ai-agents-cost-to-run` is live on all three, **and all three canonicals
   > were checked rather than assumed** — which is the only reason the Medium
   > fault was caught, since it had published looking perfectly correct.
   >
   > | Platform | Article | Canonical | Profile link back |
   > |---|---|---|---|
   > | dev.to | [`…mine-has-cost-5-1in1`](https://dev.to/suman_debnath_1/the-ai-agent-cost-guides-say-200-a-month-mine-has-cost-5-1in1) | ✅ | `rel="noopener me ugc"` |
   > | Medium | [`…45f66d66ec46`](https://medium.com/@sumandebnath943/the-ai-agent-cost-guides-say-200-a-month-mine-has-cost-5-45f66d66ec46) | ✅ *after the fix below* | `rel="noopener follow"` |
   > | Hashnode | [`what-ai-agents-cost-to-run`](https://sumandebnath.hashnode.dev/what-ai-agents-cost-to-run) | ✅ | `nofollow ugc` |
   >
   > **Medium's post-publish fix works.** It was self-canonicalising, was
   > corrected through Advanced Settings without deleting the story, and now
   > resolves here. The documented procedure is proven, not theoretical.
   >
   > ### The second syndication, 9 Sep 2026 — and three new traps
   >
   > `cited-by-chatgpt-what-i-changed` is live on all three, canonicals verified
   > by fetching. Nothing about the first run's procedure survived contact
   > unchanged:
   >
   > - **Medium's Import tool produced a broken article.** §6 item 4 says
   >   "import rather than paste… should be the default". It failed here and the
   >   piece had to be pasted manually, which means the post-publish canonical
   >   fix is not a fallback but the **normal** route. Assume you will need it.
   > - **Medium has no table support.** This article carries two tables; both had
   >   to be rewritten as prose. `scripts/build-crosspost.mjs` does not produce a
   >   Medium variant — one was hand-written to `_crosspost/<slug>.MEDIUM.md`,
   >   with every markdown marker stripped, because Medium's editor renders none
   >   of them. **Any article with a table needs this step.**
   > - **`curl` gets 403 from Medium.** Their bot protection blocks the default
   >   user agent, and a 403 reads exactly like a deleted article. The canonical
   >   check below is useless against Medium without a browser UA:
   >
   > ```bash
   > curl -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 \
   >   (KHTML, like Gecko) Chrome/140.0 Safari/537.36" <url> \
   >   | grep -oE '<link[^>]*rel="canonical"[^>]*>'
   > ```
   >
   > > **dev.to removed the article for "not meeting community guidelines", then
   > > restored it** without an appeal being sent. Worth expecting rather than
   > > panicking about: a piece *about* keyword stuffing and entity manipulation
   > > reads to an automated classifier like a piece *doing* those things. The
   > > canonical being set correctly from the start is what makes the appeal
   > > trivial if it happens again.
   >
   > **Only Medium's backlink is `follow`.** dev.to and Hashnode are `ugc` /
   > `nofollow`, so they pass no ranking equity. Do not present syndication as
   > link building — the return is corroboration and reach into indexes that are
   > not Google's, which is what §6.1 says is actually missing.
   >
   > **Copy the article's metadata; differentiate the index pages.** Slug, title
   > and description on a syndicated *post* should be identical to the original —
   > once the canonical is set, matching metadata tells Google the two documents
   > are one document, which is the goal. The publication's *homepage* is the
   > opposite case: it is **not** canonicalised to anything, so an index titled
   > like `/notebook` competes with `/notebook` as an original, on a domain with
   > more authority. Hashnode's is titled "Suman Debnath — republished notes on
   > AI agents" for exactly that reason, and its About page is "About this
   > notebook" rather than "About Suman Debnath", which would have collided with
   > `/about`'s entity query under §3.1b.
   >
   > **Images: the generator emits JPEG twins under `/notebook/crosspost/`.**
   > dev.to rejects WebP. Hashnode hot-links them from this domain rather than
   > re-hosting, so those files are load-bearing for a published article on
   > another site — do not delete or rename them.
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
   > ~~**Keep `sameAs`, the `rel="me"` links and the footer pills in step.**~~
   > **⚠ SUPERSEDED 9 Sep 2026 — the three surfaces now diverge on purpose.**
   > The original rule is kept because its reasoning still governs the first two.
   >
   > ### The three surfaces answer different questions (9 Sep 2026)
   >
   > At thirteen profiles the old rule became impossible to follow. `Contact.tsx`
   > caps the pill row at **nine** — a hard layout constraint recorded in its own
   > comment, because a tenth wraps it to a third line on a phone. So "keep all
   > three in step" and "the pill row stops at nine" cannot both hold. Resolved
   > toward the layout:
   >
   > | Surface | Grows | Admission test |
   > |---|---|---|
   > | `sameAs` | **Freely** | Is it really your profile? Machine-readable, no layout cost |
   > | `rel="me"` | **Only on reciprocity** | Does that profile emit `rel="me"` back? |
   > | Footer pills | **Curated, capped at nine** | Would a reader want this one? |
   >
   > **`rel="me"` is the one with a real test, and it is not "did we add it
   > everywhere else".** It is a two-way claim: asserting it against a profile
   > that does not answer is the same half-made assertion HuggingFace sat in for
   > months, pointed the other way. Measured 9 Sep — Sessionize emits a plain
   > `rel="nofollow"` back; Stack Overflow and datascienceportfol.io emit no link
   > to this domain at all. None of the four went into `rel="me"`, and that is
   > correct rather than incomplete.
   >
   > **`sameAs` reached thirteen** on 9 Sep 2026: the original six, plus dev.to,
   > Medium and Hashnode (7 Sep), plus **ORCID, Stack Overflow, Sessionize and
   > datascienceportfol.io**. ORCID leads that four — it is the only registry
   > identifier rather than a profile page, and CrossRef pushes works onto it
   > automatically once a DOI exists, so it corroborates without being
   > maintained.
   >
   > **What the old rule was actually protecting is still true:** a profile in
   > `sameAs` that the site never links anywhere a human can see is weaker than
   > one it does. The pill row is where that is paid, and nine of thirteen is a
   > deliberate editorial cut, not drift. Before adding a tenth pill, ask what it
   > displaces — not whether the arrays have the same length.
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

### 6.2 Publishing cadence — why there is no schedule (8 Sep 2026)

**There is no posting schedule and there should not be one.**
`WRITING_INFORMATION_GAIN.md` §1 kills Level 0, admits Level 1 only if nothing
better exists, and sets the target at Level 2 — *real numbers, a specific case,
a named example nobody else has*. That bar is **supply-limited**: it requires
having done something measurable before there is anything to write. No calendar
produces it.

`what-ai-agents-cost-to-run` is the proof. It exists because an agent fleet ran
for two months and produced a real bill. Nothing about a weekly slot would have
generated that piece.

**Own site: event-driven. Realistically 8–12 a year.** The trigger to write is
one of these, never the date:

- Something ran long enough to produce real numbers
- Something broke in a way the documentation does not cover
- The thing people keep asking about got done, and can now be reported

**Volume is not the constraint and never was.** There are 27 articles; §6.1 says
the bottleneck is indexing and inbound corroboration. A twenty-eighth mediocre
post does not help it and costs twice — the set is diluted, and
`BLOG_GUIDELINES.md`'s no-duplicate-question rule gets harder to satisfy with
every post added. **Zero posts in a month is a correct outcome, not a lapse.**

**The three platforms get 1:1 with the site and never anything original.**
Everything syndicated is a canonical'd copy (§6 item 4). Posting original work
to Medium puts the authoritative version on someone else's domain, which is the
exact failure the canonical exists to prevent. So the platforms have no cadence
of their own to manage — no post here, nothing there.

**Stagger the syndication rather than same-day.** On 7 Sep all three went out
the day of publication. Better:

| Day | Action |
|---|---|
| 0 | Publish on this site |
| 0 | `node scripts/indexnow.mjs` |
| +3 to +7 | Syndicate to all three, canonical set, **each one verified by fetching the tag** |

The delay lets this copy be crawled and indexed first. Canonicals should make
that unnecessary — but Medium silently self-canonicalised on the first attempt,
so the assumption that a platform does the right thing is now known to be
unsafe. The wait costs nothing.

> **Cadence is not the lever, and raising it will not move the number.** Of the
> four assistants: Copilot is reachable by IndexNow push, Gemini through Search
> Console, Grok through time. **Claude grounds on Brave, which has no submission
> channel at all — only inbound links move it, and those come from other people
> linking here.**
>
> So the recurring habit worth having is not writing. It is being where the
> audience already is — answering a real question in a thread or a forum where a
> link back is earned rather than dropped. That is what Brave indexes. **One of
> those a week beats one extra article a month**, and it is the half of §6 that
> is still barely started.

---

### 6.3 The off-page programme, executed (8–9 Sep 2026)

§6 was a list for two weeks. This is what happened when it was run, and what it
cost to find out. **Working documents live in the session scratchpad**, one per
destination, plus `ACCOUNTS-AND-PROFILES.md` carrying seven bios at fixed
character counts and every canonical URL.

| Destination | State | Note |
|---|---|---|
| **engrXiv** | **Submitted (8193)** | Replaces TechRxiv. DOI on acceptance |
| **ORCID** | `0009-0006-9581-7890` | Public, bio, 4 URLs, both employments |
| **VentureBeat** | Submitted | ~14 business days; no body links permitted |
| **Open Source India** | Talk proposed | Event 7–8 Oct |
| **Open Source For You** | Idea emailed | `osfyedit@efyindia.com`, idea-first |
| **AI Engineer** | Two CFPs submitted | Code Summit + NYC, via Sessionize |
| **Stack Overflow** | 2 answers | See the 725× note below |
| **datascienceportfol.io** | **Built out 10 Sep** | Was "thin, cheap". Both valuations were wrong — see rule 5 |
| **Wikidata** | **Gated** | Needs two placements published first |
| **HubSpot** | **Held** | No submission address exists — see below |
| **ResearchGate** | **Refused** | See below |

#### Five rules that only emerged by doing it

**1. Verify the venue is open before writing for it.** TechRxiv had the whole
scholarly track designed around it and is closed — submissions suspended for a
platform transition, no timeline. Two further dead ends, worth not
rediscovering: **Zenodo is not indexed by Google Scholar** (their own help pages
say so), and **arXiv requires an endorser** for a first-time poster in any
category since 21 Jan 2026. engrXiv is the one that is actually open: free, no
endorsement, DOI on submission, Scholar-indexed since 2017.

**2. An agent drafting a document the human then attests to is a compliance
question.** engrXiv's AI policy permits idea generation, organisation and
copy-editing; it prohibits **using AI-generated text verbatim, including whole
paragraphs and sections**, and requires disclosure. Disclosure does not make a
prohibited use permitted. The manuscript was rewritten by Suman in his own
words before submission, and the submission is **permanent and cannot be
withdrawn**. Raise this before drafting, never at the checkbox.

**3. Search before writing, with real numbers.** The Stack Overflow plan named
five answers; **two targets exist.** The first answer went to a question with
**109 views** when the canonical question on the same topic has **79,182** —
725×. Three of the five topics have no questions at all. Stack Overflow's own
search hits a CAPTCHA, which must not be worked around; `api.stackexchange.com`
is blocked to WebFetch but reachable from the browser pane's `javascript_tool`,
and returns `view_count`, `score` and `answer_count` votes-sorted.

**4. Read the exclusivity clause, not just the "unpublished" rule.** HubSpot
requires that a published piece **never appear anywhere else, including your own
site** — permanently, with their right to edit it for their own SEO, insert
their CTAs, and delete it. That is a different trade from VentureBeat's and it
costs an article outright. It is also unreachable: their guidelines publish **no
submission address, form or email**, and the practical route is finding an
editor on LinkedIn.

**5. Read the profile you just claimed. `sameAs` asserts a page nobody checked.**
Added 10 Sep 2026, and it is the most embarrassing thing in this file.

`app/layout.tsx` has carried `https://www.datascienceportfol.io/sumandebnath`
in `sameAs` since 9 Sep. On 10 Sep the page it points at was fetched for the
first time. **It said "Sumand Debnath"** — in the `<h1>` and in the `<title>`.

> **A profile whose job is to make one string resolvable did not contain that
> string.** `sameAs` is the site formally asserting "this page is also me", so
> for a day the strongest machine-readable identity claim on 26 routes pointed
> at a page naming somebody who does not exist. It cost nothing to check and
> nobody checked.

The same fault had already happened once, in the same programme, and is
recorded three items above as a passing clause: HuggingFace, 27 Aug — "name
spelling corrected". It was not read as a *class* of failure then. It is one.

- **The check is one fetch.** Confirm the name renders correctly in the heading
  **and** the `<title>` before the URL goes into `sameAs`, not after.
- **It fails silently and looks like success.** The profile exists, renders,
  and is live. Nothing surfaces the problem. Same shape as `saveVisit()`
  returning `false` (`AGENTS.md` §7) and Medium's silent self-canonicalisation
  (§6 item 4) — the pattern this project keeps meeting is *the absence of an
  error is not evidence that anything worked*.

**And "thin, cheap" was wrong in the other direction.** The profile was not
empty — bio, 17 skills, 4 projects, 3 roles. It was about a third of the depth
of the namesake's profile on the same template, which is a different problem
and needs different work. Both valuations came from never having opened the page.

##### The field budgets, measured — so the next one is not guesswork

Every field on that platform silently truncates. Measured 10 Sep by comparing
the ten-project profile that outranks his against what the form accepted:

| Field | Working budget | Notes |
|---|---|---|
| About | **~800 chars** | 793 fit, 924 did not |
| Skills (page-level) | **~300 chars** | Total across all tags — a *character* cap, not a count. Short tokens buy more tags |
| Project title | **66–72** | Cap is higher (89 seen). Bare product names lose — the searchable half goes after the brand |
| Project tags | **6–7 tags, ≤133 chars** | **Capability tags, not stack.** "Envelope encryption", "Row-level authorisation", "Dead-man-switch design" |
| Project description | **≤300** | The strong profiles run 264–300. Anything under ~150 reads unfinished |

> **The tags are skills, not a stack, and that distinction cost a rewrite.**
> The first draft used a house palette — `AI Product Development`, `Next.js`,
> `Supabase` — on every card, which was both generic *and* wrong (neither
> LEGATUS nor ROASmind uses Supabase). The second draft swapped in the real
> `stack` arrays from `lib/archive-projects.ts`, which was the wrong *kind of
> field*. What works is the register Suman had already used on the Banking card
> himself: capabilities the person demonstrated, each provable by a project card
> further down the same page.

> **Write the copy from the repo's product data, never from memory.**
> `components/{aegis,banking,migi,pentashell,qdex}/*-data.ts` export `STATS`,
> `BADGES`, `FEATURES`, `MODEL_SPECS`, `PROOF` and `SCOPE`; the two dossier
> components carry IMPRINT's and LEGATUS's. That is where ~86.7% (not "~87%"),
> Argon2id at 64MB/3 iterations, the 40/25/20/15 weighting and 404-not-403 came
> from. Guessing produced copy that had to be thrown away twice.

#### ResearchGate is refused, and the reason is not the one in §6

Not a link-value judgement. It requires an **institutional email**; the only one
available is PIBM's, and publishing independent work under an employer's address
invites a moonlighting reading. Suman declined it on that basis, which is a
better reason than the item was worth — `nofollow`, minor traffic, and the DOI
plus a Google Scholar profile do the real work without touching an employer.

> **The item was mis-sold in the first plan** as "the easy half" of the
> scholarly track. It never was. Independent researchers without an
> institutional address must appeal manually and show *peer-reviewed*
> publications, which a preprint is not.

#### What is still gated, and on what

| Item | Waiting on |
|---|---|
| Google Scholar profile | The engrXiv DOI being indexed — weeks, and Scholar's timing is not controllable |
| Show HN | The DOI existing; the report is the armour for that comment section |
| Wikidata | **Two** Tier 2 placements published. Self-published sources fail notability, and a deleted item is worse than no item |
| r/LocalLLaMA | **Subreddit** karma. A 6-year account with 18k comment karma still shows 0 there — global karma does not transfer |

---

### 6.4 It is not an indexing problem any more — it is a prominence one (10 Sep 2026)

**Measured across all five engines on "Who is suman debnath?", one run each.
Screenshots; the full log with verbatim answers is `TARGET_QUERIES.md` §10.**

§6.1 is written around a single question — *is this domain in the index?* On
27 Aug the answer was yes for Google and no for everything else, and every
priority in §6.3 follows from that. **Two weeks later three of five engines
demonstrably hold the material**, and the question that decides the outcome has
changed underneath the plan.

| Engine | Holds this domain? | Outcome |
|---|---|---|
| **ChatGPT** | Yes — cited **four** §3.1b entity pages by title | Leads with him. Correct products, correct positioning |
| **Gemini Flash-Lite** | Almost certainly — his bullet is `identity.headline` in substance | Named third of three, **no source chip** where the other two have one |
| **Perplexity** | **Yes — `houseofnamus.com` is in the cited-source panel** | Reduced to the words "brand marketing" in a closing list |
| **Gemini Pro** | No sign of it | Absent. Three namesakes |
| **Claude** | No | Absent. Brave still holds nothing — §6.1's one surviving half |

> **Retrieved-and-demoted is a distinct failure, and it is the new one.**
> `TARGET_QUERIES.md` §2 gained a grade for it — **R** — on this run, because
> the existing five could not express what Perplexity did. **D is fixed by
> getting into an index. R is fixed only by §6.** Treating an R as a D produces
> submission work that is already done; treating it as a C produces another
> article, which will not move it either.

#### What the source panels say, and it is the same thing five times

Every engine that ranked a namesake first ranked him off a page **somebody else
owns**: ORNL's staff directory, Forbes, `ai.engineer`, a Purdue CV PDF, an Amazon
author page, Google Scholar, Science Friday, ResearchGate.

**`sameAs` reached thirteen on 9 Sep and every one of the thirteen is
self-asserted** — his site, his GitHub, his HuggingFace, his LinkedIn, his three
syndication accounts, his ORCID, his profile pages. Not one is a third party
writing about him. That is the whole gap, stated as a count.

> **ChatGPT hedged, and the hedge names the cause.** It wrote "**Claims to have
> built** systems including a 46-agent autonomous AI fleet and a 47-million-
> parameter language model" — and hedged nothing else in the answer. That is what
> a fact with exactly one source looks like when the source is its subject.
>
> **This is reasoning from one observation, not measurement.** It is consistent
> with everything else on this page and it is not proof. Do not quote it as a
> mechanism.

#### What changes in the queue

Nothing is removed and no new destination is added. Three re-rankings, each from
something in the panels rather than from theory:

1. **Pending third-party placements outrank any new self-made surface.** engrXiv's
   DOI, VentureBeat, Open Source For You and the AI Engineer CFPs are the only
   items in §6.3 that end with a page somebody else owns carrying his name.
   Wikidata is gated on two of them anyway, so this is one bottleneck, not two.
2. **The AI Engineer CFP moves to the top of that group.** `ai.engineer` was cited
   by **three of the four engines that did not grade A** — both Geminis and
   Perplexity — inside a single query. §6.3 files it as one submission among six.
   It is the most-read surface anything in the queue touches.
3. ~~**`datascienceportfol.io` is misvalued at "thin, cheap, one more `sameAs`
   node".**~~ **Done 10 Sep 2026 — §6.3 rule 5 has the account and the field
   budgets.** Both Gemini runs cited it — for the *namesake's* profile on it. It
   was a confirmed retrieval surface with a thin page on it, which made it an
   hour of work against a measured target rather than a throwaway.

   **Verified live the same day:** the name renders correctly, and nine project
   cards run 66–72-character titles, 120–130 characters of tags and 282–300
   characters of description against the namesake's 264–300 — so on the one
   platform confirmed to sit in Gemini's retrieval set, this is now the deeper
   profile rather than a third of one. **ROASmind was deliberately left off**;
   it is the only product in `lib/resume.ts` marked *In Testing*, and nine
   shipped things read stronger than ten with a promise among them.

   > **Strengthened the same day by a second instrument** —
   > `TARGET_QUERIES.md` §10, search-index spot check, 10 Sep 2026. Four cold
   > queries, 35 slots, this domain absent from all of them, and
   > `datascienceportfol.io` and `ai.engineer` returned on **4 of 4 queries
   > each** — both for the namesake.
   >
   > **The finding that changes the reasoning: three of the platforms in
   > `sameAs` are ones the namesake already dominates.** Sessionize,
   > datascienceportfol.io and dev.to all return *his* page, and on dev.to he
   > holds `dev.to/debnsuma` against `dev.to/suman_debnath_1`. **A profile on a
   > domain a competitor owns the top slot on is not an independent source
   > corroborating you** — it is a thin page filed underneath an established one
   > on the same host. That is a better argument for filling these out than
   > "one more node", and a worse one for opening a fourth.
   >
   > It does not reopen §6.3's queue. It sharpens why item 1 above — pages
   > somebody else *writes about him* — is the category that actually pays.

> **§6.2's closing note is now evidence-backed rather than reasoned.** It says
> the recurring habit worth having is answering real questions where they are
> asked, and that "one of those a week beats one extra article a month… the half
> of §6 that is still barely started". **Perplexity and Brave are the two engines
> being lost, and both weight community and forum content heavily.** The note was
> written from first principles; this run is the first measurement pointing the
> same way.

#### What this does *not* license

- **No new pages.** ChatGPT cited four entity pages by title and the §3.1b table
  predicted exactly which four. The on-site half is working, and
  `TARGET_QUERIES.md` §11's rule stands: a bad identity grade is never a missing
  page.
- **No fifth namesake, and no new negation.** The run surfaced two more — a
  full-stack developer with his own `sumandebnath` portfolio site, and an NIT
  Agartala electrical engineer on about.me. §6's refusal of 26 Aug 2026 covers
  this and is not reopened by there being more of them; that was the argument
  *for* the refusal.
- **No cadence change.** §6.2 holds. Volume was not the constraint and this run
  does not make it one.

> **Every grade here is a single run.** §7's rule is three runs and the modal
> answer, and this satisfies none of it. **The three re-rankings above are drawn
> from the cited-source panels, not from the ordering** — which index holds what
> does not vary between runs, and that is the only reason they are actionable on
> one sample. Re-run before quoting any grade.

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
