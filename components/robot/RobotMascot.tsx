"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDeferredReveal } from "@/lib/useDeferredReveal";
import { useRobotChat } from "./RobotChatContext";
import type { ClipName } from "./RobotModel";

// WebGL canvas is client-only; keep it out of SSR and the initial bundle.
const RobotCanvas = dynamic(() => import("./RobotCanvas"), { ssr: false });

const ROBOT_W = 200;
const ROBOT_H = 290;
const CORNER_RIGHT = -14; // negative pushes the robot toward the right edge
const CORNER_BOTTOM = 0;
const HOME_RIGHT = CORNER_RIGHT; // used for travel bounds
const MARGIN = 8;
const MAX_HOPS = 4; // jump+run this many times; the next approach = give up
const RESET_MS = 10_000;
const MOUSE_IDLE_MS = 20_000; // no mouse movement → robot "looks" for the visitor

// Brief, funny messages shown over the robot's head after each escape.
const ESCAPE_MESSAGES = [
  "Haha, missed me!",
  "Oops! Too slow 🐢",
  "Nope, not today!",
  "Catch me if you can!",
  "Whoosh! 💨",
  "Almost had me!",
  "Hehe — over here!",
  "Nice try!",
  "Gotta be quicker!",
  "Missed again! 😜",
  "Wheee!",
  "Not so fast!",
];

// Idle ambient rotation when the robot is resting in the corner.
const AMBIENT_SEQ: [ClipName, number][] = [
  ["Idle", 15_000],
  ["HappyIdle", 4_500],
  ["Idle", 15_000],
  ["SadIdle", 4_500],
];

// Run feel.
const JUMP_MS = 300; // time spent in the up-hop before the run starts
const RUN_PX_PER_MS = 0.62; // higher = faster run travel
const RUN_MIN = 420;
const RUN_MAX = 1100;
const RUN_TIMESCALE = 1.3; // play the Running clip a touch faster
const JUMP_TIMESCALE = 1.2;

// Facing while running (radians). The robot must face the way it travels.
const FACE_LEFT = -Math.PI / 2;
const FACE_RIGHT = Math.PI / 2;

