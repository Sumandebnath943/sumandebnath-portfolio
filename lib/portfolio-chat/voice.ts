import { createHmac, timingSafeEqual } from "node:crypto";
import { MAX_ASSISTANT_CHARS } from "./types";

const TICKET_TTL_MS = 120_000;
const MAX_WAV_BYTES = 4 * 1024 * 1024;
const VOICE_MODEL = "gemini-3.8-flash-lite-tts";

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

function requestSpeech(text: string, key: string, stream: boolean, signal: AbortSignal) {
  return fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      model: VOICE_MODEL,
      stream,
      store: false,
      input: [{ type: "user_input", content: [{
        type: "text",
        text,
        annotations: [{ type: "speech_metadata", style: "Young, energetic masculine voice for a curious robot. Upbeat, expressive and clearly articulated at a conversational pace." }],
      }] }],
      response_format: { type: "audio" },
      generation_config: { speech_config: [{ voice: "Puck" }] },
    }),
    signal,
  });
}

export async function synthesizeVoice(text: string, key: string) {
  // Existing open tabs still request a complete WAV.
  const transcript = text.length <= 750 ? text : `${text.slice(0, 750).replace(/\s+\S*$/, "").trimEnd()}… The rest is in the chat.`;
  const response = await requestSpeech(transcript, key, false, AbortSignal.timeout(20_000));
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

export async function* streamVoice(text: string, key: string, signal: AbortSignal) {
  const response = await requestSpeech(text, key, true, AbortSignal.any([signal, AbortSignal.timeout(45_000)]));
  if (!response.ok || !response.body) throw new Error(`Gemini speech status ${response.status}`);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let lineBuffer = "";
  let bytes = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      const lines = (lineBuffer + decoder.decode(value, { stream: true })).split("\n");
      lineBuffer = lines.pop() || "";
      if (lineBuffer.length > MAX_WAV_BYTES) throw new Error("Gemini speech event too large");
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") continue;
        const event = JSON.parse(data);
        if (event.event_type === "error") throw new Error("Gemini speech stream failed");
        const delta = event.delta;
        if (event.event_type !== "step.delta" || delta?.type !== "audio" || !delta.data) continue;
        if (delta.mime_type !== "audio/l16" || delta.sample_rate !== 24_000 || delta.channels !== 1) {
          throw new Error("Unexpected Gemini speech format");
        }
        const pcm = Buffer.from(delta.data, "base64");
        bytes += pcm.length;
        if (bytes > MAX_WAV_BYTES) throw new Error("Gemini speech exceeded response budget");
        if (pcm.length) yield pcm;
      }
    }
    if (!bytes) throw new Error("Gemini speech returned no audio");
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
