import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowDownRight, ArrowRight, ChartNoAxesCombined, Check,
  ChevronDown, CirclePause, FileSpreadsheet, GitBranch, Inbox,
  Mail, Radio, Send, ShieldCheck, Workflow,
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import MotionProvider from "@/components/providers/MotionProvider";
import Contact from "@/components/sections/Contact";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroLock from "@/components/ui/HeroLock";
import PageAnswer from "@/components/ui/PageAnswer";
import PageFaq from "@/components/ui/PageFaq";
import RelatedPages from "@/components/ui/RelatedPages";
import { answerForPage } from "@/lib/page-answers";
import { SITE_URL } from "@/lib/projects";
import { routeDate } from "@/lib/route-dates";
import { metrics, stages, touches } from "./outreach-data";
import TemplatePreview from "./TemplatePreview";
import styles from "./outreach.module.css";

const PATH = "/crms/outreachos";
const URL = `${SITE_URL}${PATH}`;
const TITLE = "OutreachOS · Job-search CRM for Gmail";
const DESCRIPTION = "Suman Debnath’s private Gmail CRM for job-search outreach. Explore its eight-stage pipeline, CSV import, four-touch templates, approval modes, and AI reply triage.";
const SOCIAL_IMAGE = {
  url: "/outreachos/og.png",
  width: 1200,
  height: 630,
  alt: "OutreachOS on a graphite and brass background with the Queued, Warm and Replied stages.",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "OutreachOS", "Suman Debnath", "job-search CRM", "Gmail outreach CRM",
    "recruiter outreach tracker", "email prechecks", "AI reply triage",
  ],
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: URL, images: [SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [SOCIAL_IMAGE] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL}#webpage`,
      url: URL,
      name: TITLE,
      description: DESCRIPTION,
      dateModified: routeDate(PATH).toISOString().slice(0, 10),
      isPartOf: { "@id": `${SITE_URL}/#website` },
      author: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${URL}#software` },
    },
    {
      "@type": "WebApplication",
      "@id": `${URL}#software`,
      name: "OutreachOS",
      description: answerForPage(PATH)?.text,
      url: URL,
      mainEntityOfPage: { "@id": `${URL}#webpage` },
      creator: { "@id": `${SITE_URL}/#person` },
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Job-search CRM",
      operatingSystem: "Web browser",
      image: `${SITE_URL}${SOCIAL_IMAGE.url}`,
      featureList: [
        "Eight-stage job-search pipeline",
        "CSV import and email prechecks",
        "Gmail-threaded four-touch sequences",
        "Approval Gate and Auto-Pilot",
        "AI reply triage and human-reviewed drafts",
        "Outreach analytics and Telegram alerts",
      ],
    },
  ],
};

function Heading({ label, children, aside }: { label: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <header className={styles.sectionHeading}>
      <div>
        <p className={styles.kicker}>{label}</p>
        <h2>{children}</h2>
      </div>
      {aside && <p className={styles.headingAside}>{aside}</p>}
    </header>
  );
}

function DispatchPreview() {
  return (
    <figure className={styles.dispatch}>
      <div className={styles.panelBar}>
        <span><Workflow size={17} aria-hidden /> Pipeline</span>
        <span>Fictional lead</span>
      </div>
      <div className={styles.dispatchBody}>
        <div className={styles.board} aria-label="Example lead activity">
          <div data-tone="queued"><i />Queued<span>CSV imported</span></div>
          <ArrowRight aria-hidden size={14} />
          <div data-tone="warning"><i />Warm<span>Portfolio click</span></div>
          <ArrowRight aria-hidden size={14} />
          <div data-tone="violet"><i />Replied<span>Call requested</span></div>
        </div>
        <div className={styles.lead}>
          <span className={styles.initials} aria-hidden>MC</span>
          <div><strong>Maya Chen</strong><span>Juniper Studio · AI Product Marketing</span></div>
          <span className={styles.leadIcon}><Inbox size={20} aria-hidden /></span>
        </div>
        <div className={styles.signal}>
          <span className={styles.signalIcon}><Send size={16} aria-hidden /></span>
          <div><strong>New reply · Interview request</strong><p>“Could we find 20 minutes next week?”</p></div>
          <span className={styles.signalDot} aria-hidden />
        </div>
        <div className={styles.dispatchStatus}>
          <span><CirclePause size={15} aria-hidden /> Follow-ups stopped</span>
          <span>Gmail thread retained</span>
        </div>
      </div>
    </figure>
  );
}

