import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import CommandPalette from "@/components/layout/CommandPalette";
import Footer from "@/components/layout/Footer";
import LoaderGate from "@/components/layout/LoaderGate";
import Hero from "@/components/sections/Hero";
import NowBuilding from "@/components/sections/NowBuilding";
import Experience from "@/components/sections/Experience";
import SystemsStack from "@/components/sections/SystemsStack";
import Projects from "@/components/sections/Projects";
import AIPhilosophy from "@/components/sections/AIPhilosophy";
import PhilosophyFAQ from "@/components/sections/PhilosophyFAQ";
import OperationalHistory from "@/components/sections/OperationalHistory";
import AcademicFoundations from "@/components/sections/AcademicFoundations";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MotionProvider>
      {/* Cinematic Loader — overlays content on first visit per session */}
      <LoaderGate />

      {/* Layout chrome */}
      <Navigation />
      <CommandPalette />

      {/* Page sections — server-rendered so all content lives in initial HTML */}
      <main>
        <Hero />
        <NowBuilding />
        <Experience />
        <SystemsStack />
        <Projects />
        <AIPhilosophy />
        <PhilosophyFAQ />
        <OperationalHistory />
        <AcademicFoundations />
        <Contact />
      </main>

      <Footer />
    </MotionProvider>
  );
}
