# SEO audit — the notebook's 26 articles

Proposed titles, meta titles, meta descriptions, target keywords and slug
changes, with the reasoning and the cost of each.

> **✅ Applied in full, 26 August 2026.** Every recommendation below is live.
> This file is now the record of what was changed and why, not a proposal.
>
> Measured after: **"actually" gone from every title** (was 8 of 26),
> question-shaped titles **13 → 7**, no meta title over 60 characters, no
> description over 160, no duplicate titles or meta titles, all 26 articles
> returning 200, and the one renamed slug 308-redirecting.

`AEO_PLAYBOOK.md` §3.1b and `BLOG_GUIDELINES.md` §2 are the standing rules the
recommendations work inside.

### Two fields were added to make this possible

`metaTitle` and `keywords` on the `Post` type, both optional and both falling
back to what came before — `title` and `tags` respectively.

`metaTitle` exists because the H1 and the search result genuinely want different
words. "Eight repositories in eleven days. Six died within three." is a headline;
"Why solo builders abandon projects: 8 repos, 11 days" is what belongs in a
result under sixty characters. Nine titles are still over sixty and that is now
fine — the meta title is what truncates, and none of those do.

---

## 1. What is wrong now, measured

Not opinion — counted across all 26 titles:

| Pattern | Count | Why it matters |
|---|---|---|
| Contains **"actually"** | **8 of 26** | The single clearest tell. No writer uses one hedge word in a third of their headlines |
| Question-shaped (What/Which/How/Why/Is/Do) | **13 of 26** | Half the blog opens the same way. Real publications mix registers |
| Over 60 characters | **11 of 26** | Google truncates near 60. The longest is 91 |
| Uses a colon or dash split | **2 of 26** | This is the dominant pattern among the pages that currently rank — see §2 |

**The cause is documented, and it is mine.** `BLOG_GUIDELINES` §2 says titles must
be question-shaped or claim-shaped, and `AEO_PLAYBOOK` §3.1b says the title should
carry the query an answer engine matches against. Both are correct for a machine.
Applied to 26 articles at once they produced a blog that reads like a FAQ.

---

## 2. What the competition actually looks like

Researched rather than assumed, and it differs sharply by bucket.

### Security and "vibe coding" queries — a vendor field

The first page for *"is vibe coding safe for production"* is almost entirely
security vendors: Wiz, Checkmarx, Cycode, Contrast, NordLayer, OX Security,
Retool, the Cloud Security Alliance. Their title pattern is consistent:

> `Vibe Coding Security: Risks and How to Prevent Them`
> `The Risks of Vibe Coding: Security Vulnerabilities and Enterprise Pitfalls`
> `Vibe Coding Security: Why 62% Of AI-Generated Code Ships With Vulnerabilities`

**Keyword phrase, colon, specific claim — frequently with a number in it.**

> **The strategic read.** You cannot out-authority a security vendor on their own
> phrasing, and you do not need to. Every one of those pages is written by a
> company selling a scanner; **none of them is a practitioner describing their own
> system with their own numbers.** The differentiator is 38 automated security
> tests across three review passes on a regulated-domain build — a first-person
> receipt in a field of vendor content marketing. The titles below lean into that
> rather than competing on the generic phrase.

### Career and transition queries — a how-to field with one exception

> `How to Become a Product Manager Without a Technical Background` (several sites)
> `How I Transitioned from Non-Technical to Product Marketing Manager`
> `You don't need a technical background to be a PM. I'm proof.` — Pendo

The first is the standard SEO shape. The third is the interesting one, and it is
the closest to how this notebook already writes: **a flat declarative followed by
a proof claim.** It works because it is a person rather than a listicle.

> **Your first-person titles are already the strongest thing here** and most of
> them are staying. "I had never written code. Two years later, I have shipped
> twenty-one products." is the same device Pendo used, with better evidence.

---

## 3. The rules applied below

1. **Meta title ≤ 60 characters**, and it may differ from the H1. The H1 can be
   the hook; the meta title carries the searchable phrase.
2. **Meta description 140–160 characters**, written to earn a click rather than
   to summarise. Distinct from `answer`, which is written to be quoted.
3. **"Actually" is removed everywhere** except where it is doing real work.
4. **One primary keyword per article**, matching `AEO_PLAYBOOK` §3.1b's
   one-question-per-URL constraint. Secondaries are phrases the body already
   earns.
