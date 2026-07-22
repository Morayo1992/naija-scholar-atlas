export type DegreeLevel =
  | "Undergraduate"
  | "Masters"
  | "PhD"
  | "Postdoctoral"
  | "Exchange";

export type FundingType = "Fully Funded" | "Partial Funding" | "Tuition Waiver";

export type ScholarshipTag =
  | "New"
  | "Trending"
  | "Fully Funded"
  | "Closing Soon";

export type CategorySlug =
  | "undergraduate"
  | "masters"
  | "phd"
  | "fully-funded"
  | "international"
  | "nigeria"
  | "women"
  | "stem"
  | "research"
  | "exchange-programs";

export interface Scholarship {
  id: string;
  slug: string;
  name: string;
  provider: string;
  university: string;
  country: string;
  region: "Nigeria" | "Africa" | "Europe" | "North America" | "Asia" | "Oceania";
  degreeLevels: DegreeLevel[];
  fieldsOfStudy: string[];
  fundingType: FundingType;
  fundingDetails: string;
  deadline: string; // ISO date
  postedDate: string; // ISO date
  popularity: number; // 0-100, used for "Most Popular" sort
  description: string;
  eligibility: string[];
  applicationProcess: string[];
  requiredDocuments: string[];
  officialUrl: string;
  categories: CategorySlug[];
  tags: ScholarshipTag[];
  logoInitials: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string; // lucide icon name, resolved in component
  count: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface UserProfile {
  name: string;
  email: string;
  university: string;
  course: string;
  cgpa: string;
  country: string;
  preferredCountries: string[];
  interests: string[];
}

export interface MatcherAnswers {
  nationality: string;
  currentDegree: DegreeLevel | "";
  desiredDegree: DegreeLevel | "";
  course: string;
  preferredCountry: string;
  gpa: string;
  needsFinancialAid: boolean;
}

export interface MatchResult {
  scholarship: Scholarship;
  matchPercentage: number;
  reason: string;
}
