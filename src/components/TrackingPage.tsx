import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Camera, MapPin, Clock, User, AlertCircle } from 'lucide-react';

export const TrackingPage = ({ onBack }: { onBack: () => void }) => {
  const [reportNumber, setReportNumber] = useState('MP24X7H9KL');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Search
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="border-b border-gray-200 px-6 py-4 bg-orange-50">
              <h2 className="text-xl font-bold text-gray-800">Case Status: {reportNumber}</h2>
              <p className="text-sm text-orange-600">Last updated: 5 minutes ago</p>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Original Report Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Original Report Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-center mb-6">
                      <img
                        src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
                        alt="Reported Person"
                        className="w-32 h-32 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span className="font-medium">Rahul Kumar</span>
                      </p>
                      <p className="text-gray-600">Age: 25 • Male • Medium Complexion</p>
                      <p className="text-gray-600">Last Seen: Ram Ghat</p>
                      <p className="text-gray-600">Wearing orange kurta and white dhoti</p>
                    </div>
                  </div>
                </div>

                {/* Latest Updates */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Latest Updates</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Camera className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="font-semibold text-green-800">Possible Match Found</p>
                          <p className="text-sm text-green-700 mb-2">Accuracy: 89%</p>
                          <div className="relative">
                            <img
                              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
                              alt="CCTV Footage"
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 p-2 text-white text-sm">
                              <p className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                Mahakal Temple Camera #4
                              </p>
                              <p className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                10 minutes ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-semibold text-blue-800">Search Team Dispatched</p>
                          <p className="text-sm text-blue-700">
                            A team has been sent to verify the possible match at Mahakal Temple area.
                            Updates will be sent to your registered number.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg"
        >
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Track Missing Person Report</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Number
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your report number (e.g., MP1A2B3C4)"
                  value={reportNumber}
                  onChange={(e) => setReportNumber(e.target.value.toUpperCase())}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center"
              >
                <Search className="w-4 h-4 mr-2" />
                Track Status
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};