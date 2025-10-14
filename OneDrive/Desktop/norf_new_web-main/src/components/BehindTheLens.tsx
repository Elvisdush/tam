import { useState, useEffect, useRef } from "react";

export const BehindTheLens = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const descriptions = [
    {
      title: "Creative Vision",
      text: "Every shot tells a story. We blend technical expertise with artistic vision to create compelling narratives that resonate with audiences."
    },
    {
      title: "Technical Excellence",
      text: "From cutting-edge camera work to innovative post-production, we push the boundaries of what's possible in visual storytelling."
    },
    {
      title: "Collaborative Process",
      text: "Working closely with clients, we transform ideas into reality through a seamless collaboration that brings visions to life."
    },
    {
      title: "Future-Focused",
      text: "Embracing new technologies and trends, we stay ahead of the curve to deliver forward-thinking content that stands out."
    }
  ];

  const images = [
    "https://images.unsplash.com/photo-1492691527719-9f1e07e534b4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1524749292158-7540c2494485?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [descriptions.length]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset scroll position for infinite loop
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="py-20 border-t border-border/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-8 text-foreground">
            Behind The Lens
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative h-32 flex items-center justify-center">
              {descriptions.map((desc, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentIndex
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-playfair font-semibold mb-4 text-primary">
                    {desc.title}
                  </h3>
                  <p className="text-lg font-montserrat text-muted-foreground leading-relaxed">
                    {desc.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {descriptions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Infinite Image Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden mt-16"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* First set of images */}
        {images.map((src, index) => (
          <div key={`img-1-${index}`} className="flex-none w-full md:w-1/3 aspect-[4/3] overflow-hidden">
            <img
              src={src}
              alt={`Behind the scenes ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Duplicate set for infinite loop */}
        {images.map((src, index) => (
          <div key={`img-2-${index}`} className="flex-none w-full md:w-1/3 aspect-[4/3] overflow-hidden">
            <img
              src={src}
              alt={`Behind the scenes ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
