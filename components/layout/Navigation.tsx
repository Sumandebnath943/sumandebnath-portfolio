"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type SubMenu = {
  label: string;
  href?: string;
  color?: string;
  submenus?: SubMenu[];
};

type NavLink = {
  label: string;
  href?: string;
  color?: string;
  submenus?: SubMenu[];
};

/**
 * The whole site, in one structure.
 *
 * Both menus render from this — desktop dropdowns and the phone sheet — so a
 * page added here appears in both. Several routes used to exist only in the
 * footer or the ⌘K palette and were unreachable from the menu at all.
 *
 * The homepage anchors sit inside "Home" rather than loose in the bar: with
 * Résumé, FAQ and About Me added they would have pushed the bar to twelve
 * top-level items. Contact is deliberately absent — it is the "Let's Talk"
 * button on the right, which is the same destination.
 *
 * Privacy stays footer-only, where legal furniture belongs.
 */
const navLinks: NavLink[] = [
  {
    label: "Home",
    // Both a destination and a menu — clicking the label lands on /, hovering
    // reveals the page's sections.
    href: "/",
    color: "#38BDF8",
    submenus: [
      { label: "Overview", href: "/", color: "#38BDF8" },
      { label: "Evolution", href: "#experience", color: "#38BDF8" },
      // Never had a menu entry despite being a full homepage section.
      { label: "Now Building", href: "#now", color: "#F97316" },
      // These two were previously labelled "Stack" -> #systems and "Systems"
      // -> #projects, which read backwards. The names now match the section
      // headings and the ⌘K palette.
      { label: "Systems Stack", href: "#systems", color: "#A78BFA" },
      { label: "Flagship Systems", href: "#projects", color: "#34D399" },
      { label: "AI Philosophy", href: "#philosophy", color: "#FB7185" },
      { label: "Experience", href: "#history", color: "#FACC15" },
    ],
  },
  {
    label: "Portfolio",
    color: "#FF8C00",
    submenus: [
      { label: "All Projects", href: "/projects", color: "#FF3B6B" },
      {
        label: "Agents",
        color: "#FF5500",
        submenus: [
          { label: "PACT Agent", href: "/agents/pact-agent", color: "#FF5500" },
          { label: "Pentashell", href: "/agents/pentashell", color: "#2FE2F0" },
          { label: "Migi — Personal Suite of AI Agents", href: "/agents/migi", color: "#C6F24E" },
        ],
      },
      {
        label: "SLMs",
        color: "#A78BFA",
        submenus: [
          { label: "PentaCMD", href: "/slms/pentacmd", color: "#38BDF8" },
        ],
      },
      {
        label: "LLMs",
        color: "#34D399",
        submenus: [
          { label: "Qdex-1.5B", href: "/llms/qdex-1.5b", color: "#2DD4BF" },
        ],
      },
      {
        // Was "Mobile Apps", which had no room for AEGIS VAULT — a web app that
        // until now was reachable only from ⌘K.
        label: "Apps",
        color: "#50C878",
        submenus: [
          { label: "Forget Anything?", href: "/apps/forget-anything", color: "#DAA520" },
          { label: "MIGI Android App", href: "/apps/migi-app", color: "#C6F24E" },
          { label: "AEGIS VAULT", href: "/projects/aegis-vault", color: "#7DD3FC" },
        ],
      },
      {
        label: "Games",
        color: "#F5B94A",
        submenus: [
          { label: "Pixelville", href: "/games/pixelville", color: "#F5B94A" },
        ],
      },
      { label: "Fun Apps", href: "/fun-apps", color: "#FF8C00" },
    ],
  },
  {
    label: "About Me",
    color: "#FB7185",
    submenus: [
      { label: "The Story", href: "/about", color: "#FB7185" },
      { label: "Philosophy", href: "/philosophy", color: "#F472B6" },
    ],
  },
  { label: "Learnings", href: "/learnings", color: "#22D3EE" },
  { label: "Résumé", href: "/resume", color: "#FBBF24" },
  { label: "FAQ", href: "/faq", color: "#94A3B8" },
];

// Per-item CSS vars so hover styles can reference each item's accent colour
// (Tailwind can't generate dynamic colours, so we drive them via custom props).
function hueVars(color?: string): React.CSSProperties | undefined {
  if (!color) return undefined;
  return {
    ["--c" as string]: color,
    ["--cb" as string]: `${color}24`, // soft fill (~14%)
    ["--cr" as string]: `${color}55`, // ring
  } as React.CSSProperties;
}

/* ── Phone menu styling ──────────────────────────────────────────────────
   These only ever apply inside the `md:hidden` menu, so none of it can
   reach the desktop bar. Rows are 48px+ tall for thumbs.                  */
