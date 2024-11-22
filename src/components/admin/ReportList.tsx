import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, Filter, Clock, MapPin, Phone, User } from 'lucide-react';
import { Report } from './types';
import { ReportDetails } from './ReportDetails';

interface ReportListProps {
  reports: Report[];
}

export const ReportList = ({ reports }: ReportListProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredReports = useMemo(() => 
    reports.filter(report => {
      const typeMatch = filterType === 'all' || report.type === filterType;
      const statusMatch = filterStatus === 'all' || report.status === filterStatus;
      return typeMatch && statusMatch;
    }), [reports, filterType, filterStatus]
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Missing Reports</h2>
            <div className="flex gap-2">
              <select 
                className="px-4 py-2 border rounded-lg"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="person">Persons</option>
                <option value="item">Items</option>
              </select>
              <select 
                className="px-4 py-2 border rounded-lg"
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

          <div className="grid gap-6">
            {filteredReports.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-6">
                  <img
                    src={report.image}
                    alt={report.name}
                    className="w-32 h-32 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{report.name}</h3>
                        <p className="text-gray-600">ID: {report.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        report.status === 'active' ? 'bg-red-100 text-red-800' :
                        report.status === 'found' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {report.type === 'person' && (
                        <>
                          <p className="text-gray-600 flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Age: {report.age} • {report.gender}
                          </p>
                        </>
                      )}
                      <p className="text-gray-600 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {report.contact}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {report.location}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {new Date(report.reportedAt).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
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
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};