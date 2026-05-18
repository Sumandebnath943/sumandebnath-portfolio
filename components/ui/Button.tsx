"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "subtle";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
}

const sizeMap = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantMap = {
  primary:
    "bg-accent-blue text-bg-deep font-semibold hover:bg-opacity-90 shadow-accent-glow hover:shadow-[0_0_40px_rgba(77,163,255,0.35)]",
  ghost:
    "border border-[rgba(77,163,255,0.3)] text-accent-blue hover:border-accent-blue hover:bg-[rgba(77,163,255,0.06)]",
  subtle:
    "border border-[rgba(0,0,0,0.08)] text-text-secondary hover:border-[rgba(0,0,0,0.15)] hover:text-text-primary hover:bg-[rgba(0,0,0,0.03)]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  disabled = false,
  type = "button",
  icon,
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer",
    sizeMap[size],
    variantMap[variant],
    disabled && "opacity-40 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <m.a
        href={href}
        className={baseClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </m.a>
    );
  }

  return (
    <m.button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {content}
    </m.button>
  );
}
