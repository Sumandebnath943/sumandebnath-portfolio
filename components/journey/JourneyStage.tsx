"use client";

/**
 * The stage: one chapter at a time, advanced by the visitor's own hand.
 *
 * Shape of a beat — the gesture is the gate, and the payoff is the reward for
 * having made it:
 *
 *   narrative + artwork  →  the gesture  →  stats, artifacts, depth  →  Next
 *
 * Nothing auto-advances. A story about someone who kept having to push is not
 * one that should play itself while you watch.
 *
 * Three things this deliberately does NOT do:
 *   · No IntersectionObserver or scroll-driven progress. Progression is by
 *     intent, and scroll-linked animation is exactly the passive reading this
 *     section exists to avoid.
 *   · No route change per chapter. Back should leave the story, not step through
 *     sixteen history entries.
 *   · No gate on the prose. Every word is also in the transcript on the page, so
 *     a screen reader, a crawler, or someone who simply does not want to play
 *     gets the whole thing without touching a control.
 */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { chapters, CLOSING_LINE, HORIZON, JOURNEY_ARTIFACT_NOTE } from "@/lib/journey";
import {
  Assemble, Attend, Begin, Build, Choose, ConvergeIx, Expand, Finish,
  Grow, Open, Pile, Reveal, Shut, Travel, Unlock, Wait,
} from "./JourneyInteractions";

const PROGRESS_KEY = "jr_progress";

/**
 * How far they got last time, read the way React wants an external source read.
 *
 * The obvious version — read localStorage inside an effect and setState — is a
 * cascading render and the hooks lint rejects it. It also cannot be a lazy
 * useState initialiser, because the server has no localStorage and the two
 * renders would disagree. useSyncExternalStore is the shape that handles both:
 * the server snapshot is null, the client snapshot is the stored value, and the
 * subscribe is a no-op because nothing else writes this key mid-visit.
 */
const noopSubscribe = () => () => {};
function useStoredProgress(): number | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        const n = Number(localStorage.getItem(PROGRESS_KEY));
        return Number.isFinite(n) && n > 0 && n < chapters.length ? n : null;
      } catch {
        return null;
      }
    },
    () => null,
  );
}

/** Tell the visitor notifier how far someone actually got. */
function report(label: string) {
  try {
    window.dispatchEvent(new CustomEvent("vp:action", { detail: { a: "journey", label } }));
  } catch {
    // The story must never depend on the analytics being there.
  }
}

