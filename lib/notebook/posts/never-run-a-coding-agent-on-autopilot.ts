import type { Post } from "../types";

const post: Post = {
  slug: "never-run-a-coding-agent-on-autopilot",
  title: "I never let a coding agent run on autopilot, and I have watched what happens when people do",
  answer:
    "Running a coding agent with auto-accept enabled removes the only step that checks whether the work is the right work. The common failures are not broken code but overbuilding, quiet substitution of a different solution, and confidently finishing something nobody asked for. Keeping approval manual costs time and is what makes the output defensible.",
  description:
    "Auto-accept removes the review step, and the failures that follow are not compile errors — they are overengineering, substitution and building the wrong thing well. What manual approval actually catches, and how to direct an agent instead.",
  published: "2026-08-26",
  category: "Method",
  // The central argument of the AI-assisted-development debate, and the side
  // that gets written least. High demand, high shareability, and durable — the
  // tools change constantly and the question does not.
  popularity: {
    searchDemand: 16,
    evergreen: 15,
    painIntensity: 15,
    gapInCoverage: 17,
    shareability: 18,
  },
  popularityScore: 81,
  tags: ["AI-Native", "Process", "Prompting"],
  readingMinutes: 7,
  facts: [
    { label: "Auto-accept", value: "Never enabled" },
    { label: "Reviewed before landing", value: "Every diff, summary and commit message" },
    { label: "Agent's role", value: "Execution roughly 70–80% of the time" },
    { label: "Remaining share", value: "Used as a thinking partner, still directed" },
    { label: "Tools used", value: "Claude Code, Cursor, Codex, Antigravity" },
  ],

  blocks: [
    {
      kind: "p",
      text: "I have never turned on auto-accept. Not on a small project, not on a throwaway one, not at two in the morning when it would have saved me an hour. Every change an agent proposes gets read before it lands.",
    },
    {
      kind: "p",
      text: "This is usually taken as caution, or as not trusting the tools. It is neither. It is that I have watched several people build on autopilot and I have not yet seen one of those projects arrive anywhere.",
    },

    { kind: "h2", id: "the-failures", text: "The three ways it goes wrong" },
    {
      kind: "p",
      text: "What is striking is that none of the failures are the ones people expect. The code compiles. It usually runs. The problems are one level up from correctness.",
    },
    {
      kind: "h3", id: "overbuilding", text: "It overbuilds" },
    {
      kind: "p",
      text: "Left to complete a task without interruption, an agent will produce the thorough version. Abstractions for cases that will not occur, configuration for choices nobody will make, a layer of indirection in front of something used once. Each individual decision is defensible and the accumulation is a codebase far larger than the problem, which one person then has to hold in their head.",
    },
    {
      kind: "h3", id: "substitution", text: "It substitutes" },
    {
      kind: "p",
      text: "You ask for one thing and receive a neighbouring thing, implemented confidently. Not a hallucination in the dramatic sense — a plausible adjacent solution, delivered with the same tone as the correct one. On autopilot this is accepted and built upon, and by the time it surfaces there are four things standing on top of it.",
    },
    {
      kind: "h3", id: "not-asking", text: "It does not ask" },
    {
      kind: "p",
      text: "This is the expensive one. Given an ambiguous instruction, an agent resolves the ambiguity rather than raising it, because finishing is what it is for. It picks an interpretation and completes the work — and the work is unusable, not because it is bad but because it answers a question you did not ask.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "An agent optimises for the task being done, not for the product being right",
      text: "That is the whole of it. It cannot want the product to be good, because it has no stake in the product. It has a stake in completing the instruction. Most of the time those point the same way. Auto-accept is the setting that removes the check for the times they do not.",
    },

    { kind: "h2", id: "the-division", text: "Who is the mind and who is the hands" },
    {
      kind: "p",
      text: "The way I work is a straightforward division of labour: **I am the mind. The agent executes.** Something like seventy to eighty per cent of what I use it for is execution — I know what I want, I describe it precisely, it builds it, I check it.",
    },
    {
      kind: "p",
      text: "The remaining share is different. There I am genuinely using it to think: what have I not considered, what breaks under load, what is a better structure than the one I have. That is real and it is valuable, and it is still directed. I decide when to open that conversation and I decide what comes out of it.",
    },
    {
      kind: "p",
      text: "What being the mind means in practice is that the specification lives with me and not in the prompt history. Before I start I know what the product does, which features belong in it and which do not, what the interface should feel like, how someone signs in and out, which service gets called at which moment, and what a person is actually trying to accomplish when they arrive. None of that is delegated. It is the part that is mine.",
    },
    {
      kind: "quote",
      text: "The tool is not the thing that decides whether the product is any good. It never was.",
    },

    { kind: "h2", id: "the-technique", text: "Make it ask you questions" },
    {
      kind: "p",
      text: "The single most useful habit I have is not a prompt template. It is that I let the agent do a pass and then require it to come back with questions before continuing.",
    },
    {
      kind: "p",
      text: "This directly attacks the third failure. An agent that has been told to surface its ambiguities instead of resolving them will produce a list, and that list is consistently the most valuable output of the session — because every item on it is a place where it was about to guess, and roughly a third of the guesses would have been wrong.",
    },
    {
      kind: "ol",
      items: [
        "Give it the context and the goal, with the constraints stated.",
        "Let it work.",
        "Before accepting anything, ask what it had to assume and what it would do differently with more information.",
        "Answer those. Then review the diff.",
      ],
    },
    {
      kind: "p",
      text: "That loop is slower than autopilot on any single task and considerably faster across a project, because the expensive failure is never the fifteen minutes to fix a bug. It is the three days spent on top of a wrong assumption.",
    },

    { kind: "h2", id: "reading", text: "Reading everything is how I learned anything" },
    {
      kind: "p",
      text: "I read the diffs, the summaries the agent writes, the commit messages, and what happens on deploy. Some of that is control — it is a codebase I did not type, and reading is the only way I have an accurate picture of what is in it.",
    },
    {
      kind: "p",
      text: "But most of it is learning, and this is the part I would defend to anyone who thinks people like me are not really engaged with what we ship. I did not come from a technical background. Nearly everything I understand about building software I learned by reading a change carefully enough to decide whether to accept it — which is a slower teacher than a tutorial and a considerably better one, because every example is from a system I care about and each decision has a consequence I will personally meet.",
    },
    {
      kind: "p",
      text: "Autopilot removes exactly that. Two years of accepted diffs you never read leaves you with a large application and no more understanding than you started with, and the first serious problem is unrecoverable because you have no map.",
    },

    { kind: "h2", id: "when-autopilot-is-fine", text: "When I would not bother" },
    {
      kind: "p",
      text: "It would be dishonest to pretend the setting has no legitimate use. For something genuinely throwaway — a script that runs once, an experiment that will be deleted, a prototype whose only job is to answer a question — the review has nothing to protect and I would let it run.",
    },
    {
      kind: "p",
      text: "The line is whether anybody is going to depend on it. The moment something will be used by another person, hold data, be deployed anywhere public or be maintained by me in three months, the review is the cheapest part of the whole project.",
    },
    {
      kind: "p",
      text: "Which tool it is makes very little difference to any of this. I work across several of them and the discipline is identical in each. The setting that matters is the same one in all of them, and it is the one I leave off.",
    },
  ],

  faqs: [
    {
      q: "Should you enable auto-accept on an AI coding agent?",
      a: "Not for work anybody will depend on. The typical failures are not broken code but overbuilding, substituting a plausible adjacent solution, and resolving ambiguous instructions instead of raising them. Auto-accept removes the step that catches all three. For throwaway scripts and experiments that will be deleted, the review protects nothing.",
    },
    {
      q: "Why do AI coding agents build things nobody asked for?",
      a: "Because an agent optimises for completing the instruction rather than for the product being correct, and it has no stake in the outcome. Given an ambiguous request it will resolve the ambiguity by choosing an interpretation and finishing, rather than pausing to ask. The result is competent work answering the wrong question.",
    },
    {
      q: "How do you direct a coding agent without giving it full autonomy?",
      a: "Supply context, goal and constraints, let it complete a pass, then require it to report what it had to assume before any change is accepted. That list identifies every point where it was about to guess. Review the diff afterwards. The loop is slower per task and faster per project.",
    },
  ],

  seeAlso: ["/notebook", "/philosophy", "/projects"],
};

export default post;
