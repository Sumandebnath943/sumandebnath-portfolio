// Visitor notifier — server relay (Option C: arrival + leave summary, linked by ID).
//
// Fully self-contained: no third-party analytics, no npm deps, no storage. The
// browser holds the session/journey and sends beacons; here we enrich each one
// with server-side signals (geo + IP from Vercel's request headers, device from
// the User-Agent) and forward a single message to the owner's Telegram bot.
//
// Design rule: this must NEVER affect the visitor. Every failure path returns a
// harmless response and is swallowed — a missing token, a Telegram outage, or a
// malformed payload can only mean "no notification", never a broken page.

import type { NextRequest } from "next/server";

// Reads request headers → keep dynamic (never prerendered / cached).
export const dynamic = "force-dynamic";

type Page = { path?: string; ms?: number };
type Payload = {
  type?: "arrival" | "summary" | "mute" | "unmute";
  id?: string;
  path?: string;
  referrer?: string;
  tz?: string;
  lang?: string;
  totalMs?: number;
  pageCount?: number;
  pages?: Page[];
};

// --- helpers ---------------------------------------------------------------

function isBot(ua: string): boolean {
  return /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|pinterest|vkshare|w3c_validator|whatsapp|telegrambot|headless|lighthouse|monitor|preview|axios|python-requests|curl|wget|go-http/i.test(
    ua,
  );
}

function parseDevice(ua: string): string {
  if (!ua) return "Unknown device";

  const browser =
    /Edg\//.test(ua) ? "Edge"
    : /OPR\/|Opera/.test(ua) ? "Opera"
    : /SamsungBrowser/.test(ua) ? "Samsung Internet"
    : /Chrome\//.test(ua) ? "Chrome"
    : /Firefox\//.test(ua) ? "Firefox"
    : /Safari\//.test(ua) ? "Safari"
    : "Unknown browser";

  const os =
    /Windows NT/.test(ua) ? "Windows"
    : /Android/.test(ua) ? "Android"
    : /(iPhone|iPad|iPod)/.test(ua) ? "iOS"
    : /Mac OS X/.test(ua) ? "macOS"
    : /Linux/.test(ua) ? "Linux"
    : "Unknown OS";

  const type =
    /iPad|Tablet/.test(ua) ? "tablet"
    : /Mobi|Android|iPhone|iPod/.test(ua) ? "mobile"
    : "desktop";

  return `${browser} · ${os} · ${type}`;
}

function decode(value: string | null): string {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 65432 → "1m 5s"; 8000 → "8s"
function human(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m ? `${m}m ${s}s` : `${s}s`;
}

// 65432 → "1:05" (compact per-page)
function compact(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

async function sendTelegram(token: string, chatId: string, text: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
}

// --- handler ---------------------------------------------------------------

export async function POST(request: NextRequest) {
  const ok = () => new Response(null, { status: 204 });

  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return ok();

    const h = request.headers;
    const ua = h.get("user-agent") || "";
    if (isBot(ua)) return ok();

    let body: Payload = {};
    try {
      body = (await request.json()) as Payload;
    } catch {
      // ignore malformed body
    }

    // Server-side enrichment (same for every message type).
    const city = decode(h.get("x-vercel-ip-city"));
    const region = decode(h.get("x-vercel-ip-country-region"));
    const country = decode(h.get("x-vercel-ip-country"));
    const location =
      [city, region, country].filter(Boolean).join(", ") || "Unknown location";
    const ip =
      (h.get("x-forwarded-for") || "").split(",")[0].trim() ||
      h.get("x-real-ip") ||
      "unknown";
    const device = parseDevice(ua);
    const id = esc((body.id || "").slice(0, 24));
    const tzLine = (body.tz || "").slice(0, 60);

    let text = "";

    if (body.type === "mute") {
      // Confirmation that this specific browser/device is now excluded.
      text = [
        "🔕 <b>Alerts muted for this browser</b>",
        `📱 ${esc(device)}`,
        `📍 ${esc(location)}`,
        tzLine ? `🕑 ${esc(tzLine)}` : "",
        "<i>This device won't trigger visitor alerts. Use ?notrack=0 to undo.</i>",
      ]
        .filter(Boolean)
        .join("\n");
    } else if (body.type === "unmute") {
      text = [
        "🔔 <b>Alerts re-enabled for this browser</b>",
        `📱 ${esc(device)}`,
        `📍 ${esc(location)}`,
      ].join("\n");
    } else if (body.type === "summary") {
      const pages = Array.isArray(body.pages) ? body.pages : [];
      const journey =
        pages
          .map((p) => `${esc((p.path || "?").slice(0, 120))} (${compact(p.ms || 0)})`)
          .join(" → ") || "—";
      const count = body.pageCount ?? pages.length;
      text = [
        `👋 <b>Visitor left</b> · <code>${id || "?"}</code>`,
        `🧭 <b>Journey:</b> ${journey}`,
        `📄 ${count} page${count === 1 ? "" : "s"} · ⏱️ <b>${human(body.totalMs || 0)}</b>`,
        `📍 ${esc(location)} · 📱 ${esc(device)}`,
      ].join("\n");
    } else {
      // Default: arrival.
      const path = (body.path || "/").slice(0, 200);
      const referrer = (body.referrer || "").slice(0, 200);
      const lines = [
        `🔔 <b>New visitor</b> · <code>${id || "?"}</code>`,
        `📄 <b>Entered on:</b> ${esc(path)}`,
        `📍 <b>From:</b> ${esc(location)}`,
        `🌐 <b>IP:</b> ${esc(ip)}`,
        `📱 <b>Device:</b> ${esc(device)}`,
      ];
      if (tzLine) lines.push(`🕑 <b>Timezone:</b> ${esc(tzLine)}`);
      if (referrer) lines.push(`↩️ <b>Referrer:</b> ${esc(referrer)}`);
      text = lines.join("\n");
    }

    await sendTelegram(token, chatId, text);
    return ok();
  } catch {
    return ok();
  }
}
