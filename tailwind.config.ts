import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        "bg-deep": "var(--bg-deep)",
        "bg-mid": "var(--bg-mid)",
        "bg-surface": "var(--bg-surface)",
        // Accents
        "accent-blue": "var(--accent-blue)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-violet": "var(--accent-violet)",
        // Text
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-instrument)", "serif"],
        // Keep these mapped to manrope for backward compatibility during transition
        grotesk: ["var(--font-manrope)", "sans-serif"],
        inter: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      backgroundImage: {
        // Cinematic mesh gradients
        "mesh-hero":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(77,163,255,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 80%, rgba(123,97,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 70%, rgba(0,229,255,0.08) 0%, transparent 60%)",
        "mesh-section":
          "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(77,163,255,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% -20%, rgba(123,97,255,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 20%, rgba(0,229,255,0.05) 0%, transparent 60%)",
        "gradient-accent":
          "linear-gradient(135deg, #4DA3FF 0%, #7B61FF 50%, #00E5FF 100%)",
        "gradient-surface":
          "linear-gradient(180deg, #10182F 0%, #0A1024 100%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-8px) translateX(4px)" },
          "66%": { transform: "translateY(4px) translateX(-4px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(400%)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease forwards",
        "fade-up": "fade-up 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "spin-reverse": "spin-reverse 15s linear infinite",
        "scan-line": "scan-line 3s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 4px 32px 0 rgba(0,0,0,0.35)",
        "glass-hover": "0 8px 48px 0 rgba(77,163,255,0.12)",
        "accent-glow": "0 0 30px rgba(77,163,255,0.2)",
        "violet-glow": "0 0 30px rgba(123,97,255,0.2)",
        "cyan-glow": "0 0 30px rgba(0,229,255,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
