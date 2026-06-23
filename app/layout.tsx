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

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
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

const SITE_URL = "https://sumandebnath.houseofnamus.com";
const SITE_NAME = "Suman Debnath — Brand Marketing Leader & AI Product Builder";
const SITE_DESCRIPTION =
  "Senior Brand Marketing Manager (9+ yrs) who builds AI-native products. A rare cross-domain profile — brand strategy plus hands-on AI product engineering.";

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
  disambiguatingDescription:
    "Suman Debnath, the Senior Brand Marketing Manager and AI-native product builder based in Pune & Kolkata, India — creator of ROASmind, IMPRINT, LEGATUS, CITE, EMBER and D-PE.ai. Not to be confused with other people of the same name, including the AWS Principal Developer Advocate (AI/ML), or the power-systems researcher.",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  email: "mailto:sumandebnath944@gmail.com",
  telephone: "+91-7980296957",
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
  sameAs: [
    "https://github.com/Sumandebnath943",
    "https://linkedin.com/in/houseofnamus",
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

import EasterEggs from "@/components/ui/EasterEggs";

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
        className="bg-bg-deep text-text-primary font-sans antialiased"
        suppressHydrationWarning
      >
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <RobotChatProvider>
          {children}
          <RobotMascot />
          <EasterEggs />
          <ChatTakeover />
        </RobotChatProvider>

        {/* Vercel Analytics + Core Web Vitals — zero-config, privacy-first.
            Enable "Analytics" and "Speed Insights" in the Vercel dashboard. */}
        <Analytics />
        <SpeedInsights />

        {/* ── GA4 paste-point (optional) ───────────────────────────────────
            To add Google Analytics 4 for behavioral/event tracking, create a
            GA4 property, then uncomment and replace G-XXXXXXXXXX below:

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`}
        </Script>
        ──────────────────────────────────────────────────────────────────── */}
      </body>
    </html>
  );
}
