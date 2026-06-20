"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useDeferredReveal } from "@/lib/useDeferredReveal";
import { useRobotChat } from "./RobotChatContext";
import { useWebSpeech } from "./useWebSpeech";
import type { ClipName } from "./RobotModel";
import type { TakeoverPhase, RobotTargets } from "./TakeoverRobotCanvas";

const TakeoverRobotCanvas = dynamic(() => import("./TakeoverRobotCanvas"), { ssr: false });

type Message = { role: "user" | "assistant"; content: string; animating?: boolean };

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi — I'm Suman's AI assistant. Ask me anything about his experience, projects, availability, or what he's looking for in his next role.",
};

const SUGGESTED_QUESTIONS = [
  "What roles is Suman looking for?",
  "What has he built with AI?",
  "What's his notice period and expected salary?",
  "Tell me about ROASmind",
];

const TYPEWRITER_SPEED_MS = 14;
const CHARS_PER_TICK = 2;

const PHASE_MS = 880; // must be >= TWEEN_MS in TakeoverRobotCanvas
const FACE_LEFT = -Math.PI / 2;
const FACE_RIGHT = Math.PI / 2;
const LOOKING_AFTER_MS = 25_000; // chat-inactivity before the robot "looks around"

// Ambient idle rotation (panel): Idle (long) → HappyIdle → Idle → SadIdle.
const AMBIENT_SEQ: [ClipName, number][] = [
  ["Idle", 15_000],
  ["HappyIdle", 5_000],
  ["Idle", 15_000],
  ["SadIdle", 5_000],
];

// Friendly nudges the robot shows over its head while idling in the panel.
const IDLE_MESSAGES = [
  "Hey — wanna know more about Suman?",
  "Hi! Ask me anything 👋",
  "Yo, here's why Suman's a great fit.",
  "Curious about his AI work?",
  "Need his resume? Just ask.",
  "Psst… ask me about ROASmind.",
  "Want the quick pitch on Suman?",
  "I can walk you through his projects!",
];

// Robot 3D placement: left third on desktop, centered top band on mobile.
// sx = horizontal screen fraction (0 left … 1 right). Panel left area is 0–34%,
// so 0.17 centers the robot in it. Mobile centers it in the top band.
const DESKTOP_TARGETS: RobotTargets = {
  corner: { sx: 0.92, y: -1.7, scale: 0.52 },
  panel: { sx: 0.21, y: -1.6, scale: 1.25 }, // rig sits right of center; the mesh is ~4% left of its origin, so visual lands centered
};
const MOBILE_TARGETS: RobotTargets = {
  corner: { sx: 0.82, y: -1.6, scale: 0.34 },
  panel: { sx: 0.54, y: 0.45, scale: 0.62 },
};

