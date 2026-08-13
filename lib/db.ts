import { neon } from "@neondatabase/serverless";

// One row per visit, written on arrival and rewritten as the visit unfolds —
// the same shape as the Telegram journey card, for the same reason: a reload
// and a departure are indistinguishable, so the record has to be correctable
// rather than final.
//
// Every function here is deliberately failure-tolerant. Visitor tracking worked
// for months with no database at all, and it must keep working if this one is
// unreachable: callers get `false`, never an exception.

export type VisitRecord = {
  id: string;
  endedAt?: Date | null;
  totalMs?: number | null;
  activeMs?: number | null;
  pageCount?: number | null;
  paths?: string[];

  ip?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  postal?: string | null;
  asn?: number | null;
  network?: string | null;
  timezone?: string | null;
  languages?: string | null;

  userAgent?: string | null;
  device?: string | null;
  screen?: string | null;
  cores?: number | null;
  webdriver?: boolean | null;

  botVerdict?: string | null;
  interacted?: boolean | null;

  entryPath?: string | null;
  source?: string | null;
  referrer?: string | null;
  tag?: string | null;

  visitNumber?: number | null;
  daysSince?: number | null;

  tgArrivalMid?: number | null;
  tgCardMid?: number | null;
};

export type VisitPage = { path: string; ms?: number | null; scroll?: number | null };
export type VisitAction = { action?: string | null; label?: string | null };

function client() {
  const url = process.env.DATABASE_URL;
  if (!url) return null; // unconfigured is a normal state, not an error
  try {
    return neon(url);
  } catch {
    return null;
  }
}

export function dbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export type DbHealth =
  | { ok: true; visits: number }
  | { ok: false; reason: "unconfigured" | "unreachable" | "no-schema"; detail?: string };

/**
 * Actually ask the database, rather than checking that a variable exists.
 *
 * The distinction matters: a connection string can be present and correct while
 * the schema has never been created, in which case every visit is silently
 * dropped. A status light that only reads the env var would call that healthy.
 */
export async function dbHealth(): Promise<DbHealth> {
  const sql = client();
  if (!sql) return { ok: false, reason: "unconfigured" };
  try {
    const [t] = await sql`select to_regclass('public.visits') is not null as present`;
    if (!t?.present) return { ok: false, reason: "no-schema" };
    const [c] = await sql`select count(*)::int as n from visits`;
    return { ok: true, visits: c?.n ?? 0 };
  } catch (e) {
    return { ok: false, reason: "unreachable", detail: (e as Error)?.message?.slice(0, 120) };
  }
}

// Empty string is not a value — the tracker uses "" for "not known", and
// writing that over a field a previous request filled in would lose data.
function nil<T>(v: T | undefined | null | ""): T | null {
  return v === undefined || v === null || v === "" ? null : (v as T);
}

/**
 * Insert or update the visit. Existing values survive a later write that does
 * not know them: `coalesce(excluded.x, visits.x)` keeps whichever side has
 * something to say, so an arrival's geo is not wiped by a summary that carries
 * only timings.
 */
export async function saveVisit(v: VisitRecord): Promise<boolean> {
  const sql = client();
  if (!sql || !v.id) return false;
  try {
    await sql`
      insert into visits (
        id, last_seen_at, ended_at, total_ms, active_ms, page_count, paths,
        ip, country, region, city, postal, asn, network, timezone, languages,
        user_agent, device, screen, cores, webdriver, bot_verdict, interacted,
        entry_path, source, referrer, tag, visit_number, days_since,
        tg_arrival_mid, tg_card_mid
      ) values (
        ${v.id}, now(), ${nil(v.endedAt)}, ${nil(v.totalMs)}, ${nil(v.activeMs)},
        ${nil(v.pageCount)}, ${JSON.stringify(v.paths ?? [])}::jsonb,
        ${nil(v.ip)}, ${nil(v.country)}, ${nil(v.region)}, ${nil(v.city)},
        ${nil(v.postal)}, ${nil(v.asn)}, ${nil(v.network)}, ${nil(v.timezone)},
        ${nil(v.languages)},
        ${nil(v.userAgent)}, ${nil(v.device)}, ${nil(v.screen)}, ${nil(v.cores)},
        ${nil(v.webdriver)}, ${nil(v.botVerdict)}, ${nil(v.interacted)},
        ${nil(v.entryPath)}, ${nil(v.source)}, ${nil(v.referrer)}, ${nil(v.tag)},
        ${nil(v.visitNumber)}, ${nil(v.daysSince)},
        ${nil(v.tgArrivalMid)}, ${nil(v.tgCardMid)}
      )
      on conflict (id) do update set
        last_seen_at   = now(),
        ended_at       = coalesce(excluded.ended_at,      visits.ended_at),
        total_ms       = coalesce(excluded.total_ms,      visits.total_ms),
        active_ms      = coalesce(excluded.active_ms,     visits.active_ms),
        page_count     = coalesce(excluded.page_count,    visits.page_count),
        -- The journey only ever grows, so the longer list is the truer one.
        paths          = case
                           when jsonb_array_length(excluded.paths)
                                >= jsonb_array_length(visits.paths)
                           then excluded.paths else visits.paths end,
        ip             = coalesce(excluded.ip,            visits.ip),
        country        = coalesce(excluded.country,       visits.country),
        region         = coalesce(excluded.region,        visits.region),
        city           = coalesce(excluded.city,          visits.city),
        postal         = coalesce(excluded.postal,        visits.postal),
        asn            = coalesce(excluded.asn,           visits.asn),
        network        = coalesce(excluded.network,       visits.network),
        timezone       = coalesce(excluded.timezone,      visits.timezone),
        languages      = coalesce(excluded.languages,     visits.languages),
        user_agent     = coalesce(excluded.user_agent,    visits.user_agent),
        device         = coalesce(excluded.device,        visits.device),
        screen         = coalesce(excluded.screen,        visits.screen),
        cores          = coalesce(excluded.cores,         visits.cores),
        webdriver      = coalesce(excluded.webdriver,     visits.webdriver),
        bot_verdict    = coalesce(excluded.bot_verdict,   visits.bot_verdict),
        interacted     = coalesce(excluded.interacted,    visits.interacted),
        entry_path     = coalesce(visits.entry_path,      excluded.entry_path),
        source         = coalesce(visits.source,          excluded.source),
        referrer       = coalesce(visits.referrer,        excluded.referrer),
        tag            = coalesce(excluded.tag,           visits.tag),
        visit_number   = coalesce(excluded.visit_number,  visits.visit_number),
        days_since     = coalesce(excluded.days_since,    visits.days_since),
        tg_arrival_mid = coalesce(visits.tg_arrival_mid,  excluded.tg_arrival_mid),
        tg_card_mid    = coalesce(visits.tg_card_mid,     excluded.tg_card_mid)
    `;
    return true;
  } catch {
    return false;
  }
}

