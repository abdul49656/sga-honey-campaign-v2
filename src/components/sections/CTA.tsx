"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { TextSwapButton } from "@/components/ui/TextSwapButton";
import { useScrollReveal, fadeUp } from "@/hooks/useScrollReveal";
import { useIsMobile } from "@/hooks/useIsMobile";

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

  const { ref: contentRef, visible } = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-dark"
      style={{ padding: "clamp(8rem, 16vh, 14rem) var(--section-pad-x)" }}
    >
      {/* Background with parallax on desktop */}
      <motion.div
        className="absolute inset-[-20%]"
        style={isMobile ? {} : { y: bgY, scale: bgScale }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/campaign/duo-walking-fountain.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-dark/60" />

      <div ref={contentRef} className="relative mx-auto max-w-[90rem]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-lg leading-[0.95] text-white">
            <TextReveal delay={0} stagger={0.04}>Ready to make it</TextReveal>
            <br />
            <span className="text-gold">
              <TextReveal delay={0.3} stagger={0.03} splitBy="chars">golden?</TextReveal>
            </span>
          </h2>

          <p
            className="mt-6 font-[family-name:var(--font-montserrat)] text-[0.9375rem] text-white/65"
            style={fadeUp(visible, 350)}
          >
            Your vote is your voice. Make it count.
          </p>

          <div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            style={fadeUp(visible, 500)}
          >
            <TextSwapButton href="#involved" variant="filled">Join the Campaign</TextSwapButton>
            <TextSwapButton
              href="#platform"
              variant="outline"
              className="border-white/25 text-white/75 hover:border-white/50 hover:text-white"
            >
              Read Our Platform
            </TextSwapButton>
          </div>
        </div>
      </div>
    </section>
  );
}
