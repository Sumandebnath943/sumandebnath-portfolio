import type { Post } from "../types";

const post: Post = {
  slug: "what-marketing-teams-should-automate-first",
  title: "What should a marketing team automate first?",
  answer:
    "Start with the highest-frequency, lowest-judgement work — reporting, data gathering, asset variants and routine checks — because that is where hours accumulate without any decision being made. The selection rule that matters most is error visibility: automate where a mistake is obvious and cheap, and never where it would be silent and expensive.",
  description:
    "Sort by frequency and judgement, not by what is impressive. The order to work in, the rule for hard cases, and the trap of automating a broken process.",
  metaTitle: "What should a marketing team automate first?",
  keywords: ["what to automate in marketing", "marketing automation priorities", "AI marketing workflow", "marketing tasks to automate"],
  published: "2026-08-26",
  category: "Marketing & AI",
  // Directly actionable for the audience, and the existing coverage is mostly
  // vendor content recommending whatever the vendor sells. The error-visibility
  // rule is the part I have not seen written down.
  popularity: {
    searchDemand: 16,
    evergreen: 14,
    painIntensity: 13,
    gapInCoverage: 16,
    shareability: 15,
  },
  popularityScore: 74,
  tags: ["Marketing", "Process", "AI-Native"],
  readingMinutes: 7,
  cover: "/notebook/what-marketing-teams-should-automate-first.webp",
  coverAlt:
    "A queue of identical documents feeding into a machine, with one marked document pulled out and set aside.",
  facts: [
    { label: "Sort by", value: "Frequency × judgement required" },
    { label: "First candidates", value: "Reporting, data gathering, asset variants, routine checks" },
    { label: "The deciding rule", value: "Automate where errors are visible and cheap" },
    { label: "Never automate", value: "Work where a mistake would be silent and expensive" },
  ],

  blocks: [
    {
      kind: "p",
      text: "Most teams pick wrong here, and they pick wrong in a consistent direction: they automate the interesting thing rather than the frequent one. The interesting thing is usually creative, usually visible, and usually done twice a month. The frequent thing is dull, invisible, and eats a day a week.",
    },
    {
      kind: "p",
      text: "Sort your work by two numbers — how often it happens, and how much judgement it requires — and start where frequency is high and judgement is low. Everything else in this article is detail on that one instruction.",
    },

    { kind: "pullquote", text: "The frequent thing is dull, invisible, and eats a day a week." },

    { kind: "h2", id: "the-order", text: "The order I would actually follow" },
    {
      kind: "h3", id: "reporting", text: "1. Reporting" },
    {
      kind: "p",
      text: "Pulling the same numbers from the same places into the same format every week, for people who mostly read the first three lines. It is the highest-frequency, lowest-judgement work in most marketing teams and it consumes a genuinely absurd share of the week.",
    },
    {
      kind: "p",
      text: "Automate the gathering and the assembly. Keep the interpretation, which is the part anyone actually wants and the part that is not derivable from the numbers.",
    },
    {
      kind: "h3", id: "gathering", text: "2. Data gathering and monitoring" },
    {
      kind: "p",
      text: "Competitor tracking, keyword research, review monitoring, pulling audience data, watching what changed. This is collection work — comprehensive, tedious, and unrewarding to do by hand, which means in practice it gets done badly or sporadically. A system does it consistently, which is often a quality improvement rather than only a time saving.",
    },
    {
      kind: "h3", id: "variants", text: "3. Asset variants and formatting" },
    {
      kind: "p",
      text: "One approved asset becoming eleven placements. Resizing, reformatting, reflowing copy to fit. Skilled, repetitive, and a very poor use of a designer who could be doing the part that required them.",
    },
    {
      kind: "h3", id: "drafts", text: "4. First drafts, never final ones" },
    {
      kind: "p",
      text: "Outlines, briefs, subject-line variants, the first version of a description. The value here is specifically the elimination of the blank page, which is a real cost. The moment it becomes \"and then we published it\", the automation has crossed from useful to damaging.",
    },
    {
      kind: "h3", id: "checks", text: "5. The routine checks nobody enjoys" },
    {
      kind: "p",
      text: "Tracking parameters, broken links, whether the tag actually fired, whether the page still ranks, whether the form still submits. This is my favourite category to automate because humans are genuinely bad at it — it is attention work, it is boring, and boredom is exactly when people stop checking properly.",
    },

    { kind: "h2", id: "the-rule", text: "The rule that decides the hard cases" },
    {
      kind: "p",
      text: "Frequency and judgement get you most of the way. For anything ambiguous, the question I actually use is about **what a failure looks like**.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Automate where errors are loud. Never where they are quiet.",
      text: "A broken report is obvious — the numbers are missing, somebody complains that morning. A subtly wrong report is not, and it will inform decisions for months before anyone notices. The dangerous automations are not the ones that break. They are the ones that keep producing plausible output after they have stopped being correct, because nothing will tell you.",
    },
    {
      kind: "p",
      text: "I learned this in software rather than in marketing, and it transferred completely. The worst failures I have had to debug were not crashes. They were functions that returned a value indicating failure and were never checked — everything looked healthy, and had been broken for weeks. Marketing automation fails the same way, and marketing has fewer alarms.",
    },
    {
      kind: "p",
      text: "So: if you automate something whose output you cannot easily verify, build the verification at the same time. If you cannot build the verification, do not automate it yet.",
    },

    { kind: "h2", id: "leave-alone", text: "What I would leave alone" },
    {
      kind: "ul",
      items: [
        "**Final approval on anything customer-facing.** The draft can be automated. The decision to publish cannot, because somebody has to be accountable and no system can hold that.",
        "**Brand voice sign-off.** A model will produce something close to your voice, and close is exactly the problem — it is close in a way that erodes slowly and is very hard to notice from the inside.",
        "**Deciding priorities.** What to work on this quarter is not a data problem, and a system optimising the goal you gave it cannot tell you the goal is wrong.",
        "**Anything relational.** Negotiations, difficult stakeholders, keeping an agency honest. Not because it is impossible, but because being handled by a machine is itself the message received.",
        "**Crisis response.** Everything unprecedented is by definition outside the training data, and it is the moment being wrong is most expensive.",
      ],
    },

    { kind: "h2", id: "the-trap", text: "The trap: automating a process that was already wrong" },
    {
      kind: "p",
      text: "The most common failure I see is not a technical one. It is a team that automates their existing weekly report — and the existing weekly report was never useful. They have now made an unread document arrive faster and more reliably, and they have made it considerably harder to kill, because somebody built the automation and is invested in it.",
    },
    {
      kind: "p",
      text: "Before automating anything, ask what would happen if it simply stopped. Quite a lot of recurring marketing work fails that test, and the correct automation for those is deletion.",
    },
    {
      kind: "ol",
      items: [
        "List everything the team does on a repeating schedule.",
        "For each, ask what would break if it stopped. Delete anything where the answer is nothing.",
        "Sort the survivors by frequency, then by how little judgement they require.",
        "Take the top one. Build the check alongside it, not afterwards.",
        "Only then take the next one.",
      ],
    },
    {
      kind: "p",
      text: "The point of all this is not headcount and it is not speed. It is that most marketing teams have very little time to think, and the time is being consumed by work that requires no thought at all. Getting that back is the whole return.",
    },
  ],

  faqs: [
    {
      q: "How do you decide which marketing tasks to automate?",
      a: "Sort work by how often it occurs and how much judgement it requires, then start where frequency is high and judgement is low — typically reporting, data gathering, asset variants and routine checks. For ambiguous cases, ask what a failure would look like: automate where an error would be obvious, not where it would pass unnoticed.",
    },
    {
      q: "What should a marketing team never automate?",
      a: "Final approval on customer-facing work, brand voice sign-off, prioritisation, anything relational such as negotiation or stakeholder management, and crisis response. These share a property: the correct answer is not determined by the available inputs, and someone must be accountable for the decision in a way a system cannot be.",
    },
    {
      q: "Why is automating an existing marketing process risky?",
      a: "Because automation preserves the process, including its flaws. Automating a report nobody reads produces an unread report faster and makes it harder to discontinue, since someone has now invested in building it. The useful first step is asking what would break if each recurring task simply stopped, and deleting whatever survives that question.",
    },
  ],

  seeAlso: ["/projects", "/notebook", "/philosophy"],
};

export default post;
