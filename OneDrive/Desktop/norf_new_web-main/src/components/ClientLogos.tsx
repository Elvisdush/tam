
import client1 from '../assets/first.jpg';
import client2 from '../assets/Mike Afolarin.jpg';
import client3 from '../assets/Business attire, paper boy attire, photoshoot.jpg';
import client4 from '../assets/348c36df-b47e-424f-8990-625a24bc4920.jpg';

export const ClientLogos = () => {
  const caseStudies = [
    {
      title: "SoundMint Music Video",
      description: "Directed a high-energy music video featuring dynamic cinematography and innovative editing techniques that captured the artist's raw emotion.",
      image: client1,
    },
    {
      title: "DJI Drone Campaign",
      description: "Created stunning aerial footage for DJI's latest drone technology, showcasing breathtaking landscapes and smooth flight patterns.",
      image: client2,
    },
    {
      title: "Hypebeast Fashion Shoot",
      description: "Produced a cutting-edge fashion editorial with bold visuals and creative lighting that pushed the boundaries of modern photography.",
      image: client3,
    },
    {
      title: "Porsche Lifestyle Series",
      description: "Filmed an exclusive series highlighting the luxury lifestyle, combining high-speed action with elegant storytelling.",
      image: client4,
    },
  ];

  return (
    <section className="py-20 border-t border-border/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-foreground">
          Client Case Studies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.title}
              className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover:scale-105"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold mb-3 text-card-foreground">
                  {study.title}
                </h3>
                <p className="text-sm font-montserrat text-muted-foreground leading-relaxed">
                  {study.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
