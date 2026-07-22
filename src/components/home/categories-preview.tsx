import { Link } from "react-router-dom";
import { categories } from "@/lib/mock-data";
import { getCategoryIcon } from "@/lib/category-icons";

export function CategoriesPreview() {
  return (
    <section className="border-y border-border bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Browse by category</p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Find the right path for you
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.icon);
            return (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.count} listed</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
