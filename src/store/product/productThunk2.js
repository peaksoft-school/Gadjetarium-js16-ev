import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const fetchProducts2 = createAsyncThunk(
   'product/fetchProducts',
   async ({ status, page = 1, size = 10, userId }, { rejectWithValue }) => {
      try {
         const params = { page, size, userId }
         if (status) params.status = status

         const response = await axiosInstance.get('/api/product/all', {
            params,
         })
         console.log('API Response:', response.data)
         return response.data.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
