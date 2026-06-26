/* ─────────────────────────────────────────────────────────────────────────
 *  Forget Anything? — Shared Landing-Page Data
 *  Plain .ts file (no "use client") so the server component can import it.
 * ────────────────────────────────────────────────────────────────────────── */

/* ── Brand colours ─────────────────────────────────────────────────────── */
export const FA_COLORS = {
  emeraldDeep: "#0A2E1C",
  emeraldMid: "#0C3524",
  emeraldLight: "#50C878",
  emeraldAccent: "#2E8B57",
  gold: "#D4AF37",
  goldBright: "#DAA520",
  goldLight: "#FCF6BA",
  cream: "#FAFAF7",
  warmGray: "#F5F3EE",
  charcoal: "#1a1a1a",
} as const;

/* ── Trust badges (section 2) ──────────────────────────────────────────── */
export const TRUST_BADGES = [
  { icon: "🤖", label: "Android" },
  { icon: "📴", label: "100% Offline" },
  { icon: "🔋", label: "Zero Battery Drain" },
  { icon: "✨", label: "AI-Assisted Build" },
  { icon: "🛡️", label: "Privacy-First" },
] as const;

/* ── How-it-works steps (section 4) ────────────────────────────────────── */
export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect to Home WiFi",
    description:
      "The app registers your home WiFi network. No GPS needed — just your existing WiFi.",
    icon: "wifi",
  },
  {
    step: "02",
    title: "Leave Home",
    description:
      "The moment you disconnect from your home WiFi — or exit your geofence — the app knows.",
    icon: "departure",
  },
  {
    step: "03",
    title: "Get Your Checklist",
    description:
      "A smart notification appears with your personalised essentials. Tap, check, go.",
    icon: "bell",
  },
] as const;

/* ── Feature cards (section 5) ─────────────────────────────────────────── */
export const FEATURES = [
  {
    title: "Geofence Detection",
    description:
      "Get reminded when you leave your defined home radius. Default 100 m — fully adjustable.",
    icon: "geofence",
  },
  {
    title: "WiFi Monitoring",
    description:
      "Alerts trigger the instant you disconnect from your home WiFi. No GPS, no battery drain.",
    icon: "wifi",
  },
  {
    title: "Combined Accuracy",
    description:
      "Use both triggers together for maximum accuracy and fewer false positives.",
    icon: "combined",
  },
] as const;

/* ── Modes ──────────────────────────────────────────────────────────────── */
export const MODES = [
  {
    name: "Daily Mode",
    description:
      "For your everyday routine. Keys, wallet, phone, glasses — never forget the essentials for work or school.",
    icon: "📅",
  },
  {
    name: "Trip Mode",
    description:
      "Going on a vacation or business trip? Set date ranges and build a custom packing list.",
    icon: "✈️",
  },
] as const;

/* ── Tech stack (section 7) ────────────────────────────────────────────── */
export const TECH_STACK = [
  { name: "Kotlin", description: "Foreground Service & Native Layer", color: "#7F52FF" },
  { name: "React", description: "UI Component Architecture", color: "#61DAFB" },
  { name: "Vite", description: "Lightning-Fast Build Tool", color: "#646CFF" },
  { name: "Capacitor", description: "Native Bridge & Runtime", color: "#119EFF" },
  { name: "Room DB", description: "On-Device Structured Storage", color: "#4CAF50" },
  { name: "Framer Motion", description: "Fluid UI Animations", color: "#FF0055" },
] as const;

/* ── AI-assisted files ─────────────────────────────────────────────────── */
export const AI_ASSISTED_FILES = [
  { file: "WifiMonitorService.kt", purpose: "Foreground service for persistent WiFi monitoring" },
  { file: "WifiBroadcastReceiver.kt", purpose: "Listens for WiFi state change events" },
  { file: "NotificationHelper.kt", purpose: "Creates and manages departure notifications" },
  { file: "ReminderPlugin.ts", purpose: "Native bridge — syncs JS settings to Android" },
] as const;

/* ── Privacy pillars (section 8) ───────────────────────────────────────── */
export const PRIVACY_PILLARS = [
  {
    title: "No Internet Permission",
    description: "The app never asks for — and never needs — internet access. Period.",
    icon: "🔒",
  },
  {
    title: "100% On-Device",
    description: "All processing happens locally. Your essentials list never leaves your phone.",
    icon: "📱",
  },
  {
    title: "Zero Data Collection",
    description: "No analytics, no tracking, no telemetry. Your data is yours alone.",
    icon: "🚫",
  },
] as const;

/* ── Stats for visual impact ───────────────────────────────────────────── */
export const STATS = [
  { value: "0%", label: "Battery Drain" },
  { value: "100%", label: "Offline" },
  { value: "0", label: "Servers Needed" },
  { value: "2s", label: "WiFi Debounce" },
] as const;
