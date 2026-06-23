import type { Metadata } from "next";
import { SITE_URL } from "@/lib/projects";
import LearningsClient from "./LearningsClient";

export const metadata: Metadata = {
  title: { absolute: "Skills & Cross-Domain Capabilities — Suman Debnath" },
  description:
    "The full skill map: brand marketing, growth, and AI product engineering — the cross-domain capabilities behind Suman Debnath's work as a marketer turned AI builder.",
  alternates: { canonical: "/learnings" },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/learnings`,
    title: "Skills & Cross-Domain Capabilities · Suman Debnath",
    description:
      "Brand marketing, growth, and AI product engineering — the cross-domain skill set of a brand marketer turned AI product builder.",
    images: ["/og-image.png"],
  },
};

export default function LearningsPage() {
  return <LearningsClient />;
}
