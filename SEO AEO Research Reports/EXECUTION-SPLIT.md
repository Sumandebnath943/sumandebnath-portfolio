# Execution Split — Who Does What
### Companion to MASTER-PLAN.md · nothing in the plan changed, only sorted
*June 24, 2026*

The plan is unchanged. Every item below maps to a P0/P1/P2 ID in `MASTER-PLAN.md`.
Two buckets: **Part A** = things only you can do (accounts, external platforms, DNS, sites
I can't reach). **Part B** = things I can do entirely in this codebase.

Sequence agreed: I do all of Part B first → then you do Part A.

---

## PART A — Manual (only you can do these)

These require accounts, credentials, DNS, or access to sites outside this repo. I cannot do them no matter what.

| ID | Task | Why it's yours |
|---|---|---|
| A1 ← P0-1 | **Google Search Console**: create Domain property `houseofnamus.com`, add the DNS TXT record at your registrar/Vercel, add a URL-prefix property for the subdomain, submit `sitemap.xml`, Request Indexing on `/`, `/about`, `/projects`, `/faq`, `/learnings`. | Needs your Google account + DNS access. |
| A2 ← P0-2 | **Bing Webmaster Tools**: sign in, import from GSC. | Needs your Microsoft/Bing account. |
| A3 ← P0-3 (account half) | **Analytics accounts**: enable **Vercel Analytics + Speed Insights** in the Vercel dashboard; *(optional)* create a **GA4** property and send me the Measurement ID (`G-XXXX`). | I write the code; you flip the dashboard toggle / create the property + ID. |
| A4 ← P2-1 | **LinkedIn vanity URL + profile headlines**: change `/in/houseofnamus` to a name-based URL; set the **identical** headline/bio on LinkedIn, GitHub, X. | I can't log into your social accounts. |
| A5 ← P2-2 | **Backlink from the brand site** (`houseofnamus.com`) → this portfolio, from your author bio(s). | Lives in a different repo/site I don't have access to. |
| A6 ← P5 (brand-site half) | **Differentiate the duplicated project copy on the *brand-site* side** so it isn't byte-identical to the portfolio. (I'll handle the portfolio side — A6 is only the brand-site edits.) | Brand site is outside this repo. |
| A7 ← P2-3 | **Submit live tools** (IMPRINT, LEGATUS, CITE, EMBER, D-PE) to Product Hunt / BetaList / SaaS directories. | Needs your accounts + founder submissions. |
| A8 ← P2-4 | **Manual AEO spot-testing** (monthly): prompt ChatGPT / Perplexity / Gemini and check you surface + aren't merged with the AWS namesake. | Judgment call on live LLM output; ongoing. |
| A9 ← P2-5 | **Pursue Google Knowledge Panel** once entity signals are consistent. | Tied to your Google identity. |

**After my Part B ships, A1 is the single highest-leverage thing to do first** (gets you indexed + measured).

---

## PART B — I can do these myself (pure codebase, no accounts)

All in this repo. No external credentials needed. (B3 has a soft dependency on A3 only if you want GA4; Vercel Analytics needs nothing from you.)

| ID | Task | Files |
|---|---|---|
| B1 ← P0-4 | Fix `/learnings` metadata — split a server wrapper that exports `metadata` around the existing client component. | `app/learnings/page.tsx` (+ new client file) |
| B2 ← P0-5 | Rewrite titles + descriptions (lead with Brand Marketing × AI, ≤160 chars). | `app/layout.tsx`, `about`, `faq`, `projects`, `philosophy`, `fun-apps`, learnings wrapper |
| B3 ← P0-3 (code half) | Add `@vercel/analytics` + `@vercel/speed-insights` to the layout. *(GA4 snippet added later if you give me a `G-XXXX`.)* | `app/layout.tsx`, `package.json` |
| B4 ← P0-6 | Tighten Person schema `jobTitle`, add `disambiguatingDescription`, keep `sameAs` to your 3 profiles. | `app/layout.tsx` |
| B5 ← P0-7 | Generate correctly-sized 192/512 icons + favicon from the source image (via `sharp`), fix `manifest.ts` icons. | `app/manifest.ts`, `public/icon-*.png`, `app/icon.png` |
| B6 ← P1-1 | Add the visible declarative cross-domain sentence near the hero. | `components/sections/Hero.tsx` / `Announcement.tsx` |
| B7 ← P1-2 | Add the new FAQ entries (role-intent, transition, AWS-namesake disambiguation). | `lib/faqs.ts` |
| B8 ← P1-3 | Per-project OG images using existing screenshots. | `app/projects/[slug]/page.tsx` |
| B9 ← P1-4 | Add `ProfilePage` schema (home) + `BreadcrumbList` (about/philosophy/learnings). | `app/page.tsx` + those pages |
| B10 ← P1-5 | Add `rel="me"` to social links. | `components/sections/Contact.tsx`, `components/layout/Footer.tsx` |
| B11 ← P1-6 | De-duplicate Home vs About (summaries + link on home, full content on /about). | `app/page.tsx` |
| B12 ← P1-7 | Refresh `llms.txt` + `llms-full.txt` (marketing×AI lead + disambiguation note). | `public/llms.txt`, `public/llms-full.txt` |
| B13 ← P1-8 | Make sitemap data-driven with real `lastModified`. | `app/sitemap.ts` |
| B14 ← P1-9 | Compress `og-image.png`; lazy-load `robot.glb` / defer three.js. | `public/og-image.png`, robot components |
| B15 ← P5 (portfolio half) | Lightly differentiate duplicated project description text on the portfolio side; add "Visit the live product →" outbound links. | `lib/projects.ts`, dossier components |

---

## What I'll hand you when Part B is done
- A short changelog of every file touched.
- The **GA4 paste-point** ready (if you choose GA4) — just drop in the ID.
- A pre-filled **Part A checklist** with the exact sitemap URL, DNS record type, and the 5 URLs to Request Indexing — so your manual pass is mechanical, not research.
