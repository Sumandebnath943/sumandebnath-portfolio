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
 * ## The variant
 *
 * The site has two registers: most pages sit on the near-black body colour,
 * while the paper pages — /resume, /profile, /journey, /learnings, /notebook —
 * are deliberately light and must not be normalised to the dark site (see
 * PROJECT_BIBLE on /profile). `Contact.tsx` solves the same problem with its own
 * `variant` prop, and this mirrors it so the two closing blocks always agree.
 *
 * **The light variant paints its own background, and must.** A first version
 * made it transparent on the theory that it would inherit the paper — but this
 * block is a sibling of `<main>`, and it is `<main>` that paints the paper. It
 * inherited `body`, which is `#050505` on every page on this site, and rendered
 * ink-dark text onto near-black. If you add a variant, give it a real
 * background.
 */

type Variant = "dark" | "paper";

const THEME: Record<
  Variant,
  { section: string; kicker: string; card: string; title: string; blurb: string }
> = {
  dark: {
    section: "border-white/10 bg-[#050505]",
    kicker: "text-white/40",
    card: "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]",
    title: "text-white",
    blurb: "text-white/50",
  },
  // Tuned against /resume's #f2ece0 and /journey's #f4efe6 — close enough to
  // both to read as the same sheet of paper, warm enough not to look grey
  // against either.
  paper: {
    section: "border-[#191512]/10 bg-[#f2ece0]",
    kicker: "text-[#191512]/45",
    card: "border-[#191512]/12 bg-[#191512]/[0.02] hover:border-[#191512]/30 hover:bg-[#191512]/[0.05]",
    title: "text-[#191512]",
    blurb: "text-[#191512]/60",
  },
};

export default function RelatedPages({
  href,
  heading = "Related",
  variant = "dark",
  className = "",
}: {
  /** The current page's path, exactly as it appears in lib/pages.ts. */
  href: string;
  heading?: string;
  /** Match the page this sits on. `paper` for the light pages. */
  variant?: Variant;
  className?: string;
}) {
  const related = relatedFor(href);
  if (related.length === 0) return null;

  const t = THEME[variant];

  return (
    <section
      aria-labelledby="related-heading"
      className={`relative border-t px-6 py-14 sm:px-10 lg:px-16 ${t.section} ${className}`}
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
