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

  // Added later. Mostly things the notifier already worked out and discarded.
  exitPath?: string | null;
  maxScroll?: number | null;
  browser?: string | null;
  os?: string | null;
  deviceType?: string | null;
  referrerHost?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  botReason?: string | null;
  actionCount?: number | null;
  isBounce?: boolean | null;
  viewport?: string | null;
  lat?: number | null;
  lng?: number | null;
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
  | {
      ok: false;
      reason: "unconfigured" | "unreachable" | "no-schema" | "schema-behind";
      detail?: string;
      missing?: string[];
    };

// Columns saveVisit writes to. If the code is deployed ahead of the migration,
// every insert fails on the missing column and the error is swallowed — the
// dashboard would go on showing yesterday's rows as though nothing were wrong.
// Checking for them turns a silent outage into a visible one.
const REQUIRED_COLUMNS = [
  "exit_path", "max_scroll", "browser", "os", "device_type", "referrer_host",
  "utm_medium", "utm_campaign", "bot_reason", "action_count", "is_bounce",
  "viewport", "lat", "lng",
];

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

    const cols = await sql`
      select column_name from information_schema.columns where table_name = 'visits'
    `;
    const have = new Set((cols as { column_name: string }[]).map((c) => c.column_name));
    const missing = REQUIRED_COLUMNS.filter((c) => !have.has(c));
    if (missing.length) return { ok: false, reason: "schema-behind", missing };

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
        tg_arrival_mid, tg_card_mid,
        exit_path, max_scroll, browser, os, device_type, referrer_host,
        utm_medium, utm_campaign, bot_reason, action_count, is_bounce,
        viewport, lat, lng
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
        ${nil(v.tgArrivalMid)}, ${nil(v.tgCardMid)},
        ${nil(v.exitPath)}, ${nil(v.maxScroll)}, ${nil(v.browser)}, ${nil(v.os)},
        ${nil(v.deviceType)}, ${nil(v.referrerHost)}, ${nil(v.utmMedium)},
        ${nil(v.utmCampaign)}, ${nil(v.botReason)}, ${nil(v.actionCount)},
        ${nil(v.isBounce)}, ${nil(v.viewport)}, ${nil(v.lat)}, ${nil(v.lng)}
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
        -- Interaction only ever goes false -> true. Writes for one visit land
        -- out of order (each runs in its own after() call, so an arrival settles
        -- after the summary that followed it), and plain coalesce let a stale
        -- "no interaction" overwrite a scroll that had already happened.
        interacted     = coalesce(visits.interacted, false)
                         or coalesce(excluded.interacted, false),
        -- Somebody who scrolled is not a link checker, whatever network they
        -- came from. Without this the same race filed a recruiter behind a
        -- corporate proxy as a scanner — the one visitor least worth losing.
        bot_verdict    = case
                           when (coalesce(visits.interacted, false)
                                 or coalesce(excluded.interacted, false))
                                and coalesce(excluded.bot_verdict, visits.bot_verdict) = 'scanner'
                           then 'human'
                           else coalesce(excluded.bot_verdict, visits.bot_verdict)
                         end,
        entry_path     = coalesce(visits.entry_path,      excluded.entry_path),
        source         = coalesce(visits.source,          excluded.source),
        referrer       = coalesce(visits.referrer,        excluded.referrer),
        tag            = coalesce(excluded.tag,           visits.tag),
        visit_number   = coalesce(excluded.visit_number,  visits.visit_number),
        days_since     = coalesce(excluded.days_since,    visits.days_since),
        tg_arrival_mid = coalesce(visits.tg_arrival_mid,  excluded.tg_arrival_mid),
        tg_card_mid    = coalesce(visits.tg_card_mid,     excluded.tg_card_mid),
        -- The exit page moves as the visit goes, so the newest write wins.
        exit_path      = coalesce(excluded.exit_path,     visits.exit_path),
        -- Scroll depth and action count only ever climb.
        max_scroll     = greatest(coalesce(excluded.max_scroll, 0),
                                  coalesce(visits.max_scroll, 0)),
        action_count   = greatest(coalesce(excluded.action_count, 0),
                                  coalesce(visits.action_count, 0)),
        browser        = coalesce(excluded.browser,       visits.browser),
        os             = coalesce(excluded.os,            visits.os),
        device_type    = coalesce(excluded.device_type,   visits.device_type),
        referrer_host  = coalesce(visits.referrer_host,   excluded.referrer_host),
        utm_medium     = coalesce(visits.utm_medium,      excluded.utm_medium),
        utm_campaign   = coalesce(visits.utm_campaign,    excluded.utm_campaign),
        bot_reason     = coalesce(excluded.bot_reason,    visits.bot_reason),
        is_bounce      = coalesce(excluded.is_bounce,     visits.is_bounce),
        viewport       = coalesce(excluded.viewport,      visits.viewport),
        lat            = coalesce(visits.lat,             excluded.lat),
        lng            = coalesce(visits.lng,             excluded.lng)
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

