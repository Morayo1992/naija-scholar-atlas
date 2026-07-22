import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  ListChecks,
  MapPin,
  Wallet,
} from "lucide-react";
import { scholarships } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScholarshipTagBadge } from "@/components/scholarships/scholarship-badges";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { formatDeadline, deadlineLabel, isClosingSoon } from "@/lib/dates";
import { useSavedScholarships } from "@/hooks/use-saved-scholarships";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import NotFound from "./not-found";

export default function ScholarshipDetail() {
  const { slug } = useParams<{ slug: string }>();
  const scholarship = scholarships.find((s) => s.slug === slug);
  const { isSaved, toggleSaved } = useSavedScholarships();

  if (!scholarship) return <NotFound />;

  const saved = isSaved(scholarship.id);
  const closingSoon = isClosingSoon(scholarship.deadline);
  const related = scholarships
    .filter((s) => s.id !== scholarship.id && s.categories.some((c) => scholarship.categories.includes(c)))
    .slice(0, 3);

  function handleSave() {
    toggleSaved(scholarship!.id);
    toast.success(saved ? "Removed from saved scholarships" : "Saved to your dashboard");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/search" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        Back to search
      </Link>

      <div className="mt-4 flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-lg font-bold text-primary-foreground">
            {scholarship.logoInitials}
          </div>
          <div>
            <div className="flex flex-wrap gap-1.5">
              {scholarship.tags.map((tag) => (
                <ScholarshipTagBadge key={tag} tag={tag} />
              ))}
            </div>
            <h1 className="mt-2 text-balance font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {scholarship.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{scholarship.provider}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {scholarship.country}</span>
              <span className="flex items-center gap-1.5"><GraduationCap className="size-4" /> {scholarship.degreeLevels.join(", ")}</span>
              <span className="flex items-center gap-1.5"><Wallet className="size-4" /> {scholarship.fundingType}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
          <Button asChild size="lg" className="bg-brand-gradient hover:opacity-90">
            <a href={scholarship.officialUrl} target="_blank" rel="noreferrer">
              Official website
              <ExternalLink className="size-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={handleSave}>
            <Bookmark className={cn("size-4", saved && "fill-primary text-primary")} />
            {saved ? "Saved" : "Save Scholarship"}
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-lg font-semibold">About this scholarship</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scholarship.description}</p>
          </section>

          <Separator />

          <section>
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <CheckCircle2 className="size-5 text-primary" />
              Eligibility
            </h2>
            <ul className="mt-3 space-y-2">
              {scholarship.eligibility.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <ListChecks className="size-5 text-primary" />
              Application Process
            </h2>
            <ol className="mt-3 space-y-3">
              {scholarship.applicationProcess.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <Separator />

          <section>
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <FileText className="size-5 text-primary" />
              Required Documents
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {scholarship.requiredDocuments.map((doc) => (
                <span key={doc} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-secondary-foreground">
                  {doc}
                </span>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-sm font-semibold">Key details</h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">University</dt>
                <dd className="text-right font-medium">{scholarship.university}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Funding</dt>
                <dd className="text-right font-medium">{scholarship.fundingDetails}</dd>
              </div>
              <div
                className={cn(
                  "flex items-center justify-between gap-2 rounded-lg px-2.5 py-2",
                  closingSoon ? "bg-destructive/10" : "bg-secondary/50",
                )}
              >
                <dt className={cn("flex items-center gap-1.5", closingSoon ? "text-destructive" : "text-muted-foreground")}>
                  <CalendarClock className="size-3.5" />
                  Deadline
                </dt>
                <dd className={cn("text-right font-semibold", closingSoon && "text-destructive")}>
                  {formatDeadline(scholarship.deadline)}
                  <span className="block text-xs font-normal">{deadlineLabel(scholarship.deadline)}</span>
                </dd>
              </div>
            </dl>
          </div>

          {related.length > 0 && (
            <div>
              <h3 className="font-display text-sm font-semibold">Related scholarships</h3>
              <div className="mt-3 space-y-4">
                {related.map((r) => (
                  <ScholarshipCard key={r.id} scholarship={r} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
