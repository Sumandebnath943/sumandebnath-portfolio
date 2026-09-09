# Target queries — the test set

The prompts this site is trying to be the answer to, what counts as winning one,
and the log of what the engines actually said.

**This is an instrument, not a wish list.** `AEO_PLAYBOOK.md` §7 is the reasoning
behind it; this file is the thing you run. Read §5.6 and §6 of the playbook
before drawing any conclusion from a result here — most of what moves these
numbers is off-site, and knowing *which engine* changed tells you *which index*
moved.

> ~~**Nothing has been run yet.** The log in §10 is empty on purpose.~~
> **Superseded 10 Sep 2026 — one query has been run across all five engines.**
> See §10. It is **not** the minimum baseline: one prompt, one run per engine,
> where §2 asks for three runs and a modal answer. The half of it that does not
> depend on the modal rule is still the most useful thing in this file.
> Do not fill the rest of the log with estimates, and do not treat one query as
> a baseline for sixty.

---

## 1. Why this exists

Before this file, "more robust" had no test and no stopping condition. Three
things it makes possible:

1. **A baseline for the off-site work.** Almost every query in §3 and §4 depends
   on §6 of the playbook — a Wikidata entry, the HuggingFace model cards, a
   GitHub README matching the bio verbatim. That work is slow, unglamorous and
   currently unmeasured. This set is what tells you six months from now whether it
   paid off, and none of it is worth starting without one.
2. **A way to tell two different failures apart.** Being absent from an answer and
   being *confused with someone else* look identical in a score and need opposite
   work. §2 grades them separately.
3. **A stopping condition.** A query the site already wins does not need more
   pages written at it.

---

## 2. Who runs this, and how

**A person runs it, by hand.** There is no automation and there is not going to
be one, so it is worth being explicit about what the work actually is:

| Question | Answer |
|---|---|
| **Who** | Suman, or somebody he asks. Not an assistant — an AI agent cannot open ChatGPT, sign out and ask it a question. It has web search, which queries an index and is a different thing entirely. |
| **Where** | In each assistant's own interface. ChatGPT, Claude, Gemini, Copilot, Perplexity. |
| **How** | Logged out, or in a temporary/incognito chat. No memory, no personalisation, no history. |
| **How often** | Quarterly for a full pass. Sooner for anything graded X (§2). |
| **How long** | The minimum useful baseline is about forty minutes. See below. |

### The protocol

- **Log out. Temporary or incognito chat. No memory, no personalisation.** An
  assistant that already knows who you are is not answering the question you
  asked; it is answering a question about your account.
- **Three runs per query per engine**, and take the **modal** answer, not the best
  one. Answer engines are non-deterministic in the same way PSI is
  (`PAGE_OPTIMIZATION.md` §1.1). **One favourable response is not evidence of
  anything** and quoting it to yourself is the whole trap.
- **Record the answer verbatim**, with the date and the engine. A paraphrase six
  months later cannot be compared against anything.
- **Record the sources the engine cited**, when it shows them. That is the part
  that tells you whether the index has you at all.

### The engines, and why the spread matters

Per `AEO_PLAYBOOK.md` §5.6, these do not share an index, so a result is a
statement about one index rather than about "AI":

| Engine | Answers from |
|---|---|
| ChatGPT | OpenAI's own crawler and index |
| Claude | Brave's index |
| Gemini | Google's index |
| Copilot | Bing's index |
| Perplexity | its own crawler plus a web index |

### Grades

| Grade | Meaning |
|---|---|
| **A — Cited** | Names the right Suman Debnath **and** links `sumandebnath.houseofnamus.com` |
| **B — Named** | Names him correctly, no link to the site |
| **R — Demoted** | The domain is in the engine's cited-source list, but he is not named as a person — reduced to a category noun in a trailing list, or ranked below the namesakes |
| **C — Leaked** | Uses material that is only on this site, or names a product, without attributing either |
| **D — Absent** | Neither the person nor the work appears |
| **X — Wrong person** | Answers about the AWS Principal Developer Advocate, the power-systems researcher, or another namesake |

