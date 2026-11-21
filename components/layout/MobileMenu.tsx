"use client";

/**
 * The phone menu — "the slab".
 *
 * Below md the whole screen turns the hero's signature orange and the site is
 * offered as six giant Anton words. Designed against the research written up
 * in HANDOFF (NN/g "Mobile Subnavigation" and "Beyond the Hamburger", Smashing
 * "Designing Navigation for Mobile"); the decisions that came out of it:
 *
 *   - ACCORDIONS, NOT SLIDE-IN PANELS. Every category here has three children
 *     or fewer, which is exactly where accordions win; sequential panels fight
 *     the phone's own Back button. Nothing slides sideways.
 *   - THREE LEVELS THAT LOOK DIFFERENT. Big word (Work) → Anton group row
 *     (Agents 03 +) → serif italic project row on a deeper orange band. Groups
 *     start COLLAPSED and open on tap, one at a time, so the list never grows
 *     much past a screen — he asked for this explicitly.
 *   - THE WHOLE ROW IS THE TARGET. No split "link + chevron" rows.
 *   - YOU ARE HERE. Opened on a project page, Work and that project's group
 *     open themselves and the row is set in a black band.
 *   - THE GAME IS A WORD. "Play" is the sixth big word, in cream, with the pixel
 *     controller. Violet-and-gold game furniture was tried inside the slab and
 *     read as a third palette.
 *   - The light card sheet this replaces was rejected as confusing; the earlier
 *     grey-card redesigns as "all looking the same". Do not drift back to rows
 *     of rounded grey boxes.
 *
 * The contents still come from Navigation's `navLinks`, so a page added there
 * appears here too. The one reshaping is SLMs + LLMs → one "Models" group, each
 * row tagged SLM or LLM (MERGE below).
 *
 * Behaviour: page scroll is locked while open; Escape closes; Tab is kept
 * inside; focus returns to the Menu button (Navigation owns that). Motion is a
 * short top-down wipe, and only a fade under prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CAREER_MODE_URL, PixelPad } from "@/components/ui/CareerModeButton";
import { identity } from "@/lib/resume";

export type MenuEntry = {
  label: string;
  href?: string;
  color?: string;
  submenus?: MenuEntry[];
};

type Leaf = { label: string; href: string; tag?: string };
type Group = { label: string; items: Leaf[] };
type Section = "work" | "about" | "home";

/** Desktop categories folded together on the phone, with the tag each row keeps. */
const MERGE: Record<string, { into: string; tag: string }> = {
  SLMs: { into: "Models", tag: "SLM" },
  LLMs: { into: "Models", tag: "LLM" },
};

const isExternal = (href: string) => /^https?:\/\//.test(href);
const pad2 = (n: number) => String(n).padStart(2, "0");

/** Portfolio → the Work section: its groups, and its plain links. */
function shapeWork(portfolio?: MenuEntry) {
  const groups: Group[] = [];
  const links: Leaf[] = [];
  for (const sub of portfolio?.submenus ?? []) {
    if (sub.submenus) {
      const merge = MERGE[sub.label];
      const name = merge?.into ?? sub.label;
      let group = groups.find((g) => g.label === name);
      if (!group) groups.push((group = { label: name, items: [] }));
      for (const leaf of sub.submenus) {
        if (leaf.href) group.items.push({ label: leaf.label, href: leaf.href, tag: merge?.tag });
      }
    } else if (sub.href) {
      links.push({ label: sub.label, href: sub.href });
    }
  }
  // "All Projects" closes the list, under a heavier rule; everything else
  // (Fun Apps) sits between the groups and it.
  const all = links.find((l) => l.href === "/projects");
  return { groups, rest: links.filter((l) => l !== all), all };
}

const leaves = (entry?: MenuEntry): Leaf[] =>
  (entry?.submenus ?? []).flatMap((s) => (s.href ? [{ label: s.label, href: s.href }] : []));

/* ── Type ─────────────────────────────────────────────────────────────── */
// The big words scale with the screen's HEIGHT as well as its width, so all
// six fit on a 375×667 phone without scrolling. The width cap is set by the
// widest word, NOTEBOOK, plus its "● Here" marker. Leading stays at 1: at 0.92
// the accents on RÉSUMÉ ran into the baseline of the word above.
const WORD_SIZE = "text-[length:min(18vw,8.2dvh)]";
const WORD = `font-anton uppercase leading-none tracking-[0.005em] ${WORD_SIZE}`;
const MONO = "font-dmmono text-[11px] uppercase tracking-[0.14em]";

