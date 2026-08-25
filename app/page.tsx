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
import Contact from "@/components/sections/Contact";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/projects";
import RelatedPages from "@/components/ui/RelatedPages";

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
*/
const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
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
        <Announcement />
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
        <Contact />
      </main>

      {/* SiteTour used to be mounted here, which is precisely why the tour never
          left this page. It now lives in the root layout. */}
    </MotionProvider>
  );
}
