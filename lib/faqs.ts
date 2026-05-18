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
    q: "Who is Suman Debnath?",
    a: "Suman Debnath is an AI-native systems builder, brand strategist, and digital operator with nearly a decade of experience across branding, digital marketing, growth systems, design, and operational execution. His work now focuses on building AI-assisted products, intelligent workflows, automation systems, and AI-native software ecosystems.",
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
    a: "Suman’s core expertise spans branding, brand management, digital marketing, growth systems, SEO, paid advertising, creative direction, design systems, campaign architecture, automation workflows, AI-native execution systems, operational strategy, and AI-assisted product development.",
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
    a: "Suman currently works as a Brand Marketing Manager at Pune Institute of Business Management, where he has led branding initiatives, campaign systems, digital infrastructure, creative direction, and institutional growth operations since 2019.",
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
