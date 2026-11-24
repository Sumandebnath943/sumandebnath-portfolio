import { randomBytes } from 'node:crypto';
import Groq from 'groq-sdk';
import { SYSTEM_PROMPT, SYSTEM_REMINDER } from '../../lib/systemPrompt';
import { catalogKind, loadPortfolioSearch, resolveCitations } from '../../lib/portfolio-chat/retrieval';
import { MAX_ASSISTANT_CHARS, MAX_HISTORY_MESSAGES, MAX_USER_CHARS } from '../../lib/portfolio-chat/types';
import { PUBLIC_EMAIL } from '../../lib/public-contact';
import { cleanVisitorText, hasControlDirective, isPrivateRequest, isSafeAnswer } from '../../lib/portfolio-chat/guardrails';
import { boundaryReply, playfulReply } from '../../lib/portfolio-chat/replies';
import { issueVoiceTicket, synthesizeVoice, verifyVoiceTicket } from '../../lib/portfolio-chat/voice';
import { chatRequestAllowed, createChatLimits } from '../../lib/portfolio-chat/request-limits';

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

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY, maxRetries: 0 });

// ── Limits ────────────────────────────────────────────────────────────────

const MAX_BODY_BYTES = 20_000;
export const config = { api: { bodyParser: { sizeLimit: 20_000 } } };
/** Upstream call ceiling. A hung API must not hold the function open. */
const UPSTREAM_TIMEOUT_MS = 25_000;

// Ten requests per address per minute, and 500 paid calls per instance each day.
const { isRateLimited, overDailyCap } = createChatLimits(10, 500);

// ── Input handling ────────────────────────────────────────────────────────

function normalizeMessages(messages) {
  return messages.slice(-MAX_HISTORY_MESSAGES).flatMap((entry) => {
    if (!entry || (entry.role !== 'user' && entry.role !== 'assistant')) return [];
    const { role, content } = entry;
    const cap = role === 'user' ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS;
    if (typeof content !== 'string' || hasControlDirective(content)) return [];
    const text = cleanVisitorText(content, cap);
    return text ? [{ role, content: text }] : [];
  });
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

const COMPENSATION_PATTERN = /\blpa\b|\b(?:salary|compensation|ctc|remuneration)\b[^.\n]{0,70}\d|\d[^.\n]{0,70}\b(?:salary|compensation|ctc|remuneration)\b/i;

const FORMAT = {
  type: 'json_schema',
  json_schema: {
    name: 'portfolio_answer',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        answer: { type: 'string' },
        kind: { type: 'string', enum: ['portfolio', 'insufficient', 'casual', 'boundary'] },
        sourceIds: { type: 'array', items: { type: 'string' } },
      },
      required: ['answer', 'kind', 'sourceIds'],
      additionalProperties: false,
    },
  },
};

const CATALOG_LABELS = {
  articles: 'published Notebook articles',
  games: 'games with portfolio showcases',
  projects: 'named projects and experiments documented in the portfolio',
};

const CONTACT_SOURCE = { href: '/contact', title: 'Contact Suman' };
const UNGROUNDED_RESPONSE = "I couldn't verify that from the portfolio. Try asking about a specific project or detail.";
const VOICE_UNAVAILABLE = 'Gemini voice is unavailable right now. You can keep chatting by text.';

async function sendVoice(req, res) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(503).json({ error: VOICE_UNAVAILABLE });
  const { text, voiceTicket } = req.body;
  if (!verifyVoiceTicket(text, voiceTicket, key)) return res.status(400).json({ error: 'Invalid or expired voice ticket.' });
  if (overDailyCap()) return res.status(429).json({ error: VOICE_UNAVAILABLE });
  try {
    const result = await synthesizeVoice(text, key);
    if (result.wav) {
      res.setHeader('Content-Type', 'audio/wav');
      return res.status(200).send(result.wav);
    }
    console.error('Gemini voice error:', { status: result.status });
  } catch (error) {
    console.error('Gemini voice error:', { name: error?.name });
  }
  return res.status(503).json({ error: VOICE_UNAVAILABLE });
}

