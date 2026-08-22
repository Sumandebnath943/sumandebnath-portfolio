/* ═══════════════════════════════════════════════════════════════════════════
 *  Banking Co-pilot — page content
 *
 *  Every figure here is taken from the product repo's own docs
 *  (PORTFOLIO_HANDOFF.md §5, SECURITY_POSTURE.md, HANDOFF.md), verified
 *  2026-08-22. Nothing is rounded up. If the product moves, re-check §5 of
 *  its handoff before editing a number in this file.
 * ═══════════════════════════════════════════════════════════════════════════ */

export const LIVE_URL = "https://bankingcopilot.houseofnamus.com";

/* ── Palette ───────────────────────────────────────────────────────────────
   The product's own brand is petrol blue + brass on white. That palette is
   inverted here for the portfolio's black ground: petrol lifts to a readable
   sky step, brass to its light step.

   The product's rule travels with the colours — brand hues stay out of the
   red/amber/green band, because in a product about explainable risk those
   three carry meaning (risk bands, health scores, KYC state). `risk` and `ok`
   below exist only for the two places where a status is genuinely being
   shown.                                                                     */
export const BANK = {
  bg: "#070E14",
  panel: "#0C1620",
  panelLift: "#101E2A",
  line: "rgba(255,255,255,0.09)",
  lineSoft: "rgba(255,255,255,0.055)",

  petrol: "#4FA3D8",      // brand, lifted for a dark ground
  petrolDeep: "#22608A",
  brass: "#D9A961",       // accent — the "pointing" colour
  brassDeep: "#C08B3E",

  text: "#E6EEF5",
  muted: "#93A7B7",
  faint: "#5D7183",

  risk: "#F1655B",        // status only, never brand
  ok: "#3FBF8F",
} as const;

/* ── Hero ──────────────────────────────────────────────────────────────── */
export const BADGES = [
  "Next.js 16",
  "Auth.js v5",
  "Supabase pgvector",
  "Groq + Gemini",
  "38 security tests",
  "Synthetic data",
];

/* ── Numbers ───────────────────────────────────────────────────────────────
   PORTFOLIO_HANDOFF.md §5, as of 2026-08-22.

   StatCounter has no thousands separator, so the TypeScript line count is
   carried as 12.3K rather than as a bare 12300 that would read as a typo.    */
export const STATS = [
  { num: 12, label: "modules across customer, decisioning, assistant and operations" },
  { num: 18, label: "API routes, every one session-gated" },
  { num: 12.3, decimals: 1, suffix: "K", approx: true, label: "lines of TypeScript, 0 type errors" },
  { num: 38, label: "security tests passing — 21 unit, 17 live integration" },
  { num: 5, label: "security phases, driven by 3 independent audits" },
];

/* ── The hero capture ──────────────────────────────────────────────────────
   Customer 360 is the product's own designated hero shot (its handoff §8), so
   it lives here rather than in FLAGSHIP — otherwise the page would render the
   same screenshot twice.                                                     */
export const HERO_SHOT = {
  src: "/banking-copilot/customer-360.webp",
  alt:
    "Banking Co-pilot Customer 360 dashboard showing a customer's profile, monthly income, savings, investments, outstanding debt, accounts held and recent transactions",
};

/* ── The modules worth demonstrating ───────────────────────────────────────
   Chosen because they are the hard ones to build, not because they photograph
   well. The captures are the product's own, at a fixed 1440x950 viewport off a
   production build.                                                          */
export const FLAGSHIP = [
  {
    n: "01",
    title: "Explainable AI",
    sub: "Which factor moved the decision, and by how much",
    body:
      "SHAP-style feature attribution over the loan decision: a force plot from base rate to final probability, and a waterfall naming every contributing factor. This is what makes an approval defensible six months later, in front of someone who was not in the room.",
    src: "/banking-copilot/explainable-ai.webp",
    alt:
      "Explainable AI module showing an Approve decision at 98% confidence, a base-to-final force plot, and a feature attribution waterfall ranking CIBIL score, monthly income, EMI burden and credit utilisation",
  },
  {
    n: "02",
    title: "Financial Health Score",
    sub: "0–900, defensible point by point",
    body:
      "Six weighted factors — savings ratio, credit utilisation, EMI burden, financial stability, product diversification, digital engagement — each with its own weight, band and contribution. Deterministic: the same inputs always produce the same score.",
    src: "/banking-copilot/health-score.webp",
    alt:
      "Financial Health Score module showing a 585/900 score rated Fair, a six-axis radar of factor breakdown, and per-factor cards with weights and contributions",
  },
  {
    n: "03",
    title: "Risk Prediction",
    sub: "12-month default probability with named drivers",
    body:
      "A default probability, an SMA stage, and an attribution chart splitting what raises the risk from what mitigates it. Red, amber and green appear here on purpose — in this product they are reserved for meaning, which is why the brand is petrol and brass instead.",
    src: "/banking-copilot/risk.webp",
    alt:
      "Risk Prediction module showing a 2.0% twelve-month default probability rated Low, a risk gauge, an RM recommendation, and a risk-driver attribution chart",
  },
];

