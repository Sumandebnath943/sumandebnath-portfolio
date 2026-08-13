import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_PATH, SESSION_COOKIE, authConfigured, internalKey, verifySession } from "@/lib/auth";
import { identifyCrawler, isPageRequest } from "@/lib/crawler";

// Two unrelated jobs, both of which have to happen before a page is served.
//
// 1. Gate the dashboard. Everything under ADMIN_PATH needs a valid session
//    cookie; the login page and its handler are the exceptions.
// 2. Notice crawlers. A link preview fetches HTML and never runs JavaScript, so
//    the visitor notifier cannot see it at all. This is the only place that can.
//
// The ordinary visitor path through here does one regex against the user agent
// and returns. No database, no crypto, no awaiting anything — the cost of the
// crawler feature falls entirely on crawlers.

const LOGIN_PATH = `${ADMIN_PATH}/login`;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`)) {
    return gateDashboard(request, pathname);
  }

  // Everything below is the public site.
  const ua = request.headers.get("user-agent") || "";
  const crawler = isPageRequest(pathname) ? identifyCrawler(ua) : null;
  if (!crawler) return NextResponse.next(); // the overwhelmingly common case

  await reportCrawler(request, pathname, ua, crawler);
  return NextResponse.next();
}

function gateDashboard(request: NextRequest, pathname: string) {
  const isLogin = pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`);

  // Missing secrets must lock the door, not leave it open. Without this, a
  // deploy that lost its env vars would serve every visitor record to anyone.
  if (!authConfigured()) {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
    });
  }

  if (!isLogin && !verifySession(request.cookies.get(SESSION_COOKIE)?.value)) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = "";
    const res = NextResponse.redirect(url);
    applyNoIndex(res);
    return res;
  }

  const res = NextResponse.next();
  applyNoIndex(res);
  return res;
}

/**
 * Hand the sighting to /api/crawl, which owns the Telegram message and the row.
 *
 * Done as a call rather than inline so the database driver never has to be
 * bundled into a proxy that runs on every request. Awaited, because work started
 * and not awaited here may be killed when the response is returned — but the
 * timeout is short and only a crawler ever waits on it.
 */
async function reportCrawler(request: NextRequest, pathname: string, ua: string, crawler: string) {
  try {
    const h = request.headers;
    await fetch(new URL("/api/crawl", request.nextUrl.origin), {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-crawl-key": internalKey() },
      body: JSON.stringify({
        crawler,
        ua,
        path: pathname,
        ip: (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "",
        country: h.get("x-vercel-ip-country") || "",
        region: h.get("x-vercel-ip-country-region") || "",
        city: decodeURIComponent(h.get("x-vercel-ip-city") || ""),
        postal: h.get("x-vercel-ip-postal-code") || "",
        asn: h.get("x-vercel-ip-as-number") || "",
        tz: h.get("x-vercel-ip-timezone") || "",
        lat: h.get("x-vercel-ip-latitude") || "",
        lng: h.get("x-vercel-ip-longitude") || "",
        referer: h.get("referer") || "",
      }),
      signal: AbortSignal.timeout(2_000),
    });
  } catch {
    // Never let a missed alert cost a crawler its page — that page is how the
    // link preview gets built in the first place.
  }
}

// Kept out of robots.txt on purpose — that file is public, and listing the path
// there would advertise exactly what it is meant to keep quiet.
function applyNoIndex(res: NextResponse) {
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  // Visitor records should not sit in a shared cache anywhere along the way.
  res.headers.set("Cache-Control", "no-store, max-age=0");
}

export const config = {
  // Now the whole site, because a crawler can arrive anywhere — but with static
  // assets, image optimisation and the API routes excluded. Without that
  // exclusion this would run against every font and script on every page load.
  //
  // /desk-4f7a is covered by the catch-all; the handler branches on it. The
  // matcher is read statically at build time and cannot see an imported
  // constant, so ADMIN_PATH in lib/auth.ts and the branch above are what keep
  // the gate honest — and there is a test asserting they agree.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]{2,5}$).*)"],
};
