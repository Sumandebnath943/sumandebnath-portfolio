import { createHmac, timingSafeEqual } from "node:crypto";
import { MAX_ASSISTANT_CHARS } from "./types";

const TICKET_TTL_MS = 120_000;
const MAX_WAV_BYTES = 4 * 1024 * 1024;

function sign(text: string, expiry: string, key: string) {
  return createHmac("sha256", key).update(`portfolio-voice-v1\n${expiry}\n${text}`).digest("base64url");
}

export function issueVoiceTicket(text: string) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return;
  const expiry = String(Date.now() + TICKET_TTL_MS);
  return `${expiry}.${sign(text, expiry, key)}`;
}

export function verifyVoiceTicket(text: unknown, ticket: unknown, key: string): text is string {
  if (typeof text !== "string" || !text.trim() || text.length > MAX_ASSISTANT_CHARS + 150 ||
      typeof ticket !== "string" || !/^\d{13}\.[\w-]{43}$/.test(ticket)) return false;
  const [expiry, signature] = ticket.split(".");
  const remaining = Number(expiry) - Date.now();
  return remaining > 0 && remaining <= TICKET_TTL_MS &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(sign(text, expiry, key)));
}

type GeminiSpeech = { steps?: { type: string; content?: { type: string; data?: string }[] }[] };

export async function synthesizeVoice(text: string, key: string) {
  // Keep long catalog/portfolio replies readable without exceeding the audio response limit.
  const transcript = text.length <= 750 ? text : `${text.slice(0, 750).replace(/\s+\S*$/, "").trimEnd()}… The rest is in the chat.`;
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      model: "gemini-3.8-flash-tts",
      store: false,
      input: [{ type: "user_input", content: [{
        type: "text",
        text: transcript,
        annotations: [{ type: "speech_metadata", style: "Warm, breezy, and conversational with understated comic timing. Read at a natural pace." }],
      }] }],
      response_format: { type: "audio" },
      generation_config: { speech_config: [{ voice: "Aoede" }] },
    }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) return { status: response.status };
  const body = await response.json() as GeminiSpeech;
  const audio = body.steps?.filter(({ type }) => type === "model_output")
    .flatMap(({ content }) => content ?? []).findLast(({ type, data }) => type === "audio" && typeof data === "string")?.data;
  if (!audio || audio.length > Math.ceil(MAX_WAV_BYTES / 3) * 4) return { status: 502 };
  const wav = Buffer.from(audio, "base64");
  if (wav.length <= 44 || wav.length > MAX_WAV_BYTES || wav.toString("ascii", 0, 4) !== "RIFF" ||
      wav.toString("ascii", 8, 12) !== "WAVE") return { status: 502 };
  return { wav };
}
