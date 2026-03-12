"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";

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
    bio: "A bridge-builder focused on campus unity and inclusion. Honey\u2019s background in community organizing and sustainability initiatives ensures every Bruin has a seat at the table.",
  },
];

function CandidateBlock({
  candidate,
  index,
}: {
  candidate: (typeof candidates)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-10 md:py-16 lg:py-20"
    >
      {/* Watermark initial — clipped to prevent overflow, parallax on desktop only */}
      <motion.span
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-[family-name:var(--font-cormorant)] text-[clamp(14rem,30vw,25rem)] font-bold leading-none text-dark/[0.05]"
        style={{
          y: isMobile ? 0 : watermarkY,
          right: isReversed ? "auto" : "5%",
          left: isReversed ? "5%" : "auto",
        }}
        aria-hidden="true"
      >
        {candidate.initial}
      </motion.span>

      <div
        className={`relative mx-auto flex max-w-[90rem] flex-col gap-8 px-6 md:flex-row md:items-center md:gap-12 md:px-10 lg:gap-20 lg:px-14 ${
          isReversed ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Visual element — initial in a card */}
        <div className="flex flex-1 items-center justify-center">
          <ParallaxLayer speed={0.1}>
            <motion.div
              className="animate-float relative flex h-56 w-56 items-center justify-center rounded-3xl bg-white md:h-72 md:w-72 lg:h-80 lg:w-80"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-[family-name:var(--font-cormorant)] text-[clamp(5rem,10vw,8rem)] font-bold leading-none text-dark/30">
                {candidate.initial}
              </span>
              {/* Gold accent line */}
              <div className="absolute bottom-6 left-1/2 h-px w-12 -translate-x-1/2 bg-gold/40" />
            </motion.div>
          </ParallaxLayer>
        </div>

        {/* Text content in a card — centered */}
        <motion.div
          className="flex-1 flex flex-col items-center text-center rounded-3xl bg-white p-8 md:p-10"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-label text-gold">
            {candidate.role}
          </span>
          <h3 className="mt-3 text-display-lg text-text-primary">
            <TextReveal>{candidate.name}</TextReveal>
          </h3>
          <motion.div
            className="mx-auto mt-4 h-px w-12 bg-gold/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.p
            className="mt-6 max-w-md font-[family-name:var(--font-dm-sans)] text-[0.9375rem] leading-[1.8] text-text-secondary"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {candidate.bio}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export function Candidates() {
  return (
    <section id="candidates" className="overflow-hidden bg-cream-deep">
      {/* Section label */}
      <div className="mx-auto max-w-[90rem] px-6 pt-16 md:px-10 md:pt-24 lg:px-14">
        <span className="text-label text-text-muted">Your Candidates</span>
        <h2 className="mt-3 text-display-md text-text-primary">
          Meet the <em className="font-[family-name:var(--font-cormorant)] text-gold">team.</em>
        </h2>
      </div>

      {candidates.map((c, i) => (
        <CandidateBlock key={c.initial} candidate={c} index={i} />
      ))}
    </section>
  );
}
