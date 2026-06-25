/* Shared PentaCMD palette — a plain module (no "use client") so the data can
   be used in both the server page and the client visual components without
   crossing a client-reference boundary. */

export const FAMILIES = {
  git: { label: "git", color: "#F97316" },
  powershell: { label: "powershell", color: "#38BDF8" },
  npm: { label: "npm", color: "#F43F5E" },
  python: { label: "python", color: "#FACC15" },
  bash: { label: "bash", color: "#34D399" },
} as const;

export type FamilyKey = keyof typeof FAMILIES;

/* Full spectrum stops used for ribbons, gradients and text. */
export const SPECTRUM = ["#FF3D81", "#F97316", "#FACC15", "#34D399", "#38BDF8", "#A78BFA"];
