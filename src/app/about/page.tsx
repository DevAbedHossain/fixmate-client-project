import HowItWorks from "@/components/homepage/HowItWorks";
import HeroSection from "@/components/aboutpage/HeroSection";
import OurStory from "@/components/aboutpage/OurStory";
import FinalCTA from "@/components/aboutpage/FinalCTA";
import MissionBission from "@/components/aboutpage/MissionBission";
import WhyChoosUs from "@/components/homepage/WhyChoosUs";
import OurValues from "@/components/aboutpage/OurValues";


const AboutPage = () => {
    return (
        <main className="overflow-hidden bg-white">
            <HeroSection />
            <OurStory />
            <WhyChoosUs />
            <MissionBission />
            <OurValues />
            <HowItWorks />
            <FinalCTA />
        </main>
    );
};

export default AboutPage;
