"use client";

import { useEffect, useState } from "react";

/**
 * Copy the link, hand it to the OS share sheet, or take the feed.
 *
 * The only client component step 2 adds, and it is client-side for one reason:
 * `navigator.clipboard` and `navigator.share` do not exist on the server. The
 * rest of the rail is server-rendered.
 *
 * **No third-party share intents.** X and LinkedIn buttons would mean this page
 * carries two more outbound endpoints, and the site's own /privacy page has to
 * match what the layout actually loads. Copy-and-paste costs the reader one
 * extra gesture and costs the site nothing.
 */

type State = "idle" | "copied" | "failed";

export default function ShareRow({ url, title }: { url: string; title: string }) {
  const [state, setState] = useState<State>("idle");
  // `navigator.share` exists on a phone and usually not on a desktop browser.
  // Reading it during render would produce different markup on the server and
  // the client, so the button is mounted in an effect and the first paint
  // matches what was prerendered.
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2400);
    return () => clearTimeout(t);
  }, [state]);

  async function copy() {
    // Clipboard access is refused outside a secure context and can be denied by
    // permission policy. Saying so is the point: a button that silently does
    // nothing is indistinguishable from one that worked, which is the failure
    // mode AGENTS.md warns about for `saveVisit()`.
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  async function share() {
    try {
      await navigator.share({ title, url });
    } catch {
      // An abort is the normal outcome of the OS sheet — the reader dismissed
      // it. Nothing to report and nothing to recover.
    }
  }

  return (
    <section className="nb-rail-mod nb-share" aria-labelledby="nb-share-label">
      <h2 id="nb-share-label" className="nb-rail-label">
        Share
      </h2>

      <div className="nb-share-row">
        <button type="button" onClick={copy} className="nb-share-btn">
          {state === "copied" ? "Link copied" : state === "failed" ? "Copy failed" : "Copy link"}
        </button>

        {canShare && (
          <button type="button" onClick={share} className="nb-share-btn">
            Share…
          </button>
        )}

        <a href="/notebook/rss.xml" className="nb-share-btn">
          RSS
        </a>
      </div>

      {/* Announced rather than merely coloured, so the outcome reaches a screen
          reader as well as an eye. */}
      <p className="nb-share-status" role="status">
        {state === "failed" ? "Clipboard unavailable — copy from the address bar." : ""}
      </p>
    </section>
  );
}
