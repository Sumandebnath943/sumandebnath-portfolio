/**
 * The journey's artwork — one line drawing per chapter.
 *
 * Rules the set holds to, so sixteen drawings read as one hand:
 *   · Every stroke is `currentColor`, so a scene inherits its chapter's accent
 *     and the whole set re-themes from CSS with no edits here.
 *   · Nothing is filled except the figure. He is the only solid in the frame,
 *     which is what makes him findable in every scene without a label.
 *   · One viewBox (400×300) throughout, so scenes cross-fade without jumping.
 *   · Strokes draw themselves in on entry — see `.ja` in journey.css. Anything
 *     that must not be dashed carries `ja-solid`.
 *
 * Deliberately no photographs and no realistic rendering: the story is about a
 * person who could not yet see what he was building, and line art leaves the
 * viewer room to put themselves in it.
 */

import type { ReactNode } from "react";

function Scene({ children }: { children: ReactNode }) {
  return (
    <svg
      className="ja"
      viewBox="0 0 400 300"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/**
 * The boy, and later the man. Same silhouette every time, only the posture and
 * the scale change — he is the one thing the eye can track from 2009 to now.
 */
function Figure({
  x = 0,
  y = 0,
  s = 1,
  arm = "down",
}: {
  x?: number;
  y?: number;
  s?: number;
  arm?: "down" | "up" | "out" | "carry";
}) {
  const arms =
    arm === "up"
      ? "M0, 34 L -11,16 M0,34 L 11,14"
      : arm === "out"
        ? "M0,34 L -15,32 M0,34 L 15,30"
        : arm === "carry"
          ? "M0,34 L -13,40 M0,34 L 13,40"
          : "M0,34 L -9,52 M0,34 L 9,52";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="ja-fig">
      <circle className="ja-solid" cx="0" cy="10" r="8" fill="currentColor" stroke="none" />
      <path className="ja-solid" d="M-9,22 Q0,18 9,22 L11,60 L-11,60 Z" fill="currentColor" stroke="none" />
      <path d={arms} strokeWidth="2.4" />
      <path d="M-6,60 L-7,84 M6,60 L7,84" strokeWidth="2.4" />
    </g>
  );
}

/* ── 00 · Prologue — a figure, and a current going past him ────────────── */
function Prologue() {
  return (
    <Scene>
      <path d="M10,196 Q70,180 130,196 T250,196 T390,192" opacity="0.5" />
      <path d="M10,214 Q80,198 150,214 T280,212 T390,210" opacity="0.35" />
      <path d="M10,232 Q60,220 120,232 T240,230 T390,228" opacity="0.2" />
      <path d="M0,258 L400,258" opacity="0.6" />
      <Figure x={200} y={168} s={1.05} />
      <path d="M120,60 L128,60 M150,48 L158,48 M180,66 L188,66 M262,52 L270,52 M292,64 L300,64" opacity="0.4" />
      <circle cx="330" cy="72" r="18" opacity="0.25" />
    </Scene>
  );
}

/* ── 01 · The tutor — a table, a lamp, and letters becoming a sentence ── */
function Tutor() {
  return (
    <Scene>
      <path d="M60,206 L340,206" />
      <path d="M78,206 L78,262 M322,206 L322,262" />
      <path d="M96,206 L96,240 M304,206 L304,240" opacity="0.4" />
      <path d="M150,206 L150,186 Q150,178 160,178 L176,178" opacity="0.7" />
      <path d="M176,166 L206,166 L196,190 L166,190 Z" />
      <path d="M181,190 L191,190 L191,206" opacity="0.6" />
      <path d="M232,206 Q252,190 272,206 Q252,198 232,206 Z" />
      <path d="M252,196 L252,206" opacity="0.5" />
      <Figure x={116} y={130} s={0.72} arm="out" />
      <Figure x={286} y={122} s={0.84} arm="down" />
      <path d="M196,96 L214,96 M222,96 L246,96 M254,96 L262,96" opacity="0.75" />
      <path d="M196,112 L206,112 M214,112 L242,112 M250,112 L272,112" opacity="0.5" />
      <path d="M196,128 L228,128 M236,128 L262,128" opacity="0.28" />
      <circle cx="188" cy="72" r="2.6" className="ja-solid" fill="currentColor" stroke="none" opacity="0.6" />
      <circle cx="212" cy="60" r="2" className="ja-solid" fill="currentColor" stroke="none" opacity="0.45" />
      <circle cx="240" cy="70" r="2.4" className="ja-solid" fill="currentColor" stroke="none" opacity="0.5" />
    </Scene>
  );
}

/* ── 02 · Two doors; the ledger behind one of them coming apart ────────── */
function Commerce() {
  return (
    <Scene>
      <path d="M0,254 L400,254" opacity="0.6" />
      <path d="M62,254 L62,92 L164,74 L164,254" />
      <path d="M80,254 L80,112 L146,100 L146,254" opacity="0.55" />
      <path d="M136,178 a3,3 0 1,0 0.1,0" className="ja-solid" opacity="0.7" />
      <path d="M104,124 L122,124 M104,138 L122,138 M104,152 L118,152" opacity="0.45" />
      <path d="M236,254 L236,74 L338,92 L338,254" />
      <path d="M254,254 L254,100 L320,112 L320,254" opacity="0.55" />
      <path d="M264,178 a3,3 0 1,0 0.1,0" className="ja-solid" opacity="0.7" />
      <path d="M278,126 L302,126 M278,140 L300,140" opacity="0.5" />
      <path d="M278,154 L296,154" opacity="0.28" />
      <path d="M280,168 L292,168" opacity="0.14" />
      <path d="M188,236 L212,236 L206,248 L194,248 Z" opacity="0.35" />
      <Figure x={200} y={150} s={0.78} arm="out" />
      <path d="M330,60 L344,46 M344,60 L330,46" opacity="0.5" />
    </Scene>
  );
}

/* ── 03 · NBPCM — the small college, and the boy outside the gate ──────── */
function College() {
  return (
    <Scene>
      <path d="M0,256 L400,256" />
      <path d="M84,256 L84,120 L316,120 L316,256" />
      <path d="M84,120 L200,66 L316,120" />
      <path d="M176,120 L200,88 L224,120" opacity="0.5" />
      <path d="M196,96 L204,96 M200,92 L200,104" opacity="0.6" />
      <path d="M108,146 L136,146 L136,182 L108,182 Z" />
      <path d="M122,146 L122,182 M108,164 L136,164" opacity="0.4" />
      <path d="M164,146 L192,146 L192,182 L164,182 Z" />
      <path d="M178,146 L178,182 M164,164 L192,164" opacity="0.4" />
      <path d="M220,146 L248,146 L248,182 L220,182 Z" />
      <path d="M234,146 L234,182 M220,164 L248,164" opacity="0.4" />
      <path d="M276,146 L304,146 L304,182 L276,182 Z" opacity="0.6" />
      <path d="M180,204 L220,204 L220,256 L180,256 Z" />
      <path d="M200,204 L200,256" opacity="0.5" />
      <path d="M44,256 L44,200 M56,256 L56,200" opacity="0.7" />
      <path d="M44,200 L56,200" opacity="0.7" />
      <path d="M44,214 L20,214 M44,228 L20,228 M44,242 L20,242" opacity="0.35" />
      <path d="M356,256 L356,214" opacity="0.6" />
      <path d="M356,214 Q340,204 344,190 Q356,196 356,206 Q358,190 372,186 Q374,202 356,212" opacity="0.6" />
      <Figure x={62} y={196} s={0.62} arm="down" />
      <path d="M110,282 L120,282 M136,282 L146,282 M162,282 L172,282" opacity="0.5" />
      <path d="M188,282 L198,282" opacity="0.25" />
      <path d="M214,282 L224,282" opacity="0.12" />
    </Scene>
  );
}

/* ── 04 · WOLAMBO — the wedge, and a curve going up behind it ──────────── */
function Wolambo() {
  return (
    <Scene>
      <path d="M28,214 L372,214" opacity="0.55" />
      <path d="M40,206 L60,206 M80,206 L110,206 M130,206 L150,206" opacity="0.3" />
      <path d="M74,190 L110,164 L196,158 L252,132 L318,140 L340,168 L344,190 Z" />
      <path d="M126,164 L188,160 L182,182 L118,182 Z" opacity="0.5" />
      <path d="M200,158 L246,136 L286,140 L262,180 L196,182 Z" opacity="0.5" />
      <path d="M74,190 L344,190" opacity="0.45" />
      <circle cx="130" cy="196" r="18" />
      <circle cx="130" cy="196" r="7" opacity="0.5" />
      <circle cx="292" cy="196" r="18" />
      <circle cx="292" cy="196" r="7" opacity="0.5" />
      <path d="M344,172 L364,168" opacity="0.6" />
      <path d="M52,92 L52,44" opacity="0.35" />
      <path d="M52,124 L52,104" opacity="0.35" />
      <path d="M46,124 L340,124" opacity="0.3" />
      <path d="M52,116 Q106,112 140,104 Q186,94 214,76 Q258,50 300,42 Q324,38 344,36" strokeWidth="1.9" />
      <circle cx="344" cy="36" r="4" className="ja-solid" fill="currentColor" stroke="none" />
      <path d="M300,58 L312,58 M300,68 L318,68" opacity="0.4" />
    </Scene>
  );
}

/* ── 05 · The classroom he actually attended ───────────────────────────── */
function SelfTaught() {
  return (
    <Scene>
      <path d="M96,68 L304,68 L304,196 L96,196 Z" />
      <path d="M96,68 L304,68 L304,84 L96,84 Z" opacity="0.5" />
      <circle cx="110" cy="76" r="2.6" opacity="0.6" />
      <circle cx="120" cy="76" r="2.6" opacity="0.6" />
      <path d="M172,196 L228,196 L236,222 L164,222 Z" />
      <path d="M140,222 L260,222" />
      <path d="M166,104 L166,176 L246,140 Z" opacity="0.85" />
      <path d="M116,104 L150,104 M116,118 L142,118" opacity="0.35" />
      <path d="M254,104 L288,104 M262,118 L288,118" opacity="0.35" />
      <path d="M116,166 L146,166 M116,178 L138,178" opacity="0.2" />
      <path d="M40,232 L84,232 L84,258 L40,258 Z" opacity="0.7" />
      <path d="M48,240 L60,240 M48,248 L56,248" opacity="0.5" />
      <path d="M84,244 Q104,244 104,222 L104,208" opacity="0.5" />
      <path d="M100,204 a4,4 0 1,0 0.1,0" className="ja-solid" opacity="0.5" />
      <path d="M320,96 L352,96 L352,120 L320,120 Z" opacity="0.6" />
      <path d="M326,104 L346,104 M326,112 L340,112" opacity="0.4" />
      <path d="M320,136 L352,136 L352,160 L320,160 Z" opacity="0.45" />
      <path d="M326,144 L346,144 M326,152 L338,152" opacity="0.3" />
      <path d="M320,176 L352,176 L352,200 L320,200 Z" opacity="0.3" />
      <path d="M326,184 L346,184" opacity="0.2" />
      <path d="M48,96 L80,96 L80,120 L48,120 Z" opacity="0.6" />
      <path d="M54,114 L60,104 L66,110 L74,100" opacity="0.5" />
      <path d="M48,136 L80,136 L80,160 L48,160 Z" opacity="0.45" />
      <path d="M56,152 L56,142 M64,152 L64,138 M72,152 L72,146" opacity="0.35" />
    </Scene>
  );
}

/* ── 06 · Kolkata to Pune ──────────────────────────────────────────────── */
function Mba() {
  return (
    <Scene>
      <path d="M0,248 L400,248" />
      <path d="M0,262 L400,262" opacity="0.5" />
      <path d="M24,248 L24,262 M64,248 L64,262 M104,248 L104,262 M144,248 L144,262 M184,248 L184,262 M224,248 L224,262 M264,248 L264,262 M304,248 L304,262 M344,248 L344,262 M384,248 L384,262" opacity="0.3" />
      <path d="M96,150 L316,150 L332,172 L332,236 L96,236 Z" />
      <path d="M332,180 Q352,182 356,200 L356,236 L332,236" opacity="0.7" />
      <path d="M116,166 L152,166 L152,196 L116,196 Z" opacity="0.6" />
      <path d="M166,166 L202,166 L202,196 L166,196 Z" opacity="0.6" />
      <path d="M216,166 L252,166 L252,196 L216,196 Z" opacity="0.6" />
      <path d="M266,166 L302,166 L302,196 L266,196 Z" opacity="0.6" />
      <path d="M96,212 L332,212" opacity="0.4" />
      <circle cx="140" cy="242" r="9" opacity="0.8" />
      <circle cx="188" cy="242" r="9" opacity="0.8" />
      <circle cx="256" cy="242" r="9" opacity="0.8" />
      <circle cx="304" cy="242" r="9" opacity="0.8" />
      <path d="M22,236 L22,180 L34,180 L34,236" opacity="0.45" />
      <path d="M40,236 L40,196 L52,196 L52,236" opacity="0.35" />
      <path d="M22,180 L28,168 L34,180" opacity="0.45" />
      <path d="M362,236 L362,172 L376,172 L376,236" opacity="0.45" />
      <path d="M380,236 L380,192 L392,192 L392,236" opacity="0.35" />
      <path d="M64,110 L108,110 M124,110 L156,110" opacity="0.3" />
      <path d="M244,110 L286,110 M300,110 L336,110" opacity="0.3" />
      <Figure x={64} y={186} s={0.5} arm="carry" />
    </Scene>
  );
}

/* ── 07 · Illusion Effects — a mark being drawn on a small machine ──────── */
function Illusion() {
  return (
    <Scene>
      <path d="M78,88 L322,88 L322,208 L78,208 Z" />
      <path d="M60,232 L340,232 L322,208 L78,208 Z" />
      <path d="M172,220 L228,220" opacity="0.5" />
      <path d="M96,104 L146,104 M96,116 L130,116" opacity="0.3" />
      <circle cx="200" cy="150" r="42" opacity="0.85" />
      <path d="M158,150 A42,42 0 0,1 234,124" strokeWidth="2.4" />
      <path d="M186,124 L214,124 M186,150 L206,150 M186,176 L214,176" strokeWidth="2.2" />
      <path d="M212,116 L188,186" strokeWidth="2.2" opacity="0.8" />
      <path d="M258,132 L296,132 M258,146 L288,146" opacity="0.4" />
      <path d="M258,166 L282,166" opacity="0.25" />
      <path d="M40,180 L64,180 L64,196 L40,196 Z" opacity="0.5" />
      <path d="M44,190 L60,190" opacity="0.4" />
      <path d="M336,180 L364,180 L364,196 L336,196 Z" opacity="0.5" />
      <path d="M340,190 L360,190" opacity="0.4" />
      <path d="M120,256 L280,256" opacity="0.3" />
      <path d="M132,268 L172,268 M188,268 L216,268 M232,268 L268,268" opacity="0.18" />
    </Scene>
  );
}

/* ── 08 · The door that shut ───────────────────────────────────────────── */
function Rejected() {
  return (
    <Scene>
      <path d="M0,256 L400,256" />
      <path d="M148,256 L148,68 L286,68 L286,256" />
      <path d="M164,256 L164,84 L270,84 L270,256" opacity="0.7" />
      <path d="M256,170 a4,4 0 1,0 0.1,0" className="ja-solid" opacity="0.8" />
      <path d="M164,248 L270,248" strokeWidth="2.6" opacity="0.9" />
      <path d="M170,242 L264,242" opacity="0.3" />
      <path d="M178,236 L256,236" opacity="0.15" />
      <path d="M42,222 L74,222 L74,256 M42,222 L42,256" opacity="0.5" />
      <path d="M42,222 L42,206 L74,206 L74,222" opacity="0.5" />
      <path d="M86,222 L118,222 L118,256 M86,222 L86,256" opacity="0.35" />
      <path d="M86,222 L86,206 L118,206 L118,222" opacity="0.35" />
      <path d="M326,222 L358,222 L358,256 M326,222 L326,256" opacity="0.35" />
      <path d="M326,222 L326,206 L358,206 L358,222" opacity="0.35" />
      <Figure x={100} y={172} s={0.58} arm="down" />
      <path d="M300,110 L318,110 M300,124 L312,124" opacity="0.25" />
    </Scene>
  );
}

/* ── 09 · The work, opened on a desk ───────────────────────────────────── */
function Hired() {
  return (
    <Scene>
      <path d="M36,222 L364,222" strokeWidth="1.9" />
      <path d="M60,222 L60,268 M340,222 L340,268" />
      <path d="M150,124 L258,124 L266,208 L142,208 Z" />
      <path d="M162,140 L246,140 M162,156 L238,156 M162,172 L250,172 M162,188 L226,188" opacity="0.35" />
      <path d="M96,208 L156,140 L182,150 L136,214 Z" opacity="0.65" />
      <path d="M112,186 L150,158" opacity="0.3" />
      <path d="M262,150 L318,138 L336,206 L276,214 Z" opacity="0.65" />
      <path d="M276,166 L318,158 M278,180 L322,172" opacity="0.3" />
      <path d="M292,86 L348,86 L348,116 L292,116 Z" opacity="0.6" />
      <path d="M300,108 L310,94 L318,104 L330,90 L340,102" opacity="0.5" />
      <path d="M52,88 L108,88 L108,118 L52,118 Z" opacity="0.6" />
      <path d="M60,112 L60,96 M72,112 L72,92 M84,112 L84,100 M96,112 L96,94" opacity="0.5" />
      <Figure x={200} y={38} s={0.42} arm="out" />
    </Scene>
  );
}

/* ── 10 · Kerala — everything, at once ─────────────────────────────────── */
function Kerala() {
  return (
    <Scene>
      <path d="M0,258 L400,258" />
      <path d="M58,258 L58,150" opacity="0.7" />
      <path d="M58,150 Q34,138 20,146 Q40,142 56,158" opacity="0.6" />
      <path d="M58,150 Q82,136 96,144 Q76,142 60,158" opacity="0.6" />
      <path d="M58,150 Q46,124 30,118 Q50,126 58,144" opacity="0.6" />
      <path d="M58,150 Q70,124 88,118 Q66,128 60,146" opacity="0.6" />
      <path d="M348,258 L348,168" opacity="0.5" />
      <path d="M348,168 Q328,158 316,164 Q334,162 346,174" opacity="0.45" />
      <path d="M348,168 Q368,156 380,162 Q362,160 350,174" opacity="0.45" />
      <path d="M348,168 Q340,146 328,140 Q344,150 348,164" opacity="0.45" />
      <path d="M144,258 L144,228 L256,228 L256,258" opacity="0.45" />
      <path d="M160,240 L176,240 L176,258 M224,240 L240,240 L240,258" opacity="0.3" />
      <path d="M156,214 L244,214 L244,228 L156,228 Z" opacity="0.55" />
      <path d="M162,190 L238,190 L238,204 L162,204 Z" opacity="0.55" />
      <path d="M168,166 L232,166 L232,180 L168,180 Z" opacity="0.55" />
      <path d="M174,142 L226,142 L226,156 L174,156 Z" opacity="0.55" />
      <path d="M180,118 L220,118 L220,132 L180,132 Z" opacity="0.55" />
      <path d="M186,94 L214,94 L214,108 L186,108 Z" opacity="0.4" />
      <path d="M192,70 L208,70 L208,84 L192,84 Z" opacity="0.25" />
      <Figure x={98} y={198} s={0.6} arm="up" />
    </Scene>
  );
}

/* ── 11 · The four months ──────────────────────────────────────────────── */
function Gap() {
  return (
    <Scene>
      <path d="M0,254 L400,254" />
      <path d="M118,254 L118,214 L282,214 L282,254" opacity="0.6" />
      <path d="M118,214 L282,214" strokeWidth="2" />
      <path d="M126,214 L126,254 M274,214 L274,254" opacity="0.5" />
      <path d="M118,226 L282,226" opacity="0.3" />
      <circle cx="200" cy="98" r="34" opacity="0.75" />
      <path d="M200,98 L200,76 M200,98 L216,106" strokeWidth="2" />
      <circle cx="200" cy="98" r="2.4" className="ja-solid" fill="currentColor" stroke="none" />
      <path d="M200,64 L200,70 M234,98 L228,98 M200,132 L200,126 M166,98 L172,98" opacity="0.5" />
      <path d="M54,254 L54,206 L86,206 L86,254" opacity="0.4" />
      <path d="M60,222 L80,222 M60,236 L80,236" opacity="0.25" />
      <path d="M314,254 L314,192 L346,192 L346,254" opacity="0.4" />
      <path d="M320,208 L340,208 M320,222 L340,222 M320,236 L340,236" opacity="0.25" />
      <path d="M96,178 L104,178 M116,178 L124,178 M136,178 L144,178" opacity="0.3" />
      <path d="M256,178 L264,178 M276,178 L284,178 M296,178 L304,178" opacity="0.3" />
      <Figure x={200} y={158} s={0.56} arm="down" />
    </Scene>
  );
}

/* ── 12 · PIBM — the building, the room, and everything it connects to ─── */
function Pibm() {
  return (
    <Scene>
      <path d="M0,262 L400,262" />
      <path d="M150,262 L150,52 L250,52 L250,262" />
      <path d="M150,52 L200,32 L250,52" opacity="0.6" />
      <path d="M162,72 L186,72 L186,96 L162,96 Z M214,72 L238,72 L238,96 L214,96 Z" opacity="0.5" />
      <path d="M162,110 L186,110 L186,134 L162,134 Z M214,110 L238,110 L238,134 L214,134 Z" opacity="0.5" />
      <path d="M162,148 L186,148 L186,172 L162,172 Z M214,148 L238,148 L238,172 L214,172 Z" opacity="0.5" />
      <path d="M184,214 L216,214 L216,262 L184,262 Z" opacity="0.7" />
      <path d="M200,214 L200,262" opacity="0.4" />
      <path d="M150,194 Q108,194 90,214 M150,206 Q96,214 74,238" opacity="0.35" />
      <path d="M250,194 Q292,194 310,214 M250,206 Q304,214 326,238" opacity="0.35" />
      <path d="M150,182 Q112,170 96,150 M250,182 Q288,170 304,150" opacity="0.35" />
      <circle cx="72" cy="216" r="9" opacity="0.55" />
      <circle cx="56" cy="244" r="9" opacity="0.55" />
      <circle cx="92" cy="146" r="9" opacity="0.55" />
      <circle cx="328" cy="216" r="9" opacity="0.55" />
      <circle cx="344" cy="244" r="9" opacity="0.55" />
      <circle cx="308" cy="146" r="9" opacity="0.55" />
      <path d="M120,40 L280,40" opacity="0.2" />
      <ellipse cx="200" cy="20" rx="46" ry="10" opacity="0.55" />
      <circle cx="166" cy="14" r="4" className="ja-solid" fill="currentColor" stroke="none" opacity="0.75" />
      <circle cx="200" cy="10" r="4" className="ja-solid" fill="currentColor" stroke="none" opacity="0.75" />
      <circle cx="234" cy="14" r="4" className="ja-solid" fill="currentColor" stroke="none" opacity="0.75" />
    </Scene>
  );
}

/* ── 13 · The second self-teaching ─────────────────────────────────────── */
function Ai() {
  return (
    <Scene>
      <circle cx="200" cy="150" r="16" strokeWidth="2" />
      <circle cx="200" cy="150" r="5" className="ja-solid" fill="currentColor" stroke="none" />
      <path d="M200,134 L200,86 M200,166 L200,214 M184,150 L112,150 M216,150 L288,150" opacity="0.6" />
      <path d="M188,138 L138,96 M212,138 L262,96 M188,162 L138,204 M212,162 L262,204" opacity="0.45" />
      <circle cx="200" cy="78" r="10" />
      <circle cx="200" cy="222" r="10" />
      <circle cx="102" cy="150" r="10" />
      <circle cx="298" cy="150" r="10" />
      <circle cx="130" cy="88" r="8" opacity="0.7" />
      <circle cx="270" cy="88" r="8" opacity="0.7" />
      <circle cx="130" cy="212" r="8" opacity="0.7" />
      <circle cx="270" cy="212" r="8" opacity="0.7" />
      <path d="M130,80 L130,44 M270,80 L270,44 M94,142 L58,124 M306,142 L342,124" opacity="0.3" />
      <circle cx="130" cy="36" r="6" opacity="0.45" />
      <circle cx="270" cy="36" r="6" opacity="0.45" />
      <circle cx="50" cy="120" r="6" opacity="0.45" />
      <circle cx="350" cy="120" r="6" opacity="0.45" />
      <path d="M28,232 L120,232 L120,272 L28,272 Z" opacity="0.55" />
      <path d="M36,246 L46,252 L36,258 M52,258 L74,258" opacity="0.5" />
      <path d="M280,232 L372,232 L372,272 L280,272 Z" opacity="0.55" />
      <path d="M290,244 L340,244 M290,256 L326,256" opacity="0.35" />
    </Scene>
  );
}

/* ── 14 · Four circles, one overlap ────────────────────────────────────── */
function Converge() {
  return (
    <Scene>
      <circle cx="158" cy="118" r="62" opacity="0.65" />
      <circle cx="242" cy="118" r="62" opacity="0.65" />
      <circle cx="158" cy="192" r="62" opacity="0.65" />
      <circle cx="242" cy="192" r="62" opacity="0.65" />
      <circle cx="200" cy="155" r="21" strokeWidth="2.4" />
      <circle cx="200" cy="155" r="6" className="ja-solid" fill="currentColor" stroke="none" />
      <path d="M96,60 L136,60 M264,60 L316,60" opacity="0.3" />
      <path d="M84,250 L132,250 M268,250 L322,250" opacity="0.3" />
    </Scene>
  );
}

/* ── 15 · Five percent ─────────────────────────────────────────────────── */
function Five() {
  return (
    <Scene>
      <path d="M0,262 L400,262" />
      <path d="M40,262 L150,120 L206,190 L262,96 L370,262" opacity="0.7" />
      <path d="M150,120 L176,152 L206,190" opacity="0.3" />
      <path d="M262,96 L238,128 L206,190" opacity="0.3" />
      <path d="M244,116 L262,96 L280,116 L262,110 Z" opacity="0.55" />
      <path d="M120,238 L136,238 M156,232 L172,232 M192,238 L208,238" opacity="0.25" />
      <circle cx="262" cy="60" r="4" className="ja-solid" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="292" cy="44" r="3" className="ja-solid" fill="currentColor" stroke="none" opacity="0.35" />
      <circle cx="232" cy="40" r="2.6" className="ja-solid" fill="currentColor" stroke="none" opacity="0.3" />
      <Figure x={92} y={192} s={0.52} arm="up" />
    </Scene>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  prologue: Prologue,
  tutor: Tutor,
  commerce: Commerce,
  college: College,
  wolambo: Wolambo,
  selftaught: SelfTaught,
  mba: Mba,
  illusion: Illusion,
  rejected: Rejected,
  hired: Hired,
  kerala: Kerala,
  gap: Gap,
  pibm: Pibm,
  ai: Ai,
  converge: Converge,
  five: Five,
};

export default function JourneyArt({ name }: { name: string }) {
  const Art = ART[name];
  return Art ? <Art /> : null;
}
