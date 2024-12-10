import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CheckCircle2, AlertCircle, Loader2, Users } from 'lucide-react';
import axios from 'axios';

interface LiveStreamVerificationProps {
  targetImage: string;
  onMatch: (match: {
    id: string;
    image: string;
    confidence: number;
    location: string;
    timestamp: string;
    cameraId: string;
    matchedFace?: string;
  }) => void;
}

export const LiveStreamVerification: React.FC<LiveStreamVerificationProps> = ({ targetImage, onMatch }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchResult, setMatchResult] = useState<{
    verified: boolean;
    confidence: number;
    matchedFace?: string;
  } | null>(null);
  const [detectedFaces, setDetectedFaces] = useState<number>(0);

  const captureAndVerify = useCallback(async () => {
    if (!webcamRef.current || isProcessing) return;

    try {
      const streamImage = webcamRef.current.getScreenshot();
      if (!streamImage) return;

      setIsProcessing(true);

      const response = await axios.post('http://localhost:5000/api/face/stream/check', {
        stream_image: streamImage,
        target_image: targetImage,
      });

      const { verified, confidence, matched_face, detected_faces } = response.data.data;

      setDetectedFaces(detected_faces || 0); // Ensure detected faces are updated
      setMatchResult({ verified, confidence, matchedFace: matched_face });

      if (verified && confidence > 52) {
        const matchData = {
          id: `match-${Date.now()}`,
          image: streamImage,
          confidence,
          location: 'Live Stream',
          timestamp: new Date().toISOString(),
          cameraId: 'LIVE-CAM',
          matchedFace: matched_face,
        };
        onMatch(matchData);
      }
    } catch (error) {
      console.error('Face verification error:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [targetImage, onMatch, isProcessing]);

  useEffect(() => {
    const interval = setInterval(captureAndVerify, 3000);
    return () => clearInterval(interval);
  }, [captureAndVerify]);

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* Webcam Feed */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full h-[300px] object-cover"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user",
            }}
            style={{ transform: 'scaleX(-1)' }} // Flip the video feed
          />
        </div>

        {/* Processing Overlay */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div className="text-white text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p className="text-sm">Processing faces...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detected Faces Indicator */}
        {detectedFaces > 0 && (
          <div className="absolute top-2 left-2 bg-black/50 text-white px-3 py-1 rounded-full flex items-center text-sm">
            <Users className="w-4 h-4 mr-1" />
            {detectedFaces} face(s) detected
          </div>
        )}
      </div>

      {/* Match Result */}
      {matchResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            matchResult.verified ? 'bg-green-50' : 'bg-yellow-50'
          }`}
        >
          <div className="flex items-start gap-4">
            {matchResult.matchedFace && (
              <div className="relative w-16 h-16">
                <img
                  src={matchResult.matchedFace}
                  alt="Matched Face"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute -top-2 -right-2">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      matchResult.confidence >= 85
                        ? 'bg-green-100 text-green-800'
                        : matchResult.confidence >= 75
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {matchResult.confidence}%
                  </div>
                </div>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center">
                {matchResult.verified ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      matchResult.verified ? 'text-green-800' : 'text-yellow-800'
                    }`}
                  >
                    {matchResult.verified ? 'Face Match Found!' : 'No Match Found'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Confidence: {matchResult.confidence.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stream Info */}
      <div className="bg-orange-50 rounded-lg p-4">
        <div className="flex items-center text-orange-800">
          <Camera className="w-5 h-5 mr-2" />
          <p className="text-sm">
            Live stream is active. Processing frames every 3 seconds.
          </p>
        </div>
      </div>
    </div>
  );
};
