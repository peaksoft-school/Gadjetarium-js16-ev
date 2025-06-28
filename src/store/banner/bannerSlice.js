import { createSlice } from '@reduxjs/toolkit'
import { postBanner } from './bannerThunk'

const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearBannerState: (state) => {
      state.isLoading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBanner.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = false
      })
      .addCase(postBanner.fulfilled, (state) => {
        state.isLoading = false
        state.success = true
      })
      .addCase(postBanner.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearBannerState } = bannerSlice.actions
export default bannerSlice.reducer