export default function ChatTakeover() {
  const revealed = useDeferredReveal();
  const { open, openChat, closeChat } = useRobotChat();

  // ── Chat state ──
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Robot state ──
  const [phase, setPhase] = useState<TakeoverPhase>("intro");
  const [robotAnim, setRobotAnim] = useState<ClipName>("Jumping");
  const [rotationY, setRotationY] = useState(FACE_LEFT);
  const phaseTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lastActivity = useRef(Date.now());

  // ── Voice + responsive ──
  const [voiceMode, setVoiceMode] = useState(false);
  const voiceModeRef = useRef(false);
  voiceModeRef.current = voiceMode;
  const openRef = useRef(open);
  openRef.current = open;
  const [isMobile, setIsMobile] = useState(false);
  const [idleMsg, setIdleMsg] = useState<string | null>(null);

  const speech = useWebSpeech((t) => sendMessage(t));

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 820px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const clearPhaseTimers = () => { phaseTimers.current.forEach(clearTimeout); phaseTimers.current = []; };

  // Open: robot jumps from the corner across to the panel, then settles.
  useEffect(() => {
    if (!open) return;
    clearPhaseTimers();
    lastActivity.current = Date.now();
    setPhase("intro");
    setRobotAnim("Jumping");
    setRotationY(FACE_LEFT);
    phaseTimers.current.push(
      setTimeout(() => { setPhase("idle"); setRotationY(0); }, PHASE_MS),
    );
    return clearPhaseTimers;
  }, [open]);

  // Drive the panel robot: talk while the reply types out / is spoken aloud,
  // otherwise idle ambient.
  useEffect(() => {
    if (!open || phase !== "idle") return;

    if (isAnimating || speech.speaking) {
      // Two talking clips, alternating.
      setRobotAnim(Math.random() < 0.5 ? "Talking" : "Talking2");
      const id = setInterval(
        () => setRobotAnim((p) => (p === "Talking" ? "Talking2" : "Talking")),
        2400,
      );
      return () => clearInterval(id);
    }

    // Idle ambient rotation, with "Looking" after a stretch of no chat activity.
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (Date.now() - lastActivity.current > LOOKING_AFTER_MS) {
        setRobotAnim("Looking");
        timer = setTimeout(tick, 7000);
        return;
      }
      const [clip, dur] = AMBIENT_SEQ[i % AMBIENT_SEQ.length];
      i += 1;
      setRobotAnim(clip);
      timer = setTimeout(tick, dur);
    };
    tick();
    return () => clearTimeout(timer);
  }, [open, phase, isAnimating, speech.speaking]);

  // Friendly idle nudges over the robot's head while it's just standing there.
  useEffect(() => {
    if (!open || phase !== "idle" || isAnimating || speech.speaking || isLoading) {
      setIdleMsg(null);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    let shown = false;
    const cycle = () => {
      if (shown) { setIdleMsg(null); shown = false; timer = setTimeout(cycle, 6500); }
      else {
        setIdleMsg(IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)]);
        shown = true;
        timer = setTimeout(cycle, 4500);
      }
    };
    timer = setTimeout(cycle, 1800);
    return () => { clearTimeout(timer); setIdleMsg(null); };
  }, [open, phase, isAnimating, speech.speaking, isLoading]);

  const handleClose = useCallback(() => {
    clearPhaseTimers();
    speech.stopListen();
    speech.cancelSpeak();
    setVoiceMode(false);
    setPhase("outro");
    setRobotAnim("Jumping");
    setRotationY(FACE_RIGHT);
    phaseTimers.current.push(setTimeout(() => closeChat(), PHASE_MS));
  }, [closeChat, speech]);

  const toggleVoice = useCallback(() => {
    if (!speech.supported) return;
    setVoiceMode((prev) => {
      const next = !prev;
      if (next) speech.listen();
      else { speech.stopListen(); speech.cancelSpeak(); }
      return next;
    });
  }, [speech]);

  // Speak an assistant reply aloud (voice mode), then resume listening.
  const respond = useCallback((text: string) => {
    animateResponse(text);
    if (voiceModeRef.current) {
      speech.speak(text, () => {
        if (voiceModeRef.current && openRef.current) speech.listen();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech]);

  // ── Chat behaviour ──
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 250); }, [open]);
  useEffect(() => () => { if (typewriterRef.current) clearInterval(typewriterRef.current); }, []);

  function animateResponse(fullText: string) {
    if (typewriterRef.current) clearInterval(typewriterRef.current);
    const text = fullText && fullText.length > 0
      ? fullText
      : "Something went wrong. Please email sumandebnath944@gmail.com directly.";
    let index = 0;
    setMessages((prev) => [...prev, { role: "assistant", content: "", animating: true }]);
    setIsAnimating(true);
    typewriterRef.current = setInterval(() => {
      index = Math.min(index + CHARS_PER_TICK, text.length);
      const done = index >= text.length;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: text.slice(0, index), animating: !done };
        return updated;
      });
      if (done) {
        if (typewriterRef.current) clearInterval(typewriterRef.current);
        typewriterRef.current = null;
        setIsAnimating(false);
        lastActivity.current = Date.now();
      }
    }, TYPEWRITER_SPEED_MS);
  }

  async function sendMessage(text: string) {
    const userText = text.trim();
    if (!userText || isLoading || isAnimating) return;
    lastActivity.current = Date.now();
    const updated = [...messages, { role: "user", content: userText } as Message];
    setMessages(updated);
    setInput("");
    setIsLoading(true);
    const apiMessages = updated.map(({ role, content }) => ({ role, content }));
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 429) { respond("Please wait a moment before sending another message."); return; }
      if (!res.ok || !data.message) { respond(data.error || "Something went wrong. Please email sumandebnath944@gmail.com directly."); return; }
      respond(data.message);
    } catch {
      respond("Network error. Please email sumandebnath944@gmail.com directly.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  const canSend = !isLoading && !isAnimating && input.trim().length > 0;
  const panelIn = open && phase !== "outro";

  if (!revealed) return null;

  return (
    <>
      <style>{TAKEOVER_CSS}</style>

      {!open && (
        <button className="ct-launch" onClick={openChat} aria-label="Open chat with Suman's assistant">
          <span className="ct-launch-spark" />
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.85 }}>
            <path d="M8 1C4.134 1 1 3.686 1 7c0 1.592.683 3.032 1.8 4.1L2 15l4.1-1.3A7.3 7.3 0 008 14c3.866 0 7-2.686 7-6s-3.134-6-7-6z" fill="currentColor" />
          </svg>
          Ask about Suman
        </button>
      )}

      {open && (
        <div className="ct-root" role="dialog" aria-modal="true" aria-label="Chat with Suman's AI assistant">
          <div className={`ct-backdrop ${panelIn ? "in" : ""}`} />

          {/* Full-viewport robot canvas — flies corner ↔ panel in 3D */}
          <div className="ct-robot">
            <TakeoverRobotCanvas
              phase={phase}
              animation={robotAnim}
              rotationY={rotationY}
              targets={isMobile ? MOBILE_TARGETS : DESKTOP_TARGETS}
            />
          </div>

          {/* Idle nudge bubble over the robot's head */}
          {idleMsg && (
            <div className="ct-idle-bubble">
              {idleMsg}
              <span className="ct-idle-tail" />
            </div>
          )}

          {/* Chat panel (right ~66%) */}
          <div className={`ct-panel ${panelIn ? "in" : ""}`}>
            <div className="ct-header">
              <div className="ct-header-left">
                <div className="ct-avatar">SD</div>
                <div>
                  <div className="ct-title">Suman&apos;s Assistant</div>
                  <div className="ct-sub"><span className="ct-status" />Available · Ask me anything</div>
                </div>
              </div>
              <button className="ct-close" onClick={handleClose} aria-label="Close chat">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
                  <path d="M11.5 3.5l-8 8M3.5 3.5l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="ct-messages">
              <div className="ct-messages-inner">
                {messages.map((msg, i) => (
                  <div key={i} className={`ct-row ${msg.role}`}>
                    <div className={`ct-bubble ${msg.role}`}>
                      {msg.content}
                      {msg.animating && <span className="ct-cursor" />}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="ct-row assistant">
                    <div className="ct-typing"><span /><span /><span /></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {messages.length === 1 && !isLoading && (
              <div className="ct-suggestions">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button key={q} className="ct-suggestion" onClick={() => sendMessage(q)} disabled={isLoading || isAnimating}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="ct-input-bar">
              {speech.supported && (
                <button
                  className={`ct-mic ${voiceMode ? "on" : ""} ${speech.listening ? "listening" : ""}`}
                  onClick={toggleVoice}
                  aria-label={voiceMode ? "Turn off voice mode" : "Turn on voice mode"}
                  title={voiceMode ? "Voice mode on — click to turn off" : "Talk to the robot"}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" fill="currentColor" />
                    <path d="M19 11a7 7 0 0 1-14 0M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              )}
              <input
                ref={inputRef}
                className="ct-input"
                type="text"
                placeholder={voiceMode ? (speech.listening ? "Listening…" : "Voice mode on") : "Ask something…"}
                value={input}
                maxLength={500}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || isAnimating}
                aria-label="Type your message"
              />
              <button className="ct-send" onClick={() => sendMessage(input)} disabled={!canSend} aria-label="Send message">
                <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                  <path d="M14 8L2 2l3 6-3 6 12-6z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const TAKEOVER_CSS = `
  /* ── Launcher pill ── */
  .ct-launch {
    position: fixed; bottom: 30px; right: 138px; z-index: 1000;
    display: flex; align-items: center; gap: 8px;
    padding: 11px 20px 11px 16px;
    background: #1D1D1F; color: #F5F5F7; border: none; border-radius: 50px;
    cursor: pointer; font-size: 13.5px; font-weight: 600;
    font-family: var(--font-manrope, 'Inter', sans-serif); letter-spacing: -0.01em; white-space: nowrap;
    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08);
  }
  .ct-launch:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.22), 0 12px 32px rgba(240,78,0,0.18); }
  .ct-launch:active { transform: scale(0.97); }
  .ct-launch-spark { width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg,#F04E00,#FF8A33); box-shadow: 0 0 6px rgba(240,78,0,0.7); animation: ct-spark 2.4s ease-in-out infinite; }
  @keyframes ct-spark { 0%,100%{opacity:1} 50%{opacity:.6} }

  /* ── Takeover root ── */
  .ct-root { position: fixed; inset: 0; z-index: 2147483000; font-family: var(--font-manrope,'Inter',sans-serif); }
  .ct-backdrop {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, #efece6 0%, #f4f1ec 34%, #ffffff 34.01%, #ffffff 100%);
    opacity: 0; transition: opacity 0.5s ease;
  }
  .ct-backdrop.in { opacity: 1; }

  /* Robot canvas spans the viewport; the 3D rig handles all motion/scale. */
  .ct-robot { position: absolute; inset: 0; pointer-events: none; }

  /* Idle nudge bubble (over the robot's head, left area) */
  .ct-idle-bubble {
    position: absolute; left: 17vw; top: 15%; transform: translateX(-50%);
    max-width: 240px; background: #1D1D1F; color: #fff;
    padding: 12px 16px; border-radius: 18px; z-index: 3;
    font-size: 14px; font-weight: 500; line-height: 1.4; text-align: center;
    box-shadow: 0 8px 28px rgba(0,0,0,0.22);
    animation: ct-bubble-pop 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ct-idle-tail { position: absolute; left: 50%; bottom: -5px; width: 12px; height: 12px; background: #1D1D1F; transform: translateX(-50%) rotate(45deg); }
  @keyframes ct-bubble-pop { from { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.92); } to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); } }

  /* ── Chat panel ── */
  .ct-panel {
    position: absolute; right: 0; top: 0; width: 66vw; height: 100vh;
    background: #ffffff; display: flex; flex-direction: column;
    box-shadow: -1px 0 0 rgba(0,0,0,0.06);
    transform: translateX(102%);
    transition: transform ${PHASE_MS}ms cubic-bezier(0.16,1,0.3,1);
  }
  .ct-panel.in { transform: translateX(0); }

  /* Header */
  .ct-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 28px; border-bottom: 1px solid rgba(0,0,0,0.07); }
  .ct-header-left { display: flex; align-items: center; gap: 12px; }
  .ct-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg,#F04E00,#FF8A33); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; box-shadow: 0 2px 8px rgba(240,78,0,0.3); }
  .ct-title { font-size: 15px; font-weight: 600; color: #1D1D1F; letter-spacing: -0.02em; }
  .ct-sub { font-size: 12px; color: #86868B; margin-top: 2px; display: flex; align-items: center; gap: 6px; }
  .ct-status { width: 7px; height: 7px; border-radius: 50%; background: #34C759; box-shadow: 0 0 0 3px rgba(52,199,89,0.15); }
  .ct-close { background: rgba(0,0,0,0.04); border: none; cursor: pointer; color: #86868B; padding: 8px; border-radius: 10px; display: flex; transition: background .15s,color .15s; }
  .ct-close:hover { background: rgba(0,0,0,0.08); color: #1D1D1F; }

  /* Messages */
  .ct-messages { flex: 1; overflow-y: auto; }
  .ct-messages-inner { max-width: 720px; margin: 0 auto; width: 100%; padding: 28px; display: flex; flex-direction: column; gap: 18px; }
  .ct-row { display: flex; animation: ct-fade .25s ease; }
  @keyframes ct-fade { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  .ct-row.user { justify-content: flex-end; }
  .ct-row.assistant { justify-content: flex-start; }
  .ct-bubble { max-width: 80%; padding: 13px 17px; border-radius: 18px; font-size: 15px; line-height: 1.65; word-break: break-word; white-space: pre-wrap; }
  .ct-bubble.user { background: linear-gradient(135deg,#F04E00,#FF8A33); color: #fff; border-bottom-right-radius: 5px; box-shadow: 0 2px 10px rgba(240,78,0,0.22); }
  .ct-bubble.assistant { background: #f5f4f2; color: #1D1D1F; border: 1px solid rgba(0,0,0,0.06); border-bottom-left-radius: 5px; }
  .ct-cursor { display: inline-block; width: 2px; height: .9em; background: linear-gradient(180deg,#F04E00,#FF8A33); margin-left: 2px; vertical-align: middle; border-radius: 1px; animation: ct-blink .6s steps(1) infinite; }
  @keyframes ct-blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .ct-typing { display: flex; align-items: center; gap: 5px; padding: 13px 16px; background: #f5f4f2; border: 1px solid rgba(0,0,0,0.06); border-radius: 18px; border-bottom-left-radius: 5px; }
  .ct-typing span { width: 7px; height: 7px; border-radius: 50%; background: #F04E00; animation: ct-bounce 1.1s ease-in-out infinite; }
  .ct-typing span:nth-child(2){ animation-delay:.15s; background:#FF6B35 } .ct-typing span:nth-child(3){ animation-delay:.3s; background:#FF8A33 }
  @keyframes ct-bounce { 0%,60%,100%{transform:translateY(0);opacity:.35} 30%{transform:translateY(-5px);opacity:1} }

  /* Suggestions */
  .ct-suggestions { max-width: 720px; width: 100%; margin: 0 auto; padding: 0 28px 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .ct-suggestion { background: #fff; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; color: #1D1D1F; font-size: 13px; padding: 12px 14px; text-align: left; cursor: pointer; font-family: inherit; line-height: 1.4; transition: border-color .15s, transform .12s, box-shadow .15s; }
  .ct-suggestion:hover { border-color: rgba(240,78,0,0.4); transform: translateY(-1px); box-shadow: 0 2px 10px rgba(240,78,0,0.1); }

  /* Input */
  .ct-input-bar { max-width: 720px; width: 100%; margin: 0 auto; padding: 16px 28px 26px; display: flex; align-items: center; gap: 10px; }
  .ct-input { flex: 1; background: #f5f4f2; border: 1px solid rgba(0,0,0,0.1); border-radius: 14px; color: #1D1D1F; font-size: 15px; font-family: inherit; padding: 14px 18px; outline: none; transition: border-color .2s, box-shadow .2s, background .2s; }
  .ct-input::placeholder { color: #86868B; }
  .ct-input:focus { background: #fff; border-color: rgba(240,78,0,0.45); box-shadow: 0 0 0 4px rgba(240,78,0,0.08); }
  .ct-input:disabled { opacity: .5; }
  .ct-mic { background: #f0eeec; border: 1px solid rgba(0,0,0,0.1); border-radius: 14px; color: #5b5b5f; cursor: pointer; padding: 13px 14px; display: flex; transition: background .15s, color .15s, box-shadow .15s; flex-shrink: 0; }
  .ct-mic:hover { background: #e8e6e3; color: #1D1D1F; }
  .ct-mic.on { background: linear-gradient(135deg,#F04E00,#FF8A33); color: #fff; border-color: transparent; box-shadow: 0 2px 8px rgba(240,78,0,0.3); }
  .ct-mic.listening { animation: ct-mic-pulse 1.3s ease-out infinite; }
  @keyframes ct-mic-pulse { 0%{box-shadow:0 0 0 0 rgba(240,78,0,0.45)} 70%{box-shadow:0 0 0 10px rgba(240,78,0,0)} 100%{box-shadow:0 0 0 0 rgba(240,78,0,0)} }
  .ct-send { background: linear-gradient(135deg,#F04E00,#FF8A33); border: none; border-radius: 14px; color: #fff; cursor: pointer; padding: 14px 15px; display: flex; transition: transform .15s, box-shadow .15s, opacity .15s; box-shadow: 0 2px 8px rgba(240,78,0,0.3); }
  .ct-send:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(240,78,0,0.42); }
  .ct-send:disabled { opacity: .25; cursor: not-allowed; box-shadow: none; }

  /* ── Mobile: stacked (robot top, chat below). Refined in a later pass. ── */
  @media (max-width: 820px) {
    .ct-launch { left: 16px; right: auto; } /* bottom-left, clear of the corner robot */
    .ct-backdrop { background: linear-gradient(180deg,#f4f1ec 0%,#f4f1ec 32%,#fff 32.01%,#fff 100%); }
    .ct-idle-bubble { display: none; } /* no room above the head in the mobile top band */
    .ct-panel { width: 100vw; height: 68vh; top: auto; bottom: 0; transform: translateY(102%); }
    .ct-panel.in { transform: translateY(0); }
    .ct-messages-inner, .ct-suggestions, .ct-input-bar { padding-left: 16px; padding-right: 16px; }
    .ct-suggestions { grid-template-columns: 1fr; }
  }
`;
