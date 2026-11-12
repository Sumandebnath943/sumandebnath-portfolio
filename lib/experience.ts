/**
 * `/experience` — The 9+ year operational marketing & brand leadership record.
 *
 * Prepared for the `/experience` page build (see `EXPERIENCE_PAGE_CONTENT.md`).
 * Follows `PORTFOLIO_HANDOFF.md`, `AEO_PLAYBOOK.md` (§3.1b, §3.3, §3.5), and
 * `WRITING_HUMAN_VOICE.md`.
 *
 * Entity question owned by this route:
 *   "What has Suman Debnath done in his 9+ years of marketing and brand leadership?"
 *
 * Zero overlap with:
 *   /about .... "Who is Suman Debnath?"
 *   /profile .. "What is Suman Debnath known for?"
 *   /resume ... "What is Suman Debnath's experience?"
 *   /projects . "What has Suman Debnath built?"
 *   /faq ...... "What does Suman Debnath do?"
 */

import type { Metadata } from "next";
import { SITE_URL } from "@/lib/projects";
import { FALLBACK_DATE, ROUTE_DATES } from "@/lib/route-dates";
import {
  personRef,
  qaAnswerAuthorship,
  qaAuthorship,
  schemaDateTime,
} from "@/lib/schema";
import type { PageFaq } from "@/lib/page-faqs";

// ── 1. Entity Query, Answer Block & Metadata ──────────────────────────────

export const EXPERIENCE_ROUTE = "/experience" as const;

export const EXPERIENCE_PUBLISHED = "2026-11-12";

export const EXPERIENCE_TITLE =
  "What has Suman Debnath done in his 9+ years of marketing and brand leadership?";

/**
 * Self-contained answer block for `.ex-answer` directly below the H1
 * and for the `QAPage` acceptedAnswer. Names the subject in the first clause
 * and carries checkable career-wide figures without over-indexing on employer names.
 */
export const EXPERIENCE_ANSWER =
  "Over nine-plus years across higher education, multi-brand corporate groups, and consumer brands — alongside building AI-native software under House of Namus — Suman Debnath has supervised a 21-person cross-functional team (12–15 direct, 6–9 indirect across design, web, and digital), managed a 50+ website and 1,000+ webpage institution and brand ecosystem, directed 1,000+ print and digital assets, built 150+ pitch and sales decks, managed ₹30–40L in annual print vendor budgets, and deployed custom AI workflows for creative production and daily CSV data funnels.";

export const experienceMetadata: Metadata = {
  title: { absolute: EXPERIENCE_TITLE },
  description:
    "The operational record of Suman Debnath’s 9+ years in brand and digital marketing leadership: 21-person cross-functional team, 50+ websites (1,000+ webpages), 1,000+ print and digital assets, 150+ decks, event branding, channel partner marketing, and team-wide AI workflows.",
  alternates: { canonical: EXPERIENCE_ROUTE },
  keywords: [
    "what has Suman Debnath done in marketing",
    "Suman Debnath marketing experience",
    "Suman Debnath brand marketing manager",
    "Suman Debnath Senior Brand Marketing Manager",
    "Suman Debnath House of Namus",
    "cross-functional marketing team leadership",
    "multi-website ecosystem management",
    "AI workflows for marketing teams",
    "brand and digital marketing operations India",
  ],
  openGraph: {
    type: "profile",
    url: `${SITE_URL}${EXPERIENCE_ROUTE}`,
    title: EXPERIENCE_TITLE,
    description: EXPERIENCE_ANSWER,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: EXPERIENCE_TITLE,
    description: EXPERIENCE_ANSWER,
  },
};

// ── 2. Hero & Disambiguation Copy ─────────────────────────────────────────

