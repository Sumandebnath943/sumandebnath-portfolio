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
 * The daylight palette, PRE-COMPENSATED for three.js colour management.
 *
 * Vanta was written for three r134, where `new Color(0xadc1de)` handed the shader
 * the raw sRGB triple (0.678, 0.757, 0.871). Since r152, `ColorManagement.enabled`
 * defaults to true, so the same call converts sRGB to linear and hands the shader
 * (0.418, 0.533, 0.731) instead. Red loses far more than blue — 0.678→0.418
 * against 0.871→0.731 — and that skew is why Vanta's own stock values rendered
 * with a purple cast here instead of the white cloud on its demo page.
 *
 * The clean fix would be `THREE.ColorManagement.enabled = false`, which is exactly
 * r134's behaviour. It is not available to us: the flag is global, and
 * RobotMascot in app/layout.tsx puts a GLTF scene on every page sharing this same
 * three instance. Turning colour management off site-wide to correct a background
 * would change how the robot's materials render.
 *
 * So each value below is passed through linear→sRGB first, which three's
 * sRGB→linear then undoes, landing the shader on the number Vanta expects. The
 * originals are kept in the comments — they are what you would type into Vanta's
 * own customiser, and what to start from if this is ever re-tuned.
 *
 * Cloud and shadow are additionally lifted toward white and softened: the brief
 * was white cloud, and Vanta's stock cloud is a fairly blue grey even when it is
 * behaving.
 */
const CLOUD_OPTIONS = {
  backgroundColor: 0xffffff,
  skyColor: 0xabdded, // 0x68b8d7
  cloudColor: 0xf0f4f8, // 0xadc1de, lifted to white
  cloudShadowColor: 0x93a0b1, // 0x183550, softened
  sunColor: 0xffcb58, // 0xff9919
  sunGlareColor: 0xffaa7c, // 0xff6633
  sunlightColor: 0xffcb7c, // 0xff9933
  speed: 1,
  // All off: this is a background, and grabbing pointer or gyro input would
  // interfere with scrolling — especially on touch.
  mouseControls: false,
  touchControls: false,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
};

/**
 * Compile the CLOUDS shader before anyone scrolls into it.
 *
 * Vanta's animation loop is wrapped in an `isOnScreen()` guard (see
 * `vanta/src/_base.js`), so creating the effect does NOT draw anything — the
 * very first `renderer.render()` happens the moment the section crosses into
 * view. That first draw is where three compiles and links the CLOUDS fragment
 * shader, and it is synchronous on the main thread.
 *
 * Measured on a production build: a single **669 ms** long task at the exact
 * scroll offset where the guard flips, which on this page is a few dozen pixels
 * under the hero. One frame, 671 ms late. It never recurs, because the program
 * is cached from then on — which is precisely why it reads as "the scroll
 * sticks once, just below the hero, then frees up".
 *
 * So: pay for it early and off the scroll path. `compileAsync` links through
 * KHR_parallel_shader_compile where the driver supports it, so the work lands
 * on a driver thread rather than ours. Where it does not exist, one forced
 * render inside an idle callback still moves the cost out of the gesture.
 */
function warmShader(effect: unknown) {
  const e = effect as {
    renderer?: {
      compileAsync?: (s: object, c: object) => Promise<unknown>;
      render?: (s: object, c: object) => void;
    };
    scene?: object;
    camera?: object;
  } | null;
  if (!e?.renderer || !e.scene || !e.camera) return;
  const { renderer, scene, camera } = e;

  if (typeof renderer.compileAsync === "function") {
    renderer.compileAsync(scene, camera).catch(() => {});
    return;
  }
  const idle =
    typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback
      : (cb: () => void) => window.setTimeout(cb, 1);
  idle(() => {
    try {
      renderer.render?.(scene, camera);
    } catch {
      // A warm-up that fails costs nothing — the first on-screen frame will
      // compile it the old way.
    }
  });
}

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
            warmShader(effectRef.current);
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
      className="relative overflow-hidden border-y border-black/10 text-[#14171C]"
    >
      {/* Fallback sky and Vanta host. The gradient approximates the effect —
          pale blue overhead down through cloud to warm haze — so visitors who
          never get the canvas (reduced motion, small screens, WebGL failure)
          still see a light band rather than a differently-designed section. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#7FC3DC_0%,#AEC9DD_30%,#DCE4E8_60%,#F2EDE4_85%,#E9E2D6_100%)]"
      />
      <div ref={hostRef} aria-hidden className="absolute inset-0" />
      {/* A light veil, not a dark scrim — it lifts contrast without greying the
          clouds out, which is what a heavy scrim would do.
          Measured: the 10px mono type needs 4.5:1 and was failing at 4.23:1
          against the bluest sky. At this veil the small type (#3A434E) reads
          5.7-6.4:1 and the heading 11:1. Cloud SHADOW is much darker and would
          fail under any veil worth using — but the effect renders clear sky at
          the top of the frame where all the type sits, and drops its shadow
          lower down, where the opaque video card is already covering it. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/15 to-white/40"
      />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#3A434E] mb-4">
              The film
            </p>
            <h2
              id="film-heading"
              className="font-manrope font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight"
            >
              Who am{" "}
              <span className="font-serif italic font-normal text-[#14171C]/70">
                I?
              </span>
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#3A434E]">
            5:57 &middot; Animated documentary
          </p>
        </div>

        <p className="max-w-2xl text-[15px] md:text-base leading-relaxed text-[#2C333C] mb-10">
          Nine years in brand marketing, two years building AI products, and the
          route between them. The whole answer, in under six minutes.
        </p>

        {/* The card stays dark — the poster is a night frame, and a dark object
            sitting on the bright sky is what makes this read as a deliberate
            band rather than a section that lost its background. */}
        <div className="relative rounded-lg overflow-hidden border border-black/15 bg-[#07090F] aspect-video shadow-[0_40px_90px_-25px_rgba(12,24,40,0.55)]">
          {playing ? (
            <iframe
              // youtube-nocookie: nothing from Google until playback starts.
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Who am I? — a film by Suman Debnath"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play the film — 5 minutes 57 seconds. Nothing loads from YouTube until you press play."
              title="Nothing loads from YouTube until you press play"
              className="group absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14171C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#DCE4E8]"
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

        {/* A film carries credits under it, not a cookie notice. The facade's
            privacy behaviour is still disclosed where it belongs — on /privacy —
            and restated on the play button itself for anyone who tabs to it. */}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#3A434E]">
          Written, animated, scored and cut by Suman Debnath
        </p>
      </div>
    </section>
  );
}
