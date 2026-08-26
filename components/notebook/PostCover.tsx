import Image from "next/image";
import { CATEGORY_ACCENT, type Category } from "@/lib/notebook/types";

/**
 * A post's cover — the real image if it has one, generated art if it does not.
 *
 * A blog whose cards have empty image slots looks broken, and a grey
 * placeholder box looks worse. So posts without a cover get **deterministic**
 * generated art instead: the same slug always produces the same figure, tinted
 * with its category's accent. It reads as a designed system rather than as
 * something missing, and it costs nothing — inline SVG, no file, no request, no
 * layout shift.
 *
 * Deterministic matters. A random pattern would change on every render and
 * every deploy, which turns a familiar card into an unfamiliar one and makes
 * the blog feel unstable.
 *
 * Drop a real image at `cover` and it takes over completely. `coverAlt` is
 * required when you do — the generated art is decorative and correctly gets an
 * empty alt, but a real photograph carrying meaning does not.
 */

/** FNV-1a. Small, stable, and dependency-free — the point is only that the same
 *  slug maps to the same numbers on every machine and every build. */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** The three-up grid: full width on a phone, half on a tablet, a third above. */
export const GRID_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * The featured hero. Wider than a grid card at every breakpoint above a phone,
 * so it needs its own hint — `50vw` above 1024 rather than `33vw`, which is what
 * it actually occupies beside the body copy.
 */
export const HERO_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw";

export default function PostCover({
  slug,
  category,
  cover,
  coverAlt,
  priority = false,
  sizes = GRID_SIZES,
  className = "",
}: {
  slug: string;
  category: Category;
  cover?: string;
  coverAlt?: string;
  /** Set on the featured card only — it is the one above the fold. */
  priority?: boolean;
  /**
   * The `sizes` hint, and it **must** describe the slot this instance renders
   * into. Default is the grid; the featured hero is roughly half again as wide
   * and has to pass `HERO_SIZES` or next/image serves it a variant chosen for a
   * card and the browser upscales it.
   *
   * This was a real defect, found 26 Aug 2026 the moment real cover images
   * replaced the generated art: at a 1025px viewport the hero rendered 516px
   * wide and was handed 338px — a 1.53× upscale — while the grid cards were
   * correctly served. Vector art had hidden it completely, because SVG does not
   * pixelate. It is the same failure `ScreenshotFrame` had (HANDOFF §1.7), which
   * is twice now: **a shared image component with one hardcoded `sizes` is a
   * bug waiting for a second call site.**
   */
  sizes?: string;
  className?: string;
}) {
  if (cover) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={cover}
          alt={coverAlt ?? ""}
          fill
          sizes={sizes}
          className="object-cover"
          quality={75}
          priority={priority}
        />
      </div>
    );
  }

  const accent = CATEGORY_ACCENT[category];
  const h = hash(slug);

  // Four numbers off the hash drive the whole figure. Ranges are chosen so no
  // combination can produce something ugly — the arcs always sweep across the
  // frame, and the grid always reads as a grid.
  const rotation = h % 90;
  const bandCount = 3 + (h % 3);
  const offset = (h >> 8) % 40;
  const dotRows = 4 + ((h >> 16) % 3);

  const gid = `nbc-${slug}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        // Decorative: the post's title sits directly beside it and says
        // everything this conveys. An alt here would be noise in a screen
        // reader, repeated once per card.
        role="presentation"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${gid}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.20" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.04" />
          </linearGradient>
          <pattern id={`${gid}-d`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={accent} fillOpacity="0.28" />
          </pattern>
        </defs>

        <rect width="400" height="260" fill="#e9e1d1" />
        <rect width="400" height="260" fill={`url(#${gid}-g)`} />
        <rect
          x="0"
          y={130 - dotRows * 8}
          width="400"
          height={dotRows * 16}
          fill={`url(#${gid}-d)`}
        />

        <g transform={`rotate(${rotation} 200 130)`} opacity="0.9">
          {Array.from({ length: bandCount }).map((_, i) => (
            <circle
              key={i}
              cx={200 + offset - i * 14}
              cy={130}
              r={58 + i * 34}
              fill="none"
              stroke={accent}
              strokeOpacity={0.34 - i * 0.06}
              strokeWidth={1.5}
            />
          ))}
        </g>

        <rect x="0" y="256" width="400" height="4" fill={accent} fillOpacity="0.7" />
      </svg>
    </div>
  );
}
