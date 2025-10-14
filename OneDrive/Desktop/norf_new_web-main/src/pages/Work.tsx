import Navigation from "@/components/Navigation";
import { WorksSection } from "@/components/WorksSection";
import { Footer } from "@/components/Footer";

const Work = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
            Our Work
          </h1>
          <p className="text-xl md:text-2xl font-montserrat text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            Discover our portfolio of cinematic excellence. From commercial campaigns to music videos,
            we bring stories to life with unparalleled creativity and technical mastery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-montserrat font-semibold hover:bg-primary/90 transition-colors">
              View Our Services
            </button>
            <button className="border border-primary text-primary px-8 py-4 rounded-lg font-montserrat font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      <WorksSection />
      <Footer />
    </div>
  );
};

export default Work;
