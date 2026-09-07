# Content Writing Guidelines — For the AI Agent

**Purpose:** every piece you draft should read like one specific human wrote it, not like the median of everything you've read. This doc is the checklist. Follow it before, during, and after drafting — not just as a style pass at the end.

---

## 0. The rule above all the other rules

If a sentence could be dropped into an article on a completely different topic just by swapping a few nouns, it's dead weight. Cut it or make it specific. Almost every rule below is a specific version of this one.

---

## 1. Pick the topic/angle with Information Gain — not keyword coverage

Before drafting, score the angle:

| Level | What it is | Write it? |
|---|---|---|
| 0 — No gain | Repeats what's already out there, interchangeable with your baseline knowledge | No — kill it |
| 1 — Interpretive gain | New framing or contrarian take on known ideas, no new data | Only if nothing better exists |
| 2 — Empirical gain | Real numbers, a specific case, a named example nobody else has | Yes — this is the target |
| 3 — Conceptual gain | A new framework, model, or way of naming the problem | Yes — best possible outcome |

Checklist before you write a word:
1. What do the existing top pieces on this topic all say? (the baseline)
2. What do we know, have, or believe that they don't?
3. What question does everyone leave unanswered? (there's almost always one)
4. Count the unique, specific data points/claims in your outline. Fewer than 5 → stop, go find more before drafting.
5. No unique angle or data at all → don't write the piece yet.

---

## 2. Build one specific persona before drafting a single sentence

Don't prompt yourself with "write like a human." Decide, explicitly, before drafting:
- Who is this person — what's their actual job, how many years in it, what's the one opinion they keep repeating?
- What do they refuse to say? What industry cliché do they actively hate?
- Fragments and short lines, or full sentences and semicolons?
- Rhetorical questions, or flat direct statements?
- Warm and encouraging, or blunt and battle-tested?

Write the entire piece from inside that one head. Keep the persona fixed for the whole piece; it can shift between pieces or brands, never mid-piece.

---

## 3. Words to cut on sight

These are the highest-signal "this was AI-written" tells, ranked by how many times more often they show up in AI text vs. the human baseline. Cut or replace every one:

| Word/phrase | Why it's a tell | Replace with |
|---|---|---|
| delves / delve into | performs depth without giving any | the actual action: calculates, tests, breaks down |
| underscores / highlights the importance of | meta-commentary about the point instead of the point | just state the point directly |
| meticulously | intensifier standing in for actual detail | describe the real steps |
| showcasing | filler transition into an example | cut it, go straight to the example |
| intricacies | names complexity without describing it | name the actual moving parts |
| expediting | unnatural formal word for "faster" | speeds up, cuts (time) |
| intricate / complex (used as filler) | vague placeholder | say specifically what's complicated and why |
| surpassing | vague comparative | say by how much |
| commendable / impressive (unearned) | reflexive AI politeness | cut, or say exactly what was good |
| pioneers / pioneering | hype word, rarely earned | say what they actually did first |
| provide valuable insight(s) into | empty stock phrase | cut it — just give the insight |

Also cut on sight: "in today's fast-paced world," "in the ever-evolving landscape of X," "in conclusion," "it's worth noting," "at the end of the day."

Words that are fine, don't over-sanitize: however, between, analysis, using — these are normal words at normal frequency, not AI tells. Banning them makes prose worse for no gain.

---

## 4. Structural patterns to kill

- **No throat-clearing openers.** Start with the actual point, a specific fact, or a real stake — never a scene-setting generality.
- **No paragraph-end recaps.** Don't restate the topic sentence as a mini-summary before moving on. Say the point once.
- **No transition-word crutches.** Furthermore / Moreover / Additionally at the start of a paragraph is a tell. If two ideas connect, the sentence should show it — or just start the next paragraph.
- **No vague attribution.** "Studies show," "experts say" — name the source, the number, the year, or don't make the claim.
- **No closing ceremony.** Don't announce the ending and then recap everything already said. End on a new thought, an open trade-off, or just stop once you're out of real things to say.
- **Hedge only when there's real uncertainty.** State what you actually know plainly.

---

## 5. Sentence rhythm (burstiness)

AI text is flat — every sentence lands in roughly the same length range. Force variation:
- At least one sentence of 6 words or fewer per ~150 words.
- Never three sentences in a row within 5 words of each other in length.
- Pattern: a longer explanatory sentence, then a short, blunt one. That contrast is what reads as a real person thinking, not a model completing a pattern.

---

## 6. Make every claim specific, not universal

Generic: "Many marketers struggle to track ROI across platforms."
Specific: a real number, a real scenario, a real trade-off someone actually faces.

Every section needs at least one anchor — a specific number, a named example, a time reference, an actual trade-off — something that couldn't have been written about a different topic by swapping two words.

---

## 7. Density — say more without saying longer

Don't ship the first draft of a section. Do one densification pass:
1. Find 3–5 specific things missing — a number, a name, a mechanism, a real example.
2. Add them **without growing the section** — cut filler and vague language to make room.
3. Stop once it reads dense but still natural. If it starts reading like a spec sheet or a list of disconnected facts, you went one pass too far — back off one step.

Rule of thumb: every paragraph should carry at least one fact, number, or name a reader couldn't have guessed from the headline alone. That's roughly the density of professional human writing — noticeably denser than a default AI draft, but still readable in one pass.

---

## 8. Headlines

- **Numbers beat questions.** A numbered headline outperforms a question-style headline by a wide margin. Prefer single digits (3–9) or 10. Avoid 15, 20+ — reads as a chore, not a promise.
- **Length:** roughly 11 words / 65 characters. Long enough to be specific, short enough not to get cut off in search or social.
- **Superlatives:** use 0–1, or go all-in with 3–4. The middle ground (2–3) reads as neither credible nor exciting — avoid it entirely.
- **Case:** sentence case by default.
- **Skip manufactured emotion** ("this will make you cry") and identity call-outs — platforms actively suppress these now, they don't help anymore.
- **B2B:** shorter, blunter, no emotional hook. Lead with the specific, measurable outcome — time saved, cost cut, a metric moved.
- **Consumer/broad:** "you need to," "why you should," curiosity without giving away the answer — these still convert.
- The headline is a promise — the piece has to deliver on it fast, in the first section, or readers bail.

---

## 9. Meta description & URL
- Meta description: name the actual pain point and the specific value of clicking — not a rephrase of the headline.
- URL: should say what the page is about in plain words, not a generic or truncated slug.

---

## 10. Before you call it done

- [ ] Any word from the section 3 cut list still in there? Remove it.
- [ ] Any paragraph ending by restating its own opening line? Cut the repeat.
- [ ] Any paragraph starting with Furthermore/Moreover/Additionally? Rewrite the transition.
- [ ] Read it back — does any sentence sound like it could sit in an article on a different topic with two words swapped? Make it specific or cut it.
- [ ] Does every section carry at least one number, name, or concrete detail nothing else on this topic has?
- [ ] Is the headline a number, not a question, ~11 words?
- [ ] Would someone who actually does this for a living nod at a specific claim — or does it read like a summary of what they already know?

Fail more than two of these → another pass before it ships.
