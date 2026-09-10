import type { Post } from "../types";

const post: Post = {
  slug: "when-ai-engines-name-the-wrong-person",
  title: "ChatGPT named me. Claude and Gemini Pro named someone else.",
  // Third person, per BLOG_GUIDELINES §2. This post is doing entity work —
  // AEO_PLAYBOOK §3.1b — and a first-person answer block attributes to nobody
  // once a model lifts it out of the page. The body stays in first person.
  answer:
    "Asked who Suman Debnath is, ChatGPT cited four pages from his own site and led with him. Perplexity held his domain in its source panel and still reduced him to two words. Gemini Pro and Claude returned other people with the same name. Thirteen links declare his identity and every one is self-asserted.",
  description:
    "One run, five AI engines, one name. What the source panels showed about who gets believed, and why thirteen links you wrote yourself corroborate nothing.",
  metaTitle: "Five AI engines, one name: two returned a namesake",
  // SERP-checked 12 Sep 2026. "Track brand visibility across AI engines" is
  // saturated with tool marketing — Pixis, Ryze, Visiblie, Soar and a dozen
  // more — and a personal account cannot outrank a product page on it. What
  // returned almost nothing was the namesake problem stated from the losing
  // side, so the primary phrase goes there.
  keywords: [
    "AI confuses me with someone with the same name",
    "retrieved but not cited by AI search",
    "self-asserted profiles do not corroborate you",
    "entity disambiguation AI answer engines",
  ],
  published: "2026-09-13",
  category: "Marketing & AI",
  // Real and rising demand — anyone with a common name is starting to hit this,
  // and almost everything written about AI visibility is a tool pitch. Evergreen
  // scores low on purpose: the grades below will not survive the next model
  // release, though the argument underneath them should.
  popularity: {
    searchDemand: 14,
    evergreen: 9,
    painIntensity: 16,
    gapInCoverage: 14,
    shareability: 16,
  },
  popularityScore: 69,
  tags: ["AEO", "SEO", "Marketing"],
  readingMinutes: 8,
  cover: "/notebook/when-ai-engines-name-the-wrong-person.webp",
  coverAlt:
    "A hand holding a phone showing a ChatGPT home screen, its suggested prompts including \"Tell me about Suman Debnath\" and \"Cite sources\", held over a sunlit balcony table with a coffee mug and an open notebook reading \"Better Questions Brighter Answers\", a city skyline behind.",
  facts: [
    { label: "Date of run", value: "10 September 2026" },
    { label: "Prompt", value: "\"Who is suman debnath?\"" },
    { label: "Engines", value: "ChatGPT, Gemini Flash-Lite, Perplexity, Gemini Pro, Claude" },
    { label: "Runs per engine", value: "One — see the caveat" },
    { label: "Led with the right person", value: "One of five" },
    { label: "Returned a different person entirely", value: "Two of five" },
    { label: "Identity links declared", value: "Thirteen, all self-asserted" },
    { label: "Conditions", value: "Logged out or temporary chat, from a phone" },
  ],

  blocks: [
    {
      kind: "p",
      text: "On 10 September I asked five AI engines the same four words — who is suman debnath — and took a screenshot of each answer. One of them led with me. Two returned somebody else entirely, and one of those had never heard of me at all.",
    },
    {
      kind: "p",
      text: "I run answer-engine optimisation on this site as a working practice and write about it here, so this was a measurement of my own work, taken in public, with the result not going the way I wanted.",
    },

    {
      kind: "h2",
      id: "five-engines",
      text: "Five engines, one question, and no two of them meant the same person",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Read this before you take any grade below seriously",
      text: "This is one run per engine, and my own testing rules say three runs with the modal answer taken — so it satisfies none of them. Answer engines are non-deterministic. The same prompt returns materially different answers between runs, and the rankings below will move. What does not move is which index holds what, and every conclusion in this article is drawn from the cited-source panels rather than from the ordering. That is the only reason it is worth publishing on one sample.",
    },
    {
      kind: "table",
      head: ["Engine", "Outcome"],
      rows: [
        ["ChatGPT", "Led with me. Cited four pages from this site by title, plus LinkedIn"],
        ["Gemini Flash-Lite", "Named me third of three. No source chip on my entry; the other two had one"],
        ["Perplexity", "Held my company domain in its source panel. Reduced me to two words in a closing list"],
        ["Gemini Pro", "Three people, none of them me"],
        ["Claude", "Two people, neither of them me"],
      ],
      caption: "One prompt, one run each, logged out or in a temporary chat, from a phone.",
    },
    {
      kind: "p",
      text: "The spread is the first finding. There is no such thing as \"how AI sees you\" — there are five different systems reading five different indexes, and on the same four words they disagreed about which human being was being asked about.",
    },
    {
      kind: "p",
      text: "The second finding is smaller and more useful: **Gemini Pro did worse than Gemini Flash-Lite.** The larger, more expensive model landed further from the truth. If I had recorded a single row called \"Gemini\" I would have averaged those together and lost the only mid-grade in the run. Grade per model, not per vendor.",
    },

    {
      kind: "h2",
      id: "the-hedge",
      text: "ChatGPT hedged exactly one claim, and it was the one with a single source",
    },
    {
      kind: "p",
      text: "ChatGPT's answer was the good one. It described the work, named the products, got the positioning right. And in the middle of it, one phrase: **\"Claims to have built** systems including a 46-agent autonomous AI fleet and a 47-million-parameter language model.\"",
    },
    {
      kind: "p",
      text: "Claims to have built. Nothing else in the answer was hedged — not the job, not the years of experience, not the location. Only the two things that exist nowhere except on pages I wrote.",
    },
    {
      kind: "p",
      text: "I want to be careful here. This is one observation and I am about to reason from it — consistent with everything else in the run, and nowhere near proof of a mechanism. But it is what a fact looks like when it has exactly one source, and the source is its own subject.",
    },

    {
      kind: "h2",
      id: "retrieved-and-demoted",
      text: "Perplexity had my domain in its sources and still reduced me to two words",
    },
    {
      kind: "p",
      text: "This is the result that changed how I think about the problem, and it took a second look to notice.",
    },
    {
      kind: "p",
      text: "Perplexity's answer led with a company founder who shares the name. Down at the bottom it added that there are also people called Suman Debnath working in power-grid research, mechanical engineering, electric utilities, **and brand marketing**. Four words, no elaboration. That was me.",
    },
    {
      kind: "p",
      text: "But my company's domain was sitting in its cited-source panel, alongside Forbes and a university CV. It had fetched my material. It had read the page that describes what I do. And it chose to spend two words on it, next to a name it had decided mattered more.",
    },

    {
      kind: "h2",
      id: "two-failures",
      text: "Being absent and being demoted are different failures with opposite fixes",
    },
    {
      kind: "p",
      text: "Before this run I had one mental category for a bad result: the engine does not have my material, so give it more material. Submit the sitemap, push the URLs, write another page. That is the right response to Gemini Pro and to Claude, which returned other people because nothing of mine was in front of them.",
    },
    {
      kind: "p",
      text: "It is the wrong response to Perplexity, and it took me an embarrassingly long time to see why. Perplexity had the material. Writing another page adds a document to an index that already holds my documents and had already decided they were the less important ones. **Demotion is not solved by supply.**",
    },
    {
      kind: "p",
      text: "The industry numbers say the same thing from the other end. Across nearly seven thousand checks of real brands, roughly 89% of the sources AI engines cited were earned media rather than owned, and companies with ten or more third-party placements over eighteen months saw citation rates four to seven times higher than companies that had only published their own content. Your own site supplies the facts. Somebody else's page is what makes them count.",
    },

    {
      kind: "h2",
      id: "claude-is-selective",
      text: "Claude cites fewer sources than any other engine, so its silence means less than it felt like",
    },
    {
      kind: "p",
      text: "Claude returning two strangers stung more than the others, and I had it filed as my worst result. The base rates say otherwise. In the same set of checks, brands appeared in 19.8% of Gemini answers, 18.9% of Perplexity's, 14.3% of ChatGPT's — and **8.0% of Claude's.** It is roughly half as likely as anything else to name anybody.",
    },
    {
      kind: "p",
      text: "Which does not make the result good. It makes it ordinary, and there is a difference between a failure that singles you out and a failure half the internet is having simultaneously. Half of all audited brands were invisible on all four platforms. That is the company I am in, and it is bigger than it feels at eleven at night with five screenshots open.",
    },

    {
      kind: "h2",
      id: "thirteen-links",
      text: "Thirteen links point at me and I wrote all thirteen",
    },
    {
      kind: "p",
      text: "The machine-readable identity on this site declares thirteen profiles — the site itself, GitHub, Hugging Face, LinkedIn, three syndication accounts, an ORCID, a speaker profile, a portfolio directory and the rest. Each one is declared three ways over. It is, technically, a complete job.",
    },
    {
      kind: "p",
      text: "Every engine that ranked somebody else first did it off a page that person did not write. A national laboratory's staff directory. Forbes. A conference site. A university CV in PDF. Google Scholar. A radio programme. An author page on a bookshop.",
    },
    {
      kind: "p",
      text: "Thirteen against that, and not one of the thirteen is a third party writing about me. **You cannot corroborate yourself**, and a fourteenth profile would not change the count of independent sources, which is zero.",
    },
    {
      kind: "pullquote",
      text: "You cannot corroborate yourself.",
    },

    {
      kind: "h2",
      id: "namesakes-turf",
      text: "Three of those thirteen sit on domains a namesake already outranks me on",
    },
    {
      kind: "p",
      text: "Then a search-index spot check the same week made it worse, and this is the part I did not expect.",
    },
    {
      kind: "p",
      text: "Four cold queries, thirty-five result slots, this domain absent from all of them. Two directory sites returned on four queries out of four — both for somebody else with my name. And when I looked properly, three of the thirteen profiles I had so carefully declared are on platforms where a namesake already holds the top slot for our shared name. On one of them his account has years on mine.",
    },
    {
      kind: "p",
      text: "A profile on a domain that somebody else already owns the top result for is not an independent source corroborating you. It is a thinner page filed underneath an established one on the same host. It is still worth filling in — an empty profile is worse — but it should be counted for what it is, and I had been counting it as progress.",
    },
    {
      kind: "p",
      text: "So the honest state of it: the on-site half works, and ChatGPT citing four of my pages by title is the proof that it works. The half that decides everything else is other people writing about me, of which there is currently none, and which is the one part of this I cannot do by editing a file.",
    },
  ],

  faqs: [
    {
      q: "What is the difference between being absent from an AI answer and being demoted in one?",
      a: "Absence means the engine does not hold your material, and it is fixed by submission, indexing and links. Demotion means the engine retrieved your page, read it, and ranked it below someone else's. Publishing more pages does not fix demotion — the index already holds your documents and has judged them less important.",
    },
    {
      q: "Is a profile you created yourself a source that corroborates you?",
      a: "No. Every profile you can edit is a self-assertion, however many of them there are and however consistently they agree. Corroboration means a page somebody else wrote and controls — a directory entry, press coverage, a conference listing, a citation. Roughly 89% of sources cited in AI answers are earned rather than owned.",
    },
    {
      q: "Should you trust a single run of an AI answer engine?",
      a: "Not for rankings. Answer engines are non-deterministic and the same prompt returns materially different answers between runs, so a grade from one sample is noise. The cited-source panel is more stable — which index holds which document does not flip between runs — so conclusions drawn from sources survive a single run in a way conclusions drawn from ordering do not.",
    },
  ],

  seeAlso: ["/notebook", "/about", "/projects"],
};

export default post;