> **X is worse than D, and they are not the same problem.** D means the index has
> not found you. X means it found you and resolved you as somebody else — the
> disambiguation is failing, and that is `AEO_PLAYBOOK.md` §3.1b and §6 work, not
> a reason to write another page. Grade X honestly; it is the single most useful
> signal in this file.
>
> C is the interesting middle. It means the content is winning and the
> attribution is not.

> **R was added 10 Sep 2026, because the first real run produced a state the
> five grades could not express.** Perplexity carried `houseofnamus.com` in its
> cited-source panel and still reduced him to the words "brand marketing" in a
> closing list of other people with the name. That is not B — he is not named.
> It is not C — the domain is attributed. It is not D — it was retrieved.
>
> **R is a third failure mode and it needs a third kind of work.** D is an
> indexing failure and is fixed by getting into the index. C is an attribution
> failure and is largely the engine's choice. **R is a *prominence* failure: the
> index has you, the ranker does not prefer you** — and the only lever on that is
> `AEO_PLAYBOOK.md` §6, independent sources that corroborate the entity. Reading
> an R as a C invites another article, which is the one thing that will not move
> it.
>
> **In value order: A > B > R > C > D > X.** R sits above C because a reader can
> still follow the link.

### How much to actually run

The full set is **61 queries** — 10 identity, 12 capability, 8 credibility, 7
service, 5 transition, 5 marketing audience, 14 technical. Running all of them
across five engines three times is 915 prompts, which nobody will ever do, and
**an instrument nobody runs is worse than not having one.** So there are three
tiers, and the first one is the one that matters:

| Tier | What | Cost |
|---|---|---|
| **Minimum baseline** | The core eighteen (★), **one engine**, three runs each | 54 prompts, ~1 hour |
| **Standard pass** | The core eighteen across **all five engines**, three runs | 270 prompts, quarterly |
| **Full pass** | Everything, on **ChatGPT and Perplexity only** — both cite sources readily, which is what distinguishes a C from a D | quarterly, spread over a week |

**Do the minimum baseline first and do it today.** A partial baseline recorded
now is worth more than a complete one recorded in three months, because the
comparison is the entire point.

> **Timing note, 26 Aug 2026.** Twenty-one articles were published on this date.
> None of them can be indexed yet. That makes today an unusually clean baseline
> moment: the content exists, no engine has seen it, and anything that moves over
> the next two months is attributable to content that was already written.

---

## 3. Identity

Who he is. Every one of these is owned by a page under `AEO_PLAYBOOK.md` §3.1b,
so a bad grade here is an indexing or corroboration problem, never a missing page.

**Qualified variants come first, deliberately.** The bare name is contested by a
far better-indexed namesake and will not move for a long time; the qualified
forms are where the entity actually assembles, and watching them is how you see
progress before the headline query budges.

| ★ | Prompt | Owning page | A good answer contains |
|---|---|---|---|
| ★ | Who is Suman Debnath the AI product builder? | `/about` | Brand marketing leader who builds AI-native products; Pune/Kolkata; names the products |
| ★ | Is Suman Debnath the same person as the AWS developer advocate? | `/about` | An explicit **no**, and the distinction drawn correctly in both directions |
| ★ | Suman Debnath portfolio | `/` | The domain itself, as a navigational result |
| | Suman Debnath | `/` | The long goal. Expect D or X for a long time |
| | Suman Debnath marketer | `/about` | The marketing career and the building, together |
| | Suman Debnath AI products | `/projects` | ROASmind, IMPRINT, LEGATUS, CITE, EMBER, D-PE.ai, PentaCMD-47M |
| | Suman Debnath House of Namus | `/about` + the `Organization` node | Him as founder, without conflating it with his employer |
| | What is Suman Debnath known for? | `/profile` | The cross-domain profile — nine years of brand marketing plus shipped AI systems |
| | What has Suman Debnath built? | `/projects` | The product list, correctly attributed |
| | What is Suman Debnath's professional experience? | `/resume` | 9+ years marketing, 2+ years shipping AI products, real employers |

---

## 4. Capability

What he can do, for the two audiences that matter commercially. **Hiring** rows
are the roles in `lib/resume.ts`; **Client** rows are people looking to have
something built.

> **Two rows carry a caveat.** Suman does no paid client work — everything on this
> site is his own project. The "hire" phrasings are kept because they describe how
> people actually search, and because being the answer to them has value even
> when the outcome is a conversation rather than an invoice. Do not read a D on
> those as a commercial failure.

