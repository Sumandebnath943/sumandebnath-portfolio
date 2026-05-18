"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "section" | "li";
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  hover = false,
  as: Tag = "div",
  onClick,
}: GlassCardProps) {
  if (hover) {
    return (
      <m.div
        whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
        className={cn(
          "glass glass-hover rounded-2xl",
          className
        )}
        onClick={onClick}
      >
        {children}
      </m.div>
    );
  }

  return (
    <Tag
      className={cn("glass rounded-2xl", className)}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
}
