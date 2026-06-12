"use client";

import { useEffect, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Sparkles, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export default function SiteTour() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleStartTour = () => {
      startTour();
    };
    window.addEventListener("start-tour", handleStartTour);
    return () => window.removeEventListener("start-tour", handleStartTour);
  }, []);

  const startTour = () => {
    setShowPrompt(false);
    localStorage.setItem("hasSeenTour", "true");

    const driverObj = driver({
      showProgress: true,
      animate: true,
      overlayColor: "rgba(10, 10, 12, 0.85)",
      popoverClass: "driverjs-theme",
      steps: [
        {
          element: "#tour-nav",
          popover: {
            title: "Command Center",
            description: "Press Cmd+K anywhere to quickly navigate the ecosystem. This serves as your central command.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#tour-nav-projects",
          popover: {
            title: "All Projects Archive",
            description: "This menu holds the complete systems archive. Clicking on any project there will reveal the deep technical learnings from that build.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#hero",
          popover: {
            title: "The Objective",
            description: "I build intelligent systems and premium AI-native products.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#experience-narrative",
          popover: {
            title: "The Evolution",
            description: "My continuous journey from a traditional Marketer to an AI Systems Builder and Technical Strategist.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#now",
          popover: {
            title: "Active Intelligence",
            description: "A look at the AI-native systems and tools I am currently building in stealth.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#systems",
          popover: {
            title: "Systems Stack",
            description: "The core technologies, frameworks, and LLMs I utilize to build production-grade applications.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#projects",
          popover: {
            title: "Flagship Architecture",
            description: "Explore deep-dive dossiers on production-ready AI applications I've built from the ground up.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#philosophy",
          popover: {
            title: "AI Philosophy",
            description: "My mental models, engineering thesis, and approach to building in the age of generative AI.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#history",
          popover: {
            title: "Operational History",
            description: "My traditional corporate experience, leadership roles, and academic foundations.",
            side: "top",
            align: "center",
          },
        },
      ],
    });
    
    // We wrap it in setTimeout to ensure scrolling works flawlessly.
    setTimeout(() => {
      driverObj.drive();
    }, 100);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .driverjs-theme {
          background-color: #0A0A0C !important;
          color: #F5F0E6 !important;
          border: 1px solid rgba(255, 128, 0, 0.3) !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 40px -10px rgba(255, 128, 0, 0.2) !important;
          font-family: inherit !important;
          z-index: 999999 !important;
        }
        .driver-overlay {
          z-index: 999998 !important;
        }
        .driver-active {
          z-index: 999999 !important;
        }
        .driver-popover-title {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
          color: #FF8000 !important;
          font-size: 14px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          margin-bottom: 8px !important;
        }
        .driver-popover-description {
          font-family: inherit !important;
          color: rgba(245, 240, 230, 0.7) !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
        }
        .driver-popover-footer button {
          background-color: rgba(255, 255, 255, 0.05) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          text-shadow: none !important;
          border-radius: 6px !important;
          padding: 6px 12px !important;
          font-size: 12px !important;
        }
        .driver-popover-footer button:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .driver-popover-progress-text {
          color: rgba(245, 240, 230, 0.4) !important;
        }
      `}} />

      {/* Sticky Right-Edge Button */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-[99990]">
        <button
          onClick={() => setShowPrompt((p) => !p)}
          className="flex flex-col items-center justify-center bg-[#0A0A0C]/90 backdrop-blur-md border border-[#FF8000]/30 border-r-0 rounded-l-lg p-2 py-3 text-[#FF8000] hover:bg-[#FF8000]/10 transition-colors shadow-[-4px_0_15px_-4px_rgba(255,128,0,0.2)]"
        >
          <Sparkles size={16} className="mb-2" />
          <span className="[writing-mode:vertical-rl] font-mono text-[10px] uppercase tracking-widest font-semibold">Take a Tour</span>
        </button>
      </div>

      <AnimatePresence>
        {showPrompt && (
          <m.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-1/2 right-12 -translate-y-1/2 z-[99995] flex w-[280px] flex-col gap-3 rounded-2xl rounded-tr-none rounded-br-none border border-[#FF8000]/30 border-r-0 bg-[#0A0A0C]/95 p-5 shadow-[-10px_0_40px_-10px_rgba(255,128,0,0.25)] backdrop-blur-xl"
          >
            <button onClick={dismissPrompt} className="absolute right-4 top-4 text-white/40 hover:text-white">
              <X size={16} />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#FF8000] animate-pulse" />
              <h4 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#FF8000]">Guided Tour</h4>
            </div>
            <p className="text-[13px] leading-relaxed text-white/70 font-manrope pr-4">
              Would you like a quick tour of the major systems and sections?
            </p>
            <div className="flex gap-3 pt-2 flex-col">
              <button
                onClick={startTour}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/30 py-2 text-[12px] font-semibold text-[#FF8000] transition-colors hover:bg-[#FF8000]/20"
              >
                <Sparkles size={14} /> Start Tour
              </button>
              <button
                onClick={dismissPrompt}
                className="w-full rounded-full border border-white/10 bg-white/5 py-2 text-[12px] font-medium text-white/70 transition-colors hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
