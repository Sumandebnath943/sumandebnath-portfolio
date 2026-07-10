"use client";

// Visitor notifier (Option C+) — arrival ping + leave summary, linked by a
// per-visit ID, enriched with first-party engagement signals.
//
// Arrival (first landing): assigns a short ID, and reports entry page, traffic
// source, new-vs-returning, personalized ?v= tag, languages, timezone.
// While browsing: records the page journey, max scroll depth per page, notable
// actions (résumé download, email/phone/social/contact clicks, copying your
// contact info), and active (tab-visible) time.
// Leave (tab hidden): fires a summary with the journey, actions, total + active
// time — same ID.
//
// Self-exclusion: ?notrack=1 mutes THIS browser (localStorage) + a Telegram
// confirmation; ?notrack=0 re-enables. Everything is first-party, fire-and-
// forget, and wrapped so a failure is invisible to the visitor.

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SS_KEY = "vp_session";
const MUTE_KEY = "vp_notrack";
const VISITS_KEY = "vp_visits";

type Action = { a: string; label: string };
type Entry = { path: string; enter: number; scroll: number };
type Session = {
  id: string;
  start: number;
  arrivalSent: boolean;
  entries: Entry[];
  actions: Action[];
  activeMs: number;
  lastActive: number; // timestamp of last visible->active transition
  tag: string;
  visit: number;
};

// --- small first-party readers ---------------------------------------------

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}
const tz = () => safe(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "", "");
const langs = () =>
  safe(() => (navigator.languages || [navigator.language]).slice(0, 4).join(", "), "");

function newId(): string {
  return safe(() => {
    const b = crypto.getRandomValues(new Uint8Array(3));
    return "V-" + Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
  }, "V-" + Math.random().toString(16).slice(2, 8).toUpperCase());
}

// Personalized-link tag: ?v= / ?ref= / utm_source / utm_campaign.
function readTag(): string {
  return safe(() => {
    const p = new URLSearchParams(window.location.search);
    return (p.get("v") || p.get("ref") || p.get("utm_source") || p.get("utm_campaign") || "").slice(0, 60);
  }, "");
}

// Human-readable traffic source from the referrer.
function readSource(): string {
  return safe(() => {
    const r = document.referrer;
    if (!r) return "Direct";
    const host = new URL(r).hostname.replace(/^www\./, "");
    if (host === window.location.hostname) return "Direct";
    const map: [string, string][] = [
      ["linkedin", "LinkedIn"], ["lnkd.in", "LinkedIn"], ["google.", "Google"],
      ["bing.", "Bing"], ["duckduckgo", "DuckDuckGo"], ["github", "GitHub"],
      ["t.co", "X/Twitter"], ["x.com", "X/Twitter"], ["twitter", "X/Twitter"],
      ["facebook", "Facebook"], ["instagram", "Instagram"], ["reddit", "Reddit"],
      ["youtube", "YouTube"], ["medium", "Medium"], ["mastodon", "Mastodon"],
      ["bsky", "Bluesky"],
    ];
    for (const [k, v] of map) if (host.includes(k)) return v;
    return host;
  }, "Direct");
}

// --- storage ---------------------------------------------------------------

function loadSession(): Session | null {
  return safe(() => {
    const raw = sessionStorage.getItem(SS_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  }, null);
}
function saveSession(s: Session): void {
  safe(() => sessionStorage.setItem(SS_KEY, JSON.stringify(s)), undefined);
}

// --- sending ---------------------------------------------------------------

function post(body: unknown): void {
  safe(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {});
  }, undefined);
}
function beacon(body: unknown): void {
  const sent = safe(() => {
    const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
    return !!(navigator.sendBeacon && navigator.sendBeacon("/api/track", blob));
  }, false);
  if (!sent) post(body);
}

// --- component --------------------------------------------------------------

