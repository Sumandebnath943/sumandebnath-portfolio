"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/**
 * The film, under the hero.
 *
 * Deliberately NOT a YouTube iframe on load. The embed pulls well over a megabyte
 * of Google JavaScript, and paying that on every homepage visit — including the
 * majority who will never press play — would show up directly in this page's LCP.
 *
 * So this is a facade: our own poster frame, and the player only mounts on click.
 * Two things follow from that beyond speed. Nothing from Google touches a visitor
 * unless they choose to watch, which is a far cleaner thing to disclose on
 * /privacy; and the poster is a frame we chose (the opening rooftop) rather than
 * whatever YouTube's auto-thumbnail lands on, which is usually a dissolve.
 */

const VIDEO_ID = "4AP2eui9720";

export default function Film() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="film"
      aria-labelledby="film-heading"
      className="relative bg-black text-white border-y border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-4">
              The film
            </p>
            <h2
              id="film-heading"
              className="font-manrope font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight"
            >
              Seventeen years,{" "}
              <span className="font-serif italic font-normal text-white/70">
                in six minutes
              </span>
              .
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A8A]">
            5:57 &middot; Animated
          </p>
        </div>

        <p className="max-w-2xl text-[15px] md:text-base leading-relaxed text-white/60 mb-10">
          An animated documentary about the part underneath the r&eacute;sum&eacute; &mdash;
          a boy who could not speak one correct English sentence, a Lamborghini
          page that reached 677,503 people, four months nobody asks about, and
          twenty AI products built by someone who cannot code.
        </p>

        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#07090F] aspect-video">
          {playing ? (
            <iframe
              // youtube-nocookie: no cookies until playback actually starts.
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
                priority={false}
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30"
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
              <span
                aria-hidden
                className="absolute left-5 bottom-4 md:left-7 md:bottom-6 font-serif italic text-lg md:text-2xl text-white/85"
              >
                No Obvious Gift
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
