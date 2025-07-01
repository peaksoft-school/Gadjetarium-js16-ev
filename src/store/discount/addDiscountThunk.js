import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const addDiscount = createAsyncThunk(
   'discount/addDiscount',
   async (discountData, thunkAPI) => {
      try {
         const response = await axiosInstance.post(
            '/api/discounts/add',
            discountData
         )
         return response.data
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data || 'Ошибка при добавлении скидки'
         )
      }
   }
)
