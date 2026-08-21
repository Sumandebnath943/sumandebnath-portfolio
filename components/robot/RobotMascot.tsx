"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import {
  useIntroRuns,
  useReveal,
  MASCOT_INTRO_MS,
  MASCOT_PLAIN_MS,
} from "@/lib/intro";
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

// Shown while the robot is resting in the corner. The mascot is the way to the
// résumé — clicking it downloads the PDF once it gives up — but nothing on
// screen said so, so these do the asking.
const RESUME_PROMPTS = [
  "Hey — here's Suman's résumé.",
  "Looking for Suman's résumé?",
  "I have what you're looking for.",
  "Psst… want the résumé?",
  "Tap me for Suman's résumé.",
  "Résumé? Right here.",
  "One tap and the résumé is yours.",
  "Need the CV? I'm holding it.",
  "Hiring? Start with the résumé.",
  "Suman's résumé, one tap away.",
];

// How long a resting prompt stays up, and the gap before the next one.
const PROMPT_VISIBLE_MS = 4_500;
const PROMPT_GAP_MS = 12_000;
const PROMPT_FIRST_DELAY_MS = 6_000;

// Idle ambient rotation when the robot is resting in the corner.
const AMBIENT_SEQ: [ClipName, number][] = [
  ["Idle", 15_000],
  ["HappyIdle", 4_500],
  ["Idle", 15_000],
  ["SadIdle", 4_500],
];

/**
 * Ambient rotations for pages where the robot has something to do.
 *
 * This is the whole point of giving him more clips: a mascot that idles
 * identically everywhere is decoration, and one that reacts to where you are is
 * a character. Keyed on pathname, and anything not listed falls back to
 * AMBIENT_SEQ.
 *
 * Both of these are still *idles* — they never interrupt the chase, the
 * entrance or the give-up, which own the robot while they are running.
 */
const PAGE_AMBIENT: Record<string, [ClipName, number][]> = {
  // He sits down to read the story with you. SittingIdle is 10.8s, so it gets
  // its full length rather than being cut off mid-settle.
  "/journey": [
    ["SittingIdle", 10_800],
    ["Idle", 6_000],
    ["SittingIdle", 10_800],
    ["HappyIdle", 4_000],
  ],
  // On the résumé he points at it. Twice a cycle rather than once: at 2.5s in a
  // 34s rotation the gesture was there but nobody saw it.
  "/resume": [
    ["Idle", 9_000],
    ["Pointing", 2_500],
    ["HappyIdle", 3_500],
    ["Idle", 9_000],
    ["Pointing", 2_500],
    ["SadIdle", 3_500],
  ],
};

/**
 * How far to lift the robot while he is sitting.
 *
 * 30px is not arbitrary — it is the chat launcher's own bottom offset, measured
 * from the live page (`innerHeight - launcher.bottom`). The mascot's canvas is
 * flush with the bottom of the viewport, which is fine for a standing figure
 * whose lowest point is a pair of feet, but a seated pose puts a wide mass of
 * body right on the edge, where it crowds the OS taskbar. Lining his base up
 * with the chat pill's base puts him back on the same floor as the rest of the
 * page furniture.
 *
 * Applied through the hop transform, which already carries a 0.26s ease, so the
 * lift glides in with the clip instead of snapping.
 */
const SIT_LIFT_PX = 30;

/** One-shot reactions, with how long to hold them before returning to idle. */
const REACTION_MS: Partial<Record<ClipName, number>> = {
  Clapping: 1_400, // 1.33s clip
  Salute: 2_900, // 2.83s clip
};

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

// First-visit entrance: the robot runs in from off the right edge once the
// cinematic loader has finished. The travel itself is a CSS keyframe
// (`sd-robot-enter` in globals.css) on a wrapper of its own — see the effect
// below. Keep this in step with the keyframe's duration.
const ENTRANCE_MS = 900;

