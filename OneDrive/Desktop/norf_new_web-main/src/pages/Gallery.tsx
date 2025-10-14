import Navigation from "@/components/Navigation";
import { GallerySection } from "@/components/GallerySection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-neutral/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground leading-tight">
                Capturing Moments That Matter
              </h1>
              <p className="text-xl md:text-2xl font-montserrat text-muted-foreground">
                Explore our curated collection of photography spanning street scenes, portraits, events, and landscapes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-montserrat">
                  <Camera className="mr-2 w-5 h-5" />
                  View Gallery
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-montserrat">
                  Book Session
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-[500px] lg:h-[600px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl"></div>
              <div className="absolute inset-4 bg-card rounded-xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop"
                  alt="Featured photography"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GallerySection />
      <Footer />
    </div>
  );
};

export default Gallery;
