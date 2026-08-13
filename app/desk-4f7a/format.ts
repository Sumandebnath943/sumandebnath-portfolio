// Display helpers for the dashboard. Kept together so the table and the detail
// page can never disagree about how a duration or a timestamp reads.

// Times are rendered in the owner's timezone, not the server's. A dashboard
// that reports visits in UTC forces mental arithmetic on every row.
const TZ = "Asia/Kolkata";

export function when(d: Date | string | null): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function clock(d: Date | string | null): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

/** Compact durations: 45s, 3m 20s, 1h 04m. */
export function dur(ms: number | null): string {
  if (ms === null || ms === undefined || ms < 0) return "—";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${String(s % 60).padStart(2, "0")}s`;
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;
}

export function place(v: {
  city: string | null;
  region: string | null;
  country: string | null;
  postal: string | null;
}): string {
  const parts = [v.city, v.region, v.country].filter(Boolean);
  if (!parts.length) return "Unknown";
  return v.postal ? `${parts.join(", ")} · ${v.postal}` : parts.join(", ");
}

/**
 * Three-way, matching the notifier: a confident "automated" is worth hiding,
 * but "unclear" stays visible — a wrong bot call costs a real reader, while a
 * wrong human call costs one row in a table.
 */
export function verdictTone(v: string | null): { label: string; className: string } {
  if (v === "automated") return { label: "bot", className: "text-white/30" };
  if (v === "unclear") return { label: "unclear", className: "text-amber-400/70" };
  if (v === "human") return { label: "human", className: "text-emerald-400/75" };
  return { label: "—", className: "text-white/25" };
}

/** Percentage of wall-clock time the tab was actually visible. */
export function focus(total: number | null, active: number | null): string {
  if (!total || active === null || active === undefined) return "—";
  return `${Math.min(100, Math.round((active / total) * 100))}%`;
}
