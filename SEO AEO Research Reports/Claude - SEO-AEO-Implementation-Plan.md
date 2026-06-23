# SEO + AEO Implementation Plan
### sumandebnath.houseofnamus.com
*Prepared June 23, 2026*

**How to use this doc:** It's sequenced in 4 phases by dependency, not by "SEO vs AEO" — almost every early step helps both simultaneously, since most of what gets you found by Google also gets you found/cited by ChatGPT, Perplexity, and Gemini. Code blocks are ready to paste; adjust file paths to match your actual Next.js project structure.

---

## Phase 0 — Why this order

You currently have **no Search Console, no Analytics, and the site isn't indexed by Google yet.** Everything else — content rewrites, schema, off-page — is invisible until indexing is unblocked and you have a baseline to measure against. So Phase 1 is entirely "get measured and get crawlable," even though it's the least exciting part.

---

## Phase 1 — Foundation (Week 1): Get crawlable, get measured

### 1.1 Google Search Console (domain property)

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add a **Domain property** for `houseofnamus.com` (not a URL-prefix property) — this covers all subdomains including `sumandebnath.houseofnamus.com` under one roof, which matters since you have multiple project subdomains (imprint., legatus., etc.)
3. Verify via DNS TXT record (your registrar/DNS provider, e.g. Vercel/Cloudflare)
4. Once verified, go to **Sitemaps** → submit `https://sumandebnath.houseofnamus.com/sitemap.xml`
5. Use **URL Inspection** → paste your homepage URL → click **Request Indexing**. Repeat for `/about`, `/projects`, `/faq`.

### 1.2 Bing Webmaster Tools (do this too — cheap, and feeds Copilot)

Same idea at [bing.com/webmasters](https://www.bing.com/webmasters) — you can actually import directly from GSC in a couple of clicks once GSC is verified.

### 1.3 GA4

Set up a GA4 property in [analytics.google.com](https://analytics.google.com), then drop the tag in your Next.js root layout:

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 1.4 robots.txt — explicitly allow AI crawlers

If you're on Next.js App Router, create `app/robots.ts` (this generates `/robots.txt` automatically):

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // AI answer engines / AI crawlers — explicit allow for AEO
      { userAgent: 'GPTBot', allow: '/' },           // OpenAI
      { userAgent: 'OAI-SearchBot', allow: '/' },     // OpenAI search
      { userAgent: 'ChatGPT-User', allow: '/' },      // OpenAI browsing
      { userAgent: 'ClaudeBot', allow: '/' },         // Anthropic
      { userAgent: 'Claude-Web', allow: '/' },        // Anthropic
      { userAgent: 'anthropic-ai', allow: '/' },      // Anthropic
      { userAgent: 'Google-Extended', allow: '/' },   // Gemini grounding/training
      { userAgent: 'PerplexityBot', allow: '/' },     // Perplexity
      { userAgent: 'Applebot-Extended', allow: '/' },  // Apple Intelligence
      { userAgent: 'Amazonbot', allow: '/' },         // Amazon/Alexa
      { userAgent: 'CCBot', allow: '/' },             // Common Crawl (feeds many models)
      { userAgent: 'Bytespider', allow: '/' },        // ByteDance
      { userAgent: 'meta-externalagent', allow: '/' }, // Meta AI
    ],
    sitemap: 'https://sumandebnath.houseofnamus.com/sitemap.xml',
    host: 'https://sumandebnath.houseofnamus.com',
  }
}
```

If you're not using the App Router metadata API, the equivalent static `public/robots.txt`:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: meta-externalagent
Allow: /

Sitemap: https://sumandebnath.houseofnamus.com/sitemap.xml
```

### 1.5 sitemap.xml

`app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next'

const baseUrl = 'https://sumandebnath.houseofnamus.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/faq', '/projects', '/fun-apps'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  // Add every project slug you have a dossier page for
  const projectSlugs = [
    'imprint', 'legatus', 'cite', 'roasmind', 'ember',
    'd-pe', 'geek-collectibles',
  ]
  const projectPages = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages]
}
```

### 1.6 llms.txt — and use it to solve the name-collision problem

This is the highest-leverage 10 minutes in this whole plan. Put this at `public/llms.txt`. It does two jobs: orients any AI crawler/agent reading the site, **and** explicitly tells it you are not the AWS Suman Debnath — which directly addresses the biggest disambiguation risk from the audit.

