import type { NextApiRequest, NextApiResponse } from "next";
import { chatRequestAllowed, createChatLimits } from "../../lib/portfolio-chat/request-limits";
import { checkSpeechResponse, SpeechUnavailable, withSpeechFallback } from "../../lib/portfolio-chat/speech-fallback";
import { MAX_USER_CHARS, MAX_VOICE_BYTES } from "../../lib/portfolio-chat/types";

export const config = { api: { bodyParser: { sizeLimit: 1_025_000 } }, maxDuration: 40 };

const { isRateLimited, overDailyCap } = createChatLimits(10, 250);
const PORTFOLIO_VOCABULARY = ["Suman Debnath", "Pune Institute of Business Management", "Milo", "MIGI", "Pentashell", "PACT Agent", "PentaCMD", "Qdex-1.5B", "OutreachOS", "ROASmind", "IMPRINT", "LEGATUS", "CITE", "AEGIS VAULT", "NUNO", "PixelVille", "Crawl Daddy", "That One Crawler", "Brief Killer", "Soul Canvas"];
const INPUT_BREAK = "My ears are taking a breather. You can still type your question.";
const INPUT_LIMIT = "I’ve reached my listening limit for now. You can still type your question.";
const MIME_TYPES = new Map([
  ["audio/webm", "audio/webm"],
  ["audio/ogg", "audio/ogg"],
  ["audio/mp4", "audio/m4a"],
  ["audio/wav", "audio/wav"],
]);

function audioMatchesFormat(audio: Buffer, mime: string) {
  if (audio.length < 32) return false;
  if (mime === "audio/webm") return audio.readUInt32BE(0) === 0x1a45dfa3;
  if (mime === "audio/ogg") return audio.toString("ascii", 0, 4) === "OggS";
  if (mime === "audio/m4a") return audio.toString("ascii", 4, 8) === "ftyp";
  return audio.toString("ascii", 0, 4) === "RIFF" && audio.toString("ascii", 8, 12) === "WAVE";
}

type GeminiTranscript = { steps?: { type: string; content?: { type: string; text?: string }[] }[] };

async function transcribeGemini(audio: string, mime: string, key: string, signal: AbortSignal) {
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      model: "gemini-3.5-transcribe",
      store: false,
      input: [{ type: "audio", mime_type: mime, data: audio }],
      generation_config: { transcription_config: { mode: { type: "verbatim" }, custom_vocabulary: PORTFOLIO_VOCABULARY } },
    }),
    signal,
  });
  checkSpeechResponse(response, "transcription", "gemini");
  const result = await response.json() as GeminiTranscript;
  return result.steps?.filter(({ type }) => type === "model_output")
    .flatMap(({ content }) => content ?? []).filter(({ type, text }) => type === "text" && typeof text === "string")
    .map(({ text }) => text).join(" ").trim() || "";
}

async function transcribeGroq(audio: Buffer, mime: string, key: string, signal: AbortSignal) {
  const form = new FormData();
  form.set("file", new Blob([Uint8Array.from(audio)], { type: mime }), `question.${mime.split("/")[1]}`);
  form.set("model", "whisper-large-v3-turbo");
  form.set("prompt", PORTFOLIO_VOCABULARY.join(", "));
  const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: form,
    signal,
  });
  checkSpeechResponse(response, "transcription", "groq");
  const result = await response.json() as { text?: string };
  return typeof result.text === "string" ? result.text.trim() : "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  if (!chatRequestAllowed(req)) return res.status(403).json({ error: "Request blocked." });
  if (isRateLimited(req)) return res.status(429).json({ error: "Wait a moment before recording again." });

  const { audio, type } = req.body || {};
  const mime = MIME_TYPES.get(type);
  if (!mime || typeof audio !== "string" || audio.length % 4 || !/^[a-z0-9+/]+={0,2}$/i.test(audio)) {
    return res.status(400).json({ error: "The recording format was invalid. Try recording again." });
  }
  const bytes = Buffer.from(audio, "base64");
  if (bytes.length > MAX_VOICE_BYTES) return res.status(413).json({ error: "That recording is too large. Try a shorter question." });
  if (!audioMatchesFormat(bytes, mime)) return res.status(400).json({ error: "The recording format was invalid. Try recording again." });
  if (overDailyCap()) return res.status(429).json({ error: INPUT_LIMIT });

  const controller = new AbortController();
  const disconnected = () => controller.abort();
  res.once("close", disconnected);
  try {
    const transcript = await withSpeechFallback("transcription", controller.signal, (provider, key) => {
      const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(15_000)]);
      return provider === "gemini" ? transcribeGemini(audio, mime, key, signal) : transcribeGroq(bytes, mime, key, signal);
    });
    if (!/[\p{L}\p{N}]/u.test(transcript)) return res.status(422).json({ error: "I didn’t hear any words. Check your microphone and try again." });
    if (transcript.length > MAX_USER_CHARS) return res.status(413).json({ error: "That question was too long. Try a shorter recording." });
    return res.status(200).json({ transcript });
  } catch (error) {
    if (controller.signal.aborted) return;
    const failure = error instanceof SpeechUnavailable ? error : undefined;
    console.error("Chat transcription unavailable:", failure?.attempts ?? { name: error instanceof Error ? error.name : "Unknown" });
    if (failure?.retryAfter) res.setHeader("Retry-After", failure.retryAfter);
    return res.status(failure?.status ?? 503).json({ error: failure?.status === 429 ? INPUT_LIMIT : INPUT_BREAK });
  } finally {
    res.off("close", disconnected);
  }
}
