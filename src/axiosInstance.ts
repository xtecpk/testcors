import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base URL and headers
const axiosInstance = axios.create({
    baseURL: 'https://nieucore.com/api/', // API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add Authorization header if token exists
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // Log request for debugging (be cautious with logging sensitive data)
        console.log('Request:', config);
        return config;
    },
    (error: AxiosError) => {
        // Handle request error
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log successful responses for debugging
        console.log('Response:', response);
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            // Handle 401 Unauthorized: Remove token and redirect to login page
            if (error.response.status === 401) {
                localStorage.removeItem('token');  
                window.location.href = '/login';
            } else {
                console.error('Error response:', error.response);
            }
            return Promise.reject(error.response);
        } else if (error.request) {
            // Handle network error (no response received)
            console.error('Error request:', error.request);
            return Promise.reject(error.request);
        } else {
            // Handle any other errors
            console.error('Error message:', error.message);
            return Promise.reject(error.message);
        }
    }
);

export default axiosInstance;
