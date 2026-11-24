import { VOICE_INPUT_RATE, VOICE_RECORDING_MS } from "./types";

const FRAME_MS = 20;
const PRE_ROLL_FRAMES = 400 / FRAME_MS;
const END_SILENCE_FRAMES = 1_500 / FRAME_MS;
const TAIL_FRAMES = 280 / FRAME_MS;
const MAX_FRAMES = VOICE_RECORDING_MS / FRAME_MS;

export function createUtteranceDetector(onSpeech: () => void, onTurn: (frames: Int16Array[]) => void) {
  let leading: Int16Array[] = [];
  let captured: Int16Array[] | undefined;
  let quiet = 0;
  let consecutive = 0;
  let noise = 0.002;

  function reset() {
    leading = [];
    captured = undefined;
    quiet = consecutive = 0;
  }

  function push(frame: Int16Array) {
    let energy = 0;
    for (const sample of frame) energy += (sample / 32768) ** 2;
    const rms = Math.sqrt(energy / frame.length);
    const threshold = Math.max(0.005, noise * (captured ? 1.8 : 2.5));
    const audible = rms > threshold;

    if (!captured) {
      leading.push(frame);
      if (leading.length > PRE_ROLL_FRAMES) leading.shift();
      if (!audible) noise += (rms - noise) * 0.04;
      consecutive = audible ? consecutive + 1 : 0;
      if (consecutive >= 3) {
        captured = leading;
        leading = [];
        onSpeech();
      }
      return;
    }

    captured.push(frame);
    quiet = audible ? 0 : quiet + 1;
    if (quiet >= END_SILENCE_FRAMES || captured.length >= MAX_FRAMES) {
      const spoken = captured.slice(0, captured.length - Math.max(0, quiet - TAIL_FRAMES));
      reset();
      onTurn(spoken);
    }
  }

  return { push, reset };
}

export function encodeUtterance(frames: Int16Array[]) {
  const samples = frames.reduce((total, frame) => total + frame.length, 0);
  const bytes = new ArrayBuffer(44 + samples * 2);
  const data = new DataView(bytes);
  const tag = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i++) data.setUint8(offset + i, value.charCodeAt(i));
  };
  tag(0, "RIFF");
  data.setUint32(4, bytes.byteLength - 8, true);
  tag(8, "WAVEfmt ");
  data.setUint32(16, 16, true);
  data.setUint16(20, 1, true);
  data.setUint16(22, 1, true);
  data.setUint32(24, VOICE_INPUT_RATE, true);
  data.setUint32(28, VOICE_INPUT_RATE * 2, true);
  data.setUint16(32, 2, true);
  data.setUint16(34, 16, true);
  tag(36, "data");
  data.setUint32(40, samples * 2, true);
  let offset = 44;
  for (const frame of frames) {
    for (const sample of frame) {
      data.setInt16(offset, sample, true);
      offset += 2;
    }
  }
  return new Blob([bytes], { type: "audio/wav" });
}
