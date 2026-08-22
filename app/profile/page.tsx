import type { Metadata } from "next";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import HeroLock from "@/components/ui/HeroLock";
import {
  Credo,
  Curtain,
  Filmstrip,
  KitStrip,
  ProfileHero,
  type Kit,
  type Shot,
} from "@/components/profile/ProfileVisuals";
import { identity } from "@/lib/resume";
import { SITE_URL } from "@/lib/projects";
import "./profile.css";

/* ─────────────────────────────────────────────────────────────────────────
   /profile — the paper profile.

   A second, quieter answer to "who is this". /about argues the *transition*
   from marketing to AI as a ledger, in gold on near-black. This one is the
   profile itself: what the decade adds up to, laid out on a sheet of ruled
   cream paper that the rest of the site does not use anywhere else.

   The layout is modelled on the profile page at pleurat.com/about — the
   spacing scale, the corner-bracket system, the 280vh pinned hero, the
   word-by-word reveal and the shopfront marquee all come from there, and
   app/profile/profile.css carries the measurements. The typography is this
   site's (Manrope + DM Mono), the drawing is ours, and every word below is
   Suman's.

   ── Deliberately light ─────────────────────────────────────────────────
   This page does NOT mount the site's dark <Footer />. It ends in its own
   ruled footer, because a black footer under a cream sheet reads as the page
   having been cut off rather than finished. Every link the shared footer
   carries that matters here is repeated in `footerCols` below — if you add a
   route to the shared footer, consider whether it belongs there too.

   Content lives in the consts at the top of this file, per the skeleton
   convention in PROJECT_BIBLE §8. Anything that moves is in
   components/profile/ProfileVisuals.tsx.
   ───────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: { absolute: "Profile — Suman Debnath" },
  description:
    "Nine years of brand and performance marketing, two years building AI-native products alone. The profile: what the decade adds up to, where the work has been, and what I use every day.",
  alternates: { canonical: "/profile" },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/profile`,
    title: "Profile — Suman Debnath",
    description:
      "A decade of brand and performance marketing, then two years of shipping AI products solo. The full profile.",
    images: ["/og-image.png"],
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/profile`,
  name: "Profile — Suman Debnath",
  mainEntity: { "@id": `${SITE_URL}/#person` },
};

const breadcrumbsJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Profile", item: `${SITE_URL}/profile` },
  ],
};

/* ── Content ────────────────────────────────────────────────────────────── */

/** Chapter art from /journey, reused as the strip. Labels are that page's
 *  own chapter titles, shortened — not new claims. */
const shots: Shot[] = [
  { src: "/journey-art/prologue.png", label: "Never the talented one" },
  { src: "/journey-art/wolambo.png", label: "A page about supercars" },
  { src: "/journey-art/selftaught.png", label: "YouTube, on dial-up" },
  { src: "/journey-art/mba.png", label: "Marketing, by elimination" },
  { src: "/journey-art/hired.png", label: "Hired on the spot" },
  { src: "/journey-art/pibm.png", label: "Seven years, one building" },
  { src: "/journey-art/ai.png", label: "Teaching myself again" },
  { src: "/journey-art/converge.png", label: "Master of many" },
];

type BoardEntry = {
  ix: string;
  name: string;
  role: string;
  note: string;
  href?: string;
};

/** Two employers and eight things I built. The order is chronological for the
 *  first two and then by weight, which is why MIGI sits at A3. */
const board: BoardEntry[] = [
  {
    ix: "A1",
    name: "PIBM",
    role: "Senior Brand Marketing Manager",
    note: "Nine years of brand, web and campaigns. A 21-person team, 20+ programme launches, a ₹30–40L annual budget.",
  },
  {
    ix: "A2",
    name: "CBS Ventures",
    role: "Branding & Digital Marketing Manager",
    note: "Built the digital function from nothing — SEO, SEM, paid social, and the website itself.",
  },
  {
    ix: "A3",
    name: "MIGI",
    role: "46-agent autonomous fleet",
    note: "An agent fleet that runs my career, finances and infrastructure. 500+ automated eval checks.",
    href: "/agents/migi",
  },
  {
    ix: "A4",
    name: "ROASmind",
    role: "AI marketing operating system",
    note: "Meta, Google and LinkedIn under one AI brain. 200,000+ lines of AI-assisted code.",
    href: "/projects/roasmind",
  },
  {
    ix: "A5",
    name: "PentaCMD",
    role: "47M-parameter SLM",
    note: "A small language model trained from scratch on 299K instruction→command pairs. ~87% exact match.",
    href: "/slms/pentacmd",
  },
  {
    ix: "A6",
    name: "IMPRINT",
    role: "AI identity preservation",
    note: "Ideation to a live product in about a week. The kind of problem most people do not know they have yet.",
    href: "/projects/imprint",
  },
  {
    ix: "A7",
    name: "LEGATUS",
    role: "Digital legacy vault",
    note: "An end-of-life vault for everything you leave behind online. No direct market equivalent.",
    href: "/projects/legatus",
  },
  {
    ix: "A8",
    name: "AEGIS VAULT",
    role: "Zero-knowledge notepad",
    note: "AES-256-GCM over Argon2id envelope encryption. The server never holds a key it could use.",
    href: "/projects/aegis-vault",
  },
  {
    ix: "A9",
    name: "PACT Agent",
    role: "Trust-first CLI agent",
    note: "Every file write and every shell command passes an explicit human-approval contract first.",
    href: "/agents/pact-agent",
  },
  {
    ix: "A10",
    name: "Still building",
    role: "Whatever is next",
    note: "Twenty more systems in the archive, and the next one already half-written.",
    href: "/projects",
  },
];

