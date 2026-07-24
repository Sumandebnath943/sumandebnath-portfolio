import { MIGI } from "./migi-data";

/* ═══════════════════════════════════════════════════════════════════════════
 *  MigiVideo — click-to-play YouTube embed built straight from a video ID (no
 *  share/embed snippet needed), on the privacy-friendly youtube-nocookie.com
 *  host. No autoplay: nothing loads a stream or plays until the visitor presses
 *  play. Optional CTA links down to another section (e.g. the full walk-through).
 * ═════════════════════════════════════════════════════════════════════════ */

type Props = {
  videoId: string;
  title: string;
  label?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function MigiVideo({ videoId, title, label = "video", ctaHref, ctaLabel }: Props) {
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <div>
      {/* 16:9 player frame — mac-style chrome to match the screenshot cards */}
      <div
        className="rounded-[1.25rem] overflow-hidden"
        style={{ background: MIGI.ink, border: `1px solid ${MIGI.ink}`, boxShadow: "0 40px 90px -50px rgba(0,0,0,0.7)" }}
      >
        <div className="flex items-center gap-2 px-4 py-3" style={{ background: MIGI.ink, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="w-3 h-3 rounded-full" style={{ background: "#F1655B" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#F5BF4F" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: MIGI.green }} />
          <span className="ml-3 font-dmmono text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>migi · {label}</span>
        </div>
        <div className="relative w-full bg-black" style={{ aspectRatio: "16 / 9" }}>
          {/* No `autoplay` in the allow list — the visitor presses play themselves. */}
          <iframe
            src={src}
            title={title}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>

      {ctaHref && ctaLabel && (
        <div className="mt-4 flex justify-center">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-manrope font-semibold text-sm transition-transform hover:-translate-y-0.5"
            style={{ background: MIGI.ink, color: MIGI.lime, boxShadow: "0 16px 34px -16px rgba(0,0,0,0.7)" }}
          >
            {ctaLabel} <span>↓</span>
          </a>
        </div>
      )}
    </div>
  );
}
