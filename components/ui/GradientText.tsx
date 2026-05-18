"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  variant?: "blue-violet" | "violet-cyan" | "blue-cyan";
}

const gradients = {
  "blue-violet":
    "linear-gradient(135deg, #4DA3FF 0%, #7B61FF 100%)",
  "violet-cyan":
    "linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)",
  "blue-cyan":
    "linear-gradient(135deg, #4DA3FF 0%, #00E5FF 100%)",
};

export default function GradientText({
  children,
  className,
  animated = false,
  variant = "blue-violet",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        animated && "shimmer-text",
        className
      )}
      style={
        !animated
          ? {
              background: gradients[variant],
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
