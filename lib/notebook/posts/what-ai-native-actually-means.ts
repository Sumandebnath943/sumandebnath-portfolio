import type { Post } from "../types";

const post: Post = {
  slug: "what-ai-native-actually-means",
  title: "What does \"AI-native\" actually mean, and how would you check?",
  answer:
    "AI-native describes someone whose default working method is building with these systems, rather than someone who added them to an existing method. The claim is checkable: ask what they shipped, what they did when the model was wrong, what they refused to automate, and how they verify output. Tool familiarity answers none of those.",
  description:
    "The term is being claimed faster than it is being earned. What it should mean, five questions that separate a real claim from a stated one, and the answers that indicate somebody has actually done it.",
  published: "2026-08-26",
  category: "Career",
  // The term is entering job descriptions rapidly and nobody has defined it, so
  // both candidates and hiring managers are using it to mean different things.
  popularity: {
    searchDemand: 14,
    evergreen: 12,
    painIntensity: 14,
    gapInCoverage: 18,
    shareability: 17,
  },
  popularityScore: 75,
  tags: ["Career", "AI-Native", "Process"],
  readingMinutes: 7,
  facts: [
    { label: "What it should mean", value: "Building with these systems is the default method, not an addition" },
    { label: "What it is often used to mean", value: "Familiarity with several tools" },
    { label: "Fastest disqualifying answer", value: "A list of tools" },
    { label: "Strongest single signal", value: "A specific failure, described precisely" },
  ],

  blocks: [
    {
      kind: "p",
      text: "\"AI-native\" is in the middle of the phase where a term is being claimed considerably faster than it is being earned. It is in job descriptions, in CVs, and in a fair number of bios including, in one form or another, my own — so I have some obligation to say what I think it means and how I would want it checked, including on me.",
    },

    { kind: "h2", id: "the-definition", text: "The distinction that makes it a real term" },
    {
      kind: "p",
      text: "The useful line is between **adding** these systems to an existing method and **starting** from them.",
    },
    {
      kind: "p",
      text: "A designer who has always designed and now generates first drafts faster is using AI. Excellent, sensible, and not what the word describes. Someone AI-native has a working method that does not make sense without these systems — the way work is scoped, the order things happen in, what gets prototyped versus discussed, what is worth attempting at all.",
    },
    {
      kind: "p",
      text: "For me it means that a question I would previously have researched for a week and then written a document about, I now build a working version of in an evening and look at. That is not the same job done faster. It is a different sequence, and it produces different decisions.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Neither one is superior",
      text: "A great deal of excellent work is done by people who use AI as an accelerant on a craft they already had, and in many roles that is exactly right. The distinction is descriptive rather than a ranking. It only matters because the term is going into hiring criteria, and a term in hiring criteria that means two different things to the two parties will waste everybody's time.",
    },

    { kind: "h2", id: "the-questions", text: "Five questions that separate the claim from the label" },
    {
      kind: "h3", id: "q1", text: "1. What have you shipped, and can I look at it?" },
    {
      kind: "p",
      text: "Not what you have used. What exists because of you that did not exist before. It does not have to be large — a working internal tool with three users is a stronger answer than a description of an ambitious project that stayed a description.",
    },
    {
      kind: "h3", id: "q2", text: "2. What did you do when the model was wrong?" },
    {
      kind: "p",
      text: "This is the highest-yield question and I would ask it first if I only had one. Anybody who has genuinely built something has a story here, and it is usually specific and slightly annoyed — the confident wrong answer that cost a day, the thing that worked in testing and not in front of a user, the subtly incorrect implementation that was built on for a week.",
    },
    {
      kind: "p",
      text: "Somebody who has only used a chat window has no such story, because a wrong answer in a chat window costs nothing. You just ask again.",
    },
    {
      kind: "h3", id: "q3", text: "3. What have you refused to automate?" },
    {
      kind: "p",
      text: "An answer here demonstrates that the enthusiasm is governed, which is the property everyone is quietly worried about. \"Nothing, I automate everything I can\" is a genuinely bad answer and it is given frequently, in the belief that it sounds committed.",
    },
    {
      kind: "h3", id: "q4", text: "4. How do you know the output is right?" },
    {
      kind: "p",
      text: "Look for a **process** rather than a sentiment. \"I check it carefully\" is a sentiment. \"I read every change before accepting it, I test on a second device, and I have a list of things that never ship without a person looking\" is a process. Most people do not have one, which is precisely why having one is worth so much.",
    },
    {
      kind: "h3", id: "q5", text: "5. What is in your codebase that you did not write, and how do you know it is safe?" },
    {
      kind: "p",
      text: "The uncomfortable one, and the fastest way to find out whether somebody has thought about the risk they are carrying. The honest answer usually starts with \"most of it\", and what follows is the actual information.",
    },

    { kind: "h2", id: "the-tells", text: "What a thin claim sounds like" },
    {
      kind: "ul",
      items: [
        "**A list of tools** as the answer to every question. Tools are the least differentiating thing about anyone right now.",
        "**No artefacts.** Two years of AI-native practice and nothing anyone can look at is a contradiction.",
        "**No failures.** Anybody who has built something real has been badly wrong at least once and can describe it in detail. Everything having gone smoothly is not a good sign; it means nothing was attempted at a scale where it could break.",
        "**Volume as the headline.** \"I ship an app a week\" invites the question of how many of them anyone uses, and I say that as somebody who has made exactly this mistake and written about it.",
        "**Total confidence about the tools' capabilities.** Real familiarity comes with a specific and slightly irritated sense of what they are bad at.",
      ],
    },

    { kind: "h2", id: "my-answers", text: "My own answers, since I use the term" },
    {
      kind: "p",
      text: "It would be poor form to publish a test I have not sat.",
    },
    {
      kind: "ul",
      items: [
        "**Shipped:** twenty-one products, several publicly usable, plus a language model trained from scratch with a measured accuracy figure.",
        "**When it was wrong:** it once produced a plausible adjacent solution I did not catch for several days, and everything built on top of it had to come out. That is why I now require an agent to report what it assumed before I accept anything.",
        "**Refused to automate:** accepting changes. No auto-accept, ever, on anything anyone will depend on.",
        "**How I verify:** every diff read before it lands, summaries and commit messages read, security model reviewed separately from whether the feature works, and a production build used for anything the development server cannot honestly test.",
        "**What I did not write:** most of it, and I know it is safe to the extent that I have read it and tested it, which is a claim with a boundary rather than a guarantee.",
      ],
    },

    { kind: "h2", id: "the-generous-part", text: "The version I would want applied to me" },
    {
      kind: "p",
      text: "Somebody who has built one thing badly and can explain precisely why it was bad is further along than somebody who has built five and thinks they all went fine. The first person has a model of how this goes wrong. The second has a portfolio and no instincts.",
    },
    {
      kind: "p",
      text: "So if you are assessing the claim in someone else, weight the failure question heavily and the tool question at zero. And if you are making the claim yourself, have the answers ready — not because someone will definitely ask, but because assembling them tells you whether the term is currently true of you.",
    },
  ],

  faqs: [
    {
      q: "What does AI-native mean?",
      a: "It describes someone whose default working method is built around these systems rather than someone who added them to an existing craft. The practical marker is a changed sequence of work — building a working version to answer a question that would previously have been researched and written up — rather than the same process performed faster.",
    },
    {
      q: "How do you assess whether someone is genuinely AI-native?",
      a: "Ask what they have shipped and look at it, what they did when a model was confidently wrong, what they have deliberately refused to automate, how they verify output, and how they know the code they did not write is safe. Tool familiarity distinguishes nobody and should carry no weight.",
    },
    {
      q: "What are the warning signs of an overstated AI-native claim?",
      a: "A list of tools offered as the answer to every question, no artefacts anyone can inspect, no describable failures, volume of output presented as the headline achievement, and uniform confidence about what the tools can do. Genuine familiarity comes with a specific sense of where they are unreliable.",
    },
  ],

  seeAlso: ["/about", "/projects", "/philosophy"],
};

export default post;
