// The dashboard's URL, on its own so both server and client can read it.
//
// lib/auth.ts imports node:crypto, so a client component that needed the path
// from there would drag the whole crypto module into the browser bundle. Keep
// this file free of imports.
//
// The proxy matcher in proxy.ts repeats this literally — matchers are read
// statically at build time and cannot see a constant. Change one, change both.
export const ADMIN_PATH = "/desk-4f7a";
