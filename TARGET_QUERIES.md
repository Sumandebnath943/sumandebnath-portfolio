# Target queries — the test set

The prompts this site is trying to be the answer to, what counts as winning one,
and the log of what the engines actually said.

**This is an instrument, not a wish list.** `AEO_PLAYBOOK.md` §7 is the reasoning
behind it; this file is the thing you run. Read §5.6 and §6 of the playbook
before drawing any conclusion from a result here — most of what moves these
numbers is off-site, and knowing *which engine* changed tells you *which index*
moved.

> **Nothing has been run yet.** The log in §10 is empty on purpose. Do not fill
> it with estimates, and do not treat the absence of a baseline as a baseline.

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
## <date> — <engine>

| Query | Grade | Cited sources | Answer (verbatim, trimmed to the relevant sentences) |
|---|---|---|---|
```

### Runs

**No answer-engine run yet.** The set was written 26 Aug 2026, expanded the same
day once the supporting articles were published, and has not been run against any
assistant. That work requires a person (§2).

**Run the minimum baseline before any §6 work starts** — the core eighteen, one
engine, three runs, about an hour. There is nothing to compare a Wikidata entry
against otherwise.

### Search-index spot check — 26 Aug 2026

> **This is a different instrument and must not be read as a baseline.** These
> results come from a search index, not from an assistant. They say whether pages
> are *findable*, which is a precondition for being quoted and is not the same
> measurement. Recorded here because the finding is load-bearing. Note also that
> the tool used is US-weighted, which matters for an India-weighted set.

| Query | Result |
|---|---|
| `Suman Debnath portfolio` | **Domain absent.** Nine results, none of them this site. |
| `PentaCMD 47M parameter model terminal commands` | **No result at all.** The page has been live roughly two months. |

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
