"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Whether to show the top ambient line divider */
  showLine?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  }),
};

export default function SectionWrapper({
  children,
  className,
  id,
  delay = 0,
  showLine = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id={id} ref={ref} className={cn("relative", className)}>
      {showLine && (
        <div className="section-line absolute top-0 left-0 right-0 opacity-40" />
      )}
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={delay}
      >
        {children}
      </m.div>
    </section>
  );
}
