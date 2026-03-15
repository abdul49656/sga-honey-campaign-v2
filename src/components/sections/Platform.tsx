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
      "Advocating for expanded workout spaces and equipment across campus, including opening the Benz Hall fitness space and adding a Smith machine, more cardio machines, and free weights to relieve overcrowding at FitRec.",
    details: [
      "Open the workout space in Benz Hall with accessible cardio machines and low-weight dumbbells to create an additional fitness option and reduce congestion at FitRec.",
      "Communicate directly with university leadership about expanding equipment across campus facilities, including a Smith machine, more cardio machines, and expanded free weights.",
      "Through consistent advocacy and strong communication with administration, work to make fitness at Belmont more accessible, convenient, and supportive of student well-being.",
    ],
  },
  {
    emoji: "🍽️",
    number: "02",
    title: "Fuel",
    summary:
      "Ensuring campus dining reflects the diversity of Belmont's student body by exploring halal and kosher preparation standards and working with dining leadership to expand inclusive, clearly labeled food options.",
    details: [
      "Explore halal and kosher food preparation standards and work closely with campus dining leadership and the campus dietitian to better understand how these dietary needs can be supported.",
      "Ensure food options are properly prepared, clearly labeled, and accessible to students who observe these dietary practices.",
      "Open conversations with dining services and university leadership to identify meaningful ways Belmont can expand inclusive dining options while maintaining high food safety standards.",
    ],
  },
  {
    emoji: "🎭",
    number: "03",
    title: "Make Belmont Your Stage",
    summary:
      "Expanding performance and creative opportunities through SGA's new partnership with the Cookery and better utilization of underused campus venues like The Well, Curb Cafe, and the new event BUILD.",
    details: [
      "Leverage SGA's new partnership with the Cookery, giving students access to a stage for performances, showcases, and creative events.",
      "Advocate for better awareness and utilization of existing venues like The Well, Curb Cafe, and the new event BUILD for student performances, cultural programming, and WELLCORE events.",
      "By promoting and activating underused spaces, create more opportunities for students to perform, connect, and celebrate Belmont's creative community.",
    ],
  },
  {
    emoji: "💡",
    number: "04",
    title: "Campus Lighting & Safety",
    summary:
      "Improving safety after dark by advocating for better lighting in poorly lit areas like between Beaman and Gabhart, plus adding tables, seating, and string lights to make walkways more welcoming.",
    details: [
      "Advocate for additional lighting in areas identified by students as poorly lit, including the space between Beaman and Gabhart.",
      "Push for tables, seating, and string lights to transform dark areas into welcoming, populated spaces that feel safer at all hours.",
      "Work directly with university administration and campus safety leadership to deliver practical improvements that make Belmont's walkways safer, brighter, and more comfortable.",
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
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

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

        <p className="font-[family-name:var(--font-montserrat)] text-[0.9375rem] leading-[1.8] text-text-secondary">
          {pillar.summary}
        </p>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 overflow-hidden"
            >
              {pillar.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-[family-name:var(--font-montserrat)] text-[0.875rem] leading-[1.8] text-text-secondary"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{detail}</span>
                </li>
              ))}
            </motion.ul>
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
