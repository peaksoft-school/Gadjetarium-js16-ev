import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../configs/axiosInstans';

export const fetchReviewsByStatus = createAsyncThunk(
  'reviews/fetchByStatus',
  async (reviewStatus = 'неотвеченные', { rejectWithValue }) => {
    try {
      const url = `/api/reviews/${reviewStatus}`; // {reviewStatus} параметри
      console.log('Жөнөтүлгөн URL:', `${axiosInstance.defaults.baseURL}${url}`);
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Ошибка:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Серверге туташуу мүмкүн эмес');
    }
  }
);