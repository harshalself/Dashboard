import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-primary/5">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
          Ready to Build Your Dashboard?
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
          Get started with our modern admin panel template and build something
          amazing.
        </p>
        <Button
          size="lg"
          className="text-base sm:text-lg px-6 sm:px-8"
          onClick={() => navigate("/dashboard")}>
          Start Building Now
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </section>
  );
}
