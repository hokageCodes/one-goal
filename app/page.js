
// The original landing page is intentionally hidden for the waitlist launch.
// To restore, uncomment the code below and remove the null return.
// import HeroSection from "@/components/sections/HeroSection";
// import WhyChooseSection from "@/components/sections/AboutSection";
// import FeaturesSection from "@/components/sections/FeaturesSection";
// import ShareFeedSection from "@/components/sections/ShareFeedSection";
// import PricingSection from "@/components/sections/PricingSection";
// import TestimonialsSection from "@/components/sections/TestimonialsSection";
// import FAQSection from "@/components/sections/FAQSection";


export default function Home() {
  // The original landing page is hidden for now.
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">Welcome!</h1>
        <p className="mb-6 text-gray-600">Our main site is currently in waitlist mode.<br />Please visit the <a href="/waitlist" className="text-indigo-600 underline font-semibold">waitlist page</a> to join and stay updated!</p>
      </div>
    </div>
  );
  /*
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
  */
}
