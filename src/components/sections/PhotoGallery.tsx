"use client";

import { motion } from "framer-motion";

const photos = [
  { src: "/campaign/duo-balcony.jpg", alt: "Daugherty & Honey on the Belmont balcony" },
  { src: "/campaign/duo-stairs.jpg", alt: "Daugherty & Honey sitting on campus stairs" },
  { src: "/campaign/duo-closeup-houndstooth.jpg", alt: "Daugherty & Honey close-up portrait" },
  { src: "/campaign/duo-overhead.jpg", alt: "Daugherty & Honey from above on brick walkway" },
  { src: "/campaign/duo-lamppost.jpg", alt: "Daugherty & Honey by campus lamp post" },
  { src: "/campaign/duo-lobby.jpg", alt: "Daugherty & Honey in the campus lobby" },
];

function GalleryPhoto({
  photo,
  index,
}: {
  photo: (typeof photos)[number];
  index: number;
}) {
  return (
    <motion.div
      className="group mb-3 break-inside-avoid overflow-hidden rounded-2xl lg:mb-4 lg:rounded-3xl"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="block w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />

      {/* Gold shimmer on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}

export function PhotoGallery() {
  return (
    <section className="overflow-hidden bg-cream-deep pb-0">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <span className="text-label text-text-muted">The Campaign</span>
          <h2 className="mt-3 text-display-md text-text-primary">
            Behind the{" "}
            <em className="font-[family-name:var(--font-cormorant)] text-gold">movement.</em>
          </h2>
        </motion.div>
      </div>

      {/* Masonry columns — natural aspect ratios */}
      <div className="mx-auto max-w-[90rem] px-3 md:px-6 lg:px-10">
        <div className="columns-2 gap-3 md:columns-3 lg:gap-4">
          {photos.map((photo, i) => (
            <GalleryPhoto key={photo.src} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