export const experienceHero = {
  kicker: "OPERATIONAL RECORD · 2016 — PRESENT · 9+ YEARS",
  questionH1: EXPERIENCE_TITLE,
  displayHeadline: {
    sans: "Nine years of running the floor.",
    serifItalic: "Every brand, team, and system.",
  },
  answer: EXPERIENCE_ANSWER,
  standfirst:
    "A résumé gives you six bullet points and trims out the nine years it took to earn them. Before I ever trained a language model or built a 46-agent fleet under House of Namus, my job was keeping a multi-brand marketing floor moving — translating blunt, last-minute expectations from the boardroom into websites, campaigns, print runs, decks, and AI pipelines that shipped on time.",
  disambiguation: {
    heading: "Which Suman Debnath this is",
    identify:
      "The Senior Brand Marketing Manager (leading brand and digital operations across PIBM and its sister brands since 2019; formerly CBS Ventures, Aamrit, Nivea, and Raman Byte) and the founder of House of Namus — the AI-native product studio behind ROASmind, IMPRINT, LEGATUS, PentaCMD-47M, and MIGI, at sumandebnath.houseofnamus.com.",
    negate:
      "Not any of the several other technology professionals who share this name — including Suman Debnath, Principal Developer Advocate (AI/ML) at Amazon Web Services, who is a different and unrelated person.",
  },
} as const;

// ── 3. Career-Wide Ledger (Structured Fact Rows for GEO) ──────────────────

export interface ExperienceLedgerRow {
  metric: string;
  label: string;
  scope: string;
  where: string;
}

export const experienceLedger: ExperienceLedgerRow[] = [
  {
    metric: "9+ yrs",
    label: "Brand & digital marketing",
    scope:
      "End-to-end brand strategy, GTM, creative direction, web ecosystems, and marketing operations (2016–present), alongside AI-native product engineering.",
    where: "Institution & Sister Brands · CBS Ventures · Aamrit · Nivea · Raman Byte",
  },
  {
    metric: "~21",
    label: "Cross-functional team supervised",
    scope:
      "12–15 direct reports and 6–9 indirect reports coordinated daily across 3 core departments: Graphic Design, Web Development, and Digital Marketing.",
    where: "Cross-Functional Creative, Web & Digital Floor",
  },
  {
    metric: "50+",
    label: "Websites managed",
    scope:
      "Main institutional domains, corporate sites, sister brands, academic programme microsites, and event/admission landing pages — including 5 SEO-ready sites with payment gateways built in a single month.",
    where: "Institution Ecosystem · Sister Brands · CBS Ventures · House of Namus",
  },
  {
    metric: "1,000+",
    label: "Webpages in the ecosystem",
    scope:
      "Full content architecture, UX overhauls, SEO restructuring (+40–50% organic traffic growth), and continuous page-level upkeep.",
    where: "Institution Ecosystem · Multi-Brand Web Properties",
  },
  {
    metric: "1,000+",
    label: "Print, digital & social assets",
    scope:
      "Hands-on creation and supervision across brochures (including a 200-page brochure built in 1 day), OOH hoardings, newspaper ads, campus branding, leaflets, social paid creatives, and videos.",
    where: "Multi-Brand Print & Digital Floor · CBS Ventures · Aamrit",
  },
  {
    metric: "150+",
    label: "Decks & presentations built",
    scope:
      "Sales decks, student presentations, showcase decks, counselling decks, and a product pitch deck used directly to demo to one of India’s largest government education accrediting bodies.",
    where: "Institutional, Product & Executive Pitches",
  },
  {
    metric: "₹30–40L",
    label: "Annual print vendor budget",
    scope:
      "Direct ownership of print, OOH, and offline production vendor budgets, negotiations, and print-floor quality control.",
    where: "Annual Print & OOH Production Operations",
  },
  {
    metric: "50–100+",
    label: "Event assets in 3 working days",
    scope:
      "Complete 3-day event branding flow executed in 72 hours for a flagship 3-day product launch, alongside year-round convocations, corporate conclaves, and external events.",
    where: "Flagship 3-Day Product Launch & Institutional Events",
  },
];

// ── 4. Functional Pillars (Refined from the 21 Operational Points) ────────

