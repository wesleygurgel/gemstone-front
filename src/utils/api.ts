import axios from 'axios';

// Base URL for API requests - will be configured based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // Handle 401 Unauthorized - redirect to login
      if (error.response.status === 401) {
        // Clear token and redirect to login (when implemented)
        localStorage.removeItem('token');
        // Future implementation: redirect to login page
      }
      
      // Handle 403 Forbidden
      if (error.response.status === 403) {
        console.error('Forbidden access');
      }
      
      // Handle 500 Server Error
      if (error.response.status >= 500) {
        console.error('Server error occurred');
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('No response received from server');
    } else {
      // Error setting up request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;