"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

function AnimatedNumber({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (value >= 1000) {
      return Math.round(latest).toLocaleString("en-US");
    }
    return Math.round(latest).toString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, delay, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ value, suffix, label, delay }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-1 flex-col items-center rounded-3xl border border-white/[0.12] bg-white/[0.06] px-6 py-10 text-center md:px-8 md:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="text-display-lg text-gold"
      >
        <AnimatedNumber value={value} delay={delay} />
        {suffix}
      </span>

      <motion.div
        className="mt-5 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-px w-8 bg-gold/40" />
        <span className="text-label text-white/75">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="bg-dark py-16 md:py-24">
      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        {/* Subtle gold radial glow */}
        <div
          className="animate-pulse-glow pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(253,206,0,0.15) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          <StatItem value={7200} suffix="+" label="Students Represented" delay={0} />
          <StatItem value={4} suffix="" label="Bold Platform Pillars" delay={0.12} />
          <StatItem value={1} suffix="" label="Golden Vision" delay={0.24} />
        </div>
      </div>
    </section>
  );
}
