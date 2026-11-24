import type { NextApiRequest } from "next";

const RATE_WINDOW_MS = 60_000;
const RATE_MAP_MAX = 5_000;
const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|axios|python-requests|curl|wget|go-http|scrapy|httpclient/i;

export function chatRequestAllowed({ headers }: NextApiRequest) {
  if (BOT_UA.test(headers["user-agent"] || "")) return false;
  if (!headers.origin) return true;
  try {
    return new URL(headers.origin).host === headers.host;
  } catch {
    return false;
  }
}

export function createChatLimits(rateMax: number, dailyMax: number) {
  const addresses = new Map<string, { count: number; windowStart: number }>();
  let dailyStamp = "";
  let dailyCount = 0;

  function isRateLimited(req: NextApiRequest) {
    const forwarded = req.headers["x-forwarded-for"];
    const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0].trim() ||
      req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const record = addresses.get(ip);
    if (record && now - record.windowStart <= RATE_WINDOW_MS) {
      if (record.count >= rateMax) return true;
      record.count += 1;
      return false;
    }
    if (!record && addresses.size >= RATE_MAP_MAX) {
      for (const [address, entry] of addresses) {
        if (now - entry.windowStart > RATE_WINDOW_MS) addresses.delete(address);
      }
      const oldest = addresses.keys().next();
      if (addresses.size >= RATE_MAP_MAX && !oldest.done) addresses.delete(oldest.value);
    }
    addresses.delete(ip);
    addresses.set(ip, { count: 1, windowStart: now });
    return false;
  }

  function overDailyCap() {
    const today = new Date().toISOString().slice(0, 10);
    if (today !== dailyStamp) {
      dailyStamp = today;
      dailyCount = 0;
    }
    if (dailyCount >= dailyMax) return true;
    dailyCount += 1;
    return false;
  }

  return { isRateLimited, overDailyCap };
}
