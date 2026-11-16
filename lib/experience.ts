/**
 * `/experience` — the scale of the marketing operation Suman has run.
 *
 * Rebuilt 16 Nov 2026 from a first version made with another tool. What the
 * rebuild changed, and why, so nobody walks it back by accident:
 *
 * ── The question this page owns ───────────────────────────────────────────
 *   "How big a marketing operation has Suman Debnath run?"
 *
 * The first version claimed "What has Suman Debnath done in his 9+ years of
 * marketing…", which is the same question /resume already owns ("What is Suman
 * Debnath's experience?") in more words. Two URLs answering one question is the
 * collision in AEO_PLAYBOOK.md §3.1b — Google keeps one and discounts the other.
 * This page owns the *scale* question only: team, sites, budget, volume.
 * Chronology, employers and education stay on /resume.
 *
 * ── No namesake on this page ──────────────────────────────────────────────
 * The first version named the AWS developer advocate in a visible
 * "disambiguation" box. AEO_PLAYBOOK.md §6 rules that negation lives on /about
 * and /faq and nowhere else ("do not host the competing token"). Do not add it.
 *
 * ── The employer is named once ────────────────────────────────────────────
 * Suman's choice (16 Nov 2026): PIBM is named once, on the timeline, and is
 * "a multi-brand higher-education group" everywhere else. /resume and the
 * Person schema name it plainly; that is fine — this page is about scale.
 *
 * ── Facts are squared with lib/resume.ts and lib/journey.ts ───────────────
 *   • Aamrit, Nivea, Raman Byte were MBA internships (summers/winters), not a
 *     two-year executive role.
 *   • WOLAMBO is a past project (2013 – c. 2016). /journey: "I have not posted
 *     on it in about ten years." Never present tense.
 *   • CBS Ventures was Pune.
 *   • ₹30–40L is the print/OOH/production vendor budget (/resume's PIBM bullet).
 *     The ₹40–60L in the /resume summary is total budgets — a different figure.
 *
 * Every number is stated once in the body (the scale wall). The hero repeats
 * four of them as the summary, and nothing else repeats them.
 */

import type { Metadata } from "next";
import { SITE_URL } from "@/lib/projects";
import { FALLBACK_DATE, ROUTE_DATES } from "@/lib/route-dates";
import { personRef, qaAnswerAuthorship, qaAuthorship, schemaDateTime } from "@/lib/schema";

export const EXPERIENCE_ROUTE = "/experience" as const;

/** The entity query this route owns. Title, h1 and QAPage carry it verbatim. */
export const EXPERIENCE_QUESTION = "How big a marketing operation has Suman Debnath run?";

/** 40–60 words, subject in the first clause, survives being quoted alone. */
export const EXPERIENCE_ANSWER =
  "Suman Debnath has spent nine years running brand and digital marketing operations: a 21-person design, web and digital team, 50+ websites with 1,000+ pages, a ₹30–40L annual print budget, 1,000+ print and digital assets and 150+ decks — most of it for a multi-brand higher-education group in Pune, where he has been Senior Brand Marketing Manager since 2019.";

const DESCRIPTION =
  "Suman Debnath's marketing operation in numbers: a 21-person design, web and digital team, 50+ websites, 1,000+ assets, 150+ decks, a ₹30–40L print budget.";

