import { Link } from "react-router-dom";
import { CalendarClock, CalendarX2 } from "lucide-react";
import { scholarships } from "@/lib/mock-data";
import { daysUntil, formatDeadline, deadlineLabel } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";

function groupScholarships() {
  const thisWeek = scholarships.filter((s) => {
    const d = daysUntil(s.deadline);
    return d >= 0 && d <= 7;
  });
  const thisMonth = scholarships.filter((s) => {
    const d = daysUntil(s.deadline);
    return d > 7 && d <= 31;
  });
  const closingSoon = scholarships.filter((s) => {
    const d = daysUntil(s.deadline);
    return d >= 0 && d <= 14;
  });
  const expired = scholarships.filter((s) => daysUntil(s.deadline) < 0);

  return { thisWeek, thisMonth, closingSoon, expired };
}

function DeadlineGroup({
  title,
  description,
  items,
  tone = "default",
}: {
  title: string;
  description: string;
  items: typeof scholarships;
  tone?: "default" | "danger" | "muted";
}) {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <span className="text-xs text-muted-foreground">{items.length} scholarship{items.length === 1 ? "" : "s"}</span>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>

      {items.length === 0 ? (
        <div className="mt-3 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Nothing here right now.
        </div>
      ) : (
        <div className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
          {items.map((s) => (
            <Link
              key={s.id}
              to={`/scholarships/${s.slug}`}
              className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-gradient text-xs font-bold text-primary-foreground">
                  {s.logoInitials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.country}</p>
                </div>
              </div>
              <div
                className={cn(
                  "shrink-0 text-right text-xs",
                  tone === "danger" && "font-medium text-destructive",
                  tone === "muted" && "text-muted-foreground/70",
                  tone === "default" && "text-muted-foreground",
                )}
              >
                <p>{formatDeadline(s.deadline)}</p>
                <p>{deadlineLabel(s.deadline)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Deadlines() {
  const { thisWeek, thisMonth, closingSoon, expired } = groupScholarships();
  const hasAny = thisWeek.length + thisMonth.length + closingSoon.length + expired.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-lg bg-brand-gradient text-primary-foreground">
          <CalendarClock className="size-5" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Deadline Tracker</h1>
          <p className="mt-1 text-sm text-muted-foreground">Never miss a scholarship deadline again.</p>
        </div>
      </div>

      {!hasAny ? (
        <Empty className="mt-8 border border-dashed border-border">
          <EmptyHeader>
            <EmptyMedia variant="icon"><CalendarX2 /></EmptyMedia>
            <EmptyTitle>No deadlines to show</EmptyTitle>
            <EmptyDescription>Check back later as new scholarships are added.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="mt-8 space-y-10">
          <DeadlineGroup title="Closing Soon" description="Deadlines within the next 14 days — apply now." items={closingSoon} tone="danger" />
          <DeadlineGroup title="This Week" description="Deadlines in the next 7 days." items={thisWeek} tone="danger" />
          <DeadlineGroup title="This Month" description="Deadlines 8–31 days from today." items={thisMonth} />
          <DeadlineGroup title="Expired" description="Deadlines that have already passed." items={expired} tone="muted" />
        </div>
      )}
    </div>
  );
}
