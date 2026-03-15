"use client";

import { useRef, useEffect } from "react";
import { useScrollReveal, fadeUp } from "@/hooks/useScrollReveal";

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
          if (elapsed < 0) { raf = requestAnimationFrame(step); return; }
          const t = Math.min(elapsed / duration, 1);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          const current = Math.round(eased * value);
          if (el) el.textContent = value >= 1000 ? current.toLocaleString("en-US") : current.toString();
          if (t < 1) raf = requestAnimationFrame(step);
        }

        raf = requestAnimationFrame(step);
      },
      { rootMargin: "-80px", threshold: 0 }
    );

    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, [value, delay]);

  return <span ref={ref}>0</span>;
}

function StatItem({
  value, suffix, label, delay, visible, staggerIndex,
}: {
  value: number; suffix: string; label: string; delay: number;
  visible: boolean; staggerIndex: number;
}) {
  return (
    <div
      className="flex flex-1 flex-col items-center rounded-3xl border border-white/[0.12] bg-white/[0.06] px-6 py-10 text-center md:px-8 md:py-12"
      style={fadeUp(visible, staggerIndex * 120)}
    >
      <span className="text-display-lg text-gold">
        <AnimatedNumber value={value} delay={delay} />
        {suffix}
      </span>
      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="h-px w-8 bg-gold/40" />
        <span className="text-label text-white/75">{label}</span>
      </div>
    </div>
  );
}

export function Stats() {
  const { ref: gridRef, visible } = useScrollReveal();

  return (
    <section className="bg-dark py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          <StatItem value={8975} suffix="+" label="Students Represented" delay={0}    visible={visible} staggerIndex={0} />
          <StatItem value={4}    suffix=""  label="Bold Platform Pillars" delay={0.12} visible={visible} staggerIndex={1} />
          <StatItem value={1}    suffix=""  label="Golden Vision"         delay={0.24} visible={visible} staggerIndex={2} />
        </div>
      </div>
    </section>
  );
}
