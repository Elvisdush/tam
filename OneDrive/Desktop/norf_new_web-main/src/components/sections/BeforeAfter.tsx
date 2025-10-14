'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  
  // Handle mouse move for drag interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const container = containerRef.current.getBoundingClientRect();
      const position = ((e.clientX - container.left) / container.width) * 100;
      setSliderPosition(Math.min(Math.max(position, 0), 100));
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  // Handle touch events for mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const position = ((touch.clientX - container.left) / container.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Transform Your Footprint
          </h2>
          <p className="text-xl text-gray-300">
            Every frame tells a story. Every color evokes an emotion.
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="relative w-full max-w-4xl mx-auto h-[500px] rounded-xl overflow-hidden shadow-2xl"
          onTouchMove={handleTouchMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* Before Image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/images/before.jpg" 
              alt="Before applying LUTs" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          </div>
          
          {/* After Image */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src="/images/after.jpg" 
              alt="After applying LUTs" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent" />
          </div>
          
          {/* Slider Control */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={() => setIsDragging(true)}
          >
            <div className="absolute -left-3 -top-8 bottom-0 flex items-center">
              <div className="w-8 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-1 h-6 bg-gray-800" />
              </div>
            </div>
            <div className="absolute -left-3 top-1/2 -translate-y-1/2">
              <div className="w-2 h-8 bg-white rounded-full" />
            </div>
          </div>
          
          {/* Labels */}
          <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded-md text-sm font-medium">
            Before
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-md text-sm font-medium">
            After
          </div>
        </div>
      </div>
    </section>
  );
}
