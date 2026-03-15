"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { useIsMobile } from "@/hooks/useIsMobile";

const candidates = [
  {
    initial: "D",
    name: "Abi Daugherty",
    role: "President",
    photo: "/campaign/headshot-abi.jpg",
    cropPosition: "25% 15%",
    bio: "Committed to amplifying every student voice on campus. With experience in student senate and a passion for mental health advocacy, Abi brings the leadership Belmont needs to thrive.",
  },
  {
    initial: "H",
    name: "Dia Honey Abdullah",
    role: "Vice President",
    photo: "/campaign/headshot-dia.jpg",
    cropPosition: "center 15%",
    bio: "A bridge-builder focused on campus unity and inclusion. Dia\u2019s background in community organizing and sustainability initiatives ensures every Bruin has a seat at the table.",
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
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const isReversed = index % 2 !== 0;

  if (isMobile) {
    return (
      <div className="relative overflow-hidden py-10">
        <div className="relative mx-auto flex max-w-[90rem] flex-col gap-6 px-6">
          {/* Headshot — mobile */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative h-64 w-52 overflow-hidden rounded-3xl bg-white"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)" }}
            >
              <img
                src={candidate.photo}
                alt={candidate.name}
                className="h-full w-full object-cover"
                style={{ objectPosition: candidate.cropPosition }}
              />
            </div>
          </motion.div>

          {/* Text card — mobile */}
          <motion.div
            className="flex flex-col items-center text-center rounded-3xl bg-white p-8"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.8, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-label text-gold">{candidate.role}</span>
            <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-display-lg text-text-primary">
              {candidate.name}
            </h3>
            <div className="mx-auto mt-4 h-px w-12 bg-gold/50" />
            <p className="mt-6 max-w-md font-[family-name:var(--font-montserrat)] text-[0.9375rem] leading-[1.8] text-text-secondary">
              {candidate.bio}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-10 md:py-16 lg:py-20"
    >
      {/* Watermark — parallax on desktop only */}
      <motion.span
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-[family-name:var(--font-cormorant)] text-[clamp(14rem,30vw,25rem)] font-bold leading-none text-dark/[0.05]"
        style={{
          y: watermarkY,
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
        {/* Headshot photo */}
        <div className="flex flex-1 items-center justify-center">
          <ParallaxLayer speed={0.1}>
            <motion.div
              className="animate-float relative overflow-hidden rounded-3xl bg-white md:h-[22rem] md:w-[17rem] lg:h-[26rem] lg:w-[20rem]"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={candidate.photo}
                alt={candidate.name}
                className="h-full w-full object-cover"
                style={{ objectPosition: candidate.cropPosition }}
              />
            </motion.div>
          </ParallaxLayer>
        </div>

        {/* Text card */}
        <motion.div
          className="flex-1 flex flex-col items-center text-center rounded-3xl bg-white p-8 md:p-10"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-label text-gold">{candidate.role}</span>
          <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-display-lg text-text-primary">
            {candidate.name}
          </h3>
          <div className="mx-auto mt-4 h-px w-12 bg-gold/50" />
          <p className="mt-6 max-w-md font-[family-name:var(--font-montserrat)] text-[0.9375rem] leading-[1.8] text-text-secondary">
            {candidate.bio}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function Candidates() {
  return (
    <section id="candidates" className="overflow-hidden bg-cream-deep">
      <motion.div
        className="mx-auto max-w-[90rem] px-6 pt-16 md:px-10 md:pt-24 lg:px-14"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-label text-text-muted">Your Candidates</span>
        <h2 className="mt-3 text-display-md text-text-primary">
          Meet the <em className="font-[family-name:var(--font-cormorant)] text-gold">team.</em>
        </h2>
      </motion.div>

      {candidates.map((c, i) => (
        <CandidateBlock key={c.initial} candidate={c} index={i} />
      ))}
    </section>
  );
}
