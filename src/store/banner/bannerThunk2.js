import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const fetchBanner2 = createAsyncThunk(
   'banner2/fetchBanner',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/banner/')
         console.log('Banner API Response:', response.data)
         return response.data
      } catch (error) {
         console.error(
            'Banner API Error:',
            error.response?.data || error.message
         )
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
