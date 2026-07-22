import { useEffect, useState } from "react";
import type { UserProfile } from "@/lib/types";

const STORAGE_KEY = "scholarnaija:profile";

const defaultProfile: UserProfile = {
  name: "Chioma Nwosu",
  email: "chioma.nwosu@example.com",
  university: "University of Lagos",
  course: "Computer Science",
  cgpa: "4.62",
  country: "Nigeria",
  preferredCountries: ["United Kingdom", "Germany"],
  interests: ["STEM", "Fully Funded", "Masters"],
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setLoaded(true);
  }, []);

  function saveProfile(next: UserProfile) {
    setProfile(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return { profile, saveProfile, loaded };
}
