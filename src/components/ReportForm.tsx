import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ReportForm = () => {
  const [formData, setFormData] = useState({
    name: 'Rahul Kumar',
    age: '25',
    gender: 'male',
    complexion: 'Medium',
    lastSeenTime: '2024-03-14T15:30',
    lastSeenLocation: 'ram_ghat',
    description: 'Wearing orange kurta and white dhoti. Has a small scar on right hand.',
    contactNumber: '9876543210',
    photo: null as File | null
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportNumber, setReportNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a random report number (in real app, this would come from backend)
    const generatedReportNumber = 'MP' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setReportNumber(generatedReportNumber);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-24 pb-12 px-4 bg-gray-50"
      >
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Submitted Successfully</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-lg font-semibold text-green-800">Your Report Number:</p>
              <p className="text-3xl font-bold text-green-600 my-2">{reportNumber}</p>
              <p className="text-sm text-green-700">Keep this number for tracking the status</p>
            </div>
            <div className="text-left bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-orange-800 mb-2">What happens next?</h3>
              <ul className="list-disc list-inside space-y-2 text-orange-700">
                <li>Our team has been notified and will begin the search immediately</li>
                <li>You will receive SMS updates on {formData.contactNumber}</li>
                <li>You can track the status using your report number</li>
                <li>Our team may contact you for additional information if needed</li>
              </ul>
            </div>
            <div className="flex gap-4 justify-center">
              <a 
                href="/"
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Return Home
              </a>
              <a 
                href={`/track/${reportNumber}`}
                className="px-6 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50"
              >
                Track Status
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <a
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg"
        >
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Report Missing Person</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="120"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complexion
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.complexion}
                  onChange={(e) => setFormData({ ...formData, complexion: e.target.value })}
                  placeholder="e.g., Fair, Medium, Dark"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Seen Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.lastSeenTime}
                  onChange={(e) => setFormData({ ...formData, lastSeenTime: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Seen Location *
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.lastSeenLocation}
                  onChange={(e) => setFormData({ ...formData, lastSeenLocation: e.target.value })}
                >
                  <option value="">Select location</option>
                  <option value="ram_ghat">Ram Ghat</option>
                  <option value="mahakal_temple">Mahakal Temple</option>
                  <option value="kalbhairav_temple">Kalbhairav Temple</option>
                  <option value="main_market">Main Market</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  placeholder="10-digit mobile number"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-24"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about the person..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-medium text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setFormData({ ...formData, photo: file });
                          }}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <a
                href="/"
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Submit Report
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};