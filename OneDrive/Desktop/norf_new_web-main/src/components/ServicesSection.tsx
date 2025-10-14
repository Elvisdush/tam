import { useState } from "react";

export const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      number: "1",
      category: "(Identities)",
      title: "Creating motion identities that are compelling and distinct.",
      description: "We craft motion identities that embody the core and character of brands. Each identity is created with intention—to be distinct, differentiated, compelling and scalable into broader systems.",
      color: "bg-green-500"
    },
    {
      number: "2",
      category: "(Commercial)",
      title: "Crafting commercial content that drives engagement and results.",
      description: "Our commercial work combines strategic thinking with creative execution to deliver content that not only looks stunning but also achieves measurable business outcomes for our clients.",
      color: "bg-blue-500"
    },
    {
      number: "3",
      category: "(Film Production)",
      title: "Producing cinematic experiences that captivate audiences.",
      description: "From concept to final cut, we handle every aspect of film production with meticulous attention to detail, ensuring each project tells a compelling story that resonates with viewers.",
      color: "bg-purple-500"
    },
    {
      number: "4",
      category: "(Music Videos)",
      title: "Creating visual narratives that amplify musical expression.",
      description: "We transform musical concepts into visual experiences, working closely with artists to create music videos that enhance their artistic vision and connect with their audience.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Service Navigation */}
        <div className="flex gap-8 mb-20">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className={`text-lg font-light tracking-wide transition-elegant ${
                activeService === index
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {service.category}
            </button>
          ))}
        </div>

        {/* Active Service Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start min-h-[700px]">
          {/* Left Side - Large Number */}
          <div className="flex items-start justify-start">
            <span className="text-[400px] lg:text-[500px] xl:text-[600px] font-bold text-foreground leading-none">
              {services[activeService].number}
            </span>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-12 pt-8">
            {/* Category and Title */}
            <div>
              <p className="text-muted-foreground text-lg mb-6">
                {services[activeService].category}
              </p>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-foreground mb-12">
                {services[activeService].title}
              </h2>
            </div>

            {/* Visual Element */}
            <div className={`w-full max-w-md h-64 rounded-2xl ${services[activeService].color} flex items-center justify-center mb-12`}>
              <div className="w-20 h-20 bg-black rounded-full"></div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              {services[activeService].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};