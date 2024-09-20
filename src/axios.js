// src/axiosInstance.js
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:3001/v1/api/', // Replace with your API base URL
});

// Request Interceptor
apiService.interceptors.request.use(
  (config) => {
    // Modify request config here (e.g., add headers)
    const token = localStorage.getItem('access_token'); // Replace with your token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiService.interceptors.response.use(
  (response) => {
    // Handle responses globally
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // For example, redirect to login page on 401 unauthorized
      // window.location.href = '/login';
    }
    if (error.response && error.response.status === 404) {
       return Promise.reject("Resource Not Found");
    }
    if(error.code === "ERR_NETWORK"){
        return Promise.reject("Server not running. Please contact admin")
    }
    return Promise.reject(error);
  }
);

export default apiService;
