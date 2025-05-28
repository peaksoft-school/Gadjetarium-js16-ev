import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchReviews, submitReply, deleteReview } from '../rewiews/RewiewsThunk';

// Асинхронные действия
export const fetchReviewsAsync = createAsyncThunk(
  'reviews/fetchReviews',
  async (status, { rejectWithValue }) => {
    try {
      const data = await fetchReviews(status);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitReplyAsync = createAsyncThunk(
  'reviews/submitReply',
  async ({ reviewId, replyText }, { rejectWithValue }) => {
    try {
      const data = await submitReply(reviewId, replyText);
      return { reviewId, reply: replyText, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReviewAsync = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      const data = await deleteReview(reviewId);
      return { reviewId, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Начальное состояние
const initialState = {
  reviews: [],
  loading: false,
  error: null,
  currentStatus: 'ALL',
};

// Создание слайса
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setCurrentStatus: (state, action) => {
      state.currentStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Reviews
    builder
      .addCase(fetchReviewsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Submit Reply
    builder
      .addCase(submitReplyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReplyAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { reviewId, reply } = action.payload;
        state.reviews = state.reviews.map((r) =>
          r.id === reviewId ? { ...r, reply, status: 'answered' } : r
        );
      })
      .addCase(submitReplyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Review
    builder
      .addCase(deleteReviewAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { reviewId } = action.payload;
        state.reviews = state.reviews.filter((r) => r.id !== reviewId);
      })
      .addCase(deleteReviewAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentStatus } = reviewsSlice.actions;
export default reviewsSlice.reducer;