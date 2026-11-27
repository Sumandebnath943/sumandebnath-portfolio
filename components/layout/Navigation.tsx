"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MobileMenu from "@/components/layout/MobileMenu";

type SubMenu = {
  label: string;
  href?: string;
  color?: string;
  nativeLink?: boolean;
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
          { label: "Milo — Voice-First Agent Maker", href: "/agents/milo", color: "#FF6F3C" },
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
          { label: "PixelVille: Next Dimension", href: "/games/pixelville-next-dimension", color: "#F0C27A" },
          { label: "Pixelville", href: "/games/pixelville", color: "#F5B94A" },
          { label: "NUNO", href: "/games/nuno", color: "#FFC21A" },
        ],
      },
      {
        label: "Banking",
        color: "#4FA3D8",
        submenus: [
          { label: "Banking RM Copilot", href: "/banking/rm-copilot", color: "#D9A961" },
        ],
      },
      {
        label: "Crawlers",
        color: "#D6FF3D",
        submenus: [
          // V1 has no page here — the entry goes straight to its own domain, in a
          // new tab. V2's page carries the comparison between the two.
          { label: "Crawl Daddy", href: "https://crawldaddy.houseofnamus.com", color: "#FFC83D" },
          { label: "That One Crawler", href: "/crawlers/that-one-crawler", color: "#D6FF3D" },
        ],
      },
      {
        label: "CRMs",
        color: "#DDBD89",
        submenus: [
          { label: "OutreachOS", href: "/crms/outreachos", color: "#DDBD89", nativeLink: true },
        ],
      },
      {
        label: "AR",
        color: "#FF7E5F",
        submenus: [
          { label: "AR Video Resume", href: "/ar/video-resume", color: "#FF7E5F" },
        ],
      },
      { label: "Fun Apps", href: "/fun-apps", color: "#FF8C00" },
    ],
  },
  {
    label: "About Me",
    color: "#FB7185",
    submenus: [
      { label: "Experience", href: "/experience", color: "#F59E0B" },
      { label: "Profile", href: "/profile", color: "#F3B44A" },
      { label: "Recognitions", href: "/recognitions", color: "#D4AF37" },
      { label: "The Story", href: "/about", color: "#FB7185" },
      // /journey was reachable only from /resume and /profile — it was in the
      // sitemap and in no menu at all, which is how a page ends up orphaned.
      { label: "The Journey", href: "/journey", color: "#8B5CF6" },
      { label: "Philosophy", href: "/philosophy", color: "#F472B6" },
    ],
  },
  { label: "Notebook", href: "/notebook", color: "#7B61FF" },
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

/* The phone menu lives in MobileMenu.tsx ("the slab") and renders from the
   same navLinks, so it cannot fall behind the desktop bar. Its design
   decisions — and the two earlier designs that were rejected — are written
   at the top of that file. */

const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href);
const nestedLeafClass = "text-left px-3 py-2 text-xs font-medium text-[#bdbdc2] transition-all hover:text-[var(--c)] hover:bg-[var(--cb)] hover:shadow-[inset_0_0_0_1px_var(--cr)] rounded-lg whitespace-nowrap";

/** Marks an entry that leaves the site: a visible arrow, and words for a screen reader. */
function ExternalMark() {
  return (
    <>
      <span aria-hidden className="ml-1 opacity-60">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Closing by Close or Escape hands focus back to the button that opened it.
  // (Following a link closes it through handleNavClick instead, where focus
  // belongs to the new page.)
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (isExternal(href)) {
      // A product living on its own domain (Crawl Daddy). New tab, so the
      // portfolio stays where the visitor left it.
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
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
                                    {sub.submenus.map((leaf) => leaf.nativeLink ? (
                                      <a key={leaf.href} href={leaf.href} style={hueVars(leaf.color)} className={nestedLeafClass}>
                                        {leaf.label}
                                      </a>
                                    ) : (
                                      <button
                                        key={leaf.href}
                                        onClick={() => handleNavClick(leaf.href!)}
                                        style={hueVars(leaf.color)}
                                        className={nestedLeafClass}
                                      >
                                        {leaf.label}
                                        {isExternal(leaf.href) && <ExternalMark />}
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
              // needs. The phone menu's black bar still carries "Search ⌘K".
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

          {/* Mobile Toggle — labelled, not a bare icon: NN/g found the
              hamburger glyph alone is not universally read as "menu". Orange,
              because pressing it turns the whole screen that colour. The
              ::after widens the hit area to 44px+ without growing the pill.
              Only "Menu", never "Close": the open sheet covers this bar and
              carries its own Close. */}
          <button
            ref={menuButtonRef}
            className="md:hidden relative flex items-center gap-1.5 rounded-full bg-[#FF5500] px-3.5 py-2 font-dmmono text-[11px] uppercase tracking-[0.12em] text-[#0A0A0C] touch-manipulation after:absolute after:-inset-[6px] after:content-[''] active:bg-[#FF6B1A]"
            onClick={() => setMobileOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            Menu
            <Menu size={14} strokeWidth={2.25} aria-hidden />
          </button>
        </nav>
      </m.header>

      {/* The phone menu — a full-screen orange sheet. See MobileMenu.tsx. */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            links={navLinks}
            onClose={closeMobile}
            onNavigate={handleNavClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
