import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const fetchProducts = createAsyncThunk(
   'product/fetchProducts',
   async (params = {}, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/product', { params })
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
