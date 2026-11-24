import type { NextApiRequest, NextApiResponse } from "next";
import { chatRequestAllowed, createChatLimits } from "../../lib/portfolio-chat/request-limits";
import { MAX_USER_CHARS, MAX_VOICE_BYTES } from "../../lib/portfolio-chat/types";

export const config = { api: { bodyParser: { sizeLimit: 525_000 } } };

const { isRateLimited, overDailyCap } = createChatLimits(6, 250);
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  if (!chatRequestAllowed(req)) return res.status(403).json({ error: "Request blocked." });
  if (isRateLimited(req)) return res.status(429).json({ error: "Wait a moment before recording again." });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(503).json({ error: "Voice transcription is unavailable. You can still type a message." });
  const { audio, type } = req.body || {};
  const mime = MIME_TYPES.get(type);
  if (!mime || typeof audio !== "string" || audio.length % 4 || !/^[a-z0-9+/]+={0,2}$/i.test(audio)) {
    return res.status(400).json({ error: "The recording format was invalid. Try recording again." });
  }
  const bytes = Buffer.from(audio, "base64");
  if (bytes.length > MAX_VOICE_BYTES) return res.status(413).json({ error: "That recording is too large. Try a shorter question." });
  if (!audioMatchesFormat(bytes, mime)) return res.status(400).json({ error: "The recording format was invalid. Try recording again." });
  if (overDailyCap()) return res.status(429).json({ error: "Voice transcription has reached its limit today. You can still type a message." });

  try {
    const upstream = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        model: "gemini-3.5-transcribe",
        store: false,
        input: [{ type: "audio", mime_type: mime, data: audio }],
        generation_config: { transcription_config: { mode: { type: "verbatim" } } },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (upstream.ok) {
      const result = await upstream.json() as GeminiTranscript;
      const transcript = result.steps?.filter(({ type }) => type === "model_output")
        .flatMap(({ content }) => content ?? []).filter(({ type, text }) => type === "text" && typeof text === "string")
        .map(({ text }) => text).join(" ").trim() || "";
      if (!/[\p{L}\p{N}]/u.test(transcript)) return res.status(422).json({ error: "I didn’t hear any words. Check your microphone and try again." });
      if (transcript.length > MAX_USER_CHARS) return res.status(413).json({ error: "That question was too long. Try a shorter recording." });
      return res.status(200).json({ transcript });
    }
    console.error("Gemini transcription error:", { status: upstream.status });
  } catch (error) {
    console.error("Gemini transcription error:", { name: error instanceof Error ? error.name : "Unknown" });
  }
  return res.status(503).json({ error: "I couldn’t transcribe that recording. Try again or type your question." });
}
