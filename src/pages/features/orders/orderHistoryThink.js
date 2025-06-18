import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstans'

export const fetchOrderHistory = createAsyncThunk(
   'orders/fetchOrderHistory',
   async (_, thunkAPI) => {
      try {
         const response = await axiosInstance.get('/api/orders/history')
         return response.data
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data || error.message)
      }
   }
)