// --- retention --------------------------------------------------------------

// After this, the IP is removed but the visit is kept. An IP is the identifying
// part of the record; the journey, country and network are not.
export const IP_RETENTION_DAYS = 90;
// After this, the visit goes entirely.
export const VISIT_RETENTION_DAYS = 365;

/**
 * Enforce the retention promise made on /privacy.
 *
 * Two stages rather than one: the identifying field goes early, the rest stays
 * long enough to be useful. Deliberately idempotent — running it twice a day, or
 * twice in a minute, changes nothing after the first pass.
 */
export async function purgeVisits(): Promise<{
  ok: boolean;
  ipsCleared: number;
  visitsDeleted: number;
  error?: string;
}> {
  const sql = client();
  if (!sql) return { ok: false, ipsCleared: 0, visitsDeleted: 0, error: "no database" };
  try {
    // Deleting first would mean clearing IPs on rows about to be removed.
    const deleted = await sql`
      delete from visits
      where started_at < now() - make_interval(days => ${VISIT_RETENTION_DAYS})
      returning id
    `;
    const cleared = await sql`
      update visits set ip = null
      where ip is not null
        and started_at < now() - make_interval(days => ${IP_RETENTION_DAYS})
      returning id
    `;
    return { ok: true, ipsCleared: cleared.length, visitsDeleted: deleted.length };
  } catch (e) {
    return {
      ok: false,
      ipsCleared: 0,
      visitsDeleted: 0,
      error: (e as Error)?.message?.slice(0, 200),
    };
  }
}