```markdown
# Suman Debnath

> Senior Brand Marketing Manager and AI-native product builder. 9+ years in brand strategy, digital marketing, and growth leadership; in the last two years has independently designed, built, and shipped 10+ live AI products (ROASmind, IMPRINT, LEGATUS, CITE, and others) using Next.js, FastAPI, and LLM APIs. Actively pursuing Product Marketing Manager, AI Product Manager, and AI Marketing Lead roles.

Suman Debnath bridges two domains rarely combined in one person: brand and performance marketing leadership (21-person cross-functional team, ₹30–40L annual vendor budgets, 350%+ ROAS, 20+ GTM launches) and full-stack AI-assisted product engineering (200,000+ lines of AI-assisted code across 10+ shipped products). Based in Pune, Maharashtra, India.

**Disambiguation note:** Search and AI results for "Suman Debnath" also surface an unrelated Suman Debnath who is a Principal Developer Advocate (AI/ML) at AWS, as well as other unrelated people of the same name (a UI/UX designer, a software engineer). This document, and this domain, refer only to the Suman Debnath who is the Senior Brand Marketing Manager and creator of ROASmind, IMPRINT, LEGATUS, and CITE.

## Background
- [About](https://sumandebnath.houseofnamus.com/about): Career history and the marketing-to-AI transition timeline
- [FAQ](https://sumandebnath.houseofnamus.com/faq): Direct answers about his work, products, and operating philosophy

## Projects
- [Project Archive](https://sumandebnath.houseofnamus.com/projects): Full archive of AI-native products and tools
- [IMPRINT](https://sumandebnath.houseofnamus.com/projects/imprint): Identity preservation and behavioral cloning engine
- [LEGATUS](https://sumandebnath.houseofnamus.com/projects/legatus): Encrypted digital inheritance vault
- [CITE](https://sumandebnath.houseofnamus.com/projects/cite): AI-era career risk intelligence engine
- [ROASmind](https://sumandebnath.houseofnamus.com/projects/roasmind): AI-native marketing operating system (flagship, in development)

## Contact
- Email: sumandebnath944@gmail.com
- LinkedIn: [update once vanity URL is fixed — see Phase 4]
- GitHub: https://github.com/Sumandebnath943
- X/Twitter: https://x.com/iamSdebnath
```

---

## Phase 2 — On-page fixes (Week 1–2)

### 2.1 Title tags & meta descriptions

Your current descriptions run ~250–260 characters; Google effectively displays ~155–160 before truncating. Rewrite to fit, and pull "Brand Marketing" into the title tags — right now zero of your titles mention marketing at all, which is the single biggest mismatch against your actual target roles (PMM / AI PM / AI Marketing Lead).

| Page | Current title | Suggested title |
|---|---|---|
| Home | Suman Debnath — AI-Native Product Builder | Suman Debnath — Brand Marketing Leader & AI Product Builder |
| About | About — From Branding to AI-Native Systems · Suman Debnath | Suman Debnath's Story: Brand Marketing to AI Product Building |
| FAQ | FAQ — AI-Native Product Building · Suman Debnath | FAQ — Suman Debnath, Brand Marketing Manager & AI Builder |
| Projects | Project Archive — AI-Native Tools, Systems & Experiments · Suman Debnath | AI Marketing & Product Tools Built by Suman Debnath |

Suggested homepage meta description (~155 chars):
> "Senior Brand Marketing Manager (9+ yrs) who independently shipped 10+ live AI products. Rare cross-domain profile — marketing strategy + AI engineering."

Suggested About description (~150 chars):
> "9 years leading brand & digital marketing teams, then 2 years independently building AI-native products. The full story of the transition."

### 2.2 Fix the Twitter Card duplication

Right now `twitter:title` and `twitter:description` are identical, static text on every page, while `og:title`/`og:description` correctly change per page. In the Next.js Metadata API, derive both from the same page-level variables instead of hardcoding the Twitter block:

