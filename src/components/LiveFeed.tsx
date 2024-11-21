import React from 'react';
import Webcam from 'react-webcam';
import { Camera, User, AlertCircle } from 'lucide-react';

export const LiveFeed = () => {
  const [selectedCamera, setSelectedCamera] = React.useState('camera1');

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden h-[300px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="w-16 h-16 text-gray-600" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
          <div className="flex items-center text-white">
            <User className="w-4 h-4 mr-2" />
            <span>Camera ID: {selectedCamera}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['Ram Ghat', 'Mahakal Temple', 'Kalbhairav Temple', 'Main Market'].map((location, index) => (
          <button
            key={index}
            onClick={() => setSelectedCamera(`camera${index + 1}`)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCamera === `camera${index + 1}`
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {location}
          </button>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800">AI Processing Active</h4>
            <p className="text-sm text-yellow-600">
              Facial recognition system is actively scanning for matches in the database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};