"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { TOUR_POSITION_KEY } from "@/lib/tour-steps";

/**
 * The first-visit intro sequence.
 *
 * A first landing on `/` plays the cinematic loader, and everything else holds
 * back until it is finished. Before this existed, three things drew straight
 * over the loader, because all three out-rank it: the loader is `z-200` while
 * the chat launcher is 1000, the mascot 9999 and the nav 10000. The nav is
 * server-rendered so it was there from the first paint; the mascot and chat
 * arrived three seconds after `load`, roughly halfway through a ~5.8s loader.
 *
 * The order now, measured from the loader finishing:
 *
 *   +0.0s  loader ends, the pre-paint cover lifts
 *   +1.0s  navigation
 *   +5.0s  the mascot, running in from the right edge
 *   +1.8s  the privacy notice (its own existing delay, just started later)
 *
 * The chat launcher is deliberately NOT on this clock — it appears seven
 * seconds after load on every page, loader or not.
 *
 * ── Two things to keep in step ────────────────────────────────────────────
 *
 * 1. `LOADER_SEEN_KEY` and the `/` test in `introRunsThisLoad()` are repeated
 *    by the pre-paint inline script in `app/layout.tsx`. That script has to run
 *    before React exists, so it cannot import this file. **If the condition
 *    changes, change both** — if they disagree, either the cover never lifts or
 *    the hero flashes again.
 * 2. The class names below are matched by CSS in `app/globals.css`.
 */

/** Mirrors `LoaderGate` — the loader plays once per tab session. */
export const LOADER_SEEN_KEY = "sd-loader-seen";

/** On `<html>` while the intro owns the screen. Drives the black cover. */
export const INTRO_CLASS = "sd-intro";
/** On `<html>` for one second longer — holds the nav back. */
export const INTRO_NAV_CLASS = "sd-intro-nav";

/** How long after the loader each piece arrives. */
export const NAV_DELAY_MS = 1_000;
export const MASCOT_DELAY_MS = 5_000;
/** Flat, from page load, every page — not tied to the loader. */
export const CHAT_DELAY_MS = 7_000;

export function hasSeenLoader(): boolean {
  try {
    return Boolean(sessionStorage.getItem(LOADER_SEEN_KEY));
  } catch {
    // Private mode or storage disabled — treat as seen rather than replaying
    // the loader on every navigation.
    return true;
  }
}

/**
 * Will the cinematic loader play on THIS page load?
 *
 * Read once and cached: the answer must not change mid-session, or a component
 * that asked early would disagree with one that asked late.
 */
export function introRunsThisLoad(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.pathname === "/" && !hasSeenLoader();
}

/* ── "The intro has finished" as an external store ────────────────────────
   Module state rather than context: the readers sit in three different places
   in the tree (the nav is per-page, the mascot and notice are in the root
   layout) and none of them owns the loader. */

let done: boolean | null = null;
const listeners = new Set<() => void>();

function ensureInit() {
  if (done === null) done = !introRunsThisLoad();
}

/** Called by `LoaderGate` when the loader finishes — or when it never runs. */
export function markIntroDone() {
  ensureInit();
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function getSnapshot() {
  ensureInit();
  return done as boolean;
}

/** No session storage on the server, so nothing is ever mid-intro there. */
function getServerSnapshot() {
  return true;
}

export function useIntroDone(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Whether an intro is playing this load. Safe to call during render — every
 * consumer renders `null` until it reveals, so the server/client difference
 * never reaches the DOM.
 */
export function useIntroRuns(): boolean {
  const [runs] = useState(introRunsThisLoad);
  return runs;
}

/**
 * `true` once the intro has finished and `delayMs` has passed.
 *
 * State is only ever set from a timer callback, never synchronously in the
 * effect body — `react-hooks/set-state-in-effect` is an error in this repo.
 */
export function useRevealAfterIntro(delayMs: number): boolean {
  const introDone = useIntroDone();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!introDone) return;
    const t = setTimeout(() => setRevealed(true), delayMs);
    return () => clearTimeout(t);
  }, [introDone, delayMs]);

  return revealed;
}

/**
 * The chat launcher's own clock: a flat delay from page load, every page.
 *
 * The one exception is a tour in progress. `#tour-chat` is the tour's final
 * step, and the runner gives a step's element four seconds to appear
 * (`ELEMENT_TIMEOUT_MS`) — shorter than this delay, so the last step would
 * fall back to a centred popover pointing at nothing.
 */
export function useChatReveal(delayMs: number = CHAT_DELAY_MS): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let tourInProgress = false;
    try {
      tourInProgress = sessionStorage.getItem(TOUR_POSITION_KEY) !== null;
    } catch {
      /* storage unavailable — fall through to the normal delay */
    }
    const t = setTimeout(() => setRevealed(true), tourInProgress ? 0 : delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  return revealed;
}