// Light sheet on a dark scrim. The dark-on-dark panel had nothing to separate
// it from the page behind; inverting it makes the menu unmistakably its own
// surface and lets the per-item accent dots read at full strength.
// Rows sit at 44px — the touch-target floor and the usual mobile nav rhythm —
// rather than the roomier 48px+ they had.
const MOBILE_GROUP_LABEL =
  "flex items-center gap-2.5 px-4 pt-4 pb-1.5 text-[10px] font-semibold uppercase " +
  "tracking-[0.18em] text-[#5f5f66] before:h-px before:w-4 before:bg-black/20 before:content-['']";

const MOBILE_ROW =
  "flex items-center gap-3 text-left px-4 py-3 text-[15px] font-medium text-[#1f1f24] " +
  "hover:bg-black/[0.05] active:bg-black/[0.08] rounded-xl " +
  "transition-colors duration-150 touch-manipulation";

const MOBILE_SUBROW =
  "flex items-center gap-2.5 text-left px-3 py-3 text-[14px] font-medium text-[#4a4a53] " +
  "hover:bg-black/[0.05] active:bg-black/[0.08] rounded-lg " +
  "transition-colors duration-150 touch-manipulation";

/** The accent already carried by every nav entry, surfaced as a status dot. */
function Dot({ color, small = false }: { color?: string; small?: boolean }) {
  return (
    <span
      aria-hidden
      className={`shrink-0 rounded-full ${small ? "h-1 w-1" : "h-1.5 w-1.5"}`}
      style={{ backgroundColor: color ?? "#6a6a70" }}
    />
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Which Portfolio subgroups are expanded in the phone menu. Collapsed by
  // default: fully expanded the menu ran to 24 rows, taller than any phone.
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const router = useRouter();

  const toggleGroup = (label: string) =>
    setOpenGroups((g) => (g.includes(label) ? g.filter((l) => l !== label) : [...g, label]));

  // Collapse every group whenever the menu is toggled, so it always opens in
  // its short resting state. Done here rather than in an effect keyed on
  // mobileOpen, which would be a cascading render.
  const toggleMobile = () => {
    setMobileOpen((v) => !v);
    setOpenGroups([]);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        // Coming from a sub-page (/about, /projects, /faq, etc.): force a
        // real navigation so the browser resolves the hash and scrolls.
        // router.push("/#section") doesn't trigger native hash scroll
        // under App Router SPA navigation.
        // The rule below reads this as mutating an out-of-scope variable, but
        // this is a browser navigation from an event handler, not render state.
        // eslint-disable-next-line react-hooks/immutability
        window.location.href = "/" + href;
        return;
      }
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Cross-route link (e.g. /projects)
      router.push(href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // On any sub-page, let the browser follow href="/" naturally.
  };

  return (
    // Above the floating chat launcher (1000) and the robot mascot (9999),
    // both of which were landing on top of the open phone menu's lower rows
    // and swallowing their taps. Still below the tour overlay (999998).
    <div className="fixed top-0 left-0 right-0 z-[10000] flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      {/* ── Floating Dark Pill ── */}
      <m.header
        id="tour-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        // relative z-50 keeps the pill (and its close button) above the mobile
        // scrim, which sits at z-30.
        className={`pointer-events-auto relative z-50 w-full max-w-[60rem] transition-all duration-500 rounded-[2rem] bg-[#0A0A0C]/75 backdrop-blur-2xl backdrop-saturate-[180%] border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),inset_0_-1px_1px_0_rgba(255,255,255,0.04),0_8px_32px_-4px_rgba(0,0,0,0.55)] ${
          scrolled ? "py-1.5 px-3" : "py-2 px-4"
        }`}
      >
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <m.a
            href="/"
            onClick={handleLogoClick}
            aria-label="Suman Debnath — home"
            className="flex items-center gap-3 group px-2"
            whileHover={{ scale: 1.02 }}
          >
            {/* Branding Logo */}
            {/* Held at w-28 until lg. The centre group is absolutely centred, so
                the logo and it are on a collision course at the md breakpoint —
                six dropdowns need every pixel between 768px and 1024px. */}
            <div className="relative h-8 w-28 lg:w-36 flex items-center justify-start">
              {/* The source is 1520x348 and this box is at most 144x32, so a
                  plain <img> shipped ~100 KB to draw a thumbnail. next/image
                  resizes and serves AVIF/WebP instead.
                  `loading="eager"` rather than `priority` on purpose: priority
                  injects a preload <link> that would compete with the hero
                  portrait, which is this page's LCP element. */}
              <Image
                src="/branding/logo_navbar_v2.png"
                alt="Suman Debnath Logo"
                fill
                sizes="144px"
                loading="eager"
                className="object-contain object-left"
              />
            </div>
          </m.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, i) => {
              if (link.submenus) {
                return (
                  <div key={link.label} className="relative group">
                    {/* A group with its own `href` is both a destination and a
                        menu: hovering opens the dropdown, clicking goes to the
                        page. "Home" was previously a dead button — the only way
                        back to / was the logo. */}
                    <m.button
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                      onClick={link.href ? () => handleNavClick(link.href!) : undefined}
                      aria-label={link.href ? `${link.label} — open page, or hover for its sections` : undefined}
                      style={hueVars(link.color)}
                      className={`px-2 lg:px-3 py-2 text-[12px] lg:text-[13px] font-medium text-[#bdbdc2] transition-all duration-200 rounded-full group-hover:text-[var(--c)] group-hover:bg-[var(--cb)] group-hover:shadow-[inset_0_0_0_1px_var(--cr),0_5px_18px_-8px_var(--c)] flex items-center gap-1 lg:gap-1.5 whitespace-nowrap ${
                        link.href ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      {link.label}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="m6 9 6 6 6-6"/></svg>
                    </m.button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="flex flex-col min-w-[150px] bg-[#0A0A0C]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-1.5 shadow-2xl">
                        {link.submenus.map((sub) => {
                          // Nested level (e.g. Agents → PACT Agent): a side flyout.
                          if (sub.submenus) {
                            return (
                              <div key={sub.label} className="relative group/sub">
                                <div style={hueVars(sub.color)} className="flex items-center justify-between gap-2 px-3 py-2 text-xs font-medium text-[#bdbdc2] transition-all group-hover/sub:text-[var(--c)] group-hover/sub:bg-[var(--cb)] group-hover/sub:shadow-[inset_0_0_0_1px_var(--cr)] rounded-lg cursor-default">
                                  {sub.label}
                                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="m9 18 6-6-6-6" /></svg>
                                </div>
                                {/* Side flyout */}
                                <div className="absolute top-0 left-full pl-2 opacity-0 translate-x-1 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:translate-x-0 group-hover/sub:pointer-events-auto transition-all duration-200 z-50">
                                  <div className="flex flex-col min-w-[150px] bg-[#0A0A0C]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-1.5 shadow-2xl">
                                    {sub.submenus.map((leaf) => (
                                      <button
                                        key={leaf.href}
                                        onClick={() => handleNavClick(leaf.href!)}
                                        style={hueVars(leaf.color)}
                                        className="text-left px-3 py-2 text-xs font-medium text-[#bdbdc2] transition-all hover:text-[var(--c)] hover:bg-[var(--cb)] hover:shadow-[inset_0_0_0_1px_var(--cr)] rounded-lg whitespace-nowrap"
                                      >
                                        {leaf.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return (
                            <button
                              key={sub.href}
                              onClick={() => handleNavClick(sub.href!)}
                              style={hueVars(sub.color)}
                              className="text-left px-3 py-2 text-xs font-medium text-[#bdbdc2] transition-all hover:text-[var(--c)] hover:bg-[var(--cb)] hover:shadow-[inset_0_0_0_1px_var(--cr)] rounded-lg"
                            >
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <m.button
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  onClick={() => handleNavClick(link.href!)}
                  style={hueVars(link.color)}
                  className="px-2 lg:px-3 py-2 text-[12px] lg:text-[13px] font-medium text-[#bdbdc2] transition-all duration-200 rounded-full whitespace-nowrap hover:text-[var(--c)] hover:bg-[var(--cb)] hover:shadow-[inset_0_0_0_1px_var(--cr),0_5px_18px_-8px_var(--c)]"
                >
                  {link.label}
                </m.button>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cmd+K button styled like a sleek badge */}
            <m.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-command-palette"))
              }
              // lg, not md: a ⌘K badge is useless on a tablet with no keyboard,
              // and dropping it below 1024px buys the six-item bar the room it
              // needs. The phone sheet still carries a "Search Command" row.
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] text-[#bdbdc2] hover:text-[#f5f5f7] hover:border-white/[0.15] bg-white/[0.02] transition-all duration-200 text-xs font-mono"
            >
              <span>⌘K</span>
            </m.button>
            {/* This is the menu's Contact entry — it goes to the real /contact
                page now rather than scrolling to the homepage's closing strip,
                which had no form and no way to actually send anything. */}
            <button
              onClick={() => handleNavClick("/contact")}
              className="px-4 py-1.5 rounded-full bg-[#f5f5f7] text-black text-[13px] font-medium hover:bg-white transition-colors"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            // 18px icon + 13px padding each side = a 44px target. This control
            // only exists below md, so the larger box costs desktop nothing.
            className="md:hidden p-[13px] -m-[5px] mr-0 rounded-full text-[#bdbdc2] hover:text-[#f5f5f7] hover:bg-white/5 transition-all touch-manipulation"
            onClick={toggleMobile}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </m.header>

      {/* Mobile Menu (Also dark mode locked) */}
      <AnimatePresence>
        {mobileOpen && (
          // A translucent panel over a dark page gave the menu nothing to sit
          // against — page content bled through and the two merged into one
          // dark mass. This scrim pushes the page back so the sheet reads as a
          // separate layer, and doubles as tap-to-dismiss.
          <m.div
            key="mobile-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleMobile}
            aria-hidden
            className="pointer-events-auto fixed inset-0 z-30 bg-black/70 backdrop-blur-[2px] md:hidden"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            id="mobile-nav-panel"
            // The panel hangs off a `fixed` parent, so the page scroll can never
            // reach it — without its own scroll box, anything past the fold is
            // simply unreachable. dvh (not vh) so the browser's collapsing
            // toolbar can't push the last items out of range on a phone.
            // Opaque and a step lighter than the page, so it is legible as its
            // own surface instead of a translucent near-black slab that the
            // site showed through.
            className="pointer-events-auto absolute top-20 left-4 right-4 z-40 max-h-[calc(100dvh_-_6rem)] overflow-y-auto overscroll-contain rounded-[1.75rem] bg-[#FBFBF9] border border-black/[0.08] p-2.5 pb-[calc(0.625rem_+_env(safe-area-inset-bottom))] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55)]"
          >
            <div className="flex flex-col">
              {/* Rendered straight off navLinks rather than from hardcoded
                  blocks, so the sheet can never fall behind the desktop bar the
                  way it did when routes were added to one and not the other.
                  Each top-level group becomes a labelled block; a nested
                  category inside it stays collapsed until tapped, because fully
                  expanded the menu runs past the bottom of any phone. Every row
                  keeps its accent dot — colours navLinks already carried but
                  only the desktop hover state ever used. */}
              {navLinks
                .filter((link) => link.submenus)
                .map((group) => (
                  <div key={group.label} className="flex flex-col">
                    <p className={MOBILE_GROUP_LABEL}>{group.label}</p>
                    {group.submenus!.map((sub) => {
                      // Leaf route or anchor — render it directly.
                      if (!sub.submenus) {
                        return (
                          <button
                            key={sub.href}
                            onClick={() => handleNavClick(sub.href!)}
                            className={MOBILE_ROW}
                          >
                            <Dot color={sub.color} />
                            {sub.label}
                          </button>
                        );
                      }
                      // Category — collapsed until tapped.
                      const expanded = openGroups.includes(sub.label);
                      return (
                        <div key={sub.label} className="flex flex-col">
                          <button
                            onClick={() => toggleGroup(sub.label)}
                            aria-expanded={expanded}
                            className={`${MOBILE_ROW} justify-between`}
                          >
                            <span className="flex items-center gap-3">
                              <Dot color={sub.color} />
                              {sub.label}
                            </span>
                            <span className="flex items-center gap-2.5">
                              <span className="text-[11px] font-mono text-[#8a8a93]">
                                {sub.submenus.length}
                              </span>
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`text-[#8a8a93] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </span>
                          </button>
                          {expanded && (
                            <div className="flex flex-col border-l border-black/[0.12] ml-[1.4rem] pl-2 my-0.5">
                              {sub.submenus.map((leaf) => (
                                <button
                                  key={leaf.href}
                                  onClick={() => handleNavClick(leaf.href!)}
                                  className={MOBILE_SUBROW}
                                >
                                  <Dot color={leaf.color} small />
                                  <span className="truncate">{leaf.label}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}

              {/* Top-level routes with no dropdown of their own. */}
              <p className={MOBILE_GROUP_LABEL}>More</p>
              {navLinks
                .filter((link) => !link.submenus)
                .map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href!)}
                    className={MOBILE_ROW}
                  >
                    <Dot color={link.color} />
                    {link.label}
                  </button>
                ))}

              <div className="h-[1px] w-full bg-black/[0.08] my-1.5" />
              <button
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }}
                className="text-left flex items-center justify-between px-4 py-3 text-[15px] font-medium text-[#1f1f24] hover:bg-black/[0.05] active:bg-black/[0.08] rounded-xl transition-colors duration-150 touch-manipulation"
              >
                Search Command
                <span className="text-[11px] font-mono text-[#6b6b73] px-2 py-1 rounded bg-black/[0.05] border border-black/[0.08]">⌘K</span>
              </button>
              {/* The desktop bar carries this CTA in a `hidden md:flex` group,
                  which left the phone menu with no way to start a conversation. */}
              <button
                onClick={() => handleNavClick("/contact")}
                className="mt-1.5 flex items-center justify-center rounded-xl bg-[#1A1A1A] px-4 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-black touch-manipulation"
              >
                Let&apos;s Talk
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
