import type { NextRequest } from "next/server";
import { CONTACT_INTENTS } from "@/lib/contact-intents";
import { contactDbConfigured, saveContactMessage } from "@/lib/contact";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;

const LIMITS = {
  name: 120,
  email: 200,
  intent: 60,
  message: 4_000,
} as const;

/** Below this, a "human" filled four fields faster than a human can read them. */
const MIN_FILL_MS = 2_000;

// ── Rate limiting ─────────────────────────────────────────────────────────
// Per-IP, in memory. A serverless instance can be recycled between requests, so
// this is a speed bump rather than a wall — enough to stop a script hammering
// the endpoint, not a substitute for the honeypot and timing checks below.

const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 5;
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.windowStart > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (record.count >= RATE_MAX) return true;
  record.count += 1;
  return false;
}

// ── Helpers ───────────────────────────────────────────────────────────────

/** Same-origin only. A missing Origin header is a normal non-browser client. */
function originAllowed(h: Headers): boolean {
  const origin = h.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === (h.get("host") || "");
  } catch {
    return false;
  }
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  // Strip control characters: they have no business in a form field and are
  // how you smuggle a fake line into the Telegram message below. Newline and
  // carriage return are deliberately spared — a paragraph break in the
  // message body is real content.
  const stripped = value.replace(
    /[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g,
    " ",
  );
  return stripped.trim().slice(0, max);
}

/** Not RFC-complete on purpose — this rejects typos, not exotic-but-legal addresses. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value);
}

/** Telegram parse_mode: "HTML" — anything interpolated has to be escaped. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type ContactFields = {
  name: string;
  email: string;
  intent: string;
  message: string;
  ip: string;
};

/** Built once so both bots send the same message rather than two drifting copies. */
function contactMessage(fields: ContactFields): string {
  return (
    `📬 <b>New message from the contact form</b>\n\n` +
    `<b>From:</b> ${escapeHtml(fields.name)}\n` +
    `<b>Email:</b> ${escapeHtml(fields.email)}\n` +
    `<b>About:</b> ${escapeHtml(fields.intent || "—")}\n` +
    `<b>IP:</b> ${escapeHtml(fields.ip)}\n\n` +
    `${escapeHtml(fields.message)}`
  );
}

async function notifyTelegram(fields: ContactFields): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const text = contactMessage(fields);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Mirror the same message into the second bot — the human-only feed. A contact
 * form submission is the most unambiguously human thing this site receives, so
 * every one of them goes across.
 *
 * Returns nothing, on purpose. `notified` below decides whether the visitor is
 * told their message failed to send, and that decision belongs to the main bot
 * alone: a second chat being unreachable must never make a delivered message
 * look undelivered. This resolves whatever happens, so it cannot reject the
 * `Promise.all` it runs in either.
 *
 * Unset env vars make it a no-op, which is also the off switch.
 */
async function mirrorToHumanBot(fields: ContactFields): Promise<void> {
  const token = process.env.TELEGRAM_HUMAN_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_HUMAN_CHAT_ID;
  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: contactMessage(fields),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      // The main bot's send has no timeout and never needed one — it is the
      // thing being waited for. This one is a passenger, so it gets a leash.
      signal: AbortSignal.timeout(5_000),
    });
  } catch {
    // A missing mirror is worth strictly less than a delivered message.
  }
}

// ── Handler ───────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const h = request.headers;

  if (!originAllowed(h)) {
    return Response.json({ error: "Request blocked." }, { status: 403 });
  }
  if (Number(h.get("content-length") || 0) > MAX_BODY_BYTES) {
    return Response.json({ error: "That message is too long." }, { status: 413 });
  }

  const ip =
    (h.get("x-forwarded-for") || "").split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      {
        error:
          "That's a few messages in a short window. Try again a bit later, or email sumandebnath944@gmail.com directly.",
      },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Could not read that request." }, { status: 400 });
  }

  // Bot traps. Both fail silently with a 200 — telling a scraper which check it
  // tripped is how it learns to pass next time. A real visitor can never see
  // either branch: the honeypot is hidden and no human fills a form in 2s.
  const honeypot = clean(body.company, 200);
  const elapsed = Number(body.elapsedMs);
  if (honeypot || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const intentRaw = clean(body.intent, LIMITS.intent);
  const message = clean(body.message, LIMITS.message);

  if (!name) return Response.json({ error: "A name would help." }, { status: 400 });
  if (!looksLikeEmail(email)) {
    return Response.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (message.length < 10) {
    return Response.json(
      { error: "A little more detail would help — at least a sentence." },
      { status: 400 },
    );
  }

  // Only ever store one of the known values, so nothing arbitrary reaches the
  // database or the notification.
  const intent = (CONTACT_INTENTS as readonly string[]).includes(intentRaw)
    ? intentRaw
    : "Something else";

  const submission = {
    name,
    email,
    intent,
    message,
    ip,
    userAgent: h.get("user-agent"),
    referrer: h.get("referer"),
  };

  // Both paths run regardless of the other's outcome: Telegram is the alert,
  // the database is the durable copy, and either one alone means the message
  // reached Suman.
  // The mirror rides along as a third parallel call whose result is deliberately
  // not destructured: it costs no extra wall-clock time and has no vote in what
  // the visitor is told below.
  const [notified, stored] = await Promise.all([
    notifyTelegram({ name, email, intent, message, ip }),
    contactDbConfigured()
      ? saveContactMessage(submission)
      : Promise.resolve({ ok: false, error: "no database" }),
    mirrorToHumanBot({ name, email, intent, message, ip }),
  ]);

  if (!notified && !stored.ok) {
    // Nothing caught it. Say so rather than showing a success screen for a
    // message that went nowhere.
    console.error("Contact form delivery failed", {
      notified,
      storeError: stored.error,
    });
    return Response.json(
      {
        error:
          "Something went wrong on my end and your message didn't send. Please email sumandebnath944@gmail.com directly — sorry about that.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
