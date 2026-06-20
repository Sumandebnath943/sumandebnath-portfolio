"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Thin wrapper around the browser's free Web Speech APIs:
 * SpeechRecognition (mic → text) + speechSynthesis (text → robot voice).
 * Best support in Chrome/Edge; gracefully reports `supported: false` elsewhere.
 */
export function useWebSpeech(onTranscript: (text: string) => void) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const recogRef = useRef<any>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const synth = window.speechSynthesis;
    if (!SR || !synth) { setSupported(false); return; }
    setSupported(true);

    const r = new SR();
    r.lang = "en-US";
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.continuous = false;
    r.onresult = (e: any) => {
      const t = e.results?.[0]?.[0]?.transcript?.trim();
      if (t) onTranscriptRef.current?.(t);
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recogRef.current = r;

    // Pick the most natural-sounding English voice available.
    const pickVoice = () => {
      const voices = synth.getVoices();
      if (!voices.length) return;
      voiceRef.current =
        voices.find((v) => /en[-_]US/i.test(v.lang) && /natural|google us english|samantha|aria|jenny|libby/i.test(v.name)) ||
        voices.find((v) => /en[-_]US/i.test(v.lang)) ||
        voices.find((v) => /^en/i.test(v.lang)) ||
        voices[0];
    };
    pickVoice();
    synth.addEventListener?.("voiceschanged", pickVoice);

    return () => {
      try { r.abort(); } catch { /* noop */ }
      synth.cancel();
      synth.removeEventListener?.("voiceschanged", pickVoice);
    };
  }, []);

  const listen = useCallback(() => {
    const r = recogRef.current;
    if (!r) return;
    try { r.start(); setListening(true); } catch { /* already started */ }
  }, []);

  const stopListen = useCallback(() => {
    const r = recogRef.current;
    if (r) { try { r.stop(); } catch { /* noop */ } }
    setListening(false);
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    const synth = window.speechSynthesis;
    if (!synth) { onEnd?.(); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = 1.03;
    u.pitch = 1.0;
    u.onstart = () => setSpeaking(true);
    u.onend = () => { setSpeaking(false); onEnd?.(); };
    u.onerror = () => { setSpeaking(false); onEnd?.(); };
    synth.speak(u);
  }, []);

  const cancelSpeak = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  return { supported, listening, speaking, listen, stopListen, speak, cancelSpeak };
}
