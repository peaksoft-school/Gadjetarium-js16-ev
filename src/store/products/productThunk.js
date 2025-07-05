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

export const deleteProduct = createAsyncThunk(
   'product/deleteProduct',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/product/delete/${id}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

export const fetchProductById = createAsyncThunk(
   'product/fetchProductById',
   async (id, { rejectWithValue }) => {
      try {
         if (!id) throw new Error('ID is required for fetching product')

         const token = localStorage.getItem('token') // если требуется

         const response = await axiosInstance.get(`/api/product/get/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })

         if (response.data?.product) {
            return response.data.product
         }

         return response.data
      } catch (error) {
         console.error('fetchProductById error:', error)
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
