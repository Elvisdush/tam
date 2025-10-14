import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ServicesStackingHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      number: "1",
      category: "(Identities)",
      title: "Creating motion identities that are compelling and distinct.",
      description: "We craft motion identities that embody the core and character of brands. Each identity is created with intention—to be distinct, differentiated, compelling and scalable into broader systems.",
      bgColor: "hsl(142, 76%, 36%)"
    },
    {
      number: "2", 
      category: "(Commercial)",
      title: "Crafting commercial content that drives engagement and results.",
      description: "Our commercial work combines strategic thinking with creative execution to deliver content that not only looks stunning but also achieves measurable business outcomes for our clients.",
      bgColor: "hsl(217, 91%, 60%)"
    },
    {
      number: "3",
      category: "(Film Production)", 
      title: "Producing cinematic experiences that captivate audiences.",
      description: "From concept to final cut, we handle every aspect of film production with meticulous attention to detail, ensuring each project tells a compelling story that resonates with viewers.",
      bgColor: "hsl(271, 76%, 53%)"
    },
    {
      number: "4",
      category: "(Music Videos)",
      title: "Creating visual narratives that amplify musical expression.", 
      description: "We transform musical concepts into visual experiences, working closely with artists to create music videos that enhance their artistic vision and connect with their audience.",
      bgColor: "hsl(24, 95%, 53%)"
    }
  ];

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".service-section");
    
    sections.forEach((section, index) => {
      if (index < sections.length - 1) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {services.map((service, index) => (
        <section 
          key={index} 
          className="service-section min-h-screen flex items-center justify-center relative"
          style={{ backgroundColor: index === 1 || index === 3 ? "#eee9e6" : "#090909" }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="grid grid-cols-12 gap-8 items-center">
              {/* Large Number - Left Side */}
              <div className="col-span-12 lg:col-span-5">
                <div 
                  className="text-[240px] lg:text-[320px] xl:text-[400px] font-bold leading-none opacity-20"
                  style={{ color: index === 1 || index === 3 ? "#090909" : "#ffffff" }}
                >
                  {service.number}
                </div>
              </div>

              {/* Content - Right Side */}
              <div className="col-span-12 lg:col-span-7 flex flex-col justify-start">
                {/* Category */}
                <div 
                  className="text-lg mb-8"
                  style={{ color: index === 1 || index === 3 ? "#090909" : "rgba(255, 255, 255, 0.7)" }}
                >
                  {service.category}
                </div>

                {/* Title */}
                <h1
                  className="text-4xl lg:text-5xl xl:text-6xl font-playfair font-semibold leading-tight mb-12"
                  style={{ color: index === 1 || index === 3 ? "#090909" : "#ffffff" }}
                >
                  {service.title}
                </h1>

                {/* Description */}
                <p
                  className="text-lg lg:text-xl font-montserrat leading-relaxed max-w-2xl"
                  style={{ color: index === 1 || index === 3 ? "#090909" : "rgba(255, 255, 255, 0.8)" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
