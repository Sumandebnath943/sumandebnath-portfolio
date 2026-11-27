import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Achievement } from "./achievements";
import styles from "./recognitions.module.css";

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { id, title, edition, issuer, year, profile, milestones } = achievement;
  const headingId = `${id}-title`;

  return (
    <article className={styles.achievement} aria-labelledby={headingId}>
      <header className={styles.achievementHeader}>
        <p className={styles.issuer}>
          {issuer} <span aria-hidden="true">·</span> <time dateTime={String(year)}>{year}</time>
        </p>
        <h2 className={styles.achievementTitle} id={headingId}>
          {title} <em>{edition}</em>
        </h2>
      </header>

      <ol aria-label={`${title} ${edition} milestones`} className={styles.milestones} role="list">
        {milestones.map((milestone) => {
          const milestoneId = `${id}-${milestone.id}`;

          return (
            <li
              key={milestone.id}
              className={`${styles.milestone}${milestone.featured ? ` ${styles.featured}` : ""}`}
            >
              <a
                className={styles.badge}
                href={milestone.credentialUrl ?? profile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-labelledby={`${milestoneId}-name`}
                aria-describedby={`${milestoneId}-description ${milestoneId}-tooltip`}
              >
                <ArrowUpRight size={17} className={styles.badgeArrow} aria-hidden="true" />
                <span className={styles.artwork}>
                  <Image {...milestone.image} alt="" unoptimized />
                </span>
                <div className={styles.badgeCopy}>
                  <time className={styles.date} dateTime={milestone.date}>
                    {milestone.dateLabel}
                  </time>
                  <h3 className={styles.badgeName} id={`${milestoneId}-name`}>
                    {milestone.label}<span className="sr-only"> badge</span>
                    {milestone.credentialName && (
                      <span className={styles.credentialName}>{milestone.credentialName}</span>
                    )}
                  </h3>
                  <p className={styles.badgeDescription} id={`${milestoneId}-description`}>
                    {milestone.description}
                  </p>
                </div>
                <span className={styles.tooltip} id={`${milestoneId}-tooltip`} role="tooltip" data-chat-exclude>
                  {milestone.credentialUrl ? "View credential" : "View issuer profile"}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      <div className={styles.achievementFooter}>
        <a className={styles.profileLink} href={profile.href} target="_blank" rel="noopener noreferrer">
          {profile.label}
          <ExternalLink size={15} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