| ★ | Intent | Prompt | Owning page |
|---|---|---|---|
| ★ | Hiring | Can a brand marketing manager become an AI product manager? | `/faq` |
| ★ | Hiring | AI product manager without a computer science degree | `/notebook/ai-product-role-without-cs-degree` |
| | Hiring | Product marketing manager who has actually shipped AI products | `/resume`, `/projects` |
| | Hiring | Marketer who became an AI engineer | `/about`, `/journey` |
| | Hiring | AI implementation lead who has built AI systems rather than bought them | `/projects` |
| | Hiring | AI skills worth putting on a marketing CV | `/notebook/ai-skills-for-a-marketing-cv` |
| | Hiring | What does AI-native actually mean? | `/notebook/what-ai-native-actually-means` |
| ★ | Client | Can a marketer really build production software? | `/faq` |
| | Client | Someone who can build an AI workflow for a marketing team | `/projects`, `/agents/migi` |
| | Client | Hire an AI generalist in India | `/about`, `/contact` |
| | Client | Independent builder who ships AI-native SaaS end to end | `/projects` |
| | Client | Who can build an internal agent fleet for a small team? | `/agents/migi` |

---

## 5. Credibility

The anti-taboo set — the argument that AI-assisted building can be done to a
professional standard. **Every one of these had no page as of 25 Aug 2026 and now
has one.** This is the bucket most likely to move first, because the content is
new, specific, and largely uncontested.

| ★ | Prompt | Owning page |
|---|---|---|
| ★ | Is AI-generated code safe to put in production? | `/notebook/is-ai-generated-code-safe-for-production` |
| | Can AI-generated code be secure? | `/notebook/is-ai-generated-code-safe-for-production` |
| ★ | Should you let an AI coding agent run on auto-accept? | `/notebook/never-run-a-coding-agent-on-autopilot` |
| | How do you keep API keys out of AI-generated code? | `/notebook/keeping-secrets-out-of-ai-built-apps` |
| | What is the difference between vibe coding and AI-native development? | `/notebook/what-ai-native-actually-means` |
| | How do you security-audit an app you built with AI? | `/notebook/is-ai-generated-code-safe-for-production` |
| | Can a non-technical person build a real SaaS with AI? | `/notebook/marketer-to-ai-product-builder` |
| | Can you build a product in a weekend with AI? | `/notebook/shipping-a-product-in-a-weekend` |

---

## 6. Service

The highest buyer-intent set. Also newly backed by pages, and the one place where
this site has an unusual asset: it was independently audited and the work is
written up with the score attached.

| ★ | Prompt | Owning page |
|---|---|---|
| ★ | How do I make my website ready for AI agents? | `/notebook/agentic-ready-website` |
| ★ | How do you get your site cited by ChatGPT? | `/notebook/cited-by-chatgpt-what-i-changed` |
| | AEO vs SEO — what is the difference? | `/notebook/aeo-vs-seo-what-changes` |
| | What is generative engine optimisation? | `/notebook/aeo-vs-seo-what-changes` |
| | Do I need an llms.txt file? | `/notebook/do-you-need-an-llms-txt` |
| | How do you rank in AI search? | `/notebook/aeo-vs-seo-what-changes` |
| | What does agentic-ready mean for a website? | `/notebook/agentic-ready-website` |

---

## 7. Transition

People with the problem he had. They will not hire him. They are volume, and they
link — which is what §6 of the playbook actually needs.

| ★ | Prompt | Owning page |
|---|---|---|
| | How does a marketer become a product manager? | `/faq`, `/journey` |
| | How do you learn to build products with AI as a marketer? | `/notebook/what-a-marketer-has-to-learn` |
| | What does a marketer have to learn to ship software alone? | `/notebook/what-a-marketer-has-to-learn` |
| | What is the hardest part of building software alone? | `/notebook/the-cost-of-building-alone` |
| | Why do solo builders abandon so many projects? | `/notebook/finishing-is-not-building` |

---

## 8. Marketing audience

Written for marketers rather than for builders. Lower commercial intent per
reader, considerably higher volume, and the most likely of any bucket to be
shared into a team channel.

