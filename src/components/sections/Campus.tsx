"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

const images = [
  {
    src: "/campus/outcomes.jpg",
    alt: "Belmont University campus outcomes",
    caption: "Outcomes That Matter",
    area: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/campus/hub.jpg",
    alt: "Belmont campus hub",
    caption: "The Hub",
    area: "",
  },
  {
    src: "/campus/wellness.jpg",
    alt: "Student wellness programs",
    caption: "Wellness First",
    area: "",
  },
  {
    src: "/campus/student.jpg",
    alt: "Belmont student life",
    caption: "Student Life",
    area: "",
  },
  {
    src: "/campus/community.jpg",
    alt: "Belmont community",
    caption: "Community",
    area: "",
  },
];

function GalleryItem({ img }: { img: (typeof images)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className={`group relative min-h-[220px] overflow-hidden rounded-xl lg:aspect-[4/3] lg:min-h-0 ${img.area}`}
      style={{ scale, opacity }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="font-[family-name:var(--font-figtree)] text-xs font-bold uppercase tracking-[0.1em] text-white">
            {img.caption}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Campus() {
  return (
    <section id="campus" className="bg-cream py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="mb-12 max-w-xl px-2 md:mb-16 md:px-2"
        >
          <Eyebrow>Campus Life</Eyebrow>
          <SectionHeading className="mt-3">
            This is <em className="text-gold">our</em> Belmont.
          </SectionHeading>
          <p className="mt-4 max-w-md font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-text-secondary">
            A campus that inspires, connects, and supports every student.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {images.map((img) => (
            <GalleryItem key={img.caption} img={img} />
          ))}
        </div>
      </div>
    </section>
  );
}
