# `/experience` — SEO, AEO & GEO Content Specification

> [!IMPORTANT]
> **Voice & Architecture Guardrails**
> - **Do not copy `career-experience.html`.** This content follows the portfolio’s house rules in `PORTFOLIO_HANDOFF.md`, `AEO_PLAYBOOK.md`, and `WRITING_HUMAN_VOICE.md`: concrete over adjectival, constraint before resolution, two-register headlines (**bold sans** + *Instrument Serif italic*), DM Mono kickers, structured fact rows, and an honest postscript.
> - **Keyword Discipline:** `"PIBM"` appears only twice on the entire page (once in the Hero Disambiguation and once on the Employment Attribution card); `"Uddipan"` appears **0 times**; `"sister brands"` and `"Institution Ecosystem"` are used throughout; the `~21` team supervision figure is framed career-wide across Design, Web, and Digital (never attributed directly to PIBM); **House of Namus** is separated into its own standalone AI-Native Product Studio section/card; and client-site references are omitted.
> - **Zero blacklisted AI vocabulary:** Do not introduce words like *delves, underscores, meticulously, showcasing, intricacies, expediting, intricate, surpassing, commendable,* or *pioneers*.

---

## 1. Route, Metadata & Entity Question Ownership (`AEO_PLAYBOOK.md` §3.1b)

- **Route:** `/experience`
- **Canonical URL:** `https://sumandebnath.houseofnamus.com/experience`
- **Owned Entity Query:** `"What has Suman Debnath done in his 9+ years of marketing and brand leadership?"`
  *(Zero collision with `/about` ["Who is…"], `/profile` ["What is he known for?"], `/resume` ["What is his experience?"], `/projects` ["What has he built?"], or `/faq` ["What does he do?"].)*

### `metadata` block (`lib/experience.ts`)

```ts
const TITLE =
  "What has Suman Debnath done in his 9+ years of marketing and brand leadership?";

const ANSWER =
  "Over nine-plus years across higher education, multi-brand corporate groups, and consumer brands — alongside building AI-native software under House of Namus — Suman Debnath has supervised a 21-person cross-functional team (12–15 direct, 6–9 indirect across design, web, and digital), managed a 50+ website and 1,000+ webpage institution and brand ecosystem, directed 1,000+ print and digital assets, built 150+ pitch and sales decks, managed ₹30–40L in annual print vendor budgets, and deployed custom AI workflows for creative production and daily CSV data funnels.";
```

---

## 2. Hero & Masthead Copy

- **Breadcrumb:** `Home / Experience`
- **Kicker (DM Mono):** `OPERATIONAL RECORD · 2016 — PRESENT · 9+ YEARS`
- **Literal H1:**
  `What has Suman Debnath done in his 9+ years of marketing and brand leadership?`
- **Display Headline (Two-register house style):**
  **Nine years of running the floor.** *Every brand, team, and system.*
- **Extractable Answer Block (`.ex-answer`, placed directly under H1):**
  > Over nine-plus years across higher education, multi-brand corporate groups, and consumer brands — alongside building AI-native software under House of Namus — Suman Debnath has supervised a 21-person cross-functional team (12–15 direct, 6–9 indirect across design, web, and digital), managed a 50+ website and 1,000+ webpage institution and brand ecosystem, directed 1,000+ print and digital assets, built 150+ pitch and sales decks, managed ₹30–40L in annual print vendor budgets, and deployed custom AI workflows for creative production and daily CSV data funnels.
- **Standfirst (Human Voice):**
  > A résumé gives you six bullet points and trims out the nine years it took to earn them. Before I ever trained a language model or built a 46-agent fleet under House of Namus, my job was keeping a multi-brand marketing floor moving — translating blunt, last-minute expectations from the boardroom into websites, campaigns, print runs, decks, and AI pipelines that shipped on time.
- **Visible Disambiguation Strip:**
  > **Which Suman Debnath this is:** The Senior Brand Marketing Manager (leading brand and digital operations across PIBM and its sister brands since 2019; formerly CBS Ventures, Aamrit, Nivea, and Raman Byte) and the founder of House of Namus — the AI-native product studio behind **ROASmind**, **IMPRINT**, **LEGATUS**, **PentaCMD-47M**, and **MIGI**, at `sumandebnath.houseofnamus.com` — not the AWS Principal Developer Advocate or any other namesake.

---

## 3. The Career-Wide Ledger (Structured Fact Block for GEO Extraction)

