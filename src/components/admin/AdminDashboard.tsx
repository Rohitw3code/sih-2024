import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, Camera, Bell, Home, UserSearch, Package, Settings, LogOut, Menu, X, Search } from 'lucide-react';
import { LiveFeed } from '../LiveFeed';
import { AlertSystem } from '../AlertSystem';
import { ReportList } from '../reports/ReportList';
import { NotificationCenter } from './NotificationCenter';
import { useReports } from '../../hooks/useReports';

export const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { reports: activeReports } = useReports('active');
  const { reports: foundReports } = useReports('found');

  const renderContent = () => {
    switch (selectedTab) {
      case 'reports':
      case 'items':
        return <ReportList />;
      default:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <AlertTriangle className="w-10 h-10 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">{activeReports.length}</h3>
                    <p>Active Missing Cases</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <Users className="w-10 h-10 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">{foundReports.length}</h3>
                    <p>Found Today</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-xl shadow-lg"
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center text-orange-800">
                  <Camera className="w-6 h-6 mr-2" />
                  Live Surveillance Feed
                </h2>
                <LiveFeed />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center text-orange-800">
                  <Bell className="w-6 h-6 mr-2" />
                  Real-time Alerts
                </h2>
                <AlertSystem />
              </motion.div>
            </div>
          </div>
        );
    }
  };

  // Rest of the component remains the same...
  return (
    // Existing JSX...
  );
};