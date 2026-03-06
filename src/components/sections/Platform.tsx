"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heart, Users, BookOpen, Leaf } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    number: "01",
    title: "Student Wellness & Mental Health",
    description:
      "Expanding counseling access, creating quiet study sanctuaries, and launching peer support programs that meet students where they are.",
  },
  {
    icon: Users,
    number: "02",
    title: "Campus Unity & Inclusion",
    description:
      "Building bridges across organizations, amplifying underrepresented voices, and creating spaces where every Bruin belongs.",
  },
  {
    icon: BookOpen,
    number: "03",
    title: "Academic Resources & Advocacy",
    description:
      "Fighting for affordable materials, extended library hours, and mentorship programs that connect students with real-world opportunities.",
  },
  {
    icon: Leaf,
    number: "04",
    title: "Sustainability & Campus Life",
    description:
      "Championing green initiatives, improving campus dining options, and creating vibrant communal spaces students actually want to use.",
  },
];

function PillarCard({ pillar }: { pillar: (typeof pillars)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = pillar.icon;

  return (
    <div
      ref={ref}
      className="flex h-full w-[85vw] flex-shrink-0 flex-col justify-center px-8 sm:w-[70vw] md:w-[50vw] md:px-12 lg:w-[40vw]"
    >
      <motion.span
        className="pointer-events-none select-none font-[family-name:var(--font-cormorant)] text-[clamp(6rem,12vw,10rem)] font-bold leading-none"
        style={{
          WebkitTextStroke: "1px rgba(253,206,0,0.25)",
          WebkitTextFillColor: "transparent",
        }}
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: [0, 0, 0.2, 1] }}
      >
        {pillar.number}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: [0, 0, 0.2, 1] }}
        className="-mt-6"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
          <Icon className="h-5 w-5 text-gold-hover" strokeWidth={1.5} />
        </div>

        <h3 className="mt-5 max-w-sm font-[family-name:var(--font-cormorant)] text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary">
          {pillar.title}
        </h3>

        <p className="mt-4 max-w-sm font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-text-secondary md:text-base">
          {pillar.description}
        </p>
      </motion.div>

      <motion.div
        className="mt-8 h-px w-full bg-dark/5"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: [0, 0, 0.2, 1] }}
        style={{ originX: 0 }}
      />
    </div>
  );
}

export function Platform() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="platform" className="bg-white">
      {/* Desktop: horizontal scroll */}
      <div className="hidden md:block">
        <section ref={sectionRef} className="relative h-[300vh]">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <div className="px-8 pb-8 lg:px-12">
              <Eyebrow>Our Platform</Eyebrow>
              <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw+0.5rem,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary">
                Four pillars for a <em className="text-gold">brighter</em>{" "}
                Belmont.
              </h2>
            </div>

            <motion.div className="flex" style={{ x }}>
              {pillars.map((pillar) => (
                <PillarCard key={pillar.number} pillar={pillar} />
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* Mobile: vertical stack */}
      <div className="py-16 md:hidden">
        <div className="px-4 pb-8">
          <Eyebrow>Our Platform</Eyebrow>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw+0.5rem,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary">
            Four pillars for a <em className="text-gold">brighter</em> Belmont.
          </h2>
        </div>

        <div className="space-y-12 px-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0, 0, 0.2, 1],
                }}
              >
                <span
                  className="font-[family-name:var(--font-cormorant)] text-5xl font-bold leading-none"
                  style={{
                    WebkitTextStroke: "1px rgba(253,206,0,0.25)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {pillar.number}
                </span>

                <div className="-mt-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
                    <Icon className="h-5 w-5 text-gold-hover" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-xl font-bold tracking-[-0.01em] text-text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-text-secondary">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
