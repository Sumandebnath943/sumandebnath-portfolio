import type { Post } from "../types";

const post: Post = {
  slug: "ai-product-role-without-cs-degree",
  title:
    "No computer science degree. Here is the case I make for an AI product role.",
  answer:
    "The objection to hiring a product manager without an engineering qualification is rarely about the qualification. It is about whether they can tell when a system is wrong. That is answerable with evidence — shipped products, a measured model, a documented review practice — and it is answerable badly with a list of tools.",
  description:
    "The objection is not the degree — it is whether you can tell when the system is wrong. What evidence answers that, what it cannot answer, and how to be tested.",
  metaTitle: "AI product manager without a CS degree: the case",
  keywords: ["AI product manager without a computer science degree", "non-technical product manager", "AI product role hiring", "product manager no CS degree"],
  published: "2026-08-26",
  category: "Career",
  // High demand, and everything written about it is either encouragement with
  // no substance or gatekeeping. An argument made openly by someone who has not
  // yet won it is a different artefact from advice given after the fact.
  popularity: {
    searchDemand: 17,
    evergreen: 14,
    painIntensity: 16,
    gapInCoverage: 17,
    shareability: 17,
  },
  popularityScore: 81,
  tags: ["Career", "AI-Native", "Marketing"],
  readingMinutes: 8,
  cover: "/notebook/ai-product-role-without-cs-degree.webp",
  coverAlt:
    "A closed door with a rolled certificate lying on the floor before it, beside an open window with tools on the sill.",
  facts: [
    { label: "Formal engineering qualification", value: "None" },
    { label: "Education", value: "BA English, MBA Marketing, postgraduate digital marketing" },
    { label: "Products shipped independently", value: "21" },
    { label: "Models", value: "One trained from scratch, one fine-tuned and benchmarked" },
    { label: "Status of this argument", value: "Untested — still looking" },
  ],

  blocks: [
    {
      kind: "p",
      text: "I should say at the top what this is and is not. I have not landed an AI product role. I am applying for them. So this is not advice from the other side of the door — it is the argument I am currently making, written down so it can be examined, and it may not work.",
    },
    {
      kind: "p",
      text: "I am writing it anyway because the discussion around this is unhelpfully split between people insisting a degree does not matter and people insisting it does, and neither camp states the actual objection.",
    },

    { kind: "h2", id: "the-real-objection", text: "The real objection, stated properly" },
    {
      kind: "p",
      text: "Nobody serious believes a computer science degree is required to decide what a product should do. Plenty of excellent product managers have never had one and nobody thinks this is remarkable.",
    },
    {
      kind: "p",
      text: "The concern about someone like me is narrower and it is legitimate:",
    },
    {
      kind: "quote",
      text: "Can you tell when the system is wrong? Or will you ship what it produced because it looked finished?",
    },
    {
      kind: "p",
      text: "That is a real question about a real failure mode. Someone who can generate an application but cannot evaluate it will confidently ship something with an authorisation check that only exists in the interface, or a data model that lets any user read any record. The output looks the same either way from the outside. That is what a hiring manager is actually worried about, and \"I am passionate about AI\" does not touch it.",
    },
    {
      kind: "p",
      text: "So the case has to be made against that question, not against the degree.",
    },

    { kind: "pullquote", text: "That is what a hiring manager is actually worried about, and \"I am passionate about AI\" does not touch it." },

    { kind: "h2", id: "the-evidence", text: "What I would put in front of it" },
    {
      kind: "p",
      text: "Evidence, not enthusiasm. Every item here is checkable, which is the only property that matters:",
    },
    {
      kind: "ul",
      items: [
        "**Twenty-one products shipped independently**, several publicly usable, across quite different problem domains — an encrypted inheritance vault, an autonomous agent fleet, a native Android app, an applied-AI system in a regulated industry.",
        "**A language model trained from scratch** for a narrow task, with a stated parameter count, a stated training set size, and a measured accuracy figure. Not fine-tuned — trained. That is an unusual thing to have done and it is the single artefact I would lead with.",
        "**A second model fine-tuned and benchmarked** against a standard evaluation, so the number means something to somebody who has run one.",
        "**A documented security practice**, including a system that carries dozens of automated security tests written across several independent audit passes.",
        "**A written review discipline** — every change read before it is accepted, no automatic acceptance, and I can talk about specific things that caught.",
      ],
    },
    {
      kind: "p",
      text: "The reason those answer the objection is that none of them are claims about my attitude. They are things that either exist or do not, and they can be examined by anybody who wants to spend twenty minutes on it.",
    },

    { kind: "h2", id: "what-i-cannot-claim", text: "What I would not claim, and why saying so helps" },
    {
      kind: "p",
      text: "I am not an engineer. I could not sit a systems design interview against someone with ten years of production experience and I would not pretend otherwise. There are whole categories of problem — distributed systems failure modes, performance work at scale, the deep end of a language's semantics — where my knowledge is shallow and I know roughly where the edge is.",
    },
    {
      kind: "p",
      text: "I include that because it is the thing that makes the rest credible. A person who claims a two-year self-taught path has made them equivalent to a trained engineer is telling you they cannot calibrate, which is exactly the deficiency the objection was about in the first place.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Knowing the boundary is part of the qualification",
      text: "In a product role the useful property is not knowing everything. It is knowing precisely where your judgement stops being reliable, so you can escalate before it costs something rather than afterwards. That is demonstrable in an interview and it is more reassuring than confidence.",
    },

    { kind: "h2", id: "what-the-role-needs", text: "What an AI product role actually requires" },
    {
      kind: "p",
      text: "Product management is judgement about what should exist, for whom, and in what order. An AI product role adds a second requirement: knowing what these systems can and cannot actually do, which is a moving target and is not taught anywhere yet.",
    },
    {
      kind: "p",
      text: "That second thing is learned by building with them and watching them fail, repeatedly, in circumstances where the failure costs you something. Two years of that is a more current education than a curriculum designed before any of these tools existed. It is not a better education. It is a more recent one, in a field where recency is unusually load-bearing.",
    },
    {
      kind: "p",
      text: "And the first requirement — judgement about what should exist — is the part I have nine years of. Deciding what an audience actually wants, whether a proposition is believable, whether something lands. That was my job for a decade before I wrote a line of anything.",
    },

    { kind: "h2", id: "test-me", text: "How I would want to be tested" },
    {
      kind: "p",
      text: "The strongest thing an applicant in my position can do is name the test, because it demonstrates the thing being tested. So:",
    },
    {
      kind: "ol",
      items: [
        "**Show me your product and ask me what is wrong with it.** Not what I would add — what is confusing, what will be misread, where somebody will get stuck.",
        "**Ask me what happens when the model is wrong.** In my own work, and then in yours. A candidate with no answer has not shipped anything real.",
        "**Ask me what I have refused to automate**, and why. Judgement shows up more clearly in what someone declined than in what they built.",
        "**Ask me to scope something down.** Take a feature and cut it to what actually ships this month. This is most of the job and it is where enthusiasm becomes visible as a liability.",
        "**Ask me to read something I did not write** and say what concerns me about it.",
      ],
    },
    {
      kind: "p",
      text: "I would rather be assessed on those five than on a credential, and if I fail them then the objection was right in my case and the hiring decision is correct.",
    },

    {
      kind: "promote",
      href: "/projects",
      note: "The answer to the question this article says hiring managers are actually asking — every system here is one I built and can be opened.",
    },
    { kind: "h2", id: "honest-close", text: "Where this actually stands" },
    {
      kind: "p",
      text: "This argument has not yet succeeded. I am making it, it is on a public site attached to the work it refers to, and the market will decide whether it is any good. If it does not work, I would rather have made it explicitly than have wondered whether the phrasing on a CV was the problem.",
    },
    {
      kind: "p",
      text: "If you are in a similar position, the transferable part is this: find the actual objection, which is almost never the one being said out loud, and answer that one with things a stranger can verify. Everything else is decoration.",
    },
  ],

  faqs: [
    {
      q: "Can you get an AI product role without a computer science degree?",
      a: "The qualification is rarely the true objection. The concern is whether a candidate can recognise when a system is producing wrong or unsafe output rather than shipping it because it appears finished. That concern is answerable with verifiable artefacts — shipped products, measured results, a documented review practice — and not with claimed enthusiasm.",
    },
    {
      q: "What evidence substitutes for a technical qualification in AI product roles?",
      a: "Things a stranger can check in twenty minutes: publicly usable products, a model with a stated parameter count and a measured accuracy figure, a benchmarked fine-tune, documented security testing, and a described review practice with specific examples of what it caught. Artefacts answer the objection; self-description does not.",
    },
    {
      q: "Should a self-taught builder claim to be equivalent to a trained engineer?",
      a: "No, and claiming it is counterproductive. Stating precisely where your judgement stops being reliable demonstrates calibration, which is the exact capability the hiring concern is about. A candidate who cannot identify the boundary of their own competence is confirming the objection rather than answering it.",
    },
  ],

  seeAlso: ["/resume", "/projects", "/learnings"],
};

export default post;
