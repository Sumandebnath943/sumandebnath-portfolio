# Master SEO & AEO Implementation Plan
### sumandebnath.houseofnamus.com — reconciled from 5 audits · prepared for execution
*Prepared June 24, 2026*

> **Framing note:** This site is already far more built-out than three of the four
> external reports assumed. ChatGPT, Claude, and parts of Qwen wrote as if there were
> no robots.txt, no sitemap, no `llms.txt`, no Person/FAQ schema, no canonicals — all of
> those exist and are strong. Items already shipped are marked **✅ ALREADY DONE — SKIP**
> so finished work isn't redone.

---

## 1. Locked decisions (the plan is built on these)

| Decision | Choice |
|---|---|
| Primary positioning | **Brand Marketing × AI Product** — lead with both |
| `sameAs` / identity | **Only 3 owned profiles**: `github.com/Sumandebnath943`, `linkedin.com/in/houseofnamus`, `x.com/iamSdebnath`. **Never** the namesake profiles. |
| Writing/blog | **None for now** → FAQ expansion becomes the content lever (one-time, not ongoing) |
| Canonical / "who wins" | Brand site + product subdomains win for *product* queries; **portfolio homepage wins for "Suman Debnath"** |
| Primary landing page | Homepage |
| Geography | India-first, remote/global open |
| Tools | Portfolio is a **mirror**; product subdomains stay the real home |

## 2. The conflict-resolution ledger (where the 5 inputs disagreed)

| Issue | What reports said | **Resolution** |
|---|---|---|
| `sameAs` profiles | Gemini & Qwen: claim `debnsuma`/`SUMExXx`/`dev.to`/`sumandebnath.co.in`/Substack | ❌ **Those are namesakes (AWS advocate + others).** Use only your 3 verified profiles. Most important correction. |
| robots / sitemap / llms.txt / Person & FAQ schema | ChatGPT, Claude, Qwen: "create these" | ✅ **Already done & strong.** Skip creation; only *refine* content. |
| GSC property type | Claude: Domain property (`houseofnamus.com`); Gemini: URL-prefix (subdomain) | **Both.** Domain property for `houseofnamus.com` (covers brand site + all project subdomains + this portfolio) **plus** a URL-prefix property for the subdomain for isolated reporting. |
| Meta description length | Claude/Gemini: yours run 250+ chars, Google cuts at ~160 | ✅ Valid — trim (see §4). |
| Twitter card | Claude: titles duplicated/static | Partially valid — per-page OG already overrides, but derive Twitter from page vars to be safe. |
| "Add a blog / Journey page" | Qwen, Claude | Deferred per your choice; **FAQ expansion** covers the AEO intent without ongoing writing. |
| Keyword pivot to marketing+AI | All four agree | ✅ Adopted — matches your locked decision. |

## 3. Strategic spine — the 3 levers that actually move the goal

1. **Reframe copy & titles to "Brand Marketing × AI."** Today every title says "AI-Native Product Builder" and *zero* mention marketing — invisible to "AI product marketing manager," "brand manager AI," etc. Biggest leak.
2. **Disambiguate from the namesakes.** Competing against a more search-dominant Suman Debnath (AWS Principal Developer Advocate) plus several others. Without active disambiguation, AI engines blend or replace you.
3. **Turn on measurement + indexing.** GSC, Bing, analytics = currently zero. Everything else is unmeasurable until this exists.

---

## 4. Prioritized backlog (with exact files)

### 🔴 P0 — This week (unblock + stop the bleeding)

