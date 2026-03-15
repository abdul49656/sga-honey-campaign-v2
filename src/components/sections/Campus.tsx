"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal, slideLeft, fadeUp } from "@/hooks/useScrollReveal";
import { useIsMobile } from "@/hooks/useIsMobile";

const images = [
  {
    src: "/campaign/duo-fountain-wave.jpg",
    alt: "Daugherty & Honey waving at the Belmont fountain",
    caption: "For Every Bruin",
    width: "lg:col-span-2 lg:row-span-2",
    speed: 0.12,
    objectPosition: "center 65%",
  },
  { src: "/campus/hub.jpg",       alt: "Belmont campus hub",       caption: "The Hub",       width: "", speed: 0.2  },
  { src: "/campus/wellness.jpg",  alt: "Student wellness programs", caption: "Wellness First", width: "", speed: 0.08 },
  { src: "/campus/student.jpg",   alt: "Belmont student life",      caption: "Student Life",  width: "", speed: 0.15 },
  { src: "/campus/community.jpg", alt: "Belmont community",         caption: "Community",     width: "", speed: 0.1  },
];

function GalleryItemDesktop({ img }: { img: (typeof images)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [img.speed * 100, img.speed * -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.95, 1, 1]);

  return (
    <div
      ref={ref}
      className={`group relative min-h-[240px] overflow-hidden rounded-2xl lg:aspect-[4/3] lg:min-h-0 ${img.width}`}
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
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-label text-[0.625rem] text-white/90">{img.caption}</span>
        </div>
      </div>
    </div>
  );
}

function GalleryItem({ img, index, gridVisible }: { img: (typeof images)[0]; index: number; gridVisible: boolean }) {
  const isMobile = useIsMobile();

  if (!isMobile) return <GalleryItemDesktop img={img} />;

  return (
    <div
      className={`group relative min-h-[220px] overflow-hidden rounded-2xl ${img.width}`}
      style={fadeUp(gridVisible, index * 60)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ objectPosition: img.objectPosition || "center center" }}
      />
    </div>
  );
}

export function Campus() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal();
  const { ref: gridRef, visible: gridVisible } = useScrollReveal();

  return (
    <section id="campus" className="bg-cream" style={{ padding: "var(--section-pad-y) 0" }}>
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <div ref={headerRef} className="mb-12 max-w-xl md:mb-16" style={slideLeft(headerVisible)}>
          <span className="text-label text-text-muted">Campus Life</span>
          <h2 className="mt-3 text-display-md text-text-primary">
            This is <em className="font-[family-name:var(--font-cormorant)] text-gold">our</em>{" "}
            Belmont.
          </h2>
          <p className="mt-4 max-w-md font-[family-name:var(--font-montserrat)] text-[0.9375rem] leading-[1.7] text-text-secondary">
            A campus that inspires, connects, and supports every student.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[90rem] px-3 md:px-6 lg:px-10">
        <div ref={gridRef} className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 md:gap-3">
          {images.map((img, i) => (
            <GalleryItem key={img.caption} img={img} index={i} gridVisible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
