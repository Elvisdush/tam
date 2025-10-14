import Navigation from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ClientLogos } from "@/components/ClientLogos";
import { BehindTheLens } from "@/components/BehindTheLens";
import { MediaSection } from "@/components/MediaSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      <HeroSection />
      <div className="relative z-20 -mt-1 bg-background">
        <ClientLogos />
        <BehindTheLens />
        <MediaSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
