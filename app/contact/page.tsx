import type { Metadata } from "next";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import ContactForm from "@/components/sections/ContactForm";
import { SITE_URL } from "@/lib/projects";
import { identity, targetRoles } from "@/lib/resume";

export const metadata: Metadata = {
  title: { absolute: `Contact Suman Debnath — ${identity.headline}` },
  description:
    "Get in touch with Suman Debnath about a role, a collaboration, or one of the AI products. Contact form, email, phone, and current availability.",
  alternates: { canonical: "/contact" },
  keywords: [
    "contact Suman Debnath",
    "hire Suman Debnath",
    "Suman Debnath email",
    "AI product marketing manager hire",
  ],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    title: "Contact Suman Debnath",
    description:
      "A role, a collaboration, or a question about one of the products — this reaches him directly.",
    images: ["/og-image.png"],
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#contactpage`,
  url: `${SITE_URL}/contact`,
  name: "Contact Suman Debnath",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
};

const contactPointJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Recruiting and professional enquiries",
      email: identity.email,
      telephone: "+91-7980296957",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Bengali"],
      url: `${SITE_URL}/contact`,
    },
  ],
};

const breadcrumbsJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
  ],
};

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/suman-debnath-a528653a1" },
  { label: "GitHub", href: "https://github.com/Sumandebnath943" },
  { label: "Hugging Face", href: "https://huggingface.co/SumanDebnath943" },
  { label: "X", href: "https://x.com/iamSdebnath" },
];

/** A single fact in the right-hand rail. */
function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#86868B] mb-2">
        {label}
      </p>
      <div className="font-manrope text-[14.5px] text-[#3a3a3f] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function ContactPageRoute() {
  return (
    <MotionProvider>
      {[contactPageJsonLd, contactPointJsonLd, breadcrumbsJsonLd].map(
        (schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ),
      )}

      <Navigation />

      <main className="bg-[#FBFBF9]">
        {/* ── Masthead ──────────────────────────────────────────────────── */}
        <header className="max-w-4xl mx-auto px-6 md:px-10 pt-36 md:pt-40 pb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-6">
            Contact
          </p>
          <h1 className="font-manrope font-semibold text-4xl md:text-[52px] leading-[1.06] tracking-tight text-[#1D1D1F]">
            Let&apos;s talk about{" "}
            <span className="font-serif italic font-normal text-[#3a3a3f]">
              what comes next.
            </span>
          </h1>
          <p className="font-manrope text-[16px] md:text-[17px] text-[#4a4a53] leading-[1.8] max-w-xl mt-6">
            A role, a collaboration, or a question about something on this site —
            it all arrives in the same place, and it arrives on his phone. No
            form-filling theatre, no autoresponder.
          </p>
        </header>

        {/* ── Form + rail ───────────────────────────────────────────────── */}
        <section id="tour-contact-form" className="max-w-4xl mx-auto px-6 md:px-10 pb-14">
          <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
            <ContactForm />

            <aside className="space-y-8 lg:pt-2">
              <Fact label="Direct">
                <a
                  href={`mailto:${identity.email}`}
                  className="block underline decoration-black/20 underline-offset-[5px] hover:text-[#1D1D1F] hover:decoration-black/50 transition-colors"
                >
                  {identity.email}
                </a>
                <a
                  href={identity.phoneHref}
                  className="mt-1.5 block underline decoration-black/20 underline-offset-[5px] hover:text-[#1D1D1F] hover:decoration-black/50 transition-colors"
                >
                  {identity.phone}
                </a>
              </Fact>

              <Fact label="Based in">
                {identity.location}
                <br />
                <span className="text-[#5a5a63]">{identity.availability}</span>
              </Fact>

              <Fact label="Availability">
                Open to senior roles.
                <br />
                <span className="text-[#5a5a63]">
                  {identity.noticePeriod} notice period.
                </span>
              </Fact>

              <Fact label="Response time">
                Usually within a day or two. If something is genuinely urgent,
                call rather than write.
              </Fact>

              <Fact label="Elsewhere">
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {SOCIALS.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="underline decoration-black/20 underline-offset-[5px] hover:text-[#1D1D1F] hover:decoration-black/50 transition-colors"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Fact>
            </aside>
          </div>
        </section>

        {/* ── What he's looking for ─────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 py-12 border-t border-black/[0.07]">
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#86868B] mb-5">
            If you&apos;re hiring
          </p>
          <h2 className="font-manrope font-semibold text-2xl md:text-[28px] tracking-tight text-[#1D1D1F] mb-6">
            The roles worth a conversation
          </h2>
          <ul className="flex flex-wrap gap-2 mb-8">
            {targetRoles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-black/[0.09] bg-white px-3.5 py-1.5 font-manrope text-[12.5px] text-[#3a3a3f]"
              >
                {role}
              </li>
            ))}
          </ul>
          <p className="font-manrope text-[15px] text-[#4a4a53] leading-[1.85] max-w-2xl">
            The fastest way to work out whether there&apos;s a fit is the{" "}
            <Link
              href="/resume"
              className="font-semibold text-[#1D1D1F] underline decoration-black/25 underline-offset-[5px] hover:decoration-black/60"
            >
              full résumé
            </Link>{" "}
            — nine years of brand and product marketing, and every AI system
            built since. If you&apos;d rather ask than read, the assistant in the
            corner of this page answers from that same record.
          </p>
        </section>

        {/* ── Before you write ──────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 py-12 border-t border-black/[0.07]">
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#86868B] mb-5">
            Might already be answered
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/faq",
                title: "FAQ",
                body: "The questions that come up most — about the transition, the AI work, and how any of this gets built solo.",
              },
              {
                href: "/projects",
                title: "The systems",
                body: "Every product, with a real write-up behind each rather than a screenshot and a claim.",
              },
              {
                href: "/learnings",
                title: "Learnings",
                body: "The engineering notebook: what broke, what the fix actually was, and what generalised.",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-black/[0.08] bg-white p-5 transition-colors hover:border-black/20"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-manrope font-semibold text-[15px] text-[#1D1D1F]">
                    {card.title}
                  </h3>
                  <span
                    aria-hidden
                    className="font-mono text-[13px] text-[#86868B] transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </div>
                <p className="font-manrope text-[13.5px] text-[#5a5a63] leading-[1.65]">
                  {card.body}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Anything submitted here is stored and forwarded, so say so plainly —
            the same standard /privacy holds the rest of the site to. */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 pb-14">
          <p className="font-manrope text-[12px] leading-relaxed text-[#8a8a93]">
            What you send here is forwarded to Suman privately and stored in a
            database only he can open. It is never sold, shared, or added to any
            mailing list.{" "}
            <Link
              href="/privacy"
              className="underline decoration-black/20 underline-offset-2 hover:text-[#5a5a63]"
            >
              Full privacy detail
            </Link>
            .
          </p>
        </section>
      </main>

      <Contact variant="light" />
    </MotionProvider>
  );
}
