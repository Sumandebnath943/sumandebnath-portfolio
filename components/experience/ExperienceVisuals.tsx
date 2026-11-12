"use client";

import { useEffect, useState } from "react";
import {
  companyAttributions,
  experiencePillars,
  experiencePostscript,
  type ExperiencePillar,
} from "@/lib/experience";

const PILLAR_SHORT_LABELS: Record<string, string> = {
  "leadership-stakeholders": "01 · 21-Person Team & Stakeholders",
  "web-ecosystem": "02 · 50+ Sites / 1,000+ Pages",
  "brand-identity-governance": "03 · Ground-Up Brand & Governance",
  "creative-production-print-budget": "04 · 1,000+ Assets & ₹30–40L Print",
  "performance-social-partners": "05 · Paid Ads, Social & Partners",
  "decks-events-launches": "06 · 150+ Decks & 3-Day Flagship Launch",
  "ai-workflows-team-adoption": "07 · CSV AI Funnels & Team Workflows",
};

function PillarSchematic({ pillarId }: { pillarId: string }) {
  switch (pillarId) {
    case "leadership-stakeholders":
      return (
        <div className="ex-schematic" aria-label="Operational topology of the 21-person cross-functional floor">
          <div className="ex-schematic-header">
            <span>SCHEMATIC 01 // STAKEHOLDER SHIELD &amp; 21-PERSON ORG TOPOLOGY</span>
            <span>99%+ ON-TIME DELIVERY</span>
          </div>
          <div className="ex-schematic-grid">
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">INBOUND PRESSURE</div>
              <div className="ex-schematic-node-val">CEO · Chairman · 4 Depts</div>
              <div className="ex-schematic-node-desc">
                Daily direct reporting + Admissions, Counselling, Sales &amp; Academics requirements.
              </div>
            </div>
            <div className="ex-schematic-node is-accent">
              <div className="ex-schematic-node-kicker">TRANSLATION GATE</div>
              <div className="ex-schematic-node-val">Structured Briefs &amp; QA</div>
              <div className="ex-schematic-node-desc">
                Blunt, last-minute boardroom requests converted into platform-wise briefs &amp; revision gates.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">DIRECT REPORTS</div>
              <div className="ex-schematic-node-val">12–15 Specialists</div>
              <div className="ex-schematic-node-desc">
                Core daily supervision across Graphic Design, Web Development &amp; Digital Marketing.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">EXTENDED FLOOR</div>
              <div className="ex-schematic-node-val">6–9 Indirect (~21 Total)</div>
              <div className="ex-schematic-node-desc">
                Cross-coordinated contributors, video editors, copywriters &amp; external agency pods.
              </div>
            </div>
          </div>
        </div>
      );

    case "web-ecosystem":
      return (
        <div className="ex-schematic" aria-label="Breakdown of the 50+ website and 1,000+ webpage ecosystem">
          <div className="ex-schematic-header">
            <span>SCHEMATIC 02 // 50+ WEBSITE &amp; 1,000+ WEBPAGE INFRASTRUCTURE</span>
            <span>+40–50% ORGANIC TRAFFIC</span>
          </div>
          <div className="ex-schematic-grid">
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">TIER A · FLAGSHIPS</div>
              <div className="ex-schematic-node-val">Institution &amp; Sister Brands</div>
              <div className="ex-schematic-node-desc">
                Main institutional domains, group corporate sites, and sister brand portals.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">TIER B · ACQUISITION</div>
              <div className="ex-schematic-node-val">Microsites &amp; Funnels</div>
              <div className="ex-schematic-node-desc">
                Academic programme microsites, high-conversion admission landing pages &amp; event hubs.
              </div>
            </div>
            <div className="ex-schematic-node is-accent">
              <div className="ex-schematic-node-kicker">BENCHMARK SPRINT</div>
              <div className="ex-schematic-node-val">5 Sites in 1 Month</div>
              <div className="ex-schematic-node-desc">
                5 complete, SEO-ready websites with live payment gateways built and shipped in 30 days.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">AI VELOCITY</div>
              <div className="ex-schematic-node-val">Weeks → Hours</div>
              <div className="ex-schematic-node-desc">
                Full redesign, UX overhaul, and deployment cycles compressed via AI-assisted workflows.
              </div>
            </div>
          </div>
        </div>
      );

    case "brand-identity-governance":
      return (
        <div className="ex-schematic" aria-label="Brand identity governance across print and digital surfaces">
          <div className="ex-schematic-header">
            <span>SCHEMATIC 03 // ZERO-TO-ONE BRAND SPINE &amp; OMNI-CHANNEL LOCK</span>
            <span>PRINT + DIGITAL PARITY</span>
          </div>
          <div className="ex-schematic-grid">
            <div className="ex-schematic-node is-accent">
              <div className="ex-schematic-node-kicker">0 → 1 IDENTITIES</div>
              <div className="ex-schematic-node-val">Ground-Up Systems</div>
              <div className="ex-schematic-node-desc">
                CBS Ventures brand &amp; digital strategy from scratch; new sister brands &amp; programme launches; House of Namus.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">OFFLINE SURFACES</div>
              <div className="ex-schematic-node-val">Hoardings · Press · Campus</div>
              <div className="ex-schematic-node-desc">
                Highway OOH, national newspaper ads, prospectuses, retail &amp; campus environmental branding.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">DIGITAL SURFACES</div>
              <div className="ex-schematic-node-val">Web · Paid · Social</div>
              <div className="ex-schematic-node-desc">
                50+ web properties, performance ad creatives, emailer templates &amp; video identity systems.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">FIELD ROOTS</div>
              <div className="ex-schematic-node-val">Aamrit · Nivea · Raman Byte</div>
              <div className="ex-schematic-node-desc">
                Early consumer-brand execution grounding how physical shelf and channel presence actually work.
              </div>
            </div>
          </div>
        </div>
      );

    case "creative-production-print-budget":
      return (
        <div className="ex-schematic" aria-label="Print vendor budget and 1,000+ asset production telemetry">
          <div className="ex-schematic-header">
            <span>SCHEMATIC 04 // PRE-PRESS &amp; DIGITAL PRODUCTION LEDGER</span>
            <span>CMYK + RGB · ZERO-PATCH TOLERANCE</span>
          </div>
          <div className="ex-schematic-grid">
            <div className="ex-schematic-node is-accent">
              <div className="ex-schematic-node-kicker">PRINT VENDOR BUDGET</div>
              <div className="ex-schematic-node-val">₹30–40L / Year Owned</div>
              <div className="ex-schematic-node-desc">
                Direct vendor rate negotiation, paper GSM specs, colour proofs &amp; print-run quality control.
              </div>
            </div>
            <div className="ex-schematic-node is-accent">
              <div className="ex-schematic-node-kicker">CRISIS BENCHMARK</div>
              <div className="ex-schematic-node-val">200 Pages in 1 Day</div>
              <div className="ex-schematic-node-desc">
                Complete 200-page institutional brochure written, laid out, proofed &amp; shipped in one sitting.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">PRINT &amp; OOH VOLUME</div>
              <div className="ex-schematic-node-val">Brochures · OOH · Press</div>
              <div className="ex-schematic-node-desc">
                Newspaper ads, highway hoardings, admission leaflets, standees &amp; campus installations.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">DIGITAL &amp; SOCIAL</div>
              <div className="ex-schematic-node-val">1,000+ Total Assets</div>
              <div className="ex-schematic-node-desc">
                Paid performance creatives, social carousels, admission campaigns, emailers &amp; video cuts.
              </div>
            </div>
          </div>
        </div>
      );

    case "performance-social-partners":
      return (
        <div className="ex-schematic" aria-label="Full-funnel campaign and channel partner architecture">
          <div className="ex-schematic-header">
            <span>SCHEMATIC 05 // THREE-LANE ACQUISITION &amp; PARTNER ENGINE</span>
            <span>20+ DOMESTIC &amp; INTL. LAUNCHES</span>
          </div>
          <div className="ex-schematic-grid">
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">LANE 1 · PAID MEDIA</div>
              <div className="ex-schematic-node-val">Strategy · Creative · Retargeting</div>
              <div className="ex-schematic-node-desc">
                Google &amp; Meta ad production, remarketing funnels &amp; budget planning (non-spend-card handling).
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">LANE 2 · OWNED RHYTHM</div>
              <div className="ex-schematic-node-val">Calendars &amp; Emailers</div>
              <div className="ex-schematic-node-desc">
                Platform-wise social strategy, monthly content calendars, admission emailers &amp; newsletters.
              </div>
            </div>
            <div className="ex-schematic-node is-accent">
              <div className="ex-schematic-node-kicker">LANE 3 · EXTERNAL PARTNERS</div>
              <div className="ex-schematic-node-val">Aggregators &amp; Reg. Partners</div>
              <div className="ex-schematic-node-desc">
                Paid outreach &amp; custom collateral pipelines for education aggregators &amp; admission partners.
              </div>
            </div>
          </div>
        </div>
      );

    case "decks-events-launches":
      return (
        <div className="ex-schematic" aria-label="150+ pitch decks and 72-hour flagship event branding sprint">
          <div className="ex-schematic-header">
            <span>SCHEMATIC 06 // HIGH-STAKES DECKS &amp; 72-HOUR EVENT LAUNCH WAR ROOM</span>
            <span>50–100+ EVENT ASSETS IN 3 WORK DAYS</span>
          </div>
          <div className="ex-schematic-grid">
            <div className="ex-schematic-node is-accent">
              <div className="ex-schematic-node-kicker">ACCREDITATION DEMO</div>
              <div className="ex-schematic-node-val">Govt. Body Pitch Deck</div>
              <div className="ex-schematic-node-desc">
                Product pitch deck used directly in a live demo to one of India’s largest govt. education accreditors.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">150+ DECK ARCHIVE</div>
              <div className="ex-schematic-node-val">Sales · Pitch · Counselling</div>
              <div className="ex-schematic-node-desc">
                Corporate pitch decks, student orientations, showcase decks &amp; admission counselling decks.
              </div>
            </div>
            <div className="ex-schematic-node is-accent">
              <div className="ex-schematic-node-kicker">3-DAY FLAGSHIP LAUNCH</div>
              <div className="ex-schematic-node-val">50–100+ Assets / 72 Hrs</div>
              <div className="ex-schematic-node-desc">
                Every stage backdrop, LED graphic, standee, badge &amp; print piece shipped in 3 working days.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">YEAR-ROUND EVENTS</div>
              <div className="ex-schematic-node-val">Internal &amp; External Flows</div>
              <div className="ex-schematic-node-desc">
                End-to-end event branding oversight across convocations, corporate conclaves &amp; launches.
              </div>
            </div>
          </div>
        </div>
      );

    case "ai-workflows-team-adoption":
      return (
        <div className="ex-schematic" aria-label="Applied AI pipelines for daily CSV merging and creative production">
          <div className="ex-schematic-header">
            <span>SCHEMATIC 07 // PRODUCTION FLOOR AI PIPELINES (BEFORE → AFTER)</span>
            <span>TEAM-WIDE ADOPTION ACROSS 21 PEOPLE</span>
          </div>
          <div className="ex-schematic-grid">
            <div className="ex-schematic-node is-accent">
              <div className="ex-schematic-node-kicker">DATA PIPELINE</div>
              <div className="ex-schematic-node-val">1,000s of CSV Rows / Day</div>
              <div className="ex-schematic-node-desc">
                Multiple automated AI funnels cleaning, reconciling &amp; merging fragmented lead/student CSVs daily.
              </div>
            </div>
            <div className="ex-schematic-node is-accent">
              <div className="ex-schematic-node-kicker">PORTRAIT GPT PIPELINE</div>
              <div className="ex-schematic-node-val">-7 to 8 Hrs / Week</div>
              <div className="ex-schematic-node-desc">
                Custom GPT converting raw student photos into studio corporate portraits without manual retouching.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">GEN-AI AD PIPELINE</div>
              <div className="ex-schematic-node-val">-2 to 3 Hrs / Day</div>
              <div className="ex-schematic-node-desc">
                Daily performance creative variations &amp; visual assets generated and shipped at floor speed.
              </div>
            </div>
            <div className="ex-schematic-node">
              <div className="ex-schematic-node-kicker">FLOOR ENABLEMENT</div>
              <div className="ex-schematic-node-val">21-Person Upskilling</div>
              <div className="ex-schematic-node-desc">
                Trained design, content, web &amp; digital teams to embed AI workflows into daily production.
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function ExperienceInteractiveFloor() {
  const [selectedOrg, setSelectedOrg] = useState<string>("ALL");
  const [activePillarId, setActivePillarId] = useState<string>(
    experiencePillars[0]?.id ?? "leadership-stakeholders"
  );

  // Track active pillar via IntersectionObserver (PROJECT_BIBLE Rule #4: body is scroll container)
  useEffect(() => {
    const ids = [
      ...experiencePillars.map((p) => p.id),
      "honest-postscript",
    ];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActivePillarId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const selectedCompanyObj = companyAttributions.find(
    (c) => c.org === selectedOrg
  );
  const highlightedPillarIds = selectedCompanyObj
    ? new Set(selectedCompanyObj.pillarIds)
    : null;

  const employmentOrgs = companyAttributions.filter(
    (c) => c.kind === "employment"
  );
  const ventureOrgs = companyAttributions.filter((c) => c.kind === "venture");

  return (
    <>
      {/* ── Section 02: Cross-Company & Venture Attribution Matrix ────────── */}
      <section
        id="brand-attribution"
        className="ex-matrix-section"
        aria-labelledby="ex-matrix-heading"
      >
        <div className="ex-container">
          <div className="ex-section-header">
            <div className="ex-kicker-dark">
              <span>00B / WHERE EACH PILLAR HAPPENED</span>
            </div>
            <h2 id="ex-matrix-heading" className="ex-h2-dark">
              Organized by functional capability —{" "}
              <em>attributed across every brand, tenure, and venture.</em>
            </h2>
            <p className="ex-lead-dark">
              Select any organization or independent venture below to spotlight
              which of the functional pillars were executed there, or keep{" "}
              <strong>All 9+ Years</strong> active to inspect the full record.
              Every pillar remains in the page below for direct comparison.
            </p>
          </div>

          {/* Interactive Brand Era Filter Bar */}
          <div
            className="ex-filter-bar"
            role="toolbar"
            aria-label="Filter functional pillars by organization or venture"
          >
            <button
              type="button"
              className="ex-filter-btn"
              aria-pressed={selectedOrg === "ALL"}
              onClick={() => setSelectedOrg("ALL")}
            >
              <span>All 9+ Years (Full Floor)</span>
              <span className="ex-filter-count">8 Pillars</span>
            </button>
            {companyAttributions.map((company) => {
              const isSelected = selectedOrg === company.org;
              return (
                <button
                  key={company.org}
                  type="button"
                  className="ex-filter-btn"
                  aria-pressed={isSelected}
                  onClick={() =>
                    setSelectedOrg(isSelected ? "ALL" : company.org)
                  }
                >
                  <span>{company.shortLabel}</span>
                  <span className="ex-filter-count">
                    {company.pillarIds.length} Pillars
                  </span>
                </button>
              );
            })}
          </div>

          {/* Part A: Corporate & Institutional Employment Tenures */}
          <div
            style={{
              fontFamily: "var(--font-dmmono), monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(245, 240, 230, 0.68)",
              marginBottom: "0.75rem",
            }}
          >
            CORPORATE &amp; INSTITUTIONAL LEADERSHIP TENURES (2016 — PRESENT)
          </div>
          <div className="ex-company-grid" style={{ marginBottom: "2rem" }}>
            {employmentOrgs.map((company) => {
              const isHighlighted =
                selectedOrg === "ALL" || selectedOrg === company.org;
              const isDimmed =
                selectedOrg !== "ALL" && selectedOrg !== company.org;

              return (
                <article
                  key={company.org}
                  className={`ex-company-card ${
                    selectedOrg === company.org ? "is-highlighted" : ""
                  } ${isDimmed ? "is-dimmed" : ""}`}
                >
                  <div>
                    <div className="ex-company-period">
                      <span>{company.period}</span>
                      <span>{company.location}</span>
                    </div>
                    <h3 className="ex-company-org">{company.org}</h3>
                    <div className="ex-company-role">{company.role}</div>
                    <p className="ex-company-scope">{company.scopeSummary}</p>
                  </div>

                  <div
                    className="ex-company-pillars"
                    aria-label={`Functional pillars executed at ${company.org}`}
                  >
                    {company.pillarIds.map((pid) => (
                      <a
                        key={pid}
                        href={`#${pid}`}
                        className="ex-company-pillar-chip"
                        onClick={() => {
                          if (!isHighlighted) setSelectedOrg("ALL");
                        }}
                      >
                        {PILLAR_SHORT_LABELS[pid] ?? pid}
                      </a>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Part B: Independent Ventures & AI-Native Product Studio (House of Namus separated) */}
          <div
            style={{
              fontFamily: "var(--font-dmmono), monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#FBBF24",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span>
              INDEPENDENT PRODUCT STUDIO &amp; SELF-BUILT ECOSYSTEMS (SEPARATE FROM
              EMPLOYMENT)
            </span>
            <span>FOUNDER-LED</span>
          </div>
          <div className="ex-company-grid">
            {ventureOrgs.map((company) => {
              const isHouseOfNamus = company.org === "House of Namus";
              const isHighlighted =
                selectedOrg === "ALL" || selectedOrg === company.org;
              const isDimmed =
                selectedOrg !== "ALL" && selectedOrg !== company.org;

              return (
                <article
                  key={company.org}
                  className={`ex-company-card ${
                    selectedOrg === company.org ? "is-highlighted" : ""
                  } ${isDimmed ? "is-dimmed" : ""}`}
                  style={
                    isHouseOfNamus
                      ? {
                          borderColor: "rgba(245, 158, 11, 0.45)",
                          background:
                            "linear-gradient(145deg, rgba(245, 158, 11, 0.1) 0%, #15120E 55%)",
                        }
                      : undefined
                  }
                >
                  <div>
                    <div className="ex-company-period">
                      <span>{company.period}</span>
                      <span>{company.location}</span>
                    </div>
                    <h3 className="ex-company-org">{company.org}</h3>
                    <div className="ex-company-role">{company.role}</div>
                    <p className="ex-company-scope">{company.scopeSummary}</p>
                  </div>

                  <div
                    className="ex-company-pillars"
                    aria-label={`Functional pillars executed at ${company.org}`}
                  >
                    {company.pillarIds.map((pid) => (
                      <a
                        key={pid}
                        href={`#${pid}`}
                        className="ex-company-pillar-chip"
                        onClick={() => {
                          if (!isHighlighted) setSelectedOrg("ALL");
                        }}
                      >
                        {PILLAR_SHORT_LABELS[pid] ?? pid}
                      </a>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 03: The 7 Functional Pillars (Sticky Rail + Dossiers) ── */}
      <section
        id="functional-pillars"
        className="ex-pillars-section"
        aria-label="Eight functional pillars of Suman Debnath's 9+ years of experience"
      >
        <div className="ex-container">
          <div className="ex-pillars-layout">
            {/* Sticky Left Index Rail */}
            <aside className="ex-sticky-rail" aria-label="Pillar navigation">
              <div className="ex-rail-title">
                <span>FLOOR DOSSIER INDEX</span>
                <span>01 — 08</span>
              </div>
              {selectedOrg !== "ALL" && (
                <div
                  style={{
                    marginBottom: "0.75rem",
                    padding: "0.5rem 0.65rem",
                    borderRadius: "5px",
                    background: "rgba(245, 158, 11, 0.12)",
                    border: "1px solid rgba(245, 158, 11, 0.35)",
                    fontSize: "0.74rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ color: "#FBBF24", fontWeight: 600 }}>
                    {selectedCompanyObj?.shortLabel ?? "Filtered"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedOrg("ALL")}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#F5F0E6",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: "0.72rem",
                    }}
                  >
                    Reset
                  </button>
                </div>
              )}
              <nav className="ex-rail-nav">
                {experiencePillars.map((pillar) => {
                  const isActive = activePillarId === pillar.id;
                  const isDimmed =
                    highlightedPillarIds !== null &&
                    !highlightedPillarIds.has(pillar.id);
                  return (
                    <a
                      key={pillar.id}
                      href={`#${pillar.id}`}
                      className={`ex-rail-item ${isActive ? "is-active" : ""} ${
                        isDimmed ? "is-dimmed" : ""
                      }`}
                      aria-current={isActive ? "location" : undefined}
                    >
                      <span className="ex-rail-idx">{pillar.index}</span>
                      <span>{pillar.titleSans.replace(/\.$/, "")}</span>
                    </a>
                  );
                })}
                <a
                  href="#honest-postscript"
                  className={`ex-rail-item ${
                    activePillarId === "honest-postscript" ? "is-active" : ""
                  }`}
                  aria-current={
                    activePillarId === "honest-postscript"
                      ? "location"
                      : undefined
                  }
                >
                  <span className="ex-rail-idx">
                    {experiencePostscript.index}
                  </span>
                  <span>The Honest Postscript</span>
                </a>
              </nav>
            </aside>

            {/* Right Column: Pillars 01 – 07 Dossier Stack */}
            <div className="ex-pillars-stack">
              {experiencePillars.map((pillar: ExperiencePillar) => {
                const isSpotlight =
                  highlightedPillarIds !== null &&
                  highlightedPillarIds.has(pillar.id);
                const isDimmed =
                  highlightedPillarIds !== null &&
                  !highlightedPillarIds.has(pillar.id);

                return (
                  <article
                    key={pillar.id}
                    id={pillar.id}
                    className={`ex-pillar-card ${
                      isSpotlight ? "is-spotlight" : ""
                    } ${isDimmed ? "is-dimmed" : ""}`}
                  >
                    <div className="ex-pillar-top">
                      <span className="ex-pillar-kicker">{pillar.kicker}</span>
                      <span className="ex-pillar-where">{pillar.where}</span>
                    </div>

                    <div className="ex-pillar-headline-row">
                      <div className="ex-pillar-num" aria-hidden="true">
                        {pillar.index}
                      </div>
                      <div>
                        <div className="ex-pillar-display" aria-hidden="true">
                          <span className="ex-pillar-display-sans">
                            {pillar.titleSans}
                          </span>
                          <span className="ex-pillar-display-serif">
                            {pillar.titleSerif}
                          </span>
                        </div>
                        <h2 className="ex-pillar-h2">{pillar.subheading}</h2>
                      </div>
                    </div>

                    <div className="ex-pillar-prose">
                      {pillar.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {/* Bespoke Visual Schematic for this Pillar */}
                    <PillarSchematic pillarId={pillar.id} />

                    {/* Extractable Fact Rows (<dl>) */}
                    <dl className="ex-facts-dl">
                      {pillar.facts.map((fact) => (
                        <div key={fact.label} className="ex-fact-row">
                          <dt className="ex-fact-dt">{fact.label}</dt>
                          <dd className="ex-fact-dd">{fact.text}</dd>
                        </div>
                      ))}
                    </dl>

                    {/* Capability Tags */}
                    <div className="ex-tags-row" aria-label="Capabilities">
                      {pillar.tags.map((tag) => (
                        <span key={tag} className="ex-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
