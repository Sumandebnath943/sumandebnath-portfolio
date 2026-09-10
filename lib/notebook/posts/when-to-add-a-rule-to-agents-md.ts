import type { Post } from "../types";

const post: Post = {
  slug: "when-to-add-a-rule-to-agents-md",
  title: "Nine rules I wrote for my AI agents, and the failure behind each",
  answer:
    "An AGENTS.md rule earns its place when you can name the specific failure it prevents. In a 79-line file, five of nine rules exist because something broke without producing an error, two because the framework changed, one is a convention and one is not about code. Rules without an incident behind them make agents measurably worse.",
  description:
    "A controlled study found generated context files reduce coding agent success. Here is what nine hand-written rules cost to learn, and the test for adding a tenth.",
  metaTitle: "When to add a rule to your AGENTS.md file",
  // SERP-checked 13 Sep 2026. "AGENTS.md best practices" is well served since
  // the Gloaguen paper landed in February — Upsun, DAIR.AI and several
  // newsletters cover it, and the arXiv page ranks. What none of them answer is
  // the selection question: given that fewer lines is better, which line stays.
  // The phrases below aim at that.
  keywords: [
    "when to add a rule to AGENTS.md",
    "what to put in an AGENTS.md file",
    "AGENTS.md too long",
    "developer-written versus generated context file",
  ],
  published: "2026-09-14",
  category: "Method",
  // Live topic with real demand — AGENTS.md went from convention to research
  // subject inside a year. Gap scored mid rather than high on purpose: the
  // topic is covered, the selection criterion is not. Evergreen is limited by
  // the filename; the argument outlives it, the format may not.
  popularity: {
    searchDemand: 15,
    evergreen: 11,
    painIntensity: 12,
    gapInCoverage: 13,
    shareability: 15,
  },
  popularityScore: 66,
  tags: ["Agents", "Process", "Documentation"],
  readingMinutes: 7,
  cover: "/notebook/when-to-add-a-rule-to-agents-md.webp",
  coverAlt:
    "A bright desk with a laptop open on a file named INSTRUCTIONS.md listing nine numbered rules for an agent, and a printed sheet headed \"9 Rules\" propped in front of it with a red cross marked against every line. Notes pinned above read \"Smaller instructions, better results, fewer surprises\".",
  facts: [
    { label: "File length", value: "79 lines, of which 9 are machine-generated" },
    { label: "Hand-written rules", value: "Nine" },
    { label: "Rules from silent failures", value: "Five" },
    { label: "Rules from framework changes", value: "Two" },
    { label: "Rules that are not about code", value: "One" },
    { label: "Study", value: "Gloaguen et al., arXiv 2602.11988, February 2026" },
    { label: "Generated context files", value: "0.5–2% lower success, 20%+ more inference cost" },
    { label: "Developer-written context files", value: "About 4% gain when minimal" },
  ],

  blocks: [
    {
      kind: "p",
      text: "The instruction file my coding agents read is 79 lines long. Nine of those lines are a block a tool writes for me. The rest is prose, and inside it sit nine numbered rules that I added one at a time, always after something had gone wrong.",
    },
    {
      kind: "p",
      text: "None of them is a preference. That is the whole selection criterion, and it took a while to arrive at.",
    },

    {
      kind: "h2",
      id: "the-study",
      text: "A controlled study found generated context files make agents worse, not better",
    },
    {
      kind: "p",
      text: "For most of the last year, the advice was to write more. Describe the architecture. The conventions. The testing approach. The review standards. Then in February 2026 a team at ETH Zürich measured it — 138 tasks drawn from twelve Python repositories, four different coding agents, three conditions: no context file, one written by a model, and one written by the repository's own developers.",
    },
    {
      kind: "p",
      text: "The generated files **lost**. Success rates fell by 0.5 to 2% against giving the agent no context file at all, while inference cost rose by more than 20%. Developer-written files gained, but modestly — around 4%, and only when they stayed minimal. The behavioural detail is the part worth sitting with: agents given a context file ran more tests, searched more files, traversed more of the repository and produced more reasoning tokens. They worked harder and finished worse.",
    },
    {
      kind: "p",
      text: "The paper's own conclusion is that unnecessary requirements make tasks harder, and that a human-written file should describe only minimal requirements. Which is correct, and not yet actionable. **Minimal** is a property you can only check once you have already decided what counts.",
    },

    {
      kind: "h2",
      id: "silent-failures",
      text: "Five of the nine exist because something broke without producing an error",
    },
    {
      kind: "p",
      text: "Five. That is more than half of them, and it is not a coincidence — every one of these fails while looking exactly like success.",
    },
    {
      kind: "ul",
      items: [
        "**An ancestor with `overflow-hidden` silently disables `position: sticky`.** No warning, no console message. The element simply stops sticking, several components away from the CSS that caused it.",
        "**The body is the scroll container here, so `window` scroll listeners never fire.** The listener attaches, the handler is correct, the events never arrive. `IntersectionObserver` is the answer.",
        "**Visitor tracking does nothing under `next dev`.** React StrictMode's mount, cleanup and remount cycle trips an initialisation guard, and the listeners never re-attach. Everything looks fine in development and only production is real.",
        "**`saveVisit()` returns `false`. It never throws.** So a partial failure and a complete success are indistinguishable unless you read the return value.",
        "**Adding a page means adding it to `STATIC_ROUTES` too.** Miss it and a monitor reports the new page as a 404 on every check, forever. Nothing on the site breaks, so nobody notices.",
      ],
    },
    {
      kind: "p",
      text: "An agent is unusually exposed to this class of problem, and the reason is worth naming. It cannot tell the difference between a task that worked and a task that produced no error, because for most tasks those are the same signal. A human eventually notices the page looks wrong. An agent reports success and moves on to the next thing.",
    },
    {
      kind: "pullquote",
      text: "It cannot tell the difference between a task that worked and a task that produced no error.",
    },

    {
      kind: "h2",
      id: "framework-moved",
      text: "Two exist because the framework moved and the training data did not",
    },
    {
      kind: "p",
      text: "`middleware.ts` is gone in this version of Next.js. It is `proxy.ts` now, exporting a `proxy(request)` function with a statically-read `config.matcher`, running on the Node runtime. A model trained before that change will write `middleware.ts` with complete confidence, and the file will sit there doing nothing.",
    },
    {
      kind: "p",
      text: "The second one is smaller and more annoying: `next/image` accepts exactly one `quality` value in this project, because the config option that would allow others is unset. Every other number fails.",
    },
    {
      kind: "p",
      text: "Neither of these is a bug and neither is a preference. They are places where the model's most probable answer is wrong for this repository, which is a different reason for a rule to exist and, I think, the most durable one. The version will keep moving.",
    },

    {
      kind: "h2",
      id: "not-about-code",
      text: "One of the nine is not about code at all",
    },
    {
      kind: "p",
      text: "There is an idea I have already considered, thought about properly, and deliberately parked. It is a reasonable idea. It is reasonable enough that a fresh agent, looking at the same evidence, proposes it — and then the next one proposes it, and the one after that.",
    },
    {
      kind: "p",
      text: "So the ninth rule says: this has been decided, do not raise it unprompted, and here is the one specific symptom that would make it worth raising again. It encodes a judgement rather than a fact, and it is there because repeating a rejected suggestion costs attention every single time.",
    },
    {
      kind: "p",
      text: "I have not seen this category discussed anywhere, and it is the rule I would least like to lose. A new agent has no memory of what you have already turned down. Without a note, it will keep finding the same good idea for as long as the repository exists.",
    },

    {
      kind: "h2",
      id: "the-test",
      text: "A line earns its place when you can name the failure it prevents",
    },
    {
      kind: "p",
      text: "That is the whole rule, and it is why the file is 79 lines rather than 400. Before adding anything I have to be able to finish the sentence: *this is here because on such-and-such a date, this specific thing happened.* If the sentence does not finish, the line does not go in.",
    },
    {
      kind: "p",
      text: "It rules out most of what people put in these files. Architecture overviews go out, because the agent can read the architecture. Coding style goes out, because the linter enforces it and an agent reading the surrounding code will match it anyway. Testing philosophy goes out. General best practice goes out hardest of all — it is the purest form of the unnecessary requirement the study found is costing success.",
    },
    {
      kind: "p",
      text: "The one exception I allow is the ninth rule, which is not an incident but a decision, and I would rather be honest that the criterion has an exception than pretend it does not.",
    },

    {
      kind: "h2",
      id: "the-generated-block",
      text: "The top of my file is machine-written, and I commit it anyway",
    },
    {
      kind: "p",
      text: "Nine of the 79 lines are generated. `next dev` writes a block at the top saying this version of the framework differs from what is in your training data, and pointing at the docs bundled in `node_modules`. It re-adds itself if you delete it, so removing it from a diff only produces the same uncommitted change again the next time the dev server runs.",
    },
    {
      kind: "p",
      text: "Which makes my file a hybrid of exactly the two categories the study separated — a generated block sitting on top of nine hand-written rules — and I cannot tell you which side of the line it lands on. Nine generated lines is a long way from the bloated generated file the paper measured. It is also not nothing, and I did not choose it.",
    },
    {
      kind: "p",
      text: "I commit it because fighting a tool that rewrites a file on every run is a worse use of a morning than accepting nine lines of accurate warning. But it is a good reminder that the file is not entirely mine, and that the next version of the tool could make that block considerably longer without asking.",
    },
  ],

  faqs: [
    {
      q: "How do you decide what belongs in an AGENTS.md file?",
      a: "Require an incident. A line goes in only if you can finish the sentence \"this is here because on this date, this specific thing happened\" — which rules out architecture overviews, coding style and general best practice, since an agent can read the code for the first two and the third is the unnecessary requirement shown to reduce success rates.",
    },
    {
      q: "Does a longer AGENTS.md make a coding agent better?",
      a: "No. A February 2026 study across 138 tasks and twelve repositories found agents given context files ran more tests, searched more files and produced more reasoning tokens while finishing worse. Developer-written files gained about 4% only when kept minimal; unnecessary requirements measurably made tasks harder.",
    },
    {
      q: "Should you let an AI write your own AGENTS.md file?",
      a: "The measured answer is no. In the same study, model-generated context files lowered coding agent success rates by 0.5 to 2% compared with supplying no context file at all, while raising inference cost by more than 20%. Developer-written files were the only condition that gained anything.",
    },
  ],

  seeAlso: ["/notebook", "/projects", "/about"],
};

export default post;
