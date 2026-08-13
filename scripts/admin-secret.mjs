#!/usr/bin/env node
// Generates the two secrets the visitor dashboard needs.
//
//   node scripts/admin-secret.mjs
//
// Everything happens on this machine. The password is read with the terminal
// echo turned off, is never written to disk, never reaches the shell history,
// and is never stored anywhere — only a scrypt hash of it is printed, and a
// hash cannot be turned back into the password.
//
// Paste the two printed lines into .env.local and into Vercel. Do not paste
// them into a chat, an issue, or a commit.

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

// Deliberately costly, so guessing at the hash offline stays slow even if the
// hash ever leaks. Roughly 100ms per attempt on a normal laptop.
// N=32768, r=8 needs 128*N*r = 32MB, which is exactly Node's default maxmem —
// so it has to be raised or scrypt refuses the parameters outright.
const PARAMS = { N: 1 << 15, r: 8, p: 1 };
const MAXMEM = 64 * 1024 * 1024;
const KEYLEN = 64;

const CTRL_C = String.fromCharCode(3);
const BACKSPACE = String.fromCharCode(127);

// Whatever arrived after the newline of the line we just returned. A paste, or
// piped input, delivers every line in a single chunk — without holding the
// remainder here, the next prompt sits waiting for input that already arrived.
let pending = "";

function takeLine() {
  const i = pending.search(/[\r\n]/);
  if (i === -1) return null;
  const line = pending.slice(0, i);
  let rest = pending.slice(i + 1);
  if (pending[i] === "\r" && rest[0] === "\n") rest = rest.slice(1);
  pending = rest;
  return line;
}

// Read one line from stdin without echoing it. Done against the raw stream
// rather than readline, which holds stdin open between questions and leaves a
// second prompt unresolved.
function readSecret(prompt) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    const tty = Boolean(stdin.isTTY);
    process.stdout.write(prompt);

    const buffered = takeLine();
    if (buffered !== null) {
      process.stdout.write("\n");
      return resolve(buffered);
    }

    let value = "";
    if (tty) stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    const done = (result) => {
      if (tty) stdin.setRawMode(false);
      stdin.removeListener("data", onData);
      stdin.removeListener("end", onEnd);
      stdin.pause();
      process.stdout.write("\n");
      resolve(result);
    };

    // Input ending without a trailing newline is still a password.
    const onEnd = () => done(value);

    const onData = (chunk) => {
      const s = String(chunk);
      for (let i = 0; i < s.length; i++) {
        const ch = s[i];

        if (ch === "\r" || ch === "\n") {
          let rest = s.slice(i + 1);
          if (ch === "\r" && rest[0] === "\n") rest = rest.slice(1);
          pending += rest;
          return done(value);
        }

        if (ch === CTRL_C) {
          // Leave the terminal as we found it rather than wedged in raw mode.
          if (tty) stdin.setRawMode(false);
          process.stdout.write("\n");
          process.exit(130);
        }

        if (ch === BACKSPACE || ch === "\b") {
          if (value.length) {
            value = value.slice(0, -1);
            if (tty) process.stdout.write("\b \b");
          }
          continue;
        }

        value += ch;
        if (tty) process.stdout.write("*");
      }
    };

    stdin.on("data", onData);
    stdin.on("end", onEnd);
  });
}

function hash(password) {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, KEYLEN, { ...PARAMS, maxmem: MAXMEM });
  return `scrypt$${PARAMS.N}$${PARAMS.r}$${PARAMS.p}$${salt.toString("hex")}$${derived.toString("hex")}`;
}

// Proves the stored hash actually validates before you rely on it.
function verify(password, stored) {
  const [scheme, N, r, p, saltHex, hashHex] = stored.split("$");
  if (scheme !== "scrypt") return false;
  const derived = scryptSync(password, Buffer.from(saltHex, "hex"), KEYLEN, {
    N: Number(N),
    r: Number(r),
    p: Number(p),
    maxmem: MAXMEM,
  });
  return timingSafeEqual(derived, Buffer.from(hashHex, "hex"));
}

function fail(message) {
  console.error(`\n${message}\n`);
  process.exit(1);
}

const pw = await readSecret("Choose a dashboard password: ");
if (pw.length < 12) {
  fail(
    "Too short. Use at least 12 characters — this is the only thing standing\n" +
      "between the internet and every visitor record you hold.",
  );
}

const again = await readSecret("Type it again: ");
if (pw !== again) fail("Those did not match. Nothing was generated — run it again.");

const stored = hash(pw);
if (!verify(pw, stored)) fail("The hash failed to verify against the password. Do not use this output.");

console.log(`
Verified. Add these two lines to .env.local, and the same two to Vercel
(Project -> Settings -> Environment Variables -> Production).

ADMIN_PASSWORD_HASH=${stored}
ADMIN_SESSION_SECRET=${randomBytes(32).toString("hex")}

Keep the password in your password manager. It cannot be recovered from the
hash — if you lose it, run this again to set a new one.
`);
