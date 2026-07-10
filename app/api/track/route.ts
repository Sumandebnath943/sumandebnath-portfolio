// Visitor notifier — server relay (Option C+: arrival + engagement summary, linked by ID).
//
// Fully self-contained: no third-party analytics/SaaS, no npm deps, no storage.
// The browser holds the session and sends beacons; here we enrich each with
// server-side signals (geo + IP from Vercel headers, device from User-Agent,
// ISP/org from a public reverse-DNS lookup) and forward one message to the
// owner's Telegram bot.
//
// Design rule: this must NEVER affect the visitor. Every failure path returns a
// harmless response and is swallowed.

import type { NextRequest } from "next/server";
import { promises as dns } from "node:dns";

export const dynamic = "force-dynamic";

type Page = { path?: string; ms?: number; scroll?: number };
type Action = { a?: string; label?: string };
type Payload = {
  type?: "arrival" | "summary" | "mute" | "unmute" | "action";
  id?: string;
  path?: string;
  source?: string;
  a?: string;
  label?: string;
  tag?: string;
  referrer?: string;
  tz?: string;
  langs?: string;
  totalMs?: number;
  activeMs?: number;
  pageCount?: number;
  pages?: Page[];
  actions?: Action[];
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

  // Best-effort Android device model (e.g. "SM-G991B", "Pixel 7").
  let model = "";
  const m = ua.match(/;\s?([A-Za-z0-9 ._-]+?)\s+Build\//);
  if (m && m[1] && !/^wv$/i.test(m[1])) model = m[1].trim();

  return `${browser} · ${os} · ${type}${model ? ` · ${model}` : ""}`;
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

function human(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m ? `${m}m ${s}s` : `${s}s`;
}
function compact(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// The visitor's local wall-clock time, from their reported timezone.
function localTime(tzName: string): string {
  if (!tzName) return "";
  try {
    return new Date().toLocaleTimeString("en-US", {
      timeZone: tzName,
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

// Reverse DNS → often reveals the ISP (home users) or company (corporate
// networks). Never a person. Public DNS infra, not a third-party service.
async function reverseDns(ip: string): Promise<string> {
  if (
    !ip || ip === "unknown" ||
    ip.startsWith("::1") || ip.startsWith("127.") ||
    ip.startsWith("10.") || ip.startsWith("192.168.") || ip.startsWith("172.")
  ) {
    return "";
  }
  try {
    const names = (await Promise.race([
      dns.reverse(ip),
      new Promise<string[]>((_, rej) => setTimeout(() => rej(new Error("timeout")), 1200)),
    ])) as string[];
    return names?.[0] || "";
  } catch {
    return "";
  }
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

    const city = decode(h.get("x-vercel-ip-city"));
    const region = decode(h.get("x-vercel-ip-country-region"));
    const country = decode(h.get("x-vercel-ip-country"));
    const location = [city, region, country].filter(Boolean).join(", ") || "Unknown location";
    const lat = h.get("x-vercel-ip-latitude");
    const lng = h.get("x-vercel-ip-longitude");
    const mapLink = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : "";
    const ip =
      (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
    const device = parseDevice(ua);
    const id = esc((body.id || "").slice(0, 24));
    const tzName = (body.tz || "").slice(0, 60);
    const tagLine = (body.tag || "").slice(0, 60);

    let text = "";

    if (body.type === "mute") {
      text = [
        "🔕 <b>Alerts muted for this browser</b>",
        `📱 ${esc(device)}`,
        `📍 ${esc(location)}`,
        "<i>This device won't trigger visitor alerts. Use ?notrack=0 to undo.</i>",
      ].join("\n");
    } else if (body.type === "unmute") {
      text = [
        "🔔 <b>Alerts re-enabled for this browser</b>",
        `📱 ${esc(device)}`,
        `📍 ${esc(location)}`,
      ].join("\n");
    } else if (body.type === "action") {
      // Real-time high-intent alert (e.g. résumé download, email/phone click).
      const label = esc((body.label || body.a || "action").slice(0, 80));
      const path = esc((body.path || "").slice(0, 200));
      text = [
        `🔥 <b>Hot action</b> · <code>${id || "?"}</code>${tagLine ? ` · 🏷️ ${esc(tagLine)}` : ""}`,
        `⭐ <b>${label}</b>${path ? ` — on ${path}` : ""}`,
        `📍 ${esc(location)} · 📱 ${esc(device)}`,
      ].join("\n");
    } else if (body.type === "summary") {
      const pages = Array.isArray(body.pages) ? body.pages : [];
      const journey =
        pages
          .map((p) => {
            const sc = typeof p.scroll === "number" ? `, ${p.scroll}%` : "";
            return `${esc((p.path || "?").slice(0, 120))} (${compact(p.ms || 0)}${sc})`;
          })
          .join(" → ") || "—";
      const actions = Array.isArray(body.actions) ? body.actions : [];
      const actionLine =
        actions.length > 0
          ? `⭐ <b>Actions:</b> ${esc(actions.map((a) => a.label || a.a || "?").join(", "))}`
          : "";
      const count = body.pageCount ?? pages.length;
      const active = typeof body.activeMs === "number" ? ` · 👁️ ${human(body.activeMs)} active` : "";
      text = [
        `👋 <b>Visitor left</b> · <code>${id || "?"}</code>${tagLine ? ` · 🏷️ ${esc(tagLine)}` : ""}`,
        `🧭 <b>Journey:</b> ${journey}`,
        actionLine,
        `📄 ${count} page${count === 1 ? "" : "s"} · ⏱️ <b>${human(body.totalMs || 0)}</b>${active}`,
        `📍 ${esc(location)} · 📱 ${esc(device)}`,
      ]
        .filter(Boolean)
        .join("\n");
    } else {
      // Arrival.
      const path = (body.path || "/").slice(0, 200);
      const source = (body.source || "Direct").slice(0, 60);
      const referrer = (body.referrer || "").slice(0, 200);
      const langLine = (body.langs || "").slice(0, 80);
      const isp = await reverseDns(ip);
      const t = localTime(tzName);

      const lines = [
        `🔔 <b>New visitor</b> · <code>${id || "?"}</code>${tagLine ? ` · 🏷️ ${esc(tagLine)}` : ""}`,
        `📄 <b>Entered on:</b> ${esc(path)}`,
        `🧭 <b>Source:</b> ${esc(source)}`,
        `📍 <b>From:</b> ${esc(location)}${mapLink ? ` · <a href="${mapLink}">map</a>` : ""}`,
        `🌐 <b>IP:</b> ${esc(ip)}${isp ? ` · ${esc(isp)}` : ""}`,
        `📱 <b>Device:</b> ${esc(device)}`,
      ];
      if (t) lines.push(`🕑 <b>Their time:</b> ${esc(t)}${tzName ? ` (${esc(tzName)})` : ""}`);
      if (langLine) lines.push(`🗣️ <b>Languages:</b> ${esc(langLine)}`);
      if (referrer) lines.push(`↩️ <b>Referrer:</b> ${esc(referrer)}`);
      text = lines.join("\n");
    }

    await sendTelegram(token, chatId, text);
    return ok();
  } catch {
    return ok();
  }
}
