import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, Filter, Clock, MapPin, Phone, User, Search, AlertCircle } from 'lucide-react';
import { Report } from './types';
import { ReportDetails } from './ReportDetails';

interface ReportListProps {
  reports: Report[];
}

export const ReportList = ({ reports }: ReportListProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = useMemo(() => 
    reports.filter(report => {
      const typeMatch = filterType === 'all' || report.type === filterType;
      const statusMatch = filterStatus === 'all' || report.status === filterStatus;
      const searchMatch = searchQuery === '' || 
        report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase());
      return typeMatch && statusMatch && searchMatch;
    }), [reports, filterType, filterStatus, searchQuery]
  );

  return (
    <>
      {selectedReport ? (
        <ReportDetails 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)}
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Missing Reports</h2>
                <p className="text-gray-600">Total {filteredReports.length} reports found</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:flex-none lg:w-64">
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                
                <select 
                  className="px-4 py-2 border rounded-lg bg-white flex-1 lg:flex-none"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="person">Persons</option>
                  <option value="item">Items</option>
                </select>
                
                <select 
                  className="px-4 py-2 border rounded-lg bg-white flex-1 lg:flex-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="found">Found</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl"
            >
              <div className="flex items-center">
                <AlertCircle className="w-6 h-6 text-orange-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-800">No Reports Found</h3>
                  <p className="text-orange-700">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {filteredReports.map((report) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative w-full md:w-32 h-32">
                        <img
                          src={report.image}
                          alt={report.name}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                          loading="lazy"
                        />
                        <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${
                          report.status === 'active' ? 'bg-red-100 text-red-800' :
                          report.status === 'found' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">{report.name}</h3>
                            <p className="text-gray-600">ID: {report.id}</p>
                          </div>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                          {report.type === 'person' && (
                            <p className="text-gray-600 flex items-center">
                              <User className="w-4 h-4 mr-2 flex-shrink-0" />
                              Age: {report.age} • {report.gender}
                            </p>
                          )}
                          <p className="text-gray-600 flex items-center">
                            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                            {report.contact}
                          </p>
                          <p className="text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                            {report.location}
                          </p>
                          <p className="text-gray-600 flex items-center">
                            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                            {new Date(report.reportedAt).toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => setSelectedReport(report)}
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};