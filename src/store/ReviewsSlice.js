import { createSlice } from '@reduxjs/toolkit';
import { fetchReviewsByStatus } from '../store/ReviewsThunk';

const initialState = {
  reviews: [],
  status: 'idle',
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByStatus.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReviewsByStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default reviewsSlice.reducer;