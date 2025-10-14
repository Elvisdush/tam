import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Mail, Phone, Calendar, Users } from "lucide-react";

const WorkDetail = () => {
  const { id } = useParams();

  // This would typically come from an API or data store
  const projects = [
    {
      id: 1,
      title: "RIVIAN - Carry Us",
      subtitle: "(Dir Cut)",
      description: "Bitter Creek was brought on to create the commercial for Carry Us, the lead campaign from automotive powerhouse RIVIAN's debut album Spiritual Driveby.\n\nA high-intensity visual trip, the video blends automotive excellence and cutting-edge technology with a fierce, choreographed performance. Set in a raw, industrial space, it captures the pulse of the future - where innovation, sustainability and movement collide.",
      additionalText: "Shot in moody shadows and punctuated by explosive bursts of light, Carry Us doesn't just hit hard - it elevates. The result is a visceral visual companion that amplifies the campaign's energy and cements RIVIAN's status as a force in sustainable transportation.",
      credits: [
        { label: "Label", value: "RIVIAN Motors" },
        { label: "Management", value: "Creative Department" },
        { label: "Partner & Senior Director", value: "John Smith" },
        { label: "Label Manager", value: "Jane Doe" },
        { label: "Director & DOP", value: "Nick Carter" },
        { label: "1st AC", value: "Juan Minotta" },
        { label: "2nd AC", value: "Laura Berbel" },
        { label: "Art Director", value: "Bibi Baker" },
      ],
      images: [
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=1600&fit=crop",
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop",
      ]
    },
    {
      id: 2,
      title: "Celsius - NIL Anthem",
      subtitle: "[ESPN 2025]",
      description: "Created an electrifying anthem commercial for Celsius energy drink, showcasing their NIL athlete partnerships for ESPN's 2025 season coverage.\n\nThe video combines high-energy sports footage with dynamic product placement, capturing the essence of athletic excellence and peak performance.",
      additionalText: "This commercial aired during prime ESPN slots, reaching millions of sports fans and establishing Celsius as the energy drink of choice for athletes.",
      credits: [
        { label: "Client", value: "Celsius Holdings" },
        { label: "Network", value: "ESPN" },
        { label: "Director", value: "Michael Jordan" },
        { label: "Producer", value: "Sarah Williams" },
      ],
      images: [
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&h=1600&fit=crop",
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&h=800&fit=crop",
      ]
    },
    {
      id: 3,
      title: "ISOKNOCK - 4EVR",
      subtitle: "(Short Film)",
      description: "A cinematic journey exploring themes of permanence and fleeting moments through the lens of experimental electronic music.\n\nThis short film blends abstract visuals with ISOKNOCK's signature sound design to create an immersive audio-visual experience.",
      additionalText: "Shot over three days in various locations, the film captures the essence of modern digital culture and its impact on human connection.",
      credits: [
        { label: "Artist", value: "ISOKNOCK" },
        { label: "Director", value: "Alex Chen" },
        { label: "Cinematographer", value: "Maria Rodriguez" },
        { label: "Editor", value: "Tom Anderson" },
      ],
      images: [
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&h=1600&fit=crop",
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&h=800&fit=crop",
      ]
    },
    {
      id: 4,
      title: "Brand Identity",
      subtitle: "Visual System",
      description: "Developed a comprehensive brand identity and visual system for a forward-thinking technology company.\n\nThe system includes logo design, color palette, typography, and application guidelines across digital and print media.",
      additionalText: "This cohesive identity has helped the brand establish a strong presence in the competitive tech landscape.",
      credits: [
        { label: "Creative Director", value: "Emma Thompson" },
        { label: "Designer", value: "David Lee" },
        { label: "Strategist", value: "Rachel Green" },
      ],
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=1600&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=800&fit=crop",
      ]
    },
    {
      id: 5,
      title: "Portrait Series",
      subtitle: "Editorial Work",
      description: "An intimate portrait series capturing the essence of contemporary artists and creatives in their natural environments.\n\nEach portrait tells a story of passion, dedication, and artistic vision.",
      additionalText: "Published in leading editorial magazines, this series has been recognized for its authentic approach to modern portraiture.",
      credits: [
        { label: "Photographer", value: "Lisa Wang" },
        { label: "Stylist", value: "Marcus Brown" },
        { label: "Makeup Artist", value: "Nina Patel" },
      ],
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=1600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      ]
    },
    {
      id: 6,
      title: "Cinematic Journey",
      subtitle: "Feature Film",
      description: "A feature-length film exploring themes of identity, connection, and the human experience in an increasingly digital world.\n\nThis ambitious project brings together a talented cast and crew to tell a compelling story.",
      additionalText: "The film premiered at major international film festivals and received critical acclaim for its innovative storytelling approach.",
      credits: [
        { label: "Director", value: "James Wilson" },
        { label: "Producer", value: "Anna Martinez" },
        { label: "Cinematographer", value: "Kevin Park" },
        { label: "Editor", value: "Sophie Turner" },
      ],
      images: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=1600&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop",
      ]
    },
  ];

  const project = projects.find(p => p.id === parseInt(id || "1"));

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 text-center">
          <h1 className="text-4xl mb-4">Project not found</h1>
          <Link to="/work" className="text-primary hover:underline">
            Back to Work
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Back Button */}
      <div className="pt-24 pb-8 px-6">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-montserrat"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Work
        </Link>
      </div>

      <div className="min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
          {/* Left Side - Images */}
          <div className="bg-background p-6 lg:p-12 space-y-8 lg:col-span-2">
            {project.images.map((image, index) => (
              <div key={index} className="w-full group">
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            ))}
          </div>

          {/* Right Side - Content */}
          <div className="bg-muted/30 p-6 lg:p-12 lg:sticky lg:top-20 lg:h-screen lg:overflow-y-auto lg:col-span-1">
            <div className="max-w-xl">
              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-4 text-foreground leading-tight">
                {project.title}
              </h1>
              <p className="text-primary font-montserrat font-semibold text-lg mb-8">
                {project.subtitle}
              </p>

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-montserrat text-muted-foreground">Year</p>
                  <p className="font-playfair font-bold text-foreground">{project.credits.find(c => c.label === 'Client')?.value || '2024'}</p>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <Users className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-montserrat text-muted-foreground">Role</p>
                  <p className="font-playfair font-bold text-foreground">Director</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6 mb-12">
                <h2 className="text-2xl font-playfair font-bold text-foreground">Project Overview</h2>
                {project.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed font-montserrat">
                    {paragraph}
                  </p>
                ))}
                {project.additionalText && (
                  <p className="text-muted-foreground leading-relaxed font-montserrat">
                    {project.additionalText}
                  </p>
                )}
              </div>

              {/* Credits */}
              <div className="mb-12">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-6">Credits</h3>
                <div className="space-y-4">
                  {project.credits.map((credit, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-muted-foreground font-montserrat text-sm">{credit.label}</span>
                      <span className="text-foreground font-montserrat font-medium">{credit.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Ready to Create Something Similar?</h3>
                <p className="text-muted-foreground font-montserrat mb-6">
                  Let's discuss your project and bring your vision to life with the same level of creativity and expertise.
                </p>
                <div className="space-y-3">
                  <Link
                    to="/contact"
                    className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-montserrat font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Start Your Project
                  </Link>
                  <Link
                    to="/services"
                    className="w-full border border-primary text-primary py-4 px-6 rounded-lg font-montserrat font-semibold hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    View Services
                  </Link>
                </div>
              </div>

              {/* Related Projects CTA */}
              <div className="mt-12 pt-8 border-t border-border">
                <Link
                  to="/work"
                  className="text-primary font-montserrat font-semibold hover:underline flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Explore More Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorkDetail;
