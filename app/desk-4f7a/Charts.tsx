import type { Ranked } from "@/lib/db";
import { RULE, TRACK, card, eyebrow, hue, tint } from "./theme";

// Server-rendered SVG and CSS. No chart library, no client JavaScript — these
// are static pictures of numbers, and a dependency to draw a rectangle would be
// a poor trade. Hover text comes from SVG <title>.
//
// Each panel gets its own hue rather than one colour throughout: every chart is
// a separate single-series answer to "how much", so a panel's colour identifies
// the metric, never a rank within it. Colours and their order come from
// theme.ts, where they were validated rather than chosen by eye.

export function Panel({
  title,
  hint,
  accent = 0,
  children,
}: {
  title: string;
  hint?: string;
  accent?: number;
  children: React.ReactNode;
}) {
  return (
    <section className={`${card} p-5`}>
      <div className="flex items-center gap-2">
        {/* A small mark carries the panel's identity so the heading itself can
            stay in ink — text never wears the series colour. */}
        <span
          aria-hidden
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: hue(accent) }}
        />
        <h2 className={eyebrow}>{title}</h2>
      </div>
      {hint ? <p className="font-manrope text-[11px] text-black/35 mt-1.5">{hint}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="font-manrope text-[13px] text-black/35 py-6 text-center">{children}</p>;
}

/**
 * Ranked horizontal bars.
 *
 * Labels sit above their bar rather than in a left gutter: paths and network
 * names are long and unpredictable, and a fixed gutter either truncates them or
 * squeezes the plot. Values sit outside the bar, so nothing is ever clipped by a
 * bar too short to hold its own label — and those visible labels are also the
 * secondary encoding that keeps identity off colour alone.
 */
export function BarList({
  data,
  format,
  accent = 0,
}: {
  data: Ranked[];
  format?: (n: number) => string;
  accent?: number;
}) {
  if (!data.length) return <Empty>Nothing recorded yet.</Empty>;
  const top = Math.max(...data.map((d) => d.value), 1);
  const fmt = format ?? ((n: number) => String(n));
  const colour = hue(accent);

  return (
    <ul className="space-y-3">
      {data.map((d) => {
        const pct = Math.max(1.5, (d.value / top) * 100);
        return (
          <li key={`${d.label}-${d.sub ?? ""}`}>
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <span className="font-manrope text-[12.5px] text-[#0b0b0b] truncate" title={d.label}>
                {d.label}
                {d.sub ? <span className="text-black/35"> · {d.sub}</span> : null}
              </span>
              {/* tabular-nums here because these do align vertically. */}
              <span className="font-mono text-[11px] text-black/50 tabular-nums shrink-0">
                {fmt(d.value)}
              </span>
            </div>
            {/* Thin mark, rounded end, anchored to the baseline. The track is one
                shade off the surface rather than a drawn border. */}
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: TRACK }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: colour }} />
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
 * as a city centroid — enough to put a country in the right place, nowhere near
 * enough to put a person anywhere. Deliberately no coastlines: a
 * hand-approximated world outline would be wrong in ways that look
 * authoritative, so the graticule and country codes carry the reading.
 */
export function WorldMap({
  points,
  accent = 0,
}: {
  points: { code: string; visits: number; lat: number; lng: number }[];
  accent?: number;
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
  const colour = hue(accent);

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[520px] h-auto"
        role="img"
        aria-label={`Visits by country. ${points.slice(0, 5).map((p) => `${p.code}: ${p.visits}`).join(", ")}.`}
      >
        <rect x={0} y={0} width={W} height={H} rx={10} fill="#f7f7f5" />
        {/* Hairline graticule, solid — a dashed grid reads as a threshold. */}
        {[-60, -30, 0, 30, 60].map((lat) => (
          <line key={`h${lat}`} x1={0} x2={W} y1={y(lat)} y2={y(lat)} stroke={RULE} strokeWidth={1} />
        ))}
        {[-120, -60, 0, 60, 120].map((lng) => (
          <line key={`v${lng}`} y1={0} y2={H} x1={x(lng)} x2={x(lng)} stroke={RULE} strokeWidth={1} />
        ))}
        <line x1={0} x2={W} y1={y(0)} y2={y(0)} stroke="rgba(0,0,0,0.14)" strokeWidth={1} />

        {points.map((p) => (
          <g key={p.code}>
            <circle
              cx={x(p.lng)}
              cy={y(p.lat)}
              r={r(p.visits)}
              fill={colour}
              fillOpacity={0.22}
              stroke={colour}
              strokeWidth={1.5}
            >
              {/* Native tooltip: interaction without shipping JavaScript. */}
              <title>{`${p.code} — ${p.visits} visit${p.visits === 1 ? "" : "s"}`}</title>
            </circle>
            {/* Only label where the bubble can actually hold it. */}
            {r(p.visits) > 11 ? (
              <text
                x={x(p.lng)}
                y={y(p.lat) + 4}
                textAnchor="middle"
                className="font-mono"
                fontSize={10}
                fill="#0b0b0b"
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
export function Stat({
  label,
  value,
  sub,
  accent = 0,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: number;
}) {
  return (
    <div
      className="rounded-xl border border-black/[0.06] p-4"
      style={{ backgroundColor: tint(accent) }}
    >
      <p className={eyebrow}>{label}</p>
      {/* Proportional figures: tabular-nums makes a large standalone number look
          loose, and this one does not align with anything. */}
      <p className="font-manrope text-[26px] tracking-tight text-[#0b0b0b] mt-1.5">{value}</p>
      {sub ? <p className="font-manrope text-[11px] text-black/40 mt-0.5">{sub}</p> : null}
    </div>
  );
}
