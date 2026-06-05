"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

export default function ResumeMascot() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [isCaught, setIsCaught] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Initial delay before peeking
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPeeking(true);
      setShowTooltip(true);
      // Hide tooltip after a few seconds
      setTimeout(() => setShowTooltip(false), 5000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleHover = () => {
    if (isCaught) return;

    // Hard to catch the first 2 times
    if (hoverCount < 2) {
      // Jump far away (between 100px and 300px away, mostly left/up)
      const jumpX = -(Math.random() * 200 + 100); // move left
      const jumpY = -(Math.random() * 200 + 50); // move up
      
      setPosition({ x: position.x + jumpX, y: position.y + jumpY });
      setHoverCount((prev) => prev + 1);
    } else if (hoverCount === 2) {
      // 3rd time is slightly evasive
      setPosition({ x: position.x - 50, y: position.y - 20 });
      setHoverCount((prev) => prev + 1);
    }
    // After 3 times, it surrenders and lets the user click
  };

  const handleClick = () => {
    setIsCaught(true);
    // Give it a tiny moment to show "caught" animation before download
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/Suman_Debnath_Resume.pdf";
      link.download = "Suman_Debnath_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset after a few seconds
      setTimeout(() => {
        setIsCaught(false);
        setHoverCount(0);
        setPosition({ x: 0, y: 0 });
      }, 3000);
    }, 600);
  };

  if (!isPeeking) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <m.div
        animate={position}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        <AnimatePresence>
          {showTooltip && hoverCount === 0 && (
            <m.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute -top-12 -left-16 bg-white border border-[#E0CC70]/50 shadow-lg rounded-2xl px-4 py-2 pointer-events-none"
            >
              <div className="relative">
                <p className="font-manrope text-xs text-[#0A0A0A] font-medium whitespace-nowrap">
                  Catch me for the resume!
                </p>
                {/* Speech bubble pointer */}
                <div className="absolute -bottom-3 right-4 w-2 h-2 bg-white border-b border-r border-[#E0CC70]/50 transform rotate-45" />
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <m.div
          whileHover={{ scale: hoverCount >= 3 ? 1.05 : 1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={handleHover}
          onClick={handleClick}
          className={`cursor-pointer ${isCaught ? "animate-pulse" : ""}`}
          style={{ width: 80, height: 90 }}
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
            
            {/* Eyes (Change based on state) */}
            {isCaught ? (
              // Happy / Caught eyes
              <g>
                <path d="M 35 45 Q 40 40 45 45" stroke="#F04E00" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 55 45 Q 60 40 65 45" stroke="#F04E00" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>
            ) : hoverCount > 0 && hoverCount < 3 ? (
              // Surprised / Escaping eyes
              <g>
                <circle cx="40" cy="45" r="4" fill="#F04E00" />
                <circle cx="60" cy="45" r="4" fill="#F04E00" />
                <path d="M 45 52 Q 50 56 55 52" stroke="#F04E00" strokeWidth="2" fill="none" />
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
    </div>
  );
}
