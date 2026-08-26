import type { Post } from "../types";

const post: Post = {
  slug: "what-a-marketer-has-to-learn",
  title:
    "What a marketer has to learn to ship software — and it is not syntax",
  answer:
    "Less syntax than expected and more operations than anyone warns you about. The gap is not writing code — an assistant does that — it is knowing where data lives, how deployment differs from a machine that works, what happens when something breaks in front of a user, and being able to read a change well enough to accept or reject it.",
  description:
    "Less syntax than expected and far more operations than anyone warns you about. The list that will hurt you if you skip it, and what a course is for.",
  metaTitle: "What a marketer must learn to build software",
  keywords: ["marketer learn to code", "non-technical build software", "what to learn to build with AI", "marketing to engineering skills"],
  published: "2026-08-26",
  category: "Method",
  // The practical companion to the transition story, and the question most
  // often asked by people considering the same move. Evergreen: the list of
  // things that must be understood has not changed in fifteen years.
  popularity: {
    searchDemand: 15,
    evergreen: 17,
    painIntensity: 13,
    gapInCoverage: 16,
    shareability: 15,
  },
  popularityScore: 76,
  tags: ["Career", "Process", "AI-Native"],
  readingMinutes: 8,
  cover: "/notebook/what-a-marketer-has-to-learn.webp",
  coverAlt:
    "A toolbox with its ornamental top tray tipped out, revealing a deeper tray of plain, worn tools beneath.",
  facts: [
    { label: "Formal coding education", value: "None" },
    { label: "How it was learned", value: "By shipping, then by reading every change before accepting it" },
    { label: "Structured study", value: "AI and agentic AI programmes — Anthropic, Microsoft, and Saïd Business School, University of Oxford" },
    { label: "Where the time actually goes", value: "Polishing, fixing and auditing — not building" },
  ],

  blocks: [
    {
      kind: "p",
      text: "I never learned to code. I want to be exact about what that means, because it is easy to hear it as false modesty and it is not: I did not take a course in a programming language, I did not work through a syllabus, and I could not have written from scratch the applications I have shipped.",
    },
    {
      kind: "p",
      text: "What I did instead was start building, and get better with each thing I shipped. Two years in, the question I get most from other marketers is what they would actually have to learn. Here is the honest answer, which is both smaller and stranger than most people expect.",
    },

    { kind: "h2", id: "not-syntax", text: "It is not the language" },
    {
      kind: "p",
      text: "The thing people assume is the barrier — the syntax, the semicolons, remembering how to write a loop — is the part that has genuinely gone. An assistant handles it, and handles it better than a mid-level developer did five years ago.",
    },
    {
      kind: "p",
      text: "But something subtler is also true. You cannot review what you cannot read, and reviewing is the entire job. So you do end up learning to read code — fluently, in several languages — without ever sitting down to learn a language. It arrives sideways, from reading thousands of changes and deciding whether each one is right. That is a real education and it is not the one anybody advertises.",
    },

    { kind: "h2", id: "the-real-list", text: "What you actually have to understand" },
    {
      kind: "p",
      text: "Almost all of it is operational rather than linguistic. These are the things that will hurt you if you do not know them, roughly in the order they will come up.",
    },
    {
      kind: "h3", id: "environments", text: "That your machine is not the world" },
    {
      kind: "p",
      text: "The single most disorienting early lesson. It works here and fails there, and the reasons are environmental: a value that exists locally and not in production, a file that was never committed, a version difference, a path that only exists on your laptop. Until you understand the distinction between where you build and where it runs, every deployment is a mystery.",
    },
    {
      kind: "h3", id: "secrets", text: "Where secrets live, and where they must never be" },
    {
      kind: "p",
      text: "Not in the code. Not in a file that gets committed. In the host's environment settings, and rotated occasionally. This is a twenty-minute thing to learn and the consequence of not learning it is the one the internet will remember you for.",
    },
    {
      kind: "h3", id: "data", text: "Where the data actually is, and who can reach it" },
    {
      kind: "p",
      text: "Which parts of your application run on somebody's device and which run on a server you control, because that boundary is the security model whether you designed it or not. Anything the browser can do, a user can do deliberately. Anything you check only in the interface is not checked.",
    },
    {
      kind: "h3", id: "auth", text: "How someone gets in, and what happens when they should not" },
    {
      kind: "p",
      text: "Sign-in, sign-out, sessions, and what a request from somebody who should not have access is supposed to receive. This is where being non-technical is genuinely dangerous, because a broken version looks identical to a working one from the outside — it lets the right people in, which is all you tested.",
    },
    {
      kind: "h3", id: "failure", text: "What your product does when it is wrong" },
    {
      kind: "p",
      text: "Not whether it can fail — it will — but what the user sees when it does. An application with no considered failure behaviour is not finished, regardless of how well it works when everything goes right.",
    },
    {
      kind: "h3", id: "version-control", text: "Version control as a safety net" },
    {
      kind: "p",
      text: "You do not need to be fluent. You need to be able to see what changed, go back to a state that worked, and understand that history is permanent. Learning this early converts a category of catastrophic mistakes into a category of inconvenient ones.",
    },

    { kind: "h2", id: "learning-by-shipping", text: "You learn this by shipping, not before it" },
    {
      kind: "p",
      text: "I did not learn any of the above and then start building. Each item on that list is there because it went wrong once, in something real, at an hour when I would rather have been asleep. That is a slow teacher and an unusually effective one, because the lesson arrives attached to a consequence.",
    },
    {
      kind: "p",
      text: "The structured study I have done is not in programming at all — AI and agentic systems programmes from Anthropic, from Microsoft, and a generative and agentic AI course from Saïd Business School at Oxford. What those gave me was not implementation ability. It was **vocabulary**: enough conceptual structure to ask a precise question instead of a vague one, and enough grounding to recognise when an answer is confidently wrong.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "The courses are for asking, not for doing",
      text: "This is the part I would tell any marketer to take seriously. You are not studying so you can implement something — you will not implement it, your assistant will. You are studying so that when it presents an approach, you can tell whether it is the right approach. That is a comprehension skill, not a production skill, and it is the one that decides quality.",
    },

    { kind: "h2", id: "what-you-already-have", text: "What you bring that is genuinely rare" },
    {
      kind: "p",
      text: "Marketing teaches you to judge whether something lands — whether a claim is believable, whether a flow makes sense to a person who has never seen it, whether an interface is confusing in a way its author cannot see. Engineers spend years developing that and many never do, because it is not what their work rewards.",
    },
    {
      kind: "p",
      text: "You also know what a product is for, which sounds trivial and is not. A very large amount of software is built beautifully and answers a question nobody asked. Coming from a discipline whose entire purpose is understanding what people actually want is not a deficit to overcome; it is the half that has not become cheap.",
    },

    { kind: "h2", id: "the-hard-part", text: "The part nobody can do for you" },
    {
      kind: "p",
      text: "Most of your time will not be spent building. On my projects the research comes first, the building is the fastest phase by a wide margin, and the overwhelming majority of the effort goes into polishing, fixing and auditing afterwards. If you are not prepared for that ratio you will ship a great deal of unfinished software and mistake it for a body of work.",
    },
    {
      kind: "p",
      text: "And you have to read the changes. Every one, before it lands. It is the slowest habit I have and it is the reason I can make any claim about what is in a codebase I did not type. It is also, incidentally, how the learning happens — the education is not separate from the discipline, it is the same activity.",
    },
    {
      kind: "p",
      text: "So the honest list is: less syntax than you fear, considerably more operational understanding than anyone mentions, a genuine willingness to spend most of your time on the boring end, and the patience to read. None of that requires a degree. All of it requires actually doing it, which is the part that filters people, not the technical difficulty.",
    },
  ],

  faqs: [
    {
      q: "Do you need to learn to code to build software with AI?",
      a: "Not to produce code, but you do need to read it. Reviewing every change before accepting it is what prevents the common failures, and that requires comprehension. Reading fluency tends to arrive from the reviewing itself rather than from studying a language directly, but it is not optional.",
    },
    {
      q: "What should a marketer learn first before building software?",
      a: "Operational concepts rather than a language: the difference between a local machine and production, where secrets belong, which parts of an application a user can manipulate, how authentication and sessions work, what the product does when it fails, and enough version control to return to a state that worked.",
    },
    {
      q: "Are AI courses useful if you are not going to write code yourself?",
      a: "Yes, for a different reason than expected. Their value is vocabulary and conceptual structure — enough to ask precise questions and to recognise when a proposed approach is wrong. That is a comprehension skill rather than a production one, and it is what determines the quality of the direction given to an assistant.",
    },
  ],

  seeAlso: ["/learnings", "/journey", "/projects"],
};

export default post;
