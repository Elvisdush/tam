'use client';

import { motion } from 'framer-motion';
import { Film, Sliders, Cpu, LayoutGrid, Palette } from 'lucide-react';

const features = [
  {
    icon: <Film className="w-8 h-8" />,
    title: "Film Density",
    description: "Authentic film stock emulation with precise density and contrast characteristics."
  },
  {
    icon: <Sliders className="w-8 h-8" />,
    title: "Smart Smoothing",
    description: "Advanced algorithms for clean shadows and smooth highlight roll-off."
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "HK DCTLs",
    description: "High-quality DCTL transforms for DaVinci Resolve's color science."
  },
  {
    icon: <LayoutGrid className="w-8 h-8" />,
    title: "3×3 Matrix",
    description: "Precise color matrix transformations for accurate color reproduction."
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Subtractive Saturation",
    description: "Natural, film-like saturation that maintains color accuracy."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    }
  }
};

export default function Process() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Beyond Emulation
          </h2>
          <p className="text-xl text-gray-400">
            Color science backed look development
          </p>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-900/30 rounded-xl border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300"
              variants={item}
              whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' }}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500/20 to-purple-600/20 flex items-center justify-center mb-4 text-orange-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
