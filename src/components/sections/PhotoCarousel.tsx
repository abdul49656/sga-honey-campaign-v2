"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const carouselImages = [
  { src: "/campaign/duo-balcony.jpg", alt: "Daugherty & Honey on balcony" },
  { src: "/campaign/duo-fountain-wave.jpg", alt: "Waving at the fountain" },
  { src: "/campaign/duo-closeup-houndstooth.jpg", alt: "Close-up portrait" },
  { src: "/campaign/duo-stairs.jpg", alt: "Sitting on campus stairs" },
  { src: "/campaign/duo-lobby.jpg", alt: "In the campus lobby" },
  { src: "/campaign/duo-overhead.jpg", alt: "Overhead on brick walkway" },
  { src: "/campaign/duo-lamppost.jpg", alt: "By the lamp post" },
  { src: "/campaign/duo-walking-fountain.jpg", alt: "Walking to the fountain" },
];

function CarouselImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[280px] w-[210px] flex-shrink-0 overflow-hidden rounded-2xl md:h-[360px] md:w-[270px] lg:h-[420px] lg:w-[320px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ objectPosition: "center 25%" }}
      />
      <div className="absolute inset-0 bg-black/5" />
    </div>
  );
}

export function PhotoCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked horizontal movement — moves strip as user scrolls page
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const images = [...carouselImages, ...carouselImages];

  return (
    <div ref={sectionRef} className="overflow-hidden bg-cream-deep py-12 md:py-16">
      <motion.div
        className="flex gap-3 md:gap-4"
        style={{ x }}
      >
        {images.map((img, i) => (
          <CarouselImage key={`${img.src}-${i}`} src={img.src} alt={img.alt} />
        ))}
      </motion.div>
    </div>
  );
}