export interface ExperienceFactBullet {
  label: string;
  text: string;
}

export interface ExperiencePillar {
  id: string;
  index: string;
  kicker: string;
  where: string;
  titleSans: string;
  titleSerif: string;
  subheading: string;
  paragraphs: string[];
  facts: ExperienceFactBullet[];
  tags: string[];
}

export const experiencePillars: ExperiencePillar[] = [
  {
    id: "leadership-stakeholders",
    index: "01",
    kicker: "01 / CROSS-FUNCTIONAL LEADERSHIP & STAKEHOLDER ALIGNMENT",
    where: "Cross-Functional Marketing & Creative Floor · Multi-Brand Operations",
    titleSans: "Twenty-one people across three teams.",
    titleSerif: "Shielded from boardroom chaos.",
    subheading:
      "Twenty-one people across design, web, and digital — shielded from boardroom chaos so the work actually ships.",
    paragraphs: [
      "Higher management rarely hands you a clean marketing brief. Across seven years reporting directly to the Chairman and CEO almost every working day — while fielding parallel requests from Admissions, Counselling, Sales, and Academic heads — requirements usually arrived as blunt, unformed expectations with unrealistic deadlines.",
      "My job was to stand between that pressure and the production floor. Across my brand and marketing leadership, I have supervised an extended cross-functional team of nearly 21 people — 12 to 15 reporting directly to me and 6 to 9 indirectly — spanning three core teams: Graphic Design, Web Development, and Digital Marketing. I replaced ad-hoc WhatsApp chasing with platform-wise structured briefs, clear ownership, and revision gates. That system is why the floor held a 99%+ on-time delivery rate across six-plus years without burning the team out.",
    ],
    facts: [
      {
        label: "Direct & indirect supervision",
        text: "~21 people total (12–15 direct reports, 6–9 indirect reports) across design, web, and digital operations.",
      },
      {
        label: "Core teams coordinated daily (3+)",
        text: "Graphic Design, Web Development, and Digital Marketing — interfaced daily with Admissions, Counselling, Sales, and Academic departments.",
      },
      {
        label: "Stakeholder interface",
        text: "Daily direct reporting to the Chairman and CEO alongside internal department heads; end-to-end creative and HR screening oversight at CBS Ventures.",
      },
    ],
    tags: [
      "21-Person Team",
      "12–15 Direct Reports",
      "Design · Web · Digital",
      "Stakeholder Translation",
      "99%+ On-Time Delivery",
    ],
  },
  {
    id: "web-ecosystem",
    index: "02",
    kicker: "02 / MULTI-SITE ARCHITECTURE & WEB STRATEGY",
    where: "Institution Ecosystem · Sister Brands · CBS Ventures · House of Namus",
    titleSans: "Fifty-plus websites.",
    titleSerif: "A thousand-page ecosystem.",
    subheading:
      "Managing 50+ websites and a 1,000+ webpage ecosystem means treating web pages as operating infrastructure, not brochures.",
    paragraphs: [
      "A single company website is a design project; fifty websites across a thousand-plus webpages is a logistics problem. Over the last nine years I have led overall website strategy, information architecture, UX overhauls, and day-to-day upkeep across 50+ websites and ~1,000+ webpages — spanning main institutional sites, corporate domains, sister brands, academic programme microsites, and high-conversion admission and event landing pages.",
      "Across the core institution ecosystem, restructuring the content architecture, technical SEO, and page UX grew organic traffic by 40–50%. At CBS Ventures, I owned website design, development oversight, and conversion optimization from day one. When speed mattered, I shipped 5 complete, SEO-ready websites with live payment gateways in a single month — and later used AI-assisted development workflows to compress full website redesign and launch cycles from several weeks down to hours.",
    ],
    facts: [
      {
        label: "Footprint",
        text: "50+ websites and ~1,000+ webpages managed across main institutional sites, corporate domains, sister brands, programme microsites, and admission/event landing pages.",
      },
      {
        label: "Measured outcome",
        text: "40–50% organic website traffic growth via SEO restructuring and UX overhaul; 5 SEO-ready websites with payment gateways shipped in 1 month.",
      },
      {
        label: "Lifecycle ownership",
        text: "Information architecture, wireframing, copy direction, design coordination, dev QA, payment gateway integration, and search performance.",
      },
    ],
    tags: [
      "50+ Websites",
      "1,000+ Webpages",
      "Institution Ecosystem",
      "+40–50% Organic Traffic",
      "Technical SEO & UX",
    ],
  },
  {
    id: "brand-identity-governance",
    index: "03",
    kicker: "03 / BRAND ARCHITECTURE & OMNI-CHANNEL CONSISTENCY",
    where: "CBS Ventures · Sister Brands & New Launches · Aamrit · Nivea · House of Namus",
    titleSans: "Built from zero.",
    titleSerif: "Held together across every surface.",
    subheading:
      "Building brand identities from zero and keeping them recognisable across print, web, campus, and digital.",
    paragraphs: [
      "When a cross-functional floor and half a dozen external vendors produce assets every day, a brand fractures in a month unless someone guards the spine. At CBS Ventures, I developed the brand identity and digital marketing strategy from the ground up — positioning, visual language, website, and channel voice. Across my higher-education tenure, I built new sister brands and academic programme identities from scratch and enforced brand consistency across every digital and offline asset for seven years.",
      "Earlier stints across Aamrit, Nivea, and Raman Byte Pvt Ltd grounded that instinct in how consumer brands behave on shelves and in the field — while House of Namus extends that zero-to-one brand architecture into my own AI-native product suite. Whether an audience met a brand on a highway hoarding, a newspaper ad, a prospectus, a landing page, or a paid social reel, the typography, tone, and positioning held together as one hand.",
    ],
    facts: [
      {
        label: "Zero-to-one brand builds",
        text: "Full brand identity and digital strategy built from scratch at CBS Ventures, new sister brands and programme identities, and the standalone House of Namus AI product ecosystem.",
      },
      {
        label: "Dual-medium governance",
        text: "Simultaneous ownership of Print and Digital media content and communications across all internal and external touchpoints.",
      },
    ],
    tags: [
      "Ground-Up Brand Identity",
      "Sister Brands",
      "Print & Digital Consistency",
      "Multi-Brand Architecture",
    ],
  },
  {
    id: "creative-production-print-budget",
    index: "04",
    kicker: "04 / PRINT, OOH & DIGITAL PRODUCTION AT SCALE",
    where: "Institutional Print & Digital Floor · CBS Ventures · Aamrit",
    titleSans: "A thousand-plus assets shipped.",
    titleSerif: "Print presses don’t take hotfixes.",
    subheading:
      "1,000+ print, OOH, and digital assets shipped — backed by a ₹30–40L annual print vendor budget.",
    paragraphs: [
      "Digital marketers often freeze when handed a print press deadline where a typo costs lakhs and cannot be patched after deployment. I have personally worked on and supervised content and design across 1,000+ print, digital, and social media materials — brochures, OOH hoardings, newspaper advertisements, campus branding installations, leaflets, admission campaigns, social creatives, and video assets.",
      "Across my current seven-year tenure, I owned the ₹30–40L annual print and production vendor budget end to end: negotiating vendor rates, writing and reviewing copy, directing layouts, checking colour proofs, and managing the print media funnel from first brief to physical delivery. When a crisis required a 200-page institutional brochure in a single day, I built and delivered it in one sitting.",
    ],
    facts: [
      {
        label: "Asset volume",
        text: "1,000+ print, OOH, digital, and social media materials written, designed, or supervised.",
      },
      {
        label: "Print vendor budget",
        text: "₹30–40L annual print vendor budget managed across print runs, OOH hoardings, newspaper ads, and campus collateral.",
      },
      {
        label: "Benchmark sprint",
        text: "200-page brochure designed and completed in a single day.",
      },
    ],
    tags: [
      "1,000+ Assets",
      "₹30–40L Print Vendor Budget",
      "OOH & Newspaper Ads",
      "200-Page Brochure in 1 Day",
      "Print & Digital",
    ],
  },
  {
    id: "performance-social-partners",
    index: "05",
    kicker: "05 / PAID ACQUISITION, SOCIAL CALENDARS, EMAILERS & PARTNER OUTREACH",
    where: "20+ Programme Launches · CBS Ventures · Aggregators & Channel Partners",
    titleSans: "Paid ads, social calendars, emailers.",
    titleSerif: "And every partner in the funnel.",
    subheading:
      "Full-funnel campaign strategy across paid ads, social calendars, emailers, and external channel partners.",
    paragraphs: [
      "Running acquisition for higher education and multi-brand ecosystems means orchestrating channels you own alongside partners you don’t. Across 20+ domestic and international programme launches, I planned and executed integrated social media and performance campaigns — directing paid ad creative production, campaign architecture, remarketing funnels, and budget-planning frameworks across Google and Meta (owning the creative strategy, targeting logic, and budget-planning inputs, while direct media-buying card spend sat with the disbursement desk).",
      "On owned channels, I built platform-wise social media strategies, monthly content calendars, and recurring emailer and newsletter workflows for admissions nurturing and event communication. Externally, I managed marketing collateral pipelines and coordinated paid outreach with external channel partners, major education aggregators, regional admission partners, and partner brands.",
    ],
    facts: [
      {
        label: "Paid media scope",
        text: "Ad creative production, performance campaign strategy, remarketing architecture, and budget planning (non-media-spend-card handling) across Google Ads and Meta Ads.",
      },
      {
        label: "Owned channels",
        text: "Platform-wise social media strategy, structured content calendars, admission emailer sequences, and newsletters.",
      },
      {
        label: "Channel partner ecosystem",
        text: "Collateral pipelines and paid outreach coordination for education aggregators, regional admission partners, and external channel partners across 20+ GTM launches.",
      },
    ],
    tags: [
      "Paid Ads Strategy & Creative",
      "Remarketing & Budget Planning",
      "Social Calendars & Emailers",
      "Aggregators & Channel Partners",
      "20+ GTM Launches",
    ],
  },
  {
    id: "decks-events-launches",
    index: "06",
    kicker: "06 / PITCH DECKS, SALES ENABLEMENT & EVENT BRANDING FLOWS",
    where: "Executive & Sales Enablement · Govt. Accreditation Demo · 3-Day Flagship Launch",
    titleSans: "150+ high-stakes decks.",
    titleSerif: "And a 3-day launch built in 72 hours.",
    subheading:
      "150+ pitch, sales, and counselling decks — and 50–100+ event branding assets delivered in three working days.",
    paragraphs: [
      "I hate making PowerPoints, and I have built or repaired 150+ of them because a weak deck loses the room before the speaker finishes talking. Over nine years I have created and supervised 150+ sales decks, corporate pitch decks, product showcase decks, student presentations, and admissions counselling decks. One of my product pitch decks was taken straight into a live product demonstration before one of India’s largest government education accrediting bodies.",
      "On the ground, I oversaw the entire branding flow for internal and external events year-round. The sharpest test was a massive 3-day flagship product launch event where I directly managed and shipped 50 to 100+ distinct branding materials in just 3 working days, taking every backdrop, standee, badge, screen graphic, and print piece from brief to installation without a single missed cue.",
    ],
    facts: [
      {
        label: "Deck volume",
        text: "150+ sales decks, pitch decks, product showcase decks, student presentations, and counselling decks created and repaired.",
      },
      {
        label: "High-stakes proof",
        text: "Product pitch deck used directly for a live product demo to one of India’s largest government education accrediting bodies.",
      },
      {
        label: "Flagship event execution",
        text: "Managed 50–100+ branding assets in 3 working days for a massive 3-day flagship product launch, plus year-round internal and external institutional events.",
      },
    ],
    tags: [
      "150+ Decks Built & Repaired",
      "Govt. Accreditor Pitch Demo",
      "3-Day Flagship Product Launch",
      "50–100+ Event Assets in 3 Days",
      "Sales & Counselling Enablement",
    ],
  },
  {
    id: "ai-workflows-team-adoption",
    index: "07",
    kicker: "07 / APPLIED AI WORKFLOWS & TEAM ADOPTION",
    where: "Marketing & Design Production Floor · House of Namus",
    titleSans: "AI pipelines on a real floor.",
    titleSerif: "Thousands of CSV rows and hours back every day.",
    subheading:
      "Turning AI from a buzzword into daily team pipelines for CSV data merging, ad creatives, and web launches.",
    paragraphs: [
      "Most teams talk about AI adoption and stop at writing captions in ChatGPT. Before building standalone AI products under House of Namus, I used my own marketing floor as the proving ground — finding the tasks that ate hours of human life and replacing them with repeatable AI workflows. I built multiple AI-driven data funnels to clean, reconcile, and merge thousands of rows of fragmented CSV lead and student data every single day, eliminating hours of manual spreadsheet work.",
      "For the creative floor, I built a custom GPT workflow that converts raw student photographs into studio-grade corporate portraits (saving 7–8 hours of manual Photoshop retouching per week), introduced a GenAI ad-creative pipeline saving 2–3 hours daily, and used AI-assisted development to cut website redesign and launch cycles from weeks to hours — while training the cross-functional team to run these workflows in their daily tasks.",
    ],
    facts: [
      {
        label: "Daily CSV data funnels",
        text: "Multiple AI funnels merging, cleaning, and reconciling thousands of rows of CSV data every day.",
      },
      {
        label: "Creative & web speedups",
        text: "7–8 hours/week saved via custom student-portrait GPT; 2–3 hours/day saved via GenAI ad-creative pipeline; website launches compressed from weeks to hours.",
      },
      {
        label: "Team adoption",
        text: "Hands-on upskilling and daily workflow integration across graphic design, content, web, and digital marketing teams.",
      },
    ],
    tags: [
      "CSV Data-Merging AI Funnels",
      "Custom Portrait GPT (-7–8 hrs/wk)",
      "GenAI Ad Pipeline (-2–3 hrs/day)",
      "Team-Wide AI Adoption",
    ],
  },
];

