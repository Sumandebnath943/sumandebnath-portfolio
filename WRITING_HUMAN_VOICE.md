# Writing Rules: How to Not Sound Like an AI

How to use this: run Section 0 before you write anything. Apply Sections 1–4 while drafting. Run the Section 5 checklist before you ship. Every rule here is a constraint, not a suggestion — if a rule and "sounding smart" conflict, the rule wins.

---

## 0. Before you write a single word

**Kill the piece if it fails this test.** An article that only rearranges what's already ranking has zero value and won't get read, cited, or shared. Before drafting, check which level the piece hits:

| Level | What it is | Verdict |
|---|---|---|
| 0 — No gain | Restates what's already out there | Don't write it |
| 1 — Interpretive | New angle/framing on known ideas, no new data | Minimum bar |
| 2 — Empirical | Original data, a real case, a specific number nobody else has | Target this |
| 3 — Conceptual | A new framework, model, or way of naming the problem | Best outcome |

**How to get there — do this before outlining:**
1. Look at what's already ranking/being said on this topic. List the claims and stats everyone repeats.
2. Find what's missing. Roughly 9 in 10 top-ranking pieces on any given topic leave at least one real question unanswered — find it. That gap is your angle.
3. Get to 15+ specific, unique data points, numbers, or examples before you start writing — pieces with fewer than 5 measurably underperform. If you can't find that many, you don't have a piece yet, go find more first, don't pad.
4. If there's no unique data or angle available, build one: a worked example, a hypothetical-but-rigorous case, a named framework. If you can't get real quotes or data, simulate the depth of a subject-matter-expert interview — a specific trade-off, a real friction point, what actually goes wrong — not just polished advice.

**Build the author, not just the topic.** Don't write as "a helpful assistant summarizing a subject." Before drafting, decide:
- Who is this person? (Not demographically — what do they *believe*?)
- What do they refuse to say because it's a cliché in this space?
- Do they use semicolons or short sentences? Rhetorical questions or flat statements?
- Are they cynical/battle-tested, or optimistic/academic?
- What's their one strong opinion on this topic that a "balanced" writer would hedge on?

Hold that persona for the entire piece. A generic "helpful, neutral, comprehensive" voice is the thing you're trying to avoid — it's the default failure mode, not a safe fallback.

---

## 1. Structure: openers, closers, subheadings

**Banned openers:**
- "In today's fast-paced world…"
- "In the ever-evolving landscape of X…"
- Any sentence that states the obvious importance of the topic before saying anything about the topic itself

Open with the actual claim, a specific number, or a concrete scene. Assume the reader already knows why the topic matters.

**Banned closers:**
- "In conclusion…" / "To sum up…" followed by a rehash of points already made
- A closing paragraph is not a rule — a piece is allowed to just end once the point is made, or land on a forward-looking thought, a new tension, or an open question instead of a summary.

**Subheadings are a mini-outline, not labels.** Write each as a complete thought a skimmer could read on its own and still understand the section's point — not a vague one- or two-word tag. About a third of readers quit a piece that's hard to follow, and another third quit one that doesn't deliver on its title's promise fast enough. Real subheadings and a fast payoff fix both.

**Mid-piece bans:**
- Don't restate the topic sentence as a mini-conclusion at the end of every paragraph. Say the thing once.
- Ration "Furthermore," "Moreover," "Additionally." Most paragraphs should just start with the next idea, no connective tissue needed.
- Don't hedge attribution vaguely ("studies show," "experts agree"). Either name the actual source, or state the claim directly.
- Occasional bullet lists inside prose sections break up monotony — don't force everything into paragraph form if a scannable list serves the reader better.

---

## 2. Sentence rhythm & voice

Two separate failure modes live here: flat sentence length, and flat distance from the reader.

**Length.** Human writing scores roughly 0.6–1.2 on sentence-length variance; default AI output sits flat around 0.2–0.4. Close that gap:
- At least one sentence of 6 words or fewer per ~150 words.
- Never let three sentences in a row land within 5 words of each other in length.
- Alternate a long, clause-stacked sentence with something short and flat, then a fragment.

**Conceptual variance.** Flat, evenly-spaced information density is a tell too, not just sentence length. Follow a plain, predictable sentence with one that drops a specific, unexpected term or detail. Don't let every sentence carry the same "weight" of new information.

**Register.** Default to first/second person ("I," "you") over third-person or passive framing wherever the persona allows it. One useful trick: frame a point as something you'd tell a specific person in one sitting — "here's what I'd actually tell you" — it forces concrete, opinionated language instead of safe generalities.

---

## 3. Vocabulary — what to cut, what to leave alone

These words are measurably overused by AI relative to human baseline writing. Cut them on sight and replace with something concrete:

