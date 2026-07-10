// AEGIS VAULT — case-study page content.
// Kept separate from the page so copy can be edited without touching layout.
// Source narrative: docs/PORTFOLIO_HANDOFF.md in the notepad project.

export const AEGIS = {
  bg: "#050505",
  panel: "#0A0A0C",
  panel2: "#0C0C11",
  line: "rgba(255,255,255,0.08)",
  lineSoft: "rgba(255,255,255,0.06)",
  lime: "#8FE04E",
  emerald: "#22C55E",
  teal: "#2DD4BF",
  amber: "#F5BF4F",
  text: "#F5F5F7",
  muted: "rgba(255,255,255,0.62)",
  faint: "rgba(255,255,255,0.42)",
} as const;

export const LIVE_URL = "https://aegisnote.houseofnamus.com/";

/* Hero primitive badges */
export const BADGES = [
  "Argon2id",
  "AES-256-GCM",
  "Envelope Encryption",
  "Zero-Knowledge",
  "Row-Level Security",
  "httpOnly Sessions",
];

/* Section 3 — user-facing features. `icon` is a 24×24 stroke path. */
export const FEATURES: { title: string; body: string; icon: string }[] = [
  {
    title: "Client-side encryption",
    body: "Create, edit and delete notes with auto-save — every note is encrypted in your browser before it is ever stored.",
    icon: "M12 2 4 5v6c0 5 3.4 8.3 8 11 4.6-2.7 8-6 8-11V5l-8-3Z",
  },
  {
    title: "Two-password model",
    body: "A login password for your account and session, and a separate master password that decrypts your notes.",
    icon: "M2 12h20M6 8v8M18 8v8M10 5v14M14 5v14",
  },
  {
    title: "Multi-device by design",
    body: "Log in on any device, enter your master password, and your notes decrypt — nothing device-specific is stored.",
    icon: "M4 6h16v10H4zM2 20h20M9 16v4M15 16v4",
  },
  {
    title: "Auto-lock",
    body: "Keys are wiped from memory after inactivity, when the tab is hidden, or on logout — re-entry of the master password is required.",
    icon: "M7 11V8a5 5 0 0 1 10 0v3M5 11h14v9H5zM12 15v2",
  },
  {
    title: "Strength enforcement",
    body: "A live checklist requires 16+ characters with mixed case, numbers and symbols before a vault can be created.",
    icon: "M9 12l2 2 4-4M12 2 4 5v6c0 5 3.4 8.3 8 11 4.6-2.7 8-6 8-11V5l-8-3Z",
  },
  {
    title: "Rotation without re-encrypting",
    body: "Rotate your master password without re-encrypting every note — the envelope pattern re-wraps one key, not the data.",
    icon: "M21 2v6h-6M3 22v-6h6M21 8a9 9 0 0 0-15-3M3 16a9 9 0 0 0 15 3",
  },
  {
    title: "Tamper detection",
    body: "Notes are authenticated with AES-GCM; any modification to the ciphertext is detected the moment it is decrypted.",
    icon: "M12 2 4 5v6c0 5 3.4 8.3 8 11 4.6-2.7 8-6 8-11V5l-8-3ZM9 12h6M12 9v6",
  },
];

/* Section 4 — envelope-encryption flow, rendered as an SVG diagram. */
export const ENVELOPE: { key: string; sub: string; note: string; accent: keyof typeof AEGIS }[] = [
  {
    key: "Master Password",
    sub: "typed by you",
    note: "The only secret. Never leaves the browser, never stored anywhere.",
    accent: "text",
  },
  {
    key: "Argon2id",
    sub: "64 MB · 3 iterations · unique salt",
    note: "A deliberately slow, memory-hard key-derivation function — brute-force is expensive.",
    accent: "teal",
  },
  {
    key: "Master Key",
    sub: "derived, in-memory only",
    note: "Wraps (encrypts) the data key. Dropped from memory on auto-lock.",
    accent: "emerald",
  },
  {
    key: "Data Encryption Key",
    sub: "random 256-bit · stored only as ciphertext",
    note: "A full-entropy key that protects your notes even if your password is weak.",
    accent: "lime",
  },
  {
    key: "Each note",
    sub: "AES-256-GCM · unique nonce per note",
    note: "Authenticated encryption — confidential and tamper-evident.",
    accent: "text",
  },
];

