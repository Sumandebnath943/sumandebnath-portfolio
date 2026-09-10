import type { Post } from "../types";

const post: Post = {
  slug: "evaluation-harness-scoring-bug",
  title: "A bug in my scorer cost Qdex-1.5B three points on HumanEval",
  answer:
    "Qdex-1.5B was published at 39.0% on HumanEval. An audit of the evaluation harness found the answer extractor discarding correct solutions over output formatting; hardening it and re-running all 164 problems returned 42.1%. Five problems the model had solved were being counted as failures.",
  description:
    "A scoring bug in my own evaluation harness marked five correct solutions as failures. What it cost, what made me look, and why the direction of the error mattered.",
  metaTitle: "A scoring bug cost my model 3 points on HumanEval",
  // SERP-checked 11 Sep 2026 per BLOG_GUIDELINES §2. "HumanEval benchmark" is
  // owned by DataCamp, DeepEval and the leaderboard sites; a explainer here
  // loses to all of them. The practitioner account — somebody finding a scoring
  // bug in their own model's evaluation — returned nothing but GitHub issues and
  // arXiv papers, so the phrases below aim at that and not at the topic.
  keywords: [
    "evaluation harness scoring bug",
    "HumanEval answer extraction bug",
    "audit your own benchmark score",
    "benchmark measures the harness not the model",
  ],
  published: "2026-09-12",
  category: "Practice",
  // Low search demand and no way around that — this is a narrow query. Scored
  // high on evergreen and gap instead: the principle does not decay, and the
  // SERP check found the how-to well covered while the first-person account of
  // auditing your own number was absent entirely. painIntensity is mid: it
  // fails silently, but the cost is embarrassment rather than an outage.
  popularity: {
    searchDemand: 8,
    evergreen: 17,
    painIntensity: 13,
    gapInCoverage: 15,
    shareability: 15,
  },
  popularityScore: 68,
  tags: ["Debugging", "Engineering", "Process"],
  readingMinutes: 6,
  cover: "/notebook/evaluation-harness-scoring-bug.webp",
  coverAlt:
    "A laptop on a dark desk showing a HumanEval result for Qdex-1.5B: 39.0% marked \"old, with bug\" in red above 42.1% marked \"after fix\" in green, annotated \"Same model. Bigger truth.\" Beside it a crumpled note reads \"Bug in scorer\" and an open notebook lists the fix — harden extractor, add regression tests, rerun full eval, document and ship.",
  facts: [
    { label: "Model", value: "Qdex-1.5B, QLoRA fine-tune of Qwen2.5-Coder-1.5B" },
    { label: "Benchmark", value: "HumanEval, 164 problems, pass@1" },
    { label: "Published score", value: "39.0% — 64 of 164" },
    { label: "Score after the fix", value: "42.1% — 69 of 164" },
    { label: "Problems affected", value: "Five, all of them correct solutions scored as failures" },
    { label: "Cause", value: "Answer extractor discarding output on formatting artifacts" },
    { label: "Base model, raw completion", value: "40.2% — 66 of 164" },
    { label: "Base model, instruction mode", value: "1.2% — 2 of 164" },
  ],

  blocks: [
    {
      kind: "p",
      text: "Qdex-1.5B scores 42.1% on HumanEval. For about a month it scored 39.0%, and the model never changed in between. What changed was the thing doing the counting.",
    },

    {
      kind: "h2",
      id: "five-problems",
      text: "The model solved five more problems than my scorer credited it with",
    },
    {
      kind: "p",
      text: "HumanEval is 164 problems. Under the harness I wrote, Qdex passed 64 of them. Under the fixed one it passes 69. Nothing about the weights moved — I did not retrain, re-tune or re-quantise anything between those two runs. Five solutions that worked were being filed as solutions that did not.",
    },
    {
      kind: "p",
      text: "Three percentage points is not a dramatic number and I am not going to pretend it is. What makes it worth writing down is that I published the wrong one, and that the process which produced it looked exactly like a process that was working.",
    },

    {
      kind: "h2",
      id: "what-the-extractor-did",
      text: "The extractor discarded correct answers over how they were formatted",
    },
    {
      kind: "p",
      text: "A code benchmark does not read a model's mind. It reads a blob of text, cuts the program out of it, runs that program against the problem's tests, and records a pass or a fail. The cutting-out step is called extraction, and it is the part nobody writes about because it feels like plumbing.",
    },
    {
      kind: "p",
      text: "Mine was brittle. A 1.5B model asked to write a function does not reliably produce one clean fenced block — it wraps things in prose, adds a second example, closes a fence it never opened, or trails off mid-comment. My extractor handled the tidy cases and dropped the rest on the floor. A dropped answer is not scored as unparseable. It is scored as **wrong**, which is a different claim entirely.",
    },
    {
      kind: "p",
      text: "So the fix was not clever. Harden the extractor against the malformed shapes, add a regression test holding the specific outputs that had been discarded, re-run the whole benchmark rather than the affected rows. That last part matters more than it sounds: re-scoring only the five would have carried over 159 results from a harness I had just admitted was faulty.",
    },

    {
      kind: "h2",
      id: "why-i-looked",
      text: "I audited the number because it disappointed me, and that is not a reason to be proud of",
    },
    {
      kind: "p",
      text: "Here is the part I would rather leave out. I did not go looking for a scoring bug out of rigour. I went looking because the number was implausible in one specific way.",
    },
    {
      kind: "p",
      text: "The base model, Qwen2.5-Coder-1.5B, already solves 40.2% of HumanEval when you let it complete raw code — 66 of 164. It scores 1.2% when you ask it a question instead, because it was never taught to answer one. The entire point of the fine-tune was to close that gap without losing the underlying ability. At 39.0% my model was sitting **below** the base model's latent skill, which would have meant the tuning had quietly cost it something.",
    },
    {
      kind: "p",
      text: "That did not fit. So I opened the harness. If the bug had run the other way — if the extractor had been generous and handed me 45% — it would have fit perfectly, I would have published it, and I would still be quoting it today.",
    },
    {
      kind: "p",
      text: "Which is an uncomfortable thing to notice about your own process, and I think it generalises. **You only ever audit a number that disappoints you.** A flattering bug produces a result that confirms what you hoped, and nobody opens the code to ask why the good news is good. This is reasoning rather than a measurement — but it does predict that published scores across the field skew high, and it costs nothing to assume that about your own.",
    },
    {
      kind: "pullquote",
      text: "You only ever audit a number that disappoints you.",
    },

    {
      kind: "h2",
      id: "not-just-me",
      text: "Public evaluation harnesses have shipped the same class of bug",
    },
    {
      kind: "p",
      text: "This is not a story about being an amateur, which is the reading I expected and the reason I checked before writing.",
    },
    {
      kind: "p",
      text: "EleutherAI's `lm-evaluation-harness` — the harness a great many published results are produced with — carried a scoring bug in its Math Verify path where the code stripped `\\boxed{}` notation from an answer before handing it to a parser that relies on that notation to find the answer. Same shape as mine: the model was right, the pipeline threw the answer away, the row was recorded as a failure. The same project has also had evaluation documents leak into their own few-shot prompts on several tasks, `humaneval_instruct` among them.",
    },
    {
      kind: "p",
      text: "And HumanEval+ exists as a project largely because the original benchmark shipped with test harness bugs, misplaced assertions, import faults and mistakes in its own reference solutions. A 2026 paper on benchmark-validity audits puts the general case better than I can: audit conclusions can be silently manufactured by implementation details.",
    },

    {
      kind: "h2",
      id: "two-things-one-name",
      text: "A benchmark number measures two things and names only one of them",
    },
    {
      kind: "p",
      text: "\"Qdex-1.5B scores 42.1% on HumanEval\" reads like a property of the model. It is not. It is a property of the model *and* the harness, jointly, and the sentence names one of them.",
    },
    {
      kind: "p",
      text: "That is why leaderboard positions move when nobody has retrained anything, and why two people evaluating the same open weights on the same benchmark get different figures and both are being honest. The weights are the reproducible half. The extraction rules, the prompt template, the stop tokens, the timeout, how a malformed output is classified — none of that travels with the model, and all of it lands in the number.",
    },
    {
      kind: "p",
      text: "The practical version is short. Publish the harness with the score, or expect the score to be treated as a claim rather than a measurement. Mine is on GitHub for that reason, and if somebody re-runs it and gets 41.4% I would rather have that argument than the alternative, which is nobody being able to have it.",
    },
    {
      kind: "promote",
      href: "/llms/qdex-1.5b",
      note: "The model this happened to — how it was trained, what it scores now, and what it still cannot do.",
    },

    {
      kind: "h2",
      id: "still-wrong",
      text: "The old number is still live on the Hugging Face model card",
    },
    {
      kind: "p",
      text: "39.0% was wrong in five places on this site and it took until 10 September to find the last one, sitting on the homepage — which `AEO_PLAYBOOK` records as the most-crawled page here, so of the five it was the one being read most.",
    },
    {
      kind: "p",
      text: "One is still wrong. The Hugging Face model card quotes 39.0% (64/164) and updating it needs a login I cannot reach from the repository, so it has not been done as I write this. That is the honest state of it, and the reason I would rather say so than quietly fix it before publishing: a post about auditing your own numbers that presents a tidy finished picture is doing the thing it is arguing against.",
    },
  ],

  faqs: [
    {
      q: "How do you know a benchmark score is measuring the model and not the harness?",
      a: "You do not, unless the harness is published alongside the score. A benchmark result is a joint property of the weights and the evaluation code — extraction rules, prompt template, stop tokens and how malformed output is classified all land in the number, and none of them travel with the model.",
    },
    {
      q: "What is an answer-extraction bug in an evaluation harness?",
      a: "Extraction is the step that cuts a runnable program out of a model's raw text output before the tests are run against it. When it fails on a formatting artifact — an unclosed code fence, trailing prose, a second example — the answer is discarded, and a discarded answer is usually recorded as wrong rather than as unparseable.",
    },
    {
      q: "Should you re-run a whole benchmark after fixing the scoring code, or only the affected rows?",
      a: "The whole benchmark. Re-scoring only the rows you know about carries every other result over from a harness you have just established was faulty, which leaves you unable to say whether the remaining figures came from the fixed code or the broken code.",
    },
  ],

  seeAlso: ["/notebook", "/llms/qdex-1.5b", "/projects"],
};

export default post;
