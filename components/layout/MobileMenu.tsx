"use client";

/**
 * The phone menu — "the slab".
 *
 * Below md the whole screen turns the hero's signature orange and the site is
 * offered as giant Anton words. Designed against NN/g ("Mobile Subnavigation",
 * "Beyond the Hamburger") and Smashing ("Designing Navigation for Mobile"):
 *
 *   - ACCORDIONS, NOT SLIDE-IN PANELS. Every category has three children or
 *     fewer, which is where accordions win; sequential panels fight the phone's
 *     own Back button. Nothing slides sideways.
 *   - EVERY TOP-LEVEL ITEM IS A BIG WORD, in the desktop bar's order (Home, Work,
 *     About, Notebook, Learnings, Résumé, FAQ), then Contact and Play. An earlier
 *     build demoted Learnings and FAQ to a small line at the bottom; he asked
 *     why, and there was no good answer — they are top-level on desktop.
 *   - COLOUR SAYS THE LEVEL. Black = something you open or a place (big words,
 *     Anton group rows). White serif italic = the pages inside. No row numbers
 *     and no darker band behind open groups: the numbered, banded version was
 *     rejected as "sequential" and ugly. White on #FF5500 is ~3.2:1, so leaf text
 *     must stay ≥24px (WCAG large text) — do not shrink it.
 *   - GROUPS START COLLAPSED and open one at a time (his explicit request).
 *   - NOTHING CLIPS. Leaf labels wrap rather than truncate (an italic face
 *     overhangs its box, and `truncate` cut it), and type tags (SLM, LLM) sit on
 *     the baseline beside the name — a raised <sup> was cut off by the row.
 *   - THE WHOLE ROW IS THE TARGET. No split "link + chevron" rows.
 *   - YOU ARE HERE. Opened on a page, its section and group open themselves and
 *     the row is underlined and marked.
 *   - THE GAME IS A WORD. "Play" in bright yellow with a hard black shadow and
 *     the pixel controller. The game's own violet-and-gold read as a third
 *     palette inside the slab.
 *   - Before this: a light card sheet ("confusing, unusable"), then grey-card
 *     redesigns ("everything looked the same"). Do not drift back to rows of
 *     rounded boxes.
 *
 * Contents come from Navigation's `navLinks`, so a page added there appears here
 * too. Reshaping: Portfolio → "Work", About Me → "About" (RENAME), and SLMs +
 * LLMs → one "Models" group with each row tagged (MERGE).
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
type Word =
  | { kind: "work"; label: string; groups: Group[]; rest: Leaf[]; all?: Leaf }
  | { kind: "list"; label: string; items: Leaf[] }
  | { kind: "link"; label: string; href: string };

/** Desktop labels that read better as one big word on the phone. */
const RENAME: Record<string, string> = { Portfolio: "Work", "About Me": "About" };

/** Desktop categories folded together on the phone, with the tag each row keeps. */
const MERGE: Record<string, { into: string; tag: string }> = {
  SLMs: { into: "Models", tag: "SLM" },
  LLMs: { into: "Models", tag: "LLM" },
};

const isExternal = (href: string) => /^https?:\/\//.test(href);
const pad2 = (n: number) => String(n).padStart(2, "0");

/** navLinks → the slab's words. The entry with nested groups becomes Work. */
function shapeWords(links: MenuEntry[]): Word[] {
  const words: Word[] = [];
  for (const link of links) {
    const label = RENAME[link.label] ?? link.label;
    if (!link.submenus) {
      if (link.href) words.push({ kind: "link", label, href: link.href });
      continue;
    }
    if (link.submenus.some((s) => s.submenus)) {
      const groups: Group[] = [];
      const plain: Leaf[] = [];
      for (const sub of link.submenus) {
        if (sub.submenus) {
          const merge = MERGE[sub.label];
          const name = merge?.into ?? sub.label;
          let group = groups.find((g) => g.label === name);
          if (!group) groups.push((group = { label: name, items: [] }));
          for (const leaf of sub.submenus) {
            if (leaf.href) group.items.push({ label: leaf.label, href: leaf.href, tag: merge?.tag });
          }
        } else if (sub.href) {
          plain.push({ label: sub.label, href: sub.href });
        }
      }
      // "All Projects" closes the list under a heavier rule; Fun Apps and the
      // like sit between the groups and it.
      const all = plain.find((l) => l.href === "/projects");
      words.push({ kind: "work", label, groups, rest: plain.filter((l) => l !== all), all });
    } else {
      words.push({
        kind: "list",
        label,
        items: link.submenus.flatMap((s) => (s.href ? [{ label: s.label, href: s.href }] : [])),
      });
    }
  }
  // The desktop bar's "Let's Talk" button, as a word.
  words.push({ kind: "link", label: "Contact", href: "/contact" });
  return words;
}

