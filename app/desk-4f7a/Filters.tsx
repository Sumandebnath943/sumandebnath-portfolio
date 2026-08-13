import Link from "next/link";
import { daysAgo } from "./format";

export type ActiveFilters = {
  from?: string;
  to?: string;
  country?: string;
  path?: string;
  action?: string;
  source?: string;
  bots?: string;
};

type Options = { countries: string[]; paths: string[]; actions: string[]; sources: string[] };

const field =
  "w-full rounded-lg border border-black/[0.12] bg-white px-3 py-2 font-manrope text-[13px] text-[#0b0b0b] outline-none focus:border-black/40 transition-colors";
const label = "block font-mono text-[11px] uppercase tracking-[0.12em] text-[#6b6a66] mb-1.5";

function Select({
  name,
  title,
  value,
  options,
  anyLabel,
}: {
  name: string;
  title: string;
  value?: string;
  options: string[];
  anyLabel: string;
}) {
  return (
    <label className="block">
      <span className={label}>{title}</span>
      <select name={name} defaultValue={value || ""} className={field}>
        <option value="">{anyLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/**
 * A plain GET form. Submitting writes the filters into the URL, which means
 * every view is bookmarkable and shareable with yourself, the back button works,
 * and none of this needs client-side JavaScript.
 */
export default function Filters({
  active,
  options,
  matched,
}: {
  active: ActiveFilters;
  options: Options;
  matched: number;
}) {
  const applied = Object.entries(active).filter(([k, v]) => v && k !== "bots").length;
  const range = (days: number) => {
    const p = new URLSearchParams();
    p.set("from", daysAgo(days));
    if (active.bots) p.set("bots", active.bots);
    return `/desk-4f7a?${p}`;
  };

  return (
    <form method="get" action="/desk-4f7a" className="bg-white border border-black/[0.07] rounded-xl p-4 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Carried through the form so narrowing by date does not silently
          re-hide the bots you had chosen to see. */}
      {active.bots ? <input type="hidden" name="bots" value={active.bots} /> : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <label className="block">
          <span className={label}>From</span>
          <input type="date" name="from" defaultValue={active.from || ""} className={field} />
        </label>
        <label className="block">
          <span className={label}>To</span>
          <input type="date" name="to" defaultValue={active.to || ""} className={field} />
        </label>
        <Select name="country" title="Country" value={active.country} options={options.countries} anyLabel="Anywhere" />
        <Select name="path" title="Page seen" value={active.path} options={options.paths} anyLabel="Any page" />
        <Select name="action" title="Action" value={active.action} options={options.actions} anyLabel="Any action" />
        <Select name="source" title="Source" value={active.source} options={options.sources} anyLabel="Any source" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-[#0b0b0b] px-4 py-2 font-manrope text-[13px] font-medium text-white hover:bg-[#0b0b0b]/90 transition-colors"
        >
          Apply
        </button>

        <span className="font-manrope text-[12px] text-[#6b6a66]">
          {matched} {matched === 1 ? "match" : "matches"}
        </span>

        <span className="flex-1" />

        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6b6a66]">Quick</span>
        <Link href={range(1)} className="font-manrope text-[12px] text-[#52514e] hover:text-[#0b0b0b] transition-colors">
          24h
        </Link>
        <Link href={range(7)} className="font-manrope text-[12px] text-[#52514e] hover:text-[#0b0b0b] transition-colors">
          7d
        </Link>
        <Link href={range(30)} className="font-manrope text-[12px] text-[#52514e] hover:text-[#0b0b0b] transition-colors">
          30d
        </Link>
        {applied > 0 ? (
          <Link
            href={active.bots ? `/desk-4f7a?bots=${active.bots}` : "/desk-4f7a"}
            className="font-manrope text-[12px] text-amber-700 hover:text-amber-800 transition-colors"
          >
            Clear {applied}
          </Link>
        ) : null}
      </div>
    </form>
  );
}
