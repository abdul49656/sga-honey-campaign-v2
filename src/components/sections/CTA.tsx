"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { TextSwapButton } from "@/components/ui/TextSwapButton";

export function CTA() {
  return (
    <section
      className="relative overflow-hidden bg-dark"
      style={{ padding: "clamp(8rem, 16vh, 14rem) var(--section-pad-x)" }}
    >
      {/* Pulsing radial gold glow */}
      <div
        className="animate-pulse-glow pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(253,206,0,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[90rem]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-lg text-white">
            <TextReveal delay={0} stagger={0.04}>
              Ready to make it
            </TextReveal>
            <br />
            <span className="text-gold">
              <TextReveal delay={0.3} stagger={0.03} splitBy="chars">
                golden?
              </TextReveal>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-[family-name:var(--font-dm-sans)] text-[0.9375rem] text-white/65"
          >
            Your vote is your voice. Make it count.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <TextSwapButton href="#involved" variant="filled">
              Join the Campaign
            </TextSwapButton>
            <TextSwapButton
              href="#platform"
              variant="outline"
              className="border-white/25 text-white/75 hover:border-white/50 hover:text-white"
            >
              Read Our Platform
            </TextSwapButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
