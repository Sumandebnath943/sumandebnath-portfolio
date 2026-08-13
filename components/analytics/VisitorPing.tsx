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
import { ADMIN_PATH } from "@/lib/admin-path";

const SS_KEY = "vp_session";
const MUTE_KEY = "vp_notrack";
const VISITOR_KEY = "vp_visitor";

// How long a tab must stay hidden before it counts as "visitor left". Below
// this it's a tab-switch, and the visit is still going.
const LEAVE_GRACE_MS = 20_000;
// How long a page is left to settle before the journey card is rewritten.
const CARD_REFRESH_MS = 3_000;

// Actions that warrant an immediate "hot" ping (direct hiring/contact intent),
// rather than only appearing in the end-of-visit summary.
const HOT = new Set(["resume", "email", "phone", "copy-email", "copy-phone"]);

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
  interacted: boolean; // any scroll/pointer/key input seen this visit
  mid?: number; // Telegram id of the arrival alert; later messages reply to it
  smid?: number; // Telegram id of this visit's journey card, rewritten as it goes
};
// Per-browser visit history. The one piece of state that outlives the tab.
type Visitor = { first: number; last: number; count: number };

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

// Physical screen, not the window — a headless run usually reports 0×0.
const screenSize = () =>
  safe(() => {
    const dpr = window.devicePixelRatio || 1;
    return `${screen.width}×${screen.height}${dpr !== 1 ? ` @${dpr}x` : ""}`;
  }, "");
// The window, as opposed to the screen. A large monitor with the site in a
// narrow window is a different reading experience from a maximised one.
const viewportSize = () => safe(() => `${window.innerWidth}×${window.innerHeight}`, "");

// utm_source already feeds the visit tag; these two are kept apart so campaign
// and medium can be grouped independently.
const utmPart = (key: string) =>
  safe(() => new URLSearchParams(window.location.search).get(key)?.slice(0, 60) || "", "");

const cores = () => safe(() => navigator.hardwareConcurrency ?? -1, -1);
const webdriver = () => safe(() => navigator.webdriver === true, false);

// Count this visit and report how long since the last one. Called once per
// session, so a reload in the same tab doesn't inflate the count.
function bumpVisitor(): { visits: number; daysSince: number } {
  return safe(
    () => {
      const raw = localStorage.getItem(VISITOR_KEY);
      const prev = raw ? (JSON.parse(raw) as Visitor) : null;
      const now = Date.now();
      const rec: Visitor = prev
        ? { first: prev.first, last: now, count: (prev.count || 0) + 1 }
        : { first: now, last: now, count: 1 };
      localStorage.setItem(VISITOR_KEY, JSON.stringify(rec));
      return {
        visits: rec.count,
        daysSince: prev?.last ? Math.floor((now - prev.last) / 86_400_000) : -1,
      };
    },
    { visits: 1, daysSince: -1 },
  );
}

// Pronounceable ids beat hex for spotting the same visit across messages in a
// busy chat — "clever-marten-42" sticks where "V-A3F2B1" does not. 16 × 16 × 100
// combinations is ample for telling concurrent visitors apart.
const ID_ADJ = "amber brisk clever dusky eager frosty golden hazel ivory jolly keen lunar misty noble olive quiet".split(" ");
const ID_NOUN = "fox heron ibex jackal koala lynx marten newt otter puma quail raven seal tapir urchin viper".split(" ");

