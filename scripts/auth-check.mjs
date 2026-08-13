#!/usr/bin/env node
// Exercises the dashboard's auth primitives, including every way they must fail.
//
//   node scripts/auth-check.mjs        (run from the project root)
//
// Uses a throwaway password and secret of its own — it never reads .env.local
// and never touches a real credential.
//
// The last block matters most: the dashboard path is written out in three
// places (lib/auth.ts, lib/admin-path.ts, and the matcher in proxy.ts) because
// a Next matcher is read statically and cannot see an imported constant. If
// those ever drift apart the gate stops covering the route and the dashboard
// is served to anyone. That is checked here rather than trusted.

import { createHmac, scryptSync } from "node:crypto";

const PASSWORD = "correct-horse-battery";
const SALT = "00112233445566778899aabbccddeeff";
const derived = scryptSync(PASSWORD, Buffer.from(SALT, "hex"), 64, {
  N: 1 << 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024,
});
process.env.ADMIN_PASSWORD_HASH = `scrypt$32768$8$1$${SALT}$${derived.toString("hex")}`;
process.env.ADMIN_SESSION_SECRET = "a".repeat(64);

const auth = await import("../lib/auth.ts");

let pass = 0, fail = 0;
const check = (label, got, want) => {
  const ok = got === want;
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(52)}${ok ? "" : ` got ${got} want ${want}`}`);
};

console.log("--- password ---");
check("correct password accepted", auth.verifyPassword(PASSWORD), true);
check("wrong password rejected", auth.verifyPassword("correct-horse-batteryy"), false);
check("empty password rejected", auth.verifyPassword(""), false);
check("case change rejected", auth.verifyPassword("Correct-horse-battery"), false);

const realHash = process.env.ADMIN_PASSWORD_HASH;
process.env.ADMIN_PASSWORD_HASH = "not-a-hash";
check("malformed hash locks out (no crash)", auth.verifyPassword(PASSWORD), false);
process.env.ADMIN_PASSWORD_HASH = "";
check("missing hash locks out", auth.verifyPassword(PASSWORD), false);
process.env.ADMIN_PASSWORD_HASH = realHash;

console.log("\n--- session ---");
const token = auth.createSession();
check("fresh session verifies", auth.verifySession(token), true);
check("undefined rejected", auth.verifySession(undefined), false);
check("empty rejected", auth.verifySession(""), false);
check("garbage rejected", auth.verifySession("nonsense"), false);

const [expPart, noncePart, sigPart] = token.split(".");
check("flipped signature rejected",
  auth.verifySession(`${expPart}.${noncePart}.${sigPart.slice(0, -1)}${sigPart.at(-1) === "a" ? "b" : "a"}`), false);
check("extended expiry rejected",
  auth.verifySession(`${Number(expPart) + 999999}.${noncePart}.${sigPart}`), false);
check("signature stripped rejected", auth.verifySession(`${expPart}.${noncePart}.`), false);

// Authentically signed, but already expired.
const past = `${Date.now() - 1000}.deadbeefdeadbeef`;
const pastSig = createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(past).digest("hex");
check("expired-but-signed rejected", auth.verifySession(`${past}.${pastSig}`), false);

// A token minted under a different secret must not survive rotation.
const other = createHmac("sha256", "b".repeat(64)).update(`${Date.now() + 60000}.abcd`).digest("hex");
check("foreign secret rejected", auth.verifySession(`${Date.now() + 60000}.abcd.${other}`), false);

const realSecret = process.env.ADMIN_SESSION_SECRET;
process.env.ADMIN_SESSION_SECRET = "";
check("missing secret rejects everything", auth.verifySession(token), false);
process.env.ADMIN_SESSION_SECRET = realSecret;

console.log("\n--- cookie + config ---");
const o = auth.sessionCookieOptions();
check("httpOnly", o.httpOnly, true);
check("sameSite strict", o.sameSite, "strict");
check("scoped to admin path", o.path, auth.ADMIN_PATH);
check("authConfigured true when both set", auth.authConfigured(), true);
process.env.ADMIN_SESSION_SECRET = "";
check("authConfigured false when one missing", auth.authConfigured(), false);
process.env.ADMIN_SESSION_SECRET = realSecret;

console.log("\n--- the three copies of the path must agree ---");
const fs = await import("node:fs");
const proxySrc = fs.readFileSync("proxy.ts", "utf8");
const pathSrc = fs.readFileSync("lib/admin-path.ts", "utf8");
const literal = (src) => (src.match(/"(\/[a-z0-9-]+)"/) || [])[1];

check("matcher contains the exact path", proxySrc.includes(`"${auth.ADMIN_PATH}"`), true);
check("matcher covers subpaths", proxySrc.includes(`"${auth.ADMIN_PATH}/:path*"`), true);
check("lib/admin-path.ts agrees", literal(pathSrc), auth.ADMIN_PATH);

// A route folder that does not match the matcher is an ungated dashboard.
check("route folder exists at that path", fs.existsSync(`app${auth.ADMIN_PATH}/page.tsx`), true);
check("login route exists", fs.existsSync(`app${auth.ADMIN_PATH}/login/page.tsx`), true);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
