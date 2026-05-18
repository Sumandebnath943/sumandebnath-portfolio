// Server component — emits FAQPage JSON-LD plus a visible FAQ block.
// Each philosophy principle becomes a question/answer pair so AI engines
// (Google AI Overviews, Perplexity, ChatGPT, Claude) can lift the answers
// directly into their summaries.

const faqs = [
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function PhilosophyFAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-white text-[#0A0A0A] border-t border-black/[0.06]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#999] mb-6">
            Frequently Asked
          </p>
          <h2
            id="faq-heading"
            className="font-manrope font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6"
          >
            Questions about{" "}
            <span className="font-serif italic font-normal text-[#0A0A0A]/70">
              AI-native
            </span>{" "}
            work.
          </h2>
          <p className="font-manrope text-base text-[#444] leading-relaxed">
            Direct answers to the questions recruiters, founders, and operators
            most often ask about the AI-native product builder operating model.
          </p>
        </div>

        <div className="divide-y divide-black/[0.08]">
          {faqs.map((f, i) => (
            <details key={i} className="group py-6">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-manrope font-medium text-lg md:text-xl text-[#0A0A0A] pr-6">
                  {f.q}
                </h3>
                <span
                  aria-hidden
                  className="font-mono text-xl text-[#666] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="font-manrope text-[15px] md:text-base text-[#333] leading-[1.8] mt-4 max-w-3xl">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
