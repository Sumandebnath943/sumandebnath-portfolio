"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribeToSupport = () => () => {};
const supportsAudio = () => typeof AudioContext !== "undefined";
const noServerAudio = () => false;

export function useChatVoice() {
  const supported = useSyncExternalStore(subscribeToSupport, supportsAudio, noServerAudio);
  const [speaking, setSpeaking] = useState(false);
  const [notice, setNotice] = useState("");
  const context = useRef<AudioContext | null>(null);
  const playback = useRef<AudioBufferSourceNode | null>(null);
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => {
    request.current?.abort();
    void context.current?.close().catch(() => {});
    request.current = null;
    playback.current = null;
    context.current = null;
  }, []);

  const enableAudio = useCallback(() => {
    if (!supported) return;
    // Resume in the button gesture so the later, asynchronous reply can play.
    try {
      context.current ??= new AudioContext();
      void context.current.resume().catch(() => setNotice("This browser couldn’t start audio playback."));
      setNotice("");
    } catch {
      setNotice("This browser couldn’t start audio playback.");
    }
  }, [supported]);

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

  const speak = useCallback(async (text: string, voiceTicket: string) => {
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

  return { supported, speaking, notice, setNotice, enableAudio, speak, cancelSpeak };
}
