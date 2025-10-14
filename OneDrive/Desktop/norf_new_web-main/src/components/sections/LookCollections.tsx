'use client';

import { motion } from 'framer-motion';

const looks = [
  { id: 1, name: 'Nova', color: '#F59E0B' },
  { id: 2, name: 'Pyre', color: '#EF4444' },
  { id: 3, name: 'Terra', color: '#22C55E' },
  { id: 4, name: 'Helios', color: '#F97316' },
  { id: 5, name: 'Sol', color: '#EAB308' },
  { id: 6, name: 'Ember', color: '#DC2626' },
  { id: 7, name: 'Aether', color: '#3B82F6' },
  { id: 8, name: 'Dusk', color: '#8B5CF6' },
  { id: 9, name: 'Bloom', color: '#EC4899' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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
    }
  },
};

export default function LookCollections() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Signature Looks
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Handcrafted LUT collections designed to bring your footage to life
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {looks.map((look) => (
            <motion.div 
              key={look.id}
              className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
              variants={item}
              whileHover={{ y: -10 }}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-70 z-10"
                style={{
                  background: `linear-gradient(135deg, ${look.color}33 0%, #000000cc 100%)`
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-20 flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{look.name}</h3>
                  <p className="text-gray-300 text-sm">Cinematic LUT Pack</p>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div 
                  className="w-32 h-32 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: look.color }}
                />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-6xl font-bold opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                  {look.name.charAt(0)}
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                  View Collection
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity">
            View All Collections
          </button>
        </div>
      </div>
    </section>
  );
}
