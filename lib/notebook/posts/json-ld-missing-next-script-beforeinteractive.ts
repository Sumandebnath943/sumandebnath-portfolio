import type { Post } from "../types";

const post: Post = {
  slug: "json-ld-missing-next-script-beforeinteractive",
  title: "Why is my JSON-LD missing from the HTML in Next.js?",
  answer:
    "Next.js does not emit a script element for a component using next/script with strategy beforeInteractive. It serialises the payload into a self.__next_s array that the client bundle reads after hydration, so JSON-LD declared that way is absent from the served HTML and invisible to any crawler that does not execute JavaScript.",
  description:
    "next/script with strategy=\"beforeInteractive\" emits no script tag into the served HTML. Why structured data declared that way is visible in DevTools but missing from the response, how to check, and the one-line fix.",
  published: "2026-08-26",
  category: "Next.js",
  pick: true,
  // Silent, affects a common pattern, and the diagnostic everyone reaches for
  // first — DevTools — is the one that hides it. Low coverage: the next/script
  // docs describe what beforeInteractive does for scripts, not what it means
  // for inert data.
  popularity: {
    searchDemand: 15,
    evergreen: 14,
    painIntensity: 17,
    gapInCoverage: 18,
    shareability: 15,
  },
  popularityScore: 79,
  tags: ["Next.js", "Structured Data", "AEO", "Debugging"],
  readingMinutes: 6,
  cover: "/notebook/json-ld-missing-next-script-beforeinteractive.webp",
  coverAlt:
    "A printed page held up to the light, with one central block entirely blank where content should be.",
  facts: [
    { label: "Symptom", value: "JSON-LD present in DevTools, absent from view-source and curl" },
    { label: "Console output", value: "None — nothing errors" },
    { label: "Cause", value: "next/script strategy=\"beforeInteractive\" emits no element" },
    { label: "What is emitted instead", value: "A self.__next_s array entry, read after hydration" },
    { label: "Blast radius", value: "Every route rendered by the layout that declares it" },
    { label: "Fix", value: "A plain <script type=\"application/ld+json\">" },
  ],

  blocks: [
    {
      kind: "p",
      text: "An external audit told me the identity block on my homepage had no name and no description. That was true, and it was the least interesting thing wrong. The reason a page carrying four structured-data nodes was being judged on one of them is that the other three **were not in the HTML at all**.",
    },
    {
      kind: "p",
      text: "I work in digital marketing. Structured data is not an exotic corner of my job, it is close to the centre of it — which is why finding this on my own site was an unpleasant fifteen minutes. Everything looked correct in every tool I habitually check. It had been wrong for months.",
    },

    { kind: "h2", id: "the-setup", text: "The code that looks completely fine" },
    {
      kind: "p",
      text: "My root layout declared the site's `Person` and `WebSite` nodes like this. If you have ever added JSON-LD to a Next.js app, there is a reasonable chance you have written something close to it.",
    },
    {
      kind: "code",
      lang: "tsx",
      caption: "app/layout.tsx — wrong, and gives no indication of being wrong.",
      code: `import Script from "next/script";

<Script
  id="ld-person"
  type="application/ld+json"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
/>`,
    },
    {
      kind: "p",
      text: "The reasoning behind `beforeInteractive` seems sound when you write it: this is metadata, crawlers should see it as early as possible, so load it as early as the framework allows. Every part of that sentence is wrong, but not obviously.",
    },

    { kind: "h2", id: "what-it-does", text: "What beforeInteractive actually does" },
    {
      kind: "p",
      text: "`next/script` with `strategy=\"beforeInteractive\"` **does not put a script element in the document.** It serialises the props into an array on `self.__next_s`, and the client-side bundle walks that array after it loads and creates the real element then.",
    },
    {
      kind: "p",
      text: "So the served HTML contains something like this, which is a string of escaped JSON inside a bootstrap call rather than a block any parser is looking for:",
    },
    {
      kind: "code",
      lang: "html",
      code: `<script>(self.__next_s=self.__next_s||[]).push([0,{
  "type":"application/ld+json",
  "children":"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Person\\"…"
}])</script>`,
    },
    {
      kind: "callout",
      tone: "warn",
      title: "DevTools is the wrong instrument here",
      text: "Open the Elements panel and the JSON-LD is there, correctly typed, exactly where you expect. That panel shows the live DOM — which is to say, the page after JavaScript has run. It cannot tell you what was in the response, and the response is the only thing a non-rendering crawler ever sees.",
    },

    { kind: "h2", id: "the-check", text: "The check that tells the truth" },
    {
      kind: "p",
      text: "Ask the server, not the browser. If the count comes back lower than the number of nodes you believe you have, the missing ones are being injected by JavaScript.",
    },
    {
      kind: "code",
      lang: "bash",
      caption: "Counts the literal ld+json blocks in the served HTML.",
      code: `curl -s https://example.com/ | grep -c 'type="application/ld+json"'`,
    },
    {
      kind: "p",
      text: "On my site that returned one. The DOM had four. The one it found was the only node I had written as an ordinary script tag inside a page component — which is why the audit judged my entire identity on it, and why the fields it wanted were missing: they were all sitting in the `Person` node it could not see.",
    },

    { kind: "h2", id: "why-it-matters", text: "Who actually loses" },
    {
      kind: "p",
      text: "It is worth being precise about the damage rather than overstating it. Google renders JavaScript in a second pass, so it can eventually pick up JSON-LD injected this way — deferred, and dependent on a render budget you do not control.",
    },
    {
      kind: "p",
      text: "Almost nothing else does. Link unfurlers, most answer-engine fetchers, and any straightforward HTTP client see the response and nothing more. If your structured data exists only after hydration, then for that entire population it does not exist. For a personal site whose whole purpose is telling machines who the subject is, that is the failure that matters.",
    },

    { kind: "h2", id: "the-fix", text: "The fix is to stop using next/script" },
    {
      kind: "p",
      text: "JSON-LD is inert data. Nothing reads it at runtime, nothing depends on when it arrives, and there is therefore no reason for it to be loaded, ordered or prioritised at all. It only needs to be **present**.",
    },
    {
      kind: "code",
      lang: "tsx",
      caption: "A plain script element. It renders into the HTML on the server.",
      code: `<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
/>`,
    },
    {
      kind: "p",
      text: "It can sit in the body — JSON-LD is valid anywhere in the document, and React 19 hoists bare `<link>` elements into the head but not inline scripts, so do not expect it to move. After the change the same `curl` returned four blocks, and the audit score moved from 79 to 83 on the next run.",
    },
    {
      kind: "p",
      text: "The score is the least important part of that. What actually changed is that the site's identity — the job title, the corroborating profile links, the disambiguation from somebody else with my name — is now readable by something that does not run JavaScript.",
    },

    { kind: "h2", id: "the-habit", text: "The habit worth taking from this" },
    {
      kind: "p",
      text: "The general form of this bug is **verifying what was rendered instead of what was served**, and it is not specific to structured data or to Next.js. Anything a framework describes as an optimisation is worth checking in the response body at least once, because optimisations are exactly the features that change where output ends up.",
    },
    {
      kind: "ol",
      items: [
        "Check structured data with curl against the deployed URL, never with DevTools.",
        "Count what you expect. A number that is lower than your node count is the whole diagnosis.",
        "Treat inert metadata as content to be printed, not as a script to be scheduled.",
      ],
    },
    {
      kind: "p",
      text: "For what it is worth, the audit that surfaced this is [Is Agentic](https://is-agentic.com/), built by Vercel on Ora's checks. I would not have found this on my own — I had already looked at that layout many times and seen nothing wrong, because I was looking in the panel that shows you what you meant rather than the one that shows you what you shipped.",
    },
  ],

  faqs: [
    {
      q: "Does next/script with beforeInteractive work for JSON-LD?",
      a: "No. That strategy does not emit a script element into the server-rendered HTML; it serialises the payload into a self.__next_s array which the client bundle turns into a real element after hydration. Structured data declared this way is missing from the response and visible only to clients that execute JavaScript.",
    },
    {
      q: "How do I check whether my structured data is in the served HTML?",
      a: "Run curl against the deployed URL and count the literal occurrences of type=\"application/ld+json\" in the output. Compare that number to the nodes you expect. Browser DevTools shows the live DOM after JavaScript has run, so it will display JSON-LD that was never present in the response.",
    },
    {
      q: "Can Google read JSON-LD that is added by JavaScript?",
      a: "Usually, because Google renders pages in a second pass and can pick up structured data injected during it. That pass is deferred and subject to a render budget. Most other consumers — link unfurlers, answer-engine fetchers and plain HTTP clients — do not execute JavaScript and will never see it.",
    },
  ],

  seeAlso: ["/notebook", "/about"],
};

export default post;
