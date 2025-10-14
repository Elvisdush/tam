import Navigation from "@/components/Navigation";
import { ServicesStackingHero } from "@/components/ServicesStackingHero";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground leading-tight">
                Crafting Visual Stories That Captivate
              </h1>
              <p className="text-xl md:text-2xl font-montserrat text-muted-foreground">
                From motion identities to cinematic experiences, we bring your vision to life with creativity and precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-montserrat">
                  View Our Work
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-montserrat">
                  Get Quote
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-[500px] lg:h-[600px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl"></div>
              <div className="absolute inset-4 bg-card rounded-xl shadow-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-playfair font-bold text-primary">4</div>
                  <div className="text-xl font-montserrat text-muted-foreground">Core Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesStackingHero />
      <Footer />
    </div>
  );
};

export default Services;
