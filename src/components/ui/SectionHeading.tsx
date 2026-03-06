import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw+0.5rem,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary",
        className
      )}
    >
      {children}
    </h2>
  );
}
