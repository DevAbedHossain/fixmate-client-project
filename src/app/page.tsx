import HeroSection from "@/components/homepage/HeroSection";
import HowItWorks from "@/components/homepage/HowItWorks";
import PopularCategories from "@/components/homepage/PopularCategories";
import ServicesList from "@/components/homepage/ServicesList";
import WhyChoosUs from "@/components/homepage/WhyChoosUs";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <HeroSection />
      <PopularCategories />
      <ServicesList />
      <HowItWorks />
      <WhyChoosUs />
      <Footer />
    </main>
  );
}
