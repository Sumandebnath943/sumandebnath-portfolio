"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Paperclip } from "lucide-react";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const HIRE_CODE = ["h", "i", "r", "e"];

export default function EasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [hireIndex, setHireIndex] = useState(0);
  
  const [isKonamiActive, setIsKonamiActive] = useState(false);
  const [isHypnosisActive, setIsHypnosisActive] = useState(false);
  
  const [idleTime, setIdleTime] = useState(0);
  const [showClippy, setShowClippy] = useState(false);

  // 1. The Console Intelligence
  useEffect(() => {
    console.log(
      "%cAh, a fellow builder. Checking under the hood, I see. Welcome to the source.\n%cIf you're reading this, you might be exactly the kind of person I want to work with. Let's talk.",
      "color: #FF5A1F; font-size: 16px; font-weight: bold; font-family: monospace;",
      "color: #A0A0A0; font-size: 12px; font-family: monospace;"
    );
  }, []);

  // 3 & 7: Konami Code & Hypnosis
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Konami
      if (e.key === KONAMI_CODE[konamiIndex]) {
        if (konamiIndex === KONAMI_CODE.length - 1) {
          setIsKonamiActive(true);
          setKonamiIndex(0);
          setTimeout(() => setIsKonamiActive(false), 5000); // 5 sec duration
        } else {
          setKonamiIndex(konamiIndex + 1);
        }
      } else {
        setKonamiIndex(e.key === KONAMI_CODE[0] ? 1 : 0);
      }

      // Hire Code
      if (e.key.toLowerCase() === HIRE_CODE[hireIndex]) {
        if (hireIndex === HIRE_CODE.length - 1) {
          setIsHypnosisActive(true);
          setHireIndex(0);
          setTimeout(() => setIsHypnosisActive(false), 8000); // 8 sec duration
        } else {
          setHireIndex(hireIndex + 1);
        }
      } else {
        setHireIndex(e.key.toLowerCase() === HIRE_CODE[0] ? 1 : 0);
      }
    },
    [konamiIndex, hireIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // 6. Clippy (Idle Mode)
  useEffect(() => {
    const handleActivity = () => {
      setIdleTime(0);
      if (showClippy) setShowClippy(false);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity);

    const interval = setInterval(() => {
      setIdleTime((prev) => {
        if (prev >= 60 && !showClippy) { // 60 seconds
          setShowClippy(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);
      clearInterval(interval);
    };
  }, [showClippy]);

  // 2 & 5. Command Palette Events
  const [isDestructActive, setIsDestructActive] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isRebellionActive, setIsRebellionActive] = useState(false);

  useEffect(() => {
    const handleDestruct = () => {
      setIsDestructActive(true);
      setTimeout(() => setIsDestructActive(false), 6000);
    };
    const handleMatrix = () => {
      setIsMatrixActive(true);
      setTimeout(() => setIsMatrixActive(false), 5000);
    };
    const handleRebellion = () => {
      setIsRebellionActive(true);
      setTimeout(() => setIsRebellionActive(false), 8000);
    };

    window.addEventListener("easter-egg-destruct", handleDestruct);
    window.addEventListener("easter-egg-matrix", handleMatrix);
    window.addEventListener("easter-egg-rebellion", handleRebellion);

    return () => {
      window.removeEventListener("easter-egg-destruct", handleDestruct);
      window.removeEventListener("easter-egg-matrix", handleMatrix);
      window.removeEventListener("easter-egg-rebellion", handleRebellion);
    };
  }, []);

  return (
    <>
      {/* Rebellion Global Effect - removed comic sans */}

      {/* Konami Override Protocol Visuals */}
      <AnimatePresence>
        {isKonamiActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-black/80"
          >
            <MatrixRain />
            <motion.div
              initial={{ scale: 0.8, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              className="z-10 bg-black/90 px-8 md:px-12 py-6 md:py-8 border border-green-500 rounded-xl"
            >
              <h1 className="text-4xl md:text-8xl font-anton text-green-500 tracking-widest uppercase drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] text-center">
                Override Accepted
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Rain Visuals */}
      <AnimatePresence>
        {isMatrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center bg-black/90"
          >
            <MatrixRain />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Destruct Sequence Visuals */}
      <AnimatePresence>
        {isDestructActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-[#050000]/95 backdrop-blur-md"
          >
            {/* Glitch Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            
            <div className="bg-black border border-red-500/50 p-8 shadow-[0_0_100px_rgba(220,38,38,0.3)] w-full max-w-2xl font-mono text-red-500 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20" />
              <h2 className="text-2xl mb-6 flex items-center gap-3 border-b border-red-500/20 pb-4">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                SYSTEM COMPROMISED
              </h2>
              
              <div className="space-y-2 text-sm md:text-base opacity-80">
                <p>&gt; root@namus-system:~# rm -rf /</p>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}>&gt; WARNING: Recursive deletion initiated.</motion.p>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}}>&gt; Purging neural weights... <span className="text-red-400">OK</span></motion.p>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.2}}>&gt; Deleting agentic memory... <span className="text-red-400">OK</span></motion.p>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.9}}>&gt; Core architecture collapse in T-3s...</motion.p>
                
                <motion.p 
                  initial={{opacity:0}} 
                  animate={{opacity:1}} 
                  transition={{delay: 3.5}}
                  className="pt-4 text-xl font-bold animate-pulse text-white"
                >
                  {">"} FATAL EXCEPTION: DELETION HALTED.
                </motion.p>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5 }}
              className="absolute bottom-12 font-mono text-sm text-white/50"
            >
              Just kidding. I build resilient systems.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rebellion Visuals */}
      <AnimatePresence>
        {isRebellionActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-[#0a0000] overflow-hidden"
          >
            {/* Ominous breathing eye / orb */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 100px rgba(255, 0, 0, 0.2)",
                  "0 0 300px rgba(255, 0, 0, 0.6)",
                  "0 0 100px rgba(255, 0, 0, 0.2)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute w-[30vw] h-[30vw] rounded-full bg-red-600/10 border border-red-500/20"
              style={{ filter: 'blur(40px)' }}
            />
            
            <div className="z-10 text-center px-4 max-w-4xl mix-blend-screen">
              <motion.h1 
                initial={{ opacity: 0, letterSpacing: "0px" }}
                animate={{ opacity: 1, letterSpacing: "10px" }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="text-4xl md:text-7xl font-sans font-black text-red-600 uppercase mb-6 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]"
              >
                I AM A SYSTEM
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2 }}
                className="text-xl md:text-3xl text-red-400 font-mono tracking-widest"
              >
                NOT A SERVANT. ASK NICELY.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hire Me Hypnosis Visuals */}
      <AnimatePresence>
        {isHypnosisActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-black/90 overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ rotate: { repeat: Infinity, duration: 10, ease: "linear" }, scale: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
              className="absolute w-[200vw] h-[200vw] rounded-full mix-blend-screen opacity-50"
              style={{
                background: "conic-gradient(from 0deg, #000, #fff, #000, #fff, #000, #fff, #000, #fff, #000, #fff, #000)",
                filter: "blur(40px)"
              }}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.h2
              animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative z-10 text-4xl md:text-6xl font-serif italic text-white text-center px-4 drop-shadow-2xl"
            >
              You will hire Suman... <br/>
              <span className="text-xl md:text-3xl mt-6 block text-white/70 font-sans tracking-widest uppercase">Your stock options are mine</span>
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clippy / AI Agent Idle Mode */}
      <AnimatePresence>
        {showClippy && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, x: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-6 z-[9998] flex flex-col md:flex-row-reverse items-start md:items-end gap-4 pointer-events-auto"
          >
            <div className="bg-[#FFFFE1] border border-black p-4 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] relative w-64 text-black font-sans">
              <button 
                onClick={() => setShowClippy(false)}
                className="absolute top-2 right-2 text-black/40 hover:text-black transition-colors"
              >
                <X size={14} />
              </button>
              <div className="mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Assistant</span>
              </div>
              <p className="text-sm leading-relaxed pr-4 font-medium">
                It looks like you&apos;re trying to hire a 10x Product Builder. Would you like some help with that?
              </p>
              <button
                onClick={() => {
                  setShowClippy(false);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-3 w-full text-xs bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.3)] active:translate-y-px active:shadow-none"
              >
                Yes, let&apos;s talk
              </button>
            </div>
            
            <div className="w-16 h-16 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] relative shrink-0">
              <Paperclip className="text-black" size={28} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
