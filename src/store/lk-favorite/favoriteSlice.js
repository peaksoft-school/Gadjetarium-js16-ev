import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
   name: 'favorite',
   initialState: { favorites: [], loading: false, error: null },
   reducers: {
      setFavorites: (state, action) => {
         state.favorites = action.payload
         state.loading = false
      },
      setLoading: (state) => {
         state.loading = true
         state.error = null
      },
      setError: (state, action) => {
         state.loading = false
         state.error = action.payload
      },
   },
})

export const { setFavorites, setLoading, setError } = favoritesSlice.actions
export default favoritesSlice.reducer
