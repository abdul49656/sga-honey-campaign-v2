"use client";

import { useRef, type ElementType } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  as?: ElementType;
  splitBy?: "chars" | "words";
  stagger?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function TextReveal({
  children,
  as: Tag = "span",
  splitBy = "words",
  stagger = 0.03,
  delay = 0,
  className,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const units =
    splitBy === "chars" ? children.split("") : children.split(" ");

  return (
    <Tag
      ref={ref}
      className={cn("inline-block", className)}
      aria-label={children}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.15em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "105%", rotateX: -80, opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", rotateX: 0, opacity: 1 }
                : { y: "105%", rotateX: -80, opacity: 0 }
            }
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {unit}
            {splitBy === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
