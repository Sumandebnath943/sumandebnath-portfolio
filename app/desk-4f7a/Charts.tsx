import type { Ranked } from "@/lib/db";
import { TRACK, card, eyebrow, hue, tint } from "./theme";

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
      {hint ? <p className="font-manrope text-[11px] text-[#6b6a66] mt-1.5">{hint}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="font-manrope text-[13px] text-[#6b6a66] py-6 text-center">{children}</p>;
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
              <span className="font-manrope text-[13px] text-[#0b0b0b] truncate" title={d.label}>
                {d.label}
                {d.sub ? <span className="text-[#6b6a66]"> · {d.sub}</span> : null}
              </span>
              {/* tabular-nums here because these do align vertically. */}
              <span className="font-mono text-[11px] text-[#52514e] tabular-nums shrink-0">
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

// Both come from the platform rather than a data file: Intl knows every region
// name, and a flag is just its two letters as regional-indicator codepoints.
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function countryName(code: string): string {
  try {
    return regionNames.of(code.toUpperCase()) || code;
  } catch {
    return code;
  }
}

function flagOf(code: string): string {
  if (!/^[a-z]{2}$/i.test(code)) return "🏳️";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map((c) => 0x1f1a5 + c.charCodeAt(0)),
  );
}

/**
 * Visits by country: flag, name, share, and the cities behind each one.
 *
 * This replaced a bubble map. Coordinates plotted on a bare graticule read as a
 * broken map rather than a deliberate one, and the honest fix — real coastlines
 * — needs outline data rather than a guess at where the continents go. A ranked
 * country list carries the same answer, is legible at two countries or twenty,
 * and never implies precision it does not have.
 */
export function CountryList({
  rows,
  accent = 0,
}: {
  rows: { code: string; visits: number; cities: string[] }[];
  accent?: number;
}) {
  if (!rows.length) return <Empty>No located visits yet.</Empty>;

  const total = rows.reduce((n, r) => n + r.visits, 0) || 1;
  const most = Math.max(...rows.map((r) => r.visits), 1);
  const colour = hue(accent);

  return (
    <ul className="space-y-4">
      {rows.map((r) => {
        const share = Math.round((r.visits / total) * 100);
        return (
          <li key={r.code} className="flex items-start gap-3">
            <span className="text-[26px] leading-none shrink-0 mt-0.5" aria-hidden>
              {flagOf(r.code)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-manrope text-[14px] text-[#0b0b0b] truncate">
                  {countryName(r.code)}
                </span>
                <span className="font-mono text-[11px] text-[#52514e] tabular-nums shrink-0">
                  {r.visits} · {share}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden mt-1.5"
                style={{ backgroundColor: TRACK }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.max(2, (r.visits / most) * 100)}%`, backgroundColor: colour }}
                />
              </div>
              {r.cities.length ? (
                <p className="font-manrope text-[11.5px] text-[#6b6a66] mt-1.5 truncate">
                  {r.cities.slice(0, 6).join(" · ")}
                  {r.cities.length > 6 ? ` +${r.cities.length - 6}` : ""}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
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
      {sub ? <p className="font-manrope text-[11px] text-[#6b6a66] mt-0.5">{sub}</p> : null}
    </div>
  );
}
