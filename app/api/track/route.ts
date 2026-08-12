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

import { after } from "next/server";
import type { NextRequest } from "next/server";
import { promises as dns } from "node:dns";

export const dynamic = "force-dynamic";
// The deep-dive report is held back briefly after a visit ends (see DETAIL_DELAY_MS),
// and `after` runs against this budget.
export const maxDuration = 30;

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
  // Telegram message id of this visit's arrival alert, so later messages can be
  // sent as replies to it and thread together.
  mid?: number;
  // Telegram message id of this visit's journey card. The browser is handed this
  // at arrival and gives it back on every summary, so each update rewrites that
  // one message instead of posting another.
  smid?: number;
  // Device/behaviour signals used for the human-vs-bot read.
  screen?: string;
  hw?: number;
  wd?: boolean;
  interacted?: boolean;
  // Returning-visitor counters (per browser, from localStorage).
  visits?: number;
  daysSince?: number;
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

// Proxies hand us IPv4-mapped IPv6 (::ffff:1.2.3.4) as often as plain IPv4.
// Unwrap so one set of range checks covers both.
function normalizeIp(raw: string): string {
  const ip = (raw || "").trim().toLowerCase();
  const mapped = ip.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/);
  return mapped ? mapped[1] : ip;
}

// Loopback / private / link-local / carrier-NAT — nothing to learn from a
// lookup. Note 172 is private only across 172.16–172.31; the rest is public.
function isPrivateIp(ip: string): boolean {
  if (!ip || ip === "unknown") return true;

  const v4 = ip.match(/^(\d{1,3})\.(\d{1,3})\.\d{1,3}\.\d{1,3}$/);
  if (v4) {
    const a = Number(v4[1]);
    const b = Number(v4[2]);
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true; // link-local
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT (100.64.0.0/10)
    return false;
  }

  if (ip === "::" || ip === "::1") return true;
  if (/^f[cd][0-9a-f]{2}:/.test(ip)) return true; // fc00::/7 unique-local
  if (/^fe[89ab][0-9a-f]:/.test(ip)) return true; // fe80::/10 link-local
  return false;
}

