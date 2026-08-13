import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_PATH, SESSION_COOKIE, authConfigured, verifySession } from "@/lib/auth";

// Gate for the visitor dashboard. Everything under ADMIN_PATH needs a valid
// session cookie; the login page and its form handler are the two exceptions,
// or there would be no way in.
//
// Only an HMAC check happens here — no password hashing, no database. This runs
// on every request to the dashboard and must stay cheap.

const LOGIN_PATH = `${ADMIN_PATH}/login`;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`);

  // Missing secrets must lock the door, not leave it open. Without this, a
  // deploy that lost its env vars would serve every visitor record to anyone.
  if (!authConfigured()) {
    return new NextResponse("Not found", { status: 404, headers: noIndex() });
  }

  if (isLogin) {
    const res = NextResponse.next();
    applyNoIndex(res);
    return res;
  }

  if (!verifySession(request.cookies.get(SESSION_COOKIE)?.value)) {
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

// Kept out of robots.txt on purpose — that file is public, and listing the path
// there would advertise exactly what it is meant to keep quiet. A header tells
// crawlers without telling everyone.
function noIndex() {
  return { "X-Robots-Tag": "noindex, nofollow, noarchive" };
}
function applyNoIndex(res: NextResponse) {
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  // Visitor records should not sit in a shared cache anywhere along the way.
  res.headers.set("Cache-Control", "no-store, max-age=0");
}

export const config = {
  // Scoped tightly: without a matcher this would run on every request to the
  // site, including static assets.
  //
  // Written out rather than built from ADMIN_PATH because the matcher is read
  // statically at build time and cannot see an imported constant. If the path
  // ever changes, both this and ADMIN_PATH in lib/auth.ts have to change — and
  // getting that wrong leaves the dashboard ungated, so there is a test for it.
  matcher: ["/desk-4f7a", "/desk-4f7a/:path*"],
};
