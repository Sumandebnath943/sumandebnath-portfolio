import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import { allFaqs, buildFaqPageJsonLd } from "@/lib/faqs";
import { SITE_URL } from "@/lib/projects";

export const metadata: Metadata = {
  title: "FAQ — Brand Marketer Turned AI Product Builder",
  description:
    "Direct answers on the marketing-to-AI transition, AI product building, and what makes a brand marketer plus AI builder a rare hire.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/faq`,
    title: "FAQ — Brand Marketer Turned AI Product Builder · Suman Debnath",
    description:
      "Direct answers about the marketing-to-AI transition, AI product building, and the rare cross-domain profile.",
    images: ["/og-image.png"],
  },
};

const jsonLd = buildFaqPageJsonLd(allFaqs);

export default function FAQPage() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      <main className="bg-white text-[#0A0A0A]">
        <header className="max-w-5xl mx-auto px-6 md:px-10 pt-40 pb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#999] mb-6">
            FAQ
          </p>
          <h1 className="font-manrope font-semibold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6">
            Frequently asked{" "}
            <span className="font-serif italic font-normal text-[#0A0A0A]/70">
              questions
            </span>
            .
          </h1>
          <p className="font-manrope text-base md:text-lg text-[#444] leading-relaxed max-w-2xl">
            The canonical answer set for everything recruiters, founders, and
            operators ask about the AI-native operating model, the transition
            from brand and digital marketing into AI-native software development,
            and how this portfolio is built.
          </p>
        </header>

        <section className="max-w-5xl mx-auto px-6 md:px-10 pb-32">
          <div className="divide-y divide-black/[0.08]">
            {allFaqs.map((f, i) => (
              <details key={i} className="group py-7" open={i === 0}>
                <summary className="flex items-start justify-between cursor-pointer list-none gap-6">
                  <h2 className="font-manrope font-medium text-lg md:text-xl text-[#0A0A0A]">
                    {f.q}
                  </h2>
                  <span
                    aria-hidden
                    className="font-mono text-xl text-[#666] transition-transform group-open:rotate-45 mt-1 shrink-0"
                  >
                    +
                  </span>
                </summary>
                <p className="font-manrope text-[15px] md:text-base text-[#333] leading-[1.85] mt-5 max-w-3xl">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-black/[0.08] text-sm text-[#555] leading-relaxed">
            <p>
              Question not answered here?{" "}
              <a
                href="mailto:sumandebnath944@gmail.com"
                className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors"
              >
                sumandebnath944@gmail.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <Contact />
      <Footer />
    </MotionProvider>
  );
}
