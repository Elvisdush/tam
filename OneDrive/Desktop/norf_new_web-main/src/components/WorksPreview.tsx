import { ArrowUpRight } from "lucide-react";

export const WorksPreview = () => {
  const featuredWorks = [
    {
      id: 1,
      title: "Soundmint Campaign",
      subtitle: "(Music Video)",
      category: "Music Video",
      year: "2024",
      role: "Director",
      thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "DJI Commercial",
      subtitle: "(Brand Film)",
      category: "Commercial",
      year: "2024",
      role: "Director",
      thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Fashion Film",
      subtitle: "(Editorial)",
      category: "Fashion",
      year: "2023",
      role: "Director",
      thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-brand-light mb-4">
              CLIENT CASE STUDIES
            </h2>
          </div>
          <a 
            href="#gallery" 
            className="text-sm font-medium tracking-widest text-brand-gray hover:text-brand-light transition-smooth"
          >
            SEE MORE WORK
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorks.map((work, index) => (
            <div
              key={work.id}
              className="group cursor-pointer animate-fade-in border border-brand-light/20 rounded-lg overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Rectangular Image */}
              <div className="aspect-[16/10] overflow-hidden rounded-lg mb-0">
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="w-full h-full object-cover transition-elegant group-hover:scale-105"
                />
              </div>
              
              {/* Text Content Section */}
              <div className="bg-brand-dark rounded-b-lg p-6">
                {/* Top - Role and Year */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-brand-light text-sm font-light tracking-wide">
                    {work.role}
                  </span>
                  <span className="text-brand-light text-sm font-light">
                    {work.year}
                  </span>
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-brand-light text-2xl font-light mb-2 leading-tight">
                  {work.title}
                </h3>
                <p className="text-brand-light text-2xl font-light mb-8 leading-tight">
                  {work.subtitle}
                </p>
                
                {/* View Project Button */}
                <button className="group/btn flex items-center gap-3 text-brand-light hover:text-primary transition-smooth">
                  <div className="w-10 h-10 border border-brand-light/30 rounded-full flex items-center justify-center group-hover/btn:border-primary transition-smooth">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium tracking-wider">VIEW PROJECT</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};