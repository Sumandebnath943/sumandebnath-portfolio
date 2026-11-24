"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createUtteranceDetector, encodeUtterance } from "@/lib/portfolio-chat/utterance";

type CapturePhase = "idle" | "permission" | "listening" | "recording" | "transcribing" | "paused";
type Capture = {
  controller: AbortController;
  accepting: boolean;
  track?: MediaStreamTrack;
  source?: MediaStreamAudioSourceNode;
  worklet?: AudioWorkletNode;
  detector?: ReturnType<typeof createUtteranceDetector>;
};

const subscribeToSupport = () => () => {};
const supportsRecording = () => typeof AudioWorkletNode !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
const noServerRecorder = () => false;

function release(capture: Capture) {
  capture.controller.abort();
  capture.source?.disconnect();
  if (capture.worklet) {
    capture.worklet.port.onmessage = null;
    capture.worklet.port.close();
    capture.worklet.disconnect();
  }
  capture.track?.stop();
}

function setListening(capture: Capture, listening: boolean) {
  capture.accepting = listening;
  capture.detector?.reset();
  if (capture.track) capture.track.enabled = listening;
  capture.worklet?.port.postMessage(listening);
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
  const loadedWorklet = useRef<Promise<void> | undefined>(undefined);
  const onTranscriptRef = useRef(onTranscript);
  useEffect(() => { onTranscriptRef.current = onTranscript; }, [onTranscript]);

  const cancel = useCallback(() => {
    if (active.current) release(active.current);
    active.current = null;
    setPhase("idle");
    setNotice("");
  }, []);

  useEffect(() => () => {
    if (active.current) release(active.current);
    active.current = null;
  }, []);

  function pause() {
    if (!active.current?.worklet || !active.current.accepting) return;
    setListening(active.current, false);
    setPhase("paused");
  }

  function resume(message = "") {
    const capture = active.current;
    if (!capture?.worklet || capture.controller.signal.aborted || capture.accepting) return;
    setListening(capture, true);
    setNotice(message);
    setPhase("listening");
  }

  async function transcribe(capture: Capture, frames: Int16Array[]) {
    setListening(capture, false);
    setPhase("transcribing");
    try {
      const audio = await readBase64(encodeUtterance(frames));
      if (capture.controller.signal.aborted) return;
      const response = await fetch("/api/chat-transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio, type: "audio/wav" }),
        signal: capture.controller.signal,
      });
      const result = await response.json();
      if (capture.controller.signal.aborted) return;
      if (!response.ok || typeof result.transcript !== "string") {
        resume(result.error || "I couldn’t transcribe that. Try speaking again or type your question.");
        return;
      }
      setPhase("paused");
      onTranscriptRef.current(result.transcript);
    } catch {
      if (!capture.controller.signal.aborted) resume("I couldn’t transcribe that. Try speaking again or type your question.");
    }
  }

  async function start(audio: AudioContext) {
    if (!supported || active.current) return;
    const capture: Capture = { controller: new AbortController(), accepting: false };
    active.current = capture;
    setNotice("");
    setPhase("permission");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      if (capture.controller.signal.aborted) { stream.getTracks().forEach((track) => track.stop()); return; }
      capture.track = stream.getAudioTracks()[0];
      if (!capture.track) throw new Error("Missing microphone track");
      capture.track.enabled = false;
      loadedWorklet.current ??= audio.audioWorklet.addModule("/portfolio-mic-v1.js").catch((error) => {
        loadedWorklet.current = undefined;
        throw error;
      });
      await loadedWorklet.current;
      if (capture.controller.signal.aborted) return;
      const worklet = new AudioWorkletNode(audio, "portfolio-microphone");
      capture.worklet = worklet;
      capture.source = audio.createMediaStreamSource(stream);
      capture.detector = createUtteranceDetector(() => {
        setNotice("");
        setPhase("recording");
      }, (frames) => { void transcribe(capture, frames); });
      worklet.port.onmessage = ({ data }: MessageEvent<Int16Array>) => {
        if (capture.accepting) capture.detector?.push(data);
      };
      const unavailable = () => {
        if (capture.controller.signal.aborted) return;
        cancel();
        setNotice("Microphone disconnected. Toggle voice mode to reconnect or type your question.");
      };
      worklet.onprocessorerror = unavailable;
      capture.track.addEventListener("ended", unavailable, { once: true });
      capture.source.connect(worklet).connect(audio.destination);
      resume();
    } catch (error) {
      if (capture.controller.signal.aborted) return;
      cancel();
      const denied = error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "SecurityError");
      setNotice(denied ? "Microphone access is blocked. Allow it in your browser’s site settings, then toggle voice mode." :
        "I couldn’t start your microphone. Check that it’s connected, or type your question.");
    }
  }

  return { supported, phase, notice, start, pause, resume, cancel };
}
