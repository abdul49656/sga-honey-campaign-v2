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

function GalleryPhoto({ src, alt }: { src: string; alt: string }) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className="group aspect-[3/4] overflow-hidden rounded-2xl lg:rounded-3xl"
      style={fadeUp(visible)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />
    </div>
  );
}

export function PhotoGallery() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal();

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
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {photos.map((photo) => (
            <GalleryPhoto key={photo.src} src={photo.src} alt={photo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
