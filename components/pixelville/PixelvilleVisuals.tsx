"use client";

/* ═══════════════════════════════════════════════════════════════════════════
 *  PixelVille — client visuals
 *  The animated, in-code "depth" pieces that no screenshot could show as well:
 *   • AutoRoadDemo   — the signature A* pathfinder snaking around a mountain
 *                      and bridging a river, on a pixel grid.
 *   • ElectionBanner — the campaign-week bunting strung across the street.
 *   • SeasonStrip    — the four seasons as animated pips.
 * ═══════════════════════════════════════════════════════════════════════════ */

import { PV } from "./pixelville-data";

/* ── The auto-road "watch it think" demo ──────────────────────────────────
   A hand-laid 14×8 tile grid: grass, a 5×5 mountain block (impassable), a
   river column (expensive → bridged), an existing road spine, a new building,
   and the road the pathfinder lays back to the network — carving around the
   rock and bridging the water. The path draws itself on a loop. */
export function AutoRoadDemo() {
  const T = 30; // tile px
  const COLS = 15;
  const ROWS = 9;
  const W = COLS * T;
  const H = ROWS * T;

  // rock block (impassable) — a 3×3 "mountain range"
  const rock = new Set<string>();
  for (let x = 5; x <= 7; x++) for (let y = 2; y <= 4; y++) rock.add(`${x},${y}`);
  // river column (water → bridge)
  const water = new Set<string>();
  for (let y = 0; y < ROWS; y++) water.add(`10,${y}`);
  // existing road spine on the right of the river
  const road = new Set<string>();
  for (let y = 3; y <= 6; y++) road.add(`12,${y}`);
  for (let x = 12; x <= 14; x++) road.add(`${x},6`);

  // the new building's door tile (left side) and the laid path to the spine
  const door = { x: 2, y: 5 };
  const path: [number, number][] = [
    [2, 5], [3, 5], [4, 5], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6],
    [9, 6], [10, 6], [11, 6], [12, 6],
  ];
  const dPath = path.map(([x, y]) => `${x * T + T / 2},${y * T + T / 2}`).join(" ");
  const totalLen = (path.length - 1) * T + 40;

  const tiles = [];
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const k = `${x},${y}`;
      let fill = "#20304a"; // grass (snowy slate)
      if (rock.has(k)) fill = "#454f63"; // mountain rock
      if (water.has(k)) fill = "#2b6f9e";
      if (road.has(k)) fill = "#59637a";
      tiles.push(
        <rect
          key={k}
          x={x * T + 1}
          y={y * T + 1}
          width={T - 2}
          height={T - 2}
          rx={2}
          fill={fill}
          opacity={rock.has(k) ? 0.95 : 0.9}
        />
      );
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: PV.nightDeep, border: `1px solid ${PV.line}` }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: PV.panel, borderBottom: `1px solid ${PV.line}` }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: PV.fire }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: PV.gold }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: PV.grass }} />
        <span className="ml-2 font-dmmono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: PV.muted }}>
          auto-road · A* pathfinder
        </span>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ imageRendering: "pixelated" }} role="img" aria-label="The auto-road pathfinder laying a road from a new building, around a mountain and across a bridge, to the existing road network">
          {tiles}

          {/* mountain caps */}
          {[[5, 2], [6, 2], [7, 2]].map(([x, y]) => (
            <polygon
              key={`cap${x}`}
              points={`${x * T + T / 2},${y * T + 5} ${x * T + 4},${y * T + T - 4} ${x * T + T - 4},${y * T + T - 4}`}
              fill="#dfe8f2"
              opacity={0.85}
            />
          ))}

          {/* the laid road (animated draw) */}
          <polyline
            points={dPath}
            fill="none"
            stroke={PV.gold}
            strokeWidth={11}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.28}
          />
          <polyline
            points={dPath}
            fill="none"
            stroke={PV.gold}
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLen}
            strokeDashoffset={totalLen}
            style={{ ["--pv-len" as string]: totalLen, animation: "pv-draw 3.4s ease-in-out infinite" }}
          />

          {/* the new building on the door tile */}
          <g>
            <rect x={door.x * T + 3} y={(door.y - 1) * T + 4} width={T - 6} height={T + T - 8} rx={3} fill={PV.fire} />
            <rect x={door.x * T + 7} y={(door.y - 1) * T + 9} width={6} height={6} fill="#ffe6b0" />
            <rect x={door.x * T + T - 13} y={(door.y - 1) * T + 9} width={6} height={6} fill="#ffe6b0" />
            <rect x={door.x * T + T / 2 - 4} y={door.y * T + T - 12} width={8} height={9} fill="#5a2f24" />
          </g>

          {/* bridge marker where the road crosses water */}
          <rect x={10 * T + 2} y={6 * T + 6} width={T - 4} height={T - 12} rx={2} fill="#8a6a44" />
        </svg>

        {/* legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
          {[
            ["Road · 0.15", PV.gold],
            ["Grass · 1", "#20304a"],
            ["Water · 7 → bridge", "#2b6f9e"],
            ["Rock · ∞", "#454f63"],
          ].map(([label, c]) => (
            <span key={label} className="flex items-center gap-1.5 font-dmmono text-[10px]" style={{ color: PV.muted }}>
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c as string }} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── The campaign-week bunting ─────────────────────────────────────────────
   One coloured banner per candidate, strung on a wire — the visual signature
   of an election week in PixelVille. */
export function ElectionBanner() {
  const flags = [PV.plum, PV.sky, PV.grass, PV.fire, PV.gold, PV.plum, PV.sky, PV.grass, PV.fire, PV.gold, PV.plum, PV.sky];
  return (
    <div className="relative w-full overflow-hidden" aria-hidden>
      <svg viewBox="0 0 600 46" className="w-full h-auto" preserveAspectRatio="none">
        {/* the sagging wire */}
        <path d="M0 8 Q 300 26 600 8" fill="none" stroke={PV.faint} strokeWidth={1.5} />
        {flags.map((c, i) => {
          const x = 24 + i * 48;
          // follow the sag roughly
          const t = x / 600;
          const y = 8 + 18 * (4 * t * (1 - t));
          return (
            <g key={i} style={{ transformOrigin: `${x}px ${y}px`, animation: `pv-sway 3.6s ease-in-out ${i * 0.12}s infinite` }}>
              <polygon points={`${x - 11},${y} ${x + 11},${y} ${x},${y + 22}`} fill={c} opacity={0.92} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── The four seasons as animated pips ─────────────────────────────────────── */
export function SeasonStrip() {
  const seasons = [
    { name: "Spring", emoji: "🌸", c: PV.grass, note: "blossoms" },
    { name: "Summer", emoji: "✨", c: PV.gold, note: "fireflies" },
    { name: "Autumn", emoji: "🍂", c: PV.amberDeep, note: "falling leaves" },
    { name: "Winter", emoji: "❄️", c: PV.sky, note: "snow & frozen lakes" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {seasons.map((s, i) => (
        <div
          key={s.name}
          className="rounded-xl p-4 text-center"
          style={{ background: PV.panel, border: `1px solid ${PV.line}`, animation: `pv-bob 4s ease-in-out ${i * 0.3}s infinite` }}
        >
          <div className="text-2xl mb-1.5">{s.emoji}</div>
          <div className="font-dmmono text-[12px] font-semibold" style={{ color: s.c }}>{s.name}</div>
          <div className="font-manrope text-[11px] mt-0.5" style={{ color: PV.muted }}>{s.note}</div>
        </div>
      ))}
    </div>
  );
}
