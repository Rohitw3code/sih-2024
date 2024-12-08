import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Clock, User, Camera, ChevronLeft, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { Report } from '../../types/report';
import { updateReportStatus } from '../../services/api';
import { LiveStreamVerification } from './LiveStreamVerification';

interface ReportDetailsProps {
  report: Report;
  onClose: () => void;
}

interface FaceMatch {
  id: string;
  confidence: number;
  location: string;
  timestamp: string;
  image: string;
  cameraId: string;
}

const mockMatches: FaceMatch[] = [
  {
    id: '1',
    confidence: 89,
    location: 'Mahakal Temple',
    timestamp: '2024-03-14T15:45:00',
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c',
    cameraId: 'CAM_04'
  },
  {
    id: '2',
    confidence: 85,
    location: 'Ram Ghat',
    timestamp: '2024-03-14T16:30:00',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    cameraId: 'CAM_12'
  }
];

export const ReportDetails: React.FC<ReportDetailsProps> = ({ report: initialReport, onClose }) => {
  const [selectedMatch, setSelectedMatch] = useState<FaceMatch | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [report, setReport] = useState(initialReport);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLiveStream, setShowLiveStream] = useState(false);

  const handleConfirmMatch = (match: FaceMatch) => {
    setSelectedMatch(match);
    setShowConfirmDialog(true);
  };

  const handleConfirmFound = async () => {
    setIsUpdating(true);
    setError(null);
    try {
      await updateReportStatus(report.report_number, 'found');
      setShowConfirmDialog(false);
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLiveMatch = () => {
    setShowConfirmDialog(true);
  };

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <nav className="bg-white shadow-lg rounded-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </button>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              report.status === 'active' ? 'bg-red-100 text-red-800' :
              report.status === 'found' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </span>
            <span className="text-gray-500">Report Number: {report.report_number}</span>
          </div>
        </div>
      </nav>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Person Details Card - 5 columns */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
            <div className="p-4 bg-orange-50 border-b border-orange-100">
              <h2 className="text-xl font-bold text-gray-800">Person Details</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg mb-4">
                  <img
                    src={report.photo}
                    alt={report.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{report.name}</h3>
              </div>
              
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Age & Gender</p>
                      <p className="font-medium text-gray-800">{report.age} • {report.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium text-gray-800">{report.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Last Seen</p>
                      <p className="font-medium text-gray-800">{report.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Reported At</p>
                      <p className="font-medium text-gray-800">
                        {new Date(report.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                  <p className="text-gray-700">{report.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Stream and Matches - 7 columns */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Stream Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-orange-50 border-b border-orange-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Live Verification</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLiveStream(!showLiveStream)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  {showLiveStream ? 'Hide Camera' : 'Start Camera'}
                </motion.button>
              </div>
            </div>
            <div className="p-6">
              {showLiveStream ? (
                <LiveStreamVerification
                  targetImage={report.photo}
                  onMatch={handleLiveMatch}
                />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Click the button above to start live verification</p>
                </div>
              )}
            </div>
          </div>

          {/* Potential Matches Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-orange-50 border-b border-orange-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Potential Matches</h2>
                <span className="text-sm font-medium text-gray-600">
                  {mockMatches.length} matches found
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {mockMatches.map((match) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={match.image}
                            alt="Match"
                            className="w-24 h-24 object-cover rounded-lg shadow"
                            loading="lazy"
                          />
                          <div className="absolute -top-1 -right-1">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              match.confidence >= 85 ? 'bg-green-100 text-green-800' :
                              match.confidence >= 75 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {match.confidence}%
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-700">
                              <Camera className="w-4 h-4 mr-2 text-gray-500" />
                              <span className="font-medium">Camera {match.cameraId}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{match.location}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <Clock className="w-4 h-4 mr-2 text-gray-500" />
                              <span className="text-sm">
                                {new Date(match.timestamp).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleConfirmMatch(match)}
                            className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Confirm Match
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full"
            >
              <div className="text-center">
                <div className="mb-4">
                  <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Match</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure this is a match? This action will mark the case as found and notify all relevant parties.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowConfirmDialog(false)}
                    className="px-6 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    disabled={isUpdating}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleConfirmFound}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Confirm Found
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};