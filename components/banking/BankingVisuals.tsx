"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { BANK, LAYERS } from "./banking-data";

/* ── Browser-chrome frame around a product capture ─────────────────────────
   All eight captures are 1440x950 from the product's own production build, so
   the aspect ratio is fixed and next/image can reserve the box before the
   bytes arrive. Only the hero is `priority`; everything else waits for the
   viewport.                                                                  */
export function Shot({
  src,
  alt,
  label,
  priority = false,
  sizes = "(min-width: 1024px) 1100px, 100vw",
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure
      className="rounded-[1.1rem] overflow-hidden h-full"
      style={{
        background: BANK.panel,
        border: `1px solid ${BANK.line}`,
        boxShadow: "0 40px 90px -55px rgba(0,0,0,0.85)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "#060C11", borderBottom: `1px solid ${BANK.lineSoft}` }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: BANK.risk }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: BANK.brass }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: BANK.ok }} />
        <span className="ml-3 font-mono text-[11px] truncate" style={{ color: BANK.faint }}>
          {label}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={950}
        quality={75}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        className="w-full h-auto block"
      />
    </figure>
  );
}

/* ── 404-vs-403 comparison ─────────────────────────────────────────────────
   The single strongest item on the page, so it gets a picture rather than a
   paragraph. Two request/response pairs side by side: the point is that both
   columns end in a response the attacker cannot tell apart.                  */
function ProbeCard({
  id,
  verdict,
  reveals,
  tone,
}: {
  id: string;
  verdict: string;
  reveals: string;
  tone: "bad" | "good";
}) {
  const accent = tone === "bad" ? BANK.risk : BANK.ok;
  return (
    <div
      className="rounded-2xl p-5 h-full flex flex-col"
      style={{
        background: BANK.panel,
        border: `1px solid ${BANK.line}`,
        boxShadow: `inset 3px 0 0 0 ${accent}`,
      }}
    >
      <p className="font-mono text-[11px] mb-3" style={{ color: BANK.faint }}>
        GET /api/customers/{id}
      </p>
      <p className="font-mono font-bold text-[22px] mb-2" style={{ color: accent }}>
        {verdict}
      </p>
      <p className="font-manrope text-[12.5px] leading-relaxed mt-auto" style={{ color: BANK.muted }}>
        {reveals}
      </p>
    </div>
  );
}

export function IdorDiagram() {
  return (
    <div className="grid gap-5">
      <m.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="font-mono text-[10px] uppercase tracking-[0.24em] mb-3"
          style={{ color: BANK.risk }}
        >
          The intuitive answer
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <ProbeCard
            id="1001"
            verdict="403"
            reveals="Forbidden. The record exists — you just can't have it."
            tone="bad"
          />
          <ProbeCard
            id="9999"
            verdict="404"
            reveals="Not found. No such record."
            tone="bad"
          />
        </div>
        <p
          className="font-manrope text-[13px] leading-relaxed mt-4"
          style={{ color: BANK.muted }}
        >
          Two different responses. Walk the id space and the difference between
          them hands you every valid customer id in the bank — without reading a
          single record.
        </p>
      </m.div>

      <div className="flex items-center gap-3 py-1" aria-hidden>
        <span className="h-px flex-1" style={{ background: BANK.line }} />
        <span
          className="font-mono text-[9.5px] uppercase tracking-[0.24em]"
          style={{ color: BANK.faint }}
        >
          so instead
        </span>
        <span className="h-px flex-1" style={{ background: BANK.line }} />
      </div>

      <m.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
      >
        <p
          className="font-mono text-[10px] uppercase tracking-[0.24em] mb-3"
          style={{ color: BANK.ok }}
        >
          What it actually returns
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <ProbeCard
            id="1001"
            verdict="404"
            reveals="Out of your book. Indistinguishable from absent."
            tone="good"
          />
          <ProbeCard
            id="9999"
            verdict="404"
            reveals="Genuinely absent. Indistinguishable from out of book."
            tone="good"
          />
        </div>
        <p
          className="font-manrope text-[13px] leading-relaxed mt-4"
          style={{ color: BANK.muted }}
        >
          One response. There is no signal left to enumerate against.
        </p>
      </m.div>
    </div>
  );
}

/* ── Defence-in-depth stack ────────────────────────────────────────────────
   Four layers as a vertical spine, each labelled with what it rejects. Drawn
   in markup rather than as an image so it stays legible at any width and
   costs no bytes beyond the CSS.                                            */
export function DefenceStack() {
  return (
    <div className="relative">
      {LAYERS.map((layer, i) => {
        const accent = layer.accent === "brass" ? BANK.brass : BANK.petrol;
        return (
          <div key={layer.n}>
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="rounded-2xl p-5 md:p-6"
              style={{
                background: BANK.panel,
                border: `1px solid ${BANK.line}`,
                boxShadow: `inset 3px 0 0 0 ${accent}`,
              }}
            >
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-mono text-[11px] font-bold" style={{ color: accent }}>
                  {layer.n}
                </span>
                <h3 className="font-manrope font-semibold text-[16px]" style={{ color: BANK.text }}>
                  {layer.title}
                </h3>
              </div>
              <ul className="mt-3 flex flex-col gap-1.5">
                {layer.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span
                      className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                      style={{ background: accent }}
                    />
                    <span
                      className="font-manrope text-[13px] leading-relaxed"
                      style={{ color: BANK.muted }}
                    >
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="font-manrope text-[12.5px] italic leading-relaxed mt-3.5 pt-3.5"
                style={{ color: BANK.faint, borderTop: `1px solid ${BANK.lineSoft}` }}
              >
                {layer.note}
              </p>
            </m.div>

            {i < LAYERS.length - 1 && (
              <div className="flex items-center justify-center gap-2 py-2.5" aria-hidden>
                <span
                  className="font-mono text-[9.5px] uppercase tracking-[0.24em]"
                  style={{ color: BANK.faint }}
                >
                  survives
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={BANK.petrol}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
