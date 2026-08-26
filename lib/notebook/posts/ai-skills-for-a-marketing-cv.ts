import type { Post } from "../types";

const post: Post = {
  slug: "ai-skills-for-a-marketing-cv",
  title:
    "The AI skills worth putting on a marketing CV — and the ones to delete",
  answer:
    "Named tools are not skills, because everyone has access to the same tools and the claim cannot be checked. What survives scrutiny is anything with an artefact or a measured outcome attached: a process automated with the time saved stated, a system built and linked, or a described method for judging whether an output is correct.",
  description:
    "Naming tools signals nothing — the reader has the same subscriptions. The four claims that survive a follow-up question, and the five lines to take off.",
  metaTitle: "AI skills for a marketing CV: what to list in 2026",
  keywords: ["AI skills marketing CV", "AI skills for marketers", "marketing resume AI", "prompt engineering on a CV"],
  published: "2026-08-26",
  category: "Career",
  // Directly actionable, large audience, and currently answered almost entirely
  // with lists of tools to name — which is the advice this post argues against.
  popularity: {
    searchDemand: 17,
    evergreen: 11,
    painIntensity: 13,
    gapInCoverage: 15,
    shareability: 16,
  },
  popularityScore: 72,
  tags: ["Career", "Marketing", "AI-Native"],
  readingMinutes: 7,
  cover: "/notebook/ai-skills-for-a-marketing-cv.webp",
  coverAlt:
    "A CV page with a column of small identical tool icons struck through, and one line near the bottom circled.",
  facts: [
    { label: "Value of naming a tool", value: "Near zero — the reader has the same access" },
    { label: "What survives a reference check", value: "Artefacts and measured outcomes" },
    { label: "Best format for an AI claim", value: "A link" },
    { label: "What is actually being screened for", value: "Judgement about output, not familiarity with software" },
  ],

  blocks: [
    {
      kind: "p",
      text: "A marketing CV that lists \"ChatGPT, Claude, Midjourney, Perplexity\" under skills is telling a hiring manager that the candidate has the same subscriptions they do. It reads the way \"proficient in Microsoft Word\" read in 2010, and it is starting to carry the same faint signal of someone who has run out of things to say.",
    },
    {
      kind: "p",
      text: "The problem is not that using these tools is unimpressive. It is that the claim is uncheckable and universal, which are the two properties that make any CV line worthless.",
    },

    { kind: "pullquote", text: "It is that the claim is uncheckable and universal, which are the two properties that make any CV line worthless." },

    { kind: "h2", id: "what-is-screened", text: "What is actually being screened for" },
    {
      kind: "p",
      text: "The person reading your CV is not trying to establish whether you can open an AI tool. They are trying to establish one thing:",
    },
    {
      kind: "quote",
      text: "Can this person tell the difference between a good output and a plausible one?",
    },
    {
      kind: "p",
      text: "Because the failure mode they have seen is not somebody who cannot use the tools. It is somebody who uses them enthusiastically and ships the results without judging them — the campaign copy that is fluent and slightly wrong, the report summarised confidently from numbers that were stale, the customer email that is polite and misses the point.",
    },
    {
      kind: "p",
      text: "Every line about AI on your CV should be aimed at that question.",
    },

    { kind: "h2", id: "what-works", text: "The four claims that survive being checked" },
    {
      kind: "h3", id: "built", text: "1. Something you built, with a link" },
    {
      kind: "p",
      text: "The strongest by a distance. A tool, an automation, a workflow, a dashboard, a small internal system. It does not need to be impressive software — it needs to exist and be attributable to you.",
    },
    {
      kind: "p",
      text: "For an AI claim specifically, **a link beats a bullet point**. Anything else is a description of a thing; a link is the thing. If it cannot be public, describe what it does and what it replaced, precisely enough that the description could be falsified.",
    },
    {
      kind: "h3", id: "automated", text: "2. A process you automated, with the number" },
    {
      kind: "p",
      text: "\"Automated weekly performance reporting across four ad platforms, reducing a six-hour manual task to twenty minutes\" is a real claim. It names the work, the scope and the effect, and it invites a follow-up question you can answer in detail.",
    },
    {
      kind: "p",
      text: "\"Used AI to improve reporting efficiency\" is the same sentence with everything checkable removed.",
    },
    {
      kind: "h3", id: "judgement", text: "3. A method for judging output" },
    {
      kind: "p",
      text: "This is the rarest one and the one that most directly answers the screening question. How do you know the output is right? If you have an actual process — a check you run, a sample you review, a rule for what never ships without a human — that is worth a line, because almost nobody has one and it is precisely what the reader is worried about.",
    },
    {
      kind: "h3", id: "refused", text: "4. Something you deliberately did not automate" },
    {
      kind: "p",
      text: "Counterintuitive on a CV and disproportionately effective in an interview. Naming a task you chose to keep manual, and giving the reason, demonstrates that your enthusiasm is governed. It is the fastest available signal that somebody is thinking rather than adopting.",
    },

    { kind: "h2", id: "what-to-cut", text: "What to take off" },
    {
      kind: "table",
      head: ["Instead of", "Write"],
      rows: [
        ["\"Proficient in ChatGPT, Claude, Gemini\"", "Nothing. Delete the line and use the space"],
        ["\"AI-powered marketer\"", "The specific thing you built or automated"],
        ["\"Prompt engineering\"", "A problem you solved with it and the outcome"],
        ["\"Familiar with AI tools\"", "Delete"],
        ["\"Leveraged AI to drive efficiencies\"", "The hours, the task, the before and after"],
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Prompt engineering as a standalone skill is depreciating fast",
      text: "It was a real differentiator for about eighteen months and it is being absorbed into the tools — models increasingly ask clarifying questions and recover from vague instructions. Naming it as a headline skill in 2026 dates you slightly. The underlying capability, which is decomposing a fuzzy objective into a precise specification, is genuinely valuable, but describe it by what it produced rather than by its title.",
    },

    { kind: "h2", id: "the-portfolio", text: "The strongest version is not on the CV at all" },
    {
      kind: "p",
      text: "For AI claims specifically, the CV is a poor container. It has no room for evidence and everything on it is self-reported.",
    },
    {
      kind: "p",
      text: "One line pointing at somewhere the work actually lives does more than a whole skills section. That can be a personal site, a public repository, a write-up of how you automated something, or a short document describing a system you built for a previous employer with the confidential parts removed. The format matters far less than the fact that it is inspectable.",
    },
    {
      kind: "p",
      text: "This is also a defensive position. As claiming AI competence becomes universal, the value moves entirely to the people who can demonstrate it, and the gap between a candidate who lists tools and one who can show a working thing widens every quarter.",
    },

    {
      kind: "promote",
      href: "/resume",
      note: "My own CV, written against the rule in this article: every AI line on it names a thing that exists and can be checked.",
    },
    { kind: "h2", id: "the-test", text: "The test to run on your own CV" },
    {
      kind: "p",
      text: "Take every line mentioning AI and ask whether a sceptical reader could check it. If they could not, it is decoration and it is competing for space with something that would have worked.",
    },
    {
      kind: "ol",
      items: [
        "Would a follow-up question expose that there is nothing behind this?",
        "Could I be specific for two minutes about how, not just what?",
        "Does this claim distinguish me from someone who has only ever used a chat window?",
        "Is there a link that would say it better?",
      ],
    },
    {
      kind: "p",
      text: "Anything failing all four should come off. In my experience most skills sections lose about half their lines to this and read considerably stronger afterwards.",
    },
  ],

  faqs: [
    {
      q: "Should you list AI tools on a marketing CV?",
      a: "Naming tools adds little, because the reader almost certainly has the same access and the claim cannot be verified. The space is better spent on what was produced with them: a system built and linked, a process automated with the effect quantified, or a described method for checking whether output is correct.",
    },
    {
      q: "Is prompt engineering still worth listing as a skill in 2026?",
      a: "As a headline skill it is depreciating, because the capability is being absorbed into the tools as models improve at asking clarifying questions. The underlying ability — turning a vague objective into a precise specification — remains valuable, but it is better evidenced by describing what it produced than by naming the discipline.",
    },
    {
      q: "What do employers actually look for in AI skills for marketing roles?",
      a: "Evidence of judgement about output rather than familiarity with software. The failure they have encountered is not an inability to use the tools but a willingness to ship plausible-looking results unchecked, so claims demonstrating an actual verification practice — or a deliberate decision not to automate something — carry unusual weight.",
    },
  ],

  seeAlso: ["/resume", "/projects", "/contact"],
};

export default post;