/* Section 5 — challenges & decisions (the differentiator). */
export const CHALLENGES: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Designing a genuine zero-knowledge model",
    body: "Rather than “double AES” or hand-rolled crypto, I used envelope encryption so the master password can be rotated without re-encrypting every note — and so notes are protected by a full-entropy random key even when a user's password is weak.",
  },
  {
    n: "02",
    title: "Migrating the backend from SQLite to Supabase",
    body: "The first build used SQLite + Prisma, which can't run on serverless hosting. I migrated to Supabase Auth + Postgres + Row-Level Security, moving user isolation out of application code and into the database itself — defense in depth.",
  },
  {
    n: "03",
    title: "Closing an XSS session-theft gap",
    body: "A browser-side Supabase client keeps the session token in JS-readable storage. I re-architected to be server-mediated with @supabase/ssr, putting the session in an httpOnly cookie page scripts can never read — while keeping RLS enforcement intact.",
  },
  {
    n: "04",
    title: "Keeping keys out of persistence",
    body: "The Master Key and Data Encryption Key live only in memory, are zeroed after use, and are dropped on auto-lock — never in localStorage, sessionStorage, or cookies.",
  },
  {
    n: "05",
    title: "Security-first UX",
    body: "A live password-policy checklist, an entropy meter and auto-lock make the right behaviour the default — because password strength is the real weak point in any zero-knowledge system.",
  },
];

/* Section 6 — takeaways. */
export const LEARNINGS: { title: string; body: string }[] = [
  { title: "Applied cryptography in practice", body: "KDFs (Argon2id) vs. hashing, authenticated encryption (AES-GCM), nonces and salts, and envelope / key-wrapping patterns." },
  { title: "Threat modeling", body: "Reasoning about what a database breach, an XSS, or a compromised device can and cannot reach — and designing so the worst case yields only ciphertext." },
  { title: "“Encrypted” vs. “zero-knowledge”", body: "Why where the keys live matters more than which cipher you pick." },
  { title: "Auth & session security", body: "httpOnly cookies vs. localStorage, server-mediated access, and Postgres Row-Level Security as database-enforced authorization." },
  { title: "Full-stack Next.js", body: "App Router, Route Handlers, middleware, and a clean split between a browser fetch client and server-side data access." },
  { title: "Explicit trade-offs", body: "Self-hosted vs. managed, database-enforced vs. app-enforced isolation, complexity vs. security — and documenting the why." },
];

/* Section 7 — stat strip. `num` drives the count-up; text before/after wraps it. */
export const STATS: { num: number; prefix?: string; suffix?: string; label: string }[] = [
  { num: 0, label: "bytes of plaintext or keys the server ever sees" },
  { num: 256, suffix: "-bit", label: "AES-GCM authenticated encryption" },
  { num: 64, prefix: "", suffix: " MB", label: "Argon2id memory cost · 3 iterations" },
  { num: 2, label: "independent passwords — login vs. master" },
  { num: 100, suffix: "%", label: "of encryption/decryption performed client-side" },
];

/* Architecture / stack, grouped. */
export const STACK: { group: string; items: string }[] = [
  { group: "Frontend", items: "Next.js 16 (App Router), React 19, TypeScript, Tailwind + shadcn/ui, framer-motion, Zustand" },
  { group: "Crypto", items: "Web Crypto API (AES-256-GCM) + hash-wasm (Argon2id) — audited, standard primitives, no custom crypto" },
  { group: "Backend", items: "Supabase — Auth for login, Postgres for storage, Row-Level Security for per-user isolation" },
  { group: "Sessions", items: "Server-mediated via @supabase/ssr — the auth token lives in an httpOnly cookie JS can't read" },
  { group: "Hosting", items: "Vercel (app) + Supabase (data), with real environment & secret management" },
  { group: "Hardening", items: "Strict Content-Security-Policy, HSTS, X-Frame-Options, timing-safe auth, server-enforced minimum KDF strength" },
];

/* Screenshot gallery. Dimensions are the real pixel sizes of each PNG. */
export const SHOTS: { src: string; label: string; alt: string; w: number; h: number }[] = [
  { src: "/aegis-vault/auth.png", label: "Create vault", alt: "Initialize your vault screen with a live master-password strength checklist and entropy meter", w: 401, h: 720 },
  { src: "/aegis-vault/editor.png", label: "Encrypted editor", alt: "The notes editor showing an ENCRYPTED chip and an AES-256-GCM session badge", w: 1363, h: 767 },
  { src: "/aegis-vault/locked.png", label: "Auto-lock", alt: "Vault-locked screen prompting for the master key, with keys cleared from memory", w: 1365, h: 767 },
  { src: "/aegis-vault/settings.png", label: "Security settings", alt: "Security settings dialog configuring auto-lock inactivity timing", w: 506, h: 255 },
];
