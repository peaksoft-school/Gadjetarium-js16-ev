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
         return response.data.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

export const fetchProductDetail = createAsyncThunk(
   'products/fetchProductDetail',
   async (productTypeId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/product/get/${productTypeId}`
         )
         const product = response.data?.data

         if (!product) {
            console.warn('No product detail found for ID:', productTypeId)
            return response.data
         }

         return product
      } catch (error) {
         console.log(
            'Fetch Product Detail Error:',
            error.response?.data || error.message
         )
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
