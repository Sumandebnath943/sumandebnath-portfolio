import type { Post } from "../types";

const post: Post = {
  slug: "shipping-a-product-in-a-weekend",
  title:
    "A weekend gets you a working version, not a product",
  answer:
    "A weekend produces a working version, not a finished product — those are separated by weeks of unglamorous work. What makes the weekend possible is severe scope discipline and research before the first prompt. What makes it defensible is refusing to cut the handful of things that are cheap now and expensive later.",
  description:
    "What gets decided on Friday, what gets cut without argument, the five things that never get cut, and an honest ledger of what is still missing on Monday.",
  metaTitle: "Build a product in a weekend: what you actually get",
  keywords: ["build a product in a weekend", "weekend project MVP", "ship fast solo", "weekend build with AI"],
  published: "2026-08-26",
  category: "Method",
  // High demand and the existing genre is almost entirely dishonest about what
  // "shipped" means. The value here is the ledger at the end.
  popularity: {
    searchDemand: 16,
    evergreen: 14,
    painIntensity: 12,
    gapInCoverage: 15,
    shareability: 17,
  },
  popularityScore: 74,
  tags: ["Process", "AI-Native", "Prompting"],
  readingMinutes: 7,
  cover: "/notebook/shipping-a-product-in-a-weekend.webp",
  coverAlt:
    "A wall calendar with two adjacent days circled and a faint dotted line continuing far past the page edge.",
  facts: [
    { label: "What a weekend produces", value: "A working version" },
    { label: "What it does not produce", value: "A finished product" },
    { label: "The binding constraint", value: "Scope, not build speed" },
    { label: "Never cut, even in a weekend", value: "Secrets handling, correct status codes, error states, reading the diffs" },
  ],

  blocks: [
    {
      kind: "p",
      text: "Yes, you can build a working application in a weekend. I have done it repeatedly and it is not a trick.",
    },
    {
      kind: "p",
      text: "But I have also written about the period where I created eight repositories in eleven days and abandoned six of them, so I am obliged to put the qualifier before the method rather than after it: **a weekend gets you a working version. It does not get you a finished product.** Those are separated by several weeks of work that nobody writes articles about, and confusing the two is the most common mistake in this entire genre.",
    },
    {
      kind: "p",
      text: "With that said, the working version is genuinely valuable, and getting to it reliably is a skill.",
    },

    { kind: "h2", id: "friday", text: "Friday: decide the one thing" },
    {
      kind: "p",
      text: "The constraint is never build speed. It is scope, and scope is decided before anything is built or it is not decided at all.",
    },
    {
      kind: "p",
      text: "Write down, in one sentence, the single thing the product does. Not the category it is in — the specific action a person takes and the specific result. If the sentence contains \"and\", you have two weekends of work and will finish neither.",
    },
    {
      kind: "p",
      text: "Then write the second list, which matters more: everything it will not do. Explicitly, in writing, so that at eleven o'clock on Saturday night when a feature seems obviously necessary, you have a note from a calmer person telling you it is not.",
    },

    { kind: "h2", id: "the-research", text: "Then research, even now" },
    {
      kind: "p",
      text: "It feels absurd to spend an hour reading when you have two days. Spend the hour.",
    },
    {
      kind: "p",
      text: "Whatever the unfamiliar part is — an API you have not used, a platform capability you are guessing at, a permission model you have assumed — read the actual documentation for it before you prompt. The failure this prevents is not a bug. It is building the whole thing on an assumption that turns out to be wrong on Sunday afternoon, at which point the weekend is gone and there is nothing to show.",
    },
    {
      kind: "p",
      text: "In a normal project research runs to something like a tenth or a fifth of the time. Compressing it to a single hour is the compromise a weekend demands; removing it is not.",
    },

    { kind: "h2", id: "saturday", text: "Saturday: build, then review, then repeat" },
    {
      kind: "p",
      text: "One long, specific opening prompt rather than a conversation that gradually reveals what you want. Context, the goal as an outcome, an example of the shape you expect, and the constraints — particularly what it must not do.",
    },
    {
      kind: "p",
      text: "Then the loop, which is the same one I use on everything and does not get suspended because the clock is running:",
    },
    {
      kind: "ol",
      items: [
        "Let it complete a pass.",
        "Ask what it had to assume before accepting anything.",
        "Read the changes. Every one. No auto-accept.",
        "Run it yourself and find the next thing.",
      ],
    },
    {
      kind: "p",
      text: "People assume the review step is what makes a weekend build impossible. It is what makes it possible. The alternative is discovering on Sunday that Saturday afternoon's work was built on a misunderstanding, and there is no time left to unpick it.",
    },

    { kind: "h2", id: "cut", text: "What gets cut without discussion" },
    {
      kind: "ul",
      items: [
        "**Accounts and sign-in**, unless the product is meaningless without them. This alone is often the difference between one weekend and three.",
        "**Settings.** Pick sensible defaults. Every option is a branch you now have to test.",
        "**Any admin interface.** You are the admin. Use the database.",
        "**The second platform.** One. Whichever one you will actually use.",
        "**Edge cases you have not encountered.** Handle the ones you hit. The imagined ones are usually imaginary.",
        "**Visual polish beyond coherent.** It needs to not look broken. It does not need to be beautiful this weekend.",
      ],
    },

    { kind: "h2", id: "never-cut", text: "What never gets cut, however short the time" },
    {
      kind: "p",
      text: "This is the short list, and every item is on it for the same reason: it costs minutes now and days later.",
    },
    {
      kind: "table",
      head: ["Do not skip", "Cost now", "Cost if skipped"],
      rows: [
        ["Secrets in environment variables", "Ten minutes", "A rotated key at best, a public credential at worst"],
        ["Correct status codes", "Minutes", "Every consumer believes every URL exists"],
        ["A visible error state", "Half an hour", "Users see a blank screen and assume it is broken"],
        ["Reading the diffs", "Continuous", "A codebase you cannot reason about by Monday"],
        ["Not exposing the database", "Configuration only", "The failure that makes the news"],
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The weekend excuse does not survive contact with a user",
      text: "Nobody who encounters your product knows or cares that it was built in two days. If it leaks something, it leaked it; if it silently fails, it failed. \"It was a weekend project\" is an explanation you give afterwards, and it does not undo anything. Everything on the list above takes minutes when you have decided in advance that it is not optional.",
    },

    { kind: "h2", id: "sunday", text: "Sunday: use it as a stranger" },
    {
      kind: "p",
      text: "The last few hours are not for building. Open the thing as though you had never seen it, on a device that is not your development machine, and try to accomplish the one sentence you wrote on Friday.",
    },
    {
      kind: "p",
      text: "Write down everything wrong without fixing any of it, because fixing pulls you back into building and the list is more valuable than any individual fix. Then fix the ones that make it unusable, and only those.",
    },

    { kind: "h2", id: "monday", text: "Monday's honest ledger" },
    {
      kind: "p",
      text: "What you have: a working version of one thing, which you have used yourself, which does not leak anything obvious and does not lie about its own errors. That is a real artefact and it is far more than most ideas ever become.",
    },
    {
      kind: "p",
      text: "What you do not have, and should say out loud so you do not fool yourself:",
    },
    {
      kind: "ul",
      items: [
        "It has been used by one person, who built it and therefore cannot see it clearly.",
        "It has been tested on the states you thought of.",
        "Its security model has been considered, not examined.",
        "It has no meaningful failure handling beyond the obvious paths.",
        "It works on the connection speed and device you happen to own.",
      ],
    },
    {
      kind: "p",
      text: "Closing that list is the difference between a weekend project and a product, and it takes considerably longer than a weekend. Doing that work on one thing is worth more than another six weekends producing another six working versions — which is a lesson I did not learn quickly and paid for in abandoned repositories.",
    },
  ],

  faqs: [
    {
      q: "Can you really build a product in a weekend with AI assistance?",
      a: "You can reliably build a working version of one narrowly scoped thing. That is not the same as a finished product, which additionally requires testing beyond the states you imagined, examination of the security model, real failure handling, and use by somebody other than the author. Those take weeks, not hours.",
    },
    {
      q: "What should you cut when building something in a weekend?",
      a: "Accounts and sign-in unless essential, configurable settings, any admin interface, support for more than one platform, unencountered edge cases, and visual polish beyond looking coherent. The binding constraint on a weekend build is scope rather than build speed, so cutting has to happen before anything is built.",
    },
    {
      q: "What should you never skip even on a fast build?",
      a: "Keeping secrets in environment variables, returning correct HTTP status codes, showing a real error state rather than a blank screen, reading every change before accepting it, and not leaving data stores publicly accessible. Each costs minutes during the build and days or worse afterwards.",
    },
  ],

  seeAlso: ["/notebook", "/projects", "/philosophy"],
};

export default post;