const RESUME_HREF = "/Suman_Debnath_Resume.pdf";

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export default function RobotMascot() {
  const revealed = useDeferredReveal();
  const { open: chatOpen } = useRobotChat();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const robotW = isMobile ? 132 : ROBOT_W;
  const robotH = isMobile ? 190 : ROBOT_H;

  const [anim, setAnim] = useState<ClipName>("Waving");
  const [rotationY, setRotationY] = useState(0);
  const [x, setXState] = useState(0); // horizontal travel from home (px, <=0 moves left)
  const [hopY, setHopY] = useState(0); // vertical hop (px, negative = up)
  const [travelTransition, setTravelTransition] = useState("none");
  const [hops, setHops] = useState(0);
  const [givenUp, setGivenUp] = useState(false);
  const [resting, setResting] = useState(false); // idle in corner → run ambient loop
  const [escapeMsg, setEscapeMsg] = useState<string | null>(null);

  const busyRef = useRef(false);
  const lastMouseMove = useRef(Date.now());
  const escapeMsgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const xRef = useRef(0); // current x, read inside timer callbacks to avoid stale closures
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setX = useCallback((v: number) => { xRef.current = v; setXState(v); }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => () => {
    clearTimers();
    if (resetTimer.current) clearTimeout(resetTimer.current);
    if (escapeMsgTimer.current) clearTimeout(escapeMsgTimer.current);
  }, [clearTimers]);

  // Track mouse activity so the robot can "look" for an idle visitor.
  useEffect(() => {
    const onMove = () => { lastMouseMove.current = Date.now(); };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // After the first-load wave, drop into the resting ambient loop.
  useEffect(() => {
    if (!revealed) return;
    const t = setTimeout(() => { if (!busyRef.current) setResting(true); }, 3200);
    return () => clearTimeout(t);
  }, [revealed]);

  // Ambient idle loop: Idle → HappyIdle → Idle → SadIdle, an occasional wave,
  // and "Looking" when the visitor's mouse has been still for a while.
  useEffect(() => {
    if (!resting || givenUp) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (Date.now() - lastMouseMove.current > MOUSE_IDLE_MS) {
        setAnim("Looking");
        timer = setTimeout(tick, 6500);
        return;
      }
      let clip: ClipName; let dur: number;
      if (Math.random() < 0.12) { clip = "Waving"; dur = 3200; } // not too frequent
      else { [clip, dur] = AMBIENT_SEQ[i % AMBIENT_SEQ.length]; i += 1; }
      setAnim(clip);
      timer = setTimeout(tick, dur);
    };
    tick();
    return () => clearTimeout(timer);
  }, [resting, givenUp]);

  // Smooth the close handoff: reset to home whenever chat opens (so the corner
  // robot reappears clean at its spot), and fade it back in to mask the canvas
  // re-init when the takeover unmounts.
  const [appear, setAppear] = useState(true);
  useEffect(() => {
    if (chatOpen) { setAppear(false); return; }
    const id = requestAnimationFrame(() => setAppear(true));
    return () => cancelAnimationFrame(id);
  }, [chatOpen]);

  useEffect(() => {
    if (!chatOpen) return;
    clearTimers();
    if (resetTimer.current) clearTimeout(resetTimer.current);
    if (escapeMsgTimer.current) clearTimeout(escapeMsgTimer.current);
    busyRef.current = false;
    setX(0); setHopY(0); setRotationY(0); setHops(0);
    setGivenUp(false); setEscapeMsg(null);
    setTravelTransition("none");
    setAnim("Idle"); setResting(true);
  }, [chatOpen, clearTimers, setX]);

  const showEscapeMessage = useCallback(() => {
    if (escapeMsgTimer.current) clearTimeout(escapeMsgTimer.current);
    setEscapeMsg(ESCAPE_MESSAGES[Math.floor(Math.random() * ESCAPE_MESSAGES.length)]);
    escapeMsgTimer.current = setTimeout(() => setEscapeMsg(null), 2000);
  }, []);

  const bounds = useCallback(() => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    return { minX: -(vw - HOME_RIGHT - robotW - MARGIN), maxX: 0 };
  }, [robotW]);

  // Run from the current x to a target x, then settle into Idle.
  const runTo = useCallback((targetX: number, onArrive?: () => void) => {
    const fromX = xRef.current;
    const distance = Math.abs(targetX - fromX);
    const runMs = clamp(distance / RUN_PX_PER_MS, RUN_MIN, RUN_MAX);
    setRotationY(targetX < fromX ? FACE_LEFT : FACE_RIGHT);
    setAnim("Running");
    setTravelTransition(`transform ${runMs}ms linear`);
    setX(targetX);
    after(runMs, () => {
      setRotationY(0);
      setAnim("Idle");
      busyRef.current = false;
      onArrive?.();
    });
  }, [after, setX]);

  // Returns to the corner by RUNNING back (not sliding).
  const returnHome = useCallback(() => {
    clearTimers();
    setGivenUp(false);
    if (xRef.current === 0) { setAnim("Idle"); setHops(0); busyRef.current = false; setResting(true); return; }
    busyRef.current = true;
    setResting(false);
    setHopY(0);
    runTo(0, () => { setHops(0); setResting(true); });
  }, [clearTimers, runTo]);

  const scheduleReset = useCallback(() => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(returnHome, RESET_MS);
  }, [returnHome]);

  const giveUp = useCallback(() => {
    busyRef.current = true;
    clearTimers();
    setResting(false);
    setRotationY(0);
    setHopY(0);
    setAnim("SadIdle");
    setGivenUp(true);
    scheduleReset();
  }, [clearTimers, scheduleReset]);

  const runSequence = useCallback(() => {
    busyRef.current = true;
    setResting(false);
    setEscapeMsg(null);
    if (resetTimer.current) clearTimeout(resetTimer.current);

    // 1) Jump in place.
    setTravelTransition("none");
    setAnim("Jumping");
    setHopY(-70); // up

    after(JUMP_MS, () => {
      // 2) Land and run horizontally to a new spot.
      setHopY(0); // come down
      const { minX, maxX } = bounds();
      const magnitude = Math.random() * 150 + 200; // 200–350px
      let targetX = xRef.current - magnitude; // prefer moving left
      if (targetX < minX) targetX = xRef.current + magnitude; // bounce off the left edge
      targetX = clamp(targetX, minX, maxX);
      runTo(targetX, () => { setHops((h) => h + 1); scheduleReset(); showEscapeMessage(); setResting(true); });
    });
  }, [after, bounds, runTo, scheduleReset, showEscapeMessage]);

  const handleApproach = useCallback(() => {
    if (busyRef.current || givenUp) return;
    if (hops >= MAX_HOPS) { giveUp(); return; }
    runSequence();
  }, [givenUp, hops, giveUp, runSequence]);

  const downloadResume = useCallback(() => {
    const a = document.createElement("a");
    a.href = RESUME_HREF;
    a.download = "Suman_Debnath_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  const handleClick = useCallback(() => {
    if (givenUp) { downloadResume(); return; }
    handleApproach(); // also lets touch users trigger the chase
  }, [givenUp, downloadResume, handleApproach]);

  // The chat takeover shows its own (big) robot, so hide the corner one.
  if (!revealed || chatOpen) return null;

  const timeScale = anim === "Running" ? RUN_TIMESCALE : anim === "Jumping" ? JUMP_TIMESCALE : 1;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ opacity: appear ? 1 : 0, transition: "opacity 0.35s ease" }}
    >
      <div
        className="absolute pointer-events-auto"
        style={{ right: CORNER_RIGHT, bottom: CORNER_BOTTOM, transform: `translateX(${x}px)`, transition: travelTransition }}
      >
        <div style={{ transform: `translateY(${hopY}px)`, transition: "transform 0.26s ease-out" }}>
          {escapeMsg && !givenUp && (
            <div className="absolute left-1/2 -translate-x-1/2 top-[40%] -translate-y-full bg-[#1D1D1F] text-white rounded-2xl shadow-lg px-3.5 py-1.5 whitespace-nowrap">
              <p className="text-[12.5px] font-semibold">{escapeMsg}</p>
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2.5 h-2.5 bg-[#1D1D1F] rotate-45" />
            </div>
          )}
          {givenUp && (
            <div className="absolute left-1/2 -translate-x-1/2 top-[40%] -translate-y-full w-56 bg-white rounded-2xl shadow-xl border border-black/10 px-4 py-3 text-center">
              <p className="text-[13px] leading-snug text-[#1D1D1F] font-medium">
                Ok, you win. Here&apos;s the resume of Suman Debnath.
              </p>
              <button
                onClick={downloadResume}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#F04E00] hover:bg-[#d84600] text-white text-xs font-semibold px-3.5 py-1.5 transition-colors"
              >
                Download résumé
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white border-b border-r border-black/10 rotate-45" />
            </div>
          )}
          <div
            onMouseEnter={handleApproach}
            onClick={handleClick}
            className="cursor-pointer"
            style={{ width: robotW, height: robotH }}
            aria-label="Suman's robot assistant"
          >
            <RobotCanvas
              animation={anim}
              rotationY={rotationY}
              timeScale={timeScale}
              rimLight
              cameraPosition={[0, 0.7, 6.4]}
              cameraFov={30}
              groupY={-1.55}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
