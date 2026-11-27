import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import MotionProvider from "@/components/providers/MotionProvider";
import Contact from "@/components/sections/Contact";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroLock from "@/components/ui/HeroLock";
import PageFaq from "@/components/ui/PageFaq";
import RelatedPages from "@/components/ui/RelatedPages";
import AchievementCard from "./AchievementCard";
import { achievements } from "./achievements";
import styles from "./achievements.module.css";

const href = "/achievements";
const description =
  "Suman Debnath’s achievements, including presenting IMPRINT and earning three Google Developer badges at Google Startup Buildathon India 2026.";

export const metadata: Metadata = {
  title: "Achievements",
  description,
  keywords: ["Google Startup Buildathon India 2026", "Google Developer badges", "Prototype Shipper"],
  alternates: { canonical: href },
  openGraph: {
    type: "website",
    url: href,
    title: "Achievements · Suman Debnath",
    description,
    images: ["/og-image.png"],
  },
};

export default function AchievementsPage() {
  return (
    <MotionProvider>
      <Navigation />

      <div className={styles.page}>
        <main>
          <section className={styles.shell} aria-labelledby="achievements-heading">
            <HeroLock />
            <header className={styles.intro}>
              <Breadcrumbs
                className={styles.breadcrumbs}
                trail={[{ label: "About Me", href: "/about" }, { label: "Achievements", href }]}
              />
              <h1 id="achievements-heading">Achievements</h1>
            </header>

            <div className={styles.achievements}>
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </section>
        </main>

        <PageFaq href={href} heading="About the Buildathon badges" variant="system" surface="var(--achievements-bg)" />
        <RelatedPages href={href} variant="system" surface="var(--achievements-bg)" />
      </div>

      <Contact />
    </MotionProvider>
  );
}
