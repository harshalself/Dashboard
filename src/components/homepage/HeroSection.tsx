import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
          Modern Admin Dashboard
          <span className="text-primary"> Template</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          A beautiful, responsive admin panel built with React, TypeScript, and
          Tailwind CSS. Ready to integrate with your backend and customize for
          your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Button
            size="lg"
            className="text-base sm:text-lg px-6 sm:px-8"
            onClick={() => navigate("/dashboard")}>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base sm:text-lg px-6 sm:px-8">
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  );
}
