import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

export const StationMap = () => {
  return (
    <section className="py-20 bg-white" id="stations">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Help Station Network
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-orange-50 p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-600 p-3 rounded-lg text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ram Ghat Station</h3>
                    <p className="text-gray-600 mb-2">Main help center with 24/7 support and facial recognition system</p>
                    <div className="flex items-center text-gray-500">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>+91 1234567890</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-600 p-3 rounded-lg text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Mahakal Temple Station</h3>
                    <p className="text-gray-600 mb-2">Secondary center with lost & found facility</p>
                    <div className="flex items-center text-gray-500">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>+91 9876543210</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-600 p-3 rounded-lg text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Kalbhairav Station</h3>
                    <p className="text-gray-600 mb-2">Emergency response and medical support available</p>
                    <div className="flex items-center text-gray-500">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>+91 8765432109</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 h-[500px] relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83"
                alt="Ujjain Map"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-bold text-xl mb-2">Interactive Map</h3>
                  <p>Click on markers to see detailed information about each help station</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};