import { MAX_ASSISTANT_CHARS, MAX_HISTORY_MESSAGES, MAX_USER_CHARS } from "./types";
import type { ChatMessage } from "./types";

const HISTORY_BYTES = 16_000;
const RECALL_STOP_WORDS = new Set(["about", "before", "earlier", "first", "have", "more", "said", "that", "this", "what", "when", "which"]);

export function chatRequest(transcript: ChatMessage[], pathname: string, voice = false) {
  const messages = transcript.slice(-MAX_HISTORY_MESSAGES).map(({ role, content }) => ({
    role,
    content: content.slice(0, role === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS),
  }));
  const question = messages.at(-1)?.content ?? "";
  const keywords = new Set(question.toLowerCase().match(/[\p{L}\p{N}]{4,}/gu)?.filter((word) => !RECALL_STOP_WORDS.has(word)));
  const referringBack = /\b(first|earlier|original|previously|before|we discussed|i asked)\b/i.test(question);
  const earlierTurns = transcript.slice(0, -MAX_HISTORY_MESSAGES)
    .filter((message) => message.role === "user")
    .map(({ content }, index) => {
      const words = new Set(content.toLowerCase().match(/[\p{L}\p{N}]{4,}/gu));
      const score = [...keywords].filter((word) => words.has(word)).length;
      return { content, index, score };
    })
    .filter((turn) => turn.score > 0 || referringBack)
    .sort((a, b) => b.score - a.score || (referringBack ? a.index - b.index : b.index - a.index))
    .slice(0, 2)
    .sort((a, b) => a.index - b.index)
    .map(({ content }) => content.slice(0, MAX_USER_CHARS));
  const encode = () => JSON.stringify({ messages, pathname, earlierTurns, ...(voice && { voice }) });
  let body = encode();
  const encoder = new TextEncoder();
  while (messages.length > 1 && encoder.encode(body).byteLength > HISTORY_BYTES) {
    messages.shift();
    body = encode();
  }
  return body;
}
