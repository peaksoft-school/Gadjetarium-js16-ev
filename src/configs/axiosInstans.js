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

export const updateReviewReply = async (reviewId, responseData) => {
  try {
    const response = await axiosInstance.put(`/api/reviews/response/${reviewId}`, responseData);
    return response.data;
  } catch (error) {
    console.error('PUT review response error:', error);
    throw error;
  }
};

export const saveReviewResponse = async (reviewId, responseData) => {
  try {
    const response = await axiosInstance.post(`/api/reviews/save/${reviewId}`, responseData);
    return response.data;
  } catch (error) {
    console.error('POST review save error:', error);
    throw error;
  }
};