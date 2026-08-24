"use client";

import { usePathname } from "next/navigation";
import { ADMIN_PATH } from "@/lib/admin-path";

/**
 * Renders its children everywhere except the dashboard.
 *
 * The mascot, chat widget and easter eggs are mounted by the root layout, and a
 * nested layout cannot un-render what a parent already placed. Filtering here
 * keeps that decision in one spot — and keeps it on the client, so the rest of
 * the site stays statically prerendered. Reading the pathname on the server
 * would make every page dynamic to hide a robot on one of them.
 *
 * `hideOn` extends the same mechanism to chrome that is unwanted on one specific
 * route rather than on the whole dashboard. **Nothing uses it at present.** It
 * was added for a layout-level footer that turned out to be the wrong design —
 * this site's footer is `components/sections/Contact.tsx`, mounted per page
 * because it is themed per page (see the note in app/layout.tsx). The prop is
 * kept because the next piece of root-mounted chrome needing a per-route
 * exception will want it, and the subtlety below is easy to get wrong afresh.
 *
 * Note this is an exact-match list, not a prefix test: `/` is a prefix of every
 * route on the site, so `startsWith` here would hide the chrome everywhere and
 * do it quietly.
 */
export default function SiteOnly({
  children,
  hideOn,
}: {
  children: React.ReactNode;
  hideOn?: string[];
}) {
  const pathname = usePathname();
  if (pathname?.startsWith(ADMIN_PATH)) return null;
  if (hideOn && pathname && hideOn.includes(pathname)) return null;
  return <>{children}</>;
}
