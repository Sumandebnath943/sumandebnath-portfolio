"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { domains, competencies, experiences, type Experience } from "@/lib/learnings-data";
import "./learnings.css";

/* ─────────────────────────────────────────────────────────────── */
/* PDF helpers — use window.pdfjsLib loaded from CDN <Script>      */
/* ─────────────────────────────────────────────────────────────── */

// Typed access to the CDN global
declare global {
  interface Window {
    pdfjsLib: {
      GlobalWorkerOptions: { workerSrc: string };
      getDocument(src: string): { promise: Promise<PDFDocumentProxy> };
    };
  }
}
interface PDFDocumentProxy {
  getPage(n: number): Promise<PDFPageProxy>;
}
interface PDFPageProxy {
  getViewport(opts: { scale: number }): { width: number; height: number };
  render(opts: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }): { promise: Promise<void> };
}

async function renderPdfToCanvas(
  pdfUrl: string,
  canvas: HTMLCanvasElement,
  scale = 1.5
) {
  try {
    const lib = window.pdfjsLib;
    if (!lib) return; // CDN not loaded yet
    const encoded = pdfUrl
      .split("/")
      .map((p) => encodeURIComponent(p))
      .join("/");
    const pdf = await lib.getDocument(encoded).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale });
    const ctx = canvas.getContext("2d")!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;
  } catch (err) {
    console.warn("PDF render failed:", pdfUrl, err);
  }
}

const DOMAIN_ICONS: Record<string, string> = {
  "ai-foundations": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  "prompt-engineering": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/></svg>`,
  "responsible-ai": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  "ai-strategy": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  "ai-leadership": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>`,
  "claude-ecosystem": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
};