// Reverse DNS → often reveals the ISP (home users) or company (corporate
// networks). Never a person. Public DNS infra, not a third-party service.
async function reverseDns(ip: string): Promise<string> {
  if (isPrivateIp(ip)) return "";
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

// AS names change rarely and visitors cluster onto a handful of ISPs, so a
// process-lifetime cache keeps this at roughly zero lookups in steady state.
const asnNameCache = new Map<string, string>();

// Team Cymru's ASN registry, over DNS. The query carries only the AS *number* —
// never the visitor's IP — so nothing identifying about them leaves this server.
async function asnName(asn: string): Promise<string> {
  if (!asn || !/^\d{1,10}$/.test(asn)) return "";
  const cached = asnNameCache.get(asn);
  if (cached !== undefined) return cached;

  let name = "";
  try {
    const txt = (await Promise.race([
      dns.resolveTxt(`AS${asn}.asn.cymru.com`),
      new Promise<string[][]>((_, rej) => setTimeout(() => rej(new Error("timeout")), 1200)),
    ])) as string[][];
    // "140158 | IN | apnic | 2020-02-14 | NAII-AS-IN - Net Access Internet India Pvt Ltd, IN"
    const org = (txt?.[0]?.join("") || "").split("|")[4]?.trim() || "";
    // Drop the registry handle prefix and trailing country code.
    name = org.replace(/^[A-Z0-9-]+\s+-\s+/, "").replace(/,\s*[A-Z]{2}$/, "").trim();
  } catch {
    name = "";
  }

  if (asnNameCache.size > 500) asnNameCache.clear();
  asnNameCache.set(asn, name);
  return name;
}

// Networks that belong to hosting providers rather than people. A visit from one
// is far more likely to be a scraper than a recruiter.
const HOSTING_RE =
  /amazon|aws|google llc|microsoft|azure|digitalocean|linode|ovh|hetzner|vultr|cloudflare|oracle|alibaba|tencent|scaleway|contabo|leaseweb|choopa|host|datacenter|data center|vps|cloud/i;

// tzdata carries several names for the same zone. Without folding these, every
// Indian visitor whose browser reports "Asia/Calcutta" would look like a VPN.
const TZ_ALIASES: Record<string, string> = {
  "asia/calcutta": "asia/kolkata",
  "asia/katmandu": "asia/kathmandu",
  "asia/rangoon": "asia/yangon",
  "asia/saigon": "asia/ho_chi_minh",
  "asia/dacca": "asia/dhaka",
  "europe/kiev": "europe/kyiv",
  "us/eastern": "america/new_york",
  "us/central": "america/chicago",
  "us/mountain": "america/denver",
  "us/pacific": "america/los_angeles",
};
function canonTz(tz: string): string {
  const key = (tz || "").trim().toLowerCase();
  return TZ_ALIASES[key] || key;
}

// Human-vs-bot read. Deliberately three-way: a wrong "bot" verdict costs a real
// hiring signal, while a wrong "human" verdict costs one junk notification — so
// the thresholds lean toward calling things human.
function classify(o: {
  ua: string;
  wd?: boolean;
  hw?: number;
  screen?: string;
  interacted?: boolean;
  org: string;
}): { label: string; why: string } {
  const why: string[] = [];
  let score = 0;

  if (/headless|phantom|electron|puppeteer|playwright/i.test(o.ua)) {
    score += 3;
    why.push("headless UA");
  }
  if (o.wd === true) {
    score += 3;
    why.push("webdriver");
  }
  if (o.hw === 0) {
    score += 2;
    why.push("0 CPU cores");
  }
  if (o.screen === "0×0") {
    score += 2;
    why.push("no screen");
  }
  if (o.org && HOSTING_RE.test(o.org)) {
    score += 2;
    why.push("datacenter network");
  }
  if (o.interacted === false) {
    score += 1;
    why.push("no interaction");
  }

  const label = score >= 3 ? "🤖 automated" : score >= 1 ? "❓ unclear" : "👤 human";
  return { label, why: why.join(", ") };
}

// --- abuse limits ----------------------------------------------------------
//
// This endpoint is public and cannot be authenticated: any secret shipped to the
// browser is readable by anyone. The goal is only to raise the cost of flooding
// the Telegram chat or fabricating visits. Counters are per-instance, and
// serverless spreads traffic over several, so treat these as best-effort.

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20; // messages per IP per window
const DAILY_MAX = 400; // per instance, per day
const MAX_BODY_BYTES = 8_000;
const DETAIL_DELAY_MS = 15_000;

const rateLog = new Map<string, number[]>();
let dayStamp = 0;
let daySent = 0;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (rateLog.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  if (rateLog.size > 5_000) rateLog.clear(); // crude cap; this map is unbounded otherwise
  rateLog.set(key, hits);
  return hits.length > RATE_MAX;
}

function overDailyCap(): boolean {
  const day = Math.floor(Date.now() / 86_400_000);
  if (day !== dayStamp) {
    dayStamp = day;
    daySent = 0;
  }
  daySent += 1;
  return daySent > DAILY_MAX;
}

// Reject only a *mismatched* origin. A missing Origin header is not treated as
// hostile — beacon behaviour varies between browsers, and dropping those would
// silently lose real visits, which is a worse failure than letting one through.
function originAllowed(h: Headers): boolean {
  const origin = h.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === (h.get("host") || "");
  } catch {
    return false;
  }
}

async function sendTelegram(
  token: string,
  chatId: string,
  text: string,
  replyTo?: number,
): Promise<number | undefined> {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      // If the arrival message was deleted, still send rather than erroring.
      ...(replyTo ? { reply_to_message_id: replyTo, allow_sending_without_reply: true } : {}),
    }),
  });
  const data = (await res.json().catch(() => null)) as
    | { result?: { message_id?: number } }
    | null;
  return data?.result?.message_id;
}

// Rewrite a message already in the chat. Telegram does not re-notify on an edit,
// so the journey card can be brought up to date as often as we like without the
// phone buzzing again. Returns false if the message is gone (deleted by hand, or
// sent by a previous bot token), so the caller can fall back to posting.
async function editTelegram(
  token: string,
  chatId: string,
  messageId: number,
  text: string,
): Promise<boolean> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return data?.ok === true;
  } catch {
    return false;
  }
}

