// Per-project SEO + outbound link enhancement injected near the end of each
// dossier. Renders SoftwareApplication JSON-LD (invisible, for AI search and
// Google rich results) plus a tasteful "Open Live System" anchor when the
// project has a live URL. Visually minimal so it doesn't disturb the
// cinematic dossier compositions.

import { getProject, softwareApplicationJsonLd } from "@/lib/projects";

interface DossierMetaProps {
  slug: string;
  /** Optional CTA label override. Defaults vary by status. */
  label?: string;
}

export default function DossierMeta({ slug, label }: DossierMetaProps) {
  const project = getProject(slug);
  if (!project) return null;

  const jsonLd = softwareApplicationJsonLd(project);
  const liveLabel =
    label ??
    (project.status === "Live"
      ? `Open ${project.name} →`
      : project.status === "Stealth"
      ? `${project.name} · In stealth`
      : `${project.name} · Coming soon`);

  return (
    <div className="flex flex-col items-center py-16 gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — open the live system in a new tab`}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.03] text-white/85 hover:text-white hover:bg-white/[0.08] hover:border-white/30 transition-colors text-[13px] font-medium tracking-wide"
          style={{ borderColor: `${project.primaryAccent}40` }}
        >
          <span>{liveLabel}</span>
        </a>
      ) : (
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          {liveLabel}
        </p>
      )}
    </div>
  );
}
