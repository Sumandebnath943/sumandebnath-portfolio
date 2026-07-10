"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { AEGIS, ENVELOPE } from "./aegis-data";

/* ── Dark browser-chrome frame around a product screenshot ─────────────────── */
export function ScreenshotFrame({
  src,
  label,
  alt,
  w,
  h,
  priority = false,
}: {
  src: string;
  label: string;
  alt: string;
  w: number;
  h: number;
  priority?: boolean;
}) {
  return (
    <figure
      className="rounded-[1.1rem] overflow-hidden h-full"
      style={{
        background: AEGIS.panel,
        border: `1px solid ${AEGIS.line}`,
        boxShadow: "0 40px 90px -55px rgba(0,0,0,0.8)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "#08080A", borderBottom: `1px solid ${AEGIS.lineSoft}` }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F1655B" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: AEGIS.amber }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: AEGIS.emerald }} />
        <span className="ml-3 font-mono text-[11px]" style={{ color: AEGIS.faint }}>
          aegis · {label}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="w-full h-auto block"
        sizes="(min-width: 768px) 640px, 100vw"
      />
    </figure>
  );
}

/* ── Envelope-encryption flow ──────────────────────────────────────────────
   A vertical spine that walks the key hierarchy: master password → KDF →
   master key → data-encryption key → note ciphertext. Each hop is labelled
   with the operation, so the "keys wrap keys" idea reads at a glance.        */
const HOPS = ["key derivation", "produces", "wraps (encrypts)", "encrypts"];

export function EnvelopeDiagram() {
  return (
    <div className="relative max-w-xl mx-auto">
      {ENVELOPE.map((stage, i) => {
        const accent = AEGIS[stage.accent] as string;
        return (
          <div key={stage.key}>
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
              className="relative rounded-2xl p-5 pl-6"
              style={{
                background: AEGIS.panel,
                border: `1px solid ${AEGIS.line}`,
                boxShadow: `inset 3px 0 0 0 ${accent}`,
              }}
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h4 className="font-manrope font-semibold text-[15px]" style={{ color: AEGIS.text }}>
                  {stage.key}
                </h4>
                <span className="font-mono text-[11px]" style={{ color: accent }}>
                  {stage.sub}
                </span>
              </div>
              <p className="font-manrope text-[12.5px] leading-relaxed mt-1.5" style={{ color: AEGIS.muted }}>
                {stage.note}
              </p>
            </m.div>

            {i < ENVELOPE.length - 1 && (
              <div className="flex items-center justify-center gap-2 py-2.5" aria-hidden>
                <span
                  className="font-mono text-[9.5px] uppercase tracking-[0.24em]"
                  style={{ color: AEGIS.faint }}
                >
                  {HOPS[i]}
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={AEGIS.emerald} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
