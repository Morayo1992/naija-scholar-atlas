import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, SearchX } from "lucide-react";
import { scholarships } from "@/lib/mock-data";
import {
  defaultFilters,
  filterScholarships,
  getUniqueCountries,
  getUniqueFields,
  type SearchFilters,
  type SortOption,
} from "@/lib/search-filters";
import { FilterPanel } from "@/components/scholarships/filter-panel";
import { ScholarshipCard, ScholarshipCardSkeleton } from "@/components/scholarships/scholarship-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";

const sortLabels: Record<SortOption, string> = {
  newest: "Newest",
  deadline: "Deadline",
  popular: "Most Popular",
  "fully-funded": "Fully Funded",
};

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>({
    ...defaultFilters,
    keyword: searchParams.get("q") ?? "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const countries = useMemo(() => getUniqueCountries(scholarships), []);
  const fields = useMemo(() => getUniqueFields(scholarships), []);
  const results = useMemo(() => filterScholarships(scholarships, filters), [filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Find Scholarships</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading ? "Searching…" : `${results.length} scholarship${results.length === 1 ? "" : "s"} found`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="size-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter scholarships</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-6">
                <FilterPanel filters={filters} onChange={setFilters} countries={countries} fields={fields} />
              </div>
            </SheetContent>
          </Sheet>

          <Select value={filters.sort} onValueChange={(v) => setFilters((f) => ({ ...f, sort: v as SortOption }))}>
            <SelectTrigger className="w-[160px]" aria-label="Sort scholarships">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(sortLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-sm font-semibold">Filters</h2>
            <div className="mt-4">
              <FilterPanel filters={filters} onChange={setFilters} countries={countries} fields={fields} />
            </div>
          </div>
        </aside>

        <div>
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ScholarshipCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <Empty className="border border-dashed border-border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SearchX />
                </EmptyMedia>
                <EmptyTitle>No scholarships match your filters</EmptyTitle>
                <EmptyDescription>
                  Try widening your search — remove a filter or search a different keyword.
                </EmptyDescription>
              </EmptyHeader>
              <Button variant="outline" onClick={() => setFilters(defaultFilters)}>
                Reset all filters
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
    </div>
  );
}
