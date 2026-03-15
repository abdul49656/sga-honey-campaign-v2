"use client";

import { useScrollReveal, slideLeft, fadeUp } from "@/hooks/useScrollReveal";

const photos = [
  { src: "/campaign/duo-balcony.jpg", alt: "Daugherty & Honey on the Belmont balcony" },
  { src: "/campaign/duo-stairs.jpg", alt: "Daugherty & Honey sitting on campus stairs" },
  { src: "/campaign/duo-closeup-houndstooth.jpg", alt: "Daugherty & Honey close-up portrait" },
  { src: "/campaign/duo-overhead.jpg", alt: "Daugherty & Honey from above on brick walkway" },
  { src: "/campaign/duo-lamppost.jpg", alt: "Daugherty & Honey by campus lamp post" },
  { src: "/campaign/duo-lobby.jpg", alt: "Daugherty & Honey in the campus lobby" },
];

export function PhotoGallery() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal();
  const { ref: gridRef, visible: gridVisible } = useScrollReveal();

  return (
    <section className="bg-cream-deep pb-0">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <div ref={headerRef} className="mb-10 md:mb-14" style={slideLeft(headerVisible)}>
          <span className="text-label text-text-muted">The Campaign</span>
          <h2 className="mt-3 text-display-md text-text-primary">
            Behind the{" "}
            <em className="font-[family-name:var(--font-cormorant)] text-gold">movement.</em>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-[90rem] px-3 md:px-6 lg:px-10">
        <div ref={gridRef} className="columns-2 gap-3 md:columns-3 lg:gap-4">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="group mb-3 break-inside-avoid overflow-hidden rounded-2xl lg:mb-4 lg:rounded-3xl"
              style={fadeUp(gridVisible, i * 70)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="block w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
