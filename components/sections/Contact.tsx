"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";

// Official brand marks (simple-icons paths), so the footer shows real logos.
const SOCIAL_PATHS: Record<string, string> = {
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  huggingface:
    "M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003",
  x:
    "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
};

function SocialIcon({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d={SOCIAL_PATHS[id]} />
    </svg>
  );
}

const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/Sumandebnath943" },
  { id: "huggingface", label: "Hugging Face", href: "https://huggingface.co/SumanDebnath943" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/suman-debnath-a528653a1" },
  { id: "x", label: "X", href: "https://x.com/iamSdebnath" },
];

export default function Contact({
  closingBg = "linear-gradient(180deg, #1C120C 0%, #24110A 12%, #140B08 55%, #050505 100%)",
  glowColor = "rgba(160,70,15,0.22)",
  hazeColor = "rgba(180,80,20,0.1)",
  variant = "dark",
}: {
  /** Section gradient — override per-page (e.g. emerald) so the closing matches the page. */
  closingBg?: string;
  /** Central atmospheric glow colour (rgba). */
  glowColor?: string;
  /** Left haze colour (rgba). */
  hazeColor?: string;
  /** "light" = white footer with green fonts & accents (same layout/content). */
  variant?: "dark" | "light";
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const light = variant === "light";

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: light ? "#ffffff" : closingBg }}
    >
      {/* ── ATMOSPHERIC DEPTH ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central glow core — restrained breathing */}
        <m.div
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
          style={{
            background: `radial-gradient(ellipse at top, ${light ? "rgba(46,139,87,0.10)" : glowColor} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
        {/* Left haze */}
        <div
          className="absolute top-[20%] left-[-10%] w-[45%] h-[400px]"
          style={{
            background: `radial-gradient(ellipse at left, ${light ? "rgba(46,139,87,0.07)" : hazeColor} 0%, transparent 70%)`,
            filter: "blur(70px)",
          }}
        />
        {/* Floor blend */}
        <div className={`absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t to-transparent ${light ? "from-white" : "from-[#050505]"}`} />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-0">

        {/* Section label */}
        <m.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`font-manrope text-[10px] uppercase tracking-[0.4em] mb-3 ${light ? "text-[#2E8B57]/80" : "text-[#F5F5F3]/20"}`}
        >
          08 / Contact
        </m.p>

        {/* Headline — reduced 20–25% from original */}
        <div className="relative mb-8">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:max-w-[55%]"
          >
            <h2 className={`font-manrope font-semibold text-4xl md:text-5xl leading-tight tracking-tight ${light ? "text-[#0B3B25]" : "text-[#F5F5F3]"}`}>
              Let&apos;s Build
              <br />
              <span className={light ? "text-[#1f7a4d]" : "text-[#F5F5F3]/70"}>What Comes Next.</span>
            </h2>
          </m.div>

          {/* Big signature logo on the right (absolute on desktop so it doesn't push layout vertically) */}
          {light ? (
            <div className="md:absolute right-0 bottom-[-60px] mt-6 md:mt-0 w-full md:w-[580px] h-40 md:h-[220px] opacity-90 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div
                className="h-full w-full"
                style={{
                  background: "#1f7a4d",
                  WebkitMaskImage: "url(/branding/logo_v2.png)",
                  maskImage: "url(/branding/logo_v2.png)",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "right center",
                  maskPosition: "right center",
                }}
              />
            </div>
          ) : (
            <div className="md:absolute right-0 bottom-[-60px] mt-6 md:mt-0 w-full md:w-[580px] h-40 md:h-[220px] flex items-center justify-start md:justify-end mix-blend-screen opacity-85 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <img
                src="/branding/logo_v2.png"
                alt="Suman Debnath Signature"
                className="h-full w-full object-contain object-left md:object-right"
              />
            </div>
          )}
        </div>

        {/* Subtext */}
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className={`font-manrope text-sm leading-relaxed max-w-md mb-10 ${light ? "text-[#0B3B25]/65" : "text-[#F5F5F3]/55"}`}
        >
          Open to meaningful collaborations, AI-native systems,
          product strategy, and future-focused conversations.
        </m.p>

        {/* Email CTA + Socials — same row on desktop */}
        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-4 mb-16"
        >
          {/* Phone pill */}
          <a
            href="tel:+917980296957"
            className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 font-manrope text-xs tracking-wide ${
              light
                ? "border-[#2E8B57]/25 bg-[#2E8B57]/[0.05] text-[#0B3B25]/65 hover:text-[#0B3B25] hover:border-[#2E8B57]/45 hover:bg-[#2E8B57]/[0.1]"
                : "border-[#F5F5F3]/12 bg-[#F5F5F3]/[0.04] text-[#F5F5F3]/55 hover:text-[#F5F5F3]/85 hover:border-[#F5F5F3]/22 hover:bg-[#F5F5F3]/[0.07]"
            }`}
          >
            <span className={`w-1 h-1 rounded-full transition-colors duration-500 ${light ? "bg-[#2E8B57]/50 group-hover:bg-[#2E8B57]" : "bg-[#F5F5F3]/30 group-hover:bg-[#F5F5F3]/60"}`} />
            +91 7980296957
          </a>

          {/* Email pill */}
          <a
            href="mailto:sumandebnath944@gmail.com"
            className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 font-manrope text-xs tracking-wide ${
              light
                ? "border-[#2E8B57]/25 bg-[#2E8B57]/[0.05] text-[#0B3B25]/65 hover:text-[#0B3B25] hover:border-[#2E8B57]/45 hover:bg-[#2E8B57]/[0.1]"
                : "border-[#F5F5F3]/12 bg-[#F5F5F3]/[0.04] text-[#F5F5F3]/55 hover:text-[#F5F5F3]/85 hover:border-[#F5F5F3]/22 hover:bg-[#F5F5F3]/[0.07]"
            }`}
          >
            <span className={`w-1 h-1 rounded-full transition-colors duration-500 ${light ? "bg-[#2E8B57]/50 group-hover:bg-[#2E8B57]" : "bg-[#F5F5F3]/30 group-hover:bg-[#F5F5F3]/60"}`} />
            sumandebnath944@gmail.com
            <span className="text-[10px] opacity-35 group-hover:opacity-60 transition-opacity">↗</span>
          </a>

          {/* Divider */}
          <div className={`hidden sm:block w-px h-5 ${light ? "bg-[#2E8B57]/[0.18]" : "bg-[#F5F5F3]/[0.08]"}`} />

          {/* Social pills */}
          <div className="flex items-center flex-wrap gap-2">
            {socials.map(({ id, label, href }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={label}
                title={label}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-400 font-manrope text-[11px] ${
                  light
                    ? "border-[#2E8B57]/30 bg-[#2E8B57]/[0.06] text-[#0B3B25]/70 hover:border-[#2E8B57]/50 hover:bg-[#2E8B57]/[0.12] hover:text-[#0B3B25]"
                    : "border-[#F5F5F3]/20 bg-[#F5F5F3]/[0.06] text-[#F5F5F3]/60 hover:border-[#F5F5F3]/35 hover:bg-[#F5F5F3]/[0.1] hover:text-[#F5F5F3]/90"
                }`}
              >
                <SocialIcon id={id} />
                {label}
              </a>
            ))}
          </div>
        </m.div>

        {/* Manifesto — top border separator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className={`border-t pt-12 pb-12 ${light ? "border-[#2E8B57]/[0.16]" : "border-[#F5F5F3]/[0.05]"}`}
        >
          <p className={`font-serif italic font-normal text-xl md:text-2xl leading-relaxed ${light ? "text-[#1f7a4d]/80" : "text-[#F5F5F3]/45"}`}>
            &ldquo;Human instinct.{" "}
            <span className={light ? "text-[#1f7a4d]/55" : "text-[#F5F5F3]/28"}>AI amplification.</span>
            <br />
            <span className={light ? "text-[#1f7a4d]/40" : "text-[#F5F5F3]/20"}>Systemic execution.&rdquo;</span>
          </p>
        </m.div>
      </div>

      {/* ── FOOTER STRIP ── */}
      <div className={`relative z-10 border-t ${light ? "bg-white border-[#2E8B57]/[0.18]" : "bg-white border-[#E8E8E8]"}`}>
        <div className="max-w-5xl mx-auto px-6 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Left */}
          <div className="flex items-baseline gap-2">
            <p className={`font-manrope font-semibold text-sm ${light ? "text-[#0B3B25]" : "text-[#1A1A1A]"}`}>
              Suman Debnath
            </p>
            <span className={`text-xs px-1 ${light ? "text-[#2E8B57]/50" : "text-[#1A1A1A]/40"}`}>·</span>
            <p className={`font-manrope text-xs font-medium ${light ? "text-[#1f7a4d]/80" : "text-[#1A1A1A]/70"}`}>
              Brand Marketing Leader & AI Product Builder
            </p>
          </div>

          {/* Center — utility links */}
          <nav
            aria-label="Footer utility"
            className={`flex items-center gap-4 font-manrope text-xs font-medium ${light ? "text-[#1f7a4d]/75" : "text-[#1A1A1A]/60"}`}
          >
            <a href="/projects" className={`transition-colors ${light ? "hover:text-[#0B3B25]" : "hover:text-[#1A1A1A]"}`}>
              Projects
            </a>
            <span className={light ? "text-[#2E8B57]/35" : "text-[#1A1A1A]/30"}>·</span>
            <a href="/faq" className={`transition-colors ${light ? "hover:text-[#0B3B25]" : "hover:text-[#1A1A1A]"}`}>
              FAQ
            </a>
            <span className={light ? "text-[#2E8B57]/35" : "text-[#1A1A1A]/30"}>·</span>
            <a href="/about" className={`transition-colors ${light ? "hover:text-[#0B3B25]" : "hover:text-[#1A1A1A]"}`}>
              About
            </a>
            <span className={light ? "text-[#2E8B57]/35" : "text-[#1A1A1A]/30"}>·</span>
            <a href="/fun-apps" className={`transition-colors ${light ? "hover:text-[#0B3B25]" : "hover:text-[#1A1A1A]"}`}>
              Fun Apps
            </a>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new Event("easter-egg-destruct"))}
              className={`px-2 py-1 rounded text-[9px] font-bold tracking-widest uppercase transition-colors ${
                light
                  ? "bg-[#2E8B57]/12 text-[#1f7a4d] hover:bg-[#2E8B57] hover:text-white"
                  : "bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white"
              }`}
              aria-label="System Self-Destruct"
            >
              Do Not Click
            </button>
            <p className={`font-manrope text-xs font-semibold ${light ? "text-[#1f7a4d]/70" : "text-[#1A1A1A]/60"}`}>
              © {new Date().getFullYear()}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
