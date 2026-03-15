"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Directly writes textContent via requestAnimationFrame — no React re-renders,
// no Framer Motion motion value chain. Much smoother on mobile.
function AnimatedNumber({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.textContent = "0";
    let raf = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const startTime = performance.now() + delay * 1000;
        const duration = 2000;

        function step(now: number) {
          const elapsed = now - startTime;
          if (elapsed < 0) {
            raf = requestAnimationFrame(step);
            return;
          }
          const t = Math.min(elapsed / duration, 1);
          // Ease-out expo
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          const current = Math.round(eased * value);
          if (el) {
            el.textContent =
              value >= 1000
                ? current.toLocaleString("en-US")
                : current.toString();
          }
          if (t < 1) raf = requestAnimationFrame(step);
        }

        raf = requestAnimationFrame(step);
      },
      { rootMargin: "-80px", threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, delay]);

  return <span ref={ref}>0</span>;
}

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ value, suffix, label, delay }: StatProps) {
  return (
    <motion.div
      className="flex flex-1 flex-col items-center rounded-3xl border border-white/[0.12] bg-white/[0.06] px-6 py-10 text-center md:px-8 md:py-12"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <span className="text-display-lg text-gold">
        <AnimatedNumber value={value} delay={delay} />
        {suffix}
      </span>

      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="h-px w-8 bg-gold/40" />
        <span className="text-label text-white/75">{label}</span>
      </div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="bg-dark py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          <StatItem value={8975} suffix="+" label="Students Represented" delay={0} />
          <StatItem value={4} suffix="" label="Bold Platform Pillars" delay={0.12} />
          <StatItem value={1} suffix="" label="Golden Vision" delay={0.24} />
        </div>
      </div>
    </section>
  );
}
