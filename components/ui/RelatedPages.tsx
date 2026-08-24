import Link from "next/link";
import { relatedFor } from "@/lib/pages";

/**
 * The related rail that closes a page's content, above the Contact strip.
 *
 * A deliberate **server** component with no animation and no client bundle.
 * The entire value of this thing is that three real `<a href>` elements exist
 * in the server-rendered HTML: a crawler that never runs JavaScript, and every
 * AI fetcher that reads raw markup, has to be able to walk from any page to
 * three others. Before this existed, nine of eleven product pages had no
 * in-content link to anywhere else on the site — the nav menus were the only
 * path between them. An animated client version would have looked nicer and
 * done none of that reliably.
 *
 * ## Why it is always dark, even on the paper pages
 *
 * This site has two families: most pages sit on the near-black body colour,
 * while the "paper" pages — /resume, /profile, /journey, /contact, /learnings —
 * are deliberately light and must not be normalised to the dark site (see
 * PROJECT_BIBLE on /profile). `components/sections/Contact.tsx` carries a
 * `variant` prop for exactly that reason, so this component was built with a
 * matching one.
 *
 * **That was wrong, and it was measured wrong.** The rail is always a sibling
 * of `<main>`, never a child of it — and it is each page's `<main>` that paints
 * the paper. So the rail never sits on paper at all; it sits on `body`, which
 * is `#050505` on every page on the site. A "light" variant rendered ink-dark
 * text onto near-black and was very nearly invisible on /resume.
 *
 * The variant is therefore gone rather than fixed. One background, correct
 * everywhere, because there is only ever one background underneath it.
 */
export default function RelatedPages({
  href,
  heading = "Related",
  className = "",
}: {
  /** The current page's path, exactly as it appears in lib/pages.ts. */
  href: string;
  heading?: string;
  className?: string;
}) {
  const related = relatedFor(href);
  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className={`relative border-t border-white/10 bg-[#050505] px-6 py-16 sm:px-10 lg:px-16 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="related-heading"
          className="mb-8 font-dmmono text-[11px] uppercase tracking-[0.22em] text-white/40"
        >
          {heading}
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="group block h-full rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.05]"
              >
                {/* The hairline is the only thing that takes the destination's
                    own accent. It reads as a doorway out of this page rather
                    than as part of it — which matters because the rail sits on
                    twenty different page palettes. */}
                <span
                  aria-hidden="true"
                  className="mb-5 block h-px w-10 transition-[width] duration-300 group-hover:w-20"
                  style={{ backgroundColor: page.accent }}
                />
                <span className="block text-lg font-medium text-white">{page.label}</span>
                <span className="mt-2 block text-sm leading-relaxed text-white/50">
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
