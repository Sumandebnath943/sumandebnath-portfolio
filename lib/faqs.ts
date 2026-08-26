// Shared FAQ data used by:
//   - components/sections/PhilosophyFAQ.tsx (homepage, philosophy set only)
//   - app/faq/page.tsx (dedicated page, renders allFaqs + FAQPage JSON-LD)
//
// Two named sets:
//   - faqs        → operating principles / transition questions (homepage)
//   - aboutFaqs   → biographical, capabilities, products, education
//   - allFaqs     → concatenated, used by /faq for the canonical archive
//
// FAQPage JSON-LD is emitted only on /faq to avoid duplicate structured
// data across URLs (Google flags that as a content collision).

export interface Faq {
  q: string;
  a: string;
}

// ── Philosophy & transition set (homepage + /faq) ────────────────────────
export const faqs: Faq[] = [
  {
    q: "What does it mean that intelligence is infrastructure?",
    a: "AI is no longer a feature. It is becoming the foundational layer through which products, systems, interfaces, operations, and decisions are designed. The future will not belong to people who merely use AI — it will belong to those who can architect around it.",
  },
  {
    q: "Why do systems matter more than one-off execution?",
    a: "One-off execution eventually collapses under scale. Systems do not. The goal is no longer to simply solve problems, but to build environments where solutions continuously emerge, adapt, and evolve.",
  },
  {
    q: "How does human identity survive automation?",
    a: "As artificial intelligence becomes more capable, human originality becomes more valuable. The challenge is no longer access to intelligence — it is preserving judgment, taste, instinct, perspective, and human identity inside increasingly automated systems.",
  },
  {
    q: "Does craft still matter when AI accelerates execution?",
    a: "AI accelerates execution, but execution without taste creates noise. Design, clarity, composition, language, and emotional precision still separate meaningful systems from disposable ones.",
  },
  {
    q: "Why is speed a creative advantage in AI-native work?",
    a: "AI-native environments have fundamentally changed the relationship between thought and execution. The ability to rapidly prototype, iterate, test, and evolve systems is now a strategic advantage.",
  },
  {
    q: "What is an AI-native product builder?",
    a: "An AI-native product builder is an operator who designs, engineers, automates, and ships products with AI as the foundational layer of the workflow — not a feature bolted on. The role converges design, strategy, systems thinking, automation, engineering, and AI orchestration into one operating model.",
  },
  {
    q: "What is an AI generalist?",
    a: "An AI generalist is a multi-disciplinary operator who works across the full AI stack — prompt engineering, agentic systems, LLM orchestration, automation, product strategy, and engineering — rather than specializing in a single layer. The role exists because AI-native work rewards breadth across the entire pipeline.",
  },
  {
    q: "How does someone transition from branding and digital marketing into AI-native software development?",
    a: "By treating AI as infrastructure, not as a tool. The transition begins with structured prompt and context engineering, then agentic workflows, then full-stack AI product development using environments like Claude Code, Antigravity, Codex, Cursor, and Lovable. The decade of operational experience in brand, growth, and systems thinking compounds — it does not get discarded.",
  },
];