export default function MobileMenu({
  links,
  onClose,
  onNavigate,
}: {
  links: MenuEntry[];
  onClose: () => void;
  onNavigate: (href: string) => void;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const home = links.find((l) => l.label === "Home");
  const portfolio = links.find((l) => l.label === "Portfolio");
  const about = links.find((l) => l.label === "About Me");
  const work = shapeWork(portfolio);
  const aboutItems = leaves(about);
  const homeItems = leaves(home);
  const findTop = (label: string) => links.find((l) => l.label === label && !l.submenus)?.href;
  const notebookHref = findTop("Notebook") ?? "/notebook";
  const resumeHref = findTop("Résumé") ?? "/resume";
  // Everything top-level that is not one of the big words goes in the small line.
  const minor = links.filter(
    (l) => !l.submenus && l.href && l.href !== notebookHref && l.href !== resumeHref,
  );
  const workCount = work.groups.reduce((n, g) => n + g.items.length, 0);

  // Open on wherever the visitor already is. Computed once, at mount — this
  // component only exists while the menu is open, so every opening starts
  // fresh, without an effect setting state after the first render.
  const [initial] = useState(() => {
    const g = work.groups.find((grp) => grp.items.some((i) => i.href === pathname));
    if (g) return { section: "work" as Section, group: g.label as string | null };
    if (work.rest.some((l) => l.href === pathname) || work.all?.href === pathname)
      return { section: "work" as Section, group: null };
    if (aboutItems.some((l) => l.href === pathname)) return { section: "about" as Section, group: null };
    return { section: null, group: null };
  });
  const [section, setSection] = useState<Section | null>(initial.section);
  const [group, setGroup] = useState<string | null>(initial.group);

  const toggleSection = (s: Section) => {
    setSection((cur) => (cur === s ? null : s));
    setGroup(null);
  };
  const toggleGroup = (g: string) => setGroup((cur) => (cur === g ? null : g));

  // Read through a ref so the effect below runs once per opening: keyed on the
  // callback itself, any parent re-render would re-run it, re-lock the scroll
  // and yank focus back to Close.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Scroll lock, Escape, focus. The body is this site's scroll container (Bible
  // §10 / AGENTS rule 4), so both it and <html> are locked.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = [html.style.overflow, body.style.overflow];
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      [html.style.overflow, body.style.overflow] = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  /** Rows are plain <a>, not <Link>, on purpose: <Link> prefetches every route
   *  it can see, and an open menu shows twenty of them at once on a phone.
   *  A real <a> (middle-click, long-press, copy link all work) that still
   *  routes through Navigation's handler for an ordinary tap — that handler
   *  knows how to reach a homepage anchor from another page. */
  const go = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(href);
  };
  const hrefFor = (href: string) => (href.startsWith("#") ? `/${href}` : href);

  // Accordion bodies: height to auto. Under reduced motion they just appear.
  const fold = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : {
        initial: { height: 0 },
        animate: { height: "auto" },
        exit: { height: 0 },
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
      };

  // Plain render helpers, not components: a component declared inside render is
  // a new type every render, so React would remount the rows on every tap.

  /** Level 3: a numbered project row. */
  const leafRow = (leaf: Leaf, i: number) => {
    const here = leaf.href === pathname;
    const ext = isExternal(leaf.href);
    return (
      <li key={leaf.href}>
        <a
          href={hrefFor(leaf.href)}
          onClick={go(leaf.href)}
          target={ext ? "_blank" : undefined}
          rel={ext ? "noopener noreferrer" : undefined}
          aria-current={here ? "page" : undefined}
          className={`grid h-11 grid-cols-[30px_1fr_auto] items-center touch-manipulation ${
            here
              ? "-mx-5 bg-[#0A0A0C] px-5 text-[#F5F0E6]"
              : `active:bg-[#0A0A0C]/[0.08] ${i === 0 ? "" : "border-t border-[#0A0A0C]/[0.16]"}`
          }`}
        >
          <span className="font-dmmono text-[11px] opacity-60">{pad2(i + 1)}</span>
          <span className="truncate font-serif text-[23px] italic leading-none">
            {leaf.label}
            {leaf.tag && (
              <sup className="ml-1.5 align-[10px] font-dmmono text-[11px] not-italic tracking-[0.1em]">
                {leaf.tag}
              </sup>
            )}
          </span>
          {here ? (
            <span className={MONO}>● Here</span>
          ) : (
            <span aria-hidden className="font-dmmono text-[13px]">
              {ext ? "↗" : "→"}
            </span>
          )}
          {ext && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      </li>
    );
  };

  const leafList = (items: Leaf[]) => <ul>{items.map(leafRow)}</ul>;

  /** Level 1, a section: the giant word is the toggle. */
  const sectionWord = (id: Section, label: string, count: number, hasHere: boolean) => (
    <button
      type="button"
      onClick={() => toggleSection(id)}
      aria-expanded={section === id}
      aria-controls={`mm-${id}`}
      className="flex w-full items-start gap-1.5 text-left touch-manipulation"
    >
      <span className={WORD}>{label}</span>
      <span className={`${MONO} mt-[0.6em]`}>
        {hasHere && "● "}
        {pad2(count)} {section === id ? "−" : "+"}
      </span>
    </button>
  );

  /** Level 1, a destination. */
  const linkWord = (href: string, label: string) => {
    const here = href === pathname;
    return (
      <a
        href={href}
        onClick={go(href)}
        aria-current={here ? "page" : undefined}
        className="flex items-start gap-1.5 touch-manipulation"
      >
        <span className={WORD}>{label}</span>
        {here && <span className={`${MONO} mt-[0.6em]`}>● Here</span>}
      </a>
    );
  };

  const workHere = work.groups.some((g) => g.items.some((i) => i.href === pathname));
  const aboutHere = aboutItems.some((i) => i.href === pathname);

  return (
    <m.div
      ref={dialogRef}
      key="mobile-slab"
      id="mobile-nav-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
      exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: reduce ? 0.15 : 0.38, ease: [0.76, 0, 0.24, 1] }}
      // Inside Navigation's fixed z-[10000] wrapper, so it covers the robot
      // (9999), the tour/game dock (900) and the chat launcher (1000).
      className="pointer-events-auto fixed inset-0 z-[60] flex flex-col bg-[#FF5500] text-[#0A0A0C] md:hidden"
    >
      {/* Scrolls as one piece; the black bar below stays put. */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <Link href="/" prefetch={false} onClick={go("/")} aria-label="Suman Debnath — home" className="relative block h-8 w-28">
            {/* The white wordmark, inked black for the orange ground. */}
            <Image src="/branding/logo_navbar_v2.png" alt="" fill sizes="112px" className="object-contain object-left brightness-0" />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={`${MONO} -mr-3 px-3 py-3.5 touch-manipulation`}
          >
            Close <span aria-hidden>✕</span>
          </button>
        </div>

        <nav aria-label="Site" className="mt-7">
          {/* ── Work ─────────────────────────────────────────────── */}
          {sectionWord("work", "Work", workCount, workHere)}
          <AnimatePresence initial={false}>
            {section === "work" && (
              <m.div key="work" id="mm-work" className="overflow-hidden" {...fold}>
                <div className="pb-3 pt-1.5">
                  {work.groups.map((g, gi) => {
                    const open = group === g.label;
                    const here = g.items.some((i) => i.href === pathname);
                    return (
                      <div key={g.label}>
                        <button
                          type="button"
                          onClick={() => toggleGroup(g.label)}
                          aria-expanded={open}
                          aria-controls={`mm-g-${gi}`}
                          className={`grid h-12 w-full grid-cols-[1fr_auto_22px] items-center gap-2.5 text-left touch-manipulation active:bg-[#0A0A0C]/[0.06] ${
                            gi === 0 || open ? "border-t-2 border-[#0A0A0C]" : "border-t border-[#0A0A0C]/[0.22]"
                          }`}
                        >
                          <span className="font-anton text-[24px] uppercase leading-none tracking-[0.01em]">{g.label}</span>
                          <span className={MONO}>
                            {here && "● "}
                            {pad2(g.items.length)}
                          </span>
                          <span aria-hidden className="text-right font-dmmono text-[16px]">
                            {open ? "−" : "+"}
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <m.div key={g.label} id={`mm-g-${gi}`} className="overflow-hidden" {...fold}>
                              <div className="-mx-5 bg-[#E64C00] px-5 pb-2 pt-0.5">
                                {leafList(g.items)}
                              </div>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                  {work.rest.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={go(l.href)}
                      aria-current={l.href === pathname ? "page" : undefined}
                      className="grid h-12 grid-cols-[1fr_auto] items-center border-t border-[#0A0A0C]/[0.22] touch-manipulation"
                    >
                      <span className="font-anton text-[24px] uppercase leading-none">{l.label}</span>
                      <span className={MONO}>{l.href === pathname ? "● Here" : "→"}</span>
                    </a>
                  ))}
                  {work.all && (
                    <a
                      href={work.all.href}
                      onClick={go(work.all.href)}
                      aria-current={work.all.href === pathname ? "page" : undefined}
                      className="grid h-12 grid-cols-[1fr_auto] items-center border-t-2 border-[#0A0A0C] touch-manipulation"
                    >
                      <span className="font-anton text-[24px] uppercase leading-none">{work.all.label}</span>
                      <span className={MONO}>
                        {work.all.href === pathname ? "● Here" : `${pad2(workCount)} →`}
                      </span>
                    </a>
                  )}
                </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* ── About ────────────────────────────────────────────── */}
          {sectionWord("about", "About", aboutItems.length, aboutHere)}
          <AnimatePresence initial={false}>
            {section === "about" && (
              <m.div key="about" id="mm-about" className="overflow-hidden" {...fold}>
                <div className="mb-3 mt-1.5 border-t-2 border-[#0A0A0C]">
                  {leafList(aboutItems)}
                </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* ── Destinations ─────────────────────────────────────── */}
          {linkWord(notebookHref, "Notebook")}
          {linkWord(resumeHref, "Résumé")}
          {linkWord("/contact", "Contact")}

          {/* ── The game: the sixth word, in cream ──────────────── */}
          <a
            href={CAREER_MODE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            aria-label="Play my career — a game version of my résumé (opens in a new tab)"
            className="flex items-center gap-2.5 text-[#F5F0E6] touch-manipulation"
          >
            <span className={WORD}>Play</span>
            <PixelPad className={`h-[0.32em] w-[0.56em] ${WORD_SIZE}`} />
            <span className={`${MONO} ml-auto text-right text-[#0A0A0C]`}>My career · game ↗</span>
          </a>

          {/* ── The small line ───────────────────────────────────── */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 border-t-2 border-[#0A0A0C] pt-1 text-[13px] font-medium">
            {minor.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={go(l.href!)}
                aria-current={l.href === pathname ? "page" : undefined}
                className="py-3 touch-manipulation aria-[current=page]:underline aria-[current=page]:underline-offset-4"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => toggleSection("home")}
              aria-expanded={section === "home"}
              aria-controls="mm-home"
              className="py-3 touch-manipulation"
            >
              Home sections {section === "home" ? "−" : "+"}
            </button>
          </div>
          <AnimatePresence initial={false}>
            {section === "home" && (
              <m.div key="home" id="mm-home" className="overflow-hidden" {...fold}>
                <div className="border-t border-[#0A0A0C]/[0.22]">
                  {leafList(homeItems)}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* ── The black bar ──────────────────────────────────────────── */}
      <div className={`${MONO} flex items-center justify-between bg-[#0A0A0C] px-5 pb-[calc(0.25rem+env(safe-area-inset-bottom))] pt-1 text-[#9a8f86]`}>
        <button
          type="button"
          onClick={() => {
            onClose();
            window.dispatchEvent(new CustomEvent("open-command-palette"));
          }}
          className={`${MONO} py-3.5 touch-manipulation hover:text-[#F5F0E6]`}
        >
          Search ⌘K
        </button>
        <a
          href={identity.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3.5 touch-manipulation hover:text-[#F5F0E6]"
        >
          WhatsApp <span aria-hidden>↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </m.div>
  );
}
