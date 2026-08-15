import type { Metadata } from "next";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import ContactForm from "@/components/sections/ContactForm";
import { SITE_URL } from "@/lib/projects";
import { identity, targetRoles } from "@/lib/resume";
import "./contact.css";

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

      <main className="cx">
        {/* ── Masthead ──────────────────────────────────────────────────── */}
        <header className="cx-hero">
          <div className="cx-shell">
            <p className="cx-signal">
              <span className="cx-dot" aria-hidden>
                <span />
                <span />
              </span>
              Open to senior roles
            </p>

            <h1 className="cx-title">
              Let&apos;s talk about <em>what comes next.</em>
            </h1>
            <p className="cx-standfirst">
              A role, a collaboration, or a question about something on this site —
              it all arrives in the same place, and it arrives on his phone. No
              form-filling theatre, no autoresponder.
            </p>

            {/* Three explicit doors, before the form. Plenty of people would
                rather message than fill anything in, and WhatsApp was
                previously buried in the hero's status strip as one word. */}
            <div className="cx-doors">
              <a
                href={identity.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="cx-door cx-door--wa"
              >
                <span className="cx-door-k">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.886-9.884 9.886m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.688 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
                  </svg>
                  WhatsApp
                </span>
                <span className="cx-door-v">{identity.phone}</span>
                <span className="cx-door-n">Usually the fastest way through.</span>
              </a>

              <a href={`mailto:${identity.email}`} className="cx-door cx-door--mail">
                <span className="cx-door-k">Email</span>
                <span className="cx-door-v">{identity.email}</span>
                <span className="cx-door-n">For anything with an attachment.</span>
              </a>

              <a href={identity.phoneHref} className="cx-door cx-door--call">
                <span className="cx-door-k">Call</span>
                <span className="cx-door-v">{identity.phone}</span>
                <span className="cx-door-n">If it is genuinely urgent.</span>
              </a>
            </div>
          </div>
        </header>

        {/* ── Form + rail ───────────────────────────────────────────────── */}
        {/* Light ground: a long message field is a worse place to write on a
            dark background than on a light one. */}
        <section id="tour-contact-form" className="cx-body">
          <div className="cx-shell">
            <p className="cx-eyebrow">Or write it here</p>
            <h2 className="cx-h2">
              Straight to his phone, <em>nowhere else.</em>
            </h2>

            <div className="cx-grid">
              <ContactForm />

              <aside className="cx-rail">
                <div>
                  <p className="cx-fact-k">Based in</p>
                  <p className="cx-fact-v">
                    {identity.location}
                    <br />
                    {identity.availability}
                  </p>
                </div>

                <div>
                  <p className="cx-fact-k">Availability</p>
                  <p className="cx-fact-v">
                    Open to senior roles.
                    <br />
                    {identity.noticePeriod} notice period.
                  </p>
                </div>

                <div>
                  <p className="cx-fact-k">Response time</p>
                  <p className="cx-fact-v">
                    Usually within a day or two. If something is genuinely urgent,
                    call rather than write.
                  </p>
                </div>

                <div>
                  <p className="cx-fact-k">Elsewhere</p>
                  <p className="cx-fact-v">
                    {SOCIALS.map((s, i) => (
                      <span key={s.label}>
                        {i > 0 && " · "}
                        <a href={s.href} target="_blank" rel="me noopener noreferrer">
                          {s.label}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── What he's looking for ─────────────────────────────── */}
        <section className="cx-body" style={{ paddingTop: 0 }}>
          <div className="cx-shell">
            <p className="cx-eyebrow">If you&apos;re hiring</p>
            <h2 className="cx-h2">The roles worth a conversation</h2>
            <ul className="cx-roles">
              {targetRoles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <p className="cx-fact-v" style={{ maxWidth: "62ch", marginTop: "1.75rem" }}>
              The fastest way to work out whether there&apos;s a fit is the{" "}
              <Link href="/resume">full résumé</Link> — nine years of brand and
              product marketing, and every AI system built since. If you&apos;d
              rather ask than read, the assistant in the corner of this page
              answers from that same record.
            </p>

            <p className="cx-eyebrow" style={{ marginTop: "3rem" }}>
              Might already be answered
            </p>
            <div className="cx-cards">
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
                <Link key={card.href} href={card.href} className="cx-card">
                  <span className="cx-card-t">
                    {card.title}
                    <span aria-hidden>→</span>
                  </span>
                  <span className="cx-card-d">{card.body}</span>
                </Link>
              ))}
            </div>

            {/* Anything submitted here is stored and forwarded, so say so
                plainly — the same standard /privacy holds the rest of the
                site to. */}
            <p className="cx-note">
              What you send here is forwarded to Suman privately and stored in a
              database only he can open. It is never sold, shared, or added to any
              mailing list. <Link href="/privacy">Full privacy detail</Link>.
            </p>
          </div>
        </section>

      </main>

      <Contact variant="light" />
    </MotionProvider>
  );
}
