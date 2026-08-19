"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { driver, type Driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Sparkles, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { chapterFor, TOUR_STEPS, TOUR_POSITION_KEY } from "@/lib/tour-steps";

/**
 * The site tour.
 *
 * driver.js only understands one page. This wraps it so a tour can cross
 * routes: the script is split into chapters (a contiguous run of steps sharing
 * a route), driver.js is handed one chapter at a time, and the position is
 * persisted so the tour can pick itself back up after the navigation that
 * happens between them.
 *
 * Mounted in the root layout, not on the homepage — which is why the previous
 * version could never leave it.
 */

/** Defined in lib/tour-steps.ts — ChatTakeover reads it too. See the note there. */
const STATE_KEY = TOUR_POSITION_KEY;
/** Kept in localStorage — whether the prompt has been shown before. */
const SEEN_KEY = "hasSeenTour";

/** How long to wait for a step's element after a route change before giving up. */
const ELEMENT_TIMEOUT_MS = 4_000;

/* ── Position, as an external store ───────────────────────────────────────
   The saved position lives in sessionStorage, which React cannot observe. It
   drives rendering (the launcher tab reads "Resume Tour", the panel shows the
   step count) as well as the runner, so it is exposed through
   useSyncExternalStore rather than mirrored into state from an effect —
   syncing it by hand would mean a setState on every route change, which is the
   cascading-render pattern React now warns about.                          */

const listeners = new Set<() => void>();
/** `undefined` = not read yet. The snapshot must be referentially stable. */
let snapshot: number | null | undefined = undefined;

function readStorage(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(STATE_KEY);
  if (raw === null) return null;
  const i = Number(raw);
  return Number.isInteger(i) && i >= 0 && i < TOUR_STEPS.length ? i : null;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): number | null {
  if (snapshot === undefined) snapshot = readStorage();
  return snapshot;
}

/** No tour is ever in progress on the server — sessionStorage is per-tab. */
function getServerSnapshot(): number | null {
  return null;
}

function readPosition(): number | null {
  return getSnapshot();
}

function writePosition(index: number) {
  window.sessionStorage.setItem(STATE_KEY, String(index));
  snapshot = index;
  listeners.forEach((l) => l());
}

function clearPosition() {
  window.sessionStorage.removeItem(STATE_KEY);
  snapshot = null;
  listeners.forEach((l) => l());
}

/**
 * Resolve once the selector matches, or once the timeout expires.
 *
 * After a route change the next chapter's target may not have mounted yet, and
 * driving driver.js at a selector that isn't there yet produces a popover
 * stranded in the middle of the screen. Resolving on timeout rather than
 * rejecting is deliberate: a slow or missing section should cost the step its
 * spotlight, not end the tour.
 */
function waitForElement(selector: string | undefined): Promise<void> {
  if (!selector || typeof document === "undefined") return Promise.resolve();
  if (document.querySelector(selector)) return Promise.resolve();

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      observer.disconnect();
      clearTimeout(timer);
      resolve();
    };
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) finish();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = setTimeout(finish, ELEMENT_TIMEOUT_MS);
  });
}