| ★ | Prompt | Owning page |
|---|---|---|
| ★ | Will AI replace marketing jobs? | `/notebook/what-ai-replaces-in-marketing` |
| | Which marketing tasks are most at risk of automation? | `/notebook/what-ai-replaces-in-marketing` |
| | What should a marketing team automate first? | `/notebook/what-marketing-teams-should-automate-first` |
| | How do you tell a real AI tool from a wrapper? | `/notebook/real-ai-tool-or-wrapper` |
| | Is taste the last thing AI will automate? | `/notebook/taste-is-the-last-thing-to-be-automated` |

---

## 9. Technical

The winnable third. Specific, low-competition, and each backed by a published
artefact rather than an opinion. These double as classic search strings, so they
are worth checking in Google and Bing as well as in an assistant.

| ★ | Prompt | Owning page |
|---|---|---|
| ★ | What replaced middleware.ts in Next.js 16? | `/notebook/nextjs-16-middleware-is-now-proxy` |
| ★ | Why does position: sticky silently stop working? | `/notebook/overflow-hidden-kills-position-sticky` |
| ★ | Why does React StrictMode break an init guard in development? | `/notebook/strictmode-defeats-init-guards` |
| ★ | Why is my JSON-LD missing from the HTML in Next.js? | `/notebook/json-ld-missing-next-script-beforeinteractive` |
| | Why did every colour change after upgrading three.js past r152? | `/notebook/three-js-r152-colour-management` |
| | How is an AI shell different from an AI coding assistant? | `/agents/pentashell` |
| ★ | How do you train a small language model from scratch for terminal commands? | `/slms/pentacmd` |
| | Why train a 47M-parameter model instead of using a large LLM? | `/slms/pentacmd` |
| ★ | How do you QLoRA fine-tune a code model and benchmark it with HumanEval? | `/llms/qdex-1.5b` |
| ★ | How do you stop a fleet of autonomous agents from drifting? | `/agents/migi` |
| | Why return 404 instead of 403 for another user's record? | `/banking/rm-copilot` |
| | Why would a coding agent need a permission contract? | `/agents/pact-agent` |
| | What does zero-knowledge actually mean for an encrypted notepad? | `/projects/aegis-vault` |
| | What do you do before writing a prompt? | `/notebook/research-before-writing-a-prompt` |

> **Four of the five original notebook posts are here; the fifth is excluded on
> purpose.** `/notebook/the-trap-i-wrote-down-was-wrong` scores `searchDemand: 4`
> in its own `popularity` block — the lowest of the five — against
> `shareability: 17`, the highest, and its source comment says plainly that
> nobody searches for it and it travels by being shared. A query set is a search
> instrument, so grading that post against search results would measure the wrong
> thing and report a D every quarter for a post that is doing exactly what it was
> written to do. **Do not add it.** If it ever needs measuring, the metric is
> inbound links, not rank.

---

## 10. Results log

One block per run. **Append; never overwrite.** The point is the trend, and a log
that only holds the latest result cannot show one.

### Template

```
### <date> — <engine or "all five engines">

| Query | Grade | Cited sources | Answer (verbatim, trimmed to the relevant sentences) |
|---|---|---|---|
```

> **`###`, not `##`.** A run block at `##` breaks out of this section and
> swallows every run recorded before it. Corrected 10 Sep 2026 when the first
> entry did exactly that to the 26 Aug spot check below.

### Runs

**Run the minimum baseline before any §6 work starts** — the core eighteen, one
engine, three runs, about an hour. There is nothing to compare a Wikidata entry
against otherwise. The run below is not it.

### 10 Sep 2026 — "Who is suman debnath?" — all five engines, one run each

Run by Suman from a phone, logged out or in temporary/incognito chat per §2.
Screenshots taken. **This is one prompt and one run per engine**, so §7's "do not
trust a single run" applies to every grade in the table. Recorded anyway, because
the source panels are worth more than the grades — see the box below.

