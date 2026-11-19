import HeroSection from "@/components/homepage/HeroSection";
import HowItWorks from "@/components/homepage/HowItWorks";
import PopularCategories from "@/components/homepage/PopularCategories";
import WhyChoosUs from "@/components/homepage/WhyChoosUs";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <PopularCategories />
      <HowItWorks />
      <WhyChoosUs />
    </main>
  );
}
