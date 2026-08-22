import type { Alignment, Side } from "driver.js";

/**
 * Where the runner stores its position, in sessionStorage — a tour is a visit,
 * not a preference.
 *
 * It lives here rather than in `SiteTour.tsx` because a second reader needs it:
 * `ChatTakeover` holds its launcher back for seven seconds after load, and the
 * tour's final step points at that launcher (`#tour-chat`). A tour resuming
 * mid-script has to be able to say "skip the delay" — and importing it from
 * `SiteTour` would drag driver.js into the chat bundle. Two copies of the
 * literal would be worse: change one, change both.
 */
export const TOUR_POSITION_KEY = "site-tour-position";

/**
 * The guided tour, as an ordered script across the whole site.
 *
 * The previous tour was nine steps that never left the homepage — two of them
 * pointed at the nav pill because the thing they described (the archive) was
 * on a page the tour had no way to reach. Steps now carry the route they live
 * on, and the runner walks between routes when it crosses a boundary.
 *
 * Rules for editing:
 *  · Order matters. Steps must be grouped so each route appears in one
 *    contiguous run — the runner treats a change of `route` as a page hop, so
 *    alternating routes would bounce the visitor back and forth.
 *  · `element` is a CSS selector. A selector that matches nothing is not a bug:
 *    driver.js falls back to a centred popover, so the step still says its
 *    piece. That is deliberate — a section that fails to mount should not be
 *    able to dead-end the tour.
 *  · Keep descriptions to a sentence or two. This is a tooltip, not an essay.
 */
export type TourStep = {
  /** Pathname this step belongs to. */
  route: string;
  /** CSS selector for the element to highlight. Omit for a centred step. */
  element?: string;
  title: string;
  description: string;
  side?: Side;
  align?: Alignment;
};

export const TOUR_STEPS: TourStep[] = [
  // ── The homepage ────────────────────────────────────────────────────────
  {
    route: "/",
    element: "#tour-nav",
    title: "Start Here",
    description:
      "Everything on this site hangs off this bar — Home, the full portfolio, the résumé, and a way to get in touch. On a desktop, ⌘K opens the same map as a search box.",
    side: "bottom",
    align: "center",
  },
  {
    route: "/",
    element: "#hero",
    title: "The Objective",
    description:
      "Nine years of brand and product marketing, then two more spent independently shipping AI-native products. This tour walks the whole thing in about a minute.",
    side: "bottom",
    align: "center",
  },
  {
    route: "/",
    element: "#experience-narrative",
    title: "The Evolution",
    description:
      "How a marketer ended up training language models. Not a pivot — an accumulation.",
    side: "top",
    align: "center",
  },
  {
    route: "/",
    element: "#now",
    title: "Active Intelligence",
    description: "What's being built right now, including the work still in stealth.",
    side: "top",
    align: "center",
  },
  {
    route: "/",
    element: "#systems",
    title: "The Stack",
    description:
      "The tools, frameworks and models behind the builds — and the AI-assisted workflow that makes a one-person team move like a bigger one.",
    side: "top",
    align: "center",
  },
  {
    route: "/",
    element: "#projects",
    title: "Flagship Systems",
    description:
      "Deep-dive dossiers on the production AI applications. Each one opens into a real write-up, not a screenshot and a claim.",
    side: "top",
    align: "center",
  },
  {
    route: "/",
    element: "#philosophy",
    title: "The Thesis",
    description:
      "The mental models underneath all of it — why intelligence is infrastructure, and why craft still decides the outcome.",
    side: "top",
    align: "center",
  },
  {
    route: "/",
    element: "#history",
    title: "Operational History",
    description:
      "The corporate record: leadership roles, budgets, teams, and the numbers attached to them.",
    side: "top",
    align: "center",
  },

  // ── The archive ─────────────────────────────────────────────────────────
  {
    route: "/projects",
    element: "#archive-heading",
    title: "The Full Archive",
    description:
      "Past the flagship four sits everything else — twenty-odd systems, each with its own dossier. This is the page the old tour kept pointing at but could never actually open.",
    side: "bottom",
    align: "center",
  },

  // ── MIGI ────────────────────────────────────────────────────────────────
  {
    route: "/agents/migi",
    element: "#fleet",
    title: "Forty-Six Agents",
    description:
      "MIGI is an autonomous fleet that runs a personal brand, job applications, expenses, journaling and uptime monitoring — without being asked each time.",
    side: "top",
    align: "center",
  },
  {
    route: "/agents/migi",
    element: "#dashboard",
    title: "Under Control",
    description:
      "All of it steered from one dashboard behind 2FA, with a Telegram bot for the road and 500+ automated eval checks keeping the agents honest.",
    side: "top",
    align: "center",
  },

  // ── PentaCMD ────────────────────────────────────────────────────────────
  {
    route: "/slms/pentacmd",
    element: "#use",
    title: "A Model From Scratch",
    description:
      "PentaCMD is a 47M-parameter language model trained from zero — not a fine-tune — on 299K instruction-to-command pairs, hitting roughly 87% exact match.",
    side: "top",
    align: "center",
  },

  // ── Learnings ───────────────────────────────────────────────────────────
  {
    route: "/learnings",
    element: "#tour-learnings",
    title: "The Receipts",
    description:
      "The learning portfolio and the engineering notebook behind the builds — what broke, what the actual fix was, and what generalised.",
    side: "bottom",
    align: "center",
  },

  // ── Résumé ──────────────────────────────────────────────────────────────
  {
    route: "/resume",
    element: "#tour-resume-top",
    title: "The Whole Record",
    description:
      "The full résumé, readable on the page rather than trapped in a PDF — though the PDF is one click away if you want it.",
    side: "bottom",
    align: "center",
  },
  {
    route: "/resume",
    element: "#products",
    title: "Every Product",
    description:
      "Twenty-one systems, and every one of them links through to its own page on this site. Nothing here is a name without a build behind it.",
    side: "top",
    align: "center",
  },

  // ── Contact ─────────────────────────────────────────────────────────────
  {
    route: "/contact",
    element: "#tour-contact-form",
    title: "One Form",
    description:
      "This goes straight to Suman's phone — no mailing list, no autoresponder, no CRM in between.",
    side: "top",
    align: "center",
  },
  {
    route: "/contact",
    element: "#tour-chat",
    title: "Or Just Ask",
    description:
      "The assistant here answers from the same résumé you just walked through. That's the tour — thanks for coming.",
    side: "left",
    align: "end",
  },
];

/** Ordered, de-duplicated list of the routes the tour visits. */
export const TOUR_ROUTES = Array.from(new Set(TOUR_STEPS.map((s) => s.route)));

/**
 * The contiguous run of steps sharing `index`'s route.
 *
 * The runner hands driver.js one chapter at a time rather than the whole
 * script: driver.js has no concept of navigation, so a chapter is exactly as
 * much of the tour as can run without changing the URL.
 */
export function chapterFor(index: number): { start: number; end: number } {
  const route = TOUR_STEPS[index]?.route;
  let start = index;
  let end = index;
  while (start > 0 && TOUR_STEPS[start - 1].route === route) start--;
  while (end < TOUR_STEPS.length - 1 && TOUR_STEPS[end + 1].route === route) end++;
  return { start, end };
}
