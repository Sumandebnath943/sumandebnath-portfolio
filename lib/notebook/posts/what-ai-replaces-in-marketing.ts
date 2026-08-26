import type { Post } from "../types";

const post: Post = {
  slug: "what-ai-replaces-in-marketing",
  title:
    "AI replaces tasks, not jobs — unless your job is only tasks",
  answer:
    "AI replaces tasks rather than whole jobs, but a role made up entirely of replaceable tasks is effectively a replaced role. In marketing the exposed work is reporting, data gathering, first drafts, asset variants and rule-based campaign operations. What survives is deciding what is worth doing, judging whether it lands, being accountable, and governing the systems.",
  description:
    "Written by a marketer automating his own discipline. The five kinds of marketing work genuinely at risk, what survives, and why junior roles carry most of it.",
  metaTitle: "Will AI replace marketing jobs? What is exposed",
  keywords: ["will AI replace marketing jobs", "marketing tasks AI can do", "AI impact on marketing careers", "is marketing a safe career"],
  published: "2026-08-26",
  category: "Marketing & AI",
  // Enormous demand and almost all of it answered either by vendors with
  // something to sell or by commentators with no operational experience. The
  // author automating his own function is the unusual credential here.
  popularity: {
    searchDemand: 19,
    evergreen: 12,
    painIntensity: 17,
    gapInCoverage: 15,
    shareability: 17,
  },
  popularityScore: 80,
  tags: ["Marketing", "AI-Native", "Career"],
  readingMinutes: 8,
  cover: "/notebook/what-ai-replaces-in-marketing.webp",
  coverAlt:
    "A column of paper trays: mechanical arms lift the top three away while a heavy weight holds the bottom two down.",
  facts: [
    { label: "Author's background", value: "Nine years in brand and performance marketing" },
    { label: "Position", value: "Has spent two years building systems that automate parts of that work" },
    { label: "Most exposed", value: "Roles composed entirely of repeatable execution" },
    { label: "Least exposed", value: "Judgement, accountability, and governing the systems" },
  ],

  blocks: [
    {
      kind: "p",
      text: "I am in an awkward position to write this. I spent nine years in brand and performance marketing, and I have spent the last two building systems that automate parts of the job I used to do by hand. Whatever I say here, I have already voted with my time.",
    },
    {
      kind: "p",
      text: "So I will try to be more useful than reassuring. The honest answer is not \"AI will not take your job\" and it is not \"everything is about to be automated\". It is more specific and more uncomfortable than either.",
    },

    { kind: "h2", id: "tasks-not-jobs", text: "AI replaces tasks. Jobs are bundles of tasks." },
    {
      kind: "p",
      text: "This is the distinction that makes the whole argument tractable, and both of the popular positions ignore it.",
    },
    {
      kind: "p",
      text: "No system currently replaces a marketing manager, because a marketing manager does thirty different things and only some of them are automatable. But **a job is a bundle of tasks, and if every task in the bundle is exposed, the bundle goes.** That is not a statement about capability, it is arithmetic. The question is not whether your profession survives. It is what proportion of your particular week is made of work a system can now do.",
    },
    {
      kind: "quote",
      text: "Nobody's job is replaced by AI. Some people's jobs are entirely made of tasks that were.",
    },

    { kind: "h2", id: "exposed", text: "What is genuinely exposed" },
    {
      kind: "p",
      text: "Being specific matters more than being comforting, so here is the work I would consider at real risk, from my own discipline.",
    },
    {
      kind: "ul",
      items: [
        "**Reporting.** Pulling numbers from several platforms into a weekly deck. This was already half-automated and is now fully automatable, including the commentary.",
        "**Data gathering and first-pass analysis.** Collecting, cleaning and summarising — competitor monitoring, keyword research, audience pulls. The gathering is gone. The interpretation is not.",
        "**First drafts.** Ad copy variants, outlines, briefs, subject lines, product descriptions. Not final copy, but the blank-page problem is solved and a large amount of paid work was the blank-page problem.",
        "**Asset variants.** Resizing, reformatting, versioning for six placements. This is skilled, tedious work and it is going.",
        "**Rule-based campaign operations.** Bid adjustments, budget shifts, pausing what underperforms against a threshold. If it can be written as a rule, it can be executed without you.",
      ],
    },
    {
      kind: "p",
      text: "I would draw one line through all of that: **it is work where the correct answer is determinable from the inputs.** Where the task is to apply a known procedure to available data, it is exposed. That covers a great deal of what marketing departments actually spend their hours on.",
    },

    { kind: "h2", id: "not-exposed", text: "What is not, and why" },
    {
      kind: "p",
      text: "The surviving work has a shared property too: it requires deciding something that the inputs do not determine.",
    },
    {
      kind: "ul",
      items: [
        "**Deciding what is worth doing.** A system will optimise the objective you give it and cannot tell you the objective is wrong. Choosing what to pursue this quarter is not a data problem.",
        "**Judging whether something lands.** Whether a line is embarrassing, whether a claim will be believed, whether a campaign is funny or merely trying to be. This is taste, and taste is not derivable from the brief.",
        "**Being accountable.** Somebody has to be answerable for what went out. A model cannot hold responsibility, and organisations do not function without someone who can.",
        "**Relationships.** Negotiating with an agency, managing a stakeholder who wants the wrong thing, keeping a team functional. Almost none of a senior marketing job is executional and most of it is this.",
        "**Novel positioning.** What to do when there is no comparable case — a new category, an unprecedented crisis, a competitor who has done something nobody expected.",
      ],
    },

    { kind: "h2", id: "the-uncomfortable-part", text: "Junior execution roles carry most of the risk" },
    {
      kind: "p",
      text: "I do not think it is honest to write this piece without saying the specific thing, and the specific thing is that the exposure is not evenly distributed.",
    },
    {
      kind: "p",
      text: "A senior marketer's week is mostly judgement, accountability and people. An executive-level role at the start of a career is, by design, mostly execution — that is the point of the job, and it is how the profession has always trained people. Those roles are where the replaceable tasks are concentrated, which means the risk sits with the people least able to absorb it.",
    },
    {
      kind: "p",
      text: "That has a second-order problem nobody in my industry has solved: the executional years are how people acquire the judgement that makes senior work possible. If we automate the training ground, we should expect a shortage of judgement in about a decade, and no plan currently exists for that.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "If you are early in your career",
      text: "The defence is not working faster at execution — that is competing where you are weakest. It is deliberately acquiring the parts of the job that are not determinable from inputs: sit in the meetings where things are decided, learn why a campaign was chosen rather than how it was run, and get comfortable directing systems instead of being one. That transition is available to anyone who starts it early.",
    },

    { kind: "h2", id: "the-new-work", text: "The work that appears instead" },
    {
      kind: "p",
      text: "The thing I am most confident about is that we cannot yet let these systems run unsupervised, and that this creates real jobs rather than merely preserving old ones.",
    },
    {
      kind: "p",
      text: "Somebody has to direct them, check their outputs, notice when the reasoning is wrong rather than merely the answer, and decide what happens when they fail. In my own work that is where a substantial share of my time goes — not producing, but checking what was produced and rejecting a decent proportion of it. That is a skill, it is learnable, and almost nobody has it yet because the tools are two years old.",
    },
    {
      kind: "p",
      text: "It is also, I think, the more interesting job. Directing a set of capable systems toward something worth doing is closer to the work marketers claim to want than pulling a weekly report was.",
    },

    { kind: "h2", id: "the-summary", text: "The version I would give a colleague" },
    {
      kind: "p",
      text: "Look at your last fortnight honestly and sort it: work where the right answer follows from the inputs, and work where it does not. The first column is the exposed portion of your job. Nobody can tell you what proportion that is except you, and the number is the only thing in this article that matters.",
    },
    {
      kind: "p",
      text: "If it is most of your week, that is a genuine reason to move — not out of marketing, but toward the parts of it that require deciding rather than executing. The profession is not going anywhere. Some of its current shapes are.",
    },
  ],

  faqs: [
    {
      q: "Will AI replace marketing jobs?",
      a: "It replaces tasks rather than roles, but a role composed entirely of replaceable tasks is effectively replaced. The exposed work is anything where the correct answer follows from the available inputs: reporting, data gathering, first drafts, asset variants and rule-based campaign operations. Judgement, accountability and relationships are not exposed in the same way.",
    },
    {
      q: "Which marketing tasks are most at risk of automation?",
      a: "Reporting and its commentary, data gathering and first-pass analysis, first drafts of copy and briefs, producing asset variants across placements, and any campaign operation that can be expressed as a rule. These share one property: the correct output is determinable from the inputs by applying a known procedure.",
    },
    {
      q: "What should a junior marketer do about AI automation?",
      a: "Competing on execution speed is competing where automation is strongest. The more durable move is acquiring the work that is not determinable from inputs — understanding why decisions were made rather than how campaigns were run, and learning to direct and check automated systems, which is a genuine and currently scarce skill.",
    },
  ],

  seeAlso: ["/projects", "/philosophy", "/notebook"],
};

export default post;
