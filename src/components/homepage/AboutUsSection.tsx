import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";

export function AboutUsSection() {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description:
        "We believe in building tools that bring people together and foster collaboration.",
    },
    {
      icon: Target,
      title: "Innovation",
      description:
        "Constantly pushing boundaries to deliver cutting-edge solutions for modern businesses.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Committed to delivering high-quality products that exceed expectations.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Driven by passion for technology and a desire to make a positive impact.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're a team of passionate developers and designers dedicated to
            creating exceptional admin panel solutions that empower businesses
            to thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-muted-foreground mb-6">
              To democratize powerful admin tools by making them accessible,
              intuitive, and scalable for businesses of all sizes. We believe
              that great tools shouldn't be complicated.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              A world where every business can harness the power of data and
              automation without the complexity. We're building the future of
              admin management, one feature at a time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <value.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="bg-background rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Join Our Journey</h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals who share our
              passion for innovation and excellence. If you're interested in
              joining our team or learning more about our work, we'd love to
              hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Clients
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Support Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
