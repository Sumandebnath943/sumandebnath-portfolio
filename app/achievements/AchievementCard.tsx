import Image from "next/image";
import { ArrowDown, ArrowUpRight, ExternalLink } from "lucide-react";
import type { Achievement } from "./achievements";
import styles from "./achievements.module.css";

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { id, category, title, edition, issuer, year, presentation, profile, milestones = [] } = achievement;
  const headingId = `${id}-title`;
  const proofsId = `${id}-proofs`;
  const proofs = milestones.flatMap(({ id, label, proof }) => (proof ? [{ id, label, proof }] : []));

  return (
    <article className={styles.achievement} aria-labelledby={headingId}>
      <header className={styles.achievementHeader}>
        <p className={styles.category}>{category}</p>
        <p className={styles.issuer}>
          {issuer} <span aria-hidden="true">·</span> <time dateTime={String(year)}>{year}</time>
        </p>
        <h2 className={styles.achievementTitle} id={headingId}>
          {title}{edition && <> <em>{edition}</em></>}
        </h2>
        {(presentation || proofs.length > 0) && (
          <div className={styles.achievementDetails}>
            {presentation && (
              <p className={styles.presentation}>
                Presented <a href={presentation.href} target="_blank" rel="noopener noreferrer">
                  {presentation.project}
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a> at {presentation.event}.
              </p>
            )}
            {proofs.length > 0 && (
              <a className={styles.proofJump} href={`#${proofsId}`}>
                View credential screenshots <ArrowDown size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </header>

      {milestones.length > 0 && (
        <ol aria-label={`${title} milestones`} className={styles.milestones} role="list">
          {milestones.map((milestone) => {
            const milestoneId = `${id}-${milestone.id}`;

            return (
              <li
                key={milestone.id}
                className={`${styles.milestone}${milestone.featured ? ` ${styles.featured}` : ""}`}
              >
                <a
                  className={styles.badge}
                  href={milestone.credentialUrl}
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
                    View credential
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      )}

      {profile && (
        <div className={styles.achievementFooter}>
          <a className={styles.profileLink} href={profile.href} target="_blank" rel="noopener noreferrer">
            {profile.label}
            <ExternalLink size={15} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}

      {proofs.length > 0 && (
        <section id={proofsId} className={styles.proofSection} aria-labelledby={`${proofsId}-heading`}>
          <h3 id={`${proofsId}-heading`}>Credential screenshots</h3>
          <ul className={styles.proofGrid} role="list">
            {proofs.map(({ id, label, proof }) => (
              <li key={id}>
                <a
                  className={styles.proofLink}
                  href={proof.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} credential screenshot (opens in a new tab)`}
                >
                  <Image src={proof.src} width={proof.width} height={proof.height} alt={proof.alt} unoptimized />
                  <span className={styles.proofCaption}>
                    {label}
                    <ExternalLink size={14} aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
