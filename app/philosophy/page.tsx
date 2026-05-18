import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import AIPhilosophy from "@/components/sections/AIPhilosophy";
import PhilosophyFAQ from "@/components/sections/PhilosophyFAQ";
import Contact from "@/components/sections/Contact";
import { SITE_URL } from "@/lib/projects";

export const metadata: Metadata = {
  title: "AI-Native Operating Philosophy",
  description:
    "The six operating principles that shape every system, workflow, and decision Suman Debnath builds. Intelligence is infrastructure, systems compound, human identity must survive automation, craft still matters, speed is a creative advantage, and the operator evolves.",
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

export default function PhilosophyPage() {
  return (
    <MotionProvider>
      <Navigation />
      <main className="bg-white">
        <div className="pt-32" />
        <AIPhilosophy />
        <PhilosophyFAQ />
      </main>
      <Contact />
      <Footer />
    </MotionProvider>
  );
}
