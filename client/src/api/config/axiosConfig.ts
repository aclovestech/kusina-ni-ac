import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
};

const axiosInstance: AxiosInstance = axios.create(config);

export default axiosInstance;