// ── 5. Pillar 08 — The Honest Postscript (Point #21) ──────────────────────

export const experiencePostscript = {
  index: "08",
  kicker: "08 / THE UNGLAMOROUS REALITY OF THE FLOOR",
  titleSans: "And more small, small things.",
  titleSerif: "Slogging like a dead panda.",
  subheading:
    "What job descriptions leave out: midnight proof fixes, online reputation fires, and slogging like a dead panda.",
  lead:
    "Any nine-year marketing record that reads like a clean executive summary is lying to you. Half the job is the unglamorous work that never makes it onto a LinkedIn headline because nobody wants to admit they did it:",
  items: [
    {
      label: "Online Reputation Management (ORM)",
      text: "Standing between an institution and the internet on a bad day — handling hostile threads, review spikes, and narrative fires in real time.",
    },
    {
      label: "Midnight surgery on broken files",
      text: "Staying up the entire night fixing broken copy, corrupt print bleeds, and misaligned layouts because the press starts rolling at 6 a.m. and the deadline was already impossible when higher management handed it over at 8 p.m.",
    },
    {
      label: "Hands-on video & photo work",
      text: "Scripting videos, sitting in the edit bay cutting footage, retouching photos, and shooting when no crew was available.",
    },
    {
      label: "Ugly-but-practical marketing collateral",
      text: "Designing loud, unpretentious, hyper-practical admission leaflets, fee tables, and WhatsApp flyers that would never win a design award — because their job was to explain a course to a parent in thirty seconds and convert, not impress another designer.",
    },
    {
      label: "Slogging like a dead panda",
      text: "Taking interviews when HR was swamped, haggling with print vendors over paper GSM, debugging broken lead forms, and dragging impossible requests across the finish line.",
    },
  ],
  closer:
    "That grind is the exact reason I founded House of Namus and started building AI systems. You only know which parts of marketing need to be automated when you have spent nine years doing them at two in the morning.",
} as const;

