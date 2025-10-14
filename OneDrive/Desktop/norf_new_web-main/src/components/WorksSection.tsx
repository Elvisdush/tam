import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play, Camera, Film, Briefcase, Music } from "lucide-react";

export const WorksSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    { name: "All", icon: null },
    { name: "Branding", icon: Briefcase },
    { name: "Photography", icon: Camera },
    { name: "Film Production", icon: Film },
    { name: "Commercial", icon: Play },
    { name: "Music Video", icon: Music },
  ];

  const projects = [
    {
      id: 1,
      title: "RIVIAN - Carry Us",
      subtitle: "(Dir Cut)",
      category: "Commercial",
      year: "2023",
      role: "Director",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1000&fit=crop",
      description: "High-intensity automotive commercial blending technology and performance",
    },
    {
      id: 2,
      title: "Celsius - NIL Anthem",
      subtitle: "[ESPN 2025]",
      category: "Commercial",
      year: "2025",
      role: "Director",
      thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=1000&fit=crop",
      description: "Electrifying energy drink campaign for ESPN's premier sports coverage",
    },
    {
      id: 3,
      title: "ISOKNOCK - 4EVR",
      subtitle: "(Short Film)",
      category: "Music Video",
      year: "2023",
      role: "Director",
      thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=1000&fit=crop",
      description: "Experimental electronic music video exploring themes of permanence",
    },
    {
      id: 4,
      title: "Brand Identity",
      subtitle: "Visual System",
      category: "Branding",
      year: "2024",
      role: "Director",
      thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop",
      description: "Comprehensive brand identity for forward-thinking technology company",
    },
    {
      id: 5,
      title: "Portrait Series",
      subtitle: "Editorial Work",
      category: "Photography",
      year: "2024",
      role: "Director",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
      description: "Intimate portrait series capturing contemporary artists and creatives",
    },
    {
      id: 6,
      title: "Cinematic Journey",
      subtitle: "Feature Film",
      category: "Film Production",
      year: "2024",
      role: "Director",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1000&fit=crop",
      description: "Feature-length exploration of identity and human connection",
    },
  ];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg font-montserrat text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse portfolio of creative excellence across film, photography, and brand storytelling
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setActiveFilter(category.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                  activeFilter === category.name
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background text-foreground hover:bg-primary/10 hover:text-primary border border-border"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/work/${project.id}`}
              className="group cursor-pointer animate-fade-in bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Image Container */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-primary font-montserrat font-semibold text-sm uppercase tracking-wide">
                    {project.role}
                  </span>
                  <span className="text-muted-foreground font-montserrat text-sm">
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-playfair font-bold text-foreground mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-primary font-montserrat font-medium text-sm mb-3">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-muted-foreground font-montserrat text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-primary font-montserrat font-semibold text-sm hover:underline">
                    View Project
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Ready to Create Something Amazing?
            </h3>
            <p className="text-lg font-montserrat text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's collaborate on your next project. From concept to execution, we'll bring your vision to life with cinematic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-montserrat font-semibold hover:bg-primary/90 transition-colors inline-block text-center"
              >
                Explore Services
              </Link>
              <Link
                to="/contact"
                className="border border-primary text-primary px-8 py-4 rounded-lg font-montserrat font-semibold hover:bg-primary hover:text-primary-foreground transition-colors inline-block text-center"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
