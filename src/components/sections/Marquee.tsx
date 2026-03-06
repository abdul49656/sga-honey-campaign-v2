"use client";

const items = [
  "Make It Golden",
  "Daugherty & Honey",
  "Belmont SGA 2026",
  "For Every Bruin",
  "Student Wellness",
  "Campus Unity",
  "Academic Advocacy",
  "Sustainability",
];

export function Marquee() {
  const ticker = items.map((item, i) => (
    <span key={i} className="flex shrink-0 items-center gap-12 md:gap-16">
      <span className="whitespace-nowrap font-[family-name:var(--font-cormorant)] text-[1.125rem] font-semibold italic tracking-[-0.01em] text-dark/80 md:text-[1.375rem]">
        {item}
      </span>
      <span className="h-1 w-1 rounded-full bg-dark/30" />
    </span>
  ));

  return (
    <div className="border-y border-dark/[0.12] py-5">
      <div className="overflow-hidden">
        <div className="flex w-max gap-12 animate-marquee md:gap-16">
          {ticker}
          {ticker}
          {ticker}
        </div>
      </div>
    </div>
  );
}
