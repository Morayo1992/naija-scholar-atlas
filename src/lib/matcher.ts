import { scholarships } from "./mock-data";
import type { MatchResult, MatcherAnswers } from "./types";

/**
 * This is a simple, transparent scoring heuristic used to power the UI-only
 * "AI Matcher" preview. It is NOT a real machine-learning model — replace
 * with an actual recommendation service when a backend is available.
 */
export function getMockMatches(answers: MatcherAnswers): MatchResult[] {
  const results = scholarships.map((scholarship) => {
    let score = 40;
    const reasons: string[] = [];

    if (answers.desiredDegree && scholarship.degreeLevels.includes(answers.desiredDegree)) {
      score += 25;
      reasons.push(`offers ${answers.desiredDegree} programs`);
    }

    if (answers.preferredCountry && answers.preferredCountry !== "Any") {
      if (scholarship.country.toLowerCase().includes(answers.preferredCountry.toLowerCase())) {
        score += 15;
        reasons.push(`based in ${scholarship.country}`);
      }
    } else {
      score += 5;
    }

    if (answers.course) {
      const courseMatch = scholarship.fieldsOfStudy.some(
        (field) =>
          field.toLowerCase().includes(answers.course.toLowerCase()) ||
          answers.course.toLowerCase().includes(field.toLowerCase()) ||
          field === "Any Field",
      );
      if (courseMatch) {
        score += 12;
        reasons.push(`aligns with ${answers.course}`);
      }
    }

    if (answers.needsFinancialAid && scholarship.fundingType === "Fully Funded") {
      score += 10;
      reasons.push("fully funded, matching your financial aid need");
    }

    const gpa = parseFloat(answers.gpa);
    if (!Number.isNaN(gpa) && gpa >= 4.0) {
      score += 5;
      reasons.push("strong academic profile fits competitive selection");
    }

    score += Math.round(scholarship.popularity * 0.05);
    score = Math.min(98, Math.max(35, score));

    const reason =
      reasons.length > 0
        ? `Matched because it ${reasons.slice(0, 2).join(" and ")}.`
        : "A broadly relevant opportunity worth reviewing based on your profile.";

    return { scholarship, matchPercentage: score, reason };
  });

  return results.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 6);
}