const allLeaves = (w: Word): Leaf[] =>
  w.kind === "work"
    ? [...w.groups.flatMap((g) => g.items), ...w.rest, ...(w.all ? [w.all] : [])]
    : w.kind === "list"
      ? w.items
      : [];

/* ── Type ─────────────────────────────────────────────────────────────── */
// The big words scale with the screen's HEIGHT as well as its width, so all
// nine plus Play fit a 375×667 phone without scrolling. Leading stays at 1: at
// 0.92 the accents on RÉSUMÉ ran into the baseline of the word above.
const WORD_SIZE = "text-[length:min(16vw,7.4dvh)]";
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

  const words = shapeWords(links);
  const holds = (w: Word) => allLeaves(w).some((l) => l.href === pathname);

  // Open on wherever the visitor already is. Computed once, at mount — this
  // component only exists while the menu is open, so every opening starts
  // fresh, without an effect setting state after the first render. The
  // homepage does not auto-open Home: its seven anchors would push the rest
  // of the words off a small screen.
  const [initial] = useState(() => {
    if (pathname === "/") return { open: null, group: null };
    for (const w of words) {
      if (w.kind === "work") {
        const g = w.groups.find((grp) => grp.items.some((i) => i.href === pathname));
        if (g) return { open: w.label as string | null, group: g.label as string | null };
      }
      if (w.kind !== "link" && holds(w)) return { open: w.label as string | null, group: null };
    }
    return { open: null, group: null };
  });
  const [open, setOpen] = useState<string | null>(initial.open);
  const [group, setGroup] = useState<string | null>(initial.group);

  const toggleSection = (label: string) => {
    setOpen((cur) => (cur === label ? null : label));
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

  /** A page inside a section or group: white serif italic, wrapping freely. */
  const leafRow = (leaf: Leaf) => {
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
          className="flex min-h-11 items-center gap-2.5 py-1 text-white touch-manipulation active:opacity-70"
        >
          <span
            className={`pr-1 font-serif text-[25px] italic leading-[1.2] ${
              here ? "underline decoration-2 underline-offset-[6px]" : ""
            }`}
          >
            {leaf.label}
          </span>
          {leaf.tag && <span className={`${MONO} shrink-0 text-[#0A0A0C]`}>{leaf.tag}</span>}
          {ext && (
            <>
              <span aria-hidden className="shrink-0 text-[15px]">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </>
          )}
          {here && <span className={`${MONO} ml-auto shrink-0 pl-2 text-[#0A0A0C]`}>● Here</span>}
        </a>
      </li>
    );
  };

  // A white rule down the left ties a list of pages to the black row above it.
  const leafList = (items: Leaf[]) => (
    <ul className="mb-2 ml-1 border-l-2 border-white/80 pl-4 pr-1">{items.map(leafRow)}</ul>
  );

  const mark = (here: boolean) => (here ? "● " : "");

  /** A big word that opens a section. */
  const sectionWord = (w: Word, count: number) => (
    <button
      type="button"
      onClick={() => toggleSection(w.label)}
      aria-expanded={open === w.label}
      aria-controls={`mm-${w.label}`}
      className="flex w-full items-start gap-1.5 py-[0.06em] text-left touch-manipulation"
    >
      <span className={WORD}>{w.label}</span>
      <span className={`${MONO} mt-[0.5em]`}>
        {mark(holds(w))}
        {pad2(count)} {open === w.label ? "−" : "+"}
      </span>
    </button>
  );

  /** A big word that is itself a destination. */
  const linkWord = (href: string, label: string) => {
    const here = href === pathname;
    return (
      <a
        key={href}
        href={href}
        onClick={go(href)}
        aria-current={here ? "page" : undefined}
        className="flex items-start gap-1.5 py-[0.06em] touch-manipulation"
      >
        <span className={WORD}>{label}</span>
        {here && <span className={`${MONO} mt-[0.5em]`}>● Here</span>}
      </a>
    );
  };

  /** Work's insides: black Anton group rows, each opening to white pages. */
  const workBody = (w: Extract<Word, { kind: "work" }>, count: number) => (
    <div className="pb-3 pt-1.5">
      {w.groups.map((g, gi) => {
        const isOpen = group === g.label;
        const here = g.items.some((i) => i.href === pathname);
        return (
          <div key={g.label}>
            <button
              type="button"
              onClick={() => toggleGroup(g.label)}
              aria-expanded={isOpen}
              aria-controls={`mm-g-${gi}`}
              className={`grid min-h-12 w-full grid-cols-[1fr_auto_22px] items-center gap-2.5 text-left touch-manipulation active:bg-[#0A0A0C]/[0.06] ${
                gi === 0 ? "border-t-2 border-[#0A0A0C]" : "border-t border-[#0A0A0C]/[0.22]"
              }`}
            >
              <span className="font-anton text-[26px] uppercase leading-tight tracking-[0.01em]">{g.label}</span>
              <span className={MONO}>
                {mark(here)}
                {pad2(g.items.length)}
              </span>
              <span aria-hidden className="text-right font-dmmono text-[16px]">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div key={g.label} id={`mm-g-${gi}`} className="overflow-hidden" {...fold}>
                  {leafList(g.items)}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      {w.rest.map((l) => (
        <a
          key={l.href}
          href={l.href}
          onClick={go(l.href)}
          aria-current={l.href === pathname ? "page" : undefined}
          className="grid min-h-12 grid-cols-[1fr_auto] items-center border-t border-[#0A0A0C]/[0.22] touch-manipulation"
        >
          <span className="font-anton text-[26px] uppercase leading-tight">{l.label}</span>
          <span className={MONO}>{l.href === pathname ? "● Here" : "→"}</span>
        </a>
      ))}
      {w.all && (
        <a
          href={w.all.href}
          onClick={go(w.all.href)}
          aria-current={w.all.href === pathname ? "page" : undefined}
          className="grid min-h-12 grid-cols-[1fr_auto] items-center border-t-2 border-[#0A0A0C] touch-manipulation"
        >
          <span className="font-anton text-[26px] uppercase leading-tight">{w.all.label}</span>
          <span className={MONO}>{w.all.href === pathname ? "● Here" : `${pad2(count)} →`}</span>
        </a>
      )}
    </div>
  );

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

        <nav aria-label="Site" className="mt-5">
          {words.map((w) => {
            if (w.kind === "link") return linkWord(w.href, w.label);
            const count = w.kind === "work" ? w.groups.reduce((n, g) => n + g.items.length, 0) : w.items.length;
            return (
              <div key={w.label}>
                {sectionWord(w, count)}
                <AnimatePresence initial={false}>
                  {open === w.label && (
                    <m.div key={w.label} id={`mm-${w.label}`} className="overflow-hidden" {...fold}>
                      {w.kind === "work" ? (
                        workBody(w, count)
                      ) : (
                        <div className="pt-2">{leafList(w.items)}</div>
                      )}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* ── The game: the last word, in bright yellow ───────────── */}
          <a
            href={CAREER_MODE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            aria-label="Play my career — a game version of my résumé (opens in a new tab)"
            className="mt-1 flex items-center gap-2.5 touch-manipulation"
          >
            {/* Yellow on this orange is under 3:1 on its own; the hard black
                shadow is what carries it, and is the arcade look as well. */}
            <span className={`${WORD} text-[#FFE500] [text-shadow:3px_3px_0_#0A0A0C]`}>Play</span>
            <PixelPad
              className={`h-[0.32em] w-[0.56em] text-[#FFE500] [filter:drop-shadow(2px_2px_0_#0A0A0C)] ${WORD_SIZE}`}
            />
            <span className={`${MONO} ml-auto text-right`}>My career · game ↗</span>
          </a>
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
