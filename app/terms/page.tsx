import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import { SITE_URL } from "@/lib/projects";
import RelatedPages from "@/components/ui/RelatedPages";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: { absolute: "Terms of use — Suman Debnath" },
  description:
    "What you may do with the code, writing and models on this site, what needs permission first, and how to ask.",
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/terms`,
    title: "Terms of use — Suman Debnath",
    description: "What you may do with this work, and what needs a note first.",
    images: ["/og-image.png"],
  },
};

/* BreadcrumbList JSON-LD is NOT declared here. <Breadcrumbs> emits it together
   with the visible trail — see components/ui/Breadcrumbs.tsx. Two BreadcrumbList
   nodes on one URL is a conflict, and the one matching what the reader can see
   is the one that should win. */

const LAST_UPDATED = "23 August 2026";

// Same local type scale as /privacy — the two pages are siblings and should
// read as one voice. Kept local so each stays self-contained.
const h2 = "font-manrope font-semibold text-xl md:text-2xl tracking-tight text-white mb-4";
const p = "font-manrope text-[15px] md:text-[16px] text-white/65 leading-[1.85]";
const li = "font-manrope text-[15px] text-white/65 leading-[1.8] pl-5 relative";
const section =
  "max-w-3xl mx-auto px-6 md:px-10 py-10 border-t border-white/[0.06] text-white";

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className={li}>
      <span className="absolute left-0 top-[0.7em] w-1.5 h-1.5 rounded-full bg-white/25" />
      {children}
    </li>
  );
}

export default function TermsPage() {
  return (
    <MotionProvider>

      <Navigation />

      <main className="bg-black">
        <header className="max-w-3xl mx-auto px-6 md:px-10 pt-40 pb-12 text-white">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-6">
            Terms of use
          </p>
          <h1 className="font-manrope font-semibold text-4xl md:text-5xl leading-tight tracking-tight mb-8">
            What you can do with this work,{" "}
            <span className="font-serif italic font-normal text-white/70">
              and what needs a note first.
            </span>
          </h1>
          <p className={p}>
            Same spirit as the privacy page — no legalese, no scare tactics. This
            site, the code behind it and the projects it describes are my personal
            work. Most of what you might want to do with them is fine. Some of it
            needs an email first. This page is where that line is.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#86868B] mt-8">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* ── Summary ─────────────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>The short version</h2>
          <ul className="space-y-3">
            <Bullet>
              Everything here is mine and none of it is open source. A public
              repository is not a licence.
            </Bullet>
            <Bullet>
              Reading it, linking to it, and quoting a line or two with credit —
              all fine, and you do not need to ask.
            </Bullet>
            <Bullet>
              Copying the code, cloning a repository into something of your own,
              republishing the writing, or shipping any of it in your product —
              ask first.
            </Bullet>
            <Bullet>
              A model on Hugging Face is governed by the licence on its model
              card. That licence wins for the model; this page covers the rest.
            </Bullet>
            <Bullet>
              Asking is usually a yes, and usually free. It is the not-asking
              that is the problem.
            </Bullet>
          </ul>
        </section>

        {/* ── Scope ───────────────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>What this covers</h2>
          <p className={`${p} mb-6`}>
            All of it is copyrighted the moment it is written, whether or not a
            notice appears next to it:
          </p>
          <ul className="space-y-3">
            <Bullet>The source code of this site, and of every project described on it</Bullet>
            <Bullet>The writing — every page, every dossier, the résumé and its contents</Bullet>
            <Bullet>The design, layout, illustrations, screenshots and the film</Bullet>
            <Bullet>
              Any model weights, training configuration or datasets I have published,
              subject to the precedence rule below
            </Bullet>
            <Bullet>The repositories on GitHub, public and private alike</Bullet>
          </ul>
        </section>

        {/* ── Allowed ─────────────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>Fine without asking</h2>
          <ul className="space-y-4">
            <Bullet>
              <span className="text-white/85">Read it, link it, screenshot it.</span>{" "}
              Share a page anywhere you like. I built this to be read.
            </Bullet>
            <Bullet>
              <span className="text-white/85">Quote a short passage</span> — a couple
              of sentences — with my name and a link back.
            </Bullet>
            <Bullet>
              <span className="text-white/85">Learn from the code.</span> Techniques,
              approaches and ideas are not ownable and I make no claim on them. I
              learned most of mine from other people&apos;s repositories and I would be
              a hypocrite to pull the ladder up. It is the specific expression —
              this code, these words — that is mine.
            </Bullet>
            <Bullet>
              <span className="text-white/85">Fork a public repository on GitHub.</span>{" "}
              That permission comes from GitHub&apos;s own Terms of Service, not from
              me, and I cannot take it back while the repository is public — so I am
              not going to pretend I can. What it does not give you is the right to
              take that fork off GitHub, relicense it, or ship it.
            </Bullet>
            <Bullet>
              <span className="text-white/85">Circulate my résumé or this portfolio
              inside a hiring process.</span> That is the entire point of it being
              here.
            </Bullet>
          </ul>
        </section>

        {/* ── Needs permission ────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>Ask first</h2>
          <ul className="space-y-3">
            <Bullet>Copying any part of the code into another project, commercial or not</Bullet>
            <Bullet>
              Mirroring, re-uploading or redistributing a repository anywhere outside
              GitHub
            </Bullet>
            <Bullet>
              Republishing the writing in whole or in substantial part — including
              translated or reworded versions
            </Bullet>
            <Bullet>Using the design or layout as a template for another site</Bullet>
            <Bullet>
              Including any of it in a paid product, a client deliverable, or a course
            </Bullet>
            <Bullet>
              Bulk-scraping this site to build a dataset, or training a model on it
            </Bullet>
            <Bullet>
              <span className="text-white/85">
                Presenting any of it as your own work
              </span>{" "}
              — in a portfolio, a résumé, or a take-home assignment. This one is the
              reason the page exists.
            </Bullet>
          </ul>
        </section>

        {/* ── Precedence ──────────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>Where the actual licence lives</h2>
          <p className={`${p} mb-6`}>
            This page is the default, not the override. In order:
          </p>
          <ul className="space-y-3 mb-6">
            <Bullet>
              A <span className="text-white/85">model card on Hugging Face</span>{" "}
              declares a licence field. That field governs that model — if it says
              something more permissive than this page, the model card wins.
            </Bullet>
            <Bullet>
              A <span className="text-white/85">LICENSE file</span> in a repository
              governs that repository.
            </Bullet>
            <Bullet>
              Where neither says anything, this page applies: all rights reserved.
            </Bullet>
          </ul>
          <p className={p}>
            Some of what is described on this site is not public at all. Several
            projects here are private or belong to an employer, and nothing on this
            site grants any right to those.
          </p>
        </section>

        {/* ── Enforcement, honestly ───────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>What happens if someone does not ask</h2>
          <p className={`${p} mb-6`}>
            Copying this work without permission is copyright infringement. In most
            countries that is a <span className="text-white/85">civil</span> matter
            rather than a criminal one — criminal liability generally needs wilful
            infringement at commercial scale. I would rather say that plainly than
            put a threat on this page that would not survive contact with a lawyer.
          </p>
          <p className={p}>
            In practice: I will email you and ask you to take it down, or to add
            attribution, and that is almost always where it ends. GitHub and Hugging
            Face both run takedown processes, and I will use them if an email does
            not get a reply.
          </p>
        </section>

        {/* ── Asking ──────────────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>Asking — the answer is usually yes</h2>
          <p className={`${p} mb-6`}>
            Tell me what you want to use and where you want to use it. If you are
            learning, studying, or building something non-commercial, the answer is
            almost always yes and I do not want anything for it beyond a credit. If
            it is commercial, it is still probably yes — I just want to know.
          </p>
          <a
            href="mailto:sumandebnath944@gmail.com"
            className="font-manrope text-[15px] text-white/85 underline underline-offset-4 decoration-white/25 hover:decoration-white/60 transition-colors"
          >
            sumandebnath944@gmail.com
          </a>
        </section>

        {/* ── As-is ───────────────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>No warranty, and changes to this page</h2>
          <p className={`${p} mb-6`}>
            Everything here is published as-is, with no warranty of any kind. If you
            do get permission to use something, you are using it at your own risk —
            this is a personal portfolio, not a vendor.
          </p>
          <p className={p}>
            If this page changes, the date at the top changes with it. A change is
            not retroactive: permission I have already given you stays given. And if
            something here reads as unclear or unfair, tell me and I will fix it —
            the same standing offer as on the privacy page.
          </p>
        </section>
      </main>

      <Breadcrumbs
        trail={[
          { label: "Terms", href: "/terms" },
        ]}
        className="mx-auto max-w-5xl px-6 pt-12 sm:px-10 lg:px-16"
      />
      <RelatedPages href="/terms" />
      <Contact />
    </MotionProvider>
  );
}
