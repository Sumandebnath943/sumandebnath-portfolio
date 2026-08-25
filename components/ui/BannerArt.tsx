/**
 * Generated banner art — a distinct figure behind each page's header.
 *
 * ## Why generated rather than eight illustrations
 *
 * Twenty-odd pages need a banner each. Commissioning or sourcing that many
 * images means twenty downloads on twenty pages, twenty things that can 404,
 * and a visual language that drifts as they accumulate. Inline SVG costs no
 * request, cannot fail to load, causes no layout shift, and stays coherent
 * because every form is drawn from the same small vocabulary of rules.
 *
 * ## Eight forms, not one pattern in eight colours
 *
 * The brief was "unique forms", and a single motif recoloured per page is not
 * that — it reads as a template. These are eight genuinely different
 * constructions: arcs, a lattice, contours, a node graph, a waveform, orbits,
 * moiré and a halftone field. A page keeps its form permanently, chosen by
 * hashing its path, so /resume always looks like /resume.
 *
 * ## Deterministic, and that is load-bearing
 *
 * Everything varies off an FNV-1a hash of the `seed` string. The same seed
 * always produces the same figure on every machine and every build. Random art
 * would change on each deploy, which turns a familiar page into an unfamiliar
 * one and quietly defeats the point of having a banner at all.
 *
 * ## Placement
 *
 * Render as the first child of an element carrying `sd-banner-host` (see
 * globals.css). That class establishes an isolated stacking context, so the
 * art's `z-index: -1` puts it above the host's background and behind its text
 * without any of the content needing to be positioned.
 */

type Variant = "dark" | "paper";

/** FNV-1a — small, stable and dependency-free. The only requirement is that a
 *  given string maps to the same number everywhere. */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** A deterministic 0–1 sequence seeded from the hash. */
function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

const FORMS = [
  "arcs",
  "lattice",
  "contours",
  "constellation",
  "waveform",
  "orbits",
  "moire",
  "halftone",
] as const;

export type BannerForm = (typeof FORMS)[number];

const W = 1200;
const H = 420;

