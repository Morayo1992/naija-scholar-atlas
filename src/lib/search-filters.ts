import type { DegreeLevel, FundingType, Scholarship } from "./types";

export type SortOption = "newest" | "deadline" | "popular" | "fully-funded";

export interface SearchFilters {
  keyword: string;
  country: string; // "all" | country name
  degreeLevel: DegreeLevel | "all";
  fieldOfStudy: string; // "all" | field
  fundingType: FundingType | "all";
  sort: SortOption;
}

export const defaultFilters: SearchFilters = {
  keyword: "",
  country: "all",
  degreeLevel: "all",
  fieldOfStudy: "all",
  fundingType: "all",
  sort: "newest",
};

export function getUniqueCountries(scholarships: Scholarship[]) {
  return Array.from(new Set(scholarships.map((s) => s.country))).sort();
}

export function getUniqueFields(scholarships: Scholarship[]) {
  return Array.from(new Set(scholarships.flatMap((s) => s.fieldsOfStudy))).sort();
}

export function filterScholarships(scholarships: Scholarship[], filters: SearchFilters): Scholarship[] {
  const keyword = filters.keyword.trim().toLowerCase();

  const filtered = scholarships.filter((s) => {
    if (keyword) {
      const haystack = `${s.name} ${s.provider} ${s.country} ${s.university} ${s.fieldsOfStudy.join(" ")}`.toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    if (filters.country !== "all" && s.country !== filters.country) return false;
    if (filters.degreeLevel !== "all" && !s.degreeLevels.includes(filters.degreeLevel)) return false;
    if (filters.fieldOfStudy !== "all" && !s.fieldsOfStudy.includes(filters.fieldOfStudy)) return false;
    if (filters.fundingType !== "all" && s.fundingType !== filters.fundingType) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case "popular":
        return b.popularity - a.popularity;
      case "fully-funded":
        return (b.fundingType === "Fully Funded" ? 1 : 0) - (a.fundingType === "Fully Funded" ? 1 : 0);
      case "newest":
      default:
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    }
  });

  return sorted;
}