export default function JourneyStage() {
  const [i, setI] = useState(0);
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});
  const [dismissedResume, setDismissedResume] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const chapterRef = useRef<HTMLElement>(null);
  const movedRef = useRef(false);

  const ch = chapters[i];
  const isDone = !!doneMap[ch.id];
  const last = i === chapters.length - 1;

  // Offer to resume, rather than silently dropping someone back in — landing
  // mid-story with no memory of getting there is disorienting.
  const storedProgress = useStoredProgress();
  const restored = dismissedResume ? null : storedProgress;

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, String(i));
    } catch {
      /* ignore */
    }
    if (i === 0) report("journey: started");
    if (i === Math.floor(chapters.length / 2)) report("journey: halfway");
    if (i === chapters.length - 1) report("journey: finished");
  }, [i]);

  // After a real navigation, put the new chapter's opening drawing at the top of
  // the viewport. Without this you arrived at chapter two still scrolled to
  // wherever chapter one's Next button happened to be, looking at prose with the
  // scene somewhere above you.
  //
  // Not on first paint: that would yank the page down before anyone has read the
  // masthead. And focus must not scroll — the heading now sits BELOW the artwork,
  // so letting focus() do its default scrolling would jump straight past the
  // drawing this is trying to show.
  useEffect(() => {
    if (!movedRef.current) return;
    const smooth = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    chapterRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [i]);

  const complete = useCallback(() => {
    setDoneMap((m) => (m[ch.id] ? m : { ...m, [ch.id]: true }));
  }, [ch.id]);

  const go = useCallback((n: number) => {
    movedRef.current = true;
    setI(Math.max(0, Math.min(chapters.length - 1, n)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      // Never steal arrow keys from a control that wants them (the range input).
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight" && isDone && !last) go(i + 1);
      if (e.key === "ArrowLeft" && i > 0) go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, isDone, last, go]);

  const interaction = () => {
    const p = { onDone: complete, done: isDone };
    switch (ch.interaction) {
      case "begin": return <Begin {...p} cue={ch.cue} />;
      case "assemble": return <Assemble {...p} />;
      case "choose": return <Choose {...p} />;
      case "attend": return <Attend {...p} />;
      case "grow": return <Grow {...p} />;
      case "unlock": return <Unlock {...p} />;
      case "travel": return <Travel {...p} />;
      case "reveal": return <Reveal {...p} />;
      case "shut": return <Shut {...p} />;
      case "open": return <Open {...p} />;
      case "pile": return <Pile {...p} />;
      case "wait": return <Wait {...p} />;
      case "expand": return <Expand {...p} />;
      case "build": return <Build {...p} />;
      case "converge": return <ConvergeIx {...p} />;
      case "finish": return <Finish {...p} />;
      default: return <Begin {...p} cue={ch.cue} />;
    }
  };

  return (
    <div className="jr-stage" data-chapter={ch.id}>
      {/* Progress rail — also the only way to jump around, and it only ever
          exposes chapters already reached. */}
      <nav className="jr-rail" aria-label="Chapters">
        <ol>
          {chapters.map((c, n) => (
            <li key={c.id}>
              <button
                type="button"
                className={`jr-pip ${n === i ? "is-here" : ""} ${n < i ? "is-past" : ""}`}
                disabled={n > i}
                aria-current={n === i ? "step" : undefined}
                aria-label={`Chapter ${n + 1}: ${c.title}`}
                onClick={() => go(n)}
              />
            </li>
          ))}
        </ol>
        <p className="jr-rail-count">
          <span>{String(i + 1).padStart(2, "0")}</span>
          <span className="jr-rail-of">/ {chapters.length}</span>
        </p>
      </nav>

      {restored !== null && i === 0 && (
        <div className="jr-resume" role="status">
          <p>You were on chapter {restored + 1} last time.</p>
          <button
            type="button"
            className="jx-btn"
            onClick={() => {
              go(restored);
              setDismissedResume(true);
            }}
          >
            Pick it back up
          </button>
          <button type="button" className="jr-resume-no" onClick={() => setDismissedResume(true)}>
            start again
          </button>
        </div>
      )}

      <article className="jr-chapter" key={ch.id} ref={chapterRef}>
        <div className="jr-text">
          {/* The establishing shot, first. It used to sit below the prose, which
              meant a reader had to scroll a full screen before seeing the scene
              they were being told about — and two before reaching the control
              that moves the story on. The drawing opens the chapter now, and its
              horizon doubles as the rule the heading sits under. */}
          <div className="jr-scene">
            <div
              className="jr-scene-inner"
              style={{ "--horizon": `${HORIZON[ch.art] ?? 78}%` } as React.CSSProperties}
            >
              <span className="jr-horizon-l" aria-hidden="true" />
              <Image
                src={`/journey-art/${ch.art}.png`}
                alt=""
                aria-hidden="true"
                width={1536}
                height={1024}
                /* Only one chapter is mounted at a time, so there is exactly one
                   of these on the page and lazy-loading buys nothing — it just
                   left the scene blank until the reader scrolled down to it,
                   then popped the drawing in. Eager for every chapter; the
                   first also gets preloaded into the initial HTML. */
                {...(i === 0 ? { priority: true as const } : { loading: "eager" as const })}
                className="jr-shot-art"
                sizes="(max-width: 900px) 100vw, 74rem"
              />
              <span className="jr-horizon-r" aria-hidden="true" />
            </div>
          </div>

          <div className="jr-head">
            {/* The chapter number at magazine scale, ghosted behind the heading.
                The drawings are deliberately quiet, so the type carries the
                drama. Anchored to the heading rather than the chapter, or it
                would sit on top of the artwork above it. */}
            <span className="jr-numeral" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="jr-when">{ch.when}</p>
            <h2 className="jr-title" tabIndex={-1} ref={headingRef}>
              {ch.title}
            </h2>
          </div>

          <div className="jr-body">
            <div className="jr-prose">
              {ch.lines.map((l) => (
                <p key={l.slice(0, 32)}>{l}</p>
              ))}
            </div>
            {ch.pull && <p className="jr-pull">{ch.pull}</p>}
          </div>

          <div className="jr-act">{interaction()}</div>

          {/* The payoff. Held back until the gesture is spent, so that acting on
              the chapter is what produces the evidence for it.
              Six chapters carry no stats, artifacts or depth panel, and those
              were rendering this as an empty box with a rule on top — which
              looked like the control had half-failed. Nothing to show, nothing
              drawn; the unlocked Next button is the response in that case. */}
          {isDone && (ch.stats || ch.depth || ch.artifacts || last) && (
            <div className="jr-payoff">
              {ch.stats && (
                <ul className="jr-stats">
                  {ch.stats.map((s) => (
                    <li key={s.label}>
                      <strong>{s.value}</strong>
                      <span>{s.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              {ch.depth && (
                <details className="jr-depth">
                  <summary>
                    {ch.depth.label} <span className="jr-depth-n">({ch.depth.items.length})</span>
                  </summary>
                  <ul>
                    {ch.depth.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </details>
              )}

              {ch.artifacts && (
                <div className="jr-artifacts">
                  {ch.artifacts.map((a) => (
                    <figure key={a.src} className={`jr-artifact jr-artifact--${a.shape || "wide"}`}>
                      <Image
                        src={a.src}
                        alt={a.alt}
                        width={a.shape === "mark" ? 320 : 960}
                        height={a.shape === "mark" ? 120 : 640}
                        className="jr-shot"
                        sizes="(max-width: 900px) 92vw, 46vw"
                      />
                      <figcaption>{a.caption}</figcaption>
                    </figure>
                  ))}
                  <p className="jr-artifact-note">{JOURNEY_ARTIFACT_NOTE}</p>
                </div>
              )}

              {last && (
                <div className="jr-close">
                  <p className="jr-close-line">{CLOSING_LINE}</p>
                  <div className="jr-close-acts">
                    <Link href="/contact" className="jx-btn jx-btn-solid">
                      Give him the 95%
                    </Link>
                    <a href="/Suman_Debnath_Resume.pdf" download className="jx-btn">
                      Take the résumé
                    </a>
                  </div>
                  {/* "Two of these have their own pages" was wrong — most of
                      them do. */}
                  <p className="jr-close-egg">
                    Most of these have their own pages —{" "}
                    <Link href="/slms/pentacmd">the SLM</Link>,{" "}
                    <Link href="/llms/qdex-1.5b">the fine-tuned LLM</Link>,{" "}
                    <Link href="/agents/migi">the agent fleet</Link>, and{" "}
                    <Link href="/projects">everything else built alone</Link>. And try typing{" "}
                    <kbd>hire</kbd> anywhere on this site.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Both controls are grouped at the left, and nothing is placed in the
              bottom-right corner. The mascot and the chat launcher are fixed
              there site-wide, and a Next button under them was catching the
              mascot instead of advancing the chapter. */}
          <div className="jr-nav">
            {/* An arrow back up to the gesture, rather than "<cue> to unlock" —
                several cues are already imperative sentences and "Hold to grow
                the page to unlock" reads as a mess. */}
            {!last && !isDone && (
              <span id="jr-next-hint" className="jr-next-hint">
                <span aria-hidden>↑ </span>
                {ch.cue}
              </span>
            )}
            <div className="jr-nav-btns">
              <button type="button" className="jr-prev" disabled={i === 0} onClick={() => go(i - 1)}>
                ← Back
              </button>
              {/* Always "Next", never the chapter's cue: on chapters whose
                  gesture is itself a button, repeating the cue here printed the
                  same sentence twice and read as two ways to do one thing. */}
              {!last && (
                <button
                  type="button"
                  className="jr-next"
                  disabled={!isDone}
                  aria-describedby={!isDone ? "jr-next-hint" : undefined}
                  onClick={() => go(i + 1)}
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
