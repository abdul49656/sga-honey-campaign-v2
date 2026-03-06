"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const ORBS = [
  { size: 300, x: "15%", y: "20%", duration: 18 },
  { size: 400, x: "70%", y: "60%", duration: 22 },
  { size: 250, x: "80%", y: "15%", duration: 15 },
];

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-dark py-20 md:py-28 lg:py-32">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {ORBS.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background:
                "radial-gradient(circle, rgba(253,206,0,0.1) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -50, 30, 0],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5vw+1rem,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            <TextReveal delay={0} stagger={0.05}>
              Ready to make it
            </TextReveal>
            <br />
            <span className="text-gold [text-shadow:0_0_60px_rgba(253,206,0,0.3)]">
              <TextReveal delay={0.3} stagger={0.04} splitBy="chars">
                golden?
              </TextReveal>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0, 0, 0.2, 1] }}
            className="mt-6 font-[family-name:var(--font-dm-sans)] text-base text-white/45"
          >
            Your vote is your voice. Make it count.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0, 0, 0.2, 1] }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          >
            <MagneticButton>
              <a
                href="#involved"
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-[family-name:var(--font-figtree)] text-sm font-bold uppercase tracking-[0.04em] text-dark transition-all duration-200 ease-out hover:bg-gold-hover hover:shadow-[0_8px_30px_rgba(253,206,0,0.25)]"
              >
                Join the Campaign
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#platform"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3.5 font-[family-name:var(--font-figtree)] text-sm font-bold uppercase tracking-[0.04em] text-white/60 transition-all duration-200 ease-out hover:border-white/30 hover:text-white"
              >
                Read Our Platform
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
