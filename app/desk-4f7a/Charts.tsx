import type { Ranked } from "@/lib/db";

// Server-rendered SVG. No chart library, no client JavaScript — these are static
// pictures of numbers, and a dependency to draw a rectangle would be a poor
// trade.
//
// Colour: one hue throughout. Every chart here is a single series answering
// "how much", so length already carries the magnitude and a second hue would
// encode nothing. #3987e5 is the palette's dark-mode blue, validated against
// this black surface (lightness band, chroma floor, 3:1 contrast).
const SERIES = "#3987e5";
const GRID = "rgba(255,255,255,0.07)";

export function Panel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-white/[0.08] rounded-xl p-5">
      <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">{title}</h2>
      {hint ? <p className="font-manrope text-[11px] text-white/25 mt-1">{hint}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="font-manrope text-[13px] text-white/30 py-6 text-center">{children}</p>;
}

/**
 * Ranked horizontal bars.
 *
 * Labels sit above their bar rather than in a left gutter: paths and network
 * names are long and unpredictable, and a fixed gutter either truncates them or
 * squeezes the plot. Values sit outside the bar end, so nothing is ever clipped
 * by a bar too short to hold its own label.
 */
export function BarList({
  data,
  format,
  max,
}: {
  data: Ranked[];
  format?: (n: number) => string;
  max?: number;
}) {
  if (!data.length) return <Empty>Nothing recorded yet.</Empty>;
  const top = max ?? Math.max(...data.map((d) => d.value), 1);
  const fmt = format ?? ((n: number) => String(n));

  return (
    <ul className="space-y-3">
      {data.map((d) => {
        const pct = Math.max(1.5, (d.value / top) * 100);
        return (
          <li key={`${d.label}-${d.sub ?? ""}`}>
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <span className="font-manrope text-[12.5px] text-white/80 truncate" title={d.label}>
                {d.label}
                {d.sub ? <span className="text-white/30"> · {d.sub}</span> : null}
              </span>
              {/* tabular-nums here because these do align vertically. */}
              <span className="font-mono text-[11px] text-white/55 tabular-nums shrink-0">
                {fmt(d.value)}
              </span>
            </div>
            {/* Thin mark, rounded end, anchored to the baseline. The track is one
                shade off the surface rather than a border. */}
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, backgroundColor: SERIES }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Country bubbles on an equirectangular graticule.
 *
 * Positions are averaged from the visits' own coordinates, which Vercel derives
 * as a city centroid — accurate enough to put a country in the right place and
 * nowhere near accurate enough to put a person anywhere. Deliberately no
 * coastlines: a hand-approximated world outline would be wrong in ways that
 * look authoritative, so the graticule plus country codes carry the reading.
 */
export function WorldMap({
  points,
}: {
  points: { code: string; visits: number; lat: number; lng: number }[];
}) {
  if (!points.length) {
    return <Empty>No located visits yet — coordinates are recorded from now on.</Empty>;
  }

  const W = 720;
  const H = 360;
  const x = (lng: number) => ((lng + 180) / 360) * W;
  const y = (lat: number) => ((90 - lat) / 180) * H;
  const most = Math.max(...points.map((p) => p.visits), 1);
  // Area, not radius, tracks the count — a radius scale exaggerates big values.
  const r = (v: number) => 4 + Math.sqrt(v / most) * 22;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[520px] h-auto"
        role="img"
        aria-label={`Visits by country. ${points
          .slice(0, 5)
          .map((p) => `${p.code}: ${p.visits}`)
          .join(", ")}.`}
      >
        {/* Hairline graticule, solid — dashed grid reads as a threshold. */}
        {[-60, -30, 0, 30, 60].map((lat) => (
          <line key={`h${lat}`} x1={0} x2={W} y1={y(lat)} y2={y(lat)} stroke={GRID} strokeWidth={1} />
        ))}
        {[-120, -60, 0, 60, 120].map((lng) => (
          <line key={`v${lng}`} y1={0} y2={H} x1={x(lng)} x2={x(lng)} stroke={GRID} strokeWidth={1} />
        ))}
        <line x1={0} x2={W} y1={y(0)} y2={y(0)} stroke="rgba(255,255,255,0.13)" strokeWidth={1} />

        {points.map((p) => (
          <g key={p.code}>
            <circle
              cx={x(p.lng)}
              cy={y(p.lat)}
              r={r(p.visits)}
              fill={SERIES}
              fillOpacity={0.28}
              stroke={SERIES}
              strokeWidth={1.5}
            >
              {/* Native tooltip: interaction without shipping JavaScript. */}
              <title>{`${p.code} — ${p.visits} visit${p.visits === 1 ? "" : "s"}`}</title>
            </circle>
            {/* Only label where the bubble can hold it. */}
            {r(p.visits) > 11 ? (
              <text
                x={x(p.lng)}
                y={y(p.lat) + 4}
                textAnchor="middle"
                className="font-mono"
                fontSize={10}
                fill="rgba(255,255,255,0.85)"
              >
                {p.code}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
}

/** A number is sometimes the whole chart. */
export function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border border-white/[0.08] rounded-xl p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">{label}</p>
      {/* Proportional figures: tabular-nums makes a large standalone number
          look loose. */}
      <p className="font-manrope text-[26px] tracking-tight text-white mt-1.5">{value}</p>
      {sub ? <p className="font-manrope text-[11px] text-white/35 mt-0.5">{sub}</p> : null}
    </div>
  );
}