const credoTags = [
  "Brand & GTM",
  "Performance marketing",
  "AI product",
  "Agentic systems",
  "SLM training",
  "Next.js",
];

const notebookPoints = [
  "The traps that cost real debugging time, and the fix that actually worked",
  "Where AI-assisted building genuinely helps, and where it confidently lies",
  "What a marketer learns by shipping software with nobody to hand it to",
  "The questions worth asking before a single line gets written",
];

/** The strip along the bottom. `code` is decorative — a shop number, nothing
 *  more — and `role` is what the tool is actually for. */
const kit: Kit[] = [
  { name: "Claude Code", role: "the pair", code: "C4" },
  { name: "Next.js", role: "the site", code: "N16" },
  { name: "Vercel", role: "the ship", code: "V1" },
  { name: "Supabase", role: "the store", code: "S7" },
  { name: "Neon", role: "the ledger", code: "N9" },
  { name: "n8n", role: "the wiring", code: "N8" },
  { name: "Cursor", role: "the edits", code: "C9" },
  { name: "Codex", role: "the second pair", code: "X1" },
  { name: "Replit", role: "the sketchpad", code: "R1" },
  { name: "Figma", role: "the layouts", code: "F3" },
  { name: "Telegram", role: "the pager", code: "T2" },
  { name: "GitHub", role: "the record", code: "G4" },
];

const footerCols: Array<{ head: string; links: Array<[string, string]> }> = [
  {
    head: "Sitemap",
    links: [
      ["Home", "/"],
      ["Projects", "/projects"],
      ["Résumé", "/resume"],
      ["Journey", "/journey"],
      ["About", "/about"],
    ],
  },
  {
    head: "Elsewhere",
    links: [
      ["LinkedIn ↗", "https://linkedin.com/in/suman-debnath-a528653a1"],
      ["GitHub ↗", "https://github.com/Sumandebnath943"],
      ["Learnings", "/learnings"],
      ["FAQ", "/faq"],
    ],
  },
];

