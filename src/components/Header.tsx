import React from 'react';
import { Menu, X, ScanFace, Bell } from 'lucide-react';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed w-full z-50 bg-gradient-to-r from-orange-800 via-orange-700 to-orange-800 text-white border-b-4 border-yellow-500">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <ScanFace className="h-8 w-8 text-yellow-400" />
            <div>
              <span className="text-xl font-bold">शिमहस्त</span>
              <span className="text-sm block text-yellow-400">Simhastha Tracker</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="hover:text-yellow-400 transition-colors">Dashboard</a>
            <a href="#surveillance" className="hover:text-yellow-400 transition-colors">Surveillance</a>
            <a href="#reports" className="hover:text-yellow-400 transition-colors">Reports</a>
            <a href="#stations" className="hover:text-yellow-400 transition-colors">Stations</a>
            <button className="flex items-center bg-yellow-500 text-orange-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
              <Bell className="w-4 h-4 mr-2" />
              New Alert
            </button>
          </div>

          <button 
            className="md:hidden text-yellow-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-orange-600">
            <div className="flex flex-col space-y-4 py-4">
              <a href="#dashboard" className="hover:text-yellow-400 transition-colors px-4">Dashboard</a>
              <a href="#surveillance" className="hover:text-yellow-400 transition-colors px-4">Surveillance</a>
              <a href="#reports" className="hover:text-yellow-400 transition-colors px-4">Reports</a>
              <a href="#stations" className="hover:text-yellow-400 transition-colors px-4">Stations</a>
              <button className="flex items-center bg-yellow-500 text-orange-900 px-4 py-2 mx-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                <Bell className="w-4 h-4 mr-2" />
                New Alert
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};