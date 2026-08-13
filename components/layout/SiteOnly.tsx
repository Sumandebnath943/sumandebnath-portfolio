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
 */
export default function SiteOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith(ADMIN_PATH)) return null;
  return <>{children}</>;
}
