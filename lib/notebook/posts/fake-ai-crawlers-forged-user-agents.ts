import type { Post } from "../types";

const post: Post = {
  slug: "fake-ai-crawlers-forged-user-agents",
  title: "Two crawlers wore OpenAI's name and asked for my .env file",
  answer:
    "On 1 September 2026 two requests carrying OpenAI's ChatGPT-User agent asked this site for /.env.sample and /.git/HEAD, arriving from Cloudflare addresses while every range OpenAI publishes for that agent is Azure. Checking a crawler's claimed identity against its vendor's own published IP list is what catches this.",
  description:
    "Two requests faked OpenAI's crawler to probe for secrets. How to check an AI crawler by IP, and the two traps that turn the check into a false accusation.",
  metaTitle: "Fake AI crawlers: two forged ChatGPT-User requests",
  // Retargeted 11 Sep 2026 after a SERP check, which is the step that should
  // have come first. "verify AI crawler by IP" is owned by Search Engine
  // Journal, HAProxy, GeoIPHub and three free tools — a how-to here loses to
  // all of them. What nobody has written is the incident and the two traps, so
  // the primary phrase names the incident and the rest go long-tail on the
  // findings, where the competing page count is close to zero.
  keywords: [
    "forged ChatGPT-User requests",
    "spoofed AI crawler inflates AEO metrics",
    "Anthropic ClaudeBot published IP ranges IPv6",
    "fake AI crawler probing for .env",
  ],
  published: "2026-09-11",
  category: "Marketing & AI",
  // gapInCoverage was 16 until a SERP check on 11 Sep 2026 corrected it to 11.
  // The how-to half of this topic is thoroughly covered — Search Engine Journal,
  // HAProxy, GeoIPHub, LumenGEO and three free bot-verifier tools all rank for
  // it, and several go further than this article does by covering FCrDNS and
  // Web Bot Auth. What is genuinely uncovered is narrower: that a forged crawler
  // corrupts an AEO measurement rather than only a security posture, and that
  // Anthropic's list is IPv4-only in a way that turns a naive verifier into an
  // accuser. Eleven reflects the narrow gap, not the broad topic.
  popularity: {
    searchDemand: 13,
    evergreen: 13,
    painIntensity: 15,
    gapInCoverage: 11,
    shareability: 14,
  },
  popularityScore: 66,
  tags: ["AEO", "Security", "Marketing"],
  readingMinutes: 7,
  cover: "/notebook/fake-ai-crawlers-forged-user-agents.webp",
  coverAlt:
    "Two hooded robot figures with glowing logos where their faces should be, leaning in from either side of a laptop in a dark room. The laptop shows a log table of two requests for /.env.sample and /.git/HEAD arriving from Cloudflare addresses, both claiming the ChatGPT-User agent, and each robot holds a card naming one of the two paths.",
  facts: [
    { label: "Date", value: "1 September 2026" },
    { label: "Claimed agent", value: "ChatGPT-User" },
    { label: "Source addresses", value: "104.23.175.224, 162.159.98.239 — both Cloudflare" },
    { label: "Paths requested", value: "/.env.sample, /.git/HEAD — both 404" },
    { label: "OpenAI's published ranges", value: "204 prefixes, all Azure" },
    { label: "Crawler visits recorded to date", value: "7,214" },
    { label: "Naming no product", value: "530 unidentified, 17 with no user agent" },
    { label: "Vendors publishing a checkable list", value: "Five" },
  ],

  blocks: [
    {
      kind: "p",
      text: "This site has recorded 7,214 crawler visits. Of those, 530 arrived with a user agent that says it is automation but names no product, and 17 arrived with no user agent at all. The other 6,667 all named themselves, and naming yourself costs nothing.",
    },
    {
      kind: "p",
      text: "On 1 September two of them named themselves OpenAI.",
    },

    {
      kind: "h2",
      id: "the-two-requests",
      text: "Two requests wore OpenAI's user agent and came from the wrong cloud",
    },
    {
      kind: "p",
      text: "They carried the exact `ChatGPT-User` string OpenAI publishes, and they asked for `/.env.sample` and `/.git/HEAD`. Both returned 404 — nothing was exposed, and `.env*` has never been committed to this repository. But the alerts reported both of them as \"OpenAI · ChatGPT live fetch\", which is what the user agent said and what nothing else had checked.",
    },
    {
      kind: "p",
      text: "They came from **104.23.175.224** and **162.159.98.239**. Both are Cloudflare. Every one of the 204 prefixes OpenAI publishes for that agent is Azure. The two facts do not sit together, and the only reason I know that is that OpenAI publishes the list at all.",
    },
    {
      kind: "p",
      text: "There is a real objection to that, and it is worth putting before the argument rather than after it. `ChatGPT-User` is a **user-directed fetcher** — it fires when somebody asks the assistant to open a specific URL, rather than on a crawl schedule. Fetches of that kind can legitimately arrive from general cloud infrastructure outside the published ranges, which means an address outside the list is not on its own proof of anything.",
    },
    {
      kind: "p",
      text: "What settles it here is the second half. Nobody asked an assistant to open `/.git/HEAD` on a personal portfolio. The pair of requests only makes sense as a scan, and the user agent was chosen because it gets waved past filters that stop `curl`. Take the paths away and I would have had a suspicious address and no conclusion.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "This is a base rate, not a coincidence",
      text: "HUMAN Security measured 5.7% of traffic labelled as a well-known AI crawler to be fake, rising to near one in six for the ChatGPT-User agent specifically — and more than a third of the ones that could be checked did not come from the company they named. What those visits went looking for was API keys and config files. Applied to 7,214 visits that rate would suggest a few hundred fakes here. I have confirmed two. The gap between those numbers is the point of this article.",
    },

    {
      kind: "h2",
      id: "the-measurement-problem",
      text: "A forged crawler corrupts the one number the dashboard exists to produce",
    },
    {
      kind: "p",
      text: "The obvious reading of this is a security one, and it is the reading everybody writes. Somebody probed for secrets, the probe failed, move on.",
    },
    {
      kind: "p",
      text: "The reading that cost me more is different, and it arrived late: I did not build the crawler feed to catch intruders at all. I built it to answer one question. Are answer engines reading this site? That number is the entire point of the [answer-engine work](/notebook) — it is how you tell being crawled from being ignored, months before anything shows up in an answer.",
    },
    {
      kind: "p",
      text: "A forger inflates exactly that number. Two visits reported as ChatGPT live fetches are two visits of evidence that OpenAI is paying attention, and they were nothing of the kind. Whoever sent them was not trying to corrupt my measurement — they wanted my environment file. The corruption was free.",
    },
    {
      kind: "p",
      text: "Which means the metric that flatters you is the one to check first, and a crawler log with no verification in it is a list of things clients said about themselves.",
    },
    {
      kind: "pullquote",
      text: "Whoever sent them was not trying to corrupt my measurement — they wanted my environment file. The corruption was free.",
    },

    {
      kind: "h2",
      id: "who-publishes-a-list",
      text: "Only five of the crawlers hitting this site can be checked at all",
    },
    {
      kind: "p",
      text: "Verification works by asking the vendor. OpenAI, Google, Microsoft, Perplexity and Anthropic each publish a machine-readable file of the IP ranges their crawlers use. You take the client address, and you ask whether it falls inside one of the prefixes in that vendor's file.",
    },
    {
      kind: "p",
      text: "Those five are the ones my verifier reads, which is not the same as the ones that exist — Apple, DuckDuckGo and Common Crawl publish lists too, and mine does not fetch them. So that count describes my code, not the field.",
    },
    {
      kind: "table",
      head: ["Vendor", "Published at"],
      rows: [
        ["OpenAI", "openai.com/gptbot.json, searchbot.json, chatgpt-user.json"],
        ["Google", "developers.google.com/search/apis/ipranges/"],
        ["Microsoft", "bing.com/toolbox/bingbot.json"],
        ["Perplexity", "perplexity.com/perplexitybot.json, perplexity-user.json"],
        ["Anthropic", "claude.com/crawling/bots.json"],
      ],
      caption: "The five this site checks. Apple, DuckDuckGo and Common Crawl publish lists it does not read.",
    },
    {
      kind: "p",
      text: "Five vendors against 7,214 visits is the honest shape of this: verification is not a filter you apply to your traffic but a check available on a small, named minority of it, and the correct answer for everything else is that you do not know.",
    },
    {
      kind: "p",
      text: "An IP check is also the weakest of the three methods that exist, and I should say so. **Forward-confirmed reverse DNS** resolves the address to a hostname, checks the hostname belongs to the vendor's domain, then resolves that hostname forward again to confirm it lands back on the same address — the forward step is what defeats a forged PTR record. **Web Bot Auth** goes further and has the crawler sign each request with an Ed25519 key, which needs no IP list at all. Mine does neither. It reads a JSON file and compares prefixes, which catches an opportunistic scanner and would not trouble anybody serious.",
    },

    {
      kind: "h2",
      id: "the-asymmetry",
      text: "A wrong \"forged\" costs more than a wrong \"verified\"",
    },
    {
      kind: "p",
      text: "The check has three possible answers, not two: verified, forged, and unverified. Getting the third one right is most of the work.",
    },
    {
      kind: "p",
      text: "\"Forged\" is an accusation. It should only ever be made from a list that actually loaded and actually parsed. A network failure, an empty prefix array, a vendor that publishes nothing, a missing or unparseable client IP — every one of those has to come back \"unverified\".",
    },
    {
      kind: "p",
      text: "The asymmetry is deliberate and it is worth stating as a rule. A wrong \"verified\" costs one missed scanner. A wrong \"forged\" teaches you to distrust the alerts, and once you distrust them you stop reading them, which costs the whole feature. So the failure modes are not symmetrical and the code should not treat them as though they were.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The soft-404 trap",
      text: "A vendor list that answers HTTP 200 with an HTML error page is not a list. A parser that shrugs at non-JSON and carries on with zero prefixes will brand every genuine crawler from that vendor a forgery — quietly, and at scale. Check that the body does not start with a `<` before you parse it.",
    },

    {
      kind: "h2",
      id: "the-list-i-said-did-not-exist",
      text: "Anthropic had published its list three weeks before I looked",
    },
    {
      kind: "p",
      text: "I wrote the verifier on 1 September and put a comment in it saying Anthropic published no such list, so Claude-User, Claude-SearchBot and ClaudeBot would always come back unverified. I had tried `claudebot.json`, `claude-user.json` and `ips.json` on `anthropic.com` — all 404 — and a path on `docs.claude.com` that answers 200 with HTML.",
    },
    {
      kind: "p",
      text: "The list is at **`claude.com/crawling/bots.json`**. Its `creationTime` reads 18 August 2026 — two weeks before I sat down and concluded it did not exist, and every Claude visit in the three weeks after that was filed unverifiable on the strength of one comment I never went back to.",
    },
    {
      kind: "p",
      text: "Four addresses I made up returned 404, and I turned that into a claim about what a company publishes. **A 404 on a path you invented is not evidence that a vendor publishes nothing.** It is evidence that you guessed four times and missed.",
    },

    {
      kind: "h2",
      id: "the-ipv6-trap",
      text: "Anthropic publishes no IPv6 ranges, so a real Claude fetch can look forged",
    },
    {
      kind: "p",
      text: "Wiring the list in is where the second trap is, and it is the one that would have done real damage. Anthropic's file carries 26 prefixes and every one of them is IPv4. There is not a single `ipv6Prefix` entry in it.",
    },
    {
      kind: "p",
      text: "A correct matcher refuses to compare a v4 address against a v6 prefix — otherwise a v4 address falls inside a wide v6 range by accident, because 32-bit values sit at the bottom of the 128-bit space. So a genuine Claude fetch arriving over IPv6 matches nothing in Anthropic's file, falls past the end of the loop, and reaches whatever the function returns last.",
    },
    {
      kind: "p",
      text: "In mine, what it returned last was `forged`. Hosting hands over IPv6 for a growing share of clients, so the naive version of this feature would have started accusing Anthropic of impersonating itself — silently, and with a confident label on the alert.",
    },
    {
      kind: "p",
      text: "The fix is a guard before the matching loop: if none of the vendor's loaded lists holds a single prefix of the client address's family, return unverified with the reason, and never reach the accusation. It is four lines, it is not specific to Anthropic, and any single-family vendor list has the same hole waiting in it.",
    },
    {
      kind: "p",
      text: "Both traps have the same shape, which is why they are worth ending on. Neither one produces an error. A soft-404 parses to zero prefixes and every crawler becomes a liar; a missing address family matches nothing and the honest one becomes a liar. In each case the dashboard keeps working, the alerts keep arriving, and the labels on them are wrong.",
    },
  ],

  faqs: [
    {
      q: "Can a scraper fake the ChatGPT-User user agent?",
      a: "Yes. A user agent is a string the client chooses, so it costs nothing to type OpenAI's exact ChatGPT-User value, and it is worth typing because a well-behaved answer-engine agent gets waved past filters that would stop curl. HUMAN Security measured near one in six requests carrying that agent to be fake.",
    },
    {
      q: "How do you check whether an AI crawler is genuine?",
      a: "Compare the client IP against the vendor's own published list of crawler ranges — OpenAI, Google, Microsoft, Perplexity and Anthropic each publish one as JSON. If the address falls inside a published prefix the claim holds. If the list could not be loaded or parsed, the answer is unverified, not forged.",
    },
    {
      q: "Does Anthropic publish IP ranges for ClaudeBot?",
      a: "Yes, at claude.com/crawling/bots.json, covering ClaudeBot, Claude-User and Claude-SearchBot. As of September 2026 it holds 26 prefixes and all of them are IPv4 — there are no IPv6 entries, so a verifier must treat a Claude fetch arriving over IPv6 as unverifiable rather than forged.",
    },
  ],

  seeAlso: ["/notebook", "/about", "/projects"],
};

export default post;
