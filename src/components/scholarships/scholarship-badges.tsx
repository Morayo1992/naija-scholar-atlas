import { cn } from "@/lib/utils";
import type { ScholarshipTag } from "@/lib/types";
import { Flame, Sparkles, Clock, BadgeCheck } from "lucide-react";

const tagStyles: Record<ScholarshipTag, string> = {
  New: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Trending: "bg-brand-gold/20 text-brand-gold-foreground border-brand-gold/40",
  "Fully Funded": "bg-primary/10 text-primary border-primary/20",
  "Closing Soon": "bg-destructive/10 text-destructive border-destructive/20",
};

const tagIcons: Record<ScholarshipTag, React.ComponentType<{ className?: string }>> = {
  New: Sparkles,
  Trending: Flame,
  "Fully Funded": BadgeCheck,
  "Closing Soon": Clock,
};

export function ScholarshipTagBadge({ tag, className }: { tag: ScholarshipTag; className?: string }) {
  const Icon = tagIcons[tag];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
        tagStyles[tag],
        className,
      )}
    >
      <Icon className="size-3" />
      {tag}
    </span>
  );
}
