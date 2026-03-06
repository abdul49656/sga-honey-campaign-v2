"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";

const candidates = [
  {
    initial: "D",
    name: "Daugherty",
    role: "President",
    bio: "Committed to amplifying every student voice on campus. With experience in student senate and a passion for mental health advocacy, Daugherty brings the leadership Belmont needs to thrive.",
  },
  {
    initial: "H",
    name: "Honey",
    role: "Vice President",
    bio: "A bridge-builder focused on campus unity and inclusion. Honey's background in community organizing and sustainability initiatives ensures every Bruin has a seat at the table.",
  },
];

export function Candidates() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const c1Opacity = useTransform(scrollYProgress, [0, 0.35, 0.45, 0.5], [1, 1, 0, 0]);
  const c1Y = useTransform(scrollYProgress, [0, 0.35, 0.5], ["0%", "0%", "-15%"]);
  const c2Opacity = useTransform(scrollYProgress, [0.45, 0.55, 1], [0, 1, 1]);
  const c2Y = useTransform(scrollYProgress, [0.45, 0.55], ["15%", "0%"]);
  const dot1 = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const dot2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 1]);
  const watermark1 = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const watermark2 = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <>
      {/* Desktop: sticky scroll */}
      <section
        id="candidates"
        ref={sectionRef}
        className="relative hidden min-h-[200vh] md:block"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-cream">
          {/* Background watermark */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="select-none font-[family-name:var(--font-cormorant)] text-[30vw] font-bold leading-none text-dark/[0.02]">
              <motion.span className="inline-block" style={{ opacity: watermark1 }}>
                D
              </motion.span>
              <motion.span className="inline-block" style={{ opacity: watermark2 }}>
                H
              </motion.span>
            </span>
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-8">
            {/* Section label */}
            <div className="absolute left-8 top-8">
              <Eyebrow>Your Candidates</Eyebrow>
            </div>

            {/* Candidate 1 — left aligned */}
            <motion.div
              className="absolute inset-0 flex items-center px-8"
              style={{ opacity: c1Opacity, y: c1Y }}
            >
              <div className="mx-auto w-full max-w-7xl">
                <div className="max-w-xl lg:max-w-2xl">
                  <span className="font-[family-name:var(--font-figtree)] text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-gold">
                    {candidates[0].role}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-cormorant)] text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em] text-text-primary">
                    {candidates[0].name}
                  </h3>
                  <div className="mt-4 h-px w-12 bg-gold/50" />
                  <p className="mt-6 max-w-md font-[family-name:var(--font-dm-sans)] text-base leading-relaxed text-text-secondary md:text-lg">
                    {candidates[0].bio}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Candidate 2 — right aligned */}
            <motion.div
              className="absolute inset-0 flex items-center px-8"
              style={{ opacity: c2Opacity, y: c2Y }}
            >
              <div className="mx-auto w-full max-w-7xl">
                <div className="ml-auto max-w-xl text-right lg:max-w-2xl">
                  <span className="font-[family-name:var(--font-figtree)] text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-gold">
                    {candidates[1].role}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-cormorant)] text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em] text-text-primary">
                    {candidates[1].name}
                  </h3>
                  <div className="ml-auto mt-4 h-px w-12 bg-gold/50" />
                  <p className="ml-auto mt-6 max-w-md font-[family-name:var(--font-dm-sans)] text-base leading-relaxed text-text-secondary md:text-lg">
                    {candidates[1].bio}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Progress dots */}
            <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-2">
              <motion.div className="h-1.5 w-1.5 rounded-full bg-dark" style={{ opacity: dot1 }} />
              <motion.div className="h-1.5 w-1.5 rounded-full bg-dark" style={{ opacity: dot2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: standard cards */}
      <section id="candidates-mobile" className="bg-cream py-16 md:hidden">
        <div className="px-4">
          <Eyebrow>Your Candidates</Eyebrow>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-[clamp(2rem,6vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary">
            Meet the <em className="text-gold">team</em>.
          </h2>

          <div className="mt-10 space-y-10">
            {candidates.map((c) => (
              <motion.div
                key={c.initial}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
              >
                <span className="font-[family-name:var(--font-figtree)] text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-gold">
                  {c.role}
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-cormorant)] text-4xl font-bold tracking-[-0.02em] text-text-primary">
                  {c.name}
                </h3>
                <div className="mt-3 h-px w-10 bg-gold/50" />
                <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-text-secondary">
                  {c.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