// Reports already posted, so a visit that ends more than once (a reload looks
// exactly like a departure at unload) updates its report instead of stacking a
// second one. Per-instance and therefore best-effort, like the rate limiter —
// the journey card above is the part that is guaranteed, because the browser
// carries its message id rather than relying on this.
const reportMsg = new Map<string, { mid: number; pages: number }>();

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
    if (!originAllowed(h)) return ok();
    if (Number(h.get("content-length") || 0) > MAX_BODY_BYTES) return ok();

    const ip = normalizeIp(
      (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "unknown",
    );
    if (rateLimited(ip) || overDailyCap()) return ok();

    let body: Payload = {};
    try {
      body = (await request.json()) as Payload;
    } catch {
      // ignore malformed body
    }

    const city = decode(h.get("x-vercel-ip-city"));
    const region = decode(h.get("x-vercel-ip-country-region"));
    const country = decode(h.get("x-vercel-ip-country"));
    const postal = decode(h.get("x-vercel-ip-postal-code"));
    const location = [city, region, country].filter(Boolean).join(", ") || "Unknown location";
    // Unlike lat/lng — which is a fixed city centroid shared by every visitor
    // from that city — the postal code actually varies within a metro.
    const placed = postal ? `${postal} · ${location}` : location;
    const lat = h.get("x-vercel-ip-latitude");
    const lng = h.get("x-vercel-ip-longitude");
    const mapLink = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : "";
    const device = parseDevice(ua);
    const id = esc((body.id || "").slice(0, 24));
    const tzName = (body.tz || "").slice(0, 60);
    const tagLine = (body.tag || "").slice(0, 60);

    // Vercel hands us the AS number directly; only the name needs resolving.
    const asn = (h.get("x-vercel-ip-as-number") || "").trim();
    const org = await asnName(asn);
    const network = org ? `${org} (AS${asn})` : asn ? `AS${asn}` : "";

    // A browser reporting a timezone that disagrees with the one implied by its
    // IP usually means a VPN — or a genuinely remote reviewer.
    const ipTz = h.get("x-vercel-ip-timezone") || "";
    const tzMismatch =
      tzName && ipTz && canonTz(tzName) !== canonTz(ipTz) ? `${tzName} vs ${ipTz} by IP` : "";

    const verdict = classify({
      ua,
      wd: body.wd,
      hw: body.hw,
      screen: body.screen,
      interacted: body.interacted,
      org,
    });
    // Stay silent when the visitor looks human — that's the common case, and
    // labelling it would just add a line to every message.
    const flag = verdict.label.startsWith("👤")
      ? ""
      : ` · ${verdict.label}${verdict.why ? ` (${verdict.why})` : ""}`;

    const isArrival = !body.type || body.type === "arrival";
    // Every message after the arrival quotes it, so Telegram threads the whole
    // visit under one parent instead of leaving IDs to be matched by eye.
    const replyTo = typeof body.mid === "number" ? body.mid : undefined;

    const visits = typeof body.visits === "number" ? body.visits : 0;
    const daysSince = typeof body.daysSince === "number" ? body.daysSince : -1;
    const returning =
      visits > 1
        ? `🔁 <b>Returning:</b> visit #${visits}${
            daysSince === 0 ? " · earlier today"
            : daysSince > 0 ? ` · last seen ${daysSince}d ago`
            : ""
          }`
        : "";

    let text = "";

    if (body.type === "mute") {
      text = [
        "🔕 <b>Alerts muted for this browser</b>",
        `📱 ${esc(device)}`,
        `📍 ${esc(placed)}`,
        "<i>This device won't trigger visitor alerts. Use ?notrack=0 to undo.</i>",
      ].join("\n");
    } else if (body.type === "unmute") {
      text = [
        "🔔 <b>Alerts re-enabled for this browser</b>",
        `📱 ${esc(device)}`,
        `📍 ${esc(placed)}`,
      ].join("\n");
    } else if (body.type === "action") {
      // Real-time high-intent alert (e.g. résumé download, email/phone click).
      const label = esc((body.label || body.a || "action").slice(0, 80));
      const path = esc((body.path || "").slice(0, 200));
      text = [
        `🔥 <b>Hot action</b> · <code>${id || "?"}</code>${tagLine ? ` · 🏷️ ${esc(tagLine)}` : ""}${flag}`,
        `⭐ <b>${label}</b>${path ? ` — on ${path}` : ""}`,
        `📍 ${esc(placed)} · 📱 ${esc(device)}`,
        network ? `🏢 ${esc(network)}` : "",
      ]
        .filter(Boolean)
        .join("\n");
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
        `👋 <b>Visitor left</b> · <code>${id || "?"}</code>${tagLine ? ` · 🏷️ ${esc(tagLine)}` : ""}${flag}`,
        `🧭 <b>Journey:</b> ${journey}`,
        actionLine,
        `📄 ${count} page${count === 1 ? "" : "s"} · ⏱️ <b>${human(body.totalMs || 0)}</b>${active}`,
        returning,
        `📍 ${esc(placed)} · 📱 ${esc(device)}`,
        network ? `🏢 ${esc(network)}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      // Deep-dive report. Held back briefly so it lands after the terse "left"
      // alert rather than racing it, and so the two read as a pair in the feed.
      after(async () => {
        try {
          // Don't spend a full report on a scraper. Only a firm "automated"
          // read suppresses it; "unclear" still gets one, carrying the verdict
          // in its header, so a doubtful visit is labelled rather than hidden.
          // The asymmetry is deliberate — suppressing a real visit loses a
          // hiring signal, sending one extra costs a notification. Checked
          // before the delay so bot traffic doesn't hold the function open.
          if (verdict.label.startsWith("🤖")) return;

          await new Promise((r) => setTimeout(r, DETAIL_DELAY_MS));

          const deepest = pages.reduce(
            (m, p) => Math.max(m, typeof p.scroll === "number" ? p.scroll : 0),
            0,
          );
          const totalMs = body.totalMs || 0;
          const activeMs = body.activeMs || 0;
          const focus = totalMs > 0 ? Math.round((activeMs / totalMs) * 100) : 0;

          // Deterministic engagement read — time, depth, breadth and intent.
          let eng = 0;
          if (activeMs > 120_000) eng += 2;
          else if (activeMs > 30_000) eng += 1;
          if (count >= 3) eng += 1;
          if (deepest >= 70) eng += 1;
          if (actions.length > 0) eng += 2;
          const engLabel =
            eng >= 4 ? "🔥 strong interest" : eng >= 2 ? "👀 genuine read" : "💨 quick bounce";

          const isp = await reverseDns(ip);
          const t = localTime(tzName);
          const entry = pages[0]?.path || "";
          const exit = pages[pages.length - 1]?.path || "";

          // Three blocks — what they did, then who they are — joined by blank
          // lines so the report stays scannable in a phone notification.
          const head = [
            `🧾 <b>Visit report</b> · <code>${id || "?"}</code>${tagLine ? ` · 🏷️ ${esc(tagLine)}` : ""}${flag}`,
            engLabel,
          ].join("\n");

          const behaviour = [
            `🧭 <b>Journey:</b> ${journey}`,
            actionLine,
            entry && exit && entry !== exit
              ? `🚪 <b>Entered</b> ${esc(entry)} · <b>left from</b> ${esc(exit)}`
              : "",
            `📊 ${count} page${count === 1 ? "" : "s"} · ⏱️ ${human(totalMs)} total · 👁️ ${human(activeMs)} active (${focus}%) · ↕️ ${deepest}% deepest`,
            returning,
          ]
            .filter(Boolean)
            .join("\n");

          const who = [
            `📍 ${esc(placed)}${mapLink ? ` · <a href="${mapLink}">map</a>` : ""}`,
            network ? `🏢 ${esc(network)}` : "",
            `🌐 ${esc(ip)}${isp ? ` · ${esc(isp)}` : ""}`,
            `📱 ${esc(device)}${body.screen ? ` · ${esc(body.screen.slice(0, 24))}` : ""}`,
            t ? `🕑 ${esc(t)}${tzName ? ` (${esc(tzName)})` : ""}` : "",
            tzMismatch ? `🛰️ <b>Timezone mismatch:</b> ${esc(tzMismatch)}` : "",
            body.source ? `↗️ <b>Source:</b> ${esc(body.source.slice(0, 60))}` : "",
            body.referrer ? `↩️ ${esc(body.referrer.slice(0, 200))}` : "",
            body.langs ? `🗣️ ${esc(body.langs.slice(0, 80))}` : "",
          ]
            .filter(Boolean)
            .join("\n");

          const d = [head, behaviour, who].filter(Boolean).join("\n\n");

          // A visit can "end" more than once, because a reload is
          // indistinguishable from leaving at unload. Rather than post a second
          // report, rewrite the first — and ignore an ending that knows less
          // than the one already reported.
          const key = id || "?";
          const prior = reportMsg.get(key);
          if (prior && count <= prior.pages) return;
          if (prior && (await editTelegram(token, chatId, prior.mid, d))) {
            reportMsg.set(key, { mid: prior.mid, pages: count });
            return;
          }
          const reportId = await sendTelegram(token, chatId, d, replyTo);
          if (reportId) {
            if (reportMsg.size > 500) reportMsg.clear();
            reportMsg.set(key, { mid: reportId, pages: count });
          }
        } catch {
          // A failed report must never surface anywhere.
        }
      });
    } else {
      // Arrival.
      const path = (body.path || "/").slice(0, 200);
      const source = (body.source || "Direct").slice(0, 60);
      const referrer = (body.referrer || "").slice(0, 200);
      const langLine = (body.langs || "").slice(0, 80);
      const isp = await reverseDns(ip);
      const t = localTime(tzName);

      const screen = (body.screen || "").slice(0, 24);

      const lines = [
        `🔔 <b>New visitor</b> · <code>${id || "?"}</code>${tagLine ? ` · 🏷️ ${esc(tagLine)}` : ""}${flag}`,
        `📄 <b>Entered on:</b> ${esc(path)}`,
        `🧭 <b>Source:</b> ${esc(source)}`,
        `📍 <b>From:</b> ${esc(placed)}${mapLink ? ` · <a href="${mapLink}">map</a>` : ""}`,
      ];
      if (network) lines.push(`🏢 <b>Network:</b> ${esc(network)}`);
      lines.push(
        `🌐 <b>IP:</b> ${esc(ip)}${isp ? ` · ${esc(isp)}` : ""}`,
        `📱 <b>Device:</b> ${esc(device)}${screen ? ` · ${esc(screen)}` : ""}`,
      );
      if (returning) lines.push(returning);
      if (t) lines.push(`🕑 <b>Their time:</b> ${esc(t)}${tzName ? ` (${esc(tzName)})` : ""}`);
      if (tzMismatch) lines.push(`🛰️ <b>Timezone mismatch:</b> ${esc(tzMismatch)}`);
      if (langLine) lines.push(`🗣️ <b>Languages:</b> ${esc(langLine)}`);
      if (referrer) lines.push(`↩️ <b>Referrer:</b> ${esc(referrer)}`);

      text = lines.join("\n");
    }

    // A summary rewrites the visit's own journey card rather than posting a new
    // message. This is what makes a reload harmless: it reports "left" with a
    // partial journey, the visit carries on, and the next update overwrites the
    // card with the complete one. Falls back to posting if the card is gone.
    const cardId = typeof body.smid === "number" ? body.smid : undefined;
    let sentId: number | undefined;
    if (body.type === "summary" && cardId) {
      sentId = (await editTelegram(token, chatId, cardId, text))
        ? cardId
        : await sendTelegram(token, chatId, text, replyTo);
    } else {
      sentId = await sendTelegram(token, chatId, text, replyTo);
    }

    // The arrival message owns the thread, so hand its id back to the browser;
    // it quotes it on every later message for this visit.
    if (isArrival && sentId) {
      // Open the visit's journey card straight away and hand its id back with
      // the thread id. Creating it here, while the browser can still read a
      // response, is the whole trick: at unload the page can only fire a beacon
      // and cannot learn an id, so it has to already hold one.
      const cardMid = await sendTelegram(
        token,
        chatId,
        `🧭 <b>Visit in progress</b> · <code>${id || "?"}</code>`,
        sentId,
      );
      return new Response(JSON.stringify({ mid: sentId, smid: cardMid }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return ok();
  } catch {
    return ok();
  }
}