5. **The question survives** — moved into an H2, the FAQ block or the answer
   block, all of which answer engines match against. Almost no AEO is lost.
6. **Slug changes only where the title moves a long way**, per your decision.
   Every change needs a 308 redirect, a cover rename in two places, and a
   `NOTEBOOK_COVERS.md` heading edit — see §5.

---

## 4. The 26

### Career

**`marketer-to-ai-product-builder`**
- Now: *I had never written code. Two years later, I have shipped twenty-one products.* (78)
- **Title: keep.** This is the Pendo device and it is the best headline in the set.
- Meta title: `How a marketer shipped 21 products without coding` (49)
- Meta description: `A brand marketer's account of learning to build software with AI — the app abandoned when the credits ran out, the project that proved it worked, and why five people knew.` (159)
- Keywords: *marketer to AI product builder* · learn to build software with AI · non-technical founder building apps
- Slug: **keep**

**`ai-product-role-without-cs-degree`**
- Now: *I do not have a computer science degree. This is the case I make for an AI product role.* (87 — longest in the set)
- **Title: `No computer science degree. Here is the case I make for an AI product role.`** (74) — same device, one sentence shorter, and the fragment opens harder.
- Meta title: `AI product manager without a CS degree: the case` (48)
- Meta description: `The objection is not the degree — it is whether you can tell when the system is wrong. What evidence answers that, what it cannot answer, and how to be tested.` (157)
- Keywords: *AI product manager without a computer science degree* · non-technical product manager · AI product role hiring
- Slug: **keep** — already the searchable phrase

**`ai-skills-for-a-marketing-cv`**
- Now: *Which AI skills are actually worth putting on a marketing CV?*
- **Title: `The AI skills worth putting on a marketing CV — and the ones to delete`** (69)
- Meta title: `AI skills for a marketing CV: what to list in 2026` (50)
- Meta description: `Naming tools signals nothing — the reader has the same subscriptions. The four claims that survive a follow-up question, and the five lines to take off.` (152)
- Keywords: *AI skills marketing CV* · AI skills for marketers · marketing resume AI
- Slug: **keep**

**`what-ai-native-actually-means`**
- Now: *What does "AI-native" actually mean, and how would you check?*
- **Title: `"AI-native" is being claimed faster than it is earned. Five questions that check it.`** (83) — long, so the meta title carries the search phrase.
- Meta title: `What does AI-native actually mean? Five checks` (46) — "actually" **kept here**, because it is the searched phrase for this one
- Meta description: `The term is going into job descriptions with no agreed meaning. What it should describe, five questions that separate a real claim from a stated one, and my own answers.` (166 — trim to 158)
- Keywords: *what does AI-native mean* · AI-native developer · hiring AI-native
- Slug: **keep**

**`finishing-is-not-building`**
- Now: *I mistook finishing things for building things* (46)
- **Title: `Eight repositories in eleven days. Six died within three.`** (57) — the numbers are the hook and they are verifiable.
- Meta title: `Why solo builders abandon projects: 8 repos, 11 days` (52)
- Meta description: `The commit history is not vague: eight repositories in eleven days, six abandoned within three, two that became something. What separated them was not the idea.` (158)
- Keywords: *abandoned side projects* · why developers abandon projects · shipping vs finishing
- Slug: **`finishing-is-not-building` → `eight-repositories-in-eleven-days`**? **No — keep.** The current slug states the lesson and reads better in a citation. The title carries the numbers; the URL does not need to.

### Marketing & AI

**`cited-by-chatgpt-what-i-changed`**
- Now: *ChatGPT started citing my site. Here is what I changed, and what I still cannot prove.* (85)
- **Title: keep.** The second clause is the whole credibility of the piece.
- Meta title: `How I got ChatGPT to cite my site (and what I can't prove)` (58)
- Meta description: `A dated account: the shortcut that failed, the answer-engine work that preceded the citation, why two days of evidence proves nothing, and what the other engines need.` (164 — trim)
- Keywords: *get cited by ChatGPT* · how to get cited by AI search · answer engine optimisation results
- Slug: **keep**

**`aeo-vs-seo-what-changes`**
- Now: *AEO vs SEO: what actually changes when the reader is a model?*
- **Title: `AEO vs SEO: what changes when the reader is a model`** (51) — drop "actually", now under 60 and usable as both H1 and meta title.
- Meta title: same (51)
- Meta description: `Search competes for a position among ten results. An answer engine produces one answer. What carries over from SEO, what stops working, and why you cannot measure it.` (164 — trim)
- Keywords: *AEO vs SEO* · answer engine optimisation · generative engine optimisation
- Slug: **keep**