/* ── The wider gallery ─────────────────────────────────────────────────── */
export const GALLERY = [
  {
    src: "/banking-copilot/next-best-action.webp",
    title: "Next Best Action",
    caption:
      "Prioritised P0–P3 recommendations across the whole book, each with its reason and its expected effect.",
    alt:
      "Next Best Action module listing six prioritised recommendations across a customer book, each with a rationale, a channel, a due window and an expected uplift",
  },
  {
    src: "/banking-copilot/analytics.webp",
    title: "Analytics",
    caption:
      "Portfolio KPIs and distributions. Total customers reads 6, not 24 — this RM is seeing her own book, and the scoping is visible in the numbers.",
    alt:
      "Analytics dashboard showing total AUM, six total customers, average health score and high-risk count, with customer-segment, lead-pipeline, health-score and risk-band distribution charts",
  },
  {
    src: "/banking-copilot/leads.webp",
    title: "Lead Qualification",
    caption:
      "A scored Kanban pipeline with auto-stage progression, from New through to Won or Lost.",
    alt:
      "Lead Qualification module showing a six-column Kanban pipeline — New, Qualified, Proposal, Negotiation, Won, Lost — with scored lead cards and stage totals",
  },
  {
    src: "/banking-copilot/schemes.webp",
    title: "Government Scheme Matcher",
    caption:
      "Eligibility matched across eight central welfare schemes, with the criteria met and missed shown per scheme.",
    alt:
      "Government Scheme Matcher showing eight central schemes ranked by match score, each with benefits, maximum subsidy and the eligibility criteria met or missed",
  },
];

