"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useDeferredReveal } from "@/lib/useDeferredReveal";

export default function ResumeMascot() {
  // Use standard x, y transforms for reliable movement
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [isCaught, setIsCaught] = useState(false);
  const [isJolting, setIsJolting] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reveal only after the page has settled (or the user scrolls a bit)
  const revealed = useDeferredReveal();

  // Detect touch (coarse pointer) and small (mobile) viewports
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    const mq = window.matchMedia("(max-width: 480px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const resetToHome = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setHoverCount(0);
  }, []);

  const phrases = [
    "I have Suman's resume! Come get it.",
    "Whoops! Suman told me to play hard to get.",
    "Missed me! Are you using a trackpad?",
    "Okay, I'm tired. You can have the PDF now."
  ];

  // Listen for resume requests from the chat widget
  useEffect(() => {
    const handleResumeRequest = () => {
      setIsJolting(true);
      setTimeout(() => setIsJolting(false), 700);
    };
    window.addEventListener('resumeRequest', handleResumeRequest);
    return () => window.removeEventListener('resumeRequest', handleResumeRequest);
  }, []);

  const handleHover = () => {
    if (isCaught) return;

    // Restart the 10-second idle-return timer on every dodge
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(resetToHome, 10_000);

    if (hoverCount < 3) {
      // Viewport-aware bounds so the robot never leaves the screen
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const robotW = isMobile ? 60 : 90;
      const robotH = isMobile ? 67 : 100;
      const homeRight = isMobile ? 16 : 24; // matches the corner offset below
      const homeBottom = isMobile ? 16 : 24;
      const margin = 8;
      const minX = margin - (vw - homeRight - robotW); // leftmost translate
      const maxX = homeRight - margin;                  // rightmost translate
      const minY = margin - (vh - homeBottom - robotH); // highest translate
      const maxY = homeBottom - margin;

      // Smaller hops on mobile; original magnitudes on desktop
      const magnitudeX = isMobile ? Math.random() * 60 + 70 : Math.random() * 100 + 150;
      const magnitudeY = isMobile ? Math.random() * 12 + 8 : Math.random() * 20 + 10;

      // Ping-pong horizontally; reverse before reaching the left bound
      const reverseAt = isMobile ? minX + magnitudeX : -300;
      const jumpX = position.x <= reverseAt ? magnitudeX : -magnitudeX;
      const jumpY = position.y < -100 ? magnitudeY : -magnitudeY;

      const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
      setPosition({
        x: clamp(position.x + jumpX, minX, maxX),
        y: clamp(position.y + jumpY, minY, maxY),
      });
      setHoverCount((prev) => prev + 1);
    } else if (hoverCount === 3) {
      // Exhaustion
      setPosition({ 
        x: position.x - 20, 
        y: position.y - 10 
      });
      setHoverCount((prev) => prev + 1);
    }
  };

  const handleTap = () => {
    // On touch devices, taps drive the dodge (no hover); download only once "tired".
    if (isTouch && !isCaught && hoverCount < 4) {
      handleHover();
    } else {
      handleClick();
    }
  };

  const handleClick = () => {
    // Cancel any pending reset — they caught it!
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setIsCaught(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/Suman_Debnath_Resume.pdf";
      link.download = "Suman_Debnath_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        setIsCaught(false);
        setHoverCount(0);
        setPosition({ x: 0, y: 0 });
      }, 3000);
    }, 600);
  };

  if (!revealed) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <div
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-auto"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <m.div
          animate={
            isJolting
              ? { x: [0, -18, 18, -12, 12, -6, 6, 0], y: [0, -22, 0, -10, 0], rotate: [0, -8, 8, -5, 5, 0] }
              : { x: 0, y: 0, rotate: 0 }
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isCaught ? 0 : 1, y: isCaught ? 10 : 0 }}
          className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white border border-[#E0CC70]/50 shadow-lg rounded-2xl px-4 py-2 pointer-events-none z-10"
        >
          <div className="relative">
            <p className="font-manrope text-xs text-[#0A0A0A] font-medium whitespace-nowrap">
              {phrases[Math.min(hoverCount, phrases.length - 1)]}
            </p>
            {/* Speech bubble pointer */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-[#E0CC70]/50 transform rotate-45" />
          </div>
        </m.div>

        <m.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -2, 2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <m.div
            whileHover={{ scale: hoverCount >= 4 ? 1.05 : 1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => { if (!isTouch) handleHover(); }}
            onClick={handleTap}
            className={`cursor-pointer drop-shadow-xl ${isCaught ? "animate-pulse" : ""}`}
            style={{ width: isMobile ? 60 : 90, height: isMobile ? 67 : 100 }}
          >
            {/* Claude-style Robot SVG */}
            <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              
              {/* Antenna */}
              <m.line 
                x1="50" y1="20" x2="50" y2="5" 
                stroke="#D4B830" strokeWidth="3" strokeLinecap="round" 
                animate={{ rotate: hoverCount > 0 ? [-5, 5, -5] : 0, originY: "20px", originX: "50px" }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
              <circle cx="50" cy="5" r="4" fill="#F04E00" />

              {/* Main Body (Soft Beige) */}
              <rect x="15" y="20" width="70" height="65" rx="20" fill="#F5F0E8" stroke="#D6CCBC" strokeWidth="2" />
              
              {/* Screen / Face (Dark Ink) */}
              <rect x="25" y="32" width="50" height="30" rx="8" fill="#1A1917" />
              
              {/* Eyes */}
              {isCaught ? (
                // Happy / Caught eyes
                <g>
                  <path d="M 35 45 Q 40 40 45 45" stroke="#F04E00" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M 55 45 Q 60 40 65 45" stroke="#F04E00" strokeWidth="3" strokeLinecap="round" fill="none" />
                </g>
              ) : hoverCount > 0 && hoverCount < 4 ? (
                // Surprised / Escaping eyes ("O" shaped mouth, not a smile!)
                <g>
                  <circle cx="40" cy="45" r="4" fill="#F04E00" />
                  <circle cx="60" cy="45" r="4" fill="#F04E00" />
                  <circle cx="50" cy="54" r="3" fill="#F04E00" />
                </g>
              ) : (
                // Default blinking eyes
                <m.g
                  animate={{ scaleY: [1, 0.1, 1], transition: { repeat: Infinity, duration: 4, times: [0, 0.05, 0.1] } }}
                  style={{ originY: "45px" }}
                >
                  <rect x="36" y="42" width="6" height="8" rx="3" fill="#D4B830" />
                  <rect x="58" y="42" width="6" height="8" rx="3" fill="#D4B830" />
                </m.g>
              )}

              {/* Little Hands */}
              <m.g
                animate={isCaught ? { y: -10 } : { y: 0 }}
                transition={{ type: "spring" }}
              >
                <rect x="20" y="80" width="10" height="25" rx="5" fill="#D6CCBC" />
                <rect x="70" y="80" width="10" height="25" rx="5" fill="#D6CCBC" />
              </m.g>

              {/* The Resume (Paper Document) */}
              <m.g
                initial={{ rotate: -10, y: 0 }}
                animate={isCaught ? { y: -30, scale: 1.2, rotate: 0 } : { rotate: -10, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <rect x="35" y="70" width="30" height="40" rx="3" fill="#FFFFFF" stroke="#D6CCBC" strokeWidth="1" />
                <line x1="40" y1="78" x2="60" y2="78" stroke="#D6CCBC" strokeWidth="2" strokeLinecap="round" />
                <line x1="40" y1="86" x2="55" y2="86" stroke="#D6CCBC" strokeWidth="2" strokeLinecap="round" />
                <line x1="40" y1="94" x2="60" y2="94" stroke="#D6CCBC" strokeWidth="2" strokeLinecap="round" />
                <rect x="42" y="75" width="4" height="4" fill="#F04E00" />
              </m.g>

            </svg>
          </m.div>
        </m.div>
        </m.div>
      </div>
    </div>
  );
}
