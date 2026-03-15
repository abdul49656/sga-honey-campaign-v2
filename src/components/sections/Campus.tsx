"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

const images = [
  {
    src: "/campaign/duo-fountain-wave.jpg",
    alt: "Daugherty & Honey waving at the Belmont fountain",
    caption: "For Every Bruin",
    width: "lg:col-span-2 lg:row-span-2",
    speed: 0.12,
    objectPosition: "center 65%",
  },
  {
    src: "/campus/hub.jpg",
    alt: "Belmont campus hub",
    caption: "The Hub",
    width: "",
    speed: 0.2,
  },
  {
    src: "/campus/wellness.jpg",
    alt: "Student wellness programs",
    caption: "Wellness First",
    width: "",
    speed: 0.08,
  },
  {
    src: "/campus/student.jpg",
    alt: "Belmont student life",
    caption: "Student Life",
    width: "",
    speed: 0.15,
  },
  {
    src: "/campus/community.jpg",
    alt: "Belmont community",
    caption: "Community",
    width: "",
    speed: 0.1,
  },
];

function GalleryItem({ img }: { img: (typeof images)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [img.speed * 100, img.speed * -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.95, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className={`group relative min-h-[240px] overflow-hidden rounded-2xl lg:aspect-[4/3] lg:min-h-0 ${img.width}`}
      style={{ opacity }}
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className="h-[120%] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          style={{ objectPosition: img.objectPosition || "center center" }}
        />
      </motion.div>

      {/* Subtle permanent tint for depth */}
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/0" />

      {/* Caption on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-label text-[0.625rem] text-white/90">
            {img.caption}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Campus() {
  return (
    <section
      id="campus"
      className="bg-cream"
      style={{ padding: "var(--section-pad-y) 0" }}
    >
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-xl md:mb-16"
        >
          <span className="text-label text-text-muted">Campus Life</span>
          <h2 className="mt-3 text-display-md text-text-primary">
            This is <em className="font-[family-name:var(--font-cormorant)] text-gold">our</em>{" "}
            <TextReveal>Belmont.</TextReveal>
          </h2>
          <p className="mt-4 max-w-md font-[family-name:var(--font-montserrat)] text-[0.9375rem] leading-[1.7] text-text-secondary">
            A campus that inspires, connects, and supports every student.
          </p>
        </motion.div>
      </div>

      {/* Gallery grid — full bleed */}
      <div className="mx-auto max-w-[90rem] px-3 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 md:gap-3">
          {images.map((img) => (
            <GalleryItem key={img.caption} img={img} />
          ))}
        </div>
      </div>
    </section>
  );
}
