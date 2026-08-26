import type { Post } from "../types";

const post: Post = {
  slug: "do-you-need-an-llms-txt",
  title: "Do you actually need an llms.txt file?",
  answer:
    "Probably not for search visibility. Google has publicly declined to support llms.txt, and reported monitoring of AI crawler traffic through 2026 found direct fetches to be negligible. Where it does get read is agent-side — coding assistants and desktop agents retrieving a domain because a user named it. Worth having if it is generated, not worth maintaining by hand.",
  description:
    "llms.txt is widely recommended and rarely fetched. What the evidence actually shows about who reads it, the one use case where it genuinely matters, and why a hand-written one is worse than none.",
  published: "2026-08-26",
  category: "Marketing & AI",
  // Heavily searched, heavily oversold, and the honest answer is not the one
  // being published. Evergreen is low because adoption could change quickly —
  // the post is dated and says so.
  popularity: {
    searchDemand: 18,
    evergreen: 9,
    painIntensity: 12,
    gapInCoverage: 17,
    shareability: 16,
  },
  popularityScore: 72,
  tags: ["AEO", "SEO", "Marketing"],
  readingMinutes: 6,
  cover: "/notebook/do-you-need-an-llms-txt.webp",
  coverAlt:
    "A sheet pinned to a public noticeboard that a crowd walks past, with one small robot stopped to read it.",
  facts: [
    { label: "Google's position", value: "Publicly stated it does not support llms.txt and is not planning to" },
    { label: "Major providers committing to read it", value: "None publicly, as of August 2026" },
    { label: "Where it is genuinely read", value: "Agent-side fetches — coding assistants, desktop agents" },
    { label: "Cost of doing it well", value: "Low, provided it is generated rather than written by hand" },
  ],

  blocks: [
    {
      kind: "p",
      text: "This site has an llms.txt. I would still tell you that most of what is written about llms.txt is wrong, and that the reason to have one is not the reason usually given.",
    },
    {
      kind: "p",
      text: "The pitch is that it is a ranking or visibility file — publish one and the models will read it and cite you. There is very little supporting that, and a reasonable amount contradicting it.",
    },

    { kind: "h2", id: "the-evidence", text: "What the evidence actually shows" },
    {
      kind: "p",
      text: "Three things, all of which are publicly reported rather than measured by me:",
    },
    {
      kind: "ul",
      items: [
        "**Google has said it does not support llms.txt and is not planning to**, with the comparison drawn to the old keywords meta tag — a file publishers maintain and search engines ignore.",
        "**No major provider has publicly committed to reading it in production.** Not OpenAI, not Anthropic, not Google, not Meta.",
        "**Reported monitoring of AI crawler traffic through 2026 found direct fetches negligible** — a tiny number of requests against hundreds of millions of AI bot visits. The training crawlers essentially do not ask for it.",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Watch how this is usually cited",
      text: "You will see \"Anthropic, Vercel, Cloudflare and Stripe all publish one\" offered as proof that it works. It is proof that documentation-heavy companies publish one, which is a different claim. Several of them ship it for their own IDE and agent integrations rather than as a search play. Adoption by publishers says nothing about consumption by engines.",
    },

    { kind: "h2", id: "where-it-works", text: "Where it genuinely does get read" },
    {
      kind: "p",
      text: "There is a real use case and it is more interesting than the one being sold.",
    },
    {
      kind: "p",
      text: "The distinction that matters is between a **crawler** and a **fetcher**. A crawler gathers pages at scale for an index or a training set, and largely ignores llms.txt. A fetcher retrieves a specific URL right now because a user just referred to it — you paste a domain into a coding assistant, or ask a desktop agent about a product, and something goes and looks.",
    },
    {
      kind: "p",
      text: "Those on-demand agents do read it. Coding assistants and agent frameworks will pick it up when a user names a domain, which makes llms.txt an **agent-to-agent convenience file** rather than a search asset. If somebody points an assistant at your site and asks what you do, a good llms.txt is the difference between a confident answer and a guess assembled from your navigation.",
    },
    {
      kind: "p",
      text: "That is a smaller audience than the pitch implies. It is also a higher-intent one, because somebody had to name you for it to happen at all.",
    },

    { kind: "h2", id: "should-you", text: "So should you write one?" },
    {
      kind: "p",
      text: "Yes, if it costs you almost nothing. No, if it becomes a thing you maintain.",
    },
    {
      kind: "p",
      text: "That distinction is the whole recommendation, and it is not the usual advice, so it is worth being specific about why.",
    },

    { kind: "h2", id: "generate-it", text: "Generate it. Do not write it." },
    {
      kind: "p",
      text: "Mine was a static file for a while and I can tell you exactly what happened to it, because it is the standard outcome and it took about two months.",
    },
    {
      kind: "p",
      text: "It drifted. It described one of my pages as something that page had never been — the description had been true of a different section that was later renamed. It omitted an entire route that had shipped after the file was written. And it carried two different \"last updated\" dates in the same document, which is a nice summary of what a hand-maintained file becomes.",
    },
    {
      kind: "p",
      text: "Every one of those is the same failure: **a summary of the site, maintained separately from the site.** So it is now generated from the same data that renders the pages — the page registry, the project list, the article index. A page that exists is described. A page that does not cannot be. Neither state depends on anyone remembering.",
    },
    {
      kind: "quote",
      text: "A hand-written llms.txt is worse than no llms.txt, because a confidently wrong summary is exactly what a fetcher will believe.",
    },
    {
      kind: "p",
      text: "One thing I deliberately left out: a build-stamped date. It would advance on every deploy and claim freshness the content does not have, and freshness is one of the few things an engine actually weighs. It reads the real dates of the real content instead.",
    },

    { kind: "h2", id: "measuring", text: "How to find out whether anything reads yours" },
    {
      kind: "p",
      text: "Check your server logs, not your analytics — an analytics script never runs for a client that does not execute JavaScript, which is the entire population you are asking about.",
    },
    {
      kind: "p",
      text: "There is a trap here I walked into on this site. My crawler logging is wired into the request layer, and its matcher excludes any path ending in a file extension — a sensible rule that keeps it off fonts, images and scripts. `llms.txt` ends in an extension. So the one file I most wanted visit data for was the one file my own instrumentation was configured to ignore, and I had no data at all rather than zero visits, which are very different results.",
    },

    { kind: "h2", id: "the-real-point", text: "What it does not substitute for" },
    {
      kind: "p",
      text: "The failure mode I would most want to warn against is treating llms.txt as the AI-readiness task, ticking it, and stopping. It is the cheapest item on the list and close to the least important.",
    },
    {
      kind: "p",
      text: "If your actual pages are readable without JavaScript, your structured data is in the served HTML, your headings describe what follows and your answers are self-contained, you are in good shape whether or not you publish an llms.txt. If none of that is true, the file will not rescue you — the fetcher that reads it will then go and read a page it cannot parse.",
    },
    {
      kind: "p",
      text: "Publish one. Generate it. Spend the remaining effort on the pages.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Dated on purpose",
      text: "This is written in August 2026 and every claim above is about the state of things now. Adoption could change quickly and one major provider committing to read the file would change the recommendation. If you are reading this much later, check the current position rather than trusting the paragraph.",
    },
  ],

  faqs: [
    {
      q: "Does Google use llms.txt?",
      a: "No. Google has publicly stated that it does not support llms.txt and has no plans to, with the comparison drawn to the keywords meta tag — a file publishers maintained and search engines ignored. Publishing one has no documented effect on Google Search or on AI Overviews.",
    },
    {
      q: "Do AI crawlers actually read llms.txt?",
      a: "Training and indexing crawlers largely do not — reported monitoring of AI bot traffic through 2026 found direct fetches negligible relative to overall crawl volume. On-demand agents are different: coding assistants and desktop agents that fetch a domain because a user referred to it do read it, which is a smaller but higher-intent audience.",
    },
    {
      q: "Should you write an llms.txt file by hand?",
      a: "No. A hand-written summary drifts from the site it describes — typically within months it names pages that were renamed, omits routes added later, and carries contradictory dates. Because a fetcher will believe a confidently wrong summary, a stale file is worse than none. Generate it from the same data that renders the pages.",
    },
  ],

  seeAlso: ["/notebook", "/about", "/projects"],
};

export default post;