const facts = [
  ["8", "Funnel stages"], ["4", "Email touches"], ["4", "Role tracks"],
  ["3", "Sending regions"], ["2", "Execution modes"], ["1", "Workspace owner"],
];

export default function OutreachOsPage() {
  return (
    <MotionProvider>
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <main className={styles.root}>
        <section className={styles.hero}>
          <HeroLock />
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Gmail-connected CRM</p>
              <h1 className="sr-only">OutreachOS — A pipeline for the job search.</h1>
              <div className={styles.heroLogo} aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M42 12a23 23 0 1 0 0 40M24 20a14 14 0 0 1 0 24" />
                  <circle cx="49" cy="32" r="5" fill="currentColor" stroke="none" />
                </svg>
                <span>Outreach<span>OS</span></span>
              </div>
              <p className={styles.heroTagline} aria-hidden="true">A pipeline for the job search.</p>
              <PageAnswer href={PATH} className={styles.answer} />
              <div className={styles.actions}>
                <a href="#pipeline" className={styles.primary}>Explore the funnel <ArrowDownRight size={17} aria-hidden /></a>
                <a href="#templates" className={styles.secondary}>Try the templates <ArrowRight size={16} aria-hidden /></a>
              </div>
            </div>
            <DispatchPreview />
          </div>
        </section>

        <div className={styles.facts}>
          <dl className={styles.wrap}>
            {facts.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </div>

        <section className={`${styles.section} ${styles.paper}`} aria-label="The problem and solution">
          <div className={styles.wrap}>
            <Heading label="Problem & solution" aside="Job portals rarely show what happens after an application. With direct emails, the work shifts to tracking who got a note, when to follow up, and which conversations have already started.">
              A job search has <em>moving parts.</em>
            </Heading>
            <div className={styles.problemGrid}>
              <article><Inbox size={23} aria-hidden /><h3>The inbox carries the conversation.</h3><p>Gmail keeps the original thread. OutreachOS records what happened and what’s due next, so a detected reply can stop the next follow-up.</p></article>
              <article><GitBranch size={23} aria-hidden /><h3>The pipeline carries the context.</h3><p>One lead record ties together the contact, role, message history, signals, notes and next decision. A board shows the stage. The dossier explains how it got there.</p></article>
              <article><ShieldCheck size={23} aria-hidden /><h3>The schedule has reasons to wait.</h3><p>Prechecks, local calendars, send caps, approvals and reply checks determine whether a follow-up can leave. The owner takes over when there’s a conversation.</p></article>
            </div>
          </div>
        </section>

        <section id="pipeline" className={`${styles.section} ${styles.funnelSection}`}>
          <div className={styles.wrap}>
            <Heading label="The eight-stage funnel" aside="Expand a stage to follow Maya, a fictional hiring contact. Leads can change course after a reply, an offer, a pause, or a delivery failure.">
              Where every <em>conversation stands.</em>
            </Heading>
            <ol className={styles.funnel}>
              {stages.map((stage, index) => (
                <li key={stage.name} data-tone={stage.tone}>
                  <details name="outreach-funnel" open={index === 0}>
                    <summary>
                      <span className={styles.stageNumber}>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{stage.name}</h3>
                      <span className={styles.stageTrigger}>{stage.trigger}</span>
                      <ChevronDown size={18} aria-hidden />
                    </summary>
                    <div className={styles.stageDetail}>
                      <p>{stage.detail}</p>
                      <p><span>Sample lead</span>{stage.example}</p>
                    </div>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="templates" className={`${styles.section} ${styles.paper}`}>
          <div className={styles.wrap}>
            <Heading label="Template studio" aside="Four touches, five template options. Touch 2 has two versions and a shared wait. Follow-ups reuse the original subject and thread.">
              Every follow-up <em>has a purpose.</em>
            </Heading>
            <div className={styles.templateGrid}>
              <ol className={styles.touches}>
                {touches.map((touch) => (
                  <li data-tone={touch.tone} key={touch.id}>
                    <span>{touch.id}</span>
                    <div><h3>{touch.name}</h3><p>{touch.detail}</p></div>
                    <small>{touch.wait}</small>
                  </li>
                ))}
              </ol>
              <TemplatePreview />
            </div>
            <p className={styles.footnote}>Hybrid provides the shared defaults. Brand, AI Product Marketing and AI Product Management can inherit or override each slot. The studio previews editable waits, threading, and merge fields for names, roles, icebreakers, signature and labelled links. Unresolved fields can block a send.</p>
          </div>
        </section>

        <section id="sending" className={`${styles.section} ${styles.sendingSection}`}>
          <div className={styles.wrap}>
            <Heading label="Gmail & execution modes" aside="The owner connects Gmail through Google OAuth. OutreachOS sends from that mailbox, keeps follow-ups in the same Gmail thread, and checks for replies in the thread and across the mailbox.">
              Two ways to <em>run the queue.</em>
            </Heading>
            <div className={styles.modeGrid}>
              <article data-tone="warning">
                <div className={styles.modeIcon}><ShieldCheck size={25} aria-hidden /></div>
                <p className={styles.mono}>Approval Gate</p>
                <h3>Approval Gated</h3>
                <p>Review the next touch, edit the subject, body or icebreaker, and approve it individually or by batch. An approval can be revoked before dispatch. The next touch needs its own approval.</p>
              </article>
              <article data-tone="info">
                <div className={styles.modeIcon}><Radio size={25} aria-hidden /></div>
                <p className={styles.mono}>Auto-Pilot</p>
                <h3>Automated</h3>
                <p>Eligible, prewritten touches run on schedule. The owner can pause a lead, and each dispatch rechecks the address, send eligibility and whether anyone has replied.</p>
              </article>
            </div>
            <div className={styles.sendRules}>
              <h3>Rules both modes share</h3>
              <ul>
                <li><Check aria-hidden size={16} />Passed email precheck and a sendable lead</li>
                <li><Check aria-hidden size={16} />Regional working hours, holidays and blackout dates</li>
                <li><Check aria-hidden size={16} />Daily cap, pacing and optional sender warm-up</li>
                <li><Check aria-hidden size={16} />Final reply check before a follow-up</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="leads" className={`${styles.section} ${styles.paper}`}>
          <div className={styles.wrap}>
            <Heading label="Leads, CSV import & prechecks" aside="The lead record holds contact details, role track, region, notes, the message thread and an event timeline. Starting with a clean lead record makes the rest of the workflow easier to verify.">
              A clean list makes <em>a safer queue.</em>
            </Heading>
            <div className={styles.operations}>
              <article className={styles.importCard}>
                <FileSpreadsheet size={24} aria-hidden />
                <h3>Preview a CSV before importing</h3>
                <p>Upload a CSV or add a lead manually. The importer suggests header mappings, supports track and region overrides, and shows new, duplicate, invalid and suppressed entries before import. Import history keeps the batch report and lets the owner download excluded rows.</p>
                <table className={styles.importTable}>
                  <caption>Sample import preview</caption>
                  <thead><tr><th scope="col">Contact</th><th scope="col">CSV outcome</th></tr></thead>
                  <tbody>
                    <tr><td>Maya · Juniper Studio</td><td data-tone="success">New</td></tr>
                    <tr><td>Leo · Fieldnote Labs</td><td data-tone="warning">Already in CRM</td></tr>
                    <tr><td>Nora · Ridge Works</td><td data-tone="danger">Invalid address</td></tr>
                  </tbody>
                </table>
              </article>
              <article className={styles.checkCard}>
                <ShieldCheck size={24} aria-hidden />
                <h3>Check whether the domain can take mail</h3>
                <p>Built-in prechecks look at address syntax, DNS mail routing, likely typos and prior bounce or unsubscribe suppression. A passed check confirms routing only. Individual mailbox existence and catch-all behavior remain unknown.</p>
                <ul className={styles.checkStates} aria-label="Precheck states">
                  <li data-tone="queued"><i />Pending</li><li data-tone="success"><i />Passed</li>
                  <li data-tone="warning"><i />Retry</li><li data-tone="danger"><i />Blocked</li>
                </ul>
                <p>Transient DNS errors retry. Pending, retry and blocked addresses stay out of dispatch. An unsent address edit resets review and precheck status. A hard bounce blocks future sends to that address.</p>
              </article>
            </div>
            <div className={styles.dossier}>
              <Inbox size={24} aria-hidden />
              <div><h3>Work from a filtered list or open a dossier</h3><p>Search leads by contact and company, or filter by track, region, stage and import batch. The owner can edit notes, move stages, pause or resume eligible sequences, export a CSV, and recover a trashed lead in a paused state.</p></div>
            </div>
          </div>
        </section>

        <section id="ai" className={`${styles.section} ${styles.aiSection}`}>
          <div className={styles.wrap}>
            <Heading label="Responsible AI" aside="OutreachOS gives AI a bounded task after Gmail detects an inbound reply. The result helps the owner decide what to do with the conversation.">
              AI reads the reply. <em>The owner writes back.</em>
            </Heading>
            <div className={styles.aiGrid}>
              <div className={styles.aiExample}>
                <div className={styles.panelBar}><span><Mail size={16} aria-hidden /> Reply triage</span><span>Fictional example</span></div>
                <div className={styles.aiExampleBody}>
                  <p className={styles.mono}>Incoming message</p>
                  <blockquote>“I’d like to see your product work. Could we find 20 minutes next week?”</blockquote>
                  <dl>
                    <div><dt>Intent</dt><dd>Interview request</dd></div>
                    <div><dt>Sentiment</dt><dd>Positive</dd></div>
                    <div><dt>Sequence</dt><dd>Stopped</dd></div>
                  </dl>
                  <p className={styles.mono}>Suggested draft · for review</p>
                  <p>“Thanks, Maya. I’d be happy to walk through the work. I’m free [your available slots].”</p>
                </div>
              </div>
              <div className={styles.aiNotes}>
                <article><h3>People make the decisions.</h3><p>AI can label sentiment and intent, summarize, flag urgency, read a return date, and suggest a short draft for positive or neutral replies. The owner reviews the result, chooses the next stage, and sends any personal response from Gmail. Draft instructions call for placeholders when facts are missing.</p></article>
                <article><h3>Follow-ups can stop without AI.</h3><p>Mailbox checks detect replies. The app validates model output and falls back to keyword rules if the model is unavailable. When enabled, a detected out-of-office message can delay a remaining touch until after the return date, while opt-outs suppress further sending.</p></article>
                <article><h3>AI receives a bounded excerpt.</h3><p>The AI provider, Groq, receives up to 3,000 characters of reply text after quoted history is stripped, plus basic sender and lead context. The CRM retains a short snippet and the triage result. Its Gmail connection requests send and read-only scopes.</p></article>
              </div>
            </div>
          </div>
        </section>

        <section id="analytics" className={`${styles.section} ${styles.paper}`}>
          <div className={styles.wrap}>
            <Heading label="Analytics & alerts" aside="Analytics compare the touches, role tracks and regions. Separate rates for clicks, visits and human replies help put noisy open counts in context.">
              See what happened <em>after sending.</em>
            </Heading>
            <div className={styles.analyticsGrid}>
              <figure className={styles.chart}>
                <figcaption><ChartNoAxesCombined size={21} aria-hidden /> Outreach rates <span>Illustrative data</span></figcaption>
                <dl>
                  {metrics.map((metric) => (
                    <div key={metric.label} data-tone={metric.tone}>
                      <dt>{metric.label}</dt>
                      <dd>
                        <span className={styles.metricBar} aria-hidden style={{ "--rate": `${metric.rate}%` } as CSSProperties}><i /></span>
                        <span>{metric.count} · {metric.rate}%</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </figure>
              <div className={styles.analyticsNotes}>
                <article><h3>Read the denominator.</h3><p>Open and click rates use delivered emails. Reply and positive-reply rates use contacted leads and exclude out-of-office replies. The dashboard also shows daily sends and replies, bounce rate and stage progression over 7, 30, 90 days or all time.</p></article>
                <article><h3>Bring the reply to the owner.</h3><p>Telegram can send a reply alert with links to Gmail and the dossier, plus a morning digest of replies, warm leads, interviews and queue activity. Known scanners and early automated hits are filtered from open and click counts. Optional portfolio telemetry can attribute visits and visible time to a lead.</p></article>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.closing}>
          <div className={`${styles.wrap} ${styles.closingIntro}`}>
            <div>
              <Breadcrumbs trail={[{ label: "CRMs", href: null }, { label: "OutreachOS", href: PATH }]} />
              <p>Built solo by Suman Debnath with Next.js, Supabase, Gmail, Groq and Telegram.</p>
            </div>
            <Link className={styles.secondary} href="/contact">Contact me for a demo <ArrowRight size={16} aria-hidden /></Link>
          </div>
          <PageFaq href={PATH} heading="Questions about OutreachOS" surface="#1b1b1e" />
          <RelatedPages href={PATH} surface="#1b1b1e" />
          <Contact closingBg="radial-gradient(ellipse at 50% 0%, #3b3126 0%, #1b1b1e 68%)" glowColor="rgba(221,189,137,0.10)" hazeColor="rgba(221,189,137,0.05)" />
        </div>
      </main>
    </MotionProvider>
  );
}
