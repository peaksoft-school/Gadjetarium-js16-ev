import axios from 'axios';

const BASE_URL = 'http://10.10.11.156:8015';

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
    const updatedConfig = { ...config };
    const { token } = customStore?.getState()?.auth || {};
    if (token) {
      updatedConfig.headers.Authorization = `Bearer ${token}`;
    }
    return updatedConfig;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error)
);