import { createSlice } from '@reduxjs/toolkit';
import { fetchReviewsByStatus } from './ReviewsThunk';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  currentStatus: 'ALL',
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setCurrentStatus: (state, action) => {
      state.currentStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentStatus } = reviewsSlice.actions;
export default reviewsSlice.reducer;
