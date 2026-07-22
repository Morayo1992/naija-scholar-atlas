import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { getCategoryIcon } from "@/lib/category-icons";

export default function Categories() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">Browse by Category</h1>
        <p className="mt-2 text-muted-foreground">
          Explore scholarships grouped by degree level, funding type, field of study, and more.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.icon);
          return (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold">{category.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                <p className="mt-3 text-xs font-medium text-primary">{category.count} scholarships</p>
              </div>
              <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
