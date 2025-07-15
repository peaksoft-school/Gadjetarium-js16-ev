import { createSlice } from '@reduxjs/toolkit'
import { fetchBanner2 } from './bannerThunk2'

const initialState = {
   banner: null,
   banners: [],
   loading: false,
   error: null,
}

const bannerSlice2 = createSlice({
   name: 'banner2',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchBanner2.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBanner2.fulfilled, (state, action) => {
            state.loading = false
            state.banners = action.payload || []
            state.banner = action.payload[0] || null
         })
         .addCase(fetchBanner2.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default bannerSlice2.reducer
