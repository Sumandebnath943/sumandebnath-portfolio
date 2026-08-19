import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack's project root to this directory so Next.js doesn't walk
  // up to a stray lockfile (e.g. C:\Users\Admin\package-lock.json) and pick
  // the wrong workspace root.
  turbopack: {
    root: path.resolve("."),
  },
  images: {
    // Allow local /public images and add external domains here when needed
    remotePatterns: [],
    // Optimized for Vercel deployment
    formats: ["image/avif", "image/webp"],
  },
  // ── Immutable static assets ────────────────────────────────────────────
  // /public is served `Cache-Control: public, max-age=0`, so every repeat visit
  // revalidates. Harmless for a favicon; wrong for the two megabyte-scale files
  // the robot needs, which it re-fetches on EVERY page because the mascot is
  // mounted in the root layout.
  //
  // ⚠ THESE URLS ARE PROMISED IMMUTABLE FOR A YEAR. Browsers will not even
  // revalidate them. Replacing either file in place ships nothing to anyone who
  // has already visited — you MUST give the new file a new name (robot-v2.glb,
  // city-v2.hdr) and update its reference. See PROJECT_BIBLE.md §10.1.
  //   • /hdri/*       — Poly Haven env map (CC0), used by both robot canvases
  //   • /robot-v2.glb — scripts/build-robot-glb.mjs, then shrink-robot-textures
  //
  // The glb is matched literally, not by pattern: `/robot-:version*.glb` reads
  // fine and is rejected by path-to-regexp at build time ("cannot repeat
  // without a prefix and suffix"). A rename means editing this line too, which
  // is already part of the rule.
  async headers() {
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];
    return [
      { source: "/hdri/:file*", headers: immutable },
      { source: "/robot-v2.glb", headers: immutable },
    ];
  },
};

export default nextConfig;

