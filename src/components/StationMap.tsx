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
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28193.655747700563!2d77.41344436272794!3d23.260116523578656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1733921424321!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};