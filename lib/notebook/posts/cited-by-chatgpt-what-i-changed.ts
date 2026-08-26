import type { Post } from "../types";

const post: Post = {
  slug: "cited-by-chatgpt-what-i-changed",
  title: "ChatGPT started citing my site. Here is what I changed, and what I still cannot prove.",
  answer:
    "ChatGPT began naming Suman Debnath for the query \"who is Suman Debnath\" two days after a full answer-engine optimisation pass — a generated llms.txt, extractable answer blocks, entity disambiguation and structured data. Keyword stuffing was tried first and did nothing. Two days is not proof of cause, and Claude, Gemini and Grok still do not cite the site.",
  description:
    "An account of getting a personal site cited by ChatGPT: the shortcut that failed, the answer-engine work that preceded the citation, why two days of evidence proves nothing, and what the engines that still ignore the site need instead.",
  published: "2026-08-26",
  category: "Marketing & AI",
  // Not `featured`: the transition story carries it and shares this publication
  // date, so two flags would make the lead slot depend on array order.
  pick: true,
  // Very high demand — "how to get cited by ChatGPT" is one of the most asked
  // marketing questions of the year — and almost everything written about it is
  // speculation sold as method. A dated account with a stated confidence level
  // is rare. Decays as engines change, hence the middling evergreen score.
  popularity: {
    searchDemand: 19,
    evergreen: 10,
    painIntensity: 14,
    gapInCoverage: 17,
    shareability: 17,
  },
  popularityScore: 77,
  tags: ["AEO", "SEO", "Marketing", "Structured Data"],
  readingMinutes: 8,
  cover: "/notebook/cited-by-chatgpt-what-i-changed.webp",
  coverAlt:
    "A single paragraph being lifted out of a printed page between two quotation marks, leaving a clean rectangular gap.",
  facts: [
    { label: "First observed", value: "24 August 2026" },
    { label: "Queries", value: "\"who is suman debnath\", \"suman debnath portfolio\"" },
    { label: "Devices checked", value: "Three, including one where the name had never been typed" },
    { label: "Optimisation work began", value: "Roughly 19 August 2026" },
    { label: "Engines citing the site", value: "ChatGPT" },
    { label: "Engines not citing it", value: "Claude, Gemini, Grok" },
    { label: "Age of the evidence", value: "Two days — see the caveat" },
  ],

  blocks: [
    {
      kind: "p",
      text: "Two days ago I typed \"who is suman debnath\" into ChatGPT and it described me. Not the other Suman Debnath — there is a well-indexed one who is a developer advocate at a large cloud company, and for a long time he was the only answer anyone got. Me. My work, my products, my site.",
    },
    {
      kind: "p",
      text: "I checked it on my own device in a temporary chat, then on my wife's, then on a friend's device where my name had never been typed at all. Same answer. That third check is the one that mattered — personalisation is the obvious explanation for a result this flattering, and it needed ruling out before I let myself believe it.",
    },
    {
      kind: "p",
      text: "Then I want to tell you what I cannot conclude from that, because this is exactly the kind of post that usually skips straight to the method.",
    },

    { kind: "h2", id: "the-caveat", text: "Two days is not proof" },
    {
      kind: "callout",
      tone: "warn",
      title: "Read this before you copy anything below",
      text: "I have one observation, two days old, from one engine. Answer engines are non-deterministic — the same prompt returns materially different answers across runs. I did the work and then this happened, which is a sequence, not a demonstrated cause. It is entirely possible that something changed on OpenAI's side in the same week and I am taking credit for it.",
    },
    {
      kind: "p",
      text: "I am publishing it anyway, with the confidence level attached, because the alternative — waiting a quarter to be sure — means nobody writes anything about this while it is still happening. But if you take one thing from this post, take that box rather than the checklist.",
    },

    { kind: "h2", id: "the-shortcut", text: "The shortcut I tried first, which did nothing" },
    {
      kind: "p",
      text: "My instinct, and I say this as somebody who has worked in digital marketing for nine years, was to stuff my name in. More instances of \"Suman Debnath\" in more fields — metadata, headings, alt text, the keyword tag. This is the reflex from a decade of search engine optimisation and it is a reflex worth unlearning.",
    },
    {
      kind: "p",
      text: "It did nothing. Not a small effect I failed to measure — nothing at all. The site was already saying my name plenty of times; repetition was never the missing input.",
    },
    {
      kind: "p",
      text: "What an answer engine is doing is **entity resolution**: deciding which real-world person a name refers to, then deciding whether it knows enough about that person to say anything. Repetition does not help with either. Corroboration does, and structure does.",
    },

    { kind: "h2", id: "what-i-actually-did", text: "What I actually did" },
    {
      kind: "p",
      text: "The work took about a week and none of it was clever. It was mostly the unglamorous half of the job.",
    },
    {
      kind: "ul",
      items: [
        "**A generated `/llms.txt`** — a plain-text summary of the whole site written for models, derived from the same data the pages use so it cannot drift out of date. Disambiguation is the first section, before anything else.",
        "**Extractable answers.** Every product page and every article opens with a self-contained forty-to-sixty word answer directly under the heading. A model reading for an answer takes the first block that stands alone; a page that opens with narrative gives it nothing to take.",
        "**One question per URL.** Each identity question — who is he, what is he known for, what has he built — is owned by exactly one page, which carries it in the title, in a heading, and in structured data. Two pages answering the same question compete with each other.",
        "**Disambiguation in visible prose**, not only in a schema attribute. An engine choosing between two people with one name has to read the distinction somewhere a human could read it too.",
        "**Structured data that a non-JavaScript crawler can actually see** — which turned out to be its own separate problem, and its own article.",
        "**Crawl access stated explicitly** for around thirty named agents, including the retrieval fetchers that honour different rules from the training crawlers.",
      ],
    },
    {
      kind: "p",
      text: "I wanted the shortcut. I ended up doing the whole thing, and the whole thing is what was sitting there when the answer changed.",
    },

    { kind: "h2", id: "the-engines-that-dont", text: "Three engines still do not cite me" },
    {
      kind: "p",
      text: "Claude, Gemini and Grok do not name me. I could have left that out of this post and you would not have known. It is the most useful part of it.",
    },
    {
      kind: "p",
      text: "The reason is not that the site is less readable to them. It is that **they do not share an index**, and being crawled is not the same as being indexed:",
    },
    {
      kind: "table",
      head: ["Engine", "Answers from", "What that means for a new site"],
      rows: [
        ["ChatGPT", "OpenAI's own crawler and index", "One company controls both ends — the loop closes fastest"],
        ["Claude", "Brave's index", "Needs presence in Brave: inbound links, and time"],
        ["Gemini", "Google's index", "Needs Search Console verification and actual indexing"],
        ["Copilot", "Bing's index", "Needs Bing Webmaster Tools, and IndexNow helps"],
        ["Grok", "X, plus a web index", "Needs posts on X that link the site"],
      ],
      caption: "Why one engine moving and four not moving is the expected shape, not an anomaly.",
    },
    {
      kind: "p",
      text: "OpenAI is the only one of those that both crawls and indexes in house. That is not a marketing insight, it is an architectural fact, and it explains why on-site work pays off there first and fastest. For the others the site can be perfect and still uncitable, because the assistant never sees it.",
    },

    { kind: "h2", id: "what-i-did-about-that", text: "What I have done about the other four" },
    {
      kind: "p",
      text: "Naming a gap without saying what you did about it is just complaining. Since finding this:",
    },
    {
      kind: "ul",
      items: [
        "**Verified the site in both Google Search Console and Bing Webmaster Tools**, and requested indexing on the pages that carry the identity answers — the about page, the FAQ and the profile.",
        "**Fixed Claude's crawler detection.** Anthropic runs three separate agents — one for training, one for building the search index, one for the live fetch when somebody asks Claude about a page — and they mean three completely different things. One of them was matching nothing in my logging at all, so every visit it had ever made was being silently discarded. That is why I had no evidence either way.",
        "**Submitted to IndexNow**, which Bing, Yandex, Seznam and Naver share. Bing is the one that feeds Copilot.",
        "**Started the off-site work**, which is the part that actually decides the Claude and Gemini cases and is nothing to do with the website at all.",
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "The part no amount of site work fixes",
      text: "When more than one person shares a name, an engine names the one it can resolve most confidently — and confidence comes from independent sources agreeing. A single well-marked-up site is one source. That is why the remaining work is a Wikidata entry, model cards, and a profile bio worded identically everywhere, rather than another page on my own domain.",
    },

    { kind: "h2", id: "what-id-tell-you", text: "What I would tell you if you are starting" },
    {
      kind: "p",
      text: "Nobody has yet told me they found me through an AI answer. I showed it to friends and they were impressed, which is not a business outcome. The honest state of this is: one engine, two days, no attributable result.",
    },
    {
      kind: "ol",
      items: [
        "The shortcut does not exist. I looked for it properly and it is not there.",
        "Write the answer, not the page. If a paragraph cannot be quoted with no context around it, it will not be quoted.",
        "Decide which single URL owns each question, and do not let a second one compete for it.",
        "Check which index the engine you care about actually answers from before doing any work aimed at it.",
        "Then wait, and re-check on a device that has never heard of you.",
      ],
    },
    {
      kind: "p",
      text: "I will re-run this in a quarter, from a set of prompts written down in advance, and record what comes back verbatim. If the citation has evaporated, that will be in an article too.",
    },
  ],

  faqs: [
    {
      q: "How long does it take to get cited by ChatGPT after optimising a site?",
      a: "In this single documented case, a citation appeared roughly two days after a week of answer-engine optimisation work. That is one observation from one site and does not establish a typical timeline or a causal link. Answer engines are non-deterministic, so a single favourable result is not evidence that any specific change caused it.",
    },
    {
      q: "Why does ChatGPT cite a site when Claude and Gemini do not?",
      a: "Because they answer from different indexes. OpenAI operates its own crawler and index, so on-site changes can reach it directly. Claude answers from Brave's index, Gemini from Google's and Copilot from Bing's — each of which must independently discover and index the site before the assistant can cite it.",
    },
    {
      q: "Does repeating a name or keyword more often help with AI citations?",
      a: "No. Answer engines perform entity resolution — deciding which real person or thing a name refers to — and that depends on corroboration across independent sources and on clearly structured answers, not on repetition. Adding more instances of a name to metadata produced no observable effect in this case.",
    },
  ],

  seeAlso: ["/notebook", "/about", "/projects"],
};

export default post;
