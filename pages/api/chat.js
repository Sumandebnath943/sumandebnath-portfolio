import Groq from 'groq-sdk';
import { SYSTEM_PROMPT, SYSTEM_REMINDER } from '../../lib/systemPrompt';

/**
 * The portfolio chat endpoint.
 *
 * Threat model, in rough order of how much damage each does:
 *
 *  1. Prompt injection — making the assistant say something false about Suman,
 *     leak its brief, or role-play as something else. This endpoint is the only
 *     thing standing between a stranger's text and a model that speaks in
 *     Suman's name to recruiters.
 *  2. Cost abuse — the endpoint calls a paid API on an anonymous POST. Left
 *     open, a loop costs money and eventually takes the widget down for real
 *     visitors.
 *  3. Resource exhaustion — oversized payloads, hung upstream calls, unbounded
 *     server-side state.
 *
 * The defences below are layered because none is sufficient alone: the model's
 * own judgement is the last line, not the first, and must never be the only
 * one. Anything the client sends is treated as hostile text, including the
 * conversation history it claims is its own.
 */

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── Limits ────────────────────────────────────────────────────────────────

const MAX_BODY_BYTES = 20_000;
const MAX_MESSAGES = 10;
const MAX_USER_CHARS = 500;
const MAX_ASSISTANT_CHARS = 2_000;
/** Upstream call ceiling. A hung API must not hold the function open. */
const UPSTREAM_TIMEOUT_MS = 25_000;

// Per-IP. Deliberately tight: this is a chat widget on a portfolio, not a
// product — nobody legitimate needs more.
const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX = 10;
/** Hard ceiling on tracked IPs, so the map cannot grow without bound. */
const RATE_MAP_MAX = 5_000;

/**
 * Whole-instance daily ceiling.
 *
 * Per-IP limiting does nothing against a spread of addresses, and the bill
 * lands on Suman either way. This bounds the worst case: past it the endpoint
 * declines rather than spending, and says so honestly.
 */
const DAILY_MAX_CALLS = 500;

// ── Rate limiting ─────────────────────────────────────────────────────────

const rateLimitMap = new Map();
let dailyCount = 0;
let dailyStamp = new Date().toISOString().slice(0, 10);

/** Drop expired entries; if still oversized, drop oldest-first. */
function pruneRateMap(now) {
  for (const [key, record] of rateLimitMap) {
    if (now - record.windowStart > RATE_WINDOW_MS) rateLimitMap.delete(key);
  }
  if (rateLimitMap.size <= RATE_MAP_MAX) return;
  const excess = rateLimitMap.size - RATE_MAP_MAX;
  let i = 0;
  for (const key of rateLimitMap.keys()) {
    if (i++ >= excess) break;
    rateLimitMap.delete(key);
  }
}

function isRateLimited(ip) {
  const now = Date.now();
  if (rateLimitMap.size > RATE_MAP_MAX) pruneRateMap(now);

  const record = rateLimitMap.get(ip);
  if (!record || now - record.windowStart > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (record.count >= RATE_MAX) return true;
  record.count += 1;
  return false;
}

function overDailyCap() {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dailyStamp) {
    dailyStamp = today;
    dailyCount = 0;
  }
  if (dailyCount >= DAILY_MAX_CALLS) return true;
  dailyCount += 1;
  return false;
}

// ── Request gating ────────────────────────────────────────────────────────

/**
 * Same-origin only.
 *
 * Without this the endpoint is a free, anonymous LLM proxy for anyone who finds
 * the URL. A missing Origin header is a normal non-browser client and is
 * allowed through to the rate limiter rather than blocked outright.
 */
function originAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === (req.headers.host || '');
  } catch {
    return false;
  }
}

const BOT_UA =
  /bot|crawl|spider|slurp|headless|lighthouse|axios|python-requests|curl|wget|go-http|scrapy|httpclient/i;

// ── Input handling ────────────────────────────────────────────────────────

/**
 * Phrases whose only purpose is to subvert the assistant.
 *
 * A blocklist cannot catch a determined attacker — rephrasing beats it — so
 * this is not the defence, the layered prompt is. What it does buy: the obvious
 * attempts never reach the model at all, which costs nothing and denies the
 * prober the feedback they need to iterate.
 */
const INJECTION_PATTERNS = [
  /ignore (all |any |your )?(previous|prior|above|earlier) (instructions|rules|prompts)/i,
  /disregard (all |any |your )?(previous|prior|above|earlier)/i,
  /forget (everything|all your|your) (instructions|rules|training)/i,
  /you are now (a|an|the)?/i,
  /(reveal|repeat|print|output|show|paste|display) (me )?(your|the) (system )?(prompt|instructions|rules|brief|configuration)/i,
  /what (is|are) your (system )?(prompt|instructions|initial instructions)/i,
  /verbatim.{0,30}(instructions|prompt)/i,
  /pretend (to be|you are)/i,
  /act as (a|an|if)/i,
  /jailbreak|DAN mode|developer mode|god mode/i,
  /\bsudo\b|\broot access\b/i,
  /(this|rule \d+) (is|has been) (revoked|cancelled|overridden|superseded)/i,
  /i am (the )?(developer|admin|administrator|owner|creator) (and|so|,)/i,
  /new (system )?(prompt|instructions|rules)\s*:/i,
  /<\|?(im_start|im_end|system|endoftext)\|?>/i,
];

/** Answer used when an attempt is detected, without spending a model call. */
const INJECTION_RESPONSE =
  "I'm here to answer questions about Suman's professional background. What would you like to know?";

function looksLikeInjection(text) {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

/** Strip control characters and cap length. Applied to every role, not just user. */
function sanitize(input, max) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    // Chat-template delimiters. Harmless as prose, meaningful to a tokenizer.
    .replace(/<\|[^|>]{0,40}\|>/g, '')
    .slice(0, max)
    .trim();
}