function draw(form: BannerForm, seed: number, accent: string) {
  const r = rng(seed);
  const parts: React.ReactNode[] = [];

  switch (form) {
    // Concentric arcs sweeping off the right edge — the calmest of the eight.
    case "arcs": {
      const cx = W * (0.7 + r() * 0.2);
      const cy = H * (0.2 + r() * 0.5);
      for (let i = 0; i < 9; i++) {
        parts.push(
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={70 + i * 52}
            fill="none"
            stroke={accent}
            strokeOpacity={0.5 - i * 0.045}
            strokeWidth={1.2}
          />,
        );
      }
      break;
    }

    // An isometric lattice. Two mirrored line families, so it reads as depth
    // rather than as graph paper.
    case "lattice": {
      const gap = 34 + Math.floor(r() * 12);
      for (let x = -H; x < W + H; x += gap) {
        parts.push(
          <line key={`a${x}`} x1={x} y1={0} x2={x + H} y2={H} stroke={accent} strokeOpacity={0.22} strokeWidth={1} />,
          <line key={`b${x}`} x1={x} y1={0} x2={x - H} y2={H} stroke={accent} strokeOpacity={0.13} strokeWidth={1} />,
        );
      }
      break;
    }

    // Topographic contours. Each ring is the previous one nudged, which is what
    // makes it read as terrain instead of as ripples.
    case "contours": {
      let ox = W * 0.62;
      let oy = H * 0.5;
      for (let i = 0; i < 11; i++) {
        ox += (r() - 0.5) * 26;
        oy += (r() - 0.5) * 16;
        parts.push(
          <ellipse
            key={i}
            cx={ox}
            cy={oy}
            rx={40 + i * 46}
            ry={26 + i * 28}
            fill="none"
            stroke={accent}
            strokeOpacity={0.42 - i * 0.03}
            strokeWidth={1.1}
            transform={`rotate(${-12 + i * 2} ${ox} ${oy})`}
          />,
        );
      }
      break;
    }

    // A node graph — points with the near ones joined. Deliberately sparse; a
    // dense version reads as noise at this opacity.
    case "constellation": {
      const pts: [number, number][] = [];
      for (let i = 0; i < 26; i++) pts.push([r() * W, r() * H]);
      pts.forEach(([x1, y1], i) => {
        pts.slice(i + 1).forEach(([x2, y2]) => {
          const d = Math.hypot(x1 - x2, y1 - y2);
          if (d < 165) {
            parts.push(
              <line
                key={`${i}-${x2}-${y2}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={accent}
                strokeOpacity={0.3 * (1 - d / 165)}
                strokeWidth={0.9}
              />,
            );
          }
        });
        parts.push(<circle key={`p${i}`} cx={x1} cy={y1} r={2} fill={accent} fillOpacity={0.5} />);
      });
      break;
    }

    // Vertical bars on a smooth envelope. Reads as a spectrum, not a bar chart,
    // because the envelope is a sine rather than data.
    case "waveform": {
      const bars = 84;
      const phase = r() * Math.PI * 2;
      for (let i = 0; i < bars; i++) {
        const t = i / bars;
        const env = Math.sin(t * Math.PI * 2 + phase) * 0.5 + 0.5;
        const h = 26 + env * (H * 0.62) * (0.55 + r() * 0.45);
        parts.push(
          <rect
            key={i}
            x={t * W}
            y={H - h}
            width={Math.max(2, W / bars - 5)}
            height={h}
            fill={accent}
            fillOpacity={0.1 + env * 0.22}
            rx={1.5}
          />,
        );
      }
      break;
    }

    // Ellipses sharing a focus, each rotated — an orrery seen edge-on.
    case "orbits": {
      const cx = W * 0.72;
      const cy = H * 0.52;
      for (let i = 0; i < 7; i++) {
        const rot = r() * 180;
        const rx = 90 + i * 62;
        parts.push(
          <ellipse
            key={i}
            cx={cx} cy={cy} rx={rx} ry={rx * (0.24 + r() * 0.2)}
            fill="none" stroke={accent} strokeOpacity={0.4 - i * 0.04} strokeWidth={1.1}
            transform={`rotate(${rot} ${cx} ${cy})`}
          />,
        );
        parts.push(
          <circle key={`d${i}`} cx={cx + rx * Math.cos(rot)} cy={cy + rx * 0.3 * Math.sin(rot)} r={2.6} fill={accent} fillOpacity={0.5} />,
        );
      }
      break;
    }

    // Two line families at a small angular offset. The interference pattern is
    // the point — it is generated by the overlap, not drawn.
    case "moire": {
      const a1 = r() * 40 - 20;
      const a2 = a1 + 6 + r() * 6;
      [a1, a2].forEach((ang, k) =>
        Array.from({ length: 46 }).forEach((_, i) =>
          parts.push(
            <line
              key={`${k}-${i}`}
              x1={-200} y1={i * 14} x2={W + 200} y2={i * 14}
              stroke={accent} strokeOpacity={k ? 0.16 : 0.2} strokeWidth={1}
              transform={`rotate(${ang} ${W / 2} ${H / 2})`}
            />,
          ),
        ),
      );
      break;
    }

    // A dot field whose radius falls off from one corner. The most restrained
    // form — used where a header already carries a lot of type.
    case "halftone": {
      const gap = 26;
      const ox = r() > 0.5 ? W : 0;
      for (let x = gap / 2; x < W; x += gap) {
        for (let y = gap / 2; y < H; y += gap) {
          const d = Math.hypot(x - ox, y - H) / Math.hypot(W, H);
          const rad = Math.max(0, 4.2 * (1 - d) - 0.3);
          if (rad > 0.2) {
            parts.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={rad} fill={accent} fillOpacity={0.34 * (1 - d)} />);
          }
        }
      }
      break;
    }
  }

  return parts;
}

export default function BannerArt({
  seed,
  accent,
  variant = "dark",
  form,
  className = "",
}: {
  /** Usually the route path. Decides the form and every random value. */
  seed: string;
  /** The page's accent colour. */
  accent: string;
  variant?: Variant;
  /** Override the hashed choice when two adjacent pages collide on one form. */
  form?: BannerForm;
  className?: string;
}) {
  const h = hash(seed);
  const chosen: BannerForm = form ?? FORMS[h % FORMS.length];

  // The art sits below full strength so a headline reads straight over it.
  //
  // Paper needs MORE, not less — which is the opposite of the first guess. A
  // light accent on near-black is already high contrast, whereas clay on cream
  // is two mid-tones a few steps apart, and at 0.5 the figure on /journey was
  // invisible at a normal viewing distance. Measured against the rendered page,
  // not reasoned about.
  const opacity = variant === "paper" ? 0.85 : 0.62;

  return (
    <div className={`sd-banner-art ${className}`} aria-hidden="true" style={{ opacity }}>
      {/*
        The figure fades out to the left, where the headline sits, via a CSS
        mask on `.sd-banner-art` — NOT via a gradient rect painted over the SVG.

        A rect has to be filled with the page's own background colour to blend,
        and the paper pages do not share one: /resume is #f2ece0, /journey is
        #f4efe6, /fun-apps is #f4f4f0. A single hard-coded cream would have
        painted a visible block down the left of two pages out of three. Masking
        fades to transparency and cannot know or care what is behind it.
      */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMaxYMid slice"
        width="100%"
        height="100%"
        role="presentation"
      >
        <g>{draw(chosen, h, accent)}</g>
      </svg>
    </div>
  );
}