| Metric | Label | Operational Scope & Context | Where It Happened |
|---|---|---|---|
| **9+ yrs** | Brand & digital marketing | End-to-end brand strategy, GTM, creative direction, web ecosystems, and marketing operations (2016–present), alongside AI-native product engineering. | Institution & Sister Brands · CBS Ventures · Aamrit · Nivea · Raman Byte |
| **~21** | Cross-functional team supervised | **12–15 direct reports** and **6–9 indirect reports** coordinated daily across 3 core departments: Graphic Design, Web Development, and Digital Marketing. | Cross-Functional Creative, Web & Digital Floor |
| **50+** | Websites managed | Main institutional domains, corporate sites, sister brands, academic programme microsites, and event/admission landing pages — including 5 SEO-ready sites with payment gateways built in a single month. | Institution Ecosystem · Sister Brands · CBS Ventures · House of Namus |
| **1,000+** | Webpages in the ecosystem | Full content architecture, UX overhauls, SEO restructuring (+40–50% organic traffic growth), and continuous page-level upkeep. | Institution Ecosystem · Multi-Brand Web Properties |
| **1,000+** | Print, digital & social assets | Hands-on creation and supervision across brochures (including a 200-page brochure built in 1 day), OOH hoardings, newspaper ads, campus branding, leaflets, social paid creatives, and videos. | Multi-Brand Print & Digital Floor · CBS Ventures · Aamrit |
| **150+** | Decks & presentations built | Sales decks, student presentations, showcase decks, counselling decks, and a product pitch deck used directly to demo to one of India’s largest government education accrediting bodies. | Institutional, Product & Executive Pitches |
| **₹30–40L** | Annual print vendor budget | Direct ownership of print, OOH, and offline production vendor budgets, negotiations, and print-floor quality control. | Annual Print & OOH Production Operations |
| **50–100+** | Event assets in 3 working days | Complete 3-day event branding flow executed in 72 hours for a flagship 3-day product launch, alongside year-round convocations, corporate conclaves, and external events. | Flagship 3-Day Product Launch & Institutional Events |

---

## 4. Cross-Company & Venture Attribution Matrix (Employment vs. Standalone Ventures)

### A. Corporate & Institutional Leadership Tenures
1. **Multi-Brand Higher-Education Group & Sister Brands (PIBM)** — `Senior Brand Marketing Manager · March 2019 – Present · Pune, India`
   All 8 operational pillars: multi-department supervision across Design, Web, and Digital; 50+ websites / 1,000+ webpages institution ecosystem; ₹30–40L annual print vendor budget; 1,000+ print/digital assets; 150+ decks (incl. Govt. accreditor demo); 3-day flagship product launch (50–100+ assets in 3 working days); aggregator/channel partner outreach; daily CSV & creative AI workflows; ORM; and daily CEO/Chairman reporting.
2. **CBS Ventures** — `Branding & Digital Marketing Manager · January 2018 – October 2018 · Kerala / Pune, India`
   Developed brand identity and digital marketing strategy from the ground up; owned website design, development oversight, and UX; executed SEO, SEM, paid social, and organic campaigns; managed external agencies and vendors; produced print, video, and poster collateral; conducted recruitment interviews.
3. **Aamrit · Nivea · Raman Byte Pvt Ltd** — `Marketing Executive & Early Career Stints · 2016 – 2018 · India`
   Foundational consumer-brand operations, field and channel marketing execution, print and campaign collateral support, and retail brand communication.

### B. Independent Product Studio & Self-Built Ecosystems (Separate from Employment)
4. **House of Namus** — `Founder & AI-Native Product Builder · 2024 – Present · houseofnamus.com`
   Independent AI-native product studio and umbrella brand where nine years of marketing-floor bottlenecks are turned into working software: 21+ shipped products including ROASmind (200K+ LoC), IMPRINT, LEGATUS, CITE, EMBER, D-PE.ai, PentaCMD-47M, Pentashell, MIGI (46-agent fleet), Banking RM Copilot, AEGIS VAULT, That One Crawler, PixelVille, and NUNO.
5. **World of Lamborghini (WOLAMBO)** — `Founder & Independent Media Operator · 2013 – Present · Kolkata & Pune, India`
   Self-built automotive media and content property: 82,000+ community built from zero, 677,503 organic single-post reach, and 31,541 weekly blog visitors on `wolambo.weebly.com`.

---

## 5. The Eight Functional Pillars

- **Pillar 01 (`#leadership-stakeholders`):** Twenty-one people across design, web, and digital — shielded from boardroom chaos so the work actually ships (`~21` people total: `12–15` direct reports, `6–9` indirect reports across Graphic Design, Web Development, and Digital Marketing).
- **Pillar 02 (`#web-ecosystem`):** Managing 50+ websites and a 1,000+ webpage ecosystem across the Institution Ecosystem, corporate domains, sister brands, programme microsites, and admission/event landing pages (`+40–50%` organic traffic; `5` SEO-ready websites with payment gateways in 1 month).
- **Pillar 03 (`#brand-identity-governance`):** Building brand identities from zero (CBS Ventures, new sister brands and programme identities, and House of Namus) and keeping them recognisable across print, web, campus, and digital.
- **Pillar 04 (`#creative-production-print-budget`):** 1,000+ print, OOH, and digital assets shipped — backed by a ₹30–40L annual print vendor budget and a 200-page brochure built in a single day.
- **Pillar 05 (`#performance-social-partners`):** Full-funnel campaign strategy across paid ads, social calendars, emailers, and external channel partners/aggregators across 20+ GTM launches.
- **Pillar 06 (`#decks-events-launches`):** 150+ pitch, sales, and counselling decks (including a live product demo deck for one of India’s largest government education accrediting bodies) — and 50–100+ event branding assets delivered in 3 working days for a 3-day flagship product launch.
- **Pillar 07 (`#ai-workflows-team-adoption`):** Turning AI into daily team pipelines for merging thousands of CSV rows daily, custom student-portrait GPT (`-7–8 hrs/wk`), and GenAI ad/web pipelines (`-2–3 hrs/day`).
- **Pillar 08 (`#honest-postscript`):** *“And more small, small things. Slogging like a dead panda.”* — ORM, midnight surgery on broken files before 6 a.m. press runs, hands-on video/photo work, ugly-but-practical collateral, and why that grind led to founding House of Namus.
