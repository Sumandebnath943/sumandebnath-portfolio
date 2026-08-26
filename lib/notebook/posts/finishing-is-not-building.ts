import type { Post } from "../types";

const post: Post = {
  slug: "finishing-is-not-building",
  title:
    "Eight repositories in eleven days. Six died within three.",
  answer:
    "Between 21 June and 1 July 2026, Suman Debnath created eight repositories. Six of them stopped receiving commits within three days; the two that did not became an agent fleet still in active development two months later. The mistake was not speed — it was treating a working first version as a finished product.",
  description:
    "The commit history is not vague: eight repositories in eleven days, six abandoned within three, two that became something. What separated them was not the idea.",
  metaTitle: "Why solo builders abandon projects: 8 repos, 11 days",
  keywords: ["abandoned side projects", "why developers abandon projects", "shipping vs finishing", "solo builder mistakes"],
  published: "2026-08-26",
  category: "Career",
  // Very common failure among solo builders and newly enabled non-engineers,
  // rarely written about with evidence attached because the evidence is
  // embarrassing. Evergreen — nothing about this depends on tooling.
  popularity: {
    searchDemand: 12,
    evergreen: 18,
    painIntensity: 14,
    gapInCoverage: 17,
    shareability: 17,
  },
  popularityScore: 78,
  tags: ["Career", "Process", "AI-Native"],
  readingMinutes: 6,
  cover: "/notebook/finishing-is-not-building.webp",
  coverAlt:
    "Eight flags planted in a line: six collapsed and faded, the last two upright and grown into built structures.",
  facts: [
    { label: "Repositories created", value: "Eight, between 21 June and 1 July 2026" },
    { label: "Abandoned within three days", value: "Six" },
    { label: "Still active two months later", value: "Two" },
    { label: "Typical time from start to last commit", value: "Zero to three days" },
    { label: "What the survivors had", value: "Continued attention, not a better idea" },
  ],

  blocks: [
    {
      kind: "p",
      text: "I can date my worst habit precisely, because it is in the commit history and there is no arguing with it.",
    },
    {
      kind: "p",
      text: "Between the twenty-first of June and the first of July this year — eleven days — I created eight repositories. A command-line agent, a small language model, a shell, a fine-tune, a reminder app, and three others. Six of those eight received their last commit within three days of being created. Two did not, and those two became the agent fleet that is still in active development two months later.",
    },
    {
      kind: "p",
      text: "At the time this felt like the most productive stretch I had ever had. Every few days something worked that had not worked before. That is a genuinely intoxicating feeling and it is why the habit is difficult to see from the inside.",
    },

    { kind: "pullquote", text: "Six of those eight received their last commit within three days of being created." },

    { kind: "h2", id: "the-mistake", text: "The mistake was not speed" },
    {
      kind: "p",
      text: "I want to be careful about the lesson here, because the obvious one is wrong. \"Slow down\" is not it. Building quickly is the entire advantage of the way I work and I would not give it up.",
    },
    {
      kind: "p",
      text: "The mistake was that I treated the moment a thing worked as the moment it was finished. Those are separated by a very long distance, and almost all of the distance is unglamorous: the states nobody tested, the second device, the error that only appears when the network is slow, the interface that made sense to me because I built it, the security model nobody looked at twice.",
    },
    {
      kind: "quote",
      text: "A working version is a demonstration. A finished one is a product. I was collecting demonstrations and calling it a portfolio.",
    },
    {
      kind: "p",
      text: "Several of those six are not failures, and I want to be fair to them. A couple became genuine published artefacts with real numbers behind them. But they arrived at the state of being interesting and then stopped, because I had already started the next thing, and interesting is not the same as useful to somebody else.",
    },

    { kind: "h2", id: "why-it-happens", text: "Why this happens more now" },
    {
      kind: "p",
      text: "This failure has always existed among people who build things. What has changed is the ratio.",
    },
    {
      kind: "p",
      text: "When getting to a working version took three weeks, the cost of starting something new was high enough to make you think about it. When it takes an evening, there is nothing to stop you, and the reward — the feeling of a thing existing that did not exist this morning — arrives immediately and repeatedly. Refinement offers no such reward. Nothing visible happens on the day you fix the eleventh edge case.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "The measure that misled me",
      text: "I was unconsciously counting projects. Eight repositories in eleven days reads as an extraordinary fortnight by that measure, and it is the measure most visible to you while you are working — new folders, new names, new first commits. The measure that mattered was how many of them anyone could use, and by that measure the fortnight produced two.",
    },

    { kind: "h2", id: "the-survivors", text: "What the two survivors had in common" },
    {
      kind: "p",
      text: "Not better ideas. I do not think the fleet was a more promising concept than the shell or the model — in some ways it was less so. What it had was that I came back the next week, and the week after.",
    },
    {
      kind: "p",
      text: "Everything that makes those two projects worth anything today happened after the point where the earlier six had stopped. The evaluation harness, the interface someone else can operate, the failure handling, the part where it keeps running when I am not watching it. All of that is week three, week five, week nine work. None of it is exciting and all of it is what separates a thing that exists from a thing that is used.",
    },

    {
      kind: "promote",
      href: "/projects",
      note: "The two that survived, and everything built since. Finished work only — the abandoned eight are not here.",
    },
    { kind: "h2", id: "what-i-do-now", text: "What I do differently" },
    {
      kind: "ol",
      items: [
        "**One thing at a time gets refinement.** I still start things quickly — that is not the problem — but only one project at a time is allowed to be in the polishing phase, and it stays there until it is genuinely done.",
        "**A working version is logged as a prototype**, explicitly, in my own head. It does not go on the site, it does not count, and it is not described as shipped.",
        "**The test is whether somebody else could use it without me in the room.** Not whether it runs. Almost everything runs.",
        "**When I want to start something new mid-refinement**, I write the idea down and carry on. The urge is real and it passes, and the note costs nothing.",
      ],
    },
    {
      kind: "p",
      text: "The honest summary is that for a stretch I was optimising for the feeling of progress rather than for progress, and the two are close enough to be mistaken for each other for quite a long time. The commit history is what eventually made the difference visible, which is a reasonable argument for occasionally looking at your own.",
    },
  ],

  faqs: [
    {
      q: "Why do solo builders abandon so many projects?",
      a: "Because reaching a working version has become fast and rewarding, while refinement is slow and produces no visible result. Starting something new delivers an immediate sense of progress; fixing the eleventh edge case does not. The imbalance is structural rather than a failure of discipline, and it is worth designing around explicitly.",
    },
    {
      q: "What is the difference between a working project and a finished one?",
      a: "A working version demonstrates that the idea is possible. A finished one handles the untested states, works on a second device, survives a slow network, makes sense to someone who did not build it, and has had its security model examined. Most of the distance between them is unglamorous and invisible while it is being covered.",
    },
    {
      q: "How do you decide whether a side project is actually done?",
      a: "The useful test is whether somebody else could use it without the author present. Whether it runs is not a test — almost everything runs. Judging by that standard rather than by whether the build succeeds tends to reclassify a large number of apparently finished projects as prototypes.",
    },
  ],

  seeAlso: ["/projects", "/journey", "/notebook"],
};

export default post;
