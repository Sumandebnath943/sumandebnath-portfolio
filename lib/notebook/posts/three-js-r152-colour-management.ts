import type { Post } from "../types";

const post: Post = {
  slug: "three-js-r152-colour-management",
  title: "three.js r152 re-tints every colour written before it",
  answer:
    "Since three.js r152, ColorManagement.enabled defaults to true, so new THREE.Color(0xADC1DE) converts sRGB to linear before reaching the shader. Red loses proportionally more than blue, so colours picked against older releases drift violet. Nothing errors — the scene simply renders a different colour than the hex you wrote.",
  description:
    "ColorManagement.enabled defaults true since r152 and silently converts sRGB to linear. Nothing errors. Why your colours look wrong after upgrading, and the fix.",
  metaTitle: "three.js r152 colour management changed everything",
  keywords: ["three.js r152 colors", "ColorManagement.enabled", "three.js colours wrong after upgrade", "three.js color management"],
  published: "2026-08-24",
  category: "Graphics",
  // A real and under-documented trap, but the audience is anyone doing WebGL colour work, which is a much smaller room.
  popularity: {
    searchDemand: 9,
    evergreen: 15,
    painIntensity: 13,
    gapInCoverage: 15,
    shareability: 11,
  },
  popularityScore: 63,
  tags: ["three.js", "WebGL", "Colour"],
  readingMinutes: 6,
  cover: "/notebook/three-js-r152-colour-management.webp",
  coverAlt:
    "A colour swatch card entering a glass lens and emerging visibly shifted and darkened on the other side.",
  facts: [
    { label: "Changed in", value: "three.js r152 — ColorManagement.enabled defaults to true" },
    { label: "Example input", value: "0xADC1DE → sRGB (0.678, 0.757, 0.871)" },
    { label: "Reaches shader as", value: "linear (0.418, 0.533, 0.731)" },
    { label: "Visible drift", value: "Red suppressed more than blue → violet cast" },
    { label: "Error output", value: "None" },
  ],

  blocks: [
    {
      kind: "p",
      text: "A cloud background on one of my pages rendered violet. The library's own demo, running the identical hex values, rendered warm white. Same code, same colours, different result — and the only meaningful difference was that the demo was pinned to an old release of three.js and I was not.",
    },

    { kind: "h2", id: "what-changed", text: "What r152 changed" },
    {
      kind: "p",
      text: "From r152, `THREE.ColorManagement.enabled` defaults to `true`. That is the correct default and a genuine improvement — it means three treats your hex values as sRGB, which is what they are, and converts them to linear space before lighting maths touches them.",
    },
    {
      kind: "p",
      text: "The consequence is that `new THREE.Color(0xADC1DE)` no longer hands the shader the raw sRGB triple. It hands over the linear equivalent:",
    },
    {
      kind: "table",
      head: ["Channel", "sRGB (what you wrote)", "Linear (what the shader gets)"],
      rows: [
        ["R", "0.678", "0.418"],
        ["G", "0.757", "0.533"],
        ["B", "0.871", "0.731"],
      ],
    },
    {
      kind: "p",
      text: "The conversion is non-linear, so it does not dim the channels evenly. Red falls by 0.260, blue by only 0.140. Any colour picked by eye against pre-r152 behaviour therefore comes out with red suppressed relative to blue — which reads as a violet cast.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "This affects libraries, not just your own code",
      text: "The risk is highest with any WebGL wrapper that predates r152 and passes hex values straight through to three. Its documented colours were chosen under the old behaviour, so they are all now slightly wrong — and because the library itself is unchanged, nothing about the situation looks like a version problem.",
    },

    { kind: "h2", id: "the-obvious-fix", text: "Why the obvious fix is often unavailable" },
    {
      kind: "p",
      text: "The one-line fix is to turn the flag back off:",
    },
    {
      kind: "code",
      lang: "js",
      code: `THREE.ColorManagement.enabled = false; // global — read the next paragraph first`,
    },
    {
      kind: "p",
      text: "That flag is global, and it is global across every consumer of the same `three` instance. In my case a GLTF model is mounted in the root layout and renders on every page from that same instance. Disabling colour management site-wide to correct one background would have changed how the model renders everywhere else. Fixing a background by re-tinting the mascot is not a fix.",
    },

    { kind: "pullquote", text: "That flag is global, and it is global across every consumer of the same `three` instance." },

    { kind: "h2", id: "compensating", text: "Compensating locally instead" },
    {
      kind: "p",
      text: "If you cannot change the flag, pre-compensate the value. Convert linear→sRGB yourself before handing the colour over; three's own sRGB→linear then undoes your conversion, and the shader lands on the value you actually intended.",
    },
    {
      kind: "code",
      lang: "js",
      caption: "Pre-compensate a hex so the post-r152 pipeline lands on the original value.",
      code: `const linearToSRGB = (c) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

function precompensate(hex) {
  const c = new THREE.Color(hex);           // already converted to linear
  return new THREE.Color(
    linearToSRGB(c.r),
    linearToSRGB(c.g),
    linearToSRGB(c.b),
  ).getHex();
}`,
    },
    {
      kind: "p",
      text: "Record both values in the source — the pre-compensated hex you pass, and the original you meant. Six months from now the compensated hex looks like a typo, and the comment is the only thing standing between it and a well-intentioned correction.",
    },

    { kind: "h2", id: "verifying", text: "Verify by sampling, not by eye" },
    {
      kind: "p",
      text: "Colour drift of this size is exactly the magnitude the eye is worst at judging, especially against a dark page and after you have been staring at it for an hour. Read the pixels instead.",
    },
    {
      kind: "code",
      lang: "js",
      caption: "Sample the WebGL canvas through a 2D canvas and read actual channel values.",
      code: `const gl = document.querySelector("canvas");
const c2 = document.createElement("canvas");
c2.width = gl.width; c2.height = gl.height;
c2.getContext("2d").drawImage(gl, 0, 0);
const [r, g, b] = c2.getContext("2d")
  .getImageData(gl.width / 2, gl.height / 3, 1, 1).data;
console.log({ r, g, b });`,
    },
    {
      kind: "p",
      text: "A warm white reads **R ≥ G > B**. A violet cast is blue over green with red suppressed. That single check is the only reason I could confirm the fix rather than convince myself of it.",
    },

    { kind: "h2", id: "takeaway", text: "The takeaway" },
    {
      kind: "p",
      text: "A silent default change is worse than a breaking one. A breaking change stops the build and gets fixed in the upgrade. A default that quietly alters output ships, looks nearly right, and gets attributed to the design rather than the dependency — which is how a scene ends up violet for months with nobody quite able to say why.",
    },
  ],

  faqs: [
    {
      q: "Why did my three.js colours change after upgrading?",
      a: "three.js r152 turned ColorManagement.enabled on by default. Hex values are now treated as sRGB and converted to linear before reaching the shader, so any colour chosen against pre-r152 behaviour renders differently. Red is suppressed more than blue by the conversion, which typically shows as a violet or cool cast.",
    },
    {
      q: "Should I set THREE.ColorManagement.enabled = false?",
      a: "Only if nothing else in the application shares that three instance. The flag is global, so disabling it to correct one scene changes how every other scene renders. If a model or another canvas is mounted elsewhere, pre-compensate the individual colours instead.",
    },
    {
      q: "How do I verify a WebGL colour fix objectively?",
      a: "Draw the WebGL canvas into a 2D canvas with drawImage, then read pixel values with getImageData. Comparing actual channel numbers is reliable; judging a subtle hue shift by eye against a dark background is not.",
    },
  ],

  seeAlso: ["/fun-apps", "/learnings"],
};

export default post;
