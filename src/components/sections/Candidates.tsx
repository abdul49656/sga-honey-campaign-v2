"use client";

import { useScrollReveal, slideLeft, fadeUp } from "@/hooks/useScrollReveal";

const candidates = [
  {
    initial: "D",
    name: "Abi Daugherty",
    role: "President",
    photo: "/campaign/headshot-abi.jpg",
    cropPosition: "25% 15%",
    bio: "Abi Daugherty is humbled to serve as your current Student Government Association Vice President. This year, she has collaborated with SGA Leadership to establish a partnership between SGA and the Cookery, providing students with a new practice and performance space that will be available for future use. She has developed surveys with her peers to gather student data on parking/traffic, FitRec concerns, and JAAC furniture and has presented this data to upper-administration. She is extremely passionate about Belmont SGA, and as your President she will continue going the extra mile to advocate for every student that calls Belmont home!",
  },
  {
    initial: "H",
    name: "Dia Honey Abdullah",
    role: "Vice President",
    photo: "/campaign/headshot-dia.jpg",
    cropPosition: "center 15%",
    bio: "Dia Honey is proud to serve on the current Student Government Association Cabinet as DEI Chair. This year, she has revitalized a student outreach committee within SGA, creating opportunities for SGA to interact with student organizations on campus. By establishing this bridge, many organizations have found it much easier to contact SGA and request funding. As your Vice President, Dia Honey will continue going the extra mile to connect with student organizations on campus, and advocate for their needs.",
  },
];

function CandidateBlock({
  candidate,
  index,
}: {
  candidate: (typeof candidates)[0];
  index: number;
}) {
  const isReversed = index % 2 !== 0;
  const { ref: photoRef, visible: photoVisible } = useScrollReveal();
  const { ref: cardRef, visible: cardVisible } = useScrollReveal();

  return (
    <div className="relative py-10 md:py-16 lg:py-20">
      <div
        className={`relative mx-auto flex max-w-[90rem] flex-col gap-6 px-6 md:flex-row md:items-center md:gap-12 md:px-10 lg:gap-20 lg:px-14 ${
          isReversed ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Headshot photo */}
        <div ref={photoRef} className="flex items-center justify-center md:flex-1" style={fadeUp(photoVisible)}>
          <div
            className="relative h-64 w-52 overflow-hidden rounded-3xl bg-white md:h-[22rem] md:w-[17rem] lg:h-[26rem] lg:w-[20rem]"
            style={{ boxShadow: "0 6px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <img
              src={candidate.photo}
              alt={candidate.name}
              loading="eager"
              className="h-full w-full object-cover"
              style={{ objectPosition: candidate.cropPosition }}
            />
          </div>
        </div>

        {/* Text card */}
        <div
          ref={cardRef}
          className="flex flex-col items-center text-center rounded-3xl bg-white p-8 md:flex-1 md:p-10"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)",
            ...fadeUp(cardVisible),
          }}
        >
          <span className="text-label text-gold">{candidate.role}</span>
          <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-display-lg text-text-primary">
            {candidate.name}
          </h3>
          <div className="mx-auto mt-4 h-px w-12 bg-gold/50" />
          <p className="mt-6 max-w-md font-[family-name:var(--font-montserrat)] text-[0.9375rem] leading-[1.8] text-text-secondary">
            {candidate.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Candidates() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal();

  return (
    <section id="candidates" className="bg-cream-deep">
      <div
        ref={headerRef}
        className="mx-auto max-w-[90rem] px-6 pt-16 md:px-10 md:pt-24 lg:px-14"
        style={slideLeft(headerVisible)}
      >
        <span className="text-label text-text-muted">Your Candidates</span>
        <h2 className="mt-1.5 text-display-md text-text-primary">
          Meet the <em className="font-[family-name:var(--font-cormorant)] text-gold">team.</em>
        </h2>
      </div>

      {candidates.map((c, i) => (
        <CandidateBlock key={c.initial} candidate={c} index={i} />
      ))}
    </section>
  );
}
