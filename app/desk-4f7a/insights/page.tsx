import type { Metadata } from "next";
import Link from "next/link";
import {
  countryBreakdown,
  longestSessions,
  overview,
  topIps,
  topLocations,
  topNetworks,
  topPages,
} from "@/lib/db";
import { BarList, CountryList, Empty, Panel, Stat } from "../Charts";
import { dur } from "../format";
import { body, button, eyebrow, heading, page } from "../theme";

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

  const [stats, countries, pages, locations, networks, ips, longest] = await Promise.all([
    overview(humansOnly),
    countryBreakdown(humansOnly),
    topPages(humansOnly),
    topLocations(humansOnly),
    topNetworks(humansOnly),
    topIps(humansOnly),
    longestSessions(humansOnly),
  ]);

  return (
    <main className={`${page} px-5 py-8`}>
      <div className="max-w-[1200px] mx-auto">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className={`${eyebrow} mb-2`}>Dashboard</p>
            <h1 className={`${heading} text-2xl`}>Insights</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/desk-4f7a" className={button}>
              ← Visitors
            </Link>
            <Link
              href={showBots ? "/desk-4f7a/insights" : "/desk-4f7a/insights?bots=1"}
              className={button}
            >
              {showBots ? "Exclude bots" : "Include bots"}
            </Link>
          </div>
        </header>

        <p className={`${body} text-[13px] mb-5`}>
          {showBots
            ? "Counting every visit, automated traffic included."
            : "Automated traffic excluded — one scraper would otherwise top every chart."}
        </p>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-4">
          <Stat accent={0} label="Visits" value={String(stats.visits)} sub={showBots ? "all traffic" : "people"} />
          <Stat accent={1} label="Countries" value={String(stats.countries)} />
          <Stat
            accent={2}
            label="Typical visit"
            value={stats.medianMs === null ? "—" : dur(stats.medianMs)}
            sub="median, not mean"
          />
          <Stat
            accent={3}
            label="Bounced"
            value={stats.bounceRate === null ? "—" : `${Math.round(stats.bounceRate * 100)}%`}
            sub="one page, under 10s"
          />
        </div>

        <div className="mb-4">
          <Panel
            accent={0}
            title="Where they are"
            hint="Grouped by country, with the cities each visit resolved to. Location comes from the network, so it is accurate to a city and never to a person."
          >
            <CountryList rows={countries} accent={0} />
          </Panel>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent={1} title="Most read pages" hint="Counted once per visit, not per reload.">
            <BarList data={pages} accent={1} />
          </Panel>

          <Panel accent={2} title="Longest visits">
            {longest.length ? (
              <BarList data={longest} accent={2} format={(n) => dur(n)} />
            ) : (
              <Empty>Nothing recorded yet.</Empty>
            )}
          </Panel>

          <Panel accent={3} title="Top locations">
            <BarList data={locations} accent={3} />
          </Panel>

          <Panel
            accent={0}
            title="Networks and providers"
            hint="Sub-count is distinct addresses seen on that network."
          >
            <BarList data={networks} accent={0} />
          </Panel>

          <Panel
            accent={1}
            title="Returning addresses"
            hint="Only addresses seen more than once. IPs are deleted after 90 days, so this window is short by design."
          >
            {ips.length ? <BarList data={ips} accent={1} /> : <Empty>No address has visited twice yet.</Empty>}
          </Panel>

          <Panel accent={2} title="Returning visitors">
            <div className="py-2">
              <p className={`${heading} text-[26px]`}>{stats.returning}</p>
              <p className="font-manrope text-[12px] text-[#52514e] mt-1">
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
