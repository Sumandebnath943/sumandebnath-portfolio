"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GradientText from "@/components/ui/GradientText";

const eras = [
  {
    id: "branding",
    era: "01",
    title: "Branding",
    subtitle: "Visual Identity & Brand Architecture",
    period: "20__ — 20__",
    description:
      "Placeholder — Brand strategy, identity systems, and visual language. Define how the world sees you.",
    accent: "#4DA3FF",
    tags: ["Identity", "Strategy", "Visual Systems"],
  },
  {
    id: "marketing",
    era: "02",
    title: "Marketing",
    subtitle: "Growth Marketing & Campaigns",
    period: "20__ — 20__",
    description:
      "Placeholder — Performance marketing, campaign architecture, and audience systems at scale.",
    accent: "#7B61FF",
    tags: ["Performance", "Campaigns", "Analytics"],
  },
  {
    id: "growth",
    era: "03",
    title: "Growth",
    subtitle: "Product-Led Growth Systems",
    period: "20__ — 20__",
    description:
      "Placeholder — Funnel optimization, conversion frameworks, and product growth loops.",
    accent: "#00E5FF",
    tags: ["PLG", "Funnels", "Retention"],
  },
  {
    id: "ai-evolution",
    era: "04",
    title: "AI Evolution",
    subtitle: "Entering the AI-Native Era",
    period: "20__ — Present",
    description:
      "Placeholder — Transition into AI tooling, LLM applications, and intelligent workflow design.",
    accent: "#4DA3FF",
    tags: ["LLMs", "Automation", "Prompting"],
  },
  {
    id: "product",
    era: "05",
    title: "Product Systems",
    subtitle: "AI-Native SaaS & Product Builder",
    period: "Present",
    description:
      "Placeholder — Full-stack product creation using AI-assisted engineering, from concept to deployment.",
    accent: "#7B61FF",
    tags: ["SaaS", "AI Products", "Systems Design"],
  },
];

function TimelineNode({
  era,
  index,
}: {
  era: (typeof eras)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-6 md:gap-10 group"
    >
      {/* Left: connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Era dot */}
        <m.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
          className="relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ border: `1px solid ${era.accent}30` }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-10"
            style={{ backgroundColor: era.accent }}
          />
          <span
            className="font-mono text-xs font-bold"
            style={{ color: era.accent }}
          >
            {era.era}
          </span>
        </m.div>

        {/* Vertical line */}
        {index < eras.length - 1 && (
          <div className="flex-1 w-[1px] mt-3 bg-gradient-to-b from-[rgba(0,0,0,0.08)] to-transparent min-h-[60px]" />
        )}
      </div>

      {/* Right: content card */}
      <div className="flex-1 pb-12 group-last:pb-0">
        <div className="glass rounded-2xl p-6 md:p-7 glass-hover transition-all duration-300 border border-[rgba(0,0,0,0.05)] hover:border-[rgba(0,0,0,0.15)]">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="font-grotesk font-semibold text-xl text-text-primary">
                {era.title}
              </h3>
              <p className="text-sm text-text-secondary mt-0.5">{era.subtitle}</p>
            </div>
            <span
              className="text-xs font-mono px-3 py-1 rounded-full flex-shrink-0 self-start sm:self-auto"
              style={{
                color: era.accent,
                background: `${era.accent}12`,
                border: `1px solid ${era.accent}25`,
              }}
            >
              {era.period}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            {era.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {era.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-lg border border-[rgba(0,0,0,0.06)] text-text-secondary bg-[rgba(0,0,0,0.03)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}

export default function TransformationTimeline() {
  return (
    <SectionWrapper id="timeline" className="py-24 px-6" showLine>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-text-secondary/40 uppercase tracking-widest mb-4">
            02 / Timeline
          </p>
          <h2 className="font-grotesk font-bold text-4xl md:text-5xl text-text-primary leading-tight">
            The{" "}
            <GradientText variant="blue-violet">Transformation</GradientText>
          </h2>
          <p className="text-text-secondary mt-4 text-base leading-relaxed max-w-xl">
            A five-era evolution from brand architect to AI-native product
            builder. Each phase built the foundation for the next.
          </p>
        </div>

        {/* Timeline nodes */}
        <div>
          {eras.map((era, i) => (
            <TimelineNode key={era.id} era={era} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
