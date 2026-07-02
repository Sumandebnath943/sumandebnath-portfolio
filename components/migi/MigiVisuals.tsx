"use client";

import { useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { MIGI, SHOTS, FLOW } from "./migi-data";

/* ═══════════════════════════════════════════════════════════════════════════
 *  DashboardShowcase — tabbed viewer for the real dashboard screenshots.
 * ═════════════════════════════════════════════════════════════════════════ */
export function DashboardShowcase() {
  const [active, setActive] = useState(0);
  const shot = SHOTS[active];

  return (
    <div>
      {/* tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SHOTS.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.label}
              onClick={() => setActive(i)}
              className="rounded-full px-4 py-2 font-manrope text-[13px] font-semibold transition-all duration-200"
              style={{
                background: on ? MIGI.ink : "#FFFFFF",
                color: on ? "#FFFFFF" : MIGI.muted,
                border: `1px solid ${on ? MIGI.ink : MIGI.line}`,
                boxShadow: on ? "0 8px 22px -12px rgba(0,0,0,0.4)" : "none",
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* browser frame */}
      <m.div
        key={shot.src}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[1.5rem] overflow-hidden bg-white"
        style={{ border: `1px solid ${MIGI.line}`, boxShadow: "0 40px 90px -50px rgba(0,0,0,0.5)" }}
      >
        <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#F4F3ED", borderBottom: `1px solid ${MIGI.line}` }}>
          <span className="w-3 h-3 rounded-full" style={{ background: "#F1655B" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#F5BF4F" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: MIGI.green }} />
          <span className="ml-3 font-dmmono text-[11px]" style={{ color: MIGI.muted }}>
            migi · {shot.label.toLowerCase()}
          </span>
        </div>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={1366}
          height={768}
          className="w-full h-auto block"
        />
      </m.div>

      <p className="font-manrope text-[13.5px] leading-relaxed mt-5 max-w-2xl" style={{ color: MIGI.muted }}>
        {shot.caption}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  ArchitectureFlow — agents → LLMs → channels → state → dashboard.
 * ═════════════════════════════════════════════════════════════════════════ */
export function ArchitectureFlow() {
  return (
    <div className="rounded-[1.75rem] p-6 sm:p-9" style={{ background: MIGI.ink }}>
      <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-2">
        {FLOW.map((node, i) => (
          <div key={node.id} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-2 lg:flex-1">
            <m.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex-1 rounded-2xl p-4 text-center overflow-hidden"
              style={{
                background: i === 4 ? MIGI.lime : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === 4 ? MIGI.lime : "rgba(255,255,255,0.10)"}`,
              }}
            >
              <p
                className="font-manrope font-bold text-[14px] leading-tight"
                style={{ color: i === 4 ? MIGI.ink : "#FFFFFF" }}
              >
                {node.label}
              </p>
              <p
                className="font-dmmono text-[10px] uppercase tracking-[0.1em] mt-1.5 leading-snug"
                style={{ color: i === 4 ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.4)" }}
              >
                {node.sub}
              </p>
            </m.div>

            {/* connector */}
            {i < FLOW.length - 1 && (
              <span
                aria-hidden
                className="self-center font-dmmono text-lg shrink-0 rotate-90 lg:rotate-0"
                style={{ color: MIGI.lime }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
