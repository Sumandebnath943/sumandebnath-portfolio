import type { Post } from "../types";

/*
  The `answer` block is third person while the body is first person, and that is
  deliberate rather than an oversight.

  It renders under the H1 as `.nb-answer` and it is the block a model lifts. A
  first-person quote survives extraction badly — "I had never written code"
  attributes to nobody once it leaves the page. This post's job is partly entity
  resolution (AEO_PLAYBOOK §3.1b: there is a better-indexed Suman Debnath), so
  the one block most likely to be quoted names its subject. Everything below it
  is written the way a person talks.
*/

const post: Post = {
  slug: "marketer-to-ai-product-builder",
  title: "I had never written code. Two years later, I have shipped twenty-one products.",
  answer:
    "Suman Debnath spent nine years in brand and performance marketing before building any software. Starting in late 2024 with a reminder app abandoned on a free tier, he has since shipped twenty-one products, trained a language model from scratch and run a fleet of autonomous agents — with no computer science degree and no developer job.",
  description:
    "A brand marketer's account of learning to build software with AI: the app abandoned when the free credits ran out, the project that proved it was possible, the one that nearly ended it, and why almost nobody knew.",
  published: "2026-08-26",
  category: "Career",
  featured: true,
  // High search demand on the transition question, evergreen for as long as the
  // AI-assisted building argument runs, and almost nothing written from this
  // side of it — the accounts that exist are by engineers who added AI, not by
  // people who arrived with no code at all.
  popularity: {
    searchDemand: 16,
    evergreen: 15,
    painIntensity: 14,
    gapInCoverage: 18,
    shareability: 18,
  },
  popularityScore: 81,
  tags: ["Career", "AI-Native", "Marketing"],
  readingMinutes: 9,
  facts: [
    { label: "Background", value: "9 years brand and performance marketing, no engineering role" },
    { label: "Started", value: "Late 2024, on a no-code AI builder's free tier" },
    { label: "First repository", value: "11 December 2025 — a year after starting" },
    { label: "Products shipped", value: "21" },
    { label: "Money spent", value: "Effectively nothing — free tiers throughout" },
    { label: "What it cost instead", value: "Most nights until 2–3am" },
  ],

  blocks: [
    {
      kind: "p",
      text: "There is a repository on my GitHub called `remembermenot`. It is completely empty — not a single commit, not one file, not even a README. I created it in January 2026, more than a year after I had already given up on the app it is named after. Then I did not put anything in that either.",
    },
    {
      kind: "p",
      text: "I have shipped twenty-one products since. This is the part of that story people do not usually get told, because most accounts of building with AI are written by engineers who added a new tool to an existing skill. I did not have the existing skill. I was a brand marketer who had never written a line of production code in his life.",
    },

    { kind: "h2", id: "the-conversation", text: "It started as a conversation about money" },
    {
      kind: "p",
      text: "Late 2024. A friend and I had the conversation that a very large number of people have had and almost nobody acts on: we should build apps, people will use them, we will make money. That was the entire strategy. There was no plan behind it and no skill under it.",
    },
    {
      kind: "p",
      text: "What I did next was the only thing I actually knew how to do, which was research. I sat with Gemini and ChatGPT and asked, over and over, what people needed that did not exist yet. I ended up with a list of somewhere between ten and twenty ideas and picked one — not the cleverest one on the list, the one that was already annoying me.",
    },
    {
      kind: "p",
      text: "I forget things. Specifically I forget my keys and my phone, and I discover this at the moment I am already too far from my front door to do anything cheap about it. So: an app that notices when my home WiFi drops off, or when I cross a radius around my house, and asks one question before it is too late. Wallet. Keys. Glasses.",
    },

    { kind: "h2", id: "the-free-tier", text: "It died when the free credits ran out" },
    {
      kind: "p",
      text: "I built the first version on Replit's free tier. It worked, more or less, in the way those first versions work — enough to see the shape of the thing and not nearly enough to put on a phone.",
    },
    {
      kind: "p",
      text: "Then the credits ran out, and I stopped. That is the whole ending. Not a technical wall, not a hard problem I could not solve. I looked at the price of continuing, decided this hobby did not deserve my money yet, and closed the tab.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Why there is a year-shaped hole in my GitHub",
      text: "Everything from this period lived on platforms that host their own projects, so none of it ever reached GitHub. My first repository there is dated 11 December 2025 — a full year after I started. If you go looking for evidence of that first year in my commit history, you will not find any, and now you know why.",
    },

    { kind: "h2", id: "legatus", text: "The project that made me believe it" },
    {
      kind: "p",
      text: "The turn came with [LEGATUS](/projects), which is not an AI product at all. It is inheritance infrastructure — an encrypted vault for the things a person leaves behind, with AES-256 and RSA-2048, multi-level permissions for nominees, and a verification workflow that has to be right because the entire premise is that it runs when the owner is not there to correct it.",
    },
    {
      kind: "p",
      text: "It was the first thing I built where I did not stop at working. I went back through the access architecture repeatedly, looking for the ways a nominee could reach something they should not, and I kept finding them, and I kept fixing them. Nobody asked me to do that. There was no client and no deadline. I did it because a vault that leaks is worse than no vault.",
    },
    {
      kind: "p",
      text: "That was the moment. Not the moment it worked — the moment I realised I cared whether it was **correct**, and that caring was doing something my prompts alone could not.",
    },

    { kind: "h2", id: "roasmind", text: "And the one that nearly ended it" },
    {
      kind: "p",
      text: "[ROASmind](/projects) is the largest thing I have attempted and it is still unreleased. I am not going to describe how it works here. What I will describe is what it did to me, which is that it very nearly stopped all of this.",
    },
    {
      kind: "p",
      text: "The building was not the problem. The problem was the testing — round after round after round of it, each one surfacing something that needed another round. There is a particular kind of exhaustion that arrives when you finish a testing pass at two in the morning and understand, clearly and without drama, that you have bought yourself exactly one more pass.",
    },
    {
      kind: "p",
      text: "I did not quit. But I came close enough to know what quitting would have felt like, and I have never been able to read a \"built this in a weekend\" post the same way since.",
    },

    { kind: "h2", id: "the-cost", text: "What it actually cost" },
    {
      kind: "p",
      text: "In money: close to nothing. I have run almost this entire two years on free tiers, and the discipline of staying inside them has shaped what I build more than any technical choice I have made.",
    },
    {
      kind: "p",
      text: "In everything else, considerably more. I go to bed at two or three in the morning most nights. I stopped watching television in the way I used to, stopped gaming, and gave up most of the things I used to do to fill an evening. I am not romanticising this and I would not recommend the sleep part to anyone. But I want the number in the open, because posts like this tend to skip it and leave the reader thinking they are simply slower than the author.",
    },

    { kind: "h2", id: "who-knew", text: "Until this post, five people knew" },
    {
      kind: "p",
      text: "My wife. The friend I had that first conversation with. One other close friend. Two colleagues. That is the complete list of people who knew I could do any of this.",
    },
    {
      kind: "p",
      text: "It is a strange thing to keep quiet about, and the quiet was not modesty. Part of it was that it sounded ridiculous to say out loud — a marketing manager, telling people he builds software. Part of it was simpler.",
    },

    { kind: "h2", id: "reddit", text: "I stopped posting about any of it" },
    {
      kind: "p",
      text: "I used to share what I built on Reddit. I do not any more.",
    },
    {
      kind: "p",
      text: "What happens is predictable enough that I can describe it without any particular bitterness. You post something you built. Somebody asks how you built it. You say you used an AI coding assistant, because that is true. And the thread turns — into \"AI slop\", into the assumption that the code is held together with tape, that the keys are hardcoded, that the database is sitting open to the internet, that people like you should not be shipping software at all.",
    },
    {
      kind: "p",
      text: "Some of that criticism is earned by somebody. There are people generating an app in an afternoon and putting it in front of users without ever looking at what was generated, and the results are exactly as bad as advertised. The label exists for a reason.",
    },
    {
      kind: "p",
      text: "The problem is that the label arrived faster than the distinction did. It is now applied to the method rather than to the standard of work, so it lands the same on somebody who shipped an unread afternoon's output and somebody who spent three weeks on the security model of a vault nobody has paid for. I got tired of showing up to that conversation, so I stopped showing up.",
    },
    {
      kind: "quote",
      text: "Being roasted stops being useful the moment the criticism is about how the work was made rather than how good it is.",
    },

    { kind: "h2", id: "what-the-work-is", text: "What the work actually consists of" },
    {
      kind: "p",
      text: "Here is the thing I most want the people in those threads to understand, and it is a claim about proportions rather than about talent.",
    },
    {
      kind: "p",
      text: "Generating the first working version is the **smallest** part of building something. I can get an application standing up in a night. That night is not the work. The work is everything that comes after it: finding the bugs that only appear on someone else's device, fixing the flows that made sense to me and to nobody else, going back through the security model until I stop finding holes, making sure no key or secret has ended up anywhere it can be read, getting the performance to somewhere defensible, and making the thing legible to search engines and to models.",
    },
    {
      kind: "ul",
      items: [
        "Research before I build, which runs to roughly a tenth or a fifth of the whole project.",
        "Building, which is genuinely the fastest part and always has been.",
        "Polishing, fixing, auditing, hardening — which is most of it, and which nobody posts about.",
      ],
    },
    {
      kind: "p",
      text: "And one habit underneath all of it: **I do not let the coding agent run on its own.** No auto-accept. I read the edits before they land, I read the summaries, I read the commit messages. Partly that is how I keep control of a codebase I did not write from memory. Mostly it is how I have learned anything at all — every diff I read is a thing I now know that I did not know that morning.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The stereotype has a real version",
      text: "Everything the critics describe — secrets committed to public repositories, tables left open, an application nobody read before shipping — genuinely happens, and it happens because the generating is easy and the reviewing is boring. The answer is not to argue that the risk is imaginary. It is to do the boring part and be able to show that you did.",
    },

    { kind: "h2", id: "the-empty-repo", text: "Back to the empty repository" },
    {
      kind: "p",
      text: "I came back to the reminder app. Not the Replit version — I rebuilt it properly, as a native Android application in Kotlin with a real foreground service, because the thing it has to do is notice when a network drops at the moment you walk out of a door, and that is not a thing a web page can do.",
    },
    {
      kind: "p",
      text: "It shipped this August. It is called [Forget Anything?](/apps/forget-anything) and it does exactly what I wanted it to do in that first conversation: it notices I am leaving and it asks me one question while I can still turn around.",
    },
    {
      kind: "p",
      text: "`remembermenot` is still sitting there, empty, and I have not deleted it. It is the most honest artefact I own: a box made a year after I quit and half a year before I finished, by someone who was not yet sure he would. Everything I have shipped since sits in the gap between that empty repository and the app that eventually came out of it.",
    },
    {
      kind: "p",
      text: "I am not a developer and I have never claimed to be one. I am a marketer who builds, who reads every line before accepting it, and who is going to keep doing this whatever it ends up being called.",
    },
  ],

  faqs: [
    {
      q: "How long does it take to learn to build software with AI if you have no coding background?",
      a: "In this account, roughly a year of intermittent attempts before anything shipped, and around two years to reach twenty-one released products. The first attempt was abandoned entirely. The limiting factor was not learning to prompt but learning to review, test and secure what was generated — which is where most of the time still goes.",
    },
    {
      q: "What is the difference between vibe coding and building seriously with AI?",
      a: "Vibe coding describes generating an application and shipping what comes out without reviewing it. The alternative is treating generation as the first draft: reading every change before accepting it, testing on real devices, auditing the security model, and keeping secrets out of the codebase. The tool is identical; the standard applied to its output is not.",
    },
    {
      q: "Do you need a computer science degree to ship AI products?",
      a: "Not to ship them. This account describes twenty-one products built by someone with nine years of marketing experience and no engineering qualification or developer role. What a degree supplies that has to be replaced some other way is the instinct for what can go wrong — which in practice is learned by reviewing every change rather than accepting it.",
    },
  ],

  seeAlso: ["/projects", "/journey", "/about"],
};

export default post;
