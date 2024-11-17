import axios from 'axios';

// Create axios instance with base URL and headers
const axiosInstance = axios.create({
    baseURL: 'https://nieucore.com/api/', // API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add Authorization header if token exists
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // Log request for debugging
        console.log('Request:', config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        // Log successful responses for debugging
        console.log('Response:', response);
        return response;
    },
    (error) => {
        if (error.response) {
            // Server returned a response with an error status code
            if (error.response.status === 401) {
                // Handle unauthorized error (e.g., token expired)
                localStorage.removeItem('token');  // Remove invalid token
                // Redirect to login page if necessary
                window.location.href = '/login';
            } else {
                // Log other server errors
                console.error('Error response:', error.response);
            }
            return Promise.reject(error.response);
        } else if (error.request) {
            // No response received
            console.error('Error request:', error.request);
            return Promise.reject(error.request);
        } else {
            // Error setting up the request
            console.error('Error message:', error.message);
            return Promise.reject(error.message);
        }
    }
);

export default axiosInstance;
