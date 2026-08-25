// Per-page questions and answers.
//
// ## Why this exists, when /faq already does
//
// /faq is one page carrying 27 questions about Suman. It ranks and answers well
// for "who is…" queries and does nothing at all for "what is PentaCMD-47M" —
// because the answer to that lives in prose on a product page, and prose is
// what an answer engine skips.
//
// The pattern that gets quoted is narrow and consistent: a question phrased the
// way a person would ask it, followed immediately by a self-contained answer
// that survives being read with no surrounding page. Not a feature list. Not a
// paragraph that opens with "It". These are written to be lifted verbatim.
//
// ## Rules for writing one
//
//   • The question is what somebody would type, not what we wish they typed.
//   • The answer stands alone: name the subject in the first clause, never a
//     pronoun pointing back at the question.
//   • Two to four sentences. Longer gets truncated; shorter gets skipped.
//   • Specifics beat adjectives every time. "47M parameters, 299K training
//     pairs, ~87% exact-match" is quotable; "a powerful small model" is not.
//   • Everything here must be literally true and consistent with the page it
//     sits on. This is the copy most likely to be repeated by a machine with no
//     ability to check it.
//
// Consumed by components/ui/PageFaq.tsx, which renders them visibly and emits
// FAQPage structured data for the route.

export interface PageFaq {
  q: string;
  a: string;
}