/** The north-east arrow that every button and link in this design carries. */
function Arrow() {
  return (
    <svg viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path
        d="M4.5 12.5 12.5 4.5M6 4.5h6.5V11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProfilePage() {
  return (
    /* Navigation is a framer-motion `m` component and animates itself in from
       opacity 0. Without MotionProvider's LazyMotion above it there is no
       animation to run and the bar simply stays invisible — no error, no nav. */
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <Navigation />
      <Curtain name={identity.name} />

      <div className="pf-root">
        <main>
          {/* ── 1. Hero ───────────────────────────────────────────────── */}
          <ProfileHero
            lead={
              <>
                Over the last decade I&rsquo;ve built brands, run performance
                marketing, and led a twenty-one person team through more than
                twenty product launches. Along the way I started building the
                systems I kept wishing existed —{" "}
                <span className="pf-dim">
                  agent fleets, small language models, and tools that turn a
                  week of work into an afternoon.
                </span>
              </>
            }
          >
            {/* Must be a child of the hero <section> — HeroLock observes its
                own parentElement. From <main> it would keep the mascot and the
                chat launcher hidden for the whole page. */}
            <HeroLock />
          </ProfileHero>

          {/* ── 2. Statement ──────────────────────────────────────────── */}
          <section className="pf-wrap pf-pad pf-statement" data-badge="In short">
            <div className="pf-statement-grid">
              <h2>
                Started in 2016 as a marketer, taught myself to build somewhere
                around 2024, shipped thirty-odd products since,{" "}
                <span className="pf-dim">and never went back.</span>
              </h2>
              <div className="aside">
                <span className="eye">The short version</span>
                <p>
                  Across education, retail and my own products, I take an idea
                  all the way to a live thing — the positioning, the page, the
                  campaign, and now the software underneath it. Nine years of
                  one discipline, two of the other, and the useful part is the
                  overlap.
                </p>
              </div>
            </div>
          </section>

          {/* ── 3. Filmstrip ──────────────────────────────────────────── */}
          <Filmstrip shots={shots} />

          {/* ── 4. Credo ──────────────────────────────────────────────── */}
          <Credo
            badge="How I work"
            title={
              <>
                Long story short, I&rsquo;ve been marketing for nine years and
                building for two
              </>
            }
            meta="2016 — now · Pune, IST"
            lead="I have run a twenty-one person team, owned a sixty-lakh budget, taken twenty programme launches to market, and shipped more than thirty AI products on my own — MIGI, ROASmind, PentaCMD, IMPRINT and the rest."
            tail={
              <>
                And yes — I still write the copy, still build the pages, still
                read the eval output myself.{" "}
                <span className="hl">That is the part I would miss.</span>
              </>
            }
            tags={credoTags}
          />

          {/* ── 5. Board ──────────────────────────────────────────────── */}
          <section className="pf-wrap pf-pad" data-badge="Track" id="work">
            <div className="pf-head">
              <h2>
                Where the work <span className="pf-dim">has been</span>
              </h2>
            </div>
            <div className="pf-board">
              {board.map((e) => (
                <article className="pf-card" key={e.ix}>
                  <span className="ix">{e.ix}</span>
                  <h3>
                    {e.href ? (
                      <Link href={e.href} className="pf-card-hit">
                        {e.name}
                      </Link>
                    ) : (
                      e.name
                    )}
                  </h3>
                  <span className="role">{e.role}</span>
                  <p>{e.note}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ── 6. Notebook ───────────────────────────────────────────── */}
          <section className="pf-wrap pf-pad" data-badge="Notebook">
            <div className="pf-book-grid">
              <div className="pf-book-plate">
                <div className="book">
                  <span className="pages" />
                  <div className="cover">
                    <span className="spine" />
                    <span className="k">Notes · ongoing</span>
                    <span className="ttl">
                      The Build
                      <br />
                      Notebook.
                    </span>
                    <span className="rule" />
                    <span className="by">Suman Debnath</span>
                  </div>
                </div>
                <span className="shelf" />
              </div>

              <div className="pf-book-read">
                <h2>
                  What broke, and <span className="pf-dim">what fixed it.</span>
                </h2>
                <p className="pf-book-lead">
                  The engineering notebook behind every build on this site —
                  what went wrong, what the fix actually turned out to be, and
                  which part of it generalises. Written while the bug was still
                  warm, not tidied up afterwards.
                </p>
                <ul className="pf-book-points">
                  {notebookPoints.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="pf-book-cta">
                  <Link href="/learnings" className="pf-btn pf-btn--amber">
                    Read the learnings <Arrow />
                  </Link>
                  <Link href="/philosophy" className="pf-btn pf-btn--line">
                    AI philosophy <Arrow />
                  </Link>
                  <span className="note">Free · no sign-up</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── 7. Kit strip ──────────────────────────────────────────── */}
          <section className="pf-wrap pf-pad" data-badge="Daily kit" id="kit">
            <div className="pf-kit-lead">
              <Link href="/projects" className="pf-btn pf-btn--amber">
                Explore the portfolio <Arrow />
              </Link>
            </div>
            <KitStrip kit={kit} />
          </section>
        </main>

        {/* ── 8. Footer ───────────────────────────────────────────────── */}
        <footer className="pf-footer">
          <div className="pf-wrap">
            <div className="pf-foot-grid">
              <div>
                <h4>Contact</h4>
                <a className="pf-foot-mail" href={`mailto:${identity.email}`}>
                  {identity.email}
                </a>
                <span>Let&rsquo;s get in touch.</span>
                <span>Usually a reply within a day.</span>
              </div>

              {footerCols.map((col) => (
                <div key={col.head}>
                  <h4>{col.head}</h4>
                  {col.links.map(([label, href]) =>
                    href.startsWith("http") ? (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link key={label} href={href}>
                        {label}
                      </Link>
                    ),
                  )}
                </div>
              ))}

              <div>
                <h4>Desk</h4>
                <span>{identity.location}</span>
                <span>Brand · AI products · Agents</span>
                <span>{identity.availability}</span>
              </div>
            </div>

            <div className="pf-foot-base">
              <span>© 2026 Suman Debnath — all rights reserved</span>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
          <span className="pf-foot-marks" aria-hidden="true" />
        </footer>
      </div>
    </MotionProvider>
  );
}
