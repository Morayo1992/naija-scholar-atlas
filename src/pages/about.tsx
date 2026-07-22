import { Mail, MapPin, Target, Eye, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function About() {
  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Thanks for reaching out — we'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div>
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">About ScholarNaija</h1>
          <p className="mt-4 text-balance text-muted-foreground">
            We believe that where you're born shouldn't decide how far your education can take you.
            ScholarNaija exists to close the information gap between Nigerian students and the
            scholarships that can change their trajectory.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6">
            <Target className="size-6 text-primary" />
            <h2 className="mt-4 font-display text-lg font-semibold">Our Mission</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              To make every credible scholarship — local or international — discoverable, understandable,
              and trackable for Nigerian students, regardless of their background.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <Eye className="size-6 text-primary" />
            <h2 className="mt-4 font-display text-lg font-semibold">Our Vision</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A future where no Nigerian student misses out on funded education simply because they
              didn't know the opportunity existed.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <HeartHandshake className="size-6 text-primary" />
            <h2 className="mt-4 font-display text-lg font-semibold">Why We Exist</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Scholarship information is scattered across hundreds of websites, PDFs, and word-of-mouth.
              We centralize it — organized, searchable, and free.
            </p>
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-card p-8 sm:p-10">
          <h2 className="font-display text-xl font-semibold">How we help Nigerian students</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              A single, searchable database of undergraduate, master's, PhD, and exchange scholarships.
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              Clear eligibility, application steps, and required documents for every listing.
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              A deadline tracker so no opportunity is missed due to poor timing.
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              An AI-assisted matcher that narrows thousands of options to the ones that fit you.
            </li>
          </ul>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight">Get in touch</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Questions, partnership ideas, or feedback? We'd love to hear from you.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-6">
              <span className="flex items-center gap-1.5"><Mail className="size-4" /> hello@scholarnaija.example</span>
              <span className="flex items-center gap-1.5"><MapPin className="size-4" /> Lagos, Nigeria</span>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" required className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea id="contact-message" required rows={4} className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full bg-brand-gradient hover:opacity-90 sm:w-auto">
              Send message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