/** What retention has left to do — surfaced on the dashboard so the promise is visible. */
export async function retentionStatus(): Promise<{ withIp: number; oldestDays: number | null }> {
  const sql = client();
  if (!sql) return { withIp: 0, oldestDays: null };
  try {
    const [r] = await sql`
      select
        count(*) filter (where ip is not null)::int as with_ip,
        extract(day from now() - min(started_at))::int as oldest_days
      from visits
    `;
    return { withIp: r?.with_ip ?? 0, oldestDays: r?.oldest_days ?? null };
  } catch {
    return { withIp: 0, oldestDays: null };
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

// Automated traffic, in both its forms: something pretending to be a browser
// ("automated") and something that announced itself as a crawler. Both are
// excluded from "people" views. coalesce() because a null verdict is an
// unknown, and an unknown is not something to hide.
const NOT_HUMAN_EXCLUDED = "coalesce(bot_verdict, '') not in ('automated', 'crawler', 'scanner')";

export type VisitFilters = {
  humansOnly?: boolean;
  from?: string; // inclusive, ISO
  to?: string; // exclusive, ISO
  country?: string;
  path?: string;
  action?: string;
  source?: string;
  limit?: number;
};

/**
 * Build the WHERE clause and its parameters together.
 *
 * Values are never interpolated into the SQL — every one becomes a numbered
 * placeholder. That is the whole point of doing it this way: these filters come
 * straight off the query string, and string-building them into a query is how
 * a dashboard becomes an injection hole.
 */
function buildWhere(f: VisitFilters): { clause: string; params: unknown[] } {
  const parts: string[] = [];
  const params: unknown[] = [];
  const add = (sqlFragment: string, value: unknown) => {
    params.push(value);
    parts.push(sqlFragment.replace("$?", `$${params.length}`));
  };

  // No parameter: a fixed predicate with nothing user-supplied in it.
  if (f.humansOnly) parts.push(NOT_HUMAN_EXCLUDED);

  if (f.from) add("started_at >= $?", f.from);
  if (f.to) add("started_at < $?", f.to);
  if (f.country) add("country = $?", f.country);
  if (f.source) add("source = $?", f.source);
  // Containment against the denormalised jsonb array, which is GIN-indexed.
  if (f.path) add("paths @> $?::jsonb", JSON.stringify([f.path]));
  if (f.action) {
    add(
      "exists (select 1 from visit_actions a where a.visit_id = visits.id and a.action = $?)",
      f.action,
    );
  }

  return { clause: parts.length ? `where ${parts.join(" and ")}` : "", params };
}

/** Newest first, narrowed by whatever filters are set. */
export async function listVisits(f: VisitFilters = {}): Promise<VisitRow[]> {
  const sql = client();
  if (!sql) return [];
  const limit = Math.min(Math.max(f.limit ?? 200, 1), 500);
  try {
    const { clause, params } = buildWhere(f);
    const rows = await sql.query(
      `select * from visits ${clause} order by started_at desc limit $${params.length + 1}`,
      [...params, limit],
    );
    return rows as VisitRow[];
  } catch {
    return [];
  }
}

/** How many rows the current filters match, independent of the display limit. */
export async function countVisits(f: VisitFilters = {}): Promise<number> {
  const sql = client();
  if (!sql) return 0;
  try {
    const { clause, params } = buildWhere(f);
    const rows = await sql.query(`select count(*)::int as n from visits ${clause}`, params);
    return (rows as { n: number }[])[0]?.n ?? 0;
  } catch {
    return 0;
  }
}

/**
 * The values worth offering in the filter controls, taken from the data itself
 * — a dropdown of pages nobody visited would be noise.
 */
export async function filterOptions(): Promise<{
  countries: string[];
  paths: string[];
  actions: string[];
  sources: string[];
}> {
  const sql = client();
  if (!sql) return { countries: [], paths: [], actions: [], sources: [] };
  try {
    const [countries, paths, actions, sources] = await Promise.all([
      sql`select distinct country from visits where country is not null order by country`,
      sql`select distinct path from visit_pages where path is not null order by path limit 200`,
      sql`select distinct action from visit_actions where action is not null order by action`,
      sql`select distinct source from visits where source is not null order by source limit 100`,
    ]);
    return {
      countries: (countries as { country: string }[]).map((r) => r.country),
      paths: (paths as { path: string }[]).map((r) => r.path),
      actions: (actions as { action: string }[]).map((r) => r.action),
      sources: (sources as { source: string }[]).map((r) => r.source),
    };
  } catch {
    return { countries: [], paths: [], actions: [], sources: [] };
  }
}

/** Counts for the header, so the effect of the bot filter is visible. */
export async function visitCounts(): Promise<{ total: number; automated: number }> {
  const sql = client();
  if (!sql) return { total: 0, automated: 0 };
  try {
    const [r] = await sql`
      select count(*)::int as total,
             count(*) filter (where bot_verdict in ('automated','crawler','scanner'))::int as automated
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

// --- aggregates, for the charts ---------------------------------------------

export type Ranked = { label: string; value: number; sub?: string | null };

// Bots are excluded from every aggregate by default. A scraper hitting one page
// a hundred times would otherwise top the "most read page" chart, and the whole
// point of these is to see people.
const HUMAN = NOT_HUMAN_EXCLUDED;

export type Overview = {
  visits: number;
  humans: number;
  countries: number;
  medianMs: number | null;
  bounceRate: number | null;
  returning: number;
};

export async function overview(humansOnly = true): Promise<Overview> {
  const sql = client();
  if (!sql) return { visits: 0, humans: 0, countries: 0, medianMs: null, bounceRate: null, returning: 0 };
  try {
    const rows = await sql.query(
      `select
         count(*)::int                                             as visits,
         count(*) filter (where ${HUMAN})::int                     as humans,
         count(distinct country) filter (where country is not null)::int as countries,
         -- Median, not mean: one tab left open for three hours drags an average
         -- somewhere no real visit ever was.
         percentile_cont(0.5) within group (order by total_ms)     as median_ms,
         avg(case when is_bounce then 1.0 else 0.0 end)            as bounce_rate,
         count(*) filter (where visit_number > 1)::int             as returning
       from visits ${humansOnly ? `where ${HUMAN}` : ""}`,
    );
    const r = (rows as Record<string, number | null>[])[0] || {};
    return {
      visits: Number(r.visits ?? 0),
      humans: Number(r.humans ?? 0),
      countries: Number(r.countries ?? 0),
      medianMs: r.median_ms === null || r.median_ms === undefined ? null : Number(r.median_ms),
      bounceRate: r.bounce_rate === null || r.bounce_rate === undefined ? null : Number(r.bounce_rate),
      returning: Number(r.returning ?? 0),
    };
  } catch {
    return { visits: 0, humans: 0, countries: 0, medianMs: null, bounceRate: null, returning: 0 };
  }
}

/** Country totals with a position, averaged from the visits themselves. */
export async function countryMap(
  humansOnly = true,
): Promise<{ code: string; visits: number; lat: number; lng: number }[]> {
  const sql = client();
  if (!sql) return [];
  try {
    const rows = await sql.query(
      `select country as code, count(*)::int as visits,
              avg(lat)::float as lat, avg(lng)::float as lng
         from visits
        where country is not null and lat is not null and lng is not null
          ${humansOnly ? `and ${HUMAN}` : ""}
        group by country order by visits desc limit 100`,
    );
    return rows as { code: string; visits: number; lat: number; lng: number }[];
  } catch {
    return [];
  }
}

async function ranked(query: string): Promise<Ranked[]> {
  const sql = client();
  if (!sql) return [];
  try {
    return (await sql.query(query)) as Ranked[];
  } catch {
    return [];
  }
}

const human = (on: boolean, first = true) => (on ? `${first ? "where" : "and"} ${HUMAN}` : "");

export const topPages = (h = true) =>
  ranked(`select p.path as label, count(distinct p.visit_id)::int as value
            from visit_pages p join visits v on v.id = p.visit_id
           ${human(h)} group by p.path order by value desc limit 10`);

export const topLocations = (h = true) =>
  ranked(`select coalesce(city, 'Unknown') as label, count(*)::int as value, country as sub
            from visits where country is not null ${human(h, false)}
           group by city, country order by value desc limit 10`);

export const topNetworks = (h = true) =>
  ranked(`select network as label, count(*)::int as value,
                 count(distinct ip)::text as sub
            from visits where network is not null ${human(h, false)}
           group by network order by value desc limit 10`);

/** Repeat visitors, by IP. The point is who came back, so single visits are out. */
export const topIps = (h = true) =>
  ranked(`select ip as label, count(*)::int as value,
                 coalesce(network, '') || case when city is not null then ' · ' || city else '' end as sub
            from visits where ip is not null ${human(h, false)}
           group by ip, network, city having count(*) > 1
           order by value desc limit 10`);

export const longestSessions = (h = true) =>
  ranked(`select id as label, total_ms::int as value,
                 coalesce(city || ', ', '') || coalesce(country, '') as sub
            from visits where total_ms is not null ${human(h, false)}
           order by total_ms desc limit 10`);

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
