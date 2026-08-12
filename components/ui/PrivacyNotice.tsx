"use client";

import { useEffect, useState } from "react";

/**
 * A one-time disclosure notice, not a consent gate.
 *
 * This deliberately has no "Accept" button. Nothing here is conditional on the
 * visitor agreeing — analytics load either way — so offering a button that
 * appears to grant or withhold permission would be dishonest. It states what
 * happens and links to the detail. To be clear about the trade-off: this is
 * transparency, not GDPR/ePrivacy consent, which would require blocking the
 * analytics until an explicit opt-in.
 *
 * Everything below exists to keep it out of the visitor's way: it waits for the
 * page to settle, holds off entirely while the tab is in the background, sits
 * clear of the chat pill and the résumé mascot, never traps focus or covers
 * content, retires itself, and does not come back.
 */

const STORAGE_KEY = "sd_notice_seen";
const APPEAR_DELAY_MS = 1_800;
const AUTO_DISMISS_MS = 14_000;

export default function PrivacyNotice() {
  const [mounted, setMounted] = useState(false); // in the DOM
  const [shown, setShown] = useState(false); // slid into view

  useEffect(() => {
    // Redundant on the page it links to.
    if (window.location.pathname.startsWith("/privacy")) return;

    // Private-mode browsers throw on storage access rather than returning null.
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return; // can't remember a dismissal, so don't start something we can't end
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const start = () => {
      timers.push(
        setTimeout(() => {
          setMounted(true);
          // A tick between mount and transform, so the transition has a state to
          // animate from. Deliberately setTimeout and not requestAnimationFrame:
          // rAF does not fire at all in a background tab, which would leave the
          // notice mounted at opacity 0 and then retired unseen.
          timers.push(setTimeout(() => setShown(true), 30));
          timers.push(setTimeout(dismiss, 30 + AUTO_DISMISS_MS));
        }, APPEAR_DELAY_MS),
      );
    };

    // Don't spend the notice on a tab nobody is looking at — opened in the
    // background, it would time out unseen and never come back.
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onVisible);
      start();
    };

    if (document.visibilityState === "visible") start();
    else document.addEventListener("visibilitychange", onVisible);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      timers.forEach(clearTimeout);
    };
  }, []);

  function dismiss() {
    setShown(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* dismissal just won't persist */
    }
    // Leave the DOM only after the exit transition has run.
    setTimeout(() => setMounted(false), 400);
  }

  if (!mounted) return null;

  return (
    // Wrapper ignores pointer events so the strip never intercepts a click meant
    // for the page; the card itself opts back in.
    //
    // At ≤820px ChatTakeover moves its launcher to bottom-left, so below that we
    // sit above the launcher rather than on top of it. That is ChatTakeover's own
    // breakpoint, matched here deliberately — Tailwind's `sm` (640px) would leave
    // the two overlapping between 641px and 820px. Above 820px the launcher is
    // bottom-right and this corner is free.
    <div
      className="fixed bottom-[88px] left-4 right-4 min-[821px]:bottom-4 min-[821px]:right-auto min-[821px]:max-w-[370px] z-[9990] pointer-events-none"
      role="note"
      aria-label="Privacy notice"
    >
      <div
        className={`pointer-events-auto flex items-start gap-3 rounded-xl border border-white/[0.09] bg-black/85 backdrop-blur-md px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out motion-reduce:transition-none ${
          shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <p className="font-manrope text-[12.5px] leading-[1.6] text-white/60">
          This site records your visit and uses Google Analytics.{" "}
          <a
            href="/privacy"
            className="text-white/85 underline underline-offset-2 decoration-white/25 hover:decoration-white/60 transition-colors"
          >
            What that means
          </a>
          .
        </p>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss privacy notice"
          className="shrink-0 -mr-1 -mt-0.5 rounded-md p-1 text-white/35 hover:text-white/80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/40 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M1 1l10 10M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
