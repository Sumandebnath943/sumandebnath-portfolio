import type { Post } from "../types";

const post: Post = {
  slug: "aeo-vs-seo-what-changes",
  title:
    "AEO vs SEO: what changes when the reader is a model",
  answer:
    "Search optimisation competes to be ranked among ten results; answer optimisation competes to be the one passage quoted. The unit shifts from the page to the self-contained block, the currency shifts from keywords to resolved entities, and the outcome becomes largely unmeasurable — there is no rank to track and the same question returns different answers on different runs.",
  description:
    "Search competes for a position among ten results. An answer engine produces one. What carries over from SEO, what stops working, and why you cannot measure it.",
  metaTitle: "AEO vs SEO: what changes when the reader is a model",
  keywords: ["AEO vs SEO", "answer engine optimisation", "generative engine optimisation", "GEO vs SEO"],
  published: "2026-08-26",
  category: "Marketing & AI",
  // High demand, and most existing coverage is either rebranded SEO advice or
  // speculation. Moderate evergreen — the principles outlast any one engine but
  // the landscape is moving fast.
  popularity: {
    searchDemand: 18,
    evergreen: 12,
    painIntensity: 14,
    gapInCoverage: 15,
    shareability: 15,
  },
  popularityScore: 74,
  tags: ["AEO", "SEO", "Marketing"],
  readingMinutes: 8,
  cover: "/notebook/aeo-vs-seo-what-changes.webp",
  coverAlt:
    "Ten stacked bars on the left narrowing through an arrow into a single speech bubble on the right.",
  facts: [
    { label: "SEO competes for", value: "A position among several results" },
    { label: "AEO competes for", value: "Being the passage quoted in one answer" },
    { label: "Unit of optimisation", value: "The page → a self-contained block" },
    { label: "Currency", value: "Keywords → resolved entities" },
    { label: "Measurability", value: "Rank tracking → no reliable equivalent" },
  ],

  blocks: [
    {
      kind: "p",
      text: "I spent nine years doing search optimisation before I spent any time on answer optimisation, and the most useful thing I can tell you is which of your instincts to keep and which to actively suppress. Most of the advice being written treats the second as a rebrand of the first. It is not.",
    },

    { kind: "h2", id: "the-core-difference", text: "Ranked versus quoted" },
    {
      kind: "p",
      text: "Search puts you in a list. Ten results exist, the user sees several, and a respectable position gets a share of the attention. Being fourth is worth less than being first and it is worth a great deal more than nothing.",
    },
    {
      kind: "p",
      text: "An answer engine produces **one answer**. It may cite two or three sources underneath, but there is no fourth position and no consolation share. You are either in the answer or you are not, and the distribution of outcomes is far more brutal than a ranked list.",
    },
    {
      kind: "quote",
      text: "Search optimisation is competing for a position. Answer optimisation is competing to be the sentence that gets used.",
    },
    {
      kind: "p",
      text: "Everything else follows from that difference.",
    },

    { kind: "h2", id: "the-unit", text: "The unit of optimisation shrinks" },
    {
      kind: "p",
      text: "In search, the page is the thing being ranked. You optimise a page, you rank a page, you get traffic to a page.",
    },
    {
      kind: "p",
      text: "A model does not quote pages. It quotes **passages**, and it takes the passage that answers the question with the least surrounding context required. This is the single most actionable difference, and it changes how you write:",
    },
    {
      kind: "ul",
      items: [
        "Every important question gets a **self-contained answer** of a few sentences, placed immediately after the heading that asks it.",
        "That block must survive being read with nothing around it. No \"as mentioned above\", no pronoun pointing back at the title, no dependence on the paragraph before.",
        "Headings become questions rather than labels, because a model matches a user's question against headings before it matches body text.",
        "Specifics go into tables and lists, not into sentences. A number in a labelled row gets extracted; the same number in the middle of a paragraph gets skipped.",
      ],
    },
    {
      kind: "p",
      text: "A page written this way reads slightly differently to a human — a little more direct, a little front-loaded. In my experience that is an improvement, which is a rare thing to be able to say about an optimisation.",
    },

    { kind: "h2", id: "entities", text: "Keywords become entities" },
    {
      kind: "p",
      text: "The keyword habit is the hardest one to break, and I say that as someone who tried the keyword approach first and got nothing from it.",
    },
    {
      kind: "p",
      text: "A model answering a question about a person, product or company is doing **entity resolution**: working out which real thing the name refers to, then deciding whether it knows enough to say anything about it. Repetition does not help with either step. What helps is that several independent sources agree about the same entity — which means most of the work is not on your website at all.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "This is the part that is genuinely outside your control",
      text: "If your name or brand is ambiguous, a well-structured site is one source, and one source is often not enough to resolve confidently against a better-established alternative. The remedies are corroborating profiles, entries in public knowledge bases, and consistent wording of the same description everywhere. None of that is a website change, and no amount of on-site work substitutes for it.",
    },

    { kind: "h2", id: "carries-over", text: "What carries over from SEO" },
    {
      kind: "p",
      text: "More than the excitable posts suggest. The foundations are the same foundations:",
    },
    {
      kind: "table",
      head: ["Still matters", "Why"],
      rows: [
        ["Crawlability", "If it cannot be fetched, nothing else applies"],
        ["Server-rendered content", "Many fetchers execute no JavaScript at all"],
        ["Clean information architecture", "It is how a machine works out what a page is about and where it sits"],
        ["Internal linking", "Still how importance and relationship are inferred"],
        ["Real publication dates", "Freshness is weighed, and a site claiming everything changed today carries no information"],
        ["Being indexed somewhere", "Most assistants answer from an index they do not own"],
      ],
    },
    {
      kind: "p",
      text: "That last row is the one most often missed. Several major assistants do not operate their own web index — they answer from somebody else's. A site can be immaculately structured and still be uncitable by a given assistant, because the index that assistant reads has never seen it. Being crawled and being indexed are different things.",
    },

    { kind: "h2", id: "stops-working", text: "What stops working" },
    {
      kind: "ul",
      items: [
        "**Keyword density**, in every form. There is no term-frequency dial to turn.",
        "**Thin pages at scale.** A hundred near-identical pages targeting variations of a phrase gave you a hundred chances to rank. They give you nothing to quote and, worse, they split the one answer across competing URLs.",
        "**Optimising for the click.** A large share of answer-engine value now arrives without a visit. The measurement problem below is real, and writing to withhold the answer so people have to click is precisely the wrong response.",
        "**Exact-match anchors and similar mechanical signals.** They were already decaying and they carry nothing here.",
      ],
    },
    {
      kind: "p",
      text: "One rule I now apply: **no two pages may answer the same question.** In search, two pages targeting one phrase was inefficient. Here it is actively harmful — the engine picks one and discounts the other, and you have made yourself harder to resolve rather than more visible.",
    },

    { kind: "h2", id: "measurement", text: "The genuinely hard part: you cannot measure it" },
    {
      kind: "p",
      text: "This is the difference that has cost me the most and gets discussed the least. Search has rank tracking. It is imperfect, it varies by location and personalisation, but it is a number that moves.",
    },
    {
      kind: "p",
      text: "There is no equivalent. The same question asked three times returns three materially different answers. There is no position to record. Citation may or may not be shown. And a favourable result on the day you check tells you almost nothing, because you have sampled once from a distribution you cannot see.",
    },
    {
      kind: "ol",
      items: [
        "Write down the specific prompts you want to be the answer to, before you start work.",
        "Ask each several times, in a session with no history, on a device that has never searched for you.",
        "Take the answer that appears most often, not the best one.",
        "Record it word for word with a date, because in three months you will not remember what it said.",
        "Re-run the whole set on a schedule, and expect individual results to move without meaning anything.",
      ],
    },
    {
      kind: "p",
      text: "That is a slower and less satisfying feedback loop than a rank tracker, and treating a single good answer as proof of anything is the most common mistake in this field right now — including, on at least one occasion, by me.",
    },

    { kind: "h2", id: "summary", text: "The short version" },
    {
      kind: "p",
      text: "Keep the foundations: crawlable, server-rendered, well-structured, properly linked, honestly dated. Change the writing: self-contained answers under question-shaped headings, facts in tables, one question per URL. Abandon the keyword instinct and spend that effort on being corroborated somewhere other than your own domain. And accept that you are working with a measurement instrument far blunter than the one you are used to.",
    },
  ],

  faqs: [
    {
      q: "What is the difference between AEO and SEO?",
      a: "Search optimisation competes for a position among several results, where a lower position still earns some attention. Answer optimisation competes to be the passage quoted inside a single generated answer, where there is no second place. The practical consequence is that the unit of optimisation shifts from the page to the self-contained block.",
    },
    {
      q: "Does keyword optimisation still work for AI search?",
      a: "Not in its familiar form. Answer engines resolve entities — determining which real person or thing a name refers to — rather than matching term frequency. Repeating a term more often does not assist that process. What does is consistent corroboration across independent sources, most of which sits outside the website itself.",
    },
    {
      q: "How do you measure answer engine optimisation?",
      a: "Imperfectly. There is no equivalent of rank tracking because answers are non-deterministic and vary between runs. The workable method is a written set of target prompts, asked repeatedly in sessions with no history, recording the most frequent answer verbatim with a date, and re-running on a schedule rather than trusting any single result.",
    },
  ],

  seeAlso: ["/notebook", "/projects", "/about"],
};

export default post;
