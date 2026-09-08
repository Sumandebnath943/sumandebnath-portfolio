import Link from "next/link";
import { GROUP_LABELS, type PageEntry } from "@/lib/pages";

/**
 * A product documented in depth on this site, as a card on `/projects`.
 *
 * ## Why this is not `ArchiveCard`
 *
 * `ArchiveCard` renders an `ArchiveProject` — poster art, a status pill, a
 * positioning line, a stack list and a flip side. Those fields do not exist for
 * these nine pages and inventing them would mean maintaining a second copy of
 * facts that already live on the product page itself (see `dossierPages()`).
 * This card carries only what `lib/pages.ts` already knows to be true: the
 * name, the one-line blurb, the section it belongs to and its accent.
 *
 * The visual difference is deliberate rather than a limitation. The archive
 * cards describe products that mostly live on their own domains; these describe
 * pages on this site. A lighter card reads as "there is more of this to read
 * here", which is what the link actually offers.
 *
 * ## A server component, and it must stay one
 *
 * The whole point of the block is that nine real `<a href>` elements exist in
 * the server-rendered HTML of `/projects`. The site's nav renders its product
 * links only once a submenu is opened, so a crawler that does not run
 * JavaScript sees none of them — before this, six of these nine had no
 * server-rendered link from this page at all. Do not make this interactive.
 */
export default function DossierCard({ page }: { page: PageEntry }) {
  return (
    <Link
      href={page.href}
      className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A0C] p-6 transition-all duration-500 hover:-translate-y-px hover:border-white/[0.14] hover:bg-[#0C0C0F] md:p-7"
      style={{
        backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -20%, ${page.accent}10 0%, transparent 60%)`,
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${page.accent}28` }}
      />

      {/* The section this page sits under. It is the label the nav uses, and it
          is the only place on this page that says a product is an agent rather
          than an app. */}
      <span
        className="font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{ color: page.accent }}
      >
        {GROUP_LABELS[page.group]}
      </span>

      <h3 className="font-manrope text-lg font-semibold tracking-tight text-white">
        {page.label}
      </h3>

      <p className="font-manrope text-[14px] leading-[1.75] text-white/65 md:text-[15px]">
        {page.blurb}
      </p>

      <span className="mt-auto flex items-center gap-2 pt-2 font-manrope text-[12px] font-medium text-white/55 transition-colors group-hover:text-white/85">
        Read the full write-up
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}