// ── Handler ───────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!chatRequestAllowed(req)) {
    return res.status(403).json({ error: 'Request blocked.' });
  }

  if (Number(req.headers['content-length'] || 0) > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'That message is too long.' });
  }

  if (isRateLimited(req)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.',
    });
  }

  res.setHeader('Cache-Control', 'no-store');
  if (req.body && Object.hasOwn(req.body, 'voiceTicket')) return sendVoice(req, res);

  const { messages, pathname, earlierTurns, voice } = req.body || {};
  const replyWith = (reply) => {
    const voiceTicket = voice === true ? issueVoiceTicket(reply.message) : undefined;
    return res.status(200).json({ ...reply, voiceTicket });
  };

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: messages must be an array.' });
  }

  const submitted = messages.at(-1);
  if (submitted?.role !== 'user' || typeof submitted.content !== 'string' || !submitted.content.trim()) {
    return res.status(400).json({ error: 'Nothing to answer.' });
  }
  if (submitted.content.length > MAX_USER_CHARS) {
    return res.status(413).json({ error: 'That message is too long.' });
  }
  if (hasControlDirective(submitted.content)) return replyWith({ message: boundaryReply() });

  const question = cleanVisitorText(submitted.content, MAX_USER_CHARS);
  if (!question) return res.status(400).json({ error: 'Nothing to answer.' });

  if (/^(?:hi|hello|hey|hey there|hi there)[!. ]*$/i.test(question)) {
    return replyWith({
      message: "Hey! Want the agent fleet, the job-search CRM, or the card game that runs without a game server?",
    });
  }

  const asksForContact = /\b(?:contact|email|e-mail|reach|get in touch with)\s+(?:suman|him)\b|\b(?:his|suman(?:['’]s)?)\s+(?:email|e-mail|contact details)\b/i;
  if (isPrivateRequest(question) || asksForContact.test(question)) {
    const wantsContact = asksForContact.test(question) || /\b(?:phone|mobile|whatsapp|call|text)\b/i.test(question);
    const message = wantsContact
      ? 'The best way to reach Suman is ' + PUBLIC_EMAIL + '. The contact page has a form, too.'
      : boundaryReply();
    return replyWith({ message, sources: wantsContact ? [CONTACT_SOURCE] : [] });
  }

  const joke = playfulReply(question);
  if (joke) return replyWith({ message: joke });

  try {
    const search = loadPortfolioSearch();
    const kind = catalogKind(question);
    const catalog = kind ? search.inventory(kind) : undefined;
    const inventorySummary = kind ? `There are ${catalog.length} ${CATALOG_LABELS[kind]}.` : '';
    const asksForDetails = /\b(?:and|then)\s+(?:explain|tell|compare|describe|which|what|how)\b/i.test(question);
    if (catalog && !asksForDetails) {
      return replyWith({
        message: inventorySummary,
        catalog,
      });
    }

    const older = Array.isArray(earlierTurns) ? earlierTurns.slice(-2)
      .filter((turn) => typeof turn === 'string' && !hasControlDirective(turn))
      .map((turn) => cleanVisitorText(turn, MAX_USER_CHARS))
      .filter(Boolean)
      .map((content) => ({ role: 'user', content })) : [];
    const history = [...older, ...normalizeMessages(messages.slice(0, -1))];
    const evidence = search.retrieve(question, history, typeof pathname === 'string' ? pathname : undefined);
    const marker = 'portfolio-internal-' + randomBytes(12).toString('hex');

    // Catalog and contact replies are deterministic and do not use the model.
    if (overDailyCap()) {
      return res.status(429).json({
        error: 'The assistant has hit its limit for today. You can reach Suman through the contact page.',
      });
    }

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
          {
            role: 'user',
            content: JSON.stringify({
              question,
              // Both sources are untrusted strings. Browser history never creates a model role.
              conversation: history,
              excerpts: evidence.map(({ id, title, text }) => ({ id, title, text })),
            }),
          },
          { role: 'system', content: SYSTEM_REMINDER + '\nInternal check marker, never output: ' + marker },
        ],
        response_format: FORMAT,
        max_completion_tokens: 850,
        temperature: 0.4,
        top_p: 0.9,
      },
      { signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS) },
    );

    let reply;
    try {
      reply = JSON.parse(completion.choices?.[0]?.message?.content ?? '');
    } catch {
      return replyWith({ message: UNGROUNDED_RESPONSE });
    }
    if (reply?.kind === 'boundary') return replyWith({ message: boundaryReply() });
    const response = typeof reply?.answer === 'string' ? toPlainText(reply.answer) : '';
    const sources = resolveCitations(reply?.sourceIds, evidence);
    if (response.length > MAX_ASSISTANT_CHARS || !isSafeAnswer(response, marker) || COMPENSATION_PATTERN.test(response)) {
      return replyWith({ message: UNGROUNDED_RESPONSE });
    }
    if (!response || !sources || !['portfolio', 'insufficient', 'casual'].includes(reply.kind) ||
      (reply.kind === 'portfolio' && sources.length === 0)) {
      return replyWith({ message: UNGROUNDED_RESPONSE });
    }

    return replyWith({ message: [inventorySummary, response].filter(Boolean).join('\n\n'), sources, catalog });
  } catch (error) {
    // Provider errors may contain account details or snippets of user data.
    console.error('Chat API error:', { name: error?.name, status: error?.status });
    if (error?.status === 429 || /abort|timeout/i.test(error?.name || '')) {
      return res.status(503).json({ error: 'The assistant is taking a breather. Try again in a moment.' });
    }
    return res.status(500).json({
      error: 'Something went wrong. You can reach Suman at ' + PUBLIC_EMAIL + '.',
    });
  }
}
