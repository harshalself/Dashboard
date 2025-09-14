import { Star, Users, Zap } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
          Why Choose Our Template?
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          Everything you need to build a modern admin dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <Zap className="h-10 w-10 text-primary mb-4" />
            <CardTitle>Modern Design</CardTitle>
            <CardDescription>
              Beautiful, responsive UI built with Tailwind CSS and shadcn/ui
              components. Fully customizable to match your brand.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-10 w-10 text-primary mb-4" />
            <CardTitle>Developer Friendly</CardTitle>
            <CardDescription>
              Built with TypeScript, React Query, and modern best practices.
              Easy to extend and maintain.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Star className="h-10 w-10 text-primary mb-4" />
            <CardTitle>Production Ready</CardTitle>
            <CardDescription>
              Complete authentication system, API integration, error handling,
              and everything you need for production deployment.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
