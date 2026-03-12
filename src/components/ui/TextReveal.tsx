"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Mobile: single motion element — keeps correct inline width for large hero text
  if (isMobile) {
    return (
      <Tag
        ref={ref}
        className={cn("inline-block", className)}
        aria-label={children}
      >
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.span>
      </Tag>
    );
  }

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
            initial={{ y: "100%", opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1 }
                : { y: "100%", opacity: 0 }
            }
            transition={{
              duration: 0.75,
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