/* ─────────────────────────────────────────────────────────────── */
/* CredentialStack — renders stacked PDF thumbnail canvases        */
/* ─────────────────────────────────────────────────────────────── */
function CredentialStack({
  exp,
  onOpen,
}: {
  exp: Experience;
  onOpen: () => void;
}) {
  const layerCount = Math.min(exp.credentials.length, 5);
  const refs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    exp.credentials.slice(0, layerCount).forEach((cred, i) => {
      const canvas = refs.current[i];
      if (canvas && cred.pdf) {
        renderPdfToCanvas(cred.pdf, canvas, 0.8);
      }
    });
  }, [exp, layerCount]);

  return (
    <div
      className="lp-credential-stack"
      data-layers={layerCount}
      onClick={onOpen}
    >
      {exp.credentials.slice(0, layerCount).map((_, i) => (
        <div
          key={i}
          className="lp-stack-layer"
          data-index={i + 1}
        >
          <canvas
            ref={(el) => {
              refs.current[i] = el;
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* ExperienceCard                                                   */
/* ─────────────────────────────────────────────────────────────── */
function ExperienceCard({
  exp,
  onOpen,
}: {
  exp: Experience;
  onOpen: (id: string) => void;
}) {
  const domainName = domains.find((d) => d.id === exp.domain)?.name ?? exp.domain;

  return (
    <div
      className="lp-card lp-experience-card"
      data-domain={exp.domain}
      style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
        <span
          className="lp-chip lp-domain-chip"
          style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 10px" }}
        >
          {domainName}
        </span>
        <h3 className="lp-h3" style={{ margin: 0, lineHeight: 1.25 }}>{exp.title}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
          {exp.recognizedBy.map((issuer) => (
            <span
              key={issuer}
              style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", padding: "4px 10px", background: "var(--lp-bg-secondary)", color: "var(--lp-text-secondary)", borderRadius: "20px", border: "1px solid var(--lp-border-light)", display: "inline-block" }}
            >
              {issuer}
            </span>
          ))}
        </div>
      </div>

      <div style={{ margin: "4px 0", background: "var(--lp-bg-primary)", borderRadius: "var(--lp-radius-sm)", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CredentialStack exp={exp} onOpen={() => onOpen(exp.id)} />
      </div>

      {exp.description && (
        <p className="lp-body" style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--lp-text-secondary)", margin: 0 }}>
          {exp.description}
        </p>
      )}

      <div className="lp-tags" style={{ justifyContent: "flex-start", gap: "6px", marginTop: "2px" }}>
        {exp.skills.map((skill) => (
          <span
            key={skill}
            className="lp-chip"
            style={{ fontSize: "0.72rem", padding: "4px 10px", background: "transparent", border: "1px solid var(--lp-border-light)" }}
          >
            {skill}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "16px", borderTop: "1px solid var(--lp-border-hairline)" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--lp-text-secondary)" }}>
          <strong style={{ color: "var(--lp-text-primary)", fontSize: "0.9rem" }}>{exp.credentialCount}</strong>{" "}
          Verified Credential{exp.credentialCount > 1 ? "s" : ""}
        </span>
        <button className="lp-btn" onClick={() => onOpen(exp.id)}>Explore</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* ExperienceModal                                                  */
/* ─────────────────────────────────────────────────────────────── */
function ExperienceModal({
  exp,
  onClose,
}: {
  exp: Experience | null;
  onClose: () => void;
}) {
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCertRef = useRef<HTMLCanvasElement | null>(null);
  const thumbRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const viewerImgRef = useRef<HTMLDivElement>(null);
  const viewerCanvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Render active cert
  useEffect(() => {
    if (!exp || !activeCertRef.current) return;
    const url = exp.credentials[activeIdx]?.pdf;
    if (!url) return;
    setActivePdfUrl(url);
    const ctx = activeCertRef.current.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, activeCertRef.current.width, activeCertRef.current.height);
    renderPdfToCanvas(url, activeCertRef.current, 1.5);
  }, [exp, activeIdx]);

  // Render thumbnails
  useEffect(() => {
    if (!exp) return;
    exp.credentials.forEach((cred, i) => {
      const canvas = thumbRefs.current[i];
      if (canvas && cred.pdf) renderPdfToCanvas(cred.pdf, canvas, 0.5);
    });
  }, [exp]);

  // Render viewer
  useEffect(() => {
    if (!viewerOpen || !activePdfUrl || !viewerCanvasRef.current) return;
    renderPdfToCanvas(activePdfUrl, viewerCanvasRef.current, 2.0);
  }, [viewerOpen, activePdfUrl]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (viewerOpen) {
        if (e.key === "Escape") setViewerOpen(false);
        if (e.key === "=" || e.key === "+") setScale((s) => Math.min(s + 0.25, 3));
        if (e.key === "-") setScale((s) => Math.max(s - 0.25, 0.5));
      } else if (exp) {
        if (e.key === "Escape") onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [viewerOpen, exp, onClose]);

  const isActive = !!exp;
  const domainName = exp ? (domains.find((d) => d.id === exp.domain)?.name ?? exp.domain) : "";

  if (!exp && !isActive) return null;

  return (
    <>
      {/* Experience Modal */}
      <div
        className={`lp-modal-overlay ${isActive ? "lp-modal-active" : ""}`}
        onClick={(e) => { if ((e.target as HTMLElement).classList.contains("lp-modal-overlay")) onClose(); }}
      >
        <div className="lp-modal-content">
          <button className="lp-modal-close" onClick={onClose} aria-label="Close modal">×</button>

          {/* Gallery */}
          <div className="lp-modal-gallery">
            <div
              className="lp-modal-active-cert"
              onClick={() => setViewerOpen(true)}
              style={{ flex: 1, minHeight: 0 }}
            >
              <canvas
                ref={activeCertRef}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="lp-modal-thumb-strip">
              {exp?.credentials.map((cred, i) => (
                <div
                  key={i}
                  className={`lp-cert-thumb ${i === activeIdx ? "lp-selected" : ""}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <canvas
                    ref={(el) => { thumbRefs.current[i] = el; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lp-modal-details">
            <h3
              className="lp-h3"
              style={{ marginBottom: "0.5rem", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              {exp?.title}
            </h3>
            <p className="lp-caption" style={{ color: "var(--lp-accent)", marginBottom: "1.5rem" }}>
              {domainName}
            </p>

            <p className="lp-body" style={{ fontSize: "1.05rem", marginBottom: "1.5rem", lineHeight: 1.65 }}>
              {exp?.description}
            </p>

            <h4 className="lp-caption" style={{ marginBottom: "0.5rem" }}>Why This Matters</h4>
            <p className="lp-body" style={{ marginBottom: "1.5rem" }}>{exp?.whyItMatters}</p>

            <h4 className="lp-caption" style={{ marginBottom: "0.5rem" }}>Learning Outcome</h4>
            <p className="lp-body" style={{ marginBottom: "2rem" }}>{exp?.learningOutcome}</p>

            <h4 className="lp-caption" style={{ marginBottom: "0.5rem" }}>Skills Acquired</h4>
            <div className="lp-tags" style={{ justifyContent: "flex-start", marginBottom: "1.5rem" }}>
              {exp?.skills.map((s) => (
                <span key={s} className="lp-chip">{s}</span>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "auto", paddingTop: "1.5rem", borderTop: "1px solid var(--lp-border-light)" }}>
              <div>
                <h4 className="lp-caption" style={{ marginBottom: "0.5rem" }}>Recognized By</h4>
                <p className="lp-body">{exp?.recognizedBy.join(" • ")}</p>
              </div>
              <div>
                <h4 className="lp-caption" style={{ marginBottom: "0.5rem" }}>Credentials</h4>
                <p className="lp-body"><strong>{exp?.credentialCount}</strong> verified credentials</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Viewer */}
      <div
        className={`lp-viewer-overlay ${viewerOpen ? "lp-viewer-active" : ""}`}
        onContextMenu={(e) => e.preventDefault()}
      >
        <button className="lp-viewer-close" onClick={() => setViewerOpen(false)} aria-label="Close viewer">×</button>
        <div
          ref={viewerImgRef}
          className="lp-viewer-img-container"
          style={{ transform: `translate(${tx}px, ${ty}px) scale(${scale})` }}
          onMouseDown={(e) => {
            isDragging.current = true;
            dragStart.current = { x: e.clientX - tx, y: e.clientY - ty };
          }}
          onMouseMove={(e) => {
            if (!isDragging.current) return;
            setTx(e.clientX - dragStart.current.x);
            setTy(e.clientY - dragStart.current.y);
          }}
          onMouseUp={() => { isDragging.current = false; }}
          onDragStart={(e) => e.preventDefault()}
        >
          <canvas
            ref={viewerCanvasRef}
            style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain", borderRadius: "var(--lp-radius-sm)", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}
          />
        </div>
        <div className="lp-viewer-controls">
          <button className="lp-viewer-btn" onClick={() => setScale((s) => Math.min(s + 0.25, 3))}>+</button>
          <button className="lp-viewer-btn" onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))}>−</button>
          <button className="lp-viewer-btn" onClick={() => { setScale(1); setTx(0); setTy(0); }}>⟲</button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* Main Page                                                        */
/* ─────────────────────────────────────────────────────────────── */
export default function LearningsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [modalExp, setModalExp] = useState<Experience | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById("lp-scroll-bar");
    const onScroll = () => {
      if (!bar) return;
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      bar.style.width = `${pct * 100}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("lp-visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".lp-reveal, .lp-stagger").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalExp ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalExp]);

  const openModal = useCallback((id: string) => {
    const exp = experiences.find((e) => e.id === id) ?? null;
    setModalExp(exp);
  }, []);

  const closeModal = useCallback(() => setModalExp(null), []);

  const filteredExperiences =
    activeFilter === "all"
      ? experiences
      : experiences.filter((e) => e.domain === activeFilter);

  const featuredExperiences = experiences.filter((e) => e.featured);

  return (
    <MotionProvider>
      {/* PDF.js CDN — loaded as a script so it's not bundled by Turbopack */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          }
        }}
      />

      <Navigation />

      {/* Scroll progress */}
      <div id="lp-scroll-bar" className="lp-scroll-progress" />

      <div className="lp-root" ref={scrollRef}>

        {/* ── HERO ── */}
        <section
          style={{
            minHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "120px",
            paddingBottom: "100px",
            borderBottom: "1px solid var(--lp-border-hairline)",
            background: `
              radial-gradient(ellipse 80% 60% at 60% 0%, rgba(240,78,0,.06) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 10% 80%, rgba(201,151,58,.04) 0%, transparent 55%),
              linear-gradient(180deg, #F6F4EF 0%, #F2F0EA 100%)
            `,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative lines */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", opacity: 0.04 }}>
            <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: "var(--lp-text-primary)" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, background: "var(--lp-text-primary)" }} />
          </div>

          <div className="lp-container" style={{ maxWidth: 1200 }}>
            <div className="lp-hero-two-col">
              {/* Left */}
              <div>
                <div className="lp-animate-fade-in" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
                  <div style={{ width: 28, height: 1.5, background: "var(--lp-accent)" }} />
                  <p className="lp-caption" style={{ color: "var(--lp-accent)", letterSpacing: "0.14em" }}>Learning Portfolio</p>
                </div>

                <h1
                  className="lp-animate-slide-up lp-delay-100"
                  style={{ marginBottom: "1.5rem", lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.046em", fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)" }}
                >
                  Continuous{" "}
                  <span style={{ fontFamily: "var(--lp-font-serif)", fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em" }}>Learning.</span>
                  <br />Applied{" "}
                  <span style={{ fontFamily: "var(--lp-font-serif)", fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em" }}>Expertise.</span>
                </h1>

                <p className="lp-subtitle lp-animate-slide-up lp-delay-200" style={{ maxWidth: 680, marginBottom: "3rem" }}>
                  A curated record of professional development across Artificial Intelligence,
                  Leadership, Business Strategy, Prompt Engineering, and Emerging Technologies.
                </p>
              </div>

              {/* Right: Robot */}
              <div className="lp-animate-fade-in lp-delay-200" style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative", minHeight: 420 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/learningportfolio/assets/robot.png"
                  alt="AI Robot studying on a laptop"
                  style={{ width: "100%", maxWidth: 480, height: "auto", objectFit: "contain", animation: "lp-float-y 6s ease-in-out infinite", filter: "drop-shadow(0 32px 48px rgba(26,25,23,0.18))", userSelect: "none", pointerEvents: "none" }}
                />
              </div>
            </div>

            {/* Stats row */}
            <div
              className="lp-animate-fade-in lp-delay-300"
              style={{ display: "flex", flexWrap: "wrap", gap: "3rem", paddingTop: "3rem", borderTop: "1px solid var(--lp-border-light)", alignItems: "flex-start", marginTop: "3rem" }}
            >
              {[
                { num: "14+", label: "Learning Experiences" },
                { num: "29+", label: "Professional Credentials" },
                { num: "6+",  label: "Knowledge Domains" },
              ].map((stat) => (
                <div key={stat.label} className="lp-stat-item">
                  <div
                    className="lp-stat-number"
                    style={{ fontSize: "clamp(2.8rem,6vw,4rem)", fontWeight: 800, color: "var(--lp-text-primary)", letterSpacing: "-0.055em", lineHeight: 1 }}
                  >
                    {stat.num.replace("+", "")}<span style={{ color: "var(--lp-accent)" }}>+</span>
                  </div>
                  <div className="lp-caption" style={{ marginTop: "0.75rem", color: "var(--lp-text-tertiary)" }}>{stat.label}</div>
                </div>
              ))}
              <div style={{ marginLeft: "auto" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--lp-text-tertiary)", letterSpacing: "0.02em", lineHeight: 1.6, maxWidth: 200, textAlign: "right" }}>
                  Recognized by<br />
                  <span style={{ color: "var(--lp-text-secondary)", fontWeight: 700 }}>Microsoft · Anthropic<br />LinkedIn · PMI · NASBA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUSTED PROVIDERS ── */}
        <div className="lp-trusted-providers lp-animate-fade-in lp-delay-300">
          <div className="lp-container">
            <div className="lp-providers-track">
              {["Microsoft", "LinkedIn Learning", "Anthropic", "NSDC", "PMI", "NASBA", "SHRM", "HRCI"].map((logo) => (
                <span key={logo} className="lp-provider-logo">{logo}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── KNOWLEDGE DOMAINS ── */}
        <section className="lp-section lp-container lp-reveal">
          <h2 className="lp-h2 has-rule" style={{ textAlign: "center" }}>Knowledge Domains</h2>
          <div className="lp-bento-domains lp-stagger" id="lp-domains-grid">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className="lp-card lp-domain-card"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
              >
                <div
                  className="lp-domain-icon"
                  dangerouslySetInnerHTML={{ __html: DOMAIN_ICONS[domain.id] ?? "" }}
                />
                <h3 className="lp-h3" style={{ marginBottom: "0.5rem" }}>{domain.name}</h3>
                <p className="lp-caption" style={{ marginBottom: "1rem" }}>
                  {domain.count} Experience{domain.count !== 1 ? "s" : ""}
                </p>
                <p className="lp-body" style={{ fontSize: "0.9rem" }}>{domain.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── KEY COMPETENCIES ── */}
        <section className="lp-section lp-container lp-reveal lp-bg-white" style={{ paddingBottom: "6rem" }}>
          <h2 className="lp-h2 has-rule" style={{ textAlign: "center" }}>Key Competencies</h2>
          <div className="lp-tags">
            {competencies.map((c) => (
              <span key={c} className="lp-chip">{c}</span>
            ))}
          </div>
        </section>

        {/* ── INTERSTITIAL QUOTE ── */}
        <section className="lp-interstitial lp-reveal">
          <div className="lp-ambient-orb" style={{ opacity: 0.12, filter: "blur(120px)" }} />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", opacity: 0.04 }}>
            <div style={{ position: "absolute", top: 0, left: "25%", width: 1, height: "100%", background: "#fff" }} />
            <div style={{ position: "absolute", top: 0, right: "25%", width: 1, height: "100%", background: "#fff" }} />
          </div>
          <div className="lp-container" style={{ maxWidth: 820, textAlign: "center", position: "relative", zIndex: 2 }}>
            <p className="lp-caption" style={{ color: "var(--lp-accent)", marginBottom: "2rem", letterSpacing: "0.18em" }}>
              A Personal Philosophy
            </p>
            <blockquote>
              &ldquo;The frontier of technology is not defined by the tools we use, but by the intent with which we apply them.&rdquo;
            </blockquote>
            <div style={{ width: 48, height: 2, background: "var(--lp-accent)", margin: "0 auto", borderRadius: 2 }} />
          </div>
        </section>

        {/* ── FEATURED EXPERIENCES ── */}
        <section className="lp-section lp-bg-light lp-reveal">
          <div className="lp-container">
            <h2 className="lp-h2 has-rule" style={{ textAlign: "center" }}>Featured Experiences</h2>
            <div className="lp-featured-grid lp-stagger">
              {featuredExperiences.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} onOpen={openModal} />
              ))}
            </div>
          </div>
        </section>

        {/* ── LEARNING PORTFOLIO ── */}
        <section className="lp-section lp-bg-white lp-reveal">
          <div className="lp-container">
            <h2 className="lp-h2 has-rule" style={{ textAlign: "center" }}>Learning Portfolio</h2>

            {/* Filters */}
            <div className="lp-tags" style={{ marginBottom: "2rem" }}>
              <button
                className={`lp-chip ${activeFilter === "all" ? "lp-active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                All
              </button>
              {domains.map((d) => (
                <button
                  key={d.id}
                  className={`lp-chip ${activeFilter === d.id ? "lp-active" : ""}`}
                  onClick={() => setActiveFilter(d.id)}
                >
                  {d.name}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="lp-portfolio-grid lp-stagger lp-visible">
              {filteredExperiences.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} onOpen={openModal} />
              ))}
            </div>
          </div>
        </section>

        {/* ── LEARNING PHILOSOPHY ── */}
        <section
          className="lp-section lp-reveal"
          style={{
            background: "linear-gradient(160deg, var(--lp-bg-secondary) 0%, var(--lp-bg-primary) 100%)",
            borderTop: "1px solid var(--lp-border-hairline)",
            borderBottom: "1px solid var(--lp-border-hairline)",
          }}
        >
          <div className="lp-container">
            <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
              <h2 className="lp-h2 has-rule">Why Continuous Learning Matters</h2>
              <p className="lp-body" style={{ fontSize: "1.18rem", lineHeight: 1.75, marginTop: "1.5rem" }}>
                Beyond formal education, I actively pursue structured learning experiences to stay current with
                emerging technologies, artificial intelligence, leadership practices, business strategy, and
                innovation. Continuous learning helps me translate new ideas into practical capabilities and
                better decision-making.
              </p>
            </div>

            <div className="lp-philosophy-pillars lp-stagger">
              {[
                { num: "01", title: "Stay Technically Fluent", body: "Understanding the mechanics of AI — not just the hype — allows me to make grounded decisions about what tools to adopt, and when." },
                { num: "02", title: "Lead With Context", body: "Structured credentials give me frameworks to communicate confidently with both technical teams and senior stakeholders across domains." },
                { num: "03", title: "Apply, Don't Accumulate", body: "Every learning experience I pursue ties back to a real application: a workflow improved, a decision sharpened, or a team better equipped." },
              ].map((p) => (
                <div key={p.num} className="lp-pillar-card">
                  <div className="lp-pillar-number">{p.num}</div>
                  <div className="lp-pillar-title">{p.title}</div>
                  <div className="lp-pillar-body">{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>{/* /lp-root */}

      {/* Modal lives outside lp-root so it can cover the full viewport */}
      <ExperienceModal exp={modalExp} onClose={closeModal} />

      <Contact />
      <Footer />
    </MotionProvider>
  );
}