const RESUME_HREF = "/Suman_Debnath_Resume.pdf";

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export default function RobotMascot() {
  // With the loader running the mascot waits for it and then runs in from the
  // right; otherwise it arrives shortly after mount. See lib/intro.ts.
  const introRuns = useIntroRuns();
  const revealed = useReveal(MASCOT_INTRO_MS, MASCOT_PLAIN_MS);
  const { open: chatOpen, solo } = useRobotChat();
  const pathname = usePathname();

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

  // The entrance poses the robot from its first rendered frame — mid-stride and
  // facing left — so the CSS keyframe that carries it across has something
  // coherent to move.
  const [anim, setAnim] = useState<ClipName>(() => (introRuns ? "Running" : "Waving"));
  const [rotationY, setRotationY] = useState(() => (introRuns ? FACE_LEFT : 0));
  const [x, setXState] = useState(0); // horizontal travel from home (px, <=0 moves left)
  // Whether the entrance keyframe is still allowed to be on the element.
  //
  // This has to be state, and it has to be turned off. Opening the chat makes
  // this component return `null`, so closing it *re-mounts* the subtree — and a
  // CSS animation restarts on mount. Keyed off `introRuns` alone, the entrance
  // replayed every time the chat closed, for the whole session: the robot slid
  // in from 320px while standing still, because the chat-close reset had
  // already set the clip to "Idle". `enteredRef` guards the effect below; this
  // guards the class.
  const [entering, setEntering] = useState(introRuns);
  const entranceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hopY, setHopY] = useState(0); // vertical hop (px, negative = up)
  const [travelTransition, setTravelTransition] = useState("none");
  const [hops, setHops] = useState(0);
  const [givenUp, setGivenUp] = useState(false);
  const [resting, setResting] = useState(false); // idle in corner → run ambient loop
  const [escapeMsg, setEscapeMsg] = useState<string | null>(null);
  const [promptMsg, setPromptMsg] = useState<string | null>(null);
  // A one-shot gesture that temporarily overrides the ambient idle.
  const [reaction, setReaction] = useState<ClipName | null>(null);
  const reactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const busyRef = useRef(false);
  const lastMouseMove = useRef(Date.now());
  const escapeMsgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const xRef = useRef(0); // current x, read inside timer callbacks to avoid stale closures
  const enteredRef = useRef(false); // the entrance run happens at most once
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

  /**
   * Track visitor activity so the robot can "look" for someone who has gone.
   *
   * **Scroll and touch count, not just mousemove** — and that is a fix, not a
   * nicety. Reading a long page is twenty seconds of scrolling with the mouse
   * perfectly still, so the old listener declared an actively-reading visitor
   * absent, switched to `Looking`, and stayed there: the tick re-checks the same
   * condition every 6.5s and keeps returning early. That is why `Pointing` never
   * appeared on `/resume` — the page you are most likely to read without moving
   * the mouse is exactly where the page-specific idle could never run.
   */
  useEffect(() => {
    const seen = () => { lastMouseMove.current = Date.now(); };
    window.addEventListener("mousemove", seen, { passive: true });
    window.addEventListener("scroll", seen, { passive: true });
    window.addEventListener("touchstart", seen, { passive: true });
    window.addEventListener("keydown", seen, { passive: true });
    return () => {
      window.removeEventListener("mousemove", seen);
      window.removeEventListener("scroll", seen);
      window.removeEventListener("touchstart", seen);
      window.removeEventListener("keydown", seen);
    };
  }, []);

  // Tear the entrance down on unmount only — see the effect below for why this
  // is deliberately not that effect's own cleanup.
  useEffect(() => () => {
    if (entranceTimer.current) clearTimeout(entranceTimer.current);
  }, []);

  /**
   * First-visit entrance: run in from the right edge, then hand over to the
   * ordinary state machine.
   *
   * The travel is a **CSS keyframe**, not a transition on `x`. The transition
   * version set the transition and the target in the same React commit, so the
   * browser could see both in one style recalculation and had nothing to
   * animate from — the robot snapped home while the Running clip played on the
   * spot. It was intermittent because it depended on commit timing. A keyframe
   * cannot race: it starts when the element mounts and runs to completion.
   *
   * `x` therefore stays 0 throughout and the ordinary chase logic — which caps
   * travel at x <= 0 via `bounds()` — is untouched by the entrance.
   *
   * NOTE: this effect returns no cleanup, and that is the point. It first did,
   * and a re-run cancelled the arrival timer of an entrance already in flight —
   * which left `busyRef` true forever, so the robot reached its corner and then
   * ignored every hover and tap, its whole chase dead. `enteredRef` already
   * makes this run once; unmount teardown is handled above.
   */
  useEffect(() => {
    if (!revealed || !introRuns || enteredRef.current) return;
    enteredRef.current = true;
    busyRef.current = true; // a ref, so hover/tap is blocked without a render

    entranceTimer.current = setTimeout(() => {
      setRotationY(0);
      setAnim("Idle");
      busyRef.current = false; // must always run, or the chase is dead
      setResting(true);
      // Retire the keyframe now it has finished. Safe at exactly this moment:
      // the animation ends at translateX(0), which is where the element already
      // sits, so dropping the class changes nothing on screen — and it stops
      // the entrance replaying on every later re-mount.
      setEntering(false);
    }, ENTRANCE_MS);
  }, [revealed, introRuns]);

  // After the first-load wave, drop into the resting ambient loop.
  useEffect(() => {
    if (!revealed) return;
    const t = setTimeout(() => { if (!busyRef.current) setResting(true); }, 3200);
    return () => clearTimeout(t);
  }, [revealed]);

  // Ambient idle loop: Idle → HappyIdle → Idle → SadIdle, an occasional wave,
  // and "Looking" when the visitor's mouse has been still for a while. On some
  // routes the rotation is different — see PAGE_AMBIENT.
  useEffect(() => {
    if (!resting || givenUp) return;
    // Paused while a one-shot reaction owns the robot, or the two would fight
    // over setAnim and the reaction would be cut off mid-gesture.
    if (reaction) return;
    const seq = PAGE_AMBIENT[pathname ?? ""] ?? AMBIENT_SEQ;
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
      else { [clip, dur] = seq[i % seq.length]; i += 1; }
      setAnim(clip);
      timer = setTimeout(tick, dur);
    };
    tick();
    return () => clearTimeout(timer);
  }, [resting, givenUp, pathname, reaction]);

  /**
   * One-shot reactions — Clapping when the contact form actually sends, Salute
   * when the visitor reaches the closing strip.
   *
   * Fired as window events so the trigger can live wherever the thing happens
   * (ContactForm is nowhere near this component), matching how the easter eggs
   * are already wired. Never interrupts a chase: `busyRef` is true while the
   * robot is jumping or running, and a gesture that cancels the one interaction
   * a visitor deliberately started is worse than no gesture.
   */
  useEffect(() => {
    const play = (clip: ClipName) => {
      if (busyRef.current || givenUp) return;
      setReaction(clip);
      if (reactionTimer.current) clearTimeout(reactionTimer.current);
      reactionTimer.current = setTimeout(() => setReaction(null), REACTION_MS[clip] ?? 2_000);
    };
    const celebrate = () => play("Clapping");
    const farewell = () => play("Salute");
    window.addEventListener("robot-celebrate", celebrate);
    window.addEventListener("robot-farewell", farewell);
    return () => {
      window.removeEventListener("robot-celebrate", celebrate);
      window.removeEventListener("robot-farewell", farewell);
    };
  }, [givenUp]);

  /**
   * Salute when the closing strip comes into view — once per page.
   *
   * IntersectionObserver rather than exit intent, which was considered and
   * dropped: `mouseout` with `relatedTarget === null` is desktop-only, does not
   * exist on touch at all, false-fires on a reach for the bookmarks bar, and
   * reads like a marketing exit popup. "You got to the bottom" is a real signal
   * on every device.
   *
   * `#contact` is the anchor because `Footer` renders null — the Contact
   * section owns the closing strip. Pages without one simply never salute.
   */
  useEffect(() => {
    if (!revealed) return;
    const el = document.querySelector("#contact");
    if (!el) return;
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (fired || !entries.some((e) => e.isIntersecting)) return;
        fired = true;
        io.disconnect();
        window.dispatchEvent(new Event("robot-farewell"));
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [revealed, pathname]);

  // Résumé call-outs while the robot is parked in the corner. Suppressed once
  // it has given up (that state shows its own résumé card), while it is
  // running, and whenever the chat takeover owns the screen.
  useEffect(() => {
    if (!revealed || !resting || givenUp || chatOpen) return;
    let timer: ReturnType<typeof setTimeout>;
    let idx = Math.floor(Math.random() * RESUME_PROMPTS.length);
    const hide = () => {
      setPromptMsg(null);
      timer = setTimeout(show, PROMPT_GAP_MS);
    };
    const show = () => {
      // Never talk over an escape quip.
      if (busyRef.current) { timer = setTimeout(show, PROMPT_GAP_MS); return; }
      // On a phone the hero's closing headline sits in the same band as the
      // bubble: "Intelligence" runs x24-236 / y624-692 while the mascot's box
      // starts at y622, so an attached bubble overlaps it by ~100x54px. No
      // amount of nudging clears that — the headline is 68px tall and the box
      // begins at its top edge. Wider screens have the room, so the prompt is
      // simply held back on narrow ones until the visitor is past the hero.
      // Escape quips still fire there: those are a reply to a deliberate tap.
      if (window.innerWidth < 768 && window.scrollY < window.innerHeight * 0.6) {
        timer = setTimeout(show, PROMPT_GAP_MS);
        return;
      }
      setPromptMsg(RESUME_PROMPTS[idx % RESUME_PROMPTS.length]);
      idx += 1;
      timer = setTimeout(hide, PROMPT_VISIBLE_MS);
    };
    timer = setTimeout(show, PROMPT_FIRST_DELAY_MS);
    return () => { clearTimeout(timer); setPromptMsg(null); };
  }, [revealed, resting, givenUp, chatOpen]);

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
      // A flat 200–350px hop assumes a desktop-width runway. A phone only has
      // ~250px of travel, so those jumps slammed into an edge, got clamped to
      // almost nothing, then ping-ponged off the opposite wall on the next tap
      // — the "awkward" run. Cap the hop against the runway that exists, and
      // head for whichever side has more room so it stops bouncing off edges.
      // On desktop the cap never binds, so its feel is unchanged.
      const runway = maxX - minX;
      const span = Math.min(350, runway * 0.55);
      const lo = Math.min(200, span * 0.6);
      const magnitude = lo + Math.random() * Math.max(0, span - lo);
      const roomLeft = xRef.current - minX;
      const roomRight = maxX - xRef.current;
      let targetX =
        roomLeft >= roomRight ? xRef.current - magnitude : xRef.current + magnitude;
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

  // The chat takeover shows its own (big) robot, so hide the corner one — and
  // so does any page that has claimed the robot for itself (`solo`, currently
  // the 404). One canvas per page; see RobotChatContext.
  if (!revealed || chatOpen || solo) return null;

  // A one-shot reaction outranks whatever the ambient loop last set.
  const played: ClipName = reaction ?? anim;
  const timeScale = played === "Running" ? RUN_TIMESCALE : played === "Jumping" ? JUMP_TIMESCALE : 1;
  // Full rate only while the robot is travelling — the chase and the entrance
  // are the two moments where a dropped frame would read as a stutter. The
  // ambient idle clips are slow enough that half rate is invisible, and idle is
  // very nearly all of the time. See FrameLimiter in RobotCanvas.
  const fps = played === "Running" || played === "Jumping" ? 60 : 30;

  return (
    <div
      // `sd-mascot` is a styling hook only — globals.css uses it to clear the
      // robot off the hero on phones, where its canvas overlapped the hero CTAs.
      // Nothing reads it in JS, and it must stay a *class* on this wrapper: the
      // robot cannot be re-rendered or unmounted for that, so the hiding is done
      // entirely in CSS from an ancestor.
      className="sd-mascot fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ opacity: appear ? 1 : 0, transition: "opacity 0.35s ease" }}
      // Which clip is on screen right now. The robot draws into a WebGL canvas
      // with `preserveDrawingBuffer: false`, so its pose cannot be read back
      // from the DOM or sampled from pixels — at 200px, "standing" and "sitting"
      // are also genuinely hard to tell apart in a screenshot. This is the only
      // way to assert what the mascot is doing.
      data-clip={played}
    >
      <div
        // On mobile every layer here stays inert and the small hotspot over the
        // robot re-enables itself, so the wrapper's dead space stops sitting on
        // top of the hero buttons. Desktop keeps the whole box live.
        className={isMobile ? "absolute pointer-events-none" : "absolute pointer-events-auto"}
        style={{ right: CORNER_RIGHT, bottom: CORNER_BOTTOM, transform: `translateX(${x}px)`, transition: travelTransition }}
      >
        {/* The entrance rides its own wrapper so its keyframe never contends
            with the inline translateX the chase writes to the box above. */}
        <div className={entering ? "sd-robot-enter" : undefined}>
          <div
            style={{
              // The sitting lift rides the hop so it inherits its easing.
              transform: `translateY(${hopY - (played === "SittingIdle" ? SIT_LIFT_PX : 0)}px)`,
              transition: "transform 0.26s ease-out",
            }}
          >
          {/* Escape quips are short and stay on one line. The résumé prompts are
              full sentences, so the bubble wraps and caps its width against the
              viewport — nowrap would have run it off both edges of a phone.
              The robot parks in the bottom-right corner at both breakpoints and
              its box overhangs the viewport by CORNER_RIGHT, so a bubble centred
              on it ran off the right edge once the text got longer than a short
              quip — on a phone badly, on desktop by ~20px. It now hangs from the
              robot's right edge, offset back to the viewport boundary, and grows
              leftwards. The bubble is inert; taps belong to the robot beneath. */}
          {(escapeMsg || promptMsg) && !givenUp && (
            <div className="pointer-events-none absolute top-[40%] -translate-y-full right-[14px] bg-[#1D1D1F] text-white rounded-2xl shadow-lg px-3.5 py-2 w-max max-w-[min(15rem,calc(100vw-2rem))] text-center">
              <p className="text-[12.5px] font-semibold leading-snug">{escapeMsg ?? promptMsg}</p>
              <span className="absolute right-7 -bottom-1 w-2.5 h-2.5 bg-[#1D1D1F] rotate-45" />
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
            // react-three-fiber puts `pointer-events: auto` inline on its own
            // wrapper, which outranks a plain parent rule — hence the important
            // child variant rather than relying on inheritance alone.
            className={`cursor-pointer relative${isMobile ? " [&>div]:!pointer-events-none" : ""}`}
            style={{
              width: robotW,
              height: robotH,
              // On a phone the hero's CTA row ends up in the same corner as the
              // mascot. The canvas box is far wider than the robot drawn inside
              // it, so its empty left half was swallowing taps meant for "View
              // Projects". Hand the live area to the hotspot below instead;
              // desktop keeps the whole box, hover-to-chase included.
              pointerEvents: isMobile ? "none" : "auto",
            }}
            // `aria-label` on a div with no role is ignored outright, so the
            // mascot was announcing nothing at all. `role="img"` is the honest
            // description — it is a picture with a name, not a control; the
            // résumé it guards is reachable from /resume and the nav.
            role="img"
            aria-label="Suman's robot assistant"
          >
            <RobotCanvas
              animation={played}
              rotationY={rotationY}
              timeScale={timeScale}
              rimLight
              cameraPosition={[0, 0.7, 6.4]}
              cameraFov={30}
              groupY={-1.55}
              fps={fps}
            />
            {isMobile && (
              // Tracks the robot's own footprint at the right of the box, clear
              // of anything the page puts to its left.
              <span
                onClick={handleClick}
                className="absolute bottom-0 right-0 h-[62%] w-[46%] cursor-pointer"
                style={{ pointerEvents: "auto" }}
              />
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
