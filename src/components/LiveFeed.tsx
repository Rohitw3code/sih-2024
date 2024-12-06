import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Camera, User, AlertCircle, Activity, MapPin } from 'lucide-react';

interface CameraData {
  id: string;
  location: string;
  status: 'active' | 'offline';
  lastUpdate: string;
  detections: number;
}

const cameras: CameraData[] = [
  { id: 'CAM_001', location: 'Ram Ghat', status: 'active', lastUpdate: '2 seconds ago', detections: 15 },
  { id: 'CAM_002', location: 'Mahakal Temple', status: 'active', lastUpdate: '5 seconds ago', detections: 23 },
  { id: 'CAM_003', location: 'Kalbhairav Temple', status: 'offline', lastUpdate: '2 minutes ago', detections: 0 },
  { id: 'CAM_004', location: 'Main Market', status: 'active', lastUpdate: '1 second ago', detections: 45 }
];

export const LiveFeed = () => {
  const [selectedCamera, setSelectedCamera] = useState<CameraData>(cameras[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  useEffect(() => {
    // Simulate AI processing
    const interval = setInterval(() => {
      setIsProcessing(prev => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden h-[300px]">
        <Webcam
          ref={webcamRef}
          audio={false}
          className="w-full h-full object-cover"
          screenshotFormat="image/jpeg"
        />
        
        {isProcessing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center space-x-2 text-white"
            >
              <Activity className="w-6 h-6 animate-pulse" />
              <span>Processing Feed...</span>
            </motion.div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <Camera className="w-5 h-5" />
              <div>
                <p className="font-medium">{selectedCamera.id}</p>
                <p className="text-sm text-gray-300">{selectedCamera.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex h-2 w-2 rounded-full ${
                selectedCamera.status === 'active' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-sm">{selectedCamera.status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cameras.map((camera) => (
          <motion.button
            key={camera.id}
            onClick={() => setSelectedCamera(camera)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg ${
              selectedCamera.id === camera.id
                ? 'bg-orange-100 border-2 border-orange-500'
                : 'bg-white border border-gray-200 hover:border-orange-300'
            }`}
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{camera.id}</span>
                <span className={`inline-flex h-2 w-2 rounded-full ${
                  camera.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {camera.location}
              </div>
              <div className="text-xs text-gray-500">
                Updated: {camera.lastUpdate}
              </div>
              {camera.status === 'active' && (
                <div className="text-xs font-medium text-orange-600">
                  {camera.detections} detections
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-800">Live Processing Stats</h4>
            <div className="mt-2 space-y-1 text-sm text-orange-600">
              <p>• Processing Speed: 30 fps</p>
              <p>• Face Detection Accuracy: 98.5%</p>
              <p>• Active Cameras: {cameras.filter(c => c.status === 'active').length}/{cameras.length}</p>
              <p>• Total Detections: {cameras.reduce((acc, curr) => acc + curr.detections, 0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};