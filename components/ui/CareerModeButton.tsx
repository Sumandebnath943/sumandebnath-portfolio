/**
 * The links that start a game.
 *
 * "Career Mode" is the one-page gamified portfolio at
 * hire.sumandebnath.houseofnamus.com — a walk-through résumé with a quest log.
 *
 * It is drawn in THIS site's palette (black, cream, the hero's #FF5500), not
 * the game's own violet and gold. Inside the site those read as a third palette
 * dropped in from elsewhere — tried, and rejected on sight. What says "game"
 * is the pixel controller and the word "Play", not the colours.
 *
 * Deliberately NOT loaded: the game's pixel face (Jersey 20). The controller is
 * an inline SVG with crispEdges; the type is Anton and DM Mono, both already
 * loaded by the layout.
 *
 * Where it appears, and nowhere else on purpose:
 *   - The phone menu's sixth big word, "Play" — drawn in MobileMenu.tsx, using
 *     CAREER_MODE_URL and PixelPad from here.
 *   - "dock": the right-edge tab under "Take a Tour", every page (SiteTour.tsx).
 *   - "hero": the fourth CTA on the homepage hero (Hero.tsx).
 *   - "paper": beside Download PDF on /resume, in the résumé's own button style.
 * The desktop nav bar is deliberately left alone — it has no room, and he is
 * happy with it as it is.
 *
 * It lives on its own domain, so every entry opens a new tab (as Crawl Daddy
 * does) and is a real <a>, so middle-click and "copy link" work.
 */

export const CAREER_MODE_URL = "https://hire.sumandebnath.houseofnamus.com/";

/** A 14×8 pixel controller in currentColor, with the d-pad and buttons cut out. */
export function PixelPad({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 8"
      aria-hidden
      focusable="false"
      shapeRendering="crispEdges"
      fill="currentColor"
      fillRule="evenodd"
      className={className}
    >
      {/* One path, even-odd, so the cut-outs are real holes that show whatever
          is behind — no second colour to keep in sync with the background. */}
      <path d="M1 0H13V1H14V8H9V6H5V8H0V1H1Z M3 2H4V3H5V4H4V5H3V4H2V3H3Z M11 2H12V3H11Z M9 4H10V5H9Z" />
    </svg>
  );
}

type Variant = "dock" | "hero" | "paper";

// Contains the visible label verbatim (WCAG 2.5.3, label in name).
const A11Y_NAME = "Play my career — a game version of my résumé (opens in a new tab)";

export default function CareerModeButton({ variant }: { variant: Variant }) {
  if (variant === "dock") {
    // Twin of the "Take a Tour" tab directly above it: same width, padding and
    // vertical mono label, so the two read as one dock. Cream where the tour
    // is orange, which is the whole difference.
    return (
      <a
        href={CAREER_MODE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={A11Y_NAME}
        className="relative touch-manipulation after:absolute after:content-[''] after:-inset-y-1 after:-left-3 after:right-0 flex flex-col items-center justify-center bg-[#0A0A0C]/90 backdrop-blur-md border border-[#F5F0E6]/30 border-r-0 rounded-l-lg p-2 py-3 text-[#F5F0E6] hover:bg-[#F5F0E6]/10 transition-colors shadow-[-4px_0_15px_-4px_rgba(245,240,230,0.15)]"
      >
        <PixelPad className="mb-2 h-[9px] w-4" />
        <span className="[writing-mode:vertical-rl] font-mono text-[10px] uppercase tracking-widest font-semibold">
          Play my career
        </span>
      </a>
    );
  }

  if (variant === "paper") {
    // On /resume: the page's own ghost button, so it belongs to that paper
    // system. The orange controller is the only thing that marks it out.
    return (
      <a
        href={CAREER_MODE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Play it as a game — my career as a one-page game (opens in a new tab)"
        className="rz-btn rz-btn-ghost"
      >
        <PixelPad className="h-[9px] w-4 text-[#FF5500]" />
        Play it as a game
        <span aria-hidden>↗</span>
      </a>
    );
  }

  // "hero": the slab's orange as a solid pill, black type. Same pill geometry
  // as the three CTAs beside it, so it sits in the row; the colour, the Anton
  // label and the controller are what make it the special one.
  return (
    <a
      href={CAREER_MODE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={A11Y_NAME}
      className="group flex items-center justify-center gap-2.5 rounded-full bg-[#FF5500] px-5 py-2.5 lg:px-6 lg:py-3 text-[#0A0A0C] transition-all hover:bg-[#FF6B1A] hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F0E6] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <PixelPad className="h-[9px] w-4" />
      <span className="font-anton text-[13px] lg:text-[14px] uppercase tracking-[0.06em] leading-none">
        Play my career
      </span>
      <span aria-hidden className="text-[12px] leading-none transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
        ↗
      </span>
    </a>
  );
}