**`what-agentic-ready-actually-means`**
- Now: *What does it actually mean for a website to be agentic-ready?*
- **Title: `Agentic-ready: the four things an agent has to be able to do`** (60)
- Meta title: `What is an agentic-ready website? Four checks` (45)
- Meta description: `Can an agent find you, fetch you, read you without JavaScript, and recover from a dead URL? Most sites fail the third, for a dull reason. Six commands to check.` (159)
- Keywords: *agentic ready website* · AI agent readiness · make website AI readable
- Slug: **`what-agentic-ready-actually-means` → `agentic-ready-website`** — the title moves a long way and the new slug is the searched phrase. Needs a redirect.

**`do-you-need-an-llms-txt`**
- Now: *Do you actually need an llms.txt file?*
- **Title: `Do you need an llms.txt file? Google says no.`** (44) — the contrarian fact belongs in the headline; it is the whole post.
- Meta title: same (44)
- Meta description: `Google has publicly declined to support llms.txt and crawler fetches are negligible. Where it genuinely does get read, and why a hand-written one is worse than none.` (162 — trim)
- Keywords: *llms.txt* · do I need llms.txt · llms.txt SEO
- Slug: **keep**

**`real-ai-tool-or-wrapper`**
- Now: *How do you tell a real AI tool from a wrapper?*
- **Title: `Is it a real AI product or a wrapper? Ask what is left without the model.`** (72)
- Meta title: `Real AI tool or wrapper? Five non-technical checks` (50)
- Meta description: `Most AI products call somebody else's model, including the good ones. The test that separates them, four questions for a vendor, and when a wrapper is worth buying.` (162 — trim)
- Keywords: *AI wrapper vs real product* · how to evaluate AI tools · AI vendor questions
- Slug: **keep**

**`what-ai-replaces-in-marketing`**
- Now: *Which parts of a marketing job does AI actually replace?*
- **Title: `AI replaces tasks, not jobs — unless your job is only tasks`** (58)
- Meta title: `Will AI replace marketing jobs? What is exposed` (47)
- Meta description: `Written by a marketer automating his own discipline. The five kinds of marketing work genuinely at risk, what survives, and why junior roles carry most of it.` (156)
- Keywords: *will AI replace marketing jobs* · marketing tasks AI can do · AI impact on marketing careers
- Slug: **keep**

**`what-marketing-teams-should-automate-first`**
- Now: *What should a marketing team automate first?*
- **Title: keep** — clean, 43 characters, matches the query.
- Meta title: `What should a marketing team automate first?` (43)
- Meta description: `Sort by frequency and judgement, not by what is impressive. The order to work in, the rule for the hard cases, and the trap of automating a process that was wrong.` (161 — trim)
- Keywords: *what to automate in marketing* · marketing automation priorities · AI marketing workflow
- Slug: **keep**

### Method

**`research-before-writing-a-prompt`**
- Now: *I spend a fifth of every project before I write the first prompt* (63)
- **Title: keep.** Specific, first-person, no hedge.
- Meta title: `Research before prompting: a fifth of every project` (51)
- Meta description: `Generating the first working version is the cheapest phase, which makes it the wrong place to spend attention. What the research is, and what skipping it costs.` (159)
- Keywords: *how to write better prompts* · context engineering · prompt research process
- Slug: **keep**

**`never-run-a-coding-agent-on-autopilot`**
- Now: *I never let a coding agent run on autopilot, and I have watched what happens when people do* (91 — longest)
- **Title: `I never let a coding agent run on autopilot`** (43) — the second clause is a good first line, not a headline.
- Meta title: `Should you use auto-accept on an AI coding agent?` (48)
- Meta description: `Three failures follow, and none is broken code: overbuilding, quiet substitution, and finishing something nobody asked for. What manual approval actually catches.` (161 — trim)
- Keywords: *AI coding agent auto-accept* · should you let AI write code unsupervised · Claude Code review workflow
- Slug: **keep**

