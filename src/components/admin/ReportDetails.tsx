import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Clock, User, Camera, AlertCircle } from 'lucide-react';
import { Report } from './types';

interface ReportDetailsProps {
  report: Report;
  onClose: () => void;
}

export const ReportDetails = ({ report, onClose }: ReportDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Reports
        </button>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          report.status === 'active' ? 'bg-red-100 text-red-800' :
          report.status === 'found' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-6">
            <img
              src={report.image}
              alt={report.name}
              className="w-48 h-48 object-cover rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{report.name}</h2>
              <p className="text-gray-600">Case ID: {report.id}</p>
              
              <div className="mt-4 space-y-2">
                {report.type === 'person' && (
                  <p className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    Age: {report.age} • {report.gender}
                  </p>
                )}
                <p className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact: {report.contact}
                </p>
                <p className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  Last Seen: {report.location}
                </p>
                <p className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Reported: {new Date(report.reportedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <p className="text-gray-700 mb-6">{report.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Recent Sightings
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                    alt="CCTV Footage"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold">Mahakal Temple - Camera #4</p>
                    <p className="text-sm text-gray-600">March 14, 2024 - 3:45 PM</p>
                    <p className="text-sm text-gray-600">Confidence: 89%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Case Updates
              </h3>
              <div className="space-y-4">
                <div className="border-l-2 border-orange-500 pl-4">
                  <p className="font-semibold">Search Team Dispatched</p>
                  <p className="text-sm text-gray-600">March 14, 2024 - 4:00 PM</p>
                  <p className="text-sm text-gray-600">Team deployed to verify sighting at Mahakal Temple</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Mark as Found
            </button>
            <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              Update Status
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Print Report
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};