export default function VisitorPing() {
  const pathname = usePathname();
  const sessionRef = useRef<Session | null>(null);
  const mutedRef = useRef(false);
  const summarySentRef = useRef(false);
  const initedRef = useRef(false);

  useEffect(() => {
    if (initedRef.current) return;
    initedRef.current = true;

    // Self-exclusion link.
    safe(() => {
      const flag = new URLSearchParams(window.location.search).get("notrack");
      if (flag === "1") {
        localStorage.setItem(MUTE_KEY, "1");
        beacon({ type: "mute", tz: tz() });
      } else if (flag === "0") {
        localStorage.removeItem(MUTE_KEY);
        beacon({ type: "unmute", tz: tz() });
      }
    }, undefined);

    if (safe(() => localStorage.getItem(MUTE_KEY) === "1", false)) {
      mutedRef.current = true;
      return; // muted browser: no tracking, no listeners
    }

    let s = loadSession();
    if (!s) {
      // New session → count it as a visit (per-browser, across sessions).
      const visit = safe(() => {
        const n = (parseInt(localStorage.getItem(VISITS_KEY) || "0", 10) || 0) + 1;
        localStorage.setItem(VISITS_KEY, String(n));
        return n;
      }, 1);
      s = {
        id: newId(), start: Date.now(), arrivalSent: false, entries: [],
        actions: [], activeMs: 0, lastActive: Date.now(), tag: readTag(), visit,
      };
      saveSession(s);
    }
    sessionRef.current = s;

    // Helper to record a notable action (deduped by label).
    const addAction = (a: string, label: string) => {
      const cur = sessionRef.current;
      if (!cur || cur.actions.some((x) => x.label === label)) return;
      cur.actions.push({ a, label });
      saveSession(cur);
    };

    // Key-action clicks (capture phase so we see it before navigation).
    const onClick = (e: MouseEvent) => {
      safe(() => {
        const anchor = (e.target as Element | null)?.closest?.("a");
        if (!anchor) return;
        const href = (anchor.getAttribute("href") || "").toLowerCase();
        if (!href) return;
        if (href.startsWith("mailto:")) return addAction("email", "clicked email");
        if (href.startsWith("tel:")) return addAction("phone", "clicked phone");
        if (href.includes("linkedin")) return addAction("social", "clicked LinkedIn");
        if (href.includes("github")) return addAction("social", "clicked GitHub");
        if (href.includes("x.com") || href.includes("twitter")) return addAction("social", "clicked X/Twitter");
        if (href.endsWith(".pdf") || href.includes("resume") || anchor.hasAttribute("download"))
          return addAction("resume", "downloaded Résumé");
        if (href.includes("#contact") || href.includes("/contact")) return addAction("contact", "opened Contact");
      }, undefined);
    };

    // Copying your email/phone is a strong intent signal.
    const onCopy = () => {
      safe(() => {
        const sel = (window.getSelection?.()?.toString() || "").trim();
        if (/@/.test(sel) && /\.[a-z]{2,}/i.test(sel)) addAction("copy-email", "copied email");
        else if (/\+?\d[\d\s-]{7,}\d/.test(sel)) addAction("copy-phone", "copied phone");
      }, undefined);
    };

    // Custom intent events emitted elsewhere (e.g. résumé mascot download).
    const onVpAction = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      if (d.a && d.label) addAction(String(d.a), String(d.label));
    };

    // Max scroll depth for the current page.
    const onScroll = () => {
      safe(() => {
        const cur = sessionRef.current;
        if (!cur || cur.entries.length === 0) return;
        const doc = document.documentElement;
        const denom = doc.scrollHeight - doc.clientHeight;
        const pct = denom > 0 ? Math.min(100, Math.round(((window.scrollY + doc.clientHeight) / doc.scrollHeight) * 100)) : 100;
        const last = cur.entries[cur.entries.length - 1];
        if (pct > last.scroll) {
          last.scroll = pct;
          saveSession(cur);
        }
      }, undefined);
    };

    // Active-time accounting + leave detection.
    const onVisibility = () => {
      const cur = sessionRef.current;
      if (!cur) return;
      if (document.visibilityState === "hidden") {
        cur.activeMs += Math.max(0, Date.now() - cur.lastActive);
        saveSession(cur);
        sendSummary();
      } else {
        cur.lastActive = Date.now();
        saveSession(cur);
      }
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("copy", onCopy);
    window.addEventListener("vp:action", onVpAction);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("copy", onCopy);
      window.removeEventListener("vp:action", onVpAction);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Per-navigation: record page + fire arrival on the first one.
  useEffect(() => {
    if (mutedRef.current || !pathname) return;
    const s = sessionRef.current || loadSession();
    if (!s) return;

    const last = s.entries[s.entries.length - 1];
    if (!last || last.path !== pathname) {
      s.entries.push({ path: pathname, enter: Date.now(), scroll: 0 });
    }

    if (!s.arrivalSent) {
      s.arrivalSent = true;
      post({
        type: "arrival",
        id: s.id,
        path: pathname,
        source: readSource(),
        visit: s.visit,
        tag: s.tag,
        referrer: safe(() => document.referrer, "") || "",
        tz: tz(),
        langs: langs(),
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
      return { path: e.path, ms: Math.max(0, next - e.enter), scroll: e.scroll };
    });

    beacon({
      type: "summary",
      id: s.id,
      tag: s.tag,
      totalMs: Math.max(0, end - s.start),
      activeMs: s.activeMs,
      pageCount: s.entries.length,
      pages,
      actions: s.actions.slice(0, 12),
    });
  }

  return null;
}