// ── 6. Cross-Company & Venture Attribution Matrix ─────────────────────────

export interface CompanyAttribution {
  org: string;
  shortLabel: string;
  kind: "employment" | "venture";
  role: string;
  period: string;
  location: string;
  scopeSummary: string;
  pillarIds: string[];
}

export const companyAttributions: CompanyAttribution[] = [
  {
    org: "Multi-Brand Higher-Education Group & Sister Brands (PIBM)",
    shortLabel: "Institution & Sister Brands",
    kind: "employment",
    role: "Senior Brand Marketing Manager",
    period: "March 2019 – Present",
    location: "Pune, India",
    scopeSummary:
      "All 8 operational pillars: multi-department supervision across Design, Web, and Digital; 50+ websites / 1,000+ webpages institution ecosystem; ₹30–40L annual print vendor budget; 1,000+ print/digital assets; 150+ decks (incl. Govt. accreditor demo); 3-day flagship product launch (50–100+ assets in 3 working days); aggregator/channel partner outreach; daily CSV & creative AI workflows; ORM; and daily CEO/Chairman reporting.",
    pillarIds: [
      "leadership-stakeholders",
      "web-ecosystem",
      "brand-identity-governance",
      "creative-production-print-budget",
      "performance-social-partners",
      "decks-events-launches",
      "ai-workflows-team-adoption",
    ],
  },
  {
    org: "CBS Ventures",
    shortLabel: "CBS Ventures",
    kind: "employment",
    role: "Branding & Digital Marketing Manager",
    period: "January 2018 – October 2018",
    location: "Kerala / Pune, India",
    scopeSummary:
      "Developed brand identity and digital marketing strategy from the ground up; owned website design, development oversight, and UX; executed SEO, SEM, paid social, and organic campaigns; managed external agencies and vendors; produced print, video, and poster collateral; conducted recruitment interviews.",
    pillarIds: [
      "leadership-stakeholders",
      "web-ecosystem",
      "brand-identity-governance",
      "creative-production-print-budget",
      "performance-social-partners",
    ],
  },
  {
    org: "Aamrit · Nivea · Raman Byte Pvt Ltd",
    shortLabel: "Aamrit · Nivea · Raman Byte",
    kind: "employment",
    role: "Marketing Executive & Early Career Stints",
    period: "2016 – 2018",
    location: "India",
    scopeSummary:
      "Foundational consumer-brand operations, field and channel marketing execution, print and campaign collateral support, and retail brand communication.",
    pillarIds: [
      "brand-identity-governance",
      "creative-production-print-budget",
      "performance-social-partners",
    ],
  },
  {
    org: "World of Lamborghini (WOLAMBO)",
    shortLabel: "WOLAMBO (Media)",
    kind: "venture",
    role: "Founder & Independent Media Operator",
    period: "2013 – Present",
    location: "Kolkata & Pune, India",
    scopeSummary:
      "Self-built automotive media and content property: 82,000+ community built from zero, 677,503 organic single-post reach, and 31,541 weekly blog visitors on wolambo.weebly.com.",
    pillarIds: ["web-ecosystem", "brand-identity-governance"],
  },
  {
    org: "House of Namus",
    shortLabel: "House of Namus (AI Studio)",
    kind: "venture",
    role: "Founder & AI-Native Product Builder",
    period: "2024 – Present",
    location: "houseofnamus.com · Pune & Kolkata",
    scopeSummary:
      "Independent AI-native product studio and umbrella brand where nine years of marketing-floor bottlenecks are turned into working software: 21+ shipped products including ROASmind (200K+ LoC), IMPRINT, LEGATUS, CITE, EMBER, D-PE.ai, PentaCMD-47M, Pentashell, MIGI (46-agent fleet), Banking RM Copilot, AEGIS VAULT, That One Crawler, PixelVille, and NUNO.",
    pillarIds: [
      "web-ecosystem",
      "brand-identity-governance",
      "ai-workflows-team-adoption",
    ],
  },
];

