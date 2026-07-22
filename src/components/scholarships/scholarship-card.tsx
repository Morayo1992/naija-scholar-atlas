import { Link } from "react-router-dom";
import { Bookmark, MapPin, GraduationCap, Wallet, CalendarClock, ArrowUpRight } from "lucide-react";
import type { Scholarship } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScholarshipTagBadge } from "./scholarship-badges";
import { formatDeadline, deadlineLabel, isClosingSoon } from "@/lib/dates";
import { useSavedScholarships } from "@/hooks/use-saved-scholarships";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ScholarshipCard({ scholarship, className }: { scholarship: Scholarship; className?: string }) {
  const { isSaved, toggleSaved } = useSavedScholarships();
  const saved = isSaved(scholarship.id);
  const closingSoon = isClosingSoon(scholarship.deadline);

  function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleSaved(scholarship.id);
    toast.success(saved ? "Removed from saved scholarships" : "Saved to your dashboard");
  }

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-sm font-bold text-primary-foreground">
            {scholarship.logoInitials}
          </div>
          <div className="min-w-0">
            <h3 className="line-clamp-1 font-display text-base font-semibold leading-tight">
              <Link to={`/scholarships/${scholarship.slug}`} className="hover:underline focus-visible:underline">
                <span className="absolute inset-0" aria-hidden="true" />
                {scholarship.name}
              </Link>
            </h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {scholarship.country}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSave}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved scholarships" : "Save scholarship"}
          className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Bookmark className={cn("size-4", saved && "fill-primary text-primary")} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {scholarship.tags.map((tag) => (
          <ScholarshipTagBadge key={tag} tag={tag} />
        ))}
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{scholarship.description}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <GraduationCap className="size-3.5 shrink-0" />
          <dt className="sr-only">Degree Level</dt>
          <dd className="truncate">{scholarship.degreeLevels.join(", ")}</dd>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Wallet className="size-3.5 shrink-0" />
          <dt className="sr-only">Funding</dt>
          <dd className="truncate">{scholarship.fundingType}</dd>
        </div>
        <div
          className={cn(
            "col-span-2 flex items-center gap-1.5",
            closingSoon ? "font-medium text-destructive" : "text-muted-foreground",
          )}
        >
          <CalendarClock className="size-3.5 shrink-0" />
          <dt className="sr-only">Deadline</dt>
          <dd>
            {formatDeadline(scholarship.deadline)} · {deadlineLabel(scholarship.deadline)}
          </dd>
        </div>
      </dl>

      <div className="relative z-10 mt-5 flex items-center gap-2 border-t border-border pt-4">
        <Button asChild size="sm" className="flex-1 bg-brand-gradient hover:opacity-90">
          <Link to={`/scholarships/${scholarship.slug}`}>
            View details
            <ArrowUpRight className="size-3.5" />
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-1">
          <a href={scholarship.officialUrl} target="_blank" rel="noreferrer">
            Apply
          </a>
        </Button>
      </div>
    </article>
  );
}

export function ScholarshipCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="size-11 animate-pulse rounded-lg bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="mt-4 h-3 w-full animate-pulse rounded bg-muted" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-8 w-full animate-pulse rounded bg-muted" />
    </div>
  );
}
