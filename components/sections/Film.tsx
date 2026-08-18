"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/**
 * The film, on the home page.
 *
 * Two deliberate constraints, both about not paying for something nobody asked
 * for on the site's most important page.
 *
 * 1. The player is a facade. A YouTube iframe pulls well over a megabyte of
 *    Google JavaScript; loading it for the majority who never press play would
 *    land straight on this page's LCP. So we render our own poster and mount the
 *    player only on click — which also means nothing from Google touches a
 *    visitor unless they choose to watch, exactly as /privacy now states.
 *
 * 2. The Vanta background is lazy and conditional. three.js is already a
 *    dependency here but it is code-split behind the robot mascot, so it is NOT
 *    in this page's initial bundle and importing it eagerly would put it there.
 *    Both three and the effect are dynamically imported, and only once the
 *    section is actually on screen. Reduced-motion and small screens skip it
 *    entirely and keep the gradient underneath, which is why that gradient is a
 *    real background rather than a placeholder.
 */

const VIDEO_ID = "4AP2eui9720";

/**
 * Vanta's defaults are a bright blue daytime sky, which would fight every other
 * section on a black site and make white type unreadable. These are re-pitched to
 * the film's own palette: near-black ground, deep blue-grey cloud, and the site's
 * accent blue/violet/cyan standing in for sun and glare.
 */
const CLOUD_OPTIONS = {
  backgroundColor: 0x07090f,
  skyColor: 0x0b1226,
  cloudColor: 0x1c2740,
  cloudShadowColor: 0x04060b,
  sunColor: 0x4da3ff,
  sunGlareColor: 0x7b61ff,
  sunlightColor: 0x2fe2f0,
  speed: 0.55,
  // All off: this is a background, and grabbing pointer or gyro input would
  // interfere with scrolling — especially on touch.
  mouseControls: false,
  touchControls: false,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
};

export default function Film() {
  const [playing, setPlaying] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || small) return;

    let cancelled = false;

    // The body is the scroll container on this site, so window scroll listeners
    // never fire — IntersectionObserver is the only thing that works here.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || effectRef.current || cancelled) return;
        observer.disconnect();

        Promise.all([
          import("three"),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error — vanta ships no types
          import("vanta/dist/vanta.clouds.min"),
        ])
          .then(([THREE, vanta]) => {
            if (cancelled || !hostRef.current) return;
            const CLOUDS = (vanta as { default: (o: object) => { destroy: () => void } })
              .default;
            effectRef.current = CLOUDS({
              el: hostRef.current,
              THREE,
              ...CLOUD_OPTIONS,
            });
          })
          .catch(() => {
            // A failed background is not worth a broken section; the gradient
            // underneath is already a finished design.
          });
      },
      { rootMargin: "200px" }
    );

    observer.observe(host);
    return () => {
      cancelled = true;
      observer.disconnect();
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return (
    <section
      id="film"
      aria-labelledby="film-heading"
      className="relative overflow-hidden border-y border-white/[0.06] text-white"
    >
      {/* Fallback ground and Vanta host. Painted even when the effect never
          loads, so the section is never a flat black rectangle. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[#07090F] bg-[radial-gradient(ellipse_75%_60%_at_50%_35%,#0F1A33_0%,#07090F_70%)]"
      />
      <div ref={hostRef} aria-hidden className="absolute inset-0" />
      {/* Keeps type legible whatever the clouds are doing behind it. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80"
      />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-4">
              The film
            </p>
            <h2
              id="film-heading"
              className="font-manrope font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight"
            >
              No Obvious{" "}
              <span className="font-serif italic font-normal text-white/70">
                Gift
              </span>
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A8A]">
            5:57 &middot; Animated documentary
          </p>
        </div>

        <p className="max-w-2xl text-[15px] md:text-base leading-relaxed text-white/60 mb-10">
          Nine years in brand marketing, two years building AI products, and the
          route between them. Written, animated, scored and cut for this site.
        </p>

        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#07090F] aspect-video shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          {playing ? (
            <iframe
              // youtube-nocookie: nothing from Google until playback starts.
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="No Obvious Gift — a film by Suman Debnath"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play the film — 5 minutes 57 seconds"
              className="group absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Image
                src="/film-poster.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 960px"
                // images.qualities is unset in next.config, so 75 is the only
                // value next/image accepts here.
                quality={75}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25"
              />
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                  <Play
                    className="w-6 h-6 md:w-7 md:h-7 text-white translate-x-[2px]"
                    fill="currentColor"
                  />
                </span>
              </span>
            </button>
          )}
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#6E6E73]">
          Plays from YouTube &middot; nothing loads until you press play
        </p>
      </div>
    </section>
  );
}
