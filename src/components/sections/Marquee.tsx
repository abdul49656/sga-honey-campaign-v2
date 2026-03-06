"use client";

const primaryItems = [
  "Make It Golden",
  "Daugherty & Honey",
  "Belmont SGA 2026",
  "For Every Bruin",
];

const secondaryItems = [
  "Student Wellness",
  "Campus Unity",
  "Academic Advocacy",
  "Sustainability",
  "Join the Hive",
  "Sweet on Change",
];

function TickerRow({
  items,
  reverse = false,
  variant = "primary",
}: {
  items: string[];
  reverse?: boolean;
  variant?: "primary" | "secondary";
}) {
  const ticker = items.map((item, i) => (
    <span key={i} className="flex shrink-0 items-center gap-6 md:gap-8">
      <span
        className={
          variant === "primary"
            ? "whitespace-nowrap font-[family-name:var(--font-cormorant)] text-lg font-bold italic tracking-[-0.01em] text-dark/80 md:text-xl"
            : "whitespace-nowrap font-[family-name:var(--font-figtree)] text-[0.65rem] font-bold uppercase tracking-[0.12em] text-dark/50"
        }
      >
        {item}
      </span>
      <span className="text-[0.5rem] text-dark/20">✦</span>
    </span>
  ));

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-6 md:gap-8 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {ticker}
        {ticker}
        {ticker}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="space-y-1.5 bg-gold py-3">
      <TickerRow items={primaryItems} variant="primary" />
      <TickerRow items={secondaryItems} reverse variant="secondary" />
    </div>
  );
}
