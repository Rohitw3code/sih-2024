import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, Camera, Bell, Home, UserSearch, Package, Settings, LogOut, ChevronRight, Search } from 'lucide-react';
import { LiveFeed } from './LiveFeed';
import { AlertSystem } from './AlertSystem';
import { ReportList } from './admin/ReportList';
import { Report } from './admin/types';

const mockReports: Report[] = [
  {
    id: 'MP24X7H9KL',
    type: 'person',
    name: 'Rishabh Raj',
    age: 25,
    gender: 'Male',
    contact: '9876543210',
    location: 'Ram Ghat',
    description: 'Wearing orange kurta and white dhoti. Has a small scar on right hand.',
    status: 'active',
    reportedAt: '2024-03-14T15:30:00',
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c'
  },
  {
    id: 'MP24X7H9KM',
    type: 'person',
    name: 'Khushi Rani',
    age: 22,
    gender: 'Female',
    contact: '9876543211',
    location: 'Mahakal Temple',
    description: 'Wearing red and gold saree. Has a birthmark on left cheek.',
    status: 'active',
    reportedAt: '2024-03-14T16:45:00',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
  },
  {
    id: 'MP24X7H9KN',
    type: 'person',
    name: 'Priyanshu Kushwaha',
    age: 28,
    gender: 'Male',
    contact: '9876543212',
    location: 'Kalbhairav Temple',
    description: 'Wearing black shirt and blue jeans. Has glasses.',
    status: 'found',
    reportedAt: '2024-03-14T14:15:00',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'
  },
  {
    id: 'MP24X7H9KO',
    type: 'person',
    name: 'Pragati Priya',
    age: 24,
    gender: 'Female',
    contact: '9876543213',
    location: 'Main Market',
    description: 'Wearing yellow salwar suit. Has long hair.',
    status: 'active',
    reportedAt: '2024-03-14T17:30:00',
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39'
  },
  {
    id: 'MP24X7H9KP',
    type: 'person',
    name: 'Harsh Kumar',
    age: 26,
    gender: 'Male',
    contact: '9876543214',
    location: 'Ram Ghat',
    description: 'Wearing white shirt and black pants. Has a tattoo on right arm.',
    status: 'active',
    reportedAt: '2024-03-14T18:00:00',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
  }
];

export const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (selectedTab) {
      case 'reports':
      case 'items':
        return <ReportList reports={mockReports.filter(report => 
          report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.id.toLowerCase().includes(searchQuery.toLowerCase())
        )} />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-xl shadow-lg"
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
                className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl shadow-lg"
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center text-orange-800">
                  <Camera className="w-6 h-6 mr-2" />
                  Live Surveillance Feed
                </h2>
                <LiveFeed />
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center text-orange-800">
                  <Bell className="w-6 h-6 mr-2" />
                  Real-time Alerts
                </h2>
                <AlertSystem />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm z-50 px-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">MP Police Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">Inspector Sharma</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ width: isSidebarOpen ? 240 : 80 }}
          animate={{ width: isSidebarOpen ? 240 : 80 }}
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r shadow-lg transition-all duration-300 z-40`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { icon: Home, label: 'Dashboard', id: 'dashboard' },
                { icon: UserSearch, label: 'Missing Reports', id: 'reports' },
                { icon: Package, label: 'Lost Items', id: 'items' },
                { icon: Settings, label: 'Settings', id: 'settings' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setSelectedTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      selectedTab === item.id
                        ? 'bg-orange-100 text-orange-800'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>

            <div className="absolute bottom-4 left-4 right-4">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                {isSidebarOpen && <span>Logout</span>}
              </button>
            </div>
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-20'}`}>
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};