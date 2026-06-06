"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Evolution", href: "#experience" },
  { label: "Stack", href: "#systems" },
  { label: "Systems", href: "#projects" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Experience", href: "#history" },
  { label: "Projects", href: "/projects" },
  { label: "Learnings", href: "/learnings" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        // Coming from a sub-page (/about, /projects, /faq, etc.): force a
        // real navigation so the browser resolves the hash and scrolls.
        // router.push("/#section") doesn't trigger native hash scroll
        // under App Router SPA navigation.
        window.location.href = "/" + href;
        return;
      }
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Cross-route link (e.g. /projects)
      router.push(href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // On any sub-page, let the browser follow href="/" naturally.
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      {/* ── Floating Dark Pill ── */}
      <m.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto w-full max-w-[60rem] transition-all duration-500 rounded-[2rem] bg-[#0A0A0C]/45 backdrop-blur-2xl backdrop-saturate-[180%] border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),inset_0_-1px_1px_0_rgba(255,255,255,0.04),0_8px_32px_-4px_rgba(0,0,0,0.55)] ${
          scrolled ? "py-1.5 px-3" : "py-2 px-4"
        }`}
      >
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <m.a
            href="/"
            onClick={handleLogoClick}
            aria-label="Suman Debnath — home"
            className="flex items-center gap-3 group px-2"
            whileHover={{ scale: 1.02 }}
          >
            {/* Branding Logo */}
            <div className="relative h-8 w-28 md:w-36 flex items-center justify-start mix-blend-screen">
              <img 
                src="/branding/logo_navbar_v2.png" 
                alt="Suman Debnath Logo" 
                className="h-full w-full object-contain object-left"
              />
            </div>
          </m.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, i) => (
              <m.button
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-[13px] font-medium text-[#a0a0a5] hover:text-[#f5f5f7] transition-colors duration-200 rounded-full hover:bg-white/[0.06]"
              >
                {link.label}
              </m.button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cmd+K button styled like a sleek badge */}
            <m.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-command-palette"))
              }
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] text-[#86868b] hover:text-[#f5f5f7] hover:border-white/[0.15] bg-white/[0.02] transition-all duration-200 text-xs font-mono"
            >
              <span>⌘K</span>
            </m.button>
            <a
              href="/#contact"
              onClick={(e) => {
                if (
                  typeof window !== "undefined" &&
                  window.location.pathname === "/"
                ) {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
                // On sub-pages, allow the default navigation so the
                // browser resolves /#contact and scrolls to it on home.
              }}
              className="px-4 py-1.5 rounded-full bg-[#f5f5f7] text-black text-[13px] font-medium hover:bg-white transition-colors"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-full text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/5 transition-all mr-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </m.header>

      {/* Mobile Menu (Also dark mode locked) */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 z-40 rounded-[2rem] bg-[#0A0A0C]/95 backdrop-blur-2xl border border-white/[0.08] p-4 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-5 py-3.5 text-[15px] font-medium text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.04] rounded-2xl transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
              <div className="h-[1px] w-full bg-white/[0.06] my-2" />
              <button
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }}
                className="text-left flex items-center justify-between px-5 py-3.5 text-[15px] font-medium text-[#f5f5f7] hover:bg-white/[0.04] rounded-2xl transition-all duration-200"
              >
                Search Command
                <span className="text-[11px] font-mono text-[#86868b] px-2 py-1 rounded bg-white/[0.05] border border-white/[0.05]">⌘K</span>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
