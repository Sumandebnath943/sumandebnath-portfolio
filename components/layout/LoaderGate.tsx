"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Loader from "@/components/sections/Loader";
import {
  LOADER_SEEN_KEY,
  INTRO_CLASS,
  INTRO_NAV_CLASS,
  NAV_DELAY_MS,
  hasSeenLoader,
  introRunsThisLoad,
  markIntroDone,
} from "@/lib/intro";

/**
 * Shows the cinematic loader once per session.
 *
 * "Has the loader been seen" lives in sessionStorage, which React cannot
 * observe — so it is read through useSyncExternalStore rather than copied into
 * state from an effect. The old shape did `setShow(true)` synchronously inside
 * the effect body, which is the cascading-render pattern React now warns about,
 * and it also meant the first paint was always the no-loader branch.
 *
 * The store never changes mid-session, so `subscribe` has nothing to listen
 * for. The server snapshot is `false`: there is no session storage there, and
 * rendering the loader server-side would flash it for everyone.
 */
const NO_CHANGE = () => () => {};

export default function LoaderGate() {
  const seen = useSyncExternalStore(NO_CHANGE, hasSeenLoader, () => true);
  const [dismissed, setDismissed] = useState(false);
  const visible = !seen && !dismissed;

  // Locking the page scroll is a side effect on an external system, which is
  // exactly what an effect is for.
  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  // The loader is on screen, so React is demonstrably alive — stand the inline
  // script's failsafe down and let the sequence below own the timing. Without
  // this, slow hydration plus a ~6s loader can push past the script's 8s
  // deadline, which then lifts the cover and frees the nav mid-intro.
  useEffect(() => {
    if (!visible) return;
    const w = window as Window & { __sdIntroFailsafe?: ReturnType<typeof setTimeout> };
    if (w.__sdIntroFailsafe) {
      clearTimeout(w.__sdIntroFailsafe);
      w.__sdIntroFailsafe = undefined;
    }
  }, [visible]);

  /**
   * Lift the pre-paint cover once the loader is done, and release the nav a
   * second after that.
   *
   * The condition is deliberately NOT `!visible`. During hydration
   * `useSyncExternalStore` hands back the *server* snapshot first — "already
   * seen" — so `visible` is false for one render before the client snapshot
   * corrects it. Keying off that lifted the cover the instant React booted,
   * uncovering the hero before the loader had painted, and started the mascot's
   * five-second clock so early that it revealed *during* the loading screen.
   * Both were measured, not theorised.
   *
   * So: if the loader is going to run on this load, wait for it to finish.
   * Otherwise there is nothing to wait for. The inline script's own 8s failsafe
   * still covers the case where React never arrives at all.
   */
  useEffect(() => {
    if (introRunsThisLoad() && !dismissed) return;
    const root = document.documentElement;
    root.classList.remove(INTRO_CLASS);
    markIntroDone();
    const t = setTimeout(() => root.classList.remove(INTRO_NAV_CLASS), NAV_DELAY_MS);
    return () => clearTimeout(t);
  }, [dismissed]);

  if (!visible) return null;

  return (
    <Loader
      onComplete={() => {
        try {
          sessionStorage.setItem(LOADER_SEEN_KEY, "1");
        } catch {
          /* storage unavailable — the dismissal below still ends this run */
        }
        setDismissed(true);
      }}
    />
  );
}
