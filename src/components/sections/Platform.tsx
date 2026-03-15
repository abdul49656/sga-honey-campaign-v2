"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

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
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl bg-white p-8 transition-shadow duration-500 hover:shadow-xl md:p-10"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)" }}
      initial={{ opacity: 0, y: isMobile ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: isMobile ? 0.35 : 0.6,
        delay: isMobile ? 0 : index * 0.07,
        ease: isMobile ? "easeOut" : [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative flex flex-col gap-5">
        {/* Emoji + Number row */}
        <div className="flex items-center justify-between">
          <span className="text-4xl md:text-5xl">
            {pillar.emoji}
          </span>
          <span className="font-[family-name:var(--font-cormorant)] text-[2rem] font-bold leading-none text-dark/15 md:text-[2.5rem]">
            {pillar.number}
          </span>
        </div>

        <div className="h-px w-full bg-dark/[0.08]" />

        <h3 className="font-[family-name:var(--font-cormorant)] text-display-md text-text-primary">
          {pillar.title}
        </h3>

        <p className="max-w-md font-[family-name:var(--font-montserrat)] text-[0.9375rem] leading-[1.8] text-text-secondary">
          {pillar.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Platform() {
  return (
    <section id="platform" className="overflow-hidden bg-cream-deep">
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

      <div className="mx-auto mt-12 max-w-[90rem] px-6 pb-16 md:mt-16 md:px-10 md:pb-24 lg:px-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
