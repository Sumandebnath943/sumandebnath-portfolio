'use client';

import { useState, useRef, useEffect } from 'react';
import { useDeferredReveal } from '@/lib/useDeferredReveal';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content:
    "Hi — I'm Suman's AI assistant. Ask me anything about his experience, projects, availability, or what he's looking for in his next role.",
  animating: false,
};

const SUGGESTED_QUESTIONS = [
  "What roles is Suman looking for?",
  "What has he built with AI?",
  "What's his notice period and expected salary?",
  "Tell me about ROASmind",
];

const TYPEWRITER_SPEED_MS = 14;
const CHARS_PER_TICK = 2;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reveal only after the page has settled (or the user scrolls a bit)
  const revealed = useDeferredReveal();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  useEffect(() => {
    return () => { if (animationRef.current) clearInterval(animationRef.current); };
  }, []);

  function animateResponse(fullText) {
    if (animationRef.current) clearInterval(animationRef.current);
    const text =
      typeof fullText === 'string' && fullText.length > 0
        ? fullText
        : 'Something went wrong. Please email sumandebnath944@gmail.com directly.';

    let index = 0;
    setMessages((prev) => [...prev, { role: 'assistant', content: '', animating: true }]);
    setIsAnimating(true);

    animationRef.current = setInterval(() => {
      index = Math.min(index + CHARS_PER_TICK, text.length);
      const done = index >= text.length;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: text.slice(0, index), animating: !done };
        return updated;
      });
      if (done) {
        clearInterval(animationRef.current);
        animationRef.current = null;
        setIsAnimating(false);
      }
    }, TYPEWRITER_SPEED_MS);
  }

  async function sendMessage(text) {
    const userText = text.trim();
    if (!userText || isLoading || isAnimating) return;

    const userMessage = { role: 'user', content: userText };
    const updatedMessages = [...messages, userMessage];

    if (/\b(resume|cv|curriculum vitae|download|pdf)\b/i.test(userText)) {
      window.dispatchEvent(new CustomEvent('resumeRequest'));
    }

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const apiMessages = updatedMessages.map(({ role, content }) => ({ role, content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.status === 429) { animateResponse('Please wait a moment before sending another message.'); return; }
      if (!res.ok || !data.message) { animateResponse(data.error || 'Something went wrong. Please email sumandebnath944@gmail.com directly.'); return; }
      animateResponse(data.message);
    } catch {
      animateResponse('Network error. Please email sumandebnath944@gmail.com directly.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  const canSend = !isLoading && !isAnimating && input.trim().length > 0;

  if (!revealed) return null;

  return (
    <>
      <style>{`
        /* ─── Chat Widget ─────────────────────────────────────────────── */
        .cw-wrapper {
          position: fixed;
          bottom: 24px;
          right: 120px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          font-family: var(--font-manrope, 'Inter', -apple-system, sans-serif);
        }

        /* ── Toggle button ── */
        .cw-toggle {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px 11px 16px;
          background: #1D1D1F;
          color: #F5F5F7;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-size: 13.5px;
          font-weight: 600;
          font-family: inherit;
          letter-spacing: -0.01em;
          white-space: nowrap;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
          box-shadow:
            0 2px 8px rgba(0,0,0,0.18),
            0 8px 24px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .cw-toggle:hover {
          transform: translateY(-2px);
          box-shadow:
            0 4px 12px rgba(0,0,0,0.22),
            0 12px 32px rgba(240,78,0,0.18),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .cw-toggle:active { transform: scale(0.97); }

        /* Orange spark pill inside the button */
        .cw-toggle-spark {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F04E00, #FF8A33);
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(240,78,0,0.7);
          animation: cw-spark 2.4s ease-in-out infinite;
        }
        @keyframes cw-spark {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px rgba(240,78,0,0.6); }
          50%       { opacity: 0.7; box-shadow: 0 0 10px rgba(255,138,51,0.9); }
        }

        /* ── Chat window ── */
        .cw-window {
          width: 380px;
          height: 500px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow:
            0 0 0 0.5px rgba(0, 0, 0, 0.07),
            0 4px 16px rgba(0, 0, 0, 0.06),
            0 20px 60px rgba(0, 0, 0, 0.1),
            0 0 80px rgba(240, 78, 0, 0.04);
          animation: cw-slide-up 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes cw-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Orange accent bar at top ── */
        .cw-accent-bar {
          height: 2.5px;
          background: linear-gradient(90deg, #F04E00 0%, #FF8A33 50%, #FFB347 100%);
          flex-shrink: 0;
        }

        /* ── Header ── */
        .cw-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.5);
        }
        .cw-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cw-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F04E00 0%, #FF8A33 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.3px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(240, 78, 0, 0.3);
        }
        .cw-header-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #1D1D1F;
          letter-spacing: -0.02em;
        }
        .cw-header-sub {
          font-size: 11px;
          color: #86868B;
          margin-top: 1px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        /* Sophisticated status: thin animated ring */
        .cw-status-ring {
          position: relative;
          width: 7px;
          height: 7px;
          flex-shrink: 0;
        }
        .cw-status-ring::before,
        .cw-status-ring::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }
        .cw-status-ring::before {
          background: #F04E00;
          opacity: 0.9;
        }
        .cw-status-ring::after {
          background: transparent;
          border: 1.5px solid rgba(240,78,0,0.5);
          animation: cw-ring-pulse 2s ease-out infinite;
        }
        @keyframes cw-ring-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .cw-close {
          background: rgba(0, 0, 0, 0.04);
          border: none;
          cursor: pointer;
          color: #86868B;
          padding: 6px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          transition: background 0.15s, color 0.15s;
          line-height: 1;
        }
        .cw-close:hover {
          background: rgba(0, 0, 0, 0.08);
          color: #1D1D1F;
        }

        /* ── Messages ── */
        .cw-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 15px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.08) transparent;
        }
        .cw-messages::-webkit-scrollbar { width: 3px; }
        .cw-messages::-webkit-scrollbar-track { background: transparent; }
        .cw-messages::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 2px;
        }

        /* ── Bubbles ── */
        .cw-bubble-row {
          display: flex;
          animation: cw-fade-in 0.2s ease;
        }
        @keyframes cw-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cw-bubble-row.user     { justify-content: flex-end; }
        .cw-bubble-row.assistant { justify-content: flex-start; }

        .cw-bubble {
          max-width: 82%;
          padding: 10px 13px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.6;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .cw-bubble.user {
          background: linear-gradient(135deg, #F04E00 0%, #FF8A33 100%);
          color: #ffffff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 2px 10px rgba(240,78,0,0.22);
        }
        .cw-bubble.assistant {
          background: rgba(0, 0, 0, 0.04);
          color: #1D1D1F;
          border: 1px solid rgba(0,0,0,0.07);
          border-bottom-left-radius: 4px;
        }

        /* ── Blinking cursor ── */
        .cw-cursor {
          display: inline-block;
          width: 2px;
          height: 0.82em;
          background: linear-gradient(180deg, #F04E00, #FF8A33);
          margin-left: 2px;
          vertical-align: middle;
          border-radius: 1px;
          animation: cw-blink 0.6s steps(1) infinite;
        }
        @keyframes cw-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── Typing indicator ── */
        .cw-typing {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 11px 14px;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
        }
        .cw-typing span {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F04E00;
          animation: cw-bounce 1.1s ease-in-out infinite;
        }
        .cw-typing span:nth-child(2) { animation-delay: 0.15s; background: #FF6B35; }
        .cw-typing span:nth-child(3) { animation-delay: 0.30s; background: #FF8A33; }
        @keyframes cw-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }

        /* ── Suggested questions ── */
        .cw-suggestions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          padding: 0 14px 12px;
          flex-shrink: 0;
        }
        .cw-suggestion-btn {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.09);
          border-radius: 10px;
          color: #1D1D1F;
          font-size: 11.5px;
          padding: 8px 10px;
          text-align: left;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, transform 0.12s, box-shadow 0.15s;
          font-family: inherit;
          line-height: 1.4;
        }
        .cw-suggestion-btn:hover {
          border-color: rgba(240, 78, 0, 0.35);
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(240,78,0,0.1);
        }
        .cw-suggestion-btn:active { transform: scale(0.97); }

        /* ── Input bar ── */
        .cw-input-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 13px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          flex-shrink: 0;
          background: rgba(255,255,255,0.6);
        }
        .cw-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          color: #1D1D1F;
          font-size: 13.5px;
          font-family: inherit;
          padding: 9px 13px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          line-height: 1.4;
        }
        .cw-input::placeholder { color: #86868B; }
        .cw-input:focus {
          border-color: rgba(240, 78, 0, 0.4);
          box-shadow: 0 0 0 3px rgba(240, 78, 0, 0.08);
        }
        .cw-input:disabled { opacity: 0.45; cursor: not-allowed; }

        .cw-send {
          background: linear-gradient(135deg, #F04E00, #FF8A33);
          border: none;
          border-radius: 12px;
          color: #ffffff;
          cursor: pointer;
          padding: 10px 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(240,78,0,0.3);
        }
        .cw-send:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(240,78,0,0.42);
        }
        .cw-send:active:not(:disabled) { transform: scale(0.94); }
        .cw-send:disabled { opacity: 0.22; cursor: not-allowed; box-shadow: none; }

        /* ── Mobile ── */
        @media (max-width: 480px) {
          .cw-wrapper { right: 16px; bottom: 92px; }
          .cw-suggestions { grid-template-columns: 1fr; }

          /* Fit the window to the actual visible viewport so the header never clips */
          .cw-window {
            width: 90vw;
            height: min(480px, calc(100dvh - 132px));
          }

          /* Compact icon-only button (no text label) */
          .cw-toggle {
            padding: 12px;
            gap: 0;
            font-size: 0;
            border-radius: 50%;
          }
          .cw-toggle-spark { display: none; }
        }
      `}</style>

      <div className="cw-wrapper">
        {/* ── Chat window ── */}
        {isOpen && (
          <div className="cw-window" role="dialog" aria-label="Chat with Suman's AI assistant">
            {/* Orange gradient accent bar */}
            <div className="cw-accent-bar" />

            {/* Header */}
            <div className="cw-header">
              <div className="cw-header-left">
                <div className="cw-avatar">SD</div>
                <div>
                  <div className="cw-header-title">Suman's Assistant</div>
                  <div className="cw-header-sub">
                    <span className="cw-status-ring" />
                    Available · Ask me anything
                  </div>
                </div>
              </div>
              <button className="cw-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M11.5 3.5l-8 8M3.5 3.5l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="cw-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`cw-bubble-row ${msg.role}`}>
                  <div className={`cw-bubble ${msg.role}`}>
                    {msg.content}
                    {msg.animating && <span className="cw-cursor" />}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="cw-bubble-row assistant">
                  <div className="cw-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            {messages.length === 1 && !isLoading && (
              <div className="cw-suggestions">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    className="cw-suggestion-btn"
                    onClick={() => sendMessage(q)}
                    disabled={isLoading || isAnimating}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div className="cw-input-bar">
              <input
                ref={inputRef}
                className="cw-input"
                type="text"
                placeholder="Ask something…"
                value={input}
                maxLength={500}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || isAnimating}
                aria-label="Type your message"
              />
              <button
                className="cw-send"
                onClick={() => sendMessage(input)}
                disabled={!canSend}
                aria-label="Send message"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M14 8L2 2l3 6-3 6 12-6z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── Toggle button ── */}
        <button
          className="cw-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          <span className="cw-toggle-spark" />
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.85 }}>
            <path
              d="M8 1C4.134 1 1 3.686 1 7c0 1.592.683 3.032 1.8 4.1L2 15l4.1-1.3A7.3 7.3 0 008 14c3.866 0 7-2.686 7-6s-3.134-6-7-6z"
              fill="currentColor"
            />
          </svg>
          Ask about Suman
        </button>
      </div>
    </>
  );
}
