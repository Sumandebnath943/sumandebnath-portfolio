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
export default function PageFaq({
  href,
  heading = "Questions this page answers",
}: {
  /** The current page's path, exactly as keyed in lib/page-faqs.ts. */
  href: string;
  heading?: string;
}) {
  const faqs = faqsForPage(href);
  if (faqs.length === 0) return null;

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
      className="relative border-t border-white/10 bg-[#050505] px-6 py-16 sm:px-10 lg:px-16"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <h2
          id="page-faq-heading"
          className="mb-10 font-dmmono text-[11px] uppercase tracking-[0.22em] text-white/40"
        >
          {heading}
        </h2>

        <dl>
          {faqs.map((f) => (
            <div key={f.q} className="border-t border-white/10 py-7 first:border-t-0 first:pt-0">
              <dt className="mb-3 text-lg font-medium leading-snug text-white">{f.q}</dt>
              <dd className="text-[0.9375rem] leading-relaxed text-white/55">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
