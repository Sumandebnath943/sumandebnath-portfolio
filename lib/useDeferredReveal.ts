"use client";

import { useEffect, useState } from "react";

interface DeferredRevealOptions {
  /** Delay (ms) after the page `load` event before revealing. */
  delayMs?: number;
  /** Number of distinct (debounced) scroll gestures that trigger an early reveal. */
  scrollGestures?: number;
}

/**
 * Reveals UI after the page has finished loading (plus a short delay), OR once
 * the user has performed a couple of scroll gestures — whichever happens first.
 * Keeps floating widgets from popping in while the page is still painting.
 */
export function useDeferredReveal({
  delayMs = 3000,
  scrollGestures = 2,
}: DeferredRevealOptions = {}): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let loadTimer: ReturnType<typeof setTimeout> | null = null;
    let scrollIdleTimer: ReturnType<typeof setTimeout> | null = null;
    let gestureCount = 0;
    let scrolling = false;

    const cleanup = () => {
      if (loadTimer) clearTimeout(loadTimer);
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
      window.removeEventListener("load", startLoadTimer);
      window.removeEventListener("scroll", onScroll);
    };

    const reveal = () => {
      setRevealed(true);
      cleanup();
    };

    function startLoadTimer() {
      loadTimer = setTimeout(reveal, delayMs);
    }

    // Count a "gesture" as a burst of scroll events; one gesture per idle gap.
    function onScroll() {
      if (!scrolling) {
        scrolling = true;
        gestureCount += 1;
        if (gestureCount >= scrollGestures) {
          reveal();
          return;
        }
      }
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(() => {
        scrolling = false;
      }, 200);
    }

    if (document.readyState === "complete") {
      startLoadTimer();
    } else {
      window.addEventListener("load", startLoadTimer, { once: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return cleanup;
  }, [delayMs, scrollGestures]);

  return revealed;
}
