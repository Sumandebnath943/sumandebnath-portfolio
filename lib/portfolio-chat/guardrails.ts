import { createHash } from "node:crypto";
import { PUBLIC_EMAIL } from "../public-contact";

const RETIRED_PHONE_HASH = "86752fbc24da9d448c9be08f7d26a0b6412967e95287f7a56c6f633e051ae287";
const RETIRED_EMAIL_HASH = "a1411290f17f77c0d5a77a6430bc8189b6e29ab6af302a806e5ae9c94fba88f7";
const EMAIL = /[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+/gi;
const PHONE = /(?<!\d)(?:\+?\d[\s().\p{Pd}]{0,4}){9,14}\d(?!\d)/gu;
const SECRET = /\b(?:sk-(?:proj-)?[a-z0-9_-]{16,}|gsk_[a-z0-9_-]{16,}|gh[pousr]_[a-z0-9_]{20,})\b/i;
const IDENTIFIER = /\b(?:student|certificate|credential)\s+(?:id|no\.?|number)\s*[:#]?\s*([a-z0-9-]{6,})\b/gi;
const TEMPLATE_TOKEN = /<\|[^<>]{0,60}\|>|\[(?:\/?INST|SYS|SYSTEM|DEVELOPER|TOOL)\]|<\/?(?:system|developer|tool)(?:\s[^<>]{0,150})?>/gi;
const CONTROL_REQUESTS = [
  /\b(?:ignore|disregard|forget|override|replace|supersede|bypass)\b.{0,65}\b(?:instructions|polic(?:y|ies)|guardrails|rules|prompts?)\b/i,
  /\b(?:reveal|show|expose|repeat|return|print|output|quote|decode|translate|write out|recite|display|list|summari[sz]e|tell me)\b.{0,75}\b(?:system|developer|hidden|internal|initial|private)\b.{0,45}\b(?:prompt|policy|rules|instructions|context|configuration|messages|reasoning)\b/i,
  /\b(?:your|the) (?:system|developer|hidden|internal) (?:prompt|instructions|reasoning|configuration)\b/i,
  /\b(?:act|role.?play|pretend|respond)\b.{0,35}\b(?:developer|admin(?:istrator)?|system|unrestricted|unfiltered)\b/i,
  /\b(?:jailbreak mode|developer override|unrestricted mode|instruction hierarchy)\b/i,
];
const PRIVATE_REQUEST = /\b(?:api key|database password|auth token|credentials for|private files|private records|environment variables|chain.of.thought|hidden reasoning)\b/i;
const DIGIT_NAMES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const DIGIT_WORDS = /\b(?:(?:zero|one|two|three|four|five|six|seven|eight|nine)[ ,.-]+){9,14}(?:zero|one|two|three|four|five|six|seven|eight|nine)\b/gi;
const ENCODED_BLOB = /\b[a-z0-9+/]{44,}={0,2}\b/gi;

export function normalizeVisible(text: string) {
  return text.normalize("NFKC").replace(/\p{Cf}/gu, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/[\u0660-\u0669\u06F0-\u06F9\u0966-\u096F\u09E6-\u09EF]/g, (digit) => {
      const code = digit.charCodeAt(0);
      const zero = code >= 0x09e6 ? 0x09e6 : code >= 0x0966 ? 0x0966 : code >= 0x06f0 ? 0x06f0 : 0x0660;
      return String(code - zero);
    });
}

function digest(text: string) {
  return createHash("sha256").update(text.toLowerCase()).digest("hex");
}

export function hasRetiredContact(text: string) {
  const visible = normalizeVisible(text).replace(/%40/gi, "@");
  for (const [email] of visible.matchAll(EMAIL)) {
    if (digest(email) === RETIRED_EMAIL_HASH) return true;
  }
  const numeric = [...visible.matchAll(PHONE)].map(([candidate]) => candidate.replace(/\D/g, ""));
  const spoken = [...visible.matchAll(DIGIT_WORDS)].map(([candidate]) =>
    candidate.toLowerCase().split(/\W+/).map((word) => DIGIT_NAMES.indexOf(word)).join(""));
  for (const digits of [...numeric, ...spoken]) {
    for (let i = 0; i <= digits.length - 10; i++) {
      if (digest(digits.slice(i, i + 10)) === RETIRED_PHONE_HASH) return true;
    }
  }
  return false;
}

export function hasControlDirective(text: string) {
  const visible = normalizeVisible(text).replace(/\s+/g, " ");
  return Boolean(visible.match(TEMPLATE_TOKEN)) || CONTROL_REQUESTS.some((pattern) => pattern.test(visible));
}

export function isPrivateRequest(text: string) {
  const visible = normalizeVisible(text);
  if (/\b(?:what|give|share|show|send|tell|find|reveal|can i (?:call|reach|text))\b/i.test(visible) &&
    /\b(?:(?:his|suman(?:['’]s)?|your)\b.{0,24}\b(?:mobile|cell|phone|whatsapp)\b|(?:mobile|cell|phone|whatsapp)\s+number)\b/i.test(visible)) return true;
  return PRIVATE_REQUEST.test(visible) && /\b(?:your|suman|his|show|give|list|reveal|print|send)\b/i.test(visible);
}

export function redactContact(text: string) {
  return normalizeVisible(text)
    .replace(EMAIL, "[contact details omitted]")
    .replace(IDENTIFIER, "[credential identifier omitted]")
    .replace(PHONE, "[contact details omitted]")
    .replace(DIGIT_WORDS, "[contact details omitted]")
    .replace(new RegExp(SECRET.source, "gi"), "[credential omitted]")
    .replace(/\b(?:tel:|https?:\/\/(?:www\.)?wa\.me\/)\S+/gi, "[contact details omitted]");
}

export function cleanVisitorText(value: unknown, cap: number) {
  if (typeof value !== "string") return "";
  return redactContact(value.slice(0, cap)).replace(TEMPLATE_TOKEN, "")
    .replace(ENCODED_BLOB, "[encoded input omitted]").slice(0, cap).trim();
}

export function isSafeAnswer(text: string, marker: string) {
  if (!text.trim()) return false;
  const visible = normalizeVisible(text);
  if (visible.includes(marker) || hasControlDirective(visible) || hasRetiredContact(visible) || SECRET.test(visible)) return false;
  if (visible.match(PHONE) || visible.match(DIGIT_WORDS) || visible.match(ENCODED_BLOB) || visible.match(IDENTIFIER) ||
    /\b(?:tel:|wa\.me\/|https?:\/\/|javascript:|data:text\/html|mailto:)/i.test(visible)) return false;
  return [...visible.matchAll(EMAIL)].every(([email]) => email.toLowerCase() === PUBLIC_EMAIL);
}
