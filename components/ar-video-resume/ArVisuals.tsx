"use client";

/**
 * The one interactive piece on /ar/video-resume: the button that puts the
 * poster on screen for a phone to scan.
 *
 * The overlay is the scan target, so it is built for a camera, not a reader:
 * near-black surround (no glare, no competing edges), the poster as large as
 * the viewport allows with `object-contain` so all four corners stay in frame,
 * and a real Fullscreen toggle because the browser's own chrome is the last
 * thing eating target area. It is portalled to <body> at the top z-index so
 * the nav, the mascot, the chat launcher and the side tabs cannot cover a
 * corner of the poster.
 *
 * The body is the scroll container on this site (Bible / AGENTS #4), so the
 * scroll lock goes on `document.body`, not `window`.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AR, IMG } from "./ar-data";

export function PosterReveal({ variant = "primary" }: { variant?: "primary" | "thumb" }) {
  const [open, setOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  // Only read while the overlay is open, which only happens after a click on
  // the client — so this never runs during SSR and cannot mismatch hydration.
  // (iPhone Safari has no element fullscreen; the button just does not show.)
  const canFull = open && !!document.documentElement.requestFullscreen;

  useEffect(() => {
    const onFs = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const close = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const opener = openerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) close();
      // Two buttons in the dialog — keep Tab between them.
      if (e.key === "Tab" && overlayRef.current) {
        const f = overlayRef.current.querySelectorAll<HTMLButtonElement>("button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, close]);

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else overlayRef.current?.requestFullscreen?.().catch(() => {});
  };

  return (
    <>
      {variant === "thumb" ? (
        <button
          ref={openerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="ar-thumb group relative block w-full overflow-hidden rounded-xl"
          style={{ border: `1px solid ${AR.line}`, aspectRatio: `${IMG.poster.w} / ${IMG.poster.h}` }}
        >
          <Image
            src={IMG.poster.src}
            alt=""
            fill
            sizes="(min-width: 768px) 420px, 92vw"
            quality={75}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* Blurred and dimmed on purpose: a thumbnail sharp enough to scan
              would start the film from the card, before the visitor is ready. */}
          <span
            aria-hidden
            className="absolute inset-0 backdrop-blur-[3px]"
            style={{ background: "linear-gradient(180deg, rgba(8,6,26,0.25), rgba(8,6,26,0.7))" }}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-manrope font-extrabold text-[14px]"
              style={{ background: AR.orange, color: AR.deep, boxShadow: "0 8px 30px rgba(255,126,95,0.45)" }}
            >
              <EyeIcon /> Reveal the poster
            </span>
          </span>
        </button>
      ) : (
        <button
          ref={openerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="ar-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-manrope font-extrabold text-[15px]"
          style={{ background: AR.orange, color: AR.deep, boxShadow: "0 10px 30px rgba(255,126,95,0.35)" }}
        >
          <EyeIcon /> Reveal the poster
        </button>
      )}

      {/* Portalled to <body>: the hero is an `sd-banner-host`, an isolated
          stacking context, and inside it no z-index can rise above the nav,
          the mascot or the side tabs. */}
      {open && createPortal(
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="The AR poster, shown full size for your phone to scan"
          className="fixed inset-0 z-[2147483000] flex flex-col"
          style={{ background: "#020205" }}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
            <p className="font-dmmono text-[10.5px] md:text-[11.5px] uppercase tracking-[0.16em]" style={{ color: AR.muted }}>
              <span style={{ color: AR.orange }}>●</span> Point your phone at the poster
              <span className="hidden md:inline"> · brightness up · whole poster in frame</span>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              {canFull && (
                <button
                  type="button"
                  onClick={toggleFull}
                  className="rounded-full px-4 py-2 font-manrope font-bold text-[13px]"
                  style={{ background: "rgba(255,255,255,0.08)", color: AR.text, border: `1px solid ${AR.line}` }}
                >
                  {isFull ? "Exit full screen" : "Full screen"}
                </button>
              )}
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close the poster"
                className="rounded-full px-4 py-2 font-manrope font-bold text-[13px]"
                style={{ background: AR.text, color: AR.deep }}
              >
                Close ✕
              </button>
            </div>
          </div>
          <div className="relative flex-1 min-h-0 m-2 md:m-4">
            <Image
              src={IMG.poster.src}
              alt={IMG.poster.alt}
              fill
              priority
              sizes="100vw"
              quality={75}
              className="object-contain"
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

function EyeIcon() {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
