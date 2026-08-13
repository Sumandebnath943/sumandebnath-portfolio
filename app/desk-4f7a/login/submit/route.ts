import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_PATH, SESSION_COOKIE, createSession, sessionCookieOptions, verifyPassword } from "@/lib/auth";

// scrypt is intentionally slow, so this route needs room to breathe.
export const maxDuration = 15;
export const dynamic = "force-dynamic";

// Attempts per IP. In-memory, so on serverless this is per instance and
// therefore best-effort — the same caveat as the tracker's limiter. It exists
// to blunt rapid guessing, not to be a wall; the real cost to an attacker is
// scrypt taking ~80ms per try.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, number[]>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  if (attempts.size > 2_000) attempts.clear();
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

function back(request: NextRequest, reason: string) {
  const url = request.nextUrl.clone();
  url.pathname = `${ADMIN_PATH}/login`;
  url.search = `?e=${reason}`;
  // 303 so the browser follows with GET and the password is not resubmitted on
  // refresh.
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const ip =
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (tooMany(ip)) return back(request, "rate");

  let password = "";
  try {
    const form = await request.formData();
    password = String(form.get("password") || "");
  } catch {
    return back(request, "1");
  }

  if (!verifyPassword(password)) return back(request, "1");

  // Clean slate on success, so a correct login is not locked out by earlier
  // fumbled attempts from the same address.
  attempts.delete(ip);

  const url = request.nextUrl.clone();
  url.pathname = ADMIN_PATH;
  url.search = "";
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(SESSION_COOKIE, createSession(), sessionCookieOptions());
  return res;
}
