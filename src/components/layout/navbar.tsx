import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { GraduationCap, Menu, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSavedScholarships } from "@/hooks/use-saved-scholarships";

const links = [
  { to: "/search", label: "Find Scholarships" },
  { to: "/categories", label: "Categories" },
  { to: "/matcher", label: "AI Matcher" },
  { to: "/deadlines", label: "Deadlines" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { savedIds } = useSavedScholarships();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="ScholarNaija home">
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand-gradient text-primary-foreground shadow-sm">
            <GraduationCap className="size-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Scholar<span className="text-primary">Naija</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" asChild className="relative">
            <Link to="/dashboard?tab=saved" aria-label={`Saved scholarships (${savedIds.length})`}>
              <Bookmark className="size-4" />
              Saved
              {savedIds.length > 0 && (
                <span className="ml-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {savedIds.length}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/profile">Profile</Link>
          </Button>
          <Button size="sm" asChild className="bg-brand-gradient hover:opacity-90">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm">
            <SheetHeader>
              <SheetTitle className="font-display">ScholarNaija</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-1 px-4" aria-label="Mobile navigation">
              {links.map((link) => (
                <SheetClose asChild key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                        isActive && "bg-accent text-accent-foreground",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </SheetClose>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                <SheetClose asChild>
                  <Button variant="outline" asChild>
                    <Link to="/profile">Profile</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild className="bg-brand-gradient">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                </SheetClose>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
