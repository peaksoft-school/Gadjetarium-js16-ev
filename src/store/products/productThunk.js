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
         const response = await axiosInstance.get(`/api/product/get/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