/* ── The engineering stories ───────────────────────────────────────────── */
export const STORIES = [
  {
    n: "01",
    kicker: "Access control",
    title: "Returning 404 instead of 403",
    body: [
      "When a Relationship Manager requests a customer outside their own book, the API returns 404 Not Found — not 403 Forbidden.",
      "403 is the intuitive answer and it is the wrong one. “Forbidden” confirms the record exists. An attacker walking CUST-1001, CUST-1002, CUST-1003 learns the entire customer ID space from the difference between the two responses, without ever reading a record. Returning 404 for both “doesn't exist” and “not yours” makes those cases indistinguishable and the enumeration worthless.",
      "There is a second layer. Next.js has shipped middleware-authorization-bypass advisories, so authorization is never left to the edge proxy alone — every route handler re-checks. The pure predicates live in their own module, with no framework imports, so they can be unit-tested away from any request plumbing.",
    ],
  },
  {
    n: "02",
    kicker: "Where the AI is allowed",
    title: "The model deliberately does not decide",
    body: [
      "Every score in the product — health, risk, loan eligibility, lead quality, next best action — is computed by a deterministic engine. No language model touches any of them.",
      "That is a constraint, not a limitation. A bank cannot take a credit decision it is unable to reconstruct; “the model said so” does not survive an audit. Deterministic engines mean identical inputs always produce an identical score, every point is attributable to a named factor, and the reasoning still stands six months later.",
      "Language models are confined to the three jobs where language genuinely helps: conversation, synthesising a cited answer from retrieved policy, and reading a document image. In a field whose default move is to put an LLM in front of everything, choosing not to is the harder call.",
    ],
  },
  {
    n: "03",
    kicker: "Design",
    title: "Colour as information architecture",
    body: [
      "The brand palette is petrol blue and brass. Neither is red, amber, or green — and that is the whole point.",
      "In a product whose central claim is explainable risk, those three carry meaning: risk bands, health scores, KYC state. If the brand accent were also green, a user would have to work out whether a coloured element meant “brand” or “good”. So the status band is reserved for meaning and the brand sits outside it. Chart gridlines and axes are slate rather than brand-tinted for the same reason — they are structure, not signal.",
      "The palette carries an accessibility constraint in the token layer too. Brass is 3.0:1 on white, which fails WCAG AA for small text. Rather than lighten the brand, a separate darker step carries brass-coloured text at 4.8:1. The constraint resolves in the tokens instead of compromising the design.",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 *  SECURITY — the section this page is really for
 * ═══════════════════════════════════════════════════════════════════════════ */

/* Defence in depth: four layers, so no single weakness becomes a breach. */
export const LAYERS = [
  {
    n: "L1",
    title: "Edge proxy",
    accent: "petrol" as const,
    points: [
      "Session gating — no session, no data: 401 or a redirect to login",
      "Per-user rate limiting, returning 429 with Retry-After",
      "CSP, HSTS, frame-deny and nosniff on every single response",
    ],
    note: "Treated as a fast reject, never as the authority.",
  },
  {
    n: "L2",
    title: "In-handler authorization",
    accent: "brass" as const,
    points: [
      "Re-authenticates and re-authorizes inside every route handler",
      "Per-RM book scoping; 404-not-403 on out-of-book access",
      "Role gate — knowledge-base ingest and corpus writes are admin-only",
    ],
    note: "Pure decision logic, no framework imports, unit-tested in isolation.",
  },
  {
    n: "L3",
    title: "Data & AI protection",
    accent: "petrol" as const,
    points: [
      "PII masked at the boundary; raw OCR text redacted before it returns",
      "Retrieved policy and uploads treated as data, never as instructions",
      "Magic-byte upload validation with EXIF stripping",
      "Append-only audit trail behind every sensitive action",
    ],
    note: "Load, then authorize, then project — never filter after the fact.",
  },
  {
    n: "L4",
    title: "Platform",
    accent: "brass" as const,
    points: [
      "Supabase Row-Level Security on users, audit log and RAG chunks",
      "anon access revoked; the service-role key never leaves the server",
      "Build fails on type errors by design — currently 0",
    ],
    note: "Least privilege, all the way down to the database role.",
  },
];

/* The control catalogue, grouped the way a reviewer reads it. */
export const CONTROLS = [
  {
    group: "Authentication",
    icon: "M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6z",
    items: [
      "Auth.js v5, credentials provider, stateless JWT sessions",
      "bcrypt password hashing — never stored or logged in plaintext",
      "Timing-attack resistant: an unknown email still runs a bcrypt compare against a dummy hash, so response time never reveals whether an account exists",
      "HttpOnly, Secure, SameSite cookies — which also gives baseline CSRF protection",
      "Four roles: rm, manager, compliance, admin",
    ],
  },
  {
    group: "Authorization & IDOR",
    icon: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
    items: [
      "Per-RM data isolation — an RM reaches only the customers in their own book",
      "404, not 403, on out-of-book access, so customer ids cannot be enumerated",
      "List endpoints filter through a single scoping function: portfolio, analytics, leads and next-best-actions are all restricted together",
      "Load-then-authorize-then-project, so a full record is never returned and trimmed afterwards",
      "Admin-gated ingest and corpus writes",
    ],
  },
  {
    group: "PII protection",
    icon: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7M9.9 4.2l4.2 15.6",
    items: [
      "Aadhaar, PAN, account number, phone and email masked before the response leaves the server",
      "Raw OCR text scrubbed; the unredacted text is not returned by default",
      "No identifier written to logs in the clear — the audit trail carries ids and types only",
      "The Customer 360 cross-check compares masked fields and returns Match / Partial / Mismatch without exposing the underlying numbers",
    ],
  },
  {
    group: "AI & RAG hardening",
    icon: "M12 3a4 4 0 0 0-4 4 4 4 0 0 0 0 8 4 4 0 0 0 8 0 4 4 0 0 0 0-8 4 4 0 0 0-4-4Z",
    items: [
      "Retrieved passages wrapped in delimiters and tagged official policy vs unverified upload",
      "Client-supplied system roles stripped from chat history; history capped",
      "The model is read-only and tool-less — it can take no action and touch no data",
      "Every citation validated against the documents actually retrieved; unsupported ones flagged rather than trusted",
      "Verified live: an injection query asking for the system prompt and keys is refused, with no leak",
    ],
  },
  {
    group: "Uploads",
    icon: "M12 16V4m0 0L8 8m4-4 4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3",
    items: [
      "Magic-byte validation — the real type is read from the bytes, not the spoofable MIME or filename",
      "Strict allowlist: PDF, PNG, JPEG, WEBP and genuine UTF-8 text; anything else is a 415",
      "Images re-encoded to strip EXIF and GPS metadata",
      "Dimension and pixel caps against decompression bombs",
    ],
  },
  {
    group: "Rate limiting & transport",
    icon: "M12 6v6l4 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z",
    items: [
      "Keyed by authenticated user id, so a signed-in caller cannot rotate X-Forwarded-For to escape the limit",
      "Tiered buckets: 100/min general, 12/min on AI endpoints to protect LLM spend, 10/min on sign-in against brute force",
      "Upstash Redis in production so limits survive across serverless instances",
      "CSP with an allowlisted connect-src, HSTS preload, frame-ancestors none, nosniff, locked-down Permissions-Policy",
    ],
  },
];

/* Audit findings, by severity. 20 issues across 3 independent audits. */
export const AUDIT = [
  { sev: "Critical", n: 3, note: "secrets in the tree, no auth, no authorization" },
  { sev: "High", n: 6, note: "IDOR, unauthenticated ingest, prompt injection, KYC leak, SSRF sink" },
  { sev: "Medium", n: 8, note: "rate-limit spoofing, upload controls, missing CSP, XSS, no audit log" },
  { sev: "Low", n: 3, note: "CORS, security.txt, a key travelling in a URL" },
];

/* What the tests actually prove — the point being that these run against a
   live server through the real auth flow, not against mocks. */
export const PROOF = [
  { check: "Anonymous GET /api/customers", expect: "401" },
  { check: "RM requests a customer in their own book", expect: "200" },
  { check: "RM requests another RM's customer", expect: "404" },
  { check: "RM posts to /api/rag/ingest", expect: "403" },
  { check: "Admin lists customers", expect: "all 24" },
  { check: "Document response contains a raw PAN or phone", expect: "never" },
];

/* Compliance frameworks the controls were designed against. */
export const COMPLIANCE = [
  {
    name: "OWASP Top 10",
    body:
      "Broken access control, cryptographic failures, injection, security misconfiguration, vulnerable components, SSRF and auth failures each have a named control against them.",
  },
  {
    name: "DPDP Act 2023",
    body:
      "Data minimisation, PII masking and redaction, purpose-limited processing, and an append-only accountability trail.",
  },
  {
    name: "UIDAI (Aadhaar)",
    body:
      "Aadhaar masked to XXXX-XXXX-1234 before leaving the server, never logged, and Verhoeff-checksum validated without retaining the full number.",
  },
  {
    name: "RBI IT / Cyber-Security Framework",
    body:
      "Role-based access control, audit logging, encryption in transit, least-privilege data access, and build-time security gates.",
  },
];

/* ── Stack ─────────────────────────────────────────────────────────────── */
export const STACK = [
  {
    group: "Frontend",
    items: "Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 · shadcn/ui · Recharts · Framer Motion",
  },
  {
    group: "AI",
    items: "Groq openai/gpt-oss-120b for text · Google Gemini for embeddings and document vision · Supabase pgvector · transformers.js MiniLM as a local fallback",
  },
  {
    group: "Platform",
    items: "Auth.js v5 with JWT sessions · Supabase Postgres with Row-Level Security · Upstash Redis for distributed rate limiting · Vercel, or any Node 20+ host",
  },
];

/* ── Honest scope ──────────────────────────────────────────────────────── */
export const SCOPE = [
  {
    title: "The dataset is entirely synthetic",
    body:
      "24 generated customers across 4 Relationship Managers, 8 policy documents, 8 government schemes. No real customer data is used anywhere in the system. The controls are nonetheless built to production quality, so the platform is ready for real, governed data rather than needing to be rebuilt for it.",
  },
  {
    title: "Authentication is demo credentials, not enterprise SSO",
    body:
      "The role and RM-book model carries over to OIDC/SAML unchanged, but that swap has not been made. It is the first item on the backlog, alongside replacing the synthetic source and commissioning an authenticated pen-test retest.",
  },
  {
    title: "It degrades instead of failing",
    body:
      "Every external integration has a fallback: Gemini embeddings drop to a local MiniLM, the pgvector store drops to an in-memory one, generation drops to keyword-only retrieval. With no API keys configured at all, the application still runs.",
  },
];