export const PAGE_FAQS: Record<string, PageFaq[]> = {
  // ── Models ───────────────────────────────────────────────────────────────
  "/slms/pentacmd": [
    {
      q: "What is PentaCMD-47M?",
      a: "PentaCMD-47M is a 47-million-parameter small language model trained from scratch, nanoGPT-style, to translate plain English into terminal commands. It was trained on 299,000 instruction-to-command pairs spanning five terminal families and reaches roughly 87% exact-match accuracy. It was built by Suman Debnath and is publicly available.",
    },
    {
      q: "Why train a 47M-parameter model instead of using a large LLM?",
      a: "Natural-language-to-terminal-command is a narrow, highly structured task with a small output space, so it does not need general reasoning. A 47M-parameter model trained specifically on that mapping runs locally, responds instantly, costs nothing per call, and requires no network round trip — none of which a hosted frontier model can offer for the same job.",
    },
    {
      q: "What does training a language model from scratch actually involve?",
      a: "Training PentaCMD-47M from scratch meant building the dataset of 299,000 instruction-to-command pairs, defining the tokenizer and model architecture, running the training loop, and evaluating with exact-match scoring against held-out commands. No pre-trained weights were used as a starting point, which is what distinguishes training from scratch from fine-tuning.",
    },
  ],

  "/llms/qdex-1.5b": [
    {
      q: "What is Qdex-1.5B?",
      a: "Qdex-1.5B is a QLoRA fine-tuning pipeline for Qwen2.5-Coder-1.5B, trained on instruction-style coding data and benchmarked with HumanEval. It was built by Suman Debnath as a working demonstration of adapting an open-weight code model on consumer hardware.",
    },
    {
      q: "What is the difference between QLoRA fine-tuning and training from scratch?",
      a: "QLoRA fine-tuning starts from existing pre-trained weights and trains a small number of low-rank adapter parameters against a quantised base model, which makes it feasible on a single consumer GPU. Training from scratch starts with random weights and learns everything, which needs far more data and compute. Qdex-1.5B is the former; PentaCMD-47M is the latter.",
    },
    {
      q: "Why benchmark a fine-tuned model with HumanEval?",
      a: "HumanEval measures functional correctness by executing generated code against tests, rather than comparing it to a reference string. For a coding model that is the only measurement that matters — code can be worded very differently from the reference and still be correct, or nearly identical to it and still be broken.",
    },
  ],

  // ── Agents ───────────────────────────────────────────────────────────────
  "/agents/pentashell": [
    {
      q: "What is Pentashell?",
      a: "Pentashell is a command-line tool that turns plain English into terminal commands, running on PentaCMD-47M — a 47-million-parameter language model trained from scratch for that specific task. Because the model runs locally, Pentashell needs no API key and no network connection.",
    },
    {
      q: "How is Pentashell different from an AI coding assistant?",
      a: "Pentashell does one narrow thing: it maps a natural-language instruction to a shell command, using a purpose-trained 47M-parameter model rather than a general frontier LLM. That makes it local, instant and free to run, and it does not attempt the broader code-writing and reasoning work a general assistant does.",
    },
  ],

  "/agents/pact-agent": [
    {
      q: "What is PACT Agent?",
      a: "PACT Agent is a local command-line coding agent built around a trust model rather than autonomy. It states a permission contract before taking any action, executes inside a sandbox, writes every effect to a journal, and runs an independent verifier that can refuse the result. It was built by Suman Debnath.",
    },
    {
      q: "Why does a coding agent need a permission contract?",
      a: "An agent that can edit files and run commands can also destroy work, and the usual failure is not malice but confident wrongness. A permission contract declared before execution means the operator approves the scope of possible damage in advance rather than reviewing it afterwards, and the journal makes every effect reversible in principle.",
    },
  ],

  "/agents/migi": [
    {
      q: "What is MIGI?",
      a: "MIGI is a fleet of 46 autonomous AI agents that run personal brand work, job applications, expense tracking, journaling and uptime monitoring. It is controlled from a two-factor-authenticated dashboard and a Telegram bot, and is guarded by more than 500 automated evaluation checks. It was built by Suman Debnath.",
    },
    {
      q: "How do you keep a fleet of 46 autonomous agents from drifting?",
      a: "With an evaluation harness rather than supervision. MIGI runs over 500 automated eval checks, so a regression in any agent's behaviour is caught by a failing check instead of by someone noticing the output looks wrong. Human-approval gates sit in front of the actions that are expensive to undo.",
    },
  ],

  // ── Applied systems ──────────────────────────────────────────────────────
  // The first three were previously hand-rolled as FAQPage JSON-LD inside
  // app/banking/rm-copilot/page.tsx with **no visible counterpart anywhere on
  // the page**. Google's FAQPage guidelines require the question and answer to
  // be visible to the reader; markup-only FAQ content is at best ignored and at
  // worst treated as cloaking. Moving them here renders them and keeps the
  // structured data, from one source instead of two.
  "/banking/rm-copilot": [
    {
      q: "What is the Banking Co-pilot?",
      a: "The Banking Co-pilot is an AI assistant for retail-banking relationship managers, spanning 12 modules across customer analytics, decisioning, grounded policy answers and document verification. Every score it produces is deterministic and explainable — no language model takes a credit decision. It runs entirely on synthetic data.",
    },
    {
      q: "Does Banking Co-pilot let a language model make credit decisions?",
      a: "No. Every score — financial health, risk probability, loan eligibility, lead quality and next best action — is computed by a deterministic engine with named, weighted factors. No language model touches any of them. LLMs are confined to conversation, synthesising a cited answer from retrieved bank policy, and reading a document image.",
    },
    {
      q: "Why does the API return 404 instead of 403 for another Relationship Manager's customer?",
      a: "Because 403 Forbidden confirms the record exists. An attacker probing sequential customer ids could map the bank's entire customer ID space from the difference between a 403 and a 404, without reading any record. Returning 404 for both 'does not exist' and 'not yours' makes the two cases indistinguishable and the enumeration worthless.",
    },
    {
      q: "Is Banking Co-pilot built on real customer data?",
      a: "No. The dataset is entirely synthetic — 24 generated customers across 4 Relationship Managers, 8 policy documents and 8 government schemes. No real customer data is used anywhere. The security controls are built to production quality so the platform is ready for real, governed data.",
    },
    {
      q: "How was the Banking Co-pilot secured?",
      a: "Through five hardening phases driven by three independent audits: per-relationship-manager data isolation, insecure direct object references closed by returning 404 rather than 403, PII masking, an append-only audit trail, row-level security, and prompt-injection isolation with validated citations. It carries 38 automated security tests, 17 of which drive a live server.",
    },
  ],

  "/projects/aegis-vault": [
    {
      q: "What is AEGIS VAULT?",
      a: "AEGIS VAULT is a zero-knowledge encrypted notepad. Notes are encrypted with AES-256-GCM under an Argon2id envelope, so the key is derived from the user's passphrase on their own device and the server never holds anything it could decrypt.",
    },
    {
      q: "What does zero-knowledge actually mean here?",
      a: "It means the service cannot read the data even if it wants to. Encryption and decryption happen client-side with a key derived from the user's passphrase via Argon2id, so what reaches the server is ciphertext. A breach of the server yields nothing readable, and a forgotten passphrase is genuinely unrecoverable.",
    },
  ],

  // ── Apps and games ───────────────────────────────────────────────────────
  "/apps/migi-app": [
    {
      q: "What is the MIGI Android app?",
      a: "The MIGI Android app is a native client for the MIGI agent fleet — the 46 autonomous agents that handle personal brand work, job applications, expense tracking and monitoring. It puts fleet control and approvals on a phone rather than requiring the desktop dashboard.",
    },
    {
      q: "Why does an agent fleet need a phone app at all?",
      a: "Because the agents run continuously and the human approvals they wait on do not. A fleet that can only be approved from a desktop stalls every time its operator is away from one, so the queue backs up and the automation stops paying for itself. Putting the approval gate on a phone is what keeps the loop moving.",
    },
    {
      q: "Is the MIGI Android app built natively or with a cross-platform framework?",
      a: "Natively for Android. The V2 client is the current build; V1 is archived. Native was the right call for a control surface that needs background notifications and fast cold starts — an approval that arrives late is an approval that has already cost the fleet an hour.",
    },
  ],

  "/apps/forget-anything": [
    {
      q: "What does the Forget Anything? app do?",
      a: "Forget Anything? is an Android app that reminds you of the things you need before you leave home, triggered by geofencing and by your phone departing the home WiFi network. The trigger is leaving a place rather than a clock time, which is what makes the reminder arrive while it is still useful.",
    },
    {
      q: "Why use WiFi departure as well as geofencing for reminders?",
      a: "Because each one fails where the other works. A GPS geofence is slow to trigger indoors and drains battery at a tight radius; WiFi disconnection fires the moment you step out of range but only works if the network was joined. Using both means the reminder lands whichever way you leave, and the earlier of the two wins.",
    },
    {
      q: "How is a location reminder different from a normal to-do reminder?",
      a: "A timed reminder fires when the clock says so, which is almost never the moment you can act on it — being told at 9am to take your gym bag is useless if you leave at 7:40. A location reminder fires at the point of departure, which is the last moment the information can still change what you do.",
    },
  ],

  "/games/pixelville": [
    {
      q: "What is PixelVille?",
      a: "PixelVille is a procedurally generated city-builder with a working economy, seasons, weather, crime, democracy and disasters. Each city is generated rather than authored, and the simulated systems interact — so an economic downturn shows up in the crime rate and eventually at the ballot box.",
    },
    {
      q: "What does it mean that PixelVille is procedurally generated?",
      a: "The map, the terrain and the starting conditions are produced by algorithm from a seed rather than drawn by hand, so no two cities begin the same way. The systems on top of it — economy, weather, crime, elections — are simulated rather than scripted, which means outcomes emerge from how they interact instead of following a designed storyline.",
    },
    {
      q: "Can you play PixelVille in a browser?",
      a: "Yes. It runs in the browser with nothing to install, which is deliberate — a simulation game that needs a download loses most of the people who were curious enough to click. The live build is linked from the top of this page.",
    },
  ],

  // ── Site sections ────────────────────────────────────────────────────────
  "/notebook": [
    {
      q: "What is the Notebook?",
      a: "The Notebook is Suman Debnath's engineering write-ups: first-hand accounts of specific problems hit while building AI-native products, each with the symptom, the cause and the fix. The entries are original and dated, drawn from a production codebase rather than summarised from other sources.",
    },
    {
      q: "What kind of problems does the Notebook cover?",
      a: "Mostly the failures that produce no error message — a CSS rule that silently disables another, a framework rename that leaves the old file compiling but never running, a development-mode behaviour that permanently disables a feature. These cost the most time to diagnose and are the least well documented.",
    },
  ],

  "/projects": [
    {
      q: "What has Suman Debnath built?",
      a: "Suman Debnath has independently built and shipped more than twenty AI-native systems, including ROASmind (a marketing operating system), IMPRINT (identity preservation), LEGATUS (digital inheritance), CITE (career intelligence), EMBER (burnout recovery), a 46-agent autonomous fleet, a 47M-parameter language model trained from scratch, and a retail-banking AI copilot.",
    },
    {
      q: "Did Suman Debnath build these alone?",
      a: "Yes. Every system in the archive was designed, built and shipped independently, using AI-native engineering environments — Claude Code, Antigravity, Cursor, Codex and Lovable — as the working method rather than as an assistant bolted onto a conventional one.",
    },
  ],

  "/about": [
    {
      // Deliberately NOT "Who is Suman Debnath?" — /faq owns that question, and
      // the same question answered differently on two URLs is the collision
      // lib/faqs.ts warns about. See the note at the bottom of this file.
      q: "What is Suman Debnath's professional background?",
      a: "Suman Debnath spent nine years in brand and digital marketing leadership — brand strategy, campaign architecture, growth systems and creative direction — before moving into AI-native product engineering, where he has independently shipped software for two years. He holds a BA in English, an MBA in Marketing, and a postgraduate programme in Strategic Digital Marketing, and is based between Pune and Kolkata, India.",
    },
    {
      q: "How does a brand marketer become an AI product builder?",
      a: "By treating AI as infrastructure rather than as a tool. The route runs through structured prompt and context engineering, then agentic workflows, then full-stack product development inside AI-native environments. The marketing decade compounds rather than being discarded — knowing what a growth team actually needs is what makes the products worth building.",
    },
  ],

  "/philosophy": [
    {
      q: "What are Suman Debnath's operating principles?",
      a: "Six: intelligence is infrastructure rather than a feature; systems compound where one-off execution collapses; human identity must survive automation; craft still separates meaningful systems from noise; speed is a creative advantage in AI-native work; and taste is what remains scarce when execution becomes cheap.",
    },
  ],
};

// ── The one hard constraint ────────────────────────────────────────────────
//
// **No question here may duplicate one in lib/faqs.ts.** That file carries the
// 27 questions on /faq and emits its own FAQPage; the same question answered
// two different ways on two URLs is a content collision, and Google will pick
// one and discount the other rather than showing both.
//
// The split that keeps them apart: /faq answers questions about *the person*,
// and this file answers questions about *a specific thing on a specific page*.
// When a question could plausibly sit in either, it belongs in /faq.
export function faqsForPage(href: string): PageFaq[] {
  return PAGE_FAQS[href] ?? [];
}
