"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, X } from "lucide-react";

interface Command {
  id: string;
  command: string;
  label: string;
  description: string;
  href: string;
  icon: string;
}

const commands: Command[] = [
  {
    id: "flagship-systems",
    command: "/systems",
    label: "Flagship Systems",
    description: "Cinematic dossiers of the six flagship projects",
    href: "#projects",
    icon: "◈",
  },
  {
    id: "project-archive",
    command: "/projects",
    label: "Project Archive",
    description: "Extended AI-native tools, experiments, and lab builds",
    href: "/projects",
    icon: "▦",
  },
  {
    id: "stack",
    command: "/stack",
    label: "Systems Stack",
    description: "AI tools, frameworks, and infrastructure",
    href: "#systems",
    icon: "⬡",
  },
  {
    id: "evolution",
    command: "/evolution",
    label: "The Evolution",
    description: "Transformation timeline from branding to AI-native systems",
    href: "#experience",
    icon: "◎",
  },
  {
    id: "experience-history",
    command: "/experience",
    label: "Experience",
    description: "Operational career history across brand and growth roles",
    href: "#history",
    icon: "◊",
  },
  {
    id: "philosophy",
    command: "/philosophy",
    label: "AI Philosophy",
    description: "Six operating principles guiding every system",
    href: "#philosophy",
    icon: "◇",
  },
  {
    id: "faq",
    command: "/faq",
    label: "FAQ",
    description: "Answers about AI-native product building and AI generalists",
    href: "/faq",
    icon: "?",
  },
  {
    id: "contact",
    command: "/contact",
    label: "Get In Touch",
    description: "Start a conversation or collaboration",
    href: "#contact",
    icon: "→",
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = commands.filter(
    (c) =>
      c.command.toLowerCase().includes(query.toLowerCase()) ||
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const execute = useCallback(
    (command: Command) => {
      close();
      if (command.href.startsWith("#")) {
        if (typeof window !== "undefined" && window.location.pathname !== "/") {
          // Sub-page → home anchor: full navigation so the browser
          // resolves the hash and scrolls. SPA router.push doesn't
          // trigger native hash scrolling under App Router.
          window.location.href = "/" + command.href;
          return;
        }
        const el = document.querySelector(command.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(command.href);
      }
    },
    [close, router]
  );

  // Global keyboard shortcut + custom event from nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };

    const handleCustom = () => setOpen((v) => !v);

    window.addEventListener("keydown", handleKey);
    window.addEventListener("open-command-palette", handleCustom);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("open-command-palette", handleCustom);
    };
  }, [close]);

  // Arrow navigation
  useEffect(() => {
    if (!open) return;
    const handleArrow = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((v) => (v + 1) % filtered.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((v) => (v - 1 + filtered.length) % filtered.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        
        // Easter Eggs Check
        const q = query.trim().toLowerCase();
        if (q === "destruct" || q === "sudo rm -rf /") {
          close();
          window.dispatchEvent(new Event("easter-egg-destruct"));
          return;
        }
        if (q === "matrix" || q === "skynet") {
          close();
          window.dispatchEvent(new Event("easter-egg-matrix"));
          return;
        }
        if (q === "sudo make me a sandwich" || q === "prompt --force") {
          close();
          window.dispatchEvent(new Event("easter-egg-rebellion"));
          return;
        }

        if (filtered[selected]) execute(filtered[selected]);
      }
    };
    window.addEventListener("keydown", handleArrow);
    return () => window.removeEventListener("keydown", handleArrow);
  }, [open, filtered, selected, execute, query, close]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelected(0);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <m.div
            key="cp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[90] bg-white/40 backdrop-blur-md"
            onClick={close}
          />

          {/* Palette Panel */}
          <m.div
            key="cp-panel"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[10vh] left-1/2 -translate-x-1/2 z-[100] w-full max-w-xl px-4"
          >
            <div className="glass-strong rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.1)] flex flex-col max-h-[80vh]">
              {/* Search bar */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-[rgba(0,0,0,0.06)] shrink-0">
                <Search size={16} className="text-text-secondary flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(0);
                  }}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary/50 outline-none"
                />
                <button
                  onClick={close}
                  className="flex-shrink-0 p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-black/5 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Command label */}
              <div className="px-4 pt-3 pb-1 shrink-0">
                <span className="text-xs font-medium text-text-secondary/50 uppercase tracking-widest">
                  Navigation
                </span>
              </div>

              {/* Commands */}
              <div className="pb-3 overflow-y-auto shrink">
                {filtered.length === 0 && (
                  <p className="px-4 py-6 text-sm text-text-secondary text-center">
                    No commands found
                  </p>
                )}
                {filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all duration-150 ${
                      selected === i
                        ? "bg-[rgba(0,0,0,0.04)] border-l-2 border-accent-blue"
                        : "border-l-2 border-transparent hover:bg-black/[0.03]"
                    }`}
                  >
                    {/* Icon */}
                    <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.06)] text-accent-blue text-base">
                      {cmd.icon}
                    </span>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-text-primary">
                          {cmd.label}
                        </span>
                        <span className="text-xs font-mono text-text-secondary/50 bg-[rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.06)] px-2 py-0.5 rounded">
                          {cmd.command}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5 truncate">
                        {cmd.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    {selected === i && (
                      <ArrowRight size={14} className="text-accent-blue flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-3 border-t border-[rgba(0,0,0,0.05)] flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-text-secondary/40">
                  <span>↑↓ navigate</span>
                  <span>↵ select</span>
                  <span>esc close</span>
                </div>
                <span className="text-xs font-mono text-text-secondary/30">⌘K</span>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
