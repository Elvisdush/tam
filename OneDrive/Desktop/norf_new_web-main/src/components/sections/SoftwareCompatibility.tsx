'use client';

import { motion } from 'framer-motion';
import { Monitor, Smartphone, Film } from 'lucide-react';

const softwareList = [
  { name: 'DaVinci Resolve', icon: '🎬', color: 'from-blue-500 to-blue-600' },
  { name: 'Premiere Pro', icon: '🎥', color: 'from-purple-500 to-pink-500' },
  { name: 'Final Cut Pro', icon: '✂️', color: 'from-red-500 to-orange-500' },
  { name: 'Photoshop', icon: '🖌️', color: 'from-blue-400 to-cyan-400' },
  { name: 'After Effects', icon: '🎞️', color: 'from-purple-400 to-blue-400' },
  { name: 'DaVinci Resolve', icon: '🎬', color: 'from-blue-500 to-blue-600' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function SoftwareCompatibility() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Works With Your Workflow
          </h2>
          <p className="text-xl text-gray-400">
            LUTs are supported in almost every editing software including DaVinci Resolve, Premiere Pro, Final Cut Pro, and Photoshop.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {softwareList.map((software, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-xl border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group"
              variants={item}
              whileHover={{ 
                y: -5, 
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.3) 100%)'
              }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${software.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                {software.icon}
              </div>
              <span className="text-sm font-medium text-center">{software.name}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800/50">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 text-orange-400">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Desktop</h3>
            <p className="text-gray-400">Compatible with all major desktop editing software on both Mac and Windows.</p>
          </div>
          
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800/50">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mobile</h3>
            <p className="text-gray-400">Use with mobile editing apps like LumaFusion and Adobe Premiere Rush.</p>
          </div>
          
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800/50">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Camera</h3>
            <p className="text-gray-400">Load directly into cameras that support 3D LUTs like Blackmagic and Z CAM.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