/**
 * Replace the visit's page list. The journey is cumulative and rewritten in
 * full on each update, so replacing beats trying to diff it.
 */
export async function saveVisitPages(id: string, pages: VisitPage[]): Promise<boolean> {
  const sql = client();
  if (!sql || !id || pages.length === 0) return false;
  try {
    await sql`delete from visit_pages where visit_id = ${id}`;
    for (const [i, p] of pages.slice(0, 100).entries()) {
      await sql`
        insert into visit_pages (visit_id, seq, path, ms, scroll)
        values (${id}, ${i}, ${String(p.path || "").slice(0, 300)},
                ${nil(p.ms)}, ${nil(p.scroll)})
        on conflict (visit_id, seq) do nothing
      `;
    }
    return true;
  } catch {
    return false;
  }
}

// --- reading, for the dashboard -------------------------------------------

export type VisitRow = {
  id: string;
  started_at: Date;
  ended_at: Date | null;
  total_ms: number | null;
  active_ms: number | null;
  page_count: number | null;
  paths: string[];
  ip: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  postal: string | null;
  asn: number | null;
  network: string | null;
  timezone: string | null;
  languages: string | null;
  user_agent: string | null;
  device: string | null;
  screen: string | null;
  cores: number | null;
  webdriver: boolean | null;
  bot_verdict: string | null;
  interacted: boolean | null;
  entry_path: string | null;
  source: string | null;
  referrer: string | null;
  tag: string | null;
  visit_number: number | null;
  days_since: number | null;
};

export type VisitDetail = {
  visit: VisitRow;
  pages: { seq: number; path: string; ms: number | null; scroll: number | null }[];
  actions: { seq: number; action: string | null; label: string | null }[];
};

/**
 * Newest first. `humansOnly` drops visits the classifier was confident about —
 * without it the table fills with scrapers and the real readers get lost, which
 * makes it a usability control rather than a nicety.
 */
export async function listVisits(opts: { limit?: number; humansOnly?: boolean } = {}): Promise<VisitRow[]> {
  const sql = client();
  if (!sql) return [];
  const limit = Math.min(Math.max(opts.limit ?? 100, 1), 500);
  try {
    const rows = opts.humansOnly
      ? await sql`
          select * from visits
          where bot_verdict is distinct from 'automated'
          order by started_at desc limit ${limit}
        `
      : await sql`select * from visits order by started_at desc limit ${limit}`;
    return rows as VisitRow[];
  } catch {
    return [];
  }
}

/** Counts for the header, so the effect of the bot filter is visible. */
export async function visitCounts(): Promise<{ total: number; automated: number }> {
  const sql = client();
  if (!sql) return { total: 0, automated: 0 };
  try {
    const [r] = await sql`
      select count(*)::int as total,
             count(*) filter (where bot_verdict = 'automated')::int as automated
      from visits
    `;
    return { total: r?.total ?? 0, automated: r?.automated ?? 0 };
  } catch {
    return { total: 0, automated: 0 };
  }
}

export async function getVisit(id: string): Promise<VisitDetail | null> {
  const sql = client();
  if (!sql || !id) return null;
  try {
    const [visit] = await sql`select * from visits where id = ${id}`;
    if (!visit) return null;
    const pages = await sql`
      select seq, path, ms, scroll from visit_pages where visit_id = ${id} order by seq
    `;
    const actions = await sql`
      select seq, action, label from visit_actions where visit_id = ${id} order by seq
    `;
    return {
      visit: visit as VisitRow,
      pages: pages as VisitDetail["pages"],
      actions: actions as VisitDetail["actions"],
    };
  } catch {
    return null;
  }
}

export async function saveVisitActions(id: string, actions: VisitAction[]): Promise<boolean> {
  const sql = client();
  if (!sql || !id || actions.length === 0) return false;
  try {
    await sql`delete from visit_actions where visit_id = ${id}`;
    for (const [i, a] of actions.slice(0, 40).entries()) {
      await sql`
        insert into visit_actions (visit_id, seq, action, label)
        values (${id}, ${i}, ${nil(a.action)}, ${nil(a.label)})
        on conflict (visit_id, seq) do nothing
      `;
    }
    return true;
  } catch {
    return false;
  }
}
