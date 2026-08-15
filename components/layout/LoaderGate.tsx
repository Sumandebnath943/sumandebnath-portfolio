"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Loader from "@/components/sections/Loader";

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

function hasSeenLoader() {
  try {
    return Boolean(sessionStorage.getItem("sd-loader-seen"));
  } catch {
    // Private mode or storage disabled — treat as seen rather than replaying
    // the loader on every navigation.
    return true;
  }
}

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

  if (!visible) return null;

  return (
    <Loader
      onComplete={() => {
        try {
          sessionStorage.setItem("sd-loader-seen", "1");
        } catch {
          /* storage unavailable — the dismissal below still ends this run */
        }
        setDismissed(true);
      }}
    />
  );
}