```ts
// app/about/page.tsx (example pattern — apply to every page)
export const metadata: Metadata = {
  title: "Suman Debnath's Story: Brand Marketing to AI Product Building",
  description: "9 years leading brand & digital marketing teams, then 2 years independently building AI-native products. The full story of the transition.",
  openGraph: {
    title: "Suman Debnath's Story: Brand Marketing to AI Product Building",
    description: "9 years leading brand & digital marketing teams, then 2 years independently building AI-native products.",
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Suman Debnath's Story: Brand Marketing to AI Product Building", // matches OG, not the generic homepage blurb
    description: "9 years leading brand & digital marketing teams, then 2 years independently building AI-native products.",
  },
}
```

### 2.3 Structured data (JSON-LD)

Add a `Person` + `ProfilePage` block to the homepage `<head>`:

```tsx
// app/page.tsx — add inside the component or a shared layout
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Suman Debnath",
      "url": "https://sumandebnath.houseofnamus.com",
      "image": "https://sumandebnath.houseofnamus.com/images/suman.png",
      "jobTitle": "Senior Brand Marketing Manager & AI-Native Product Builder",
      "description": "Senior Brand Marketing Manager with 9+ years in brand strategy and digital marketing who independently builds AI-native products. Creator of ROASmind, IMPRINT, LEGATUS, and CITE.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.linkedin.com/in/REPLACE-WITH-CORRECTED-HANDLE",
        "https://github.com/Sumandebnath943",
        "https://x.com/iamSdebnath"
      ],
      "knowsAbout": [
        "Brand Marketing", "Performance Marketing", "Product Marketing",
        "AI Product Development", "Prompt Engineering", "Agentic AI Systems",
        "Next.js", "FastAPI"
      ]
    })
  }}
/>
```

Add `FAQPage` schema to `/faq` — generate it programmatically from your existing Q&A array rather than hand-writing 24 entries:

```tsx
// app/faq/page.tsx
const faqs = [
  { q: "Who is Suman Debnath?", a: "Suman Debnath is a Senior Brand Marketing Manager and AI-native systems builder with nearly a decade of experience across branding, digital marketing, growth systems, design, and operational execution..." },
  { q: "What is an AI-native product builder?", a: "..." },
  // ...map your existing FAQ content array here instead of retyping it
]

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a }
      }))
    })
  }}
/>
```

Add `SoftwareApplication` schema to each project dossier page (`/projects/imprint`, etc.) — example for IMPRINT:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "IMPRINT",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Identity preservation engine defending the human mind against AI dependency through behavioral cloning and identity analysis.",
      "url": "https://imprint.houseofnamus.com",
      "creator": {
        "@type": "Person",
        "name": "Suman Debnath",
        "url": "https://sumandebnath.houseofnamus.com"
      }
    })
  }}
