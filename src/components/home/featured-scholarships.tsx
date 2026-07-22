import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { scholarships } from "@/lib/mock-data";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { Button } from "@/components/ui/button";

export function FeaturedScholarships() {
  const featured = [...scholarships].sort((a, b) => b.popularity - a.popularity).slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Handpicked</p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Featured Scholarships
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            The most popular and highest-value opportunities Nigerian students are applying to right now.
          </p>
        </div>
        <Button variant="outline" asChild className="shrink-0">
          <Link to="/search">
            View all scholarships
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((scholarship) => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
        ))}
      </div>
    </section>
  );
}
