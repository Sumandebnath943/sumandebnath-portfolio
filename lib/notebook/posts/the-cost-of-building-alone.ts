import type { Post } from "../types";

const post: Post = {
  slug: "the-cost-of-building-alone",
  title:
    "The expensive part of building alone is not the hours",
  answer:
    "The expensive part of building software alone is not the hours, it is the absence of correction. There is no colleague to say the approach is wrong, no review before a decision becomes permanent, and no one who knows the codebase well enough to disagree usefully. Tutorials, forums and AI assistants each replace part of that, and none of them replace disagreement.",
  description:
    "With AI assistance labour stopped being the constraint. What is missing is somebody who will say the approach is wrong, and what no substitute replaces.",
  metaTitle: "The real cost of building software alone",
  keywords: ["building software alone", "solo developer challenges", "indie hacker isolation", "solo founder burnout"],
  published: "2026-08-26",
  category: "Method",
  // Large audience — solo builders and indie developers — and the existing
  // writing is mostly productivity advice or burnout confession. The specific
  // claim here, that the missing thing is disagreement rather than labour, is
  // not one I have seen made.
  popularity: {
    searchDemand: 13,
    evergreen: 17,
    painIntensity: 16,
    gapInCoverage: 16,
    shareability: 18,
  },
  popularityScore: 80,
  tags: ["Process", "Career", "AI-Native"],
  readingMinutes: 7,
  cover: "/notebook/the-cost-of-building-alone.webp",
  coverAlt:
    "A long meeting table of empty chairs receding into darkness, with one near chair lit by a single desk lamp.",
  facts: [
    { label: "Team size", value: "One" },
    { label: "Intended finish time", value: "1am" },
    { label: "Actual finish time", value: "3–3:30am, most nights" },
    { label: "Code reviewers available", value: "None" },
    { label: "What replaces them", value: "Tutorials, forums, AI assistants — partially" },
  ],

  blocks: [
    {
      kind: "p",
      text: "The plan is always the same. Fix the outstanding bugs, then sleep at one. It is a reasonable plan and I have made it many times.",
    },
    {
      kind: "p",
      text: "What happens is that you fix the first one and it reveals two more. You fix those two and they reveal four. None of them are hard. Each is fifteen minutes. And at some point you look up and it is half past three and the plan expired two and a half hours ago without any single moment where you decided to abandon it.",
    },
    {
      kind: "p",
      text: "That is the part people describe when they talk about building alone, because it is the part that is easy to describe. It is not the expensive part.",
    },

    { kind: "h2", id: "the-room", text: "The room" },
    {
      kind: "p",
      text: "You are in a closed room at night looking at a screen. Nobody else is awake, nobody else is in the project, and there is no reason for anybody to ask how it is going. This is true whether the work is going well or badly, which means the work going badly produces no external signal at all.",
    },
    {
      kind: "p",
      text: "I want to be careful not to romanticise this. The hours are a cost and they are self-inflicted, and I would not hold them up as evidence of anything except that I have not solved my own scheduling. The sleep is the part of this I would change.",
    },

    { kind: "h2", id: "what-is-missing", text: "What is actually missing is disagreement" },
    {
      kind: "p",
      text: "The obvious framing is that a solo builder is short of hands, and with AI assistance that framing is close to obsolete. I can produce more code in a night than a small team could have produced in a week two years ago. Labour is not the constraint.",
    },
    {
      kind: "p",
      text: "What is missing is **somebody who will tell you that you are wrong**. Not in general — specifically, about this decision, with enough context to be right about it.",
    },
    {
      kind: "ul",
      items: [
        "There is no review before a choice becomes permanent. The first time a bad structural decision gets examined is when it starts hurting, which is usually weeks later and expensive by then.",
        "There is nobody who knows the codebase. Any advice you get is from someone who has never seen it, which limits how specific that advice can be.",
        "There is no calibration. You cannot tell whether a thing you spent two days on was worth two days, because nobody else has an opinion about it.",
        "Every mistake is discovered by you, at the worst moment, and there is nobody to share the discovery with.",
      ],
    },
    {
      kind: "quote",
      text: "The scarce resource is not effort. It is being contradicted by someone who knows what they are talking about.",
    },

    { kind: "h2", id: "the-substitutes", text: "The substitutes, and what each one misses" },
    {
      kind: "p",
      text: "You do replace some of it. The list is short and every item on it has a specific gap.",
    },
    {
      kind: "table",
      head: ["Substitute", "What it gives you", "What it cannot give you"],
      rows: [
        ["Teaching yourself", "Depth, eventually, and it is genuinely yours", "Any sense of whether you learned the right thing first"],
        ["Tutorials", "A known-good path through a known problem", "Anything about your problem, which is never the tutorial's"],
        ["Asking online", "Occasionally an expert answer, free", "Context — they cannot see the codebase, and the question you ask is filtered by what you already believe"],
        ["Asking the AI", "Instant, patient, endlessly available", "Resistance. It will help you do the wrong thing extremely well"],
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The assistant agrees with you too easily",
      text: "This is the substitution that feels closest to a colleague and is least like one. Ask it to review your approach and it will find things to improve within the approach. It will rarely tell you the approach is wrong, and it has no stake in the outcome — which is the thing that makes a real colleague's objection worth hearing. If you want it to push back you have to ask it to, explicitly, and even then you are the one who decided the objection was worth soliciting.",
    },

    { kind: "h2", id: "the-rewarding-half", text: "The half that is genuinely worth it" },
    {
      kind: "p",
      text: "I would not still be doing this if it were only cost, and the honest accounting has a real other side.",
    },
    {
      kind: "p",
      text: "You learn everything, because there is nobody to hand a problem to. Every part of the stack is a part you have had to understand — the deployment, the database, the auth flow, the thing that broke at midnight. That knowledge is not distributed across a team where you own a slice of it. It is all yours, and it compounds.",
    },
    {
      kind: "p",
      text: "Decisions are also instant. There is no meeting, no consensus, no negotiation about scope with somebody who wants a different thing. When I decide at midnight that a section is wrong, it is rebuilt by two, and the total cost of that decision was the rebuild.",
    },
    {
      kind: "p",
      text: "And there is a specific satisfaction in a working system that nobody else touched. It is not a better system than a team would have built. But you know exactly why every part of it is the way it is, which is not a common thing to be able to say.",
    },

    { kind: "h2", id: "what-id-tell-you", text: "What I would tell somebody starting alone" },
    {
      kind: "ol",
      items: [
        "Assume your structural decisions are unreviewed, because they are. Give the ones that are hard to reverse more thought than they seem to deserve.",
        "When you ask an assistant for a review, ask it to argue against the approach, not to improve it. You will get a different and more useful answer.",
        "Write down why you did things. You are the only person who can ever explain them later, and you will not remember.",
        "Find one person who will look at it occasionally, even if they are not technical. Being asked to explain a decision out loud does most of the work that a code review does.",
        "The 1am plan is a fiction. Decide what time you actually stop and stop then, with bugs outstanding.",
      ],
    },
    {
      kind: "p",
      text: "That last one I still do not manage. But the point of writing the cost down is being able to see it, and the cost of building alone is not the nights. It is that nobody is going to tell you the thing you most need to hear, and you have to construct that for yourself, deliberately, every time.",
    },
  ],

  faqs: [
    {
      q: "What is the hardest part of building software alone?",
      a: "The absence of correction rather than the workload. With AI assistance the volume of work is manageable, but there is no review before a decision becomes permanent, nobody who knows the codebase well enough to give specific advice, and no way to calibrate whether time was well spent. Structural mistakes surface weeks later.",
    },
    {
      q: "Can an AI assistant replace a colleague for code review?",
      a: "Only partially. An assistant reviews within the approach it is given and rarely challenges the approach itself, because it has no stake in the outcome and defaults to being helpful. Getting genuine pushback requires explicitly asking it to argue against the design, which still depends on the solo builder deciding that objection was worth seeking.",
    },
    {
      q: "Is building software alone worth it?",
      a: "It carries real compensations: complete knowledge of every part of the system, instant decisions with no negotiation, and a working product nobody else shaped. The costs are unreviewed decisions, no calibration, and considerable isolation. The trade is defensible; it is worth entering with the costs stated rather than discovered.",
    },
  ],

  seeAlso: ["/journey", "/projects", "/notebook"],
};

export default post;