// ── 7. Page-Scoped FAQs (for `lib/page-faqs.ts` under `"/experience"`) ────

export const experiencePageFaqs: PageFaq[] = [
  {
    q: "How large was the marketing and creative team Suman Debnath supervised?",
    a: "Across his brand and digital marketing leadership, Suman Debnath supervised a cross-functional team of nearly 21 people spanning three core departments: graphic design, web development, and digital marketing. Between 12 and 15 team members reported to him directly, with the remaining 6 to 9 reporting indirectly across shared campaign and institutional workflows, while he also coordinated daily with admissions, counselling, sales, and academic stakeholders.",
  },
  {
    q: "What did Suman Debnath's 50+ website and 1,000+ webpage ecosystem include?",
    a: "Across nine-plus years of brand and digital leadership, Suman Debnath managed more than 50 websites totaling over 1,000 webpages. The institution and brand ecosystem covered main institutional and corporate domains, sister brands, academic programme microsites, and event and admissions landing pages — including five SEO-ready websites with integrated payment gateways built and launched within a single month.",
  },
  {
    q: "How did Suman Debnath use AI workflows inside a traditional marketing team?",
    a: "Before building standalone AI software under House of Namus, Suman Debnath deployed operational AI pipelines on his marketing and design production floor. These included automated AI funnels for merging and cleaning thousands of rows of CSV lead and student data daily, a custom GPT workflow that turned raw student photos into corporate portraits (saving 7–8 hours of manual editing per week), and GenAI ad-creative and web-launch pipelines that cut production cycles from weeks to hours.",
  },
  {
    q: "Did Suman Debnath manage marketing budgets and paid advertising?",
    a: "Suman Debnath directly owned a ₹30–40L annual print and offline production vendor budget covering brochures, OOH hoardings, newspaper ads, and event collateral. On the paid digital side, he led campaign strategy, ad creative production, remarketing architecture, external channel-partner paid outreach, and budget planning across Google and Meta, without directly holding the media-buying spend card.",
  },
];

