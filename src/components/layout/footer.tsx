import { Link } from "react-router-dom";
import { useState } from "react";
import { GraduationCap, Github, Linkedin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Find Scholarships", to: "/search" },
      { label: "Categories", to: "/categories" },
      { label: "AI Matcher", to: "/matcher" },
      { label: "Deadline Tracker", to: "/deadlines" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/about#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/faq#privacy" },
      { label: "Terms of Service", to: "/faq#terms" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're subscribed! Watch your inbox for new scholarships.");
    setEmail("");
  }

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand-gradient text-primary-foreground">
                <GraduationCap className="size-5" />
              </span>
              <span className="font-display text-lg font-bold">
                Scholar<span className="text-primary">Naija</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Helping Nigerian students discover and track scholarships from universities,
              governments, NGOs, and foundations around the world.
            </p>
            <form onSubmit={handleSubscribe} className="mt-5 flex max-w-xs gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                aria-label="Email for newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" size="icon" aria-label="Subscribe" className="shrink-0 bg-brand-gradient">
                <Send className="size-4" />
              </Button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">
              Get new scholarship alerts in your inbox, weekly.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ScholarNaija. Built for Nigerian students, everywhere.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="ScholarNaija on GitHub"
              className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="ScholarNaija on LinkedIn"
              className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
