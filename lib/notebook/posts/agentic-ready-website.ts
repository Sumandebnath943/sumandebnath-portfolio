import type { Post } from "../types";

const post: Post = {
  slug: "agentic-ready-website",
  title:
    "Agentic-ready: the four things an agent has to be able to do",
  answer:
    "Four questions decide it: can an agent find the site, fetch it, read it without executing JavaScript, and recover when it hits a URL that does not exist. Most sites fail on the third for a dull reason — the content or the structured data only exists after the client bundle runs, and many fetchers never run it.",
  description:
    "Can an agent find you, fetch you, read you without JavaScript, and recover from a dead URL? Most sites fail the third, for a dull reason. Six commands to check.",
  metaTitle: "What is an agentic-ready website? Four checks",
  keywords: ["agentic ready website", "AI agent readiness", "make website AI readable", "agentic SEO"],
  published: "2026-08-26",
  category: "Marketing & AI",
  // Rising demand as the term enters marketing vocabulary, and almost nothing
  // written that defines it concretely rather than as a vibe.
  popularity: {
    searchDemand: 15,
    evergreen: 13,
    painIntensity: 15,
    gapInCoverage: 18,
    shareability: 15,
  },
  popularityScore: 76,
  tags: ["AEO", "Structured Data", "Marketing"],
  readingMinutes: 8,
  cover: "/notebook/agentic-ready-website.webp",
  coverAlt:
    "A tall door with four bolts, three drawn open and one still shut, with a small robot waiting in front of it.",
  facts: [
    { label: "The four questions", value: "Can it be found, fetched, read, and recovered from" },
    { label: "Most common failure", value: "Content or schema that exists only after JavaScript runs" },
    { label: "Second most common", value: "Returning HTTP 200 for URLs that do not exist" },
    { label: "This site's audit score", value: "83 out of 100, not 100 — deliberately" },
  ],

  blocks: [
    {
      kind: "p",
      text: "\"Agentic-ready\" is well on its way to becoming a term that means whatever the person selling it needs it to mean. It does have a concrete definition, though, and it is not complicated: it is whether a program with no eyes, no patience and no JavaScript can accomplish anything on your site.",
    },
    {
      kind: "p",
      text: "That resolves into four questions, in order. Failing an early one makes the later ones irrelevant.",
    },

    { kind: "h2", id: "find", text: "1. Can it find you?" },
    {
      kind: "p",
      text: "The least interesting layer and the one most sites already pass. A sitemap listing every real URL with an honest last-modified date, a robots file that permits the agents you want, and internal links that make the site traversable rather than a set of islands.",
    },
    {
      kind: "p",
      text: "One thing worth knowing: **AI crawlers and AI fetchers are different agents obeying different rules.** The crawler that gathers training data and the fetcher that retrieves a page because somebody asked an assistant about it are separate user agents, and permitting one does nothing for the other. If your robots file names only the famous one, you may be excluding the agent that actually matters — the one arriving because a real person asked a real question about you.",
    },

    { kind: "h2", id: "fetch", text: "2. Can it fetch you?" },
    {
      kind: "p",
      text: "Does a plain request get a useful response — no interstitial, no consent wall in front of the content, no bot challenge, no redirect chain, correct status codes.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Returning 200 for pages that do not exist",
      text: "Single-page applications frequently answer every URL with the app shell and a 200, because routing happens in the browser. To an agent this means every path it invents appears to exist, and it has no way to distinguish a real page from a typo. A nonexistent path must return a genuine 404. This is trivial to verify and very commonly wrong.",
    },
    {
      kind: "code",
      lang: "bash",
      caption: "Should print 404. If it prints 200, this is your first job.",
      code: `curl -s -o /dev/null -w "%{http_code}" https://example.com/a-path-that-does-not-exist`,
    },

    { kind: "h2", id: "read", text: "3. Can it read you without running JavaScript?" },
    {
      kind: "p",
      text: "This is where most sites fail, and where I failed, on the site you are reading.",
    },
    {
      kind: "p",
      text: "Many agents do not execute JavaScript. They request the URL, take the HTML, and work with what came back. If your content is assembled client-side, they receive an empty shell. The check takes one command and it is the highest-value thing in this article:",
    },
    {
      kind: "code",
      lang: "bash",
      caption: "If the words you expect are not in this output, an agent cannot see them.",
      code: `curl -s https://example.com/ | grep -c "a distinctive phrase from your page"`,
    },
    {
      kind: "p",
      text: "My own version of this failure was narrower and more embarrassing, because I work in digital marketing. My pages were server-rendered and fine. My **structured data** was not: the identity block describing who this site is about was being injected by the client bundle rather than printed into the HTML. An audit judged the site on the one schema block it could actually see and reported the identity as missing — correctly, from where it was standing.",
    },
    {
      kind: "p",
      text: "What \"readable\" means beyond merely being present:",
    },
    {
      kind: "ul",
      items: [
        "Structured data as literal script tags in the served HTML, not assembled after hydration.",
        "Headings that describe what follows, so the document has a real outline rather than styled text.",
        "Self-contained answer blocks, because a passage that depends on the paragraph above it cannot be lifted.",
        "Specifics in tables and definition lists rather than buried in prose.",
        "A machine-readable summary of the site, which costs little to provide.",
      ],
    },

    { kind: "h2", id: "recover", text: "4. Can it recover when it goes wrong?" },
    {
      kind: "p",
      text: "The layer nobody thinks about. An agent will guess URLs, follow a stale link, or construct a path that seemed reasonable. When it lands somewhere that does not exist, what does it get?",
    },
    {
      kind: "p",
      text: "A correct status code is the first half. The second half is giving it somewhere to go — a pointer to the sitemap, to the machine-readable summary, to whatever your index is. A 404 that only apologises is a dead end for something that cannot browse its way out.",
    },
    {
      kind: "p",
      text: "This site's error page carries that pointer. Fitting it in was mildly annoying, because that page is a single non-scrolling screen with almost no room left, and the honest solution turned out to be showing the line only where there is space for it while keeping it in the response at every size. The markup is what a fetcher reads; the layout is what a person sees. Those are allowed to differ.",
    },

    { kind: "h2", id: "the-score", text: "What an actual audit found" },
    {
      kind: "p",
      text: "I ran this site through a public agent-readiness audit. It scored 79, then 83 after I fixed the structured data and added the recovery pointer. It is not at 100 and I do not intend to take it there, which is the part I want to be straight about.",
    },
    {
      kind: "p",
      text: "Two of the remaining items were declined on purpose. The largest asks for content negotiation — serving a markdown version of every page to clients that request it — and implementing that properly means generating a markdown twin of every page, plus a caching header that fragments the CDN cache and costs real visitors speed. I could not find evidence that any major AI crawler currently negotiates for markdown, and I was not willing to pay a measurable performance cost for an unmeasured benefit.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "A score is a proxy, not a goal",
      text: "The audit was worth running for exactly one thing: it found a real defect I had looked at many times and not seen. That was worth the whole exercise. The remaining points are a different question — whether a specific change is worth its cost — and an audit cannot answer that, because it does not know what your site is for.",
    },

    { kind: "h2", id: "checklist", text: "The version to actually check" },
    {
      kind: "ol",
      items: [
        "A nonexistent path returns 404, not 200.",
        "Your main content appears in `curl` output, not only in the browser.",
        "Your structured data appears in `curl` output too — check separately, it fails independently.",
        "Your robots file names AI fetchers, not just AI crawlers.",
        "Your sitemap carries real last-modified dates rather than one repeated constant.",
        "Your 404 page points somewhere machine-readable.",
      ],
    },
    {
      kind: "p",
      text: "Six commands, most of a morning. That covers the large majority of what agentic readiness actually means, and it is considerably less exotic than the phrase suggests.",
    },
  ],

  faqs: [
    {
      q: "What makes a website agentic-ready?",
      a: "Four capabilities in order: an agent can discover the site through a sitemap and permissive robots rules, fetch it without hitting walls or wrong status codes, read its content and structured data without executing JavaScript, and recover from a nonexistent URL because the 404 points at a machine-readable index.",
    },
    {
      q: "Why does returning HTTP 200 for missing pages break AI agents?",
      a: "Because it removes the agent's only signal that a URL is invalid. Single-page applications often answer every path with the app shell and a 200, so any path an agent guesses appears to exist. Without a genuine 404 it cannot distinguish a real page from a typo and may treat invented URLs as valid.",
    },
    {
      q: "Do AI crawlers execute JavaScript?",
      a: "Many do not. A substantial share of AI fetchers request the URL and work with the HTML returned, so client-assembled content and structured data injected after hydration are invisible to them. Whether content is present can be checked directly by fetching the page with curl and looking for the expected text.",
    },
  ],

  seeAlso: ["/notebook", "/about", "/projects"],
};

export default post;
