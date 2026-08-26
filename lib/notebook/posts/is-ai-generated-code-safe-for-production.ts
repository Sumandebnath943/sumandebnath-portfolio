import type { Post } from "../types";

const post: Post = {
  slug: "is-ai-generated-code-safe-for-production",
  title: "Is AI-generated code safe to put in production?",
  answer:
    "Safety is a property of review and testing rather than of authorship — nobody asks whether hand-written code is safe, they ask what was tested. What genuinely differs is volume, plausibility, and the author's weaker familiarity with code they did not type, which together make skimming ineffective. The answer is an audit trail, not an origin story.",
  description:
    "The question is usually asked about origin, which is the wrong axis. What is actually different about AI-generated code, the specific risks worth checking for, and what evidence of safety looks like.",
  published: "2026-08-26",
  category: "Practice",
  // The central objection to the whole practice. High pain, high demand, and
  // the existing answers are either dismissal or defensiveness. Evergreen — the
  // argument does not depend on which model is current.
  popularity: {
    searchDemand: 17,
    evergreen: 17,
    painIntensity: 17,
    gapInCoverage: 15,
    shareability: 16,
  },
  popularityScore: 82,
  tags: ["Security", "AI-Native", "Process"],
  readingMinutes: 8,
  cover: "/notebook/is-ai-generated-code-safe-for-production.webp",
  coverAlt:
    "Two identical sealed envelopes; one stays sealed while the other is opened and read under a magnifying glass.",
  facts: [
    { label: "The wrong question", value: "Who wrote it" },
    { label: "The right question", value: "Who read it, and what was run against it" },
    { label: "Genuinely different", value: "Volume, plausibility, weaker author familiarity" },
    { label: "One system's evidence", value: "38 automated security tests, 17 driving a live server" },
    { label: "Audit passes on that system", value: "3 independent reviews across 5 hardening phases" },
  ],

  blocks: [
    {
      kind: "p",
      text: "The question is almost always asked about origin — is code safe *because of who or what produced it* — and framed that way it cannot be answered, because nobody has ever asked it about anything else. No one asks whether hand-written code is safe. They ask what it does, what was tested, and who looked at it.",
    },
    {
      kind: "p",
      text: "That said, dismissing the concern is not honest either. Something genuinely is different, and it is worth being precise about what.",
    },

    { kind: "h2", id: "what-differs", text: "What is actually different" },
    {
      kind: "h3", id: "volume", text: "Volume" },
    {
      kind: "p",
      text: "There is simply more of it, produced faster. Review capacity has not increased at the same rate, and the gap between how quickly code can be produced and how quickly it can be examined is where the risk lives. This is a throughput problem before it is a security problem.",
    },
    {
      kind: "h3", id: "familiarity", text: "You did not type it" },
    {
      kind: "p",
      text: "When you write something by hand you retain a map of it — roughly where things are, what depends on what, which parts you were unsure about. Accepting generated code gives you a much weaker map unless you deliberately build one by reading. Six months later that difference decides whether you can reason about your own system.",
    },
    {
      kind: "h3", id: "plausibility", text: "It is plausible, which defeats skimming" },
    {
      kind: "p",
      text: "This is the one I would emphasise. Bad hand-written code often looks bad — inconsistent, rushed, obviously confused. Generated code is uniformly well-formed, sensibly named and conventionally structured whether it is right or wrong. **Your usual visual heuristics for \"this looks suspicious\" simply do not fire.** You have to actually read it, because appearance carries no signal any more.",
    },
    {
      kind: "h3", id: "defaults", text: "It picks defaults on your behalf" },
    {
      kind: "p",
      text: "Asked to make something work, a model will make it work, and where a choice exists between a permissive default and a restrictive one, the permissive default is more likely to produce working code on the first attempt. Nothing announces this. It is a decision made quietly, in your codebase, that you did not participate in.",
    },

    { kind: "h2", id: "the-risks", text: "The specific things worth checking" },
    {
      kind: "p",
      text: "In my own work these are the categories that have actually produced problems, rather than the ones that sound alarming:",
    },
    {
      kind: "ul",
      items: [
        "**Authorisation enforced only in the interface.** The button is hidden from users who should not have access, and the underlying endpoint checks nothing. This is the single most common serious defect I have found in my own code, and it is invisible in normal testing because you test as somebody who is allowed.",
        "**Over-permissive data access.** Rules that let any authenticated user read any record, because that made the feature work during development and nothing failed afterwards.",
        "**Unvalidated input reaching a query or a command.** Less common than it used to be, and still worth looking for specifically.",
        "**Secrets.** Covered at length elsewhere; the short version is that they belong in the environment and nowhere else.",
        "**Dependencies you did not choose.** A generated implementation may pull in a package to solve something small. You now own that package's security posture and you never evaluated it.",
        "**Error messages that leak internals.** Stack traces and database errors returned to the client, because that was useful in development and nobody turned it off.",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The pattern across all six",
      text: "Every one of these produces an application that works perfectly for the person testing it. None of them announce themselves. That is the actual shape of the risk — not code that fails, but code that succeeds while being wrong, which is exactly the failure mode that requires reading rather than running.",
    },

    { kind: "h2", id: "what-makes-it-safe", text: "What makes it safe is unglamorous" },
    {
      kind: "p",
      text: "There is no clever answer here, which is itself worth stating, because the field is full of people looking for one.",
    },
    {
      kind: "ol",
      items: [
        "**Read every change before it lands.** No automatic acceptance on anything that anybody will depend on.",
        "**Test the negative cases**, not the happy path. Request something you should not be allowed to have and confirm you do not get it.",
        "**Examine the security model separately** from whether the feature works. They are different reviews, and doing them together means the second never happens.",
        "**Automate the checks that are boring**, because boredom is when human attention fails. This is the ideal use of automation in your own process.",
        "**Fail closed.** Missing configuration should lock the door rather than leave it open.",
      ],
    },

    { kind: "h2", id: "receipts", text: "What that looks like on something real" },
    {
      kind: "p",
      text: "The most security-sensitive thing I have built is an AI copilot for relationship managers at a financial institution — a regulated domain, real access-control requirements, and a client I do not name anywhere.",
    },
    {
      kind: "p",
      text: "It carries **38 automated security tests, 17 of which drive a live server** rather than asserting against mocks, and it went through **three independent security review passes across five hardening phases.** Every one of those numbers is stated publicly on its page because they are the only things that answer the question in this article's title.",
    },
    {
      kind: "p",
      text: "One decision from it is a fair illustration of what actually thinking about this looks like. When a relationship manager requests a customer belonging to a different manager, the API returns **404, not 403.** A 403 confirms the record exists and merely says you may not see it, which leaks the existence of every customer to anyone willing to enumerate identifiers. A 404 is indistinguishable from a customer who does not exist.",
    },
    {
      kind: "p",
      text: "No model produced that decision. It came from asking what an attacker learns from each possible response, which is a question somebody has to think to ask.",
    },

    { kind: "h2", id: "the-fair-version", text: "The fair version of the criticism" },
    {
      kind: "p",
      text: "People who argue that AI-assisted development is producing insecure software are, as a description of what is being shipped, largely right. Generation is fast and reviewing is boring, and where those meet you get applications nobody has read in front of users who assume somebody did.",
    },
    {
      kind: "p",
      text: "Where the criticism goes wrong is in treating that as a property of the method rather than of the standard applied to it. The same tools, with review and testing behind them, produce software that can be defended with numbers. The difference is not the model. It is whether anybody read the output.",
    },
    {
      kind: "quote",
      text: "The right question is not who wrote it. It is who read it, and what was run against it.",
    },
    {
      kind: "p",
      text: "That question has a real answer for any given system, and it is the one I would want asked about mine. It is also, usefully, a question that a code-generation tool cannot answer on your behalf — which is why it remains the honest test.",
    },
  ],

  faqs: [
    {
      q: "Is AI-generated code less secure than code written by hand?",
      a: "Security is determined by review and testing rather than by authorship. What differs is volume, the fact that the author did not type it and so holds a weaker mental model, and that generated code is uniformly well-formed whether correct or not — which disables the visual heuristics people rely on when skimming.",
    },
    {
      q: "What security risks are specific to AI-generated code?",
      a: "Authorisation enforced only in the interface while the endpoint checks nothing, over-permissive data access rules, unvalidated input reaching a query, secrets placed in code, dependencies introduced without evaluation, and error responses leaking internals. All six produce an application that works correctly for whoever is testing it.",
    },
    {
      q: "How do you verify that AI-generated code is production-ready?",
      a: "Read every change before accepting it, test the negative cases rather than the working path, review the security model as a separate exercise from whether the feature functions, automate the repetitive checks because attention fails on boring work, and ensure missing configuration fails closed rather than open.",
    },
  ],

  seeAlso: ["/banking/rm-copilot", "/notebook", "/projects"],
};

export default post;
