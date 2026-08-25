import { SITE_URL } from "@/lib/projects";
import { faqsForPage } from "@/lib/page-faqs";
import { routeDate } from "@/lib/route-dates";

/**
 * A page's own questions and answers, rendered visibly and as FAQPage
 * structured data.
 *
 * ## What this is actually for
 *
 * The site already had excellent structured data and a 27-question /faq page,
 * and neither helped with "what is PentaCMD-47M" — because the answer to that
 * was three paragraphs into a designed product page, phrased as narrative. An
 * answer engine assembling a response needs a question it can match and a
 * self-contained answer it can lift, and long-form prose gives it neither.
 *
 * ## Why it sits at the foot of the page
 *
 * Because the alternative was editing eleven bespoke hero sections, each with
 * its own palette, type scale and animation, to insert a summary block. That is
 * a lot of design risk for a component whose job is to be extractable. Position
 * on the page is not what determines whether a block gets quoted — being
 * question-shaped, self-contained and marked up as a Question is.
 *
 * It renders in the same dark register as `RelatedPages` and is designed to sit
 * directly above it, so the two read as one closing sequence.
 *
 * ## The structured data
 *
 * FAQPage keyed to `<url>#faq`, so it never collides with the page's own
 * WebPage/SoftwareApplication node. It also carries `dateModified` from
 * lib/route-dates — a real per-route commit date, which is the freshness signal
 * most of these pages had no way to express.
 *
 * Renders nothing when the route has no entry in lib/page-faqs, so mounting it
 * speculatively is harmless.
 */
type Variant = "dark" | "paper";

// Mirrors RelatedPages' palette exactly — the two stack directly on top of each
// other above the footer, and a mismatch between them reads as a rendering bug
// rather than as two sections.
// Mirrors RelatedPages exactly — including its `surface` prop and its contrast
// floor. Read the notes at the top of that file; every reason there applies
// here, and the two must never drift, because they stack directly on top of
// each other and any difference reads as a rendering fault.
const THEME: Record<
  Variant,
  { border: string; kicker: string; rule: string; q: string; a: string; fallback: string }
> = {
  dark: {
    border: "border-white/[0.12]",
    // 0.62. At 0.40 this measured 3.71:1 and failed WCAG AA. Do not lower it.
    kicker: "text-white/[0.62]",
    rule: "border-white/[0.12]",
    q: "text-white",
    a: "text-white/[0.68]",
    fallback: "#050505",
  },
  paper: {
    border: "border-[#191512]/[0.12]",
    kicker: "text-[#191512]/[0.62]",
    rule: "border-[#191512]/[0.14]",
    q: "text-[#191512]",
    a: "text-[#191512]/[0.72]",
    fallback: "#ece5d8",
  },
};

export default function PageFaq({
  href,
  heading = "Questions this page answers",
  variant = "dark",
  surface,
}: {
  /** The current page's path, exactly as keyed in lib/page-faqs.ts. */
  href: string;
  heading?: string;
  /** Match the page this sits on, and match the RelatedPages below it. */
  variant?: Variant;
  /** The page's own base colour. See the note in RelatedPages.tsx. */
  surface?: string;
}) {
  const faqs = faqsForPage(href);
  if (faqs.length === 0) return null;

  const t = THEME[variant];

  const url = href === "/" ? SITE_URL : `${SITE_URL}${href}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    dateModified: routeDate(href).toISOString().slice(0, 10),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      aria-labelledby="page-faq-heading"
      style={{ backgroundColor: surface ?? t.fallback }}
      className={`relative border-t px-6 py-14 sm:px-10 lg:px-16 ${t.border}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <h2
          id="page-faq-heading"
          className={`mb-9 font-dmmono text-[11px] uppercase tracking-[0.22em] ${t.kicker}`}
        >
          {heading}
        </h2>

        <dl>
          {faqs.map((f) => (
            <div key={f.q} className={`border-t py-6 first:border-t-0 first:pt-0 ${t.rule}`}>
              <dt className={`mb-2.5 text-[1.0625rem] font-medium leading-snug ${t.q}`}>{f.q}</dt>
              <dd className={`text-[0.9375rem] leading-relaxed ${t.a}`}>{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
