"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ND,
  HUE_HEX,
  PERSPECTIVES,
  LIGHTNING_CHAIN,
  GOSSIP_DEEDS,
  WANTED_TIERS,
  JOB_SHIFTS,
  SYSTEMS_LEDGER,
  ALL_SHOTS,
  type Shot,
  type JobWave,
  type SystemScale,
} from "./pixelville-nd-data";

/* ── 1. Extruded 3D Wordmark Badge (matches in-game logo geometry) ───────── */
export function DimensionWordmark() {
  return (
    <div className="inline-flex flex-col items-center select-none" aria-hidden="true">
      <div className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-[#0f1626]/90 shadow-[0_10px_30px_-10px_rgba(165,139,255,0.45)]">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            background: ND.gold,
            boxShadow: `0 0 10px ${ND.gold}`,
          }}
        />
        <span
          className="font-dmmono text-[11px] font-bold uppercase tracking-[0.26em]"
          style={{
            color: ND.goldBright,
            textShadow: `0 2px 0 ${ND.violetDeep}`,
          }}
        >
          PIXELVILLE · NEXT DIMENSION
        </span>
        <span
          className="rounded px-1.5 py-0.5 font-dmmono text-[9.5px] font-semibold uppercase tracking-[0.14em]"
          style={{
            background: ND.violetSoft,
            color: ND.violet,
            border: "1px solid rgba(165,139,255,0.32)",
          }}
        >
          3D V2
        </span>
      </div>
    </div>
  );
}

