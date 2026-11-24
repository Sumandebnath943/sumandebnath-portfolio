"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { VOICE_LIMIT_MESSAGE, VOICE_PAUSED_MESSAGE } from "@/lib/portfolio-chat/types";

const PCM_RATE = 24_000;
const subscribeToSupport = () => () => {};
const supportsAudio = () => typeof AudioContext !== "undefined";
const noServerAudio = () => false;

export function useChatVoice() {
  const supported = useSyncExternalStore(subscribeToSupport, supportsAudio, noServerAudio);
  const [speaking, setSpeaking] = useState(false);
  const [notice, setNotice] = useState("");
  const context = useRef<AudioContext | null>(null);
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => {
    request.current?.abort();
    void context.current?.close().catch(() => {});
    request.current = null;
    context.current = null;
  }, []);

  function enableAudio() {
    if (!supported) return;
    // Unlock playback during the button gesture, before reaching either provider.
    try {
      context.current ??= new AudioContext();
      void context.current.resume().catch(() => setNotice("This browser couldn’t start audio playback."));
      setNotice("");
      return context.current;
    } catch {
      setNotice("This browser couldn’t start audio playback.");
    }
  }

  const cancelSpeak = useCallback(() => {
    request.current?.abort();
    request.current = null;
    setSpeaking(false);
  }, []);

  async function speak(text: string, voiceTicket: string, onProgress: (played: number, duration?: number) => void) {
    cancelSpeak();
    const audio = context.current;
    if (!audio) return;
    const controller = new AbortController();
    request.current = controller;
    const playing = new Set<AudioBufferSourceNode>();
    const timeline: { start: number; end: number; offset: number }[] = [];
    let nextStart = 0;
    let duration = 0;
    let complete = false;
    let carrying: number | undefined;
    let timer: number | undefined;
    let playbackDeadline: number | undefined;
    let started = false;
    let resolvePlayback: () => void;
    const playbackDone = new Promise<void>((resolve) => { resolvePlayback = resolve; });
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;

    function stopPlayback() {
      window.clearInterval(timer);
      window.clearTimeout(playbackDeadline);
      for (const source of playing) {
        source.onended = null;
        source.stop();
        source.disconnect();
      }
      playing.clear();
      resolvePlayback();
    }

    const update = () => {
      const now = audio.currentTime;
      while (timeline.length > 1 && timeline[1].start <= now) timeline.shift();
      const segment = timeline[0];
      if (!segment || now < segment.start) return;
      if (!started) {
        started = true;
        setNotice("");
        setSpeaking(true);
      }
      onProgress(segment.offset + Math.min(now - segment.start, segment.end - segment.start), complete ? duration : undefined);
      if (complete && now >= nextStart) resolvePlayback();
    };

    controller.signal.addEventListener("abort", stopPlayback, { once: true });
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voiceTicket, streamAudio: true }),
        signal: controller.signal,
      });
      if (response.status === 429) {
        setNotice(VOICE_LIMIT_MESSAGE);
        return;
      }
      if (!response.ok || !response.body || audio.state !== "running") throw new Error("Voice request failed");
      reader = response.body.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done || controller.signal.aborted) break;
        let bytes = value;
        if (carrying !== undefined) {
          bytes = new Uint8Array(value.length + 1);
          bytes[0] = carrying;
          bytes.set(value, 1);
        }
        carrying = bytes.length % 2 ? bytes[bytes.length - 1] : undefined;
        const samples = Math.floor(bytes.length / 2);
        if (!samples) continue;
        const pcm = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const buffer = audio.createBuffer(1, samples, PCM_RATE);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < samples; i++) output[i] = pcm.getInt16(i * 2, true) / 32768;
        const source = audio.createBufferSource();
        source.buffer = buffer;
        source.connect(audio.destination);
        source.onended = () => { playing.delete(source); source.disconnect(); };
        const start = Math.max(nextStart, audio.currentTime + (timer === undefined ? 0.10 : 0.03));
        nextStart = start + buffer.duration;
        timeline.push({ start, end: nextStart, offset: duration });
        duration += buffer.duration;
        source.start(start);
        playing.add(source);
        timer ??= window.setInterval(update, 45);
      }
      if (controller.signal.aborted) return;
      if (!duration || carrying !== undefined) throw new Error("Incomplete voice response");
      complete = true;
      update();
      playbackDeadline = window.setTimeout(() => {
        if (audio.currentTime < nextStart) setNotice("Audio playback paused. The answer is in the chat.");
        resolvePlayback();
      }, (Math.max(0, nextStart - audio.currentTime) + 4) * 1_000);
      await playbackDone;
    } catch {
      if (!controller.signal.aborted) setNotice(VOICE_PAUSED_MESSAGE);
    } finally {
      controller.signal.removeEventListener("abort", stopPlayback);
      await reader?.cancel().catch(() => {});
      stopPlayback();
      if (request.current === controller) {
        request.current = null;
        setSpeaking(false);
      }
    }
  }

  return { supported, speaking, notice, setNotice, enableAudio, speak, cancelSpeak };
}
