"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface OdometerDigitProps {
  digit: number;
  delay: number;
}

function OdometerDigit({ digit, delay }: OdometerDigitProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setActive(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <span ref={ref} className="relative inline-block h-[1em] w-[0.6em] overflow-hidden">
      <motion.span
        className="absolute left-0 flex flex-col items-center"
        initial={{ y: 0 }}
        animate={active ? { y: `-${digit * 10}%` } : {}}
        transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block h-[1em] leading-[1em]">
            {i}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

interface StatProps {
  value: string;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ value, suffix, label, delay }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const digits = value.split("").map((ch, i) => {
    if (ch === ",") return <span key={i}>,</span>;
    return <OdometerDigit key={i} digit={parseInt(ch)} delay={delay + i * 0.06} />;
  });

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 py-8 md:py-0">
      <span className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none tracking-[-0.02em] text-white">
        {digits}
        {suffix && <span>{suffix}</span>}
      </span>
      <motion.div
        className="flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.4, ease: [0, 0, 0.2, 1] }}
      >
        <div className="h-px w-8 bg-gold/40" />
        <span className="font-[family-name:var(--font-figtree)] text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white/50">
          {label}
        </span>
      </motion.div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-dark py-10 md:py-16">
      <div className="relative mx-auto max-w-5xl px-4 md:px-8">
        {/* Gold radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,206,0,0.06)_0%,transparent_70%)]" />

        <div className="relative flex flex-col items-stretch divide-y divide-white/5 md:flex-row md:divide-x md:divide-y-0">
          <div className="flex flex-1 justify-center">
            <StatItem value="7,200" suffix="+" label="Students Represented" delay={0} />
          </div>
          <div className="flex flex-1 justify-center">
            <StatItem value="4" suffix="" label="Bold Platform Pillars" delay={0.15} />
          </div>
          <div className="flex flex-1 justify-center">
            <StatItem value="1" suffix="" label="Golden Vision" delay={0.3} />
          </div>
        </div>
      </div>
    </section>
  );
}
