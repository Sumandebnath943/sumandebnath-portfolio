import type { Metadata } from "next";
import BannerArt from "@/components/ui/BannerArt";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import RelatedPages from "@/components/ui/RelatedPages";
import PageFaq from "@/components/ui/PageFaq";
import AIPhilosophy from "@/components/sections/AIPhilosophy";
import PhilosophyFAQ from "@/components/sections/PhilosophyFAQ";
import Contact from "@/components/sections/Contact";
import { SITE_URL } from "@/lib/projects";
import "./philosophy.css";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

/**
 * The six principles, in the accents AIPhilosophy already assigns them, so the
 * ledger here and the expanded section below read as one idea rather than two.
 * Titles are that component's — kept in step by hand, since it holds them as
 * layout data rather than exporting them.
 */
const PRINCIPLES = [
  // #4A8FE0 rather than AIPhilosophy's #2E6FBF: that blue is set on white
  // below, where it reads fine, but only manages 3.96:1 on this dark ledger.
  { n: "01", name: "Intelligence Is Infrastructure", claim: "Not a feature. The layer everything else is designed through.", accent: "#4A8FE0" },
  { n: "02", name: "Systems Compound", claim: "One-off execution collapses under scale. Systems don't.", accent: "#10B981" },
  { n: "03", name: "Human Identity Must Survive Automation", claim: "The scarce thing is judgment, taste and instinct.", accent: "#FF5A1F" },
  { n: "04", name: "Craft Still Matters", claim: "Execution without taste just produces more noise.", accent: "#C5A059" },
  { n: "05", name: "Speed Is A Creative Advantage", claim: "The gap between thought and execution is now the work.", accent: "#7B61FF" },
  { n: "06", name: "The Operator Evolves", claim: "Design, strategy, engineering and orchestration converge.", accent: "#FF003C" },
];

export const metadata: Metadata = {
  title: "AI-Native Operating Philosophy",
  description:
    "The six operating principles shaping every system, workflow, and decision Suman Debnath builds — from 'intelligence is infrastructure' to 'the operator evolves'.",
  alternates: { canonical: "/philosophy" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/philosophy`,
    title: "AI-Native Operating Philosophy · Suman Debnath",
    description:
      "Six operating principles shaping every AI-native system Suman Debnath builds.",
    images: ["/og-image.png"],
  },
};

/* BreadcrumbList JSON-LD is NOT declared here. <Breadcrumbs> emits it together
   with the visible trail — see components/ui/Breadcrumbs.tsx. Two BreadcrumbList
   nodes on one URL is a conflict, and the one matching what the reader can see
   is the one that should win. */

export default function PhilosophyPage() {
  return (
    <MotionProvider>
      <Navigation />
      <main className="ph">
        {/* ── The manifesto opening ───────────────────────────────────────
            Replaces a bare pt-32 spacer. The ledger doubles as a contents
            page for the six principles expanded immediately below. */}
        <header className="ph-hero sd-banner-host">
          <BannerArt seed="/philosophy" accent="#F472B6" />
          <div className="ph-shell">
            <Breadcrumbs
              trail={[
                { label: "Philosophy", href: "/philosophy" },
              ]}
              className="mb-6"
            />
            <p className="ph-eyebrow">Operating philosophy</p>
            <h1 className="ph-title">
              Six things I believe about <em>building</em> with AI.
            </h1>
            <p className="ph-standfirst">
              Not predictions, and not opinions about which model is winning this
              month. These are the working rules underneath every system on this
              site — the reasons things are built the way they are built.
            </p>

            <div className="ph-ledger">
              {PRINCIPLES.map((p) => (
                <a
                  key={p.n}
                  href="#philosophy"
                  className="ph-row"
                  style={{ ["--accent" as string]: p.accent }}
                >
                  <span className="ph-n">{p.n}</span>
                  <span className="ph-name">{p.name}</span>
                  <span className="ph-claim">{p.claim}</span>
                </a>
              ))}
            </div>
          </div>
        </header>

        {/* The expanded principles, on white — now a deliberate light section
            after a dark opening rather than white-on-white with a spacer. */}
        <AIPhilosophy />
        <PhilosophyFAQ />

        <section className="ph-close">
          <div className="ph-shell">
            <blockquote>
              Human instinct. AI amplification. <em>Systemic execution.</em>
            </blockquote>
            <cite>The whole thesis, in six words</cite>
          </div>
        </section>
      </main>
      <PageFaq href="/philosophy" />
      <RelatedPages href="/philosophy" />
      <Contact />
    </MotionProvider>
  );
}
