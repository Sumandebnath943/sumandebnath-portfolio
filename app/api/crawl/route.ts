import { after } from "next/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { internalKeyValid } from "@/lib/auth";
import { dbConfigured, saveVisit } from "@/lib/db";

// Crawler alerts. Called by proxy.ts when a page request arrives from something
// that will never run JavaScript, so the visitor notifier would otherwise never
// hear about it.
//
// Deliberately separate from /api/track, which is untouched. A crawler gets ONE
// detailed message — no journey card, no leave summary, no deep-dive — because
// there is no journey to report: it fetched a page and left.

export const maxDuration = 20;
export const dynamic = "force-dynamic";

// One message per crawler per page per window. LinkedIn fetching a URL twice in
// a second is one visit, not two. Per-instance and therefore best-effort, like
// the other limiters here.
const DEDUPE_MS = 10 * 60 * 1000;
const seen = new Map<string, number>();

function duplicate(key: string): boolean {
  const now = Date.now();
  const last = seen.get(key);
  if (seen.size > 2_000) seen.clear();
  seen.set(key, now);
  return last !== undefined && now - last < DEDUPE_MS;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  // Always 204, whatever happens. This endpoint tells a caller nothing.
  const ok = () => new NextResponse(null, { status: 204 });

  if (!internalKeyValid(request.headers.get("x-crawl-key"))) return ok();

  let b: {
    crawler?: string;
    ua?: string;
    path?: string;
    ip?: string;
    country?: string;
    city?: string;
    region?: string;
    postal?: string;
    asn?: string;
    tz?: string;
    referer?: string;
    lat?: string;
    lng?: string;
  } = {};
  try {
    b = await request.json();
  } catch {
    return ok();
  }

  const crawler = (b.crawler || "Unidentified crawler").slice(0, 60);
  const path = (b.path || "/").slice(0, 200);
  const ip = (b.ip || "").slice(0, 64);

  if (duplicate(`${crawler}|${ip}|${path}`)) return ok();

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  after(async () => {
    try {
      const place = [b.city, b.region, b.country].filter(Boolean).join(", ");
      const located = b.postal ? `${place} · ${b.postal}` : place || "Unknown location";

      if (token && chatId) {
        const lines = [
          `🕷️ <b>${esc(crawler)}</b> fetched a page`,
          `📄 ${esc(path)}`,
          `📍 ${esc(located)}`,
          b.asn ? `🏢 AS${esc(b.asn)}` : "",
          ip ? `🌐 <code>${esc(ip)}</code>` : "",
          b.referer ? `↩️ ${esc(b.referer.slice(0, 200))}` : "",
          b.tz ? `🕒 ${esc(b.tz)}` : "",
          `🤖 <code>${esc((b.ua || "").slice(0, 300))}</code>`,
          "",
          // Worth saying plainly: this is the shape of hit a link preview makes,
          // which is what happens moments after a résumé link is shared.
          `<i>No journey to follow — a crawler fetches once and leaves.</i>`,
        ].filter(Boolean);

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: lines.join("\n"),
            parse_mode: "HTML",
            // Quietly, so a crawl at 3am does not wake anyone.
            disable_notification: true,
            disable_web_page_preview: true,
          }),
        });
      }

      if (dbConfigured()) {
        await saveVisit({
          // Distinct prefix so a crawler row can never be mistaken for a visit
          // id from the notifier.
          id: `crawl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
          endedAt: new Date(),
          totalMs: 0,
          activeMs: 0,
          pageCount: 1,
          paths: [path],
          entryPath: path,
          exitPath: path,
          ip: ip || null,
          country: b.country || null,
          region: b.region || null,
          city: b.city || null,
          postal: b.postal || null,
          asn: b.asn && /^\d+$/.test(b.asn) ? Number(b.asn) : null,
          network: b.asn ? `AS${b.asn}` : null,
          timezone: b.tz || null,
          userAgent: (b.ua || "").slice(0, 400),
          device: crawler,
          referrer: b.referer || null,
          source: crawler,
          // Its own verdict, so the dashboard can separate "a scraper pretending
          // to be a browser" from "a link preview that announced itself".
          botVerdict: "crawler",
          botReason: crawler,
          interacted: false,
          isBounce: true,
          lat: b.lat ? Number(b.lat) : null,
          lng: b.lng ? Number(b.lng) : null,
        });
      }
    } catch {
      // A crawler alert is worth strictly less than a served page.
    }
  });

  return ok();
}
