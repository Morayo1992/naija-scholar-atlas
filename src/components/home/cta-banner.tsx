import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-brand-gradient px-6 py-12 text-center text-primary-foreground sm:px-12">
        <div
          className="absolute -right-10 -top-10 size-56 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <Sparkles className="mx-auto size-8 opacity-90" />
        <h2 className="mx-auto mt-4 max-w-xl text-balance font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Not sure where to start? Let our AI Matcher find scholarships for you.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-balance text-sm text-primary-foreground/85">
          Answer a few quick questions about your background and goals, and get a personalized shortlist in seconds.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-6">
          <Link to="/matcher">
            Try the AI Matcher
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
