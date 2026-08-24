import type { Post } from "../types";

const post: Post = {
  slug: "overflow-hidden-kills-position-sticky",
  title: "Why does position: sticky silently stop working?",
  answer:
    "An ancestor with overflow: hidden becomes the sticky element's scroll container. That container never scrolls, so the sticky child has nothing to stick to and scrolls away with the page instead. Nothing errors and no warning appears. Check every ancestor for overflow-hidden before touching the sticky element's own CSS.",
  description:
    "position: sticky fails without any error when an ancestor has overflow: hidden. Why that happens, how to find the ancestor responsible, and the wrapper pattern that fixes it without losing the clip.",
  published: "2026-08-24",
  category: "CSS & Layout",
  featured: true,
  pick: true,
  tags: ["CSS", "Debugging", "Layout"],
  readingMinutes: 4,
  facts: [
    { label: "Symptom", value: "Sticky element scrolls away as if position: static" },
    { label: "Console output", value: "None — no error, no warning" },
    { label: "Cause", value: "An ancestor with overflow: hidden, scroll, or auto" },
    { label: "Also breaks", value: "Children positioned outside the ancestor's bounds" },
  ],

  blocks: [
    {
      kind: "p",
      text: "A sticky column on one of my product pages had never once pinned. The CSS was right, the parent had a height, there was room to scroll — and it behaved exactly as if `position: sticky` had been ignored. It had not been ignored. It was working perfectly, against the wrong scroll container.",
    },

    { kind: "h2", id: "the-rule", text: "The rule" },
    {
      kind: "p",
      text: "`position: sticky` positions an element relative to its **nearest scrolling ancestor**. What makes an ancestor a scrolling ancestor is any `overflow` value other than `visible` — and that includes `hidden`.",
    },
    {
      kind: "p",
      text: "So an ancestor with `overflow: hidden` becomes the container the sticky element sticks inside. That container does not scroll; it clips. The sticky child therefore has no scroll to respond to, and travels with the page like a static element.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "There is no diagnostic for this",
      text: "The browser does not warn. DevTools shows the sticky rule applied and not crossed out. The element's computed position really is `sticky`. Every signal you would normally check says the code is fine, which is why this one costs hours rather than minutes.",
    },

    { kind: "h2", id: "finding-it", text: "Finding the ancestor" },
    {
      kind: "p",
      text: "Walk up from the sticky element and check the computed `overflow` of every ancestor, rather than reading the source and trusting your eyes. In Tailwind codebases the culprit is almost always an `overflow-hidden` added for an unrelated reason — a rounded corner clipping an image, or a decorative beam kept inside a card.",
    },
    {
      kind: "code",
      lang: "js",
      caption: "Paste into the console with the sticky element selected as $0.",
      code: `let el = $0;
while ((el = el.parentElement)) {
  const o = getComputedStyle(el).overflow;
  if (o !== "visible") console.log(o, el);
}`,
    },
    {
      kind: "p",
      text: "The first thing this prints is your scroll container. If it is not the element you expected to scroll, that is the bug.",
    },

    { kind: "h2", id: "the-fix", text: "The fix, without losing the clip" },
    {
      kind: "p",
      text: "Usually the `overflow: hidden` is there for a reason and cannot simply be deleted. The pattern that resolves both needs is to **move the clip onto a wrapper around the thing being clipped**, rather than leaving it on the shared ancestor.",
    },
    {
      kind: "code",
      lang: "tsx",
      code: `// Before — the card clips, so nothing inside it can stick or escape.
<div className="relative overflow-hidden rounded-2xl">
  <SweepBeam />
  <aside className="sticky top-24">…</aside>
</div>

// After — only the decoration is clipped.
<div className="relative rounded-2xl">
  <div className="absolute inset-0 overflow-hidden rounded-2xl">
    <SweepBeam />
  </div>
  <aside className="sticky top-24">…</aside>
</div>`,
    },

    { kind: "h2", id: "the-second-victim", text: "The same rule eats straddling labels" },
    {
      kind: "p",
      text: "Sticky is the famous casualty, but it is not the only one. Anything positioned to cross the clipping ancestor's boundary gets cut at that boundary — and again, silently.",
    },
    {
      kind: "p",
      text: "I had two panels labelled with a legend at `-top-[10px]`, deliberately straddling the card's own border. Both cards carried `overflow-hidden` for a decorative sweep. Nine pixels of a seventeen-pixel label were being clipped, and neither legend had ever rendered at all. The design had been wrong since the day it shipped and nobody had spotted it, because a partially clipped label just looks like a slightly odd label.",
    },
    {
      kind: "p",
      text: "Measure rather than squint: put the offending rule back temporarily and compare the child's `getBoundingClientRect().top` against the clipping ancestor's. If the child's is smaller, it is being cut.",
    },

    { kind: "h2", id: "the-habit", text: "The habit worth forming" },
    {
      kind: "p",
      text: "When a sticky element does not pin, the instinct is to doubt the sticky element — add a height to the parent, try `top: 0`, check for `display: flex`. All of that is downstream of the actual question.",
    },
    {
      kind: "ol",
      items: [
        "Check every ancestor's computed overflow first, before editing any CSS.",
        "If one is clipping, ask whether the clip belongs on that element or on a wrapper inside it.",
        "Only then look at the sticky element's own rules.",
      ],
    },
  ],

  faqs: [
    {
      q: "Does overflow: hidden break position: sticky?",
      a: "Yes. Any ancestor with an overflow value other than visible — including hidden — becomes the sticky element's scroll container. Because a hidden container never scrolls, the sticky child has no scroll to respond to and behaves as if it were statically positioned. No error or warning is produced.",
    },
    {
      q: "How do I find which ancestor is breaking my sticky element?",
      a: "Walk up the DOM from the sticky element and log the computed overflow of each ancestor. The first ancestor whose overflow is not 'visible' is the scroll container the sticky element is bound to. If that is not the element you expected to scroll, it is the cause.",
    },
    {
      q: "How do I keep a clip and still allow a sticky child?",
      a: "Move the overflow: hidden off the shared ancestor and onto a wrapper that contains only the element being clipped — usually an absolutely positioned decoration. The ancestor stops being a scroll container, the decoration is still clipped, and the sticky child pins correctly.",
    },
  ],

  seeAlso: ["/learnings", "/projects"],
};

export default post;
