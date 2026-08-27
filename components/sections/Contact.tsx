"use client";

import Image from "next/image";
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
  bluesky:
    "M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026",
  mastodon:
    "M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z",
};

function SocialIcon({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d={SOCIAL_PATHS[id]} />
    </svg>
  );
}

/* The footer sitemap — four columns of four, rendered above the white strip.
 *
 * Hand-written rather than derived from lib/pages.ts, and that is the point:
 * lib/pages.ts holds every public page, and a footer listing every page is the
 * wall of links this replaced. These sixteen are the ones worth a permanent
 * slot on every page of the site. Everything else is one click away through the
 * nav, the command palette, or a page's own Related block.
 *
 * If you add a product page, it does NOT automatically belong here. Ask whether
 * it earns a permanent place ahead of something already listed. */
const FOOTER_GROUPS: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Work",
    links: [
      { label: "All Projects", href: "/projects" },
      { label: "MIGI Agent Fleet", href: "/agents/migi" },
      { label: "PentaCMD-47M", href: "/slms/pentacmd" },
      { label: "Banking Co-pilot", href: "/banking/rm-copilot" },
    ],
  },
  {
    title: "Writing",
    links: [
      { label: "Notebook", href: "/notebook" },
      { label: "Learnings", href: "/learnings" },
      { label: "Philosophy", href: "/philosophy" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Profile", href: "/profile" },
      { label: "The Story", href: "/about" },
      { label: "The Journey", href: "/journey" },
      { label: "Résumé", href: "/resume" },
      // Five, not four. /contact was missing from the footer entirely, which
      // for a portfolio whose whole purpose is being hired is the one link that
      // cannot be absent. The nav's "Let's Talk" button covers it visually, but
      // a button is not what a crawler weights, and a reader who has scrolled
      // to the bottom of a page has scrolled past the nav.
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: "https://github.com/Sumandebnath943", external: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/suman-debnath-a528653a1", external: true },
      { label: "Hugging Face", href: "https://huggingface.co/SumanDebnath943", external: true },
      // Not decoration: an anchor is how most crawlers find this file at all.
      { label: "llms.txt", href: "/llms.txt" },
    ],
  },
];

