#!/usr/bin/env node
// Creates (or brings up to date) the visitor-dashboard schema.
//
//   node scripts/db-migrate.mjs            # uses DATABASE_URL from .env.local
//   node scripts/db-migrate.mjs --check    # report only, change nothing
//   node scripts/db-migrate.mjs --sql      # print the SQL and connect to nothing
//
// --sql exists so production can be migrated by pasting into Vercel's Storage
// query editor, without the production connection string ever leaving Vercel.
//
// Every statement is idempotent, so running it twice is a no-op. Point it at
// the dev branch first, and only then at production.

import fs from "node:fs";
import { neon } from "@neondatabase/serverless";

const checkOnly = process.argv.includes("--check");
const sqlOnly = process.argv.includes("--sql");

function connectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    const env = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    const m = env.match(/^DATABASE_URL=(.*)$/m);
    if (m) return m[1].trim();
  } catch {
    /* fall through */
  }
  console.error("No DATABASE_URL — set it in the environment or in .env.local.");
  process.exit(1);
}

// Printing the SQL must not require — or touch — a database.
const sql = sqlOnly ? null : neon(connectionString());

// Ordered, and each one safe to re-run.
const statements = [
  [
    "visits table",
    `create table if not exists visits (
       id             text primary key,
       started_at     timestamptz not null default now(),
       last_seen_at   timestamptz not null default now(),
       ended_at       timestamptz,
       total_ms       integer,
       active_ms      integer,
       page_count     integer,
       paths          jsonb not null default '[]'::jsonb,

       ip             text,
       country        text,
       region         text,
       city           text,
       postal         text,
       asn            integer,
       network        text,
       timezone       text,
       languages      text,

       user_agent     text,
       device         text,
       screen         text,
       cores          integer,
       webdriver      boolean,

       bot_verdict    text,
       interacted     boolean,

       entry_path     text,
       source         text,
       referrer       text,
       tag            text,

       visit_number   integer,
       days_since     integer,

       tg_arrival_mid integer,
       tg_card_mid    integer
     )`,
  ],
  [
    "visit_pages table",
    `create table if not exists visit_pages (
       visit_id text not null references visits(id) on delete cascade,
       seq      integer not null,
       path     text not null,
       ms       integer,
       scroll   integer,
       primary key (visit_id, seq)
     )`,
  ],
  [
    "visit_actions table",
    `create table if not exists visit_actions (
       visit_id text not null references visits(id) on delete cascade,
       seq      integer not null,
       action   text,
       label    text,
       primary key (visit_id, seq)
     )`,
  ],
  // The dashboard's default view is "newest first", so this is the index that
  // matters most.
  ["visits_started_at index", `create index if not exists visits_started_at_idx on visits (started_at desc)`],
  ["visits_country index", `create index if not exists visits_country_idx on visits (country)`],
  ["visits_bot_verdict index", `create index if not exists visits_bot_verdict_idx on visits (bot_verdict)`],
  // Containment lookups: "everyone who saw /projects".
  ["visits_paths index", `create index if not exists visits_paths_idx on visits using gin (paths)`],
  ["visit_pages_path index", `create index if not exists visit_pages_path_idx on visit_pages (path)`],
  ["visit_actions_action index", `create index if not exists visit_actions_action_idx on visit_actions (action)`],
];

if (sqlOnly) {
  console.log("-- Visitor dashboard schema. Safe to run more than once.\n");
  for (const [label, ddl] of statements) {
    console.log(`-- ${label}`);
    console.log(`${ddl.replace(/\n\s+/g, "\n  ").trim()};\n`);
  }
  process.exit(0);
}

const existing = await sql`
  select table_name from information_schema.tables where table_schema = 'public'
`;
console.log(
  "before:",
  existing.length ? existing.map((t) => t.table_name).join(", ") : "(empty)",
);

if (checkOnly) {
  console.log("\n--check given, nothing was changed.");
  process.exit(0);
}

for (const [label, ddl] of statements) {
  try {
    // sql`` is for parameterised queries; raw DDL goes through sql.query().
    await sql.query(ddl);
    console.log("ok  ", label);
  } catch (e) {
    console.error("FAIL", label, "-", e.message);
    process.exit(1);
  }
}

const after = await sql`
  select table_name from information_schema.tables where table_schema = 'public' order by table_name
`;
const idx = await sql`
  select indexname from pg_indexes where schemaname = 'public' order by indexname
`;
console.log("\ntables :", after.map((t) => t.table_name).join(", "));
console.log("indexes:", idx.map((i) => i.indexname).join(", "));
console.log("\nSchema is up to date.");
