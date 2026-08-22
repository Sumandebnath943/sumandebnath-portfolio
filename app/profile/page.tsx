import type { Metadata } from "next";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import HeroLock from "@/components/ui/HeroLock";
import SectionKicker from "@/components/ui/SectionKicker";
import {
  Credo,
  Filmstrip,
  KitStrip,
  ProfileHero,
  type Shot,
  type Stop,
} from "@/components/profile/ProfileVisuals";
import { SITE_URL } from "@/lib/projects";
import "./profile.css";

/* ─────────────────────────────────────────────────────────────────────────
   /profile — the paper profile.

   A second, quieter answer to "who is this". /about argues the *transition*
   from marketing to AI as a ledger, in gold on near-black. This one is the
   profile itself: what the decade adds up to, laid out on a sheet of ruled
   cream paper that the rest of the site does not use anywhere else.

   The layout is modelled on the profile page at pleurat.com/about, which the
   user supplied as the reference. Four things pull it back towards the rest of
   this site — see the note at the top of profile.css for why each one:

     · Manrope + DM Mono + Instrument Serif, and the site's headline pattern
       (bold sans, then a serif italic phrase).
     · `<SectionKicker>` pills instead of the reference's amber corner tabs.
     · Per-card product accents on the work board.
     · The site's own `<Contact variant="light" />` as the closing.

   Content lives in the consts below, per the skeleton convention in
   PROJECT_BIBLE §8. Anything that moves is in
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

/** Built from `_source-profile-photos/` by scripts/build-profile-photos.mjs.
 *  All 576×720 WebP, all lazy, all below the fold. */
const shots: Shot[] = [
  { src: "/profile/portrait.webp", label: "Mid-thought" },
  { src: "/profile/dog.webp", label: "The one who runs the house" },
  { src: "/profile/forest-road.webp", label: "Forest road, helmet on" },
  { src: "/profile/summit.webp", label: "Top of something" },
  { src: "/profile/poster.webp", label: "A poster, on a Sunday" },
  { src: "/profile/rider.webp", label: "Two wheels, most weekends" },
  { src: "/profile/occasion.webp", label: "Dressed for the occasion" },
  { src: "/profile/friday.webp", label: "Friday, eventually" },
];

type BoardEntry = {
  ix: string;
  name: string;
  role: string;
  note: string;
  href?: string;
  /** The product's own accent, darkened to clear 4.5:1 on cream. See §4.1. */
  accent: string;
};

/** Two employers and eight things I built. The order is chronological for the
 *  first two and then by weight, which is why MIGI sits at A3. */