export default function SiteTour() {
  const [showPrompt, setShowPrompt] = useState(false);
  const position = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const inProgress = position !== null;
  const pathname = usePathname();
  const router = useRouter();

  const driverRef = useRef<Driver | null>(null);
  /**
   * Set while we tear driver.js down on purpose to change page. Its destroy
   * hooks cannot tell a deliberate hop from the visitor pressing Escape, and
   * without this the hop would clear the saved position and end the tour on
   * every chapter boundary.
   */
  const hoppingRef = useRef(false);
  /** Guards against a resume racing itself when the pathname effect re-runs. */
  const runningRef = useRef(false);

  const endTour = useCallback(() => {
    hoppingRef.current = false;
    runningRef.current = false;
    clearPosition();
    driverRef.current?.destroy();
    driverRef.current = null;
  }, []);

  /** Play the chapter containing `index`, starting at that step. */
  const runChapter = useCallback(
    async (index: number) => {
      if (runningRef.current) return;
      runningRef.current = true;

      const { start, end } = chapterFor(index);
      const chapter = TOUR_STEPS.slice(start, end + 1);

      await waitForElement(TOUR_STEPS[index].element);
      // The visitor navigated away, or exited, while we were waiting.
      if (readPosition() === null) {
        runningRef.current = false;
        return;
      }

      const instance = driver({
        animate: true,
        overlayColor: "rgba(10, 10, 12, 0.85)",
        popoverClass: "driverjs-theme",
        smoothScroll: true,
        allowClose: true,
        showProgress: true,
        nextBtnText: "Next →",
        prevBtnText: "← Back",
        doneBtnText: "Finish",
        steps: chapter.map((step, i) => ({
          element: step.element,
          popover: {
            title: step.title,
            description: step.description,
            side: step.side,
            align: step.align,
            // driver.js only counts within the chapter it was given, which
            // would restart at "1 of 2" on every page. This states the real
            // position in the whole script instead.
            progressText: `Step ${start + i + 1} of ${TOUR_STEPS.length}`,
            // The last step of a chapter is not the end of the tour, so it must
            // not say "Finish" — unless it genuinely is the last step overall.
            ...(start + i === TOUR_STEPS.length - 1 ? {} : { doneBtnText: "Next →" }),
            // driver.js greys out "Back" on the first step of the steps it was
            // given, which here is the first step of a chapter rather than of
            // the tour — so from step one of any page you could not go back to
            // the previous page. An explicit empty list overrides that default
            // (the step's own popover config is spread last internally);
            // onPrevClick below turns the click into a backwards page hop.
            ...(i === 0 && start > 0 ? { disableButtons: [] } : {}),
          },
        })),

        onNextClick: () => {
          const local = instance.getActiveIndex() ?? 0;
          const next = start + local + 1;

          if (next >= TOUR_STEPS.length) {
            endTour();
            return;
          }

          writePosition(next);

          if (next > end) {
            // Chapter boundary — hand over to the next route.
            hoppingRef.current = true;
            runningRef.current = false;
            instance.destroy();
            driverRef.current = null;
            router.push(TOUR_STEPS[next].route);
            return;
          }
          instance.moveNext();
        },

        onPrevClick: () => {
          const local = instance.getActiveIndex() ?? 0;
          const prev = start + local - 1;
          if (prev < 0) return;

          writePosition(prev);

          if (prev < start) {
            hoppingRef.current = true;
            runningRef.current = false;
            instance.destroy();
            driverRef.current = null;
            router.push(TOUR_STEPS[prev].route);
            return;
          }
          instance.movePrevious();
        },

        // Leaving on purpose. Handled explicitly rather than left to the
        // destroy chain below, which fires for deliberate page hops too and so
        // cannot tell "I'm done with this tour" from "we're changing page".
        onCloseClick: () => endTour(),

        // Escape, and the overlay click. A deliberate page hop also lands here,
        // which is what hoppingRef distinguishes.
        onDestroyStarted: () => {
          if (hoppingRef.current) {
            hoppingRef.current = false;
            instance.destroy();
            return;
          }
          endTour();
        },
      });

      driverRef.current = instance;
      instance.drive(index - start);
      runningRef.current = false;
    },
    [endTour, router],
  );

  /**
   * Resume on arrival.
   *
   * Runs on every route change, which is exactly the moment a chapter hop
   * completes — and also covers a reload mid-tour, since the position outlives
   * the page.
   */
  useEffect(() => {
    const index = readPosition();
    if (index === null) return;

    const step = TOUR_STEPS[index];
    if (step.route !== pathname) {
      // Landed somewhere the script does not expect — the visitor clicked a
      // link mid-tour. Send them back to where the tour was, rather than
      // silently abandoning it.
      return;
    }
    void runChapter(index);

    return () => {
      // Tear down before the next route paints, so an old chapter's overlay
      // cannot outlive the page it was highlighting.
      if (driverRef.current) {
        hoppingRef.current = true;
        driverRef.current.destroy();
        driverRef.current = null;
      }
      runningRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const startTour = useCallback(() => {
    setShowPrompt(false);
    localStorage.setItem(SEEN_KEY, "true");
    writePosition(0);

    const first = TOUR_STEPS[0];
    if (first.route !== pathname) {
      router.push(first.route);
      return;
    }
    void runChapter(0);
  }, [pathname, router, runChapter]);

  /** Pick the tour back up from wherever it was left. */
  const resumeTour = useCallback(() => {
    setShowPrompt(false);
    const index = readPosition() ?? 0;
    const step = TOUR_STEPS[index];
    if (step.route !== pathname) {
      router.push(step.route);
      return;
    }
    void runChapter(index);
  }, [pathname, router, runChapter]);

  // Kept for the existing launchers elsewhere on the site that fire this event.
  useEffect(() => {
    const handler = () => startTour();
    window.addEventListener("start-tour", handler);
    return () => window.removeEventListener("start-tour", handler);
  }, [startTour]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .driverjs-theme {
          background-color: #0A0A0C !important;
          color: #F5F0E6 !important;
          border: 1px solid rgba(255, 128, 0, 0.3) !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 40px -10px rgba(255, 128, 0, 0.2) !important;
          font-family: inherit !important;
          z-index: 999999 !important;
        }
        .driver-overlay {
          z-index: 999998 !important;
        }
        .driver-active {
          z-index: 999999 !important;
        }
        .driver-popover-title {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
          color: #FF8000 !important;
          font-size: 14px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          margin-bottom: 8px !important;
        }
        .driver-popover-description {
          font-family: inherit !important;
          color: rgba(245, 240, 230, 0.7) !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
        }
        .driver-popover-footer button {
          background-color: rgba(255, 255, 255, 0.05) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          text-shadow: none !important;
          border-radius: 6px !important;
          padding: 6px 12px !important;
          font-size: 12px !important;
        }
        .driver-popover-footer button:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .driver-popover-progress-text {
          color: rgba(245, 240, 230, 0.4) !important;
          font-size: 11px !important;
          letter-spacing: 0.04em !important;
        }
      `}} />

      {/* Sticky Right-Edge Button */}
      {/* Below the nav (10000) so an open phone menu covers this tab rather
          than having it cut across the panel's edge. Still above page content;
          the driver.js tour overlay lives far higher and is unaffected. */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-[900]">
        <button
          onClick={() => setShowPrompt((p) => !p)}
          // 33px wide is a thin thumb target; the invisible ::after widens the
          // hit area leftward without changing the tab's drawn width.
          className="relative touch-manipulation after:absolute after:content-[''] after:-inset-y-1 after:-left-3 after:right-0 flex flex-col items-center justify-center bg-[#0A0A0C]/90 backdrop-blur-md border border-[#FF8000]/30 border-r-0 rounded-l-lg p-2 py-3 text-[#FF8000] hover:bg-[#FF8000]/10 transition-colors shadow-[-4px_0_15px_-4px_rgba(255,128,0,0.2)]"
        >
          <Sparkles size={16} className="mb-2" />
          <span className="[writing-mode:vertical-rl] font-mono text-[10px] uppercase tracking-widest font-semibold">
            {inProgress ? "Resume Tour" : "Take a Tour"}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {showPrompt && (
          <m.div
            // Same story as the command palette: Motion drives x here, so a
            // `-translate-y-1/2` class gets overwritten and the panel hangs
            // below the midpoint instead of centring on it. The width clamps so
            // the 280px panel plus its 48px right offset still clears the left
            // edge on a 320px phone; above ~336px it stays exactly 280px.
            initial={{ opacity: 0, x: 100, y: "-50%" }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: 100, y: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-1/2 right-12 z-[950] flex w-[min(280px,calc(100vw_-_5rem))] flex-col gap-3 rounded-2xl rounded-tr-none rounded-br-none border border-[#FF8000]/30 border-r-0 bg-[#0A0A0C]/95 p-5 shadow-[-10px_0_40px_-10px_rgba(255,128,0,0.25)] backdrop-blur-xl"
          >
            <button
              onClick={() => setShowPrompt(false)}
              className="absolute right-4 top-4 text-white/40 hover:text-white"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#FF8000] animate-pulse" />
              <h4 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#FF8000]">
                Guided Tour
              </h4>
            </div>

            {inProgress ? (
              <>
                <p className="text-[13px] leading-relaxed text-white/70 font-manrope pr-4">
                  You&apos;re on step {(position ?? 0) + 1} of {TOUR_STEPS.length}.
                  Pick up where you left off?
                </p>
                <div className="flex gap-3 pt-2 flex-col">
                  <button
                    onClick={resumeTour}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/30 py-2 text-[12px] font-semibold text-[#FF8000] transition-colors hover:bg-[#FF8000]/20"
                  >
                    <Sparkles size={14} /> Resume Tour
                  </button>
                  <button
                    onClick={startTour}
                    className="w-full rounded-full border border-white/10 bg-white/5 py-2 text-[12px] font-medium text-white/70 transition-colors hover:bg-white/10"
                  >
                    Start Over
                  </button>
                  <button
                    onClick={() => {
                      endTour();
                      setShowPrompt(false);
                    }}
                    className="w-full py-1 text-[12px] font-medium text-white/40 transition-colors hover:text-white/70"
                  >
                    Exit tour
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-[13px] leading-relaxed text-white/70 font-manrope pr-4">
                  {TOUR_STEPS.length} stops across the whole site — the systems, the
                  models, the résumé. About a minute.
                </p>
                <div className="flex gap-3 pt-2 flex-col">
                  <button
                    onClick={startTour}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/30 py-2 text-[12px] font-semibold text-[#FF8000] transition-colors hover:bg-[#FF8000]/20"
                  >
                    <Sparkles size={14} /> Start Tour
                  </button>
                  <button
                    onClick={() => setShowPrompt(false)}
                    className="w-full rounded-full border border-white/10 bg-white/5 py-2 text-[12px] font-medium text-white/70 transition-colors hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
