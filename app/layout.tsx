import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif, Anton, DM_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import RobotMascot from "@/components/robot/RobotMascot";
import ChatTakeover from "@/components/robot/ChatTakeover";
import { RobotChatProvider } from "@/components/robot/RobotChatContext";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// `preload: false` — the only one of the four.
//
// next/font preloads by default, so all four families were emitting
// high-priority <link rel="preload"> on every page and racing the LCP image for
// bandwidth. On Slow 4G that mattered: the hero portrait's own download is 40ms,
// but it waits 630ms to start, behind ~158 KiB of document, CSS and fonts.
//
// Instrument Serif is the one that can go. It is used widely as `font-serif`
// (106 times) but never in the first screenful — the hero is Anton plus the
// system monospace stack, and the loader is Anton plus DM Mono. Everything here
// is `display: "swap"`, so it still renders immediately in a fallback and
// swaps when it arrives; dropping the *preload* only stops it competing.
//
// Do not extend this to Anton or DM Mono: both are on screen within the first
// second (the hero headline, the loader's counter and boot log), and a swap
// there would be visible in the one moment the brand is doing the talking.
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  preload: false,
});

// Condensed display face for the cinematic hero headline.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

// House of Namus terminal face — used on the PACT Agent landing page.
const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

// One home for all three, in lib/projects.ts — the homepage's `ProfilePage`
// node needs the same name and description this file gives the metadata, and a
// second copy of either string is a copy that drifts.
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/projects";
// The contact email, from the one file that owns it. It was a literal here and
// a literal again in the Organization node below before this — lib/resume.ts is
// the source of truth for anything on a business card.
import { identity } from "@/lib/resume";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s · Suman Debnath",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Suman Debnath",
    "Senior Brand Marketing Manager",
    "Brand Marketing Manager",
    "AI Product Manager",
    "AI Product Marketing Manager",
    "AI Product Marketing",
    "brand marketer turned AI builder",
    "marketing to AI product transition",
    "brand strategy",
    "performance marketing",
    "AI-native product builder",
    "AI generalist",
    "AI-native software developer",
    "AI-native developer",
    "AI product engineer",
    "AI-assisted engineering",
    "AI-native SaaS",
    "intelligent systems",
    "agentic AI",
    "agentic systems",
    "prompt engineering",
    "context engineering",
    "LLM orchestration",
    "AI workflows",
    "AI automation",
    "vibe coding",
    "Claude Code",
    "Cursor",
    "Next.js developer",
    "branding to AI",
    "marketing to AI engineering",
    "Pune AI developer",
    "Kolkata AI developer",
    "AI portfolio India",
  ],
  authors: [{ name: "Suman Debnath", url: SITE_URL }],
  creator: "Suman Debnath",
  publisher: "Suman Debnath",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: "Suman Debnath",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 800,
        alt: "Suman Debnath — Senior Brand Marketing Manager and AI-Native Product Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@iamSdebnath",
    creator: "@iamSdebnath",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",

  /*
    Search-engine ownership verification.

    Env-driven and absent until set — Next omits the tag entirely when the value
    is undefined, so an unset variable costs nothing and there is no placeholder
    to forget about.

    This is the gate in front of the two things that matter most for being
    findable by Gemini and Copilot: neither assistant has its own web index.
    Gemini grounds on Google's, Copilot on Bing's. Verifying the property is
    what lets you submit the sitemap and then *see* whether the pages are
    actually indexed — which is a different question from whether they can be
    crawled, and the one that has been unanswered so far.

      NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION  Search Console → HTML tag method
      NEXT_PUBLIC_BING_SITE_VERIFICATION    Bing Webmaster Tools → meta tag
      NEXT_PUBLIC_YANDEX_SITE_VERIFICATION  Yandex Webmaster (optional)

    Set them in Vercel → Settings → Environment Variables, redeploy, then verify.
  */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Suman Debnath",
  alternateName: [
    "Senior Brand Marketing Manager",
    "AI-Native Product Builder",
    "AI Generalist",
    "AI-Native Software Developer",
  ],
  description: SITE_DESCRIPTION,
  /*
    Positive first, negation second and categorical. Reworked 26 Aug 2026 after
    a search for "Suman Debnath portfolio" returned nine results, none of them
    this domain, and surfaced **at least four** well-indexed people of this name
    rather than the two previously listed here.

    The two that had been named — the AWS advocate and the power-systems
    researcher — are the easy cases; nobody confuses a brand marketer with an
    electromagnetic-transient researcher. The two that were missing are the
    dangerous ones: another India-based software engineer and an AI/ML lead at a
    compute company, both of whom sit much closer to this profile.

    Enumerating all four was considered and rejected. A list pinned to four
    employers is stale the moment somebody changes job, it puts each competing
    name on this page as a co-occurring token, and it grows every time another
    namesake gets indexed. The leverage is not in the negations — it is in the
    unique strings. "Suman Debnath" is contested; "PentaCMD-47M", "ROASmind" and
    "House of Namus" have exactly one referent each, and an engine that resolves
    those has resolved him without needing to be told who he is not.

    So: dense positive identification, then a categorical negation.

    **This node names nobody, and that is the second decision.** The visible aside
    on /about and the FAQ entry both name the AWS advocate, because a human who
    arrived confused needs a direct answer and "is this the same Suman Debnath who
    works at AWS" is a question people actually type. This attribute is different:
    it is machine-only and the root layout emits it on all 26 routes, so naming a
    competitor here puts his name and employer into the structured data of every
    page on the site — carrying the co-occurrence cost for the least benefit,
    because the unique strings in the same sentence already do the resolving.

    Same principle as the phone number in AEO_PLAYBOOK §8: present where a human
    needs it, absent from anything parsed in bulk. §6 holds the canonical wording.
  */
  disambiguatingDescription:
    "Suman Debnath, the Senior Brand Marketing Manager and AI-native product builder based between Pune and Kolkata, India — creator of ROASmind, IMPRINT, LEGATUS, CITE, EMBER and D-PE.ai, of the PentaCMD-47M language model, and founder of House of Namus. Not any of the several other technology professionals who share this name.",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  email: `mailto:${identity.email}`,
  // No `telephone` here either, and this was the worst of the three: the Person
  // node is emitted by the root layout, so the number was in the structured data
  // of **every page on the site** — not just the contact page. It is still
  // visible and tappable on /contact and /resume for a human; it is simply no
  // longer handed to anything parsing schema in bulk.
  jobTitle: "Senior Brand Marketing Manager & AI-Native Product Builder",
  gender: "Male",
  nationality: "Indian",
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  ],
  workLocation: [
    { "@type": "Place", name: "Pune, Maharashtra, India" },
    { "@type": "Place", name: "Kolkata, West Bengal, India" },
  ],
  /*
    The page that describes this person. Without it an engine has to infer which
    of twenty-odd URLs is the canonical description, and when two people share a
    name that inference is exactly what goes wrong. /about is now titled and
    headed "Who is Suman Debnath?" and carries the answer as its first block.
  */
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/about#profilepage` },

  /*
    Corroborating profiles. This is the single most load-bearing property for
    telling two people with one name apart: an engine resolves an entity by
    finding the same identity asserted across independent sources, and every
    profile listed here is one more source that agrees.

    Hugging Face was missing and matters more than its position suggests — a
    published model account is the kind of artefact the *other* Suman Debnath
    does not have, so it separates the two rather than merely adding volume.
  */
  sameAs: [
    "https://github.com/Sumandebnath943",
    "https://huggingface.co/SumanDebnath943",
    "https://linkedin.com/in/suman-debnath-a528653a1",
    "https://x.com/iamSdebnath",
  ],
  knowsAbout: [
    "AI-native product engineering",
    "AI generalist work",
    "AI-native software development",
    "AI-assisted engineering",
    "Prompt engineering",
    "Context engineering",
    "Agentic systems",
    "Agentic AI",
    "LLM orchestration",
    "Multi-model AI orchestration",
    "AI workflows",
    "AI automation",
    "Generative AI",
    "Vibe coding",
    "Claude Code",
    "Cursor",
    "Antigravity",
    "Codex",
    "Lovable",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Prisma",
    "Supabase",
    "Vercel",
    "n8n",
    "Make.com",
    "Zapier",
    "Brand strategy",
    "Digital marketing",
    "SEO",
    "SEM",
    "Paid acquisition",
    "Growth systems",
    "Design systems",
    "Systems thinking",
    "AI product strategy",
    "Intelligent systems design",
    "AI-native SaaS",
  ],
  knowsLanguage: ["English", "Hindi", "Bengali"],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "West Bengal State University",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Pune Institute of Business Management",
    },
    {
      "@type": "EducationalOrganization",
      name: "Great Lakes Institute of Management",
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "BA — English (Hons.)",
      credentialCategory: "Bachelor's Degree",
      educationalLevel: "Undergraduate",
      recognizedBy: { "@type": "Organization", name: "West Bengal State University" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "MBA — Marketing",
      credentialCategory: "Master's Degree",
      educationalLevel: "Postgraduate",
      recognizedBy: { "@type": "Organization", name: "Pune Institute of Business Management" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "PGP — Strategic Digital Marketing",
      credentialCategory: "Postgraduate Program",
      recognizedBy: { "@type": "Organization", name: "Great Lakes Institute of Management" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Certified in Prompt & Context Engineering",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Advanced Certification in Agentic & Generative AI",
      credentialCategory: "Professional Certification (In Progress)",
    },
  ],
  worksFor: {
    "@type": "EducationalOrganization",
    name: "Pune Institute of Business Management",
    url: "https://piem.ac.in",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "AI-Native Product Builder",
    description:
      "Architects AI-native products, intelligent SaaS systems, agentic workflows, and AI-assisted engineering pipelines across the full design-to-deployment stack.",
    skills: [
      "AI-native product engineering",
      "Multi-model LLM orchestration",
      "Agentic systems",
      "Prompt and context engineering",
      "Full-stack development with Next.js, TypeScript, React, Supabase, Vercel",
      "Automation infrastructure with n8n, Make.com, Zapier",
      "Brand strategy and digital marketing",
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#person` },
  author: { "@id": `${SITE_URL}/#person` },
  about: { "@id": `${SITE_URL}/#person` },
};

/*
  House of Namus — the brand this portfolio is a subdomain of.

  ## Why there is an Organization node at all

  This site's identity model is `Person`, deliberately: §3.1b of AEO_PLAYBOOK
  exists because more than one Suman Debnath is indexed and the better-known one
  is at AWS. Nothing here should dilute that. This node earns its place anyway,
  because House of Namus is a real company with its own live domain, Suman
  founded it, and PACT Agent is already credited to it in visible copy on
  /agents/pact-agent. An engine resolving "who is this" benefits from a second,
  independent entity that names him — corroboration is the whole game.

  `founder` points at `#person`. That is the only relationship asserted, and it
  is the true one: `Person.worksFor` still says Pune Institute of Business
  Management, because that is his employer. Founding a company and being
  employed elsewhere are not in conflict, and nothing here should imply they are.

  The `@id` is anchored at houseofnamus.com, not at this subdomain. The company's
  identity belongs to the company's own domain; this portfolio is describing it,
  not hosting it.

  ## Two deliberate omissions

  **No `telephone`.** Same standing rule as the Person node and /contact —
  AEO_PLAYBOOK §8. A number in a machine-readable surface is scraped in bulk.
  Email is the channel that scales and can be filtered. Do not add it back for
  schema "completeness"; `telephone` is optional and its absence costs nothing.

  **No street address.** `address` mirrors exactly what this site already
  publishes about where its founder works — Pune and Kolkata, at locality level,
  the same two PostalAddress objects the Person node carries. The site has never
  claimed a registered office and this node does not invent one. If House of
  Namus has a single registered address that should appear instead, it is a fact
  only Suman can supply; until then, matching the Person is the honest option
  and consistency across surfaces is itself the signal.

  ## What this node is NOT for

  Vercel's Is Agentic audit reported "Organization schema found but missing:
  contactPoint, address" on 25 Aug 2026. The Organizations it found were the
  three universities in `hasCredential[].recognizedBy` and the employer in
  `worksFor`. **Never satisfy that check by adding contact details to those.**
  This site does not speak for West Bengal State University, PIBM or Great
  Lakes, and publishing a machine-readable address for an institution on their
  behalf is fabricated data with our domain's name on it.
*/
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://houseofnamus.com/#organization",
  name: "House of Namus",
  url: "https://houseofnamus.com",
  description:
    "AI-first creative and digital house in India — branding, design, web and digital marketing for future-ready brands.",
  founder: { "@id": `${SITE_URL}/#person` },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Business and project enquiries",
      email: identity.email,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Bengali"],
      url: `${SITE_URL}/contact`,
    },
  ],
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  ],
};