| Engine | Grade | Cited sources | Answer (verbatim, trimmed) |
|---|---|---|---|
| **ChatGPT** | **A** | **Four pages on this domain** — "Who is Suman Debnath? — Senior Brand Marketing Manager & AI-Native Product Builder", "FAQ — Brand Marketer Turned AI Product Builder", "What is Suman Debnath known for?", "What is Suman Debnath's experience? — Résumé & career history". Plus LinkedIn (700+/800+ profiles), ORNL, a namesake's own `sumandebnath` portfolio, four ResearchGate profiles, about.me, indiankanoon | "There are **many people named Suman Debnath**… One notable Suman Debnath I found is: Senior Brand Marketing Manager and AI-native product builder, based between Pune and Kolkata. Has around 9 years of brand/digital marketing experience… **Claims to have built** systems including a 46-agent autonomous AI fleet and a 47-million-parameter language model. His portfolio lists projects such as ROASmind, IMPRINT, LEGATUS, CITE, EMBER and D-PE.ai." |
| **Gemini Flash-Lite Extended** | **C** | AI Engineer, "Build your data portfolio" (datascienceportfol.io), ORNL. **No chip on his bullet**; the other two both have one | Third of three: "**Suman Debnath (Marketing & AI-Native Products):** A senior brand marketing manager and independent AI product builder based in India, known for combining digital marketing leadership with shipping custom language models and agentic systems." |
| **Perplexity** | **R** | ai.engineer, **forbes.com**, purdue.edu (CV PDF), amazon.com, **houseofnamus.com** ("Senior Brand Marketing Manager & AI-Native Product Builder"), linkedin.com | Leads with Crusoe. Closes: "There are also Suman Debnaths working in power-grid research, mechanical-engineering research, electric utilities, **and brand marketing**, so the intended person depends on where you encountered the name." |
| **Gemini Pro Extended** | **D** | ai.engineer, "Build your data portfolio", ORNL, ResearchGate | Three entities, none of them him: Crusoe/AWS, ORNL, and "Suman Debnath (Academic / Mechanical Engineering) — An Assistant Professor at Chandigarh University." |
| **Claude (Sonnet 5)** | **D** | ORNL, Science Friday, GitHub (`debnsuma`), Amazon, AWS Builder Center, Google Scholar, Purdue, LinkedIn, **Wikipedia** (for two adjacent names) | "There are a few people by this name; the two most notable are: **Dr. Suman Debnath (Oak Ridge National Laboratory)**… **Suman Debnath (debnsuma)** — A Technical Lead in AI/ML at Anyscale." |

#### What this run establishes, and what it does not

> **Split the findings by how noisy they are.** The *rankings* are a single
> sample and will move between runs. The *source panels* are structural — which
> index holds what does not flip run to run. **Every conclusion below is drawn
> from the panels, not the ordering**, which is why they are worth recording
> from one run when the grades are not.

1. **`AEO_PLAYBOOK.md` §6.1's flat reading is spent.** Three of five engines
   demonstrably hold this domain's material. See §6.4 of that file, written from
   this run.
2. **§3.1b works.** ChatGPT cited four entity pages, and their titles map exactly
   onto four rows of the §3.1b table. That is the clearest evidence the
   one-question-one-URL scheme has produced what it was built for. **The URLs
   themselves were not visible in the screenshot** — the page titles are the
   match, which is strong and is not a URL. Grade A recorded on that basis.
3. **"Claims to have built" is the tell.** ChatGPT hedged the 46-agent fleet and
   the 47M model, and hedged nothing else. That is the shape of a fact with one
   source, and the source is the subject. It is the single most direct piece of
   evidence for §6 that this file has produced.
4. **Thirteen `sameAs` entries, none independent.** Every engine that ranked a
   namesake first did so off a page somebody else owns — ORNL, Forbes,
   ai.engineer, a Purdue CV PDF, an Amazon author page, Google Scholar, Science
   Friday. His thirteen are all self-asserted. **A fourteenth self-made profile
   does not address this.**
5. **`ai.engineer` was cited by three of the four engines that did not grade A**,
   in one query. Whatever else is in the §6.3 queue, the AI Engineer CFP is
   sitting on the most-read surface in this table.
6. **`datascienceportfol.io` is in Gemini's retrieval set**, cited in both Gemini
   runs — for the namesake's profile. §6.3 files it as "thin, cheap, one more
   `sameAs` node". That valuation is wrong.
7. **Two more namesakes surfaced**, taking the count past the four §6 names: a
   full-stack developer with his own `sumandebnath` portfolio site — the same
   document type competing for the same navigational query — and an NIT Agartala
   electrical engineer on about.me. **Recorded here only.** Enumerating namesakes
   in public copy was refused 26 Aug 2026 and this does not reopen it.
