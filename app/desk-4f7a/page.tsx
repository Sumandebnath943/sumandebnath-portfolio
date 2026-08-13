import type { Metadata } from "next";
import Link from "next/link";
import {
  IP_RETENTION_DAYS,
  VISIT_RETENTION_DAYS,
  countVisits,
  dbHealth,
  filterOptions,
  listVisits,
  retentionStatus,
  visitCounts,
} from "@/lib/db";
import Filters, { type ActiveFilters } from "./Filters";
import { dayAfter, dayStart, dur, focus, place, verdictTone, when } from "./format";

export const metadata: Metadata = {
  title: { absolute: "Visitors" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<ActiveFilters>;
}) {
  const sp = await searchParams;
  // Bots hidden unless asked for: left in, they outnumber the readers and the
  // table stops being worth opening.
  const showBots = sp.bots === "1";

  const filters = {
    humansOnly: !showBots,
    // Dates arrive as YYYY-MM-DD and mean days in the owner's timezone, so they
    // are widened to real instants before they reach SQL.
    from: sp.from ? dayStart(sp.from) : undefined,
    to: sp.to ? dayAfter(sp.to) : undefined,
    country: sp.country || undefined,
    path: sp.path || undefined,
    action: sp.action || undefined,
    source: sp.source || undefined,
    limit: 200,
  };

  const [health, counts, visits, matched, options, retention] = await Promise.all([
    dbHealth(),
    visitCounts(),
    listVisits(filters),
    countVisits(filters),
    filterOptions(),
    retentionStatus(),
  ]);

  const narrowed = Boolean(sp.from || sp.to || sp.country || sp.path || sp.action || sp.source);

  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-white/35 uppercase mb-2">
              Dashboard
            </p>
            <h1 className="font-manrope text-2xl tracking-tight">Visitors</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              // Keeps every other filter in place while toggling bots, so the
              // view you built is not thrown away to answer one question.
              href={(() => {
                const p = new URLSearchParams();
                for (const [k, v] of Object.entries(sp)) if (v && k !== "bots") p.set(k, String(v));
                if (!showBots) p.set("bots", "1");
                const q = p.toString();
                return q ? `/desk-4f7a?${q}` : "/desk-4f7a";
              })()}
              className="rounded-lg border border-white/[0.12] px-3 py-2 font-manrope text-[12px] text-white/70 hover:text-white hover:border-white/30 transition-colors"
            >
              {showBots ? "Hide bots" : `Show bots (${counts.automated})`}
            </Link>
            <form action="/desk-4f7a/logout" method="post">
              <button
                type="submit"
                className="rounded-lg border border-white/[0.12] px-3 py-2 font-manrope text-[12px] text-white/70 hover:text-white hover:border-white/30 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <p className="font-manrope text-[13px] text-white/45 mb-4">
          {health.ok ? (
            <>
              {counts.total - counts.automated} real {counts.total - counts.automated === 1 ? "visit" : "visits"}
              {counts.automated > 0 ? ` · ${counts.automated} automated${showBots ? " shown" : " hidden"}` : ""}
              {visits.length < matched ? ` · showing newest ${visits.length} of ${matched}` : ""}
            </>
          ) : health.reason === "no-schema" ? (
            <span className="text-amber-400/90">
              No tables yet — run the migration against this environment.
            </span>
          ) : (
            <span className="text-red-400/80">Storage {health.reason}.</span>
          )}
        </p>

        {health.ok ? <Filters active={sp} options={options} matched={matched} /> : null}

        {visits.length === 0 ? (
          <div className="border border-white/[0.08] rounded-xl p-10 text-center">
            <p className="font-manrope text-[15px] text-white/55">
              {!health.ok
                ? "Nothing to show until storage is working."
                : narrowed
                  ? "No visits match these filters."
                  : showBots
                    ? "Nothing recorded yet."
                    : "No human visits yet."}
            </p>
            <p className="font-manrope text-[13px] text-white/35 mt-2">
              {narrowed
                ? "Widen the range, or clear the filters."
                : "Recording starts from now — there is no history before the database existed."}
            </p>
          </div>
        ) : (
          // Horizontal scroll lives on the wrapper, so the page itself never
          // scrolls sideways on a narrow screen.
          <div className="overflow-x-auto border border-white/[0.08] rounded-xl">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.08] font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                  <th className="px-3 py-3 font-normal whitespace-nowrap">Arrived</th>
                  <th className="px-3 py-3 font-normal whitespace-nowrap">Left</th>
                  <th className="px-3 py-3 font-normal whitespace-nowrap">Stayed</th>
                  <th className="px-3 py-3 font-normal whitespace-nowrap">Active</th>
                  <th className="px-3 py-3 font-normal whitespace-nowrap">Pages</th>
                  <th className="px-3 py-3 font-normal">Location</th>
                  <th className="px-3 py-3 font-normal">Network</th>
                  <th className="px-3 py-3 font-normal whitespace-nowrap">Source</th>
                  <th className="px-3 py-3 font-normal whitespace-nowrap">Device</th>
                  <th className="px-3 py-3 font-normal whitespace-nowrap">Read</th>
                  <th className="px-3 py-3 font-normal" />
                </tr>
              </thead>
              <tbody className="font-manrope text-[13px]">
                {visits.map((v) => {
                  const verdict = verdictTone(v.bot_verdict);
                  return (
                    <tr
                      key={v.id}
                      className="group border-b border-white/[0.05] last:border-0 hover:bg-white/[0.04] transition-colors"
                    >
                      <td className="px-3 py-3 whitespace-nowrap">
                        <Link href={`/desk-4f7a/v/${encodeURIComponent(v.id)}`} className="hover:underline">
                          {when(v.started_at)}
                        </Link>
                        <span className="block font-mono text-[10px] text-white/30">{v.id}</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-white/60">
                        {v.ended_at ? when(v.ended_at) : <span className="text-emerald-400/60">still here</span>}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">{dur(v.total_ms)}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-white/60">
                        {dur(v.active_ms)}
                        <span className="text-white/25"> · {focus(v.total_ms, v.active_ms)}</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {v.page_count ?? 0}
                        {v.visit_number && v.visit_number > 1 ? (
                          <span className="ml-2 rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[10px] text-white/50">
                            #{v.visit_number}
                          </span>
                        ) : null}
                      </td>
                      <td className="px-3 py-3 text-white/70">{place(v)}</td>
                      <td className="px-3 py-3 text-white/50 max-w-[220px] truncate" title={v.network || ""}>
                        {v.network || "—"}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-white/60">
                        {v.source || "—"}
                        {v.tag ? (
                          <span className="ml-2 rounded bg-amber-400/10 px-1.5 py-0.5 font-mono text-[10px] text-amber-300/80">
                            {v.tag}
                          </span>
                        ) : null}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-white/50">{v.device || "—"}</td>
                      <td className={`px-3 py-3 whitespace-nowrap font-mono text-[11px] ${verdict.className}`}>
                        {verdict.label}
                      </td>
                      {/* An explicit way in. The timestamp is also a link, but a
                          link that looks like a timestamp is one nobody finds. */}
                      <td className="px-3 py-3 whitespace-nowrap text-right">
                        <Link
                          href={`/desk-4f7a/v/${encodeURIComponent(v.id)}`}
                          className="rounded-md border border-white/[0.12] px-2.5 py-1 font-manrope text-[11px] text-white/55 group-hover:text-white group-hover:border-white/30 transition-colors"
                        >
                          Detail →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* The retention promise on /privacy is only worth as much as its
            enforcement, so show what the purge job has left to do. */}
        {health.ok ? (
          <p className="mt-5 font-manrope text-[12px] text-white/30 leading-[1.7]">
            IP addresses removed after {IP_RETENTION_DAYS} days · visits deleted after{" "}
            {VISIT_RETENTION_DAYS} days · purged daily
            {retention.oldestDays !== null ? ` · oldest record ${retention.oldestDays}d old` : ""}
            {retention.withIp > 0 ? ` · ${retention.withIp} still hold an IP` : ""}
          </p>
        ) : null}
      </div>
    </main>
  );
}
