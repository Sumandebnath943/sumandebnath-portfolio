import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Suman Debnath — AI-Native Product Builder",
    short_name: "Suman Debnath",
    description:
      "Portfolio of Suman Debnath — AI-native product builder, AI generalist, and AI-native software developer building intelligent SaaS systems, agentic workflows, and AI-assisted product architectures.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
