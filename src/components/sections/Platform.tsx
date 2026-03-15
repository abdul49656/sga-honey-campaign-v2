"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const pillars = [
  {
    emoji: "💪",
    number: "01",
    title: "Fitness",
    summary:
      "Students have consistently raised concerns about overcrowding at FitRec and limited access to certain equipment across campus facilities. When workout spaces are overcrowded or lack necessary resources, it creates barriers that make it difficult for students to maintain consistent and healthy routines.",
    details: [
      "Our goal is to advocate for practical solutions that directly address these concerns. One opportunity is opening the workout space in Benz Hall with accessible cardio machines and low-weight dumbbells. This would create an additional fitness space that helps relieve congestion at FitRec while making exercise more convenient for students living and studying nearby.",
      "We also plan to communicate directly with university leadership about expanding access to additional equipment across campus facilities, including a Smith machine, more cardio machines, and expanded free weights.",
      "Through strong communication with administration and consistent advocacy for student needs, we will work to make fitness opportunities at Belmont more accessible, convenient, and supportive of student well-being.",
    ],
  },
  {
    emoji: "🍽️",
    number: "02",
    title: "Fuel",
    summary:
      "Food access on campus should meet the needs of every student. Belmont is home to students from a wide range of cultural and religious backgrounds, and it is important that dining options reflect that diversity.",
    details: [
      "Our campaign is committed to exploring halal and kosher food preparation standards and working closely with campus dining leadership and the campus dietitian to better understand how these dietary needs can be supported. This includes ensuring that food options are properly prepared, clearly labeled, and accessible to students who observe these dietary practices.",
      "By opening conversations with dining services and university leadership, we hope to identify meaningful ways Belmont can expand inclusive dining options while maintaining high standards of food safety and preparation.",
    ],
  },
  {
    emoji: "🎭",
    number: "03",
    title: "Make Belmont Your Stage",
    summary:
      "Belmont is known for its creativity, talent, and artistic culture, yet many students have shared concerns about limited access to performance and rehearsal spaces across campus.",
    details: [
      "Through SGA's new partnership with the Cookery, students now have access to a stage that can be used for future performances, student showcases, and creative events. This partnership represents an exciting step toward expanding opportunities for students to share their work and collaborate across disciplines.",
      "Our goal is to continue advocating for better awareness and utilization of existing venues across campus. Spaces such as The Well, Curb Cafe, and the new event BUILD have strong potential to host student performances, cultural programming, and WELLCORE events.",
      "By promoting and activating underused spaces, Belmont can create more opportunities for students to perform, connect, and celebrate the creative community that makes this campus unique.",
    ],
  },
  {
    emoji: "💡",
    number: "04",
    title: "Campus Lighting and Safety",
    summary:
      "Campus safety is a priority for every student, especially after dark. Several areas across Belmont have been identified by students as being poorly lit, including the space between Beaman and Gabhart, which many students walk through in the evening.",
    details: [
      "Improving lighting in these areas is a simple but meaningful step that can help students feel safer while moving across campus. Our campaign will advocate for additional lighting, as well as the addition of tables, seating, and string lights that would help transform the area into a more welcoming and populated space.",
      "By working directly with university administration and campus safety leadership, we will advocate for practical improvements that make Belmont's walkways safer, brighter, and more comfortable for students at all hours of the day.",
    ],
  },
];

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl bg-white p-8 transition-shadow duration-500 hover:shadow-xl md:p-10"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)" }}
      initial={{ opacity: 0, y: isMobile ? 20 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-20px" : "-60px" }}
      transition={{
        duration: isMobile ? 0.85 : 0.65,
        delay: isMobile ? index * 0.05 : index * 0.07,
        ease: [0.16, 1, 0.3, 1],
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

        <p className="font-[family-name:var(--font-montserrat)] text-[0.9375rem] leading-[1.8] text-text-secondary">
          {pillar.summary}
        </p>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 overflow-hidden"
            >
              {pillar.details.map((detail, i) => (
                <p
                  key={i}
                  className="font-[family-name:var(--font-montserrat)] text-[0.875rem] leading-[1.8] text-text-secondary"
                >
                  {detail}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Read more toggle */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="self-start font-[family-name:var(--font-montserrat)] text-[0.8125rem] font-semibold text-gold transition-colors duration-200 hover:text-gold-hover"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      </div>
    </motion.div>
  );
}

export function Platform() {
  return (
    <section id="platform" className="overflow-hidden bg-cream-deep">
      <motion.div
        className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14"
        style={{ paddingTop: "var(--section-pad-y)" }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-label text-text-muted">Our Platform</span>
        <h2 className="mt-3 text-display-md text-text-primary">
          Four pillars for a{" "}
          <em className="font-[family-name:var(--font-cormorant)] text-gold">brighter</em>{" "}
          Belmont.
        </h2>
      </motion.div>

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
