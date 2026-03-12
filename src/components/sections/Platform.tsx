"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

const pillars = [
  {
    emoji: "💛",
    number: "01",
    title: "Student Wellness & Mental Health",
    description:
      "Expanding counseling access, creating quiet study sanctuaries, and launching peer support programs that meet students where they are.",
  },
  {
    emoji: "🤝",
    number: "02",
    title: "Campus Unity & Inclusion",
    description:
      "Building bridges across organizations, amplifying underrepresented voices, and creating spaces where every Bruin belongs.",
  },
  {
    emoji: "📚",
    number: "03",
    title: "Academic Resources & Advocacy",
    description:
      "Fighting for affordable materials, extended library hours, and mentorship programs that connect students with real-world opportunities.",
  },
  {
    emoji: "🌿",
    number: "04",
    title: "Sustainability & Campus Life",
    description:
      "Championing green initiatives, improving campus dining options, and creating vibrant communal spaces students actually want to use.",
  },
];

function PillarCard({
  pillar,
  index,
  isMobile,
}: {
  pillar: (typeof pillars)[0];
  index: number;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-3xl bg-white p-8 transition-shadow duration-500 hover:shadow-xl md:p-10"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)" }}
      initial={{ opacity: 0, y: isMobile ? 16 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: isMobile ? 0.5 : 0.7, delay: isMobile ? index * 0.06 : index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Content */}
      <div className="relative flex flex-col gap-5">
        {/* Emoji + Number row */}
        <div className="flex items-center justify-between">
          <motion.span
            className="animate-emoji-bounce text-4xl md:text-5xl"
            initial={{ opacity: 0, scale: isMobile ? 1 : 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: isMobile ? 0.35 : 0.6, delay: isMobile ? 0 : 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {pillar.emoji}
          </motion.span>
          <motion.span
            className="font-[family-name:var(--font-cormorant)] text-[2rem] font-bold leading-none text-dark/15 md:text-[2.5rem]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: isMobile ? 0.35 : 0.6, delay: isMobile ? 0 : 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {pillar.number}
          </motion.span>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px w-full bg-dark/[0.08]"
          initial={{ scaleX: isMobile ? 1 : 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: isMobile ? 0.35 : 0.8, delay: isMobile ? 0 : 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
        />

        {/* Title */}
        <h3 className="text-display-md text-text-primary">
          <TextReveal>{pillar.title}</TextReveal>
        </h3>

        {/* Description */}
        <motion.p
          className="max-w-md font-[family-name:var(--font-dm-sans)] text-[0.9375rem] leading-[1.8] text-text-secondary"
          initial={{ opacity: 0, y: isMobile ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.35 : 0.7, delay: isMobile ? 0 : 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {pillar.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function Platform() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section id="platform" className="overflow-hidden bg-cream-deep">
      {/* Section heading */}
      <div
        className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14"
        style={{ paddingTop: "var(--section-pad-y)" }}
      >
        <span className="text-label text-text-muted">Our Platform</span>
        <h2 className="mt-3 text-display-md text-text-primary">
          Four pillars for a{" "}
          <em className="font-[family-name:var(--font-cormorant)] text-gold">brighter</em>{" "}
          Belmont.
        </h2>
      </div>

      {/* Card grid */}
      <div className="mx-auto mt-12 max-w-[90rem] px-6 pb-16 md:mt-16 md:px-10 md:pb-24 lg:px-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
