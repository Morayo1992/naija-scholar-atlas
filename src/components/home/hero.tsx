import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search");
  }

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 -z-10 bg-brand-gradient opacity-[0.06]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 right-[-10%] -z-10 size-[520px] rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-[-10%] -z-10 size-[420px] rounded-full bg-brand-gold/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
       <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="size-3.5" />
            Trusted by students across 40+ countries
          </span>

          <h1 className="mt-5 text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Find Scholarships Built for{" "}
            <span
  style={{
    backgroundImage:
      "linear-gradient(135deg, #14532d 0%, #16794f 55%, #1a8f5c 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
  }}
>
  Nigerian Students.
</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            Discover local and international scholarships from universities, governments, NGOs,
            and foundations—all in one place.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-2 rounded-xl border border-border bg-card p-2 shadow-sm sm:flex-row"
            role="search"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try 'fully funded masters in Germany'"
                aria-label="Search scholarships"
                className="h-11 border-0 pl-9 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button type="submit" size="lg" className="h-11 bg-brand-gradient hover:opacity-90">
              Find Scholarships
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/categories">
                Explore Categories
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/matcher">Try the AI Matcher →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
