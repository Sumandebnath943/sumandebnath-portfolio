export type SpeechProvider = "gemini" | "groq";
type SpeechTask = "playback" | "transcription";

class ProviderFailure extends Error {
  constructor(readonly status: number, readonly retryAfter?: number) {
    super("Speech provider request failed");
  }
}

export class SpeechUnavailable extends Error {
  readonly status: 429 | 503;
  readonly retryAfter?: number;

  constructor(readonly attempts: { provider: SpeechProvider; status?: number; retryAfter?: number }[]) {
    super("Speech is unavailable");
    this.status = attempts.length > 0 && attempts.every(({ status }) => status === 429) ? 429 : 503;
    if (this.status === 429) this.retryAfter = Math.min(...attempts.map(({ retryAfter }) => retryAfter ?? 30));
  }
}

const cooldown = new Map<string, number>();

function retrySeconds(header: string | null) {
  if (!header) return 30;
  const seconds = /^\d+(?:\.\d+)?$/.test(header) ? Number(header) : (Date.parse(header) - Date.now()) / 1_000;
  return Number.isFinite(seconds) && seconds > 0 ? Math.ceil(seconds) : 30;
}

export function checkSpeechResponse(response: Response, task: SpeechTask, provider: SpeechProvider) {
  if (response.ok) return;
  void response.body?.cancel().catch(() => {});
  if (response.status === 429) {
    const retryAfter = retrySeconds(response.headers.get("retry-after"));
    cooldown.set(`${task}:${provider}`, Date.now() + retryAfter * 1_000);
    throw new ProviderFailure(429, retryAfter);
  }
  throw new ProviderFailure(response.status);
}

export async function withSpeechFallback<T>(
  task: SpeechTask,
  signal: AbortSignal,
  run: (provider: SpeechProvider, key: string) => Promise<T>,
) {
  const keys = { gemini: process.env.GEMINI_API_KEY, groq: process.env.GROQ_API_KEY };
  const attempts: SpeechUnavailable["attempts"] = [];
  for (const provider of ["gemini", "groq"] as const) {
    signal.throwIfAborted();
    const key = keys[provider];
    if (!key) continue;
    const until = cooldown.get(`${task}:${provider}`) ?? 0;
    if (until > Date.now()) {
      attempts.push({ provider, status: 429, retryAfter: Math.ceil((until - Date.now()) / 1_000) });
      continue;
    }
    try {
      return await run(provider, key);
    } catch (error) {
      signal.throwIfAborted();
      const failure = error instanceof ProviderFailure ? error : undefined;
      attempts.push({ provider, status: failure?.status, retryAfter: failure?.retryAfter });
      // A rejected input should not be retried with a different provider.
      if (failure?.status === 400 || failure?.status === 422) break;
    }
  }
  throw new SpeechUnavailable(attempts);
}
