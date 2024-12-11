import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Map, ArrowDown, Camera, Users, Clock } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1604881991720-f91add269bed', // Ujjain Temple
  'https://images.unsplash.com/photo-1587474260584-136574528ed5', // Indian Festival
  'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b', // Temple Architecture
];

export const Hero = ({ 
  onReport,
  onTrack 
}: { 
  onReport: () => void;
  onTrack: () => void;
}) => {
  return (
    <section className="relative min-h-screen pt-20 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 text-white overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: index * 5,
              duration: 1,
              repeat: Infinity,
              repeatDelay: (images.length - 1) * 5
            }}
          >
            <img
              src={img}
              alt="Ujjain"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 0 
            }}
            animate={{ 
              y: window.innerHeight + 20,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-20 relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                शिमहस्त उज्जैन मेला
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-yellow-200 to-yellow-400 mx-auto rounded-full" />
            </motion.div>
            <p className="text-2xl md:text-3xl mb-4 text-orange-100">
              Advanced Tracking System
            </p>
            <p className="text-xl text-orange-200 max-w-2xl mx-auto">
              Using cutting-edge AI and facial recognition to reunite families
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReport}
              className="group relative overflow-hidden flex items-center bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <UserPlus className="mr-2 group-hover:rotate-12 transition-transform relative z-10" />
              <span className="relative z-10">Report Missing Person</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onTrack}
              className="group relative overflow-hidden flex items-center bg-orange-800 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-900 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <Search className="mr-2 group-hover:scale-110 transition-transform relative z-10" />
              <span className="relative z-10">Track Status</span>
            </motion.button>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
            {[
              { icon: Camera, title: '160+ Cameras', desc: 'Advanced surveillance network' },
              { icon: Users, title: '95% Success', desc: 'High accuracy in tracking' },
              { icon: Map, title: '24/7 Support', desc: 'Round-the-clock assistance' },
              { icon: Clock, title: 'Quick Response', desc: 'Immediate action on reports' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group bg-gradient-to-b from-orange-700/50 to-orange-800/50 p-6 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-orange-500/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:rotate-12 transition-transform">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-orange-200">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6 text-orange-200" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};