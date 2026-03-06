import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-block font-[family-name:var(--font-figtree)] text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-gold",
        className
      )}
    >
      {children}
    </span>
  );
}
