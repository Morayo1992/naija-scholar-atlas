import { Link, useSearchParams } from "react-router-dom";
import {
  Bookmark,
  CalendarClock,
  ClipboardList,
  Compass,
  Plus,
  Sparkles,
  Wand2,
} from "lucide-react";
import { scholarships } from "@/lib/mock-data";
import { useSavedScholarships } from "@/hooks/use-saved-scholarships";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { formatDeadline, deadlineLabel, isClosingSoon } from "@/lib/dates";
import { getMockMatches } from "@/lib/matcher";
import { cn } from "@/lib/utils";

const mockActivity = [
  { id: 1, text: "Saved Chevening Scholarship to your dashboard", time: "2 hours ago" },
  { id: 2, text: "Completed AI Matcher questionnaire", time: "1 day ago" },
  { id: 3, text: "Viewed Global Korea Scholarship details", time: "3 days ago" },
  { id: 4, text: "Updated profile with new CGPA", time: "1 week ago" },
];

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { savedIds } = useSavedScholarships();
  const savedScholarships = scholarships.filter((s) => savedIds.includes(s.id));
  const upcoming = [...scholarships].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()).slice(0, 4);
  const recommended = getMockMatches({
    nationality: "Nigeria",
    currentDegree: "Undergraduate",
    desiredDegree: "Masters",
    course: "",
    preferredCountry: "Any",
    gpa: "4.5",
    needsFinancialAid: true,
  }).slice(0, 3);

  const tab = searchParams.get("tab") ?? "overview";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Your Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your saved scholarships, applications, and upcoming deadlines in one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/matcher">
              <Wand2 className="size-4" />
              Run matcher
            </Link>
          </Button>
          <Button size="sm" asChild className="bg-brand-gradient hover:opacity-90">
            <Link to="/search">
              <Plus className="size-4" />
              Find scholarships
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Saved", value: savedScholarships.length, icon: Bookmark },
          { label: "Applications", value: 0, icon: ClipboardList },
          { label: "Deadlines this month", value: upcoming.length, icon: CalendarClock },
          { label: "New matches", value: recommended.length, icon: Sparkles },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
            <stat.icon className="size-4 text-primary" />
            <p className="mt-2 font-display text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <Tabs value={tab} onValueChange={(v) => setSearchParams({ tab: v })} className="mt-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedScholarships.length})</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-10">
          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Upcoming deadlines</h2>
              <Link to="/deadlines" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
              {upcoming.map((s) => (
                <Link
                  key={s.id}
                  to={`/scholarships/${s.slug}`}
                  className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-gradient text-xs font-bold text-primary-foreground">
                      {s.logoInitials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.country}</p>
                    </div>
                  </div>
                  <div className={cn("text-right text-xs", isClosingSoon(s.deadline) ? "text-destructive font-medium" : "text-muted-foreground")}>
                    <p>{formatDeadline(s.deadline)}</p>
                    <p>{deadlineLabel(s.deadline)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Recommended for you</h2>
              <Link to="/matcher" className="text-sm text-primary hover:underline">Refine matches</Link>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {recommended.map((m) => (
                <ScholarshipCard key={m.scholarship.id} scholarship={m.scholarship} />
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          {savedScholarships.length === 0 ? (
            <Empty className="border border-dashed border-border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Bookmark />
                </EmptyMedia>
                <EmptyTitle>No saved scholarships yet</EmptyTitle>
                <EmptyDescription>
                  Tap the bookmark icon on any scholarship to save it here for quick access.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button asChild><Link to="/search">Browse scholarships</Link></Button>
              </EmptyContent>
            </Empty>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {savedScholarships.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          <Empty className="border border-dashed border-border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ClipboardList />
              </EmptyMedia>
              <EmptyTitle>No applications tracked yet</EmptyTitle>
              <EmptyDescription>
                Once you apply to a scholarship, mark it here to track its status. This feature is a UI preview.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" asChild>
                <Link to="/search"><Compass className="size-4" />Explore scholarships</Link>
              </Button>
            </EmptyContent>
          </Empty>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <div className="divide-y divide-border rounded-xl border border-border bg-card">
            {mockActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 p-4 text-sm">
                <span>{item.text}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
