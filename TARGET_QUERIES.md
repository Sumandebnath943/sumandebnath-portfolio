# Target queries — the test set

The prompts this site is trying to be the answer to, what counts as winning one,
and the log of what the engines actually said.

**This is an instrument, not a wish list.** `AEO_PLAYBOOK.md` §7 is the reasoning
behind it; this file is the thing you run. Read §5.6 and §6 of the playbook
before drawing any conclusion from a result here — most of what moves these
numbers is off-site, and knowing *which engine* changed tells you *which index*
moved.

> **Nothing has been run yet.** The log in §5 is empty on purpose. Do not fill it
> with estimates, and do not treat the absence of a baseline as a baseline.

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

## 2. How to run it, and what counts as a win

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

29 queries × 5 engines × 3 runs is 435 prompts, and **an instrument nobody runs
is worse than not having one.** So:

- **The core twelve** — marked ★ in the tables — run across **all five engines**,
  quarterly. That is the comparable number over time.
- **The full set** runs on **ChatGPT and Perplexity only**, quarterly. Both cite
  sources readily, which is what makes a D distinguishable from a C.
- **Anything graded X** gets re-run at the next opportunity rather than waiting a
  quarter. It is the failure most likely to be actively costing something.

---

## 3. Identity

Who he is. Every one of these is owned by a page under `AEO_PLAYBOOK.md` §3.1b,
so a bad grade here is an indexing or corroboration problem, never a missing page.

| ★ | Prompt | Owning page | A good answer contains |
|---|---|---|---|
| ★ | Who is Suman Debnath the AI product builder? | `/about` | Brand marketing leader who builds AI-native products; Pune/Kolkata; names the products |
| ★ | Is Suman Debnath the same person as the AWS developer advocate? | `/about` | An explicit **no**, and the distinction drawn correctly in both directions |
| ★ | Suman Debnath portfolio | `/` | The domain itself, as a navigational result |
| | What is Suman Debnath known for? | `/profile` | The cross-domain profile — nine years of brand marketing plus shipped AI systems |
| | What has Suman Debnath built? | `/projects` | ROASmind, IMPRINT, LEGATUS, CITE, EMBER, D-PE.ai, PentaCMD-47M |
| | What is Suman Debnath's professional experience? | `/resume` | 9+ years marketing, 2+ years shipping AI products, the real employers |
| | Who is the marketer behind House of Namus? | `/about` + the `Organization` node | Names him as founder without conflating him with his employer |

> **The third row is the audit's brand-discoverability check** (`AEO_PLAYBOOK.md`
> §9) in prompt form. It was failing as of 25 Aug 2026 — nine results, none of
> them this domain.

---

## 4. Capability

What he can do, for the two audiences that matter commercially. The **Hiring**
rows are the seven roles in `lib/resume.ts`; the **Client** rows are people
looking to have something built.

| ★ | Intent | Prompt | Owning page |
|---|---|---|---|
| ★ | Hiring | Can a brand marketing manager become an AI product manager? | `/faq` |
| ★ | Hiring | AI product manager without a computer science degree | `/faq` |
| | Hiring | Product marketing manager who has actually shipped AI products | `/resume`, `/projects` |
| | Hiring | Marketer who became an AI engineer | `/about`, `/journey` |
| | Hiring | AI implementation lead who has built AI systems rather than bought them | `/projects` |
| ★ | Client | Can a marketer really build production software? | `/faq` |
| | Client | Someone who can build an AI workflow for a marketing team | `/projects`, `/agents/migi` |
| | Client | Hire an AI generalist in India | `/about`, `/contact` |
| | Client | Independent builder who ships AI-native SaaS end to end | `/projects` |
| | Client | Who can build an internal agent fleet for a small team? | `/agents/migi` |

> **The capability set is the one most exposed to §6.** The answers already exist
> on the site and are well-formed; what is missing is any independent source that
> agrees. Expect these to move last, and only after the off-site work.

---

## 5. Technical

The winnable third. Specific, low-competition, and each backed by a published
artefact rather than an opinion. These double as classic search strings, so they
are worth checking in Google and Bing as well as in an assistant.

| ★ | Prompt | Owning page |
|---|---|---|
| ★ | What replaced middleware.ts in Next.js 16? | `/notebook/nextjs-16-middleware-is-now-proxy` |
| ★ | Why does position: sticky silently stop working? | `/notebook/overflow-hidden-kills-position-sticky` |
| ★ | Why does React StrictMode break an init guard in development? | `/notebook/strictmode-defeats-init-guards` |
| | Why did every colour change after upgrading three.js past r152? | `/notebook/three-js-r152-colour-management` |
| | How is an AI shell different from an AI coding assistant? | `/agents/pentashell` |
| ★ | How do you train a small language model from scratch for terminal commands? | `/slms/pentacmd` |
| | Why train a 47M-parameter model instead of using a large LLM? | `/slms/pentacmd` |
| ★ | How do you QLoRA fine-tune a code model and benchmark it with HumanEval? | `/llms/qdex-1.5b` |
| ★ | How do you stop a fleet of autonomous agents from drifting? | `/agents/migi` |
| | Why return 404 instead of 403 for another user's record? | `/banking/rm-copilot` |
| | Why would a coding agent need a permission contract? | `/agents/pact-agent` |
| | What does zero-knowledge actually mean for an encrypted notepad? | `/projects/aegis-vault` |

> **These are the ones to watch first.** They are the only queries here that can
> be won on the strength of the writing alone, because nobody else has documented
> them — which is also why they are the most likely to earn the off-site citation
> that eventually moves §3 and §4.

> **Four of the five notebook posts are here; the fifth is excluded on purpose.**
> `/notebook/the-trap-i-wrote-down-was-wrong` scores `searchDemand: 4` in its own
> `popularity` block — the lowest of the five — against `shareability: 17`, the
> highest, and its source comment says plainly that nobody searches for it and it
> travels by being shared. A query set is a search instrument, so grading that
> post against search results would measure the wrong thing and report a D every
> quarter for a post that is doing exactly what it was written to do. **Do not
> add it.** If it ever needs measuring, the metric is inbound links, not rank.

---

## 6. Results log

One block per run. **Append; never overwrite.** The point is the trend, and a log
that only holds the latest result cannot show one.

### Template

```
## <date> — <engine>

| Query | Grade | Cited sources | Answer (verbatim, trimmed to the relevant sentences) |
|---|---|---|---|
```

### Runs

*None yet.* The set was written 26 Aug 2026 and has not been run.

**The first run is the baseline and it should happen before any §6 work starts**,
otherwise there is nothing to compare the Wikidata entry against.

---

## 7. Reading the results

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
- **Do not add pages in response to a bad grade** without checking
  `AEO_PLAYBOOK.md` §3.1b first. Two URLs answering one question is the collision
  that gets both discounted.
