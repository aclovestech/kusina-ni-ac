// Imports
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Axios config
const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
};

// Create axios instance
const axiosInstance: AxiosInstance = axios.create(config);

export default axiosInstance;
