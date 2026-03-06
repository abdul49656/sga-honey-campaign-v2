"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const GOLD_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 4,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 3,
}));

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Video background with parallax zoom */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,206,0,0.08)_0%,transparent_70%)]" />

      {/* Gold particles — desktop only */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {GOLD_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold/30"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, -5, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content with parallax */}
      <motion.div
        className="relative z-[1] mx-auto max-w-7xl px-4 py-32 text-center md:px-8"
        style={{ y: contentY }}
      >
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="inline-block font-[family-name:var(--font-figtree)] text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/50"
        >
          Belmont University&ensp;·&ensp;SGA 2026
        </motion.span>

        {/* Headline with text reveal */}
        <h1 className="mt-6 font-[family-name:var(--font-cormorant)] text-[clamp(3.5rem,8vw+1rem,9rem)] font-bold leading-[0.92] tracking-[-0.03em] text-white">
          <TextReveal delay={0.15} stagger={0.06}>
            Make It
          </TextReveal>
          <br />
          <span className="relative inline-block">
            <TextReveal
              delay={0.4}
              stagger={0.04}
              splitBy="chars"
              className="text-gold [text-shadow:0_0_80px_rgba(253,206,0,0.35)]"
            >
              Golden.
            </TextReveal>
          </span>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0, 0, 0.2, 1] }}
          className="mx-auto mt-6 max-w-md font-[family-name:var(--font-dm-sans)] text-base leading-relaxed text-white/60 md:text-lg"
        >
          Daugherty & Honey for SGA President & Vice President.
          A bold vision for every Bruin.
        </motion.p>

        {/* Candidate initials with SVG ring draw */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85, ease: [0, 0, 0.2, 1] }}
          className="mt-10 flex items-center justify-center gap-8 sm:gap-12"
        >
          {[
            { initial: "D", name: "Daugherty", role: "President" },
            { initial: "H", name: "Honey", role: "Vice President" },
          ].map((c, i) => (
            <div key={c.initial} className="flex flex-col items-center gap-2">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <svg
                  viewBox="0 0 80 80"
                  className="absolute inset-0 h-full w-full"
                >
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="38"
                    fill="none"
                    stroke="rgba(253,206,0,0.4)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 1 + i * 0.15,
                      ease: [0, 0, 0.2, 1],
                    }}
                  />
                </svg>
                <span className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-white">
                  {c.initial}
                </span>
              </div>
              <span className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-white/90">
                {c.name}
              </span>
              <span className="font-[family-name:var(--font-figtree)] text-[0.6rem] font-bold uppercase tracking-[0.12em] text-gold/70">
                {c.role}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05, ease: [0, 0, 0.2, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <MagneticButton>
            <a
              href="#involved"
              className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 font-[family-name:var(--font-figtree)] text-sm font-bold uppercase tracking-[0.04em] text-dark transition-all duration-200 ease-out hover:bg-gold-hover hover:shadow-[0_8px_30px_rgba(253,206,0,0.25)]"
            >
              Join the Hive
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#platform"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 font-[family-name:var(--font-figtree)] text-sm font-bold uppercase tracking-[0.04em] text-white/80 transition-all duration-200 ease-out hover:border-white/40 hover:text-white"
            >
              Our Platform
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — editorial line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 z-[1] flex -translate-x-1/2 items-center gap-3"
      >
        <span className="font-[family-name:var(--font-figtree)] text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-white/30">
          Scroll
        </span>
        <motion.div
          className="h-8 w-px bg-white/20"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0, 0, 0.2, 1],
          }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