/* ── 2. Dual-Mode Switcher: Street Founder Avatar ⇄ Aerial God Planner ───── */
export function DualPerspectiveSwitcher() {
  const [activeId, setActiveId] = useState<"founder" | "planner">("founder");
  const mode = PERSPECTIVES.find((p) => p.id === activeId) ?? PERSPECTIVES[0];
  const accent = HUE_HEX[mode.hue];

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: ND.panel,
        border: `1px solid ${ND.line}`,
        boxShadow: "0 28px 80px -24px rgba(0,0,0,0.75)",
      }}
    >
      {/* Top switcher bar */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:px-6"
        style={{
          background: ND.nightDeep,
          borderBottom: `1px solid ${ND.line}`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
          <span className="font-dmmono text-[11px] uppercase tracking-[0.22em]" style={{ color: ND.muted }}>
            DUAL-PERSPECTIVE ENGINE · ONE SHARED SIMULATION
          </span>
        </div>

        <div
          className="grid grid-cols-2 gap-1.5 p-1 rounded-xl"
          role="tablist"
          aria-label="Choose gameplay perspective"
          style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
        >
          {PERSPECTIVES.map((p) => {
            const selected = p.id === activeId;
            const c = HUE_HEX[p.hue];
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(p.id)}
                className="px-3.5 py-2 rounded-lg font-dmmono text-[11px] font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer text-center"
                style={
                  selected
                    ? {
                        background: c,
                        color: ND.nightDeep,
                        boxShadow: `0 6px 20px -6px ${c}`,
                      }
                    : {
                        background: "transparent",
                        color: ND.muted,
                      }
                }
              >
                {p.id === "founder" ? "01 · God Avatar (Street)" : "02 · God Planner (Sky)"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active mode body */}
      <div className="p-5 sm:p-8">
        <div className="grid lg:grid-cols-12 gap-7 items-start">
          {/* Left: Narrative + 4 capabilities */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span
                className="font-dmmono text-[10px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-md"
                style={{
                  background: mode.id === "founder" ? ND.violetSoft : ND.goldSoft,
                  color: accent,
                  border: `1px solid ${accent}44`,
                }}
              >
                {mode.badge}
              </span>
              <span
                className="font-dmmono text-[10.5px] px-2.5 py-1 rounded-md"
                style={{
                  background: ND.nightDeep,
                  color: ND.text,
                  border: `1px solid ${ND.line}`,
                }}
              >
                {mode.hotkey}
              </span>
            </div>

            <h3 className="font-syne font-bold text-2xl sm:text-3xl tracking-tight mb-2" style={{ color: ND.snow }}>
              {mode.title}
            </h3>
            <p className="font-manrope text-[15px] font-medium leading-relaxed mb-4" style={{ color: accent }}>
              {mode.subtitle}
            </p>
            <p className="font-manrope text-[14px] leading-[1.75] mb-6" style={{ color: ND.muted }}>
              {mode.summary}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {mode.capabilities.map((cap) => (
                <div
                  key={cap.head}
                  className="rounded-xl p-4"
                  style={{ background: ND.panelHi, border: `1px solid ${ND.line}` }}
                >
                  <div className="font-syne font-bold text-[14px] mb-1.5" style={{ color: ND.snow }}>
                    {cap.head}
                  </div>
                  <p className="font-manrope text-[12.5px] leading-[1.6]" style={{ color: ND.muted }}>
                    {cap.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Fair-play constraint callout */}
            <div
              className="rounded-xl px-4 py-3 font-dmmono text-[11.5px] leading-relaxed"
              style={{
                background: ND.nightDeep,
                borderLeft: `3px solid ${accent}`,
                color: ND.text,
              }}
            >
              {mode.constraint}
            </div>
          </div>

          {/* Right: Stacked live screenshots + keycap strip */}
          <div className="lg:col-span-6 space-y-4">
            <figure
              className="rounded-2xl overflow-hidden"
              style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}
            >
              <Image
                src={mode.primaryShot.src}
                alt={mode.primaryShot.alt}
                width={mode.primaryShot.w}
                height={mode.primaryShot.h}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="w-full h-auto block"
              />
              <figcaption className="px-4 py-2.5 font-manrope text-[12px]" style={{ color: ND.muted }}>
                <strong style={{ color: ND.snow }}>{mode.primaryShot.title}:</strong> {mode.primaryShot.caption}
              </figcaption>
            </figure>

            <figure
              className="rounded-2xl overflow-hidden"
              style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}
            >
              <Image
                src={mode.secondaryShot.src}
                alt={mode.secondaryShot.alt}
                width={mode.secondaryShot.w}
                height={mode.secondaryShot.h}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="w-full h-auto block"
              />
              <figcaption className="px-4 py-2.5 font-manrope text-[12px]" style={{ color: ND.muted }}>
                <strong style={{ color: ND.snow }}>{mode.secondaryShot.title}:</strong> {mode.secondaryShot.caption}
              </figcaption>
            </figure>

            {/* Keybindings for this perspective */}
            <div
              className="rounded-xl p-4"
              style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}
            >
              <div className="font-dmmono text-[10px] uppercase tracking-[0.2em] mb-2.5" style={{ color: ND.faint }}>
                DEFAULT CONTROLS (FULLY REBINDABLE + GAMEPAD & TOUCH)
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {mode.controls.map((c) => (
                  <div key={c.key} className="flex items-center gap-2 text-[12px]">
                    <kbd
                      className="shrink-0 rounded px-2 py-0.5 font-dmmono text-[10.5px] font-semibold"
                      style={{
                        background: ND.panelHi,
                        color: accent,
                        border: `1px solid ${ND.line}`,
                      }}
                    >
                      {c.key}
                    </kbd>
                    <span className="font-manrope truncate" style={{ color: ND.muted }}>
                      {c.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3. Interactive Cascading Causality Chain ("One Lightning Strike") ──── */
export function CausalityChainInteractive() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = LIGHTNING_CHAIN[selectedIdx];
  const accent = HUE_HEX[current.hue];

  return (
    <div
      className="rounded-3xl p-5 sm:p-7"
      style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div className="font-dmmono text-[11px] uppercase tracking-[0.22em]" style={{ color: ND.gold }}>
          END-TO-END AUTOMATED TEST CHAIN · ZERO SCRIPTED CUTSCENES
        </div>
        <span className="font-dmmono text-[11px]" style={{ color: ND.faint }}>
          Click any link in the chain to inspect its simulation module
        </span>
      </div>

      {/* 6-step horizontal/grid chain — all steps visible in SSR HTML */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-2.5 mb-6">
        {LIGHTNING_CHAIN.map((item, idx) => {
          const active = idx === selectedIdx;
          const c = HUE_HEX[item.hue];
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              aria-pressed={active}
              className="text-left rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between"
              style={
                active
                  ? {
                      background: ND.panelHi,
                      border: `1px solid ${c}`,
                      boxShadow: `0 10px 28px -12px ${c}`,
                    }
                  : {
                      background: ND.nightDeep,
                      border: `1px solid ${ND.line}`,
                    }
              }
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="font-dmmono text-[10px] font-bold" style={{ color: c }}>
                    STEP {item.step}
                  </span>
                  {idx < LIGHTNING_CHAIN.length - 1 && (
                    <span className="font-dmmono text-[11px]" style={{ color: ND.faint }} aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
                <div className="font-dmmono text-[9.5px] uppercase tracking-[0.14em] mb-1" style={{ color: ND.faint }}>
                  {item.domain}
                </div>
                <div className="font-syne font-bold text-[13px] leading-snug" style={{ color: ND.snow }}>
                  {item.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed inspector panel for selected step */}
      <div
        className="rounded-2xl p-5 sm:p-6 grid md:grid-cols-12 gap-5 items-center"
        style={{
          background: ND.nightDeep,
          border: `1px solid ${accent}55`,
        }}
      >
        <div className="md:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span
              className="font-dmmono text-[10.5px] font-bold px-2.5 py-0.5 rounded"
              style={{ background: accent, color: ND.nightDeep }}
            >
              STEP {current.step} · {current.domain}
            </span>
            <code className="font-dmmono text-[11.5px]" style={{ color: ND.muted }}>
              {current.module}
            </code>
          </div>
          <h4 className="font-syne font-bold text-xl mb-2" style={{ color: ND.snow }}>
            {current.title}
          </h4>
          <p className="font-manrope text-[14px] leading-[1.75]" style={{ color: ND.text }}>
            {current.whatHappens}
          </p>
        </div>

        <div
          className="md:col-span-5 rounded-xl p-4"
          style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
        >
          <div className="font-dmmono text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ color: accent }}>
            COUNTERPLAY & MISSING-INFRASTRUCTURE CONSEQUENCE
          </div>
          <p className="font-manrope text-[13px] leading-[1.65]" style={{ color: ND.muted }}>
            {current.ifMissing}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 4. Interactive 3-Hop Hearsay & Reputation Ripple Explorer ──────────── */
export function GossipNetworkExplorer() {
  const [deedId, setDeedId] = useState(GOSSIP_DEEDS[0].id);
  const current = GOSSIP_DEEDS.find((d) => d.id === deedId) ?? GOSSIP_DEEDS[0];
  const accent = current.positive ? ND.emerald : ND.crimson;

  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <div className="font-dmmono text-[10.5px] uppercase tracking-[0.22em] mb-1" style={{ color: ND.violet }}>
            3-HOP GOSSIP & REPUTATION PROPAGATION (src/sim/reputation.ts)
          </div>
          <h4 className="font-syne font-bold text-lg" style={{ color: ND.snow }}>
            Pick a Founder street action to trace how word travels
          </h4>
        </div>
        <span
          className="self-start sm:self-auto font-dmmono text-[11.5px] font-bold px-3 py-1 rounded-full"
          style={{
            background: current.positive ? ND.emeraldSoft : ND.crimsonSoft,
            color: accent,
            border: `1px solid ${accent}55`,
          }}
        >
          {current.delta}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {GOSSIP_DEEDS.map((d) => {
          const active = d.id === deedId;
          const c = d.positive ? ND.emerald : ND.crimson;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setDeedId(d.id)}
              aria-pressed={active}
              className="px-3.5 py-2 rounded-xl font-manrope text-[12.5px] font-semibold transition-all cursor-pointer"
              style={
                active
                  ? { background: c, color: ND.nightDeep }
                  : { background: ND.nightDeep, color: ND.muted, border: `1px solid ${ND.line}` }
              }
            >
              {d.deed}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        {[
          { tag: "HOP 0 · EYEWITNESSES", text: current.hop0 },
          { tag: "HOP 1 · STREET & DINNER TABLE", text: current.hop1 },
          { tag: "HOP 2–3 · COWORKERS & PVTV", text: current.hop2 },
        ].map((hop) => (
          <div
            key={hop.tag}
            className="rounded-xl p-4"
            style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}
          >
            <div className="font-dmmono text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ color: accent }}>
              {hop.tag}
            </div>
            <p className="font-manrope text-[13px] leading-[1.65]" style={{ color: ND.text }}>
              {hop.text}
            </p>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl px-4 py-3.5 font-manrope text-[13.5px] leading-relaxed"
        style={{
          background: ND.panelHi,
          borderLeft: `3px solid ${accent}`,
          color: ND.snow,
        }}
      >
        <strong className="font-dmmono text-[11px] uppercase tracking-[0.14em] mr-2" style={{ color: accent }}>
          Street consequence:
        </strong>
        {current.streetEffect}
      </div>
    </div>
  );
}

/* ── 5. Interactive 1★–5★ Wanted Escalation Console ─────────────────────── */
export function WantedConsole() {
  const [stars, setStars] = useState(3);
  const tier = WANTED_TIERS.find((t) => t.stars === stars) ?? WANTED_TIERS[2];

  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <div className="font-dmmono text-[10.5px] uppercase tracking-[0.22em] mb-1" style={{ color: ND.crimson }}>
            REAL ROAD-DISPATCHED PURSUIT · LINE-OF-SIGHT WITNESSES
          </div>
          <h4 className="font-syne font-bold text-xl" style={{ color: ND.snow }}>
            Select a Wanted level to inspect police response
          </h4>
        </div>

        <div className="flex items-center gap-1.5" role="group" aria-label="Wanted level selector">
          {WANTED_TIERS.map((t) => {
            const lit = t.stars <= stars;
            const current = t.stars === stars;
            return (
              <button
                key={t.stars}
                type="button"
                onClick={() => setStars(t.stars)}
                aria-label={`${t.stars} star wanted level`}
                aria-pressed={current}
                className="h-10 px-3 rounded-xl font-dmmono text-sm font-bold transition-all cursor-pointer"
                style={{
                  background: current ? ND.crimson : lit ? ND.crimsonSoft : ND.nightDeep,
                  color: current ? ND.nightDeep : lit ? ND.crimson : ND.faint,
                  border: `1px solid ${lit ? ND.crimson : ND.line}`,
                }}
              >
                {"★".repeat(t.stars)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl p-4" style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}>
          <div className="font-dmmono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: ND.crimson }}>
            TRIGGER CONDITION
          </div>
          <p className="font-manrope text-[13px] leading-relaxed" style={{ color: ND.text }}>
            {tier.trigger}
          </p>
        </div>

        <div className="rounded-xl p-4" style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}>
          <div className="font-dmmono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: ND.amber }}>
            STATION DISPATCH
          </div>
          <p className="font-manrope text-[13px] leading-relaxed" style={{ color: ND.text }}>
            {tier.dispatch}
          </p>
        </div>

        <div className="rounded-xl p-4" style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}>
          <div className="font-dmmono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: ND.violet }}>
            INTERCEPT TACTICS
          </div>
          <p className="font-manrope text-[13px] leading-relaxed" style={{ color: ND.text }}>
            {tier.tactics}
          </p>
        </div>

        <div className="rounded-xl p-4" style={{ background: ND.nightDeep, border: `1px solid ${ND.line}` }}>
          <div className="font-dmmono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: ND.emerald }}>
            ESCAPE & BUST PENALTY
          </div>
          <p className="font-manrope text-[13px] leading-relaxed" style={{ color: ND.text }}>
            Break sightlines for <strong style={{ color: ND.snow }}>{tier.escapeSec}s</strong> per star drop · {tier.fine}.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 6. Interactive 13 Job Shifts Wave Filter (SSR renders all 13!) ─────── */
export function JobShiftsExplorer() {
  const [wave, setWave] = useState<"All" | JobWave>("All");
  const waves: ("All" | JobWave)[] = ["All", "Emergency", "Driving", "Rails & Skies", "Town & Media"];
  const visible = wave === "All" ? JOB_SHIFTS : JOB_SHIFTS.filter((j) => j.wave === wave);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {waves.map((w) => {
            const active = w === wave;
            const count = w === "All" ? JOB_SHIFTS.length : JOB_SHIFTS.filter((j) => j.wave === w).length;
            return (
              <button
                key={w}
                type="button"
                onClick={() => setWave(w)}
                aria-pressed={active}
                className="px-3.5 py-1.5 rounded-full font-dmmono text-[11px] font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer"
                style={
                  active
                    ? { background: ND.gold, color: ND.nightDeep }
                    : { background: ND.panel, color: ND.muted, border: `1px solid ${ND.line}` }
                }
              >
                {w} ({count})
              </button>
            );
          })}
        </div>

        <div className="font-dmmono text-[11px]" style={{ color: ND.muted }}>
          Pay = <code style={{ color: ND.gold }}>(hourly × hrs + task) × (0.7 + 0.1 × ★)</code>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((job, idx) => (
          <article
            key={job.id}
            className="rounded-2xl p-5 flex flex-col justify-between"
            style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span
                  className="font-dmmono text-[10px] font-semibold uppercase tracking-[0.16em] px-2 py-0.5 rounded"
                  style={{ background: ND.panelHi, color: ND.gold }}
                >
                  {String(idx + 1).padStart(2, "0")} · {job.wave}
                </span>
                <span className="font-dmmono text-[10.5px]" style={{ color: ND.faint }}>
                  {job.workplace}
                </span>
              </div>

              <h4 className="font-syne font-bold text-lg mb-1" style={{ color: ND.snow }}>
                {job.title}
              </h4>
              <div className="font-dmmono text-[11px] mb-3" style={{ color: ND.sky }}>
                Rig: {job.vehicle}
              </div>

              <p className="font-manrope text-[13px] leading-[1.65] mb-3.5" style={{ color: ND.muted }}>
                {job.loop}
              </p>
            </div>

            <div
              className="rounded-xl p-3 space-y-1.5"
              style={{ background: ND.nightDeep, border: `1px solid ${ND.lineSoft}` }}
            >
              <div className="font-manrope text-[12px] leading-snug" style={{ color: ND.text }}>
                <strong style={{ color: ND.emerald }}>Village effect:</strong> {job.simImpact}
              </div>
              <div className="font-dmmono text-[10.5px]" style={{ color: ND.faint }}>
                Paid from: {job.paySource}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ── 7. Complete A–Z Systems Ledger (All 58 rendered on SSR + instant filter) */
export function SystemsLedgerExplorer() {
  const [scaleFilter, setScaleFilter] = useState<"All" | SystemScale>("All");
  const [catFilter, setCatFilter] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categories = ["All", "Minds & AI", "Street & GTA", "Economy & Civic", "Transit & Infra", "World & Engine"];

  const filtered = SYSTEMS_LEDGER.filter((s) => {
    if (scaleFilter !== "All" && s.scale !== scaleFilter) return false;
    if (catFilter !== "All" && s.category !== catFilter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.detail.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const scaleBadge = (scale: SystemScale) => {
    if (scale === "Big") return { bg: ND.goldSoft, fg: ND.gold };
    if (scale === "Medium") return { bg: ND.violetSoft, fg: ND.violet };
    return { bg: ND.skySoft, fg: ND.sky };
  };

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
    >
      {/* Controls bar */}
      <div
        className="p-4 sm:p-6 space-y-4"
        style={{ background: ND.nightDeep, borderBottom: `1px solid ${ND.line}` }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {(["All", "Big", "Medium", "Small"] as const).map((sc) => {
              const active = scaleFilter === sc;
              const count =
                sc === "All"
                  ? SYSTEMS_LEDGER.length
                  : SYSTEMS_LEDGER.filter((x) => x.scale === sc).length;
              return (
                <button
                  key={sc}
                  type="button"
                  onClick={() => setScaleFilter(sc)}
                  aria-pressed={active}
                  className="px-3 py-1.5 rounded-lg font-dmmono text-[11px] font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer"
                  style={
                    active
                      ? { background: ND.gold, color: ND.nightDeep }
                      : { background: ND.panel, color: ND.muted, border: `1px solid ${ND.line}` }
                  }
                >
                  {sc === "All" ? `All Systems (${count})` : `${sc} (${count})`}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any logic, e.g. thaw, zebra, AI..."
              aria-label="Search game systems"
              className="w-full rounded-xl px-3.5 py-2 font-manrope text-[13px] outline-none"
              style={{
                background: ND.panel,
                color: ND.snow,
                border: `1px solid ${ND.line}`,
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const active = catFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCatFilter(cat)}
                aria-pressed={active}
                className="px-2.5 py-1 rounded-md font-dmmono text-[10.5px] transition-all cursor-pointer"
                style={
                  active
                    ? { background: ND.violet, color: ND.nightDeep, fontWeight: 700 }
                    : { background: "transparent", color: ND.faint, border: `1px solid ${ND.lineSoft}` }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Semantic HTML table — 100% SSR crawlable */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ background: ND.panelHi, borderBottom: `1px solid ${ND.line}` }}>
              <th className="py-3 px-4 sm:px-6 font-dmmono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: ND.muted }}>
                System / Feature
              </th>
              <th className="py-3 px-3 font-dmmono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: ND.muted }}>
                Scale
              </th>
              <th className="py-3 px-3 font-dmmono text-[10.5px] uppercase tracking-[0.18em] hidden sm:table-cell" style={{ color: ND.muted }}>
                Domain
              </th>
              <th className="py-3 px-4 sm:px-6 font-dmmono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: ND.muted }}>
                How the intelligence works
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const badge = scaleBadge(item.scale);
              return (
                <tr
                  key={item.name}
                  className="transition-colors hover:bg-white/[0.03]"
                  style={{ borderBottom: `1px solid ${ND.lineSoft}` }}
                >
                  <td className="py-3.5 px-4 sm:px-6 font-syne font-bold text-[14px] align-top whitespace-nowrap" style={{ color: ND.snow }}>
                    {item.name}
                  </td>
                  <td className="py-3.5 px-3 align-top">
                    <span
                      className="inline-block font-dmmono text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded"
                      style={{ background: badge.bg, color: badge.fg }}
                    >
                      {item.scale}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-dmmono text-[11px] align-top whitespace-nowrap hidden sm:table-cell" style={{ color: ND.faint }}>
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-manrope text-[13px] leading-[1.65] align-top" style={{ color: ND.muted }}>
                    {item.detail}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-center font-manrope text-sm" style={{ color: ND.muted }}>
                  No system matched &ldquo;{query}&rdquo; — reset filters to view all {SYSTEMS_LEDGER.length} entries.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── 8. All-20 Screenshot Gallery with Filter & Keyboard Lightbox ────────── */
export function GalleryShowcase() {
  const tags = ["All", "Street & Avatar", "God Planner", "World & Shaders", "HUD & Controls"] as const;
  const [tag, setTag] = useState<(typeof tags)[number]>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const visible: Shot[] = tag === "All" ? ALL_SHOTS : ALL_SHOTS.filter((s) => s.tag === tag);

  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
  }, [visible.length]);
  const next = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : (i + 1) % visible.length));
  }, [visible.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, close, prev, next]);

  const activeShot = lightboxIdx !== null ? visible[lightboxIdx] : null;

  return (
    <div>
      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((t) => {
          const active = tag === t;
          const count = t === "All" ? ALL_SHOTS.length : ALL_SHOTS.filter((s) => s.tag === t).length;
          return (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTag(t);
                setLightboxIdx(null);
              }}
              aria-pressed={active}
              className="px-3.5 py-1.5 rounded-full font-dmmono text-[11px] font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer"
              style={
                active
                  ? { background: ND.gold, color: ND.nightDeep }
                  : { background: ND.panel, color: ND.muted, border: `1px solid ${ND.line}` }
              }
            >
              {t} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid of screenshots */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((shot, idx) => (
          <button
            key={shot.id}
            type="button"
            onClick={() => setLightboxIdx(idx)}
            className="group text-left rounded-2xl overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
          >
            <div
              className="relative w-full aspect-video flex items-center justify-center overflow-hidden"
              style={{ background: ND.nightDeep }}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.w}
                height={shot.h}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                className="absolute top-2.5 left-2.5 rounded-md px-2 py-0.5 font-dmmono text-[9.5px] uppercase tracking-[0.14em]"
                style={{
                  background: "rgba(5, 8, 15, 0.82)",
                  color: ND.gold,
                  border: `1px solid ${ND.line}`,
                }}
              >
                {shot.tag}
              </span>
            </div>
            <div className="p-4">
              <div className="font-syne font-bold text-[14.5px] mb-1" style={{ color: ND.snow }}>
                {shot.title}
              </div>
              <p className="font-manrope text-[12.5px] leading-relaxed" style={{ color: ND.muted }}>
                {shot.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox modal */}
      {activeShot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeShot.title}
          onClick={close}
          className="fixed inset-0 z-[10200] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full rounded-2xl overflow-hidden"
            style={{ background: ND.panel, border: `1px solid ${ND.line}` }}
          >
            <div
              className="flex items-center justify-between gap-4 px-5 py-3"
              style={{ background: ND.nightDeep, borderBottom: `1px solid ${ND.line}` }}
            >
              <div>
                <span className="font-dmmono text-[10px] uppercase tracking-[0.18em] mr-2.5" style={{ color: ND.gold }}>
                  {lightboxIdx! + 1} / {visible.length} · {activeShot.tag}
                </span>
                <strong className="font-syne text-sm sm:text-base" style={{ color: ND.snow }}>
                  {activeShot.title}
                </strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="px-2.5 py-1 rounded-lg font-dmmono text-xs cursor-pointer"
                  style={{ background: ND.panelHi, color: ND.snow, border: `1px solid ${ND.line}` }}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next screenshot"
                  className="px-2.5 py-1 rounded-lg font-dmmono text-xs cursor-pointer"
                  style={{ background: ND.panelHi, color: ND.snow, border: `1px solid ${ND.line}` }}
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close preview"
                  className="px-3 py-1 rounded-lg font-dmmono text-xs cursor-pointer"
                  style={{ background: ND.gold, color: ND.nightDeep, fontWeight: 700 }}
                >
                  ESC
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-5 flex items-center justify-center max-h-[75vh]" style={{ background: ND.nightDeep }}>
              <Image
                src={activeShot.src}
                alt={activeShot.alt}
                width={activeShot.w}
                height={activeShot.h}
                sizes="(min-width: 1024px) 980px, 95vw"
                className="max-h-[70vh] w-auto object-contain rounded-lg"
              />
            </div>

            <div className="px-5 py-3.5 font-manrope text-[13px]" style={{ color: ND.muted }}>
              {activeShot.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
