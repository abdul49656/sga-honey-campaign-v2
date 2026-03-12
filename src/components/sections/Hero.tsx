"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { TextSwapButton } from "@/components/ui/TextSwapButton";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.8]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Video background */}
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

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <motion.div
        className="relative z-[1] mx-auto w-full max-w-[90rem] px-6 py-32 md:px-10 lg:px-14"
        style={{ y: contentY }}
      >
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-label text-white/55"
        >
          Belmont University &mdash; SGA 2026
        </motion.span>

        {/* Massive headline */}
        <h1 className="mt-8 text-display-hero text-white">
          <TextReveal delay={0.3} stagger={0.05}>
            Join the
          </TextReveal>
          <br />
          <span className="text-gold">
            <TextReveal delay={0.6} stagger={0.04} splitBy="chars">
              Hive.
            </TextReveal>
          </span>
        </h1>

        {/* Subline + CTA */}
        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm font-[family-name:var(--font-dm-sans)] text-[0.9375rem] leading-[1.7] text-white/70"
          >
            Daugherty & Honey for SGA President & Vice President.
            A bold vision for every Bruin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <TextSwapButton href="#involved" variant="filled">
              Join the Hive
            </TextSwapButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-[family-name:var(--font-figtree)] text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-white/45">
          Scroll
        </span>
        <motion.div
          className="h-10 w-px bg-white/35"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
