import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Suman Debnath — Brand Marketing Leader & AI Product Builder",
    short_name: "Suman Debnath",
    description:
      "Portfolio of Suman Debnath — Senior Brand Marketing Manager and AI-native product builder shipping intelligent SaaS systems, agentic workflows, and AI-assisted product architectures.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
