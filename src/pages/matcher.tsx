import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMockMatches } from "@/lib/matcher";
import type { DegreeLevel, MatcherAnswers } from "@/lib/types";
import { ScholarshipTagBadge } from "@/components/scholarships/scholarship-badges";
import { formatDeadline } from "@/lib/dates";

const degreeLevels: DegreeLevel[] = ["Undergraduate", "Masters", "PhD", "Postdoctoral", "Exchange"];
const countries = ["Any", "United Kingdom", "Germany", "United States", "Australia", "South Korea", "Nigeria", "Japan"];

const initialAnswers: MatcherAnswers = {
  nationality: "Nigeria",
  currentDegree: "",
  desiredDegree: "",
  course: "",
  preferredCountry: "Any",
  gpa: "",
  needsFinancialAid: true,
};

const totalSteps = 4;

export default function Matcher() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<MatcherAnswers>(initialAnswers);
  const [showResults, setShowResults] = useState(false);

  function update<K extends keyof MatcherAnswers>(key: K, value: MatcherAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setAnswers(initialAnswers);
    setStep(1);
    setShowResults(false);
  }

  const matches = showResults ? getMockMatches(answers) : [];

  if (showResults) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              <Sparkles className="size-4" />
              Your matches
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Recommended for you
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="size-4" />
            Start over
          </Button>
        </div>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          This is a UI preview using a simple scoring heuristic based on your answers — not a live AI model yet.
        </p>

        <div className="mt-8 space-y-4">
          {matches.map((match, i) => (
            <div
              key={match.scholarship.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-sm font-bold text-primary-foreground">
                  {match.scholarship.logoInitials}
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">#{i + 1} match</p>
                  <Link
                    to={`/scholarships/${match.scholarship.slug}`}
                    className="font-display text-base font-semibold hover:underline"
                  >
                    {match.scholarship.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{match.reason}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {match.scholarship.tags.slice(0, 2).map((tag) => (
                      <ScholarshipTagBadge key={tag} tag={tag} />
                    ))}
                    <span className="text-xs text-muted-foreground">
                      Deadline {formatDeadline(match.scholarship.deadline)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-2 sm:w-32">
                <div className="relative flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-display text-lg font-bold text-primary">{match.matchPercentage}%</span>
                </div>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to={`/scholarships/${match.scholarship.slug}`}>View</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
          <Wand2 className="size-6" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">AI Scholarship Matcher</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Answer a few quick questions and we'll suggest scholarships that fit your profile.
        </p>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% complete</span>
        </div>
        <Progress value={(step / totalSteps) * 100} className="mt-2" />
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={answers.nationality}
                onChange={(e) => update("nationality", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="mb-2 block">Current Degree</Label>
              <RadioGroup
                value={answers.currentDegree}
                onValueChange={(v) => update("currentDegree", v as DegreeLevel)}
                className="grid grid-cols-2 gap-2"
              >
                {degreeLevels.map((level) => (
                  <Label
                    key={level}
                    htmlFor={`current-${level}`}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3 text-sm has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                  >
                    <RadioGroupItem value={level} id={`current-${level}`} />
                    {level}
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label className="mb-2 block">Desired Degree</Label>
              <RadioGroup
                value={answers.desiredDegree}
                onValueChange={(v) => update("desiredDegree", v as DegreeLevel)}
                className="grid grid-cols-2 gap-2"
              >
                {degreeLevels.map((level) => (
                  <Label
                    key={level}
                    htmlFor={`desired-${level}`}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3 text-sm has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                  >
                    <RadioGroupItem value={level} id={`desired-${level}`} />
                    {level}
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="course">Course / Field of Study</Label>
              <Input
                id="course"
                placeholder="e.g. Computer Science, Public Health"
                value={answers.course}
                onChange={(e) => update("course", e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <Label className="mb-1.5 block">Preferred Country</Label>
              <Select value={answers.preferredCountry} onValueChange={(v) => update("preferredCountry", v)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="gpa">Current GPA / CGPA</Label>
              <Input
                id="gpa"
                placeholder="e.g. 4.50"
                value={answers.gpa}
                onChange={(e) => update("gpa", e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="text-sm font-medium">Do you need financial aid?</p>
                <p className="text-xs text-muted-foreground">We'll prioritize fully funded opportunities.</p>
              </div>
              <Switch
                checked={answers.needsFinancialAid}
                onCheckedChange={(v) => update("needsFinancialAid", v)}
                aria-label="Need financial aid"
              />
            </div>
            <div className="rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Review your answers</p>
              <ul className="mt-2 space-y-1">
                <li>Nationality: {answers.nationality || "—"}</li>
                <li>Current degree: {answers.currentDegree || "—"}</li>
                <li>Desired degree: {answers.desiredDegree || "—"}</li>
                <li>Course: {answers.course || "—"}</li>
                <li>Preferred country: {answers.preferredCountry}</li>
                <li>GPA: {answers.gpa || "—"}</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          {step < totalSteps ? (
            <Button onClick={() => setStep((s) => Math.min(totalSteps, s + 1))} className="bg-brand-gradient hover:opacity-90">
              Continue
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button onClick={() => setShowResults(true)} className="bg-brand-gradient hover:opacity-90">
              <Sparkles className="size-4" />
              See my matches
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
