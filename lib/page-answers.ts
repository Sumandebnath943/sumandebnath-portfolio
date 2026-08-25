// The extractable answer for each product page.
//
// ## Why these exist separately from lib/page-faqs.ts
//
// A page FAQ answers *specific questions* at the foot of the page. This answers
// the page's own "what is this thing" in one block, near the top, where an
// answer engine looks first. The audit that prompted this found 9 of 41 pages
// carrying such a block: /about, /profile, /resume, /projects and the five
// notebook articles. Every product page had FAQs at the bottom and no summary
// at the top, so an engine reading one had to condense the prose itself — which
// it frequently will not do.
//
// ## Rules
//
//   • **40–60 words.** Longer is truncated when quoted; shorter carries no facts.
//   • **Name the subject in the first clause.** "PentaCMD-47M is…", never "It is…".
//     The block has to survive being read with nothing around it.
//   • **Lead with what it is, then the number that proves it.** 47M parameters,
//     299K pairs, 46 agents, 38 tests. Specifics get quoted; adjectives do not.
//   • **Do not restate the page's first FAQ verbatim.** Both appear on the same
//     URL; identical paragraphs twice on one page is duplicate content, and the
//     FAQ answers a question while this states a definition.
//   • Literally true, and consistent with the page it sits on.

export interface PageAnswer {
  /** 40–60 words. See the rules above. */
  text: string;
  /** The page's accent — drives the rule down the left edge. Matches lib/pages.ts. */
  accent: string;
  /** Match the page's register so the text is readable on it. */
  variant: "dark" | "paper";
}

export const PAGE_ANSWERS: Record<string, PageAnswer> = {
  // ── Models ───────────────────────────────────────────────────────────────
  "/slms/pentacmd": {
    text: "PentaCMD-47M is a 47-million-parameter language model that turns plain English into terminal commands. Suman Debnath trained it from scratch, nanoGPT-style, on 299,000 instruction-to-command pairs across five terminal families, reaching roughly 87% exact-match accuracy. It runs locally, with no API key and no network call.",
    accent: "#38BDF8",
    variant: "dark",
  },
  "/llms/qdex-1.5b": {
    text: "Qdex-1.5B is a QLoRA fine-tuning pipeline for Qwen2.5-Coder-1.5B, built by Suman Debnath and benchmarked with HumanEval. It adapts an open-weight code model on a single consumer GPU by training low-rank adapters against a quantised base, rather than retraining the model itself.",
    accent: "#2DD4BF",
    variant: "dark",
  },

  // ── Agents ───────────────────────────────────────────────────────────────
  "/agents/pentashell": {
    text: "Pentashell is a command-line tool that converts plain English into terminal commands. It runs on PentaCMD-47M, a 47-million-parameter model Suman Debnath trained from scratch for this one task, so it needs no API key, no account and no network connection — the model sits on your machine.",
    accent: "#2FE2F0",
    variant: "dark",
  },
  "/agents/pact-agent": {
    text: "PACT Agent is a local command-line coding agent built around trust rather than autonomy. Before taking any action it states a permission contract, executes inside a sandbox, writes every effect to a journal, and runs an independent verifier that can refuse the result. Built by Suman Debnath.",
    accent: "#FF5500",
    variant: "dark",
  },
  "/agents/migi": {
    text: "MIGI is a fleet of 46 autonomous AI agents that run Suman Debnath's personal brand work, job applications, expense tracking, journaling and uptime monitoring. It is operated from a two-factor dashboard and a Telegram bot, and guarded by more than 500 automated evaluation checks rather than by supervision.",
    accent: "#C6F24E",
    variant: "dark",
  },

  // ── Applied systems ──────────────────────────────────────────────────────
  "/banking/rm-copilot": {
    text: "Banking Co-pilot is an AI assistant for retail-banking relationship managers, spanning 12 modules across customer analytics, decisioning, grounded policy answers and document verification. Every score is deterministic and explainable — no language model takes a credit decision. It carries 38 automated security tests and runs entirely on synthetic data.",
    accent: "#D9A961",
    variant: "dark",
  },
  "/projects/aegis-vault": {
    text: "AEGIS VAULT is a zero-knowledge encrypted notepad. Notes are encrypted with AES-256-GCM under an Argon2id envelope, with the key derived from the user's passphrase on their own device — so the server only ever holds ciphertext it cannot read, and a forgotten passphrase is genuinely unrecoverable.",
    accent: "#7DD3FC",
    variant: "dark",
  },

  // ── Apps and games ───────────────────────────────────────────────────────
  "/apps/migi-app": {
    text: "The MIGI Android app is a native client for the MIGI agent fleet — the 46 autonomous agents that handle Suman Debnath's brand work, applications and monitoring. It puts the fleet's approval queue on a phone, so the agents are not stalled waiting for someone to reach a desktop.",
    accent: "#C6F24E",
    variant: "dark",
  },
  "/apps/forget-anything": {
    text: "Forget Anything? is an Android app that reminds you of what you need before you leave home, triggered by geofencing and by your phone dropping off the home WiFi. The trigger is departure rather than a clock time, which is what makes the reminder arrive while you can still act on it.",
    accent: "#DAA520",
    variant: "dark",
  },
  "/games/pixelville": {
    text: "PixelVille is a procedurally generated city-builder with a working economy, seasons, weather, crime, democracy and disasters. Every city is generated from a seed rather than authored, and the systems interact — an economic downturn shows up in the crime rate and eventually at the ballot box. It runs in the browser.",
    accent: "#F5B94A",
    variant: "dark",
  },
};

export function answerForPage(href: string): PageAnswer | undefined {
  return PAGE_ANSWERS[href];
}
