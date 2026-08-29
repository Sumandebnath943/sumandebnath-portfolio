import type { Post } from "../types";

/*
  The `answer` block is impersonal while the body is first person, following
  `the-cost-of-building-alone` rather than `marketer-to-ai-product-builder`.

  This post is not doing entity work — it is not trying to resolve which Suman
  Debnath is which — so the answer does not need to carry the name. What it does
  need is to survive extraction, and a first-person account of a mood
  ("I feel empty when…") attributes to nobody once it is lifted off the page.
  Stating the claim rather than the testimony fixes that; the body underneath is
  testimony throughout, which is what BLOG_GUIDELINES §7 requires of it.
*/

const post: Post = {
  slug: "empty-between-projects",
  // The first version of this headline was "I only feel capable while something
  // is being built". It is the honest sentence and it is still the argument, but
  // it is the wrong thing to put in a shop window: this notebook sits on a site
  // whose other job is convincing a client or an employer, and a headline that
  // volunteers a limit on the author's own capability works against that on every
  // surface it appears — the index, the search result, the card somebody shares.
  //
  // The body keeps the admission, because that is where its value is. The
  // headline states what the piece concludes instead of what it confesses.
  title: "The empty week after a build is a cost, not a verdict",
  answer:
    "The low that arrives between builds is usually mistaken for boredom or burnout. For someone who came to building late and without training, it is closer to losing the evidence: the ability only feels real while something is being made, so an empty week reads as proof it was never there.",
  description:
    "The flat stretch between projects, read off a real commit log: what it feels like, why it lands harder with no engineering background, and what helps.",
  metaTitle: "Why builders feel empty between projects",
  keywords: [
    "feeling empty between projects",
    "post-launch low after shipping",
    "motivation between side projects",
    "non-technical builder identity",
  ],
  published: "2026-08-29",
  category: "Career",
  // Scored one point above `overflow-hidden-kills-position-sticky` (86), which
  // is a deliberate claim and worth defending rather than nudging past.
  //
  // searchDemand 15 — lower than a CSS bug every front-end developer meets, but
  //   people do search this, in plain language, usually at the point where they
  //   have decided it is a character flaw.
  // evergreen 19 — nothing in it is tied to a version, a framework or a tool.
  //   The sticky article outlives most posts here; this one outlives the stack.
  // painIntensity 18 — it hurts, it is invisible from outside, and it gets
  //   misread by the person having it as evidence about their own ability.
  // gapInCoverage 17 — burnout and motivation are written to death. The specific
  //   claim, that the low is about unpaperworked capability going unproved, is
  //   not one I have found made anywhere.
  // shareability 18 — this is the kind of piece somebody forwards with
  //   "this is me" and nothing else.
  popularity: {
    searchDemand: 15,
    evergreen: 19,
    painIntensity: 18,
    gapInCoverage: 17,
    shareability: 18,
  },
  popularityScore: 87,
  tags: ["Career", "Process", "AI-Native"],
  readingMinutes: 8,
  cover: "/notebook/empty-between-projects.webp",
  coverAlt:
    "A hand turning a crank generator on a dark workbench, wired to a bare bulb that is lit only while the crank is being turned.",
  facts: [
    { label: "Commits, 18 July – 11 August 2026", value: "6, spread over four days" },
    { label: "Commits, 12 – 28 August 2026", value: "183, over sixteen days" },
    { label: "Longest gap in the quiet stretch", value: "Eight days" },
    { label: "Background", value: "Nine years in brand and performance marketing, no engineering training" },
    { label: "What the low is", value: "A described mood, not a diagnosis — see the note in the article" },
  ],

  blocks: [
    {
      kind: "p",
      text: "This repository has two stretches in it and they do not look like they belong to the same person.",
    },
    {
      kind: "p",
      text: "Between the eighteenth of July and the eleventh of August I made six commits. Four days out of twenty-five had any work in them at all, and the longest gap was eight days. Then, between the twelfth of August and yesterday, a hundred and eighty-three commits across sixteen days.",
    },
    {
      kind: "p",
      text: "Nothing happened in between to explain that. No new job, no deadline, nobody waiting on anything. The difference is that in the second stretch I had things to build and in the first one I did not.",
    },
    {
      kind: "p",
      text: "I want to describe the first stretch properly, because I have not seen it written down by anybody in my position, and I am fairly sure I am not alone in it.",
    },

    { kind: "h2", id: "the-quiet-weeks", text: "What the quiet weeks are like" },
    {
      kind: "p",
      text: "While something is being built I am completely fine. Better than fine. There is a specific moment — a page renders the way it was in my head, an agent finishes a task nobody told it how to finish — and I would put that moment against most things I have felt at work in the last decade.",
    },
    {
      kind: "p",
      text: "Then the building stops. Not because anything broke. Because the thing is done, or because I have run out of features I can think of, or because the next obvious job is maintenance and maintenance is not the same substance.",
    },
    {
      kind: "p",
      text: "What arrives is flat and hollow and very hard to describe to somebody who has not had it. The nearest word in ordinary use is depression, and I am using it the way people use it in conversation rather than the way a doctor uses it. Nothing is wrong. That is the part that makes it strange — nothing is wrong, and I am empty anyway.",
    },

    { kind: "h2", id: "not-boredom", text: "It is not boredom, and the test is simple" },
    {
      kind: "p",
      text: "Boredom is the absence of anything to do, and boredom is solved by almost anything. A film. A walk. Another person in the room. Those are all still available in the quiet weeks and none of them touch it.",
    },
    {
      kind: "p",
      text: "Only building lifts it. That is a very strange property for boredom to have, and anything with exactly one remedy is worth being suspicious of.",
    },
    {
      kind: "p",
      text: "It is also not the tiredness after a hard push, which I have had separately and which feels nothing like this. Tiredness wants rest and is relieved by rest. This wants work and is made worse by rest, which is close to the opposite arrangement.",
    },

    { kind: "pullquote", text: "Anything with exactly one remedy is worth being suspicious of." },

    { kind: "h2", id: "arriving-late", text: "The part that comes from arriving late" },
    {
      kind: "p",
      text: "I am not from this line. Nine years in brand and performance marketing, no computer science degree, no engineering job, and I have never sat down and learned to code in the way the phrase normally means.",
    },
    {
      kind: "p",
      text: "For most of those years I wanted to build things and could not. Not for want of ideas — the ideas were the easy part, and I had a folder of them. The gap between wanting a thing to exist and being able to make it exist was a skill I did not have and did not believe I could get.",
    },
    {
      kind: "p",
      text: "Now I can. And the ability has no paperwork behind it. There is no degree, no job title with the word engineer in it, no team who would vouch for me in a room I am not in. The only evidence that I can do this is the things I have made.",
    },
    {
      kind: "p",
      text: "**Evidence like that has a shelf life.** While something is being built, the evidence is being produced continuously — every evening ends with proof. When nothing is being built, the last thing I made starts receding, and what comes back is not neutral. It is the old feeling from before, the one where I could not do this.",
    },
    {
      kind: "p",
      text: "So an empty fortnight does not read as rest. It reads as a verdict, arriving late, on whether the last two years were real.",
    },
    {
      kind: "p",
      text: "I cannot prove that is the mechanism. It is the best account I have of my own case and it fits the shape of the log, which is not the same as being demonstrated. But it explains something the burnout framing does not: why the low is worst immediately after a good stretch rather than after a bad one.",
    },

    { kind: "h2", id: "the-shorter-loop", text: "AI moved the payouts closer together" },
    {
      kind: "p",
      text: "There is a second half to this and it is about the tooling rather than about me.",
    },
    {
      kind: "p",
      text: "The distance between an idea and a working version of it used to be measured in weeks of learning I was never going to do. It is now measured in evenings. That is the whole reason any of this exists, and I would not trade it back.",
    },
    {
      kind: "p",
      text: "But it means the reward arrives far more often. Something that pays out most days quietly sets an expectation of most days, and a week that pays out nothing then reads as a fault rather than as a gap. I do not think the feeling got deeper. I think the interval it is measured against got shorter.",
    },
    {
      kind: "p",
      text: "I have written before about what that does to the projects — [six of eight repositories abandoned within three days](/notebook/finishing-is-not-building) during one fortnight last summer. This is about what it does to the person, which turns out to be a different question with a different answer.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Where this stops being something I can write about",
      text: "Everything here is my own account of a mood that lifts the moment the work starts again. If yours does not lift, or it is there while you are building as well, or it is reaching your sleep and your eating and the people around you, then it is not the thing described in this article and a blog post is the wrong place for it. That is a conversation for a doctor. I am not one, and I am not diagnosing myself either.",
    },

    { kind: "h2", id: "is-it-a-phenomenon", text: "Is it a phenomenon, or is it just me?" },
    {
      kind: "p",
      text: "I have not gone looking for research and I am not going to imply any supports this.",
    },
    {
      kind: "p",
      text: "What I can say is that the vocabulary already exists elsewhere. Game developers talk about post-release depression freely enough that people writing about it assume the reader knows the term. Independent builders describe a drop after a launch often enough that it is a genre. The shape is recognised even where it is not studied.",
    },
    {
      kind: "p",
      text: "The part I have found nobody describing is this one: the same cycle in somebody for whom the capability itself is new and unaccredited. An engineer between projects is still an engineer on Monday morning. That is a floor, and I do not have it.",
    },
    {
      kind: "p",
      text: "So my honest answer is that it is probably a real pattern, probably not a new one, and probably sharper for people who arrived the way I did. I would rather say that plainly than dress it up as a finding.",
    },

    {
      kind: "promote",
      href: "/journey",
      note: "Where the wanting-and-not-being-able part of this actually starts, with the artefacts attached.",
    },

    { kind: "h2", id: "what-i-do", text: "What I do about it now" },
    {
      kind: "p",
      text: "None of this is a fix. Four things have made the quiet weeks cheaper.",
    },
    {
      kind: "ol",
      items: [
        "**Keep one unglamorous piece of work available.** The error states, the accessibility pass, the documentation nobody asked for. This work does not depend on feeling good to do, and the flat stretch is the only time I have ever been willing to do it.",
        "**Do not open a new repository to fix the mood.** A first commit is the fastest relief available and by far the most expensive. Writing the idea into a file instead is advice I have given before for a completely different reason, and this is the reason that actually makes me follow it.",
        "**Name it while it is happening.** The empty week presents itself as information about whether I can do this. It is not information about that. It is what a fortnight of a hundred and eighty-three commits costs, arriving afterwards.",
        "**Look at the log rather than at the feeling.** The log is the only account of the last month that was not written by the mood. In July it said six commits, which is a small amount of work — and a small amount of work is not the same as none, which is what the flat weeks insist.",
      ],
    },
    {
      kind: "p",
      text: "The stretch at the top of this article ends yesterday and I have no idea how long the current one runs. What has changed is not that the quiet part stopped coming. It is that it no longer reads as an answer to the question of whether I can do this — it reads as the second half of a fortnight I have already had.",
    },
  ],

  faqs: [
    {
      q: "Why do I feel empty when I am not building something?",
      a: "For self-taught and non-traditional builders the capability has no external credential behind it, so the work itself is the only evidence it exists. While something is being made that evidence is produced daily; in a gap it stops, and the absence gets misread as a verdict on ability rather than as an ordinary pause.",
    },
    {
      q: "Is the low between projects the same thing as burnout?",
      a: "They behave differently. Tiredness after a hard push wants rest and is relieved by rest. The between-projects low wants work and is often made worse by rest, and it tends to arrive after a productive stretch rather than a punishing one. A low that does not lift when the work restarts is neither, and warrants medical advice.",
    },
    {
      q: "Does building with AI make the cycle worse?",
      a: "It shortens the interval rather than deepening the feeling. When a working version takes an evening instead of three weeks, the reward of something new existing arrives most days, which sets that as the expected rate. A week producing nothing then registers as a fault instead of a normal gap in the work.",
    },
  ],

  seeAlso: ["/journey", "/projects", "/notebook"],
};

export default post;