function newId(): string {
  return safe(() => {
    const b = crypto.getRandomValues(new Uint8Array(3));
    return `${ID_ADJ[b[0] % 16]}-${ID_NOUN[b[1] % 16]}-${b[2] % 100}`;
  }, `visit-${Math.random().toString(36).slice(2, 6)}`);
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

// `onReply` exists only for the arrival call, which needs the Telegram message
// id back. Beacons can't read responses, but they don't need to — they only
// echo the id the arrival already stored.
function post(body: unknown, onReply?: (data: { mid?: number; smid?: number }) => void): void {
  safe(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    })
      .then((r) => (onReply && r.ok ? r.json().catch(() => null) : null))
      .then((d) => {
        if (d && onReply) onReply(d as { mid?: number; smid?: number });
      })
      .catch(() => {});
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
  const leftAtRef = useRef(0);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Set the moment an in-site link is clicked. Internal links here are plain
  // <a>, so following one unloads the page and fires pagehide exactly as a real
  // exit does — this is what tells the two apart.
  const internalNavRef = useRef(false);

  // Declared ahead of the effects that call them: the effects reference these,
  // and a function declared afterwards cannot be seen to change over time.
  function summaryPayload(live: boolean) {
    const s = sessionRef.current || loadSession();
    if (!s || s.entries.length === 0) return null;

    // Measure to when they actually left, not to when the grace timer fired.
    const end = live ? Date.now() : leftAtRef.current || Date.now();
    const pages = s.entries.slice(0, 60).map((e, i) => {
      const next = s.entries[i + 1]?.enter ?? end;
      return { path: e.path, ms: Math.max(0, next - e.enter), scroll: e.scroll };
    });

    const seen = safe(() => {
      const raw = localStorage.getItem(VISITOR_KEY);
      return raw ? (JSON.parse(raw) as Visitor) : null;
    }, null);

    return {
      type: "summary" as const,
      live,
      id: s.id,
      tag: s.tag,
      mid: s.mid,
      smid: s.smid,
      totalMs: Math.max(0, end - s.start),
      activeMs: s.activeMs,
      pageCount: s.entries.length,
      pages,
      actions: s.actions.slice(0, 12),
      // Carried again so the deep-dive report can stand on its own.
      tz: tz(),
      langs: langs(),
      source: readSource(),
      referrer: safe(() => document.referrer, "") || "",
      screen: screenSize(),
      viewport: viewportSize(),
      utmMedium: utmPart("utm_medium"),
      utmCampaign: utmPart("utm_campaign"),
      hw: cores(),
      wd: webdriver(),
      // Sessions started before this field existed must read as "unknown", not
      // "no interaction" — otherwise a deploy mid-visit mislabels real people.
      interacted: typeof s.interacted === "boolean" ? s.interacted : undefined,
      visits: seen?.count ?? 1,
    };
  }

  // Bring the card up to date mid-visit. Without this the card only ever gets
  // written at unload, so a tab that is killed outright leaves it stranded on
  // the placeholder with no journey on it.
  function refreshCard() {
    const p = summaryPayload(true);
    // Nothing to say until the arrival round-trip has handed us a card to write.
    if (!p || typeof p.smid !== "number") return;
    post(p);
  }

  function sendSummary() {
    // The ref stops a double send within this page. There is deliberately no
    // across-page guard: a visit that resumes after a reload must be allowed to
    // send again, because that later send is the one carrying the complete
    // journey. It rewrites the same card rather than adding a message.
    if (summarySentRef.current) return;
    const p = summaryPayload(false);
    if (!p) return;
    summarySentRef.current = true;
    beacon(p);
  }


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

    // Never track the dashboard. Reading your own visitor records should not
    // alert you about yourself or land in the table you are reading.
    if (safe(() => location.pathname.startsWith(ADMIN_PATH), false)) {
      mutedRef.current = true;
      return;
    }

    let s = loadSession();
    if (!s) {
      s = {
        id: newId(), start: Date.now(), arrivalSent: false, entries: [],
        actions: [], activeMs: 0, lastActive: Date.now(), tag: readTag(),
        interacted: false,
      };
      saveSession(s);
    }
    // The page has just loaded, so the visitor is active as of now. Resuming a
    // session used to keep the previous page's `lastActive`, and the next
    // hidden-tab accounting then re-counted seconds already banked in activeMs —
    // which is how a 16s visit reported 43s of active time.
    s.lastActive = Date.now();
    saveSession(s);
    sessionRef.current = s;

    // Helper to record a notable action (deduped by label). High-intent actions
    // also fire an immediate "hot" ping so the owner hears about them in real time.
    const addAction = (a: string, label: string) => {
      const cur = sessionRef.current;
      if (!cur || cur.actions.some((x) => x.label === label)) return;
      cur.actions.push({ a, label });
      saveSession(cur);
      if (HOT.has(a)) {
        post({ type: "action", id: cur.id, a, label, path: safe(() => location.pathname, ""), tag: cur.tag, mid: cur.mid });
      }
    };

    // Key-action clicks (capture phase so we see it before navigation).
    const onClick = (e: MouseEvent) => {
      safe(() => {
        const anchor = (e.target as Element | null)?.closest?.("a");
        if (!anchor) return;
        const href = (anchor.getAttribute("href") || "").toLowerCase();
        if (!href) return;

        // Is this click about to reload us into another page of this same site?
        // Modified clicks and target=_blank open elsewhere and leave this page
        // alive, so they are not an internal navigation for our purposes.
        const plainClick =
          e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
        const newTab = (anchor.getAttribute("target") || "").toLowerCase() === "_blank";
        if (plainClick && !newTab) {
          const dest = safe(() => new URL(anchor.getAttribute("href") || "", location.href), null);
          if (dest && dest.origin === location.origin && !href.startsWith("#")) {
            internalNavRef.current = true;
            // If the navigation never happens (preventDefault, a blocked route),
            // release the flag so a genuine exit still reports.
            setTimeout(() => (internalNavRef.current = false), 3_000);
          }
        }
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

    // Any genuine input. Scrapers that only fetch and parse never fire these,
    // which makes it the single most useful human signal we collect.
    const markInteracted = () => {
      const cur = sessionRef.current;
      if (!cur || cur.interacted) return;
      cur.interacted = true;
      saveSession(cur);
    };

    // Max scroll depth for the current page.
    const onScroll = () => {
      markInteracted();
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

    // Active-time accounting + leave detection. Hiding only *arms* the summary:
    // coming back within the grace window cancels it and the visit keeps
    // accumulating, so a tab-switch no longer truncates the whole visit.
    const onVisibility = () => {
      const cur = sessionRef.current;
      if (!cur) return;
      if (document.visibilityState === "hidden") {
        cur.activeMs += Math.max(0, Date.now() - cur.lastActive);
        saveSession(cur);
        leftAtRef.current = Date.now();
        if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = setTimeout(sendSummary, LEAVE_GRACE_MS);
      } else {
        if (leaveTimerRef.current) {
          clearTimeout(leaveTimerRef.current);
          leaveTimerRef.current = null;
        }
        leftAtRef.current = 0;
        cur.lastActive = Date.now();
        saveSession(cur);
      }
    };

    // A real close or navigation away gets no grace period. Mobile browsers
    // often fire only one of these two, so both paths are wired.
    const onPageHide = () => {
      const cur = sessionRef.current;
      if (cur && document.visibilityState !== "hidden") {
        cur.activeMs += Math.max(0, Date.now() - cur.lastActive);
        saveSession(cur);
      }
      // Moving to another page of this site is not the end of the visit. The
      // next page picks the same session back up out of sessionStorage and keeps
      // going; summarising here is what sent one "left" message per page.
      if (internalNavRef.current) return;
      if (!leftAtRef.current) leftAtRef.current = Date.now();
      sendSummary();
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("copy", onCopy);
    window.addEventListener("vp:action", onVpAction);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("pointerdown", markInteracted, { passive: true, once: true });
    document.addEventListener("keydown", markInteracted, { once: true });
    document.addEventListener("touchstart", markInteracted, { passive: true, once: true });
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("copy", onCopy);
      window.removeEventListener("vp:action", onVpAction);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("pointerdown", markInteracted);
      document.removeEventListener("keydown", markInteracted);
      document.removeEventListener("touchstart", markInteracted);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
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
      const { visits, daysSince } = bumpVisitor();
      post({
        type: "arrival",
        id: s.id,
        path: pathname,
        source: readSource(),
        tag: s.tag,
        referrer: safe(() => document.referrer, "") || "",
        tz: tz(),
        langs: langs(),
        screen: screenSize(),
        viewport: viewportSize(),
        utmMedium: utmPart("utm_medium"),
        utmCampaign: utmPart("utm_campaign"),
        hw: cores(),
        wd: webdriver(),
        visits,
        daysSince,
      }, (d) => {
        const cur = sessionRef.current;
        if (!cur) return;
        if (typeof d?.mid === "number") cur.mid = d.mid;
        // The id of this visit's journey card. Captured here because this is the
        // only send whose response we can read — at unload we can fire a beacon
        // and nothing more, so the id has to be in hand before then.
        if (typeof d?.smid === "number") cur.smid = d.smid;
        if (typeof d?.mid === "number" || typeof d?.smid === "number") saveSession(cur);
      });
    }

    sessionRef.current = s;
    saveSession(s);

    // Write the card shortly after each page settles. Delayed so a quick bounce
    // through a page doesn't spend a call on a journey that is about to change,
    // and so the arrival round-trip has had time to hand back the card id.
    const t = setTimeout(refreshCard, CARD_REFRESH_MS);
    return () => clearTimeout(t);
    // refreshCard is redeclared every render; listing it would re-run this on
    // each one and write the card far more often than a page view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
