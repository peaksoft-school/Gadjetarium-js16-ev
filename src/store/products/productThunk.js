import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const fetchProducts = createAsyncThunk(
   'product/fetchProducts',
   async (_, thunkAPI) => {
      try {
         const response = await axiosInstance.get('/api/product')
         console.log(response.data)
         return response.data
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || 'Ошибка при загрузке продуктов'
         )
      }
   }
)
