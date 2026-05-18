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
};

export default nextConfig;

