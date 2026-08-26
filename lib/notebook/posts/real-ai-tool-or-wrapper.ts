import type { Post } from "../types";

const post: Post = {
  slug: "real-ai-tool-or-wrapper",
  title: "How do you tell a real AI tool from a wrapper?",
  answer:
    "The useful test is not whether a product calls somebody else's model, because most do, including good ones. It is what would remain if the model were removed. A product with its own evaluation, defined behaviour when the answer is wrong, real integration and data you can export is a product. One with none of those is an interface charging a markup on an API.",
  description:
    "Most AI products are built on somebody else's model, and that is not the problem. A non-technical test for whether there is a product underneath, the questions to ask a vendor, and when a wrapper is genuinely the right thing to buy.",
  published: "2026-08-26",
  category: "Marketing & AI",
  // Very high demand from buyers who cannot evaluate the claim themselves, and
  // almost all existing coverage is either engineer-to-engineer or vendor
  // marketing. Written for the person holding the budget.
  popularity: {
    searchDemand: 17,
    evergreen: 14,
    painIntensity: 15,
    gapInCoverage: 16,
    shareability: 16,
  },
  popularityScore: 78,
  tags: ["Marketing", "AI-Native", "Process"],
  readingMinutes: 7,
  cover: "/notebook/real-ai-tool-or-wrapper.webp",
  coverAlt:
    "A large ribboned gift box opened to reveal a much smaller plain box amid a great deal of empty packing.",
  facts: [
    { label: "Models trained from scratch", value: "PentaCMD-47M — 47M parameters, 299,000 training pairs" },
    { label: "Measured accuracy", value: "~87% exact match on its narrow task" },
    { label: "Models fine-tuned", value: "Qdex-1.5B — QLoRA over Qwen2.5-Coder-1.5B, benchmarked with HumanEval" },
    { label: "Products built on third-party APIs", value: "Most of twenty-one" },
  ],

  blocks: [
    {
      kind: "p",
      text: "\"It's just a wrapper\" is the fastest way to dismiss an AI product and one of the least useful, because it is usually true and usually beside the point. Almost every AI product you can buy calls somebody else's model over an API. Mine mostly do.",
    },
    {
      kind: "p",
      text: "I have also been on the other side of it: I trained a small language model from scratch for a narrow task, and fine-tuned an open-weight one for another. Having done both, I think the wrapper question is the wrong question, and there is a better one that anybody can ask without reading a line of code.",
    },

    { kind: "h2", id: "the-real-test", text: "The question that actually separates them" },
    {
      kind: "quote",
      text: "If you removed the model, what would be left?",
    },
    {
      kind: "p",
      text: "That is the whole test. Not \"do they use somebody else's model\" — of course they do — but **what did they build around it**. If the answer is a text box, a system prompt and a subscription, you are paying a markup on an API you could call yourself. If the answer is a body of work that would still be valuable with a different model plugged into it, that is a product.",
    },
    {
      kind: "p",
      text: "Most of the value in serious AI products is not in the model at all. It is in the boring surrounding work: getting your data in, deciding who is allowed to see what, handling the cases where the answer is wrong, keeping a record of what was done, and fitting into the way your organisation actually operates.",
    },

    { kind: "h2", id: "the-tells", text: "Five tells you can check without being technical" },
    {
      kind: "h3", id: "tell-1", text: "1. Ask what happens when it is wrong" },
    {
      kind: "p",
      text: "This is the single most revealing question, and the answers separate cleanly. A serious team has thought about it: the output goes to a human first, or a confidence threshold routes it, or there is a check that catches the common failure. A thin product shows you the wrong answer with the same confidence as a right one and leaves you to notice.",
    },
    {
      kind: "h3", id: "tell-2", text: "2. Ask for the number, not the model name" },
    {
      kind: "p",
      text: "\"We use the latest frontier model\" is a fact about their supplier, not a claim about their quality. The question is how often the product is right, measured against what. Anybody who has genuinely done the work has a number and a description of how they got it — and will usually be quite keen to tell you, because it was expensive to produce.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Why measurement is the strongest signal",
      text: "Evaluation is difficult, unglamorous and invisible to the customer, so it is the first thing skipped by anyone shipping quickly. A team that can tell you their accuracy on a defined task has almost certainly done the rest of the boring work too. It is the closest thing to a proxy for seriousness that a non-technical buyer has.",
    },
    {
      kind: "h3", id: "tell-3", text: "3. Look for state" },
    {
      kind: "p",
      text: "Does it remember anything? Does it connect to your systems, hold a record, learn your conventions, or does every session start from zero? A product that retains nothing between uses is a conversation with extra steps. This is easy to check in a trial and very hard to fake.",
    },
    {
      kind: "h3", id: "tell-4", text: "4. Look at the shape of the pricing" },
    {
      kind: "p",
      text: "Pricing tends to reveal the cost structure underneath it. When a price tracks message volume closely, the dominant cost is usually somebody else's tokens. When it is priced per seat or per outcome, there is more often real infrastructure being paid for. Not conclusive on its own, but it points.",
    },
    {
      kind: "h3", id: "tell-5", text: "5. Ask what happens when the model changes" },
    {
      kind: "p",
      text: "Model versions get deprecated, repriced and retired constantly. Ask what that means for you. A team with an answer — an evaluation suite they re-run, an abstraction that lets them swap, a fallback — has built something. A team that has not considered it is telling you their product is the current behaviour of one vendor's endpoint.",
    },

    { kind: "h2", id: "when-wrapper-is-fine", text: "When the wrapper is the right thing to buy" },
    {
      kind: "p",
      text: "I want to be fair about this, because the dismissal is used lazily and it costs people good tools.",
    },
    {
      kind: "p",
      text: "Sometimes the wrapping **is** the product. If a tool takes something you do fifteen times a week and turns it into one click, in the place you already work, with the right defaults for your industry — that is real value, and the fact that a general model does the reasoning underneath does not diminish it. Distribution, interface and workflow are genuine products. Plenty of software people happily pay for is a thin layer over something free.",
    },
    {
      kind: "p",
      text: "The failure mode is not being a wrapper. It is being a wrapper **priced as though it were infrastructure**, sold with claims that belong to the model rather than to the product.",
    },

    { kind: "h2", id: "the-other-side", text: "What it looks like when someone has gone further" },
    {
      kind: "p",
      text: "Occasionally you will meet a product that trained or tuned its own model for its specific task, and it is worth knowing what that signals, because it is rarer than the marketing suggests.",
    },
    {
      kind: "p",
      text: "I built a 47-million-parameter model from scratch to turn plain English into terminal commands — trained on 299,000 pairs, and it lands around 87% exact match on that one narrow job. It is thousands of times smaller than a frontier model and it beats one at that specific task, because the task is narrow and the model was built for it. That is what purpose-built looks like, and it is a genuinely different proposition from a prompt.",
    },
    {
      kind: "p",
      text: "It is also expensive in effort, which is why almost nobody does it and why claiming it is a strong signal when true. If a vendor says they trained their own model, ask what on, how big, and how they measured it. The answers arrive quickly from anyone who did, and vaguely from anyone who did not.",
    },

    { kind: "h2", id: "the-script", text: "Four questions to take into the meeting" },
    {
      kind: "ol",
      items: [
        "What does your product do when the model gets it wrong?",
        "How often is it right, and how did you measure that?",
        "If your model provider deprecated the version you use tomorrow, what changes for me?",
        "Which part of this is yours?",
      ],
    },
    {
      kind: "p",
      text: "You do not need to evaluate the technical accuracy of the answers. Ask all four and watch which ones produce a specific, slightly weary reply — the tone of someone describing work they actually did — and which produce a pivot back to the model name. That difference is legible to anyone, and it is most of what you need.",
    },
  ],

  faqs: [
    {
      q: "What does it mean when people call an AI product a wrapper?",
      a: "It means the product calls a third-party model over an API rather than running its own. This is true of most AI products, including good ones, so the label alone says little. The meaningful distinction is how much the product does around the model — evaluation, integration, handling of wrong answers, and data it holds on the customer's behalf.",
    },
    {
      q: "Is a wrapper product always bad value?",
      a: "No. When the wrapping is the value — an established workflow, useful defaults for a specific industry, or delivery inside a tool the customer already uses — that is a genuine product regardless of who supplies the model. The problem case is a thin interface priced as infrastructure and sold on claims that belong to the underlying model.",
    },
    {
      q: "What should a non-technical buyer ask an AI vendor?",
      a: "Four questions cover most of it: what the product does when the model is wrong, how often it is right and how that was measured, what happens if the model provider deprecates the version in use, and which parts of the system the vendor actually built. Specific answers indicate real work; redirection to the model's name does not.",
    },
  ],

  seeAlso: ["/slms/pentacmd", "/llms/qdex-1.5b", "/projects"],
};

export default post;
