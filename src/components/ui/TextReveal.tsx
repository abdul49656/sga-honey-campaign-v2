"use client";

import { useRef, useEffect, useState, type ElementType } from "react";
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
  stagger = 0.035,
  delay = 0,
  className,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [units, setUnits] = useState<string[]>([]);

  useEffect(() => {
    if (splitBy === "chars") {
      setUnits(children.split(""));
    } else {
      setUnits(children.split(" "));
    }
  }, [children, splitBy]);

  return (
    <Tag ref={ref} className={cn("inline-block", className)} aria-label={children}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0, 0, 0.2, 1],
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
