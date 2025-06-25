
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../configs/axiosInstans'

export const fetchOrdersThunk = createAsyncThunk(
   'orders/fetchOrders',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/orders/history')
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message ||
               error.message ||
               'Ошибка при загрузке заказов'
         )
      }
   }
)

export const fetchOrderDetailsThunk = createAsyncThunk(
   'orders/fetchOrderDetails',
   async (orderId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/orders/${orderId}`)
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message ||
               error.message ||
               'Ошибка при загрузке деталей заказа'
         )
      }
   }
)
