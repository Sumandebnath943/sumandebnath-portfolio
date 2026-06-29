/* Shared Qdex-1.5B palette — a plain module (no "use client") so the data can
   be used in both the server page and the client visual components without
   crossing a client-reference boundary. Mirrors components/penta/penta-data.ts. */

/* The model's signature accent (emerald — the colour of the headline result). */
export const QDEX = {
  emerald: "#34D399", // headline result / "after"
  sky: "#38BDF8", // base / data
  violet: "#A78BFA", // QLoRA / adapters
  amber: "#FACC15", // training
  rose: "#F43F5E", // the broken "before" (1.2%)
} as const;

/* Full spectrum stops used for ribbons, gradients and hairlines. */
export const SPECTRUM = ["#34D399", "#38BDF8", "#A78BFA", "#FACC15", "#F43F5E"];

/* HumanEval pass@1 — the three measured bars (the honest before/after). */
export type EvalBar = {
  key: string;
  model: string;
  mode: string;
  pct: number;
  ratio: string; // e.g. "64/164"
  color: string;
  highlight?: boolean;
  note?: string;
};

export const HUMANEVAL: EvalBar[] = [
  {
    key: "base-completion",
    model: "Qwen2.5-Coder-1.5B (base)",
    mode: "raw completion",
    pct: 40.2,
    ratio: "66/164",
    color: QDEX.sky,
    note: "latent coding ability — matches the published paper",
  },
  {
    key: "base-instruction",
    model: "Qwen2.5-Coder-1.5B (base)",
    mode: "instruction",
    pct: 1.2,
    ratio: "2/164",
    color: QDEX.rose,
    note: "couldn't answer when actually asked",
  },
  {
    key: "qdex-instruction",
    model: "Qdex-1.5B (this model)",
    mode: "instruction",
    pct: 39.0,
    ratio: "64/164",
    color: QDEX.emerald,
    highlight: true,
    note: "~97% of latent ability, now usable through instructions",
  },
];
