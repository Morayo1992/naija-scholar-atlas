import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/use-profile";
import type { UserProfile } from "@/lib/types";

const interestOptions = ["STEM", "Fully Funded", "Masters", "PhD", "Undergraduate", "Research", "Women", "Exchange Programs"];

export default function Profile() {
  const { profile, saveProfile, loaded } = useProfile();
  const [form, setForm] = useState<UserProfile>(profile);
  const [countryInput, setCountryInput] = useState("");

  useEffect(() => {
    if (loaded) setForm(profile);
  }, [loaded, profile]);

  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleInterest(interest: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  function addPreferredCountry() {
    const value = countryInput.trim();
    if (!value || form.preferredCountries.includes(value)) return;
    update("preferredCountries", [...form.preferredCountries, value]);
    setCountryInput("");
  }

  function removePreferredCountry(country: string) {
    update("preferredCountries", form.preferredCountries.filter((c) => c !== country));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveProfile(form);
    toast.success("Profile updated");
  }

  const initials = form.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Your Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Keep your academic profile up to date to get better scholarship matches.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
          <Avatar className="size-16">
            <AvatarFallback className="bg-brand-gradient text-lg font-semibold text-primary-foreground">
              {initials || "SN"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-display text-lg font-semibold">{form.name || "Your name"}</p>
            <p className="text-sm text-muted-foreground">{form.email}</p>
          </div>
        </div>

        <div className="grid gap-5 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1.5" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1.5" required />
          </div>
          <div>
            <Label htmlFor="university">University</Label>
            <Input id="university" value={form.university} onChange={(e) => update("university", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input id="course" value={form.course} onChange={(e) => update("course", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="cgpa">CGPA</Label>
            <Input id="cgpa" value={form.cgpa} onChange={(e) => update("cgpa", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" value={form.country} onChange={(e) => update("country", e.target.value)} className="mt-1.5" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <Label>Preferred study countries</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {form.preferredCountries.map((country) => (
              <Badge key={country} variant="secondary" className="gap-1 pr-1">
                {country}
                <button
                  type="button"
                  onClick={() => removePreferredCountry(country)}
                  aria-label={`Remove ${country}`}
                  className="rounded-full p-0.5 hover:bg-muted"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Input
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
              placeholder="Add a country and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPreferredCountry();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={addPreferredCountry}>Add</Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <Label>Interests</Label>
          <div className="mt-3 flex flex-wrap gap-2">
            {interestOptions.map((interest) => {
              const active = form.interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-transparent text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" className="bg-brand-gradient hover:opacity-90">
            <Save className="size-4" />
            Save profile
          </Button>
        </div>
      </form>
    </div>
  );
}
