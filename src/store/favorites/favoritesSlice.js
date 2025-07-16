import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'
import { showToast } from '../../utils/helpers/showToast'

export const toggleFavoriteOnServer = createAsyncThunk(
   'favorites/toggleFavoriteOnServer',
   async ({ productTypeId, userId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/favorites/toggle/${productTypeId}`,
            {
               userId,
            }
         )

         showToast({ message: data })

         return productTypeId
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

export const getFavoritesFromServer = createAsyncThunk(
   'favorites/getFavoritesFromServer',
   async (userId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/favorites', {
            params: { userId },
         })

         return data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

const favoritesSlice = createSlice({
   name: 'favorites',
   initialState: {
      ids: [],
   },
   reducers: {
      setFavorites(state, action) {
         state.ids = action.payload
      },
      toggleFavorite(state, action) {
         const id = action.payload
         if (state.ids.includes(id)) {
            state.ids = state.ids.filter((favId) => favId !== id)
         } else {
            state.ids.push(id)
         }
      },
   },
   extraReducers: (builder) => {
      builder.addCase(toggleFavoriteOnServer.fulfilled, (state, action) => {
         const id = action.payload
         if (state.ids.includes(id)) {
            state.ids = state.ids.filter((favId) => favId !== id)
         } else {
            state.ids.push(id)
         }
      })
      builder.addCase(getFavoritesFromServer.fulfilled, (state, action) => {
         // Ожидаем объект { userId, products: [...] }
         state.ids = Array.isArray(action.payload.products)
            ? action.payload.products
            : []
      })
   },
})

export const { setFavorites, toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