const board: BoardEntry[] = [
  {
    ix: "A1",
    name: "PIBM",
    role: "Senior Brand Marketing Manager",
    note: "Nine years of brand, web and campaigns. A 21-person team, 20+ programme launches, a ₹30–40L annual budget.",
    accent: "#a8630b",
  },
  {
    ix: "A2",
    name: "CBS Ventures",
    role: "Branding & Digital Marketing Manager",
    note: "Built the digital function from nothing — SEO, SEM, paid social, and the website itself.",
    accent: "#6d4aa8",
  },
  {
    ix: "A3",
    name: "MIGI",
    role: "46-agent autonomous fleet",
    note: "An agent fleet that runs my career, finances and infrastructure. 500+ automated eval checks.",
    href: "/agents/migi",
    accent: "#276b43",
  },
  {
    ix: "A4",
    name: "ROASmind",
    role: "AI marketing operating system",
    note: "Meta, Google and LinkedIn under one AI brain. 200,000+ lines of AI-assisted code.",
    href: "/projects/roasmind",
    accent: "#b03a5b",
  },
  {
    ix: "A5",
    name: "PentaCMD",
    role: "47M-parameter SLM",
    note: "A small language model trained from scratch on 299K instruction→command pairs. ~87% exact match.",
    href: "/slms/pentacmd",
    accent: "#5a44a3",
  },
  {
    ix: "A6",
    name: "IMPRINT",
    role: "AI identity preservation",
    note: "Ideation to a live product in about a week. The kind of problem most people do not know they have yet.",
    href: "/projects/imprint",
    accent: "#2f6fa8",
  },
  {
    ix: "A7",
    name: "LEGATUS",
    role: "Digital legacy vault",
    note: "An end-of-life vault for everything you leave behind online. No direct market equivalent.",
    href: "/projects/legatus",
    accent: "#4a6b8a",
  },
  {
    ix: "A8",
    name: "AEGIS VAULT",
    role: "Zero-knowledge notepad",
    note: "AES-256-GCM over Argon2id envelope encryption. The server never holds a key it could use.",
    href: "/projects/aegis-vault",
    accent: "#0f7466",
  },
  {
    ix: "A9",
    name: "PACT Agent",
    role: "Trust-first CLI agent",
    note: "Every file write and every shell command passes an explicit human-approval contract first.",
    href: "/agents/pact-agent",
    accent: "#b4552c",
  },
  {
    ix: "A10",
    name: "Still building",
    role: "Whatever is next",
    note: "Twenty more systems in the archive, and the next one already half-written.",
    href: "/projects",
    accent: "#5a6b23",
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

/* ── The experience book ────────────────────────────────────────────────
   Responsibilities, not achievements — this is what the two jobs were, with
   the number each one is measured by. Every line traces back to lib/resume.ts;
   if the résumé changes, change it there first and mirror it here. */
type Job = {
  org: string;
  role: string;
  when: string;
  kras: Array<[what: string, num: string]>;
};

const jobs: Job[] = [
  {
    org: "PIBM",
    role: "Senior Brand Marketing Manager",
    when: "Mar 2019 — now",
    kras: [
      ["Lead a cross-functional team across digital, design and web", "21 people"],
      ["Own institutional SEO, content architecture and the site itself", "+40–50% traffic"],
      ["Run go-to-market end to end for every new programme", "20+ launches"],
      ["Hold the vendor budget across print, OOH and digital production", "₹30–40L a year"],
      ["Build the GenAI creative pipeline the design team runs on", "7–8 hrs/week back"],
      ["Deliver on time and on budget, year after year", "99%+ of projects"],
    ],
  },
  {
    org: "CBS Ventures",
    role: "Branding & Digital Marketing Manager",
    when: "Jan — Oct 2018",
    kras: [
      ["Build the digital function from zero — SEO, SEM, paid, organic", "4 channels"],
      ["Own website design, development oversight and UX", "1 site, end to end"],
      ["Take brand identity from strategy through to execution", "Full rebuild"],
      ["Manage every external creative agency and vendor", "All relationships"],
    ],
  },
];

/* ── The street ─────────────────────────────────────────────────────────
   What the robot walks past. Read left to right it is roughly a career: the
   marketing half first, then the metrics, then the build stack — so the strip
   tells the same story the rest of the page does.

   `w` is the slot width in world units. Varying it is what stops the street
   reading as wallpaper; `gap` slots carry a lamp and a bench and no board. */
const stops: Stop[] = [
  { name: "Branding", role: "where it starts", kind: "office", w: 190 },
  { name: "Marketing", role: "the whole funnel", kind: "house", w: 160 },
  { kind: "gap", w: 90 },
  { name: "Digital Marketing", role: "nine years of it", kind: "tower", w: 230 },
  { name: "Performance", role: "paid, everywhere", kind: "cafe", w: 190 },
  { name: "Growth", role: "the point of it", kind: "kiosk", w: 130 },
  { kind: "gap", w: 80 },
  { name: "Social Media", role: "planning and cadence", kind: "office", w: 210 },
  { name: "Ads", role: "Google and Meta", kind: "kiosk", w: 120 },
  { name: "Analytics", role: "what actually happened", kind: "house", w: 170 },
  { name: "GTM", role: "20+ launches", kind: "sign", w: 150 },
  { kind: "park", w: 200, name: "SEO" },
  { name: "ROAS", role: "the number that matters", kind: "office", w: 160 },
  { name: "CTR", role: "measured", kind: "kiosk", w: 110 },
  { name: "CPC", role: "measured", kind: "kiosk", w: 110 },
  { name: "CPA", role: "measured", kind: "kiosk", w: 110 },
  { kind: "gap", w: 90 },
  { name: "Photoshop", role: "since forever", kind: "house", w: 170 },
  { name: "Illustrator", role: "when it has to scale", kind: "house", w: 175 },
  { name: "Canva", role: "when it has to ship", kind: "kiosk", w: 130 },
  { name: "Figma", role: "the layouts", kind: "cafe", w: 160 },
  { kind: "gap", w: 80 },
  { name: "Claude Code", role: "the pair", kind: "tower", w: 210 },
  { name: "Codex", role: "the second pair", kind: "office", w: 170 },
  { name: "Antigravity", role: "the new one", kind: "office", w: 190 },
  { name: "Cursor", role: "the edits", kind: "house", w: 150 },
  { name: "ChatGPT", role: "the sounding board", kind: "cafe", w: 170 },
  { kind: "gap", w: 80 },
  { name: "Next.js", role: "the site", kind: "tower", w: 165 },
  { name: "React", role: "underneath it", kind: "office", w: 150 },
  { name: "Vercel", role: "the ship", kind: "sign", w: 145 },
  { name: "Supabase", role: "the store", kind: "office", w: 180 },
  { name: "Neon", role: "the ledger", kind: "kiosk", w: 125 },
  { name: "n8n", role: "the wiring", kind: "house", w: 130 },
  { name: "Lovable", role: "the sketchpad", kind: "cafe", w: 165 },
  { name: "Replit", role: "the other sketchpad", kind: "kiosk", w: 135 },
  { kind: "park", w: 190, name: "GitHub" },
];

/** The north-east arrow that every button and link in this design carries. */
function Arrow({ small }: { small?: boolean } = {}) {
  return (
    <svg viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path
        d="M4.5 12.5 12.5 4.5M6 4.5h6.5V11"
        stroke="currentColor"
        strokeWidth={small ? "2" : "1.6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The page's own flavour of the shared kicker: amber dot, ink label, on paper.
 *  Same component the homepage sections use — see components/ui/SectionKicker. */
function Kick({ children }: { children: React.ReactNode }) {
  return (
    <SectionKicker
      className="pf-kick mb-7"
      chipClassName="border-[#16140E]/[0.14] bg-[#16140E]/[0.03]"
      dotClassName="bg-[#A86A08]"
      textClassName="text-[#57534A]"
    >
      {children}
    </SectionKicker>
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
          <section className="pf-wrap pf-pad pf-statement">
            <Kick>In short</Kick>
            <div className="pf-statement-grid">
              <h2>
                Started in 2016 as a marketer, taught myself to build somewhere
                around 2024, shipped thirty-odd products since,{" "}
                <span className="pf-em">and never went back.</span>
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
            kicker={<Kick>How I work</Kick>}
            title={
              <>
                Long story short, I&rsquo;ve been marketing for nine years and{" "}
                <span className="pf-em">building AI products for two</span>
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
          <section className="pf-wrap pf-pad" id="work">
            <div className="pf-head">
              <Kick>Track record</Kick>
              <h2>
                Where the work <span className="pf-em">has been</span>
              </h2>
            </div>
            <div className="pf-board">
              {board.map((e) => (
                <article
                  className="pf-card"
                  key={e.ix}
                  style={{ ["--a" as string]: e.accent }}
                >
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
                  {e.href && (
                    <span className="go">
                      Open <Arrow small />
                    </span>
                  )}
                </article>
              ))}
            </div>

            {/* Ten cells is a selection, not the archive. */}
            <div className="pf-board-more">
              <Link href="/projects" className="pf-btn pf-btn--amber">
                See all projects <Arrow />
              </Link>
              <Link href="/resume" className="pf-btn pf-btn--line">
                The full résumé <Arrow />
              </Link>
              <Link href="/journey" className="pf-btn pf-btn--line">
                How it happened <Arrow />
              </Link>
              <span className="note">30+ shipped · 10 shown</span>
            </div>
          </section>

          {/* ── 6. The experience book ────────────────────────────────── */}
          <section className="pf-wrap pf-pad">
            <Kick>Experience</Kick>
            <div className="pf-book-grid">
              <div className="pf-book-plate">
                <div className="book">
                  <span className="pages" />
                  <div className="cover">
                    <span className="spine" />
                    <span className="k">Employment · 2018 — now</span>
                    <span className="ttl">
                      The Experience
                      <br />
                      Book.
                    </span>
                    <span className="fig">
                      Nine years
                      <small>Two companies · one discipline</small>
                    </span>
                    <span className="rule" />
                    <span className="by">Suman Debnath</span>
                  </div>
                </div>
                <span className="shelf" />
              </div>

              <div className="pf-book-read">
                <h2>
                  What I was actually{" "}
                  <span className="pf-em">responsible for.</span>
                </h2>
                <p className="pf-book-lead">
                  Not the highlight reel — the job description, as it was
                  actually lived. Two employers, ten responsibilities, and the
                  number each one was measured by.
                </p>

                {jobs.map((job) => (
                  <div className="pf-job" key={job.org}>
                    <div className="pf-job-head">
                      <span className="org">{job.org}</span>
                      <span className="role">{job.role}</span>
                      <span className="when">{job.when}</span>
                    </div>
                    <ul className="pf-kra">
                      {job.kras.map(([what, num]) => (
                        <li key={what}>
                          <span className="what">{what}</span>
                          <span className="num">{num}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="pf-book-cta">
                  <Link href="/resume" className="pf-btn pf-btn--amber">
                    The full résumé <Arrow />
                  </Link>
                  <Link href="/learnings" className="pf-btn pf-btn--line">
                    What I learned building <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ── 7. The street ─────────────────────────────────────────── */}
          <section className="pf-wrap pf-pad" id="kit">
            <div className="pf-head">
              <Kick>Daily kit</Kick>
              <h2>
                Everything I touch <span className="pf-em">in a week.</span>
              </h2>
            </div>
            <KitStrip stops={stops} />
            <div className="pf-kit-lead" style={{ marginTop: "clamp(28px,4vh,44px)", marginBottom: 0 }}>
              <Link href="/projects" className="pf-btn pf-btn--amber">
                Explore the portfolio <Arrow />
              </Link>
              <Link href="/faq" className="pf-btn pf-btn--line">
                Questions people ask <Arrow />
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/* The site's own closing, in its light variant. A page this bright
          cannot end on the dark one without reading as a cut-off. */}
      <Contact variant="light" />
    </MotionProvider>
  );
}
