import { Link, useParams } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import { categories, scholarships } from "@/lib/mock-data";
import type { CategorySlug } from "@/lib/types";
import { getCategoryIcon } from "@/lib/category-icons";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return <NotFound />;

  const Icon = getCategoryIcon(category.icon);
  const results = scholarships.filter((s) => s.categories.includes(slug as CategorySlug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/categories" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        All categories
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
          <Icon className="size-7" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{category.name} Scholarships</h1>
          <p className="mt-1 text-sm text-muted-foreground">{category.description} · {results.length} listed</p>
        </div>
      </div>

      <div className="mt-8">
        {results.length === 0 ? (
          <Empty className="border border-dashed border-border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchX />
              </EmptyMedia>
              <EmptyTitle>No scholarships in this category yet</EmptyTitle>
              <EmptyDescription>Check back soon, or explore all scholarships instead.</EmptyDescription>
            </EmptyHeader>
            <Button variant="outline" asChild>
              <Link to="/search">Browse all scholarships</Link>
            </Button>
          </Empty>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
