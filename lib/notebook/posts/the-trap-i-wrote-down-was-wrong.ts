import type { Post } from "../types";

const post: Post = {
  slug: "the-trap-i-wrote-down-was-wrong",
  title: "The debugging note I wrote was wrong for a year",
  answer:
    "I documented that window scroll listeners never fire on this site because the body is the scroll container. Half of that was true: document.body.scrollTop does read 0. The conclusion was not. When I finally measured, a window scroll listener fired 19 times during a single programmatic scroll. The note had been steering design decisions away from working approaches.",
  description:
    "A hard-won note turned out half right and far too absolute. What measuring revealed, and how to write findings that fail safely when they turn out to be wrong.",
  metaTitle: "The debugging note I wrote was wrong for a year",
  keywords: ["engineering documentation", "wrong debugging assumptions", "writing technical notes", "documenting bugs"],
  published: "2026-08-24",
  category: "Practice",
  // Nobody searches for this; it travels by being shared rather than found. The highest shareability of the five and the lowest demand.
  popularity: {
    searchDemand: 4,
    evergreen: 17,
    painIntensity: 6,
    gapInCoverage: 12,
    shareability: 17,
  },
  popularityScore: 56,
  tags: ["Debugging", "Documentation", "Engineering"],
  readingMinutes: 5,
  cover: "/notebook/the-trap-i-wrote-down-was-wrong.webp",
  coverAlt:
    "An open notebook page with a confidently written note struck through, a measuring instrument lying across it.",
  facts: [
    { label: "The claim", value: "\"window scroll listeners never fire — use IntersectionObserver\"" },
    { label: "True part", value: "document.body.scrollTop reads 0 and setting it does nothing" },
    { label: "False part", value: "window.scrollY tracks correctly; listeners do fire" },
    { label: "Measured", value: "19 listener calls across one programmatic scroll" },
    { label: "Cost", value: "Scroll-driven designs ruled out on the strength of a note" },
  ],

  blocks: [
    {
      kind: "p",
      text: "Somewhere early on I hit a scroll bug, worked out that `document.body` was the scroll container, and wrote the finding down so nobody would lose the same afternoon twice. The note said: the body is the scroll container, so `window` scroll listeners never fire — use `IntersectionObserver`.",
    },
    {
      kind: "p",
      text: "It sat at the top of the project's instructions for a long time. It shaped decisions. And the second half of it was false.",
    },

    { kind: "h2", id: "what-was-true", text: "What was true" },
    {
      kind: "p",
      text: "`document.body` computes to `overflow: hidden auto` here. That part is real and has real consequences: `document.body.scrollTop` reads `0`, and writing to it does nothing at all. Any code that tried to read or drive scroll position through the body silently did nothing — which is exactly the bug I had originally been chasing.",
    },
    {
      kind: "p",
      text: "Everything after that was inference, not observation.",
    },

    { kind: "h2", id: "what-was-false", text: "What was false" },
    {
      kind: "p",
      text: "`document.scrollingElement` is `<html>`, not `<body>`. `window.scrollY` tracks the scroll position correctly. And a `window` scroll listener fires normally — nineteen times across a single programmatic scroll, when I finally sat down and counted.",
    },
    {
      kind: "code",
      lang: "js",
      caption: "The measurement that should have happened a year earlier.",
      code: `let n = 0;
const count = () => n++;
window.addEventListener("scroll", count);
window.scrollTo({ top: 2000, behavior: "smooth" });
setTimeout(() => {
  console.log("scrollingElement:", document.scrollingElement.tagName);
  console.log("window.scrollY:", window.scrollY);
  console.log("listener fired:", n, "times");
  window.removeEventListener("scroll", count);
}, 1500);`,
    },
    {
      kind: "p",
      text: "This is not an exotic diagnostic. It is nine lines and about forty seconds. It went unrun for a year because the note said the answer was already known — and the note was in a document I trusted, written by someone I had every reason to trust, namely me.",
    },

    { kind: "h2", id: "the-cost", text: "The cost of a wrong note" },
    {
      kind: "callout",
      tone: "warn",
      title: "A wrong note is worse than no note",
      text: "With no note, you investigate and find the truth. With a wrong note, you skip the investigation — confidently, and with the feeling of having been efficient. The note does not merely fail to help; it actively closes the path to the answer, and it does so most effectively for the people who trust the documentation most.",
    },
    {
      kind: "p",
      text: "The damage here was not a bug. It was a set of designs never attempted. A scroll-driven timeline got ruled out on the strength of one sentence. It works, incidentally — it is on the site now, and it depends on precisely the `window` scroll behaviour the note said did not exist.",
    },

    { kind: "h2", id: "writing-better", text: "Writing findings that fail safely" },
    {
      kind: "p",
      text: "I have not stopped writing debugging notes. I have changed how they are written.",
    },
    {
      kind: "ol",
      items: [
        "Separate the observation from the conclusion. \"document.body.scrollTop reads 0\" is an observation. \"Therefore window listeners never fire\" is a guess wearing an observation's clothes.",
        "Date the finding and name the version it was measured against. A note without a date cannot ever be identified as stale.",
        "Record how it was measured, so the next person can re-run it in a minute instead of re-deriving it in an afternoon.",
        "Prefer \"do X\" over \"never do Y\". A positive recommendation still leaves the alternative open for someone who measures.",
        "When a note turns out to be wrong, correct it in place and leave the correction visible. A silently edited note teaches nobody.",
      ],
    },
    {
      kind: "p",
      text: "The note now reads: the body is the scroll container, so write to `window` or `document.scrollingElement`, never `document.body.scrollTop`. `IntersectionObserver` is the right default for reveal-on-scroll work. Do not rule out a scroll-driven design on the strength of this note without measuring first.",
    },
    {
      kind: "p",
      text: "Same finding. Same practical advice for the common case. One sentence at the end that gives the next person permission to check — which is the only part that would have made a difference.",
    },

    { kind: "h2", id: "the-general-point", text: "The general point" },
    {
      kind: "p",
      text: "Every codebase accumulates a body of received wisdom: the things everyone knows, that nobody has checked since whoever first said them. It is genuinely valuable — it is how a team stops relearning the same lessons. It is also completely unversioned, unowned, and untested.",
    },
    {
      kind: "p",
      text: "The absolute claims in it are the ones worth re-measuring. \"Never\" and \"always\" are the words that stop investigation, so they are where a wrong belief survives longest.",
    },
  ],

  faqs: [
    {
      q: "Do window scroll listeners fire when the body is the scroll container?",
      a: "Yes. Even where document.body computes to overflow: hidden auto and document.body.scrollTop reads 0, document.scrollingElement remains <html>, window.scrollY tracks correctly, and window scroll listeners fire normally. The correct rule is to read and write scroll through window or document.scrollingElement rather than document.body.",
    },
    {
      q: "Why does document.body.scrollTop return 0?",
      a: "Because <html>, not <body>, is the scrolling element in standards mode. document.scrollingElement points at <html>, so body.scrollTop reads 0 and assigning to it has no effect. Use window.scrollY to read and window.scrollTo to write.",
    },
    {
      q: "How should engineering debugging notes be written so they do not go stale?",
      a: "Keep the observation separate from the conclusion drawn from it, date the finding and name the version measured, record the measurement so it can be re-run cheaply, and prefer positive recommendations over absolute prohibitions. Absolute claims stop future investigation, which is how an incorrect note survives longest.",
    },
  ],

  seeAlso: ["/learnings", "/philosophy"],
};

export default post;
