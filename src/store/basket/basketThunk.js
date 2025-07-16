import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const fetchBasket = createAsyncThunk(
   'basket/fetchBasket',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/basket')
         return Array.isArray(response.data) ? response.data : []
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch basket'
         )
      }
   }
)

export const addToBasket = createAsyncThunk(
   'basket/addToBasket',
   async (item, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/api/basket', item)
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Failed to add to basket'
         )
      }
   }
)

export const removeFromBasket = createAsyncThunk(
   'basket/removeFromBasket',
   async (productTypeId, { rejectWithValue }) => {
      try {
         await axiosInstance.delete(`/api/basket/${productTypeId}`)
         return productTypeId
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Failed to remove from basket'
         )
      }
   }
)

export const toggleFavorite = createAsyncThunk(
   'basket/toggleFavorite',
   async (productTypeId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/api/favorites', {
            productTypeId,
         })
         return { productTypeId, isLiked: response.data.isLiked }
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Failed to toggle favorite'
         )
      }
   }
)
