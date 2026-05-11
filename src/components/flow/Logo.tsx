import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withSignal?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "inverted" | "ghost";
}

const sizes = {
  sm: { text: "text-base", arc: 14, gap: "gap-1.5" },
  md: { text: "text-lg", arc: 16, gap: "gap-2" },
  lg: { text: "text-2xl", arc: 22, gap: "gap-2.5" },
};

const SignalArcs = ({ size, side }: { size: number; side: "left" | "right" }) => (
  <svg
    width={size}
    height={size * 1.4}
    viewBox="0 0 24 32"
    fill="none"
    aria-hidden
    className={side === "left" ? "" : "rotate-180"}
  >
    <path d="M18 4 C 8 8, 8 24, 18 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 8 C 6 11, 6 21, 12 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <path d="M6 12 C 3 14, 3 18, 6 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const Logo = ({ className, withSignal = true, size = "md", variant = "default" }: LogoProps) => {
  const s = sizes[size];
  const colorClass = variant === "inverted" ? "text-primary-foreground" : "text-foreground";
  const accentClass = variant === "inverted" ? "text-highlight" : "text-accent";
  return (
    <span className={cn("inline-flex items-center", s.gap, colorClass, className)}>
      {withSignal && <span className={accentClass}><SignalArcs size={s.arc} side="left" /></span>}
      <span className={cn("font-display font-bold tracking-tight leading-none", s.text)}>SO-HO!</span>
      {withSignal && <span className={accentClass}><SignalArcs size={s.arc} side="right" /></span>}
    </span>
  );
};

export default Logo;