// ── 8. JSON-LD Structured Data Nodes ──────────────────────────────────────

export const experienceProfilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}${EXPERIENCE_ROUTE}#profilepage`,
  url: `${SITE_URL}${EXPERIENCE_ROUTE}`,
  name: EXPERIENCE_TITLE,
  description: EXPERIENCE_ANSWER,
  dateModified: schemaDateTime(ROUTE_DATES[EXPERIENCE_ROUTE] ?? FALLBACK_DATE),
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: personRef,
  about: { "@id": `${SITE_URL}/#person` },
  significantLink: [
    `${SITE_URL}/resume`,
    `${SITE_URL}/profile`,
    `${SITE_URL}/projects`,
    `${SITE_URL}/about`,
  ],
};

export const experienceQaPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  "@id": `${SITE_URL}${EXPERIENCE_ROUTE}#trackrecord`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "Question",
    name: EXPERIENCE_TITLE,
    text: EXPERIENCE_TITLE,
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

export const experiencePillarsItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}${EXPERIENCE_ROUTE}#pillars`,
  name: "Suman Debnath — 9+ Years of Brand & Digital Marketing Operations",
  numberOfItems: experiencePillars.length,
  itemListElement: experiencePillars.map((pillar, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${pillar.titleSans} ${pillar.titleSerif}`,
    description: `${pillar.subheading} (${pillar.where})`,
    url: `${SITE_URL}${EXPERIENCE_ROUTE}#${pillar.id}`,
  })),
};

export const experienceSchemas = [
  experienceProfilePageJsonLd,
  experienceQaPageJsonLd,
  experiencePillarsItemListJsonLd,
];