const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/Sumandebnath943" },
  { id: "huggingface", label: "Hugging Face", href: "https://huggingface.co/SumanDebnath943" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/suman-debnath-a528653a1" },
  { id: "x", label: "X", href: "https://x.com/iamSdebnath" },
  { id: "bluesky", label: "Bluesky", href: "https://bsky.app/profile/sumandebnath.bsky.social" },
  { id: "mastodon", label: "Mastodon", href: "https://mastodon.social/@sumandebnath" },
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

        {/* No numbered kicker here, deliberately. This section is the closing
            CTA on EVERY page, not the eighth section of the homepage — "08"
            was only ever true on `/`. Numbered kickers belong to the homepage's
            own long-form sections, which is where SectionKicker is used. */}

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
                  // A CSS mask takes a URL, so next/image cannot reach it —
                  // this stayed a raw 107 KB fetch after the other three logos
                  // were optimised. A mask reads only the alpha channel, and
                  // `contain` paints it at 440x220 here, so 880w covers retina
                  // at less than half the bytes. Kept as PNG on purpose: if a
                  // mask image fails to load the element paints SOLID, and a
                  // green block across the footer is a bad way to save 14 KB.
                  WebkitMaskImage: "url(/branding/logo_v2_mask.png)",
                  maskImage: "url(/branding/logo_v2_mask.png)",
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
              {/* width/height rather than `fill`: this wrapper is only
                  positioned from md up (`md:absolute`), so `fill` would break
                  the mobile layout. The intrinsic ratio is 2:1 and CSS still
                  drives the painted size. */}
              <Image
                src="/branding/logo_v2.png"
                alt="Suman Debnath Signature"
                width={1774}
                height={887}
                sizes="(min-width: 768px) 580px, 100vw"
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
          className={`font-manrope text-sm leading-relaxed max-w-md mb-10 ${light ? "text-[#0B3B25]/80" : "text-[#F5F5F3]/55"}`}
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
                ? "border-[#2E8B57]/25 bg-[#2E8B57]/[0.05] text-[#0B3B25]/80 hover:text-[#0B3B25] hover:border-[#2E8B57]/45 hover:bg-[#2E8B57]/[0.1]"
                : "border-[#F5F5F3]/[0.12] bg-[#F5F5F3]/[0.04] text-[#F5F5F3]/55 hover:text-[#F5F5F3]/85 hover:border-[#F5F5F3]/[0.22] hover:bg-[#F5F5F3]/[0.07]"
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
                ? "border-[#2E8B57]/25 bg-[#2E8B57]/[0.05] text-[#0B3B25]/80 hover:text-[#0B3B25] hover:border-[#2E8B57]/45 hover:bg-[#2E8B57]/[0.1]"
                : "border-[#F5F5F3]/[0.12] bg-[#F5F5F3]/[0.04] text-[#F5F5F3]/55 hover:text-[#F5F5F3]/85 hover:border-[#F5F5F3]/[0.22] hover:bg-[#F5F5F3]/[0.07]"
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
                className={`inline-flex items-center gap-2 px-4 py-3.5 md:py-2 touch-manipulation rounded-full border transition-all duration-400 font-manrope text-[11px] ${
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
          <p className={`font-serif italic font-normal text-xl md:text-2xl leading-relaxed ${light ? "text-[#1f7a4d]/95" : "text-[#F5F5F3]/45"}`}>
            &ldquo;Human instinct.{" "}
            <span className={light ? "text-[#1f7a4d]/95" : "text-[#F5F5F3]/[0.28]"}>AI amplification.</span>
            <br />
            <span className={light ? "text-[#1f7a4d]/95" : "text-[#F5F5F3]/20"}>Systemic execution.&rdquo;</span>
          </p>
        </m.div>
      </div>

      {/* ── FOOTER SITEMAP ──────────────────────────────────────────────────
          Four short columns, sitting on the closing panel's own background so
          they read as the last of the dark half rather than the first of the
          white strip.

          This is the site's only full link map, and it belongs here. The utility
          row below is capped at three links by a hard layout constraint (see its
          comment — a fourth reintroduces a wrap on phones), so the map cannot go
          there; and a separate footer block below this section is worse still,
          because this section *is* the footer.

          Kept deliberately short — four columns of four. The point is a crawlable
          path from any page to the main ones, not an index of the site. */}
      <nav
        aria-label="Footer sitemap"
        className={`sd-mascot-clear relative z-10 max-w-5xl mx-auto px-6 pb-12 pt-2 ${
          light ? "text-[#0B3B25]" : "text-[#F5F5F3]"
        }`}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              {/* 0.55, not 0.4 — the same finding resume.css records for its
                  cream-on-void text: below ~0.5 this palette drops under 4.5:1,
                  and these are 10px uppercase labels, which is the worst case
                  for it rather than an exception to it. */}
              <h3
                className={`mb-3 font-manrope text-[10px] font-semibold uppercase tracking-[0.18em] ${
                  light ? "text-[#1f7a4d]/90" : "text-[#F5F5F3]/55"
                }`}
              >
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      {...(l.external
                        ? { target: "_blank", rel: "me noopener noreferrer" }
                        : {})}
                      className={`font-manrope text-[13px] transition-colors ${
                        light
                          ? "text-[#0B3B25]/75 hover:text-[#0B3B25]"
                          : "text-[#F5F5F3]/55 hover:text-[#F5F5F3]"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* ── FOOTER STRIP ── */}
      <div className={`relative z-10 border-t ${light ? "bg-white border-[#2E8B57]/[0.18]" : "bg-white border-[#E8E8E8]"}`}>
        {/* `sd-mascot-clear` pulls the right edge in from under the corner
            robot on narrow desktops — see the rule in globals.css. */}
        <div className="sd-mascot-clear max-w-5xl mx-auto px-6 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Left */}
          <div className="flex items-baseline gap-2">
            <p className={`font-manrope font-semibold text-sm ${light ? "text-[#0B3B25]" : "text-[#1A1A1A]"}`}>
              Suman Debnath
            </p>
            <span className={`text-xs px-1 ${light ? "text-[#1f7a4d]" : "text-[#1A1A1A]/60"}`}>·</span>
            <p className={`font-manrope text-xs font-medium ${light ? "text-[#1f7a4d]/95" : "text-[#1A1A1A]/70"}`}>
              Brand Marketing Leader & AI Product Builder
            </p>
          </div>

          {/* Center — utility links */}
          <nav
            aria-label="Footer utility"
            // Deliberately short: FAQ, Privacy, Terms. Projects, About and Fun
            // Apps were dropped — all three are reachable from the main nav and
            // from the command palette, and the shorter row is what keeps this
            // strip on one line on a phone. Adding a fourth link brings back the
            // wrap that Terms first caused, so weigh that before growing it.
            // Text-height links are a poor thumb target, so the anchors get
            // real vertical padding on phones and revert to inline text at md.
            className={`flex flex-wrap items-center gap-x-4 gap-y-2 font-manrope text-xs font-medium [&_a]:py-3.5 [&_a]:touch-manipulation md:[&_a]:py-0 ${light ? "text-[#1f7a4d]/95" : "text-[#1A1A1A]/60"}`}
          >
            <a href="/faq" className={`transition-colors ${light ? "hover:text-[#0B3B25]" : "hover:text-[#1A1A1A]"}`}>
              FAQ
            </a>
            <span className={light ? "text-[#1f7a4d]" : "text-[#1A1A1A]/60"}>·</span>
            <a href="/privacy" className={`transition-colors ${light ? "hover:text-[#0B3B25]" : "hover:text-[#1A1A1A]"}`}>
              Privacy
            </a>
            <span className={light ? "text-[#1f7a4d]" : "text-[#1A1A1A]/60"}>·</span>
            <a href="/terms" className={`transition-colors ${light ? "hover:text-[#0B3B25]" : "hover:text-[#1A1A1A]"}`}>
              Terms
            </a>
          </nav>

          {/* Right — stays a bare year on purpose. "All rights reserved" was
              tried here and pushed the utility row past max-w-5xl at every
              desktop width; it lives in the disclosure block below instead,
              where a full-width line can carry it legibly. */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <button
              onClick={() => window.dispatchEvent(new Event("easter-egg-destruct"))}
              className={`px-2 py-1 rounded text-[9px] font-bold tracking-widest uppercase transition-colors ${
                light
                  ? "bg-[#2E8B57]/[0.12] text-[#1f7a4d] hover:bg-[#2E8B57] hover:text-white"
                  : "bg-red-500/10 text-red-700 hover:bg-red-500 hover:text-white"
              }`}
              // Must start with the visible text, or speech-input users say
              // "Do Not Click" and nothing happens. The joke survives.
              aria-label="Do Not Click — system self-destruct"
            >
              Do Not Click
            </button>
            <p className={`font-manrope text-xs font-semibold ${light ? "text-[#1f7a4d]/95" : "text-[#1A1A1A]/60"}`}>
              © {new Date().getFullYear()}
            </p>
          </div>

        </div>

        {/* Visit-data disclosure. Must stay factually in step with /privacy —
            this site records IP addresses and runs third-party analytics, so it
            cannot be described as anonymous. */}
        <div className="sd-mascot-clear max-w-5xl mx-auto px-6 pb-6 -mt-1">
          <p className={`font-manrope text-[10px] leading-relaxed ${light ? "text-[#1f7a4d]/95" : "text-[#1A1A1A]/60"}`}>
            This site records visit data — pages viewed, time and scroll depth, device, your IP address and
            the approximate location and network provider derived from it — and sends it to me privately. It
            also runs Google Analytics and Vercel Analytics.{" "}
            <a
              href="/privacy"
              className={`underline underline-offset-2 transition-colors ${light ? "decoration-[#1f7a4d]/30 hover:text-[#0B3B25]" : "decoration-[#1A1A1A]/30 hover:text-[#1A1A1A]"}`}
            >
              Full detail and how to opt out
            </a>
            .
          </p>
          {/* Rights reservation. Sits here rather than in the row above because
              this line has the full container width to itself. */}
          <p className={`font-manrope text-[10px] leading-relaxed mt-1.5 ${light ? "text-[#1f7a4d]/95" : "text-[#1A1A1A]/60"}`}>
            This site, its code and its content are © {new Date().getFullYear()} Suman Debnath. All rights
            reserved — none of it is open source, and copying it needs permission first.{" "}
            <a
              href="/terms"
              className={`underline underline-offset-2 transition-colors ${light ? "decoration-[#1f7a4d]/30 hover:text-[#0B3B25]" : "decoration-[#1A1A1A]/30 hover:text-[#1A1A1A]"}`}
            >
              Terms of use
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
