import type { Post } from "../types";

const post: Post = {
  slug: "taste-is-the-last-thing-to-be-automated",
  title: "Taste is the last thing to be automated",
  answer:
    "Taste is the ability to choose between options that are all technically correct, and it becomes the scarce skill once generation is cheap. A model optimises whichever metric it is given. Deciding which metric is the right one — and recognising when a measurable win is the wrong trade — is the part that cannot be delegated.",
  description:
    "When producing an option costs almost nothing, choosing between options becomes the work. Four decisions where the measurable answer and the right answer pointed in opposite directions, and what that says about which skills hold their value.",
  published: "2026-08-26",
  category: "Practice",
  // The most shareable thing in the batch and the least tied to any tool or
  // version — the argument survives every model release. Lower search demand
  // because nobody searches for "taste"; it travels by being sent to people.
  popularity: {
    searchDemand: 9,
    evergreen: 19,
    painIntensity: 10,
    gapInCoverage: 15,
    shareability: 19,
  },
  popularityScore: 72,
  tags: ["AI-Native", "Process", "Design"],
  readingMinutes: 6,
  cover: "/notebook/taste-is-the-last-thing-to-be-automated.webp",
  coverAlt:
    "Four near-identical objects on plinths, a machine producing more behind them, and a hand pointing at one.",
  facts: [
    { label: "Cost of producing an option", value: "Near zero, and falling" },
    { label: "Cost of choosing correctly", value: "Unchanged" },
    { label: "What a model optimises", value: "The metric it was given" },
    { label: "Who chooses the metric", value: "Still a person" },
  ],

  blocks: [
    {
      kind: "p",
      text: "Producing a working option now costs almost nothing. I can have four versions of a feature by lunchtime, all of which run, none of which are obviously wrong. That is genuinely new, and it moves the difficulty somewhere else rather than removing it.",
    },
    {
      kind: "p",
      text: "The difficulty is now entirely in choosing. And choosing well, when every option in front of you is defensible, is the thing we usually call taste.",
    },

    { kind: "h2", id: "what-taste-is", text: "Taste is not decoration" },
    {
      kind: "p",
      text: "The word gets used as though it means aesthetic preference — which colour, which typeface, whether a thing looks nice. That is a small part of it and not the interesting part.",
    },
    {
      kind: "p",
      text: "Taste is knowing which of several correct answers is the right one **here**. It shows up most clearly at the moment the measurable answer and the right answer point in different directions, because that is when there is no formula to fall back on.",
    },
    {
      kind: "p",
      text: "I can give four from this site, all of them decisions where the number said one thing and I did the other.",
    },

    { kind: "h2", id: "examples", text: "Four times the metric was wrong" },
    {
      kind: "h3", id: "mascot", text: "The animated mascot that costs performance and stays" },
    {
      kind: "p",
      text: "There is a 3D robot on this site and it is the single most expensive thing on the page. Freezing it after a few seconds of inactivity would have improved the performance score more than every other optimisation combined — it was measured, it was proposed, and the number was not close.",
    },
    {
      kind: "p",
      text: "It was rejected, on the grounds that a mascot which holds still is a different mascot. The same pass rejected dropping it on phones. A portfolio that is charming on a laptop and inert on a phone is the worse product, even though it would score better.",
    },
    {
      kind: "h3", id: "notebook", text: "The blog that should have been dark and is not" },
    {
      kind: "p",
      text: "This site is near-black almost everywhere. The first version of this notebook matched it, reasoned from something sensible: the posts are full of code, and code reads better on a dark background.",
    },
    {
      kind: "p",
      text: "That optimised for the wrong thing. This is the one page on the site somebody sits and reads at length, and a long-form reading surface wants paper. It was rebuilt light, with the code blocks staying dark inside it, which is where the contrast actually earns something. The original reasoning was correct about code and wrong about reading.",
    },
    {
      kind: "h3", id: "popular", text: "The word 'popular', which is not used anywhere" },
    {
      kind: "p",
      text: "The index has a curated rail of articles. It is labelled \"Start here\". It would perform better labelled \"Most popular\", because people click what other people read.",
    },
    {
      kind: "p",
      text: "Nothing on this site counts readers. Calling an editorial choice popularity would be a claim about the world that happens to be false — a small lie, in a place nobody would ever check, which is precisely why it matters. A blog that quietly decorates its own numbers has nothing left to be believed about.",
    },
    {
      kind: "h3", id: "the-404", text: "The line on the 404 that does not always appear" },
    {
      kind: "p",
      text: "The error page needed a line pointing machines at the sitemap. It is one screen and it must not scroll, and measurement showed about two pixels of slack at the smallest common phone size — so adding anything would have clipped the existing copy.",
    },
    {
      kind: "p",
      text: "The easy answer was to reclaim the space from the measured spacing around it. The line is instead shown only where there is genuinely room for it, and stands down on very short viewports, while remaining in the response for anything reading the HTML. Slightly more complicated, and it does not damage a layout that was arrived at by measurement.",
    },

    { kind: "h2", id: "the-pattern", text: "What all four have in common" },
    {
      kind: "p",
      text: "In every case the model could have produced either option. The choice was not limited by what could be built. It was limited by somebody deciding which outcome was actually wanted — and in three of the four, deliberately accepting a worse number.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "The delegation that cannot be made",
      text: "A model optimises the objective you give it, and it is extremely good at that. What it cannot do is tell you that the objective is wrong. Ask it to improve a performance score and it will improve the performance score, including by removing the thing that makes the site worth visiting. The judgement is not in the optimisation. It is in choosing what to optimise, and knowing when to stop.",
    },

    { kind: "h2", id: "who-has-it", text: "Where this skill comes from" },
    {
      kind: "p",
      text: "I came to building from nine years of brand and performance marketing, and I used to think of that as the thing I would have to overcome. It is the opposite. Marketing at any level is the practice of judging whether something lands — whether a line works, whether a claim is believable, whether an audience will feel what you intended. That is the same faculty, exercised on different material.",
    },
    {
      kind: "p",
      text: "What that background does not give you is the ability to build. For a long time that was decisive, because the ability to build was the bottleneck. It is not the bottleneck any more, and the skill that was previously worthless without it is now the one that decides whether the output is any good.",
    },
    {
      kind: "p",
      text: "It also cuts the other way, and I would not want to be smug about it: plenty of people who can build have excellent taste and always did. The point is not that one background beats another. It is that the scarce input has moved.",
    },
    {
      kind: "p",
      text: "Producing something is close to free. Knowing what should exist is not, and no part of that has become cheaper. Everything above was a decision to accept a worse number for a better product, and each one took about ten minutes of thought and could not have been made by anything that did not care how the thing turned out.",
    },
  ],

  faqs: [
    {
      q: "What does taste mean in product and software work?",
      a: "It is the ability to choose correctly between options that are all technically valid. It becomes visible at the point where a measurable improvement and the better product point in different directions — accepting a lower performance score to keep something that makes the product worth using, for example. It is judgement about objectives rather than aesthetic preference.",
    },
    {
      q: "Can AI replace design and product judgement?",
      a: "It can generate every option and optimise any objective it is given, extremely well. What it cannot do is decide that the objective is wrong, because it has no stake in the outcome. Asked to improve a metric it will improve that metric, including by removing whatever made the product valuable in the first place.",
    },
    {
      q: "Can you develop product taste without a technical background?",
      a: "Yes, and disciplines that involve judging whether work lands on an audience — marketing, editorial, design — exercise the same faculty on different material. What that background historically lacked was the ability to build, which used to be the binding constraint. As building becomes cheaper, judgement about what should be built becomes the scarcer input.",
    },
  ],

  seeAlso: ["/philosophy", "/notebook", "/profile"],
};

export default post;