import EasterEggs from "@/components/ui/EasterEggs";
import VisitorPing from "@/components/analytics/VisitorPing";
import PrivacyNotice from "@/components/ui/PrivacyNotice";
import SiteOnly from "@/components/layout/SiteOnly";
import SiteTour from "@/components/ui/SiteTour";
import CommandPalette from "@/components/layout/CommandPalette";
import MotionProvider from "@/components/providers/MotionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} ${anton.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body
        // No background class here: globals.css sets the body background, and a
        // Tailwind utility would win over it. See the comment on `body` there
        // for why it must not be the near-white --bg-deep.
        className="text-text-primary font-sans antialiased"
        suppressHydrationWarning
      >
        {/*
          Pre-paint intro cover — kills the hero flash on a first visit.

          `LoaderGate` deliberately renders nothing on the server (showing the
          loader server-side would flash it for returning visitors too), so the
          static HTML *is* the homepage. The loader only mounts once React has
          hydrated, which is why the hero was visible for a beat first.

          This runs synchronously before the rest of the body parses, so the
          cover is up before anything paints. It must stay a raw inline script:
          `next/script` cannot guarantee "before first paint", and importing
          lib/intro.ts is impossible this early — hence the duplicated
          condition, which is called out at the top of that file.

          The timeout is the failsafe for "React never arrived" — a 404'd or
          throwing bundle would otherwise leave the visitor on a black screen
          indefinitely. It is cancellable, and LoaderGate cancels it as soon as
          the loader is on screen: hydration on a slow device plus a ~6s loader
          can exceed any fixed deadline, and a failsafe that fires mid-loader
          releases the nav early and lifts the cover under a running intro.
          With scripting off entirely nothing here runs, so the page simply
          renders as normal.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(location.pathname==="/"&&!sessionStorage.getItem("sd-loader-seen")){' +
              'var r=document.documentElement;r.classList.add("sd-intro","sd-intro-nav");' +
              'window.__sdIntroFailsafe=setTimeout(function(){' +
              'r.classList.remove("sd-intro","sd-intro-nav")},8000)}}catch(e){}',
          }}
        />
        {/*
          Discovery links. React 19 hoists bare <link> elements into <head>
          from anywhere in the tree, which is why these can live here rather
          than in the Metadata API.

          They are NOT in `metadata.alternates` on purpose: almost every page
          sets its own `alternates: { canonical: … }`, and Next replaces that
          object wholesale rather than merging it — so anything declared there
          in the root layout would silently vanish on 20-odd routes.

          • llms.txt / llms-full.txt — nothing on the site pointed at either
            file, so the only way an agent found them was guessing the
            convention. An advertised file is one more of them will read.
          • rel="me" — the identity half. Entity resolution across ChatGPT,
            Perplexity and Google's knowledge graph works by corroboration, and
            a reciprocal rel="me" is the machine-readable claim that these
            profiles and this site are the same person. It backs up the
            `sameAs` array in the Person JSON-LD below with an HTML-level
            assertion, which matters because there is more than one Suman
            Debnath and at least one of them is well-indexed.
        */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM context — summary" />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="LLM context — full text"
        />
        <link rel="me" href="https://github.com/Sumandebnath943" />
        <link rel="me" href="https://linkedin.com/in/suman-debnath-a528653a1" />
        <link rel="me" href="https://x.com/iamSdebnath" />

        {/*
          Plain <script>, NOT next/script — and the difference is the whole
          point of these two nodes existing.

          `<Script strategy="beforeInteractive">` does not emit a script
          element. It serialises the payload into a `self.__next_s` push, and
          the browser builds the real tag once the bundle runs. So the identity
          of this site — jobTitle, sameAs, the disambiguation, every credential
          — existed only for a reader that executes JavaScript. In the static
          HTML there was one literal ld+json block on the homepage, the
          `ProfilePage` node in app/page.tsx, and nothing an extractor could
          resolve `mainEntity` against.

          That is not a theory. Vercel's Is Agentic audit read `/` on 25 Aug
          2026 and reported the ProfilePage as the site's identity block with no
          name and no description; supplying those took it to 75% and it then
          asked for `sameAs` and `jobTitle`, both of which were sitting in this
          Person node, invisible. Every other JSON-LD on this site — /about,
          /profile, /resume, Breadcrumbs, PageFaq — is already a plain tag. This
          was the one exception and it was the one that mattered most.

          `beforeInteractive` bought nothing here either: JSON-LD is inert data.
          Nothing reads it at runtime, so there was never a reason for it to
          race the bundle. It stays in the body deliberately — React 19 hoists
          bare <link> elements, not inline scripts, and a JSON-LD block is valid
          anywhere in the document.

          The `@id` references are what keep this DRY: `#person` is defined once
          here, and the homepage's ProfilePage, the WebSite node and every
          per-page node point at it rather than restating it. If an extractor
          ever proves unable to follow an `@id` across blocks, the fallback is
          to inline this object as ProfilePage.mainEntity on the homepage —
          valid schema, at the cost of shipping the Person twice.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <RobotChatProvider>
          {children}
          {/*
            NO FOOTER IS MOUNTED HERE, and that is deliberate.

            A layout-level `<SiteFooter />` briefly lived at this spot and was
            wrong. This site's footer is `components/sections/Contact.tsx` — the
            closing panel plus the white strip carrying FAQ/Privacy/Terms, the
            copyright and the visit-data disclosure. Mounting a second footer
            from the layout produced a third block underneath the real one on
            every page, with a duplicate set of links.

            The footer is a *page-level* component because it is themed per page
            (`closingBg`, `glowColor`, `hazeColor`, `variant`), and a layout has
            no way to know which palette a route wants. Every page mounts its
            own `<Contact />`; see PROJECT_BIBLE §8.
          */}
          {/* Portfolio furniture — deliberately absent from the dashboard, which
              is a working tool and not somewhere a mascot belongs. VisitorPing
              excludes itself separately, so that reading your own records never
              records the reading. */}
          {/*
            MotionProvider is NOT optional here, and its absence was a real bug.

            `CommandPalette` and `SiteTour` animate with `m.*`, and `m` takes its
            animation features from `LazyMotion` **through context**. Every page
            wraps its own content in MotionProvider — but this chrome is a
            sibling of {children}, not a descendant, so it had no provider at
            all. The features never loaded, `animate` never ran, and both
            components sat frozen on their `initial` values.

            For ⌘K that meant a palette rendered at `opacity: 0` with a
            `pointer-events: auto` backdrop at z-10090 — above the nav. It
            opened, swallowed every click, and was invisible; the ⌘K button
            appeared to stick because it never got a `mouseleave`.

            `EasterEggs` was unaffected only because it imports the full
            `motion` bundle rather than `m`, which is what hid this for so long.
          */}
          <MotionProvider>
            <SiteOnly>
              <RobotMascot />
              <EasterEggs />
              <ChatTakeover />
              {/* The nav's ⌘K badge fires an `open-command-palette` event from
                  every page, but the listener was mounted only on the homepage —
                  so on /resume, /faq and the rest both the badge and the keyboard
                  shortcut did nothing at all. Same mistake SiteTour had. */}
              <CommandPalette />
              {/* Mounted here rather than on the homepage, which is what confined
                  the tour to a single page — it now walks the whole site and has
                  to survive the navigations between. */}
              <SiteTour />
              <PrivacyNotice />
            </SiteOnly>
          </MotionProvider>
          <VisitorPing />
        </RobotChatProvider>

        {/* Vercel Analytics + Core Web Vitals — zero-config, privacy-first.
            Enable "Analytics" and "Speed Insights" in the Vercel dashboard. */}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics 4 — behavioral/event tracking.
            G-9D3BDPZH49 : portfolio property
            G-52W6W0B4W6 : Google Ads-linked property */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9D3BDPZH49"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-9D3BDPZH49');gtag('config','G-52W6W0B4W6');`}
        </Script>
      </body>
    </html>
  );
}
