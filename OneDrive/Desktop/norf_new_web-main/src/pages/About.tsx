import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TeamSection } from "@/components/TeamSection";
import { MissionSection } from "@/components/MissionSection";
const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground leading-tight">
                About Norf Cre8ions
              </h1>
              <p className="text-xl md:text-2xl font-montserrat text-muted-foreground">
                We are visual storytellers from Rwanda, crafting compelling narratives that connect brands with their audiences.
              </p>
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card p-6 rounded-lg shadow-lg">
                    <div className="text-3xl font-playfair font-bold text-primary mb-2">50+</div>
                    <div className="text-sm font-montserrat text-muted-foreground">Projects Completed</div>
                  </div>
                  <div className="bg-card p-6 rounded-lg shadow-lg">
                    <div className="text-3xl font-playfair font-bold text-primary mb-2">5</div>
                    <div className="text-sm font-montserrat text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-[500px] lg:h-[600px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl"></div>
              <div className="absolute inset-4 bg-card rounded-xl shadow-2xl overflow-hidden">
                <img
                  src="/src/assets/Mike Afolarin.jpg"
                  alt="Creative team at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-8">
            Our Mission
          </h2>
          <p className="text-xl md:text-2xl font-montserrat text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Norf Cre8ions is a content-driven creative studio and agency based in Musanze, Rwanda. We are passionate about transforming ideas into impactful visual experiences that resonate. Specializing in digital marketing, content creation, and visual storytelling, we bring creativity and strategy together to help brands communicate their message effectively and stand out in today's dynamic landscape.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-foreground">🎨</span>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-4">Creativity</h3>
              <p className="font-montserrat text-muted-foreground">We push boundaries and think outside the box to deliver innovative solutions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-foreground">🤝</span>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-4">Collaboration</h3>
              <p className="font-montserrat text-muted-foreground">We believe in the power of teamwork and building strong partnerships.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-foreground">⭐</span>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-4">Excellence</h3>
              <p className="font-montserrat text-muted-foreground">We strive for perfection in every project, delivering quality that exceeds expectations.</p>
            </div>
          </div>
        </div>
      </section>

      <TeamSection />
      <MissionSection />
      <Footer />
    </div>
  );
};
export default About;
