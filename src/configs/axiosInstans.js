import axios from 'axios';

const BASE_URL = 'http://3.147.74.119';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let customStore;

export const injectStore = (store) => {
  customStore = store;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const updateConfig = { ...config };
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpYmVrQGdtYWlsLmNvbSIsImlkIjo1LCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTEyNzg1NDEsImV4cCI6MTc1MTI4MjI0MX0.txYiUiSsUelBZHGr2myQfVukI8IVD4rnzvoR1B4vokA';

    if (token) {
      updateConfig.headers.Authorization = `Bearer ${token}`;
    }

    return updateConfig;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error)
);