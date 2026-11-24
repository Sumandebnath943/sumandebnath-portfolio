import { createHmac, timingSafeEqual } from "node:crypto";
import { checkSpeechResponse, withSpeechFallback } from "./speech-fallback";
import { MAX_ASSISTANT_CHARS } from "./types";

const TICKET_TTL_MS = 120_000;
const MAX_WAV_BYTES = 4 * 1024 * 1024;
const VOICE_MODEL = "gemini-3.8-flash-lite-tts";
const SAMPLE_RATE = 24_000;
const GROQ_STYLE = "[cheerful] ";
const GROQ_TEXT_LIMIT = 200 - GROQ_STYLE.length;

function sign(text: string, expiry: string, key: string) {
  return createHmac("sha256", key).update(`portfolio-voice-v1\n${expiry}\n${text}`).digest("base64url");
}

export function issueVoiceTicket(text: string) {
  const key = process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY;
  if (!key) return;
  const expiry = String(Date.now() + TICKET_TTL_MS);
  return `${expiry}.${sign(text, expiry, key)}`;
}

export function verifyVoiceTicket(text: unknown, ticket: unknown): text is string {
  const key = process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY;
  if (!key || typeof text !== "string" || !text.trim() || text.length > MAX_ASSISTANT_CHARS + 150 ||
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

export async function synthesizeVoice(text: string, key: string, signal = AbortSignal.timeout(20_000)) {
  // Existing open tabs still request a complete WAV.
  const transcript = text.length <= 750 ? text : `${text.slice(0, 750).replace(/\s+\S*$/, "").trimEnd()}… The rest is in the chat.`;
  const response = await requestSpeech(transcript, key, false, AbortSignal.any([signal, AbortSignal.timeout(20_000)]));
  checkSpeechResponse(response, "playback", "gemini");
  const body = await response.json() as GeminiSpeech;
  const audio = body.steps?.filter(({ type }) => type === "model_output")
    .flatMap(({ content }) => content ?? []).findLast(({ type, data }) => type === "audio" && typeof data === "string")?.data;
  if (!audio || audio.length > Math.ceil(MAX_WAV_BYTES / 3) * 4) throw new Error("Gemini speech returned no usable audio");
  const wav = Buffer.from(audio, "base64");
  if (wav.length <= 44 || wav.length > MAX_WAV_BYTES || wav.toString("ascii", 0, 4) !== "RIFF" ||
      wav.toString("ascii", 8, 12) !== "WAVE") throw new Error("Invalid Gemini WAV");
  return { wav };
}

async function* streamGemini(text: string, key: string, signal: AbortSignal) {
  const response = await requestSpeech(text, key, true, signal);
  checkSpeechResponse(response, "playback", "gemini");
  if (!response.body) throw new Error("Gemini speech returned no stream");
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
        if (delta.mime_type !== "audio/l16" || delta.sample_rate !== SAMPLE_RATE || delta.channels !== 1) {
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

function* groqPhrases(text: string) {
  let remaining = text.replace(/\[/g, "(").replace(/\]/g, ")").replace(/\s+/g, " ").trim();
  while (remaining.length > GROQ_TEXT_LIMIT) {
    const prefix = remaining.slice(0, GROQ_TEXT_LIMIT);
    const lastSentenceEnd = [...prefix.matchAll(/[.!?;](?=\s)/g)].at(-1)?.index ?? -1;
    let end = lastSentenceEnd >= GROQ_TEXT_LIMIT / 2 ? lastSentenceEnd + 1 : prefix.lastIndexOf(" ");
    if (end <= 0) end = /[\uD800-\uDBFF]$/.test(prefix) ? GROQ_TEXT_LIMIT - 1 : GROQ_TEXT_LIMIT;
    yield remaining.slice(0, end).trim();
    remaining = remaining.slice(end).trimStart();
  }
  if (remaining) yield remaining;
}

function normalizeWave(wav: Buffer) {
  if (wav.length < 44 || wav.length > MAX_WAV_BYTES || wav.toString("ascii", 0, 4) !== "RIFF" ||
      wav.toString("ascii", 8, 12) !== "WAVE") throw new Error("Invalid Groq WAV");
  let sampleRate = 0;
  let pcm: Buffer | undefined;
  for (let offset = 12; offset + 8 <= wav.length;) {
    const kind = wav.toString("ascii", offset, offset + 4);
    const size = wav.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (start + size > wav.length) throw new Error("Truncated Groq WAV");
    if (kind === "fmt " && size >= 16) {
      if (wav.readUInt16LE(start) !== 1 || wav.readUInt16LE(start + 2) !== 1 || wav.readUInt16LE(start + 14) !== 16) {
        throw new Error("Unexpected Groq WAV format");
      }
      sampleRate = wav.readUInt32LE(start + 4);
    }
    if (kind === "data") pcm = wav.subarray(start, start + size);
    offset = start + size + (size % 2);
  }
  if (!pcm?.length || pcm.length % 2 || sampleRate < 8_000 || sampleRate > 48_000) throw new Error("Invalid Groq audio data");
  if (sampleRate === SAMPLE_RATE) return pcm;
  const sampleCount = pcm.length / 2;
  const length = Math.floor(sampleCount * SAMPLE_RATE / sampleRate);
  if (length * 2 > MAX_WAV_BYTES) throw new Error("Groq audio exceeded response budget");
  const result = Buffer.alloc(length * 2);
  for (let sample = 0; sample < length; sample++) {
    const position = sample * sampleRate / SAMPLE_RATE;
    const left = Math.floor(position);
    const low = pcm.readInt16LE(left * 2);
    const high = pcm.readInt16LE(Math.min(left + 1, sampleCount - 1) * 2);
    result.writeInt16LE(Math.round(low + (high - low) * (position - left)), sample * 2);
  }
  return result;
}

async function* streamGroq(text: string, key: string, signal: AbortSignal) {
  let bytes = 0;
  for (const phrase of groqPhrases(text)) {
    const response = await fetch("https://api.groq.com/openai/v1/audio/speech", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: "canopylabs/orpheus-v1-english", voice: "austin", input: GROQ_STYLE + phrase, response_format: "wav" }),
      signal: AbortSignal.any([signal, AbortSignal.timeout(12_000)]),
    });
    checkSpeechResponse(response, "playback", "groq");
    const pcm = normalizeWave(Buffer.from(await response.arrayBuffer()));
    bytes += pcm.length;
    if (bytes > MAX_WAV_BYTES) throw new Error("Groq audio exceeded response budget");
    yield pcm;
  }
}

export async function* streamVoice(text: string, signal: AbortSignal) {
  const { first, stream } = await withSpeechFallback("playback", signal, async (provider, key) => {
    // Give Gemini a short window to start. Once playback starts, keep that voice
    // for the whole answer so a provider failure can't replay the opening words.
    const opening = new AbortController();
    const timeout = setTimeout(() => opening.abort(), 8_000);
    try {
      const stream = provider === "gemini"
        ? streamGemini(text, key, AbortSignal.any([signal, opening.signal]))
        : streamGroq(text, key, signal);
      const first = await stream.next();
      if (first.done) throw new Error("Speech returned no audio");
      return { first: first.value, stream };
    } finally {
      clearTimeout(timeout);
    }
  });
  try {
    yield first;
    yield* stream;
  } finally {
    await stream.return(undefined);
  }
}

export function bufferedVoice(text: string, signal: AbortSignal) {
  return withSpeechFallback("playback", signal, async (provider, key) => {
    if (provider === "gemini") return (await synthesizeVoice(text, key, signal)).wav;
    const chunks: Buffer[] = [];
    for await (const pcm of streamGroq(text, key, signal)) chunks.push(pcm);
    const length = chunks.reduce((total, chunk) => total + chunk.length, 0);
    const header = Buffer.alloc(44);
    header.write("RIFF", 0);
    header.writeUInt32LE(36 + length, 4);
    header.write("WAVEfmt ", 8);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(1, 22);
    header.writeUInt32LE(SAMPLE_RATE, 24);
    header.writeUInt32LE(SAMPLE_RATE * 2, 28);
    header.writeUInt16LE(2, 32);
    header.writeUInt16LE(16, 34);
    header.write("data", 36);
    header.writeUInt32LE(length, 40);
    return Buffer.concat([header, ...chunks]);
  });
}
