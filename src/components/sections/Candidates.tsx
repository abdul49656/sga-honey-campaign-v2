"use client";

import { useScrollReveal, slideLeft, fadeUp } from "@/hooks/useScrollReveal";

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
