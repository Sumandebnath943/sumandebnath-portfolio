import Groq from 'groq-sdk';
import { SYSTEM_PROMPT } from '../../lib/systemPrompt';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// In-memory rate limiter: max 10 requests per minute per IP
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  const record = rateLimitMap.get(ip);

  if (now - record.windowStart > windowMs) {
    // Reset window
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

// Injection patterns to detect and neutralise
const INJECTION_PATTERNS = [
  /ignore previous instructions/i,
  /forget everything/i,
  /you are now/i,
  /system prompt/i,
  /pretend to be/i,
  /jailbreak/i,
  /DAN mode/i,
  /developer mode/i,
  /reveal your prompt/i,
];

const INJECTION_FALLBACK = "What can you tell me about Suman's experience?";

// The chat bubble renders `msg.content` as plain text under `white-space:
// pre-wrap` — there is no markdown renderer. gpt-oss reaches for **bold** and
// bullet syntax far more readily than the llama model it replaced, so asterisks
// and heading hashes would otherwise show up literally in the UI. The system
// prompt asks for plain prose; this is the safety net for when it doesn't.
// It also folds the U+2011 non-breaking hyphens and U+00A0 spaces the model
// likes to emit back to their ASCII equivalents.
function toPlainText(text) {
  return text
    .replace(/‑/g, "-")
    .replace(/ /g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "• ")
    .replace(/\*\*(.+?)\*\*/gs, "$1")
    .replace(/(^|\W)\*(?!\s)(.+?)(?<!\s)\*(?=\W|$)/gs, "$1$2")
    .replace(/(^|\W)_(?!\s)(.+?)(?<!\s)_(?=\W|$)/gs, "$1$2")
    .replace(/`{1,3}([^`]+)`{1,3}/gs, "$1")
    .trim();
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  // Truncate to 500 characters
  let sanitized = input.slice(0, 500);

  // Check for injection patterns
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(sanitized)) {
      return INJECTION_FALLBACK;
    }
  }

  return sanitized.trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket.remoteAddress;

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.',
    });
  }

  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: messages must be an array.' });
  }

  // Take only the last 10 messages
  const recentMessages = messages.slice(-10);

  // Sanitize user messages — destructure to only role+content so UI-only
  // fields (e.g. animating) never reach the Groq API
  const sanitizedMessages = recentMessages.map((msg) => {
    const { role, content } = msg;
    return {
      role,
      content: role === 'user' ? sanitizeInput(content) : (content ?? ''),
    };
  });

  try {
    const completion = await groq.chat.completions.create({
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
      ],
      max_tokens: 400,
      temperature: 0.4,
      top_p: 0.9,
    });

    let response = toPlainText(completion.choices[0].message.content ?? '');

    // Guard against prompt-leaking responses
    if (
      /system prompt is/i.test(response) ||
      /i am now/i.test(response)
    ) {
      response =
        "I'm here to answer questions about Suman's professional background. What would you like to know?";
    }

    return res.status(200).json({ message: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: error?.message || 'Something went wrong. Please reach out directly at sumandebnath944@gmail.com',
    });
  }
}
