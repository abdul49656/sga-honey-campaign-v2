"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

/*
  4-column grid layout (desktop):
  Row 1: balcony(2×2)  | stairs(1×1)   | overhead(1×1)
  Row 2: balcony cont. | houndstooth(2×1)
  Row 3: lamppost(2×1) | lobby(2×1)
*/
const photos = [
  {
    src: "/campaign/duo-balcony.jpg",
    alt: "Daugherty & Honey on the Belmont balcony",
    gridClass: "col-span-2 row-span-2 aspect-[3/4]",
    mobileClass: "col-span-2 aspect-[3/4]",
    objectPosition: "center 20%",
  },
  {
    src: "/campaign/duo-stairs.jpg",
    alt: "Daugherty & Honey sitting on campus stairs",
    gridClass: "col-span-1 aspect-[3/4]",
    mobileClass: "col-span-1 aspect-[3/4]",
    objectPosition: "center center",
  },
  {
    src: "/campaign/duo-overhead.jpg",
    alt: "Daugherty & Honey from above on brick walkway",
    gridClass: "col-span-1 aspect-[3/4]",
    mobileClass: "col-span-1 aspect-[3/4]",
    objectPosition: "center 55%",
  },
  {
    src: "/campaign/duo-closeup-houndstooth.jpg",
    alt: "Daugherty & Honey close-up portrait",
    gridClass: "col-span-2 aspect-[16/9]",
    mobileClass: "col-span-2 aspect-[16/10]",
    objectPosition: "center 25%",
  },
  {
    src: "/campaign/duo-lamppost.jpg",
    alt: "Daugherty & Honey by campus lamp post",
    gridClass: "col-span-2 aspect-[4/3]",
    mobileClass: "col-span-1 aspect-[3/4]",
    objectPosition: "center 20%",
  },
  {
    src: "/campaign/duo-lobby.jpg",
    alt: "Daugherty & Honey in the campus lobby",
    gridClass: "col-span-2 aspect-[4/3]",
    mobileClass: "col-span-1 aspect-[3/4]",
    objectPosition: "center 15%",
  },
];

function GalleryPhoto({
  photo,
  index,
}: {
  photo: (typeof photos)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const speeds = [0.06, 0.1, 0.14, 0.04, 0.12, 0.08];
  const speed = speeds[index % speeds.length];
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);

  const directions = [
    { x: -30, y: 40, rotate: -2 },
    { x: 20, y: 30, rotate: 1 },
    { x: -15, y: 50, rotate: -1 },
    { x: 0, y: 35, rotate: 0 },
    { x: 25, y: 45, rotate: 2 },
    { x: -20, y: 30, rotate: -1.5 },
  ];
  const dir = directions[index % directions.length];

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl lg:rounded-3xl ${
        isMobile ? photo.mobileClass : photo.gridClass
      }`}
      initial={{
        opacity: 0,
        x: isMobile ? 0 : dir.x,
        y: isMobile ? 20 : dir.y,
        rotate: isMobile ? 0 : dir.rotate,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: isMobile ? 0.4 : 0.9,
        delay: isMobile ? 0 : index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={isMobile ? {} : { y, scale }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="h-[115%] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          style={{ objectPosition: photo.objectPosition }}
        />
      </motion.div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:bg-black/0" />

      {/* Gold shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}

export function PhotoGallery() {
  return (
    <section className="overflow-hidden bg-cream-deep pb-0">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <span className="text-label text-text-muted">The Campaign</span>
          <h2 className="mt-3 text-display-md text-text-primary">
            Behind the{" "}
            <em className="font-[family-name:var(--font-cormorant)] text-gold">movement.</em>
          </h2>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[90rem] px-3 md:px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3 lg:gap-4">
          {photos.map((photo, i) => (
            <GalleryPhoto key={photo.src} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
