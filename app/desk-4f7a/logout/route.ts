import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_PATH, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

// POST only. A GET would let any image or link on another page sign you out.
export async function POST(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `${ADMIN_PATH}/login`;
  url.search = "";
  const res = NextResponse.redirect(url, 303);
  // Same attributes as when it was set, or the browser keeps the old cookie.
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return res;
}
