// import { createSlice } from '@reduxjs/toolkit'
// import { postBanner } from './bannerThunk'

// const bannerSlice = createSlice({
//   name: 'banner',
//   initialState: {
//     isLoading: false,
//     error: null,
//     success: false,
//   },
//   reducers: {
//     clearBannerState: (state) => {
//       state.isLoading = false
//       state.error = null
//       state.success = false
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(postBanner.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//         state.success = false
//       })
//       .addCase(postBanner.fulfilled, (state) => {
//         state.isLoading = false
//         state.success = true
//       })
//       .addCase(postBanner.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload
//       })
//   },
// })

// export const { clearBannerState } = bannerSlice.actions
// export default bannerSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { fetchBanner2 } from './bannerThunk2'

const initialState = {
   banner2: null, // Store the first banner or null if empty
   banners: [], // Store all banners
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
            state.banner2 = action.payload[0] || null // Use the first banner
         })
         .addCase(fetchBanner2.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default bannerSlice2.reducer
