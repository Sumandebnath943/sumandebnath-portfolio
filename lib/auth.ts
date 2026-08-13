import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
// Repeated rather than imported from lib/admin-path.ts, which is the source of
// truth. Importing across modules here would drag this file — and node:crypto
// with it — into anything that only wanted the path. The three copies (here,
// lib/admin-path.ts, and the matcher in proxy.ts) are asserted to agree by
// test, because a mismatch would silently leave the dashboard ungated.
export const ADMIN_PATH = "/desk-4f7a";

// Auth for the visitor dashboard. One password, one cookie, no user accounts —
// there is exactly one person who should ever get in.
//
// The split matters: verifying the password is deliberately slow (scrypt, ~80ms)
// and happens only at login, while every page load checks a cheap HMAC. Putting
// scrypt in the request path would hand anyone a way to burn CPU at will.

export const SESSION_COOKIE = "sd_admin";

// Long enough not to be a nuisance, short enough that a forgotten open tab on
// some other machine does not stay valid for weeks.
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

// scrypt at N=32768, r=8 needs 32MB, which is exactly Node's default ceiling —
// it refuses the parameters outright unless this is raised.
const MAXMEM = 64 * 1024 * 1024;
const KEYLEN = 64;

function equal(a: Buffer, b: Buffer): boolean {
  // timingSafeEqual throws on a length mismatch, which would itself leak length.
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Check a password against ADMIN_PASSWORD_HASH, in the
 * `scrypt$N$r$p$salt$hash` form written by scripts/admin-secret.mjs.
 *
 * Returns false for anything malformed rather than throwing, so a mangled or
 * missing env var locks the door instead of crashing the route open.
 */
export function verifyPassword(password: string): boolean {
  const stored = process.env.ADMIN_PASSWORD_HASH || "";
  if (!stored || !password) return false;
  try {
    const [scheme, N, r, p, saltHex, hashHex] = stored.split("$");
    if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
    const derived = scryptSync(password, Buffer.from(saltHex, "hex"), KEYLEN, {
      N: Number(N),
      r: Number(r),
      p: Number(p),
      maxmem: MAXMEM,
    });
    return equal(derived, Buffer.from(hashHex, "hex"));
  } catch {
    return false;
  }
}

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/**
 * A session is its own expiry plus a signature over it. Nothing is stored
 * server-side — there is no session table to keep, and rotating
 * ADMIN_SESSION_SECRET invalidates every outstanding session at once.
 */
export function createSession(): string {
  const payload = `${Date.now() + SESSION_TTL_MS}.${randomBytes(8).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySession(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  const i = token.lastIndexOf(".");
  if (i < 1) return false;
  const payload = token.slice(0, i);
  const given = token.slice(i + 1);
  try {
    // Signature first: an expired-but-authentic token and a forged one should
    // take the same path out.
    if (!equal(Buffer.from(sign(payload), "hex"), Buffer.from(given, "hex"))) return false;
    const expiry = Number(payload.split(".")[0]);
    return Number.isFinite(expiry) && Date.now() < expiry;
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true, // never readable from JavaScript
    secure: process.env.NODE_ENV === "production", // plain http on localhost only
    sameSite: "strict" as const, // not sent on any cross-site navigation
    path: ADMIN_PATH, // never sent with ordinary page requests
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  };
}

/** Configured at all? Used to fail closed rather than open. */
export function authConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_SESSION_SECRET);
}
