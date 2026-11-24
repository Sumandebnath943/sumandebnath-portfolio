"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MAX_VOICE_BYTES, VOICE_RECORDING_MS } from "@/lib/portfolio-chat/types";

const RECORDING_TYPES = ["audio/webm;codecs=opus", "audio/ogg;codecs=opus", "audio/mp4"];
const subscribeToSupport = () => () => {};
const supportsRecording = () => typeof MediaRecorder !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
const noServerRecorder = () => false;

type CapturePhase = "idle" | "permission" | "recording" | "transcribing";
type Capture = {
  controller: AbortController;
  recorder?: MediaRecorder;
  stream?: MediaStream;
  timer?: number;
};

function releaseHardware(capture: Capture) {
  window.clearTimeout(capture.timer);
  if (capture.recorder) {
    capture.recorder.ondataavailable = capture.recorder.onstop = capture.recorder.onerror = null;
    if (capture.recorder.state !== "inactive") capture.recorder.stop();
  }
  capture.stream?.getTracks().forEach((track) => track.stop());
}

function readBase64(clip: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(String(reader.result).split(",", 2)[1] || "");
    reader.readAsDataURL(clip);
  });
}

export function useVoiceRecorder(onTranscript: (text: string) => void) {
  const supported = useSyncExternalStore(subscribeToSupport, supportsRecording, noServerRecorder);
  const [phase, setPhase] = useState<CapturePhase>("idle");
  const [notice, setNotice] = useState("");
  const active = useRef<Capture | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  useEffect(() => { onTranscriptRef.current = onTranscript; }, [onTranscript]);

  function cancel() {
    const capture = active.current;
    active.current = null;
    if (capture) {
      capture.controller.abort();
      releaseHardware(capture);
    }
    setPhase("idle");
    setNotice("");
  }

  useEffect(() => () => {
    const capture = active.current;
    if (capture) {
      capture.controller.abort();
      releaseHardware(capture);
      active.current = null;
    }
  }, []);

  function finish(capture: Capture, message = "") {
    if (active.current !== capture) return;
    releaseHardware(capture);
    active.current = null;
    setPhase("idle");
    setNotice(message);
  }

  async function transcribe(capture: Capture, clip: Blob, type: string) {
    releaseHardware(capture);
    if (!clip.size || clip.size > MAX_VOICE_BYTES) {
      finish(capture, clip.size ? "That recording is too large. Try a shorter question." : "I didn’t capture any audio. Check your microphone and try again.");
      return;
    }
    setPhase("transcribing");
    try {
      const audio = await readBase64(clip);
      if (capture.controller.signal.aborted) return;
      const response = await fetch("/api/chat-transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio, type }),
        signal: capture.controller.signal,
      });
      const result = await response.json();
      if (capture.controller.signal.aborted) return;
      if (!response.ok || typeof result.transcript !== "string") {
        finish(capture, result.error || "I couldn’t transcribe that recording. Try again or type your question.");
        return;
      }
      finish(capture);
      onTranscriptRef.current(result.transcript);
    } catch {
      if (!capture.controller.signal.aborted) finish(capture, "I couldn’t transcribe that recording. Try again or type your question.");
    }
  }

  async function start() {
    if (!supported || active.current) return;
    const capture: Capture = { controller: new AbortController() };
    active.current = capture;
    setNotice("");
    setPhase("permission");
    try {
      capture.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      if (capture.controller.signal.aborted) { releaseHardware(capture); return; }
      const mimeType = RECORDING_TYPES.find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = new MediaRecorder(capture.stream, { mimeType, audioBitsPerSecond: 48_000 });
      capture.recorder = recorder;
      const chunks: Blob[] = [];
      recorder.ondataavailable = ({ data }) => { if (data.size) chunks.push(data); };
      recorder.onerror = () => finish(capture, "The microphone recording stopped. Try again or type your question.");
      recorder.onstop = () => {
        if (capture.controller.signal.aborted) return;
        const type = (recorder.mimeType || chunks[0]?.type || "").split(";")[0];
        void transcribe(capture, new Blob(chunks, { type }), type);
      };
      recorder.start();
      setPhase("recording");
      capture.timer = window.setTimeout(() => { if (recorder.state === "recording") recorder.stop(); }, VOICE_RECORDING_MS);
    } catch (error) {
      if (capture.controller.signal.aborted) return;
      const denied = error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "SecurityError");
      finish(capture, denied ? "Microphone access is blocked. Allow it in your browser’s site settings, then tap the mic again." :
        "I couldn’t start your microphone. Check that it’s connected, or type your question.");
    }
  }

  function stop() {
    const recorder = active.current?.recorder;
    if (recorder?.state === "recording") recorder.stop();
  }

  return { supported, phase, notice, start, stop, cancel };
}
