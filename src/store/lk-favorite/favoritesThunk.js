import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'
import { setError } from '../lk-favorite/favoriteSlice'
import { showToast } from '../../utils/helpers/showToast'

export const fetchFavorites = createAsyncThunk(
   'favorites/getAll',

   async (_, { dispatch }) => {
      try {
         const response = await axiosInstance.get('/api/favorites')

         return response.data
      } catch (error) {
         const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Failed to fetch favorites'
         console.error(
            'Error fetching favorites:',
            error.response?.status,
            errorMessage
         )
         dispatch(setError(errorMessage))
      }
   }
)

export const toggleFavorite = createAsyncThunk(
   'favorites/toggleFavorite',
   async ({ id }, { dispatch }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/favorites/toggle/${id}`
         )

         dispatch(fetchFavorites())

         return data
      } catch (error) {
         const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Failed to fetch favorites'
         console.error(
            'Error fetching favorites:',
            error.response?.status,
            errorMessage
         )
         dispatch(setError(errorMessage))
      }
   }
)

export const toggleFromAllBasket = createAsyncThunk(
   'favorites/fromAllBasket',
   async (_, { dispatch }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/favorites/toggle-from-basket`
         )

         dispatch(fetchFavorites())

         return data
      } catch (error) {
         const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Failed to fetch favorites'
         console.error(
            'Error fetching favorites:',
            error.response?.status,
            errorMessage
         )
         dispatch(setError(errorMessage))
      }
   }
)

export const toggleFromBasket = createAsyncThunk(
   'favorites/fromBasket',
   async ({ product }, { dispatch }) => {
      try {
         const { data } = await axiosInstance.post(`/api/basket`, product)

         showToast({ message: data })

         dispatch(fetchFavorites())

         return data
      } catch (error) {
         const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Failed to fetch favorites'
         console.error(
            'Error fetching favorites:',
            error.response?.status,
            errorMessage
         )
         dispatch(setError(errorMessage))
      }
   }
)
