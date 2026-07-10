"use client";

// Visitor notifier (Option C) — arrival ping + leave summary, linked by a
// per-visit ID.
//
// Flow:
//  • First page of a session → assign a short ID (e.g. V-7F3A), store the
//    session in sessionStorage (survives in-site navigation, clears on tab
//    close), and fire an ARRIVAL beacon.
//  • Each navigation → append the page to the journey (with entry time).
//  • Tab hidden/closed → fire a SUMMARY beacon (same ID) with the full journey
//    and total time.
//
// Self-exclusion: visiting any page with ?notrack=1 flags THIS browser
// (localStorage) so it never pings again — and sends a one-time Telegram
// confirmation naming the device. ?notrack=0 re-enables it.
//
// Everything is wrapped and fire-and-forget: a failed ping is invisible to the
// visitor and can never break the page.

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SS_KEY = "vp_session";
const MUTE_KEY = "vp_notrack";

type Entry = { path: string; enter: number };
type Session = { id: string; start: number; arrivalSent: boolean; entries: Entry[] };

function tz(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    return "";
  }
}
function lang(): string {
  try {
    return navigator.language || "";
  } catch {
    return "";
  }
}

function newId(): string {
  try {
    const b = crypto.getRandomValues(new Uint8Array(3));
    return (
      "V-" +
      Array.from(b)
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()
    );
  } catch {
    return "V-" + Math.random().toString(16).slice(2, 8).toUpperCase();
  }
}

function loadSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SS_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}
function saveSession(s: Session): void {
  try {
    sessionStorage.setItem(SS_KEY, JSON.stringify(s));
  } catch {
    // storage disabled — journey just won't persist; not fatal
  }
}

// Non-blocking send (arrival/mute): plenty of time, so use keepalive fetch.
function post(body: unknown): void {
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}

// Leave send (summary): sendBeacon is the reliable method during unload.
function beacon(body: unknown): void {
  try {
    const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      if (navigator.sendBeacon("/api/track", blob)) return;
    }
  } catch {
    // fall through to fetch
  }
  post(body);
}

export default function VisitorPing() {
  const pathname = usePathname();
  const sessionRef = useRef<Session | null>(null);
  const mutedRef = useRef(false);
  const summarySentRef = useRef(false);
  const initedRef = useRef(false);

  // One-time init: mute handling, session bootstrap, leave listener.
  useEffect(() => {
    if (initedRef.current) return;
    initedRef.current = true;

    // Self-exclusion link (?notrack=1 to mute this browser, ?notrack=0 to re-enable).
    try {
      const p = new URLSearchParams(window.location.search);
      const flag = p.get("notrack");
      if (flag === "1") {
        localStorage.setItem(MUTE_KEY, "1");
        beacon({ type: "mute", tz: tz(), lang: lang() });
      } else if (flag === "0") {
        localStorage.removeItem(MUTE_KEY);
        beacon({ type: "unmute", tz: tz(), lang: lang() });
      }
    } catch {
      // ignore
    }

    try {
      if (localStorage.getItem(MUTE_KEY) === "1") {
        mutedRef.current = true;
        return; // muted browser: no tracking, no listeners
      }
    } catch {
      // ignore
    }

    let s = loadSession();
    if (!s) {
      s = { id: newId(), start: Date.now(), arrivalSent: false, entries: [] };
      saveSession(s);
    }
    sessionRef.current = s;

    // Send the summary when the tab is hidden/closed. visibilitychange→hidden is
    // the cross-device-reliable "leaving" signal (and, unlike pagehide, it does
    // not fire on a plain reload — so reloads don't create phantom summaries).
    const onHidden = () => {
      if (document.visibilityState === "hidden") sendSummary();
    };
    document.addEventListener("visibilitychange", onHidden);
    return () => document.removeEventListener("visibilitychange", onHidden);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Per-navigation: record the page, and fire arrival on the first one.
  useEffect(() => {
    if (mutedRef.current || !pathname) return;
    const s = sessionRef.current || loadSession();
    if (!s) return;

    // Dedupe consecutive duplicates (StrictMode double-invoke / same path).
    const last = s.entries[s.entries.length - 1];
    if (!last || last.path !== pathname) {
      s.entries.push({ path: pathname, enter: Date.now() });
    }

    if (!s.arrivalSent) {
      s.arrivalSent = true;
      post({
        type: "arrival",
        id: s.id,
        path: pathname,
        referrer: (typeof document !== "undefined" && document.referrer) || "",
        tz: tz(),
        lang: lang(),
      });
    }

    sessionRef.current = s;
    saveSession(s);
  }, [pathname]);

  function sendSummary() {
    if (summarySentRef.current) return;
    const s = sessionRef.current || loadSession();
    if (!s || s.entries.length === 0) return;
    summarySentRef.current = true;

    const end = Date.now();
    const pages = s.entries.slice(0, 60).map((e, i) => {
      const next = s.entries[i + 1]?.enter ?? end;
      return { path: e.path, ms: Math.max(0, next - e.enter) };
    });

    beacon({
      type: "summary",
      id: s.id,
      totalMs: Math.max(0, end - s.start),
      pageCount: s.entries.length,
      pages,
    });
  }

  return null;
}
