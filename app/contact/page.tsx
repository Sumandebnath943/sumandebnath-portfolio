import type { Metadata } from "next";
import BannerArt from "@/components/ui/BannerArt";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import ContactForm from "@/components/sections/ContactForm";
import { SITE_URL } from "@/lib/projects";
import { identity, targetRoles } from "@/lib/resume";
import "./contact.css";
import RelatedPages from "@/components/ui/RelatedPages";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: { absolute: `Contact Suman Debnath — ${identity.headline}` },
  description:
    "Get in touch with Suman Debnath about a role, a collaboration, or one of the AI products. Contact form, email, and current availability.",
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
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Bengali"],
      url: `${SITE_URL}/contact`,
    },
  ],
};

/* BreadcrumbList JSON-LD is NOT declared here. <Breadcrumbs> emits it together
   with the visible trail — see components/ui/Breadcrumbs.tsx. Two BreadcrumbList
   nodes on one URL is a conflict, and the one matching what the reader can see
   is the one that should win. */

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/suman-debnath-a528653a1" },
  { label: "GitHub", href: "https://github.com/Sumandebnath943" },
  { label: "Hugging Face", href: "https://huggingface.co/SumanDebnath943" },
  { label: "X", href: "https://x.com/iamSdebnath" },
];

export default function ContactPageRoute() {
  return (
    <MotionProvider>
      {[contactPageJsonLd, contactPointJsonLd].map(
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
        <header className="cx-hero sd-banner-host">
          <BannerArt seed="/contact" accent="#2E8B57" variant="paper" />
          <div className="cx-shell">
             <Breadcrumbs
              trail={[
                { label: "Contact", href: "/contact" },
              ]}
              variant="paper"
              className="mb-6"
            />
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

            <div className="cx-doors">
              <a href={`mailto:${identity.email}`} className="cx-door cx-door--mail">
                <span className="cx-door-k">Email</span>
                <span className="cx-door-v">{identity.email}</span>
                <span className="cx-door-n">For anything with an attachment.</span>
              </a>
              <a href="#tour-contact-form" className="cx-door">
                <span className="cx-door-k">Contact form</span>
                <span className="cx-door-v">Write a message</span>
                <span className="cx-door-n">For a quick note about a role, a project, or a collaboration.</span>
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
                    Usually within a day or two.
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

      <RelatedPages href="/contact" variant="paper" surface="#ece5d8" />
      <Contact variant="light" />
    </MotionProvider>
  );
}
