// Shared FAQ data used by:
//   - components/sections/PhilosophyFAQ.tsx (visible on homepage, no JSON-LD)
//   - app/faq/page.tsx (dedicated page, emits FAQPage JSON-LD)
//
// To avoid duplicate FAQPage structured data across two URLs, JSON-LD is
// emitted only on the /faq page. The homepage accordion remains for UX.

export interface Faq {
  q: string;
  a: string;
}

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

export function buildFaqPageJsonLd(items: Faq[] = faqs) {
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
