import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const fetchFilteredProducts = createAsyncThunk(
   'filter/fetchFilteredProducts',
   async (params, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/product/filter', {
            params,
         })
         return response.data.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
