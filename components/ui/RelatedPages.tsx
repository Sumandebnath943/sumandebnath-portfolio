import Link from "next/link";
import { relatedFor } from "@/lib/pages";

/**
 * Three genuinely related pages, closing a page's content directly above the
 * footer (`components/sections/Contact.tsx`).
 *
 * A deliberate **server** component with no animation and no client bundle. The
 * entire value of this thing is that three real `<a href>` elements exist in the
 * server-rendered HTML: a crawler that never runs JavaScript, and every AI
 * fetcher that reads raw markup, has to be able to walk from any page to three
 * others. Before this existed, nine of eleven product pages had no in-content
 * link to anywhere else on the site.
 *
 * **Three, not sixteen.** This is not a site index — the footer sitemap in
 * Contact.tsx is. This block answers "having read *this* page, what next", and
 * that answer is short by definition. Resist growing it.
 *
 * ## The variant, and the surface
 *
 * The site has two registers: most pages sit on a near-black, while the paper
 * pages — /resume, /profile, /journey, /learnings, /notebook — are deliberately
 * light and must not be normalised to the dark site (see PROJECT_BIBLE on
 * /profile). `Contact.tsx` solves the same problem with its own `variant` prop,
 * and this mirrors it so the two closing blocks always agree.
 *
 * **This block paints its own background, and must.** It is a sibling of
 * `<main>`, so it sits on `body` — it cannot inherit the page's colour by being
 * transparent. A first version tried exactly that and rendered ink-dark text
 * onto near-black.
 *
 * But a single hard-coded near-black was also wrong: the dark pages do not share
 * one. /faq is `#0b1016`, /about is `#070604`, /philosophy is `#08070b`. Painting
 * `#050505` under all three left a visible tonal seam at the point the page
 * appeared to stop. Hence `surface` — pass the page's own base colour and the
 * band continues it rather than interrupting it.
 *
 * ## Contrast
 *
 * The kicker was `text-white/40` and measured **3.71:1** on /faq — under WCAG AA,
 * and the thing Lighthouse was failing the page for. `faq.css`, `about.css` and
 * `philosophy.css` each independently record ~0.48 as the floor for this
 * palette; this component was written without checking any of them. Nothing here
 * goes below 0.62 now. **Do not lower these values without measuring.**
 */

type Variant = "dark" | "paper";

const THEME: Record<
  Variant,
  { border: string; kicker: string; card: string; title: string; blurb: string; fallback: string }
> = {
  dark: {
    border: "border-white/[0.12]",
    kicker: "text-white/[0.62]",
    // Was `bg-white/[0.02]` on a `/10` border — technically present, visually
    // absent. A card should read as an object sitting on the band, not as a
    // faint rectangle drawn on it.
    card: "border-white/[0.14] bg-white/[0.05] hover:border-white/[0.32] hover:bg-white/[0.09]",
    title: "text-white",
    blurb: "text-white/[0.62]",
    fallback: "#050505",
  },
  paper: {
    border: "border-[#191512]/[0.12]",
    kicker: "text-[#191512]/[0.62]",
    // White cards on a slightly deeper band. On the paper pages everything was
    // previously one cream on another and the cards disappeared into the page.
    card: "border-[#191512]/[0.16] bg-white/70 hover:border-[#191512]/[0.34] hover:bg-white",
    title: "text-[#191512]",
    blurb: "text-[#191512]/[0.72]",
    // A half-step deeper than the paper pages (#f2ece0 / #f4efe6 / #f4f4f0) so
    // the band separates from the page above it *by layering* rather than by
    // going dark.
    fallback: "#ece5d8",
  },
};

export default function RelatedPages({
  href,
  heading = "Related",
  variant = "dark",
  surface,
  className = "",
}: {
  /** The current page's path, exactly as it appears in lib/pages.ts. */
  href: string;
  heading?: string;
  /** Match the page this sits on. `paper` for the light pages. */
  variant?: Variant;
  /** The page's own base colour, e.g. `"#0b1016"`. See the note above. */
  surface?: string;
  className?: string;
}) {
  const related = relatedFor(href);
  if (related.length === 0) return null;

  const t = THEME[variant];

  return (
    <section
      aria-labelledby="related-heading"
      style={{ backgroundColor: surface ?? t.fallback }}
      className={`relative border-t px-6 py-14 sm:px-10 lg:px-16 ${t.border} ${className}`}
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="related-heading"
          className={`mb-7 font-dmmono text-[11px] uppercase tracking-[0.22em] ${t.kicker}`}
        >
          {heading}
        </h2>

        <ul className="grid gap-4 sm:grid-cols-3">
          {related.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className={`group block h-full rounded-xl border p-5 transition-colors duration-300 ${t.card}`}
              >
                {/* The hairline is the only thing that takes the destination's
                    own accent. It reads as a doorway out of this page rather
                    than as part of it — which matters because this block sits on
                    twenty different page palettes. */}
                <span
                  aria-hidden="true"
                  className="mb-4 block h-px w-9 transition-[width] duration-300 group-hover:w-16"
                  style={{ backgroundColor: page.accent }}
                />
                <span className={`block text-base font-medium ${t.title}`}>{page.label}</span>
                <span className={`mt-1.5 block text-[13px] leading-relaxed ${t.blurb}`}>
                  {page.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