// ── About / capabilities / products set (/faq only) ──────────────────────
// Appended below the philosophy set on the FAQ archive page.
export const aboutFaqs: Faq[] = [
  {
    // Deliberately NOT the bare "Who is Suman Debnath?" any more.
    //
    // /about is now titled and headed for exactly those four words and carries a
    // QAPage node answering them. Two URLs answering the identical question is
    // the collision this file warns about at the bottom — Google picks one and
    // discounts the other, and the one that should win is the page named for it.
    //
    // This asks the adjacent question instead: same subject, different words, no
    // competition. It still carries the disambiguation, because a reader who
    // lands here rather than on /about needs it just as much.
    q: "What does Suman Debnath do?",
    a: "Suman Debnath designs and ships AI-native products end to end — deciding what a product should be, architecting it, building it and maintaining it, alone. He combines nearly a decade in brand strategy, digital marketing and growth systems with hands-on AI product engineering, and has independently shipped IMPRINT, LEGATUS, CITE, EMBER, ROASmind and D-PE.ai. (This is not the Suman Debnath who is a Principal Developer Advocate at AWS — a different person.)",
  },
  {
    q: "Is this the same Suman Debnath who works at AWS?",
    a: "No. This portfolio belongs to Suman Debnath the Senior Brand Marketing Manager and AI-native product builder based in Pune and Kolkata, India — creator of ROASmind, IMPRINT, LEGATUS, CITE, EMBER, and D-PE.ai. There is a separate, unrelated Suman Debnath who works as a Principal Developer Advocate (AI/ML) at AWS, as well as other people who share the name. They are different individuals.",
  },
  {
    q: "Can a brand marketing manager become an AI product manager?",
    a: "Yes — and the combination is unusually strong. Brand and digital marketing leadership develops exactly the muscles AI product roles depend on: customer understanding, positioning, prioritisation, stakeholder management, and translating complex capability into clear user value. Suman Debnath layered hands-on AI engineering on top of that foundation, independently building and shipping AI-native products rather than only commissioning them — so he can both define the product vision and execute it with engineers.",
  },
  {
    q: "What makes Suman Debnath qualified for an AI Product Manager or AI Product Marketing role?",
    a: "Two things rarely found in one person. First, nine-plus years of brand and digital marketing leadership — campaign systems, growth, performance marketing, creative direction, and operational execution at scale. Second, two years of hands-on AI-native product building: prompt and context engineering, agentic workflows, LLM orchestration, and full-stack AI-assisted development that has shipped multiple live products. That pairing lets him own product strategy, go-to-market, and technical execution for AI products end to end.",
  },
  {
    q: "What does “AI-native systems builder” mean?",
    a: "It means building products, workflows, and operational systems where AI is treated as foundational infrastructure rather than a supporting feature. Suman combines strategy, systems thinking, design, automation, and AI-assisted engineering to rapidly prototype and deploy intelligent software solutions.",
  },
  {
    q: "Does Suman write code traditionally?",
    a: "Suman operates through AI-assisted engineering workflows rather than traditional manual programming. Using advanced AI-native development environments like Claude Code, Antigravity, Cursor, Codex, Replit, Lovable, and V0, he orchestrates the architecture, logic, workflows, systems thinking, product direction, and execution of large-scale applications.",
  },
  {
    q: "What kind of products has Suman built?",
    a: "Suman has built multiple AI-native systems including IMPRINT (identity preservation engine), LEGATUS (digital legacy vault), ROASmind (AI-native operating system in development), EMBER (burnout recovery companion), CITE (career intelligence system), Crawl Daddy (SEO intelligence crawler), Repurpose AI, Brief Killer, Slide Doctor, Geek Collectibles, and several internal AI workflow systems.",
  },
  {
    q: "What is IMPRINT?",
    a: "IMPRINT is an identity preservation engine designed to help individuals protect and strengthen their human thinking, originality, communication patterns, and decision-making abilities in the age of artificial intelligence.",
  },
  {
    q: "What is LEGATUS?",
    a: "LEGATUS is a secure digital legacy vault designed for post-life data transfer and inheritance management. It allows users to securely store credentials, legal documents, sensitive information, and digital assets while controlling nominee-based access after verified death confirmation.",
  },
  {
    q: "What is ROASmind?",
    a: "ROASmind is a large-scale AI-native operational system currently under development. It is being built as an intelligent orchestration environment focused on AI-assisted execution, workflows, systems thinking, and scalable business infrastructure.",
  },
  {
    q: "How large are the systems being built?",
    a: "Some of the systems being developed have already crossed hundreds of thousands of lines of AI-assisted generated code. One of the current flagship systems under active development has exceeded 200,000 lines of code.",
  },
  {
    q: "What are Suman’s core professional capabilities?",
    a: "Suman’s core expertise spans branding, brand management, digital marketing, growth systems, SEO, answer engine optimisation (AEO), generative engine optimisation (GEO), agentic readiness, paid advertising, creative direction, design systems, campaign architecture, automation workflows, AI-native execution systems, operational strategy, and AI-assisted product development.",
  },
  {
    q: "What AI systems and tools does Suman work with?",
    a: "Suman works across a broad AI-native ecosystem including ChatGPT, Claude, Gemini, DeepSeek, Grok, LLaMA, Stable Diffusion, GPT Image, Firefly, Claude Code, Cursor, Antigravity, V0, Replit, Bolt, Lovable, Codex, Make.com, n8n, Zapier, and multiple AI-assisted operational environments.",
  },
  {
    q: "What industries has Suman worked in?",
    a: "Suman has worked across higher education, branding, digital marketing, SaaS systems, AI-native product ecosystems, growth infrastructure, operational automation, SEO systems, and AI-assisted business tooling.",
  },
  {
    q: "What is Suman’s current professional role?",
    a: "Suman currently works as a Senior Brand Marketing Manager at Pune Institute of Business Management, where he has led branding initiatives, campaign systems, digital infrastructure, creative direction, and institutional growth operations since 2019 — while independently building AI-native products in parallel.",
  },
  {
    q: "What is Suman’s educational background?",
    a: "Suman holds a BA in English (Hons.), an MBA in Marketing, a PGP in Strategic Digital Marketing, and is also certified in Prompt & Context Engineering. He is currently pursuing advanced learning in Agentic & Generative AI systems.",
  },
  {
    q: "What makes Suman’s approach different from traditional software development?",
    a: "Suman approaches software development as a systems orchestration problem rather than purely manual coding. His workflow combines AI-assisted engineering, strategic systems thinking, rapid prototyping, operational design, and intelligent execution frameworks to accelerate product creation.",
  },
  {
    q: "What kind of collaborations is Suman open to?",
    a: "Suman is open to collaborations involving AI-native products, automation systems, SaaS ecosystems, intelligent workflows, branding systems, growth infrastructure, operational strategy, and future-focused AI-assisted execution environments.",
  },

  // ── Added Aug 2026 ──────────────────────────────────────────────────────
  // The set above was written before PentaCMD-47M, Qdex-1.5B, the MIGI fleet
  // and the Banking Co-pilot existed, and it showed: the archive answered
  // questions about IMPRINT and ROASmind and said nothing about the work that
  // now most distinguishes him. It also had no answer at all to the two
  // questions a recruiter actually opens an FAQ to ask — is he available, and
  // can any of this be checked.
  //
  // These are person-level questions by design. Product-level questions live in
  // lib/page-faqs.ts, on the product's own page. See the note at the bottom of
  // that file for why the two sets must never overlap.
  {
    q: "Has Suman Debnath actually trained AI models, or only used them?",
    a: "Both. PentaCMD-47M is a 47-million-parameter language model he trained from scratch, nanoGPT-style, on 299,000 instruction-to-command pairs, reaching roughly 87% exact-match accuracy. Qdex-1.5B is a QLoRA fine-tuning pipeline for Qwen2.5-Coder-1.5B, benchmarked with HumanEval. Both are published, and both are separate from the applied work of building products on top of hosted models.",
  },
  {
    q: "Is Suman Debnath available for hire, and where is he based?",
    a: "Yes. He is based between Pune, Maharashtra and Kolkata, West Bengal, India, is open to remote and relocation, and serves a 90-day notice period. He is pursuing Product Marketing Manager, Senior Brand Marketing Manager, AI Product Manager and AI Product Marketing Manager roles.",
  },
  {
    q: "Can a marketer really build production software, or is this AI-assisted hobby work?",
    a: "The output is testable rather than a matter of opinion. The Banking Co-pilot carries 38 automated security tests — 17 driving a live server — and was hardened across five phases against three independent audits. The MIGI fleet runs 46 agents behind more than 500 automated evaluation checks. A language model trained from scratch either hits its benchmark or does not; PentaCMD-47M reports ~87% exact-match.",
  },
  {
    q: "How can someone verify the claims on this site?",
    a: "Every number stated here is stated on a specific page, and the machine-readable summary at /llms.txt lists each claim beside the page that carries it. The models are published, the code for several tools is on GitHub, and the live products are linked from their own pages. The engineering write-ups at /notebook are first-hand accounts with reproducible steps.",
  },
  {
    q: "Does Suman Debnath write about engineering?",
    a: "Yes, at /notebook — first-hand articles about specific problems hit while building AI-native products, each with the symptom, the cause and the fix. The subjects are mostly failures that produce no error message: a CSS rule that silently disables another, a framework rename that leaves the old file compiling but never running, a development-mode behaviour that permanently disables a feature.",
  },
  {
    q: "What does Suman Debnath's day-to-day work actually look like?",
    a: "Designing and shipping whole systems alone: deciding what a product should be, architecting it, building it inside AI-native environments such as Claude Code, Cursor, Antigravity and Codex, deploying it, and then maintaining it. The marketing half has not been discarded — positioning, naming, growth systems and the writing are all part of the same job.",
  },
];

// ── Combined archive (used by /faq) ──────────────────────────────────────
export const allFaqs: Faq[] = [...faqs, ...aboutFaqs];

export function buildFaqPageJsonLd(items: Faq[] = allFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