| # | Action | File / where |
|---|---|---|
| P0-1 | **Google Search Console** — add **Domain property** `houseofnamus.com` (DNS TXT) + a URL-prefix property for the subdomain. Submit `sitemap.xml`, Request Indexing on `/`, `/about`, `/projects`, `/faq`, `/learnings`. | External (DNS/Vercel) |
| P0-2 | **Bing Webmaster Tools** — import from GSC. Feeds Copilot/DuckDuckGo. | External |
| P0-3 | **Analytics** — add `@vercel/analytics` + `@vercel/speed-insights` (real CWV data) and/or GA4. | `app/layout.tsx` |
| P0-4 | **Fix `/learnings` metadata** — it's `"use client"` so it inherits the generic homepage `<head>` (no title/description/canonical/OG). Split a thin **server** `page.tsx` that exports `metadata` and renders the existing client component. | `app/learnings/page.tsx` → server wrapper + client component |
| P0-5 | **Title + description rewrite** to lead with Brand Marketing × AI, trim descriptions to ≤160 chars. | `app/layout.tsx`, `app/about/page.tsx`, `app/faq/page.tsx`, `app/projects/page.tsx`, `app/philosophy/page.tsx`, `app/fun-apps/page.tsx`, learnings wrapper |
| P0-6 | **Person schema: tighten `jobTitle`** to `"Senior Brand Marketing Manager & AI-Native Product Builder"`, add a `disambiguatingDescription` (not the AWS Developer Advocate…), keep `sameAs` to your 3 profiles. | `app/layout.tsx` (personJsonLd) |
| P0-7 | **Favicon fix** — `manifest.ts` points to `/favicon.ico` which **doesn't exist**; `icon.png`/`icon-192`/`icon-512` are all the same 760 KB file. Generate real 192/512 PNGs + true favicon, fix manifest `icons`. | `app/manifest.ts`, `public/icon-*.png`, `app/icon.png` |

**Title rewrites (P0-5):**

| Page | New title | New description (≤160) |
|---|---|---|
| Home | `Suman Debnath — Brand Marketing Leader & AI Product Builder` | "Senior Brand Marketing Manager (9+ yrs) who builds AI-native products. Rare cross-domain profile — brand strategy + hands-on AI product engineering." |
| About | `From Brand Marketing to AI Products — Suman Debnath` | "A decade leading brand & digital marketing, then building AI-native products. The full transition story behind a rare marketing-plus-AI profile." |
| FAQ | `FAQ — Brand Marketer Turned AI Product Builder` | "Direct answers on the marketing-to-AI transition, AI product building, and what makes a brand marketer + AI builder a rare hire." |
| Projects | `AI Products & Tools by Suman Debnath` | "AI-native tools and systems built by a brand marketer turned AI product builder — identity, inheritance, career intelligence, and more." |
| Learnings | `Skills & Cross-Domain Capabilities — Suman Debnath` | "The full skill map: brand marketing, growth, and AI product engineering — the cross-domain capabilities behind the work." |

### 🟡 P1 — Next 1–2 weeks (positioning + entity + AEO)

| # | Action | File / where |
|---|---|---|
| P1-1 | **Homepage cross-domain sentence (visible, declarative).** Add a plain-English line near the hero: *"Suman Debnath is a Senior Brand Marketing Manager who builds AI-native products — bridging brand strategy and hands-on AI engineering."* | `components/sections/Hero.tsx` / `Announcement.tsx` |
| P1-2 | **FAQ expansion (content lever).** Add role-intent + transition + disambiguation Q&As: "Can a brand marketing manager become an AI product manager?", "What makes Suman Debnath qualified for an AI PM / AI PMM role?", "Is this the same Suman Debnath who works at AWS?" (→ explicit "No, different person"). | `lib/faqs.ts` |
| P1-3 | **Per-project OG images** — stop reusing `/og-image.png`; you already have `public/screenshots/{slug}.png`. | `app/projects/[slug]/page.tsx` |
| P1-4 | **Add `ProfilePage` schema** to homepage + **`BreadcrumbList`** to `/about`, `/philosophy`, `/learnings`. | `app/page.tsx`, those pages |
| P1-5 | **`rel="me"` on social links** (Contact + Footer) for entity verification / Knowledge Panel. | `components/sections/Contact.tsx`, `components/layout/Footer.tsx` |
| P1-6 | **De-duplicate Home vs About.** Both render `Experience`/`SystemsStack`/`OperationalHistory`/`AcademicFoundations`. Keep full versions on `/about`; summaries + "Read the full story →" on home. | `app/page.tsx` |
| P1-7 | **Update `llms.txt` + `llms-full.txt`** — lead identity = "Senior Brand Marketing Manager & AI-native product builder," add disambiguation note (vs AWS namesake), foreground marketing×AI. | `public/llms.txt`, `public/llms-full.txt` |
| P1-8 | **Generate sitemap from data** (drive from `projects.ts`/`archiveProjects`, real `lastModified`). | `app/sitemap.ts` |
| P1-9 | **Compress `og-image.png`** (1.4 MB → <500 KB) + **lazy-load `robot.glb`** / defer three.js to protect LCP/CWV. | `public/og-image.png`, robot components |

