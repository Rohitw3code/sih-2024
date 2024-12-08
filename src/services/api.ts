import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface ReportFormData {
  name: string;
  age: number;
  gender: string;
  contact: string;
  location: string;
  description: string;
  photo: string;
}

export interface ApiResponse {
  message: string;
  report_number: string;
  data: any;
  error?: string;
}

export const reportMissingPerson = async (formData: ReportFormData): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/persons/report`, formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to submit report');
  }
};

export const getReport = async (reportNumber: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/persons/report/${reportNumber}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch report');
  }
};

export const getAllReports = async (status: string = 'active'): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/persons/reports?status=${status}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch reports');
  }
};