import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../configs/axiosInstans';

export const fetchReviewsByStatus = createAsyncThunk(
  'reviews/fetchByStatus',
  async (reviewStatus, { rejectWithValue }) => {  
    try {
      const response = await axiosInstance.get(`/api/reviews/${reviewStatus}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);