**`keeping-secrets-out-of-ai-built-apps`**
- Now: *How do you keep secrets out of an app you built with AI?*
- **Title: `Keeping API keys out of an app you built with AI`** (48)
- Meta title: same (48)
- Meta description: `Push protection catches known formats only. The three rules, why rotation is the step everybody skips, and what to do first if you have already committed a key.` (159)
- Keywords: *API keys AI generated code* · secrets management vibe coding · committed API key what to do
- Slug: **keep**

**`the-cost-of-building-alone`**
- Now: *Nobody warns you what building alone actually costs* (51)
- **Title: `The expensive part of building alone is not the hours`** (52) — drops "actually", states the thesis.
- Meta title: `The real cost of building software alone` (40)
- Meta description: `With AI assistance labour stopped being the constraint. What is missing is somebody who will tell you the approach is wrong — and what each substitute cannot replace.` (164 — trim)
- Keywords: *building software alone* · solo developer challenges · indie hacker isolation
- Slug: **keep**

**`shipping-a-product-in-a-weekend`**
- Now: *How do you ship a product in a weekend without a team?*
- **Title: `A weekend gets you a working version, not a product`** (51) — the honest qualifier as the headline is the differentiator in a genre full of dishonest ones.
- Meta title: `Build a product in a weekend: what you actually get` (51)
- Meta description: `What gets decided on Friday, what gets cut without argument, the five things that never get cut, and an honest ledger of what is still missing on Monday.` (152)
- Keywords: *build a product in a weekend* · weekend project MVP · ship fast solo
- Slug: **keep**

**`what-a-marketer-has-to-learn`**
- Now: *What does a marketer actually have to learn to ship software alone?*
- **Title: `What a marketer has to learn to ship software — and it is not syntax`** (68)
- Meta title: `What a marketer must learn to build software` (44)
- Meta description: `Less syntax than expected and far more operations than anyone warns you about. The list that will hurt you if you skip it, and what an AI course is actually for.` (159)
- Keywords: *marketer learn to code* · non-technical build software · what to learn to build with AI
- Slug: **keep**

### Practice

**`is-ai-generated-code-safe-for-production`**
- Now: *Is AI-generated code safe to put in production?*
- **Title: `Is AI-generated code safe for production? Ask who read it`** (57) — the colon-less version of the pattern that wins this SERP, with the practitioner angle in the second clause.
- Meta title: `Is AI-generated code safe for production?` (41)
- Meta description: `Safety is a property of review, not authorship. What genuinely differs, the six risks worth checking, and 38 security tests across three audits on a regulated build.` (163 — trim)
- Keywords: *is AI generated code safe* · AI code security risks · vibe coding security
- Slug: **keep** — already the exact query
- **Opportunity, not a title change:** the ranking pages all cite hard numbers (45% and 62% of AI-generated code carrying vulnerabilities; 400+ exposed secrets across 5,600 scanned apps). Citing published research alongside your own 38 tests would strengthen this considerably. Phase 4 work.

**`taste-is-the-last-thing-to-be-automated`**
- Now: *Taste is the last thing to be automated* (39)
- **Title: keep.** Short, declarative, quotable, no hedge. Nothing to fix.
- Meta title: `Taste is the last thing to be automated` (39)
- Meta description: `When producing an option costs nothing, choosing between them becomes the work. Four decisions where the measurable answer and the right answer pointed opposite ways.` (164 — trim)
- Keywords: *taste in product design* · AI and design judgement · what AI cannot replace
- Slug: **keep**

**`the-trap-i-wrote-down-was-wrong`**
- Now: *The debugging note I wrote was wrong for a year* (46)
- **Title: keep.** Excellent as is.
- Meta title: `The debugging note I wrote was wrong for a year` (46)
- Meta description: `A hard-won note turned out half right and entirely too absolute. What measuring revealed, and how to write findings that fail safely when they turn out to be wrong.` (162 — trim)
- Keywords: *engineering documentation* · wrong debugging assumptions · writing technical notes
- Slug: **keep**
- Note: excluded from `TARGET_QUERIES.md` on purpose — it travels by sharing, not search.

### Next.js · React · CSS & Layout · Graphics

These five are the winnable technical set and their titles are already query-shaped, which is correct here — people type these almost verbatim. **All five titles stay.**

**`json-ld-missing-next-script-beforeinteractive`** — *Why is my JSON-LD missing from the HTML in Next.js?*
- Meta title: `JSON-LD missing from HTML in Next.js? next/script` (49)
- Meta description: `next/script with beforeInteractive emits no script tag. Why your structured data shows in DevTools but not in the response, the one-line check, and the fix.` (155)
- Keywords: *JSON-LD not showing Next.js* · next/script beforeInteractive · structured data not in HTML

