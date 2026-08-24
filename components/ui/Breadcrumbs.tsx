import Link from "next/link";
import { SITE_URL } from "@/lib/projects";

/**
 * The breadcrumb trail — visible markup and `BreadcrumbList` structured data,
 * from one call.
 *
 * ## Why both halves have to come from the same component
 *
 * Before this existed the site had `BreadcrumbList` JSON-LD on fourteen pages
 * and a *visible* trail on two. Structured data describing navigation the page
 * does not actually offer is a claim rather than a feature: Google's breadcrumb
 * guidance is explicit that the markup must represent a trail shown to the user,
 * and the two halves drifting apart is exactly what happens when they are
 * written in different places. Emitting both from one array makes that
 * impossible.
 *
 * ## Why breadcrumbs are worth the effort
 *
 * They are not a ranking factor in themselves. What they do is:
 *
 *   • replace the URL in the Google result with a readable hierarchy, which
 *     measurably affects click-through;
 *   • give every page a second, differently-worded internal link to its parent,
 *     which spreads link equity to section pages that otherwise only the nav
 *     points at;
 *   • give an answer engine the page's place in the site, so a citation can say
 *     "on his Agents section" rather than treating every URL as free-floating.
 *
 * ## The trail must be real
 *
 * `/agents/pentashell` sits under a Portfolio → Agents menu, but **there is no
 * `/agents` route** — it would 404. A crumb that leads nowhere is worse than no
 * crumb, so section names that have no page are rendered as plain text, not
 * links. Pass `href: null` for those.
 */

export interface Crumb {
  label: string;
  /** `null` renders the crumb as text — use it for a section with no page. */
  href: string | null;
}

export default function Breadcrumbs({
  trail,
  variant = "dark",
  className = "",
}: {
  /** Without Home and without the current page — both are added here. */
  trail: Crumb[];
  variant?: "dark" | "paper";
  /** The current page: its own label and path. */
  className?: string;
}) {
  const paper = variant === "paper";

  const items: Crumb[] = [{ label: "Home", href: "/" }, ...trail];

  // Only linked crumbs carry a `position` in the schema; an unlinked section is
  // still a named step, so it keeps its position with a `name` and no `item`.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: c.href === "/" ? SITE_URL : `${SITE_URL}${c.href}` } : {}),
    })),
  };

  const text = paper ? "text-[#191512]/50" : "text-white/40";
  const link = paper ? "hover:text-[#191512]" : "hover:text-white";
  const current = paper ? "text-[#191512]/80" : "text-white/70";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-dmmono text-[10px] uppercase tracking-[0.16em] ${text}`}
        >
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                {c.href && !last ? (
                  <Link href={c.href} className={`transition-colors ${link}`}>
                    {c.label}
                  </Link>
                ) : (
                  <span className={last ? current : undefined} aria-current={last ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