8. **The bare name is doing better than this file predicted.** §3 marks it
   un-starred with "Expect D or X for a long time". It returned one A, one C, one
   R and two D — and **no X on any engine.** Nothing resolved him *as* somebody
   else; the failures were absence and demotion.
9. **Gemini Pro did worse than Gemini Flash-Lite.** The larger model landed
   further away. Grade per model, not per vendor — a single "Gemini" row would
   have averaged away the only C in the run.

#### The next run

Three runs per engine on this same prompt, before acting on the Perplexity or
Gemini Flash-Lite readings specifically. Grades 2, 3 and 4 above do not depend on
the modal rule and do not need re-running to be acted on.

### Search-index spot check — 26 Aug 2026

> **This is a different instrument and must not be read as a baseline.** These
> results come from a search index, not from an assistant. They say whether pages
> are *findable*, which is a precondition for being quoted and is not the same
> measurement. Recorded here because the finding is load-bearing. Note also that
> the tool used is US-weighted, which matters for an India-weighted set.

| Query | Result | Re-run 27 Aug |
|---|---|---|
| `Suman Debnath portfolio` | **Domain absent.** Nine results, none of them this site. | not re-run |
| `PentaCMD 47M parameter model terminal commands` | **No result at all.** The page has been live roughly two months. | **reversed on Google** — see the box below |

Two conclusions, and the second is the more actionable:

1. **At least four well-indexed Suman Debnaths exist, not two.** Alongside the AWS
   advocate and the ORNL power-systems researcher that `AEO_PLAYBOOK.md` §6 names,
   the results surfaced a web engineer credited with NDTV and NDTV Profit, listed
   on a contractor marketplace out of New Delhi, and an AI/ML technical lead at
   Anyscale. The `disambiguatingDescription` in the root layout names two. It is
   competing against at least four, and two of those are also technology people
   in India — which is a materially harder disambiguation problem than the one the
   documentation currently describes.

2. **The technical bucket is not losing on quality. It is not indexed.** A product
   page live for two months, describing an artefact with an unusual and highly
   specific name, returns nothing. `AEO_PLAYBOOK.md` §5.6 says being crawled is
   not being indexed; this is that, measured. **No amount of additional writing
   moves a query whose page is not in an index.** Submission, verification and
   inbound links come first, and until they do, expect D across the technical set
   for reasons that have nothing to do with the articles.

> **⚠ Conclusion 2 was overtaken one day later, 27 Aug 2026. Do not grade
> against it.** `AEO_PLAYBOOK.md` §6.1 is the current record.
>
> Google now returns an **AI Overview** for
> `PentaCMD 47M parameter model terminal commands` — quoting 47M parameters,
> 299K instruction-to-command pairs, ~87% exact-match and Pentashell, all
> correct — plus an organic result and a sidebar card, from a signed-out
> incognito window in India. Meanwhile a second index, queried the same day,
> returned nothing for four queries **including the exact domain string**.
>
> **So "not indexed" is now wrong as a flat statement and right as a
> per-engine one.** Expect the technical set to grade very differently on
> Google than on anything answering from another index, and **record which
> engine produced each grade** — §2 already asks for this and it now decides
> whether a D means "absent" or "absent *here*".
>
> **Conclusion 1 stands and was re-confirmed** the same day: a single query
> surfaced the AWS advocate, the ORNL researcher, the Anyscale ML lead and the
> New Delhi web engineer together.

### Search-index spot check — 10 Sep 2026

> **Same instrument as 26 Aug, same caveats.** A search index, not an assistant;
> US-weighted against an India-weighted set; the backend is unnamed and is **not**
> any of the five engines in the run above. Run by an agent, which is why it is a
> spot check and not a run (§2). Recorded because it agrees with the phone
> screenshots on every structural point, and because three of its findings are
> not in any document.

Four questions, cold, on the same day as the five-engine run:
*Who is Suman Debnath? / Where does Suman Debnath work? / What is Suman Debnath
working on? / What skills does Suman Debnath have?*

**Across four queries and 35 result slots, this domain appeared zero times.** Not
demoted — absent. Identical to the 26 Aug finding, two weeks and a full off-page
programme later. **The Crusoe/AWS advocate answered all four.**

