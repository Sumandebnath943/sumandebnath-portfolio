import Link from "next/link";
import { GROUP_LABELS, PAGES, type PageGroup } from "@/lib/pages";

/**
 * The site-wide link map — the last block on every page but the homepage.
 *
 * There was no footer at all. `components/layout/Footer.tsx` returned `null`
 * and had done since the beginning, with a comment explaining that the homepage
 * Contact section owns the closing strip. That was true of the homepage and
 * quietly false of the other twenty-six pages, which simply ended. It is most
 * of why nine product pages had no in-content link to anywhere else on the
 * site.
 *
 * **This is a link map and nothing else.** No copyright, no identity line, no
 * socials — `components/sections/Contact.tsx` already closes sixteen of these
 * pages with all three, and repeating them a few hundred pixels lower is how a
 * page ends up with two copyright notices. The one exception is the utility row
 * at the bottom, which carries Privacy and Terms: those *are* in the Contact
 * strip, but the six pages that do not render Contact — the agents, the two
 * model pages, PixelVille, Fun Apps and Journey — had no route to either.
 *
 * Server component, no animation. The entire point is real `<a href>` in the
 * server-rendered HTML.
 */

const ORDER: PageGroup[] = ["start", "agents", "models", "apps", "writing", "person"];

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050505] px-6 pb-10 pt-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {ORDER.map((group) => (
            <div key={group}>
              <h2 className="mb-4 font-dmmono text-[10px] uppercase tracking-[0.22em] text-white/35">
                {GROUP_LABELS[group]}
              </h2>
              <ul className="space-y-2.5">
                {PAGES.filter((p) => p.group === group).map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/30">
          <Link href="/privacy" className="transition-colors hover:text-white/60">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white/60">
            Terms
          </Link>
          {/*
            Visible anchors to the AI context files, not just the <link rel> in
            the head. Plenty of crawlers only follow anchors, and a file nothing
            links to is a file most of them never request.
          */}
          <a href="/llms.txt" className="transition-colors hover:text-white/60">
            llms.txt
          </a>
          <a href="/notebook/rss.xml" className="transition-colors hover:text-white/60">
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
