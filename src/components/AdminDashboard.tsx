import React from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, Camera, Bell } from 'lucide-react';
import { LiveFeed } from './LiveFeed';
import { AlertSystem } from './AlertSystem';

export const AdminDashboard = () => {
  return (
    <section className="pt-16 min-h-screen bg-[url('https://images.unsplash.com/photo-1561361058-c24cecae35ca')] bg-cover bg-center bg-fixed">
      <div className="backdrop-blur-sm bg-white/30">
        <div className="container mx-auto px-4">
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-xl shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center">
                <AlertTriangle className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">24</h3>
                  <p>Active Missing Cases</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center">
                <Users className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">18</h3>
                  <p>Found Today</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-xl shadow-lg backdrop-blur-sm sm:col-span-2 md:col-span-1"
            >
              <div className="flex items-center">
                <Camera className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">156</h3>
                  <p>Active Cameras</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center text-orange-800">
                <Camera className="w-6 h-6 mr-2" />
                Live Surveillance Feed
              </h2>
              <LiveFeed />
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center text-orange-800">
                <Bell className="w-6 h-6 mr-2" />
                Real-time Alerts
              </h2>
              <AlertSystem />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};