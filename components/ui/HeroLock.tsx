"use client";

import { useEffect, useRef } from "react";

/* ── Hero lock ──────────────────────────────────────────────────────────
   Puts `.sd-hero-lock` on <html> while a page's hero is on screen, which
   globals.css uses to clear the mascot and the chat launcher out of the way
   **on phones only**. From `md` up there is room for all of them and nothing
   here changes anything.

   The two floating things park in the bottom corners, which is where a hero
   puts its CTAs, and at 375px there is no room for both. Measured at 375×812
   across every product page — all ten collide:

     /                        launcher × "Career Journey"        128×28
                              mascot   × "View Projects"          61×41
     /projects/aegis-vault    launcher × "Open live demo"        141×28
                              mascot   × "All projects"           77×30
     /banking/rm-copilot      launcher × "Jump to the security…" 105×35
                              mascot   × "Open the live site"     20×42
     /agents/pact-agent       mascot   × "View on GitHub"         29×44
                              mascot   × "See how to use it"      20×46
     /agents/pentashell       mascot   × "Copy"                   54×27
     /agents/migi             launcher × "The three pillars"      82×31
     /slms/pentacmd           mascot   × "Weights on Hugging Face" 66×13
     /llms/qdex-1.5b          launcher × "Download the model"    141×9
                              mascot   × "Download the model"     76×44
     /apps/forget-anything    mascot   × the app card             85×57
     /apps/migi-app           launcher × "See the MIGI agent fl…"  79×19
     /games/pixelville        mascot   × "Start your village"     39×48

   EasterEggs already reached this conclusion for the Clippy nudge and gates it
   on `scrollY > innerHeight * 0.6` for exactly this reason — its comment notes
   that while the hero is up, its buttons are the better prompt anyway. This is
   the same rule, applied to the other two floating things.

   An observer rather than a scroll handler, per AGENTS.md. **The class goes on
   <html> rather than into React state because the mascot must NOT re-render or
   re-mount for this:** its entrance is a CSS keyframe that restarts on mount
   (PAGE_OPTIMIZATION.md §4.6, PROJECT_BIBLE.md §5 trap 6), and its entrance
   effect deliberately returns no cleanup. Toggling a class on an ancestor
   touches neither. The hiding itself is `visibility`, not `opacity`, for the
   cascade reasons written out in globals.css.
   ──────────────────────────────────────────────────────────────────────── */

function lock(el: Element) {
  const root = document.documentElement;
  const io = new IntersectionObserver(
    ([entry]) => root.classList.toggle("sd-hero-lock", entry.isIntersecting),
    { threshold: 0 },
  );
  io.observe(el);
  return () => {
    io.disconnect();
    // Leaving for a page with no hero of its own must not leave the furniture
    // hidden — App Router runs this cleanup before the next page's effects.
    root.classList.remove("sd-hero-lock");
  };
}

/**
 * For a client component that already holds a ref on its hero — `Hero.tsx`.
 */
export function useHeroLock(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return lock(el);
  }, [ref]);
}

/**
 * For the product landing pages, which are **server components** and so cannot
 * hold a ref.
 *
 * Drop it as a child of the hero `<section>` and it observes that section:
 *
 * ```tsx
 * <section className="relative px-6 pt-28 …">
 *   <HeroLock />
 *   …
 * ```
 *
 * It renders a `hidden` span purely to find its way to `parentElement`, so it
 * has **no box and no layout effect at all** — no `position: relative` needed
 * on the parent, nothing to disturb a flex or grid hero. The contract is the
 * only thing to keep in mind: *its parent element is what gets observed*, so it
 * belongs directly inside the hero section and nowhere deeper.
 */
export default function HeroLock() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = anchor.current?.parentElement;
    if (!hero) return;
    return lock(hero);
  }, []);

  return <span ref={anchor} hidden aria-hidden />;
}
