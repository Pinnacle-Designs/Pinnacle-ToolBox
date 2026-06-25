import { cn } from "@/lib/utils";

interface AdSlotProps {
  size: "banner" | "sidebar" | "inline";
  className?: string;
}

const sizeClasses: Record<AdSlotProps["size"], string> = {
  banner: "w-full h-24 md:h-28",
  sidebar: "w-full h-64 md:h-96 sticky top-24",
  inline: "w-full h-32 md:h-40",
};

export default function AdSlot({ size, className }: AdSlotProps) {
  return (
    <div
      role="complementary"
      aria-label="Advertisement placeholder"
      className={cn(
        "flex items-center justify-center rounded-xl border border-dashed border-brand-navy-light/40 bg-brand-navy/20 text-sm text-brand-silver-muted",
        sizeClasses[size],
        className
      )}
    >
      Ad
    </div>
  );
}
