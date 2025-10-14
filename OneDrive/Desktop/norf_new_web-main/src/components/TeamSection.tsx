export const TeamSection = () => {
  const teamMembers = [
    {
      src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
      name: "Sarah Johnson",
      position: "Creative Director"
    },
    {
      src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
      name: "Michael Chen",
      position: "Lead Photographer"
    },
    {
      src: "https://images.unsplash.com/photo-1524749292158-7540c2494485?w=800&h=600&fit=crop",
      name: "Emma Williams",
      position: "Senior Videographer"
    },
    {
      src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
      name: "David Martinez",
      position: "Post-Production Lead"
    },
    {
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop",
      name: "Alex Thompson",
      position: "Motion Designer"
    },
    {
      src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
      name: "Jordan Lee",
      position: "VFX Artist"
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      name: "Chris Anderson",
      position: "Sound Designer"
    },
    {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop",
      name: "Taylor Brooks",
      position: "Color Grading"
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
      name: "Ryan Cooper",
      position: "Producer"
    },
    {
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b3fe?w=800&h=600&fit=crop",
      name: "Morgan Davis",
      position: "Camera Operator"
    },
    {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop",
      name: "Casey Miller",
      position: "Editor"
    },
    {
      src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      name: "Riley Parker",
      position: "Assistant Director"
    }
  ];

  return (
    <section className="py-32 border-t border-foreground/10 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h3 className="text-sm font-light tracking-widest text-foreground uppercase mb-8">
            BEHIND THE LENS —
          </h3>
        </div>

        {/* Large Quote */}
        <div className="mb-20">
          <blockquote className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-light text-foreground leading-tight">
            "Mitchell Mullins is a multi-faceted Director based out of Los Angeles, California. His background in VFX, FPV, and Motion-Design combine to create a unique frame for the abstract and futuristic tone of his work"
          </blockquote>
        </div>

        {/* Grid Images */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {teamMembers.map((item, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden group">
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-montserrat font-medium text-lg">{item.name}</p>
                <p className="text-white/80 font-montserrat text-sm">{item.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
