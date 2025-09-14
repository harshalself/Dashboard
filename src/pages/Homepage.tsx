import {
  Navbar,
  HeroSection,
  FeaturesSection,
  StatsSection,
  AboutUsSection,
  CTASection,
  Footer,
} from "@/components/homepage";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <AboutUsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
