const sharp = require("sharp");
const dir = "public/pentacmd-images";

const PENTA = "0,-1 0.951,-0.309 0.588,0.809 -0.588,0.809 -0.951,-0.309";

// ---- Favicon: spectrum pentagon + terminal prompt, square ----
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F43F5E"/><stop offset="0.25" stop-color="#FACC15"/>
      <stop offset="0.5" stop-color="#34D399"/><stop offset="0.75" stop-color="#38BDF8"/>
      <stop offset="1" stop-color="#A78BFA"/>
    </linearGradient>
    <radialGradient id="bg" cx="0.5" cy="0.4" r="0.7">
      <stop offset="0" stop-color="#141833"/><stop offset="1" stop-color="#06070e"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <g transform="translate(256,236) scale(150)">
    <polygon points="${PENTA}" fill="url(#g)"/>
    <polygon points="${PENTA}" fill="#06070e" transform="scale(0.62)"/>
  </g>
  <text x="256" y="262" font-family="monospace" font-size="120" font-weight="700" fill="#e6e9f5" text-anchor="middle" dominant-baseline="middle">&gt;_</text>
</svg>`;

// ---- Abstract spectrum banner (soft radial blobs, no filters) ----
const blob = (cx, cy, r, id, op) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})" opacity="${op}"/>`;
const banner = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    ${["F43F5E", "FACC15", "34D399", "38BDF8", "A78BFA"].map((c, i) => `<radialGradient id="r${i}" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#${c}" stop-opacity="0.9"/><stop offset="1" stop-color="#${c}" stop-opacity="0"/></radialGradient>`).join("")}
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#A78BFA" opacity="0.18"/></pattern>
    <linearGradient id="wave" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A78BFA"/><stop offset="0.5" stop-color="#38BDF8"/><stop offset="1" stop-color="#34D399"/></linearGradient>
  </defs>
  <rect width="1600" height="900" fill="#070912"/>
  <rect width="1600" height="900" fill="url(#dots)"/>
  ${blob(360, 300, 520, "r4", 0.5)}${blob(1180, 260, 480, "r3", 0.45)}${blob(820, 720, 560, "r2", 0.4)}${blob(1320, 720, 420, "r0", 0.35)}${blob(180, 720, 360, "r1", 0.3)}
  ${[0, 1, 2].map((k) => `<path d="M-50 ${380 + k * 90} C 300 ${300 + k * 90}, 600 ${480 + k * 70}, 900 ${380 + k * 80} S 1500 ${300 + k * 90}, 1650 ${420 + k * 70}" fill="none" stroke="url(#wave)" stroke-width="2" opacity="0.25"/>`).join("")}
  <g transform="translate(800,420) scale(260)" opacity="0.08"><polygon points="${PENTA}" fill="none" stroke="url(#wave)" stroke-width="0.012"/></g>
  <rect width="1600" height="900" fill="#06070e" opacity="0.28"/>
</svg>`;

Promise.all([
  sharp(Buffer.from(favicon)).png().toFile(`${dir}/favicon.png`),
  sharp(Buffer.from(banner)).png().toFile(`${dir}/gen-banner.png`),
]).then(() => console.log("done: favicon.png, gen-banner.png")).catch((e) => console.log("ERR", e.message));
