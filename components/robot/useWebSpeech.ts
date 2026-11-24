"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: null | ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void);
  onend: null | (() => void);
  onerror: null | ((event: { error: string }) => void);
  start: () => void;
  abort: () => void;
};

function recognitionConstructor() {
  const browser = window as Window & {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
  };
  return browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
}

const subscribeToSupport = () => () => {};
const supportsAudio = () => typeof AudioContext !== "undefined";
const noServerAudio = () => false;

export function useWebSpeech(onTranscript: (text: string) => void) {
  const supported = useSyncExternalStore(subscribeToSupport, supportsAudio, noServerAudio);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [notice, setNotice] = useState("");
  const recognition = useRef<Recognition | null>(null);
  const context = useRef<AudioContext | null>(null);
  const playback = useRef<AudioBufferSourceNode | null>(null);
  const request = useRef<AbortController | null>(null);
  const onTranscriptRef = useRef(onTranscript);

  useEffect(() => { onTranscriptRef.current = onTranscript; }, [onTranscript]);

  useEffect(() => {
    const SpeechRecognition = recognitionConstructor();
    if (!SpeechRecognition) return;
    const mic = new SpeechRecognition();
    mic.lang = "en-US";
    mic.interimResults = false;
    mic.continuous = false;
    mic.onresult = ({ results }) => {
      const transcript = results[0]?.[0]?.transcript.trim();
      if (transcript) onTranscriptRef.current(transcript);
    };
    mic.onend = () => setListening(false);
    mic.onerror = ({ error }) => {
      setListening(false);
      if (error === "not-allowed" || error === "service-not-allowed" || error === "audio-capture" || error === "network") {
        setNotice("Microphone unavailable. Type a message to hear a Gemini reply.");
      }
    };
    recognition.current = mic;
    return () => {
      mic.onresult = mic.onend = mic.onerror = null;
      mic.abort();
      recognition.current = null;
    };
  }, []);

  useEffect(() => () => {
    request.current?.abort();
    void context.current?.close().catch(() => {});
    request.current = null;
    playback.current = null;
    context.current = null;
  }, []);

  const listen = useCallback(() => {
    const mic = recognition.current;
    if (!mic) {
      setNotice("This browser can play replies. Type a message to hear one.");
      return;
    }
    try { mic.start(); setListening(true); } catch { /* The previous turn is still stopping. */ }
  }, []);

  const stopListen = useCallback(() => {
    recognition.current?.abort();
    setListening(false);
  }, []);

  const enableAudio = useCallback(() => {
    context.current ??= new AudioContext();
    // Resume in the button gesture so the later, asynchronous reply can play.
    void context.current.resume().catch(() => {});
    setNotice("");
  }, []);

  const cancelSpeak = useCallback(() => {
    request.current?.abort();
    request.current = null;
    if (playback.current) {
      playback.current.onended = null;
      playback.current.stop();
      playback.current.disconnect();
      playback.current = null;
    }
    setSpeaking(false);
  }, []);

  const speak = useCallback(async (text: string, voiceTicket: string, onEnd: () => void) => {
    cancelSpeak();
    const audio = context.current;
    if (!audio) return;
    const controller = new AbortController();
    request.current = controller;
    setNotice("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voiceTicket }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Voice request failed");
      const buffer = await audio.decodeAudioData(await response.arrayBuffer());
      if (controller.signal.aborted) return;
      if (audio.state !== "running") throw new Error("Audio playback is unavailable");
      const source = audio.createBufferSource();
      source.buffer = buffer;
      source.connect(audio.destination);
      source.onended = () => {
        source.disconnect();
        playback.current = null;
        setSpeaking(false);
        onEnd();
      };
      source.start();
      playback.current = source;
      setSpeaking(true);
    } catch {
      if (!controller.signal.aborted) setNotice("Gemini voice couldn’t play this reply. You can keep chatting by text.");
    } finally {
      if (request.current === controller) request.current = null;
    }
  }, [cancelSpeak]);

  return { supported, listening, speaking, notice, setNotice, listen, stopListen, enableAudio, speak, cancelSpeak };
}
