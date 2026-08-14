import { neon } from "@neondatabase/serverless";

/**
 * Storage for /contact submissions.
 *
 * Deliberately NOT modelled on lib/db.ts's failure-tolerant style. Visit
 * tracking may silently drop a record — it is telemetry, and the next visitor
 * replaces it. A contact message has no replacement: if it is lost, someone
 * tried to reach Suman and nobody ever found out. So this reports success and
 * failure honestly and the route decides what to tell the sender.
 */

export type ContactSubmission = {
  name: string;
  email: string;
  intent: string;
  message: string;
  /** Request context, for triage — never shown back to the sender. */
  ip?: string | null;
  userAgent?: string | null;
  referrer?: string | null;
};

function client() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    return neon(url);
  } catch {
    return null;
  }
}

export function contactDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Persist one message.
 *
 * The table is created on demand rather than through a migration, because this
 * project has no migration runner — the visits schema was applied by hand, and
 * a contact form that only works after someone remembers to run DDL is a
 * contact form that silently doesn't work. `if not exists` makes this a no-op
 * on every call after the first, and submissions are rare enough that the
 * round-trip costs nothing that matters.
 */
export async function saveContactMessage(
  m: ContactSubmission,
): Promise<{ ok: boolean; error?: string }> {
  const sql = client();
  if (!sql) return { ok: false, error: "no database" };
  try {
    await sql`
      create table if not exists contact_messages (
        id          bigserial primary key,
        created_at  timestamptz not null default now(),
        name        text not null,
        email       text not null,
        intent      text,
        message     text not null,
        ip          text,
        user_agent  text,
        referrer    text,
        handled     boolean not null default false
      )
    `;
    await sql`
      insert into contact_messages (name, email, intent, message, ip, user_agent, referrer)
      values (${m.name}, ${m.email}, ${m.intent}, ${m.message},
              ${m.ip ?? null}, ${m.userAgent ?? null}, ${m.referrer ?? null})
    `;
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error)?.message?.slice(0, 200) };
  }
}