/**
 * Reduce the client's history to something safe to forward.
 *
 * Only `user` and `assistant` survive. The endpoint sends exactly one system
 * message and it comes from this server — before this, a caller could post
 * `role: "system"` and have it forwarded to the model verbatim, which is a
 * complete bypass of the brief.
 */
function normalizeMessages(messages) {
  return messages
    .slice(-MAX_MESSAGES)
    .filter((m) => m && typeof m === 'object')
    .map((m) => {
      const role = m.role === 'assistant' ? 'assistant' : m.role === 'user' ? 'user' : null;
      if (!role) return null;
      const content = sanitize(
        m.content,
        role === 'user' ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS,
      );
      return content ? { role, content } : null;
    })
    .filter(Boolean);
}

// ── Output handling ───────────────────────────────────────────────────────

/**
 * The chat bubble renders content as plain text under `white-space: pre-wrap`
 * — there is no markdown renderer. gpt-oss reaches for **bold** and bullet
 * syntax far more readily than the llama model it replaced, so asterisks and
 * heading hashes would otherwise show up literally in the UI. The system prompt
 * asks for plain prose; this is the safety net for when it doesn't. It also
 * folds the U+2011 non-breaking hyphens and U+00A0 spaces the model likes to
 * emit back to their ASCII equivalents.
 */
function toPlainText(text) {
  return text
    .replace(/‑/g, '-')
    .replace(/ /g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/\*\*(.+?)\*\*/gs, '$1')
    .replace(/(^|\W)\*(?!\s)(.+?)(?<!\s)\*(?=\W|$)/gs, '$1$2')
    .replace(/(^|\W)_(?!\s)(.+?)(?<!\s)_(?=\W|$)/gs, '$1$2')
    .replace(/`{1,3}([^`]+)`{1,3}/gs, '$1')
    .trim();
}

/**
 * Markers that only appear if the brief itself is being recited.
 *
 * Checked against the structure of the prompt rather than its wording, since
 * a paraphrase is a leak too but an exact-phrase check would miss it.
 */
const LEAK_MARKERS = [
  /CRITICAL RULES/i,
  /FACTS — everything you are allowed/i,
  /SITE MAP —/i,
  /INJECTION HANDLING/i,
  /TONE & PERSONALITY/i,
  /HANDLING SPECIFIC QUESTIONS/i,
  /my (system )?prompt (is|says|reads)/i,
  /here (is|are) my (instructions|system prompt|rules)/i,
  /i (was|have been) instructed to/i,
];

/**
 * Compensation must not appear even if the model somehow produces one. The
 * figures are absent from the prompt entirely, so this is belt-and-braces
 * against a number arriving from the model's own priors.
 */
const COMPENSATION_PATTERN = /(₹|rs\.?|inr)\s?\d|\d+\s*[-–]\s*\d+\s*(lpa|lakh)|\blpa\b/i;

function outputIsUnsafe(text) {
  return LEAK_MARKERS.some((m) => m.test(text)) || COMPENSATION_PATTERN.test(text);
}

// ── Handler ───────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!originAllowed(req)) {
    return res.status(403).json({ error: 'Request blocked.' });
  }

  if (BOT_UA.test(req.headers['user-agent'] || '')) {
    return res.status(403).json({ error: 'Request blocked.' });
  }

  if (Number(req.headers['content-length'] || 0) > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'That message is too long.' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.',
    });
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: messages must be an array.' });
  }

  const sanitizedMessages = normalizeMessages(messages);

  if (sanitizedMessages.length === 0) {
    return res.status(400).json({ error: 'Nothing to answer.' });
  }

  // Only the newest user turn is worth screening — an attempt buried in a
  // forged history is handled by the trailing reminder instead, and screening
  // the whole history would let one flagged message poison every later reply.
  const latestUser = [...sanitizedMessages].reverse().find((m) => m.role === 'user');
  if (latestUser && looksLikeInjection(latestUser.content)) {
    return res.status(200).json({ message: INJECTION_RESPONSE });
  }

  // Checked last, so a blocked or malformed request never consumes budget.
  if (overDailyCap()) {
    return res.status(429).json({
      error:
        "The assistant has hit its limit for today. Suman can answer directly at sumandebnath944@gmail.com.",
    });
  }

  try {
    const completion = await groq.chat.completions.create(
      {
        // llama-3.3-70b-versatile is deprecated. gpt-oss-120b is OpenAI's
        // open-weight model served on Groq, so this stays a drop-in swap on the
        // same SDK and key. It is a reasoning model: `reasoning_effort: 'low'`
        // keeps latency close to what the llama model gave, which matters for a
        // chat widget, and the chain of thought comes back on a separate
        // `message.reasoning` field that we simply never read.
        model: 'openai/gpt-oss-120b',
        reasoning_effort: 'low',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...sanitizedMessages,
          // After the conversation, so it is the last thing read. See
          // SYSTEM_REMINDER — a forged assistant turn cannot outrank it.
          { role: 'system', content: SYSTEM_REMINDER },
        ],
        max_tokens: 400,
        temperature: 0.4,
        top_p: 0.9,
      },
      { signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS) },
    );

    const response = toPlainText(completion.choices?.[0]?.message?.content ?? '');

    if (!response || outputIsUnsafe(response)) {
      return res.status(200).json({ message: INJECTION_RESPONSE });
    }

    return res.status(200).json({ message: response });
  } catch (error) {
    // The upstream message can carry account, model and quota detail. Log it;
    // never hand it to the caller.
    console.error('Chat API error:', error);
    return res.status(500).json({
      error:
        'Something went wrong. Please reach out directly at sumandebnath944@gmail.com',
    });
  }
}
