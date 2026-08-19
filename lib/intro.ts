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
 * Everything is on ONE clock so the order never changes: nav, then mascot, then
 * chat. It briefly was not, and the result was that a first visit showed chat
 * five seconds before the robot while a reload showed the robot first — same
 * code, opposite order, because chat ran on a flat timer and the other two did
 * not.
 *
 *   first visit          reload / any other page
 *   ───────────          ───────────────────────
 *   +1.0s  navigation    immediate
 *   +2.5s  mascot        +0.8s
 *   +3.5s  chat          +1.4s
 *   +1.8s  privacy notice (its own existing delay, just started later)
 *
 * The reload delays are short on purpose rather than zero: the mascot pulls
 * ~2.4 MB (robot.glb + the environment map) and spins up WebGL, and firing that
 * during first paint is exactly what costs LCP. Under a second is imperceptible
 * and keeps it off the critical path.
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
/** Added for the length of the cover's fade-out, then both come off together. */
export const INTRO_OUT_CLASS = "sd-intro-out";

/** After the loader (first visit) / after mount (everything else). */
export const NAV_DELAY_MS = 1_000; // intro only; other loads show it at once
export const MASCOT_INTRO_MS = 2_500;
export const MASCOT_PLAIN_MS = 800;
export const CHAT_INTRO_MS = 3_500;
export const CHAT_PLAIN_MS = 1_400;

/** How long the black cover takes to fade once the loader is finished. */
export const COVER_FADE_MS = 600;

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

/** A tour mid-script needs its target on screen now — see `useReveal`. */
function tourInProgress(): boolean {
  try {
    return sessionStorage.getItem(TOUR_POSITION_KEY) !== null;
  } catch {
    return false; // storage unavailable — fall through to the normal delay
  }
}

/**
 * `true` after the appropriate delay: `introMs` measured from the loader
 * finishing, or `plainMs` from mount when no loader ran.
 *
 * A tour in progress skips the wait entirely. `#tour-chat` is the tour's final
 * step and `#tour-nav` its first, and the runner gives a step's element four
 * seconds to appear (`ELEMENT_TIMEOUT_MS`) — less than the intro delays, so the
 * step would otherwise fall back to a centred popover pointing at nothing.
 *
 * State is only ever set from a timer callback, never synchronously in the
 * effect body — `react-hooks/set-state-in-effect` is an error in this repo.
 */
export function useReveal(introMs: number, plainMs: number): boolean {
  const introDone = useIntroDone();
  const introRuns = useIntroRuns();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (introRuns && !introDone) return;
    const delay = tourInProgress() ? 0 : introRuns ? introMs : plainMs;
    const t = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(t);
  }, [introRuns, introDone, introMs, plainMs]);

  return revealed;
}
