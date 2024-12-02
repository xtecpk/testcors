import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create axios instance with base URL and headers
const axiosInstance = axios.create({
  baseURL: 'https://nieucore.com/backend/api/', // API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to check if the token is expired
const isTokenExpired = (token: string): boolean => {
  const { exp } = jwtDecode<{ exp: number }>(token);
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return exp < currentTime;
};

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Remove user ID if the token is expired
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Remove token and user ID, and redirect to login on session expiration
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
