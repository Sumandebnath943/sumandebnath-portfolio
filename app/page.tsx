import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import LoaderGate from "@/components/layout/LoaderGate";
import Hero from "@/components/sections/Hero";
import Film from "@/components/sections/Film";
import Announcement from "@/components/sections/Announcement";
import ExperienceNarrative from "@/components/sections/ExperienceNarrative";
import NowBuilding from "@/components/sections/NowBuilding";
import Experience from "@/components/sections/Experience";
import SystemsStack from "@/components/sections/SystemsStack";
import Projects from "@/components/sections/Projects";
import AIPhilosophy from "@/components/sections/AIPhilosophy";
import PhilosophyFAQ from "@/components/sections/PhilosophyFAQ";
import OperationalHistory from "@/components/sections/OperationalHistory";
import AcademicFoundations from "@/components/sections/AcademicFoundations";
import SignatureStrip from "@/components/sections/SignatureStrip";
import Contact from "@/components/sections/Contact";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/projects";
import { personRef } from "@/lib/schema";
import RelatedPages from "@/components/ui/RelatedPages";
import { featuredPost, postUrl } from "@/lib/notebook";

/**
 * The notebook's featured article, as a ticker entry.
 *
 * Derived from the registry rather than typed into the ticker's own list, so
 * flipping `featured` on a post is the only thing anyone has to do — the same
 * reasoning as /llms.txt and lib/route-dates.ts in AEO_PLAYBOOK §4. A
 * hand-maintained copy of a headline is a copy that goes stale.
 *
 * Composed here rather than inside Announcement because that component is
 * `"use client"`: importing the registry there would ship every block of all
 * twenty-eight posts to the browser to render one line.
 *
 * **The chip only claims "new" while that is true.** `featured` has no expiry
 * and an article can hold the slot for months, so the word is derived from the
 * publication date against build time rather than asserted. Same rule as the
 * notebook's "Editor's pick" badge, which refuses to say "most read" because
 * nothing here counts readers — a label that can quietly become false is worse
 * than a duller one that cannot.
 */
function featuredTicker() {
  const post = featuredPost();
  const days =
    (Date.now() - new Date(`${post.published}T00:00:00Z`).getTime()) / 86_400_000;
  return {
    title: post.title,
    // No supporting line. Post titles here are number-led claims that already
    // say the whole thing — "The AI agent cost guides say $200 a month. Mine
    // has cost $5." needs nothing after it, and the 158-character `description`
    // is written for a search result, where the reader is not moving.
    href: postUrl(post.slug),
    // Warm gold. Distinct from every product colour in the ticker, and it reads
    // as editorial next to the product accents rather than competing with them.
    color: "#FFC24B",
    badge: days <= 45 ? "New essay" : "Essay",
  };
}

/*
  The homepage node.

  `name` and `description` are repeated here rather than left to be inherited
  through `mainEntity` → `#person`. A parser that resolves the `@id` reference
  gets the whole Person either way; one that reads a single node and stops —
  which is what most identity extractors do, and what Vercel's Is Agentic audit
  found on 25 Aug 2026 — got a `ProfilePage` with no name and no description at
  all. Two properties is a cheap price for not depending on the reader
  dereferencing anything.

  Both strings come from lib/projects.ts, which is also where the root layout
  reads them, so this node and the page's own <title>/meta description cannot
  disagree.

  `mainEntity` is `personRef` — a typed, named stub carrying the same `@id` — for
  the same reason, one level down: a bare `{ "@id": … }` gave Google a
  `mainEntity` it could not resolve. See lib/schema.ts. `about` keeps the pure
  reference; nothing has reported trouble reading it.
*/
const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: personRef,
  about: { "@id": `${SITE_URL}/#person` },
};

export default function Home() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />

      {/* Cinematic Loader — overlays content on first visit per session */}
      <LoaderGate />

      {/* Layout chrome */}
      <Navigation />
      {/* CommandPalette moved to the root layout — mounted here it existed on
          this page only, leaving ⌘K dead everywhere else. */}

      {/* Page sections — server-rendered so all content lives in initial HTML */}
      <main>
        <Hero />
        <Announcement featured={featuredTicker()} />
        <Film />
        <ExperienceNarrative />
        <NowBuilding />
        <Experience />
        <SystemsStack />
        <Projects />
        <AIPhilosophy />
        <PhilosophyFAQ />
        <OperationalHistory />
        <AcademicFoundations />
        <RelatedPages href="/" />
        {/* The closing band. Last thing before the footer, homepage only. */}
        <SignatureStrip />
        <Contact />
      </main>

      {/* SiteTour used to be mounted here, which is precisely why the tour never
          left this page. It now lives in the root layout. */}
    </MotionProvider>
  );
}
