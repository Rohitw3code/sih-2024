import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin } from 'lucide-react';

export const SearchSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="missing-persons">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Find Missing Persons & Items
          </h2>

          <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Type
                </label>
                <select className="w-full p-3 border rounded-lg">
                  <option>Missing Person</option>
                  <option>Missing Child</option>
                  <option>Lost Item</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select className="w-full p-3 border rounded-lg">
                  <option>All Locations</option>
                  <option>Ram Ghat</option>
                  <option>Mahakal Temple</option>
                  <option>Kalbhairav Temple</option>
                </select>
              </div>
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center">
                <Search className="mr-2" />
                Search
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
                  alt="Missing Person"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">Ram Kumar</h3>
                  <p className="text-gray-600">Age: 35 • Male</p>
                  <p className="text-gray-600 flex items-center mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    Last seen: Ram Ghat
                  </p>
                  <button className="mt-3 text-orange-600 font-semibold hover:text-orange-700">
                    View Details →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                  alt="Missing Person"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">Priya Sharma</h3>
                  <p className="text-gray-600">Age: 28 • Female</p>
                  <p className="text-gray-600 flex items-center mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    Last seen: Mahakal Temple
                  </p>
                  <button className="mt-3 text-orange-600 font-semibold hover:text-orange-700">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};