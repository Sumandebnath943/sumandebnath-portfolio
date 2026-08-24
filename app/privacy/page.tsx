import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import { SITE_URL } from "@/lib/projects";
// Read from the same constants the purge job enforces, so the page cannot claim
// a retention period the code does not actually apply.
import { IP_RETENTION_DAYS, VISIT_RETENTION_DAYS } from "@/lib/db";
import RelatedPages from "@/components/ui/RelatedPages";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: { absolute: "Privacy — Suman Debnath" },
  description:
    "Exactly what this site records when you visit, where it goes, how long it is kept, and how to switch it off.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/privacy`,
    title: "Privacy — Suman Debnath",
    description: "What this site records, where it goes, and how to opt out.",
    images: ["/og-image.png"],
  },
};

/* BreadcrumbList JSON-LD is NOT declared here. <Breadcrumbs> emits it together
   with the visible trail — see components/ui/Breadcrumbs.tsx. Two BreadcrumbList
   nodes on one URL is a conflict, and the one matching what the reader can see
   is the one that should win. */

const LAST_UPDATED = "14 August 2026";

// Shared type styles — kept local so this page stays self-contained.
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

export default function PrivacyPage() {
  return (
    <MotionProvider>

      <Navigation />

      <main className="bg-black">
        <header className="max-w-3xl mx-auto px-6 md:px-10 pt-40 pb-12 text-white">
          <Breadcrumbs
            trail={[
              { label: "Privacy", href: "/privacy" },
            ]}
            className="mb-6"
          />
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-6">
            Privacy
          </p>
          <h1 className="font-manrope font-semibold text-4xl md:text-5xl leading-tight tracking-tight mb-8">
            What this site records,{" "}
            <span className="font-serif italic font-normal text-white/70">
              in plain English.
            </span>
          </h1>
          <p className={p}>
            No legalese and no dark patterns — just an accurate description of what
            happens when you open this site. I send this portfolio out with job
            applications, so I genuinely do want to know when someone reads it.
            That is the whole motivation, and everything below follows from it.
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
              This site records your visit — pages, time spent, scroll depth, device,
              and an approximate location worked out from your IP address.
            </Bullet>
            <Bullet>
              Your IP address is recorded. In the EU and UK that counts as personal
              data, so I am not going to call this &ldquo;anonymous&rdquo;.
            </Bullet>
            <Bullet>
              My own visit alerts go to a private Telegram chat that only I can read,
              and each visit is also saved to a private database only I can open.
              Neither is ever sold, shared, or fed into any marketing list.
            </Bullet>
            <Bullet>
              Your IP address is deleted after {IP_RETENTION_DAYS} days. The rest of the
              visit is deleted after a year.
            </Bullet>
            <Bullet>
              This site also runs Google Analytics and Vercel Analytics, and embeds a
              film from YouTube that loads only if you press play. Those are third
              parties with their own data practices — details below.
            </Bullet>
            <Bullet>
              You can switch my visit alerts off for your browser in one click. See{" "}
              <span className="text-white/85">Opting out</span> below.
            </Bullet>
          </ul>
        </section>

        {/* ── The beacon ──────────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>What my own visit alerts collect</h2>
          <p className={`${p} mb-6`}>
            This is a small piece of code I wrote that sends me a notification when
            someone visits. It records:
          </p>

          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#86868B] mb-3">
            From your browser
          </p>
          <ul className="space-y-3 mb-8">
            <Bullet>Which pages you opened, in what order, and how long you spent on each</Bullet>
            <Bullet>How far down each page you scrolled</Bullet>
            <Bullet>
              Which site you arrived from, and any campaign tag in the link
              (<span className="font-mono text-[13px] text-white/80">?v=</span>,{" "}
              <span className="font-mono text-[13px] text-white/80">?ref=</span>, or{" "}
              <span className="font-mono text-[13px] text-white/80">utm_</span> values)
            </Bullet>
            <Bullet>Your browser, operating system, device type, screen size and language settings</Bullet>
            <Bullet>Your timezone, and whether it disagrees with the one implied by your IP</Bullet>
            <Bullet>
              Whether any real interaction happened at all — this is how I tell a
              person from a scraper
            </Bullet>
            <Bullet>
              Specific actions that signal interest: downloading my résumé, clicking my
              email, phone or social links, or copying my contact details
            </Bullet>
            <Bullet>How many times you have visited before, and how long ago that was</Bullet>
          </ul>

          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#86868B] mb-3">
            Worked out from your IP address
          </p>
          <ul className="space-y-3 mb-8">
            <Bullet>Your IP address itself</Bullet>
            <Bullet>
              An approximate city, region, country and postal code. This comes from a
              lookup table, not from GPS — it is accurate to roughly a city, and the
              map coordinates are a fixed point for that city rather than your actual
              position
            </Bullet>
            <Bullet>
              Your network provider — the ISP or company whose network you are on.
              This can reveal an employer if you are browsing from a corporate network
            </Bullet>
          </ul>

          <p className={p}>
            What it does <span className="text-white/85">not</span> collect: your name,
            your email address, your precise location, anything you type, or anything
            at all from other websites. I never ask your browser for GPS access.
          </p>
        </section>

        {/* ── Third parties ───────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>Third-party services</h2>
          <p className={`${p} mb-6`}>
            These are run by other companies. Their data handling is governed by their
            own policies, not mine.
          </p>
          <ul className="space-y-4">
            <Bullet>
              <span className="text-white/85">Google Analytics 4</span> — measures
              traffic and on-page behaviour. It sets cookies and shares data with
              Google. One of the two properties on this site is linked to Google Ads,
              which means the data may also be used for advertising measurement and
              remarketing audiences.
            </Bullet>
            <Bullet>
              <span className="text-white/85">Vercel Analytics &amp; Speed Insights</span>{" "}
              — aggregate page-view counts and page-load performance.
            </Bullet>
            <Bullet>
              <span className="text-white/85">YouTube</span> — hosts the film on the
              home page, and only if you press play. Until then the page shows a
              still image and loads nothing from Google; there is no YouTube cookie,
              request or script on the page unless you start the video. When you do,
              it plays from youtube-nocookie.com, which does not set tracking cookies
              for ads, though YouTube still receives your IP address and playback
              data as it would on any embed.
            </Bullet>
            <Bullet>
              <span className="text-white/85">Vercel</span> — hosts this site, so it
              necessarily processes every request, including your IP address.
            </Bullet>
            <Bullet>
              <span className="text-white/85">Telegram</span> — delivers my visit
              alerts to my private chat.
            </Bullet>
            <Bullet>
              <span className="text-white/85">Public DNS infrastructure</span> — used
              to look up the hostname attached to your IP, and separately to turn a
              network number into a readable provider name. The second lookup contains
              only the network number, never your IP address.
            </Bullet>
          </ul>
        </section>

        {/* ── Browser storage ─────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>What gets stored in your browser</h2>
          <ul className="space-y-3">
            <Bullet>
              <span className="font-mono text-[13px] text-white/80">vp_visitor</span> —
              how many times you have visited and when. Persistent, so it survives
              closing the tab. This is what lets me see a returning reader.
            </Bullet>
            <Bullet>
              <span className="font-mono text-[13px] text-white/80">vp_session</span> —
              the current visit in progress. Cleared automatically when you close the tab.
            </Bullet>
            <Bullet>
              <span className="font-mono text-[13px] text-white/80">vp_notrack</span> —
              only exists if you have opted out, and is the thing that keeps you opted out.
            </Bullet>
            <Bullet>
              <span className="font-mono text-[13px] text-white/80">sd_notice_seen</span> —
              records that you have already been shown the small notice at the bottom
              of the screen, so it does not reappear on every page.
            </Bullet>
            <Bullet>
              Google Analytics sets its own cookies, separately from the above.
            </Bullet>
          </ul>
        </section>

        {/* ── Retention ───────────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>How long it is kept</h2>
          <p className={`${p} mb-4`}>
            Each visit is saved to a private database so I can see who has been reading
            this site over time. It is hosted in the United States, and I am the only
            person with access.
          </p>
          <ul className="space-y-3 mb-4">
            <Bullet>
              <span className="text-white/85">
                Your IP address is deleted after {IP_RETENTION_DAYS} days.
              </span>{" "}
              It is the part that could identify you, so it goes first. The rest of the
              visit — pages, timings, country, network — stays.
            </Bullet>
            <Bullet>
              <span className="text-white/85">
                The whole visit is deleted after {Math.round(VISIT_RETENTION_DAYS / 365)} year.
              </span>{" "}
              Nothing is kept beyond that.
            </Bullet>
            <Bullet>
              A scheduled job does this automatically once a day. It is not something I
              have to remember to run.
            </Bullet>
          </ul>
          <p className={p}>
            The Telegram alerts stay in my private chat until I delete them. Anything
            stored in your browser stays until you clear it. Google and Vercel retain
            their own data according to their own settings, not mine.
          </p>
        </section>

        {/* ── Opt out ─────────────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>Opting out</h2>
          <p className={`${p} mb-6`}>
            To stop my visit alerts for this browser, add{" "}
            <span className="font-mono text-[13px] text-white/80">?notrack=1</span> to
            any page address on this site and load it once:
          </p>
          <p className="font-mono text-[13px] text-white/80 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 mb-6 break-all">
            {SITE_URL}/?notrack=1
          </p>
          <p className={`${p} mb-6`}>
            That setting lives in your browser and persists until you clear your site
            data. Use{" "}
            <span className="font-mono text-[13px] text-white/80">?notrack=0</span> to
            turn alerts back on.
          </p>
          <p className={p}>
            It only covers my own beacon. To opt out of Google Analytics, use Google&apos;s
            browser opt-out add-on, block cookies for this site, or use any ad blocker —
            most block it by default.
          </p>
        </section>

        {/* ── Using this work ─────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>Using this work</h2>
          <p className={`${p} mb-6`}>
            A different question, but it gets asked in the same breath, so it is
            worth answering here. This page covers what I do with{" "}
            <span className="text-white/85">your</span> data. What you may do with{" "}
            <span className="text-white/85">mine</span> — the code, the writing, the
            models — is its own page.
          </p>
          <p className={`${p} mb-6`}>
            The short version: it is my personal work and none of it is open source.
            Reading it, linking to it and quoting a line with credit are all fine.
            Copying the code, cloning a repository into something of your own, or
            republishing the writing needs an email first — and the answer is
            usually yes.
          </p>
          <a
            href="/terms"
            className="font-manrope text-[15px] text-white/85 underline underline-offset-4 decoration-white/25 hover:decoration-white/60 transition-colors"
          >
            Terms of use
          </a>
        </section>

        {/* ── Rights ──────────────────────────────────────────────────────── */}
        <section className={section}>
          <h2 className={h2}>Your rights, and getting in touch</h2>
          <p className={`${p} mb-6`}>
            If you want to know what I hold about a visit, or want it deleted, email me
            and I will do it. Visits are stored in a database I can search, so the more
            detail you can give me — roughly when you visited, and from where — the
            faster I can find yours and remove it, along with the matching Telegram
            messages.
          </p>
          <a
            href="mailto:sumandebnath944@gmail.com"
            className="font-manrope text-[15px] text-white/85 underline underline-offset-4 decoration-white/25 hover:decoration-white/60 transition-colors"
          >
            sumandebnath944@gmail.com
          </a>
          <p className={`${p} mt-8`}>
            This is a personal portfolio, not a company. If something here reads as
            unclear or wrong, tell me and I will fix it.
          </p>
        </section>
      </main>

      <RelatedPages href="/privacy" />
      <Contact />
    </MotionProvider>
  );
}
