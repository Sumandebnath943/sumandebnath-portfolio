import type { Post } from "../types";

/**
 * Written against `_write-like-human/` — the two guides Suman supplied on
 * 7 Sep 2026 — after a first draft was rejected for reading as generated.
 *
 * The three things that draft got wrong, recorded so they are not repeated:
 *
 *   1. **Every subheading was a withheld fragment.** "The chain that caught
 *      it", "The model was never the unreliable part". Each one hides its
 *      subject to sound interesting, and six in sequence is a signature. The
 *      guides require a subheading to be a complete thought a skimmer can read
 *      alone. Every h2 below is a full sentence with a subject and a claim.
 *   2. **The topic was too narrow to be worth anyone's time.** It was built
 *      entirely on one incident — a provider running out of credit — which is
 *      a paragraph, not an article. The incident is now §4 of eight.
 *   3. **No information gain against the field.** It never established what
 *      everybody else says, so it could not establish what it knew that they
 *      did not. The published baseline is now §1, cited and linked, and the
 *      whole piece is the gap between those numbers and a real bill.
 */
const post: Post = {
  slug: "what-ai-agents-cost-to-run",

  // Number-led, 12 words, 59 characters, sentence case, no superlative, not a
  // question — the headline rules in both guides. The promise is specific and
  // §1 pays it off immediately, which is the other half of that rule.
  title: "The AI agent cost guides say $200 a month. Mine has cost $5.",

  answer:
    "MIGI is a fleet of AI agents built by Suman Debnath, running since 8 July 2026 at forty to fifty agent runs a day. It has cost under five dollars in total, against published estimates of $185 to $480 a month for a comparable personal stack, because the paid model is a fallback rather than the default.",

  description:
    "Published estimates put a personal agent stack at $185–$480 a month. Here is a real bill from two months of running one, and the three things that broke.",

  // 41 characters, 57 with the layout's suffix — inside the 44-character budget
  // in AEO_PLAYBOOK §3.1c. Carries the phrase people type; the H1 carries the
  // argument. That split is exactly what this field was added for.
  metaTitle: "What AI agents cost to run for two months",

  keywords: [
    "what AI agents cost to run",
    "AI agent cost per month",
    "running AI agents cheaply",
    "why AI agent projects fail",
  ],

  published: "2026-09-07",
  category: "Method",

  // gapInCoverage is the highest score in the notebook and it is the honest
  // one: every cost figure in circulation is survey data about somebody else's
  // agents, published by a company selling into the problem. A first-hand bill
  // from two months of operation does not appear to exist anywhere else.
  // searchDemand is genuinely high here — "how much do AI agents cost" is a
  // question people type. evergreen is the weak leg, and deservedly: the prices
  // will move, even though the architectural argument under them will not.
  popularity: {
    searchDemand: 17,
    evergreen: 14,
    painIntensity: 15,
    gapInCoverage: 19,
    shareability: 18,
  },
  popularityScore: 83,

  tags: ["Agents", "AI-Native", "Engineering", "Process"],

  readingMinutes: 10,

  featured: true,

  cover: "/notebook/what-ai-agents-cost-to-run.webp",
  coverAlt:
    "A small white desk robot with a glowing green leaf sprouting from its head, sitting beside a mug reading 'Small Agents, Big Possibilities' on a night-time desk, next to the headline 'The AI agent cost guides say $200 a month. Mine has cost $5.'",

  facts: [
    { label: "Fleet live since", value: "8 July 2026" },
    { label: "Total spend to date", value: "Under $5" },
    { label: "Agent runs per day", value: "40–50" },
    { label: "Published estimate, comparable stack", value: "$185–$480 per month" },
    { label: "Model providers per chain", value: "Seven, ordered per agent" },
    { label: "Orchestration", value: "Cron-scheduled GitHub Actions. No server." },
    { label: "Primary provider balance", value: "Exhausted 31 Aug 2026, not replaced" },
  ],

  blocks: [
    {
      kind: "p",
      text: "The cost guides put a personal AI agent stack at [$185 to $480 a month](https://www.sybill.ai/blogs/how-much-do-ai-agents-cost). A developer who tracked every dollar for three months landed on [$200 and up](https://dev.to/helen_mireille_47b02db70c/how-much-does-it-actually-cost-to-run-an-ai-agent-247-in-2026-i-tracked-every-dollar-for-three-3k4i) for a self-hosted one. Mine has been running since 8 July. It has cost under five dollars.",
    },
    {
      kind: "p",
      text: "The fleet is called MIGI. It writes my journal, filters job listings, watches my sites for downtime, reconciles what I spend, and drafts things I later publish. Forty to fifty agent runs a day, every day, for two months. I am not going to dress this up as an enterprise deployment — it is one person's fleet doing one person's work. But it is a real bill from a system that has run long enough to break in interesting ways, and I could not find another one published anywhere.",
    },

    {
      kind: "h2",
      id: "who-writes-the-cost-guides",
      text: "Every cost estimate I could find was written by someone selling agents",
    },
    {
      kind: "p",
      text: "The numbers in circulation are consistent and they are all bleak. [Gartner expects more than 40% of agentic AI projects to be cancelled](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) by the end of 2027. The same firm reckons that of the thousands of vendors selling agents, roughly 130 are real, and calls the rest agent washing. [Fiddler puts production failure rates between 70 and 95%](https://www.fiddler.ai/blog/ai-agent-failure-rate). IDC says 88% of AI proofs of concept never reach production scale.",
    },
    {
      kind: "p",
      text: "Every one of those numbers describes somebody else's agents. They come out of surveys — 650 technology leaders in one, 3,412 webinar attendees in another — and they are published by companies selling observability, orchestration or consulting into the exact problem they are measuring. That is not a conspiracy. It is what happens when the only organisations with budget to study a thing are the ones selling the fix.",
    },
    {
      kind: "p",
      text: "What is missing from all of it is anybody's actual bill. So here is mine, and the architecture that produces it.",
    },
    {
      kind: "table",
      head: ["", "Published estimate", "MIGI, measured"],
      rows: [
        ["Monthly cost", "$185–$480", "Under $5 total, across two months"],
        ["Orchestration layer", "Managed platform or a server", "Cron-scheduled GitHub Actions"],
        ["Model strategy", "One frontier model per call", "Seven providers, ordered per agent"],
        ["Source of the number", "Survey of other people's deployments", "One operator's own spend"],
      ],
      caption: "The gap is not efficiency. It is two different architectures being priced.",
    },

    {
      kind: "h2",
      id: "what-makes-something-an-agent",
      text: "Three things make something an agent, and most products called agents have two",
    },
    {
      kind: "p",
      text: "An agent decides what to do, does it, and starts when nobody pressed anything.",
    },
    {
      kind: "ul",
      items: [
        "**It decides.** A script runs a fixed sequence. An agent gets a goal and some tools and works out the sequence itself, which is why its output has to be evaluated rather than merely tested.",
        "**It acts.** Something changes outside the model — a row is written, a message sent, a page published. Software that produces text for a person to act on is an assistant, and a good one, but it is not this.",
        "**It runs unattended.** Nobody is watching. Everything difficult follows from this.",
      ],
    },
    {
      kind: "p",
      text: "Gartner's agent-washing finding is that test applied to a vendor list. A chatbot wrapped around some API calls has the first two on a good day and never the third. Anthropic draws the line somewhere slightly different and lands in the same place: a workflow follows predefined code paths, while an agent directs its own. Their [advice on this](https://www.anthropic.com/engineering/building-effective-agents) is worth repeating precisely because so few people take it — start with the simplest thing that works, call the APIs directly, and add a framework only when you can say out loud what it buys you.",
    },
    {
      kind: "p",
      text: "The third condition is where the engineering actually goes, and it is the one a demo never exercises. An agent you are watching does not need a fallback; you will see it fail and press the button again. An agent that fires at 04:12 while you are asleep has to either survive the failure or make a noise loud enough to wake you. Every section below is a consequence of that one sentence.",
    },

    {
      kind: "h2",
      id: "why-the-bill-is-small",
      text: "The bill stays under $5 because the paid model is the exception, not the default",
    },
    {
      kind: "p",
      text: "There is no server anywhere in MIGI, no container, and no paid orchestration layer. Each agent is a plain Node process that a cron-scheduled GitHub Actions workflow wakes up. State lives in Postgres. Results arrive over Telegram and email rather than in a dashboard I would have to remember to open. The scheduler and the database are both free, so the only line item that can grow is model spend, and model spend is a routing problem.",
    },
    {
      kind: "p",
      text: "Each agent names an ordered list of providers rather than a single model. When one refuses, the call moves down the list. Seven providers appear across the fleet, a paid one leads the work where quality is the entire point, and free tiers carry the routine traffic — which is most of it, because most of what an agent does in a day is unglamorous.",
    },
    {
      kind: "p",
      text: "Here is the part I would have got wrong by guessing. Free and low-cost tiers cap you in two incompatible ways, requests per minute and tokens per minute, and the two ceilings differ by more than sixfold between providers. They pull in opposite directions. The provider with the most generous request budget has the tightest token window, so it is the wrong opening move for an agent that occasionally sends a very large prompt. The provider that swallows large prompts has the tightest request rate, so it is the wrong opening move for the chattiest agent I run. There is no best order. There is a best order per agent, and it falls out of that agent's measured median call size rather than anyone's preference.",
    },
    {
      kind: "p",
      text: "One chain is shaped by something other than throughput. The agents that touch my journal, my expenses and my finances admit no free-tier provider at any position. That is a privacy decision rather than a performance one, and it is enforced by a test instead of a comment — add a convenient hop to that chain and the build fails.",
    },
    {
      kind: "figure",
      src: "/notebook/what-ai-agents-cost-to-run-fleet.webp",
      alt: "A rank of identical robots in business suits standing behind server racks and stacked bundles of cash on one side of a city skyline at sunset; on the other side, a single small white robot working alone at a laptop on a balcony desk with a coffee and a sleeping cat.",
      width: 1280,
      height: 720,
      caption:
        "The two architectures being priced. The published figures describe the left-hand side — a deployment with racks behind it and a budget to match. Everything in this article is the right-hand side.",
    },

    {
      kind: "h2",
      id: "one-error-code-two-problems",
      text: "One error code meant two different problems, and I spent a week treating them the same",
    },
    {
      kind: "p",
      text: "On 31 August at 14:30 UTC my OpenAI balance hit zero. I have not topped it up. I am writing this on 7 September, and every agent has carried on working the whole time — which is the design doing its job, and also the only reason I am comfortable publishing the cost figure.",
    },
    {
      kind: "p",
      text: "Working out what had happened was not graceful. My dashboard had been reporting 102 rate-limit errors over seven days, and that number was wrong in three separate ways at once.",
    },
    {
      kind: "p",
      text: "Most of them were not rate limiting. OpenAI returns HTTP 429 for a spent balance exactly as it does for throttling, so my classifier had been filing two unrelated conditions under one label. The count was inflated roughly threefold on top of that, because every retry logged its own row instead of every request logging one. And one agent was failing without ever reaching a working fallback, which is the next section.",
    },
    {
      kind: "p",
      text: "What settled it was the shape of the failures rather than anything they said. There were 140 successes, all before 14:30:39Z, and 66 failures, all from 14:54:08Z onward, with nothing succeeding after the cutover. Nine of the fifteen failing minutes contained one isolated call, retried three times and failing all three, spread across five agents over seventeen hours. A single request in a minute cannot breach a per-minute limit. Peak traffic all week was nine calls in a minute against a ceiling in the hundreds.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "How to tell the two apart in thirty seconds",
      text: "A burst is throttling. A wall is billing. If failures cluster around your busiest moments, you are being throttled and backing off will help. If everything fails from one timestamp onward regardless of volume, including calls that arrived completely alone, the account is empty and no amount of retrying will do anything except make the logs harder to read.",
    },
    {
      kind: "p",
      text: "There is a duller trap underneath that one and it cost me another session. I had been classifying by looking for the word quota in the error text, which is wrong, because at least one provider's ordinary per-minute throttle opens with a sentence about quotas and billing details that reads exactly like a dead account. The truth is on the line below it, naming a per-minute request metric. I could not see that line, because the captured error body was truncated at 400 characters — and at 400 characters the boilerplate fits and the useful part does not. Widening it to 800 was the entire fix.",
    },

    {
      kind: "h2",
      id: "chains-shorter-than-they-read",
      text: "Eleven agents had a backup provider that was never actually connected",
    },
    {
      kind: "p",
      text: "A provider with no API key present is skipped silently. That behaviour is correct — a missing credential must never crash a run at four in the morning — and it has a consequence that took me an embarrassing length of time to notice. A chain can run shorter than it reads. The routing file names six providers. The workflow supplies four keys. The remaining two are decoration, and nothing anywhere says so.",
    },
    {
      kind: "p",
      text: "Eleven agents were in that state. The worst of them was the one dominating the rate-limit numbers I had been misreading: its chain named a fallback whose key its workflow never passed, so on paper it had insurance and in practice it had one provider and a cliff edge. There is now a script that reads the chain definitions and each workflow's environment as text and exits non-zero when the two disagree. It took about an hour to write. It should have existed on day one.",
    },
    {
      kind: "p",
      text: "This is the shape of nearly every serious fault I have hit in two months. Not a crash. A thing that reads as configured, behaves as unconfigured, and reports nothing either way.",
    },

    {
      kind: "h2",
      id: "the-scheduler-stopped",
      text: "GitHub stopped running my agents for a week and kept no record of it",
    },
    {
      kind: "p",
      text: "Every agent in MIGI is a cron-scheduled GitHub Actions workflow, and GitHub treats a schedule trigger as best-effort. I knew that going in. I had no idea how much room there is in the word.",
    },
    {
      kind: "table",
      head: ["Day", "Median lateness", "Worst"],
      rows: [
        ["24 August", "53 min", "1.4 h"],
        ["25 August", "42 min", "1.3 h"],
        ["26 August", "62 min", "2.5 h"],
        ["27 August", "10.5 h", "11.1 h"],
        ["28 August", "11.6 h", "12.1 h"],
      ],
      caption: "Measured lateness of low-frequency scheduled runs against their own cron.",
    },
    {
      kind: "p",
      text: "A half-hourly workflow was delivering about half its scheduled runs even in the healthy period. Over that week it fell from forty runs a day to one. My 08:00 standup arrived at 20:00. GitHub's status page was clean throughout, and nothing was wrong with my account.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "A dropped schedule leaves nothing behind at all",
      text: "GitHub creates no run object until it actually dispatches one. A schedule it declines to honour therefore produces no queued run, no waiting run, no log line and no status field. I queried the API for a backlog and got zero, correctly, while the backlog was real. There is nothing to alert on. The only way to know is to compare what ran against what should have run.",
    },
    {
      kind: "p",
      text: "Two things came out of that week that I would tell anyone building on the same stack. Moving a half-hourly cron to hourly saves you almost nothing, because the platform was already only delivering about hourly — real relief starts at two-hourly. And manual dispatch is not throttled: a workflow you trigger by hand starts immediately, while its scheduled twin sits ten hours late.",
    },
    {
      kind: "p",
      text: "Changing any of it has its own trap. Several of my workflows gate a job on the schedule that triggered it, matched as an exact string. Move the cron without moving the gate and that job silently never runs again — no error, no failed run, nothing on any dashboard, because from the platform's point of view nothing went wrong. A green tick on a job that did nothing is the most expensive pass there is.",
    },

    {
      kind: "pullquote",
      text: "A thing that reads as configured, behaves as unconfigured, and reports nothing either way.",
    },

    {
      kind: "h2",
      id: "evals-passed-while-output-failed",
      text: "My test suite passed at 100% while 15% of the real output was unusable",
    },
    {
      kind: "p",
      text: "MIGI's decision logic is covered by offline eval suites that run on every change with no network access and no secrets. I would build it that way again. There is also a warning at the top of their README that I wrote after being caught by it.",
    },
    {
      kind: "p",
      text: "One suite covers an agent that turns my posts into slide carousels. It sat at a hundred per cent while 15.4% of the slides it built from real posts came out unreadable. The suite was not broken. It was passing against four sample posts I had written myself as fixtures, and every one of them happened to be a tidy self-contained sentence. Nothing I write actually looks like that.",
    },
    {
      kind: "p",
      text: "Invented fixtures are always cleaner than real data, so an eval built on them measures your imagination rather than your system. Where a real corpus exists, MIGI now measures against that as well, in read-only audits that print their own baseline and are deliberately not build gates — their heuristics over-report on purpose. They answer the one question no eval can: did this change make the real output better or worse?",
    },

    {
      kind: "promote",
      href: "/agents/migi",
      note: "The fleet this article is about — every agent, what it does, and the architecture underneath the bill.",
    },

    {
      kind: "h2",
      id: "agents-fail-below-the-model",
      text: "Agents don't fail because the model isn't smart enough",
    },
    {
      kind: "p",
      text: "Three things broke in two months. A billing failure wearing a rate limit's error code. A fallback chain that was shorter than it read. A scheduler that quietly stopped scheduling and kept no record of having done so. Not one of them is a model problem.",
    },
    {
      kind: "p",
      text: "Which is why I think the failure statistics get read the wrong way round. The compounding-error argument is the one everybody quotes — three agents at 70% reliability give you 34% end to end — and it is arithmetically true while pointing at the wrong variable. It reads as though the fix is a better model. Every failure above lived in the layer underneath the model: what happens when the call does not come back, who finds out, and how long that takes.",
    },
    {
      kind: "p",
      text: "None of that layer is expensive. It is just unglamorous, and it does not demo. You cannot put a chain-key cross-check in a launch video, and a company that has budgeted for a frontier model on every call and nothing for the week where the scheduler goes quiet is going to end up in Gartner's 40%.",
    },
    {
      kind: "p",
      text: "I still have not topped up the balance. Every day I do not is another day of evidence that the fallbacks were the actual design and the paid model was a convenience.",
    },
  ],

  // Three questions, checked against lib/faqs.ts, lib/page-faqs.ts and every
  // other post. The cost question is deliberately owned here rather than on
  // /agents/migi — that page's fourth FAQ was rewritten to ask about ECHO in
  // the same change, because two URLs answering "what does this cost" is the
  // collision BLOG_GUIDELINES §4 exists to prevent.
  faqs: [
    {
      q: "How much does it cost to run AI agents?",
      a: "Published estimates put a personal stack of five or six agents at $185 to $480 a month, and a self-hosted setup at $200 and up. MIGI, a fleet running forty to fifty agent runs a day since 8 July 2026, has cost under five dollars in total. The difference is architectural: a free scheduler, a free database, and a paid model used as a fallback rather than as the default.",
    },
    {
      q: "What is an AI agent?",
      a: "An AI agent is software that decides what to do, does it, and starts without anybody pressing anything. All three parts matter. A script running a fixed sequence is not an agent, and a model producing text for a person to act on is an assistant. Running unattended is the condition that forces the engineering, because every failure has to be either survivable or loud.",
    },
    {
      q: "Why do most AI agent projects fail?",
      a: "Gartner expects over 40% of agentic AI projects to be cancelled by the end of 2027, citing cost, unclear value and weak risk controls. In practice the failures sit below the model rather than in it: a billing error that looks identical to a rate limit, a fallback chain missing the credentials it names, a scheduler that stops firing and records nothing. None of those is fixed by a better model.",
    },
  ],

  seeAlso: ["/agents/migi", "/apps/migi-app"],
};

export default post;
