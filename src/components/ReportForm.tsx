import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Save, ArrowLeft, CheckCircle2, Camera, AlertCircle, Loader2, Home } from 'lucide-react';
import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs';

export const ReportForm = () => {
  const [formData, setFormData] = useState({
    name: 'Rishabh Kumar',
    age: '25',
    gender: 'male',
    complexion: 'Medium',
    lastSeenTime: '2024-03-15T14:30',
    lastSeenLocation: 'ram_ghat',
    description: 'Last seen wearing orange kurta and white dhoti',
    contactNumber: '9876543210',
    photo: null as File | null
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportNumber, setReportNumber] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isFaceDetected, setIsFaceDetected] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await blazeface.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const detectFace = async (imageUrl: string) => {
    if (!model) return false;
    
    setIsProcessing(true);
    try {
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const tensor = tf.browser.fromPixels(img);
      const predictions = await model.estimateFaces(tensor, false);
      tensor.dispose();

      return predictions.length > 0;
    } catch (error) {
      console.error('Face detection error:', error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        const hasFace = await detectFace(imageUrl);
        setIsFaceDetected(hasFace);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFaceDetected) {
      alert('Please upload a clear photo with a visible face');
      return;
    }
    const generatedReportNumber = 'MP' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setReportNumber(generatedReportNumber);
    setIsSubmitted(true);
  };

  const handleNavigateHome = () => {
    window.location.href = '/';
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-16 pb-12 px-4"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Report Submitted Successfully</h2>
              <motion.div
                className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-lg font-semibold text-green-800">Your Report Number:</p>
                <p className="text-4xl font-bold text-green-600 my-3">{reportNumber}</p>
                <p className="text-sm text-green-700">Keep this number for tracking the status</p>
              </motion.div>

              <motion.div
                className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-semibold text-orange-800 mb-4">Next Steps</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
                    <span className="text-orange-700">Our team has been notified and will begin the search immediately</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
                    <span className="text-orange-700">You will receive SMS updates on {formData.contactNumber}</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
                    <span className="text-orange-700">You can track the status using your report number</span>
                  </li>
                </ul>
              </motion.div>

              <div className="flex gap-4 justify-center">
                <motion.button 
                  onClick={handleNavigateHome}
                  className="px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-5 h-5 mr-2" />
                  Return Home
                </motion.button>
                <motion.button
                  onClick={() => window.location.href = `/track/${reportNumber}`}
                  className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Track Status
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-16 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleNavigateHome}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
              <h2 className="text-xl font-bold text-gray-800">Report Missing Person</h2>
              <div className="w-20"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div className="flex justify-center">
                <motion.div 
                  className={`relative w-32 h-32 rounded-2xl overflow-hidden ${
                    previewImage ? '' : 'bg-gray-50 border-2 border-dashed border-gray-300'
                  } flex items-center justify-center cursor-pointer hover:border-orange-500 transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {previewImage ? (
                    <>
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      {isProcessing && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                      )}
                      {!isProcessing && (
                        <div className={`absolute top-2 right-2 p-1 rounded-full ${
                          isFaceDetected ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </>
                  ) : (
                    <Camera className="w-10 h-10 text-gray-400" />
                  )}
                </motion.div>
              </div>

              {previewImage && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center ${
                    isFaceDetected ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isFaceDetected ? (
                    <p className="flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Face detected successfully
                    </p>
                  ) : (
                    <p className="flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      No face detected. Please upload a clear photo.
                    </p>
                  )}
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="120"
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    required
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complexion</label>
                  <select
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
                    value={formData.complexion}
                    onChange={(e) => setFormData({ ...formData, complexion: e.target.value })}
                  >
                    <option value="Fair">Fair</option>
                    <option value="Medium">Medium</option>
                    <option value="Dark">Dark</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Seen Time *</label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
                    value={formData.lastSeenTime}
                    onChange={(e) => setFormData({ ...formData, lastSeenTime: e.target.value })}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Seen Location *</label>
                  <select
                    required
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
                    value={formData.lastSeenLocation}
                    onChange={(e) => setFormData({ ...formData, lastSeenLocation: e.target.value })}
                  >
                    <option value="">Select location</option>
                    <option value="ram_ghat">Ram Ghat</option>
                    <option value="mahakal_temple">Mahakal Temple</option>
                    <option value="kalbhairav_temple">Kalbhairav Temple</option>
                    <option value="main_market">Main Market</option>
                  </select>
                </motion.div>

                <motion.div
                  className="md:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="10-digit mobile number"
                  />
                </motion.div>

                <motion.div
                  className="md:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow h-24"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Additional details about the person..."
                  />
                </motion.div>
              </div>

              <motion.div
                className="flex justify-end gap-4 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <motion.button
                  type="button"
                  onClick={handleNavigateHome}
                  className="px-6 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!isFaceDetected || isProcessing}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Submit Report
                </motion.button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};