export const experienceMetadata: Metadata = {
  title: { absolute: EXPERIENCE_QUESTION },
  description: DESCRIPTION,
  alternates: { canonical: EXPERIENCE_ROUTE },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}${EXPERIENCE_ROUTE}`,
    title: EXPERIENCE_QUESTION,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: EXPERIENCE_QUESTION,
    description: DESCRIPTION,
  },
};

// ── Hero ──────────────────────────────────────────────────────────────────

export const experienceHero = {
  kicker: "Brand & digital marketing · 2018 – present · Pune",
  display: {
    sans: "Nine years of running the floor.",
    serif: "And what it taught me to automate.",
  },
  standfirst:
    "A résumé gives you six bullet points and drops the nine years it took to earn them. Before I trained a language model or built a 46-agent fleet, my job was keeping a multi-brand marketing floor moving: turning blunt, last-minute requests from the boardroom into websites, print runs, decks and campaigns that shipped on time.",
  stats: [
    { value: "21", label: "people supervised" },
    { value: "50+", label: "websites run" },
    { value: "1,000+", label: "assets shipped" },
    { value: "₹30–40L", label: "print budget a year" },
  ],
} as const;

// ── Timeline ──────────────────────────────────────────────────────────────
// Years as decimals (month / 12) so bars sit where the dates say. `end: null`
// is "present". Rendered as a Gantt on wide screens and a list on phones.

export const TIMELINE_START = 2013;
export const TIMELINE_END = 2027;

export interface TimelineRow {
  period: string;
  role: string;
  org: string;
  start: number;
  end: number | null;
  kind: "job" | "internship" | "independent";
  accent: string;
}

export const experienceTimeline: TimelineRow[] = [
  {
    period: "2013 – c. 2016",
    role: "Founder",
    org: "WOLAMBO, an automotive media page grown to 82,000+ followers",
    start: 2013,
    end: 2016,
    kind: "independent",
    accent: "#7C3AED",
  },
  {
    period: "2016 – 2018",
    role: "MBA internships",
    org: "Aamrit, Nivea, Raman Byte Pvt Ltd",
    start: 2016.5,
    end: 2018,
    kind: "internship",
    accent: "#0891B2",
  },
  {
    period: "Jan – Oct 2018",
    role: "Branding & Digital Marketing Manager",
    org: "CBS Ventures, Pune",
    start: 2018,
    end: 2018.83,
    kind: "job",
    accent: "#DB2777",
  },
  {
    period: "Mar 2019 – present",
    role: "Senior Brand Marketing Manager",
    org: "PIBM and its sister brands, Pune",
    start: 2019.17,
    end: null,
    kind: "job",
    accent: "#D97706",
  },
  {
    period: "2024 – present",
    role: "Founder, alongside the day job",
    org: "House of Namus, an independent AI product studio",
    start: 2024,
    end: null,
    kind: "independent",
    accent: "#059669",
  },
];

// ── The scale wall ────────────────────────────────────────────────────────
// One row per capability. `figure` is the number that proves it, said once.

export interface ScaleFact {
  label: string;
  value: string;
}

export interface ScaleRow {
  id: string;
  figure: string;
  unit: string;
  accent: string;
  heading: string;
  body: string[];
  facts: ScaleFact[];
}

export const scaleRows: ScaleRow[] = [
  {
    id: "leadership-stakeholders",
    figure: "21",
    unit: "people across design, web and digital",
    accent: "#2DD4BF",
    heading: "Twenty-one people, kept clear of the boardroom so the work ships.",
    body: [
      "Nobody upstairs hands you a clean brief. For seven years I have reported to the Chairman and CEO almost every working day, while Admissions, Counselling, Sales and the academic heads send their own requests in parallel. Most arrive as a deadline and a feeling.",
      "My job is to stand between that and the team. I replaced WhatsApp chasing with written, platform-wise briefs, one named owner per job and fixed revision rounds. That system is why 99% of projects have landed on time for six years without burning anyone out.",
    ],
    facts: [
      { label: "Direct reports", value: "12–15" },
      { label: "Indirect", value: "6–9" },
      { label: "Teams", value: "Graphic design, web development, digital marketing" },
      { label: "On time", value: "99%+ of projects, 6+ years" },
    ],
  },
  {
    id: "web-ecosystem",
    figure: "50+",
    unit: "websites, 1,000+ pages",
    accent: "#38BDF8",
    heading: "Fifty websites is a logistics problem, not a design project.",
    body: [
      "Main institutional sites, sister brands, programme microsites, admission and event landing pages. I own the strategy, the information architecture and the upkeep across all of them, which mostly means knowing which of a thousand pages is quietly wrong today.",
      "Restructuring the content, the technical SEO and the page UX grew organic traffic by 40–50%. When speed mattered I shipped five SEO-ready sites with live payment gateways in one month. AI-assisted development has since cut a full redesign from weeks to hours.",
    ],
    facts: [
      { label: "Organic traffic", value: "+40–50%" },
      { label: "Fastest build", value: "5 sites with payment gateways in 1 month" },
      { label: "Owned", value: "IA, copy direction, design, dev QA, SEO" },
    ],
  },
  {
    id: "brand-identity-governance",
    figure: "0→1",
    unit: "brands built from nothing",
    accent: "#A78BFA",
    heading: "Brands built from a blank page, then held together on every surface.",
    body: [
      "At CBS Ventures in 2018 I built the brand from nothing: positioning, visual language, website and channel voice. Since 2019 I have built new sister brands and programme identities the same way, and later House of Namus.",
      "Building one is the easy half. With a team and half a dozen vendors producing every day, a brand fractures within a month unless someone guards it. A hoarding, a newspaper ad, a prospectus and a paid reel should all look like the same hand made them.",
    ],
    facts: [
      { label: "Built from scratch", value: "CBS Ventures, sister brands, programme identities, House of Namus" },
      { label: "Governed", value: "Print and digital, under one owner" },
    ],
  },
  {
    id: "creative-production-print-budget",
    figure: "1,000+",
    unit: "print, OOH and digital assets",
    accent: "#FBBF24",
    heading: "A thousand print and digital assets, where a typo costs lakhs.",
    body: [
      "Print does not take hotfixes. Brochures, hoardings, newspaper ads, campus branding, leaflets, social creatives and video: I have written, designed or signed off on more than a thousand of them.",
      "I own the ₹30–40L annual vendor budget end to end. That means rates, copy, layouts, colour proofs and the press run itself. Once, a 200-page brochure was needed in a day. I built it in one sitting.",
    ],
    facts: [
      { label: "Vendor budget", value: "₹30–40L a year, print, OOH and production" },
      { label: "Fastest job", value: "200-page brochure in one day" },
    ],
  },
  {
    id: "performance-social-partners",
    figure: "20+",
    unit: "programme launches",
    accent: "#FB7185",
    heading: "Twenty launches, run across paid, owned and partner channels at once.",
    body: [
      "Each academic programme launch got the full go-to-market: brief, landing pages, SEO and lead campaigns on Google and Meta. I own the ad creative, the campaign structure, the remarketing and the budget plan. The media card itself sits with the accounts desk.",
      "On owned channels it is platform-wise social strategy, monthly calendars, admission emailers and newsletters. Outside, it is collateral and paid outreach for education aggregators and regional admission partners.",
    ],
    facts: [
      { label: "Paid", value: "Google Ads and Meta Ads: creative, structure, remarketing, budget planning" },
      { label: "Owned", value: "Social calendars, emailers, newsletters" },
      { label: "Partners", value: "Education aggregators, regional admission partners" },
    ],
  },
  {
    id: "decks-events-launches",
    figure: "150+",
    unit: "decks and presentations",
    accent: "#A3E635",
    heading: "A hundred and fifty decks, and a three-day launch branded in three days.",
    body: [
      "I dislike making PowerPoints and have built or repaired more than 150 of them: sales, pitch, product showcase, counselling. One went straight into a live product demo for one of India's largest government education accrediting bodies.",
      "Events run all year, from convocations to corporate conclaves. The sharpest test was a three-day flagship product launch: 50 to 100 branding pieces, backdrops to badges to screen graphics, from brief to installation in three working days.",
    ],
    facts: [
      { label: "Highest stakes", value: "Live demo for a government education accreditor" },
      { label: "Fastest event", value: "50–100 assets in 3 working days" },
    ],
  },
  {
    id: "ai-workflows-team-adoption",
    figure: "2–3 h",
    unit: "saved every day by one pipeline",
    accent: "#FB923C",
    heading: "AI pipelines that gave a working marketing team hours back every day.",
    body: [
      "Before House of Namus, the team was my test bench. I looked for the tasks that ate the most hours and replaced them. AI funnels now clean and merge thousands of rows of lead and student CSV data every day.",
      "A custom GPT turns raw student photos into studio-grade portraits and removed 7–8 hours of retouching a week. A generative ad-creative pipeline saves 2–3 hours a day. Then I trained the team to run them day to day.",
    ],
    facts: [
      { label: "Data", value: "Thousands of CSV rows merged and cleaned daily" },
      { label: "Portraits", value: "7–8 hours a week of retouching removed" },
      { label: "Ad creative", value: "2–3 hours saved a day" },
    ],
  },
];

// ── Postscript ────────────────────────────────────────────────────────────
// His own phrasing ("small, small things", "dead panda"). Keep it.

export const experiencePostscript = {
  id: "honest-postscript",
  sans: "And more small, small things.",
  serif: "Slogging like a dead panda.",
  lead: "Any nine-year marketing record that reads like a clean executive summary is leaving out half the job. This half:",
  items: [
    {
      label: "Online reputation",
      text: "Hostile threads, review spikes and small fires, handled as they happened.",
    },
    {
      label: "Midnight file surgery",
      text: "Broken copy, bad bleeds and misaligned layouts fixed overnight, because the brief came at 8 p.m. and the press ran at 6 a.m.",
    },
    {
      label: "Video and photo",
      text: "Scripting, cutting footage, retouching and shooting when no crew was free.",
    },
    {
      label: "Ugly, useful collateral",
      text: "Fee tables and WhatsApp flyers that will win no award. Their job was to explain a course to a parent in thirty seconds.",
    },
    {
      label: "Everything else",
      text: "Interviews when HR was swamped, arguing paper GSM with vendors, debugging lead forms.",
    },
  ],
  closer:
    "That grind is why I started House of Namus. You only know which parts of marketing to automate after doing them at two in the morning for nine years.",
} as const;

// ── Structured data ───────────────────────────────────────────────────────

const PUBLISHED = "2026-11-12";

export const experienceProfilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}${EXPERIENCE_ROUTE}#profilepage`,
  url: `${SITE_URL}${EXPERIENCE_ROUTE}`,
  name: EXPERIENCE_QUESTION,
  description: EXPERIENCE_ANSWER,
  dateCreated: schemaDateTime(PUBLISHED),
  dateModified: schemaDateTime(ROUTE_DATES[EXPERIENCE_ROUTE] ?? FALLBACK_DATE),
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: personRef,
  about: { "@id": `${SITE_URL}/#person` },
};

export const experienceQaPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  "@id": `${SITE_URL}${EXPERIENCE_ROUTE}#scale`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "Question",
    name: EXPERIENCE_QUESTION,
    text: EXPERIENCE_QUESTION,
    answerCount: 1,
    ...qaAuthorship,
    acceptedAnswer: {
      "@type": "Answer",
      text: EXPERIENCE_ANSWER,
      url: `${SITE_URL}${EXPERIENCE_ROUTE}`,
      ...qaAnswerAuthorship,
    },
  },
};

export const experienceSchemas = [experienceProfilePageJsonLd, experienceQaPageJsonLd];
