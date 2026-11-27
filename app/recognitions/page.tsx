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
import styles from "./recognitions.module.css";

const href = "/recognitions";
const description =
  "Suman Debnath’s developer recognitions, including the Applicant, Participant and Builder badges from Google Startup Buildathon India 2026.";

export const metadata: Metadata = {
  title: "Recognitions & Developer Badges",
  description,
  keywords: ["Google Startup Buildathon India 2026", "Google Developer badges", "Prototype Shipper"],
  alternates: { canonical: href },
  openGraph: {
    type: "website",
    url: href,
    title: "Recognitions & Developer Badges · Suman Debnath",
    description,
    images: ["/og-image.png"],
  },
};

export default function RecognitionsPage() {
  return (
    <MotionProvider>
      <Navigation />

      <div className={styles.page}>
        <main>
          <section className={styles.shell} aria-labelledby="recognitions-heading">
            <HeroLock />
            <header className={styles.intro}>
              <Breadcrumbs
                className={styles.breadcrumbs}
                trail={[{ label: "About Me", href: "/about" }, { label: "Recognitions", href }]}
              />
              <h1 id="recognitions-heading">Recognitions</h1>
              <p>Developer badges and the work behind them.</p>
            </header>

            <div className={styles.achievements}>
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </section>
        </main>

        <PageFaq href={href} heading="About the Buildathon badges" variant="system" surface="var(--recognitions-bg)" />
        <RelatedPages href={href} variant="system" surface="var(--recognitions-bg)" />
      </div>

      <Contact />
    </MotionProvider>
  );
}
