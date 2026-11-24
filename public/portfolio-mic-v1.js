// The browser audio thread delivers 20 ms of mono PCM at 16 kHz at a time.
class PortfolioMicrophone extends AudioWorkletProcessor {
  constructor() {
    super();
    this.enabled = false;
    this.frame = new Int16Array(320);
    this.offset = 0;
    this.phase = 0;
    this.sum = 0;
    this.samples = 0;
    this.port.onmessage = ({ data }) => {
      this.enabled = data === true;
      this.offset = this.phase = this.sum = this.samples = 0;
    };
  }

  process(inputs) {
    const channel = inputs[0]?.[0];
    if (!this.enabled || !channel) return true;
    for (const sample of channel) {
      this.sum += sample;
      this.samples += 1;
      this.phase += 16_000;
      if (this.phase < sampleRate) continue;
      this.phase -= sampleRate;
      const value = Math.max(-1, Math.min(1, this.sum / this.samples));
      this.frame[this.offset++] = Math.round(value * 32767);
      this.sum = this.samples = 0;
      if (this.offset < this.frame.length) continue;
      this.port.postMessage(this.frame, [this.frame.buffer]);
      this.frame = new Int16Array(320);
      this.offset = 0;
    }
    return true;
  }
}

registerProcessor("portfolio-microphone", PortfolioMicrophone);
