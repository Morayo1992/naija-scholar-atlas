import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { FeaturedScholarships } from "@/components/home/featured-scholarships";
import { CategoriesPreview } from "@/components/home/categories-preview";
import { HowItWorks } from "@/components/home/how-it-works";
import { CtaBanner } from "@/components/home/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedScholarships />
      <CategoriesPreview />
      <HowItWorks />
      <CtaBanner />
    </>
  );
}
