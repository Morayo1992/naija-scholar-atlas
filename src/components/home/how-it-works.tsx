import { Search, Sparkles, CalendarCheck } from "lucide-react";
import { testimonials } from "@/lib/mock-data";
import { Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & filter",
    description: "Explore over 1,200 scholarships filtered by country, degree level, and field of study.",
  },
  {
    icon: Sparkles,
    title: "Get matched",
    description: "Answer a few quick questions and let the AI Matcher surface opportunities suited to your profile.",
  },
  {
    icon: CalendarCheck,
    title: "Track & apply",
    description: "Save your favorites, track deadlines, and apply directly on each provider's official site.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">How it works</p>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Three steps to your next scholarship
        </h2>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="relative rounded-xl border border-border bg-card p-6">
            <span className="flex size-11 items-center justify-center rounded-lg bg-brand-gradient text-primary-foreground">
              <step.icon className="size-5" />
            </span>
            <p className="mt-4 text-xs font-semibold text-muted-foreground">Step {i + 1}</p>
            <h3 className="mt-1 font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-center font-display text-xl font-bold tracking-tight">
          Trusted by scholars now studying worldwide
        </h3>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-xl border border-border bg-card p-5">
              <div className="flex gap-0.5 text-brand-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm text-muted-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="block text-xs text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