| Cut | Replace with |
|---|---|
| delves | the actual specific action — "calculates," "tests," "breaks down" |
| underscores | state the point directly, no meta-commentary on its importance |
| meticulously | describe the actual steps instead of summarizing with an adverb |
| showcasing | "shows," "does," or just cut it |
| intricacies | name the specific interacting parts instead |
| expediting | the actual domain term for the speed-up |
| intricate | say what specifically makes it complex |
| surpassing | the actual number/margin |
| commendable | cut it — unearned praise, not analysis |
| pioneers | name what they actually did first |

"Provide a valuable insight" and its close variants show up roughly 180x more often in AI text than in human writing — cut it and anything that rhymes with it.

**Don't overcorrect.** Words like "however," "between," "analysis," and "using" are NOT AI tells — human writers use them at completely normal rates. Only cut the high-signal words above.

**Beyond the blacklist:** don't reuse your own invented phrase twice in one piece either. If a line felt good once, use it once.

---

## 4. Make everything specific, nothing universal

Generic sentence: "Many professionals struggle to balance productivity with burnout."
Anchored sentence: "A dev I know rewrote the same auth flow three times in one week because he wouldn't stop at 11pm."

Anywhere you'd write a claim true of literally anyone, replace it with a claim anchored to a specific person, number, date, or scene. This is the actual mechanism that separates "sounds like nobody" from "sounds like someone."

**Density pass (do this after the first draft of each section):**
1. Write the section sparse first, don't worry about density yet.
2. List what's missing: specific entities (names, numbers, tools, dates) that are relevant, novel to this section, and true.
3. Rewrite the section at the *same length*, cutting filler/hedges/throat-clearing to make room for those entities.
4. Repeat 2–3 more times, max.
5. Stop once it's dense but still readable. Reference points: a sparse first draft usually sits around 0.12 entities-per-token; the readable sweet spot is roughly 0.148–0.158; past ~0.167 it stops reading like prose and starts reading like a spec sheet.

**Fact-block rule:** core claims in each section should stand alone as a complete, specific, citable sentence, not buried inside a long flowing paragraph where the actual data point is hard to extract.

---

## 5. Headlines

- Target ~11 words / ~65 characters.
- Numbers beat everything else, by a wide margin — in reader-preference testing, number-led headlines beat question-format ones roughly 3-to-1 (36% vs 11%). Don't use question-format headlines.
- Among numbers: 10 is the strongest single number. Otherwise use single digits (3–9). Avoid double-digit list numbers (15, 20+) — readers now read those as "too much time required."
- Superlatives: either use 0–1 (understated, safest) or go maximalist with ~4 (bold, works for specific consumer niches). Never 2–3 — that lands as neither credible nor exciting.
- Sentence case, not Title Case or ALL CAPS, for almost everything. ALL CAPS reads as authoritative only in narrow consumer niches and carries real brand risk elsewhere.
- Cut emotional clickbait ("this will make you cry," identity call-outs) — it's actively penalized now, not just tacky.
- Consumer/B2C: instructional-authority phrasing works — "you need to," "why you should." It reads as expert guidance when the content backs it up.
- B2B/LinkedIn: shorter, punchier, zero emotional triggers. Lead with the measurable outcome — time saved, revenue, a framework mastered.
- **Deliver on the promise immediately.** If the headline says "5 ways," the piece lists five, clearly, early.
- Meta description: name the actual pain point + the specific value + a clear CTA. URL should echo the headline's core promise, not be generic or truncated.
- If something ranks but isn't getting clicked, the fix is the headline/meta, not a rewrite of the article.

---

## 6. Ship checklist — run this before publishing

- [ ] Topic clears Level 2/3 information gain (unique data, angle, or framework, not a rehash)
- [ ] Persona defined and held consistently start to finish
- [ ] No blacklisted vocabulary (Section 3), no repeated invented phrases either
- [ ] No banned openers/closers (Section 1); subheadings read as complete thoughts
- [ ] No paragraph restates its own topic sentence as a closer
- [ ] "Furthermore/Moreover/Additionally" appears rarely or not at all
- [ ] At least one ≤6-word sentence per ~150 words; no 3 consecutive sentences within 5 words of each other's length
- [ ] Conceptual density varies too, not just sentence length
- [ ] First/second person used where the persona allows it
- [ ] At least one anchored, specific detail (name/number/date/scene) per section, no purely universal claims
- [ ] Density pass done, 3–4 iterations, stopped before it reads like a spec sheet
- [ ] Key claims are extractable as standalone fact-blocks
- [ ] Headline: ~11 words/65 characters, number-led if it fits, superlative count 0–1 or ~4, sentence case
- [ ] Meta description and URL match the headline's actual promise
- [ ] Piece ends on a point, a new thought, or just stops, no "in conclusion" rehash
- [ ] One final read for anything that still sounds like it could've been written about any topic by anyone
