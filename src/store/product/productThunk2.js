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

export const fetchFilteredProducts = createAsyncThunk(
   'product/fetchFilteredProducts',
   async (params, { rejectWithValue }) => {
      try {
         // params: {  discountRange, brandsId, startPrice, endPrice, categoryId, colors, storages, ram, page, pageSize, status }
         const paramsSerializer = (p) => {
            const searchParams = new URLSearchParams()
            Object.entries(p).forEach(([key, value]) => {
               if (Array.isArray(value)) {
                  value.forEach((v) => searchParams.append(key, v))
               } else if (value !== undefined && value !== null) {
                  searchParams.append(key, value)
               }
            })
            return searchParams.toString()
         }
         const response = await axiosInstance.get('/api/product/filter', {
            params,
            paramsSerializer,
         })
         return { data: response.data.data, status: params.status }
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
         return product
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
