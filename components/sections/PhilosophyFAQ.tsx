// Server component — renders the visible FAQ accordion on the homepage.
// FAQPage JSON-LD is intentionally NOT emitted here. The dedicated /faq page
// owns the structured-data anchor to avoid duplicate FAQ schema across two
// URLs (which Google flags as content collision).

import { faqs } from "@/lib/faqs";

export default function PhilosophyFAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-white text-[#0A0A0A] border-t border-black/[0.06]"
    >
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
            most often ask about the AI-native product builder operating model.{" "}
            <a
              href="/faq"
              className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors"
            >
              See the full FAQ archive →
            </a>
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
