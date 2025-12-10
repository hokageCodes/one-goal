import HeroSection from "@/components/sections/HeroSection";
import WhyChooseSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ShareFeedSection from "@/components/sections/ShareFeedSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <WhyChooseSection />
      <FeaturesSection />
      <ShareFeedSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}
