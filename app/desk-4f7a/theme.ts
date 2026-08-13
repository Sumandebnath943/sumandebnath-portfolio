// Shared look for the dashboard. Kept in one file so the table, the charts and
// the detail page cannot drift apart.
//
// Light surface #fcfcfb and the hues below are the validated palette instance:
// every colour here cleared the lightness band, chroma floor, CVD separation and
// the 3:1 contrast gate against this surface. They are not eyeballed, and the
// ORDER matters — CVD separation is checked between neighbours, and reordering
// these is what turned a FAIL (green beside orange, ΔE 3.2 protan) into a pass.
export const HUES = ["#2a78d6", "#008300", "#4a3aa7", "#eb6834"] as const;

/** Hue for panel n, cycling. Each panel is its own single-series chart, so a
 *  repeat across distant panels carries no false relationship. */
export const hue = (i: number) => HUES[i % HUES.length];

// Very light tints of the same hues, for stat-tile backgrounds. Tint only —
// the text on top stays in ink, never in the series colour.
export const TINTS = ["#eef4fd", "#eaf5ea", "#f0eefa", "#fdf0ea"] as const;
export const tint = (i: number) => TINTS[i % TINTS.length];

// Ink, as solid values rather than alpha on white.
//
// The first pass used alpha greys (black/35 … black/45), which land near 3:1 on
// this surface — under the 4.5:1 floor for body text, and it read exactly as
// washed out as that suggests. These three are measured against #fcfcfb:
// INK 18:1, INK_2 7.6:1, INK_3 5.1:1. Nothing below INK_3 carries words.
export const INK = "#0b0b0b";
export const INK_2 = "#52514e";
export const INK_3 = "#6b6a66";

export const page = "min-h-screen bg-[#fcfcfb] text-[#0b0b0b]";
export const card = "bg-white border border-black/[0.07] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
export const eyebrow = "font-mono text-[11px] uppercase tracking-[0.15em] text-[#6b6a66]";
export const heading = "font-manrope tracking-tight text-[#0b0b0b]";
export const body = "font-manrope text-[#52514e]";
export const muted = "font-manrope text-[#52514e]";

export const button =
  "rounded-lg border border-black/[0.12] bg-white px-3 py-2 font-manrope text-[12px] text-[#52514e] hover:text-[#0b0b0b] hover:border-black/30 transition-colors";
export const buttonPrimary =
  "rounded-lg bg-[#0b0b0b] px-4 py-2 font-manrope text-[13px] font-medium text-white hover:bg-[#0b0b0b]/90 transition-colors";
export const field =
  "w-full rounded-lg border border-black/[0.12] bg-white px-3 py-2 font-manrope text-[13px] text-[#0b0b0b] outline-none focus:border-black/40 transition-colors";

// Grid and rules sit one shade off the surface — recessive, solid, never dashed.
export const RULE = "rgba(0,0,0,0.07)";
export const TRACK = "rgba(0,0,0,0.055)";
