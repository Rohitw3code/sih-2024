import React from 'react';
import { motion } from 'framer-motion';
import { Search, AlertCircle, Map } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-screen pt-20 bg-gradient-to-b from-orange-500 to-orange-600 text-white">
      <div className="container mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simhastha Ujjain Mela 2024
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-orange-100">
            Advanced tracking system for missing persons and items
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg"
            >
              <AlertCircle className="mr-2" />
              Report Missing Person
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg"
            >
              <Search className="mr-2" />
              Search Database
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-orange-700/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-2">Facial Recognition</h3>
              <p>Advanced AI-powered facial recognition to quickly locate missing persons</p>
            </div>
            <div className="bg-orange-700/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-2">Real-time Tracking</h3>
              <p>Live updates and notifications across all help stations</p>
            </div>
            <div className="bg-orange-700/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
              <p>Round-the-clock assistance at all help stations</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};