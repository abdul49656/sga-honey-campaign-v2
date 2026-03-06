"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextSwapButtonProps {
  children: string;
  href?: string;
  onClick?: () => void;
  variant?: "filled" | "outline" | "dark";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
}

export function TextSwapButton({
  children,
  href,
  onClick,
  variant = "filled",
  className,
  type = "button",
  disabled = false,
  icon,
}: TextSwapButtonProps) {
  const chars = children.split("");

  const baseStyles =
    "group relative inline-flex items-center justify-center overflow-hidden font-[family-name:var(--font-figtree)] text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

  const variantStyles = {
    filled:
      "bg-gold text-dark px-8 py-4 rounded-full hover:bg-gold-hover",
    outline:
      "border border-dark/15 text-dark px-8 py-4 rounded-full hover:border-dark/40",
    dark:
      "bg-dark text-white px-8 py-4 rounded-full hover:bg-dark-surface",
  };

  const content = (
    <>
      {/* Default text — slides up & out on hover */}
      <span className="flex items-center gap-2">
        {icon && <span className="relative z-10">{icon}</span>}
        <span className="relative overflow-hidden">
          <span className="flex">
            {chars.map((char, i) => (
              <motion.span
                key={`top-${i}`}
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:-translate-y-full"
                style={{
                  transitionDelay: `${i * 20}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>

          {/* Duplicate text — slides in from below */}
          <span className="absolute left-0 top-0 flex">
            {chars.map((char, i) => (
              <motion.span
                key={`bottom-${i}`}
                className="inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:translate-y-0"
                style={{
                  transitionDelay: `${i * 20}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        disabled && "pointer-events-none opacity-40",
        className
      )}
    >
      {content}
    </button>
  );
}
