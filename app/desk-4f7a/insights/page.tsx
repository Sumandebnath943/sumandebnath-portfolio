import type { Metadata } from "next";
import Link from "next/link";
import {
  countryMap,
  longestSessions,
  overview,
  topIps,
  topLocations,
  topNetworks,
  topPages,
} from "@/lib/db";
import { BarList, Empty, Panel, Stat, WorldMap } from "../Charts";
import { dur } from "../format";

export const metadata: Metadata = {
  title: { absolute: "Insights" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ bots?: string }>;
}) {
  const { bots } = await searchParams;
  const showBots = bots === "1";
  const humansOnly = !showBots;

  const [stats, map, pages, locations, networks, ips, longest] = await Promise.all([
    overview(humansOnly),
    countryMap(humansOnly),
    topPages(humansOnly),
    topLocations(humansOnly),
    topNetworks(humansOnly),
    topIps(humansOnly),
    longestSessions(humansOnly),
  ]);

  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-white/35 uppercase mb-2">
              Dashboard
            </p>
            <h1 className="font-manrope text-2xl tracking-tight">Insights</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/desk-4f7a"
              className="rounded-lg border border-white/[0.12] px-3 py-2 font-manrope text-[12px] text-white/70 hover:text-white hover:border-white/30 transition-colors"
            >
              ← Visitors
            </Link>
            <Link
              href={showBots ? "/desk-4f7a/insights" : "/desk-4f7a/insights?bots=1"}
              className="rounded-lg border border-white/[0.12] px-3 py-2 font-manrope text-[12px] text-white/70 hover:text-white hover:border-white/30 transition-colors"
            >
              {showBots ? "Exclude bots" : "Include bots"}
            </Link>
          </div>
        </header>

        <p className="font-manrope text-[13px] text-white/40 mb-5">
          {showBots
            ? "Counting every visit, automated traffic included."
            : "Automated traffic excluded — one scraper would otherwise top every chart."}
        </p>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-4">
          <Stat label="Visits" value={String(stats.visits)} sub={showBots ? "all traffic" : "people"} />
          <Stat label="Countries" value={String(stats.countries)} />
          <Stat
            label="Typical visit"
            value={stats.medianMs === null ? "—" : dur(stats.medianMs)}
            sub="median, not mean"
          />
          <Stat
            label="Bounced"
            value={stats.bounceRate === null ? "—" : `${Math.round(stats.bounceRate * 100)}%`}
            sub="one page, under 10s"
          />
        </div>

        <div className="mb-4">
          <Panel
            title="Where they are"
            hint="Positioned from the city your visitor's network resolves to — accurate to a city, never to a person."
          >
            <WorldMap points={map} />
          </Panel>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Most read pages" hint="Counted once per visit, not per reload.">
            <BarList data={pages} />
          </Panel>

          <Panel title="Longest visits">
            {longest.length ? (
              <BarList data={longest} format={(n) => dur(n)} />
            ) : (
              <Empty>Nothing recorded yet.</Empty>
            )}
          </Panel>

          <Panel title="Top locations">
            <BarList data={locations} />
          </Panel>

          <Panel title="Networks and providers" hint="Sub-count is distinct addresses seen on that network.">
            <BarList data={networks} />
          </Panel>

          <Panel
            title="Returning addresses"
            hint="Only addresses seen more than once. IPs are deleted after 90 days, so this window is short by design."
          >
            {ips.length ? <BarList data={ips} /> : <Empty>No address has visited twice yet.</Empty>}
          </Panel>

          <Panel title="Returning visitors">
            <div className="py-2">
              <p className="font-manrope text-[26px] tracking-tight text-white">
                {stats.returning}
              </p>
              <p className="font-manrope text-[12px] text-white/40 mt-1">
                {stats.visits > 0
                  ? `${Math.round((stats.returning / stats.visits) * 100)}% of visits were someone coming back`
                  : "No visits yet"}
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}
