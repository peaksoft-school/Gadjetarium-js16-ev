import { createSlice } from '@reduxjs/toolkit'
import {
   fetchFavorites,
   toggleFavorite,
   toggleFromAllBasket,
   toggleFromBasket,
} from './favoritesThunk'

const initialState = {
   favorites: [],
   loading: false,
   error: null,
}

const favoritesSlice = createSlice({
   name: 'favorite',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         // FETCH FAVORITES
         .addCase(fetchFavorites.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload
            state.loading = false
         })
         .addCase(fetchFavorites.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // TOGGLE FAVORITE
         .addCase(toggleFavorite.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(toggleFavorite.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(toggleFavorite.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // TOGGLE FROM ALL BASKET
         .addCase(toggleFromAllBasket.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(toggleFromAllBasket.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(toggleFromAllBasket.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // TOGGLE FROM BASKET
         .addCase(toggleFromBasket.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(toggleFromBasket.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(toggleFromBasket.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

// Эти экшены нигде не создаются в slice, можно удалить, если не используются:
export const { setFavorites, setLoading, setError } = favoritesSlice.actions

export default favoritesSlice.reducer
