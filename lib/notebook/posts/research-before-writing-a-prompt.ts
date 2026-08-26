import type { Post } from "../types";

const post: Post = {
  slug: "research-before-writing-a-prompt",
  title: "I spend a fifth of every project before I write the first prompt",
  answer:
    "Research before prompting accounts for roughly ten to twenty percent of a project's duration, and generating the first working version takes less time than any other phase. The prompt is written last, after the reading, and carries context, goal and worked examples — which is what prevents confident but confused output.",
  description:
    "Generating the first working version is the cheapest phase, which makes it the wrong place to spend attention. What the research is, and what skipping it costs.",
  metaTitle: "Research before prompting: a fifth of every project",
  keywords: ["how to write better prompts", "context engineering", "prompt research process", "AI prompting workflow"],
  published: "2026-08-26",
  category: "Method",
  pick: true,
  // Enormous search demand around prompting, almost all of it answered with
  // template lists. The proportions argument — generation is the cheapest phase,
  // so speed is not the constraint — is the part nobody writes.
  popularity: {
    searchDemand: 17,
    evergreen: 13,
    painIntensity: 12,
    gapInCoverage: 16,
    shareability: 16,
  },
  popularityScore: 74,
  tags: ["Prompting", "Process", "AI-Native"],
  readingMinutes: 7,
  cover: "/notebook/research-before-writing-a-prompt.webp",
  coverAlt:
    "An hourglass whose upper chamber is packed with books and documents and whose lower chamber holds one short typed line.",
  facts: [
    { label: "Research share of a project", value: "Roughly 10–20% of total duration" },
    { label: "Shortest phase", value: "Generating the first working version" },
    { label: "Longest phase", value: "Polishing, fixing, auditing" },
    { label: "Artefacts kept", value: "The downloaded source material — no checklist, no scratch file" },
    { label: "What the prompt carries", value: "Context, goal, worked examples" },
  ],

  blocks: [
    {
      kind: "p",
      text: "The last substantial thing I built was answer-engine and generative-engine optimisation for my own site — the work of making a site legible to models rather than only to search crawlers. The first thing I did was not open an editor, and it was not open a chat window either.",
    },
    {
      kind: "p",
      text: "I went and found out what the thing actually required. That took a couple of days. The prompt that started the build took about twenty minutes to write and the first working version arrived shortly after. Those proportions are not an accident and they are not unusual for me — they are the method.",
    },

    { kind: "h2", id: "the-proportions", text: "Generating is the cheapest phase" },
    {
      kind: "p",
      text: "If I break a project into its parts, it comes out roughly like this every time:",
    },
    {
      kind: "table",
      head: ["Phase", "Share of the work"],
      rows: [
        ["Research before any prompt", "About a tenth to a fifth"],
        ["Generating the first working version", "The smallest share of all"],
        ["Polishing, fixing, auditing, hardening", "Most of it"],
      ],
      caption: "Consistent enough across projects that I now plan against it.",
    },
    {
      kind: "p",
      text: "Sit with the middle row for a moment, because it is the row that changes how you should work. **The part everybody optimises is already the fastest part.** Getting something standing up is close to free now. That means speed of generation is not the constraint on the quality of what you ship — judgement is, at both ends of it.",
    },
    {
      kind: "p",
      text: "Research is judgement applied before the work. Auditing is judgement applied after. The prompt in the middle is just the moment those two meet, and it is the part that gets all the attention because it is the visible one.",
    },

    { kind: "h2", id: "what-research-means", text: "What the research actually is" },
    {
      kind: "p",
      text: "Not asking a model to explain the topic to me. That produces a summary I have no way to evaluate, which is precisely the position I am trying not to be in.",
    },
    {
      kind: "p",
      text: "I download the real material — specifications, documentation, published guidance, whatever the primary sources are for the thing I am about to build — and I read it myself. For the optimisation work that meant reading how answer engines actually select and quote content, rather than reading somebody's listicle about it.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "The point of reading it yourself",
      text: "You are about to receive a large amount of confident output on this topic. If you have not read the primary material, you have no independent basis for judging any of it — and a model that is subtly wrong reads exactly like a model that is right. Research is not about knowing how to build the thing. It is about being able to tell whether what comes back is any good.",
    },
    {
      kind: "p",
      text: "I do not keep a checklist, a scratch file or a planning document. People are sometimes surprised by that. The downloaded material **is** the artefact — I read it, and what I need from it ends up in the prompt. Adding a document between those two steps would be process for its own sake, and I would stop maintaining it inside a month.",
    },

    { kind: "h2", id: "the-prompt", text: "Then the prompt, written once and written long" },
    {
      kind: "p",
      text: "Only after that do I write the prompt, and it is long. Four things are always in it:",
    },
    {
      kind: "ul",
      items: [
        "**Context** — what this system is, what already exists around it, what it has to fit into.",
        "**The goal** — what the finished thing has to do, stated as an outcome rather than as an instruction.",
        "**Examples** — worked ones, showing the shape of what I want rather than describing it.",
        "**Constraints** — what it must not do, which is usually the half that gets left out.",
      ],
    },
    {
      kind: "p",
      text: "None of this came from a disaster, and I want to be straightforward about that because process advice is usually trauma-shaped — somebody lost a week, and the habit is the scar. Mine came from courses. I went and learned prompting and context engineering deliberately, before I had built anything worth losing, and I have written prompts this way since.",
    },
    {
      kind: "p",
      text: "I mention it because \"I learned this the hard way\" is a more satisfying story and it would not be true. The dull version is that this is a learnable skill and it was available to learn.",
    },

    { kind: "h2", id: "skipping-it", text: "What skipping it looks like" },
    {
      kind: "p",
      text: "On the occasions I have gone straight to the prompt, the failure is consistent and it is not dramatic. Nothing crashes. What happens is:",
    },
    {
      kind: "ul",
      items: [
        "The output is not wrong, exactly — it is not what I wanted.",
        "It is confused, in the specific sense of having merged two approaches that should not have been merged.",
        "I spend the next hour steering it, which costs tokens.",
        "And it costs time, which is the one I actually mind.",
      ],
    },
    {
      kind: "p",
      text: "That last hour is always longer than the research would have been. That is the whole argument, and it is arithmetic rather than philosophy.",
    },
    {
      kind: "quote",
      text: "A vague prompt does not produce an obviously bad answer. It produces a confident one you then have to argue with.",
    },

    { kind: "h2", id: "the-other-end", text: "The habit this pairs with" },
    {
      kind: "p",
      text: "Research at the front only pays off if there is review at the back, and the review half is the one I would defend hardest. **I do not let the coding agent run on its own.** No auto-accept. I read the diffs before they land, I read the summaries it writes, I read the commit messages.",
    },
    {
      kind: "p",
      text: "Some of that is control — it is a codebase I did not type, and reading is how I keep an accurate model of what is in it. Most of it is learning. Nearly everything I know about building I learned from reading a change carefully enough to decide whether to accept it, which is a slower and considerably better teacher than reading a tutorial.",
    },
    {
      kind: "p",
      text: "So the shape of a project, for me, is: read a lot, write one careful prompt, then spend the majority of the time on everything the prompt did not get right. The middle step is the one that looks like the work. It is the one that matters least.",
    },
  ],

  faqs: [
    {
      q: "How much of a project should go into research before prompting?",
      a: "In this practice, roughly ten to twenty percent of total project duration goes into reading primary material before any prompt is written. The purpose is not to learn how to build the thing but to be able to judge whether the generated output is correct, which is impossible without independent knowledge of the subject.",
    },
    {
      q: "What happens if you write a prompt without researching first?",
      a: "The typical failure is not an error but a mismatch: output that works yet is not what was wanted, often merging two approaches that should have stayed separate. Correcting it by steering the model afterwards consistently takes longer than the research would have taken, and consumes tokens doing it.",
    },
    {
      q: "What should a detailed prompt contain?",
      a: "Four elements: context describing the system and what already surrounds it, the goal stated as an outcome rather than an instruction, worked examples showing the shape of the desired result, and explicit constraints on what must not happen. Constraints are the element most often omitted and the most useful.",
    },
  ],

  seeAlso: ["/notebook", "/philosophy", "/projects"],
};

export default post;