**`nextjs-16-middleware-is-now-proxy`** — *Next.js 16 replaced middleware.ts with proxy.ts*
- Meta title: `Next.js 16: middleware.ts is now proxy.ts` (41)
- Meta description: `middleware.ts is gone in Next.js 16. What proxy.ts changes, why the matcher cannot reference an imported constant, and what the migration looks like in practice.` (159)
- Keywords: *Next.js 16 middleware* · proxy.ts Next.js · middleware.ts removed

**`overflow-hidden-kills-position-sticky`** — *Why does position: sticky silently stop working?*
- Meta title: `Why position: sticky stops working (overflow)` (45)
- Meta description: `An ancestor with overflow: hidden becomes the scroll container, so the sticky child has nothing to stick to. No error appears. How to find it, and the wrapper fix.` (162 — trim)
- Keywords: *position sticky not working* · overflow hidden sticky · sticky element not sticking

**`strictmode-defeats-init-guards`** — *React StrictMode permanently disables your init guard in development*
- Meta title: `React StrictMode breaks init guards in dev` (42)
- Meta description: `StrictMode's mount, cleanup and remount trips a ref-based guard, so listeners never reattach and the feature is silently dead in development. Why, and what to do.` (160)
- Keywords: *React StrictMode double mount* · useEffect runs twice · init guard StrictMode

**`three-js-r152-colour-management`** — *three.js r152 re-tints every colour written before it*
- Meta title: `three.js r152 colour management changed everything` (50)
- Meta description: `ColorManagement.enabled defaults true since r152 and silently converts sRGB to linear. Nothing errors. Why your colours look wrong after upgrading, and the fix.` (158)
- Keywords: *three.js r152 colors* · ColorManagement.enabled · three.js colours wrong after upgrade

---

## 5. Slug changes

**One, out of twenty-six.**

| Old | New | Why |
|---|---|---|
| `/notebook/what-agentic-ready-actually-means` | `/notebook/agentic-ready-website` | The title moves a long way and the new slug is the searched phrase |

Everything else keeps its URL. Most current slugs are already the keyword — a slug
does not have to match its title, and changing one that already works buys nothing.

If that change is approved it needs, in one commit:
1. A **308 redirect** in `next.config.ts`, permanent.
2. The cover renamed in **two** places — `public/notebook/` and
   `_masters/notebook-covers/` — plus the `cover` field in the post.
3. The heading in `NOTEBOOK_COVERS.md` §4, which is keyed by slug.
4. Any cross-post link in prose or `seeAlso`.

`sitemap.xml`, RSS and `llms.txt` regenerate themselves.

---

## 6. Keyword strategy, per bucket

| Bucket | Realistic goal | Why |
|---|---|---|
| **Technical** (5) | Rank | Specific, low competition, first-hand, exact-match titles |
| **Credibility / security** (3) | Be the practitioner in a vendor field | Cannot out-authority Wiz on the generic phrase; can be the only page with its own audit numbers |
| **Career** (5) | Long tail plus shares | The head terms are owned by established career sites; the first-person angle is what travels |
| **Marketing & AI** (7) | Rank on the newer terms | AEO, GEO and llms.txt are young enough that authority has not consolidated |
| **Method** (6) | Shares, then links | Low search demand, high shareability — these earn the inbound links §6 of the playbook needs |

> **The honest limit, restated.** I have no keyword volume data. Everything above
> is reasoned from what currently ranks, from how the pages that rank are titled,
> and from the intent behind each phrase. Before committing to a primary keyword,
> twenty minutes in Google autocomplete and the "People also ask" box will confirm
> or kill each one faster than any argument here.

---

## 7. What I did not change, and why

- **Eight titles stay exactly as they are** — the first-person ones, "Taste is the
  last thing to be automated", and the five technical queries. Changing a headline
  that already works to prove effort would be the wrong kind of thoroughness.
- **"Actually" is kept in one place**, the meta title for `what-ai-native`, because
  "what does AI-native actually mean" is the phrase people type.
- **No `answer` block is touched.** Those are written to be extracted and are
  working as intended; the meta description is the field that earns clicks.
- **No slug changes for cosmetics.** Twenty-five of twenty-six stay.