### 🟢 P2 — Ongoing (authority + disambiguation compounding)

| # | Action |
|---|---|
| P2-1 | **LinkedIn vanity URL** — `/in/houseofnamus` lacks your name; move to a name-based URL and keep the **exact same headline** across LinkedIn / GitHub / X / site. Identical NAP resolves *which* Suman Debnath you are. |
| P2-2 | **Backlink from the brand site to this portfolio.** A followed link from `houseofnamus.com` author bios → this subdomain passes authority + reinforces this as the canonical "Suman Debnath" hub. |
| P2-3 | **Submit live tools** (IMPRINT, LEGATUS, CITE, EMBER, D-PE) to Product Hunt / BetaList / SaaS directories — pointed at the **product subdomains**, portfolio as creator reference. |
| P2-4 | **Manual AEO testing** — monthly, prompt ChatGPT / Perplexity / Gemini with "brand marketer who builds AI products," "Suman Debnath AI product manager," and check you surface *and* aren't confused with the AWS namesake. |
| P2-5 | Pursue a **Google Knowledge Panel** once entity signals are consistent. |

---

## 5. The cross-domain canonical question ("brand site wins")

**Do NOT blanket-canonical portfolio project pages to the brand site.** `rel=canonical` is for near-duplicate pages; your `/projects/[slug]` dossiers are first-person showcase pages, while the product subdomains are the product's own marketing — different intents, so a cross-domain canonical would likely be ignored by Google or wrongly de-index your showcase.

Achieve "brand/product wins for product-name queries" via:
- `SoftwareApplication` schema already sets `url` → the live product subdomain ✅ (keep).
- **Differentiate the copy** — ensure project description text isn't byte-identical between portfolio and brand site (light rewrite of duplicated paragraphs). Removes the real duplicate-content risk.
- Strong outbound "Visit the live product →" links from each dossier to the product subdomain.

Net: "IMPRINT identity preservation" → product wins; "Suman Debnath" → portfolio homepage wins. Exactly the goal.

*(If a portfolio project page is ever a literal copy of a brand-site page, then cross-domain canonical that specific page. Verify case-by-case in GSC.)*

---

## 6. Measurement plan

| Signal | Where | Target |
|---|---|---|
| Indexed pages | GSC → Pages | 0 → full page count in ~3–4 weeks |
| "Suman Debnath" → homepage #1 | GSC → Performance | Own your name (beating namesakes) |
| Cross-domain queries appearing | GSC | "brand marketing manager AI," "AI product manager portfolio India" |
| CWV / LCP | Speed Insights | Green |
| Rich results valid | Rich Results Test | Person + FAQPage + SoftwareApplication, no errors |
| AI citation + correct identity | Manual prompting | Surfaced *and* not merged with AWS namesake |

---

## 7. What's already done (do not redo)

✅ `app/robots.ts` — comprehensive AI-crawler allowlist (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, etc.)
✅ `app/sitemap.ts` — present (P1-8 only refactors it to be data-driven)
✅ `public/llms.txt` + `public/llms-full.txt` — present (P1-7 only refreshes framing)
✅ Person + WebSite JSON-LD graph with linked `@id`s — `app/layout.tsx`
✅ FAQPage, BreadcrumbList, CollectionPage, SoftwareApplication schema
✅ Per-page metadata + canonicals on all pages except `/learnings` (P0-4)
✅ OG + Twitter cards, `metadataBase`, title template, `sr-only` H1, broad image alt coverage, PWA manifest