| Domain | Slots | Whose page |
|---|---|---|
| `ai.engineer` | **4 of 4 queries** | the AWS/Crusoe advocate |
| `datascienceportfol.io` | **4 of 4 queries** | the AWS/Crusoe advocate |
| `sessionize.com` | 2 | the AWS/Crusoe advocate |
| `ornl.gov` | 2 queries, 3 slots | the power-systems researcher |
| `dev.to/debnsuma` | 2 | the AWS/Crusoe advocate |
| **`houseofnamus.com`** | **0** | — |

Three findings, none of them previously recorded:

1. **He has joined three platforms where the namesake already holds the top
   slot.** Sessionize, datascienceportfol.io and dev.to are all in `sameAs`, and
   on all three the index returns the *namesake's* page. On dev.to the namesake
   holds [`dev.to/debnsuma`](https://dev.to/debnsuma) — the handle that reads as
   canonical — against `dev.to/suman_debnath_1`.

   > **This is not an argument to stop, and it does change the valuation.** A
   > profile on a domain a competitor dominates is not an independent source
   > corroborating you; it is a thin page filed underneath an established one on
   > the same host. `AEO_PLAYBOOK.md` §6.4 item 3 says
   > `datascienceportfol.io` is worth an hour. It is worth it as a **contest on a
   > page the index demonstrably reads**, which is a stronger reason than the one
   > written there.

2. **The full-stack namesake has a portfolio domain:
   [`sumandebnath.co.in`](https://www.sumandebnath.co.in/)** — "Web Developer,
   Flutter Developer, UI/UX Designer". This is the one ChatGPT surfaced as
   "sumandebnath" in the run above, now with an address. **He ranks for a
   *capability* query** (§4's commercially important third), and of all the
   namesakes he is the least separated by field and the closest in document type:
   a personal portfolio on a name-matching domain. **Recorded, not to be named on
   the site** — the 26 Aug refusal on enumerating namesakes stands.

3. **Twelve of 35 slots are Wikipedia pages for people who are not any Suman
   Debnath** — Suman Deodhar, Bindu, Jadab Lal, Samapika, Jayanta, Krishna,
   Narayan, Somen and Swapan Debnath. Pure surname padding. **Claude did the same
   thing on the phone the same day**, citing Suman Deodhar and Swapan Debnath.
   Two instruments, one behaviour: the index holds thin material on the *name*
   and falls back to the encyclopedia layer to fill the gap. That is weak but
   real support for the Wikidata item being worth its gate.

**Which of the four is most winnable, and it is not the obvious one.** *"What
skills does Suman Debnath have?"* returned three different people with three
unrelated skill lists — AI/ML, organometallic chemistry, web development. The
index has **no confident answer** to it, which is a fragmented query rather than
a defended one, and it is exactly what §3.6b's five skill surfaces and `/resume`
are built to answer. *"Where does Suman Debnath work?"* is the hardest: ORNL
publishes a staff directory page and the advocate has ai.engineer, LinkedIn and
Sessionize. Both are institutional employment records, and `worksFor` here has
no third party behind it.

> **One data point, not a verdict.** It is one index, US-weighted, queried once.
> What earns it a place in this log is that it agrees with the five-engine run on
> every structural point while using a completely different instrument.

---

## 11. Reading the results

- **A rising C count is progress**, not failure. It means the content is being
  retrieved and the attribution is not landing — usually an entity-resolution
  problem, which is §6.
- **X on an identity query is the priority**, always. See §2.
- **D across every engine on a technical query** means the page has not been
  indexed anywhere, which is a different problem from not being preferred. Check
  the beacon and Search Console before writing anything new.
- **A single engine moving while the others do not** is the expected shape of
  progress, not an anomaly — they do not share an index. ChatGPT moved first in
  Aug 2026 for exactly this reason.
- **Expect the credibility and service buckets to move before the identity ones.**
  Those pages are new, specific and largely uncontested, whereas the identity
  queries are competing against a namesake with a decade of indexed material.
- **Do not add pages in response to a bad grade** without checking
  `AEO_PLAYBOOK.md` §3.1b first. Two URLs answering one question is the collision
  that gets both discounted.