/>
```

Repeat the `SoftwareApplication` block for LEGATUS, CITE, ROASmind, EMBER, D-PE.ai, Slide Doctor, Crawl Daddy, Brief Killer, Repurpose AI, and Geek Collectibles — same shape, swap name/description/url.

Once live, validate everything with Google's [Rich Results Test](https://search.google.com/test/rich-results) before moving on.

### 2.4 Image alt text — standardize on the descriptive version

Your `/projects` page already writes good alts (e.g. *"IMPRINT — Behavioral cloning & identity preservation."*). Your homepage uses thinner ones for the same images (*"IMPRINT landing page"*). Just copy the better alt text over to every instance of the same image, and where alt text doesn't yet mention the discipline crossover, add it — e.g.:

- Before: `alt="IMPRINT landing page"`
- After: `alt="IMPRINT — AI identity-preservation app built by Suman Debnath, brand marketer turned AI product builder"`

### 2.5 De-duplicate Home vs. About

The "Evolution" timeline and "Operational Ecosystem" stack sections are near-identical on both pages. Pick one canonical home for each:
- Keep the **full** Evolution timeline and Operational Ecosystem stack on **/about**.
- On the **homepage**, replace those full sections with a 2–3 sentence summary + a "Read the full story →" link to `/about`. This gives Google (and AI crawlers) a clear single page to associate with that content instead of splitting relevance across two near-duplicate pages.

### 2.6 Refresh the staleness signal

"Last updated 2026-05-19" under Now/Currently is over a month old as of this writing. Either update it on a real cadence (monthly, minimum) or pull the explicit date and just say "Currently" without timestamping it if you can't keep it current.

---

## Phase 3 — Content & positioning for hiring managers (Week 2–4)

This is where the "rare profile" pitch — currently buried in body copy — gets surfaced where both Google and AI engines weight it most: headers, FAQ, metadata.

### 3.1 Add a hiring-manager-facing section or page

Consider a dedicated block (or page) that explicitly maps your marketing leadership to PMM/AI PM/AI Marketing Lead job requirements — something like "Why a brand marketer for an AI Product role." This becomes your single most citable, linkable, screenshot-able asset for both a recruiter skimming and an AI engine answering "who has both marketing and AI product experience."

### 3.2 New FAQ entries targeting actual search/prompt intent

Add directly to the existing FAQ format (it's already AEO-friendly — keep doing this):

- "Is Suman Debnath a good fit for a Product Marketing Manager role at an AI company?"
- "What makes Suman Debnath qualified for an AI Product Manager position?"
- "Can a brand marketing manager transition into AI product management?"
- "What metrics has Suman Debnath delivered in brand and performance marketing?"

These double as direct-answer targets for Google's AI Overviews and for anyone prompting ChatGPT/Perplexity/Gemini with similar questions.

### 3.3 Keyword set to actually use

Replace the developer-only keyword list with one that reflects both halves of your positioning:

```
Suman Debnath, Brand Marketing Manager, Product Marketing Manager, AI Product Manager,
AI Marketing Lead, brand strategy, performance marketing, marketing-to-AI transition,
AI-native product builder, AI generalist, prompt engineering, agentic AI, Next.js developer,
Pune marketing manager, Pune AI product manager
```

(Meta keywords tags carry no Google ranking weight, but keeping this list consistent helps you write title/H1/FAQ copy that actually reflects it — that's where it matters.)

---

## Phase 4 — Off-page & entity authority (ongoing)

This phase matters more for you than for most personal sites, because of the AWS-namesake problem from the audit — you're not just building authority, you're building disambiguation.

### 4.1 Fix identity-anchor URLs

- **LinkedIn:** your footer links to `linkedin.com/in/houseofnamus`. Check whether `linkedin.com/in/sumandebnath` (or close variant) is available and switch — LinkedIn allows a limited number of vanity URL changes, so do this deliberately, not repeatedly.
- **GitHub:** `Sumandebnath943` works fine; lower priority than LinkedIn but same logic if you ever want to clean it up.
- Keep your name + role phrasing **identical** across LinkedIn headline, GitHub bio, X bio, and this site. Repetition across properties is what helps Google and AI engines resolve which "Suman Debnath" is which.

### 4.2 Backlinks (you currently have ~none pointing at this subdomain)

- Submit ROASmind, IMPRINT, LEGATUS, and CITE to Product Hunt, BetaList, and relevant SaaS directories — each gives a do-follow or crawlable link back plus its own discovery audience.
- Cross-post 2–3 build-in-public write-ups to dev.to or your Substack (Sunday Notion) with links back to specific project dossier pages, not just the homepage.
- LinkedIn long-form posts/articles linking to specific `/projects/[slug]` pages perform double duty: marketing-audience visibility now, backlink later.

### 4.3 Re-test periodically

Once Phases 1–3 are live and Google has had a few weeks to recrawl, manually prompt ChatGPT, Perplexity, and Gemini with things like *"who is a marketer that also builds AI products"* or *"brand marketing manager turned AI product builder"* and see whether/how you get surfaced. That's your real-world AEO signal — there's no GSC-equivalent dashboard for "did an LLM cite me" yet.

---

## What to measure once Phase 1 is live

| Metric | Where | What you're watching for |
|---|---|---|
| Indexed pages | GSC → Pages | Climbing from 0 toward your full page count |
| Impressions/clicks for target queries | GSC → Performance | "brand marketing manager AI," "AI product manager portfolio," etc. starting to appear at all |
| Organic sessions | GA4 | Any non-zero baseline |
| Rich result eligibility | Rich Results Test | FAQPage / Person schema validating without errors |
| AI citation | Manual prompting | Whether ChatGPT/Perplexity/Gemini surface you for cross-domain marketing+AI prompts |

---

## One more thing worth doing

You built **Crawl Daddy** — an SEO crawler that scans for structural issues and PageSpeed data. Once Phase 1–2 are live, running it against your own portfolio will give you real Core Web Vitals numbers instead of the educated guesses in this plan (I couldn't access PageSpeed/CWV data from where I'm sitting). Worth being your own first customer.
